class Missile {
    constructor(canvas, x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    move() {
    }
}

class BasicMissile extends Missile {
    constructor(x, y) {
        super(x, y, 5);
    }
    
    move() {
        c_ammo.fillStyle = "red";
        c_ammo.fillRect(this.x, this.y, 10, 30)
        this.y+=this.speed;
    }
}

class DirectedMissile extends Missile {
    constructor(canvas, x, y, playerShip) {
        super(canvas, x, y, 5);
        this.destinationX = playerShip.x;
        this.destinationY = playerShip.y;
        this.angleRadians = Math.atan2(this.y - this.destinationY, this.destinationX - this.x);

    }

    move() {
        console.log('move')
        this.ctx.fillStyle = "red";
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angleRadians);
        this.ctx.fillRect(0, 0, 10, 30)
        this.ctx.restore();
        this.y-=this.speed * Math.sin(this.angleRadians);
        this.x+=this.speed * Math.cos(this.angleRadians);
    }
}