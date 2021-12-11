/* eslint-disable import/no-cycle */

import { IData, SortProperty } from './controller';
import Utils from './utilits';

let ballsArray: number[] = [];

export const countBall: Element = document.querySelector('.right__count') as Element;
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
    if (type.type === 'form') {
      return Utils.sortByForm(type.name, data);
    }
    console.log(type.type);
    if (type.type === 'color') {
      return Utils.sortByColor(type.name, data);
    }
    if (type.type === 'size') {
      return Utils.sortBySize(type.name, data);
    }
    return [];
  }
}

export default Model;
