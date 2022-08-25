class Obstacle extends Rectangle {
  constructor(x, y, w = 100, h = 300) {
    console.log(x, y);
    super(
      x || Math.floor(random(0, width - w)),
      y || Math.floor(random(0, height - player.h - h)),
      w,
      h
    );
  }
}
