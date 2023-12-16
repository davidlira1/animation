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
    constructor() {
        this.x = Math.floor(Math.random() * canvas.width); //anywhere on x axis
        this.y = Math.floor(-1 + Math.random() * -30); //start anywhere between -1 and -30 on y axis
        this.radius = Math.floor(5 + Math.random() * 10) //between 5 and 15 radius
        this.speed = Math.floor(1 + Math.random() * 3) //between 1 and 3 speed
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
setInterval(() => {
    for(var i = 0; i < (10 + Math.random() * 15); i++) {
        balls.push(new Ball());
    }
}, 500)

function drawFrame() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball) => {
        ball.animateBall();
    })
    window.requestAnimationFrame(drawFrame);
}
window.requestAnimationFrame(drawFrame);

class Ship {
    constructor() {
        this.animateShip(canvas.width/2, canvas.height/2);
    }

    animateShip(x, y) {
        c_ship.clearRect(0, 0, canvas.width, canvas.height);
        c_ship.beginPath();
        c_ship.fillStyle = "black";
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
    }

    animateAmmo() {
        if(this.y < 0) return;
        c_ammo.fillStyle = "#70ed09";
        c_ammo.fillRect(this.x, this.y, 10, 30)
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
