/* Tienda de BrightPuppy — recomendaciones con enlace de afiliado.
   Lee directo de Supabase: la RLS solo deja ver lo publicado. */
(function () {
  "use strict";

  var API = "https://oqqwmcplljirbreowrll.supabase.co/rest/v1/";
  var ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
  var H = { apikey: ANON, Authorization: "Bearer " + ANON };

  var ES = (function () { try { return (localStorage.getItem("bpuppy-lang") || "es") !== "en"; } catch (e) { return true; } })();
  function t(es, en) { return ES ? es : en; }

  var CATS = [
    { k: "comida",        es: "Comida",          en: "Food" },
    { k: "juguetes",      es: "Juguetes",        en: "Toys" },
    { k: "cama",          es: "Cama y descanso", en: "Bed & rest" },
    { k: "paseo",         es: "Paseo y viaje",   en: "Walks & travel" },
    { k: "higiene",       es: "Aseo",            en: "Grooming" },
    { k: "salud",         es: "Salud",           en: "Health" },
    { k: "entrenamiento", es: "Entrenamiento",   en: "Training" },
    { k: "ropa",          es: "Ropa",            en: "Clothing" }
  ];
  var ETAPAS = [
    { k: "new_owner",     es: "Recién llegado", en: "Just arrived", sp: "" },
    { k: "puppy_2_6m",    es: "Cachorro 2–6 m", en: "Puppy 2–6 mo", sp: "dog" },
    { k: "puppy_6m_plus", es: "Cachorro 6 m +", en: "Puppy 6 mo +", sp: "dog" },
    { k: "kitten",        es: "Gatito",         en: "Kitten",       sp: "cat" },
    { k: "young",         es: "Gato joven",     en: "Young cat",    sp: "cat" },
    { k: "adult",         es: "Adulto",         en: "Adult",        sp: "cat" }
  ];

  var D = { productos: [], listas: [], tiendas: {}, enLista: {}, kit: null };
  var F = { especie: "", categoria: "", etapa: "", tienda: "", lista: "", busca: "" };
  var movilAbierto = false;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function el(id) { return document.getElementById(id); }
  function pedir(ruta) {
    return fetch(API + ruta, { headers: H }).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; });
  }
  // Para que "cachorro" encuentre "Cachorro" y "dónut" encuentre "donut".
  function plano(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  var ICO = {
    salir: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>',
    lupa: '<svg class="lupa" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    enlace: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.1 0l2.9-2.9a5 5 0 0 0-7.1-7.1L11.5 4.4"/><path d="M14 11a5 5 0 0 0-7.1 0L4 13.9a5 5 0 0 0 7.1 7.1l1.4-1.4"/></svg>',
    hecho: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7"/></svg>',
    filtros: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M7 12h10M10 18h4"/></svg>',
    perro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5.2 7 3.4v3.2M14 5.2l3-1.8v3.2"/><path d="M7 6.6c-.7 1.3-1 2.7-1 4.2 0 4 2.7 6.8 6 6.8s6-2.8 6-6.8c0-1.5-.3-2.9-1-4.2"/><path d="M10.5 11.5h.01M13.5 11.5h.01M12 14.2c-.7 0-1.2.4-1.2.9s.5.9 1.2.9 1.2-.4 1.2-.9-.5-.9-1.2-.9Z"/><path d="M9 17.4V21M15 17.4V21"/></svg>',
    gato: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.4 4.6 3.6 8.4 6.2M18 8.4l1.4-4.8-3.8 2.6"/><path d="M4.6 10.6C4.6 15 7.9 18.4 12 18.4s7.4-3.4 7.4-7.8c0-1-.2-2-.5-2.9"/><path d="M9.6 11.4h.01M14.4 11.4h.01M12 13.6v1.2M12 14.8c-.6.7-1.5.9-2.3.6M12 14.8c.6.7 1.5.9 2.3.6"/></svg>'
  };

  /* El enlace final se arma con la etiqueta de la tienda: cambiarla un dia
     deja vivos todos los enlaces sin tocar un solo producto. */
  function enlace(p) {
    var ti = D.tiendas[p.store];
    if (ti && ti.link_template && ti.affiliate_tag) {
      return ti.link_template.replace("{url}", p.product_url).replace("{tag}", encodeURIComponent(ti.affiliate_tag));
    }
    return p.product_url;
  }
  function nombreTienda(k) { var ti = D.tiendas[k]; return ti ? ti.name : k; }
  function nombreCat(k) { var c = CATS.filter(function (x) { return x.k === k; })[0]; return c ? t(c.es, c.en) : k; }

  /* ── Filtrado ─────────────────────────────────────────────────────────── */
  // Cuenta cuantos quedarian si ademas se marcase esta opcion: asi el numero
  // de al lado dice la verdad en vez de contar sobre el total.
  function pasa(p, salvo) {
    var ids = F.lista ? (D.enLista[F.lista] || []) : null;
    if (ids && ids.indexOf(p.id) < 0) return false;
    if (salvo !== "especie" && F.especie && p.species !== F.especie) return false;
    if (salvo !== "categoria" && F.categoria && p.category !== F.categoria) return false;
    if (salvo !== "tienda" && F.tienda && p.store !== F.tienda) return false;
    if (salvo !== "etapa" && F.etapa && (p.stages || []).indexOf(F.etapa) < 0) return false;
    if (F.busca) {
      var q = plano(F.busca);
      var heno = plano([p.name_es, p.name_en, p.desc_es, p.desc_en, nombreCat(p.category)].join(" "));
      if (heno.indexOf(q) < 0) return false;
    }
    return true;
  }
  function filtra() { return D.productos.filter(function (p) { return pasa(p, null); }); }
  function cuantos(campo, valor) {
    return D.productos.filter(function (p) {
      if (!pasa(p, campo)) return false;
      if (campo === "especie") return p.species === valor;
      if (campo === "categoria") return p.category === valor;
      if (campo === "tienda") return p.store === valor;
      if (campo === "etapa") return (p.stages || []).indexOf(valor) >= 0;
      if (campo === "lista") return (D.enLista[valor] || []).indexOf(p.id) >= 0;
      return true;
    }).length;
  }

  /* ── Barra lateral ────────────────────────────────────────────────────── */
  function opcion(txt, activo, campo, valor, icono) {
    var n = cuantos(campo, valor);
    return '<button class="mk-op' + (activo ? " on" : "") + '" data-c="' + campo + '" data-v="' + esc(valor) + '"' +
      (n ? "" : ' disabled style="opacity:.4;cursor:default"') + ">" +
      (icono || "") + "<span>" + esc(txt) + '</span><span class="n">' + n + "</span></button>";
  }

  function pintaLateral() {
    var lat = el("mk-lat");
    if (!lat) return;
    var hay = F.especie || F.categoria || F.etapa || F.tienda || F.lista || F.busca;
    var etapas = ETAPAS.filter(function (e) { return !F.especie || !e.sp || e.sp === F.especie; });
    var tiendas = Object.keys(D.tiendas).filter(function (k) {
      return D.productos.some(function (p) { return p.store === k; });
    });

    var html =
      '<div class="mk-busca">' + ICO.lupa +
        '<input id="mk-q" type="search" autocomplete="off" placeholder="' + t("Buscar…", "Search…") + '" value="' + esc(F.busca) + '">' +
        (F.busca ? '<button class="equis" id="mk-q-x" aria-label="' + t("Borrar", "Clear") + '">✕</button>' : "") +
      "</div>";

    if (D.listas.length) {
      html += '<div class="mk-gr"><h3>' + t("Listas", "Lists") + "</h3>" +
        D.listas.map(function (l) {
          return opcion(t(l.title_es, l.title_en), F.lista === l.slug, "lista", l.slug);
        }).join("") + "</div>";
    }

    html += '<div class="mk-gr"><h3>' + t("Para", "For") + "</h3>" +
      opcion(t("Perro", "Dog"), F.especie === "dog", "especie", "dog", ICO.perro) +
      opcion(t("Gato", "Cat"), F.especie === "cat", "especie", "cat", ICO.gato) + "</div>";

    html += '<div class="mk-gr"><h3>' + t("Qué es", "What") + "</h3>" +
      CATS.map(function (c) { return opcion(t(c.es, c.en), F.categoria === c.k, "categoria", c.k); }).join("") + "</div>";

    html += '<div class="mk-gr"><h3>' + t("Etapa", "Stage") + "</h3>" +
      etapas.map(function (e) { return opcion(t(e.es, e.en), F.etapa === e.k, "etapa", e.k); }).join("") + "</div>";

    if (tiendas.length > 1) {
      html += '<div class="mk-gr"><h3>' + t("Tienda", "Store") + "</h3>" +
        tiendas.map(function (k) { return opcion(nombreTienda(k), F.tienda === k, "tienda", k); }).join("") + "</div>";
    }

    if (hay) html += '<button class="mk-limpiar" id="mk-limpiar">' + t("Quitar filtros", "Clear filters") + "</button>";

    lat.innerHTML = html;

    [].forEach.call(lat.querySelectorAll(".mk-op"), function (b) {
      b.addEventListener("click", function () {
        var campo = b.getAttribute("data-c"), valor = b.getAttribute("data-v");
        F[campo] = (F[campo] === valor) ? "" : valor;
        if (campo === "especie") {
          var e = ETAPAS.filter(function (x) { return x.k === F.etapa; })[0];
          if (e && e.sp && e.sp !== F.especie) F.etapa = "";
        }
        pinta();
      });
    });

    var lim = el("mk-limpiar");
    if (lim) lim.addEventListener("click", function () {
      F = { especie: "", categoria: "", etapa: "", tienda: "", lista: "", busca: "" };
      pinta();
    });

    var q = el("mk-q");
    if (q) {
      var tq = null;
      q.addEventListener("input", function () {
        clearTimeout(tq);
        var v = q.value;
        // Se repinta solo al parar de escribir: si no, el campo pierde el foco a cada tecla.
        tq = setTimeout(function () { F.busca = v; pinta(true); }, 220);
      });
      if (F.busca) { q.focus(); try { q.setSelectionRange(q.value.length, q.value.length); } catch (e) {} }
    }
    var qx = el("mk-q-x");
    if (qx) qx.addEventListener("click", function () { F.busca = ""; pinta(); });
  }

  /* ── Botones destacados ───────────────────────────────────────────────
     Arriba a la derecha, con su miniatura. Son la puerta de entrada: la mayoria
     de la gente llega sabiendo si tiene un cachorro recien llegado, un perro
     hecho o un gatito, y no quiere pelearse con los filtros. */
  function pintaDestacados() {
    var c = el("mk-dest");
    if (!c) return;
    // La temporada que toque hoy va la primera. Si no toca ninguna, no sale.
    var hoy = (function(){ var d=new Date(); return String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); })();
    var temp = D.listas.filter(function (l) {
      if (!l.temporada || !l.desde_md || !l.hasta_md) return false;
      return (l.desde_md <= l.hasta_md)
        ? (hoy >= l.desde_md && hoy <= l.hasta_md)
        : (hoy >= l.desde_md || hoy <= l.hasta_md);
    })[0];
    var dest = D.listas.filter(function (l) { return l.destacada; });
    if (temp) dest = [temp].concat(dest);
    if (!dest.length) { c.innerHTML = ""; return; }
    c.innerHTML = dest.map(function (l) {
      var n = (D.enLista[l.slug] || []).length;
      var gato = l.species === "cat";
      var est = l.temporada && l.color_1 ? ' style="border-color:' + esc(l.color_1) + '"' : "";
      return '<button class="mk-d' + (gato ? " mk-d-gato" : "") + (l.temporada ? " mk-d-temp" : "") +
          (F.lista === l.slug ? " on" : "") + '" data-l="' + esc(l.slug) + '"' + est + ">" +
        (l.foto ? '<img src="' + esc(l.foto) + '" alt="" loading="lazy">' : "") +
        "<span><b>" + esc(t(l.title_es, l.title_en)) + "</b></span></button>";
    }).join("");
    [].forEach.call(c.querySelectorAll(".mk-d"), function (b) {
      b.addEventListener("click", function () {
        var slug = b.getAttribute("data-l");
        F.lista = (F.lista === slug) ? "" : slug;
        F.categoria = ""; F.etapa = "";
        pinta();
      });
    });
  }

  /* El aviso de una lista: manda a la que de verdad le toca. */
  function pintaAviso() {
    var a = el("mk-aviso");
    if (!a) return;
    var l = D.listas.filter(function (x) { return x.slug === F.lista; })[0];
    var txt = l ? t(l.nota_es, l.nota_en) : "";
    if (!l || !txt) { a.innerHTML = ""; return; }
    var destino = D.listas.filter(function (x) { return x.slug === l.nota_lista; })[0];
    a.innerHTML = '<div class="mk-aviso"><span>' + esc(txt) +
      (destino ? ' <button data-ir="' + esc(destino.slug) + '">' + esc(t(destino.title_es, destino.title_en)) + " \u2192</button>" : "") +
      "</span></div>";
    var b = a.querySelector("button[data-ir]");
    if (b) b.addEventListener("click", function () {
      F.lista = b.getAttribute("data-ir");
      F.categoria = ""; F.etapa = "";
      pinta();
      try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) { window.scrollTo(0, 0); }
    });
  }

  /* ── Cabecera de resultados ───────────────────────────────────────────── */
  /* En el movil el buscador estaba dentro de los filtros, o sea escondido tras
     un boton: nadie lo encontraba. Ahora va suelto encima de los articulos y
     ocupa todo el ancho. En escritorio se queda solo el del lateral. */
  function pintaBuscadorMovil() {
    var c = el("mk-busca-movil");
    if (!c) return;
    c.innerHTML = '<div class="mk-busca">' + ICO.lupa +
      '<input id="mk-q2" type="search" autocomplete="off" placeholder="' + t("Buscar…", "Search…") + '" value="' + esc(F.busca) + '">' +
      (F.busca ? '<button class="equis" id="mk-q2-x" aria-label="' + t("Borrar", "Clear") + '">\u2715</button>' : "") + "</div>";
    var q = el("mk-q2");
    if (q) {
      var tq = null;
      q.addEventListener("input", function () {
        clearTimeout(tq);
        var v = q.value;
        tq = setTimeout(function () { F.busca = v; pinta("movil"); }, 220);
      });
    }
    var x = el("mk-q2-x");
    if (x) x.addEventListener("click", function () { F.busca = ""; pinta(); });
  }

  function pintaCabecera(n) {
    var h = el("mk-head");
    if (!h) return;
    h.innerHTML =
      '<button class="mk-abrir' + (movilAbierto ? " on" : "") + '" id="mk-abrir">' + ICO.filtros +
        t("Filtros", "Filters") + "</button>" +
      '<span class="mk-head-r">' +
      '<button class="mk-share" id="mk-share">' + ICO.enlace +
        '<span>' + t("Compartir", "Share") + "</span></button></span>";
    var sh = el("mk-share");
    if (sh) sh.addEventListener("click", function () { comparte(sh); });

    var b = el("mk-abrir");
    if (b) b.addEventListener("click", function () {
      movilAbierto = !movilAbierto;
      var lat = el("mk-lat");
      if (lat) lat.classList.toggle("abierta", movilAbierto);
      b.classList.toggle("on", movilAbierto);
    });
  }

  /* ── Compartir ────────────────────────────────────────────────────────
     Se comparte lo que se esta viendo. En modo kit se comparte la version
     PUBLICA de la lista: el enlace con token es personal del cliente. */
  function enlaceParaCompartir() {
    if (D.kit) return location.origin + "/mercado?lista=" + encodeURIComponent(D.kit.list_slug);
    return location.href;
  }
  function tituloParaCompartir() {
    var l = D.listas.filter(function (x) { return x.slug === (D.kit ? D.kit.list_slug : F.lista); })[0];
    if (l) return t(l.title_es, l.title_en) + " · BrightPuppy";
    return t("Lo que de verdad hace falta · BrightPuppy", "What you actually need · BrightPuppy");
  }
  function comparte(boton) {
    var url = enlaceParaCompartir();
    var titulo = tituloParaCompartir();
    // En el movil, la hoja de compartir del propio telefono: WhatsApp, correo,
    // lo que tenga. En el escritorio casi nunca existe, y ahi se copia.
    if (navigator.share) {
      navigator.share({ title: titulo, url: url }).catch(function () {});
      return;
    }
    var ok = function () {
      boton.classList.add("ok");
      boton.innerHTML = ICO.hecho + "<span>" + t("Enlace copiado", "Link copied") + "</span>";
      setTimeout(function () {
        boton.classList.remove("ok");
        boton.innerHTML = ICO.enlace + "<span>" + t("Compartir", "Share") + "</span>";
      }, 2200);
    };
    try {
      navigator.clipboard.writeText(url).then(ok, function () { window.prompt(t("Copia el enlace:", "Copy the link:"), url); });
    } catch (e) {
      window.prompt(t("Copia el enlace:", "Copy the link:"), url);
    }
  }

  /* ── Rejilla ──────────────────────────────────────────────────────────── */
  function pintaGrid(lista) {
    var g = el("mk-grid");
    if (!g) return;
    if (!lista.length) {
      g.innerHTML = '<div class="mk-vacio"><p>' +
        (F.busca
          ? t("Nada con «" + F.busca + "». Prueba con otra palabra.", "Nothing for “" + F.busca + "”. Try another word.")
          : t("Nada con esos filtros todavía. Quita alguno y vuelve a mirar.",
              "Nothing matches those filters yet. Drop one and look again.")) + "</p></div>";
      return;
    }
    g.innerHTML = '<div class="mk-grid">' + lista.map(function (p) {
      var desc = t(p.desc_es, p.desc_en);
      return '<article class="mk-card">' +
        '<div class="mk-pic"><img src="' + esc(p.image_url) + '" alt="' + esc(t(p.name_es, p.name_en)) + '" loading="lazy"></div>' +
        '<div class="mk-body">' +
          '<p class="mk-tag">' + esc(nombreCat(p.category)) + ' <span class="mk-sep">·</span> <span class="mk-tienda">' + esc(nombreTienda(p.store)) + "</span></p>" +
          '<h3 class="mk-name">' + esc(t(p.name_es, p.name_en)) + "</h3>" +
          (desc ? '<p class="mk-desc">' + esc(desc) + "</p>" : "") +
          // Sin precio: Amazon no deja mostrarlo guardado. Se va a verlo alli.
          '<a class="mk-go" href="' + esc(enlace(p)) + '" target="_blank" rel="sponsored nofollow noopener" data-id="' + esc(p.id) + '">' +
            "<span>" + t("Ver artículo", "View item") + "</span>" + ICO.salir +
          "</a>" +
        "</div></article>";
    }).join("") + "</div>";

    [].forEach.call(g.querySelectorAll(".mk-go"), function (a) {
      a.addEventListener("click", function () { cuenta(a.getAttribute("data-id")); });
    });
  }

  /* Sin saber que se clica, curar la tienda es ir a ciegas. */
  function cuenta(id) {
    try {
      var cuerpo = JSON.stringify([{ product_id: id, lista: F.lista || null, lang: ES ? "es" : "en", token: D.kit ? D.kit.token : null }]);
      // Nada de sendBeacon: no puede poner Authorization y PostgREST lo rechaza.
      fetch(API + "market_clicks", {
        method: "POST",
        keepalive: true,
        headers: { apikey: ANON, Authorization: "Bearer " + ANON, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: cuerpo
      }).catch(function () {});
    } catch (e) {}
  }

  /* Al entrar en una temporada la pagina toma sus colores. Se tocan solo dos
     variables: nada de un tema aparte que luego hay que mantener en paralelo. */
  /* La cabecera de la temporada. Se guardan los textos originales la primera
     vez para poder volver, y se escapa lo que viene de la base porque
     bpTraduceEstaticos pinta con innerHTML (los titulos llevan <em>). */
  var cabOrig = null;
  function cabeceraDeTemporada(l) {
    var h1 = el("mk-h1"), sub = el("mk-sub");
    if (!h1 || !sub) return;
    if (!cabOrig) cabOrig = [h1.getAttribute("data-es"), h1.getAttribute("data-en"),
                             sub.getAttribute("data-es"), sub.getAttribute("data-en")];
    var v = l
      ? [esc(l.title_es), esc(l.title_en || l.title_es), esc(l.intro_es || ""), esc(l.intro_en || l.intro_es || "")]
      : cabOrig;
    h1.setAttribute("data-es", v[0]);  h1.setAttribute("data-en", v[1]);
    sub.setAttribute("data-es", v[2]); sub.setAttribute("data-en", v[3]);
    sub.style.display = (v[2] || v[3]) ? "" : "none";
    if (window.bpTraduceEstaticos) { try { window.bpTraduceEstaticos(); } catch (e) {} }
  }

  function vistePorTemporada() {
    var l = D.listas.filter(function (x) { return x.slug === F.lista && x.temporada; })[0];
    var r = document.documentElement;
    if (l && l.color_1) {
      r.style.setProperty("--orange", l.color_1);
      if (l.color_2) r.style.setProperty("--mk-azul", l.color_2);
      document.body.classList.add("mk-temp");
      cabeceraDeTemporada(l);
    } else {
      r.style.removeProperty("--orange");
      r.style.removeProperty("--mk-azul");
      document.body.classList.remove("mk-temp");
      cabeceraDeTemporada(null);
    }
  }

  function pinta(mantenerFoco) {
    var lista = filtra();
    var cual = (mantenerFoco === "movil") ? "mk-q2" : "mk-q";
    var q = el(cual);
    var foco = mantenerFoco && q && document.activeElement === q;
    var cursor = foco ? q.selectionStart : null;
    vistePorTemporada();
    pintaDestacados();
    pintaAviso();
    pintaLateral();
    pintaBuscadorMovil();
    pintaCabecera(lista.length);
    pintaGrid(lista);
    if (foco) {
      var q2 = el(cual);
      if (q2) { q2.focus(); try { q2.setSelectionRange(cursor, cursor); } catch (e) {} }
    }
    guardaUrl();
  }

  function guardaUrl() {
    if (D.kit) return;   // el enlace del cliente no se reescribe
    try {
      var q = [];
      if (F.lista) q.push("lista=" + F.lista);
      if (F.especie) q.push("para=" + (F.especie === "dog" ? "perro" : "gato"));
      if (F.categoria) q.push("cat=" + F.categoria);
      if (F.etapa) q.push("etapa=" + F.etapa);
      if (F.busca) q.push("q=" + encodeURIComponent(F.busca));
      history.replaceState(null, "", location.pathname + (q.length ? "?" + q.join("&") : ""));
    } catch (e) {}
  }
  function leeUrl() {
    try {
      var q = new URLSearchParams(location.search);
      var para = (q.get("para") || q.get("for") || "").toLowerCase();
      if (para === "perro" || para === "dog") F.especie = "dog";
      if (para === "gato" || para === "cat") F.especie = "cat";
      if (q.get("lista")) F.lista = q.get("lista");
      if (q.get("cat")) F.categoria = q.get("cat");
      if (q.get("etapa")) F.etapa = q.get("etapa");
      if (q.get("q")) F.busca = q.get("q");
    } catch (e) {}
  }
  function leeToken() {
    try { return (new URLSearchParams(location.search).get("k") || "").trim(); } catch (e) { return ""; }
  }

  /* ── Modo kit ─────────────────────────────────────────────────────────
     Con ?k=<token> la pagina deja de ser escaparate y se vuelve la lista que
     le mandamos a esa persona: su nombre, el de su cachorro y nada mas. */
  function pintaKit() {
    var k = D.kit;
    var top = document.querySelector(".mk-top .container");
    if (top) {
      var quien = k.mascota ? t("para ", "for ") + k.mascota : (k.nombre ? t("para ", "for ") + k.nombre : "");
      top.innerHTML =
        '<p style="font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--orange);margin:0 0 8px">' +
          esc(k.de_parte_de || "BrightPuppy") + "</p>" +
        "<h1>" + esc(t(k.titulo_es, k.titulo_en)) + (quien ? " <em>" + esc(quien) + "</em>" : "") + "</h1>" +
        (t(k.intro_es, k.intro_en) ? "<p>" + esc(t(k.intro_es, k.intro_en)) + "</p>" : "") +
        '<p class="mk-nota">' + t(
          "<b>Aviso:</b> no es una tienda nuestra. Compras en Amazon o donde prefieras; si entras por aquí nos llevamos una comisión de afiliado y a ti no te cuesta un centavo más.",
          "<b>Disclosure:</b> this is not our store. You buy from Amazon or wherever you like; if you go through us we earn an affiliate commission and it costs you nothing extra."
        ) + "</p>";
    }
    var lat = el("mk-lat");
    if (lat) lat.style.display = "none";
    var dst = el("mk-dest");
    if (dst) dst.style.display = "none";
    var cols = document.querySelector(".mk-cols");
    if (cols) cols.style.gridTemplateColumns = "minmax(0,1fr)";
    try { document.title = t(k.titulo_es, k.titulo_en) + " · BPuppy"; } catch (e) {}
    F.lista = k.list_slug;
  }

  function legal() {
    var p = el("mk-legal-txt");
    if (!p) return;
    // La frase de Amazon va TEXTUAL en los dos idiomas: su acuerdo la exige asi.
    p.innerHTML = "<strong>As an Amazon Associate I earn from qualifying purchases.</strong> " + esc(t(
      "BrightPuppy participa en programas de afiliados. Si compras por un enlace de esta página podemos ganar una comisión, sin coste adicional para ti. Los precios y la disponibilidad los pone cada tienda y cambian sin aviso: el precio bueno es el que veas al abrir el enlace. No vendemos ni enviamos estos artículos y no somos responsables de la compra, el envío ni la garantía, que corren a cuenta de la tienda. Nada de lo que hay aquí es consejo veterinario; para medicación, pulgas o cualquier duda de salud, pregunta a tu veterinario.",
      "BrightPuppy takes part in affiliate programs. If you buy through a link on this page we may earn a commission at no extra cost to you. Prices and availability are set by each retailer and change without notice: the real price is the one you see when you open the link. We do not sell or ship these items and we are not responsible for the purchase, shipping or warranty, which are the retailer's. Nothing here is veterinary advice; for medication, fleas or any health question, ask your vet."
    ));
  }

  function arranca() {
    var g = el("mk-grid");
    if (g) g.innerHTML = '<div class="mk-grid">' + new Array(11).join('<div class="mk-cargando"></div>') + "</div>";
    legal();
    leeUrl();

    var tok = leeToken();
    var elKit = tok
      ? fetch(API + "rpc/market_kit", {
          method: "POST",
          headers: { apikey: ANON, Authorization: "Bearer " + ANON, "Content-Type": "application/json" },
          body: JSON.stringify({ p_token: tok })
        }).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; })
      : Promise.resolve([]);

    Promise.all([
      pedir("market_products?select=id,name_es,name_en,desc_es,desc_en,image_url,category,species,stages,sizes,store,product_url,price_ref,reviewed_at,position&status=eq.published&order=category,position&limit=500"),
      pedir("market_lists?select=slug,title_es,title_en,intro_es,intro_en,nota_es,nota_en,nota_lista,destacada,foto,temporada,color_1,color_2,desde_md,hasta_md,species,position&active=is.true&order=position"),
      pedir("market_stores?select=slug,name,link_template,affiliate_tag,show_price,price_note_es,price_note_en&active=is.true"),
      pedir("market_list_items?select=list_slug,product_id,position&order=position&limit=2000"),
      elKit
    ]).then(function (r) {
      D.productos = r[0] || [];
      D.listas = r[1] || [];
      (r[2] || []).forEach(function (s) { D.tiendas[s.slug] = s; });
      (r[3] || []).forEach(function (i) {
        (D.enLista[i.list_slug] = D.enLista[i.list_slug] || []).push(i.product_id);
      });
      var k = (r[4] && r[4][0]) || null;
      if (k) { D.kit = k; D.kit.token = tok; if (k.lang === "en" || k.lang === "es") ES = (k.lang !== "en"); }

      if (!D.productos.length) { pintaGrid([]); return; }
      if (D.kit) { pintaKit(); pintaCabecera(filtra().length); pintaGrid(filtra()); return; }
      pinta();
    });
  }

  /* El menu y el pie: chrome.js los exporta, pero cada pagina los monta. */
  function montaChrome() {
    var hdr = el("__chrome-hdr"), ftr = el("__chrome-ftr");
    if (!hdr || typeof React === "undefined" || typeof window.Header === "undefined") return;
    function Shell() {
      var s = React.useState(function () { try { return localStorage.getItem("bpuppy-lang") || "es"; } catch (e) { return "es"; } });
      var lang = s[0], set_ = s[1];
      function setLang(l) {
        set_(l);
        try { localStorage.setItem("bpuppy-lang", l); } catch (e) {}
        document.documentElement.lang = l;
        location.reload();
      }
      return React.createElement(
        window.LangContext.Provider, { value: { lang: lang, setLang: setLang } },
        ReactDOM.createPortal(React.createElement(window.Header, { overDark: false }), hdr),
        ftr ? ReactDOM.createPortal(React.createElement(window.Footer, null), ftr) : null
      );
    }
    var caja = document.createElement("div");
    caja.style.display = "none";
    document.body.appendChild(caja);
    ReactDOM.createRoot(caja).render(React.createElement(Shell));
  }

  function todo() { montaChrome(); arranca(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", todo);
  else todo();
})();
