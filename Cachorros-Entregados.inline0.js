(function(){
const CE_SUPA_URL = "https://oqqwmcplljirbreowrll.supabase.co";
const CE_SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
const ceSb = (() => {
  try {
    return supabase.createClient(CE_SUPA_URL, CE_SUPA_KEY);
  } catch (e) {
    return null;
  }
})();
function getAge(p) {
  const w = p.age_weeks || (p.birth_date ? Math.floor((Date.now() - new Date(p.birth_date)) / 6048e5) : null);
  if (!w) return null;
  return w < 16 ? w + " semanas" : Math.floor(w / 4) + " meses";
}
function DeliveredCard({ p }) {
  const ph = Array.isArray(p.photos) && p.photos[0] || p.photo_url || null;
  const age = getAge(p);
  return /* @__PURE__ */ React.createElement("div", { style: { borderRadius: "var(--r)", overflow: "hidden", background: "var(--paper)", border: "1px solid var(--line)", position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { aspectRatio: "1/1", background: "var(--bg-2)", overflow: "hidden", position: "relative" } }, ph ? /* @__PURE__ */ React.createElement("img", { src: ph, alt: p.name, style: { width: "100%", height: "100%", objectFit: "cover" } }) : /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 } }, "\u{1F436}"), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 12, left: 12, background: "var(--ink)", color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 999 } }, "En su hogar \u2764\uFE0F")), /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--display)", fontSize: 20, fontWeight: 700, color: "var(--ink)", marginBottom: 3 } }, p.name || "Sin nombre"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--orange)", fontWeight: 600, marginBottom: 8 } }, p.breed), (age || p.gender || p.color) && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, age && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, padding: "3px 10px", borderRadius: 999, background: "var(--bg)", color: "var(--ink-2)", fontWeight: 600 } }, age), p.gender && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, padding: "3px 10px", borderRadius: 999, background: "var(--bg)", color: "var(--ink-2)", fontWeight: 600 } }, p.gender === "female" ? "\u2640 Hembra" : "\u2642 Macho")), p.delivered_to && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--ink-2)", marginTop: 8 } }, "\u{1F4CD} ", p.delivered_to)));
}
function CachorrosEntregados() {
  const [puppies, setPuppies] = React.useState([]);
  const [status, setStatus] = React.useState("loading");
  React.useEffect(() => {
    if (!ceSb) {
      setStatus("error");
      return;
    }
    ceSb.from("puppies").select("*").eq("status", "sold").order("updated_at", { ascending: false }).then(({ data, error }) => {
      if (error) {
        setStatus("error");
        return;
      }
      setPuppies(data || []);
      setStatus("ok");
    });
  }, []);
  return /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", minHeight: "60vh" } }, /* @__PURE__ */ React.createElement("section", { style: { background: "var(--dark-sec)", padding: "120px clamp(20px,5vw,80px) 64px", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, backgroundImage: "radial-gradient(70% 80% at 80% 20%, rgba(245,130,32,0.08), transparent 60%)", pointerEvents: "none" } }), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 800, position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 14 } }, "BPuppy \xB7 Historias"), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "var(--display)", fontSize: "clamp(40px,7vw,88px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.93, margin: "0 0 20px", color: "var(--ink)" } }, "Ya en su", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", { style: { fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--orange)" } }, "hogar.")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 17, color: "var(--ink-2)", lineHeight: 1.65, maxWidth: "48ch", margin: 0 } }, "Cada cachorro que entregamos lleva nuestro coraz\xF3n. Aqu\xED celebramos a las familias que ya encontraron a su compa\xF1ero perfecto."))), /* @__PURE__ */ React.createElement("section", { style: { padding: "clamp(48px,6vw,80px) clamp(20px,5vw,80px)" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1100, margin: "0 auto" } }, status === "loading" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: "80px 0" } }, /* @__PURE__ */ React.createElement("div", { className: "bp-spinner" }), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)", fontSize: 15 } }, "Cargando historias\u2026")), status === "error" && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "80px 24px", color: "var(--ink-2)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, marginBottom: 16 } }, "\u{1F43E}"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 16 } }, "No se pudieron cargar los cachorros entregados.")), status === "ok" && puppies.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "80px 24px", color: "var(--ink-2)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 56, marginBottom: 16 } }, "\u{1F436}"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--display)", fontSize: 28, fontWeight: 700, marginBottom: 12 } }, "Pronto habr\xE1 historias aqu\xED"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15 } }, "Estamos construyendo esta secci\xF3n. \xA1Vuelve pronto!"), /* @__PURE__ */ React.createElement("a", { href: "/cachorros", style: { display: "inline-block", marginTop: 24, background: "var(--orange)", color: "#fff", padding: "12px 24px", borderRadius: 999, fontWeight: 700, textDecoration: "none" } }, "Ver disponibles")), status === "ok" && puppies.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 32 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 8 } }, puppies.length, " cachorros entregados"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--display)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--ink)", margin: 0 } }, "Familias que confiaron en nosotros")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 } }, puppies.map((p) => /* @__PURE__ */ React.createElement(DeliveredCard, { key: p.id, p })))))));
}
function EntregadosRoot() {
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang: "es", setLang: function() {
  } } }, /* @__PURE__ */ React.createElement(Header, { overDark: false }), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(CachorrosEntregados, null)), /* @__PURE__ */ React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(EntregadosRoot, null));

})();
