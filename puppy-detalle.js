(function(){
const PD_SUPA_URL = "https://oqqwmcplljirbreowrll.supabase.co";
const PD_SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
const pdSb = (() => {
  try {
    return supabase.createClient(PD_SUPA_URL, PD_SUPA_KEY);
  } catch (e) {
    return null;
  }
})();
function pdAge(p) {
  const w = p.age_weeks || (p.birth_date ? Math.floor((Date.now() - new Date(p.birth_date)) / 6048e5) : null);
  if (!w && w !== 0) return null;
  if (w < 16) return w + " semanas";
  if (w < 52) return Math.floor(w / 4) + " meses";
  return Math.floor(w / 52) + " a\xF1os";
}
function pdPhotos(p) {
  if (Array.isArray(p.photos) && p.photos.length) return p.photos;
  if (p.photo_url) return [p.photo_url];
  return [];
}
function PdTag({ children, accent, green }) {
  const bg = green ? "rgba(16,185,129,0.1)" : accent ? "rgba(245,130,32,0.12)" : "var(--paper)";
  const color = green ? "#065F46" : accent ? "var(--orange)" : "var(--ink-2)";
  const border = green ? "rgba(16,185,129,0.22)" : accent ? "rgba(245,130,32,0.25)" : "var(--line)";
  return /* @__PURE__ */ React.createElement("span", { style: { padding: "6px 13px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: bg, color, border: `1px solid ${border}`, display: "inline-block" } }, children);
}
function PdGallery({ photos, name, status }) {
  const [cur, setCur] = React.useState(0);
  const ph = photos[cur];
  const statusLabel = status === "available" ? "Disponible" : status === "reserved" ? "Reservado" : null;
  const statusBg = status === "available" ? "var(--orange)" : "#2D2421";
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", borderRadius: "var(--r)", overflow: "hidden", aspectRatio: "1/1", background: "var(--bg-2)", boxShadow: "var(--shadow-card)" } }, ph ? /* @__PURE__ */ React.createElement("img", { src: ph, alt: name, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }, onError: (e) => e.target.style.display = "none" }) : /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 } }, "\u{1F436}"), statusLabel && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 16, left: 16, background: statusBg, color: "#fff", padding: "6px 14px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" } }, statusLabel)), photos.length > 1 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" } }, photos.map(function(u, i) {
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: i,
        onClick: function() {
          setCur(i);
        },
        style: { width: 64, height: 64, borderRadius: 10, overflow: "hidden", border: cur === i ? "2.5px solid var(--orange)" : "2px solid var(--line)", padding: 0, cursor: "pointer", background: "var(--bg-2)", flexShrink: 0 }
      },
      /* @__PURE__ */ React.createElement("img", { src: u, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } })
    );
  })));
}
const PD_FIN_PLANS = [
  { id: "k4", name: "Klarna", sub: "4 pagos \xB7 Sin inter\xE9s", type: "split", count: 4, apr: 0, brandColor: "#FFB3C7", brandText: "#1A1A1A" },
  { id: "pp6", name: "PayPal", sub: "6 pagos \xB7 Sin inter\xE9s", type: "split", count: 6, apr: 0, brandColor: "#003087", brandText: "#fff" },
  { id: "af12", name: "Affirm", sub: "12 meses \xB7 ~15% APR", type: "loan", count: 12, apr: 15, brandColor: "#0FA0EA", brandText: "#fff" },
  { id: "af24", name: "Affirm", sub: "24 meses \xB7 ~18% APR", type: "loan", count: 24, apr: 18, brandColor: "#0FA0EA", brandText: "#fff" }
];
function pdCalcPmt(fin, plan) {
  if (fin <= 0) return { pmt: 0, total: fin };
  if (plan.type === "split") return { pmt: fin / plan.count, total: fin };
  const r = plan.apr / 100 / 12, n = plan.count;
  const m = r === 0 ? fin / n : fin * r / (1 - Math.pow(1 + r, -n));
  return { pmt: m, total: m * n };
}
function pdFmt(n) {
  return "$" + Math.round(n).toLocaleString("en-US");
}
function PdFinCalc({ price }) {
  const [dp, setDp] = React.useState(0);
  const [sel, setSel] = React.useState("k4");
  const fin = Math.max(0, (price || 0) - dp);
  const plan = PD_FIN_PLANS.find(function(p) {
    return p.id === sel;
  }) || PD_FIN_PLANS[0];
  const { pmt } = pdCalcPmt(fin, plan);
  return /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", border: "1px solid var(--line)", borderRadius: "var(--r)", padding: 28 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 6 } }, "Financiamiento"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--display)", fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 20, color: "var(--ink)" } }, "Ll\xE9valo a casa hoy"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 600, color: "var(--ink-2)" } }, "Pago inicial"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: "var(--orange)" } }, price ? Math.round(dp / price * 100) : 0, "%")), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "range",
      min: "0",
      max: price || 5e3,
      step: "50",
      value: dp,
      onChange: function(e) {
        setDp(+e.target.value);
      },
      style: { width: "100%", accentColor: "var(--orange)", marginBottom: 6 }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: "var(--ink)" } }, pdFmt(dp))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", borderRadius: 10, padding: "10px 16px", marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "var(--ink-2)", fontWeight: 600 } }, "A financiar"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 20, fontWeight: 800, color: "var(--ink)" } }, pdFmt(fin))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 } }, PD_FIN_PLANS.map(function(pl) {
    const r = pdCalcPmt(fin, pl);
    const active = sel === pl.id;
    const lbl = pl.type === "split" ? "por pago" : "/mes";
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: pl.id,
        onClick: function() {
          setSel(pl.id);
        },
        style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderRadius: 12, cursor: "pointer", border: active ? `2px solid ${pl.brandColor}` : "1.5px solid var(--line)", background: active ? pl.brandColor + "18" : "var(--bg)", fontFamily: "var(--body)", transition: "all .15s" }
      },
      /* @__PURE__ */ React.createElement("div", { style: { textAlign: "left" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 900, padding: "2px 8px", borderRadius: 999, background: pl.brandColor, color: pl.brandText, letterSpacing: "0.02em" } }, pl.name)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: active ? "var(--ink-2)" : "var(--ink-2)", marginTop: 3 } }, pl.sub)),
      /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 17, fontWeight: 800, color: active ? "var(--ink)" : "var(--ink)" } }, pdFmt(r.pmt)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--ink-2)" } }, lbl))
    );
  })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--ink-soft)", textAlign: "center", fontStyle: "italic", marginBottom: 16 } }, "* Estimaciones. T\xE9rminos finales dependen de aprobaci\xF3n de cr\xE9dito."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 } }, [
    { label: "WhatsApp", icon: "\u{1F4AC}", bg: "#25D366", href: `https://wa.me/18084928294?text=Hola, me interesa financiar un cachorro`, color: "#fff" },
    { label: "SMS", icon: "\u{1F4F1}", bg: "var(--bg)", href: `sms:+18084928294?body=Hola, me interesa financiar un cachorro`, color: "var(--ink)", bdr: "var(--line)" },
    { label: "Aplicar", icon: "\u2713", bg: "var(--orange)", href: "legal/financing.html", color: "#fff", blank: true }
  ].map(function(b, i) {
    return /* @__PURE__ */ React.createElement(
      "a",
      {
        key: i,
        href: b.href,
        target: b.blank ? "_blank" : "_self",
        rel: "noreferrer",
        style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 6px", borderRadius: 10, background: b.bg, color: b.color, textDecoration: "none", fontSize: 11, fontWeight: 700, border: b.bdr ? `1px solid ${b.bdr}` : "none" }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15 } }, b.icon),
      /* @__PURE__ */ React.createElement("span", null, b.label)
    );
  })));
}
function PdIncludes({ p }) {
  const items = [
    { icon: "\u{1F489}", label: "Vacunas al d\xEDa", ok: p.vaccinated },
    { icon: "\u{1F4CB}", label: "Certificado de salud", ok: p.health_cert },
    { icon: "\u{1F3E0}", label: "Criado en familia", ok: true },
    { icon: "\u{1F4E1}", label: "Microchip incluido", ok: true },
    { icon: "\u{1F6E1}\uFE0F", label: "Garant\xEDa de salud", ok: true },
    { icon: "\u2708\uFE0F", label: "Entrega a nivel nacional", ok: true },
    { icon: "\u{1F4AC}", label: "Asesor\xEDa 24/7 \u2014 chat y equipo", ok: true },
    { icon: "\u{1F381}", label: "Kit: alimento, platitos y juguete", ok: true }
  ];
  return /* @__PURE__ */ React.createElement("section", { style: { padding: "clamp(48px,6vw,80px) clamp(20px,5vw,80px)", background: "#fff", borderTop: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 10 } }, "Lo que incluye"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--display)", fontSize: "clamp(26px,4vw,42px)", fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 32px", color: "var(--ink)" } }, "Todo listo para su nuevo hogar"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 12 } }, items.filter(function(it) {
    return it.ok !== false;
  }).map(function(it, i) {
    return /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: "var(--r-sm)", background: "var(--bg)", border: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 22, flexShrink: 0 } }, it.icon), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3 } }, it.label));
  }))));
}
function PdRatingBar({ label, value }) {
  if (!value && value !== 0) return null;
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "var(--ink-2)", minWidth: 160, lineHeight: 1.3 } }, label), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 6, background: "var(--line)", borderRadius: 3, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: value / 5 * 100 + "%", background: "var(--orange)", borderRadius: 3 } })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "var(--orange)", minWidth: 28, textAlign: "right" } }, value, "/5"));
}
function PdStatCard({ icon, label, value, wide }) {
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px", borderRadius: "var(--r-sm)", background: "var(--bg)", border: "1px solid var(--line)", gridColumn: wide ? "span 2" : "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, marginBottom: 6 } }, icon), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-2)", marginBottom: 3 } }, label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--ink)", textTransform: "capitalize" } }, value));
}
function PdBreed({ breed: b }) {
  const ratings = [
    ["Con familias", b.rating_family],
    ["Con ni\xF1os", b.rating_kids],
    ["Con otras mascotas", b.rating_other_pets],
    ["Nivel de energ\xEDa", b.rating_energy],
    ["Entrenabilidad", b.rating_trainability],
    ["Apto para apartamento", b.rating_apartment]
  ].filter(function(r) {
    return r[1];
  });
  return /* @__PURE__ */ React.createElement("section", { style: { padding: "clamp(48px,6vw,80px) clamp(20px,5vw,80px)", background: "#fff", borderTop: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 10 } }, "Sobre la raza"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--display)", fontSize: "clamp(26px,4vw,42px)", fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 32px", color: "var(--ink)" } }, b.name), /* @__PURE__ */ React.createElement("div", { className: "pd-breed-grid", style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 } }, /* @__PURE__ */ React.createElement("div", null, b.description && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15, color: "var(--ink-2)", lineHeight: 1.75, marginBottom: 24 } }, b.description), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, b.weight_min_lbs && b.weight_max_lbs && /* @__PURE__ */ React.createElement(PdStatCard, { icon: "\u2696\uFE0F", label: "Peso adulto", value: `${b.weight_min_lbs}\u2013${b.weight_max_lbs} lbs` }), b.lifespan_min && b.lifespan_max && /* @__PURE__ */ React.createElement(PdStatCard, { icon: "\u23F3", label: "Longevidad", value: `${b.lifespan_min}\u2013${b.lifespan_max} a\xF1os` }), b.coat_type && /* @__PURE__ */ React.createElement(PdStatCard, { icon: "\u2728", label: "Pelaje", value: b.coat_type }), b.best_for_home && /* @__PURE__ */ React.createElement(PdStatCard, { icon: "\u{1F3E0}", label: "Ideal para", value: b.best_for_home, wide: true }))), ratings.length > 0 && /* @__PURE__ */ React.createElement("div", null, ratings.map(function(r, i) {
    return /* @__PURE__ */ React.createElement(PdRatingBar, { key: i, label: r[0], value: r[1] });
  }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 } }, b.hypoallergenic === true && /* @__PURE__ */ React.createElement(PdTag, { green: true }, "\u2713 Hipoalerg\xE9nico"), b.hypoallergenic === false && /* @__PURE__ */ React.createElement(PdTag, null, "No hipoalerg\xE9nico"), b.good_for_first_time === true && /* @__PURE__ */ React.createElement(PdTag, { green: true }, "\u2713 Ideal para principiantes"), b.good_for_first_time === false && /* @__PURE__ */ React.createElement(PdTag, null, "Mejor con experiencia"))))));
}
function PdParentCard({ parent: par, role }) {
  const ph = par.photo_url || null;
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, padding: 16, background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "var(--r-sm)", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 80, height: 80, borderRadius: 10, background: "var(--bg-2)", overflow: "hidden", flexShrink: 0 } }, ph ? /* @__PURE__ */ React.createElement("img", { src: ph, alt: par.name, style: { width: "100%", height: "100%", objectFit: "cover" } }) : /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 } }, role === "Mam\xE1" ? "\u{1F469}" : "\u{1F468}")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 2 } }, role), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--display)", fontSize: 18, fontWeight: 700, color: "var(--ink)", marginBottom: 3 } }, par.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--ink-2)" } }, [par.breed, par.color, par.weight_lbs && par.weight_lbs + " lbs"].filter(Boolean).join(" \xB7 ")), par.pedigree_org && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--orange)", marginTop: 5 } }, "\u{1F4DC} ", par.pedigree_org, par.pedigree_number ? " \xB7 " + par.pedigree_number : "")));
}
function PdFamilyFin({ mom, dad, price }) {
  return /* @__PURE__ */ React.createElement("section", { style: { padding: "clamp(48px,6vw,80px) clamp(20px,5vw,80px)", background: "#fff", borderTop: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { className: "pd-family-grid", style: { display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 48 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 10 } }, "Sus padres"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--display)", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 24px", color: "var(--ink)" } }, "Conoce a su familia"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, mom && /* @__PURE__ */ React.createElement(PdParentCard, { parent: mom, role: "Mam\xE1" }), dad && /* @__PURE__ */ React.createElement(PdParentCard, { parent: dad, role: "Pap\xE1" }))), /* @__PURE__ */ React.createElement("div", null, price && /* @__PURE__ */ React.createElement(PdFinCalc, { price })))));
}
function PdMiniCard({ p }) {
  const ph = Array.isArray(p.photos) && p.photos[0] || p.photo_url || null;
  return /* @__PURE__ */ React.createElement(
    "a",
    {
      href: `/puppy-detalle?id=${p.id}`,
      style: { display: "block", textDecoration: "none", borderRadius: "var(--r-sm)", overflow: "hidden", background: "#fff", border: "1px solid var(--line)", transition: "transform .2s, box-shadow .2s" },
      onMouseEnter: function(e) {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
      },
      onMouseLeave: function(e) {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
      }
    },
    /* @__PURE__ */ React.createElement("div", { style: { aspectRatio: "1/1", background: "var(--bg-2)", overflow: "hidden" } }, ph ? /* @__PURE__ */ React.createElement("img", { src: ph, alt: p.name, style: { width: "100%", height: "100%", objectFit: "cover" } }) : /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 } }, "\u{1F436}")),
    /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--display)", fontSize: 17, fontWeight: 700, color: "var(--ink)", marginBottom: 3 } }, p.name || "Sin nombre"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--ink-2)", marginBottom: 6 } }, [p.breed, p.gender === "female" ? "Hembra" : p.gender === "male" ? "Macho" : null].filter(Boolean).join(" \xB7 ")), p.status === "available" && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: "rgba(245,130,32,0.1)", color: "var(--orange)", letterSpacing: "0.06em", textTransform: "uppercase" } }, "Disponible"), p.status === "reserved" && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: "var(--bg)", color: "var(--ink-2)", letterSpacing: "0.06em", textTransform: "uppercase" } }, "Reservado"))
  );
}
function PdSiblingsSection({ siblings }) {
  return /* @__PURE__ */ React.createElement("section", { style: { padding: "clamp(48px,6vw,80px) clamp(20px,5vw,80px)", background: "#fff", borderTop: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 10 } }, "De la misma camada"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--display)", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 28px", color: "var(--ink)" } }, "Sus hermanos"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 14 } }, siblings.map(function(s) {
    return /* @__PURE__ */ React.createElement(PdMiniCard, { key: s.id, p: s });
  }))));
}
function PdSimilarSection({ similar, breed }) {
  return /* @__PURE__ */ React.createElement("section", { style: { padding: "clamp(48px,6vw,80px) clamp(20px,5vw,80px)", background: "#fff", borderTop: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 10 } }, "Tambi\xE9n te puede gustar"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--display)", fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 28px", color: "var(--ink)" } }, "M\xE1s ", breed || "cachorros"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 16 } }, similar.map(function(s) {
    return /* @__PURE__ */ React.createElement(PdMiniCard, { key: s.id, p: s });
  }))));
}
function PdReserveModal({ puppy, onClose }) {
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    var v = function(id) {
      var el = document.getElementById("pdrf-" + id);
      return el ? el.value.trim() : "";
    };
    try {
      await pdSb.from("website_leads").insert({
        gclid: (function() {
          try {
            window.bpLead && window.bpLead();
          } catch (e2) {
          }
          return typeof window !== "undefined" && window.bpGclid ? window.bpGclid() : null;
        })(),
        full_name: v("name"),
        email: v("email"),
        phone: v("phone"),
        zip_code: v("zip"),
        message: v("msg"),
        puppy_id: puppy.id,
        puppy_name: puppy.name || null,
        puppy_breed: puppy.breed || null,
        source: "puppy_detail"
      });
      setSent(true);
    } catch (err) {
      alert("Error al enviar. Por favor cont\xE1ctanos directamente por WhatsApp.");
    } finally {
      setLoading(false);
    }
  }
  const fields = [
    ["name", "Nombre completo *", "text", true],
    ["email", "Email *", "email", true],
    ["phone", "Tel\xE9fono *", "tel", true],
    ["zip", "C\xF3digo postal", "text", false]
  ];
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: function(e) {
        if (e.target === e.currentTarget) onClose();
      },
      style: { position: "fixed", inset: 0, background: "rgba(45,36,33,0.6)", backdropFilter: "blur(8px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }
    },
    /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: "var(--r)", maxWidth: 460, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "var(--shadow-soft)", position: "relative" } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { position: "absolute", top: 14, right: 14, width: 34, height: 34, borderRadius: "50%", border: "1px solid var(--line)", background: "none", cursor: "pointer", fontSize: 18, display: "grid", placeItems: "center", color: "var(--ink-2)" } }, "\xD7"), /* @__PURE__ */ React.createElement("div", { style: { padding: "28px 28px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 6 } }, "Solicitar informaci\xF3n"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 6, color: "var(--ink)" } }, puppy.name ? `Reservar a ${puppy.name}` : "Solicitar informaci\xF3n"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "var(--ink-2)", marginBottom: 20, lineHeight: 1.6 } }, "Te contactamos en horario h\xE1bil. Sin compromiso.")), sent ? /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 28px 28px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 52, marginBottom: 12 } }, "\u{1F389}"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--display)", fontSize: 20, fontWeight: 700, color: "var(--ink)", marginBottom: 8 } }, "\xA1Solicitud enviada!"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "var(--ink-2)", marginBottom: 20, lineHeight: 1.65 } }, "Gracias por tu inter\xE9s en ", puppy.name || "este cachorro", ". Te contactaremos muy pronto."), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { background: "var(--orange)", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 999, fontWeight: 700, cursor: "pointer", fontFamily: "var(--body)", fontSize: 14 } }, "Cerrar")) : /* @__PURE__ */ React.createElement("form", { onSubmit: submit, style: { padding: "0 28px 28px", display: "flex", flexDirection: "column", gap: 12 } }, fields.map(function(f) {
      return /* @__PURE__ */ React.createElement("div", { key: f[0] }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 11, fontWeight: 700, color: "var(--ink-2)", display: "block", marginBottom: 4 } }, f[1]), /* @__PURE__ */ React.createElement(
        "input",
        {
          id: "pdrf-" + f[0],
          type: f[2],
          required: f[3],
          style: { width: "100%", padding: "10px 12px", border: "1.5px solid var(--line)", borderRadius: 8, fontFamily: "var(--body)", fontSize: 14, color: "var(--ink)", background: "var(--bg)", outline: "none" }
        }
      ));
    }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 11, fontWeight: 700, color: "var(--ink-2)", display: "block", marginBottom: 4 } }, "Cu\xE9ntanos sobre tu hogar"), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        id: "pdrf-msg",
        rows: "3",
        placeholder: "Familia, otras mascotas, experiencia con la raza\u2026",
        style: { width: "100%", padding: "10px 12px", border: "1.5px solid var(--line)", borderRadius: 8, fontFamily: "var(--body)", fontSize: 14, color: "var(--ink)", background: "var(--bg)", resize: "vertical", outline: "none" }
      }
    )), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "submit",
        disabled: loading,
        style: { background: "var(--orange)", color: "#fff", border: "none", padding: "14px 24px", borderRadius: 999, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "var(--body)", marginTop: 4, opacity: loading ? 0.7 : 1, boxShadow: "0 8px 24px -8px rgba(245,130,32,0.45)" }
      },
      loading ? "Enviando\u2026" : "\u{1F4E9} Enviar solicitud"
    )))
  );
}
function PdHero({ p, photos, age }) {
  const [modal, setModal] = React.useState(false);
  const [intlModal, setIntlModal] = React.useState(false);
  const available = p.status === "available";
  const reserved = p.status === "reserved";
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", { style: { padding: "clamp(32px,5vw,64px) clamp(20px,5vw,80px) clamp(48px,6vw,80px)", background: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto" } }, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "/cachorros",
      style: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--ink-2)", textDecoration: "none", marginBottom: 28, padding: "7px 14px", borderRadius: 999, background: "var(--paper)", border: "1px solid var(--line)" }
    },
    "\u2190 Todos los cachorros"
  ), /* @__PURE__ */ React.createElement("div", { className: "pd-hero-grid", style: { display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 48, alignItems: "start" } }, /* @__PURE__ */ React.createElement(PdGallery, { photos, name: p.name, status: p.status }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: "var(--orange)", letterSpacing: "0.04em", marginBottom: 8 } }, p.breed), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "var(--display)", fontSize: "clamp(40px,6vw,72px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.93, margin: "0 0 18px", color: "var(--ink)" } }, p.name || "Cachorro"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 } }, p.gender === "female" && /* @__PURE__ */ React.createElement(PdTag, null, "\u2640 Hembra"), p.gender === "male" && /* @__PURE__ */ React.createElement(PdTag, null, "\u2642 Macho"), age && /* @__PURE__ */ React.createElement(PdTag, null, age), p.color && /* @__PURE__ */ React.createElement(PdTag, null, p.color), p.weight_lbs && /* @__PURE__ */ React.createElement(PdTag, null, p.weight_lbs, " lbs"), p.pedigree_org && /* @__PURE__ */ React.createElement(PdTag, { accent: true }, "\u{1F4DC} ", p.pedigree_org), p.vaccinated && /* @__PURE__ */ React.createElement(PdTag, { green: true }, "\u2713 Vacunado"), p.health_cert && /* @__PURE__ */ React.createElement(PdTag, { green: true }, "\u2713 Cert. de salud")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15, color: "var(--ink-2)", lineHeight: 1.75, marginBottom: 22, padding: "16px 18px", background: "var(--bg)", borderRadius: "var(--r-sm)", borderLeft: "3px solid var(--orange)" } }, p.description || `${p.name || "Este cachorro"} ha sido criado con amor en familia, con toda la socializaci\xF3n y cuidados que merece desde sus primeras semanas.`), p.price && /* @__PURE__ */ React.createElement("div", { style: { padding: "18px 20px", background: "var(--bg)", border: "2px solid var(--orange)", borderRadius: "var(--r-sm)", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--display)", fontSize: 42, fontWeight: 800, color: "var(--orange)", lineHeight: 1 } }, "$", Number(p.price).toLocaleString()), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--ink-2)", marginTop: 5 } }, "Precio total \xB7 Incluye garant\xEDa, vacunas y documentaci\xF3n completa")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, available && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: function() {
        setModal(true);
      },
      style: { padding: "15px 24px", background: "var(--orange)", color: "#fff", border: "none", borderRadius: 999, fontFamily: "var(--body)", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px -8px rgba(245,130,32,0.5)" }
    },
    "\u{1F49B} Me interesa ",
    p.name || "este cachorro"
  ), available && p.price && /* @__PURE__ */ React.createElement("button", { onClick: function(e){ var b=e.currentTarget; b.disabled=true; b.textContent="Redirigiendo a pago seguro..."; fetch(PD_SUPA_URL+"/functions/v1/stripe_checkout",{method:"POST",headers:{"Content-Type":"application/json","apikey":PD_SUPA_KEY},body:JSON.stringify({type:"deposit",puppy_id:p.id,success_url:"https://bpuppy.us/cachorros",cancel_url:location.href})}).then(function(r){return r.json();}).then(function(d){ if(d.url){location.href=d.url;} else { b.disabled=false; b.textContent="Reintentar depósito"; alert(d.error||"No se pudo iniciar el pago"); } }).catch(function(){ b.disabled=false; b.textContent="Reintentar depósito"; }); }, style: { padding: "15px 24px", background: "#4E7A51", color: "#fff", border: "none", borderRadius: 999, fontFamily: "var(--body)", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px -8px rgba(78,122,81,0.5)" } }, "🐶 Apartar con depósito (30%) · $", Math.round(Number(p.price)*0.3).toLocaleString()), reserved && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: function() {
        setModal(true);
      },
      style: { padding: "15px 24px", background: "var(--ink)", color: "#fff", border: "none", borderRadius: 999, fontFamily: "var(--body)", fontSize: 15, fontWeight: 700, cursor: "pointer" }
    },
    "\u23F0 Lista de espera"
  ), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: `https://wa.me/18084928294?text=Hola! Me interesa ${encodeURIComponent(p.name || p.breed || "un cachorro")}`,
      target: "_blank",
      rel: "noreferrer",
      style: { padding: "13px 24px", background: "#25D366", color: "#fff", borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }
    },
    "\u{1F4AC} Escribir por WhatsApp"
  ), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: `sms:+18084928294?body=Hola! Me interesa ${encodeURIComponent(p.name || p.breed || "un cachorro")}`,
      style: { padding: "13px 24px", background: "var(--bg)", color: "var(--ink)", borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, border: "1.5px solid var(--line)" }
    },
    "\u{1F4F1} Enviar SMS"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: function() {
        setIntlModal(true);
      },
      style: { padding: "11px 20px", background: "none", border: "1.5px solid var(--line)", borderRadius: 999, fontFamily: "var(--body)", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "var(--ink-2)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }
    },
    "\u2708\uFE0F Solicitar env\xEDo internacional"
  )))))), modal && /* @__PURE__ */ React.createElement(PdReserveModal, { puppy: p, onClose: function() {
    setModal(false);
  } }), intlModal && /* @__PURE__ */ React.createElement(IntlShippingModal, { puppyName: p.name, puppyBreed: p.breed, defaultSpecies: "dog", onClose: function() {
    setIntlModal(false);
  } }));
}
const INTL_REQS = {
  dog: [
    "Certificado de salud veterinario (emitido \u226410 d\xEDas antes del vuelo)",
    "Chip de microchip ISO 11784/11785",
    "Vacuna antirr\xE1bica vigente (some countries req. titer test)",
    "Endoso USDA APHIS del certificado de salud",
    "Permiso de importaci\xF3n del pa\xEDs destino (si aplica)",
    "Tiempo estimado de proceso: 2-4 semanas"
  ],
  cat: [
    "Certificado de salud veterinario (emitido \u226410 d\xEDas antes del vuelo)",
    "Chip de microchip ISO 11784/11785",
    "Vacuna antirr\xE1bica vigente",
    "Endoso USDA APHIS del certificado de salud",
    "Permiso de importaci\xF3n del pa\xEDs destino (si aplica)",
    "Tiempo estimado de proceso: 2-4 semanas"
  ]
};
function IntlShippingModal({ puppyName, puppyBreed, defaultSpecies, onClose }) {
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [species, setSpecies] = React.useState(defaultSpecies || "dog");
  const reqs = INTL_REQS[species] || INTL_REQS.dog;
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    var v = function(id) {
      var el = document.getElementById("is-" + id);
      return el ? el.value.trim() : "";
    };
    try {
      await pdSb.from("website_leads").insert({
        gclid: (function() {
          try {
            window.bpLead && window.bpLead();
          } catch (e2) {
          }
          return typeof window !== "undefined" && window.bpGclid ? window.bpGclid() : null;
        })(),
        full_name: v("name"),
        email: v("email"),
        phone: v("phone"),
        message: `ENV\xCDO INTERNACIONAL
Especie: ${species}
Pa\xEDs destino: ${v("country")}
Notas: ${v("notes")}`,
        puppy_name: puppyName || null,
        puppy_breed: puppyBreed || null,
        source: "international_shipping"
      });
      setSent(true);
    } catch (err) {
      alert("Error al enviar. Cont\xE1ctanos por WhatsApp: +1 (808) 492-8294");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: function(e) {
        if (e.target === e.currentTarget) onClose();
      },
      style: { position: "fixed", inset: 0, background: "rgba(45,36,33,0.6)", backdropFilter: "blur(8px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }
    },
    /* @__PURE__ */ React.createElement("div", { style: { background: "var(--paper)", borderRadius: "var(--r)", maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "var(--shadow-soft)", position: "relative" } }, /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { position: "absolute", top: 14, right: 14, width: 34, height: 34, borderRadius: "50%", border: "1px solid var(--line)", background: "none", cursor: "pointer", fontSize: 18, display: "grid", placeItems: "center", color: "var(--ink-2)" } }, "\xD7"), /* @__PURE__ */ React.createElement("div", { style: { padding: "28px 28px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 6 } }, "Env\xEDo Internacional"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--display)", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 6, color: "var(--ink)" } }, "Llevamos a tu mascota donde est\xE9s"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "var(--ink-2)", marginBottom: 16, lineHeight: 1.65 } }, "Cu\xE9ntanos tu destino y te enviamos una cotizaci\xF3n personalizada con todos los requisitos para importar tu mascota a ese pa\xEDs."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 20 } }, [["dog", "\u{1F436} Perro"], ["cat", "\u{1F431} Gato"]].map(function(s) {
      return /* @__PURE__ */ React.createElement(
        "button",
        {
          key: s[0],
          onClick: function() {
            setSpecies(s[0]);
          },
          style: { flex: 1, padding: "10px 16px", borderRadius: 10, border: species === s[0] ? "2px solid var(--orange)" : "1.5px solid var(--line)", background: species === s[0] ? "rgba(245,130,32,0.08)" : "var(--bg)", fontFamily: "var(--body)", fontWeight: 700, fontSize: 14, cursor: "pointer", color: "var(--ink)" }
        },
        s[1]
      );
    })), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", borderRadius: 10, padding: "14px 16px", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--orange)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 } }, "Requisitos generales"), reqs.map(function(r, i) {
      return /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 8, fontSize: 12, color: "var(--ink-2)", marginBottom: 6, lineHeight: 1.5 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--orange)", flexShrink: 0 } }, "\u2713"), r);
    }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--ink-soft)", marginTop: 8, fontStyle: "italic" } }, "* Los requisitos espec\xEDficos var\xEDan por pa\xEDs. Te informamos con detalle al contactarte."))), sent ? /* @__PURE__ */ React.createElement("div", { style: { padding: "20px 28px 28px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 52, marginBottom: 12 } }, "\u2708\uFE0F"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--display)", fontSize: 20, fontWeight: 700, color: "var(--ink)", marginBottom: 8 } }, "\xA1Solicitud recibida!"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "var(--ink-2)", marginBottom: 20, lineHeight: 1.65 } }, "Te contactaremos con la cotizaci\xF3n y requisitos completos para tu pa\xEDs de destino."), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { background: "var(--orange)", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 999, fontWeight: 700, cursor: "pointer", fontFamily: "var(--body)", fontSize: 14 } }, "Cerrar")) : /* @__PURE__ */ React.createElement("form", { onSubmit: submit, style: { padding: "0 28px 28px", display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 11, fontWeight: 700, color: "var(--ink-2)", display: "block", marginBottom: 4 } }, "Pa\xEDs de destino *"), /* @__PURE__ */ React.createElement("input", { id: "is-country", required: true, placeholder: "Ej. M\xE9xico, Espa\xF1a, Colombia\u2026", style: { width: "100%", padding: "10px 12px", border: "1.5px solid var(--line)", borderRadius: 8, fontFamily: "var(--body)", fontSize: 14, color: "var(--ink)", background: "var(--bg)", outline: "none" } })), [["name", "Nombre completo *", "text", true], ["email", "Email *", "email", true], ["phone", "Tel\xE9fono / WhatsApp *", "tel", true]].map(function(f) {
      return /* @__PURE__ */ React.createElement("div", { key: f[0] }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 11, fontWeight: 700, color: "var(--ink-2)", display: "block", marginBottom: 4 } }, f[1]), /* @__PURE__ */ React.createElement("input", { id: "is-" + f[0], type: f[2], required: f[3], style: { width: "100%", padding: "10px 12px", border: "1.5px solid var(--line)", borderRadius: 8, fontFamily: "var(--body)", fontSize: 14, color: "var(--ink)", background: "var(--bg)", outline: "none" } }));
    }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 11, fontWeight: 700, color: "var(--ink-2)", display: "block", marginBottom: 4 } }, "Notas adicionales"), /* @__PURE__ */ React.createElement("textarea", { id: "is-notes", rows: "2", placeholder: "Raza, edad, fechas tentativas\u2026", style: { width: "100%", padding: "10px 12px", border: "1.5px solid var(--line)", borderRadius: 8, fontFamily: "var(--body)", fontSize: 14, color: "var(--ink)", background: "var(--bg)", resize: "vertical", outline: "none" } })), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "submit",
        disabled: loading,
        style: { background: "var(--orange)", color: "#fff", border: "none", padding: "14px 24px", borderRadius: 999, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "var(--body)", marginTop: 4, opacity: loading ? 0.7 : 1 }
      },
      loading ? "Enviando\u2026" : "\u2708\uFE0F Solicitar cotizaci\xF3n internacional"
    )))
  );
}
function PuppyDetalle() {
  const [state, setState] = React.useState({ status: "loading", puppy: null, breed: null, mom: null, dad: null, siblings: [], similar: [] });
  const id = React.useMemo(function() {
    try {
      return new URLSearchParams(window.location.search).get("id");
    } catch (e) {
      return null;
    }
  }, []);
  React.useEffect(function() {
    if (!id) {
      setState(function(s) {
        return Object.assign({}, s, { status: "error" });
      });
      return;
    }
    if (!pdSb) {
      setState(function(s) {
        return Object.assign({}, s, { status: "error" });
      });
      return;
    }
    (async function() {
      try {
        var r = await pdSb.from("puppies").select("*").eq("id", id).single();
        if (r.error || !r.data) throw new Error("Not found");
        var p2 = r.data;
        document.title = (p2.name || "Cachorro") + " \u2014 BPuppy";
        var breed = null, mom = null, dad = null, siblings = [], similar = [];
        var tasks = [];
        if (p2.breed) tasks.push(pdSb.from("breeds").select("*").ilike("name", p2.breed).maybeSingle().then(function(x) {
          breed = x.data;
        }));
        if (p2.mom_id) tasks.push(pdSb.from("parent_dogs").select("*").eq("id", p2.mom_id).maybeSingle().then(function(x) {
          mom = x.data;
        }));
        if (p2.dad_id) tasks.push(pdSb.from("parent_dogs").select("*").eq("id", p2.dad_id).maybeSingle().then(function(x) {
          dad = x.data;
        }));
        if (p2.litter_id) tasks.push(pdSb.from("puppies").select("*").eq("litter_id", p2.litter_id).neq("id", id).then(function(x) {
          siblings = x.data || [];
        }));
        if (p2.breed) tasks.push(pdSb.from("puppies").select("*").eq("breed", p2.breed).neq("id", id).in("status", ["available", "reserved"]).limit(6).then(function(x) {
          similar = x.data || [];
        }));
        await Promise.all(tasks);
        setState({ status: "ok", puppy: p2, breed, mom, dad, siblings, similar });
      } catch (e) {
        setState(function(s) {
          return Object.assign({}, s, { status: "error" });
        });
      }
    })();
  }, [id]);
  if (state.status === "loading") return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { className: "bp-spinner" }), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)", fontSize: 15 } }, "Cargando cachorro\u2026"));
  if (state.status === "error") return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 40, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 56 } }, "\u{1F43E}"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--display)", fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" } }, "Cachorro no encontrado"), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)", fontSize: 15 } }, "No pudimos cargar este cachorro. Puede que ya no est\xE9 disponible."), /* @__PURE__ */ React.createElement("a", { href: "/cachorros", style: { background: "var(--orange)", color: "#fff", padding: "13px 26px", borderRadius: 999, textDecoration: "none", fontWeight: 700, fontSize: 14, boxShadow: "0 8px 24px -8px rgba(245,130,32,0.4)" } }, "Ver todos los cachorros"));
  var p = state.puppy;
  var photos = pdPhotos(p);
  var age = pdAge(p);
  var hasFin = !state.mom && !state.dad && p.price;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(PdHero, { p, photos, age }), /* @__PURE__ */ React.createElement(PdIncludes, { p }), state.breed && /* @__PURE__ */ React.createElement(PdBreed, { breed: state.breed }), (state.mom || state.dad) && /* @__PURE__ */ React.createElement(PdFamilyFin, { mom: state.mom, dad: state.dad, price: p.price }), hasFin && /* @__PURE__ */ React.createElement("section", { style: { padding: "clamp(48px,6vw,80px) clamp(20px,5vw,80px)", background: "#fff", borderTop: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1e3, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 10 } }, "Financiamiento"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--display)", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 32px", color: "var(--ink)" } }, "Lleva a ", p.name || "tu cachorro", " ", /* @__PURE__ */ React.createElement("em", { style: { fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--orange)" } }, "a tu hogar hoy.")), /* @__PURE__ */ React.createElement("div", { className: "pd-family-grid", style: { display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 48, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "none" }, className: "pd-fin-img" }, /* @__PURE__ */ React.createElement("image-slot", { id: "fin-photo", shape: "rounded", radius: "22", placeholder: "Sube una foto del cachorro", style: { width: "100%", aspectRatio: "1/1", display: "block" } })), /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement(PdFinCalc, { price: p.price }))))), state.siblings.length > 0 && /* @__PURE__ */ React.createElement(PdSiblingsSection, { siblings: state.siblings }), state.similar.length > 0 && /* @__PURE__ */ React.createElement(PdSimilarSection, { similar: state.similar, breed: p.breed }));
}
Object.assign(window, { PuppyDetalle });

})();
