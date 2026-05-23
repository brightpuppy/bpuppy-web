(function(){
const SHOP_TWEAK_DEFAULTS = (
  /*EDITMODE-BEGIN*/
  { "lang": "es" }
);
function ShopRoot() {
  const [tweaks, setTweak] = useTweaks(SHOP_TWEAK_DEFAULTS);
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
  const isLive = useSitePublish("Tienda");
  if (!isLive) return /* @__PURE__ */ React.createElement(ComingSoon, { pageName: "Tienda" });
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang, setLang: setLangBoth } }, /* @__PURE__ */ React.createElement(Header, { overDark: false }), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(TiendaApp, null)), /* @__PURE__ */ React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(ShopRoot, null));

})();
