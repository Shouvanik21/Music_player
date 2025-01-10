// Select the body element to apply the background effect
const body = document.body;

// Create a container for the background animation
const backgroundContainer = document.createElement('div');
backgroundContainer.style.position = 'fixed';
backgroundContainer.style.top = '0';
backgroundContainer.style.left = '0';
backgroundContainer.style.width = '100%';
backgroundContainer.style.height = '100%';
backgroundContainer.style.zIndex = '-1';
backgroundContainer.style.overflow = 'hidden';
backgroundContainer.style.background = 'linear-gradient(120deg, #000000, #ff0000, #00ffff, #000000)';
backgroundContainer.style.backgroundSize = '300% 300%';
backgroundContainer.style.animation = 'gradientShift 8s ease infinite';
body.appendChild(backgroundContainer);

// Add a canvas for animated light patterns
const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
backgroundContainer.appendChild(canvas);

const ctx = canvas.getContext('2d');

// Update canvas dimensions on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Function to draw animated light spots
const lightSpots = [];
for (let i = 0; i < 7; i++) {
  lightSpots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 100 + 50,
    dx: (Math.random() - 0.5) * 2,
    dy: (Math.random() - 0.5) * 2,
  });
}

const drawLightSpots = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  lightSpots.forEach(spot => {
    const gradient = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, spot.radius);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.7)');
    gradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(spot.x, spot.y, spot.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    // Update position
    spot.x += spot.dx;
    spot.y += spot.dy;

    // Bounce off edges
    if (spot.x - spot.radius < 0 || spot.x + spot.radius > canvas.width) {
      spot.dx *= -1;
    }
    if (spot.y - spot.radius < 0 || spot.y + spot.radius > canvas.height) {
      spot.dy *= -1;
    }
  });

  requestAnimationFrame(drawLightSpots);
};

drawLightSpots();

// Add CSS for gradient animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes gradientShift {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
`;
document.head.appendChild(style);
