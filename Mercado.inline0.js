/* Mercado de BrightPuppy — recomendaciones con enlace de afiliado.
   Lee directo de Supabase: la RLS solo deja ver lo publicado. */
(function () {
  "use strict";

  var API = "https://oqqwmcplljirbreowrll.supabase.co/rest/v1/";
  var ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
  var H = { apikey: ANON, Authorization: "Bearer " + ANON };

  var ES = (function () { try { return (localStorage.getItem("bpuppy-lang") || "es") !== "en"; } catch (e) { return true; } })();
  function t(es, en) { return ES ? es : en; }

  var CATS = [
    { k: "comida",        es: "Comida",        en: "Food" },
    { k: "juguetes",      es: "Juguetes",      en: "Toys" },
    { k: "cama",          es: "Cama y descanso", en: "Bed & rest" },
    { k: "paseo",         es: "Paseo y viaje", en: "Walks & travel" },
    { k: "higiene",       es: "Aseo",          en: "Grooming" },
    { k: "salud",         es: "Salud",         en: "Health" },
    { k: "entrenamiento", es: "Entrenamiento", en: "Training" }
  ];
  var ETAPAS = [
    { k: "new_owner",     es: "Recién llegado",   en: "Just arrived",   sp: "" },
    { k: "puppy_2_6m",    es: "Cachorro 2–6 m",   en: "Puppy 2–6 mo",   sp: "dog" },
    { k: "puppy_6m_plus", es: "Cachorro 6 m +",   en: "Puppy 6 mo +",   sp: "dog" },
    { k: "kitten",        es: "Gatito",           en: "Kitten",         sp: "cat" },
    { k: "young",         es: "Gato joven",       en: "Young cat",      sp: "cat" },
    { k: "adult",         es: "Adulto",           en: "Adult",          sp: "cat" }
  ];

  var D = { productos: [], listas: [], tiendas: {}, enLista: {} };
  var F = { especie: "", categoria: "", etapa: "", tienda: "", lista: "" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function el(id) { return document.getElementById(id); }
  function pedir(ruta) {
    return fetch(API + ruta, { headers: H }).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; });
  }

  var ICO = {
    salir: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>',
    perro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 5.2 7 3.4v3.2M14 5.2l3-1.8v3.2"/><path d="M7 6.6c-.7 1.3-1 2.7-1 4.2 0 4 2.7 6.8 6 6.8s6-2.8 6-6.8c0-1.5-.3-2.9-1-4.2"/><path d="M10.5 11.5h.01M13.5 11.5h.01M12 14.2c-.7 0-1.2.4-1.2.9s.5.9 1.2.9 1.2-.4 1.2-.9-.5-.9-1.2-.9Z"/><path d="M9 17.4V21M15 17.4V21"/></svg>',
    gato: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.4 4.6 3.6 8.4 6.2M18 8.4l1.4-4.8-3.8 2.6"/><path d="M4.6 10.6C4.6 15 7.9 18.4 12 18.4s7.4-3.4 7.4-7.8c0-1-.2-2-.5-2.9"/><path d="M9.6 11.4h.01M14.4 11.4h.01M12 13.6v1.2M12 14.8c-.6.7-1.5.9-2.3.6M12 14.8c.6.7 1.5.9 2.3.6"/></svg>'
  };

  /* El enlace final se arma con la etiqueta de la tienda: cambiarla un dia
     deja vivos todos los enlaces sin tocar un solo producto. */
  function enlace(p) {
    var ti = D.tiendas[p.store];
    var url = p.product_url;
    if (ti && ti.link_template && ti.affiliate_tag) {
      url = ti.link_template.replace("{url}", p.product_url).replace("{tag}", encodeURIComponent(ti.affiliate_tag));
    }
    return url;
  }
  function nombreTienda(k) { var ti = D.tiendas[k]; return ti ? ti.name : k; }
  function notaPrecio(p) {
    var ti = D.tiendas[p.store] || {};
    if (ti.show_price === false || p.price_ref == null) {
      return t(ti.price_note_es || "Ver precio", ti.price_note_en || "See price");
    }
    var f = t(p.reviewed_at ? " · rev. " + p.reviewed_at.slice(8, 10) + "/" + p.reviewed_at.slice(5, 7) : "",
              p.reviewed_at ? " · chk " + p.reviewed_at.slice(5, 7) + "/" + p.reviewed_at.slice(8, 10) : "");
    return t("Desde $", "From $") + p.price_ref + f;
  }

  /* ── Colecciones ──────────────────────────────────────────────────────── */
  function pintaColecciones() {
    var c = el("mk-cols");
    if (!c) return;
    c.innerHTML = D.listas.map(function (l) {
      var ids = D.enLista[l.slug] || [];
      var fotos = ids.slice(0, 4).map(function (id) {
        var p = D.productos.filter(function (x) { return x.id === id; })[0];
        return p && p.image_url ? '<img src="' + esc(p.image_url) + '" alt="" loading="lazy">' : "";
      }).join("");
      return '<button class="mk-col" data-lista="' + esc(l.slug) + '">' +
        '<span class="mk-col-pics">' + fotos + "</span>" +
        "<span><span class=\"mk-col-t\">" + esc(t(l.title_es, l.title_en)) + "</span>" +
        '<span class="mk-col-n">' + ids.length + t(" artículos", " items") + "</span></span></button>";
    }).join("");
    [].forEach.call(c.querySelectorAll(".mk-col"), function (b) {
      b.addEventListener("click", function () {
        F.lista = (F.lista === b.getAttribute("data-lista")) ? "" : b.getAttribute("data-lista");
        F.categoria = ""; F.etapa = "";
        pinta();
        var bar = el("mk-bar");
        if (bar) window.scrollTo({ top: bar.getBoundingClientRect().top + window.scrollY - 10, behavior: "smooth" });
      });
    });
  }

  /* ── Barra de filtros ─────────────────────────────────────────────────── */
  function chip(txt, activo, campo, valor, icono) {
    return '<button class="mk-chip' + (activo ? " on" : "") + '" data-c="' + campo + '" data-v="' + esc(valor) + '">' +
      (icono || "") + esc(txt) + "</button>";
  }
  function pintaBarra(n) {
    var bar = el("mk-bar");
    if (!bar) return;
    var etapas = ETAPAS.filter(function (e) { return !F.especie || !e.sp || e.sp === F.especie; });
    var tiendas = Object.keys(D.tiendas).filter(function (k) {
      return D.productos.some(function (p) { return p.store === k; });
    });
    var hay = F.especie || F.categoria || F.etapa || F.tienda || F.lista;

    var html = '<div class="mk-row">' +
      '<span class="mk-lbl">' + t("Para", "For") + "</span>" +
      chip(t("Perro", "Dog"), F.especie === "dog", "especie", "dog", ICO.perro) +
      chip(t("Gato", "Cat"), F.especie === "cat", "especie", "cat", ICO.gato) +
      '<span class="mk-cnt">' + n + t(" artículos", " items") + "</span></div>";

    html += '<div class="mk-row"><span class="mk-lbl">' + t("Qué", "What") + "</span>" +
      CATS.map(function (c) { return chip(t(c.es, c.en), F.categoria === c.k, "categoria", c.k); }).join("") + "</div>";

    html += '<div class="mk-row"><span class="mk-lbl">' + t("Etapa", "Stage") + "</span>" +
      etapas.map(function (e) { return chip(t(e.es, e.en), F.etapa === e.k, "etapa", e.k); }).join("");
    if (tiendas.length > 1) {
      html += tiendas.map(function (k) { return chip(nombreTienda(k), F.tienda === k, "tienda", k); }).join("");
    }
    if (hay) html += '<button class="mk-limpiar" id="mk-limpiar">' + t("Quitar filtros", "Clear filters") + "</button>";
    html += "</div>";

    bar.innerHTML = html;
    [].forEach.call(bar.querySelectorAll(".mk-chip"), function (b) {
      b.addEventListener("click", function () {
        var campo = b.getAttribute("data-c"), valor = b.getAttribute("data-v");
        F[campo] = (F[campo] === valor) ? "" : valor;
        if (campo === "especie") {
          F.lista = "";
          var e = ETAPAS.filter(function (x) { return x.k === F.etapa; })[0];
          if (e && e.sp && e.sp !== F.especie) F.etapa = "";
        }
        pinta();
      });
    });
    var lim = el("mk-limpiar");
    if (lim) lim.addEventListener("click", function () { F = { especie: "", categoria: "", etapa: "", tienda: "", lista: "" }; pinta(); });
  }

  /* ── Rejilla ──────────────────────────────────────────────────────────── */
  function filtra() {
    var ids = F.lista ? (D.enLista[F.lista] || []) : null;
    return D.productos.filter(function (p) {
      if (ids && ids.indexOf(p.id) < 0) return false;
      if (F.especie && p.species !== F.especie) return false;
      if (F.categoria && p.category !== F.categoria) return false;
      if (F.tienda && p.store !== F.tienda) return false;
      if (F.etapa && (p.stages || []).indexOf(F.etapa) < 0) return false;
      return true;
    });
  }
  function nombreCat(k) { var c = CATS.filter(function (x) { return x.k === k; })[0]; return c ? t(c.es, c.en) : k; }

  function pintaGrid(lista) {
    var g = el("mk-grid");
    if (!g) return;
    if (!lista.length) {
      g.innerHTML = '<div class="mk-vacio"><p>' +
        t("Nada con esos filtros todavía. Quita alguno y vuelve a mirar.",
          "Nothing matches those filters yet. Drop one and look again.") + "</p></div>";
      return;
    }
    g.innerHTML = '<div class="mk-grid">' + lista.map(function (p) {
      var desc = t(p.desc_es, p.desc_en);
      return '<article class="mk-card">' +
        '<div class="mk-pic"><img src="' + esc(p.image_url) + '" alt="' + esc(t(p.name_es, p.name_en)) + '" loading="lazy"></div>' +
        '<div class="mk-body">' +
          '<p class="mk-tag">' + esc(nombreCat(p.category)) + ' <span class="mk-sep">·</span> <span class="mk-tienda">' + esc(nombreTienda(p.store)) + '</span>' + "</p>" +
          '<h3 class="mk-name">' + esc(t(p.name_es, p.name_en)) + "</h3>" +
          (desc ? '<p class="mk-desc">' + esc(desc) + "</p>" : "") +
          '<a class="mk-go" href="' + esc(enlace(p)) + '" target="_blank" rel="sponsored nofollow noopener" data-id="' + esc(p.id) + '">' +
            "<span>" + esc(notaPrecio(p)) + "</span>" + ICO.salir +
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

  function pinta() {
    var lista = filtra();
    pintaBarra(lista.length);
    pintaGrid(lista);
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
    } catch (e) {}
  }

  function legal() {
    var p = el("mk-legal-txt");
    if (!p) return;
    p.textContent = t(
      "BrightPuppy participa en programas de afiliados. Si compras por un enlace de esta página podemos ganar una comisión, sin coste adicional para ti. Los precios y la disponibilidad los pone cada tienda y cambian sin aviso: el precio bueno es el que veas al abrir el enlace. No vendemos ni enviamos estos artículos y no somos responsables de la compra, el envío ni la garantía, que corren a cuenta de la tienda. Nada de lo que hay aquí es consejo veterinario; para medicación, pulgas o cualquier duda de salud, pregunta a tu veterinario.",
      "BrightPuppy takes part in affiliate programs. If you buy through a link on this page we may earn a commission at no extra cost to you. Prices and availability are set by each retailer and change without notice: the real price is the one you see when you open the link. We do not sell or ship these items and we are not responsible for the purchase, shipping or warranty, which are the retailer's. Nothing here is veterinary advice; for medication, fleas or any health question, ask your vet."
    );
  }

  /* ── Modo kit ─────────────────────────────────────────────────────────
     Con ?k=<token> la pagina deja de ser escaparate y se vuelve la lista que
     le mandamos a esa persona: su nombre, el de su cachorro, sin filtros y
     sin las otras colecciones. El token se resuelve por una funcion de la
     base (market_kit), porque market_sends guarda nombres y no puede abrirse. */
  function leeToken() {
    try { return (new URLSearchParams(location.search).get("k") || "").trim(); } catch (e) { return ""; }
  }

  function pintaKit() {
    var k = D.kit;
    var hero = document.querySelector(".mk-hero .container");
    if (hero) {
      var quien = k.mascota ? t("para ", "for ") + k.mascota : (k.nombre ? t("para ", "for ") + k.nombre : "");
      hero.innerHTML =
        '<p style="font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--orange);margin:0 0 10px">' +
          esc(k.de_parte_de || "BrightPuppy") + "</p>" +
        "<h1>" + esc(t(k.titulo_es, k.titulo_en)) +
          (quien ? ' <em>' + esc(quien) + "</em>" : "") + "</h1>" +
        (t(k.intro_es, k.intro_en) ? "<p>" + esc(t(k.intro_es, k.intro_en)) + "</p>" : "") +
        '<p class="mk-aviso">' + t(
          "<b>Aviso:</b> esto no es una tienda nuestra. Compras en Amazon o donde prefieras; si entras por aquí nos llevamos una comisión de afiliado, y a ti no te cuesta un centavo más.",
          "<b>Disclosure:</b> this is not our store. You buy from Amazon or wherever you like; if you go through us we earn an affiliate commission, and it costs you nothing extra."
        ) + "</p>";
    }
    var cols = document.querySelector(".mk-cols");
    if (cols) cols.style.display = "none";
    var bar = el("mk-bar");
    if (bar) bar.style.display = "none";
    try { document.title = t(k.titulo_es, k.titulo_en) + " · BPuppy"; } catch (e) {}
    F.lista = k.list_slug;
  }

  function arranca() {
    var g = el("mk-grid");
    if (g) g.innerHTML = '<div class="mk-grid">' + new Array(10).join('<div class="mk-cargando"></div>') + "</div>";
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
      pedir("market_lists?select=slug,title_es,title_en,species,position&active=is.true&order=position"),
      pedir("market_stores?select=slug,name,link_template,affiliate_tag,show_price,price_note_es,price_note_en&active=is.true"),
      pedir("market_list_items?select=list_slug,product_id,position&order=position&limit=2000"),
      elKit
    ]).then(function (r) {
      var k = (r[4] && r[4][0]) || null;
      if (k) { D.kit = k; D.kit.token = tok; if (k.lang === "en" || k.lang === "es") ES = (k.lang !== "en"); }
      D.productos = r[0] || [];
      D.listas = r[1] || [];
      (r[2] || []).forEach(function (s) { D.tiendas[s.slug] = s; });
      (r[3] || []).forEach(function (i) {
        (D.enLista[i.list_slug] = D.enLista[i.list_slug] || []).push(i.product_id);
      });
      if (!D.productos.length) {
        var c = document.querySelector(".mk-cols");
        if (c) c.style.display = "none";
        pintaGrid([]);
        return;
      }
      if (D.kit) { pintaKit(); pintaGrid(filtra()); return; }
      pintaColecciones();
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
