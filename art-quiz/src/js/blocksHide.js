import { renderAnswers } from "./quiz";
import { cleanProgress } from "./quiz";
import { renderScoreBlock } from "./score";

const mainBlock = document.querySelector(".start");
const settingBlock = document.querySelector(".setting");
const settingClose = document.querySelector(".settings__close");
const mainSettingBtn = document.querySelector(".main__settings");
const categorySetting = document.querySelector(".category__setting");
export const categoryBlock = document.querySelector(".category");
const questionsBlock = document.querySelector(".questions");
const artistQuiz = document.querySelector(".main__author");
const categories = document.querySelectorAll(".down__row");
const questionsClose = document.querySelector(".questions__close");
const menuHomeBtn = document.querySelector(".menu__home");
const menuScoreBtn = document.querySelector(".menu__score");
export const scoreBlock = document.querySelector(".score");
const backCategoriesBtn = document.querySelector(".score__row");

const popupClose = document.querySelector(".popup__cancel");
export const popupEnd = document.querySelector(".popup__end");
const popupCancelBtn = document.querySelector(".popup__no");
const popupHomeBtn = document.querySelectorAll(".popup__yes");
const popupNextQuizBtn = document.querySelector(".popup__next");

let eventMemory = false;

const addHide = () => {
  mainBlock.classList.add("hide");
  settingBlock.classList.remove("hide");
};

mainSettingBtn.addEventListener("click", addHide);
categorySetting.addEventListener("click", addHide);

settingClose.addEventListener("click", () => {
  if (eventMemory) {
    categoryBlock.classList.remove("hide");
    settingBlock.classList.add("hide");
  } else {
    mainBlock.classList.remove("hide");
    settingBlock.classList.add("hide");
  }
});

artistQuiz.addEventListener("click", function (e) {
  eventMemory = true;
  mainBlock.classList.add("hide");
  categoryBlock.classList.remove("hide");
});

categories.forEach((item, index) => {
  item.addEventListener("click", function () {
    categoryBlock.classList.add("hide");
    questionsBlock.classList.remove("hide");
    // в зависимости от категории будет приходить определенный десяток

    renderAnswers(index * 10, index);
  });
});

questionsClose.addEventListener("click", function () {
  popupClose.classList.add("active");
});

menuHomeBtn.addEventListener("click", function () {
  eventMemory = false;
  categoryBlock.classList.add("hide");
  mainBlock.classList.remove("hide");
});

popupHomeBtn.forEach((item) => {
  item.addEventListener("click", () => {
    popupClose.classList.remove("active");
    questionsBlock.classList.add("hide");
    popupEnd.classList.remove("active");
    categoryBlock.classList.remove("hide");
    cleanProgress();
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
  scoreBlock.classList.add("hide");
  categoryBlock.classList.remove("hide");
});
