// ── NAV scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (!nav) return;
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (dark) {
    nav.style.background = window.scrollY > 50
      ? 'rgba(8,8,8,0.98)'
      : 'rgba(8,8,8,0.88)';
  } else {
    nav.style.background = window.scrollY > 50
      ? 'rgba(255, 251, 247, 0.98)'
      : 'rgba(255, 251, 247, 0.92)';
  }
});

// ── Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// ── Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      mobileMenu?.classList.remove('open');
    }
  });
});

// ── Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.project-card, .about-card, .achievement-card, .roadmap-item, .team-role-card, .team-member-card, .section-title, .section-tag'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ── Highlight active nav on home page sections
if (document.querySelector('.hero')) {
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href*="#"], .mobile-menu a[href*="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        const href = a.getAttribute('href') || '';
        a.classList.toggle('active', href.endsWith('#' + id));
      });
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => sectionObserver.observe(s));
}
