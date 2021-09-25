let buttonBuy = document.querySelector(".total__buy");
let popup = document.querySelector("#popup");
let popupClose = document.querySelector(".popup__close");

buttonBuy.addEventListener("click", function () {
  popup.classList.toggle("_active");
});

popupClose.addEventListener("click", function () {
  popup.classList.toggle("_active");
});
