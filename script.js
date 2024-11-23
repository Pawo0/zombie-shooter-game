import ScoreBoard from "./ScoreBoard.js";
import HpStatus from "./HpStatus.js";
import Cursor from "./Cursor.js";
import Zombie, {zombies} from "./Zombie.js";
import ZombieSpawner from "./ZombieSpawner.js";
import GameOver from "./GameOver.js";

const background = new Image()
background.src = "assets/board-bg.jpg"


const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")


const cursor = new Cursor(canvas, ctx)
const score = new ScoreBoard({element: document.getElementById("score")})
const hp = new HpStatus(canvas)
let zombieSpawner = new ZombieSpawner(ctx, canvas)
const gameOver = new GameOver(ctx, canvas, restartGame, endGame)


function resizeCanvas() {
    const ratio = 16 / 9
    if (window.innerWidth / window.innerHeight > ratio) {
        canvas.width = window.innerHeight * ratio
        canvas.height = window.innerHeight
    }else{
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
    zombieSpawner = new ZombieSpawner(ctx, canvas)
    zombieSpawner.start()
    hp.resetHp()
    score.resetScore()
    canvas.addEventListener("click", shot)
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
            hp.takeDamage()
            zombie.delZombie()
        }
    })
}

function shot(e) {
    let gunShot = new Audio("assets/p90_shot.mp3")
    gunShot.volume = 0.5
    gunShot.play()
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

let lastTime = 0

function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime
    lastTime = timestamp
    requestAnimationFrame(gameLoop)

    drawBackground()
    if (hp.isAlive()) {
        updateAndDrawZombies(deltaTime)
        checkIfZombieReachedEnd()
    } else {
        zombieSpawner.stop()
        gameOver.drawAlert(score.getScore())
        canvas.removeEventListener("click", shot)
    }
    drawCursor()

}

setTimeout(()=>zombieSpawner.start(),1000)
hp.displayHp()
requestAnimationFrame(gameLoop)
canvas.addEventListener("click", shot)
window.addEventListener('resize',resizeCanvas)
window.addEventListener('load',resizeCanvas)