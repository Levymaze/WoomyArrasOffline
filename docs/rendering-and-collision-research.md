# Collision and rendering investigation (2026-09-25)

This note records findings for the offline fork. It is not a benchmark of a published build.

## Collision branch and death bug

- `js/hshg-cross-level-query.js` narrows the cross-level HSHG search to occupied candidate cells. `tools/test-hshg-cross-level.js` compares its output with exhaustive cross-level scans: 12,602 overlaps in 50 moving Growth frames, with no duplicate cross-level pairs.
- A synthetic replay with one victim and 360 overlapping projectiles produced exactly 360 distinct collision pairs on both the baseline and optimized HSHG. The collision optimization did not by itself duplicate kill notices.
- The repeated kill notifications had a separate failure path: `Entity.death()` sent a killer message, then a leader-death announcement contained a NUL character. `fasttalk.encode()` threw `Null containing string!` while broadcasting, preventing `Entity.destroy()` from running. The next tick retried the same death. The source of the NUL within the announcement was not captured.
- The debug branch adds opt-in death tracing (`globalThis.__traceCollisionDeaths = true`) and the fix removes NULs from incoming player names and broadcast messages. The reported in-game repetition stopped after the fix. Keep the tracing gated.

## Offline client path

1. `server.js` runs `gameLoop` on a timer; `js/01-websocket-polyfill.js` delivers server packets to the client on the same browser main thread.
2. `js/32-mockup-polyfill.js` decodes an entity packet and finds each existing entity using `entities.findIndex(...)` followed by `splice(...)`. With many visible bullets this search can grow quadratically with the entity count per update.
3. The animation callback runs `gameDraw`: background, every visible entity, health and name plates, UI. It interpolates positions, then calls `drawEntity`.
4. `drawEntity` rebuilds and sorts a gun-order array from mockup data on every draw, updates recoil, and draws every barrel with its own canvas path, stroke, and fill. A 360 Machine Closer has 360 barrels. Bullet entities also go through the general entity drawing path, including its status, colors, and canvas state; they typically have no guns.
5. The default shader is disabled. Fancy animations can resize an offscreen canvas for a translucent or fading entity; this should be measured before changing it. Resolution is separately configurable.

The game targets a 33.3 ms simulation interval at `gameSpeed: 1`. A reported 50 mspt in the 360-gun stress scene exceeds that budget, but it does not identify where the other frame time went. The user reports smooth ordinary combat and about 10 FPS only in the extreme stress scene. Because simulation, packet handling, and drawing share a thread, a browser Performance capture must separate `gameLoop`, entity conversion, and `gameDraw` before attributing the FPS drop to canvas work.

## Comparison with Drako's current Woomy

Source: [DrakoHyena/woomy-online at e43a24f](https://github.com/DrakoHyena/woomy-online/tree/e43a24fcc4b9e31f7ede7f8817b562e6746c56d5) (2026-09-01).

- `client/js/socket.js` keeps entities in a `Map` by ID, then builds a sorted draw array. This removes the repeated linear ID search while retaining draw order and death fade. The transition needs careful handling of disappearing entities.
- `client/js/drawing/drawEntity.js` caches gun `Path2D` objects keyed by geometry and caps its cache size. It still issues per-gun canvas transforms and stroke/fill calls, so a cache does not eliminate 360 barrel draws.
- `client/js/app.js` launches its local server in a Web Worker, unlike this fork's same-thread offline server. Moving this fork's server is a separate architecture project with packet and state-boundary risks.
- Drako exposes resolution and performance options; its performance mode also alters the reported FPS calculation. Do not use its FPS display as a direct benchmark against this fork.

## Proposed order of work

1. Capture a browser Performance trace during the same 360-gun scenario and record time in `gameLoop`, client packet conversion, `gameDraw` and `drawEntity`, plus visible entity counts. Compare against ordinary combat.
2. Cache mockup gun draw order (including overlay and recoil-source semantics). This preserves every barrel and projectile while removing an avoidable per-frame sort. Benchmark and visually verify tanks with mixed gun layers and overlays.
3. Replace per-entity `findIndex` and `splice` packet matching with an ID map, preserving layering, disappearing entities, and death fade. Benchmark dense bullet packets.
4. If canvas drawing remains dominant, test cached gun geometry and a specialized circle-bullet path. Preserve projectile position, color, size, and overlap order; avoid hiding or dropping bullets for FPS.
5. Evaluate optional effects, resolution scaling, and eventually Worker isolation only after measuring the above. Keep competitive clarity and input responsiveness as acceptance criteria.

No rendering changes or Drako code were copied by this investigation.
