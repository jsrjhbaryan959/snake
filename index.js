let direction = { x: 0, y: 0 };
const fs = new Audio("food.mp3");
const overs = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const ms = new Audio("1.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let arr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };

//Game Function
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime)
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // if u nunp into yorself
  for (let i = 1; i < arr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // if u bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  // Part 1: Updating snake array & food
  if (isCollide(arr)) {
    overs.play();
    ms.pause();
    direction = { x: 0, y: 0 };
    alert("Game Over");
    arr = [{ x: 12, y: 15 }];
    ms.play();
    score = 0;
  }

  // If you have eaten the food, increment the score and regenrate the food
  if (arr[0].y === food.y && arr[0].x === food.x) {
    fs.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      HighscoreBox.innerHTML = "High Score: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    arr.unshift({ x: arr[0].x + direction.x, y: arr[0].y + direction.y });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //move the snake

  for (let i = arr.length - 2; i >= 0; i--) {
    arr[i + 1] = { ...arr[i] };
  }

  arr[0].x += direction.x;
  arr[0].y += direction.y;

  // Part 2: Render snake and food
  // Display the snake

  ms.play();
  ms.loop = true;

  board.innerHTML = "";
  arr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Main Logiv
// ms.play();
// ms.loop =true;

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  HighscoreBox.innerHTML = "High Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  direction = { x: 0, y: 1 }; // Start the game
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      direction.x = 0;
      direction.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      direction.x = 0;
      direction.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      direction.x = -1;
      direction.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      direction.x = 1;
      direction.y = -0;
      break;
    default:
      break;
  }
});
