class Sound {
  song: string;

  audio: HTMLAudioElement;

  constructor() {
    this.song = './assets/sound/jingleRock.mp3';
    this.audio = new Audio();
  }

  christmas() {
    this.audio.src = this.song;
  }

  playAudio() {
    return this.audio.play();
  }

  stopAudio(): void {
    this.audio.pause();
  }
}

const christmasSong = new Sound();
const soundBtn = document.querySelector('.sound__btn');

const audioPlay = () => {
  if (soundBtn?.classList.contains('sound__btn-on')) {
    soundBtn?.classList.remove('sound__btn-on');
    christmasSong.stopAudio();
  } else {
    soundBtn?.classList.add('sound__btn-on');
    christmasSong.christmas();
    christmasSong.playAudio();
  }
};

if (soundBtn) soundBtn.addEventListener('click', audioPlay);
