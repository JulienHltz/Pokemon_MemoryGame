// Variables
var gridItem = document.querySelectorAll(".grid-item");

// Define a variable to store the remaining time (in seconds)
var secondsLeft = 25;

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
    pokemonImage.style.opacity = "0";
    pokeball.style.opacity = "1";
    setTimeout(() => {
      card.classList.remove("gridAnimation");
    }, 500);
    card.addEventListener("click", () => {
      toogleFlipCard(card, pokeball, pokemonImage);
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




