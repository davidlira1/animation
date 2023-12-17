class Missile {
    constructor(ship, speed, target) {
        this.x = ship.x;
        this.y = ship.y;
        this.speed = speed;
        this.canvas = ship.canvas;
        this.ctx = canvas.getContext('2d');
        this.target = target;
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
    constructor(ship, target) {
        super(ship, 5, target);
        this.angleRadians = Math.atan2(this.y - this.target.y, this.target.x - this.x);
        this.x += ship.radius * Math.cos(this.angleRadians);
        this.y -= ship.radius * Math.sin(this.angleRadians);
        this.ship = ship;
        this.length = 30;
        this.width = 10;
    }

    move() {
        this.ctx.fillStyle = "red";
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angleRadians > 0 ? (2 * Math.PI - this.angleRadians) : -this.angleRadians);
        this.ctx.fillRect(0, 0 - this.width/2, this.length, this.width);
        this.ctx.restore();
        this.x+=this.speed * Math.cos(this.angleRadians);
        this.y-=this.speed * Math.sin(this.angleRadians);
    }
}