const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

const background = new Image()
background.src = "assets/board-bg.jpg"


function drawBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
}

function drawZombies() {
    zombies.forEach((zombie) => {
        zombie.draw()
    })
}

let lastTime = 0
const fps = 30

function draw(timestamp) {
    requestAnimationFrame(draw)

    const deltaTime = timestamp - lastTime
    if (deltaTime >= 40000 / fps) {
        Zombie.addZombie()
        lastTime = timestamp
    }

    drawBackground()
    drawZombies()
    drawCursor()
}

requestAnimationFrame(draw)


