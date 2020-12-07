
var vertices = [];
var counter = 0;
var sel;
var start;
var current;
// var ind;
var index;
var INT_MAX = 1e18;
var queue = [];
function setup() {
  createCanvas(1000, 1000)
  counter = 0;
  sel = undefined;
  var button = createButton("Start Dijkstra");
  var resetButton = createButton("Reset");
  current = undefined;
  start = false;
  button.mousePressed(() => {
    if (vertices.length == 0 || start) return;
    start = true;
    current = undefined
    vertices[0].dist = 0;
    index = 0;
    queue = [vertices[0]];
    // current = vertices[0];
  });

  resetButton.mousePressed(() => {
    console.log("Not Implemented")
  });
}

function draw() {
  var cur;
  if (start) {
    for (var i = queue.length - 1; i >= 0; i--) {
      if (queue[i].visited) {
        queue.splice(i, 1);
      }
    }
    if (!current || index == current.adj.length) {
      if (current) current.selected = false;
      if (queue.length == 0) {
        return;
      }
      current = cur = findMin();
      cur.visited = true;
      cur.selected = true;
      index = 0;
    }
    else {
      cur = current;
      for (; index < current.adj.length; index++) {
        var e = cur.adj[index];
        if (e.visited) continue;
        if (e.dist > cur.dist + cur.weight[index] || e.changed) {
        console.log(e.changed, e);
          
          if (e.selected == false) {
            e.selected = true;
          }
          else if (e.changed == false) {
            for (var v = 0; v < queue.length; v++) {
              if (queue[v] == e) {
                queue.splice(v, 1);
              }
            }
            e.dist = cur.dist + cur.weight[index];
            queue.push(e);
            e.changed = true;
            e.selected = false;
          }
          else {

            e.changeToFalse();
            e.selected = false;
            index+=1; 
          }
          break;
        }
      }
    }


    frameRate(1);
  }
  else frameRate(30);
  drawAll();
  if (cur) { cur.selected = false; }

}

function drawAll() {
  background(0);
  vertices.forEach((e) => e.show());
}
function intersect(x, y) {
  for (var i = 0; i < vertices.length; i++) {
    if (dist(vertices[i].pos.x, vertices[i].pos.y, x, y) + 30 <= vertices[i].r * 2) {
      if (sel) {
        if (sel == vertices[i]) {
          sel = undefined;
          vertices[i].selected = false;
          return true;
        }
        var b = true;
        for (var j = 0; j < sel.adj.length; j++) {
          if (sel.adj[j] == vertices[i]) {
            b = false;
          }
        }
        if (b) {
          sel.adj.push(vertices[i]);
          sel.weight.push(floor(dist(sel.pos.x, sel.pos.y, vertices[i].pos.x, vertices[i].pos.y)));
          vertices[i].adj.push(sel);
          vertices[i].weight.push(floor(dist(sel.pos.x, sel.pos.y, vertices[i].pos.x, vertices[i].pos.y)));
        }
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

function findMin() {
  var MIN = INT_MAX;
  var ind = undefined;
  for (var v = 0; v < queue.length; v++) {
    if (queue[v].visited == false && queue[v].dist < MIN) {
      MIN = queue[v].dist;
      ind = v;
    }
  }
  var res = queue[ind];
  queue.splice(ind, 1);
  return res;
}