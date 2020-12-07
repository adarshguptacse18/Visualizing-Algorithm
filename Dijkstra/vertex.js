
class Vertex {
    constructor(x, y) {
        this.v = ++counter;
        this.pos = createVector(x, y);
        this.visited = false;
        this.complete = false;
        this.open = false;
        this.r = 50;
        this.selected = false;
        this.adj = [];
        this.weight = [];
        this.par = undefined;
        this.dist = INT_MAX; //inf
        this.change = false;
    }

    show() {
        // noStroke();
        stroke(255);
        strokeWeight(2);
        fill(0, 0);

        if (this.visited) {
            fill(100, 0, 0);
        }
        if (this.selected) {
            fill(100, 0, 100);
        }
        if (this.open) {
            fill(0, 255, 0);
        }

        circle(this.pos.x, this.pos.y, this.r);
        fill(255);
        textSize(24);
        textAlign(CENTER);
        if (start == false)
            text(this.v, this.pos.x, this.pos.y + 5);
        else if (this.dist == INT_MAX)
            text("INF", this.pos.x, this.pos.y + 5);
        else
            text(this.dist,this.pos.x,this.pos.y+5);



            var ind = 0;
        this.adj.forEach((e) => {
            var dx = (this.pos.x - e.pos.x);
            var dy = this.pos.y - e.pos.y;
            var r = sqrt(dx * dx + dy * dy)
            if (dx) dx /= r * 2;
            if (dy) dy /= r * 2;
            line(this.pos.x - dx * this.r, this.pos.y - dy * this.r, e.pos.x + this.r * dx, e.pos.y + dy * this.r);
            fill(255);
            textSize(20);
            var nx = (this.pos.x + e.pos.x) / 2;
            var ny = (this.pos.y + e.pos.y) / 2;

            dx = (this.pos.x - e.pos.x);
            dy = (this.pos.y - e.pos.y);
            if (abs(dx) > abs(dy)) {
                var tt = 30;
                nx = nx - tt * dy / dx;
                ny += tt;
            }
            else {
                var tt = 30;
                ny = ny - tt * dx / dy;
                nx += tt;
            }
            text(this.weight[ind], nx, ny);
            ind += 1;
            // return tempV;
            // line(this.pos.x,this.pos,y,e.pos.x,e.pos.y);
        })
    }



}




// x = x1 + (y-y1)/m
// m(x-x1) + y1;
// (-dx)/dy