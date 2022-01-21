import News from './news/news';
import Sources from './sources/sources';

export type DataArticle = {
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
    sources: IOrigin[];
}

export interface IData {
    status: string;
    totalResults: number;
    articles: DataArticle[];
}

export interface IOrigin {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export class AppView {
    readonly news: News;
    readonly sources: Sources;
    constructor () {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: IData): void {
        const values: DataArticle[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: ISources): void {
        const values: IOrigin[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
