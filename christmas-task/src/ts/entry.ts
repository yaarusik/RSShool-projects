import Model from './model';
import Controller, { IData } from './controller';
// eslint-disable-next-line import/no-named-as-default
import View from './view';

(async () => {
  try {
    // const toysController: Controller = new Controller();
    // const toysModel: Model = new Model();
    // const toysView: View = new View();
    const balls: IData[] = await Model.getData(
      'https://raw.githubusercontent.com/yaarusik/stage1-tasks/christmas-task/christmas.json'
    );

    Controller.getDataFromEntry(balls);

    View.renderBalls(balls);
  } catch (e) {
    console.log(e.message);
  }
})();
