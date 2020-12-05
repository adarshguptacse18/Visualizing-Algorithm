
let metaball;
function setup() {
    createCanvas(100, 100);
    metaball = new Metaball(random(height), random(width));
    stroke(1000);
    // fill(255);
    noFill();
}

function draw() {
    background(9);
    metaball.move();
    console.log(1);
    loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y< height ; y++){
            let cur =(x * width + height) * 4;
            for(var j =0; j<3;j++){
                pixels[cur + j ] = dist(x,y,metball.pos.x,metaball.pos.y); 
            }
            // set(x,y,color(dist(x,y,metaball.pos.x,metaball.pos.y)));
        }
    }
    updatePixels();
    metaball.show();
}

function show() {

}


