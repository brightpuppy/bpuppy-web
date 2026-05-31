(function(){
(function() {
  const { useState } = React;
  const h = React.createElement;
  const AGE_SUPA_URL = "https://oqqwmcplljirbreowrll.supabase.co";
  const AGE_SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
  function avgYears(lifespan) {
    const n = String(lifespan || "").match(/\d+(\.\d+)?/g);
    if (!n) return null;
    const a = n.map(Number);
    return Math.round((a[0] + (a[1] != null ? a[1] : a[0])) / 2);
  }
  function avgNum(range) {
    const n = String(range || "").replace(",", ".").match(/\d+(\.\d+)?/g);
    if (!n) return null;
    const a = n.map(Number);
    return (a[0] + (a[1] != null ? a[1] : a[0])) / 2;
  }
  function unitOf(range) {
    const s = String(range || "").toLowerCase();
    if (s.includes("lb")) return "lb";
    if (s.includes("cm")) return "cm";
    return "kg";
  }
  function dogToHuman(years, size) {
    if (years <= 0) return 0;
    if (years <= 1) return Math.round(years * 15);
    if (years <= 2) return Math.round(15 + (years - 1) * 9);
    const per = size === "small" || size === "toy" ? 4 : size === "giant" ? 7 : size === "large" ? 6 : 5;
    return Math.round(24 + (years - 2) * per);
  }
  function catToHuman(years) {
    if (years <= 0) return 0;
    if (years <= 1) return Math.round(years * 15);
    if (years <= 2) return Math.round(15 + (years - 1) * 9);
    return Math.round(24 + (years - 2) * 4);
  }
  const GROWTH = {
    toy: { 2: 35, 3: 50, 6: 80, 9: 95, 12: 100 },
    small: { 2: 30, 3: 45, 6: 75, 9: 90, 12: 100 },
    medium: { 2: 25, 3: 40, 6: 66, 9: 85, 12: 95, 15: 100 },
    large: { 2: 20, 3: 35, 6: 55, 9: 72, 12: 85, 18: 100 },
    giant: { 2: 17, 3: 28, 6: 48, 9: 62, 12: 72, 18: 92, 24: 100 }
  };
  function pctAdult(months, size) {
    const tbl = GROWTH[size] || GROWTH.medium;
    const keys = Object.keys(tbl).map(Number).sort((a, b) => a - b);
    if (months >= keys[keys.length - 1]) return 100;
    let prevK = 0, prevV = 8;
    for (const k of keys) {
      if (months <= k) {
        const t = (months - prevK) / (k - prevK || 1);
        return Math.round(prevV + (tbl[k] - prevV) * t);
      }
      prevK = k;
      prevV = tbl[k];
    }
    return 100;
  }
  const tl = (lang, es, en) => lang === "en" ? en : es;
  function GrowthTimeline(props) {
    const lang = props.lang || "es";
    const size = props.size || "medium";
    const adultW = avgNum(props.weight);
    const wUnit = unitOf(props.weight);
    const life = avgYears(props.lifespan) || (props.species === "cat" ? 15 : 12);
    const orange = "#F58220";
    const stages = [
      { months: 3, label: tl(lang, "3 meses", "3 months") },
      { months: 6, label: tl(lang, "6 meses", "6 months") },
      { months: 9, label: tl(lang, "9 meses", "9 months") },
      { months: 12, label: tl(lang, "12 meses", "12 months") }
    ];
    for (let y = 2; y <= life; y += 2) stages.push({ months: y * 12, label: y + (lang === "en" ? " yrs" : " a\xF1os") });
    if (life % 2 !== 0 || stages[stages.length - 1].months < life * 12) {
      stages.push({ months: life * 12, label: life + (lang === "en" ? " yrs (avg)" : " a\xF1os (prom)") });
    }
    const lifeStage = (months) => {
      if (months < 12) return tl(lang, "Cachorro", "Puppy");
      if (months < 24) return tl(lang, "Joven", "Young");
      if (months >= life * 12 * 0.75) return tl(lang, "Senior", "Senior");
      return tl(lang, "Adulto", "Adult");
    };
    const aiEnabled = props.aiEnabled !== false && !!props.photo;
    const [aiMsg, setAiMsg] = useState("");
    const [aiUrl, setAiUrl] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const genAI = async () => {
      if (typeof props.onGenerateAI === "function") {
        props.onGenerateAI();
        return;
      }
      if (aiLoading) return;
      setAiMsg("");
      setAiLoading(true);
      try {
        const r = await fetch(AGE_SUPA_URL + "/functions/v1/pet_age_image", {
          method: "POST",
          headers: { "Content-Type": "application/json", "apikey": AGE_SUPA_KEY, "Authorization": "Bearer " + AGE_SUPA_KEY },
          body: JSON.stringify({ photo_url: props.photo, breed: props.name || "", species: props.species || "dog" })
        });
        const d = await r.json();
        if (d && d.ok && d.url) {
          setAiUrl(d.url);
        } else if (d && d.error === "no_key") {
          setAiMsg(tl(lang, "La generaci\xF3n con IA a\xFAn no est\xE1 configurada (falta la API key).", "AI generation isn\u2019t configured yet (missing API key)."));
        } else {
          setAiMsg(tl(lang, "No se pudo generar la imagen ahora. Intenta de nuevo m\xE1s tarde.", "Couldn\u2019t generate the image right now. Try again later."));
        }
      } catch (e) {
        setAiMsg(tl(lang, "No se pudo generar la imagen ahora.", "Couldn\u2019t generate the image right now."));
      } finally {
        setAiLoading(false);
      }
    };
    const card = { background: "#fff", border: "1px solid var(--line,#ece7e1)", borderRadius: 20, padding: "22px 22px 24px", boxShadow: "0 2px 16px rgba(45,36,33,0.06)" };
    return h(
      "div",
      { style: card },
      h(
        "div",
        { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 4 } },
        h(
          "div",
          { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 19, fontWeight: 800, color: "var(--ink,#2D2421)" } },
          tl(lang, "C\xF3mo va creciendo", "How they grow up")
        ),
        aiEnabled && h(
          "button",
          { onClick: genAI, disabled: aiLoading, style: { fontSize: 12, fontWeight: 700, color: orange, background: "rgba(245,130,32,0.08)", border: "1px solid rgba(245,130,32,0.3)", borderRadius: 999, padding: "6px 12px", cursor: aiLoading ? "default" : "pointer", fontFamily: "inherit", opacity: aiLoading ? 0.6 : 1 } },
          aiLoading ? tl(lang, "Generando\u2026", "Generating\u2026") : tl(lang, "Ver adulto con IA", "See adult with AI")
        )
      ),
      h(
        "p",
        { style: { fontSize: 12.5, color: "var(--ink-soft,#9a8f86)", margin: "0 0 16px" } },
        tl(lang, "Tama\xF1o y peso aproximados por etapa (var\xEDa seg\xFAn cada mascota).", "Approximate size and weight per stage (varies per pet).")
      ),
      aiMsg && h("div", { style: { fontSize: 12.5, color: "var(--ink-2,#6B5A4E)", background: "var(--paper,#FBF7F0)", borderRadius: 10, padding: "9px 12px", marginBottom: 14 } }, aiMsg),
      aiUrl && h(
        "div",
        { style: { marginBottom: 16, textAlign: "center" } },
        h("img", { src: aiUrl, alt: tl(lang, "Posible aspecto de adulto", "Possible adult look"), style: { width: "100%", maxWidth: 300, borderRadius: 16, border: "1px solid var(--line,#ece7e1)", display: "inline-block" } }),
        h(
          "div",
          { style: { fontSize: 11.5, color: "var(--ink-soft,#9a8f86)", marginTop: 6, fontStyle: "italic" } },
          tl(lang, "Imagen generada con IA \u2014 es una estimaci\xF3n y puede no ser 100% exacta.", "AI-generated image \u2014 it\u2019s an estimate and may not be 100% accurate.")
        )
      ),
      h(
        "div",
        { style: { display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8 }, className: "bs-scr" },
        stages.map((st, i) => {
          const pct = pctAdult(st.months, size);
          const scale = 0.45 + 0.55 * (pct / 100);
          const estW = adultW ? Math.round(adultW * pct / 100 * 10) / 10 : null;
          return h(
            "div",
            { key: i, style: { flex: "0 0 auto", width: 104, textAlign: "center" } },
            h(
              "div",
              { style: { height: 96, display: "flex", alignItems: "flex-end", justifyContent: "center", marginBottom: 8 } },
              props.photo ? h("img", { src: props.photo, alt: props.name || "", style: { width: Math.round(86 * scale), height: Math.round(86 * scale), objectFit: "cover", borderRadius: "50%", border: "2px solid " + orange, boxShadow: "0 3px 10px rgba(45,36,33,0.12)" } }) : h("div", { style: { width: Math.round(86 * scale), height: Math.round(86 * scale), borderRadius: "50%", background: "var(--paper)" } })
            ),
            h("div", { style: { fontSize: 13, fontWeight: 800, color: "var(--ink,#2D2421)" } }, st.label),
            h("div", { style: { fontSize: 11, fontWeight: 700, color: orange, marginTop: 1 } }, lifeStage(st.months)),
            h(
              "div",
              { style: { height: 5, borderRadius: 999, background: "var(--paper,#eee)", margin: "6px 0 4px", overflow: "hidden" } },
              h("div", { style: { height: "100%", width: pct + "%", background: orange, borderRadius: 999 } })
            ),
            estW != null ? h("div", { style: { fontSize: 11.5, color: "var(--ink-2,#6B5A4E)" } }, "~" + estW + " " + wUnit) : h("div", { style: { fontSize: 11.5, color: "var(--ink-2,#6B5A4E)" } }, pct + "%")
          );
        })
      )
    );
  }
  function AgeHumanChart(props) {
    const lang = props.lang || "es";
    const species = props.species === "cat" ? "cat" : "dog";
    const size = props.size || "medium";
    const life = avgYears(props.lifespan) || (species === "cat" ? 15 : 12);
    const orange = "#F58220";
    const conv = (y) => species === "cat" ? catToHuman(y) : dogToHuman(y, size);
    const rows = [];
    [0.5, 1, 2].forEach((y) => rows.push(y));
    for (let y = 4; y <= life; y += 2) rows.push(y);
    if (rows[rows.length - 1] < life) rows.push(life);
    const petLbl = (y) => y < 1 ? lang === "en" ? "6 mo" : "6 meses" : y + (lang === "en" ? " yr" : " a\xF1o" + (y > 1 ? "s" : ""));
    const card = { background: "#fff", border: "1px solid var(--line,#ece7e1)", borderRadius: 20, padding: "22px", boxShadow: "0 2px 16px rgba(45,36,33,0.06)" };
    return h(
      "div",
      { style: card },
      h(
        "div",
        { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 19, fontWeight: 800, color: "var(--ink,#2D2421)", marginBottom: 4 } },
        species === "cat" ? tl(lang, "Su edad en a\xF1os humanos", "Their age in human years") : tl(lang, "Su edad en a\xF1os humanos", "Their age in human years")
      ),
      h(
        "p",
        { style: { fontSize: 12.5, color: "var(--ink-soft,#9a8f86)", margin: "0 0 16px" } },
        species === "cat" ? tl(lang, "Los gatos maduran r\xE1pido el primer a\xF1o y luego ~4 a\xF1os humanos por a\xF1o.", "Cats mature fast the first year, then ~4 human years per year.") : tl(lang, "El primer a\xF1o equivale a ~15 a\xF1os; el ritmo cambia seg\xFAn el tama\xF1o.", "The first year \u2248 15 years; the pace varies by size.")
      ),
      h(
        "div",
        { style: { display: "grid", gap: 8 } },
        rows.map((y, i) => {
          const human = conv(y);
          const w = Math.min(100, Math.round(human / conv(life) * 100));
          return h(
            "div",
            { key: i, style: { display: "flex", alignItems: "center", gap: 12 } },
            h("div", { style: { width: 78, flexShrink: 0, fontSize: 13, fontWeight: 800, color: "var(--ink,#2D2421)", textAlign: "right" } }, petLbl(y)),
            h(
              "div",
              { style: { flex: 1, height: 22, borderRadius: 999, background: "var(--paper,#f4efe9)", overflow: "hidden" } },
              h("div", { style: { height: "100%", width: w + "%", minWidth: 26, background: "linear-gradient(90deg,#F58220,#E85D75)", borderRadius: 999 } })
            ),
            h("div", { style: { width: 86, flexShrink: 0, fontSize: 12.5, fontWeight: 700, color: orange } }, human + (lang === "en" ? " human yr" : " a\xF1os humanos"))
          );
        })
      )
    );
  }
  Object.assign(window, {
    GrowthTimeline,
    AgeHumanChart,
    ageHelpers: { avgYears, avgNum, dogToHuman, catToHuman, pctAdult }
  });
})();

})();
