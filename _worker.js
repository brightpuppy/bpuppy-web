const EN = {
  title: "Available Puppies · BrightPuppy",
  desc: "Handpicked puppies just for you — photos, prices and payment options.",
};
class SetText { constructor(t){this.t=t;} element(el){ el.setInnerContent(this.t);} }
class SetAttr { constructor(n,v){this.n=n;this.v=v;} element(el){ el.setAttribute(this.n,this.v);} }
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
export default {
  async fetch(request, env) {
    const url0 = new URL(request.url);
    const p0 = url0.pathname.replace(/\/+$/,"");
    if (p0 === "/sms") {
      return new Response(smsRedirectPage(url0.searchParams.get("to"), url0.searchParams.get("body")),
        { headers: { "content-type":"text/html; charset=utf-8", "cache-control":"no-store" } });
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
