class Platform{
    constructor(){
        this.position = {x: 100, y: 432}
        this.velocity = {x: 0, y: 0}
        this.width = 200;
        this.height = 20;
    }
    draw(){
        fill("green");
        rect(this.position.x, this.position.y, this.width, this.height);//, 20, 20, 5, 5
    }
    // update(){
    //     this.draw();
        
    //     this.position.x +=this.velocity.x;
    //     this.position.y +=this.velocity.y;

    //     if (this.position.y + this.height + this.velocity.y <= height)
    //     this.velocity.y += this.gravity;
    //     else {
    //         this.velocity.y = 0;
    //         // console.log(this.position)
    //     }
    // }
}