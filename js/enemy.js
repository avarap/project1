class Enemy {
  constructor(vector, angle) {
    this.bladeVector1 = createVector(  0, -125); // Central part of the blade
    this.bladeVector2 = createVector(-25, -120); // Left part of the blade
    this.bladeVector3 = createVector( 25, -120); // Right part of the blade
    this.gc_x = 0;
    this.gc_y = 0;
    this.rotateSpeedQuotient = -0.02;
    this.vector = vector;
    this.angle = angle;
  }

  ball() {
    fill(150);
    arc(0, -100, 100, 100, PI, TWO_PI);
    fill(130);
    arc(0, -100, 80, 80, PI, TWO_PI);
    fill(0, -100, 0, 20);
    arc(0, -100, 80, 80, -PI / 3, TWO_PI);
  }

  chain () {
    for (let i = 0; i < 4; i++) {
      fill(70);
      ellipse(0, -(i * 30), 20);
      fill(200);
      ellipse(5, -(i * 30) - 5, 3);
    }
  }

  checkContact (gc_x, gc_y) {
    //fill("black");
    //line(this.bladeVector1.x, this.bladeVector1.y, this.gc_x, this.gc_y);
    //console.log(this.gc_x, this.gc_y - 25, this.bladeVector1.x, this.bladeVector1.y);
    const d1 = dist( this.gc_x, this.gc_y - 25, this.bladeVector1.x, this.bladeVector1.y ); // The game character's body height is 35, head height is 25, feet height is 10. Thus the mid-point is a height of 35.
    //line(this.bladeVector2.x, this.bladeVector2.y, this.gc_x, this.gc_y);
    const d2 = dist( this.gc_x, this.gc_y - 25, this.bladeVector2.x, this.bladeVector2.y );
    //line(this.bladeVector3.x, this.bladeVector3.y, this.gc_x, this.gc_y);
    const d3 = dist( this.gc_x, this.gc_y - 25, this.bladeVector3.x, this.bladeVector3.y );
    //console.log(d1,d2,d3)
    if (d1 < 30 || d2 < 30 || d3 < 30) {
      
      // console.log("bladeVector1:",this.gc_x, this.gc_y - 25, this.bladeVector1.x, this.bladeVector1.y);
      // console.log("bladeVector2:",this.gc_x, this.gc_y - 25, this.bladeVector2.x, this.bladeVector2.y);
      // console.log("bladeVector3:",this.gc_x, this.gc_y - 25, this.bladeVector3.x, this.bladeVector3.y);
      // console.log(d1,d2,d3);
      return true;
    }
    return false;
  }

  updateGC_Pos(gc_x, gc_y) {
    this.gc_x = gc_x - this.vector.x;
    this.gc_y = gc_y - this.vector.y;
  }

  draw () {
    push();
    fill(150);
    rectMode(CENTER);
    translate(this.vector.x, this.vector.y);
    this.bladeVector1.rotate(this.rotateSpeedQuotient * level);
    this.bladeVector2.rotate(this.rotateSpeedQuotient * level);
    this.bladeVector3.rotate(this.rotateSpeedQuotient * level);
    noStroke();
    rect(0, 0, 25, 25, 5);
    rotate(this.angle);
    this.chain();
    this.ball();
    
    this.angle += this.rotateSpeedQuotient * level;
    pop();
  }


}


