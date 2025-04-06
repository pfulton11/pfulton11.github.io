
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight; // Make canvas as tall as full page
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Call initially

const stars = [];

for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        alpha: Math.random(),
        speed: Math.random() * 0.05
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    stars.forEach(star => {
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y + window.scrollY, star.radius, 0, Math.PI * 2); // Adjust for scroll position
        ctx.fill();
    });
}

function animateStars() {
    stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.3) {
            star.speed *= -1;
        }
    });

    drawStars();
    requestAnimationFrame(animateStars);
}

window.addEventListener("scroll", drawStars); // Redraw stars when scrolling
animateStars();
