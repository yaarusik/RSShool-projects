import { scoreBlock } from "./blocksHide";
import { categoryBlock } from "./blocksHide";
import { quizByAuthor } from "./quiz";
import { quizByName } from "./quiz";

const scoreBody = document.querySelector(".score__body");
const scoreBtn = document.querySelectorAll(".button__score");
let amountBtnQuiz = scoreBtn.length / 2;
let scoreArtistsPages = [];
let scorePicturesPages = [];

export const renderScoreBlock = (index, answers, type) => {
  let scoreBlock = ` 
   <div class="score__body">
   <div class="score__logo background__size"></div>
   <div class="score__header">
       <div class="score__title">Score</div>
     </div>
     <div class="score__picture">
         ${renderPictureBlock(index * 10, answers, type)}
     </div>
   </div>
`;
  // записываем в объект страницы
  if (type == "picture") {
    scorePicturesPages.push({ page: scoreBlock, number: index });
    scoreBtnShow(index + amountBtnQuiz);
  } else {
    scoreArtistsPages.push({ page: scoreBlock, number: index });
    scoreBtnShow(index);
  }
  console.log(scorePicturesPages);
  console.log(scoreArtistsPages);
};

// генерация картинок
const renderPictureBlock = (currentImg, answers, type) => {
  console.log("чичло" + currentImg);
  let htmlString = "";
  let classString;
  let count = 0;
  while (count < 10) {
    if (answers[count] == "1") {
      classString = `class ="add__bg"`;
    } else {
      classString = "";
    }
    if (type == "picture") {
      htmlString += `
                     <div class="picture__one">
                  <img ${classString} src="./images/assets/img/${quizByName[currentImg].imageNum}.jpg" alt="img" />
                        </div>`;
    } else {
      htmlString += `
                     <div class="picture__one">
                  <img ${classString} src="./images/assets/img/${quizByAuthor[currentImg].imageNum}.jpg" alt="img" />
                        </div>`;
    }

    currentImg++;
    count++;
  }

  return htmlString;
};

// показывает скор у сыгранной категории
const scoreBtnShow = (index) => {
  scoreBtn[index].classList.add("show");
};

// отслеживает номер кнопки и скрытие блоков
scoreBtn.forEach((item, index) => {
  item.addEventListener("click", (event) => {
    event.stopPropagation();
    categoryBlock.classList.add("hide");
    scoreBlock.classList.remove("hide");
    console.log("index" + index);
    renderScorePage(index);
  });
});

// генерирует окончательный score
const renderScorePage = (index) => {
  let currentPage = scoreArtistsPages.filter((item, i) => item.number == index);
  console.log(currentPage);
  scoreBody.innerHTML = currentPage[currentPage.length - 1].page;
};
