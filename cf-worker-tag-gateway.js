// Google tag gateway (first-party proxy) para bpuppy.us
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const p = url.pathname.replace(/^\/metrics/, "") || "/";
    if (p === "/" || p === "/health") {
      return new Response("bp-tag-gateway ok", { headers: { "content-type": "text/plain" } });
    }
    let host;
    if (p.startsWith("/gtag/js") || p.startsWith("/gtm.js") || p.startsWith("/gtag/destination") || p.startsWith("/gtag/")) {
      host = "www.googletagmanager.com";
    } else if (p.startsWith("/g/collect") || p.startsWith("/j/collect") || p.startsWith("/mp/collect") || p.startsWith("/collect") || p.startsWith("/r/collect")) {
      host = "www.google-analytics.com";
    } else if (p.startsWith("/analytics.js") || p.startsWith("/ga.js")) {
      host = "www.google-analytics.com";
    } else {
      host = "www.googletagmanager.com";
    }
    const target = "https://" + host + p + url.search;
    const h = new Headers(request.headers);
    h.delete("host"); h.delete("x-forwarded-host"); h.delete("cf-connecting-ip");
    h.delete("cf-ipcountry"); h.delete("cf-ray"); h.delete("cf-visitor");
    const ip = request.headers.get("cf-connecting-ip");
    if (ip) h.set("X-Forwarded-For", ip);
    const init = { method: request.method, headers: h, redirect: "manual" };
    if (request.method !== "GET" && request.method !== "HEAD") init.body = request.body;
    let resp;
    try { resp = await fetch(target, init); } catch (e) { return new Response("gateway error", { status: 502 }); }
    const out = new Response(resp.body, resp);
    out.headers.set("Access-Control-Allow-Origin", url.origin);
    out.headers.set("Access-Control-Allow-Credentials", "true");
    out.headers.delete("content-security-policy");
    out.headers.delete("content-security-policy-report-only");
    return out;
  }
};
