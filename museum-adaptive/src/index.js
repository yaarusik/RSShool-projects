import image from "./images/lazy.png";
import "../#sourse/scss/nullstyle.scss";
import "../#sourse/scss/mixin.scss";
import "../#sourse/scss/header.scss";
import "../#sourse/scss/popup.scss";
import "../#sourse/scss/slick-slider.scss";
import "../#sourse/scss/swiper-slider.scss";
import "../#sourse/scss/style.scss";

const createImage = (src) =>
  new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });

async function render() {
  const subHeader = document.createElement("h2");
  subHeader.innerHTML = "This elements was created by js";
  const myImage = await createImage(image);
  document.body.appendChild(subHeader);
  document.body.appendChild(myImage);
}

render();
