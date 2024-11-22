const randPos = () => Math.random() * (400 - 300) + 300
const randSpeed = () => Math.random() * (5 - 1) + 1
let zombies = []

const zombieSpriteWidth = 200
const zombieSpriteHeight = 400
const zombieWidth = 100
const zombieHeight = 200
const zombieImg = new Image()
zombieImg.src = "assets/walkingdead.png"


class Zombie {
    constructor(props) {
        this.x = props.x
        this.y = props.y
        this.speed = props.speed
        this.step = 0
        this.img = new Image()
        this.img.src = props.img
        zombies.push(this)
    }

    static addZombie() {
        new Zombie({
            x: canvas.width,
            y: randPos(),
            speed: randSpeed()
        })
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

    draw() {
        const frameX = (this.step++ % 10) * zombieSpriteWidth
        ctx.drawImage(
            zombieImg,
            frameX, 0,
            zombieSpriteWidth, zombieSpriteHeight,
            this.x, this.y,
            zombieWidth, zombieHeight
        )
        this.x -= this.speed
        if (this.x + 100 < 0) {
            // damage
            this.delZombie()
        }
    }

}
