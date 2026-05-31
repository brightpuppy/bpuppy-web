(function(){
const { useState, useEffect, useRef, useMemo } = React;
function ReadingBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? Math.min(100, scrolled / total * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 200, background: "var(--line,#f0e8e0)" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${pct}%`, background: "var(--orange,#F58220)", transition: "width .1s linear" } }));
}
function ArticleHero({ art, compact = false }) {
  const h = compact ? 200 : 420;
  const cat = CAT_META[art.cat] || {};
  if (art.img) {
    return /* @__PURE__ */ React.createElement("div", { style: { position: "relative", height: h, overflow: "hidden", borderRadius: compact ? "16px 16px 0 0" : 0 } }, /* @__PURE__ */ React.createElement("img", { src: art.img, alt: art.title, style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: compact ? "linear-gradient(to bottom,rgba(0,0,0,0.02),rgba(0,0,0,0.44))" : "linear-gradient(to bottom,rgba(0,0,0,0.04),rgba(0,0,0,0.55))" } }), compact && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 12, left: 12 } }, /* @__PURE__ */ React.createElement(CatPill, { cat: art.cat })));
  }
  return /* @__PURE__ */ React.createElement("div", { style: { position: "relative", height: h, borderRadius: compact ? "16px 16px 0 0" : 0, overflow: "hidden", background: `linear-gradient(135deg, ${art.color}22 0%, ${art.color}44 100%)` } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: compact ? 56 : 96, lineHeight: 1, filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.12))" } }, art.emoji), !compact && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: art.color, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.8 } }, CAT_META[art.cat]?.label)), compact && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 12, left: 12 } }, /* @__PURE__ */ React.createElement(CatPill, { cat: art.cat })), /* @__PURE__ */ React.createElement("svg", { style: { position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }, viewBox: "0 0 400 200", preserveAspectRatio: "xMidYMid slice" }, [0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400].map((x) => /* @__PURE__ */ React.createElement("line", { key: x, x1: x, y1: "0", x2: x, y2: "200", stroke: art.color, strokeWidth: "1" })), [0, 40, 80, 120, 160, 200].map((y) => /* @__PURE__ */ React.createElement("line", { key: y, x1: "0", y1: y, x2: "400", y2: y, stroke: art.color, strokeWidth: "1" }))));
}
function CatPill({ cat, small }) {
  const m = CAT_META[cat] || { label: cat, color: "#888", bg: "#eee" };
  return /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", padding: small ? "2px 8px" : "4px 12px", borderRadius: 999, background: m.bg, color: m.color, fontSize: small ? 10 : 11, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" } }, m.label);
}
function ArticleCard({ art, onClick, featured }) {
  const [hov, setHov] = useState(false);
  return /* @__PURE__ */ React.createElement(
    "article",
    {
      onClick: () => onClick(art),
      onMouseEnter: () => setHov(true),
      onMouseLeave: () => setHov(false),
      style: { background: "var(--paper,#fff)", borderRadius: 20, overflow: "hidden", cursor: "pointer", boxShadow: hov ? "0 16px 48px -12px rgba(45,36,33,0.22)" : "0 2px 16px -4px rgba(45,36,33,0.10)", transform: hov ? "translateY(-3px)" : "none", transition: "all .22s ease", display: "flex", flexDirection: "column" }
    },
    /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement(ArticleHero, { art, compact: true })),
    /* @__PURE__ */ React.createElement("div", { style: { padding: featured ? "20px 24px 24px" : "16px 18px 20px", display: "flex", flexDirection: "column", flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 } }, !art.img && /* @__PURE__ */ React.createElement(CatPill, { cat: art.cat }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--ink-2,#6B5A4E)", marginLeft: "auto" } }, "\u23F1 ", art.read, " min")), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: featured ? 22 : 17, fontWeight: 700, color: "var(--ink,#2D2421)", lineHeight: 1.25, letterSpacing: "-0.02em", margin: "0 0 8px", textWrap: "pretty" } }, art.title), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13.5, color: "var(--ink-2,#6B5A4E)", lineHeight: 1.6, margin: "0 0 14px", flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" } }, art.lead), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 500 } }, art.date), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: "var(--orange,#F58220)", display: "flex", alignItems: "center", gap: 4 } }, "Leer", /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14M13 5l7 7-7 7" })))))
  );
}
function BlogListing({ onSelect }) {
  const [cat, setCat] = useState("todos");
  const [q, setQ] = useState("");
  const inputRef = useRef();
  const filtered = useMemo(() => {
    let list = cat === "todos" ? BLOG : BLOG.filter((a) => a.cat === cat);
    if (q.trim()) {
      const lq = q.toLowerCase();
      list = list.filter(
        (a) => a.title.toLowerCase().includes(lq) || a.lead.toLowerCase().includes(lq) || (a.tags || []).some((t) => t.toLowerCase().includes(lq))
      );
    }
    return list;
  }, [cat, q]);
  const featured = filtered[0];
  const rest = filtered.slice(1);
  return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "100vh", background: "var(--bg,#FFF5EB)" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "var(--paper,#fff)", borderBottom: "1px solid var(--line)", paddingTop: 100 } }, /* @__PURE__ */ React.createElement("div", { className: "container", style: { paddingBottom: 40 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 28 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow", style: { marginBottom: 8 } }, "BPuppy \xB7 Blog"), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(36px,6vw,64px)", fontWeight: 800, letterSpacing: "-0.035em", color: "var(--ink)", margin: 0, lineHeight: 0.95 } }, "Todo sobre ", /* @__PURE__ */ React.createElement("em", { style: { fontFamily: "Instrument Serif, Georgia, serif", fontStyle: "italic", fontWeight: 400, color: "var(--orange)" } }, "perros"), /* @__PURE__ */ React.createElement("br", null), "que vale la pena leer")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15, color: "var(--ink-2)", maxWidth: 340, lineHeight: 1.65, margin: 0 } }, "Gu\xEDas pr\xE1cticas, historias inspiradoras y todo lo que necesitas saber para vivir bien con tu perro.")), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", maxWidth: 480 } }, /* @__PURE__ */ React.createElement("svg", { style: { position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "var(--ink-2)", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "8" }), /* @__PURE__ */ React.createElement("path", { d: "m21 21-4.35-4.35" })), /* @__PURE__ */ React.createElement(
    "input",
    {
      ref: inputRef,
      value: q,
      onChange: (e) => setQ(e.target.value),
      placeholder: "Buscar art\xEDculos...",
      style: { width: "100%", padding: "13px 16px 13px 44px", borderRadius: 14, border: "1.5px solid var(--line)", background: "var(--bg)", fontFamily: "inherit", fontSize: 15, color: "var(--ink)", outline: "none", transition: "border-color .15s" },
      onFocus: (e) => e.target.style.borderColor = "var(--orange)",
      onBlur: (e) => e.target.style.borderColor = "var(--line)"
    }
  ), q && /* @__PURE__ */ React.createElement("button", { onClick: () => setQ(""), style: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--ink-2)", fontSize: 18, lineHeight: 1 } }, "\xD7"))), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid var(--line)", overflowX: "auto", scrollbarWidth: "none" } }, /* @__PURE__ */ React.createElement("div", { className: "container", style: { display: "flex", gap: 4, padding: "10px 0" } }, BLOG_CATS.map((c) => {
    const m = c === "todos" ? { label: "Todos", color: "var(--orange)", bg: "rgba(245,130,32,0.1)" } : CAT_META[c];
    const active = cat === c;
    return /* @__PURE__ */ React.createElement("button", { key: c, onClick: () => setCat(c), style: { padding: "7px 16px", borderRadius: 999, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: active ? 700 : 500, whiteSpace: "nowrap", background: active ? m.color : "transparent", color: active ? "#fff" : "var(--ink-2)", transition: "all .15s" } }, m.label);
  })))), /* @__PURE__ */ React.createElement("div", { className: "container", style: { padding: "40px 0 80px" } }, filtered.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "60px 0", color: "var(--ink-2)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 48, marginBottom: 12 } }, "\u{1F43E}"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 16 } }, 'No se encontraron art\xEDculos para "', /* @__PURE__ */ React.createElement("strong", null, q), '"')), featured && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 40 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--ink-2)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 } }, "Destacado"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)", gap: 0, background: "var(--paper)", borderRadius: 24, overflow: "hidden", boxShadow: "0 4px 32px -8px rgba(45,36,33,0.14)", cursor: "pointer" }, onClick: () => onSelect(featured) }, /* @__PURE__ */ React.createElement("div", { style: { minHeight: 320 } }, /* @__PURE__ */ React.createElement(ArticleHero, { art: featured, compact: false })), /* @__PURE__ */ React.createElement("div", { style: { padding: "36px 36px 36px 32px", display: "flex", flexDirection: "column", justifyContent: "center" } }, /* @__PURE__ */ React.createElement(CatPill, { cat: featured.cat }), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)", margin: "16px 0 12px", lineHeight: 1.18, textWrap: "pretty" } }, featured.title), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.65, margin: "0 0 24px", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" } }, featured.lead), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "var(--ink-soft)" } }, featured.date, " \xB7 ", featured.read, " min"), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 999, background: "var(--orange)", color: "#fff", fontSize: 13, fontWeight: 700, marginLeft: "auto" } }, "Leer art\xEDculo", /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14M13 5l7 7-7 7" }))))))), rest.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 } }, rest.map((art) => /* @__PURE__ */ React.createElement(ArticleCard, { key: art.id, art, onClick: onSelect })))));
}
function ArticleReader({ art, onBack }) {
  const related = useMemo(
    () => BLOG.filter((a) => a.id !== art.id && (a.cat === art.cat || (a.tags || []).some((t) => (art.tags || []).includes(t)))).slice(0, 3),
    [art]
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [art.id]);
  const cat = CAT_META[art.cat] || {};
  const lang = (typeof LangContext !== "undefined" && React.useContext(LangContext) || {}).lang || "es";
  const [ageSel, setAgeSel] = useState("dog-medium");
  const [shareMsg, setShareMsg] = useState("");
  const shareUrl = "https://bpuppy.us/blog?art=" + art.id;
  const shareText = art.title;
  const flash = (m) => {
    setShareMsg(m);
    setTimeout(() => setShareMsg(""), 4e3);
  };
  const doShare = async (net) => {
    if (net === "whatsapp") {
      window.open("https://wa.me/?text=" + encodeURIComponent(shareText + " " + shareUrl), "_blank");
      return;
    }
    if (net === "facebook") {
      window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareUrl), "_blank");
      return;
    }
    if (net === "copy") {
      try {
        await navigator.clipboard.writeText(shareUrl);
        flash("Link copiado.");
      } catch (e) {
        flash(shareUrl);
      }
      return;
    }
    if (net === "instagram" || net === "tiktok") {
      if (navigator.share) {
        try {
          await navigator.share({ title: shareText, text: shareText, url: shareUrl });
          return;
        } catch (e) {
          if (e && e.name === "AbortError") return;
        }
      }
      try {
        await navigator.clipboard.writeText(shareUrl);
      } catch (e) {
      }
      const app = net === "instagram" ? "Instagram" : "TikTok";
      flash("Link copiado. \xC1bre " + app + " y p\xE9galo en tu historia \u2014 saldr\xE1 con la foto del art\xEDculo.");
      window.open(net === "instagram" ? "https://www.instagram.com/" : "https://www.tiktok.com/", "_blank");
      return;
    }
  };
  const SHARE_ICONS = {
    whatsapp: /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.16c-.25.69-1.45 1.32-1.99 1.36-.53.04-1.03.23-3.47-.72-2.92-1.15-4.79-4.12-4.94-4.31-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.26-.29.57-.36.76-.36l.55.01c.18 0 .42-.07.65.5.25.6.84 2.07.91 2.22.07.15.12.32.02.51-.1.19-.15.32-.29.49-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.35 1.46.29.15.46.12.63-.07.17-.19.73-.85.92-1.14.19-.29.39-.24.65-.15.26.1 1.67.79 1.96.93.29.15.48.22.55.34.07.12.07.69-.18 1.38z" })),
    facebook: /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" })),
    instagram: /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React.createElement("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5.5" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "4.2" }), /* @__PURE__ */ React.createElement("circle", { cx: "17.5", cy: "6.5", r: "1.2", fill: "currentColor", stroke: "none" })),
    tiktok: /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M16.5 3c.3 2.1 1.6 3.8 3.7 4.1v2.6c-1.2 0-2.4-.3-3.6-.9v6.2c0 3.1-2.5 5.6-5.6 5.6S5.4 18.1 5.4 15s2.5-5.6 5.6-5.6c.3 0 .6 0 .9.1v2.8c-.3-.1-.6-.2-.9-.2-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9 2.9-1.3 2.9-2.9V3h2.6z" })),
    copy: /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M10 13a5 5 0 007.07 0l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" }), /* @__PURE__ */ React.createElement("path", { d: "M14 11a5 5 0 00-7.07 0l-3 3a5 5 0 007.07 7.07l1.71-1.71" }))
  };
  return /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", minHeight: "100vh" } }, /* @__PURE__ */ React.createElement(ReadingBar, null), /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(ArticleHero, { art, compact: false }), /* @__PURE__ */ React.createElement("button", { onClick: onBack, style: { position: "absolute", top: 80, left: 24, display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.92)", border: "none", borderRadius: 999, padding: "8px 16px 8px 12px", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700, color: "var(--ink)", backdropFilter: "blur(12px)", boxShadow: "0 2px 12px rgba(0,0,0,0.12)", zIndex: 10 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M19 12H5M12 19l-7-7 7-7" })), "Blog"), art.img && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 28, left: 28 } }, /* @__PURE__ */ React.createElement(CatPill, { cat: art.cat }))), /* @__PURE__ */ React.createElement("div", { className: "container", style: { maxWidth: 760, padding: "48px 24px 80px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(CatPill, { cat: art.cat }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "var(--ink-soft)" } }, art.date), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "var(--ink-soft)" } }, "\xB7"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "var(--ink-soft)" } }, "\u23F1 ", art.read, " min de lectura")), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(28px,5vw,46px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)", margin: "0 0 12px", lineHeight: 1.1, textWrap: "pretty" } }, art.title), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 16, color: "var(--ink-2)", margin: "0 0 36px", fontWeight: 500 } }, art.sub), art.tags?.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 36 } }, art.tags.map((t) => /* @__PURE__ */ React.createElement("span", { key: t, style: { padding: "4px 12px", borderRadius: 999, background: "var(--paper)", border: "1px solid var(--line)", fontSize: 12, color: "var(--ink-2)", fontWeight: 500 } }, "#", t))), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 19, lineHeight: 1.7, color: "var(--ink)", margin: "0 0 40px", fontWeight: 500, borderLeft: `3px solid ${art.color || "var(--orange)"}`, paddingLeft: 20 } }, art.lead), (art.body || []).map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { marginBottom: 32 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 10px" } }, s.h), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 16, lineHeight: 1.8, color: "var(--ink-2)", margin: 0 } }, s.p))), art.widget === "ageChart" && typeof window.AgeHumanChart === "function" && (() => {
    const opts = [
      { id: "dog-small", label: "Perro peque\xF1o", species: "dog", size: "small", lifespan: "14\u201316 a\xF1os" },
      { id: "dog-medium", label: "Perro mediano", species: "dog", size: "medium", lifespan: "11\u201313 a\xF1os" },
      { id: "dog-large", label: "Perro grande", species: "dog", size: "large", lifespan: "9\u201312 a\xF1os" },
      { id: "dog-giant", label: "Perro gigante", species: "dog", size: "giant", lifespan: "7\u201310 a\xF1os" },
      { id: "cat", label: "Gato", species: "cat", size: "small", lifespan: "14\u201316 a\xF1os" }
    ];
    const sel = opts.find((o) => o.id === ageSel) || opts[1];
    return /* @__PURE__ */ React.createElement("div", { style: { margin: "36px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 } }, opts.map((o) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: o.id,
        onClick: () => setAgeSel(o.id),
        style: { padding: "7px 14px", borderRadius: 999, border: `1.5px solid ${ageSel === o.id ? "var(--orange)" : "var(--line)"}`, background: ageSel === o.id ? "var(--orange)" : "transparent", color: ageSel === o.id ? "#fff" : "var(--ink-2)", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }
      },
      o.label
    ))), React.createElement(window.AgeHumanChart, { species: sel.species, size: sel.size, lifespan: sel.lifespan, lang }));
  })(), art.stat && /* @__PURE__ */ React.createElement("div", { style: { margin: "40px 0", padding: "24px 28px", borderRadius: 18, background: `${art.color || "var(--orange)"}12`, borderLeft: `4px solid ${art.color || "var(--orange)"}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: art.color || "var(--orange)", marginBottom: 8 } }, "Dato importante"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15.5, lineHeight: 1.65, color: "var(--ink)", margin: 0, fontWeight: 500 } }, art.stat)), art.tips?.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { margin: "36px 0", padding: "24px 28px", borderRadius: 18, background: "var(--paper)", boxShadow: "0 2px 16px rgba(45,36,33,0.07)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: "var(--ink)", marginBottom: 14 } }, "\u{1F4A1} Consejos pr\xE1cticos"), /* @__PURE__ */ React.createElement("ul", { style: { margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 } }, art.tips.map((tip, i) => /* @__PURE__ */ React.createElement("li", { key: i, style: { display: "flex", gap: 10, fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-2)" } }, /* @__PURE__ */ React.createElement("span", { style: { color: art.color || "var(--orange)", fontWeight: 700, flexShrink: 0 } }, "\u2192"), tip)))), art.close && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 16.5, lineHeight: 1.75, color: "var(--ink)", margin: "32px 0 0", fontStyle: "italic", fontFamily: "Instrument Serif, Georgia, serif" } }, art.close), /* @__PURE__ */ React.createElement("div", { style: { margin: "48px 0 0", padding: "24px", borderRadius: 16, background: "var(--paper)", boxShadow: "0 1px 8px rgba(45,36,33,0.06)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 700, color: "var(--ink)", marginRight: "auto" } }, "\xBFTe fue \xFAtil? Comp\xE1rtelo"), [
    { id: "whatsapp", label: "WhatsApp", color: "#25D366" },
    { id: "facebook", label: "Facebook", color: "#1877F2" },
    { id: "instagram", label: "Instagram", color: "#E1306C" },
    { id: "tiktok", label: "TikTok", color: "var(--ink)" },
    { id: "copy", label: "Copiar link", color: "var(--ink-2)" }
  ].map((s) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: s.id,
      onClick: () => doShare(s.id),
      "aria-label": s.label,
      style: { padding: "8px 14px", borderRadius: 10, border: "none", background: "var(--bg)", color: s.color, fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 7 }
    },
    SHARE_ICONS[s.id],
    " ",
    s.label
  ))), shareMsg && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 12, fontSize: 12.5, color: "var(--ink-2)", background: "var(--bg)", borderRadius: 10, padding: "9px 13px" } }, shareMsg))), related.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { background: "var(--paper)", borderTop: "1px solid var(--line)", padding: "48px 0 64px" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 24px" } }, "Art\xEDculos relacionados"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20 } }, related.map((a) => /* @__PURE__ */ React.createElement(ArticleCard, { key: a.id, art: a, onClick: onBack.constructor === Function ? () => {
  } : onBack, featured: false }))))));
}
function BlogApp({ initialArtId, onHero }) {
  const [selected, setSelected] = useState(
    () => initialArtId ? BLOG.find((a) => a.id === initialArtId) || null : null
  );
  useEffect(() => {
    const set = (sel, attr, val) => {
      const m = document.querySelector(sel);
      if (m) m.setAttribute(attr, val);
    };
    if (onHero) onHero(!!(selected && selected.img));
    if (selected) {
      const desc = (selected.sub || selected.lead || "").slice(0, 158);
      document.title = selected.title + " | BPuppy";
      set('meta[name="description"]', "content", desc);
      set('meta[property="og:title"]', "content", selected.title + " | BPuppy");
      set('meta[property="og:description"]', "content", desc);
      set('link[rel="canonical"]', "href", "https://bpuppy.us/blog?art=" + selected.id);
      set('meta[property="og:url"]', "content", "https://bpuppy.us/blog?art=" + selected.id);
      if (selected.img) {
        const imgUrl = /^https?:/.test(selected.img) ? selected.img : "https://bpuppy.us/" + String(selected.img).replace(/^\//, "");
        set('meta[property="og:image"]', "content", imgUrl);
        set('meta[name="twitter:image"]', "content", imgUrl);
        set('meta[name="twitter:card"]', "content", "summary_large_image");
      }
    } else {
      document.title = "Blog de Mascotas: Cuidado, Razas y Salud | BPuppy";
      set('link[rel="canonical"]', "href", "https://bpuppy.us/blog");
      set('meta[property="og:url"]', "content", "https://bpuppy.us/blog");
    }
  }, [selected]);
  const handleSelect = (art) => {
    setSelected(art);
    window.scrollTo({ top: 0 });
  };
  const handleBack = () => {
    setSelected(null);
    window.scrollTo({ top: 0 });
  };
  if (selected) {
    return /* @__PURE__ */ React.createElement(ArticleReader, { art: selected, onBack: handleBack });
  }
  return /* @__PURE__ */ React.createElement(BlogListing, { onSelect: handleSelect });
}
Object.assign(window, { BlogApp, BlogListing, ArticleReader, ArticleCard, ArticleHero, CatPill, ReadingBar });

})();
