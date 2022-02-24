let formName = document.querySelector("#formName");
let formTel = document.querySelector("#formTel");
let formEmail = document.querySelector("#formEmail");

let nameMessage = document.querySelector(".message__name");
let emailMessage = document.querySelector(".message__mail");
let telMessage = document.querySelector(".message__tel");

const checkName = (e) => {
  if (e.target.value.length < 3) {
    nameMessage.style.display = "block";
    formName.classList.add("activity");
    nameMessage.innerHTML = "Имя должно содержать минимум 3 буквы.";
  } else {
    let reg = /^([а-яё\s]+|[a-z\s]+)$/iu;
    if (!reg.test(e.target.value)) {
      formName.classList.add("activity");
      nameMessage.style.display = "block";
      nameMessage.innerHTML =
        "Используйте только русские или только английские буквы.";
    } else {
      formName.classList.remove("activity");
      nameMessage.style.display = "none";
    }
  }
};

const checkEmail = (e) => {
  if (!/\b[a-zA-z0-9_-]{1,30}\b/.test(e.target.value)) {
    emailMessage.style.display = "block";
    emailMessage.innerHTML = "Только латинские буквы";
    formEmail.classList.add("activity");
    return;
  }
  if (!e.target.value.includes("@")) {
    emailMessage.style.display = "block";
    emailMessage.innerHTML = "Введите @";
    formEmail.classList.add("activity");
    return;
  }
  if (!e.target.value.includes(".")) {
    emailMessage.style.display = "block";
    formEmail.classList.add("activity");
    emailMessage.innerHTML = "Ввведите .";
    return;
  }
  let value = e.target.value.split("@");
  console.log(value[1]);
  if (value[1].length < 2) {
    emailMessage.style.display = "block";
    formEmail.classList.add("activity");
    emailMessage.innerHTML = "Введите домен первого уровня";
    return;
  }

  if (value[0].length < 3) {
    emailMessage.style.display = "block";
    formEmail.classList.add("activity");
    emailMessage.innerHTML = "Username должно содержать минимум 3 буквы.";

    return;
  } else {
    let reg = /\b[a-zA-z0-9_-]{1,15}\b/;
    if (!reg.test(value[0]) || value[0].includes(" ")) {
      emailMessage.style.display = "block";
      formEmail.classList.add("activity");
      emailMessage.innerHTML =
        "Username меньше 15 символов и содержит буквы, цифры, - и _";
      return;
    }
  }

  let newValue;
  if (value[1]) {
    if (!value[1].includes(".")) {
      emailMessage.style.display = "block";
      formEmail.classList.add("activity");
      emailMessage.innerHTML = "Введите.";
      return;
    }
    newValue = value[1].split(".");

    if (newValue[0]) {
      if (newValue[0].length < 4) {
        emailMessage.style.display = "block";
        formEmail.classList.add("activity");
        emailMessage.innerHTML =
          "Домен первого уровня состоит минимум из 4 латинских букв.";
        return;
      } else {
        let reg = /^[a-zA-z]+$/;
        if (!reg.test(newValue[0])) {
          emailMessage.style.display = "block";
          formEmail.classList.add("activity");
          emailMessage.innerHTML =
            "Домен первого уровня содержит только буквы.";
          return;
        }
      }
    }

    if (newValue[newValue.length - 1]) {
      if (newValue[newValue.length - 1].length < 2) {
        formEmail.classList.add("activity");
        emailMessage.style.display = "block";
        emailMessage.innerHTML =
          "Домен верхнего уровня состоит минимум из 2 латинских букв.";
        return;
      }
    }
  }
  if (newValue[1].length < 1) {
    formEmail.classList.add("activity");
    emailMessage.style.display = "block";
    emailMessage.innerHTML = "Введите домен второго уровня";
    return;
  }

  emailMessage.style.display = "none";
  formEmail.classList.remove("activity");
};

const checkTel = (e) => {
  if (e.target.value.includes("-") || e.target.value.includes(" ")) {
    let reg =
      /^\b\d{1,3}\b[-\s]{0,1}\b\d{1,3}\b[-\s]{0,1}\b\d{1,3}\b[-\s]{0,1}\b\d{1,3}\b$/;

    if (!reg.test(e.target.value)) {
      telMessage.style.display = "block";
      formTel.classList.add("activity");
      telMessage.innerHTML =
        "Цифры должны быть через пробел или дефис. В одной паре не больше 3 цифр.";

      return;
    } else {
      if (!(e.target.value.length < 15)) {
        telMessage.style.display = "block";
        formTel.classList.add("activity");
        telMessage.innerHTML = "Цифр должно быть не больше 10.";
        return;
      }
    }
  } else {
    let regFull = /\b[0-9]{1,10}\b/;
    if (!regFull.test(e.target.value)) {
      telMessage.style.display = "block";
      formTel.classList.add("activity");
      telMessage.innerHTML = "Введите цифры (не больше 10)";
      return;
    }
  }
  formTel.classList.remove("activity");
  telMessage.style.display = "none";

  // e.target.value.length < 15
  // reg.test(e.target.value) &&
  //reg.test(e.target.value)
  // console.log(reg.test(e.target.value));
};

formName.addEventListener("input", checkName);
formTel.addEventListener("input", checkTel);
formEmail.addEventListener("input", checkEmail);

const openError = () => {
  //   console.log("error");
};
