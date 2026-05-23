const { useState: useStateQ } = React;
function Process() {
  const t = useT();
  const steps = [
    {
      t: STRINGS.process.s1t,
      d: STRINGS.process.s1d,
      icPaths: ["M11 3a8 8 0 1 0 0 16A8 8 0 0 0 11 3z", "M21 21l-5.2-5.2"]
    },
    {
      t: STRINGS.process.s2t,
      d: STRINGS.process.s2d,
      icPaths: ["M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.64 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.61 8.91A16 16 0 0 0 13.6 14.9l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16z"]
    },
    {
      t: STRINGS.process.s3t,
      d: STRINGS.process.s3d,
      icPaths: ["M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"]
    },
    {
      t: STRINGS.process.s4t,
      d: STRINGS.process.s4d,
      icPaths: ["M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"]
    }
  ];
  return /* @__PURE__ */ React.createElement("section", { className: "sec process", id: "process" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "sec-head reveal" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, t(STRINGS.process.eyebrow)), /* @__PURE__ */ React.createElement("h2", null, t(STRINGS.process.title_a), " ", /* @__PURE__ */ React.createElement("em", null, t(STRINGS.process.title_b)))), /* @__PURE__ */ React.createElement("p", null, t(STRINGS.process.sub))), /* @__PURE__ */ React.createElement("div", { className: "process-grid" }, steps.map(
    (s, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "step reveal", "data-d": i + 1 }, /* @__PURE__ */ React.createElement("div", { className: "ic" }, /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, s.icPaths.map((p, pi) => /* @__PURE__ */ React.createElement("path", { key: pi, d: p })))), /* @__PURE__ */ React.createElement("div", { className: "step-num" }, "0", i + 1), /* @__PURE__ */ React.createElement("h3", null, t(s.t)), /* @__PURE__ */ React.createElement("p", null, t(s.d)))
  )), /* @__PURE__ */ React.createElement("div", { className: "process-guarantee reveal", style: { marginTop: 36, textAlign: "center" } }, /* @__PURE__ */ React.createElement("a", { href: "Garantia.html", className: "btn btn-primary" }, t(["Conoce m\xE1s sobre nuestra garant\xEDa", "Learn more about our guarantee"]), /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14M13 5l7 7-7 7" }))))));
}
const QUIZ_BREEDS = [
  {
    name: "French Bulldog",
    art: 2,
    size: 0,
    energy: 1,
    apt: true,
    kids: true,
    blurb: ["Ideal para apartamentos. Tranquilo, cari\xF1oso y perfecto para la vida urbana.", "Ideal for apartments. Calm, affectionate and perfect for city life."]
  },
  {
    name: "Pomeranian",
    art: 51,
    size: 0,
    energy: 2,
    apt: true,
    kids: false,
    blurb: ["Peque\xF1o, alegre y lleno de personalidad. Perfecto para espacios reducidos.", "Small, cheerful and full of personality. Perfect for small spaces."]
  },
  {
    name: "Yorkshire Terrier",
    art: 6,
    size: 0,
    energy: 2,
    apt: true,
    kids: false,
    blurb: ["Compa\xF1ero leal y elegante en cuerpo peque\xF1o. Genial para departamentos.", "A loyal, elegant companion in a small body. Great for apartments."]
  },
  {
    name: "Poodle",
    art: 4,
    size: 1,
    energy: 2,
    apt: true,
    kids: true,
    blurb: ["Inteligente, hipoalerg\xE9nico y muy adaptable. Excelente para familias.", "Smart, hypoallergenic and highly adaptable. Excellent for families."]
  },
  {
    name: "Beagle",
    art: 7,
    size: 1,
    energy: 3,
    apt: false,
    kids: true,
    blurb: ["Curioso, juguet\xF3n y amante de la familia. Necesita ejercicio diario.", "Curious, playful and family-loving. Needs daily exercise."]
  },
  {
    name: "Golden Retriever",
    art: 1,
    size: 2,
    energy: 3,
    apt: false,
    kids: true,
    blurb: ["Familias activas y casas con espacio. Cari\xF1oso y se adapta a ni\xF1os sin esfuerzo.", "Active families and homes with space. Affectionate and great with kids."]
  },
  {
    name: "Labrador Retriever",
    art: 3,
    size: 2,
    energy: 3,
    apt: false,
    kids: true,
    blurb: ["El compa\xF1ero que nunca falla. Leal, energ\xE9tico y perfecto para familias grandes.", "The companion that never fails. Loyal, energetic and perfect for big families."]
  },
  {
    name: "Husky",
    art: 46,
    size: 2,
    energy: 3,
    apt: false,
    kids: false,
    blurb: ["Para los m\xE1s activos. Necesita mucho ejercicio y espacio para correr.", "For the most active. Needs lots of exercise and room to run."]
  }
];
function matchBreed(answers) {
  const a = answers.map((x) => x == null ? 0 : x);
  const [home, time, family, size] = a;
  let best = QUIZ_BREEDS[0], bestScore = -1;
  for (const b of QUIZ_BREEDS) {
    let s = 0;
    if (size !== 3) {
      if (b.size === size) s += 3;
      else if (Math.abs(b.size - size) === 1) s += 1;
    }
    if (home === 0 || home === 3) {
      if (b.apt) s += 2;
    } else {
      if (b.size >= 1) s += 1;
    }
    if (b.energy === time) s += 2;
    else if (Math.abs(b.energy - time) === 1) s += 1;
    if (family === 2 || family === 3) {
      if (b.kids) s += 2;
    }
    if (s > bestScore) {
      bestScore = s;
      best = b;
    }
  }
  return { breed: best, pct: Math.min(98, 84 + bestScore * 2) };
}
function Quiz() {
  const t = useT();
  const { lang } = useLang();
  const [step, setStep] = useStateQ(0);
  const [answers, setAnswers] = useStateQ([null, null, null, null]);
  const QS = [
    { q: STRINGS.quiz.q1, opts: STRINGS.quiz.q1a, descs: STRINGS.quiz.q1aD, emojis: STRINGS.quiz.q1e },
    { q: STRINGS.quiz.q2, opts: STRINGS.quiz.q2a, descs: STRINGS.quiz.q2aD, emojis: STRINGS.quiz.q2e },
    { q: STRINGS.quiz.q3, opts: STRINGS.quiz.q3a, descs: STRINGS.quiz.q3aD, emojis: STRINGS.quiz.q3e },
    { q: STRINGS.quiz.q4, opts: STRINGS.quiz.q4a, descs: STRINGS.quiz.q4aD, emojis: STRINGS.quiz.q4e }
  ];
  const choose = (idx) => {
    const next = [...answers];
    next[step] = idx;
    setAnswers(next);
    setTimeout(() => setStep((s) => Math.min(s + 1, 4)), 220);
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const reset = () => {
    setStep(0);
    setAnswers([null, null, null, null]);
  };
  const isResult = step === 4;
  const match = isResult ? matchBreed(answers) : { breed: QUIZ_BREEDS[0], pct: 96 };
  return /* @__PURE__ */ React.createElement("section", { className: "sec quiz", id: "quiz", style: { background: "linear-gradient(135deg,#0E0B1E 0%,#1A0D35 50%,#0C1628 100%)" } }, /* @__PURE__ */ React.createElement("div", { className: "quiz-shape" }), /* @__PURE__ */ React.createElement("div", { className: "quiz-shape" }), /* @__PURE__ */ React.createElement("div", { className: "container quiz-grid" }, /* @__PURE__ */ React.createElement("div", { className: "quiz-intro reveal" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow", style: { color: "var(--orange)" } }, t(STRINGS.quiz.eyebrow)), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(40px, 6.5vw, 88px)", margin: "12px 0 0", letterSpacing: "-0.04em", lineHeight: 0.92, color: "#fff" } }, t(STRINGS.quiz.title_a), " ", /* @__PURE__ */ React.createElement("em", { className: "serif-italic", style: { color: "var(--orange)" } }, t(STRINGS.quiz.title_b))), /* @__PURE__ */ React.createElement("p", { style: { color: "rgb(233, 233, 233)" } }, t(STRINGS.quiz.sub)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "rgb(204, 202, 201)" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 8, height: 8, borderRadius: 50, background: "var(--orange)" } }), " 4 preguntas"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "rgb(204, 202, 201)" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 8, height: 8, borderRadius: 50, background: "var(--orange)" } }), " 30 segundos"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "rgb(204, 202, 201)" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 8, height: 8, borderRadius: 50, background: "var(--orange)" } }), " Match instant\xE1neo"))), /* @__PURE__ */ React.createElement("div", { className: "quiz-card reveal", "data-d": "2", style: { position: "relative" } }, /* @__PURE__ */ React.createElement("div", { className: "quiz-progress" }, [0, 1, 2, 3].map((i) => /* @__PURE__ */ React.createElement("span", { key: i, className: step > i || isResult ? "done" : "" }))), !isResult ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "quiz-step-label" }, t(STRINGS.quiz.step), " ", step + 1, " ", t(STRINGS.quiz.of), " 4"), /* @__PURE__ */ React.createElement("h3", { className: "quiz-q" }, t(QS[step].q)), /* @__PURE__ */ React.createElement("div", { className: "quiz-options" }, QS[step].opts.map(
    (opt, i) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: i,
        className: `quiz-opt ${answers[step] === i ? "sel" : ""}`,
        onClick: () => choose(i)
      },
      /* @__PURE__ */ React.createElement("span", { className: "emoji" }, QS[step].emojis[i]),
      /* @__PURE__ */ React.createElement("span", { className: "lab" }, t(opt), /* @__PURE__ */ React.createElement("div", { className: "desc" }, t(QS[step].descs[i])))
    )
  )), /* @__PURE__ */ React.createElement("div", { className: "quiz-nav" }, /* @__PURE__ */ React.createElement("button", { className: "quiz-back", onClick: back, disabled: step === 0 }, t(STRINGS.quiz.back)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "var(--ink-soft)" } }, step + 1, "/4")), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid var(--line)", marginTop: 18, paddingTop: 14, textAlign: "center" } }, /* @__PURE__ */ React.createElement("a", { href: "Quiz-Completo.html", style: { fontSize: 13, fontWeight: 600, color: "var(--orange)", display: "inline-flex", alignItems: "center", gap: 6 } }, t(["Haz un quiz m\xE1s completo aqu\xED \u2192", "Take a more complete quiz here \u2192"])))) : /* @__PURE__ */ React.createElement("div", { className: "quiz-result" }, /* @__PURE__ */ React.createElement("div", { className: "match-pct" }, match.pct, "%"), /* @__PURE__ */ React.createElement("div", { className: "match-lbl" }, t(STRINGS.quiz.matchLbl)), /* @__PURE__ */ React.createElement("h3", null, match.breed.name), /* @__PURE__ */ React.createElement("p", null, t(match.breed.blurb)), /* @__PURE__ */ React.createElement("a", { href: `Blog.html?art=${match.breed.art}`, style: { fontSize: 14, color: "var(--orange)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 8 } }, t(["Conocer m\xE1s sobre esta raza", "Learn more about this breed"]), /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14M13 5l7 7-7 7" }))), /* @__PURE__ */ React.createElement("div", { className: "actions" }, /* @__PURE__ */ React.createElement("a", { href: "Solicitud.html", className: "btn btn-primary" }, t(["Solicita un " + match.breed.name, "Request a " + match.breed.name])), /* @__PURE__ */ React.createElement("button", { className: "btn btn-outline", onClick: reset }, t(STRINGS.quiz.again))), /* @__PURE__ */ React.createElement("a", { href: "Quiz-Completo.html", className: "btn btn-outline", style: { marginTop: 10, fontSize: 13 } }, t(["Hacer un quiz m\xE1s completo (10 preguntas)", "Take a more complete quiz (10 questions)"]))))));
}
Object.assign(window, { Process, Quiz });
