// Run with: node tools/test-ai-target-grid.js
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync(process.argv[2] || "server.js", "utf8");
const helperStart = source.indexOf("// Lightweight center-point index used only for AI target acquisition.");
const helperEnd = source.indexOf("    room.init();", helperStart);
assert.ok(helperStart >= 0 && helperEnd > helperStart, "AI target grid helper not found");
const classStart = source.indexOf("(ioTypes.nearestDifferentMaster = class extends IO {");
const classEnd = source.indexOf("(ioTypes.roamWhenIdle = class extends IO {", classStart);
assert.ok(classStart >= 0 && classEnd > classStart, "nearestDifferentMaster not found");

const helper = source.slice(helperStart, helperEnd);
let assignment = source.slice(classStart, classEnd).trim();
assignment = assignment.replace(/,\s*$/, "");

const sandbox = {
  console,
  c: { RANKED_BATTLE: false },
  room: { speed: 1 },
  ran: { irandom() { return 0; } },
  newLogs: {
    buildList: { start() {}, stop() {} },
    targeting: { start() {}, stop() {} },
  },
  util: {
    getDirection(a, b) { return Math.atan2(b.y - a.y, b.x - a.x); },
    angleDifference(a, b) {
      let d = a - b;
      while (d > Math.PI) d -= Math.PI * 2;
      while (d < -Math.PI) d += Math.PI * 2;
      return d;
    },
  },
  nearest(list, point) {
    let best = null, bestDist = Infinity;
    for (const item of list) {
      const dx = item.x - point.x, dy = item.y - point.y;
      const d = dx * dx + dy * dy;
      if (d < bestDist) bestDist = d, best = item;
    }
    return best;
  },
  timeOfImpact() { return 0; },
};
vm.createContext(sandbox);
vm.runInContext(
  "let targetableEntities = [];\n" +
  helper +
  "\nclass IO { constructor(body) { this.body = body; this.acceptsFromTop = true; } }\n" +
  "const ioTypes = {};\n" +
  assignment +
  ";\n" +
  "globalThis.__AI = { AITargetGrid, aiTargetGrid, isAITargetGridCandidate, getAITargetSearchBounds, NDM: ioTypes.nearestDifferentMaster, targetableEntities };",
  sandbox
);
const { AITargetGrid, aiTargetGrid, isAITargetGridCandidate, getAITargetSearchBounds, NDM, targetableEntities } = sandbox.__AI;

assert.ok(isAITargetGridCandidate({ type: "tank" }));
assert.ok(isAITargetGridCandidate({ type: "food" }));
assert.ok(isAITargetGridCandidate({ type: "drone" }));
assert.ok(!isAITargetGridCandidate({ type: "bullet" }));
assert.ok(!isAITargetGridCandidate({ type: "trap" }));

const cellGrid = new AITargetGrid(8);
const cellObjects = [
  { id: 1, x: 255.9, y: 10 },
  { id: 2, x: 256.1, y: 10 },
  { id: 3, x: -0.1, y: -0.1 },
  { id: 4, x: -256.1, y: 10 },
];
cellObjects.forEach(e => cellGrid.insert(e));
let seen = [];
cellGrid.query(250, -10, 260, 20, e => seen.push(e.id));
assert.deepEqual(seen.sort((a, b) => a - b), [1, 2], "adjacent-cell query");
seen = [];
cellGrid.query(-300, -20, 1, 20, e => seen.push(e.id));
assert.deepEqual(seen.sort((a, b) => a - b), [3, 4], "negative coordinates");

function makeBody(team = -1) {
  let healthRatio = 1;
  const root = { x: 0, y: 0, team, passive: false };
  const master = { master: root, autoOverride: false, fov: 600 };
  const body = {
    id: 1000,
    x: 0, y: 0, roomId: 1,
    fov: 600, size: 20, topSpeed: 10,
    master,
    aiSettings: { BLIND: false, SKYNET: false, IGNORE_SHAPES: false, view360: true },
    settings: { targetPlanes: false },
    firingArc: null,
    isArenaCloser: false,
    isBot: true,
    isMothership: false,
    guns: [],
    collisionArray: [],
    health: { display() { return healthRatio; } },
    setHealth(v) { healthRatio = v; },
  };
  return body;
}
function makeTarget(id, x, y, team = -2, type = "tank", roomId = 1) {
  const root = { team, passive: false };
  const master = { id, master: root };
  const target = {
    id, x, y, roomId, type,
    dangerValue: 1,
    invuln: false,
    alpha: 1,
    isPlane: false,
    health: { amount: 100 },
    master,
    source: null,
    velocity: { x: 0, y: 0 },
  };
  target.source = target;
  return target;
}
function repopulate(list) {
  targetableEntities.length = 0;
  aiTargetGrid.clear();
  for (const entity of list) {
    if (!isAITargetGridCandidate(entity)) continue;
    targetableEntities.push(entity);
    aiTargetGrid.insert(entity);
  }
}

const boundsBody = makeBody();
boundsBody.x = 100; boundsBody.y = 200;
boundsBody.master.master.x = 120; boundsBody.master.master.y = 220;
let bounds = getAITargetSearchBounds(boundsBody, 300);
assert.ok(bounds.x1 <= 100 && bounds.x2 >= 100, "normal bounds include body");
boundsBody.aiSettings.BLIND = true;
bounds = getAITargetSearchBounds(boundsBody, 300);
assert.ok(bounds.x1 < boundsBody.master.master.x && bounds.x2 > boundsBody.master.master.x, "BLIND uses master bounds");
boundsBody.aiSettings.SKYNET = true;
assert.equal(getAITargetSearchBounds(boundsBody, 300), null, "BLIND+SKYNET falls back to list");
boundsBody.aiSettings.BLIND = false;
bounds = getAITargetSearchBounds(boundsBody, 300);
assert.ok(bounds.x1 <= boundsBody.x && bounds.x2 >= boundsBody.x, "SKYNET uses body bounds");

const body = makeBody();
const friendly = makeTarget(1, 40, 0, -1);
const first = makeTarget(2, 120, 0, -2);
const closer = makeTarget(3, 60, 0, -2);
repopulate([friendly, first]);
let controller = new NDM(body);
let output = controller.think({ main: false, alt: false });
assert.equal(controller.targetLock, first, "acquires enemy, ignores friendly");
assert.equal(output.fire, true);
assert.equal(output.main, true);

repopulate([friendly, first, closer]);
for (let i = 0; i < 20; i++) controller.think({ main: false, alt: false });
assert.equal(controller.targetLock, first, "valid lock stays sticky before fallback reconsideration");

first.health.amount = 0;
controller.think({ main: false, alt: false });
assert.equal(controller.targetLock, closer, "dead lock invalidates and reacquires");

body.settings.targetPlanes = true;
const plane = makeTarget(4, 80, 0, -2, "drone");
plane.isPlane = true;
const groundDrone = makeTarget(5, 40, 0, -2, "drone");
repopulate([plane, groundDrone]);
controller = new NDM(body);
controller.think({ main: false, alt: false });
assert.equal(controller.targetLock, plane, "plane targeting restriction");

sandbox.c.RANKED_BATTLE = true;
body.settings.targetPlanes = false;
const wrongRoom = makeTarget(6, 20, 0, -2, "tank", 2);
const rightRoom = makeTarget(7, 100, 0, -2, "tank", 1);
repopulate([wrongRoom, rightRoom]);
controller = new NDM(body);
controller.think({ main: false, alt: false });
assert.equal(controller.targetLock, rightRoom, "ranked-room filter");
sandbox.c.RANKED_BATTLE = false;

const attacker = makeTarget(8, 200, 0, -3);
repopulate([rightRoom, attacker]);
controller = new NDM(body);
controller.think({ main: false, alt: false });
body.setHealth(0.7);
body.collisionArray = [{ master: attacker, source: attacker }];
controller.think({ main: false, alt: false });
assert.equal(controller.targetLock, attacker, "damage retaliation");
body.collisionArray = [];
body.setHealth(0.9);
controller.think({ main: false, alt: false });
assert.equal(controller.oldHealth, 0.9, "healing refreshes retaliation baseline");

const attacker2 = makeTarget(9, 220, 0, -4);
body.setHealth(0.85);
body.collisionArray = [{ master: attacker2, source: attacker2 }];
controller.think({ main: false, alt: false });
assert.equal(controller.targetLock, attacker2, "post-heal damage still retaliates");

body.collisionArray = [];
for (let i = 0; i < 80; i++) {
  const result = controller.think({ main: false, alt: false });
  assert.equal(result.fire, true);
  assert.equal(result.main, true);
  assert.equal(result.target.x, attacker2.x - body.x);
  assert.equal(result.target.y, attacker2.y - body.y);
}

console.log("AI target grid boundaries, lazy locks, filters, retaliation, and aim/fire behavior pass");
