const hpContainer = document.getElementById("hp")
export default class HpStatus {
    constructor() {
        this.hp = 3
        this.scaleFactor = 1
    }

    displayHp() {
        hpContainer.innerHTML = ""
        for (let i = 0; i < this.hp; i++) {
            const img = document.createElement("img")
            img.style.width = `${50 * this.scaleFactor}px`
            img.style.height = `${50 * this.scaleFactor}px`
            img.src = "assets/full_heart.png"
            hpContainer.append(img)
        }
        for (let i = 0; i < 3 - this.hp; i++) {
            const img = document.createElement("img")
            img.style.width = `${50 * this.scaleFactor}px`
            img.style.height = `${50 * this.scaleFactor}px`
            img.src = "assets/empty_heart.png"
            hpContainer.append(img)
        }
    }

    resize(canvasWidth) {
        this.scaleFactor = canvasWidth / 1024
        this.displayHp()
    }

    takeDamage() {
        if (--this.hp < 0) {
            this.hp = 0
        }
        this.displayHp()
    }

    resetHp() {
        this.hp = 3
        this.displayHp()
    }

    isAlive() {
        return this.hp > 0
    }
}