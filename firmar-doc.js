/* ===========================================================================
   firmar-doc.js — pagina publica de firma electronica (multi-firmante)

   Se entra por  /firmar-doc?t=<token DEL FIRMANTE>  (no el del documento).
   Habla solo con el edge `docsign` v4:
     by_token -> {doc, signer:{name,color,fields}, others, ya_firmado, pdf_url, page_sizes}
     sign     -> estampa SOLO las cajas de ESE firmante

   Las cajas (`signer.fields`) vienen normalizadas 0..1 con ORIGEN ARRIBA-IZQUIERDA
   sobre la pagina TAL COMO SE VE (con la rotacion ya aplicada). pdf.js entrega el
   viewport tambien con la rotacion aplicada, asi que aqui basta con porcentajes:
   left = x*100%, top = y*100%. La conversion al origen abajo-izquierda de pdf-lib
   (pdfY = alto * (1 - y - h)) la hace el edge; aqui NO se toca.

   Tinta azul #1d4ed8 siempre: el trazo del lienzo y la firma escrita se generan ya
   en azul, porque el edge no recolorea la imagen que recibe.
   =========================================================================== */
(function () {
  "use strict";

  var SUPA = "https://oqqwmcplljirbreowrll.supabase.co";
  var ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
  var BLUE = "#1d4ed8";
  var TEL = "+1 (929) 428-7300";
  var ZOOMS = [1, 1.4, 1.9, 2.6];

  var LANG = (window.__BP_LANG === "en") ? "en" : "es";
  function EN() { return LANG === "en"; }
  function T(es, en) { return EN() ? en : es; }
  function $(id) { return document.getElementById(id); }
  function qp(n) { try { return new URLSearchParams(location.search).get(n) || ""; } catch (e) { return ""; } }
  function show(el, on) { if (el) el.hidden = !on; }
  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var TOKEN = (qp("t") || qp("token") || "").trim();
  var DRAFT = "bp-docsign-" + (TOKEN || "x");

  /* estado del documento */
  var S = { doc: {}, signer: {}, others: [], fields: [], color: BLUE, url: "", ya: false };
  /* estado de la firma */
  var mode = "type", pad = null, padData = null, sending = false, sigPng = "", fontReady = null;
  var curField = -1, boxes = [], touched = false;
  /* estado del visor */
  var V = { doc: null, pages: [], seq: 0, ro: null, zoom: 0, ok: false, usedW: 0, retries: 0, autoFix: 0 };

  /* ------------------------------------------------------------------ textos */
  function paintStatic() {
    document.title = T("Firmar documento — BrightPuppy", "Sign document — BrightPuppy");
    $("hdr").textContent = T("BrightPuppy · Firma de documento", "BrightPuppy · Document signing");
    $("loading-txt").textContent = T("Cargando tu documento…", "Loading your document…");
    $("error-home").textContent = T("Ir a BrightPuppy", "Go to BrightPuppy");
    $("done-home").textContent = T("Ir a BrightPuppy", "Go to BrightPuppy");
    $("eyebrow").textContent = T("Firma electrónica", "Electronic signature");
    $("doc-h").textContent = T("El documento", "The document");
    $("pdf-open-txt").textContent = T("Abrir el PDF", "Open the PDF");
    $("sig-h").textContent = T("Tu firma", "Your signature");
    $("sig-sub").textContent = T("Escríbela o dibújala. Va en tinta azul.", "Type it or draw it. It goes in blue ink.");
    $("name-lbl").textContent = T("Tu nombre completo", "Your full name");
    $("name").placeholder = T("Nombre y apellido", "First and last name");
    $("tab-type-txt").textContent = T("Escribir mi nombre", "Type my name");
    $("tab-draw-txt").textContent = T("Dibujar mi firma", "Draw my signature");
    $("type-hint").textContent = T("Así se verá tu firma en el documento.", "This is how your signature will look on the document.");
    $("clear-btn").textContent = T("Borrar", "Clear");
    $("undo-btn").textContent = T("Deshacer", "Undo");
    $("accept-txt").textContent = T(
      "He leído el documento y acepto firmarlo electrónicamente. Mi firma electrónica tiene el mismo valor legal que una firma manuscrita.",
      "I have read the document and I agree to sign it electronically. My electronic signature has the same legal value as a handwritten signature.");
    $("submit-btn").textContent = T("Firmar y enviar", "Sign and send");
    $("legal").textContent = T(
      "Al firmar quedará registrada la fecha, la hora y tu conexión, como constancia de la firma.",
      "When you sign, the date, time and your connection are recorded as proof of signature.");
    $("zoom-out").setAttribute("aria-label", T("Reducir", "Zoom out"));
    $("zoom-in").setAttribute("aria-label", T("Ampliar", "Zoom in"));
  }

  function docTypeLabel(t) {
    switch (String(t || "")) {
      case "client_contract": return T("Contrato de cliente", "Client contract");
      case "breeder_contract": return T("Contrato de criador", "Breeder contract");
      case "company_legal": return T("Documento legal", "Legal document");
      default: return T("Documento", "Document");
    }
  }

  function fmtWhen(iso) {
    if (!iso) return "";
    try {
      var d = new Date(iso);
      if (isNaN(d.getTime())) return "";
      return d.toLocaleString(EN() ? "en-US" : "es-ES",
        { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/New_York" });
    } catch (e) { return ""; }
  }

  /* ------------------------------------------------------------------ errores */
  function fail(title, msg) {
    show($("loading"), false); show($("app"), false);
    $("error-title").textContent = title;
    $("error-msg").textContent = msg;
    show($("error"), true);
    try { window.scrollTo(0, 0); } catch (e) {}
  }
  function isSentence(s) { s = String(s || ""); return /\s/.test(s) && s.length > 12; }

  /* El edge responde con frases en espanol (sin tildes), no con codigos. */
  function errFor(code, http) {
    var c = String(code || "").toLowerCase();
    if (/expir|caduc|venci/.test(c)) return {
      t: T("El enlace caducó", "This link expired"),
      m: T("Este enlace para firmar ya no es válido. Escríbenos por SMS o WhatsApp al " + TEL + " y te enviamos uno nuevo.",
           "This signing link is no longer valid. Text us or WhatsApp " + TEL + " and we will send you a new one.")
    };
    if (/ya firmaste|already/.test(c)) return {
      t: T("Ya firmaste este documento", "You already signed this document"),
      m: T("Tu firma quedó registrada. Si necesitas la copia otra vez, escríbenos por SMS o WhatsApp al " + TEL + ".",
           "Your signature is on file. If you need the copy again, text us or WhatsApp " + TEL + ".")
    };
    if (/void|anulad|cancel/.test(c)) return {
      t: T("Documento anulado", "Document voided"),
      m: T("Este documento fue anulado y ya no se puede firmar. Escríbenos por SMS o WhatsApp al " + TEL + ".",
           "This document was voided and can no longer be signed. Text us or WhatsApp " + TEL + ".")
    };
    if (/enlace inv|no es v[aá]lido|ya fue usado|token|not_?found|invalid|no existe|no se encontro/.test(c) || http === 404) return {
      t: T("Enlace inválido", "Invalid link"),
      m: T("No encontramos ningún documento con este enlace, o ya fue usado. Revisa que hayas abierto el enlace completo del correo, o escríbenos por SMS o WhatsApp al " + TEL + ".",
           "We could not find a document for this link, or it was already used. Check that you opened the full link from the email, or text us / WhatsApp " + TEL + ".")
    };
    if (/network|fetch|conex/.test(c)) return {
      t: T("Sin conexión", "No connection"),
      m: T("No pudimos conectarnos. Revisa tu internet e inténtalo de nuevo.", "We could not connect. Check your internet and try again.")
    };
    if (!EN() && isSentence(code)) return { t: "Algo salió mal", m: code + " Si necesitas ayuda, escríbenos por SMS o WhatsApp al " + TEL + "." };
    return {
      t: T("Algo salió mal", "Something went wrong"),
      m: T("No pudimos abrir el documento. Inténtalo de nuevo en un momento. Si sigue igual, escríbenos por SMS o WhatsApp al " + TEL + ".",
           "We could not open the document. Please try again in a moment. If it keeps happening, text us or WhatsApp " + TEL + ".")
    };
  }

  function api(action, payload) {
    var body = { action: action };
    for (var k in (payload || {})) { if (Object.prototype.hasOwnProperty.call(payload, k)) body[k] = payload[k]; }
    return fetch(SUPA + "/functions/v1/docsign", {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": ANON, "Authorization": "Bearer " + ANON },
      body: JSON.stringify(body)
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (d) { return { http: r.status, ok: r.ok, d: (d || {}) }; });
    });
  }

  /* ------------------------------------------------------- borrador local */
  function saveDraft() {
    try {
      var st = null;
      if (padData && padData.length) {
        var js = JSON.stringify(padData);
        if (js.length < 120000) st = padData;
      }
      localStorage.setItem(DRAFT, JSON.stringify({
        name: $("name").value, mode: mode, accept: $("accept").checked, strokes: st
      }));
    } catch (e) {}
  }
  function loadDraft() { try { return JSON.parse(localStorage.getItem(DRAFT) || "null"); } catch (e) { return null; } }
  function clearDraft() { try { localStorage.removeItem(DRAFT); } catch (e) {} }

  /* ------------------------------------------------------- firma escrita */
  function ensureFont() {
    if (fontReady) return fontReady;
    try {
      if (document.fonts && document.fonts.load) {
        fontReady = document.fonts.load('700 110px "Dancing Script"')
          .then(function () { return document.fonts.ready; })
          .catch(function () { return null; });
      } else { fontReady = Promise.resolve(null); }
    } catch (e) { fontReady = Promise.resolve(null); }
    return fontReady;
  }

  /* Recorta el PNG a la tinta real. Sin esto el edge encaja TODO el lienzo dentro
     de la caja (scaleToFit) y la firma sale diminuta y descentrada. */
  function cropToInk(canvas) {
    var w = canvas.width, h = canvas.height, data;
    if (!w || !h) return "";
    try { data = canvas.getContext("2d").getImageData(0, 0, w, h).data; }
    catch (e) { return canvas.toDataURL("image/png"); }
    var minX = w, minY = h, maxX = -1, maxY = -1, x, y;
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        if (data[(y * w + x) * 4 + 3] > 12) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    if (maxX < 0) return "";
    var m = Math.max(6, Math.round(Math.min(w, h) * 0.03));
    minX = Math.max(0, minX - m); minY = Math.max(0, minY - m);
    maxX = Math.min(w - 1, maxX + m); maxY = Math.min(h - 1, maxY + m);
    var out = document.createElement("canvas");
    out.width = maxX - minX + 1; out.height = maxY - minY + 1;
    out.getContext("2d").drawImage(canvas, minX, minY, out.width, out.height, 0, 0, out.width, out.height);
    return out.toDataURL("image/png");
  }

  function typedToPng(text) {
    var t = String(text || "").trim();
    if (!t) return Promise.resolve("");
    return ensureFont().then(function () {
      var W = 900, H = 260, PAD = 40;
      var c = document.createElement("canvas");
      c.width = W; c.height = H;
      var ctx = c.getContext("2d");
      var size = 128, guard = 0;
      function setF(s) { ctx.font = '700 ' + s + 'px "Dancing Script", cursive'; }
      setF(size);
      while (size > 26 && ctx.measureText(t).width > (W - PAD * 2) && guard < 90) { size -= 4; setF(size); guard++; }
      ctx.fillStyle = BLUE;               /* tinta azul, nunca negro */
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(t, W / 2, H / 2, W - PAD * 2);
      return cropToInk(c);
    });
  }

  /* ------------------------------------------------------- lienzo de firma */
  function padCanvas() { return $("pad"); }

  function sizePad() {
    var canvas = padCanvas();
    if (!canvas || !canvas.offsetWidth) return;
    var ratio = Math.min(Math.max(window.devicePixelRatio || 1, 1), 3);
    canvas.width = Math.round(canvas.offsetWidth * ratio);
    canvas.height = Math.round(canvas.offsetHeight * ratio);
    var ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(ratio, ratio);
    if (pad) {
      pad.clear();
      if (padData && padData.length) { try { pad.fromData(padData); } catch (e) {} }
    }
  }

  function initPad() {
    if (pad || typeof window.SignaturePad !== "function") return;
    pad = new window.SignaturePad(padCanvas(), {
      backgroundColor: "rgba(255,255,255,0)",
      penColor: BLUE,                     /* tinta azul */
      minWidth: 1.1, maxWidth: 3
    });
    pad.addEventListener("endStroke", function () {
      touched = true;
      padData = pad.toData();
      onSigChange();
      saveDraft();
    });
    sizePad();
  }

  function hasDrawing() { return !!(pad && !pad.isEmpty()); }

  function clearPad() { if (pad) pad.clear(); padData = null; touched = true; onSigChange(); saveDraft(); }

  function undoStroke() {
    if (!pad) return;
    var d = pad.toData() || [];
    d.pop();
    try { pad.fromData(d); } catch (e) { pad.clear(); }
    padData = d.length ? d : null;
    onSigChange();
    saveDraft();
  }

  /* ------------------------------------------------------- modo de firma */
  function setMode(m) {
    mode = (m === "draw") ? "draw" : "type";
    $("tab-type").setAttribute("aria-selected", mode === "type" ? "true" : "false");
    $("tab-draw").setAttribute("aria-selected", mode === "draw" ? "true" : "false");
    show($("pane-type"), mode === "type");
    show($("pane-draw"), mode === "draw");
    if (mode === "draw") { initPad(); sizePad(); }
    onSigChange();
    saveDraft();
  }

  function paintTyped() {
    var v = String($("name").value || "").trim();
    $("typed-txt").textContent = v || T("Tu nombre", "Your name");
    $("typed-prev").classList.toggle("empty", !v);
  }

  /* La firma tal cual se va a estampar (PNG recortado, en azul). */
  function buildSig() {
    var name = String($("name").value || "").trim();
    if (mode === "draw") return Promise.resolve(hasDrawing() ? cropToInk(padCanvas()) : "");
    return (name.length >= 2) ? typedToPng(name).catch(function () { return ""; }) : Promise.resolve("");
  }

  /* Vista previa DENTRO de las cajas del PDF: lo que ve es lo que se estampa.
     Solo despues de que la persona toque algo; si no, al abrir la pagina el
     recuadro ya se veria firmado (el nombre viene prellenado) y engana. */
  function paintSig() {
    return buildSig().then(function (png) {
      sigPng = png || "";
      var on = touched && !!sigPng;
      for (var i = 0; i < boxes.length; i++) {
        var img = boxes[i].querySelector(".box-img");
        if (!img) continue;
        if (on) { img.src = sigPng; boxes[i].classList.add("has-sig"); }
        else { img.removeAttribute("src"); boxes[i].classList.remove("has-sig"); }
      }
      return sigPng;
    });
  }

  var prevTimer = null;
  function onSigChange() {
    updateBtn();
    $("draw-hint").textContent = hasDrawing() ? T("Firma capturada", "Signature captured") : T("Firma dentro del recuadro", "Sign inside the box");
    if (prevTimer) clearTimeout(prevTimer);
    prevTimer = setTimeout(function () { paintSig(); }, 220);
  }

  function updateBtn() {
    var name = String($("name").value || "").trim();
    var sigOk = (mode === "type") ? (name.length >= 2) : hasDrawing();
    $("submit-btn").disabled = !(!!name && sigOk && $("accept").checked && !sending);
  }

  /* --------------------------------------------------------------- visor PDF */
  function pdfjsReady() {
    return new Promise(function (res) {
      if (window.pdfjsLib || window.__bpPdfjsFailed) { res(window.pdfjsLib || null); return; }
      var done = false;
      function fin() { if (done) return; done = true; res(window.pdfjsLib || null); }
      window.addEventListener("bp-pdfjs", fin);
      setTimeout(fin, 15000);
    });
  }

  function fallbackViewer(url) {
    V.ok = false;
    show($("viewer"), false);
    show($("zoombar"), false);
    var f = $("pdf-fallback");
    f.src = url + (url.indexOf("#") >= 0 ? "" : "#view=FitH");
    show(f, true);
    $("pdf-hint").textContent = S.fields.length && !S.ya
      ? T("Aquí no podemos marcar los recuadros. Tu firma se colocará automáticamente donde corresponde.",
          "We cannot mark the boxes here. Your signature will be placed automatically where it belongs.")
      : "";
  }

  function openPdf(url) {
    return pdfjsReady().then(function (lib) {
      if (!lib) { fallbackViewer(url); return false; }
      return lib.getDocument({ url: url }).promise.then(function (doc) {
        V.doc = doc; V.ok = true;
        show($("pdf-fallback"), false);
        show($("viewer"), true);
        show($("zoombar"), true);
        $("pdf-hint").textContent = T("Desliza para leerlo. Usa − y + para acercar.", "Scroll to read it. Use − and + to zoom.");
        return layout().then(function () { return true; });
      }).catch(function (e) {
        try { console.error("pdf", e); } catch (_e) {}
        fallbackViewer(url);
        return false;
      });
    });
  }

  function viewerW() { return $("viewer").clientWidth || 0; }
  function baseWidth() { return Math.max(240, viewerW() - 24); }
  function wantedW() { return baseWidth() * ZOOMS[V.zoom]; }

  function layout() {
    /* Si el visor todavia no tiene ancho (pestana en segundo plano, tarjeta recien
       mostrada, fuentes sin asentar), el PDF saldria diminuto y ya no se corregiria.
       Se espera a que el navegador le de ancho de verdad. */
    if (viewerW() < 60 && V.retries < 25) {
      V.retries++;
      return new Promise(function (r) { setTimeout(function () { r(layout()); }, 120); });
    }
    V.retries = 0;

    var host = $("pages");
    var seq = ++V.seq;
    host.textContent = "";
    V.pages = [];
    boxes = [];

    var W = wantedW();
    V.usedW = W;
    var jobs = [], i;
    for (i = 1; i <= V.doc.numPages; i++) jobs.push(i);

    return jobs.reduce(function (chain, n) {
      return chain.then(function () {
        if (seq !== V.seq) return null;
        return V.doc.getPage(n).then(function (page) {
          if (seq !== V.seq) return;
          var vp1 = page.getViewport({ scale: 1 });
          var scale = W / vp1.width;
          var vp = page.getViewport({ scale: scale });
          var box = document.createElement("div");
          box.className = "pg";
          box.style.width = Math.floor(vp.width) + "px";
          box.style.height = Math.floor(vp.height) + "px";
          var cv = document.createElement("canvas");
          cv.className = "pg-cv";
          box.appendChild(cv);
          var ov = document.createElement("div");
          ov.className = "ov";
          box.appendChild(ov);
          host.appendChild(box);
          V.pages.push({ el: box, ov: ov, page: page, scale: scale, cv: cv, done: false });
        });
      });
    }, Promise.resolve()).then(function () {
      if (seq !== V.seq) return;
      paintBoxes();
      updatePageInfo();
      sweep();
      setTimeout(sweep, 80);
      watchViewer();
    });
  }

  /* Pinta solo las paginas cercanas a la vista (un PDF largo en el movil no cabe
     entero en memoria). Barrido manual a proposito: IntersectionObserver no
     dispara de forma fiable si la pestana no esta al frente. */
  function sweep() {
    if (!V.pages.length) return;
    var vr = $("viewer").getBoundingClientRect(), seq = V.seq, i, r;
    for (i = 0; i < V.pages.length; i++) {
      if (V.pages[i].done) continue;
      r = V.pages[i].el.getBoundingClientRect();
      if (r.bottom > vr.top - 600 && r.top < vr.bottom + 600) renderPage(V.pages[i], seq);
    }
  }

  /* Vigila el ancho real del visor y rehace el montaje si cambio (barra de scroll
     que aparece, giro del telefono, panel que se abre). Con tope, para no entrar
     en un bucle de re-montajes. */
  var layoutT = null;
  function queueLayout() {
    if (layoutT) clearTimeout(layoutT);
    layoutT = setTimeout(function () { layoutT = null; if (V.ok) layout(); }, 180);
  }
  function watchViewer() {
    if (V.ro || !("ResizeObserver" in window)) return;
    V.ro = new ResizeObserver(function () {
      if (!V.ok) return;
      if (Math.abs(wantedW() - V.usedW) < 6) { V.autoFix = 0; return; }
      if (V.autoFix >= 4) return;
      V.autoFix++;
      queueLayout();
    });
    V.ro.observe($("viewer"));
  }

  function renderPage(p, seq) {
    if (!p || p.done || seq !== V.seq) return;
    p.done = true;
    var dpr = Math.min(window.devicePixelRatio || 1, V.pages.length > 12 ? 1.5 : 2);
    var vp = p.page.getViewport({ scale: p.scale * dpr });
    p.cv.width = Math.floor(vp.width);
    p.cv.height = Math.floor(vp.height);
    try {
      p.page.render({ canvasContext: p.cv.getContext("2d"), viewport: vp }).promise
        .then(function () { if (seq === V.seq) p.el.classList.add("ready"); })
        .catch(function () { p.done = false; });
    } catch (e) { p.done = false; }
  }

  /* Cajas del firmante, en % sobre la pagina: sobreviven al zoom sin recalcular. */
  function paintBoxes() {
    boxes = [];
    if (!S.fields.length) return;
    var many = S.fields.length > 1;
    S.fields.forEach(function (f, i) {
      var idx = Math.min(V.pages.length, Math.max(1, Number(f.page) || 1)) - 1;
      var p = V.pages[idx];
      if (!p) return;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "box" + (S.ya ? " signed" : "");
      b.style.left = (Math.max(0, Math.min(1, Number(f.x) || 0)) * 100) + "%";
      b.style.top = (Math.max(0, Math.min(1, Number(f.y) || 0)) * 100) + "%";
      b.style.width = (Math.max(0.01, Math.min(1, Number(f.w) || 0.2)) * 100) + "%";
      b.style.height = (Math.max(0.01, Math.min(1, Number(f.h) || 0.06)) * 100) + "%";
      b.style.setProperty("--c", S.color || BLUE);
      b.setAttribute("aria-label", T("Aquí firmas tú", "You sign here") + (many ? " (" + (i + 1) + "/" + S.fields.length + ")" : ""));
      b.innerHTML = (many ? '<span class="box-num"></span>' : "") + '<span class="box-lbl"></span><img class="box-img" alt="">';
      if (many) b.querySelector(".box-num").textContent = String(i + 1);
      if (!S.ya) {
        b.querySelector(".box-lbl").textContent = T("Firma aquí", "Sign here");
        b.addEventListener("click", focusSignCard);
      }
      p.ov.appendChild(b);
      boxes.push(b);
    });
    if (touched && sigPng) paintSig();
  }

  function updatePageInfo() {
    if (!V.ok || !V.pages.length) { $("pg-info").textContent = ""; return; }
    var v = $("viewer");
    var mid = v.scrollTop + v.clientHeight / 2;
    var n = 1;
    for (var i = 0; i < V.pages.length; i++) {
      if (V.pages[i].el.offsetTop <= mid) n = i + 1;
    }
    $("pg-info").textContent = T("Página ", "Page ") + n + T(" de ", " of ") + V.pages.length;
  }

  /* Desplazamiento suave SIN scrollIntoView (regla del proyecto). */
  function scrollViewerTo(el, center) {
    var v = $("viewer");
    var top = el.getBoundingClientRect().top - v.getBoundingClientRect().top + v.scrollTop;
    if (center) top -= Math.max(0, (v.clientHeight - el.offsetHeight) / 2);
    else top -= 16;
    top = Math.max(0, top);
    try { v.scrollTo({ top: top, behavior: "smooth" }); } catch (e) { v.scrollTop = top; }
  }
  function scrollPageTo(el) {
    var y = el.getBoundingClientRect().top + window.pageYOffset - 70;
    y = Math.max(0, y);
    try { window.scrollTo({ top: y, behavior: "smooth" }); } catch (e) { window.scrollTo(0, y); }
  }
  function focusSignCard() {
    var c = $("sign-card");
    if (c && !c.hidden) { scrollPageTo(c); try { $("name").focus({ preventScroll: true }); } catch (e) {} }
  }

  function flash(b) {
    b.classList.remove("flash");
    void b.offsetWidth;
    b.classList.add("flash");
  }

  function nextField() {
    if (!boxes.length) return;
    curField = (curField + 1) % boxes.length;
    scrollViewerTo(boxes[curField], true);
    flash(boxes[curField]);
    paintFieldInfo();
  }

  function paintFieldInfo() {
    var n = S.fields.length;
    if (!n) {
      $("fld-info").textContent = S.ya
        ? T("Tu firma quedó al final del documento.", "Your signature was placed at the end of the document.")
        : T("Tu firma se colocará al final del documento.", "Your signature will be placed at the end of the document.");
      show($("next-fld"), false);
      return;
    }
    var where = (curField >= 0 && n > 1) ? T(" · viendo la " + (curField + 1) + " de " + n, " · showing " + (curField + 1) + " of " + n) : "";
    if (S.ya) {
      $("fld-info").textContent = n === 1
        ? T("Tu firma está en 1 lugar del documento.", "Your signature is in 1 place in the document.")
        : T("Tus firmas están en " + n + " lugares del documento.", "Your signatures are in " + n + " places in the document.");
    } else {
      $("fld-info").textContent = n === 1
        ? T("Tienes 1 recuadro para firmar, marcado en el documento.", "You have 1 signature box, marked in the document.")
        : T("Tienes " + n + " recuadros para firmar" + where + ".", "You have " + n + " signature boxes" + where + ".");
    }
    show($("next-fld"), n > 1 && V.ok);
    $("next-fld").textContent = T("Ir a la siguiente", "Go to the next one");
  }

  function setZoom(dir) {
    var z = V.zoom + dir;
    if (z < 0 || z >= ZOOMS.length) return;
    V.zoom = z;
    V.autoFix = 0;
    $("zoom-out").disabled = (z === 0);
    $("zoom-in").disabled = (z === ZOOMS.length - 1);
    if (V.ok) layout();
  }

  /* --------------------------------------------------------------- pintado */
  function pending() { return S.others.filter(function (o) { return o.status === "pending"; }); }

  function paintWho() {
    var pend = pending();
    var signed = S.others.filter(function (o) { return o.status === "signed"; });
    var total = S.others.length + 1;
    var html = '<span class="who-me"><span class="dot" style="background:' + (S.color || BLUE) + '"></span>' +
      T("Firmas tú: ", "You sign as: ") + "<b>" + escapeHtml(S.signer.name || "") + "</b></span>";
    if (S.others.length) {
      html += '<span class="who-more">' +
        T("Este documento lo firman " + total + " personas. Tú solo firmas donde aparece tu nombre.",
          "This document is signed by " + total + " people. You only sign where your name is marked.") + "</span>";
      if (signed.length) html += '<span class="who-more">' + T("Ya firmaron: ", "Already signed: ") +
        escapeHtml(signed.map(function (o) { return o.name; }).join(", ")) + "</span>";
      if (pend.length) html += '<span class="who-more">' + T("Faltan: ", "Still pending: ") +
        escapeHtml(pend.map(function (o) { return o.name; }).join(", ")) + "</span>";
    }
    $("who").innerHTML = html;
  }

  function paintDone(justSigned) {
    var pend = pending(), n = pend.length;
    $("done-mark").classList.toggle("wait", n > 0);
    if (justSigned) {
      $("done-title").innerHTML = n > 0
        ? T("Tu firma quedó <em>registrada</em>", "Your signature is <em>recorded</em>")
        : T("Documento <em>firmado</em>", "Document <em>signed</em>");
      $("done-msg").textContent = n > 0
        ? T("Falta" + (n === 1 ? "" : "n") + " " + n + " firma" + (n === 1 ? "" : "s") + " para completar el documento. Cuando firmen todos te enviamos por correo el PDF final.",
            "There " + (n === 1 ? "is" : "are") + " " + n + " signature" + (n === 1 ? "" : "s") + " left to complete the document. Once everyone signs we will email you the final PDF.")
        : T("Ya está completo. Te enviamos por correo el PDF con todas las firmas. Guárdalo para tus registros.",
            "It is complete. We emailed you the PDF with every signature. Keep it for your records.");
    } else {
      $("done-title").innerHTML = T("Ya <em>firmaste</em> este documento", "You already <em>signed</em> this document");
      var when = fmtWhen(S.signer.signed_at);
      $("done-msg").textContent =
        (when ? T("Firmaste el " + when + " (hora de Florida). ", "You signed on " + when + " (Florida time). ") : "") +
        (n > 0
          ? T("Falta" + (n === 1 ? "" : "n") + " " + n + " firma" + (n === 1 ? "" : "s") + " para completar el documento.",
              "There " + (n === 1 ? "is" : "are") + " " + n + " signature" + (n === 1 ? "" : "s") + " left to complete the document.")
          : T("El documento está completo y te enviamos la copia por correo.",
              "The document is complete and we emailed you the copy."));
    }
    var list = pend.length ? (T("Faltan: ", "Still pending: ") + pend.map(function (o) { return o.name; }).join(", ")) : "";
    $("done-list").textContent = list;
    show($("done-list"), !!list);
    show($("done"), true);
  }

  /* --------------------------------------------------------------- carga */
  function applyData(d) {
    S.doc = d.doc || {};
    S.signer = d.signer || { name: S.doc.signer_name || "", fields: [] };
    S.others = Array.isArray(d.others) ? d.others : [];
    S.fields = (Array.isArray(S.signer.fields) ? S.signer.fields : []).filter(function (f) {
      return f && isFinite(f.x) && isFinite(f.y) && isFinite(f.w) && isFinite(f.h);
    });
    S.color = S.signer.color || BLUE;
    S.url = d.pdf_url || d.file_url_firmada || "";
    S.ya = !!d.ya_firmado;
    var lg = String(d.lang || S.doc.lang || S.signer.lang || "").toLowerCase();
    if ((lg === "en" || lg === "es") && lg !== LANG) { LANG = lg; document.documentElement.lang = lg; paintStatic(); }
  }

  function render(justSigned) {
    $("doc-meta").textContent = [docTypeLabel(S.doc.doc_type), S.doc.title || S.doc.file_name || ""].filter(Boolean).join(" · ");
    $("pdf-open").href = S.url || "#";
    show($("pdf-open"), !!S.url);

    var signing = !S.ya;
    show($("hero"), signing);
    show($("sign-card"), signing);
    show($("done"), !signing);

    if (signing) {
      $("hero-h1").innerHTML = T("Revisa y <em>firma</em> tu documento", "Review and <em>sign</em> your document");
      $("hero-p").textContent = S.fields.length
        ? T("Léelo con calma. Los recuadros marcados en el documento son los tuyos: ahí va tu firma, y solo la tuya.",
            "Take your time reading it. The boxes marked in the document are yours: that is where your signature goes, and only yours.")
        : T("Léelo con calma. Cuando estés listo, firma abajo: escribe tu nombre o dibuja tu firma.",
            "Take your time reading it. When you are ready, sign below: type your name or draw your signature.");
      paintWho();
      var dr = loadDraft();
      $("name").value = (dr && dr.name) ? dr.name : (S.signer.name || "");
      if (dr && dr.accept) $("accept").checked = true;
      if (dr && dr.strokes && dr.strokes.length) { padData = dr.strokes; touched = true; }
      paintTyped();
      setMode((dr && dr.mode) ? dr.mode : "type");
    } else {
      paintDone(!!justSigned);
    }

    show($("loading"), false);
    show($("app"), true);
    show($("doc-bar"), true);
    paintFieldInfo();

    if (!S.url) {
      show($("viewer"), false);
      show($("zoombar"), false);
      $("pdf-hint").textContent = T("No pudimos mostrar el PDF aquí.", "We could not display the PDF here.");
      return;
    }
    openPdf(S.url).then(function (okPdf) {
      paintFieldInfo();
      if (signing) paintSig();
      /* Al abrir, lleva la vista al primer recuadro para que se vea dónde firma. */
      if (okPdf && signing && boxes.length) { curField = -1; nextField(); }
    });
  }

  function boot() {
    paintStatic();
    if (!TOKEN) {
      fail(T("Falta el enlace", "Missing link"),
        T("Este enlace no trae el código para firmar. Abre el enlace completo del correo que recibiste.",
          "This link does not carry the signing code. Open the full link from the email you received."));
      return;
    }
    ensureFont();
    api("by_token", { token: TOKEN }).then(function (res) {
      var d = res.d || {};
      if (!res.ok || d.error || !d.ok) {
        var e = errFor(d.error || d.message, res.http);
        fail(e.t, e.m);
        return;
      }
      applyData(d);
      render(false);
    }).catch(function () {
      var e = errFor("network");
      fail(e.t, e.m);
    });
  }

  /* --------------------------------------------------------------- envio */
  function submit() {
    if (sending) return;
    var name = String($("name").value || "").trim();
    if (!name || !$("accept").checked) return;
    if (mode === "draw" && !hasDrawing()) return;

    sending = true;
    var btn = $("submit-btn");
    btn.disabled = true;
    btn.textContent = T("Firmando…", "Signing…");
    $("msg").textContent = ""; $("msg").className = "";

    buildSig().then(function (png) {
      if (!png) throw new Error("empty");
      var body = { token: TOKEN, signature_png: png, lang: LANG };
      if (mode === "type") body.signature_typed = name;
      return api("sign", body);
    }).then(function (res) {
      var d = res.d || {};
      if (!res.ok || d.error || !d.ok) throw new Error(d.error || d.message || ("HTTP " + res.http));
      clearDraft();
      /* El PDF firmado vive en un bucket privado: hay que volver a pedir el enlace
         firmado por token para poder mostrarlo aquí mismo. */
      return api("by_token", { token: TOKEN }).then(function (r2) {
        var d2 = r2.d || {};
        if (r2.ok && d2.ok) applyData(d2);
        else { S.ya = true; S.signer.signed_at = new Date().toISOString(); }
        sending = false;
        render(true);
        try { window.scrollTo(0, 0); } catch (e) {}
      });
    }).catch(function (err) {
      sending = false;
      var code = (err && err.message) ? err.message : "";
      if (code === "empty") {
        $("msg").className = "msg err";
        $("msg").textContent = T("Falta tu firma. Escribe tu nombre o dibújala en el recuadro.",
          "Your signature is missing. Type your name or draw it in the box.");
        btn.textContent = T("Firmar y enviar", "Sign and send");
        updateBtn();
        return;
      }
      var e = errFor(code);
      if (/ya firmaste|already|void|anulad|expir|caduc|venci|enlace inv|no es v[aá]lido|ya fue usado|token|not_?found|invalid/i.test(code)) { fail(e.t, e.m); return; }
      $("msg").className = "msg err";
      $("msg").textContent = T("No se pudo enviar. ", "Could not send. ") + e.m;
      btn.textContent = T("Firmar y enviar", "Sign and send");
      updateBtn();
    });
  }

  /* --------------------------------------------------------------- eventos */
  $("name").addEventListener("input", function () { touched = true; paintTyped(); onSigChange(); saveDraft(); });
  $("accept").addEventListener("change", function () { updateBtn(); saveDraft(); });
  $("tab-type").addEventListener("click", function () { touched = true; setMode("type"); });
  $("tab-draw").addEventListener("click", function () { touched = true; setMode("draw"); });
  $("clear-btn").addEventListener("click", clearPad);
  $("undo-btn").addEventListener("click", undoStroke);
  $("submit-btn").addEventListener("click", submit);
  $("next-fld").addEventListener("click", nextField);
  $("zoom-in").addEventListener("click", function () { setZoom(1); });
  $("zoom-out").addEventListener("click", function () { setZoom(-1); });

  var scrollT = null;
  $("viewer").addEventListener("scroll", function () {
    if (scrollT) return;
    scrollT = setTimeout(function () { scrollT = null; updatePageInfo(); sweep(); }, 120);
  }, { passive: true });

  var rzT = null;
  function onResize() {
    if (rzT) clearTimeout(rzT);
    rzT = setTimeout(function () {
      sizePad();
      V.autoFix = 0;
      if (V.ok && Math.abs(wantedW() - V.usedW) > 4) layout();
    }, 220);
  }
  window.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", onResize);

  $("zoom-out").disabled = true;
  boot();
})();
