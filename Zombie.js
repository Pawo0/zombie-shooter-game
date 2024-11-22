const randPos = () => Math.random() * (400 - 300) + 300
const randSpeed = () => Math.random() * (5 - 1) + 1
let zombies = []

const zombieSpriteWidth = 200
const zombieSpriteHeight = 400
const zombieWidth = 100
const zombieHeight = 200
const zombieImg = new Image()
zombieImg.src = "assets/walkingdead.png"


export default class Zombie {
    constructor(props) {
        this.ctx = props.ctx

        this.x = props.x
        this.y = randPos()
        this.speed = randSpeed()
        this.step = 0

        this.frameX = 0

        zombies.push(this)
    }

    delZombie() {
        zombies = zombies.filter((zombie) => zombie !== this)
    }

    getBounds() {
        let upperLeft = {x: this.x, y: this.y}
        let lowerRight = {x: this.x + 100, y: this.y + 200}
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
        return this.x + zombieWidth < 0
    }

    update() {
        this.frameX = (Math.round(this.step++ / 2) % 10) * zombieSpriteWidth
        this.x -= this.speed
    }


    draw() {
        this.update()
        this.ctx.drawImage(
            zombieImg,
            this.frameX, 0,
            zombieSpriteWidth, zombieSpriteHeight,
            this.x, this.y,
            zombieWidth, zombieHeight
        )
        if (this.reachedEnd()) {
            console.log("Zombie dead")
        }
    }

}

export {zombies}