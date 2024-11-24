export default class ScoreBoard {
    constructor(props) {
        this.score = 0;
        this.element = props.element
        this.size = props.size
    }

    resize(canvasWidth) {
        const fontSize = canvasWidth * this.size
        this.element.style.fontSize = `${fontSize}px`
    }

    displayScore() {
        this.element.innerHTML = this.score;
    }

    updateScore(scoreChange) {
        this.score += scoreChange;
        this.displayScore();
    }

    setScore(score) {
        this.score = score;
        this.displayScore();
    }

    resetScore() {
        this.score = 0;
        this.displayScore();
    }

    getScore() {
        return this.score
    }
}
