import Model from './toysPage/components/model';
import Controller from './toysPage/components/controller';
import { ChristmasToy } from './interfases';
import { getDataFromEntry } from './treePage/treeElements/favoriteToys';

(async () => {
  try {
    const balls: ChristmasToy[] = await Model.getData(
      'https://raw.githubusercontent.com/yaarusik/stage1-tasks/christmas-task/christmas.json'
      // '../assets/christmas.json'
    );

    Controller.getDataFromEntry(balls);
    getDataFromEntry(balls);
    const selectValue = Controller.getSelectValue();
    const sortData = Model.getTypeOfSort(selectValue, balls);
    Controller.renderBalls(sortData);
    Controller.searchFilter();
  } catch (e) {
    console.log(e.message);
  }
})();
