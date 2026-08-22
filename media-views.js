(function(){
const MC = {
  // Dark hero theme
  hero: "#040C1E",
  heroBorder: "rgba(255,255,255,0.09)",
  heroText: "#F0EEF8",
  heroMuted: "rgba(240,238,248,0.55)",
  heroSoft: "rgba(240,238,248,0.28)",
  heroSurface: "rgba(255,255,255,0.05)",
  // Light sections
  bg: "#FAFAF8",
  bg2: "#F2F0EB",
  surface: "#FFFFFF",
  border: "rgba(0,0,0,0.07)",
  borderStrong: "rgba(0,0,0,0.14)",
  // Accents
  brand: "#FF5520",
  rose: "#E83060",
  ice: "#4AB8FF",
  grad: "linear-gradient(135deg,#FF5520,#E83060)",
  glow: "0 8px 32px rgba(255,85,32,0.35)",
  // Text
  ink: "#0E0C14",
  ink2: "#5C5870",
  soft: "#A8A4B8"
};
// OJO: esto tenia un fallo que dejaba secciones enteras INVISIBLES para siempre.
// El observador se enganchaba una sola vez al montar, pero algunas secciones (Noticias)
// devuelven null en ese primer render mientras piden sus datos: ref.current era null,
// no habia nada que observar, y cuando los datos llegaban la seccion se quedaba con
// opacity 0 aunque estuviera entera en el DOM (54 enlaces clicables sobre un vacio blanco).
// Ahora se reintenta hasta que exista el elemento y, si nunca aparece, se enseña igual:
// jamas se esconde contenido por una animacion que no llego a engancharse.
function useReveal() {
  const ref = React.useRef(null);
  // Arranca VISIBLE a proposito. La animacion de entrada es un adorno; que una seccion
  // entera (Noticias, 54 enlaces) se quedara invisible por depender de un observador o de
  // un temporizador que pueden no dispararse, no lo es. Si el observador funciona, la
  // animacion se ve igual en las secciones que aun no se han alcanzado.
  const [visible, setVisible] = React.useState(true);
  React.useEffect(function() {
    let obs = null, vivo = true, intentos = 0;
    const enganchar = function() {
      if (!vivo) return;
      if (!ref.current) {
        if (intentos++ < 40) { setTimeout(enganchar, 100); return; }
        setVisible(true);
        return;
      }
      obs = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      }, { threshold: 0.1 });
      obs.observe(ref.current);
    };
    enganchar();
    // RED DE SEGURIDAD: pase lo que pase con el observador (pestaña en segundo plano,
    // navegador que no lo soporta, seccion mas alta que la pantalla...), a los 1,2 s la
    // seccion se enseña. Una animacion NUNCA debe dejar contenido escondido.
    const red = setTimeout(function() { if (vivo) setVisible(true); }, 1200);
    return function() {
      vivo = false;
      clearTimeout(red);
      if (obs) obs.disconnect();
    };
  }, []);
  return [ref, visible];
}
function MediaApp({ visibility = {} }) {
  const v = visibility;
  return /* @__PURE__ */ React.createElement("div", { style: { background: MC.bg, color: MC.ink, fontFamily: "Plus Jakarta Sans, sans-serif", paddingTop: 80 } }, v.hero !== false && /* @__PURE__ */ React.createElement(MediaHero, null), v.entrevistas !== false && /* @__PURE__ */ React.createElement(InterviewsSection, null), v.news !== false && /* @__PURE__ */ React.createElement(NewsSection, null), v.podcast !== false && /* @__PURE__ */ React.createElement(PodcastSection, null), v.aipods !== false && /* @__PURE__ */ React.createElement(AIPodcastsSection, null), v.videos !== false && /* @__PURE__ */ React.createElement(VideosSection, null), v.cta !== false && /* @__PURE__ */ React.createElement(MediaFooterCTA, null));
}
function MediaHero() {
  const t = useT();
  const [feat, setFeat] = React.useState("M4D398WTPb0");
  const EPISODES = [
    { id: "m5zU7U34GC0", title: ["Mejores Días", "Best Days"], tag: ["Comercial", "Commercial"] },
    { id: "M4D398WTPb0", title: ["The Girl \u2014 Comercial", "The Girl \u2014 Commercial"], tag: ["Nuevo", "New"] },
    { id: t(["qW0jwJeNrPk", "YImasdUtIrI"]), title: ["Nuestra historia (corto)", "Our story (short)"], tag: ["Historia", "Story"] }
  ];
  const chars = [
    { c: "B", outline: false, stroke: null, dur: 5.8, delay: 0 },
    { c: "M", outline: true, stroke: "rgba(255,255,255,0.38)", dur: 6.5, delay: -0.9 },
    { c: "E", outline: false, stroke: null, dur: 5.3, delay: -1.7 },
    { c: "D", outline: false, stroke: null, dur: 7.1, delay: -2.4 },
    { c: "I", outline: true, stroke: "rgba(255,85,32,0.7)", dur: 5.6, delay: -0.5 },
    { c: "A", outline: false, stroke: null, dur: 6.3, delay: -3.2 }
  ];
  return /* @__PURE__ */ React.createElement("section", { style: { minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", background: MC.hero } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.012) 3px,rgba(255,255,255,0.012) 4px)", pointerEvents: "none", zIndex: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", borderRadius: "50%", width: "72vw", height: "72vw", background: "radial-gradient(circle,rgba(255,85,32,0.13) 0%,transparent 62%)", top: "-26%", left: "-16%", animation: "orbA 18s ease-in-out infinite", pointerEvents: "none", zIndex: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", borderRadius: "50%", width: "56vw", height: "56vw", background: "radial-gradient(circle,rgba(74,184,255,0.1) 0%,transparent 62%)", bottom: "-14%", right: "-10%", animation: "orbB 22s ease-in-out infinite", pointerEvents: "none", zIndex: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, pointerEvents: "none", userSelect: "none", overflow: "hidden", zIndex: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", fontFamily: "Bricolage Grotesque,sans-serif", fontWeight: 800, fontSize: "clamp(240px,40vw,560px)", lineHeight: 1, top: "-8%", left: "-4%", color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.045)", letterSpacing: "-0.05em", animation: "floatA 13s ease-in-out infinite" } }, "B"), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", fontFamily: "Bricolage Grotesque,sans-serif", fontWeight: 800, fontSize: "clamp(80px,13vw,195px)", lineHeight: 1, bottom: "18%", right: "-1%", color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.032)", letterSpacing: "-0.04em", animation: "floatB 17s ease-in-out infinite" } }, "MEDIA")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "100px clamp(24px,6vw,120px) 40px", position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", marginBottom: 32 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, background: "rgba(255,85,32,0.12)", border: "1px solid rgba(255,85,32,0.3)", borderRadius: 999, padding: "6px 14px 6px 8px" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 8, height: 8, borderRadius: "50%", background: MC.brand, display: "inline-block", boxShadow: "0 0 0 3px rgba(255,85,32,0.25)", animation: "mediaPulse 1.8s ease-in-out infinite" } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MC.brand } }, t(["En Vivo ahora", "Live now"])))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", marginBottom: 32, lineHeight: 0.88, gap: "0.01em" } }, chars.map(function(ch, i) {
    return /* @__PURE__ */ React.createElement("span", { key: i, style: {
      display: "inline-block",
      fontFamily: "Bricolage Grotesque,sans-serif",
      fontWeight: 800,
      fontSize: "clamp(68px,12vw,182px)",
      letterSpacing: "-0.045em",
      lineHeight: 0.88,
      color: ch.outline ? "transparent" : i === 0 ? "#FFFFFF" : MC.heroText,
      WebkitTextStroke: ch.outline ? "2px " + ch.stroke : "none",
      animation: "charFloat " + ch.dur + "s ease-in-out infinite",
      animationDelay: ch.delay + "s"
    } }, ch.c);
  })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-end", maxWidth: 900 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: "clamp(15px,1.4vw,18px)", color: MC.heroMuted, lineHeight: 1.6, margin: 0, maxWidth: "42ch" } }, t(["El mundo de las mascotas en un solo lugar.", "The whole world of pets in one place."])), /* Luis: fuera el boton "Ver ahora", no aporta */ false && /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "#videos",
      style: { display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 999, background: MC.grad, color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none", whiteSpace: "nowrap", boxShadow: MC.glow, transition: "transform .2s, box-shadow .2s" },
      onMouseEnter: function(e) {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 14px 40px rgba(255,85,32,0.5)";
      },
      onMouseLeave: function(e) {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = MC.glow;
      }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React.createElement("polygon", { points: "5 3 19 12 5 21 5 3" })),
    t(["Ver ahora", "Watch now"])
  ))), /* @__PURE__ */ React.createElement("div", { style: { padding: "0 clamp(24px,6vw,120px) 48px", position: "relative", zIndex: 1, display: "flex", gap: 24, flexWrap: "wrap", alignItems: "stretch" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", borderRadius: 20, overflow: "hidden", background: "rgba(255,255,255,0.048)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", flex: "1 1 420px", maxWidth: 700, boxShadow: "0 4px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", aspectRatio: "16/9" } }, /* @__PURE__ */ React.createElement(
    "iframe",
    {
      key: feat,
      src: "https://www.youtube.com/embed/" + feat + "?rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=es",
      title: "BPuppy Media",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowFullScreen: true,
      style: { position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 14, left: 14, background: MC.brand, color: "#fff", fontSize: 10.5, fontWeight: 700, padding: "4px 10px", borderRadius: 6, letterSpacing: "0.06em", textTransform: "uppercase", pointerEvents: "none" } }, t((EPISODES.find(function(e) {
    return e.id === feat;
  }) || EPISODES[0]).tag))), /* @__PURE__ */ React.createElement("div", { style: { padding: "18px 20px 22px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 600, color: MC.brand, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 } }, t(["Episodio destacado", "Featured episode"])), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 700, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 8 } }, t((EPISODES.find(function(e) {
    return e.id === feat;
  }) || EPISODES[0]).title)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "rgba(255,255,255,0.35)" } }, "BPuppy \xB7 2026"))), /* @__PURE__ */ React.createElement("div", { style: { flex: "1 1 300px", maxWidth: 440, borderRadius: 20, background: "rgba(255,255,255,0.048)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", boxShadow: "0 4px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)", padding: "20px 18px", display: "flex", flexDirection: "column", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: MC.brand, letterSpacing: "0.1em", textTransform: "uppercase", margin: "2px 4px 6px" } }, t(["M\xE1s episodios", "More episodes"])), EPISODES.map(function(ep) {
    const sel = ep.id === feat;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: ep.id,
        type: "button",
        onClick: function() {
          setFeat(ep.id);
        },
        style: { display: "flex", alignItems: "center", gap: 14, padding: 10, borderRadius: 14, cursor: "pointer", textAlign: "left", background: "transparent", border: sel ? "1.5px solid " + MC.brand : "1.5px solid rgba(255,255,255,0.08)", transition: "border-color .2s, background .2s" },
        onMouseEnter: function(e) {
          if (!sel) e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        },
        onMouseLeave: function(e) {
          e.currentTarget.style.background = "transparent";
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { position: "relative", width: 96, minWidth: 96, aspectRatio: "16/9", borderRadius: 8, overflow: "hidden", background: "#000" } }, /* @__PURE__ */ React.createElement("img", { src: "https://i.ytimg.com/vi/" + ep.id + "/mqdefault.jpg", alt: t(ep.title), loading: "lazy", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: sel ? 1 : 0.85 } }), /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "rgba(255,255,255,0.92)", style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.6))" } }, /* @__PURE__ */ React.createElement("polygon", { points: "6 3 21 12 6 21 6 3" }))),
      /* @__PURE__ */ React.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: sel ? "#fff" : "rgba(255,255,255,0.78)", lineHeight: 1.3, marginBottom: 3 } }, t(ep.title)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.06em" } }, sel ? t(["Reproduciendo", "Now playing"]) : t(ep.tag)))
    );
  }), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://www.youtube.com/watch?v=" + feat,
      target: "_blank",
      rel: "noopener",
      style: { marginTop: "auto", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px 18px", borderRadius: 999, border: "1.5px solid rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.85)", fontWeight: 700, fontSize: 13, textDecoration: "none", transition: "border-color .2s" },
      onMouseEnter: function(e) {
        e.currentTarget.style.borderColor = MC.brand;
      },
      onMouseLeave: function(e) {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
      }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }), /* @__PURE__ */ React.createElement("polyline", { points: "15 3 21 3 21 9" }), /* @__PURE__ */ React.createElement("line", { x1: "10", y1: "14", x2: "21", y2: "3" })),
    t(["Ver en YouTube", "Watch on YouTube"])
  ))), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid rgba(255,255,255,0.07)", overflow: "hidden", height: 38, display: "flex", alignItems: "center", background: "rgba(0,0,0,0.22)", position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 0, animation: "mediaTicker 26s linear infinite", whiteSpace: "nowrap" } }, [...Array(4)].map(function(_, i) {
    return /* @__PURE__ */ React.createElement("span", { key: i, style: { fontSize: 10.5, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", paddingRight: 72 } }, /* @__PURE__ */ React.createElement("span", { style: { color: MC.brand } }, "\u25C6"), "\xA0", t(["Videos", "Videos"]), " \xA0\xB7\xA0 ", t(["Podcasts", "Podcasts"]), " \xA0\xB7\xA0 ", t(["Entrevistas", "Interviews"]), " \xA0\xB7\xA0 ", t(["Razas", "Breeds"]), " \xA0\xB7\xA0 ", t(["Crianza", "Breeding"]), " \xA0\xB7\xA0 ", t(["Salud", "Health"]), " \xA0\xB7\xA0 ", t(["Adopciones", "Adoptions"]), " \xA0\xB7\xA0 ", t(["Comunidad", "Community"]), " \xA0");
  }))));
}
const COMERCIALES = [
  { id: "M4D398WTPb0", label: ["Comercial 1", "Commercial 1"], color: "#FF5520" },
  { id: "m5zU7U34GC0", label: ["Mejores Días", "Best Days"], color: "#9B6FFF" }
];
function CommercialCard({ item }) {
  const t = useT();
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { background: MC.surface, border: `1px solid ${MC.border}`, borderRadius: 20, overflow: "hidden", transition: "transform .22s, box-shadow .22s" },
      onMouseEnter: function(e) {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = `0 20px 56px rgba(0,0,0,0.11), 0 0 0 1.5px ${item.color}35`;
      },
      onMouseLeave: function(e) {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: { aspectRatio: "16/9", position: "relative" } }, /* @__PURE__ */ React.createElement(
      "iframe",
      {
        src: "https://www.youtube.com/embed/" + item.id + "?rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=es",
        title: "BPuppy " + t(item.label),
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true,
        style: { position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }
      }
    )),
    /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 20px 22px", display: "flex", alignItems: "center", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: `${item.color}15`, border: `1.5px solid ${item.color}30`, display: "grid", placeItems: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: item.color }, /* @__PURE__ */ React.createElement("polygon", { points: "5 3 19 12 5 21 5 3" }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, color: item.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 } }, t(item.label)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 17, fontWeight: 700, color: MC.ink, letterSpacing: "-0.01em" } }, "BPuppy \u2014 ", t(item.label))))
  );
}
function VideosSection() {
  const t = useT();
  const [ref, visible] = useReveal();
  return /* @__PURE__ */ React.createElement("section", { id: "videos", ref, style: { padding: "clamp(80px,10vw,140px) clamp(24px,6vw,120px)", background: MC.bg, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)", transition: "opacity 0.7s ease, transform 0.7s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 56 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: MC.brand, marginBottom: 14 } }, t(["01 \u2014 Videos", "01 \u2014 Videos"])), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(44px,7.5vw,96px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.92, margin: 0, color: MC.ink } }, t(["Comerciales", "Commercials"]), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: MC.soft, fontWeight: 300 } }, "BPuppy"))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(360px,1fr))", gap: 22 } }, COMERCIALES.map(function(item) {
    return /* @__PURE__ */ React.createElement(CommercialCard, { key: item.id, item });
  })));
}
const AI_EPISODES = [
  { n: "048", title: ["Todo sobre el Golden Retriever", "Everything about the Golden Retriever"], guest: ["Dra. Carmen Reyes", "Dr. Carmen Reyes"], dur: "24:38", date: ["12 May 2026", "May 12, 2026"] },
  { n: "047", title: ["Nutricion en cachorros de 0 a 6 meses", "Nutrition for puppies 0 to 6 months"], guest: ["Dr. Miguel Torres", "Dr. Miguel Torres"], dur: "31:15", date: ["5 May 2026", "May 5, 2026"] },
  { n: "046", title: ["Socializacion temprana y sus mitos", "Early socialization and its myths"], guest: ["Ana Delgado", "Ana Delgado"], dur: "19:42", date: ["28 Abr 2026", "Apr 28, 2026"] },
  { n: "045", title: ["Cuando adoptar vs comprar un gatito", "When to adopt vs. buy a kitten"], guest: ["Vet. Luis Perez", "Dr. Luis Perez"], dur: "27:06", date: ["21 Abr 2026", "Apr 21, 2026"] }
];
const LIVE_EPISODES = [
  { n: "L12", title: ["La historia detr\xE1s de BPuppy", "The story behind BPuppy"], guest: ["Equipo BPuppy", "BPuppy Team"], dur: "38:10", date: ["10 May 2026", "May 10, 2026"] },
  { n: "L11", title: ["Criando a Milo: nuestro golden de prueba", "Raising Milo: our test golden"], guest: ["Sofia & Carlos", "Sofia & Carlos"], dur: "45:22", date: ["2 May 2026", "May 2, 2026"] },
  { n: "L10", title: ["Q&A en vivo: sus preguntas, nuestras resp.", "Live Q&A: your questions, our answers"], guest: ["Todo el equipo", "The whole team"], dur: "52:05", date: ["25 Abr 2026", "Apr 25, 2026"] },
  { n: "L09", title: ["Visita al veterinario: la experiencia real", "A vet visit: the real experience"], guest: ["Ana Delgado", "Ana Delgado"], dur: "29:48", date: ["18 Abr 2026", "Apr 18, 2026"] }
];
function AIBanner({ PD }) {
  const t = useT();
  const steps = [
    { icon: "\u25CE", label: ["Generado por IA especializada", "Generated by specialized AI"] },
    { icon: "\u25C8", label: ["Revisado por expertos humanos", "Reviewed by human experts"] },
    { icon: "\u25C9", label: ["Aprobado para ti y tu mascota", "Approved for you and your pet"] }
  ];
  return /* @__PURE__ */ React.createElement("div", { style: { borderRadius: 18, border: "1px solid rgba(74,184,255,0.22)", background: "linear-gradient(130deg,rgba(74,184,255,0.07) 0%,rgba(255,85,32,0.06) 100%)", padding: "36px 32px 32px", marginBottom: 28, position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", right: -8, top: -16, fontFamily: "Bricolage Grotesque,sans-serif", fontWeight: 800, fontSize: 140, lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(74,184,255,0.07)", letterSpacing: "-0.04em", pointerEvents: "none", userSelect: "none" } }, "IA"), /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(74,184,255,0.1)", border: "1px solid rgba(74,184,255,0.28)", borderRadius: 999, padding: "5px 13px 5px 9px", marginBottom: 22 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: MC.ice, display: "inline-block", boxShadow: `0 0 0 2px rgba(74,184,255,0.25)` } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: MC.ice } }, t(["IA Generado \xB7 Curado por Humanos", "AI Generated \xB7 Human Curated"]))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-0.035em", lineHeight: 1, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("span", { style: { color: PD.text, display: "block" } }, t(["IA de \xFAltima generaci\xF3n.", "Next-generation AI."])), /* @__PURE__ */ React.createElement("span", { style: { color: "transparent", WebkitTextStroke: "2px rgba(74,184,255,0.55)", display: "block" } }, t(["Coraz\xF3n 100% humano.", "100% human heart."]))), /* @__PURE__ */ React.createElement("p", { style: { fontSize: "clamp(14px,1.3vw,16px)", color: PD.muted, lineHeight: 1.65, margin: "0 0 28px", maxWidth: "58ch" } }, t(["Nuestros top podcasts son producidos con modelos de inteligencia artificial entrenados por especialistas en bienestar animal \u2014 y revisados por nuestro equipo antes de llegar a ti. Porque la mejor tecnolog\xEDa siempre es mejor con toque humano.", "Our top podcasts are produced with artificial intelligence models trained by animal welfare specialists \u2014 and reviewed by our team before they reach you. Because the best technology is always better with a human touch."])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, steps.map(function(s, i) {
    return /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 999, padding: "7px 14px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: MC.ice, lineHeight: 1 } }, s.icon), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 600, color: PD.muted, letterSpacing: "0.01em" } }, t(s.label)));
  })));
}
function LiveBanner({ PD }) {
  const t = useT();
  const traits = [
    { icon: "\u2665", label: ["Voces reales, sin filtros", "Real voices, no filters"] },
    { icon: "\u25CE", label: ["Grabado por nuestro equipo", "Recorded by our team"] },
    { icon: "\u2726", label: ["Historias que nos pasaron a nosotros", "Stories that happened to us"] }
  ];
  return /* @__PURE__ */ React.createElement("div", { style: { borderRadius: 18, border: "1px solid rgba(255,85,32,0.25)", background: "linear-gradient(130deg,rgba(255,85,32,0.08) 0%,rgba(255,180,60,0.05) 100%)", padding: "36px 32px 32px", marginBottom: 28, position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", right: -12, top: -10, fontFamily: "Bricolage Grotesque,sans-serif", fontWeight: 800, fontSize: 140, lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(255,85,32,0.07)", letterSpacing: "-0.04em", pointerEvents: "none", userSelect: "none" } }, "LIVE"), /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,85,32,0.1)", border: "1px solid rgba(255,85,32,0.3)", borderRadius: 999, padding: "5px 13px 5px 9px", marginBottom: 22 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 7, height: 7, borderRadius: "50%", background: MC.brand, display: "inline-block", animation: "pulse 1.4s ease-in-out infinite" } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: MC.brand } }, t(["Grabado por Nosotros \xB7 100% Humano", "Recorded by Us \xB7 100% Human"]))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-0.035em", lineHeight: 1, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("span", { style: { color: PD.text, display: "block" } }, t(["Nuestra voz.", "Our voice."])), /* @__PURE__ */ React.createElement("span", { style: { color: "transparent", WebkitTextStroke: "2px rgba(255,85,32,0.6)", display: "block" } }, t(["Sin gui\xF3n, sin IA.", "No script, no AI."]))), /* @__PURE__ */ React.createElement("p", { style: { fontSize: "clamp(14px,1.3vw,16px)", color: PD.muted, lineHeight: 1.65, margin: "0 0 28px", maxWidth: "58ch" } }, t(["Estos episodios los grabamos nosotros mismos \u2014 el equipo BPuppy hablando de lo que vivimos, lo que aprendimos y lo que amamos. Nada de inteligencia artificial: pura experiencia humana con mascotas reales.", "We record these episodes ourselves \u2014 the BPuppy team talking about what we live, what we\u2019ve learned and what we love. No artificial intelligence: pure human experience with real pets."])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, traits.map(function(s, i) {
    return /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 999, padding: "7px 14px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: MC.brand, lineHeight: 1 } }, s.icon), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 600, color: PD.muted, letterSpacing: "0.01em" } }, t(s.label)));
  })));
}
function EpisodeList({ episodes, playing, setPlaying, PD, isLive }) {
  const t = useT();
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column" } }, episodes.map(function(ep, i) {
    const isPlaying = playing === (isLive ? "L" + i : "A" + i);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: ep.n,
        style: { display: "flex", alignItems: "center", gap: 16, padding: "18px 0", borderBottom: `1px solid ${PD.border}`, cursor: "pointer", transition: "padding-left .15s" },
        onMouseEnter: function(e) {
          e.currentTarget.style.paddingLeft = "8px";
        },
        onMouseLeave: function(e) {
          e.currentTarget.style.paddingLeft = "0";
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 13, fontWeight: 700, color: isLive ? MC.brand : MC.ice, minWidth: 40, letterSpacing: "0.04em" } }, ep.n),
      /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 16, fontWeight: 700, color: PD.text, letterSpacing: "-0.01em" } }, t(ep.title)), !isLive && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MC.ice, background: "rgba(74,184,255,0.1)", border: "1px solid rgba(74,184,255,0.22)", borderRadius: 4, padding: "2px 7px", flexShrink: 0 } }, t(["\u25CE IA", "\u25CE AI"])), isLive && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MC.brand, background: "rgba(255,85,32,0.1)", border: "1px solid rgba(255,85,32,0.25)", borderRadius: 4, padding: "2px 7px", flexShrink: 0 } }, t(["\u2665 En Vivo", "\u2665 Live"]))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: PD.soft } }, t(ep.guest), " \xB7 ", t(ep.date))),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: PD.soft, marginRight: 8 } }, ep.dur),
      /* @__PURE__ */ React.createElement("button", { onClick: function() {
        setPlaying(function(p) {
          var key = isLive ? "L" + i : "A" + i;
          return p === key ? null : key;
        });
      }, style: { width: 36, height: 36, borderRadius: "50%", background: isPlaying ? MC.grad : "rgba(255,255,255,0.06)", border: `1.5px solid ${isPlaying ? "transparent" : PD.border}`, display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0, boxShadow: isPlaying ? MC.glow : "none" } }, isPlaying ? /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "white" }, /* @__PURE__ */ React.createElement("rect", { x: "6", y: "4", width: "4", height: "16" }), /* @__PURE__ */ React.createElement("rect", { x: "14", y: "4", width: "4", height: "16" })) : /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: isLive ? MC.brand : MC.ice }, /* @__PURE__ */ React.createElement("polygon", { points: "5 3 19 12 5 21 5 3" })))
    );
  }));
}
function fmtTime(s) {
  s = Math.floor(s || 0);
  var m = Math.floor(s / 60);
  var ss = String(s % 60).padStart(2, "0");
  return m + ":" + ss;
}
function PodcastSection() {
  const t = useT();
  const { lang } = useLang();
  const [ref, visible] = useReveal();
  const [playing, setPlaying] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [tab, setTab] = React.useState("ai");
  const audioRef = React.useRef(null);
  const [pPlaying, setPPlaying] = React.useState(false);
  const [pCur, setPCur] = React.useState(0);
  const [pDur, setPDur] = React.useState(0);
  React.useEffect(function() {
    if (playing === null) return;
    const t2 = setInterval(function() {
      setProgress(function(p) {
        return p >= 100 ? 0 : p + 0.4;
      });
    }, 200);
    return function() {
      clearInterval(t2);
    };
  }, [playing]);
  const PD = {
    bg: "#040C1E",
    surface: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.09)",
    text: "#F0EEF8",
    muted: "rgba(240,238,248,0.52)",
    soft: "rgba(240,238,248,0.28)"
  };
  return /* @__PURE__ */ React.createElement("section", { ref, style: { padding: "clamp(80px,10vw,140px) clamp(24px,6vw,120px)", background: PD.bg, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)", transition: "opacity 0.7s ease, transform 0.7s ease", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", borderRadius: "50%", width: "50vw", height: "50vw", background: "radial-gradient(circle,rgba(255,85,32,0.07) 0%,transparent 65%)", bottom: "-20%", right: "-10%", pointerEvents: "none" } }), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 900, position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: MC.brand, marginBottom: 14 } }, t(["02 \u2014 Podcast", "02 \u2014 Podcast"])), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(44px,7.5vw,96px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.92, margin: "0 0 56px", color: PD.text } }, "B", /* @__PURE__ */ React.createElement("span", { style: { color: MC.brand } }, "cast")), /* @__PURE__ */ React.createElement("div", { style: { background: PD.surface, border: `1px solid ${PD.border}`, borderRadius: 20, padding: "28px 28px 24px", marginBottom: 20, backdropFilter: "blur(12px)", boxShadow: "0 4px 32px rgba(0,0,0,0.3)" } }, /* @__PURE__ */ React.createElement(
    "audio",
    {
      ref: audioRef,
      src: lang === "en" ? "audio/podcast-ep1-en.mp3" : "audio/podcast-ep1-es.mp3",
      preload: "metadata",
      onLoadedMetadata: function(e) {
        setPDur(e.target.duration || 0);
      },
      onTimeUpdate: function(e) {
        setPCur(e.target.currentTime || 0);
      },
      onPlay: function() {
        setPPlaying(true);
      },
      onPause: function() {
        setPPlaying(false);
      },
      onEnded: function() {
        setPPlaying(false);
        setPCur(0);
      }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 600, color: MC.brand, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 } }, t(["Episodio mas reciente", "Most recent episode"])), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 700, color: PD.text, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 4 } }, t(["Bienvenido al Podcast de Bright Puppy. 1er Episodio.", "Welcome to Bright Puppy Podcast. 1st Episode."])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: PD.soft, marginBottom: 22 } }, "BrightPuppy", pDur ? " \xB7 " + fmtTime(pDur) : ""), /* @__PURE__ */ React.createElement(
    "div",
    {
      onPointerDown: function(e) {
        var a = audioRef.current;
        if (!a || !pDur) return;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch (_) {
        }
        var r = e.currentTarget.getBoundingClientRect();
        a.currentTime = Math.max(0, Math.min(pDur, (e.clientX - r.left) / r.width * pDur));
      },
      onPointerMove: function(e) {
        if (e.buttons !== 1) return;
        var a = audioRef.current;
        if (!a || !pDur) return;
        var r = e.currentTarget.getBoundingClientRect();
        a.currentTime = Math.max(0, Math.min(pDur, (e.clientX - r.left) / r.width * pDur));
      },
      style: { padding: "9px 0", marginBottom: 8, cursor: "pointer", touchAction: "none" }
    },
    /* @__PURE__ */ React.createElement("div", { style: { position: "relative", height: 8, background: "rgba(255,255,255,0.10)", borderRadius: 999 } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${pDur ? pCur / pDur * 100 : 0}%`, background: MC.grad, borderRadius: 999, transition: "width .1s linear" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "50%", left: `${pDur ? pCur / pDur * 100 : 0}%`, transform: "translate(-50%,-50%)", width: 15, height: 15, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 5px rgba(0,0,0,0.45)", pointerEvents: "none" } }))
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: function() {
        var a = audioRef.current;
        if (!a) return;
        a.currentTime = Math.max(0, a.currentTime - 15);
      },
      title: "-15s",
      style: { width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: `1px solid ${PD.border}`, display: "grid", placeItems: "center", cursor: "pointer", color: PD.soft, fontSize: 10, fontWeight: 800, position: "relative" }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M11 8L7 12l4 4" }), /* @__PURE__ */ React.createElement("path", { d: "M17 8l-4 4 4 4" }))
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: function() {
        var a = audioRef.current;
        if (!a) return;
        if (a.paused) {
          a.play();
        } else {
          a.pause();
        }
      },
      style: { width: 48, height: 48, borderRadius: "50%", background: pPlaying ? MC.grad : "rgba(255,255,255,0.08)", border: `1.5px solid ${pPlaying ? "transparent" : PD.border}`, display: "grid", placeItems: "center", cursor: "pointer", transition: "all .2s", boxShadow: pPlaying ? MC.glow : "none" }
    },
    pPlaying ? /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "white" }, /* @__PURE__ */ React.createElement("rect", { x: "6", y: "4", width: "4", height: "16" }), /* @__PURE__ */ React.createElement("rect", { x: "14", y: "4", width: "4", height: "16" })) : /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: MC.brand }, /* @__PURE__ */ React.createElement("polygon", { points: "5 3 19 12 5 21 5 3" }))
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: function() {
        var a = audioRef.current;
        if (!a || !pDur) return;
        a.currentTime = Math.min(pDur, a.currentTime + 15);
      },
      title: "+15s",
      style: { width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: `1px solid ${PD.border}`, display: "grid", placeItems: "center", cursor: "pointer", color: PD.soft }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M13 8l4 4-4 4" }), /* @__PURE__ */ React.createElement("path", { d: "M7 8l4 4-4 4" }))
  ), /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: function(e) {
        var a = audioRef.current;
        if (!a || !pDur) return;
        var r = e.currentTarget.getBoundingClientRect();
        a.currentTime = Math.max(0, Math.min(pDur, (e.clientX - r.left) / r.width * pDur));
      },
      style: { display: "flex", gap: 3, alignItems: "flex-end", height: 32, flex: 1, cursor: "pointer" },
      title: t(["Toca para adelantar", "Click to seek"])
    },
    [...Array(40)].map(function(_, i) {
      const h = 4 + Math.abs(Math.sin(i * 0.8) * 12 + Math.sin(i * 1.7) * 8);
      const active = pDur && i / 40 * 100 < pCur / pDur * 100;
      return /* @__PURE__ */ React.createElement("div", { key: i, style: { width: 3, height: h, borderRadius: 999, background: active ? MC.brand : "rgba(255,255,255,0.1)", transition: "background .2s", pointerEvents: "none" } });
    })
  ), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: PD.soft, marginLeft: 4, whiteSpace: "nowrap" } }, fmtTime(pCur), " / ", pDur ? fmtTime(pDur) : "--:--"))), /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 999, padding: 4, marginBottom: 40, gap: 4 } }, [
    { id: "ai", label: ["\u25CE IA Generado", "\u25CE AI Generated"], color: MC.ice },
    { id: "live", label: ["\u2665 Grabado en Vivo", "\u2665 Recorded Live"], color: MC.brand }
  ].map(function(tabItem) {
    const active = tab === tabItem.id;
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: tabItem.id,
        onClick: function() {
          setTab(tabItem.id);
          setPlaying(null);
        },
        style: {
          padding: "10px 22px",
          borderRadius: 999,
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.03em",
          transition: "all .22s",
          background: active ? tabItem.id === "ai" ? "rgba(74,184,255,0.15)" : MC.grad : "transparent",
          color: active ? tabItem.id === "ai" ? MC.ice : "#fff" : PD.soft,
          boxShadow: active ? tabItem.id === "ai" ? "0 0 0 1px rgba(74,184,255,0.3)" : MC.glow : "none"
        }
      },
      t(tabItem.label)
    );
  })), tab === "ai" ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AIBanner, { PD }), /* @__PURE__ */ React.createElement(EpisodeList, { episodes: AI_EPISODES, playing, setPlaying, PD, isLive: false })) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(LiveBanner, { PD }), /* @__PURE__ */ React.createElement(EpisodeList, { episodes: LIVE_EPISODES, playing, setPlaying, PD, isLive: true }))));
}
const INTERVIEW_ID = "yOLFVCR4nEE";
const SHORTS_IDS = [
  "GMYoOg4V2zI",
  "-tm9_rH1Mg0",
  "wf0CF8B__pk",
  "MHRiMVG8cHo",
  "IBppn2M26IE",
  "VcGkPy7U57I",
  "mkFXaEmaDdU",
  "GMoy5dJtp_s",
  "M7KZF9P3S34"
];
// Antes se incrustaban los 9 reproductores de YouTube a la vez: el navegador no daba abasto,
// 7 tarjetas se quedaban en blanco y dejaban un hueco enorme debajo de los Shorts. Ahora se
// pinta la miniatura y el reproductor solo entra cuando alguien pulsa.
function ShortCard({ id, idx }) {
  const t = useT();
  const _p = React.useState(false);
  const play = _p[0], setPlay = _p[1];
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { borderRadius: 14, overflow: "hidden", background: MC.surface, border: "1px solid " + MC.border, transition: "transform .22s, box-shadow .22s" },
      onMouseEnter: function(e) {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 18px 44px rgba(0,0,0,0.1)";
      },
      onMouseLeave: function(e) {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: { aspectRatio: "9/16", position: "relative", background: "#000" } },
      play ? /* @__PURE__ */ React.createElement("iframe", {
        src: "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=es",
        title: t(["Short entrevista ", "Interview short "]) + (idx + 1),
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true,
        style: { position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }
      }) : /* @__PURE__ */ React.createElement("button", {
        type: "button",
        onClick: function() { setPlay(true); },
        "aria-label": t(["Reproducir short ", "Play short "]) + (idx + 1),
        style: { position: "absolute", inset: 0, width: "100%", height: "100%", padding: 0, border: "none", cursor: "pointer", background: "#000", display: "block" }
      },
        /* @__PURE__ */ React.createElement("img", {
          src: "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg",
          alt: "", loading: "lazy",
          style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }
        }),
        /* @__PURE__ */ React.createElement("span", {
          style: { position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 54, height: 54, borderRadius: "50%", background: "rgba(0,0,0,.55)", border: "2px solid rgba(255,255,255,.9)", display: "flex", alignItems: "center", justifyContent: "center" }
        }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "#fff" },
             /* @__PURE__ */ React.createElement("polygon", { points: "6 4 20 12 6 20 6 4" })))
      )
    )
  );
}
function InterviewsSection() {
  const t = useT();
  const [ref, visible] = useReveal();
  return /* @__PURE__ */ React.createElement("section", { ref, style: { padding: "clamp(80px,10vw,140px) clamp(24px,6vw,120px)", background: MC.bg, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)", transition: "opacity 0.7s ease, transform 0.7s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: MC.brand, marginBottom: 14 } }, t(["03 \u2014 Entrevistas", "03 \u2014 Interviews"])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, flexWrap: "wrap", gap: 24 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(44px,7.5vw,96px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.92, margin: 0, color: MC.ink } }, t(["Cara", "Face"]), /* @__PURE__ */ React.createElement("br", null), t(["a cara", "to face"])), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 16, color: MC.ink2, lineHeight: 1.6, maxWidth: "36ch", margin: 0 } }, t(["Conversaciones profundas con los expertos que marcan la pauta en el mundo de las mascotas.", "In-depth conversations with the experts setting the standard in the world of pets."]))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))", gap: 24, marginBottom: 72 } }, [
    { id: INTERVIEW_ID, label: ["Entrevista completa \u2014 BPuppy", "Full interview \u2014 BPuppy"], tag: ["Entrevista", "Interview"] },
    { id: "J5Q6c3wy0QE", label: ["Caring Hands Humane Society \u2014 Newton, Kansas \xB7 Primera parte", "Caring Hands Humane Society \u2014 Newton, Kansas \xB7 Part one"], tag: ["Entrevista \xB7 Refugio", "Interview \xB7 Shelter"] }
  ].map(function(iv) {
    return /* @__PURE__ */ React.createElement("div", { key: iv.id, style: { borderRadius: 20, overflow: "hidden", background: MC.surface, border: `1px solid ${MC.border}`, boxShadow: "0 8px 48px rgba(0,0,0,0.07)" } }, /* @__PURE__ */ React.createElement("div", { style: { aspectRatio: "16/9", position: "relative" } }, /* @__PURE__ */ React.createElement(
      "iframe",
      {
        src: "https://www.youtube.com/embed/" + iv.id + "?rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=es",
        title: t(iv.label),
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true,
        style: { position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }
      }
    )), /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 20px 20px", display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 36, borderRadius: "50%", background: `${MC.brand}15`, border: `1.5px solid ${MC.brand}30`, display: "grid", placeItems: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: MC.brand }, /* @__PURE__ */ React.createElement("polygon", { points: "5 3 19 12 5 21 5 3" }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9.5, fontWeight: 700, color: MC.brand, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 } }, t(iv.tag)), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 16, fontWeight: 700, color: MC.ink, letterSpacing: "-0.01em" } }, t(iv.label)))));
  })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: 12, marginBottom: 28 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, letterSpacing: "-0.03em", color: MC.ink } }, "Shorts"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, color: MC.soft, fontWeight: 400 } }, t(["\u2014 Entrevistas breves", "\u2014 Quick interviews"]))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(168px,1fr))", gap: 14 } }, SHORTS_IDS.map(function(id, i) {
    return /* @__PURE__ */ React.createElement(ShortCard, { key: id, id, idx: i });
  }))));
}
function AIPodcastsSection() {
  const t = useT();
  const [ref, visible] = useReveal();
  const [pods, setPods] = React.useState([]);
  React.useEffect(function() {
    const SUPA = "https://oqqwmcplljirbreowrll.supabase.co";
    const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
    fetch(SUPA + "/rest/v1/podcasts?status=eq.published&select=slug,title,description,audio_url,cover_url,duration_text,section&order=published_at.desc&limit=24", { headers: { apikey: ANON, Authorization: "Bearer " + ANON } })
      .then(function(r) { return r.ok ? r.json() : []; })
      .then(function(rows) { if (Array.isArray(rows)) setPods(rows.filter(function(p) { return p.audio_url; })); })
      .catch(function() {});
  }, []);
  if (!pods.length) return null;
  const h = React.createElement;
  return h("section", { ref, style: { padding: "clamp(70px,9vw,130px) clamp(24px,6vw,120px)", background: MC.bg2, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)", transition: "opacity 0.7s ease, transform 0.7s ease" } },
    h("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 } },
      h("span", { style: { fontSize: 15, color: MC.brand } }, "◎"),
      h("span", { style: { fontSize: 12, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: MC.brand } }, t(["Podcast IA — escucha las noticias", "AI Podcast — listen to the news"]))),
    h("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 24 } },
      h("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(40px,6.5vw,88px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.92, margin: 0, color: MC.ink } }, t(["Para escuchar", "Press play"])),
      h("p", { style: { fontSize: 16, color: MC.ink2, lineHeight: 1.6, maxWidth: "36ch", margin: 0 } }, t(["Nuestras historias, ahora en voz. Ponle play y ll\xE9vatelas contigo.", "Our stories, now in audio. Press play and take them with you."]))),
    h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(360px,1fr))", gap: 20 } }, pods.map(function(p) {
      return h("div", { key: p.slug || p.title, style: { background: MC.surface, border: "1px solid " + MC.border, borderRadius: 18, padding: 18, boxShadow: "0 6px 30px rgba(0,0,0,0.05)" } },
        h("div", { style: { display: "flex", gap: 14, alignItems: "center", marginBottom: 12 } },
          p.cover_url ? h("img", { src: p.cover_url, alt: p.title, loading: "lazy", style: { width: 74, height: 74, borderRadius: 14, objectFit: "cover", flexShrink: 0 } }) : h("div", { style: { width: 74, height: 74, borderRadius: 14, background: MC.grad, flexShrink: 0, display: "grid", placeItems: "center", color: "#fff", fontSize: 26 } }, "▶"),
          h("div", { style: { minWidth: 0 } },
            h("div", { style: { fontSize: 10.5, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: MC.brand, marginBottom: 3 } }, t(["Podcast", "Podcast"]) + (p.duration_text ? (" \xB7 " + p.duration_text) : "")),
            h("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 17.5, fontWeight: 700, color: MC.ink, letterSpacing: "-0.01em", lineHeight: 1.2 } }, p.title),
            p.description ? h("div", { style: { fontSize: 12.5, color: MC.ink2, lineHeight: 1.5, marginTop: 4, maxHeight: 40, overflow: "hidden" } }, p.description) : null)),
        h("audio", { controls: true, preload: "none", src: p.audio_url, style: { width: "100%", height: 38 } }));
    })));
}
function NewsSection() {
  const t = useT();
  const [ref, visible] = useReveal();
  const [posts, setPosts] = React.useState([]);
  const [active, setActive] = React.useState("all");
  const [verTodo, setVerTodo] = React.useState(false);
  React.useEffect(function() {
    const SUPA = "https://oqqwmcplljirbreowrll.supabase.co";
    const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
    fetch(SUPA + "/rest/v1/news_posts?status=eq.published&select=slug,title,excerpt,cover_url,published_at,section,read_minutes&order=published_at.desc&limit=120", { headers: { apikey: ANON, Authorization: "Bearer " + ANON } })
      .then(function(r) { return r.ok ? r.json() : []; })
      .then(function(rows) { if (Array.isArray(rows)) setPosts(rows); })
      .catch(function() {});
  }, []);
  if (!posts.length) return null;
  const h = React.createElement;
  const es = String(document.documentElement.lang || "es") !== "en";
  const locale = es ? "es-ES" : "en-US";
  const SECL = { estrella_del_dia: ["Estrella del d\xEDa", "Star of the day"], estudios: ["Estudios", "Studies"], familias: ["Familias", "Families"], famosos: ["Famosos", "Famous"], curiosidades: ["Curiosidades", "Curiosities"], salud: ["Salud", "Wellness"], rescate: ["Rescates", "Rescues"], mundo: ["El mundo", "The world"], general: ["General", "General"] };
  const secL = function(k) { const v = SECL[k]; return v ? (es ? v[0] : v[1]) : (k || ""); };
  const fmt = function(iso) { try { return new Date(iso).toLocaleDateString(locale, { month: "short", day: "numeric" }); } catch (e) { return ""; } };
  const rmT = function(p) { return p.read_minutes ? (p.read_minutes + " min") : ""; };
  const sections = [];
  posts.forEach(function(p) { if (p.section && sections.indexOf(p.section) < 0) sections.push(p.section); });
  const filtered = active === "all" ? posts : posts.filter(function(p) { return p.section === active; });
  const featured = filtered[0];
  const rest = filtered.slice(1);
  const PASO = 17;
  const visibles = verTodo ? rest : rest.slice(0, PASO);
  const faltan = rest.length - visibles.length;
  const ticker = h("div", { style: { borderTop: "1px solid " + MC.border, borderBottom: "1px solid " + MC.border, overflow: "hidden", whiteSpace: "nowrap", margin: "0 0 34px", padding: "11px 0", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)" } },
    h("div", { style: { display: "inline-flex", animation: "mediaTicker 46s linear infinite" } }, posts.concat(posts).map(function(p, i) {
      return h("a", { key: i, href: "/media/noticias/" + encodeURIComponent(p.slug), style: { display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none", color: MC.ink2, fontSize: 13.5, fontWeight: 600, padding: "0 24px" } },
        h("span", { style: { width: 6, height: 6, borderRadius: "50%", background: MC.brand, display: "inline-block" } }),
        h("span", { style: { color: MC.brand, fontWeight: 800, textTransform: "uppercase", fontSize: 11, letterSpacing: "0.06em" } }, secL(p.section)),
        h("span", null, p.title));
    })));
  const chips = h("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 30 } }, [["all", es ? "Todas" : "All"]].concat(sections.map(function(s) { return [s, secL(s)]; })).map(function(c) {
    const on = active === c[0];
    return h("button", { key: c[0], onClick: function() { setActive(c[0]); }, style: { border: "1px solid " + (on ? MC.ink : MC.border), background: on ? MC.ink : "transparent", color: on ? "#fff" : MC.ink2, borderRadius: 999, padding: "7px 15px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all .15s" } }, c[1]);
  }));
  const feat = featured ? h("a", { href: "/media/noticias/" + encodeURIComponent(featured.slug), style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", background: MC.surface, border: "1px solid " + MC.border, borderRadius: 22, overflow: "hidden", textDecoration: "none", color: MC.ink, marginBottom: 26, boxShadow: "0 10px 50px rgba(0,0,0,0.07)" } },
    featured.cover_url ? h("img", { src: featured.cover_url, alt: featured.title, loading: "lazy", style: { width: "100%", height: "100%", minHeight: 240, objectFit: "cover", display: "block" } }) : null,
    h("div", { style: { padding: "clamp(24px,3vw,40px)", display: "flex", flexDirection: "column", justifyContent: "center" } },
      h("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" } },
        h("span", { style: { fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: MC.grad, padding: "4px 11px", borderRadius: 999 } }, secL(featured.section)),
        h("span", { style: { fontSize: 12.5, color: MC.soft, fontWeight: 600 } }, fmt(featured.published_at) + (rmT(featured) ? (" \xB7 " + rmT(featured)) : ""))),
      h("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(26px,3.4vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 12, color: MC.ink } }, featured.title),
      featured.excerpt ? h("div", { style: { fontSize: 15.5, color: MC.ink2, lineHeight: 1.6 } }, featured.excerpt) : null,
      h("div", { style: { marginTop: 16, fontSize: 13.5, fontWeight: 800, color: MC.brand } }, es ? "Leer →" : "Read →"))) : null;
  const grid = h("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 22 } }, visibles.map(function(p) {
    return h("a", { key: p.slug, href: "/media/noticias/" + encodeURIComponent(p.slug), style: { display: "flex", flexDirection: "column", background: MC.surface, border: "1px solid " + MC.border, borderRadius: 18, overflow: "hidden", textDecoration: "none", color: MC.ink, boxShadow: "0 6px 30px rgba(0,0,0,0.05)", transition: "transform .18s ease, box-shadow .18s ease" },
      onMouseEnter: function(e) { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 46px rgba(0,0,0,0.1)"; },
      onMouseLeave: function(e) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 30px rgba(0,0,0,0.05)"; } },
      p.cover_url ? h("img", { src: p.cover_url, alt: p.title, loading: "lazy", style: { width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" } }) : null,
      h("div", { style: { padding: "15px 17px 19px", display: "flex", flexDirection: "column", flex: 1 } },
        h("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 } },
          h("span", { style: { fontSize: 10.5, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: MC.brand } }, secL(p.section)),
          rmT(p) ? h("span", { style: { fontSize: 11.5, color: MC.soft } }, "\xB7 " + rmT(p)) : null),
        h("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18.5, fontWeight: 700, color: MC.ink, letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: 7 } }, p.title),
        p.excerpt ? h("div", { style: { fontSize: 13, color: MC.ink2, lineHeight: 1.55 } }, p.excerpt) : null));
  }));
  return h("section", { id: "noticias", ref, style: { padding: "clamp(80px,10vw,140px) clamp(24px,6vw,120px)", background: "#fff", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)", transition: "opacity 0.7s ease, transform 0.7s ease" } },
    h("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 } },
      h("span", { style: { width: 9, height: 9, borderRadius: "50%", background: MC.brand, display: "inline-block", boxShadow: "0 0 0 3px rgba(255,85,32,0.22)", animation: "mediaPulse 1.8s ease-in-out infinite" } }),
      h("span", { style: { fontSize: 12, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: MC.brand } }, t(["04 — En vivo", "04 — Live"]))),
    h("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 30, flexWrap: "wrap", gap: 24 } },
      h("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(40px,6.5vw,88px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.92, margin: 0, color: MC.ink } }, "Bright Puppy News"),
      h("p", { style: { fontSize: 16, color: MC.ink2, lineHeight: 1.6, maxWidth: "36ch", margin: 0 } }, t(["Lo m\xE1s positivo del mundo de los perros, cada d\xEDa. Historias para leer con calma y un caf\xE9.", "The most positive stories from the dog world, every day. To read slowly with a coffee."]))),
    posts.length > 3 ? ticker : null,
    sections.length > 1 ? chips : null,
    feat,
    grid,
    faltan > 0 ? h("div", { style: { textAlign: "center", marginTop: 38 } },
      h("button", {
        type: "button",
        onClick: function() { setVerTodo(true); },
        style: { background: "transparent", border: "1px solid " + MC.border, color: MC.ink, borderRadius: 999, padding: "13px 30px", fontSize: 14.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", minHeight: 46 },
        onMouseEnter: function(e) { e.currentTarget.style.borderColor = MC.brand; e.currentTarget.style.color = MC.brand; },
        onMouseLeave: function(e) { e.currentTarget.style.borderColor = MC.border; e.currentTarget.style.color = MC.ink; }
      }, t(["Ver m\xE1s noticias (" + faltan + ")", "See more news (" + faltan + ")"]))
    ) : null);
}
function MediaFooterCTA() {
  const t = useT();
  const [ref, visible] = useReveal();
  return /* @__PURE__ */ React.createElement("section", { ref, style: { padding: "clamp(80px,10vw,120px) clamp(24px,6vw,120px)", background: MC.ink, color: "#FAFAF8", position: "relative", overflow: "hidden", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)", transition: "opacity 0.7s ease, transform 0.7s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", fontFamily: "Bricolage Grotesque,sans-serif", fontWeight: 800, fontSize: "clamp(120px,20vw,300px)", lineHeight: 1, bottom: "-5%", right: "-2%", color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.04)", letterSpacing: "-0.04em", pointerEvents: "none", userSelect: "none" } }, "BCAST"), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 700, position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(40px,7vw,88px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.92, margin: "0 0 24px", color: "#FAFAF8" } }, t(["No te", "Don\u2019t miss"]), /* @__PURE__ */ React.createElement("br", null), t(["pierdas nada.", "a thing."])), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 17, color: "rgba(250,250,248,0.5)", lineHeight: 1.6, margin: "0 0 32px", maxWidth: "44ch" } }, t(["Suscribete al podcast de BrightPuppy y recibe cada episodio nuevo directo en tu app favorita.", "Subscribe to the BrightPuppy podcast and get every new episode straight to your favorite app."])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, ["Spotify", "Apple Podcasts", "YouTube"].map(function(p, i) {
    return /* @__PURE__ */ React.createElement(
      "a",
      {
        key: p,
        href: "#",
        style: { display: "inline-flex", alignItems: "center", gap: 9, padding: "13px 22px", borderRadius: 999, background: i === 0 ? MC.grad : "rgba(255,255,255,0.08)", border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: i === 0 ? MC.glow : "none", transition: "all .2s" },
        onMouseEnter: function(e) {
          e.currentTarget.style.transform = "translateY(-2px)";
        },
        onMouseLeave: function(e) {
          e.currentTarget.style.transform = "translateY(0)";
        }
      },
      p
    );
  }))));
}
Object.assign(window, { MediaApp });

})();
