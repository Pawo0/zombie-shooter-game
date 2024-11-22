import ScoreBoard from "./ScoreBoard.js";
import HpStatus from "./HpStatus.js";
import Cursor from "./Cursor.js";
import Zombie, {zombies} from "./Zombie.js";

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const cursor = new Cursor(canvas, ctx)
const score = new ScoreBoard({element: document.getElementById("score")})

canvas.width = 1024
canvas.height = 576

const background = new Image()
background.src = "assets/board-bg.jpg"
const hp = new HpStatus()

function drawBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
}

function updateAndDrawZombies() {
    zombies.forEach((zombie) => {
        zombie.draw()
    })
}

function checkIfZombieReachedEnd() {
    zombies.forEach((zombie) => {
        if (zombie.reachedEnd()) {
            hp.takeDamage()
            zombie.delZombie()
        }
    })
}


function addZombie() {
    new Zombie({x: canvas.width, ctx: ctx})
}

let lastTime = 0
const fps = 30


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


function draw(timestamp) {
    requestAnimationFrame(draw)

    const deltaTime = timestamp - lastTime
    if (deltaTime >= 40000 / fps) {
        addZombie()
        lastTime = timestamp
    }

    drawBackground()
    updateAndDrawZombies()
    checkIfZombieReachedEnd()
    cursor.drawCursor()

}

hp.displayHp()
requestAnimationFrame(draw)


canvas.addEventListener("click", shot)