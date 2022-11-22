const Keyboard = document.querySelector(".piano__keyboard");
const controls = document.querySelectorAll(".piano__control__option");
// console.log(controls);
// console.log(Keyboard);
let keys = [];
const pianoNotes = ["C", "D", "E", "F", "G", "A", "B"];
const keyboardMap = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
];

const init = () => {
  for (let i = 1; i <= 5; i++) {
    for (let j = 0; j < 7; j++) {
      let key = createkey("white", pianoNotes[j], i);
      key.dataset.keyboard = keyboardMap[j + (i - 1) * 7];
      Keyboard.appendChild(key);

      if (j != 2 && j != 6) {
        key = createkey("black", pianoNotes[j], i);
        key.dataset.keyboard = "⇧+" + keyboardMap[j + (i - 1) * 7];

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
  key.dataset.letterNotes =
    type == "white" ? note + octave : note + "#" + octave;
  key.dataset.letterNoteFileName =
    type == "white" ? note + octave : note + "s" + octave;
  key.textContent = key.dataset.letterNote;
  keys.push(key);
  // console.log(keys.push(key));
  // console.log(key);

  key.addEventListener("mousedown", () => {
    playSound(key);
    key.classList.add("piano__key--playing");
  });
  key.addEventListener("mouseup", () => {
    key.classList.remove("piano__key--playing");
  });
  key.addEventListener("mouseleave", () => {
    key.classList.remove("piano__key--playing");
  });

  return key;
};

document.addEventListener("keydown", (e) => {
  if (e.repeat) {
    return;
  }

  let lastLetter = e.code.substring(e.code.length - 1);
  let isShiftPressed = e.shiftKey;
  // console.log(lastLetter);
  let selector;
  if (isShiftPressed) {
    selector = `[data-keyboard="⇧+${lastLetter}"]`;
  } else {
    selector = `[data-keyboard=${lastLetter}]`;
  }
  // console.log(selector);
  let key = document.querySelector(selector);
  // console.log(key);
  if (key !== null) {
    let mousedown = new Event("mousedown");
    key.dispatchEvent(mousedown);
  }
});

document.addEventListener("keyup", (e) => {
  let lastLetter = e.code.substring(e.code.length - 1);
  let isShiftPressed = e.shiftKey;
  // console.log(lastLetter);
  let selector;
  if (isShiftPressed) {
    selector = `[data-keyboard="⇧+${lastLetter}"]`;
  } else {
    selector = `[data-keyboard=${lastLetter}]`;
  }
  // console.log(selector);
  let key = document.querySelector(selector);
  // console.log(key);
  if (key !== null) {
    let mouseup = new Event("mouseup");
    key.dispatchEvent(mouseup);
  }
});

const playSound = (key) => {
  const audio = document.createElement("audio");
  audio.src = "sounds/" + key.dataset.letterNoteFileName + ".mp3";
  audio.play().then(() => audio.remove);
};

controls.forEach((input) => {
  input.addEventListener("input", () => {
    let value = input.value;

    keys.forEach((key) => {
      key.textContent = key.dataset[value];
    });
  });
});

init();
