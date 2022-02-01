import { ChristmasToy } from '../../interfases';
import addImgEvents, { saveParents } from '../interactiveElements/dragAndDrop';

let toysData: ChristmasToy[] = [];
let favoriteCards: number[] = [];
const favoriteCardsContainer: NodeListOf<HTMLElement> = document.querySelectorAll('.toys__ticket');

const filterToysData = (favorite: number[], toys: ChristmasToy[]) => {
  return toys.filter((card) => favorite.includes(+card.num));
};

const createCardsImg = (counter: number, card: ChristmasToy, index: number) => {
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

const createCardCount = (card: ChristmasToy) => {
  const cardCount = document.createElement('div');
  cardCount.className = 'favorite__count';
  if (card) cardCount.textContent = `${card.count}`;
  return cardCount;
};

const createToysCards = (cards: ChristmasToy[]) => {
  favoriteCardsContainer.forEach((container, index) => {
    const cardsParent = container;
    cardsParent.innerHTML = ``;

    const card: ChristmasToy = <ChristmasToy>cards[index];
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

export const appendToysCards = (favorite: number[], toys: ChristmasToy[]) => {
  let cards;
  if (favorite.length === 0) {
    cards = toys.slice(0, 20);
  } else {
    cards = filterToysData(favorite, toys);
  }
  createToysCards(cards);
};

export const getDataFromEntry = (dataBalls: ChristmasToy[]): void => {
  toysData = dataBalls;
  appendToysCards(favoriteCards, toysData);
};

export const getFavoriteCards = (cardsNumber: number[]) => {
  favoriteCards = cardsNumber;
};
