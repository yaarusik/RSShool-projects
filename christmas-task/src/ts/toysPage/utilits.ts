// eslint-disable-next-line import/no-cycle
import sliderReset from './uislider';
// eslint-disable-next-line import/no-cycle
import Controller from './controller';
import { IData, SliderValues, SortProperty, CommonSort } from '../interfases';

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
    const [typeFilter, filterValues] = item;
    switch (typeFilter) {
      case 'form':
      case 'size': {
        filterValues.forEach((property) => {
          allFilterBtn.forEach((btn) => {
            if (btn.dataset.filter === property) {
              btn.classList.add('form__active');
            }
          });
        });
        break;
      }
      case 'color':
      case 'favorite': {
        filterValues.forEach((property) => {
          allFilterBtn.forEach((btn) => {
            if (btn.dataset.filter === property) {
              btn.classList.add('color__active');
            }
          });
        });
        break;
      }
      default: {
        const params = filterValues.slice(1).map(parseFloat);
        sliderValues[typeFilter] = params;
      }
    }
  });
  // слайдер не успевает подгрузиться

  const initValue = () => {
    sliderReset(sliderValues);
  };
  setTimeout(initValue, 100);
}
class Utils {
  static sortNameMax(data: IData[]) {
    const source: IData[] = data;
    source.sort((a, b): number => (a.name > b.name ? 1 : -1));
    return source;
  }

  static sortNameMin(data: IData[]): IData[] {
    const source: IData[] = data;
    source.sort((a, b): number => (a.name < b.name ? 1 : -1));
    return source;
  }

  static getTypeFilters() {
    return typeArr;
  }

  static sortCountMax(data: IData[]): IData[] {
    const source: IData[] = data;
    source.sort((a, b): number => +a.year - +b.year);
    return source;
  }

  static sortCountMin(data: IData[]): IData[] {
    const source: IData[] = data;
    source.sort((a, b): number => +b.year - +a.year);
    return source;
  }

  static checkFilters(type: string, property: string) {
    const types = typeArr[type];
    if (!types?.includes(property)) {
      types?.push(property);
      countFilters += 1;
    } else {
      typeArr[type] = types?.filter((item): boolean => item !== property) as string[];
      countFilters -= 1;
    }
  }

  static unionFilter(currentData: IData[]): IData[] {
    let source: IData[] = currentData;
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
    return source;
  }

  static filter(sortProperty: SortProperty, data: IData[]): IData[] | string {
    const source: IData[] = data;
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
    const dataAfterFilters = this.unionFilter(source);
    // сортируем в исходном порядке
    dataAfterFilters.sort((a, b) => +a.num - +b.num);

    if (dataAfterFilters.length === 0) {
      return 'Извините, совпадений не обнаружено';
    }
    return dataAfterFilters;
  }

  static filterByRangeCount(values: string[], data: IData[]): IData[] {
    const [type, min, max] = values;
    let source: IData[] = [];
    if (min && max) {
      source = data.filter((item) => +item.count >= +min && +item.count <= +max);
    }
    return source;
  }

  static filterByRangeYear(values: string[], data: IData[]): IData[] {
    const [type, min, max] = values;
    let source: IData[] = [];
    if (min && max) {
      source = data.filter((item) => +item.year >= +min && +item.year <= +max);
    }
    return source;
  }
}

export default Utils;
