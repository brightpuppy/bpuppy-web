const EN = {
  title: "Available Puppies · BrightPuppy",
  desc: "Handpicked puppies just for you — photos, prices and payment options.",
};
class SetText { constructor(t){this.t=t;} element(el){ el.setInnerContent(this.t);} }
class SetAttr { constructor(n,v){this.n=n;this.v=v;} element(el){ el.setAttribute(this.n,this.v);} }
export default {
  async fetch(request, env) {
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
