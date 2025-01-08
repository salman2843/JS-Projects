let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please enter the valid number!");
  } else if (guess < 1) {
    alert("Please enter the number greater than 1");
  } else if (guess > 100) {
    alert("Please enter the number less than 100");
  } else {
    prevGuess.push(guess);
    if (numGuess === 10) {
      displayGuess(guess);
      displayMessage(`Game Over! The Number was ${randomNumber}`);
      endGame();
    } else {
      checkGuess(guess);
      displayGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage("You guessed it right!");
    endGame();
  } else if (guess < randomNumber) {
    displayMessage("Number is Too Low!");
  } else if (guess > randomNumber) {
    displayMessage("Number is Too High!");
  }
}

function displayGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML = prevGuess.join(", ");
  remaining.innerHTML = `${11 - numGuess}`;
  numGuess++;
}
function displayMessage(message) {
  lowOrHi.innerHTML = ` <h3> ${message}</h3>`;
}
function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  remaining.innerHTML = "0";
  guessSlot.innerHTML = "";
  p.classList.add("button");
  p.innerHTML = `<h2 id='newGame' style="cursor: pointer;"> <u> Start again </u> </h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}
function newGame() {
  const newGameButton = document.querySelector("#newGame");
  newGameButton.addEventListener("click", function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = "10";
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);
    lowOrHi.innerHTML = "";
    playGame = true;
  });
}
