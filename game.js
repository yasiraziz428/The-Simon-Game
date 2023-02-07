const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
let level = 0;
let started = true;

$("body").keypress(() => (started ? nextSequence() : !started));

$(".btn").on("click", (e) => {
  $("#level-title").text(`Level ${level}`);
  let userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userChosenColour);
});

const nextSequence = () => {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#level-title").text(`Level ${level}`);
  started = false;
  level++;
};

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

const animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 500);
};

const playSound = (userChosenColour) => {
  const audio = new Audio(`../sounds/${userChosenColour}.mp3`);
  audio.play();
};

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
