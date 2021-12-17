// eslint-disable-next-line import/no-cycle
import { IData, SortProperty } from './interfases';

type CommonSort = {
  [key: string]: string[];
};

let countFilters = 0;

export const typeArr: CommonSort = {
  form: [],
  color: [],
  size: [],
  favorite: [],
  year: [],
  count: [],
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

  static checkFilters(type: string, property: string) {
    if (!typeArr[type]?.includes(property)) {
      typeArr[type]?.push(property);
      countFilters += 1;
    } else {
      typeArr[type] = typeArr[type]?.filter((item): boolean => item !== property) as string[];
      countFilters -= 1;
    }
    console.log(countFilters);
  }

  // разбить функцию одна задача одна функция
  static filter(sortProperty: SortProperty, data: IData[]): IData[] | string {
    let source: IData[] = data;
    const type: string = sortProperty.type as string;

    switch (type) {
      case 'year':
      case 'count': {
        // обнуляем массив
        typeArr[type] = [type];
        const sliderValues: string[] = sortProperty.name as string[];
        sliderValues.forEach((item) => typeArr[type]?.push(item));
        countFilters += 1;
        break;
      }
      default: {
        const property: string = sortProperty.name as string;
        this.checkFilters(type, property);
      }
    }
    // если ни один фильтр не нажат
    if (!countFilters) {
      return data;
    }

    const newTypeArr: string[][] = Object.values(typeArr);
    newTypeArr.forEach((tips): void => {
      const cardsResult: IData[] = [];
      if (tips.length) {
        // сохраняем промежуточное значение
        let cardsCollection: IData[] = [];

        switch (tips[0]) {
          case 'year': {
            cardsCollection = this.filterByRangeYear(tips, source);
            cardsResult.push(...cardsCollection);
            break;
          }
          case 'count': {
            cardsCollection = this.filterByRangeCount(tips, source);
            cardsResult.push(...cardsCollection);
            break;
          }
          default: {
            tips.forEach((item): void => {
              cardsCollection = source.filter(
                (card) =>
                  card.shape === item || card.color === item || card.size === item || String(card.favorite) === item
              );
              cardsResult.push(...cardsCollection);
            });
          }
        }
        source = cardsResult;
      }
    });
    // сортируем в исходном порядке
    source.sort((a, b) => +a.num - +b.num);

    if (source.length === 0) {
      return 'Извините, совпадений не обнаружено';
      // ретурн сообщение что игрушек нет
    }
    // тут не должны быть нажаты кнопки
    return source;
  }

  static filterByRangeCount(values: string[], data: IData[]): IData[] {
    const [type, min, max] = values;
    let source: IData[] = [];
    if (min !== undefined && max !== undefined) {
      source = data.filter((item) => {
        if (+item.count >= +min && +item.count <= +max) {
          return item;
        }
        return false;
      });
    }

    return source;
  }

  static filterByRangeYear(values: string[], data: IData[]): IData[] {
    const [type, min, max] = values;
    let source: IData[] = [];
    if (min !== undefined && max !== undefined) {
      source = data.filter((item) => {
        if (+item.year >= +min && +item.year <= +max) {
          return item;
        }
        return false;
      });
    }

    return source;
  }
}

export default Utils;
