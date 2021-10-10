let videoSrcSlides = [
  "assets/video/videos/video0.mp4",
  "assets/video/videos/video1.mp4",
  "assets/video/videos/video2.mp4",
  "assets/video/videos/video3.mp4",
  "assets/video/videos/video4.mp4",
];
let postersSrc = [
  "assets/video/posters/poster0.jpg",
  "assets/video/posters/poster1.jpg",
  "assets/video/posters/poster2.jpg",
  "assets/video/posters/poster3.jpg",
  "assets/video/posters/poster4.jpg",
];

let videoLink = document.querySelector("#video-player");
let prevSiperBtn = document.querySelector(".swiper-button-prev");
let nextSiperBtn = document.querySelector(".swiper-button-next");
let videoLinkIframe = document.querySelectorAll(".video-slides");
console.log(videoLinkIframe);

let counter = 0;

const swiper = new Swiper(".video__slider", {
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
});

swiper.on("slideChangeTransitionEnd", function () {});

nextSiperBtn.onclick = function () {
  changePlayIconArrow();
};

prevSiperBtn.onclick = function () {
  changePlayIconArrow();
};

let bullets = document.querySelectorAll(".swiper-pagination-bullet");
let playButtonIcon = document.querySelector(".panel__play");
let playButtonBigIcon = document.querySelector(".video__play");

function changePlayIcon() {
  playButtonIcon.style.background = "url('./../assets/video/play.svg') center";
  playButtonBigIcon.style.opacity = 1;
}

function changePlayIconArrow() {
  videoLink.setAttribute("src", videoSrcSlides[swiper.realIndex]);
  videoLink.setAttribute("poster", postersSrc[swiper.realIndex]);
  playButtonIcon.style.background = "url('./../assets/video/play.svg') center";
  playButtonBigIcon.style.opacity = 1;
}

bullets[0].addEventListener("click", function () {
  videoLink.setAttribute("src", videoSrcSlides[0]);
  videoLink.setAttribute("poster", postersSrc[0]);
  changePlayIcon();
});
bullets[1].addEventListener("click", function () {
  videoLink.setAttribute("src", videoSrcSlides[1]);
  videoLink.setAttribute("poster", postersSrc[1]);
  changePlayIcon();
});
bullets[2].addEventListener("click", function () {
  videoLink.setAttribute("src", videoSrcSlides[2]);
  videoLink.setAttribute("poster", postersSrc[2]);
  changePlayIcon();
});
bullets[3].addEventListener("click", function () {
  videoLink.setAttribute("src", videoSrcSlides[3]);
  videoLink.setAttribute("poster", postersSrc[3]);
  changePlayIcon();
});
bullets[4].addEventListener("click", function () {
  videoLink.setAttribute("src", videoSrcSlides[4]);
  videoLink.setAttribute("poster", postersSrc[4]);
  changePlayIcon();
});
