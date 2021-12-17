import Model from './model';
import Controller from './controller';
import { IData } from './interfases';

const search: HTMLInputElement = document.querySelector('.search__scope') as HTMLInputElement;

search.focus();

(async () => {
  try {
    // const toysController: Controller = new Controller();
    // const toysModel: Model = new Model();
    // const toysView: View = new View();
    const balls: IData[] = await Model.getData(
      // 'https://raw.githubusercontent.com/yaarusik/stage1-tasks/christmas-task/christmas.json'
      '../assets/christmas.json'
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
