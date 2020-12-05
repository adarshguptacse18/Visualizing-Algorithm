let l;
let r;
let n;
var arr = [];
let start = false;
let w = 20;
let startButton;
var check = 0;
// let inp;

function setup() {
  createCanvas(1000, 1000);
  startButton = createButton("Start");
  startButton.mousePressed(() => start = true);
  n = 16;
  l = 0;
  r = n - 1;
  w = floor((width - 100) / n);
  var temparr = [];
  for (var i = 0; i < n; i++) {
    var x = floor(random(100));
    temparr.push(x);
  }
  temparr = temparr.sort(function (a, b) { return a - b });
  check = temparr[floor(random(n - 1))];
  console.log(check);
  
  for (var i = 0; i < n; i++) {
    arr.push(new Box(temparr[i], i));
  }
  createDescription();
}

function createDescription(){
  fill(0);
  stroke(255);

  rect(width/2 - 20,75,50,50);
  fill(255)
  text(check,width/2,100);  
  createDesBox(createVector(50,height/3),color(255,0,0),"=>Element can't be present here");
  createDesBox(createVector(50,height/3 + 70),color(0,255,0),"=>Element found at this index");
  createDesBox(createVector(50,height/3 + 140),color(0,0,255),"=> Our Search Space");
  createDesBox(createVector(50,height/3 + 210),color(100,0,100),"=> Current Element");


}

function createDesBox(pos,color,text){
  fill(color);
  rect(pos.x,pos.y,50,50);
  createElement('h3',text).position(pos.x + 70,pos.y);
}


function draw() {
  if (l > r) {
    console.log("Not Found");
    noLoop();
    return;
  }
  // background(0);
  var left = width - w * n;
  translate(left / 2, 0);
  for (var i = 0; i < n; i++) {
    arr[i].show();
  }
  // if(start == false) return;
  var mid = floor((l + r) / 2);
  arr[mid].current = true;
  arr[mid].show();
  console.log(l, r, mid, arr[mid].v);
  if (arr[mid].v == check) {
    arr[mid].current = false;
    arr[mid].answer = true;
    arr[mid].show();
    noLoop();
    return;
  }
  else if (arr[mid].v < check) {
    for (var i = l; i <=mid; i++) arr[i].in = false;
    l = mid + 1;
  }
  else {
    for(var i = mid ; i<=r ; i++) arr[i].in = false;
    r = mid - 1;
  }

  arr[mid].current = false;
  frameRate(0.5);
}