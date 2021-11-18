import { renderAnswers } from "./quiz";
import { cleanProgress } from "./quiz";
import { renderScoreBlock } from "./score";
import { renderPictureAnswers } from "./picturesQuiz";

const mainBlock = document.querySelector(".start");
const settingBlock = document.querySelector(".setting");
const settingClose = document.querySelector(".settings__close");
const mainSettingBtn = document.querySelector(".main__settings");
const categorySetting = document.querySelectorAll(".category__setting");
export const categoryBlock = document.querySelector(".category__one");
const categoryPicturesBlock = document.querySelector(".category__two");
const picturesQuiz = document.querySelector(".main__picture");
const questionsBlock = document.querySelector(".questions");
const artistQuiz = document.querySelector(".main__author");
const categories = document.querySelectorAll(".down__row");
const questionsClose = document.querySelector(".questions__close");
const menuHomeBtn = document.querySelectorAll(".menu__home");
const menuScoreBtn = document.querySelector(".menu__score");
export const scoreBlock = document.querySelector(".score");
const backCategoriesBtn = document.querySelector(".score__row");
const picturesCategoriesBtn = document.querySelectorAll(".down__pictures");
const pictureQuestionsBlock = document.querySelector(".picture__questions");

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
categorySetting.forEach((item) => {
  item.addEventListener("click", addHide);
});

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

picturesQuiz.addEventListener("click", function (e) {
  eventMemory = true;
  mainBlock.classList.add("hide");
  categoryPicturesBlock.classList.remove("hide");
});

categories.forEach((item, index) => {
  item.addEventListener("click", function () {
    let type = "artists";
    categoryBlock.classList.add("hide");
    questionsBlock.classList.remove("hide");
    // в зависимости от категории будет приходить определенный десяток

    renderAnswers(index * 10, index);
  });
});

picturesCategoriesBtn.forEach((item, index) => {
  item.addEventListener("click", function () {
    categoryPicturesBlock.classList.add("hide");
    pictureQuestionsBlock.classList.remove("hide");
    let type = "pictures";
    // в зависимости от категории будет приходить определенный десяток

    renderPictureAnswers(index * 10, index);
  });
});

questionsClose.addEventListener("click", function () {
  popupClose.classList.add("active");
});

menuHomeBtn.forEach((item) => {
  item.addEventListener("click", function () {
    eventMemory = false;
    categoryBlock.classList.add("hide");
    categoryPicturesBlock.classList.add("hide");
    mainBlock.classList.remove("hide");
  });
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
