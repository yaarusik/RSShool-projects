import { popupEnd } from "./blocksHide";
import { renderScoreBlock } from "./score";

const questionsBlock = document.querySelector(".question__pictures");
const finishResult = document.querySelector(".finish");
// const nextQuestionBtn = document.querySelector(".correct__button");
const popupAnswers = document.querySelector(".popup__correct-up");
const scoreCard = document.querySelectorAll(".down__results");
const categoryBg = document.querySelectorAll(".down__test");

let authorAnswers = new Set();
let pictureAnswers = new Set();

let roundCounter = 0;
let counter;
let cardNumber;
let quizByAuthor = [];
let quizByName = [];
let data;
let buttonsChoose;
let correctMemory = [];
let type = "picture";
// рандом для вариантов ответа авторов
const getRandomInt = (num) => {
  return Math.floor(Math.random() * num);
};

// рандом для массива ответов
const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// разделение данных на 2 типа квиза
const cutData = (data) => {
  quizByAuthor = data.slice(0, data.length / 2);
  quizByName = data.slice(data.length / 2, data.length - 1);
};

//
const renderPopupAnswer = (answer) => {
  popupAnswers.innerHTML = `
  <div class="popup__correct">
            <div class="container">
              <div class="correct__body">
                <div class="correct__img">
                  <div class="correct__logo ${answer} background__size"></div>
                  <img src="./images/assets/img/${quizByName[counter].imageNum}.jpg" alt="img" />
                </div>
                <div class="correct__name">${quizByName[counter].author}</div>
                <div class="correct__author"> ${quizByName[counter].author}, ${quizByName[counter].year}</div>
                <button class="correct__button">Next</button>
              </div>
            </div>
          </div>
  `;
};

// обработчик верного ответа
const chooseHundler = (e) => {
  if (e.target.innerHTML == quizByName[counter].imageNum) {
    e.target.classList.add("correct__answer");
    correctMemory.push("1");
    renderIndicator(counter);
    renderPopupAnswer("yes");
  } else {
    correctMemory.push("0");
    e.target.classList.add("uncorrect__answer");
    renderIndicator(counter);
    renderPopupAnswer("no");
  }
  removeEvents();
};

// удаление слушателей после нажатия на ответ
const removeEvents = () => {
  buttonsChoose.forEach((item) => {
    item.removeEventListener("click", chooseHundler);
  });
};

// получение данных для quiz
export const renderPictureAnswers = async (index, currentBlock) => {
  // запоминаем номер карточки
  if (typeof currentBlock == "number") {
    cardNumber = currentBlock;
  }
  counter = index;

  let response = await fetch(
    "https://raw.githubusercontent.com/yaarusik/image-data/master/images.json"
  );

  data = await response.json();

  cutData(data);

  renderQuestions(index, data);
};

// окончание раунда
const roundEnd = () => {
  let sumResult = correctMemory.reduce((item, current) => +item + +current, 0);

  popupEnd.classList.add("active");
  finishResult.textContent = `${sumResult}`;
  saveResults(sumResult);
};

const saveResults = (result) => {
  scoreCard[cardNumber].innerHTML = `
    ${result} / 10
  `;
};

// для пометки правильных  и неправильных
const renderIndicator = () => {
  const indicatorRound = document.querySelectorAll(".indicators__round");

  correctMemory.forEach((item, index) => {
    if (item == "1") {
      indicatorRound[index].classList.add("correct__answer");
    } else if (item == "0") {
      indicatorRound[index].classList.add("uncorrect__answer");
    }
  });
};

// делегирование
popupAnswers.addEventListener("click", (e) => {
  if (e.target.classList.contains("correct__button")) {
    counter += 1;

    console.log(roundCounter);
    if (roundCounter == 3) {
      roundEnd();
      // отрисовываем score
      renderScoreBlock(cardNumber, correctMemory, type);
      // помечаем карточки
      categoryIndicator();
    } else {
      renderPictureAnswers(counter);
      roundCounter++;
    }
    // убираем блок с правильным ответом
    popupAnswers.innerHTML = "";
  }
});

// cоздаем 4 варианта ответа
const createAnswers = (index, data) => {
  pictureAnswers.add(quizByName[index].imageNum);
  while (pictureAnswers.size < 4) {
    pictureAnswers.add(data[getRandomInt(data.length - 1)].imageNum);
  }

  let pictureArray = [...pictureAnswers];
  pictureArray = shuffle(pictureArray);

  return pictureArray
    .map((item) => {
      return `<div class="pictures__answer">
                  <img src="./images/assets/img/${item}.jpg" alt="img" />
               </div>`;
    })
    .join("");
};

// создание блока с вариантами ответа и фото
const renderQuestions = (index, data) => {
  // создание вариантов ответа для quiz картин

  questionsBlock.innerHTML = `
  <div class="block__indicators">
  <span class="indicators__round"></span>
  <span class="indicators__round"></span>
  <span class="indicators__round"></span>
  <span class="indicators__round"></span>
  <span class="indicators__round"></span>
  <span class="indicators__round"></span>
  <span class="indicators__round"></span>
  <span class="indicators__round"></span>
  <span class="indicators__round"></span>
  <span class="indicators__round"></span>
</div>
<div class="block__variants">
  <div class="variants__body">
    <div class="variants__row pictures__row">
      ${createAnswers(index, data)} 
    </div>
  </div>
</div>
  `;
  // окрашивание предыдущих ответов
  if (index) {
    renderIndicator();
  }

  // очищение set
  pictureAnswers = new Set();

  buttonsChoose = document.querySelectorAll(".pictures__answer");
  // cлушатель событий для созданных кнопок
  buttonsChoose.forEach((item) =>
    item.addEventListener("click", chooseHundler)
  );
};

// удаляем прогресс
export const cleanProgress = () => {
  roundCounter = 0;
  correctMemory = [];
};

const categoryIndicator = () => {
  categoryBg[cardNumber].classList.add("add__bg");
};
