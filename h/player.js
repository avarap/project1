class Player extends Rectangle {
  constructor(x, y, w, h) {
    super(x, y, w, h);
    this.velX = 0;
    this.velY = 0;
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      player.velX = -5;
    } else if (keyIsDown(RIGHT_ARROW)) {
      player.velX = 5;
    } else {
      player.velX = 0;
    }

    this.x += this.velX;
    obstacles.forEach((obstacle) => this.handleCollisionsInX(obstacle));

    this.y += this.velY;
    obstacles.forEach((obstacle) => this.handleCollisionsInY(obstacle));

    this.y = Math.min(this.y, height - this.h);

    if (this.isOnGround()) {
      this.velY = 0;
    } else {
      this.velY += 1;
    }
  }

  getXDirection() {
    if (this.velX > 0) {
      return 1;
    } else if (this.velX < 0) {
      return -1;
    } else {
      return 0;
    }
  }

  getYDirection() {
    if (this.velY > 0) {
      return 1;
    } else if (this.velY < 0) {
      return -1;
    } else {
      return 0;
    }
  }

  handleCollisionsInY(obj) {
    const yDir = this.getYDirection();
    if (!this.collidesWith(obj) || yDir === 0) return;
    while (this.collidesInYWith(obj)) {
      this.y -= yDir;
    }
    this.velY = 0;
  }

  handleCollisionsInX(obj) {
    const xDir = this.getXDirection();
    if (!this.collidesWith(obj) || xDir === 0) return;
    while (this.collidesInXWith(obj)) {
      this.x -= xDir;
    }
    this.velX = 0;
  }

  draw() {
    this.move();
    super.draw();
  }

  isOnObstacle() {
    const obstacle = obstacles.find((obstacle) => {
      return this.collidesInXWith(obstacle) && obstacle.y === this.y + this.h;
    });
    return obstacle;
  }

  isOnGround() {
    if (this.y === height - this.h || this.isOnObstacle()) {
      return true;
    }
  }
}
