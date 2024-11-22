import Zombie from "./Zombie.js";

export default class ZombieSpawner {
    constructor(ctx, canvas) {
        this.ctx = ctx
        this.canvas = canvas

        this.minSpawnInterval = 1000
        this.maxSpawnInterval = 2000
        this.changeSpawnInterval = 20
        this.minLimitSpawnInterval = 200
        this.maxLimitSpawnInterval = 500

        this.maxSpeed = 5
        this.minSpeed = 1
        this.changeSpeed = 0.1
        this.maxSpeedLimit = 10
        this.minSpeedLimit = 8


    }

    randomSpawnInterval() {
        return Math.random() * (this.maxSpawnInterval - this.minSpawnInterval) + this.minSpawnInterval
    }

    updateSpawnInterval() {
        this.minSpawnInterval -= this.changeSpawnInterval
        this.maxSpawnInterval -= this.changeSpawnInterval * 1.5
        if (this.minSpawnInterval < this.minLimitSpawnInterval) {
            this.minSpawnInterval = this.minLimitSpawnInterval
        }
        if (this.maxSpawnInterval < this.maxLimitSpawnInterval) {
            this.maxSpawnInterval = this.maxLimitSpawnInterval
        }
    }

    updateSpeed() {
        this.minSpeed = this.minSpeed + this.changeSpeed > this.minSpeedLimit ? this.minSpeedLimit : this.minSpeed + this.changeSpeed
        this.maxSpeed = this.maxSpeed + this.changeSpeed > this.maxSpeedLimit ? this.maxSpeedLimit : this.maxSpeed + this.changeSpeed
    }

    start() {
        this.spawnInterval = this.randomSpawnInterval()
        this.timeout = setTimeout(() => this.start(), this.spawnInterval)
        this.updateSpawnInterval()
        this.updateSpeed()

        console.log(this.minSpawnInterval, this.maxSpawnInterval)
        new Zombie({x: this.canvas.width, ctx: this.ctx, minSpeed: this.minSpeed, maxSpeed: this.maxSpeed})
    }

    stop(){
        clearTimeout(this.timeout)
    }
}



