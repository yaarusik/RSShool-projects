// Элемент, куда записываю количество
let pages = document.querySelector(".slides__count").children;
let $slider = $(".welcome__slider");
// количество слайдов
var spanNumber = document.querySelectorAll(".slider__item");

$(document).ready(function () {
  $slider.slick({
    arrows: true,
    dots: true,
    // добавление стрелок в другой контейнер
    appendDots: ".slides__dots",
    appendArrows: ".slides__arrows",
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    variableWidth: true,
    adaptiveHeight: true,
  });
});

// счетчик слайдов
$slider.on(
  "init reInit afterChange",
  function (event, slick, currentSlide, nextSlide) {
    //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
    let i = (currentSlide ? currentSlide : 0) + 1;
    pages[0].textContent = "0" + i;
    pages[2].textContent = "0" + spanNumber.length;
  }
);
