var points = [];
var p;
var q;
var hull = [];
var cur;
var ind = 0;
function setup() {
  createCanvas(1000, 1000)
  var button = createButton("Start Convex Hull");
  for (var i = 0; i < 100; i++) {
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
    q = p = 0;
    start.selected = true;
    hull = [];
    ind = points.length;
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
  if (hull.length > 0 && p == 0) {
    p = null;
    return;
  }

  if (ind === points.length) {
    p = q;

    points[p].selected = true;

    hull.push(points[p]);
    q = (p + 1) % points.length;
    ind = 0;
    return;
  }

  // for (var i = 0; i < points.length; i++) 
  var i = ind;
  const a = p5.Vector.sub(points[int(q)].pos, points[int(p)].pos);
  const b = p5.Vector.sub(points[i].pos, points[p].pos);
  const cross = a.cross(b);
  if (cross.z < 0)
    q = i;
  ind += 1;
  console.log(ind);
  // p = q;
  // frameRate(2);
  loop();

}


// function mousePressed(){
//   points.push(new Point(mouseX,mouseY));
// }