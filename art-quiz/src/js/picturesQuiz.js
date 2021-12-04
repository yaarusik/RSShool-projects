import { popupEnd, questionsCount } from './blocksHide';
import { renderScoreBlock } from './score';
import { language, settingsTimerSelect, timerOn, soundEffects } from './settings';

export let pictureInterval;
export const picturesTimer = document.querySelector('.pictures__timer');
export let quizByName = [];

const questionsBlock = document.querySelector('.question__pictures');
const finishResult = document.querySelector('.finish');
const finishTitle = document.querySelector('.end__title');
const popupAnswers = document.querySelector('.popup__correct-up');
const scoreCard = document.querySelectorAll('.down__results');
const categoryBg = document.querySelectorAll('.down__reaction');
const questionTitle = document.querySelector('.change__title');

let pictureAnswers = new Set();
let roundCounter = 0;
let counter;
let cardNumber;
let data;
let buttonsChoose;
let correctPictureMemory = [];
let type = 'picture';
let timerPictureCount;

// рандом для вариантов ответа авторов
export const getRandomInt = (num) => {
    return Math.floor(Math.random() * num);
};

// рандом для массива ответов
export const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const cutData = () => {
    quizByName = data.slice(data.length / 2, data.length - 1);
};

const renderPopupAnswer = (answer) => {
    popupAnswers.innerHTML = `
  <div class="popup__correct">
            <div class="container">
              <div class="correct__body">
                <div class="correct__img">
                  <div class="correct__logo ${answer} background__size"></div>
                  <img class="opacity__img" onload="this.style.opacity='1'" src="./images/assets/img/${quizByName[counter].imageNum}.jpg" alt="img" />
                </div>
                <div class="correct__name">${quizByName[counter].name}</div>
                <div class="correct__author"> ${quizByName[counter].author}, ${quizByName[counter].year}</div>
                <button class="correct__btn">Next</button>
              </div>
            </div>
          </div>
  `;
};

const renderIndicator = () => {
    const indicatorRound = document.querySelectorAll('.indicators__round');

    correctPictureMemory.forEach((item, index) => {
        if (item === '1') {
            indicatorRound[index].classList.add('correct__answer');
        } else if (item === '0') {
            indicatorRound[index].classList.add('uncorrect__answer');
        }
    });
};

const chooseHundler = (e) => {
    if (e.target.alt === quizByName[counter].imageNum) {
        e.target.classList.add('correct__answer');
        correctPictureMemory.push('1');
        renderIndicator(counter);
        renderPopupAnswer('yes');
        soundEffects.rigthAnswer();
    } else {
        correctPictureMemory.push('0');
        e.target.classList.add('uncorrect__answer');
        renderIndicator(counter);
        renderPopupAnswer('no');
        soundEffects.wrongAnswer();
    }
    soundEffects.playAudio();
    clearInterval(pictureInterval);
};

// cоздаем 4 варианта ответа
const createAnswers = (index) => {
    questionTitle.innerHTML = quizByName[index].author;
    pictureAnswers.add(quizByName[index].imageNum);
    while (pictureAnswers.size < 4) {
        pictureAnswers.add(data[getRandomInt(data.length - 1)].imageNum);
    }

    let pictureArray = [...pictureAnswers];
    pictureArray = shuffle(pictureArray);

    return pictureArray
        .map((item) => {
            return `<div class="pictures__answer">
                  <img class="img__opacity" onload="this.style.opacity='1'" src="./images/assets/img/${item}.jpg" alt="${item}" />
               </div>`;
        })
        .join('');
};

const renderQuestions = (index) => {
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
<div class="block__variants opacity__img" onload="this.style.opacity='1'>
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

    pictureAnswers = new Set();

    buttonsChoose = document.querySelectorAll('.pictures__answer');

    buttonsChoose.forEach((item) => item.addEventListener('click', chooseHundler));
};

export const renderPictureAnswers = async (index, currentBlock, lang) => {
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

const saveResults = (result) => {
    scoreCard[cardNumber].innerHTML = `
    ${result} / ${questionsCount}
  `;
};

const roundEnd = () => {
    let sumResult = correctPictureMemory.reduce((item, current) => +item + +current, 0);

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
        finishTitle.textContent = `You can better :)`;
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

const timerSet = () => {
    pictureInterval = setInterval(() => {
        if (+timerPictureCount < 11) {
            picturesTimer.innerHTML = `00 : 0${timerPictureCount - 1}`;
        } else {
            picturesTimer.innerHTML = `00 : ${timerPictureCount - 1}`;
        }
        timerPictureCount -= 1;
        if (!timerPictureCount) {
            clearInterval(pictureInterval);
            correctPictureMemory.push('0');
            renderIndicator(counter);
            renderPopupAnswer('no');

            soundEffects.wrongAnswer();
            soundEffects.playAudio();
        }
    }, 1000);
};

export const timerPicture = (timerStatus) => {
    if (timerStatus === 'on') {
        timerPictureCount = settingsTimerSelect.value.padStart(2, '0');
        timerSet();
    } else if (timerStatus === 'continue') {
        timerSet();
    } else {
        picturesTimer.innerHTML = '';
    }
};

// делегирование
popupAnswers.addEventListener('click', (e) => {
    if (e.target.classList.contains('correct__btn')) {
        counter += 1;

        if (roundCounter === 9) {
            roundEnd();

            renderScoreBlock(cardNumber, correctPictureMemory, type);

            categoryIndicator();

            soundEffects.playAudio();
        } else {
            picturesTimer.innerHTML = `00 : ${settingsTimerSelect.value.padStart(2, '0')}`;
            renderPictureAnswers(counter, undefined, language);
            timerPicture(timerOn);
            roundCounter += 1;
        }

        popupAnswers.innerHTML = '';
    }
});

export const cleanPictureProgress = () => {
    roundCounter = 0;
    correctPictureMemory = [];
};
