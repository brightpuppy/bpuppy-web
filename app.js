(function(){
const TWEAK_DEFAULTS = (
  /*EDITMODE-BEGIN*/
  {
    "theme": "pop",
    "brandColor": "#F58220",
    "paws": true,
    "lang": "es"
  }
);
function FamiliesMapSection() {
  const [show, setShow] = React.useState(
    () => window.SitePublish ? window.SitePublish.isSectionLive("Home", "mapa") : true
  );
  React.useEffect(() => {
    const h = () => setShow(window.SitePublish ? window.SitePublish.isSectionLive("Home", "mapa") : true);
    window.addEventListener("bpuppy:publish", h);
    return () => window.removeEventListener("bpuppy:publish", h);
  }, []);
  if (!show) return null;
  return /* @__PURE__ */ React.createElement(FamiliesMap, null);
}
function DeliveryMap() {
  const t = typeof useT === "function" ? useT() : ((a) => Array.isArray(a) ? a[0] : a);
  return /* @__PURE__ */ React.createElement("section", { className: "reveal", style: { padding: "80px 0", background: "#F2E7D0" } }, /* @__PURE__ */ React.createElement("div", { className: "container", style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow", style: { color: "#C2521E" } }, "\u{1F9ED} ", t(["Bit\xE1cora de vuelo", "Flight log"])), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(32px,5vw,60px)", margin: "10px 0 8px" } }, t(["Familias felices ", "Happy families "]), /* @__PURE__ */ React.createElement("em", { className: "serif-italic", style: { color: "#C2521E" } }, t(["alrededor del mundo", "around the world"]))), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)", maxWidth: "56ch", margin: "0 auto 22px" } }, t(["Cada cachorro entregado es un nuevo hogar en el mapa.", "Every delivered puppy is a new home on the map."])), /* @__PURE__ */ React.createElement("iframe", { src: "/mapa-entregas", loading: "lazy", title: "Mapa de entregas", style: { width: "100%", height: "460px", border: "2px solid #d8c7a6", borderRadius: "18px" } })));
}
function DeliveryMapLive() {
  const live = () => window.SitePublish ? window.SitePublish.isSectionLive("Home", "mapa") : false;
  const [show, setShow] = React.useState(live);
  React.useEffect(() => {
    const h = () => setShow(live());
    window.addEventListener("bpuppy:publish", h);
    return () => window.removeEventListener("bpuppy:publish", h);
  }, []);
  if (!show) return null;
  return /* @__PURE__ */ React.createElement(DeliveryMap, null);
}
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = React.useState(tweaks.lang || "es");
  React.useEffect(() => {
    setLang(tweaks.lang);
  }, [tweaks.lang]);
  const setLangBoth = (l) => {
    setLang(l);
    setTweak("lang", l);
  };
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", tweaks.theme);
    document.documentElement.lang = lang;
  }, [tweaks.theme, lang]);
  React.useEffect(() => {
    document.documentElement.style.setProperty("--orange", tweaks.brandColor);
    document.documentElement.style.setProperty("--orange-deep", shade(tweaks.brandColor, -0.18));
  }, [tweaks.brandColor]);
  useReveal();
  const [overDark, setOverDark] = React.useState(true);
  React.useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector(".hero");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setOverDark(heroBottom > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const isLive = useSitePublish("Home");
  if (!isLive) return /* @__PURE__ */ React.createElement(ComingSoon, { pageName: "Inicio" });
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang, setLang: setLangBoth } }, /* @__PURE__ */ React.createElement(Header, { overDark }), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(Hero, null), /* @__PURE__ */ React.createElement(About, null), /* @__PURE__ */ React.createElement(Process, null), /* @__PURE__ */ React.createElement(Promise_, null), /* @__PURE__ */ React.createElement(Quiz, null), /* @__PURE__ */ React.createElement(Gallery, null), /* @__PURE__ */ React.createElement(InstagramFeed, null), /* @__PURE__ */ React.createElement(Testimonials, null), /* @__PURE__ */ React.createElement(DeliveryMapLive, null), /* @__PURE__ */ React.createElement(FAQ, null), /* @__PURE__ */ React.createElement(FinalCTA, null)), /* @__PURE__ */ React.createElement(Footer, null), /* @__PURE__ */ React.createElement(PawCursor, { enabled: tweaks.paws }), /* @__PURE__ */ React.createElement(BPuppyTweaks, { tweaks, setTweak }));
}
function shade(hex, amt) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  let r = n >> 16 & 255, g = n >> 8 & 255, b = n & 255;
  const k = 1 + amt;
  r = Math.round(Math.max(0, Math.min(255, r * k)));
  g = Math.round(Math.max(0, Math.min(255, g * k)));
  b = Math.round(Math.max(0, Math.min(255, b * k)));
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));

})();
