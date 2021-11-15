const oneCard = document.querySelector(".card__one");
const twoCard = document.querySelector(".card__two");

const showMessage = () => {
  console.log("hi");
};

oneCard.addEventListener("click", showMessage);
twoCard.addEventListener("click", showMessage);
