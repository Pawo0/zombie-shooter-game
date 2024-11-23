import Zombie from "./Zombie.js";

export default class ZombieSpawner {
    constructor(ctx, canvas) {
        this.ctx = ctx
        this.canvas = canvas

        this.minSpawnInterval = 1000
        this.maxSpawnInterval = 2000
        this.changeSpawnInterval = 10
        this.minLimitSpawnInterval = 300
        this.maxLimitSpawnInterval = 1000

        this.maxSpeed = 5
        this.minSpeed = 1
        this.changeSpeed = 0.1
        this.maxSpeedLimit = 12
        this.minSpeedLimit = 8

        this.scaling = null

    }

    resize(canvasWidth) {
        this.canvas.width = canvasWidth

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
        if (!this.scaling) {
            this.scaling = setInterval(() => {
                this.updateSpawnInterval()
                this.updateSpeed()
            }, 1000)
        }
        this.spawning()
    }

    spawning() {
        this.spawnInterval = this.randomSpawnInterval()
        this.timeout = setTimeout(() => this.spawning(), this.spawnInterval)


        console.log("Spawn interval between ", this.minSpawnInterval, " and ", this.maxSpawnInterval, " is ", this.spawnInterval)
        new Zombie({
            x: this.canvas.width,
            ctx: this.ctx,
            canvas: this.canvas,
            minSpeed: this.minSpeed,
            maxSpeed: this.maxSpeed
        })
    }

    stop() {
        clearTimeout(this.timeout)
        clearInterval(this.scaling)
    }
}



