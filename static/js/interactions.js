/**
 * 3D tilt, magnetic buttons, team role persistence, playful UI.
 */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  // ── 3D tilt on cards
  function bindTilt(selector, max = 12) {
    document.querySelectorAll(selector).forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  bindTilt('[data-tilt]');
  bindTilt('.team-member-card', 8);

  // ── Magnetic primary buttons
  document.querySelectorAll('.btn-magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ── Team roles: edit on page, saved in localStorage (override team.json display)
  const ROLE_PREFIX = 'alliance-role-';

  document.querySelectorAll('[data-team-role]').forEach((el) => {
    const id = el.dataset.teamRole;
    const saved = localStorage.getItem(ROLE_PREFIX + id);
    const initial = el.dataset.initialRole || '';
    if (saved) {
      el.textContent = saved;
    } else if (initial) {
      el.textContent = initial;
    }

    el.addEventListener('blur', () => {
      const text = el.textContent.trim();
      if (text && text !== el.dataset.placeholder) {
        localStorage.setItem(ROLE_PREFIX + id, text);
      }
    });

    el.addEventListener('focus', () => {
      if (el.textContent === el.dataset.placeholder) {
        el.textContent = '';
      }
    });
  });

  // ── Logo subtle float on hero
  const heroLogo = document.querySelector('.hero-logo-img');
  if (heroLogo) {
    let t = 0;
    function floatLogo() {
      t += 0.02;
      heroLogo.style.transform = `translateY(${Math.sin(t) * 6}px)`;
      requestAnimationFrame(floatLogo);
    }
    floatLogo();
  }

  // ── Ripple on click (playful)
  document.querySelectorAll('[data-ripple]').forEach((el) => {
    el.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ── Counter animation for stats
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = el.dataset.count;
    const isNum = /^\d+$/.test(target);
    if (!isNum) return;
    const end = parseInt(target, 10);
    let current = 0;
    const step = Math.max(1, Math.floor(end / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      el.textContent = current + (el.dataset.suffix || '');
    }, 30);
  });
})();
