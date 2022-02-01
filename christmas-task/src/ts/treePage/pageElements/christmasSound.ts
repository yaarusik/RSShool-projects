let sound = localStorage.getItem('soundSwitch') || 'off';
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

export const getSound = () => {
  return sound;
};

const christmasSong = new Sound();
const soundBtn = document.querySelector('.sound__btn');

export const audioPlay = (song?: string) => {
  if (soundBtn?.classList.contains('sound__btn-on') || song) {
    soundBtn?.classList.remove('sound__btn-on');
    christmasSong.stopAudio();
    sound = 'off';
    localStorage.setItem('soundSwitch', sound);
  } else {
    soundBtn?.classList.add('sound__btn-on');
    christmasSong.christmas();
    christmasSong.playAudio();
    sound = 'on';
    localStorage.setItem('soundSwitch', sound);
  }
};

if (sound === 'on') {
  document.body.addEventListener(
    'click',
    () => {
      audioPlay();
    },
    { once: true }
  );
}

if (soundBtn)
  soundBtn.addEventListener('click', () => {
    audioPlay();
  });
