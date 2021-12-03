import AppLoader from './appLoader';
import { IDate } from './../app/app';
import { ISources } from '../view/appView';
import { Callback } from './loader';
// export type CallbackNews = (data: IDate) => void;
// export type CallbackSources = (data: ISources) => void;

class AppController extends AppLoader {
    getSources(callback: Callback<ISources>): void {
        super.getResp<ISources>({ endpoint: 'sources' }, callback);
    }

    getNews(e: Event, callback: Callback<IDate>): void {
        // т.к. событие не всегда наследуется от HTML елемента(например может быть XMLYttpRequest)
        let target: Element = e.target as Element;
        const newsContainer: Element = e.currentTarget as Element;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id') || ''; //добавил пустую строку

                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<IDate>(
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
            target = target.parentNode as Element;
        }
    }
}

export default AppController;
