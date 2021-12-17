import { typeArr } from './utilits';
import Controller, { pressFilter } from './controller';
import Model from './model';
import View from './view';
import sliderReset from './uislider';

const resetBtn: HTMLButtonElement = document.querySelector('.name__clear') as HTMLButtonElement;

const resetFilters = () => {
  if (typeArr !== undefined) {
    Object.values(typeArr).forEach((item) => item.splice(0, item.length));
  }
  // очищаем классы активных фильтров
  [...pressFilter].forEach((button) => {
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
  const sortData = Model.getTypeOfSort(selectValue, defaultData);
  View.renderBalls(sortData);
  console.log(typeArr);
};

resetBtn.addEventListener('click', resetFilters);
