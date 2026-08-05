const EN = {
  title: "Available Puppies · BrightPuppy",
  desc: "Handpicked puppies just for you — photos, prices and payment options.",
};
const SUPA = "https://oqqwmcplljirbreowrll.supabase.co";
const SUPA_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
const SITE = "https://bpuppy.us";
class SetText { constructor(t){this.t=t;} element(el){ el.setInnerContent(this.t);} }
class SetAttr { constructor(n,v){this.n=n;this.v=v;} element(el){ el.setAttribute(this.n,this.v);} }
function esc(s){ return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }
function smsRedirectPage(to, body){
  const num = String(to||"").replace(/[^\d]/g,"");
  const href = "sms:" + (num?("+"+num):"") + "&body=" + encodeURIComponent(String(body||""));
  const j = JSON.stringify(href);
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Abrir Mensajes…</title>`+
    `<style>body{font-family:-apple-system,system-ui,'Segoe UI',Arial,sans-serif;background:#FAF7F2;color:#2D2421;margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px}`+
    `.c{max-width:340px}h1{font-size:19px;font-weight:800;margin:0 0 6px}h1 span{color:#F58220}p{color:#6B5A4E;margin:0 0 18px;line-height:1.5}`+
    `a{display:inline-block;padding:15px 28px;border-radius:999px;background:#F58220;color:#fff;text-decoration:none;font-weight:700;font-size:16px}</style></head>`+
    `<body><div class="c"><h1>Bright<span>Puppy</span></h1><p>Abriendo tu app de Mensajes con el texto listo… si no abre solo, toca el botón.</p>`+
    `<a id="go" href=${j}>Abrir Mensajes</a></div>`+
    `<script>try{location.href=${j};}catch(e){}setTimeout(function(){try{location.href=${j};}catch(e){}},400);</script></body></html>`;
}
async function fetchNews(query){
  try{
    const r = await fetch(SUPA + "/rest/v1/news_posts?" + query, { headers: { "apikey": SUPA_ANON, "Authorization": "Bearer " + SUPA_ANON } });
    if(!r.ok) return null;
    return await r.json();
  }catch(e){ return null; }
}
function fmtDate(iso, lang){
  try{ const d = new Date(iso); return d.toLocaleDateString(lang==="en"?"en-US":"es-ES", { year:"numeric", month:"long", day:"numeric" }); }catch(e){ return String(iso||"").slice(0,10); }
}
function newsArticlePage(p){
  const lang = (p.lang==="en") ? "en" : "es";
  const canonical = SITE + "/media/noticias/" + encodeURIComponent(p.slug);
  const ttl = p.seo_title || p.title || "Noticias";
  const desc = p.seo_desc || p.excerpt || "";
  const cover = p.cover_url || (SITE + "/assets/og-brand.jpg");
  const dateStr = p.published_at ? fmtDate(p.published_at, lang) : "";
  const tags = Array.isArray(p.tags) ? p.tags : [];
  const ld = {
    "@context":"https://schema.org", "@type":"NewsArticle",
    "headline": p.title || "", "description": desc,
    "image": cover ? [cover] : [],
    "datePublished": p.published_at || p.created_at || null,
    "dateModified": p.updated_at || p.published_at || null,
    "inLanguage": lang,
    "author": { "@type":"Organization", "name":"BrightPuppy", "url": SITE },
    "publisher": { "@type":"Organization", "name":"BrightPuppy", "logo": { "@type":"ImageObject", "url": SITE + "/assets/logo-clean.webp" } },
    "mainEntityOfPage": { "@type":"WebPage", "@id": canonical }
  };
  const back = lang==="en" ? "News" : "Noticias";
  const home = lang==="en" ? "Back to BrightPuppy" : "Volver a BrightPuppy";
  const SECL = { estrella_del_dia:["Estrella del día","Star of the day"], estudios:["Estudios","Studies"], familias:["Familias","Families"], famosos:["Famosos","Famous"], curiosidades:["Curiosidades","Curiosities"], salud:["Salud","Wellness"], rescate:["Rescates","Rescues"], mundo:["El mundo","The world"], general:["General","General"] };
  const secLab = SECL[p.section] ? (lang==="en"?SECL[p.section][1]:SECL[p.section][0]) : back;
  const readTxt = p.read_minutes ? (p.read_minutes + (lang==="en"?" min read":" min de lectura")) : "";
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">`+
    `<title>${esc(ttl)} · BrightPuppy</title>`+
    `<meta name="description" content="${esc(desc)}">`+
    `<link rel="canonical" href="${esc(canonical)}">`+
    `<meta property="og:type" content="article"><meta property="og:site_name" content="BrightPuppy">`+
    `<meta property="og:title" content="${esc(ttl)}"><meta property="og:description" content="${esc(desc)}">`+
    `<meta property="og:url" content="${esc(canonical)}"><meta property="og:image" content="${esc(cover)}">`+
    `<meta property="article:published_time" content="${esc(p.published_at||"")}">`+
    `<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(ttl)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${esc(cover)}">`+
    `<script type="application/ld+json">${JSON.stringify(ld)}</script>`+
    `<style>*{box-sizing:border-box}body{font-family:Georgia,'Times New Roman',serif;background:#FAF7F2;color:#2D2421;margin:0;line-height:1.7}`+
    `.top{font-family:-apple-system,system-ui,'Segoe UI',Arial,sans-serif;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 22px;border-bottom:1px solid #ece4d8;position:sticky;top:0;background:rgba(250,247,242,.94);backdrop-filter:blur(6px)}`+
    `.brand{font-weight:800;font-size:18px;text-decoration:none;color:#2D2421}.brand span{color:#F58220}`+
    `.top a.back{font-family:inherit;font-size:13px;font-weight:700;color:#F58220;text-decoration:none}`+
    `main{max-width:720px;margin:0 auto;padding:34px 22px 70px}`+
    `.kick{font-family:-apple-system,system-ui,Arial,sans-serif;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#C2521E}`+
    `h1{font-size:clamp(27px,5vw,40px);line-height:1.15;margin:10px 0 8px;letter-spacing:-.01em}`+
    `.meta{font-family:-apple-system,system-ui,Arial,sans-serif;font-size:13px;color:#8a7a6c;margin-bottom:22px}`+
    `.cover{width:100%;border-radius:16px;margin:6px 0 26px;display:block}`+
    `.body{font-size:18px}.body p{margin:0 0 18px}.body h2{font-size:24px;margin:30px 0 10px}.body h3{font-size:20px;margin:24px 0 8px}.body img{max-width:100%;border-radius:12px}.body a{color:#C2521E}`+
    `.body ul,.body ol{padding-left:22px;margin:0 0 18px}`+
    `.tags{font-family:-apple-system,system-ui,Arial,sans-serif;margin:30px 0 0;display:flex;gap:8px;flex-wrap:wrap}`+
    `.tag{font-size:12px;font-weight:700;color:#6B5A4E;background:#f0e8dc;border-radius:999px;padding:4px 11px}`+
    `.foot{font-family:-apple-system,system-ui,Arial,sans-serif;text-align:center;margin-top:44px;padding-top:24px;border-top:1px solid #ece4d8}`+
    `.foot a{display:inline-block;background:#2D2421;color:#fff;text-decoration:none;font-weight:800;font-size:14px;padding:12px 26px;border-radius:999px}</style></head>`+
    `<body><div class="top"><a class="brand" href="${SITE}">Bright<span>Puppy</span></a><a class="back" href="${SITE}/media">← ${back}</a></div>`+
    `<main><article>`+
    `<div class="kick">${back}</div>`+
    `<h1>${esc(p.title||"")}</h1>`+
    `<div class="meta">${dateStr?esc(dateStr):""}${p.author?(" · "+esc(p.author)):""}</div>`+
    (p.cover_url?`<img class="cover" src="${esc(p.cover_url)}" alt="${esc(p.title||"")}">`:"")+
    `<div class="body">${p.body||("<p>"+esc(p.excerpt||"")+"</p>")}</div>`+
    (tags.length?`<div class="tags">${tags.map(function(t){return '<span class="tag">'+esc(t)+'</span>';}).join("")}</div>`:"")+
    `<div class="foot"><a href="${SITE}/media">${home}</a></div>`+
    `</article></main></body></html>`;
}
function notFoundPage(){
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Noticia no encontrada · BrightPuppy</title><meta name="robots" content="noindex"><style>body{font-family:-apple-system,system-ui,Arial,sans-serif;background:#FAF7F2;color:#2D2421;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;margin:0}a{color:#F58220;font-weight:700;text-decoration:none}</style></head><body><div><h1>Esta noticia no está disponible</h1><p><a href="`+SITE+`/media">Ver todas las noticias →</a></p></div></body></html>`;
}
export default {
  async fetch(request, env) {
    const url0 = new URL(request.url);
    // Canonical host: www.* -> apex, para que la sesion (localStorage) viva siempre en el mismo origen.
    if (url0.hostname.startsWith("www.")) {
      url0.hostname = url0.hostname.slice(4);
      return Response.redirect(url0.toString(), 301);
    }
    const p0 = url0.pathname.replace(/\/+$/,"");
    if (p0 === "/sms") {
      return new Response(smsRedirectPage(url0.searchParams.get("to"), url0.searchParams.get("body")),
        { headers: { "content-type":"text/html; charset=utf-8", "cache-control":"no-store" } });
    }
    // Noticias: página SSR con SEO por artículo (/media/noticias/<slug> o /noticias/<slug>)
    const nm = p0.match(/^\/(?:media\/)?noticias\/([^\/]+)$/i);
    if (nm) {
      const slug = decodeURIComponent(nm[1]).toLowerCase();
      const rows = await fetchNews("slug=eq." + encodeURIComponent(slug) + "&status=eq.published&select=*&limit=1");
      const post = rows && rows.length ? rows[0] : null;
      if (!post) return new Response(notFoundPage(), { status: 404, headers: { "content-type":"text/html; charset=utf-8", "cache-control":"public, max-age=120" } });
      return new Response(newsArticlePage(post), { headers: { "content-type":"text/html; charset=utf-8", "cache-control":"public, max-age=300, s-maxage=600" } });
    }
    // Sitemap de noticias (para Google / indexación)
    if (p0 === "/sitemap-news.xml") {
      const rows = await fetchNews("status=eq.published&select=slug,updated_at,published_at&order=published_at.desc&limit=1000") || [];
      const urls = rows.map(function(r){ return "<url><loc>"+SITE+"/media/noticias/"+esc(r.slug)+"</loc><lastmod>"+esc(String(r.updated_at||r.published_at||"").slice(0,10))+"</lastmod></url>"; }).join("");
      const xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls+'</urlset>';
      return new Response(xml, { headers: { "content-type":"application/xml; charset=utf-8", "cache-control":"public, max-age=600" } });
    }
    const res = await env.ASSETS.fetch(request);
    try {
      const url = new URL(request.url);
      const p = url.pathname.replace(/\/+$/,"");
      if (p !== "/catalogo" && p !== "/catalogo.html") return res;
      const lang = ((url.searchParams.get("lang")||"").toLowerCase()==="en") ? "en":"es";
      const ct = (res.headers.get("content-type")||"").toLowerCase();
      if (lang!=="en" || !ct.includes("text/html")) return res;
      return new HTMLRewriter()
        .on("title", new SetText(EN.title))
        .on('meta[property="og:title"]', new SetAttr("content", EN.title))
        .on('meta[name="twitter:title"]', new SetAttr("content", EN.title))
        .on('meta[property="og:description"]', new SetAttr("content", EN.desc))
        .on('meta[name="description"]', new SetAttr("content", EN.desc))
        .on('meta[name="twitter:description"]', new SetAttr("content", EN.desc))
        .on("html", new SetAttr("lang","en"))
        .transform(res);
    } catch(e){ return res; }
  }
};
