const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let circleTurn = false;

const board = document.querySelector('.board');
const winningMessageModal = document.querySelector('.winning-message-modal');
const winningTextMessage = document.querySelector('.winning-text-message');
const cellElements = document.querySelectorAll('[data-cell]');
const button = document.querySelector('button');

startGame();

function startGame () {
  cellElements.forEach(cell => {
    cell.classList.remove('x');
    cell.classList.remove('circle');
    cell.addEventListener('click', handleClick, { once: true });
  });

  button.addEventListener('click', restartGame, { once: true });

  circleTurn = false;
  setBoardTurnClass();
}

function handleClick (e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  }

  swapTurns();
  setBoardTurnClass();
}

function isDraw () {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) ||
      cell.classList.contains(CIRCLE_CLASS);
  });
}

function endGame (draw) {
  if (draw) {
    winningTextMessage.innerHTML = `Draw!`;
  } else {
    winningTextMessage.innerHTML = `${circleTurn ? "0's " : "X's "} Wins!`;
  }
  winningMessageModal.classList.add('show');
}

function restartGame () {
  winningTextMessage.innerHTML = '';
  winningMessageModal.classList.remove('show');
  startGame();
}

function placeMark (cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns () {
  circleTurn = !circleTurn;
}

function setBoardTurnClass () {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
    return;
  }

  board.classList.add(X_CLASS);
}

function checkWin (currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    })
  })
}