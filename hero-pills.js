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
    // Reales (los que tenemos con ciudad de entrega)
    { n: "Valentino", m: "Yorkshire · Queens, NY" },
    { n: "Tommy",     m: "Poodle · Queens, NY" },
    { n: "Harley",    m: "Shih Tzu · Miami, FL" },
    // Ejemplos realistas: razas mas vendidas + ciudades de la costa este
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
    { n: "Zeus",      m: "Poodle · Elizabeth, NJ" },
    { n: "Canela",    m: "Cocker Spaniel · Tampa, FL" },
    { n: "Thor",      m: "Husky Siberiano · Filadelfia, PA" },
    { n: "Maya",      m: "Bichon Frise · Union City, NJ" },
    { n: "Lucas",     m: "Beagle · Raleigh, NC" },
    { n: "Sasha",     m: "Schnauzer Mini · Doral, FL" },
    { n: "Toby",      m: "Cavapoo · Stamford, CT" },
    { n: "Mia",       m: "Havanese · Kissimmee, FL" },
    { n: "Rex",       m: "Pastor Aleman · Brooklyn, NY" },
    { n: "Lola",      m: "Cavalier King Charles · Alexandria, VA" },
    { n: "Duke",      m: "Boxer · Baltimore, MD" },
    { n: "Nala",      m: "Corgi · Jersey City, NJ" },
    { n: "Benji",     m: "Shih Poo · Lawrence, MA" },
    { n: "Emma",      m: "Goldendoodle · Atlanta, GA" },
    { n: "Rambo",     m: "Pug · Yonkers, NY" },
    { n: "Sofi",      m: "Pomsky · Reading, PA" },
    { n: "Bruce",     m: "Dachshund · Norwalk, CT" },
    { n: "Kiara",     m: "Shiba Inu · Fort Lauderdale, FL" },
    { n: "Manchas",   m: "Dalmata · Springfield, MA" },
    { n: "Frida",     m: "Chihuahua · Camden, NJ" },
    { n: "Toño",    m: "Bulldog Ingles · Bridgeport, CT" },
    { n: "Pelusa",    m: "Bichon Maltes · Perth Amboy, NJ" },
    { n: "Diego",     m: "Labrador · Richmond, VA" },
    { n: "Salem",     m: "Frenchie · West New York, NJ" },
    { n: "Motita",    m: "Poodle Toy · Lowell, MA" },
    { n: "Apolo",     m: "Rottweiler · Newburgh, NY" },
    { n: "Suri",      m: "Yorkie Teacup · Kendall, FL" },
    { n: "Chispa",    m: "Chihuahua · New Haven, CT" },
    { n: "Rocco",     m: "Cane Corso · Passaic, NJ" },
    { n: "Dulce",     m: "Maltipoo · Winter Garden, FL" },
    { n: "Bella Rosa",m: "Cockapoo · Danbury, CT" },
    { n: "Peluche",   m: "Pomerania · Haines City, FL" },
    { n: "Zoe",       m: "Border Collie · Durham, NC" },
    { n: "Chico",     m: "Boston Terrier · Trenton, NJ" },
    { n: "Nube",      m: "Samoyedo · Nashua, NH" },
    { n: "Tito",      m: "Basset Hound · Wilmington, DE" },
    { n: "Amber",     m: "Golden Retriever · Sarasota, FL" },
    { n: "Onix",      m: "Doberman · Worcester, MA" },
    { n: "Perla",     m: "Coton de Tulear · Waterbury, CT" },
    { n: "Tyson",     m: "American Bully · Filadelfia, PA" },
    { n: "Kiwi",      m: "Papillon · Cape Coral, FL" },
    { n: "Bimba",     m: "Westie · Providence, RI" },
    { n: "Copito",    m: "Bichon · Lakeland, FL" },
    { n: "Blue",      m: "Pitbull Blue · Bronx, NY" },
    { n: "Estrella",  m: "Pomsky · Manassas, VA" },
    { n: "Ozzy",      m: "Frenchie Merle · Hoboken, NJ" },
    { n: "Kenai",     m: "Alaskan Malamute · Albany, NY" }
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
    }, 60000); // 1 minuto: se nota el cambio sin distraer
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
