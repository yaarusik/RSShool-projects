const festoonContainer: HTMLElement = <HTMLElement>document.querySelector('.festoon__wrapper');
const lightBtns = document.querySelectorAll('.btn__color');
const lightsCircleClasses: string[] = ['festoon__blue', 'festoon__green', 'festoon__yellow', 'festoon__red'];
const festoonSwitch: HTMLInputElement = <HTMLInputElement>document.querySelector('.festoon__checkbox');
// сколько реально отрисовывается
let needLI = 3;

const ulCount = 9;
let circleCount = 25;

const circleSize = 12;
let bigCircleSize = 200;

const liArr: HTMLElement[] = [];

const createLi = (ul: HTMLElement, style: string) => {
  const angle = 360 / circleCount;
  let rotate = 0;
  for (let i = 0; i < needLI; i += 1) {
    const li = document.createElement('li');
    if (style === 'multi') {
      const number = Math.floor(Math.random() * 4);
      const randomStyle = lightsCircleClasses[number];
      li.className = `uniq__circle ${randomStyle}`;
    } else {
      li.className = `uniq__circle ${style}`;
    }

    li.style.transform = `rotate(${rotate}deg) translate(${bigCircleSize / 2}px) rotate(${-rotate}deg)`;
    li.style.width = `${circleSize}px`;
    li.style.height = `${circleSize}px`;
    li.style.animationDuration = `${Math.random()}s`;
    rotate += angle;
    liArr.push(li);
  }
  needLI += 1;
  circleCount += 11;
  liArr.forEach((li) => ul.append(li));
  liArr.length = 0;
};

const createUl = (style: string) => {
  festoonContainer.innerHTML = '';
  for (let i = 0; i < ulCount; i += 1) {
    const ul = document.createElement('ul');
    ul.className = 'circle-container';
    festoonContainer.appendChild(ul);
    createLi(ul, style);
    bigCircleSize += 100;
  }
};

const beginValue = () => {
  circleCount = 25;
  needLI = 3;
  bigCircleSize = 200;
};

const changeBlue = () => {
  createUl('festoon__blue');
  festoonSwitch.checked = true;
  beginValue();
};
const changeGreen = () => {
  festoonSwitch.checked = true;
  createUl('festoon__green');
  beginValue();
};
const changeYellow = () => {
  festoonSwitch.checked = true;
  createUl('festoon__yellow');
  beginValue();
};
const changeRed = () => {
  festoonSwitch.checked = true;
  createUl('festoon__red');
  beginValue();
};
const changeMulticolor = () => {
  festoonSwitch.checked = true;
  createUl('multi');
  beginValue();
};

lightBtns.forEach((btn) => {
  switch (btn.id) {
    case 'blue': {
      btn.addEventListener('click', changeBlue);
      break;
    }
    case 'green': {
      btn.addEventListener('click', changeGreen);
      break;
    }
    case 'yellow': {
      btn.addEventListener('click', changeYellow);
      break;
    }
    case 'red': {
      btn.addEventListener('click', changeRed);
      break;
    }
    default: {
      btn.addEventListener('click', changeMulticolor);
    }
  }
});

const switchFestoon = () => {
  if (festoonSwitch.checked) {
    createUl('festoon__yellow');
    beginValue();
  } else {
    festoonContainer.innerHTML = '';
  }
};

festoonSwitch?.addEventListener('change', switchFestoon);
