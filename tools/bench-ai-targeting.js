// Synthetic AI-only ticks: no renderer, physics, collisions, or real server MSPT.
// node tools/bench-ai-targeting.js [baseline-ref]
const { execFileSync } = require('node:child_process');
const { performance } = require('node:perf_hooks');
const assert = require('node:assert/strict');
const { runtime, entity, root } = require('./test-ai-targeting');
const baselineRef = process.argv[2] || 'da8bfdee49f286a991f367115459a66ce2b8bf74';
const baseline = execFileSync('git', ['show', baselineRef + ':server.js'], { cwd: root, encoding: 'utf8', maxBuffer: 8e6 });

// Compare the actual old/new validation and aiming paths before benchmarking.
const old = runtime(baseline), modern = runtime();
const body = entity({ team: 0, x: -255.5, y: 256, isBot: true });
const master = entity({ team: 0, x: 1000, y: -500 }); body.master = master;
let seed = 7919;
const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 2 ** 32; };
const types = ['tank', 'miniboss', 'crasher', 'food', 'drone', 'minion', 'bullet', 'trap', 'swarm', 'wall'];
const candidates = Array.from({ length: 2500 }, (_, i) => entity({ x: random() * 6000 - 3000,
  y: random() * 6000 - 3000, type: types[i % types.length], team: i % 5,
  alpha: random(), passive: i % 13 === 0, invuln: i % 17 === 0, roomId: i % 2, isPlane: i % 3 === 0 }));
old.populate(candidates); modern.populate(candidates);
const a = new old.Controller(body), b = new modern.Controller(body);
for (let bits = 0; bits < 128; bits++) {
  body.aiSettings = { BLIND: !!(bits & 1), SKYNET: !!(bits & 2), IGNORE_SHAPES: !!(bits & 4),
    seeInvisible: !!(bits & 8), view360: !!(bits & 16), farm: true };
  body.settings.targetPlanes = !!(bits & 32);
  old.ctx.c.RANKED_BATTLE = modern.ctx.c.RANKED_BATTLE = !!(bits & 64);
  body.firingArc = [0.4, 2.5];
  const ids = list => Array.from(list, e => e.id).sort((a, b) => a - b);
  assert.deepEqual(ids(a.buildList(1800)), ids(b.buildList(1800)), 'baseline acquisition candidates, flags ' + bits);
}
body.master = body; body.aiSettings = {}; body.settings = {}; body.firingArc = null;
body.guns = [{ canShoot: true, getTracking: () => ({ speed: 15, range: 1000 }) }];
const movingTarget = entity({ x: -100, y: 260, velocity: { x: 2, y: -1 } });
old.populate([movingTarget]); modern.populate([movingTarget]);
a.targetLock = b.targetLock = movingTarget; a.tick = b.tick = -90;
b.reconsiderIn = 120;
for (let tick = 0; tick < 80; tick++) {
  movingTarget.x += 0.1;
  const x = a.think({}), y = b.think({});
  assert.equal(x.fire, y.fire); assert.equal(x.main, y.main);
  assert.equal(x.target.x, y.target.x); assert.equal(x.target.y, y.target.y);
}
console.log('Baseline differential: 128 targeting flag combinations and 80 locked aiming ticks pass.');

function run(config, optimized) {
  const rt = runtime(optimized ? undefined : baseline);
  let localSeed = 1;
  const rand = () => { localSeed = (Math.imul(localSeed, 1664525) + 1013904223) >>> 0; return localSeed / 2 ** 32; };
  const all = [], bots = [];
  for (let i = 0; i < config.bots; i++) {
    const body = entity({ isBot: true, team: i % 2, x: rand() * config.world, y: rand() * config.world,
      fov: config.fov || 1000 });
    bots.push(body); all.push(body, entity({ team: 1 - body.team, x: body.x + 100, y: body.y }));
  }
  for (let i = 0; i < config.food; i++) all.push(entity({ type: 'food', x: rand() * config.world, y: rand() * config.world, team: -100 }));
  for (let i = 0; i < config.bullets; i++) all.push(entity({ type: 'bullet', x: rand() * config.world, y: rand() * config.world, team: i % 2 }));
  rt.populate(all);
  const controllers = bots.map(e => new rt.Controller(e));
  for (let n = 0; n < 120; n++) for (const ai of controllers) ai.think({});
  const stats = optimized ? rt.stats() : null;
  rt.timings.searches = rt.timings.buildMs = rt.timings.targetingMs = 0;
  const ticks = 360, started = performance.now();
  let maintenanceMs = 0;
  for (let tick = 0; tick < ticks; tick++) {
    // Move a fifth of entities each tick; both implementations get identical motion.
    for (let i = tick % 5; i < all.length; i += 5) { all[i].x += 0.5; all[i].y -= 0.25; }
    if (optimized) {
      const before = performance.now();
      rt.ctx.aiTargetGrid.refresh();
      // Include WeakMap membership probes for projectiles in timing.
      for (const e of all) rt.ctx.aiTargetGrid.update(e);
      maintenanceMs += performance.now() - before;
    }
    for (const ai of controllers) ai.think({});
    if (optimized) {
      const before = performance.now();
      rt.ctx.aiTargetGrid.clear();
      for (const e of all) rt.ctx.aiTargetGrid.add(e);
      maintenanceMs += performance.now() - before;
    }
  }
  return { scene: config.name, implementation: optimized ? 'grid + lazy' : 'baseline',
    entities: all.length, gridEntities: rt.ctx.aiTargetGrid.members.length,
    syntheticTickMs: +( (performance.now() - started) / ticks).toFixed(3),
    targetingMs: +(rt.timings.targetingMs / ticks).toFixed(3),
    buildListMs: +(rt.timings.buildMs / ticks).toFixed(3),
    gridMaintenanceMs: +(maintenanceMs / ticks).toFixed(3),
    searchesPerTick: +(rt.timings.searches / ticks).toFixed(3),
    candidatesPerSearch: stats ? +(stats.candidatesVisited / stats.searches).toFixed(1) : all.length };
}
const results = [];
for (const scene of [
  { name: 'normal', bots: 40, bullets: 200, food: 400, world: 12000 },
  { name: 'projectiles', bots: 40, bullets: 10000, food: 400, world: 12000 },
  { name: 'food', bots: 60, bullets: 200, food: 6000, world: 12000 },
  { name: 'dense Growth-like', bots: 80, bullets: 8000, food: 2000, world: 3000, fov: 1800 },
]) {
  results.push(run(scene, false), run(scene, true));
}
console.table(results);
if (process.env.AI_BENCH_JSON) console.log(JSON.stringify(results, null, 2));
