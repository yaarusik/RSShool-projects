// import { scoreBlock } from "./blocksHide";
// import { categoryBlock } from "./blocksHide";

// const scoreBody = document.querySelector(".score__body");
// const scoreBtn = document.querySelectorAll(".button__score");
// let scorePages = [];

// export const renderScoreBlock = (index, answers) => {
//   let scoreBlock = `
//    <div class="score__body">
//    <div class="score__logo background__size"></div>
//    <div class="score__header">
//        <div class="score__title">Score</div>
//      </div>
//      <div class="score__picture">
//          ${renderPictureBlock(index * 10, answers)}
//      </div>
//    </div>
// `;
//   // записываем в объект страницы
//   scorePages.push({ page: scoreBlock, number: index });
//   console.log(scorePages);

//   scoreBtnShow(index);
// };

// // генерация картинок
// const renderPictureBlock = (currentImg, answers) => {
//   console.log("чичло" + currentImg);
//   let htmlString = "";
//   let classString;
//   let count = 0;
//   while (count < 10) {
//     if (answers[count] == "1") {
//       classString = `class ="add__bg"`;
//     } else {
//       classString = "";
//     }
//     htmlString += `
//                      <div class="picture__one">
//                   <img ${classString} src="./images/assets/img/${currentImg}.jpg" alt="img" />
//                         </div>`;
//     currentImg++;
//     count++;
//   }

//   return htmlString;
// };

// // показывает скор у сыгранной категории
// const scoreBtnShow = (index) => {
//   scoreBtn[index].classList.add("show");
// };

// // отслеживает номер кнопки и скрытие блоков
// scoreBtn.forEach((item, index) => {
//   item.addEventListener("click", (event) => {
//     event.stopPropagation();
//     categoryBlock.classList.add("hide");
//     scoreBlock.classList.remove("hide");
//     console.log("index" + index);
//     renderScorePage(index);
//   });
// });

// // генерирует окончательный score
// const renderScorePage = (index) => {
//   let currentPage = scorePages.filter((item, i) => item.number == index);
//   console.log(currentPage);
//   scoreBody.innerHTML = currentPage[currentPage.length - 1].page;
// };
