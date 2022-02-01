import Model from './model';
import { SortProperty, ChristmasToy } from '../interfases';
import View from './view';

let data: ChristmasToy[] = [];

let currentData: ChristmasToy[] | string = [];
const sortSelect: HTMLSelectElement = document.querySelector('.name__select') as HTMLSelectElement;

// используем сортированные данные
let selectValueMemory = localStorage.getItem('selectSort') || 'sort-name-max';
sortSelect.value = localStorage.getItem('selectSort') || 'sort-name-max';
export default class Controller {
  // получаем данные в переменную
  static getDataFromEntry(dataBalls: ChristmasToy[]): void {
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

    let sortData: ChristmasToy[] | string = Model.getTypeOfFilterByValue(filter, data);
    currentData = sortData;
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
    filter.type = button.getAttribute('data-type') as string;

    let sortData: ChristmasToy[] | string = Model.getTypeOfFilterByValue(filter, data);
    // сохраняем сортированные данные
    currentData = sortData;
    // сортируем по выбранной сортировке
    sortData = Model.getTypeOfSort(selectValueMemory, currentData);
    this.renderBalls(sortData);
  }

  static renderBalls(sortCards: ChristmasToy[] | string): void {
    View.renderBalls(sortCards);
  }

  static setLocaleStorage(variable: string, variableValue: string): void {
    localStorage.setItem(`${variable}`, variableValue);
  }
}

sortSelect.addEventListener('change', () => {
  selectValueMemory = sortSelect.value;
  Controller.setLocaleStorage('selectSort', selectValueMemory);
  const sortData: ChristmasToy[] | string = Model.getTypeOfSort(sortSelect.value, currentData);

  Controller.renderBalls(sortData);
});
