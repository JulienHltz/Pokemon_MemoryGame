// Music
let gameMusic = document.getElementById('gameMusic')

// Sound effects
let clickSound = document.getElementById('clickCard')
let loseLife = document.getElementById('loseLife')
let validPair = document.getElementById('validPair')

// Music Volume
gameMusic.volume = 0.4
clickSound.volume = 0.3

// When the page load
window.onload = function () {
gameMusic.play()

}


// Variables
var gridItem = document.querySelectorAll(".grid-item");

// Define a variable to store the remaining time (in seconds)
var secondsLeft = 1;

// function to update the countdown + effects
function updateCountdown() {
  document.getElementById("countdown").innerText = secondsLeft;

  // Decrement the remaining time
  secondsLeft--;

  // Then, hide the countdown
  if (secondsLeft === 0) {
    document.getElementById("countdownBlock").style.display = "none";
    fliCards();
  }
}

// Run the updateCountdown function every second (1000 milliseconds)
setInterval(updateCountdown, 1000);

// Adding animation effects

function fliCards() {
  gridItem.forEach(function (card) {
    card.classList.add("gridAnimation");

    let pokeball = card.querySelector(".pokeball");
    let pokemonImage = card.querySelector(".pokemonImage");
    let cardId = card.querySelector("div").getAttribute("data-id");
    pokemonImage.style.opacity = "0";
    pokeball.style.opacity = "1";
    
    card.addEventListener("click", () => {
      toogleFlipCard(card, pokeball, pokemonImage);
      clickVerif(cardId, card, pokeball, pokemonImage);
    });
  });
}

function toogleFlipCard(card, pokeball, pokemonImage) {
  /* It's checking if the `validPairs` array doesn't include the `dataCardId` and if the `pokeball`
  opacity is equal to `1`. If it is, it's hiding the `pokeball` and displaying the `pokemonImage`.
  If it's not, it's displaying the `pokeball` and hiding the `pokemonImage`. */
  if (!validPairs.includes(card.querySelector("div").dataset.cardnumber)) {
    if (pokeball.style.opacity == "1") {
      // Hide pokeball and display pokemonImage
      pokeball.style.opacity = "0";
      pokemonImage.style.opacity = "1";
    } else {
      // Display pokeball and hide pokemonImage
      pokeball.style.opacity = "1";
      pokemonImage.style.opacity = "0";
    }
    clickSound.currentTime = 0
    clickSound.play()
    card.classList.add("gridAnimation");
    setTimeout(() => {
      card.classList.remove("gridAnimation");
    }, 500);
  }
}

function FlipWhenWrong(pokemonClicked, card) {
  if (pokemonClicked[0].id !== pokemonClicked[1].id) {
    pokemonClicked.forEach((element) => {
      const { id, dataCardId } = element;
      /* It's looping through the `gridItem` array and checking if the `cardNumber` is equal to the
      `dataCardId`. If it is, it's displaying the pokeball and hiding the pokemonImage. */
      gridItem.forEach((e) => {
        let cardNumber = e.querySelector("div").getAttribute("data-cardnumber");
        let pokeball = e.querySelector(".pokeball");
        let pokemonImage = e.querySelector(".pokemonImage");
        if (cardNumber === dataCardId) {
          // Display pokeball and hide pokemonImage
          pokeball.style.opacity = "1";
          pokemonImage.style.opacity = "0";
          if (!validPairs.includes(e.querySelector("div").dataset.cardnumber)) {
            e.classList.add("gridAnimation");
            setTimeout(() => {
              e.classList.remove("gridAnimation");
            }, 500);
          }
        }
      });
    });
  }
}

/* It's defining the variables. */
let clickNumber = 0;
let pokemonClicked = [];
let validPairs = [];
let playerScore = 0;
let pairsFound = 0;

// Disable Cards
let disableCards = false;
document.addEventListener("click", disableCardsFn, true);
console.log(disableCards)

function disableCardsFn(){
  if(disableCards) {
    e.stopPropagation();
    e.preventDefault();
  }
}

function disableClicksFor5s() {
  disableCards = true;
  setTimeout(() => {
    disableCards = false;
  }, 5000);
}







// to disappear faHeart
// let lifeBlock = document.getElementById('lifeLeft')
// let heartFa = lifeBlock.querySelector('i')

// console.log(playerScore)


function clickVerif(id, card, pokeball, pokemonImage) {
  let dataCardId = card.querySelector("div").getAttribute("data-cardnumber");
  if (!validPairs.includes(card.querySelector("div").dataset.cardnumber)) {
    if (clickNumber < 2) {
      /* It's pushing a new array to the array `pokemonClicked`. */
      pokemonClicked.push({ id, dataCardId });
    } else {
      clickNumber = 0;
      pokemonClicked = [];
      pokemonClicked.push({ id, dataCardId });
    }

    if (clickNumber === 1 && pokemonClicked[0].id === pokemonClicked[1].id) {
      console.log("ok");
      playerScore += 50
      console.log(playerScore)

      setTimeout(() => {
        validPair.play()
      }, 500);
      pokemonClicked.forEach((element) => {
        validPairs.push(element.dataCardId);
      });
      clickNumber++;
      return true;
    } else if (
      pokemonClicked.length === 2 &&
      pokemonClicked[0].id !== pokemonClicked[1].id
    ) {
      console.log("pas bon");
      playerScore -= 20
      console.log(playerScore)
      
      /* It's playing the `loseLife` sound effect and then, after 1 second, it's flipping the cards. */
      // lifeBlock.removeChild(heartFa)
      setTimeout(() => {
        disableCards = true
        loseLife.play()
        setTimeout(() => {
          console.log(disableCards)
          FlipWhenWrong(pokemonClicked, card)
          disableCards = false
          console.log(disableCards)
        }, 1000);
        }, 600);
      
    }
    clickNumber++;
  }
}
