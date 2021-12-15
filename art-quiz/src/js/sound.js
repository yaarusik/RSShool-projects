export default class Sound {
    constructor() {
        this.right = './sound/correct.mp3';
        this.wrong = './sound/uncorrect.mp3';
        this.end = './sound/end.mp3';
        this.gameFinish = './sound/end.mp3';
        this.gameCenter = './sound/gamecenter.mp3';
        this.audioEffects = new Audio();
    }

    rigthAnswer() {
        this.audioEffects.src = this.right;
    }

    gameFinish() {
        this.audioEffects.src = this.gameFinish;
    }

    gameCenter() {
        this.audioEffects.src = this.gameCenter;
    }

    wrongAnswer() {
        this.audioEffects.src = this.wrong;
    }

    endGame() {
        this.audioEffects.src = this.end;
    }

    playAudio() {
        this.audioEffects.play();
    }
}
