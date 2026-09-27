// Run with: node tools/test-hshg-cross-level.js
// Compare the optimized cross-level search with an exhaustive overlap scan.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const context = { module: { exports() {} } };
vm.runInNewContext(fs.readFileSync(path.join(root, "js/hshg-cross-level-query.js"), "utf8"), context);
vm.runInNewContext(fs.readFileSync(path.join(root, "js/10-part.js"), "utf8"), context);
const { HSHG } = context;

let seed = 18281;
function random() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 0x100000000;
}

let nextId = 0;
function entity(x, y, width, height) {
  const box = { min: [x, y], max: [x + width, y + height], active: true };
  return { id: nextId++, team: -1, type: "bullet", isGhost: false, box, getAABB() { return box; } };
}

function key(a, b) {
  return [Math.min(a.id, b.id), Math.max(a.id, b.id)].join(":");
}

function expectedPairs(grid) {
  const expected = new Set();
  const objects = grid._globalObjects;
  for (let i = 0; i < objects.length; i++) {
    const a = objects[i], x = a.getAABB();
    if (!x.active) continue;
    for (let j = i + 1; j < objects.length; j++) {
      const b = objects[j], y = b.getAABB();
      if (!y.active || a.HSHG.grid === b.HSHG.grid) continue;
      if (x.min[0] <= y.max[0] && x.max[0] >= y.min[0] &&
          x.min[1] <= y.max[1] && x.max[1] >= y.min[1]) expected.add(key(a, b));
    }
  }
  return expected;
}

function verify(grid) {
  grid.update();
  const pairs = grid.queryForCollisionPairs();
  const called = [];
  assert.equal(grid.queryForCollisionPairs((a, b) => called.push([a, b])), null);
  const expected = expectedPairs(grid);
  for (const result of [pairs, called]) {
    const actual = new Set();
    for (const [a, b] of result) {
      if (a.HSHG.grid === b.HSHG.grid) continue;
      assert.ok(a.HSHG.grid.cellSize < b.HSHG.grid.cellSize, "cross-level argument order");
      const id = key(a, b);
      assert.ok(!actual.has(id), `duplicate cross-level pair ${id}`);
      actual.add(id);
    }
    assert.deepEqual([...actual].sort(), [...expected].sort());
  }
  return expected.size;
}

const grid = new HSHG();
const initial = entity(-100, -100, 8, 8);
grid.addObject(initial);
grid.addObject(entity(-100, -100, 200, 180));
for (let i = 0; i < 220; i++) {
  const size = i % 17 === 0 ? 180 + random() * 200 : 3 + random() * 25;
  grid.addObject(entity(random() * 900 - 450, random() * 900 - 450, size, size * (0.5 + random())));
}

let verifiedOverlaps = 0;
for (let frame = 0; frame < 50; frame++) {
  // Growth can exceed the cell size selected when the entity was registered.
  if (frame === 0) {
    const cell = initial.HSHG.grid.cellSize;
    initial.box.min = [-cell, -cell];
    initial.box.max = [-cell + cell * 1.5, -cell + cell * 1.7];
  }
  if (frame === 1) {
    const cell = initial.HSHG.grid.cellSize;
    const span = cell * (initial.HSHG.grid.rowColumnCount + 3);
    initial.box.max = [initial.box.min[0] + span, initial.box.min[1] + span];
  }
  if (frame === 2) {
    const cell = initial.HSHG.grid.cellSize;
    initial.box.max = [initial.box.min[0] + cell * 1.5, initial.box.min[1] + cell * 1.7];
  }
  for (const object of grid._globalObjects) {
    if (random() < 0.16) {
      const box = object.box;
      const dx = (random() - 0.5) * 30, dy = (random() - 0.5) * 30;
      box.min[0] += dx; box.max[0] += dx;
      box.min[1] += dy; box.max[1] += dy;
    }
    if (random() < 0.02) {
      object.box.max[0] += random() * 15;
      object.box.max[1] += random() * 15;
    }
    object.box.active = random() > 0.06;
  }
  if (frame === 1) {
    initial.box.active = true;
    assert.ok(initial.box.max[0] - initial.box.min[0] >
      initial.HSHG.grid.rowColumnCount * initial.HSHG.grid.cellSize);
  }
  if (frame % 10 === 3) grid.addObject(entity(-25, 15, 70 + frame, 12));
  if (frame % 10 === 8) grid.removeObject(grid._globalObjects[grid._globalObjects.length - 1]);
  verifiedOverlaps += verify(grid);
}

assert.ok(verifiedOverlaps > 0, "test scenes must contain cross-level overlaps");
console.log(`HSHG cross-level pairs match exhaustive scan across 50 moving Growth frames (${verifiedOverlaps} overlaps)`);
