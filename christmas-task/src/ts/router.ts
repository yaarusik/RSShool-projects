// import Application from './application';

// class ChristmasRouter {
//   static init() {
//     window.location.hash = '';
//     window.addEventListener('hashchange', ChristmasRouter.hundleHash);
//   }

//   static hundleHash() {
//     const currentPage = ChristmasRouter.getRouteInfo();
//     if (currentPage) {
//       const routName = `${currentPage}Page`;
//       Application[routName]();
//     }
//     console.log(currentPage);
//   }

//   static getRouteInfo = () => {
//     return window.location.hash ? window.location.hash.slice(1) : '';
//   };
// }

// ChristmasRouter.init();
