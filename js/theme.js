/* theme.js — soporta .dark (Tailwind) y [data-theme] (base.css) */
(function () {
  const KEY  = "malla-theme";
  const root = document.documentElement;

  const saved = localStorage.getItem(KEY) || "light";
  apply(saved, false);

  function apply(theme, persist = true) {
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    root.setAttribute("data-theme", isDark ? "dark" : "light");
    if (persist) localStorage.setItem(KEY, theme);

    document.querySelectorAll(".theme-toggle").forEach(btn => {
      btn.textContent = isDark ? "☀️" : "🌙";
      btn.setAttribute("aria-label",
        isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    apply(root.classList.contains("dark") ? "dark" : "light", false);
    document.querySelectorAll(".theme-toggle").forEach(btn => {
      btn.addEventListener("click", () => {
        apply(root.classList.contains("dark") ? "light" : "dark");
      });
    });
  });
})();
/* ══════════════════════════════════════════════
   IMAGE ZOOM · MODAL GLOBAL (parametrizado por data-*)
   ══════════════════════════════════════════════ */
(function () {
    if (window.__imgZoomInit__) return;
    window.__imgZoomInit__ = true;

    var modal = null;

    function buildModal() {
        if (modal) return modal;
        modal = document.createElement('div');
        modal.className = 'img-zoom-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.innerHTML =
            '<div class="img-zoom-modal__overlay" data-img-zoom-close></div>' +
            '<div class="img-zoom-modal__panel">' +
                '<div class="img-zoom-modal__header">' +
                    '<div style="display:flex;align-items:center;gap:0.5rem;min-width:0;">' +
                        '<span class="iconify img-zoom-modal__icon" data-width="20"></span>' +
                        '<div style="min-width:0;">' +
                            '<p class="img-zoom-modal__label" style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.8);margin:0;"></p>' +
                            '<p class="img-zoom-modal__title" style="font-weight:700;font-size:13px;line-height:1.2;margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"></p>' +
                        '</div>' +
                    '</div>' +
                    '<div style="display:flex;align-items:center;gap:0.5rem;flex-shrink:0;">' +
                        '<a class="img-zoom-modal__newtab" target="_blank" rel="noopener"><span>↗</span> Nueva pestaña</a>' +
                        '<button type="button" class="img-zoom-modal__close" data-img-zoom-close aria-label="Cerrar">×</button>' +
                    '</div>' +
                '</div>' +
                '<div class="img-zoom-modal__body"><img alt=""></div>' +
            '</div>';
        document.body.appendChild(modal);
        return modal;
    }

    function closeAll() {
        document.querySelectorAll('.img-zoom-modal.is-open').forEach(function (m) {
            m.classList.remove('is-open');
        });
    }

    document.addEventListener('click', function (e) {
        var trigger = e.target.closest('[data-image-zoom]');
        if (trigger) {
            e.preventDefault();
            e.stopPropagation();
            var m = buildModal();
            var src      = trigger.getAttribute('data-image-zoom');
            var alt      = trigger.getAttribute('data-image-alt') || '';
            var title    = trigger.getAttribute('data-image-title') || alt;
            var label    = trigger.getAttribute('data-image-label') || '';
            var gradFrom = trigger.getAttribute('data-image-gradient-from') || '#0d9488';
            var gradTo   = trigger.getAttribute('data-image-gradient-to')   || '#1e3a5f';
            var icon     = trigger.getAttribute('data-image-icon') || 'lucide:image';

            var img = m.querySelector('.img-zoom-modal__body img');
            img.src = src;
            img.alt = alt;
            m.querySelector('.img-zoom-modal__title').textContent = title;
            m.querySelector('.img-zoom-modal__label').textContent = label;
            m.querySelector('.img-zoom-modal__newtab').href = src;
            m.querySelector('.img-zoom-modal__header').style.setProperty('--img-zoom-grad-from', gradFrom);
            m.querySelector('.img-zoom-modal__header').style.setProperty('--img-zoom-grad-to', gradTo);

            var iconSlot = m.querySelector('.img-zoom-modal__icon');
            iconSlot.setAttribute('data-icon', icon);
            if (window.Iconify && typeof window.Iconify.scan === 'function') {
                window.Iconify.scan(iconSlot);
            }

            closeAll();
            m.classList.add('is-open');
            m.querySelector('.img-zoom-modal__close').focus();
            return;
        }
        if (e.target.closest('[data-img-zoom-close]')) {
            e.preventDefault();
            e.stopPropagation();
            closeAll();
        }
    }, true);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') closeAll();
    });
})();