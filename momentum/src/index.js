// import image from "./images/lazy.png";
import "./style.scss";
import "./js/calendar";
import "./js/imagesSlider";
import "./js/weather";
import "./js/quote";
import "./js/audioPlayer";
import "./js/todoList";
import "./js/popup";
import "./js/translation";
import "./js/hidden";

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

// render();
