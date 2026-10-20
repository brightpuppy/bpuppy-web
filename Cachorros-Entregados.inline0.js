(function(){
const CE_SUPA_URL = "https://oqqwmcplljirbreowrll.supabase.co";
const CE_SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
const ceSb = (() => {
  try {
    return supabase.createClient(CE_SUPA_URL, CE_SUPA_KEY);
  } catch (e) {
    return null;
  }
})();
var h = React.createElement;
var EG_BASE = "assets/entregas-galeria/";
(function(){ try{ if(!document.getElementById("eg-css")){ var s=document.createElement("style"); s.id="eg-css"; s.textContent=".eg-note{display:flex;align-items:center;gap:10px;background:linear-gradient(90deg,rgba(245,130,32,.10),rgba(245,130,32,.02));border:1px solid rgba(245,130,32,.28);border-radius:14px;padding:13px 18px;font-size:15px;color:var(--ink);line-height:1.5}@media(max-width:1100px){}@media(max-width:720px){}.eg-grid figure{margin:0 0 12px;break-inside:avoid;-webkit-column-break-inside:avoid;border-radius:14px;overflow:hidden;cursor:zoom-in;position:relative;background:var(--bg-2,#efeae6)}.eg-grid img{width:100%;display:block;transition:transform .5s ease,opacity .6s ease}.eg-grid figure:hover img{transform:scale(1.045)}.eg-lb{position:fixed;inset:0;z-index:99999;background:rgba(22,17,15,.94);display:flex;align-items:center;justify-content:center;animation:egLbIn .2s ease}@keyframes egLbIn{from{opacity:0}to{opacity:1}}.eg-lb .eg-foto{max-width:92vw;max-height:calc(100vh - 210px);border-radius:10px;box-shadow:0 20px 70px rgba(0,0,0,.6);-webkit-user-select:none;user-select:none}.eg-lb-x{position:absolute;top:16px;right:18px;width:44px;height:44px;border-radius:50%;border:none;background:rgba(255,255,255,.14);color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s}.eg-lb-x:hover{background:rgba(255,255,255,.26)}.eg-lb-nav{position:absolute;top:50%;transform:translateY(-50%);width:52px;height:52px;border-radius:50%;border:none;background:rgba(255,255,255,.14);color:#fff;font-size:30px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s}.eg-lb-nav:hover{background:rgba(255,255,255,.28)}.eg-lb-prev{left:16px}.eg-lb-next{right:16px}.eg-lb-count{position:absolute;bottom:18px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.85);font-size:13px;font-weight:600;background:rgba(0,0,0,.35);padding:5px 14px;border-radius:999px}.eg-top{position:fixed;left:18px;bottom:18px;z-index:900;width:46px;height:46px;border-radius:50%;border:none;background:var(--orange,#F58220);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(245,130,32,.45);transition:opacity .3s ease,transform .15s}.eg-top:hover{transform:translateY(-3px)}@media(max-width:720px){.eg-lb-nav{width:44px;height:44px;font-size:26px}.eg-top{left:14px;bottom:14px}}.eg-bar{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin:30px 0 16px}.eg-cnt{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--orange)}.eg-cnt-sub{display:block;margin-top:4px;font-size:10.5px;font-weight:600;letter-spacing:.1em;color:var(--muted,#8a8580)}.eg-sz{display:flex;gap:4px;border:1px solid var(--line);border-radius:999px;padding:3px;background:var(--paper)}.eg-sz-b{display:flex;align-items:center;gap:7px;border:0;background:none;border-radius:999px;padding:7px 13px;min-height:38px;  font:inherit;font-size:12.5px;font-weight:600;color:var(--muted,#8a8580);cursor:pointer;transition:box-shadow .15s,color .15s}.eg-sz-b:hover{color:var(--ink)}.eg-sz-b.on{color:var(--orange);box-shadow:inset 0 0 0 1px var(--orange)}.eg-sz-i{display:grid;gap:1.5px;width:13px;flex:none}.eg-sz-i i{display:block;background:currentColor;border-radius:1px}.eg-sz-lg{grid-template-columns:1fr 1fr}.eg-sz-lg i{height:5px}.eg-sz-lg i:nth-child(n+3){display:none}.eg-sz-md{grid-template-columns:1fr 1fr}.eg-sz-md i{height:5px}.eg-sz-sm{grid-template-columns:repeat(3,1fr)}.eg-sz-sm i{height:3px}.eg-bar-r{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.eg-ver{display:inline-flex;align-items:center;gap:8px;min-height:38px;padding:7px 15px;border:1px solid var(--line);border-radius:999px;background:var(--paper);font:inherit;font-size:12.5px;font-weight:700;color:var(--ink);cursor:pointer;transition:border-color .15s,color .15s}.eg-ver:hover{border-color:var(--orange);color:var(--orange)}.eg-ver svg{width:13px;height:13px;flex:none}.eg-strip{position:absolute;bottom:12px;left:0;right:0;display:flex;gap:6px;justify-content:center;overflow:hidden;padding:0 16px;pointer-events:none}.eg-strip img{pointer-events:auto}.eg-hueco{height:54px;width:54px;flex:none}.eg-rail-wrap{position:relative;margin:4px 0 30px}.eg-rail{display:flex;align-items:center;gap:13px;overflow-x:auto;padding:14px 2px 16px;scrollbar-width:none;-ms-overflow-style:none}.eg-rail::-webkit-scrollbar{display:none}.eg-rail figure{margin:0;flex:none;border-radius:18px;overflow:hidden;cursor:zoom-in;background:var(--bg-2,#efeae6);transition:transform .32s cubic-bezier(.22,1,.36,1),box-shadow .32s ease}.eg-rail figure:hover{transform:translateY(-7px) scale(1.018);box-shadow:0 20px 40px -18px rgba(45,36,33,.42)}.eg-rail img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.22,1,.36,1)}.eg-rail figure:hover img{transform:scale(1.06)}.eg-r0{width:296px;height:214px}.eg-r1{width:196px;height:272px}.eg-r2{width:244px;height:244px}.eg-fl{position:absolute;top:50%;transform:translateY(-50%);z-index:5;width:46px;height:46px;border-radius:50%;border:1px solid var(--line);background:var(--paper);color:var(--ink);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:22px;line-height:1;box-shadow:0 6px 20px -8px rgba(45,36,33,.35);transition:border-color .15s,color .15s,transform .15s,opacity .2s}.eg-fl:hover{border-color:var(--orange);color:var(--orange);transform:translateY(-50%) scale(1.07)}.eg-fl[disabled]{opacity:0;pointer-events:none}.eg-fl-i{left:-6px}.eg-fl-d{right:-6px}@media(max-width:720px){.eg-r0{width:218px;height:160px}.eg-r1{width:146px;height:202px}.eg-r2{width:182px;height:182px}.eg-fl{width:44px;height:44px}.eg-fl-i{left:-4px}.eg-fl-d{right:-4px}}@media(max-width:720px){.eg-hueco{height:44px;width:44px}}.eg-strip::-webkit-scrollbar{display:none}.eg-strip img{height:54px;width:54px;object-fit:cover;border-radius:8px;flex:none;cursor:pointer;opacity:.45;transition:opacity .18s,box-shadow .18s;border:0}.eg-strip img:hover{opacity:.85}.eg-strip img.on{opacity:1;box-shadow:0 0 0 2px var(--orange,#F58220)}.eg-play{position:absolute;top:16px;left:18px;display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 16px;border-radius:999px;border:1px solid rgba(255,255,255,.3);background:none;color:#fff;font:inherit;font-size:12.5px;font-weight:700;cursor:pointer;transition:border-color .15s,background .15s}.eg-play:hover{border-color:#fff;background:rgba(255,255,255,.12)}.eg-play svg{width:13px;height:13px;flex:none}.eg-lb-count{bottom:80px}@media(max-width:720px){.eg-strip img{height:44px;width:44px}.eg-play{top:auto;bottom:78px;left:16px;padding:0 13px}.eg-lb .eg-foto{max-height:calc(100vh - 230px)}}.eg-grid.eg-lg{column-count:2;column-gap:16px}.eg-grid.eg-md{column-count:4;column-gap:12px}.eg-grid.eg-sm{column-count:6;column-gap:9px}.eg-acc{display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;padding:30px 0 0}.eg-mas{display:inline-flex;align-items:center;gap:9px;background:var(--paper);border:1px solid var(--line);color:var(--ink);  padding:12px 22px;min-height:46px;border-radius:999px;font:inherit;font-weight:700;cursor:pointer;transition:border-color .15s,box-shadow .15s}.eg-mas:hover{border-color:var(--orange);box-shadow:0 2px 14px rgba(245,130,32,.14)}.eg-mas-n{font-size:11.5px;font-weight:700;color:#fff;background:var(--orange);border-radius:999px;padding:2px 9px}.eg-menos{background:none;border:1px solid transparent;color:var(--muted,#8a8580);padding:12px 18px;min-height:46px;  border-radius:999px;font:inherit;font-size:13.5px;font-weight:600;cursor:pointer}.eg-menos:hover{color:var(--ink);border-color:var(--line)}@media (max-width:900px){.eg-grid.eg-lg{column-count:1}.eg-grid.eg-md{column-count:2}.eg-grid.eg-sm{column-count:3}  .eg-bar{gap:12px}.eg-sz-t{display:none}.eg-sz-b{padding:7px;min-width:44px;min-height:44px;justify-content:center}}@media (max-width:460px){.eg-grid.eg-md{column-count:2;column-gap:8px}.eg-grid.eg-sm{column-count:3;column-gap:6px}}"; document.head.appendChild(s); } }catch(e){} })();
function BackToTop(){
  var ref = React.useState(false);
  var show = ref[0], setShow = ref[1];
  React.useEffect(function(){
    var onS = function(){ setShow(window.scrollY > 700); };
    window.addEventListener("scroll", onS, { passive: true }); onS();
    return function(){ window.removeEventListener("scroll", onS); };
  }, []);
  return h("button", { "aria-label": "Volver arriba", className: "eg-top", onClick: function(){ window.scrollTo({ top: 0, behavior: "smooth" }); }, style: { opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none" } },
    h("svg", { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" }, h("path", { d: "M12 19V5" }), h("path", { d: "M5 12l7-7 7 7" })));
}
function EntregasGaleria(){
  var L = useLang(); var lang = L.lang;
  var t = function(es, en){ return lang === "en" ? en : es; };
  var PASO = 60;
  var sF = React.useState(null); var files = sF[0], setFiles = sF[1];
  var sS = React.useState(PASO); var shown = sS[0], setShown = sS[1];
  var sI = React.useState(-1); var idx = sI[0], setIdx = sI[1];
  // El tamano elegido se recuerda: quien las quiere grandes las quiere grandes siempre.
  var sD = React.useState(function(){
    try{ return localStorage.getItem("eg-size") || "md"; }catch(e){ return "md"; }
  });
  var size = sD[0], setSize = sD[1];
  var sentRef = React.useRef(null);
  var topRef = React.useRef(null);
  // Pase de fotos: la gente quiere mirar, no hacer scroll.
  var sP = React.useState(false); var pasando = sP[0], setPasando = sP[1];
  var tiraRef = React.useRef(null);

  React.useEffect(function(){
    fetch(EG_BASE + "index.json").then(function(r){ return r.json(); }).then(function(d){ setFiles((d && d.files) || []); }).catch(function(){ setFiles([]); });
  }, []);

  // Sin carga automatica al bajar: hacia crecer la pagina sin parar, que es
  // justo el "tanto scroll" del que se quejaba Luis. Quien quiera mas, pulsa;
  // quien quiera verlas todas, usa el pase, que no hace scroll ninguno.

  React.useEffect(function(){
    if (idx < 0 || !files) return;
    var onKey = function(e){
      if (e.key === "Escape") setIdx(-1);
      else if (e.key === "ArrowRight") setIdx(function(i){ return i >= files.length - 1 ? i : i + 1; });
      else if (e.key === "ArrowLeft") setIdx(function(i){ return i <= 0 ? i : i - 1; });
    };
    window.addEventListener("keydown", onKey);
    var prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    // La siguiente se va bajando mientras miras esta, para que no parpadee al pasar.
    if (idx < files.length - 1){ var pre = new Image(); pre.src = EG_BASE + files[idx + 1]; }
    return function(){ window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [idx, files]);

  React.useEffect(function(){
    if (!pasando || idx < 0 || !files || !files.length) return;
    var tm = setTimeout(function(){
      setIdx(function(i){ return i >= files.length - 1 ? 0 : i + 1; });
    }, 3200);
    return function(){ clearTimeout(tm); };
  }, [pasando, idx, files]);

  function abrirPase(){ setIdx(0); setPasando(true); }

  // Flechas de la fila: se mueve algo menos de lo que se ve, para que quede
  // una foto de la vuelta anterior y no se pierda el hilo.
  var railRef = React.useRef(null);
  var sBordes = React.useState({ ini: true, fin: false });
  var bordes = sBordes[0], setBordes = sBordes[1];
  function miraBordes(){
    var r = railRef.current;
    if (!r) return;
    setBordes({ ini: r.scrollLeft < 8, fin: r.scrollLeft + r.clientWidth >= r.scrollWidth - 8 });
  }
  // El suavizado nativo (scrollBy/scrollTo con behavior:"smooth") NO se
  // ejecuta en este caso: la fila se quedaba clavada en 0. Se anima a mano.
  var animRef = React.useRef(0);
  var redRef = React.useRef(0);
  function mueve(dir){
    var r = railRef.current;
    if (!r) return;
    var paso = Math.max(240, Math.round(r.clientWidth * 0.8));
    var desde = r.scrollLeft;
    var tope = r.scrollWidth - r.clientWidth;
    var hasta = Math.max(0, Math.min(tope, desde + dir * paso));
    if (hasta === desde) return;
    cancelAnimationFrame(animRef.current);
    clearTimeout(redRef.current);
    var t0 = 0, DUR = 520, vivo = false;
    var paso1 = function(ts){
      vivo = true;
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / DUR);
      // Sale rapido y frena al llegar: se siente vivo, no mecanico.
      var e = 1 - Math.pow(1 - p, 3);
      r.scrollLeft = desde + (hasta - desde) * e;
      if (p < 1) animRef.current = requestAnimationFrame(paso1);
      else miraBordes();
    };
    animRef.current = requestAnimationFrame(paso1);
    // Red: si la pagina no esta pintando, rAF no entra nunca y la flecha se
    // quedaria muerta. En ese caso se coloca de golpe.
    redRef.current = setTimeout(function(){
      if (vivo) return;
      cancelAnimationFrame(animRef.current);
      r.scrollLeft = hasta;
      miraBordes();
    }, 80);
  }
  React.useEffect(function(){ return function(){ cancelAnimationFrame(animRef.current); clearTimeout(redRef.current); }; }, []);
  React.useEffect(function(){ miraBordes(); }, [files]);
  React.useEffect(function(){
    window.__egAbrirPase = abrirPase;
    window.__egTotal = (files && files.length) || 0;
    try { window.dispatchEvent(new CustomEvent("eg:listo")); } catch (e) {}
    return function(){ window.__egAbrirPase = null; };
  }, [files]);

  function elegirTam(v){
    setSize(v);
    try{ localStorage.setItem("eg-size", v); }catch(e){}
  }
  // Volver al principio sin recargar: con 767 fotos cargadas, bajar a mano es un castigo.
  function verMenos(){
    setShown(PASO);
    try{
      var y = topRef.current ? (topRef.current.getBoundingClientRect().top + window.scrollY - 80) : 0;
      window.scrollTo({ top: y, behavior: "smooth" });
    }catch(e){ window.scrollTo(0, 0); }
  }

  // Deslizar con el dedo en el visor.
  var toqueX = React.useRef(0);
  function onTouchStart(e){ toqueX.current = (e.touches && e.touches[0] ? e.touches[0].clientX : 0); }
  function onTouchEnd(e){
    var fin = (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : 0);
    var d = fin - toqueX.current;
    if (Math.abs(d) < 45) return;
    if (d < 0) setIdx(function(i){ return i >= files.length - 1 ? i : i + 1; });
    else setIdx(function(i){ return i <= 0 ? i : i - 1; });
  }

  if (files === null) return h("div", { style: { display: "flex", justifyContent: "center", padding: "60px 0" } }, h("div", { className: "bp-spinner" }));
  if (!files.length) return null;

  var visible = files.slice(0, shown);
  var close = function(){ setIdx(-1); setPasando(false); };
  var TAMS = [
    { v: "lg", et: t("Grandes", "Large") },
    { v: "md", et: t("Normal", "Medium") },
    { v: "sm", et: t("Pequeñas", "Small") }
  ];

  return h("section", { style: { padding: "8px clamp(20px,5vw,80px) clamp(56px,7vw,90px)" } },
    h("div", { style: { maxWidth: 1180, margin: "0 auto" } },
      h("div", { className: "eg-note" },
        h("span", { style: { fontSize: 18 } }, "\u{1F1E9}\u{1F1F4}"),
        h("span", null, t("En Rep\xFAblica Dominicana tambi\xE9n somos ", "In the Dominican Republic we are also "), h("strong", null, "Cachorros RD"), ".")),

      h("div", { className: "eg-bar", ref: topRef },
        h("div", { className: "eg-cnt" },
          files.length, t(" momentos de entrega", " delivery moments"),
          shown < files.length && h("span", { className: "eg-cnt-sub" }, t("viendo ", "showing ") + shown)),
        h("div", { className: "eg-bar-r" },
        h("button", { className: "eg-ver", onClick: abrirPase, title: t("Verlas una a una, sin bajar", "See them one by one, no scrolling") },
          h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
            h("path", { d: "M8 5.5v13l10-6.5z" })),
          t("Pase de fotos", "Slideshow")),
        h("div", { className: "eg-sz", role: "group", "aria-label": t("Tama\xF1o de las fotos", "Photo size") },
          TAMS.map(function(o){
            return h("button", {
              key: o.v,
              className: "eg-sz-b" + (size === o.v ? " on" : ""),
              onClick: function(){ elegirTam(o.v); },
              "aria-pressed": size === o.v,
              title: o.et
            }, h("span", { className: "eg-sz-i eg-sz-" + o.v, "aria-hidden": "true" },
                 h("i", null), h("i", null), h("i", null), h("i", null)),
               h("span", { className: "eg-sz-t" }, o.et));
          })))),

      // Una fila de 40 basta para engancharte; las 767 enteras son para el
      // pase o para el mosaico de abajo.
      h("div", { className: "eg-rail-wrap" },
        h("button", { className: "eg-fl eg-fl-i", disabled: bordes.ini, onClick: function(){ mueve(-1); },
          "aria-label": t("Anterior", "Previous") }, "\u2039"),
        h("div", { className: "eg-rail", ref: railRef, onScroll: miraBordes },
          files.slice(0, 40).map(function(f, i){
            return h("figure", { key: "r" + f, className: "eg-r" + (i % 3), onClick: function(){ setIdx(i); } },
              h("img", { src: EG_BASE + f, alt: t("Cachorro entregado", "Delivered puppy"), loading: "lazy", decoding: "async" }));
          })),
        h("button", { className: "eg-fl eg-fl-d", disabled: bordes.fin, onClick: function(){ mueve(1); },
          "aria-label": t("Siguiente", "Next") }, "\u203A")),

      h("div", { className: "eg-grid eg-" + size }, visible.map(function(f, i){
        return h("figure", { key: f, onClick: function(){ setIdx(i); } },
          h("img", { src: EG_BASE + f, alt: t("Cachorro entregado", "Delivered puppy"), loading: "lazy", decoding: "async", onLoad: function(e){ e.currentTarget.style.opacity = 1; }, style: { opacity: 0 } }));
      })),

      h("div", { className: "eg-acc" },
        shown < files.length && h("button", { className: "eg-mas", onClick: function(){ setShown(function(s){ return s + PASO; }); } },
          t("Ver m\xE1s fotos", "Show more photos"),
          h("span", { className: "eg-mas-n" }, (files.length - shown))),
        shown > PASO && h("button", { className: "eg-menos", onClick: verMenos },
          t("Ver menos", "Show less")))),

    idx >= 0 && h("div", { className: "eg-lb", onClick: close, onTouchStart: onTouchStart, onTouchEnd: onTouchEnd },
      h("button", { className: "eg-lb-x", "aria-label": t("Cerrar", "Close"), onClick: close }, "\u2715"),
      idx > 0 && h("button", { className: "eg-lb-nav eg-lb-prev", "aria-label": t("Anterior", "Previous"), onClick: function(e){ e.stopPropagation(); setIdx(function(i){ return i - 1; }); } }, "\u2039"),
      h("img", { className: "eg-foto", src: EG_BASE + files[idx], alt: "", onClick: function(e){ e.stopPropagation(); } }),
      idx < files.length - 1 && h("button", { className: "eg-lb-nav eg-lb-next", "aria-label": t("Siguiente", "Next"), onClick: function(e){ e.stopPropagation(); setIdx(function(i){ return i + 1; }); } }, "\u203A"),
      h("button", { className: "eg-play", onClick: function(e){ e.stopPropagation(); setPasando(function(p){ return !p; }); } },
        h("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
          pasando ? h("path", { d: "M9 5v14M15 5v14" }) : h("path", { d: "M8 5.5v13l10-6.5z" })),
        pasando ? t("Pausa", "Pause") : t("Reproducir", "Play")),
      h("div", { className: "eg-lb-count" }, (idx + 1) + " / " + files.length),
      // Tira de miniaturas: una ventana alrededor de la actual. Las 767 a la vez
      // serian 767 etiquetas en el DOM por una tira que nadie recorre entera.
      h("div", { className: "eg-strip", ref: tiraRef, onClick: function(e){ e.stopPropagation(); } },
        (function(){
          var LADO = 10, salida = [];
          for (var p = idx - LADO; p <= idx + LADO; p++){
            if (p < 0 || p >= files.length){
              // Hueco invisible: mantiene la actual en el centro en los extremos.
              salida.push(h("span", { key: "x" + p, className: "eg-hueco", "aria-hidden": "true" }));
            } else {
              salida.push(h("img", (function(real){ return {
                key: files[real], src: EG_BASE + files[real], alt: "", loading: "lazy", decoding: "async",
                className: real === idx ? "on" : "",
                onClick: function(e){ e.stopPropagation(); setIdx(real); }
              }; })(p)));
            }
          }
          return salida;
        })())));
}
function getAge(p, lang) {
  const w = p.age_weeks || (p.birth_date ? Math.floor((Date.now() - new Date(p.birth_date)) / 6048e5) : null);
  if (!w) return null;
  return w < 16 ? w + (lang === "en" ? " weeks" : " semanas") : Math.floor(w / 4) + (lang === "en" ? " months" : " meses");
}
function DeliveredCard({ p }) {
  const { lang } = useLang();
  const t = (es, en) => lang === "en" ? en : es;
  const ph = Array.isArray(p.photos) && p.photos[0] || p.photo_url || null;
  const age = getAge(p, lang);
  return /* @__PURE__ */ React.createElement("div", { style: { borderRadius: "var(--r)", overflow: "hidden", background: "var(--paper)", border: "1px solid var(--line)", position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { aspectRatio: "1/1", background: "var(--bg-2)", overflow: "hidden", position: "relative" } }, ph ? /* @__PURE__ */ React.createElement("img", { src: ph, alt: p.name, style: { width: "100%", height: "100%", objectFit: "cover" } }) : /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 } }, "\u{1F436}"), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 12, left: 12, background: "var(--ink)", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 999 } }, "En su hogar \u2764\uFE0F")), /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--display)", fontSize: 20, fontWeight: 700, color: "var(--ink)", marginBottom: 3 } }, p.name || t("Sin nombre", "Unnamed")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--orange)", fontWeight: 600, marginBottom: 8 } }, p.breed), (age || p.gender || p.color) && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, age && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, padding: "3px 10px", borderRadius: 999, background: "var(--bg)", color: "var(--ink-2)", fontWeight: 600 } }, age), p.gender && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, padding: "3px 10px", borderRadius: 999, background: "var(--bg)", color: "var(--ink-2)", fontWeight: 600 } }, p.gender === "female" ? "\u2640 Hembra" : "\u2642 Macho")), p.delivered_to && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--ink-2)", marginTop: 8 } }, "\u{1F4CD} ", p.delivered_to)));
}
function CachorrosEntregados() {
  const { lang } = useLang();
  const t = (es, en) => lang === "en" ? en : es;
  const [puppies, setPuppies] = React.useState([]);
  const [status, setStatus] = React.useState("loading");
  React.useEffect(() => {
    if (!ceSb) {
      setStatus("error");
      return;
    }
    ceSb.from("puppies_public").select("*").in("status", ["delivered", "sold", "in_transit"]).order("created_at", { ascending: false }).then(({ data, error }) => {
      if (error) {
        setStatus("error");
        return;
      }
      // Solo familias con foto real (evita placeholders vacíos); más reciente primero por fecha de entrega
      var withPhoto = (data || []).filter(function(p){ return (Array.isArray(p.photos) && p.photos.length) || p.photo_url; });
      withPhoto.sort(function(a, b){ return new Date(b.delivered_at || b.created_at) - new Date(a.delivered_at || a.created_at); });
      setPuppies(withPhoto);
      setStatus("ok");
    });
  }, []);
  return /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", minHeight: "60vh" } }, /* @__PURE__ */ React.createElement("section", { style: { background: "linear-gradient(100deg, rgba(45,36,33,0.82) 0%, rgba(45,36,33,0.55) 45%, rgba(45,36,33,0.12) 100%), url('assets/header-cachorros.webp') center right/cover no-repeat, var(--dark-sec,#2D2421)", padding: "120px clamp(20px,5vw,80px) 64px", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(45% 60% at 18% 50%, rgba(0,0,0,0.35), transparent 70%)", pointerEvents: "none" } }), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 800, position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFB877", marginBottom: 14 } }, t("BPuppy \xB7 Historias", "BPuppy \xB7 Stories")), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "var(--display)", fontSize: "clamp(40px,7vw,88px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.93, margin: "0 0 20px", color: "#fff", textShadow: "0 2px 14px rgba(0,0,0,0.4)" } }, t("Ya en su", "Already"), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", { style: { fontFamily: "var(--serif)", fontStyle: "italic", color: "#FFB877" } }, t("hogar.", "home."))), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 17, color: "rgba(255,255,255,0.88)", lineHeight: 1.65, maxWidth: "48ch", margin: 0, textShadow: "0 1px 8px rgba(0,0,0,0.4)" } }, t("Cada cachorro que entregamos lleva nuestro coraz\xF3n. Aqu\xED celebramos a las familias que ya encontraron a su compa\xF1ero perfecto.", "Every puppy we deliver carries a piece of our heart. Here we celebrate the families who have already found their perfect companion.")), /* @__PURE__ */ React.createElement(BotonPase, { t: t }))),/* @__PURE__ */ React.createElement("section", { style: { padding: "clamp(48px,6vw,80px) clamp(20px,5vw,80px)" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1100, margin: "0 auto" } }, status === "loading" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: "80px 0" } }, /* @__PURE__ */ React.createElement("div", { className: "bp-spinner" }), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)", fontSize: 15 } }, "Cargando historias\u2026")), status === "error" && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "80px 24px", color: "var(--ink-2)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, marginBottom: 16 } }, "\u{1F43E}"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 16 } }, t("No se pudieron cargar los cachorros entregados.", "We could not load the delivered puppies."))), status === "ok" && puppies.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "80px 24px", color: "var(--ink-2)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 56, marginBottom: 16 } }, "\u{1F436}"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--display)", fontSize: 28, fontWeight: 700, marginBottom: 12 } }, t("Pronto habr\xE1 historias aqu\xED", "Stories coming soon")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15 } }, t("Estamos construyendo esta secci\xF3n. \xA1Vuelve pronto!", "We are building this section. Check back soon!")), /* @__PURE__ */ React.createElement("a", { href: "/cachorros", style: { display: "inline-block", marginTop: 24, background: "var(--orange)", color: "#fff", padding: "12px 24px", borderRadius: 999, fontWeight: 700, textDecoration: "none" } }, t("Ver disponibles", "See available"))), status === "ok" && puppies.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 32 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 8 } }, puppies.length, t(" cachorros entregados", " puppies delivered")), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--display)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--ink)", margin: 0 } }, t("Familias que confiaron en nosotros", "Families who trusted us"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 } }, puppies.map((p) => /* @__PURE__ */ React.createElement(DeliveredCard, { key: p.id, p })))))));
}
// Vive en el hero pero dispara la galeria, que se monta despues: espera a que
// esta avise ("eg:listo") y entonces aparece con cuantas fotos hay.
function BotonPase(props) {
  var t = props.t;
  var s = React.useState(0); var total = s[0], setTotal = s[1];
  React.useEffect(function(){
    var mirar = function(){ if (window.__egAbrirPase) setTotal(window.__egTotal || 0); };
    mirar();
    window.addEventListener("eg:listo", mirar);
    return function(){ window.removeEventListener("eg:listo", mirar); };
  }, []);
  if (!total) return null;
  return /* @__PURE__ */ React.createElement("button", {
    onClick: function(){ if (window.__egAbrirPase) window.__egAbrirPase(); },
    style: {
      display: "inline-flex", alignItems: "center", gap: 10, marginTop: 26,
      minHeight: 48, padding: "0 22px", borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.10)",
      color: "#fff", font: "inherit", fontSize: 14.5, fontWeight: 700,
      cursor: "pointer", backdropFilter: "blur(4px)"
    }
  },
    /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", width: 14, height: 14, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
      /* @__PURE__ */ React.createElement("path", { d: "M8 5.5v13l10-6.5z" })),
    t("Ver las fotos", "See the photos"));
}

function EntregadosRoot() {
  const [lang, setLang] = React.useState(function(){ return (window.bpGetLang && window.bpGetLang()) || "es"; });
  React.useEffect(function(){ return window.bpOnLang ? window.bpOnLang(setLang) : void 0; }, []);
  React.useEffect(function(){ document.documentElement.lang = lang; }, [lang]);
  var setLangBoth = function(l){ setLang(l); try { localStorage.setItem("bpuppy-lang", l); } catch(e){} };
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang: lang, setLang: setLangBoth } }, /* @__PURE__ */ React.createElement(Header, { overDark: true }), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(CachorrosEntregados, null), /* @__PURE__ */ React.createElement(EntregasGaleria, null)), /* @__PURE__ */ React.createElement(Footer, null), /* @__PURE__ */ React.createElement(BackToTop, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(EntregadosRoot, null));

})();
