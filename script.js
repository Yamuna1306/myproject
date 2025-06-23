const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

let score = 0;

class Ball {
    constructor() {
        this.radius = 25;
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
        this.dx = (Math.random() - 0.5) * 6;
        this.dy = (Math.random() - 0.5) * 6;
        this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) this.dx *= -1;
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) this.dy *= -1;

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }

    isClicked(mx, my) {
        const distance = Math.hypot(this.x - mx, this.y - my);
        return distance < this.radius;
    }
}

let balls = [];
for (let i = 0; i < 5; i++) {
    balls.push(new Ball());
}

canvas.addEventListener("click", function(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    balls.forEach((ball, index) => {
        if (ball.isClicked(mouseX, mouseY)) {
            score++;
            scoreDisplay.textContent = score;
            balls[index] = new Ball(); // replace with new ball
        }
    });
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.update());
    requestAnimationFrame(animate);
}

animate();
