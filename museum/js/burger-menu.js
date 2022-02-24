const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu");
//убирать меню по клику по навигации
const menuLink = document.querySelectorAll(".menu__item");
const welcomeContainer = document.querySelector(".welcome__left");

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    //чтобы заблочить скрол при всплывании меню
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
    welcomeContainer.classList.toggle("_close");
  });
}

menuLink.forEach((item) => {
  item.addEventListener("click", function () {
    document.body.classList.remove("_lock");
    menuBody.classList.remove("_active");
    iconMenu.classList.remove("_active");
    welcomeContainer.classList.remove("_close");
  });
});
