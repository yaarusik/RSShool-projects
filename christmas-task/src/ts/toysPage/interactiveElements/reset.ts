import Controller from '../components/controller';
import Model from '../components/model';
import View, { countBall } from '../components/view';
import sliderReset from '../slider/uislider';
import Utils from '../utils/utilits';
import { ChristmasToy } from '../../interfases';
import { search } from './search';
import hundleBcg from '../../treePage/pageElements/treeBackground';
import { cleanTree } from '../../treePage/interactiveElements/treeChange';
import hundler from '../../treePage/treeElements/snow';
import { audioPlay, getSound } from '../../treePage/pageElements/christmasSound';

const resetBtn: HTMLButtonElement = document.querySelector('.name__clear') as HTMLButtonElement;
const resetLocaleStorage: NodeListOf<HTMLButtonElement> = <NodeListOf<HTMLButtonElement>>(
  document.querySelectorAll('.name__none')
);

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

  let sortData: ChristmasToy[] | string;
  if (select) {
    sortData = Model.getTypeOfSort(select, defaultData);
    countBall.innerHTML = '0';
  } else {
    sortData = Model.getTypeOfSort(selectValue, defaultData);
  }

  View.renderBalls(sortData);
};

const resetTreeStorage = () => {
  hundleBcg();
  cleanTree();
  hundler('off');
  audioPlay('off');
};

const resetFull = () => {
  const sortSelect: HTMLSelectElement = document.querySelector('.name__select') as HTMLSelectElement;
  sortSelect.value = 'sort-name-max';
  search.value = '';
  localStorage.clear();
  Model.clearActiveCards();
  resetFilters('sort-name-max');
  resetTreeStorage();
};

resetBtn.addEventListener('click', () => {
  resetFilters();
});
resetLocaleStorage.forEach((btn) => {
  btn.addEventListener('click', resetFull);
});
