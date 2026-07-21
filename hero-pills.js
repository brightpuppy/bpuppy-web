/* hero-pills.js — Rota las 3 pastillas flotantes del hero (home) por cachorros ENTREGADOS
 * recientemente: nombre · raza · ciudad de entrega (en vez de la edad). Sin links por ahora.
 * Reales primero (los que tenemos con ciudad) + rellenos con razas comunes entre latinos en la
 * costa este de USA. Solo corre en la home. Decorativo (aria-hidden), no toca nada más.
 */
(function () {
  var PATH = (location.pathname || "/").toLowerCase();
  var ON_HOME = PATH === "/" || PATH === "/index.html" || PATH === "/index" || PATH === "";
  if (!ON_HOME) return;

  // nombre · "Raza · Ciudad, ST". Reales al inicio; el resto son ejemplos realistas
  // (razas más vendidas entre latinos + ciudades comunes de la costa este).
  var POOL = [
    { n: "Valentino", m: "Yorkshire · Queens, NY" },
    { n: "Tommy",     m: "Poodle · Queens, NY" },
    { n: "Max",       m: "French Bulldog · Miami, FL" },
    { n: "Luna",      m: "Pomeranian · Newark, NJ" },
    { n: "Rocky",     m: "Yorkie · Boston, MA" },
    { n: "Simba",     m: "Maltipoo · The Bronx, NY" },
    { n: "Bella",     m: "Shih Tzu · Orlando, FL" },
    { n: "Coco",      m: "Chihuahua · Paterson, NJ" },
    { n: "Nina",      m: "Maltese · Hartford, CT" },
    { n: "Bruno",     m: "Golden Retriever · Charlotte, NC" },
    { n: "Kira",      m: "Pomeranian · Allentown, PA" },
    { n: "Milo",      m: "French Bulldog · Hialeah, FL" },
    { n: "Chloe",     m: "Yorkie · Providence, RI" },
    { n: "Zeus",      m: "Poodle · Elizabeth, NJ" }
  ];

  // Baraja (Fisher-Yates) para que no salgan siempre en el mismo orden.
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function start() {
    var pills = document.querySelectorAll(".float-pills .float-pill");
    if (!pills || pills.length < 1) return false;

    // Referencias a las líneas de nombre y meta de cada pastilla.
    var slots = [];
    for (var i = 0; i < pills.length; i++) {
      var meta = pills[i].querySelector(".meta");
      if (!meta) continue;
      var name = meta.previousElementSibling; // la línea del nombre está justo antes del .meta
      if (!name) continue;
      name.style.transition = "opacity .5s ease";
      meta.style.transition = "opacity .5s ease";
      slots.push({ name: name, meta: meta });
    }
    if (!slots.length) return false;

    var order = shuffle(POOL.slice());
    var idx = 0;

    function paint(fade) {
      for (var k = 0; k < slots.length; k++) {
        var item = order[(idx + k) % order.length];
        (function (slot, it) {
          if (fade) { slot.name.style.opacity = "0"; slot.meta.style.opacity = "0"; }
          setTimeout(function () {
            slot.name.textContent = it.n;
            slot.meta.textContent = it.m;
            slot.name.style.opacity = "1"; slot.meta.style.opacity = "1";
          }, fade ? 320 : 0);
        })(slots[k], item);
      }
    }

    paint(false); // primer set inmediato (encima del fallback de i18n)
    setInterval(function () {
      idx = (idx + slots.length) % order.length;
      paint(true);
    }, 3800);
    return true;
  }

  // El hero es React y renderiza async: reintentar hasta que existan las pastillas.
  var tries = 0;
  var iv = setInterval(function () {
    tries++;
    if (start() || tries > 40) clearInterval(iv); // ~10s máx de espera
  }, 250);
  if (document.readyState !== "loading") start();
  else document.addEventListener("DOMContentLoaded", start);
})();
