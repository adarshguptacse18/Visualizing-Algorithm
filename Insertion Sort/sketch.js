const w = 50;
var arr = [];
const n = 20;
var start = false;
var i;
var j;
var slider;
var swapLine = -1;
var Key ;
function setup() {
  createCanvas(n * (w + 10) + 100, 800);
  for (var k = 1; k <= n; k++) {
    arr.push(new Num(random(10,height / 4), k));
  }
  createButton("Start").mousePressed(() => {
    start = true
    i = 1;
    j = 0;
    Key = arr[i].copy();
    swapLine = -1;
    draw();
  });


  createDiv("Speed");
  slider = createSlider(1, 100, 60, 1);
}

function draw() {
  background(0);

  arr.forEach((e) => e.show());
  // return;
  if (!start) return;
  if (i == n) {
    console.log("Done");
    noLoop();
    return;
  }
  if (j < 0 || arr[j].v<=Key.v) {
    arr[j+1].v = Key.v;
    i += 1;
    if(i!=n) Key = arr[i].copy();
    j = i-1;
    return;
  }
  arr[j+1].v = arr[j].v;
  j--;
  frameRate(slider.value());
  loop();
 
}

function swap(x, y) {
  var t = arr[x].v;
  arr[x].v = arr[y].v;
  arr[y].v = t;
}

