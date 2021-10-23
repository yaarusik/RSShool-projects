import playList from "./playList.js";

const playBtn = document.querySelector(".play");
const prevBtn = document.querySelector(".play-prev");
const nextBtn = document.querySelector(".play-next");
const playListContainer = document.querySelector(".play-list");
const playListChildren = playListContainer.children;
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress-bar");
const progressDuration = document.querySelector(".progress-duration");
const soundBtn = document.querySelector(".player-icon__volume");
const progressVolume = document.querySelector(".range");
const progressTitle = document.querySelector(".progress-title");

let isPlay = false;
let playNum = 0;
const audio = new Audio();
audio.src = playList[playNum].src;
progressTitle.textContent = playList[playNum].title;

//значение звука по умолчанию
audio.volume = +progressVolume.value / 100;
// сохраняет предыдущий номер песни
let playNumSave;
// текущее время
progressDuration.textContent = `0:00 / ${playList[playNum].duration}`;

const playAudio = () => {
  audio.src = playList[playNum].src;
  progressTitle.textContent = playList[playNum].title;
  audio.currentTime = 0;
  if (!isPlay) {
    audio.play();
    isPlay = true;
    playBtn.classList.add("pause");
    changeIndicator();
    playItem[playNum].className = "play-item change-item playlist-indicator";
  } else {
    audio.pause();
    isPlay = false;
    playBtn.classList.remove("pause");
    playItem[playNum].className = "play-item";
  }
};

const playNext = () => {
  deleteIndicator(playNum);
  playNumSave = playNum;
  playNum++;
  if (playNum > 4) playNum = 0;
  changeIndicator();
  isPlay = false;
  playAudio();
};

const playPrev = () => {
  deleteIndicator(playNum);
  playNumSave = playNum;
  playNum--;
  if (playNum < 0) playNum = 4;
  changeIndicator();
  isPlay = false;
  playAudio();
};

const changeIndicator = () => {
  playListChildren[playNum].classList.add("playlist-indicator");

  if (playListChildren[playNumSave]) {
    playListChildren[playNumSave].classList.remove("playlist-indicator");
  }
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
  deleteIndicator(playNum);
});

// progressBar
const updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPersent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPersent}%`;

  progressDuration.textContent = timeFormat(currentTime);
};

// счетчик
function timeFormat(ct) {
  let minutes = Math.floor(ct / 60);
  let seconds = Math.floor(ct % 60);

  if (seconds < 10) seconds = "0" + seconds;

  return `${minutes}:${seconds} / ${playList[playNum].duration}`;
}

audio.addEventListener("timeupdate", updateProgress);

// set progressBar

function setProgress(e) {
  const width = this.offsetWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener("click", setProgress);

// регулировка громкости
soundBtn.addEventListener("click", function () {
  volumeMute();
  volume();
});

function volumeMute() {
  audio.muted = !audio.muted;
  if (audio.muted) {
    soundBtn.classList.add("mute");
  } else {
    soundBtn.classList.remove("mute");
  }
}
// уменьшение и увеличение громкости
progressVolume.oninput = volumeChange;

function volumeChange(e) {
  let v = this.value;
  if (v == 0) {
    audio.muted = true;
    soundBtn.classList.add("mute");
  } else {
    //видео регулируется в процентах
    audio.volume = v / 100;
    soundBtn.classList.remove("mute");
    audio.muted = false;
  }
  return v;
}

// следит за ползунком
progressVolume.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${value}%, #e4e9eb ${value}%, #e4e9eb 100%)`;
});

// запоминает значение громкости
function volume() {
  if (audio.muted) {
    //передаем кнопке звука значение прогрессбара
    soundBtn.setAttribute("data-volume", progressVolume.value);
    soundBtn.classList.add("mute");
    progressVolume.value = 0;
    tracking(progressVolume);
  } else {
    progressVolume.value = soundBtn.dataset.volume;
    soundBtn.classList.remove("mute");
    tracking(progressVolume);
  }
}

function tracking(obj) {
  obj.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${obj.value}%, #e4e9eb ${obj.value}%, #e4e9eb 100%)`;
}

const playItem = document.querySelectorAll(".play-item");

// ПО клику на текст песни
playItem.forEach((item, index) => {
  item.addEventListener("click", function () {
    playNum = index;
    deleteIndicator(playNum);

    playAudio();

    // playNumSave = playNum;
  });
});

function deleteIndicator(num) {
  playItem.forEach((item) => {
    if (item.classList.contains("playlist-indicator")) {
      item.classList.remove("playlist-indicator");
      item.className = "play-item";
    }
  });
}
