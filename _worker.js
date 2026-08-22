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
// Razas que sabemos reconocer en el texto de una noticia: si sale una, la noticia
// enlaza a su pagina de raza. (Sin foto: Luis no quiere repetir las imagenes que ya
// usa en otras paginas del sitio.)
const RAZAS = [
  { p:"german-shepherd", es:"Pastor Alemán", en:"German Shepherd", k:["pastor aleman","german shepherd","ovejero aleman"] },
  { p:"labrador-retriever", es:"Labrador Retriever", en:"Labrador Retriever", k:["labrador"] },
  { p:"golden-retriever", es:"Golden Retriever", en:"Golden Retriever", k:["golden retriever","golden"] },
  { p:"french-bulldog", es:"Bulldog Francés", en:"French Bulldog", k:["bulldog frances","frenchie","french bulldog"] },
  { p:"english-bulldog", es:"Bulldog Inglés", en:"English Bulldog", k:["bulldog ingles","english bulldog"] },
  { p:"yorkshire-terrier", es:"Yorkshire Terrier", en:"Yorkshire Terrier", k:["yorkshire","yorkie"] },
  { p:"chihuahua", es:"Chihuahua", en:"Chihuahua", k:["chihuahua"] },
  { p:"siberian-husky", es:"Husky Siberiano", en:"Siberian Husky", k:["husky"] },
  { p:"beagle", es:"Beagle", en:"Beagle", k:["beagle"] },
  { p:"rottweiler", es:"Rottweiler", en:"Rottweiler", k:["rottweiler"] },
  { p:"boxer", es:"Boxer", en:"Boxer", k:["boxer"] },
  { p:"dachshund", es:"Dachshund", en:"Dachshund", k:["dachshund","salchicha","teckel"] },
  { p:"pug", es:"Pug", en:"Pug", k:["pug","carlino"] },
  { p:"border-collie", es:"Border Collie", en:"Border Collie", k:["border collie"] },
  { p:"shih-tzu", es:"Shih Tzu", en:"Shih Tzu", k:["shih tzu"] },
  { p:"maltese", es:"Maltés", en:"Maltese", k:["maltes","maltese"] },
  { p:"doberman-pinscher", es:"Doberman", en:"Doberman", k:["doberman"] },
  { p:"great-dane", es:"Gran Danés", en:"Great Dane", k:["gran danes","great dane"] },
  { p:"saint-bernard", es:"San Bernardo", en:"Saint Bernard", k:["san bernardo","saint bernard"] },
  { p:"samoyed", es:"Samoyedo", en:"Samoyed", k:["samoyedo","samoyed"] },
  { p:"akita", es:"Akita", en:"Akita", k:["akita"] },
  { p:"shiba-inu", es:"Shiba Inu", en:"Shiba Inu", k:["shiba"] },
  { p:"bernese-mountain-dog", es:"Boyero de Berna", en:"Bernese Mountain Dog", k:["boyero de berna","bernese"] },
  { p:"australian-shepherd", es:"Pastor Australiano", en:"Australian Shepherd", k:["pastor australiano","australian shepherd"] },
  { p:"belgian-malinois", es:"Malinois Belga", en:"Belgian Malinois", k:["malinois"] },
  { p:"cocker-spaniel", es:"Cocker Spaniel", en:"Cocker Spaniel", k:["cocker"] },
  { p:"dalmatian", es:"Dálmata", en:"Dalmatian", k:["dalmata","dalmatian"] },
  { p:"chow-chow", es:"Chow Chow", en:"Chow Chow", k:["chow chow"] },
  { p:"pomeranian", es:"Pomerania", en:"Pomeranian", k:["pomerania","pomeranian"] },
  { p:"pembroke-corgi", es:"Corgi", en:"Corgi", k:["corgi"] },
  { p:"boston-terrier", es:"Boston Terrier", en:"Boston Terrier", k:["boston terrier"] },
  { p:"jack-russell", es:"Jack Russell", en:"Jack Russell", k:["jack russell"] },
  { p:"miniature-schnauzer", es:"Schnauzer Miniatura", en:"Miniature Schnauzer", k:["schnauzer"] },
  { p:"alaskan-malamute", es:"Malamute de Alaska", en:"Alaskan Malamute", k:["malamute"] },
  { p:"weimaraner", es:"Weimaraner", en:"Weimaraner", k:["weimaraner"] },
  { p:"havanese", es:"Bichón Habanero", en:"Havanese", k:["habanero","havanese"] },
  { p:"bichon-frise", es:"Bichón Frisé", en:"Bichon Frise", k:["bichon"] },
  { p:"basset-hound", es:"Basset Hound", en:"Basset Hound", k:["basset"] },
  { p:"cavalier-kcs", es:"Cavalier King Charles", en:"Cavalier King Charles", k:["cavalier"] },
  { p:"toy-poodle", es:"Poodle Toy", en:"Toy Poodle", k:["poodle","caniche"] }
];
function sinTildes(s){ return String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,""); }
function razaDe(p){
  const txt = sinTildes(String(p.title||"") + " " + String(p.excerpt||"") + " " + String(p.body||""));
  let mejor = null, mejorPos = 1e9;
  for(const r of RAZAS){
    for(const k of r.k){
      const i = txt.indexOf(sinTildes(k));
      if(i >= 0 && i < mejorPos){ mejor = r; mejorPos = i; }
    }
  }
  return mejor;
}
function razaUrl(r, lang){
  return SITE + (lang === "en" ? ("/" + r.p + "-puppies-florida") : ("/cachorros-" + r.p + "-florida"));
}

function newsArticlePage(p, relacionadas){
  const lang = (p.lang==="en") ? "en" : "es";
  const en = lang === "en";
  const canonical = SITE + "/media/noticias/" + encodeURIComponent(p.slug);
  const ttl = p.seo_title || p.title || "Noticias";
  const desc = p.seo_desc || p.excerpt || "";
  const raza = razaDe(p);
  const heroImg = p.cover_url || "";
  const cover = heroImg || (SITE + "/assets/og-brand.jpg");
  const dateStr = p.published_at ? fmtDate(p.published_at, lang) : "";
  const tags = Array.isArray(p.tags) ? p.tags : [];
  const rel = Array.isArray(relacionadas) ? relacionadas : [];
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
  const back = en ? "News" : "Noticias";
  const home = en ? "See all news" : "Ver todas las noticias";
  const SECL = { estrella_del_dia:["Estrella del día","Star of the day"], estudios:["Estudios","Studies"], familias:["Familias","Families"], famosos:["Famosos","Famous"], curiosidades:["Curiosidades","Curiosities"], salud:["Salud","Wellness"], rescate:["Rescates","Rescues"], mundo:["Mundo","World"] };
  const secLab = SECL[p.section] ? (en?SECL[p.section][1]:SECL[p.section][0]) : back;
  const readTxt = p.read_minutes ? (p.read_minutes + (en?" min read":" min de lectura")) : "";
  const metaLinea = [dateStr, readTxt, p.author||""].filter(Boolean).map(esc).join(" &middot; ");

  const bloqueFuente = (p.source_url && p.source_name)
    ? '<div class="fuente">' + (en?"Source":"Fuente") + ': <a href="' + esc(p.source_url) + '" target="_blank" rel="noopener nofollow">' + esc(p.source_name) + '</a></div>'
    : "";

  const bloqueRaza = raza
    ? '<aside class="raza"><div class="raza-k">' + (en?"In this story":"En esta historia") + '</div>' +
      '<div class="raza-n">' + esc(en?raza.en:raza.es) + '</div>' +
      '<a href="' + esc(razaUrl(raza, lang)) + '">' +
      (en ? ("Learn more about the " + esc(raza.en)) : ("Conoce m&aacute;s sobre el " + esc(raza.es))) + ' &rarr;</a></aside>'
    : "";

  const bloqueRel = rel.length
    ? '<section class="rel"><h2>' + (en?"Keep reading":"Sigue leyendo") + '</h2><div class="rel-g">' +
      rel.map(function(r){
        const rs = SECL[r.section] ? (en?SECL[r.section][1]:SECL[r.section][0]) : back;
        return '<a class="rel-c" href="' + SITE + '/media/noticias/' + encodeURIComponent(r.slug) + '">' +
               '<div class="rel-s">' + esc(rs) + '</div><div class="rel-t">' + esc(r.title||"") + '</div></a>';
      }).join("") + '</div></section>'
    : "";

  const css = '*{box-sizing:border-box}' +
    'body{font-family:"Source Serif 4",Georgia,"Times New Roman",serif;background:#fff;color:#191510;margin:0;line-height:1.72;-webkit-font-smoothing:antialiased}' +
    '.top{font-family:"Plus Jakarta Sans",-apple-system,system-ui,Arial,sans-serif;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:15px 22px;border-bottom:1px solid #e8e2d8;position:sticky;top:0;background:rgba(255,255,255,.94);backdrop-filter:blur(8px);z-index:5}' +
    '.brand{font-weight:800;font-size:18px;text-decoration:none;color:#191510}.brand span{color:#F58220}' +
    '.top a.back{font-size:13px;font-weight:700;color:#F58220;text-decoration:none}' +
    'main{max-width:700px;margin:0 auto;padding:40px 22px 72px}' +
    '.kick{font-family:"Plus Jakarta Sans",Arial,sans-serif;font-size:11.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#C2521E}' +
    'h1{font-size:clamp(30px,5.4vw,46px);line-height:1.12;margin:12px 0 10px;letter-spacing:-.018em;font-weight:700}' +
    '.meta{font-family:"Plus Jakarta Sans",Arial,sans-serif;font-size:12.5px;color:#8a7a6c;margin-bottom:28px}' +
    '.cover{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:4px;margin:4px 0 28px;display:block}' +
    '.body{font-size:19.5px;letter-spacing:.003em}' +
    '.body>p:first-of-type::first-letter{float:left;font-size:3.05em;line-height:.86;padding:.06em .09em 0 0;font-weight:700}' +
    '.body p{margin:0 0 20px}' +
    '.body h2{font-family:"Plus Jakarta Sans",Arial,sans-serif;font-size:22px;font-weight:800;margin:36px 0 12px;letter-spacing:-.01em}' +
    '.body h3{font-family:"Plus Jakarta Sans",Arial,sans-serif;font-size:18px;font-weight:800;margin:28px 0 8px}' +
    '.body img{max-width:100%;border-radius:4px}.body a{color:#C2521E}' +
    '.body ul,.body ol{padding-left:22px;margin:0 0 20px}.body li{margin:0 0 8px}' +
    '.fuente{font-family:"Plus Jakarta Sans",Arial,sans-serif;font-size:13px;color:#8a7a6c;border-left:3px solid #F58220;padding:2px 0 2px 12px;margin:28px 0 0}' +
    '.fuente a{color:#C2521E}' +
    '.raza{margin:34px 0 0;padding:18px 20px;border:1px solid #e8e2d8;border-radius:12px;background:#fdfbf7}' +
    '.raza-k{font-family:"Plus Jakarta Sans",Arial,sans-serif;font-size:10.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#9c8f82}' +
    '.raza-n{font-family:"Plus Jakarta Sans",Arial,sans-serif;font-size:20px;font-weight:800;margin:4px 0 8px}' +
    '.raza a{font-family:"Plus Jakarta Sans",Arial,sans-serif;font-size:14.5px;font-weight:700;color:#C2521E;text-decoration:none}' +
    '.tags{font-family:"Plus Jakarta Sans",Arial,sans-serif;margin:30px 0 0;display:flex;gap:8px;flex-wrap:wrap}' +
    '.tag{font-size:12px;font-weight:700;color:#6B5A4E;background:#f4efe7;border-radius:999px;padding:4px 11px}' +
    '.rel{margin:52px 0 0;padding-top:30px;border-top:1px solid #e8e2d8}' +
    '.rel h2{font-family:"Plus Jakarta Sans",Arial,sans-serif;font-size:13px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#9c8f82;margin:0 0 16px}' +
    '.rel-g{display:grid;gap:12px}' +
    '.rel-c{display:block;text-decoration:none;color:inherit;border:1px solid #e8e2d8;border-radius:10px;padding:14px 16px}' +
    '.rel-s{font-family:"Plus Jakarta Sans",Arial,sans-serif;font-size:10.5px;font-weight:800;letter-spacing:.13em;text-transform:uppercase;color:#C2521E;margin-bottom:5px}' +
    '.rel-t{font-size:17px;line-height:1.35;font-weight:600}' +
    '.foot{font-family:"Plus Jakarta Sans",Arial,sans-serif;text-align:center;margin-top:44px;padding-top:26px;border-top:1px solid #e8e2d8}' +
    '.foot a{display:inline-block;background:#191510;color:#fff;text-decoration:none;font-weight:800;font-size:14px;padding:13px 28px;border-radius:999px}' +
    '@media(max-width:560px){.body{font-size:18.5px}}';

  return '<!doctype html><html lang="' + lang + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + esc(ttl) + ' &middot; BrightPuppy</title>' +
    '<meta name="description" content="' + esc(desc) + '">' +
    '<link rel="canonical" href="' + esc(canonical) + '">' +
    '<meta property="og:type" content="article"><meta property="og:site_name" content="BrightPuppy">' +
    '<meta property="og:title" content="' + esc(ttl) + '"><meta property="og:description" content="' + esc(desc) + '">' +
    '<meta property="og:url" content="' + esc(canonical) + '"><meta property="og:image" content="' + esc(cover) + '">' +
    '<meta property="article:published_time" content="' + esc(p.published_at||"") + '">' +
    '<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="' + esc(ttl) + '"><meta name="twitter:description" content="' + esc(desc) + '"><meta name="twitter:image" content="' + esc(cover) + '">' +
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=Plus+Jakarta+Sans:wght@600;800&display=swap">' +
    '<script type="application/ld+json">' + JSON.stringify(ld) + '</script>' +
    '<style>' + css + '</style></head>' +
    '<body><div class="top"><a class="brand" href="' + SITE + '">Bright<span>Puppy</span></a><a class="back" href="' + SITE + '/media#noticias">&larr; ' + back + '</a></div>' +
    '<main><article>' +
    '<div class="kick">' + esc(secLab) + '</div>' +
    '<h1>' + esc(p.title||"") + '</h1>' +
    '<div class="meta">' + metaLinea + '</div>' +
    (heroImg ? ('<img class="cover" src="' + esc(heroImg) + '" alt="' + esc(p.title||"") + '">') : "") +
    '<div class="body">' + (p.body || ("<p>" + esc(p.excerpt||"") + "</p>")) + '</div>' +
    bloqueFuente +
    bloqueRaza +
    (tags.length ? ('<div class="tags">' + tags.map(function(t){ return '<span class="tag">' + esc(t) + '</span>'; }).join("") + '</div>') : "") +
    bloqueRel +
    '<div class="foot"><a href="' + SITE + '/media#noticias">' + home + '</a></div>' +
    '</article></main></body></html>';
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
      const relQ = post.section
        ? ("status=eq.published&section=eq." + encodeURIComponent(post.section) + "&slug=neq." + encodeURIComponent(post.slug) + "&select=slug,title,section&order=published_at.desc&limit=3")
        : ("status=eq.published&slug=neq." + encodeURIComponent(post.slug) + "&select=slug,title,section&order=published_at.desc&limit=3");
      const rel = (await fetchNews(relQ)) || [];
      return new Response(newsArticlePage(post, rel), { headers: { "content-type":"text/html; charset=utf-8", "cache-control":"public, max-age=300, s-maxage=600" } });
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
      if (!ct.includes("text/html")) return res;
      // Titulo del catalogo (el que puso el staff) -> asi lo muestra la vista previa de WhatsApp.
      // Sin titulo se queda el de siempre ("Cachorros Disponibles" / "Available Puppies").
      let ttl = (lang==="en") ? EN.title : null;
      let dsc = (lang==="en") ? EN.desc : null;
      const tok = url.searchParams.get("t");
      if (tok) {
        try {
          const ac = new AbortController(); const tmo = setTimeout(function(){ ac.abort(); }, 2500);
          const cr = await fetch(SUPA + "/functions/v1/catalog_view", { method:"POST", headers:{ "Content-Type":"application/json", "apikey": SUPA_ANON, "Authorization": "Bearer " + SUPA_ANON }, body: JSON.stringify({ token: tok }), signal: ac.signal });
          clearTimeout(tmo);
          const cd = await cr.json();
          if (cd && cd.ok) {
            const brand = (cd.company === "cachorrosrd") ? "Cachorros RD" : "BrightPuppy";
            if (cd.label && String(cd.label).trim()) ttl = String(cd.label).trim() + " · " + brand;
            if (cd.note && String(cd.note).trim()) dsc = String(cd.note).trim();
          }
        } catch(e){}
      }
      if (!ttl && !dsc && lang !== "en") return res;
      let rw = new HTMLRewriter();
      if (ttl) rw = rw.on("title", new SetText(ttl)).on('meta[property="og:title"]', new SetAttr("content", ttl)).on('meta[name="twitter:title"]', new SetAttr("content", ttl));
      if (dsc) rw = rw.on('meta[property="og:description"]', new SetAttr("content", dsc)).on('meta[name="description"]', new SetAttr("content", dsc)).on('meta[name="twitter:description"]', new SetAttr("content", dsc));
      if (lang === "en") rw = rw.on("html", new SetAttr("lang","en"));
      return rw.transform(res);
    } catch(e){ return res; }
  }
};
