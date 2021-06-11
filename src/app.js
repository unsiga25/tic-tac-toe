import "../node_modules/bootstrap/dist/js/bootstrap";

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const x_class = "x";
const c_class = "c";
const win_element = document.getElementById("win");
const win_txt = document.querySelector("[data-win-txt]");
const restart = document.getElementById("restart");
let circleTurn;
const win_cont = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();
restart.addEventListener("click", startGame);
function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(x_class);
    cell.classList.remove(c_class);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  win_element.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? c_class : x_class;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) endGame(false);
  else if (isDraw()) endGame(true);
  else {
    swapTurns();
    setBoardHoverClass();
  }
}
function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(x_class) || cell.classList.contains(c_class);
  });
}
function endGame(draw) {
  if (draw) {
    win_txt.innerText = "Draw";
  } else win_txt.innerText = `${circleTurn ? "Player 2" : "Player 1"} WINS!`;
  win_element.classList.add("show");
}
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(x_class);
  board.classList.remove(c_class);
  if (circleTurn) board.classList.add(c_class);
  else board.classList.add(x_class);
}
function checkWin(currentClass) {
  return win_cont.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
