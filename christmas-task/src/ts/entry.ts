// eslint-disable-next-line import/no-named-as-default
import Model from './model';
import Controller from './controller';
import { IData } from './interfases';

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
