(function(){
const { useState, useRef, useEffect, useContext, createContext } = React;
const BSCtx = createContext(null);
const useBS = () => useContext(BSCtx);
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
  } }, /* @__PURE__ */ React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: s.glow ? "#fff" : s.color } }), bsStatusLabel(status, lang || "es"));
}
function BadgeChips({ badges, lang, max }) {
  const list = (badges || []).filter((b) => b !== "nuevo").slice(0, max || 4);
  if (!list.length) return null;
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, list.map((b) => /* @__PURE__ */ React.createElement(StatusChip, { key: b, status: b, lang, size: "sm" })));
}
const THEMES = {
  clean: {
    bg: "#FBFAF8",
    surface: "#FFFFFF",
    surface2: "#F4F1EC",
    border: "rgba(45,36,33,0.12)",
    borderStrong: "rgba(45,36,33,0.22)",
    brand: "#F58220",
    rose: "#E85D75",
    grad: "linear-gradient(135deg,#F58220 0%,#E85D75 100%)",
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
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const send = async () => {
    const e = (email || "").trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) {
      setErr("Escribe un correo v\xE1lido");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const d = await onSendLink(e);
      if (d && d.ok) setSent(true);
      else setErr(d && d.error || "No se pudo enviar el enlace");
    } catch (_e) {
      setErr("Error de red, intenta de nuevo");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { style: { height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("img", { src: "assets/photos/g03.webp", alt: "", style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(5,5,18,0.1) 0%,rgba(5,5,18,0.94) 100%)" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 26px 34px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: "7px 8px 4px", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)", display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement(BSocialLogo, { size: 36 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 } }, "B Social"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 } }, "by BrightPuppy"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 21, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 12 } }, "La comunidad", /* @__PURE__ */ React.createElement("br", null), "m\xE1s leal de internet"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 7, height: 7, borderRadius: "50%", background: BS.online } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500 } }, "Comunidad BrightPuppy")))), /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface, padding: "22px 22px 34px", display: "flex", flexDirection: "column", gap: 10 } }, sent ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "8px 0 4px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: 10, color: BS.brand } }, /* @__PURE__ */ React.createElement("svg", { width: "38", height: "38", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M4 7l8 6 8-6" }))), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 19, fontWeight: 800, color: BS.ink, marginBottom: 6 } }, "Revisa tu correo"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: BS.ink2, lineHeight: 1.55, margin: 0 } }, "Te enviamos un enlace a ", /* @__PURE__ */ React.createElement("b", { style: { color: BS.ink } }, email.trim().toLowerCase()), ". T\xF3calo para entrar \u2014 sin contrase\xF1as.")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink, marginBottom: 2 } }, "Entra o crea tu cuenta"), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") send();
      },
      placeholder: "tu@correo.com",
      style: { width: "100%", padding: "14px 15px", borderRadius: 14, border: `1.5px solid ${BS.borderStrong}`, background: BS.surface2, fontSize: 14.5, color: BS.ink, fontFamily: "inherit" }
    }
  ), err && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.like, fontWeight: 600 } }, err), /* @__PURE__ */ React.createElement("button", { onClick: send, disabled: busy, className: "bs-btn", style: { padding: "14px", borderRadius: 14, border: "none", background: BS.grad, fontSize: 14.5, fontWeight: 700, color: "#fff", cursor: busy ? "default" : "pointer", fontFamily: "inherit", boxShadow: BS.glow, opacity: busy ? 0.7 : 1 } }, busy ? "Enviando\u2026" : "Enviarme mi enlace m\xE1gico"), /* @__PURE__ */ React.createElement("p", { style: { textAlign: "center", fontSize: 11.5, color: BS.soft, margin: "4px 0 0", lineHeight: 1.5 } }, "Sin contrase\xF1as. Usa el mismo correo de tu cuenta BrightPuppy si ya eres cliente."))));
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
  const m = me || {};
  const editing = !!(onDone && m && m.username);
  let pend = null;
  try {
    pend = JSON.parse(localStorage.getItem("bp_pending_social") || "null");
  } catch (e) {
  }
  if (m.username) pend = null;
  const [firstName, setFirstName] = useState(m.first_name || "");
  const [lastName, setLastName] = useState(m.last_name || "");
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
      setErr("Escribe tu nombre");
      return;
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
        is_public: isPublic
      });
      if (!(d && d.ok)) {
        setErr(d && d.error || "No se pudo guardar");
        setBusy(false);
      } else if (onDone) onDone();
    } catch (e) {
      setErr(e && e.message || "Error al guardar");
      setBusy(false);
    }
  };
  const fld = { width: "100%", padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${BS.borderStrong}`, background: BS.surface2, fontSize: 14, color: BS.ink, fontFamily: "inherit" };
  const lbl = { fontSize: 11.5, fontWeight: 700, color: BS.ink2, margin: "0 0 5px" };
  const grp = { marginBottom: 12 };
  const sectionTitle = { fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: BS.brand, margin: "18px 0 10px" };
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { padding: "36px 22px 28px", minHeight: "100%", background: BS.bg } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 25, fontWeight: 800, color: BS.ink, letterSpacing: "-0.03em", marginBottom: 6 } }, editing ? "Editar perfil" : "Crea tu perfil"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: BS.ink2, lineHeight: 1.5, margin: "0 0 14px" } }, editing ? "Actualiza tus datos y fotos cuando quieras." : "Bienvenido" + (m.email ? " \xB7 " + m.email : "") + ". Completa tus datos para unirte a la comunidad."), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Foto de portada"), /* @__PURE__ */ React.createElement("label", { style: { display: "block", height: 92, borderRadius: 14, border: `1.5px dashed ${BS.borderStrong}`, background: coverPrev ? `url(${coverPrev}) center/cover` : BS.surface2, cursor: "pointer", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("input", { type: "file", accept: "image/*", onChange: (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) pickCover(f);
  }, style: { display: "none" } }), !coverPrev && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", color: BS.soft, fontSize: 12.5, fontWeight: 700 } }, "+ Sube o elige una portada"), coverPrev && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 6, right: 8, background: "rgba(0,0,0,0.45)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999 } }, "Cambiar"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 24, justifyContent: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement(PhotoPick, { label: "Tu foto", preview: avatarPrev, onPick: pickAvatar, BS, round: true }), /* @__PURE__ */ React.createElement(PhotoPick, { label: "Foto de tu mascota", preview: petPrev, onPick: pickPet, BS })), /* @__PURE__ */ React.createElement("div", { style: sectionTitle }, "Tus datos"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Nombre *"), /* @__PURE__ */ React.createElement("input", { value: firstName, onChange: (e) => setFirstName(e.target.value), placeholder: "Luis", style: fld })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Apellido"), /* @__PURE__ */ React.createElement("input", { value: lastName, onChange: (e) => setLastName(e.target.value), placeholder: "Guzm\xE1n", style: fld }))), /* @__PURE__ */ React.createElement("div", { style: grp }, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Bio (opcional)"), /* @__PURE__ */ React.createElement("input", { value: bio, onChange: (e) => setBio(e.target.value), placeholder: "Amante de los Golden \u{1F43E}", style: fld })), /* @__PURE__ */ React.createElement("div", { style: sectionTitle }, "Tu mascota"), /* @__PURE__ */ React.createElement("div", { style: { ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, "\xBFQu\xE9 tipo de mascota?"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, [["perro", "Perro"], ["gato", "Gato"], ["otra", "Otra"]].map(([v, l]) => /* @__PURE__ */ React.createElement("button", { key: v, onClick: () => setPetSpecies(v), className: "bs-btn", style: { flex: 1, padding: "10px", borderRadius: 11, border: `1.5px solid ${petSpecies === v ? BS.brand : BS.border}`, background: petSpecies === v ? "rgba(245,130,32,0.08)" : BS.surface2, color: petSpecies === v ? BS.brand : BS.ink2, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, l)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Nombre"), /* @__PURE__ */ React.createElement("input", { value: petName, onChange: (e) => setPetName(e.target.value), placeholder: "Luna", style: fld })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Raza / tipo"), /* @__PURE__ */ React.createElement("input", { value: petBreed, onChange: (e) => setPetBreed(e.target.value), placeholder: "Golden Retriever", style: fld }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Color"), /* @__PURE__ */ React.createElement("input", { value: petColor, onChange: (e) => setPetColor(e.target.value), placeholder: "Dorado", style: fld })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Edad"), /* @__PURE__ */ React.createElement("input", { value: petAge, onChange: (e) => setPetAge(e.target.value), placeholder: "2 a\xF1os", style: fld }))), /* @__PURE__ */ React.createElement("div", { style: sectionTitle }, "Tu direcci\xF3n ", /* @__PURE__ */ React.createElement("span", { style: { textTransform: "none", letterSpacing: 0, color: BS.soft, fontWeight: 600 } }, "\xB7 privada, nunca p\xFAblica")), /* @__PURE__ */ React.createElement("div", { style: grp }, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Calle y n\xFAmero"), /* @__PURE__ */ React.createElement("input", { value: address, onChange: (e) => setAddress(e.target.value), placeholder: "123 Main St, Apt 4", style: fld })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 2, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Ciudad"), /* @__PURE__ */ React.createElement("input", { value: city, onChange: (e) => setCity(e.target.value), list: "bs-cities", placeholder: "Empieza a escribir\u2026", style: fld }), /* @__PURE__ */ React.createElement("datalist", { id: "bs-cities" }, /* @__PURE__ */ React.createElement("option", { value: "Miami, FL" }), /* @__PURE__ */ React.createElement("option", { value: "Orlando, FL" }), /* @__PURE__ */ React.createElement("option", { value: "Tampa, FL" }), /* @__PURE__ */ React.createElement("option", { value: "Haines City, FL" }), /* @__PURE__ */ React.createElement("option", { value: "Kissimmee, FL" }), /* @__PURE__ */ React.createElement("option", { value: "Lakeland, FL" }), /* @__PURE__ */ React.createElement("option", { value: "Davenport, FL" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Estado"), /* @__PURE__ */ React.createElement("input", { value: stateV, onChange: (e) => setStateV(e.target.value), placeholder: "FL", style: fld })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, ...grp } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, "ZIP"), /* @__PURE__ */ React.createElement("input", { value: zip, onChange: (e) => setZip(e.target.value), placeholder: "33844", style: fld }))), /* @__PURE__ */ React.createElement("div", { onClick: () => setIsPublic((v) => !v), style: { display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 13, border: `1.5px solid ${isPublic ? BS.brand : BS.border}`, background: isPublic ? "rgba(245,130,32,0.07)" : BS.surface2, cursor: "pointer", marginTop: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink } }, "Perfil p\xFAblico"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft, lineHeight: 1.5 } }, "Si lo activas, en Comunidad solo se ver\xE1: ", /* @__PURE__ */ React.createElement("b", { style: { color: BS.ink2 } }, "tu nombre, ciudad y tu mascota"), " (con foto si subiste). ", /* @__PURE__ */ React.createElement("b", { style: { color: BS.ink2 } }, "Tu correo, tel\xE9fono y direcci\xF3n NUNCA se hacen p\xFAblicos."), " Por defecto tu perfil es privado.")), /* @__PURE__ */ React.createElement("div", { style: { width: 46, height: 26, borderRadius: 999, background: isPublic ? BS.grad : BS.border, position: "relative", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 3, left: isPublic ? 23 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left .2s" } }))), err && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.like, fontWeight: 600, marginTop: 10 } }, err), /* @__PURE__ */ React.createElement("button", { onClick: save, disabled: busy, className: "bs-btn", style: { width: "100%", marginTop: 16, padding: "15px", borderRadius: 14, border: "none", background: BS.grad, color: "#fff", fontSize: 15, fontWeight: 700, cursor: busy ? "default" : "pointer", fontFamily: "inherit", boxShadow: BS.glow, opacity: busy ? 0.7 : 1 } }, busy ? "Guardando\u2026" : editing ? "Guardar cambios" : "Entrar a la comunidad"), /* @__PURE__ */ React.createElement("button", { onClick: () => editing ? onDone() : onLogout(), className: "bs-btn", style: { width: "100%", marginTop: 10, padding: "12px", borderRadius: 12, border: "none", background: "transparent", color: BS.soft, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" } }, editing ? "Cancelar" : "Usar otra cuenta"));
}
function OnboardingScreen({ onDone }) {
  const BS = useBS();
  const [pick, setPick] = useState(null);
  const opts = [
    { id: "dog", emoji: "\u{1F415}", label: "Perros", sub: "Tengo o quiero un perro" },
    { id: "cat", emoji: "\u{1F431}", label: "Gatos", sub: "Tengo o quiero un gato" },
    { id: "both", emoji: "\u{1F43E}", label: "Ambos", sub: "Amo a todos por igual" },
    { id: "soon", emoji: "\u{1F331}", label: "Pronto", sub: "Estoy pensandolo" }
  ];
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { height: "100%", background: BS.bg, padding: "44px 22px 28px", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 28 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", color: BS.ink, marginBottom: 6 } }, "Cual es tu mundo?"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: BS.ink2, lineHeight: 1.5, margin: 0 } }, "Personaliza tu experiencia en B Social")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flex: 1 } }, opts.map((o) => /* @__PURE__ */ React.createElement("button", { key: o.id, onClick: () => setPick(o.id), style: { padding: "20px 14px", borderRadius: 18, border: `2px solid ${pick === o.id ? BS.brand : BS.border}`, background: pick === o.id ? "rgba(255,85,32,0.1)" : BS.surface, cursor: "pointer", textAlign: "center", fontFamily: "inherit", transition: "all .18s" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 9 } }, o.emoji), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: BS.ink } }, o.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.soft, marginTop: 3 } }, o.sub)))), /* @__PURE__ */ React.createElement("button", { onClick: onDone, disabled: !pick, className: "bs-btn", style: { marginTop: 22, padding: "15px", borderRadius: 14, border: "none", background: pick ? BS.grad : BS.surface2, fontSize: 15, fontWeight: 700, color: pick ? "#fff" : BS.soft, cursor: pick ? "pointer" : "default", fontFamily: "inherit", transition: "all .2s", boxShadow: pick ? BS.glow : "none" } }, "Empezar"));
}
function StoriesBar() {
  const BS = useBS();
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
  return /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface, borderBottom: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", onChange: pickStory, style: { display: "none" } }), /* @__PURE__ */ React.createElement("div", { className: "bs-hscr", style: { display: "flex", gap: 12, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { onClick: () => !busy && fileRef.current && fileRef.current.click(), style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 54, height: 54, borderRadius: "50%", border: `2px dashed ${BS.borderStrong}`, display: "grid", placeItems: "center", background: BS.surface2, color: BS.brand } }, busy ? /* @__PURE__ */ React.createElement("div", { style: { width: 18, height: 18, border: `2px solid ${BS.border}`, borderTopColor: BS.brand, borderRadius: "50%", animation: "bpChatDot 0.8s linear infinite" } }) : /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" }))), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9.5, color: BS.ink, fontWeight: 600 } }, "Tu historia")), stories.map((s) => /* @__PURE__ */ React.createElement("div", { key: s.id, onClick: () => setView(s), style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { padding: 2.5, borderRadius: "50%", background: BS.grad } }, /* @__PURE__ */ React.createElement("div", { style: { width: 50, height: 50, borderRadius: "50%", background: s.color || BS.brand, display: "grid", placeItems: "center", border: `2.5px solid ${BS.surface}`, overflow: "hidden" } }, s.avatar ? /* @__PURE__ */ React.createElement("img", { src: s.avatar, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : /* @__PURE__ */ React.createElement("span", { style: { fontSize: 17, fontWeight: 700, color: "#fff" } }, s.initials))), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9.5, color: BS.ink, fontWeight: 600, maxWidth: 56, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, s.username)))), view && /* @__PURE__ */ React.createElement("div", { onClick: () => setView(null), style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 2e3, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 16, left: 16, right: 16, display: "flex", alignItems: "center", gap: 10, color: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 34, height: 34, borderRadius: "50%", background: view.color || BS.brand, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13, overflow: "hidden" } }, view.avatar ? /* @__PURE__ */ React.createElement("img", { src: view.avatar, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : view.initials), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, fontSize: 14 } }, view.username), /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
    e.stopPropagation();
    setView(null);
  }, style: { marginLeft: "auto", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 15 } }, "\u2715")), /* @__PURE__ */ React.createElement("img", { src: view.img, alt: "", style: { maxWidth: "100%", maxHeight: "86vh", borderRadius: 16, objectFit: "contain" } })));
}
function PostCard({ post, onLike, onSave, onOpen }) {
  const BS = useBS();
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
  return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 2 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px 9px" } }, /* @__PURE__ */ React.createElement(BSAvatar, { user: post, size: 36, ring: true }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink } }, post.username), post.verified && /* @__PURE__ */ React.createElement(BSVerified, { size: 13 })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.soft } }, post.location ? post.location : post.city, " \xB7 ", post.time)), /* @__PURE__ */ React.createElement("button", { className: "bs-btn", style: { color: BS.ink2, fontSize: 19, padding: "4px 6px" } }, "\xB7\xB7\xB7")), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", aspectRatio: "1", overflow: "hidden", cursor: "pointer", background: BS.surface2 }, onDoubleClick: handleDblTap, onClick: open }, /* @__PURE__ */ React.createElement("img", { src: post.img, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }, loading: "lazy" }), heart && /* @__PURE__ */ React.createElement("div", { key: heart.k, style: { position: "absolute", left: heart.x - 24, top: heart.y - 24, fontSize: 48, pointerEvents: "none", animation: "bsFloat 0.85s ease-out forwards" } }, "\u2764\uFE0F")), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px 6px", display: "flex", alignItems: "center", gap: 15 } }, /* @__PURE__ */ React.createElement("button", { onClick: handleLike, className: "bs-btn" }, /* @__PURE__ */ React.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: post.liked ? BS.like : "none", stroke: post.liked ? BS.like : BS.ink2, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { animation: animLike ? "bsLike 0.4s ease" : "none" } }, /* @__PURE__ */ React.createElement("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" }))), /* @__PURE__ */ React.createElement("button", { className: "bs-btn", onClick: open, style: { color: BS.ink2 }, title: "Comentarios" }, /* @__PURE__ */ React.createElement("svg", { width: "23", height: "23", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }))), /* @__PURE__ */ React.createElement("button", { className: "bs-btn", style: { color: BS.ink2 } }, /* @__PURE__ */ React.createElement("svg", { width: "23", height: "23", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" }), /* @__PURE__ */ React.createElement("polyline", { points: "16 6 12 2 8 6" }), /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "2", x2: "12", y2: "15" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement("button", { onClick: () => onSave(post.id), className: "bs-btn" }, /* @__PURE__ */ React.createElement("svg", { width: "23", height: "23", viewBox: "0 0 24 24", fill: post.saved ? BS.brand : "none", stroke: post.saved ? BS.brand : BS.ink2, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" })))), /* @__PURE__ */ React.createElement("div", { style: { padding: "2px 14px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink, marginBottom: 5 } }, fmt(post.likes), " me gusta"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: BS.ink, lineHeight: 1.55 } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, post.username), " ", post.caption, " ", (post.tags || []).map((t, i) => /* @__PURE__ */ React.createElement("span", { key: t, style: { color: BS.brand, fontWeight: 600, cursor: "pointer" } }, i > 0 ? " " : "", " #", t))), /* @__PURE__ */ React.createElement("div", { onClick: open, style: { fontSize: 12.5, color: BS.soft, marginTop: 6, cursor: "pointer", fontWeight: 600 } }, "Ver comentarios y detalles")));
}
function PostDetail({ post, onClose }) {
  const BS = useBS();
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
      if (s < 60) return "ahora";
      if (s < 3600) return Math.round(s / 60) + "m";
      if (s < 86400) return Math.round(s / 3600) + "h";
      return Math.round(s / 86400) + "d";
    } catch (e) {
      return "";
    }
  };
  return /* @__PURE__ */ React.createElement("div", { onClick: (e) => {
    if (e.target === e.currentTarget) onClose();
  }, style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 3e3, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface, borderRadius: 20, overflow: "hidden", width: "100%", maxWidth: A.isWide ? 880 : 460, maxHeight: "92vh", display: "flex", flexDirection: A.isWide ? "row" : "column", boxShadow: "0 30px 90px rgba(0,0,0,0.5)" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#000", flex: A.isWide ? "1 1 55%" : "none", display: "flex", alignItems: "center", justifyContent: "center", maxHeight: A.isWide ? "92vh" : "46vh" } }, /* @__PURE__ */ React.createElement("img", { src: post.img, alt: "", style: { width: "100%", height: "100%", maxHeight: A.isWide ? "92vh" : "46vh", objectFit: "contain", display: "block" } })), /* @__PURE__ */ React.createElement("div", { style: { flex: A.isWide ? "1 1 45%" : "1", minWidth: 0, display: "flex", flexDirection: "column", maxHeight: A.isWide ? "92vh" : "46vh" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRadius: "50%", background: author.avatar_color || BS.brand, display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: 14, overflow: "hidden", flexShrink: 0 } }, author.avatar_url ? /* @__PURE__ */ React.createElement("img", { src: author.avatar_url, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : author.initials), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 800, color: BS.ink } }, author.username), author.status && author.status !== "nuevo" && /* @__PURE__ */ React.createElement(StatusChip, { status: author.status, lang: "es", size: "sm" })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft } }, data && data.location || post.location || post.city || "", " ", data ? "\xB7 " + rel(data.created_at) : "")), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { background: BS.surface2, border: "none", width: 30, height: 30, borderRadius: "50%", cursor: "pointer", color: BS.ink2, fontSize: 15 } }, "\u2715")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "14px 16px" }, className: "bs-scr" }, data && data.caption || post.caption ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, color: BS.ink, lineHeight: 1.55, marginBottom: 14 } }, /* @__PURE__ */ React.createElement("b", null, author.username), " ", data && data.caption || post.caption) : null, loading && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: BS.soft } }, "Cargando comentarios\u2026"), !loading && comments.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: BS.soft } }, "S\xE9 el primero en comentar."), comments.map((c) => /* @__PURE__ */ React.createElement("div", { key: c.id, style: { display: "flex", gap: 10, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 30, height: 30, borderRadius: "50%", background: c.color || BS.brand, display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: 11, overflow: "hidden", flexShrink: 0 } }, c.avatar_url ? /* @__PURE__ */ React.createElement("img", { src: c.avatar_url, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : c.initials), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: BS.ink, lineHeight: 1.45 } }, /* @__PURE__ */ React.createElement("b", null, c.username), " ", c.text), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: BS.soft, marginTop: 2 } }, rel(c.created_at)))))), /* @__PURE__ */ React.createElement("div", { style: { borderTop: `1px solid ${BS.border}`, padding: "10px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: doLike, className: "bs-btn", style: { display: "flex", alignItems: "center", gap: 6, color: liked ? BS.like : BS.ink2, fontWeight: 700, fontSize: 13 } }, /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: liked ? BS.like : "none", stroke: liked ? BS.like : BS.ink2, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" })), likeCount), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: BS.soft } }, comments.length, " comentarios")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: text,
      onChange: (e) => setText(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") send();
      },
      placeholder: A.me ? "Escribe un comentario\u2026" : "Inicia sesi\xF3n para comentar",
      disabled: !A.me,
      style: { flex: 1, border: `1px solid ${BS.border}`, borderRadius: 999, background: BS.bg, padding: "10px 14px", fontSize: 13.5, color: BS.ink, fontFamily: "inherit", outline: "none" }
    }
  ), /* @__PURE__ */ React.createElement("button", { onClick: send, disabled: !text.trim() || sending || !A.me, style: { width: 38, height: 38, borderRadius: "50%", border: "none", background: BS.brand, color: "#fff", cursor: text.trim() && A.me ? "pointer" : "default", opacity: text.trim() && A.me ? 1 : 0.5, display: "grid", placeItems: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M22 2L11 13" }), /* @__PURE__ */ React.createElement("path", { d: "M22 2l-7 20-4-9-9-4 20-7z" }))))))));
}
function FeedScreen({ posts, toggleLike, toggleSave, setScreen, onOpenPost }) {
  const BS = useBS();
  const [filt, setFilt] = useState("Para ti");
  const FBNAV = [
    { id: "feed", label: "Inicio", p: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
    { id: "community", label: "Comunidad", p: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>' },
    { id: "events", label: "Eventos", p: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>' },
    { id: "pack", label: "Mi Pack", p: '<circle cx="7" cy="9" r="1.7"/><circle cx="12" cy="7.4" r="1.7"/><circle cx="17" cy="9" r="1.7"/><path d="M12 12c-2.4 0-4.3 1.9-4.3 3.9 0 1.5 1.2 2.4 2.6 2.4 .8 0 1.1-.4 1.7-.4s.9 .4 1.7 .4c1.4 0 2.6-.9 2.6-2.4 0-2-1.9-3.9-4.3-3.9z"/>' },
    { id: "account", label: "Cuenta", p: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M8 4v4"/>' },
    { id: "profile", label: "Perfil", p: '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>' }
  ];
  return /* @__PURE__ */ React.createElement("div", { style: { background: BS.bg } }, /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface, padding: "10px 14px 0", position: "sticky", top: 0, zIndex: 11, borderBottom: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 21, fontWeight: 800, letterSpacing: "-0.04em", background: BS.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", flexShrink: 0 } }, "B Social"), /* @__PURE__ */ React.createElement("button", { className: "bs-btn", onClick: () => setScreen("discover"), style: { flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 8, background: BS.surface2, border: `1px solid ${BS.border}`, borderRadius: 999, padding: "9px 14px", cursor: "pointer", textAlign: "left" } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: BS.soft, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "8" }), /* @__PURE__ */ React.createElement("path", { d: "m21 21-4.35-4.35" })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: BS.soft, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, "Buscar en B Social")), /* @__PURE__ */ React.createElement("button", { className: "bs-btn", onClick: () => setScreen("messages"), style: { flexShrink: 0, color: BS.ink2, position: "relative", width: 38, height: 38, borderRadius: "50%", background: BS.surface2, border: `1px solid ${BS.border}`, display: "grid", placeItems: "center", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: -1, right: -1, width: 9, height: 9, borderRadius: "50%", background: BS.rose, border: `2px solid ${BS.surface}` } }))), /* @__PURE__ */ React.createElement("div", { className: "bs-hscr", style: { display: "flex", gap: 2, marginTop: 6 } }, FBNAV.map((n) => {
    const on = n.id === "feed";
    return /* @__PURE__ */ React.createElement("button", { key: n.id, onClick: () => setScreen(n.id), className: "bs-btn", style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "7px 2px 7px", background: "transparent", border: "none", borderBottom: `2.5px solid ${on ? BS.brand : "transparent"}`, cursor: "pointer", fontFamily: "inherit" } }, /* @__PURE__ */ React.createElement("svg", { width: "21", height: "21", viewBox: "0 0 24 24", fill: "none", stroke: on ? BS.brand : BS.soft, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", dangerouslySetInnerHTML: { __html: n.p } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9.5, fontWeight: on ? 700 : 600, color: on ? BS.brand : BS.soft, whiteSpace: "nowrap" } }, n.label));
  }))), /* @__PURE__ */ React.createElement("div", { className: "bs-hscr", style: { background: BS.surface, padding: "8px 14px 10px", display: "flex", gap: 7, borderBottom: `1px solid ${BS.border}` } }, ["Para ti", "Mi Pack", "Razas", "Cerca de mi"].map((f) => {
    const on = filt === f;
    return /* @__PURE__ */ React.createElement("button", { key: f, onClick: () => setFilt(f), className: "bs-btn", style: { padding: "7px 16px", borderRadius: 999, border: `1.5px solid ${on ? BS.brand : BS.border}`, background: "transparent", color: on ? BS.brand : BS.ink2, fontSize: 12.5, fontWeight: on ? 700 : 600, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" } }, f);
  })), /* @__PURE__ */ React.createElement(StoriesBar, null), posts.map((p) => /* @__PURE__ */ React.createElement(PostCard, { key: p.id, post: p, onLike: toggleLike, onSave: toggleSave, onOpen: onOpenPost })), /* @__PURE__ */ React.createElement("div", { style: { height: 20 } }));
}
function ProfileScreen({ posts, setScreen }) {
  const BS = useBS();
  const A = typeof window !== "undefined" && window.BSAUTH || {};
  const r = A.me;
  const me = r && r.username ? { username: r.username, name: r.display_name || r.username, city: r.city || "", bio: r.bio || (r.pet_name ? r.pet_name + (r.pet_breed ? " \xB7 " + r.pet_breed : "") : ""), initials: (r.username || "?").slice(0, 2).toUpperCase(), color: r.avatar_color || BS.brand, verified: r.username === "brightpuppy", posts: 0, followers: 0, following: (A.following || []).length } : BSDATA.me;
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
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { height: 110, background: r && r.cover_url ? `url(${r.cover_url}) center/cover` : BS.grad, position: "relative" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setScreen("feed"), style: { position: "absolute", top: 44, left: 14, background: "rgba(0,0,0,0.32)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "grid", placeItems: "center", color: "#fff" } }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M19 12H5M12 19l-7-7 7-7" }))), /* @__PURE__ */ React.createElement("a", { href: "/", style: { position: "absolute", top: 44, right: 14, background: "rgba(0,0,0,0.32)", borderRadius: 999, padding: "6px 12px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, color: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none" } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" })), "BPuppy"), /* @__PURE__ */ React.createElement("button", { onClick: () => setScreen("editprofile"), title: "Cambiar portada", style: { position: "absolute", bottom: 8, right: 14, background: "rgba(0,0,0,0.32)", border: "none", borderRadius: 999, padding: "5px 10px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, color: "#fff", fontSize: 11, fontWeight: 700 } }, /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "13", r: "4" })), "Portada")), /* @__PURE__ */ React.createElement("div", { style: { padding: "0 16px 16px", background: BS.surface, borderBottom: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: -28, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 72, height: 72, borderRadius: "50%", background: me.color, display: "grid", placeItems: "center", fontSize: 24, fontWeight: 800, color: "#fff", border: `3px solid ${BS.bg}`, fontFamily: "Plus Jakarta Sans,sans-serif" } }, me.initials), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setScreen("editprofile"), style: { padding: "8px 16px", borderRadius: 10, border: "none", background: BS.grad, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", color: "#fff" } }, "Editar perfil"), /* @__PURE__ */ React.createElement("button", { onClick: () => A.logout && A.logout(), title: "Cambiar de usuario", style: { padding: "8px 14px", borderRadius: 10, border: `1.5px solid ${BS.borderStrong}`, background: BS.surface2, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", color: BS.ink } }, "Salir"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18, fontWeight: 800, color: BS.ink } }, me.username), me.verified && /* @__PURE__ */ React.createElement(BSVerified, { size: 16 })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: BS.ink2, marginBottom: 8 } }, me.name, " \xB7 ", me.city), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 } }, /* @__PURE__ */ React.createElement(StatusChip, { status: r && r.status || "nuevo", lang: "es" }), /* @__PURE__ */ React.createElement(BadgeChips, { badges: r && r.badges || [], lang: "es" })), r && r.free_grooming > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#1EB87A", background: "rgba(30,184,122,0.1)", border: "1px solid rgba(30,184,122,0.3)", borderRadius: 999, padding: "4px 11px", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M20 12v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8" }), /* @__PURE__ */ React.createElement("rect", { x: "2", y: "7", width: "20", height: "5", rx: "1" }), /* @__PURE__ */ React.createElement("path", { d: "M12 22V7M12 7C12 7 11 2 8 2a2.5 2.5 0 000 5M12 7s1-5 4-5a2.5 2.5 0 010 5" })), r.free_grooming, " grooming gratis en FL"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: BS.ink, marginBottom: 14 } }, me.bio), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 24 } }, [{ n: me.posts, l: "posts" }, { n: me.followers, l: "seguidores" }, { n: me.following, l: "siguiendo" }].map((s) => /* @__PURE__ */ React.createElement("div", { key: s.l }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18, fontWeight: 800, color: BS.ink } }, s.n), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.soft } }, s.l))))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px", background: BS.surface, borderBottom: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 14, border: `1.5px solid ${isPublic ? BS.brand : BS.border}`, background: isPublic ? "rgba(14,165,233,0.07)" : BS.surface2 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink } }, "Perfil p\xFAblico"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft, lineHeight: 1.45 } }, isPublic ? "Visible en Comunidad: tu usuario, ciudad y tu mascota (nombre y raza). Nunca tu contacto." : "Tu perfil es privado. Act\xEDvalo para aparecer en Comunidad.")), /* @__PURE__ */ React.createElement("button", { onClick: () => persistPublic(!isPublic), className: "bs-btn", style: { width: 46, height: 26, borderRadius: 999, background: isPublic ? BS.grad : BS.border, position: "relative", flexShrink: 0, cursor: "pointer", border: "none" } }, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 3, left: isPublic ? 23 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" } }))), /* @__PURE__ */ React.createElement("button", { onClick: () => setScreen("account"), className: "bs-btn", style: { display: "flex", alignItems: "center", gap: 12, width: "100%", marginTop: 10, padding: "13px 14px", borderRadius: 14, border: `1.5px solid ${BS.border}`, background: BS.surface2, cursor: "pointer", fontFamily: "inherit", textAlign: "left" } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, color: BS.brand, display: "inline-flex" } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M3 10h18M8 4v4" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink } }, "Mi Cuenta"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft } }, "Mascotas, grooming, pagos y membres\xEDas \xB7 privado")), /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: BS.soft, strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M9 18l6-6-6-6" })))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", background: BS.surface, borderBottom: `1px solid ${BS.border}` } }, [["posts", "Posts"], ["pets", "Mascotas"], ["saved", "Guardados"]].map(([t, lbl]) => /* @__PURE__ */ React.createElement("button", { key: t, onClick: () => setTab(t), style: { flex: 1, padding: "13px", border: "none", background: "none", cursor: "pointer", borderBottom: `2.5px solid ${tab === t ? BS.brand : "transparent"}`, fontSize: 13, fontWeight: 700, color: tab === t ? BS.brand : BS.soft, fontFamily: "inherit" } }, lbl))), tab === "posts" && /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 } }, posts.slice(0, 6).map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, style: { aspectRatio: "1", overflow: "hidden", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("img", { src: p.img, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })))), tab === "pets" && /* @__PURE__ */ React.createElement("div", { style: { padding: 16 } }, BSDATA.pets.map((pet) => /* @__PURE__ */ React.createElement("div", { key: pet.id, className: "bs-pop", style: { background: BS.surface, borderRadius: 18, overflow: "hidden", border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("img", { src: pet.img, alt: "", style: { width: "100%", height: 160, objectFit: "cover", display: "block" } }), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: BS.ink } }, pet.name), pet.bpuppy && /* @__PURE__ */ React.createElement("span", { style: { background: BS.brand, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 999 } }, "BrightPuppy")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: BS.ink2 } }, pet.breed, " \xB7 ", pet.gender, " \xB7 ", pet.dob))))), tab === "saved" && /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 } }, posts.filter((p) => p.saved).map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, style: { aspectRatio: "1", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("img", { src: p.img, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })))));
}
function PackScreen({ setScreen }) {
  const BS = useBS();
  const [added, setAdded] = useState(/* @__PURE__ */ new Set());
  const toggle = (id) => setAdded((s) => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 10px", display: "flex", alignItems: "center", background: BS.surface, borderBottom: `1px solid ${BS.border}`, position: "sticky", top: 0, zIndex: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: BS.ink, flex: 1 } }, "Mi Pack"), /* @__PURE__ */ React.createElement("div", { style: { background: BS.grad, color: "#fff", borderRadius: 999, padding: "2px 10px", fontSize: 12, fontWeight: 700 } }, BSDATA.pack.length)), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px", background: BS.surface, borderBottom: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface2, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 9 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: BS.soft, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "8" }), /* @__PURE__ */ React.createElement("path", { d: "m21 21-4.35-4.35" })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13.5, color: BS.soft } }, "Buscar en tu Pack..."))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 6px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: BS.soft, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" } }, "Sugerencias"), /* @__PURE__ */ React.createElement("div", { className: "bs-hscr", style: { display: "flex", gap: 10 } }, BSDATA.suggestions.map((u) => /* @__PURE__ */ React.createElement("div", { key: u.id, style: { flexShrink: 0, background: BS.surface, borderRadius: 18, padding: "14px 12px", width: 120, textAlign: "center", border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement(BSAvatar, { user: u, size: 44 }), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 11.5, fontWeight: 700, color: BS.ink, marginBottom: 1 } }, u.username), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: BS.soft, marginBottom: 8 } }, u.pet), /* @__PURE__ */ React.createElement("button", { onClick: () => toggle(u.id), className: "bs-btn", style: { width: "100%", padding: "6px", borderRadius: 8, border: "none", background: added.has(u.id) ? BS.surface2 : BS.grad, color: added.has(u.id) ? BS.ink2 : "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, added.has(u.id) ? "En Pack" : "+ Pack"))))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 0 0" } }, BSDATA.pack.map((u, i) => /* @__PURE__ */ React.createElement("div", { key: u.id, style: { display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", background: BS.surface, borderBottom: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(BSAvatar, { user: u, size: 44 }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 1, right: 1, width: 10, height: 10, borderRadius: "50%", background: i < 2 ? BS.online : BS.border, border: `2px solid ${BS.bg}` } })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 700, color: BS.ink } }, u.username), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft } }, u.city, " \xB7 ", u.pet)), /* @__PURE__ */ React.createElement("button", { className: "bs-btn", style: { padding: "7px 14px", borderRadius: 9, border: `1.5px solid ${BS.borderStrong}`, background: "none", fontSize: 12, fontWeight: 600, color: BS.ink2, cursor: "pointer", fontFamily: "inherit" } }, "Mensaje")))));
}
function DiscoverScreen() {
  const BS = useBS();
  const [filter, setFilter] = useState("todos");
  const filters = [{ id: "todos", label: "Todos" }, { id: "park", label: "Parques" }, { id: "cafe", label: "Cafes" }, { id: "vet", label: "Vets" }, { id: "store", label: "Tiendas" }];
  const filtered = filter === "todos" ? BSDATA.places : BSDATA.places.filter((p) => p.type === filter);
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 10px", background: BS.surface, borderBottom: `1px solid ${BS.border}`, position: "sticky", top: 0, zIndex: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: BS.ink, marginBottom: 10 } }, "Descubrir"), /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface2, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 9, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: BS.soft, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "8" }), /* @__PURE__ */ React.createElement("path", { d: "m21 21-4.35-4.35" })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13.5, color: BS.soft } }, "Buscar lugares, eventos...")), /* @__PURE__ */ React.createElement("div", { className: "bs-hscr", style: { display: "flex", gap: 7 } }, filters.map((f) => /* @__PURE__ */ React.createElement("button", { key: f.id, onClick: () => setFilter(f.id), className: "bs-btn", style: { padding: "6px 13px", borderRadius: 999, border: "none", background: filter === f.id ? BS.brand : BS.surface2, color: filter === f.id ? "#fff" : BS.ink2, fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" } }, f.label)))), /* @__PURE__ */ React.createElement("div", { style: { height: 150, background: BS.surface2, position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("svg", { style: { position: "absolute", inset: 0, width: "100%", height: "100%" }, viewBox: "0 0 400 150", preserveAspectRatio: "xMidYMid slice" }, /* @__PURE__ */ React.createElement("rect", { width: "400", height: "150", fill: BS.surface2 }), [50, 100, 150, 200, 250, 300, 350].map((x) => /* @__PURE__ */ React.createElement("line", { key: x, x1: x, y1: "0", x2: x, y2: "150", stroke: BS.border, strokeWidth: "1" })), [37, 74, 111].map((y) => /* @__PURE__ */ React.createElement("line", { key: y, x1: "0", y1: y, x2: "400", y2: y, stroke: BS.border, strokeWidth: "1" })), /* @__PURE__ */ React.createElement("path", { d: "M0 75L400 75", stroke: BS.borderStrong, strokeWidth: "3.5" }), /* @__PURE__ */ React.createElement("path", { d: "M155 0L155 150", stroke: BS.borderStrong, strokeWidth: "3.5" }), [[80, 50], [155, 90], [240, 44], [310, 110], [120, 125]].map(([x, y], i) => /* @__PURE__ */ React.createElement("g", { key: i }, /* @__PURE__ */ React.createElement("circle", { cx: x, cy: y, r: "10", fill: BS.brand, opacity: ".9" }), /* @__PURE__ */ React.createElement("text", { x, y: y + 1, textAnchor: "middle", dominantBaseline: "middle", fontSize: "10", fill: "white" }, "\u{1F43E}")))), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 8, right: 10, background: `${BS.surface}cc`, padding: "4px 9px", borderRadius: 8, fontSize: 11, fontWeight: 600, color: BS.ink2, backdropFilter: "blur(8px)" } }, "Miami, FL")), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px 6px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: BS.ink, marginBottom: 10 } }, "Eventos cerca de ti"), /* @__PURE__ */ React.createElement("div", { className: "bs-hscr", style: { display: "flex", gap: 10 } }, BSDATA.events.map((ev, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { flexShrink: 0, background: i === 0 ? BS.grad : BS.surface, borderRadius: 16, padding: "14px", width: 155, border: `1px solid ${BS.border}`, boxShadow: i === 0 ? BS.glow : "none" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 24, marginBottom: 7 } }, ev.emoji), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: i === 0 ? "#fff" : BS.ink, lineHeight: 1.3, marginBottom: 5 } }, ev.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: i === 0 ? "rgba(255,255,255,0.7)" : BS.soft } }, ev.date))))), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 16px 20px" } }, filtered.map((pl) => /* @__PURE__ */ React.createElement("div", { key: pl.id, style: { background: BS.surface, borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: 8, border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { width: 42, height: 42, borderRadius: 12, background: BS.surface2, display: "grid", placeItems: "center", fontSize: 20, flexShrink: 0 } }, pl.emoji), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink } }, pl.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft } }, pl.note)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: BS.ink } }, "\u2B50 ", pl.rating)))));
}
function UploadScreen({ setScreen }) {
  const BS = useBS();
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
      setErr("El archivo supera 25 MB");
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
        if (!(d && d.ok)) throw new Error(d && d.error || "No se pudo publicar");
      }
      setScreen("feed");
    } catch (e) {
      setErr(e && e.message || "No se pudo subir el archivo");
      setUploading(false);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*,video/mp4,video/quicktime", onChange: pickFile, style: { display: "none" } }), /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${BS.border}`, position: "sticky", top: 0, zIndex: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => step > 0 ? setStep((s) => s - 1) : setScreen("feed"), className: "bs-btn", style: { color: BS.ink2, fontSize: 18 } }, step === 0 ? "\u2715" : "\u2039"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 17, fontWeight: 700, color: BS.ink, flex: 1 } }, ["Nueva publicaci\xF3n", "Agregar detalles", "Publicando\u2026", "Listo"][step]), step === 1 && /* @__PURE__ */ React.createElement("button", { onClick: startScan, className: "bs-btn", style: { background: BS.grad, color: "#fff", border: "none", padding: "7px 16px", borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, "Siguiente")), step === 0 && /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 16 } }, /* @__PURE__ */ React.createElement("div", { onClick: () => fileRef.current && fileRef.current.click(), style: { width: "100%", aspectRatio: "1", maxWidth: 280, borderRadius: 20, border: `2px dashed ${BS.borderStrong}`, background: BS.surface, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 64, height: 64, borderRadius: 20, background: BS.surface2, display: "grid", placeItems: "center", color: BS.brand } }, /* @__PURE__ */ React.createElement("svg", { width: "30", height: "30", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3.2" }), /* @__PURE__ */ React.createElement("path", { d: "M8 5l1.5-2h5L16 5" }))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: BS.ink } }, "Sube tu foto o video"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: BS.soft, marginTop: 3 } }, "JPG, PNG, WEBP, MP4 \xB7 hasta 25 MB"))), err && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.like, fontWeight: 600 } }, err), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, width: "100%", maxWidth: 280 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => fileRef.current && fileRef.current.click(), className: "bs-btn", style: { flex: 1, padding: "13px", borderRadius: 14, border: "none", background: BS.grad, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, "Elegir archivo"))), step === 1 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, padding: "14px 16px", alignItems: "flex-start", borderBottom: `1px solid ${BS.border}`, background: BS.surface } }, isVideo ? /* @__PURE__ */ React.createElement("video", { src: preview, style: { width: 70, height: 70, objectFit: "cover", borderRadius: 12, background: "#000" }, muted: true }) : /* @__PURE__ */ React.createElement("img", { src: preview || "assets/photos/g04.webp", alt: "", style: { width: 70, height: 70, objectFit: "cover", borderRadius: 12 } }), /* @__PURE__ */ React.createElement("textarea", { value: caption, onChange: (e) => setCaption(e.target.value), placeholder: "Escribe un pie de foto...", style: { flex: 1, border: "none", background: "none", resize: "none", fontSize: 14, color: BS.ink, lineHeight: 1.55, minHeight: 80, padding: 0 } })), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", background: BS.surface, marginTop: 8, display: "flex", alignItems: "center", gap: 9 } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: BS.brand, strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("path", { d: "M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "10", r: "2.5" })), /* @__PURE__ */ React.createElement("input", { value: loc, onChange: (e) => setLoc(e.target.value), placeholder: "Agregar ubicaci\xF3n (para \xABCerca de m\xED\xBB)", style: { flex: 1, border: "none", background: "none", fontSize: 13.5, color: BS.ink, fontFamily: "inherit" } })), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px", background: BS.surface, marginTop: 8 } }, [["public", "P\xFAblico", "Todos pueden ver"], ["pack", "Solo mi Pack", "Solo mis amigos"], ["private", "Privado", "Solo yo"]].map(([v, l, sub]) => /* @__PURE__ */ React.createElement("div", { key: v, onClick: () => setVis(v), style: { display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 12, border: `1.5px solid ${vis === v ? BS.brand : BS.border}`, background: vis === v ? "rgba(14,165,233,0.08)" : BS.surface2, cursor: "pointer", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink } }, l), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft } }, sub)), /* @__PURE__ */ React.createElement("div", { style: { width: 18, height: 18, borderRadius: "50%", border: `2px solid ${vis === v ? BS.brand : BS.borderStrong}`, background: vis === v ? BS.brand : "transparent", display: "grid", placeItems: "center" } }, vis === v && /* @__PURE__ */ React.createElement("div", { style: { width: 7, height: 7, borderRadius: "50%", background: "#fff" } })))))), step === 2 && /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, gap: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", width: "100%", maxWidth: 240, borderRadius: 20, overflow: "hidden" } }, isVideo ? /* @__PURE__ */ React.createElement("video", { src: preview, style: { width: "100%", aspectRatio: "1", objectFit: "cover", display: "block", background: "#000" }, muted: true }) : /* @__PURE__ */ React.createElement("img", { src: preview || "assets/photos/g04.webp", alt: "", style: { width: "100%", aspectRatio: "1", objectFit: "cover", display: "block" } }), (scanState === "scanning" || uploading) && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, right: 0, height: 3, background: BS.brand, boxShadow: `0 0 18px ${BS.brand}`, animation: "bsScan 1.1s ease-in-out infinite" } })), scanState === "approved" && !uploading && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "rgba(0,232,122,0.14)", display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement("div", { className: "bs-pop", style: { background: "rgba(0,232,122,0.9)", borderRadius: "50%", width: 56, height: 56, display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M20 6L9 17l-5-5" }))))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, uploading && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: BS.ink, marginBottom: 6 } }, "Subiendo\u2026"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: BS.soft } }, "Guardando tu publicaci\xF3n")), !uploading && scanState === "scanning" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 700, color: BS.ink, marginBottom: 6 } }, "Revisando contenido\u2026"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: BS.soft } }, "Verificamos que todo sea seguro")), !uploading && scanState === "approved" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 17, fontWeight: 800, color: BS.online, marginBottom: 5 } }, "Listo para compartir"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: BS.soft, marginBottom: 18 } }, "Toca para publicar en la comunidad"), err && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.like, fontWeight: 600, marginBottom: 12 } }, err), /* @__PURE__ */ React.createElement("button", { onClick: doPublish, className: "bs-btn", style: { padding: "14px 44px", borderRadius: 14, border: "none", background: BS.grad, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: BS.glow } }, "Publicar ahora")))));
}
function PetsScreen() {
  const BS = useBS();
  const pet = BSDATA.pets[0];
  const maxW = Math.max(...pet.weight.map((w) => w.v));
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px", background: BS.surface, borderBottom: `1px solid ${BS.border}`, position: "sticky", top: 0, zIndex: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: BS.ink } }, "Mis Mascotas")), /* @__PURE__ */ React.createElement("div", { style: { margin: "14px 16px 0", background: BS.surface, borderRadius: 20, overflow: "hidden", border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement("img", { src: pet.img, alt: "", style: { width: "100%", height: 170, objectFit: "cover", display: "block" } }), pet.bpuppy && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 12, right: 12, background: BS.brand, color: "#fff", padding: "4px 12px", borderRadius: 999, fontSize: 11.5, fontWeight: 700 } }, "BrightPuppy")), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 9, marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, color: BS.ink } }, pet.name), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: BS.brand, background: "rgba(255,85,32,0.12)", padding: "2px 10px", borderRadius: 999 } }, pet.breed)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.soft } }, pet.gender, " \xB7 Nacio ", pet.dob))), /* @__PURE__ */ React.createElement("div", { style: { margin: "12px 16px 0", background: BS.surface, borderRadius: 16, overflow: "hidden", border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", borderBottom: `1px solid ${BS.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 700, color: BS.ink } }, "Vacunas"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: BS.soft } }, pet.vaccines.filter((v) => v.done).length, "/", pet.vaccines.length)), pet.vaccines.map((v) => /* @__PURE__ */ React.createElement("div", { key: v.name, style: { display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", borderBottom: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { width: 32, height: 32, borderRadius: "50%", background: v.done ? "rgba(0,232,122,0.12)" : "rgba(255,85,32,0.1)", display: "grid", placeItems: "center", fontSize: 14 } }, v.done ? "\u2705" : "\u23F0"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: BS.ink } }, v.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft } }, v.date)), v.upcoming && /* @__PURE__ */ React.createElement("span", { style: { background: "rgba(255,85,32,0.1)", color: BS.brand, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999 } }, "Proxima")))), /* @__PURE__ */ React.createElement("div", { style: { margin: "12px 16px 20px", background: BS.surface, borderRadius: 16, padding: "14px 16px", border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: BS.ink, marginBottom: 14 } }, "Peso (kg)"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-end", gap: 8, height: 80 } }, pet.weight.map((w) => /* @__PURE__ */ React.createElement("div", { key: w.m, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: BS.soft, fontWeight: 600 } }, w.v), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", background: BS.grad, borderRadius: "4px 4px 0 0", height: `${w.v / maxW * 70}px` } }), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: BS.soft } }, w.m))))));
}
function MessagesThread({ m, BS, onBack }) {
  const [msgs, setMsgs] = useState(() => [
    { from: "them", text: m.preview, time: m.time }
  ]);
  const [draft, setDraft] = useState("");
  const send = () => {
    const t = draft.trim();
    if (!t) return;
    setMsgs((prev) => [...prev, { from: "me", text: t, time: "ahora" }]);
    setDraft("");
  };
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", background: BS.surface, borderBottom: `1px solid ${BS.border}`, display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: onBack, className: "bs-btn", style: { color: BS.ink2, fontSize: 16 } }, "<"), /* @__PURE__ */ React.createElement(BSAvatar, { user: m, size: 36 }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14.5, fontWeight: 700, color: BS.ink } }, m.user), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: m.online ? BS.online : BS.soft } }, m.online ? "En l\xEDnea" : "Desconectado"))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 8 } }, msgs.map((x, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { alignSelf: x.from === "me" ? "flex-end" : "flex-start", maxWidth: "76%" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "9px 13px", borderRadius: 16, fontSize: 13.5, lineHeight: 1.4, background: x.from === "me" ? BS.brand : BS.surface, color: x.from === "me" ? "#fff" : BS.ink, border: x.from === "me" ? "none" : `1px solid ${BS.border}`, borderBottomRightRadius: x.from === "me" ? 4 : 16, borderBottomLeftRadius: x.from === "me" ? 16 : 4 } }, x.text), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: BS.soft, marginTop: 3, textAlign: x.from === "me" ? "right" : "left" } }, x.time))), /* @__PURE__ */ React.createElement("div", { style: { alignSelf: "center", margin: "8px 0", padding: "8px 12px", borderRadius: 10, background: BS.surface2, border: `1px solid ${BS.border}`, fontSize: 11, color: BS.soft, textAlign: "center", maxWidth: "90%" } }, "La mensajer\xEDa en tiempo real entre miembros est\xE1 activ\xE1ndose. Por ahora puedes ver tus conversaciones y redactar; el env\xEDo entre cuentas llegar\xE1 muy pronto.")), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 16px", background: BS.surface, borderTop: `1px solid ${BS.border}`, display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("input", { value: draft, onChange: (e) => setDraft(e.target.value), onKeyDown: (e) => {
    if (e.key === "Enter") send();
  }, placeholder: "Escribe un mensaje\u2026", style: { flex: 1, border: `1px solid ${BS.border}`, borderRadius: 999, background: BS.bg, padding: "10px 15px", fontSize: 13.5, color: BS.ink, fontFamily: "inherit", outline: "none" } }), /* @__PURE__ */ React.createElement("button", { onClick: send, style: { width: 40, height: 40, borderRadius: "50%", border: "none", background: BS.brand, color: "#fff", cursor: "pointer", display: "grid", placeItems: "center", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M22 2L11 13" }), /* @__PURE__ */ React.createElement("path", { d: "M22 2l-7 20-4-9-9-4 20-7z" })))));
}
function MessagesScreen({ setScreen }) {
  const BS = useBS();
  const [active, setActive] = useState(null);
  if (active) return /* @__PURE__ */ React.createElement(MessagesThread, { m: active, BS, onBack: () => setActive(null) });
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px", background: BS.surface, borderBottom: `1px solid ${BS.border}`, display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setScreen("feed"), className: "bs-btn", style: { color: BS.ink2, fontSize: 16 } }, "<"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: BS.ink } }, "Mensajes")), BSDATA.messages.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, onClick: () => setActive(m), style: { display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", background: BS.surface, borderBottom: `1px solid ${BS.border}`, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(BSAvatar, { user: m, size: 46 }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: 1, right: 1, width: 11, height: 11, borderRadius: "50%", background: m.online ? BS.online : BS.border, border: `2px solid ${BS.bg}` } })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: m.unread ? 700 : 600, color: BS.ink } }, m.user), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: BS.soft } }, m.time)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: m.unread ? BS.ink2 : BS.soft, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, m.preview)), m.unread && /* @__PURE__ */ React.createElement("div", { style: { width: 9, height: 9, borderRadius: "50%", background: BS.brand, flexShrink: 0 } }))));
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
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement(ScreenHeader, { title: "Comunidad", sub: "Due\xF1os que comparten su perfil p\xFAblico" }), /* @__PURE__ */ React.createElement(SearchBar, { value: q, onChange: setQ, placeholder: "Buscar por nombre, ciudad o raza\u2026", BS }), /* @__PURE__ */ React.createElement("div", { style: { margin: "8px 16px 4px", padding: "10px 13px", borderRadius: 12, background: "rgba(245,130,32,0.08)", border: `1px solid ${BS.borderStrong}`, fontSize: 11.5, color: BS.ink2, lineHeight: 1.5 } }, "Tu perfil es ", /* @__PURE__ */ React.createElement("b", { style: { color: BS.ink } }, "privado por defecto"), ". Solo apareces aqu\xED si activas \u201Cperfil p\xFAblico\u201D, y solo con los datos que t\xFA elijas."), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12, padding: "8px 16px 22px" } }, list.map((m) => {
    const fol = following.has(m.id);
    return /* @__PURE__ */ React.createElement("div", { key: m.id, className: "bs-pop", style: { background: BS.surface, borderRadius: 18, overflow: "hidden", border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { height: 84, position: "relative", background: BS.surface2 } }, /* @__PURE__ */ React.createElement("img", { src: m.pet.img, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }, loading: "lazy" }), m.bpuppy && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 8, left: 8, background: BS.grad, color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 999 } }, "BrightPuppy")), /* @__PURE__ */ React.createElement("div", { style: { padding: "0 13px 13px", marginTop: -22, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 46, height: 46, borderRadius: "50%", background: m.color, display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: 16, border: `3px solid ${BS.surface}`, margin: "0 auto 6px", overflow: "hidden" } }, m.avatar ? /* @__PURE__ */ React.createElement("img", { src: m.avatar, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : m.initials), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 800, color: BS.ink } }, m.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.soft, marginBottom: 6 } }, m.city), m.status && m.status !== "nuevo" && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 7, display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React.createElement(StatusChip, { status: m.status, lang: "es", size: "sm" })), (m.pet.name || m.pet.breed) && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.brand, fontWeight: 700, background: "rgba(245,130,32,0.1)", borderRadius: 999, padding: "2px 9px", display: "inline-block", marginBottom: 9 } }, [m.pet.name, m.pet.breed].filter(Boolean).join(" \xB7 ")), /* @__PURE__ */ React.createElement("button", { onClick: () => toggle(m), className: "bs-btn", style: { width: "100%", padding: "7px", borderRadius: 999, border: `1.5px solid ${fol ? BS.border : BS.brand}`, background: "transparent", color: fol ? BS.soft : BS.brand, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, fol ? "Siguiendo" : "Seguir")));
  }), list.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1", textAlign: "center", color: BS.soft, fontSize: 13, padding: "30px 0" } }, "Nadie coincide con tu b\xFAsqueda todav\xEDa.")));
}
function EventsScreen() {
  const BS = useBS();
  const [going, setGoing] = useState(/* @__PURE__ */ new Set());
  const toggle = (id) => setGoing((s) => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement(ScreenHeader, { title: "Eventos BPuppy", sub: "Reuniones y actividades de la comunidad" }), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 22px", display: "flex", flexDirection: "column", gap: 14 } }, BSDATA.bpuppyEvents.map((ev) => {
    const on = going.has(ev.id);
    return /* @__PURE__ */ React.createElement("div", { key: ev.id, className: "bs-pop", style: { background: BS.surface, borderRadius: 18, overflow: "hidden", border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("img", { src: ev.img, alt: "", style: { width: "100%", height: 150, objectFit: "cover", display: "block" }, loading: "lazy" }), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 16.5, fontWeight: 800, color: BS.ink, lineHeight: 1.25, marginBottom: 5 } }, ev.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.brand, fontWeight: 700, marginBottom: 2 } }, ev.date), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: BS.soft, marginBottom: 12 } }, ev.place), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => toggle(ev.id), className: "bs-btn", style: { padding: "9px 20px", borderRadius: 11, border: "none", background: on ? BS.surface2 : BS.grad, color: on ? BS.ink : "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: on ? "none" : BS.glow } }, on ? "Asistir\xE1s \u2713" : "Asistir"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: BS.soft } }, ev.attendees + (on ? 1 : 0), " asistentes"))));
  })));
}
function NewsScreen() {
  const BS = useBS();
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement(ScreenHeader, { title: "Noticias", sub: "Novedades de BrightPuppy" }), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 22px", display: "flex", flexDirection: "column", gap: 14 } }, BSDATA.news.map((n) => /* @__PURE__ */ React.createElement("div", { key: n.id, className: "bs-pop", style: { background: BS.surface, borderRadius: 18, overflow: "hidden", border: `1px solid ${BS.border}`, display: "flex", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("img", { src: n.img, alt: "", style: { width: 108, height: 108, objectFit: "cover", flexShrink: 0, display: "block" }, loading: "lazy" }), /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px", minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "inline-block", fontSize: 9.5, fontWeight: 800, color: BS.brand, background: "rgba(14,165,233,0.1)", borderRadius: 999, padding: "2px 8px", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" } }, n.tag), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: BS.ink, lineHeight: 1.3, marginBottom: 4 } }, n.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft, marginBottom: 5 } }, n.date), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: BS.ink2, lineHeight: 1.45, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } }, n.excerpt))))));
}
function VideosScreen() {
  const BS = useBS();
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement(ScreenHeader, { title: "Videos", sub: "Mira a la comunidad en acci\xF3n" }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12, padding: "14px 16px 22px" } }, BSDATA.videos.map((v) => /* @__PURE__ */ React.createElement("div", { key: v.id, className: "bs-pop", style: { background: BS.surface, borderRadius: 16, overflow: "hidden", border: `1px solid ${BS.border}`, cursor: "pointer" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", aspectRatio: "16/10" } }, /* @__PURE__ */ React.createElement("img", { src: v.thumb, alt: "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }, loading: "lazy" }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)", display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: BS.brand }, /* @__PURE__ */ React.createElement("path", { d: "M8 5v14l11-7z" })))), /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", bottom: 7, right: 7, background: "rgba(0,0,0,0.7)", color: "#fff", fontSize: 10.5, fontWeight: 700, padding: "2px 7px", borderRadius: 6 } }, v.dur)), /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 12px", fontSize: 12.5, fontWeight: 700, color: BS.ink, lineHeight: 1.3 } }, v.title)))));
}
function PetForm({ BS, initial, petId, onDone, onCancel }) {
  const [f, setF] = useState({ name: initial && initial.name || "", breed: initial && initial.breed || "", size: initial && initial.size || "", sex: initial && initial.sex || "", weight_lbs: initial && initial.weight_lbs || "" });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const inp = { width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${BS.border}`, background: BS.surface2, color: BS.ink, fontFamily: "inherit", fontSize: 13, outline: "none", boxSizing: "border-box" };
  const save = async () => {
    if (!f.name.trim()) {
      setMsg("El nombre es obligatorio.");
      return;
    }
    setBusy(true);
    setMsg("");
    try {
      const A = typeof window !== "undefined" && window.BSAUTH || {};
      const d = petId ? A.updatePet ? await A.updatePet({ id: petId, ...f }) : { error: "No disponible" } : A.addPet ? await A.addPet(f) : { error: "No disponible" };
      if (d && d.error) {
        setMsg(d.error);
        setBusy(false);
        return;
      }
      onDone();
    } catch (e) {
      setMsg("No se pudo guardar.");
      setBusy(false);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface, border: `1px solid ${BS.border}`, borderRadius: 16, padding: 16, marginTop: 4, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: BS.ink, marginBottom: 10 } }, petId ? "Editar mascota" : "Agregar mascota"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { style: { ...inp, gridColumn: "1/-1" }, placeholder: "Nombre *", value: f.name, onChange: (e) => setF({ ...f, name: e.target.value }) }), /* @__PURE__ */ React.createElement("input", { style: inp, placeholder: "Raza", value: f.breed, onChange: (e) => setF({ ...f, breed: e.target.value }) }), /* @__PURE__ */ React.createElement("select", { style: inp, value: f.size, onChange: (e) => setF({ ...f, size: e.target.value }) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Tama\xF1o"), /* @__PURE__ */ React.createElement("option", null, "Peque\xF1o"), /* @__PURE__ */ React.createElement("option", null, "Mediano"), /* @__PURE__ */ React.createElement("option", null, "Grande"), /* @__PURE__ */ React.createElement("option", null, "XL")), /* @__PURE__ */ React.createElement("select", { style: inp, value: f.sex, onChange: (e) => setF({ ...f, sex: e.target.value }) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Sexo"), /* @__PURE__ */ React.createElement("option", null, "Macho"), /* @__PURE__ */ React.createElement("option", null, "Hembra")), /* @__PURE__ */ React.createElement("input", { style: inp, type: "number", placeholder: "Peso (lb)", value: f.weight_lbs, onChange: (e) => setF({ ...f, weight_lbs: e.target.value }) })), msg && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: BS.rose, marginTop: 8 } }, msg), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 12 } }, /* @__PURE__ */ React.createElement("button", { onClick: onCancel, className: "bs-btn", style: { flex: 1, padding: "11px", borderRadius: 10, border: `1.5px solid ${BS.border}`, background: "transparent", color: BS.ink2, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" } }, "Cancelar"), /* @__PURE__ */ React.createElement("button", { onClick: save, disabled: busy, className: "bs-btn", style: { flex: 2, padding: "11px", borderRadius: 10, border: "none", background: BS.grad, color: "#fff", fontWeight: 700, fontSize: 13, cursor: busy ? "default" : "pointer", fontFamily: "inherit", opacity: busy ? 0.7 : 1 } }, busy ? "Guardando\u2026" : petId ? "Guardar cambios" : "Guardar mascota")));
}
function AccountScreen({ setScreen }) {
  const BS = useBS();
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
        setErr("No disponible.");
        setLoading(false);
        return;
      }
      const d2 = await A.accountData();
      if (d2 && d2.error) setErr(d2.error);
      else setData(d2 || {});
    } catch (e) {
      setErr("No pudimos cargar tu cuenta.");
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
      return new Date(String(iso).length <= 10 ? iso + "T00:00:00" : iso).toLocaleDateString("es-US", { day: "numeric", month: "short", year: "numeric" });
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
    if (!window.confirm("\xBFCancelar esta cita? Cancelar con menos de 24h puede tener cargo del 50%.")) return;
    setBkBusy(b.id);
    setBkMsg("");
    try {
      const r = await (window.BSAUTH && window.BSAUTH.manageBooking ? window.BSAUTH.manageBooking("cancel", b.id) : { error: "No disponible" });
      if (r && r.error) {
        setBkMsg(r.error);
      } else {
        setBkMsg(r && r.message ? r.message : "Cita cancelada.");
        await load();
      }
    } catch (e) {
      setBkMsg("No se pudo cancelar.");
    }
    setBkBusy(null);
  };
  const payPlan = async (p) => {
    setPayBusy(p.id);
    try {
      const r = await (window.BSAUTH && window.BSAUTH.payPlan ? window.BSAUTH.payPlan(p.id) : { error: "No disponible" });
      if (r && r.url) {
        window.location.href = r.url;
        return;
      }
      setBkMsg(r && r.error || "No se pudo iniciar el pago.");
    } catch (e) {
      setBkMsg("No se pudo iniciar el pago.");
    }
    setPayBusy(null);
  };
  const TABS = [
    { id: "mascotas", label: "Mascotas", n: pets.length },
    { id: "grooming", label: "Grooming", n: 0 },
    { id: "membresias", label: "Membres\xEDas", n: memberships.length },
    { id: "pagos", label: "Pagos", n: plans.length }
  ];
  const card = { background: BS.surface, border: `1px solid ${BS.border}`, borderRadius: 16, padding: "14px 16px", marginBottom: 12 };
  const row = (k, v, vc) => /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", gap: 12, padding: "4px 0", fontSize: 13 } }, /* @__PURE__ */ React.createElement("span", { style: { color: BS.soft } }, k), /* @__PURE__ */ React.createElement("span", { style: { color: vc || BS.ink, fontWeight: 600, textAlign: "right" } }, v));
  return /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { background: BS.bg, minHeight: "100%" } }, /* @__PURE__ */ React.createElement("div", { style: { background: BS.surface, padding: "12px 16px", position: "sticky", top: 0, zIndex: 11, borderBottom: `1px solid ${BS.border}`, display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setScreen("profile"), className: "bs-btn", style: { background: "transparent", border: "none", color: BS.ink2, cursor: "pointer", display: "grid", placeItems: "center", padding: 0 } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M19 12H5M12 19l-7-7 7-7" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18, fontWeight: 800, color: BS.ink } }, "Mi Cuenta"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: BS.soft } }, "Privado \xB7 solo t\xFA ves esto")), /* @__PURE__ */ React.createElement("a", { href: "/grooming.html", className: "bs-btn", style: { textDecoration: "none", background: BS.grad, color: "#fff", fontSize: 12, fontWeight: 700, padding: "8px 13px", borderRadius: 10 } }, "Agendar")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, margin: "12px 14px 0", padding: "10px 14px", borderRadius: 12, background: BS.surface2, border: `1px solid ${BS.border}` } }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: BS.soft, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M7 11V7a5 5 0 0110 0v4" })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: BS.soft, lineHeight: 1.4 } }, "Tus mascotas, citas, pagos y membres\xEDas son privados \u2014 no aparecen en tu perfil p\xFAblico.")), loading && /* @__PURE__ */ React.createElement("div", { style: { padding: 40, textAlign: "center", color: BS.soft, fontSize: 13 } }, "Cargando tu cuenta\u2026"), !loading && err && /* @__PURE__ */ React.createElement("div", { style: { margin: "16px 14px", background: BS.surface, border: `1px solid ${BS.border}`, borderRadius: 16, padding: "14px 16px", color: BS.rose, fontSize: 13 } }, err, " ", /* @__PURE__ */ React.createElement("button", { onClick: load, style: { marginLeft: 8, color: BS.brand, background: "none", border: "none", cursor: "pointer", fontWeight: 700 } }, "Reintentar")), !loading && !err && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, padding: "12px 14px" } }, [{ n: pets.length, l: "mascotas" }, { n: baths, l: "ba\xF1os disp." }, { n: memberships.length, l: "membres\xEDas" }].map((s) => /* @__PURE__ */ React.createElement("div", { key: s.l, style: { flex: 1, background: BS.surface, border: `1px solid ${BS.border}`, borderRadius: 14, padding: "10px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: BS.ink } }, s.n), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: BS.soft } }, s.l)))), /* @__PURE__ */ React.createElement("div", { className: "bs-hscr", style: { display: "flex", gap: 6, padding: "0 14px 12px", borderBottom: `1px solid ${BS.border}` } }, TABS.map((tb) => {
    const on = tab === tb.id;
    return /* @__PURE__ */ React.createElement("button", { key: tb.id, onClick: () => setTab(tb.id), className: "bs-btn", style: { padding: "8px 14px", borderRadius: 999, border: `1.5px solid ${on ? BS.brand : BS.border}`, background: on ? "rgba(255,85,32,0.08)" : "transparent", color: on ? BS.brand : BS.ink2, fontSize: 12.5, fontWeight: on ? 700 : 600, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" } }, tb.label, tb.n ? ` \xB7 ${tb.n}` : "");
  })), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px" } }, tab === "mascotas" && /* @__PURE__ */ React.createElement("div", null, pets.length === 0 && !addOpen && /* @__PURE__ */ React.createElement("div", { style: { ...card, textAlign: "center", color: BS.soft, fontSize: 13 } }, "A\xFAn no tienes mascotas registradas."), pets.map((p, i) => editId === p.id ? /* @__PURE__ */ React.createElement(PetForm, { key: i, BS, petId: p.id, initial: p, onDone: () => {
    setEditId(null);
    load();
  }, onCancel: () => setEditId(null) }) : /* @__PURE__ */ React.createElement("div", { key: i, style: { ...card, display: "flex", gap: 12, alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: BS.surface2, display: "grid", placeItems: "center", overflow: "hidden" } }, p.photo_url ? /* @__PURE__ */ React.createElement("img", { src: p.photo_url, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : /* @__PURE__ */ React.createElement("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: BS.brand }, /* @__PURE__ */ React.createElement("circle", { cx: "7", cy: "9", r: "1.7" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "7.4", r: "1.7" }), /* @__PURE__ */ React.createElement("circle", { cx: "17", cy: "9", r: "1.7" }), /* @__PURE__ */ React.createElement("path", { d: "M12 12c-2.4 0-4.3 1.9-4.3 3.9 0 1.5 1.2 2.4 2.6 2.4 .8 0 1.1-.4 1.7-.4s.9 .4 1.7 .4c1.4 0 2.6-.9 2.6-2.4 0-2-1.9-3.9-4.3-3.9z" }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 800, color: BS.ink } }, p.name || "Mi mascota"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: BS.ink2 } }, [p.breed, p.size, p.sex, p.weight_lbs ? p.weight_lbs + " lb" : ""].filter(Boolean).join(" \xB7 ") || "\u2014"), p.status === "pending" && /* @__PURE__ */ React.createElement("span", { style: { display: "inline-block", marginTop: 5, fontSize: 10.5, fontWeight: 700, color: "#E0A106", background: "rgba(224,161,6,0.12)", padding: "2px 8px", borderRadius: 999 } }, "Pendiente de confirmar")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setEditId(p.id);
    setAddOpen(false);
  }, className: "bs-btn", style: { fontSize: 11.5, fontWeight: 700, color: BS.ink2, border: `1.5px solid ${BS.border}`, borderRadius: 10, padding: "7px 11px", background: "transparent", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" } }, "Editar"), p.status !== "pending" && /* @__PURE__ */ React.createElement("a", { href: "/grooming.html", className: "bs-btn", style: { textDecoration: "none", textAlign: "center", fontSize: 11.5, fontWeight: 700, color: BS.brand, border: `1.5px solid ${BS.border}`, borderRadius: 10, padding: "7px 11px", whiteSpace: "nowrap" } }, "Agendar")))), addOpen ? /* @__PURE__ */ React.createElement(PetForm, { BS, onDone: () => {
    setAddOpen(false);
    load();
  }, onCancel: () => setAddOpen(false) }) : /* @__PURE__ */ React.createElement("button", { onClick: () => {
    setAddOpen(true);
    setEditId(null);
  }, className: "bs-btn", style: { width: "100%", padding: "13px", borderRadius: 14, border: `1.5px dashed ${BS.border}`, background: "transparent", color: BS.brand, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" } }, "+ Agregar mascota")), tab === "grooming" && /* @__PURE__ */ React.createElement("div", null, bkMsg && /* @__PURE__ */ React.createElement("div", { style: { ...card, fontSize: 12.5, color: BS.ink2, lineHeight: 1.5 } }, bkMsg), bookings.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: BS.soft, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 2px 8px" } }, "Tus citas"), bookings.map((b, i) => {
    const svc = Array.isArray(b.services) ? b.services.join(" + ") : b.services || "Grooming";
    const st = b.status || "requested";
    const stColor = st === "confirmed" ? "#1EB87A" : st === "completed" ? BS.soft : BS.brand;
    return /* @__PURE__ */ React.createElement("div", { key: b.id || i, style: card }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 800, color: BS.ink } }, b.pet_name || "Mascota"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, fontWeight: 700, color: stColor, background: BS.surface2, padding: "3px 9px", borderRadius: 999 } }, st)), row("Servicio", svc), row("Fecha", fmtD(b.appointment_date) + (b.appointment_time ? " \xB7 " + b.appointment_time : "")), b.size ? row("Tama\xF1o", b.size) : null, st !== "completed" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 10 } }, /* @__PURE__ */ React.createElement("a", { href: "/reserva.html?id=" + encodeURIComponent(b.id), className: "bs-btn", style: { flex: 1, textAlign: "center", textDecoration: "none", fontSize: 12, fontWeight: 700, color: BS.ink2, border: `1.5px solid ${BS.border}`, borderRadius: 10, padding: "9px" } }, "Reprogramar"), /* @__PURE__ */ React.createElement("button", { onClick: () => cancelBooking(b), disabled: bkBusy === b.id, className: "bs-btn", style: { flex: 1, fontSize: 12, fontWeight: 700, color: BS.rose, border: `1.5px solid ${BS.border}`, borderRadius: 10, padding: "9px", background: "transparent", cursor: bkBusy === b.id ? "default" : "pointer", fontFamily: "inherit" } }, bkBusy === b.id ? "\u2026" : "Cancelar")));
  }), /* @__PURE__ */ React.createElement("div", { style: { ...card, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { color: BS.brand, display: "flex", justifyContent: "center", marginBottom: 8 } }, /* @__PURE__ */ React.createElement("svg", { width: "34", height: "34", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "6", cy: "6", r: "3" }), /* @__PURE__ */ React.createElement("circle", { cx: "6", cy: "18", r: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" }))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 800, color: BS.ink, marginBottom: 4 } }, bookings.length ? "Agenda otra cita" : "Agenda tu pr\xF3xima cita"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: BS.soft, lineHeight: 1.5, marginBottom: 14 } }, memberships.length ? "Tus ba\xF1os de membres\xEDa se aplican autom\xE1ticamente." : "Ba\xF1o, corte o spa para tu mascota en segundos."), /* @__PURE__ */ React.createElement("a", { href: "/grooming.html", style: { display: "inline-block", textDecoration: "none", background: BS.grad, color: "#fff", fontSize: 13.5, fontWeight: 700, padding: "11px 22px", borderRadius: 12 } }, "Agendar grooming \u2192")), baths > 0 && /* @__PURE__ */ React.createElement("div", { style: card }, row("Ba\xF1os de membres\xEDa disponibles", baths, BS.brand))), tab === "membresias" && /* @__PURE__ */ React.createElement("div", null, memberships.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { ...card, textAlign: "center", color: BS.soft, fontSize: 13 } }, "A\xFAn no tienes membres\xEDa de grooming. ", /* @__PURE__ */ React.createElement("a", { href: "/grooming.html", style: { color: BS.brand, fontWeight: 700 } }, "Ver planes \u2192")), memberships.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: card }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, fontWeight: 800, color: BS.ink } }, m.plan || "Membres\xEDa"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, fontWeight: 700, color: m.status === "active" ? "#1EB87A" : BS.soft, background: m.status === "active" ? "rgba(30,184,122,0.12)" : BS.surface2, padding: "3px 9px", borderRadius: 999 } }, m.status || "\u2014")), row("Facturaci\xF3n", m.billing || "\u2014"), row("Mascota", (m.pet_name || "\u2014") + (m.pet_size ? " \xB7 " + m.pet_size : "")), row("Ba\xF1os disponibles", m.credits_balance || 0, BS.brand), row("Pr\xF3xima renovaci\xF3n", fmtD(m.renew_date))))), tab === "pagos" && /* @__PURE__ */ React.createElement("div", null, plans.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { ...card, textAlign: "center", color: BS.soft, fontSize: 13 } }, "No tienes planes de pago activos. ", /* @__PURE__ */ React.createElement("a", { href: "/plan", style: { color: BS.brand, fontWeight: 700 } }, "Armar mi plan \u2192")), plans.map((p, i) => {
    const est = p.total_amount || (p.monthly_amount || 0) * (p.months || 0) || 0;
    const paid = payments.filter((x) => x.plan_id === p.id).reduce((a, x) => a + (+x.amount || 0), 0);
    const bal = Math.max(0, est - paid);
    const pct = est ? Math.min(100, Math.round(paid / est * 100)) : 0;
    return /* @__PURE__ */ React.createElement("div", { key: i, style: card }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: BS.ink, marginBottom: 8 } }, p.pet_name || "Plan de pagos"), row("Plan", (p.months || "\u2014") + " meses \xB7 " + money(p.monthly_amount) + "/mes"), row("Total estimado", money(est)), row("Abonado", money(paid), "#1EB87A"), row("Restante", money(bal)), row("Tu gran d\xEDa", fmtD(p.target_date)), /* @__PURE__ */ React.createElement("div", { style: { height: 7, borderRadius: 999, background: BS.surface2, overflow: "hidden", margin: "8px 0 4px" } }, /* @__PURE__ */ React.createElement("div", { style: { width: pct + "%", height: "100%", background: BS.grad } })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: BS.soft, textAlign: "right" } }, pct, "% completado"), bal > 0 && p.status !== "cancelled" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", { onClick: () => payPlan(p), disabled: payBusy === p.id, className: "bs-btn", style: { width: "100%", marginTop: 12, padding: "11px", borderRadius: 10, border: "none", background: BS.grad, color: "#fff", fontWeight: 700, fontSize: 13, cursor: payBusy === p.id ? "default" : "pointer", fontFamily: "inherit", opacity: payBusy === p.id ? 0.7 : 1 } }, payBusy === p.id ? "Redirigiendo\u2026" : "Hacer abono (" + money(p.monthly_amount) + ")"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10.5, color: BS.soft, textAlign: "center", marginTop: 6 } }, "Pago seguro con Stripe \xB7 tarjeta, Klarna, Affirm")));
  }))), /* @__PURE__ */ React.createElement("div", { style: { height: 24 } })));
}
Object.assign(window, {
  AccountScreen,
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
  EventsScreen,
  NewsScreen,
  VideosScreen,
  CreateProfileScreen,
  PostDetail,
  StatusChip,
  BadgeChips
});

})();
