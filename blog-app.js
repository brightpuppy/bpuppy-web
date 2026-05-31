(function(){
const BLOG_TWEAK_DEFAULTS = (
  /*EDITMODE-BEGIN*/
  { "lang": "es" }
);
function BlogRoot() {
  const [tweaks, setTweak] = useTweaks(BLOG_TWEAK_DEFAULTS);
  const [lang, setLang] = React.useState(() => window.bpGetLang && window.bpGetLang() || tweaks.lang || "es");
  React.useEffect(() => {
    if (!(window.bpGetLang && window.bpGetLang())) setLang(tweaks.lang);
  }, [tweaks.lang]);
  React.useEffect(() => window.bpOnLang ? window.bpOnLang(setLang) : void 0, []);
  const setLangBoth = (l) => {
    setLang(l);
    setTweak("lang", l);
    try {
      localStorage.setItem("bpuppy-lang", l);
    } catch (e) {
    }
  };
  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const initArtId = React.useMemo(() => {
    const p = new URLSearchParams(window.location.search);
    const id = p.get("art");
    return id ? parseInt(id) : null;
  }, []);
  const [heroDark, setHeroDark] = React.useState(false);
  const isLive = useSitePublish("Blog");
  if (!isLive) return /* @__PURE__ */ React.createElement(ComingSoon, { pageName: "Blog" });
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang, setLang: setLangBoth } }, /* @__PURE__ */ React.createElement(Header, { overDark: heroDark }), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(BlogApp, { initialArtId: initArtId, onHero: setHeroDark })), /* @__PURE__ */ React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(BlogRoot, null));

})();
