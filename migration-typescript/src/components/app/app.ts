import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ISources, IDate } from '../view/appView';

// export type Callback = () => void;

class App {
    readonly controller: AppController;
    readonly view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        document
            .querySelector('.sources')
            ?.addEventListener('click', (e: Event): void =>
                this.controller.getNews(e, (data: IDate): void => this.view.drawNews(data))
            );
        this.controller.getSources((data: ISources): void => this.view.drawSources(data));
    }
}

export default App;
