(function(){
function About() {
  const t = useT();
  const { lang } = useLang();
  const S = STRINGS.about;
  const storyVid = lang === "es" ? "qW0jwJeNrPk" : "YImasdUtIrI";
  return /* @__PURE__ */ React.createElement("section", { className: "sec about", id: "about" }, /* @__PURE__ */ React.createElement("div", { className: "container about-grid" }, /* @__PURE__ */ React.createElement("div", { className: "about-copy reveal" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, t(S.eyebrow)), /* @__PURE__ */ React.createElement("h2", { className: "display about-title" }, t(S.title_a), " ", /* @__PURE__ */ React.createElement("em", { className: "serif-italic" }, t(S.title_b)), " ", t(S.title_c)), /* @__PURE__ */ React.createElement("p", { className: "about-lead" }, t(S.sub)), /* @__PURE__ */ React.createElement("p", { className: "about-p" }, t(S.p1)), /* @__PURE__ */ React.createElement("div", { className: "about-stats" }, [["s1n", "s1l"], ["s2n", "s2l"], ["s4n", "s4l"]].map(
    ([n, l]) => /* @__PURE__ */ React.createElement("div", { key: n, className: "about-stat" }, /* @__PURE__ */ React.createElement("div", { className: "about-stat-n display" }, t(S[n])), /* @__PURE__ */ React.createElement("div", { className: "about-stat-l" }, t(S[l])))
  )), /* @__PURE__ */ React.createElement("a", { href: "/nosotros?tab=historia", className: "btn btn-dark", style: { marginTop: 28 } }, t(["Conocer m\xE1s sobre nuestra historia", "Learn more about our story"]), /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14M13 5l7 7-7 7" })))), /* @__PURE__ */ React.createElement("div", { className: "about-video reveal" }, /* @__PURE__ */ React.createElement("div", { className: "about-video-frame", style: { borderRadius: 20, overflow: "hidden", aspectRatio: "9/16", position: "relative", maxWidth: 340, margin: "0 auto", boxShadow: "0 12px 48px rgba(0,0,0,0.14)" } }, /* @__PURE__ */ React.createElement(
    "iframe",
    {
      src: "https://www.youtube.com/embed/" + storyVid + "?rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=" + (lang === "es" ? "es" : "en"),
      title: "Qui\xE9nes somos \u2014 BPuppy",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowFullScreen: true,
      style: { position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }
    }
  )))));
}
function Promise_() {
  const t = useT();
  const S = STRINGS.promise;
  return /* @__PURE__ */ React.createElement("section", { className: "sec promise", id: "promise" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head reveal" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow", style: { color: "rgb(245, 130, 32)" } }, t(S.eyebrow)), /* @__PURE__ */ React.createElement("h2", { className: "display" }, t(S.title_a), " ", /* @__PURE__ */ React.createElement("em", { className: "serif-italic" }, t(S.title_b)))), /* @__PURE__ */ React.createElement("p", null, t(S.sub))), /* @__PURE__ */ React.createElement("div", { className: "promise-grid" }, S.pillars.map(
    (p, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "promise-card reveal", style: { transitionDelay: `${i * 70}ms` } }, /* @__PURE__ */ React.createElement("div", { className: "promise-num" }, String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("h3", { className: "promise-t" }, t(p.t)), /* @__PURE__ */ React.createElement("p", { className: "promise-d" }, t(p.d)))
  ))));
}
const IG_PHOTOS = [
  "fotos-raw/p01.jpg",
  "fotos-raw/p02.webp",
  "fotos-raw/p03.webp",
  "fotos-raw/p04.webp",
  "fotos-raw/p05.webp",
  "fotos-raw/p07.webp",
  "fotos-raw/p08.webp",
  "fotos-raw/p09.webp"
];
function InstagramFeed() {
  React.useEffect(() => {
    const d = document;
    if (!d.querySelector('script[src="https://w.behold.so/widget.js"]')) {
      const s = d.createElement("script");
      s.type = "module";
      s.src = "https://w.behold.so/widget.js";
      d.head.append(s);
    }
  }, []);
  const t = useT();
  const S = STRINGS.ig;
  return /* @__PURE__ */ React.createElement("section", { className: "sec ig", id: "instagram" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head reveal" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, t(S.eyebrow)), /* @__PURE__ */ React.createElement("h2", { className: "display" }, t(S.title_a), " ", /* @__PURE__ */ React.createElement("em", { className: "serif-italic" }, t(S.title_b)))), /* @__PURE__ */ React.createElement("p", null, t(S.sub))), /* @__PURE__ */ React.createElement("behold-widget", { "feed-id": "I1sGxevsYp04jFScVaVy" }), /* @__PURE__ */ React.createElement("div", { className: "ig-cta reveal", style: { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("a", { href: "https://instagram.com/bpuppyus", target: "_blank", rel: "noreferrer", className: "btn btn-ghost", style: { gap: 8 } }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M16.5 7.5h.01" }), /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "5" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "4" })), "Instagram \xB7 @bpuppy.us"), /* @__PURE__ */ React.createElement("a", { href: "https://www.tiktok.com/@bpuppy.us", target: "_blank", rel: "noreferrer", className: "btn btn-ghost", style: { gap: 8 } }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.78a4.85 4.85 0 01-1.07-.09z" })), "TikTok \xB7 @bpuppy.us"), /* @__PURE__ */ React.createElement("a", { href: "https://youtube.com/@bpuppy", target: "_blank", rel: "noreferrer", className: "btn btn-ghost", style: { gap: 8 } }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" })), "YouTube \xB7 @bpuppy"))));
}
const FAM_DOTS = [
  { x: 19, y: 38, year: 2024, name: "Seattle, WA" },
  { x: 14, y: 50, year: 2024, name: "Portland, OR" },
  { x: 14, y: 60, year: 2025, name: "San Francisco, CA" },
  { x: 18, y: 70, year: 2025, name: "Los Angeles, CA" },
  { x: 28, y: 64, year: 2024, name: "Las Vegas, NV" },
  { x: 32, y: 70, year: 2025, name: "Phoenix, AZ" },
  { x: 40, y: 50, year: 2024, name: "Denver, CO" },
  { x: 50, y: 75, year: 2025, name: "Houston, TX" },
  { x: 47, y: 70, year: 2024, name: "Dallas, TX" },
  { x: 55, y: 50, year: 2024, name: "Kansas City, MO" },
  { x: 62, y: 40, year: 2025, name: "Chicago, IL" },
  { x: 60, y: 70, year: 2025, name: "Nashville, TN" },
  { x: 67, y: 78, year: 2024, name: "Atlanta, GA" },
  { x: 78, y: 88, year: 2025, name: "Miami, FL" },
  { x: 76, y: 80, year: 2024, name: "Orlando, FL" },
  { x: 80, y: 60, year: 2025, name: "Charlotte, NC" },
  { x: 86, y: 48, year: 2024, name: "Washington, DC" },
  { x: 88, y: 38, year: 2025, name: "New York, NY" },
  { x: 92, y: 32, year: 2024, name: "Boston, MA" },
  { x: 84, y: 42, year: "next", name: "Philadelphia, PA" },
  { x: 30, y: 82, year: "next", name: "San Antonio, TX" },
  { x: 70, y: 62, year: "next", name: "Raleigh, NC" }
];
function FamiliesMap() {
  const t = useT();
  const S = STRINGS.fmap;
  const [active, setActive] = React.useState(null);
  return /* @__PURE__ */ React.createElement("section", { className: "sec fmap", id: "map" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head reveal" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, t(S.eyebrow)), /* @__PURE__ */ React.createElement("h2", { className: "display" }, t(S.title_a), " ", /* @__PURE__ */ React.createElement("em", { className: "serif-italic" }, t(S.title_b)))), /* @__PURE__ */ React.createElement("p", null, t(S.sub))), /* @__PURE__ */ React.createElement("div", { className: "fmap-card reveal" }, /* @__PURE__ */ React.createElement("div", { className: "fmap-stage" }, /* @__PURE__ */ React.createElement("svg", { className: "fmap-bg", viewBox: "0 0 1000 600", preserveAspectRatio: "xMidYMid meet", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: "fmGrad", x1: "0", y1: "0", x2: "1", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "0%", stopColor: "var(--accent-2)", stopOpacity: "0.55" }), /* @__PURE__ */ React.createElement("stop", { offset: "100%", stopColor: "var(--accent-2)", stopOpacity: "0.18" }))), /* @__PURE__ */ React.createElement(
    "path",
    {
      d: "M 80 230 Q 110 180 170 175 Q 220 165 260 200 Q 305 175 340 195 Q 380 170 420 190 Q 470 165 510 195 Q 560 170 610 200 Q 660 180 720 210 Q 780 200 830 240 Q 880 270 905 320 Q 920 360 905 400 Q 890 440 850 470 Q 800 500 740 510 Q 680 525 620 520 Q 560 535 500 525 Q 440 540 380 525 Q 320 530 265 510 Q 210 495 165 460 Q 120 425 95 380 Q 70 330 80 280 Z",
      fill: "url(#fmGrad)",
      stroke: "var(--ink)",
      strokeOpacity: "0.10",
      strokeWidth: "1.5"
    }
  ), /* @__PURE__ */ React.createElement("g", { stroke: "var(--ink)", strokeOpacity: "0.05", strokeWidth: "1", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M 280 200 L 300 510" }), /* @__PURE__ */ React.createElement("path", { d: "M 430 195 L 440 530" }), /* @__PURE__ */ React.createElement("path", { d: "M 560 200 L 560 525" }), /* @__PURE__ */ React.createElement("path", { d: "M 700 215 L 720 515" }), /* @__PURE__ */ React.createElement("path", { d: "M 100 320 L 900 350" }))), FAM_DOTS.map((d, i) => {
    const cls = d.year === "next" ? "next" : d.year === 2025 ? "y25" : "y24";
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: i,
        type: "button",
        className: `fmap-dot fmap-dot-${cls} ${active === i ? "is-active" : ""}`,
        style: { left: `${d.x}%`, top: `${d.y}%`, animationDelay: `${i * 0.12}s` },
        onMouseEnter: () => setActive(i),
        onMouseLeave: () => setActive(null),
        onFocus: () => setActive(i),
        onBlur: () => setActive(null),
        "aria-label": d.name
      },
      /* @__PURE__ */ React.createElement("span", { className: "fmap-pulse" }),
      /* @__PURE__ */ React.createElement("span", { className: "fmap-tooltip" }, d.name)
    );
  })), /* @__PURE__ */ React.createElement("div", { className: "fmap-legend" }, /* @__PURE__ */ React.createElement("span", { className: "fmap-leg-item" }, /* @__PURE__ */ React.createElement("span", { className: "fmap-sw fmap-sw-y24" }), t(S.legend1)), /* @__PURE__ */ React.createElement("span", { className: "fmap-leg-item" }, /* @__PURE__ */ React.createElement("span", { className: "fmap-sw fmap-sw-y25" }), t(S.legend2)), /* @__PURE__ */ React.createElement("span", { className: "fmap-leg-item" }, /* @__PURE__ */ React.createElement("span", { className: "fmap-sw fmap-sw-next" }), t(S.legend3))))));
}
function FAQ() {
  const t = useT();
  const S = STRINGS.faq;
  const [open, setOpen] = React.useState(0);
  return /* @__PURE__ */ React.createElement("section", { className: "sec faq", id: "faq" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head reveal" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, t(S.eyebrow)), /* @__PURE__ */ React.createElement("h2", { className: "display" }, t(S.title_a), " ", /* @__PURE__ */ React.createElement("em", { className: "serif-italic" }, t(S.title_b)))), /* @__PURE__ */ React.createElement("p", null, t(S.sub))), /* @__PURE__ */ React.createElement("div", { className: "faq-list reveal" }, S.items.map((it, i) => {
    const isOpen = open === i;
    return /* @__PURE__ */ React.createElement("div", { key: i, className: `faq-item ${isOpen ? "is-open" : ""}` }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "faq-q",
        onClick: () => setOpen(isOpen ? -1 : i),
        "aria-expanded": isOpen
      },
      /* @__PURE__ */ React.createElement("span", { className: "faq-num" }, String(i + 1).padStart(2, "0")),
      /* @__PURE__ */ React.createElement("span", { className: "faq-q-text" }, t(it.q)),
      /* @__PURE__ */ React.createElement("span", { className: "faq-icon", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", width: "22", height: "22", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M6 9l6 6 6-6" })))
    ), /* @__PURE__ */ React.createElement("div", { className: "faq-a-wrap" }, /* @__PURE__ */ React.createElement("div", { className: "faq-a" }, t(it.a))));
  }))));
}
Object.assign(window, { About, Promise_, InstagramFeed, FamiliesMap, FAQ });

})();
