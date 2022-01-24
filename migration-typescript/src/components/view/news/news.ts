import { Template } from 'webpack';
import './news.css';
import { DataArticle } from './../appView';

class News {
    public draw(data: DataArticle[]): void {
        const news: DataArticle[] =
            data.length >= 10 ? data.filter((_item: DataArticle, idx: number): boolean => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#newsItemTemp');

        if (newsItemTemp) {
            news.forEach((item: DataArticle, idx: number): void => {
                const newsClone: HTMLTemplateElement = <HTMLTemplateElement>newsItemTemp.content.cloneNode(true);

                if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

                (<HTMLElement>newsClone.querySelector('.news__meta-photo')).style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'
                    })`;

                (<HTMLElement>newsClone.querySelector('.news__meta-author')).textContent =
                    item.author || item.source.name;
                (<HTMLElement>newsClone.querySelector('.news__meta-date')).textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');

                (<HTMLElement>newsClone.querySelector('.news__description-title')).textContent = item.title;
                (<HTMLElement>newsClone.querySelector('.news__description-source')).textContent = item.source.name;
                (<HTMLElement>newsClone.querySelector('.news__description-content')).textContent = item.description;
                (<HTMLElement>newsClone.querySelector('.news__read-more a')).setAttribute('href', item.url);

                fragment.append(newsClone);
            });

            (<HTMLElement>document.querySelector('.news')).innerHTML = '';
            document.querySelector('.news')?.appendChild(fragment);
        }
    }
}

export default News;
