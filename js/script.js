// script.js

// Smooth scroll for anchor links (if using #ids)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
  
// Loader
window.addEventListener('load', function() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.opacity = 0;
    setTimeout(() => loader.style.display = 'none', 600);
  }
});

// Mobile menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
      mobileMenu.classList.remove('open');
    }
  });
}

// Fade-in animation on scroll
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Animated skill bars
function animateSkillBars() {
  document.querySelectorAll('.skill-level').forEach(bar => {
    const val = bar.getAttribute('data-skill');
    bar.style.width = val + '%';
  });
}
window.addEventListener('DOMContentLoaded', animateSkillBars);

// Background animation (simple particles)
(function() {
  const canvas = document.getElementById('bg-animation');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.querySelector('.hero').offsetHeight;
  }
  function Particle() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.radius = Math.random() * 1.7 + 0.7;
    this.speed = Math.random() * 0.7 + 0.2;
    this.angle = Math.random() * Math.PI * 2;
    this.color = 'rgba(255,0,0,0.13)';
  }
  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
  Particle.prototype.update = function() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
    }
  };
  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  function init() {
    resize();
    particles = Array.from({length: 60}, () => new Particle());
    animate();
  }
  window.addEventListener('resize', resize);
  setTimeout(init, 200);
})();

// Contact form AJAX (Formspree)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const status = document.getElementById('form-status');
    status.textContent = '';
    const data = new FormData(contactForm);
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        status.textContent = 'Message sent!';
        status.style.color = '#25d366';
        contactForm.reset();
      } else {
        status.textContent = 'Failed to send. Try again.';
        status.style.color = 'red';
      }
    } catch {
      status.textContent = 'Network error. Try again.';
      status.style.color = 'red';
    }
  });
}
  