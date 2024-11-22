let mouseCanvasX = 0
let mouseCanvasY = 0

const cursor = new Image()
cursor.src = "assets/aim.png"
function drawCursor() {
    ctx.drawImage(cursor, mouseCanvasX - (cursorSize / 2), mouseCanvasY - (cursorSize / 2), cursorSize, cursorSize)
}

canvas.addEventListener("mousemove", (e) => {
    mouseCanvasX = e.clientX - main.offsetLeft
    mouseCanvasY = e.clientY - main.offsetTop
    console.log(mouseCanvasY, mouseCanvasY)
})