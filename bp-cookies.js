// bp-cookies.js — Aviso de cookies + analítica de visitas (standalone)
// Se usa en las páginas que NO cargan chrome.js (legales/utilitarias).
// Mismo comportamiento y misma clave de consentimiento que el bloque de chrome.js.
(function(){
  if (window.__bpCookieInit) return;   // evita doble init si conviven con chrome.js
  window.__bpCookieInit = 1;
  var SUPA_URL = "https://oqqwmcplljirbreowrll.supabase.co";
  var SUPA_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
  var KEY = "bp-cookie-consent";
  function lang(){ try{ return (localStorage.getItem("bpuppy-lang")||"es").indexOf("en")===0 ? "en":"es"; }catch(e){ return "es"; } }
  function tt(es,en){ return lang()==="en" ? en : es; }
  function getConsent(){ try{ return localStorage.getItem(KEY)||""; }catch(e){ return ""; } }
  function setConsent(v){ try{ localStorage.setItem(KEY,v); }catch(e){} }

  function track(){
    if(getConsent()!=="all") return;
    try{ if(sessionStorage.getItem("bp-visit-logged")) return; sessionStorage.setItem("bp-visit-logged","1"); }catch(e){}
    var body = {
      page: location.pathname, landing_path: location.pathname,
      referrer: document.referrer || "", language: navigator.language || "",
      screen: (window.screen ? (screen.width+"x"+screen.height) : ""),
      site: location.hostname, ua: navigator.userAgent, consent: "all"
    };
    try{
      fetch(SUPA_URL+"/functions/v1/track_visit", {
        method:"POST", keepalive:true,
        headers:{ "Content-Type":"application/json", "apikey":SUPA_ANON, "Authorization":"Bearer "+SUPA_ANON },
        body: JSON.stringify(body)
      }).catch(function(){});
    }catch(e){}
  }

  function removeBanner(){ var b=document.getElementById("bp-cookie-banner"); if(b) b.remove(); }
  function showBanner(){
    if(document.getElementById("bp-cookie-banner")) return;
    var wrap=document.createElement("div");
    wrap.id="bp-cookie-banner";
    wrap.style.cssText="position:fixed;left:16px;right:16px;bottom:16px;max-width:430px;margin:0 auto;background:#2D2421;color:#fff;border-radius:14px;padding:14px 16px;box-shadow:0 12px 40px -8px rgba(0,0,0,.5);z-index:99999;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif";
    wrap.innerHTML =
      '<button id="bp-cookie-x" aria-label="Cerrar" style="position:absolute;top:6px;right:9px;background:transparent;border:none;color:rgba(255,255,255,.65);font-size:17px;line-height:1;cursor:pointer;padding:4px">✕</button>'+
      '<div style="font-size:11.5px;line-height:1.45;margin-bottom:11px;padding-right:20px">'+
        '<strong style="display:block;font-size:12.5px;margin-bottom:3px">🍪 '+tt("Cookies","Cookies")+'</strong>'+
        tt("Usamos cookies para mejorar tu experiencia y medir el tráfico del sitio.",
           "We use cookies to improve your experience and measure site traffic.")+
      '</div>'+
      '<div id="bp-cookie-config" style="display:none;background:rgba(255,255,255,.07);border-radius:10px;padding:10px;margin-bottom:11px;font-size:11.5px">'+
        '<label style="display:flex;align-items:center;gap:9px;margin-bottom:7px;opacity:.7"><input type="checkbox" checked disabled style="width:15px;height:15px">'+tt("Esenciales (siempre activas)","Essential (always on)")+'</label>'+
        '<label style="display:flex;align-items:center;gap:9px;cursor:pointer"><input type="checkbox" id="bp-cookie-analytics" checked style="width:15px;height:15px;accent-color:#FF6B1A">'+tt("Analíticas (medir visitas)","Analytics (measure visits)")+'</label>'+
      '</div>'+
      '<div style="display:flex;gap:8px;align-items:center;justify-content:flex-end">'+
        '<button id="bp-cookie-cfg-btn" style="background:transparent;color:rgba(255,255,255,.65);border:none;padding:2px 6px;font-size:10.5px;font-weight:500;cursor:pointer;text-decoration:underline">'+tt("Configurar","Configure")+'</button>'+
        '<button id="bp-cookie-save" style="display:none;background:transparent;color:#fff;border:1px solid rgba(255,255,255,.4);padding:6px 13px;border-radius:999px;font-size:12px;font-weight:600;cursor:pointer">'+tt("Guardar","Save")+'</button>'+
        '<button id="bp-cookie-accept" style="background:#FF6B1A;color:#fff;border:none;padding:8px 22px;border-radius:999px;font-size:13px;font-weight:800;cursor:pointer">'+tt("Aceptar","Accept")+'</button>'+
      '</div>';
    document.body.appendChild(wrap);
    var acceptAll=function(){ setConsent("all"); removeBanner(); track(); };
    document.getElementById("bp-cookie-accept").onclick=acceptAll;
    document.getElementById("bp-cookie-x").onclick=acceptAll;   // cerrar = aceptar
    document.getElementById("bp-cookie-cfg-btn").onclick=function(){
      document.getElementById("bp-cookie-config").style.display="block";
      this.style.display="none";
      document.getElementById("bp-cookie-save").style.display="inline-block";
    };
    document.getElementById("bp-cookie-save").onclick=function(){
      var an=document.getElementById("bp-cookie-analytics");
      var v=(an&&an.checked)?"all":"essential";
      setConsent(v); removeBanner(); if(v==="all") track();
    };
  }

  function init(){
    var c=getConsent();
    if(c==="all"){ track(); }
    else if(!c){ showBanner(); }
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init);
  else init();
})();
