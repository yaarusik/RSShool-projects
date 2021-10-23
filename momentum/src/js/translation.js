import { getTimeOfDay, currentTimeZone } from "./calendar";
import { getWeather } from "./weather";
import { getQuotes } from "./quote";

const languages = document.querySelectorAll('input[name="language"]');

const weatherTitles = document.querySelectorAll(".weather__title");
const fotoTitle = document.querySelector(".foto__title");
const popupTitle = document.querySelector(".popup__title");
const blockTitle = document.querySelector(".blocks__title");
const languageTitle = document.querySelector(".language__title");

let chooseLanguage = localStorage.getItem("lang") || "en";

// languages.forEach((item) => {
//   if (item.checked) {
//     chooseLanguage = item.id;
//   }
// });

languages.forEach((item) => {
  item.addEventListener("change", function () {
    if (this.id == "ru") {
      changeLanguage(currentTimeZone, this.id);
    } else if (this.id == "en") {
      changeLanguage(currentTimeZone, this.id);
    } else if (this.id == "be") {
      changeLanguage(currentTimeZone, this.id);
    }
  });
});

languages.forEach((item) => {
  item.addEventListener("click", function () {
    localStorage.lang = this.id;
  });
});

let id = localStorage.lang;

if (id) document.getElementById(id).checked = true;

const setLocalStorage = (lang) => {
  localStorage.setItem("lang", lang);
};

function changeLanguage(zone, lang) {
  let valueWeather = localStorage.getItem("weather");

  setLocalStorage(lang);
  getTimeOfDay(zone, lang);
  getWeather(valueWeather, lang);
  getQuotes(5, lang);
  setting(lang);
}

export { chooseLanguage };

let settingTranslaition = {
  en: [
    "Settings",
    "Select the photo upload source",
    "Show / Hide next blocks:",
    "Weather",
    "Time",
    "Date",
    "Audio",
    "Quotes",
    "Greeting",
    "Select the application language:",
  ],
  ru: [
    "Настройки",
    "Выберите источник загрузки фотографий",
    "Показывать/Скрывать следующие блоки:",
    "Погода",
    "Время",
    "Дата",
    "Аудио",
    "Цитаты",
    "Приветствие",
    "Выберите язык приложения:",
  ],
  be: [
    "Наладжваньне",
    "Выберыце крыніца загрузкі фатаграфій",
    "Паказваць / хаваць наступныя блокі:",
    "Надвор'е",
    "Час",
    "Дата",
    "Аўдыё",
    "Цытата",
    "Прывітанне",
    "Абярыце мову прыкладання:",
  ],
};

setting(chooseLanguage);

function setting(lang) {
  let settingArr;
  if (lang == "ru") {
    settingArr = settingTranslaition.ru;
  } else if (lang == "en") {
    settingArr = settingTranslaition.en;
  } else {
    settingArr = settingTranslaition.be;
  }
  weatherTitles[0].textContent = settingArr[3];
  weatherTitles[1].textContent = settingArr[4];
  weatherTitles[2].textContent = settingArr[5];
  weatherTitles[3].textContent = settingArr[6];
  weatherTitles[4].textContent = settingArr[7];
  weatherTitles[5].textContent = settingArr[8];
  fotoTitle.textContent = settingArr[1];
  languageTitle.textContent = settingArr[9];
  popupTitle.textContent = settingArr[0];
  blockTitle.textContent = settingArr[2];
}
