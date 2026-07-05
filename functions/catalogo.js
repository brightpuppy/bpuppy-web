// functions/catalogo.js — Cloudflare Pages Function para /catalogo
// Reescribe título + meta OG/Twitter/description al idioma del enlace (?lang=en)
// para que la VISTA PREVIA del enlace (SMS/iMessage/WhatsApp/redes) salga en el
// idioma correcto. Los crawlers de esas apps NO ejecutan JS, así que el idioma
// del cliente/JS no basta: hay que servir los metadatos ya traducidos.
// Español = página estática original (sin cambios). Cualquier fallo -> se sirve
// la página tal cual (nunca rompe el catálogo).

const EN = {
  title: "Available Puppies · BrightPuppy",
  desc: "Handpicked puppies just for you — photos, prices and payment options.",
};

class SetText {
  constructor(t) { this.t = t; }
  element(el) { el.setInnerContent(this.t); }
}
class SetAttr {
  constructor(name, val) { this.name = name; this.val = val; }
  element(el) { el.setAttribute(this.name, this.val); }
}

export async function onRequest(context) {
  const { request, next } = context;
  const res = await next(); // sirve el catalogo.html estático
  try {
    const url = new URL(request.url);
    const lang = ((url.searchParams.get("lang") || "").toLowerCase() === "en") ? "en" : "es";
    const ct = (res.headers.get("content-type") || "").toLowerCase();
    if (lang !== "en" || !ct.includes("text/html")) return res;
    return new HTMLRewriter()
      .on("title", new SetText(EN.title))
      .on('meta[property="og:title"]', new SetAttr("content", EN.title))
      .on('meta[name="twitter:title"]', new SetAttr("content", EN.title))
      .on('meta[property="og:description"]', new SetAttr("content", EN.desc))
      .on('meta[name="description"]', new SetAttr("content", EN.desc))
      .on('meta[name="twitter:description"]', new SetAttr("content", EN.desc))
      .on("html", new SetAttr("lang", "en"))
      .transform(res);
  } catch (e) {
    return res;
  }
}
