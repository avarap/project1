let isLeft;
let isRight;
let isFalling;
let isPlummeting;
let isJumping;
let platformPos_y;

let game_score;
let lives;
let skyColour;
let level = 1;
let house;

let player;
const platforms = [new Platform()];

const keys = { right: { pressed: false }, left: { pressed: false } };

function preload() {}

function setup() {
  createCanvas(1024, 576);
  player = new Player();
  //platforms = new Platform();
  startGame();
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {
  //console.log(keyCode);
  switch (keyCode) {
    case 38:
      //   console.log("up");
      //problem: jump is accumulating
    //   if (player.velocity.y >= -20) {
        player.velocity.y -= 20;
        // console.log(player.velocity);
    //   } else console.log("reached", player.velocity);

      break;
    case 40:
      //   console.log("down");
      break;
    case 37:
      //   console.log("left");
      keys.left.pressed = true;
      break;
    case 39:
      //console.log("right");
      keys.right.pressed = true;
      break;
    case 32:
      //   console.log("space");
      break;
  }
  console.log(keys.right.pressed);
}

function keyReleased() {
  switch (keyCode) {
    case 38:
      //console.log("up");
      //problem: jump is accumulating
      //if (player.velocity.y >= -10) {
      player.velocity.y += 20;
      //  console.log(player.velocity);
      //} else console.log("reached", player.velocity);

      break;
    case 40:
      //console.log("down");
      break;
    case 37:
      //   console.log("left");
      keys.left.pressed = false;
      break;
    case 39:
      //console.log("right");
      keys.right.pressed = false;
      break;
    case 32:
      //console.log("space");
      break;
  }
}

function startGame() {}

function draw() {
  background(color(100, 155, 255));
  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      platforms.forEach((platform) => {
        platform.position.x -= 3;
      });
    } else if (keys.left.pressed) {
      platforms.forEach((platform) => {
        platform.position.x += 3;
      });
    }
  }
  //platform collision detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
}
