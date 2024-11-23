export default class GameOver {
    constructor(ctx, canvas, onRestartCallback, onEndGameCallback) {
        this.audio = document.querySelector("audio");
        this.audio.volume = 0.2;
        this.ctx = ctx;
        this.canvas = canvas;
        this.onRestartCallback = onRestartCallback;
        this.onEndGameCallback = onEndGameCallback;
        this.isVisible = false;


        this.canvas.addEventListener("click", (e) => this.handleClick(e));
    }

    drawAlert(score) {
        this.isVisible = true;
        this.audio.play();
        this.alertWidth = this.canvas.width * 0.5;
        this.alertHeight = this.canvas.height * 0.5;
        this.alertX = (this.canvas.width - this.alertWidth) / 2;
        this.alertY = (this.canvas.height - this.alertHeight) / 2;
        this.yesButtonX = this.alertX + this.alertWidth * 0.25;
        this.yesButtonY = this.alertY + this.alertHeight * 0.6;
        this.noButtonX = this.alertX + this.alertWidth * 0.55;
        this.buttonWidth = this.alertWidth * 0.2;
        this.buttonHeight = 50;


        this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        this.ctx.fillRect(this.alertX, this.alertY, this.alertWidth, this.alertHeight);
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(this.alertX, this.alertY, this.alertWidth, this.alertHeight);


        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText(
            "Game Over",
            this.alertX + this.alertWidth / 2,
            this.alertY + this.alertHeight * 0.2
        );


        this.ctx.font = "25px Arial";
        this.ctx.fillText(
            "Your score: " + score,
            this.alertX + this.alertWidth / 2,
            this.alertY + this.alertHeight * 0.35
        );


        this.ctx.font = "25px Arial";
        this.ctx.fillText(
            "Do you want to play again?",
            this.alertX + this.alertWidth / 2,
            this.alertY + this.alertHeight * 0.5
        );


        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.yesButtonX, this.yesButtonY, this.buttonWidth, this.buttonHeight);
        this.ctx.fillStyle = "white";
        this.ctx.fillText(
            "Yes",
            this.yesButtonX + this.buttonWidth / 2,
            this.yesButtonY + 35
        );


        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.noButtonX, this.yesButtonY, this.buttonWidth, this.buttonHeight);
        this.ctx.fillStyle = "white";
        this.ctx.fillText(
            "No",
            this.noButtonX + this.buttonWidth / 2,
            this.yesButtonY + 35
        );
    }

    handleClick(e) {
        if (!this.isVisible) return; // handle only if alert is visible

        const canvasRect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - canvasRect.left;
        const clickY = e.clientY - canvasRect.top;

        // yes btn
        if (
            clickX >= this.yesButtonX &&
            clickX <= this.yesButtonX + this.buttonWidth &&
            clickY >= this.yesButtonY &&
            clickY <= this.yesButtonY + this.buttonHeight
        ) {
            this.isVisible = false;
            this.clearAlert();
            this.onRestartCallback();
        }

        // no btn
        if (
            clickX >= this.noButtonX &&
            clickX <= this.noButtonX + this.buttonWidth &&
            clickY >= this.yesButtonY &&
            clickY <= this.yesButtonY + this.buttonHeight
        ) {
            this.isVisible = false;
            this.clearAlert();
            this.onEndGameCallback();
        }
    }

    clearAlert() {
        this.ctx.clearRect(this.alertX, this.alertY, this.alertWidth, this.alertHeight);
        this.audio.pause()
    }
}
