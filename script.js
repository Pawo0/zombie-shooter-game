const main = document.getElementById("main")
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
let score = 0;
canvas.width = 1024
canvas.height = 576

const background = new Image()
background.src = "assets/board-bg.jpg"
background.onload = () => {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
}

const randPos = () => Math.random() * (400 - 300) + 300
const randSpeed = () => Math.random() * (5 - 1) + 1
const zombieImg = "assets/walkingdead.png"
const zombies = []


Zombie.addZombie()
requestAnimationFrame(draw)

function collisionDetection(e) {
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
            score += 20
            zombieShot = true
        }
    }
    if (!zombieShot) {
        score -= 5
    }
    updateScore()
}

let mouseCanvasX = 0
let mouseCanvasY = 0

canvas.addEventListener("mousemove", (e) => {
    mouseCanvasX = e.clientX - main.offsetLeft
    mouseCanvasY = e.clientY - main.offsetTop
    console.log(mouseCanvasY, mouseCanvasY)
})

window.addEventListener("click", collisionDetection)

let lastTime = 0
const fps = 30
const cursor = new Image()
cursor.src = "assets/aim.png"


const cursorSize = 150

function drawCursor() {
    ctx.drawImage(cursor, mouseCanvasX - (cursorSize / 2), mouseCanvasY - (cursorSize / 2), cursorSize, cursorSize)
}


function updateScore() {
    document.getElementById("score").innerHTML = score;
}

function draw(timestamp) {
    requestAnimationFrame(draw)

    const deltaTime = timestamp - lastTime
    if (deltaTime >= 40000 / fps) {
        Zombie.addZombie()
        lastTime = timestamp
    }
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    zombies.forEach((zombie) => {
        zombie.draw()
    })
    drawCursor()
}



