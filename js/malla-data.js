/* =========================================================================
   malla-data.js
   -------------------------------------------------------------------------
   Datos de la malla académica y las 7 rutas explícitas (Verde, Amarilla,
   Roja, Violeta, Azul, Negra, Blanca).
   IIFE para no contaminar el scope global.
   ========================================================================= */
(function () {
  'use strict';

  var TIPO_INFO = {
    T: { label: "Teórico",       color: "#D26714" },
    P: { label: "Práctico",      color: "#C9930C" },
    M: { label: "Metodológico",  color: "#035B3B" }
  };

  var PERIODO_COLORES = [
    "#00445B", "#0B5266", "#166071", "#1B6E71", "#217A66",
    "#2E8460", "#4C8A52", "#7C8A3E", "#AC7A28", "#D26714"
  ];

  var MALLA = [
    { id: "p1", numero: "I", creditos: 19, cursos: [
      { id: "p1c1", tipo: "M", creditos: 2, nombre: "Introducción a la Medicina Veterinaria" },
      { id: "p1c2", tipo: "M", creditos: 3, nombre: "Biología celular y molecular", codigo: "30176" },
      { id: "p1c3", tipo: "M", creditos: 3, nombre: "Química orgánica", codigo: "300047" },
      { id: "p1c4", tipo: "M", creditos: 2, nombre: "Fundamentos del enfoque One Health" },
      { id: "p1c5", tipo: "M", creditos: 3, nombre: "Cátedra Unadista", codigo: "80017" },
      { id: "p1c6", tipo: "T", creditos: 3, nombre: "Competencias Comunicativas", codigo: "40003" },
      { id: "p1c7", tipo: "T", creditos: 3, nombre: "Ética y Ciudadanía (grado)", codigo: "400002" }
    ]},
    { id: "p2", numero: "II", creditos: 19, cursos: [
      { id: "p2c1", tipo: "P", creditos: 4, nombre: "Anatomía Veterinaria comparada" },
      { id: "p2c2", tipo: "P", creditos: 2, nombre: "Biología del desarrollo y fisiología animal" },
      { id: "p2c3", tipo: "M", creditos: 3, nombre: "Bioquímica metabólica", codigo: "352001" },
      { id: "p2c4", tipo: "M", creditos: 2, nombre: "Bioética y legislación Veterinaria" },
      { id: "p2c5", tipo: "M", creditos: 3, nombre: "Herramientas digitales para la gestión del conocimiento", codigo: "200610" },
      { id: "p2c6", tipo: "T", creditos: 3, nombre: "Pensamiento lógico y matemático", codigo: "200611" }
    ]},
    { id: "p3", numero: "III", creditos: 17, cursos: [
      { id: "p3c1", tipo: "P", creditos: 3, nombre: "Inmunología" },
      { id: "p3c2", tipo: "P", creditos: 2, nombre: "Nutrición clínica" },
      { id: "p3c3", tipo: "M", creditos: 3, nombre: "Genética y Genómica Aplicada a la Medicina Veterinaria" },
      { id: "p3c4", tipo: "T", creditos: 3, nombre: "Estadística Descriptiva Aplicada a las Ciencias Agrarias", codigo: "300032" },
      { id: "p3c5", tipo: "P", creditos: 2, nombre: "Semiología y Competencias Clínicas Veterinarias" },
      { id: "p3c6", tipo: "M", creditos: 2, nombre: "Transformación Digital y Tecnologías Emergentes en Medicina Veterinaria" },
      { id: "p3c7", tipo: "P", creditos: 3, nombre: "Patología general y sistémica" },
      { id: "p3c8", tipo: "M", creditos: 1, nombre: "Prestación del Servicio Social Unadista (Requisito de grado)", codigo: "700004" }
    ]},
    { id: "p4", numero: "IV", creditos: 17, cursos: [
      { id: "p4c1", tipo: "P", creditos: 3, nombre: "Patología diagnóstica y de laboratorio clínico" },
      { id: "p4c2", tipo: "P", creditos: 2, nombre: "Microbiología veterinaria" },
      { id: "p4c3", tipo: "P", creditos: 2, nombre: "Parasitología veterinaria" },
      { id: "p4c4", tipo: "T", creditos: 2, nombre: "Diseño experimental", codigo: "300004" },
      { id: "p4c5", tipo: "P", creditos: 2, nombre: "Etología y bienestar animal" },
      { id: "p4c6", tipo: "M", creditos: 3, nombre: "Fundamentos en gestión integral", codigo: "112001" },
      { id: "p4c7", tipo: "P", creditos: 2, nombre: "Virología animal" },
      { id: "p4c8", tipo: "T", creditos: 1, nombre: "Electiva campo de formación complementaria" }
    ]},
    { id: "p5", numero: "V", creditos: 18, cursos: [
      { id: "p5c1", tipo: "M", creditos: 3, nombre: "Farmacología veterinaria" },
      { id: "p5c2", tipo: "M", creditos: 3, nombre: "Fundamentos y Generalidades de Investigación", codigo: "150001" },
      { id: "p5c3", tipo: "P", creditos: 2, nombre: "Toxicología veterinaria" },
      { id: "p5c4", tipo: "T", creditos: 3, nombre: "Diseño y evaluación de proyectos", codigo: "331005" },
      { id: "p5c5", tipo: "P", creditos: 2, nombre: "Biotecnologías y Manejo Reproductivo" },
      { id: "p5c6", tipo: "P", creditos: 2, nombre: "Epidemiología y salud pública Veterinaria" },
      { id: "p5c7", tipo: "M", creditos: 3, nombre: "Electivo IBC" }
    ]},
    { id: "p6", numero: "VI", creditos: 19, cursos: [
      { id: "p6c1", tipo: "P", creditos: 3, nombre: "Imagenología Veterinaria" },
      { id: "p6c2", tipo: "P", creditos: 4, nombre: "Cirugía, anestesiología y manejo del dolor" },
      { id: "p6c3", tipo: "P", creditos: 3, nombre: "Medicina interna de rumiantes" },
      { id: "p6c4", tipo: "M", creditos: 3, nombre: "Inglés A1", codigo: "900001" },
      { id: "p6c5", tipo: "M", creditos: 3, nombre: "Electivo DC" },
      { id: "p6c6", tipo: "T", creditos: 1, nombre: "Electivo de formación complementaria" },
      { id: "p6c7", tipo: "M", creditos: 2, nombre: "Electivo DC" }
    ]},
    { id: "p7", numero: "VII", creditos: 17, cursos: [
      { id: "p7c1", tipo: "P", creditos: 2, nombre: "Medicina de urgencias y cuidados intensivos" },
      { id: "p7c2", tipo: "P", creditos: 3, nombre: "Medicina interna de pequeños animales" },
      { id: "p7c3", tipo: "P", creditos: 3, nombre: "Medicina Interna en Equinos" },
      { id: "p7c4", tipo: "M", creditos: 3, nombre: "Inglés A2", codigo: "900002" },
      { id: "p7c5", tipo: "T", creditos: 2, nombre: "Trabajo de Grado", codigo: "204015" },
      { id: "p7c6", tipo: "P", creditos: 2, nombre: "Medicina y producción aviar" },
      { id: "p7c7", tipo: "P", creditos: 2, nombre: "Medicina y producción porcina" }
    ]},
    { id: "p8", numero: "VIII", creditos: 18, cursos: [
      { id: "p8c1", tipo: "P", creditos: 4, nombre: "Rotación Clínica de pequeños animales" },
      { id: "p8c2", tipo: "P", creditos: 4, nombre: "Rotación Clínica en Medicina y cirugía equina" },
      { id: "p8c3", tipo: "T", creditos: 2, nombre: "Mercadeo Agropecuario", codigo: "300005" },
      { id: "p8c4", tipo: "M", creditos: 3, nombre: "Inglés B1", codigo: "900003" },
      { id: "p8c5", tipo: "P", creditos: 3, nombre: "Electivo Línea 1 · Conservación, manejo y bienestar de la fauna silvestre" },
      { id: "p8c6", tipo: "P", creditos: 2, nombre: "Medicina de fauna silvestre y exótica" }
    ]},
    { id: "p9", numero: "IX", creditos: 17, cursos: [
      { id: "p9c1", tipo: "P", creditos: 4, nombre: "Rotación sistemas de producción animal" },
      { id: "p9c2", tipo: "P", creditos: 4, nombre: "Rotación Reproducción y biotecnología veterinaria" },
      { id: "p9c3", tipo: "M", creditos: 1, nombre: "Electivo de formación complementaria" },
      { id: "p9c4", tipo: "M", creditos: 3, nombre: "Inglés B2", codigo: "900004" },
      { id: "p9c5", tipo: "P", creditos: 3, nombre: "Electivo Línea 2 · Salud pública veterinaria y enfoque One Health" },
      { id: "p9c6", tipo: "T", creditos: 2, nombre: "Sociología rural", codigo: "30174" }
    ]},
    { id: "p10", numero: "X", creditos: 14, cursos: [
      { id: "p10c1", tipo: "P", creditos: 4, nombre: "Rotación One Health y Vigilancia Sanitaria" },
      { id: "p10c2", tipo: "P", creditos: 4, nombre: "Rotación de profundización" },
      { id: "p10c3", tipo: "M", creditos: 3, nombre: "Electivo IBC" },
      { id: "p10c4", tipo: "P", creditos: 3, nombre: "Electivo Línea 3 · Gestión Integral de la Medicina Veterinaria para Animales de Compañía" }
    ]}
  ];

  /* ─────────────────────────────────────────────────────────────
     LAS 7 RUTAS EXPLÍCITAS — cada curso tiene SOLO sus prerrequisitos
     directos según el texto oficial. Nada más, nada menos.
     ───────────────────────────────────────────────────────────── */
  var PREREQUISITOS_MANUALES = {

    /* ══════════ RUTA VERDE ══════════ */
    "p2c2": ["p1c2"],                     // Biología desarrollo ← Biología celular
    "p2c5": ["p1c2"],                     // Herramientas digitales ← Biología celular
    "p3c3": ["p2c2", "p2c5"],             // Genética ← Biología desarrollo + Herramientas

    /* ══════════ RUTA AMARILLA ══════════ */
    "p2c1": ["p1c2"],                     // Anatomía ← Biología celular
    "p3c1": ["p2c2", "p2c1"],             // Inmunología ← Bio desarrollo + Anatomía
    "p3c5": ["p2c2", "p2c1"],             // Semiología ← Bio desarrollo + Anatomía
    "p4c2": ["p3c1", "p3c5"],             // Microbiología ← Inmunología + Semiología
    "p4c7": ["p4c2"],                     // Virología ← Microbiología
    "p6c2": ["p4c7"],                     // Cirugía ← Virología
    "p7c2": ["p6c2"],                     // Medicina interna peq ← Cirugía

    /* ══════════ RUTA ROJA ══════════ */
    "p3c6": ["p2c6"],                     // Transformación Digital ← Pensamiento lógico
    "p4c4": ["p3c6"],                     // Diseño experimental ← Transformación Digital
    "p5c2": ["p4c4"],                     // Fundamentos Investigación ← Diseño experimental
    "p5c4": ["p4c4"],                     // Diseño proyectos ← Diseño experimental

    /* ══════════ RUTA VIOLETA ══════════ */
    "p7c4": ["p6c4"],                     // Inglés A2 ← Inglés A1
    "p8c4": ["p7c4"],                     // Inglés B1 ← Inglés A2
    "p9c4": ["p8c4"],                     // Inglés B2 ← Inglés B1

    /* ══════════ RUTA AZUL ══════════ */
    "p2c3": ["p1c3"],                     // Bioquímica metabólica ← Química orgánica
    "p3c2": ["p2c3"],                     // Nutrición clínica ← Bioquímica metabólica

    /* ══════════ RUTA NEGRA ══════════ */
    "p5c1":  ["p3c2"],                    // Farmacología ← Nutrición clínica
    "p8c5":  ["p5c1"],                    // Electivo L1 ← Farmacología
    "p9c5":  ["p8c5"],                    // Electivo L2 ← Electivo L1
    "p10c4": ["p9c5"],                    // Electivo L3 ← Electivo L2

    /* ══════════ RUTA BLANCA ══════════ */
    "p2c4": ["p1c4"],                     // Bioética y legislación ← One Health
    "p4c5": ["p2c4"],                     // Etología y bienestar ← Bioética
    "p5c6": ["p4c5"]                      // Epidemiología ← Etología y bienestar
  };

  /* El grafo final ES exactamente PREREQUISITOS_MANUALES. No hay derivación. */
  var PREREQUISITOS = {};
  MALLA.forEach(function (periodo) {
    periodo.cursos.forEach(function (curso) {
      var reqs = PREREQUISITOS_MANUALES[curso.id];
      if (reqs && reqs.length) PREREQUISITOS[curso.id] = reqs.slice();
    });
  });

  window.MALLA_DATA = {
    MALLA: MALLA,
    PREREQUISITOS: PREREQUISITOS,
    TIPO_INFO: TIPO_INFO,
    PERIODO_COLORES: PERIODO_COLORES
  };
})();