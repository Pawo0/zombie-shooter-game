export default class ScoreBoard {
    constructor(props) {
        this.score = 0;
        this.element = props.element
    }

    displayScore() {
        this.element.innerHTML = this.score;
    }

    updateScore(scoreChange) {
        this.score += scoreChange;
        this.displayScore();
    }
}
