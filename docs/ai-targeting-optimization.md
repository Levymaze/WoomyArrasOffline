# AI targeting optimization

Base: upstream `da8bfdee49f286a991f367115459a66ce2b8bf74` (includes PRs #14 and #15).

## Implementation

- Separate 256-unit center grid for tanks, minibosses, crashers, food, drones and minions. It is loaded from `index.html` before the server. Collision HSHG is independent.
- Rebuild alongside the existing active/non-passive target list at tick end. Refresh existing members after collisions and update each entity's membership after its tick so normal collision/physics/portal movement does not leave stale cell membership for later controllers.
- Cache coordinates/keys and reuse buckets and controller `validTargets` arrays. Queries visit candidates without allocating a result array. Huge query regions iterate occupied cells; non-finite/unsafe query bounds use the global fallback.
- Query the body square normally and with SKYNET, the larger master square with BLIND, and the retained global list with BLIND+SKYNET. Original rectangular range tests and semantic checks remain authoritative.
- First think and invalidation acquire immediately. An empty search retries in 1–4 ticks; a valid lock reconsiders in 90–120 ticks. Offsets are randomized. Existing bot/mothership acquisition range (0.65 × tracking range) and full lock-retention range remain distinct.
- Locks also check firing arcs every tick. The first damage collision resolves to the same owner/source as before, with eligibility checked before retaliation. Health is sampled each tick, allowing retaliation after healing; the stale `validTargets.indexOf(hit)` exclusion no longer blocks an eligible attacker.
- Danger/farm selection preserves the existing order-dependent rule. Grid enumeration can change tie/order outcomes. Weapon tracking, the `this.isBot` discrepancy, lead formula/cadence, movement, and combat style are not redesigned.

## Automated verification

```sh
node tools/test-ai-targeting.js
node tools/bench-ai-targeting.js
node tools/test-hshg-cross-level.js
node tools/test-entity-id-map.js
node --check server.js
node --check js/ai-target-grid.js
```

The focused harness executes the actual controller and tick orchestration with isolated entity fixtures. It covers eligibility, plane targeting, visibility, ranked rooms, arcs, all BLIND/SKYNET combinations, cell edges/negative positions, a moving spatial oracle, invalid centers, immediate invalidation, delayed empty retries, damage after healing, overrides, and danger/farm ordering.

The benchmark also compares old/new candidate sets across 128 settings combinations and exact aim/fire output for 80 locked ticks using the real lead formula. Baseline comes from `git show` at the base above; an alternate baseline ref can be supplied as the first argument.

## Synthetic results

One run on Node 24, 360 measured ticks after warmup, with a fifth of entities moved each tick. Counts and time include all controller calls plus the new grid's refresh, per-entity update probes and rebuild. No collision physics, rendering, real weapons, or full game modes are simulated. These are **not in-game MSPT results**. Timing varies with runtime/JIT/load.

| Fixture | Bots | Active entities | Baseline synthetic ms/tick | New synthetic ms/tick | Baseline candidates/search | New candidates/search | Searches/tick, old → new |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Normal | 40 | 680 | 0.424 | 0.228 | 680 | 8.3 | 1.475 → 0.336 |
| 10,000 projectiles | 40 | 10,480 | 5.626 | 0.686 | 10,480 | 8.3 | 1.475 → 0.336 |
| 6,000 food | 60 | 6,320 | 5.227 | 2.385 | 6,320 | 91.1 | 2.219 → 0.506 |
| Dense Growth-like | 80 | 10,160 | 12.068 | 1.290 | 10,160 | 996.2 | 2.953 → 0.683 |

| Fixture | Baseline targeting ms/tick | New targeting ms/tick | Baseline buildList ms/tick | New buildList ms/tick | New grid maintenance ms/tick |
| --- | ---: | ---: | ---: | ---: | ---: |
| Normal | 0.412 | 0.076 | 0.363 | 0.006 | 0.142 |
| Projectiles | 5.584 | 0.082 | 5.529 | 0.009 | 0.562 |
| Food | 5.197 | 0.147 | 5.120 | 0.038 | 2.202 |
| Dense Growth-like | 12.014 | 0.437 | 11.890 | 0.302 | 0.797 |

Adding ordinary projectiles leaves local acquisition candidate counts unchanged. The population step still visits active entities, and tick bookkeeping still probes their grid membership; total server cost is not independent of projectile count.

## Local smoke and counters (pending)

Enable in the game's console:

```js
globalThis.__aiTargetDebug = true;
```

After a tick, `globalThis.__aiTargetStats` holds the most recent tick's searches, candidatesVisited, candidatesValidated, globalCandidates (old full-scan size summed over searches), globalScans, lockedControllers, invalidations, damageRetargets, fallbackReconsiderations, buildListMs, targetingMs, controllerMs, mspt, gridEntities, globalEntities and averageCandidates. Locked controllers means controller invocations ending with a lock in that tick. `controllerMs` covers all controller think calls; `targetingMs` is its nearestDifferentMaster subset.

Sample for 15 seconds:

```js
(() => {
  globalThis.__aiTargetDebug = true;
  const samples = [];
  let lastTick;
  const timer = setInterval(() => {
    const s = globalThis.__aiTargetStats;
    if (s && s.tick !== lastTick) {
      lastTick = s.tick;
      samples.push({ ...s });
    }
  }, 10);
  setTimeout(() => {
    clearInterval(timer);
    if (!samples.length) return console.log('No game ticks sampled');
    const sum = key => samples.reduce((n, s) => n + s[key], 0);
    console.table({
      sampledTicks: samples.length,
      mspt: sum('mspt') / samples.length,
      controllerMs: sum('controllerMs') / samples.length,
      targetingMs: sum('targetingMs') / samples.length,
      buildListMs: sum('buildListMs') / samples.length,
      searchesPerTick: sum('searches') / samples.length,
      candidatesPerSearch: sum('candidatesVisited') / Math.max(1, sum('searches')),
      oldGlobalCandidatesPerSearch: sum('globalCandidates') / Math.max(1, sum('searches')),
    });
  }, 15000);
})();
```

Sampling can miss ticks when the browser is busy. Record the same scene/settings on the base and branch; disable counters for final FPS/MSPT measurements. `__aiTargetGlobalScan = true` while debugging uses the old global candidate source but retains the new lock scheduling; this is a spatial diagnostic, not the full old implementation. Set both debug flags to false to stop instrumentation.

Run FFA, TDM, Growth, Growth Siege, Dominator/Mothership AI, and Ranked Battle if available. Check nearby enemy acquisition, friendly/passive/invulnerable/invisible exclusions, IGNORE_SHAPES, range/arc/room invalidation, target death, damage retaliation and continued aim/fire while the target moves. Repeat in ordinary fights, projectile floods, many polygons and dense Growth combat. Full game-mode smokes and actual MSPT/AI/controller measurements remain for the local build.

The entire implementation is one commit on `perf/ai-target-grid`; revert that commit to remove it, including its script tag. No merge into either main is required for testing.
