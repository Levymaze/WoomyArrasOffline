// Run with: node tools/benchmark-ai-target-grid.js
const fs = require("node:fs");
const vm = require("node:vm");
const { performance } = require("node:perf_hooks");

const source = fs.readFileSync(process.argv[2] || "server.js", "utf8");
const start = source.indexOf("// Lightweight center-point index used only for AI target acquisition.");
const end = source.indexOf("    room.init();", start);
if (start < 0 || end <= start) throw new Error("AI target grid helper not found");
const context = {};
vm.createContext(context);
vm.runInContext(source.slice(start, end) + "\nglobalThis.__Grid = AITargetGrid; globalThis.__candidate = isAITargetGridCandidate;", context);
const AITargetGrid = context.__Grid;
const isCandidate = context.__candidate;

let seed = 123456789;
function random() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 0x100000000;
}
function entity(type, width = 6500, height = 6500) {
  return { type, x: random() * width, y: random() * height };
}
function scene({ bullets = 0, food = 0, tanks = 0, crashers = 0, drones = 0 }) {
  const out = [];
  for (let i = 0; i < bullets; i++) out.push(entity("bullet"));
  for (let i = 0; i < food; i++) out.push(entity("food"));
  for (let i = 0; i < tanks; i++) out.push(entity("tank"));
  for (let i = 0; i < crashers; i++) out.push(entity("crasher"));
  for (let i = 0; i < drones; i++) out.push(entity("drone"));
  return out;
}
function time(fn, rounds = 500) {
  for (let i = 0; i < 50; i++) fn();
  const start = performance.now();
  for (let i = 0; i < rounds; i++) fn();
  return (performance.now() - start) / rounds;
}
function run(name, entities) {
  const targets = entities.filter(isCandidate);
  const grid = new AITargetGrid(8);
  for (const e of targets) grid.insert(e);
  const x = 3250, y = 3250, range = 650;
  let legacyVisited = 0, gridVisited = 0;

  const legacyMs = time(() => {
    let count = 0;
    for (const e of entities) {
      legacyVisited++;
      if (!isCandidate(e)) continue;
      if (Math.abs(e.x - x) < range && Math.abs(e.y - y) < range) count++;
    }
    return count;
  });
  const gridMs = time(() => {
    let count = 0;
    grid.query(x - range, y - range, x + range, y + range, e => {
      gridVisited++;
      if (Math.abs(e.x - x) < range && Math.abs(e.y - y) < range) count++;
    });
    return count;
  });

  console.log(
    name.padEnd(20),
    "legacy", legacyMs.toFixed(3) + " ms",
    "grid", gridMs.toFixed(3) + " ms",
    "candidates/search", Math.round(gridVisited / 500),
    "vs global", entities.length
  );
}

run("projectile-heavy", scene({ bullets: 10000, tanks: 80, crashers: 40 }));
run("food-heavy", scene({ food: 5000, tanks: 100, crashers: 150 }));
run("dense-mixed", scene({ bullets: 10000, food: 5000, tanks: 300, crashers: 300, drones: 500 }));
