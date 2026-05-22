// claude-bridge.js — BPuppy
// Proporciona window.claude.complete() conectado al edge function website-chat de Supabase.
// Cargado en todas las páginas antes de chat-widget.jsx.
(function (w) {
  'use strict';
  var EDGE = 'https://oqqwmcplljirbreowrll.supabase.co/functions/v1/website-chat';
  var ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4';

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
