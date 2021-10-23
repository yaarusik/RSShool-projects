const settingsBtn = document.querySelector(".settings");
const closeBtn = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");
let unlock = true;

const timeout = 800;

settingsBtn.addEventListener("click", function () {
  popup.classList.toggle("open");
});

closeBtn.addEventListener("click", function () {
  popup.classList.remove("open");
});
