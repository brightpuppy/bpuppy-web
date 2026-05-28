(function(){
const FIN_PLANS = [
  { id: "k4", name: "Klarna", sub: "4 pagos \xB7 Sin inter\xE9s", count: 4, apr: 0, color: "#FFB3C7", textColor: "#1a1a2e", recommended: true },
  { id: "cash", name: "Cash App", sub: "Paga al instante", count: 1, apr: 0, color: "#00D54B", textColor: "#0a0a0a", recommended: false },
  { id: "af12", name: "Affirm", sub: "12 meses \xB7 ~15% APR", count: 12, apr: 15, color: "#0FA0EA", textColor: "#fff", recommended: false },
  { id: "af24", name: "Affirm", sub: "24 meses \xB7 ~18% APR", count: 24, apr: 18, color: "#0FA0EA", textColor: "#fff", recommended: false }
];
function finCalcPmt(fin, plan) {
  if (fin <= 0) return { pmt: 0, total: fin };
  if (plan.apr === 0) return { pmt: fin / plan.count, total: fin };
  var r = plan.apr / 100 / 12, n = plan.count;
  var m = fin * r / (1 - Math.pow(1 + r, -n));
  return { pmt: m, total: m * n };
}
function finFmt(n) {
  return "$" + Math.round(n).toLocaleString("en-US");
}
function FinCalc() {
  var [price, setPrice] = React.useState(3500);
  var [dp, setDp] = React.useState(700);
  var [sel, setSel] = React.useState("k4");
  var fin = Math.max(0, price - dp);
  var plan = FIN_PLANS.find(function(p) {
    return p.id === sel;
  }) || FIN_PLANS[0];
  var result = finCalcPmt(fin, plan);
  return /* @__PURE__ */ React.createElement("div", { className: "fin-calc-card" }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 28 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, "Precio de la mascota"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 30, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em" } }, finFmt(price))), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "range",
      min: 2500,
      max: 6e3,
      step: 100,
      value: price,
      onChange: function(e) {
        var v = +e.target.value;
        setPrice(v);
        if (dp > v) setDp(v);
      },
      style: { accentColor: "var(--orange)" }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ink-soft)", marginTop: 5 } }, /* @__PURE__ */ React.createElement("span", null, "$2,500"), /* @__PURE__ */ React.createElement("span", null, "$6,000"))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, "Pago inicial"), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 24, fontWeight: 800, color: "var(--orange)", letterSpacing: "-0.02em" } }, finFmt(dp)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--ink-soft)", marginLeft: 6 } }, price > 0 ? Math.round(dp / price * 100) : 0, "%"))), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "range",
      min: 0,
      max: price,
      step: 100,
      value: dp,
      onChange: function(e) {
        setDp(+e.target.value);
      },
      style: { accentColor: "var(--orange)" }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ink-soft)", marginTop: 5 } }, /* @__PURE__ */ React.createElement("span", null, "$0"), /* @__PURE__ */ React.createElement("span", null, finFmt(price)))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", borderRadius: 12, padding: "12px 18px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: "var(--ink-2)" } }, "Total a financiar"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 26, fontWeight: 800, color: "var(--ink)" } }, finFmt(fin))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 } }, FIN_PLANS.map(function(pl) {
    var r = finCalcPmt(fin, pl);
    var active = sel === pl.id;
    var lbl = pl.apr === 0 ? "por pago" : "/mes";
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: pl.id,
        onClick: function() {
          setSel(pl.id);
        },
        style: { padding: "14px 12px", borderRadius: 14, cursor: "pointer", border: active ? "2px solid " + pl.color : "1.5px solid var(--line)", background: active ? pl.color + "18" : "#fff", textAlign: "left", fontFamily: "inherit", position: "relative", transition: "all .15s" }
      },
      pl.recommended && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -9, left: 10, background: "var(--orange)", color: "#fff", fontSize: 8.5, fontWeight: 800, padding: "2px 9px", borderRadius: 999, letterSpacing: "0.06em", textTransform: "uppercase" } }, "Recomendado"),
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5, marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9.5, fontWeight: 900, padding: "2px 7px", borderRadius: 999, background: pl.color, color: pl.textColor, lineHeight: 1.5 } }, pl.name), pl.apr === 0 && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, fontWeight: 700, color: "#065F46", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", padding: "1px 6px", borderRadius: 999 } }, "0%")),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--ink-2)", marginBottom: 6 } }, pl.sub),
      /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: "var(--ink)" } }, finFmt(r.pmt)),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--ink-soft)" } }, lbl, " \xB7 Total: ", finFmt(r.total))
    );
  })), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10.5, color: "var(--ink-soft)", textAlign: "center", fontStyle: "italic", margin: "0 0 18px" } }, "* Estimaciones orientativas. Aprobaci\xF3n y t\xE9rminos dependen del proveedor financiero."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 } }, [
    { label: "WhatsApp", icon: "\u{1F4AC}", bg: "#25D366", href: "https://wa.me/18084928294?text=Hola!%20Me%20interesa%20financiar%20una%20mascota%20con%20BPuppy.", color: "#fff" },
    { label: "SMS", icon: "\u{1F4F1}", bg: "var(--bg)", href: "sms:+18084928294?body=Hola!%20Me%20interesa%20financiar%20una%20mascota%20con%20BPuppy.", color: "var(--ink)", border: true },
    { label: "Email", icon: "\u2709\uFE0F", bg: "var(--bg)", href: "mailto:hello@bpuppy.us?subject=Solicitud%20de%20financiamiento", color: "var(--ink)", border: true }
  ].map(function(b, i) {
    return /* @__PURE__ */ React.createElement(
      "a",
      {
        key: i,
        href: b.href,
        target: b.href.startsWith("http") ? "_blank" : "_self",
        rel: "noreferrer",
        style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "11px 6px", borderRadius: 10, background: b.bg, color: b.color, textDecoration: "none", fontSize: 11.5, fontWeight: 700, border: b.border ? "1.5px solid var(--line)" : "none" }
      },
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 16 } }, b.icon),
      /* @__PURE__ */ React.createElement("span", null, b.label)
    );
  })));
}
function FinForm() {
  var [form, setForm] = React.useState({ name: "", email: "", phone: "", pet: "perro", breed: "", plan: "Klarna - 4 pagos sin inter\xE9s", notes: "" });
  var [sent, setSent] = React.useState(false);
  function upd(k, v) {
    setForm(function(p) {
      return Object.assign({}, p, { [k]: v });
    });
  }
  function composeMsg() {
    return "Hola! Me interesa financiar una mascota.\n\nNombre: " + form.name + "\nEmail: " + form.email + "\nTel\xE9fono: " + form.phone + "\nMascota: " + (form.pet === "perro" ? "Cachorro" : "Gatito") + (form.breed ? " \u2014 " + form.breed : "") + "\nPlan preferido: " + form.plan + "\n" + (form.notes ? "Notas: " + form.notes : "");
  }
  function guard() {
    if (!form.name || !form.phone) {
      alert("Por favor ingresa tu nombre y tel\xE9fono.");
      return false;
    }
    return true;
  }
  if (sent) {
    return /* @__PURE__ */ React.createElement("div", { className: "fin-form-card", style: { textAlign: "center", padding: "56px 32px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 56, marginBottom: 16 } }, "\u{1F389}"), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px", color: "var(--ink)" } }, "\xA1Mensaje enviado!"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65, marginBottom: 24 } }, "Gracias por dar el primer paso. Te respondemos en menos de 24 horas con opciones personalizadas para tu familia."), /* @__PURE__ */ React.createElement("button", { onClick: function() {
      setSent(false);
    }, style: { background: "none", border: "1.5px solid var(--line)", padding: "10px 22px", borderRadius: 999, fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", color: "var(--ink-2)" } }, "Enviar otra solicitud"));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "fin-form-card" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, "Nombre *"), /* @__PURE__ */ React.createElement("input", { className: "fin-input", placeholder: "Tu nombre completo", value: form.name, onChange: function(e) {
    upd("name", e.target.value);
  } })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, "Tel\xE9fono *"), /* @__PURE__ */ React.createElement("input", { className: "fin-input", type: "tel", placeholder: "+1 (808) 000-0000", value: form.phone, onChange: function(e) {
    upd("phone", e.target.value);
  } }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, "Email"), /* @__PURE__ */ React.createElement("input", { className: "fin-input", type: "email", placeholder: "tu@email.com", value: form.email, onChange: function(e) {
    upd("email", e.target.value);
  } })), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, "Tipo de mascota"), /* @__PURE__ */ React.createElement("select", { className: "fin-input", value: form.pet, onChange: function(e) {
    upd("pet", e.target.value);
  }, style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("option", { value: "perro" }, "\u{1F436} Cachorro"), /* @__PURE__ */ React.createElement("option", { value: "gato" }, "\u{1F431} Gatito"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, "Plan preferido"), /* @__PURE__ */ React.createElement("select", { className: "fin-input", value: form.plan, onChange: function(e) {
    upd("plan", e.target.value);
  }, style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("option", { value: "Klarna - 4 pagos sin inter\xE9s" }, "Klarna \xB7 4 pagos 0%"), /* @__PURE__ */ React.createElement("option", { value: "Cash App - pago al instante" }, "Cash App \xB7 al instante"), /* @__PURE__ */ React.createElement("option", { value: "Affirm - 12 meses" }, "Affirm \xB7 12 meses"), /* @__PURE__ */ React.createElement("option", { value: "Affirm - 24 meses" }, "Affirm \xB7 24 meses"), /* @__PURE__ */ React.createElement("option", { value: "No estoy seguro" }, "No estoy seguro a\xFAn")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, "Raza de inter\xE9s"), /* @__PURE__ */ React.createElement("input", { className: "fin-input", placeholder: "Ej. Golden Retriever, Bulldog Franc\xE9s\u2026", value: form.breed, onChange: function(e) {
    upd("breed", e.target.value);
  } })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, "\xBFAlgo m\xE1s que debamos saber?"), /* @__PURE__ */ React.createElement("textarea", { className: "fin-input", rows: "3", placeholder: "Tu hogar, otras mascotas, fechas tentativas\u2026", value: form.notes, onChange: function(e) {
    upd("notes", e.target.value);
  }, style: { resize: "vertical" } })), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://wa.me/18084928294?text=" + encodeURIComponent(composeMsg()),
      target: "_blank",
      rel: "noreferrer",
      onClick: function() {
        if (guard()) setSent(true);
        else return false;
      },
      style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 18px", borderRadius: 999, background: "#25D366", color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none" }
    },
    "\u{1F4AC} Enviar por WhatsApp"
  ), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "mailto:hello@bpuppy.us?subject=" + encodeURIComponent("Solicitud de financiamiento \u2014 " + form.name) + "&body=" + encodeURIComponent(composeMsg()),
      onClick: function() {
        if (guard()) setSent(true);
        else return false;
      },
      style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 18px", borderRadius: 999, background: "var(--ink)", color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none" }
    },
    "\u2709\uFE0F Enviar por Email"
  ))));
}
var calcRoot = document.getElementById("fin-calc-root");
var formRoot = document.getElementById("fin-form-root");
if (calcRoot) ReactDOM.createRoot(calcRoot).render(React.createElement(FinCalc));
if (formRoot) ReactDOM.createRoot(formRoot).render(React.createElement(FinForm));

})();
