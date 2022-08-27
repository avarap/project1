class Player extends Rectangle {
  constructor(x, y, w, h, c="red") {
    super(x, y, w, h, c);
    this.velX = 0;
    this.velY = 0;

  }

  move() {
    /*if (keyIsDown(LEFT_ARROW)) {
      player.velX = -5;
    } else if (keyIsDown(RIGHT_ARROW)) {
      player.velX = 5;
    } else {
      player.velX = 0;
    }*/

    this.x += this.velX;
    platforms.forEach((platform) => this.handleCollisionsInX(platform));

    this.y += this.velY;
    platforms.forEach((platform) => this.handleCollisionsInY(platform));
    
    //this line prevents from keep falling
    this.y = Math.min(this.y, height + this.h);

    if (this.isOnGround()) {
      this.velY = 0;
    } else {
      this.velY += 1;

    }
  }

  //to know X direction
  getXDirection() {
    if (this.velX > 0) {
      return 1;
    } else if (this.velX < 0) {
      return -1;
    } else {
      return 0;
    }
  }
  //to know Y direction
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
    fill(this.c);
    rect(this.x,this.y,this.w,this.h,20,20,5,5);
  }

  isOnplatform() {
    const platform = platforms.find((platform) => {
      return this.collidesInXWith(platform) && platform.y === this.y + this.h;
    });
    return platform;
  }

  isOnCheckPoint() {
    const platform = platforms.find((platform) => {
      return this.collidesInXWith(platform) && platform.y === this.y + this.h && platform.checkPoint==true;
    });
    return platform;
  }

  isOnGround() {
    if (this.y === height - this.h || this.isOnplatform()) {
      return true;
    }
  }
}
