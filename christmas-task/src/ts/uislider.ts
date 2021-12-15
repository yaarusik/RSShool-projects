import noUiSlider, { target } from 'nouislider';
import Controller from './controller';

const outputs: NodeListOf<HTMLElement> = document.querySelectorAll('.slider-output') as NodeListOf<HTMLElement>;

document.addEventListener('DOMContentLoaded', () => {
  const countSlider: target = <target>document.querySelector('.count-slider');
  const yearSlider: target = <target>document.querySelector('.year-slider');
  if (countSlider !== null) {
    noUiSlider.create(countSlider, {
      start: [1, 12],
      connect: true, // нужно ли красить полоску
      step: 1,
      range: {
        min: 1,
        max: 12,
      },
    });
    countSlider.noUiSlider?.on('update', (values: any) => {
      const [leftOutput, rightOutput] = values;
      if (leftOutput !== undefined && rightOutput !== undefined) {
        (outputs[0] as HTMLElement).innerHTML = `${parseInt(leftOutput, 10)}`;
        (outputs[1] as HTMLElement).innerHTML = `${parseInt(rightOutput, 10)}`;
      }

      Controller.getSliderValues(values, 'count');
    });
  }
  if (yearSlider !== null) {
    noUiSlider.create(yearSlider, {
      start: [1940, 2021],
      connect: true,
      behaviour: 'tap-drag',
      step: 10,
      range: {
        min: 1940,
        max: 2021,
      },
    });
    yearSlider.noUiSlider?.on('update', (values: any) => {
      const [leftYear, rightYear] = values;
      if (leftYear !== undefined && rightYear !== undefined) {
        (outputs[2] as HTMLElement).innerHTML = `${parseInt(leftYear, 10)}`;
        (outputs[3] as HTMLElement).innerHTML = `${parseInt(rightYear, 10)}`;
      }
      Controller.getSliderValues(values, 'year');
    });
  }
});
