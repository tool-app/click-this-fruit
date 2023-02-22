// game objects
var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");

var fruits = [];
var fruitColors = ["red", "orange", "yellow", "green", "blue", "purple"];

// game variables
var score = 0;
var gameOver = false;
var fruitSpeed = 1;

// game functions
function spawnFruit() {
  var fruitWidth = 30 + Math.random() * 20;
  var fruitHeight = 30 + Math.random() * 20;
  var fruitX = Math.random() * (canvas.width - fruitWidth);
  var fruitY = 0 - fruitHeight;
  var fruitColor = fruitColors[Math.floor(Math.random() * fruitColors.length)];

  fruits.push({
    x: fruitX,
    y: fruitY,
    width: fruitWidth,
    height: fruitHeight,
    color: fruitColor
  });
}

function update() {
  // spawn new fruit if there are less than 10
  if (fruits.length < 5) {
    spawnFruit();
  }

  // move fruits and check for collision with cursor
  canvas.addEventListener("click", function(event) {
    var mouseX = event.clientX - canvas.getBoundingClientRect().left;
    var mouseY = event.clientY - canvas.getBoundingClientRect().top;

    for (var i = 0; i < fruits.length; i++) {
      if (mouseX >= fruits[i].x && mouseX <= fruits[i].x + fruits[i].width && mouseY >= fruits[i].y && mouseY <= fruits[i].y + fruits[i].height) {
        score += 1;
        fruits.splice(i, 1);
        spawnFruit();
        fruitSpeed += 0.03;
        break;
      }
    }
  });

  for (var i = 0; i < fruits.length; i++) {
    fruits[i].y += fruitSpeed;

    if (fruits[i].y > canvas.height) {
      gameOver = true;
      document.getElementById("game-over-message").innerHTML = "Game Over! Final Score: " + score;
      document.getElementById("game-over-message").style.display = "block";
      document.getElementById("restart-button").style.display = "block";
    }
  }

  // draw game objects
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < fruits.length; i++) {
    context.fillStyle = fruits[i].color;
    context.fillRect(fruits[i].x, fruits[i].y, fruits[i].width, fruits[i].height);
  }

  // draw score
  document.getElementById("score").innerHTML = score;

  // game loop
  if (!gameOver) {
    requestAnimationFrame(update);
  }
}

// start game
canvas.width = 600;
canvas.height = 800;
update();

// restart game
document.getElementById("restart-button").addEventListener("click", function() {
  fruits = [];
  score = 0;
  gameOver = false;
  fruitSpeed = 2;
  document.getElementById("game-over-message").style.display = "none";
  document.getElementById("restart-button").style.display = "none";
  update();
});
