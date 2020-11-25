const newGame = document.getElementById("start-new-game");
const roleDice = document.getElementById("dice-roll");
const diceLudo = document.getElementById("ludo-dice");
const holdGame = document.getElementById("hold");
const playerOnePanel = document.querySelector(".left");
const playerTwoPanel = document.querySelector(".right");
const playerOneCurrentScore = document.querySelector(".score-player-one");
const playerTwoCurrentScore = document.querySelector(".score-player-two");
const playerOneName = document.querySelector(".score .player-one");
const playerTwoName = document.querySelector(".score .player-two");

let score, singleRoundScore, activePlayer, gamePlaying;

const newGameHandler = () => {
  gamePlaying = true;
  singleRoundScore = 0;
  activePlayer = 0;
  const playerOneScore = document.getElementById("player-one-score");
  const playerTwoScore = document.getElementById("player-two-score");
  playerOneCurrentScore.innerHTML = 0;
  playerTwoCurrentScore.innerHTML = 0;
  playerOneScore.innerHTML = 0;
  playerTwoScore.innerHTML = 0;
  playerOnePanel.classList.add("active");
  playerTwoPanel.classList.remove("active");
  playerOneName.innerHTML = "PLAYER 1";
  playerTwoName.innerHTML = "PLAYER 2"
};

const gameHandler = () => {
  if (gamePlaying) {
    let diceNumber = Math.floor(Math.random() * 6 + 1);
    if (diceNumber === 1) {
      diceLudo.innerHTML = `<i id="dice" class="fas fa-bomb"></i>`;
    } else if (diceNumber === 2) {
      diceLudo.innerHTML = `<i id="dice" class="fas fa-dice-two"></i>`;
    } else if (diceNumber === 3) {
      diceLudo.innerHTML = `<i id="dice" class="fas fa-dice-three"></i>`;
    } else if (diceNumber === 4) {
      diceLudo.innerHTML = `<i id="dice" class="fas fa-dice-four"></i>`;
    } else if (diceNumber === 5) {
      diceLudo.innerHTML = `<i id="dice" class="fas fa-dice-five"></i>`;
    } else if (diceNumber === 6) {
      diceLudo.innerHTML = `<i id="dice" class="fas fa-dice-six"></i>`;
    }
    if (diceNumber != 1) {
      singleRoundScore += diceNumber;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = singleRoundScore;
    } else {
      nextPlayer();
    }
  }
};

const holdGameHandler = () => {
  if (gamePlaying) {
    const element = document.querySelector(".active .score .final-score");
    let finalScore = parseInt(element.innerHTML) + singleRoundScore;
    element.innerHTML = finalScore;
    if (finalScore >= 100) {
      document.querySelector(".active .score .player-name").innerHTML =
        "Winner!";
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
};

const nextPlayer = () => {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  singleRoundScore = 0;
  playerOneCurrentScore.textContent = "0";
  playerTwoCurrentScore.textContent = "0";
  playerOnePanel.classList.toggle("active");
  playerTwoPanel.classList.toggle("active");
};

newGame.addEventListener("click", newGameHandler);
roleDice.addEventListener("click", gameHandler);
holdGame.addEventListener("click", holdGameHandler);
