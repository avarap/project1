class Platform extends Rectangle {
  constructor(x, y, w = 100, h = 300, c = "blue", checkpoint=false) {
    super(
      x || Math.floor(random(0, width - w)),
      y || Math.floor(random(0, height - player.h - h)),
      w,
      h,
      c
    );
    this.checkPoint=checkpoint;
  }
}
