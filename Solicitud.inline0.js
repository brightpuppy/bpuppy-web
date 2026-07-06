(function(){
const SQ_URL = "https://oqqwmcplljirbreowrll.supabase.co";
const SQ_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
const sqSb = (() => {
  try {
    return supabase.createClient(SQ_URL, SQ_KEY);
  } catch (e) {
    return null;
  }
})();
function Chip({ label, icon, selected, onClick, disabled }) {
  return /* @__PURE__ */ React.createElement("button", { type: "button", disabled: !!disabled, onClick: disabled ? void 0 : onClick, style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "11px 18px",
    borderRadius: 999,
    border: selected ? "2px solid var(--orange)" : "1.5px solid var(--line)",
    background: selected ? "rgba(245,130,32,0.08)" : "#fff",
    fontFamily: "var(--body)",
    fontSize: 14,
    fontWeight: 600,
    color: selected ? "var(--orange)" : "var(--ink)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled && !selected ? 0.4 : 1,
    transition: "all .15s"
  } }, icon && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, icon), label);
}
// raza -> atributos (de breed-data.js). Si la reconocemos, fijamos tamaño/pelaje/energía.
function _bpNorm(s){ return String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g," ").trim(); }
var _BP_BREED_ALIAS = { "yorkie":"yorkshire terrier","yorky":"yorkshire terrier","frenchie":"french bulldog","frances":"french bulldog","doxie":"dachshund","salchicha":"dachshund","teckel":"dachshund","pom":"pomeranian","pomerania":"pomeranian","lab":"labrador retriever","labrador":"labrador retriever","golden":"golden retriever","aussie":"australian shepherd","caniche":"poodle","mini schnauzer":"miniature schnauzer","schnauzer miniatura":"miniature schnauzer" };
function breedAttrs(breedStr){
  try{
    var nb = _bpNorm(breedStr); if(!nb || nb.length < 3) return null;
    nb = _BP_BREED_ALIAS[nb] || nb;
    var all = [].concat(window.DOG_BREEDS||[], window.CAT_BREEDS||[]);
    var best = null;
    for(var i=0;i<all.length;i++){
      var e = all[i]; var nm = _bpNorm(e.name), es = _bpNorm(e.es);
      if(nm===nb || es===nb || (nm && (nb.indexOf(nm)>=0 || nm.indexOf(nb)>=0) && Math.abs(nm.length-nb.length)<=4) || (es && (nb.indexOf(es)>=0 || es.indexOf(nb)>=0) && Math.abs(es.length-nb.length)<=4)){ best = e; if(nm===nb||es===nb) break; }
    }
    if(!best) return null;
    var size = (best.size==="small"||best.size==="medium"||best.size==="large") ? best.size : "";
    var coat = "";
    if(best.hypo===true) coat = "hypo";
    else { var c0 = Array.isArray(best.coat) ? best.coat[0] : best.coat; coat = (c0==="short") ? "short" : (c0 ? "long" : ""); }
    var en = best.energy;
    var energy = (typeof en==="number") ? (en<=1?"low":(en>=3?"high":"medium")) : (/(low|baj)/i.test(en)?"low":(/(high|alt)/i.test(en)?"high":(en?"medium":"")));
    if(!size && !coat && !energy) return null;
    return { size: size, coat: coat, energy: energy };
  }catch(e){ return null; }
}
function Field({ label, children }) {
  return /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--ink-2)", letterSpacing: "0.04em", marginBottom: 10 } }, label), children);
}
const STEPS = [["Tu mascota ideal", "Your ideal pet"], ["Tu estilo de vida", "Your lifestyle"], ["Tus datos", "Your details"]];
function SolicitudForm() {
  const t = useT();
  const [step, setStep] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [loading, setLoad] = React.useState(false);
  const [breedLock, setBreedLock] = React.useState(false);
  const [form, setForm] = React.useState({
    // Step 1
    species: "",
    breed: "",
    size: "",
    coat: "",
    gender: "",
    age_pref: "",
    // Step 2
    living: "",
    kids: "",
    other_pets: "",
    energy: "",
    // Step 3
    name: "",
    email: "",
    phone: "",
    state: "",
    contact_lang: "",
    contact_method: "",
    notes: ""
  });
  function set(key, val) {
    setForm(function(f) {
      return Object.assign({}, f, { [key]: val });
    });
  }
  function toggle(key, val) {
    set(key, form[key] === val ? "" : val);
  }
  function applyBreed(v) {
    var a = breedAttrs(v);
    setForm(function(f) {
      var nf = Object.assign({}, f, { breed: v });
      if (a) { if (a.size) nf.size = a.size; if (a.coat) nf.coat = a.coat; if (a.energy) nf.energy = a.energy; }
      return nf;
    });
    setBreedLock(!!a);
  }
  function lockNote() {
    return breedLock ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--orange)", fontWeight: 600, marginTop: -14, marginBottom: 18, display: "flex", alignItems: "center", gap: 6 } }, "\u{1F512} ", t(["Definido por la raza que elegiste. Borra la raza para cambiarlo.", "Set by the breed you chose. Clear the breed to change it."])) : null;
  }
  function usPhoneOk(p) {
    var d = (p || "").replace(/\D/g, "");
    if (d.length === 11 && d.charAt(0) === "1") d = d.slice(1);
    return d.length === 10 && /^[2-9]\d{2}[2-9]\d{6}$/.test(d);
  }
  function canNext() {
    if (step === 0) return !!form.species;
    if (step === 1) return !!form.living;
    if (step === 2) {
      var emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email || "");
      return !!(form.name && form.name.trim().length >= 2) && emailOk && usPhoneOk(form.phone) && !!form.state && !!form.contact_lang && !!form.contact_method;
    }
    return false;
  }
  async function submit() {
    setLoad(true);
    const msg = [
      "SOLICITUD DE MASCOTA IDEAL",
      `Especie: ${form.species}`,
      form.breed && `Raza: ${form.breed}`,
      form.size && `Tama\xF1o: ${form.size}`,
      form.coat && `Pelaje: ${form.coat}`,
      form.gender && `G\xE9nero: ${form.gender}`,
      form.age_pref && `Edad preferida: ${form.age_pref}`,
      `Vive en: ${form.living}`,
      form.state && `Estado (EE. UU.): ${form.state}`,
      form.contact_lang && `Idioma de contacto: ${form.contact_lang}`,
      form.contact_method && `Contactar por: ${form.contact_method}`,
      form.kids && `Ni\xF1os: ${form.kids}`,
      form.other_pets && `Otras mascotas: ${form.other_pets}`,
      form.energy && `Energ\xEDa: ${form.energy}`,
      form.notes && `Notas: ${form.notes}`
    ].filter(Boolean).join("\n");
    try {
      await sqSb.from("website_leads").insert({
        gclid: (function() {
          try {
            window.bpLead && window.bpLead();
          } catch (e) {
          }
          return typeof window !== "undefined" && window.bpGclid ? window.bpGclid() : null;
        })(),
        full_name: form.name,
        email: form.email,
        phone: form.phone,
        state: form.state,
        contact_lang: form.contact_lang,
        contact_method: form.contact_method,
        puppy_breed: form.breed || null,
        message: msg,
        source: "solicitud_ideal"
      });
      setDone(true);
    } catch (e) {
      alert(t(["Error al enviar. Por favor escr\xEDbenos por WhatsApp: +1 (929) 428-7300", "There was an error sending your request. Please message us on WhatsApp: +1 (929) 428-7300"]));
    } finally {
      setLoad(false);
    }
  }
  if (done) return /* @__PURE__ */ React.createElement("div", { style: { minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: "60px 24px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 72 } }, "\u{1F389}"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "var(--display)", fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--ink)", margin: 0 } }, t(["\xA1Solicitud enviada!", "Request sent!"])), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 16, color: "var(--ink-2)", lineHeight: 1.7, maxWidth: "44ch", margin: 0 } }, t(["Hemos recibido tu solicitud. Nuestro equipo buscar\xE1 la mascota perfecta para ti y te contactar\xE1 pronto con opciones disponibles.", "We\u2019ve received your request. Our team will look for the perfect pet for you and reach out soon with available options."])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 } }, /* @__PURE__ */ React.createElement("a", { href: "/cachorros", style: { padding: "13px 24px", background: "var(--orange)", color: "#fff", borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: "none" } }, t(["Ver cachorros disponibles", "See available puppies"])), /* @__PURE__ */ React.createElement("a", { href: "/", style: { padding: "13px 24px", background: "var(--bg)", color: "var(--ink)", borderRadius: 999, fontWeight: 700, fontSize: 14, textDecoration: "none", border: "1.5px solid var(--line)" } }, t(["Volver al inicio", "Back to home"]))));
  return /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", minHeight: "60vh", padding: "clamp(40px,6vw,80px) clamp(20px,5vw,80px)" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 600, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 40 } }, STEPS.map(function(s, i) {
    const done2 = i < step, active = i === step;
    return /* @__PURE__ */ React.createElement("div", { key: i, style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { height: 4, borderRadius: 999, background: done2 || active ? "var(--orange)" : "var(--line)", transition: "background .3s" } }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 600, color: active ? "var(--orange)" : "var(--ink-2)", marginTop: 6, letterSpacing: "0.03em" } }, t(s)));
  })), step === 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 10 } }, t(["Paso 1 de 3", "Step 1 of 3"])), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "var(--display)", fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, margin: "0 0 8px", color: "var(--ink)" } }, t(["\xBFQu\xE9 tipo de", "What kind of"]), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", { style: { fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--orange)" } }, t(["compa\xF1ero", "companion"])), " ", t(["buscas?", "are you looking for?"])), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65, margin: "0 0 36px" } }, t(["Cu\xE9ntanos sobre la mascota ideal para tu hogar. Todo es opcional excepto la especie.", "Tell us about the ideal pet for your home. Everything is optional except the species."])), /* @__PURE__ */ React.createElement(Field, { label: t(["\xBFPerro o gato? *", "Dog or cat? *"]) }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, [["\u{1F436}", ["Perro", "Dog"], "dog"], ["\u{1F431}", ["Gato", "Cat"], "cat"]].map(function(o) {
    return /* @__PURE__ */ React.createElement(Chip, { key: o[2], icon: o[0], label: t(o[1]), selected: form.species === o[2], onClick: function() {
      toggle("species", o[2]);
    } });
  }))), /* @__PURE__ */ React.createElement(Field, { label: t(["Raza (opcional \u2014 d\xE9jalo en blanco si no tienes preferencia)", "Breed (optional \u2014 leave blank if you have no preference)"]) }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: form.breed,
      onChange: function(e) {
        applyBreed(e.target.value);
      },
      placeholder: t(["Ej. Golden Retriever, Poodle, Maine Coon\u2026", "e.g. Golden Retriever, Poodle, Maine Coon\u2026"]),
      style: { width: "100%", padding: "12px 16px", border: "1.5px solid var(--line)", borderRadius: 10, fontFamily: "var(--body)", fontSize: 14, color: "var(--ink)", background: "#fff", outline: "none", boxSizing: "border-box" }
    }
  )), lockNote(), /* @__PURE__ */ React.createElement(Field, { label: t(["Tama\xF1o", "Size"]) }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, [["\u{1F43E}", ["Peque\xF1o", "Small"], "small"], ["\u{1F415}", ["Mediano", "Medium"], "medium"], ["\u{1F9AE}", ["Grande", "Large"], "large"], ["", ["Sin preferencia", "No preference"], "any"]].map(function(o) {
    return /* @__PURE__ */ React.createElement(Chip, { key: o[2], icon: o[0] || null, label: t(o[1]), disabled: breedLock, selected: form.size === o[2], onClick: function() {
      toggle("size", o[2]);
    } });
  }))), /* @__PURE__ */ React.createElement(Field, { label: t(["Tipo de pelaje", "Coat type"]) }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, [["\u2702\uFE0F", ["Pelo corto", "Short hair"], "short"], ["\u{1F415}\u200D\u{1F9BA}", ["Pelo largo", "Long hair"], "long"], ["\u{1F4A8}", ["Hipoalerg\xE9nico", "Hypoallergenic"], "hypo"], ["", ["Sin preferencia", "No preference"], "any"]].map(function(o) {
    return /* @__PURE__ */ React.createElement(Chip, { key: o[2], icon: o[0] || null, label: t(o[1]), disabled: breedLock, selected: form.coat === o[2], onClick: function() {
      toggle("coat", o[2]);
    } });
  }))), /* @__PURE__ */ React.createElement(Field, { label: t(["G\xE9nero", "Gender"]) }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, [["\u2640\uFE0F", ["Hembra", "Female"], "female"], ["\u2642\uFE0F", ["Macho", "Male"], "male"], ["", ["Sin preferencia", "No preference"], "any"]].map(function(o) {
    return /* @__PURE__ */ React.createElement(Chip, { key: o[2], icon: o[0] || null, label: t(o[1]), selected: form.gender === o[2], onClick: function() {
      toggle("gender", o[2]);
    } });
  }))), /* @__PURE__ */ React.createElement(Field, { label: t(["Edad preferida", "Preferred age"]) }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, [["\u{1F37C}", ["Cachorro", "Puppy"], "puppy"], ["\u{1F43E}", ["Adulto", "Adult"], "adult"], ["", ["Sin preferencia", "No preference"], "any"]].map(function(o) {
    return /* @__PURE__ */ React.createElement(Chip, { key: o[2], icon: o[0] || null, label: t(o[1]), selected: form.age_pref === o[2], onClick: function() {
      toggle("age_pref", o[2]);
    } });
  })))), step === 1 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 10 } }, t(["Paso 2 de 3", "Step 2 of 3"])), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "var(--display)", fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, margin: "0 0 8px", color: "var(--ink)" } }, t(["Cu\xE9ntanos de", "Tell us about"]), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", { style: { fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--orange)" } }, t(["tu hogar", "your home"]))), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65, margin: "0 0 36px" } }, t(["Esto nos ayuda a encontrar la mascota perfecta para tu estilo de vida.", "This helps us find the perfect pet for your lifestyle."])), /* @__PURE__ */ React.createElement(Field, { label: t(["\xBFD\xF3nde vives? *", "Where do you live? *"]) }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, [["\u{1F3E2}", ["Apartamento", "Apartment"], "apartment"], ["\u{1F3E1}", ["Casa con jard\xEDn", "House with yard"], "house"], ["\u{1F333}", ["Casa de campo", "Country house"], "rural"], ["\u{1F6CB}\uFE0F", ["Espacio reducido", "Compact space"], "small"]].map(function(o) {
    return /* @__PURE__ */ React.createElement(Chip, { key: o[2], icon: o[0], label: t(o[1]), selected: form.living === o[2], onClick: function() {
      toggle("living", o[2]);
    } });
  }))), /* @__PURE__ */ React.createElement(Field, { label: t(["\xBFTienes ni\xF1os en casa?", "Do you have kids at home?"]) }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, [["\u{1F476}", ["S\xED, beb\xE9s/ni\xF1os peque\xF1os", "Yes, babies/toddlers"], "babies"], ["\u{1F9D2}", ["Ni\xF1os mayores de 6", "Kids over 6"], "older"], ["\u{1F6AB}", ["No", "No"], "no"]].map(function(o) {
    return /* @__PURE__ */ React.createElement(Chip, { key: o[2], icon: o[0], label: t(o[1]), selected: form.kids === o[2], onClick: function() {
      toggle("kids", o[2]);
    } });
  }))), /* @__PURE__ */ React.createElement(Field, { label: t(["\xBFTienes otras mascotas?", "Do you have other pets?"]) }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, [["\u{1F415}", ["S\xED, perros", "Yes, dogs"], "dogs"], ["\u{1F408}", ["S\xED, gatos", "Yes, cats"], "cats"], ["\u{1F43E}", ["S\xED, mixto", "Yes, a mix"], "mixed"], ["\u{1F6AB}", ["No", "No"], "no"]].map(function(o) {
    return /* @__PURE__ */ React.createElement(Chip, { key: o[2], icon: o[0], label: t(o[1]), selected: form.other_pets === o[2], onClick: function() {
      toggle("other_pets", o[2]);
    } });
  }))), /* @__PURE__ */ React.createElement(Field, { label: t(["Nivel de actividad que buscas", "Activity level you\u2019re looking for"]) }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, [["\u{1F634}", ["Tranquilo y relajado", "Calm and relaxed"], "low"], ["\u{1F6B6}", ["Moderado", "Moderate"], "medium"], ["\u{1F3C3}", ["Muy activo", "Very active"], "high"]].map(function(o) {
    return /* @__PURE__ */ React.createElement(Chip, { key: o[2], icon: o[0], label: t(o[1]), disabled: breedLock, selected: form.energy === o[2], onClick: function() {
      toggle("energy", o[2]);
    } });
  })))), step === 2 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 10 } }, t(["Paso 3 de 3", "Step 3 of 3"])), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "var(--display)", fontSize: "clamp(28px,5vw,52px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, margin: "0 0 8px", color: "var(--ink)" } }, t(["\xBFC\xF3mo te", "How can we"]), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", { style: { fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--orange)" } }, t(["contactamos?", "reach you?"]))), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65, margin: "0 0 36px" } }, t(["Revisaremos tu solicitud y te escribiremos con las mejores opciones disponibles.", "We\u2019ll review your request and write back with the best available options."])), /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: "16px 18px", marginBottom: 28 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--orange)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 } }, t(["Tu solicitud", "Your request"])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, [
    form.species && (form.species === "dog" ? t(["\u{1F436} Perro", "\u{1F436} Dog"]) : t(["\u{1F431} Gato", "\u{1F431} Cat"])),
    form.breed,
    form.size && form.size !== "any" && form.size,
    form.coat && form.coat !== "any" && form.coat,
    form.gender && form.gender !== "any" && (form.gender === "female" ? t(["\u2640 Hembra", "\u2640 Female"]) : t(["\u2642 Macho", "\u2642 Male"])),
    form.living && form.living,
    form.energy && form.energy
  ].filter(Boolean).map(function(tag, i) {
    return /* @__PURE__ */ React.createElement("span", { key: i, style: { fontSize: 12, padding: "4px 12px", borderRadius: 999, background: "rgba(245,130,32,0.1)", color: "var(--orange)", fontWeight: 600 } }, tag);
  }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, [["name", ["Tu nombre completo *", "Your full name *"], "text"], ["email", ["Email *", "Email *"], "email"], ["phone", ["Tel\xE9fono / WhatsApp *", "Phone / WhatsApp *"], "tel"]].map(function(f) {
    return /* @__PURE__ */ React.createElement("div", { key: f[0] }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 11, fontWeight: 700, color: "var(--ink-2)", display: "block", marginBottom: 4 } }, t(f[1])), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: f[2],
        value: form[f[0]],
        onChange: function(e) {
          set(f[0], e.target.value);
        },
        style: { width: "100%", padding: "12px 16px", border: "1.5px solid var(--line)", borderRadius: 10, fontFamily: "var(--body)", fontSize: 14, color: "var(--ink)", background: "#fff", outline: "none", boxSizing: "border-box" }
      }
    ), f[0] === "phone" && form.phone && !usPhoneOk(form.phone) ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#B3431E", marginTop: 5, lineHeight: 1.5 } }, t(["Ingresa un n\xFAmero de tel\xE9fono de EE. UU. v\xE1lido (10 d\xEDgitos). Nuestro servicio est\xE1 disponible solo en USA.", "Enter a valid US phone number (10 digits). Our service is available in the USA only."])) : null);
  }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 11, fontWeight: 700, color: "var(--ink-2)", display: "block", marginBottom: 4 } }, t(["Estado (EE. UU.) *", "State (USA) *"])), /* @__PURE__ */ React.createElement("select", { value: form.state, onChange: function(e) { set("state", e.target.value); }, style: { width: "100%", padding: "12px 16px", border: "1.5px solid var(--line)", borderRadius: 10, fontFamily: "var(--body)", fontSize: 14, color: form.state ? "var(--ink)" : "#9a8c7e", background: "#fff", outline: "none", boxSizing: "border-box" } }, /* @__PURE__ */ React.createElement("option", { value: "" }, t(["Selecciona tu estado…", "Select your state…"])), "Alabama,Alaska,Arizona,Arkansas,California,Colorado,Connecticut,Delaware,Florida,Georgia,Hawaii,Idaho,Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York,North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming,Washington D.C.,Puerto Rico".split(",").map(function(s) { return /* @__PURE__ */ React.createElement("option", { key: s, value: s }, s); }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: "1 1 160px" } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 11, fontWeight: 700, color: "var(--ink-2)", display: "block", marginBottom: 4 } }, t(["Idioma para hablarte *", "Language to talk to you *"])), /* @__PURE__ */ React.createElement("select", { value: form.contact_lang, onChange: function(e) { set("contact_lang", e.target.value); }, style: { width: "100%", padding: "12px 16px", border: "1.5px solid var(--line)", borderRadius: 10, fontFamily: "var(--body)", fontSize: 14, color: form.contact_lang ? "var(--ink)" : "#9a8c7e", background: "#fff", outline: "none", boxSizing: "border-box" } }, /* @__PURE__ */ React.createElement("option", { value: "" }, t(["Selecciona…", "Select…"])), /* @__PURE__ */ React.createElement("option", { value: "Espa\xF1ol" }, "Espa\xF1ol"), /* @__PURE__ */ React.createElement("option", { value: "English" }, "English"))), /* @__PURE__ */ React.createElement("div", { style: { flex: "1 1 160px" } }, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 11, fontWeight: 700, color: "var(--ink-2)", display: "block", marginBottom: 4 } }, t(["Contactar tu n\xFAmero por *", "Contact your number via *"])), /* @__PURE__ */ React.createElement("select", { value: form.contact_method, onChange: function(e) { set("contact_method", e.target.value); }, style: { width: "100%", padding: "12px 16px", border: "1.5px solid var(--line)", borderRadius: 10, fontFamily: "var(--body)", fontSize: 14, color: form.contact_method ? "var(--ink)" : "#9a8c7e", background: "#fff", outline: "none", boxSizing: "border-box" } }, /* @__PURE__ */ React.createElement("option", { value: "" }, t(["Selecciona…", "Select…"])), /* @__PURE__ */ React.createElement("option", { value: "WhatsApp" }, "WhatsApp"), /* @__PURE__ */ React.createElement("option", { value: "SMS" }, t(["SMS (texto)", "SMS (text)"]))))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", { style: { fontSize: 11, fontWeight: 700, color: "var(--ink-2)", display: "block", marginBottom: 4 } }, t(["Algo m\xE1s que debamos saber", "Anything else we should know"])), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      rows: "3",
      value: form.notes,
      onChange: function(e) {
        set("notes", e.target.value);
      },
      placeholder: t(["Presupuesto, fechas, preguntas espec\xEDficas\u2026", "Budget, timing, specific questions\u2026"]),
      style: { width: "100%", padding: "12px 16px", border: "1.5px solid var(--line)", borderRadius: 10, fontFamily: "var(--body)", fontSize: 14, color: "var(--ink)", background: "#fff", resize: "vertical", outline: "none", boxSizing: "border-box" }
    }
  )))), step === 2 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#6B7280", lineHeight: 1.55, marginTop: 26, textAlign: "center" } }, t([
    /* @__PURE__ */ React.createElement(React.Fragment, { key: "es" }, "Al hacer clic en \xABEnviar\xBB aceptas nuestra ", /* @__PURE__ */ React.createElement("a", { href: "/privacidad", style: { color: "inherit", textDecoration: "underline" } }, "Pol\xEDtica de Privacidad"), " y ", /* @__PURE__ */ React.createElement("a", { href: "/terminos", style: { color: "inherit", textDecoration: "underline" } }, "T\xE9rminos"), ", y autorizas que BrightPuppy te contacte por correo, SMS y WhatsApp (incluidos mensajes autom\xE1ticos) sobre tu solicitud y novedades. Pueden aplicar tarifas de datos/mensajes. Responde STOP para no recibir textos, o usa el enlace de baja en los correos. Esto no es condici\xF3n para comprar."),
    /* @__PURE__ */ React.createElement(React.Fragment, { key: "en" }, "By clicking “Send” you agree to our ", /* @__PURE__ */ React.createElement("a", { href: "/privacy", style: { color: "inherit", textDecoration: "underline" } }, "Privacy Policy"), " and ", /* @__PURE__ */ React.createElement("a", { href: "/terms", style: { color: "inherit", textDecoration: "underline" } }, "Terms"), ", and consent to receive email, SMS and WhatsApp messages (including automated) from BrightPuppy about your request and updates. Message/data rates may apply. Reply STOP to opt out of texts, or use the unsubscribe link in emails. This is not a condition of purchase.")
  ])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, gap: 12 } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: function() {
        setStep(function(s) {
          return s - 1;
        });
      },
      disabled: step === 0,
      style: { padding: "12px 22px", background: "none", border: "1.5px solid var(--line)", borderRadius: 999, fontFamily: "var(--body)", fontWeight: 600, fontSize: 14, cursor: step === 0 ? "not-allowed" : "pointer", color: "var(--ink-2)", opacity: step === 0 ? 0 : 1 }
    },
    t(["\u2190 Atr\xE1s", "\u2190 Back"])
  ), step < 2 ? /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      onClick: function() {
        setStep(function(s) {
          return s + 1;
        });
      },
      disabled: !canNext(),
      style: { padding: "13px 28px", background: canNext() ? "var(--orange)" : "var(--line)", color: "#fff", border: "none", borderRadius: 999, fontFamily: "var(--body)", fontWeight: 700, fontSize: 15, cursor: canNext() ? "pointer" : "not-allowed", boxShadow: canNext() ? "0 8px 24px -8px rgba(245,130,32,0.4)" : "none", transition: "all .2s" }
    },
    t(["Siguiente \u2192", "Next \u2192"])
  ) : /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      "data-consent": "clickwrap",
      onClick: submit,
      disabled: !canNext() || loading,
      style: { padding: "13px 28px", background: canNext() ? "var(--orange)" : "var(--line)", color: "#fff", border: "none", borderRadius: 999, fontFamily: "var(--body)", fontWeight: 700, fontSize: 15, cursor: canNext() ? "pointer" : "not-allowed", boxShadow: canNext() ? "0 8px 24px -8px rgba(245,130,32,0.4)" : "none", transition: "all .2s", opacity: loading ? 0.7 : 1 }
    },
    loading ? t(["Enviando\u2026", "Sending\u2026"]) : t(["\u{1F43E} Enviar solicitud", "\u{1F43E} Send request"])
  ))));
}
function SolicitudPage() {
  const t = useT();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Header, { overDark: true }), /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("section", { style: { background: "linear-gradient(100deg, rgba(45,36,33,0.82) 0%, rgba(45,36,33,0.55) 45%, rgba(45,36,33,0.12) 100%), url('assets/header-solicitud.webp') right 25%/cover no-repeat, var(--dark-sec,#2D2421)", padding: "120px clamp(20px,5vw,80px) 70px", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "radial-gradient(45% 60% at 18% 50%, rgba(0,0,0,0.35), transparent 70%)", pointerEvents: "none" } }), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 700, position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FFB877", marginBottom: 14 } }, t(["BPuppy \xB7 Solicitud", "BPuppy \xB7 Request"])), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "var(--display)", fontSize: "clamp(40px,7vw,88px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.93, margin: "0 0 20px", color: "#fff", textShadow: "0 2px 14px rgba(0,0,0,0.4)" } }, t(["Encuentra tu", "Find your"]), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", { style: { fontFamily: "var(--serif)", fontStyle: "italic", color: "#FFB877" } }, t(["compa\xF1ero ideal.", "ideal companion."]))))),/* @__PURE__ */ React.createElement(SolicitudForm, null)), /* @__PURE__ */ React.createElement(Footer, null));
}
function SolicitudRoot() {
  const [lang, setLang] = React.useState(window.bpGetLang&&window.bpGetLang()||"es");
  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang, setLang } }, /* @__PURE__ */ React.createElement(SolicitudPage, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(SolicitudRoot, null));

})();
