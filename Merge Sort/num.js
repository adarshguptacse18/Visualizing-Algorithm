
class Num {
    constructor(v, x, y) {
        this.v = floor(v);
        this.x = x * (w + 1) + 200; 
        this.y = (y+1)*100 + 100;
        this.current = false;
        this.selected = false;
        this.finalx = null;
        this.finaly = null;
    }
    show() {
        stroke('black');
        if (this.current) {
            stroke('red');
        }
        if(this.selected){
            stroke('rgb(0,255,0)');
        }
        strokeWeight(4);
        fill(255);
        rect(this.x, this.y, w, w);
        fill(0);
        noStroke();
        textSize(25);
        textAlign(LEFT);
        text(this.v,this.x + w/4,this.y + w/2);

    }

    update(v) {
        this.v = v;
    }

    copy() {
        return new Num(this.v, this.x);
    }
}


