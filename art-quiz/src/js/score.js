import {
  scoreBlock,
  mainBlock,
  categoryBlock,
  categoryPicturesBlock,
  eventMemory,
  questionsCount,
} from "./blocksHide";

import { quizByAuthor } from "./quiz";
import { quizByName } from "./picturesQuiz";
import { setLocalStorage } from "./settings";

export const scoreBtn = document.querySelectorAll(".button__score");
const scoreBody = document.querySelector(".score__body");
const resultsNumber = document.querySelectorAll(".down__common");
const localIndicator = document.querySelectorAll(".local__indicator");

let amountBtnQuiz = scoreBtn.length / 2;
let scoreArtistsPages = JSON.parse(localStorage.getItem("artistScore")) || [];
let scorePicturesPages = JSON.parse(localStorage.getItem("pictureScore")) || [];
let scoreButtonIndex = JSON.parse(localStorage.getItem("scoreIndex")) || [];

// показывает скор у сыгранной категории
const scoreBtnShow = (index, answers) => {
  scoreButtonIndex.push({ index: index, results: answers });
  setLocalStorage("scoreIndex", JSON.stringify(scoreButtonIndex));
  scoreBtn[index].classList.add("show");
};

// генерация картинок
const renderPictureBlock = (currentImg, answers, type) => {
  let current = currentImg;
  let htmlString = "";
  let classString;
  let count = 0;
  while (count < questionsCount) {
    if (answers[count] === "1") {
      classString = `class ="add__bg"`;
    } else {
      classString = "";
    }
    if (type === "picture") {
      htmlString += `
                  <div class="picture__one">
                  <img ${classString} src="./images/assets/img/${quizByName[current].imageNum}.jpg" alt="img" />
                <div class="img__row">
                <div class="img__title">
                ${quizByName[current].author}
                </div>
                <div class="img__subtitle">
                ${quizByName[current].name}
                </div>
                <div class="img__year">
                ${quizByName[current].year}
                </div>
                </div>
                        </div>`;
    } else {
      htmlString += `
                  <div class="picture__one">
                  <img ${classString} src="./images/assets/img/${quizByAuthor[current].imageNum}.jpg" alt="img" />
                  <div class="img__row">
                  <div class="img__title">
                  ${quizByAuthor[current].author}
                  </div>
                  <div class="img__subtitle">
                  ${quizByAuthor[current].name}
                  </div>
                  <div class="img__year">
                  ${quizByAuthor[current].year}
                  </div>
                  </div>
                  </div>`;
    }

    current += 1;
    count += 1;
  }

  return htmlString;
};

export const renderScoreBlock = (index, answers, type) => {
  // quizType = type;

  let scoreBlockPage = ` 
   <div class="score__body">
   <div class="score__logo background__size"></div>
   <div class="score__header">
       <div class="score__title">Score</div>
     </div>
     <div class="score__picture">
         ${renderPictureBlock(index * questionsCount, answers, type)}
     </div>
   </div>
`;
  // записываем в объект страницы
  if (type === "picture") {
    scorePicturesPages.push({
      page: scoreBlockPage,
      number: index,
    });
    scoreBtnShow(index + amountBtnQuiz, answers);
    setLocalStorage("pictureScore", JSON.stringify(scorePicturesPages));
  } else {
    scoreArtistsPages.push({
      page: scoreBlockPage,
      number: index,
    });
    scoreBtnShow(index, answers);
    setLocalStorage("artistScore", JSON.stringify(scoreArtistsPages));
  }
};

// генерирует окончательный score
const renderScorePage = (index, type) => {
  let param = index;
  if (type === "picture") {
    // подбиваем кнопку
    param -= amountBtnQuiz;

    let currentPage = scorePicturesPages.filter(
      (item) => item.number === param
    );

    scoreBody.innerHTML = currentPage[currentPage.length - 1].page;
  } else {
    let currentPage = scoreArtistsPages.filter((item) => item.number === index);

    scoreBody.innerHTML = currentPage[currentPage.length - 1].page;
  }
  let decscriptionBtn = document.querySelectorAll(".picture__one");

  decscriptionBtn.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("description__visible");
      item.children[0].classList.toggle("descriptin__img-hidden");
      item.children[1].classList.toggle("description__title-visible");
    });
  });
  const scoreLogoBtn = document.querySelectorAll(".score__logo");
  scoreLogoBtn.forEach((item) => {
    item.addEventListener("click", () => {
      scoreBlock.classList.add("hide");
      mainBlock.classList.remove("hide");
    });
  });
};

// отслеживает номер кнопки и скрытие блоков
scoreBtn.forEach((item, index) => {
  item.addEventListener("click", (event) => {
    event.stopPropagation();
    if (eventMemory === "artist") {
      categoryBlock.classList.add("hide");
      scoreBlock.classList.remove("hide");
    } else if (eventMemory === "picture") {
      categoryPicturesBlock.classList.add("hide");
      scoreBlock.classList.remove("hide");
    }

    renderScorePage(index, eventMemory);
  });
});

window.onload = () => {
  scoreBtn.forEach((btn, i) => {
    scoreButtonIndex.forEach((item) => {
      if (item.index === i) {
        btn.classList.add("show");
        localIndicator[i].classList.add("add__bg");
        let sumResult = item.results.reduce(
          (res, current) => +res + +current,
          0
        );
        resultsNumber[i].innerHTML = `${sumResult} / ${questionsCount}`;
      }
    });
  });
  const scoreLogoBtn = document.querySelectorAll(".score__logo");
  scoreLogoBtn.forEach((item) => {
    item.addEventListener("click", () => {
      scoreBlock.classList.add("hide");
      mainBlock.classList.remove("hide");
    });
  });
};
