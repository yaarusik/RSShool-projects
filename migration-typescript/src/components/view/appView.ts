import News from './news/news';
import Sources from './sources/sources';

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

export interface IDate {
    status: string;
    totalResults: number;
    articles: DataArticles[];
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
    readonly news: News;
    readonly sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: IDate): void {
        const values: DataArticles[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: ISources): void {
        type NewType = ISourcesArray[];

        const values: NewType = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
