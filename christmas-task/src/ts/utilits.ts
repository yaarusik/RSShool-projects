// eslint-disable-next-line import/no-cycle
import { IData, SortProperty } from './interfases';

type CommonSort = {
  [key: string]: string[];
};

const typeArr: CommonSort = {
  form: [],
  color: [],
  size: [],
  favorite: [],
};

class Utils {
  static sortNameMax(data: IData[]) {
    const source: IData[] = data;
    source.sort((a, b): number => {
      return a.name > b.name ? 1 : -1;
    });
    return source;
  }

  static sortNameMin(data: IData[]): IData[] {
    const source: IData[] = data;
    source.sort((a, b): number => {
      return a.name < b.name ? 1 : -1;
    });
    return source;
  }

  static sortCountMax(data: IData[]): IData[] {
    const source: IData[] = data;
    source.sort((a, b): number => {
      return +a.count - +b.count;
    });
    return source;
  }

  static sortCountMin(data: IData[]): IData[] {
    const source: IData[] = data;
    source.sort((a, b): number => {
      return +b.count - +a.count;
    });
    return source;
  }

  // разбить функцию одна задача одна функция
  static sort(sortProperty: SortProperty, data: IData[]): IData[] {
    let source: IData[] = data;
    const property: string = sortProperty.name as string;
    const type: string = sortProperty.type as string;
    // запоминаем нажатые фильтры
    if (type) {
      if (!typeArr[type]?.includes(property)) {
        typeArr[type]?.push(property);
      } else {
        typeArr[type] = typeArr[type]?.filter((item): boolean => item !== property) as string[];
      }
    }

    const newTypeArr: string[][] = Object.values(typeArr);

    newTypeArr.forEach((tips): void => {
      const cardsResult: IData[] = [];
      if (tips.length) {
        let cardsCollection: IData[] = [];
        tips.forEach((item): void => {
          cardsCollection = source.filter((card) => {
            if (card.shape === item || card.color === item || card.size === item || String(card.favorite) === item) {
              return card;
            }
            return false;
          });
          cardsResult.push(...cardsCollection);
        });
        source = cardsResult;
      }
    });

    source.sort((a, b) => +a.num - +b.num);

    if (source.length === 0) {
      // сообщение
    }
    // тут не должны быть нажаты кнопки
    return source.length === 0 ? data : source;
  }

  static sortByRangeCount(values: string[], data: IData[]): IData[] {
    if (!data) {
      return [];
    }
    const [leftOuput, rightOuput] = values;
    const source: IData[] = data.filter((item) => {
      if (+item.count >= +leftOuput! && +item.count <= +rightOuput!) {
        return item;
      }
      return false;
    });
    console.log(source);
    return source;
  }

  static sortByRangeYear(values: string[], data: IData[]): IData[] {
    if (!data) {
      return [];
    }
    const [leftOuput, rightOuput] = values;
    const source: IData[] = data.filter((item) => {
      if (+item.year >= +leftOuput! && +item.year <= +rightOuput!) {
        return item;
      }
      return false;
    });
    console.log(source);
    return source;
  }
}

export default Utils;
