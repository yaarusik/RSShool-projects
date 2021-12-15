import { artistQuiz, picturesQuiz, mainSettingBtn, mainBlock, settingBlock } from './blocksHide';
import { scoreBtn } from './score';
import { picturesTimer } from './picturesQuiz';
import { langParams } from './changeLang';
import Sound from './sound';
export const settingsTimerSelect = document.querySelector('.settings__select');
export const questionsTimer = document.querySelector('.questions__timer');
export let language = localStorage.getItem('lang') || 'en';

const cardDescription = document.querySelectorAll('.card__description');
const settingText = document.querySelector('.settings__text');
const cardAuthor = document.querySelector('.card__artist').childNodes;
const cardPicture = document.querySelector('.card__picture').childNodes;
const settingsTitle = document.querySelector('.settings__title');
const languageTitle = document.querySelector('.language__title');
const soundTitle = document.querySelector('.sound__title');
const timerTitle = document.querySelector('.timer__title');
const timeTitle = document.querySelector('.time__title');
const saveTitle = document.querySelector('.text__size');
const progress = document.querySelector('.volume__progress');
const muteBtn = document.querySelector('.mute');
const buttonSave = document.querySelector('.button__save');
const volumeMuteBtn = document.querySelector('.sound__switch');
const timerOnBtn = document.querySelector('.timer__switch');
const soundIndicator = document.querySelector('.sound__indicator');
const timerIndicator = document.querySelector('.timer__indicator');
const languageIndicator = document.querySelector('.language__indicator');
const languageBtn = document.querySelector('.language__switch');
const categoryTitle = document.querySelectorAll('.category__title');
const categoriesSubtitle = document.querySelectorAll('.down__title');
const footerDeveloper = document.querySelectorAll('.footer__author');
const menuTitle = document.querySelectorAll('.menu__text');
const questionTitlePicture = document.querySelector('.title__picture').childNodes;
const questionTitleAuthor = document.querySelector('.title__author').childNodes;
const popupTitle = document.querySelector('.popup__title');
const popupClose = document.querySelector('.popup__close');
const popupHome = document.querySelector('.popup__home');
const scoreTitle = document.querySelector('.score__artists');
const buttonCategories = document.querySelector('.button__categories');
let saveTimerNum;

settingsTimerSelect.value = localStorage.getItem('timerClock') || '5';

export const soundEffects = new Sound();

export const setLocalStorage = (vatiable, variableValue) => {
    localStorage.setItem(`${vatiable}`, variableValue);
};

export let timerOn = localStorage.getItem('timerStatus') || 'on';
export let volumeOn = localStorage.getItem('volumeStatus') || 'on';

progress.addEventListener('input', () => {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #00cece 0%, #00cece ${value}%, #e5e5e5 ${value}%, #e5e5e5 100%)`;
});

const changeLanguage = (lang) => {
    artistQuiz.textContent = langParams[lang][0];
    picturesQuiz.textContent = langParams[lang][1];
    mainSettingBtn.textContent = langParams[lang][2];

    settingsTitle.textContent = langParams[lang][2];
    languageTitle.textContent = langParams[lang][3];
    soundTitle.textContent = langParams[lang][4];
    timerTitle.textContent = langParams[lang][5];
    timeTitle.textContent = langParams[lang][6];
    saveTitle.textContent = langParams[lang][8];
    footerDeveloper.forEach((item) => {
        let that = item;
        that.textContent = langParams[lang][9];
    });
    categoryTitle.forEach((item) => {
        let that = item;
        that.textContent = langParams[lang][10];
    });
    categoriesSubtitle.forEach((item, index) => {
        let that = item;
        that.textContent = langParams[lang][11] + ` ${index + 1}`;
    });
    menuTitle.forEach((item) => {
        let that = item;
        that.textContent = langParams[lang][12];
    });
    questionTitleAuthor[0].textContent = langParams[lang][13];
    questionTitlePicture[0].textContent = langParams[lang][14];
    popupTitle.textContent = langParams[lang][15];
    popupHome.textContent = langParams[lang][16];
    popupClose.textContent = langParams[lang][17];
    buttonCategories.textContent = langParams[lang][10];
    scoreBtn.forEach((item) => {
        let that = item;
        that.textContent = langParams[lang][18];
    });
    scoreTitle.textContent = langParams[lang][19];
    cardAuthor[0].textContent = 'ARTIST ';
    cardAuthor[1].textContent = 'QUIZ';
    cardPicture[0].textContent = 'PICTURES ';
    cardPicture[1].textContent = 'QUIZ';
    cardDescription[0].textContent = langParams[lang][20];
    cardDescription[1].textContent = langParams[lang][21];
    settingText.textContent = langParams[lang][2];
};

function tracking(obj) {
    let that = obj;
    that.style.background = `linear-gradient(to right, #00cece 0%, #00cece ${that.value}%, #e5e5e5 ${that.value}%, #e5e5e5 100%)`;
}

// запоминает значение громкости
function volume() {
    if (soundEffects.audioEffects.muted) {
        // передаем кнопке звука значение прогрессбара
        muteBtn.setAttribute('data-volume', progress.value);
        muteBtn.classList.add('unmute');
        progress.value = 0;
        tracking(progress);
    } else {
        progress.value = muteBtn.dataset.volume;
        muteBtn.classList.remove('unmute');

        tracking(progress);
    }
}

function volumeMute() {
    soundEffects.audioEffects.muted = !soundEffects.audioEffects.muted;

    if (soundEffects.audioEffects.muted) {
        volumeOn = 'off';
        soundIndicator.classList.add('change__indicator');
        muteBtn.classList.add('unmute');
    } else {
        volumeOn = 'on';
        soundIndicator.classList.remove('change__indicator');
        muteBtn.classList.remove('unmute');
    }
}

function volumeChange() {
    let v = this.value;
    if (v === 0) {
        volumeOn = 'off';
        soundEffects.audioEffects.muted = true;
        muteBtn.classList.add('unmute');
        soundIndicator.classList.add('change__indicator');
    } else {
        volumeOn = 'on';
        soundEffects.audioEffects.volume = v / 100;
        soundIndicator.classList.remove('change__indicator');
        muteBtn.classList.remove('unmute');
        soundEffects.audioEffects.muted = false;
    }
    setLocalStorage('volumeValue', soundEffects.audioEffects.volume);
    return v;
}

const volumeSet = () => {
    volumeMute();
    volume();
};

muteBtn.addEventListener('click', volumeSet);

volumeMuteBtn.addEventListener('click', volumeSet);

settingsTimerSelect.addEventListener('change', () => {
    saveTimerNum = settingsTimerSelect.value;
});

timerOnBtn.addEventListener('click', () => {
    settingsTimerSelect.disabled = !timerIndicator.classList.contains('change__indicator');
    timerIndicator.classList.toggle('change__indicator');
});

languageBtn.addEventListener('click', () => {
    if (languageIndicator.classList.contains('change__indicator')) {
        language = 'en';
    } else {
        language = 'ru';
    }
    changeLanguage(language);
    languageIndicator.classList.toggle('change__indicator');
});

if (language === 'ru') {
    languageIndicator.classList.add('change__indicator');
}

progress.oninput = volumeChange;

// TIMER SECTION================================
switch (timerOn) {
    case 'off':
        timerIndicator.classList.add('change__indicator');
        settingsTimerSelect.disabled = true;
        questionsTimer.innerHTML = ``;
        picturesTimer.innerHTML = ``;
        break;
    default:
        timerIndicator.classList.remove('change__indicator');
        settingsTimerSelect.disabled = false;
        questionsTimer.innerHTML = `00 : ${settingsTimerSelect.value.padStart(2, '0')}`;
        picturesTimer.innerHTML = `00 : ${settingsTimerSelect.value.padStart(2, '0')}`;
}

const settingsSave = () => {
    if (settingsTimerSelect.disabled === true) {
        timerOn = 'off';
        questionsTimer.innerHTML = ``;
        picturesTimer.innerHTML = ``;
    } else {
        timerOn = 'on';
        let count = settingsTimerSelect.value;
        questionsTimer.innerHTML = `00 : ${count}`;
        picturesTimer.innerHTML = `00 : ${count}`;
    }
    if (volumeOn === 'off') {
        soundEffects.audioEffects.volume = 0;
    } else {
        soundEffects.audioEffects.volume = localStorage.getItem('volumeValue') || 0.4;
    }
    changeLanguage(language);
    setLocalStorage('lang', language);
    setLocalStorage('volumeValue', soundEffects.audioEffects.volume);
    setLocalStorage('volumeStatus', volumeOn);
    setLocalStorage('timerStatus', timerOn);
    if (saveTimerNum) setLocalStorage('timerClock', saveTimerNum);
    mainBlock.classList.remove('hide');
    settingBlock.classList.add('hide');
};
buttonSave.addEventListener('click', settingsSave);

// VOLUME SECTION=========================================
if (volumeOn === 'off') {
    soundEffects.audioEffects.volume = 0;
    soundEffects.audioEffects.muted = true;
    muteBtn.classList.add('unmute');
    soundIndicator.classList.add('change__indicator');
    progress.value = 0;
    tracking(progress);
} else {
    soundEffects.audioEffects.volume = localStorage.getItem('volumeValue') || 1;
    soundEffects.audioEffects.muted = false;
    muteBtn.classList.remove('unmute');
    soundIndicator.classList.remove('change__indicator');
    progress.value = localStorage.getItem('volumeValue') * 100 || 40;
    tracking(progress);
}
changeLanguage(language);
