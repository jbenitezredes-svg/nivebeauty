// ── Nav: fondo al hacer scroll ───────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Burger menu ──────────────────────────────────
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Parallax hero ────────────────────────────────
const heroBg = document.querySelector('.hero__bg');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  heroBg.style.transform = `translateY(${window.scrollY * 0.28}px)`;
}, { passive: true });

// ── Fade-in al hacer scroll ──────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

const targets = document.querySelectorAll(
  '.servicio-card, .galeria__item, .nosotras__text, .nosotras__image, .contacto__info, .contacto__mapa, .section-header'
);
targets.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
