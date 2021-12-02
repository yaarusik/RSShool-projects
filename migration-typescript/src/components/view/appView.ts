import News from './news/news';
import Sources from './sources/sources';
import { IDate } from './../app/app';

export type DataArticles = {
    source: { id: string | null; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

export interface ISources {
    status: string;
    sources: ISourcesArray[];
}

export interface ISourcesArray {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export class AppView {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IDate): void {
        const values: DataArticles[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ISources): void {
        const values: ISourcesArray[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
