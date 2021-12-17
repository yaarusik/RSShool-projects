// eslint-disable-next-line import/no-cycle
import { IData } from './interfases';
// eslint-disable-next-line import/no-cycle
import Model, { countBall } from './model';

let lengthFavorite = 0;
class View {
  static renderBalls(data: IData[] | string): void {
    const ballsElement: HTMLDivElement = document.querySelector('.balls') as HTMLDivElement;

    const ballsTemplate: string[] = [];
    if (typeof data === 'string') {
      ballsElement.innerHTML = `${data}`;
    } else {
      data.forEach((item): void => {
        const template = `
      <div class="balls__body" data-num="${item.num}">
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
      ${this.renderRibbon(+item.num)}
    </div>`;
        ballsTemplate.push(template);
      });
      ballsElement.innerHTML = ballsTemplate.join('');
      this.renderCardsIndicator();
    }
  }

  static changeRibbonColor(element: Element): void {
    element.children[2]?.classList.toggle('card__active');
  }

  static renderCardCount(index: number): void {
    countBall.innerHTML = `${index}`;
  }

  // отрисовываем цвет нажатым карточкам
  static renderRibbon(active: number): string {
    const activeCards: number[] = Model.getActiveCards();
    if (activeCards?.includes(active)) {
      return `<div class="ribbon card__active"></div>`;
    }
    return `<div class="ribbon "></div>`;
  }

  // // Исправить не должно быть обращения к Model
  static renderCardsIndicator(): void {
    const ballsBody: NodeListOf<HTMLDivElement> = document.querySelectorAll('.balls__body');
    ballsBody.forEach((item: HTMLDivElement): void => {
      item.addEventListener('click', (): void => {
        const cardNum = item.dataset.num;
        if (typeof cardNum === 'string') {
          lengthFavorite = Model.getPressCard(+cardNum);
          if (lengthFavorite < 3) {
            //  по клику добавляю класс с цветом если их не больше 20
            this.changeRibbonColor(item);
            // запоминаю нажатые карточки

            // отображаю количество зажатых
            this.renderCardCount(lengthFavorite);
          }
        }
      });
    });
  }
}
// добавлять активный класс избранным карточкам
export default View;
