const cards = document.querySelectorAll('.memory-card');
// Music
let gameMusic = document.getElementById('gameMusic')

// Sound effects
let clickSound = document.getElementById('clickCard')
let loseLife = document.getElementById('loseLife')
let validPair = document.getElementById('validPair')
let lockBoard = false;
// Music Volume
gameMusic.volume = 0.4
clickSound.volume = 0.3

// When the page load
window.onload = function () {
gameMusic.play()

}


// Variables
let gridItem = document.querySelectorAll(".grid-item");
let playerScore = 100;
let lifeLeft = 5
console.log(playerScore)


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
    cards.forEach( card => {
      card.classList.remove('flip')
      lockBoard = false
    })
  }
}

// Run the updateCountdown function every second (1000 milliseconds)
setInterval(updateCountdown, 1000);
let hasFlippedCard = false;

let firstCard, secondCard;

function flipCard() {
  let compteur = document.getElementById("countdownBlock").style.display
  if (compteur  == "none" ) {
      if (lockBoard) return;
  if (this === firstCard) return;
  clickSound.currentTime = 0
  

  clickSound.play()
  this.classList.add('flip');

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
  

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  playerScore += 50
  console.log(playerScore)
  setTimeout(() => {
    validPair.play()
  }, 500);
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  
  lockBoard = true;
  playerScore -= 20
  lifeLeft--
  let lifeBar = document.getElementById('lifeLeft')
  let hearts = lifeBar.querySelectorAll('i')
  let currentLife = 0
  hearts.forEach(e => {
    if(e.style.display != "none") {
      currentLife++
    }
  }) 
  if(currentLife > 0 ){
    hearts[currentLife -1 ].style.display = "none"
  } else if (currentLife <= 0 ) {
    console.log('LOSER !!! ')
    console.log(playerScore)
  }
  currentLife =0
  




  
  console.log(playerScore)
  setTimeout(() => {
  loseLife.play()
  }, 600);
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1200);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard));