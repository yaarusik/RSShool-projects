const bcgBtns: NodeListOf<HTMLElement> = document.querySelectorAll('.bcg__tree');
const treeBg: HTMLElement = <HTMLElement>document.querySelector('.favorite__tree');

const backgrounds = [
  './assets/images/bg/1.jpg',
  './assets/images/bg/2.jpg',
  './assets/images/bg/3.jpg',
  './assets/images/bg/4.jpg',
  './assets/images/bg/5.jpg',
  './assets/images/bg/6.jpg',
  './assets/images/bg/7.jpg',
  './assets/images/bg/8.jpg',
  './assets/images/bg/9.jpg',
  './assets/images/bg/10.jpg',
];

const hundleBcg = (e: Event) => {
  const { target } = e;
  if (target) {
    const bgNum = Number((<HTMLButtonElement>target).dataset.bg);
    console.log(bgNum);
    treeBg.style.backgroundImage = `url(${backgrounds[bgNum - 1]})`;
  }
};

bcgBtns.forEach((btn) => {
  btn.addEventListener('click', hundleBcg);
});

// type HTMLElementEvent<T extends HTMLElement> = Event & { target: T };
