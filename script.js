var canvas = document.getElementById('canvas');
var shipCanvas = document.getElementById('ship-canvas');
var ammoCanvas = document.getElementById('ammo-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
shipCanvas.width = window.innerWidth;
shipCanvas.height = window.innerHeight;
ammoCanvas.width = window.innerWidth;
ammoCanvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var c_ship = shipCanvas.getContext('2d');
var c_ammo = ammoCanvas.getContext('2d');
class Ball {
    constructor(y) {
        this.x = Math.floor(Math.random() * canvas.width); //anywhere on x axis
        this.y = y; 
        this.radius = Math.floor(5 + Math.random() * 7) //between 5 and 12 radius
        this.speed = 1 + Math.random() * 1
    }
    animateBall() {
        if(this.y > canvas.height + 20) return;
        c.beginPath();
        c.fillStyle = "#09c7ed";
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fill()
        this.y+=this.speed;
    }
}

var balls = [];
for(var i = 0; i < (40 + Math.random() * 50); i++) {
    balls.push(new Ball(Math.floor(Math.random() * canvas.height))); //start anywhere on the canvas
}
setInterval(() => {
    for(var i = 0; i < (4 + Math.random() * 7); i++) {
        balls.push(new Ball(Math.floor(-1 + Math.random() * -30))); //start anywhere between -1 and -30 of y axis
    }
}, 1000)



class Ship {
    x;
    y;
    constructor() {
        this.animateShip(canvas.width/2, canvas.height/2);
    }

    animateShip(x, y) {
        this.x = x;
        this.y = y;
        c_ship.clearRect(0, 0, canvas.width, canvas.height);
        c_ship.beginPath();
        c_ship.fillStyle = "white";
        c_ship.arc(x, y, 30, 0, 2 * Math.PI);
        c_ship.fill()
    }
}

var ship = new Ship();
addEventListener("mousemove", (event) => {
    window.requestAnimationFrame(() => ship.animateShip(event.clientX, event.clientY));
});

class Ammo {
    constructor(x, y) {
        this.x = x - 5;
        this.y = y - 60;
        this.speed = 3;
        this.length = 10;
        this.angleRadians = 270 * (Math.PI * 180)
    }

    animateAmmo() {
        if(this.y < 0) return;
        c_ammo.fillStyle = "#70ed09";
        c_ammo.fillRect(this.x, this.y, this.length, 30)
        this.y-=this.speed;
    }
}

var ammos = [];
addEventListener("click", (event) => {
    ammos.push(new Ammo(event.clientX, event.clientY));
})

function drawAmmo() {
    c_ammo.clearRect(0, 0, ammoCanvas.width, ammoCanvas.height);
    ammos.forEach((ammo) => {
        ammo.animateAmmo();
    })
    window.requestAnimationFrame(drawAmmo);
}
window.requestAnimationFrame(drawAmmo);



var enemyShips = []

setInterval(() => {
    enemyShips.push(new EnemyShip(canvas, ship))
}, 1000)

function drawFrame() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball) => {
        ball.animateBall();
    })
    enemyShips.forEach((enemyShip) => {
        enemyShip.move();
        enemyShip.missiles.forEach(missile => {
            missile.move();
        })
    })
    enemyShips = enemyShips.filter(enemyShip => {
        return !enemyShip.detectCollision(ammos);
    })
    window.requestAnimationFrame(drawFrame);
}
window.requestAnimationFrame(drawFrame);