var cols = 50;
var rows = 50;

var grid = new Array(cols);

var openSet = [];
var closedSet = [];

var start;
var end;

var w, h;
var isStart;
var path = [];

function setup() {
  createCanvas(600, 600).parent("canvas");
  var button = createButton("Start");
  button.parent("buttonsBeforeCanvas");
  button.class("btn btn-success");
  var reset = createButton("Reset");
  reset.parent("buttonsBeforeCanvas");
  reset.class("btn btn-danger");
  reset.mousePressed(() => {
    cols = 50;
    rows = 50;

    grid = new Array(cols);

    openSet = [];
    closedSet = [];

    start = undefined;
    end = undefined;

    isStart = undefined;
    path = [];
    init();
    draw();
    // openset = 
  })
  button.mousePressed(() => {
    isStart = true; 
    draw();
  });
  init();
}

function init() {
  w = width / cols;
  h = height / rows;

  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }
  3002
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }


  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;

  openSet.push(start);
}
function draw() {

  if (isStart) {
    if (openSet.length > 0) {

      var winner = 0;
      for (var i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[winner].g+1) {
          winner = i;
        }
      }
      var current = openSet[winner];

      if (current === end) {
        noLoop();
        console.log("DONE!");
        return;
      }
      loop();
      removeFromArray(openSet, current);
      closedSet.push(current);

      var neighbors = current.neighbors;
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];

        if (!closedSet.includes(neighbor) && !neighbor.wall) {
          var tempG = current.g + 1;

          var newPath = false;
          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
              newPath = true;
            }
          } else {
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }

          if (newPath) {
            neighbor.h = heuristic(neighbor, end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }
        }

      }
    } else {
      console.log('no solution');
      noLoop();
      return;
    }


    background(255);

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].show();
      }
    }

    for (var i = 0; i < closedSet.length; i++) {
      closedSet[i].show(color(255, 10, 255, 50));
    }

    for (var i = 0; i < openSet.length; i++) {
      openSet[i].show(color(10, 255, 0, 50));
    }


    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
      path.push(temp.previous);
      temp = temp.previous;
    }



    noFill();
    stroke(255, 0, 200);
    strokeWeight(w / 2);
    beginShape();
    for (var i = 0; i < path.length; i++) {
      vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
    }
    endShape();

  }
  else {
    background(255);

    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].show();
      }
    }
  }

}


function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  return d;
}