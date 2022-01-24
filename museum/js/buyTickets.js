let inputRadio = document.querySelectorAll("input[name='ticket']");
let countB = document.querySelector("input[name='countB']");
let countS = document.querySelector("input[name='countS']");
let totalPrice = document.querySelector(".total__title").children;
let totalPlus = document.querySelectorAll(".amount__plus");
let totalMinus = document.querySelectorAll(".amount__minus");
let price;
let resultSum;

// форма========
let formCountB = document.querySelector(".basic").children;
let formCountS = document.querySelector(".senior").children;
let totalForm = document.querySelector(".total__result").children;
let totalTicketCheck = document.querySelector(".right__ticket");
let formTextS = document.querySelector(".texts").children;
let formTextB = document.querySelector(".textb").children;
let formSumS = document.querySelector(".sums").children;
let formSumB = document.querySelector(".sumb").children;
let formDate = document.querySelector("#formDate");
let formPlus = document.querySelectorAll(".entry__plus");
let formMinus = document.querySelectorAll(".entry__minus");
let formB = document.querySelector("input[name='BASIC']");
let formS = document.querySelector("input[name='SENIOR']");
let formTicket = document.querySelector("#formTicket");
let entryS = document.querySelector(".entryS").children;
let entryB = document.querySelector(".entryB").children;
let formCollectionDate = document.querySelector(".right__day").children;
let formOptions = document
  .querySelector("#formTicket")
  .getElementsByTagName("option");
// ====================

// значение по умолчанию
for (let item of inputRadio) {
  if (item.checked) {
    price = item.value;
    formTextS[0].textContent = price / 2;
    formTextB[0].textContent = price;
    if (!localStorage.getItem("price")) {
      localStorage.setItem("price", price);
    }

    if (!localStorage.getItem("resultSum")) {
      priceResult(price);
    }
  }
}
// значение по умолчанию
if (!localStorage.getItem("countB") || !localStorage.getItem("countS")) {
  localStorage.setItem("countB", countB.value);
  localStorage.setItem("countS", countS.value);
}

inputRadio.forEach((item) => {
  item.addEventListener("change", function () {
    if (this.value == 20) {
      price = 20;
      totalTicketCheck.textContent = "Permanent exhibition";
      localStorage.setItem("price", price);
      priceResult(price);

      for (let i = 0; i < formOptions.length; i++) {
        if (formOptions[i].textContent === "Permanent exhibition")
          formOptions[i].selected = true;
      }
    } else if (this.value == 25) {
      price = 25;
      totalTicketCheck.textContent = "Temporary exhibition";
      localStorage.setItem("price", price);
      priceResult(price);
      for (let i = 0; i < formOptions.length; i++) {
        if (formOptions[i].textContent === "Temporary exhibition")
          formOptions[i].selected = true;
      }
    } else if (this.value == 40) {
      price = 40;
      totalTicketCheck.textContent = "Combined Admission";
      localStorage.setItem("price", price);
      priceResult(price);
      for (let i = 0; i < formOptions.length; i++) {
        if (formOptions[i].textContent === "Combined Admission")
          formOptions[i].selected = true;
      }
    }
    formTextS[0].textContent = price / 2;
    formTextB[0].textContent = price;
  });
});

// кнопки плюс
totalPlus.forEach((item, index) => {
  if (index == 0) {
    item.addEventListener("click", function () {
      this.previousElementSibling.stepUp();

      formB.value = countB.value;
      formCountB[0].textContent = countB.value;
      localStorage.setItem("countB", countB.value);
      priceResult(price);
    });
  } else {
    item.addEventListener("click", function () {
      this.previousElementSibling.stepUp();
      formS.value = countS.value;
      formCountS[0].textContent = countS.value;
      localStorage.setItem("countS", countS.value);
      priceResult(price);
    });
  }
});

//  кнопки минус
totalMinus.forEach((item, index) => {
  if (index == 0) {
    item.addEventListener("click", function () {
      this.nextElementSibling.stepDown();
      formB.value = countB.value;
      formCountB[0].textContent = countB.value;
      localStorage.setItem("countB", countB.value);
      priceResult(price);
    });
  } else {
    item.addEventListener("click", function () {
      this.nextElementSibling.stepDown();
      formS.value = countS.value;
      formCountS[0].textContent = countS.value;
      localStorage.setItem("countS", countS.value);
      priceResult(price);
    });
  }
});

function priceResult(n) {
  let valueS = n * (countS.value / 2);
  let valueB = n * countB.value;
  resultSum = valueS + valueB;
  totalPrice[0].textContent = resultSum;

  totalForm[0].textContent = resultSum;

  formSumB[0].textContent = valueB;
  formSumS[0].textContent = valueS;
  localStorage.setItem("resultSum", resultSum);
}
// запоминает положение radio
var id = localStorage.checked;

if (id) document.getElementById(id).checked = true;

for (var i = 0; i < inputRadio.length; i++) {
  inputRadio[i].onclick = function () {
    localStorage.checked = this.id;
  };
}

// сохранение значений в хранилище
countB.value = localStorage.getItem("countB");
countS.value = localStorage.getItem("countS");
price = localStorage.getItem("price");
totalPrice[0].textContent = localStorage.getItem("resultSum");

// форма
formCountB[0].textContent = localStorage.getItem("countB");
formCountS[0].textContent = localStorage.getItem("countS");
totalForm[0].textContent = localStorage.getItem("resultSum");

formTextS[0].textContent = +localStorage.getItem("price") / 2;
formTextB[0].textContent = localStorage.getItem("price");
entryS[0].textContent = +localStorage.getItem("price") / 2;
entryB[0].textContent = localStorage.getItem("price");

formSumB[0].textContent =
  +localStorage.getItem("price") * +localStorage.getItem("countB");
formSumS[0].textContent =
  (+localStorage.getItem("price") / 2) * +localStorage.getItem("countS");

if (localStorage.getItem("checked") == "permanent") {
  totalTicketCheck.textContent = "Permanent exhibition";
} else if (localStorage.getItem("checked") == "tempopary") {
  totalTicketCheck.textContent = "Temporary exhibition";
} else {
  totalTicketCheck.textContent = "Combined Admission";
}

// калькулятор формы======================================================
formS.value = countS.value;
formB.value = countB.value;
let cost = +localStorage.getItem("price");

let date = new Date();
let dateYear = date.getFullYear();
let dateMonth = date.getMonth() + 1;
let dateDay = date.getDate();
if (dateDay < 10) {
  dateDay = "0" + dateDay;
}
if (dateMonth < 10) {
  dateMonth = "0" + dateMonth;
}
let dateFull = `${dateYear}-${dateMonth}-${dateDay}`;

formDate.setAttribute("min", dateFull);

formTicket.addEventListener("change", function () {
  let value = this.options[this.selectedIndex].value;

  if (value == 20) {
    cost = 20;
    totalTicketCheck.textContent = "Permanent exhibition";

    formPriceResult(cost);
  } else if (value == 25) {
    cost = 25;
    totalTicketCheck.textContent = "Temporary exhibition";
    formPriceResult(cost);
  } else if (value == 40) {
    cost = 40;
    totalTicketCheck.textContent = "Combined Admission";
    formPriceResult(cost);
  }
  formTextS[0].textContent = cost / 2;
  formTextB[0].textContent = cost;
  entryS[0].textContent = cost / 2;
  entryB[0].textContent = cost;
});

// кнопки плюс
formPlus.forEach((item, index) => {
  if (index == 0) {
    item.addEventListener("click", function () {
      this.previousElementSibling.stepUp();
      formCountB[0].textContent = formB.value;
      formPriceResult(cost);
    });
  } else {
    item.addEventListener("click", function () {
      this.previousElementSibling.stepUp();
      formCountS[0].textContent = formS.value;
      formPriceResult(cost);
    });
  }
});

//  кнопки минус
formMinus.forEach((item, index) => {
  if (index == 0) {
    item.addEventListener("click", function () {
      this.nextElementSibling.stepDown();
      formCountB[0].textContent = formB.value;
      formPriceResult(cost);
    });
  } else {
    item.addEventListener("click", function () {
      this.nextElementSibling.stepDown();
      formCountS[0].textContent = formS.value;
      formPriceResult(cost);
    });
  }
});

function formPriceResult(n) {
  let valueS = n * (formS.value / 2);
  let valueB = n * formB.value;
  resultSum = valueS + valueB;
  totalPrice[0].textContent = resultSum;

  totalForm[0].textContent = resultSum;

  formSumB[0].textContent = valueB;
  formSumS[0].textContent = valueS;
}

formDate.addEventListener("change", function () {
  let curDate = this.value.split("-");
  let year = +curDate[0];
  let mounth = +curDate[1] - 1;
  let day = +curDate[2];
  let date = new Date(year, mounth, day);
  let week = date.getDay();
  let arrDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let arrMounth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    ,
  ];
  formCollectionDate[0].textContent = arrDays[week];
  formCollectionDate[1].textContent = arrMounth[mounth];
  formCollectionDate[2].textContent = day;
  console.log(date, mounth, formCollectionDate);
});

let formTime = document.querySelector(".select__time");
let formTimeChange = document.querySelector(".right__time").children;

formTime.addEventListener("change", function () {
  formTimeChange[0].textContent = formTime.options[formTime.selectedIndex].text;
});
