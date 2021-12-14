/* eslint-disable import/no-cycle */

import { IData, SortProperty } from './controller';
import Utils from './utilits';

let ballsArray: number[] = [];

export const countBall: Element = document.querySelector('.right__count') as Element;
const searchMessage: HTMLElement = document.querySelector('.balls__message') as HTMLElement;
const search: HTMLInputElement = document.querySelector('.search__scope') as HTMLInputElement;

countBall.innerHTML = '0';
class Model {
  // readonly utils: Utils;
  // constructor() {
  //   // this.utils = new Utils();
  // }
  static async callData(url: string): Promise<IData[]> {
    return fetch(url).then((data): Promise<IData[]> => data.json());
  }

  static getData(url: string): Promise<IData[]> {
    return this.callData(url);
  }

  static getPressCard = (index: number) => {
    if (ballsArray.includes(index)) {
      ballsArray = ballsArray.filter((ball) => ball !== index);
    } else if (ballsArray.length < 20) {
      ballsArray.push(index);
    } else {
      console.log('у вас много шаров');
    }
    return ballsArray.length;
  };

  static getTypeOfSort(type: string | null, data: IData[]) {
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

  static getTypeOfSortByValue(type: SortProperty, data: IData[]) {
    return Utils.sort(type, data);
  }

  static getRangeValues(values: string[], data: IData[], type: string): IData[] {
    if (type === 'year') {
      return Utils.sortByRangeYear(values, data);
    }
    if (type === 'count') {
      return Utils.sortByRangeCount(values, data);
    }
    return data;
  }

  static search() {}

  static searchChanges(input: HTMLInputElement) {
    input.addEventListener('keyup', Model.filterCards);
  }

  static filterCards(): void {
    const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.balls__body');
    const value: string = search.value.toLowerCase();

    cards.forEach((item) => {
      const cardTitle: HTMLElement = item.children[0] as HTMLElement;
      const card: HTMLElement = item;
      if (cardTitle.innerHTML.toLowerCase().indexOf(value) > -1) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });

    // подумать по поводу сообщения
    // if (!document.querySelectorAll('.balls__body').length) {
    //   searchMessage.innerHTML = 'нет';
    // }
  }
}

export default Model;
