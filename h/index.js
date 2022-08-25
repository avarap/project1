let player;
let obstacles = [];

function computeNextX() {
  return obstacles.reduce(
    (sum, obstacle) => sum + obstacle.w + player.w,
    Math.floor(width / 5) - 1
  );
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  player = new Player(25, 0, 50, 50);
  obstacles.push(
    new Obstacle(computeNextX(), height - player.h * 2 - 100, 100, 150)
  );
  obstacles.push(
    new Obstacle(computeNextX(), height - player.h * 2 - 250, 100, 200)
  );
  obstacles.push(
    new Obstacle(computeNextX(), height - player.h * 2 - 100, 100, 150)
  );
  obstacles.push(new Obstacle(computeNextX(), height - player.h * 2 - 300));
  obstacles.push(new Obstacle(computeNextX(), height - player.h * 2 - 300));
  obstacles.push(
    new Obstacle(computeNextX(), height - player.h * 2 - 100, 100, 150)
  );
  obstacles.push(
    new Obstacle(computeNextX(), height - player.h * 2 - 250, 100, 200)
  );
  obstacles.push(
    new Obstacle(computeNextX(), height - player.h * 2 - 100, 100, 150)
  );
}

function draw() {
  background("white");
  noStroke();
  fill("red");
  player.draw();

  fill("green");
  obstacles.forEach((obstacle) => obstacle.draw());
}

function keyPressed() {
  if (keyCode === UP_ARROW && player.isOnGround()) {
    player.velY -= 20;
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}
