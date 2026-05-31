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
    ctx.fillRect(Math.round(x + cx * P), Math.round(baseY + cy * P), w * P, h * P);
  };
  const dark = "#2D2421", white = "#FBF7F0", nose = "#2D2421";
  const legUp = airborne ? 1 : frame % 2 === 0 ? 0 : 1;
  px(2, 0, 2, 2, dark);
  px(8, 0 + (legUp ? 0 : 0), 2, 2 - legUp, dark);
  px(2, -1, 2, 1, dark);
  px(1, -6, 11, 6, tone);
  px(1, -7, 11, 1, tone);
  if (key === "poodle") {
    px(0, -8, 2, 2, white);
  } else {
    px(-1, -7, 2, 2, tone);
  }
  px(9, -11, 6, 5, tone);
  px(10, -12, 4, 1, tone);
  px(14, -9, 3, 2, key === "beagle" ? white : tone);
  px(16, -9, 1, 1, nose);
  px(12, -10, 1, 1, dark);
  if (key === "frenchie") {
    px(9, -13, 2, 2, tone);
    px(13, -13, 2, 2, tone);
  } else if (key === "cavalier" || key === "beagle") {
    px(8, -11, 2, 4, key === "beagle" ? "#8a5a32" : "#7a3d22");
    px(14, -11, 2, 4, key === "beagle" ? "#8a5a32" : "#7a3d22");
  } else if (key === "poodle") {
    px(9, -13, 3, 3, white);
    px(13, -13, 2, 2, white);
  } else {
    px(8, -12, 2, 3, tone);
    px(14, -12, 2, 3, tone);
  }
  if (key === "golden") {
    px(0, -6, 1, 6, "#cf8f2e");
  }
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
  const W = 360, H = 200, GY = H - 26;
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
    airborne: false,
    frame: 0,
    fcount: 0,
    speed: 2,
    dist: 0,
    score: 0,
    coins: 0,
    obst: [],
    coinArr: [],
    clouds: [{ x: 60, y: 30 }, { x: 200, y: 48 }, { x: 320, y: 24 }],
    nextObst: 90,
    nextCoin: 140,
    over: false,
    t0: 0
  });
  const jump = () => {
    const st = stRef.current;
    if (!st || st.over) return;
    if (!st.airborne) {
      st.vy = 7.4;
      st.airborne = true;
      sndJump();
    }
  };
  const endGame = (finalScore) => {
    setPhase("over");
    setScore(finalScore);
    sndOver();
    setTimeout(() => sndPrize(), 350);
    try {
      const b = Math.max(finalScore, parseInt(localStorage.getItem("bp_game_best") || "0", 10) || 0);
      localStorage.setItem("bp_game_best", String(b));
      setBest(b);
    } catch (e) {
    }
    if (prefillEmail && !name) {
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
    setSaved(false);
    setPhase("playing");
  };
  useEffect(() => {
    if (phase !== "playing") return;
    const cvs = cvsRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    let running = true;
    const loop = () => {
      if (!running) return;
      const st = stRef.current;
      if (!st) {
        return;
      }
      st.dist += st.speed;
      st.speed = 2 + Math.min(st.dist / 1600, 3);
      st.vy -= 0.42;
      st.py += st.vy;
      if (st.py <= 0) {
        st.py = 0;
        st.vy = 0;
        st.airborne = false;
      }
      st.fcount++;
      if (st.fcount % Math.max(4, 9 - Math.floor(st.speed)) === 0) {
        st.frame++;
        if (!st.airborne && st.fcount % 18 === 0) sndStep();
      }
      st.clouds.forEach((c) => {
        c.x -= st.speed * 0.25;
        if (c.x < -40) {
          c.x = W + 20;
          c.y = 18 + Math.random() * 40;
        }
      });
      st.nextObst -= st.speed;
      if (st.nextObst <= 0) {
        const h = 14 + Math.floor(Math.random() * 16);
        st.obst.push({ x: W + 10, w: 10 + Math.floor(Math.random() * 8), h });
        const gapMin = 150 - Math.min(st.speed * 10, 50);
        st.nextObst = gapMin + Math.random() * 120;
      }
      st.obst.forEach((o) => {
        o.x -= st.speed;
      });
      st.obst = st.obst.filter((o) => o.x + o.w > -4);
      st.nextCoin -= st.speed;
      if (st.nextCoin <= 0) {
        st.coinArr.push({ x: W + 10, y: GY - (24 + Math.random() * 40), got: false });
        st.nextCoin = 110 + Math.random() * 160;
      }
      st.coinArr.forEach((c) => {
        c.x -= st.speed;
      });
      st.coinArr = st.coinArr.filter((c) => c.x > -10 && !c.got);
      const dogX = 46, dogW = 34, dogH = 30;
      const dogBottom = GY - st.py;
      const dogTop = dogBottom - dogH;
      const dogLeft = dogX, dogRight = dogX + dogW - 8;
      for (const o of st.obst) {
        const oTop = GY - o.h;
        if (dogRight > o.x + 2 && dogLeft < o.x + o.w - 2 && dogBottom > oTop + 3) {
          st.over = true;
          break;
        }
      }
      for (const c of st.coinArr) {
        if (!c.got && Math.abs(c.x - (dogX + 14)) < 14 && Math.abs(c.y - (dogBottom - 14)) < 18) {
          c.got = true;
          st.coins += 5;
          sndCoin();
        }
      }
      st.score = Math.floor(st.dist / 10) + st.coins;
      if (st.fcount % 6 === 0) setScore(st.score);
      const grd = ctx.createLinearGradient(0, 0, 0, H);
      grd.addColorStop(0, "#BFE3F2");
      grd.addColorStop(1, "#EAF6FB");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#FFD98A";
      ctx.fillRect(W - 46, 18, 18, 18);
      ctx.fillStyle = "#FFFFFF";
      st.clouds.forEach((c) => {
        ctx.fillRect(c.x, c.y, 18, 6);
        ctx.fillRect(c.x + 6, c.y - 5, 12, 6);
      });
      ctx.fillStyle = "#9BD46B";
      ctx.fillRect(0, GY + 6, W, H - GY - 6);
      ctx.fillStyle = "#7CC04E";
      ctx.fillRect(0, GY + 6, W, 4);
      ctx.fillStyle = "#6B4A2B";
      ctx.fillRect(0, GY + 10, W, H - GY - 10);
      ctx.fillStyle = "#5c3f24";
      const off = Math.floor(st.dist) % 16;
      for (let gx = -off; gx < W; gx += 16) {
        ctx.fillRect(gx, GY + 14, 8, 3);
      }
      st.obst.forEach((o) => {
        const oy = GY - o.h;
        ctx.fillStyle = "#3C7A3C";
        ctx.fillRect(o.x, oy, o.w, o.h);
        ctx.fillStyle = "#4E994E";
        ctx.fillRect(o.x, oy, o.w, 4);
        ctx.fillStyle = "#2F5F2F";
        ctx.fillRect(o.x + 2, oy + o.h - 4, o.w - 4, 4);
      });
      st.coinArr.forEach((c) => {
        if (c.got) return;
        ctx.fillStyle = "#F7E08A";
        ctx.fillRect(c.x, c.y, 8, 4);
        ctx.fillStyle = "#E8C04A";
        ctx.fillRect(c.x - 1, c.y - 1, 3, 6);
        ctx.fillRect(c.x + 6, c.y - 1, 3, 6);
      });
      drawDog(ctx, dogX, GY - st.py, tone, breed.key, st.frame, st.airborne);
      if (st.over) {
        running = false;
        endGame(st.score);
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
  return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 560, margin: "0 auto", padding: "18px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { className: "qg-pop", style: cardSt }, /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,#F58220,#E85D75)", padding: "14px 18px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontWeight: 800, fontSize: 17 } }, t(["Corre con tu", "Run with your"]), " ", firstName), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "center", fontSize: 13, fontWeight: 800 } }, /* @__PURE__ */ React.createElement("span", null, t(["Puntos", "Score"]), ": ", score), /* @__PURE__ */ React.createElement("span", { style: { opacity: 0.85 } }, t(["Mejor", "Best"]), ": ", best))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", background: "#EAF6FB", lineHeight: 0 }, onMouseDown: tap, onTouchStart: (e) => {
    e.preventDefault();
    tap();
  } }, /* @__PURE__ */ React.createElement("canvas", { ref: cvsRef, width: W, height: H, style: { width: "100%", height: "auto", display: "block", imageRendering: "pixelated", cursor: "pointer", touchAction: "none" } }), phase === "ready" && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(255,255,255,0.55)" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, color: "var(--ink)", marginBottom: 6 } }, t(["\xA1Toca para empezar!", "Tap to start!"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "var(--ink-2)" } }, t(["Click o toque = saltar", "Click or tap = jump"])))), phase === "over" && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(45,36,33,0.45)" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 26, fontWeight: 800 } }, t(["\xA1Buen intento!", "Nice run!"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, marginTop: 2 } }, t(["Puntuaci\xF3n", "Score"]), ": ", /* @__PURE__ */ React.createElement("b", null, score))))), /* @__PURE__ */ React.createElement("div", { style: { padding: "18px 20px 22px" } }, phase !== "over" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => phase === "playing" ? jump() : start(), className: "btn btn-primary", style: { flex: 1, justifyContent: "center", cursor: "pointer" } }, phase === "playing" ? t(["Saltar", "Jump"]) : t(["Empezar a jugar", "Start playing"]))), phase === "over" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "center", background: "#FFF7EE", border: "1.5px solid rgba(245,130,32,0.25)", borderRadius: 16, padding: "14px 16px", marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 54, height: 54, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--orange)", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("img", { src: breed.img, alt: breed.name, style: { width: "100%", height: "100%", objectFit: "cover" } })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: "var(--ink)", lineHeight: 1.5 } }, /* @__PURE__ */ React.createElement("b", null, firstName), " ", t(["te da un premio:", "gives you a prize:"]), " ", /* @__PURE__ */ React.createElement("b", { style: { color: "var(--orange2,#C2521E)" } }, prizeFor(score, lang)), " \xB7 ", score, " ", t(["puntos", "points"]))), !saved ? /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, fontSize: 14, marginBottom: 8, color: "var(--ink)" } }, t(["Guarda tu puntuaci\xF3n", "Save your score"])), /* @__PURE__ */ React.createElement(
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
function prizeFor(score, lang) {
  const tiers = [
    [800, ["Trofeo Dorado", "Golden Trophy"]],
    [500, ["Medalla de Oro", "Gold Medal"]],
    [300, ["Hueso de Plata", "Silver Bone"]],
    [150, ["Galleta de Bronce", "Bronze Treat"]],
    [0, ["Estrella de Cachorro", "Puppy Star"]]
  ];
  const idx = lang === "en" ? 1 : 0;
  for (const [min, labels] of tiers) {
    if (score >= min) return labels[idx];
  }
  return tiers[tiers.length - 1][1][idx];
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
    return /* @__PURE__ */ React.createElement("div", { style: wrap }, confetti && /* @__PURE__ */ React.createElement(Confetti, null), /* @__PURE__ */ React.createElement("div", { className: "qg-pop", style: { background: "#fff", borderRadius: 28, border: "1px solid var(--line)", overflow: "hidden", boxShadow: "0 10px 40px rgba(45,36,33,0.1)" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,#F58220,#E85D75)", padding: "30px 24px 26px", textAlign: "center", color: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.9 } }, t(["\xA1Tu match perfecto!", "Your perfect match!"])), /* @__PURE__ */ React.createElement("div", { style: { width: 96, height: 96, margin: "12px auto", borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.2)", animation: "qgBounce 1.8s ease-in-out infinite" } }, /* @__PURE__ */ React.createElement("img", { src: b.img, alt: b.name, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" } }, b.name), /* @__PURE__ */ React.createElement("div", { style: { display: "inline-block", marginTop: 8, background: "rgba(255,255,255,0.22)", borderRadius: 999, padding: "4px 14px", fontSize: 14, fontWeight: 800 } }, b.match, "% ", t(["compatible", "match"]))), /* @__PURE__ */ React.createElement("div", { style: { padding: "22px 24px 26px" } }, /* @__PURE__ */ React.createElement("div", { style: { borderRadius: 18, overflow: "hidden", background: "var(--paper)", marginBottom: 16, display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("img", { src: b.img, alt: b.name, style: { width: "100%", maxHeight: 360, objectFit: "contain", display: "block" } })), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15.5, color: "var(--ink-2)", lineHeight: 1.6, margin: "0 0 16px" } }, t(b.desc)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("span", { style: { flex: 1, textAlign: "center", background: "var(--paper)", borderRadius: 12, padding: "10px", fontSize: 13, color: "var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--ink-soft)" } }, t(["Tama\xF1o", "Size"])), /* @__PURE__ */ React.createElement("b", null, t(b.size))), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, textAlign: "center", background: "var(--paper)", borderRadius: 12, padding: "10px", fontSize: 13, color: "var(--ink)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--ink-soft)" } }, t(["Energ\xEDa", "Energy"])), /* @__PURE__ */ React.createElement("b", null, t(b.energy)))), /* @__PURE__ */ React.createElement("div", { style: { background: "#FFF7EE", border: "1.5px solid rgba(245,130,32,0.25)", borderRadius: 16, padding: "16px 18px", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "var(--orange2,#C2521E)", marginBottom: 10 } }, t(["Datos divertidos para conocer mejor a tu raza", "Fun facts to get to know your breed"])), b.facts.map((f, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, color: "#F58220", fontWeight: 900 } }, i + 1), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, color: "var(--ink)", lineHeight: 1.5 } }, t(f))))), /* @__PURE__ */ React.createElement("button", { onClick: () => {
      try {
        const c = ac();
        if (c && c.state === "suspended") c.resume();
      } catch (e) {
      }
      sndPick();
      setPlaying(true);
    }, className: "btn btn-primary", style: { width: "100%", justifyContent: "center", cursor: "pointer", marginBottom: 14, background: "linear-gradient(135deg,#F58220,#E85D75)" } }, t(["Juega y corre con tu " + b.name.split(" (")[0], "Play & run with your " + b.name.split(" (")[0]])), /* @__PURE__ */ React.createElement("a", { href: `/blog?art=${b.art}`, style: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: "var(--orange)", marginBottom: 18 } }, t(["Aprende m\xE1s sobre esta raza", "Learn more about this breed"]), " \u2192"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("a", { href: "/solicitud", className: "btn btn-primary", style: { flex: 1, justifyContent: "center", minWidth: 180 } }, t(["Quiero un " + b.name.split(" (")[0], "I want a " + b.name.split(" (")[0]])), /* @__PURE__ */ React.createElement("button", { onClick: reset, className: "btn btn-outline", style: { cursor: "pointer" } }, t(["Jugar otra vez", "Play again"]))))));
  }
  const cur = Q[step];
  return /* @__PURE__ */ React.createElement("div", { style: wrap }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)" } }, t(["Encuentra tu", "Find your"]), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--orange)" } }, t(["cachorro ideal", "perfect puppy"]))), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-soft)", fontSize: 15, margin: "6px 0 0" } }, t(["Un juego r\xE1pido y divertido para toda la familia", "A quick, fun game for the whole family"]))), /* @__PURE__ */ React.createElement("div", { className: "qg-pop", key: step, style: { background: "#fff", borderRadius: 28, border: "1px solid var(--line)", padding: "26px 22px 24px", boxShadow: "0 6px 30px rgba(45,36,33,0.08)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 10, borderRadius: 999, background: "var(--paper)", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: pct + "%", borderRadius: 999, background: "linear-gradient(90deg,#F58220,#E85D75)", transition: "width .35s cubic-bezier(.34,1.56,.64,1)" } })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 800, color: "var(--orange)" } }, step + 1, "/", Q.length), /* @__PURE__ */ React.createElement("button", { onClick: () => setMuted((m) => !m), title: muted ? "Activar sonido" : "Silenciar", style: { background: "none", border: "none", cursor: "pointer", color: "var(--ink-soft)", display: "inline-flex", padding: 4 } }, muted ? /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M11 5 6 9H2v6h4l5 4z" }), /* @__PURE__ */ React.createElement("line", { x1: "23", y1: "9", x2: "17", y2: "15" }), /* @__PURE__ */ React.createElement("line", { x1: "17", y1: "9", x2: "23", y2: "15" })) : /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M11 5 6 9H2v6h4l5 4z" }), /* @__PURE__ */ React.createElement("path", { d: "M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" })))), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(20px,3.2vw,26px)", fontWeight: 700, lineHeight: 1.25, margin: "0 0 18px", color: "var(--ink)" } }, t(cur.q)), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 11 } }, cur.opts.map((opt, i) => {
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
