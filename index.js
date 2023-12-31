const cells = document.querySelectorAll(".row");
const turnDisplay = document.getElementById("turn");
const modeInd = document.getElementById("mode-ind");
const trashtalk = document.getElementById("tt");

let game = "X"; // Letter to input
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Initial column spaces value
let isComputerPlayer = false;
let currentPlayer = true; // condition for players turn

// choose mode
const chooseModeContainer = document.getElementById("mode");
const boardContainer = document.getElementById("game");

const gameMode = (param) => {
  chooseModeContainer.style.display = "none";
  boardContainer.style.display = "flex";
  if (param === "ai") {
    isComputerPlayer = true;
    currentPlayer = false;
    setTimeout(makeComputerMove, 500);
    modeInd.textContent = "Player Vs Computer";
  } else {
    modeInd.textContent = "Player Vs Player";
    isComputerPlayer = false;
  }
};

function restartGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  if (isComputerPlayer) {
    currentPlayer = false;
    turnDisplay.textContent = `computer's turn`;
    setTimeout(makeComputerMove, 1000);
  } else {
    currentPlayer = true;
    turnDisplay.textContent = `Player${currentPlayer ? " 1" : " 2"}'s turn`;
  }
  cells.forEach((cell) => (cell.textContent = ""));
  cells.forEach((cell) => cell.classList.remove("x"));
  cells.forEach((cell) => cell.classList.remove("o"));
  trashtalk.style.display = "none";
}

const backToMenu = () => {
  chooseModeContainer.style.display = "block";
  boardContainer.style.display = "none";
  restartGame();
};

function handleCellClick(event) {
  const clickedCell = event.target;
  const cellIndex = clickedCell.getAttribute("data-cell-index");

  if (gameBoard[cellIndex] !== "" || checkWinner(gameBoard)) {
    return;
  }

  if (!currentPlayer && isComputerPlayer) {
    return;
  }

  game = currentPlayer ? "X" : "O";
  gameBoard[cellIndex] = game;
  clickedCell.textContent = game;
  clickedCell.classList.add(`${game === "X" ? "x" : "o"}`);

  if (checkWinner(gameBoard)) {
    turnDisplay.textContent = `Player${currentPlayer ? " 1" : " 2"} wins!`;
  } else if (!gameBoard.includes("")) {
    turnDisplay.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer ? false : true;

    if (isComputerPlayer) {
      turnDisplay.textContent = `${
        currentPlayer ? "Player 1" : "Computer"
      }'s turn`;
    } else {
      turnDisplay.textContent = `Player${currentPlayer ? " 1" : " 2"}'s turn`;
    }

    if (!currentPlayer) {
      setTimeout(makeComputerMove, 1000); // Delay computer's move for 1 second
    }
  }
}

function checkPlayerMove(gameBoard) {
  // Create a copy of the game board.
  let boardCopy = [...gameBoard];

  // Iterate over all empty squares on the board.
  for (let i = 0; i <= 9; i++) {
    if (boardCopy[i] === "") {
      // Make the move on the copy of the board.
      boardCopy[i] = "O";
      // Check if the move would win the game for the computer.
      if (checkWinner(boardCopy, "O")) {
        // returns an index for the move
        return i;
      }
      boardCopy = [...gameBoard];
    }
  }

  // If no moves can be blocked, then return null.
  return null;
}

function blockPlayerMove(gameBoard) {
  // Create a copy of the game board.
  let boardCopy = [...gameBoard];

  // Iterate over all empty squares on the board.
  for (let i = 0; i <= 9; i++) {
    if (boardCopy[i] === "") {
      // Make the move on the copy of the board.
      boardCopy[i] = "X";
      // Check if the move would win the game for the player.
      if (checkWinner(boardCopy, "X")) {
        // returns an index for the move
        return i;
      }
      boardCopy = [...gameBoard];
    }
  }

  // If no moves can be blocked, then return null.
  return null;
}

function makeComputerMove() {
  if (!isComputerPlayer) {
    return; // Stop the function if computer player mode is disabled
  }

  game = currentPlayer === "Player 1" ? "X" : "O";

  let emptyCells = gameBoard.reduce((acc, cell, index) => {
    if (cell === "") {
      acc.push(index);
    }
    return acc;
  }, []);

  const blockMove = blockPlayerMove(gameBoard);
  const checkMove = checkPlayerMove(gameBoard);
  let move = 0;

  if (checkMove !== null) {
    // Checks if the computers move can win the game
    move = checkMove;
  } else if (checkMove === null && blockMove !== null) {
    // Check if the player can win on their next move and block them
    move = blockMove;
  } else {
    // If no immediate winning or blocking moves are available, make a random move
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMoveIndex = emptyCells[randomIndex];
    move = computerMoveIndex;
  }

  gameBoard[move] = game;
  cells[move].textContent = game;
  cells[move].classList.add(`${game === "X" ? "x" : "o"}`);

  if (checkWinner(gameBoard)) {
    turnDisplay.textContent = `${
      currentPlayer && !isComputerPlayer ? "Player 1" : "Computer"
    } wins!`;
    trashtalk.style.display = `${!currentPlayer ? "block" : "none"}`;

    return; // stops the computer when it wins
  } else if (!gameBoard.includes("")) {
    turnDisplay.textContent = "It's a draw!";
    trashtalk.style.display = "block";
  } else {
    currentPlayer = currentPlayer ? false : true;
    turnDisplay.textContent = `${
      currentPlayer ? "Player 1" : "Computer"
    }'s turn`;
  }
  if (isComputerPlayer && !currentPlayer) {
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

// Puts an event listener to each of the cells that calls HandCellClick Function
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
