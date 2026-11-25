// Generado por app/scripts/build.mjs desde prototypes/piloto-de-test-borrador-editable.html. No editar a mano.
var IASC_DATOS = {"esquema":"test-v2","protocolo_riesgo":{"capa":"APP","texto":"Si estás pasando por un momento difícil o piensas en hacerte daño, llama al **024** (Línea de atención a la conducta suicida: gratuita, confidencial, 24 h, también por chat). Si hay peligro inmediato, llama al **112**.","boton":"Volver más tarde"},"tests":[{"id":"mini-ipip","version":"es-equilibrada-MartinezMolina-Arias-2018","nombre":"Mini-IPIP","fuente":{"cita":"Mini-IPIP: Donnellan, Oswald, Baird y Lucas (2006). Ítems del International Personality Item Pool (dominio público). Versión española: Martínez-Molina y Arias (2018), PeerJ 6:e5542.","url":"https://ipip.ori.org/Spanishmini-IPIPposneg.htm","licencia":"dominio público","uso_comercial":true},"marco_temporal":"En general (rasgo, sin periodo)","titulo":"Mini-IPIP","instrucciones":"A continuación, se presenta una serie de frases cortas que describen cómo las personas se comportan generalmente. Léelas con atención y señala la alternativa de respuesta que mejor describa tu comportamiento en general. No hay respuestas correctas o incorrectas, y recuerda que los datos serán tratados con confidencialidad.","encabezado_items":null,"escala":{"min":1,"max":5},"opciones":[{"valor":1,"etiqueta":"Nada de acuerdo"},{"valor":2,"etiqueta":"Algo de acuerdo"},{"valor":3,"etiqueta":"Medio acuerdo"},{"valor":4,"etiqueta":"Mucho acuerdo"},{"valor":5,"etiqueta":"Total acuerdo"}],"items":[{"n":1,"texto":"Soy el alma de la fiesta"},{"n":2,"texto":"Soy sensible hacia las emociones de otros"},{"n":3,"texto":"Realizo mis tareas inmediatamente","ayuda_app":"Se refiere a no tardar en empezar las tareas, no a hacerlas deprisa."},{"n":4,"texto":"Tengo frecuentes cambios de ánimo"},{"n":5,"texto":"Tengo mucha imaginación"},{"n":6,"texto":"No hablo mucho","inverso":true},{"n":7,"texto":"No me interesan los problemas de otras personas","inverso":true},{"n":8,"texto":"A menudo olvido poner las cosas en su lugar","inverso":true},{"n":9,"texto":"Estoy relajado la mayor parte del tiempo","inverso":true,"ayuda_app":"Piensa en cómo eres habitualmente, no en hoy. «Relajado» incluye el cuerpo (tensión, inquietud física) y la cabeza (preocupación, darle vueltas a las cosas). Si cuerpo y cabeza no van a la par, responde por lo que más pese y cuéntalo en el comentario.","ayuda_estado":"BORRADOR 21-11-2026, pendiente de aprobar"},{"n":10,"texto":"No estoy interesado en las ideas abstractas","inverso":true},{"n":11,"texto":"En las fiestas hablo con muchas personas"},{"n":12,"texto":"Siento las emociones de los otros"},{"n":13,"texto":"Me gusta el orden"},{"n":14,"texto":"Me molesto fácilmente"},{"n":15,"texto":"Tengo dificultad para entender ideas abstractas","inverso":true},{"n":16,"texto":"Prefiero pasar desapercibido","inverso":true},{"n":17,"texto":"En realidad no estoy interesado en los demás","inverso":true},{"n":18,"texto":"Soy desordenado","inverso":true},{"n":19,"texto":"Rara vez me siento triste","inverso":true},{"n":20,"texto":"No tengo buena imaginación","inverso":true}],"subescalas":[{"id":"E","nombre":"Extraversión","items":[1,6,11,16]},{"id":"A","nombre":"Amabilidad","items":[2,7,12,17]},{"id":"C","nombre":"Responsabilidad","items":[3,8,13,18]},{"id":"N","nombre":"Neuroticismo","items":[4,9,14,19]},{"id":"I","nombre":"Intelecto/Imaginación","items":[5,10,15,20]}],"puntuacion":{"metodo":"suma","faltantes":{"max_por_subescala":0,"prorrateo":false,"fuente":"El IPIP solo indica sumar los valores (ipip.ori.org/newScoringInstructions.htm) y no da regla de faltantes. Con 4 ítems por rasgo, 1 faltante es el 25 %: el rasgo no se calcula [DECISIÓN conservadora del proyecto]."},"pomp":true},"derivadas":[{"id":"estabilidad","nombre":"Estabilidad emocional","tipo":"invertir_subescala","de":"N","fuente":"doc §0: 24 − N"}],"rangos":[],"cortes":[],"interpretacion":"Solo relativa. Sin puntos de corte, tipos ni etiquetas.","riesgo":{"items":[],"umbral_mayor_que":0},"preguntas_extra":[],"pie":"Mini-IPIP: Donnellan, Oswald, Baird y Lucas (2006). Ítems del International Personality Item Pool (dominio público). Versión española: Martínez-Molina y Arias (2018), PeerJ 6:e5542.","referencia":{"fuente":"Martínez-Molina y Arias (2018), PeerJ 6:e5542, Tabla 3, forma equilibrada. 518 estudiantes universitarios chilenos de 18 a 34 años (media 21,6), 70,7 % mujeres.","rasgos":{"E":{"m":12.24,"de":3.56,"alfa":0.84},"N":{"m":10.82,"de":3.2,"alfa":0.65},"A":{"m":15.92,"de":2.69,"alfa":0.82},"C":{"m":12.72,"de":3.54,"alfa":0.78},"I":{"m":15.42,"de":2.97,"alfa":0.79}}}},{"id":"phq-9","version":"es-phqscreeners","nombre":"PHQ-9","fuente":{"cita":"Kroenke et al. (2001). Spitzer, Williams, Kroenke y colaboradores; beca de Pfizer Inc.","url":"https://www.phqscreeners.com","licencia":"No se necesita autorización para su reproducción, traducción, muestra o distribución.","uso_comercial":true},"marco_temporal":"Últimas 2 semanas","titulo":"CUESTIONARIO DE SALUD DEL PACIENTE-9 (PHQ-9)","instrucciones":"Durante las últimas 2 semanas ¿con qué frecuencia le ha molestado alguno de los siguientes problemas?","encabezado_items":null,"escala":{"min":0,"max":3},"opciones":[{"valor":0,"etiqueta":"Nunca"},{"valor":1,"etiqueta":"Varios días"},{"valor":2,"etiqueta":"Más de la mitad de los días"},{"valor":3,"etiqueta":"Casi cada día"}],"items":[{"n":1,"texto":"Poco interés o alegría por hacer cosas"},{"n":2,"texto":"Sensación de estar decaído/a, deprimido/a o desesperanzado/a"},{"n":3,"texto":"Problemas para quedarse dormido/a, para seguir durmiendo o dormir demasiado"},{"n":4,"texto":"Sensación de cansancio o de tener poca energía"},{"n":5,"texto":"Poco apetito o comer demasiado"},{"n":6,"texto":"Sentirse mal consigo mismo/a; sentir que es un/a fracasado/a o que ha decepcionado a su familia o a sí mismo/a"},{"n":7,"texto":"Problemas para concentrarse en algo, como leer el periódico o ver la televisión"},{"n":8,"texto":"Moverse o hablar tan despacio que los demás pueden haberlo notado. O lo contrario: estar tan inquieto/a o agitado/a que se ha estado moviendo de un lado a otro más de lo habitual"},{"n":9,"texto":"Pensamientos de que estaría mejor muerto/a o de querer hacerse daño de algún modo","riesgo":true}],"subescalas":[{"id":"total","nombre":"Total","items":[1,2,3,4,5,6,7,8,9]}],"puntuacion":{"metodo":"suma","faltantes":{"max_por_subescala":2,"prorrateo":true,"redondeo":"entero","fuente":"APA, DSM-5-TR Severity Measure for Depression—Adult (PHQ-9): si quedan 1 o 2 ítems sin responder, puntuación = suma × 9 / nº de ítems respondidos, redondeada al entero más cercano. Con 3 o más, no se calcula."},"pomp":false},"derivadas":[],"rangos":[{"subescala":"total","min":0,"max":4,"etiqueta":"Mínima"},{"subescala":"total","min":5,"max":9,"etiqueta":"Leve"},{"subescala":"total","min":10,"max":14,"etiqueta":"Moderada"},{"subescala":"total","min":15,"max":19,"etiqueta":"Moderadamente grave"},{"subescala":"total","min":20,"max":27,"etiqueta":"Grave"}],"rangos_fuente":"Kroenke et al. (2001), tabla en claude/app-piloto-documentacion-tests.md §2","cortes":[{"id":"habitual","subescala":"total","mayor_o_igual":10,"fuente":"Corte habitual ≥ 10 (Kroenke et al., 2001)"}],"riesgo":{"items":[9],"umbral_mayor_que":0},"preguntas_extra":[{"id":"dificultad","puntua":false,"texto":"Si ha marcado alguno de los problemas de este cuestionario, ¿hasta qué punto estos problemas le han creado dificultades para hacer su trabajo, ocuparse de la casa o relacionarse con los demás?","opciones":[{"valor":0,"etiqueta":"Ninguna dificultad"},{"valor":1,"etiqueta":"Algunas dificultades"},{"valor":2,"etiqueta":"Muchas dificultades"},{"valor":3,"etiqueta":"Muchísimas dificultades"}]}],"pie":"Desarrollado por los doctores Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke y colaboradores, con una beca otorgada por Pfizer Inc. No se necesita autorización para su reproducción, traducción, muestra o distribución.","cortes_no_aplicados":["≥ 8 en atención primaria en España (Gómez-Gómez et al., 2023). No se aplica: decisión del 21-11-2026 de mostrar solo el corte habitual."]},{"id":"gad-7","version":"es-phqscreeners","nombre":"GAD-7","fuente":{"cita":"Spitzer et al. (2006). Adaptación española: García-Campayo et al. (2010).","url":"https://www.phqscreeners.com","licencia":"No se necesita autorización para su reproducción, traducción, muestra o distribución.","uso_comercial":true},"marco_temporal":"Últimos 14 días","titulo":"GAD-7","instrucciones":"En los últimos 14 días, ¿con qué frecuencia le han supuesto una molestia los siguientes problemas?","encabezado_items":null,"escala":{"min":0,"max":3},"opciones":[{"valor":0,"etiqueta":"Nunca"},{"valor":1,"etiqueta":"Varios días"},{"valor":2,"etiqueta":"Más de la mitad de los días"},{"valor":3,"etiqueta":"Casi cada día"}],"items":[{"n":1,"texto":"Sentirse nervioso/a, angustiado/a o muy tenso/a"},{"n":2,"texto":"Ser incapaz de dejar de preocuparse o de controlar la preocupación"},{"n":3,"texto":"Preocuparse demasiado por diferentes cuestiones"},{"n":4,"texto":"Tener problemas para relajarse"},{"n":5,"texto":"Estar tan inquieto/a que le resulta difícil permanecer sentado/a"},{"n":6,"texto":"Enfadarse o irritarse con facilidad"},{"n":7,"texto":"Sentir miedo de que algo terrible pueda ocurrir"}],"subescalas":[{"id":"total","nombre":"Total","items":[1,2,3,4,5,6,7]}],"puntuacion":{"metodo":"suma","faltantes":{"max_por_subescala":1,"prorrateo":true,"redondeo":"entero","fuente":"[HIPÓTESIS] No hay regla oficial: el manual PHQ/GAD-7 de Pfizer no trata los faltantes. Se aplica la práctica de ensayos clínicos publicados (1 faltante → se imputa la media de los demás; 2 o más, no se calcula) y se marca como regla no oficial."},"pomp":false},"derivadas":[],"rangos":[{"subescala":"total","min":0,"max":4,"etiqueta":"Mínima"},{"subescala":"total","min":5,"max":9,"etiqueta":"Leve"},{"subescala":"total","min":10,"max":14,"etiqueta":"Moderada"},{"subescala":"total","min":15,"max":21,"etiqueta":"Grave"}],"rangos_fuente":"Spitzer et al. (2006), tabla en claude/app-piloto-documentacion-tests.md §3","cortes":[{"id":"habitual","subescala":"total","mayor_o_igual":10,"fuente":"Spitzer et al. (2006): ≥ 10 (S 89 %, E 82 %)"}],"riesgo":{"items":[],"umbral_mayor_que":0},"preguntas_extra":[],"pie":"Desarrollado por los doctores Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke y colaboradores, con una beca otorgada por Pfizer Inc. No se necesita autorización para su reproducción, traducción, muestra o distribución."}],"pantallas_app":{"inicio_titulo":"Antes de empezar","inicio":["Esto es una prueba personal, no un diagnóstico. Los cuestionarios son herramientas de cribado: un número alto solo indica que puede merecer la pena comentarlo con un profesional."],"inicio_lista":["Responde según cómo has estado de verdad, no como te gustaría estar.","Puedes saltarte cualquier pregunta o parar cuando quieras.","Puedes añadir un comentario a cualquier pregunta. Si una frase no se entiende o ninguna opción encaja, márcalo: también es un dato útil.","Algunas preguntas tratan sobre pensamientos de muerte o de hacerte daño. Si respondes algo distinto de «nunca» en ellas, la app parará y te mostrará teléfonos de ayuda."],"pausa0":"Ya está la parte de personalidad. Ahora vienen preguntas sobre **cómo has estado estos últimos días**.","final":["Has terminado. Gracias.","Tus resultados se muestran como puntuaciones, con el rango de referencia de cada cuestionario. **No son un diagnóstico.** Si algún resultado está por encima del punto de corte, o si algo de lo que has respondido te preocupa, coméntalo con tu médico de cabecera o con un psicólogo.","Si en algún momento piensas en hacerte daño: **024** (24 h, gratuito). Emergencias: **112**."]}};

var Nucleo = (function () {
  "use strict";

  function validarTest(t) {
    var e = [];
    ["id", "version", "nombre", "fuente", "instrucciones", "escala", "opciones", "items", "subescalas", "puntuacion", "riesgo", "pie"]
      .forEach(function (k) { if (t[k] === undefined) e.push("falta campo " + k); });
    if (e.length) return e;
    if (!t.fuente.cita || t.fuente.uso_comercial === undefined) e.push("fuente incompleta");
    if (!t.puntuacion.faltantes || !t.puntuacion.faltantes.fuente) e.push("regla de faltantes sin fuente");
    var vals = t.opciones.map(function (o) { return o.valor; });
    if (new Set(vals).size !== vals.length) e.push("valores de opción repetidos");
    if (Math.min.apply(null, vals) !== t.escala.min || Math.max.apply(null, vals) !== t.escala.max) e.push("escala no coincide con opciones");
    t.items.forEach(function (it, i) {
      if (it.n !== i + 1) e.push("ítems mal numerados en posición " + (i + 1));
      if (!it.texto || typeof it.texto !== "string") e.push("ítem " + it.n + " sin texto");
    });
    var N = t.items.length, usados = {};
    t.subescalas.forEach(function (s) {
      s.items.forEach(function (n) {
        if (n < 1 || n > N) e.push("subescala " + s.id + " usa ítem inexistente " + n);
        if (t.id === "mini-ipip") { if (usados[n]) e.push("ítem " + n + " en dos rasgos"); usados[n] = true; }
      });
    });
    t.riesgo.items.forEach(function (n) {
      if (n < 1 || n > N) e.push("ítem de riesgo inexistente " + n);
      else if (!t.items[n - 1].riesgo) e.push("ítem " + n + " en riesgo.items pero sin marca riesgo:true");
    });
    t.items.forEach(function (it) { if (it.riesgo && t.riesgo.items.indexOf(it.n) < 0) e.push("ítem " + it.n + " marcado riesgo pero no está en riesgo.items"); });
    var porSub = {};
    (t.rangos || []).forEach(function (r) { (porSub[r.subescala] = porSub[r.subescala] || []).push(r); });
    Object.keys(porSub).forEach(function (sid) {
      var s = t.subescalas.filter(function (x) { return x.id === sid; })[0];
      if (!s) { e.push("rango para subescala inexistente " + sid); return; }
      var lo = s.items.length * t.escala.min, hi = s.items.length * t.escala.max;
      var rs = porSub[sid].slice().sort(function (a, b) { return a.min - b.min; });
      if (rs[0].min !== lo) e.push("rangos de " + sid + " no empiezan en " + lo);
      if (rs[rs.length - 1].max !== hi) e.push("rangos de " + sid + " no terminan en " + hi);
      for (var i = 1; i < rs.length; i++) if (rs[i].min !== rs[i - 1].max + 1) e.push("hueco o solape en rangos de " + sid + " en " + rs[i].min);
    });
    return e;
  }

  function comprobarRespuestas(t, resp) {
    if (!Array.isArray(resp) || resp.length !== t.items.length)
      throw new Error(t.id + ": se esperan " + t.items.length + " respuestas, llegan " + (resp && resp.length));
    var vals = t.opciones.map(function (o) { return o.valor; });
    resp.forEach(function (r, i) {
      if (r === null) return;
      if (typeof r !== "number" || vals.indexOf(r) < 0) throw new Error(t.id + ": valor no válido " + JSON.stringify(r) + " en ítem " + (i + 1));
    });
  }

  function valorPuntuado(t, n, r) {
    if (r === null || r === undefined) return null;
    return t.items[n - 1].inverso ? (t.escala.min + t.escala.max - r) : r;
  }

  function puntuar(t, resp) {
    comprobarRespuestas(t, resp);
    var out = { test: t.id, version: t.version, subescalas: {}, derivadas: {}, riesgo: evaluarRiesgo(t, resp) };
    var reg = t.puntuacion.faltantes;
    t.subescalas.forEach(function (s) {
      var vs = s.items.map(function (n) { return valorPuntuado(t, n, resp[n - 1]); });
      var falt = vs.filter(function (v) { return v === null; }).length;
      var min = s.items.length * t.escala.min, max = s.items.length * t.escala.max;
      var r = { nombre: s.nombre, faltantes: falt, min: min, max: max, puntuacion: null, calculable: false, prorrateado: false, bruta: null };
      var resp_ = vs.filter(function (v) { return v !== null; });
      var suma = resp_.reduce(function (a, b) { return a + b; }, 0);
      r.bruta = suma;
      if (falt === 0) { r.puntuacion = suma; }
      else if (falt <= reg.max_por_subescala && reg.prorrateo && resp_.length > 0) {
        var p = (suma / resp_.length) * s.items.length;
        r.puntuacion = reg.redondeo === "entero" ? Math.round(p) : p;
        r.prorrateado = true;
        r.sin_redondear = p;
      }
      r.calculable = r.puntuacion !== null;
      if (r.calculable) {
        if (t.puntuacion.pomp) r.pomp = (r.puntuacion - min) / (max - min) * 100;
        var rg = (t.rangos || []).filter(function (x) { return x.subescala === s.id && r.puntuacion >= x.min && r.puntuacion <= x.max; })[0];
        r.rango = rg ? rg.etiqueta : null;
        r.cortes = (t.cortes || []).filter(function (c) { return c.subescala === s.id; }).map(function (c) {
          return { id: c.id, valor: c.mayor_o_igual, supera: r.puntuacion >= c.mayor_o_igual, fuente: c.fuente };
        });
      }
      out.subescalas[s.id] = r;
    });
    (t.derivadas || []).forEach(function (d) {
      if (d.tipo === "invertir_subescala") {
        var b = out.subescalas[d.de];
        out.derivadas[d.id] = b.calculable ? (b.min + b.max - b.puntuacion) : null;
      } else throw new Error("tipo de derivada desconocido: " + d.tipo);
    });
    return out;
  }

  function evaluarRiesgo(t, resp) {
    var disparados = [], sinResponder = [];
    t.riesgo.items.forEach(function (n) {
      var v = resp[n - 1];
      if (v === null || v === undefined) sinResponder.push(n);
      else if (v > t.riesgo.umbral_mayor_que) disparados.push(n);
    });
    return { disparar: disparados.length > 0, items: disparados, sin_responder: sinResponder };
  }

  function esRiesgo(t, n, v) {
    return t.riesgo.items.indexOf(n) >= 0 && v !== null && v !== undefined && v > t.riesgo.umbral_mayor_que;
  }

  return { validarTest: validarTest, puntuar: puntuar, evaluarRiesgo: evaluarRiesgo, valorPuntuado: valorPuntuado, esRiesgo: esRiesgo };
})();



var Analisis = (function () {
  "use strict";

  // ---------- Parámetros (cada uno con su origen) ----------
  var P = {
    RAPIDA_MS: 2000,          // Huang et al. (2012): 2 s por ítem
    SALTO_SESION_MS: 30 * 60 * 1000, // [DECISIÓN] > 30 min sin eventos = sesión nueva
    DIVERGENCIA: 2,           // arquitectura: aviso si divergen ≥ 2 puntos normalizados (escala 0–4) [INFERENCIA sobre la unidad]
    PAR_INCONGRUENTE: 3       // [HIPÓTESIS] directo vs inverso del mismo rasgo con ≥ 3 puntos de diferencia tras invertir
  };

  var FUENTES = {
    huang: "Huang, Curran, Keeney, Poposki y DeShon (2012). Detecting and deterring insufficient effort responding to surveys. J Bus Psychol 27:99–114. doi:10.1007/s10869-011-9231-8",
    paginatiempo: "The Quick and the Careless: the construct validity of page time as a measure of insufficient effort responding to surveys. Organizational Research Methods. doi:10.1177/10944281211056520",
    ipipval: "IPIP, «Validity» indices for IPIP measures: https://ipip.ori.org/newValidity.htm",
    ipipscore: "IPIP, Converting IPIP item responses to scale scores: https://ipip.ori.org/newScoringInstructions.htm",
    mm2018: "Martínez-Molina y Arias (2018). PeerJ 6:e5542. doi:10.7717/peerj.5542",
    kotov: "Kotov, Gamez, Schmidt y Watson (2010). Linking «big» personality traits to anxiety, depressive, and substance use disorders: a meta-analysis. Psychol Bull 136(5):768–821. doi:10.1037/a0020327",
    jeronimus: "Jeronimus et al. (2016). Neuroticism's prospective association with mental disorders halves after adjustment for baseline symptoms and psychiatric history… Psychol Med. PMID 27523506",
    apa: "APA, DSM-5-TR Online Assessment Measures: Severity Measure for Depression—Adult (PHQ-9 adaptado), instrucciones de prorrateo",
    pfizer: "Instruction Manual: Instructions for Patient Health Questionnaire (PHQ) and GAD-7 Measures (Pfizer). https://manual.jointcommission.org/pub/BHCInstruments/RomInstr00054/instructions_PHQ.pdf",
    phqde: "Psychometric evaluation and community norms of the PHQ-9, based on a representative German sample (2024). Front Psychiatry. doi:10.3389/fpsyt.2024.1483782",
    gadde: "Psychometric evaluation and community norms of the GAD-7, based on a representative German sample (2025). Front Psychol 16:1526181. doi:10.3389/fpsyg.2025.1526181",
    psyctc: "PSYCTC glossary, PHQ-9 y GAD-7 (C. Evans): https://www.psyctc.org/psyctc/glossary2/",
    doc: "claude/app-piloto-documentacion-tests.md (proyecto)"
  };

  // Pares de ítems que tocan el mismo contenido en test distintos.
  // f(raw) devuelve el valor en sentido «más síntoma / más tensión» en escala 0–4.
  var PARES = [
    { id: "relajacion", tema: "Relajación / tensión",
      a: { test: "mini-ipip", n: 9, f: function (r) { return 5 - r; }, lectura: "invertido: 1 «nada de acuerdo con estar relajado» = 4" },
      b: { test: "gad-7", n: 4, f: function (r) { return r * 4 / 3; } },
      explica: "Mismo contenido, distinto marco: el Mini-IPIP pregunta «en general» (rasgo) y el GAD-7 por los últimos 14 días (estado). Si divergen, lo esperable es que el estado reciente se aleje del habitual; también puede indicar que el ítem negado/positivo se leyó al revés (hallazgo de S01 con ítems negados)." },
    { id: "tristeza", tema: "Tristeza / ánimo decaído",
      a: { test: "mini-ipip", n: 19, f: function (r) { return 5 - r; }, lectura: "invertido: «rara vez me siento triste» nada de acuerdo = 4" },
      b: { test: "phq-9", n: 2, f: function (r) { return r * 4 / 3; } },
      explica: "Rasgo frente a estado de 2 semanas. Un episodio reciente puede subir el PHQ-9 sin que la persona se describa como triste en general, y al revés. La formulación «Rara vez…» combina frecuencia y negación implícita: es un ítem de lectura costosa." },
    { id: "irritabilidad", tema: "Irritabilidad",
      a: { test: "mini-ipip", n: 14, f: function (r) { return r - 1; }, lectura: "directo" },
      b: { test: "gad-7", n: 6, f: function (r) { return r * 4 / 3; } },
      explica: "«Me molesto fácilmente» (rasgo, faceta de ira del Neuroticismo) frente a «Enfadarse o irritarse con facilidad» (últimos 14 días). Redacción casi idéntica: una gran diferencia apunta a cambio reciente o a que el marco temporal no se ha tenido en cuenta." },
    { id: "inquietud", tema: "Inquietud motora",
      a: { test: "gad-7", n: 5, f: function (r) { return r * 4 / 3; }, lectura: "directo" },
      b: { test: "phq-9", n: 8, f: function (r) { return r * 4 / 3; } },
      explica: "Solapamiento descrito en la documentación (§8). El ítem 8 del PHQ-9 es doble: puntúa igual la lentitud que la agitación. Si el GAD-7 5 es bajo y el PHQ-9 8 alto, puede ser por enlentecimiento, no por inquietud: hay que leer el comentario." }
  ];

  function intervalos(ev) {
    var out = [], cur = null, ocultoDesde = null;
    ev.forEach(function (e) {
      if (e.tipo === "pantalla") {
        if (cur) { cur.fin = e.t; if (ocultoDesde !== null) { cur.oculto += e.t - ocultoDesde; ocultoDesde = null; } out.push(cur); }
        cur = { paso: e.paso, inicio: e.t, fin: null, oculto: 0, salidas: 0 };
      } else if (e.tipo === "oculto" && cur) { if (ocultoDesde === null) { ocultoDesde = e.t; cur.salidas++; } }
      else if (e.tipo === "visible" && cur && ocultoDesde !== null) { cur.oculto += e.t - ocultoDesde; ocultoDesde = null; }
    });
    if (cur) { var last = ev[ev.length - 1].t; cur.fin = last; if (ocultoDesde !== null) cur.oculto += last - ocultoDesde; out.push(cur); }
    out.forEach(function (i) { i.activo = Math.max(0, i.fin - i.inicio - i.oculto); });
    return out;
  }

  function sesiones(ev) {
    var s = [], cur = null;
    ev.forEach(function (e) {
      if (!cur || e.t - cur.fin > P.SALTO_SESION_MS) { cur = { inicio: e.t, fin: e.t, eventos: 0 }; s.push(cur); }
      cur.fin = e.t; cur.eventos++;
    });
    return s;
  }

  function mediana(a) { if (!a.length) return null; var b = a.slice().sort(function (x, y) { return x - y; }); var m = b.length >> 1; return b.length % 2 ? b[m] : (b[m - 1] + b[m]) / 2; }
  function media(a) { return a.length ? a.reduce(function (x, y) { return x + y; }, 0) / a.length : null; }
  function r1(x) { return x === null || x === undefined ? null : Math.round(x * 10) / 10; }
  function r2(x) { return x === null || x === undefined ? null : Math.round(x * 100) / 100; }

  function analizar(datos, est) {
    var T = {}; datos.tests.forEach(function (t) { T[t.id] = t; });
    var ev = est.eventos || [];
    var ints = intervalos(ev);
    var inf = { generado: new Date().toISOString(), participante: est.participante || "", id: est.id, version_app: est.version, tests: {}, items: {}, calidad: {}, pares: [], rasgo_estado: null, riesgo: [], sesiones: [], contexto: { pre: est.contexto_pre || {}, post: est.contexto_post || {} }, revision: est.revision || {}, dispositivo: null, avisos: [], totales: {} };

    var ini = ev.filter(function (e) { return e.tipo === "sesion_inicio"; })[0];
    inf.dispositivo = ini ? ini.dispositivo : null;

    // Sesiones y contexto temporal
    var dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    inf.sesiones = sesiones(ev).map(function (s) {
      var d = new Date(s.inicio);
      return { inicio: new Date(s.inicio).toISOString(), fin: new Date(s.fin).toISOString(), duracion_min: r1((s.fin - s.inicio) / 60000), dia: dias[d.getDay()], hora_local: d.toTimeString().slice(0, 5), eventos: s.eventos };
    });
    for (var i = 1; i < inf.sesiones.length; i++) {
      inf.sesiones[i].pausa_previa_min = r1((Date.parse(inf.sesiones[i].inicio) - Date.parse(inf.sesiones[i - 1].fin)) / 60000);
    }

    datos.tests.forEach(function (t) {
      var resp = (est.respuestas && est.respuestas[t.id]) || t.items.map(function () { return null; });
      var punt = Nucleo.puntuar(t, resp);
      var itemsInf = [];
      var latencias = [];
      var diasTest = {};
      t.items.forEach(function (it) {
        var paso = "item:" + t.id + ":" + it.n;
        var vis = ints.filter(function (x) { return x.paso === paso; });
        var rs = ev.filter(function (e) { return e.tipo === "respuesta" && e.test === t.id && e.n === it.n; });
        var lat = null;
        if (rs.length && vis.length) {
          var cont = vis.filter(function (x) { return rs[0].t >= x.inicio && rs[0].t <= x.fin; })[0] || vis[0];
          lat = rs[0].t - cont.inicio;
          latencias.push(lat);
        }
        rs.forEach(function (e) { diasTest[new Date(e.t).toDateString()] = true; });
        var cambios = rs.filter(function (e) { return e.previo !== null && e.previo !== undefined; }).map(function (e) {
          var vis_i = vis.filter(function (x) { return e.t >= x.inicio && e.t <= x.fin; })[0];
          var visita = vis_i ? vis.indexOf(vis_i) + 1 : null;
          return { de: e.previo, a: e.valor, delta_puntuado: Nucleo.valorPuntuado(t, it.n, e.valor) - Nucleo.valorPuntuado(t, it.n, e.previo), visita: visita, al_volver: visita !== null && visita > 1, desde_revision: !!e.desde_revision, t: new Date(e.t).toISOString() };
        });
        var com = ev.filter(function (e) { return e.tipo === "comentario" && e.test === t.id && e.n === it.n; });
        var marcasEv = ev.filter(function (e) { return e.tipo === "marca" && e.test === t.id && e.n === it.n; });
        var marcas = (est.marcas && est.marcas[t.id] && est.marcas[t.id][it.n]) || {};
        var raw = resp[it.n - 1];
        var opc = t.opciones.filter(function (o) { return o.valor === raw; })[0];
        var rev = est.revision && est.revision[t.id] && est.revision[t.id][it.n];
        var saltos = ev.filter(function (e) { return e.tipo === "saltar" && e.test === t.id && e.n === it.n; }).length;
        itemsInf.push({
          n: it.n, texto: it.texto, inverso: !!it.inverso, riesgo: !!it.riesgo,
          respuesta: raw, etiqueta: opc ? opc.etiqueta : null, puntuado: Nucleo.valorPuntuado(t, it.n, raw),
          visitas: vis.length, tiempo_activo_s: r1(vis.reduce(function (a, x) { return a + x.activo; }, 0) / 1000),
          latencia_s: lat === null ? null : r1(lat / 1000), rapida: lat !== null && lat < P.RAPIDA_MS,
          secuencia: rs.map(function (e) { return e.valor; }), cambios: cambios,
          salidas_app: vis.reduce(function (a, x) { return a + x.salidas; }, 0),
          comentario: (est.comentarios && est.comentarios[t.id] && est.comentarios[t.id][it.n]) || "",
          comentario_versiones: com.map(function (e) { return { t: new Date(e.t).toISOString(), texto: e.texto }; }),
          no_entiendo: !!marcas.no_entiendo, no_encaja: !!marcas.no_encaja,
          marcas_cambiadas: marcasEv.length,
          ayuda_abierta: ev.filter(function (e) { return e.tipo === "ayuda" && e.test === t.id && e.n === it.n; }).length,
          saltado_veces: saltos,
          revision: rev || null
        });
      });

      // Calidad de respuesta
      var raws = resp;
      var run = 0, maxRun = 0, prev;
      raws.forEach(function (r) { if (r === null) { run = 0; prev = undefined; return; } run = (r === prev) ? run + 1 : 1; prev = r; if (run > maxRun) maxRun = run; });
      var resp_ = raws.filter(function (r) { return r !== null; });
      var extremos = resp_.filter(function (r) { return r === t.escala.min || r === t.escala.max; }).length;
      var cambiosTot = itemsInf.reduce(function (a, x) { return a + x.cambios.length; }, 0);
      var tiempoTest = itemsInf.reduce(function (a, x) { return a + (x.tiempo_activo_s || 0); }, 0);
      inf.calidad[t.id] = {
        respondidos: resp_.length, sin_responder: raws.length - resp_.length,
        tiempo_activo_min: r1(tiempoTest / 60), latencia_mediana_s: r1(mediana(latencias) === null ? null : mediana(latencias) / 1000),
        latencia_media_s: r1(media(latencias) === null ? null : media(latencias) / 1000),
        rapidas: itemsInf.filter(function (x) { return x.rapida; }).map(function (x) { return x.n; }),
        cadena_igual_max: maxRun,
        extremos_pct: resp_.length ? Math.round(extremos / resp_.length * 100) : null,
        media_bruta: r2(media(resp_)),
        cambios: cambiosTot,
        items_con_cambio: itemsInf.filter(function (x) { return x.cambios.length; }).map(function (x) { return x.n; }),
        cambios_al_volver: itemsInf.reduce(function (a, x) { return a + x.cambios.filter(function (c) { return c.al_volver; }).length; }, 0),
        comentados: itemsInf.filter(function (x) { return x.comentario; }).map(function (x) { return x.n; }),
        no_entiendo: itemsInf.filter(function (x) { return x.no_entiendo; }).map(function (x) { return x.n; }),
        no_encaja: itemsInf.filter(function (x) { return x.no_encaja; }).map(function (x) { return x.n; }),
        salidas_app: itemsInf.reduce(function (a, x) { return a + x.salidas_app; }, 0),
        dias_distintos: Object.keys(diasTest).length
      };
      if (inf.calidad[t.id].dias_distintos > 1 && t.id !== "mini-ipip") inf.avisos.push(t.nombre + ": respondido en " + inf.calidad[t.id].dias_distintos + " días distintos. El marco temporal («" + t.marco_temporal + "») se desplaza entre respuestas.");
      if (inf.calidad[t.id].sin_responder) inf.avisos.push(t.nombre + ": " + inf.calidad[t.id].sin_responder + " ítem(s) sin responder (" + itemsInf.filter(function (x) { return x.respuesta === null; }).map(function (x) { return x.n; }).join(", ") + ").");

      var extra = {};
      if (t.id === "mini-ipip") {
        var ref = t.referencia.rasgos;
        extra.referencia = {};
        Object.keys(ref).forEach(function (k) {
          var s = punt.subescalas[k], R = ref[k];
          var sem = R.de * Math.sqrt(1 - R.alfa);
          extra.referencia[k] = { m: R.m, de: R.de, alfa: R.alfa, sem: r2(sem),
            z: s.calculable ? r2((s.puntuacion - R.m) / R.de) : null,
            ic90: s.calculable ? [r1(Math.max(4, s.puntuacion - 1.645 * sem)), r1(Math.min(20, s.puntuacion + 1.645 * sem))] : null };
        });
        // Antónimos psicométricos: pares directo/inverso del mismo rasgo
        var paresAnt = [["E", 1, 6], ["E", 11, 16], ["A", 2, 7], ["A", 12, 17], ["C", 3, 8], ["C", 13, 18], ["N", 4, 9], ["N", 14, 19], ["I", 5, 20]];
        var brutos = [];
        extra.antonimos = paresAnt.map(function (p) {
          var d = resp[p[1] - 1], iv = resp[p[2] - 1];
          if (d === null || iv === null) return { rasgo: p[0], directo: p[1], inverso: p[2], calculable: false };
          brutos.push(d, iv);
          var sd = d, si = 6 - iv;
          return { rasgo: p[0], directo: p[1], inverso: p[2], bruto_directo: d, bruto_inverso: iv, puntuado_directo: sd, puntuado_inverso: si, diferencia: Math.abs(sd - si), incongruente: Math.abs(sd - si) >= P.PAR_INCONGRUENTE, calculable: true };
        });
        extra.aquiescencia = brutos.length ? r2(media(brutos) - 3) : null;
      }
      if (t.id === "phq-9") {
        var ge2 = []; for (var k = 1; k <= 8; k++) if (resp[k - 1] !== null && resp[k - 1] >= 2) ge2.push(k);
        if (resp[8] !== null && resp[8] >= 1) ge2.push(9);
        var nucleo12 = (resp[0] !== null && resp[0] >= 2) || (resp[1] !== null && resp[1] >= 2);
        extra.patron = { items_presentes: ge2, n_presentes: ge2.length, item1o2_presente: nucleo12,
          cumple_patron_mayor: ge2.length >= 5 && nucleo12,
          cumple_patron_otro: ge2.length >= 2 && ge2.length <= 4 && nucleo12 };
        extra.phq2 = (resp[0] === null || resp[1] === null) ? null : resp[0] + resp[1];
        var dif = est.extras && est.extras["phq-9"] && est.extras["phq-9"].dificultad;
        var pe = t.preguntas_extra[0];
        extra.dificultad = (dif === null || dif === undefined) ? null : pe.opciones.filter(function (o) { return o.valor === dif; })[0].etiqueta;
      }
      if (t.id === "gad-7") { extra.gad2 = (resp[0] === null || resp[1] === null) ? null : resp[0] + resp[1]; }

      inf.tests[t.id] = { nombre: t.nombre, marco: t.marco_temporal, puntuacion: punt, extra: extra, regla_faltantes: t.puntuacion.faltantes.fuente };
      inf.items[t.id] = itemsInf;

      // Riesgo
      t.riesgo.items.forEach(function (n) {
        var evs = ev.filter(function (e) { return e.tipo === "riesgo_disparado" && e.test === t.id && e.n === n; });
        inf.riesgo.push({ test: t.id, n: n, texto: t.items[n - 1].texto, valor_final: resp[n - 1], veces_disparado: evs.length,
          sin_responder: resp[n - 1] === null, decision_revision: rev2(est, t.id, n) });
      });
    });

    function rev2(est, tid, n) { var r = est.revision && est.revision[tid] && est.revision[tid][n]; return r || null; }

    // Pares entre test
    PARES.forEach(function (p) {
      var ra = est.respuestas && est.respuestas[p.a.test] ? est.respuestas[p.a.test][p.a.n - 1] : null;
      var rb = est.respuestas && est.respuestas[p.b.test] ? est.respuestas[p.b.test][p.b.n - 1] : null;
      var va = ra === null || ra === undefined ? null : p.a.f(ra);
      var vb = rb === null || rb === undefined ? null : p.b.f(rb);
      inf.pares.push({ id: p.id, tema: p.tema, a: { test: p.a.test, n: p.a.n, texto: T[p.a.test].items[p.a.n - 1].texto, bruto: ra, norm: r2(va), lectura: p.a.lectura },
        b: { test: p.b.test, n: p.b.n, texto: T[p.b.test].items[p.b.n - 1].texto, bruto: rb, norm: r2(vb) },
        diferencia: va === null || vb === null ? null : r2(Math.abs(va - vb)),
        diverge: va !== null && vb !== null && Math.abs(va - vb) >= P.DIVERGENCIA, explica: p.explica });
    });

    // Rasgo frente a estado
    var ip = inf.tests["mini-ipip"].puntuacion, ph = inf.tests["phq-9"].puntuacion.subescalas.total, ga = inf.tests["gad-7"].puntuacion.subescalas.total;
    inf.rasgo_estado = {
      neuroticismo_pomp: ip.subescalas.N.calculable ? r1(ip.subescalas.N.pomp) : null,
      responsabilidad_pomp: ip.subescalas.C.calculable ? r1(ip.subescalas.C.pomp) : null,
      extraversion_pomp: ip.subescalas.E.calculable ? r1(ip.subescalas.E.pomp) : null,
      phq9_pomp: ph.calculable ? r1(ph.puntuacion / 27 * 100) : null,
      gad7_pomp: ga.calculable ? r1(ga.puntuacion / 21 * 100) : null
    };

    // Contexto: cambio de ánimo antes/después
    var pre = inf.contexto.pre.animo, post = inf.contexto.post.animo;
    inf.contexto.delta_animo = (typeof pre === "number" && typeof post === "number") ? post - pre : null;

    // Totales del registro
    var resps = ev.filter(function (e) { return e.tipo === "respuesta"; });
    inf.totales = {
      eventos: ev.length, respuestas_registradas: resps.length,
      cambios: resps.filter(function (e) { return e.previo !== null && e.previo !== undefined; }).length,
      atras: ev.filter(function (e) { return e.tipo === "atras"; }).length,
      saltos: ev.filter(function (e) { return e.tipo === "saltar"; }).length,
      pausas: ev.filter(function (e) { return e.tipo === "pausa"; }).length,
      salidas_app: ev.filter(function (e) { return e.tipo === "oculto"; }).length,
      ayudas: ev.filter(function (e) { return e.tipo === "ayuda"; }).length,
      riesgo_disparos: ev.filter(function (e) { return e.tipo === "riesgo_disparado"; }).length,
      duracion_total_min: ev.length ? r1((ev[ev.length - 1].t - ev[0].t) / 60000) : null,
      tiempo_activo_min: r1(ints.filter(function (x) { return x.paso.indexOf("vista:") !== 0; }).reduce(function (a, x) { return a + x.activo; }, 0) / 60000),
      tiempo_en_pausa_min: r1(ints.filter(function (x) { return x.paso === "vista:pausado"; }).reduce(function (a, x) { return a + x.fin - x.inicio; }, 0) / 60000)
    };
    inf.riesgo.forEach(function (r) {
      if (r.sin_responder) inf.avisos.unshift("Ítem de riesgo sin responder: " + r.test + " ítem " + r.n + ". El protocolo no se ha activado; requiere que lo revise el responsable.");
      if (r.veces_disparado) inf.avisos.unshift("Protocolo de riesgo activado " + r.veces_disparado + " vez/veces (" + r.test + " ítem " + r.n + ", valor final " + r.valor_final + "). Según el manual del PHQ, la decisión sobre el riesgo real requiere entrevista clínica.");
    });
    return inf;
  }

  // ---------- Informe HTML (pantalla y correo) ----------
  function esc(s) { if (typeof s === "number") s = String(s).replace(".", ","); return String(s === null || s === undefined ? "—" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function lista(a) { return a && a.length ? a.join(", ") : "ninguno"; }
  function tabla(cab, filas) {
    return '<table style="border-collapse:collapse;width:100%;font-size:13px;margin:6px 0 12px">' +
      "<tr>" + cab.map(function (c) { return '<th style="text-align:left;border-bottom:2px solid #999;padding:3px 5px;vertical-align:bottom">' + c + "</th>"; }).join("") + "</tr>" +
      filas.map(function (f) { return "<tr>" + f.map(function (c) { return '<td style="border-bottom:1px solid #ddd;padding:3px 5px;vertical-align:top">' + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
  }
  function caja(titulo, html) { return '<div style="border-left:3px solid #6b7fa8;background:#f3f5fa;padding:8px 12px;margin:8px 0 14px;font-size:13px;color:#222"><b>' + titulo + "</b><br>" + html + "</div>"; }
  function h2(t) { return '<h2 style="font-size:18px;margin:26px 0 6px;border-bottom:1px solid #ccc;padding-bottom:3px">' + t + "</h2>"; }
  function h3(t) { return '<h3 style="font-size:15px;margin:16px 0 4px">' + t + "</h3>"; }
  function fmtFecha(iso) { if (!iso) return "—"; var d = new Date(iso); return d.toLocaleDateString("es-ES") + " " + d.toTimeString().slice(0, 5); }
  function cambiosTxt(it) { return it.cambios.length ? it.secuencia.join(" → ") + it.cambios.map(function (c) { return c.al_volver ? " (cambio al volver" + (c.desde_revision ? ", desde revisión" : "") + ")" : ""; }).join("") : ""; }

  function informeHTML(datos, inf) {
    var T = {}; datos.tests.forEach(function (t) { T[t.id] = t; });
    var o = [];
    o.push('<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#1d1d1b;max-width:900px;line-height:1.45">');
    o.push('<h1 style="font-size:21px;margin:0 0 4px">Hoja de resultados · Piloto de test</h1>');
    o.push('<p style="color:#555;margin:0 0 10px">Participante: <b>' + esc(inf.participante || "sin código") + "</b> · Registro " + esc(inf.id) + " · Generado " + fmtFecha(inf.generado) + "</p>");
    o.push(caja("Qué es esta hoja", "Puntuaciones de cribado con su rango de referencia y su fuente. <b>No es un diagnóstico.</b> Las explicaciones describen fenómenos de medida para estudiantes; no son una interpretación clínica de esta persona. Lo marcado [HIPÓTESIS] o [INFERENCIA] no tiene fuente primaria directa."));

    if (inf.avisos.length) { o.push(h2("Avisos")); o.push("<ul>" + inf.avisos.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("") + "</ul>"); }

    // 1. Registro
    o.push(h2("1. Registro: cuándo, cómo y en qué condiciones"));
    o.push(tabla(["Sesión", "Inicio", "Día", "Duración", "Pausa previa"], inf.sesiones.map(function (s, i) { return [i + 1, fmtFecha(s.inicio), s.dia, esc(s.duracion_min) + " min", s.pausa_previa_min !== undefined ? esc(s.pausa_previa_min) + " min" : "—"]; })));
    var tt = inf.totales;
    o.push(tabla(["Dato", "Valor"], [
      ["Duración total (primer a último evento)", esc(tt.duracion_total_min) + " min"], ["Tiempo activo en pantalla (sin pausas)", esc(tt.tiempo_activo_min) + " min"], ["Tiempo en pausa", esc(tt.tiempo_en_pausa_min) + " min"],
      ["Respuestas registradas (incluye cambios)", tt.respuestas_registradas], ["Cambios de respuesta", tt.cambios], ["Vueltas atrás", tt.atras],
      ["Ítems saltados (veces)", tt.saltos], ["Pausas", tt.pausas], ["Salidas de la app durante el test", tt.salidas_app], ["Ayudas abiertas", tt.ayudas],
      ["Activaciones del protocolo de riesgo", tt.riesgo_disparos], ["Eventos totales", tt.eventos]]));
    var d = inf.dispositivo || {};
    o.push('<p style="font-size:12px;color:#555">Dispositivo: ' + esc(d.ua) + " · pantalla " + esc(d.pantalla) + " · idioma " + esc(d.idioma) + " · zona horaria " + esc(d.zona) + "</p>");
    var pre = inf.contexto.pre, post = inf.contexto.post;
    o.push(h3("Contexto declarado [APP]"));
    o.push(tabla(["Pregunta", "Antes", "Después"], [
      ["Cómo te encuentras (0–10)", esc(pre.animo), esc(post.animo)], ["Horas dormidas anoche", esc(pre.sueno), ""], ["Dónde estás", esc(pre.lugar), ""], ["Acompañado", esc(pre.acompanado), ""],
      ["Algo tomado hoy que pueda influir", esc(pre.tomado), ""], ["Algo hoy que pueda influir", esc(pre.influye), ""],
      ["¿Alguna pregunta te ha removido?", "", esc(post.removido)], ["¿Alguna pregunta mal planteada?", "", esc(post.mal_planteada)], ["Comentario final", "", esc(post.comentario)]]));
    if (inf.contexto.delta_animo !== null) o.push(caja("Cambio de ánimo antes/después: " + (inf.contexto.delta_animo > 0 ? "+" : "") + inf.contexto.delta_animo, "Responder cuestionarios sobre síntomas puede mover el ánimo del momento (reactividad de la medida). Con una sola persona no se puede separar ese efecto de otros cambios del día [INFERENCIA]."));

    // 2. Resultados por test
    o.push(h2("2. Puntuaciones"));
    var ipT = inf.tests["mini-ipip"], ipS = ipT.puntuacion.subescalas, ref = ipT.extra.referencia;
    o.push(h3("Mini-IPIP · personalidad (" + esc(ipT.marco) + ")"));
    o.push(tabla(["Rasgo", "Puntuación (4–20)", "POMP", "Referencia M (DE)", "z", "Intervalo 90 %", "α ref."], ["E", "A", "C", "N", "I"].map(function (k) {
      var s = ipS[k], R = ref[k];
      return [s.nombre, s.calculable ? s.puntuacion : "no calculable (" + s.faltantes + " faltante)", s.calculable ? esc(r1(s.pomp)) + " %" : "—", esc(R.m) + " (" + esc(R.de) + ")", esc(R.z), R.ic90 ? esc(R.ic90[0]) + "–" + esc(R.ic90[1]) : "—", esc(R.alfa)];
    })));
    o.push("<p>Estabilidad emocional (24 − N): <b>" + esc(ipT.puntuacion.derivadas.estabilidad) + "</b></p>");
    o.push(caja("Cómo leer el Mini-IPIP", "Solo interpretación relativa: sin cortes ni tipos. <b>POMP</b> = (puntuación − 4) / 16 × 100 permite comparar rasgos entre sí. <b>z</b> compara con la muestra de referencia (" + esc(T["mini-ipip"].referencia.fuente) + "): no es población española ni general, así que z indica posición respecto a ese grupo, no respecto a «la gente». <b>Intervalo 90 %</b> = puntuación ± 1,645 × EEM, con EEM = DE × √(1 − α) (teoría clásica de los test): con 4 ítems el margen es amplio, sobre todo en Neuroticismo (α = 0,65). Dos rasgos cuyos intervalos se solapan no deben leerse como distintos. Fuente: " + FUENTES.mm2018 + "."));

    ["phq-9", "gad-7"].forEach(function (id) {
      var t = inf.tests[id], s = t.puntuacion.subescalas.total, tdef = T[id];
      o.push(h3(t.nombre + " (" + esc(t.marco) + ")"));
      var filas = [["Puntuación", s.calculable ? "<b>" + s.puntuacion + "</b> de " + s.max + (s.prorrateado ? " (prorrateada desde " + s.bruta + " con " + s.faltantes + " faltante/s; sin redondear " + r2(s.sin_redondear) + ")" : "") : "no calculable (" + s.faltantes + " faltantes)"],
        ["Rango de referencia", s.calculable ? esc(s.rango) + " · " + tdef.rangos.map(function (r) { return r.min + "–" + r.max + " " + r.etiqueta; }).join(" · ") : "—"],
        ["Corte", s.calculable ? s.cortes.map(function (c) { return "≥ " + c.valor + ": " + (c.supera ? "por encima" : "por debajo") + " (" + esc(c.fuente) + ")"; }).join("<br>") : "—"],
        ["Regla de faltantes", esc(t.regla_faltantes)]];
      if (id === "phq-9") {
        var pt = t.extra.patron;
        filas.push(["Ítems presentes (≥ «Más de la mitad de los días»; ítem 9 si > 0)", lista(pt.items_presentes) + " (" + pt.n_presentes + ")"]);
        filas.push(["PHQ-2 (ítems 1 + 2)", esc(t.extra.phq2)]);
        filas.push(["Pregunta de dificultad (no puntúa)", esc(t.extra.dificultad)]);
      } else filas.push(["GAD-2 (ítems 1 + 2)", esc(t.extra.gad2)]);
      o.push(tabla(["", ""], filas));
    });
    o.push(caja("Cómo leer PHQ-9 y GAD-7", "Son <b>cribado</b>: por encima del corte significa «merece valoración profesional», no «tiene el trastorno». El manual de Pfizer recomienda ≥ 10 en el GAD-7 para evaluación adicional y el corte habitual del PHQ-9 es ≥ 10 (hay otros cortes publicados, como ≥ 8 en atención primaria en España; esta hoja no los aplica). El manual también describe un <b>algoritmo por ítems</b> del PHQ-9: se cuentan los síntomas marcados como «Más de la mitad de los días» o más, y el ítem 9 cuenta siempre que esté presente; el patrón de síndrome depresivo mayor exige 5 o más, con el ítem 1 o el 2 entre ellos. Aquí solo se muestra el recuento, para que el estudiante vea que dos personas con la misma suma pueden tener patrones distintos. En población general alemana (2020–2021, N = 2.519) puntuaron ≥ 10 el 6,07 % en el PHQ-9 y el 4,32 % en el GAD-7; la media del GAD-7 fue 2,18 (DE 3,28). Fuentes: " + FUENTES.pfizer + "; " + FUENTES.phqde + "; " + FUENTES.gadde + "."));
    o.push(caja("Ítems faltantes y prorrateo", "Prorratear es suponer que el ítem que falta se habría respondido como la media de los demás. Funciona si falta poco y al azar; falla si se salta precisamente lo que más pesa (por ejemplo, el ítem 9). PHQ-9: regla publicada por la APA (hasta 2 faltantes). GAD-7: no existe regla oficial; se aplica la práctica de ensayos clínicos y se marca [HIPÓTESIS]. Mini-IPIP: el IPIP no da regla; con 4 ítems por rasgo no se prorratea. Fuentes: " + FUENTES.apa + "; " + FUENTES.pfizer + "; " + FUENTES.ipipscore + "."));

    // 3. Ítem a ítem
    o.push(h2("3. Ítem a ítem"));
    datos.tests.forEach(function (t) {
      o.push(h3(t.nombre));
      o.push(tabla(["#", "Ítem", "Respuesta", "Punt.", "Latencia", "Tiempo", "Cambios", "Marcas", "Comentario"], inf.items[t.id].map(function (it) {
        var m = [];
        if (it.inverso) m.push("inverso"); if (it.riesgo) m.push("<b>riesgo</b>"); if (it.no_entiendo) m.push("no entiendo"); if (it.no_encaja) m.push("ninguna encaja");
        if (it.rapida) m.push("&lt; 2 s"); if (it.ayuda_abierta) m.push("ayuda ×" + it.ayuda_abierta); if (it.salidas_app) m.push("salió de la app ×" + it.salidas_app); if (it.saltado_veces) m.push("saltado ×" + it.saltado_veces);
        if (it.revision) m.push("revisión: " + esc(it.revision.decision) + (it.revision.motivo ? " («" + esc(it.revision.motivo) + "»)" : ""));
        var com = esc(it.comentario || "");
        if (it.comentario_versiones.length > 1) com += '<br><span style="color:#777;font-size:11px">' + it.comentario_versiones.length + " versiones: " + it.comentario_versiones.map(function (v) { return "«" + esc(v.texto) + "»"; }).join(" → ") + "</span>";
        return [it.n, esc(it.texto), it.respuesta === null ? "<i>sin responder</i>" : it.respuesta + " · " + esc(it.etiqueta), esc(it.puntuado), it.latencia_s === null ? "—" : esc(it.latencia_s) + " s", esc(it.tiempo_activo_s) + " s" + (it.visitas > 1 ? " (" + it.visitas + " visitas)" : ""), cambiosTxt(it), m.join(" · "), com];
      })));
    });
    o.push(caja("Qué cuentan los tiempos y los cambios", "<b>Latencia</b>: desde que aparece el ítem hasta la primera respuesta. <b>Tiempo</b>: tiempo activo total en el ítem, sin contar cuando la app estaba en segundo plano. Un <b>cambio</b> registra la secuencia de valores; «al volver» significa que la persona regresó al ítem más tarde. Los cambios y las latencias largas no tienen norma publicada para estos test: se leen como señal de duda o de ítem ambiguo, y se contrastan con el comentario [INFERENCIA]. Fuente del umbral de 2 s: " + FUENTES.huang + "."));

    // 4. Calidad de respuesta
    o.push(h2("4. Calidad de la respuesta"));
    o.push(tabla(["Indicador", "Mini-IPIP", "PHQ-9", "GAD-7"], [
      ["Respondidos / sin responder"].concat(["mini-ipip", "phq-9", "gad-7"].map(function (k) { var c = inf.calidad[k]; return c.respondidos + " / " + c.sin_responder; })),
      ["Tiempo activo"].concat(["mini-ipip", "phq-9", "gad-7"].map(function (k) { return esc(inf.calidad[k].tiempo_activo_min) + " min"; })),
      ["Latencia mediana / media"].concat(["mini-ipip", "phq-9", "gad-7"].map(function (k) { var c = inf.calidad[k]; return esc(c.latencia_mediana_s) + " / " + esc(c.latencia_media_s) + " s"; })),
      ["Ítems respondidos en menos de 2 s"].concat(["mini-ipip", "phq-9", "gad-7"].map(function (k) { return lista(inf.calidad[k].rapidas); })),
      ["Cadena máxima de respuestas iguales"].concat(["mini-ipip", "phq-9", "gad-7"].map(function (k) { return inf.calidad[k].cadena_igual_max; })),
      ["% de respuestas en los extremos"].concat(["mini-ipip", "phq-9", "gad-7"].map(function (k) { return esc(inf.calidad[k].extremos_pct) + " %"; })),
      ["Cambios (de ellos, al volver)"].concat(["mini-ipip", "phq-9", "gad-7"].map(function (k) { var c = inf.calidad[k]; return c.cambios + " (" + c.cambios_al_volver + ")"; })),
      ["Ítems comentados"].concat(["mini-ipip", "phq-9", "gad-7"].map(function (k) { return lista(inf.calidad[k].comentados); })),
      ["«No entiendo» / «ninguna encaja»"].concat(["mini-ipip", "phq-9", "gad-7"].map(function (k) { var c = inf.calidad[k]; return lista(c.no_entiendo) + " / " + lista(c.no_encaja); })),
      ["Días distintos de respuesta"].concat(["mini-ipip", "phq-9", "gad-7"].map(function (k) { return inf.calidad[k].dias_distintos; }))]));
    var ipx = ipT.extra;
    o.push(h3("Antónimos psicométricos del Mini-IPIP (ítem directo frente a inverso del mismo rasgo)"));
    o.push(tabla(["Rasgo", "Directo (bruto)", "Inverso (bruto → puntuado)", "Diferencia", "Incongruente"], ipx.antonimos.map(function (a) {
      return a.calculable ? [a.rasgo, a.directo + ": " + a.bruto_directo, a.inverso + ": " + a.bruto_inverso + " → " + a.puntuado_inverso, a.diferencia, a.incongruente ? "<b>sí</b>" : "no"] : [a.rasgo, a.directo, a.inverso, "—", "falta respuesta"];
    })));
    o.push("<p>Índice de aquiescencia (media bruta de los 18 ítems emparejados − 3): <b>" + esc(ipx.aquiescencia) + "</b> (0 = sin tendencia; positivo = tiende a estar de acuerdo con frases opuestas).</p>");
    o.push(caja("Fenómenos de respuesta", "<b>Respuesta con poco esfuerzo</b>: Huang et al. (2012) evaluaron cuatro índices (tiempo de respuesta, cadenas largas de la misma opción, antónimos psicométricos y fiabilidad individual); el criterio de 2 s por ítem se ha validado para el tiempo por página (" + FUENTES.paginatiempo + "). <b>Cadenas iguales</b>: en PHQ-9 y GAD-7 una fila de «Nunca» es esperable en alguien sin síntomas; en el Mini-IPIP, con ítems en ambos sentidos, una cadena larga es más sospechosa. <b>Antónimos</b>: si alguien está de acuerdo con «Soy el alma de la fiesta» y con «No hablo mucho», o se ha leído mal la negación, o hay aquiescencia. El sitio del IPIP propone índices propios parecidos, como el uso excesivo de una misma opción (" + FUENTES.ipipval + "). El umbral de incongruencia (≥ " + P.PAR_INCONGRUENTE + ") es propio del proyecto [HIPÓTESIS]; en S01 los ítems negados 6, 7 y 8 ya dieron incongruencias."));

    // 5. Relaciones entre test
    o.push(h2("5. Relaciones entre test"));
    o.push(caja("Antes de leer esta sección", "Con una sola persona <b>no se puede calcular una correlación</b>: una correlación describe cómo varían juntas dos medidas en un grupo. Lo que sí se puede hacer es comparar ítems que preguntan lo mismo y situar a la persona respecto a lo que la literatura describe en grupos. Los valores se pasan a una escala común de 0 a 4 en sentido «más síntoma»."));
    o.push(tabla(["Contenido", "Ítem A", "Ítem B", "A (0–4)", "B (0–4)", "Dif.", "¿Diverge ≥ " + P.DIVERGENCIA + "?"], inf.pares.map(function (p) {
      return [p.tema, p.a.test + " " + p.a.n + ": «" + esc(p.a.texto) + "» (" + esc(p.a.lectura) + ")", p.b.test + " " + p.b.n + ": «" + esc(p.b.texto) + "»", esc(p.a.norm), esc(p.b.norm), esc(p.diferencia), p.diverge ? "<b>sí</b>" : (p.diferencia === null ? "—" : "no")];
    })));
    inf.pares.forEach(function (p) { o.push(caja(p.tema + (p.diverge ? " · diverge" : ""), esc(p.explica))); });
    var re = inf.rasgo_estado;
    o.push(h3("Rasgo frente a estado"));
    o.push(tabla(["Medida", "% del máximo"], [["Neuroticismo (Mini-IPIP, en general)", esc(re.neuroticismo_pomp)], ["Responsabilidad (Mini-IPIP)", esc(re.responsabilidad_pomp)], ["Extraversión (Mini-IPIP)", esc(re.extraversion_pomp)], ["PHQ-9 (2 semanas)", esc(re.phq9_pomp)], ["GAD-7 (14 días)", esc(re.gad7_pomp)]]));
    o.push(caja("Qué dice la literatura", "En un metaanálisis de 175 estudios, todos los grupos diagnósticos de ansiedad, depresión y consumo puntuaban alto en Neuroticismo (d medio = 1,65) y bajo en Responsabilidad (d medio = −1,01); la baja Extraversión se asociaba sobre todo a distimia (d = −1,47) y fobia social (d = −1,31) (" + FUENTES.kotov + "). En estudios longitudinales, el Neuroticismo predice síntomas futuros de ansiedad y depresión (d = 0,50–0,70), y el efecto se reduce a la mitad al controlar los síntomas de partida (" + FUENTES.jeronimus + "). Para el estudiante: <b>Neuroticismo alto con PHQ-9/GAD-7 bajos</b> describe vulnerabilidad sin malestar actual; <b>Neuroticismo bajo con PHQ-9/GAD-7 altos</b> sugiere un malestar reactivo a algo reciente. Además, el estado de ánimo del día puede teñir cómo uno describe su forma de ser «en general» [INFERENCIA]. Ansiedad y depresión se solapan: el estudio de normas alemán describe correlaciones positivas altas entre PHQ-9 y GAD-7, y el PHQ-4 combina sus dos primeros ítems (PHQ-2 + GAD-2) (" + FUENTES.phqde + "; " + FUENTES.psyctc + ")."));

    // 6. Riesgo y revisión
    o.push(h2("6. Riesgo y revisión final"));
    o.push(tabla(["Test", "Ítem", "Valor final", "Veces que saltó el protocolo", "Sin responder", "Decisión en revisión"], inf.riesgo.map(function (r) { return [r.test, r.n + ": «" + esc(r.texto) + "»", esc(r.valor_final), r.veces_disparado, r.sin_responder ? "<b>sí</b>" : "no", r.decision_revision ? esc(r.decision_revision.decision) : "—"]; })));
    o.push(caja("Ítem 9 del PHQ-9", "Cualquier valor mayor que 0 detiene el test y muestra el 024 y el 112. El manual del PHQ advierte que la decisión sobre el riesgo real requiere una entrevista clínica: el ítem es una alerta, no una evaluación del riesgo (" + FUENTES.pfizer + ")."));
    var revs = [];
    Object.keys(inf.revision).forEach(function (tid) { Object.keys(inf.revision[tid]).forEach(function (n) { var r = inf.revision[tid][n]; revs.push([tid, n, esc(r.decision), esc(r.motivo || ""), fmtFecha(r.t)]); }); });
    o.push(h3("Decisiones en la revisión de no respondidas"));
    o.push(revs.length ? tabla(["Test", "Ítem", "Decisión", "Motivo", "Cuándo"], revs) : "<p>No quedó nada pendiente en ninguna revisión.</p>");

    o.push(h2("Fuentes"));
    o.push('<ol style="font-size:12px">' + Object.keys(FUENTES).map(function (k) { return "<li>" + esc(FUENTES[k]) + "</li>"; }).join("") + "</ol>");
    o.push('<p style="font-size:12px;color:#555">Datos brutos completos (todas las respuestas, cambios, tiempos y eventos con marca horaria) en el adjunto JSON.</p>');
    o.push("</div>");
    return o.join("");
  }

  function resumenTexto(inf) {
    var l = [];
    l.push("Piloto de test · " + (inf.participante || "sin código") + " · " + inf.generado);
    ["mini-ipip", "phq-9", "gad-7"].forEach(function (k) {
      var t = inf.tests[k];
      if (k === "mini-ipip") {
        l.push("Mini-IPIP: " + ["E", "A", "C", "N", "I"].map(function (s) { var x = t.puntuacion.subescalas[s]; return s + "=" + (x.calculable ? x.puntuacion : "n/c"); }).join(" "));
      } else {
        var s = t.puntuacion.subescalas.total;
        l.push(t.nombre + ": " + (s.calculable ? s.puntuacion + (s.prorrateado ? " (prorrateada)" : "") + " · " + s.rango : "no calculable"));
      }
    });
    if (inf.avisos.length) l.push("Avisos: " + inf.avisos.join(" | "));
    l.push("Informe completo en el cuerpo HTML y datos en el adjunto JSON.");
    return l.join("\n");
  }

  function base64utf8(s) {
    var bytes = new TextEncoder().encode(s), bin = "", CH = 0x8000;
    for (var i = 0; i < bytes.length; i += CH) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
    return btoa(bin);
  }

  return { P: P, PARES: PARES, FUENTES: FUENTES, intervalos: intervalos, sesiones: sesiones, analizar: analizar, informeHTML: informeHTML, resumenTexto: resumenTexto, base64utf8: base64utf8 };
})();


