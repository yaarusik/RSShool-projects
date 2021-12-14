// eslint-disable-next-line import/no-cycle
import { IData, SortProperty } from './controller';

// type Name = Pick<IData, 'name'>;

// interface IFiltersType {
//   shape: Shape;
//   color: Color;
//   size: Size;
//   favorite: boolean;
// }

// type Shape = {
//   sphere: boolean;
//   bell: boolean;
//   cone: boolean;
//   figure: boolean;
//   snowflake: boolean;
// };
// type Color = {
//   yellow: boolean;
//   red: boolean;
//   blue: boolean;
//   green: boolean;
//   white: boolean;
// };

// type Size = {
//   big: boolean;
//   medium: boolean;
//   small: boolean;
// };

// const filtersCheck: IFiltersType = {
//   shape: { sphere: false, bell: false, cone: false, figure: false, snowflake: false },
//   color: { yellow: false, red: false, blue: false, green: false, white: false },
//   size: { big: false, medium: false, small: false },
//   favorite: false,
// };

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
    const sourse: IData[] = data;
    sourse.sort((a, b): number => {
      return a.name > b.name ? 1 : -1;
    });
    return sourse;
  }

  static sortNameMin(data: IData[]): IData[] {
    const sourse: IData[] = data;
    sourse.sort((a, b): number => {
      return a.name < b.name ? 1 : -1;
    });
    return sourse;
  }

  static sortCountMax(data: IData[]): IData[] {
    const sourse: IData[] = data;
    sourse.sort((a, b): number => {
      return +a.count - +b.count;
    });
    return sourse;
  }

  static sortCountMin(data: IData[]): IData[] {
    const sourse: IData[] = data;
    sourse.sort((a, b): number => {
      return +b.count - +a.count;
    });
    return sourse;
  }

  // разбить функцию одна задача одна функция
  static sort(sortProperty: SortProperty, data: IData[]): IData[] {
    let sourse: IData[] = data;
    const property: string = sortProperty.name as string;
    const type: string = sortProperty.type as string;

    if (type) {
      if (!typeArr[type]?.includes(property)) {
        typeArr[type]?.push(property);
      } else {
        typeArr[type] = typeArr[type]?.filter((item): boolean => item !== property) as string[];
      }
    }

    type ReturnFunction = {
      (): false | IData;
    };

    const newTypeArr: string[][] = Object.values(typeArr);
    console.log(`new ${newTypeArr}`);

    newTypeArr.forEach((tips): void => {
      const cardsResult: IData[] = [];
      if (tips.length) {
        let cardsCollection: IData[] = [];
        tips.forEach((item): void => {
          cardsCollection = sourse.filter((card) => {
            if (card.shape === item || card.color === item || card.size === item || String(card.favorite) === item) {
              return card;
            }
            return false;
          });
          cardsResult.push(...cardsCollection);
        });
        sourse = cardsResult;
      }
    });

    return sourse.length === 0 ? data : sourse;
  }

  static sortByRangeCount(values: string[], data: IData[]): IData[] {
    if (!data) {
      return [];
    }
    const [leftOuput, rightOuput] = values;
    const sourse: IData[] = data.filter((item) => {
      if (+item.count >= +leftOuput! && +item.count <= +rightOuput!) {
        return item;
      }
      return false;
    });
    console.log(sourse);
    return sourse;
  }

  static sortByRangeYear(values: string[], data: IData[]): IData[] {
    if (!data) {
      return [];
    }
    const [leftOuput, rightOuput] = values;
    const sourse: IData[] = data.filter((item) => {
      if (+item.year >= +leftOuput! && +item.year <= +rightOuput!) {
        return item;
      }
      return false;
    });
    console.log(sourse);
    return sourse;
  }
}

export default Utils;
