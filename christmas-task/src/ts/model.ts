/* eslint-disable import/no-cycle */
import { IData, SortProperty } from './interfases';

import Utils from './utilits';
import View from './view';

let activeCards: number[];
const activeFromStorage = localStorage.getItem('favoriteCards');

if (activeFromStorage) {
  activeCards = JSON.parse(activeFromStorage);
} else {
  activeCards = [];
}

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

countBall.innerHTML = localStorage.getItem('favoritesCount') || '0';
class Model {
  static async callData(url: string): Promise<IData[]> {
    return fetch(url).then((data): Promise<IData[]> => data.json());
  }

  static getData(url: string): Promise<IData[]> {
    return this.callData(url);
  }

  static getPressCard = (index: number, card: HTMLDivElement, currentCard: number) => {
    // index нажатая карточка
    if (activeCards.includes(index)) {
      activeCards = activeCards.filter((ball) => ball !== index);
      View.changeRibbonColor(card, 'remove');
    } else if (activeCards.length < 20) {
      activeCards.push(index);
      View.changeRibbonColor(card, 'add');
    } else {
      const msg: NodeListOf<HTMLElement> = document.querySelectorAll('.msg') as NodeListOf<HTMLElement>;
      if (msg[currentCard]) {
        msg[currentCard]?.classList.add('message');
        msg[currentCard]!.textContent = 'Извините, все слоты заполнены';
        setTimeout(() => {
          msg[currentCard]?.classList.remove('message');
          msg[currentCard]!.textContent = 'Извините, все слоты заполнены';
        }, 900);
      }
    }
    localStorage.setItem('favoriteCards', JSON.stringify(activeCards));
    return activeCards.length;
  };

  static getActiveCards(): number[] {
    return activeCards;
  }

  static clearActiveCards() {
    activeCards = [];
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
      const cardTitle: HTMLElement = item.children[1] as HTMLElement;
      const card: HTMLElement = item;
      if (cardTitle.innerHTML.toLowerCase().indexOf(value) > -1) {
        card.classList.remove('anime');
        card.classList.remove('hide');
        countHide -= 1;
      } else {
        card.classList.add('anime');
        countHide += 1;
      }
    });

    cards.forEach((card) => {
      card.addEventListener('transitionend', () => {
        if (card.classList.contains('anime')) {
          card.classList.add('hide');
        }
      });
    });

    if (countHide > cards.length - 1) {
      cardsMessage.textContent = 'К сожалению, совпадений не обнаружено';
    } else {
      cardsMessage.textContent = '';
    }
  }
}

export default Model;
