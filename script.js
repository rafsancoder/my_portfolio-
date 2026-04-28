const navToggle = document.querySelector("#navToggle");
const navMenu = document.querySelector("#navMenu");
const year = document.querySelector("#year");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const revealElements = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const canvas = document.querySelector("#particle-canvas");
const ctx = canvas.getContext("2d");

year.textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const categories = card.dataset.category;
      const shouldShow = filter === "all" || categories.includes(filter);
      card.classList.toggle("hide", !shouldShow);
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 18;
    const rotateX = ((y / rect.height) - 0.5) * -18;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

let particles = [];
let width = 0;
let height = 0;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  const count = Math.min(90, Math.floor(width / 18));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2 + 0.6,
    speedX: (Math.random() - 0.5) * 0.35,
    speedY: (Math.random() - 0.5) * 0.35
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((particle, index) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
    if (particle.y < 0 || particle.y > height) particle.speedY *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(102, 227, 255, 0.65)";
    ctx.fill();

    for (let j = index + 1; j < particles.length; j++) {
      const other = particles[j];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(139, 92, 246, ${1 - distance / 120})`;
        ctx.lineWidth = 0.45;
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

resizeCanvas();
drawParticles();

window.addEventListener("resize", resizeCanvas);

// Robot SAVO video modal controls
const videoModal = document.querySelector('#robotVideoModal');
const robotSavoVideo = document.querySelector('#robotSavoVideo');
const videoTriggers = document.querySelectorAll('.video-trigger');
const closeVideoButtons = document.querySelectorAll('[data-close-video]');

function openRobotVideo() {
  if (!videoModal) return;
  videoModal.classList.add('open');
  videoModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  if (robotSavoVideo) {
    robotSavoVideo.currentTime = 0;
    robotSavoVideo.play().catch(() => {
      // Browser may block autoplay until the user presses play. Controls stay visible.
    });
  }
}

function closeRobotVideo() {
  if (!videoModal) return;
  videoModal.classList.remove('open');
  videoModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (robotSavoVideo) {
    robotSavoVideo.pause();
  }
}

videoTriggers.forEach((trigger) => {
  trigger.addEventListener('click', openRobotVideo);
});

closeVideoButtons.forEach((button) => {
  button.addEventListener('click', closeRobotVideo);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeRobotVideo();
  }
});

// Helpful console message if the GLB cannot load because of a wrong path or local-file opening.
const portfolioModelViewer = document.querySelector('model-viewer[src="assets/models/robot.glb"]');
if (portfolioModelViewer) {
  portfolioModelViewer.addEventListener('error', () => {
    console.warn('Robot 3D model failed to load. Use VS Code Live Server and check assets/models/robot.glb exists.');
  });
}

document.querySelectorAll('[role="button"].video-trigger').forEach((trigger) => {
  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openRobotVideo();
    }
  });
});
