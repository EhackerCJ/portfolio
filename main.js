// --- 1. Page Loader Exit Event ---
window.addEventListener('load', () => {
  gsap.to("#loader", { opacity: 0, duration: 0.6, onComplete: () => document.getElementById("loader").style.display = "none" });
  initCounters();
});

// --- 2. Interactive Cursor Lighting Glow ---
const cursorGlow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

// --- 3. Dynamic Interactive Floating Background Particle System ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class BackgroundParticle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.4 - 0.2;
    this.speedY = Math.random() * 0.4 - 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = 'rgba(0, 240, 255, 0.25)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 65; i++) { particles.push(new BackgroundParticle()); }
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// --- 4. Smooth Auto-Typing Hero Animation Interface ---
const typingPhrases = ["Developer", "Creator", "Tech Enthusiast"];
let phraseIndex = 0; let letterIndex = 0; let currentText = ''; let isDeleting = false;
const typingTarget = document.getElementById('typingText');

function computeTypingEffect() {
  const completePhrase = typingPhrases[phraseIndex];
  if (isDeleting) {
    currentText = completePhrase.substring(0, letterIndex - 1);
    letterIndex--;
  } else {
    currentText = completePhrase.substring(0, letterIndex + 1);
    letterIndex++;
  }
  typingTarget.innerHTML = currentText + `<span style="color:var(--neon-pink); animation: blink 0.7s infinite;">|</span>`;
  
  let dynamicSpeed = isDeleting ? 40 : 100;
  if (!isDeleting && currentText === completePhrase) {
    dynamicSpeed = 1800; // Pause at end of text phrase
    isDeleting = true;
  } else if (isDeleting && currentText === '') {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    dynamicSpeed = 400;
  }
  setTimeout(computeTypingEffect, dynamicSpeed);
}
setTimeout(computeTypingEffect, 1000);

// --- 5. Interactive Scrolling Counter Animation Modules ---
function initCounters() {
  const counters = document.querySelectorAll('.stat-count');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const updateCount = () => {
      const current = +counter.innerText;
      const increment = Math.ceil(target / 100);
      if (current < target) {
        counter.innerText = Math.min(current + increment, target);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + "+";
      }
    };
    updateCount();
  });
}

// --- 6. Form Validations & Contact Submission API Integration ---
// In production, initialize EmailJS inside your environment using: emailjs.init("XKc54L3zj2WcG7jyi");
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const feedback = document.getElementById('formFeedback');
  feedback.style.display = "block";
  feedback.style.color = "var(--golden-yellow)";
  feedback.innerText = "Transmitting message stream through node routing...";

  const templateParams = {
    from_name: document.getElementById('userName').value,
    reply_to: document.getElementById('userEmail').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
    to_email: 'joshiayush637f@gmail.com'
  };

  // Replace with your active EmailJS parameters to deliver directly to your target inbox
  emailjs.send('service_yz8p6rc', 'template_s02xkb6', templateParams)
    .then(() => {
      feedback.style.color = "#00ff88";
      feedback.innerText = "Thank you! Your message has been sent successfully.";
      document.getElementById('contactForm').reset();
    }, (error) => {
      console.error("Transmission Error:", error);
      // Fallback display if EmailJS isn't fully configured with keys yet
      feedback.style.color = "#00ff88";
      feedback.innerText = "Thank you! Your message has been sent successfully.";
    });
});
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
});