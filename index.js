const cells = document.querySelectorAll(".row");
const turnDisplay = document.getElementById("turn");
const restartButton = document.getElementById("restartButton");

let game = "X"; // Letter to input
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Initial column spaces value

// function to input the letter and identify the winner
function handleCellClick(event) {
  const clickedCell = event.target; // cell that the player clicked
  const cellIndex = clickedCell.getAttribute("data-cell-index"); // gets the value of the clicked cell

  // stops the game when the winner is decided
  if (gameBoard[cellIndex] !== "" || checkWinner(gameBoard)) {
    return;
  }

  game = game === "X" ? "O" : "X"; // Changes the letter depending on the turn
  gameBoard[cellIndex] = game; // Inputs the value to the gameBoard
  clickedCell.textContent = game; // Inputs the value to the clicked cell

  // If check winner function matches a winningCombination
  if (checkWinner(gameBoard)) {
    turnDisplay.textContent = `${currentPlayer} wins!`;
  } else if (!gameBoard.includes("")) {
    turnDisplay.textContent = "It's a draw!"; // If gameBoard doesn't have an empty space or string
  } else {
    // If checkwinner function haven't matches to a winning combination yet and there is a space in gameBoard
    currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
    turnDisplay.textContent = `${currentPlayer}'s turn`;
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
