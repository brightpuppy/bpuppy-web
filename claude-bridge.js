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
  try {
    if (!w.dataLayer) {
      w.dataLayer = w.dataLayer || [];
      w.gtag = function () { w.dataLayer.push(arguments); };
      w.gtag('js', new Date());
      w.gtag('config', AW_ID);
      w.gtag('config', GA4_ID);
      var gs = document.createElement('script');
      gs.async = true;
      gs.src = 'https://www.googletagmanager.com/gtag/js?id=' + AW_ID;
      (document.head || document.documentElement).appendChild(gs);
    }
  } catch (e) {}

  // Dispara la conversion de LEAD ($500). Se llama al enviar formulario o chat.
  w.bpLead = function () {
    try {
      if (w.bpLeadFired) return;          // una sola vez por carga
      w.bpLeadFired = true;
      if (!w.gtag) return;
      w.gtag('event', 'conversion', { send_to: LEAD_SEND_TO, value: 500.0, currency: 'USD' });
      w.gtag('event', 'generate_lead', { value: 500.0, currency: 'USD' });
    } catch (e) {}
  };
  // Evento GA4 generico (whatsapp_click, call_click) — importable como conversion.
  w.bpTrack = function (name) { try { if (w.gtag) w.gtag('event', name); } catch (e) {} };

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
