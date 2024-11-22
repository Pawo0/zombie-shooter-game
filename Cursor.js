let mouseCanvasX = 0
let mouseCanvasY = 0
const cursorSize = 150

const score = new ScoreBoard({element: document.getElementById("score")})

const cursor = new Image()
cursor.src = "assets/aim.png"

function drawCursor() {
    ctx.drawImage(
        cursor,
        mouseCanvasX - (cursorSize / 2), mouseCanvasY - (cursorSize / 2),
        cursorSize, cursorSize
    )
}


function shot(e) {
    let zombieDead = false
    for (let i = 0; i < zombies.length; i++) {
        const canvasRect = canvas.getBoundingClientRect()
        let zombie = zombies[i]
        if (zombie.isHit(e.clientX - canvasRect.left, e.clientY - canvasRect.top)) {
            zombie.delZombie()
            score.updateScore(20)
            zombieDead = true
            i--;
        }
    }
    if (!zombieDead) {
        score.updateScore(-5)
    }
}

canvas.addEventListener("click", shot)
canvas.addEventListener("mousemove", (e) => {
    const canvasRect = canvas.getBoundingClientRect();
    mouseCanvasX = e.clientX - canvasRect.left;
    mouseCanvasY = e.clientY - canvasRect.top;
})