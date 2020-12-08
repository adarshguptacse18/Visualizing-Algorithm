
class Num {
    constructor(v, x) {
        this.v = floor(v);
        this.x = x * (w + 10);
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

            fill(0,0,255);
        }
        if(this.sorted){
            fill(0,255,0);
        }
        rectMode(CORNERS);
        rect(this.x, height / 3, this.x + w, height / 3 - this.v);
        textAlign(CENTER);
        text(this.v, this.x + w / 2 + 5, height / 3 + w / 4);
    }

    update(v){
        this.v = v;
    }
}


