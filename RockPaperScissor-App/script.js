// Initialize score from local storage or set default values
let score = JSON.parse(localStorage.getItem("score"));
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}

// Update the score display on the UI
updateScoreElement();

let computerMove = ""; // Variable to store the computer's move
let result = ""; // Variable to store the result of the game
let isAutoPlaying = false; // Flag for auto-play mode
let intervalId; // Variable to store the interval ID for auto-play

// Function to start or stop auto-play
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

// Event listeners for button clicks and keyboard inputs
document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});

// Main game function
function playGame(playerMove) {
  pickComputerMove(); // Get the computer's move

  // Determine the result of the game based on player and computer moves
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else {
      result = "You win.";
    }
  }

  // Update the score based on the result
  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else {
    score.ties += 1;
  }

  // Save the updated score to local storage
  localStorage.setItem("score", JSON.stringify(score));

  // Update the UI with the result and score
  updateScoreElement();
  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-moves").innerHTML = `You 
    <img class="rock-img" src="Materials/${playerMove}-emoji.png">
    <img class="scissors-img" src="Materials/${computerMove}-emoji.png">
    Computer`;
}

// Function to update the score display on the UI
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// Function to randomly pick a move for the computer
function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
}
