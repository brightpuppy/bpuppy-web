(function(){
const GROOM_TWEAK_DEFAULTS = (
  /*EDITMODE-BEGIN*/
  { "lang": "es" }
);
function GroomRoot() {
  const [tweaks, setTweak] = useTweaks(GROOM_TWEAK_DEFAULTS);
  const [lang, setLang] = React.useState(tweaks.lang || "es");
  React.useEffect(() => {
    setLang(tweaks.lang);
  }, [tweaks.lang]);
  const setLangBoth = (l) => {
    setLang(l);
    setTweak("lang", l);
  };
  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const isLive = useSitePublish("Grooming");
  if (!isLive) return /* @__PURE__ */ React.createElement(ComingSoon, { pageName: "Grooming" });
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang, setLang: setLangBoth } }, /* @__PURE__ */ React.createElement(Header, { overDark: false }), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(GroomingApp, null)), /* @__PURE__ */ React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(GroomRoot, null));

})();
