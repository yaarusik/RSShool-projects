const categories = document.querySelectorAll(".down__row");
const variantsParent = document.querySelector(".variants__row");
const blockPicture = document.querySelector(".block__picture");
// let authors = new Set();
// async function getData() {
//   let response = await fetch(
//     "https://raw.githubusercontent.com/yaarusik/image-data/master/images.json"
//   );

//   let data = await response.json();
//   dataHandling(data);
// }

// function setImg(i) {
//   const img = new Image();
//   img.src = `https://raw.githubusercontent.com/Geo-nw/image-data/master/img/${i}.jpg`;
//   blockPicture.appendChild(img);
// }

// getData();

// function dataHandling(data) {
//   data.forEach((item) => {
//     authors.add(item.author);
//   });
// }

// console.log(authors);

// categories.forEach((item, index) => {
//   item.addEventListener("click", function () {
//     setImg(index);
//     createButtons();
//     createInner(count);
//   });
// });

// function createButtons() {
//   for (let i = 0; i < 4; i++) {
//     let div = document.createElement("div");
//     div.classList.add("variants__answer");
//     variantsParent.appendChild(div);
//   }
// }

// function createInner(count) {
//   let count = 0;
// }
