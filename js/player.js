class Player {
  constructor() {
    this.position = { x: 100, y: 100 };
    this.velocity = { x: 0, y: 0 };
    this.width = 20;
    this.height = 20;
    this.gravity = 0.5;
    this.color = "red";
  }
  draw() {
    fill(this.color);
    rect(this.position.x,this.position.y,this.width,this.height,20,20,5,5);
  }
  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= height)
      this.velocity.y += this.gravity;
    else {
      this.velocity.y = 0;
    }
  }
}
