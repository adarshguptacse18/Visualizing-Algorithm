
class Flower {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.r = 25;
        this.xdir = 1;
        this.ydir = 0;
    }
    show() {
        fill(255,200,0);
        ellipse(this.x,this.y,this.r*2,this.r*2);
    }

    shrink(){
        this.r-=2;
        if(this.r<15){
            this.r = 0;
        }
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