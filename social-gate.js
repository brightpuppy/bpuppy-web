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

  var ACC = "#0EA5E9", INK = "#151a22", MUT = "#5b6672", LINE = "#dde2ea";

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
      "background:#f3f6fb", "color:" + INK, "font-family:'Plus Jakarta Sans',system-ui,sans-serif",
      "display:flex", "flex-direction:column", "align-items:center", "justify-content:center",
      "padding:44px 20px", "text-align:center", "-webkit-font-smoothing:antialiased"].join(";");
    var bgUrl = window.BP_SOCIAL_BG || "/assets/bsocial-bg.png";
    var bg = document.createElement("div");
    bg.style.cssText = "position:absolute;inset:0;z-index:0;pointer-events:none;background:#e9edf3 url('" + bgUrl + "') center/cover no-repeat";
    var vin = document.createElement("div");
    vin.style.cssText = "position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg, rgba(233,237,243,0.34), rgba(233,237,243,0.30))";
    el.appendChild(bg); el.appendChild(vin);
    var innerEl = document.createElement("div");
    innerEl.id = GID + "-in";
    // Contenido sobre una tarjeta clara translúcida (la foto cálida luce alrededor, pero todo se lee claro)
    innerEl.style.cssText = "position:relative;z-index:2;width:100%;max-width:468px;background:rgba(255,255,255,0.82);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.75);border-radius:26px;padding:26px 22px;box-shadow:0 26px 70px rgba(18,28,48,0.22)";
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
  function fieldCss() { return "width:100%;padding:13px 15px;border-radius:12px;border:1px solid " + LINE + ";background:#fff;color:" + INK + ";font-size:15px;font-family:inherit;outline:none;margin-bottom:10px"; }
  function primaryCss() { return "width:100%;padding:15px 18px;border:none;border-radius:999px;background:" + ACC + ";color:#fff;font-weight:800;font-size:15.5px;font-family:inherit;cursor:pointer;box-shadow:0 8px 22px rgba(14,165,233,0.28)"; }
  function ghostCss() { return "display:inline-flex;align-items:center;gap:8px;justify-content:center;padding:12px 18px;border-radius:999px;border:1px solid " + LINE + ";background:#fff;color:" + INK + ";font-weight:700;font-size:14px;font-family:inherit;cursor:pointer;text-decoration:none"; }
  function pillCss(on) { return "padding:10px 16px;border-radius:999px;font-family:inherit;font-weight:700;font-size:13.5px;cursor:pointer;background:#fff;" + (on ? ("border:1.5px solid " + ACC + ";color:" + ACC + ";box-shadow:inset 0 0 0 1px " + ACC) : ("border:1.5px solid " + LINE + ";color:" + MUT)); }

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
      '<div style="width:66px;height:66px;border-radius:50%;background:rgba(14,165,233,0.10);border:1px solid rgba(14,165,233,0.35);display:flex;align-items:center;justify-content:center;margin:0 auto 18px">' +
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

  function enterView() {
    inner().innerHTML =
      WORD + EYEBROW +
      '<h1 style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;letter-spacing:-0.02em;font-size:clamp(25px,5vw,35px);margin:0 0 12px;color:' + INK + '">' + t("Entrar a B Social", "Sign in to B Social") + '</h1>' +
      '<p style="color:' + MUT + ';line-height:1.6;font-size:15px;margin:0 auto 20px;max-width:36ch">' + t("Si ya tienes acceso, te enviamos un enlace de entrada a tu correo.", "If you already have access, we’ll email you a sign-in link.") + '</p>' +
      '<div style="text-align:left;background:#fff;border:1px solid #e7ebf2;border-radius:18px;padding:18px;box-shadow:0 10px 30px rgba(20,30,50,0.07)">' +
        '<input id="bpg-lemail" type="email" style="' + fieldCss() + '" placeholder="' + t("Tu correo", "Your email") + '" autocomplete="email">' +
        '<div id="bpg-lerr" style="color:#d33;font-size:13px;margin:-2px 0 10px;display:none"></div>' +
        '<button id="bpg-lsend" style="' + primaryCss() + '">' + t("Enviarme el enlace", "Send me the link") + '</button>' +
      '</div>' +
      '<div style="margin-top:20px;font-size:13.5px"><a id="bpg-back" href="#" style="color:' + MUT + ';text-decoration:none">' + t("← Volver", "← Back") + '</a></div>';
    var er = document.getElementById("bpg-lerr");
    document.getElementById("bpg-lsend").onclick = function () {
      var email = (document.getElementById("bpg-lemail").value || "").trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) { er.textContent = t("Correo no válido.", "Invalid email."); er.style.display = "block"; return; }
      var b = document.getElementById("bpg-lsend"); b.disabled = true; b.textContent = t("Enviando…", "Sending…");
      fetch(SU + "/functions/v1/portal_magiclink", { method: "POST", headers: { "Content-Type": "application/json", "apikey": ANON }, body: JSON.stringify({ email: email, redirectTo: location.origin + "/social" }) })
        .then(function () { inner().innerHTML = WORD + '<h1 style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;font-size:27px;margin:0 0 12px;color:' + INK + '">' + t("Revisa tu correo", "Check your email") + '</h1><p style="color:' + MUT + ';line-height:1.6;max-width:34ch;margin:0 auto">' + t("Te enviamos un enlace para entrar. Ábrelo desde este mismo dispositivo.", "We sent you a sign-in link. Open it on this same device.") + '</p>'; })
        .catch(function () { b.disabled = false; b.textContent = t("Enviarme el enlace", "Send me the link"); er.textContent = t("No se pudo enviar.", "Couldn't send."); er.style.display = "block"; });
    };
    document.getElementById("bpg-back").onclick = function (e) { e.preventDefault(); landingView(); };
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
    decide();
    var s = sb();
    if (s && s.auth && s.auth.onAuthStateChange) s.auth.onAuthStateChange(function () { if (document.getElementById(GID)) decide(); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
