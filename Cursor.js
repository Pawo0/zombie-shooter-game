let mouseCanvasX = 0
let mouseCanvasY = 0
const cursorSize = 150

const score = new ScoreBoard({element: document.getElementById("score")})

const cursor = new Image()
cursor.src = "assets/aim.png"

function drawCursor() {
    ctx.drawImage(cursor, mouseCanvasX - (cursorSize / 2), mouseCanvasY - (cursorSize / 2), cursorSize, cursorSize)
}


function shot(e) {
    let zombieShot = false
    for (let i = 0; i < zombies.length; i++) {
        let zombie = zombies[i]
        const {upperLeft, lowerRight} = zombie.getBounds()
        const isCollision =
            upperLeft.x < e.clientX &&
            lowerRight.x > e.clientX &&
            upperLeft.y < e.clientY &&
            lowerRight.y > e.clientY
        if (isCollision) {
            zombie.delZombie()
            i--;
            score.updateScore(20)
            zombieShot = true
        }
    }
    if (!zombieShot) {
        score.updateScore(-5)
    }
}

window.addEventListener("click", shot)
canvas.addEventListener("mousemove", (e) => {
    mouseCanvasX = e.clientX - main.offsetLeft
    mouseCanvasY = e.clientY - main.offsetTop
})