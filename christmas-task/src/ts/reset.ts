import Controller from './controller';
import Model, { countBall } from './model';
import View from './view';
import sliderReset from './uislider';
import Utils from './utilits';
import { IData } from './interfases';

const resetBtn: HTMLButtonElement = document.querySelector('.name__clear') as HTMLButtonElement;
const resetLocaleStorage: HTMLButtonElement = document.querySelector('.name__none') as HTMLButtonElement;

const resetFilters = (select?: string) => {
  const typeArr = Utils.getTypeFilters();
  if (typeArr !== undefined) {
    Object.values(typeArr).forEach((item) => item.splice(0, item.length));
  }
  const allFilterBtn: NodeListOf<HTMLElement> = document.querySelectorAll('[data-filter]');
  // очищаем классы активных фильтров
  allFilterBtn.forEach((button) => {
    const btn: HTMLButtonElement = button as HTMLButtonElement;
    if (btn.classList.contains('form__active')) {
      btn.classList.remove('form__active');
    } else if (btn.classList.contains('color__active')) {
      btn.classList.remove('color__active');
    }
  });
  const values = {
    year: [0, 2021],
    count: [0, 12],
  };
  sliderReset(values);
  const defaultData = Controller.defaultCardsData();
  const selectValue = Controller.getSelectValue();
  let sortData: IData[] | string;
  if (select) {
    sortData = Model.getTypeOfSort(select, defaultData);
    countBall.innerHTML = '0';
  } else {
    sortData = Model.getTypeOfSort(selectValue, defaultData);
  }
  View.renderBalls(sortData);
  console.log(typeArr);
};

const resetFull = () => {
  const sortSelect: HTMLSelectElement = document.querySelector('.name__select') as HTMLSelectElement;

  sortSelect.value = 'sort-name-max';
  localStorage.clear();
  resetFilters('sort-name-max');
};

resetBtn.addEventListener('click', () => {
  resetFilters();
});
resetLocaleStorage.addEventListener('click', resetFull);
