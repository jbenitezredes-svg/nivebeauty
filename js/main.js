// ── Nav: fondo al hacer scroll ───────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Drawer lateral ───────────────────────────────
const burger       = document.getElementById('burger');
const drawer       = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose  = document.getElementById('drawerClose');

function openDrawer() {
  drawer.classList.add('open');
  drawerOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  burger.setAttribute('aria-expanded', 'true');
}

function closeDrawer() {
  drawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
  document.body.style.overflow = '';
  burger.setAttribute('aria-expanded', 'false');
}

burger.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

drawer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeDrawer);
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

document.querySelectorAll(
  '.servicio-card, .galeria__item, .nosotras__text, .nosotras__image, .contacto__info, .contacto__mapa, .section-header, .pilar'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
