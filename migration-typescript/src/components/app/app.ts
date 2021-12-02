import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { DataArticles } from './../view/appView';
import { ISources } from '../view/appView';

export type Callback = () => void;

export interface IDate {
    status: string;
    totalResults: number;
    articles: DataArticles[];
    // { [key: string]: string | null | { [key: string]: string | null } }[]
}

class App {
    private controller: AppController;
    private view: AppView;
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
        this.controller.getSources((data: ISources) => this.view.drawSources(data));
    }
}

export default App;
