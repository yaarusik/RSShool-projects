import playList from "./playList.js";

const playBtn = document.querySelector(".play");
const prevBtn = document.querySelector(".play-prev");
const nextBtn = document.querySelector(".play-next");
const playListContainer = document.querySelector(".play-list");
const playListChildren = playListContainer.children;

const audio = new Audio();
let isPlay = false;
let playNum = 0;
// сохраняет предыдущий номер песни
let playNumSave;

const playAudio = () => {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  if (!isPlay) {
    audio.play();
    isPlay = true;
    playBtn.classList.add("pause");
    changeIndicator();
  } else {
    audio.pause();
    isPlay = false;
    playBtn.classList.remove("pause");
  }
};

const playNext = () => {
  playNumSave = playNum;
  playNum++;
  if (playNum > 4) playNum = 0;
  changeIndicator();
  isPlay = false;
  playAudio();
};

// const trackChange = (n) => {
//   playNumSave = playNum;
//   playNum = (n + 4) % 4;
//   changeIndicator();
//   isPlay = false;
//   playAudio();
// };

const playPrev = () => {
  playNumSave = playNum;
  playNum--;
  if (playNum < 0) playNum = 4;
  changeIndicator();
  isPlay = false;
  playAudio();
};

const changeIndicator = () => {
  playListChildren[playNum].classList.add("playlist-indicator");
  playListChildren[playNumSave].classList.remove("playlist-indicator");
};

playBtn.addEventListener("click", playAudio);
prevBtn.addEventListener("click", playPrev);
nextBtn.addEventListener("click", playNext);

playList.forEach((item, index) => {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = playList[index].title;
  playListContainer.append(li);
});

audio.addEventListener("ended", function () {
  playNext();
});
