(function(){
const TWEAK_DEFAULTS = (
  /*EDITMODE-BEGIN*/
  {
    "theme": "familia",
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
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang, setLang: setLangBoth } }, /* @__PURE__ */ React.createElement(Header, { overDark }), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(Hero, null), /* @__PURE__ */ React.createElement(About, null), /* @__PURE__ */ React.createElement(Process, null), /* @__PURE__ */ React.createElement(Promise_, null), /* @__PURE__ */ React.createElement(Quiz, null), /* @__PURE__ */ React.createElement(Gallery, null), /* @__PURE__ */ React.createElement(InstagramFeed, null), /* @__PURE__ */ React.createElement(Testimonials, null), /* @__PURE__ */ React.createElement(FAQ, null), /* @__PURE__ */ React.createElement(FinalCTA, null)), /* @__PURE__ */ React.createElement(Footer, null), /* @__PURE__ */ React.createElement(PawCursor, { enabled: tweaks.paws }), /* @__PURE__ */ React.createElement(BPuppyTweaks, { tweaks, setTweak }));
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
