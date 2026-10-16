// Query two HSHG size levels in the cheaper direction. Objects are stored in
// the cell containing their AABB minimum, so a candidate's minimum can lie as
// far left/up as its current width/height before overlapping the source AABB.
// Growth can change that size without moving an object to another HSHG level.
function queryHSHGCrossLevel(small, large, overlaps, emit) {
  function extent(grid) {
    let width = 0, height = 0, active = 0;
    for (const object of grid.allObjects) {
      const box = object.getAABB();
      if (!box.active) continue;
      active++;
      width = Math.max(width, box.max[0] - box.min[0]);
      height = Math.max(height, box.max[1] - box.min[1]);
    }
    return { width, height, active };
  }

  const smallExtent = extent(small);
  const largeExtent = extent(large);
  if (!smallExtent.active || !largeExtent.active) return true;

  // Invalid AABBs are rare, but an exhaustive fallback must retain the
  // original overlap predicate's behavior instead of silently losing pairs.
  if (!Number.isFinite(smallExtent.width + smallExtent.height +
                       largeExtent.width + largeExtent.height)) {
    for (const a of small.allObjects) {
      if (!a.getAABB().active) continue;
      for (const b of large.allObjects) {
        if (b.getAABB().active && overlaps(a, b)) emit(a, b);
      }
    }
    return true;
  }

  function estimate(source, target) {
    const x = 1 + Math.ceil((source.width + target.width) / target.grid.cellSize);
    const y = 1 + Math.ceil((source.height + target.height) / target.grid.cellSize);
    const cells = Math.min(x, target.grid.rowColumnCount) *
      Math.min(y, target.grid.rowColumnCount);
    const density = target.active / Math.max(1, target.grid.occupiedCells.length);
    return source.active * cells * (1 + density);
  }
  smallExtent.grid = small;
  largeExtent.grid = large;
  const reverse = estimate(largeExtent, smallExtent) <
    0.25 * estimate(smallExtent, largeExtent);
  if (!reverse && largeExtent.width <= large.cellSize &&
      largeExtent.height <= large.cellSize &&
      smallExtent.width <= large.cellSize &&
      smallExtent.height <= large.cellSize) return false;
  const source = reverse ? large : small;
  const target = reverse ? small : large;
  const maximum = reverse ? smallExtent : largeExtent;

  for (const object of source.allObjects) {
    const box = object.getAABB();
    if (!box.active) continue;
    const size = target.cellSize;
    const minX = box.min[0] - maximum.width;
    const minY = box.min[1] - maximum.height;
    const maxX = box.max[0];
    const maxY = box.max[1];
    if (!Number.isFinite(minX) || !Number.isFinite(minY) ||
        !Number.isFinite(maxX) || !Number.isFinite(maxY)) {
      for (const other of target.allObjects) {
        if (!other.getAABB().active) continue;
        const a = reverse ? other : object, b = reverse ? object : other;
        if (overlaps(a, b)) emit(a, b);
      }
      continue;
    }

    // HSHG hashes a negative coordinate exactly on a cell boundary into the
    // preceding cell. Include that boundary cell, then visit each wrapped
    // hash at most once even when the AABB spans the full hash table.
    const firstX = Math.floor(minX / size) - (minX < 0 && minX % size === 0 ? 1 : 0);
    const firstY = Math.floor(minY / size) - (minY < 0 && minY % size === 0 ? 1 : 0);
    const countX = Math.min(target.rowColumnCount, Math.floor(maxX / size) - firstX + 1);
    const countY = Math.min(target.rowColumnCount, Math.floor(maxY / size) - firstY + 1);
    for (let dx = 0; dx < countX; dx++) {
      const x = (firstX + dx + 0.5) * size;
      for (let dy = 0; dy < countY; dy++) {
        const y = (firstY + dy + 0.5) * size;
        const cell = target.allCells[target.toHash(x, y)];
        for (const other of cell.objectContainer) {
          if (!other.getAABB().active) continue;
          const a = reverse ? other : object, b = reverse ? object : other;
          if (overlaps(a, b)) emit(a, b);
        }
      }
    }
  }
  return true;
}
