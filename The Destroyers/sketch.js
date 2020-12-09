
var ship ;
var flowers = [];
var drops = [];
var n;
function setup() {
    createCanvas(600,400).parent("canvas");
    ship = new Ship();
    n=6;
    for(var i=0;i<n;i++){
        flowers[i] = new Flower(i*80+80,100);
    }

}

function draw() {
    background(51);
    ship.move();
    ship.show();
    for(var i=0; i<drops.length;i++){
        drops[i].show();
        drops[i].move();

        for(var j=0;j<flowers.length;j++){
            if(drops[i].hits(flowers[j])){
                flowers[j].shrink();
                drops[i].evaporate();
            }
        }
    }

    for(var i=drops.length-1;i>=0;i--){
        if(drops[i].toDelete ){
            drops.splice(i,1);
        }
    }
    var atEnd = false;
    for(var i=0;i<flowers.length;i++){
        flowers[i].move();
        flowers[i].show();
        if(flowers[i].x >= width || flowers[i].x<0){
            atEnd= true;
        }
    }
    if(atEnd){
        for(var i=0;i<flowers.length;i++){
            flowers[i].shiftDown();
        }
    }

}

function keyReleased(){
    if(keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW){
        ship.setDir(0);
    }
}
function keyPressed(){
    if(keyCode === RIGHT_ARROW){
        ship.setDir(1);
    }
    else if(keyCode == LEFT_ARROW) {
        ship.setDir(-1);
    }
    else if(keyCode === 32){
        drops.push(new Drop(ship.x,height));
    }
}