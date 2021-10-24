const hidden = document.querySelectorAll(".hidden__weather");
const player = document.querySelector(".player");
const weather = document.querySelector(".weather");
const greetingContainer = document.querySelector(".greeting-container");
const quotes = document.querySelector(".quotes");
const changeQuote = document.querySelector(".change-quote");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const todo = document.querySelector(".todo");

let id = [];

hidden.forEach((item) => {
  item.addEventListener("click", hiddenBlock);
});

function hiddenBlock() {
  this.classList.toggle("hidden");
  if (!id.includes(this.id)) {
    id.push(this.id);
  } else {
    id = id.filter((item) => item != this.id);
  }

  setLocalStorage(id);
  if (this.classList.contains("hidden")) {
    if (this.id == "weather") {
      weather.classList.add("hid");
    } else if (this.id == "time") {
      time.classList.add("hid");
    } else if (this.id == "date") {
      date.classList.add("hid");
    } else if (this.id == "audio") {
      player.classList.add("hid");
    } else if (this.id == "quotes") {
      quotes.classList.add("hid");
      changeQuote.classList.add("hid");
    } else if (this.id == "greeting") {
      greetingContainer.classList.add("hid");
    } else if (this.id == "todo") {
      todo.classList.add("hid");
    }
  } else {
    if (this.id == "weather") {
      weather.classList.remove("hid");
    } else if (this.id == "time") {
      time.classList.remove("hid");
    } else if (this.id == "date") {
      date.classList.remove("hid");
    } else if (this.id == "audio") {
      player.classList.remove("hid");
    } else if (this.id == "quotes") {
      quotes.classList.remove("hid");
      changeQuote.classList.remove("hid");
    } else if (this.id == "greeting") {
      greetingContainer.classList.remove("hid");
    } else if (this.id == "todo") {
      todo.classList.remove("hid");
    }
  }
}

function setLocalStorage(id) {
  localStorage.setItem("hide", JSON.stringify(id));
}

const getLocalStorage = () => {
  if (localStorage.getItem("hide")) {
    id = JSON.parse(localStorage.getItem("hide"));
    setMemory();
    hidden.forEach((item) => {
      if (item.classList.contains("hidden")) {
        if (item.id == "weather") {
          weather.classList.add("hid");
        } else if (item.id == "time") {
          time.classList.add("hid");
        } else if (item.id == "date") {
          date.classList.add("hid");
        } else if (item.id == "audio") {
          player.classList.add("hid");
        } else if (item.id == "quotes") {
          quotes.classList.add("hid");
          changeQuote.classList.add("hid");
        } else if (item.id == "greeting") {
          greetingContainer.classList.add("hid");
        } else if (item.id == "todo") {
          todo.classList.add("hid");
        }
      }
    });
  }
};
window.addEventListener("load", getLocalStorage);
//

function setMemory() {
  for (let i = 0; i < hidden.length; i++) {
    for (let j = 0; j < id.length; j++) {
      if (hidden[i].id == id[j]) {
        hidden[i].classList.add("hidden");
      }
    }
  }
}
