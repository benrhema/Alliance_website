/**
 * Lightweight particle network for hero / dark sections.
 * Respects prefers-reduced-motion.
 */
(function () {
  const canvases = document.querySelectorAll('[data-particles]');
  if (!canvases.length) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  canvases.forEach((canvas) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    let width = 0;
    let height = 0;
    let particles = [];
    let animationId = null;
    let mouse = { x: null, y: null };

    const config = {
      count: Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 14000)),
      color: canvas.dataset.particleColor || '126, 232, 162',
      linkDistance: 140,
      speed: 0.35,
    };

    function resize() {
      const rect = parent.getBoundingClientRect();
      width = canvas.width = Math.floor(rect.width);
      height = canvas.height = Math.floor(rect.height);
    }

    function createParticles() {
      particles = [];
      const n = Math.max(35, config.count);
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * config.speed,
          vy: (Math.random() - 0.5) * config.speed,
          r: Math.random() * 1.8 + 0.8,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.x !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120 && dist > 0) {
            p.x -= (dx / dist) * 0.6;
            p.y -= (dy / dist) * 0.6;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${config.color}, 0.55)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < config.linkDistance) {
            const alpha = (1 - d / config.linkDistance) * 0.22;
            ctx.strokeStyle = `rgba(${config.color}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouse.x = null;
      mouse.y = null;
    }

    resize();
    createParticles();
    draw();

    parent.addEventListener('mousemove', onMouseMove);
    parent.addEventListener('mouseleave', onMouseLeave);

    const ro = new ResizeObserver(() => {
      resize();
      createParticles();
    });
    ro.observe(parent);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        draw();
      }
    });
  });
})();
