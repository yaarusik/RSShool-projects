// eslint-disable-next-line import/no-named-as-default
import Model from './model';
import Controller from './controller';
import { IData } from '../interfases';

(async () => {
  try {
    const balls: IData[] = await Model.getData(
      'https://raw.githubusercontent.com/yaarusik/stage1-tasks/christmas-task/christmas.json'
      // '../assets/christmas.json'
    );

    Controller.getDataFromEntry(balls);
    const selectValue = Controller.getSelectValue();
    const sortData = Model.getTypeOfSort(selectValue, balls);
    Controller.renderBalls(sortData);
    Controller.searchFilter();
  } catch (e) {
    console.log(e.message);
  }
})();

console.log(`Score: 212 / 200

Страница с игрушками содержит карточки всех игрушек а также фильтры, строку поиска, поле для сортировки. Выполняются требования к вёрстке +10
Карточка игрушки содержит её изображение, название, текстом или условным значком обозначено количество экземпляров, год покупки, форма, цвет, размер, является ли игрушка любимой +10
Добавление игрушек в избранное +20
Сортировка +20
Фильтры в указанном диапазоне от и до +30
Фильтры по значению +30
Можно отфильтровать игрушки по нескольким фильтрам разного типа +20
Сброс фильтров +20
Сохранение настроек в local storage +10
Поиск +30
Дополнительный функционал на выбор +12:
релизованы 2 разные анимации появления карточек при нажатия на фильтры и сортировку одна анимация, при поиске другая + 10
интерактивные элементы на странице +2`);
