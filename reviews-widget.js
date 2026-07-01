// reviews-widget.js — muestra reseñas REALES publicadas en la sección de testimonios (#testi) del home.
// Se mantiene oculto (no toca nada) hasta que haya >=3 reseñas publicadas (edge reviews_public decide "enough").
// Reemplaza los testimonios estáticos por los reales; sobrevive a los re-render de React (idioma) vía MutationObserver.
(function () {
  var ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
  var cache = null;
  function stars(n) { n = Math.max(1, Math.min(5, Math.round(n || 5))); return "★".repeat(n) + "☆".repeat(5 - n); }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function apply() {
    if (!cache || !cache.length) return;
    var grid = document.querySelector("#testi .t-grid");
    if (!grid) return;
    if (grid.querySelector("[data-bp-real]")) return; // ya están las reales
    grid.innerHTML = cache.slice(0, 6).map(function (rv, i) {
      var nm = esc(rv.name || "Cliente"), loc = esc(rv.location || ""), body = esc(rv.body || "");
      var av = esc((rv.name || "C").trim().charAt(0).toUpperCase());
      return '<div class="t-card reveal" data-bp-real="1" data-d="' + (i + 1) + '">'
        + '<div class="stars">' + stars(rv.rating) + '</div>'
        + '<blockquote>' + body + '</blockquote>'
        + '<div class="who"><div class="av">' + av + '</div><div>'
        + '<div class="nm">' + nm + '</div><div class="meta">' + loc + '</div></div></div>'
        + '</div>';
    }).join("");
  }
  function watch() {
    var host = document.getElementById("testi");
    if (!host) { setTimeout(watch, 300); return; }
    apply();
    try {
      var mo = new MutationObserver(function () { apply(); });
      mo.observe(host, { childList: true, subtree: true });
    } catch (e) {}
  }
  function boot() {
    fetch("https://oqqwmcplljirbreowrll.supabase.co/functions/v1/reviews_public", {
      method: "POST", headers: { "Content-Type": "application/json", "apikey": ANON }
    })
      .then(function (r) { return r.json(); })
      .then(function (d) { if (d && d.ok && d.enough && d.reviews && d.reviews.length) { cache = d.reviews; watch(); } })
      .catch(function () {});
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
