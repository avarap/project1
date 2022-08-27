let player;
let platforms = [];
let enemies;
let clouds;
let gameStarted = false;

let floorPos_y;

let gameChar_world_x, gameChar_y;

let game_score;
let lives = 2;
let skyColour;
let level = 1;
let house;

const keys = {
  right: { pressed: false },
  left: { pressed: false },
  //up: { pressed: false },
};

function preload() {}

function changeStyle(divID) {
  let x = document.getElementById(divID);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function setup() {
  background(255);
  if(gameStarted)
  startGame()
  else
  stopGame();
}

function drawCloud({ x_pos, y_pos, size }) {
  fill(180);
  ellipse(x_pos - 5, y_pos + 8, size, size - 15);
  ellipse(x_pos - 45, y_pos + 18, size - 20, size - 40);
  ellipse(x_pos + 35, y_pos + 18, size - 20, size - 35);
  fill(255);
  ellipse(x_pos, y_pos, size, size - 15);
  ellipse(x_pos - 40, y_pos + 10, size - 20, size - 40);
  ellipse(x_pos + 40, y_pos + 10, size - 20, size - 35);
}

function startGame() {
  let sketchCanvas = createCanvas(innerWidth, innerHeight);
  player = new Player(25, 0, 50, 50);
  floorPos_y = height - 20;
  if (!gameStarted) changeStyle("intro");
  gameStarted = true;

  gameStatus = "";
  platforms = [
    new Platform(100, height - 200, 200, 20),
    new Platform(600, height - 200, 100, 20),
    new Platform(1000, height - 200, 200, 20),
    new Platform(1400, height - 200, 50, 20),
    new Platform(-1, height - 20, 500, 20, "green"),
    new Platform(800, height - 20, 500, 20, "green"),
    new Platform(1600, height - 20, 100, 20, "yellow", true),
  ];

  enemies = [
    new Enemy(createVector(310, height - 190), 2 * PI),
    new Enemy(createVector(1000, height - 190), 2 * PI),
    //new Enemy(createVector(1300, height - 20), PI),
    
  ];

  clouds = [
    { x_pos: 100 - width, y_pos: 150, size: 80 },
    { x_pos: 500 - width, y_pos: 80, size: 80 },
    { x_pos: 850 - width, y_pos: 120, size: 80 },
    { x_pos: 100, y_pos: 150, size: 80 },
    { x_pos: 500, y_pos: 80, size: 80 },
    { x_pos: 850, y_pos: 120, size: 80 },
    { x_pos: 100 + width, y_pos: 150, size: 80 },
    { x_pos: 500 + width, y_pos: 80, size: 80 },
    { x_pos: 850 + width, y_pos: 120, size: 80 },
    { x_pos: 200 + width * 2, y_pos: 80, size: 80 },
    { x_pos: 550 + width * 2, y_pos: 120, size: 80 },
    { x_pos: 900 + width * 2, y_pos: 150, size: 80 },
    { x_pos: 200 + width * 3, y_pos: 80, size: 80 },
    { x_pos: 500 + width * 3, y_pos: 120, size: 80 },
    { x_pos: 750 + width * 3, y_pos: 150, size: 80 },
  ];

  loop();
}

function draw() {
  if (gameStarted) {
    background(color(100, 155, 255));
    noStroke();
    textSize(20);
    fill("white");
    text(`Lives: ${lives}`, 20, 20);

    // Draw clouds
    clouds.forEach((cloud) => {
      drawCloud(cloud);
      // Movement for clouds, whilst on the visible part of the stage
      if (cloud.x_pos < 750 + width * 3) {
        cloud.x_pos += 0.3;
        // When clouds go off the visible part of the stage, their x_pos is set to the start of the stage
      } else {
        cloud.x_pos = 100 - width;
      }
    });

    platforms.forEach((platform) => platform.draw());

    if (enemies) {
      // Draw ball n chains
      for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
        enemies[i].updateGC_Pos(player.x, player.y);
        const isContact = enemies[i].checkContact(player.x, player.y);
        if (isContact) {
          if (lives > 1) {
            lives--;
            startGame();
          } else if (lives === 1) {
            lives--;
            startGame();
          }
        }
      }
    }

    player.draw();

    //ScrollWindow
    if (keys.right.pressed && player.x < 400) {
      player.velX = 5;
    } else if (keys.left.pressed && player.x > 100) {
      player.velX = -5;
    } else {
      player.velX = 0;
      if (keys.right.pressed) {
        platforms.forEach((platform) => (platform.x -= 3));
        enemies.forEach((enemy) => (enemy.vector.x -= 3));
      } else if (keys.left.pressed) {
        platforms.forEach((platform) => (platform.x += 3));
        enemies.forEach((enemy) => (enemy.vector.x += 3));
      }
    }
    //Loose
    if ((!player.isOnplatform() && player.y > height) || lives <= 0) {
      if (lives > 0) {
        lives -= 1;
        startGame();
      } else {
        drawMessage("Game Over!", "lost");
      }
    }
    //Win
    if (player.isOnCheckPoint()) {
      drawMessage("Win!", "win");
    }
  }
}

function drawMessage(message, gStatus) {
  textSize(40);
  text(message, width / 2 - 100, height / 2);
  textSize(20);
  text("Press Space to restart", width / 2 - 150, height / 2 + 20);
  gameStatus = gStatus;
  noLoop();
}

function keyPressed() {
  if (keyCode === UP_ARROW && player.isOnplatform()) {
    player.velY -= 20;
  }
  if (keyCode === LEFT_ARROW) {
    keys.left.pressed = true;
  }
  if (keyCode === RIGHT_ARROW) {
    keys.right.pressed = true;
  }
  if (
    (keyCode === 32 && gameStatus === "win") ||
    (keyCode === 32 && gameStatus === "lost")
  ) {
    lives = 2;
    startGame();
    loop();
  }
}

function keyReleased() {
  switch (keyCode) {
    // case 38: //up
    //   break;
    // case 40: //down
    //   break;
    case 37: //left
      keys.left.pressed = false;
      break;
    case 39: //right
      keys.right.pressed = false;
      break;
    // case 32: //space
    //   break;
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function stopGame() {
  noLoop();
}

window.onload = () =>
  (document.getElementById("start-button").onclick = () => startGame());
