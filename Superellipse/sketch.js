let slider;


function setup() {
    createCanvas(600, 600);
    slider = createSlider(0.01, 10, 2, 0.01);
}

function draw() {
    background(9);
    translate(width / 2, height / 2);
    var r = 100;
    var a = 100;
    var b = 100;

    var n = slider.value();

    stroke(255);
    noFill();

    beginShape();
    for (var angle = 0; angle < TWO_PI; angle += 0.1) {
        let na = 2 / n;
        let x = pow(abs(cos(angle)), na) * a * sgn(cos(angle));
        let y = pow(abs(sin(angle)), na) * b * sgn(sin(angle));
        vertex(x, y);
    }
    endShape(CLOSE);
}


function sgn(val) {
   if(val == 0) return 0;
   return val/abs(val);
}