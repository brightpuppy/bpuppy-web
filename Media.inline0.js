(function(){
function getSectionVis() {
  if (!window.SitePublish) return { hero: true, videos: true, podcast: true, entrevistas: true, cta: true };
  const SP = window.SitePublish;
  return {
    hero: SP.isSectionLive("Media", "hero"),
    videos: SP.isSectionLive("Media", "videos"),
    podcast: SP.isSectionLive("Media", "podcast"),
    entrevistas: SP.isSectionLive("Media", "entrevistas"),
    cta: SP.isSectionLive("Media", "cta")
  };
}
function MediaRoot() {
  const [lang, setLang] = React.useState(window.bpGetLang&&window.bpGetLang()||"es");
  const [vis, setVis] = React.useState(getSectionVis);
  React.useEffect(() => {
    const h = () => setVis(getSectionVis());
    window.addEventListener("bpuppy:publish", h);
    return () => window.removeEventListener("bpuppy:publish", h);
  }, []);
  function toggleSection(key, val) {
    setVis((prev) => ({ ...prev, [key]: val }));
    if (window.SitePublish) window.SitePublish.setSectionLive("Media", key, val);
  }
  React.useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.classList.add("media-dark");
  }, [lang]);
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang, setLang } }, /* @__PURE__ */ React.createElement(Header, { overDark: false }), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(MediaApp, { visibility: vis })), /* @__PURE__ */ React.createElement(Footer, null), /* @__PURE__ */ React.createElement(TweaksPanel, null, /* @__PURE__ */ React.createElement(TweakSection, { label: "Secciones publicadas" }), /* @__PURE__ */ React.createElement(TweakToggle, { label: "Hero \u2014 B Media", value: vis.hero, onChange: (v) => toggleSection("hero", v) }), /* @__PURE__ */ React.createElement(TweakToggle, { label: "Videos", value: vis.videos, onChange: (v) => toggleSection("videos", v) }), /* @__PURE__ */ React.createElement(TweakToggle, { label: "Podcast \u2014 Bcast", value: vis.podcast, onChange: (v) => toggleSection("podcast", v) }), /* @__PURE__ */ React.createElement(TweakToggle, { label: "Entrevistas", value: vis.entrevistas, onChange: (v) => toggleSection("entrevistas", v) }), /* @__PURE__ */ React.createElement(TweakToggle, { label: "CTA Final", value: vis.cta, onChange: (v) => toggleSection("cta", v) })));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(MediaRoot, null));

})();
