// eslint-disable-next-line import/no-cycle
import { IData, SortProperty } from './controller';

// type Name = Pick<IData, 'name'>;

interface IFiltersType {
  shape: Shape;
  color: Color;
  size: Size;
  favorite: boolean;
}

type Shape = {
  sphere: boolean;
  bell: boolean;
  cone: boolean;
  figure: boolean;
  snowflake: boolean;
};
type Color = {
  yellow: boolean;
  red: boolean;
  blue: boolean;
  green: boolean;
  white: boolean;
};

type Size = {
  big: boolean;
  medium: boolean;
  small: boolean;
};

const filtersCheck: IFiltersType = {
  shape: { sphere: false, bell: false, cone: false, figure: false, snowflake: false },
  color: { yellow: false, red: false, blue: false, green: false, white: false },
  size: { big: false, medium: false, small: false },
  favorite: false,
};

type CommonSort = {
  [key: string]: string[];
}


let typeArr: CommonSort = {
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
    const property: string = sortProperty.name as string;
    const type: string = sortProperty.type as string;

// создаем карточку
    const cardsResult: IData[] = [];
    console.log(typeArr[type], type);
    // проверяем какие уже нажаты
    if(type){
      if (!typeArr[type]?.includes(property)) {
        typeArr[type]?.push(property);
      } else {
        typeArr[type] = typeArr[type]?.filter(item => item !== property) as string[]; 
      }
    }
    console.log(typeArr);
    // формируем карточки
    // должны проходить не только по одному массиву, а сразу несколько
    // запустили 1 массив передали data получили 1 порцию карточек
    // запустили 2 массив передали 1порцию карточек получили 
   
    // let newTypeArr: string[][] = Object.values(typeArr);
    // const saveArr = []
    // console.log(newTypeArr);
    // let filterData : IData[];
    // newTypeArr.forEach(type =>{
    //   type.forEach(params =>  {
    //     if(params.length === 0) {
    //       return false;
    //     }
    //   filterData =  data.filter(card => {
    //           if(card.shape === params || card.color === params || card.size === params || String(card.favorite) === params) {
    //             return card;
    //           } 
    //           return false;
    //         })
            
    //   })
    //   saveArr.push(filterData);
    // })
    // console.log(saveArr);
    typeArr[type]?.forEach(type => {
    
      console.log(type);
      const filterData: IData[] =  data.filter(card => {
        if(card.shape === type || card.color === type || card.size === type || String(card.favorite) === type) {
          return card;
        } 
        return false;
      })
      cardsResult.push(...filterData);
    });
    console.log(cardsResult);
    // сортируем по порядку
    cardsResult.sort((a,b): number=> +a.num - +b.num);
    console.log(cardsResult);
    
    return typeArr[type]?.length === 0 ? data: cardsResult;
  }

  // static sortByColor(type: string | null | undefined, data: IData[]): IData[] {
  //   const sourse: IData[] = data.filter((item) => {
  //     if (item.color === type) {
  //       return item;
  //     }
  //     return false;
  //   });
  //   console.log(sourse);
  //   return sourse;
  // }

  // static sortBySize(type: string | null | undefined, data: IData[]): IData[] {
  //   const sourse: IData[] = data.filter((item) => {
  //     if (item.size === type) {
  //       return item;
  //     }
  //     return false;
  //   });
  //   console.log(sourse);
  //   return sourse;
  // }

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
