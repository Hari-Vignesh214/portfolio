// ============================================
// NETFLIX PORTFOLIO — HARI VIGNESH
// ============================================

// ---- NAVBAR: Scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ---- MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// ---- SCROLL REVEAL ----
function initReveal() {
  const targets = document.querySelectorAll(
    '.exp-card, .project-card, .edu-card, .honor-card, .skills-block, .resume-inner'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

// ---- SKILL ROW SCROLL ----
function scrollRow(id, dir) {
  const row = document.getElementById(id);
  if (!row) return;
  row.scrollBy({ left: dir * 280, behavior: 'smooth' });
}

// ---- ACTIVE NAV LINK (highlight on scroll) ----
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active-nav');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-nav');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

// ---- HERO STATS COUNTER ANIMATION ----
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const text = counter.textContent;
    const num = parseFloat(text.replace(/[^0-9.]/g, ''));
    const suffix = text.replace(/[0-9.]/g, '');
    if (isNaN(num)) return;

    let start = 0;
    const duration = 1800;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = (num * eased).toFixed(num % 1 !== 0 ? 1 : 0);
      counter.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    // Only animate when hero is visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(counter.closest('.hero-stats'));
  });
}

// ---- RESUME BUTTON: Check PDF exists ----
// If resume PDF not found, update button to link to LinkedIn
document.addEventListener('DOMContentLoaded', () => {
  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn) {
    // Test if PDF is accessible
    fetch('Hari_Vignesh_Resume.pdf', { method: 'HEAD' })
      .then(res => {
        if (!res.ok) throw new Error('PDF not found');
      })
      .catch(() => {
        resumeBtn.href = 'https://linkedin.com/in/harivigneshcse/';
        resumeBtn.removeAttribute('download');
        resumeBtn.target = '_blank';
        resumeBtn.title = 'Add Hari_Vignesh_Resume.pdf to the portfolio folder to enable download';
      });
  }
});

// ---- SMOOTH ACTIVE NAV STYLE ----
const style = document.createElement('style');
style.textContent = `.active-nav { color: #fff !important; }`;
document.head.appendChild(style);

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initActiveNav();
  animateCounters();
});
