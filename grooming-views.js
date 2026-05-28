(function(){
const { useState, useEffect, useMemo } = React;
const SIZES = ["Peque\xF1o\n(< 15 lbs)", "Mediano\n(15\u201340 lbs)", "Grande\n(40\u201370 lbs)", "XL\n(70+ lbs)"];
const SIZEKEYS = ["s", "m", "l", "xl"];
const SERVICES = [
  { name: "Ba\xF1o completo", desc: "Shampoo, acondicionador, secado y cepillado", emoji: "\u{1F6C1}", prices: { s: 40, m: 55, l: 70, xl: 90 } },
  { name: "Ba\xF1o + Corte", desc: "Ba\xF1o completo m\xE1s corte a tu elecci\xF3n", emoji: "\u2702\uFE0F", prices: { s: 65, m: 85, l: 105, xl: 135 } },
  { name: "Corte solo", desc: "Corte sin ba\xF1o (requiere pelaje limpio)", emoji: "\u{1F488}", prices: { s: 35, m: 45, l: 55, xl: 70 } },
  { name: "U\xF1as", desc: "Corte y lima de u\xF1as", emoji: "\u{1F485}", prices: { s: 15, m: 15, l: 15, xl: 15 } },
  { name: "Limpieza de o\xEDdos", desc: "Limpieza profunda con soluci\xF3n \xF3tica", emoji: "\u{1F442}", prices: { s: 15, m: 15, l: 15, xl: 15 } },
  { name: "Deslanado / Desenredo", desc: "Eliminaci\xF3n de pelo muerto o nudos", emoji: "\u{1FAAE}", prices: { s: 30, m: 45, l: 60, xl: 75 } },
  { name: "Spa VIP", desc: "Ba\xF1o, corte, deslanado, u\xF1as, o\xEDdos, colonia y bandana", emoji: "\u2B50", prices: { s: 95, m: 120, l: 150, xl: 185 }, highlight: true }
];
const PACKAGES = [
  {
    name: "Paquete B\xE1sico",
    emoji: "\u{1F43E}",
    color: "#1EB87A",
    bg: "#E0F7EF",
    includes: ["Ba\xF1o completo", "U\xF1as", "Limpieza de o\xEDdos"],
    prices: { s: 60, m: 75, l: 95, xl: 120 },
    note: "Ideal para mantenimiento mensual r\xE1pido"
  },
  {
    name: "Paquete Est\xE1ndar",
    emoji: "\u2728",
    color: "#F58220",
    bg: "#FFF0E0",
    includes: ["Ba\xF1o completo", "Corte a elecci\xF3n", "U\xF1as", "Limpieza de o\xEDdos"],
    prices: { s: 75, m: 95, l: 120, xl: 150 },
    note: "El m\xE1s popular. Todo lo esencial en una visita",
    popular: true
  },
  {
    name: "Spa VIP",
    emoji: "\u{1F48E}",
    color: "#7C3AED",
    bg: "#F0EAFF",
    includes: ["Ba\xF1o premium con aromaterapia", "Corte profesional", "Deslanado completo", "U\xF1as + lima", "Limpieza de o\xEDdos", "Colonia + bandana de regalo"],
    prices: { s: 110, m: 135, l: 165, xl: 210 },
    note: "La experiencia completa. Para una ocasi\xF3n especial o mensual"
  }
];
const MEMBERSHIPS = [
  {
    name: "Plan Esencial",
    emoji: "\u{1F33F}",
    color: "#1EB87A",
    price_month: 59,
    price_year: 570,
    savings: 138,
    includes: ["1 ba\xF1o completo al mes", "U\xF1as incluidas", "10% dto en servicios adicionales", "Recordatorios autom\xE1ticos"],
    cta: "El plan perfecto para mantenimiento b\xE1sico constante"
  },
  {
    name: "Plan Total",
    emoji: "\u2B50",
    color: "#F58220",
    price_month: 99,
    price_year: 990,
    price_month_promo: 79,
    price_year_promo: 790,
    savings: 198,
    savings_promo: 158,
    promo: true,
    includes: ["1 ba\xF1o + corte al mes", "U\xF1as y o\xEDdos incluidos", "\u{1F690} Pickup & Delivery incluido (10 mi)", "15% dto en servicios adicionales", "Prioridad en agenda", "Foto profesional mensual"],
    cta: "El m\xE1s popular. Todo incluido + recogida y entrega.",
    popular: true
  },
  {
    name: "Plan VIP",
    emoji: "\u{1F48E}",
    color: "#7C3AED",
    price_month: 149,
    price_year: 1499,
    savings: 289,
    includes: ["Spa VIP mensual completo", "\u{1F690} Pickup & Delivery incluido (radio ilimitado)", "20% dto en todos los servicios", "Agenda reservada siempre disponible", "Reporte mensual de salud del pelaje", "Regalo de cumplea\xF1os para tu mascota"],
    cta: "La experiencia premium completa con pickup y delivery incluido"
  }
];
const PAYMENT_METHODS = [
  { name: "Zelle", emoji: "\u{1F49C}", color: "#6D1ED4" },
  { name: "Venmo", emoji: "\u{1F499}", color: "#3D95CE" },
  { name: "CashApp", emoji: "\u{1F49A}", color: "#00D632" },
  { name: "Tarjeta de cr\xE9dito", emoji: "\u{1F4B3}", color: "#2D2421" },
  { name: "Efectivo", emoji: "\u{1F4B5}", color: "#2D6A4F" }
];
function BookingCalendar() {
  const today = /* @__PURE__ */ new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);
  const [selectedServices, setSelectedServices] = useState(/* @__PURE__ */ new Set());
  const [size, setSize] = useState("");
  const [petName, setPetName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [pickup, setPickup] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [distInfo, setDistInfo] = useState(null);
  const [checkingDist, setCheckingDist] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [takenSlots, setTakenSlots] = useState([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [bookErr, setBookErr] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [step, setStep] = useState(1);
  const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const DAYS_OF_WEEK = ["Dom", "Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b"];
  const TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
  const sizeKey = { "Peque\xF1o": "s", "Mediano": "m", "Grande": "l", "XL": "xl" }[size] || "s";
  const toggleService = (name) => {
    setSelectedServices((prev) => {
      const n = new Set(prev);
      n.has(name) ? n.delete(name) : n.add(name);
      return n;
    });
  };
  const total = useMemo(() => {
    const base = [...selectedServices].reduce((sum, name) => {
      const sv = SERVICES.find((s) => s.name === name);
      return sum + (sv ? sv.prices[sizeKey] : 0);
    }, 0);
    const pickupCost = pickup && !isMember ? 20 : 0;
    return base + pickupCost;
  }, [selectedServices, sizeKey, pickup, isMember]);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const isAvailable = (d) => {
    const date = new Date(year, month, d);
    return date >= new Date(today.getFullYear(), today.getMonth(), today.getDate()) && date.getDay() !== 0;
  };
  const canStep2 = selectedServices.size > 0 && size;
  const canConfirm = day && time && petName && ownerName && phone;
  const canSubmit = canConfirm && accepted;
  const buildWhatsApp = () => {
    const dateStr = `${day} de ${MONTHS[month]}, ${year}`;
    const svList = [...selectedServices].join(", ");
    const msg = encodeURIComponent(`Hola! Quiero agendar grooming:

\u{1F43E} Mascota: ${petName}
\u{1F4D0} Tama\xF1o: ${size}
\u2702\uFE0F Servicios: ${svList}
${pickup ? isMember ? "\u{1F690} Pickup & Delivery: Incluido (miembro)" : "\u{1F690} Pickup & Delivery: S\xED (+$20)" : "\u{1F4CD} Llevo mi mascota al local"}
\u{1F4B0} Total: $${total}
\u{1F4C5} Fecha: ${dateStr} a las ${time}
\u{1F464} Nombre: ${ownerName}
\u{1F4DE} Tel\xE9fono: ${phone}${promoCode ? "\n\u{1F3AB} C\xF3digo promo: " + promoCode : ""}${notes ? "\n\u{1F4DD} Notas: " + notes : ""}`);
    return `https://wa.me/18084928294?text=${msg}`;
  };
  const loadSlots = async (d) => {
    setTakenSlots([]);
    const dateStr = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");
    try {
      const ak = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
      const r = await fetch("https://oqqwmcplljirbreowrll.supabase.co/functions/v1/grooming_slots", { method: "POST", headers: { "Content-Type": "application/json", "apikey": ak }, body: JSON.stringify({ date: dateStr }) });
      const j = await r.json();
      if (j && Array.isArray(j.taken)) setTakenSlots(j.taken);
    } catch (e) {}
  };
  const GROOMING_LATLNG = [28.10724, -81.56348];
  const checkDistance = async () => {
    const z = zip.trim();
    if (z.length < 5) { setDistInfo({ tier: "err", miles: 0, msg: "Escribe un código postal válido de 5 dígitos." }); return; }
    setCheckingDist(true); setDistInfo(null);
    try {
      const r = await fetch("https://nominatim.openstreetmap.org/search?format=json&country=us&postalcode=" + encodeURIComponent(z));
      const arr = await r.json();
      if (!arr || !arr.length) { setDistInfo({ tier: "err", miles: 0, msg: "No encontramos ese código postal. Coordina por WhatsApp." }); setCheckingDist(false); return; }
      const toRad = (x) => x * Math.PI / 180, R = 3958.8;
      const lat = parseFloat(arr[0].lat), lng = parseFloat(arr[0].lon);
      const dLat = toRad(lat - GROOMING_LATLNG[0]), dLng = toRad(lng - GROOMING_LATLNG[1]);
      const s1 = Math.sin(dLat / 2), s2 = Math.sin(dLng / 2);
      const h = s1 * s1 + Math.cos(toRad(GROOMING_LATLNG[0])) * Math.cos(toRad(lat)) * s2 * s2;
      const miles = 2 * R * Math.asin(Math.sqrt(h));
      const m = Math.round(miles * 10) / 10;
      let tier, msg;
      if (miles <= 10) { tier = "ok"; msg = "Estás a ~" + m + " millas — dentro de nuestro radio de pickup & delivery (10 millas)."; }
      else if (miles <= 11) { tier = "edge"; msg = "Estás a ~" + m + " millas, justo en el límite. Nuestro pickup llega oficialmente a 10 millas, pero como estás muy cerca coordinamos con administración para que el chofer pase por tu mascota. Te confirmamos por WhatsApp."; }
      else { tier = "far"; msg = "Por ahora nuestro pickup & delivery llega hasta 10 millas y estás a ~" + m + " millas. Puedes traer tu mascota al local, o coordinar un punto de encuentro dentro de nuestro radio — escríbenos por WhatsApp."; }
      setDistInfo({ tier, miles: m, msg }); setCheckingDist(false);
    } catch (e) { setDistInfo({ tier: "err", miles: 0, msg: "No pudimos verificar la distancia ahora. Coordina por WhatsApp." }); setCheckingDist(false); }
  };
  const submitBooking = async () => {
    if (sending || sent) return true;
    setSending(true); setBookErr("");
    try {
      const ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
      const appointment_date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const notesFull = notes + (zip ? " | ZIP: " + zip + (distInfo ? " (~" + distInfo.miles + "mi)" : "") : "");
      const res = await fetch("https://oqqwmcplljirbreowrll.supabase.co/functions/v1/grooming_book", {
        method: "POST", headers: { "Content-Type": "application/json", "apikey": ANON },
        body: JSON.stringify({ pet_name: petName, services: [...selectedServices], amount: total, size, notes: notesFull, appointment_date, appointment_time: time, client_name: ownerName, phone, email, contact_preference: email ? "email" : "whatsapp", pickup, promo: promoCode }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) { setBookErr(d.error || "No se pudo guardar la reserva."); setSending(false); return false; }
      if (d && d.id) setBookingId(d.id);
      setSent(true); setSending(false); return true;
    } catch (e) { setBookErr("Error de conexion. Intenta por WhatsApp."); setSending(false); return false; }
  };
  const StepDots = () => /* @__PURE__ */ React.createElement("div", { style: { display: "flex", marginBottom: 24, gap: 0 } }, [["1", "Servicios"], ["2", "Fecha"], ["3", "Confirmar"]].map(([n, label], i) => {
    const active = step === i + 1, done = step > i + 1;
    return /* @__PURE__ */ React.createElement("div", { key: n, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: done ? "pointer" : "default" }, onClick: () => done && setStep(i + 1) }, /* @__PURE__ */ React.createElement("div", { style: { width: 30, height: 30, borderRadius: "50%", background: active ? "var(--orange)" : done ? "#1EB87A" : "var(--bg)", color: active || done ? "#fff" : "var(--ink-2)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800, transition: "all .2s" } }, done ? "\u2713" : n), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: active ? 700 : 500, color: active ? "var(--orange)" : "var(--ink-2)" } }, label));
  }));
  return /* @__PURE__ */ React.createElement("div", { style: { background: "var(--paper)", borderRadius: 24, padding: "24px", boxShadow: "0 4px 32px -8px rgba(45,36,33,0.12)" } }, /* @__PURE__ */ React.createElement(StepDots, null), step === 1 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 8 } }, "Tama\xF1o de tu mascota"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 } }, [["Peque\xF1o", "<15lb"], ["Mediano", "15-40"], ["Grande", "40-70"], ["XL", "70+"]].map(([s, sub]) => /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => setSize(s), style: { padding: "8px 4px", borderRadius: 10, border: `2px solid ${size === s ? "var(--orange)" : "var(--line)"}`, background: size === s ? "rgba(245,130,32,0.07)" : "var(--bg)", cursor: "pointer", fontFamily: "inherit", transition: "all .15s", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--ink)" } }, s), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--ink-soft)" } }, sub))))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 8 } }, "Selecciona uno o m\xE1s servicios"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 14 } }, SERVICES.map((sv) => {
    const sel = selectedServices.has(sv.name);
    const price = size ? sv.prices[sizeKey] : sv.prices["s"];
    const isFrom = !size;
    return /* @__PURE__ */ React.createElement("button", { key: sv.name, onClick: () => toggleService(sv.name), style: { padding: "12px 10px", borderRadius: 14, border: `2px solid ${sel ? "var(--orange)" : "var(--line)"}`, background: sel ? "rgba(245,130,32,0.07)" : "var(--bg)", cursor: "pointer", fontFamily: "inherit", transition: "all .15s", textAlign: "left", position: "relative" } }, sel && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 8, right: 8, width: 18, height: 18, borderRadius: "50%", background: "var(--orange)", color: "#fff", fontSize: 10, fontWeight: 800, display: "grid", placeItems: "center" } }, "\u2713"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, marginBottom: 4 } }, sv.emoji), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: "var(--ink)", lineHeight: 1.2, marginBottom: 3 } }, sv.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: sel ? "var(--orange)" : "var(--ink-2)" } }, isFrom ? "desde " : "", "$", price));
  })), /* @__PURE__ */ React.createElement("div", { style: { borderRadius: 14, border: `2px solid ${pickup ? "var(--orange)" : "var(--line)"}`, background: pickup ? "rgba(245,130,32,0.06)" : "var(--bg)", marginBottom: 14, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setPickup((p) => !p), style: { width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 20 } }, "\u{1F690}"), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "left" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--ink)" } }, "Pickup & Delivery"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--ink-2)" } }, "Recogemos y entregamos en tu casa"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, !isMember && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: pickup ? "var(--orange)" : "var(--ink-2)" } }, "+$20"), isMember && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "#1EB87A" } }, "\u2713 Gratis"), /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 20, borderRadius: 10, background: pickup ? "var(--orange)" : "var(--line)", position: "relative", transition: "background .2s", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 2, left: pickup ? 16 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)", display: "block" } })))), pickup && /* @__PURE__ */ React.createElement("div", { style: { padding: "0 14px 12px", borderTop: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 700, color: "var(--ink-2)", margin: "10px 0 6px" } }, "Tu código postal (verificamos cobertura de 10 millas)"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { value: zip, onChange: (e) => setZip(e.target.value.replace(/[^0-9]/g, "").slice(0, 5)), placeholder: "Ej. 33844", inputMode: "numeric", style: { flex: 1, padding: "9px 12px", borderRadius: 10, border: "1.5px solid var(--line)", background: "var(--bg)", fontFamily: "inherit", fontSize: 14, color: "var(--ink)", outline: "none" } }), /* @__PURE__ */ React.createElement("button", { type: "button", onClick: checkDistance, disabled: checkingDist, style: { padding: "9px 16px", borderRadius: 10, border: "none", background: "var(--orange)", color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" } }, checkingDist ? "Verificando..." : "Verificar")), distInfo && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontSize: 12, lineHeight: 1.5, fontWeight: 600, color: distInfo.tier === "ok" ? "#1EB87A" : distInfo.tier === "far" || distInfo.tier === "err" ? "var(--ink-2)" : "var(--orange)" } }, distInfo.msg)), isMember ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#1EB87A", fontWeight: 600 } }, "\u2713 Pickup & Delivery gratis con tu membres\xEDa (radio 10 millas)") : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--ink-2)", lineHeight: 1.55 } }, "\u{1F4A1} ", /* @__PURE__ */ React.createElement("strong", null, "Consejo:"), " Con el Plan Total o VIP, el pickup & delivery es gratis en un radio de 10 millas. La disponibilidad de recogida se verifica al confirmar por WhatsApp."))), /* @__PURE__ */ React.createElement("div", { style: { background: selectedServices.size > 0 ? "rgba(245,130,32,0.08)" : "var(--bg)", borderRadius: 14, padding: "12px 16px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center", border: `1.5px solid ${selectedServices.size > 0 ? "rgba(245,130,32,0.3)" : "var(--line)"}`, transition: "all .2s" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--ink-2)", textTransform: "uppercase", letterSpacing: "0.04em" } }, "Total estimado"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--ink-soft)", marginTop: 2 } }, selectedServices.size > 0 ? [...selectedServices].join(" + ") : "Selecciona servicios arriba")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 26, fontWeight: 800, color: selectedServices.size > 0 ? "var(--orange)" : "var(--ink-soft)" } }, selectedServices.size > 0 ? `$${total}` : "\u2014")), /* @__PURE__ */ React.createElement("button", { onClick: () => canStep2 && setStep(2), disabled: !canStep2, style: { width: "100%", padding: "14px", borderRadius: 14, border: "none", background: canStep2 ? "var(--orange)" : "var(--line)", color: canStep2 ? "#fff" : "var(--ink-2)", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: canStep2 ? "pointer" : "default", transition: "all .2s" } }, "Elegir fecha y hora \u2192"), !size && selectedServices.size > 0 && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: "var(--orange)", textAlign: "center", margin: "8px 0 0" } }, "Selecciona el tama\xF1o para ver precios")), step === 2 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
    setDay(null);
  }, style: { background: "var(--bg)", border: "none", cursor: "pointer", borderRadius: 8, padding: "6px 10px", fontSize: 16, color: "var(--ink-2)" } }, "\u2039"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, textAlign: "center", fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 16, fontWeight: 700, color: "var(--ink)" } }, MONTHS[month], " ", year), /* @__PURE__ */ React.createElement("button", { onClick: () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
    setDay(null);
  }, style: { background: "var(--bg)", border: "none", cursor: "pointer", borderRadius: 8, padding: "6px 10px", fontSize: 16, color: "var(--ink-2)" } }, "\u203A")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 16 } }, DAYS_OF_WEEK.map((d) => /* @__PURE__ */ React.createElement("div", { key: d, style: { textAlign: "center", fontSize: 10, fontWeight: 700, color: "var(--ink-soft)", padding: "4px 0" } }, d)), Array.from({ length: firstDayOfWeek }).map((_, i) => /* @__PURE__ */ React.createElement("div", { key: "e" + i })), Array.from({ length: daysInMonth }).map((_, i) => {
    const d = i + 1;
    const avail = isAvailable(d);
    const sel = day === d;
    return /* @__PURE__ */ React.createElement("button", { key: d, onClick: () => { if (avail) { setDay(d); setTime(""); loadSlots(d); } }, disabled: !avail, style: { aspectRatio: "1", borderRadius: 10, border: "none", background: sel ? "var(--orange)" : avail ? "var(--bg)" : "transparent", color: sel ? "#fff" : avail ? "var(--ink)" : "var(--ink-soft)", fontSize: 13, fontWeight: sel ? 700 : 400, cursor: avail ? "pointer" : "default", opacity: avail ? 1 : 0.35, transition: "all .15s" } }, d);
  })), day && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 8 } }, "Hora disponible"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 16 } }, TIMES.map((t) => { const full = takenSlots.includes(t); return /* @__PURE__ */ React.createElement("button", { key: t, disabled: full, onClick: () => !full && setTime(t), title: full ? "Horario lleno" : "", style: { padding: "8px 4px", borderRadius: 10, border: `2px solid ${time === t ? "var(--orange)" : "var(--line)"}`, background: full ? "var(--paper)" : time === t ? "rgba(245,130,32,0.07)" : "var(--bg)", cursor: full ? "not-allowed" : "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: time === t ? 700 : 500, color: full ? "var(--ink-soft)" : "var(--ink)", textDecoration: full ? "line-through" : "none", opacity: full ? 0.55 : 1, transition: "all .15s" } }, t); }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(1), style: { flex: 1, padding: "13px", borderRadius: 14, border: "1.5px solid var(--line)", background: "none", fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: "var(--ink-2)", cursor: "pointer" } }, "\u2190 Atr\xE1s"), /* @__PURE__ */ React.createElement("button", { onClick: () => day && time && setStep(3), disabled: !day || !time, style: { flex: 2, padding: "13px", borderRadius: 14, border: "none", background: day && time ? "var(--orange)" : "var(--line)", color: day && time ? "#fff" : "var(--ink-2)", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: day && time ? "pointer" : "default", transition: "all .2s" } }, "Continuar \u2192"))), step === 3 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: "0 0 4px" } }, "Confirmar cita"), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", borderRadius: 12, padding: "12px 16px", marginBottom: 18, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.7 } }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--ink)" } }, [...selectedServices].join(" + ")), " \xB7 ", size, /* @__PURE__ */ React.createElement("br", null), "\u{1F4C5} ", day, " de ", ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][month], ", ", year, " a las ", time), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 } }, [
    ["Nombre de tu mascota", petName, setPetName, "Max, Luna, Toby..."],
    ["Tu nombre", ownerName, setOwnerName, "Nombre completo"],
    ["Tel\xE9fono", phone, setPhone, "+1 (305) 000-0000"],
    ["Correo (para confirmaci\xF3n y recordatorios)", email, setEmail, "tu@correo.com"]
  ].map(([label, val, setter, ph]) => /* @__PURE__ */ React.createElement("div", { key: label }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 700, color: "var(--ink-2)", marginBottom: 4 } }, label), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: val,
      onChange: (e) => setter(e.target.value),
      placeholder: ph,
      style: { width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid var(--line)", background: "var(--bg)", fontFamily: "inherit", fontSize: 14, color: "var(--ink)", outline: "none" },
      onFocus: (e) => e.target.style.borderColor = "var(--orange)",
      onBlur: (e) => e.target.style.borderColor = "var(--line)"
    }
  ))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 700, color: "var(--ink-2)", marginBottom: 4 } }, "Notas adicionales (opcional)"), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: notes,
      onChange: (e) => setNotes(e.target.value),
      placeholder: "Raza, temperamento, algo que debamos saber...",
      rows: 2,
      style: { width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid var(--line)", background: "var(--bg)", fontFamily: "inherit", fontSize: 14, color: "var(--ink)", outline: "none", resize: "vertical" },
      onFocus: (e) => e.target.style.borderColor = "var(--orange)",
      onBlur: (e) => e.target.style.borderColor = "var(--line)"
    }
  )), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 700, color: "var(--ink-2)", marginBottom: 4 } }, "\u{1F3AB} C\xF3digo de promoci\xF3n (opcional)"), /* @__PURE__ */ React.createElement("input", { value: promoCode, onChange: (e) => setPromoCode(e.target.value.toUpperCase()), placeholder: "Ej. APERTURA", style: { width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${promoCode ? "var(--orange)" : "var(--line)"}`, background: promoCode ? "rgba(245,130,32,0.06)" : "var(--bg)", fontFamily: "inherit", fontSize: 14, color: "var(--ink)", outline: "none", fontWeight: promoCode ? 700 : 400, letterSpacing: promoCode ? "0.08em" : 0 } }), promoCode === "APERTURA" && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#1EB87A", fontWeight: 700, marginTop: 4 } }, "\u2713 \xA1C\xF3digo de apertura aplicado! Primer ba\xF1o + corte gratis en tu visita.")), /* @__PURE__ */ React.createElement("button", { onClick: () => setIsMember((m) => !m), style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${isMember ? "#1EB87A" : "var(--line)"}`, background: isMember ? "rgba(30,184,122,0.08)" : "var(--bg)", cursor: "pointer", fontFamily: "inherit", width: "100%", textAlign: "left" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 20, height: 20, borderRadius: 4, border: `2px solid ${isMember ? "#1EB87A" : "var(--line)"}`, background: isMember ? "#1EB87A" : "transparent", display: "grid", placeItems: "center", flexShrink: 0, transition: "all .15s" } }, isMember && /* @__PURE__ */ React.createElement("span", { style: { color: "#fff", fontSize: 12, fontWeight: 800 } }, "\u2713")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: "var(--ink)" } }, "Soy miembro Plan Total o VIP"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#1EB87A", fontWeight: 600 } }, "Pickup & Delivery gratis en radio de 10 millas")))), /* @__PURE__ */ React.createElement("label", { style: { display: "flex", gap: 10, alignItems: "flex-start", margin: "4px 0 12px", cursor: "pointer", fontSize: 12, color: "var(--ink-2)", lineHeight: 1.5 } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: accepted, onChange: (e) => setAccepted(e.target.checked), style: { marginTop: 2, width: 16, height: 16, flexShrink: 0, accentColor: "var(--orange)" } }), /* @__PURE__ */ React.createElement("span", null, "He leido y acepto las politicas: pago por adelantado, cancelacion con menos de 24h 50%, no-show 100%, recogida dentro de 1 hora. ", /* @__PURE__ */ React.createElement("a", { href: "#policies", style: { color: "var(--orange)", fontWeight: 700, textDecoration: "none" } }, "Ver politicas"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(2), style: { flex: 1, padding: "13px", borderRadius: 14, border: "1.5px solid var(--line)", background: "none", fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: "var(--ink-2)", cursor: "pointer" } }, "\u2190 Atr\xE1s"), /* @__PURE__ */ React.createElement("a", { href: canSubmit ? buildWhatsApp() : "#", target: "_blank", rel: "noopener noreferrer", onClick: () => { if (canSubmit) submitBooking(); }, style: { flex: 2, padding: "13px", borderRadius: 14, background: canSubmit ? "#25D366" : "var(--line)", color: canSubmit ? "#fff" : "var(--ink-2)", fontFamily: "inherit", fontSize: 14, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, pointerEvents: canSubmit ? "all" : "none", transition: "all .2s" } }, sending ? "Guardando..." : "Confirmar por WhatsApp")), sent && bookingId && /* @__PURE__ */ React.createElement("a", { href: "#", onClick: function(e){ e.preventDefault(); var t = e.currentTarget; t.textContent = "Redirigiendo a pago seguro..."; fetch("https://oqqwmcplljirbreowrll.supabase.co/functions/v1/stripe_checkout", { method: "POST", headers: { "Content-Type": "application/json", "apikey": ANON }, body: JSON.stringify({ type: "grooming", grooming_id: bookingId, success_url: "https://bpuppy.us/grooming", cancel_url: location.href }) }).then(function(r){ return r.json(); }).then(function(c){ if (c.url) { location.href = c.url; } else { t.textContent = "Reintentar pago"; } }).catch(function(){ t.textContent = "Reintentar pago"; }); }, style: { display: "block", textAlign: "center", marginTop: 10, padding: "13px", borderRadius: 14, background: "var(--orange)", color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none" } }, "Pagar ahora $" + total), sent && bookingId && /* @__PURE__ */ React.createElement("a", { href: "#", onClick: function(e){ e.preventDefault(); var t = e.currentTarget; t.textContent = "Redirigiendo a PayPal..."; fetch("https://oqqwmcplljirbreowrll.supabase.co/functions/v1/paypal", { method: "POST", headers: { "Content-Type": "application/json", "apikey": ANON }, body: JSON.stringify({ action: "create", type: "grooming", grooming_id: bookingId }) }).then(function(r){ return r.json(); }).then(function(c){ if (c.url) { location.href = c.url; } else { t.textContent = "Reintentar PayPal"; } }).catch(function(){ t.textContent = "Reintentar PayPal"; }); }, style: { display: "block", textAlign: "center", marginTop: 8, padding: "13px", borderRadius: 14, background: "#0070BA", color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none" } }, "Pagar con PayPal"), sent ? /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "#1EB87A", fontWeight: 700, textAlign: "center", margin: "10px 0 0" } }, "Reserva recibida. Te enviamos confirmaci\xF3n por correo y te recordaremos el d\xEDa de la cita.") : bookErr ? /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11.5, color: "var(--orange)", textAlign: "center", margin: "10px 0 0" } }, bookErr) : /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10.5, color: "var(--ink-soft)", textAlign: "center", margin: "10px 0 0" } }, "Guardamos tu cita y te enviamos confirmaci\xF3n por correo. Reservas con menos de 6h de antelaci\xF3n: escr\xEDbenos directo por WhatsApp.")));
}
function OpeningBanner() {
  const [open, setOpen] = useState(true);
  const [claimed, setClaimed] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  if (!open) return null;
  async function claim(e) {
    e.preventDefault();
    if (!name || !phone) return;
    setLoading(true);
    try {
      const sb = window._groomSb;
      if (sb) await sb.from("website_leads").insert({ gclid: (function() {
        try {
          window.bpLead && window.bpLead();
        } catch (e2) {
        }
        return typeof window !== "undefined" && window.bpGclid ? window.bpGclid() : null;
      })(), full_name: name, phone, message: "OFERTA APERTURA - Ba\xF1o + Corte GRATIS. C\xF3d: APERTURA", source: "grooming_apertura" });
    } catch (err) {
    } finally {
      setLoading(false);
    }
    setClaimed(true);
    window._groomPromo = "APERTURA";
  }
  return /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,#FF5520 0%,#FF8C00 45%,#FFB800 100%)", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.06)", top: -200, right: -100, pointerEvents: "none" } }), /* @__PURE__ */ React.createElement("div", { className: "container", style: { padding: "22px 0", position: "relative", zIndex: 1 } }, claimed ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap", textAlign: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 28 } }, "\u{1F389}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: "#fff" } }, "\xA1C\xF3digo APERTURA aplicado!"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 2 } }, "Muestra esta pantalla al llegar. Tu primer ba\xF1o + corte es GRATIS.")), /* @__PURE__ */ React.createElement("button", { onClick: () => setOpen(false), style: { background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 999, padding: "8px 16px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 13 } }, "Cerrar")) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: "1 1 260px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.2)", borderRadius: 999, padding: "3px 12px", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" } }, "\u{1F389} Oferta de Apertura \xB7 Tiempo Limitado")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(20px,3vw,32px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1 } }, "Primer ba\xF1o + corte ", /* @__PURE__ */ React.createElement("span", { style: { background: "rgba(255,255,255,0.25)", borderRadius: 6, padding: "2px 8px" } }, "GRATIS")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 5 } }, "Nuevo local \xB7 C\xF3digo ", /* @__PURE__ */ React.createElement("strong", null, "APERTURA"), " \xB7 Solo por tiempo limitado")), /* @__PURE__ */ React.createElement("form", { onSubmit: claim, style: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", flex: "1 1 300px" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      value: name,
      onChange: (e) => setName(e.target.value),
      required: true,
      placeholder: "Tu nombre *",
      style: { flex: "1 1 120px", padding: "9px 14px", borderRadius: 999, border: "none", fontFamily: "inherit", fontSize: 13, outline: "none", background: "rgba(255,255,255,0.95)" }
    }
  ), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: phone,
      onChange: (e) => setPhone(e.target.value),
      required: true,
      type: "tel",
      placeholder: "N\xFAmero de tel\xE9fono *",
      style: { flex: "1 1 120px", padding: "9px 14px", borderRadius: 999, border: "none", fontFamily: "inherit", fontSize: 13, outline: "none", background: "rgba(255,255,255,0.95)" }
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "submit",
      disabled: loading,
      style: { padding: "9px 18px", borderRadius: 999, background: "#2D2421", color: "#fff", border: "none", fontFamily: "inherit", fontWeight: 800, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }
    },
    loading ? "Aplicando..." : "\u{1F3AB} Reclamar Oferta"
  )), /* @__PURE__ */ React.createElement("button", { onClick: () => setOpen(false), style: { background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 22, cursor: "pointer", padding: 4, flexShrink: 0, lineHeight: 1 } }, "\xD7"))));
}
function GroomingApp() {
  const [sizeIdx, setSizeIdx] = useState(0);
  const sizeKey = SIZEKEYS[sizeIdx];
  const [tab, setTab] = useState("servicios");
  const [billing, setBilling] = useState("month");
  const groomingArts = useMemo(() => typeof BLOG !== "undefined" ? BLOG.filter((a) => a.cat === "grooming") : [], []);
  useEffect(() => {
    if (!window._groomSb) {
      try {
        const SU = "https://oqqwmcplljirbreowrll.supabase.co";
        const SK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
        window._groomSb = supabase.createClient(SU, SK);
      } catch (e) {
      }
    }
  }, []);
  return /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", minHeight: "100vh" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", minHeight: 580, display: "flex", alignItems: "center", overflow: "hidden", background: "#e9e9e9" } }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: "uploads/Pom Grooming.webp",
      alt: "",
      style: { position: "absolute", bottom: 0, right: 0, width: "57%", height: "auto", display: "block", pointerEvents: "none", zIndex: 0 }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(to right, #e9e9e9 34%, rgba(233,233,233,0.82) 43%, transparent 50%)", pointerEvents: "none", zIndex: 1 } }), [
    { w: 70, l: "8%", delay: 0 },
    { w: 40, l: "18%", delay: 1.2 },
    { w: 90, l: "28%", delay: 2.1 },
    { w: 35, l: "38%", delay: 0.7 },
    { w: 55, l: "45%", delay: 3 },
    { w: 80, l: "22%", delay: 1.8 },
    { w: 45, l: "12%", delay: 2.5 },
    { w: 60, l: "32%", delay: 0.4 },
    { w: 30, l: "42%", delay: 1.5 }
  ].map(function(b, i) {
    return /* @__PURE__ */ React.createElement("div", { key: i, style: {
      position: "absolute",
      borderRadius: "50%",
      background: "transparent",
      border: `2px solid rgba(245,130,32,${0.08 + i % 4 * 0.04})`,
      width: b.w,
      height: b.w,
      left: b.l,
      bottom: -b.w,
      animation: `bubbleUp ${5 + i * 0.6}s ease-in infinite`,
      animationDelay: b.delay + "s",
      pointerEvents: "none"
    } });
  }), /* @__PURE__ */ React.createElement("div", { className: "container", style: { paddingTop: 120, paddingBottom: 60, position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { paddingBottom: 20, maxWidth: "50%", position: "relative", zIndex: 2 } }, "            ", /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,130,32,0.08)", border: "1px solid rgba(245,130,32,0.22)", borderRadius: 999, padding: "7px 16px", marginBottom: 22 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15 } }, "\u{1F4CD}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9.5, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 1 } }, "Pr\xF3ximamente abriendo"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 600, color: "var(--ink)" } }, "5604 Kalogridis Rd, Haines City, FL 33844"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#3A8FC7", marginBottom: 16 } }, "BPuppy Grooming"), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 800, color: "var(--ink)", margin: "0 0 16px", letterSpacing: "-0.035em", lineHeight: 1.05 } }, "Tu mascota merece", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", { style: { fontFamily: "Instrument Serif,Georgia,serif", fontStyle: "italic", fontWeight: 400, color: "var(--orange)" } }, "verse incre\xEDble")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15, color: "var(--ink-2)", margin: "0 0 28px", lineHeight: 1.65, maxWidth: 400 } }, "Ba\xF1o, corte, deslanado y spa con productos premium. Recogida y entrega disponible. Planes de membres\xEDa con descuento anual."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("a", { href: "#booking", style: { padding: "13px 24px", borderRadius: 14, background: "var(--orange)", color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 24px -8px rgba(245,130,32,0.45)" } }, "Agendar cita ahora"), /* @__PURE__ */ React.createElement("a", { href: "#memberships", style: { padding: "13px 24px", borderRadius: 14, background: "var(--bg)", color: "var(--ink)", fontFamily: "inherit", fontSize: 14, fontWeight: 600, textDecoration: "none", border: "1.5px solid var(--line)" } }, "Ver membres\xEDas"))))), /* @__PURE__ */ React.createElement(OpeningBanner, null), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--paper)", borderBottom: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("div", { className: "container", style: { display: "flex", gap: 0, overflowX: "auto", scrollbarWidth: "none" } }, [["\u2702\uFE0F", "Grooming profesional"], ["\u{1F690}", "Pickup & Delivery"], ["\u{1F33F}", "Productos premium"], ["\u23F0", "Lun\u2013S\xE1b 9am\u20136pm"], ["\u{1F4AC}", "Confirmaci\xF3n por WhatsApp"]].map(([ic, label]) => /* @__PURE__ */ React.createElement("div", { key: label, style: { display: "flex", alignItems: "center", gap: 8, padding: "14px 20px", borderRight: "1px solid var(--line)", whiteSpace: "nowrap", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, ic), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, fontWeight: 600, color: "var(--ink-2)" } }, label))))), /* @__PURE__ */ React.createElement("div", { className: "container", style: { padding: "60px 0 0" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, background: "var(--paper)", borderRadius: 14, padding: 5, marginBottom: 40, width: "fit-content" } }, [["servicios", "\u{1F4CB} Servicios"], ["paquetes", "\u{1F4E6} Paquetes"], ["memberships", "\u{1F3C6} Membres\xEDas"]].map(([id, label]) => /* @__PURE__ */ React.createElement("button", { key: id, onClick: () => {
    setTab(id);
    if (id === "memberships") document.getElementById("memberships")?.scrollIntoView();
  }, style: { padding: "9px 18px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: tab === id ? 700 : 500, background: tab === id ? "var(--orange)" : "transparent", color: tab === id ? "#fff" : "var(--ink-2)", transition: "all .15s" } }, label))), tab === "servicios" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 20, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, color: "var(--ink)", margin: 0 } }, "Precios por servicio"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, ["S", "M", "L", "XL"].map((s, i) => /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => setSizeIdx(i), style: { padding: "5px 14px", borderRadius: 999, border: "none", background: sizeIdx === i ? "var(--orange)" : "var(--bg)", color: sizeIdx === i ? "#fff" : "var(--ink-2)", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer" } }, s))), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "var(--ink-soft)" } }, ["Peque\xF1o (< 15 lbs)", "Mediano (15-40 lbs)", "Grande (40-70 lbs)", "XL (70+ lbs)"][sizeIdx])), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 12, marginBottom: 40 } }, SERVICES.map((sv) => /* @__PURE__ */ React.createElement("div", { key: sv.name, style: { background: sv.highlight ? "linear-gradient(135deg,rgba(245,130,32,0.10),rgba(232,93,117,0.10))" : "var(--paper)", borderRadius: 16, padding: "18px 14px", border: sv.highlight ? "1.5px solid rgba(245,130,32,0.3)" : "1px solid var(--line)", textAlign: "center", position: "relative" } }, sv.highlight && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: "var(--orange)", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 999, whiteSpace: "nowrap" } }, "COMPLETO"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 28, marginBottom: 8 } }, sv.emoji), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: "var(--ink)", lineHeight: 1.25, marginBottom: 6 } }, sv.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, color: sv.highlight ? "var(--orange)" : "var(--ink)" } }, "$", sv.prices[sizeKey]), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.4 } }, sv.desc))))), tab === "paquetes" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 24, fontWeight: 800, color: "var(--ink)", margin: "0 0 8px" } }, "Paquetes combinados"), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)", marginBottom: 24 } }, "Selecciona el tama\xF1o de tu mascota:"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 28 } }, ["S", "M", "L", "XL"].map((s, i) => /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => setSizeIdx(i), style: { padding: "6px 16px", borderRadius: 999, border: "none", background: sizeIdx === i ? "var(--orange)" : "var(--bg)", color: sizeIdx === i ? "#fff" : "var(--ink-2)", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer" } }, s))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginBottom: 40 } }, PACKAGES.map((pkg) => /* @__PURE__ */ React.createElement("div", { key: pkg.name, style: { background: "var(--paper)", borderRadius: 20, padding: "24px", border: pkg.popular ? `2px solid ${pkg.color}` : "1px solid var(--line)", position: "relative", overflow: "hidden" } }, pkg.popular && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 16, right: 16, background: pkg.color, color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 999 } }, "M\xC1S POPULAR"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 10 } }, pkg.emoji), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18, fontWeight: 800, color: "var(--ink)", marginBottom: 4 } }, pkg.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 30, fontWeight: 800, color: pkg.color, marginBottom: 4 } }, "$", pkg.prices[sizeKey]), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--ink-soft)", marginBottom: 16 } }, pkg.note), /* @__PURE__ */ React.createElement("ul", { style: { padding: 0, margin: "0 0 20px", listStyle: "none", display: "flex", flexDirection: "column", gap: 6 } }, pkg.includes.map((item) => /* @__PURE__ */ React.createElement("li", { key: item, style: { display: "flex", gap: 8, fontSize: 13, color: "var(--ink-2)" } }, /* @__PURE__ */ React.createElement("span", { style: { color: pkg.color, fontWeight: 700, flexShrink: 0 } }, "\u2713"), item))), /* @__PURE__ */ React.createElement("a", { href: "#booking", style: { display: "block", textAlign: "center", padding: "11px", borderRadius: 12, background: pkg.color, color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, textDecoration: "none" } }, "Agendar este paquete")))))), /* @__PURE__ */ React.createElement("div", { id: "booking", style: { background: "var(--bg)", padding: "70px 0" } }, /* @__PURE__ */ React.createElement("div", { className: "container", style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow", style: { marginBottom: 10 } }, "Reserva tu cita"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 800, color: "var(--ink)", margin: "0 0 14px", letterSpacing: "-0.03em" } }, "Agenda r\xE1pido,", /* @__PURE__ */ React.createElement("br", null), "confirmamos por WhatsApp"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65, margin: "0 0 24px" } }, "Selecciona servicio, fecha y hora. Te confirmamos disponibilidad en menos de 2 horas. Tambi\xE9n ofrecemos ", /* @__PURE__ */ React.createElement("strong", null, "recogida y entrega"), " \u2014 pregunta al reservar."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, [["\u{1F4CD}", "Pr\xF3ximamente \xB7 Haines City, FL", "5604 Kalogridis Rd, Haines City, FL 33844"], ["\u{1F690}", "Pickup & Delivery", "Recogemos y entregamos en tu casa (+$20)"], ["\u23F0", "Horario", "Lun \u2013 S\xE1b: 9:00 AM \u2013 6:00 PM"]].map(([ic, title, sub]) => /* @__PURE__ */ React.createElement("div", { key: title, style: { display: "flex", gap: 12, padding: "14px 16px", background: "var(--paper)", borderRadius: 12, border: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 22, flexShrink: 0 } }, ic), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: "var(--ink)" } }, title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--ink-2)", marginTop: 2 } }, sub))))), /* @__PURE__ */ React.createElement("div", { id: "policies", style: { marginTop: 24, padding: "16px 18px", background: "rgba(245,130,32,0.06)", borderRadius: 12, border: "1px solid rgba(245,130,32,0.2)", scrollMarginTop: "90px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 8 } }, "Politicas de reserva"), /* @__PURE__ */ React.createElement("ul", { style: { padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 } }, ["Citas para el mismo d\xEDa: solo con al menos 6 horas de antelaci\xF3n y sujetas a disponibilidad.", "Te confirmamos por WhatsApp o SMS en menos de 2 horas.", "Cancelaciones: avisa con al menos 24 horas. Las inasistencias (no-show) pueden tener cargo.", "Recogida tard\xEDa: pasa a recoger a tu mascota dentro de 1 hora despu\xE9s del grooming."].map((line) => /* @__PURE__ */ React.createElement("li", { key: line, style: { display: "flex", gap: 8, fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--orange)", fontWeight: 700, flexShrink: 0 } }, "\u2713"), line))))), /* @__PURE__ */ React.createElement(BookingCalendar, null))), /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", padding: "60px 0 0", borderTop: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow", style: { marginBottom: 6 } }, "Nuestra pr\xF3xima ubicaci\xF3n"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "var(--ink)", margin: 0, letterSpacing: "-0.025em" } }, "BPuppy Grooming \xB7 Haines City, FL")), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://maps.google.com/?q=5604+Kalogridis+Rd,+Haines+City,+FL+33844",
      target: "_blank",
      rel: "noreferrer",
      style: { marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 999, background: "var(--orange)", color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 6px 20px -6px rgba(245,130,32,0.45)" }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "10", r: "3" })),
    "Abrir en Maps"
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20, padding: "12px 18px", background: "rgba(245,130,32,0.06)", border: "1px solid rgba(245,130,32,0.2)", borderRadius: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18 } }, "\u{1F4CD}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--ink)" } }, "5604 Kalogridis Rd, Haines City, FL 33844"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--orange)", fontWeight: 600 } }, "Pr\xF3ximamente abriendo \xB7 \xA1S\xEDguenos para el anuncio oficial!"))), /* @__PURE__ */ React.createElement("div", { style: { borderRadius: 18, overflow: "hidden", border: "1px solid var(--line)", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" } }, /* @__PURE__ */ React.createElement(
    "iframe",
    {
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d622.1281722026707!2d-81.56348267074404!3d28.107241293543456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88dd744a45039381%3A0x7e8fc576a126e748!2s5604%20Kalogridis%20Rd%2C%20Haines%20City%2C%20FL%2033844!5e0!3m2!1ses!2sus!4v1779474402737!5m2!1ses!2sus",
      width: "100%",
      height: "380",
      style: { border: 0, display: "block" },
      allowFullScreen: true,
      loading: "lazy",
      referrerPolicy: "no-referrer-when-downgrade",
      title: "BPuppy Grooming \u2014 Haines City FL"
    }
  )))), "      ", /* @__PURE__ */ React.createElement("div", { id: "memberships", style: { background: "var(--ink)", padding: "70px 0" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 40 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "inline-block", padding: "4px 14px", borderRadius: 999, background: "rgba(245,130,32,0.18)", color: "var(--orange)", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 } }, "Membres\xEDas"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.03em" } }, "Ahorra pagando anual"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 24 } }, "Compromiso mensual o pago anual con descuento garantizado"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: 4, width: "fit-content", margin: "0 auto" } }, [["month", "Mensual"], ["year", "Anual (ahorra 20%)"]].map(([id, label]) => /* @__PURE__ */ React.createElement("button", { key: id, onClick: () => setBilling(id), style: { padding: "8px 18px", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700, background: billing === id ? "#fff" : "transparent", color: billing === id ? "var(--ink)" : "rgba(255,255,255,0.6)", transition: "all .15s" } }, label)))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginBottom: 40 } }, MEMBERSHIPS.map((m) => /* @__PURE__ */ React.createElement("div", { key: m.name, style: { background: m.popular ? m.color : "rgba(255,255,255,0.07)", borderRadius: 20, padding: "28px 24px", border: m.popular ? "none" : "1px solid rgba(255,255,255,0.12)", position: "relative" } }, m.popular && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "#FFD700", color: "#2D2421", fontSize: 10, fontWeight: 900, padding: "4px 14px", borderRadius: 999, whiteSpace: "nowrap" } }, "\u2B50 M\xC1S POPULAR"), m.promo && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -10, right: 16, background: "#FF3B30", color: "#fff", fontSize: 9, fontWeight: 900, padding: "3px 10px", borderRadius: 999, whiteSpace: "nowrap", letterSpacing: "0.06em" } }, "APERTURA"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 32, marginBottom: 10 } }, m.emoji), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 } }, m.name), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 } }, m.promo && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, color: "rgba(255,255,255,0.4)", textDecoration: "line-through" } }, "$", billing === "month" ? m.price_month : Math.round(m.price_year / 12)), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 36, fontWeight: 800, color: "#fff" } }, "$", billing === "month" ? m.price_month_promo || m.price_month : Math.round((m.price_year_promo || m.price_year) / 12)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "rgba(255,255,255,0.6)" } }, "/mes")), billing === "year" && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 } }, "$", m.price_year_promo || m.price_year, "/a\xF1o \xB7 ahorras $", m.savings_promo || m.savings), m.promo && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#FFD700", fontWeight: 700, marginBottom: 8 } }, "\u{1F389} Precio de apertura \xB7 Solo por tiempo limitado"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12.5, color: "rgba(255,255,255,0.65)", margin: "0 0 18px", lineHeight: 1.55 } }, m.cta), /* @__PURE__ */ React.createElement("ul", { style: { padding: 0, margin: "0 0 22px", listStyle: "none", display: "flex", flexDirection: "column", gap: 8 } }, m.includes.map((item) => /* @__PURE__ */ React.createElement("li", { key: item, style: { display: "flex", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.8)" } }, /* @__PURE__ */ React.createElement("span", { style: { color: m.popular ? "#fff" : m.color, fontWeight: 700, flexShrink: 0 } }, "\u2713"), item))), /* @__PURE__ */ React.createElement("a", { href: "#", onClick: function(e){ e.preventDefault(); var tk = (/esencial/i.test(m.name) ? "esencial" : /vip/i.test(m.name) ? "vip" : "total") + "_" + billing; var el = e.currentTarget; el.textContent = "Redirigiendo a pago seguro..."; var ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4"; fetch("https://oqqwmcplljirbreowrll.supabase.co/functions/v1/stripe_membership", { method: "POST", headers: { "Content-Type": "application/json", "apikey": ANON_KEY, "Authorization": "Bearer " + ANON_KEY }, body: JSON.stringify({ action: "checkout", plan_key: tk, success_url: "https://bpuppy.us/grooming", cancel_url: location.href }) }).then(function(r){ return r.json(); }).then(function(c){ if (c.url) { location.href = c.url; } else { console.error("stripe_membership error:", c); el.textContent = (c && c.error) ? c.error : "Reintentar"; } }).catch(function(err){ console.error(err); el.textContent = "Reintentar"; }); }, style: { display: "block", textAlign: "center", padding: "12px", borderRadius: 12, background: m.popular ? "rgba(255,255,255,0.2)" : m.color, color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, textDecoration: "none", cursor: "pointer" } }, "Suscribirse ahora")))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 16 } }, "M\xE9todos de pago aceptados"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" } }, PAYMENT_METHODS.map((pm) => /* @__PURE__ */ React.createElement("span", { key: pm.name, style: { padding: "6px 14px", borderRadius: 999, background: "rgba(255,255,255,0.08)", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)" } }, pm.emoji, " ", pm.name)))))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--paper)", padding: "60px 0" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 24, fontWeight: 800, color: "var(--ink)", margin: "0 0 24px" } }, "Nuestro trabajo"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12 } }, Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ React.createElement("image-slot", { key: i, id: `grooming-work-${i}`, shape: "rounded", radius: "14", placeholder: ["Antes / Despu\xE9s", "Corte creativo", "Spa VIP", "Golden groomed", "Schnauzer cortado", "Poodle teddy bear", "Shih Tzu spa", "Cachorro primer ba\xF1o"][i], style: { aspectRatio: "1", display: "block" } }))))), groomingArts.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", padding: "60px 0 80px" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, color: "var(--ink)", margin: 0 } }, "Art\xEDculos de grooming"), /* @__PURE__ */ React.createElement("a", { href: "/blog", style: { fontSize: 13, fontWeight: 700, color: "var(--orange)", textDecoration: "none" } }, "Ver todos \u2192")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20 } }, groomingArts.slice(0, 4).map((art) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: art.id,
      href: `/blog?art=${art.id}`,
      style: { textDecoration: "none", display: "flex", gap: 14, padding: "16px", background: "var(--paper)", borderRadius: 16, border: "1px solid var(--line)", transition: "box-shadow .2s, transform .2s" },
      onMouseEnter: (e) => {
        e.currentTarget.style.boxShadow = "0 8px 24px -8px rgba(45,36,33,0.16)";
        e.currentTarget.style.transform = "translateY(-2px)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "none";
      }
    },
    /* @__PURE__ */ React.createElement("span", { style: { fontSize: 36, flexShrink: 0 } }, art.emoji),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 800, color: "#9C27B0", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 } }, "Grooming"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3, marginBottom: 4 } }, art.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--ink-soft)" } }, "\u23F1 ", art.read, " min \xB7 Leer art\xEDculo \u2192"))
  ))))));
}
Object.assign(window, { GroomingApp, BookingCalendar });

})();
