// Destino de envío de la app (Capacitor) hacia Supabase (UE).
// Lo usa guardarApp() del piloto: window.IASC_DESTINO.enviar(...) -> { envio, bytes, sha256 }.
// Quien responde entra con una cuenta anónima del propio dispositivo: solo puede insertar lo suyo
// (función enviar_registro) y no puede leer ningún envío. La huella la calcula el servidor.
(function () {
  var cfg = window.IASC_CONFIG;
  if (!cfg || !cfg.supabaseUrl || !cfg.supabaseAnonKey || !window.supabase) return;
  var cliente = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true, storageKey: "iasc-auth" }
  });

  function sesion() {
    return cliente.auth.getSession().then(function (r) {
      if (r.data && r.data.session) return r.data.session;
      return cliente.auth.signInAnonymously().then(function (a) {
        if (a.error) throw new Error("no se pudo iniciar la sesión del dispositivo: " + a.error.message);
        return a.data.session;
      });
    });
  }

  window.IASC_DESTINO = {
    nombre: "supabase",
    enviar: function (p) {
      return sesion().then(function () {
        return cliente.rpc("enviar_registro", {
          p_sesion: String(p.id || ""),
          p_participante: String(p.participante || ""),
          p_app: String(p.app || ""),
          p_registro: p.registro,
          p_sha256_cliente: p.sha256
        });
      }).then(function (r) {
        if (r.error) throw new Error(r.error.message);
        var d = Array.isArray(r.data) ? r.data[0] : r.data;
        if (!d) throw new Error("el servidor no devolvió recibo");
        return { envio: d.envio, bytes: d.bytes, sha256: d.sha256 };
      });
    }
  };
})();
