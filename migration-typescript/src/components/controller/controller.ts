import AppLoader from './appLoader';
import { ISources, IData } from '../view/appView';
import { Callback } from './loader';

class AppController extends AppLoader {
    public getSources(callback: Callback<ISources>): void {
        super.getResp<ISources>({ endpoint: 'sources' }, callback);
    }

    public getNews(e: Event, callback: Callback<IData>): void {
        // т.к. событие не всегда наследуется от HTML елемента
        let target: Element = <Element>e.target;
        const newsContainer: Element = <Element>e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string = <string>target.getAttribute('data-source-id');

                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<IData>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = <Element>target.parentNode;
        }
    }
}

export default AppController;
