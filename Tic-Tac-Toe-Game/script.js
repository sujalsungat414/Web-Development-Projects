let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX , playerO

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

// Function to reset the game
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Event listener for each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // Player X's turn
      box.innerText = "X";
      box.classList.add("x-color");
      turnO = false;
    } else {
      // Player O's turn
      box.innerText = "O";
      box.classList.add("o-color");
      turnO = true;
    }

    box.disabled = true;

    checkWinner();
  });
});

// Function to enable all boxes
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("x-color", "o-color");
  }
};

// Function to disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Function to show the winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Function to check for a winner
const checkWinner = () => {
  let winnerFound = false;
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        winnerFound = true;
        break;
      }
    }
  }
  if (!winnerFound) {
    checkDraw();
  }
};

// Function to check for a draw
const checkDraw = () => {
  let allFilled = true;

  for (let box of boxes) {
    if (box.innerText === "") {
      allFilled = false;
      break;
    }
  }
  if (allFilled) {
    showDraw();
  }
};

// Function to show a draw message
const showDraw = () => {
  msg.innerText = "It's a Draw! Nobody wins.";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Event listeners for buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
