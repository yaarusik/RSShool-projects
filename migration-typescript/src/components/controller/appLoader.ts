import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super(' https://nodenews.herokuapp.com/', {
            apiKey: 'b4d44c5499ce43c4820fa04a9598f1f0', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
