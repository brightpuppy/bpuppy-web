(function(){
function DetalleRoot() {
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang: "es", setLang: function() {
  } } }, /* @__PURE__ */ React.createElement(Header, { overDark: false }), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(PuppyDetalle, null)), /* @__PURE__ */ React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(DetalleRoot, null));

})();
