class Ships {
    constructor(x, y, speed, canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    move() {

    }

    shoot() {

    }

    explode() {

    }
}

class EnemyShip extends Ships {
    missiles = [];
    radius = 45;
    constructor(canvas, playerShip) {
        var x = Math.floor(Math.random() * canvas.width);
        var y = 0 - Math.floor(Math.random() + 20);
        super(x, y, 3, canvas); //later on, diff ships may have a diff origin. for now we'll make them all random
        this.playerShip = playerShip;
        this.beginShootingInterval()
    }

    move() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "purple";
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.y+= this.speed;
    }

    beginShootingInterval() {
        setInterval(() => {
            this.missiles.push(new DirectedMissile(this, this.playerShip));
        }, 2000)
    }

    detectCollision(playerMissiles) {
        return playerMissiles.some(playerMissile => {
            var missileEndPnt = {
                x: playerMissile.x + playerMissile.length * Math.cos(playerMissile.angleRadians),
                y: playerMissile.y - playerMissile.length * Math.sin(playerMissile.angleRadians)
            }
            var distance = Math.sqrt(Math.pow(missileEndPnt.x - this.x, 2) + Math.pow(missileEndPnt.y - this.y, 2));
            if (distance < this.radius) {
                return true;
            } else {
                return false;
            }
        })
    }
    
    removeShip() {
    }
}

class PlayerShip extends Ships {
    constructor() {
        super();
    }

    move() {

    }
}

