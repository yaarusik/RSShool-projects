let currentLang = localStorage.getItem("lang") || "en";

const time = document.querySelector(".time");
const todayDate = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");

let currentTimeZone;

let greetingTranslation = {
  en: [
    "Good night",
    "Good morning",
    "Good afternoon",
    "Good evening",
    "[Enter name]",
  ],
  ru: [
    "Доброй ночи",
    "Доброе утро",
    "Добрый день",
    "Добрый вечер",
    "[Введите имя]",
  ],
  be: [
    "Дабранач",
    "Добрай раніцы",
    "Добры дзень",
    "Добры вечар",
    "[Увядзіце імя]",
  ],
};

let dateTranslation = ["en-US", "ru-RU", "be-Be"];

let mounthBe = [
  "Студзень",
  "Люты",
  "Сакавiк",
  "Красавiк",
  "Май",
  "Червень",
  "Лiпень",
  "Жнiвень",
  "Верасень",
  "Кастрычнiк",
  "Лiстапад",
  "Снежань",
];

let daysBe = [
  "",
  "панядзелак",
  "аўторак",
  "серада",
  "чацвер",
  "пятніца",
  "субота",
  "нядзеля",
];

let date = new Date();
let dateMonth = date.getMonth();
let month = mounthBe[dateMonth];
let dateDay = date.getDate();
let weekDate = date.getDay() + 1;
let week = daysBe[weekDate];

let dateFull = `${week}, ${dateDay} ${month}`;
// console.log(dateFull);

const showDate = (lang = "en") => {
  if (lang == "en") {
    lang = dateTranslation[0];
    todayDate.classList.remove("date-first");
  } else if (lang == "ru") {
    lang = dateTranslation[1];
    todayDate.classList.add("date-first");
  } else {
    todayDate.classList.add("date-first");
    todayDate.textContent = dateFull;
    return;
  }
  const date = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const currentDate = date.toLocaleDateString(lang, options);
  todayDate.textContent = currentDate;
};

// текущее время суток
export const getTimeOfDay = (currentTimeZone, language) => {
  currentLang = language;

  let langArr;
  language == "ru"
    ? (langArr = greetingTranslation.ru)
    : language == "en"
    ? (langArr = greetingTranslation.en)
    : (langArr = greetingTranslation.be);
  name.placeholder = langArr[4];
  return currentTimeZone == 0
    ? langArr[0]
    : currentTimeZone == 1
    ? langArr[1]
    : currentTimeZone == 2
    ? langArr[2]
    : langArr[3];
};

const showGreeting = (lang) => {
  const date = new Date();
  const hours = date.getHours();
  currentTimeZone = Math.floor(+hours / 6);
  greeting.textContent = getTimeOfDay(currentTimeZone, lang);
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
  showDate(currentLang);
  showGreeting(currentLang);
  setTimeout(showTime, 400);
};

showTime();

export { currentTimeZone };
