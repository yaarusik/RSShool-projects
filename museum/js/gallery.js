const pictureInnerContainer = document.querySelector(".gallery__inner");

const imgAdress = [
  `assets/img/gallery/01.jpg`,
  `assets/img/gallery/02.jpg`,
  `assets/img/gallery/03.jpg`,
  `assets/img/gallery/04.jpg`,
  `assets/img/gallery/05.jpg`,
  `assets/img/gallery/06.jpg`,
  `assets/img/gallery/07.jpg`,
  `assets/img/gallery/08.jpg`,
  `assets/img/gallery/09.jpg`,
  `assets/img/gallery/10.jpg`,
  `assets/img/gallery/11.jpg`,
  `assets/img/gallery/12.jpg`,
  `assets/img/gallery/13.jpg`,
  `assets/img/gallery/14.jpg`,
  `assets/img/gallery/15.jpg`,
];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
let a = shuffle(imgAdress);
for (let i = 0; i < a.length; i++) {
  const img = document.createElement("img");
  img.classList.add("gallery__img");
  if (i == 0 || i == 2) {
    img.style.paddingTop = 50 + "px";
  }
  img.src = imgAdress[i];
  img.alt = `galery ${i}`;
  img.classList.add("slide__in");
  pictureInnerContainer.append(img);
}
window.onload = function () {
  const animItems = document.querySelectorAll(".slide__in");

  window.addEventListener("scroll", animOnScroll);
  function animOnScroll(param) {
    for (let i = 0; i < animItems.length; i++) {
      const animItemsHeight = animItems[i].offsetHeight;
      const animItemOffset = offset(animItems[i]).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemsHeight / animStart;
      if (animItemsHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemsHeight
      ) {
        animItems[i].classList.add("active");
      } else {
        animItems[i].classList.remove("active");
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  animOnScroll();
};

// AIzaSyAGgZL8EN0yHrmDrciJJMmk8tu14fz_LYc
