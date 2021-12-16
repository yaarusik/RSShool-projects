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
    } else {
      typeArr[type] = typeArr[type]?.filter((item): boolean => item !== property) as string[];
    }
  }

  // разбить функцию одна задача одна функция
  static sort(sortProperty: SortProperty, data: IData[]): IData[] {
    let source: IData[] = data;
    const type: string = sortProperty.type as string;

    switch (type) {
      case 'year':
      case 'count': {
        // обнуляем массив
        typeArr[type] = [type];
        const sliderValues: string[] = sortProperty.name as string[];
        sliderValues.forEach((item) => typeArr[type]?.push(item));
        break;
      }
      default: {
        const property: string = sortProperty.name as string;
        this.checkFilters(type, property);
      }
    }

    console.log(typeArr);

    const newTypeArr: string[][] = Object.values(typeArr);
    newTypeArr.forEach((tips): void => {
      const cardsResult: IData[] = [];
      if (tips.length) {
        // сохраняем промежуточное значение
        let cardsCollection: IData[] = [];

        switch (tips[0]) {
          case 'year': {
            cardsCollection = this.sortByRangeYear(tips, source);
            cardsResult.push(...cardsCollection);
            break;
          }
          case 'count': {
            cardsCollection = this.sortByRangeCount(tips, source);
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
      // сообщение
    }
    // тут не должны быть нажаты кнопки
    return source.length === 0 ? data : source;
  }

  static sortByRangeCount(values: string[], data: IData[]): IData[] {
    if (!data) {
      return [];
    }
    const [type, leftOuput, rightOuput] = values;
    const source: IData[] = data.filter((item) => {
      if (+item.count >= +leftOuput! && +item.count <= +rightOuput!) {
        return item;
      }
      return false;
    });
    return source;
  }

  static sortByRangeYear(values: string[], data: IData[]): IData[] {
    if (!data) {
      return [];
    }
    const [type, leftOuput, rightOuput] = values;
    const source: IData[] = data.filter((item) => {
      if (+item.year >= +leftOuput! && +item.year <= +rightOuput!) {
        return item;
      }
      return false;
    });
    return source;
  }
}

export default Utils;
