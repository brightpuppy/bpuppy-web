(function(){
const { useState, useEffect, useMemo } = React;
const ICON_PATHS = {
  bath: '<path d="M4 13h16v2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M6 13V6.5A2.5 2.5 0 0 1 8.5 4 2.5 2.5 0 0 1 11 6.5"/><path d="M9.5 6.5h.01"/><path d="M6.5 19l-1 2M17.5 19l1 2"/>',
  scissors: '<circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><path d="M20 4 8.5 15.5M8.5 8.5 20 20M7.6 7.6 12 12"/>',
  comb: '<path d="M4 4h16v5H4z"/><path d="M6 9v9M9.5 9v6M13 9v9M16.5 9v6M19.5 9v9"/>',
  nails: '<path d="M9 21h6"/><path d="M10 21V9a2 2 0 0 1 4 0v12"/><path d="M10 9c0-3 .8-5 2-5s2 2 2 5"/>',
  ear: '<path d="M7 9a5 5 0 0 1 10 0c0 3-2.5 3.2-2.5 6A3.5 3.5 0 0 1 8 16"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0"/>',
  deshed: '<path d="M5 5l6 6"/><path d="M4 8h4M8 4v4"/><path d="M11 11l8 8M19 14l1 5-5-1"/>',
  spa: '<path d="M12 3l2.5 5.2 5.5.8-4 3.9.9 5.6L12 21l-5.4 2.5L7.5 18l-4-3.9 5.5-.8z"/>',
  star: '<path d="M12 3l2.5 5.2 5.5.8-4 3.9.9 5.6L12 21l-5.4 2.5L7.5 18l-4-3.9 5.5-.8z"/>',
  paw: '<circle cx="7" cy="9" r="1.6"/><circle cx="12" cy="7.4" r="1.6"/><circle cx="17" cy="9" r="1.6"/><path d="M12 12c-2.4 0-4.3 1.9-4.3 3.9 0 1.5 1.2 2.4 2.6 2.4.8 0 1.1-.4 1.7-.4s.9.4 1.7.4c1.4 0 2.6-.9 2.6-2.4 0-2-1.9-3.9-4.3-3.9z"/>',
  gem: '<path d="M6 4h12l3 5-9 11L3 9z"/><path d="M3 9h18M9 4 6 9l6 11M15 4l3 5-6 11"/>',
  leaf: '<path d="M5 19c0-8 6-13 14-13 0 8-6 14-14 13z"/><path d="M5 19c3-4.5 6.5-6.5 10-7.5"/>',
  van: '<path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.7"/><circle cx="17" cy="18" r="1.7"/>',
  pin: '<path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  chat: '<path d="M4 5h16v11H8l-4 3.5z"/>',
  user: '<circle cx="12" cy="8" r="3.2"/><path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/>',
  phone: '<path d="M6 3h3l1.5 5-2 1.4a12 12 0 0 0 6 6l1.4-2 5 1.5v3a2 2 0 0 1-2 2A17 17 0 0 1 4 5a2 2 0 0 1 2-2z"/>',
  calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9.5h16M8.5 3v4M15.5 3v4"/>',
  ruler: '<path d="M3.5 9 9 3.5 20.5 15 15 20.5z"/><path d="M8 8l1.6 1.6M11 5.5l2 2M5.5 11.5l2 2"/>',
  card: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/>',
  cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6.5 12h.01M17.5 12h.01"/>',
  ticket: '<path d="M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z"/><path d="M13 7v10"/>',
  note: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 6l4 4"/>',
  money: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M9.6 14.2c0 1 1 1.6 2.4 1.6s2.4-.6 2.4-1.6-1-1.3-2.4-1.6-2.4-.6-2.4-1.6 1-1.6 2.4-1.6 2.4.6 2.4 1.6"/>',
  trophy: '<path d="M7 4h10v3a5 5 0 0 1-10 0z"/><path d="M7 5H4v1.5a3 3 0 0 0 3 3M17 5h3v1.5a3 3 0 0 1-3 3M9.5 14h5M11 14v3.5M13 14v3.5M8 20h8"/>',
  bulb: '<path d="M9.5 18h5M10.5 21h3M12 3a6 6 0 0 0-3.8 10.6c.6.6.9 1.1.9 2.4h5.8c0-1.3.3-1.8.9-2.4A6 6 0 0 0 12 3z"/>',
  dog: '<path d="M10 5 7 4 6 7l1.5 1.5M14 5l3-1 1 3-1.5 1.5"/><path d="M7 8c-1 1.5-1.5 3.5-1.5 5.5 0 3 2.5 4.5 6.5 4.5s6.5-1.5 6.5-4.5c0-2-.5-4-1.5-5.5"/><path d="M10 13h.01M14 13h.01M11 16h2"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 6.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/>'
};
function Icon({ name, size = 22, color = "currentColor", stroke = 1.7, style }) {
  const p = ICON_PATHS[name];
  if (!p) return null;
  return /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round", style, dangerouslySetInnerHTML: { __html: p } });
}
const SIZES = ["Peque\xF1o\n(< 15 lbs)", "Mediano\n(15\u201340 lbs)", "Grande\n(40\u201370 lbs)", "XL\n(70+ lbs)"];
const SIZEKEYS = ["s", "m", "l", "xl"];
const SERVICES = [
  { name: "Ba\xF1o completo", desc: "Shampoo, acondicionador, secado y cepillado", icon: "bath", prices: { s: 40, m: 55, l: 70, xl: 90 } },
  { name: "Ba\xF1o + Corte", desc: "Ba\xF1o completo m\xE1s corte a tu elecci\xF3n", icon: "scissors", prices: { s: 65, m: 85, l: 105, xl: 135 } },
  { name: "Corte solo", desc: "Corte sin ba\xF1o (requiere pelaje limpio)", icon: "comb", prices: { s: 35, m: 45, l: 55, xl: 70 } },
  { name: "U\xF1as", desc: "Corte y lima de u\xF1as", icon: "nails", prices: { s: 15, m: 15, l: 15, xl: 15 } },
  { name: "Limpieza de o\xEDdos", desc: "Limpieza profunda con soluci\xF3n \xF3tica", icon: "ear", prices: { s: 15, m: 15, l: 15, xl: 15 } },
  { name: "Deslanado / Desenredo", desc: "Eliminaci\xF3n de pelo muerto o nudos", icon: "deshed", prices: { s: 30, m: 45, l: 60, xl: 75 } },
  { name: "Spa VIP", desc: "Ba\xF1o, corte, deslanado, u\xF1as, o\xEDdos, colonia y bandana", icon: "spa", prices: { s: 95, m: 120, l: 150, xl: 185 }, highlight: true }
];
const PACKAGES = [
  {
    name: "Paquete B\xE1sico",
    icon: "paw",
    color: "#1EB87A",
    bg: "#E0F7EF",
    includes: ["Ba\xF1o completo", "U\xF1as", "Limpieza de o\xEDdos"],
    prices: { s: 60, m: 75, l: 95, xl: 120 },
    note: "Ideal para mantenimiento mensual r\xE1pido"
  },
  {
    name: "Paquete Est\xE1ndar",
    icon: "star",
    color: "#F58220",
    bg: "#FFF0E0",
    includes: ["Ba\xF1o completo", "Corte a elecci\xF3n", "U\xF1as", "Limpieza de o\xEDdos"],
    prices: { s: 75, m: 95, l: 120, xl: 150 },
    note: "El m\xE1s popular. Todo lo esencial en una visita",
    popular: true
  },
  {
    name: "Spa VIP",
    icon: "gem",
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
    icon: "leaf",
    color: "#1EB87A",
    price_month: 59,
    price_year: 570,
    savings: 138,
    includes: ["1 ba\xF1o completo al mes", "U\xF1as incluidas", "10% dto en servicios adicionales", "Recordatorios autom\xE1ticos"],
    cta: "El plan perfecto para mantenimiento b\xE1sico constante"
  },
  {
    name: "Plan Total",
    icon: "star",
    color: "#F58220",
    price_month: 99,
    price_year: 990,
    price_month_promo: 79,
    price_year_promo: 790,
    savings: 198,
    savings_promo: 158,
    promo: true,
    includes: ["1 ba\xF1o + corte al mes", "U\xF1as y o\xEDdos incluidos", "Pickup & Delivery incluido (10 mi)", "15% dto en servicios adicionales", "Prioridad en agenda", "Foto profesional mensual"],
    cta: "El m\xE1s popular. Todo incluido + recogida y entrega.",
    popular: true
  },
  {
    name: "Plan VIP",
    icon: "gem",
    color: "#7C3AED",
    price_month: 149,
    price_year: 1499,
    savings: 289,
    includes: ["Spa VIP mensual completo", "Pickup & Delivery incluido (radio ilimitado)", "20% dto en todos los servicios", "Agenda reservada siempre disponible", "Reporte mensual de salud del pelaje", "Regalo de cumplea\xF1os para tu mascota"],
    cta: "La experiencia premium completa con pickup y delivery incluido"
  }
];
const PAYMENT_METHODS = [
  { name: "Zelle", icon: null, color: "#6D1ED4" },
  { name: "Venmo", icon: null, color: "#3D95CE" },
  { name: "CashApp", icon: null, color: "#00D632" },
  { name: "Tarjeta de cr\xE9dito", icon: "card", color: "#2D2421" },
  { name: "Efectivo", icon: "cash", color: "#2D6A4F" }
];
function BookingCalendar({ me, activeMembership, activePlan, firstName, onLogin }) {
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
  const [step, setStep] = useState(1);
  const [bookStatus, setBookStatus] = useState("idle");
  const [bookErr, setBookErr] = useState("");
  const pets = me && me.pets || [];
  const planQualifies = !!(activePlan && /total|vip/i.test(activeMembership && activeMembership.plan || activePlan.name || ""));
  const sizeFromWeight = (lb) => {
    const w = +lb || 0;
    if (!w) return "";
    if (w < 15) return "Peque\xF1o";
    if (w < 40) return "Mediano";
    if (w < 70) return "Grande";
    return "XL";
  };
  const PLAN_RULES = {
    "Plan Esencial": { primary: "Ba\xF1o completo", included: ["Ba\xF1o completo", "U\xF1as"], discount: 0.1 },
    "Plan Total": { primary: "Ba\xF1o + Corte", included: ["Ba\xF1o + Corte", "U\xF1as", "Limpieza de o\xEDdos"], discount: 0.15 },
    "Plan VIP": { primary: "Spa VIP", included: ["Spa VIP", "Ba\xF1o completo", "Ba\xF1o + Corte", "Corte solo", "U\xF1as", "Limpieza de o\xEDdos", "Deslanado / Desenredo"], discount: 0.2 }
  };
  const planRule = activePlan ? PLAN_RULES[activePlan.name] : null;
  const includedSet = new Set(planRule ? planRule.included : []);
  const isIncluded = (name) => includedSet.has(name);
  const memberDiscount = planRule ? planRule.discount : 0;
  const priceFor = (sv, sk) => {
    const base = sk ? sv.prices[sk] : sv.prices["s"];
    if (isIncluded(sv.name)) return 0;
    return planRule ? Math.round(base * (1 - memberDiscount)) : base;
  };
  useEffect(() => {
    if (!me || !me.client) return;
    const c = me.client;
    const full = [c.first_name, c.last_name].filter(Boolean).join(" ").trim();
    if (full) setOwnerName((prev) => prev || full);
    const ph = c.phone || c.phone_number || c.mobile || "";
    if (ph) setPhone((prev) => prev || ph);
    if (planQualifies) setIsMember(true);
    if (planRule && planRule.primary) setSelectedServices((prev) => prev.size ? prev : /* @__PURE__ */ new Set([planRule.primary]));
    if (pets.length && !petName) {
      const p = pets[0];
      setPetName(p.name || "");
      const s = sizeFromWeight(p.weight_lbs);
      if (s) setSize((prev) => prev || s);
    }
  }, [me]);
  const pickPet = (p) => {
    setPetName(p.name || "");
    const s = sizeFromWeight(p.weight_lbs);
    if (s) setSize(s);
  };
  const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const DAYS_OF_WEEK = ["Dom", "Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b"];
  const TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
  const LEAD_MS = 6 * 60 * 60 * 1e3;
  const cutoff = new Date(today.getTime() + LEAD_MS);
  const slotDate = (d, label) => {
    const m = /(\d+):(\d+)\s*(AM|PM)/i.exec(label);
    if (!m) return null;
    let h = parseInt(m[1], 10) % 12;
    if (/pm/i.test(m[3])) h += 12;
    return new Date(year, month, d, h, parseInt(m[2], 10), 0, 0);
  };
  const availableTimes = (d) => TIMES.filter((t) => {
    const s = slotDate(d, t);
    return s && s >= cutoff;
  });
  const sizeKey = { "Peque\xF1o": "s", "Mediano": "m", "Grande": "l", "XL": "xl" }[size] || "s";
  const SPA_VIP = "Spa VIP";
  const toggleService = (name) => {
    setSelectedServices((prev) => {
      const n = new Set(prev);
      if (name === SPA_VIP) {
        if (n.has(SPA_VIP)) n.delete(SPA_VIP);
        else {
          n.clear();
          n.add(SPA_VIP);
        }
        return n;
      }
      n.delete(SPA_VIP);
      n.has(name) ? n.delete(name) : n.add(name);
      return n;
    });
  };
  const total = useMemo(() => {
    const base = [...selectedServices].reduce((sum, name) => {
      const sv = SERVICES.find((s) => s.name === name);
      return sum + (sv ? priceFor(sv, sizeKey) : 0);
    }, 0);
    const pickupCost = pickup && !isMember ? 20 : 0;
    return base + pickupCost;
  }, [selectedServices, sizeKey, pickup, isMember, planRule]);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const isAvailable = (d) => {
    const date = new Date(year, month, d);
    if (date.getDay() === 0) return false;
    return availableTimes(d).length > 0;
  };
  const canStep2 = selectedServices.size > 0 && size;
  const canConfirm = day && time && petName && ownerName && phone;
  const buildWhatsApp = () => {
    const dateStr = `${day} de ${MONTHS[month]}, ${year}`;
    const svList = [...selectedServices].map((n) => isIncluded(n) ? `${n} (incluido en plan)` : n).join(", ");
    const planLine = activeMembership ? `
\u{1F3C5} Membres\xEDa: ${activeMembership.plan}` : "";
    const msg = encodeURIComponent(`Hola! Quiero agendar grooming:
${planLine}
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
  const submitBooking = async () => {
    if (!canConfirm || bookStatus === "sending") return;
    setBookStatus("sending");
    setBookErr("");
    const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
    const payload = {
      petName,
      ownerName,
      phone,
      size,
      services: [...selectedServices].join(", "),
      dateStr: `${day} de ${MONTHS[month]}, ${year}`,
      time,
      notes,
      promoCode,
      total,
      plan: activeMembership ? activeMembership.plan : "",
      pickup,
      isMember,
      email: me && me.email || ""
    };
    try {
      const r = await fetch("https://oqqwmcplljirbreowrll.supabase.co/functions/v1/grooming_book", {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": ANON_KEY, "Authorization": "Bearer " + ANON_KEY },
        body: JSON.stringify(payload)
      });
      const d = await r.json();
      if (d && d.ok) setBookStatus("sent");
      else {
        setBookErr(d && d.error || "No se pudo enviar la solicitud");
        setBookStatus("error");
      }
    } catch (e) {
      setBookErr("Error de red, intenta de nuevo");
      setBookStatus("error");
    }
  };
  const resetBooking = () => {
    setBookStatus("idle");
    setStep(1);
    setSelectedServices(/* @__PURE__ */ new Set());
    setDay(null);
    setTime(null);
    setNotes("");
    setPromoCode("");
  };
  const StepDots = () => /* @__PURE__ */ React.createElement("div", { style: { display: "flex", marginBottom: 24, gap: 0 } }, [["1", "Servicios"], ["2", "Fecha"], ["3", "Confirmar"]].map(([n, label], i) => {
    const active = step === i + 1, done = step > i + 1;
    return /* @__PURE__ */ React.createElement("div", { key: n, style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: done ? "pointer" : "default" }, onClick: () => done && setStep(i + 1) }, /* @__PURE__ */ React.createElement("div", { style: { width: 30, height: 30, borderRadius: "50%", background: active ? "var(--orange)" : done ? "#1EB87A" : "var(--bg)", color: active || done ? "#fff" : "var(--ink-2)", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 800, transition: "all .2s" } }, done ? "\u2713" : n), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: active ? 700 : 500, color: active ? "var(--orange)" : "var(--ink-2)" } }, label));
  }));
  return /* @__PURE__ */ React.createElement("div", { style: { background: "var(--paper)", borderRadius: 24, padding: "24px", boxShadow: "0 4px 32px -8px rgba(45,36,33,0.12)" } }, me ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, background: "rgba(245,130,32,0.07)", border: "1px solid rgba(245,130,32,0.22)", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 30, height: 30, borderRadius: "50%", background: "var(--orange)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 } }, (firstName || "?")[0]), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--ink)" } }, "Reservando como ", firstName || "cliente"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--ink-2)", display: "flex", alignItems: "center", gap: 5 } }, activePlan ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Icon, { name: activePlan.icon, size: 13, stroke: 2 }), /* @__PURE__ */ React.createElement("span", null, activeMembership.plan)) : /* @__PURE__ */ React.createElement("span", null, "Sin plan activo"), pets.length ? /* @__PURE__ */ React.createElement("span", null, ` \xB7 ${pets.length} ${pets.length === 1 ? "mascota" : "mascotas"}`) : null)), planQualifies && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, fontWeight: 800, color: "#1EB87A", background: "rgba(30,184,122,0.1)", borderRadius: 999, padding: "4px 10px", whiteSpace: "nowrap" } }, "\u2713 Pickup gratis")) : /* @__PURE__ */ React.createElement("button", { onClick: () => onLogin && onLogin(), style: { display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 12, background: "var(--bg)", border: "1px dashed var(--line)", cursor: "pointer", fontFamily: "inherit", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, color: "var(--orange)", display: "inline-flex" } }, /* @__PURE__ */ React.createElement(Icon, { name: "user", size: 20 })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--ink)" } }, "\xBFYa eres cliente? Entra r\xE1pido"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--ink-2)" } }, "Autocompletamos tus datos y ver\xE1s los beneficios de tu plan")), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 800, color: "var(--orange)", whiteSpace: "nowrap" } }, "Entrar \u2192")), /* @__PURE__ */ React.createElement(StepDots, null), step === 1 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 8 } }, "Tama\xF1o de tu mascota"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 } }, [["Peque\xF1o", "<15lb"], ["Mediano", "15-40"], ["Grande", "40-70"], ["XL", "70+"]].map(([s, sub]) => /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => setSize(s), style: { padding: "8px 4px", borderRadius: 10, border: `2px solid ${size === s ? "var(--orange)" : "var(--line)"}`, background: size === s ? "rgba(245,130,32,0.07)" : "var(--bg)", cursor: "pointer", fontFamily: "inherit", transition: "all .15s", textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--ink)" } }, s), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--ink-soft)" } }, sub))))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: planRule ? 4 : 8 } }, firstName ? `Elige tus servicios, ${firstName}` : "Selecciona uno o m\xE1s servicios"), planRule && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, color: "var(--ink-2)", lineHeight: 1.5, marginBottom: 10, background: "rgba(30,184,122,0.08)", border: "1px solid rgba(30,184,122,0.25)", borderRadius: 10, padding: "8px 11px" } }, "Tu ", /* @__PURE__ */ React.createElement("strong", null, activeMembership.plan), " ya incluye ", /* @__PURE__ */ React.createElement("strong", null, planRule.included.join(", ")), ".", memberDiscount ? ` Los servicios extra llevan \u2212${Math.round(memberDiscount * 100)}% autom\xE1tico.` : ""), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 14 } }, SERVICES.map((sv) => {
    const sel = selectedServices.has(sv.name);
    const included = isIncluded(sv.name);
    const baseP = size ? sv.prices[sizeKey] : sv.prices["s"];
    const memP = priceFor(sv, size ? sizeKey : "s");
    const discounted = planRule && !included && memP < baseP;
    const isFrom = !size;
    return /* @__PURE__ */ React.createElement("button", { key: sv.name, onClick: () => toggleService(sv.name), style: { padding: "12px 10px", borderRadius: 14, border: `2px solid ${sel ? "var(--orange)" : included ? "rgba(30,184,122,0.5)" : "var(--line)"}`, background: sel ? "rgba(245,130,32,0.07)" : included ? "rgba(30,184,122,0.05)" : "var(--bg)", cursor: "pointer", fontFamily: "inherit", transition: "all .15s", textAlign: "left", position: "relative" } }, sel && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 8, right: 8, width: 18, height: 18, borderRadius: "50%", background: "var(--orange)", color: "#fff", fontSize: 10, fontWeight: 800, display: "grid", placeItems: "center" } }, "\u2713"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 5, color: sel ? "var(--orange)" : included ? "#1EB87A" : "var(--ink)" } }, /* @__PURE__ */ React.createElement(Icon, { name: sv.icon, size: 22 })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: "var(--ink)", lineHeight: 1.2, marginBottom: 3 } }, sv.name), included ? /* @__PURE__ */ React.createElement("div", { style: { display: "inline-block", fontSize: 9, fontWeight: 800, color: "#1EB87A", background: "rgba(30,184,122,0.14)", borderRadius: 999, padding: "1px 7px", marginBottom: 3, letterSpacing: "0.03em" } }, "INCLUIDO EN TU PLAN") : sv.highlight && /* @__PURE__ */ React.createElement("div", { style: { display: "inline-block", fontSize: 9, fontWeight: 800, color: "var(--orange)", background: "rgba(245,130,32,0.12)", borderRadius: 999, padding: "1px 7px", marginBottom: 3, letterSpacing: "0.03em" } }, "TODO INCLUIDO"), included ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: "#1EB87A" } }, "Incluido") : discounted ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: sel ? "var(--orange)" : "var(--ink-2)" } }, /* @__PURE__ */ React.createElement("span", { style: { textDecoration: "line-through", color: "var(--ink-soft)", fontWeight: 600, marginRight: 5 } }, "$", baseP), isFrom ? "desde " : "", "$", memP) : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 800, color: sel ? "var(--orange)" : "var(--ink-2)" } }, isFrom ? "desde " : "", "$", memP));
  })), /* @__PURE__ */ React.createElement("div", { style: { borderRadius: 14, border: `2px solid ${pickup ? "var(--orange)" : "var(--line)"}`, background: pickup ? "rgba(245,130,32,0.06)" : "var(--bg)", marginBottom: 14, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setPickup((p) => !p), style: { width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--orange)", display: "inline-flex" } }, /* @__PURE__ */ React.createElement(Icon, { name: "van", size: 20 })), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "left" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--ink)" } }, "Pickup & Delivery"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--ink-2)" } }, "Recogemos y entregamos en tu casa"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, !isMember && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, fontWeight: 700, color: pickup ? "var(--orange)" : "var(--ink-2)" } }, "+$20"), isMember && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: "#1EB87A" } }, "\u2713 Gratis"), /* @__PURE__ */ React.createElement("div", { style: { width: 36, height: 20, borderRadius: 10, background: pickup ? "var(--orange)" : "var(--line)", position: "relative", transition: "background .2s", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 2, left: pickup ? 16 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)", display: "block" } })))), pickup && /* @__PURE__ */ React.createElement("div", { style: { padding: "0 14px 12px", borderTop: "1px solid var(--line)" } }, isMember ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#1EB87A", fontWeight: 600 } }, "\u2713 Pickup & Delivery gratis con tu membres\xEDa (radio 10 millas)") : /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--ink-2)", lineHeight: 1.55 } }, /* @__PURE__ */ React.createElement("strong", null, "Consejo:"), " Con el Plan Total o VIP, el pickup & delivery es gratis en un radio de 10 millas. La disponibilidad de recogida se verifica al confirmar por WhatsApp."))), /* @__PURE__ */ React.createElement("div", { style: { background: selectedServices.size > 0 ? "rgba(245,130,32,0.08)" : "var(--bg)", borderRadius: 14, padding: "12px 16px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center", border: `1.5px solid ${selectedServices.size > 0 ? "rgba(245,130,32,0.3)" : "var(--line)"}`, transition: "all .2s" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--ink-2)", textTransform: "uppercase", letterSpacing: "0.04em" } }, "Total estimado"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--ink-soft)", marginTop: 2 } }, selectedServices.size > 0 ? [...selectedServices].join(" + ") : "Selecciona servicios arriba")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 26, fontWeight: 800, color: selectedServices.size > 0 ? "var(--orange)" : "var(--ink-soft)" } }, selectedServices.size > 0 ? `$${total}` : "\u2014")), /* @__PURE__ */ React.createElement("button", { onClick: () => canStep2 && setStep(2), disabled: !canStep2, style: { width: "100%", padding: "14px", borderRadius: 14, border: "none", background: canStep2 ? "var(--orange)" : "var(--line)", color: canStep2 ? "#fff" : "var(--ink-2)", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: canStep2 ? "pointer" : "default", transition: "all .2s" } }, "Elegir fecha y hora \u2192"), !size && selectedServices.size > 0 && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: "var(--orange)", textAlign: "center", margin: "8px 0 0" } }, "Selecciona el tama\xF1o para ver precios")), step === 2 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 16 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
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
    return /* @__PURE__ */ React.createElement("button", { key: d, onClick: () => avail && setDay(d), disabled: !avail, style: { aspectRatio: "1", borderRadius: 10, border: "none", background: sel ? "var(--orange)" : avail ? "var(--bg)" : "transparent", color: sel ? "#fff" : avail ? "var(--ink)" : "var(--ink-soft)", fontSize: 13, fontWeight: sel ? 700 : 400, cursor: avail ? "pointer" : "default", opacity: avail ? 1 : 0.35, transition: "all .15s" } }, d);
  })), day && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 8 } }, "Hora disponible"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 16 } }, availableTimes(day).map((t) => /* @__PURE__ */ React.createElement("button", { key: t, onClick: () => setTime(t), style: { padding: "8px 4px", borderRadius: 10, border: `2px solid ${time === t ? "var(--orange)" : "var(--line)"}`, background: time === t ? "rgba(245,130,32,0.07)" : "var(--bg)", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: time === t ? 700 : 500, color: "var(--ink)", transition: "all .15s" } }, t)))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(1), style: { flex: 1, padding: "13px", borderRadius: 14, border: "1.5px solid var(--line)", background: "none", fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: "var(--ink-2)", cursor: "pointer" } }, "\u2190 Atr\xE1s"), /* @__PURE__ */ React.createElement("button", { onClick: () => day && time && setStep(3), disabled: !day || !time, style: { flex: 2, padding: "13px", borderRadius: 14, border: "none", background: day && time ? "var(--orange)" : "var(--line)", color: day && time ? "#fff" : "var(--ink-2)", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: day && time ? "pointer" : "default", transition: "all .2s" } }, "Continuar \u2192"))), step === 3 && bookStatus !== "sent" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: "0 0 4px" } }, "Confirmar cita"), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", borderRadius: 12, padding: "12px 16px", marginBottom: 18, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.7 } }, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--ink)" } }, [...selectedServices].join(" + ")), " \xB7 ", size, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", verticalAlign: "-3px", marginRight: 5, color: "var(--orange)" } }, /* @__PURE__ */ React.createElement(Icon, { name: "calendar", size: 15 })), day, " de ", ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][month], ", ", year, " a las ", time), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 700, color: "var(--ink-2)", marginBottom: 4 } }, "Nombre de tu mascota ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--orange)" } }, "*")), pets.length > 0 ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, pets.map((p, i) => {
    const sel = petName === p.name;
    return /* @__PURE__ */ React.createElement("button", { key: i, onClick: () => pickPet(p), style: { padding: "8px 14px", borderRadius: 999, border: `2px solid ${sel ? "var(--orange)" : "var(--line)"}`, background: sel ? "rgba(245,130,32,0.08)" : "var(--bg)", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700, color: sel ? "var(--orange)" : "var(--ink)" } }, sel ? "\u2713 " : "", p.name, p.weight_lbs ? ` \xB7 ${p.weight_lbs}lb` : "");
  }), /* @__PURE__ */ React.createElement("input", { value: pets.some((p) => p.name === petName) ? "" : petName, onChange: (e) => setPetName(e.target.value), placeholder: "Otra mascota...", style: { flex: "1 1 120px", minWidth: 120, padding: "8px 14px", borderRadius: 999, border: "1.5px solid var(--line)", background: "var(--bg)", fontFamily: "inherit", fontSize: 13, color: "var(--ink)", outline: "none" } })) : /* @__PURE__ */ React.createElement(
    "input",
    {
      value: petName,
      onChange: (e) => setPetName(e.target.value),
      placeholder: "Max, Luna, Toby...",
      style: { width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid var(--line)", background: "var(--bg)", fontFamily: "inherit", fontSize: 14, color: "var(--ink)", outline: "none" },
      onFocus: (e) => e.target.style.borderColor = "var(--orange)",
      onBlur: (e) => e.target.style.borderColor = "var(--line)"
    }
  )), me && me.client && ownerName && phone ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--paper)" } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, color: "var(--orange)", display: "inline-flex" } }, /* @__PURE__ */ React.createElement(Icon, { name: "user", size: 18 })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--ink)" } }, ownerName), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--ink-2)" } }, phone)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10.5, fontWeight: 700, color: "#1EB87A" } }, "\u2713 Tus datos")) : [
    ["Tu nombre", ownerName, setOwnerName, "Nombre completo"],
    ["Tel\xE9fono", phone, setPhone, "+1 (305) 000-0000"]
  ].map(([label, val, setter, ph]) => /* @__PURE__ */ React.createElement("div", { key: label }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 700, color: "var(--ink-2)", marginBottom: 4 } }, label, " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--orange)" } }, "*")), /* @__PURE__ */ React.createElement(
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
  )), !activeMembership && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 700, color: "var(--ink-2)", marginBottom: 4 } }, "C\xF3digo de promoci\xF3n (opcional)"), /* @__PURE__ */ React.createElement("input", { value: promoCode, onChange: (e) => setPromoCode(e.target.value.toUpperCase()), placeholder: "Ej. APERTURA", style: { width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${promoCode ? "var(--orange)" : "var(--line)"}`, background: promoCode ? "rgba(245,130,32,0.06)" : "var(--bg)", fontFamily: "inherit", fontSize: 14, color: "var(--ink)", outline: "none", fontWeight: promoCode ? 700 : 400, letterSpacing: promoCode ? "0.08em" : 0 } }), promoCode === "APERTURA" && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#1EB87A", fontWeight: 700, marginTop: 4 } }, "\u2713 \xA1C\xF3digo de apertura aplicado! Primer ba\xF1o + corte gratis en tu visita.")), planQualifies ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, border: "1.5px solid #1EB87A", background: "rgba(30,184,122,0.08)" } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, color: "#1EB87A", display: "inline-flex" } }, /* @__PURE__ */ React.createElement(Icon, { name: activePlan ? activePlan.icon : "trophy", size: 20 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: "var(--ink)" } }, "Miembro ", activeMembership.plan, " \u2014 verificado"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#1EB87A", fontWeight: 600 } }, "Pickup & Delivery gratis + descuentos aplicados"))) : /* @__PURE__ */ React.createElement("button", { onClick: () => setIsMember((m) => !m), style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, border: `1.5px solid ${isMember ? "#1EB87A" : "var(--line)"}`, background: isMember ? "rgba(30,184,122,0.08)" : "var(--bg)", cursor: "pointer", fontFamily: "inherit", width: "100%", textAlign: "left" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 20, height: 20, borderRadius: 4, border: `2px solid ${isMember ? "#1EB87A" : "var(--line)"}`, background: isMember ? "#1EB87A" : "transparent", display: "grid", placeItems: "center", flexShrink: 0, transition: "all .15s" } }, isMember && /* @__PURE__ */ React.createElement("span", { style: { color: "#fff", fontSize: 12, fontWeight: 800 } }, "\u2713")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: "var(--ink)" } }, "Soy miembro Plan Total o VIP"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#1EB87A", fontWeight: 600 } }, "Pickup & Delivery gratis en radio de 10 millas")))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("button", { onClick: () => setStep(2), style: { flex: 1, padding: "13px", borderRadius: 14, border: "1.5px solid var(--line)", background: "none", fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: "var(--ink-2)", cursor: "pointer" } }, "\u2190 Atr\xE1s"), /* @__PURE__ */ React.createElement("button", { onClick: submitBooking, disabled: !canConfirm || bookStatus === "sending", style: { flex: 2, padding: "13px", borderRadius: 14, border: "none", background: canConfirm ? "var(--orange)" : "var(--line)", color: canConfirm ? "#fff" : "var(--ink-2)", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: canConfirm && bookStatus !== "sending" ? "pointer" : "default", transition: "all .2s" } }, bookStatus === "sending" ? "Enviando\u2026" : "Confirmar cita")), bookStatus === "error" && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12.5, color: "#C0392B", textAlign: "center", margin: "10px 0 0" } }, bookErr), !canConfirm && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: "var(--orange)", textAlign: "center", margin: "8px 0 0" } }, "Completa mascota, nombre y tel\xE9fono para confirmar"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10.5, color: "var(--ink-soft)", textAlign: "center", margin: "12px 0 0" } }, "Recibir\xE1s confirmaci\xF3n en menos de 2 horas en horario laboral")), step === 3 && bookStatus === "sent" && /* @__PURE__ */ React.createElement("div", { className: "bs-fade", style: { textAlign: "center", padding: "14px 6px 8px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 64, height: 64, borderRadius: "50%", background: "rgba(30,184,122,0.12)", display: "grid", placeItems: "center", color: "#1EB87A" } }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 34 }))), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, color: "var(--ink)", margin: "0 0 6px" } }, "\xA1Cita confirmada!"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.55, margin: "0 0 16px" } }, "Recibimos tu solicitud para ", /* @__PURE__ */ React.createElement("strong", null, petName), ". Te confirmamos disponibilidad en menos de 2 horas en horario laboral."), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "left", background: "var(--paper)", borderRadius: 14, padding: "14px 16px", marginBottom: 16, fontSize: 13, color: "var(--ink-2)", lineHeight: 1.8 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--ink)" } }, [...selectedServices].join(" + ")), " \xB7 ", size), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", verticalAlign: "-3px", marginRight: 5, color: "var(--orange)" } }, /* @__PURE__ */ React.createElement(Icon, { name: "calendar", size: 15 })), day, " de ", ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][month], ", ", year, " \xB7 ", time), /* @__PURE__ */ React.createElement("div", null, "Mascota: ", /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--ink)" } }, petName)), /* @__PURE__ */ React.createElement("div", null, "A nombre de: ", ownerName, " \xB7 ", phone), total > 0 && /* @__PURE__ */ React.createElement("div", null, "Total estimado: ", /* @__PURE__ */ React.createElement("strong", { style: { color: "var(--orange)" } }, "$", total))), me && me.email ? /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12.5, color: "#1EB87A", fontWeight: 600, margin: "0 0 16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 } }, /* @__PURE__ */ React.createElement(Icon, { name: "mail", size: 15 }), " Enviamos la confirmaci\xF3n a ", me.email) : /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "var(--ink-soft)", margin: "0 0 16px" } }, "Te contactaremos al ", phone, " para confirmar."), /* @__PURE__ */ React.createElement("a", { href: buildWhatsApp(), target: "_blank", rel: "noopener noreferrer", style: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 24px", borderRadius: 14, background: "#25D366", color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, textDecoration: "none", marginBottom: 10 } }, /* @__PURE__ */ React.createElement(Icon, { name: "chat", size: 18, color: "#fff" }), " Enviar tambi\xE9n por WhatsApp"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", { onClick: resetBooking, className: "bs-btn", style: { background: "none", border: "none", color: "var(--ink-2)", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" } }, "Agendar otra cita"))));
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
  return /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,#FF5520 0%,#FF8C00 45%,#FFB800 100%)", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.06)", top: -200, right: -100, pointerEvents: "none" } }), /* @__PURE__ */ React.createElement("div", { className: "container", style: { padding: "22px 0", position: "relative", zIndex: 1 } }, claimed ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap", textAlign: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#fff", display: "inline-flex" } }, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 26 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: "#fff" } }, "\xA1C\xF3digo APERTURA aplicado!"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 2 } }, "Muestra esta pantalla al llegar. Tu primer ba\xF1o + corte es GRATIS.")), /* @__PURE__ */ React.createElement("button", { onClick: () => setOpen(false), style: { background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 999, padding: "8px 16px", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 13 } }, "Cerrar")) : /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", { style: { flex: "1 1 260px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.2)", borderRadius: 999, padding: "3px 12px", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" } }, "Oferta de Apertura \xB7 Tiempo Limitado")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(20px,3vw,32px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1 } }, "Primer ba\xF1o + corte ", /* @__PURE__ */ React.createElement("span", { style: { background: "rgba(255,255,255,0.25)", borderRadius: 6, padding: "2px 8px" } }, "GRATIS")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 5 } }, "Nuevo local \xB7 C\xF3digo ", /* @__PURE__ */ React.createElement("strong", null, "APERTURA"), " \xB7 Solo por tiempo limitado")), /* @__PURE__ */ React.createElement("form", { onSubmit: claim, style: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", flex: "1 1 300px" } }, /* @__PURE__ */ React.createElement(
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
    loading ? "Aplicando..." : "Reclamar Oferta"
  )), /* @__PURE__ */ React.createElement("button", { onClick: () => setOpen(false), style: { background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 22, cursor: "pointer", padding: 4, flexShrink: 0, lineHeight: 1 } }, "\xD7"))));
}
function MembershipPetModal({ buyFor, me, billing, onClose }) {
  const presetPets = me && me.pets || [];
  const [email, setEmail] = useState(me && me.email || "");
  const [name, setName] = useState(presetPets[0] ? presetPets[0].name : "");
  const [breed, setBreed] = useState("");
  const [size, setSize] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState(presetPets[0] && presetPets[0].weight_lbs ? String(presetPets[0].weight_lbs) : "");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const m = buyFor.m;
  const pickPreset = (p) => {
    setName(p.name || "");
    if (p.weight_lbs) setWeight(String(p.weight_lbs));
    if (p.breed) setBreed(p.breed);
  };
  const go = async () => {
    const em = (email || "").trim().toLowerCase();
    if (!name.trim()) {
      setErr("Escribe el nombre de tu mascota");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) {
      setErr("Escribe un correo v\xE1lido para tu membres\xEDa");
      return;
    }
    setBusy(true);
    setErr("");
    const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
    try {
      const r = await fetch("https://oqqwmcplljirbreowrll.supabase.co/functions/v1/stripe_membership", {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": ANON_KEY, "Authorization": "Bearer " + ANON_KEY },
        body: JSON.stringify({
          action: "checkout",
          plan_key: buyFor.planKey,
          client_email: em,
          pet: { name: name.trim(), breed: breed.trim(), size, sex, weight_lbs: weight, notes: notes.trim() },
          success_url: "https://bpuppy.us/grooming",
          cancel_url: location.href
        })
      });
      const c = await r.json();
      if (c.url) {
        location.href = c.url;
        return;
      }
      setErr(c && c.error || "No se pudo iniciar el pago");
      setBusy(false);
    } catch (e) {
      setErr("Error de red, intenta de nuevo");
      setBusy(false);
    }
  };
  const fld = { width: "100%", padding: "11px 13px", borderRadius: 11, border: "1.5px solid var(--line)", fontFamily: "inherit", fontSize: 14, color: "var(--ink)", background: "var(--bg)", outline: "none" };
  const lbl = { fontSize: 11.5, fontWeight: 700, color: "var(--ink-2)", marginBottom: 4 };
  return /* @__PURE__ */ React.createElement("div", { onClick: (e) => {
    if (e.target === e.currentTarget) onClose();
  }, style: { position: "fixed", inset: 0, background: "rgba(45,36,33,0.55)", backdropFilter: "blur(3px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px", zIndex: 1e3, overflowY: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", borderRadius: 20, width: "100%", maxWidth: 460, padding: 24, boxShadow: "0 30px 80px rgba(45,36,33,0.3)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: "var(--ink)", margin: 0 } }, "\xBFPara qu\xE9 mascota es tu ", m.name, "?"), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { border: "none", background: "var(--paper)", width: 30, height: 30, borderRadius: "50%", fontSize: 18, lineHeight: 1, cursor: "pointer", color: "var(--ink-2)", flexShrink: 0 } }, "\xD7")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12.5, color: "var(--ink-2)", margin: "0 0 14px", lineHeight: 1.5 } }, "Registramos a tu mascota con tu membres\xEDa. La confirmamos y queda lista en tu portal."), presetPets.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 } }, presetPets.map((p, i) => {
    const sel = name === p.name;
    return /* @__PURE__ */ React.createElement("button", { key: i, onClick: () => pickPreset(p), style: { padding: "7px 13px", borderRadius: 999, border: `2px solid ${sel ? "var(--orange)" : "var(--line)"}`, background: sel ? "rgba(245,130,32,0.08)" : "var(--bg)", cursor: "pointer", fontFamily: "inherit", fontSize: 12.5, fontWeight: 700, color: sel ? "var(--orange)" : "var(--ink)" } }, p.name);
  })), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Nombre de la mascota *"), /* @__PURE__ */ React.createElement("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Ej: Max", style: fld })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Raza"), /* @__PURE__ */ React.createElement("input", { value: breed, onChange: (e) => setBreed(e.target.value), placeholder: "Ej: Poodle", style: fld })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Tama\xF1o"), /* @__PURE__ */ React.createElement("select", { value: size, onChange: (e) => setSize(e.target.value), style: fld }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014"), /* @__PURE__ */ React.createElement("option", null, "Peque\xF1o"), /* @__PURE__ */ React.createElement("option", null, "Mediano"), /* @__PURE__ */ React.createElement("option", null, "Grande"), /* @__PURE__ */ React.createElement("option", null, "XL"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Sexo"), /* @__PURE__ */ React.createElement("select", { value: sex, onChange: (e) => setSex(e.target.value), style: fld }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014"), /* @__PURE__ */ React.createElement("option", null, "Macho"), /* @__PURE__ */ React.createElement("option", null, "Hembra"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Peso (lb)"), /* @__PURE__ */ React.createElement("input", { value: weight, onChange: (e) => setWeight(e.target.value), type: "number", min: "0", placeholder: "Ej: 12", style: fld })), /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Tu correo *"), /* @__PURE__ */ React.createElement("input", { value: email, onChange: (e) => setEmail(e.target.value), type: "email", placeholder: "tu@correo.com", style: fld, disabled: !!(me && me.email) })), /* @__PURE__ */ React.createElement("div", { style: { gridColumn: "1/-1" } }, /* @__PURE__ */ React.createElement("div", { style: lbl }, "Notas (opcional)"), /* @__PURE__ */ React.createElement("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Alergias, comportamiento...", rows: 2, style: { ...fld, resize: "vertical", minHeight: 54 } }))), err && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontSize: 13, fontWeight: 600, color: "#C0392B", background: "#f8e3df", borderRadius: 10, padding: "9px 12px" } }, err), /* @__PURE__ */ React.createElement("button", { onClick: go, disabled: busy, style: { width: "100%", marginTop: 14, padding: 14, borderRadius: 13, border: "none", background: busy ? "var(--line)" : "var(--orange)", color: "#fff", fontFamily: "inherit", fontSize: 15, fontWeight: 800, cursor: busy ? "default" : "pointer" } }, busy ? "Redirigiendo a pago seguro\u2026" : "Continuar al pago \u2192"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 10.5, color: "var(--ink-soft)", textAlign: "center", margin: "8px 0 0" } }, "Pago seguro con Stripe. Tu mascota queda registrada al confirmar.")));
}
function GroomingApp() {
  const [sizeIdx, setSizeIdx] = useState(0);
  const sizeKey = SIZEKEYS[sizeIdx];
  const [tab, setTab] = useState("servicios");
  const [billing, setBilling] = useState("month");
  const groomingArts = useMemo(() => typeof BLOG !== "undefined" ? BLOG.filter((a) => a.cat === "grooming") : [], []);
  const [authOpen, setAuthOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authSent, setAuthSent] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [authErr, setAuthErr] = useState("");
  const [me, setMe] = useState(null);
  const [meBusy, setMeBusy] = useState(false);
  const [buyFor, setBuyFor] = useState(null);
  useEffect(() => {
    if (!window._groomSb) {
      try {
        const SU = "https://oqqwmcplljirbreowrll.supabase.co";
        const SK = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
        window._groomSb = supabase.createClient(SU, SK);
      } catch (e) {
      }
    }
    const sb = window._groomSb;
    if (!sb) return;
    let cancelled = false;
    const fetchPortal = async (token) => {
      if (!token) return;
      setMeBusy(true);
      try {
        const r = await fetch("https://oqqwmcplljirbreowrll.supabase.co/functions/v1/portal_data", {
          method: "POST",
          headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
          body: "{}"
        });
        const d = await r.json();
        if (!cancelled && d && d.ok) {
          setMe(d);
          setAuthOpen(false);
        }
      } catch (e) {
      } finally {
        if (!cancelled) setMeBusy(false);
      }
    };
    sb.auth.getSession().then(({ data }) => {
      const tok = data && data.session && data.session.access_token;
      if (tok) fetchPortal(tok);
    });
    const sub = sb.auth.onAuthStateChange((_evt, session) => {
      if (session && session.access_token) fetchPortal(session.access_token);
      else setMe(null);
    });
    return () => {
      cancelled = true;
      try {
        sub.data.subscription.unsubscribe();
      } catch (e) {
      }
    };
  }, []);
  const sendMagicLink = async () => {
    const email = (authEmail || "").trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setAuthErr("Escribe un correo v\xE1lido");
      return;
    }
    setAuthBusy(true);
    setAuthErr("");
    try {
      const r = await fetch("https://oqqwmcplljirbreowrll.supabase.co/functions/v1/portal_magiclink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, redirectTo: window.location.href.split("#")[0] })
      });
      const d = await r.json();
      if (d && d.ok) setAuthSent(true);
      else setAuthErr(d && d.error || "No se pudo enviar el enlace");
    } catch (e) {
      setAuthErr("Error de red, intenta de nuevo");
    } finally {
      setAuthBusy(false);
    }
  };
  const logout = async () => {
    try {
      await window._groomSb.auth.signOut();
    } catch (e) {
    }
    setMe(null);
  };
  const planInfo = (planName) => {
    const p = (planName || "").toLowerCase();
    return MEMBERSHIPS.find((m) => p.includes(m.name.replace(/^Plan\s+/i, "").toLowerCase())) || null;
  };
  const activeMembership = (me && me.memberships || []).find((m) => (m.status || "active") !== "cancelled") || (me && me.memberships || [])[0] || null;
  const activePlan = activeMembership ? planInfo(activeMembership.plan) : null;
  const firstName = me && me.client ? (me.client.first_name || "").split(" ")[0] : "";
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
  }), /* @__PURE__ */ React.createElement("div", { className: "container", style: { paddingTop: 120, paddingBottom: 60, position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { paddingBottom: 20, maxWidth: "50%", position: "relative", zIndex: 2 } }, "            ", /* @__PURE__ */ React.createElement("div", { style: { display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,130,32,0.08)", border: "1px solid rgba(245,130,32,0.22)", borderRadius: 999, padding: "7px 16px", marginBottom: 22 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--orange)", display: "inline-flex" } }, /* @__PURE__ */ React.createElement(Icon, { name: "pin", size: 16 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 9.5, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 1 } }, "Pr\xF3ximamente abriendo"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 600, color: "var(--ink)" } }, "5604 Kalogridis Rd, Haines City, FL 33844"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#3A8FC7", marginBottom: 16 } }, "BPuppy Grooming"), /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 800, color: "var(--ink)", margin: "0 0 16px", letterSpacing: "-0.035em", lineHeight: 1.05 } }, "Tu mascota merece", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", { style: { fontFamily: "Instrument Serif,Georgia,serif", fontStyle: "italic", fontWeight: 400, color: "var(--orange)" } }, "verse incre\xEDble")), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15, color: "var(--ink-2)", margin: "0 0 28px", lineHeight: 1.65, maxWidth: 400 } }, "Ba\xF1o, corte, deslanado y spa con productos premium. Recogida y entrega disponible. Planes de membres\xEDa con descuento anual."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("a", { href: "#booking", style: { padding: "13px 24px", borderRadius: 14, background: "var(--orange)", color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 24px -8px rgba(245,130,32,0.45)" } }, "Agendar cita ahora"), /* @__PURE__ */ React.createElement("a", { href: "#memberships", style: { padding: "13px 24px", borderRadius: 14, background: "var(--bg)", color: "var(--ink)", fontFamily: "inherit", fontSize: 14, fontWeight: 600, textDecoration: "none", border: "1.5px solid var(--line)" } }, "Ver membres\xEDas")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18 } }, me ? /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        document.getElementById("mi-cuenta")?.scrollIntoView({ behavior: "smooth" });
      },
      style: { display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999, background: "#fff", border: "1.5px solid var(--line)", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700, color: "var(--ink)" }
    },
    /* @__PURE__ */ React.createElement("span", { style: { width: 26, height: 26, borderRadius: "50%", background: "var(--orange)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800 } }, (firstName || "?")[0]),
    "Hola, ",
    firstName || "cliente",
    " \xB7 Mi cuenta"
  ) : /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setAuthOpen(true);
        setAuthSent(false);
        setAuthErr("");
      },
      style: { display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 999, background: "transparent", border: "1.5px solid var(--line)", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, color: "var(--ink-2)" }
    },
    /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex" } }, /* @__PURE__ */ React.createElement(Icon, { name: "user", size: 15 })),
    " Ya soy cliente \xB7 Entrar"
  ))))), /* @__PURE__ */ React.createElement(OpeningBanner, null), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--paper)", borderBottom: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("div", { className: "container", style: { display: "flex", gap: 0, overflowX: "auto", scrollbarWidth: "none" } }, [["scissors", "Grooming profesional"], ["van", "Pickup & Delivery"], ["leaf", "Productos premium"], ["clock", "Lun\u2013S\xE1b 9am\u20136pm"], ["chat", "Confirmaci\xF3n inmediata"]].map(([ic, label]) => /* @__PURE__ */ React.createElement("div", { key: label, style: { display: "flex", alignItems: "center", gap: 8, padding: "14px 20px", borderRight: "1px solid var(--line)", whiteSpace: "nowrap", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--orange)", display: "inline-flex" } }, /* @__PURE__ */ React.createElement(Icon, { name: ic, size: 18 })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, fontWeight: 600, color: "var(--ink-2)" } }, label))))), /* @__PURE__ */ React.createElement("div", { className: "container", style: { padding: "60px 0 0" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, background: "var(--paper)", borderRadius: 14, padding: 5, marginBottom: 40, width: "fit-content" } }, [["servicios", "Servicios"], ["paquetes", "Paquetes"], ["memberships", "Membres\xEDas"]].map(([id, label]) => /* @__PURE__ */ React.createElement("button", { key: id, onClick: () => {
    setTab(id);
    if (id === "memberships") document.getElementById("memberships")?.scrollIntoView();
  }, style: { padding: "9px 18px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: tab === id ? 700 : 500, background: tab === id ? "var(--orange)" : "transparent", color: tab === id ? "#fff" : "var(--ink-2)", transition: "all .15s" } }, label))), tab === "servicios" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 20, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, color: "var(--ink)", margin: 0 } }, "Precios por servicio"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6 } }, ["S", "M", "L", "XL"].map((s, i) => /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => setSizeIdx(i), style: { padding: "5px 14px", borderRadius: 999, border: "none", background: sizeIdx === i ? "var(--orange)" : "var(--bg)", color: sizeIdx === i ? "#fff" : "var(--ink-2)", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer" } }, s))), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "var(--ink-soft)" } }, ["Peque\xF1o (< 15 lbs)", "Mediano (15-40 lbs)", "Grande (40-70 lbs)", "XL (70+ lbs)"][sizeIdx])), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 12, marginBottom: 40 } }, SERVICES.map((sv) => /* @__PURE__ */ React.createElement("div", { key: sv.name, style: { background: sv.highlight ? "linear-gradient(135deg,rgba(245,130,32,0.10),rgba(232,93,117,0.10))" : "var(--paper)", borderRadius: 16, padding: "18px 14px", border: sv.highlight ? "1.5px solid rgba(245,130,32,0.3)" : "1px solid var(--line)", textAlign: "center", position: "relative" } }, sv.highlight && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: "var(--orange)", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 999, whiteSpace: "nowrap" } }, "TODO INCLUIDO"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 8, color: "var(--orange)", display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React.createElement(Icon, { name: sv.icon, size: 28 })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, fontWeight: 700, color: "var(--ink)", lineHeight: 1.25, marginBottom: 6 } }, sv.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, color: sv.highlight ? "var(--orange)" : "var(--ink)" } }, "$", sv.prices[sizeKey]), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.4 } }, sv.desc))))), tab === "paquetes" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 24, fontWeight: 800, color: "var(--ink)", margin: "0 0 8px" } }, "Paquetes combinados"), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-2)", marginBottom: 24 } }, "Selecciona el tama\xF1o de tu mascota:"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 28 } }, ["S", "M", "L", "XL"].map((s, i) => /* @__PURE__ */ React.createElement("button", { key: s, onClick: () => setSizeIdx(i), style: { padding: "6px 16px", borderRadius: 999, border: "none", background: sizeIdx === i ? "var(--orange)" : "var(--bg)", color: sizeIdx === i ? "#fff" : "var(--ink-2)", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer" } }, s))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginBottom: 40 } }, PACKAGES.map((pkg) => /* @__PURE__ */ React.createElement("div", { key: pkg.name, style: { background: "var(--paper)", borderRadius: 20, padding: "24px", border: pkg.popular ? `2px solid ${pkg.color}` : "1px solid var(--line)", position: "relative", overflow: "hidden" } }, pkg.popular && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 16, right: 16, background: pkg.color, color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 999 } }, "M\xC1S POPULAR"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 10, color: pkg.color, display: "flex" } }, /* @__PURE__ */ React.createElement(Icon, { name: pkg.icon, size: 30 })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18, fontWeight: 800, color: "var(--ink)", marginBottom: 4 } }, pkg.name), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 30, fontWeight: 800, color: pkg.color, marginBottom: 4 } }, "$", pkg.prices[sizeKey]), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--ink-soft)", marginBottom: 16 } }, pkg.note), /* @__PURE__ */ React.createElement("ul", { style: { padding: 0, margin: "0 0 20px", listStyle: "none", display: "flex", flexDirection: "column", gap: 6 } }, pkg.includes.map((item) => /* @__PURE__ */ React.createElement("li", { key: item, style: { display: "flex", gap: 8, fontSize: 13, color: "var(--ink-2)" } }, /* @__PURE__ */ React.createElement("span", { style: { color: pkg.color, fontWeight: 700, flexShrink: 0 } }, "\u2713"), item))), /* @__PURE__ */ React.createElement("a", { href: "#booking", style: { display: "block", textAlign: "center", padding: "11px", borderRadius: 12, background: pkg.color, color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, textDecoration: "none" } }, "Agendar este paquete")))))), /* @__PURE__ */ React.createElement("div", { id: "booking", style: { background: "var(--bg)", padding: "70px 0" } }, /* @__PURE__ */ React.createElement("div", { className: "container", style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow", style: { marginBottom: 10 } }, "Reserva tu cita"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 800, color: "var(--ink)", margin: "0 0 14px", letterSpacing: "-0.03em" } }, "Agenda r\xE1pido,", /* @__PURE__ */ React.createElement("br", null), "Confirmaci\xF3n Inmediata"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65, margin: "0 0 24px" } }, "Selecciona servicio, fecha y hora. Te confirmamos disponibilidad en menos de 2 horas. Tambi\xE9n ofrecemos ", /* @__PURE__ */ React.createElement("strong", null, "recogida y entrega"), " \u2014 pregunta al reservar."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, [["pin", "Pr\xF3ximamente \xB7 Haines City, FL", "5604 Kalogridis Rd, Haines City, FL 33844"], ["van", "Pickup & Delivery", "Recogemos y entregamos en tu casa (+$20)"], ["clock", "Horario", "Lun \u2013 S\xE1b: 9:00 AM \u2013 6:00 PM"]].map(([ic, title, sub]) => /* @__PURE__ */ React.createElement("div", { key: title, style: { display: "flex", gap: 12, padding: "14px 16px", background: "var(--paper)", borderRadius: 12, border: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, color: "var(--orange)", display: "inline-flex" } }, /* @__PURE__ */ React.createElement(Icon, { name: ic, size: 22 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: "var(--ink)" } }, title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--ink-2)", marginTop: 2 } }, sub)))))), /* @__PURE__ */ React.createElement(BookingCalendar, { me, activeMembership, activePlan, firstName, onLogin: () => {
    setAuthOpen(true);
    setAuthSent(false);
    setAuthErr("");
  } }))), /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", padding: "60px 0 0", borderTop: "1px solid var(--line)" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow", style: { marginBottom: 6 } }, "Nuestra pr\xF3xima ubicaci\xF3n"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, color: "var(--ink)", margin: 0, letterSpacing: "-0.025em" } }, "BPuppy Grooming \xB7 Haines City, FL")), /* @__PURE__ */ React.createElement(
    "a",
    {
      href: "https://maps.google.com/?q=5604+Kalogridis+Rd,+Haines+City,+FL+33844",
      target: "_blank",
      rel: "noreferrer",
      style: { marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 999, background: "var(--orange)", color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 6px 20px -6px rgba(245,130,32,0.45)" }
    },
    /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "10", r: "3" })),
    "Abrir en Maps"
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20, padding: "12px 18px", background: "rgba(245,130,32,0.06)", border: "1px solid rgba(245,130,32,0.2)", borderRadius: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "var(--orange)", display: "inline-flex" } }, /* @__PURE__ */ React.createElement(Icon, { name: "pin", size: 18 })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--ink)" } }, "5604 Kalogridis Rd, Haines City, FL 33844"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--orange)", fontWeight: 600 } }, "Pr\xF3ximamente abriendo \xB7 \xA1S\xEDguenos para el anuncio oficial!"))), /* @__PURE__ */ React.createElement("div", { style: { borderRadius: 18, overflow: "hidden", border: "1px solid var(--line)", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" } }, /* @__PURE__ */ React.createElement(
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
  )))), "      ", /* @__PURE__ */ React.createElement("div", { id: "memberships", style: { background: "var(--ink)", padding: "70px 0" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 40 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "inline-block", padding: "4px 14px", borderRadius: 999, background: "rgba(245,130,32,0.18)", color: "var(--orange)", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 } }, "Membres\xEDas"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.03em" } }, "Ahorra pagando anual"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 24 } }, "Compromiso mensual o pago anual con descuento garantizado"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: 4, width: "fit-content", margin: "0 auto" } }, [["month", "Mensual"], ["year", "Anual (ahorra 20%)"]].map(([id, label]) => /* @__PURE__ */ React.createElement("button", { key: id, onClick: () => setBilling(id), style: { padding: "8px 18px", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700, background: billing === id ? "#fff" : "transparent", color: billing === id ? "var(--ink)" : "rgba(255,255,255,0.6)", transition: "all .15s" } }, label)))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20, marginBottom: 40 } }, MEMBERSHIPS.map((m) => /* @__PURE__ */ React.createElement("div", { key: m.name, style: { background: m.popular ? m.color : "rgba(255,255,255,0.07)", borderRadius: 20, padding: "28px 24px", border: m.popular ? "none" : "1px solid rgba(255,255,255,0.12)", position: "relative" } }, m.popular && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "#FFD700", color: "#2D2421", fontSize: 10, fontWeight: 900, padding: "4px 14px", borderRadius: 999, whiteSpace: "nowrap" } }, "M\xC1S POPULAR"), m.promo && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -10, right: 16, background: "#FF3B30", color: "#fff", fontSize: 9, fontWeight: 900, padding: "3px 10px", borderRadius: 999, whiteSpace: "nowrap", letterSpacing: "0.06em" } }, "APERTURA"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 10, color: "#fff", display: "flex" } }, /* @__PURE__ */ React.createElement(Icon, { name: m.icon, size: 30 })), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 } }, m.name), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 } }, m.promo && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, color: "rgba(255,255,255,0.4)", textDecoration: "line-through" } }, "$", billing === "month" ? m.price_month : Math.round(m.price_year / 12)), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 36, fontWeight: 800, color: "#fff" } }, "$", billing === "month" ? m.price_month_promo || m.price_month : Math.round((m.price_year_promo || m.price_year) / 12)), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, color: "rgba(255,255,255,0.6)" } }, "/mes")), billing === "year" && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 } }, "$", m.price_year_promo || m.price_year, "/a\xF1o \xB7 ahorras $", m.savings_promo || m.savings), m.promo && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#FFD700", fontWeight: 700, marginBottom: 8 } }, "Precio de apertura \xB7 Solo por tiempo limitado"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12.5, color: "rgba(255,255,255,0.65)", margin: "0 0 18px", lineHeight: 1.55 } }, m.cta), /* @__PURE__ */ React.createElement("ul", { style: { padding: 0, margin: "0 0 22px", listStyle: "none", display: "flex", flexDirection: "column", gap: 8 } }, m.includes.map((item) => /* @__PURE__ */ React.createElement("li", { key: item, style: { display: "flex", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.8)" } }, /* @__PURE__ */ React.createElement("span", { style: { color: m.popular ? "#fff" : m.color, fontWeight: 700, flexShrink: 0 } }, "\u2713"), item))), /* @__PURE__ */ React.createElement("a", { href: "#", onClick: (e) => {
    e.preventDefault();
    const tk = (/esencial/i.test(m.name) ? "esencial" : /vip/i.test(m.name) ? "vip" : "total") + "_" + billing;
    setBuyFor({ m, planKey: tk });
  }, style: { display: "block", textAlign: "center", padding: "12px", borderRadius: 12, background: m.popular ? "rgba(255,255,255,0.2)" : m.color, color: "#fff", fontFamily: "inherit", fontSize: 13, fontWeight: 700, textDecoration: "none", cursor: "pointer" } }, "Suscribirse ahora")))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 16 } }, "M\xE9todos de pago aceptados"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" } }, PAYMENT_METHODS.map((pm) => /* @__PURE__ */ React.createElement("span", { key: pm.name, style: { display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 999, background: "rgba(255,255,255,0.08)", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)" } }, pm.icon && /* @__PURE__ */ React.createElement(Icon, { name: pm.icon, size: 15 }), pm.name)))))), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--paper)", padding: "60px 0" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 24, fontWeight: 800, color: "var(--ink)", margin: "0 0 24px" } }, "Nuestro trabajo"), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12 } }, Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ React.createElement("image-slot", { key: i, id: `grooming-work-${i}`, shape: "rounded", radius: "14", placeholder: ["Antes / Despu\xE9s", "Corte creativo", "Spa VIP", "Golden groomed", "Schnauzer cortado", "Poodle teddy bear", "Shih Tzu spa", "Cachorro primer ba\xF1o"][i], style: { aspectRatio: "1", display: "block" } }))))), groomingArts.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", padding: "60px 0 80px" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 } }, /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, color: "var(--ink)", margin: 0 } }, "Art\xEDculos de grooming"), /* @__PURE__ */ React.createElement("a", { href: "/blog", style: { fontSize: 13, fontWeight: 700, color: "var(--orange)", textDecoration: "none" } }, "Ver todos \u2192")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20 } }, groomingArts.slice(0, 4).map((art) => /* @__PURE__ */ React.createElement(
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
    /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, color: "var(--orange)", display: "inline-flex", width: 36, height: 36, alignItems: "center", justifyContent: "center", background: "rgba(245,130,32,0.1)", borderRadius: 10 } }, /* @__PURE__ */ React.createElement(Icon, { name: "scissors", size: 20 })),
    /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, fontWeight: 800, color: "#9C27B0", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 } }, "Grooming"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3, marginBottom: 4 } }, art.title), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--ink-soft)" } }, art.read, " min \xB7 Leer art\xEDculo \u2192"))
  ))))), me && /* @__PURE__ */ React.createElement("div", { id: "mi-cuenta", style: { background: "var(--paper)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "48px 0" } }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 24 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)", marginBottom: 6 } }, "Mi cuenta"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 26, fontWeight: 800, color: "var(--ink)", margin: 0 } }, "Hola, ", firstName || "cliente"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "var(--ink-soft)", marginTop: 4 } }, me.email)), /* @__PURE__ */ React.createElement("button", { onClick: logout, style: { padding: "8px 16px", borderRadius: 999, background: "transparent", border: "1.5px solid var(--line)", cursor: "pointer", fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, color: "var(--ink-2)" } }, "Cerrar sesi\xF3n")), activeMembership ? /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,#2D2421,#43352d)", borderRadius: 18, padding: "24px 26px", color: "#fff", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex" } }, /* @__PURE__ */ React.createElement(Icon, { name: activePlan ? activePlan.icon : "trophy", size: 24, color: "#fff" })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18, fontWeight: 800 } }, activeMembership.plan || "Membres\xEDa"), /* @__PURE__ */ React.createElement("span", { style: { padding: "3px 11px", borderRadius: 999, background: "rgba(255,255,255,0.14)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" } }, activeMembership.status || "activa"), typeof activeMembership.credits_balance === "number" && /* @__PURE__ */ React.createElement("span", { style: { marginLeft: "auto", fontSize: 12.5, fontWeight: 700, color: "rgba(255,255,255,0.85)" } }, activeMembership.credits_balance, " groom", activeMembership.credits_balance === 1 ? "" : "s", " disponible", activeMembership.credits_balance === 1 ? "" : "s")), activePlan && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8 } }, activePlan.includes.map((b, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 10, background: "rgba(255,255,255,0.08)", fontSize: 12, fontWeight: 600 } }, "\u2713 ", b))), activeMembership.renew_date && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 14 } }, "Renueva: ", activeMembership.renew_date)) : /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg)", border: "1.5px solid var(--line)", borderRadius: 16, padding: "20px 22px", marginBottom: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 4 } }, "A\xFAn no tienes un plan de membres\xEDa"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "var(--ink-soft)", marginBottom: 12 } }, "Ahorra hasta 20% y obt\xE9n pickup & delivery incluido."), /* @__PURE__ */ React.createElement("a", { href: "#memberships", style: { display: "inline-block", padding: "10px 18px", borderRadius: 12, background: "var(--orange)", color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none" } }, "Ver membres\xEDas")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 18, fontWeight: 800, color: "var(--ink)", margin: 0 } }, "Mis mascotas")), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 } }, (me.pets || []).map((pet) => /* @__PURE__ */ React.createElement("div", { key: pet.id, style: { background: "#fff", border: "1px solid var(--line)", borderRadius: 14, padding: "16px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 40, height: 40, borderRadius: "50%", background: "var(--bg)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 20, overflow: "hidden" } }, pet.photo_url ? /* @__PURE__ */ React.createElement("img", { src: pet.photo_url, alt: "", style: { width: "100%", height: "100%", objectFit: "cover" } }) : /* @__PURE__ */ React.createElement("span", { style: { color: "var(--orange)", display: "inline-flex" } }, /* @__PURE__ */ React.createElement(Icon, { name: "paw", size: 30 }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 14, fontWeight: 800, color: "var(--ink)" } }, pet.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--ink-soft)" } }, [pet.breed, pet.size].filter(Boolean).join(" \xB7 ") || "Sin detalles"))), /* @__PURE__ */ React.createElement("a", { href: "#booking", style: { display: "block", marginTop: 12, textAlign: "center", padding: "8px 0", borderRadius: 10, background: "var(--bg)", color: "var(--ink)", fontSize: 12.5, fontWeight: 700, textDecoration: "none", border: "1px solid var(--line)" } }, "Agendar para ", pet.name.split(" ")[0]))), /* @__PURE__ */ React.createElement("a", { href: "#booking", style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, background: "var(--bg)", border: "1.5px dashed var(--line)", borderRadius: 14, padding: "16px 18px", textDecoration: "none", color: "var(--ink-2)", minHeight: 96 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 24 } }, "\uFF0B"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, fontWeight: 700 } }, (me.pets || []).length ? "Agregar otra mascota" : "Agendar mi primera cita"))))), authOpen && /* @__PURE__ */ React.createElement("div", { onClick: () => setAuthOpen(false), style: { position: "fixed", inset: 0, zIndex: 9e3, background: "rgba(45,36,33,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 } }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { background: "#fff", borderRadius: 20, padding: "30px 28px", width: "100%", maxWidth: 400, boxShadow: "0 24px 60px -16px rgba(45,36,33,0.4)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--orange)" } }, "BPuppy \xB7 Mi cuenta"), /* @__PURE__ */ React.createElement("button", { onClick: () => setAuthOpen(false), style: { background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "var(--ink-soft)", lineHeight: 1 } }, "\xD7")), authSent ? /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "10px 0" } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 10, color: "var(--orange)", display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React.createElement(Icon, { name: "mail", size: 40, stroke: 1.4 })), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: "var(--ink)", margin: "0 0 8px" } }, "Revisa tu correo"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.6, margin: 0 } }, "Te enviamos un enlace a ", /* @__PURE__ */ React.createElement("b", null, authEmail.trim().toLowerCase()), ". T\xF3calo para entrar \u2014 sin contrase\xF1as.")) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, color: "var(--ink)", margin: "4px 0 8px" } }, "Entrar a mi cuenta"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.6, margin: "0 0 18px" } }, "Escribe tu correo y te enviamos un enlace para entrar. Ah\xED ver\xE1s tu plan, tus mascotas y agendas m\xE1s r\xE1pido."), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "email",
      value: authEmail,
      onChange: (e) => setAuthEmail(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter") sendMagicLink();
      },
      placeholder: "tu@correo.com",
      autoFocus: true,
      style: { width: "100%", padding: "13px 15px", borderRadius: 12, border: "1.5px solid var(--line)", fontFamily: "inherit", fontSize: 15, boxSizing: "border-box", marginBottom: authErr ? 6 : 14 }
    }
  ), authErr && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: "#D14343", marginBottom: 12 } }, authErr), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: sendMagicLink,
      disabled: authBusy,
      style: { width: "100%", padding: "14px", borderRadius: 12, border: "none", background: "var(--orange)", color: "#fff", fontFamily: "inherit", fontSize: 15, fontWeight: 800, cursor: authBusy ? "default" : "pointer", opacity: authBusy ? 0.7 : 1 }
    },
    authBusy ? "Enviando\u2026" : "Enviar enlace de acceso \u2192"
  )))), buyFor && /* @__PURE__ */ React.createElement(MembershipPetModal, { buyFor, me, billing, onClose: () => setBuyFor(null) }));
}
Object.assign(window, { GroomingApp, BookingCalendar });

})();
