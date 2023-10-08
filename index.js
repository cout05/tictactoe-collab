const cells = document.querySelectorAll(".row");
const turnDisplay = document.getElementById("turn");
const restartButton = document.getElementById("restartButton");
const computerToggle = document.getElementById("computerToggle");

let game = "X"; // Letter to input
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Initial column spaces value
let isComputerPlayer = false;
let currentPlayer = "Player 1"; // Add currentPlayer variable to keep track of the current player


function toggleComputerPlayer() {
  isComputerPlayer = !isComputerPlayer;
  if (isComputerPlayer) {
    computerToggle.textContent = "Play with Another Player";
  } else {
    computerToggle.textContent = "Play with Computer";
  }
}


function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = clickedCell.getAttribute("data-cell-index");

  if (gameBoard[cellIndex] !== "" || checkWinner(gameBoard)) {
    return;
  }

  game = currentPlayer === "Player 1" ? "X" : "O";
  gameBoard[cellIndex] = game;
  clickedCell.textContent = game;

  if (checkWinner(gameBoard)) {
    turnDisplay.textContent = `${currentPlayer} wins!`;
  } else if (!gameBoard.includes("")) {
    turnDisplay.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
    turnDisplay.textContent = `${currentPlayer}'s turn`;

    if (currentPlayer === "Player 2") {
      setTimeout(makeComputerMove, 1000); // Delay computer's move for 1 second
    }
  }
}

function makeComputerMove() {
  if (!isComputerPlayer) {
    return; // Stop the function if computer player mode is disabled
  }
  // Implement logic for the computer's move here
  let emptyCells = gameBoard.reduce((acc, cell, index) => {
    if (cell === "") {
      acc.push(index);
    }
    return acc;
  }, []);

  // Choose a random empty cell for the computer's move
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const computerMoveIndex = emptyCells[randomIndex];

  game = currentPlayer === "Player 1" ? "X" : "O";
  gameBoard[computerMoveIndex] = game;
  cells[computerMoveIndex].textContent = game;

  if (checkWinner(gameBoard)) {
    turnDisplay.textContent = `${currentPlayer} wins!`;
  } else if (!gameBoard.includes("")) {
    turnDisplay.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
    turnDisplay.textContent = `${currentPlayer}'s turn`;
  }
  if (isComputerPlayer && currentPlayer === "Player 2") {
    setTimeout(makeComputerMove, 1000);
  }
}
// Function to check game winner
function checkWinner(board) {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombination) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function restartGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "Player 1";
  turnDisplay.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
}


// Puts an event listener to each of the cells that calls HandCellClick Function
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
computerToggle.addEventListener("click", toggleComputerPlayer);


