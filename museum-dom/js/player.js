document.querySelector("#play").addEventListener("click", playPause);
let speedCount = document.querySelector(".video__speed").children;

document.querySelector("#window").onclick = fullscreen;

let bcgPlay = document.querySelector(".panel__play");
let bcgSound = document.querySelector(".panel__sound");
let windowBtn = document.querySelector(".panel__window");

//запуск видео по кнопкам
let bigPlay = document.querySelector(".video__play");
let idVideo = document.querySelector("#video");
let videoPlayer = document.querySelector("video");
bigPlay.addEventListener("click", playPause);
videoPlayer.addEventListener("click", playPause);

let video;
let display;
let progress;
let progressVolume;
let volumeBtn;
let videoSection;
let panelOpacity;

video = document.querySelector("#video-player");
videoFull = document.querySelector(".video__player");
videoSection = document.querySelector(".video__full");
progress = document.querySelector("#progress");
progressVolume = document.querySelector("#volume-range");
panelOpacity = document.querySelector(".video__panel");

//кнопка громкости
volumeBtn = document.querySelector("#volume");
volumeBtn.onclick = volume;
//следит за вкл - выкл звука
progressVolume.oninput = volumChange;

//следит за ползунком
progressVolume.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
});
progress.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
});

//следит за воспроизведением видео
video.ontimeupdate = progressUpdate;
progress.onclick = videoRewind;

//значение звука по умолчанию
video.volume = +progressVolume.value / 100;

function playPause() {
  if (video.paused) {
    bcgPlay.style.background = "url('./../assets/video/pause.svg') center";
    // play = true;
    video.play();
    //скрывание кнопки
    bigPlay.style.opacity = 0;
  } else {
    video.pause();
    bcgPlay.style.background = "url('./../assets/video/play.svg') center";
    bigPlay.style.opacity = 1;
  }
}

// отключение включение громкости(динамически запоминаем значение)
function volume() {
  video.muted = !video.muted;
  if (video.muted) {
    //передаем кнопке звука значение прогрессбара
    volumeBtn.setAttribute("data-volume", progressVolume.value);
    bcgSound.style.backgroundImage = "url('./../assets/video/mute.svg')";

    progressVolume.value = 0;
    tracking(progressVolume);
  } else {
    progressVolume.value = volumeBtn.dataset.volume;

    bcgSound.style.backgroundImage = "url('./../assets/video/sound.svg')";
    tracking(progressVolume);
  }
}

//регулировка громкости
function volumChange(e) {
  let v = this.value;
  if (v == 0) {
    video.muted = true;
    bcgSound.style.backgroundImage = "url('./../assets/video/mute.svg')";
  } else {
    //видео регулируется в процентах
    video.volume = v / 100;
    bcgSound.style.backgroundImage = "url('./../assets/video/sound.svg')";
    video.muted = false;
  }
  return v;
}

//увеличение и уменьшение громкости клавишами
function volumUpDown(e) {
  if (e.code == "ArrowUp") {
    if (progressVolume.value < 100) {
      progressVolume.value = +progressVolume.value + 10;
      video.volume += 0.1;
      bcgSound.style.backgroundImage = "url('./../assets/video/sound.svg')";

      tracking(progressVolume);
    }
  } else if (e.code == "ArrowDown") {
    if (progressVolume.value > 0) {
      progressVolume.value = +progressVolume.value - 10;
      video.volume -= 0.1;
      tracking(progressVolume);
      if (video.volume < 0.1) {
        bcgSound.style.backgroundImage = "url('./../assets/video/mute.svg')";
      }
    }
  }
}

//полноэкранный режим
function fullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    videoFull.style.overflow = "hidden";
    panelOpacity.style.transform = "translateY(-47%)";
    bigPlay.style.top = "44.4%";
    windowBtn.style.backgroundImage = "url('./../assets/video/window.svg')";
  } else if (document.webkitFullscreenElement) {
    // Need this to support Safari
    document.webkitExitFullscreen();
    videoFull.style.overflow = "hidden";
    panelOpacity.style.transform = "translateY(-47%)";
    bigPlay.style.top = "44.4%";
    windowBtn.style.backgroundImage = "url(./../assets/video/window.svg')";
  } else if (videoSection.webkitRequestFullscreen) {
    // Need this to support Safari
    videoSection.webkitRequestFullscreen();
    videoFull.style.overflow = "visible";
    panelOpacity.style.transform = "translateY(0%)";
    bigPlay.style.top = "65%";
    windowBtn.style.backgroundImage =
      "url('./../assets/video/fullscreen_exit.svg')";
  } else {
    videoSection.requestFullscreen();
    videoFull.style.overflow = "visible";
    panelOpacity.style.transform = "translateY(0%)";
    bigPlay.style.top = "65%";
    windowBtn.style.backgroundImage =
      "url('./../assets/video/fullscreen_exit.svg')";
  }
}

//проверка конца видео
video.addEventListener("ended", check);

function check() {
  if (video.ended === true) {
    video.pause();
    bigPlay.style.opacity = 1;
    bcgPlay.classList.remove("pause__btn");
    bcgPlay.style.background = "url('./../assets/video/play.svg')";
  }
}

//переключение по времени видео
function progressUpdate() {
  //полное время видео
  let d = video.duration;
  //текущее время видео
  let c = video.currentTime;
  progress.value = (100 * c) / d;
  tracking(progress);
  // progress.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${progress.value}%, #fff ${progress.value}%, white 100%)`;
}

//функция слежки за ползунком
function tracking(obj) {
  obj.style.background = `linear-gradient(to right, #710707 0%, #710707 ${obj.value}%, #fff ${obj.value}%, white 100%)`;
}

// перемотка
function videoRewind(e) {
  //длина progressBar
  let w = this.offsetWidth;
  // текущее положение
  let o = e.offsetX;
  // задаем значение progressBar
  this.value = (o * 100) / w;

  // перемотка
  playPause();
  video.currentTime = video.duration * (o / w);
  playPause();
}

//ускорение и замедление
function speedChange(e) {
  if (e == "up") {
    if (video.playbackRate < 2) {
      video.playbackRate += 0.5;
      speedCount[0].textContent = video.playbackRate + "x";
    }
    setTimeout(function () {
      speedCount[0].textContent = "";
    }, 1000);
  } else if (e == "down") {
    if (video.playbackRate > 0.5) {
      video.playbackRate -= 0.5;
      speedCount[0].textContent = video.playbackRate + "x";
    }
    setTimeout(function () {
      speedCount[0].textContent = "";
    }, 1000);
  }
}

// //реализация клавиш
idVideo.addEventListener("keyup", function (e) {
  //пробел
  if (e.code == "Space") {
    playPause();
  }
  //М
  if (e.code == "KeyM") {
    volume();
  }
  //F
  if (e.code == "KeyF") {
    fullscreen();
  }

  if (e.shiftKey && ["Ю", ">"].includes(e.key)) {
    e = "down";
    speedChange(e);
  }
  if (e.shiftKey && ["Б", "<"].includes(e.key)) {
    e = "up";
    speedChange(e);
  }

  //home - видео в начало
  if (e.code == "Home") {
    video.currentTime = 0;
  }
  //end - видео в конец
  if (e.code == "End") {
    video.currentTime = video.duration;
  }
  //cтрелка вверх и вниз
  if (e.code == "ArrowUp" || e.code == "ArrowDown") {
    volumUpDown(e);
  }
  // //P
  // if (e.code == "KeyP") {
  //   forward();
  // }
  // //N
  // if (e.code == "KeyN") {
  //   rewind();
  // }
});

// //слайдер
// let currentItem = 0;

// let videoSrc = [
//   "assets/video/video0.mp4",
//   "assets/video/video1.mp4",
//   "assets/video/video2.mp4",
// ];
// let posterSrc = [
//   "assets/video/poster0.jpg",
//   "assets/video/poster1.jpg",
//   "assets/video/poster2.jpg",
// ];

// function changeCurrentItem(n) {
//   //формуда для бесконечного слайдера. как только последний элемент слайдера. при делении с остатком у нас обнулит currentItem - при минусе тоже самое
//   currentItem = (n + videoSrc.length) % videoSrc.length;
// }

// function forward() {
//   changeCurrentItem(currentItem + 1);
//   video.src = videoSrc[currentItem];
//   video.poster = posterSrc[currentItem];
//   playPause();
//   playPause();
// }
// function rewind() {
//   changeCurrentItem(currentItem - 1);
//   video.src = videoSrc[currentItem];
//   video.poster = posterSrc[currentItem];
//   playPause();
//   playPause();
// }
//скрывание панели
// videoSection.addEventListener("mousemove", panelOpacityChange);

// function panelOpacityChange() {
//   if (!video.paused) {
//     panelOpacity.style.opacity = 1;
//     setTimeout(function () {
//       if (!video.paused) panelOpacity.style.opacity = 0;
//     }, 5000);
//   } else if (video.paused) {
//     panelOpacity.style.opacity = 1;
//   }
// }
