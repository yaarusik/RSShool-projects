const snowBtn: HTMLElement = <HTMLElement>document.querySelector('.snow__btn');

let on = localStorage.getItem('snow') || 'off';

const createSnowflake = () => {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.style.left = `${Math.random() * window.innerWidth - 50}px`;
  snowflake.style.animationDuration = `${Math.random() * 3 + 3}s`;
  snowflake.style.opacity = `${Math.random()}`;
  snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;

  document.body.prepend(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, 3500);
};
let deleteSnow: NodeJS.Timeout;

const hundler = () => {
  const snowflake: HTMLElement = <HTMLElement>document.querySelector('.snowflake');

  if (!snowflake) {
    deleteSnow = setInterval(createSnowflake, 100);
    on = 'on';
    localStorage.setItem('snow', on);
  } else {
    clearInterval(deleteSnow);
    document.querySelectorAll('.snowflake').forEach((item) => {
      item.remove();
    });
    on = 'off';
    localStorage.setItem('snow', on);
  }
};
if (on === 'on') hundler();

snowBtn.addEventListener('click', hundler);
