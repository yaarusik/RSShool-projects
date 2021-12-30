import './sources.css';
import { IOrigin } from './../appView';

class Sources {
    draw(data: IOrigin[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');

        data.forEach((item: IOrigin): void => {
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
