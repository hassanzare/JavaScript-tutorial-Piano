const Keyboard = document.querySelector(".piano__keyboard");
const pianoNotes = ["C", "D", "E", "F", "G", "A", "B"];

const init = () => {
  for (let i = 1; i <= 5; i++) {
    for (let j = 0; j < 7; j++) {
      let key = createkey("white", pianoNotes[j], i);
      Keyboard.appendChild(key);

      if (j != 2 && j != 6) {
        key = createkey("black", pianoNotes[j], i);
        let emptySpace = document.createElement("div");
        emptySpace.className = "empty-space";
        emptySpace.appendChild(key);
        Keyboard.appendChild(emptySpace);
      }
    }
  }
};

const createkey = (type, note, octave) => {
  const key = document.createElement("button");
  key.className = `piano__key piano__key--${type}`;
  key.dataset.letterNote =
    type == "white" ? note + octave : note + "#" + octave;
  key.dataset.letterNoteFileName =
    type == "white" ? note + octave : note + "s" + octave;
  key.textContent = key.dataset.letterNote;

  key.addEventListener("mousedown", () => {
    playSound(key);
    key.classList.add("piano__key--playing");
  });
  key.addEventListener("mouseup", () => {
    key.classList.remove("piano__key--playing");
  });

  return key;
};

const playSound = (key) => {
  const audio = document.createElement("audio");
  audio.src = "sounds/" + key.dataset.letterNoteFileName + ".mp3";
  audio.play().then(() => audio.remove);
};

init();
