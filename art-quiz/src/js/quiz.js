// import images from "./../images/images";

import { popupEnd, questionsCount } from './blocksHide';
import { renderScoreBlock } from './score';
import { settingsTimerSelect, timerOn, questionsTimer, language, soundEffects } from './settings';
import { shuffle, getRandomInt, showResultsMessage } from './commonFunctions';

export let quizByAuthor = [];
export let interval;

const questionsBlock = document.querySelector('.questions__block');
const finishResult = document.querySelector('.finish');
const popupAnswers = document.querySelector('.popup__correct-up');
const scoreCard = document.querySelectorAll('.down__score');
const categoryBg = document.querySelectorAll('.down__test');

let authorAnswers = new Set();
let roundCounter = 0;
let counter;
let cardNumber;
let answersData;
let buttonsChoose;
let correctArtistMemory = [];
let timerCount;

const renderIndicator = () => {
    const indicatorCircle = document.querySelectorAll('.indicators__circle');
    correctArtistMemory.forEach((item, index) => {
        switch (item) {
            case '1':
                indicatorCircle[index].classList.add('correct__answer');
                break;
            default:
                indicatorCircle[index].classList.add('uncorrect__answer');
        }
    });
};

const cutData = () => {
    quizByAuthor = answersData.slice(0, answersData.length / 2);
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

const hundler = (e) => {
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
        authorAnswers.add(answersData[getRandomInt(answersData.length - 1)].author);
    }
    let authorArray = [...authorAnswers];
    authorArray = shuffle(authorArray);

    return authorArray.map((item) => `<div class="variants__answer">${item}</div>`).join('');
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
       ${createAnswers(index)}
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
    buttonsChoose.forEach((item) => item.addEventListener('click', hundler));
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
    switch (timerStatus) {
        case 'on':
            timerCount = settingsTimerSelect.value.padStart(2, '0');
            timerSet();
            break;
        case 'continue':
            timerSet();
            break;
        default:
            questionsTimer.innerHTML = '';
    }
};

export const renderAnswers = async (index, currentBlock, lang) => {
    if (typeof currentBlock === 'number') {
        cardNumber = currentBlock;
    }
    counter = index;
    let response;
    switch (lang) {
        case 'en':
            response = await fetch('https://raw.githubusercontent.com/yaarusik/image-data/master/imagesEn.json');
            break;
        default:
            response = await fetch('https://raw.githubusercontent.com/yaarusik/image-data/master/images.json');
    }

    answersData = await response.json();
    cutData(answersData);
    renderQuestions(index, answersData);
};

const saveResults = (result) => {
    scoreCard[cardNumber].innerHTML = `
  ${result} / ${questionsCount}
`;
};
// окончание раунда
const roundEnd = () => {
    let sumResult = correctArtistMemory.reduce((item, current) => +item + +current, 0);

    popupEnd.classList.add('active');
    showResultsMessage(language, sumResult);
    soundEffects.endGame();
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
            // убираем блок с правильным ответом
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
        popupAnswers.innerHTML = '';
    }
});

export const cleanProgress = () => {
    roundCounter = 0;
    correctArtistMemory = [];
};
