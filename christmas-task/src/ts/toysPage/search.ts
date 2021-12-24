export const search: HTMLInputElement = document.querySelector('.search__scope') as HTMLInputElement;
const searchAfter: HTMLElement = document.querySelector('.search__after') as HTMLElement;

// нужно вызывать методы прослушки элементов и всё
class Search {
  // поиск карточек через input
  static filterCards(): void {
    const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.balls__body');
    const cardsMessage: HTMLElement = document.querySelector('.cards__message') as HTMLElement;
    const before = document.querySelector('.search__before');
    const after = document.querySelector('.search__after');
    let countHide = 0;
    const value: string = search.value.trim().toLowerCase();
    if (!value.length) {
      after?.classList.remove('right__close');
      before?.classList.add('right__loup');
    } else {
      after?.classList.add('right__close');
      before?.classList.remove('right__loup');
    }

    cards.forEach((item) => {
      const cardTitle: HTMLElement = item.children[1] as HTMLElement;
      const card: HTMLElement = item;
      if (cardTitle.innerHTML.toLowerCase().indexOf(value) > -1) {
        card.classList.remove('anime');
        card.classList.remove('hide');
        countHide -= 1;
      } else {
        card.classList.add('anime');
        countHide += 1;
      }
    });

    cards.forEach((card) => {
      card.addEventListener('transitionend', () => {
        if (card.classList.contains('anime')) {
          card.classList.add('hide');
        }
      });
    });

    if (countHide > cards.length - 1) {
      cardsMessage.textContent = 'К сожалению, совпадений не обнаружено';
    } else {
      cardsMessage.textContent = '';
    }
  }

  static deleteValue = () => {
    search.value = '';
    const event = new Event('input');
    search.dispatchEvent(event);
  };
}
searchAfter.addEventListener('click', Search.deleteValue);

export default Search;
