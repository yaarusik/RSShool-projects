const time = document.querySelector(".time");
const todayDate = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");

const showDate = () => {
  const date = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const currentDate = date.toLocaleDateString("en-US", options);
  todayDate.textContent = currentDate;
};

// текущее время суток
export const getTimeOfDay = (currentTimeZone) => {
  return currentTimeZone == 0
    ? `night`
    : currentTimeZone == 1
    ? `morning`
    : currentTimeZone == 2
    ? `day`
    : `evening`;
};

const showGreeting = () => {
  const date = new Date();
  const hours = date.getHours();
  let currentTimeZone = Math.floor(hours / 6);
  greeting.textContent = `Good ${getTimeOfDay(currentTimeZone)}`;
};

// сохранение пользователя в localStorage
const setLocalStorage = () => {
  localStorage.setItem("name", name.value);
};
window.addEventListener("beforeunload", setLocalStorage);

const getLocalStorage = () => {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
};
window.addEventListener("load", getLocalStorage);
//

const showTime = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
};

showTime();
