const Keyboard = document.querySelector(".piano__keyboard");
const controls = document.querySelectorAll(".piano__control__option");
// console.log(controls);
// console.log(Keyboard);
let keys = [];
let tempoSelect = document.querySelector(".piano__tempo");
let songSelect = document.querySelector(".piano__song-list");
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
const playBtn = document.querySelector(".piano__play-btn");

const jingleBells = `B3,,B3,,B3,,,,B3,,B3,,B3,,,,
                       B3,,D4,,G3,,A3,B3,,,,,,
                       C4,,C4,,C4,,,,C4,C4,,B3,,B3,,,,
                       B3,B3,B3,,A3,,A3,,B3,,A3,,,,D4`;

const happyBirthday = `G4,G4,A4,,G4,,C5,,B4,,,,
G4,G4,A4,,G4,,D5,,C5,,,,
G4,G4,G5,,E5,,C5,,B4,,A4,,
F5,F5,E5,,C5,,D5,,C5,,,,`;

const playSong = (notesString, tempo, cb) => {
  const notes = notesString.split(",");
  let currentNote = 0;
  let mousedown = new Event("mousedown");
  let mouseup = new Event("mouseup");
  let btn;

  const interval = setInterval(() => {
    if (currentNote < notes.length) {
      if (notes[currentNote].trim() !== "") {
        if (btn) {
          btn.dispatchEvent(mouseup);
        }

        btn = document.querySelector(
          `[data-letter-notes="${notes[currentNote].trim()}"]`
        );
        btn.dispatchEvent(mousedown);
      }

      currentNote++;
    } else {
      btn.dispatchEvent(mouseup);
      clearInterval(interval);
      cb();
    }
  }, 300 / tempo);
};
playBtn.addEventListener("mousedown", () => {
  let tempo = +tempoSelect.value;
  let songNum = +songSelect.value;
  playBtn.disabled = true;
  let enablePlayBtn = () => (playBtn.disabled = false);
  switch (songNum) {
    case 1:
      playSong(jingleBells, tempo, enablePlayBtn);
      break;
    case 2:
      playSong(happyBirthday, tempo, enablePlayBtn);
      break;
  }
});

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

  pressKey("mousedown", e);
});

document.addEventListener("keyup", (e) => {
  pressKey("mouseup", e);
});

const pressKey = (mouseEvent, e) => {
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
    let event = new Event(mouseEvent);
    key.dispatchEvent(event);
  }
};

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
