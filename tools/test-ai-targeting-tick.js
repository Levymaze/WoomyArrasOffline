// Run the real game-tick orchestration and per-entity lifecycle with fixture
// entities. This covers the population loop that controller-only tests missed.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { runtime, entity, source, root } = require('./test-ai-targeting');
const rt = runtime(), { ctx, Controller } = rt;
const loop = source.indexOf('      gameLoop =');
const entityTickStart = source.indexOf('          t = (e) => {', loop);
const tickStart = source.indexOf('        return () => {\n          let s = performance.now();', entityTickStart);
const tickEnd = source.indexOf('\n      })(),\n      abilityLoop', tickStart);
assert.ok(loop >= 0 && entityTickStart > loop && tickStart > entityTickStart && tickEnd > tickStart);
const noop = { start() {}, stop() {}, reset() {}, tally() {}, set() {}, mark() {} };
ctx.newLogs = new Proxy({}, { get: () => noop });
ctx.logs = new Proxy({}, { get: () => noop });
ctx.util.time = () => 0;
ctx.chunkar = pairs => [pairs];
ctx.grid = { update() {}, queryForCollisionPairs: () => [] };
ctx.room.wallCollisions = [];
ctx.deathWithTrace = e => e.health.amount <= 0;
ctx.destroyWithTrace = e => { e.isGhost = true; };
ctx.purgeEntities = () => { ctx.entities = ctx.entities.filter(e => !e.isGhost); };
ctx.e = () => {};
function fixture(options) {
  const e = entity(options);
  e.shield = { amount: 0 };
  e.activation = { update() {}, check: () => !e.inactive };
  e.physics = () => { e.x += e.velocity.x; e.y += e.velocity.y; };
  e.life = () => {};
  e.friction = e.location = e.takeSelfie = e.updateAABB = () => {};
  return e;
}
const enemy = fixture({ x: 100, team: 2 });
const bot = fixture({ team: 1, isBot: true });
const replacement = fixture({ x: 200, team: 2 });
const bullet = fixture({ x: 10, type: 'bullet', team: 2 });
const passive = fixture({ passive: true });
const inactive = fixture({ inactive: true });
const ai = new Controller(bot);
bot.life = () => { bot.output = ai.think({}); };
ctx.entities = [enemy, bot, replacement, bullet, passive, inactive];
ctx.__aiTargetDebug = true;
vm.runInContext(source.slice(entityTickStart, tickStart).replace('t =', 'globalThis.t ='), ctx);
const gameTick = vm.runInContext('(() => {' + source.slice(tickStart, tickEnd) + '})()', ctx);

// No constructor search; population must succeed on the first non-empty tick.
gameTick();
assert.equal(ctx.__aiTargetStats.gridEntities, 3);
assert.equal(ctx.__aiTargetStats.globalEntities, 4, 'debug list retains ordinary projectiles');
for (let n = 0; n < 4; n++) gameTick();
assert.equal(ai.targetLock, enemy);
assert.equal(bot.output.fire, true);
for (let n = 0; n < 20; n++) gameTick();
assert.equal(ctx.__aiTargetStats.searches, 0, 'stable lock does not rebuild');

// Death/destroy/purge and reacquisition run through the real entity loop.
enemy.health.amount = 0;
gameTick();
assert.ok(!ctx.entities.includes(enemy));
assert.equal(ai.targetLock, replacement);
assert.equal(ctx.__aiTargetStats.invalidations, 1);
assert.equal(ctx.__aiTargetStats.gridEntities, 2);

// Actual collision phase relocates a candidate before controller execution.
const incoming = fixture({ x: 4000, team: 2 });
ctx.entities.push(incoming);
gameTick();
ctx.grid.queryForCollisionPairs = () => [[bot, incoming]];
ctx.e = () => { incoming.x = 250; };
replacement.health.amount = 0;
gameTick();
assert.equal(ai.targetLock, incoming, 'post-collision grid refresh');
ctx.grid.queryForCollisionPairs = () => [];

// Real physics crosses a cell boundary before a later controller acquires.
ctx.entities = [incoming, bot];
bot.fov = 256;
incoming.x = 300;
gameTick();
assert.equal(ai.targetLock, undefined);
incoming.velocity.x = -150;
ai.needsTarget = true;
gameTick();
assert.equal(incoming.x, 150);
assert.equal(ai.targetLock, incoming, 'post-physics membership update');

// Dangerous query bounds must return a fallback signal, never hang.
assert.equal(vm.runInContext('aiTargetGrid.query(-Infinity, 0, Infinity, 0, () => {})', ctx, { timeout: 100 }), false);
assert.equal(vm.runInContext('aiTargetGrid.query(-1e300, 0, 1e300, 0, () => {})', ctx, { timeout: 100 }), false);
let visits = 0;
assert.equal(ctx.aiTargetGrid.query(-1e12, -1e12, 1e12, 1e12, () => visits++), true);
assert.equal(visits, 2, 'huge finite query visits occupied cells once');

// The browser must load the new helper before the dynamically loaded server.
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.equal((html.match(/src="js\/ai-target-grid\.js"/g) || []).length, 1);
assert.ok(html.indexOf('src="js/ai-target-grid.js"') < html.indexOf('src="js/32-mockup-polyfill.js'));
console.log('AI tick integration: initial population, live locks, death/purge, collision/physics movement, safe bounds and script loading pass');
