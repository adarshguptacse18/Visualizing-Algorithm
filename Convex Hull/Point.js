
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.pos = createVector(x,y);
        this.selected = false;
    }

    show() {
        var r = 10;
        fill(255);
        if (this.selected) {
            fill(0, 255, 0);
            r = 18;
        }
        circle(this.x, this.y, r);
    }
}

function drawLine(p1, p2, color) {
    strokeWeight(2);
    fill(color);
    line(p1.x, p1.y, p2.x, p2.y);
}

// function orient(pp, qq, rr) {
//     const a = p5.Vector.sub(rr, pp);
//     const b = p5.Vector.sub(qq, pp);
//     const cross = a.cross(b);
//     return cross.z;

// }