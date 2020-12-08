const w = 50;
var arr = [];
const n = 20;
var start = false;
var i;
var j;
var slider;
var swapLine = -1;
function setup() {
  createCanvas(n * (w + 10) + 100, 800);
  for (var k = 1; k <= n; k++) {
    arr.push(new Num(random(10,height / 4), k));
  }
  createButton("Start").mousePressed(() => {
    start = true
    i = 0;
    j = 0;
    swapLine = -1;
    draw();
  });


  createDiv("Speed");
  slider = createSlider(1, 100, 1, 1);
}

function draw() {
  background(0);
  drawSwapLine();

  arr.forEach((e) => e.show());
  if (!start) return;
  if (i == n) {
    console.log("Done");
    noLoop();
    return;
  }
  if (j == n - i - 1) {
    arr[j].sorted = true;
    i += 1;
    j = 0;
    return;
  }
  arr[j].current = true;
  arr[j + 1].current = true;
  swapLine  = arr[j].x;

  background(0);
  arr.forEach((e) => e.show());
  drawSwapLine();
  arr[j].current = false;
  arr[j + 1].current = false;
  arr[j].swap = false;
  arr[j + 1].swap = false;
  // swapLine = -1;
  if (arr[j].v > arr[j + 1].v) {
    var t = arr[j].v;
    arr[j].update(arr[j + 1].v);
    arr[j + 1].update(t);
    arr[j].swap = true;
    arr[j + 1].swap = true;
    // swapLine = arr[j].x;
  }
  else
    j += 1;

  drawSwapLine();
  frameRate(slider.value());
  loop();
}

function swap(x, y) {
  var t = arr[x].v;
  arr[x].v = arr[y].v;
  arr[y].v = t;
}

function drawSwapLine() {
  if (swapLine!=-1 && slider.value() < 3) {
    push();
    stroke(255);
    fill(255);
    line(swapLine + w/2, height / 3 + w / 2, swapLine + w/2, height / 3 + w );
    line(swapLine + w/2, height / 3 + w ,swapLine + w/2 + w, height / 3 + w );
    line(swapLine + w/2 + w, height / 3 + w ,swapLine + w/2 + w, height / 3 + w / 2);


    pop();
  }
}
