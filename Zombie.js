const randPos = () => Math.random() * (400 - 300) + 300
const randSpeed = () => Math.random() * (5 - 1) + 1
const zombieImg = "assets/walkingdead.png"
const zombies = []

class Zombie {
    constructor(props) {
        this.x = props.x
        this.y = props.y
        this.speed = props.speed
        this.step = 200
        this.img = new Image()
        this.img.src = props.img
        zombies.push(this)
    }

    static addZombie() {
        new Zombie({
            x: canvas.width,
            y: randPos(),
            img: zombieImg,
            speed: randSpeed()
        })
    }

    delZombie() {
        zombies.splice(zombies.indexOf(this), 1)
    }

    getBounds() {
        const canvasRect = canvas.getBoundingClientRect()
        let upperLeft = {x: this.x + canvasRect.left, y: this.y + canvasRect.top}
        let lowerRight = {x: this.x + 100 + canvasRect.left, y: this.y + 200 + canvasRect.top}
        return {upperLeft, lowerRight}
    }

    draw() {
        ctx.drawImage(this.img, (this.step * 200) % 2000, 0, 200, 400, this.x, this.y, 100, 200)
        this.step++
        this.x -= this.speed
        if (this.x + 100 < 0) {
            // damage
            this.delZombie()
        }
    }

}
