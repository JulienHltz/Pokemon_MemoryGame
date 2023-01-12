import { isActive } from './_soundenabled';


let modMemory = document.getElementById('modMemory')
let pikaLoader = document.getElementById("pikaLoader");
let startSound = document.getElementById("startSound");
let startBackground = document.getElementById("background");
let lockedMod = document.getElementsByClassName("lockedMod");

modMemory.addEventListener("click", () => {

    console.log('signal reçu')

    if(isActive()){
      startSound.play();
    }
    pikaLoader.style.display = "block";
    startBackground.classList.add("kenburns2");
    /* Redirecting the user to the sign-in page after x milliseconds. */
    setTimeout(() => {
      window.location.href = "/game/memory";
    }, 1500);
  });


 // locked mod
 for (let i = 0; i < lockedMod.length; i++) {
  lockedMod[i].addEventListener("click", () => {
      lockedMod[i].classList.add("wobble-hor-bottom");
      setTimeout(() => {
          lockedMod[i].classList.remove("wobble-hor-bottom");
      }, 1000);
  });
}



