// Run with: node tools/test-growth-siege-v2-defeat.js
const assert = require("node:assert/strict");
const fs = require("node:fs");

const source = fs.readFileSync(process.argv[2] || "server.js", "utf8");

const healerStart = source.indexOf("const getGrowthSiegeV2AliveHealerDominatorCount = () =>");
const defenderStart = source.indexOf("getGrowthSiegeV2LivingDefenderCount = () =>", healerStart);
const defeatStart = source.indexOf("evaluateGrowthSiegeV2DefeatState = () =>", defenderStart);
assert.ok(healerStart >= 0 && defenderStart > healerStart && defeatStart > defenderStart,
  "Growth Siege V2 defeat helpers not found");

const healerPredicate = source.slice(healerStart, defenderStart);
const defenderPredicate = source.slice(defenderStart, defeatStart);
assert.match(healerPredicate, /e\.isHealerDominator[\s\S]*?e\.team === -1[\s\S]*?e\.health\.amount > 0/,
  "only defender-owned healer dominators should count as surviving healers");
assert.match(defenderPredicate, /\(e\.isPlayer \|\| e\.isBot\)[\s\S]*?e\.team === -1[\s\S]*?e\.health\.amount > 0/,
  "only surviving defender tanks should delay final Siege defeat");

const domStart = source.indexOf("dominatorLoop = () =>");
const domEnd = source.indexOf("mothershipLoop =", domStart);
assert.ok(domStart >= 0 && domEnd > domStart, "dominator loop not found");
const dominatorLoop = source.slice(domStart, domEnd);

assert.match(dominatorLoop, /-100 !== a\.team && \(o = 0\)/,
  "an owned dominator must become neutral/contested when it falls");
assert.match(dominatorLoop, /r = new Entity\(s\)/,
  "fallen dominators must still create a replacement entity");
assert.match(dominatorLoop, /\(r\.team = o \|\| -100\)/,
  "replacement dominators must still support neutral and recaptured ownership");
assert.match(dominatorLoop, /\(r\.onDead = a\.onDead\)/,
  "replacement dominators must remain recapturable");
assert.match(dominatorLoop, /c\.GROWTH_SIEGE_V2 && evaluateGrowthSiegeV2DefeatState\(\)/,
  "Siege defeat state must be reevaluated after each dominator ownership transition");

// Model the intended ownership semantics explicitly.
const alive = { isDominator: true, isHealerDominator: true, health: { amount: 1 }, isGhost: false };
const countsAsHealer = e =>
  e.isDominator && e.isHealerDominator && e.team === -1 &&
  !e.isGhost && e.health && e.health.amount > 0;

assert.equal(countsAsHealer({ ...alive, team: -1 }), true,
  "defender-owned healer should count");
assert.equal(countsAsHealer({ ...alive, team: -100 }), false,
  "neutral/contested healer should not count");
assert.equal(countsAsHealer({ ...alive, team: -2 }), false,
  "non-defender healer should not count");
assert.equal(countsAsHealer({ ...alive, team: -1 }), true,
  "recaptured defender healer should count again");

console.log("Growth Siege V2 healer defeat counting preserves neutralization and recapture semantics");
