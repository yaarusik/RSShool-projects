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

const hundleBcg = (e?: Event) => {
  const bcg = localStorage.getItem('treeBg') || `url(./assets/images/bg/1.jpg)`;
  if (!e) {
    treeBg.style.backgroundImage = `${bcg}`;
  } else {
    const { target } = e;
    if (target) {
      const bgNum = Number((<HTMLButtonElement>target).dataset.bg);
      treeBg.style.backgroundImage = `url(${backgrounds[bgNum - 1]})`;
      localStorage.setItem('treeBg', treeBg.style.backgroundImage);
    }
  }
};

bcgBtns.forEach((btn) => {
  btn.addEventListener('click', hundleBcg);
});

hundleBcg();

export default hundleBcg;

// type HTMLElementEvent<T extends HTMLElement> = Event & { target: T };
