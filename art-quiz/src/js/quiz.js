// import images from "./../images/images";

import { popupEnd, questionsCount } from "./blocksHide";
import { renderScoreBlock } from "./score";
import {
  settingsTimerSelect,
  timerOn,
  questionsTimer,
  rigthAnswer,
  wrongAnswer,
  endGame,
  playAudio,
  gameCenter,
  gameOver,
  language,
} from "./settings";
import { shuffle, getRandomInt } from "./picturesQuiz";
export let quizByAuthor = [];
export let interval;

const questionsBlock = document.querySelector(".questions__block");
const finishResult = document.querySelector(".finish");
const popupAnswers = document.querySelector(".popup__correct-up");
const scoreCard = document.querySelectorAll(".down__score");
const categoryBg = document.querySelectorAll(".down__test");
const finishTitle = document.querySelector(".end__title");

let authorAnswers = new Set();
let roundCounter = 0;
let counter;
let cardNumber;
let data;
let buttonsChoose;
let correctArtistMemory = [];
let timerCount;

// рандом для вариантов ответа авторов
// const getRandomInt = (num) => {
//   return Math.floor(Math.random() * num);
// };

// рандом для массива ответов
// const shuffle = (array) => {
//   return array.sort(() => Math.random() - 0.5);
// };

// для пометки правильных  и неправильных
const renderIndicator = () => {
  const indicatorCircle = document.querySelectorAll(".indicators__circle");

  correctArtistMemory.forEach((item, index) => {
    if (item === "1") {
      indicatorCircle[index].classList.add("correct__answer");
    } else if (item === "0") {
      indicatorCircle[index].classList.add("uncorrect__answer");
    }
  });
};

// разделение данных на 2 типа квиза
const cutData = () => {
  quizByAuthor = data.slice(0, data.length / 2);
};

//
const renderPopupAnswer = (answer) => {
  popupAnswers.innerHTML = `
  <div class="popup__correct opacity__img" onload="this.style.opacity='1'"">
            <div class="container">
              <div class="correct__body">
                <div class="correct__img">
                  <div class="correct__logo ${answer} background__size"></div>
                  <img class="opacity__img" onload="this.style.opacity='1'" src="./images/assets/img/${counter}.jpg" alt="img" />
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
  if (e.target.innerHTML === quizByAuthor[counter].author) {
    e.target.classList.add("correct__answer");
    correctArtistMemory.push("1");
    renderIndicator(counter);
    renderPopupAnswer("yes");
    rigthAnswer();
  } else {
    correctArtistMemory.push("0");
    e.target.classList.add("uncorrect__answer");
    renderIndicator(counter);
    renderPopupAnswer("no");
    wrongAnswer();
  }
  playAudio();
  clearInterval(interval);
  // removeEvents();
};

// удаление слушателей после нажатия на ответ
// const removeEvents = () => {
//   buttonsChoose.forEach((item) => {
//     item.removeEventListener("click", chooseHundler);
//   });
// };

// cоздаем 4 варианта ответа
const createAnswers = (index) => {
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
const renderQuestions = (index) => {
  // создание вариантов ответа для quiz авторов

  questionsBlock.innerHTML = `
  <div class="questions__block opacity__img" onload="this.style.opacity='1'">
  <div class="block__picture">
    <img class="opacity__img" onload="this.style.opacity='1'" src="https://raw.githubusercontent.com/yaarusik/image-data/master/img/${index}.jpg" alt="" />
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

const timerSet = () => {
  interval = setInterval(() => {
    if (+timerCount < 11) {
      questionsTimer.innerHTML = `00 : 0${timerCount - 1}`;
    } else {
      questionsTimer.innerHTML = `00 : ${timerCount - 1}`;
    }
    timerCount -= 1;
    if (!timerCount) {
      clearInterval(interval);
      correctArtistMemory.push("0");
      renderIndicator(counter);
      renderPopupAnswer("no");
      // removeEvents();
      wrongAnswer();
      playAudio();
    }
  }, 1000);
};

export const timer = (timerStatus) => {
  if (timerStatus === "on") {
    timerCount = settingsTimerSelect.value.padStart(2, "0");
    timerSet();
  } else if (timerStatus === "continue") {
    timerSet();
  } else {
    questionsTimer.innerHTML = "";
  }
};

// получение данных для quiz
export const renderAnswers = async (index, currentBlock, lang) => {
  // запоминаем номер карточки
  if (typeof currentBlock === "number") {
    cardNumber = currentBlock;
  }
  counter = index;
  let response;
  if (lang === "en") {
    response = await fetch(
      "https://raw.githubusercontent.com/yaarusik/image-data/master/imagesEn.json"
    );
  } else {
    response = await fetch(
      "https://raw.githubusercontent.com/yaarusik/image-data/master/images.json"
    );
  }

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

  const saveResults = (result) => {
    scoreCard[cardNumber].innerHTML = `
      ${result} / ${questionsCount}
    `;
  };

  popupEnd.classList.add("active");
  if (language === "ru") {
    if (sumResult <= 3) {
      finishTitle.textContent = "Ты можешь лучше :)";
      gameOver();
    } else if (sumResult > 3 && sumResult <= 7) {
      finishTitle.textContent = "У тебя хороший уровень!";
      gameCenter();
    } else if (sumResult > 7) {
      finishTitle.textContent = "Поздравляю! Ты выйграл :)";
      endGame();
    }
  } else if (sumResult <= 3) {
    finishTitle.textContent = "You can better :)";
    gameOver();
  } else if (sumResult > 3 && sumResult <= 7) {
    finishTitle.textContent = "You have a good level!";
    gameCenter();
  } else if (sumResult > 7) {
    endGame();
    finishTitle.textContent = "Congratulations! You won :)";
  }
  finishResult.textContent = `${sumResult}`;
  // сохраняем результаты

  // ==================================
  saveResults(sumResult);
};

const categoryIndicator = () => {
  categoryBg[cardNumber].classList.add("add__bg");
};

// делегирование
popupAnswers.addEventListener("click", (e) => {
  if (e.target.classList.contains("correct__button")) {
    counter += 1;

    if (roundCounter === 9) {
      roundEnd();
      // отрисовываем score
      renderScoreBlock(cardNumber, correctArtistMemory);
      // помечаем карточки
      categoryIndicator();
      playAudio();
    } else {
      questionsTimer.innerHTML = `00 : ${settingsTimerSelect.value.padStart(
        2,
        "0"
      )}`;
      renderAnswers(counter, undefined, language);
      timer(timerOn);
      roundCounter += 1;
    }
    // убираем блок с правильным ответом
    popupAnswers.innerHTML = "";
  }
});

// удаляем прогресс
export const cleanProgress = () => {
  roundCounter = 0;
  correctArtistMemory = [];
};
