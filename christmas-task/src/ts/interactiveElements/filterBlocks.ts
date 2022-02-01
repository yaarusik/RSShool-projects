import Controller from '../components/controller';
import { SortProperty } from '../interfases';

const mainFormBlock: HTMLElement = document.querySelector('.form__sort .value__form-icons') as HTMLElement;
const mainColorBlock: HTMLElement = document.querySelector('.value__color .value__form-icons') as HTMLElement;
const mainSizeBlock: HTMLElement = document.querySelector('.value__size .value__size-icons') as HTMLElement;
const mainFavoriteBlock: HTMLElement = document.querySelector('.value__favorite .value__ok') as HTMLElement;

const blocks = [
  {
    block: mainFormBlock,
    class: 'value__form-img',
    addClass: 'form__active',
  },
  {
    block: mainColorBlock,
    class: 'value__form-cube',
    addClass: 'color__active',
  },
  {
    block: mainSizeBlock,
    class: 'size__option',
    addClass: 'form__active',
  },
  {
    block: mainFavoriteBlock,
    class: 'value__checkbox',
    addClass: 'color__active',
  },
];

blocks.forEach((block) => {
  block.block.addEventListener('click', (e: Event): void => {
    const button: HTMLElement = e.target as HTMLElement;
    if (button.classList.contains(block.class)) {
      button.classList.toggle(block.addClass);
      const target: SortProperty = {};
      Controller.filterCards(target, button);
    }
  });
});
