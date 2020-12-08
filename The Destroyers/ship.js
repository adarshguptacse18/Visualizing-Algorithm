
class Ship {
    constructor() {
        this.x = width / 2;
        this.xdir = 0;
        this.show = function () {
            fill(255);
            rectMode(CENTER);
            rect(this.x, height - 20, 20, 40);
        };

        this.move = function () {
            this.x += this. xdir * 5;
        };
    }

    setDir(dir){
        this.xdir = dir;
    }
}
