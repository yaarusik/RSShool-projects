import { renderAnswers, cleanProgress, timer, interval } from "./quiz";

import {
  pictureInterval,
  renderPictureAnswers,
  cleanPictureProgress,
  timerPicture,
  picturesTimer,
} from "./picturesQuiz";

import {
  timerOn,
  language,
  questionsTimer,
  settingsTimerSelect,
} from "./settings";

export const mainBlock = document.querySelector(".start");
export const settingBlock = document.querySelector(".setting");
const settingClose = document.querySelector(".settings__close");
export const mainSettingBtn = document.querySelectorAll(".main__settings");
const categorySetting = document.querySelectorAll(".category__setting");
export const categoryBlock = document.querySelector(".category__one");
export const categoryPicturesBlock = document.querySelector(".category__two");
export const picturesQuiz = document.querySelectorAll(".main__picture");
const questionsBlock = document.querySelector(".questions");
export const artistQuiz = document.querySelectorAll(".main__author");
const categories = document.querySelectorAll(".down__row");
const questionsClose = document.querySelectorAll(".questions__close");
const menuHomeBtn = document.querySelectorAll(".menu__home");

export const scoreBlock = document.querySelector(".score");
const backCategoriesBtn = document.querySelector(".score__row");
const picturesCategoriesBtn = document.querySelectorAll(".down__pictures");
const pictureQuestionsBlock = document.querySelector(".picture__questions");

const popupClose = document.querySelector(".popup__cancel");
export const popupEnd = document.querySelector(".popup__end");
const popupCancelBtn = document.querySelector(".popup__no");
const popupCategoryBtn = document.querySelectorAll(".popup__yes");

export let eventMemory = false;

const addHide = () => {
  mainBlock.classList.add("hide");
  settingBlock.classList.remove("hide");
};

categorySetting.forEach((item) => {
  item.addEventListener("click", () => {
    categoryPicturesBlock.classList.add("hide");
    categoryBlock.classList.add("hide");
    settingBlock.classList.remove("hide");
  });
});
mainSettingBtn.forEach((item) => {
  item.addEventListener("click", addHide);
});

settingClose.addEventListener("click", () => {
  if (eventMemory === "artist") {
    categoryBlock.classList.remove("hide");
    settingBlock.classList.add("hide");
  } else if (eventMemory === "picture") {
    categoryPicturesBlock.classList.remove("hide");
    settingBlock.classList.add("hide");
  } else {
    mainBlock.classList.remove("hide");
    settingBlock.classList.add("hide");
  }
});

artistQuiz.forEach((item) => {
  item.addEventListener("click", () => {
    eventMemory = "artist";
    mainBlock.classList.add("hide");
    categoryBlock.classList.remove("hide");
    clearInterval(interval);
    clearInterval(pictureInterval);
  });
});

picturesQuiz.forEach((item) => {
  item.addEventListener("click", () => {
    eventMemory = "picture";
    mainBlock.classList.add("hide");
    categoryPicturesBlock.classList.remove("hide");
    clearInterval(interval);
    clearInterval(pictureInterval);
  });
});

categories.forEach((item, index) => {
  item.addEventListener("click", () => {
    categoryBlock.classList.add("hide");
    questionsBlock.classList.remove("hide");
    // в зависимости от категории будет приходить определенный десяток

    renderAnswers(index * 10, index, language);
    timer(timerOn);
  });
});

picturesCategoriesBtn.forEach((item, index) => {
  item.addEventListener("click", () => {
    categoryPicturesBlock.classList.add("hide");
    pictureQuestionsBlock.classList.remove("hide");

    // в зависимости от категории будет приходить определенный десяток

    renderPictureAnswers(index * 10, index, language);
    timerPicture(timerOn);
  });
});

questionsClose.forEach((item) => {
  item.addEventListener("click", () => {
    popupClose.classList.add("active");
    clearInterval(interval);
    clearInterval(pictureInterval);
  });
});

menuHomeBtn.forEach((item) => {
  item.addEventListener("click", () => {
    eventMemory = false;
    categoryBlock.classList.add("hide");
    categoryPicturesBlock.classList.add("hide");
    mainBlock.classList.remove("hide");
  });
});

popupCategoryBtn.forEach((item) => {
  item.addEventListener("click", () => {
    questionsTimer.innerHTML = `00 : ${settingsTimerSelect.value.padStart(
      2,
      "0"
    )}`;
    picturesTimer.innerHTML = `00 : ${settingsTimerSelect.value.padStart(
      2,
      "0"
    )}`;
    if (eventMemory === "artist") {
      questionsBlock.classList.add("hide");
      categoryBlock.classList.remove("hide");
      cleanProgress();
    } else if (eventMemory === "picture") {
      pictureQuestionsBlock.classList.add("hide");
      categoryPicturesBlock.classList.remove("hide");
      cleanPictureProgress();
    }
    clearInterval(interval);
    clearInterval(pictureInterval);
    popupClose.classList.remove("active");
    popupEnd.classList.remove("active");
  });
});

// закрываем popup с предупреждением
popupCancelBtn.addEventListener("click", () => {
  popupClose.classList.remove("active");
  if (eventMemory === "artist") {
    timer("continue");
  } else {
    timerPicture("continue");
  }
});

backCategoriesBtn.addEventListener("click", () => {
  if (eventMemory === "artist") {
    scoreBlock.classList.add("hide");
    categoryBlock.classList.remove("hide");
  } else if (eventMemory === "picture") {
    scoreBlock.classList.add("hide");
    categoryPicturesBlock.classList.remove("hide");
  }
});
