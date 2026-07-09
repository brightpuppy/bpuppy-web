/* social-gate.js — B Social por INVITACION (waitlist), TEMA CLARO.
 * Capa propia SOBRE el app React (s-app.js): mientras el visitante no sea miembro
 * APROBADO y logueado, ve la landing "se esta construyendo la red mas esperada" con
 * Solicitar acceso (incluye si tiene mascota / tipo / nombre) + Invitar a un amigo.
 * Los aprobados entran normal (se quita la capa). Backend: edge social_join. No toca s-app.js.
 * Fondo: usa window.BP_SOCIAL_BG si existe (imagen de Luis, con lavado claro); si no, claro.
 */
(function () {
  var SU = "https://oqqwmcplljirbreowrll.supabase.co";
  var ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
  var GID = "__bp-gate";
  var EN = (function () { try { return (document.documentElement.lang || localStorage.getItem("bpuppy-lang") || "es").toLowerCase().indexOf("en") === 0; } catch (e) { return false; } })();
  function t(es, en) { return EN ? en : es; }
  var params = new URLSearchParams(location.search);
  var qref = (params.get("ref") || "").trim();
  var myEmail = "";
  var petHas = null, petType = "";

  // Paleta cálida y de clase (cognac/ámbar + crema), en armonía con la foto del café-lounge.
  var ACC = "#A85F2D", INK = "#2A2018", MUT = "#6f6053", LINE = "#e6ddce";

  function sb() {
    if (window._bsSb) return window._bsSb;
    if (window.supabase) { try { window._bsSb = window.supabase.createClient(SU, ANON); return window._bsSb; } catch (e) {} }
    return null;
  }
  function api(action, extra, tok) {
    var h = { "Content-Type": "application/json", "apikey": ANON };
    if (tok) h["Authorization"] = "Bearer " + tok;
    return fetch(SU + "/functions/v1/social_join", { method: "POST", headers: h, body: JSON.stringify(Object.assign({ action: action }, extra || {})) }).then(function (r) { return r.json(); });
  }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  function ov() {
    var el = document.getElementById(GID);
    if (el) return el;
    el = document.createElement("div");
    el.id = GID;
    el.style.cssText = ["position:fixed", "inset:0", "z-index:2147482000", "overflow-y:auto",
      "background:#efe9e0", "color:" + INK, "font-family:'Plus Jakarta Sans',system-ui,sans-serif",
      "display:flex", "flex-direction:column", "align-items:center", "justify-content:center",
      "padding:44px 20px", "text-align:center", "-webkit-font-smoothing:antialiased"].join(";");
    var bgUrl = window.BP_SOCIAL_BG || "/assets/bsocial-bg.jpg";
    var bg = document.createElement("div");
    bg.style.cssText = "position:absolute;inset:0;z-index:0;pointer-events:none;background:#efe9e0 url('" + bgUrl + "') center/cover no-repeat";
    var vin = document.createElement("div");
    vin.style.cssText = "position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg, rgba(250,246,239,0.30), rgba(44,32,24,0.10))";
    el.appendChild(bg); el.appendChild(vin);
    var innerEl = document.createElement("div");
    innerEl.id = GID + "-in";
    // Contenido sobre una tarjeta clara translúcida color crema (la foto cálida luce alrededor, todo se lee claro)
    innerEl.style.cssText = "position:relative;z-index:2;width:100%;max-width:468px;background:rgba(255,251,244,0.87);-webkit-backdrop-filter:blur(16px) saturate(1.1);backdrop-filter:blur(16px) saturate(1.1);border:1px solid rgba(255,255,255,0.55);border-radius:26px;padding:26px 22px;box-shadow:0 28px 70px rgba(52,34,16,0.28)";
    el.appendChild(innerEl);
    document.body.appendChild(el);
    document.documentElement.style.overflow = "hidden";
    return el;
  }
  function inner() { ov(); return document.getElementById(GID + "-in"); }
  function hide() { var el = document.getElementById(GID); if (el) el.remove(); document.documentElement.style.overflow = ""; }
  function loadingView() { inner().innerHTML = '<div style="opacity:.45;font-size:14px">B Social…</div>'; }

  var WORD = '<div style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;font-size:21px;letter-spacing:-0.02em;margin-bottom:18px"><span style="color:' + INK + '">B</span><span style="color:' + ACC + '"> Social</span></div>';
  var EYEBROW = '<div style="font-size:10.5px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:' + ACC + ';margin-bottom:14px">' + t("Por invitación · En construcción", "Invite-only · In the works") + '</div>';
  function lbl(x) { return '<div style="font-size:12.5px;font-weight:700;color:' + INK + ';margin:2px 0 7px;text-align:left">' + x + '</div>'; }
  function fieldCss() { return "width:100%;padding:13px 15px;border-radius:12px;border:1px solid " + LINE + ";background:#fffdf9;color:" + INK + ";font-size:15px;font-family:inherit;outline:none;margin-bottom:10px"; }
  function primaryCss() { return "width:100%;padding:15px 18px;border:none;border-radius:999px;background:" + ACC + ";color:#fffaf3;font-weight:800;font-size:15.5px;font-family:inherit;cursor:pointer;box-shadow:0 10px 24px rgba(168,95,45,0.32)"; }
  function ghostCss() { return "display:inline-flex;align-items:center;gap:8px;justify-content:center;padding:12px 18px;border-radius:999px;border:1px solid " + LINE + ";background:rgba(255,253,249,0.9);color:" + INK + ";font-weight:700;font-size:14px;font-family:inherit;cursor:pointer;text-decoration:none"; }
  function pillCss(on) { return "padding:10px 16px;border-radius:999px;font-family:inherit;font-weight:700;font-size:13.5px;cursor:pointer;background:#fffdf9;" + (on ? ("border:1.5px solid " + ACC + ";color:" + ACC + ";box-shadow:inset 0 0 0 1px " + ACC) : ("border:1.5px solid " + LINE + ";color:" + MUT)); }

  function paintPills() {
    var yes = document.getElementById("bpg-pet-yes"), no = document.getElementById("bpg-pet-no");
    if (yes) yes.style.cssText = pillCss(petHas === true);
    if (no) no.style.cssText = pillCss(petHas === false);
    var box = document.getElementById("bpg-petbox");
    if (box) box.style.display = (petHas === true) ? "block" : "none";
    var pts = document.querySelectorAll(".bpg-pt");
    for (var i = 0; i < pts.length; i++) pts[i].style.cssText = pillCss(pts[i].getAttribute("data-t") === petType) + ";flex:1";
  }

  function landingView() {
    var box = inner();
    box.innerHTML =
      WORD + EYEBROW +
      '<h1 style="font-weight:800;letter-spacing:-0.03em;line-height:1.02;font-size:clamp(31px,6.6vw,48px);margin:0 0 16px;color:' + INK + '">' +
        '<span style="font-family:\'Bricolage Grotesque\',sans-serif">' + t("La red social de las mascotas.", "The social network for pets.") + '</span><br>' +
        '<span style="font-family:\'Instrument Serif\',Georgia,serif;font-style:italic;font-weight:400;color:' + ACC + ';font-size:1.06em">' + t("Se está construyendo.", "We’re building it.") + '</span></h1>' +
      '<p style="color:' + MUT + ';line-height:1.65;font-size:15.5px;margin:0 auto 22px;max-width:41ch">' +
        t("El lugar donde tu mascota y otros dueños comparten su experiencia en su ciudad, hacen actividades y se conocen. En estos momentos, solo por invitación.",
          "The place where your pet and other owners share their experience in their city, do activities and meet. Invite-only for now.") + '</p>' +
      '<div style="text-align:left">' +
        '<div style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:700;font-size:16px;margin-bottom:14px;color:' + INK + '">' + t("Solicita ser parte", "Request to join") + '</div>' +
        '<input id="bpg-name" style="' + fieldCss() + '" placeholder="' + t("Tu nombre", "Your name") + '" autocomplete="name">' +
        '<input id="bpg-email" type="email" style="' + fieldCss() + '" placeholder="' + t("Tu correo", "Your email") + '" autocomplete="email">' +
        '<input id="bpg-city" style="' + fieldCss() + '" placeholder="' + t("Tu ciudad", "Your city") + '" autocomplete="address-level2">' +
        lbl(t("¿Tienes mascota?", "Do you have a pet?")) +
        '<div style="display:flex;gap:8px;margin-bottom:8px">' +
          '<button id="bpg-pet-yes" style="' + pillCss(false) + '">' + t("Sí", "Yes") + '</button>' +
          '<button id="bpg-pet-no" style="' + pillCss(false) + '">' + t("Aún no", "Not yet") + '</button>' +
        '</div>' +
        '<div id="bpg-petbox" style="display:none;margin-top:6px">' +
          lbl(t("¿Qué tipo?", "What type?")) +
          '<div style="display:flex;gap:8px;margin-bottom:10px">' +
            '<button class="bpg-pt" data-t="Perro" style="' + pillCss(false) + ';flex:1">' + t("Perro", "Dog") + '</button>' +
            '<button class="bpg-pt" data-t="Gato" style="' + pillCss(false) + ';flex:1">' + t("Gato", "Cat") + '</button>' +
            '<button class="bpg-pt" data-t="Otro" style="' + pillCss(false) + ';flex:1">' + t("Otro", "Other") + '</button>' +
          '</div>' +
          '<input id="bpg-petname" style="' + fieldCss() + '" placeholder="' + t("Nombre de tu mascota", "Your pet’s name") + '">' +
        '</div>' +
        '<div id="bpg-err" style="color:#d33;font-size:13px;margin:-2px 0 10px;display:none"></div>' +
        '<button id="bpg-send" style="' + primaryCss() + '">' + t("Solicitar ser parte", "Request to join") + '</button>' +
      '</div>' +
      '<div style="display:flex;gap:10px;justify-content:center;margin-top:14px;flex-wrap:wrap">' +
        '<button id="bpg-invite" style="' + ghostCss() + '">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/></svg>' +
          t("Invitar a un amigo", "Invite a friend") + '</button>' +
      '</div>' +
      '<div style="margin-top:22px;font-size:13.5px;color:' + MUT + '">' +
        '<a id="bpg-enter" href="#" style="color:' + ACC + ';text-decoration:none;font-weight:700">' + t("¿Ya tienes acceso? Entrar", "Already have access? Sign in") + '</a>' +
        '<span style="opacity:.4;margin:0 10px">·</span>' +
        '<a href="/" style="color:' + MUT + ';text-decoration:none">' + t("Volver a bpuppy.us", "Back to bpuppy.us") + '</a>' +
      '</div>';

    var errEl = document.getElementById("bpg-err");
    function showErr(m) { errEl.textContent = m; errEl.style.display = "block"; }
    document.getElementById("bpg-pet-yes").onclick = function () { petHas = true; paintPills(); };
    document.getElementById("bpg-pet-no").onclick = function () { petHas = false; petType = ""; paintPills(); };
    var pts = document.querySelectorAll(".bpg-pt");
    for (var i = 0; i < pts.length; i++) pts[i].onclick = (function (b) { return function () { petType = b.getAttribute("data-t"); paintPills(); }; })(pts[i]);
    paintPills();

    document.getElementById("bpg-send").onclick = function () {
      var email = (document.getElementById("bpg-email").value || "").trim();
      var name = (document.getElementById("bpg-name").value || "").trim();
      if (!name) return showErr(t("Escribe tu nombre.", "Enter your name."));
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return showErr(t("Correo no válido.", "Invalid email."));
      myEmail = email.toLowerCase();
      var btn = document.getElementById("bpg-send"); btn.disabled = true; btn.textContent = t("Enviando…", "Sending…");
      api("request", {
        name: name, email: email, city: (document.getElementById("bpg-city").value || "").trim(),
        source: "landing", referred_by: qref,
        has_pet: petHas, pet_type: (petHas === true ? petType : ""),
        pet_name: (petHas === true ? (document.getElementById("bpg-petname").value || "").trim() : "")
      }).then(function (r) {
        if (r && r.ok) thanksView(r.already);
        else { btn.disabled = false; btn.textContent = t("Solicitar ser parte", "Request to join"); showErr(t("No se pudo enviar. Intenta de nuevo.", "Couldn't send. Try again.")); }
      }).catch(function () { btn.disabled = false; btn.textContent = t("Solicitar ser parte", "Request to join"); showErr(t("No se pudo enviar. Intenta de nuevo.", "Couldn't send. Try again.")); });
    };
    document.getElementById("bpg-invite").onclick = doInvite;
    document.getElementById("bpg-enter").onclick = function (e) { e.preventDefault(); enterView(); };
  }

  function thanksView(already) {
    inner().innerHTML =
      WORD +
      '<div style="width:66px;height:66px;border-radius:50%;background:rgba(168,95,45,0.10);border:1px solid rgba(168,95,45,0.35);display:flex;align-items:center;justify-content:center;margin:0 auto 18px">' +
        '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="' + ACC + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>' +
      '<h1 style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;letter-spacing:-0.02em;font-size:clamp(25px,5vw,33px);margin:0 0 12px;color:' + INK + '">' +
        (already === true ? t("Ya estás en la lista", "You’re already on the list") : t("¡Listo! Recibimos tu solicitud", "Done! We got your request")) + '</h1>' +
      '<p style="color:' + MUT + ';line-height:1.65;font-size:15px;margin:0 auto 24px;max-width:38ch">' +
        t("Te escribiremos por correo apenas abramos tu acceso a B Social. Mientras, invita a un amigo para que también sea parte.",
          "We’ll email you as soon as we open your access to B Social. Meanwhile, invite a friend to join too.") + '</p>' +
      '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
        '<button id="bpg-invite" style="' + primaryCss() + ';width:auto;padding-left:26px;padding-right:26px">' + t("Invitar a un amigo", "Invite a friend") + '</button>' +
        '<a href="/" style="' + ghostCss() + '">' + t("Volver al inicio", "Back to home") + '</a>' +
      '</div>';
    document.getElementById("bpg-invite").onclick = doInvite;
  }

  var GOOGLE_SVG = '<svg width="18" height="18" viewBox="0 0 48 48" style="flex-shrink:0"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.5 0 10.5-2.1 14.3-5.5l-6.6-5.6C29.7 34.6 27 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.6 5.6C41.8 36.4 44 30.7 44 24c0-1.3-.1-2.3-.4-3.5z"/></svg>';
  function googleBtnCss() { return "width:100%;display:flex;align-items:center;justify-content:center;gap:10px;padding:13px 16px;border-radius:12px;border:1px solid " + LINE + ";background:#fff;color:#3c4043;font-weight:700;font-size:15px;font-family:inherit;cursor:pointer;margin-bottom:6px"; }
  function orDiv() { return '<div style="display:flex;align-items:center;gap:10px;margin:12px 0"><div style="flex:1;height:1px;background:' + LINE + '"></div><span style="font-size:11.5px;color:' + MUT + ';font-weight:700">' + t("o", "or") + '</span><div style="flex:1;height:1px;background:' + LINE + '"></div></div>'; }
  function doGoogle() {
    var s = sb(); if (!s) return;
    var btn = document.getElementById("bpg-google"); if (btn) { btn.disabled = true; btn.style.opacity = ".7"; }
    var er = document.getElementById("bpg-lerr");
    function fail() { if (btn) { btn.disabled = false; btn.style.opacity = "1"; } if (er) { er.textContent = t("Google aún no está disponible aquí. Entra con tu correo.", "Google isn’t available here yet. Use your email."); er.style.display = "block"; } }
    try {
      // skipBrowserRedirect: controlamos la redirección para poder avisar si el proveedor no está activo.
      s.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + "/social", skipBrowserRedirect: true } }).then(function (res) {
        if (res && res.error) return fail();
        var url = res && res.data && res.data.url;
        if (url) location.href = url; else fail();
      }).catch(fail);
    } catch (e) { fail(); }
  }
  function enterView() {
    inner().innerHTML =
      WORD + EYEBROW +
      '<h1 style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;letter-spacing:-0.02em;font-size:clamp(25px,5vw,35px);margin:0 0 12px;color:' + INK + '">' + t("Entrar a B Social", "Sign in to B Social") + '</h1>' +
      '<p style="color:' + MUT + ';line-height:1.6;font-size:15px;margin:0 auto 20px;max-width:36ch">' + t("Entra con Google o con tu correo y contraseña.", "Sign in with Google or with your email and password.") + '</p>' +
      '<div style="text-align:left;background:#fffdf9;border:1px solid ' + LINE + ';border-radius:18px;padding:18px;box-shadow:0 10px 30px rgba(52,34,16,0.08)">' +
        '<button id="bpg-google" style="' + googleBtnCss() + '">' + GOOGLE_SVG + t("Continuar con Google", "Continue with Google") + '</button>' +
        orDiv() +
        '<input id="bpg-lemail" type="email" style="' + fieldCss() + '" placeholder="' + t("Tu correo", "Your email") + '" autocomplete="email">' +
        '<input id="bpg-lpass" type="password" style="' + fieldCss() + '" placeholder="' + t("Contraseña", "Password") + '" autocomplete="current-password">' +
        '<div id="bpg-lerr" style="color:#d33;font-size:13px;margin:-2px 0 10px;display:none"></div>' +
        '<button id="bpg-lsignin" style="' + primaryCss() + '">' + t("Entrar", "Sign in") + '</button>' +
        '<div style="display:flex;justify-content:space-between;gap:10px;margin-top:12px;font-size:12.5px">' +
          '<a id="bpg-create" href="#" style="color:' + ACC + ';text-decoration:none;font-weight:700">' + t("Crear contraseña", "Create a password") + '</a>' +
          '<a id="bpg-magic" href="#" style="color:' + MUT + ';text-decoration:none">' + t("Enviarme un enlace", "Email me a link") + '</a>' +
        '</div>' +
      '</div>' +
      '<div style="margin-top:20px;font-size:13.5px"><a id="bpg-back" href="#" style="color:' + MUT + ';text-decoration:none">' + t("← Volver", "← Back") + '</a></div>';
    var er = document.getElementById("bpg-lerr");
    function showErr(m) { er.textContent = m; er.style.display = "block"; }
    document.getElementById("bpg-google").onclick = doGoogle;
    document.getElementById("bpg-lsignin").onclick = function () {
      var email = (document.getElementById("bpg-lemail").value || "").trim().toLowerCase();
      var pass = document.getElementById("bpg-lpass").value || "";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return showErr(t("Correo no válido.", "Invalid email."));
      if (!pass) return showErr(t("Escribe tu contraseña.", "Enter your password."));
      var b = document.getElementById("bpg-lsignin"); b.disabled = true; b.textContent = t("Entrando…", "Signing in…");
      var s = sb(); if (!s) { b.disabled = false; b.textContent = t("Entrar", "Sign in"); return; }
      s.auth.signInWithPassword({ email: email, password: pass }).then(function (r) {
        if (r && r.error) { b.disabled = false; b.textContent = t("Entrar", "Sign in"); showErr(t("Correo o contraseña incorrectos. ¿Primera vez? Crea tu contraseña o entra con Google.", "Wrong email or password. First time? Create a password or use Google.")); return; }
        myEmail = email; // en éxito, onAuthStateChange dispara decide()
      }).catch(function () { b.disabled = false; b.textContent = t("Entrar", "Sign in"); showErr(t("No se pudo. Intenta de nuevo.", "Couldn’t sign in. Try again.")); });
    };
    document.getElementById("bpg-create").onclick = function (e) { e.preventDefault(); createView(); };
    document.getElementById("bpg-magic").onclick = function (e) { e.preventDefault(); magicView(); };
    document.getElementById("bpg-back").onclick = function (e) { e.preventDefault(); landingView(); };
  }
  function createView() {
    inner().innerHTML =
      WORD + EYEBROW +
      '<h1 style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;letter-spacing:-0.02em;font-size:clamp(24px,5vw,33px);margin:0 0 10px;color:' + INK + '">' + t("Crea tu contraseña", "Create your password") + '</h1>' +
      '<p style="color:' + MUT + ';line-height:1.6;font-size:14.5px;margin:0 auto 18px;max-width:37ch">' + t("Así entras rápido, sin ir al correo. Tu acceso a B Social debe estar aprobado.", "So you can sign in fast, without email. Your B Social access must be approved.") + '</p>' +
      '<div style="text-align:left;background:#fffdf9;border:1px solid ' + LINE + ';border-radius:18px;padding:18px;box-shadow:0 10px 30px rgba(52,34,16,0.08)">' +
        '<input id="bpg-cemail" type="email" style="' + fieldCss() + '" placeholder="' + t("Tu correo", "Your email") + '" autocomplete="email">' +
        '<input id="bpg-cpass" type="password" style="' + fieldCss() + '" placeholder="' + t("Contraseña (mín. 6)", "Password (min. 6)") + '" autocomplete="new-password">' +
        '<input id="bpg-cpass2" type="password" style="' + fieldCss() + '" placeholder="' + t("Repite la contraseña", "Repeat the password") + '" autocomplete="new-password">' +
        '<div id="bpg-cerr" style="color:#d33;font-size:13px;margin:-2px 0 10px;display:none"></div>' +
        '<button id="bpg-csave" style="' + primaryCss() + '">' + t("Crear contraseña", "Create password") + '</button>' +
      '</div>' +
      '<div style="margin-top:20px;font-size:13.5px"><a id="bpg-back" href="#" style="color:' + MUT + ';text-decoration:none">' + t("← Volver", "← Back") + '</a></div>';
    var er = document.getElementById("bpg-cerr");
    function showErr(m) { er.textContent = m; er.style.display = "block"; }
    document.getElementById("bpg-csave").onclick = function () {
      var email = (document.getElementById("bpg-cemail").value || "").trim().toLowerCase();
      var p1 = document.getElementById("bpg-cpass").value || "", p2 = document.getElementById("bpg-cpass2").value || "";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) return showErr(t("Correo no válido.", "Invalid email."));
      if (p1.length < 6) return showErr(t("La contraseña debe tener al menos 6 caracteres.", "Password must be at least 6 characters."));
      if (p1 !== p2) return showErr(t("Las contraseñas no coinciden.", "Passwords don’t match."));
      var b = document.getElementById("bpg-csave"); b.disabled = true; b.textContent = t("Creando…", "Creating…");
      var s = sb(); if (!s) { b.disabled = false; b.textContent = t("Crear contraseña", "Create password"); return; }
      s.auth.signUp({ email: email, password: p1, options: { emailRedirectTo: location.origin + "/social" } }).then(function (r) {
        if (r && r.error) {
          b.disabled = false; b.textContent = t("Crear contraseña", "Create password");
          if (/already|registered|exists/i.test(r.error.message || "")) showErr(t("Ya hay una cuenta con ese correo. Usa “Entrar” o Google.", "There’s already an account with that email. Use “Sign in” or Google."));
          else showErr(r.error.message || t("No se pudo crear.", "Couldn’t create."));
          return;
        }
        myEmail = email;
        if (r.data && r.data.session) { /* sesión creada → onAuthStateChange dispara decide() */ }
        else { inner().innerHTML = WORD + '<h1 style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;font-size:26px;margin:0 0 12px;color:' + INK + '">' + t("Revisa tu correo", "Check your email") + '</h1><p style="color:' + MUT + ';line-height:1.6;max-width:34ch;margin:0 auto">' + t("Te enviamos un correo para confirmar tu cuenta. Ábrelo y vuelve a entrar con tu contraseña.", "We sent you an email to confirm your account. Open it and sign in with your password.") + '</p>'; }
      }).catch(function () { b.disabled = false; b.textContent = t("Crear contraseña", "Create password"); showErr(t("No se pudo. Intenta de nuevo.", "Couldn’t create. Try again.")); });
    };
    document.getElementById("bpg-back").onclick = function (e) { e.preventDefault(); enterView(); };
  }
  function magicView() {
    inner().innerHTML =
      WORD + EYEBROW +
      '<h1 style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;letter-spacing:-0.02em;font-size:clamp(25px,5vw,33px);margin:0 0 12px;color:' + INK + '">' + t("Entrar con un enlace", "Sign in with a link") + '</h1>' +
      '<p style="color:' + MUT + ';line-height:1.6;font-size:15px;margin:0 auto 20px;max-width:36ch">' + t("Te enviamos un enlace de entrada a tu correo.", "We’ll email you a sign-in link.") + '</p>' +
      '<div style="text-align:left;background:#fffdf9;border:1px solid ' + LINE + ';border-radius:18px;padding:18px;box-shadow:0 10px 30px rgba(52,34,16,0.08)">' +
        '<input id="bpg-lemail2" type="email" style="' + fieldCss() + '" placeholder="' + t("Tu correo", "Your email") + '" autocomplete="email">' +
        '<div id="bpg-lerr2" style="color:#d33;font-size:13px;margin:-2px 0 10px;display:none"></div>' +
        '<button id="bpg-lsend" style="' + primaryCss() + '">' + t("Enviarme el enlace", "Send me the link") + '</button>' +
      '</div>' +
      '<div style="margin-top:20px;font-size:13.5px"><a id="bpg-back" href="#" style="color:' + MUT + ';text-decoration:none">' + t("← Volver", "← Back") + '</a></div>';
    var er = document.getElementById("bpg-lerr2");
    document.getElementById("bpg-lsend").onclick = function () {
      var email = (document.getElementById("bpg-lemail2").value || "").trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) { er.textContent = t("Correo no válido.", "Invalid email."); er.style.display = "block"; return; }
      var b = document.getElementById("bpg-lsend"); b.disabled = true; b.textContent = t("Enviando…", "Sending…");
      fetch(SU + "/functions/v1/portal_magiclink", { method: "POST", headers: { "Content-Type": "application/json", "apikey": ANON }, body: JSON.stringify({ email: email, redirectTo: location.origin + "/social" }) })
        .then(function () { inner().innerHTML = WORD + '<h1 style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;font-size:27px;margin:0 0 12px;color:' + INK + '">' + t("Revisa tu correo", "Check your email") + '</h1><p style="color:' + MUT + ';line-height:1.6;max-width:34ch;margin:0 auto">' + t("Te enviamos un enlace para entrar. Ábrelo desde este mismo dispositivo.", "We sent you a sign-in link. Open it on this same device.") + '</p>'; })
        .catch(function () { b.disabled = false; b.textContent = t("Enviarme el enlace", "Send me the link"); er.textContent = t("No se pudo enviar.", "Couldn't send."); er.style.display = "block"; });
    };
    document.getElementById("bpg-back").onclick = function (e) { e.preventDefault(); enterView(); };
  }

  function pendingView(email) {
    inner().innerHTML =
      WORD + EYEBROW +
      '<h1 style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;letter-spacing:-0.02em;font-size:clamp(25px,5vw,33px);margin:0 0 12px;color:' + INK + '">' + t("Tu solicitud está en revisión", "Your request is under review") + '</h1>' +
      '<p style="color:' + MUT + ';line-height:1.65;font-size:15px;margin:0 auto 8px;max-width:38ch">' +
        t("Estamos abriendo el acceso poco a poco. Te avisaremos por correo apenas activemos tu cuenta.", "We’re opening access little by little. We’ll email you as soon as we activate your account.") + '</p>' +
      (email ? '<p style="color:#8a929e;font-size:13px;margin:0 0 24px">' + esc(email) + '</p>' : '<div style="height:16px"></div>') +
      '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
        '<button id="bpg-invite" style="' + ghostCss() + '">' + t("Invitar a un amigo", "Invite a friend") + '</button>' +
        '<button id="bpg-logout" style="' + ghostCss() + '">' + t("Salir", "Sign out") + '</button>' +
        '<a href="/" style="' + ghostCss() + '">' + t("Volver al inicio", "Back to home") + '</a>' +
      '</div>';
    myEmail = email || myEmail;
    document.getElementById("bpg-invite").onclick = doInvite;
    document.getElementById("bpg-logout").onclick = function () { var s = sb(); if (s) s.auth.signOut().then(function () { landingView(); }); else landingView(); };
  }

  function doInvite() {
    var url = location.origin + "/social" + (myEmail ? ("?ref=" + encodeURIComponent(myEmail)) : "");
    var text = t("Te invito a B Social, la red social de mascotas de BrightPuppy. Solicita tu acceso aquí:", "Join me on B Social, BrightPuppy’s pet social network. Request your access here:");
    if (navigator.share) navigator.share({ title: "B Social — BrightPuppy", text: text, url: url }).catch(function () {});
    else if (navigator.clipboard) navigator.clipboard.writeText(text + " " + url).then(function () { alert(t("Enlace copiado. Compártelo con tu amigo.", "Link copied. Share it with your friend.")); });
    else prompt(t("Copia y comparte este enlace:", "Copy and share this link:"), url);
  }

  async function decide() {
    var s = sb();
    if (!s) { setTimeout(decide, 150); return; }
    var sess = null;
    try { var r = await s.auth.getSession(); sess = r && r.data ? r.data.session : null; } catch (e) {}
    if (sess && sess.user) {
      var me = null;
      try { me = await api("me", null, sess.access_token); } catch (e) {}
      if (me && me.approved) { hide(); return; }
      pendingView(sess.user.email);
      return;
    }
    landingView();
  }

  function boot() {
    ov(); loadingView();
    // Si volvimos de un OAuth con error (p.ej. Google aún no activo), limpiamos la URL y avisamos.
    var oauthErr = "";
    try {
      var h = (location.hash || "").replace(/^#/, ""); var hp = new URLSearchParams(h);
      oauthErr = hp.get("error_description") || hp.get("error") || params.get("error_description") || params.get("error") || "";
      if (oauthErr) { history.replaceState(null, "", location.pathname); }
    } catch (e) {}
    if (oauthErr) {
      enterView();
      var er = document.getElementById("bpg-lerr");
      if (er) { er.textContent = t("No se pudo entrar con Google. Prueba con tu correo o pide un enlace.", "Couldn’t sign in with Google. Try your email or request a link."); er.style.display = "block"; }
    } else {
      decide();
    }
    var s = sb();
    if (s && s.auth && s.auth.onAuthStateChange) s.auth.onAuthStateChange(function () { if (document.getElementById(GID)) decide(); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
