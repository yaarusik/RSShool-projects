import { getTimeOfDay } from "./calendar";

let body = document.querySelector("body");
let slideNext = document.querySelector(".slide-next");
let slidePrev = document.querySelector(".slide-prev");

let getRundomNum = () => {
  return Math.ceil(Math.random() * 20);
};

let randomNum = getRundomNum();

function setBg(timeOfDay, bgNum) {
  let bgNumber = String(bgNum).padStart(2, "0");

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNumber}.jpg`;

  img.addEventListener("load", () => {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNumber}.jpg')`;
  });
}

function getSlideNext() {
  randomNum++;
  if (randomNum > 20) randomNum = 1;

  setBg(getTimeOfDay(), randomNum);
}

function getSlidePrev() {
  randomNum--;
  if (randomNum < 1) randomNum = 20;

  setBg(getTimeOfDay(), randomNum);
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

setBg(getTimeOfDay(), randomNum);
