import ScoreBoard from "./ScoreBoard.js";
import HpStatus from "./HpStatus.js";
import Cursor from "./Cursor.js";
import {zombies} from "./Zombie.js";
import ZombieSpawner from "./ZombieSpawner.js";

const background = new Image()
background.src = "assets/board-bg.jpg"

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 576

const cursor = new Cursor(canvas, ctx)
const score = new ScoreBoard({element: document.getElementById("score")})
const hp = new HpStatus()
const zombieSpawner = new ZombieSpawner(ctx, canvas)


function drawBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
}

function updateAndDrawZombies() {
    zombies.forEach((zombie) => {
        zombie.draw()
    })
}

function drawCursor() {
    cursor.drawCursor()
}

// game logic
function checkIfZombieReachedEnd() {
    zombies.forEach((zombie) => {
        if (zombie.reachedEnd()) {
            hp.takeDamage()
            zombie.delZombie()
        }
    })
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
            return
        }
    }
    if (!zombieDead) {
        score.updateScore(-5)
    }
}


function draw() {
    requestAnimationFrame(draw)

    drawBackground()
    updateAndDrawZombies()
    checkIfZombieReachedEnd()
    drawCursor()

}

zombieSpawner.start()
hp.displayHp()
requestAnimationFrame(draw)
canvas.addEventListener("click", shot)
