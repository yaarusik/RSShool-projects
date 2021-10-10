const offset = 100;
const scrollUp = document.querySelector(".scroll__up");
const scrollUpSvgPath = document.querySelector(".scroll__up-path");
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = "stroke-dashoffset 20ms";

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

// update
const updateDashoffset = () => {
  const heigth = document.documentElement.scrollHeight - window.innerHeight;
  const dashoffset = pathLength - (getTop() * pathLength) / heigth;
  scrollUpSvgPath.style.strokeDashoffset = dashoffset;
};

// onScroll
window.addEventListener("scroll", () => {
  updateDashoffset();
  if (getTop() > offset) {
    scrollUp.classList.add("scroll__up--active");
  } else {
    scrollUp.classList.remove("scroll__up--active");
  }
});

// click
scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
