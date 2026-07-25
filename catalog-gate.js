/* ═══════ Puerta suave del catálogo + lista de espera ═══════
   Antes de ver el catálogo pedimos nombre y correo (es un catálogo privado, tiene sentido
   saber quién lo está viendo). El consentimiento de novedades va APARTE, marcado por
   defecto, y se puede desmarcar: el acceso NO depende de él. Queda el registro legal
   (texto exacto, fecha, IP, dispositivo) en `consents`. */
(function () {
  var SUPA = "https://oqqwmcplljirbreowrll.supabase.co";
  var ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
  var KEY = "bp_cat_visitor";

  function qs(n) { try { return new URLSearchParams(location.search).get(n) || ""; } catch (e) { return ""; } }
  function EN() { return (((document.documentElement.lang || "es") + "").toLowerCase().indexOf("en") === 0) || qs("lang") === "en"; }
  function T(es, en) { return EN() ? en : es; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function okEmail(e) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(e || "").trim()); }
  function saved() { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; } }

  var CONSENT_ES = "Quiero recibir novedades de BrightPuppy: cachorros nuevos, consejos de cuidado y avisos de la comunidad. Uno o dos correos al mes. Puedo darme de baja cuando quiera con un clic.";
  var CONSENT_EN = "I want BrightPuppy news: new puppies, care tips and community updates. One or two emails a month. I can unsubscribe anytime with one click.";

  if (!document.getElementById("cg-css")) {
    var st = document.createElement("style"); st.id = "cg-css";
    st.textContent =
      "@keyframes cgIn{from{opacity:0;transform:scale(.9) translateY(22px)}to{opacity:1;transform:none}}" +
      "@keyframes cgFade{from{opacity:0}to{opacity:1}}" +
      ".cg-ov{position:fixed;inset:0;z-index:100090;background:rgba(28,18,10,.62);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:20px 14px;overflow:auto;animation:cgFade .18s ease both;font-family:'Plus Jakarta Sans',system-ui,-apple-system,Segoe UI,sans-serif}" +
      ".cg-card{background:#fff;border-radius:24px;max-width:460px;width:100%;padding:26px;box-shadow:0 30px 80px -20px rgba(30,20,10,.6);animation:cgIn .3s cubic-bezier(.34,1.56,.64,1) both;color:#2D2421}" +
      ".cg-card h2{font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:23px;font-weight:800;margin:10px 0 6px;line-height:1.15}" +
      ".cg-p{font-size:14px;color:#6f6055;line-height:1.6;margin:0 0 16px}" +
      ".cg-in{width:100%;padding:13px 15px;border:1.5px solid #e4d7bf;border-radius:13px;font-size:15px;font-family:inherit;box-sizing:border-box;margin-bottom:10px;background:#fff;color:#2D2421}" +
      ".cg-in:focus{outline:none;border-color:#F58220}" +
      ".cg-chk{display:flex;gap:10px;align-items:flex-start;background:#FFF7F0;border:1px solid #F5D9BF;border-radius:14px;padding:12px 14px;margin:6px 0 14px;cursor:pointer}" +
      ".cg-chk input{width:19px;height:19px;accent-color:#F58220;margin-top:1px;flex-shrink:0;cursor:pointer}" +
      ".cg-chk span{font-size:12.5px;color:#6f6055;line-height:1.55}" +
      ".cg-go{width:100%;padding:15px;border:none;border-radius:15px;background:linear-gradient(135deg,#F55820,#E83860);color:#fff;font-family:inherit;font-size:15.5px;font-weight:800;cursor:pointer;box-shadow:0 10px 26px -10px rgba(245,88,32,.8);transition:transform .12s}" +
      ".cg-go:hover{transform:translateY(-2px)}.cg-go:disabled{opacity:.55;cursor:not-allowed;transform:none}" +
      ".cg-skip{display:block;width:100%;margin-top:11px;background:none;border:none;color:#9a8c7e;font-family:inherit;font-size:12.5px;cursor:pointer;text-decoration:underline}" +
      ".cg-err{color:#b91c1c;font-size:13px;margin-bottom:8px;font-weight:600}" +
      ".cg-legal{font-size:11px;color:#a99a8c;line-height:1.5;margin-top:12px;text-align:center}" +
      ".cg-wl{max-width:560px;margin:34px auto 0;background:#fff;border:1px solid #e4d7bf;border-radius:22px;padding:26px;box-shadow:0 14px 40px rgba(45,36,33,.09);font-family:'Plus Jakarta Sans',system-ui,sans-serif;color:#2D2421}" +
      ".cg-wl h3{font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:21px;font-weight:800;margin:0 0 6px}" +
      ".cg-g2{display:grid;grid-template-columns:1fr 1fr;gap:10px}" +
      "@media(max-width:560px){.cg-g2{grid-template-columns:1fr}.cg-card{padding:20px;border-radius:19px}}";
    document.head.appendChild(st);
  }

  /* ── 1. La puerta ── */
  function gate() {
    // VISTA PREVIA DEL STAFF: desde el CRM abrimos con ?preview=1 — nunca pedimos datos,
    // los datos son SOLO para el cliente. Se recuerda en este navegador.
    if (qs("preview") === "1" || qs("staff") === "1") {
      try { localStorage.setItem(KEY, JSON.stringify({ staff: true })); } catch (e) {}
      return;
    }
    if (saved()) return;                       // ya se identificó en este navegador
    if (!/catalogo/i.test(location.pathname)) return;
    var tk = qs("t") || qs("token");
    // Si el catálogo se armó PARA un cliente del CRM (bound), NO le pedimos nada: entra directo.
    // Si no, mostramos la puerta y —si hay algo que ya sabemos— la prellenamos.
    if (tk) {
      fetch(SUPA + "/functions/v1/catalog_capture", {
        method: "POST", headers: { "Content-Type": "application/json", apikey: ANON },
        body: JSON.stringify({ action: "prefill", token: tk })
      }).then(function (r) { return r.json(); }).then(function (x) {
        if (x && x.ok && x.bound) {
          try { localStorage.setItem(KEY, JSON.stringify({ client: true, name: x.name || "", email: x.email || "", phone: x.phone || "" })); } catch (e) {}
          return; // catálogo atado a un cliente conocido → sin puerta
        }
        buildGate(x || null);
      }).catch(function () { buildGate(null); });
    } else {
      buildGate(null);
    }
  }

  function buildGate(pf) {
    if (saved()) return;
    if (document.querySelector(".cg-ov")) return;
    var ov = document.createElement("div"); ov.className = "cg-ov";
    ov.innerHTML =
      '<div class="cg-card">' +
        '<div style="font-size:34px;line-height:1">🐶</div>' +
        "<h2>" + T("Coloca tu nombre y correo para ver los cachorros disponibles",
                   "Enter your name and email to see the available puppies") + "</h2>" +
        '<p class="cg-p">' + T(
          "Es un catálogo privado. Así sabemos a quién se lo estamos mostrando y te avisamos si alguno se reserva.",
          "This is a private catalog. That way we know who we're showing it to, and we can tell you if one gets reserved."
        ) + "</p>" +
        '<div id="cg-err" class="cg-err" style="display:none"></div>' +
        '<input class="cg-in" id="cg-name" placeholder="' + T("Tu nombre", "Your name") + '" autocomplete="name">' +
        '<input class="cg-in" id="cg-email" type="email" placeholder="' + T("Tu correo", "Your email") + '" autocomplete="email" inputmode="email">' +
        '<input class="cg-in" id="cg-phone" type="tel" placeholder="' + T("Teléfono (opcional)", "Phone (optional)") + '" autocomplete="tel" inputmode="tel">' +
        '<label class="cg-chk"><input type="checkbox" id="cg-consent" checked><span>' + esc(T(CONSENT_ES, CONSENT_EN)) + "</span></label>" +
        '<button class="cg-go" id="cg-go">' + T("Ver el catálogo", "Open the catalog") + "</button>" +
        '<button class="cg-skip" id="cg-skip">' + T("Prefiero solo mirar", "I'd rather just look") + "</button>" +
        '<div class="cg-legal">' + T(
          "Nunca compartimos tus datos con terceros. Puedes pedir que los borremos cuando quieras.",
          "We never share your data with third parties. You can ask us to delete it anytime."
        ) + "</div>" +
      "</div>";
    document.body.appendChild(ov);
    document.body.style.overflow = "hidden";

    function close() { ov.remove(); document.body.style.overflow = ""; }
    ov.querySelector("#cg-skip").onclick = function () {
      // Salida honesta: no guardamos nada y puede ver igual. Nada de muros falsos.
      try { localStorage.setItem(KEY, JSON.stringify({ skipped: true })); } catch (e) {}
      close();
    };
    ov.querySelector("#cg-go").onclick = function () {
      var err = ov.querySelector("#cg-err");
      var name = (ov.querySelector("#cg-name").value || "").trim();
      var email = (ov.querySelector("#cg-email").value || "").trim();
      var phone = (ov.querySelector("#cg-phone").value || "").trim();
      var consent = !!ov.querySelector("#cg-consent").checked;
      if (!name) { err.textContent = T("Escribe tu nombre.", "Enter your name."); err.style.display = "block"; return; }
      if (!okEmail(email)) { err.textContent = T("Escribe un correo válido.", "Enter a valid email."); err.style.display = "block"; return; }
      err.style.display = "none";
      var btn = ov.querySelector("#cg-go"); btn.disabled = true; btn.textContent = T("Abriendo…", "Opening…");
      fetch(SUPA + "/functions/v1/catalog_capture", {
        method: "POST", headers: { "Content-Type": "application/json", apikey: ANON },
        body: JSON.stringify({ action: "identify", name: name, email: email, phone: phone, consent_email: consent, consent_text: T(CONSENT_ES, CONSENT_EN), token: qs("t") || qs("token"), lang: EN() ? "en" : "es" })
      }).then(function (r) { return r.json(); }).then(function (x) {
        if (x && x.error) { err.textContent = x.error; err.style.display = "block"; btn.disabled = false; btn.textContent = T("Ver el catálogo", "Open the catalog"); return; }
        try { localStorage.setItem(KEY, JSON.stringify({ name: name, email: email, phone: phone, consent: consent })); } catch (e) {}
        close();
      }).catch(function () {
        // Si falla la red no lo dejamos afuera: puede ver el catálogo igual.
        try { localStorage.setItem(KEY, JSON.stringify({ name: name, email: email, phone: phone, consent: consent })); } catch (e) {}
        close();
      });
    };
    // Prellenado de lo que ya sabemos (viene del prefill que hizo gate()). Sigue editable.
    if (pf) {
      try {
        var n = ov.querySelector("#cg-name"), e = ov.querySelector("#cg-email"), p = ov.querySelector("#cg-phone");
        if (n && pf.name && !n.value) n.value = pf.name;
        if (e && pf.email && !e.value) e.value = pf.email;
        if (p && pf.phone && !p.value) p.value = pf.phone;
      } catch (err) {}
    }
    setTimeout(function () {
      try {
        var n2 = ov.querySelector("#cg-name"), e2 = ov.querySelector("#cg-email");
        if (n2 && !n2.value) n2.focus(); else if (e2 && !e2.value) e2.focus(); else ov.querySelector("#cg-go").focus();
      } catch (er) {}
    }, 200);
  }

  /* ── 2. Lista de espera al final del catálogo ── */
  function waitlist() {
    if (!/catalogo/i.test(location.pathname)) return;
    if (document.getElementById("cg-wl")) return;
    var v = saved() || {};
    var box = document.createElement("div"); box.id = "cg-wl"; box.className = "cg-wl";
    box.innerHTML =
      '<div style="font-size:30px;line-height:1">🔔</div>' +
      "<h3>" + T("¿No viste el tuyo todavía?", "Haven't found yours yet?") + "</h3>" +
      '<p class="cg-p">' + T(
        "Dinos qué buscas y te escribimos <b>a ti primero</b> en cuanto entre. Sin spam: solo cuando haya algo que encaje.",
        "Tell us what you're looking for and we'll write <b>you first</b> the moment it comes in. No spam: only when there's a match."
      ) + "</p>" +
      '<div id="cg-wl-msg"></div>' +
      '<div class="cg-g2">' +
        '<input class="cg-in" id="wl-name" placeholder="' + T("Tu nombre", "Your name") + '" value="' + esc(v.name || "") + '">' +
        '<input class="cg-in" id="wl-email" type="email" placeholder="' + T("Tu correo", "Your email") + '" value="' + esc(v.email || "") + '">' +
      "</div>" +
      '<div class="cg-g2">' +
        '<input class="cg-in" id="wl-breed" placeholder="' + T("Raza que buscas", "Breed you want") + '">' +
        '<select class="cg-in" id="wl-size"><option value="">' + T("Tamaño", "Size") + "</option><option>" + T("Pequeño", "Small") + "</option><option>" + T("Mediano", "Medium") + "</option><option>" + T("Grande", "Large") + "</option><option>XL</option></select>" +
      "</div>" +
      '<div class="cg-g2">' +
        '<select class="cg-in" id="wl-sex"><option value="">' + T("Sexo (cualquiera)", "Sex (any)") + "</option><option>" + T("Macho", "Male") + "</option><option>" + T("Hembra", "Female") + "</option></select>" +
        '<input class="cg-in" id="wl-budget" placeholder="' + T("Presupuesto aprox.", "Approx. budget") + '">' +
      "</div>" +
      '<input class="cg-in" id="wl-notes" placeholder="' + T("Algo más que debamos saber (opcional)", "Anything else we should know (optional)") + '">' +
      '<button class="cg-go" id="wl-go">' + T("Avísenme cuando llegue", "Let me know when it arrives") + "</button>";
    var host = document.querySelector("main") || document.body;
    host.appendChild(box);

    box.querySelector("#wl-go").onclick = function () {
      var msg = box.querySelector("#cg-wl-msg");
      var name = (box.querySelector("#wl-name").value || "").trim();
      var email = (box.querySelector("#wl-email").value || "").trim();
      if (!name || !okEmail(email)) { msg.innerHTML = '<div class="cg-err">' + T("Falta tu nombre o un correo válido.", "We need your name and a valid email.") + "</div>"; return; }
      var btn = box.querySelector("#wl-go"); btn.disabled = true; btn.textContent = T("Guardando…", "Saving…");
      fetch(SUPA + "/functions/v1/catalog_capture", {
        method: "POST", headers: { "Content-Type": "application/json", apikey: ANON },
        body: JSON.stringify({
          action: "waitlist", name: name, email: email, phone: v.phone || "",
          breed: (box.querySelector("#wl-breed").value || "").trim(),
          size: box.querySelector("#wl-size").value, sex: box.querySelector("#wl-sex").value,
          budget: (box.querySelector("#wl-budget").value || "").trim(),
          notes: (box.querySelector("#wl-notes").value || "").trim(),
          token: qs("t") || qs("token"), lang: EN() ? "en" : "es"
        })
      }).then(function (r) { return r.json(); }).then(function (x) {
        if (x && x.error) { msg.innerHTML = '<div class="cg-err">' + esc(x.error) + "</div>"; btn.disabled = false; btn.textContent = T("Avísenme cuando llegue", "Let me know when it arrives"); return; }
        box.innerHTML =
          '<div style="text-align:center;padding:14px 6px"><div style="font-size:46px">🎉</div>' +
          '<h3 style="margin-top:10px">' + T("Listo, estás en la lista", "You're on the list") + "</h3>" +
          '<p class="cg-p" style="margin:0">' + T("Te escribimos en cuanto entre uno que encaje. Y sí, tú primero.", "We'll write the moment a match comes in. And yes, you first.") + "</p></div>";
      }).catch(function () {
        msg.innerHTML = '<div class="cg-err">' + T("Error de red, intenta de nuevo.", "Network error, please try again.") + "</div>";
        btn.disabled = false; btn.textContent = T("Avísenme cuando llegue", "Let me know when it arrives");
      });
    };
  }

  function start() { try { gate(); } catch (e) {} setTimeout(function () { try { waitlist(); } catch (e) {} }, 1200); }
  if (document.readyState !== "loading") start();
  else document.addEventListener("DOMContentLoaded", start);
})();
