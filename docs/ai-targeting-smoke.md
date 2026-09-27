# AI targeting optimization smoke test

This patch changes target acquisition only. It should not alter movement, weapon behavior, firing arcs, or collision semantics.

## Local smoke

Run:

```
node tools/test-ai-target-grid.js
node tools/benchmark-ai-target-grid.js
```

Then launch the game locally and check:

- FFA: bots acquire nearby enemies, hold a valid target, and reacquire after death/range loss.
- TDM: bots never target friendlies.
- Growth / Growth Maze: large fights do not produce obvious target stalls.
- Growth Siege: bosses/bots still acquire appropriate targets.
- Dominators / Motherships: autonomous targeting and firing still work.
- Ranked Battle: targets from other room IDs are ignored.
- Plane-targeting classes: only eligible plane drones/minions are acquired.
- Invisible/passive/invulnerable targets remain excluded according to existing settings.
- Damage retaliation still retargets correctly after the bot has healed.

## Stress

Compare MSPT with:

1. normal bot combat;
2. projectile-heavy combat;
3. large polygon/food populations;
4. dense Growth combat.

The expected performance change is a drop from global target scans to local grid candidates. Projectile count should no longer directly inflate normal AI acquisition scans because bullets/traps are not inserted into the AI target grid.
