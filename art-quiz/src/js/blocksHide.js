import { renderAnswers } from "./quiz";
import { cleanProgress } from "./quiz";
import { renderPictureAnswers } from "./picturesQuiz";
import { cleanPictureProgress } from "./picturesQuiz";
import { timer } from "./quiz";
import { interval } from "./quiz";
import { timerOn } from "./settings";

const mainBlock = document.querySelector(".start");
const settingBlock = document.querySelector(".setting");
const settingClose = document.querySelector(".settings__close");
const mainSettingBtn = document.querySelector(".main__settings");
const categorySetting = document.querySelectorAll(".category__setting");
export const categoryBlock = document.querySelector(".category__one");
export const categoryPicturesBlock = document.querySelector(".category__two");
const picturesQuiz = document.querySelector(".main__picture");
const questionsBlock = document.querySelector(".questions");
const artistQuiz = document.querySelector(".main__author");
const categories = document.querySelectorAll(".down__row");
const questionsClose = document.querySelectorAll(".questions__close");
const menuHomeBtn = document.querySelectorAll(".menu__home");
const menuScoreBtn = document.querySelector(".menu__score");
export const scoreBlock = document.querySelector(".score");
const backCategoriesBtn = document.querySelector(".score__row");
const picturesCategoriesBtn = document.querySelectorAll(".down__pictures");
const pictureQuestionsBlock = document.querySelector(".picture__questions");

const popupClose = document.querySelector(".popup__cancel");
export const popupEnd = document.querySelector(".popup__end");
const popupCancelBtn = document.querySelector(".popup__no");
const popupCategoryBtn = document.querySelectorAll(".popup__yes");
const popupNextQuizBtn = document.querySelector(".popup__next");

export let eventMemory = false;

const addHide = () => {
  mainBlock.classList.add("hide");
  settingBlock.classList.remove("hide");
};

mainSettingBtn.addEventListener("click", addHide);
categorySetting.forEach((item) => {
  item.addEventListener("click", addHide);
});

settingClose.addEventListener("click", (e) => {
  if (eventMemory == "artist") {
    categoryBlock.classList.remove("hide");
    settingBlock.classList.add("hide");
  } else if (eventMemory == "picture") {
    categoryPicturesBlock.classList.remove("hide");
    settingBlock.classList.add("hide");
  } else {
    mainBlock.classList.remove("hide");
    settingBlock.classList.add("hide");
  }
});

artistQuiz.addEventListener("click", function (e) {
  eventMemory = "artist";
  mainBlock.classList.add("hide");
  categoryBlock.classList.remove("hide");
});

picturesQuiz.addEventListener("click", function (e) {
  eventMemory = "picture";
  mainBlock.classList.add("hide");
  categoryPicturesBlock.classList.remove("hide");
});

categories.forEach((item, index) => {
  item.addEventListener("click", function () {
    categoryBlock.classList.add("hide");
    questionsBlock.classList.remove("hide");
    // в зависимости от категории будет приходить определенный десяток

    renderAnswers(index * 10, index);
    timer(timerOn);
  });
});

picturesCategoriesBtn.forEach((item, index) => {
  item.addEventListener("click", function () {
    categoryPicturesBlock.classList.add("hide");
    pictureQuestionsBlock.classList.remove("hide");

    // в зависимости от категории будет приходить определенный десяток

    renderPictureAnswers(index * 10, index);
  });
});

questionsClose.forEach((item) => {
  item.addEventListener("click", function () {
    popupClose.classList.add("active");
  });
});

menuHomeBtn.forEach((item) => {
  item.addEventListener("click", function () {
    eventMemory = false;
    categoryBlock.classList.add("hide");
    categoryPicturesBlock.classList.add("hide");
    mainBlock.classList.remove("hide");
  });
});

popupCategoryBtn.forEach((item) => {
  item.addEventListener("click", () => {
    if (eventMemory == "artist") {
      questionsBlock.classList.add("hide");
      categoryBlock.classList.remove("hide");
      cleanProgress();
    } else if (eventMemory == "picture") {
      pictureQuestionsBlock.classList.add("hide");
      categoryPicturesBlock.classList.remove("hide");
      cleanPictureProgress();
    }
    clearInterval(interval);
    popupClose.classList.remove("active");
    popupEnd.classList.remove("active");
  });
});

// закрываем popup с предупреждением
popupCancelBtn.addEventListener("click", () => {
  popupClose.classList.remove("active");
});

menuScoreBtn.addEventListener("click", () => {
  categoryBlock.classList.add("hide");
  resultBlock.classList.remove("hide");
});

backCategoriesBtn.addEventListener("click", () => {
  if (eventMemory == "artist") {
    scoreBlock.classList.add("hide");
    categoryBlock.classList.remove("hide");
  } else if (eventMemory == "picture") {
    scoreBlock.classList.add("hide");
    categoryPicturesBlock.classList.remove("hide");
  }
});
