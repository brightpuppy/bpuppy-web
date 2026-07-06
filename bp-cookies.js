// bp-cookies.js — Banner simple (Aceptar / Ver Políticas) + pop-up de políticas con Rechazar + Consent Mode + analítica de visitas (standalone)
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

  // ── Pop-up de Políticas de cookies (paso 2): explica y deja elegir/rechazar ──
  function policyBodyHtml(){
    function cat(title, desc, right){
      return '<div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start;padding:11px 13px;border-bottom:1px solid #f1ece8">'+
        '<div><div style="font-weight:700;font-size:13px;color:#2D2421">'+title+'</div><div style="font-size:11.5px;color:#7a716b;line-height:1.4">'+desc+'</div></div>'+right+'</div>';
    }
    var chk=function(id){ return '<input type="checkbox" id="'+id+'" style="width:17px;height:17px;accent-color:#FF6B1A;margin-top:2px;flex-shrink:0;cursor:pointer">'; };
    return ''+
      '<p style="margin:0 0 12px;font-size:13px;line-height:1.55;color:#3a322e">'+
        tt('Las cookies son pequeños archivos que el sitio guarda en tu dispositivo. Usamos cookies esenciales para que funcione y, con tu permiso, cookies de analítica y publicidad. Elige qué permites:',
           'Cookies are small files the site stores on your device. We use essential cookies to make it work and, with your permission, analytics and advertising cookies. Choose what you allow:')+
      '</p>'+
      '<div style="border:1px solid #ece7e3;border-radius:12px;overflow:hidden;margin-bottom:12px">'+
        cat(tt('Esenciales','Essential'),
            tt('Necesarias para que el sitio funcione (sesión, seguridad, idioma).','Needed for the site to work (session, security, language).'),
            '<span style="font-size:11px;font-weight:800;color:#16A34A;white-space:nowrap;margin-top:2px">'+tt('Siempre','Always on')+'</span>')+
        '<label style="cursor:pointer;display:block">'+cat(tt('Analítica','Analytics'), tt('Medir visitas para mejorar el sitio.','Measure visits to improve the site.'), chk('bp-cookie-analytics'))+'</label>'+
        '<label style="cursor:pointer;display:block">'+cat(tt('Publicidad','Advertising'), tt('Anuncios y remarketing (Google).','Ads & remarketing (Google).'), chk('bp-cookie-ads')).replace('border-bottom:1px solid #f1ece8','border-bottom:none')+'</label>'+
      '</div>'+
      '<p style="margin:0;font-size:11px;line-height:1.5;color:#9a918b">'+
        tt('Respetamos la señal de privacidad de tu navegador (GPC) y puedes cambiar tu decisión cuando quieras. Más detalles en nuestra ',
           'We honor your browser\'s privacy signal (GPC) and you can change your choice anytime. More details in our ')+
        '<a href="'+privacyHref()+'" style="color:#FF6B1A;text-decoration:underline">'+tt('Política de Privacidad','Privacy Policy')+'</a>.'+
      '</p>';
  }

  function closePolicyModal(){ var m=document.getElementById("bp-cookie-modal"); if(m) m.remove(); }

  function showPolicyModal(){
    if(document.getElementById("bp-cookie-modal")) return;
    var prefs=getPrefs()||{};
    var ov=document.createElement("div");
    ov.id="bp-cookie-modal";
    ov.setAttribute("role","dialog"); ov.setAttribute("aria-modal","true");
    ov.setAttribute("aria-label", tt("Políticas de cookies","Cookie policy"));
    ov.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:100000;display:flex;align-items:center;justify-content:center;padding:16px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif";
    ov.innerHTML=
      '<div style="background:#fff;color:#2D2421;border-radius:18px;max-width:520px;width:100%;max-height:88vh;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.4);display:flex;flex-direction:column">'+
        '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:15px 18px;background:#2D2421;color:#fff">'+
          '<div style="font-weight:800;font-size:15px">'+tt("Políticas de cookies","Cookie policy")+'</div>'+
          '<button id="bp-cookie-modal-x" aria-label="'+tt("Cerrar","Close")+'" style="background:rgba(255,255,255,.2);border:none;color:#fff;width:32px;height:32px;border-radius:50%;font-size:17px;line-height:1;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;padding:0">&#10005;</button>'+
        '</div>'+
        '<div style="padding:16px 18px;overflow:auto">'+policyBodyHtml()+'</div>'+
        '<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;padding:12px 18px;border-top:1px solid #efeae6">'+
          '<button id="bp-cookie-reject" style="background:#fff;color:#2D2421;border:1px solid #d9d2cc;padding:8px 15px;border-radius:999px;font-size:12.5px;font-weight:700;cursor:pointer">'+tt("Rechazar","Reject")+'</button>'+
          '<button id="bp-cookie-save" style="background:#fff;color:#2D2421;border:1px solid #d9d2cc;padding:8px 15px;border-radius:999px;font-size:12.5px;font-weight:700;cursor:pointer">'+tt("Guardar","Save")+'</button>'+
          '<button id="bp-cookie-accept-all" style="background:#FF6B1A;color:#fff;border:none;padding:8px 18px;border-radius:999px;font-size:13px;font-weight:800;cursor:pointer">'+tt("Aceptar todo","Accept all")+'</button>'+
        '</div>'+
      '</div>';
    document.body.appendChild(ov);
    try{ if(prefs.analytics){ var a=ov.querySelector("#bp-cookie-analytics"); if(a) a.checked=true; } if(prefs.ads){ var d=ov.querySelector("#bp-cookie-ads"); if(d) d.checked=true; } }catch(e){}
    ov.querySelector("#bp-cookie-modal-x").onclick=closePolicyModal;
    // Cerrar tocando el fondo — solo si el gesto empezó Y terminó en el fondo (evita cierres por arrastre o clics fantasma)
    var _downOnOv=false;
    ov.addEventListener("mousedown",function(e){ _downOnOv=(e.target===ov); });
    ov.addEventListener("click",function(e){ if(e.target===ov && _downOnOv) closePolicyModal(); _downOnOv=false; });
    ov.querySelector("#bp-cookie-reject").onclick=function(){ commit({analytics:false, ads:false}); closePolicyModal(); removeBanner(); };
    ov.querySelector("#bp-cookie-accept-all").onclick=function(){ commit({analytics:true, ads:true}); closePolicyModal(); removeBanner(); };
    ov.querySelector("#bp-cookie-save").onclick=function(){
      var an=ov.querySelector("#bp-cookie-analytics"), ad=ov.querySelector("#bp-cookie-ads");
      commit({ analytics: !!(an&&an.checked), ads: !!(ad&&ad.checked) });
      closePolicyModal(); removeBanner();
    };
  }
  window.bpShowCookiePolicy = showPolicyModal;  // por si se quiere abrir desde un enlace "Preferencias de cookies"

  // ── Banner de entrada (simple): mensaje + Aceptar + Ver Políticas de cookies ──
  function showBanner(){
    if(document.getElementById("bp-cookie-banner")) return;
    var wrap=document.createElement("div");
    wrap.id="bp-cookie-banner";
    wrap.setAttribute("role","dialog");
    wrap.setAttribute("aria-label", tt("Aviso de cookies","Cookie notice"));
    wrap.style.cssText="position:fixed;left:16px;right:16px;bottom:16px;max-width:430px;margin:0 auto;background:#2D2421;color:#fff;border-radius:14px;padding:15px 16px 14px;box-shadow:0 12px 40px -8px rgba(0,0,0,.5);z-index:99999;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif";
    wrap.innerHTML =
      // X = cerrar sin aceptar (solo esenciales; NUNCA cuenta como aceptar)
      '<button id="bp-cookie-x" aria-label="'+tt("Cerrar (solo esenciales)","Close (essential only)")+'" style="position:absolute;top:7px;right:10px;background:transparent;border:none;color:rgba(255,255,255,.6);font-size:16px;line-height:1;cursor:pointer;padding:4px">&#10005;</button>'+
      '<div style="font-size:12.5px;line-height:1.5;margin-bottom:12px;padding-right:16px">'+
        tt("En este sitio web recolectamos cookies para mejorar la experiencia del cliente.",
           "On this website we use cookies to improve the customer experience.")+
      '</div>'+
      '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end">'+
        '<button id="bp-cookie-view" style="background:transparent;color:rgba(255,255,255,.9);border:1px solid rgba(255,255,255,.4);padding:8px 15px;border-radius:999px;font-size:12.5px;font-weight:600;cursor:pointer">'+tt("Ver Políticas de cookies","View cookie policy")+'</button>'+
        '<button id="bp-cookie-accept" style="background:#FF6B1A;color:#fff;border:none;padding:9px 22px;border-radius:999px;font-size:13px;font-weight:800;cursor:pointer">'+tt("Aceptar","Accept")+'</button>'+
      '</div>';
    document.body.appendChild(wrap);

    document.getElementById("bp-cookie-accept").onclick=function(){ commit({analytics:true, ads:true}); removeBanner(); };
    document.getElementById("bp-cookie-x").onclick=function(){ commit({analytics:false, ads:false}); removeBanner(); };
    document.getElementById("bp-cookie-view").onclick=function(){ showPolicyModal(); };
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
