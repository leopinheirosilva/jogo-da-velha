const cellElements = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const winningMessage = document.querySelector(".winning-message");
const winningMessageText = document.querySelector(".winning-message-text");
const restartButton = document.querySelector(".restart-button");

let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;

  for (cell of cellElements) {
    // remove all cellElements classes
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    // add EventListener for each cellElements
    cell.addEventListener("click", handleClick, { once: true });
  }

  // set the board hover element
  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();
};

const setBoardHoverClass = () => {
  board.classList.remove("circle");
  board.classList.remove("x");

  if (isCircleTurn) {
    board.classList.add("circle");
  } else {
    board.classList.add("x");
  }
};

const checkForWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      // check if there is any winning combination with the current element
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageText.innerHTML = "<p> Empate! </p>";
  } else {
    winningMessageText.innerHTML = isCircleTurn
      ? "<p> O ganhou! </p>"
      : "<p> X ganhou! </p>";
  }

  // display winning messages
  winningMessage.classList.add("show-winning-message");
};

const handleClick = (e) => {
  // Place Mark (x or circle)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";
  placeMark(cell, classToAdd);

  // check for win
  const isWin = checkForWin(classToAdd);

  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false); // show winner
  } else if (isDraw) {
    endGame(true); // show draw
  } else {
    swapTurns();
  }
};

startGame();

// restart game
restartButton.addEventListener("click", startGame);
