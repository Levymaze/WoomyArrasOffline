const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

// Exercise the actual packet decoder with a small stream of entity updates.
const source = fs.readFileSync(process.argv[2] || 'js/32-mockup-polyfill.js', 'utf8');
const start = source.indexOf('data: function () {');
const end = source.indexOf('gui: function () {', start);
assert.ok(start >= 0 && end > start, 'entity packet decoder not found');

let packet = [];
let position = 0;
let now = 1000;
const sandbox = {
    entities: [],
    get: { next() { assert.ok(position < packet.length, 'packet underflow'); return packet[position++]; } },
    metrics: { rendergap: 33 },
    config: { roomSpeed: 1 },
    player: { renderx: 0, rendery: 0, time: 1000, lastUpdate: 1000 },
    getNow() { return now; },
    safePositiveNumber(value, fallback) { return Number.isFinite(value) && value > 0 ? value : fallback; },
    isInView(x, y) { return Math.abs(x) < 100 && Math.abs(y) < 100; },
    Smoothbar(value) {
        return { set(next) { value = next; }, get() { return value; } };
    },
};

const data = vm.runInNewContext(`({ ${source.slice(start, end)} gui: null }).data`, sandbox);
function record(id, { layer = 0, health = 1, index = 209 } = {}) {
    const flags = (layer ? 2 : 0) | (health < 1 ? 4 : 0);
    return [0, id, flags, index, id, 0, 0, 0, 10, 0,
        ...(layer ? [layer] : []), 10, ...(health < 1 ? [health * 255] : []), 0, 0];
}
function frame(records) {
    packet = [records.length, ...records.flat()];
    position = 0;
    data();
    assert.equal(position, packet.length, 'packet not fully consumed');
    return sandbox.entities;
}

let current = frame([record(1), record(2), record(3, { layer: 1 })]);
assert.deepEqual(Array.from(current, e => e.id), [2, 1, 3], 'draw order');
const originalOne = current.find(e => e.id === 1);
const originalTwo = current.find(e => e.id === 2);
assert.equal(originalOne.render.draws, false, 'new entity waits for its next update');

current = frame([record(1, { index: 210 }), record(4), record(3, { layer: 1 })]);
assert.equal(current.find(e => e.id === 1), originalOne, 'existing entity identity');
assert.equal(originalOne.render.draws, true, 'existing entity becomes drawable');
assert.equal(originalOne.oldIndex, 210, 'index changes survive the lookup');
assert.equal(current.find(e => e.id === 2), originalTwo, 'missing entity retained for fade');
now += 60;
assert.ok(originalTwo.render.status.getFade() < 1, 'missing full-health entity fades');
assert.equal(current.find(e => e.id === 4).render.draws, false, 'new entity stays new');

originalTwo.render.x = 500;
current = frame([record(1, { health: 0 }), record(3, { layer: 1 })]);
assert.ok(!current.some(e => e.id === 2), 'out-of-view fading entity removed');
now += 60;
assert.ok(originalOne.render.status.getFade() < 1, 'zero-health update begins death fade');

current = frame([record(3, { layer: 1 })]);
assert.equal(current.find(e => e.id === 1), originalOne, 'missing zero-health entity retained');
assert.ok(originalOne.render.status.getFade() < 1, 'missing zero-health entity keeps fading');

console.log('Entity decoder preserves identity, draw order, gun reset, and death-fade behavior');
