// import images from "./../images/images";

import { popupEnd } from "./blocksHide";
import { renderScoreBlock } from "./score";
import { settingsTimerSelect } from "./settings";
import { questionsTimer } from "./settings";
// const questions = document.querySelector(".questions");
const questionsBlock = document.querySelector(".questions__block");
const finishResult = document.querySelector(".finish");
// const nextQuestionBtn = document.querySelector(".correct__button");
const popupAnswers = document.querySelector(".popup__correct-up");
const scoreCard = document.querySelectorAll(".down__score");
const scoreBlock = document.querySelector(".score");
const categoryBg = document.querySelectorAll(".down__test");

let authorAnswers = new Set();
// let uniqAuthors = new Set();
let roundCounter = 0;
let counter;
let cardNumber;
export let quizByAuthor = [];
let quizByName = [];
let data;
let buttonsChoose;
let correctArtistMemory = [];
export let interval;
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
                  <img src="./images/assets/img/${counter}.jpg" alt="img" />
                </div>
                <div class="correct__name">${quizByAuthor[counter].name}</div>
                <div class="correct__author"> ${quizByAuthor[counter].author}, ${quizByAuthor[counter].year}</div>
                <button class="correct__button">Next</button>
              </div>
            </div>
          </div>
  `;
};

// обработчик верного ответа
const chooseHundler = (e) => {
  if (e.target.innerHTML == quizByAuthor[counter].author) {
    e.target.classList.add("correct__answer");
    correctArtistMemory.push("1");
    renderIndicator(counter);
    renderPopupAnswer("yes");
  } else {
    correctArtistMemory.push("0");
    e.target.classList.add("uncorrect__answer");
    renderIndicator(counter);
    renderPopupAnswer("no");
  }
  clearInterval(interval);
  removeEvents();
};

// удаление слушателей после нажатия на ответ
const removeEvents = () => {
  buttonsChoose.forEach((item) => {
    item.removeEventListener("click", chooseHundler);
  });
};

// получение данных для quiz
export const renderAnswers = async (index, currentBlock) => {
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
  let sumResult = correctArtistMemory.reduce(
    (item, current) => +item + +current,
    0
  );

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
  const indicatorCircle = document.querySelectorAll(".indicators__circle");

  correctArtistMemory.forEach((item, index) => {
    if (item == "1") {
      indicatorCircle[index].classList.add("correct__answer");
    } else if (item == "0") {
      indicatorCircle[index].classList.add("uncorrect__answer");
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
      renderScoreBlock(cardNumber, correctArtistMemory);
      // помечаем карточки
      categoryIndicator();
    } else {
      renderAnswers(counter);
      timer();
      roundCounter++;
    }
    // убираем блок с правильным ответом
    popupAnswers.innerHTML = "";
  }
});

// cоздаем 4 варианта ответа
const createAnswers = (index, data) => {
  authorAnswers.add(quizByAuthor[index].author);
  while (authorAnswers.size < 4) {
    authorAnswers.add(data[getRandomInt(data.length - 1)].author);
  }
  let authorArray = [...authorAnswers];
  authorArray = shuffle(authorArray);

  return authorArray
    .map((item) => {
      return `<div class="variants__answer">${item}</div>`;
    })
    .join("");
};

// создание блока с вариантами ответа и фото
const renderQuestions = (index, data) => {
  // создание вариантов ответа для quiz авторов

  questionsBlock.innerHTML = `
  <div class="questions__block">
  <div class="block__picture">
    <img src="https://raw.githubusercontent.com/yaarusik/image-data/master/img/${index}.jpg" alt="" />
  </div>
  <div class="block__indicators">
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
  </div>
  <div class="block__variants">
    <div class="variants__body">
      <div class="variants__row">
       ${createAnswers(index, data)}
      </div>
    </div>
  </div>
  </div> 
  `;

  // окрашивание предыдущих ответов
  if (index) {
    renderIndicator();
  }

  // очищение set
  authorAnswers = new Set();

  buttonsChoose = document.querySelectorAll(".variants__answer");
  // cлушатель событий для созданных кнопок
  buttonsChoose.forEach((item) =>
    item.addEventListener("click", chooseHundler)
  );
};

// удаляем прогресс
export const cleanProgress = () => {
  roundCounter = 0;
  correctArtistMemory = [];
};

const categoryIndicator = () => {
  categoryBg[cardNumber].classList.add("add__bg");
};

export const timer = () => {
  let count = settingsTimerSelect.value.split(" ")[0];
  interval = setInterval(() => {
    questionsTimer.innerHTML = `00 : ${count}`;

    if (!count) {
      clearInterval(interval);
      correctArtistMemory.push("0");
      renderIndicator(counter);
      renderPopupAnswer("no");
      removeEvents();
    }
    count--;
    console.log(count);
    // document.querySelector
  }, 1000);
};
