export default class Cursor {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx

        this.mouseCanvasX = 0
        this.mouseCanvasY = 0
        this.cursorSize = 150


        this.cursor = new Image()
        this.cursor.src = "assets/aim.png"

        this.canvas.addEventListener("mousemove", (e) => this.updateCursorPosition(e));
    }


    drawCursor() {
        this.ctx.drawImage(
            this.cursor,
            this.mouseCanvasX - (this.cursorSize / 2), this.mouseCanvasY - (this.cursorSize / 2),
            this.cursorSize, this.cursorSize
        )
    }


    updateCursorPosition(e) {
        const canvasRect = this.canvas.getBoundingClientRect();
        this.mouseCanvasX = e.clientX - canvasRect.left;
        this.mouseCanvasY = e.clientY - canvasRect.top;
    }


}

