// bp-cookies.js — Aviso de cookies (2 pasos) + Consent Mode + analítica de visitas (standalone)
// Se usa en las páginas que NO cargan chrome.js (legales/utilitarias) y también convive con claude-bridge.js.
// Clave de consentimiento compatible con lo existente:
//   bp-cookie-consent = "all" | "essential"   (leída por claude-bridge.js: 'essential' = no analítica)
// Clave granular nueva (no rompe a los lectores viejos):
//   bp-cookie-prefs = JSON {analytics:bool, ads:bool, ts:number}
(function(){
  if (window.__bpCookieInit) return;   // evita doble init si conviven con chrome.js
  window.__bpCookieInit = 1;
  var SUPA_URL = "https://oqqwmcplljirbreowrll.supabase.co";
  var SUPA_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
  var KEY = "bp-cookie-consent";      // clave existente (compat)
  var PREFS = "bp-cookie-prefs";        // clave granular nueva
  // IDs de Google (mismos que claude-bridge.js / gtag inline en <head>).
  var GTAG_ID = "AW-11003229221";
  var GTAG_SRC = "https://bpuppy.us/metrics/gtag/js?id=" + GTAG_ID;

  function lang(){ try{ return (localStorage.getItem("bpuppy-lang")||"es").indexOf("en")===0 ? "en":"es"; }catch(e){ return "es"; } }
  function tt(es,en){ return lang()==="en" ? en : es; }
  function getConsent(){ try{ return localStorage.getItem(KEY)||""; }catch(e){ return ""; } }
  function setConsent(v){ try{ localStorage.setItem(KEY,v); }catch(e){} }
  function getPrefs(){ try{ var r=localStorage.getItem(PREFS); return r?JSON.parse(r):null; }catch(e){ return null; } }
  function setPrefs(p){ try{ localStorage.setItem(PREFS, JSON.stringify(p)); }catch(e){} }

  // ── Señal GPC (Global Privacy Control) ──────────────────────────────────
  // Si el navegador envía GPC=true, por defecto rechazamos lo no-esencial.
  function gpcOn(){ try{ return navigator.globalPrivacyControl === true; }catch(e){ return false; } }

  // ── Google Consent Mode v2 ──────────────────────────────────────────────
  // Marca por defecto TODO denegado lo antes posible. gtag() ya existe (definido en
  // el <head> de la página o en claude-bridge.js); si no, creamos el stub aquí.
  function gtag(){ try{ window.dataLayer = window.dataLayer || []; window.dataLayer.push(arguments); }catch(e){} }
  function consentDefaultDenied(){
    if (typeof window.gtag !== "function") { window.gtag = gtag; }
    try{
      window.gtag('consent','default',{
        ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied',
        analytics_storage:'denied', wait_for_update: 500
      });
    }catch(e){}
  }
  function consentUpdate(prefs){
    try{
      window.gtag('consent','update',{
        ad_storage: prefs.ads ? 'granted':'denied',
        ad_user_data: prefs.ads ? 'granted':'denied',
        ad_personalization: prefs.ads ? 'granted':'denied',
        analytics_storage: prefs.analytics ? 'granted':'denied'
      });
    }catch(e){}
  }
  // Carga la librería gtag SOLO cuando hay consentimiento de analítica o publicidad.
  // Gatea la carga de la librería, no solo el beacon.
  function loadGtag(){
    try{
      if (window.__bpGtagLoaded) return; window.__bpGtagLoaded = 1;
      if (document.querySelector('script[data-bp-gtag]')) return;
      // Si ya está cargada por el <head> inline no duplicamos.
      var already = false;
      try{
        var ex = document.getElementsByTagName('script');
        for (var i=0;i<ex.length;i++){ if((ex[i].src||"").indexOf('/metrics/gtag/js')>-1){ already=true; break; } }
      }catch(e){}
      if (already) return;
      var s = document.createElement('script');
      s.async = true; s.src = GTAG_SRC; s.setAttribute('data-bp-gtag','1');
      (document.head || document.documentElement).appendChild(s);
    }catch(e){}
  }

  // Aplica preferencias a Consent Mode + carga condicional de gtag.
  function applyPrefs(prefs){
    consentUpdate(prefs);
    if (prefs.analytics || prefs.ads) loadGtag();
  }

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

  // Guarda una decisión (all/essential + prefs granulares) y aplica efectos.
  function commit(prefs){
    var all = !!(prefs.analytics && prefs.ads);
    prefs.ts = Date.now();
    setPrefs(prefs);
    // Compat: 'all' solo si aceptó TODO; en cualquier otro caso 'essential'
    // (claude-bridge.js trata 'essential' como sin-analítica; sin analítica no contamos).
    setConsent(all ? "all" : "essential");
    applyPrefs(prefs);
    if (prefs.analytics) track();
  }

  function removeBanner(){ var b=document.getElementById("bp-cookie-banner"); if(b) b.remove(); }

  function privacyHref(){ return lang()==="en" ? "/privacy" : "/privacidad"; }
  function termsHref(){ return lang()==="en" ? "/terms" : "/terminos"; }

  function showBanner(){
    if(document.getElementById("bp-cookie-banner")) return;
    var wrap=document.createElement("div");
    wrap.id="bp-cookie-banner";
    wrap.setAttribute("role","dialog");
    wrap.setAttribute("aria-label", tt("Aviso de cookies","Cookie notice"));
    wrap.style.cssText="position:fixed;left:16px;right:16px;bottom:16px;max-width:440px;margin:0 auto;background:#2D2421;color:#fff;border-radius:14px;padding:14px 16px;box-shadow:0 12px 40px -8px rgba(0,0,0,.5);z-index:99999;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif";

    var consentNotice = tt(
      'Al hacer clic en «'+tt("Aceptar todo","Accept all")+'» aceptas nuestra <a href="'+privacyHref()+'" style="color:#FFB27A;text-decoration:underline">Política de Privacidad</a> y <a href="'+termsHref()+'" style="color:#FFB27A;text-decoration:underline">Términos</a>, y autorizas que BrightPuppy te contacte por correo, SMS y WhatsApp (incluidos mensajes automáticos) sobre tu solicitud y novedades. Pueden aplicar tarifas de datos/mensajes. Responde STOP para no recibir textos, o usa el enlace de baja en los correos. Esto no es condición para comprar.',
      'By clicking "'+tt("Aceptar todo","Accept all")+'" you agree to our <a href="'+privacyHref()+'" style="color:#FFB27A;text-decoration:underline">Privacy Policy</a> and <a href="'+termsHref()+'" style="color:#FFB27A;text-decoration:underline">Terms</a>, and consent to receive email, SMS and WhatsApp messages (including automated) from BrightPuppy about your request and updates. Message/data rates may apply. Reply STOP to opt out of texts, or use the unsubscribe link in emails. This is not a condition of purchase.'
    );

    wrap.innerHTML =
      // Cerrar (X) = rechazar no-esenciales (NO cuenta como aceptar)
      '<button id="bp-cookie-x" aria-label="'+tt("Cerrar (rechazar no esenciales)","Close (reject non-essential)")+'" style="position:absolute;top:6px;right:9px;background:transparent;border:none;color:rgba(255,255,255,.65);font-size:17px;line-height:1;cursor:pointer;padding:4px">&#10005;</button>'+
      // Paso 1 — texto
      '<div id="bp-cookie-step1-txt" style="font-size:11.5px;line-height:1.45;margin-bottom:11px;padding-right:20px">'+
        '<strong style="display:block;font-size:12.5px;margin-bottom:3px">'+tt("Cookies y privacidad","Cookies & privacy")+'</strong>'+
        tt("Usamos cookies esenciales para que el sitio funcione. Con tu permiso también usamos cookies de analítica y publicidad. Puedes aceptar, rechazar o elegir.",
           "We use essential cookies to make the site work. With your permission we also use analytics and advertising cookies. You can accept, reject, or choose.")+
        ' <a href="'+privacyHref()+'" style="color:#FFB27A;text-decoration:underline">'+tt("Política de Privacidad","Privacy Policy")+'</a>.'+
      '</div>'+
      // Paso 2 — panel de configuración (oculto por defecto)
      '<div id="bp-cookie-config" style="display:none;background:rgba(255,255,255,.07);border-radius:10px;padding:10px;margin-bottom:11px;font-size:11.5px">'+
        '<label style="display:flex;align-items:center;gap:9px;margin-bottom:8px;opacity:.7"><input type="checkbox" checked disabled style="width:15px;height:15px">'+tt("Esenciales (siempre activas)","Essential (always on)")+'</label>'+
        '<label style="display:flex;align-items:center;gap:9px;margin-bottom:8px;cursor:pointer"><input type="checkbox" id="bp-cookie-analytics" style="width:15px;height:15px;accent-color:#FF6B1A">'+tt("Analítica (medir visitas)","Analytics (measure visits)")+'</label>'+
        '<label style="display:flex;align-items:center;gap:9px;cursor:pointer"><input type="checkbox" id="bp-cookie-ads" style="width:15px;height:15px;accent-color:#FF6B1A">'+tt("Publicidad (anuncios y remarketing)","Advertising (ads & remarketing)")+'</label>'+
      '</div>'+
      // Aviso de consentimiento (canónico) — visible junto a los botones
      '<div id="bp-cookie-consent-notice" style="font-size:10px;line-height:1.4;color:rgba(255,255,255,.62);margin-bottom:10px;padding-right:2px">'+consentNotice+'</div>'+
      // Botonera
      '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end">'+
        '<button id="bp-cookie-reject" style="background:transparent;color:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.35);padding:7px 14px;border-radius:999px;font-size:12px;font-weight:600;cursor:pointer">'+tt("Rechazar","Reject")+'</button>'+
        '<button id="bp-cookie-cfg-btn" style="background:transparent;color:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.35);padding:7px 14px;border-radius:999px;font-size:12px;font-weight:600;cursor:pointer">'+tt("Configurar","Configure")+'</button>'+
        '<button id="bp-cookie-save" style="display:none;background:transparent;color:#fff;border:1px solid rgba(255,255,255,.55);padding:7px 14px;border-radius:999px;font-size:12px;font-weight:700;cursor:pointer">'+tt("Guardar preferencias","Save preferences")+'</button>'+
        '<button id="bp-cookie-accept" style="background:#FF6B1A;color:#fff;border:none;padding:8px 20px;border-radius:999px;font-size:13px;font-weight:800;cursor:pointer">'+tt("Aceptar todo","Accept all")+'</button>'+
      '</div>';
    document.body.appendChild(wrap);

    // Los toggles de Analítica/Publicidad empiezan APAGADOS por diseño (opt-in),
    // reforzado si GPC está activo.
    var acceptAll=function(){ commit({analytics:true, ads:true}); removeBanner(); };
    var rejectAll=function(){ commit({analytics:false, ads:false}); removeBanner(); };

    document.getElementById("bp-cookie-accept").onclick=acceptAll;
    document.getElementById("bp-cookie-reject").onclick=rejectAll;
    // Cerrar con la X = rechazar no-esenciales (NUNCA aceptar)
    document.getElementById("bp-cookie-x").onclick=rejectAll;

    document.getElementById("bp-cookie-cfg-btn").onclick=function(){
      document.getElementById("bp-cookie-config").style.display="block";
      // En el paso 2 solo mostramos Guardar + Aceptar todo (ocultamos Rechazar/Configurar)
      this.style.display="none";
      var rej=document.getElementById("bp-cookie-reject"); if(rej) rej.style.display="none";
      document.getElementById("bp-cookie-save").style.display="inline-block";
    };
    document.getElementById("bp-cookie-save").onclick=function(){
      var an=document.getElementById("bp-cookie-analytics");
      var ad=document.getElementById("bp-cookie-ads");
      commit({ analytics: !!(an&&an.checked), ads: !!(ad&&ad.checked) });
      removeBanner();
    };
  }

  function init(){
    // Consent Mode: por defecto denegado (lo antes posible en el ciclo de vida).
    consentDefaultDenied();
    var prefs = getPrefs();
    var c = getConsent();

    if (prefs){
      // Ya hay decisión granular guardada: aplícala.
      applyPrefs(prefs);
      if (prefs.analytics) track();
      return;
    }
    // Compat con decisiones viejas (solo bp-cookie-consent, sin prefs).
    if (c==="all"){ applyPrefs({analytics:true, ads:true}); track(); return; }
    if (c==="essential"){ applyPrefs({analytics:false, ads:false}); return; }

    // Sin decisión previa:
    // - Con GPC activo: respétalo => rechazo de no-esenciales por defecto (Consent Mode
    //   ya está denegado; reforzamos aplicando prefs rechazadas). Aún mostramos el
    //   banner para que el usuario pueda ampliar el permiso si lo desea.
    // - Sin GPC: mostramos el banner y no cargamos nada hasta que elija.
    if (gpcOn()) applyPrefs({analytics:false, ads:false});
    showBanner();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init);
  else init();
})();
