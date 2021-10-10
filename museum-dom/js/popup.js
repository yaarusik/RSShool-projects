let buttonBuy = document.querySelector(".total__buy");
let popup = document.querySelector("#popup");
let popupClose = document.querySelector(".popup__close");
let overlay = document.querySelector(".popup__overlay");

overlay.addEventListener("click", function () {
  popup.classList.remove("_active");
  overlay.style.left = -120 + "%";
});

buttonBuy.addEventListener("click", function () {
  popup.classList.toggle("_active");
  overlay.style.left = 0 + "px";
});

popupClose.addEventListener("click", function () {
  popup.classList.toggle("_active");
  overlay.style.left = -120 + "%";
});
// ripple effect
const buttons = document.querySelectorAll(".ripple");

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    let maxValue = Math.max(this.clientWidth, this.clientHeight);
    let styleDiv = circle.style;
    let px = "px";
    let x = this.getBoundingClientRect();

    styleDiv.width = styleDiv.height = maxValue + px;

    styleDiv.left = e.clientX - x.left - maxValue / 2 + px;
    styleDiv.top = e.clientY - x.top - maxValue / 2 + px;

    this.appendChild(circle);
    setTimeout(() => circle.remove(), 700);
  });
});
