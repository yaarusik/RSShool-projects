/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-named-as-default
import Model from './model';
import { SortProperty, IData } from './interfases';

import View from './view';

let data: IData[] = [];
let currentData: IData[] = data;
// используем сортированные данные
// const selectValue = 'sort-name-max';

class Controller {
  // получаем данные в переменную
  static getDataFromEntry(dataBalls: IData[]): void {
    data = dataBalls;
  }

  static getSliderValues(values: string[], type: string) {
    const filter: SortProperty = {};
    filter.type = type; // year | count
    filter.name = values; // ['1960','2000']

    const sortData: IData[] = Model.getTypeOfSortByValue(filter, data);
    View.renderBalls(sortData);
  }

  static searchFilter() {
    const search: HTMLInputElement = document.querySelector('.search__scope') as HTMLInputElement;
    search.focus();
    Model.searchChanges(search);
  }

  // сортируем карточки по нажатию
  static sortCards(element: SortProperty, button: HTMLElement) {
    const filter = element;
    filter.name = button.getAttribute('data-filter');
    filter.type = button.getAttribute('data-type');

    const sortData: IData[] = Model.getTypeOfSortByValue(filter, data);
    // сохраняем сортированные данные
    currentData = sortData;
    this.renderBalls(sortData);
  }

  static renderBalls(sortCards: IData[]): void {
    View.renderBalls(sortCards);
  }
}

export default Controller;
