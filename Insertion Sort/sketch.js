const w = 50;
var arr = [];
const n = 20;
var start = false;
var i;
var j;
var slider;
var swapLine = -1;
var Key;
function setup() {
  createCanvas(n * (w + 10) + 100, 800);
  for (var k = 1; k <= n; k++) {
    arr.push(new Num(random(10, height / 4), k));
  }
  createButton("Start").mousePressed(() => {
    start = true
    i = 1;
    j = 0;
    swapLine = -1;
    draw();
  });


  createDiv("Speed");
  slider = createSlider(1, 100, 60, 1);
}

function draw() {
  console.log(1);
  // return;
  if (!start) {
    background(0);
    arr.forEach((e) => e.show());
    return;
  }
  if (i == n) {
    console.log("Done");
    background(0);
    arr.forEach((e) => e.show());

    noLoop();
    return;
  }


  if (j >= 0 && arr[j].current) {

    background(0);
    arr.forEach((e) => e.show());
    arr[j].current = false;
    arr[j + 1].current = false;
    j--;
    return;
  }

  if (j < 0 || arr[j].v <= arr[j + 1].v) {
    // arr[j + 1].swap = true;
    // background(0);
    // arr.forEach((e) => e.show());
    // arr[j + 1].swap = false;
    i += 1;
    j = i - 1;
    return;
  }
  else {
    background(0);

    arr[j].current = true;
    arr[j + 1].current = true;

    arr.forEach((e) => e.show());

    swap(j, j + 1);
  }

  // arr[j].current = false;
  // arr[j+1].current = false;


  frameRate(slider.value());
  loop();

}

function swap(x, y) {
  var t = arr[x].v;
  arr[x].v = arr[y].v;
  arr[y].v = t;
}
