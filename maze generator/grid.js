

class Grid {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true];
        this.visited = false;
    }

    drawLine(i, j, x, y) {
        line(i * w, j * w, x * w, y * w);
    }

    showTheCurrent() {
        fill(255,0,0, 100);
        noStroke();
        rect(this.i * w, this.j * w, w, w);
    }


    show() {
        noFill();
        if (this.visited) {
            fill(255, 0, 255, 100);
            noStroke();
            rect(this.i * w, this.j * w, w, w);
        }
        stroke(200);

        // this.drawLine(this.i,this.j,this.i+1,this.j);
        // line(this.i,this.j,this)
        var mx = [0, 1, 1, 0, 0];
        var my = [0, 0, 1, 1, 0];
        for (var i = 1; i < 5; i++) {
            if (this.walls[i - 1]) {
                this.drawLine(this.i + mx[i - 1], this.j + my[i - 1], this.i + mx[i], this.j + my[i]);
            }
        }
    }


    getIndex(i, j) {
        return i * cols + j;
    }

    getRandomNeighbour() {
        var dx = [0, 0, -1, 1];
        var dy = [1, -1, 0, 0];
        var possible = [];
        for (var i = 0; i < 4; i++) {
            var nx = this.i + dx[i];
            var ny = this.j + dy[i];
            if (nx < 0 || nx >= cols || ny < 0 || ny >= cols || (!grid[this.getIndex(nx, ny)]) || grid[this.getIndex(nx, ny)].visited)
                continue;
            possible.push(grid[this.getIndex(nx, ny)]);
        }
        if (possible.length == 0) return undefined;
        return possible[floor(random(possible.length))];
    }

    getAllNeighbour() {
        var dx = [0, 0, -1, 1];
        var dy = [1, -1, 0, 0];
        var possible = [];
        for (var i = 0; i < 4; i++) {
            var nx = this.i + dx[i];
            var ny = this.j + dy[i];
            if (nx < 0 || nx >= cols || ny < 0 || ny >= cols || (!grid[this.getIndex(nx, ny)]) || grid[this.getIndex(nx, ny)].visited)
                continue;
            possible.push(grid[this.getIndex(nx, ny)]);
        }
        return possible;
    }
}