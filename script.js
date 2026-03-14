/* ========================
   MATRIX RAIN CANVAS
======================== */
(function () {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  let cols, drops;

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'.split('');

  function init() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / 18);
    drops = Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(6,10,15,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff88';
    ctx.font = '13px Share Tech Mono, monospace';

    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * 18, y * 18);
      if (y * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  init();
  setInterval(draw, 50);
  window.addEventListener('resize', init);
})();

/* ========================
   NAVBAR SCROLL + ACTIVE
======================== */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop - 100;
    if (window.scrollY >= top) current = s.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

/* ========================
   HAMBURGER MENU
======================== */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

/* ========================
   TYPING TITLE EFFECT
======================== */
const titles = [
  'Cybersecurity Student',
  'Future Penetration Tester',
  'Ethical Hacker in Training',
  'Red Team Enthusiast',
  'Bug Hunter',
];

let tIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-title');

function typeLoop() {
  const current = titles[tIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) { deleting = true; setTimeout(typeLoop, 2000); return; }
  } else {
    typedEl.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; tIdx = (tIdx + 1) % titles.length; }
  }

  setTimeout(typeLoop, deleting ? 55 : 90);
}

setTimeout(typeLoop, 800);

/* ========================
   TERMINAL ANIMATION
======================== */
(function () {
  const lines = document.querySelectorAll('#terminal-body .t-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    setTimeout(() => {
      line.style.transition = 'opacity 0.3s ease';
      line.style.opacity = '1';
    }, 500 + i * 200);
  });
})();

/* ========================
   SCROLL REVEAL
======================== */
const revealEls = document.querySelectorAll(
  '.section-title, .about-bio, .info-card, .skill-category, .project-card, .contact-card, .contact-form-box, .contact-intro'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ========================
   SKILL BAR ANIMATION
======================== */
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      setTimeout(() => { entry.target.style.width = width + '%'; }, 200);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ========================
   COURSE ITEMS REVEAL
======================== */
const courseItems = document.querySelectorAll('.course-item');

const courseObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

courseItems.forEach(item => courseObserver.observe(item));

/* ========================
   ORBIT POSITIONING
======================== */
(function positionOrbit() {
  const orbitItems = document.querySelectorAll('.orbit-item');
  const radius = 155;
  const angleStep = (2 * Math.PI) / orbitItems.length;

  orbitItems.forEach((item, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    item.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  });

  // Re-position after animation parent rotates
  const orbit = document.querySelector('.tool-orbit');
  if (!orbit) return;

  // Counter-rotate items so text stays readable
  let deg = 0;
  setInterval(() => {
    deg = (deg + 0.05) % 360;
    orbitItems.forEach(item => {
      item.style.transform = `translate(calc(-50% + ${
        Math.cos(deg * Math.PI / 180 + orbitItems[0].dataset.angle) * radius
      }px), calc(-50% + ${
        Math.sin(deg * Math.PI / 180) * radius
      }px))`;
    });
  }, 50);
})();

/* ========================
   CONTACT FORM HANDLER
======================== */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const success = document.getElementById('form-success');

  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.style.display = 'none';
    success.style.display = 'flex';
    e.target.reset();

    setTimeout(() => {
      success.style.display = 'none';
      btn.style.display = 'flex';
      btn.textContent = 'Send Message';
      btn.disabled = false;
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
    }, 3500);
  }, 1400);
}

/* ========================
   CURSOR GLOW EFFECT
======================== */
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%,-50%);
  transition: left 0.1s, top 0.1s;
  will-change: left, top;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top  = e.clientY + 'px';
});

/* ========================
   SMOOTH SCROLL FOR NAV
======================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

/* ========================
   SECTION ENTRANCE HERO
======================== */
document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero-content');
  const heroVisual  = document.querySelector('.hero-visual');

  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    setTimeout(() => {
      heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'none';
    }, 200);
  }

  if (heroVisual) {
    heroVisual.style.opacity = '0';
    heroVisual.style.transform = 'translateX(30px)';
    setTimeout(() => {
      heroVisual.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      heroVisual.style.opacity = '1';
      heroVisual.style.transform = 'none';
    }, 500);
  }
});
