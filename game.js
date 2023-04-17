let gameBoard = document.getElementById("game-cells");
let gameArray = ["", "", "", "", "", "", "", "", ""];

const scoreElement = document.getElementById('score');


const players = [
  {name: 'х',
  score: 0,
  turn: true
  }, {
    name: 'о',
    score: 0,
    turn: true
  }

]

const renderScore = () => {
 const playersHtml = players.map(player=> {
  return  `<p class="header_score">WIN ${player.name}<span id = "score-x" class="header_score_number">${player.score}</span></p>`
 }).join(''); 
 scoreElement.innerHTML = playersHtml;
}

const initEventListeners = () => {
  const gameCells = document.querySelectorAll(".game_cell");

  for (gameCell of gameCells) {
    const index = gameCell.dataset.index;
    gameCell.addEventListener("click", () => {
      if (gameArray[index] == "") {
        if (players[0].turn == false) {
          players[0].turn = true;
          players[1].turn = false;
          gameArray[index] = 'о';
        } else {
          players[1].turn = true;
          players[0].turn = false;
          gameArray[index] = 'х';
        }
        win();
        renderBoard();
       
      }
    });
  }
};
const winningCombo = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
  [1, 4, 7],
  [2, 5, 8],
];
const win = () =>  {
  
for (let combo of winningCombo) {
  let [a, b, c] = combo;
  if (gameArray[a] !== '' && gameArray[a] === gameArray[b] && gameArray[b] === gameArray[c]) {
    if (players[1].turn == true) {
     players[0].score += 1;
    } else if(players[0].turn == true ) {
      players[1].score += 1;
    }
  }
}
 };

const renderBoard = () => {
  const gameArrayHtml = gameArray
    .map((cell, index) => {
      return `<div data-index = "${index}" class="game_cell">${gameArray[index]}</div>`;
    })
    .join("");
  gameBoard.innerHTML = gameArrayHtml;
  initEventListeners();
  renderScore();
};

renderBoard();
