type GetRespT = {
    endpoint: string;
    options?: Record<string, unknown>;
};

type OptionsLoad = {
    sources: string;
    apiKey: string;
};

enum Method {
    GET = 'GET',
    POST = 'POST',
}

export type Callback<T> = (data: T) => void;

class Loader {
    constructor(private baseLink: string, private options: Partial<OptionsLoad>) {}

    public getResp<T>(
        { endpoint, options = {} }: GetRespT,
        callback: Callback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(Method.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Partial<OptionsLoad>, endpoint: string): string {
        const urlOptions: { [key: string]: string } = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach(function (key: string): void {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: string, endpoint: string, callback: Callback<T>, options: Partial<OptionsLoad>): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => <Promise<T>>res.json())
            .then((data: T): void => callback(data))
            .catch((err: Error): void => console.error(err));
    }
}

// type LoadParams = {
//     method: string;
//     endpoint: string;
//     callback: Callback<T>;
//     options: {};
// }

export default Loader;
