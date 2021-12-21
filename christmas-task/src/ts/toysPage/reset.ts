import Controller from './controller';
import Model from './model';
import View, { countBall } from './view';
import sliderReset from './uislider';
import Utils from './utilits';
import { IData } from '../interfases';
import { search } from './search';

const resetBtn: HTMLButtonElement = document.querySelector('.name__clear') as HTMLButtonElement;
const resetLocaleStorage: HTMLButtonElement = document.querySelector('.name__none') as HTMLButtonElement;

const cleanClasses = () => {
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
};

const resetFilters = (select?: string) => {
  const defaultData = Controller.defaultCardsData();
  const selectValue = Controller.getSelectValue();
  const values = {
    year: [0, 2021],
    count: [0, 12],
  };

  const typeArr = Utils.getTypeFilters();
  if (typeArr) {
    Object.values(typeArr).forEach((item) => item.splice(0, item.length));
  }

  cleanClasses();
  sliderReset(values);

  let sortData: IData[] | string;
  if (select) {
    sortData = Model.getTypeOfSort(select, defaultData);
    countBall.innerHTML = '0';
  } else {
    sortData = Model.getTypeOfSort(selectValue, defaultData);
  }

  View.renderBalls(sortData);
};

const resetFull = () => {
  const sortSelect: HTMLSelectElement = document.querySelector('.name__select') as HTMLSelectElement;
  sortSelect.value = 'sort-name-max';
  search.value = '';
  localStorage.clear();
  Model.clearActiveCards();
  resetFilters('sort-name-max');
};

resetBtn.addEventListener('click', () => {
  resetFilters();
});
resetLocaleStorage.addEventListener('click', resetFull);
