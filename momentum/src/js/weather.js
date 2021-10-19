const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const weatherWind = document.querySelector(".wind");
const weatherHumidity = document.querySelector(".humidity");
const city = document.querySelector(".city");

if (city.value.length < 2) {
  city.value = "Minsk";
  getWeather(city.value);
}

city.addEventListener("change", function (e) {
  getWeather(this.value);
});

function setLocalStorage() {
  localStorage.setItem("weather", city.value);
}
window.addEventListener("beforeunload", setLocalStorage);

const getLocalStorage = () => {
  if (localStorage.getItem("weather")) {
    city.value = localStorage.getItem("weather");
    getWeather(city.value);
  }
};
window.addEventListener("load", getLocalStorage);

async function getWeather(value) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=en&appid=e4d036bace916ea652d4d795631e466b&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod == "404" || !value.length) {
    // weatherIcon.classList.remove(`owf-${data.weather[0].id}`);
    temperature.textContent = `Error! city not found for "${value}"!`;
    // localStorage.setItem("weather", "Minsk");
    weatherDescription.textContent = "";
    weatherWind.textContent = ``;
    weatherHumidity.textContent = ``;
  } else {
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.trunc(+data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    weatherWind.textContent = `Wind speed: ${Math.trunc(+data.wind.speed)}m/s`;
    weatherHumidity.textContent = `Humidity: ${data.main.humidity}%`;

    // console.log(
    //   data.weather[0].id,
    //   data.weather[0].description,
    //   data.main.temp
    // );
  }
}
