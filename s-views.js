(function(){
const { useState, useRef, useEffect, useContext, createContext } = React;
const BSCtx = createContext(null);
const useBS = () => useContext(BSCtx);
const bsPick = typeof window !== "undefined" && window.pick ? window.pick : (t, lang) => Array.isArray(t) ? lang === "en" ? t[1] != null ? t[1] : t[0] : t[0] : t;
const bsReadLang = () => {
  try {
    if (typeof window !== "undefined" && window.bpGetLang) return window.bpGetLang() || "es";
  } catch (e) {
  }
  try {
    return localStorage.getItem("bpuppy-lang") || "es";
  } catch (e) {
    return "es";
  }
};
const BSLangContext = typeof window !== "undefined" && window.LangContext ? window.LangContext : createContext({ lang: bsReadLang(), setLang: () => {
} });
const useLang = typeof window !== "undefined" && window.useLang ? window.useLang : () => useContext(BSLangContext);
const useT = typeof window !== "undefined" && window.useT ? window.useT : () => {
  const { lang } = useLang();
  return (t) => bsPick(t, lang);
};
const BS_STATUS = {
  nuevo: { es: "Nuevo", en: "New", color: "#9aa0a6", glow: false },
  comparte: { es: "Comparte", en: "Sharer", color: "#2F6BFF", glow: false },
  creador: { es: "Creador", en: "Creator", color: "#2F6BFF", glow: false },
  plata: { es: "Plata \xB7 Puppy Run", en: "Silver \xB7 Puppy Run", color: "#8A93A6", glow: false },
  groomer: { es: "Cliente Spa", en: "Spa Client", color: "#1EB87A", glow: false },
  vip: { es: "Miembro VIP", en: "VIP Member", color: "#7C3AED", glow: true },
  comprador: { es: "Familia BrightPuppy", en: "BrightPuppy Family", color: "#F58220", glow: true },
  doble: { es: "Doble Privilegio", en: "Double Privilege", color: "#F5C53A", glow: true }
};
const bsStatusLabel = (key, lang) => {
  const s = BS_STATUS[key] || BS_STATUS.nuevo;
  return lang === "en" ? s.en : s.es;
};
function StatusChip({ status, lang, size }) {
  const ctx = useLang();
  const lg = lang || ctx && ctx.lang || bsReadLang();
  const s = BS_STATUS[status] || BS_STATUS.nuevo;
  const sm = size === "sm";
  return /* @__PURE__ */ React.createElement("span", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: sm ? "2px 8px" : "3px 11px",
    borderRadius: 999,
    fontSize: sm ? 10.5 : 12,
    fontWeight: 800,
    color: s.glow ? "#fff" : s.color,
    background: s.glow ? s.color : s.color + "1A",
    border: `1px solid ${s.color}${s.glow ? "" : "55"}`,
    boxShadow: s.glow ? `0 0 10px ${s.color}88` : "none",
    whiteSpace: "nowrap"
  } }, /* @__PURE__ */ React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: s.glow ? "#fff" : s.color } }), bsStatusLabel(status, lg));
}
function BadgeChips({ badges, lang, max }) {
  const ctx = useLang();
  const lg = lang || ctx && ctx.lang || bsReadLang();
  const list = (badges || []).filter((b) => b !== "nuevo").slice(0, max || 4);
  if (!list.length) return null;
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, list.map((b) => /* @__PURE__ */ React.createElement(StatusChip, { key: b, status: b, lang: lg, size: "sm" })));
}
const THEMES = {
  clean: {
    bg: "#FBFAF8",
    surface: "#FFFFFF",
    surface2: "#F4F1EC",
    border: "rgba(45,36,33,0.12)",
    borderStrong: "rgba(45,36,33,0.22)",
    brand: "#A85F2D",
    rose: "#C0803A",
    grad: "linear-gradient(135deg,#A85F2D 0%,#C0803A 100%)",
    glow: "0 2px 10px rgba(45,36,33,0.06)",
    ink: "#2D2421",
    ink2: "#5f5346",
    soft: "#A89C8E",
    like: "#E85D75",
    online: "#1EB87A",
    name: "Clean"
  },
  electric: {
    bg: "#0A0F1E",
    surface: "#111A30",
    surface2: "#1A2540",
    border: "rgba(120,180,255,0.10)",
    borderStrong: "rgba(120,180,255,0.24)",
    brand: "#0EA5E9",
    rose: "#22D3EE",
    grad: "linear-gradient(135deg,#0EA5E9 0%,#06B6D4 55%,#22D3EE 100%)",
    glow: "0 8px 32px rgba(14,165,233,0.42)",
    ink: "#EAF2FF",
    ink2: "#8FA6CC",
    soft: "#46587E",
    like: "#FB7185",
    online: "#34D399",
    name: "Electric"
  },
  midnight: {
    bg: "#09090F",
    surface: "#111120",
    surface2: "#191930",
    border: "rgba(255,255,255,0.07)",
    borderStrong: "rgba(255,255,255,0.14)",
    brand: "#FF5520",
    rose: "#FF2D78",
    grad: "linear-gradient(135deg,#FF5520 0%,#FF2D78 100%)",
    glow: "0 8px 32px rgba(255,85,32,0.38)",
    ink: "#F0EEF8",
    ink2: "#8886A8",
    soft: "#403E58",
    like: "#FF2D78",
    online: "#00E87A",
    name: "Midnight"
  },
  violet: {
    bg: "#07060F",
    surface: "#0F0E22",
    surface2: "#171535",
    border: "rgba(148,100,255,0.1)",
    borderStrong: "rgba(148,100,255,0.22)",
    brand: "#9B6FFF",
    rose: "#F040A0",
    grad: "linear-gradient(135deg,#9B6FFF 0%,#F040A0 100%)",
    glow: "0 8px 32px rgba(155,111,255,0.42)",
    ink: "#F2F0FF",
    ink2: "#9A98C0",
    soft: "#4E4C70",
    like: "#F040A0",
    online: "#3DFFA0",
    name: "Violet"
  },
  warm: {
    bg: "#FAF8F5",
    surface: "#FFFFFF",
    surface2: "#F2EFE8",
    border: "rgba(0,0,0,0.07)",
    borderStrong: "rgba(0,0,0,0.13)",
    brand: "#F55820",
    rose: "#E83860",
    grad: "linear-gradient(135deg,#F55820 0%,#E83860 100%)",
    glow: "0 8px 24px rgba(245,88,32,0.28)",
    ink: "#18161F",
    ink2: "#706C84",
    soft: "#B0ACC0",
    like: "#E83860",
    online: "#16C65F",
    name: "Warm"
  }
};
(function() {
  if (document.getElementById("bs-css")) return;
  const s = document.createElement("style");
  s.id = "bs-css";
  s.textContent = `
    @keyframes bsLike   { 0%{transform:scale(1)} 20%{transform:scale(1.45)} 50%{transform:scale(0.9)} 100%{transform:scale(1)} }
    @keyframes bsFloat  { 0%{opacity:1;transform:scale(1) translateY(0)} 100%{opacity:0;transform:scale(1.8) translateY(-80px)} }
    @keyframes bsScan   { 0%{top:0} 100%{top:100%} }
    @keyframes bsFadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
    @keyframes bsPop    { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
    .bs-fade { animation:bsFadeIn 0.28s ease both }
    .bs-pop  { animation:bsPop 0.32s cubic-bezier(0.34,1.56,0.64,1) both }
    .bs-scr  { overflow-y:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none }
    .bs-scr::-webkit-scrollbar { display:none }
    .bs-hscr { overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none }
    .bs-hscr::-webkit-scrollbar { display:none }
    .bs-btn  { transition:opacity .15s,transform .12s;background:none;border:none;cursor:pointer;padding:0 }
    .bs-btn:active { transform:scale(0.94);opacity:.8 }
    @keyframes bsRainbow { to { background-position:0 0,-300% 0 } }
    .bs-rainbow { border:3px solid transparent; border-radius:16px;
      background:var(--bsr-fill,linear-gradient(135deg,#F58220,#E85D75)) padding-box, linear-gradient(90deg,#ff4d4d,#ff9f1c,#ffd93d,#4ade80,#38bdf8,#a855f7,#ff4d4d) border-box;
      background-size:100% 100%,300% 100%; animation:bsRainbow 3s linear infinite;
      color:#fff; cursor:pointer; transition:transform .12s; }
    .bs-rainbow:hover  { transform:translateY(-2px) }
    .bs-rainbow:active { transform:scale(.98) }
    * { box-sizing:border-box }
    input,textarea { outline:none;font-family:inherit }
  `;
  document.head.appendChild(s);
})();
const fmt = (n) => n >= 1e3 ? (n / 1e3).toFixed(1) + "k" : String(n);
function BSAvatar({ user, size = 36, ring = false }) {
  const BS = useBS();
  const av = /* @__PURE__ */ React.createElement("div", { style: {
    width: size,
    height: size,
    borderRadius: "50%",
    background: user?.color || BS.brand,
    display: "grid",
    placeItems: "center",
    fontSize: size * 0.34,
    fontWeight: 800,
    color: "#fff",
    fontFamily: "Plus Jakarta Sans,sans-serif",
    flexShrink: 0
  } }, user?.initials || "?");
  if (!ring) return av;
  return /* @__PURE__ */ React.createElement("div", { style: { padding: 2.5, borderRadius: "50%", background: BS.grad, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { padding: 2.5, borderRadius: "50%", background: BS.bg } }, av));
}
function BSVerified({ size = 14 }) {
  const BS = useBS();
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 16 16", width: size, height: size }, /* @__PURE__ */ React.createElement("circle", { cx: "8", cy: "8", r: "8", fill: BS.brand }), /* @__PURE__ */ React.createElement("path", { d: "M5 8l2 2 4-4", stroke: "white", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }));
}
function BSocialLogo({ size = 48 }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 200 240", width: size, height: size * 1.2, fill: "none" }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: "bsLg3", x1: "0", y1: "0", x2: "1", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "0%", stopColor: "#FF5520" }), /* @__PURE__ */ React.createElement("stop", { offset: "100%", stopColor: "#FF2D78" }))), /* @__PURE__ */ React.createElement("ellipse", { cx: "63", cy: "44", rx: "22", ry: "30", transform: "rotate(-8 63 44)", fill: "url(#bsLg3)" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "137", cy: "44", rx: "22", ry: "30", transform: "rotate(8 137 44)", fill: "url(#bsLg3)" }), /* @__PURE__ */ React.createElement("rect", { x: "14", y: "58", width: "172", height: "166", rx: "44", fill: "url(#bsLg3)" }), /* @__PURE__ */ React.createElement("path", { d: "M55 92L55 148Q55 148 102 148Q132 148 132 120Q132 92 102 92Z", fill: "rgba(255,255,255,0.18)" }), /* @__PURE__ */ React.createElement("path", { d: "M55 148L55 202Q55 202 108 202Q140 202 140 175Q140 148 108 148Z", fill: "rgba(255,255,255,0.18)" }));
}
function WelcomeScreen({ onSendLink }) {
  const BS = useBS();
  const t = useT();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const send = async () => {
    const e = (email || "").trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) {
      setErr(t(["Escribe un correo v\xE1lido", "Enter a valid email"]));
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const d = await onSendLink(e);
      if (d && d.ok) setSent(true);
      else setErr(d && d.error || t(["No se pudo enviar el enlace", "We couldn\u2019t send the link"]));
    } catch (_e) {
      setErr(t(["Error de red, intenta de nuevo", "Network error, please try again"]));
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { style: { height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("img", { src: "assets/photos/bsocial-pool.webp", alt: t(["Perritos en una fiesta de piscina", "Puppies at a pool party"]), style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 28%", display: "block" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(5,5,18,0.05) 0%,rgba(5,5,18,0.35) 48%,rgba(5,5,18,0.93) 100%)" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 26px 34px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: "7px 8px 4px", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)", display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement(BSocialLogo, { size: 36 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 } }, "B Social"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 } }, "by BrightPuppy"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 21, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 12 } }, t(["La comunidad m\xE1s leal de internet", "The most loyal community on the internet"])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 7, height: 7, borderRadius: "50%", background: BS.online } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500 } }, t(["Comunidad BrightPuppy", "BrightPuppy Community"]))))), /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface, padding: "22px 22px 34px", display: "flex", flexDirection: "column", gap: 10 } }, sent ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "8px 0 4px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: 10, color: BS.brand } }, /* @__PURE__ */ React.createElement("svg", { width: "38", height: "38", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M4 7l8 6 8-6" }))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 19, fontWeight: 800, color: BS.ink, marginBottom: 6 } }, t(["Revisa tu correo", "Check your email"])), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: BS.ink2, lineHeight: 1.55, margin: 0 } }, t(["Te enviamos un enlace a", "We sent a link to"]), " ", /* @__PURE__ */ React.createElement("b", { style: { color: BS.ink } }, email.trim().toLowerCase()), ". ", t(["T\xF3calo para entrar \u2014 sin contrase\xF1as.", "Tap it to sign in \u2014 no passwords."]))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink, marginBottom: 2 } }, t(["Entra o crea tu cuenta", "Sign in or create your account"])), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") send();
      },
      placeholder: t(["tu@correo.com", "you@email.com"]),
      style: { width: "100%", padding: "14px 15px", borderRadius: 14, border: `1.5px solid ${BS.borderStrong}`, background: BS.surface2, fontSize: 14.5, color: BS.ink, fontFamily: "inherit" }
    }
  ), err && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.like, fontWeight: 600 } }, err), /* @__PURE__ */ React.createElement("button", { onClick: send, disabled: busy, className: "bs-btn bs-rainbow", style: { "--bsr-fill": BS.grad, padding: "15px", fontSize: 15, fontWeight: 800, cursor: busy ? "default" : "pointer", fontFamily: "inherit", boxShadow: BS.glow, opacity: busy ? 0.7 : 1 } }, busy ? t(["Enviando\u2026", "Sending\u2026"]) : t(["Enviarme mi enlace m\xE1gico", "Send me my magic link"])), /* @__PURE__ */ React.createElement("p", { style: { textAlign: "center", fontSize: 11.5, color: BS.soft, margin: "4px 0 0", lineHeight: 1.5 } }, t(["Sin contrase\xF1as. Usa el mismo correo de tu cuenta BrightPuppy si ya eres cliente.", "No passwords. Use the same email as your BrightPuppy account if you\u2019re already a client."]))), /* @__PURE__ */ React.createElement("a", { href: "/", className: "bs-btn", style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 4, padding: "11px", borderRadius: 12, textDecoration: "none", color: BS.soft, fontSize: 13, fontWeight: 600 } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M19 12H5" }), /* @__PURE__ */ React.createElement("path", { d: "M12 19l-7-7 7-7" })), t(["Volver a la p\xE1gina web", "Back to the website"]))));
}
async function bsUpload(file, folder) {
  const sb = window._bsSb;
  if (!sb || !file) return "";
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = (folder || "media") + "/" + Date.now() + "_" + Math.random().toString(36).slice(2) + "." + ext;
  const up = await sb.storage.from("social-media").upload(path, file, { contentType: file.type, upsert: false });
  if (up.error) throw up.error;
  return sb.storage.from("social-media").getPublicUrl(path).data.publicUrl;
}
function PhotoPick({ label, preview, onPick, BS, round }) {
  const ref = useRef(null);
  return /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { onClick: () => ref.current && ref.current.click(), style: { width: 72, height: 72, borderRadius: round ? "50%" : 14, background: BS.surface2, border: `2px dashed ${BS.borderStrong}`, margin: "0 auto 6px", cursor: "pointer", overflow: "hidden", display: "grid", placeItems: "center", color: BS.soft } }, preview ? /* @__PURE__ */ React.createElement("img", { src: preview, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : /* @__PURE__ */ React.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M8 5l1.5-2h5L16 5" }))), /* @__PURE__ */ React.createElement("input", { ref, type: "file", accept: "image/*", onChange: (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) onPick(f);
  }, style: { display: "none" } }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.ink2, fontWeight: 600 } }, label));
}
function CreateProfileScreen({ me, onSave, onLogout, onDone }) {
  const BS = useBS();
  const t = useT();
  const m = me || {};
  const editing = !!(onDone && m && m.username);
  let pend = null;
  try {
    pend = JSON.parse(localStorage.getItem("bp_pending_social") || "null");
  } catch (e) {
  }
  if (m.username) pend = null;
  const [firstName, setFirstName] = useState(m.first_name || pend && pend.first_name || "");
  const [lastName, setLastName] = useState(m.last_name || "");
  const [birthdate, setBirthdate] = useState(m.birthdate || "");
  const [sex, setSex] = useState(m.sex || "");
  const ageY = (d) => {
    if (!d) return null;
    const b = /* @__PURE__ */ new Date(d + "T00:00:00");
    if (isNaN(b)) return null;
    const n = /* @__PURE__ */ new Date();
    let a = n.getFullYear() - b.getFullYear();
    const mo = n.getMonth() - b.getMonth();
    if (mo < 0 || mo === 0 && n.getDate() < b.getDate()) a--;
    return a;
  };
  const [bio, setBio] = useState(m.bio || pend && pend.story || "");
  const [petSpecies, setPetSpecies] = useState(m.pet_species || "");
  const [petName, setPetName] = useState(m.pet_name || pend && pend.pet_name || "");
  const [petBreed, setPetBreed] = useState(m.pet_breed || "");
  const [petColor, setPetColor] = useState(m.pet_color || "");
  const [petAge, setPetAge] = useState(m.pet_age || "");
  const [address, setAddress] = useState(m.address || "");
  const [city, setCity] = useState(m.city || "");
  const [stateV, setStateV] = useState(m.state || "");
  const [zip, setZip] = useState(m.zip || "");
  const [isPublic, setIsPublic] = useState(!!m.is_public);
  const [avatarFile, setAvatarFile] = useState(null);
  const [petFile, setPetFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [avatarPrev, setAvatarPrev] = useState(m.avatar_url || "");
  const [petPrev, setPetPrev] = useState(m.pet_photo_url || pend && pend.photo_url || "");
  const [coverPrev, setCoverPrev] = useState(m.cover_url || "");
  const [coverPos, setCoverPos] = useState(m.cover_pos != null ? m.cover_pos : 50);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const pickAvatar = (f) => {
    setAvatarFile(f);
    try {
      setAvatarPrev(URL.createObjectURL(f));
    } catch (e) {
    }
  };
  const pickPet = (f) => {
    setPetFile(f);
    try {
      setPetPrev(URL.createObjectURL(f));
    } catch (e) {
    }
  };
  const pickCover = (f) => {
    setCoverFile(f);
    try {
      setCoverPrev(URL.createObjectURL(f));
    } catch (e) {
    }
  };
  const save = async () => {
    if (!firstName.trim()) {
      setErr(t(["Escribe tu nombre", "Enter your name"]));
      return;
    }
    if (!editing && !birthdate) {
      setErr(t(["Ingresa tu fecha de nacimiento para continuar", "Enter your date of birth to continue"]));
      return;
    }
    if (birthdate) {
      const a = ageY(birthdate);
      if (a !== null && a < 18) {
        setErr(t(["Para crear un perfil en B Social debes tener 18 a\xF1os o m\xE1s. \xA1Pero puedes seguir jugando y guardar tu puntaje en el juego!", "To create a B Social profile you must be 18 or older. But you can keep playing and save your score in the game!"]));
        return;
      }
    }
    setBusy(true);
    setErr("");
    try {
      let avatar_url = m.avatar_url || (/^https?:/.test(avatarPrev) ? avatarPrev : null);
      let pet_photo_url = m.pet_photo_url || (/^https?:/.test(petPrev) ? petPrev : null);
      let cover_url = m.cover_url || (/^https?:/.test(coverPrev) ? coverPrev : null);
      if (avatarFile) avatar_url = await bsUpload(avatarFile, "avatars");
      if (petFile) pet_photo_url = await bsUpload(petFile, "pets");
      if (coverFile) cover_url = await bsUpload(coverFile, "covers");
      const d = await onSave({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        bio: bio.trim(),
        birthdate: birthdate || null,
        sex: sex || null,
        pet_species: petSpecies,
        pet_name: petName.trim(),
        pet_breed: petBreed.trim(),
        pet_color: petColor.trim(),
        pet_age: petAge.trim(),
        address: address.trim(),
        city: city.trim(),
        state: stateV.trim(),
        zip: zip.trim(),
        avatar_url,
        pet_photo_url,
        cover_url,
        cover_pos: coverPos,
        is_public: isPublic
      });
      if (!(d && d.ok)) {
        setErr(d && d.error || t(["No se pudo guardar", "We couldn\u2019t save"]));
        setBusy(false);
      } else if (onDone) onDone();
    } catch (e) {
      setErr(e && e.message || t(["Error al guardar", "Error while saving"]));
      setBusy(false);
    }
  };
  const fld = { width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BS.borderStrong}`, background: BS.surface2, fontSize: 14, color: BS.ink, fontFamily: "inherit" };
  const lbl = { fontSize: 11.5, fontWeight: 700, color: BS.ink2, margin: "0 0 5px" };
  const grp = { marginBottom: 12 };
  const sectionTitle = { fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: BS.brand, margin: "18px 0 10px" };
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { padding: "36px 22px 28px", minHeight: "100%", background: BS.bg } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 25, fontWeight: 800, color: BS.ink, letterSpacing: "-0.03em", marginBottom: 6 } }, editing ? t(["Editar perfil", "Edit profile"]) : t(["Crea tu perfil", "Create your profile"])), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: BS.ink2, lineHeight: 1.5, margin: "0 0 14px" } }, editing ? t(["Actualiza tus datos y fotos cuando quieras.", "Update your details and photos whenever you like."]) : t(["Bienvenido", "Welcome"]) + (m.email ? " \xB7 " + m.email : "") + ". " + t(["Completa tus datos para unirte a la comunidad.", "Complete your details to join the community."])), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Foto de portada", "Cover photo"])), /* @__PURE__ */ React.createElement("label", { style: { display: "block", height: 120, borderRadius: 14, border: `1.5px dashed ${BS.borderStrong}`, background: coverPrev ? `url(${coverPrev}) center ${coverPos}%/cover` : BS.surface2, cursor: "pointer", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("input", { type: "file", accept: "image/*", onChange: (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) pickCover(f);
  }, style: { display: "none" } }), !coverPrev && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", color: BS.soft, fontSize: 12.5, fontWeight: 700 } }, t(["+ Sube o elige una portada", "+ Upload or choose a cover"])), coverPrev && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 6, right: 8, background: "rgba(0,0,0,0.45)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999 } }, t(["Cambiar", "Change"]))), coverPrev && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.soft, marginBottom: 4 } }, t(["Ajusta la posici\xF3n de la portada", "Adjust cover position"])), /* @__PURE__ */ React.createElement("input", { type: "range", min: 0, max: 100, value: coverPos, onChange: (e) => setCoverPos(Number(e.target.value)), style: { width: "100%", accentColor: BS.brand } }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 24, justifyContent: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement(PhotoPick, { label: t(["Tu foto", "Your photo"]), preview: avatarPrev, onPick: pickAvatar, BS, round: true }), /* @__PURE__ */ React.createElement(PhotoPick, { label: t(["Foto de tu mascota", "Your pet\u2019s photo"]), preview: petPrev, onPick: pickPet, BS })), /* @__PURE__ */ React.createElement("div", { style: sectionTitle }, t(["Tus datos", "Your details"])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Nombre *", "First name *"])), /* @__PURE__ */ React.createElement("input", { value: firstName, onChange: (e) => setFirstName(e.target.value), placeholder: "Luis", style: fld })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Apellido", "Last name"])), /* @__PURE__ */ React.createElement("input", { value: lastName, onChange: (e) => setLastName(e.target.value), placeholder: "Guzm\xE1n", style: fld }))), /* @__PURE__ */ React.createElement("div", { style: grp }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Fecha de nacimiento *", "Date of birth *"])), /* @__PURE__ */ React.createElement("input", { type: "date", value: birthdate, max: new Date(Date.now() - 864e5).toISOString().slice(0, 10), onChange: (e) => setBirthdate(e.target.value), style: fld }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.soft, marginTop: 5, lineHeight: 1.45 } }, t(["Solo para confirmar que eres mayor de edad. No se muestra en tu perfil. Crear un perfil requiere tener 18 a\xF1os o m\xE1s; los menores pueden jugar y guardar su puntaje.", "Only to confirm you\u2019re of legal age. It\u2019s never shown on your profile. Creating a profile requires being 18 or older; minors can still play and save their score."])), birthdate && ageY(birthdate) !== null && ageY(birthdate) < 18 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: BS.like || "#E5484D", background: "rgba(229,72,77,0.1)", border: "1px solid rgba(229,72,77,0.3)", borderRadius: 10, padding: "8px 11px", marginTop: 7, lineHeight: 1.45 } }, t(["A\xFAn no puedes crear un perfil (debes tener 18+). \xA1Pero puedes seguir jugando y guardar tu puntaje en el juego!", "You can\u2019t create a profile yet (you must be 18+). But you can keep playing and save your score in the game!"]))), /* @__PURE__ */ React.createElement("div", { style: grp }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Sexo", "Sex"])), /* @__PURE__ */ React.createElement("select", { value: sex, onChange: (e) => setSex(e.target.value), style: fld }, /* @__PURE__ */ React.createElement("option", { value: "" }, t(["Prefiero no decir", "Prefer not to say"])), /* @__PURE__ */ React.createElement("option", { value: "F" }, t(["Femenino", "Female"])), /* @__PURE__ */ React.createElement("option", { value: "M" }, t(["Masculino", "Male"])), /* @__PURE__ */ React.createElement("option", { value: "O" }, t(["Otro", "Other"])))), /* @__PURE__ */ React.createElement("div", { style: grp }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Bio (opcional)", "Bio (optional)"])), /* @__PURE__ */ React.createElement("input", { value: bio, onChange: (e) => setBio(e.target.value), placeholder: t(["Amante de los Golden \u{1F43E}", "Golden lover \u{1F43E}"]), style: fld })), /* @__PURE__ */ React.createElement("div", { style: sectionTitle }, t(["Tu mascota", "Your pet"])), /* @__PURE__ */ React.createElement("div", { style: { ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["\xBFQu\xE9 tipo de mascota?", "What kind of pet?"])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, [["perro", t(["Perro", "Dog"])], ["gato", t(["Gato", "Cat"])], ["otra", t(["Otra", "Other"])]].map(([v, l]) => /* @__PURE__ */ React.createElement("button", { key: v, onClick: () => setPetSpecies(v), className: "bs-btn", style: { flex: 1, padding: "10px", borderRadius: 11, border: `1.5px solid ${petSpecies === v ? BS.brand : BS.border}`, background: petSpecies === v ? "rgba(245,130,32,0.08)" : BS.surface2, color: petSpecies === v ? BS.brand : BS.ink2, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, l)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Nombre", "Name"])), /* @__PURE__ */ React.createElement("input", { value: petName, onChange: (e) => setPetName(e.target.value), placeholder: "Luna", style: fld })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Raza / tipo", "Breed / type"])), /* @__PURE__ */ React.createElement("input", { value: petBreed, onChange: (e) => setPetBreed(e.target.value), placeholder: "Golden Retriever", style: fld }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Color", "Color"])), /* @__PURE__ */ React.createElement("input", { value: petColor, onChange: (e) => setPetColor(e.target.value), placeholder: t(["Dorado", "Golden"]), style: fld })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Edad", "Age"])), /* @__PURE__ */ React.createElement("input", { value: petAge, onChange: (e) => setPetAge(e.target.value), placeholder: t(["2 a\xF1os", "2 years"]), style: fld }))), /* @__PURE__ */ React.createElement("div", { style: sectionTitle }, t(["Tu direcci\xF3n", "Your address"]), " ", /* @__PURE__ */ React.createElement("span", { style: { textTransform: "none", letterSpacing: 0, color: BS.soft, fontWeight: 600 } }, "\xB7 ", t(["privada, nunca p\xFAblica", "private, never public"]))), /* @__PURE__ */ React.createElement("div", { style: grp }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Calle y n\xFAmero", "Street and number"])), /* @__PURE__ */ React.createElement("input", { value: address, onChange: (e) => setAddress(e.target.value), placeholder: "123 Main St, Apt 4", style: fld })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 2, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Ciudad", "City"])), /* @__PURE__ */ React.createElement("input", { value: city, onChange: (e) => setCity(e.target.value), list: "bs-cities", placeholder: t(["Empieza a escribir\u2026", "Start typing\u2026"]), style: fld }), /* @__PURE__ */ React.createElement("datalist", { id: "bs-cities" }, /* @__PURE__ */ React.createElement("option", { value: "Miami, FL" }), /* @__PURE__ */ React.createElement("option", { value: "Orlando, FL" }), /* @__PURE__ */ React.createElement("option", { value: "Tampa, FL" }), /* @__PURE__ */ React.createElement("option", { value: "Haines City, FL" }), /* @__PURE__ */ React.createElement("option", { value: "Kissimmee, FL" }), /* @__PURE__ */ React.createElement("option", { value: "Lakeland, FL" }), /* @__PURE__ */ React.createElement("option", { value: "Davenport, FL" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Estado", "State"])), /* @__PURE__ */ React.createElement("input", { value: stateV, onChange: (e) => setStateV(e.target.value), placeholder: "FL", style: fld })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["ZIP", "ZIP"])), /* @__PURE__ */ React.createElement("input", { value: zip, onChange: (e) => setZip(e.target.value), placeholder: "33844", style: fld }))), /* @__PURE__ */ React.createElement("div", { onClick: () => setIsPublic((v) => !v), style: { display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 13, border: `1.5px solid ${isPublic ? BS.brand : BS.border}`, background: isPublic ? "rgba(245,130,32,0.07)" : BS.surface2, cursor: "pointer", marginTop: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink } }, t(["Perfil p\xFAblico", "Public profile"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft, lineHeight: 1.5 } }, t(["Si lo activas, en Comunidad solo se ver\xE1:", "If you turn it on, Community will only show:"]), " ", /* @__PURE__ */ React.createElement("b", { style: { color: BS.ink2 } }, t(["tu nombre, ciudad y tu mascota", "your name, city and pet"])), " ", t(["(con foto si subiste).", "(with a photo if you added one)."]), " ", /* @__PURE__ */ React.createElement("b", { style: { color: BS.ink2 } }, t(["Tu correo, tel\xE9fono y direcci\xF3n NUNCA se hacen p\xFAblicos.", "Your email, phone and address are NEVER made public."])), " ", t(["Por defecto tu perfil es privado.", "By default your profile is private."]))), /* @__PURE__ */ React.createElement("div", { style: { width: 46, height: 26, borderRadius: 999, background: isPublic ? BS.grad : BS.border, position: "relative", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 3, left: isPublic ? 23 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left .2s" } }))), err && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.like, fontWeight: 600, marginTop: 10 } }, err), (() => {
    const minor = birthdate && ageY(birthdate) !== null && ageY(birthdate) < 18;
    const blocked = busy || minor;
    return /* @__PURE__ */ React.createElement("button", { onClick: save, disabled: blocked, className: "bs-btn bs-rainbow", style: { "--bsr-fill": BS.grad, width: "100%", marginTop: 16, padding: "15px", fontSize: 15, fontWeight: 800, cursor: blocked ? "default" : "pointer", fontFamily: "inherit", boxShadow: BS.glow, opacity: blocked ? 0.55 : 1 } }, busy ? t(["Guardando\u2026", "Saving\u2026"]) : editing ? t(["Guardar cambios", "Save changes"]) : t(["Entrar a la comunidad", "Enter the community"]));
  })(), /* @__PURE__ */ React.createElement("button", { onClick: () => editing ? onDone() : onLogout(), className: "bs-btn", style: { width: "100%", marginTop: 10, padding: "12px", borderRadius: 12, border: "none", background: "transparent", color: BS.soft, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" } }, editing ? t(["Cancelar", "Cancel"]) : t(["Usar otra cuenta", "Use another account"])), !editing && /* @__PURE__ */ React.createElement("a", { href: "/", className: "bs-btn", style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 2, padding: "10px", textDecoration: "none", color: BS.soft, fontSize: 12.5, fontWeight: 600 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M19 12H5" }), /* @__PURE__ */ React.createElement("path", { d: "M12 19l-7-7 7-7" })), t(["Volver a la p\xE1gina web", "Back to the website"])));
}
function OnboardingScreen({ onDone }) {
  const BS = useBS();
  const t = useT();
  const [pick, setPick] = useState(null);
  const opts = [
    { id: "dog", emoji: "\u{1F415}", label: t(["Perros", "Dogs"]), sub: t(["Tengo o quiero un perro", "I have or want a dog"]) },
    { id: "cat", emoji: "\u{1F431}", label: t(["Gatos", "Cats"]), sub: t(["Tengo o quiero un gato", "I have or want a cat"]) },
    { id: "both", emoji: "\u{1F43E}", label: t(["Ambos", "Both"]), sub: t(["Amo a todos por igual", "I love them all equally"]) },
    { id: "soon", emoji: "\u{1F331}", label: t(["Pronto", "Soon"]), sub: t(["Estoy pens\xE1ndolo", "I\u2019m thinking about it"]) }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { height: "100%", background: BS.bg, padding: "44px 22px 28px", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 28 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", color: BS.ink, marginBottom: 6 } }, t(["\xBFCu\xE1l es tu mundo?", "What\u2019s your world?"])), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: BS.ink2, lineHeight: 1.5, margin: 0 } }, t(["Personaliza tu experiencia en B Social", "Personalize your B Social experience"]))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flex: 1 } }, opts.map((o) => /* @__PURE__ */ React.createElement("button", { key: o.id, onClick: () => setPick(o.id), style: { padding: "20px 14px", borderRadius: 18, border: `2px solid ${pick === o.id ? BS.brand : BS.border}`, background: pick === o.id ? "rgba(255,85,32,0.1)" : BS.surface, cursor: "pointer", textAlign: "center", fontFamily: "inherit", transition: "all .18s" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 9 } }, o.emoji), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: BS.ink } }, o.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.soft, marginTop: 3 } }, o.sub)))), /* @__PURE__ */ React.createElement("button", { onClick: onDone, disabled: !pick, className: "bs-btn", style: { marginTop: 22, padding: "15px", borderRadius: 14, border: "none", background: pick ? BS.grad : BS.surface2, fontSize: 15, fontWeight: 700, color: pick ? "#fff" : BS.soft, cursor: pick ? "pointer" : "default", fontFamily: "inherit", transition: "all .2s", boxShadow: pick ? BS.glow : "none" } }, t(["Empezar", "Get started"])));
}
function StoriesBar() {
  const BS = useBS();
  const t = useT();
  const A = typeof window !== "undefined" && window.BSAUTH || {};
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [view, setView] = useState(null);
  const stories = BSDATA.stories || [];
  const pickStory = async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (f.size > 25 * 1024 * 1024) {
      return;
    }
    setBusy(true);
    try {
      const url = await bsUpload(f, "stories");
      if (url && A.createStory) await A.createStory(url);
    } catch (_e) {
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };
  return /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface, borderBottom: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", onChange: pickStory, style: { display: "none" } }), /* @__PURE__ */ React.createElement("div", { className: "bs-hscr", style: { display: "flex", gap: 12, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { onClick: () => !busy && fileRef.current && fileRef.current.click(), style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 54, height: 54, borderRadius: "50%", border: `2px dashed ${BS.borderStrong}`, display: "grid", placeItems: "center", background: BS.surface2, color: BS.brand } }, busy ? /* @__PURE__ */ React.createElement("div", { style: { width: 18, height: 18, border: `2px solid ${BS.border}`, borderTopColor: BS.brand, borderRadius: "50%", animation: "bpChatDot 0.8s linear infinite" } }) : /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" }))), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9.5, color: BS.ink, fontWeight: 600 } }, t(["Tu historia", "Your story"]))), stories.map((s) => /* @__PURE__ */ React.createElement("div", { key: s.id, onClick: () => setView(s), style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { padding: 2.5, borderRadius: "50%", background: BS.grad } }, /* @__PURE__ */ React.createElement("div", { style: { width: 50, height: 50, borderRadius: "50%", background: s.color || BS.brand, display: "grid", placeItems: "center", border: `2.5px solid ${BS.surface}`, overflow: "hidden" } }, s.avatar ? /* @__PURE__ */ React.createElement("img", { src: s.avatar, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : /* @__PURE__ */ React.createElement("span", { style: { fontSize: 17, fontWeight: 700, color: "#fff" } }, s.initials))), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9.5, color: BS.ink, fontWeight: 600, maxWidth: 56, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, s.username)))), view && /* @__PURE__ */ React.createElement("div", { onClick: () => setView(null), style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 2e3, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 16, left: 16, right: 16, display: "flex", alignItems: "center", gap: 10, color: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 34, height: 34, borderRadius: "50%", background: view.color || BS.brand, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13, overflow: "hidden" } }, view.avatar ? /* @__PURE__ */ React.createElement("img", { src: view.avatar, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : view.initials), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, fontSize: 14 } }, view.username), /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
    e.stopPropagation();
    setView(null);
  }, style: { marginLeft: "auto", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 15 } }, "\u2715")), /* @__PURE__ */ React.createElement("img", { src: view.img, alt: "", style: { maxWidth: "100%", maxHeight: "86vh", borderRadius: 16, objectFit: "contain" } })));
}
function PostCard({ post, onLike, onSave, onOpen }) {
  const BS = useBS();
  const t = useT();
  const [animLike, setAnimLike] = useState(false);
  const [heart, setHeart] = useState(null);
  const open = () => {
    if (onOpen) onOpen(post);
  };
  const handleLike = () => {
    onLike(post.id);
    setAnimLike(true);
    setTimeout(() => setAnimLike(false), 450);
  };
  const handleDblTap = (e) => {
    if (!post.liked) handleLike();
    const r = e.currentTarget.getBoundingClientRect();
    setHeart({ x: e.clientX - r.left, y: e.clientY - r.top, k: Date.now() });
    setTimeout(() => setHeart(null), 900);
  };
  return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 2 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px 9px" } }, /* @__PURE__ */ React.createElement(BSAvatar, { user: post, size: 36, ring: true }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink } }, post.username), post.verified && /* @__PURE__ */ React.createElement(BSVerified, { size: 13 })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.soft } }, post.location ? post.location : post.city, " \xB7 ", post.time)), /* @__PURE__ */ React.createElement("button", { className: "bs-btn", style: { color: BS.ink2, fontSize: 19, padding: "4px 6px" } }, "\xB7\xB7\xB7")), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", aspectRatio: "1", overflow: "hidden", cursor: "pointer", background: BS.surface2 }, onDoubleClick: handleDblTap, onClick: open }, /* @__PURE__ */ React.createElement("img", { src: post.img, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }, loading: "lazy" }), heart && /* @__PURE__ */ React.createElement("div", { key: heart.k, style: { position: "absolute", left: heart.x - 24, top: heart.y - 24, fontSize: 48, pointerEvents: "none", animation: "bsFloat 0.85s ease-out forwards" } }, "\u2764\uFE0F")), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px 6px", display: "flex", alignItems: "center", gap: 15 } }, /* @__PURE__ */ React.createElement("button", { onClick: handleLike, className: "bs-btn" }, /* @__PURE__ */ React.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: post.liked ? BS.like : "none", stroke: post.liked ? BS.like : BS.ink2, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { animation: animLike ? "bsLike 0.4s ease" : "none" } }, /* @__PURE__ */ React.createElement("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" }))), /* @__PURE__ */ React.createElement("button", { className: "bs-btn", onClick: open, style: { color: BS.ink2 }, title: t(["Comentarios", "Comments"]) }, /* @__PURE__ */ React.createElement("svg", { width: "23", height: "23", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }))), /* @__PURE__ */ React.createElement("button", { className: "bs-btn", style: { color: BS.ink2 } }, /* @__PURE__ */ React.createElement("svg", { width: "23", height: "23", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" }), /* @__PURE__ */ React.createElement("polyline", { points: "16 6 12 2 8 6" }), /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "2", x2: "12", y2: "15" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement("button", { onClick: () => onSave(post.id), className: "bs-btn" }, /* @__PURE__ */ React.createElement("svg", { width: "23", height: "23", viewBox: "0 0 24 24", fill: post.saved ? BS.brand : "none", stroke: post.saved ? BS.brand : BS.ink2, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" })))), /* @__PURE__ */ React.createElement("div", { style: { padding: "2px 14px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink, marginBottom: 5 } }, fmt(post.likes), " ", t(["me gusta", "likes"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: BS.ink, lineHeight: 1.55 } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, post.username), " ", post.caption, " ", (post.tags || []).map((tag, i) => /* @__PURE__ */ React.createElement("span", { key: tag, style: { color: BS.brand, fontWeight: 600, cursor: "pointer" } }, i > 0 ? " " : "", " #", tag))), /* @__PURE__ */ React.createElement("div", { onClick: open, style: { fontSize: 12.5, color: BS.soft, marginTop: 6, cursor: "pointer", fontWeight: 600 } }, t(["Ver comentarios y detalles", "View comments and details"]))));
}
function PostDetail({ post, onClose }) {
  const BS = useBS();
  const t = useT();
  const { lang } = useLang();
  const A = typeof window !== "undefined" && window.BSAUTH || {};
  const [data, setData] = useState(null);
  const [liked, setLiked] = useState(!!post.liked);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let go = true;
    (async () => {
      try {
        const d = A.postDetail ? await A.postDetail(post.id) : null;
        if (go && d && d.ok) {
          setData(d.post);
          setComments(d.comments || []);
          setLiked(!!d.liked);
          setLikeCount(d.like_count || 0);
        }
      } catch (e) {
      } finally {
        if (go) setLoading(false);
      }
    })();
    return () => {
      go = false;
    };
  }, [post.id]);
  const doLike = async () => {
    const nl = !liked;
    setLiked(nl);
    setLikeCount((c) => Math.max(0, c + (nl ? 1 : -1)));
    try {
      const d = A.likeToggle ? await A.likeToggle(post.id) : null;
      if (d && d.ok) {
        setLiked(d.liked);
        setLikeCount(d.like_count);
      }
    } catch (e) {
    }
  };
  const send = async () => {
    const tx = text.trim();
    if (!tx || sending) return;
    setSending(true);
    try {
      const d = A.addComment ? await A.addComment(post.id, tx) : null;
      if (d && d.ok && d.comment) {
        setComments((c) => [...c, d.comment]);
        setText("");
      } else if (d && d.error) {
        alert(d.error);
      }
    } catch (e) {
    } finally {
      setSending(false);
    }
  };
  const author = data && data.author || { username: post.username, initials: post.initials, avatar_color: post.color, avatar_url: post.avatar, status: "nuevo" };
  const rel = (iso) => {
    try {
      const s = (Date.now() - new Date(iso).getTime()) / 1e3;
      if (s < 60) return t(["ahora", "now"]);
      if (s < 3600) return Math.round(s / 60) + "m";
      if (s < 86400) return Math.round(s / 3600) + "h";
      return Math.round(s / 86400) + "d";
    } catch (e) {
      return "";
    }
  };
  return /* @__PURE__ */ React.createElement("div", { onClick: (e) => {
    if (e.target === e.currentTarget) onClose();
  }, style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 3e3, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface, borderRadius: 20, overflow: "hidden", width: "100%", maxWidth: A.isWide ? 880 : 460, maxHeight: "92vh", display: "flex", flexDirection: A.isWide ? "row" : "column", boxShadow: "0 30px 90px rgba(0,0,0,0.5)" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#000", flex: A.isWide ? "1 1 55%" : "none", display: "flex", alignItems: "center", justifyContent: "center", maxHeight: A.isWide ? "92vh" : "46vh" } }, /* @__PURE__ */ React.createElement("img", { src: post.img, alt: "", style: { width: "100%", height: "100%", maxHeight: A.isWide ? "92vh" : "46vh", objectFit: "contain", display: "block" } })), /* @__PURE__ */ React.createElement("div", { style: { flex: A.isWide ? "1 1 45%" : "1", minWidth: 0, display: "flex", flexDirection: "column", maxHeight: A.isWide ? "92vh" : "46vh" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRadius: "50%", background: author.avatar_color || BS.brand, display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: 14, overflow: "hidden", flexShrink: 0 } }, author.avatar_url ? /* @__PURE__ */ React.createElement("img", { src: author.avatar_url, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : author.initials), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 800, color: BS.ink } }, author.username), author.status && author.status !== "nuevo" && /* @__PURE__ */ React.createElement(StatusChip, { status: author.status, lang, size: "sm" })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft } }, data && data.location || post.location || post.city || "", " ", data ? "\xB7 " + rel(data.created_at) : "")), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { background: BS.surface2, border: "none", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", color: BS.ink2, fontSize: 15 } }, "\u2715")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "14px 16px" }, className: "bs-scr" }, data && data.caption || post.caption ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: BS.ink, lineHeight: 1.55, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("b", null, author.username), " ", data && data.caption || post.caption) : null, loading && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: BS.soft } }, t(["Cargando comentarios\u2026", "Loading comments\u2026"])), !loading && comments.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: BS.soft } }, t(["S\xE9 el primero en comentar.", "Be the first to comment."])), comments.map((c) => /* @__PURE__ */ React.createElement("div", { key: c.id, style: { display: "flex", gap: 10, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 30, height: 30, borderRadius: "50%", background: c.color || BS.brand, display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: 11, overflow: "hidden", flexShrink: 0 } }, c.avatar_url ? /* @__PURE__ */ React.createElement("img", { src: c.avatar_url, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : c.initials), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: BS.ink, lineHeight: 1.45 } }, /* @__PURE__ */ React.createElement("b", null, c.username), " ", c.text), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: BS.soft, marginTop: 2 } }, rel(c.created_at)))))), /* @__PURE__ */ React.createElement("div", { style: { borderTop: `1px solid ${BS.border}`, padding: "10px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: doLike, className: "bs-btn", style: { display: "flex", alignItems: "center", gap: 6, color: liked ? BS.like : BS.ink2, fontWeight: 700, fontSize: 13 } }, /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: liked ? BS.like : "none", stroke: liked ? BS.like : BS.ink2, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" })), likeCount), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: BS.soft } }, comments.length, " ", t(["comentarios", "comments"]))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: text,
      onChange: (e) => setText(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") send();
      },
      placeholder: A.me ? t(["Escribe un comentario\u2026", "Write a comment\u2026"]) : t(["Inicia sesi\xF3n para comentar", "Sign in to comment"]),
      disabled: !A.me,
      style: { flex: 1, border: `1px solid ${BS.border}`, borderRadius: 999, background: BS.bg, padding: "10px 14px", fontSize: 13.5, color: BS.ink, fontFamily: "inherit", outline: "none" }
    }
  ), /* @__PURE__ */ React.createElement("button", { onClick: send, disabled: !text.trim() || sending || !A.me, style: { width: 38, height: 38, borderRadius: "50%", border: "none", background: BS.brand, color: "#fff", cursor: text.trim() && A.me ? "pointer" : "default", opacity: text.trim() && A.me ? 1 : 0.5, display: "grid", placeItems: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M22 2L11 13" }), /* @__PURE__ */ React.createElement("path", { d: "M22 2l-7 20-4-9-9-4 20-7z" }))))))));
}
function StoryComposeForm({ onDone, onCancel }) {
  const BS = useBS();
  const t = useT();
  const A = typeof window !== "undefined" && window.BSAUTH || {};
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoPrev, setPhotoPrev] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const fld = { width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BS.borderStrong}`, background: BS.surface2, fontSize: 14.5, color: BS.ink, fontFamily: "inherit", outline: "none", marginBottom: 10 };
  const onPick = async (f) => { try { setPhotoPrev(URL.createObjectURL(f)); } catch (e) {} try { const u = await bsUpload(f, "stories"); if (u) setPhotoUrl(u); } catch (e) { setErr(t(["No se pudo subir la foto", "Couldn't upload the photo"])); } };
  const save = async () => {
    if (!text.trim() && !photoUrl) { setErr(t(["Escribe tu historia", "Write your story"])); return; }
    setBusy(true); setErr("");
    try { const d = await A.createPost({ kind: "story", title: title.trim(), caption: text.trim(), media_url: photoUrl }); if (d && d.ok) { onDone && onDone(); } else { setErr(d && d.error || t(["No se pudo publicar", "Couldn't post"])); setBusy(false); } }
    catch (e) { setErr(t(["Error de red, intenta de nuevo", "Network error, try again"])); setBusy(false); }
  };
  return /* @__PURE__ */ React.createElement("div", { style: { padding: 16 } },
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18, fontWeight: 800, color: BS.ink, marginBottom: 4 } }, t(["Comparte tu historia", "Share your story"])),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.soft, marginBottom: 14, lineHeight: 1.5 } }, t(["C\xF3mo tu mascota cambi\xF3 tu vida o te acompa\xF1\xF3 en un momento importante.", "How your pet changed your life or was there for you in an important moment."])),
    /* @__PURE__ */ React.createElement("div", { onClick: () => { const i = document.getElementById("bs-storyfile"); if (i) i.click(); }, style: { width: "100%", height: 160, borderRadius: 16, background: photoPrev ? `url(${photoPrev}) center/cover` : BS.surface2, border: `1.5px dashed ${BS.borderStrong}`, marginBottom: 12, cursor: "pointer", display: "grid", placeItems: "center", color: BS.soft, fontSize: 13, fontWeight: 600 } }, photoPrev ? null : t(["Toca para agregar una foto (opcional)", "Tap to add a photo (optional)"])),
    /* @__PURE__ */ React.createElement("input", { id: "bs-storyfile", type: "file", accept: "image/*", style: { display: "none" }, onChange: (e) => { const f = e.target.files && e.target.files[0]; if (f) onPick(f); } }),
    /* @__PURE__ */ React.createElement("input", { value: title, onChange: (e) => setTitle(e.target.value), placeholder: t(["T\xEDtulo de tu historia", "Your story's title"]), style: fld }),
    /* @__PURE__ */ React.createElement("textarea", { value: text, onChange: (e) => setText(e.target.value), rows: 7, placeholder: t(["Cu\xE9ntanos tu historia…", "Tell us your story…"]), style: { ...fld, resize: "vertical", lineHeight: 1.6 } }),
    err ? /* @__PURE__ */ React.createElement("div", { style: { color: BS.like, fontSize: 13, fontWeight: 600, marginBottom: 10 } }, err) : null,
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } },
      /* @__PURE__ */ React.createElement("button", { onClick: save, disabled: busy, className: "bs-btn", style: { flex: 1, padding: "14px", borderRadius: 12, border: "none", background: BS.grad, color: "#fff", fontWeight: 800, fontSize: 14.5, cursor: busy ? "default" : "pointer", fontFamily: "inherit", opacity: busy ? 0.7 : 1 } }, busy ? t(["Publicando…", "Posting…"]) : t(["Publicar historia", "Post story"])),
      /* @__PURE__ */ React.createElement("button", { onClick: onCancel, className: "bs-btn", style: { padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${BS.borderStrong}`, background: BS.surface2, color: BS.ink, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" } }, t(["Cancelar", "Cancel"]))));
}
function StoriesScreen({ setScreen }) {
  const BS = useBS();
  const t = useT();
  const [composing, setComposing] = useState(false);
  const stories = (typeof BSDATA !== "undefined" && BSDATA.storiesLife) || [];
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } },
    /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 16px 14px", background: BS.surface, borderBottom: `1px solid ${BS.border}`, position: "sticky", top: 0, zIndex: 10 } },
      /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, color: BS.ink, letterSpacing: "-0.02em" } }, t(["Historias que unen", "Stories that bond us"])),
      /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Instrument Serif,Georgia,serif", fontStyle: "italic", fontSize: 15, color: BS.brand, marginTop: 1 } }, t(["C\xF3mo nuestras mascotas nos cambian la vida", "How our pets change our lives"])),
      !composing ? /* @__PURE__ */ React.createElement("button", { onClick: () => setComposing(true), className: "bs-btn", style: { marginTop: 12, width: "100%", padding: "12px", borderRadius: 12, border: "none", background: BS.grad, color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "inherit", boxShadow: BS.glow } }, t(["Compartir mi historia", "Share my story"])) : null),
    composing ? /* @__PURE__ */ React.createElement(StoryComposeForm, { onDone: () => setComposing(false), onCancel: () => setComposing(false) }) : /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 24px" } },
      stories.length ? stories.map((s) => /* @__PURE__ */ React.createElement("article", { key: s.id, className: "bs-pop", style: { background: BS.surface, borderRadius: 18, overflow: "hidden", border: `1px solid ${BS.border}`, marginBottom: 14 } },
        s.img ? /* @__PURE__ */ React.createElement("img", { src: s.img, alt: "", style: { width: "100%", height: 200, objectFit: "cover", display: "block" } }) : null,
        /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 18px" } },
          /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 9, marginBottom: 9 } },
            /* @__PURE__ */ React.createElement(BSAvatar, { user: { username: s.username, initials: s.initials, color: s.color, avatar: s.avatar_url }, size: 34 }),
            /* @__PURE__ */ React.createElement("div", null,
              /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: BS.ink } }, s.name || s.username),
              s.city ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.soft } }, s.city) : null)),
          s.title ? /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 19, fontWeight: 800, color: BS.ink, letterSpacing: "-0.01em", lineHeight: 1.2, margin: "2px 0 8px" } }, s.title) : null,
          /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: BS.ink, lineHeight: 1.65, whiteSpace: "pre-wrap" } }, s.caption || ""),
          s.pet_name ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: BS.soft, marginTop: 10, fontStyle: "italic" } }, t(["Sobre ", "About "]) + s.pet_name) : null))) : /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "40px 24px", color: BS.soft } },
        /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Instrument Serif,Georgia,serif", fontStyle: "italic", fontSize: 20, color: BS.ink2, lineHeight: 1.4, marginBottom: 10 } }, t(["A\xFAn no hay historias.", "No stories yet."])),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, lineHeight: 1.6, maxWidth: "32ch", margin: "0 auto" } }, t(["S\xE9 el primero en contar c\xF3mo tu mascota te cambi\xF3 la vida o te acompa\xF1\xF3 en un momento importante.", "Be the first to share how your pet changed your life or was there in an important moment."])))));
}
function SpotlightOne(species, sp, BS, t) {
  const pet = sp.pet || {}, owner = sp.owner || {};
  if (!pet.photo_url) return null;
  const cat = species === "gato" ? t(["Gatos", "Cats"]) : species === "otro" ? t(["Otros", "Others"]) : t(["Perros", "Dogs"]);
  const label = t(["Modelo del d\xEDa", "Model of the day"]) + " \xB7 " + cat;
  const meta = [pet.breed, pet.age].filter(Boolean).join(" \xB7 ");
  return /* @__PURE__ */ React.createElement("div", { key: species, style: { padding: "12px 14px 2px", background: BS.bg } },
    /* @__PURE__ */ React.createElement("div", { style: { position: "relative", borderRadius: 20, overflow: "hidden", border: `1px solid ${BS.border}`, boxShadow: BS.glow } },
      /* @__PURE__ */ React.createElement("img", { src: pet.photo_url, alt: pet.name || "", style: { width: "100%", height: 224, objectFit: "cover", display: "block" } }),
      /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,18,12,0.86) 0%, rgba(26,18,12,0.12) 55%, rgba(26,18,12,0) 100%)" } }),
      /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 12, left: 12, display: "inline-flex", alignItems: "center", gap: 6, background: BS.grad, color: "#fff", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", padding: "5px 11px", borderRadius: 999 } },
        /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "#fff" }, /* @__PURE__ */ React.createElement("path", { d: "M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 21.2l1.4-6.8L2.2 9.7l6.9-.7z" })),
        label),
      /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 14, right: 14, bottom: 12, color: "#fff" } },
        /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Instrument Serif,Georgia,serif", fontStyle: "italic", fontSize: 14, opacity: 0.92, lineHeight: 1 } }, t(["Hoy brilla", "Today's star"])),
        /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.05, marginTop: 2 } }, pet.name || t(["Sin nombre", "Unnamed"])),
        meta ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, opacity: 0.9, marginTop: 3, fontWeight: 600 } }, meta) : null,
        owner.name ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, opacity: 0.78, marginTop: 4 } }, t(["con ", "with "]) + owner.name + (owner.city ? " \xB7 " + owner.city : "")) : null)));
}
function SpotlightCard({ only }) {
  const BS = useBS();
  const t = useT();
  const sps = (typeof BSDATA !== "undefined" && BSDATA.spotlights) || null;
  const list = [];
  if (sps && (sps.perro || sps.gato || sps.otro)) {
    if (sps.perro && (!only || only === "perro")) list.push(["perro", sps.perro]);
    if (sps.gato && (!only || only === "gato")) list.push(["gato", sps.gato]);
    if (sps.otro && (!only || only === "otro")) list.push(["otro", sps.otro]);
  } else if (typeof BSDATA !== "undefined" && BSDATA.spotlight) {
    const s = BSDATA.spotlight; const sp = s.pet && s.pet.species || "perro"; if (!only || only === sp) list.push([sp, s]);
  }
  if (!list.length) return null;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, list.map(function (pair) { return SpotlightOne(pair[0], pair[1], BS, t); }));
}
function FeedScreen({ posts, toggleLike, toggleSave, setScreen, onOpenPost }) {
  const BS = useBS();
  const t = useT();
  const [filt, setFilt] = useState("parati");
  const FBNAV = [
    { id: "feed", label: t(["Inicio", "Home"]), p: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
    { id: "community", label: t(["Comunidad", "Community"]), p: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>' },
    { id: "historias", label: t(["Historias", "Stories"]), p: '<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>' },
    { id: "events", label: t(["Eventos", "Events"]), p: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>' },
    { id: "pack", label: t(["Mi Pack", "My Pack"]), p: '<circle cx="7" cy="9" r="1.7"/><circle cx="12" cy="7.4" r="1.7"/><circle cx="17" cy="9" r="1.7"/><path d="M12 12c-2.4 0-4.3 1.9-4.3 3.9 0 1.5 1.2 2.4 2.6 2.4 .8 0 1.1-.4 1.7-.4s.9 .4 1.7 .4c1.4 0 2.6-.9 2.6-2.4 0-2-1.9-3.9-4.3-3.9z"/>' },
    { id: "account", label: t(["Cuenta", "Account"]), p: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M8 4v4"/>' },
    { id: "profile", label: t(["Perfil", "Profile"]), p: '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>' }
  ];
  const FEED_FILTERS = [
    { id: "parati", label: t(["Para ti", "For you"]) },
    { id: "perro", label: t(["Perros", "Dogs"]) },
    { id: "gato", label: t(["Gatos", "Cats"]) },
    { id: "otro", label: t(["Otros", "Others"]) },
    { id: "pack", label: t(["Mi Pack", "My Pack"]) }
  ];
  return /* @__PURE__ */ React.createElement("div", { style: { background: BS.bg } }, /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface, padding: "10px 14px 0", position: "sticky", top: 0, zIndex: 11, borderBottom: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 21, fontWeight: 800, letterSpacing: "-0.04em", background: BS.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", flexShrink: 0 } }, "B Social"), /* @__PURE__ */ React.createElement("button", { className: "bs-btn", onClick: () => setScreen("discover"), style: { flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 8, background: BS.surface2, border: `1px solid ${BS.border}`, borderRadius: 999, padding: "9px 14px", cursor: "pointer", textAlign: "left" } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: BS.soft, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "8" }), /* @__PURE__ */ React.createElement("path", { d: "m21 21-4.35-4.35" })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: BS.soft, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, t(["Buscar en B Social", "Search B Social"]))), /* @__PURE__ */ React.createElement("button", { className: "bs-btn", onClick: () => setScreen("messages"), style: { flexShrink: 0, color: BS.ink2, position: "relative", width: 38, height: 38, borderRadius: "50%", background: BS.surface2, border: `1px solid ${BS.border}`, display: "grid", placeItems: "center", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: -1, right: -1, width: 9, height: 9, borderRadius: "50%", background: BS.rose, border: `2px solid ${BS.surface}` } }))), /* @__PURE__ */ React.createElement("div", { className: "bs-hscr", style: { display: "flex", gap: 2, marginTop: 6 } }, FBNAV.map((n) => {
    const on = n.id === "feed";
    return /* @__PURE__ */ React.createElement("button", { key: n.id, onClick: () => setScreen(n.id), className: "bs-btn", style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "7px 2px 7px", background: "transparent", border: "none", borderBottom: `2.5px solid ${on ? BS.brand : "transparent"}`, cursor: "pointer", fontFamily: "inherit" } }, /* @__PURE__ */ React.createElement("svg", { width: "21", height: "21", viewBox: "0 0 24 24", fill: "none", stroke: on ? BS.brand : BS.soft, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", dangerouslySetInnerHTML: { __html: n.p } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9.5, fontWeight: on ? 700 : 600, color: on ? BS.brand : BS.soft, whiteSpace: "nowrap" } }, n.label));
  }))), /* @__PURE__ */ React.createElement("div", { className: "bs-hscr", style: { background: BS.surface, padding: "8px 14px 10px", display: "flex", gap: 7, borderBottom: `1px solid ${BS.border}` } }, FEED_FILTERS.map((f) => {
    const on = filt === f.id;
    return /* @__PURE__ */ React.createElement("button", { key: f.id, onClick: () => setFilt(f.id), className: "bs-btn", style: { padding: "7px 16px", borderRadius: 999, border: `1.5px solid ${on ? BS.brand : BS.border}`, background: "transparent", color: on ? BS.brand : BS.ink2, fontSize: 12.5, fontWeight: on ? 700 : 600, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" } }, f.label);
  })), /* @__PURE__ */ React.createElement(StoriesBar, null), /* @__PURE__ */ React.createElement(SpotlightCard, { only: (filt === "perro" || filt === "gato" || filt === "otro") ? filt : null }), (() => {
    const shown = filt === "parati" ? posts : posts.filter((p) => {
      if (filt === "pack") return !!(p.pack || p.following || p.is_pack);
      if (filt === "perro" || filt === "gato" || filt === "otro") return (p.pet_species || "") === filt;
      return true;
    });
    if (!shown.length) return /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: BS.soft, padding: "48px 26px", fontSize: 14, lineHeight: 1.55 } }, filt === "pack" ? t(["A\xFAn no sigues a nadie. Cuando armes tu Pack, sus publicaciones aparecer\xE1n aqu\xED.", "You are not following anyone yet. When you build your Pack, their posts will show up here."]) : (filt === "perro" || filt === "gato" || filt === "otro") ? t(["A\xFAn no hay publicaciones en esta categor\xEDa. \xA1S\xE9 el primero!", "No posts in this category yet \u2014 be the first!"]) : t(["A\xFAn no hay publicaciones. \xA1S\xE9 el primero en publicar!", "No posts yet \u2014 be the first to post!"]));
    return shown.map((p) => /* @__PURE__ */ React.createElement(PostCard, { key: p.id, post: p, onLike: toggleLike, onSave: toggleSave, onOpen: onOpenPost }));
  })(), /* @__PURE__ */ React.createElement("div", { style: { height: 20 } }));
}
function BSAchievements({ badges, following, petName }) {
  const BS = useBS();
  const t = useT();
  const has = (k) => (badges || []).indexOf(k) >= 0;
  const items = [
    { earned: has("comprador") || !!petName, t: t(["Nuevo padre" + (petName ? " de " + petName : ""), "New parent" + (petName ? " of " + petName : "")]) },
    { earned: (following || 0) >= 1, t: t(["Tu primer amigo", "Your first friend"]) },
    { earned: has("comparte") || has("creador"), t: t(["Primera foto", "First photo"]) },
    { earned: has("groomer"), t: t(["Primer grooming", "First grooming"]) },
    { earned: has("creador"), t: t(["Creador (3 fotos)", "Creator (3 photos)"]) },
    { earned: has("doble"), t: t(["Familia grande", "Big family"]) }
  ];
  const done = items.filter((x) => x.earned).length;
  return /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface2, border: `1px solid ${BS.border}`, borderRadius: 14, padding: "12px 14px", marginBottom: 14 } },
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 9 } },
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 800, color: BS.ink } }, t(["Tu camino en la comunidad", "Your community journey"])),
      /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: BS.brand } }, done + "/" + items.length)
    ),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 7 } },
      items.map((x, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 600, padding: "5px 10px", borderRadius: 999, background: x.earned ? "rgba(30,184,122,0.12)" : BS.surface, color: x.earned ? "#1EB87A" : BS.soft, border: `1px solid ${x.earned ? "rgba(30,184,122,0.3)" : BS.border}` } },
        /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, x.earned ? /* @__PURE__ */ React.createElement("path", { d: "M20 6L9 17l-5-5" }) : /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "9" })),
        x.t
      ))
    )
  );
}
function bsSpeciesLabel(s, t) { s = (s || "").toLowerCase(); return s === "gato" ? t(["Gato", "Cat"]) : (s === "otro" || s === "otra") ? t(["Otra mascota", "Other pet"]) : t(["Perro", "Dog"]); }
function PetProfileForm({ pet, onDone, onCancel }) {
  const BS = useBS();
  const t = useT();
  const A = typeof window !== "undefined" && window.BSAUTH || {};
  const p = pet || {};
  const [species, setSpecies] = useState(p.species || "perro");
  const [name, setName] = useState(p.name || "");
  const [breed, setBreed] = useState(p.breed || "");
  const [color, setColor] = useState(p.color || "");
  const [birthdate, setBirthdate] = useState(p.birthdate || "");
  const [gotcha, setGotcha] = useState(p.gotcha_date || "");
  const [bio, setBio] = useState(p.bio || "");
  const [memorial, setMemorial] = useState(!!p.is_memorial);
  const [photoUrl, setPhotoUrl] = useState(p.photo_url || "");
  const [photoPrev, setPhotoPrev] = useState(p.photo_url || "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const fld = { width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BS.borderStrong}`, background: BS.surface2, fontSize: 14.5, color: BS.ink, fontFamily: "inherit", outline: "none", marginBottom: 10 };
  const lbl = { fontSize: 11.5, fontWeight: 700, color: BS.ink2, margin: "2px 0 5px" };
  const onPick = async (f) => { try { setPhotoPrev(URL.createObjectURL(f)); } catch (e) {} try { const url = await bsUpload(f, "pets"); if (url) setPhotoUrl(url); } catch (e) { setErr(t(["No se pudo subir la foto", "Couldn't upload the photo"])); } };
  const save = async () => {
    if (!name.trim()) { setErr(t(["Ponle un nombre a tu mascota", "Give your pet a name"])); return; }
    setBusy(true); setErr("");
    try {
      const d = await A.savePet({ id: p.id, name: name.trim(), species, breed: breed.trim(), color: color.trim(), birthdate: birthdate || null, gotcha_date: gotcha || null, bio: bio.trim(), is_memorial: memorial, photo_url: photoUrl });
      if (d && d.ok) { onDone && onDone(); } else { setErr(d && d.error || t(["No se pudo guardar", "Couldn't save"])); setBusy(false); }
    } catch (e) { setErr(t(["Error de red, intenta de nuevo", "Network error, try again"])); setBusy(false); }
  };
  const del = async () => {
    if (!p.id) { onCancel && onCancel(); return; }
    if (!window.confirm(t(["\xBFEliminar esta mascota?", "Delete this pet?"]))) return;
    setBusy(true); try { await A.deletePet(p.id); onDone && onDone(); } catch (e) { setBusy(false); }
  };
  const SPECIES = [["perro", t(["Perro", "Dog"])], ["gato", t(["Gato", "Cat"])], ["otro", t(["Otra", "Other"])]];
  return /* @__PURE__ */ React.createElement("div", { style: { padding: 16 } },
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18, fontWeight: 800, color: BS.ink, marginBottom: 12 } }, p.id ? t(["Editar mascota", "Edit pet"]) : t(["Nueva mascota", "New pet"])),
    /* @__PURE__ */ React.createElement("div", { onClick: () => { const inp = document.getElementById("bs-petfile"); if (inp) inp.click(); }, style: { width: "100%", height: 170, borderRadius: 16, background: photoPrev ? `url(${photoPrev}) center/cover` : BS.surface2, border: `1.5px dashed ${BS.borderStrong}`, marginBottom: 12, cursor: "pointer", display: "grid", placeItems: "center", color: BS.soft, fontSize: 13, fontWeight: 600 } }, photoPrev ? null : t(["Toca para agregar una foto", "Tap to add a photo"])),
    /* @__PURE__ */ React.createElement("input", { id: "bs-petfile", type: "file", accept: "image/*", style: { display: "none" }, onChange: (e) => { const f = e.target.files && e.target.files[0]; if (f) onPick(f); } }),
    /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Tipo", "Type"])),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12 } }, SPECIES.map(([v, l]) => /* @__PURE__ */ React.createElement("button", { key: v, onClick: () => setSpecies(v), className: "bs-btn", style: { flex: 1, padding: "10px", borderRadius: 999, border: `1.5px solid ${species === v ? BS.brand : BS.border}`, background: species === v ? "rgba(168,95,45,0.08)" : BS.surface, color: species === v ? BS.brand : BS.ink2, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" } }, l))),
    /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Nombre", "Name"])),
    /* @__PURE__ */ React.createElement("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: t(["Nombre de tu mascota", "Your pet's name"]), style: fld }),
    /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Raza / tipo", "Breed / type"])),
    /* @__PURE__ */ React.createElement("input", { value: breed, onChange: (e) => setBreed(e.target.value), placeholder: t(["Ej. Yorkie, mestizo…", "e.g. Yorkie, mixed…"]), style: fld }),
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } },
      /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Color", "Color"])), /* @__PURE__ */ React.createElement("input", { value: color, onChange: (e) => setColor(e.target.value), style: fld })),
      /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Cumplea\xF1os", "Birthday"])), /* @__PURE__ */ React.createElement("input", { type: "date", value: birthdate || "", onChange: (e) => setBirthdate(e.target.value), style: fld }))),
    /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["D\xEDa que lleg\xF3 a casa", "Day it came home"])),
    /* @__PURE__ */ React.createElement("input", { type: "date", value: gotcha || "", onChange: (e) => setGotcha(e.target.value), style: fld }),
    /* @__PURE__ */ React.createElement("div", { style: lbl }, t(["Sobre tu mascota", "About your pet"])),
    /* @__PURE__ */ React.createElement("textarea", { value: bio, onChange: (e) => setBio(e.target.value), rows: 3, placeholder: t(["Su personalidad, lo que ama…", "Their personality, what they love…"]), style: { ...fld, resize: "vertical", lineHeight: 1.5 } }),
    /* @__PURE__ */ React.createElement("div", { style: { height: 4 } }),
    err ? /* @__PURE__ */ React.createElement("div", { style: { color: BS.like, fontSize: 13, fontWeight: 600, marginBottom: 10 } }, err) : null,
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } },
      /* @__PURE__ */ React.createElement("button", { onClick: save, disabled: busy, className: "bs-btn", style: { flex: 1, padding: "14px", borderRadius: 12, border: "none", background: BS.grad, color: "#fff", fontWeight: 800, fontSize: 14.5, cursor: busy ? "default" : "pointer", fontFamily: "inherit", opacity: busy ? 0.7 : 1 } }, busy ? t(["Guardando…", "Saving…"]) : t(["Guardar", "Save"])),
      /* @__PURE__ */ React.createElement("button", { onClick: onCancel, className: "bs-btn", style: { padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${BS.borderStrong}`, background: BS.surface2, color: BS.ink, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" } }, t(["Cancelar", "Cancel"]))),
    p.id ? /* @__PURE__ */ React.createElement("button", { onClick: del, className: "bs-btn", style: { width: "100%", marginTop: 10, padding: "11px", borderRadius: 12, border: "none", background: "none", color: BS.like, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" } }, t(["Eliminar mascota", "Delete pet"])) : null);
}
function MemorialForm({ pet, onDone, onCancel }) {
  const BS = useBS();
  const t = useT();
  const A = typeof window !== "undefined" && window.BSAUTH || {};
  const [words, setWords] = useState("");
  const [announce, setAnnounce] = useState(true);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const fld = { width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BS.borderStrong}`, background: BS.surface2, fontSize: 14.5, color: BS.ink, fontFamily: "inherit", outline: "none", lineHeight: 1.6, resize: "vertical" };
  const save = async () => {
    setBusy(true); setErr("");
    const today = new Date().toISOString().slice(0, 10);
    try {
      const d = await A.savePet({ id: pet.id, name: pet.name, species: pet.species, breed: pet.breed, color: pet.color, bio: pet.bio, birthdate: pet.birthdate, gotcha_date: pet.gotcha_date, photo_url: pet.photo_url, litter_id: pet.litter_id, is_memorial: true, memorial_date: today });
      if (!(d && d.ok)) { setErr(d && d.error || t(["No se pudo guardar", "Couldn't save"])); setBusy(false); return; }
      if (announce) {
        const nm = pet.name || t(["nuestra mascota", "our pet"]);
        const cap = t(["En memoria de ", "In memory of "]) + nm + (words.trim() ? ("\n\n" + words.trim()) : ".");
        try { await A.createPost({ kind: "memorial", title: t(["En memoria de ", "In memory of "]) + (pet.name || ""), caption: cap, media_url: pet.photo_url || "", pet_name: pet.name || "", pet_species: pet.species || "" }); } catch (e) {}
      }
      onDone && onDone();
    } catch (e) { setErr(t(["Error de red, intenta de nuevo", "Network error, try again"])); setBusy(false); }
  };
  return /* @__PURE__ */ React.createElement("div", { style: { padding: 16 } },
    pet.photo_url ? /* @__PURE__ */ React.createElement("img", { src: pet.photo_url, alt: "", style: { width: "100%", height: 170, objectFit: "cover", borderRadius: 16, display: "block", filter: "grayscale(0.5)", marginBottom: 14 } }) : null,
    /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: BS.ink, letterSpacing: "-0.01em" } }, t(["En memoria de ", "In memory of "]) + (pet.name || "")),
    /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.soft, margin: "6px 0 16px", lineHeight: 1.55 } }, t(["Su perfil se conservar\xE1 como un recuerdo y su foto quedar\xE1 en tono gris. Puedes despedirte con unas palabras.", "Their profile will be kept as a keepsake and their photo will turn grayscale. You can say goodbye with a few words."])),
    /* @__PURE__ */ React.createElement("textarea", { value: words, onChange: (e) => setWords(e.target.value), rows: 5, placeholder: t(["Unas palabras de despedida…", "A few words of goodbye…"]), style: fld }),
    /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 9, margin: "14px 0", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: announce, onChange: (e) => setAnnounce(e.target.checked), style: { width: 18, height: 18, accentColor: BS.brand, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: BS.ink2, lineHeight: 1.45 } }, t(["Publicar un homenaje en el feed para que la comunidad lo acompa\xF1e", "Post a tribute in the feed so the community can be with you"]))),
    err ? /* @__PURE__ */ React.createElement("div", { style: { color: BS.like, fontSize: 13, fontWeight: 600, marginBottom: 10 } }, err) : null,
    /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } },
      /* @__PURE__ */ React.createElement("button", { onClick: save, disabled: busy, className: "bs-btn", style: { flex: 1, padding: "14px", borderRadius: 12, border: "none", background: BS.grad, color: "#fff", fontWeight: 800, fontSize: 14.5, cursor: busy ? "default" : "pointer", fontFamily: "inherit", opacity: busy ? 0.7 : 1 } }, busy ? t(["Guardando…", "Saving…"]) : t(["Guardar homenaje", "Save tribute"])),
      /* @__PURE__ */ React.createElement("button", { onClick: onCancel, className: "bs-btn", style: { padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${BS.borderStrong}`, background: BS.surface2, color: BS.ink, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" } }, t(["Cancelar", "Cancel"]))));
}
function MyPetsTab() {
  const BS = useBS();
  const t = useT();
  const pets = (typeof BSDATA !== "undefined" && BSDATA.myPets) || [];
  const [editing, setEditing] = useState(null);
  const [memorializing, setMemorializing] = useState(null);
  if (memorializing) return /* @__PURE__ */ React.createElement(MemorialForm, { pet: memorializing, onDone: () => setMemorializing(null), onCancel: () => setMemorializing(null) });
  if (editing) return /* @__PURE__ */ React.createElement(PetProfileForm, { pet: editing === "new" ? {} : editing, onDone: () => setEditing(null), onCancel: () => setEditing(null) });
  return /* @__PURE__ */ React.createElement("div", { style: { padding: 16 } },
    /* @__PURE__ */ React.createElement("button", { onClick: () => setEditing("new"), className: "bs-btn", style: { width: "100%", padding: "13px", borderRadius: 14, border: `1.5px dashed ${BS.borderStrong}`, background: BS.surface2, color: BS.brand, fontWeight: 800, fontSize: 14, cursor: "pointer", fontFamily: "inherit", marginBottom: pets.length ? 14 : 0 } }, t(["+ Agregar mascota", "+ Add a pet"])),
    pets.length ? pets.map((pet) => /* @__PURE__ */ React.createElement("div", { key: pet.id, className: "bs-pop", style: { background: BS.surface, borderRadius: 18, overflow: "hidden", border: `1px solid ${BS.border}`, marginBottom: 12, position: "relative" } },
      pet.photo_url ? /* @__PURE__ */ React.createElement("img", { src: pet.photo_url, alt: "", style: { width: "100%", height: 180, objectFit: "cover", display: "block", filter: pet.is_memorial ? "grayscale(0.45)" : "none" } }) : /* @__PURE__ */ React.createElement("div", { style: { height: 110, background: BS.surface2, display: "grid", placeItems: "center", color: BS.soft, fontSize: 13 } }, t(["Sin foto", "No photo"])),
      pet.is_memorial ? /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 10, left: 10, background: "rgba(26,18,12,0.72)", color: "#fff", fontSize: 10.5, fontWeight: 700, padding: "4px 11px", borderRadius: 999, letterSpacing: "0.04em" } }, t(["En memoria", "In memory"])) : null,
      /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px" } },
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" } },
          /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: BS.ink } }, pet.name || t(["Sin nombre", "Unnamed"])),
          /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, fontWeight: 700, color: BS.brand, background: "rgba(168,95,45,0.10)", border: `1px solid ${BS.border}`, padding: "2px 9px", borderRadius: 999 } }, bsSpeciesLabel(pet.species, t))),
        /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: BS.ink2 } }, [pet.breed, pet.age].filter(Boolean).join(" \xB7 ")),
        pet.gotcha_date ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: BS.soft, marginTop: 3 } }, t(["En casa desde ", "Home since "]) + pet.gotcha_date) : null,
        pet.bio ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.ink2, marginTop: 6, lineHeight: 1.5 } }, pet.bio) : null,
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap", alignItems: "center" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setEditing(pet), className: "bs-btn", style: { padding: "7px 14px", borderRadius: 9, border: `1.5px solid ${BS.borderStrong}`, background: BS.surface2, color: BS.ink, fontWeight: 700, fontSize: 12.5, cursor: "pointer", fontFamily: "inherit" } }, t(["Editar", "Edit"])), !pet.is_memorial ? /* @__PURE__ */ React.createElement("button", { onClick: () => setMemorializing(pet), className: "bs-btn", style: { padding: "7px 12px", borderRadius: 9, border: "none", background: "none", color: BS.soft, fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "inherit" } }, t(["Ya no est\xE1 con nosotros", "No longer with us"])) : null)))
    ) : /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: BS.soft, padding: "26px 20px 8px", fontSize: 13.5, lineHeight: 1.55 } }, t(["A\xFAn no agregas mascotas. Crea el perfil de tu perro, gato u otra mascota.", "No pets yet. Create a profile for your dog, cat or other pet."])));
}
function ProfileScreen({ posts, setScreen }) {
  const BS = useBS();
  const t = useT();
  const { lang } = useLang();
  const A = typeof window !== "undefined" && window.BSAUTH || {};
  const r = A.me;
  const me = r && r.username ? { username: r.username, name: r.display_name || r.username, city: r.city || "", bio: r.bio || "", avatar: r.avatar_url || "", initials: (r.username || "?").slice(0, 2).toUpperCase(), color: r.avatar_color || BS.brand, verified: r.username === "brightpuppy", posts: 0, followers: 0, following: (A.following || []).length } : BSDATA.me;
  const [tab, setTab] = useState("posts");
  const [isPublic, setIsPublic] = useState(r ? !!r.is_public : false);
  const persistPublic = async (val) => {
    setIsPublic(val);
    const c = window.BSAUTH && window.BSAUTH.me || {};
    if (window.BSAUTH && window.BSAUTH.saveProfile) await window.BSAUTH.saveProfile({
      first_name: c.first_name,
      last_name: c.last_name,
      bio: c.bio,
      city: c.city,
      state: c.state,
      zip: c.zip,
      address: c.address,
      pet_name: c.pet_name,
      pet_species: c.pet_species,
      pet_breed: c.pet_breed,
      pet_color: c.pet_color,
      pet_age: c.pet_age,
      avatar_url: c.avatar_url,
      pet_photo_url: c.pet_photo_url,
      is_public: val
    });
  };
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { height: 210, background: r && r.cover_url ? `url(${r.cover_url}) center ${r && r.cover_pos != null ? r.cover_pos : 50}%/cover` : BS.grad, position: "relative" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setScreen("feed"), style: { position: "absolute", top: 44, left: 14, background: "rgba(0,0,0,0.32)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "grid", placeItems: "center", color: "#fff" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M19 12H5M12 19l-7-7 7-7" }))), /* @__PURE__ */ React.createElement("a", { href: "/", style: { position: "absolute", top: 44, right: 14, background: "rgba(0,0,0,0.32)", borderRadius: 999, padding: "6px 12px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, color: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" })), "BPuppy"), /* @__PURE__ */ React.createElement("button", { onClick: () => setScreen("editprofile"), title: t(["Cambiar portada", "Change cover"]), style: { position: "absolute", bottom: 8, right: 14, background: "rgba(0,0,0,0.32)", border: "none", borderRadius: 999, padding: "5px 10px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, color: "#fff", fontSize: 11, fontWeight: 700 } }, /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "13", r: "4" })), t(["Portada", "Cover"]))), /* @__PURE__ */ React.createElement("div", { style: { padding: "0 16px 16px", background: BS.surface, borderBottom: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: -58, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 108, height: 108, borderRadius: "50%", background: me.color, display: "grid", placeItems: "center", fontSize: 38, fontWeight: 800, color: "#fff", border: `4px solid ${BS.surface}`, fontFamily: "Plus Jakarta Sans,sans-serif", overflow: "hidden", flexShrink: 0, position: "relative", zIndex: 5, boxShadow: "0 6px 20px rgba(0,0,0,0.20)" } }, me.avatar ? /* @__PURE__ */ React.createElement("img", { src: me.avatar, alt: me.username, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }) : me.initials), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setScreen("editprofile"), style: { padding: "8px 16px", borderRadius: 10, border: "none", background: BS.grad, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", color: "#fff" } }, t(["Editar perfil", "Edit profile"])), /* @__PURE__ */ React.createElement("button", { onClick: () => A.logout && A.logout(), title: t(["Cambiar de usuario", "Switch account"]), style: { padding: "8px 14px", borderRadius: 10, border: `1.5px solid ${BS.borderStrong}`, background: BS.surface2, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", color: BS.ink } }, t(["Salir", "Log out"])))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18, fontWeight: 800, color: BS.ink } }, me.username), me.verified && /* @__PURE__ */ React.createElement(BSVerified, { size: 16 })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: BS.ink2, marginBottom: 8 } }, me.name, " \xB7 ", me.city), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 } }, /* @__PURE__ */ React.createElement(StatusChip, { status: r && r.status || "nuevo", lang }), /* @__PURE__ */ React.createElement(BadgeChips, { badges: r && r.badges || [], lang })), r && r.free_grooming > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#1EB87A", background: "rgba(30,184,122,0.1)", border: "1px solid rgba(30,184,122,0.3)", borderRadius: 999, padding: "4px 11px", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M20 12v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8" }), /* @__PURE__ */ React.createElement("rect", { x: "2", y: "7", width: "20", height: "5", rx: "1" }), /* @__PURE__ */ React.createElement("path", { d: "M12 22V7M12 7C12 7 11 2 8 2a2.5 2.5 0 000 5M12 7s1-5 4-5a2.5 2.5 0 010 5" })), r.free_grooming, " ", t(["grooming gratis en FL", "free grooming in FL"])), /* @__PURE__ */ React.createElement(BSAchievements, { badges: r && r.badges || [], following: me.following, petName: r && r.pet_name || "" }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: BS.ink, marginBottom: 14 } }, me.bio), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 24 } }, [{ n: me.posts, l: t(["posts", "posts"]) }, { n: me.followers, l: t(["seguidores", "followers"]) }, { n: me.following, l: t(["siguiendo", "following"]) }].map((s, si) => /* @__PURE__ */ React.createElement("div", { key: si }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18, fontWeight: 800, color: BS.ink } }, s.n), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.soft } }, s.l))))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px", background: BS.surface, borderBottom: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 14, border: `1.5px solid ${isPublic ? BS.brand : BS.border}`, background: isPublic ? "rgba(14,165,233,0.07)" : BS.surface2 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink } }, t(["Perfil p\xFAblico", "Public profile"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft, lineHeight: 1.45 } }, isPublic ? t(["Visible en Comunidad: tu usuario, ciudad y tu mascota (nombre y raza). Nunca tu contacto.", "Visible in Community: your username, city and pet (name and breed). Never your contact info."]) : t(["Tu perfil es privado. Act\xEDvalo para aparecer en Comunidad.", "Your profile is private. Turn it on to appear in Community."]))), /* @__PURE__ */ React.createElement("button", { onClick: () => persistPublic(!isPublic), className: "bs-btn", style: { width: 46, height: 26, borderRadius: 999, background: isPublic ? BS.grad : BS.border, position: "relative", flexShrink: 0, cursor: "pointer", border: "none" } }, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 3, left: isPublic ? 23 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" } }))), /* @__PURE__ */ React.createElement("button", { onClick: () => setScreen("account"), className: "bs-btn", style: { display: "flex", alignItems: "center", gap: 12, width: "100%", marginTop: 10, padding: "13px 14px", borderRadius: 14, border: `1.5px solid ${BS.border}`, background: BS.surface2, cursor: "pointer", fontFamily: "inherit", textAlign: "left" } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, color: BS.brand, display: "inline-flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 10h18M8 4v4" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink } }, t(["Mi Cuenta", "My Account"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft } }, t(["Mascotas, grooming, pagos y membres\xEDas \xB7 privado", "Pets, grooming, payments and memberships \xB7 private"]))), /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: BS.soft, strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" })))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", background: BS.surface, borderBottom: `1px solid ${BS.border}` } }, [["posts", t(["Posts", "Posts"])], ["pets", t(["Mascotas", "Pets"])], ["saved", t(["Guardados", "Saved"])]].map(([tb, lbl]) => /* @__PURE__ */ React.createElement("button", { key: tb, onClick: () => setTab(tb), style: { flex: 1, padding: "13px", border: "none", background: "none", cursor: "pointer", borderBottom: `2.5px solid ${tab === tb ? BS.brand : "transparent"}`, fontSize: 13, fontWeight: 700, color: tab === tb ? BS.brand : BS.soft, fontFamily: "inherit" } }, lbl))), tab === "posts" && /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 } }, posts.slice(0, 6).map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, style: { aspectRatio: "1", overflow: "hidden", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("img", { src: p.img, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })))), tab === "pets" && /* @__PURE__ */ React.createElement(MyPetsTab, null), tab === "saved" && /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 } }, posts.filter((p) => p.saved).map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, style: { aspectRatio: "1", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("img", { src: p.img, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })))));
}
function PackScreen({ setScreen }) {
  const BS = useBS();
  const t = useT();
  const [added, setAdded] = useState(/* @__PURE__ */ new Set());
  const toggle = (id) => setAdded((s) => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 10px", display: "flex", alignItems: "center", background: BS.surface, borderBottom: `1px solid ${BS.border}`, position: "sticky", top: 0, zIndex: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: BS.ink, flex: 1 } }, t(["Mi Pack", "My Pack"])), /* @__PURE__ */ React.createElement("div", { style: { background: BS.grad, color: "#fff", borderRadius: 999, padding: "2px 10px", fontSize: 12, fontWeight: 700 } }, BSDATA.pack.length)), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px", background: BS.surface, borderBottom: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface2, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 9 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: BS.soft, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "8" }), /* @__PURE__ */ React.createElement("path", { d: "m21 21-4.35-4.35" })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13.5, color: BS.soft } }, t(["Buscar en tu Pack...", "Search your Pack..."])))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 6px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: BS.soft, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" } }, t(["Sugerencias", "Suggestions"])), /* @__PURE__ */ React.createElement("div", { className: "bs-hscr", style: { display: "flex", gap: 10 } }, BSDATA.suggestions.map((u) => /* @__PURE__ */ React.createElement("div", { key: u.id, style: { flexShrink: 0, background: BS.surface, borderRadius: 18, padding: "14px 12px", width: 120, textAlign: "center", border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement(BSAvatar, { user: u, size: 44 }), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 11.5, fontWeight: 700, color: BS.ink, marginBottom: 1 } }, u.username), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: BS.soft, marginBottom: 8 } }, u.pet), /* @__PURE__ */ React.createElement("button", { onClick: () => toggle(u.id), className: "bs-btn", style: { width: "100%", padding: "6px", borderRadius: 8, border: "none", background: added.has(u.id) ? BS.surface2 : BS.grad, color: added.has(u.id) ? BS.ink2 : "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, added.has(u.id) ? t(["En Pack", "In Pack"]) : t(["+ Pack", "+ Pack"])))))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 0 0" } }, BSDATA.pack.map((u, i) => /* @__PURE__ */ React.createElement("div", { key: u.id, style: { display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", background: BS.surface, borderBottom: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(BSAvatar, { user: u, size: 44 }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 1, right: 1, width: 10, height: 10, borderRadius: "50%", background: i < 2 ? BS.online : BS.border, border: `2px solid ${BS.bg}` } })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 700, color: BS.ink } }, u.username), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft } }, u.city, " \xB7 ", u.pet)), /* @__PURE__ */ React.createElement("button", { className: "bs-btn", style: { padding: "7px 14px", borderRadius: 9, border: `1.5px solid ${BS.borderStrong}`, background: "none", fontSize: 12, fontWeight: 600, color: BS.ink2, cursor: "pointer", fontFamily: "inherit" } }, t(["Mensaje", "Message"]))))));
}
function DiscoverScreen({ setScreen }) {
  const BS = useBS();
  const t = useT();
  const SUPA = "https://oqqwmcplljirbreowrll.supabase.co";
  const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
  const CATS = [
    { id: "dog_parks", label: t(["Parques de perros", "Dog parks"]) },
    { id: "dog_cafes", label: t(["Caf\xE9s dog-friendly", "Dog-friendly caf\xE9s"]) },
    { id: "cat_cafes", label: t(["Cat caf\xE9s", "Cat caf\xE9s"]) },
    { id: "dog_restaurants", label: t(["Restaurantes dog-friendly", "Dog-friendly restaurants"]) },
    { id: "adoption", label: t(["Adopci\xF3n (refugios)", "Adoption (shelters)"]) },
    { id: "pet_stores", label: t(["Tiendas de mascotas", "Pet stores"]) },
    { id: "vets", label: t(["Veterinarias", "Vets"]) },
    { id: "grooming", label: t(["Grooming", "Grooming"]) },
    { id: "beaches", label: t(["Playas dog-friendly", "Dog beaches"]) },
    { id: "trails", label: t(["Senderos", "Trails"]) }
  ];
  const ST = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
  const [cat, setCat] = useState("dog_parks");
  const [stt, setStt] = useState("");
  const [city, setCity] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const search = async () => {
    if (!stt && !city) {
      setErr(t(["Elige un estado o ciudad", "Pick a state or city"]));
      return;
    }
    setLoading(true);
    setErr("");
    setResults(null);
    try {
      const r = await fetch(SUPA + "/functions/v1/places", { method: "POST", headers: { "Content-Type": "application/json", "apikey": ANON, "Authorization": "Bearer " + ANON }, body: JSON.stringify({ action: "search", category: cat, city: city.trim(), state: stt.trim() }) });
      const d = await r.json();
      if (d && d.ok) {
        setResults(d.results || []);
      } else {
        setErr(d && d.error || t(["No pude buscar", "Could not search"]));
        setResults([]);
      }
    } catch (e) {
      setErr(t(["Error de red, intenta de nuevo", "Network error, try again"]));
      setResults([]);
    }
    setLoading(false);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 12px", background: BS.surface, borderBottom: `1px solid ${BS.border}`, position: "sticky", top: 0, zIndex: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: BS.ink, marginBottom: 4 } }, t(["Descubrir", "Discover"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.soft, marginBottom: 10 } }, t(["Lugares dog-friendly por estado y ciudad", "Dog-friendly places by state and city"])), /* @__PURE__ */ React.createElement("button", { onClick: () => setScreen && setScreen("mapa"), className: "bs-btn", style: { width: "100%", padding: "9px", borderRadius: 10, border: `1.5px solid ${BS.border}`, background: BS.surface2, color: BS.ink, fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 10 } }, t(["Mapa comunitario (bebederos, comida, vacunaci\xF3n)", "Community map (fountains, food, vaccination)"])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("input", { list: "bs-discover-states", value: stt, onChange: (e) => setStt(e.target.value), placeholder: t(["Estado", "State"]), style: { flex: 1, minWidth: 0, padding: "9px 12px", borderRadius: 10, border: `1.5px solid ${BS.border}`, background: BS.surface2, color: BS.ink, fontSize: 13, fontFamily: "inherit" } }), /* @__PURE__ */ React.createElement("input", { value: city, onChange: (e) => setCity(e.target.value), placeholder: t(["Ciudad (opcional)", "City (optional)"]), style: { flex: 1, minWidth: 0, padding: "9px 12px", borderRadius: 10, border: `1.5px solid ${BS.border}`, background: BS.surface2, color: BS.ink, fontSize: 13, fontFamily: "inherit" } })), /* @__PURE__ */ React.createElement("datalist", { id: "bs-discover-states" }, ST.map((s) => /* @__PURE__ */ React.createElement("option", { key: s, value: s }))), /* @__PURE__ */ React.createElement("div", { className: "bs-hscr", style: { display: "flex", gap: 7, marginBottom: 10 } }, CATS.map((c) => /* @__PURE__ */ React.createElement("button", { key: c.id, onClick: () => setCat(c.id), className: "bs-btn", style: { padding: "6px 13px", borderRadius: 999, border: `1.5px solid ${cat === c.id ? BS.brand : BS.border}`, background: cat === c.id ? BS.brand : "transparent", color: cat === c.id ? "#fff" : BS.ink2, fontSize: 12, fontWeight: cat === c.id ? 700 : 600, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" } }, c.label))), /* @__PURE__ */ React.createElement("button", { onClick: search, disabled: loading, className: "bs-btn", style: { width: "100%", padding: "11px", borderRadius: 12, border: "none", background: BS.grad, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", opacity: loading ? 0.7 : 1 } }, loading ? t(["Buscando\u2026", "Searching\u2026"]) : t(["Buscar lugares", "Search places"]))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 24px" } }, err && /* @__PURE__ */ React.createElement("div", { style: { color: BS.rose, fontSize: 13, marginBottom: 10 } }, err), loading && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: BS.soft, padding: "30px", fontSize: 13 } }, t(["Buscando lugares\u2026", "Searching places\u2026"])), !loading && results === null && !err && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: BS.soft, padding: "40px 20px", fontSize: 13.5, lineHeight: 1.6 } }, t(["Elige una categor\xEDa y tu zona, y toca Buscar lugares.", "Pick a category and your area, then tap Search places."])), !loading && results && results.length === 0 && !err && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: BS.soft, padding: "40px 20px", fontSize: 13.5 } }, t(["Sin resultados en esa zona. Prueba otra ciudad o categor\xEDa.", "No results in that area. Try another city or category."])), !loading && results && results.map((pl) => /* @__PURE__ */ React.createElement("a", { key: pl.place_id, href: pl.maps_url, target: "_blank", rel: "noopener noreferrer", style: { display: "flex", alignItems: "flex-start", gap: 12, background: BS.surface, borderRadius: 14, padding: "12px 14px", marginBottom: 8, border: `1px solid ${BS.border}`, textDecoration: "none" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRadius: 11, background: BS.surface2, display: "grid", placeItems: "center", flexShrink: 0, color: BS.brand } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: BS.brand, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "10", r: "3" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink } }, pl.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft, marginTop: 1 } }, pl.address), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginTop: 5, flexWrap: "wrap" } }, pl.rating != null && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: BS.ink2 } }, "\u2605 ", pl.rating, " ", /* @__PURE__ */ React.createElement("span", { style: { color: BS.soft, fontWeight: 500 } }, "(", pl.reviews, ")")), pl.open_now === true && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "#1EB87A" } }, t(["Abierto", "Open"])), pl.open_now === false && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: BS.rose } }, t(["Cerrado", "Closed"])), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, fontWeight: 700, color: BS.brand, marginLeft: "auto" } }, t(["Ver en mapa \u2192", "View on map \u2192"]))))))));
}
function UploadScreen({ setScreen }) {
  const BS = useBS();
  const t = useT();
  const [step, setStep] = useState(0);
  const [scanState, setScanState] = useState("idle");
  const [caption, setCaption] = useState("");
  const [vis, setVis] = useState("public");
  const [loc, setLoc] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isVideo, setIsVideo] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState("");
  const fileRef = useRef(null);
  const pickFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (f.size > 25 * 1024 * 1024) {
      setErr(t(["El archivo supera 25 MB", "The file exceeds 25 MB"]));
      return;
    }
    setErr("");
    setFile(f);
    setIsVideo(/^video\//.test(f.type));
    try {
      setPreview(URL.createObjectURL(f));
    } catch (_e) {
    }
    setStep(1);
  };
  const startScan = () => {
    setStep(2);
    setScanState("scanning");
    setTimeout(() => setScanState("approved"), 2200);
  };
  const doPublish = async () => {
    const A = window.BSAUTH || {};
    const sb = window._bsSb;
    setErr("");
    setUploading(true);
    try {
      let mediaUrl = "";
      if (file && sb) {
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const path = Date.now() + "_" + Math.random().toString(36).slice(2) + "." + ext;
        const up = await sb.storage.from("social-media").upload(path, file, { contentType: file.type, upsert: false });
        if (up.error) throw up.error;
        const { data: pub } = sb.storage.from("social-media").getPublicUrl(path);
        mediaUrl = pub.publicUrl;
      }
      if (A.createPost) {
        const d = await A.createPost({ caption, media_url: mediaUrl, visibility: vis, location: loc.trim() });
        if (!(d && d.ok)) throw new Error(d && d.error || t(["No se pudo publicar", "We couldn\u2019t post"]));
      }
      setScreen("feed");
    } catch (e) {
      setErr(e && e.message || t(["No se pudo subir el archivo", "We couldn\u2019t upload the file"]));
      setUploading(false);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*,video/mp4,video/quicktime", onChange: pickFile, style: { display: "none" } }), /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${BS.border}`, position: "sticky", top: 0, zIndex: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => step > 0 ? setStep((s) => s - 1) : setScreen("feed"), className: "bs-btn", style: { color: BS.ink2, fontSize: 18 } }, step === 0 ? "\u2715" : "\u2039"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 17, fontWeight: 700, color: BS.ink, flex: 1 } }, [t(["Nueva publicaci\xF3n", "New post"]), t(["Agregar detalles", "Add details"]), t(["Publicando\u2026", "Posting\u2026"]), t(["Listo", "Done"])][step]), step === 1 && /* @__PURE__ */ React.createElement("button", { onClick: startScan, className: "bs-btn", style: { background: BS.grad, color: "#fff", border: "none", padding: "7px 16px", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, t(["Siguiente", "Next"]))), step === 0 && /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 16 } }, /* @__PURE__ */ React.createElement("div", { onClick: () => fileRef.current && fileRef.current.click(), style: { width: "100%", aspectRatio: "1", maxWidth: 280, borderRadius: 20, border: `2px dashed ${BS.borderStrong}`, background: BS.surface, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 64, height: 64, borderRadius: 20, background: BS.surface2, display: "grid", placeItems: "center", color: BS.brand } }, /* @__PURE__ */ React.createElement("svg", { width: "30", height: "30", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3.2" }), /* @__PURE__ */ React.createElement("path", { d: "M8 5l1.5-2h5L16 5" }))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: BS.ink } }, t(["Sube tu foto o video", "Upload your photo or video"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: BS.soft, marginTop: 3 } }, t(["JPG, PNG, WEBP, MP4 \xB7 hasta 25 MB", "JPG, PNG, WEBP, MP4 \xB7 up to 25 MB"])))), err && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.like, fontWeight: 600 } }, err), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, width: "100%", maxWidth: 280 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => fileRef.current && fileRef.current.click(), className: "bs-btn", style: { flex: 1, padding: "13px", borderRadius: 14, border: "none", background: BS.grad, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, t(["Elegir archivo", "Choose file"])))), step === 1 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, padding: "14px 16px", alignItems: "flex-start", borderBottom: `1px solid ${BS.border}`, background: BS.surface } }, isVideo ? /* @__PURE__ */ React.createElement("video", { src: preview, style: { width: 70, height: 70, objectFit: "cover", borderRadius: 12, background: "#000" }, muted: true }) : /* @__PURE__ */ React.createElement("img", { src: preview || "assets/photos/g04.webp", alt: "", style: { width: 70, height: 70, objectFit: "cover", borderRadius: 12 } }), /* @__PURE__ */ React.createElement("textarea", { value: caption, onChange: (e) => setCaption(e.target.value), placeholder: t(["Escribe un pie de foto...", "Write a caption..."]), style: { flex: 1, border: "none", background: "none", resize: "none", fontSize: 14, color: BS.ink, lineHeight: 1.55, minHeight: 80, padding: 0 } })), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", background: BS.surface, marginTop: 8, display: "flex", alignItems: "center", gap: 9 } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: BS.brand, strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("path", { d: "M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "10", r: "2.5" })), /* @__PURE__ */ React.createElement("input", { value: loc, onChange: (e) => setLoc(e.target.value), placeholder: t(["Agregar ubicaci\xF3n (para \xABCerca de m\xED\xBB)", "Add location (for \u201CNear me\u201D)"]), style: { flex: 1, border: "none", background: "none", fontSize: 13.5, color: BS.ink, fontFamily: "inherit" } })), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px", background: BS.surface, marginTop: 8 } }, [["public", t(["P\xFAblico", "Public"]), t(["Todos pueden ver", "Everyone can see"])], ["pack", t(["Solo mi Pack", "My Pack only"]), t(["Solo mis amigos", "Only my friends"])], ["private", t(["Privado", "Private"]), t(["Solo yo", "Only me"])]].map(([v, l, sub]) => /* @__PURE__ */ React.createElement("div", { key: v, onClick: () => setVis(v), style: { display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 12, border: `1.5px solid ${vis === v ? BS.brand : BS.border}`, background: vis === v ? "rgba(14,165,233,0.08)" : BS.surface2, cursor: "pointer", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink } }, l), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft } }, sub)), /* @__PURE__ */ React.createElement("div", { style: { width: 18, height: 18, borderRadius: "50%", border: `2px solid ${vis === v ? BS.brand : BS.borderStrong}`, background: vis === v ? BS.brand : "transparent", display: "grid", placeItems: "center" } }, vis === v && /* @__PURE__ */ React.createElement("div", { style: { width: 7, height: 7, borderRadius: "50%", background: "#fff" } })))))), step === 2 && /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, gap: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", width: "100%", maxWidth: 240, borderRadius: 20, overflow: "hidden" } }, isVideo ? /* @__PURE__ */ React.createElement("video", { src: preview, style: { width: "100%", aspectRatio: "1", objectFit: "cover", display: "block", background: "#000" }, muted: true }) : /* @__PURE__ */ React.createElement("img", { src: preview || "assets/photos/g04.webp", alt: "", style: { width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" } }), (scanState === "scanning" || uploading) && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, right: 0, height: 3, background: BS.brand, boxShadow: `0 0 18px ${BS.brand}`, animation: "bsScan 1.1s ease-in-out infinite" } })), scanState === "approved" && !uploading && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "rgba(0,232,122,0.14)", display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement("div", { className: "bs-pop", style: { background: "rgba(0,232,122,0.9)", borderRadius: "50%", width: 56, height: 56, display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6L9 17l-5-5" }))))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, uploading && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: BS.ink, marginBottom: 6 } }, t(["Subiendo\u2026", "Uploading\u2026"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: BS.soft } }, t(["Guardando tu publicaci\xF3n", "Saving your post"]))), !uploading && scanState === "scanning" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: BS.ink, marginBottom: 6 } }, t(["Revisando contenido\u2026", "Reviewing content\u2026"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: BS.soft } }, t(["Verificamos que todo sea seguro", "We make sure everything is safe"]))), !uploading && scanState === "approved" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 17, fontWeight: 800, color: BS.online, marginBottom: 5 } }, t(["Listo para compartir", "Ready to share"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: BS.soft, marginBottom: 18 } }, t(["Toca para publicar en la comunidad", "Tap to post to the community"])), err && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.like, fontWeight: 600, marginBottom: 12 } }, err), /* @__PURE__ */ React.createElement("button", { onClick: doPublish, className: "bs-btn", style: { padding: "14px 44px", borderRadius: 14, border: "none", background: BS.grad, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: BS.glow } }, t(["Publicar ahora", "Post now"]))))));
}
function PetsScreen() {
  const BS = useBS();
  const t = useT();
  const pet = BSDATA.pets[0];
  const maxW = Math.max(...pet.weight.map((w) => w.v));
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px", background: BS.surface, borderBottom: `1px solid ${BS.border}`, position: "sticky", top: 0, zIndex: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: BS.ink } }, t(["Mis Mascotas", "My Pets"]))), /* @__PURE__ */ React.createElement("div", { style: { margin: "14px 16px 0", background: BS.surface, borderRadius: 20, overflow: "hidden", border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement("img", { src: pet.img, alt: "", style: { width: "100%", height: 170, objectFit: "cover", display: "block" } }), pet.bpuppy && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 12, right: 12, background: BS.brand, color: "#fff", padding: "4px 12px", borderRadius: 999, fontSize: 11.5, fontWeight: 700 } }, "BrightPuppy")), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 9, marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, color: BS.ink } }, pet.name), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: BS.brand, background: "rgba(255,85,32,0.12)", padding: "2px 10px", borderRadius: 999 } }, pet.breed)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.soft } }, pet.gender === "Hembra" ? t(["Hembra", "Female"]) : pet.gender === "Macho" ? t(["Macho", "Male"]) : pet.gender, " \xB7 ", t(["Naci\xF3", "Born"]), " ", pet.dob))), /* @__PURE__ */ React.createElement("div", { style: { margin: "12px 16px 0", background: BS.surface, borderRadius: 16, overflow: "hidden", border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", borderBottom: `1px solid ${BS.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 700, color: BS.ink } }, t(["Vacunas", "Vaccines"])), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: BS.soft } }, pet.vaccines.filter((v) => v.done).length, "/", pet.vaccines.length)), pet.vaccines.map((v) => /* @__PURE__ */ React.createElement("div", { key: v.name, style: { display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", borderBottom: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { width: 32, height: 32, borderRadius: "50%", background: v.done ? "rgba(0,232,122,0.12)" : "rgba(255,85,32,0.1)", display: "grid", placeItems: "center", fontSize: 14 } }, v.done ? "\u2705" : "\u23F0"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink } }, v.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft } }, v.date)), v.upcoming && /* @__PURE__ */ React.createElement("span", { style: { background: "rgba(255,85,32,0.1)", color: BS.brand, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999 } }, t(["Pr\xF3xima", "Upcoming"]))))), /* @__PURE__ */ React.createElement("div", { style: { margin: "12px 16px 20px", background: BS.surface, borderRadius: 16, padding: "14px 16px", border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: BS.ink, marginBottom: 14 } }, t(["Peso (kg)", "Weight (kg)"])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-end", gap: 8, height: 80 } }, pet.weight.map((w) => /* @__PURE__ */ React.createElement("div", { key: w.m, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: BS.soft, fontWeight: 600 } }, w.v), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", background: BS.grad, borderRadius: "4px 4px 0 0", height: `${w.v / maxW * 70}px` } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: BS.soft } }, w.m))))));
}
function MessagesThread({ m, BS, onBack }) {
  const t = useT();
  const [msgs, setMsgs] = useState(() => [
    { from: "them", text: m.preview, time: m.time }
  ]);
  const [draft, setDraft] = useState("");
  const send = () => {
    const tx = draft.trim();
    if (!tx) return;
    setMsgs((prev) => [...prev, { from: "me", text: tx, time: t(["ahora", "now"]) }]);
    setDraft("");
  };
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", background: BS.surface, borderBottom: `1px solid ${BS.border}`, display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: onBack, className: "bs-btn", style: { color: BS.ink2, fontSize: 16 } }, "<"), /* @__PURE__ */ React.createElement(BSAvatar, { user: m, size: 36 }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14.5, fontWeight: 700, color: BS.ink } }, m.user), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: m.online ? BS.online : BS.soft } }, m.online ? t(["En l\xEDnea", "Online"]) : t(["Desconectado", "Offline"])))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 8 } }, msgs.map((x, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { alignSelf: x.from === "me" ? "flex-end" : "flex-start", maxWidth: "76%" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "9px 13px", borderRadius: 16, fontSize: 13.5, lineHeight: 1.4, background: x.from === "me" ? BS.brand : BS.surface, color: x.from === "me" ? "#fff" : BS.ink, border: x.from === "me" ? "none" : `1px solid ${BS.border}`, borderBottomRightRadius: x.from === "me" ? 4 : 16, borderBottomLeftRadius: x.from === "me" ? 16 : 4 } }, x.text), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: BS.soft, marginTop: 3, textAlign: x.from === "me" ? "right" : "left" } }, x.time))), /* @__PURE__ */ React.createElement("div", { style: { alignSelf: "center", margin: "8px 0", padding: "8px 12px", borderRadius: 10, background: BS.surface2, border: `1px solid ${BS.border}`, fontSize: 11, color: BS.soft, textAlign: "center", maxWidth: "90%" } }, t(["La mensajer\xEDa en tiempo real entre miembros est\xE1 activ\xE1ndose. Por ahora puedes ver tus conversaciones y redactar; el env\xEDo entre cuentas llegar\xE1 muy pronto.", "Real-time messaging between members is rolling out. For now you can view your conversations and draft messages; sending between accounts is coming very soon."]))), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", background: BS.surface, borderTop: `1px solid ${BS.border}`, display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("input", { value: draft, onChange: (e) => setDraft(e.target.value), onKeyDown: (e) => {
    if (e.key === "Enter") send();
  }, placeholder: t(["Escribe un mensaje\u2026", "Write a message\u2026"]), style: { flex: 1, border: `1px solid ${BS.border}`, borderRadius: 999, background: BS.bg, padding: "10px 15px", fontSize: 13.5, color: BS.ink, fontFamily: "inherit", outline: "none" } }), /* @__PURE__ */ React.createElement("button", { onClick: send, style: { width: 40, height: 40, borderRadius: "50%", border: "none", background: BS.brand, color: "#fff", cursor: "pointer", display: "grid", placeItems: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M22 2L11 13" }), /* @__PURE__ */ React.createElement("path", { d: "M22 2l-7 20-4-9-9-4 20-7z" })))));
}
function MessagesScreen({ setScreen }) {
  const BS = useBS();
  const t = useT();
  const [active, setActive] = useState(null);
  if (active) return /* @__PURE__ */ React.createElement(MessagesThread, { m: active, BS, onBack: () => setActive(null) });
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px", background: BS.surface, borderBottom: `1px solid ${BS.border}`, display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setScreen("feed"), className: "bs-btn", style: { color: BS.ink2, fontSize: 16 } }, "<"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: BS.ink } }, t(["Mensajes", "Messages"]))), BSDATA.messages.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, onClick: () => setActive(m), style: { display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", background: BS.surface, borderBottom: `1px solid ${BS.border}`, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(BSAvatar, { user: m, size: 46 }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 1, right: 1, width: 11, height: 11, borderRadius: "50%", background: m.online ? BS.online : BS.border, border: `2px solid ${BS.bg}` } })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: m.unread ? 700 : 600, color: BS.ink } }, m.user), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: BS.soft } }, m.time)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: m.unread ? BS.ink2 : BS.soft, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, m.preview)), m.unread && /* @__PURE__ */ React.createElement("div", { style: { width: 9, height: 9, borderRadius: "50%", background: BS.brand, flexShrink: 0 } }))));
}
function ScreenHeader({ title, sub }) {
  const BS = useBS();
  return /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 18px", background: BS.surface, borderBottom: `1px solid ${BS.border}`, position: "sticky", top: 0, zIndex: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 21, fontWeight: 800, color: BS.ink, letterSpacing: "-0.02em" } }, title), sub && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.ink2, marginTop: 2 } }, sub));
}
function SearchBar({ value, onChange, placeholder, BS }) {
  return /* @__PURE__ */ React.createElement("div", { style: { margin: "12px 16px 4px", background: BS.surface2, borderRadius: 12, padding: "10px 13px", display: "flex", alignItems: "center", gap: 9, border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: BS.soft, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "8" }), /* @__PURE__ */ React.createElement("path", { d: "m21 21-4.35-4.35" })), /* @__PURE__ */ React.createElement("input", { value, onChange: (e) => onChange(e.target.value), placeholder, style: { flex: 1, border: "none", background: "none", fontSize: 13.5, color: BS.ink, fontFamily: "inherit" } }), value && /* @__PURE__ */ React.createElement("button", { onClick: () => onChange(""), className: "bs-btn", style: { color: BS.soft, fontSize: 15 } }, "\u2715"));
}
function CommunityScreen() {
  const BS = useBS();
  const t = useT();
  const [following, setFollowing] = useState(/* @__PURE__ */ new Set());
  const [q, setQ] = useState("");
  const toggle = (m) => {
    setFollowing((s) => {
      const n = new Set(s);
      n.has(m.id) ? n.delete(m.id) : n.add(m.id);
      return n;
    });
    if (window.BSAUTH && window.BSAUTH.follow && !m.bpuppy) {
      try {
        window.BSAUTH.follow(m.username, following.has(m.id));
      } catch (e) {
      }
    }
  };
  const ql = q.trim().toLowerCase();
  const list = ql ? BSDATA.community.filter((m) => [m.name, m.username, m.city, m.pet.name, m.pet.breed].filter(Boolean).join(" ").toLowerCase().includes(ql)) : BSDATA.community;
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement(ScreenHeader, { title: t(["Comunidad", "Community"]), sub: t(["Due\xF1os que comparten su perfil p\xFAblico", "Owners who share their public profile"]) }), /* @__PURE__ */ React.createElement(SearchBar, { value: q, onChange: setQ, placeholder: t(["Buscar por nombre, ciudad o raza\u2026", "Search by name, city or breed\u2026"]), BS }), /* @__PURE__ */ React.createElement("div", { style: { margin: "8px 16px 4px", padding: "10px 13px", borderRadius: 12, background: "rgba(245,130,32,0.08)", border: `1px solid ${BS.borderStrong}`, fontSize: 11.5, color: BS.ink2, lineHeight: 1.5 } }, t(["Tu perfil es", "Your profile is"]), " ", /* @__PURE__ */ React.createElement("b", { style: { color: BS.ink } }, t(["privado por defecto", "private by default"])), ". ", t(["Solo apareces aqu\xED si activas \u201Cperfil p\xFAblico\u201D, y solo con los datos que t\xFA elijas.", "You only appear here if you turn on \u201Cpublic profile\u201D, and only with the details you choose."])), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12, padding: "8px 16px 22px" } }, list.map((m) => {
    const fol = following.has(m.id);
    return /* @__PURE__ */ React.createElement("div", { key: m.id, className: "bs-pop", style: { background: BS.surface, borderRadius: 18, overflow: "hidden", border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { height: 84, position: "relative", background: BS.surface2 } }, /* @__PURE__ */ React.createElement("img", { src: m.pet.img, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }, loading: "lazy" }), m.bpuppy && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 8, left: 8, background: BS.grad, color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 999 } }, "BrightPuppy")), /* @__PURE__ */ React.createElement("div", { style: { padding: "0 13px 13px", marginTop: -22, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 46, height: 46, borderRadius: "50%", background: m.color, display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: 16, border: `3px solid ${BS.surface}`, margin: "0 auto 6px", overflow: "hidden" } }, m.avatar ? /* @__PURE__ */ React.createElement("img", { src: m.avatar, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : m.initials), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 800, color: BS.ink } }, m.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.soft, marginBottom: 6 } }, m.city), m.status && m.status !== "nuevo" && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 7, display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React.createElement(StatusChip, { status: m.status, size: "sm" })), (m.pet.name || m.pet.breed) && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.brand, fontWeight: 700, background: "rgba(245,130,32,0.1)", borderRadius: 999, padding: "2px 9px", display: "inline-block", marginBottom: 9 } }, [m.pet.name, m.pet.breed].filter(Boolean).join(" \xB7 ")), /* @__PURE__ */ React.createElement("button", { onClick: () => toggle(m), className: "bs-btn", style: { width: "100%", padding: "7px", borderRadius: 999, border: `1.5px solid ${fol ? BS.border : BS.brand}`, background: "transparent", color: fol ? BS.soft : BS.brand, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, fol ? t(["Siguiendo", "Following"]) : t(["Seguir", "Follow"]))));
  }), list.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1", textAlign: "center", color: BS.soft, fontSize: 13, padding: "30px 0" } }, t(["Nadie coincide con tu b\xFAsqueda todav\xEDa.", "No one matches your search yet."]))));
}
function EventsScreen() {
  const BS = useBS();
  const t = useT();
  const sb = typeof window !== "undefined" ? window._bsSb : null;
  const me = typeof window !== "undefined" && window.BSAUTH && window.BSAUTH.me || null;
  const isAdmin = !!(me && (me.username === "brightpuppy" || me.verified));
  const [events, setEvents] = useState([]);
  const [perm, setPerm] = useState(null);
  const [sel, setSel] = useState(null);
  const [going, setGoing] = useState(/* @__PURE__ */ new Set());
  const [creating, setCreating] = useState(false);
  const [permPanel, setPermPanel] = useState(false);
  const [form, setForm] = useState({ title: "", type: "comunidad", event_date: "", location: "", address: "", description: "", link: "", image_url: "" });
  const [pf, setPf] = useState({ username: "", can_events: true, can_news: false });
  const [msg, setMsg] = useState("");
  const TYPES = [{ id: "comunidad", label: t(["Comunidad", "Community"]) }, { id: "adopcion", label: t(["Adopci\xF3n", "Adoption"]) }, { id: "grooming", label: t(["Grooming", "Grooming"]) }, { id: "vacunacion", label: t(["Vacunaci\xF3n", "Vaccination"]) }, { id: "otro", label: t(["Otro", "Other"]) }];
  const typeLabel = (id) => (TYPES.find((x) => x.id === id) || {}).label || id;
  const toggle = (id) => setGoing((s) => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });
  const load = async () => {
    if (!sb) return;
    try {
      const r = await sb.from("bpuppy_events").select("id,title,description,type,event_date,date_label,place,address,lat,lng,cover_url,link,attendees,created_at").eq("is_published", true).order("created_at", { ascending: false }).limit(200);
      const rows = (r.data || []).map((e) => ({ id: e.id, title: e.title, description: e.description, type: e.type || "comunidad", event_date: e.date_label || (e.event_date ? (function() {
        try {
          return new Date(e.event_date).toLocaleString();
        } catch (_) {
          return "";
        }
      })() : ""), location: e.place || "", address: e.address || "", lat: e.lat, lng: e.lng, image_url: e.cover_url || "", link: e.link || "" }));
      setEvents(rows);
    } catch (e) {
    }
  };
  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    (async () => {
      if (sb && me && me.username) {
        try {
          const r = await sb.from("bs_permissions").select("can_events,can_news").eq("username", me.username).maybeSingle();
          setPerm(r.data || {});
        } catch (e) {
          setPerm({});
        }
      }
    })();
  }, [me && me.username]);
  const canCreate = isAdmin || perm && perm.can_events;
  const saveEvent = async () => {
    if (!sb) return;
    if (!me) {
      setMsg(t(["Inicia sesi\xF3n.", "Sign in."]));
      return;
    }
    if (!form.title.trim()) {
      setMsg(t(["Ponle un t\xEDtulo.", "Add a title."]));
      return;
    }
    try {
      await sb.from("bpuppy_events").insert({ title: form.title.trim(), type: form.type, date_label: form.event_date.trim() || null, place: form.location.trim() || null, address: form.address.trim() || null, description: form.description.trim() || null, link: form.link.trim() || null, cover_url: form.image_url.trim() || null, created_by: me.username || me.name || "", is_published: true, attendees: 0 });
      setMsg("");
      setCreating(false);
      setForm({ title: "", type: "comunidad", event_date: "", location: "", address: "", description: "", link: "", image_url: "" });
      load();
    } catch (e) {
      setMsg(t(["No se pudo guardar.", "Could not save."]));
    }
  };
  const grant = async () => {
    if (!sb || !pf.username.trim()) return;
    try {
      await sb.from("bs_permissions").upsert({ username: pf.username.trim(), can_events: pf.can_events, can_news: pf.can_news, granted_by: me && me.username || "" }, { onConflict: "username" });
      setMsg(t(["Permiso guardado.", "Permission saved."]));
      setPf({ username: "", can_events: true, can_news: false });
    } catch (e) {
      setMsg(t(["No se pudo guardar el permiso.", "Could not save permission."]));
    }
  };
  const fld = { width: "100%", padding: "9px", borderRadius: 10, border: `1.5px solid ${BS.border}`, background: BS.surface2, color: BS.ink, fontSize: 13, fontFamily: "inherit", boxSizing: "border-box", marginBottom: 8 };
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement(ScreenHeader, { title: t(["Eventos BPuppy", "BPuppy Events"]), sub: t(["Reuniones y actividades de la comunidad", "Community meetups and activities"]) }), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px 0", display: "flex", gap: 8, flexWrap: "wrap" } }, canCreate && /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setCreating((c) => !c);
    setPermPanel(false);
    setMsg("");
  }, className: "bs-btn", style: { padding: "9px 14px", borderRadius: 11, border: "none", background: BS.grad, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, creating ? t(["Cancelar", "Cancel"]) : t(["+ Crear evento", "+ Create event"])), isAdmin && /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setPermPanel((p) => !p);
    setCreating(false);
    setMsg("");
  }, className: "bs-btn", style: { padding: "9px 14px", borderRadius: 11, border: `1.5px solid ${BS.border}`, background: BS.surface2, color: BS.ink, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, t(["Permisos", "Permissions"]))), msg && /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 16px 0", color: BS.brand, fontSize: 12.5, fontWeight: 600 } }, msg), creating && /* @__PURE__ */ React.createElement("div", { style: { margin: "12px 16px 0", padding: "14px", background: BS.surface, borderRadius: 14, border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("input", { value: form.title, onChange: (e) => setForm({ ...form, title: e.target.value }), placeholder: t(["T\xEDtulo del evento", "Event title"]), style: fld }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement("select", { value: form.type, onChange: (e) => setForm({ ...form, type: e.target.value }), style: { ...fld, marginBottom: 8 } }, TYPES.map((x) => /* @__PURE__ */ React.createElement("option", { key: x.id, value: x.id }, x.label))), /* @__PURE__ */ React.createElement("input", { value: form.event_date, onChange: (e) => setForm({ ...form, event_date: e.target.value }), placeholder: t(["Fecha (ej. 15 Mar, 3pm)", "Date (e.g. Mar 15, 3pm)"]), style: fld })), /* @__PURE__ */ React.createElement("input", { value: form.location, onChange: (e) => setForm({ ...form, location: e.target.value }), placeholder: t(["Lugar / ciudad", "Place / city"]), style: fld }), /* @__PURE__ */ React.createElement("input", { value: form.address, onChange: (e) => setForm({ ...form, address: e.target.value }), placeholder: t(["Direcci\xF3n (opcional)", "Address (optional)"]), style: fld }), /* @__PURE__ */ React.createElement("textarea", { value: form.description, onChange: (e) => setForm({ ...form, description: e.target.value }), placeholder: t(["Descripci\xF3n", "Description"]), rows: 3, style: { ...fld, resize: "vertical" } }), /* @__PURE__ */ React.createElement("input", { value: form.link, onChange: (e) => setForm({ ...form, link: e.target.value }), placeholder: t(["Link (registro/info, opcional)", "Link (signup/info, optional)"]), style: fld }), /* @__PURE__ */ React.createElement("input", { value: form.image_url, onChange: (e) => setForm({ ...form, image_url: e.target.value }), placeholder: t(["URL de imagen (opcional)", "Image URL (optional)"]), style: fld }), /* @__PURE__ */ React.createElement("button", { onClick: saveEvent, className: "bs-btn", style: { width: "100%", padding: "11px", borderRadius: 11, border: "none", background: BS.grad, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, t(["Publicar evento", "Publish event"]))), permPanel && isAdmin && /* @__PURE__ */ React.createElement("div", { style: { margin: "12px 16px 0", padding: "14px", background: BS.surface, borderRadius: 14, border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: BS.ink, marginBottom: 8 } }, t(["Dar permiso para crear", "Grant creation permission"])), /* @__PURE__ */ React.createElement("input", { value: pf.username, onChange: (e) => setPf({ ...pf, username: e.target.value }), placeholder: t(["Usuario (@username)", "Username (@username)"]), style: fld }), /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: BS.ink2, marginBottom: 6 } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: pf.can_events, onChange: (e) => setPf({ ...pf, can_events: e.target.checked }) }), " ", t(["Puede crear eventos", "Can create events"])), /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: BS.ink2, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: pf.can_news, onChange: (e) => setPf({ ...pf, can_news: e.target.checked }) }), " ", t(["Puede crear noticias", "Can create news"])), /* @__PURE__ */ React.createElement("button", { onClick: grant, className: "bs-btn", style: { width: "100%", padding: "10px", borderRadius: 11, border: "none", background: BS.grad, color: "#fff", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, t(["Guardar permiso", "Save permission"]))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 22px", display: "flex", flexDirection: "column", gap: 14 } }, !events.length && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: BS.soft, padding: "40px 20px", fontSize: 13.5, lineHeight: 1.6 } }, t(["A\xFAn no hay eventos. Vuelve pronto o, si tienes permiso, crea el primero.", "No events yet. Check back soon, or create the first one if you have permission."])), events.map((ev) => {
    const on = going.has(ev.id);
    return /* @__PURE__ */ React.createElement("div", { key: ev.id, className: "bs-pop", style: { background: BS.surface, borderRadius: 18, overflow: "hidden", border: `1px solid ${BS.border}` } }, ev.image_url ? /* @__PURE__ */ React.createElement("img", { src: ev.image_url, alt: "", onClick: () => setSel(ev), style: { width: "100%", height: 150, objectFit: "cover", display: "block", cursor: "pointer" }, loading: "lazy" }) : /* @__PURE__ */ React.createElement("div", { onClick: () => setSel(ev), style: { height: 90, background: BS.grad, cursor: "pointer" } }), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "inline-block", fontSize: 10.5, fontWeight: 700, color: BS.brand, background: "rgba(245,130,32,0.1)", borderRadius: 999, padding: "2px 9px", marginBottom: 6 } }, typeLabel(ev.type)), /* @__PURE__ */ React.createElement("div", { onClick: () => setSel(ev), style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 16.5, fontWeight: 800, color: BS.ink, lineHeight: 1.25, marginBottom: 5, cursor: "pointer" } }, ev.title), ev.event_date && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.brand, fontWeight: 700, marginBottom: 2 } }, ev.event_date), ev.location && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: BS.soft, marginBottom: 12 } }, ev.location), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggle(ev.id), className: "bs-btn", style: { padding: "9px 18px", borderRadius: 11, border: "none", background: on ? BS.surface2 : BS.grad, color: on ? BS.ink : "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, on ? t(["Asistir\xE1s \u2713", "Going \u2713"]) : t(["Asistir", "Attend"])), /* @__PURE__ */ React.createElement("button", { onClick: () => setSel(ev), className: "bs-btn", style: { background: "none", border: "none", color: BS.brand, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, t(["Ver detalle \u2192", "View details \u2192"])))));
  })), sel && /* @__PURE__ */ React.createElement("div", { onClick: () => setSel(null), style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 60, display: "flex", alignItems: "flex-end", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { background: BS.surface, borderRadius: "18px 18px 0 0", width: "100%", maxWidth: 480, maxHeight: "85%", overflow: "auto" } }, sel.image_url && /* @__PURE__ */ React.createElement("img", { src: sel.image_url, alt: "", style: { width: "100%", height: 180, objectFit: "cover", display: "block" } }), /* @__PURE__ */ React.createElement("div", { style: { padding: "16px 16px 24px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: BS.ink } }, sel.title), /* @__PURE__ */ React.createElement("button", { onClick: () => setSel(null), style: { background: "none", border: "none", fontSize: 24, color: BS.soft, cursor: "pointer", lineHeight: 1 } }, "\xD7")), /* @__PURE__ */ React.createElement("div", { style: { display: "inline-block", fontSize: 10.5, fontWeight: 700, color: BS.brand, background: "rgba(245,130,32,0.1)", borderRadius: 999, padding: "2px 9px", margin: "6px 0" } }, typeLabel(sel.type)), sel.event_date && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: BS.brand, fontWeight: 700 } }, sel.event_date), sel.location && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.soft, marginTop: 2 } }, sel.location, sel.address ? " \xB7 " + sel.address : ""), sel.description && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: BS.ink, marginTop: 10, lineHeight: 1.6, whiteSpace: "pre-wrap" } }, sel.description), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggle(sel.id), className: "bs-btn", style: { flex: 1, padding: "11px", borderRadius: 11, border: "none", background: going.has(sel.id) ? BS.surface2 : BS.grad, color: going.has(sel.id) ? BS.ink : "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, going.has(sel.id) ? t(["Asistir\xE1s \u2713", "Going \u2713"]) : t(["Asistir", "Attend"])), sel.link && /* @__PURE__ */ React.createElement("a", { href: sel.link, target: "_blank", rel: "noopener noreferrer", className: "bs-btn", style: { flex: 1, textAlign: "center", padding: "11px", borderRadius: 11, border: `1.5px solid ${BS.border}`, background: BS.surface2, color: BS.ink, fontSize: 14, fontWeight: 700, textDecoration: "none", fontFamily: "inherit" } }, t(["M\xE1s info \u2192", "More info \u2192"]))), sel.lat != null && sel.lng != null && /* @__PURE__ */ React.createElement("a", { href: "https://www.google.com/maps/search/?api=1&query=" + sel.lat + "," + sel.lng, target: "_blank", rel: "noopener noreferrer", style: { display: "block", textAlign: "center", marginTop: 10, fontSize: 12.5, fontWeight: 700, color: BS.brand } }, t(["C\xF3mo llegar", "Directions"]), " ", "\u2192")))));
}
function NewsScreen() {
  const BS = useBS();
  const t = useT();
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement(ScreenHeader, { title: t(["Noticias", "News"]), sub: t(["Novedades de BrightPuppy", "BrightPuppy updates"]) }), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 22px", display: "flex", flexDirection: "column", gap: 14 } }, BSDATA.news.map((n) => /* @__PURE__ */ React.createElement("div", { key: n.id, className: "bs-pop", style: { background: BS.surface, borderRadius: 18, overflow: "hidden", border: `1px solid ${BS.border}`, display: "flex", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("img", { src: n.img, alt: "", style: { width: 108, height: 108, objectFit: "cover", flexShrink: 0, display: "block" }, loading: "lazy" }), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px", minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "inline-block", fontSize: 9.5, fontWeight: 800, color: BS.brand, background: "rgba(14,165,233,0.1)", borderRadius: 999, padding: "2px 8px", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" } }, n.tag), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: BS.ink, lineHeight: 1.3, marginBottom: 4 } }, n.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft, marginBottom: 5 } }, n.date), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: BS.ink2, lineHeight: 1.45, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } }, n.excerpt))))));
}
function VideosScreen() {
  const BS = useBS();
  const t = useT();
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement(ScreenHeader, { title: t(["Videos", "Videos"]), sub: t(["Mira a la comunidad en acci\xF3n", "Watch the community in action"]) }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12, padding: "14px 16px 22px" } }, BSDATA.videos.map((v) => /* @__PURE__ */ React.createElement("div", { key: v.id, className: "bs-pop", style: { background: BS.surface, borderRadius: 16, overflow: "hidden", border: `1px solid ${BS.border}`, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", aspectRatio: "16/10" } }, /* @__PURE__ */ React.createElement("img", { src: v.thumb, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }, loading: "lazy" }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)", display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: BS.brand }, /* @__PURE__ */ React.createElement("path", { d: "M8 5v14l11-7z" })))), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", bottom: 7, right: 7, background: "rgba(0,0,0,0.7)", color: "#fff", fontSize: 10.5, fontWeight: 700, padding: "2px 7px", borderRadius: 6 } }, v.dur)), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 12px", fontSize: 12.5, fontWeight: 700, color: BS.ink, lineHeight: 1.3 } }, v.title)))));
}
function PetForm({ BS, initial, petId, onDone, onCancel }) {
  const t = useT();
  const [f, setF] = useState({ name: initial && initial.name || "", breed: initial && initial.breed || "", size: initial && initial.size || "", sex: initial && initial.sex || "", weight_lbs: initial && initial.weight_lbs || "" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const inp = { width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${BS.border}`, background: BS.surface2, color: BS.ink, fontFamily: "inherit", fontSize: 13, outline: "none", boxSizing: "border-box" };
  const save = async () => {
    if (!f.name.trim()) {
      setMsg(t(["El nombre es obligatorio.", "Name is required."]));
      return;
    }
    setBusy(true);
    setMsg("");
    try {
      const A = typeof window !== "undefined" && window.BSAUTH || {};
      const d = petId ? A.updatePet ? await A.updatePet({ id: petId, ...f }) : { error: t(["No disponible", "Not available"]) } : A.addPet ? await A.addPet(f) : { error: t(["No disponible", "Not available"]) };
      if (d && d.error) {
        setMsg(d.error);
        setBusy(false);
        return;
      }
      onDone();
    } catch (e) {
      setMsg(t(["No se pudo guardar.", "We couldn\u2019t save."]));
      setBusy(false);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface, border: `1px solid ${BS.border}`, borderRadius: 16, padding: 16, marginTop: 4, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: BS.ink, marginBottom: 10 } }, petId ? t(["Editar mascota", "Edit pet"]) : t(["Agregar mascota", "Add pet"])), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { style: { ...inp, gridColumn: "1/-1" }, placeholder: t(["Nombre *", "Name *"]), value: f.name, onChange: (e) => setF({ ...f, name: e.target.value }) }), /* @__PURE__ */ React.createElement("input", { style: inp, placeholder: t(["Raza", "Breed"]), value: f.breed, onChange: (e) => setF({ ...f, breed: e.target.value }) }), /* @__PURE__ */ React.createElement("select", { style: inp, value: f.size, onChange: (e) => setF({ ...f, size: e.target.value }) }, /* @__PURE__ */ React.createElement("option", { value: "" }, t(["Tama\xF1o", "Size"])), /* @__PURE__ */ React.createElement("option", { value: "Peque\xF1o" }, t(["Peque\xF1o", "Small"])), /* @__PURE__ */ React.createElement("option", { value: "Mediano" }, t(["Mediano", "Medium"])), /* @__PURE__ */ React.createElement("option", { value: "Grande" }, t(["Grande", "Large"])), /* @__PURE__ */ React.createElement("option", { value: "XL" }, "XL")), /* @__PURE__ */ React.createElement("select", { style: inp, value: f.sex, onChange: (e) => setF({ ...f, sex: e.target.value }) }, /* @__PURE__ */ React.createElement("option", { value: "" }, t(["Sexo", "Sex"])), /* @__PURE__ */ React.createElement("option", { value: "Macho" }, t(["Macho", "Male"])), /* @__PURE__ */ React.createElement("option", { value: "Hembra" }, t(["Hembra", "Female"]))), /* @__PURE__ */ React.createElement("input", { style: inp, type: "number", placeholder: t(["Peso (lb)", "Weight (lb)"]), value: f.weight_lbs, onChange: (e) => setF({ ...f, weight_lbs: e.target.value }) })), msg && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: BS.rose, marginTop: 8 } }, msg), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 12 } }, /* @__PURE__ */ React.createElement("button", { onClick: onCancel, className: "bs-btn", style: { flex: 1, padding: "11px", borderRadius: 10, border: `1.5px solid ${BS.border}`, background: "transparent", color: BS.ink2, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" } }, t(["Cancelar", "Cancel"])), /* @__PURE__ */ React.createElement("button", { onClick: save, disabled: busy, className: "bs-btn", style: { flex: 2, padding: "11px", borderRadius: 10, border: "none", background: BS.grad, color: "#fff", fontWeight: 700, fontSize: 13, cursor: busy ? "default" : "pointer", fontFamily: "inherit", opacity: busy ? 0.7 : 1 } }, busy ? t(["Guardando\u2026", "Saving\u2026"]) : petId ? t(["Guardar cambios", "Save changes"]) : t(["Guardar mascota", "Save pet"]))));
}
function AccountScreen({ setScreen }) {
  const BS = useBS();
  const t = useT();
  const { lang } = useLang();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [tab, setTab] = useState("mascotas");
  const [addOpen, setAddOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [bkBusy, setBkBusy] = useState(null);
  const [bkMsg, setBkMsg] = useState("");
  const [payBusy, setPayBusy] = useState(null);
  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const A = typeof window !== "undefined" && window.BSAUTH || {};
      if (!A.accountData) {
        setErr(t(["No disponible.", "Not available."]));
        setLoading(false);
        return;
      }
      const d2 = await A.accountData();
      if (d2 && d2.error) setErr(d2.error);
      else setData(d2 || {});
    } catch (e) {
      setErr(t(["No pudimos cargar tu cuenta.", "We couldn\u2019t load your account."]));
    }
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);
  const money = (n) => "$" + Number(n || 0).toLocaleString("en-US");
  const fmtD = (iso) => {
    if (!iso) return "\u2014";
    try {
      return new Date(String(iso).length <= 10 ? iso + "T00:00:00" : iso).toLocaleDateString(lang === "en" ? "en-US" : "es-US", { day: "numeric", month: "short", year: "numeric" });
    } catch (e) {
      return "\u2014";
    }
  };
  const d = data || {};
  const pets = d.pets || [];
  const memberships = d.memberships || [];
  const plans = d.plans || [];
  const payments = d.payments || [];
  const bookings = (d.bookings || []).filter((b) => b.status !== "cancelled");
  const baths = memberships.reduce((a, m) => a + (m.credits_balance || 0), 0);
  const cancelBooking = async (b) => {
    if (!window.confirm(t(["\xBFCancelar esta cita? Cancelar con menos de 24h puede tener cargo del 50%.", "Cancel this appointment? Cancelling with less than 24h notice may incur a 50% charge."]))) return;
    setBkBusy(b.id);
    setBkMsg("");
    try {
      const r = await (window.BSAUTH && window.BSAUTH.manageBooking ? window.BSAUTH.manageBooking("cancel", b.id) : { error: t(["No disponible", "Not available"]) });
      if (r && r.error) {
        setBkMsg(r.error);
      } else {
        setBkMsg(r && r.message ? r.message : t(["Cita cancelada.", "Appointment cancelled."]));
        await load();
      }
    } catch (e) {
      setBkMsg(t(["No se pudo cancelar.", "We couldn\u2019t cancel."]));
    }
    setBkBusy(null);
  };
  const payPlan = async (p) => {
    setPayBusy(p.id);
    try {
      const r = await (window.BSAUTH && window.BSAUTH.payPlan ? window.BSAUTH.payPlan(p.id) : { error: t(["No disponible", "Not available"]) });
      if (r && r.url) {
        window.location.href = r.url;
        return;
      }
      setBkMsg(r && r.error || t(["No se pudo iniciar el pago.", "We couldn\u2019t start the payment."]));
    } catch (e) {
      setBkMsg(t(["No se pudo iniciar el pago.", "We couldn\u2019t start the payment."]));
    }
    setPayBusy(null);
  };
  const TABS = [
    { id: "mascotas", label: t(["Mascotas", "Pets"]), n: pets.length },
    { id: "grooming", label: t(["Grooming", "Grooming"]), n: 0 },
    { id: "membresias", label: t(["Membres\xEDas", "Memberships"]), n: memberships.length },
    { id: "pagos", label: t(["Pagos", "Payments"]), n: plans.length }
  ];
  const card = { background: BS.surface, border: `1px solid ${BS.border}`, borderRadius: 16, padding: "14px 16px", marginBottom: 12 };
  const row = (k, v, vc) => /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", gap: 12, padding: "4px 0", fontSize: 13 } }, /* @__PURE__ */ React.createElement("span", { style: { color: BS.soft } }, k), /* @__PURE__ */ React.createElement("span", { style: { color: vc || BS.ink, fontWeight: 600, textAlign: "right" } }, v));
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface, padding: "12px 16px", position: "sticky", top: 0, zIndex: 11, borderBottom: `1px solid ${BS.border}`, display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setScreen("profile"), className: "bs-btn", style: { background: "transparent", border: "none", color: BS.ink2, cursor: "pointer", display: "grid", placeItems: "center", padding: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M19 12H5M12 19l-7-7 7-7" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18, fontWeight: 800, color: BS.ink } }, t(["Mi Cuenta", "My Account"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft } }, t(["Privado \xB7 solo t\xFA ves esto", "Private \xB7 only you see this"]))), /* @__PURE__ */ React.createElement("a", { href: "/grooming.html", className: "bs-btn", style: { textDecoration: "none", background: BS.grad, color: "#fff", fontSize: 12, fontWeight: 700, padding: "8px 13px", borderRadius: 10 } }, t(["Agendar", "Book"]))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, margin: "12px 14px 0", padding: "10px 14px", borderRadius: 12, background: BS.surface2, border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: BS.soft, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M7 11V7a5 5 0 0110 0v4" })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: BS.soft, lineHeight: 1.4 } }, t(["Tus mascotas, citas, pagos y membres\xEDas son privados \u2014 no aparecen en tu perfil p\xFAblico.", "Your pets, appointments, payments and memberships are private \u2014 they don\u2019t appear on your public profile."]))), loading && /* @__PURE__ */ React.createElement("div", { style: { padding: 40, textAlign: "center", color: BS.soft, fontSize: 13 } }, t(["Cargando tu cuenta\u2026", "Loading your account\u2026"])), !loading && err && /* @__PURE__ */ React.createElement("div", { style: { margin: "16px 14px", background: BS.surface, border: `1px solid ${BS.border}`, borderRadius: 16, padding: "14px 16px", color: BS.rose, fontSize: 13 } }, err, " ", /* @__PURE__ */ React.createElement("button", { onClick: load, style: { marginLeft: 8, color: BS.brand, background: "none", border: "none", cursor: "pointer", fontWeight: 700 } }, t(["Reintentar", "Retry"]))), !loading && !err && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, padding: "12px 14px" } }, [{ n: pets.length, l: t(["mascotas", "pets"]) }, { n: baths, l: t(["ba\xF1os disp.", "baths avail."]) }, { n: memberships.length, l: t(["membres\xEDas", "memberships"]) }].map((s, si) => /* @__PURE__ */ React.createElement("div", { key: si, style: { flex: 1, background: BS.surface, border: `1px solid ${BS.border}`, borderRadius: 14, padding: "10px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: BS.ink } }, s.n), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: BS.soft } }, s.l)))), /* @__PURE__ */ React.createElement("div", { className: "bs-hscr", style: { display: "flex", gap: 6, padding: "0 14px 12px", borderBottom: `1px solid ${BS.border}` } }, TABS.map((tb) => {
    const on = tab === tb.id;
    return /* @__PURE__ */ React.createElement("button", { key: tb.id, onClick: () => setTab(tb.id), className: "bs-btn", style: { padding: "8px 14px", borderRadius: 999, border: `1.5px solid ${on ? BS.brand : BS.border}`, background: on ? "rgba(255,85,32,0.08)" : "transparent", color: on ? BS.brand : BS.ink2, fontSize: 12.5, fontWeight: on ? 700 : 600, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" } }, tb.label, tb.n ? ` \xB7 ${tb.n}` : "");
  })), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px" } }, tab === "mascotas" && /* @__PURE__ */ React.createElement("div", null, pets.length === 0 && !addOpen && /* @__PURE__ */ React.createElement("div", { style: { ...card, textAlign: "center", color: BS.soft, fontSize: 13 } }, t(["A\xFAn no tienes mascotas registradas.", "You don\u2019t have any pets registered yet."])), pets.map((p, i) => editId === p.id ? /* @__PURE__ */ React.createElement(PetForm, { key: i, BS, petId: p.id, initial: p, onDone: () => {
    setEditId(null);
    load();
  }, onCancel: () => setEditId(null) }) : /* @__PURE__ */ React.createElement("div", { key: i, style: { ...card, display: "flex", gap: 12, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: BS.surface2, display: "grid", placeItems: "center", overflow: "hidden" } }, p.photo_url ? /* @__PURE__ */ React.createElement("img", { src: p.photo_url, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : /* @__PURE__ */ React.createElement("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: BS.brand }, /* @__PURE__ */ React.createElement("circle", { cx: "7", cy: "9", r: "1.7" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "7.4", r: "1.7" }), /* @__PURE__ */ React.createElement("circle", { cx: "17", cy: "9", r: "1.7" }), /* @__PURE__ */ React.createElement("path", { d: "M12 12c-2.4 0-4.3 1.9-4.3 3.9 0 1.5 1.2 2.4 2.6 2.4 .8 0 1.1-.4 1.7-.4s.9 .4 1.7 .4c1.4 0 2.6-.9 2.6-2.4 0-2-1.9-3.9-4.3-3.9z" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: BS.ink } }, p.name || t(["Mi mascota", "My pet"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: BS.ink2 } }, [p.breed, p.size, p.sex, p.weight_lbs ? p.weight_lbs + " lb" : ""].filter(Boolean).join(" \xB7 ") || "\u2014"), p.status === "pending" && /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", marginTop: 5, fontSize: 10.5, fontWeight: 700, color: "#E0A106", background: "rgba(224,161,6,0.12)", padding: "2px 8px", borderRadius: 999 } }, t(["Pendiente de confirmar", "Pending confirmation"]))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setEditId(p.id);
    setAddOpen(false);
  }, className: "bs-btn", style: { fontSize: 11.5, fontWeight: 700, color: BS.ink2, border: `1.5px solid ${BS.border}`, borderRadius: 10, padding: "7px 11px", background: "transparent", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" } }, t(["Editar", "Edit"])), p.status !== "pending" && /* @__PURE__ */ React.createElement("a", { href: "/grooming.html", className: "bs-btn", style: { textDecoration: "none", textAlign: "center", fontSize: 11.5, fontWeight: 700, color: BS.brand, border: `1.5px solid ${BS.border}`, borderRadius: 10, padding: "7px 11px", whiteSpace: "nowrap" } }, t(["Agendar", "Book"]))))), addOpen ? /* @__PURE__ */ React.createElement(PetForm, { BS, onDone: () => {
    setAddOpen(false);
    load();
  }, onCancel: () => setAddOpen(false) }) : /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setAddOpen(true);
    setEditId(null);
  }, className: "bs-btn", style: { width: "100%", padding: "13px", borderRadius: 14, border: `1.5px dashed ${BS.border}`, background: "transparent", color: BS.brand, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, t(["+ Agregar mascota", "+ Add pet"]))), tab === "grooming" && /* @__PURE__ */ React.createElement("div", null, bkMsg && /* @__PURE__ */ React.createElement("div", { style: { ...card, fontSize: 12.5, color: BS.ink2, lineHeight: 1.5 } }, bkMsg), bookings.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: BS.soft, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 2px 8px" } }, t(["Tus citas", "Your appointments"])), bookings.map((b, i) => {
    const svc = Array.isArray(b.services) ? b.services.join(" + ") : b.services || "Grooming";
    const st = b.status || "requested";
    const stColor = st === "confirmed" ? "#1EB87A" : st === "completed" ? BS.soft : BS.brand;
    return /* @__PURE__ */ React.createElement("div", { key: b.id || i, style: card }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 800, color: BS.ink } }, b.pet_name || t(["Mascota", "Pet"])), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, fontWeight: 700, color: stColor, background: BS.surface2, padding: "3px 9px", borderRadius: 999 } }, st)), row(t(["Servicio", "Service"]), svc), row(t(["Fecha", "Date"]), fmtD(b.appointment_date) + (b.appointment_time ? " \xB7 " + b.appointment_time : "")), b.size ? row(t(["Tama\xF1o", "Size"]), b.size) : null, st !== "completed" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } }, /* @__PURE__ */ React.createElement("a", { href: "/reserva.html?id=" + encodeURIComponent(b.id), className: "bs-btn", style: { flex: 1, textAlign: "center", textDecoration: "none", fontSize: 12, fontWeight: 700, color: BS.ink2, border: `1.5px solid ${BS.border}`, borderRadius: 10, padding: "9px" } }, t(["Reprogramar", "Reschedule"])), /* @__PURE__ */ React.createElement("button", { onClick: () => cancelBooking(b), disabled: bkBusy === b.id, className: "bs-btn", style: { flex: 1, fontSize: 12, fontWeight: 700, color: BS.rose, border: `1.5px solid ${BS.border}`, borderRadius: 10, padding: "9px", background: "transparent", cursor: bkBusy === b.id ? "default" : "pointer", fontFamily: "inherit" } }, bkBusy === b.id ? "\u2026" : t(["Cancelar", "Cancel"]))));
  }), /* @__PURE__ */ React.createElement("div", { style: { ...card, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { color: BS.brand, display: "flex", justifyContent: "center", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("svg", { width: "34", height: "34", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "6", cy: "6", r: "3" }), /* @__PURE__ */ React.createElement("circle", { cx: "6", cy: "18", r: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" }))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: BS.ink, marginBottom: 4 } }, bookings.length ? t(["Agenda otra cita", "Book another appointment"]) : t(["Agenda tu pr\xF3xima cita", "Book your next appointment"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.soft, lineHeight: 1.5, marginBottom: 14 } }, memberships.length ? t(["Tus ba\xF1os de membres\xEDa se aplican autom\xE1ticamente.", "Your membership baths are applied automatically."]) : t(["Ba\xF1o, corte o spa para tu mascota en segundos.", "Bath, haircut or spa for your pet in seconds."])), /* @__PURE__ */ React.createElement("a", { href: "/grooming.html", style: { display: "inline-block", textDecoration: "none", background: BS.grad, color: "#fff", fontSize: 13.5, fontWeight: 700, padding: "11px 22px", borderRadius: 12 } }, t(["Agendar grooming \u2192", "Book grooming \u2192"]))), baths > 0 && /* @__PURE__ */ React.createElement("div", { style: card }, row(t(["Ba\xF1os de membres\xEDa disponibles", "Membership baths available"]), baths, BS.brand))), tab === "membresias" && /* @__PURE__ */ React.createElement("div", null, memberships.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { ...card, textAlign: "center", color: BS.soft, fontSize: 13 } }, t(["A\xFAn no tienes membres\xEDa de grooming.", "You don\u2019t have a grooming membership yet."]), " ", /* @__PURE__ */ React.createElement("a", { href: "/grooming.html", style: { color: BS.brand, fontWeight: 700 } }, t(["Ver planes \u2192", "View plans \u2192"]))), memberships.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: card }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, fontWeight: 800, color: BS.ink } }, m.plan || t(["Membres\xEDa", "Membership"])), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, fontWeight: 700, color: m.status === "active" ? "#1EB87A" : BS.soft, background: m.status === "active" ? "rgba(30,184,122,0.12)" : BS.surface2, padding: "3px 9px", borderRadius: 999 } }, m.status || "\u2014")), row(t(["Facturaci\xF3n", "Billing"]), m.billing || "\u2014"), row(t(["Mascota", "Pet"]), (m.pet_name || "\u2014") + (m.pet_size ? " \xB7 " + m.pet_size : "")), row(t(["Ba\xF1os disponibles", "Baths available"]), m.credits_balance || 0, BS.brand), row(t(["Pr\xF3xima renovaci\xF3n", "Next renewal"]), fmtD(m.renew_date))))), tab === "pagos" && /* @__PURE__ */ React.createElement("div", null, plans.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { ...card, textAlign: "center", color: BS.soft, fontSize: 13 } }, t(["No tienes planes de pago activos.", "You don\u2019t have any active payment plans."]), " ", /* @__PURE__ */ React.createElement("a", { href: "/plan", style: { color: BS.brand, fontWeight: 700 } }, t(["Armar mi plan \u2192", "Build my plan \u2192"]))), plans.map((p, i) => {
    const est = p.est_price || p.total_amount || (p.monthly_amount || 0) * (p.months || 0) || 0;
    const paid = +p.paid_total || 0 || payments.filter((x) => x.plan_id === p.id).reduce((a, x) => a + (+x.amount || 0), 0);
    const bal = Math.max(0, est - paid);
    const pct = est ? Math.min(100, Math.round(paid / est * 100)) : 0;
    return /* @__PURE__ */ React.createElement("div", { key: i, style: card }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: BS.ink, marginBottom: 8 } }, p.breed || p.pet_name || t(["Plan de pagos", "Payment plan"])), row(t(["Plan", "Plan"]), (p.months || "\u2014") + " " + t(["meses \xB7 ", "months \xB7 "]) + money(p.monthly_amount) + t(["/mes", "/mo"])), row(t(["Total estimado", "Estimated total"]), money(est)), row(t(["Abonado", "Paid"]), money(paid), "#1EB87A"), row(t(["Restante", "Remaining"]), money(bal)), row(t(["Tu gran d\xEDa", "Your big day"]), fmtD(p.target_date)), /* @__PURE__ */ React.createElement("div", { style: { height: 7, borderRadius: 999, background: BS.surface2, overflow: "hidden", margin: "8px 0 4px" } }, /* @__PURE__ */ React.createElement("div", { style: { width: pct + "%", height: "100%", background: BS.grad } })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.soft, textAlign: "right" } }, pct, "% ", t(["completado", "complete"])), bal > 0 && p.status !== "cancelled" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", { onClick: () => payPlan(p), disabled: payBusy === p.id, className: "bs-btn", style: { width: "100%", marginTop: 12, padding: "11px", borderRadius: 10, border: "none", background: BS.grad, color: "#fff", fontWeight: 700, fontSize: 13, cursor: payBusy === p.id ? "default" : "pointer", fontFamily: "inherit", opacity: payBusy === p.id ? 0.7 : 1 } }, payBusy === p.id ? t(["Redirigiendo\u2026", "Redirecting\u2026"]) : t(["Hacer abono (", "Make a payment ("]) + money(p.monthly_amount) + ")"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: BS.soft, textAlign: "center", marginTop: 6 } }, t(["Pago seguro con Stripe \xB7 tarjeta, Klarna, Affirm", "Secure payment with Stripe \xB7 card, Klarna, Affirm"]))));
  }))), /* @__PURE__ */ React.createElement("div", { style: { height: 24 } })));
}
if (typeof window !== "undefined") {
  window.BSLangContext = BSLangContext;
  if (!window.LangContext) window.LangContext = BSLangContext;
  if (!window.useLang) window.useLang = useLang;
  if (!window.useT) window.useT = useT;
  if (!window.pick) window.pick = bsPick;
  if (!window.bpGetLang) window.bpGetLang = bsReadLang;
}
function MapScreen({ setScreen }) {
  const BS = useBS();
  const t = useT();
  const wrapRef = useRef(null);
  const mapRef = useRef(null);
  const layerRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [sel, setSel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [adding, setAdding] = useState(false);
  const [pending, setPending] = useState(null);
  const [form, setForm] = useState({ type: "bebedero", name: "", description: "", address: "" });
  const [rv, setRv] = useState({ rating: 5, body: "" });
  const [msg, setMsg] = useState("");
  const sb = typeof window !== "undefined" ? window._bsSb : null;
  const me = typeof window !== "undefined" && window.BSAUTH && window.BSAUTH.me || null;
  const TYPES = [
    { id: "bebedero", label: t(["Bebedero de agua", "Water fountain"]), color: "#0EA5E9" },
    { id: "comida", label: t(["Comida gratis", "Free dog food"]), color: "#1EB87A" },
    { id: "vacunacion", label: t(["Vacunaci\xF3n", "Vaccination"]), color: "#E85D75" },
    { id: "bolsas", label: t(["Estaci\xF3n de bolsas", "Poop-bag station"]), color: "#7C5CBF" },
    { id: "parque", label: t(["Parque para perros", "Dog park"]), color: "#F58220" },
    { id: "otro", label: t(["Otro", "Other"]), color: "#6B5A4E" }
  ];
  const tm = (id) => TYPES.find((x) => x.id === id) || TYPES[5];
  const adRef = useRef(false);
  useEffect(() => {
    adRef.current = adding;
  }, [adding]);
  const load = async () => {
    if (!sb) return;
    try {
      const res = await sb.from("community_points").select("id,type,name,description,address,lat,lng,created_by,created_at").eq("status", "active").limit(800);
      setPoints(res.data || []);
    } catch (e) {
    }
  };
  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    if (!window.L || mapRef.current || !wrapRef.current) return;
    try {
      const m = window.L.map(wrapRef.current, { zoomControl: true }).setView([39.5, -98.35], 4);
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "(c) OpenStreetMap", maxZoom: 19 }).addTo(m);
      layerRef.current = window.L.layerGroup().addTo(m);
      m.on("click", (e) => {
        if (adRef.current) {
          setPending({ lat: e.latlng.lat, lng: e.latlng.lng });
        }
      });
      mapRef.current = m;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          try {
            m.setView([pos.coords.latitude, pos.coords.longitude], 13);
            window.L.circleMarker([pos.coords.latitude, pos.coords.longitude], { radius: 7, color: "#fff", weight: 2, fillColor: "#2563EB", fillOpacity: 1 }).addTo(m);
          } catch (_) {
          }
        }, () => {
        }, { timeout: 8e3 });
      }
      setTimeout(() => {
        try {
          m.invalidateSize();
        } catch (_) {
        }
      }, 280);
    } catch (e) {
    }
  }, []);
  useEffect(() => {
    const m = mapRef.current, lg = layerRef.current;
    if (!m || !lg || !window.L) return;
    lg.clearLayers();
    points.forEach((p) => {
      const meta = tm(p.type);
      const mk = window.L.circleMarker([p.lat, p.lng], { radius: 9, color: "#fff", weight: 2, fillColor: meta.color, fillOpacity: 1 });
      mk.on("click", () => openPoint(p));
      mk.addTo(lg);
    });
    if (pending) {
      window.L.circleMarker([pending.lat, pending.lng], { radius: 8, color: "#fff", weight: 2, fillColor: "#F58220", fillOpacity: 0.9 }).addTo(lg);
    }
  }, [points, pending]);
  const openPoint = async (p) => {
    setSel(p);
    setReviews([]);
    if (sb) {
      try {
        const res = await sb.from("point_reviews").select("id,point_id,author,rating,body,created_at").eq("point_id", p.id).order("created_at", { ascending: false });
        setReviews(res.data || []);
      } catch (e) {
      }
    }
  };
  const savePoint = async () => {
    if (!sb || !pending) return;
    if (!me) {
      setMsg(t(["Inicia sesi\xF3n para agregar un punto.", "Sign in to add a point."]));
      return;
    }
    if (!form.name.trim()) {
      setMsg(t(["Ponle un nombre.", "Add a name."]));
      return;
    }
    try {
      await sb.from("community_points").insert({ type: form.type, name: form.name.trim(), description: form.description.trim() || null, address: form.address.trim() || null, lat: pending.lat, lng: pending.lng, created_by: me.username || me.name || "" });
      setMsg("");
      setAdding(false);
      setPending(null);
      setForm({ type: "bebedero", name: "", description: "", address: "" });
      load();
    } catch (e) {
      setMsg(t(["No se pudo guardar.", "Could not save."]));
    }
  };
  const saveReview = async () => {
    if (!sb || !sel) return;
    if (!me) {
      setMsg(t(["Inicia sesi\xF3n para rese\xF1ar.", "Sign in to review."]));
      return;
    }
    try {
      await sb.from("point_reviews").insert({ point_id: sel.id, author: me.username || me.name || "", rating: rv.rating, body: rv.body.trim() || null });
      setRv({ rating: 5, body: "" });
      openPoint(sel);
    } catch (e) {
    }
  };
  const avg = reviews.length ? (reviews.reduce((a, r) => a + (r.rating || 0), 0) / reviews.length).toFixed(1) : null;
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px", background: BS.surface, borderBottom: `1px solid ${BS.border}`, display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setScreen && setScreen("discover"), className: "bs-btn", style: { background: "transparent", border: "none", color: BS.ink2, cursor: "pointer", fontSize: 20 } }, "\u2039"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 17, fontWeight: 800, color: BS.ink } }, t(["Mapa comunitario", "Community map"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.soft } }, t(["Bebederos, comida, vacunaci\xF3n y m\xE1s, de la comunidad", "Fountains, food, vaccination and more, from the community"]))), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setAdding((a) => !a);
    setPending(null);
    setMsg("");
  }, className: "bs-btn", style: { padding: "8px 12px", borderRadius: 10, border: "none", background: adding ? BS.rose : BS.grad, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, adding ? t(["Cancelar", "Cancel"]) : t(["+ Agregar", "+ Add"]))), adding && /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 14px", background: "rgba(245,130,32,0.1)", color: BS.ink2, fontSize: 12.5, fontWeight: 600 } }, pending ? t(["Punto elegido. Completa los datos abajo.", "Point chosen. Fill in the details below."]) : t(["Toca el mapa donde est\xE1 el lugar.", "Tap the map where the spot is."])), /* @__PURE__ */ React.createElement("div", { ref: wrapRef, style: { height: 420, width: "100%", background: BS.surface2 } }), /* @__PURE__ */ React.createElement("div", { className: "bs-hscr", style: { display: "flex", gap: 10, padding: "8px 14px", background: BS.surface, borderBottom: `1px solid ${BS.border}` } }, TYPES.map((x) => /* @__PURE__ */ React.createElement("span", { key: x.id, style: { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: BS.ink2, whiteSpace: "nowrap" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 10, height: 10, borderRadius: "50%", background: x.color } }), x.label))), msg && /* @__PURE__ */ React.createElement("div", { style: { padding: "8px 14px", color: BS.rose, fontSize: 12.5 } }, msg), adding && pending && /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px", background: BS.surface } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("select", { value: form.type, onChange: (e) => setForm({ ...form, type: e.target.value }), style: { padding: "9px", borderRadius: 10, border: `1.5px solid ${BS.border}`, background: BS.surface2, color: BS.ink, fontSize: 13, fontFamily: "inherit" } }, TYPES.map((x) => /* @__PURE__ */ React.createElement("option", { key: x.id, value: x.id }, x.label))), /* @__PURE__ */ React.createElement("input", { value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }), placeholder: t(["Nombre del lugar", "Place name"]), style: { padding: "9px", borderRadius: 10, border: `1.5px solid ${BS.border}`, background: BS.surface2, color: BS.ink, fontSize: 13, fontFamily: "inherit" } })), /* @__PURE__ */ React.createElement("input", { value: form.address, onChange: (e) => setForm({ ...form, address: e.target.value }), placeholder: t(["Direcci\xF3n o referencia (opcional)", "Address or hint (optional)"]), style: { width: "100%", padding: "9px", borderRadius: 10, border: `1.5px solid ${BS.border}`, background: BS.surface2, color: BS.ink, fontSize: 13, fontFamily: "inherit", marginBottom: 8, boxSizing: "border-box" } }), /* @__PURE__ */ React.createElement("textarea", { value: form.description, onChange: (e) => setForm({ ...form, description: e.target.value }), placeholder: t(["Detalles (agua limpia, horario, gratis...)", "Details (clean water, hours, free...)"]), rows: 2, style: { width: "100%", padding: "9px", borderRadius: 10, border: `1.5px solid ${BS.border}`, background: BS.surface2, color: BS.ink, fontSize: 13, fontFamily: "inherit", marginBottom: 8, boxSizing: "border-box", resize: "vertical" } }), /* @__PURE__ */ React.createElement("button", { onClick: savePoint, className: "bs-btn", style: { width: "100%", padding: "11px", borderRadius: 11, border: "none", background: BS.grad, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, t(["Guardar punto", "Save point"]))), sel && /* @__PURE__ */ React.createElement("div", { onClick: () => setSel(null), style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 60, display: "flex", alignItems: "flex-end", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { background: BS.surface, borderRadius: "18px 18px 0 0", width: "100%", maxWidth: 480, maxHeight: "80%", overflow: "auto", padding: "16px 16px 24px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18, fontWeight: 800, color: BS.ink } }, sel.name), /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: BS.ink2, marginTop: 2 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 9, height: 9, borderRadius: "50%", background: tm(sel.type).color } }), tm(sel.type).label)), /* @__PURE__ */ React.createElement("button", { onClick: () => setSel(null), style: { background: "none", border: "none", fontSize: 24, color: BS.soft, cursor: "pointer", lineHeight: 1 } }, "\xD7")), sel.address && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.soft, marginTop: 6 } }, sel.address), sel.description && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: BS.ink, marginTop: 8, lineHeight: 1.5 } }, sel.description), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, margin: "12px 0" } }, avg && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 800, color: BS.ink } }, "\u2605", " ", avg), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: BS.soft } }, reviews.length, " ", t(["rese\xF1a(s)", "review(s)"])), /* @__PURE__ */ React.createElement("a", { href: "https://www.google.com/maps/search/?api=1&query=" + sel.lat + "," + sel.lng, target: "_blank", rel: "noopener noreferrer", style: { marginLeft: "auto", fontSize: 12.5, fontWeight: 700, color: BS.brand } }, t(["C\xF3mo llegar", "Directions"]), " ", "\u2192")), reviews.map((r) => /* @__PURE__ */ React.createElement("div", { key: r.id, style: { borderTop: `1px solid ${BS.border}`, padding: "8px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: BS.ink } }, r.author || t(["An\xF3nimo", "Anonymous"]), " ", /* @__PURE__ */ React.createElement("span", { style: { color: BS.brand } }, "\u2605".repeat(r.rating || 0))), r.body && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: BS.ink2, marginTop: 2 } }, r.body))), /* @__PURE__ */ React.createElement("div", { style: { borderTop: `1px solid ${BS.border}`, marginTop: 8, paddingTop: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, marginBottom: 8 } }, [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ React.createElement("button", { key: n, onClick: () => setRv({ ...rv, rating: n }), style: { background: "none", border: "none", cursor: "pointer", fontSize: 22, color: n <= rv.rating ? BS.brand : BS.border, padding: 0, lineHeight: 1 } }, "\u2605"))), /* @__PURE__ */ React.createElement("textarea", { value: rv.body, onChange: (e) => setRv({ ...rv, body: e.target.value }), placeholder: t(["Escribe tu rese\xF1a...", "Write your review..."]), rows: 2, style: { width: "100%", padding: "9px", borderRadius: 10, border: `1.5px solid ${BS.border}`, background: BS.surface2, color: BS.ink, fontSize: 13, fontFamily: "inherit", boxSizing: "border-box", resize: "vertical", marginBottom: 8 } }), /* @__PURE__ */ React.createElement("button", { onClick: saveReview, className: "bs-btn", style: { width: "100%", padding: "10px", borderRadius: 10, border: "none", background: BS.grad, color: "#fff", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, t(["Publicar rese\xF1a", "Post review"]))))));
}
Object.assign(window, {
  AccountScreen,
  MapScreen,
  BSCtx,
  useBS,
  THEMES,
  BSAvatar,
  BSVerified,
  BSocialLogo,
  WelcomeScreen,
  OnboardingScreen,
  StoriesBar,
  FeedScreen,
  ProfileScreen,
  PackScreen,
  DiscoverScreen,
  UploadScreen,
  PetsScreen,
  MessagesScreen,
  CommunityScreen,
  StoriesScreen,
  EventsScreen,
  NewsScreen,
  VideosScreen,
  CreateProfileScreen,
  PostDetail,
  StatusChip,
  BadgeChips
});

})();
