// Almacén cifrado del borrador en el dispositivo (regla 6 de CLAUDE.md).
//
// El piloto guarda su estado con llamadas síncronas a localStorage. En la app, el build cambia esas llamadas
// por IASC_ALMACEN, que guarda cada valor cifrado con AES-256-GCM (IV aleatorio de 96 bits por escritura).
//   · Clave: 32 bytes aleatorios guardados en el Android Keystore (plugin capacitor-secure-storage-plugin).
//     En el navegador, sin el plugin: clave no exportable de WebCrypto guardada en IndexedDB (solo para desarrollo).
//   · En memoria queda el texto descifrado; en disco solo el cifrado, bajo el prefijo "iasc-c1:".
//   · Si el almacén no arranca, no se guarda nada en claro: setItem falla y el piloto avisa de que no puede guardar.
//   · Los borradores en claro de versiones anteriores se cifran y se borran al arrancar.
(function () {
  var PREFIJO = "iasc-c1:";
  var CLAVES_EN_CLARO = ["empresaia-piloto-borrador", "empresaia-piloto-borrador-destino"];
  var memoria = new Map();
  var colas = new Map();
  var clave = null, roto = false;
  var te = new TextEncoder(), td = new TextDecoder();

  function b64(buf) { var s = "", a = new Uint8Array(buf); for (var i = 0; i < a.length; i++) s += String.fromCharCode(a[i]); return btoa(s); }
  function deb64(s) { var b = atob(s), a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }

  function pluginSeguro() {
    var C = window.Capacitor;
    return C && C.isNativePlatform && C.isNativePlatform() && C.Plugins && C.Plugins.SecureStoragePlugin ? C.Plugins.SecureStoragePlugin : null;
  }

  function claveNativa(plugin) {
    var NOMBRE = "iasc-clave-borrador-v1";
    return plugin.get({ key: NOMBRE }).then(function (r) { return r.value; }, function () { return null; }).then(function (v) {
      if (v) return deb64(v);
      var nueva = crypto.getRandomValues(new Uint8Array(32));
      return plugin.set({ key: NOMBRE, value: b64(nueva) }).then(function () { return nueva; });
    }).then(function (bytes) {
      return crypto.subtle.importKey("raw", bytes, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
    });
  }

  function claveNavegador() {
    return new Promise(function (ok, ko) {
      var pet = indexedDB.open("iasc-claves", 1);
      pet.onupgradeneeded = function () { pet.result.createObjectStore("claves"); };
      pet.onerror = function () { ko(pet.error); };
      pet.onsuccess = function () {
        var db = pet.result, lee = db.transaction("claves").objectStore("claves").get("borrador");
        lee.onerror = function () { ko(lee.error); };
        lee.onsuccess = function () {
          if (lee.result) return ok(lee.result);
          crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]).then(function (k) {
            var tx = db.transaction("claves", "readwrite");
            tx.objectStore("claves").put(k, "borrador");
            tx.oncomplete = function () { ok(k); };
            tx.onerror = function () { ko(tx.error); };
          }, ko);
        };
      };
    });
  }

  function cifrar(texto) {
    var iv = crypto.getRandomValues(new Uint8Array(12));
    return crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, clave, te.encode(texto)).then(function (c) {
      var todo = new Uint8Array(12 + c.byteLength); todo.set(iv, 0); todo.set(new Uint8Array(c), 12); return b64(todo);
    });
  }
  function descifrar(guardado) {
    var todo = deb64(guardado);
    return crypto.subtle.decrypt({ name: "AES-GCM", iv: todo.slice(0, 12) }, clave, todo.slice(12)).then(function (p) { return td.decode(p); });
  }

  // Escrituras de una misma clave en orden: la última siempre gana.
  function persistir(k) {
    var previa = colas.get(k) || Promise.resolve();
    var sig = previa.then(function () {
      if (!memoria.has(k)) { localStorage.removeItem(PREFIJO + k); return; }
      return cifrar(memoria.get(k)).then(function (c) { localStorage.setItem(PREFIJO + k, c); });
    }).catch(function () { roto = true; });
    colas.set(k, sig);
    return sig;
  }

  var listo = (function () {
    if (!window.crypto || !crypto.subtle) return Promise.reject(new Error("sin WebCrypto"));
    var plugin = pluginSeguro();
    return (plugin ? claveNativa(plugin) : claveNavegador()).then(function (k) {
      clave = k;
      var pendientes = [];
      for (var i = 0; i < localStorage.length; i++) {
        var nombre = localStorage.key(i);
        if (nombre && nombre.indexOf(PREFIJO) === 0) {
          (function (n) {
            pendientes.push(descifrar(localStorage.getItem(n)).then(function (t) { memoria.set(n.slice(PREFIJO.length), t); },
              function () { /* no se puede descifrar (clave perdida): se descarta, nunca se muestra en claro */ localStorage.removeItem(n); }));
          })(nombre);
        }
      }
      return Promise.all(pendientes);
    }).then(function () {
      // Migración: lo que hubiera en claro se cifra y se borra.
      var mig = [];
      CLAVES_EN_CLARO.forEach(function (n) {
        var v = localStorage.getItem(n);
        if (v !== null) {
          if (!memoria.has(n)) memoria.set(n, v);
          mig.push(persistir(n).then(function () { localStorage.removeItem(n); }));
        }
      });
      return Promise.all(mig);
    });
  })();

  window.IASC_ALMACEN = {
    listo: listo.then(function () { return true; }, function (e) { roto = true; return false; }),
    getItem: function (k) { return memoria.has(k) ? memoria.get(k) : null; },
    setItem: function (k, v) {
      if (!clave || roto) throw new Error("almacén cifrado no disponible");
      memoria.set(k, String(v)); persistir(k);
    },
    removeItem: function (k) { memoria.delete(k); if (clave) persistir(k); },
    estado: function () { return { cifrado: !!clave && !roto, nativo: !!pluginSeguro(), claves: memoria.size }; }
  };
})();
