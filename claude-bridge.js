// claude-bridge.js — BPuppy
// Proporciona window.claude.complete() conectado al edge function website-chat de Supabase.
// Cargado en todas las páginas antes de chat-widget.jsx.
(function (w) {
  'use strict';
  var EDGE = 'https://oqqwmcplljirbreowrll.supabase.co/functions/v1/website-chat';
  var ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4';

  // ── Captura de Google Click ID (gclid) ───────────────────────────────────
  // Cuando alguien llega desde un anuncio de Google, la URL trae ?gclid=...
  // Lo guardamos (y tambien gbraid/wbraid de iOS) por ~90 dias para poder
  // cerrar el circulo de conversiones en Google Ads cuando el lead se vuelve venta.
  try {
    var params = new URLSearchParams(w.location.search);
    ['gclid', 'gbraid', 'wbraid'].forEach(function (k) {
      var val = params.get(k);
      if (val) {
        try {
          localStorage.setItem('bp_' + k, val);
          localStorage.setItem('bp_gclid_ts', String(Date.now()));
        } catch (e) {}
      }
    });
  } catch (e) {}

  // Devuelve el click ID guardado si sigue vigente (<= 90 dias), si no null.
  w.bpGclid = function () {
    try {
      var ts = parseInt(localStorage.getItem('bp_gclid_ts') || '0', 10);
      if (ts && (Date.now() - ts) > 90 * 24 * 60 * 60 * 1000) return null;
      return localStorage.getItem('bp_gclid')
          || localStorage.getItem('bp_gbraid')
          || localStorage.getItem('bp_wbraid')
          || null;
    } catch (e) { return null; }
  };

  // ── Google tag (Google Ads + GA4): conversiones y remarketing ────────────
  // Conversion ID de la cuenta: AW-11003229221 (distinto del customer id 9610073633).
  // GA4: G-BRLSXJ4V73. Lead form conversion ya existente ($500).
  var AW_ID = 'AW-11003229221';
  var GA4_ID = 'G-BRLSXJ4V73';
  var LEAD_SEND_TO = 'AW-11003229221/2mP_CNO6uKQcEKXo3_4o'; // "BPuppy - Lead Form Submitted"

  // ── Aislamiento COPPA del juego de niños (/quiz) ──────────────────────────
  // El quiz/juego de razas es para niños. En esa ruta NO cargamos gtag, GA4,
  // Google Ads ni ningún pixel de terceros: cero datos a terceros. Dejamos
  // gtag como no-op para que nada del sitio se rompa si intenta llamarlo.
  var _isKidsGame = false;
  try {
    var _p = (w.location.pathname || '').toLowerCase();
    _isKidsGame = /(^|\/)quiz(\/|\.html?)?$/.test(_p) || _p.indexOf('/quiz') === 0 || _p.indexOf('quiz.html') !== -1;
  } catch (e) {}

  if (_isKidsGame) {
    if (!w.gtag) w.gtag = function () {};   // no-op: nunca envía nada a terceros
  } else {
    try {
      if (!w.dataLayer) {
        w.dataLayer = w.dataLayer || [];
        w.gtag = function () { w.dataLayer.push(arguments); };
        w.gtag('js', new Date());
        w.gtag('config', AW_ID, {transport_url:'https://bpuppy.us/metrics'});
        w.gtag('config', GA4_ID, {transport_url:'https://bpuppy.us/metrics'});
        var gs = document.createElement('script');
        gs.async = true;
        gs.src = 'https://bpuppy.us/metrics/gtag/js?id=' + AW_ID;
        (document.head || document.documentElement).appendChild(gs);
      }
    } catch (e) {}
  }

  // Dispara la conversion de LEAD ($500). Se llama al enviar formulario o chat.
  // Normaliza telefono a E.164 (US por defecto) para Enhanced Conversions.
  function bpNormPhone(v){ var d=String(v||'').replace(/[^0-9]/g,''); if(!d) return ''; if(d.length===10) return '+1'+d; if(d.length===11 && d[0]==='1') return '+'+d; if(String(v).trim()[0]==='+') return '+'+d; return d.length>=10 ? '+'+d : ''; }
  // Dispara la conversion de LEAD ($500). Enhanced Conversions: toma correo/telefono
  // del argumento o, si no, del formulario en pantalla (input email/tel con valor).
  w.bpLead = function (ud) {
    try {
      if (w.bpLeadFired) return;          // una sola vez por carga
      w.bpLeadFired = true;
      if (!w.gtag) return;
      var user = ud || {};
      try {
        if (!user.email) { var em = document.querySelector('input[type=email], input[name*=email i], input[id*=email i]'); if (em && em.value) user.email = em.value; }
        if (!user.phone_number && !user.phone) { var ph = document.querySelector('input[type=tel], input[name*=phone i], input[name*=tel i], input[id*=phone i], input[id*=telefono i]'); if (ph && ph.value) user.phone_number = ph.value; }
      } catch (e) {}
      var u = {};
      if (user.email) u.email = String(user.email).trim().toLowerCase();
      var pn = bpNormPhone(user.phone_number || user.phone); if (pn) u.phone_number = pn;
      if (u.email || u.phone_number) { try { w.gtag('set', 'user_data', u); } catch (e) {} }
      w.gtag('event', 'conversion', { send_to: LEAD_SEND_TO, value: 500.0, currency: 'USD' });
      w.gtag('event', 'generate_lead', { value: 500.0, currency: 'USD' });
    } catch (e) {}
  };
  // Evento GA4 generico (whatsapp_click, call_click) — importable como conversion.
  w.bpTrack = function (name) { try { if (w.gtag) w.gtag('event', name); } catch (e) {} };

  // ── Inventario publico de cachorros (lee vista segura puppies_public) ──────
  // Uso: window.bpPuppies('available', 12).then(list => ...)  /  status: 'available' | 'delivered'
  w.bpPuppies = function (status, limit) {
    var url = EDGE.replace('/functions/v1/website-chat', '') + '/rest/v1/puppies_public'
      + '?select=id,name,breed,gender,color,age_weeks,price,photo_url,status'
      + '&status=eq.' + (status || 'available')
      + '&order=created_at.desc' + (limit ? ('&limit=' + limit) : '');
    return fetch(url, { headers: { apikey: ANON } })
      .then(function (r) { return r.ok ? r.json() : []; })
      .catch(function () { return []; });
  };

  // Detector GLOBAL de clics a WhatsApp y a llamadas (sin tocar cada pagina)
  try {
    document.addEventListener('click', function (ev) {
      var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
      if (!a) return;
      var href = (a.getAttribute('href') || '').toLowerCase();
      if (href.indexOf('wa.me') > -1 || href.indexOf('whatsapp') > -1) w.bpTrack('whatsapp_click');
      else if (href.indexOf('tel:') === 0) w.bpTrack('call_click');
    }, true);
  } catch (e) {}

  // ── Contador de visitas (primera-parte, va al CRM via track_visit) ──
  try {
    var TRACK = 'https://oqqwmcplljirbreowrll.supabase.co/functions/v1/track_visit';
    var consent = ''; try { consent = localStorage.getItem('bp-cookie-consent') || ''; } catch (e) {}
    var already = false; try { already = !!sessionStorage.getItem('bp-visit-logged'); } catch (e) {}
    // Si el usuario rechazó analítica en el banner (consent==='essential') no contamos.
    // Sin elección previa: contamos como esencial de primera-parte. Si aceptó todo: 'all'.
    if (consent !== 'essential' && !already) {
      try { sessionStorage.setItem('bp-visit-logged', '1'); } catch (e) {}
      var sendVisit = function () {
        try {
          fetch(TRACK, {
            method: 'POST', keepalive: true,
            headers: { 'Content-Type': 'application/json', 'apikey': ANON },
            body: JSON.stringify({
              page: w.location.pathname, landing_path: w.location.pathname,
              referrer: document.referrer || '', language: navigator.language || '',
              screen: (w.screen ? (screen.width + 'x' + screen.height) : ''),
              site: w.location.hostname, ua: navigator.userAgent,
              consent: (consent === 'all' ? 'all' : 'essential')
            })
          }).catch(function () {});
        } catch (e) {}
      };
      if (document.readyState === 'complete' || document.readyState === 'interactive') setTimeout(sendVisit, 800);
      else w.addEventListener('load', function () { setTimeout(sendVisit, 800); });
    }
  } catch (e) {}

  // ── Pop-up de invitacion a B Social (waitlist) — site-wide, NUNCA en el juego de ninos ──
  if (!_isKidsGame) {
    try {
      var si = document.createElement('script');
      si.src = '/bp-social-invite.js?v=1783528000000';
      si.async = true;
      (document.head || document.documentElement).appendChild(si);
    } catch (e) {}
  }

  w.claude = {
    complete: async function (opts) {
      var messages = opts.messages || [];
      var system   = opts.system   || '';
      var res = await fetch(EDGE, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'apikey':        ANON,
          'Authorization': 'Bearer ' + ANON,
        },
        body: JSON.stringify({ messages: messages, system: system }),
      });
      if (!res.ok) throw new Error('Chat error ' + res.status);
      var d = await res.json();
      if (d.error) throw new Error(d.error);
      return d.reply || '';
    },
  };
})(window);
