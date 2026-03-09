/* ============================================
   RUPESH KADAM PORTFOLIO — main.js
   Matrix rain + Theme toggle (localStorage)
   ============================================ */

/* ── MATRIX RAIN ── */
(function () {
  const canvas = document.getElementById('matrix-bg');
  if (!canvas) return;
  const ctx  = canvas.getContext('2d');
  const FONT = 14;
  const CHARS =
    'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%<>{}[]';

  let W, H, cols, drops;

  function resize() {
    W     = canvas.width  = window.innerWidth;
    H     = canvas.height = window.innerHeight;
    cols  = Math.floor(W / FONT);
    drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -80));
  }

  function colors() {
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    return {
      fade: light ? 'rgba(240,247,240,0.14)' : 'rgba(13,17,13,0.14)',
      head: light ? 'rgba(22,163,74,0.9)'    : 'rgba(74,222,128,0.9)',
      body: light ? 'rgba(22,163,74,0.5)'    : 'rgba(34,180,80,0.5)',
    };
  }

  function draw() {
    const c = colors();
    ctx.fillStyle = c.fade;
    ctx.fillRect(0, 0, W, H);
    ctx.font = FONT + 'px Menlo, Consolas, monospace';

    drops.forEach(function(y, i) {
      const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
      const x  = i * FONT;
      const py = y * FONT;

      ctx.fillStyle = c.head;
      ctx.fillText(ch, x, py);

      if (y > 1) {
        ctx.fillStyle = c.body;
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, py - FONT);
      }

      if (py > H && Math.random() > 0.975) {
        drops[i] = Math.floor(Math.random() * -20);
      } else {
        drops[i]++;
      }
    });
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);
})();


/* ── THEME TOGGLE ── */
(function () {
  const btn   = document.getElementById('themeToggle');
  const icon  = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  const root  = document.documentElement;

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (theme === 'light') {
      icon.className    = 'fa-solid fa-moon';
      label.textContent = 'Dark';
    } else {
      icon.className    = 'fa-solid fa-sun';
      label.textContent = 'Light';
    }
    try { localStorage.setItem('rk-theme', theme); } catch (_) {}
  }

  try {
    const saved = localStorage.getItem('rk-theme');
    if (saved) apply(saved);
  } catch (_) {}

  btn.addEventListener('click', function() {
    apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
})();
