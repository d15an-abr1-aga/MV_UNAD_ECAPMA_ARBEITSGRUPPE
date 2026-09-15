/* nav.js — activa el link actual y maneja el menú móvil */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('nav-burger');
    const links  = document.getElementById('nav-links');
    const path   = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

    // --- 1. Marcar el link activo ---
    document.querySelectorAll('.sitenav__links a').forEach(a => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      if (href === path) a.setAttribute('aria-current', 'page');
    });

    // --- 2. Si estamos en una Condición, marcar el dropdown ---
    if (/^condicion-\d+\.html$/.test(path)) {
      const dd = document.querySelector('.sitenav__dropdown');
      if (dd) dd.classList.add('is-current');

      // Marcar también la condición puntual dentro del dropdown
      dd?.querySelectorAll('.sitenav__dropdown-menu a').forEach(a => {
        if ((a.getAttribute('href') || '').toLowerCase() === path)
          a.setAttribute('aria-current', 'page');
      });
    }

    // --- 3. Burger móvil ---
    if (burger && links) {
      burger.addEventListener('click', () => {
        const open = links.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', String(open));
        burger.textContent = open ? '✕' : '☰';
      });

      // Cerrar al hacer click en un link
      links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          links.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
          burger.textContent = '☰';
        });
      });
    }
  });
})();