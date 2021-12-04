import './sources.css';
import { ISourcesArray } from './../appView';

class Sources {
    draw(data: ISourcesArray[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');

        data.forEach((item: Pick<ISourcesArray, 'id' | 'name'>): void => {
            const sourceClone: HTMLTemplateElement = <HTMLTemplateElement>sourceItemTemp.content.cloneNode(true);

            (<HTMLTemplateElement>sourceClone.querySelector('.source__item-name')).textContent = item.name;
            (<HTMLTemplateElement>sourceClone.querySelector('.source__item')).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });
        if (document.querySelector('.sources')?.textContent === '') {
            document.querySelector('.sources')?.append(fragment);
        }
    }
}

export default Sources;
