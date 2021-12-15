const finishTitle = document.querySelector('.end__title');
export const dictionary = {
    ru: {
        good: 'Поздравляю! Ты выйграл :)',
        notbad: 'У тебя хороший уровень!',
        bad: 'Ты можешь лучше :)',
    },
    en: {
        good: 'Congratulations! You won :)',
        notbad: 'You have a good level!',
        bad: 'You can better :)',
    },
};

// рандом для вариантов ответа авторов
export const getRandomInt = (num) => {
    return Math.floor(Math.random() * num);
};

// рандом для массива ответов
export const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

export const showResultsMessage = (lang, sumResult) => {
    if (lang === 'ru') {
        if (sumResult <= 3) {
            finishTitle.textContent = dictionary[lang].bad;
        } else if (sumResult > 3 && sumResult <= 7) {
            finishTitle.textContent = dictionary[lang].notbad;
        } else if (sumResult > 7) {
            finishTitle.textContent = dictionary[lang].good;
        }
    } else if (sumResult <= 3) {
        finishTitle.textContent = dictionary[lang].bad;
    } else if (sumResult > 3 && sumResult <= 7) {
        finishTitle.textContent = dictionary[lang].notbad;
    } else if (sumResult > 7) {
        finishTitle.textContent = dictionary[lang].good;
    }
};
