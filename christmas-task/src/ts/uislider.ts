import * as noUiSlider from 'nouislider';

// interface Instance extends HTMLElement {
//     noUiSlider: noUiSlider;
// }

document.addEventListener('DOMContentLoaded', () => {
  const countSlider = document.querySelector('#ui') as HTMLElement;
  if (countSlider !== null) {
    noUiSlider.create(countSlider, {
      start: [1, 12],
      tooltips: true,
      connect: true, // нужно ли красить полоску
      step: 1,
      range: {
        min: 1,
        max: 12,
      },
    });
    // countSlider.noUiSlider.on('update', () => {});
  }
});
