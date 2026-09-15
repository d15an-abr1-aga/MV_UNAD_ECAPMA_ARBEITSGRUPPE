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