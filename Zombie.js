const randPos = (min = 300, max = 400) => Math.random() * (max - min) + min
const randSpeed = (min = 1, max = 5) => Math.random() * (max - min) + min
const randSize = (min = 80, max = 120) => Math.random() * (max - min) + min
let zombies = []

const zombieSpriteWidth = 200
const zombieSpriteHeight = 400
const zombieImg = new Image()
zombieImg.src = "assets/walkingdead.png"


export default class Zombie {
    constructor(props) {
        this.ctx = props.ctx
        this.canvas = props.canvas
        this.scaleFactor = this.canvas.width / 1024


        this.baseSpeed = randSpeed(props.minSpeed, props.maxSpeed)
        this.baseY = randPos(300, 400)
        this.baseZombieWidth = randSize(80, 120)
        this.baseZombieHeight = this.baseZombieWidth * 2


        this.x = props.x
        this.speed = this.baseSpeed * this.scaleFactor
        this.y = this.baseY * this.scaleFactor
        this.zombieWidth = this.baseZombieWidth * this.scaleFactor
        this.zombieHeight = this.baseZombieHeight * this.scaleFactor


        this.step = 0
        this.frameX = 0
        console.log("speed zombie between ", props.minSpeed, " and ", props.maxSpeed, " is ", this.speed)
        zombies.push(this)
    }

    static resize(canvasWidth) {
        let newScaleFactor = canvasWidth / 1024
        zombies.forEach(zombie => {
            zombie.x = zombie.x / zombie.scaleFactor * newScaleFactor;
            zombie.scaleFactor = newScaleFactor;
            zombie.y = zombie.baseY * zombie.scaleFactor;
            zombie.speed = zombie.baseSpeed * zombie.scaleFactor;
            zombie.zombieWidth = zombie.baseZombieWidth * zombie.scaleFactor;
            zombie.zombieHeight = zombie.baseZombieHeight * zombie.scaleFactor;
        })
    }


    delZombie() {
        zombies = zombies.filter((zombie) => zombie !== this)
    }

    getBounds() {
        let upperLeft = {x: this.x, y: this.y}
        let lowerRight = {x: this.x + this.zombieWidth, y: this.y + this.zombieHeight}
        return {upperLeft, lowerRight}
    }

    isHit(x, y) {
        const {upperLeft, lowerRight} = this.getBounds()
        return (
            upperLeft.x < x &&
            lowerRight.x > x &&
            upperLeft.y < y &&
            lowerRight.y > y
        )
    }

    reachedEnd() {
        return this.x + this.zombieWidth < 0
    }

    update(deltaTime) {
        this.frameX = (Math.round(this.step++ / 2) % 10) * zombieSpriteWidth
        let changeSpeed = (this.speed * deltaTime) / 30
        this.x -= changeSpeed
    }


    draw(deltaTime) {
        this.update(deltaTime)
        this.ctx.drawImage(
            zombieImg,
            this.frameX, 0,
            zombieSpriteWidth, zombieSpriteHeight,
            this.x, this.y,
            this.zombieWidth, this.zombieHeight
        )
        if (this.reachedEnd()) {
            console.log("Zombie dead")
        }
    }

}

export {zombies}