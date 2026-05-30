(function () {
  const STORAGE_KEY = 'alliance-theme';
  const root = document.documentElement;

  function getPreferred() {
    return localStorage.getItem(STORAGE_KEY) || 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    document.querySelectorAll('[data-particles]').forEach((el) => {
      const canvas = el.querySelector('canvas[data-particles]');
      if (!canvas) return;
      canvas.dataset.particleColor = theme === 'dark' ? '126, 232, 162' : '234, 88, 12';
    });

    document.querySelectorAll('.theme-toggle-label').forEach((label) => {
      label.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    });
  }

  applyTheme(getPreferred());

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    });
  });

  window.AllianceTheme = { applyTheme, getPreferred };
})();
