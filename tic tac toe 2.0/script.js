const gameBoard = document.getElementById('gameBoard');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initializeGame() {
  gameBoard.innerHTML = '';
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `🎯 Player ${currentPlayer}'s turn`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer);

  if (checkWin()) {
    statusText.textContent = `🏆 Player ${currentPlayer} wins!`;
    highlightWinningCells();
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "🤝 It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `🎯 Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      document
        .querySelectorAll('.cell')
        .forEach(cell => {
          const idx = cell.getAttribute('data-index');
          if (idx == a || idx == b || idx == c) {
            cell.classList.add('winning');
          }
        });
      return true;
    }
    return false;
  });
}

resetBtn.addEventListener('click', initializeGame);

initializeGame();
