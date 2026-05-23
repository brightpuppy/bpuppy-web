(function(){
const QUESTIONS = [
  { q: ["\xBFD\xF3nde vives?", "Where do you live?"], opts: [
    { label: ["Apartamento en ciudad", "City apartment"], emoji: "\u{1F3E2}", desc: ["Espacio interior, poca \xE1rea exterior", "Indoor space, little outdoor area"] },
    { label: ["Casa con patio", "House with a yard"], emoji: "\u{1F3E1}", desc: ["Jard\xEDn o patio para jugar", "Garden or yard to play in"] },
    { label: ["Casa de campo", "Country house"], emoji: "\u{1F333}", desc: ["Espacio abierto, mucho terreno", "Open space, lots of land"] },
    { label: ["Estudio o espacio reducido", "Studio or small space"], emoji: "\u{1F6CB}\uFE0F", desc: ["Espacio m\xEDnimo", "Minimal space"] }
  ] },
  { q: ["\xBFCu\xE1l es tu principal motivaci\xF3n para tener un cachorro?", "What\u2019s your main reason for getting a puppy?"], opts: [
    { label: ["Compa\xF1\xEDa en casa", "Companionship at home"], emoji: "\u{1F495}", desc: ["Un compa\xF1ero para el d\xEDa a d\xEDa", "A companion for everyday life"] },
    { label: ["Estilo de vida activo", "Active lifestyle"], emoji: "\u{1F3C3}", desc: ["Salir a correr, hacer ejercicio", "Going for runs, exercising"] },
    { label: ["Apoyo emocional", "Emotional support"], emoji: "\u{1F917}", desc: ["Necesito ese soporte especial", "I need that special support"] },
    { label: ["Compa\xF1ero para mis hijos", "A companion for my kids"], emoji: "\u{1F476}", desc: ["Una mascota para la familia", "A pet for the family"] },
    { label: ["Compa\xF1\xEDa para adulto mayor", "Companionship for a senior"], emoji: "\u{1F9D3}", desc: ["Acompa\xF1amiento y cari\xF1o", "Company and affection"] }
  ] },
  { q: ["\xBFQu\xE9 tipo de pelaje prefieres?", "What type of coat do you prefer?"], opts: [
    { label: ["Pelaje corto", "Short coat"], emoji: "\u2702\uFE0F", desc: ["F\xE1cil de mantener", "Easy to maintain"] },
    { label: ["Pelaje largo", "Long coat"], emoji: "\u{1F415}\u200D\u{1F9BA}", desc: ["Me gusta cepillar y cuidar", "I enjoy brushing and grooming"] },
    { label: ["Hipoalerg\xE9nico", "Hypoallergenic"], emoji: "\u{1F33F}", desc: ["Tengo alergias o sensibilidad", "I have allergies or sensitivities"] },
    { label: ["Me es indiferente", "No preference"], emoji: "\u2728", desc: ["Lo que sea, con tal que sea lindo", "Anything, as long as it\u2019s cute"] }
  ] },
  { q: ["\xBFCu\xE1nta actividad f\xEDsica puedes ofrecer?", "How much physical activity can you offer?"], opts: [
    { label: ["Paseos cortos (15-20 min)", "Short walks (15-20 min)"], emoji: "\u{1F6B6}", desc: ["Rutina tranquila", "Easygoing routine"] },
    { label: ["Paseos moderados (30-60 min)", "Moderate walks (30-60 min)"], emoji: "\u{1F3BE}", desc: ["Ejercicio equilibrado", "Balanced exercise"] },
    { label: ["Ejercicio intenso (1-2 horas)", "Intense exercise (1-2 hours)"], emoji: "\u{1F3C3}\u200D\u2642\uFE0F", desc: ["Correr, hiking, deportes", "Running, hiking, sports"] },
    { label: ["Todo el d\xEDa al aire libre", "All day outdoors"], emoji: "\u26F0\uFE0F", desc: ["Campo, playa, monta\xF1a", "Countryside, beach, mountains"] }
  ] },
  { q: ["\xBFTienes experiencia con perros?", "Do you have experience with dogs?"], opts: [
    { label: ["Es mi primer perro", "It\u2019s my first dog"], emoji: "\u{1F423}", desc: ["Nunca he tenido mascota", "I\u2019ve never had a pet"] },
    { label: ["Algo de experiencia", "Some experience"], emoji: "\u{1F415}", desc: ["He tenido o convivido con perros", "I\u2019ve had or lived with dogs"] },
    { label: ["Mucha experiencia", "Lots of experience"], emoji: "\u{1F393}", desc: ["He criado varias razas", "I\u2019ve raised several breeds"] }
  ] },
  { q: ["\xBFQu\xE9 tama\xF1o prefieres?", "What size do you prefer?"], opts: [
    { label: ["Peque\xF1o (hasta 10 kg)", "Small (up to 22 lb)"], emoji: "\u{1F43E}", desc: ["F\xE1cil de cargar y transportar", "Easy to carry and travel with"] },
    { label: ["Mediano (10-25 kg)", "Medium (22-55 lb)"], emoji: "\u{1F415}", desc: ["Vers\xE1til para cualquier espacio", "Versatile for any space"] },
    { label: ["Grande (m\xE1s de 25 kg)", "Large (over 55 lb)"], emoji: "\u{1F9AE}", desc: ["Presencia fuerte, mucho amor", "Strong presence, lots of love"] },
    { label: ["No me importa el tama\xF1o", "Size doesn\u2019t matter"], emoji: "\u2728", desc: ["Sorpr\xE9ndeme", "Surprise me"] }
  ] },
  { q: ["\xBFHay ni\xF1os en tu hogar?", "Are there children in your home?"], opts: [
    { label: ["S\xED, menores de 5 a\xF1os", "Yes, under 5 years old"], emoji: "\u{1F476}", desc: ["Necesito un perro muy paciente", "I need a very patient dog"] },
    { label: ["S\xED, entre 5 y 12 a\xF1os", "Yes, between 5 and 12"], emoji: "\u{1F9D2}", desc: ["Ni\xF1os que ya saben ser cuidadosos", "Kids who already know to be careful"] },
    { label: ["Adolescentes", "Teenagers"], emoji: "\u{1F466}", desc: ["13+ a\xF1os", "Ages 13+"] },
    { label: ["No hay ni\xF1os", "No children"], emoji: "\u{1F64B}", desc: ["Solo adultos en casa", "Only adults at home"] }
  ] },
  { q: ["\xBFNecesitas un perro entrenable para necesidades especiales?", "Do you need a trainable dog for special needs?"], opts: [
    { label: ["Apoyo emocional", "Emotional support"], emoji: "\u{1F486}", desc: ["Ansiedad, depresi\xF3n, estr\xE9s", "Anxiety, depression, stress"] },
    { label: ["Compa\xF1ero para persona autista", "Companion for someone autistic"], emoji: "\u{1F9E9}", desc: ["Calma y conexi\xF3n", "Calm and connection"] },
    { label: ["Asistencia para adulto mayor", "Assistance for a senior"], emoji: "\u{1F91D}", desc: ["Compa\xF1\xEDa constante y tranquila", "Constant, calm company"] },
    { label: ["No, mascota regular", "No, a regular pet"], emoji: "\u{1F436}", desc: ["Solo quiero un amigo peludo", "I just want a furry friend"] }
  ] },
  { q: ["\xBFCu\xE1nto puedes dedicar al cuidado diario (cepillado, juego, paseo)?", "How much time can you give to daily care (brushing, play, walks)?"], opts: [
    { label: ["Menos de 30 minutos", "Less than 30 minutes"], emoji: "\u23F1\uFE0F", desc: ["Vida muy ocupada", "Very busy life"] },
    { label: ["30 min a 1 hora", "30 min to 1 hour"], emoji: "\u{1F550}", desc: ["Tiempo moderado", "Moderate time"] },
    { label: ["1 a 2 horas", "1 to 2 hours"], emoji: "\u{1F551}", desc: ["Dedicado al cuidado", "Dedicated to their care"] },
    { label: ["Todo el tiempo del mundo", "All the time in the world"], emoji: "\u{1F4AF}", desc: ["Mi cachorro es prioridad", "My puppy is a priority"] }
  ] },
  { q: ["\xBFQu\xE9 es m\xE1s importante para ti en un cachorro?", "What matters most to you in a puppy?"], opts: [
    { label: ["Que sea cari\xF1oso y tranquilo", "Affectionate and calm"], emoji: "\u{1F970}", desc: ["Paz y ternura", "Peace and tenderness"] },
    { label: ["Que sea juguet\xF3n y energ\xE9tico", "Playful and energetic"], emoji: "\u26A1", desc: ["Diversi\xF3n y acci\xF3n", "Fun and action"] },
    { label: ["Que sea protector y leal", "Protective and loyal"], emoji: "\u{1F6E1}\uFE0F", desc: ["Seguridad y confianza", "Safety and confidence"] },
    { label: ["Que sea independiente", "Independent"], emoji: "\u{1F43A}", desc: ["No necesita atenci\xF3n constante", "Doesn\u2019t need constant attention"] }
  ] }
];
const BREEDS = [
  { name: "Golden Retriever", art: 1, match: 96, desc: ["Cari\xF1oso, inteligente, perfecto para familias. Se adapta a ni\xF1os y adultos mayores con facilidad.", "Affectionate, smart and perfect for families. Adapts easily to children and seniors."], size: ["Grande", "Large"], energy: ["Alta", "High"] },
  { name: "French Bulldog", art: 2, match: 92, desc: ["Compacto, cari\xF1oso y adaptable a espacios peque\xF1os. Ideal para apartamentos y vida tranquila.", "Compact, affectionate and great for small spaces. Ideal for apartments and a relaxed life."], size: ["Peque\xF1o", "Small"], energy: ["Baja", "Low"] },
  { name: "Cavalier King Charles", art: 0, match: 89, desc: ["El perro de compa\xF1\xEDa por excelencia. Dulce, tranquilo y perfecto para apoyo emocional.", "The companion dog par excellence. Sweet, calm and perfect for emotional support."], size: ["Peque\xF1o", "Small"], energy: ["Moderada", "Moderate"] },
  { name: "Labrador Retriever", art: 3, match: 94, desc: ["Activo, sociable y extremadamente entrenable. Excelente para familias activas con ni\xF1os.", "Active, social and highly trainable. Excellent for active families with kids."], size: ["Grande", "Large"], energy: ["Alta", "High"] },
  { name: "Poodle (Caniche)", art: 4, match: 91, desc: ["Hipoalerg\xE9nico, inteligente y elegante. Viene en todos los tama\xF1os. Ideal si tienes alergias.", "Hypoallergenic, intelligent and elegant. Comes in every size. Ideal if you have allergies."], size: ["Variable", "Varies"], energy: ["Moderada", "Moderate"] },
  { name: "Beagle", art: 7, match: 87, desc: ["Juguet\xF3n, curioso y excelente con ni\xF1os. Tama\xF1o mediano, mucha personalidad.", "Playful, curious and great with kids. Medium-sized, with tons of personality."], size: ["Mediano", "Medium"], energy: ["Alta", "High"] }
];
function ExtendedQuiz() {
  const t = useT();
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState(Array(QUESTIONS.length).fill(null));
  const total = QUESTIONS.length;
  const isResult = step >= total;
  const choose = (idx) => {
    const next = [...answers];
    next[step] = idx;
    setAnswers(next);
    setTimeout(() => setStep((s) => Math.min(s + 1, total)), 250);
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const reset = () => {
    setStep(0);
    setAnswers(Array(total).fill(null));
  };
  const getBreed = () => {
    const a = answers;
    if (a[2] === 2) return BREEDS[4];
    if ((a[0] === 0 || a[0] === 3) && a[3] === 0) return BREEDS[1];
    if (a[7] === 0 || a[7] === 1) return BREEDS[2];
    if (a[1] === 1 && a[3] >= 2) return BREEDS[3];
    if (a[6] === 0 || a[6] === 1 || a[1] === 3) return BREEDS[0];
    if (a[9] === 1) return BREEDS[5];
    return BREEDS[0];
  };
  return /* @__PURE__ */ React.createElement("div", { className: "quiz-page" }, /* @__PURE__ */ React.createElement("a", { href: "Home.html", className: "quiz-back" }, t(["\u2190 Volver al inicio", "\u2190 Back to home"])), /* @__PURE__ */ React.createElement("div", { className: "quiz-header" }, /* @__PURE__ */ React.createElement("h1", null, t(["Quiz", "The"]), " ", /* @__PURE__ */ React.createElement("em", null, t(["completo", "full quiz"]))), /* @__PURE__ */ React.createElement("p", null, t(["10 preguntas para encontrar tu match perfecto", "10 questions to find your perfect match"]))), /* @__PURE__ */ React.createElement("div", { className: "eq-card" }, /* @__PURE__ */ React.createElement("div", { className: "eq-progress" }, Array.from({ length: total }, (_, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: step > i || isResult ? "done" : "" }))), !isResult ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "eq-step-label" }, t(["Pregunta", "Question"]), " ", step + 1, " ", t(["de", "of"]), " ", total), /* @__PURE__ */ React.createElement("h3", { className: "eq-question" }, t(QUESTIONS[step].q)), /* @__PURE__ */ React.createElement("div", { className: "eq-options" }, QUESTIONS[step].opts.map((opt, i) => /* @__PURE__ */ React.createElement("button", { key: i, className: `eq-opt ${answers[step] === i ? "sel" : ""}`, onClick: () => choose(i) }, /* @__PURE__ */ React.createElement("span", { className: "emoji" }, opt.emoji), /* @__PURE__ */ React.createElement("span", { style: { flex: 1 } }, t(opt.label), /* @__PURE__ */ React.createElement("div", { className: "desc" }, t(opt.desc)))))), /* @__PURE__ */ React.createElement("div", { className: "eq-nav" }, /* @__PURE__ */ React.createElement("button", { className: "eq-nav-back", onClick: back, disabled: step === 0 }, t(["\u2190 Atr\xE1s", "\u2190 Back"])), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "var(--ink-soft)" } }, step + 1, "/", total))) : (() => {
    const breed = getBreed();
    return /* @__PURE__ */ React.createElement("div", { className: "eq-result" }, /* @__PURE__ */ React.createElement("div", { className: "match-pct" }, breed.match, "%"), /* @__PURE__ */ React.createElement("div", { className: "match-lbl" }, t(["Match perfecto", "Perfect match"])), /* @__PURE__ */ React.createElement("h3", null, breed.name), /* @__PURE__ */ React.createElement("p", null, t(breed.desc)), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "var(--ink-soft)", marginBottom: 16 } }, t(["Tama\xF1o", "Size"]), ": ", t(breed.size), " \xB7 ", t(["Energ\xEDa", "Energy"]), ": ", t(breed.energy)), breed.art ? /* @__PURE__ */ React.createElement("a", { href: `Blog.html?art=${breed.art}`, style: { display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 18, fontSize: 14, fontWeight: 600, color: "var(--orange)" } }, t(["Conocer m\xE1s sobre esta raza", "Learn more about this breed"]), /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14M13 5l7 7-7 7" }))) : null, /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("a", { href: "Solicitud.html", className: "btn btn-primary" }, t(["Solicita un", "Request a"]), " ", breed.name.split(" (")[0], /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14M13 5l7 7-7 7" }))), /* @__PURE__ */ React.createElement("button", { className: "btn btn-outline", onClick: reset }, t(["Repetir quiz", "Retake quiz"]))), /* @__PURE__ */ React.createElement("a", { href: "https://wa.me/18084928294", target: "_blank", rel: "noreferrer", style: { display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20, fontSize: 14, fontWeight: 600, color: "var(--orange)" } }, t(["Hablar con un asesor sobre", "Talk to an advisor about"]), " ", breed.name, " \u2192"));
  })()));
}
function QuizRoot() {
  const [lang, setLang] = React.useState("es");
  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang, setLang } }, /* @__PURE__ */ React.createElement(Header, { overDark: false }), /* @__PURE__ */ React.createElement("main", { style: { paddingTop: 80 } }, /* @__PURE__ */ React.createElement(ExtendedQuiz, null)), /* @__PURE__ */ React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(QuizRoot, null));

})();
