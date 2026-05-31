(function(){
const { useState, useEffect } = React;
const GC_URL = "https://oqqwmcplljirbreowrll.supabase.co";
const GC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
const GC_DESIGNS = {
  sunset: { grad: "linear-gradient(135deg,#F58220,#E85D75)", label: ["Atardecer", "Sunset"] },
  sky: { grad: "linear-gradient(135deg,#2F6BFF,#22C3E6)", label: ["Cielo", "Sky"] },
  forest: { grad: "linear-gradient(135deg,#1EB87A,#2D6A4F)", label: ["Bosque", "Forest"] },
  royal: { grad: "linear-gradient(135deg,#7C3AED,#E85D75)", label: ["Real", "Royal"] },
  gold: { grad: "linear-gradient(135deg,#F5C53A,#E0902A)", label: ["Oro", "Gold"] }
};
const gcApi = async (action, extra) => {
  const r = await fetch(GC_URL + "/functions/v1/gift_card", { method: "POST", headers: { "Content-Type": "application/json", "apikey": GC_KEY, "Authorization": "Bearer " + GC_KEY }, body: JSON.stringify({ action, origin: location.origin, ...extra || {} }) });
  return r.json();
};
function PawCorner() {
  return /* @__PURE__ */ React.createElement("svg", { width: "80", height: "80", viewBox: "0 0 64 64", fill: "rgba(255,255,255,0.18)", style: { position: "absolute", bottom: -6, right: -6 } }, /* @__PURE__ */ React.createElement("ellipse", { cx: "32", cy: "42", rx: "13", ry: "10" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "13", cy: "27", rx: "5.5", ry: "7.5" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "51", cy: "27", rx: "5.5", ry: "7.5" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "23", cy: "14", rx: "5", ry: "6.5" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "41", cy: "14", rx: "5", ry: "6.5" }));
}
function GiftCardVisual({ design, amount, recipient, message, code }) {
  const g = GC_DESIGNS[design] || GC_DESIGNS.sunset;
  return /* @__PURE__ */ React.createElement("div", { style: { position: "relative", overflow: "hidden", background: g.grad, borderRadius: 22, padding: "24px 24px 22px", color: "#fff", boxShadow: "0 16px 50px -16px rgba(0,0,0,0.35)", minHeight: 200 } }, /* @__PURE__ */ React.createElement(PawCorner, null), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.92 } }, "Tarjeta de Regalo"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontWeight: 800, fontSize: 16 } }, "BrightPuppy")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: "-0.03em", margin: "14px 0 4px" } }, "$", amount || 0), recipient ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, opacity: 0.95 } }, "Para: ", /* @__PURE__ */ React.createElement("b", null, recipient)) : null, message ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, opacity: 0.9, marginTop: 6, fontStyle: "italic", maxWidth: "85%" } }, "\u201C", message, "\u201D") : null, code ? /* @__PURE__ */ React.createElement("div", { style: { marginTop: 16, display: "inline-block", background: "rgba(255,255,255,0.22)", borderRadius: 10, padding: "8px 14px", fontFamily: "monospace", fontSize: 18, fontWeight: 800, letterSpacing: "0.08em" } }, code) : null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, opacity: 0.85, marginTop: code ? 10 : 16 } }, "V\xE1lida para cachorro \xB7 grooming"));
}
function GiftCardApp() {
  const t = typeof useT === "function" ? useT() : ((a) => Array.isArray(a) ? a[0] : a);
  const params = new URLSearchParams(location.search);
  const sessionId = params.get("session");
  const cancelled = params.get("cancel");
  const [phase, setPhase] = useState(sessionId ? "finalizing" : cancelled ? "cancelled" : "form");
  const [card, setCard] = useState(null);
  const [finalErr, setFinalErr] = useState("");
  const [amount, setAmount] = useState(100);
  const [customAmt, setCustomAmt] = useState("");
  const [purpose, setPurpose] = useState("any");
  const [design, setDesign] = useState("sunset");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [purchaserName, setPurchaserName] = useState("");
  const [purchaserEmail, setPurchaserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [lookCode, setLookCode] = useState("");
  const [lookRes, setLookRes] = useState(null);
  const [shareMsg, setShareMsg] = useState("");
  useEffect(() => {
    if (phase !== "finalizing" || !sessionId) return;
    let tries = 0;
    const run = () => {
      gcApi("finalize", { session: sessionId }).then((d) => {
        if (d && d.ok && d.card) {
          setCard(d.card);
          setPhase("done");
        } else if (tries < 4) {
          tries++;
          setTimeout(run, 1800);
        } else {
          setFinalErr(d && d.error || "No pudimos confirmar el pago.");
          setPhase("error");
        }
      }).catch(() => {
        if (tries < 4) {
          tries++;
          setTimeout(run, 1800);
        } else {
          setFinalErr("Error de red.");
          setPhase("error");
        }
      });
    };
    run();
  }, [phase, sessionId]);
  const realAmount = customAmt ? Math.round(Number(customAmt) || 0) : amount;
  const buy = async () => {
    if (!(realAmount >= 10 && realAmount <= 1e3)) {
      setErr("Elige un monto entre $10 y $1000.");
      return;
    }
    setBusy(true);
    setErr("");
    const d = await gcApi("create_checkout", { amount: realAmount, purpose, design, recipient_name: recipientName, recipient_email: recipientEmail, purchaser_name: purchaserName, purchaser_email: purchaserEmail, message });
    if (d && d.ok && d.url) {
      location.href = d.url;
      return;
    }
    setBusy(false);
    setErr(d && d.error === "no_stripe_key" ? "Pagos a\xFAn no configurados. Intenta m\xE1s tarde." : "No se pudo iniciar el pago. Intenta de nuevo.");
  };
  const lookup = async () => {
    const d = await gcApi("lookup", { code: lookCode });
    setLookRes(d && d.ok ? d.card : { invalid: true });
  };
  const wrap = { maxWidth: 720, margin: "0 auto", padding: "40px 20px 80px" };
  const fld = { width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 12, border: "1.5px solid var(--line)", background: "var(--paper)", fontSize: 14, fontFamily: "inherit", color: "var(--ink)", outline: "none" };
  const lbl = { fontSize: 12, fontWeight: 700, color: "var(--ink-2)", margin: "0 0 6px" };
  if (phase === "finalizing") {
    return /* @__PURE__ */ React.createElement("div", { style: { ...wrap, textAlign: "center", paddingTop: 120 } }, /* @__PURE__ */ React.createElement("div", { className: "bp-spinner", style: { margin: "0 auto 16px" } }), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)" } }, "Confirmando tu pago\u2026"));
  }
  if (phase === "done" && card) {
    const shareText = `Te regal\xE9 una tarjeta BrightPuppy de $${card.amount}. C\xF3digo: ${card.code} \u2014 canj\xE9ala en bpuppy.us`;
    return /* @__PURE__ */ React.createElement("div", { style: wrap }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)" } }, "\xA1Tarjeta lista!"), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)", margin: "6px 0 0" } }, "Comparte el c\xF3digo con quien la recibir\xE1. Es v\xE1lida para cachorro y grooming.")), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 420, margin: "0 auto 20px" } }, /* @__PURE__ */ React.createElement(GiftCardVisual, { design: card.design, amount: card.amount, recipient: card.recipient_name, message: card.message, code: card.code })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("a", { className: "btn btn-primary", href: "https://wa.me/?text=" + encodeURIComponent(shareText), target: "_blank", rel: "noopener" }, "Enviar por WhatsApp"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-outline", onClick: async () => {
      try {
        await navigator.clipboard.writeText(card.code);
        setShareMsg("C\xF3digo copiado.");
        setTimeout(() => setShareMsg(""), 2500);
      } catch (e) {
      }
    } }, "Copiar c\xF3digo"), /* @__PURE__ */ React.createElement("a", { className: "btn btn-outline", href: "/tarjeta-regalo" }, "Crear otra")), shareMsg ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: "var(--ink-2)", fontSize: 13, marginTop: 10 } }, shareMsg) : null);
  }
  if (phase === "error") {
    return /* @__PURE__ */ React.createElement("div", { style: { ...wrap, textAlign: "center", paddingTop: 90 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 26, fontWeight: 800, color: "var(--ink)" } }, "No pudimos confirmar el pago"), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)", margin: "8px 0 18px" } }, finalErr, " Si el cargo se hizo, escr\xEDbenos y lo resolvemos al instante."), /* @__PURE__ */ React.createElement("a", { className: "btn btn-primary", href: "/tarjeta-regalo" }, "Volver"));
  }
  return /* @__PURE__ */ React.createElement("div", { style: wrap }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 22 } }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow", style: { color: "var(--orange)" } }, "BrightPuppy"), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(30px,5vw,48px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)", margin: "8px 0 8px" } }, "Tarjetas de regalo"), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)", maxWidth: "46ch", margin: "0 auto" } }, "Regala la alegr\xEDa de un cachorro o un d\xEDa de spa. Monto prepago, dise\xF1o hermoso, y un c\xF3digo para que la persona lo canjee.")), cancelled ? /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(245,130,32,0.1)", border: "1px solid rgba(245,130,32,0.3)", borderRadius: 12, padding: "10px 14px", fontSize: 13.5, color: "var(--ink-2)", marginBottom: 18 } }, "Pago cancelado. Puedes intentarlo de nuevo cuando quieras.") : null, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr", gap: 24 } }, /* @__PURE__ */ React.createElement(GiftCardVisual, { design, amount: realAmount, recipient: recipientName, message }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Monto"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, [25, 50, 100, 150, 250, 500].map((a) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: a,
      onClick: () => {
        setAmount(a);
        setCustomAmt("");
      },
      style: { padding: "10px 16px", borderRadius: 12, border: `1.5px solid ${!customAmt && amount === a ? "var(--orange)" : "var(--line)"}`, background: !customAmt && amount === a ? "rgba(245,130,32,0.08)" : "var(--paper)", color: !customAmt && amount === a ? "var(--orange)" : "var(--ink-2)", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }
    },
    "$",
    a
  )), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "number",
      min: "10",
      max: "1000",
      value: customAmt,
      onChange: (e) => setCustomAmt(e.target.value),
      placeholder: "Otro $",
      style: { width: 100, padding: "10px 12px", borderRadius: 12, border: `1.5px solid ${customAmt ? "var(--orange)" : "var(--line)"}`, fontSize: 14, fontFamily: "inherit", outline: "none" }
    }
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "\xBFPara qu\xE9?"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, [["any", "Cualquiera"], ["puppy", "Cachorro"], ["grooming", "Grooming"]].map(([v, l]) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: v,
      onClick: () => setPurpose(v),
      style: { padding: "9px 16px", borderRadius: 999, border: `1.5px solid ${purpose === v ? "var(--orange)" : "var(--line)"}`, background: purpose === v ? "rgba(245,130,32,0.08)" : "var(--paper)", color: purpose === v ? "var(--orange)" : "var(--ink-2)", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }
    },
    l
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      disabled: true,
      title: "Disponible cuando la tienda tenga art\xEDculos",
      style: { padding: "9px 16px", borderRadius: 999, border: "1.5px solid var(--line)", background: "var(--paper)", color: "var(--ink-soft)", fontWeight: 700, fontSize: 13, cursor: "not-allowed", fontFamily: "inherit", opacity: 0.6 }
    },
    "Tienda (pr\xF3ximamente)"
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Dise\xF1o"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, Object.keys(GC_DESIGNS).map((k) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: k,
      onClick: () => setDesign(k),
      title: GC_DESIGNS[k].label[0],
      style: { width: 46, height: 32, borderRadius: 8, background: GC_DESIGNS[k].grad, border: `3px solid ${design === k ? "var(--ink)" : "transparent"}`, cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }
    }
  )))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Nombre de quien recibe"), /* @__PURE__ */ React.createElement("input", { value: recipientName, onChange: (e) => setRecipientName(e.target.value), placeholder: "Mar\xEDa", style: fld })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Email de quien recibe (opcional)"), /* @__PURE__ */ React.createElement("input", { value: recipientEmail, onChange: (e) => setRecipientEmail(e.target.value), placeholder: "maria@email.com", style: fld })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Tu nombre"), /* @__PURE__ */ React.createElement("input", { value: purchaserName, onChange: (e) => setPurchaserName(e.target.value), placeholder: "Luis", style: fld })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Tu email (recibo)"), /* @__PURE__ */ React.createElement("input", { value: purchaserEmail, onChange: (e) => setPurchaserEmail(e.target.value), placeholder: "tu@email.com", style: fld }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Mensaje (opcional)"), /* @__PURE__ */ React.createElement("input", { value: message, onChange: (e) => setMessage(e.target.value), maxLength: 120, placeholder: "\xA1Feliz cumplea\xF1os! Elige tu compa\xF1ero.", style: fld })), err ? /* @__PURE__ */ React.createElement("div", { style: { color: "#c0392b", fontSize: 13.5 } }, err) : null, /* @__PURE__ */ React.createElement("button", { onClick: buy, disabled: busy, className: "btn btn-primary", style: { width: "100%", justifyContent: "center", cursor: busy ? "default" : "pointer", opacity: busy ? 0.7 : 1, fontSize: 15, padding: "14px" } }, busy ? "Redirigiendo a pago seguro\u2026" : `Comprar tarjeta de $${realAmount} \u2192`), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", fontSize: 12, color: "var(--ink-soft)" } }, "Pago seguro con Stripe \xB7 recibir\xE1s el c\xF3digo al confirmar.")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 40, padding: "20px", borderRadius: 16, background: "var(--paper)", border: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, color: "var(--ink)", marginBottom: 10 } }, "\xBFTienes una tarjeta? Consulta su saldo"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { value: lookCode, onChange: (e) => setLookCode(e.target.value.toUpperCase()), placeholder: "BP-XXXX-XXXX", style: { ...fld, flex: 1 } }), /* @__PURE__ */ React.createElement("button", { onClick: lookup, className: "btn btn-outline", style: { cursor: "pointer" } }, "Consultar")), lookRes ? lookRes.invalid ? /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontSize: 13.5, color: "#c0392b" } }, "C\xF3digo no v\xE1lido.") : /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontSize: 14, color: "var(--ink)" } }, "Saldo: ", /* @__PURE__ */ React.createElement("b", { style: { color: "var(--orange)" } }, "$", lookRes.balance), " de $", lookRes.amount, " \xB7 ", lookRes.status === "redeemed" ? "usada" : "activa") : null));
}
function GiftCardRoot() {
  const [lang, setLang] = useState(() => window.bpGetLang && window.bpGetLang() || "es");
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  useEffect(() => window.bpOnLang ? window.bpOnLang(setLang) : void 0, []);
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang, setLang } }, /* @__PURE__ */ React.createElement(Header, { overDark: false }), /* @__PURE__ */ React.createElement("main", { style: { paddingTop: 80, background: "var(--bg,#fff)", minHeight: "100vh" } }, /* @__PURE__ */ React.createElement(GiftCardApp, null)), /* @__PURE__ */ React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(GiftCardRoot, null));

})();
