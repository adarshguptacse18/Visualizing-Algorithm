const w = 50;
var arr = [];
const n = 20;
var start = false;
var i;
var j;
var slider;
var swapLine = -1;
var minInd;
function setup() {
  createCanvas(n * (w + 10) + 100, 800);
  for (var k = 1; k <= n; k++) {
    arr.push(new Num(random(10, height / 4), k));
  }
  createButton("Start").mousePressed(() => {
    start = true
    i = 0;
    j = 0;
    minInd = i;
    swapLine = -1;
    draw();
  });


  createDiv("Speed");
  slider = createSlider(1, 100, 60, 1);
}

function draw() {
  if (!start) {
    drawAll();
    return;
  }
  if (i == n - 1) {
    console.log("Done");
    drawAll();
    noLoop();
    return;
  }

  // Showing current state for next iteration
  if (j < n && arr[j].current) {
    drawAll()
    arr[j].current = false;
    j++;
    return;
  }

  if (j == n) {
    swap(i,minInd);
    arr[minInd].min = false;
    drawAll();
    arr[i].included = true;
    i += 1;
    j = i;
    minInd = i;
    arr[i].min = true;
    return;
  }
  else {
    arr[j].current = true;
    drawAll()
    if (arr[j].v < arr[minInd].v) {
      arr[minInd].min = false;
      arr[j].min = true;
      minInd = j;
    }
  }
  frameRate(slider.value());
  loop();
}

function swap(x, y) {
  var t = arr[x].v;
  arr[x].v = arr[y].v;
  arr[y].v = t;
}

function drawAll() {
  background(0);
  arr.forEach((e) => e.show());
  drawPartingLine();
}

function drawPartingLine() {
  if (i == n-1 || start == false)
    return;
  push();
  stroke(255);
  fill(255);
  var x = (i+1) * (w + 10) - 5;

  line(x, 0, x, height / 3 + height / 6);
  pop();
}
