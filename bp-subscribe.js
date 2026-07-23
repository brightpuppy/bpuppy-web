/* bp-subscribe.js — Banda de suscripción por correo, site-wide (antes del footer).
 * Inserta a website_leads (source 'subscribe') → trigger website_lead_to_client crea el cliente
 * → edge lead_autocontact manda el correo de bienvenida (v8). NUNCA en el juego de niños (/quiz).
 * Se carga site-wide desde claude-bridge.js. Marca de conversión GA (no la de lead $500).
 */
(function () {
  var SU = "https://oqqwmcplljirbreowrll.supabase.co";
  var ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
  var PATH = (location.pathname || "").toLowerCase();
  if (/(^|\/)quiz(\/|\.html?)?$/.test(PATH) || PATH.indexOf("/quiz") === 0 || PATH.indexOf("quiz.html") !== -1) return; // COPPA
  if (PATH.indexOf("/solicitud") === 0 || PATH.indexOf("solicitud") !== -1) return; // ya es un formulario
  var EN = (function () { try { return (document.documentElement.lang || localStorage.getItem("bpuppy-lang") || "es").toLowerCase().indexOf("en") === 0; } catch (e) { return false; } })();
  function t(es, en) { return EN ? en : es; }
  var ACC = "#F58220", INK = "#2D2421", MUT = "#6B5A4E", LINE = "#e6ddce", CREAM = "#FBF8F3";
  var KEY = "bp-subscribed";
  var already = false; try { already = !!localStorage.getItem(KEY); } catch (e) {}
  var inserted = false;

  function build(footer) {
    if (inserted) return; inserted = true;
    var band = document.createElement("section");
    band.id = "bp-subscribe";
    band.setAttribute("translate", "no");
    band.style.cssText = "background:" + CREAM + ";border-top:1px solid " + LINE + ";padding:38px 20px;font-family:'Plus Jakarta Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased";
    band.innerHTML =
      '<div style="max-width:640px;margin:0 auto;text-align:center">' +
        '<div style="font-family:\'Bricolage Grotesque\',system-ui,sans-serif;font-weight:800;font-size:clamp(20px,4vw,27px);color:' + INK + ';letter-spacing:-0.02em;margin:0 0 6px">' + t("Únete a la comunidad B Puppy", "Join the B Puppy community") + '</div>' +
        '<p style="color:' + MUT + ';font-size:14.5px;line-height:1.55;margin:0 auto 16px;max-width:52ch">' + t("¡Suscríbete y entérate de las novedades, ofertas y noticias importantes de la comunidad B Puppy!", "Subscribe and stay up to date with news, offers and everything happening in the B Puppy community!") + '</p>' +
        '<form id="bp-sub-form" style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;max-width:560px;margin:0 auto">' +
          '<input id="bp-sub-name" placeholder="' + t("Tu nombre (opcional)", "Your name (optional)") + '" autocomplete="name" style="flex:1 1 220px;min-width:200px;padding:13px 15px;border-radius:12px;border:1px solid ' + LINE + ';font-size:15px;font-family:inherit;background:#fff;color:' + INK + ';outline:none">' +
          '<input id="bp-sub-email" type="email" placeholder="' + t("Tu correo", "Your email") + '" autocomplete="email" required style="flex:1 1 220px;min-width:200px;padding:13px 15px;border-radius:12px;border:1px solid ' + LINE + ';font-size:15px;font-family:inherit;background:#fff;color:' + INK + ';outline:none">' +
          '<button type="submit" id="bp-sub-btn" style="padding:13px 26px;border:none;border-radius:999px;background:' + ACC + ';color:#fff;font-weight:800;font-size:15px;font-family:inherit;cursor:pointer;box-shadow:0 8px 20px rgba(245,130,32,0.28)">' + t("Suscribirme", "Subscribe") + '</button>' +
        '</form>' +
        '<div id="bp-sub-msg" style="font-size:13px;margin-top:10px;min-height:18px"></div>' +
        '<div style="font-size:11px;color:#a89c8e;margin-top:4px">' + t("Puedes darte de baja cuando quieras.", "You can unsubscribe anytime.") + '</div>' +
      '</div>';
    footer.parentNode.insertBefore(band, footer);
    var f = band.querySelector("#bp-sub-form"), msg = band.querySelector("#bp-sub-msg");
    if (already) { f.style.display = "none"; msg.style.color = MUT; msg.textContent = t("Ya estás suscrito. ¡Gracias!", "You’re subscribed. Thanks!"); return; }
    f.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var email = (band.querySelector("#bp-sub-email").value || "").trim();
      var name = (band.querySelector("#bp-sub-name").value || "").trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) { msg.style.color = "#c0392b"; msg.textContent = t("Correo no válido.", "Invalid email."); return; }
      var btn = band.querySelector("#bp-sub-btn"); btn.disabled = true; btn.textContent = t("Enviando…", "Sending…");
      fetch(SU + "/rest/v1/website_leads", {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": ANON, "Authorization": "Bearer " + ANON, "Prefer": "return=minimal" },
        body: JSON.stringify({ full_name: (name || email.split("@")[0]), email: email, source: "subscribe", followup_stage: 0, email_consent: true, sms_consent: false, consent_ts: new Date().toISOString(), consent_source: "web_subscribe_footer", contact_lang: (EN ? "English" : "Español"), message: "Suscripción desde el footer del sitio" })
      }).then(function (r) {
        if (!r.ok) throw new Error("http " + r.status);
        try { localStorage.setItem(KEY, "1"); } catch (e) {}
        try { if (window.bpTrack) window.bpTrack("newsletter_subscribe"); } catch (e) {}
        f.style.display = "none"; msg.style.color = "#1E8E5A"; msg.textContent = t("¡Listo! Revisa tu correo, te enviamos la bienvenida.", "Done! Check your email for a welcome.");
      }).catch(function () {
        btn.disabled = false; btn.textContent = t("Suscribirme", "Subscribe");
        msg.style.color = "#c0392b"; msg.textContent = t("No se pudo. Intenta de nuevo.", "Couldn’t send. Try again.");
      });
    });
  }

  function tryInsert() { var footer = document.querySelector("footer.foot") || document.querySelector("footer"); if (footer) { build(footer); return true; } return false; }
  if (!tryInsert()) { var tries = 0; var iv = setInterval(function () { tries++; if (tryInsert() || tries > 40) clearInterval(iv); }, 250); }
})();
