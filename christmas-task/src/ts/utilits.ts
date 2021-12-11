// eslint-disable-next-line import/no-cycle
import { IData, SortProperty } from './controller';

// type Name = Pick<IData, 'name'>;

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

  static sortByForm(type: string | null | undefined, data: IData[]): IData[] {
    const sourse: IData[] = data.filter((item) => {
      if (item.shape === type) {
        return item;
      }
      return false;
    });
    console.log(sourse);
    return sourse;
  }

  static sortByColor(type: string | null | undefined, data: IData[]): IData[] {
    const sourse: IData[] = data.filter((item) => {
      if (item.color === type) {
        return item;
      }
      return false;
    });
    console.log(sourse);
    return sourse;
  }

  static sortBySize(type: string | null | undefined, data: IData[]): IData[] {
    const sourse: IData[] = data.filter((item) => {
      if (item.size === type) {
        return item;
      }
      return false;
    });
    console.log(sourse);
    return sourse;
  }
}

export default Utils;
