import noUiSlider, { target } from 'nouislider';
import { SliderValues } from '../interfases';
import Controller from '../components/controller';

const outputs: NodeListOf<HTMLElement> = document.querySelectorAll('.slider-output') as NodeListOf<HTMLElement>;

const COUNT_SLIDER = {
  minValue: 1,
  maxValue: 12,
  step: 1,
  behaviour: 'tap-drag',
};

const YEAR_SLIDER = {
  minValue: 1940,
  maxValue: 2021,
  step: 10,
  behaviour: 'tap-drag',
};

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
  if (countSlider) {
    noUiSlider.create(countSlider, {
      start: [COUNT_SLIDER.minValue, COUNT_SLIDER.maxValue],
      connect: true, // нужно ли красить полоску
      behaviour: COUNT_SLIDER.behaviour,
      step: COUNT_SLIDER.step,
      range: {
        min: COUNT_SLIDER.minValue,
        max: COUNT_SLIDER.maxValue,
      },
    });
    countSlider.noUiSlider?.on('update', (values: (string | number)[]) => {
      const [min, max] = values as string[];
      if (min && max) {
        (outputs[0] as HTMLElement).innerHTML = `${parseInt(min, 10)}`;
        (outputs[1] as HTMLElement).innerHTML = `${parseInt(max, 10)}`;
        Controller.getSliderValues([min, max], 'count');
      }
    });
  }
  if (yearSlider) {
    noUiSlider.create(yearSlider, {
      start: [YEAR_SLIDER.minValue, YEAR_SLIDER.maxValue],
      connect: true,
      behaviour: YEAR_SLIDER.behaviour,
      step: YEAR_SLIDER.step,
      range: {
        min: YEAR_SLIDER.minValue,
        max: YEAR_SLIDER.maxValue,
      },
    });
    yearSlider.noUiSlider?.on('update', (values: (string | number)[]) => {
      const [min, max] = values as string[];
      if (min && max) {
        (outputs[2] as HTMLElement).innerHTML = `${parseInt(min, 10)}`;
        (outputs[3] as HTMLElement).innerHTML = `${parseInt(max, 10)}`;
        Controller.getSliderValues([min, max], 'year');
      }
    });
  }
}

sliderInit();
