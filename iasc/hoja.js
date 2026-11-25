// Generado desde el piloto (módulo Hoja). No editar a mano.

// Hoja final: conclusión de un vistazo con chips que abren la justificación, gráficos en degradado
// (lavanda, naranja, lima), persianas con la explicación de cada test y exportación (PDF, Word, compartir).
// Función pura de (datos, inf, est): no guarda nada ni toca la red.
var Hoja = (function () {
  "use strict";
  // ================================================================================================
  // PALETA DE LA HOJA · cambia aquí los colores (guía: docs/como-cambiar-colores.md)
  // Cada valor es un color en formato #RRGGBB. Guarda el archivo y recarga la página para verlo.
  // ================================================================================================
  var PALETA = {
    escala: ["#E3F5B0", "#FFB27A", "#F4839A", "#C93A70"], // de menos a más relevante: lima clareado · naranja neón pastel · rosa rojizo · rojo peligro tirando a lila (Juan, 2026-11-25)
    neutra: ["#F0ECFD", "#C9BCF4", "#7B63D6"],      // lavanda: rasgos de personalidad, tiempos, ánimo
    burbujas: null,                                 // null = las burbujas usan la escala; o una lista de pasos, p. ej. ["#…", "#…", "#…"]
    textoBurbuja: "#26223a",                        // color del texto dentro de las burbujas de color
    plausibilidad: { "alta": "#F4839A", "media": "#FFB27A", "a descartar": "#E3F5B0", "no indicado": "#E4D9FF" },
    grado: { "probable": "#F4839A", "posible": "#FFB27A", "poco probable": "#E3F5B0", "modulador": "#E4D9FF" },
    alerta: "#C93A70",                              // burbuja del ítem de riesgo (muy relevante)
    acento: "#6D55C9",                              // títulos, iconos y bordes
    naranja: "#FFB27A",                             // naranja neón pastel: flechas de las persianas y resaltados
    her: ["#FBE6D4", "#F7C6A6", "#F0A07F", "#E2725A"] // cabecera y «cuánto escribió»: tonos cálidos de «Her» (crema, melocotón, salmón, coral), de menos a más escrito
  };
  var LAV = PALETA.acento, ORA = "#E8741A";
  function hexRgb(h) { return [1, 3, 5].map(function (i) { return parseInt(String(h).substr(i, 2), 16) || 0; }); }
  function interp(stops, t) {
    t = Math.max(0, Math.min(1, t || 0));
    var x = t * (stops.length - 1), i = Math.min(stops.length - 2, Math.floor(x)), f = x - i, a = stops[i], b = stops[i + 1];
    return "#" + [0, 1, 2].map(function (k) { return ("0" + Math.round(a[k] + (b[k] - a[k]) * f).toString(16)).slice(-2); }).join("");
  }
  var GRAV = PALETA.escala.map(hexRgb);
  var LAVA = PALETA.neutra.map(hexRgb);
  function rampa(t) { return interp(GRAV, t); }
  function lavanda(t) { return interp(LAVA, t); }
  var HER = PALETA.her.map(hexRgb);
  function her(t) { return interp(HER, t); }
  function tintaDe(hex) { var c = hexRgb(hex || "#ffffff"); return (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) / 255 < 0.58 ? "#ffffff" : "#26223a"; }
  function fondo(c) { return c ? "background:" + c + ";color:" + tintaDe(c) : ""; }
  // Burbujas: si PALETA.burbujas es una lista, se usan esos pasos; si no, la escala continua
  var BEIGE = PALETA.textoBurbuja;   // (nombre histórico) color del texto de las burbujas
  var NEUTROS = { "#EEE9FD": 1, "#E4D9FF": 1, "#F1F9D8": 1 };
  function pasos(lista, t) { return lista[Math.max(0, Math.min(lista.length - 1, Math.round((t || 0) * (lista.length - 1))))]; }
  function rampaChip(t) { return PALETA.burbujas ? pasos(PALETA.burbujas, t) : rampa(t); }
  function lavandaChip(t) { return lavanda(t); }
  function chipEstilo(c) { return !c || NEUTROS[String(c).toUpperCase()] ? ' class-ol="1"' : ' style="background:' + c + ";color:" + BEIGE + '"'; }
  function E(s) { return String(s === null || s === undefined ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function n1(x) { return (Math.round(x * 10) / 10).toString().replace(".", ","); }
  function n0(x) { return String(Math.round(x)); }

  var CORTO = {
    "phq-9": ["Interés", "Ánimo", "Sueño", "Energía", "Apetito", "Autoestima", "Concentración", "Ritmo / inquietud", "Ideas de muerte"],
    "gad-7": ["Nerviosismo", "Preocupación incontrolable", "Preocupación excesiva", "Cuesta relajarse", "Inquietud", "Irritabilidad", "Miedo a algo terrible"]
  };
  var ETQ = ["Nunca", "Varios días", "Más de la mitad de los días", "Casi cada día"];
  var RASGOS = { E: [1, 6, 11, 16], A: [2, 7, 12, 17], C: [3, 8, 13, 18], N: [4, 9, 14, 19], I: [5, 10, 15, 20] };
  var NOMBRE_TEST = { "mini-ipip": "Mini-IPIP", "phq-9": "PHQ-9", "gad-7": "GAD-7" };
  var FOCOS = [
    { id: "ansiedad", nombre: "Ansiedad y preocupación", items: [["gad-7", 1], ["gad-7", 2], ["gad-7", 3], ["gad-7", 4], ["gad-7", 7]] },
    { id: "motora", nombre: "Inquietud motora", items: [["gad-7", 5], ["phq-9", 8]] },
    { id: "atencion", nombre: "Atención y concentración", items: [["phq-9", 7]] },
    { id: "animo", nombre: "Ánimo y autoestima", items: [["phq-9", 1], ["phq-9", 2], ["phq-9", 6]] },
    { id: "sueno", nombre: "Sueño y energía", items: [["phq-9", 3], ["phq-9", 4]] },
    { id: "apetito", nombre: "Apetito", items: [["phq-9", 5]] },
    { id: "irritab", nombre: "Irritabilidad", items: [["gad-7", 6]] }
  ];
  var EXPLICA = {
    "mini-ipip": "20 frases sobre cómo eres <b>en general</b>, sin periodo. Mide cinco rasgos: extraversión, amabilidad, responsabilidad, neuroticismo e intelecto. No hay rasgos buenos ni malos: se leen comparando unos con otros y con un grupo de referencia (<b>z</b>: cuántas desviaciones se aleja de la media de ese grupo). Con 4 frases por rasgo la precisión es limitada.",
    "phq-9": "9 síntomas de ánimo en las <b>últimas 2 semanas</b>, de 0 (nunca) a 3 (casi cada día). La suma va de 0 a 27 y a partir de <b>10</b> es el corte habitual de cribado. El ítem 9 es una alerta que pide hablar, no una medida del riesgo.",
    "gad-7": "7 síntomas de ansiedad en los <b>últimos 14 días</b>, de 0 a 3. La suma va de 0 a 21 y a partir de <b>10</b> es el corte de cribado."
  };
  var CLAVES_CONTEXTO = /(medicaci|tdah|porro|drog|antidepres|antips|ansiol|elvanse|latuda|desvenl|amlodip|cannabis|alcohol|tabaco|fumo|fumar|terapia|psiquiatr)/gi;
  var PERO = /\b(pero|aunque|sin embargo|no obstante)\b/gi;

  var CSS = [
    ".hoja{font-family:system-ui,-apple-system,'Segoe UI',Arial,sans-serif;color:#26223a;background:#fff;border-radius:14px;padding:0 0 14px;line-height:1.4;font-size:13.5px;color-scheme:light}",
    ".hoja *{box-sizing:border-box}",
    ".hoja table{color:#26223a;font-size:inherit}", // en modo quirks (Word, HTML sin doctype) las tablas no heredan el color
    ".hoja .hh{background:#F7C6A6;color:#3a1d22;padding:10px 14px;border-radius:14px 14px 0 0}",
    ".hoja .hh h1{font-size:17px;margin:0;color:#3a1d22;letter-spacing:-.01em}.hoja .hh p{margin:0;color:#5a2f33;font-size:12px}",
    ".hoja .sec{padding:10px 18px 0}",
    ".hoja .sec h2{font-size:13px;margin:10px 0 6px;color:#6D55C9;text-transform:uppercase;letter-spacing:.06em}",
    ".hoja .retrato{background:#EEE9FD;border-left:5px solid #6D55C9;padding:10px 12px;border-radius:8px;font-size:16px;margin:4px 0}",
    ".hoja .chips{margin:6px 0}",
    ".hoja .chip{display:inline-flex;align-items:center;justify-content:center;text-align:center;line-height:1.25;padding:2px 9px;margin:2px 3px 2px 0;border-radius:999px;font-family:'Segoe UI Variable Text','Segoe UI',Inter,system-ui,sans-serif;font-size:12px;font-weight:600;letter-spacing:.01em;color:#4b3a9c;border:1px solid #cfc7ee;background:#fff;vertical-align:middle}",
    ".hoja .chip[style]{border-color:rgba(38,34,58,.12)" + (tintaDe(PALETA.textoBurbuja) === "#26223a" ? ";text-shadow:0 1px 0 rgba(0,0,0,.2)" : "") + "}",
    ".hoja .chip.ol{background:#fff;color:#4b3a9c;border:1px solid #cfc7ee;text-shadow:none}",
    ".hoja .chip.i{cursor:pointer;text-decoration:none;transition:filter .12s ease,box-shadow .12s ease}.hoja .chip.i:hover{filter:brightness(.96);box-shadow:0 1px 4px rgba(60,40,120,.18)}",
    ".hoja .chip.i:hover,.hoja .chip.i:focus{outline:2px solid #6D55C9;outline-offset:1px}",
    ".hoja .chip.alerta{background:" + PALETA.alerta + ";border-color:rgba(38,34,58,.12);color:" + PALETA.textoBurbuja + "}",
    ".hoja .card{border:1px solid #e4e0f2;border-radius:12px;margin:10px 0;overflow:hidden}",
    ".hoja .card>.ct{background:#EEE9FD;padding:8px 12px;font-weight:700;color:#4b3a9c}",
    ".hoja .card>.ct small{font-weight:400;color:#6b6680;margin-left:6px}",
    ".hoja .card>.cb{padding:8px 12px 10px}",
    ".hoja .mu{color:#6b6680;font-size:11.5px}",
    ".hoja .t{width:100%;border-collapse:collapse;font-size:12.5px}",
    ".hoja .t td,.hoja .t th{padding:3px 5px;border-bottom:1px solid #eee9fd;vertical-align:top;text-align:left}",
    ".hoja .t th{color:#6b6680;font-size:12px;font-weight:600}",
    ".hoja .bar{background:#eee9fd;height:14px;border-radius:7px;overflow:hidden;min-width:60px}.hoja .fill{height:14px}",
    ".hoja .antes{color:#6b6680}.hoja .pero{color:#E8741A;text-transform:uppercase;font-size:12px}.hoja .despues{color:#26223a}.hoja .cm{font-size:13px}",
    ".hoja mark{background:#E4D9FF;color:#3b2a8c;padding:0 2px;border-radius:3px}",
    ".hoja details.ex{margin:8px 0 2px;border:1px solid #e4e0f2;border-radius:10px;background:#faf8ff}",
    ".hoja details.ex>summary{cursor:pointer;padding:4px 10px;font-weight:600;color:#4b3a9c;list-style:none}",
    ".hoja details.ex>summary::-webkit-details-marker{display:none}",
    ".hoja details.ex>summary::before{content:'\\25B8  ';color:" + PALETA.naranja + "}.hoja details.ex[open]>summary::before{content:'\\25BE  '}",
    ".hoja details.ex .exb{padding:2px 10px 8px;font-size:12.5px}",
    ".hoja .aviso{background:#FFF0E0;border-left:5px solid #E8741A;padding:8px 12px;border-radius:8px;font-size:14px;margin:6px 0}",
    ".hoja .pie{padding:10px 18px 0;font-size:12px;color:#6b6680}",
    // Jerarquía por capas: bloque (nivel 1) > sub (nivel 2) > persiana de explicación (nivel 3)
    ".hoja .blk{border-top:1px solid #ece8f7}",
    ".hoja .blk>summary{list-style:none;display:flex;align-items:center;gap:10px;padding:7px 14px;cursor:pointer}",
    ".hoja .blk>summary::-webkit-details-marker{display:none}",
    ".hoja .blk>summary:hover{background:#faf8ff}",
    ".hoja .blk>summary:focus-visible{outline:2px solid #6D55C9;outline-offset:-2px}",
    ".hoja .bi{flex:none;width:24px;height:24px;border-radius:7px;background:#EEE9FD;color:#5a45b8;display:flex;align-items:center;justify-content:center}",
    ".hoja .ic{width:15px;height:15px;display:block}",
    ".hoja .bt{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}",
    ".hoja .btt{font-size:14px;font-weight:650;color:#26223a;line-height:1.3;letter-spacing:-.01em}",
    ".hoja .brs{font-size:11.5px;color:#6b6680;line-height:1.35}",
    ".hoja .bch{flex:none;color:" + PALETA.naranja + ";transition:transform .18s ease}.hoja .bch .ic{width:16px;height:16px;stroke-width:2.6}",
    ".hoja .blk[open]>summary>.bch{transform:rotate(90deg)}",
    ".hoja .bc{padding:0 14px 10px 48px}",
    ".hoja .blk.sub{border:1px solid #ece8f7;border-radius:8px;margin:5px 0;background:#fff}",
    ".hoja .blk.sub>summary{padding:4px 10px;gap:8px}",
    ".hoja .blk.sub .bi{width:20px;height:20px;border-radius:6px}.hoja .blk.sub .bi .ic{width:13px;height:13px}",
    ".hoja .blk.sub .btt{font-size:13px;font-weight:600}.hoja .blk.sub .brs{font-size:11px}",
    ".hoja .blk.sub>.bc{padding:2px 10px 8px}",
    ".hoja .blk.hallazgos{background:linear-gradient(180deg,#F3EFFD,#fff 85%)}.hoja .blk.hallazgos .bi{background:#6D55C9;color:#fff}",
    ".hoja .blk.prof .bi{background:#F1F9D8;color:#5f8a10}",
    ".hoja .valor-l{margin:0;padding-left:18px}.hoja .valor-l li{margin:6px 0;font-size:14.5px}",
    ".hoja .chip.sm{font-size:10.5px;padding:1px 7px;margin:1px 3px 1px 0;font-weight:600}",
    ".hoja .cod{font-size:12px;font-weight:400;color:#6b6680}",
    "@media (max-width:560px){.hoja .bc{padding:0 10px 10px}.hoja .blk>summary{padding:6px 10px;gap:8px}.hoja .btt{font-size:13.5px}}",
    "@media (prefers-reduced-motion:reduce){.hoja .bch{transition:none}}",
    // Cabecera, botón de vista móvil y botón flotante de plegar
    ".hoja{position:relative}.hoja .hb{float:right;margin:2px 0 0 10px;background:rgba(255,255,255,.5);color:#3a1d22;border:1px solid rgba(58,29,34,.22);border-radius:999px;padding:3px 10px;font:600 11.5px/1 system-ui,sans-serif;cursor:pointer}",
    ".hoja .flot{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:20;display:inline-flex;align-items:center;gap:8px;background:#4E3AA6;color:#FBF5EA;border:none;border-radius:999px;padding:11px 16px;font:600 13.5px/1 system-ui,sans-serif;box-shadow:0 8px 24px rgba(40,25,100,.35);cursor:pointer}",
    ".hoja .flot .ic{width:17px;height:17px}.hoja .flot:focus-visible,.hoja .hb:focus-visible{outline:2px solid #F6DF6B;outline-offset:2px}",
    // Vista móvil a petición (además de la adaptación automática)
    ".hoja.movil{max-width:400px;margin-left:auto;margin-right:auto}.hoja.movil .bc{padding:0 10px 10px}.hoja.movil .blk>summary{padding:6px 10px;gap:8px}.hoja.movil .vz,.hoja.movil .vz2{grid-template-columns:1fr}.hoja.movil .t{font-size:12.5px}.hoja.movil .pasos-t{grid-template-columns:1fr}",
    // De un vistazo compacto
    ".hoja .vz{display:grid;grid-template-columns:1fr 1fr;gap:8px}.hoja .vz .retrato,.hoja .vz .relato{margin:0;font-size:14px;padding:8px 11px}",
    ".hoja .vistazo .chips{margin:8px 0 2px}.hoja .vistazo .chip{font-size:12.5px;padding:3px 10px}",
    // Autogenerado, interpretaciones, próximos pasos
    ".hoja .auto{display:inline-block;font:600 10.5px/1.6 system-ui,sans-serif;text-transform:uppercase;letter-spacing:.06em;color:#6D55C9;border:1px solid #cfc7ee;border-radius:4px;padding:0 5px;vertical-align:middle}",
    ".hoja .interp{background:#F6F3FE;border-radius:8px;padding:6px 10px;margin:6px 0;font-size:12.5px}.hoja .interp p{margin:4px 0 0}",
    ".hoja .blk.pasos{background:linear-gradient(180deg,#F2F8DC,#fff 80%)}.hoja .blk.pasos .bi{background:#6E9C1F;color:#FBF5EA}",
    ".hoja .sec-t{font:600 12px/1.4 system-ui,sans-serif;text-transform:uppercase;letter-spacing:.06em;color:#6D55C9;margin:8px 0 6px}",
    ".hoja .pasos-t{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px}",
    ".hoja .pt{border:1px solid #e4e0f2;border-radius:10px;padding:10px 12px;background:#fff;display:flex;flex-direction:column;gap:4px;min-width:0}",
    ".hoja .pt-h{display:flex;justify-content:space-between;gap:8px;align-items:baseline}.hoja .pt-p{font-size:13.5px}",
    ".hoja .pt-b{align-self:flex-start;margin-top:4px;background:#4E3AA6;color:#FBF5EA;border:none;border-radius:999px;padding:6px 12px;font:600 12.5px/1 system-ui,sans-serif;cursor:pointer}.hoja .pt-b.on{background:#6E9C1F}",
    ".hoja button.pt-b,.hoja button.flot,.hoja button.hb{box-shadow:none!important;min-height:0;text-transform:none}.hoja button.pt-b{border:0!important}.hoja button.pt-b:focus-visible{outline:2px solid #6D55C9;outline-offset:2px}",
    ".hoja .enf{margin:0;padding-left:18px}.hoja .enf li{margin:2px 0;font-size:12.5px}",
    // Para la consulta: lista ordenada, hoja de ruta, recordar
    ".hoja .focos{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}",
    ".hoja .foco{display:flex;gap:12px;align-items:flex-start;border:1px solid #ece8f7;border-radius:10px;padding:10px 12px}",
    ".hoja .fn{flex:none;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:700 14px/1 system-ui,sans-serif}",
    ".hoja .fb{flex:1;min-width:0;display:flex;flex-direction:column;gap:6px}.hoja .fh{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.hoja .fi{font-size:12.5px}",
    ".hoja .ruta{margin:0;padding-left:20px}.hoja .ruta>li{margin:0 0 8px}.hoja .ruta ul{margin:4px 0 0;padding-left:18px}.hoja .ruta ul li{font-size:13.5px;margin:2px 0}",
    ".hoja .recordar{margin:0;padding-left:18px}.hoja .recordar li{margin:4px 0;font-size:13.5px}",
    // Ventanas: explicación y referencia
    ".hoja .expl{background:#F6F3FE;border-radius:8px;padding:8px 11px;margin-top:10px;font-size:13.5px}",
    ".hoja .ref{border-top:1px solid #ece8f7;margin-top:10px;padding-top:8px;font-size:12px;color:#6b6680}.hoja .ref b{display:block;color:#4b3a9c;margin-bottom:2px}",
    // Formato ordinario (solo tests)
    ".hoja .ord{margin:6px 0 14px}.hoja .ord-h{font-weight:700;margin-bottom:4px}.hoja .ord .num{text-align:center;font-variant-numeric:tabular-nums;width:48px}.hoja .ord-p{background:#faf8ff;border:1px solid #ece8f7;border-radius:8px;padding:7px 10px;font-size:13.5px}",
    ".hoja .farm{border:1px solid #ece8f7;border-radius:8px;padding:6px 10px;margin:5px 0;background:#fff}.hoja .farm p{margin:3px 0;font-size:12.5px}",
    ".hoja .farm-d{font-size:12.5px;color:#4b3a9c}.hoja .farm-l{font-size:13px;margin-top:4px}.hoja .farm-l ul{margin:2px 0 0;padding-left:18px}.hoja .farm-l li{margin:2px 0}",
    ".hoja .sint{border:1px solid #ece8f7;border-left:4px solid " + PALETA.acento + ";border-radius:10px;padding:9px 12px;margin:8px 0;background:#fff}.hoja .sint-h{font-size:14.5px}",
    ".hoja .glos{margin:0;display:grid;grid-template-columns:max-content 1fr;gap:4px 12px;font-size:13px}.hoja .glos dt{font-weight:700;color:#4b3a9c}.hoja .glos dd{margin:0}",
    "@media (max-width:560px){.hoja .glos{grid-template-columns:1fr}.hoja .glos dd{margin-bottom:6px}}",
    "@media (max-width:640px){.hoja .vz,.hoja .vz2{grid-template-columns:1fr}}",
    // Rediseño compacto (Juan, 2026-11-25)
    ".hoja .vz2{display:grid;grid-template-columns:1fr 1fr;gap:6px}.hoja .caja{background:#faf8ff;border:1px solid #ece8f7;border-radius:8px;padding:6px 9px;font-size:12.5px;min-width:0}.hoja .caja.ancha{grid-column:1/-1}",
    ".hoja .caja.retrato{background:#fff;border-left:4px solid " + PALETA.naranja + ";font-size:13px}.hoja .caja.relato{background:#FFF6EE;border-color:#F7DCC6}.hoja .caja.fort{background:#F6FCE6;border-color:#DDEFB5}",
    ".hoja .caja ul,.hoja .caja ol{margin:0;padding-left:16px}.hoja .caja li{margin:2px 0}.hoja .caja .chips{margin:5px 0 0}.hoja ol.mini{list-style:none;padding:0}.hoja ol.mini li{margin:3px 0}",
    ".hoja .ct2{font:600 10.5px/1.4 system-ui,sans-serif;text-transform:uppercase;letter-spacing:.06em;color:#6D55C9;margin-bottom:3px}",
    ".hoja .fn{display:inline-block;min-width:54px;text-align:center;border-radius:999px;font:600 10.5px/1.7 system-ui,sans-serif;padding:0 6px}",
    ".hoja .ind-an{margin-top:3px;font-size:12px}.hoja .an{display:inline-flex;align-items:flex-end;gap:1px;height:16px;margin:0 6px;vertical-align:middle}.hoja .an i{display:block;width:5px;border-radius:1px}",
    ".hoja .cmt{display:block;font-size:10.5px;line-height:1.3;color:#7a7390;margin-top:1px}",
    ".hoja .blk.farmacos{background:linear-gradient(180deg,#FFF1E6,#fff 70%);box-shadow:inset 4px 0 0 " + PALETA.naranja + "}.hoja .blk.farmacos>summary .bi{background:" + PALETA.naranja + ";color:#3a1d22}",
    ".hoja .blk.cambios{box-shadow:inset 4px 0 0 #F4839A}.hoja .blk.cambios>summary .bi{background:#FCE1E6;color:#9b2c4f}",
    ".hoja .enf-c{background:#fff;border:1px solid #DDEFB5;border-radius:8px;padding:6px 10px}.hoja .enf-d{font-size:13px;margin:2px 0 4px;line-height:1.45}",
    ".hoja ol.mini li{display:flex;align-items:center;gap:4px}.hoja .caja.relato{font-size:12.5px;border-left:1px solid #F7DCC6;padding:6px 9px;margin:0;line-height:1.45}.hoja .caja.retrato{margin:0}",
    ".hoja .t .chip{font-size:10.5px;padding:1px 7px;white-space:nowrap;margin:0 2px 0 0}.hoja .t .lec{font-size:11.5px;padding:2px 6px;margin-top:2px;line-height:1.35}.hoja .t td.mu{white-space:nowrap}",
    ".hoja .lnk{cursor:pointer;border-bottom:1px dotted #b9addf}.hoja .lnk:hover,.hoja .lnk:focus{color:#4b3a9c;outline:none}.hoja .blk.hipo[open]>summary .brs{display:none}",
    ".hoja .t tr.gh td{background:#F6F3FE;font-weight:700;color:#4b3a9c;padding-top:5px}.hoja .lst{margin:0;padding-left:18px;font-size:12.5px}.hoja .lst li{margin:2px 0}",
    ".hoja .valor{background:#6D55C9;background:linear-gradient(110deg,#6D55C9 0%,#8f7be0 55%,#9CC92E 140%);color:#fff;border-radius:12px;padding:12px 16px;margin:12px 0 4px}",
    ".hoja .valor b{font-size:16px}.hoja .valor ul{margin:6px 0 0 18px;padding:0}.hoja .valor li{margin:3px 0;font-size:14px}",
    ".hoja .borr{background:#FBD5D5;color:#7a2e2e;text-decoration:line-through;border-radius:4px;padding:0 4px;margin-right:4px}",
    ".hoja .anad{background:#D4F0D9;color:#225c2e;border-radius:4px;padding:0 4px}",
    ".hoja .sig{background:#EEE9FD;border-radius:8px;padding:6px 10px;margin:8px 0 0}",
    ".hoja .hip .ct{overflow:hidden}",
    ".hoja .relato{background:#F1F9D8;border-left:5px solid #9CC92E;padding:8px 12px;border-radius:8px;font-size:14px;margin:6px 0}",
    ".hoja .lec{margin-top:4px;padding:5px 8px;border-radius:8px;font-size:12.5px;color:#26223a}",
    ".hoja .lec.r{background:#FBD5D5;border-left:4px solid #E59A9A}.hoja .lec.v{background:#D4F0D9;border-left:4px solid #8CCB98}",
    ".hoja .dot{display:inline-block;width:11px;height:11px;border-radius:50%;margin-left:6px;vertical-align:middle}.hoja .dot.r{background:#F4A9A9}.hoja .dot.v{background:#9ED8A8}",
    ".hoja .nota{width:100%;min-height:80px;border:1px dashed #B9A7F0;border-radius:10px;padding:8px;font:inherit;background:#faf8ff;color:#26223a}",
    ".hoja .x{float:right;border:1px solid #cfc7ee;background:#fff;color:#4b3a9c;border-radius:8px;padding:4px 10px;cursor:pointer;font-weight:600}",
    ".hoja.pop{padding:18px 20px 20px}.hoja.pop h3{margin:0 0 10px;font-size:18px;color:#4b3a9c;padding-right:90px}",
    "dialog#hoja-dlg{border:none;border-radius:14px;padding:0;width:min(700px,94vw);max-height:88vh;overflow:auto;background:#fff}",
    "dialog#hoja-dlg::backdrop{background:rgba(30,20,60,.6)}"
  ].join("\n");

  // ---------- Lectura del motor (est.lectura): coherente = verde pastel, contradice = rojo pastel ----------
  var LEC = null;
  function fijarLectura(est) { LEC = est && est.lectura && est.lectura.items ? est.lectura.items : null; }
  function lec(t, n) { return LEC && LEC[t] && LEC[t][n] ? LEC[t][n] : null; }
  function lecHTML(l) {
    if (!l) return "";
    var r = l.estado === "contradice";
    return '<div class="lec ' + (r ? "r" : "v") + '"><b>' + (r ? "Contradice" : "Coherente") + "</b> · " + E(l.opinion || "") + "</div>";
  }
  function punto(t, n) { var l = lec(t, n); return l ? '<span class="dot ' + (l.estado === "contradice" ? "r" : "v") + '" title="' + (l.estado === "contradice" ? "Contradice" : "Coherente") + '"></span>' : ""; }

  // ---------- Utilidades de datos ----------
  function item(inf, t, n) { return ((inf.items || {})[t] || [])[n - 1] || null; }
  function nivel(t, it) { return it && it.respuesta !== null ? (t === "mini-ipip" ? (it.respuesta - 1) / 4 : it.respuesta / 3) : null; }
  function chipDe(txt, color, key, modo, extra) {
    var neutro = !color || NEUTROS[String(color).toUpperCase()];
    var cls = "chip" + (neutro && extra !== "alerta" ? " ol" : "") + (extra ? " " + extra : "");
    var st = neutro ? "" : ' style="background:' + color + ";color:" + tintaDe(color) + '"';
    if (modo !== "export" && key) return '<span class="' + cls + ' i"' + st + ' data-hoja="' + E(key) + '" tabindex="0" role="button">' + E(txt) + "</span>";
    return '<span class="' + cls + '"' + st + ">" + E(txt) + "</span>";
  }
  function palabra(t, it) {
    if (!it || it.respuesta === null) return '<span class="chip">sin responder</span>';
    // Síntomas (PHQ-9, GAD-7): escala de gravedad. Personalidad (Mini-IPIP): intensidad neutra, porque estar de acuerdo no es grave.
    var c = t === "mini-ipip" ? lavandaChip(nivel(t, it)) : rampaChip(nivel(t, it));
    return '<span class="chip" style="background:' + c + ";color:" + tintaDe(c) + '">' + E(it.etiqueta) + "</span>";
  }
  function comentario(txt) {
    if (!txt) return "";
    var m, last = null; PERO.lastIndex = 0;
    while ((m = PERO.exec(txt))) last = m;
    if (!last) return '<span class="cm">«' + E(txt) + "»</span>";
    var a = txt.slice(0, last.index).replace(/[\s,;.]+$/, ""), d = txt.slice(last.index + last[0].length).replace(/^[\s,;.]+/, "");
    return '<span class="cm"><span class="antes">«' + E(a) + '</span> <b class="pero">' + E(last[0]) + '</b> <b class="despues">' + E(d) + "»</b></span>";
  }
  // Cabecera: degradado cálido según cuánto escribió en cada pregunta, en orden de respuesta (suavizado)
  function degradadoHer(inf) {
    var v = [];
    ["mini-ipip", "phq-9", "gad-7"].forEach(function (t) { (inf.items[t] || []).forEach(function (it) { v.push((it.comentario || "").length); }); });
    if (!v.length) return "background:" + PALETA.her[1];
    var s = v.map(function (x, i) { var a = 0, c = 0; for (var k = i - 2; k <= i + 2; k++) if (k >= 0 && k < v.length) { a += v[k]; c++; } return a / c; });
    var mx = Math.max.apply(null, s.concat([1])), paso = Math.max(1, Math.ceil(s.length / 24)), st = [];
    for (var i = 0; i < s.length; i += paso) st.push(her(Math.sqrt(s[i] / mx)) + " " + (i / Math.max(1, s.length - 1) * 100).toFixed(1) + "%");
    st.push(her(Math.sqrt(s[s.length - 1] / mx)) + " 100%");
    return "background:" + PALETA.her[1] + ";background:linear-gradient(90deg," + st.join(",") + ")";
  }
  function miniAnimo(ra) { return '<span class="an" title="' + E(ra.join(" → ")) + '">' + ra.map(function (x) { return '<i style="height:' + (3 + x * 1.3) + "px;background:" + lavanda(x / 10) + '"></i>'; }).join("") + "</span>"; }
  function barra(pct, color) { return '<div class="bar"><div class="fill" style="width:' + Math.max(2, Math.min(100, pct)) + "%;background:" + color + '"></div></div>'; }
  function lista(a) { return a.length ? a.join(", ") : "ninguno"; }
  function tdefDe(datos, id) { return datos.tests.filter(function (t) { return t.id === id; })[0]; }

  function focos(inf) {
    return FOCOS.map(function (f) {
      var s = 0, c = 0, its = [];
      f.items.forEach(function (p) { var it = item(inf, p[0], p[1]); if (it && it.respuesta !== null) { s += it.puntuado; c++; its.push({ t: p[0], n: p[1], it: it }); } });
      return { id: f.id, nombre: f.nombre, pct: c ? s / (3 * c) * 100 : 0, n: c, items: its };
    }).filter(function (f) { return f.n; }).sort(function (a, b) { return b.pct - a.pct || b.n - a.n; });
  }
  function masc(r, cap) { var m = String(r).replace(/a$/, "o"); return cap ? m : m.toLowerCase(); } // «Moderada» → «moderado» (ánimo es masculino)
  function etiquetaPeso(p) { return p >= 83 ? "pico" : p >= 55 ? "marcado" : p >= 30 ? "presente" : "leve"; }
  function pomp(inf, k) { var s = inf.tests["mini-ipip"].puntuacion.subescalas[k]; return s.calculable ? s.pomp : null; }
  function nivelRasgo(p, k) {
    var f = k === "E" || k === "A" || k === "C"; // extraversión, amabilidad, responsabilidad: femenino
    var n = p >= 85 ? "muy alto" : p >= 65 ? "alto" : p > 35 ? "medio" : "bajo";
    return f ? n.replace(/o$/, "a") : n;
  }
  function idxRango(tdef, etq) { for (var i = 0; i < tdef.rangos.length; i++) if (tdef.rangos[i].etiqueta === etq) return i; return 0; }
  function riesgoTraza(inf, est) {
    var it = item(inf, "phq-9", 9);
    if (!it || !it.secuencia || it.secuencia.length < 2) return null;
    var ev = (est.eventos || []).filter(function (e) { return (e.test === "phq-9" && e.n === 9 && (e.tipo === "respuesta" || e.tipo === "riesgo_disparado")) || ((e.tipo === "pausa" || e.tipo === "reanudar") && /item:phq-9:9/.test(e.paso || "")); });
    var t0 = ev.length ? ev[0].t : null, pasos = [];
    ev.forEach(function (e) {
      var s = t0 === null ? "" : "+" + n1((e.t - t0) / 1000) + " s · ";
      if (e.tipo === "respuesta") pasos.push(s + (e.previo === null || e.previo === undefined ? "respondió" : "cambió a") + " «" + ETQ[e.valor] + "» (" + e.valor + ")");
      else if (e.tipo === "riesgo_disparado") pasos.push(s + "saltó el protocolo de riesgo (024 y 112)");
      else if (e.tipo === "pausa") pasos.push(s + "pausa");
      else pasos.push(s + "reanudó");
    });
    return { inicial: it.secuencia[0], final: it.secuencia[it.secuencia.length - 1], pasos: pasos, it: it };
  }

  // ---------- Fragmentos visuales ----------
  function medidor(tdef, s) {
    var rs = tdef.rangos, maxv = rs[rs.length - 1].max + 1, top = "", bot = "";
    rs.forEach(function (r, i) {
      var w = (r.max - r.min + 1) / maxv * 100, dentro = s.puntuacion >= r.min && s.puntuacion <= r.max;
      top += '<td align="center" style="width:' + w.toFixed(1) + "%;" + fondo(rampa(i / (rs.length - 1))) + ';font-size:11px;padding:4px 2px;border:1px solid #fff">' + E(r.etiqueta) + '<br><span style="font-size:10px">' + r.min + "–" + r.max + "</span></td>";
      bot += '<td align="center" style="font-size:12px;font-weight:700;color:#4b3a9c;padding:2px 0">' + (dentro ? "▲ " + s.puntuacion : "&nbsp;") + "</td>";
    });
    return '<table style="width:100%;border-collapse:collapse;table-layout:fixed"><tr>' + top + "</tr><tr>" + bot + "</tr></table>";
  }
  function tiraItems(inf, id, modo) {
    var h = '<table class="t">';
    (inf.items[id] || []).forEach(function (it) {
      var lbl = id === "mini-ipip" ? it.n + ". " + it.texto : CORTO[id][it.n - 1], key = "item:" + id + ":" + it.n;
      h += "<tr><td style=\"width:38%\">" + (modo !== "export" ? (id === "mini-ipip" ? '<span class="lnk i" data-hoja="' + key + '" tabindex="0" role="button">' + E(lbl) + "</span>" : '<span class="chip sm ol i" data-hoja="' + key + '" tabindex="0" role="button">' + E(lbl) + "</span>") : "<b>" + E(lbl) + "</b>") + "</td><td>" + palabra(id, it) + punto(id, it.n) + (it.comentario ? '<span class="cmt">«' + E(it.comentario) + "»</span>" : "") + "</td></tr>";
    });
    return h + "</table>";
  }
  function pesoRasgos(inf, modo) {
    var h = '<table class="t">';
    ["E", "A", "C", "N", "I"].forEach(function (k) {
      var s = inf.tests["mini-ipip"].puntuacion.subescalas[k], r = inf.tests["mini-ipip"].extra.referencia[k];
      if (!s.calculable) { h += "<tr><td>" + E(s.nombre) + '</td><td colspan="2">no calculable</td></tr>'; return; }
      h += '<tr><td style="width:30%">' + chipDe(s.nombre, "#EEE9FD", "rasgo:" + k, modo) + '</td><td style="width:45%">' + barra(s.pomp, lavanda(s.pomp / 100)) + '</td><td class="mu" style="width:25%"><b style="color:#26223a">' + s.puntuacion + "</b>/20 · z " + (r.z > 0 ? "+" : "") + n1(r.z) + "</td></tr>";
    });
    return h + "</table>";
  }
  function ritmoFila(inf, id) {
    var its = inf.items[id] || [], mx = 1;
    its.forEach(function (it) { if (it.tiempo_activo_s > mx) mx = it.tiempo_activo_s; });
    var celdas = its.map(function (it) {
      var hh = Math.max(3, Math.round(it.tiempo_activo_s / mx * 46));
      return '<td valign="bottom" style="padding:0 1px;height:50px"><div title="' + E(it.tiempo_activo_s) + ' s" style="width:9px;height:' + hh + "px;background:" + lavanda(it.tiempo_activo_s / mx) + '"></div></td>';
    }).join("");
    return "<tr><td style=\"width:90px;font-weight:600\">" + NOMBRE_TEST[id] + '</td><td><table style="border-collapse:collapse"><tr>' + celdas + "</tr></table></td></tr>";
  }

  // ---------- Justificaciones (contenido de las ventanas) ----------
  function tablaItems(inf, pares, conTest) {
    var h = '<table class="t"><tr>' + (conTest ? "<th>Test</th>" : "") + "<th>Ítem</th><th>Respuesta</th><th>Comentario (pesa lo que va tras el «pero»)</th></tr>";
    pares.forEach(function (p) {
      var it = p.it || item(inf, p.t, p.n); if (!it) return;
      var nombre = p.t === "mini-ipip" ? E(it.texto) : "<b>" + E(CORTO[p.t][p.n - 1]) + '</b><br><span class="mu">' + E(it.texto) + "</span>";
      h += "<tr>" + (conTest ? "<td>" + NOMBRE_TEST[p.t] + "</td>" : "") + "<td>" + nombre + (it.inverso ? ' <span class="mu">(inverso)</span>' : "") + "</td><td>" + palabra(p.t, it) + (p.t === "mini-ipip" ? '<br><span class="mu">puntúa ' + it.puntuado + "</span>" : "") + "</td><td>" + comentario(it.comentario) + lecHTML(lec(p.t, p.n)) + "</td></tr>";
    });
    return h + "</table>";
  }
  function declarado(inf) {
    var out = [];
    ["mini-ipip", "phq-9", "gad-7"].forEach(function (t) {
      (inf.items[t] || []).forEach(function (it) { CLAVES_CONTEXTO.lastIndex = 0; if (it.comentario && CLAVES_CONTEXTO.test(it.comentario)) out.push({ t: t, n: it.n, it: it }); });
    });
    return out;
  }
  function resaltar(html) { return html.replace(CLAVES_CONTEXTO, "<mark>$1</mark>"); }

  // Todos los datos: una sola tabla con todas las preguntas, agrupadas por test, y persianas con el resto de lo recogido
  var ETQ_CTX = { sueno: "Horas dormidas", lugar: "Dónde respondió", acompanado: "Compañía", tomado: "Tomado hoy", influye: "¿Cree que influye en sus respuestas?", animo: "Cómo se encuentra (0–10)", removido: "¿Le ha removido algo?", mal_planteada: "Alguna pregunta mal planteada", comentario: "Comentario final" };
  var DIFIC = ["Nada difícil", "Algo difícil", "Muy difícil", "Extremadamente difícil"];
  function vacio(x) { return x === undefined || x === null || x === ""; }
  function todosLosDatos(datos, inf, est, modo) {
    var L = est && est.lectura;
    var h = '<table class="t td"><tr><th style="width:26px">#</th><th>Pregunta</th><th style="width:17%">Respuesta</th><th style="width:9%">Tiempo</th><th>Comentario y lectura</th></tr>';
    var CONV = est && est.convocatoria && est.convocatoria.tests;
    ["mini-ipip", "phq-9", "gad-7"].filter(function (t) { return !CONV || CONV.indexOf(t) >= 0; }).forEach(function (t) {
      var T = inf.tests[t], sub = T.puntuacion.subescalas, tot = sub.total;
      var resumen = tot ? tot.puntuacion + "/" + tot.max + (tot.rango ? " · " + tot.rango : "") : Object.keys(sub).map(function (k) { return sub[k].nombre + " " + (sub[k].calculable ? sub[k].puntuacion : "n/c"); }).join(" · ");
      h += '<tr class="gh"><td colspan="5">' + NOMBRE_TEST[t] + ' <span class="mu">' + E(T.marco) + " · " + E(resumen) + "</span></td></tr>";
      (inf.items[t] || []).forEach(function (it) {
        var nombre = t === "mini-ipip" ? E(it.texto) : "<b>" + E(CORTO[t][it.n - 1]) + '</b><span class="cmt">' + E(it.texto) + "</span>";
        var marcas = [it.inverso ? "inverso" : "", it.riesgo ? "ítem de riesgo" : "", it.no_entiendo ? "marcó «no se entiende»" : "", it.no_encaja ? "marcó «no encaja»" : "", it.ayuda_abierta ? "abrió la ayuda" : "", it.saltado_veces ? "saltada " + it.saltado_veces + " veces" : ""].filter(Boolean).join(" · ");
        var seq = it.secuencia && it.secuencia.length > 1 ? '<span class="cmt">cambió: ' + it.secuencia.join(" → ") + "</span>" : "";
        var tiempo = !vacio(it.tiempo_activo_s) ? n0(it.tiempo_activo_s) + " s" + (!vacio(it.latencia_s) ? '<span class="cmt">elige en ' + n0(it.latencia_s) + " s</span>" : "") : "—";
        var vers = (it.comentario_versiones || []).length > 1 ? '<span class="cmt">' + it.comentario_versiones.length + " versiones (ver «Lo que escribió y borró»)</span>" : "";
        h += "<tr><td>" + it.n + "</td><td>" + nombre + (marcas ? '<span class="cmt">' + marcas + "</span>" : "") + "</td><td>" + palabra(t, it) + (t === "mini-ipip" && it.respuesta !== null ? '<span class="cmt">puntúa ' + it.puntuado + "</span>" : "") + seq + '</td><td class="mu">' + tiempo + "</td><td>" + comentario(it.comentario) + vers + lecHTML(lec(t, it.n)) + "</td></tr>";
      });
      var ex = est && est.extras && est.extras[t];
      if (t === "phq-9" && ex && !vacio(ex.dificultad)) h += '<tr><td>10</td><td>Dificultad que le causan estos problemas</td><td colspan="3">' + E(DIFIC[ex.dificultad] || ex.dificultad) + "</td></tr>";
    });
    h += "</table>";

    var pre = (inf.contexto && inf.contexto.pre) || {}, post = (inf.contexto && inf.contexto.post) || {}, claves = [];
    Object.keys(pre).concat(Object.keys(post)).forEach(function (k) { if (claves.indexOf(k) < 0) claves.push(k); });
    var fic = '<table class="t"><tr><th>Campo</th><th>Antes</th><th>Al terminar</th></tr>' + claves.map(function (k) { return "<tr><td>" + E(ETQ_CTX[k] || k) + "</td><td>" + (vacio(pre[k]) ? "—" : E(pre[k])) + "</td><td>" + (vacio(post[k]) ? "—" : E(post[k])) + "</td></tr>"; }).join("") + "</table>";
    var dd = L && L.deducidos;
    if (dd && dd.length) fic += '<div class="ct2" style="margin-top:6px">Deducido de los comentarios (cuenta como respuesta)</div><table class="t">' + dd.map(function (x) { return "<tr><td style=\"width:30%\">" + E(x.campo) + "</td><td>" + E(x.valor) + '<span class="cmt">«' + E(x.cita) + "»" + (x.desde ? " · " + E(x.desde) : "") + "</span></td></tr>"; }).join("") + "</table>";
    h += bloque("nota", "Ficha previa y final", claves.length + " campos" + (dd && dd.length ? " · " + dd.length + " deducidos de los comentarios" : ""), fic, false, modo, "sub");

    var rit = detalleBase("ritmo", datos, inf, est).replace(/<h3>[\s\S]*?<\/h3>/, "");
    var cal = '<table class="t"><tr><th>Test</th><th>Respuestas extremas</th><th>Misma respuesta seguida (máx.)</th><th>Cambios</th><th>Salidas de la app</th></tr>' + ["mini-ipip", "phq-9", "gad-7"].map(function (id) {
      var c = inf.calidad[id] || {};
      return "<tr><td>" + NOMBRE_TEST[id] + "</td><td>" + (vacio(c.extremos_pct) ? "—" : n0(c.extremos_pct) + " %") + "</td><td>" + (vacio(c.cadena_igual_max) ? "—" : c.cadena_igual_max) + "</td><td>" + (vacio(c.cambios) ? "—" : c.cambios) + "</td><td>" + (vacio(c.salidas_app) ? "—" : c.salidas_app) + "</td></tr>";
    }).join("") + "</table>";
    var pau = L && L.pausas_relevantes && L.pausas_relevantes.length ? '<div class="ct2" style="margin-top:6px">Pausas relevantes</div><ul class="lst">' + L.pausas_relevantes.map(function (x) { return "<li>" + E(x) + "</li>"; }).join("") + "</ul>" : "";
    var tt = inf.totales || {};
    h += bloque("barras", "Ritmo, pausas y calidad de respuesta", n1(tt.duracion_total_min || 0) + " min · " + (tt.cambios || 0) + " cambios · " + (tt.pausas || 0) + " pausas · " + (tt.salidas_app || 0) + " salidas de la app", rit + cal + pau, false, modo, "sub");

    var ses = (inf.sesiones || []).map(function (s) { return "<tr><td>" + E(s.dia) + " " + E(s.hora_local) + "</td><td>" + n1(s.duracion_min) + " min</td><td>" + s.eventos + " eventos</td></tr>"; }).join("");
    var dsp = inf.dispositivo || {};
    var notas = L && L.notas_piloto && L.notas_piloto.length ? '<div class="ct2" style="margin-top:6px">Notas del piloto</div><ul class="lst">' + L.notas_piloto.map(function (x) { return "<li>" + E(x) + "</li>"; }).join("") + "</ul>" : "";
    h += bloque("reloj", "Sesión y dispositivo", (inf.sesiones || []).length + " sesión · " + (inf.sesiones && inf.sesiones[0] ? E(inf.sesiones[0].dia) + " " + E(inf.sesiones[0].hora_local) : "") + (dsp.pantalla ? " · " + E(dsp.pantalla) : ""), '<table class="t"><tr><th>Inicio</th><th>Duración</th><th>Registro</th></tr>' + ses + "</table>" + (dsp.ua ? '<p class="mu">' + E(dsp.ua) + "</p>" : "") + notas, false, modo, "sub");

    h += bloque("hoja", "Solo los tests, formato ordinario", "respuestas y puntuaciones como en papel, sin comentarios ni lectura automática", soloTests(datos, inf, est), false, modo, "sub");

    var refs = ["mini-ipip", "phq-9", "gad-7"].map(function (id) { return fuenteTest(datos, id); }).concat([REF_FIJAS.hip, REF_FIJAS.riesgo, REF_FIJAS.ritmo]);
    h += bloque("clip", "Referencias", refs.length + " fuentes: cuestionarios, clasificaciones y método", '<ol class="lst">' + refs.map(function (r) { return "<li>" + E(r) + "</li>"; }).join("") + "</ol>", false, modo, "sub");
    return h;
  }
  function notaProfesional(est, modo) {
    var v = (est && est.nota_profesional) || "";
    return modo === "web"
      ? '<textarea class="nota" data-nota="1" rows="4" placeholder="Valoración, foco elegido y próximos pasos. Se guarda con el registro.">' + E(v) + "</textarea>"
      : '<div class="nota">' + (v ? E(v).replace(/\n/g, "<br>") : "&nbsp;") + "</div>";
  }

  // ---------- Explicación y referencia de cada ventana ----------
  var REF_FIJAS = {
    riesgo: "Manual de instrucciones del PHQ (Pfizer): una respuesta mayor que 0 en el ítem 9 requiere valorar el riesgo en una entrevista clínica.",
    ritmo: "Huang, Curran, Keeney, Poposki y DeShon (2012). Detecting and deterring insufficient effort responding to surveys. Journal of Business and Psychology, 27, 99–114 (umbral de 2 s por ítem).",
    contexto: "Declarado por la persona en sus comentarios y extraído automáticamente; se toma tal como lo cuenta.",
    hip: "Clasificaciones: CIE-11 (OMS, 2022) y DSM-5-TR (APA, 2022). La plausibilidad se genera automáticamente a partir del contexto; la confirma la entrevista clínica."
  };
  function fuenteTest(datos, id) { var t = tdefDe(datos, id), f = t && t.fuente; return f ? (typeof f === "string" ? f : (f.cita || NOMBRE_TEST[id])) : NOMBRE_TEST[id]; }
  function refDe(key, datos) {
    var p = key.split(":"), tipo = p[0], refs = [];
    if (tipo === "test" || tipo === "item") refs.push(fuenteTest(datos, p[1]));
    else if (tipo === "rasgo") refs.push(fuenteTest(datos, "mini-ipip"));
    else if (tipo === "foco") { var f = FOCOS.filter(function (x) { return x.id === p[1]; })[0]; if (f) f.items.map(function (x) { return x[0]; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).forEach(function (t) { refs.push(fuenteTest(datos, t)); }); }
    else if (tipo === "riesgo") { refs.push(REF_FIJAS.riesgo); refs.push(fuenteTest(datos, "phq-9")); }
    else if (REF_FIJAS[tipo]) refs.push(REF_FIJAS[tipo]);
    return refs.length ? '<div class="ref"><b>Referencia</b>' + refs.map(function (r) { return "<div>" + E(r) + "</div>"; }).join("") + "</div>" : "";
  }
  function explicaDe(key) {
    var p = key.split(":"), tipo = p[0];
    if (tipo === "test" || tipo === "item") return EXPLICA[p[1]] || "";
    if (tipo === "rasgo") return EXPLICA["mini-ipip"];
    if (tipo === "foco") return "Un foco agrupa preguntas de distintos cuestionarios que hablan de lo mismo. Su peso es lo respondido sobre el máximo posible: ordena por peso, no por gravedad clínica.";
    if (tipo === "hip") return "Hipótesis generada automáticamente a partir de respuestas, comentarios y tiempos. «Alta» quiere decir varios datos a favor y pocos en contra; no es un diagnóstico.";
    return "";
  }
  function detalle(key, datos, inf, est) {
    var ex = explicaDe(key);
    return detalleBase(key, datos, inf, est) + (ex ? '<div class="expl"><b>Qué significa</b> ' + ex + "</div>" : "") + refDe(key, datos);
  }
  function detalleBase(key, datos, inf, est) {
    fijarLectura(est);
    var p = key.split(":"), tipo = p[0], h = "";
    if (tipo === "test") {
      var id = p[1], tdef = tdefDe(datos, id), t = inf.tests[id], its = (inf.items[id] || []).map(function (it) { return { t: id, n: it.n, it: it }; });
      h += "<h3>" + NOMBRE_TEST[id] + " · " + E(t.marco) + "</h3>";
      if (id === "mini-ipip") h += pesoRasgos(inf, "export");
      else { var s = t.puntuacion.subescalas.total; h += medidor(tdef, s) + '<p class="mu">' + s.cortes.map(function (c) { return "Corte ≥ " + c.valor + ": " + (c.supera ? "por encima" : "por debajo") + " · " + E(c.fuente); }).join("<br>") + "</p>"; }
      return h + tablaItems(inf, its, false);
    }
    if (tipo === "foco") {
      var f = focos(inf).filter(function (x) { return x.id === p[1]; })[0];
      if (!f) return "<p>Sin datos.</p>";
      return "<h3>" + E(f.nombre) + ' <span class="chip" style="background:' + rampaChip(f.pct / 100) + ";color:" + tintaDe(rampaChip(f.pct / 100)) + '">' + etiquetaPeso(f.pct) + " · " + n0(f.pct) + " %</span></h3><p class=\"mu\">Peso = suma de lo respondido en estos ítems sobre el máximo posible. Ordena por peso en las respuestas, no por gravedad clínica.</p>" + tablaItems(inf, f.items, true);
    }
    if (tipo === "rasgo") {
      var k = p[1], sc = inf.tests["mini-ipip"].puntuacion.subescalas[k], r = inf.tests["mini-ipip"].extra.referencia[k];
      h += "<h3>" + E(sc.nombre) + ' <span class="chip" style="background:' + lavandaChip(sc.pomp / 100) + ";color:" + tintaDe(lavandaChip(sc.pomp / 100)) + '">' + nivelRasgo(sc.pomp, k) + " · " + sc.puntuacion + "/20</span></h3>";
      h += barra(sc.pomp, lavanda(sc.pomp / 100)) + '<p class="mu">Posición respecto a un grupo de referencia: z ' + (r.z > 0 ? "+" : "") + n1(r.z) + " (media " + r.m + ", DE " + r.de + "). Intervalo 90 %: " + (r.ic90 ? r.ic90[0] + "–" + r.ic90[1] : "—") + ". Con 4 frases por rasgo el margen es amplio.</p>";
      return h + tablaItems(inf, RASGOS[k].map(function (n) { return { t: "mini-ipip", n: n }; }), false);
    }
    if (tipo === "hip") {
      var hh = est && est.lectura && est.lectura.hipotesis && est.lectura.hipotesis[+p[1]];
      if (!hh) return "<p>Sin datos.</p>";
      return "<h3>" + E(teoria(hh.nombre)) + '</h3><p class="mu">' + E(hh.codigo || "") + " · plausibilidad " + E(hh.plausibilidad) + "</p>" + (hh.base ? "<p>" + E(hh.base) + "</p>" : "") + detalleHip(hh) + (hh.siguiente ? "<p><b>Siguiente paso:</b> " + E(hh.siguiente) + "</p>" : "");
    }
    if (tipo === "item") { var it = item(inf, p[1], +p[2]); return "<h3>" + (p[1] === "mini-ipip" ? "Ítem " + p[2] : E(CORTO[p[1]][p[2] - 1])) + "</h3>" + tablaItems(inf, [{ t: p[1], n: +p[2] }], false); }
    if (tipo === "riesgo") {
      var z = riesgoTraza(inf, est);
      if (!z) return "<p>Sin activaciones.</p>";
      h += "<h3>Ítem 9 del PHQ-9: «" + ETQ[z.inicial] + "» → «" + ETQ[z.final] + "»</h3>";
      h += '<p>Pensamientos de que estaría mejor muerto/a o de querer hacerse daño. Se muestran el valor inicial y el final: la hoja no oculta ninguno. La decisión sobre el riesgo real la toma un profesional con entrevista.</p><ol>' + z.pasos.map(function (s) { return "<li>" + E(s) + "</li>"; }).join("") + "</ol>";
      return h + tablaItems(inf, [{ t: "phq-9", n: 9, it: z.it }], false);
    }
    if (tipo === "contexto") {
      var pre = inf.contexto.pre, post = inf.contexto.post, d = declarado(inf);
      h += "<h3>Contexto declarado por la persona</h3><p class=\"mu\">Se toma tal como lo cuenta, sin juzgarlo ni sugerir cambios: a cada persona le sientan cosas distintas. Resaltado lo relevante.</p>";
      if (d.length) h += "<table class=\"t\"><tr><th>Dónde</th><th>Lo que dice</th></tr>" + d.map(function (x) { return "<tr><td>" + NOMBRE_TEST[x.t] + " · " + (x.t === "mini-ipip" ? "ítem " + x.n : E(CORTO[x.t][x.n - 1])) + "</td><td>" + resaltar(comentario(x.it.comentario)) + "</td></tr>"; }).join("") + "</table>";
      else h += "<p>No hay menciones en los comentarios.</p>";
      var dd = est && est.lectura && est.lectura.deducidos;
      if (dd && dd.length) h += "<p><b>Deducido de los comentarios</b> (cuenta como respuesta):</p><table class=\"t\"><tr><th>Campo</th><th>Valor</th><th>Desde</th></tr>" + dd.map(function (x) {
        var de = String(x.desde || "").split(":");
        return "<tr><td>" + E(x.campo) + "</td><td>" + E(x.valor) + '<br><span class="mu">«' + E(x.cita) + "»</span></td><td>" + (NOMBRE_TEST[de[0]] ? NOMBRE_TEST[de[0]] + " " + E(de[1]) : E(x.desde)) + "</td></tr>";
      }).join("") + "</table>";
      h += '<table class="t"><tr><th>Ficha</th><th>Antes</th><th>Después</th></tr><tr><td>Cómo te encuentras (0–10)</td><td>' + E(pre.animo) + "</td><td>" + E(post.animo) + "</td></tr><tr><td>Horas dormidas</td><td>" + E(pre.sueno || "—") + "</td><td></td></tr><tr><td>Algo tomado hoy</td><td>" + E(pre.tomado || "—") + "</td><td></td></tr></table>";
      if (post.comentario) h += "<p><b>Comentario final:</b> " + comentario(post.comentario) + "</p>";
      return h;
    }
    if (tipo === "ritmo") {
      h += "<h3>Ritmo de respuesta</h3><p>Cada barra es el tiempo activo en una pregunta (más alto y más lima = más tiempo). La latencia es el tiempo hasta elegir opción.</p><table>" + ["mini-ipip", "phq-9", "gad-7"].map(function (id) { return ritmoFila(inf, id); }).join("") + "</table>";
      h += '<table class="t"><tr><th>Test</th><th>Tiempo activo</th><th>Por pregunta</th><th>Latencia mediana</th><th>Comentadas</th></tr>' + ["mini-ipip", "phq-9", "gad-7"].map(function (id) {
        var c = inf.calidad[id];
        return "<tr><td>" + NOMBRE_TEST[id] + "</td><td>" + n1(c.tiempo_activo_min) + " min</td><td>" + n0(c.tiempo_activo_min * 60 / Math.max(1, c.respondidos)) + " s</td><td>" + n1(c.latencia_mediana_s) + " s</td><td>" + c.comentados.length + "/" + c.respondidos + "</td></tr>";
      }).join("") + "</table>";
      var rap = [];["mini-ipip", "phq-9", "gad-7"].forEach(function (id) { if (inf.calidad[id].rapidas.length) rap.push(NOMBRE_TEST[id] + " " + inf.calidad[id].rapidas.join(",")); });
      return h + "<p>" + (rap.length ? "Respuestas en menos de 2 s: " + E(rap.join("; ")) + "." : "Ninguna respuesta en menos de 2 s.") + " Sesión: " + n1(inf.totales.duracion_total_min) + " min en total, " + n1(inf.totales.tiempo_activo_min) + " min activos.</p>";
    }
    return "<p>Sin detalle.</p>";
  }

  // ---------- Temporalidad: lo escrito y borrado, recorrido del ánimo, cambios, comentarios ----------
  function palabrasDe(s) { return String(s || "").split(/\s+/).filter(Boolean); }
  function opsDiff(a, b) {
    var A = palabrasDe(a), B = palabrasDe(b), n = A.length, m = B.length, L = [], i, j;
    for (i = 0; i <= n; i++) { L.push([]); for (j = 0; j <= m; j++) L[i].push(0); }
    for (i = n - 1; i >= 0; i--) for (j = m - 1; j >= 0; j--) L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    var out = []; i = 0; j = 0;
    while (i < n && j < m) { if (A[i] === B[j]) { out.push(["=", A[i]]); i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) { out.push(["-", A[i], i === n - 1]); i++; } else out.push(["+", B[j++]]); }
    while (i < n) { out.push(["-", A[i], i === n - 1]); i++; } while (j < m) out.push(["+", B[j++]]);
    return out;
  }
  function sinPunt(w) { return w.toLowerCase().replace(/[.,;:!?¡¿«»"()]/g, ""); }
  // Borrados y sustituciones reales entre dos versiones. Ignora la palabra final que se estaba escribiendo
  // («p» → «procuro») y los cambios de puntuación. Devuelve [{d: "lo borrado", a: "lo que puso en su lugar"}].
  function borradosEntre(a, b) {
    var ops = opsDiff(a, b), res = [], bloque = { d: [], a: [] };
    function cerrar() {
      if (!bloque.d.length) { bloque = { d: [], a: [] }; return; }
      var dels = [], adds = bloque.a.slice();
      bloque.d.forEach(function (x) {
        var w = x.w;
        var igual = adds.filter(function (y) { return sinPunt(y) === sinPunt(w); })[0];
        if (igual) { adds.splice(adds.indexOf(igual), 1); return; }
        if (x.ultima && adds.some(function (y) { return y.indexOf(w) === 0; })) { return; }
        var pref = adds.filter(function (y) { return y.length && w.indexOf(y) === 0; })[0];
        if (pref) { adds.splice(adds.indexOf(pref), 1); var resto = w.slice(pref.length).replace(/^[.,;:\s]+/, ""); if (resto) dels.push(resto); return; }
        if (sinPunt(w)) dels.push(w);
      });
      if (dels.length) res.push({ d: dels.join(" "), a: adds.join(" ") });
      bloque = { d: [], a: [] };
    }
    ops.forEach(function (o) { if (o[0] === "=") cerrar(); else if (o[0] === "-") bloque.d.push({ w: o[1], ultima: o[2] }); else bloque.a.push(o[1]); });
    cerrar();
    return res;
  }
  function historiaComentarios(inf) {
    var out = [];
    ["mini-ipip", "phq-9", "gad-7"].forEach(function (t) {
      (inf.items[t] || []).forEach(function (it) {
        var v = it.comentario_versiones || [];
        if (v.length < 2) return;
        var borr = [], tardio = null;
        for (var k = 1; k < v.length; k++) {
          borradosEntre(v[k - 1].texto, v[k].texto).forEach(function (x) { borr.push(x); });
          var pausa = (new Date(v[k].t) - new Date(v[k - 1].t)) / 1000;
          var nuevas = opsDiff(v[k - 1].texto, v[k].texto).filter(function (o) { return o[0] === "+"; }).map(function (o) { return o[1]; });
          if (pausa >= 10 && nuevas.length >= 5) tardio = { texto: nuevas.join(" "), pausa: pausa };
        }
        if (borr.length || tardio) out.push({ t: t, n: it.n, it: it, borrado: borr, tardio: tardio });
      });
    });
    return out;
  }
  function recorridoAnimo(est) {
    return (est.eventos || []).filter(function (e) { return e.tipo === "contexto_campo" && e.fase === "pre" && e.campo === "animo"; }).map(function (e) { return e.valor; });
  }
  // ---------- Iconos de trazo fino (propios, sin emojis ni librerías: funcionan sin conexión) ----------
  var ICO_P = {
    ojo: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    pulso: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    clip: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v3H9z"/><path d="M9 13.5l2 2 4-4.5"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    historia: '<path d="M3.5 12a8.5 8.5 0 1 0 2.5-6"/><path d="M3 4v4h4"/><path d="M12 8v4l3 2"/>',
    diana: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    capas: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
    tabla: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/>',
    pluma: '<path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"/><path d="M14 7l3 3"/>',
    barras: '<path d="M5 20V11M12 20V5M19 20v-6"/>',
    cambio: '<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
    texto: '<path d="M4 6h16M4 11h16M4 16h10"/>',
    goma: '<path d="M4 20h16"/><path d="M14.5 4.5l5 5-8 8h-5l-2.5-2.5 10.5-10.5z"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    ruta: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h7"/>',
    nota: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>',
    hoja: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    plegar: '<path d="M7 9l5-5 5 5M7 15l5 5 5-5"/>',
    pastilla: '<path d="M10.5 3.5a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7-7z"/><path d="M7 7l7 7"/>'
  };
  function ico(n) { return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + (ICO_P[n] || "") + "</svg>"; }
  // Bloque desplegable: icono, título, una línea de resumen y chevron. En exportación va siempre abierto.
  function bloque(ic, titulo, resumen, contenido, abierto, modo, cls) {
    return '<details class="blk' + (cls ? " " + cls : "") + '"' + (modo === "export" || abierto ? " open" : "") + "><summary>" +
      (ic ? '<span class="bi">' + ico(ic) + "</span>" : "") +
      '<span class="bt"><span class="btt">' + titulo + "</span>" + (resumen ? '<span class="brs">' + resumen + "</span>" : "") + "</span>" +
      '<span class="bch">' + ico("chev") + '</span></summary><div class="bc">' + contenido + "</div></details>";
  }
  // Plausibilidad con la misma lógica: lo que más pesa, más rojo
  var COL_PLAUS = PALETA.plausibilidad;
  function chipSm(txt, color, key, modo) {
    var neutro = !color || NEUTROS[String(color).toUpperCase()];
    var cls = "chip sm" + (neutro ? " ol" : ""), st = neutro ? "" : ' style="background:' + color + ";color:" + tintaDe(color) + '"';
    if (key && modo && modo !== "export") return '<span class="' + cls + ' i"' + st + ' data-hoja="' + E(key) + '" tabindex="0" role="button">' + E(txt) + "</span>";
    return '<span class="' + cls + '"' + st + ">" + E(txt) + "</span>";
  }

  // ---------- Vocabulario de la hoja: sin condescendencia (Juan, 2026-11-25) ----------
  function teoria(s) { return String(s === null || s === undefined ? "" : s).replace(/Mi teor[ií]a(\s*\(autogenerada\))?\s*:\s*/g, "Lo que sugieren los datos: "); }

  // ---------- Temporalidad ----------
  function seccionTiempo(datos, inf, est, modo) {
    var L = est && est.lectura, tl = L && L.temporalidad, partes = [], top = null;
    if (L && L.interpretacion_temporalidad) partes.push(bloque("ojo", "Qué supone la temporalidad para la evaluación", "interpretación autogenerada del conjunto", '<p>' + E(teoria(L.interpretacion_temporalidad)) + "</p>" + '<p class="mu">' + auto() + " a partir de la línea de vida, los cambios y lo que escribió y borró.</p>", true, modo, "sub"));
    if (tl && tl.length) {
      var orden = tl.slice().sort(function (a, b) { return (b.relevancia || 0) - (a.relevancia || 0); });
      top = orden[0];
      var t = '<p class="mu">Ordenado por importancia. La barra es el peso de ese momento en la lectura del caso (de lima, poco, a rojo, mucho).</p><table class="t tl">';
      orden.forEach(function (f) {
        var r = f.relevancia || 0;
        t += '<tr><td style="width:24%"><span class="chip sm ol">' + E(f.cuando) + '</span></td><td style="width:18%">' + barra(r * 100, rampa(r)) +
          '<span class="mu">peso ' + n0(r * 100) + "&nbsp;% · " + (r >= 0.85 ? "clave" : r >= 0.65 ? "alto" : r >= 0.45 ? "medio" : "bajo") + "</span></td><td>" + (f.hechos || []).map(function (h) { return "<div>" + E(h.texto) + (h.cita ? ' <span class="mu">«' + E(h.cita) + "»" + (h.desde ? " · " + E(h.desde) : "") + "</span>" : "") + "</div>"; }).join("") + "</td></tr>";
      });
      partes.push(bloque("historia", "Línea de vida", tl.length + " momentos ordenados por importancia · el más relevante: " + E(top.cuando).toLowerCase(), t + "</table>", true, modo, "sub"));
    }
    // Cuánto escribió: con lo que significa, no solo el gráfico
    var lens = ["mini-ipip", "phq-9", "gad-7"].map(function (t) { return { t: t, l: (inf.items[t] || []).map(function (it) { return (it.comentario || "").length; }) }; }), mx = 1, conCom = 0, total = 0, largos = [];
    lens.forEach(function (x) { x.l.forEach(function (v, i) { total++; if (v) conCom++; if (v > mx) mx = v; if (v) largos.push({ t: x.t, n: i + 1, v: v }); }); });
    largos.sort(function (a, b) { return b.v - a.v; });
    var masLargos = largos.slice(0, 3).map(function (x) { return NOMBRE_TEST[x.t] + " " + x.n + (x.t === "mini-ipip" ? "" : " (" + CORTO[x.t][x.n - 1].toLowerCase() + ")"); });
    var relEsc = L && L.relevancia_escritura ? '<div class="interp"><b>Qué indica</b> ' + auto() + "<p>" + E(L.relevancia_escritura) + "</p></div>" : "";
    partes.push(bloque("texto", "Cuánto escribió en cada pregunta", "comentó " + conCom + " de " + total + (masLargos.length ? " · escribió más en " + E(masLargos.join(", ")) : ""),
      relEsc + '<table style="border-collapse:collapse;margin-top:6px"><tr>' + lens.map(function (x) {
        return '<td style="padding-right:12px" valign="bottom"><table style="border-collapse:collapse"><tr>' + x.l.map(function (v) { return '<td valign="bottom" style="padding:0 1px;height:40px"><div style="width:7px;height:' + Math.max(2, Math.round(v / mx * 36)) + "px;background:" + (v ? her(v / mx) : "#efe9f6") + '"></div></td>'; }).join("") + '</tr></table><div class="mu" style="text-align:center">' + NOMBRE_TEST[x.t] + "</div></td>";
      }).join("") + '</tr></table><p class="mu">En orden de respuesta; más alto y más cálido, más extenso. Es el mismo degradado de la cabecera.</p>', false, modo, "sub"));
    var hc = historiaComentarios(inf);
    if (hc.length) {
      var tb = '<table class="t">';
      hc.forEach(function (h) {
        tb += "<tr><td style=\"width:24%\">" + NOMBRE_TEST[h.t] + " · " + (h.t === "mini-ipip" ? "ítem " + h.n : E(CORTO[h.t][h.n - 1])) + "</td><td>" +
          h.borrado.map(function (b) { return '<span class="borr">' + E(b.d) + "</span>" + (b.a ? ' → <span class="anad">' + E(b.a) + "</span>" : ""); }).join(" · ") +
          (h.tardio ? ' <span class="anad">+ ' + E(h.tardio.texto) + '</span> <span class="mu">tras ' + n0(h.tardio.pausa) + " s</span>" : "") +
          '<div class="mu">Final: «' + E(h.it.comentario) + "»</div></td></tr>";
      });
      var nb = hc.filter(function (h) { return h.borrado.length; }).length;
      partes.push(bloque("goma", "Lo que escribió y borró", nb + " comentarios con algo borrado o sustituido · " + hc.filter(function (h) { return h.tardio; }).length + " ampliados tras una pausa", tb + '</table><p class="mu">Cada borrado es una decisión de no decirlo así.</p>', false, modo, "sub"));
    }
    var res = (top ? "Más relevante: " + E(top.cuando).toLowerCase() : "") + (hc.length ? (top ? " · " : "") + hc.length + " comentarios reescritos o ampliados" : "");
    return bloque("reloj", "Relevancias a lo largo del tiempo", res, partes.join(""), false, modo);
  }

  // ---------- Respuestas cambiadas: arriba y con su interpretación delante ----------
  function seccionCambios(inf, est, modo) {
    var L = est && est.lectura, cambios = [];
    ["mini-ipip", "phq-9", "gad-7"].forEach(function (t) { (inf.items[t] || []).forEach(function (it) { if (it.secuencia && it.secuencia.length > 1) cambios.push({ t: t, it: it }); }); });
    if (!cambios.length) return "";
    var etq = function (t, v) { if (t === "mini-ipip") return String(v); return v + " " + (ETQ[v] || "").toLowerCase(); };
    var tabla = '<table class="t"><tr><th>Pregunta</th><th style="width:30%">Recorrido</th><th style="width:22%">Se quedó en</th></tr>' + cambios.map(function (c) {
      return "<tr><td><b>" + NOMBRE_TEST[c.t] + " " + c.it.n + "</b> · " + (c.t === "mini-ipip" ? E(c.it.texto) : E(CORTO[c.t][c.it.n - 1])) + (c.it.comentario ? '<span class="cmt">«' + E(c.it.comentario) + "»</span>" : "") +
        "</td><td>" + c.it.secuencia.map(function (v) { return E(etq(c.t, v)); }).join(" → ") + "</td><td>" + palabra(c.t, c.it) + "</td></tr>";
    }).join("") + "</table>";
    var interp = L && L.interpretacion_cambios ? '<div class="interp" style="margin-top:0"><b>Qué sugieren los cambios</b> ' + auto() + "<p>" + E(teoria(L.interpretacion_cambios)) + "</p></div>" : "";
    var nueve = cambios.some(function (c) { return c.t === "phq-9" && c.it.n === 9; });
    return bloque("cambio", "Respuestas cambiadas", cambios.length + " cambios" + (nueve ? " · incluye el ítem 9" : "") + " · " + cambios.map(function (c) { return NOMBRE_TEST[c.t] + " " + c.it.n; }).join(", "), interp + tabla, true, modo, "cambios");
  }

  // ---------- Hipótesis ----------
  function seccionHipotesis(est, modo) {
    var H = est && est.lectura && est.lectura.hipotesis;
    if (!H || !H.length) return "";
    var subs = H.map(function (h) {
      var c = (h.base ? "<p>" + E(teoria(h.base)) + "</p>" : "") + detalleHip(h) + (h.siguiente ? '<p class="sig"><b>Siguiente paso:</b> ' + E(h.siguiente) + "</p>" : "");
      return bloque(null, E(teoria(h.nombre)) + ' <span class="cod">' + E(h.codigo || "") + "</span>", chipSm(h.plausibilidad, COL_PLAUS[h.plausibilidad]) + " " + (h.a_favor || []).length + " a favor · " + (h.en_contra || []).length + " en contra", c, false, modo, "sub");
    }).join("");
    var res = H.map(function (h, i) { return chipSm(teoria(h.nombre).replace(/^Trastorno (de |por )?/i, "").replace(/^\w/, function (x) { return x.toUpperCase(); }), COL_PLAUS[h.plausibilidad], "hip:" + i, modo); }).join("");
    return bloque("clip", "Hipótesis de evaluación plausibles", res, '<p class="mu">Para el profesional: datos a favor y en contra, plausibilidad y siguiente paso. Las confirma la entrevista clínica.</p>' + subs, true, modo, "hipo");
  }
  // Cada síntoma del paciente con sus posibles causas (fármaco, sustancia, cuadro, hábito), mecanismo y grado
  var COL_GRADO = PALETA.grado;
  function sintomasCausas(L) {
    var S = L && L.sintomas_farmacos, T = L && L.terminos;
    if (!S || !S.length) return "";
    var h = '<div class="sec-t">Síntomas del paciente y posibles causas ' + auto() + "</div>" +
      (L.nota_hora ? '<p class="mu">' + E(L.nota_hora) + "</p>" : "") +
      S.map(function (s) {
        return '<div class="sint"><div class="sint-h"><b>' + E(s.sintoma) + "</b></div>" + (s.dato ? '<div class="mu">«' + E(s.dato) + "»" + (s.desde ? " · " + E(s.desde) : "") + "</div>" : "") +
          '<table class="t"><tr><th style="width:24%">Posible causa</th><th>Por qué podría explicarlo</th><th style="width:15%">Grado</th></tr>' +
          (s.causas || []).map(function (c) {
            var col = COL_GRADO[c.grado] || "#E4D9FF";
            return "<tr><td><b>" + E(c.causa) + '</b><br><span class="mu">' + E(c.tipo || "") + "</span></td><td>" + E(c.mecanismo) + '</td><td><span class="chip sm" style="background:' + col + ";color:" + tintaDe(col) + '">' + E(c.grado) + "</span></td></tr>";
          }).join("") + "</table>" +
          (s.lectura ? '<div class="interp"><b>Lectura</b><p>' + E(s.lectura) + "</p></div>" : "") + "</div>";
      }).join("");
    if (T && T.length) h += '<div class="sec-t">Qué es cada término</div><dl class="glos">' + T.map(function (t) { return "<dt>" + E(t.termino) + "</dt><dd>" + E(t.definicion) + "</dd>"; }).join("") + "</dl>";
    return h;
  }
  // Fármacos, sustancias y sueño: bloque propio, resaltado y arriba (Juan, 2026-11-25)
  function seccionFarmacos(L, modo) {
    var F = L && L.farmacos;
    if (!F || !F.length) return "";
    var lista = function (t, a) { return a && a.length ? '<div class="farm-l"><b>' + t + "</b><ul>" + a.map(function (x) { return "<li>" + E(x) + "</li>"; }).join("") + "</ul></div>" : ""; };
    var c = '<p class="mu">Qué hace cada sustancia declarada y qué síntomas de esta hoja podría explicar o modular, como posibilidad. Contrastar con la ficha técnica y con su psiquiatra.</p>' +
      F.map(function (f) {
        return '<div class="farm"><div class="farm-h"><b>' + E(f.nombre) + '</b> <span class="mu">' + E(f.que_es) + "</span></div>" + (f.dosis ? '<div class="farm-d">Dosis declarada: ' + E(f.dosis) + "</div>" : "") +
          (f.hace ? "<p>" + E(f.hace) + "</p>" : "") + lista("Podría explicar o modular en esta hoja", f.puede_explicar) + lista("Interacciones a vigilar", f.interacciones) + "</div>";
      }).join("") +
      (L.sueno_interacciones ? '<div class="interp"><b>Sueño: cómo encaja todo</b> ' + auto() + "<p>" + E(L.sueno_interacciones) + "</p></div>" : "") +
      sintomasCausas(L) +
      '<div class="ref"><b>Referencia</b><div>Fichas técnicas de cada principio activo (CIMA, AEMPS; EMA; FDA). Información general, no ajustada a la persona.</div></div>';
    var expl = F.map(function (f) { return (f.puede_explicar && f.puede_explicar.length ? f.puede_explicar.length : 0); }).reduce(function (a, b) { return a + b; }, 0);
    return bloque("pastilla", "Fármacos, sustancias y sueño: lo que puede derivarse de ellos", F.map(function (f) { return E(f.nombre); }).join(" · ") + (expl ? " · " + expl + " efectos posibles en esta hoja" : ""), c, true, modo, "farmacos");
  }
  function detalleHip(h) {
    return '<table class="t"><tr><th style="width:50%">A favor</th><th>En contra o dudoso</th></tr><tr><td>' + (h.a_favor || []).map(function (x) { return '<div class="lec v">' + E(x) + "</div>"; }).join("") +
      "</td><td>" + (h.en_contra || []).map(function (x) { return '<div class="lec r">' + E(x) + "</div>"; }).join("") + "</td></tr></table>";
  }
  function auto() { return '<span class="auto">autogenerado</span>'; }
  // Próximos pasos: primero la opinión sobre el enfoque (desarrollada), después los tests por orden de importancia
  var PRIORIDAD = { "alta": 0, "media": 1, "baja": 2 };
  function seccionPasos(est, modo) {
    var L = est && est.lectura;
    if (!L || (!L.tests_sugeridos && !L.enfoque)) return "";
    var sol = (est && est.tests_solicitados) || [], h = "";
    if (L.enfoque) {
      h += '<div class="enf-c"><div class="ct2">Opinión sobre el enfoque ' + auto() + "</div>" +
        (L.enfoque.desarrollo ? '<p class="enf-d">' + E(teoria(L.enfoque.desarrollo)) + "</p>" : "") +
        (L.enfoque.puntos && L.enfoque.puntos.length ? '<ol class="enf">' + L.enfoque.puntos.map(function (x) { return "<li>" + E(x) + "</li>"; }).join("") + "</ol>" : "") +
        '<p class="mu">' + E(L.enfoque.nota || "El enfoque final lo decide el profesional.") + "</p></div>";
    }
    var T = (L.tests_sugeridos || []).slice().sort(function (a, b) {
      var pa = PRIORIDAD.hasOwnProperty(a.prioridad) ? PRIORIDAD[a.prioridad] : 1, pb = PRIORIDAD.hasOwnProperty(b.prioridad) ? PRIORIDAD[b.prioridad] : 1;
      return pa - pb;
    });
    var colP = { "alta": COL_PLAUS["alta"], "media": COL_PLAUS["media"], "baja": COL_PLAUS["a descartar"] };
    if (T.length) h += '<div class="ct2" style="margin-top:8px">Tests recomendados, por orden de importancia</div><table class="t">' + T.map(function (t, i) {
      var pedido = sol.indexOf(t.id) >= 0;
      var accion = modo === "web" ? '<button type="button" class="pt-b' + (pedido ? " on" : "") + '" data-a="solicitar_test" data-c="' + E(t.id) + '">' + (pedido ? "Añadido" : "Añadir a la ficha") + "</button>" : "";
      return '<tr><td style="width:20px;font-weight:700">' + (i + 1) + "</td><td><b>" + E(t.nombre) + '</b> <span class="mu">' + E(t.duracion || "") + (t.para ? " · para " + E(t.para) : "") + "</span><div>" + E(t.por_que) + '</div></td><td style="width:1%;white-space:nowrap;text-align:right">' + chipSm(t.prioridad || "sugerido", colP[t.prioridad] || "#E4D9FF") + accion + "</td></tr>";
    }).join("") + "</table>";
    var res = (L.enfoque ? "opinión sobre el enfoque" : "") + (T.length ? (L.enfoque ? " · " : "") + T.length + " tests: " + T.map(function (t) { return E(t.nombre); }).join(" · ") : "");
    return bloque("flecha", "Próximos pasos: enfoque y tests", res, h, true, modo, "pasos");
  }

  // ---------- Hoja: capas de lo general a lo particular ----------
  function render(datos, inf, est, modo) {
    modo = modo || "web";
    fijarLectura(est);
    var pq = inf.tests["phq-9"], gd = inf.tests["gad-7"], P = pq.puntuacion.subescalas.total, G = gd.puntuacion.subescalas.total;
    var tP = tdefDe(datos, "phq-9"), tG = tdefDe(datos, "gad-7"), fs = focos(inf), picos = fs.filter(function (f) { return f.pct >= 55; });
    var o = [];
    o.push('<div class="hoja">');
    var fch = new Date(inf.generado), fechaCorta = ("0" + fch.getDate()).slice(-2) + "/" + ("0" + (fch.getMonth() + 1)).slice(-2) + "/" + String(fch.getFullYear()).slice(-2);
    o.push('<div class="hh" style="' + degradadoHer(inf) + '">' + (modo !== "export" ? '<button type="button" class="hb" data-hoja-movil="1">Vista móvil</button>' : "") + "<h1>Ficha de " + E(inf.participante || "sin código") + "</h1><p>" + fechaCorta + " · " + n0(inf.totales.duracion_total_min) + " min</p></div>");
    if (modo !== "export") o.push('<button type="button" class="flot" data-hoja-plegar="1">' + ico("plegar") + "<span>Plegar todo</span></button>");

    // De un vistazo: puntuaciones, lectura del caso, conclusiones, fortalezas, por dónde empezar y qué recordar
    var Lr = est && est.lectura;
    var af = 0, cs = 0;
    [1, 2, 6].forEach(function (n) { var it = item(inf, "phq-9", n); if (it && it.respuesta !== null) af += it.puntuado; });
    [3, 4, 5, 7, 8].forEach(function (n) { var it = item(inf, "phq-9", n); if (it && it.respuesta !== null) cs += it.puntuado; });
    var frase = "";
    if (P.calculable && G.calculable) {
      frase = "<b>Ansiedad " + E(G.rango.toLowerCase()) + "</b> (GAD-7 " + G.puntuacion + "/" + G.max + ") y <b>ánimo " + E(masc(P.rango)) + "</b> (PHQ-9 " + P.puntuacion + "/" + P.max + ").";
      if (picos.length) frase += " Picos: " + picos.slice(0, 3).map(function (f) { return "<b>" + E(f.nombre.toLowerCase()) + "</b>"; }).join(" · ") + ".";
      if (af / 9 + 0.15 < cs / 15) frase += " En el PHQ-9 pesa lo cognitivo y corporal (" + cs + "/15) más que el núcleo afectivo (" + af + "/9).";
    } else frase = "Faltan respuestas para calcular alguna puntuación.";
    var rs = ["E", "A", "C", "N", "I"].map(function (k) { var s = inf.tests["mini-ipip"].puntuacion.subescalas[k]; return s.calculable ? { k: k, nombre: s.nombre, p: s.pomp } : null; }).filter(Boolean);
    var ext = rs.filter(function (r) { return Math.abs(r.p - 50) >= 25; }).sort(function (a, b) { return Math.abs(b.p - 50) - Math.abs(a.p - 50); });
    if (ext.length) frase += " Personalidad: " + ext.slice(0, 3).map(function (r) { return E(r.nombre.toLowerCase()) + " " + nivelRasgo(r.p, r.k); }).join(" · ") + ".";
    // Ánimo antes de empezar: ya no es sección; queda como indicador junto a las puntuaciones
    var pre = (inf.contexto && inf.contexto.pre) || {}, post = (inf.contexto && inf.contexto.post) || {}, ra = recorridoAnimo(est);
    var hayAnimo = pre.animo !== undefined && pre.animo !== null && pre.animo !== "";
    var indAnimo = hayAnimo ? '<div class="ind-an"><span class="mu">Ánimo al empezar</span> <b>' + E(pre.animo) + "</b>/10" + (ra.length > 1 ? miniAnimo(ra) + '<span class="mu">movió el control ' + ra.length + " veces</span>" : "") +
      (post.animo !== undefined && post.animo !== null && post.animo !== "" ? ' <span class="mu">· al terminar</span> <b>' + E(post.animo) + "</b>/10" : "") + "</div>" : "";
    var ch = [];
    // Con convocatorias parciales (IASC) puede faltar un test: su chip no se pinta en vez de mostrar «undefined».
    if (G.rango) ch.push(chipDe("Ansiedad · " + G.rango + " " + G.puntuacion, rampaChip(idxRango(tG, G.rango) / (tG.rangos.length - 1)), "test:gad-7", modo));
    if (P.rango) ch.push(chipDe("Ánimo · " + masc(P.rango, true) + " " + P.puntuacion, rampaChip(idxRango(tP, P.rango) / (tP.rangos.length - 1)), "test:phq-9", modo));
    ext.slice(0, 3).forEach(function (r) { ch.push(chipDe(r.nombre + " " + nivelRasgo(r.p, r.k), lavandaChip(r.p / 100), "rasgo:" + r.k, modo)); });
    var rz = riesgoTraza(inf, est);
    if (rz && rz.inicial > 0) ch.push(chipDe("Ítem 9: " + ETQ[rz.inicial] + " → " + ETQ[rz.final], null, "riesgo", modo, "alerta"));
    var dec = declarado(inf);
    if (dec.length) ch.push(chipDe("Contexto declarado · " + dec.length, "#E4D9FF", "contexto", modo));
    ch.push(chipDe("Ritmo", "#E4D9FF", "ritmo", modo));
    var cajas = ['<div class="caja ancha retrato">' + frase + indAnimo + '<div class="chips">' + ch.join("") + "</div></div>"];
    if (Lr && Lr.relato) cajas.push('<div class="caja ancha relato"><div class="ct2">Lectura del caso</div>' + E(teoria(Lr.relato)) + "</div>");
    var V = Lr && (Lr.conclusiones || Lr.valor_anadido);
    if (V && V.length) cajas.push('<div class="caja"><div class="ct2">Conclusiones del contexto ' + auto() + "</div><ul>" + V.map(function (x) { return "<li>" + E(teoria(x)) + "</li>"; }).join("") + "</ul></div>");
    var Fz = Lr && Lr.fortalezas;
    if (Fz && Fz.length) cajas.push('<div class="caja fort"><div class="ct2">Fortalezas para afrontar sus problemas</div><ul>' + Fz.map(function (f) { return "<li><b>" + E(f.fortaleza) + ".</b> " + E(f.texto || "") + (f.cita ? ' <span class="mu">«' + E(f.cita) + "»" + (f.desde ? " · " + E(f.desde) : "") + "</span>" : "") + "</li>"; }).join("") + "</ul></div>");
    var emp = '<ol class="mini">' + fs.slice(0, 4).map(function (f) { var c = rampaChip(f.pct / 100); return '<li><span class="fn" style="background:' + c + ";color:" + tintaDe(c) + '">' + etiquetaPeso(f.pct) + "</span> " + chipDe(f.nombre + " · " + n0(f.pct) + " %", null, "foco:" + f.id, modo) + "</li>"; }).join("") + "</ol>";
    cajas.push('<div class="caja"><div class="ct2">Por dónde empezar</div>' + emp + '<p class="mu">Por peso en las respuestas, no por gravedad clínica.</p></div>');
    if (Lr && Lr.recordar && Lr.recordar.length) cajas.push('<div class="caja"><div class="ct2">Para recordar</div><ul>' + Lr.recordar.map(function (r) { return "<li><b>" + E(r.tema) + ".</b> " + E(r.texto) + "</li>"; }).join("") + "</ul></div>");
    var vistazo = '<div class="vz2">' + cajas.join("") + "</div>" + (modo !== "export" ? '<p class="mu">Pulsa una burbuja para ver su explicación, sus datos y su referencia.</p>' : "");

    // Orden (Juan, 2026-11-25): hipótesis, fármacos y sustancias, vistazo, próximos pasos, cambios, tiempo, cuestionarios, todos los datos
    o.push(seccionHipotesis(est, modo));
    o.push(seccionFarmacos(Lr, modo));
    var pulso = [G.rango ? "Ansiedad " + E(G.rango.toLowerCase()) + " " + G.puntuacion : "", P.rango ? "ánimo " + E(masc(P.rango)) + " " + P.puntuacion : ""].filter(Boolean).join(" · ") || "Sin GAD-7 ni PHQ-9 en esta convocatoria";
    o.push(bloque("pulso", "De un vistazo", pulso + (hayAnimo ? " · al empezar " + E(pre.animo) + "/10" : "") + (Fz && Fz.length ? " · " + Fz.length + " fortalezas" : ""), vistazo, true, modo, "vistazo"));
    o.push(seccionPasos(est, modo));
    o.push(seccionCambios(inf, est, modo));
    o.push(seccionTiempo(datos, inf, est, modo));

    // Resultado por cuestionario: por orden de relevancia, con su marco temporal a la vista y lo que muestra en esta persona
    var ipS = inf.tests["mini-ipip"].puntuacion.subescalas, enCaso = (Lr && Lr.en_este_caso) || {};
    var resIp = ["E", "A", "C", "N", "I"].filter(function (k) { return ipS[k].calculable; }).sort(function (a, b) { return ipS[b].pomp - ipS[a].pomp; }).map(function (k) { return E(ipS[k].nombre) + " " + ipS[k].puntuacion; }).join(" · ");
    var queMuestra = function (id) { return enCaso[id] ? '<div class="interp" style="margin-top:0"><b>Qué muestra en esta persona</b> ' + auto() + "<p>" + E(enCaso[id]) + "</p></div>" : ""; };
    var porTest = {};
    porTest["mini-ipip"] = { rel: rs.length ? Math.max.apply(null, rs.map(function (r) { return Math.abs(r.p - 50) / 50; })) * 0.6 : 0, html: bloque(null, 'Mini-IPIP <span class="chip sm ol">rasgo · cómo es en general</span>', resIp,
      queMuestra("mini-ipip") + pesoRasgos(inf, modo) + tiraItems(inf, "mini-ipip", modo) + '<details class="ex"' + (modo === "export" ? " open" : "") + '><summary>Qué mide el Mini-IPIP</summary><div class="exb">' + EXPLICA["mini-ipip"] + "</div></details>", false, modo, "sub") };
    [["phq-9", tP, P, pq], ["gad-7", tG, G, gd]].forEach(function (a) {
      var id = a[0], tdef = a[1], s = a[2], t = a[3], altos = (inf.items[id] || []).filter(function (it) { return it.respuesta === 3; }).map(function (it) { return CORTO[id][it.n - 1]; });
      var rel = idxRango(tdef, s.rango) / (tdef.rangos.length - 1);
      var cont = queMuestra(id) + medidor(tdef, s) + "<p>" + (altos.length ? "En <b>«casi cada día»</b>: " + E(lista(altos).toLowerCase()) + "." : "Nada en «casi cada día».") + "</p>" + tiraItems(inf, id, modo) +
        '<details class="ex"' + (modo === "export" ? " open" : "") + "><summary>Qué mide el " + NOMBRE_TEST[id] + '</summary><div class="exb">' + EXPLICA[id] + "</div></details>";
      porTest[id] = { rel: rel, html: bloque(null, NOMBRE_TEST[id] + ' <span class="chip sm ol">' + E(t.marco) + "</span>", chipSm(s.puntuacion + "/" + s.max + " · " + s.rango, rampaChip(rel)) + (altos.length ? " casi cada día: " + E(lista(altos).toLowerCase()) : ""), cont, false, modo, "sub") };
    });
    // Convocatoria parcial de IASC: los test que no se pidieron no aparecen (no son «sin responder»)
    var CONV = est && est.convocatoria && est.convocatoria.tests;
    if (CONV) Object.keys(porTest).forEach(function (id) { if (CONV.indexOf(id) < 0) delete porTest[id]; });
    var ordenT = (Lr && Lr.orden_tests && Lr.orden_tests.length ? Lr.orden_tests.slice() : Object.keys(porTest).sort(function (a, b) { return porTest[b].rel - porTest[a].rel; })).filter(function (id) { return porTest[id]; });
    Object.keys(porTest).forEach(function (id) { if (ordenT.indexOf(id) < 0) ordenT.push(id); });
    var alcance = Lr && Lr.alcance_malestar ? '<div class="interp" style="margin-top:0"><b>Del día a día o de fondo</b> ' + auto() + "<p>" + E(Lr.alcance_malestar) + "</p></div>" : "";
    o.push(bloque("capas", "Resultado por cuestionario", ordenT.map(function (id) { return id === "mini-ipip" ? "Mini-IPIP (rasgo)" : id === "phq-9" ? "PHQ-9 " + P.puntuacion + "/" + P.max : "GAD-7 " + G.puntuacion + "/" + G.max; }).join(" · ") + " · por relevancia", alcance + ordenT.map(function (id) { return porTest[id].html; }).join(""), false, modo));

    // Todos los datos: todo lo recogido, en una tabla y persianas con referencias (incluye el formato ordinario)
    var nCom = 0, nLec = 0;
    ["mini-ipip", "phq-9", "gad-7"].forEach(function (t) { (inf.items[t] || []).forEach(function (it) { if (it.comentario) nCom++; if (lec(t, it.n)) nLec++; }); });
    o.push(bloque("tabla", "Todos los datos", TOTAL_ITEMS_H(inf) + " preguntas · " + nCom + " comentarios · " + nLec + " lecturas · ficha previa y final · ritmo · formato ordinario · referencias", todosLosDatos(datos, inf, est, modo), false, modo));

    // Última palabra
    o.push(bloque("pluma", "Última palabra: el profesional", (est && est.nota_profesional) ? "valoración escrita" : "pendiente de valorar", notaProfesional(est, modo), true, modo, "prof"));

    o.push('<div class="pie">Cribado de un momento, no un diagnóstico ni sustituye a un profesional. Pesa lo que va tras el «pero». El historial completo queda en el registro.</div>');

    if (modo === "export") {
      // En Word y PDF no hay ventanas: las explicaciones de las burbujas van como anexo
      var claves = ["test:gad-7", "test:phq-9", "test:mini-ipip"].concat(fs.slice(0, 4).map(function (f) { return "foco:" + f.id; }), (rz && rz.inicial > 0) ? ["riesgo"] : [], dec.length ? ["contexto"] : [], ["ritmo"]);
      o.push(bloque("clip", "Anexo: explicación de cada burbuja", "", claves.map(function (k) { return '<div class="card"><div class="cb">' + detalle(k, datos, inf, est) + "</div></div>"; }).join(""), false, modo));
    }
    o.push("</div>");
    return o.join("");
  }
  function soloTests(datos, inf, est) {
    var CONV = est && est.convocatoria && est.convocatoria.tests;
    return ["mini-ipip", "phq-9", "gad-7"].filter(function (id) { return !CONV || CONV.indexOf(id) >= 0; }).map(function (id) {
      var t = inf.tests[id], tdef = tdefDe(datos, id), sub = t.puntuacion.subescalas;
      var filas = (inf.items[id] || []).map(function (it) { return '<tr><td class="num">' + it.n + "</td><td>" + E(it.texto) + (it.inverso ? ' <span class="mu">(inv.)</span>' : "") + '</td><td class="num">' + (it.respuesta === null ? "—" : it.respuesta) + '</td><td>' + (it.respuesta === null ? "sin responder" : E(it.etiqueta)) + "</td>" + (id === "mini-ipip" ? '<td class="num">' + (it.respuesta === null ? "—" : it.puntuado) + "</td>" : "") + "</tr>"; }).join("");
      var pie = Object.keys(sub).map(function (k) { var s = sub[k]; return "<b>" + E(s.nombre) + ":</b> " + (s.calculable ? s.puntuacion + " (" + s.min + "–" + s.max + ")" + (s.rango ? " · " + E(s.rango) : "") + (s.cortes && s.cortes.length ? " · corte ≥ " + s.cortes[0].valor + ": " + (s.cortes[0].supera ? "por encima" : "por debajo") : "") : "no calculable"); }).join(" &nbsp;·&nbsp; ");
      return '<div class="ord"><div class="ord-h">' + E(tdef.titulo || NOMBRE_TEST[id]) + ' <span class="mu">' + E(t.marco) + '</span></div><table class="t"><tr><th>#</th><th>Ítem</th><th>Valor</th><th>Respuesta</th>' + (id === "mini-ipip" ? "<th>Puntúa</th>" : "") + "</tr>" + filas + '</table><p class="ord-p">' + pie + '</p><p class="mu">' + E(fuenteTest(datos, id)) + "</p></div>";
    }).join("");
  }
  function TOTAL_ITEMS_H(inf) { var n = 0; ["mini-ipip", "phq-9", "gad-7"].forEach(function (t) { n += (inf.items[t] || []).length; }); return n; }

  function documento(datos, inf, est, modo) {
    return '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>Ficha de ' + E(inf.participante || "sin código") + '</title><style>body{margin:12px}' + CSS + "</style></head><body>" + render(datos, inf, est, modo || "export") + "</body></html>";
  }
  function resumenTexto(datos, inf) {
    var pq = inf.tests["phq-9"].puntuacion.subescalas.total, gd = inf.tests["gad-7"].puntuacion.subescalas.total;
    var rs = ["E", "A", "C", "N", "I"].map(function (k) { var s = inf.tests["mini-ipip"].puntuacion.subescalas[k]; return s.calculable ? k + " " + n0(s.pomp) + "%" : k + " n/c"; }).join(" · ");
    var fs = focos(inf).filter(function (f) { return f.pct >= 55; }).slice(0, 3).map(function (f) { return f.nombre.toLowerCase(); });
    return "Ficha de " + (inf.participante || "sin código") + " · " + new Date(inf.generado).toLocaleDateString("es-ES") + "\nPHQ-9: " + pq.puntuacion + "/" + pq.max + " (" + pq.rango + ")\nGAD-7: " + gd.puntuacion + "/" + gd.max + " (" + gd.rango + ")\nMini-IPIP: " + rs + (fs.length ? "\nPicos: " + fs.join(", ") : "") + "\nCribado de un momento, no un diagnóstico.";
  }

  // ---------- Ventanas ----------
  var getCtx = null, dlg = null;
  function abrir(key) {
    if (!getCtx || !dlg) return;
    var c = getCtx();
    dlg.querySelector(".cuerpo").innerHTML = detalle(key, c.datos, c.inf, c.est);
    if (typeof dlg.showModal === "function") { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute("open", "");
    dlg.scrollTop = 0;
  }
  function init(fn) {
    getCtx = fn;
    if (!document.getElementById("hoja-css")) { var st = document.createElement("style"); st.id = "hoja-css"; st.textContent = CSS; document.head.appendChild(st); }
    if (!document.getElementById("hoja-dlg")) {
      dlg = document.createElement("dialog"); dlg.id = "hoja-dlg";
      dlg.innerHTML = '<div class="hoja pop"><button class="x" type="button" data-hoja-cerrar="1">Cerrar ✕</button><div class="cuerpo"></div></div>';
      document.body.appendChild(dlg);
    } else dlg = document.getElementById("hoja-dlg");
    document.addEventListener("click", function (e) {
      var cerrar = e.target.closest && e.target.closest("[data-hoja-cerrar]");
      if (cerrar) { dlg.close(); return; }
      if (e.target === dlg) { dlg.close(); return; }
      var pl = e.target.closest && e.target.closest("[data-hoja-plegar]");
      if (pl) {
        var hj2 = pl.closest(".hoja"), ds = [].slice.call(hj2.querySelectorAll("details")), alguno = ds.some(function (d) { return d.open; });
        if (alguno) ds.forEach(function (d) { d.open = false; }); else hj2.querySelectorAll(":scope > details.blk").forEach(function (d) { d.open = true; });
        pl.querySelector("span").textContent = alguno ? "Desplegar" : "Plegar todo";
        return;
      }
      var mv = e.target.closest && e.target.closest("[data-hoja-movil]");
      if (mv) { var hj = mv.closest(".hoja"); var on = hj.classList.toggle("movil"); mv.textContent = on ? "Vista completa" : "Vista móvil"; return; }
      var t = e.target.closest && e.target.closest("[data-hoja]");
      if (t) { if (t.closest("summary")) e.preventDefault(); abrir(t.getAttribute("data-hoja")); }
    });
    document.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && e.target.getAttribute && e.target.getAttribute("data-hoja")) { e.preventDefault(); abrir(e.target.getAttribute("data-hoja")); }
    });
  }
  return { init: init, render: render, documento: documento, resumenTexto: resumenTexto, detalle: detalle, rampa: rampa };
})();

