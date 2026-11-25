// IASC · herramienta del profesional (whiteboard «App psicólogo — mapa»).
// Login → Buzón (fichas recibidas, aviso al terminar un test) · Pacientes · Tests (convocatorias y enlaces con QR) · Info · Licencias.
// Los datos viven en Supabase (UE) con RLS: cada profesional solo ve lo suyo. La ficha se pinta con el mismo motor del test.
(function () {
  "use strict";
  var cfg = window.IASC_CONFIG;
  var raiz = document.getElementById("iasc");
  if (!cfg || !window.supabase) { raiz.innerHTML = '<div class="login"><h1>IASC</h1><p class="ko">Falta la configuración de Supabase (app/config.local.json).</p></div>'; return; }
  var sb = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, { auth: { persistSession: true, storageKey: "iasc-profesional" } });

  // Test disponibles hoy en el motor (los del piloto). El resto de la batería del whiteboard está en preparación.
  var DATOS = window.IASC_DATOS;
  var DISPONIBLES = DATOS.tests.map(function (t) { return { id: t.id, nombre: t.nombre, items: t.items.length }; });
  var EN_PREPARACION = ["CORE-10", "ASRS-v1.1", "7 Up 7 Down", "HCL-32", "PCL-5"];
  var TIPOS = {
    inicial: { nombre: "Valoración inicial", tests: ["mini-ipip", "phq-9", "gad-7"], texto: "Mini-IPIP + PHQ-9 + GAD-7 · unos 8 minutos" },
    completa: { nombre: "Batería completa", tests: DISPONIBLES.map(function (t) { return t.id; }), texto: "Todos los test disponibles. Los 5 restantes del whiteboard (" + EN_PREPARACION.join(", ") + ") están en preparación." },
    sueltos: { nombre: "Test sueltos", tests: null, texto: "Eliges cuáles, p. ej. tras leer una ficha" }
  };

  var S = { usuario: null, nombre: "", vista: "buzon", pacientes: [], convocatorias: [], envios: [], sel: null, msg: "", ultimoEnvio: 0, filtro: "", orden: "reciente", nuevoEnlace: null };

  // ---------- utilidades ----------
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function fecha(t) { if (!t) return "—"; var d = new Date(t); return d.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Madrid" }) + " " + d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" }); }
  function sha256Hex(s) { return crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)).then(function (d) { return Array.prototype.map.call(new Uint8Array(d), function (x) { return ("0" + x.toString(16)).slice(-2); }).join(""); }); }
  function token() { var a = crypto.getRandomValues(new Uint8Array(16)); return Array.prototype.map.call(a, function (x) { return ("0" + x.toString(16)).slice(-2); }).join(""); }
  function urlTest(tok) { return new URL("../test/?t=" + tok, location.href).href; }
  function estadoConv(c) { return c.revocada ? "revocada" : c.usada ? "usada" : new Date(c.caduca) < new Date() ? "caducada" : "abierta"; }
  function nombreTest(id) { var t = DISPONIBLES.filter(function (x) { return x.id === id; })[0]; return t ? t.nombre : id; }
  function paciente(id) { return S.pacientes.filter(function (p) { return p.id === id; })[0]; }
  function toast(t) { var d = document.createElement("div"); d.className = "toast"; d.textContent = t; document.body.appendChild(d); setTimeout(function () { d.remove(); }, 5000); }
  function qrSvg(texto) { var q = qrcode(0, "M"); q.addData(texto); q.make(); return q.createSvgTag({ cellSize: 4, margin: 2, scalable: true }); }
  function registroDe(e) { try { return JSON.parse(e.registro); } catch (x) { return null; } }
  function descargar(nombre, contenido, tipo) { var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([contenido], { type: tipo })); a.download = nombre; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000); }
  function nombreArchivo(e, ext) { return (e.participante || "sin-seudonimo").replace(/[^A-Za-z0-9_-]/g, "") + "_test_" + new Date(e.recibido).toISOString().slice(0, 16).replace(/[-:]/g, "").replace("T", "_") + "." + ext; }

  // ---------- sesión ----------
  function entrar(usuario, clave) {
    var email = usuario.indexOf("@") >= 0 ? usuario : usuario.trim().toLowerCase() + "@iasc.local";
    return sb.auth.signInWithPassword({ email: email, password: "iasc:" + clave });   // Supabase pide 6+ caracteres: ver esquema-iasc.sql
  }
  function arrancar() {
    sb.auth.getSession().then(function (r) {
      var ses = r.data && r.data.session;
      if (!ses) return pintarLogin();
      S.usuario = ses.user;
      return sb.from("profesionales").select("nombre").eq("usuario", ses.user.id).maybeSingle().then(function (p) {
        if (!p.data) { sb.auth.signOut(); return pintarLogin("Esta cuenta no es de un profesional de IASC."); }
        S.nombre = p.data.nombre; return cargar().then(function () { pintar(); vigilar(); });
      });
    });
  }

  function pintarLogin(error) {
    raiz.innerHTML = '<form class="login" id="f-login" autocomplete="on"><h1>IASC</h1><p class="sub">Herramienta del profesional</p>' +
      '<label><span>Usuario</span><input id="l-usuario" name="username" autocomplete="username" required></label>' +
      '<label><span>Contraseña</span><input id="l-clave" name="password" type="password" autocomplete="current-password" required></label>' +
      (error ? '<p class="ko">' + esc(error) + "</p>" : "") +
      '<button class="pri" type="submit" style="width:100%">Entrar</button>' +
      '<p class="beta small" style="margin-top:14px">Beta: usuario <b>admin</b>, contraseña <b>admin</b>. Cámbiala antes de dar acceso a nadie más.</p></form>';
    document.getElementById("f-login").addEventListener("submit", function (ev) {
      ev.preventDefault();
      var u = document.getElementById("l-usuario").value, c = document.getElementById("l-clave").value;
      entrar(u, c).then(function (r) { if (r.error) pintarLogin("Usuario o contraseña incorrectos."); else arrancar(); });
    });
  }

  // ---------- datos ----------
  function cargar() {
    return Promise.all([
      sb.from("pacientes").select("*").order("creado", { ascending: false }),
      sb.from("convocatorias").select("*").order("creado", { ascending: false }),
      sb.from("envios").select("id,participante,paciente,convocatoria,bytes,sha256,recibido,leido,app,sesion").order("recibido", { ascending: false })
    ]).then(function (r) {
      r.forEach(function (x) { if (x.error) throw x.error; });
      S.pacientes = r[0].data; S.convocatorias = r[1].data; S.envios = r[2].data;
      S.ultimoEnvio = S.envios.reduce(function (m, e) { return Math.max(m, e.id); }, S.ultimoEnvio);
    }).catch(function (e) { S.msg = "Error al cargar: " + (e.message || e); });
  }

  // Aviso cuando alguien termina un test: se consulta cada 20 s (y notificación del sistema si se permite).
  function vigilar() {
    if ("Notification" in window && Notification.permission === "default") Notification.requestPermission();
    setInterval(function () {
      sb.from("envios").select("id,participante,recibido").gt("id", S.ultimoEnvio).then(function (r) {
        if (r.error || !r.data.length) return;
        r.data.forEach(function (e) {
          var t = "Test terminado: " + (e.participante || "sin seudónimo") + " · " + fecha(e.recibido);
          toast(t);
          if ("Notification" in window && Notification.permission === "granted") new Notification("IASC", { body: t });
        });
        cargar().then(pintar);
      });
    }, 20000);
  }

  // ---------- pintado ----------
  function pintar() {
    var nuevos = S.envios.filter(function (e) { return !e.leido; }).length;
    var tabs = [["buzon", "Buzón" + (nuevos ? '<span class="insignia">' + nuevos + "</span>" : "")], ["pacientes", "Pacientes"], ["tests", "Tests y enlaces"], ["info", "Info"], ["licencias", "Licencias"]];
    var h = '<header class="barra"><span class="marca">IASC</span><nav class="tabs">' +
      tabs.map(function (t) { return '<button data-a="vista" data-v="' + t[0] + '" class="' + (S.vista === t[0] || (S.vista === "ficha" && t[0] === "buzon") || (S.vista === "paciente" && t[0] === "pacientes") ? "on" : "") + '">' + t[1] + "</button>"; }).join("") +
      '</nav><span class="quien">' + esc(S.nombre) + '</span><button class="mini" data-a="salir">Salir</button></header><main class="cuerpo">';
    if (S.msg) h += '<p class="aviso">' + esc(S.msg) + "</p>";
    h += ({ buzon: vBuzon, pacientes: vPacientes, paciente: vPaciente, tests: vTests, ficha: vFicha, info: vInfo, licencias: vLicencias }[S.vista] || vBuzon)();
    raiz.innerHTML = h + "</main>";
    if (S.vista === "ficha") montarFicha();
  }

  function filaEnvio(e) {
    var c = S.convocatorias.filter(function (x) { return x.id === e.convocatoria; })[0];
    return '<tr class="clic' + (e.leido ? "" : " nuevo") + '" data-a="abrir" data-id="' + e.id + '"><td>' + fecha(e.recibido) + "</td><td>" + esc(e.participante || "—") + "</td><td>" +
      (c ? c.tests.map(function (t) { return '<span class="chip">' + esc(nombreTest(t)) + "</span>"; }).join("") : '<span class="chip">' + (e.convocatoria ? "enlace" : "app Android") + "</span>") +
      "</td><td>" + (e.leido ? '<span class="mut small">leída</span>' : '<span class="chip abierta">nueva</span>') + "</td></tr>";
  }

  function vBuzon() {
    var q = S.filtro.trim().toLowerCase();
    var lista = S.envios.filter(function (e) { return !q || (e.participante || "").toLowerCase().indexOf(q) >= 0; });
    return '<h2>Buzón de entrada</h2><p class="mut">Cada test terminado llega aquí solo, con fecha y hora del servidor, y queda hasta que se borre. Se comprueba la huella SHA-256 al abrirlo.</p>' +
      '<div class="fila" style="margin-bottom:12px"><input class="crece" id="f-filtro" placeholder="Buscar por seudónimo" value="' + esc(S.filtro) + '"><button data-a="recargar">Actualizar</button></div>' +
      (lista.length ? '<table class="lista"><thead><tr><th>Recibido</th><th>Paciente</th><th>Test</th><th>Estado</th></tr></thead><tbody>' + lista.map(filaEnvio).join("") + "</tbody></table>"
        : '<div class="tarjeta"><p>Aún no ha llegado ningún test. Crea un paciente y un enlace en <b>Tests y enlaces</b>.</p></div>');
  }

  function vPacientes() {
    var ps = S.pacientes.slice();
    var ultimo = function (p) { var e = S.envios.filter(function (x) { return x.paciente === p.id; })[0]; return e ? new Date(e.recibido).getTime() : new Date(p.creado).getTime(); };
    if (S.orden === "nombre") ps.sort(function (a, b) { return a.seudonimo.localeCompare(b.seudonimo, "es"); }); else ps.sort(function (a, b) { return ultimo(b) - ultimo(a); });
    return '<h2>Pacientes</h2><div class="tarjeta"><form id="f-paciente" class="fila"><label class="crece" style="margin:0"><span>Nuevo paciente (seudónimo, nunca el nombre)</span><input id="p-seudonimo" maxlength="40" placeholder="p. ej. V03" required></label><button class="pri" type="submit" style="align-self:flex-end">Añadir</button></form></div>' +
      '<div class="fila" style="margin-bottom:10px"><span class="mut small">Ordenar:</span><button class="mini" data-a="orden" data-v="reciente"' + (S.orden === "reciente" ? ' disabled' : "") + '>Más reciente</button><button class="mini" data-a="orden" data-v="nombre"' + (S.orden === "nombre" ? " disabled" : "") + ">Seudónimo</button></div>" +
      (ps.length ? '<table class="lista"><thead><tr><th>Seudónimo</th><th>Fichas</th><th>Enlaces abiertos</th><th>Último movimiento</th></tr></thead><tbody>' + ps.map(function (p) {
        var n = S.envios.filter(function (e) { return e.paciente === p.id; }).length, ab = S.convocatorias.filter(function (c) { return c.paciente === p.id && estadoConv(c) === "abierta"; }).length;
        return '<tr class="clic" data-a="paciente" data-id="' + p.id + '"><td><b>' + esc(p.seudonimo) + "</b></td><td>" + n + "</td><td>" + ab + "</td><td>" + fecha(ultimo(p)) + "</td></tr>";
      }).join("") + "</tbody></table>" : '<p class="mut">Sin pacientes todavía.</p>') +
      '<p class="mut small">Transferir fichas a otro profesional: pendiente (hoy solo hay un profesional en la beta).</p>';
  }

  function bloqueEnlace(c) {
    var url = urlTest(c.token), est = estadoConv(c);
    return '<div class="tarjeta"><div class="enlace"><div><p style="margin-top:0"><span class="chip ' + est + '">' + est + "</span> " + esc(TIPOS[c.tipo] ? TIPOS[c.tipo].nombre : c.tipo) + " · " +
      c.tests.map(function (t) { return '<span class="chip">' + esc(nombreTest(t)) + "</span>"; }).join("") + '</p><input readonly value="' + esc(url) + '" data-sel="1">' +
      '<p class="mut small">Creado ' + fecha(c.creado) + " · caduca " + fecha(c.caduca) + (c.usada ? " · enviado " + fecha(c.usada) : "") + "</p>" +
      '<div class="fila"><button class="mini" data-a="copiar" data-url="' + esc(url) + '">Copiar enlace</button>' +
      (navigator.share ? '<button class="mini" data-a="compartir" data-url="' + esc(url) + '">Compartir…</button>' : "") +
      '<a class="mini" href="' + esc(url) + '" target="_blank" rel="noopener">Abrir el test</a>' +
      (est === "abierta" ? '<button class="mini" data-a="revocar" data-id="' + c.id + '">Anular</button>' : "") +
      (est === "caducada" ? '<button class="mini" data-a="renovar" data-id="' + c.id + '">Renovar 72 h</button>' : "") + "</div></div>" +
      '<div class="qr">' + (est === "abierta" ? qrSvg(url) : "") + "</div></div></div>";
  }

  function vPaciente() {
    var p = paciente(S.sel); if (!p) { S.vista = "pacientes"; return vPacientes(); }
    var envs = S.envios.filter(function (e) { return e.paciente === p.id; }), convs = S.convocatorias.filter(function (c) { return c.paciente === p.id; });
    return '<p><button class="mini" data-a="vista" data-v="pacientes">← Pacientes</button></p><h2>' + esc(p.seudonimo) + '</h2><p class="mut small">Alta ' + fecha(p.creado) + "</p>" +
      '<div class="fila"><button class="pri" data-a="nuevo-enlace" data-id="' + p.id + '">Nueva convocatoria</button></div>' +
      "<h3>Fichas (" + envs.length + ")</h3>" + (envs.length ? '<table class="lista"><thead><tr><th>Recibido</th><th>Paciente</th><th>Test</th><th>Estado</th></tr></thead><tbody>' + envs.map(filaEnvio).join("") + "</tbody></table>" : '<p class="mut">Sin fichas aún.</p>') +
      "<h3>Convocatorias y enlaces</h3>" + (convs.length ? convs.map(bloqueEnlace).join("") : '<p class="mut">Sin enlaces.</p>');
  }

  function vTests() {
    var opts = S.pacientes.map(function (p) { return '<option value="' + p.id + '"' + (S.sel === p.id ? " selected" : "") + ">" + esc(p.seudonimo) + "</option>"; }).join("");
    var h = '<h2>Tests y enlaces</h2><div class="tarjeta"><h3 style="margin-top:0">Nueva convocatoria</h3>';
    if (!S.pacientes.length) return h + '<p>Primero añade un paciente en <button class="mini" data-a="vista" data-v="pacientes">Pacientes</button>.</p></div>';
    h += '<form id="f-conv"><label><span>Paciente</span><select id="c-paciente">' + opts + "</select></label>" +
      '<fieldset style="border:0;padding:0;margin:10px 0"><legend class="mut small" style="font-weight:600">Qué se envía</legend>' +
      Object.keys(TIPOS).map(function (k, i) { return '<label style="margin:6px 0"><input type="radio" name="c-tipo" value="' + k + '"' + (i === 0 ? " checked" : "") + ' style="width:auto;min-height:0"> <b>' + TIPOS[k].nombre + '</b> <span class="mut small">· ' + esc(TIPOS[k].texto) + "</span></label>"; }).join("") +
      '</fieldset><div id="c-sueltos" class="aviso" hidden>' + DISPONIBLES.map(function (t) { return '<label style="margin:4px 0"><input type="checkbox" value="' + t.id + '" style="width:auto;min-height:0"> ' + esc(t.nombre) + ' <span class="mut small">(' + t.items + " ítems)</span></label>"; }).join("") +
      '<p class="mut small" style="margin:6px 0 0">En preparación: ' + EN_PREPARACION.join(" · ") + ".</p></div>" +
      '<label><span>Caduca en (horas, mínimo 24)</span><input id="c-horas" type="number" min="24" max="720" value="72"></label>' +
      '<button class="pri" type="submit">Generar enlace</button></form></div>';
    if (S.nuevoEnlace) h += "<h3>Enlace generado</h3>" + bloqueEnlace(S.nuevoEnlace);
    var abiertas = S.convocatorias.filter(function (c) { return estadoConv(c) === "abierta" && (!S.nuevoEnlace || c.id !== S.nuevoEnlace.id); });
    h += "<h3>Enlaces abiertos (" + abiertas.length + ")</h3>" + (abiertas.length ? abiertas.map(function (c) { var p = paciente(c.paciente); return '<p class="small" style="margin:12px 0 4px"><b>' + esc(p ? p.seudonimo : "?") + "</b></p>" + bloqueEnlace(c); }).join("") : '<p class="mut">Ninguno.</p>');
    return h;
  }

  // ---------- ficha ----------
  var F = { envio: null, reg: null, verificado: null, versiones: [] };
  function vFicha() {
    var e = F.envio; if (!e) return '<p class="mut">Cargando ficha…</p>';
    var ult = F.versiones.length ? F.versiones[F.versiones.length - 1] : null;
    return '<p><button class="mini" data-a="vista" data-v="buzon">← Buzón</button>' + (e.paciente ? ' <button class="mini" data-a="paciente" data-id="' + e.paciente + '">Ver paciente</button>' : "") + "</p>" +
      '<div class="ficha-cab"><h2>' + esc(e.participante || "sin seudónimo") + "</h2><div>Recibido " + fecha(e.recibido) + " · " + e.bytes + " bytes · versión " + (F.versiones.length + 1) + " (v1 = la recibida, inmutable)</div>" +
      '<div class="small">Huella SHA-256 <code>' + esc(e.sha256.slice(0, 16)) + "…</code> " + (F.verificado === null ? "comprobando…" : F.verificado ? '<span class="chip ver">verificada</span>' : '<span class="chip nover">NO coincide</span>') + "</div>" +
      (ult && ult.notas ? '<div class="notas-fijadas"><b>Notas del profesional (v' + ult.version + ", " + fecha(ult.creado) + "):</b>\n" + esc(ult.notas) + "</div>" : "") + "</div>" +
      '<div class="fila" style="margin-bottom:10px"><button data-a="exp-word">Word (.doc)</button><button data-a="exp-html">HTML</button><button data-a="exp-pdf">PDF (imprimir)</button><button data-a="exp-json">Registro JSON</button>' +
      (navigator.share ? '<button data-a="exp-compartir">Compartir…</button>' : "") + "</div>" +
      '<iframe class="hoja" id="hoja" title="Ficha" sandbox="allow-scripts allow-modals allow-popups allow-downloads"></iframe>' +
      '<div class="tarjeta" style="margin-top:14px"><h3 style="margin-top:0">Notas del profesional</h3><p class="mut small">Escribe lo que quieras. Cada guardado crea una versión nueva (v2, v3…); la v1 recibida no cambia nunca y las notas van a la cabecera al exportar.</p>' +
      '<textarea id="n-notas" spellcheck="false">' + esc(ult ? ult.notas : "") + '</textarea><div class="fila" style="margin-top:8px"><button class="pri" data-a="guardar-notas">Guardar como v' + (F.versiones.length + 2) + "</button></div>" +
      (F.versiones.length ? '<ul class="versiones small">' + F.versiones.map(function (v) { return "<li>v" + v.version + " · " + fecha(v.creado) + " · " + esc((v.notas || "").slice(0, 80)) + "</li>"; }).join("") + "<li>v1 · " + fecha(e.recibido) + " · recibida</li></ul>" : "") + "</div>";
  }
  function docFicha(modo) {
    var est = F.reg && F.reg.estado; if (!est) return "<p>Registro ilegible.</p>";
    var inf = Analisis.analizar(DATOS, est);
    var html = Hoja.documento(DATOS, inf, est, modo);
    var ult = F.versiones.length ? F.versiones[F.versiones.length - 1] : null;
    if (modo === "export" && ult && ult.notas) html = html.replace(/<body[^>]*>/, function (b) { return b + '<div style="font-family:system-ui,sans-serif;background:#fff;border-left:5px solid #6D55C9;padding:8px 12px;margin:0 0 10px;white-space:pre-wrap"><b>Notas del profesional (v' + ult.version + "):</b>\n" + esc(ult.notas) + "</div>"; });
    return { html: html, inf: inf, est: est };
  }
  function montarFicha() {
    var fr = document.getElementById("hoja"); if (!fr || !F.reg) return;
    var d = docFicha("vista"); if (typeof d === "string") { fr.srcdoc = d; return; }
    var ctx = JSON.stringify({ datos: DATOS, inf: d.inf, est: d.est }).replace(/<\//g, "<\\/");
    fr.srcdoc = d.html.replace("</body></html>", '<script type="application/json" id="hoja-ctx">' + ctx + '</script><script src="hoja.js"></script><script>Hoja.init(function(){return JSON.parse(document.getElementById("hoja-ctx").textContent)});</script></body></html>');
  }
  function abrirFicha(id) {
    S.vista = "ficha"; F = { envio: null, reg: null, verificado: null, versiones: [] }; pintar();
    Promise.all([sb.from("envios").select("*").eq("id", id).single(), sb.from("fichas_versiones").select("*").eq("envio", id).order("version")]).then(function (r) {
      if (r[0].error) { S.msg = "No se pudo abrir: " + r[0].error.message; S.vista = "buzon"; return pintar(); }
      F.envio = r[0].data; F.reg = registroDe(F.envio); F.versiones = r[1].data || [];
      pintar();
      sha256Hex(F.envio.registro).then(function (h) { F.verificado = h === F.envio.sha256; pintar(); });
      if (!F.envio.leido) sb.from("envios").update({ leido: new Date().toISOString() }).eq("id", id).then(function () { var e = S.envios.filter(function (x) { return x.id === id; })[0]; if (e) e.leido = new Date().toISOString(); });
    });
  }

  function vInfo() {
    return '<h2>Info</h2><div class="tarjeta"><p><b>IASC</b> es la herramienta del profesional. Desde aquí se crean los enlaces a los test, llegan las respuestas y se leen las fichas.</p>' +
      "<ol><li>Creas un paciente con un seudónimo (nunca el nombre).</li><li>Generas una convocatoria: valoración inicial, batería completa o test sueltos. Sale un enlace y su QR, propios de ese paciente y de ese envío, válidos 72 h y de un solo uso.</li>" +
      "<li>La persona hace el test en la web, sin instalar nada ni crear cuenta. El borrador se guarda cifrado en su dispositivo hasta que autoriza el envío.</li>" +
      "<li>Al enviar, el servidor (Supabase, UE) guarda el registro, calcula su huella SHA-256 y cierra el enlace. La persona ve «Enviado y comprobado»; tú recibes el aviso aquí.</li>" +
      "<li>La ficha se pinta con el mismo motor del test. Tus notas crean versiones nuevas; la recibida no cambia.</li></ol>" +
      '<p class="mut small">La puntuación la calcula el código, no la IA. Esto no es un diagnóstico: son datos para que el profesional valore. Riesgo: PHQ-9 ítem 9 > 0 para el test y muestra 024 y 112.</p></div>';
  }
  function vLicencias() {
    return '<h2>Licencias</h2><div class="tarjeta"><h3 style="margin-top:0">Test</h3><ul>' +
      "<li><b>Mini-IPIP</b>: dominio público (ipip.ori.org).</li><li><b>PHQ-9 y GAD-7</b>: Pfizer, sin autorización necesaria.</li>" +
      "<li><b>CORE-10</b>: CORE System Trust, libre sin modificar.</li><li><b>ASRS, 7 Up 7 Down, HCL-32</b>: piden permiso para uso comercial; en el piloto, libres.</li>" +
      "<li><b>PCL-5</b>: dominio público.</li><li>De pago y fuera: MMPI, 16PF, MCMI, BDI-II, STAI, SCL-90.</li></ul>" +
      '<h3>Software</h3><ul><li>Supabase JS (MIT), Capacitor (MIT), qrcode-generator (MIT).</li></ul><p class="mut small">Detalle en docs/registro-derechos-licencias-test.md.</p></div>';
  }

  // ---------- acciones ----------
  raiz.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-a]"); if (!b) { var s = ev.target.closest("[data-sel]"); if (s) s.select(); return; }
    var a = b.getAttribute("data-a"), id = b.getAttribute("data-id");
    if (a === "vista") { S.vista = b.getAttribute("data-v"); S.msg = ""; if (S.vista !== "tests") S.nuevoEnlace = null; pintar(); }
    else if (a === "salir") { sb.auth.signOut().then(function () { location.reload(); }); }
    else if (a === "recargar") { cargar().then(pintar); }
    else if (a === "abrir") { abrirFicha(Number(id)); }
    else if (a === "paciente") { S.sel = id; S.vista = "paciente"; pintar(); }
    else if (a === "orden") { S.orden = b.getAttribute("data-v"); pintar(); }
    else if (a === "nuevo-enlace") { S.sel = id; S.vista = "tests"; S.nuevoEnlace = null; pintar(); }
    else if (a === "copiar") { navigator.clipboard.writeText(b.getAttribute("data-url")).then(function () { toast("Enlace copiado"); }); }
    else if (a === "compartir") { navigator.share({ title: "Test", text: "Tu enlace para el test (válido unos días):", url: b.getAttribute("data-url") }).catch(function () {}); }
    else if (a === "revocar") { sb.from("convocatorias").update({ revocada: true }).eq("id", id).then(function (r) { if (r.error) toast(r.error.message); cargar().then(pintar); }); }
    else if (a === "renovar") { sb.from("convocatorias").update({ caduca: new Date(Date.now() + 72 * 3600e3).toISOString() }).eq("id", id).then(function (r) { if (r.error) toast(r.error.message); cargar().then(pintar); }); }
    else if (a === "guardar-notas") {
      var notas = document.getElementById("n-notas").value, v = F.versiones.length + 2;
      sb.from("fichas_versiones").insert({ envio: F.envio.id, version: v, notas: notas }).select().single().then(function (r) {
        if (r.error) return toast("No se guardó: " + r.error.message);
        F.versiones.push(r.data); toast("Guardada v" + v); pintar();
      });
    }
    else if (a === "exp-word") { descargar(nombreArchivo(F.envio, "doc"), docFicha("export").html, "application/msword"); }
    else if (a === "exp-html") { descargar(nombreArchivo(F.envio, "html"), docFicha("export").html, "text/html"); }
    else if (a === "exp-json") { descargar(nombreArchivo(F.envio, "json"), F.envio.registro, "application/json"); }
    else if (a === "exp-pdf") { var w = window.open("", "_blank"); if (w) { w.document.write(docFicha("export").html); w.document.close(); w.focus(); w.print(); } }
    else if (a === "exp-compartir") {
      var f = new File([docFicha("export").html], nombreArchivo(F.envio, "html"), { type: "text/html" });
      if (navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f], title: "Ficha " + F.envio.participante }).catch(function () {});
      else toast("Este navegador no comparte archivos: usa Word o PDF.");
    }
  });
  raiz.addEventListener("input", function (ev) {
    if (ev.target.id === "f-filtro") { S.filtro = ev.target.value; var pos = ev.target.selectionStart; pintar(); var f = document.getElementById("f-filtro"); f.focus(); f.setSelectionRange(pos, pos); }
  });
  raiz.addEventListener("change", function (ev) {
    if (ev.target.name === "c-tipo") document.getElementById("c-sueltos").hidden = ev.target.value !== "sueltos";
  });
  raiz.addEventListener("submit", function (ev) {
    if (ev.target.id === "f-paciente") {
      ev.preventDefault();
      var seu = document.getElementById("p-seudonimo").value.trim(); if (!seu) return;
      sb.from("pacientes").insert({ seudonimo: seu }).select().single().then(function (r) {
        if (r.error) return toast(/duplicate|unique/.test(r.error.message) ? "Ya tienes un paciente con ese seudónimo." : r.error.message);
        S.pacientes.unshift(r.data); toast("Paciente añadido"); pintar();
      });
    }
    if (ev.target.id === "f-conv") {
      ev.preventDefault();
      var tipo = (document.querySelector('input[name="c-tipo"]:checked') || {}).value || "inicial";
      var tests = tipo === "sueltos" ? Array.prototype.map.call(document.querySelectorAll("#c-sueltos input:checked"), function (x) { return x.value; }) : TIPOS[tipo].tests;
      if (!tests.length) return toast("Elige al menos un test.");
      var horas = Math.max(24, Math.min(720, Number(document.getElementById("c-horas").value) || 72));
      var fila = { paciente: document.getElementById("c-paciente").value, tipo: tipo, tests: tests, token: token(), caduca: new Date(Date.now() + horas * 3600e3).toISOString() };
      sb.from("convocatorias").insert(fila).select().single().then(function (r) {
        if (r.error) return toast("No se creó: " + r.error.message);
        S.convocatorias.unshift(r.data); S.nuevoEnlace = r.data; S.sel = r.data.paciente; pintar();
      });
    }
  });

  arrancar();
})();
