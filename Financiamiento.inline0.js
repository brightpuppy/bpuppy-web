(function(){
var FIN_SUPA = 'https://oqqwmcplljirbreowrll.supabase.co';
var FIN_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4';
function finCheckout(amount, desc, btn) {
  if (!(amount >= 50)) { alert("El monto mínimo es $50."); return; }
  var old = btn ? btn.textContent : null;
  if (btn) { btn.disabled = true; btn.textContent = "Abriendo pago seguro…"; }
  fetch(FIN_SUPA + "/functions/v1/stripe_checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json", "apikey": FIN_ANON, "Authorization": "Bearer " + FIN_ANON },
    body: JSON.stringify({ type: "abono", amount: amount, description: desc, success_url: "https://bpuppy.us/financiamiento?paid=1", cancel_url: "https://bpuppy.us/financiamiento" })
  }).then(function(r){ return r.json(); }).then(function(d){
    if (d && d.url) { location.href = d.url; }
    else { alert((d && d.error) || "No se pudo iniciar el pago. Escríbenos por WhatsApp."); if (btn) { btn.disabled = false; btn.textContent = old; } }
  }).catch(function(){ alert("Error de conexión. Intenta de nuevo."); if (btn) { btn.disabled = false; btn.textContent = old; } });
}
const FIN_PLANS = [
  { id: "k4", name: "Klarna", sub: ["4 pagos \xB7 Sin inter\xE9s", "4 payments \xB7 No interest"], count: 4, apr: 0, color: "#FFB3C7", textColor: "#1a1a2e", recommended: true },
  { id: "cash", name: "Cash App", sub: ["Paga al instante", "Pay instantly"], count: 1, apr: 0, color: "#00D54B", textColor: "#0a0a0a", recommended: false },
  { id: "af12", name: "Affirm", sub: ["12 meses \xB7 ~15% APR", "12 months \xB7 ~15% APR"], count: 12, apr: 15, color: "#0FA0EA", textColor: "#fff", recommended: false },
  { id: "af24", name: "Affirm", sub: ["24 meses \xB7 ~18% APR", "24 months \xB7 ~18% APR"], count: 24, apr: 18, color: "#0FA0EA", textColor: "#fff", recommended: false }
];
function useLiveLang(){
  var s = React.useState((window.bpGetLang && window.bpGetLang()) || 'es');
  var lang = s[0], setLang = s[1];
  React.useEffect(function(){
    var h = function(e){ setLang((e && e.detail) || (window.bpGetLang && window.bpGetLang()) || 'es'); };
    window.addEventListener('bpuppy:lang', h);
    window.addEventListener('bpuppy-lang-change', h);
    return function(){ window.removeEventListener('bpuppy:lang', h); window.removeEventListener('bpuppy-lang-change', h); };
  }, []);
  return lang;
}
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
  var lang = useLiveLang();
  var t = function(a){ return Array.isArray(a) ? (lang === 'en' ? (a[1] || a[0]) : a[0]) : a; };
  var [price, setPrice] = React.useState(3500);
  var [dp, setDp] = React.useState(700);
  var [sel, setSel] = React.useState("k4");
  var [agree, setAgree] = React.useState(false);
  var fin = Math.max(0, price - dp);
  var plan = FIN_PLANS.find(function(p) {
    return p.id === sel;
  }) || FIN_PLANS[0];
  var result = finCalcPmt(fin, plan);
  return /* @__PURE__ */ React.createElement("div", { className: "fin-calc-card" }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 28 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, t(["Precio de la mascota", "Pet price"])), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 30, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em" } }, finFmt(price))), /* @__PURE__ */ React.createElement(
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
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ink-soft)", marginTop: 5 } }, /* @__PURE__ */ React.createElement("span", null, "$2,500"), /* @__PURE__ */ React.createElement("span", null, "$6,000"))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, t(["Pago inicial", "Down payment"])), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 24, fontWeight: 800, color: "var(--orange)", letterSpacing: "-0.02em" } }, finFmt(dp)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--ink-soft)", marginLeft: 6 } }, price > 0 ? Math.round(dp / price * 100) : 0, "%"))), /* @__PURE__ */ React.createElement(
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
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--ink-soft)", marginTop: 5 } }, /* @__PURE__ */ React.createElement("span", null, "$0"), /* @__PURE__ */ React.createElement("span", null, finFmt(price)))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", borderRadius: 12, padding: "12px 18px", marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: "var(--ink-2)" } }, t(["Total a financiar", "Total to finance"])), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 26, fontWeight: 800, color: "var(--ink)" } }, finFmt(fin))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 } }, FIN_PLANS.map(function(pl) {
    var r = finCalcPmt(fin, pl);
    var active = sel === pl.id;
    var lbl = pl.apr === 0 ? t(["por pago", "per payment"]) : t(["/mes", "/mo"]);
    return /* @__PURE__ */ React.createElement(
      "button",
      {
        key: pl.id,
        onClick: function() {
          setSel(pl.id);
        },
        style: { padding: "14px 12px", borderRadius: 14, cursor: "pointer", border: active ? "2px solid " + pl.color : "1.5px solid var(--line)", background: active ? pl.color + "18" : "#fff", textAlign: "left", fontFamily: "inherit", position: "relative", transition: "all .15s" }
      },
      pl.recommended && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -9, left: 10, background: "var(--orange)", color: "#fff", fontSize: 8.5, fontWeight: 800, padding: "2px 9px", borderRadius: 999, letterSpacing: "0.06em", textTransform: "uppercase" } }, t(["Recomendado", "Recommended"])),
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5, marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9.5, fontWeight: 900, padding: "2px 7px", borderRadius: 999, background: pl.color, color: pl.textColor, lineHeight: 1.5 } }, pl.name), pl.apr === 0 && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, fontWeight: 700, color: "#065F46", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", padding: "1px 6px", borderRadius: 999 } }, "0%")),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--ink-2)", marginBottom: 6 } }, t(pl.sub)),
      /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: "var(--ink)" } }, finFmt(r.pmt)),
      /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--ink-soft)" } }, lbl, " \xB7 " + t(["Total: ", "Total: "]), finFmt(r.total))
    );
  })), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10.5, color: "var(--ink-soft)", textAlign: "center", fontStyle: "italic", margin: "0 0 18px" } }, t(["* Estimaciones orientativas. Aprobaci\xF3n y t\xE9rminos dependen del proveedor financiero.", "* Estimates only. Approval and terms depend on the financing provider."])), /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "var(--ink-2)", lineHeight: 1.5, margin: "0 0 12px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: agree, onChange: function(e){ setAgree(e.target.checked); }, style: { marginTop: 2 } }), /* @__PURE__ */ React.createElement("span", null, t(["He leído y acepto la ", "I have read and accept the "]), /* @__PURE__ */ React.createElement("a", { href: "/terminos#abonos", target: "_blank", style: { color: "var(--orange)", fontWeight: 700 } }, t(["política de abonos", "deposit policy"])), ".")), /* @__PURE__ */ React.createElement("button", { disabled: !agree, onClick: function(e){ if(!agree) return; finCheckout(dp > 0 ? dp : 500, t(["Pago inicial / abono — BPuppy", "Down payment / deposit — BPuppy"]), e.currentTarget); }, style: { width: "100%", padding: "15px", borderRadius: 14, border: "none", background: agree ? "var(--orange)" : "var(--line)", color: "#fff", fontFamily: "inherit", fontSize: 15, fontWeight: 800, cursor: agree ? "pointer" : "not-allowed", opacity: agree ? 1 : 0.6, marginBottom: 10 } }, t(["Realizar pago de ", "Pay "]) + finFmt(dp > 0 ? dp : 500) + t([" con tarjeta o Cash App", " by card or Cash App"])), /* @__PURE__ */ React.createElement("button", { disabled: !agree, onClick: function(e){ if(!agree) return; finCheckout(500, t(["Apartado de cachorro — BPuppy", "Puppy reservation — BPuppy"]), e.currentTarget); }, style: { width: "100%", padding: "12px", borderRadius: 12, border: "1.5px solid var(--line)", background: "#fff", color: "var(--ink)", fontFamily: "inherit", fontSize: 13.5, fontWeight: 700, cursor: agree ? "pointer" : "not-allowed", opacity: agree ? 1 : 0.6, marginBottom: 16 } }, t(["O aparta tu cachorrito por $500", "Or reserve your puppy for $500"])), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 } }, [
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
  var lang = useLiveLang();
  var t = function(a){ return Array.isArray(a) ? (lang === 'en' ? (a[1] || a[0]) : a[0]) : a; };
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
      alert(t(["Por favor ingresa tu nombre y tel\xE9fono.", "Please enter your name and phone."]));
      return false;
    }
    return true;
  }
  if (sent) {
    return /* @__PURE__ */ React.createElement("div", { className: "fin-form-card", style: { textAlign: "center", padding: "56px 32px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 56, marginBottom: 16 } }, "\u{1F389}"), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px", color: "var(--ink)" } }, t(["\xA1Mensaje enviado!", "Message sent!"])), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65, marginBottom: 24 } }, t(["Gracias por dar el primer paso. Te respondemos en menos de 24 horas con opciones personalizadas para tu familia.", "Thanks for taking the first step. We'll reply within 24 hours with personalized options for your family."])), /* @__PURE__ */ React.createElement("button", { onClick: function() {
      setSent(false);
    }, style: { background: "none", border: "1.5px solid var(--line)", padding: "10px 22px", borderRadius: 999, fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", color: "var(--ink-2)" } }, t(["Enviar otra solicitud", "Send another request"])));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "fin-form-card" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, t(["Nombre *", "Name *"])), /* @__PURE__ */ React.createElement("input", { className: "fin-input", placeholder: t(["Tu nombre completo", "Your full name"]), value: form.name, onChange: function(e) {
    upd("name", e.target.value);
  } })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, t(["Tel\xE9fono *", "Phone *"])), /* @__PURE__ */ React.createElement("input", { className: "fin-input", type: "tel", placeholder: "+1 (808) 000-0000", value: form.phone, onChange: function(e) {
    upd("phone", e.target.value);
  } }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, "Email"), /* @__PURE__ */ React.createElement("input", { className: "fin-input", type: "email", placeholder: "tu@email.com", value: form.email, onChange: function(e) {
    upd("email", e.target.value);
  } })), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, t(["Tipo de mascota", "Pet type"])), /* @__PURE__ */ React.createElement("select", { className: "fin-input", value: form.pet, onChange: function(e) {
    upd("pet", e.target.value);
  }, style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("option", { value: "perro" }, t(["\u{1F436} Cachorro", "\u{1F436} Puppy"])), /* @__PURE__ */ React.createElement("option", { value: "gato" }, t(["\u{1F431} Gatito", "\u{1F431} Kitten"])))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, t(["Plan preferido", "Preferred plan"])), /* @__PURE__ */ React.createElement("select", { className: "fin-input", value: form.plan, onChange: function(e) {
    upd("plan", e.target.value);
  }, style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("option", { value: "Klarna - 4 pagos sin inter\xE9s" }, t(["Klarna \xB7 4 pagos 0%", "Klarna \xB7 4 payments 0%"])), /* @__PURE__ */ React.createElement("option", { value: "Cash App - pago al instante" }, t(["Cash App \xB7 al instante", "Cash App \xB7 instantly"])), /* @__PURE__ */ React.createElement("option", { value: "Affirm - 12 meses" }, t(["Affirm \xB7 12 meses", "Affirm \xB7 12 months"])), /* @__PURE__ */ React.createElement("option", { value: "Affirm - 24 meses" }, t(["Affirm \xB7 24 meses", "Affirm \xB7 24 months"])), /* @__PURE__ */ React.createElement("option", { value: "No estoy seguro" }, t(["No estoy seguro a\xFAn", "Not sure yet"]))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, t(["Raza de inter\xE9s", "Breed of interest"])), /* @__PURE__ */ React.createElement("input", { className: "fin-input", placeholder: t(["Ej. Golden Retriever, Bulldog Franc\xE9s\u2026", "e.g. Golden Retriever, French Bulldog\u2026"]), value: form.breed, onChange: function(e) {
    upd("breed", e.target.value);
  } })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { className: "fin-label" }, t(["\xBFAlgo m\xE1s que debamos saber?", "Anything else we should know?"])), /* @__PURE__ */ React.createElement("textarea", { className: "fin-input", rows: "3", placeholder: t(["Tu hogar, otras mascotas, fechas tentativas\u2026", "Your home, other pets, tentative dates\u2026"]), value: form.notes, onChange: function(e) {
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
    t(["\u{1F4AC} Enviar por WhatsApp", "\u{1F4AC} Send via WhatsApp"])
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
    t(["\u2709\uFE0F Enviar por Email", "\u2709\uFE0F Send via Email"])
  ))));
}
function FinAbono() {
  var lang = useLiveLang();
  var t = function(a){ return Array.isArray(a) ? (lang === 'en' ? (a[1] || a[0]) : a[0]) : a; };
  var [amt, setAmt] = React.useState(200);
  var [agree, setAgree] = React.useState(false);
  var chips = [50, 200, 500, 1000];
  return /* @__PURE__ */ React.createElement("div", null,
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 14 } },
      /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 34, fontWeight: 800, color: "var(--orange)" } }, "$"),
      /* @__PURE__ */ React.createElement("input", { type: "number", min: 50, step: 10, value: amt, onChange: function(e){ setAmt(Math.max(0, +e.target.value || 0)); }, className: "fin-input", style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 30, fontWeight: 800, padding: "6px 12px", width: "100%" } })),
    /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 18 } }, chips.map(function(c){
      var active = amt === c;
      return /* @__PURE__ */ React.createElement("button", { key: c, onClick: function(){ setAmt(c); }, style: { padding: "9px 0", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700, border: active ? "2px solid var(--orange)" : "1.5px solid var(--line)", background: active ? "rgba(245,130,32,0.08)" : "#fff", color: "var(--ink)" } }, "$" + c);
    })),
    /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "var(--ink-2)", lineHeight: 1.5, margin: "0 0 12px", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: agree, onChange: function(e){ setAgree(e.target.checked); }, style: { marginTop: 2 } }), /* @__PURE__ */ React.createElement("span", null, t(["He leído y acepto la ", "I have read and accept the "]), /* @__PURE__ */ React.createElement("a", { href: "/terminos#abonos", target: "_blank", style: { color: "var(--orange)", fontWeight: 700 } }, t(["política de abonos", "deposit policy"])), ".")), /* @__PURE__ */ React.createElement("button", { disabled: !agree, onClick: function(e){ if(!agree) return; finCheckout(amt, t(["Abono / plan de pagos — BPuppy", "Deposit / payment plan — BPuppy"]), e.currentTarget); }, style: { width: "100%", padding: "15px", borderRadius: 14, border: "none", background: agree ? "var(--ink)" : "var(--line)", color: "#fff", fontFamily: "inherit", fontSize: 15, fontWeight: 800, cursor: agree ? "pointer" : "not-allowed", opacity: agree ? 1 : 0.6, marginBottom: 10 } }, t(["Abonar ahora", "Pay deposit now"])),
    /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: "var(--ink-soft)", textAlign: "center", margin: 0, lineHeight: 1.5 } }, t(["Tarjeta, Cash App, Klarna o Affirm. Reembolsable cuando quieras, menos 3% de servicio.", "Card, Cash App, Klarna or Affirm. Refundable anytime, minus a 3% service fee."])));
}
var calcRoot = document.getElementById("fin-calc-root");
var formRoot = document.getElementById("fin-form-root");
var abonoRoot = document.getElementById("fin-abono-root");
if (calcRoot) ReactDOM.createRoot(calcRoot).render(React.createElement(FinCalc));
if (formRoot) ReactDOM.createRoot(formRoot).render(React.createElement(FinForm));
if (abonoRoot) ReactDOM.createRoot(abonoRoot).render(React.createElement(FinAbono));

})();
