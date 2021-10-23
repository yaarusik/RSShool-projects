import { chooseLanguage } from "./translation";

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const weatherWind = document.querySelector(".wind");
const weatherHumidity = document.querySelector(".humidity");
const city = document.querySelector(".city");
let weatherLang = localStorage.getItem("lang") || "en";

let weatherTranslation = {
  en: ["Wind speed", "Humidity", "m/s", "Error! city not found for"],
  ru: ["Скорость ветра", "Влажность", "м/с", "Ошибка! не найден город для "],
  be: [
    "Хуткасць ветру",
    "Вільготнасць",
    "м/с",
    "Памылка! горад не знойдзены для",
  ],
};

// let checkCityValue =

// if (!city.value.length) {
//   getWeather(city.value);
// }

city.addEventListener("change", function (e) {
  getWeather(this.value, weatherLang);
});

function setLocalStorage() {
  localStorage.setItem("weather", city.value);
}
window.addEventListener("beforeunload", setLocalStorage);

const getLocalStorage = () => {
  if (localStorage.getItem("weather")) {
    city.value = localStorage.getItem("weather");
    getWeather(city.value, weatherLang);
  } else {
    getWeather(city.value, weatherLang);
  }
};
window.addEventListener("load", getLocalStorage());

export async function getWeather(value, lang) {
  let langsArr;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=${lang}&appid=e4d036bace916ea652d4d795631e466b&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (lang == "ru") {
    langsArr = weatherTranslation.ru;
    if (city.value == "Minsk") {
      city.value = "Минск";
      // setLocalStorage();
    }
  } else if (lang == "en") {
    if (city.value == "Минск") {
      city.value = "Minsk";
      // setLocalStorage();
    }
    langsArr = weatherTranslation.en;
  } else {
    if (city.value == "Minsk") {
      city.value = "Минск";
      // setLocalStorage();
    }
    langsArr = weatherTranslation.be;
  }

  if (data.cod == "404" || !value.length) {
    // weatherIcon.classList.remove(`owf-${data.weather[0].id}`);
    temperature.textContent = `${langsArr[3]} "${value}"!`;
    // localStorage.setItem("weather", "Minsk");
    weatherDescription.textContent = "";
    weatherWind.textContent = ``;
    weatherHumidity.textContent = ``;
  } else {
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.trunc(+data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    weatherWind.textContent = `${langsArr[0]}: ${Math.trunc(+data.wind.speed)}${
      langsArr[2]
    }`;
    weatherHumidity.textContent = `${langsArr[1]}: ${data.main.humidity}%`;

    // console.log(
    //   data.weather[0].id,
    //   data.weather[0].description,
    //   data.main.temp
    // );
  }
}
