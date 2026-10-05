// AI perception uses center positions, independently of collision AABBs/HSHG.
const AI_TARGET_CELL_SHIFT = 8;
const AI_TARGET_FLOOR = Math.floor;
const AI_TARGET_FINITE = Number.isFinite;
class AITargetGrid {
  constructor() {
    this.cells = new Map();
    this.records = new WeakMap();
    this.members = [];
    this.pool = [];
    this.generation = 0;
  }
  clear() {
    for (const cell of this.cells.values()) {
      cell.length = 0;
      this.pool.push(cell);
    }
    this.cells.clear();
    this.members.length = 0;
    this.generation++;
  }
  eligible(entity) {
    switch (entity.type) {
      case 'tank': case 'miniboss': case 'crasher': case 'food':
      case 'drone': case 'minion': return true;
      default: return false;
    }
  }
  coordinate(value) {
    // Equivalent cell width to >> 8, without int32 wrapping or truncating -0.5.
    return AI_TARGET_FLOOR(value / (1 << AI_TARGET_CELL_SHIFT));
  }
  cell(cx, cy, key) {
    let cell = this.cells.get(key);
    if (!cell) {
      cell = this.pool.pop() || [];
      cell.cx = cx;
      cell.cy = cy;
      this.cells.set(key, cell);
    }
    return cell;
  }
  add(entity) {
    if (!this.eligible(entity)) return;
    let record = this.records.get(entity);
    if (record && record.generation === this.generation) return;
    if (!record) this.records.set(entity, record = { x: NaN, y: NaN });
    if (entity.x !== record.x || entity.y !== record.y) {
      if (!AI_TARGET_FINITE(entity.x) || !AI_TARGET_FINITE(entity.y)) return;
      record.x = entity.x;
      record.y = entity.y;
      record.cx = this.coordinate(entity.x);
      record.cy = this.coordinate(entity.y);
      record.key = record.cx + ':' + record.cy;
    }
    if (!AI_TARGET_FINITE(record.cx) || !AI_TARGET_FINITE(record.cy)) return;
    const cell = this.cell(record.cx, record.cy, record.key);
    record.generation = this.generation;
    record.cell = cell;
    record.index = cell.length;
    cell.push(entity);
    this.members.push(entity);
  }
  update(entity) {
    const record = this.records.get(entity);
    if (!record || record.generation !== this.generation ||
        (entity.x === record.x && entity.y === record.y)) return;
    record.x = entity.x;
    record.y = entity.y;
    const cx = this.coordinate(entity.x), cy = this.coordinate(entity.y);
    if (record.cell && cx === record.cx && cy === record.cy) return;
    if (record.cell) {
      const oldCell = record.cell, last = oldCell.pop();
      if (last !== entity) {
        oldCell[record.index] = last;
        this.records.get(last).index = record.index;
      }
    }
    record.cell = null;
    record.cx = cx;
    record.cy = cy;
    record.key = cx + ':' + cy;
    if (!AI_TARGET_FINITE(cx) || !AI_TARGET_FINITE(cy)) return;
    const cell = this.cell(cx, cy, record.key);
    record.cell = cell;
    record.index = cell.length;
    cell.push(entity);
  }
  refresh() {
    // Collisions can move centers before any controller runs.
    for (const entity of this.members) this.update(entity);
  }
  query(x1, y1, x2, y2, visit) {
    if (!Number.isFinite(x1) || !Number.isFinite(y1) ||
        !Number.isFinite(x2) || !Number.isFinite(y2)) return false;
    const minX = this.coordinate(x1), maxX = this.coordinate(x2);
    const minY = this.coordinate(y1), maxY = this.coordinate(y2);
    if (!Number.isSafeInteger(minX) || !Number.isSafeInteger(maxX) ||
        !Number.isSafeInteger(minY) || !Number.isSafeInteger(maxY)) return false;
    // Huge FOVs should not enumerate millions of empty cells.
    if ((maxX - minX + 1) * (maxY - minY + 1) > this.cells.size) {
      for (const cell of this.cells.values()) {
        if (cell.cx < minX || cell.cx > maxX || cell.cy < minY || cell.cy > maxY) continue;
        for (const entity of cell) visit(entity);
      }
    } else {
      for (let cx = minX; cx <= maxX; cx++) {
        for (let cy = minY; cy <= maxY; cy++) {
          const cell = this.cells.get(cx + ':' + cy);
          if (cell) for (const entity of cell) visit(entity);
        }
      }
    }
    return true;
  }
}
