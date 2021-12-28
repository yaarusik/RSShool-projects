import { IData } from '../interfases';
import addImgEvents, { saveParents } from './dragAndDrop';

let toysData: IData[] = [];
let favoriteCards: number[] = [];
const favoriteCardsContainer: NodeListOf<HTMLElement> = document.querySelectorAll('.toys__ticket');

const filterToysData = (favorite: number[], toys: IData[]) => {
  return toys.filter((card) => favorite.includes(+card.num));
};

const createCardsImg = (counter: number, card: IData, index: number) => {
  const allIndeticalImg: HTMLElement[] = [];
  for (let i = 0; i < counter; i += 1) {
    const img = new Image();
    img.src = `./assets/images/toys/${card.num}.png`;
    img.className = 'favorite__img';
    img.draggable = true;
    img.id = `${index}-${i}`;
    addImgEvents(img);
    allIndeticalImg.push(img);
  }
  return allIndeticalImg;
};

const createCardCount = (card: IData) => {
  const cardCount = document.createElement('div');
  cardCount.className = 'favorite__count';
  if (card) cardCount.textContent = `${card.count}`;
  return cardCount;
};

const createToysCards = (cards: IData[]) => {
  favoriteCardsContainer.forEach((container, index) => {
    const cardsParent = container;
    cardsParent.innerHTML = ``;

    const card: IData = <IData>cards[index];
    if (card) {
      const cardCount = createCardCount(card);

      const allIndeticalImg = createCardsImg(Number(card.count), card, index);

      const allElements = [cardCount, ...allIndeticalImg];

      allElements.forEach((item) => {
        container.append(item);
      });
      saveParents(container);
    }
  });
};

export const appendToysCards = (favorite: number[], toys: IData[]) => {
  let cards;
  if (favorite.length === 0) {
    cards = toys.slice(0, 20);
  } else {
    cards = filterToysData(favorite, toys);
  }
  createToysCards(cards);
};

export const getDataFromEntry = (dataBalls: IData[]): void => {
  toysData = dataBalls;
  appendToysCards(favoriteCards, toysData);
};

export const getFavoriteCards = (cardsNumber: number[]) => {
  favoriteCards = cardsNumber;
};
