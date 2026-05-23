(function(){
const SP = window.SitePublish;
const { REGISTRY, DEFAULTS } = SP;
const CAT_META = {
  Principal: { color: "#FF5520", desc: "P\xE1ginas principales de navegaci\xF3n" },
  Contenido: { color: "#4AB8FF", desc: "Media, blog y redes sociales" },
  Servicios: { color: "#9B6FFF", desc: "Grooming, gatos y servicios" },
  Info: { color: "#22C55E", desc: "Razas, historia e informaci\xF3n" }
};
function getState() {
  const { sections } = SP.getAll();
  const pages = {};
  REGISTRY.pages.forEach((p) => {
    pages[p.id] = SP.isPageLive(p.id);
  });
  return { pages, sections };
}
function Toggle({ value, onChange, size = "md", accent = "#22C55E" }) {
  const W = size === "sm" ? 36 : 46;
  const H = size === "sm" ? 20 : 26;
  const D = size === "sm" ? 14 : 18;
  const pad = (H - D) / 2;
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => onChange(!value),
      "aria-pressed": value,
      style: {
        width: W,
        height: H,
        borderRadius: H,
        background: value ? accent : "rgba(255,255,255,0.1)",
        border: "none",
        cursor: "pointer",
        position: "relative",
        flexShrink: 0,
        transition: "background 0.22s",
        boxShadow: value ? `0 0 14px ${accent}44` : "none"
      }
    },
    /* @__PURE__ */ React.createElement("span", { style: {
      position: "absolute",
      top: pad,
      left: value ? W - D - pad : pad,
      width: D,
      height: D,
      borderRadius: "50%",
      background: "#fff",
      transition: "left 0.22s cubic-bezier(.4,0,.2,1)",
      boxShadow: "0 1px 4px rgba(0,0,0,0.35)",
      display: "block"
    } })
  );
}
function SectionRow({ sec, live, pageLive, onToggle }) {
  const effectiveLive = pageLive && live;
  return /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 12px",
    borderRadius: 8,
    background: "rgba(255,255,255,0.025)",
    opacity: pageLive ? 1 : 0.4
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    flexShrink: 0,
    background: effectiveLive ? "#22C55E" : "rgba(255,255,255,0.18)",
    transition: "background 0.2s"
  } }), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 12.5,
    fontWeight: 500,
    color: live ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.3)",
    transition: "color 0.2s"
  } }, sec.label)), /* @__PURE__ */ React.createElement(Toggle, { value: live, onChange: onToggle, size: "sm", accent: "#4AB8FF" }));
}
function PageCard({ page, isLive, sectionOverrides, onTogglePage, onToggleSection }) {
  const [expanded, setExpanded] = React.useState(false);
  const sections = REGISTRY.sections[page.id] || [];
  const catColor = CAT_META[page.category]?.color || "#FF5520";
  const secLives = sections.map(
    (s) => sectionOverrides[s.id] !== void 0 ? sectionOverrides[s.id] : true
  );
  const liveCount = secLives.filter(Boolean).length;
  const hasHidden = liveCount < sections.length;
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: "rgba(255,255,255,0.034)",
    border: `1px solid ${isLive ? catColor + "33" : "rgba(255,255,255,0.07)"}`,
    borderRadius: 16,
    overflow: "hidden",
    transition: "border-color 0.3s",
    display: "flex",
    flexDirection: "column"
  } }, /* @__PURE__ */ React.createElement("div", { style: {
    height: 3,
    background: isLive ? catColor : "rgba(255,255,255,0.08)",
    transition: "background 0.3s"
  } }), /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 20px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 7 } }, /* @__PURE__ */ React.createElement("span", { style: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: isLive ? "#22C55E" : "rgba(255,255,255,0.18)",
    flexShrink: 0,
    animation: isLive ? "pulse-green 2.4s ease infinite" : "none"
  } }), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: isLive ? "#22C55E" : "rgba(255,255,255,0.28)",
    transition: "color 0.3s"
  } }, isLive ? "Publicado" : "Borrador")), /* @__PURE__ */ React.createElement(Toggle, { value: isLive, onChange: onTogglePage, accent: "#22C55E" })), /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: "Bricolage Grotesque, sans-serif",
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: "-0.025em",
    color: isLive ? "#F0EEF8" : "rgba(240,238,248,0.35)",
    marginBottom: 3,
    transition: "color 0.3s",
    lineHeight: 1.1
  } }, page.label), /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: 11,
    color: "rgba(255,255,255,0.2)",
    fontFamily: "monospace",
    letterSpacing: "0.02em",
    marginBottom: 16
  } }, "/", page.url), sections.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 4 } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setExpanded((e) => !e),
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "8px 11px",
        background: expanded ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: expanded ? "8px 8px 0 0" : 8,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "background 0.15s, border-radius 0.15s"
      },
      onMouseEnter: (e) => e.currentTarget.style.background = "rgba(255,255,255,0.07)",
      onMouseLeave: (e) => e.currentTarget.style.background = expanded ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.035)"
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 600, color: hasHidden ? "#F59E0B" : "rgba(255,255,255,0.45)" } }, hasHidden ? `\u26A0 ${liveCount}/${sections.length} secciones activas` : `${sections.length} secciones \u2014 todas activas`),
    /* @__PURE__ */ React.createElement(
      "svg",
      {
        width: "11",
        height: "11",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "rgba(255,255,255,0.4)",
        strokeWidth: "2.5",
        strokeLinecap: "round",
        style: { transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }
      },
      /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" })
    )
  ), expanded && /* @__PURE__ */ React.createElement("div", { style: {
    border: "1px solid rgba(255,255,255,0.07)",
    borderTop: "none",
    borderRadius: "0 0 8px 8px",
    padding: "4px 4px 4px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    background: "rgba(0,0,0,0.15)"
  } }, sections.map((sec, i) => /* @__PURE__ */ React.createElement(
    SectionRow,
    {
      key: sec.id,
      sec,
      live: secLives[i],
      pageLive: isLive,
      onToggle: (v) => onToggleSection(sec.id, v)
    }
  ))))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "auto", padding: "0 20px 16px" } }, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: page.url,
      target: "_blank",
      rel: "noreferrer",
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11.5,
        fontWeight: 600,
        color: isLive ? catColor : "rgba(255,255,255,0.18)",
        textDecoration: "none",
        transition: "color 0.2s",
        pointerEvents: isLive ? "auto" : "none"
      }
    },
    "Abrir p\xE1gina",
    /* @__PURE__ */ React.createElement("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M7 17L17 7M17 7H7M17 7v10" }))
  )));
}
function PublishApp() {
  const [cfg, setCfg] = React.useState(getState);
  const [savedAt, setSavedAt] = React.useState(null);
  const [toastKey, setToastKey] = React.useState(0);
  React.useEffect(() => {
    const h = () => {
      setCfg(getState());
    };
    window.addEventListener("bpuppy:publish", h);
    return () => window.removeEventListener("bpuppy:publish", h);
  }, []);
  function flash() {
    setSavedAt(Date.now());
    setToastKey((k) => k + 1);
  }
  function togglePage(id, live) {
    SP.setPageLive(id, live);
    setCfg(getState());
    flash();
  }
  function toggleSection(pageId, secId, live) {
    SP.setSectionLive(pageId, secId, live);
    setCfg(getState());
    flash();
  }
  function handleReset() {
    if (!confirm("\xBFRestaurar todos los valores por defecto?")) return;
    SP.reset();
    setCfg(getState());
    flash();
  }
  const livePages = REGISTRY.pages.filter((p) => cfg.pages[p.id]).length;
  const totalPages = REGISTRY.pages.length;
  const categories = ["Principal", "Contenido", "Servicios", "Info"];
  const grouped = categories.map((cat) => ({
    cat,
    color: CAT_META[cat].color,
    desc: CAT_META[cat].desc,
    pages: REGISTRY.pages.filter((p) => p.category === cat)
  }));
  return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(7,9,15,0.88)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "12px clamp(20px,5vw,80px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16 } }, /* @__PURE__ */ React.createElement("a", { href: "Home.html" }, /* @__PURE__ */ React.createElement("img", { src: window.__resources && window.__resources.logoLight || "assets/logo-clean-light.png", style: { height: 26, display: "block" }, alt: "BPuppy" })), /* @__PURE__ */ React.createElement("div", { style: { width: 1, height: 22, background: "rgba(255,255,255,0.1)" } }), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.35)"
  } }, "Publish Panel")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16 } }, savedAt && /* @__PURE__ */ React.createElement("span", { key: toastKey, className: "saved-toast", style: {
    fontSize: 11.5,
    fontWeight: 600,
    color: "#22C55E",
    display: "flex",
    alignItems: "center",
    gap: 5
  } }, /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6L9 17l-5-5" })), "Guardado"), /* @__PURE__ */ React.createElement("button", { onClick: handleReset, style: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,85,32,0.55)",
    background: "none",
    border: "1px solid rgba(255,85,32,0.15)",
    borderRadius: 8,
    padding: "5px 12px",
    cursor: "pointer",
    fontFamily: "inherit"
  } }, "Restaurar defaults"))), /* @__PURE__ */ React.createElement("div", { style: {
    padding: "48px clamp(20px,5vw,80px) 40px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 24,
    borderBottom: "1px solid rgba(255,255,255,0.05)"
  } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { style: {
    fontFamily: "Bricolage Grotesque, sans-serif",
    fontSize: "clamp(36px,5vw,64px)",
    fontWeight: 800,
    letterSpacing: "-0.04em",
    lineHeight: 0.95,
    marginBottom: 12
  } }, "Control de", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: "#FF5520" } }, "Publicaci\xF3n")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "rgba(255,255,255,0.4)", maxWidth: "44ch", lineHeight: 1.6 } }, "Activa o desactiva p\xE1ginas completas y sus secciones individuales. Los cambios se aplican en tiempo real.")), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: {
    fontFamily: "Bricolage Grotesque, sans-serif",
    fontSize: "clamp(48px,6vw,80px)",
    fontWeight: 800,
    letterSpacing: "-0.05em",
    lineHeight: 1,
    color: "#22C55E"
  } }, livePages, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "0.42em", color: "rgba(255,255,255,0.2)", fontWeight: 700 } }, "/", totalPages)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 4 } }, "p\xE1ginas publicadas"))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, padding: "40px clamp(20px,5vw,80px) 60px" } }, grouped.map(({ cat, color, desc, pages }) => /* @__PURE__ */ React.createElement("div", { key: cat, style: { marginBottom: 48 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.4)"
  } }, cat), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "rgba(255,255,255,0.18)" } }, desc), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 1, background: "rgba(255,255,255,0.05)" } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "rgba(255,255,255,0.2)", flexShrink: 0 } }, pages.filter((p) => cfg.pages[p.id]).length, "/", pages.length, " live")), /* @__PURE__ */ React.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 12
  } }, pages.map((page) => {
    const secOverrides = cfg.sections[page.id] || {};
    return /* @__PURE__ */ React.createElement(
      PageCard,
      {
        key: page.id,
        page,
        isLive: !!cfg.pages[page.id],
        sectionOverrides: secOverrides,
        onTogglePage: (live) => togglePage(page.id, live),
        onToggleSection: (secId, live) => toggleSection(page.id, secId, live)
      }
    );
  }))))), /* @__PURE__ */ React.createElement("div", { style: {
    borderTop: "1px solid rgba(255,255,255,0.05)",
    padding: "16px clamp(20px,5vw,80px)",
    display: "flex",
    alignItems: "center",
    gap: 10
  } }, /* @__PURE__ */ React.createElement("span", { style: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#22C55E",
    animation: "pulse-green 2s ease infinite"
  } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: "rgba(255,255,255,0.22)" } }, "Los cambios persisten en este navegador y se sincronizan entre pesta\xF1as abiertas. Para publicar en producci\xF3n, exporta el sitio.")));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(PublishApp, null));

})();
