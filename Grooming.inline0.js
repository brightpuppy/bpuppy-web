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
  // Aviso de reestructuracion: mientras la agenda este cerrada, esto va arriba de todo para que
  // nadie intente reservar y se lleve un error. Se quita borrando este bloque (y reabriendo los dias).
  const en = lang === "en";
  const notice = /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,#2D2421,#43352d)", color: "#fff", padding: "16px 18px", textAlign: "center" } },
    /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 760, margin: "0 auto" } },
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "#F58220", marginBottom: 5 } }, en ? "Temporary notice" : "Aviso temporal"),
      /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(17px,4.4vw,22px)", fontWeight: 700, lineHeight: 1.35 } }, en ? "We are restructuring — grooming available soon." : "Estamos reestructurando, grooming disponible próximamente."),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: "#E8DDD2", marginTop: 7, lineHeight: 1.5 } }, en ? "Bookings are paused for now. Questions? Text or WhatsApp " : "Las reservas están pausadas por ahora. ¿Dudas? SMS o WhatsApp ",
        /* @__PURE__ */ React.createElement("a", { href: "sms:+19294287300", style: { color: "#F58220", fontWeight: 700, textDecoration: "none" } }, "+1 (929) 428-7300"))
    ));
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang, setLang: setLangBoth } }, /* @__PURE__ */ React.createElement(Header, { overDark: false }), notice, /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(GroomingApp, null)), /* @__PURE__ */ React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(GroomRoot, null));

})();
