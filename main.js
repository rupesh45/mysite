/* ============================================
   RUPESH KADAM PORTFOLIO — main.js
   Theme toggle with localStorage persistence
   ============================================ */

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

  // Restore saved preference
  try {
    const saved = localStorage.getItem('rk-theme');
    if (saved) apply(saved);
  } catch (_) {}

  btn.addEventListener('click', () => {
    apply(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  
})();
