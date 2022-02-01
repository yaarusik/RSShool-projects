new Swiper(".video__slider", {
  //стрелки
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // навигация

  pagination: {
    el: ".swiper-pagination",
    //буллеты
    clickable: true,
    // перетаскивания на пк
    simmulateTouch: true,
    // курсор перетаскивания
    grabCursor: true,
    // dynamicBullets: true
  },
  // управление клавиатурой
  keyboard: {
    enabled: true,
    //
    onlyInViewport: true,
  },
  // количество слайдов для показа
  slidesPerView: 3,
  // отступ между слайдами
  spaceBetween: 42,
  // стартовый слайд
  initialSlide: 0,
  // адаптиввная высота
  autoHeight: false,
  // бесконечный слайдер
  loop: true,
  // количество дублирующихся слайдов
  loopedSlides: 7,
  // скорость
  speed: 800,
  breakpoints: {
    1024: {
      spaceBetween: 42,
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    420: {
      spaceBetween: 20,
      slidesPerView: 2,
    },
    320: {
      spaceBetween: 15,
      slidesPerView: 2,
    },
  },
  // отключить подгрузку картинок
});

// function video() {
//   if (!clicked) {
//     playVideo();
//     window.clicked = true;
//     console.log("1");
//   } else if ((clicked = 2)) {
//     pauseVideo();
//     console.log("2");
//     window.clicked = false;
//   } else {
//     resumeVideo();
//     window.clicked = 2;
//   }
// }
