
var vertices = [];
var counter = 0;
var sel;
var start;
var queue = [];
var current;
function setup() {
  createCanvas(1000, 1000)
  counter = 0;
  sel = undefined;
  var button = createButton("Start BFS");
  var resetButton = createButton("Reset");
  current = undefined;
  start = false;
  button.mousePressed(() => {
    if (vertices.length == 0 || start) return;
    start = true;
    queue = [vertices[0]];
    // current = vertices[0];
  });

  resetButton.mousePressed(() => {
    start = false;
    vertices = [];
    queue = [];
    sel = undefined;
    current = undefined;
    counter = 0;
  });
}

function draw() {
  var cur;
  if (start) {
    if (queue.length == 0) return;
    cur = queue.shift();
    cur.visited = true;
    cur.selected = true;
    cur.open = false;
    cur.adj.forEach((e) => {
      if (!e.visited) {
        queue.push(e);
        e.visited = true;
        e.open = true;

      }
    })


    frameRate(1);
  }
  else frameRate(30);
  background(0);

  vertices.forEach((e) => e.show());

  if (cur) { cur.selected = false; }

}

function intersect(x, y) {
  for (var i = 0; i < vertices.length; i++) {
    if (dist(vertices[i].pos.x, vertices[i].pos.y, x, y) + 30 <= vertices[i].r * 2) {
      console.log(i);
      if (sel) {
        if (sel == vertices[i]) {
          sel = undefined;
          vertices[i].selected = false;
          return true;
        }
        sel.adj.push(vertices[i]);
        vertices[i].adj.push(sel);
        sel.selected = false;
        sel = undefined;
      }
      else { sel = vertices[i]; vertices[i].selected = true; }
      return true;
    }
  }
  return false;
}
function mousePressed() {
  console.log(mouseX, mouseY);
  if (intersect(mouseX, mouseY)) {
    console.log(true);
    return;
  };
  console.log(false);
  if (mouseX + 50 > width || mouseY + 50 > height || mouseX < 50 || mouseY < 50) return;

  vertices.push(new Vertex(mouseX, mouseY));
}