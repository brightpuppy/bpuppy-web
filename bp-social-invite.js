/* bp-social-invite.js — Pop-up de invitacion a B Social (waitlist invite-only).
 * Aparece UNA vez por sesion cuando el visitante muestra intencion:
 *   (a) exit-intent (mouse hacia arriba en desktop),
 *   (b) alta permanencia (dwell) o varias paginas vistas,
 *   (c) tras enviar el formulario de solicitud (window.bpSocialInvite('popup_form')).
 * Captura su correo -> edge social_join (request). Tema claro, coherente con /social.
 * NUNCA en el juego de ninos (/quiz). Se carga site-wide desde claude-bridge.js.
 */
(function () {
  var SU = "https://oqqwmcplljirbreowrll.supabase.co";
  var ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
  var KEY = "bp-social-invite-shown";
  var PATH = (location.pathname || "").toLowerCase();
  var ON_SOCIAL = PATH.indexOf("/social") === 0 || PATH.indexOf("social.html") !== -1;
  var IS_QUIZ = /(^|\/)quiz(\/|\.html?)?$/.test(PATH) || PATH.indexOf("/quiz") === 0 || PATH.indexOf("quiz.html") !== -1;
  var EN = (function () { try { return (document.documentElement.lang || localStorage.getItem("bpuppy-lang") || "es").toLowerCase().indexOf("en") === 0; } catch (e) { return false; } })();
  function t(es, en) { return EN ? en : es; }
  var ACC = "#A85F2D", INK = "#2A2018", MUT = "#6f6053", LINE = "#e6ddce";
  var shown = false;
  try { shown = !!sessionStorage.getItem(KEY); } catch (e) {}

  // No mostrar: en el juego de ninos, ni en la propia landing de Social (alli ya solicitan).
  var DISABLED = IS_QUIZ || ON_SOCIAL;

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function mark() { shown = true; try { sessionStorage.setItem(KEY, "1"); } catch (e) {} }

  function build(source) {
    if (shown || DISABLED) return;
    mark();
    var ov = document.createElement("div");
    ov.id = "bp-si";
    ov.style.cssText = "position:fixed;inset:0;z-index:2147481500;background:rgba(18,26,40,0.44);display:flex;align-items:center;justify-content:center;padding:18px;font-family:'Plus Jakarta Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased";
    ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    ov.innerHTML =
      '<div style="background:linear-gradient(180deg,rgba(26,17,11,0.50),rgba(26,17,11,0.76)),url(\'/assets/bsocial-bg.jpg\') center/cover no-repeat;color:#fff;max-width:420px;width:100%;border-radius:22px;padding:28px 24px;text-align:center;box-shadow:0 30px 70px rgba(15,25,45,0.45);position:relative;overflow:hidden" onclick="event.stopPropagation()">' +
        '<button id="bp-si-x" aria-label="Cerrar" style="position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:50%;border:none;background:rgba(255,255,255,0.22);color:#fff;font-size:19px;line-height:1;cursor:pointer">×</button>' +
        '<div style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;font-size:19px;letter-spacing:-0.02em;margin-bottom:6px;text-shadow:0 2px 12px rgba(0,0,0,0.35)"><span style="color:#fff">B</span><span style="color:#FFA65C"> Social</span></div>' +
        '<div style="font-size:10px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#FFB27A;margin-bottom:12px">' + t("Por invitación · En construcción", "Invite-only · In the works") + '</div>' +
        '<h2 style="margin:0 0 10px;line-height:1.08;font-size:clamp(23px,5.5vw,28px);letter-spacing:-0.02em;color:#fff;text-shadow:0 2px 16px rgba(0,0,0,0.4)">' +
          '<span style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800">' + t("La red social de las mascotas.", "The social network for pets.") + '</span> ' +
          '<span style="font-family:\'Instrument Serif\',Georgia,serif;font-style:italic;font-weight:400;color:#FFC49A">' + t("Se está construyendo.", "We’re building it.") + '</span></h2>' +
        '<p style="color:rgba(255,255,255,0.88);font-size:14.5px;line-height:1.6;margin:0 auto 18px;max-width:34ch;text-shadow:0 1px 8px rgba(0,0,0,0.35)">' +
          t("Donde tu mascota y otros dueños comparten su experiencia en su ciudad, hacen actividades y se conocen. Solicita tu acceso y te avisamos cuando abramos.",
            "Where your pet and other owners share their experience in their city, do activities and meet. Request your access and we’ll let you know when we open.") + '</p>' +
        '<input id="bp-si-email" type="email" placeholder="' + t("Tu correo", "Your email") + '" autocomplete="email" style="width:100%;padding:13px 15px;border-radius:12px;border:1px solid rgba(255,255,255,0.45);background:rgba(255,255,255,0.96);color:' + INK + ';font-size:15px;font-family:inherit;outline:none;margin-bottom:10px">' +
        '<div id="bp-si-err" style="color:#ffd7d7;font-size:12.5px;margin:-4px 0 8px;display:none"></div>' +
        '<button id="bp-si-send" style="width:100%;padding:15px;border:none;border-radius:999px;background:linear-gradient(135deg,#FF9A3D,#FF5A1F);color:#fff;font-weight:800;font-size:15.5px;font-family:inherit;cursor:pointer;box-shadow:0 10px 28px rgba(255,90,31,0.55)">' + t("Solicitar mi acceso", "Request my access") + '</button>' +
        '<button id="bp-si-no" style="margin-top:10px;background:none;border:none;color:rgba(255,255,255,0.72);font-size:13px;font-family:inherit;cursor:pointer">' + t("Ahora no", "Not now") + '</button>' +
      '</div>';
    document.body.appendChild(ov);
    var errEl = ov.querySelector("#bp-si-err");
    ov.querySelector("#bp-si-x").onclick = function () { ov.remove(); };
    ov.querySelector("#bp-si-no").onclick = function () { ov.remove(); };
    // prefill si hay un correo en pantalla (form)
    try { var f = document.querySelector('input[type=email], input[name*=email i]'); if (f && f.value) ov.querySelector("#bp-si-email").value = f.value; } catch (e) {}
    ov.querySelector("#bp-si-send").onclick = function () {
      var email = (ov.querySelector("#bp-si-email").value || "").trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) { errEl.textContent = t("Correo no válido.", "Invalid email."); errEl.style.display = "block"; return; }
      var b = ov.querySelector("#bp-si-send"); b.disabled = true; b.textContent = t("Enviando…", "Sending…");
      var nm = "";
      try { var nf = document.querySelector('input[name*=name i], input[id*=name i], input[name*=nombre i]'); if (nf && nf.value) nm = nf.value; } catch (e) {}
      fetch(SU + "/functions/v1/social_join", { method: "POST", headers: { "Content-Type": "application/json", "apikey": ANON }, body: JSON.stringify({ action: "request", email: email, name: nm, source: source || "popup", lang: EN ? "en" : "es", page: (location.href || "").slice(0, 300), referrer: (document.referrer || "").slice(0, 300) }) })
        .then(function (r) { return r.json(); })
        .then(function () {
          ov.querySelector("div").innerHTML =
            '<div style="text-align:center;padding:6px 0">' +
            '<div style="width:58px;height:58px;border-radius:50%;background:rgba(255,255,255,0.14);border:1px solid rgba(255,255,255,0.5);display:flex;align-items:center;justify-content:center;margin:0 auto 14px"><svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>' +
            '<h2 style="font-family:\'Bricolage Grotesque\',sans-serif;font-weight:800;font-size:22px;margin:0 0 8px;color:#fff;text-shadow:0 2px 14px rgba(0,0,0,0.4)">' + t("¡Listo! Estás en la lista", "Done! You’re on the list") + '</h2>' +
            '<p style="color:rgba(255,255,255,0.86);font-size:14px;line-height:1.55;margin:0 auto 16px;max-width:32ch;text-shadow:0 1px 8px rgba(0,0,0,0.35)">' + t("Te escribiremos por correo apenas abramos tu acceso a B Social.", "We’ll email you as soon as we open your access to B Social.") + '</p>' +
            '<button onclick="document.getElementById(\'bp-si\').remove()" style="padding:13px 28px;border:none;border-radius:999px;background:linear-gradient(135deg,#FF9A3D,#FF5A1F);color:#fff;font-weight:800;font-size:14px;font-family:inherit;cursor:pointer;box-shadow:0 8px 22px rgba(255,90,31,0.5)">' + t("Cerrar", "Close") + '</button></div>';
        })
        .catch(function () { b.disabled = false; b.textContent = t("Solicitar mi acceso", "Request my access"); errEl.textContent = t("No se pudo enviar. Intenta de nuevo.", "Couldn’t send. Try again."); errEl.style.display = "block"; });
    };
  }

  // Expuesto para el formulario de solicitud (se llama tras enviar).
  window.bpSocialInvite = function (source) { build(source || "popup_form"); };

  if (DISABLED || shown) return;

  // ── Disparadores automáticos ──
  var armed = true;
  function fire(src) { if (!armed || shown) return; armed = false; build(src); }

  // (a) exit-intent desktop: el mouse sale por arriba de la ventana
  document.addEventListener("mouseout", function (e) {
    if (!e.relatedTarget && (e.clientY == null || e.clientY <= 0)) fire("popup_exit");
  });

  // (b) alta permanencia: 55s en la página
  setTimeout(function () { fire("popup_dwell"); }, 55000);

  // (b2) varias páginas vistas en la sesión con clara navegación
  try {
    var seen = parseInt(sessionStorage.getItem("bp-pv") || "0", 10) + 1;
    sessionStorage.setItem("bp-pv", String(seen));
    if (seen >= 4) setTimeout(function () { fire("popup_intent"); }, 12000);
  } catch (e) {}
})();
