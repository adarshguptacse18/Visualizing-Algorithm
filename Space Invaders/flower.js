
class Flower {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.r = 25;
        this.xdir = 1;
        this.ydir = 0;
    }
    show() {
        fill(255,0,200);
        ellipse(this.x,this.y,this.r*2,this.r*2);
    }

    grow(){
        this.r+=2;
    }

    move() {
        this.x += this.xdir;
        this.y += this.ydir;
    }

    shiftDown(){
        this.xdir*=-1;
        this.y+=this.r;
    }
}