const progress = document.querySelector(".volume__progress");
const muteBtn = document.querySelector(".mute");
const buttonSave = document.querySelector(".button__save");
const volumeMuteBtn = document.querySelector(".sound__switch");
const timerOnBtn = document.querySelector(".timer__switch");
const soundIndicator = document.querySelector(".sound__indicator");
const timerIndicator = document.querySelector(".timer__indicator");
export const settingsTimerSelect = document.querySelector(".settings__select");
export const questionsTimer = document.querySelector(".questions__timer");

let musicEffects = {
  right: "./sound/correct.mp3",
  wrong: "./sound/uncorrect.mp3",
  end: "./sound/end.mp3",
};

let audioEffects = new Audio();
export const rigthAnswer = () => {
  audioEffects.src = musicEffects.right;
};

export const wrongAnswer = () => {
  audioEffects.src = musicEffects.wrong;
};

export const endGame = () => {
  audioEffects.src = musicEffects.end;
};

export const playAudio = () => {
  audioEffects.play();
};

const setLocalStorage = (vatiable, variableValue) => {
  localStorage.setItem(`${vatiable}`, variableValue);
};

export let timerOn = localStorage.getItem("timerStatus") || "on";
export let volumeOn = localStorage.getItem("volumeStatus") || "on";
console.log(volumeOn);

progress.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #00cece 0%, #00cece ${value}%, #e5e5e5 ${value}%, #e5e5e5 100%)`;
});

const volumeSet = () => {
  volumeMute();
  volume();
};

muteBtn.addEventListener("click", volumeSet);

// ДОБАВИТЬ ИЗМЕНЕНИЕ КНОПКИ
volumeMuteBtn.addEventListener("click", volumeSet);

// volumeSet();

timerOnBtn.addEventListener("click", () => {
  if (timerIndicator.classList.contains("change__indicator")) {
    settingsTimerSelect.disabled = false;
  } else {
    settingsTimerSelect.disabled = true;
  }
  timerIndicator.classList.toggle("change__indicator");
});

function volumeMute() {
  audioEffects.muted = !audioEffects.muted;

  if (audioEffects.muted) {
    volumeOn = "off";
    soundIndicator.classList.add("change__indicator");
    muteBtn.classList.add("unmute");
  } else {
    volumeOn = "on";
    soundIndicator.classList.remove("change__indicator");
    muteBtn.classList.remove("unmute");
  }
}
// уменьшение и увеличение громкости
progress.oninput = volumeChange;

function volumeChange(e) {
  let v = this.value;
  if (v == 0) {
    volumeOn = "off";
    audioEffects.muted = true;
    muteBtn.classList.add("unmute");
    soundIndicator.classList.add("change__indicator");
  } else {
    volumeOn = "on";
    audioEffects.volume = v / 100;
    soundIndicator.classList.remove("change__indicator");
    muteBtn.classList.remove("unmute");
    audioEffects.muted = false;
  }

  setLocalStorage("volumeValue", audioEffects.volume);
  console.log(audioEffects.volume);
  return v;
}

// запоминает значение громкости
function volume() {
  if (audioEffects.muted) {
    //передаем кнопке звука значение прогрессбара
    muteBtn.setAttribute("data-volume", progress.value);
    muteBtn.classList.add("unmute");
    progress.value = 0;
    tracking(progress);
  } else {
    progress.value = muteBtn.dataset.volume;
    muteBtn.classList.remove("unmute");

    tracking(progress);
  }
}

function tracking(obj) {
  console.log(obj.value);
  obj.style.background = `linear-gradient(to right, #00cece 0%, #00cece ${obj.value}%, #e5e5e5 ${obj.value}%, #e5e5e5 100%)`;
}

// window.onload = audioEffectsPlay;

// function audioEffectsPlay() {
//   audioEffects.src = "./sound/MellenGiRemix_In_The_End.mp3";
//   audioEffects.currentTime = 0;
//   // audioEffects.play();
// }

// // progressBar
// const updateProgress = (e) => {
//   const { duration, currentTime } = e.srcElement;
//   const progressPersent = (currentTime / duration) * 100;
//   progressBar.style.width = `${progressPersent}%`;

//   progressDuration.textContent = timeFormat(currentTime);
// };

//TIMER SECTION================================
// начальное положение ползунка и значение таймера
if (timerOn == "off") {
  timerIndicator.classList.add("change__indicator");
  settingsTimerSelect.disabled = true;
  questionsTimer.innerHTML = ``;
} else {
  timerIndicator.classList.remove("change__indicator");
  settingsTimerSelect.disabled = false;
  questionsTimer.innerHTML = `00 : ${settingsTimerSelect.value.padStart(
    2,
    "0"
  )}`;
}

// сохранение настроек таймера
const settingsSave = () => {
  if (settingsTimerSelect.disabled == true) {
    timerOn = "off";

    questionsTimer.innerHTML = ``;
    console.log(timerOn);
  } else {
    timerOn = "on";
    let count = settingsTimerSelect.value;
    questionsTimer.innerHTML = `00 : ${count}`;
    console.log(timerOn);
  }
  if (volumeOn == "off") {
    audioEffects.volume = 0;
  } else {
    audioEffects.volume = localStorage.getItem("volumeValue") || 0.4;
  }
  setLocalStorage("volumeValue", audioEffects.volume);
  setLocalStorage("volumeStatus", volumeOn);
  setLocalStorage("timerStatus", timerOn);
};

buttonSave.addEventListener("click", settingsSave);

// VOLUME SECTION=========================================

// отслеживание значений нстроек
if (volumeOn == "off") {
  audioEffects.volume = 0;
  audioEffects.muted = true;
  muteBtn.classList.add("unmute");
  soundIndicator.classList.add("change__indicator");
  progress.value = 0;
  tracking(progress);
} else {
  audioEffects.volume = localStorage.getItem("volumeValue") || 1;
  audioEffects.muted = false;
  muteBtn.classList.remove("unmute");
  soundIndicator.classList.remove("change__indicator");
  progress.value = localStorage.getItem("volumeValue") * 100 || 40;
  tracking(progress);
}
