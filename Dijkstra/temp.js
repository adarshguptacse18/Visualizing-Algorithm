
var vertices = [];
var counter = 0;
var sel;
var start;
var current;
var ind = 0;
var INT_MAX = 1e18;
var iter = 0;
function setup() {
  var button = createButton("Start Dijsktra");
  // var resetButton = createButton("Reset");
  // var table = select("table");
  createCanvas(windowWidth - 100, windowHeight - 100);

  // counter = 0;
  // sel = undefined;

  // current = undefined;
  // start = false;
  button.mousePressed(() => {
    if (vertices.length == 0 || start) return;
    start = true;
    current = vertices[0];
    current.dist = 0;
    ind = 0;
  });

  // resetButton.mousePressed(() => {
  //   start = false;
  //   vertices = [];
  //   sel = undefined;
  //   current = undefined;
  //   counter = 0;
  // });
}

function draw() {
  if (start) {
    if (!current) {
      return;
    }
    iter += 1;
    if (iter == 3) {
      console.log(current.adj[ind]);
      noLoop();
      return;
    }
    current.visited = true;
    current.selected = true;
    if (ind != current.adj.length) {
      if (current.adj[ind].visited) {
        ind += 1;
        return;
      }
      console.log(iter, current.adj[ind], current, ind);

      if (current.adj[ind].selected) {

        current.adj[ind].selected = false;
        if (current.adj[ind].change == false) {
          // console.log(current.dist + current.weight[ind],vertices[ind].dist)
          if (current.dist + current.weight[ind] < current.adj[ind].dist) {
            // console.log(11111111111);
            // console.log(ind);
            current.adj[ind].dist = current.dist + current.weight[ind];
            current.adj[ind].change = true;
          }
          else ind += 1;
        }
        else {
          current.adj[ind].change = false;
          ind += 1;
        }
      }
      else {
        current.adj[ind].selected = true;
        console.log("selecting",current.adj[ind]);

      }
    }
    else {
      noLoop();

      // current.selected = false;
      // var nextInd = findMin();
      // if (nextInd == undefined) {
      //   console.log("Done");
      //   current = undefined;
      //   // start = false;
      //   // noLoop();
      // }
      // var next = vertices[nextInd];
      // current = next;
    }
    frameRate(1);
  }
  else frameRate(30);
  background(0);

  vertices.forEach((e) => e.show());

  if (current) { current.selected = false; }

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
  if (intersect(mouseX, mouseY)) {
    console.log("Already Present");
    return;
  };
  console.log(false);
  if (mouseX + 50 > width || mouseY + 50 > height || mouseX < 50 || mouseY < 50) return;

  vertices.push(new Vertex(mouseX, mouseY));
}

function findMin() {
  var MIN = INT_MAX;
  var ind = undefined;
  for (var v = 0; v < vertices.length; v++) {
    if (vertices[v].visited == false && vertices[v].dist < MIN) {
      MIN = vertices[v].dist;
      ind = v;
    }
  }
  return ind;
}