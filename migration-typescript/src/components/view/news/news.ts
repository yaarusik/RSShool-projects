import { Template } from 'webpack';
import './news.css';
import { DataArticles } from './../appView';

class News {
    draw(data: DataArticles[]): void {
        const news: DataArticles[] =
            data.length >= 10 ? data.filter((_item: DataArticles, idx: number): boolean => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        if (newsItemTemp) {
            news.forEach((item: DataArticles, idx: number) => {
                const newsClone: HTMLTemplateElement = newsItemTemp.content.cloneNode(true) as HTMLTemplateElement;

                if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

                if (newsClone) {
                    (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
                        item.urlToImage || 'img/news_placeholder.jpg'
                    })`;
                }

                (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent =
                    item.author || item.source.name;
                (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');

                (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title;
                (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name;
                (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description;
                (newsClone.querySelector('.news__read-more a') as HTMLElement).setAttribute('href', item.url);

                fragment.append(newsClone);
            });

            (document.querySelector('.news') as HTMLElement).innerHTML = '';
            document.querySelector('.news')?.appendChild(fragment);
        }
    }
}

export default News;
