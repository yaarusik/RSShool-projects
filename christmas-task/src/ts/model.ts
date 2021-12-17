/* eslint-disable import/no-cycle */
import { IData, SortProperty } from './interfases';

import Utils from './utilits';

let activeCards: number[] = [];

export const countBall: Element = document.querySelector('.right__count') as Element;
// const searchMessage: HTMLElement = document.querySelector('.balls__message') as HTMLElement;
const search: HTMLInputElement = document.querySelector('.search__scope') as HTMLInputElement;
const searchAfter: HTMLElement = document.querySelector('.search__after') as HTMLElement;

const deleteValue = () => {
  search.value = '';
  const event = new Event('keyup');
  search.dispatchEvent(event);
};
searchAfter.addEventListener('click', deleteValue);

countBall.innerHTML = '0';
class Model {
  static async callData(url: string): Promise<IData[]> {
    return fetch(url).then((data): Promise<IData[]> => data.json());
  }

  static getData(url: string): Promise<IData[]> {
    return this.callData(url);
  }

  static getPressCard = (index: number) => {
    // index нажатая карточка
    if (activeCards.includes(index)) {
      activeCards = activeCards.filter((ball) => ball !== index);
    } else if (activeCards.length < 3) {
      activeCards.push(index);
    } else {
      // сделать poup с сообщением
      console.log('у вас много шаров');
    }
    // console.log(activeCards);
    return activeCards.length;
  };

  static getActiveCards(): number[] {
    return activeCards;
  }

  static getTypeOfSort(type: string | null, data: IData[] | string): IData[] | string {
    if (typeof data === 'string') {
      return 'Извините, совпадений не обнаружено';
    }
    if (type === 'sort-name-max') {
      return Utils.sortNameMax(data);
    }
    if (type === 'sort-name-min') {
      return Utils.sortNameMin(data);
    }
    if (type === 'sort-count-max') {
      return Utils.sortCountMax(data);
    }
    if (type === 'sort-count-min') {
      return Utils.sortCountMin(data);
    }
    return [];
  }

  static getTypeOfFilterByValue(type: SortProperty, data: IData[]): IData[] | string {
    return Utils.filter(type, data);
  }

  static getRangeValues(values: string[], data: IData[], type: string): IData[] {
    if (type === 'year') {
      return Utils.filterByRangeYear(values, data);
    }
    if (type === 'count') {
      return Utils.filterByRangeCount(values, data);
    }
    return data;
  }

  static searchChanges(input: HTMLInputElement) {
    // тут наверное oninput
    input.addEventListener('keyup', Model.filterCards);
  }

  // поиск карточек через input
  static filterCards(): void {
    const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.balls__body');
    const cardsMessage: HTMLElement = document.querySelector('.cards__message') as HTMLElement;
    const before = document.querySelector('.search__before');
    const after = document.querySelector('.search__after');
    let countHide = 0;
    const value: string = search.value.toLowerCase();
    if (!value.length) {
      after?.classList.remove('right__close');
      before?.classList.add('right__loup');
    } else {
      after?.classList.add('right__close');
      before?.classList.remove('right__loup');
    }

    cards.forEach((item) => {
      const cardTitle: HTMLElement = item.children[0] as HTMLElement;
      const card: HTMLElement = item;
      if (cardTitle.innerHTML.toLowerCase().indexOf(value) > -1) {
        card.style.display = '';
        countHide -= 1;
      } else {
        card.style.display = 'none';
        countHide += 1;
      }
    });

    if (countHide > cards.length - 1) {
      cardsMessage.textContent = 'К сожалению, совпадений не обнаружено';
    } else {
      cardsMessage.textContent = '';
    }
  }
}

export default Model;
