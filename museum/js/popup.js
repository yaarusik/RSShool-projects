let buttonBuy = document.querySelector(".total__buy");
let popup = document.querySelector("#popup");
let popupClose = document.querySelector(".popup__close");

buttonBuy.addEventListener("click", function () {
  popup.classList.toggle("_active");
});

popupClose.addEventListener("click", function () {
  popup.classList.toggle("_active");
});
// ripple effect
const buttons = document.querySelectorAll(".ripple");

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const x = e.clientX;
    const y = e.clientY;

    const buttonTop = e.target.offsetTop;
    const buttonLeft = e.target.offsetLeft;

    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;

    const circle = document.createElement("span");
    circle.classList.add("circle");
    circle.style.top = yInside + "px";
    circle.style.left = xInside + "px";

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 500);
  });
});
