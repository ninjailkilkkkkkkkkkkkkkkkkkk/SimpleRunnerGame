const ball = document.getElementById("ball");
const knife = document.getElementById("knife");
const ballCollision = document.getElementById("ballCollision");
const scoreDisplay = document.getElementById("score");
const bestScoreDisplay = document.getElementById("bestScore");
const gameOverDisplay = document.getElementById("gameOver");
 
knife.classList.add("knifeMove");
ball.classList.add("spin");

let score = 0;
let bestScore = 0;
let scoreAdded = false;

setInterval(function() {
  const ballPosition = ball.getBoundingClientRect();
  const knifePosition = knife.getBoundingClientRect();
  const ballCollisionPosition = ballCollision.getBoundingClientRect();

  if (knifePosition.x < ballCollisionPosition.x && ballPosition.y >= 140) {
    gameOver();
  }

  function gameOver() {
    const restart = confirm("Game Over! Your score is " + score + ". Почати знову?");
    if (restart == true) {
      score = 0;
      scoreDisplay.textContent = score;
      scoreAdded = true;
      ball.classList.remove("spin");
      knife.classList.remove("knifeMove");
      setTimeout(function() {
      knife.classList.add("knifeMove");
      ball.classList.add("spin");
      }, 100);
    } else {
      gameOverDisplay.style.display = "block";
      score = 0;
      scoreDisplay.textContent = score;
      scoreAdded = true;
      ball.classList.remove("spin");
      knife.classList.remove("knifeMove");
    }
  }


  if (ballPosition.right > knifePosition.left) {
    if (!scoreAdded) {
      score++;
      scoreDisplay.textContent = score;
      if (score > bestScore) {
        bestScore = score;
        bestScoreDisplay.textContent = bestScore;
      }
      scoreAdded = true;
    }
  } else {
    scoreAdded = false;
  }
}, 100);

document.addEventListener("keydown", function(event) {
  if (event.code === "Space") {
    jump();
  }
});

function jump() {
  if (ball.classList != "jump") {
    ball.classList.add("jump");
    ball.classList.remove("spin");
  }
  setTimeout(function() {
    ball.classList.remove("jump");
    ball.classList.add("spin");
  }, 300);
}