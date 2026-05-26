(function(){
function Hero() {
  const t = useT();
  const videoRef = React.useRef();
  const [pups, setPups] = React.useState(null);
  React.useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
    if (window.bpPuppies) window.bpPuppies("available", 3).then(function (l) { setPups(l || []); }).catch(function () {});
  }, []);
  const heroPills = (pups && pups.length) ? pups.slice(0, 3).map(function (p, i) {
    return /* @__PURE__ */ React.createElement("a", { key: p.id || i, href: "/cachorros", className: "float-pill", style: { textDecoration: "none", color: "inherit", cursor: "pointer" } },
      p.photo_url
        ? /* @__PURE__ */ React.createElement("div", { className: "av", style: { overflow: "hidden", padding: 0 } }, /* @__PURE__ */ React.createElement("img", { src: p.photo_url, alt: p.name || "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }))
        : /* @__PURE__ */ React.createElement("div", { className: "av" }, "\u{1F436}"),
      /* @__PURE__ */ React.createElement("div", null,
        /* @__PURE__ */ React.createElement("div", null, p.name || p.breed || "Cachorro"),
        /* @__PURE__ */ React.createElement("div", { className: "meta" }, [p.breed, p.age_weeks ? (p.age_weeks + " " + t(["sem", "wk"])) : null].filter(Boolean).join(" · "))));
  }) : [
    /* @__PURE__ */ React.createElement("div", { className: "float-pill", key: "s1" }, /* @__PURE__ */ React.createElement("div", { className: "av" }, "\u{1F436}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", null, t(STRINGS.hero.pill1n)), /* @__PURE__ */ React.createElement("div", { className: "meta" }, t(STRINGS.hero.pill1m)))),
    /* @__PURE__ */ React.createElement("div", { className: "float-pill", key: "s2" }, /* @__PURE__ */ React.createElement("div", { className: "av" }, "\u{1F415}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", null, t(STRINGS.hero.pill2n)), /* @__PURE__ */ React.createElement("div", { className: "meta" }, t(STRINGS.hero.pill2m)))),
    /* @__PURE__ */ React.createElement("div", { className: "float-pill", key: "s3" }, /* @__PURE__ */ React.createElement("div", { className: "av" }, "\u{1F9B4}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", null, t(STRINGS.hero.pill3n)), /* @__PURE__ */ React.createElement("div", { className: "meta" }, t(STRINGS.hero.pill3m))))
  ];
  return /* @__PURE__ */ React.createElement("section", { className: "hero", id: "top" },
    /* @__PURE__ */ React.createElement("video", { ref: videoRef, className: "hero-video", "aria-hidden": "true", autoPlay: true, loop: true, muted: true, playsInline: true, preload: "auto" }, /* @__PURE__ */ React.createElement("source", { src: "uploads/Family LR.mp4", type: "video/mp4" })),
    /* @__PURE__ */ React.createElement("div", { className: "hero-veil" }),
    /* @__PURE__ */ React.createElement("div", { className: "hero-grain" }),
    /* @__PURE__ */ React.createElement("div", { className: "float-pills", "aria-hidden": (pups && pups.length) ? void 0 : "true" }, heroPills),
    /* @__PURE__ */ React.createElement("div", { className: "container hero-inner" },
      /* @__PURE__ */ React.createElement("div", null,
        /* @__PURE__ */ React.createElement("div", { className: "hero-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "live" }, t(STRINGS.hero.live)), /* @__PURE__ */ React.createElement("span", { className: "dot" }), t(STRINGS.hero.eyebrow)),
        /* @__PURE__ */ React.createElement("h1", null, t(STRINGS.hero.title_a), " ", /* @__PURE__ */ React.createElement("em", null, t(STRINGS.hero.title_b)), " ", t(STRINGS.hero.title_c)),
        /* @__PURE__ */ React.createElement("p", { className: "sub" }, t(STRINGS.hero.sub)),
        /* @__PURE__ */ React.createElement("div", { className: "hero-cta-row" },
          /* @__PURE__ */ React.createElement("a", { href: "/solicitud", className: "btn btn-primary" }, t(STRINGS.hero.cta1), /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14M13 5l7 7-7 7" }))),
          /* @__PURE__ */ React.createElement("a", { href: "#quiz", className: "btn btn-ghost" }, t(STRINGS.hero.cta2)))),
      /* @__PURE__ */ React.createElement("div", { className: "hero-stats" },
        /* @__PURE__ */ React.createElement("div", { className: "stat" }, /* @__PURE__ */ React.createElement("div", { className: "n" }, t(STRINGS.hero.stat1n)), /* @__PURE__ */ React.createElement("div", { className: "l" }, t(STRINGS.hero.stat1l))),
        /* @__PURE__ */ React.createElement("div", { className: "stat" }, /* @__PURE__ */ React.createElement("div", { className: "n" }, t(STRINGS.hero.stat2n)), /* @__PURE__ */ React.createElement("div", { className: "l" }, t(STRINGS.hero.stat2l))),
        /* @__PURE__ */ React.createElement("div", { className: "stat" }, /* @__PURE__ */ React.createElement("div", { className: "n" }, "★ ", t(STRINGS.hero.stat3n)), /* @__PURE__ */ React.createElement("div", { className: "l" }, t(STRINGS.hero.stat3l))))),
    /* @__PURE__ */ React.createElement("div", { className: "hero-scroll", "aria-hidden": "true" }, t(STRINGS.hero.scroll), /* @__PURE__ */ React.createElement("div", { className: "line" })));
}
Object.assign(window, { Hero });

})();
