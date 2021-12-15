import Controller from './controller';
import { SortProperty, IData } from './interfases';
import Model from './model';
import View from './view';

const sortSelect: HTMLSelectElement = document.querySelector('.name__select') as HTMLSelectElement;
const mainFormBlock: HTMLElement = document.querySelector('.form__sort .value__form-icons') as HTMLElement;
const mainColorBlock: HTMLElement = document.querySelector('.value__color .value__form-icons') as HTMLElement;
const mainSizeBlock: HTMLElement = document.querySelector('.value__size .value__size-icons') as HTMLElement;
const mainFavoriteBlock: HTMLElement = document.querySelector('.value__favorite .value__ok') as HTMLElement;

mainFormBlock.addEventListener('click', (e: Event): void => {
  const button: HTMLElement = e.target as HTMLElement;
  if (button.classList.contains('value__form-img')) {
    button.classList.toggle('form__active');

    const target: SortProperty = {};
    Controller.sortCards(target, button);
  }
});

mainColorBlock.addEventListener('click', (e: Event): void => {
  const button: HTMLElement = e.target as HTMLElement;
  if (button.classList.contains('value__form-cube')) {
    button.classList.toggle('color__active');
    const target: SortProperty = {};
    Controller.sortCards(target, button);
  }
});

mainSizeBlock.addEventListener('click', (e: Event): void => {
  const button: HTMLElement = e.target as HTMLElement;
  if (button.classList.contains('size__option')) {
    button.classList.toggle('form__active');
    const target: SortProperty = {};
    Controller.sortCards(target, button);
  }
});

mainFavoriteBlock.addEventListener('click', (e: Event): void => {
  const button: HTMLElement = e.target as HTMLElement;
  if (button.classList.contains('value__checkbox')) {
    const target: SortProperty = {};
    Controller.sortCards(target, button);
  }
});

sortSelect.addEventListener('change', () => {
  const sortData: IData[] = Model.getTypeOfSort(sortSelect.value, data);

  View.renderBalls(sortData);
});
