var points = [];
var p;
var q;
var hull = [];
var cur;
var ind = 0;
var slider;
function setup() {

  createCanvas(1000, 1000)
  var button = createButton("Start Convex Hull");
  createDiv("Speed")
  slider = createSlider(1,30,10,1);
  for (var i = 0; i < 10; i++) {
    points.push(new Point(random(100, height - 100), random(100, width - 100)));
  }
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

  if (p == undefined) {
    noLoop();
    return;
  }
  // drawLine(points[q],points[q],color(255));
  


  if (ind === points.length) {
    if(q == 0){
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
//   points.push(new Point(mouseX,mouseY));
// }