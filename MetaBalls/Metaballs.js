
class Metaball{
    constructor(x,y){
        this.pos = createVector(x,y);
        x=random(2,5);
        y=random(2,5);
        this.velocity = createVector(x,y);
        this.r = random(10);
    }

    show(){
        // noStroke();
       
        ellipse(this.pos.x,this.pos.y,this.r,this.r);
    }

    move(){
        this.pos.x+= this.velocity.x;
        this.pos.y+=this.velocity.y;
        if(this.pos.x>width || this.pos.x<0) this.velocity.x*=-1;
        if(this.pos.y>height || this.pos.y<0) this.velocity.y*=-1;        
    }

}