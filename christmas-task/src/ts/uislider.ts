import noUiSlider, { target } from 'nouislider';
// eslint-disable-next-line import/no-cycle
import Controller from './controller';
import { SliderValues } from './interfases';

const outputs: NodeListOf<HTMLElement> = document.querySelectorAll('.slider-output') as NodeListOf<HTMLElement>;

const countSlider: target = <target>document.querySelector('.count-slider');
const yearSlider: target = <target>document.querySelector('.year-slider');

const uisliderReset = (values: SliderValues) => {
  yearSlider.noUiSlider?.set(values.year as number[]);
  countSlider.noUiSlider?.set(values.count as number[]);
};

const sliderReset = (values: SliderValues) => {
  uisliderReset(values);
};

export default sliderReset;

function sliderInit() {
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
}

setTimeout(sliderInit, 100);
