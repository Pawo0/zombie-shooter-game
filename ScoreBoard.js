export default class ScoreBoard {
    constructor(props) {
        this.score = 0;
        this.element = props.element
    }

    resize(canvasWidth) {
        const fontSize = canvasWidth * 0.05
        this.element.style.fontSize = `${fontSize}px`
    }

    displayScore() {
        this.element.innerHTML = this.score;
    }

    updateScore(scoreChange) {
        this.score += scoreChange;
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
