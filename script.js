import ScoreBoard from "./ScoreBoard.js";
import HpStatus from "./HpStatus.js";
import Cursor from "./Cursor.js";
import Zombie, {zombies} from "./Zombie.js";
import ZombieSpawner from "./ZombieSpawner.js";
import GameOver from "./GameOver.js";
import SoundManage from "./SoundManage.js";

const background = new Image()
background.src = "assets/board-bg.jpg"


const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let gameJustEnded = true


const cursor = new Cursor(canvas, ctx)
const score = new ScoreBoard({element: document.getElementById("score")})
const hp = new HpStatus(canvas)
const soundManage = new SoundManage()
let zombieSpawner = new ZombieSpawner(ctx, canvas)
const gameOver = new GameOver(ctx, canvas, restartGame, endGame)


function resizeCanvas() {
    const ratio = 16 / 9
    if (window.innerWidth / window.innerHeight > ratio) {
        canvas.width = window.innerHeight * ratio
        canvas.height = window.innerHeight
    } else {
        canvas.width = window.innerWidth
        canvas.height = window.innerWidth / ratio
    }
    hp.resize(canvas.width)
    score.resize(canvas.width)
    cursor.resize(canvas.width)
    Zombie.resize(canvas.width)
    zombieSpawner.resize(canvas.width)
    gameOver.resize(canvas.width)

}

function restartGame() {
    zombies.length = 0
    gameJustEnded = true
    soundManage.stopEndGameSound()
    soundManage.playBackgroundSound()
    zombieSpawner = new ZombieSpawner(ctx, canvas)
    zombieSpawner.start()
    hp.resetHp()
    score.resetScore()
    canvas.addEventListener("click", shot)
    canvas.style.cursor = "none"
}

function endGame() {
    window.alert("lmao, there is no end for you")
}

function drawBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
}

function updateAndDrawZombies(deltaTime) {
    zombies.forEach((zombie) => {
        zombie.draw(deltaTime)
    })
}

function drawCursor() {
    cursor.drawCursor()
}

// game logic
function checkIfZombieReachedEnd() {
    zombies.forEach((zombie) => {
        if (zombie.reachedEnd()) {
            soundManage.playZombieAttackSound()
            hp.takeDamage()
            zombie.delZombie()
        }
    })
}

function shot(e) {
    soundManage.playShotSound()
    let zombieDead = false
    for (let i = 0; i < zombies.length; i++) {
        const canvasRect = canvas.getBoundingClientRect()
        let zombie = zombies[i]
        if (zombie.isHit(e.clientX - canvasRect.left, e.clientY - canvasRect.top)) {
            soundManage.playZombieFallingSound()
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

let lastTime = 0

function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime
    lastTime = timestamp
    requestAnimationFrame(gameLoop)

    drawBackground()
    if (hp.isAlive()) {
        updateAndDrawZombies(deltaTime)
        checkIfZombieReachedEnd()
        drawCursor()
    } else {
        if (gameJustEnded) {
            gameJustEnded = false
            soundManage.playLoseScreamSound()
            soundManage.stopBackgroundSound()
            soundManage.playEndGameSound()
            zombieSpawner.stop()
            canvas.removeEventListener("click", shot)
            canvas.style.cursor = "default"
        }
        gameOver.drawAlert(score.getScore())
    }

}

setTimeout(() => zombieSpawner.start(), 1000)
soundManage.playBackgroundSound()
hp.displayHp()
requestAnimationFrame(gameLoop)
canvas.addEventListener("click", shot)
window.addEventListener('resize', resizeCanvas)
window.addEventListener('load', resizeCanvas)