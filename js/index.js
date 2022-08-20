let isLeft;
let isRight;
let isFalling;
let overPlatform;
let isJumping;
//let platformPos_y;

let game_score;
let lives;
let skyColour;
let level = 1;
let house;

let player;
let platforms = [];

const keys = {
  right: { pressed: false },
  left: { pressed: false },
  up: { pressed: false },
};

function preload() {}

function setup() {
  startGame();
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {
  //console.log(keyCode);
  switch (keyCode) {
    case 38: //up
      
      //problem: jump is accumulating
      if (overPlatform)
      player.velocity.y -= 15;
      keys.up.pressed = true;
      break;
    case 40: //down
      break;
    case 37: //left
      keys.left.pressed = true;
      break;
    case 39: //right
      keys.right.pressed = true;
      break;
    case 32: //space
      break;
  }
}

function keyReleased() {
  switch (keyCode) {
    case 38: //up
      keys.up.pressed = false;
      break;
    case 40: //down
      break;
    case 37: //left
      keys.left.pressed = false;
      break;
    case 39: //right
      keys.right.pressed = false;
      break;
    case 32: //space
      break;
  }
}

function startGame() {
  createCanvas(1024, 576);
  player = new Player();
  platforms = [new Platform(100,432,200),new Platform(-1,height-20,200)]

}

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
      player.position.y + player.height + player.velocity.y >= platform.position.y && //
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
      platform.onPlatform=true;
    }else{
      platform.onPlatform=false;
    }
  });

  // overPlatform = platforms.reduce((sumT,platform)=>{
  //   if(platform.onPlatform){
  //     console.log("hola");
  //     sumT+=1;
  //   }
  //   return sumT;
  // },0);

  const p = platforms.filter((platform) => platform.onPlatform==true);
  if (p.length>=1)
  {
    overPlatform = true;
  }else{
    overPlatform = false;
  }

  if(!overPlatform && player.position.y+player.height == height){
    console.log("game over!");
    startGame();
  }


  //console.log(overPlatform,Math.floor(player.position.y),height);
}
