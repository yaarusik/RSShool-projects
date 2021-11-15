import images from "./../images/images";

const questions = document.querySelector(".questions");
const questionsBlock = document.querySelector(".questions__block");
const indicators = document.querySelectorAll(".block__indicators").children;

let authorAnswers = new Set();
let counter = 0;
let quizByAuthor = [];
let quizByName = [];
let data;
let buttonsChoose;

let correctMemory = [];

// рандом для вариантов ответа авторов
const getRandomInt = () => {
  return Math.floor(Math.random() * 94);
};

// рандом для массива ответов
const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// разделение данных на 2 типа квиза
const cutData = () => {
  quizByAuthor = images.slice(0, images.length / 2);
  quizByName = images.slice(images.length / 2, images.length - 1);
};

cutData();

// обработчик верного ответа
const chooseHundler = (e) => {
  if (e.target.innerHTML == quizByAuthor[counter].author) {
    e.target.classList.add("correct__answer");
    correctMemory.push("1");
    renderIndicator(counter);
  } else {
    correctMemory.push("0");
    e.target.classList.add("uncorrect__answer");
    renderIndicator(counter);
  }
  removeEvents();
};

// удаление слушателей после нажатия на ответ
const removeEvents = () => {
  buttonsChoose.forEach((item) => {
    item.removeEventListener("click", chooseHundler);
  });
};

// получение данных для quiz
export const renderAnswers = async (index) => {
  counter = index;
  // let response = await fetch(
  //   "https://raw.githubusercontent.com/yaarusik/image-data/master/images.json"
  // );

  // data = await response.json();
  // data.forEach(async (data) => {
  //   answersSet.add(data.author);
  // });

  data = images;

  renderQuestions(index, data);
};

const renderResults = () => {};

// для пометки правильных  и неправильных
const renderIndicator = (currentAnswer) => {
  const indicatorCircle = document.querySelectorAll(".indicators__circle");
  console.log(indicatorCircle);
  correctMemory.forEach((item, index) => {
    if (item == "1") {
      indicatorCircle[index].classList.add("correct__answer");
      console.log("1");
    } else if (item == "0") {
      console.log("0");
      console.log("2");
      indicatorCircle[index].classList.add("uncorrect__answer");
    }
  });
};

// делегирование
questions.addEventListener("click", (e) => {
  if (e.target.classList.contains("next__btn")) {
    counter += 1;
    renderAnswers(counter);
  }
});

// создание блока с вариантами ответа и фото
const renderQuestions = (index, data) => {
  // создание вариантов ответа для quiz авторов
  const createAnswers = () => {
    authorAnswers.add(quizByAuthor[index].author);
    while (authorAnswers.size < 4) {
      authorAnswers.add(data[getRandomInt()].author);
    }
    let authorArray = [...authorAnswers];
    authorArray = shuffle(authorArray);

    return authorArray
      .map((item) => {
        return `<div class="variants__answer">${item}</div>`;
      })
      .join("");
  };

  questionsBlock.innerHTML = `
  <div class="questions__block">
  <div class="block__picture">
    <img src="https://raw.githubusercontent.com/Geo-nw/image-data/master/img/${index}.jpg" alt="" />
  </div>
  <div class="block__indicators">
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
    <span class="indicators__circle"></span>
  </div>
  <div class="block__variants">
    <div class="variants__body">
      <div class="variants__row">
       ${createAnswers()}
      </div>
    </div>
  </div>
  <button class="next__btn">Далее</button>
  </div> 
  `;

  // окрашивание предыдущих ответов
  if (counter) {
    renderIndicator(counter);
  }

  // очищение set
  authorAnswers = new Set();

  buttonsChoose = document.querySelectorAll(".variants__answer");

  // cлушатель событий для созданных кнопок
  buttonsChoose.forEach((item) =>
    item.addEventListener("click", chooseHundler)
  );
};
