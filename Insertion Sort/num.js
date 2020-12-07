
class Num {
    constructor(v, x) {
        this.v = floor(v);
        this.x = x * (w + 10);
        this. y = height / 3;
        this.current = false;
        this.sorted = false;
        this.swap = false;
    }
    show() {

        fill(255);

        if (this.current) {
            fill(255, 0, 255);
        }
        if(this.swap){
            fill(0,255,0);
        }
        rectMode(CORNERS);
        rect(this.x, this.y , this.x + w, this.y - this.v);
        textAlign(CENTER);
        text(this.v, this.x + w / 2 + 5, this.y + w / 4);
    }

    update(v){
        this.v = v;
    }

    copy(){
        return new Num(this.v,this.x);
    }
}


