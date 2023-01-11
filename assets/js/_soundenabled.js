//  Active sound

export function setSound(state) {
  localStorage.setItem("soundEnabled", JSON.stringify(state));
}

// Check if sound is enabled

export function getSoundOnLocalStorage() {
  return JSON.parse(localStorage.getItem("soundEnabled"));
}

export function isActive() {
  return getSoundOnLocalStorage() == true;
}

export function disableAllSounds() {
  // Variable all audio elements
  let audioElements = document.querySelectorAll("audio");

  // Conditions for sound activation
  if (!isActive()) {
    for (let i = 0; i < audioElements.length; i++) {
      audioElements[i].pause();
    }
  }
}
