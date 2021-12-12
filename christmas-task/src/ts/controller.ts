/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-named-as-default
import Model from './model';

import View from './view';

export type SortProperty = {
  name?: string | null;
  type?: string | null;
};

let data: IData[];
const sortSelect: HTMLSelectElement = document.querySelector('.name__select') as HTMLSelectElement;
const mainFormBlock: HTMLElement = document.querySelector('.form__sort .value__form-icons') as HTMLElement;
const mainColorBlock: HTMLElement = document.querySelector('.value__color .value__form-icons') as HTMLElement;
const mainSizeBlock: HTMLElement = document.querySelector('.value__size .value__size-icons') as HTMLElement;
const mainFavoriteBlock: HTMLElement = document.querySelector('.value__favorite .value__ok') as HTMLElement;

sortSelect.addEventListener('change', () => {
  const sortData: IData[] = Model.getTypeOfSort(sortSelect.value, data);
  View.renderBalls(sortData);
});

mainFormBlock.addEventListener('click', (e: Event): void => {
  const button: HTMLElement = e.target as HTMLElement;
  if (button.classList.contains('value__form-img')) {
    button.classList.toggle('form__active');

    const target: SortProperty = {};
    target.name = button.getAttribute('data-filter');
    target.type = button.getAttribute('data-type');

    const sortData: IData[] = Model.getTypeOfSortByValue(target, data);
    View.renderBalls(sortData);
  }
});

mainColorBlock.addEventListener('click', (e: Event): void => {
  const button: HTMLElement = e.target as HTMLElement;
  if (button.classList.contains('value__form-cube')) {
    button.classList.toggle('color__active');
    const target: SortProperty = {};
    target.name = button.getAttribute('data-filter');
    target.type = button.getAttribute('data-type');

    const sortData: IData[] = Model.getTypeOfSortByValue(target, data);
    View.renderBalls(sortData);
  }
});

mainSizeBlock.addEventListener('click', (e: Event): void => {
  const button: HTMLElement = e.target as HTMLElement;
  if (button.classList.contains('size__option')) {
    button.classList.toggle('form__active');
    const target: SortProperty = {};
    target.name = button.getAttribute('data-filter');
    target.type = button.getAttribute('data-type');
  
    console.log(target.type);
    const sortData: IData[] = Model.getTypeOfSortByValue(target, data);
    View.renderBalls(sortData);
  }
});

mainFavoriteBlock.addEventListener('click', (e: Event): void => {
  const button: HTMLElement = e.target as HTMLElement;
  if (button.classList.contains('value__checkbox')) {
    const target: SortProperty = {};
    target.name = button.getAttribute('data-filter');
    target.type = button.getAttribute('data-type');
    console.log(target.type);
    const sortData: IData[] = Model.getTypeOfSortByValue(target, data);
    View.renderBalls(sortData);
  }
});

export interface IData {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

class Controller {
  static getDataFromEntry(dataBalls: IData[]): void {
    data = dataBalls;
  }

  static getSliderValues(values: string[], type: string) {
    const sortData: IData[] = Model.getRangeValues(values, data, type);
    View.renderBalls(sortData);
  }
}

export default Controller;
