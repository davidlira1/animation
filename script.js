var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

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