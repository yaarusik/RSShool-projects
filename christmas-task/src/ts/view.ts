// eslint-disable-next-line import/no-cycle
import { IData } from './controller';
// eslint-disable-next-line import/no-cycle
import Model, { countBall } from './model';

class View {
  static renderBalls(data: IData[]): void {
    const ballsTemplate: string[] = [];
    data.forEach((item): void => {
      const template = `
      <div class="balls__body">
      <h2 class="balls__title">${item.name}</h2>
      <div class="balls__column">
        <div class="balls__toy">
          <img class="balls__img" src="./assets/images/toys/${item.num}.png" alt="toy" />
        </div>
        <div class="balls__description">
          <div class="balls__count balls__text">Количество: ${item.count}</div>
          <div class="balls__year balls__text">Год покупки: ${item.year}</div>
          <div class="balls__form balls__text">Форма: ${item.shape}</div>
          <div class="balls__color balls__text">Цвет: ${item.color}</div>
          <div class="balls__size balls__text">Размер: ${item.size}</div>
          <div class="balls__favorite balls__text">Любимая: ${item.favorite}</div>
        </div>
      </div>
      <div class="ribbon"></div>
    </div>`;
      ballsTemplate.push(template);
    });
    const ballsElement: HTMLDivElement = document.querySelector('.balls') as HTMLDivElement;
    ballsElement.innerHTML = ballsTemplate.join('');
    this.renderCardsIndicator();
  }

  static changeRibbonColor(element: Element): void {
    element.children[2]?.classList.toggle('card__active');
  }

  static renderCardCount(index: number): void {
    countBall.innerHTML = `${index}`;
  }

  // Исправить не должно быть обращения к Model
  static renderCardsIndicator(): void {
    const ballsBody: NodeListOf<Element> = document.querySelectorAll('.balls__body');
    ballsBody.forEach((item: Element, index: number): void => {
      item.addEventListener('click', (): void => {
        this.changeRibbonColor(item);
        const count: number = Model.getPressCard(index);
        this.renderCardCount(count);
      });
    });
  }
}

export default View;
