// Test web abierto desde un enlace de IASC: …/test/?t=<token>
// Lee la convocatoria (qué test, seudónimo, si sigue abierta) y prepara el envío por enlace.
// La persona no tiene cuenta: solo puede leer su convocatoria y enviar una vez con ese token.
(function () {
  var m = /[?&]t=([0-9a-fA-F]{32,64})\b/.exec(location.search);
  if (!m) return;                                   // sin enlace: el piloto funciona como siempre
  var token = m[1].toLowerCase();
  var cfg = window.IASC_CONFIG;

  function aviso(titulo, texto) {
    var pintar = function () {
      var app = document.getElementById("app") || document.body;
      app.innerHTML = '<main style="max-width:560px;margin:12vh auto;padding:0 20px;font:17px/1.5 system-ui,sans-serif;color:#26223a">' +
        '<h1 style="color:#6D55C9;font-size:24px">' + titulo + "</h1><p>" + texto + "</p>" +
        '<p style="color:#6b6680;font-size:15px">Si crees que es un error, pide un enlace nuevo a la persona que te lo envió.</p>' +
        '<p style="background:#FBE6D4;padding:10px 14px;border-radius:10px;font-size:15px">Si estás pasando por un momento difícil: <b>024</b> (24 h, gratuito, confidencial). Emergencias: <b>112</b>.</p></main>';
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", pintar); else pintar();
  }

  if (!cfg || !window.supabase) {
    aviso("No se puede abrir el test", "Esta copia del test no está conectada al servidor.");
    window.IASC_ENLACE_LISTO = Promise.reject(new Error("sin configuración"));
    return;
  }
  var cliente = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, { auth: { persistSession: false, autoRefreshToken: false } });

  window.IASC_ENLACE_LISTO = cliente.rpc("convocatoria_por_enlace", { p_token: token }).then(function (r) {
    if (r.error) throw new Error(r.error.message);
    var c = Array.isArray(r.data) ? r.data[0] : r.data;
    if (!c) { aviso("Enlace no válido", "Este enlace no existe. Revisa que lo has copiado entero."); throw new Error("no existe"); }
    if (c.estado === "usada") { aviso("Ya enviaste tus respuestas", "Este enlace ya se usó y tus respuestas llegaron. Gracias."); throw new Error("usada"); }
    if (c.estado === "caducada") { aviso("El enlace ha caducado", "Los enlaces duran unos días por seguridad."); throw new Error("caducada"); }
    if (c.estado === "revocada") { aviso("El enlace se ha anulado", "La persona que te lo envió lo ha anulado."); throw new Error("revocada"); }
    window.IASC_ENLACE = { tests: c.tests, tipo: c.tipo, seudonimo: c.seudonimo, caduca: c.caduca, clave: token.slice(0, 16) };
    window.IASC_DESTINO = {
      nombre: "enlace",
      enviar: function (p) {
        return cliente.rpc("enviar_por_enlace", {
          p_token: token, p_sesion: String(p.id || ""), p_app: String(p.app || ""), p_registro: p.registro, p_sha256_cliente: p.sha256
        }).then(function (r2) {
          if (r2.error) throw new Error(r2.error.message);
          var d = Array.isArray(r2.data) ? r2.data[0] : r2.data;
          if (!d) throw new Error("el servidor no devolvió recibo");
          return { envio: d.envio, bytes: d.bytes, sha256: d.sha256 };
        });
      }
    };
  }).catch(function (e) {
    if (!/no existe|usada|caducada|revocada/.test(e && e.message)) aviso("Sin conexión", "No se ha podido comprobar el enlace. Revisa tu conexión y vuelve a abrirlo.");
    throw e;
  });
  window.IASC_ENLACE_LISTO.catch(function () {});
})();
