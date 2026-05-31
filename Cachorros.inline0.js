(function(){
(function() {
  var hdrMount = document.getElementById("__chrome-hdr");
  var ftrMount = document.getElementById("__chrome-ftr");
  if (!hdrMount) return;
  function ChromeShell() {
    var init = function() {
      return localStorage.getItem("bpuppy-lang") || "es";
    };
    var _s = React.useState(init);
    var lang = _s[0], setLang_ = _s[1];
    var setLang = function(l) {
      setLang_(l);
      localStorage.setItem("bpuppy-lang", l);
      document.documentElement.lang = l;
    };
    return React.createElement(
      LangContext.Provider,
      { value: { lang, setLang } },
      ReactDOM.createPortal(React.createElement(Header, { overDark: true }), hdrMount),
      ftrMount ? ReactDOM.createPortal(React.createElement(Footer, null), ftrMount) : null
    );
  }
  var shell = document.createElement("div");
  shell.style.display = "none";
  document.body.appendChild(shell);
  ReactDOM.createRoot(shell).render(React.createElement(ChromeShell));
})();

})();
