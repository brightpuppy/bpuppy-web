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
