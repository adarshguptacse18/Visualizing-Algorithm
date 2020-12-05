
class Drop{
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.r = 8;
        this.toDelete = false;
    }
    show() {
        noStroke();
        fill(10,0,255);
        ellipse(this.x,this.y,this.r*2,this.r*2);
    }

    move(){
        this.y-=10;
    }
    hits(flower){
        var d = dist(this.x,this.y,flower.x,flower.y);
        return  d < this.r + flower.r;
    }

    evaporate(){
        this.toDelete = true;
    }
}