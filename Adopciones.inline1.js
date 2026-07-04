(function(){
const { useState, useMemo, useEffect, useRef } = React;
const T = {
  hero_title: ["Adopta con", "Adopt with"],
  hero_em: ["coraz\xF3n", "heart"],
  hero_p: [
    "En BPuppy creemos que cada mascota merece un hogar. Te conectamos con refugios locales de confianza en todo Estados Unidos para que encuentres a tu pr\xF3ximo compa\xF1ero.",
    "At BPuppy we believe every pet deserves a home. We connect you with trusted local shelters across the United States so you can find your next companion."
  ],
  back: ["\u2190 Volver al inicio", "\u2190 Back to home"],
  story_eye: ["Nuestra historia con el rescate", "Our rescue story"],
  story_h: ["M\xE1s de una d\xE9cada", "Over a decade"],
  story_em: ["rescatando vidas.", "saving lives."],
  story_p1: [
    "A lo largo de nuestros 13+ a\xF1os conectando familias con cachorros de raza, tambi\xE9n hemos dedicado tiempo y recursos a rescatar mascotas en situaci\xF3n de abandono. Hemos colaborado con refugios en m\xFAltiples estados, ayudando a colocar perros y gatos en hogares amorosos.",
    "Throughout our 13+ years connecting families with purebred puppies, we have also dedicated time and resources to rescuing abandoned pets. We have partnered with shelters in multiple states, helping place dogs and cats in loving homes."
  ],
  story_p2: [
    "Nuestra labor ha sido y sigue siendo la de servir como puente entre las personas que buscan adoptar y los refugios que cuidan de estos animales. Conocemos de primera mano las necesidades de cada familia y eso nos permite orientarte hacia el refugio y la mascota que mejor se adapten a tu hogar.",
    "Our role has been and continues to be serving as a bridge between people looking to adopt and the shelters that care for these animals. We understand each family's needs firsthand and can guide you to the right shelter and pet for your home."
  ],
  story_p3: [
    "Hoy seguimos comprometidos con esa misi\xF3n. Si rescatar es tu camino, estamos aqu\xED para ayudarte a encontrar el lugar correcto.",
    "Today we remain committed to that mission. If rescue is your path, we are here to help you find the right place."
  ],
  disc: [
    "BPuppy act\xFAa como colaborador dirigiendo a las personas hacia refugios locales de confianza. No somos responsables del proceso de adopci\xF3n, las tarifas ni las condiciones de cada refugio. Cada organizaci\xF3n establece sus propios requisitos, tarifas de adopci\xF3n y procedimientos. Te recomendamos contactar directamente al refugio de tu inter\xE9s para conocer los detalles.",
    "BPuppy acts as a collaborator directing people to trusted local shelters. We are not responsible for the adoption process, fees, or conditions of each shelter. Each organization sets its own requirements, adoption fees, and procedures. We recommend contacting the shelter of interest directly for details."
  ],
  disc_label: ["Nota importante:", "Important note:"],
  finder_eye: ["Directorio de refugios", "Shelter directory"],
  finder_h: ["Encuentra un refugio", "Find a shelter"],
  finder_em: ["cerca de ti.", "near you."],
  finder_p: [
    "Hemos recopilado refugios de confianza en los 50 estados. Selecciona tu estado para ver las opciones disponibles, o busca por ciudad.",
    "We've compiled trusted shelters across all 50 states. Select your state to see available options, or search by city."
  ],
  select_ph: ["Selecciona un estado...", "Select a state..."],
  select_all: ["Todos los estados", "All states"],
  city_ph: ["Buscar por ciudad...", "Search by city..."],
  empty: ["Selecciona un estado para ver refugios disponibles.", "Select a state to see available shelters."],
  no_match: ["No se encontraron refugios con ese filtro.", "No shelters found with that filter."],
  coming_badge: ["Pr\xF3ximamente", "Coming soon"],
  coming_h: ["Mascotas en adopci\xF3n", "Pets for adoption"],
  coming_em: ["directamente aqu\xED.", "right here."],
  coming_p: [
    "Si en alg\xFAn momento tenemos mascotas propias disponibles para adopci\xF3n, las publicaremos en esta secci\xF3n para que puedas conocerlas directamente. Mientras tanto, te invitamos a explorar los refugios listados arriba.",
    "If we ever have our own pets available for adoption, we will publish them in this section so you can meet them directly. In the meantime, we invite you to explore the shelters listed above."
  ],
  cta_h: ["\xBFNecesitas ayuda para", "Need help"],
  cta_em: ["encontrar un refugio?", "finding a shelter?"],
  cta_p: [
    "Escr\xEDbenos y te orientamos seg\xFAn tu ubicaci\xF3n y lo que buscas. Estamos para ayudarte a encontrar a tu pr\xF3ximo compa\xF1ero.",
    "Write to us and we'll guide you based on your location and what you're looking for. We're here to help you find your next companion."
  ],
  wa: ["Escr\xEDbenos por WhatsApp", "Write us on WhatsApp"],
  call: ["Ll\xE1manos \xB7 (929) 428-7300", "Call us \xB7 (929) 428-7300"],
  nav_inicio: ["Inicio", "Home"],
  nav_cachorros: ["Cachorros", "Puppies"],
  nav_gatos: ["Gatos", "Cats"],
  nav_adopciones: ["Adopciones", "Adoptions"],
  nav_social: ["Social", "Social"],
  nav_cta: ["Ver disponibles", "See available"],
  foot: ["\xA9 2026 BPuppy \xB7 Cachorros criados con amor en hogares de familia.", "\xA9 2026 BPuppy \xB7 Puppies raised with love in family homes."]
};
const SUPA_URL = "https://oqqwmcplljirbreowrll.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
const supa = window.supabase ? window.supabase.createClient(SUPA_URL, SUPA_KEY) : null;
const PLACEHOLDER_STORIES = [
  { id: "p1", pet_name: "Luna", story: "La encontramos en el refugio Miami Humane Society. Lleg\xF3 t\xEDmida pero hoy es la reina de la casa.", submitter_name: null, is_anonymous: true, photo_url: null, created_at: "2026-03-10" },
  { id: "p2", pet_name: "Milo", story: "Adoptamos a Milo de PAWS Chicago. No podemos imaginar la vida sin \xE9l. Tiene una sonrisa que ilumina todo.", submitter_name: "Familia Gonz\xE1lez", is_anonymous: false, photo_url: null, created_at: "2026-04-02" },
  { id: "p3", pet_name: "Bella", story: "Rescue de Austin Pets Alive! Bella lleg\xF3 asustada. Hoy corre libre en el jard\xEDn cada ma\xF1ana.", submitter_name: "Sarah M.", is_anonymous: false, photo_url: null, created_at: "2026-04-18" }
];
function UploadModal({ onClose, onSuccess, lang }) {
  const tl2 = (es, en) => lang === "en" ? en : es;
  const [petName, setPetName] = useState("");
  const [story, setStory] = useState("");
  const [name, setName] = useState("");
  const [anon, setAnon] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [drag, setDrag] = useState(false);
  const fileRef = useRef();
  const handleFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    handleFile(e.dataTransfer.files[0]);
  };
  const handleSubmit = async () => {
    if (!petName.trim()) {
      setError(tl2("El nombre de tu mascota es requerido.", "Pet name is required."));
      return;
    }
    setLoading(true);
    setError("");
    try {
      let photo_url = null;
      if (file && supa) {
        const ext = file.name.split(".").pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { data: up, error: upErr } = await supa.storage.from("adoption-photos").upload(path, file, { cacheControl: "3600", upsert: false });
        if (upErr) throw upErr;
        const { data: pub } = supa.storage.from("adoption-photos").getPublicUrl(path);
        photo_url = pub.publicUrl;
      }
      if (supa) {
        const { error: insErr } = await supa.from("adoptions").insert({
          pet_name: petName.trim(),
          story: story.trim() || null,
          submitter_name: anon ? null : name.trim() || null,
          is_anonymous: anon,
          photo_url,
          approved: true
        });
        if (insErr) throw insErr;
      }
      try { localStorage.setItem("bp_pending_social", JSON.stringify({ pet_name: petName.trim(), story: story.trim(), photo_url })); } catch (e) {}
      onSuccess && onSuccess({ pet_name: petName, story, submitter_name: anon ? null : name, is_anonymous: anon, photo_url: photo_url || preview, created_at: (/* @__PURE__ */ new Date()).toISOString() });
      setSuccess(true);
    } catch (e) {
      setError(tl2("Error al enviar. Intenta de nuevo.", "Error submitting. Please try again."));
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "upload-overlay", onClick: (e) => {
    if (e.target === e.currentTarget) onClose();
  } }, /* @__PURE__ */ React.createElement("div", { className: "upload-modal" }, /* @__PURE__ */ React.createElement("button", { className: "upload-close", onClick: onClose }, "\u2715"), success ? /* @__PURE__ */ React.createElement("div", { className: "upload-success" }, /* @__PURE__ */ React.createElement("div", { className: "check" }, "\u2713"), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--display)", fontSize: 24, fontWeight: 600, letterSpacing: "-.02em", margin: "0 0 8px" } }, tl2("\xA1Gracias por compartir!", "Thank you for sharing!")), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)", fontSize: 15, marginBottom: 18 } }, tl2("Tu historia ya es parte de nuestra comunidad.", "Your story is now part of our community.")), /* @__PURE__ */ React.createElement("a", { href: "/social", className: "btn btn-primary", style: { background: "var(--adopt-rose)", justifyContent: "center", width: "100%" } }, tl2("Crea tu perfil en B Social con esta historia →", "Create your B Social profile with this story →")), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { display: "block", margin: "12px auto 0", background: "none", border: "none", color: "var(--ink-soft)", fontSize: 13, fontWeight: 600, cursor: "pointer" } }, tl2("Ahora no, cerrar", "Not now, close"))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h3", null, tl2("Comparte tu historia", "Share your story")), /* @__PURE__ */ React.createElement("p", { className: "sub" }, tl2("Inspira a otros mostrando a tu mascota adoptada. Puedes hacerlo de forma an\xF3nima.", "Inspire others by showing your adopted pet. You can do it anonymously.")), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `upload-drop ${drag ? "over" : ""}`,
      onClick: () => fileRef.current.click(),
      onDragOver: (e) => {
        e.preventDefault();
        setDrag(true);
      },
      onDragLeave: () => setDrag(false),
      onDrop: handleDrop
    },
    /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", style: { display: "none" }, onChange: (e) => handleFile(e.target.files[0]) }),
    preview ? /* @__PURE__ */ React.createElement("img", { src: preview, alt: "preview" }) : /* @__PURE__ */ React.createElement("div", { className: "upload-drop-hint" }, /* @__PURE__ */ React.createElement("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", style: { color: "var(--adopt-rose)", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "4" }), /* @__PURE__ */ React.createElement("circle", { cx: "8.5", cy: "8.5", r: "1.5" }), /* @__PURE__ */ React.createElement("polyline", { points: "21 15 16 10 5 21" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, tl2("Sube la foto de tu mascota", "Upload your pet photo"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, marginTop: 4, color: "var(--ink-soft)" } }, tl2("JPG, PNG \u2014 m\xE1x 5MB", "JPG, PNG \u2014 max 5MB")))
  ), /* @__PURE__ */ React.createElement("input", { className: "upload-field", type: "text", placeholder: tl2("Nombre de tu mascota *", "Pet name *"), value: petName, onChange: (e) => setPetName(e.target.value), maxLength: 50 }), /* @__PURE__ */ React.createElement("textarea", { className: "upload-field", style: { resize: "vertical", minHeight: 90 }, placeholder: tl2("Cuenta su historia (opcional)...", "Tell their story (optional)..."), value: story, onChange: (e) => setStory(e.target.value.slice(0, 280)), maxLength: 280 }), /* @__PURE__ */ React.createElement("div", { className: "upload-charcount" }, story.length, "/280"), /* @__PURE__ */ React.createElement("label", { className: "upload-anon" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: anon, onChange: (e) => setAnon(e.target.checked) }), tl2("Publicar de forma an\xF3nima", "Post anonymously")), !anon && /* @__PURE__ */ React.createElement("input", { className: "upload-field", type: "text", placeholder: tl2("Tu nombre (opcional)", "Your name (optional)"), value: name, onChange: (e) => setName(e.target.value), maxLength: 60 }), error && /* @__PURE__ */ React.createElement("p", { style: { color: "#c0392b", fontSize: 13, marginBottom: 12 } }, error), /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary", style: { background: "var(--adopt-rose)", boxShadow: "0 8px 24px -8px rgba(232,93,117,.45)", width: "100%", justifyContent: "center" }, onClick: handleSubmit, disabled: loading }, loading ? tl2("Enviando...", "Sending...") : tl2("Publicar mi historia", "Post my story")))));
}
function CommunityStories({ lang }) {
  const tl2 = (es, en) => lang === "en" ? en : es;
  const [stories, setStories] = useState([]);
  useEffect(() => {
    if (!supa) return;
    supa.from("adoptions").select("*").eq("approved", true).order("created_at", { ascending: false }).limit(12).then(({ data }) => {
      if (data && data.length > 0) setStories(data);
    });
  }, []);
  const addStory = (s) => setStories((prev) => [{ ...s, id: Date.now() }, ...prev]);
  const fmtDate = (d) => new Date(d).toLocaleDateString(lang === "en" ? "en-US" : "es-US", { month: "short", year: "numeric" });
  const [petName, setPetName] = useState("");
  const [story, setStory] = useState("");
  const [name, setName] = useState("");
  const [anon, setAnon] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [drag, setDrag] = useState(false);
  const fileRef = React.useRef();
  const handleFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };
  const handleSubmit = async () => {
    if (!petName.trim()) {
      setError(tl2("El nombre de tu mascota es requerido.", "Pet name is required."));
      return;
    }
    setLoading(true);
    setError("");
    try {
      let photo_url = null;
      if (file && supa) {
        const ext = file.name.split(".").pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: upErr } = await supa.storage.from("adoption-photos").upload(path, file, { cacheControl: "3600", upsert: false });
        if (upErr) throw upErr;
        const { data: pub } = supa.storage.from("adoption-photos").getPublicUrl(path);
        photo_url = pub.publicUrl;
      }
      if (supa) {
        const { error: insErr } = await supa.from("adoptions").insert({
          pet_name: petName.trim(),
          story: story.trim() || null,
          submitter_name: anon ? null : name.trim() || null,
          is_anonymous: anon,
          photo_url,
          approved: true
        });
        if (insErr) throw insErr;
      }
      try { localStorage.setItem("bp_pending_social", JSON.stringify({ pet_name: petName.trim(), story: story.trim(), photo_url })); } catch (e) {}
      setSuccess(true);
      addStory({ pet_name: petName, story, submitter_name: anon ? null : name, is_anonymous: anon, photo_url: photo_url || preview, created_at: (/* @__PURE__ */ new Date()).toISOString() });
    } catch (e) {
      setError(tl2("Error al enviar. Intenta de nuevo.", "Error submitting. Please try again."));
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ React.createElement("section", { className: "adopt-stories" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 48 } }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow", style: { color: "var(--adopt-rose)" } }, tl2("Comunidad", "Community")), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(32px,4vw,52px)", margin: "10px 0 12px" } }, tl2("Comparte tu", "Share your"), " ", /* @__PURE__ */ React.createElement("em", { className: "serif-italic", style: { color: "var(--adopt-rose)" } }, tl2("historia.", "story."))), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)", fontSize: 16, maxWidth: "48ch", margin: 0 } }, tl2("Tu mascota merece ser conocida. Cu\xE9ntanos c\xF3mo lleg\xF3 a tu vida y s\xE9 parte de nuestra comunidad.", "Your pet deserves to be known. Tell us how they came into your life and become part of our community."))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: stories.length > 0 ? "420px 1fr" : "520px 1fr", gap: 48, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", border: "1px solid var(--line)", borderRadius: 24, padding: "32px 28px", boxShadow: "0 4px 32px rgba(0,0,0,0.05)" } }, success ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "32px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 56, height: 56, borderRadius: "50%", background: "rgba(16,185,129,0.1)", border: "2px solid rgba(16,185,129,0.3)", display: "grid", placeItems: "center", margin: "0 auto 16px", fontSize: 22 } }, "\u2713"), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "var(--display)", fontSize: 22, fontWeight: 700, color: "var(--ink)", margin: "0 0 8px", letterSpacing: "-0.02em" } }, tl2("\xA1Gracias por compartir!", "Thank you for sharing!")), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)", fontSize: 14, marginBottom: 16 } }, tl2("Tu historia ya es parte de nuestra comunidad.", "Your story is now part of our community.")), /* @__PURE__ */ React.createElement("a", { href: "/social", className: "btn btn-primary", style: { background: "var(--adopt-rose)", justifyContent: "center", width: "100%", marginBottom: 10 } }, tl2("Crea tu perfil en B Social con esta historia →", "Create your B Social profile with this story →")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setSuccess(false);
        setPetName("");
        setStory("");
        setName("");
        setPreview(null);
        setFile(null);
      },
      style: { marginTop: 20, padding: "10px 22px", borderRadius: 999, border: "1.5px solid var(--line)", background: "none", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", color: "var(--ink-2)" }
    },
    tl2("Compartir otra historia", "Share another story")
  )) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { border: `2px dashed ${drag ? "var(--adopt-rose)" : "var(--line)"}`, borderRadius: 14, padding: "20px 16px", textAlign: "center", cursor: "pointer", background: drag ? "rgba(232,93,117,0.04)" : "var(--bg)", transition: "all .15s" },
      onClick: () => fileRef.current.click(),
      onDragOver: (e) => {
        e.preventDefault();
        setDrag(true);
      },
      onDragLeave: () => setDrag(false),
      onDrop: (e) => {
        e.preventDefault();
        setDrag(false);
        handleFile(e.dataTransfer.files[0]);
      }
    },
    /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", style: { display: "none" }, onChange: (e) => handleFile(e.target.files[0]) }),
    preview ? /* @__PURE__ */ React.createElement("img", { src: preview, alt: "preview", style: { maxHeight: 160, borderRadius: 10, objectFit: "cover" } }) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, marginBottom: 6 } }, "\u{1F4F8}"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: "var(--ink-2)" } }, tl2("Sube la foto de tu mascota", "Upload your pet photo")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--ink-soft)", marginTop: 4 } }, "JPG, PNG \u2014 m\xE1x 5MB"))
  ), /* @__PURE__ */ React.createElement("input", { className: "upload-field", type: "text", placeholder: tl2("Nombre de tu mascota *", "Pet name *"), value: petName, onChange: (e) => setPetName(e.target.value), maxLength: 50 }), /* @__PURE__ */ React.createElement("textarea", { className: "upload-field", style: { resize: "vertical", minHeight: 80 }, placeholder: tl2("Cuenta su historia (opcional)\u2026", "Tell their story (optional)\u2026"), value: story, onChange: (e) => setStory(e.target.value.slice(0, 280)), maxLength: 280 }), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--ink-soft)", textAlign: "right", marginTop: -10 } }, story.length, "/280"), /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "var(--ink-2)", cursor: "pointer" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: anon, onChange: (e) => setAnon(e.target.checked) }), tl2("Publicar de forma an\xF3nima", "Post anonymously")), !anon && /* @__PURE__ */ React.createElement("input", { className: "upload-field", type: "text", placeholder: tl2("Tu nombre (opcional)", "Your name (optional)"), value: name, onChange: (e) => setName(e.target.value), maxLength: 60 }), error && /* @__PURE__ */ React.createElement("p", { style: { color: "#c0392b", fontSize: 13, margin: 0 } }, error), /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary", style: { background: "var(--adopt-rose)", boxShadow: "0 8px 24px -8px rgba(232,93,117,.45)", justifyContent: "center" }, onClick: handleSubmit, disabled: loading }, loading ? tl2("Enviando\u2026", "Sending\u2026") : tl2("Publicar mi historia", "Post my story")))), stories.length > 0 ? /* @__PURE__ */ React.createElement("div", { className: "stories-grid" }, stories.map((s) => /* @__PURE__ */ React.createElement("div", { key: s.id, className: "story-card" }, /* @__PURE__ */ React.createElement("div", { className: "story-card-photo" }, s.photo_url ? /* @__PURE__ */ React.createElement("img", { src: s.photo_url, alt: s.pet_name, loading: "lazy" }) : /* @__PURE__ */ React.createElement("div", { className: "story-card-photo-ph" }, s.pet_name.charAt(0))), /* @__PURE__ */ React.createElement("div", { className: "story-card-body" }, /* @__PURE__ */ React.createElement("div", { className: "story-card-pet" }, s.pet_name), s.story && /* @__PURE__ */ React.createElement("p", { className: "story-card-text" }, s.story), /* @__PURE__ */ React.createElement("div", { className: "story-card-meta" }, /* @__PURE__ */ React.createElement("span", null, s.is_anonymous || !s.submitter_name ? tl2("An\xF3nimo", "Anonymous") : s.submitter_name), /* @__PURE__ */ React.createElement("span", null, "\xB7"), /* @__PURE__ */ React.createElement("span", null, fmtDate(s.created_at)), /* @__PURE__ */ React.createElement("span", { className: "story-card-badge" }, tl2("Adoptado", "Adopted"))))))) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 0", color: "var(--ink-soft)", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 56, marginBottom: 16 } }, "\u{1F43E}"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "var(--display)", fontSize: 22, fontWeight: 700, color: "var(--ink)", marginBottom: 8 } }, tl2("S\xE9 el primero en compartir", "Be the first to share")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "var(--ink-2)", maxWidth: "32ch", margin: "0 auto", lineHeight: 1.65 } }, tl2("Las historias de la comunidad aparecer\xE1n aqu\xED conforme la gente las comparta.", "Community stories will appear here as people share them."))))));
}
function AdopcionesApp() {
  const [lang, setLang] = useState(localStorage.getItem("bpuppy-lang") || "es");
  useEffect(() => {
    const h = (e) => setLang(e.detail);
    window.addEventListener("bpuppy-lang-change", h);
    return () => window.removeEventListener("bpuppy-lang-change", h);
  }, []);
  const t = (arr) => Array.isArray(arr) ? lang === "en" ? arr[1] || arr[0] : arr[0] : arr;
  const DEFAULT_STATES = ["Florida", "Texas", "California", "New York", "Georgia", "Illinois", "North Carolina", "Washington"];
  const [state, setState] = useState("__default__");
  const [cityFilter, setCityFilter] = useState("");
  const filteredData = useMemo(() => {
    let entries;
    if (state === "__default__") {
      entries = DEFAULT_STATES.map((s) => [s, SHELTERS_BY_STATE[s] || []]);
    } else if (state === "__all__") {
      entries = US_STATES.map((s) => [s, SHELTERS_BY_STATE[s]]);
    } else if (state) {
      entries = [[state, SHELTERS_BY_STATE[state] || []]];
    } else {
      entries = DEFAULT_STATES.map((s) => [s, SHELTERS_BY_STATE[s] || []]);
    }
    if (cityFilter.trim()) {
      const q = cityFilter.trim().toLowerCase();
      entries = entries.map(([s, shelters]) => [s, shelters.filter((sh) => sh.city.toLowerCase().includes(q) || sh.name.toLowerCase().includes(q))]).filter(([, shelters]) => shelters.length > 0);
    }
    return entries;
  }, [state, cityFilter]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", { className: "page-hero" }, /* @__PURE__ */ React.createElement("div", { className: "paw-deco paw-deco-1" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 120 120" }, /* @__PURE__ */ React.createElement("ellipse", { cx: "60", cy: "72", rx: "28", ry: "22", fill: "currentColor" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "32", cy: "48", rx: "12", ry: "16", fill: "currentColor" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "88", cy: "48", rx: "12", ry: "16", fill: "currentColor" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "42", cy: "28", rx: "10", ry: "14", fill: "currentColor" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "78", cy: "28", rx: "10", ry: "14", fill: "currentColor" }))), /* @__PURE__ */ React.createElement("div", { className: "paw-deco paw-deco-2" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 120 120" }, /* @__PURE__ */ React.createElement("ellipse", { cx: "60", cy: "72", rx: "28", ry: "22", fill: "currentColor" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "32", cy: "48", rx: "12", ry: "16", fill: "currentColor" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "88", cy: "48", rx: "12", ry: "16", fill: "currentColor" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "42", cy: "28", rx: "10", ry: "14", fill: "currentColor" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "78", cy: "28", rx: "10", ry: "14", fill: "currentColor" }))), /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("a", { href: "/", className: "back-link" }, t(T.back)), /* @__PURE__ */ React.createElement("h1", null, t(T.hero_title), " ", /* @__PURE__ */ React.createElement("em", null, t(T.hero_em))), /* @__PURE__ */ React.createElement("p", null, t(T.hero_p)))), /* @__PURE__ */ React.createElement("section", { className: "our-story" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "story-grid" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow", style: { color: "var(--adopt-rose)" } }, t(T.story_eye)), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(32px,4vw,48px)", margin: "12px 0 20px" } }, t(T.story_h), " ", /* @__PURE__ */ React.createElement("em", { className: "serif-italic", style: { color: "var(--adopt-rose)" } }, t(T.story_em))), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", margin: "0 0 16px" } }, t(T.story_p1)), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", margin: "0 0 16px" } }, t(T.story_p2)), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", margin: 0 } }, t(T.story_p3))), /* @__PURE__ */ React.createElement("div", { className: "story-visual" }, /* @__PURE__ */ React.createElement("img", { src: "uploads/Adopt.webp", alt: "Familia con perro rescatado" }))))), /* @__PURE__ */ React.createElement("section", { className: "disclaimer-bar" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "disclaimer-inner" }, /* @__PURE__ */ React.createElement("div", { className: "disclaimer-icon" }, /* @__PURE__ */ React.createElement("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "8", x2: "12", y2: "12" }), /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" }))), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, t(T.disc_label)), " ", t(T.disc))))), /* @__PURE__ */ React.createElement("section", { className: "shelter-finder" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "eyebrow", style: { color: "var(--adopt-rose)" } }, t(T.finder_eye)), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(32px,4vw,56px)", margin: "12px 0 8px" } }, t(T.finder_h), " ", /* @__PURE__ */ React.createElement("em", { className: "serif-italic", style: { color: "var(--adopt-rose)" } }, t(T.finder_em))), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)", maxWidth: "56ch", margin: 0, fontSize: 17, lineHeight: 1.55 } }, t(T.finder_p)), /* @__PURE__ */ React.createElement("div", { className: "finder-controls" }, /* @__PURE__ */ React.createElement("select", { className: "finder-select", value: state, onChange: (e) => {
    setState(e.target.value);
    setCityFilter("");
  } }, /* @__PURE__ */ React.createElement("option", { value: "__default__" }, lang === "en" ? "8 main states" : "8 estados principales"), /* @__PURE__ */ React.createElement("option", { value: "__all__" }, t(T.select_all)), /* @__PURE__ */ React.createElement("option", { disabled: "" }, "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500"), US_STATES.map((s) => /* @__PURE__ */ React.createElement("option", { key: s, value: s }, s))), state && /* @__PURE__ */ React.createElement("input", { className: "finder-city-filter", type: "text", placeholder: t(T.city_ph), value: cityFilter, onChange: (e) => setCityFilter(e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "shelter-results" }, filteredData && filteredData.length === 0 && /* @__PURE__ */ React.createElement("div", { className: "shelter-empty" }, t(T.no_match)), filteredData && filteredData.map(([stateName, shelters]) => /* @__PURE__ */ React.createElement("div", { key: stateName }, /* @__PURE__ */ React.createElement("div", { className: "shelter-state-label" }, stateName, /* @__PURE__ */ React.createElement("span", { className: "shelter-count" }, shelters.length)), /* @__PURE__ */ React.createElement("div", { className: "shelter-grid" }, shelters.map((sh, i) => /* @__PURE__ */ React.createElement("a", { key: i, href: sh.url, target: "_blank", rel: "noreferrer", className: "shelter-card" }, /* @__PURE__ */ React.createElement("div", { className: "shelter-card-icon" }, /* @__PURE__ */ React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }), /* @__PURE__ */ React.createElement("polyline", { points: "9 22 9 12 15 12 15 22" }))), /* @__PURE__ */ React.createElement("div", { className: "shelter-card-info" }, /* @__PURE__ */ React.createElement("h4", null, sh.name), /* @__PURE__ */ React.createElement("span", { className: "shelter-city" }, sh.city), sh.phone && /* @__PURE__ */ React.createElement("div", { className: "shelter-phone" }, sh.phone)), /* @__PURE__ */ React.createElement("div", { className: "shelter-card-arrow" }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M7 17L17 7M17 7H7M17 7v10" }))))))))))), /* @__PURE__ */ React.createElement(CommunityStories, { lang }), /* @__PURE__ */ React.createElement("section", { className: "coming-soon" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "coming-inner" }, /* @__PURE__ */ React.createElement("div", { className: "coming-badge" }, t(T.coming_badge)), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(28px,4vw,42px)", margin: "0 0 16px" } }, t(T.coming_h), " ", /* @__PURE__ */ React.createElement("em", { className: "serif-italic", style: { color: "var(--adopt-rose)" } }, t(T.coming_em))), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)", fontSize: 17, lineHeight: 1.6, margin: 0 } }, t(T.coming_p))))), /* @__PURE__ */ React.createElement("section", { className: "adopt-cta" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("h2", null, t(T.cta_h), " ", /* @__PURE__ */ React.createElement("em", null, t(T.cta_em))), /* @__PURE__ */ React.createElement("p", { style: { maxWidth: "48ch", margin: "0 auto 28px" } }, t(T.cta_p)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("a", { href: "https://wa.me/19294287300", target: "_blank", rel: "noreferrer", className: "btn btn-primary", style: { background: "var(--adopt-rose)", boxShadow: "0 8px 24px -8px rgba(232,93,117,0.5)" } }, t(T.wa)), /* @__PURE__ */ React.createElement("a", { href: "tel:+19294287300", className: "btn", style: { background: "rgba(255,255,255,.15)", color: "#fff", border: "1px solid rgba(255,255,255,.3)" } }, t(T.call))))), /* @__PURE__ */ React.createElement(Footer, null));
}
function AdopcionesRoot() {
  const isLive = useSitePublish("Adopciones");
  if (!isLive) return /* @__PURE__ */ React.createElement(ComingSoon, { pageName: "Adopciones" });
  return /* @__PURE__ */ React.createElement(AdopcionesApp, null);
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(AdopcionesRoot, null));

})();
