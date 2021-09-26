const pictureInnerContainer = document.querySelector(".gallery__inner");

const imgAdress = [
  `assets/img/gallery/01.jpg`,
  `assets/img/gallery/02.jpg`,
  `assets/img/gallery/03.jpg`,
  `assets/img/gallery/04.jpg`,
  `assets/img/gallery/05.jpg`,
  `assets/img/gallery/06.jpg`,
  `assets/img/gallery/07.jpg`,
  `assets/img/gallery/08.jpg`,
  `assets/img/gallery/09.jpg`,
  `assets/img/gallery/10.jpg`,
  `assets/img/gallery/11.jpg`,
  `assets/img/gallery/12.jpg`,
  `assets/img/gallery/13.jpg`,
  `assets/img/gallery/14.jpg`,
  `assets/img/gallery/15.jpg`,
];

// img.classList.add("gallery__img");
// img.src = `assets/img/gallery/01.jpg`;
// img.alt = `galery1`;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

let a = shuffle(imgAdress).map((item) => {});

for (let i = 0; i < a.length; i++) {
  const img = document.createElement("img");
  img.classList.add("gallery__img");
  // if (i == 0 || i == 10) {
  //   img.style.paddingTop = "50px";
  // }
  img.src = imgAdress[i];
  img.alt = `galery ${i}`;
  pictureInnerContainer.append(img);
}

// console.log(b);

// pictureInnerContainer.append(img);
