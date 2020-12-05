
class Vertex {
    constructor(x,y) {
        this.v = ++counter;
        this.pos = createVector(x,y);
        this.visited = false;
        this.open = false;
        this.r = 50;
        this.selected = false;
        this.adj = [];
        this.current = false;
        this.par = undefined;
    }

    show(){
        // noStroke();
        stroke(255);
        strokeWeight(2);
        fill(0,0);

        if(this.visited){
            fill(100,0,0);
        }
        if(this.open){
            fill(0,100,0);
        }
        if(this.selected){
            fill(100,0,100);
        }
        circle(this.pos.x,this.pos.y,this.r);
        fill(255);
        textSize(24);
        textAlign(CENTER);
        text(this.v,this.pos.x,this.pos.y+5);


        this.adj.forEach((e)=>{
            var dx = (this.pos.x - e.pos.x);
            var dy = this.pos.y - e.pos.y;
            var r = sqrt(dx * dx + dy * dy)
            if(dx) dx/=r*2;
            if(dy) dy/=r*2;
            line(this.pos.x - dx * this.r,this.pos.y - dy * this.r,e.pos.x + this.r * dx ,e.pos.y + dy * this.r);
            // return tempV;
            // line(this.pos.x,this.pos,y,e.pos.x,e.pos.y);
        })
    }

 
   
}