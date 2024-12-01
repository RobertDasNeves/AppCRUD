const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;
    this.color = '#2b2d42';
    this.size = Math.random() * 5 + 1;
  }

draw() {
  context.beginPath();
  context.fillStyle = this.color;
  context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  context.fill();
}

update() {
  this.x += this.vx;
  this.y += this.vy;
  this.size -= 0.05;
  }
}

let particles = [];

function createParticles(x, y) {
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle(x, y));
  }
}

function loop() {
  context.clearRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    particles[i].update();

    if (particles[i].size <= 0.2) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(loop);
}

window.addEventListener('mousemove', (event) => {
  createParticles(event.clientX, event.clientY);
});

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

loop();