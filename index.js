
const cells = document.querySelectorAll('.row');
const turnDisplay = document.getElementById('turn');
const restartButton = document.getElementById('restartButton');

let game= 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-cell-index');

    if (gameBoard[cellIndex] !== '' || checkWinner(gameBoard)) {
        return;
    }
    game= game === "X" ? "O" : "X";
    gameBoard[cellIndex] = game;
    clickedCell.textContent = game;
    if (checkWinner(gameBoard)) {
        turnDisplay.textContent = `${currentPlayer} wins!`;
    } else if (!gameBoard.includes('')) {
        turnDisplay.textContent = "It's a draw!";
    } else {
        currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
        turnDisplay.textContent = `${currentPlayer}'s turn`;
    }
}

function checkWinner(board) {
    const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
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
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'Player 1';
    turnDisplay.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
