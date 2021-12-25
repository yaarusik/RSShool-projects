import { appendToysCards } from './favoriteToys';
import Controller from '../toysPage/controller';

// let isEnable = false;

const pages = {
  home: {
    page: <HTMLElement>document.querySelector('.main__page'),
    btn: document.querySelectorAll('.navigation__icon'),
  },
  toys: {
    page: <HTMLElement>document.querySelector('.toys__page'),
    btn: document.querySelectorAll('.navigation__toys'),
  },
  tree: {
    page: <HTMLElement>document.querySelector('.tree__page'),
    btn: document.querySelectorAll('.navigation__tree'),
  },
};

const getRouteInfo = () => {
  return window.location.hash ? window.location.hash.slice(1) : '';
};

// const updateFavoriteCards = () => {
//   const activeFromStorage = localStorage.getItem('favoriteCards');
//   let activeCards;
//   if (activeFromStorage) {
//     activeCards = JSON.parse(activeFromStorage);
//   } else {
//     activeCards = [];
//   }
//   const currentData = Controller.getCurrentData();

//   appendToysCards(activeCards, currentData);
// };

const hundleHash = () => {
  const currentPage = getRouteInfo();

  Object.entries(pages).forEach((page) => {
    if (page[0] !== currentPage) {
      page[1].page.classList.add('page__hide');
      page[1].btn.forEach((btn) => {
        btn.classList.remove('btn__show');
      });
    } else {
      page[1].page.classList.remove('page__hide');
      page[1].btn.forEach((btn) => {
        btn.classList.add('btn__show');
      });
    }
  });
  // if (isEnable) updateFavoriteCards();
  // isEnable = true;
};

const init = () => {
  window.addEventListener('hashchange', hundleHash);
};

hundleHash();
init();
