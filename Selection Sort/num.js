
class Num {
    constructor(v, x) {
        this.v = floor(v);
        this.x = x * (w + 10);
        this. y = height / 3;
        this.current = false;
        this.min = false;
        this.included = false;
    }
    show() {

        fill(255);

        if(!this.included){
            fill(200);
        }
        else fill(255,255,255);
        if (this.current) {
            fill(255, 0, 255);
        }
        if(this.min){
            fill(0,255,0);
        }
        rectMode(CORNERS);
        rect(this.x, this.y , this.x + w, this.y - this.v);
        fill(255);
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


