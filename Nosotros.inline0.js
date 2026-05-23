(function(){
const NOS_TWEAK_DEFAULTS = (
  /*EDITMODE-BEGIN*/
  { "lang": "es" }
);
function NosotrosRoot() {
  const [tweaks, setTweak] = useTweaks(NOS_TWEAK_DEFAULTS);
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
  const isLive = useSitePublish("Nosotros");
  if (!isLive) return /* @__PURE__ */ React.createElement(ComingSoon, { pageName: "Nosotros" });
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang, setLang: setLangBoth } }, /* @__PURE__ */ React.createElement(Header, { overDark: true }), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(NosotrosApp, null)), /* @__PURE__ */ React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(NosotrosRoot, null));

})();
