// import { IAppRoutes } from '../../app/appRouts';

const helper = {
  delay(ms = 1000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('preload');
      }, ms);
    });
  },
  isUndefined<T>(d: T) {
    return typeof d === 'undefined';
  },
};

export default helper;
