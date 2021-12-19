/* eslint-disable import/no-cycle */
import { IData, SortProperty } from './interfases';
import Search from './search';
import Utils from './utilits';
import View from './view';

let activeCards: number[];
const activeFromStorage = localStorage.getItem('favoriteCards');

if (activeFromStorage) {
  activeCards = JSON.parse(activeFromStorage);
} else {
  activeCards = [];
}

class Model {
  static async callData(url: string): Promise<IData[]> {
    return fetch(url).then((data): Promise<IData[]> => data.json());
  }

  static getData(url: string): Promise<IData[]> {
    return this.callData(url);
  }

  static showMessage(currentCard: number) {
    const messageBlocks: NodeListOf<HTMLElement> = document.querySelectorAll('.msg') as NodeListOf<HTMLElement>;
    const currentBlock: HTMLElement = messageBlocks[currentCard] as HTMLElement;
    if (currentBlock) {
      currentBlock?.classList.add('message');
      currentBlock.textContent = 'Извините, все слоты заполнены';
      setTimeout(() => {
        currentBlock?.classList.remove('message');
        currentBlock.textContent = 'Извините, все слоты заполнены';
      }, 900);
    }
  }

  static getPressCard = (index: number, card: HTMLDivElement, currentCard: number) => {
    // index нажатая карточка
    // currentCard номер отображения на странице
    if (activeCards.includes(index)) {
      activeCards = activeCards.filter((ball) => ball !== index);
      View.changeRibbonColor(card, 'remove');
    } else if (activeCards.length < 20) {
      activeCards.push(index);
      View.changeRibbonColor(card, 'add');
    } else {
      this.showMessage(currentCard);
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

    switch (type) {
      case 'sort-name-max': {
        return Utils.sortNameMax(data);
      }
      case 'sort-name-min': {
        return Utils.sortNameMin(data);
      }
      case 'sort-count-max': {
        return Utils.sortCountMax(data);
      }
      case 'sort-count-min': {
        return Utils.sortCountMin(data);
      }
      default: {
        return [];
      }
    }
  }

  static getTypeOfFilterByValue(type: SortProperty, data: IData[]): IData[] | string {
    return Utils.filter(type, data);
  }

  public static getRangeValues(values: string[], data: IData[], type: string): IData[] {
    switch (type) {
      case 'year': {
        return Utils.filterByRangeYear(values, data);
      }
      case 'count': {
        return Utils.filterByRangeCount(values, data);
      }
      default: {
        return data;
      }
    }
  }

  static searchChanges(input: HTMLInputElement) {
    input.addEventListener('input', Search.filterCards);
  }
}

export default Model;
