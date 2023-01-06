const cards = document.querySelectorAll(".memory-card");
// Music
let gameMusic = document.getElementById("gameMusic");

// Sound effects
let clickSound = document.getElementById("clickCard");
let loseLife = document.getElementById("loseLife");
let validPair = document.getElementById("validPair");
let lockBoard = false;
// Music Volume
gameMusic.volume = 0.4;
clickSound.volume = 0.3;
gameOver.volume = 0.5;
win.volume = 0.5;

// When the page load
window.onload = function () {
  gameMusic.play();
};

// Variables
let gridItem = document.querySelectorAll(".grid-item");
let playerScore = 100;
let lifeLeft = 5;
console.log(playerScore);

// Display the user score
const playerScoreElement = document.querySelector("#playerScore");
playerScoreElement.innerText = playerScore;

// Define a variable to store the remaining time (in seconds)
let secondsLeft = 5;

// function to update the countdown + effects
function updateCountdown() {
  document.getElementById("countdown").innerText = secondsLeft;

  // Decrement the remaining time
  secondsLeft--;

  // Then, hide the countdown
  if (secondsLeft === 0) {
    document.getElementById("countdownBlock").style.display = "none";
    cards.forEach((card) => {
      card.classList.remove("flip");
      lockBoard = false;
    });
  }
}

// Run the updateCountdown function every second (1000 milliseconds)
setInterval(updateCountdown, 1000);
let hasFlippedCard = false;

let firstCard, secondCard;

function flipCard() {
  let compteur = document.getElementById("countdownBlock").style.display;
  if (compteur == "none") {
    if (lockBoard) return;
    if (this === firstCard) return;
    clickSound.currentTime = 0;

    clickSound.play();
    this.classList.add("flip");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;

      return;
    }
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.id === secondCard.dataset.id;

  /* It's a ternary operator. It's a shorthand way of writing an if/else statement. */
  isMatch ? disableCards() : unflipCards();
}

let pairsFound = 0;
function disableCards() {
  playerScore += 50;
  playerScoreElement.innerText = playerScore;

  console.log(playerScore);
  setTimeout(() => {
    validPair.play();
  }, 500);
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  pairsFound++;
  if (pairsFound === cards.length / 2) {
    let winModal = document.getElementById("winModal");
    let win = document.getElementById("win");
    let scoreResult = document.getElementById("scoreResult");
    gameMusic.pause();
    console.log("partie terminée");
    // Récupération des données à envoyer
    const data = {
      mod: 1,
      score: playerScore,
    };

    // Configuration de la requête
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Envoi de la requête
    fetch("/score/"+data.mod+"/"+data.score, request)
      .then((response) => {
        console.log("Success:");
      })
      .catch((error) => {
        console.error("Error:");
      });

    setTimeout(() => {
      winModal.style.display = "flex";
      scoreResult.innerText = playerScore + " points !";

      win.play();
    }, 500);
  }
}

function unflipCards() {
  lockBoard = true;
  playerScore -= 20;
  playerScoreElement.innerText = playerScore;
  lifeLeft--;
  let lifeBar = document.getElementById("lifeLeft");
  let hearts = lifeBar.querySelectorAll("i");
  let currentLife = 0;
  hearts.forEach((e) => {
    if (e.style.display != "none") {
      currentLife++;
    }
  });

  if (currentLife > 0) {
    hearts[currentLife - 1].style.display = "none";
  } else if (lifeLeft <= 0) {
    let gameOverModal = document.getElementById("gameOverModal");
    let gameOver = document.getElementById("gameOver");
    gameMusic.pause();
    setTimeout(() => {
      gameOverModal.style.display = "flex";
      gameOver.play();
    }, 500);
    console.log("LOSER !!! ");
  }
  currentLife = 0;

  console.log(playerScore);
  setTimeout(() => {
    loseLife.play();
  }, 400);
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1200);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach((card) => card.addEventListener("click", flipCard));
