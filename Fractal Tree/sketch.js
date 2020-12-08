var slider;
var angle = 0;

function setup() {
    createCanvas(800, 800);
    slider = createSlider(0, TWO_PI, PI / 4, 0.01);

}

function draw() {
    background(0);

    var len = 200;
    stroke(255);
    translate(width / 2, height);
    angle = slider.value();
    // line(0,0,0, - len);
    branch(len);

}


function branch(len) {
    line(0, 0, 0, -len);
    translate(0,-len);
    if (len > 4) {
        push();
        rotate(angle);
        branch(len * 0.67);
        pop();
        push();
        rotate(-angle);
        branch(len*0.67);
        pop()
    }

    // translate(0,len);
}