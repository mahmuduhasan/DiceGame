const newGame = document.getElementById("start-new-game");
const roleDice = document.getElementById("dice-roll");
const diceLudoOne = document.getElementById("ludo-dice");
const diceLudoTwo = document.getElementById("ludo-dice-two");
const holdGame = document.getElementById("hold");
const startGame = document.getElementById("start");
const playerOnePanel = document.querySelector(".left");
const playerTwoPanel = document.querySelector(".right");
const playerOneCurrentScore = document.querySelector(".score-player-one");
const playerTwoCurrentScore = document.querySelector(".score-player-two");
const playerOneName = document.querySelector(".score .player-one");
const playerTwoName = document.querySelector(".score .player-two");
const winningScore = document.querySelector("#win-score");

let finalScore, singleRoundScore, activePlayer, gamePlaying, finalWinScore;
let checkDiceOne = [0, 1];
let checkDiceTwo = [0, 1];

const startGameHandler = () => {
  alert("GAME STARTED!");
  const inputScore = winningScore.value;
  if (inputScore.trim() == "") {
    winningScore.placeholder = "Default Score set to 100";
    finalWinScore = 100;
    newGameHandler();
  } else {
    finalWinScore = parseInt(inputScore);
    winningScore.value = "";
    winningScore.placeholder = `Score set to ${finalWinScore}`;
    newGameHandler();
  }
  startGame.setAttribute("disabled", true);
  gamePlaying = true;
};

const newGameHandler = () => {
  if (!gamePlaying) {
    singleRoundScore = 0;
    activePlayer = 0;
    checkDiceOne = [0, 1];
    checkDiceTwo = [0, 1];
    const playerOneScore = document.getElementById("player-one-score");
    const playerTwoScore = document.getElementById("player-two-score");
    playerOneCurrentScore.innerHTML = 0;
    playerTwoCurrentScore.innerHTML = 0;
    playerOneScore.innerHTML = 0;
    playerTwoScore.innerHTML = 0;
    playerOnePanel.classList.add("active");
    playerTwoPanel.classList.remove("active");
    playerOneName.innerHTML = "PLAYER 1";
    playerTwoName.innerHTML = "PLAYER 2";
  }
};

const changeDice = (diceNumber, diceDiv, iconID) => {
  if (diceNumber === 1) {
    diceDiv.innerHTML = `<i id=${iconID} class="fas fa-bomb"></i>`;
  } else if (diceNumber === 2) {
    diceDiv.innerHTML = `<i id=${iconID} class="fas fa-dice-two"></i>`;
  } else if (diceNumber === 3) {
    diceDiv.innerHTML = `<i id=${iconID} class="fas fa-dice-three"></i>`;
  } else if (diceNumber === 4) {
    diceDiv.innerHTML = `<i id=${iconID} class="fas fa-dice-four"></i>`;
  } else if (diceNumber === 5) {
    diceDiv.innerHTML = `<i id=${iconID} class="fas fa-dice-five"></i>`;
  } else if (diceNumber === 6) {
    diceDiv.innerHTML = `<i id=${iconID} class="fas fa-dice-six"></i>`;
  }
};

const checkDoubleSix = (diceCheckArray) => {
  for (let i = 0; i < diceCheckArray.length; i++) {
    if (diceCheckArray[i] === 6 && diceCheckArray[i - 1] === 6) {
      document.querySelector(".active .score .final-score").innerHTML = "0";
      nextPlayer();
    } else {
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = singleRoundScore;
    }
  }
};

const diceHandler = () => {
  if (gamePlaying) {
    let diceNumberOne = Math.floor(Math.random() * 6 + 1);
    let diceNumberTwo = Math.floor(Math.random() * 6 + 1);
    changeDice(diceNumberOne, diceLudoOne, "dice");
    changeDice(diceNumberTwo, diceLudoTwo, "dice-two");
    if (diceNumberOne != 1 && diceNumberTwo != 1) {
      if (diceNumberOne == 6 && diceNumberTwo == 6) {
        document.querySelector(".active .score .final-score").innerHTML = "0";
        nextPlayer();
      } else {
        singleRoundScore += diceNumberOne + diceNumberTwo;
        checkDiceOne.push(diceNumberOne);
        checkDiceTwo.push(diceNumberTwo);
        checkDoubleSix(checkDiceOne);
        checkDoubleSix(checkDiceTwo);
        console.log(checkDiceOne);
        console.log(checkDiceTwo);
      }
    } else {
      nextPlayer();
    }
  }
};

const holdGameHandler = () => {
  if (gamePlaying) {
    const element = document.querySelector(".active .score .final-score");
    finalScore = parseInt(element.innerHTML) + singleRoundScore;
    element.innerHTML = finalScore;
    console.log(finalWinScore);
    if (finalScore >= finalWinScore) {
      document.querySelector(".active .score .player-name").innerHTML =
        "WINNER!";
      gamePlaying = false;
      startGame.removeAttribute("disabled");
      winningScore.placeholder = "Enter Win Destination!";
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
  checkDiceOne = [0, 1];
  checkDiceTwo = [0, 1];
  singleRoundScore = 0;
  playerOneCurrentScore.textContent = "0";
  playerTwoCurrentScore.textContent = "0";
  playerOnePanel.classList.toggle("active");
  playerTwoPanel.classList.toggle("active");
};

newGame.addEventListener("click", newGameHandler);
roleDice.addEventListener("click", diceHandler);
holdGame.addEventListener("click", holdGameHandler);
startGame.addEventListener("click", startGameHandler);
