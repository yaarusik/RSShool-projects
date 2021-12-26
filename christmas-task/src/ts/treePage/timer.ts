function declOfNum(number: number, titles: string[]) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]!];
}

document.addEventListener('DOMContentLoaded', () => {
  const newYear = new Date('Jan 1 2022 00:00:00');

  const daysValue = document.querySelector('.timer__days .timer__count__value');
  const hoursValue = document.querySelector('.timer__hours .timer__count__value');
  const minutesValue = document.querySelector('.timer__minutes .timer__count__value');
  const secondsValue = document.querySelector('.timer__seconds .timer__count__value');

  const daysText = document.querySelector('.timer__days .timer__count__text');
  const hoursText = document.querySelector('.timer__hours .timer__count__text');
  const minutesText = document.querySelector('.timer__minutes .timer__count__text');
  const secondsText = document.querySelector('.timer__seconds .timer__count__text');

  const timeCount = () => {
    const now = new Date();
    const leftUntil = +newYear - +now;

    const days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
    const hours = Math.floor((leftUntil / 1000 / 60 / 60) % 24);
    const minutes = Math.floor((leftUntil / 1000 / 60) % 60);
    const seconds = Math.floor((leftUntil / 1000) % 60);
    if (daysValue && hoursValue && minutesValue && secondsValue) {
      daysValue.textContent = `${+days}`;
      hoursValue.textContent = `${+hours}`;
      minutesValue.textContent = `${+minutes}`;
      secondsValue.textContent = `${+seconds}`;
    }
    if (daysText && hoursText && minutesText && secondsText) {
      daysText.textContent = `${declOfNum(days, ['день', 'дня', 'дней'])}`;
      hoursText.textContent = `${declOfNum(hours, ['час', 'часа', 'часов'])}`;
      minutesText.textContent = `${declOfNum(minutes, ['минута', 'минуты', 'минут'])}`;
      secondsText.textContent = `${declOfNum(seconds, ['секунда', 'секунды', 'секунд'])}`;
    }
  };

  timeCount();
  setInterval(timeCount, 1000);
});
