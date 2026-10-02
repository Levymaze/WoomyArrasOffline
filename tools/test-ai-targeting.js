// Tests execute the real controller extracted from server.js, not a copy.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { performance } = require('node:perf_hooks');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'server.js'), 'utf8');
const gridSource = fs.readFileSync(path.join(root, 'js/ai-target-grid.js'), 'utf8');
let nextId = 0;
function entity(options = {}) {
  const e = Object.assign({ id: nextId++, x: 0, y: 0, type: 'tank', team: 1,
    dangerValue: 1, alpha: 1, invuln: false, passive: false, roomId: 0,
    velocity: { x: 0, y: 0 }, topSpeed: 10, size: 10, fov: 1000,
    aiSettings: {}, settings: {}, guns: [], collisionArray: [],
    health: { amount: 100, display() { return this.amount / 100; } },
  }, options);
  e.master ||= e;
  return e;
}
function runtime(text = source) {
  const timings = { searches: 0, buildMs: 0, targetingMs: 0 };
  const log = field => ({ time: 0, start() { this.time = performance.now(); if (field === 'buildMs') timings.searches++; },
    stop() { timings[field] += performance.now() - this.time; }, reset() {} });
  let seed = 1337;
  const ctx = vm.createContext({ ioTypes: {}, IO: class { constructor(body) { this.body = body; } },
    targetableEntities: [], aiTargetStats: null, c: { RANKED_BATTLE: false }, room: { speed: 1 },
    performance, ran: { irandom(n) { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return Math.floor(seed / 2 ** 32 * (n + 1)); } },
    newLogs: { buildList: log('buildMs'), targeting: log('targetingMs') },
    util: { angleDifference(a, b) { const d = (a - b) % (2 * Math.PI); return (2 * d) % (2 * Math.PI) - d; },
      getDirection(a, b) { return Math.atan2(b.y - a.y, b.x - a.x); } },
    timeOfImpact(offset, velocity, speed) { return Math.hypot(offset.x, offset.y) / speed; },
  });
  const impactStart = source.indexOf('    function timeOfImpact(');
  vm.runInContext(source.slice(impactStart, source.indexOf('\n    }', impactStart) + 6), ctx);
  const nearestStart = source.indexOf('    function nearest(');
  vm.runInContext(source.slice(nearestStart, source.indexOf('\n    }', nearestStart) + 6), ctx);
  vm.runInContext(gridSource + '\nglobalThis.aiTargetGrid = new AITargetGrid();', ctx);
  const start = text.indexOf('      (ioTypes.nearestDifferentMaster =');
  const end = text.indexOf('      (ioTypes.roamWhenIdle =', start);
  assert.ok(start >= 0 && end > start);
  vm.runInContext(text.slice(start, end).trim().replace(/,$/, ';'), ctx);
  return { ctx, timings, Controller: ctx.ioTypes.nearestDifferentMaster,
    populate(entities) { ctx.targetableEntities = entities.slice(); ctx.aiTargetGrid.clear(); for (const e of entities) ctx.aiTargetGrid.add(e); },
    stats() { return ctx.aiTargetStats = { searches: 0, candidatesVisited: 0, candidatesValidated: 0,
      globalCandidates: 0, globalScans: 0, lockedControllers: 0, invalidations: 0,
      damageRetargets: 0, fallbackReconsiderations: 0, buildListMs: 0, targetingMs: 0 }; },
  };
}
function tests() {
  const rt = runtime(), { ctx, Controller } = rt;
  const body = entity({ team: 0 });
  const enemy = entity({ x: 100 });
  rt.populate([body, enemy]);
  const ai = new Controller(body);
  assert.equal(rt.timings.searches, 0, 'constructor must not search');
  const storage = ai.validTargets;
  assert.equal(ai.think({}).fire, true);
  assert.equal(ai.targetLock, enemy);
  const searches = rt.timings.searches;
  for (let i = 0; i < 80; i++) { enemy.x++; ctx.aiTargetGrid.update(enemy); ai.think({}); }
  assert.equal(rt.timings.searches, searches, 'valid lock avoids frequent rebuilds');
  assert.equal(ai.targetLock, enemy);
  assert.equal(ai.validTargets, storage);
  ai.reconsiderIn = 1;
  const stats = rt.stats(); ai.think({});
  assert.equal(stats.fallbackReconsiderations, 1);
  assert.ok(ai.reconsiderIn >= 90 && ai.reconsiderIn <= 120);

  for (const [label, mutate] of [
    ['dead', e => e.health.amount = 0], ['team', e => e.team = 0],
    ['passive', e => e.passive = true], ['invulnerable', e => e.invuln = true],
    ['invisible', e => e.alpha = 0.5], ['range', e => e.x = 1001],
    ['ranked room', e => { ctx.c.RANKED_BATTLE = true; e.roomId = 2; }],
    ['arc', e => { body.firingArc = [0, Math.PI / 4]; e.x = -100; }],
  ]) {
    body.firingArc = null; ctx.c.RANKED_BATTLE = false;
    const a = entity({ x: 100 }), b = entity({ x: 200 });
    rt.populate([a, b]); ai.targetLock = a; mutate(a); ctx.aiTargetGrid.update(a);
    ai.think({}); assert.equal(ai.targetLock, b, label + ' must reacquire immediately');
  }
  body.firingArc = null; ctx.c.RANKED_BATTLE = false;
  const excluded = [entity({ team: 0 }), entity({ passive: true }), entity({ invuln: true }),
    entity({ alpha: 0 }), entity({ type: 'food' }), entity({ type: 'bullet' }),
    entity({ type: 'trap' }), entity({ type: 'swarm' }), entity({ type: 'wall' })];
  body.aiSettings.IGNORE_SHAPES = true;
  rt.populate(excluded); assert.equal(ai.buildList(1000).length, 0);
  body.aiSettings = { seeInvisible: true }; rt.populate([excluded[3]]);
  assert.equal(ai.buildList(1000)[0], excluded[3]);
  body.aiSettings = {}; body.isArenaCloser = true;
  assert.equal(ai.buildList(1000)[0], excluded[3]); body.isArenaCloser = false;
  const plane = entity({ type: 'drone', isPlane: true });
  body.settings.targetPlanes = true;
  rt.populate([enemy, plane, entity({ type: 'minion' })]);
  assert.deepEqual(Array.from(ai.buildList(1000)), [plane]);
  body.settings.targetPlanes = false;

  // Exact old rectangular range checks, including master distance and modes.
  const master = entity({ x: 3500, y: -900, team: 0 }); body.master = master;
  const positions = [-3000, -1001, -1000, -999.9, -256, -0.5, 0, 255.9, 256, 700, 999.9, 1000, 3500];
  const candidates = [];
  for (const x of positions) for (const y of positions) candidates.push(entity({ x, y }));
  rt.populate(candidates);
  for (const BLIND of [false, true]) for (const SKYNET of [false, true]) {
    body.aiSettings = { BLIND, SKYNET };
    const actual = new Set(ai.buildList(1000));
    for (const e of candidates) {
      const expected = (BLIND || (e.x * e.x < 1e6 && e.y * e.y < 1e6)) &&
        (SKYNET || ((e.x - master.x) ** 2 < 4e6 / 3 && (e.y - master.y) ** 2 < 4e6 / 3));
      assert.equal(actual.has(e), expected, `mode ${BLIND}/${SKYNET} at ${e.x},${e.y}`);
    }
  }
  body.master = body; body.aiSettings = {};
  const moving = entity({ x: 4000 }); rt.populate([moving]);
  assert.equal(ai.buildList(1000).length, 0);
  moving.x = -0.5; ctx.aiTargetGrid.refresh();
  assert.equal(ai.buildList(1000)[0], moving, 'post-collision refresh');
  moving.x = 800; ctx.aiTargetGrid.update(moving);
  assert.equal(ai.buildList(1000)[0], moving, 'post-physics update');
  moving.x = NaN; ctx.aiTargetGrid.update(moving);
  moving.x = 256; ctx.aiTargetGrid.update(moving);
  assert.equal(ai.buildList(1000)[0], moving, 'invalid center recovers');
  moving.x = Infinity; ctx.aiTargetGrid.update(moving); rt.populate([moving]);
  assert.equal(ctx.aiTargetGrid.members.length, 0, 'non-finite cached position stays excluded');
  moving.x = 256; rt.populate([moving]);
  assert.equal(ctx.aiTargetGrid.query(1e300, 0, 1e300, 0, () => {}), false, 'unsafe coordinates fall back');
  assert.equal(ai.buildList(Infinity)[0], moving, 'non-finite FOV uses global fallback');

  body.isBot = true; body.health.amount = 100;
  const victim = entity({ x: 100 }), attacker = entity({ x: 200 });
  rt.populate([victim, attacker]);
  const bot = new Controller(body); bot.think({}); assert.equal(bot.targetLock, victim);
  body.health.amount = 90; body.collisionArray = [{ master: attacker }];
  bot.think({}); assert.equal(bot.targetLock, attacker, 'immediate retaliation');
  body.health.amount = 100; body.collisionArray = []; bot.think({});
  body.health.amount = 95; body.collisionArray = [{ master: { id: -1 }, source: victim }];
  bot.think({}); assert.equal(bot.targetLock, victim, 'retaliation after healing / source owner');
  body.health.amount = 94; attacker.invuln = true; body.collisionArray = [{ master: attacker }];
  bot.think({}); assert.equal(bot.targetLock, victim, 'ineligible attacker ignored');
  assert.equal(bot.think({ main: true }).fire, undefined); assert.equal(bot.targetLock, undefined);
  bot.think({}); assert.equal(bot.targetLock, victim, 'override release acquires immediately');

  const empty = new Controller(entity({ team: 0 })); rt.populate([]); empty.think({});
  rt.populate([victim]); for (let n = 0; n < 4; n++) empty.think({});
  assert.equal(empty.targetLock, victim, 'targetless retry within four ticks');

  // Same-cell enumeration matches the legacy danger-order quirk exactly.
  const low = entity({ x: 10, dangerValue: 1 }), high = entity({ x: 20, dangerValue: 8 });
  body.isBot = false; body.aiSettings = {}; rt.populate([low, high]);
  assert.deepEqual(Array.from(ai.buildList(1000)), [low, high]);
  rt.populate([high, low]); assert.deepEqual(Array.from(ai.buildList(1000)), [high]);
  body.aiSettings.farm = true; assert.deepEqual(Array.from(ai.buildList(1000)), [high, low]);

  // Exhaustive spatial oracle while repeatedly crossing cell boundaries.
  let seed = 42;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 2 ** 32; };
  const many = Array.from({ length: 500 }, () => entity({ x: random() * 20000 - 10000, y: random() * 20000 - 10000 }));
  rt.populate(many);
  for (let frame = 0; frame < 30; frame++) {
    for (const e of many) { e.x += random() * 1000 - 500; e.y += random() * 1000 - 500; ctx.aiTargetGrid.update(e); }
    body.x = random() * 15000 - 7500; body.y = random() * 15000 - 7500;
    const found = new Set(ai.buildList(1000));
    const expected = many.filter(e => Math.abs(e.x - body.x) < 1000 && Math.abs(e.y - body.y) < 1000);
    assert.equal(found.size, expected.length);
    for (const e of expected) assert.ok(found.has(e), 'spatial query cannot omit an in-range center');
  }
  // Execute the real tick orchestration with stand-ins only for physics/collisions.
  const loop = source.indexOf('      gameLoop =');
  const tickStart = source.indexOf('        return () => {\n          let s = performance.now();', loop);
  const tickEnd = source.indexOf('\n      })(),\n      abilityLoop', tickStart);
  assert.ok(tickStart > loop && tickEnd > tickStart);
  const noop = { start() {}, stop() {}, reset() {}, tally() {}, set() {}, mark() {} };
  ctx.newLogs = new Proxy({}, { get: () => noop });
  ctx.logs = new Proxy({}, { get: () => noop });
  ctx.util.time = () => 1;
  ctx.chunkar = pairs => [pairs];
  const first = entity({ x: 4000 }), second = entity({ x: 300 });
  for (const e of [first, second]) {
    e.activation = { update() {}, check() { return true; } }; e.updateAABB = () => {};
  }
  ctx.entities = [first, second]; ctx.purgeEntities = () => {};
  rt.populate(ctx.entities);
  ctx.grid = { update() {}, queryForCollisionPairs() { return [[first, second]]; } };
  ctx.e = () => { first.x = 200; };
  ctx.t = e => {
    const seen = [];
    ctx.aiTargetGrid.query(0, -1, 400, 1, e => seen.push(e));
    assert.ok(seen.includes(first), 'collision movement is indexed before first think');
    if (e === first) first.x = 300;
    else {
      const afterMove = [];
      ctx.aiTargetGrid.query(256, -1, 400, 1, e => afterMove.push(e));
      assert.ok(afterMove.includes(first), 'physics movement indexed before next think');
    }
  };
  ctx.__aiTargetDebug = true;
  const gameTick = vm.runInContext('(() => { ' + source.slice(tickStart, tickEnd) + ' })()', ctx);
  gameTick();
  assert.equal(ctx.__aiTargetStats.gridEntities, 2);
  assert.equal(ctx.__aiTargetStats.globalEntities, 2);
  assert.ok(Number.isFinite(ctx.__aiTargetStats.mspt));
  ctx.__aiTargetDebug = false; gameTick(); assert.equal(ctx.aiTargetStats, null);
  console.log('AI targeting: eligibility, boundaries, modes, moving-grid oracle, locks, retaliation, and danger semantics pass');
}
module.exports = { runtime, entity, source, root };
if (require.main === module) tests();
