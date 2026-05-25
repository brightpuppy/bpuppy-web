(function(){
const GE_SUPA_URL = "https://oqqwmcplljirbreowrll.supabase.co";
const GE_SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
const geSb = (() => {
  try {
    return supabase.createClient(GE_SUPA_URL, GE_SUPA_KEY);
  } catch (e) {
    return null;
  }
})();
function GatoCaCard({ p }) {
  const ph = Array.isArray(p.photos) && p.photos[0] || p.photo_url || null;
  return /* @__PURE__ */ React.createElement("div", { style: { borderRadius: "var(--r)", overflow: "hidden", background: "var(--paper)", border: "1px solid rgba(124,92,191,0.15)", position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { aspectRatio: "1/1", background: "var(--cat-light)", overflow: "hidden", position: "relative" } }, ph ? /* @__PURE__ */ React.createElement("img", { src: ph, alt: p.name, style: { width: "100%", height: "100%", objectFit: "cover" } }) : /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 } }, "\u{1F408}"), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 12, left: 12, background: "var(--cat-purple)", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 999 } }, "En su hogar \u2764\uFE0F")), /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--display)", fontSize: 20, fontWeight: 700, color: "var(--ink)", marginBottom: 3 } }, p.name || "Sin nombre"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--cat-purple)", fontWeight: 600, marginBottom: 8 } }, p.breed), p.delivered_to && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--ink-2)", marginTop: 4 } }, "\u{1F4CD} ", p.delivered_to)));
}
function GatosEntregados() {
  const [cats, setCats] = React.useState([]);
  const [status, setStatus] = React.useState("loading");
  React.useEffect(() => {
    if (!geSb) {
      setStatus("error");
      return;
    }
    geSb.from("cats").select("*").eq("status", "sold").order("updated_at", { ascending: false }).then(({ data, error }) => {
      if (error) {
        setStatus("error");
        return;
      }
      setCats(data || []);
      setStatus("ok");
    });
  }, []);
  return /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", minHeight: "60vh" } }, /* @__PURE__ */ React.createElement("section", { style: { background: "linear-gradient(135deg,#6B4FA8 0%,#4A3580 100%)", padding: "120px clamp(20px,5vw,80px) 64px", position: "relative", overflow: "hidden", color: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, backgroundImage: "radial-gradient(60% 70% at 80% 20%, rgba(255,255,255,0.07), transparent 60%)", pointerEvents: "none" } }), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 800, position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 14 } }, "BPuppy \xB7 Historias felinas"), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "var(--display)", fontSize: "clamp(40px,7vw,88px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.93, margin: "0 0 20px" } }, "Ya en su", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", { style: { fontFamily: "var(--serif)", fontStyle: "italic", color: "#E8D5F0" } }, "hogar.")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, maxWidth: "48ch", margin: 0 } }, "Cada gatito que entregamos lleva nuestro cari\xF1o. Aqu\xED celebramos a las familias que ya encontraron a su compa\xF1ero felino."))), /* @__PURE__ */ React.createElement("section", { style: { padding: "clamp(48px,6vw,80px) clamp(20px,5vw,80px)" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1100, margin: "0 auto" } }, status === "loading" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: "80px 0" } }, /* @__PURE__ */ React.createElement("div", { className: "bp-spinner" }), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)", fontSize: 15 } }, "Cargando historias\u2026")), status === "ok" && cats.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "80px 24px", color: "var(--ink-2)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 56, marginBottom: 16 } }, "\u{1F408}"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--display)", fontSize: 28, fontWeight: 700, marginBottom: 12 } }, "Pronto habr\xE1 historias aqu\xED"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15 } }, "Estamos construyendo esta secci\xF3n. \xA1Vuelve pronto!"), /* @__PURE__ */ React.createElement("a", { href: "/gatos", style: { display: "inline-block", marginTop: 24, background: "var(--cat-purple)", color: "#fff", padding: "12px 24px", borderRadius: 999, fontWeight: 700, textDecoration: "none" } }, "Ver gatitos disponibles")), status === "ok" && cats.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 32 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--cat-purple)", marginBottom: 8 } }, cats.length, " gatitos entregados"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--display)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--ink)", margin: 0 } }, "Familias que encontraron su compa\xF1ero felino")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 } }, cats.map((p) => /* @__PURE__ */ React.createElement(GatoCaCard, { key: p.id, p })))))));
}
function GatosEntregadosRoot() {
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang: "es", setLang: function() {
  } } }, /* @__PURE__ */ React.createElement(Header, { overDark: false }), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(GatosEntregados, null)), /* @__PURE__ */ React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(GatosEntregadosRoot, null));

})();
