import { artistQuiz } from "./blocksHide";
import { picturesQuiz } from "./blocksHide";
import { mainSettingBtn } from "./blocksHide";

const settingsTitle = document.querySelector(".settings__title");
const languageTitle = document.querySelector(".language__title");
const soundTitle = document.querySelector(".sound__title");
const timerTitle = document.querySelector(".timer__title");
const timeTitle = document.querySelector(".time__title");
const saveTitle = document.querySelector(".text__size");
const progress = document.querySelector(".volume__progress");
const muteBtn = document.querySelector(".mute");
const buttonSave = document.querySelector(".button__save");
const volumeMuteBtn = document.querySelector(".sound__switch");
const timerOnBtn = document.querySelector(".timer__switch");
const soundIndicator = document.querySelector(".sound__indicator");
const timerIndicator = document.querySelector(".timer__indicator");
const languageIndicator = document.querySelector(".language__indicator");
const languageBtn = document.querySelector(".language__switch");
const categoryTitle = document.querySelectorAll(".category__title");
const categoriesSubtitle = document.querySelectorAll(".down__title");
const footerDeveloper = document.querySelectorAll(".footer__author");
const menuTitle = document.querySelectorAll(".menu__text");
const questionTitle = document.querySelectorAll(".questions__title");
const popupTitle = document.querySelector(".popup__title");
const popupClose = document.querySelector(".popup__close");
const popupHome = document.querySelector(".popup__home");
export const settingsTimerSelect = document.querySelector(".settings__select");
export const questionsTimer = document.querySelector(".questions__timer");
let language = "en";

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

export const setLocalStorage = (vatiable, variableValue) => {
  localStorage.setItem(`${vatiable}`, variableValue);
};

export let timerOn = localStorage.getItem("timerStatus") || "on";
export let volumeOn = localStorage.getItem("volumeStatus") || "on";
// console.log(volumeOn);

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

languageBtn.addEventListener("click", () => {
  if (languageIndicator.classList.contains("change__indicator")) {
    language = "en";
  } else {
    language = "ru";
  }
  changeLanguage(language);
  languageIndicator.classList.toggle("change__indicator");
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
  // console.log(audioEffects.volume);
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
  // console.log(obj.value);
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
    // console.log(timerOn);
  } else {
    timerOn = "on";
    let count = settingsTimerSelect.value;
    questionsTimer.innerHTML = `00 : ${count}`;
    // console.log(timerOn);
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
// language section =======================
const changeLanguage = (lang) => {
  if (lang == "en") {
    artistQuiz.textContent = englishParams[0];
    picturesQuiz.textContent = englishParams[1];
    mainSettingBtn.textContent = englishParams[2];

    settingsTitle.textContent = englishParams[2];
    languageTitle.textContent = englishParams[3];
    soundTitle.textContent = englishParams[4];
    timerTitle.textContent = englishParams[5];
    timeTitle.textContent = englishParams[6];
    saveTitle.textContent = englishParams[8];
    footerDeveloper.forEach((item) => (item.textContent = englishParams[9]));
    categoryTitle.forEach((item) => (item.textContent = englishParams[10]));
    categoriesSubtitle.forEach(
      (item) => (item.textContent = englishParams[11] + `${index}`)
    );
    menuTitle.forEach((item) => (item.textContent = englishParams[12]));
    questionTitle[0].textContent = englishParams[13];
    questionTitle[1].textContent =
      englishParams[14] + `<span class="change__title"></span`;
    popupTitle.textContent = englishParams[15];
    popupHome.textContent = englishParams[16];
    popupClose.textContent = englishParams[17];
  } else {
    artistQuiz.textContent = russianParams[0];
    picturesQuiz.textContent = russianParams[1];
    mainSettingBtn.textContent = russianParams[2];
    settingsTitle.textContent = russianParams[2];
    languageTitle.textContent = russianParams[3];
    soundTitle.textContent = russianParams[4];
    timerTitle.textContent = russianParams[5];
    timeTitle.textContent = russianParams[6];
    saveTitle.textContent = russianParams[8];
    footerDeveloper.forEach((item) => (item.textContent = russianParams[9]));
    categoryTitle.forEach((item) => (item.textContent = russianParams[10]));
    categoriesSubtitle.forEach(
      (item, index) => (item.textContent = russianParams[11] + ` ${index}`)
    );
    menuTitle.forEach((item) => (item.textContent = russianParams[12]));
    questionTitle[0].textContent = russianParams[13];
    questionTitle[1].textContent =
      russianParams[14] + `<span class="change__title"></span`;
    popupTitle.textContent = russianParams[15];
    popupHome.textContent = russianParams[16];
    popupClose.textContent = russianParams[17];
  }
};

let englishParams = [
  "ARTIST QUIZ",
  "PICTURES QUIZ",
  "SETTINGS",
  "LANGUAGE",
  "VOLUME",
  "TIMER GAME",
  "TIME TO ANSWER",
  "sec",
  "SAVE",
  "Developer: Ruslan Vildanov",
  "CATEGORIES",
  "ROUND",
  "HOME",
  "Who is the author of this picture?",
  "Which of these paintings did Oliver paint",
  "Are you sure you want to complete the test?",
  "Yes",
  "Cancel",
];

let russianParams = [
  "Квиз по художникам",
  "КВИЗ ПО КАРТИНАМ",
  "НАСТРОЙКИ",
  "ЯЗЫК",
  "ГРОМКОСТЬ",
  "ИГРА НА ВРЕМЯ",
  "ВРЕМЯ НА ВОПРОС",
  "сек",
  "Сохранить",
  "Разработчик: Руслан Вильданов",
  "Категории",
  "Раунд",
  "Домой",
  "Кто автор этой картины?",
  "Какую из этих картин написал ",
  "Вы уверены, что хотите завершить тест",
  "Да",
  "Отмена",
];
