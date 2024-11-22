const hpContainer = document.getElementById("hp")
export default class HpStatus {
    constructor() {
        this.hp = 3
    }

    displayHp() {
        hpContainer.innerHTML = ""
        for (let i = 0; i < this.hp; i++) {
            const img = document.createElement("img")
            img.src = "assets/full_heart.png"
            hpContainer.append(img)
        }
        for (let i = 0; i < 3 - this.hp; i++) {
            const img = document.createElement("img")
            img.src = "assets/empty_heart.png"
            hpContainer.append(img)
        }
    }

    takeDamage() {
        if (--this.hp < 0) {
            this.hp = 0
        }
        this.displayHp()
    }
}