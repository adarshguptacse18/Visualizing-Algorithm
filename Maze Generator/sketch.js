
var grid = [];
let w = 60;
let cols, rows;
var current;
// var st = true;

var stack = [];

function setup() {
    createCanvas(600, 600);
    cols = floor(width / w);
    rows = floor(height / w);
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid.push(new Grid(i, j));
        }
    }
    current = grid[0];
    stack.push(current);
}

function draw() {
    background(0);

    if (current) {
        current.visited = true;
        var next = current.getRandomNeighbour();
        if (next) {
            removeWall(current, next);
            current = next;
            stack.push(next);
        }
        else if(stack.length>0){
            current = stack.pop();
        }
    }
    grid.forEach((e) => {
        e.show();
    });
    frameRate(5);

    if(current){
        current.showTheCurrent();
    }
    // removeWall(grid[0], grid[1]);
}
function removeWall(a, b) {
    var dx = [0, 0, -1, 1];
    var dy = [-1, 1, 0, 0];
    var first = [2, 0, 1, 3];
    var second = [0, 2, 3, 1];
    for (var i = 0; i < 4; i++) {
        if (a.i - b.i == dx[i] && a.j - b.j == dy[i]) {
            a.walls[first[i]] = false;
            b.walls[second[i]] = false;
            return true;
        }
    }
    return false;

}




