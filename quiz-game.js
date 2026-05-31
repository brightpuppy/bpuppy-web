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
    key: "golden",
    art: 1,
    match: 96,
    tone: "#E8A53D",
    img: "fotos-razas/Golden Retriever.webp",
    desc: ["Cari\xF1oso, inteligente y perfecto para familias. Le encantan los ni\xF1os.", "Affectionate, smart and perfect for families. Loves kids."],
    size: ["Grande", "Large"],
    energy: ["Alta", "High"],
    facts: [
      ["Les encanta nadar y traer la pelota una y otra vez.", "They love to swim and fetch over and over."],
      ["Son tan listos que aprenden trucos rapid\xEDsimo.", "So smart they learn tricks super fast."],
      ["De cachorros parecen peluches dorados.", "As puppies they look like golden teddy bears."]
    ]
  },
  {
    name: "French Bulldog",
    key: "frenchie",
    art: 2,
    match: 92,
    tone: "#B8B0A4",
    img: "fotos-razas/French Bulldog.webp",
    desc: ["Compacto, cari\xF1oso y feliz en espacios peque\xF1os. Ama el sof\xE1.", "Compact, affectionate and happy in small spaces. Loves the couch."],
    size: ["Peque\xF1o", "Small"],
    energy: ["Baja", "Low"],
    facts: [
      ["Tienen orejitas de murci\xE9lago muy graciosas.", "They have funny little bat ears."],
      ["A veces roncan cuando duermen.", "Sometimes they snore when they sleep."],
      ["No necesitan mucho ejercicio, \xA1aman descansar!", "They don\u2019t need much exercise, they love to rest!"]
    ]
  },
  {
    name: "Cavalier King Charles",
    key: "cavalier",
    art: 0,
    match: 89,
    tone: "#C9663B",
    img: "fotos-razas/Cavalier King Charles Spaniel.webp",
    desc: ["Dulce, tranquilo y el rey de los abrazos. Ideal para apoyo emocional.", "Sweet, calm and the king of cuddles. Great for emotional support."],
    size: ["Peque\xF1o", "Small"],
    energy: ["Media", "Moderate"],
    facts: [
      ["Siempre quieren estar cerca de ti.", "They always want to be near you."],
      ["Su pelito es suavecito como la seda.", "Their coat is silky soft."],
      ["Te siguen a todas partes como sombras.", "They follow you everywhere like little shadows."]
    ]
  },
  {
    name: "Labrador Retriever",
    key: "labrador",
    art: 3,
    match: 94,
    tone: "#3B2E26",
    img: "fotos-razas/Labrador Retriever.webp",
    desc: ["Activo, sociable y muy entrenable. El mejor amigo para jugar.", "Active, social and very trainable. The best playmate."],
    size: ["Grande", "Large"],
    energy: ["Alta", "High"],
    facts: [
      ["\xA1Aman el agua y los charcos!", "They love water and puddles!"],
      ["Pueden cargar cosas suavecito con la boca.", "They can carry things gently in their mouth."],
      ["Son perfectos para correr y jugar en el parque.", "Perfect for running and playing at the park."]
    ]
  },
  {
    name: "Poodle (Caniche)",
    key: "poodle",
    art: 4,
    match: 91,
    tone: "#E8DCC8",
    img: "fotos-razas/Standard Poodle.webp",
    desc: ["Su pelito rizado casi no suelta pelo. S\xFAper inteligente y elegante.", "Their curly coat barely sheds. Super smart and elegant."],
    size: ["Variable", "Varies"],
    energy: ["Media", "Moderate"],
    facts: [
      ["Su pelo rizado casi no suelta pelo.", "Their curly coat barely sheds."],
      ["Son de los perros m\xE1s inteligentes del mundo.", "One of the smartest dog breeds in the world."],
      ["Vienen en grande, mediano y mini.", "They come in standard, medium and mini."]
    ]
  },
  {
    name: "Beagle",
    key: "beagle",
    art: 7,
    match: 87,
    tone: "#C98A4B",
    img: "fotos-razas/Beagle.webp",
    desc: ["Juguet\xF3n, curioso y excelente con ni\xF1os. \xA1Pura personalidad!", "Playful, curious and great with kids. Full of personality!"],
    size: ["Mediano", "Medium"],
    energy: ["Alta", "High"],
    facts: [
      ["Tienen un olfato s\xFAper poderoso.", "They have a super powerful sense of smell."],
      ["Sus orejas largas son adorables.", "Their long ears are adorable."],
      ["Les encanta explorar y oler TODO.", "They love to explore and sniff EVERYTHING."]
    ]
  }
];
const BREED_INFO = {
  golden: {
    lifespan: ["10\u201312 a\xF1os", "10\u201312 yrs"],
    food: ["3\u20134 tazas", "3\u20134 cups"],
    weight: ["25\u201334 kg", "55\u201375 lb"],
    exercise: ["1\u20132 h/d\xEDa", "1\u20132 h/day"],
    energyPct: 85,
    exercisePct: 80,
    healthPct: 78,
    trainPct: 95,
    health: ["Robusto. Cuidar caderas y el peso.", "Sturdy. Watch hips and weight."],
    goodFor: [["Familias con ni\xF1os", "Families with kids"], ["Terapia y servicio", "Therapy & service"], ["Nadar y traer", "Swim & fetch"], ["Primer perro", "First-time owners"]]
  },
  frenchie: {
    lifespan: ["10\u201312 a\xF1os", "10\u201312 yrs"],
    food: ["1\u20131\xBD tazas", "1\u20131\xBD cups"],
    weight: ["8\u201314 kg", "18\u201328 lb"],
    exercise: ["20\u201340 min/d\xEDa", "20\u201340 min/day"],
    energyPct: 38,
    exercisePct: 30,
    healthPct: 55,
    trainPct: 62,
    health: ["Cuidar la respiraci\xF3n y el calor.", "Mind breathing and heat."],
    goodFor: [["Apartamentos", "Apartments"], ["Compa\xF1\xEDa en casa", "Home companion"], ["Poco ejercicio", "Low exercise"], ["Vida en ciudad", "City life"]]
  },
  cavalier: {
    lifespan: ["9\u201314 a\xF1os", "9\u201314 yrs"],
    food: ["\xBD\u20131 taza", "\xBD\u20131 cup"],
    weight: ["5\u20138 kg", "13\u201318 lb"],
    exercise: ["30\u201360 min/d\xEDa", "30\u201360 min/day"],
    energyPct: 50,
    exercisePct: 45,
    healthPct: 52,
    trainPct: 72,
    health: ["Vigilar el coraz\xF3n con el veterinario.", "Watch heart health with the vet."],
    goodFor: [["Apoyo emocional", "Emotional support"], ["Abrazos y calma", "Cuddles & calm"], ["Adultos mayores", "Seniors"], ["Apartamentos", "Apartments"]]
  },
  labrador: {
    lifespan: ["10\u201312 a\xF1os", "10\u201312 yrs"],
    food: ["3\u20134 tazas", "3\u20134 cups"],
    weight: ["25\u201336 kg", "55\u201380 lb"],
    exercise: ["1\u20132 h/d\xEDa", "1\u20132 h/day"],
    energyPct: 92,
    exercisePct: 90,
    healthPct: 78,
    trainPct: 90,
    health: ["Robusto. Controlar peso y caderas.", "Sturdy. Manage weight and hips."],
    goodFor: [["Familias activas", "Active families"], ["Deportes y agua", "Sports & water"], ["Servicio y rescate", "Service & rescue"], ["Jugar en el parque", "Park play"]]
  },
  poodle: {
    lifespan: ["12\u201315 a\xF1os", "12\u201315 yrs"],
    food: ["1\xBD\u20133 tazas", "1\xBD\u20133 cups"],
    weight: ["Variable", "Varies"],
    exercise: ["45\u201360 min/d\xEDa", "45\u201360 min/day"],
    energyPct: 60,
    exercisePct: 60,
    healthPct: 80,
    trainPct: 98,
    health: ["Longevo. Cepillar el pelaje seguido.", "Long-lived. Brush coat often."],
    goodFor: [["Alergias (poco pelo)", "Allergies (low shed)"], ["Aprender trucos", "Learning tricks"], ["Familias", "Families"], ["Tres tama\xF1os", "Three sizes"]]
  },
  beagle: {
    lifespan: ["12\u201315 a\xF1os", "12\u201315 yrs"],
    food: ["1\u20131\xBD tazas", "1\u20131\xBD cups"],
    weight: ["9\u201311 kg", "20\u201325 lb"],
    exercise: ["1 h+/d\xEDa", "1 h+/day"],
    energyPct: 80,
    exercisePct: 75,
    healthPct: 82,
    trainPct: 55,
    health: ["Sano. Controlar el peso (\xA1comil\xF3n!).", "Healthy. Watch weight (big eater!)."],
    goodFor: [["Ni\xF1os y juego", "Kids & play"], ["Explorar y oler", "Explore & sniff"], ["Familias activas", "Active families"], ["Aventuras al aire libre", "Outdoor adventures"]]
  }
};
const BREED_HISTORY = {
  golden: ["Criado en Escocia a finales del 1800 por Lord Tweedmouth como perro cobrador para aves de caza en agua y tierra. Su car\xE1cter dulce lo convirti\xF3 en uno de los perros familiares m\xE1s queridos del mundo.", "Bred in Scotland in the late 1800s by Lord Tweedmouth as a gundog to retrieve waterfowl. Its gentle nature made it one of the world\u2019s most beloved family dogs."],
  frenchie: ["Desciende de peque\xF1os bulldogs ingleses que llegaron a Francia con artesanos en el siglo XIX. Se volvi\xF3 la mascota favorita de los caf\xE9s de Par\xEDs y hoy es un s\xEDmbolo de compa\xF1\xEDa en la ciudad.", "Descends from small English bulldogs taken to France by lace workers in the 1800s. It became the darling of Parisian caf\xE9s and is now a symbol of city companionship."],
  cavalier: ["Lleva el nombre del rey Carlos II de Inglaterra, que adoraba a estos spaniels de juguete y casi nunca se separaba de ellos. Criado durante siglos como perro de compa\xF1\xEDa y de regazo de la realeza.", "Named after King Charles II of England, who adored these toy spaniels and was rarely without them. Bred for centuries as a royal companion and lap dog."],
  labrador: ["Originario de Terranova (Canad\xE1), ayudaba a los pescadores a halar redes y recoger peces. Refinado en Inglaterra como cobrador, hoy es perro gu\xEDa, de rescate y gran amigo familiar.", "From Newfoundland, Canada, where it helped fishermen haul nets and retrieve fish. Refined in England as a retriever, today it serves as a guide, rescue and family dog."],
  poodle: ['Naci\xF3 en Alemania como perro cobrador de agua (su nombre viene de "pudeln", chapotear); el corte elegante proteg\xEDa sus articulaciones al nadar. Francia lo adopt\xF3 como \xEDcono nacional.', 'Originated in Germany as a water retriever (its name comes from "pudeln", to splash); the fancy clip protected its joints while swimming. France later adopted it as a national icon.'],
  beagle: ["Antiguo sabueso ingl\xE9s de rastro, criado en jaur\xEDas para cazar conejos y liebres gracias a su olfato extraordinario. Su tama\xF1o y nobleza lo hicieron un excelente perro de familia.", "An ancient English scent hound, bred in packs to hunt rabbits and hares thanks to its extraordinary nose. Its size and good nature made it an excellent family dog."]
};
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
const sndJump = () => {
  beep(420, 0.1, "square", 0, 0.05);
  beep(680, 0.1, "square", 0.05, 0.05);
};
const sndCoin = () => {
  beep(988, 0.07, "square", 0, 0.05);
  beep(1319, 0.12, "square", 0.06, 0.05);
};
const sndStep = () => {
  beep(180, 0.04, "square", 0, 0.025);
};
const sndOver = () => {
  [392, 330, 262, 196].forEach((f, i) => beep(f, 0.18, "square", i * 0.12, 0.06));
};
const sndPrize = () => {
  [659, 784, 988, 1319, 1568].forEach((f, i) => beep(f, 0.18, "square", i * 0.09, 0.06));
};
const sndYeah = () => {
  beep(660, 0.07, "triangle", 0, 0.05);
  beep(990, 0.08, "triangle", 0.06, 0.05);
  beep(1320, 0.12, "triangle", 0.13, 0.06);
};
const sndBark = () => {
  beep(300, 0.09, "sawtooth", 0, 0.06);
  beep(190, 0.13, "sawtooth", 0.09, 0.06);
  beep(320, 0.09, "sawtooth", 0.3, 0.06);
  beep(200, 0.13, "sawtooth", 0.39, 0.06);
};
const sndHit = () => {
  beep(200, 0.14, "square", 0, 0.06);
  beep(140, 0.16, "square", 0.08, 0.05);
};
const sndLife = () => {
  [784, 1047, 1319, 1568].forEach((f, i) => beep(f, 0.1, "triangle", i * 0.06, 0.05));
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
    @keyframes qgDriftA { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-30px) rotate(10deg)} }
    @keyframes qgDriftB { 0%,100%{transform:translateY(0) translateX(0) rotate(0)} 50%{transform:translateY(24px) translateX(10px) rotate(-12deg)} }
    @keyframes qgPulseBlob { 0%,100%{transform:scale(1); opacity:.5} 50%{transform:scale(1.18); opacity:.8} }
    .qg-deco{ position:absolute; pointer-events:none; z-index:0; will-change:transform; }
    @media (max-width:820px){ .qg-deco{ display:none } }
    /* Resultado en 2 columnas (PC) -> 1 columna (m\xF3vil/tablet) */
    .qg-rgrid{ display:grid; grid-template-columns:minmax(0,0.92fr) minmax(0,1.08fr); gap:16px; align-items:stretch; }
    @media (max-width:880px){ .qg-rgrid{ grid-template-columns:1fr; } }
    .qg-stat{ background:var(--paper); border-radius:12px; padding:9px 11px; }
    .qg-stat .k{ font-size:10.5px; color:var(--ink-soft); font-weight:700; text-transform:uppercase; letter-spacing:.04em; }
    .qg-stat .v{ font-size:14px; color:var(--ink); font-weight:800; }
    .qg-bar{ height:8px; border-radius:999px; background:var(--paper); overflow:hidden; }
    .qg-bar>i{ display:block; height:100%; border-radius:999px; background:linear-gradient(90deg,#F58220,#E85D75); }
    .qg-chip{ font-size:12px; font-weight:700; color:var(--orange2,#C2521E); background:#FFF1E2; border:1px solid rgba(245,130,32,0.25); border-radius:999px; padding:4px 11px; }
    /* Bot\xF3n JUGAR con borde arco\xEDris animado (texto centrado, color estable) */
    @keyframes qgRainbow{ to{ background-position:0 0,-300% 0; } }
    .qg-jugar{ display:flex; align-items:center; justify-content:center; gap:8px; width:100%; padding:15px; border:3px solid transparent; border-radius:16px;
      background:linear-gradient(#fff,#fff) padding-box, linear-gradient(90deg,#ff4d4d,#ff9f1c,#ffd93d,#4ade80,#38bdf8,#a855f7,#ff4d4d) border-box;
      background-size:100% 100%,300% 100%; animation:qgRainbow 3s linear infinite;
      font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:19px; letter-spacing:.02em; color:var(--ink); cursor:pointer; transition:transform .12s; }
    .qg-jugar:hover{ transform:translateY(-2px); }
    .qg-jugar:active{ transform:scale(.98); }
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
const GAME_SUPA_URL = "https://oqqwmcplljirbreowrll.supabase.co";
const GAME_SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
let _gameSupa = null;
const gameSupa = () => {
  try {
    if (!_gameSupa && window.supabase) _gameSupa = window.supabase.createClient(GAME_SUPA_URL, GAME_SUPA_KEY);
  } catch (e) {
  }
  return _gameSupa;
};
const COUNTRIES = ["Estados Unidos", "M\xE9xico", "Colombia", "Argentina", "Espa\xF1a", "Per\xFA", "Chile", "Venezuela", "Ecuador", "Guatemala", "Cuba", "Bolivia", "Rep\xFAblica Dominicana", "Honduras", "Paraguay", "El Salvador", "Nicaragua", "Costa Rica", "Panam\xE1", "Uruguay", "Puerto Rico", "Brasil", "Canad\xE1", "Otro"];
const CITY_HINTS = ["Miami", "Orlando", "Houston", "Los \xC1ngeles", "Nueva York", "Chicago", "Ciudad de M\xE9xico", "Guadalajara", "Bogot\xE1", "Medell\xEDn", "Buenos Aires", "Madrid", "Barcelona", "Lima", "Santiago", "Caracas", "Quito", "San Juan"];
function drawDog(ctx, x, baseY, tone, key, frame, airborne) {
  const P = 3;
  const px = (cx, cy, w, h, col) => {
    ctx.fillStyle = col;
    ctx.fillRect(Math.round(x + cx * P), Math.round(baseY + cy * P), Math.max(1, w * P), Math.max(1, h * P));
  };
  const dark = "#2D2421", white = "#FBF7F0", belly = "#F4E9D6", collar = "#E23B3B", tag = "#F5C53A", nose = "#2D2421";
  if (airborne) {
    px(3, -1, 2, 2, dark);
    px(9, -1, 2, 2, dark);
  } else if (frame % 2 === 0) {
    px(2, 0, 2, 2, dark);
    px(9, 0, 2, 2, dark);
  } else {
    px(4, 0, 2, 2, dark);
    px(7, 0, 2, 2, dark);
  }
  const tw = airborne ? -1 : frame % 2 ? -1 : 0;
  if (key === "poodle") {
    px(-1, -8 + tw, 3, 3, white);
  } else {
    px(-2, -7 + tw, 3, 2, tone);
    px(-1, -9 + tw, 2, 2, tone);
  }
  px(1, -7, 12, 6, tone);
  px(1, -8, 12, 1, tone);
  px(2, -3, 9, 2, belly);
  px(9, -7, 2, 3, collar);
  px(9, -5, 1, 1, tag);
  px(9, -13, 7, 6, tone);
  px(10, -14, 5, 1, tone);
  px(15, -10, 3, 3, key === "beagle" ? white : tone);
  px(17, -10, 1, 1, nose);
  px(16, -8, 2, 1, nose);
  px(13, -12, 1, 1, dark);
  px(13, -12, 1, 1, dark);
  if (key === "frenchie") {
    px(9, -15, 2, 2, tone);
    px(14, -15, 2, 2, tone);
  } else if (key === "cavalier" || key === "beagle") {
    const ec = key === "beagle" ? "#8a5a32" : "#7a3d22";
    px(8, -13, 2, 5, ec);
    px(15, -13, 2, 4, ec);
  } else if (key === "poodle") {
    px(9, -15, 3, 3, white);
    px(14, -15, 2, 2, white);
  } else {
    px(8, -14, 2, 3, tone);
    px(15, -14, 2, 3, tone);
  }
  if (key === "golden") {
    px(0, -7, 1, 6, "#cf8f2e");
  }
}
function PrizeSymbol({ tier, size }) {
  const s = size || 40;
  const col = ["#9aa0a6", "#CD7F32", "#C0C0C0", "#F5C53A", "#FF7A1A"][tier] || "#F5C53A";
  if (tier >= 3) {
    return /* @__PURE__ */ React.createElement("svg", { width: s, height: s, viewBox: "0 0 48 48", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M14 8h20v6a10 10 0 01-20 0V8z", fill: col, stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M14 11H8a6 6 0 006 7M34 11h6a6 6 0 01-6 7", stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("rect", { x: "20", y: "26", width: "8", height: "7", fill: col, stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("rect", { x: "14", y: "33", width: "20", height: "5", rx: "1.5", fill: col, stroke: "#2D2421", strokeWidth: "2" }));
  }
  if (tier === 2) {
    return /* @__PURE__ */ React.createElement("svg", { width: s, height: s, viewBox: "0 0 48 48", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6l6 12 6-12", stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "24", cy: "30", r: "11", fill: col, stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "24", cy: "30", r: "5", fill: "#fff", opacity: ".5" }));
  }
  return /* @__PURE__ */ React.createElement("svg", { width: s, height: s, viewBox: "0 0 48 48", fill: "none" }, /* @__PURE__ */ React.createElement("rect", { x: "14", y: "20", width: "20", height: "8", rx: "4", fill: col, stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "19", r: "5", fill: col, stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "29", r: "5", fill: col, stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "34", cy: "19", r: "5", fill: col, stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "34", cy: "29", r: "5", fill: col, stroke: "#2D2421", strokeWidth: "2" }));
}
function BreedRunner({ breed, t, lang, onCreateProfile, prefillEmail }) {
  const tone = breed.tone || "#E8A53D";
  const cvsRef = useRef(null);
  const stRef = useRef(null);
  const rafRef = useRef(0);
  const [phase, setPhase] = useState("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try {
      return parseInt(localStorage.getItem("bp_game_best") || "0", 10) || 0;
    } catch (e) {
      return 0;
    }
  });
  const [board, setBoard] = useState([]);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lives, setLives] = useState(3);
  const [treats, setTreats] = useState(0);
  const W = 360, H = 200, GY = H - 24;
  const MAXLIVES = 5, GRAV = 0.4, JUMPV = 8.7;
  const loadBoard = () => {
    const s = gameSupa();
    if (!s) return;
    s.from("game_scores").select("name,country,city,score,breed").order("score", { ascending: false }).limit(10).then(({ data }) => {
      if (data) setBoard(data);
    }).catch(() => {
    });
  };
  useEffect(() => {
    loadBoard();
  }, []);
  const newState = () => ({
    py: 0,
    vy: 0,
    grounded: true,
    jumps: 0,
    frame: 0,
    fcount: 0,
    speed: 1.6,
    dist: 0,
    score: 0,
    treats: 0,
    lives: 3,
    inv: 0,
    obst: [],
    treatArr: [],
    heartArr: [],
    plats: [],
    clouds: [{ x: 60, y: 28 }, { x: 200, y: 46 }, { x: 320, y: 22 }],
    hills: [{ x: 0, w: 200, h: 46 }, { x: 230, w: 240, h: 64 }, { x: 430, w: 200, h: 40 }],
    bldgs: [{ x: 40, w: 46, h: 54 }, { x: 150, w: 38, h: 74 }, { x: 250, w: 54, h: 46 }, { x: 330, w: 40, h: 64 }],
    nextObst: 300,
    nextTreat: 120,
    nextHeart: 1500,
    nextPlat: 380,
    over: false
  });
  const jump = () => {
    const st = stRef.current;
    if (!st || st.over) return;
    if (st.grounded) {
      st.vy = JUMPV;
      st.grounded = false;
      st.jumps = 1;
      sndJump();
    } else if ((st.jumps || 0) < 2) {
      st.vy = JUMPV * 0.92;
      st.jumps = (st.jumps || 0) + 1;
      sndJump();
    }
  };
  const endGame = (finalScore, treatsCollected) => {
    const tier = prizeTier(finalScore);
    setPhase("over");
    setScore(finalScore);
    sndOver();
    setTimeout(() => {
      sndPrize();
      if (tier >= 3) setTimeout(sndBark, 480);
    }, 320);
    try {
      const b = Math.max(finalScore, parseInt(localStorage.getItem("bp_game_best") || "0", 10) || 0);
      localStorage.setItem("bp_game_best", String(b));
      setBest(b);
      if (finalScore >= 300) localStorage.setItem("bp_game_silver", "1");
    } catch (e) {
    }
  };
  const start = () => {
    try {
      const c = ac();
      if (c && c.state === "suspended") c.resume();
    } catch (e) {
    }
    stRef.current = newState();
    setScore(0);
    setLives(3);
    setTreats(0);
    setSaved(false);
    setPhase("playing");
  };
  useEffect(() => {
    if (phase !== "playing") return;
    const cvs = cvsRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2) * 1.5;
    cvs.width = W * DPR;
    cvs.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.imageSmoothingEnabled = true;
    let running = true;
    const loop = () => {
      if (!running) return;
      const st = stRef.current;
      if (!st) {
        return;
      }
      const dogX = 46, dogW = 30, dogH = 30;
      st.dist += st.speed;
      const ramp = Math.max(0, st.dist - 1500);
      st.speed = 1.6 + Math.min(ramp / 3600, 1.6);
      if (st.inv > 0) st.inv--;
      st.vy -= GRAV;
      st.py += st.vy;
      const dogCx = dogX + 15;
      let floor = 0;
      for (const p of st.plats) {
        if (dogCx > p.x - 3 && dogCx < p.x + p.w + 3 && st.vy <= 0 && st.py >= p.top - 7 && st.py <= p.top + 14) floor = Math.max(floor, p.top);
      }
      if (st.py <= floor) {
        st.py = floor;
        st.vy = 0;
        st.grounded = true;
        st.jumps = 0;
      } else {
        st.grounded = false;
      }
      st.fcount++;
      if (st.grounded && st.fcount % Math.max(4, 8 - Math.floor(st.speed)) === 0) {
        st.frame++;
        if (st.fcount % 20 === 0) sndStep();
      }
      st.clouds.forEach((c) => {
        c.x -= st.speed * 0.25;
        if (c.x < -40) {
          c.x = W + 20;
          c.y = 16 + Math.random() * 40;
        }
      });
      st.bldgs.forEach((b) => {
        b.x -= st.speed * 0.5;
        if (b.x + b.w < -6) {
          b.x = W + Math.random() * 40;
          b.w = 34 + Math.random() * 26;
          b.h = 40 + Math.random() * 40;
        }
      });
      st.hills.forEach((hl) => {
        hl.x -= st.speed * 0.18;
        if (hl.x + hl.w < -10) {
          hl.x = W + Math.random() * 120;
          hl.w = 180 + Math.random() * 120;
          hl.h = 38 + Math.random() * 36;
        }
      });
      st.nextPlat -= st.speed;
      if (st.nextPlat <= 0) {
        const top = 36 + Math.floor(Math.random() * 62);
        const w = 48 + Math.floor(Math.random() * 38);
        st.plats.push({ x: W + 10, w, top });
        if (Math.random() < 0.75) st.treatArr.push({ x: W + 10 + w / 2 - 4, y: GY - top - 16, got: false });
        st.nextPlat = 320 + Math.random() * 300;
      }
      st.plats.forEach((p) => {
        p.x -= st.speed;
      });
      st.plats = st.plats.filter((p) => p.x + p.w > -6);
      st.nextObst -= st.speed;
      if (st.nextObst <= 0 && st.dist > 360) {
        const hh = 14 + Math.floor(Math.random() * 14);
        st.obst.push({ x: W + 10, w: 10 + Math.floor(Math.random() * 8), h: hh });
        st.nextObst = 180 - Math.min(st.speed * 10, 48) + Math.random() * 140;
      }
      st.obst.forEach((o) => {
        o.x -= st.speed;
      });
      st.obst = st.obst.filter((o) => o.x + o.w > -4);
      st.nextTreat -= st.speed;
      if (st.nextTreat <= 0) {
        const ground = Math.random() < 0.6;
        st.treatArr.push({ x: W + 10, y: ground ? GY - 16 : GY - (34 + Math.random() * 22), got: false });
        st.nextTreat = 90 + Math.random() * 150;
      }
      st.treatArr.forEach((c) => {
        c.x -= st.speed;
      });
      st.treatArr = st.treatArr.filter((c) => c.x > -12 && !c.got);
      st.nextHeart -= st.speed;
      if (st.nextHeart <= 0) {
        if (st.lives < MAXLIVES) st.heartArr.push({ x: W + 10, y: GY - (38 + Math.random() * 10), got: false });
        st.nextHeart = 1700 + Math.random() * 1200;
      }
      st.heartArr.forEach((c) => {
        c.x -= st.speed;
      });
      st.heartArr = st.heartArr.filter((c) => c.x > -12 && !c.got);
      const dogBottom = GY - st.py, dogLeft = dogX, dogRight = dogX + dogW;
      if (st.inv <= 0) {
        for (const o of st.obst) {
          const oTop = GY - o.h;
          if (dogRight > o.x + 2 && dogLeft < o.x + o.w - 2 && dogBottom > oTop + 3) {
            st.lives--;
            st.inv = 72;
            setLives(st.lives);
            sndHit();
            if (st.lives <= 0) st.over = true;
            break;
          }
        }
      }
      for (const c of st.treatArr) {
        if (!c.got && Math.abs(c.x - (dogX + 15)) < 15 && Math.abs(c.y - (dogBottom - 13)) < 18) {
          c.got = true;
          st.treats++;
          setTreats(st.treats);
          sndYeah();
        }
      }
      for (const c of st.heartArr) {
        if (!c.got && Math.abs(c.x - (dogX + 15)) < 16 && Math.abs(c.y - (dogBottom - 13)) < 20) {
          c.got = true;
          if (st.lives < MAXLIVES) {
            st.lives++;
            setLives(st.lives);
          }
          sndLife();
        }
      }
      st.score = Math.floor(st.dist / 10) + st.treats * 8;
      if (st.fcount % 6 === 0) setScore(st.score);
      const grd = ctx.createLinearGradient(0, 0, 0, H);
      grd.addColorStop(0, "#BFE3F2");
      grd.addColorStop(1, "#EAF6FB");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.translate(W - 36, 30);
      ctx.strokeStyle = "rgba(255,213,138,0.55)";
      ctx.lineWidth = 2;
      const ray = Math.floor(st.dist * 0.5) % 30;
      for (let a = 0; a < 8; a++) {
        const ang = a * Math.PI / 4 + ray * 0.01;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * 16, Math.sin(ang) * 16);
        ctx.lineTo(Math.cos(ang) * 22, Math.sin(ang) * 22);
        ctx.stroke();
      }
      ctx.fillStyle = "#FFD98A";
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, 7);
      ctx.fill();
      ctx.restore();
      st.hills.forEach((hl) => {
        ctx.fillStyle = "#CDE9B8";
        ctx.beginPath();
        ctx.moveTo(hl.x, GY + 4);
        ctx.quadraticCurveTo(hl.x + hl.w / 2, GY + 4 - hl.h, hl.x + hl.w, GY + 4);
        ctx.closePath();
        ctx.fill();
      });
      st.bldgs.forEach((b) => {
        ctx.fillStyle = "#cfe0d6";
        ctx.fillRect(b.x, GY - b.h, b.w, b.h);
        ctx.fillStyle = "#b4c9bd";
        for (let wy = GY - b.h + 6; wy < GY - 6; wy += 10) {
          for (let wx = b.x + 5; wx < b.x + b.w - 5; wx += 10) {
            ctx.fillRect(wx, wy, 5, 5);
          }
        }
      });
      ctx.fillStyle = "#FFFFFF";
      st.clouds.forEach((c) => {
        ctx.fillRect(c.x, c.y, 18, 6);
        ctx.fillRect(c.x + 6, c.y - 5, 12, 6);
      });
      ctx.fillStyle = "#9BD46B";
      ctx.fillRect(0, GY + 4, W, H - GY - 4);
      ctx.fillStyle = "#7CC04E";
      ctx.fillRect(0, GY + 4, W, 4);
      ctx.fillStyle = "#6B4A2B";
      ctx.fillRect(0, GY + 8, W, H - GY - 8);
      ctx.fillStyle = "#5c3f24";
      const off = Math.floor(st.dist) % 16;
      for (let gx = -off; gx < W; gx += 16) {
        ctx.fillRect(gx, GY + 12, 8, 3);
      }
      st.plats.forEach((p) => {
        const py = GY - p.top;
        ctx.fillStyle = "#C2521E";
        ctx.fillRect(p.x, py, p.w, 8);
        ctx.fillStyle = "#E0742F";
        ctx.fillRect(p.x, py, p.w, 3);
        ctx.fillStyle = "#9c3f12";
        for (let bx = p.x + 2; bx < p.x + p.w - 2; bx += 10) {
          ctx.fillRect(bx, py + 3, 2, 5);
        }
      });
      st.obst.forEach((o) => {
        const oy = GY - o.h;
        ctx.fillStyle = "#3C7A3C";
        ctx.fillRect(o.x, oy, o.w, o.h);
        ctx.fillStyle = "#4E994E";
        ctx.fillRect(o.x, oy, o.w, 4);
        ctx.fillStyle = "#2F5F2F";
        ctx.fillRect(o.x + 2, oy + o.h - 4, o.w - 4, 4);
      });
      st.treatArr.forEach((c) => {
        if (c.got) return;
        ctx.fillStyle = "#F7E08A";
        ctx.fillRect(c.x, c.y, 8, 4);
        ctx.fillStyle = "#E8C04A";
        ctx.fillRect(c.x - 1, c.y - 1, 3, 6);
        ctx.fillRect(c.x + 6, c.y - 1, 3, 6);
      });
      st.heartArr.forEach((c) => {
        if (c.got) return;
        ctx.fillStyle = "#E23B3B";
        ctx.fillRect(c.x + 1, c.y + 2, 7, 4);
        ctx.fillRect(c.x, c.y, 3, 3);
        ctx.fillRect(c.x + 6, c.y, 3, 3);
        ctx.beginPath();
        ctx.moveTo(c.x, c.y + 3);
        ctx.lineTo(c.x + 4.5, c.y + 9);
        ctx.lineTo(c.x + 9, c.y + 3);
        ctx.fill();
      });
      if (!(st.inv > 0 && Math.floor(st.fcount / 4) % 2)) {
        drawDog(ctx, dogX, GY - st.py, tone, breed.key, st.frame, !st.grounded);
      }
      for (let i = 0; i < MAXLIVES; i++) {
        const hx = 8 + i * 13, hy = 8;
        ctx.fillStyle = i < st.lives ? "#E23B3B" : "rgba(45,36,33,0.16)";
        ctx.fillRect(hx + 1, hy + 2, 7, 4);
        ctx.fillRect(hx, hy, 3, 3);
        ctx.fillRect(hx + 6, hy, 3, 3);
        ctx.beginPath();
        ctx.moveTo(hx, hy + 3);
        ctx.lineTo(hx + 4.5, hy + 9);
        ctx.lineTo(hx + 9, hy + 3);
        ctx.fill();
      }
      if (st.over) {
        running = false;
        endGame(st.score, st.treats);
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (phase === "playing") jump();
        else if (phase !== "over") start();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);
  const tap = () => {
    if (phase === "playing") jump();
    else if (phase === "ready") start();
  };
  const submitScore = () => {
    const s = gameSupa();
    const nm = name.trim();
    if (!nm) {
      return;
    }
    setSaving(true);
    const row = { name: nm.slice(0, 40), country: country || null, city: city.trim() || null, breed: breed.name, score };
    if (prefillEmail) row.email = prefillEmail;
    const done = () => {
      setSaving(false);
      setSaved(true);
      loadBoard();
      try {
        localStorage.setItem("bp_game_player", JSON.stringify({ name: nm, country, city }));
      } catch (e) {
      }
    };
    if (s) {
      s.from("game_scores").insert(row).then(({ error }) => {
        done();
      }).catch(() => {
        setSaving(false);
        setSaved(true);
      });
    } else {
      done();
    }
  };
  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem("bp_game_player") || "null");
      if (p) {
        setName(p.name || "");
        setCountry(p.country || "");
        setCity(p.city || "");
      }
    } catch (e) {
    }
  }, []);
  const cardSt = { background: "#fff", borderRadius: 24, border: "1px solid var(--line)", overflow: "hidden", boxShadow: "0 10px 40px rgba(45,36,33,0.12)" };
  const firstName = breed.name.split(" (")[0];
  return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 560, margin: "0 auto", padding: "18px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { className: "qg-pop", style: cardSt }, /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,#F58220,#E85D75)", padding: "14px 18px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontWeight: 800, fontSize: 17 } }, t(["Corre con tu", "Run with your"]), " ", firstName), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center", fontSize: 13, fontWeight: 800 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 }, title: "Treats" }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 48 48", fill: "#fff" }, /* @__PURE__ */ React.createElement("rect", { x: "14", y: "20", width: "20", height: "8", rx: "4" }), /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "19", r: "5" }), /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "29", r: "5" }), /* @__PURE__ */ React.createElement("circle", { cx: "34", cy: "19", r: "5" }), /* @__PURE__ */ React.createElement("circle", { cx: "34", cy: "29", r: "5" })), treats), /* @__PURE__ */ React.createElement("span", null, t(["Puntos", "Score"]), ": ", score), /* @__PURE__ */ React.createElement("span", { style: { opacity: 0.85 } }, t(["Mejor", "Best"]), ": ", best))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", background: "#EAF6FB", lineHeight: 0 }, onMouseDown: tap, onTouchStart: (e) => {
    e.preventDefault();
    tap();
  } }, /* @__PURE__ */ React.createElement("canvas", { ref: cvsRef, width: W, height: H, style: { width: "100%", height: "auto", display: "block", cursor: "pointer", touchAction: "none" } }), phase === "ready" && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(255,255,255,0.55)" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.78)", borderRadius: 16, padding: "16px 22px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, color: "var(--ink)", lineHeight: 1.1 } }, t(["\xA1Toca para empezar!", "Tap to start!"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: "var(--ink-2)" } }, t(["Toca para saltar \xB7 doble toque = doble salto", "Tap to jump \xB7 double tap = double jump"])))), phase === "over" && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(45,36,33,0.45)" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: "#fff" } }, /* @__PURE__ */ React.createElement("div", { className: "bp-rainbow", style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 28, fontWeight: 800 } }, t(["\xA1Buen intento!", "Nice run!"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, marginTop: 2 } }, t(["Puntuaci\xF3n", "Score"]), ": ", /* @__PURE__ */ React.createElement("b", null, score))))), /* @__PURE__ */ React.createElement("div", { style: { padding: "18px 20px 22px" } }, phase !== "over" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => phase === "playing" ? jump() : start(), className: "btn btn-primary", style: { flex: 1, justifyContent: "center", cursor: "pointer" } }, phase === "playing" ? t(["Saltar", "Jump"]) : t(["Empezar a jugar", "Start playing"]))), phase === "over" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "center", background: "#FFF7EE", border: "1.5px solid rgba(245,130,32,0.25)", borderRadius: 16, padding: "14px 16px", marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 54, height: 54, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--orange)", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("img", { src: breed.img, alt: breed.name, style: { width: "100%", height: "100%", objectFit: "cover" } })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontSize: 14, color: "var(--ink)", lineHeight: 1.5 } }, /* @__PURE__ */ React.createElement("b", null, firstName), " ", t(["te da un premio:", "gives you a prize:"]), " ", /* @__PURE__ */ React.createElement("b", { style: { color: "var(--orange2,#C2521E)" } }, prizeFor(score, lang)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: "var(--ink-2)", marginTop: 2 } }, score, " ", t(["puntos", "points"]), " \xB7 ", treats, " treats")), /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement(PrizeSymbol, { tier: prizeTier(score), size: 46 }))), !saved ? /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, fontSize: 14, marginBottom: 8, color: "var(--ink)" } }, t(["Guarda tu puntuaci\xF3n", "Save your score"])), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: name,
      onChange: (e) => setName(e.target.value),
      maxLength: 40,
      placeholder: t(["Tu nombre", "Your name"]),
      style: { width: "100%", boxSizing: "border-box", padding: "11px 13px", borderRadius: 12, border: "1px solid var(--line)", fontSize: 14, fontFamily: "inherit", marginBottom: 9, outline: "none" }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 9, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("select", { value: country, onChange: (e) => setCountry(e.target.value), style: { flex: 1, padding: "11px 12px", borderRadius: 12, border: "1px solid var(--line)", fontSize: 14, fontFamily: "inherit", background: "#fff", outline: "none" } }, /* @__PURE__ */ React.createElement("option", { value: "" }, t(["Pa\xEDs\u2026", "Country\u2026"])), COUNTRIES.map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c))), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: city,
      onChange: (e) => setCity(e.target.value),
      list: "bp-cities",
      placeholder: t(["Ciudad", "City"]),
      style: { flex: 1, minWidth: 0, padding: "11px 12px", borderRadius: 12, border: "1px solid var(--line)", fontSize: 14, fontFamily: "inherit", outline: "none" }
    }
  ), /* @__PURE__ */ React.createElement("datalist", { id: "bp-cities" }, CITY_HINTS.map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c })))), /* @__PURE__ */ React.createElement("button", { onClick: submitScore, disabled: !name.trim() || saving, className: "btn btn-primary", style: { width: "100%", justifyContent: "center", cursor: name.trim() ? "pointer" : "default", opacity: name.trim() ? 1 : 0.6 } }, saving ? t(["Guardando\u2026", "Saving\u2026"]) : t(["Guardar en el ranking", "Save to leaderboard"]))) : /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18, padding: "12px 14px", borderRadius: 12, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", fontSize: 13.5, color: "var(--ink)", fontWeight: 600 } }, t(["\xA1Puntuaci\xF3n guardada! Apareces en el ranking.", "Score saved! You are on the leaderboard."])), /* @__PURE__ */ React.createElement("a", { href: "/social?view=profile", className: "btn btn-outline", style: { width: "100%", justifyContent: "center", cursor: "pointer", marginBottom: 18 } }, t(["Crea tu perfil en B Social y gana m\xE1s premios", "Create your B Social profile to win more prizes"])), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--paper)", borderRadius: 16, padding: "14px 16px", marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, fontSize: 14, marginBottom: 10, color: "var(--ink)" } }, t(["Top 10 \u2014 Mejores puntuaciones", "Top 10 \u2014 Best scores"])), board.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "var(--ink-soft)" } }, t(["S\xE9 el primero en el ranking.", "Be the first on the leaderboard."])), board.map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: i < board.length - 1 ? "1px solid var(--line)" : "none" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 22, fontWeight: 900, color: i < 3 ? "var(--orange)" : "var(--ink-soft)", fontSize: 14 } }, i + 1), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontSize: 13.5, fontWeight: 700, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, r.name), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: "var(--ink-soft)" } }, [r.city, r.country].filter(Boolean).join(", ")), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 900, color: "var(--ink)", minWidth: 42, textAlign: "right" } }, r.score)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: start, className: "btn btn-primary", style: { flex: 1, justifyContent: "center", cursor: "pointer" } }, t(["Jugar otra vez", "Play again"])))))));
}
function prizeTier(score) {
  return score >= 800 ? 4 : score >= 500 ? 3 : score >= 300 ? 2 : score >= 150 ? 1 : 0;
}
function prizeFor(score, lang) {
  const labels = [
    ["Estrella de Cachorro", "Puppy Star"],
    ["Galleta de Bronce", "Bronze Treat"],
    ["Hueso de Plata", "Silver Bone"],
    ["Medalla de Oro", "Gold Medal"],
    ["Trofeo Dorado", "Golden Trophy"]
  ];
  return labels[prizeTier(score)][lang === "en" ? 1 : 0];
}
function QuizGame() {
  const t = useT();
  const lang = (typeof LangContext !== "undefined" && React.useContext(LangContext) || {}).lang || "es";
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(Q.length).fill(null));
  const [result, setResult] = useState(false);
  const [muted, setMuted] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [playing, setPlaying] = useState(false);
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
  if (playing) {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 560, margin: "0 auto", padding: "14px 16px 0" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      sndBack();
      setPlaying(false);
    }, style: { background: "none", border: "none", color: "var(--ink-soft)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 6 } }, "\u2190 ", t(["Volver al resultado", "Back to result"]))), /* @__PURE__ */ React.createElement(BreedRunner, { breed: breedFor(), t, lang }));
  }
  if (result) {
    const b = breedFor();
    const info = BREED_INFO[b.key] || {};
    const nm = b.name.split(" (")[0];
    const Bar = ({ label, pct: pct2 }) => /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("span", null, Math.round(pct2 || 0), "%")), /* @__PURE__ */ React.createElement("div", { className: "qg-bar" }, /* @__PURE__ */ React.createElement("i", { style: { width: (pct2 || 0) + "%" } })));
    return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1060, margin: "0 auto", padding: "18px 16px 28px" } }, confetti && /* @__PURE__ */ React.createElement(Confetti, null), /* @__PURE__ */ React.createElement("div", { className: "qg-rgrid" }, /* @__PURE__ */ React.createElement("div", { className: "qg-pop", style: { background: "#fff", borderRadius: 24, border: "1px solid var(--line)", overflow: "hidden", boxShadow: "0 10px 40px rgba(45,36,33,0.1)", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,#F58220,#E85D75)", padding: "15px 20px 13px", textAlign: "center", color: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.9 } }, t(["\xA1Tu match perfecto!", "Your perfect match!"])), /* @__PURE__ */ React.createElement("div", { className: "bp-rainbow", style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", textShadow: "0 1px 8px rgba(0,0,0,0.22)", marginTop: 2 } }, b.name), /* @__PURE__ */ React.createElement("div", { style: { display: "inline-block", marginTop: 6, background: "rgba(255,255,255,0.22)", borderRadius: 999, padding: "3px 13px", fontSize: 13, fontWeight: 800 } }, b.match, "% ", t(["compatible", "match"]))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { borderRadius: 16, overflow: "hidden", background: "var(--paper)", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("img", { src: b.img, alt: b.name, style: { width: "100%", maxHeight: 230, objectFit: "contain", display: "block" } })), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, margin: "0 0 12px" } }, t(b.desc)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { className: "qg-stat", style: { flex: 1, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { className: "k" }, t(["Tama\xF1o", "Size"])), /* @__PURE__ */ React.createElement("div", { className: "v" }, t(b.size))), /* @__PURE__ */ React.createElement("span", { className: "qg-stat", style: { flex: 1, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { className: "k" }, t(["Energ\xEDa", "Energy"])), /* @__PURE__ */ React.createElement("div", { className: "v" }, t(b.energy)))), BREED_HISTORY[b.key] && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 800, color: "var(--orange2,#C2521E)", marginBottom: 5 } }, t(["Historia de la raza", "Breed history"])), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 } }, t(BREED_HISTORY[b.key]))), /* @__PURE__ */ React.createElement("div", { style: { background: "#FFF7EE", border: "1.5px solid rgba(245,130,32,0.25)", borderRadius: 14, padding: "12px 14px", marginTop: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 800, color: "var(--orange2,#C2521E)", marginBottom: 7 } }, t(["Datos divertidos", "Fun facts"])), b.facts.map((f, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 8, marginBottom: 5, alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, color: "#F58220", fontWeight: 900, fontSize: 13 } }, i + 1), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: "var(--ink)", lineHeight: 1.4 } }, t(f))))))), /* @__PURE__ */ React.createElement("div", { className: "qg-pop", style: { background: "#fff", borderRadius: 24, border: "1px solid var(--line)", boxShadow: "0 10px 40px rgba(45,36,33,0.1)", padding: "18px 20px", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: "var(--ink)" } }, t(["Conoce al ", "Meet the "]), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--orange)" } }, nm)), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12.5, color: "var(--ink-soft)", margin: "2px 0 12px", lineHeight: 1.4 } }, t(["\xBFNo conoc\xEDas la raza? Aqu\xED tienes lo importante de un vistazo.", "New to the breed? Here is what matters, at a glance."])), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 13 } }, /* @__PURE__ */ React.createElement("div", { className: "qg-stat" }, /* @__PURE__ */ React.createElement("div", { className: "k" }, t(["Esperanza de vida", "Lifespan"])), /* @__PURE__ */ React.createElement("div", { className: "v" }, t(info.lifespan || ["\u2014", "\u2014"]))), /* @__PURE__ */ React.createElement("div", { className: "qg-stat" }, /* @__PURE__ */ React.createElement("div", { className: "k" }, t(["Alimento diario", "Daily food"])), /* @__PURE__ */ React.createElement("div", { className: "v" }, t(info.food || ["\u2014", "\u2014"]))), /* @__PURE__ */ React.createElement("div", { className: "qg-stat" }, /* @__PURE__ */ React.createElement("div", { className: "k" }, t(["Peso adulto", "Adult weight"])), /* @__PURE__ */ React.createElement("div", { className: "v" }, t(info.weight || ["\u2014", "\u2014"]))), /* @__PURE__ */ React.createElement("div", { className: "qg-stat" }, /* @__PURE__ */ React.createElement("div", { className: "k" }, t(["Ejercicio", "Exercise"])), /* @__PURE__ */ React.createElement("div", { className: "v" }, t(info.exercise || ["\u2014", "\u2014"])))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement(Bar, { label: t(["Energ\xEDa", "Energy"]), pct: info.energyPct }), /* @__PURE__ */ React.createElement(Bar, { label: t(["Necesidad de ejercicio", "Exercise needs"]), pct: info.exercisePct }), /* @__PURE__ */ React.createElement(Bar, { label: t(["Salud", "Health"]), pct: info.healthPct }), /* @__PURE__ */ React.createElement(Bar, { label: t(["Inteligencia", "Intelligence"]), pct: info.trainPct })), info.health && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "var(--ink-2)", margin: "0 0 12px", lineHeight: 1.45 } }, /* @__PURE__ */ React.createElement("b", { style: { color: "var(--ink)" } }, t(["Salud: ", "Health: "])), t(info.health)), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 800, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 7 } }, t(["Bueno para", "Great for"])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, (info.goodFor || []).map((g, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "qg-chip" }, t(g))))), /* @__PURE__ */ React.createElement("a", { href: `/blog?art=${b.art}`, style: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 700, color: "var(--orange)", marginBottom: 12 } }, t(["Aprende m\xE1s sobre esta raza", "Learn more about this breed"]), " \u2192"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "auto" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      try {
        const c = ac();
        if (c && c.state === "suspended") c.resume();
      } catch (e) {
      }
      sndPick();
      setPlaying(true);
    }, className: "qg-jugar", style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M8 5v14l11-7z" })), t(["JUGAR", "PLAY"])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("a", { href: "/solicitud", className: "btn btn-primary", style: { flex: 1, justifyContent: "center", minWidth: 150 } }, t(["Quiero un " + nm, "I want a " + nm])), /* @__PURE__ */ React.createElement("button", { onClick: reset, className: "btn btn-outline", style: { cursor: "pointer" } }, t(["Repetir el quiz", "Retake the quiz"])))))));
  }
  const cur = Q[step];
  return /* @__PURE__ */ React.createElement("div", { style: wrap }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)" } }, t(["Encuentra tu", "Find your"]), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--orange)" } }, t(["cachorro ideal", "perfect puppy"]))), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-soft)", fontSize: 15, margin: "6px 0 0" } }, t(["Un juego r\xE1pido y divertido para toda la familia", "A quick, fun game for the whole family"]))), /* @__PURE__ */ React.createElement("div", { className: "qg-pop", key: step, style: { background: "#fff", borderRadius: 28, border: "1px solid var(--line)", padding: "26px 22px 24px", boxShadow: "0 6px 30px rgba(45,36,33,0.08)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 10, borderRadius: 999, background: "var(--paper)", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: pct + "%", borderRadius: 999, background: "linear-gradient(90deg,#F58220,#E85D75)", transition: "width .35s cubic-bezier(.34,1.56,.64,1)" } })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 800, color: "var(--orange)" } }, step + 1, "/", Q.length), /* @__PURE__ */ React.createElement("button", { onClick: () => setMuted((m) => !m), title: muted ? "Activar sonido" : "Silenciar", style: { background: "none", border: "none", cursor: "pointer", color: "var(--ink-soft)", display: "inline-flex", padding: 4 } }, muted ? /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M11 5 6 9H2v6h4l5 4z" }), /* @__PURE__ */ React.createElement("line", { x1: "23", y1: "9", x2: "17", y2: "15" }), /* @__PURE__ */ React.createElement("line", { x1: "17", y1: "9", x2: "23", y2: "15" })) : /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M11 5 6 9H2v6h4l5 4z" }), /* @__PURE__ */ React.createElement("path", { d: "M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" })))), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(20px,3.2vw,26px)", fontWeight: 700, lineHeight: 1.25, margin: "0 0 18px", color: "var(--ink)" } }, t(cur.q)), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 11 } }, cur.opts.map((opt, i) => {
    const sel = answers[step] === i;
    return /* @__PURE__ */ React.createElement("button", { key: i, onClick: () => choose(i), className: "qg-opt", style: { display: "flex", alignItems: "center", gap: 14, padding: "15px 16px", borderRadius: 16, background: sel ? "rgba(245,130,32,0.08)" : "var(--paper)", border: `2px solid ${sel ? "var(--orange)" : "transparent"}`, textAlign: "left", cursor: "pointer", fontFamily: "inherit" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 30, flexShrink: 0 } }, opt.e), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontSize: 16, fontWeight: 700, color: "var(--ink)" } }, t(opt.l)), /* @__PURE__ */ React.createElement("span", { style: { width: 26, height: 26, borderRadius: "50%", border: `2px solid ${sel ? "var(--orange)" : "var(--line)"}`, background: sel ? "var(--orange)" : "transparent", display: "grid", placeItems: "center", flexShrink: 0 } }, sel && /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12.5l4.5 4.5L19 6.5" }))));
  })), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18, textAlign: "left" } }, /* @__PURE__ */ React.createElement("button", { onClick: back, disabled: step === 0, style: { background: "none", border: "none", color: "var(--ink-soft)", fontSize: 14, fontWeight: 600, cursor: step === 0 ? "default" : "pointer", opacity: step === 0 ? 0 : 1, fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 6 } }, "\u2190 ", t(["Atr\xE1s", "Back"])))));
}
function PawDeco({ c, size }) {
  return /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: "0 0 64 64", fill: c }, /* @__PURE__ */ React.createElement("ellipse", { cx: "32", cy: "44", rx: "14", ry: "11" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "12", cy: "28", rx: "6", ry: "8" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "52", cy: "28", rx: "6", ry: "8" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "23", cy: "15", rx: "5.5", ry: "7" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "41", cy: "15", rx: "5.5", ry: "7" }));
}
function BoneDeco({ c, size }) {
  return /* @__PURE__ */ React.createElement("svg", { width: size, height: size * 0.62, viewBox: "0 0 64 40", fill: c }, /* @__PURE__ */ React.createElement("rect", { x: "14", y: "14", width: "36", height: "12", rx: "6" }), /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "12", r: "8" }), /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "28", r: "8" }), /* @__PURE__ */ React.createElement("circle", { cx: "50", cy: "12", r: "8" }), /* @__PURE__ */ React.createElement("circle", { cx: "50", cy: "28", r: "8" }));
}
function QuizDecor() {
  const items = [
    { t: "paw", side: { left: "5%" }, top: "14vh", size: 54, c: "#F58220", anim: "qgDriftA", dur: 7, delay: 0, op: 0.5, rot: -12 },
    { t: "bone", side: { left: "9%" }, top: "40vh", size: 60, c: "#E85D75", anim: "qgDriftB", dur: 9, delay: 1.2, op: 0.45, rot: 18 },
    { t: "paw", side: { left: "4%" }, top: "66vh", size: 42, c: "#1EB87A", anim: "qgDriftB", dur: 8, delay: 0.5, op: 0.45, rot: 8 },
    { t: "blob", side: { left: "2%" }, top: "30vh", size: 150, c: "#FFD9B3", anim: "qgPulseBlob", dur: 10, delay: 0, op: 0.5 },
    { t: "bone", side: { right: "6%" }, top: "18vh", size: 50, c: "#5B7CFA", anim: "qgDriftA", dur: 8.5, delay: 0.8, op: 0.45, rot: -16 },
    { t: "paw", side: { right: "4%" }, top: "46vh", size: 58, c: "#F5A623", anim: "qgDriftB", dur: 7.5, delay: 0.3, op: 0.5, rot: 14 },
    { t: "paw", side: { right: "9%" }, top: "72vh", size: 40, c: "#E85D75", anim: "qgDriftA", dur: 9, delay: 1.5, op: 0.4, rot: -8 },
    { t: "blob", side: { right: "1%" }, top: "58vh", size: 170, c: "#FFE0EC", anim: "qgPulseBlob", dur: 11, delay: 1, op: 0.5 }
  ];
  return /* @__PURE__ */ React.createElement("div", { "aria-hidden": "true" }, items.map((it, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "qg-deco", style: { ...it.side, top: it.top, opacity: it.op, animation: `${it.anim} ${it.dur}s ease-in-out ${it.delay}s infinite`, transform: it.rot ? `rotate(${it.rot}deg)` : void 0 } }, it.t === "paw" && /* @__PURE__ */ React.createElement(PawDeco, { c: it.c, size: it.size }), it.t === "bone" && /* @__PURE__ */ React.createElement(BoneDeco, { c: it.c, size: it.size }), it.t === "blob" && /* @__PURE__ */ React.createElement("div", { style: { width: it.size, height: it.size, borderRadius: "50%", background: `radial-gradient(circle at 50% 50%, ${it.c}, rgba(255,255,255,0))`, filter: "blur(6px)" } }))));
}
function QuizGameRoot() {
  const [lang, setLang] = useState(() => window.bpGetLang && window.bpGetLang() || "es");
  useEffect(() => {
    document.documentElement.lang = lang;
    ensureCss();
  }, [lang]);
  useEffect(() => window.bpOnLang ? window.bpOnLang(setLang) : void 0, []);
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang, setLang } }, /* @__PURE__ */ React.createElement(Header, { overDark: false }), /* @__PURE__ */ React.createElement("main", { style: { paddingTop: 80, background: "var(--bg,#fff)", minHeight: "100vh", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement(QuizDecor, null), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement(QuizGame, null))), /* @__PURE__ */ React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(QuizGameRoot, null));

})();
