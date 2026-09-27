class QuadTree {
    constructor(bounds, max_objects, max_levels, level) {
        this.maxObjects = max_objects || 10;
        this.maxLevels = max_levels || 4;
        this.level = level || 0;
        this.bounds = bounds;
        this.objects = [];
        this.branches = [];
    }
    split() {
        let nextLevel = this.level + 1;
        let subWidth = this.bounds.width / 2;
        let subHeight = this.bounds.height / 2;
        let x = this.bounds.x;
        let y = this.bounds.y;
        this.branches[0] = (new QuadTree({
            x: x + subWidth,
            y: y,
            width: subWidth,
            height: subHeight
        }, this.maxObjects, this.maxLevels, nextLevel));
        this.branches[1] = (new QuadTree({
            x: x,
            y: y,
            width: subWidth,
            height: subHeight
        }, this.maxObjects, this.maxLevels, nextLevel));
        this.branches[2] = (new QuadTree({
            x: x,
            y: y + subHeight,
            width: subWidth,
            height: subHeight
        }, this.maxObjects, this.maxLevels, nextLevel));
        this.branches[3] = (new QuadTree({
            x: x + subWidth,
            y: y + subHeight,
            width: subWidth,
            height: subHeight
        }, this.maxObjects, this.maxLevels, nextLevel));
    }
    getBranches(object) {
        let width = object.width || object.size;
        let height = object.height || object.size;
        let output = [];
        let midY = this.bounds.x + (this.bounds.width / 2);
        let midX = this.bounds.y + (this.bounds.height / 2);
        let north = object.y - height <= midX;
        let west = object.x - width <= midY;
        let east = object.x + width >= midY;
        let south = object.y + height >= midX;
        if (north && east) output.push(0);
        if (west && north) output.push(1);
        if (west && south) output.push(2);
        if (east && south) output.push(3);
        if (output.length === 0) {
            output.push(0, 1, 2, 3);
        }
        return output;
    }
    remove(object) {
        if (this.branches.length) {
            for (let i = 0; i < this.branches.length; i++) {
                this.branches[i].remove(object);
            }
        } else {
            const index = this.objects.indexOf(object);
            if (index > -1) {
                this.objects.splice(index, 1);
            }
        }
    }
    insert(object) {
        let i = 0;
        let cells;
        if (this.branches.length) {
            cells = this.getBranches(object);
            for (i = 0; i < cells.length; i++) this.branches[cells[i]].insert(object);
            return;
        }
        this.objects.push(object);
        if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
            if (!this.branches.length) this.split();
            for (let i in this.objects) {
                cells = this.getBranches(this.objects[i]);
                for (let j = 0; j < cells.length; j++) this.branches[cells[j]].insert(this.objects[i]);
            }
            this.objects = [];
        }
    }
    retrieve(object) {
        let cells = this.getBranches(object);
        let output = this.objects;
        if (this.branches.length)
            for (let i = 0; i < cells.length; i++) output = output.concat(this.branches[cells[i]].retrieve(object));
        output = output.filter(function(item, index) {
            return output.indexOf(item) >= index;
        });
        return output;
    }
    hitDetection(object, other) {
        const rect1 = {
            x: object.x - object.width / 2,
            y: object.y - object.height / 2,
            width: object.width,
            height: object.height
        };
        const rect2 = {
            x: other.x - other.width / 2,
            y: other.y - other.height / 2,
            width: other.width,
            height: other.height
        };
        return (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y);
        //return Math.sqrt(Math.pow(other.x - object.x, 2) + Math.pow(other.y - object.y, 2)) <= (object.size + other.size);
    }
    queryForCollisionPairs(object) {
        let closeBy = this.retrieve(object);
        let collisions = [];
        for (let other of closeBy) {
            let hit = this.hitDetection(object, other);
            if (hit && !collisions.includes(other.id) && object.id !== other.id) collisions.push(other.id);
        }
        return collisions;
    }
    clear() {
        this.objects = [];
        if (this.branches.length) {
            for (let i = 0; i < this.branches.length; i++) this.branches[i].clear();
            this.branches = [];
        }
    }
}

class Node {
    constructor(x, y, width, height, id) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.id = id;
    }
}

module.exports("QuadTree", { Node, QuadTree });