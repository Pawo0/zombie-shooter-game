export default class GameOver {
    constructor(ctx, canvas, onRestartCallback, onEndGameCallback) {
        this.audio = document.querySelector("audio");
        this.audio.volume = 0.5;
        this.ctx = ctx;
        this.canvas = canvas;
        this.onRestartCallback = onRestartCallback;
        this.onEndGameCallback = onEndGameCallback;
        this.isVisible = false;
        this.baseAlertWidth = 0.5;
        this.baseAlertHeight = 0.5;
        this.baseButtonHeight = 50;

        this.scaleFactor = this.canvas.width / 1024;

        this.updateDimensions();

        this.canvas.addEventListener("click", (e) => this.handleClick(e));
    }

    updateDimensions() {
        this.alertWidth = this.canvas.width * this.baseAlertWidth;
        this.alertHeight = this.canvas.height * this.baseAlertHeight;
        this.alertX = (this.canvas.width - this.alertWidth) / 2;
        this.alertY = (this.canvas.height - this.alertHeight) / 2;
        this.buttonWidth = this.alertWidth * 0.2;
        this.buttonHeight = this.baseButtonHeight * this.scaleFactor;

        this.yesButtonX = this.alertX + this.alertWidth * 0.25;
        this.yesButtonY = this.alertY + this.alertHeight * 0.6;
        this.noButtonX = this.alertX + this.alertWidth * 0.55;
    }

    resize(canvasWidth) {
        this.scaleFactor = canvasWidth / 1024;
        this.updateDimensions();
    }

    drawAlert(score) {
        this.isVisible = true;
        this.audio.play();


        this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        this.ctx.fillRect(this.alertX, this.alertY, this.alertWidth, this.alertHeight);
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(this.alertX, this.alertY, this.alertWidth, this.alertHeight);

        // text in alerts
        this.ctx.fillStyle = "white";
        this.ctx.font = `${30 * this.scaleFactor}px Arial`;
        this.ctx.textAlign = "center";
        this.ctx.fillText(
            "Game Over",
            this.alertX + this.alertWidth / 2,
            this.alertY + this.alertHeight * 0.2
        );

        this.ctx.font = `${25 * this.scaleFactor}px Arial`;
        this.ctx.fillText(
            "Your score: " + score,
            this.alertX + this.alertWidth / 2,
            this.alertY + this.alertHeight * 0.35
        );

        this.ctx.fillText(
            "Do you want to play again?",
            this.alertX + this.alertWidth / 2,
            this.alertY + this.alertHeight * 0.5
        );

        // buttons
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.yesButtonX, this.yesButtonY, this.buttonWidth, this.buttonHeight);
        this.ctx.fillStyle = "white";
        this.ctx.fillText(
            "Yes",
            this.yesButtonX + this.buttonWidth / 2,
            this.yesButtonY + this.buttonHeight * 0.7
        );

        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.noButtonX, this.yesButtonY, this.buttonWidth, this.buttonHeight);
        this.ctx.fillStyle = "white";
        this.ctx.fillText(
            "No",
            this.noButtonX + this.buttonWidth / 2,
            this.yesButtonY + this.buttonHeight * 0.7
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
        this.audio.pause();
    }
}
