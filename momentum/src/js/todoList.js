const iunputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todo__list");
const pendingNumb = document.querySelector(".pending__numb");
const deleteAll = document.querySelector(".todo__footer button");

iunputBox.onkeyup = () => {
  let userData = iunputBox.value;
  //  если только пробелы
  if (userData.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};

showTasks();

addBtn.onclick = () => {
  let userData = iunputBox.value;
  let getLocalStorage = localStorage.getItem("Todo");
  if (!getLocalStorage) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }

  listArr.push(userData);
  localStorage.setItem("Todo", JSON.stringify(listArr));
  showTasks();
};
//  создаем список через Localstorage
function showTasks() {
  let getLocalStorage = localStorage.getItem("Todo");
  if (!getLocalStorage) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  pendingNumb.textContent = listArr.length;
  if (listArr.length > 0) {
    deleteAll.classList.add("active");
  } else {
    deleteAll.classList.remove("active");
  }
  let newLiTag = "";
  listArr.forEach((item, index) => {
    newLiTag += `<li>${item} <span class="todo__delete"><i class="fa fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag;
  const liTags = document.querySelectorAll(".todo__delete");
  liTags.forEach((item, index) => {
    item.addEventListener("click", function () {
      deleteTask(index);
    });
  });
  console.log(liTags);
  iunputBox.value = "";
}

function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1);
  localStorage.setItem("Todo", JSON.stringify(listArr));
  showTasks();
}

deleteAll.addEventListener("click", function () {
  listArr = [];
  localStorage.setItem("Todo", JSON.stringify(listArr));
  showTasks();
});
