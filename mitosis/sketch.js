var cells=[];

function setup() {
    createCanvas(600,600);
    cells.push(new Cell());
}

function draw() {
    background(0);
    cells.forEach(e =>{
        e.move();
        e.show();
    });
}

function mousePressed(){
    for(var i = cells.length -1 ;i>=0;i--){
        if(dist(mouseX,mouseY,cells[i].pos.x,cells[i].pos.y)<=cells[i].r){
            cells.push(cells[i].mitosis());
            break;
        }
    }

   
}


