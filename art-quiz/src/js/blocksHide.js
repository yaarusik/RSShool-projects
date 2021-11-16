import { renderAnswers } from "./quiz";
import { cleanProgress } from "./quiz";
const mainBlock = document.querySelector(".start");
const settingBlock = document.querySelector(".setting");
const settingClose = document.querySelector(".settings__close");
const mainSettingBtn = document.querySelector(".main__settings");
const categorySetting = document.querySelector(".category__setting");
const categoryBlock = document.querySelector(".category");
const questionsBlock = document.querySelector(".questions");
const artistQuiz = document.querySelector(".main__author");
const categories = document.querySelectorAll(".down__row");
const questionsClose = document.querySelector(".questions__close");
const menuHomeBtn = document.querySelector(".menu__home");

const popupClose = document.querySelector(".popup__cancel");
export const popupEnd = document.querySelector(".popup__end");
const popupCancelBtn = document.querySelector(".popup__no");
const popupHomeBtn = document.querySelectorAll(".popup__yes");
const popupNextQuizBtn = document.querySelector(".popup__next");

let eventMemory = false;

// buttons.forEach((item) => {
//   item.addEventListener("click", (e) => {
//     hideBlocks(item);
//   });
// });

const hideBlocks = (block) => {
  console.log(block.classList[0]);
};

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
    console.log(index * 10);
    renderAnswers(index * 10);
  });
});

questionsClose.addEventListener("click", function () {
  popupClose.classList.add("active");
  // categoryBlock.classList.remove("hide");
  // questionsBlock.classList.add("hide");
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
    mainBlock.classList.remove("hide");
    cleanProgress();
  });
});

// закрываем popup с предупреждением
popupCancelBtn.addEventListener("click", () => {
  popupClose.classList.remove("active");
});
