
class Cell {
    constructor() {
        this.pos = createVector(random(width),random(height));
        this.r = 40;
        this.c = color(random(100,255),0,random(100,255));
    }
    move(){
        var vel = p5.Vector.random2D();
        this.pos.add(vel);
    }

    show(){
        noStroke();
        fill(this.c);
        ellipse(this.pos.x,this.pos.y,this.r,this.r);
    }

    mitosis(){
        var newCell = new Cell();
        this.r*=0.8;
        // newCell.r = this.r;
        // newCell.pos.x = this.pos.x;
        // newCell.pos.y = this.pos.y;
        this.pos.x+=30;
        return newCell;
    }
}