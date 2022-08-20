class Platform{
    constructor(){
        this.position = {x: 100, y: 432}
        this.velocity = {x: 0, y: 0}
        this.width = 200;
        this.height = 20;
        this.color = "blue";
        this.onPlatform=false;
    }
    draw(){
        fill(this.color);
        rect(this.position.x, this.position.y, this.width, this.height);//, 20, 20, 5, 5
    }
}