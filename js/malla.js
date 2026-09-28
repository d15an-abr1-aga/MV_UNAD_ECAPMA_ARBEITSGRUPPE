/* =========================================================================
   malla.js — construye la malla en el DOM y maneja la interacción.
   Lee los datos desde window.MALLA_DATA (que expone malla-data.js).
   ========================================================================= */
(function () {
  'use strict';

  var mallaEl   = document.getElementById('malla');
  var detalleEl = document.getElementById('detalle');

  function showFatal(msg) {
    console.error('[malla.js]', msg);
    if (detalleEl) {
      detalleEl.innerHTML =
        '<div class="detalle__placeholder">' +
          '<span class="iconify" data-icon="lucide:triangle-alert" data-width="34"></span>' +
          '<h3>Error al cargar la malla</h3>' +
          '<p style="font-family:monospace;text-align:left;color:#B91C1C">' + msg + '</p>' +
        '</div>';
      if (window.Iconify && window.Iconify.scan) window.Iconify.scan(detalleEl);
    }
  }

  if (!mallaEl || !detalleEl) { showFatal('Falta #malla o #detalle en el HTML'); return; }
  if (!window.MALLA_DATA)     { showFatal('window.MALLA_DATA es undefined. Revisa que malla-data.js esté cargado y sin errores.'); return; }

  var MALLA           = window.MALLA_DATA.MALLA;
  var PREREQUISITOS   = window.MALLA_DATA.PREREQUISITOS;
  var TIPO_INFO       = window.MALLA_DATA.TIPO_INFO;
  var PERIODO_COLORES = window.MALLA_DATA.PERIODO_COLORES;

  if (!Array.isArray(MALLA) || !MALLA.length) { showFatal('MALLA no es un array válido'); return; }

  try {
    var cursoElById   = new Map();
    var cursoDataById = new Map();
    var pinnedId      = null;

    function getAllPrereqs(id, visited) {
      visited = visited || new Set();
      var directos = PREREQUISITOS[id] || [];
      for (var i = 0; i < directos.length; i++) {
        var p = directos[i];
        if (!visited.has(p)) { visited.add(p); getAllPrereqs(p, visited); }
      }
      return visited;
    }

    function buildCard(curso, periodoIndex) {
      var el = document.createElement('article');
      el.className = 'curso';
      el.tabIndex = 0;
      el.dataset.id = curso.id;
      el.style.setProperty('--card-color', PERIODO_COLORES[periodoIndex] || '#00445B');
      el.style.setProperty('--tipo-color', (TIPO_INFO[curso.tipo] || {}).color || '#00445B');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', curso.nombre + '. ' + ((TIPO_INFO[curso.tipo] || {}).label || '') + ', ' + curso.creditos + ' créditos.');
      el.innerHTML =
        '<span class="curso__type">' + curso.tipo + ' · ' + curso.creditos + ' cr</span>' +
        '<span class="curso__name">' + curso.nombre + '</span>' +
        (curso.codigo ? '<span class="curso__code">Cód. ' + curso.codigo + '</span>' : '') +
        (curso.nota   ? '<span class="curso__note">' + curso.nota   + '</span>' : '');
      return el;
    }

    function render() {
      mallaEl.innerHTML = '';
      cursoElById.clear();
      cursoDataById.clear();

      MALLA.forEach(function (periodo, i) {
        var col = document.createElement('section');
        col.className = 'periodo';
        col.setAttribute('aria-label', 'Periodo ' + periodo.numero);

        var header = document.createElement('h2');
        header.className = 'periodo__header';
        header.style.background = PERIODO_COLORES[i] || '#00445B';
        header.textContent = 'Periodo ' + periodo.numero;
        col.appendChild(header);

        var body = document.createElement('div');
        body.className = 'periodo__body';

        (periodo.cursos || []).forEach(function (curso) {
          var card = buildCard(curso, i);
          cursoElById.set(curso.id, card);
          cursoDataById.set(curso.id, {
            id: curso.id, tipo: curso.tipo, creditos: curso.creditos,
            nombre: curso.nombre, codigo: curso.codigo, nota: curso.nota,
            periodo: periodo.numero, periodoIndex: i
          });
          body.appendChild(card);
        });

        col.appendChild(body);

        var footer = document.createElement('div');
        footer.className = 'periodo__footer';
        footer.innerHTML = '<span>Total</span><strong>' + (periodo.creditos || 0) + '</strong>';
        col.appendChild(footer);

        mallaEl.appendChild(col);
      });
    }

    function showPlaceholder() {
      detalleEl.innerHTML =
        '<div class="detalle__placeholder">' +
          '<span class="iconify" data-icon="lucide:mouse-pointer-click" data-width="34"></span>' +
          '<h3>Explora la malla</h3>' +
          '<p>Pasa el cursor o haz click sobre un curso para ver su ruta de prerrequisitos.</p>' +
          '<span class="detalle__hint">💡 Haz click para <strong>fijar</strong> el curso y mover el mouse libremente.</span>' +
        '</div>';
      if (window.Iconify && window.Iconify.scan) window.Iconify.scan(detalleEl);
    }

    function showDetail(id, prereqs) {
      var data = cursoDataById.get(id);
      if (!data) return;

      var items = Array.from(prereqs)
        .map(function (pid) { return cursoDataById.get(pid); })
        .filter(Boolean)
        .sort(function (a, b) { return a.periodoIndex - b.periodoIndex; })
        .map(function (c) {
          return '<li><strong>P' + c.periodo + ':</strong> ' + c.nombre + '</li>';
        }).join('');

      var isPinned = pinnedId === id;
      var hint = isPinned
        ? '<span class="detalle__hint">📌 Curso fijado — click de nuevo o <strong>Esc</strong> para soltar.</span>'
        : '';

      detalleEl.innerHTML =
        '<div class="detalle__head">' +
          '<h3>' + data.nombre + '</h3>' +
          (isPinned ? '<button class="detalle__close" aria-label="Cerrar">×</button>' : '') +
        '</div>' +
        '<p>Periodo ' + data.periodo + ' · ' + ((TIPO_INFO[data.tipo] || {}).label || '') + ' · ' + data.creditos + ' créditos' +
          (data.codigo ? ' · Cód. ' + data.codigo : '') + '</p>' +
        (items
          ? '<p><strong>Requiere haber cursado:</strong></p><ul class="detalle__list">' + items + '</ul>'
          : '<p>No tiene prerrequisitos registrados.</p>') +
        hint;
    }

    function clearVisuals() {
      mallaEl.classList.remove('has-focus');
      Array.prototype.slice.call(mallaEl.querySelectorAll('.is-active, .is-prereq, .is-pinned'))
        .forEach(function (el) { el.classList.remove('is-active', 'is-prereq', 'is-pinned'); });
    }

    function clearAll() {
      pinnedId = null;
      clearVisuals();
      showPlaceholder();
    }

    function applyHighlight(id) {
      clearVisuals();
      var prereqs = getAllPrereqs(id);
      mallaEl.classList.add('has-focus');

      var activeEl = cursoElById.get(id);
      if (!activeEl) return;

      activeEl.classList.add('is-active');
      if (pinnedId === id) activeEl.classList.add('is-pinned');

      prereqs.forEach(function (pid) {
        var el = cursoElById.get(pid);
        if (el) el.classList.add('is-prereq');
      });

      showDetail(id, prereqs);
    }

    mallaEl.addEventListener('mouseover', function (e) {
      var card = e.target.closest('.curso');
      if (card) applyHighlight(card.dataset.id);
    });

    mallaEl.addEventListener('mouseleave', function () {
      if (pinnedId) applyHighlight(pinnedId);
      else clearAll();
    });

    mallaEl.addEventListener('click', function (e) {
      var card = e.target.closest('.curso');
      if (!card) { clearAll(); return; }
      var id = card.dataset.id;
      if (pinnedId === id) clearAll();
      else { pinnedId = id; applyHighlight(id); }
    });

    mallaEl.addEventListener('keydown', function (e) {
      var card = e.target.closest('.curso');
      if (!card) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var id = card.dataset.id;
        if (pinnedId === id) clearAll();
        else { pinnedId = id; applyHighlight(id); }
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') clearAll();
    });

    detalleEl.addEventListener('click', function (e) {
      if (e.target.closest('.detalle__close')) clearAll();
    });

    render();
    showPlaceholder();

    console.log('[malla.js] Render OK:', document.querySelectorAll('.curso').length, 'cursos');

  } catch (err) {
    showFatal('Error durante el render: ' + (err && err.message ? err.message : err));
  }
})();