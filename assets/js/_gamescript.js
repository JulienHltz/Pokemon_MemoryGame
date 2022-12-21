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
    setTimeout(() => {
      card.classList.remove("gridAnimation");
    }, 500);
    card.addEventListener("click", () => {
      toogleFlipCard(card, pokeball, pokemonImage);
      clickVerif(cardId, card, pokeball, pokemonImage);
    });
  });
}

function toogleFlipCard(card, pokeball, pokemonImage) {
  // If pokeball is visible
  if (pokeball.style.opacity == "1") {
    // Hide pokeball and display pokemonImage
    pokeball.style.opacity = "0";
    pokemonImage.style.opacity = "1";
  } else {
    // Display pokeball and hide pokemonImage
    pokeball.style.opacity = "1";
    pokemonImage.style.opacity = "0";
  }
  card.classList.add("gridAnimation");
  setTimeout(() => {
    card.classList.remove("gridAnimation");
  }, 500);
}

// Function to flip when the combinaison of id was wrong
function FlipWhenWrong(pokemonClicked, card) {
  if (pokemonClicked[0].id !== pokemonClicked[1].id) {
    pokemonClicked.forEach((element) => {
      const { id, dataCardId } = element;
      /* It's looping through the `gridItem` array and checking if the `cardNumber` is equal to the
      `dataCardId`. If it is, it's displaying the pokeball and hiding the pokemonImage. */
      gridItem.forEach((e) => {
        let cardNumber = e.querySelector("div").getAttribute("data-cardnumber");
        let pokeball = e.querySelector(".pokeball")
        let pokemonImage = e.querySelector(".pokemonImage")
        if (cardNumber === dataCardId) {

            // Display pokeball and hide pokemonImage
            pokeball.style.opacity = "1";
            pokemonImage.style.opacity = "0";
          
          e.classList.add("gridAnimation");
          setTimeout(() => {
            e.classList.remove("gridAnimation");
          }, 500);
        }
      });

    });
  }
}

// Compare click 1 & click 2
let clickNumber = 0;
let pokemonClicked = [];

function clickVerif(id, card, pokeball, pokemonImage) {
  let dataCardId = card.querySelector("div").getAttribute("data-cardnumber");

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
  } else if (
    pokemonClicked.length === 2 &&
    pokemonClicked[0].id !== pokemonClicked[1].id
  ) {
    console.log("pas bon");

    FlipWhenWrong(pokemonClicked, card);
  }


  clickNumber++;
}
