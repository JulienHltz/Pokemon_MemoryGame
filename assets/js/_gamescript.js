// Récupération de l'élément .grid-item
var gridItem = document.querySelectorAll(".grid-item");
	
// Define a variable to store the remaining time (in seconds)
var secondsLeft = 3;

// function to update the countdown + effects
function updateCountdown() {

document.getElementById("countdown").innerText = secondsLeft;

// Decrement the remaining time
secondsLeft--;

// Then, hide the countdown
if (secondsLeft === 0) {
document.getElementById("countdownBlock").style.display = "none";
fliCards()

}
}

// Run the updateCountdown function every second (1000 milliseconds)
alert("Observez bien où sont placés les pokémons, vous devrez ensuite retrouver les paires face cachée !");
setInterval(updateCountdown, 1000);

// Adding animation effects

function fliCards(){

gridItem.forEach(function(card){
card.classList.add('gridAnimation')
let pokeball = card.querySelector('img')
pokeball.style.opacity = "1";
setTimeout(() => {
card.classList.remove('gridAnimation')
  }, 500);
  card.addEventListener('click', () => {
	toogleFlipCard(card, pokeball)})
  card.addEventListener('click', () => {
	toogleUnFlipCard(card, pokeball)})
})
}

function toogleFlipCard(card, pokeball) {
pokeball.style.opacity = "0";
  card.classList.add('gridAnimation')
setTimeout(() => {
		card.classList.remove('gridAnimation')
  	}, 500);	
}

// function toogleUnFlipCard(card, pokeball) {
// pokeball.style.opacity = "1";
//   card.classList.add('gridAnimation')
// setTimeout(() => {
// 		card.classList.remove('gridAnimation')
//   	}, 500);	
// }
