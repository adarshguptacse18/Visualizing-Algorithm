
class Box {
    constructor(v,ind) {
        this.ind = ind;
        this.v = v;
        this.in = true;
        this.answer = false;
        this.current = false;
    }

    show(){
        stroke(255);
        noFill();
        if(this.in==false){
            fill(255,0,0);
        }
        else fill(0,0,255);
        if(this.current) {
            // stroke(100);
            noStroke();
            fill(100,0,100);
        }
        if(this.answer){
            fill(0,255,0);
        }
        // fill(255);
        rect(this.ind * w,height/4,w,50);
        textAlign(CENTER);
        fill(255);
        // console.log(this.v);
        text(this.v,this.ind * w + w/2,height/4 + 20 + 2)
    }

   
}