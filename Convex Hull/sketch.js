var points = [];
var p;
var q;
var hull = [];
var cur;
var ind = 0;
var slider;

function setup() {

  var myCanvas = createCanvas(1000, 1000);
  myCanvas.parent("canvas");

  var button = createButton("Start Convex Hull");
  button.parent("buttonsBeforeCanvas");
  button.class("btn btn-success");

  var tempDiv = createDiv("Speed");
  tempDiv.style("margin-left", "10px");
  tempDiv.parent("buttonsBeforeCanvas");


  slider = createSlider(1, 60, 10, 1);
  slider.parent("buttonsBeforeCanvas");
  slider.style("margin-left", "10px");


  createDiv("").parent("buttonsBeforeCanvas");


  var reset = createButton("Reset");
  reset.parent("buttonsBeforeCanvas");
  reset.class("btn btn-danger");
  var generateRandom = createButton("Generate Random Points");
  generateRandom.parent("buttonsBeforeCanvas");
  generateRandom.addClass("btn btn-primary");
  button.mousePressed(() => {
    if (points.length <= 2) {
      console.log("Add More Points");
      return;
    }
    points.sort((a, b) => {
      return a.x - b.x;
    });
    start = points[0];
    p = 0;
    q = 1;
    start.selected = true;
    hull = [start];
    ind = 0;
    draw();
  });

  myCanvas.mousePressed(() => {
    points.push(new Point(mouseX, mouseY));
  });

  reset.mousePressed(resetData);
  generateRandom.mousePressed(() => {
    resetData();
    for (var i = 0; i < 100; i++) {
      points.push(new Point(random(100, height - 100), random(100, width - 100)));
    }
    draw();
  });

}
function resetData() {
  points = [];
  p = q = null;
  hull = [];
  ind = null;
  cur = null;
  draw();
}

function draw() {
  background(0);
  points.forEach((e) => e.show());
  stroke(0, 0, 255);
  fill(0, 0, 255, 50);
  beginShape();
  for (let p of hull) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);
  loop();
  if (p == undefined) {
    return;
  }



  if (ind === points.length) {
    if (q == 0) {
      console.log("Done");
      noLoop();
      p = null;
      return;
    }
    p = q;

    points[p].selected = true;

    hull.push(points[p]);
    q = (p + 1) % points.length;
    ind = 0;
    loop();
    return;
  }

  stroke(0, 255, 0);
  strokeWeight(2);
  line(points[p].x, points[p].y, points[q].x, points[q].y);

  let checking = points[ind];
  stroke(255);
  line(points[p].x, points[p].y, checking.x, checking.y);

  // for (var i = 0; i < points.length; i++) 
  var i = ind;
  const a = p5.Vector.sub(points[int(q)].pos, points[int(p)].pos);
  const b = p5.Vector.sub(points[i].pos, points[p].pos);
  const cross = a.cross(b);
  if (cross.z < 0)
    q = i;
  ind += 1;
  // p = q;
  frameRate(slider.value());
  loop();

}


// function mousePressed(){
  // points.push(new Point(mouseX,mouseY));
// }