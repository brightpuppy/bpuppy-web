(function(){
const { useState, useEffect, useRef } = React;
const Q = [
  { q: ["\xBFD\xF3nde vives?", "Where do you live?"], opts: [
    { e: "\u{1F3E2}", l: ["Apartamento en ciudad", "City apartment"] },
    { e: "\u{1F3E1}", l: ["Casa con patio", "House with a yard"] },
    { e: "\u{1F333}", l: ["Casa de campo", "Country house"] },
    { e: "\u{1F6CF}\uFE0F", l: ["Estudio peque\xF1o", "Small studio"] }
  ] },
  { q: ["\xBFPara qu\xE9 quieres un cachorro?", "Why do you want a puppy?"], opts: [
    { e: "\u{1F495}", l: ["Compa\xF1\xEDa en casa", "Companionship"] },
    { e: "\u{1F3C3}", l: ["Vida activa", "Active life"] },
    { e: "\u{1F917}", l: ["Apoyo emocional", "Emotional support"] },
    { e: "\u{1F476}", l: ["Compa\xF1ero para mis hijos", "For my kids"] },
    { e: "\u{1F9D3}", l: ["Compa\xF1\xEDa para un abuelito", "For a senior"] }
  ] },
  { q: ["\xBFQu\xE9 pelito te gusta m\xE1s?", "Which coat do you like?"], opts: [
    { e: "\u2702\uFE0F", l: ["Pelito corto", "Short coat"] },
    { e: "\u{1F9F6}", l: ["Pelito largo", "Long coat"] },
    { e: "\u{1F33F}", l: ["Que no suelte pelo", "Hypoallergenic"] },
    { e: "\u2728", l: ["\xA1El que sea, lindo!", "Any, cute!"] }
  ] },
  { q: ["\xBFCu\xE1nto vas a jugar y pasear?", "How much will you play & walk?"], opts: [
    { e: "\u{1F6B6}", l: ["Paseos cortos", "Short walks"] },
    { e: "\u{1F3BE}", l: ["Paseos medianos", "Medium walks"] },
    { e: "\u{1F3C3}\u200D\u2642\uFE0F", l: ["\xA1Mucho ejercicio!", "Lots of exercise"] },
    { e: "\u26F0\uFE0F", l: ["Todo el d\xEDa afuera", "All day outside"] }
  ] },
  { q: ["\xBFHas tenido perritos antes?", "Have you had dogs before?"], opts: [
    { e: "\u{1F423}", l: ["Es mi primero", "My first one"] },
    { e: "\u{1F415}", l: ["Un poco", "A little"] },
    { e: "\u{1F393}", l: ["\xA1Mucho!", "A lot!"] }
  ] },
  { q: ["\xBFDe qu\xE9 tama\xF1o lo quieres?", "What size do you want?"], opts: [
    { e: "\u{1F43E}", l: ["Peque\xF1ito", "Small"] },
    { e: "\u{1F415}", l: ["Mediano", "Medium"] },
    { e: "\u{1F9AE}", l: ["Grandote", "Large"] },
    { e: "\u2728", l: ["\xA1Sorpr\xE9ndeme!", "Surprise me!"] }
  ] },
  { q: ["\xBFHay ni\xF1os en tu casa?", "Are there kids at home?"], opts: [
    { e: "\u{1F476}", l: ["S\xED, chiquitos", "Yes, little ones"] },
    { e: "\u{1F9D2}", l: ["S\xED, medianos", "Yes, school age"] },
    { e: "\u{1F466}", l: ["Adolescentes", "Teens"] },
    { e: "\u{1F64B}", l: ["No hay ni\xF1os", "No kids"] }
  ] },
  { q: ["\xBFNecesitas un perro de apoyo especial?", "Need a special-support dog?"], opts: [
    { e: "\u{1F486}", l: ["Apoyo emocional", "Emotional support"] },
    { e: "\u{1F9E9}", l: ["Para alguien autista", "For someone autistic"] },
    { e: "\u{1F91D}", l: ["Ayuda a un abuelito", "Help a senior"] },
    { e: "\u{1F436}", l: ["No, un amigo normal", "No, just a friend"] }
  ] },
  { q: ["\xBFCu\xE1nto tiempo le vas a dedicar?", "How much time can you give?"], opts: [
    { e: "\u23F1\uFE0F", l: ["Poquito", "A little"] },
    { e: "\u{1F550}", l: ["Medio", "Some"] },
    { e: "\u{1F551}", l: ["Bastante", "Quite a bit"] },
    { e: "\u{1F4AF}", l: ["\xA1Todo el d\xEDa!", "All day!"] }
  ] },
  { q: ["\xBFC\xF3mo quieres que sea?", "How do you want it to be?"], opts: [
    { e: "\u{1F970}", l: ["Cari\xF1oso y tranquilo", "Cuddly & calm"] },
    { e: "\u26A1", l: ["Juguet\xF3n y con energ\xEDa", "Playful & energetic"] },
    { e: "\u{1F6E1}\uFE0F", l: ["Protector y leal", "Loyal & protective"] },
    { e: "\u{1F43A}", l: ["Independiente", "Independent"] }
  ] }
];
const BREEDS = [
  {
    name: "Golden Retriever",
    art: 1,
    match: 96,
    emoji: "\u{1F9B4}",
    img: "https://bpuppy.us/fotos-raw/p05.webp",
    desc: ["Cari\xF1oso, inteligente y perfecto para familias. Le encantan los ni\xF1os.", "Affectionate, smart and perfect for families. Loves kids."],
    size: ["Grande", "Large"],
    energy: ["Alta", "High"],
    facts: [
      ["Les encanta nadar y traer la pelota una y otra vez \u{1F3BE}", "They love to swim and fetch over and over \u{1F3BE}"],
      ["Son tan listos que aprenden trucos rapid\xEDsimo \u{1F9E0}", "So smart they learn tricks super fast \u{1F9E0}"],
      ["De cachorros parecen peluches dorados \u{1F9F8}", "As puppies they look like golden teddy bears \u{1F9F8}"]
    ]
  },
  {
    name: "French Bulldog",
    art: 2,
    match: 92,
    emoji: "\u{1F987}",
    img: "https://bpuppy.us/fotos-raw/p14.webp",
    desc: ["Compacto, cari\xF1oso y feliz en espacios peque\xF1os. Ama el sof\xE1.", "Compact, affectionate and happy in small spaces. Loves the couch."],
    size: ["Peque\xF1o", "Small"],
    energy: ["Baja", "Low"],
    facts: [
      ["Tienen orejitas de murci\xE9lago muy graciosas \u{1F987}", "They have funny little bat ears \u{1F987}"],
      ["A veces roncan cuando duermen \u{1F634}", "Sometimes they snore when they sleep \u{1F634}"],
      ["No necesitan mucho ejercicio, \xA1aman descansar! \u{1F6CB}\uFE0F", "They don\u2019t need much exercise, they love to rest! \u{1F6CB}\uFE0F"]
    ]
  },
  {
    name: "Cavalier King Charles",
    art: 0,
    match: 89,
    emoji: "\u{1F451}",
    img: "https://bpuppy.us/fotos-raw/p20.webp",
    desc: ["Dulce, tranquilo y el rey de los abrazos. Ideal para apoyo emocional.", "Sweet, calm and the king of cuddles. Great for emotional support."],
    size: ["Peque\xF1o", "Small"],
    energy: ["Media", "Moderate"],
    facts: [
      ["Siempre quieren estar cerca de ti \u{1F917}", "They always want to be near you \u{1F917}"],
      ["Su pelito es suavecito como la seda \u{1F9F6}", "Their coat is silky soft \u{1F9F6}"],
      ["Te siguen a todas partes como sombras \u{1F43E}", "They follow you everywhere like little shadows \u{1F43E}"]
    ]
  },
  {
    name: "Labrador Retriever",
    art: 3,
    match: 94,
    emoji: "\u{1F4A6}",
    img: "https://bpuppy.us/fotos-raw/p08.webp",
    desc: ["Activo, sociable y muy entrenable. El mejor amigo para jugar.", "Active, social and very trainable. The best playmate."],
    size: ["Grande", "Large"],
    energy: ["Alta", "High"],
    facts: [
      ["\xA1Aman el agua y los charcos! \u{1F4A6}", "They love water and puddles! \u{1F4A6}"],
      ["Pueden cargar cosas suavecito con la boca \u{1F9B4}", "They can carry things gently in their mouth \u{1F9B4}"],
      ["Son perfectos para correr y jugar en el parque \u{1F3C3}", "Perfect for running and playing at the park \u{1F3C3}"]
    ]
  },
  {
    name: "Poodle (Caniche)",
    art: 4,
    match: 91,
    emoji: "\u{1F31F}",
    img: "https://bpuppy.us/fotos-raw/p29.webp",
    desc: ["Su pelito rizado casi no suelta pelo. S\xFAper inteligente y elegante.", "Their curly coat barely sheds. Super smart and elegant."],
    size: ["Variable", "Varies"],
    energy: ["Media", "Moderate"],
    facts: [
      ["Su pelo rizado casi no suelta pelo \u{1F300}", "Their curly coat barely sheds \u{1F300}"],
      ["Son de los perros m\xE1s inteligentes del mundo \u{1F9E0}", "One of the smartest dog breeds in the world \u{1F9E0}"],
      ["Vienen en grande, mediano y mini \u2728", "They come in standard, medium and mini \u2728"]
    ]
  },
  {
    name: "Beagle",
    art: 7,
    match: 87,
    emoji: "\u{1F443}",
    img: "https://bpuppy.us/fotos-raw/p32.webp",
    desc: ["Juguet\xF3n, curioso y excelente con ni\xF1os. \xA1Pura personalidad!", "Playful, curious and great with kids. Full of personality!"],
    size: ["Mediano", "Medium"],
    energy: ["Alta", "High"],
    facts: [
      ["Tienen un olfato s\xFAper poderoso \u{1F443}", "They have a super powerful sense of smell \u{1F443}"],
      ["Sus orejas largas son adorables \u{1F442}", "Their long ears are adorable \u{1F442}"],
      ["Les encanta explorar y oler TODO \u{1F50E}", "They love to explore and sniff EVERYTHING \u{1F50E}"]
    ]
  }
];
let _ac = null;
const ac = () => {
  try {
    if (!_ac) _ac = new (window.AudioContext || window.webkitAudioContext)();
    return _ac;
  } catch (e) {
    return null;
  }
};
const beep = (freq, dur, type, when, gain) => {
  if (window._quizMuted) return;
  const c = ac();
  if (!c) return;
  try {
    if (c.state === "suspended") c.resume();
  } catch (e) {
  }
  const o = c.createOscillator(), g = c.createGain();
  o.type = type || "triangle";
  o.frequency.value = freq;
  o.connect(g);
  g.connect(c.destination);
  const t0 = c.currentTime + (when || 0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain || 0.06, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(1e-4, t0 + (dur || 0.12));
  o.start(t0);
  o.stop(t0 + (dur || 0.12) + 0.03);
};
const sndPick = () => {
  beep(540, 0.09, "triangle", 0, 0.05);
  beep(810, 0.1, "triangle", 0.05, 0.05);
};
const sndBack = () => {
  beep(360, 0.1, "sine", 0, 0.04);
};
const sndWin = () => {
  [523, 659, 784, 1047, 1319].forEach((f, i) => beep(f, 0.22, "triangle", i * 0.11, 0.07));
};
function ensureCss() {
  if (document.getElementById("qg-css")) return;
  const s = document.createElement("style");
  s.id = "qg-css";
  s.textContent = `
    @keyframes qgPop { from{opacity:0;transform:scale(.92) translateY(10px)} to{opacity:1;transform:none} }
    @keyframes qgFloat { 0%{transform:translateY(0) rotate(0)} 100%{transform:translateY(-120vh) rotate(360deg)} }
    @keyframes qgBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    .qg-pop{ animation:qgPop .32s cubic-bezier(.34,1.56,.64,1) both }
    .qg-opt{ transition:transform .12s, border-color .15s, background .15s }
    .qg-opt:hover{ transform:translateY(-3px) }
    .qg-opt:active{ transform:scale(.97) }
  `;
  document.head.appendChild(s);
}
function Confetti() {
  const items = Array.from({ length: 28 });
  const emojis = ["\u{1F43E}", "\u{1F389}", "\u2B50", "\u{1F9B4}", "\u{1F49B}", "\u{1F9E1}"];
  return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 40 } }, items.map((_, i) => {
    const left = Math.random() * 100, d = 2 + Math.random() * 2.5, delay = Math.random() * 0.6, sz = 16 + Math.random() * 18;
    return /* @__PURE__ */ React.createElement("span", { key: i, style: { position: "absolute", left: left + "%", bottom: "-40px", fontSize: sz, animation: `qgFloat ${d}s ${delay}s ease-in forwards` } }, emojis[i % emojis.length]);
  }));
}
function QuizGame() {
  const t = useT();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(Q.length).fill(null));
  const [result, setResult] = useState(false);
  const [muted, setMuted] = useState(false);
  const [confetti, setConfetti] = useState(false);
  useEffect(() => {
    ensureCss();
  }, []);
  useEffect(() => {
    window._quizMuted = muted;
  }, [muted]);
  const choose = (i) => {
    sndPick();
    const a = answers.slice();
    a[step] = i;
    setAnswers(a);
    setTimeout(() => {
      if (step < Q.length - 1) setStep(step + 1);
      else {
        setResult(true);
        setConfetti(true);
        sndWin();
        setTimeout(() => setConfetti(false), 4e3);
      }
    }, 240);
  };
  const back = () => {
    if (step > 0) {
      sndBack();
      setStep(step - 1);
    }
  };
  const reset = () => {
    sndBack();
    setStep(0);
    setAnswers(Array(Q.length).fill(null));
    setResult(false);
  };
  const breedFor = () => {
    const a = answers;
    if (a[2] === 2) return BREEDS[4];
    if ((a[0] === 0 || a[0] === 3) && a[3] === 0) return BREEDS[1];
    if (a[7] === 0 || a[7] === 1) return BREEDS[2];
    if (a[1] === 1 && a[3] >= 2) return BREEDS[3];
    if (a[6] === 0 || a[6] === 1 || a[1] === 3) return BREEDS[0];
    if (a[9] === 1) return BREEDS[5];
    return BREEDS[0];
  };
  const pct = Math.round((result ? Q.length : step) / Q.length * 100);
  const wrap = { maxWidth: 560, margin: "0 auto", padding: "24px 18px 80px" };
  if (result) {
    const b = breedFor();
    return /* @__PURE__ */ React.createElement("div", { style: wrap }, confetti && /* @__PURE__ */ React.createElement(Confetti, null), /* @__PURE__ */ React.createElement("div", { className: "qg-pop", style: { background: "#fff", borderRadius: 28, border: "1px solid var(--line)", overflow: "hidden", boxShadow: "0 10px 40px rgba(45,36,33,0.1)" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,#F58220,#E85D75)", padding: "30px 24px 26px", textAlign: "center", color: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.9 } }, t(["\xA1Tu match perfecto!", "Your perfect match!"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 64, margin: "6px 0", animation: "qgBounce 1.6s ease-in-out infinite" } }, b.emoji), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" } }, b.name), /* @__PURE__ */ React.createElement("div", { style: { display: "inline-block", marginTop: 8, background: "rgba(255,255,255,0.22)", borderRadius: 999, padding: "4px 14px", fontSize: 14, fontWeight: 800 } }, b.match, "% ", t(["compatible", "match"]))), /* @__PURE__ */ React.createElement("div", { style: { padding: "22px 24px 26px" } }, /* @__PURE__ */ React.createElement("img", { src: b.img, alt: "", style: { width: "100%", height: 200, objectFit: "cover", borderRadius: 18, marginBottom: 16 } }), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15.5, color: "var(--ink-2)", lineHeight: 1.6, margin: "0 0 16px" } }, t(b.desc)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("span", { style: { flex: 1, textAlign: "center", background: "var(--paper)", borderRadius: 12, padding: "10px", fontSize: 13, color: "var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--ink-soft)" } }, t(["Tama\xF1o", "Size"])), /* @__PURE__ */ React.createElement("b", null, t(b.size))), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, textAlign: "center", background: "var(--paper)", borderRadius: 12, padding: "10px", fontSize: 13, color: "var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--ink-soft)" } }, t(["Energ\xEDa", "Energy"])), /* @__PURE__ */ React.createElement("b", null, t(b.energy)))), /* @__PURE__ */ React.createElement("div", { style: { background: "#FFF7EE", border: "1.5px solid rgba(245,130,32,0.25)", borderRadius: 16, padding: "16px 18px", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "var(--orange2,#C2521E)", marginBottom: 10 } }, t(["\u{1F436} Datos divertidos para conocer mejor a tu raza", "\u{1F436} Fun facts to get to know your breed"])), b.facts.map((f, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, color: "#F58220", fontWeight: 900 } }, i + 1), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, color: "var(--ink)", lineHeight: 1.5 } }, t(f))))), /* @__PURE__ */ React.createElement("a", { href: `/blog?art=${b.art}`, style: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: "var(--orange)", marginBottom: 18 } }, t(["Aprende m\xE1s sobre esta raza", "Learn more about this breed"]), " \u2192"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("a", { href: "/solicitud", className: "btn btn-primary", style: { flex: 1, justifyContent: "center", minWidth: 180 } }, t(["Quiero un " + b.name.split(" (")[0], "I want a " + b.name.split(" (")[0]])), /* @__PURE__ */ React.createElement("button", { onClick: reset, className: "btn btn-outline", style: { cursor: "pointer" } }, t(["Jugar otra vez", "Play again"]))))));
  }
  const cur = Q[step];
  return /* @__PURE__ */ React.createElement("div", { style: wrap }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)" } }, t(["Encuentra tu", "Find your"]), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--orange)" } }, t(["cachorro ideal", "perfect puppy"])), " \u{1F43E}"), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-soft)", fontSize: 15, margin: "6px 0 0" } }, t(["Un juego r\xE1pido y divertido para toda la familia", "A quick, fun game for the whole family"]))), /* @__PURE__ */ React.createElement("div", { className: "qg-pop", key: step, style: { background: "#fff", borderRadius: 28, border: "1px solid var(--line)", padding: "26px 22px 24px", boxShadow: "0 6px 30px rgba(45,36,33,0.08)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 10, borderRadius: 999, background: "var(--paper)", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: pct + "%", borderRadius: 999, background: "linear-gradient(90deg,#F58220,#E85D75)", transition: "width .35s cubic-bezier(.34,1.56,.64,1)" } })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 800, color: "var(--orange)" } }, step + 1, "/", Q.length), /* @__PURE__ */ React.createElement("button", { onClick: () => setMuted((m) => !m), title: muted ? "Activar sonido" : "Silenciar", style: { background: "none", border: "none", cursor: "pointer", color: "var(--ink-soft)", display: "inline-flex", padding: 4 } }, muted ? /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M11 5 6 9H2v6h4l5 4z" }), /* @__PURE__ */ React.createElement("line", { x1: "23", y1: "9", x2: "17", y2: "15" }), /* @__PURE__ */ React.createElement("line", { x1: "17", y1: "9", x2: "23", y2: "15" })) : /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M11 5 6 9H2v6h4l5 4z" }), /* @__PURE__ */ React.createElement("path", { d: "M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" })))), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(20px,3.2vw,26px)", fontWeight: 700, lineHeight: 1.25, margin: "0 0 18px", color: "var(--ink)" } }, t(cur.q)), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 11 } }, cur.opts.map((opt, i) => {
    const sel = answers[step] === i;
    return /* @__PURE__ */ React.createElement("button", { key: i, onClick: () => choose(i), className: "qg-opt", style: { display: "flex", alignItems: "center", gap: 14, padding: "15px 16px", borderRadius: 16, background: sel ? "rgba(245,130,32,0.08)" : "var(--paper)", border: `2px solid ${sel ? "var(--orange)" : "transparent"}`, textAlign: "left", cursor: "pointer", fontFamily: "inherit" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 30, flexShrink: 0 } }, opt.e), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontSize: 16, fontWeight: 700, color: "var(--ink)" } }, t(opt.l)), /* @__PURE__ */ React.createElement("span", { style: { width: 26, height: 26, borderRadius: "50%", border: `2px solid ${sel ? "var(--orange)" : "var(--line)"}`, background: sel ? "var(--orange)" : "transparent", display: "grid", placeItems: "center", flexShrink: 0 } }, sel && /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12.5l4.5 4.5L19 6.5" }))));
  })), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18, textAlign: "left" } }, /* @__PURE__ */ React.createElement("button", { onClick: back, disabled: step === 0, style: { background: "none", border: "none", color: "var(--ink-soft)", fontSize: 14, fontWeight: 600, cursor: step === 0 ? "default" : "pointer", opacity: step === 0 ? 0 : 1, fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 6 } }, "\u2190 ", t(["Atr\xE1s", "Back"])))));
}
function QuizGameRoot() {
  const [lang, setLang] = useState("es");
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang, setLang } }, /* @__PURE__ */ React.createElement(Header, { overDark: false }), /* @__PURE__ */ React.createElement("main", { style: { paddingTop: 80, background: "var(--bg,#fff)", minHeight: "100vh" } }, /* @__PURE__ */ React.createElement(QuizGame, null)), /* @__PURE__ */ React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(QuizGameRoot, null));

})();
