// eslint-disable-next-line import/no-cycle
import sliderReset from './uislider';
// eslint-disable-next-line import/no-cycle
import Controller from './controller';
import { IData, SliderValues, SortProperty } from './interfases';

type CommonSort = {
  [key: string]: string[];
};

let countFilters = 0;

let typeArr: CommonSort = {
  form: [],
  color: [],
  size: [],
  favorite: [],
  year: [],
  count: [],
};

const getLocaleStorage = localStorage.getItem('filters');
if (getLocaleStorage) {
  typeArr = JSON.parse(getLocaleStorage);
  // добавление классов нажатым кнопкам
  const allFilterBtn: NodeListOf<HTMLElement> = document.querySelectorAll('[data-filter]');
  const sliderValues: SliderValues = {};
  Object.entries(typeArr).forEach((item) => {
    if (item[0] === 'form' || item[0] === 'size') {
      item[1].forEach((property) => {
        allFilterBtn.forEach((btn) => {
          if (btn.dataset.filter === property) {
            btn.classList.add('form__active');
          }
        });
      });
    } else if (item[0] === 'color' || item[0] === 'favorite') {
      item[1].forEach((property) => {
        allFilterBtn.forEach((btn) => {
          if (btn.dataset.filter === property) {
            btn.classList.add('color__active');
          }
        });
      });
    } else {
      const type = item[0];
      const params = item[1].slice(1).map(parseFloat);
      sliderValues[type] = params;
    }

    console.log(item);
  });
  // слайдер не успевает подгрузиться
  const initValue = () => {
    sliderReset(sliderValues);
  };
  setTimeout(initValue, 200);
}
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

  static getTypeFilters() {
    return typeArr;
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

    Controller.setLocaleStorage('filters', JSON.stringify(typeArr));

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
