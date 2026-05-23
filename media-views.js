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
function useReveal() {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(function() {
    const obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return function() {
      obs.disconnect();
    };
  }, []);
  return [ref, visible];
}
function MediaApp({ visibility = {} }) {
  const v = visibility;
  return /* @__PURE__ */ React.createElement("div", { style: { background: MC.bg, color: MC.ink, fontFamily: "Plus Jakarta Sans, sans-serif", paddingTop: 80 } }, v.hero !== false && /* @__PURE__ */ React.createElement(MediaHero, null), v.videos !== false && /* @__PURE__ */ React.createElement(VideosSection, null), v.podcast !== false && /* @__PURE__ */ React.createElement(PodcastSection, null), v.entrevistas !== false && /* @__PURE__ */ React.createElement(InterviewsSection, null), v.cta !== false && /* @__PURE__ */ React.createElement(MediaFooterCTA, null));
}
function MediaHero() {
  const t = useT();
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
  })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-end", maxWidth: 900 } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: "clamp(15px,1.4vw,18px)", color: MC.heroMuted, lineHeight: 1.6, margin: 0, maxWidth: "42ch" } }, t(["Contenido original sobre mascotas, crianza responsable y la comunidad BrightPuppy.", "Original content about pets, responsible breeding and the BrightPuppy community."])), /* @__PURE__ */ React.createElement(
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
  ))), /* @__PURE__ */ React.createElement("div", { style: { padding: "0 clamp(24px,6vw,120px) 48px", position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", borderRadius: 20, overflow: "hidden", background: "rgba(255,255,255,0.048)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", maxWidth: 700, boxShadow: "0 4px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", aspectRatio: "16/9" } }, /* @__PURE__ */ React.createElement(
    "iframe",
    {
      src: "https://www.youtube.com/embed/M4D398WTPb0?rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=es",
      title: "Comercial 1 BPuppy",
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowFullScreen: true,
      style: { position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 14, left: 14, background: MC.brand, color: "#fff", fontSize: 10.5, fontWeight: 700, padding: "4px 10px", borderRadius: 6, letterSpacing: "0.06em", textTransform: "uppercase", pointerEvents: "none" } }, t(["Nuevo", "New"]))), /* @__PURE__ */ React.createElement("div", { style: { padding: "18px 20px 22px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 600, color: MC.brand, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 } }, t(["Episodio destacado", "Featured episode"])), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 700, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 8 } }, t(["Mira nuestro \xFAltimo episodio", "Watch our latest episode"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "rgba(255,255,255,0.35)" } }, "BPuppy \xB7 2026")))), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid rgba(255,255,255,0.07)", overflow: "hidden", height: 38, display: "flex", alignItems: "center", background: "rgba(0,0,0,0.22)", position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 0, animation: "mediaTicker 26s linear infinite", whiteSpace: "nowrap" } }, [...Array(4)].map(function(_, i) {
    return /* @__PURE__ */ React.createElement("span", { key: i, style: { fontSize: 10.5, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", paddingRight: 72 } }, /* @__PURE__ */ React.createElement("span", { style: { color: MC.brand } }, "\u25C6"), "\xA0", t(["Videos", "Videos"]), " \xA0\xB7\xA0 ", t(["Podcasts", "Podcasts"]), " \xA0\xB7\xA0 ", t(["Entrevistas", "Interviews"]), " \xA0\xB7\xA0 ", t(["Razas", "Breeds"]), " \xA0\xB7\xA0 ", t(["Crianza", "Breeding"]), " \xA0\xB7\xA0 ", t(["Salud", "Health"]), " \xA0\xB7\xA0 ", t(["Adopciones", "Adoptions"]), " \xA0\xB7\xA0 ", t(["Comunidad", "Community"]), " \xA0");
  }))));
}
const COMERCIALES = [
  { id: "M4D398WTPb0", label: ["Comercial 1", "Commercial 1"], color: "#FF5520" },
  { id: "m5zU7U34GC0", label: ["Comercial 2", "Commercial 2"], color: "#9B6FFF" }
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
      onClick: function(e) {
        var a = audioRef.current;
        if (!a || !pDur) return;
        var r = e.currentTarget.getBoundingClientRect();
        a.currentTime = (e.clientX - r.left) / r.width * pDur;
      },
      style: { height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 999, marginBottom: 16, cursor: "pointer" }
    },
    /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: `${pDur ? pCur / pDur * 100 : 0}%`, background: MC.grad, borderRadius: 999, transition: "width .2s linear" } })
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14 } }, /* @__PURE__ */ React.createElement(
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
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 3, alignItems: "flex-end", height: 32, flex: 1 } }, [...Array(40)].map(function(_, i) {
    const h = 4 + Math.abs(Math.sin(i * 0.8) * 12 + Math.sin(i * 1.7) * 8);
    const active = pDur && i / 40 * 100 < pCur / pDur * 100;
    return /* @__PURE__ */ React.createElement("div", { key: i, style: { width: 3, height: h, borderRadius: 999, background: active ? MC.brand : "rgba(255,255,255,0.1)", transition: "background .2s" } });
  })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: PD.soft, marginLeft: 4, whiteSpace: "nowrap" } }, fmtTime(pCur), " / ", pDur ? fmtTime(pDur) : "--:--"))), /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 999, padding: 4, marginBottom: 40, gap: 4 } }, [
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
function ShortCard({ id, idx }) {
  const t = useT();
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { borderRadius: 14, overflow: "hidden", background: MC.surface, border: `1px solid ${MC.border}`, transition: "transform .22s, box-shadow .22s" },
      onMouseEnter: function(e) {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 18px 44px rgba(0,0,0,0.1)";
      },
      onMouseLeave: function(e) {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: { aspectRatio: "9/16", position: "relative" } }, /* @__PURE__ */ React.createElement(
      "iframe",
      {
        src: "https://www.youtube.com/embed/" + id + "?rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=es",
        title: t(["Short entrevista ", "Interview short "]) + (idx + 1),
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true,
        style: { position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }
      }
    ))
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
