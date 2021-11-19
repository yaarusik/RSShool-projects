import { scoreBlock } from "./blocksHide";
import { categoryBlock } from "./blocksHide";
import { categoryPicturesBlock } from "./blocksHide";
import { quizByAuthor } from "./quiz";
import { quizByName } from "./picturesQuiz";
import { eventMemory } from "./blocksHide";

const scoreBody = document.querySelector(".score__body");
const scoreBtn = document.querySelectorAll(".button__score");
let amountBtnQuiz = scoreBtn.length / 2;
console.log(amountBtnQuiz);
let scoreArtistsPages = [];
let scorePicturesPages = [];
let quizType;
export const renderScoreBlock = (index, answers, type) => {
  console.log(quizByAuthor);
  console.log(quizByName);
  quizType = type;
  console.log("index" + index);
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
  console.log("кртинка номер" + currentImg);
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
      console.log(htmlString);
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
    if (eventMemory == "artist") {
      categoryBlock.classList.add("hide");
      scoreBlock.classList.remove("hide");
    } else if (eventMemory == "picture") {
      categoryPicturesBlock.classList.add("hide");
      scoreBlock.classList.remove("hide");
    }

    renderScorePage(index, quizType);
  });
});

// генерирует окончательный score
const renderScorePage = (index, type) => {
  if (type == "picture") {
    // подбиваем кнопку
    index -= amountBtnQuiz;
    console.log("d" + index);
    let currentPage = scorePicturesPages.filter(
      (item, i) => item.number == index
    );
    console.log(currentPage);
    scoreBody.innerHTML = currentPage[currentPage.length - 1].page;
  } else {
    let currentPage = scoreArtistsPages.filter(
      (item, i) => item.number == index
    );
    console.log(currentPage);
    scoreBody.innerHTML = currentPage[currentPage.length - 1].page;
  }
};
