// import images from "./../images/images";

import { popupEnd, questionsCount } from './blocksHide';
import { renderScoreBlock } from './score';
import { settingsTimerSelect, timerOn, questionsTimer, language, soundEffects } from './settings';
import { shuffle, getRandomInt } from './picturesQuiz';
export let quizByAuthor = [];
export let interval;

const questionsBlock = document.querySelector('.questions__block');
const finishResult = document.querySelector('.finish');
const popupAnswers = document.querySelector('.popup__correct-up');
const scoreCard = document.querySelectorAll('.down__score');
const categoryBg = document.querySelectorAll('.down__test');
const finishTitle = document.querySelector('.end__title');

let authorAnswers = new Set();
let roundCounter = 0;
let counter;
let cardNumber;
let data;
let buttonsChoose;
let correctArtistMemory = [];
let timerCount;

const renderIndicator = () => {
    const indicatorCircle = document.querySelectorAll('.indicators__circle');

    correctArtistMemory.forEach((item, index) => {
        if (item === '1') {
            indicatorCircle[index].classList.add('correct__answer');
        } else if (item === '0') {
            indicatorCircle[index].classList.add('uncorrect__answer');
        }
    });
};

const cutData = () => {
    quizByAuthor = data.slice(0, data.length / 2);
};

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

const chooseHundler = (e) => {
    if (e.target.innerHTML === quizByAuthor[counter].author) {
        e.target.classList.add('correct__answer');
        correctArtistMemory.push('1');
        renderIndicator(counter);
        renderPopupAnswer('yes');
        soundEffects.rigthAnswer();
    } else {
        correctArtistMemory.push('0');
        e.target.classList.add('uncorrect__answer');
        renderIndicator(counter);
        renderPopupAnswer('no');
        soundEffects.wrongAnswer();
    }
    soundEffects.playAudio();
    clearInterval(interval);
};

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
        .join('');
};

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

    authorAnswers = new Set();

    buttonsChoose = document.querySelectorAll('.variants__answer');

    buttonsChoose.forEach((item) => item.addEventListener('click', chooseHundler));
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
            correctArtistMemory.push('0');
            renderIndicator(counter);
            renderPopupAnswer('no');
            // removeEvents();
            soundEffects.wrongAnswer();
            soundEffects.playAudio();
        }
    }, 1000);
};

export const timer = (timerStatus) => {
    if (timerStatus === 'on') {
        timerCount = settingsTimerSelect.value.padStart(2, '0');
        timerSet();
    } else if (timerStatus === 'continue') {
        timerSet();
    } else {
        questionsTimer.innerHTML = '';
    }
};

export const renderAnswers = async (index, currentBlock, lang) => {
    if (typeof currentBlock === 'number') {
        cardNumber = currentBlock;
    }
    counter = index;
    let response;
    if (lang === 'en') {
        response = await fetch('https://raw.githubusercontent.com/yaarusik/image-data/master/imagesEn.json');
    } else {
        response = await fetch('https://raw.githubusercontent.com/yaarusik/image-data/master/images.json');
    }

    data = await response.json();

    cutData(data);

    renderQuestions(index, data);
};

// окончание раунда
const roundEnd = () => {
    let sumResult = correctArtistMemory.reduce((item, current) => +item + +current, 0);

    const saveResults = (result) => {
        scoreCard[cardNumber].innerHTML = `
      ${result} / ${questionsCount}
    `;
    };

    popupEnd.classList.add('active');
    if (language === 'ru') {
        if (sumResult <= 3) {
            finishTitle.textContent = 'Ты можешь лучше :)';
            soundEffects.gameOver();
        } else if (sumResult > 3 && sumResult <= 7) {
            finishTitle.textContent = 'У тебя хороший уровень!';
            soundEffects.gameCenter();
        } else if (sumResult > 7) {
            finishTitle.textContent = 'Поздравляю! Ты выйграл :)';
            soundEffects.endGame();
        }
    } else if (sumResult <= 3) {
        finishTitle.textContent = 'You can better :)';
        soundEffects.gameOver();
    } else if (sumResult > 3 && sumResult <= 7) {
        finishTitle.textContent = 'You have a good level!';
        soundEffects.gameCenter();
    } else if (sumResult > 7) {
        soundEffects.endGame();
        finishTitle.textContent = 'Congratulations! You won :)';
    }
    finishResult.textContent = `${sumResult}`;

    saveResults(sumResult);
};

const categoryIndicator = () => {
    categoryBg[cardNumber].classList.add('add__bg');
};

// делегирование
popupAnswers.addEventListener('click', (e) => {
    if (e.target.classList.contains('correct__button')) {
        counter += 1;

        if (roundCounter === 9) {
            roundEnd();

            renderScoreBlock(cardNumber, correctArtistMemory);
            // помечаем карточки
            categoryIndicator();
            soundEffects.playAudio();
        } else {
            questionsTimer.innerHTML = `00 : ${settingsTimerSelect.value.padStart(2, '0')}`;
            renderAnswers(counter, undefined, language);
            timer(timerOn);
            roundCounter += 1;
        }
        // убираем блок с правильным ответом
        popupAnswers.innerHTML = '';
    }
});

export const cleanProgress = () => {
    roundCounter = 0;
    correctArtistMemory = [];
};
