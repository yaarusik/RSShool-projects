/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-named-as-default
import Model from './model';
import { SortProperty, IData } from './interfases';

import View from './view';

let data: IData[] = [];

let currentData: IData[] | string = [];
const sortSelect: HTMLSelectElement = document.querySelector('.name__select') as HTMLSelectElement;

// используем сортированные данные
let selectValueMemory = localStorage.getItem('selectSort') || 'sort-name-max';
sortSelect.value = localStorage.getItem('selectSort') || 'sort-name-max';

class Controller {
  // получаем данные в переменную
  static getDataFromEntry(dataBalls: IData[]): void {
    data = dataBalls;
    currentData = dataBalls;
  }

  static defaultCardsData() {
    currentData = data;
    return data;
  }

  static getSelectValue() {
    return selectValueMemory;
  }

  static getSliderValues(values: string[], type: string) {
    const filter: SortProperty = {};
    filter.type = type; // year | count
    filter.name = values; // ['1960','2000']

    let sortData: IData[] | string = Model.getTypeOfFilterByValue(filter, data);
    currentData = sortData;
    // console.log(currentData.length);
    // сортируем по выбранной сортировке
    sortData = Model.getTypeOfSort(selectValueMemory, currentData);
    View.renderBalls(sortData);
  }

  static searchFilter() {
    const search: HTMLInputElement = document.querySelector('.search__scope') as HTMLInputElement;
    search.focus();
    Model.searchChanges(search);
  }

  // сортируем карточки по нажатию
  static filterCards(element: SortProperty, button: HTMLElement) {
    const filter = element;
    filter.name = button.getAttribute('data-filter');
    filter.type = button.getAttribute('data-type');

    let sortData: IData[] | string = Model.getTypeOfFilterByValue(filter, data);
    // сохраняем сортированные данные
    currentData = sortData;
    console.log(currentData.length);
    // сортируем по выбранной сортировке
    sortData = Model.getTypeOfSort(selectValueMemory, currentData);
    this.renderBalls(sortData);
  }

  static renderBalls(sortCards: IData[] | string): void {
    View.renderBalls(sortCards);
  }

  static setLocaleStorage(variable: string, variableValue: string): void {
    localStorage.setItem(`${variable}`, variableValue);
  }
}

sortSelect.addEventListener('change', () => {
  console.log(currentData.length);
  selectValueMemory = sortSelect.value;
  Controller.setLocaleStorage('selectSort', selectValueMemory);
  const sortData: IData[] | string = Model.getTypeOfSort(sortSelect.value, currentData);

  Controller.renderBalls(sortData);
});

export default Controller;
