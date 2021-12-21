/* eslint-disable import/no-named-as-default */
import { IData } from '../interfases';

// eslint-disable-next-line import/no-cycle
import Model from './model';

export const countBall: Element = document.querySelector('.right__count') as Element;

countBall.innerHTML = localStorage.getItem('favoritesCount') || '0';
let lengthFavorite = 0;
class View {
  static renderBalls(data: IData[] | string): void {
    localStorage.setItem('currentData', JSON.stringify(data));
    const ballsElement: HTMLDivElement = document.querySelector('.balls') as HTMLDivElement;
    const ballsTemplate: string[] = [];

    switch (typeof data) {
      case 'string': {
        ballsElement.innerHTML = `${data}`;
        break;
      }
      default: {
        data.forEach((item): void => {
          let favorite: string;
          if (!item.favorite) {
            favorite = 'Нет';
          } else {
            favorite = 'Да';
          }
          const template = `
          <div class="balls__body" data-num="${item.num}">
          <div class="msg"></div>
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
              <div class="balls__favorite balls__text">Любимая: ${favorite}</div>
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
  }

  static changeRibbonColor(element: Element, change: string): void {
    switch (change) {
      case 'add': {
        element.children[3]?.classList.add('card__active');
        break;
      }
      default: {
        element.children[3]?.classList.remove('card__active');
      }
    }
  }

  static renderCardCount(index: number): void {
    countBall.innerHTML = `${index}`;
    localStorage.setItem('favoritesCount', JSON.stringify(index));
  }

  // отрисовываем цвет нажатым карточкам
  static renderRibbon(active: number): string {
    const activeCards: number[] = Model.getActiveCards();
    if (activeCards?.includes(active)) {
      return `<div class="ribbon card__active"></div>`;
    }
    return `<div class="ribbon"></div>`;
  }

  static renderCardsIndicator(): void {
    const ballsBody: NodeListOf<HTMLDivElement> = document.querySelectorAll('.balls__body');
    ballsBody.forEach((item: HTMLDivElement, index: number): void => {
      item.addEventListener('click', (): void => {
        const cardNum = item.dataset.num;
        if (typeof cardNum === 'string') {
          // запоминаю нажатые карточки
          lengthFavorite = Model.getPressCard(+cardNum, item, index);
          // отображаю количество зажатых
          this.renderCardCount(lengthFavorite);
        }
      });
      setTimeout(() => {
        item.classList.add('balls__visible');
      }, 80 * index);
    });
  }
}

export default View;
