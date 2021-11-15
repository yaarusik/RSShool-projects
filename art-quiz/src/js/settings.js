const progress = document.querySelector(".volume__progress");
const muteBtn = document.querySelector(".mute");
const volumeMuteBtn = document.querySelector(".sound__switch");
const timerOnBtn = document.querySelector(".timer__switch");
const soundIndicator = document.querySelector(".sound__indicator");
const timerIndicator = document.querySelector(".timer__indicator");

const audio = new Audio();
let volumeStart = 0.5;

progress.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #00cece 0%, #00cece ${value}%, #e5e5e5 ${value}%, #e5e5e5 100%)`;
});

muteBtn.addEventListener("click", function () {
  volumeMute();
  volume();
});

// ДОБАВИТЬ ИЗМЕНЕНИЕ КНОПКИ
volumeMuteBtn.addEventListener("click", () => {
  volumeMute();
  volume();
  // soundIndicator.classList.toggle("change__indicator");
  //   УБРАТЬ
  // audio.play();
});

timerOnBtn.addEventListener("click", () => {
  timerIndicator.classList.toggle("change__indicator");
});

audio.addEventListener("ended", () => {
  audio.play();
});

function volumeMute() {
  audio.muted = !audio.muted;

  if (audio.muted) {
    soundIndicator.classList.add("change__indicator");
    muteBtn.classList.add("unmute");
  } else {
    soundIndicator.classList.remove("change__indicator");
    muteBtn.classList.remove("unmute");
  }
}
// уменьшение и увеличение громкости
progress.oninput = volumeChange;

function volumeChange(e) {
  let v = this.value;
  if (v == 0) {
    audio.muted = true;
    muteBtn.classList.add("unmute");
    soundIndicator.classList.add("change__indicator");
  } else {
    audio.volume = v / 100;
    soundIndicator.classList.remove("change__indicator");
    muteBtn.classList.remove("unmute");
    audio.muted = false;
  }
  return v;
}

// запоминает значение громкости
function volume() {
  if (audio.muted) {
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
  obj.style.background = `linear-gradient(to right, #00cece 0%, #00cece ${obj.value}%, #e5e5e5 ${obj.value}%, #e5e5e5 100%)`;
}

window.onload = audioPlay;

function audioPlay() {
  audio.src = "./sound/MellenGiRemix_In_The_End.mp3";
  audio.currentTime = 0;
  // audio.play();
}
