// grooming-views.jsx — Página completa de Grooming BPuppy
const { useState, useEffect, useMemo } = React;

// ── Iconos de línea (SVG limpio, sin emojis) ───────────────────────────────────
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
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/>',
};
function Icon({ name, size = 22, color = 'currentColor', stroke = 1.7, style }) {
  const p = ICON_PATHS[name];
  if (!p) return null;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style} dangerouslySetInnerHTML={{ __html: p }} />;
}

// ── Data ───────────────────────────────────────────────────────────────────────
const SIZES = ['Pequeño\n(< 15 lbs)', 'Mediano\n(15–40 lbs)', 'Grande\n(40–70 lbs)', 'XL\n(70+ lbs)'];
const SIZEKEYS = ['s', 'm', 'l', 'xl'];

const SERVICES = [
  { name: 'Baño completo', desc: 'Shampoo, acondicionador, secado y cepillado', icon: 'bath', prices: { s: 40, m: 55, l: 70, xl: 90 } },
  { name: 'Baño + Corte', desc: 'Baño completo más corte a tu elección', icon: 'scissors', prices: { s: 65, m: 85, l: 105, xl: 135 } },
  { name: 'Corte solo', desc: 'Corte sin baño (requiere pelaje limpio)', icon: 'comb', prices: { s: 35, m: 45, l: 55, xl: 70 } },
  { name: 'Uñas', desc: 'Corte y lima de uñas', icon: 'nails', prices: { s: 15, m: 15, l: 15, xl: 15 } },
  { name: 'Limpieza de oídos', desc: 'Limpieza profunda con solución ótica', icon: 'ear', prices: { s: 15, m: 15, l: 15, xl: 15 } },
  { name: 'Deslanado / Desenredo', desc: 'Eliminación de pelo muerto o nudos', icon: 'deshed', prices: { s: 30, m: 45, l: 60, xl: 75 } },
  { name: 'Spa VIP', desc: 'Baño, corte, deslanado, uñas, oídos, colonia y bandana', icon: 'spa', prices: { s: 95, m: 120, l: 150, xl: 185 }, highlight: true },
];

const PACKAGES = [
  {
    name: 'Paquete Básico', icon: 'paw', color: '#1EB87A', bg: '#E0F7EF',
    includes: ['Baño completo', 'Uñas', 'Limpieza de oídos'],
    prices: { s: 60, m: 75, l: 95, xl: 120 },
    note: 'Ideal para mantenimiento mensual rápido',
  },
  {
    name: 'Paquete Estándar', icon: 'star', color: '#F58220', bg: '#FFF0E0',
    includes: ['Baño completo', 'Corte a elección', 'Uñas', 'Limpieza de oídos'],
    prices: { s: 75, m: 95, l: 120, xl: 150 },
    note: 'El más popular. Todo lo esencial en una visita',
    popular: true,
  },
  {
    name: 'Spa VIP', icon: 'gem', color: '#7C3AED', bg: '#F0EAFF',
    includes: ['Baño premium con aromaterapia', 'Corte profesional', 'Deslanado completo', 'Uñas + lima', 'Limpieza de oídos', 'Colonia + bandana de regalo'],
    prices: { s: 110, m: 135, l: 165, xl: 210 },
    note: 'La experiencia completa. Para una ocasión especial o mensual',
  },
];

const MEMBERSHIPS = [
  {
    name: 'Plan Esencial', icon: 'leaf', color: '#1EB87A',
    price_month: 59, price_year: 570,
    savings: 138,
    includes: ['1 baño completo al mes', 'Uñas incluidas', '10% dto en servicios adicionales', 'Recordatorios automáticos'],
    cta: 'El plan perfecto para mantenimiento básico constante',
  },
  {
    name: 'Plan Total', icon: 'star', color: '#F58220',
    price_month: 99, price_year: 990,
    price_month_promo: 79, price_year_promo: 790,
    savings: 198, savings_promo: 158,
    promo: true,
    includes: ['1 baño + corte al mes', 'Uñas y oídos incluidos', 'Pickup & Delivery incluido (10 mi)', '15% dto en servicios adicionales', 'Prioridad en agenda', 'Foto profesional mensual'],
    cta: 'El más popular. Todo incluido + recogida y entrega.',
    popular: true,
  },
  {
    name: 'Plan VIP', icon: 'gem', color: '#7C3AED',
    price_month: 149, price_year: 1499,
    savings: 289,
    includes: ['Spa VIP mensual completo', 'Pickup & Delivery incluido (radio ilimitado)', '20% dto en todos los servicios', 'Agenda reservada siempre disponible', 'Reporte mensual de salud del pelaje', 'Regalo de cumpleaños para tu mascota'],
    cta: 'La experiencia premium completa con pickup y delivery incluido',
  },
];

const PAYMENT_METHODS = [
  { name: 'Zelle', icon: null, color: '#6D1ED4' },
  { name: 'Venmo', icon: null, color: '#3D95CE' },
  { name: 'CashApp', icon: null, color: '#00D632' },
  { name: 'Tarjeta de crédito', icon: 'card', color: '#2D2421' },
  { name: 'Efectivo', icon: 'cash', color: '#2D6A4F' },
];

// ── English translations for data strings (keyed by the exact Spanish text) ──────
// The Spanish values in the data arrays above double as logic keys throughout the
// file, so they must stay Spanish. We translate them only at display time via
// groomT(t, str), which wraps the lookup in t([spanish, english]).
const GROOM_EN = {
  // Sizes (display labels)
  'Pequeño\n(< 15 lbs)': 'Small\n(< 15 lbs)',
  'Mediano\n(15–40 lbs)': 'Medium\n(15–40 lbs)',
  'Grande\n(40–70 lbs)': 'Large\n(40–70 lbs)',
  'XL\n(70+ lbs)': 'XL\n(70+ lbs)',
  // Service names
  'Baño completo': 'Full Bath',
  'Baño + Corte': 'Bath + Haircut',
  'Corte solo': 'Haircut Only',
  'Uñas': 'Nail Trim',
  'Limpieza de oídos': 'Ear Cleaning',
  'Deslanado / Desenredo': 'De-shedding / De-matting',
  'Spa VIP': 'VIP Spa',
  // Service descriptions
  'Shampoo, acondicionador, secado y cepillado': 'Shampoo, conditioner, drying and brushing',
  'Baño completo más corte a tu elección': 'Full bath plus the haircut of your choice',
  'Corte sin baño (requiere pelaje limpio)': 'Haircut without a bath (clean coat required)',
  'Corte y lima de uñas': 'Nail trimming and filing',
  'Limpieza profunda con solución ótica': 'Deep cleaning with ear solution',
  'Eliminación de pelo muerto o nudos': 'Removal of loose hair and tangles',
  'Baño, corte, deslanado, uñas, oídos, colonia y bandana': 'Bath, haircut, de-shedding, nails, ears, cologne and bandana',
  // Package names
  'Paquete Básico': 'Basic Package',
  'Paquete Estándar': 'Standard Package',
  // Package includes
  'Corte a elección': 'Haircut of your choice',
  'Baño premium con aromaterapia': 'Premium bath with aromatherapy',
  'Corte profesional': 'Professional haircut',
  'Deslanado completo': 'Full de-shedding',
  'Uñas + lima': 'Nail trim + filing',
  'Colonia + bandana de regalo': 'Cologne + a gift bandana',
  // Package notes
  'Ideal para mantenimiento mensual rápido': 'Ideal for quick monthly upkeep',
  'El más popular. Todo lo esencial en una visita': 'The most popular. Everything essential in one visit',
  'La experiencia completa. Para una ocasión especial o mensual': 'The complete experience. For a special occasion or monthly care',
  // Membership names
  'Plan Esencial': 'Essential Plan',
  'Plan Total': 'Total Plan',
  'Plan VIP': 'VIP Plan',
  // Membership includes
  '1 baño completo al mes': '1 full bath per month',
  'Uñas incluidas': 'Nail trim included',
  '10% dto en servicios adicionales': '10% off additional services',
  'Recordatorios automáticos': 'Automatic reminders',
  '1 baño + corte al mes': '1 bath + haircut per month',
  'Uñas y oídos incluidos': 'Nails and ears included',
  'Pickup & Delivery incluido (10 mi)': 'Pickup & Delivery included (10 mi)',
  '15% dto en servicios adicionales': '15% off additional services',
  'Prioridad en agenda': 'Priority scheduling',
  'Foto profesional mensual': 'Monthly professional photo',
  'Spa VIP mensual completo': 'Full VIP Spa every month',
  'Pickup & Delivery incluido (radio ilimitado)': 'Pickup & Delivery included (unlimited radius)',
  '20% dto en todos los servicios': '20% off all services',
  'Agenda reservada siempre disponible': 'Reserved scheduling always available',
  'Reporte mensual de salud del pelaje': 'Monthly coat health report',
  'Regalo de cumpleaños para tu mascota': 'A birthday gift for your pet',
  // Membership CTAs
  'El plan perfecto para mantenimiento básico constante': 'The perfect plan for steady basic upkeep',
  'El más popular. Todo incluido + recogida y entrega.': 'The most popular. All-inclusive + pickup and delivery.',
  'La experiencia premium completa con pickup y delivery incluido': 'The complete premium experience with pickup and delivery included',
  // Payment methods
  'Tarjeta de crédito': 'Credit card',
  'Efectivo': 'Cash',
};
const groomT = (t, str) => t([str, GROOM_EN[str] || str]);

// ── Calendar booking ───────────────────────────────────────────────────────────
function BookingCalendar({ me, activeMembership, activePlan, firstName, onLogin }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);
  const [selectedServices, setSelectedServices] = useState(new Set());
  const [size, setSize] = useState('');
  const [petName, setPetName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [pickup, setPickup] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [step, setStep] = useState(1); // 1=services, 2=date, 3=confirm
  const [bookStatus, setBookStatus] = useState('idle'); // idle | sending | sent | error
  const [bookErr, setBookErr] = useState('');
  const [forOther, setForOther] = useState(false); // reservar para otra persona/perro
  const t = useT();

  // ── Datos del cliente logueado ──
  const pets = (me && me.pets) || [];
  const myName  = (me && me.client) ? [me.client.first_name, me.client.last_name].filter(Boolean).join(' ').trim() : '';
  const myPhone = (me && me.client) ? (me.client.phone || me.client.phone_number || me.client.mobile || '') : '';
  const planQualifies = !!(activePlan && /total|vip/i.test((activeMembership && activeMembership.plan) || activePlan.name || ''));
  const sizeFromWeight = (lb) => { const w = +lb || 0; if (!w) return ''; if (w < 15) return 'Pequeño'; if (w < 40) return 'Mediano'; if (w < 70) return 'Grande'; return 'XL'; };

  // ── Reglas de servicios según la membresía activa ──
  // included: servicios cubiertos por el plan (precio $0). primary: el servicio mensual incluido (preseleccionado).
  // discount: % de descuento sobre servicios extra.
  const PLAN_RULES = {
    'Plan Esencial': { primary: 'Baño completo', included: ['Baño completo', 'Uñas'], discount: 0.10 },
    'Plan Total':    { primary: 'Baño + Corte', included: ['Baño + Corte', 'Uñas', 'Limpieza de oídos'], discount: 0.15 },
    'Plan VIP':      { primary: 'Spa VIP', included: ['Spa VIP', 'Baño completo', 'Baño + Corte', 'Corte solo', 'Uñas', 'Limpieza de oídos', 'Deslanado / Desenredo'], discount: 0.20 },
  };
  const planRule = activePlan ? PLAN_RULES[activePlan.name] : null;
  const includedSet = new Set(planRule ? planRule.included : []);
  const isIncluded = (name) => includedSet.has(name);
  const memberDiscount = planRule ? planRule.discount : 0;
  const priceFor = (sv, sk) => {
    const base = sk ? sv.prices[sk] : sv.prices['s'];
    if (isIncluded(sv.name)) return 0;
    return planRule ? Math.round(base * (1 - memberDiscount)) : base;
  };

  // Prefill nombre/teléfono + miembro al iniciar sesión
  useEffect(() => {
    if (!me || !me.client) return;
    const c = me.client;
    const full = [c.first_name, c.last_name].filter(Boolean).join(' ').trim();
    if (full) setOwnerName(prev => prev || full);
    const ph = c.phone || c.phone_number || c.mobile || '';
    if (ph) setPhone(prev => prev || ph);
    if (planQualifies) setIsMember(true);
    if (planRule && planRule.primary) setSelectedServices(prev => prev.size ? prev : new Set([planRule.primary]));
    if (pets.length && !petName) {
      const p = pets[0];
      setPetName(p.name || '');
      const s = sizeFromWeight(p.weight_lbs); if (s) setSize(prev => prev || s);
    }
  }, [me]); // eslint-disable-line

  const pickPet = (p) => {
    setPetName(p.name || '');
    const s = sizeFromWeight(p.weight_lbs); if (s) setSize(s);
  };

  const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const DAYS_OF_WEEK = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  const TIMES = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];
  // Localized labels for on-screen display (the Spanish arrays above stay for the backend payload / WhatsApp message)
  const MONTHS_DISP = [t(['Enero','January']),t(['Febrero','February']),t(['Marzo','March']),t(['Abril','April']),t(['Mayo','May']),t(['Junio','June']),t(['Julio','July']),t(['Agosto','August']),t(['Septiembre','September']),t(['Octubre','October']),t(['Noviembre','November']),t(['Diciembre','December'])];
  const MONTHS_ABBR_DISP = [t(['Ene','Jan']),t(['Feb','Feb']),t(['Mar','Mar']),t(['Abr','Apr']),t(['May','May']),t(['Jun','Jun']),t(['Jul','Jul']),t(['Ago','Aug']),t(['Sep','Sep']),t(['Oct','Oct']),t(['Nov','Nov']),t(['Dic','Dec'])];
  const DAYS_OF_WEEK_DISP = [t(['Dom','Sun']),t(['Lun','Mon']),t(['Mar','Tue']),t(['Mié','Wed']),t(['Jue','Thu']),t(['Vie','Fri']),t(['Sáb','Sat'])];

  // Antelación mínima para reservar: 6 horas. Un slot solo se ofrece si cae a >= ahora + 6h.
  const LEAD_MS = 6 * 60 * 60 * 1000;
  const cutoff = new Date(today.getTime() + LEAD_MS);
  const slotDate = (d, label) => {
    const m = /(\d+):(\d+)\s*(AM|PM)/i.exec(label);
    if (!m) return null;
    let h = parseInt(m[1], 10) % 12; if (/pm/i.test(m[3])) h += 12;
    return new Date(year, month, d, h, parseInt(m[2], 10), 0, 0);
  };
  const availableTimes = (d) => TIMES.filter(t => { const s = slotDate(d, t); return s && s >= cutoff; });

  const sizeKey = { 'Pequeño': 's', 'Mediano': 'm', 'Grande': 'l', 'XL': 'xl' }[size] || 's';

  const SPA_VIP = 'Spa VIP';
  const toggleService = (name) => {
    setSelectedServices(prev => {
      const n = new Set(prev);
      if (name === SPA_VIP) {
        // Spa VIP ya lo incluye todo: seleccionarlo limpia el resto
        if (n.has(SPA_VIP)) n.delete(SPA_VIP);
        else { n.clear(); n.add(SPA_VIP); }
        return n;
      }
      // elegir cualquier otro servicio deselecciona Spa VIP
      n.delete(SPA_VIP);
      n.has(name) ? n.delete(name) : n.add(name);
      return n;
    });
  };

  const total = useMemo(() => {
    const base = [...selectedServices].reduce((sum, name) => {
      const sv = SERVICES.find(s => s.name === name);
      return sum + (sv ? priceFor(sv, sizeKey) : 0);
    }, 0);
    const pickupCost = pickup && !isMember ? 20 : 0;
    return base + pickupCost;
  }, [selectedServices, sizeKey, pickup, isMember, planRule]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const isAvailable = (d) => {
    const date = new Date(year, month, d);
    if (date.getDay() === 0) return false; // domingo cerrado
    return availableTimes(d).length > 0; // debe quedar al menos un horario con 6h de antelación
  };

  const canStep2 = selectedServices.size > 0 && size;
  const canConfirm = day && time && petName && ownerName && phone;

  const buildWhatsApp = () => {
    const dateStr = `${day} ${t(['de','of'])} ${MONTHS_DISP[month]}, ${year}`;
    const svList = [...selectedServices].map(n => isIncluded(n) ? `${groomT(t, n)} ${t(['(incluido en plan)','(included in plan)'])}` : groomT(t, n)).join(', ');
    const planLine = activeMembership ? `\n🏅 ${t(['Membresía','Membership'])}: ${activeMembership.plan}` : '';
    const msg = encodeURIComponent(`${t(['Hola! Quiero agendar grooming:','Hi! I would like to book a grooming appointment:'])}
${planLine}
🐾 ${t(['Mascota','Pet'])}: ${petName}
📐 ${t(['Tamaño','Size'])}: ${size}
✂️ ${t(['Servicios','Services'])}: ${svList}
${pickup ? (isMember ? '🚐 Pickup & Delivery: ' + t(['Incluido (miembro)','Included (member)']) : '🚐 Pickup & Delivery: ' + t(['Sí (+$20)','Yes (+$20)'])) : '📍 ' + t(['Llevo mi mascota al local','I will bring my pet to the salon'])}
💰 ${t(['Total','Total'])}: $${total}
📅 ${t(['Fecha','Date'])}: ${dateStr} ${t(['a las','at'])} ${time}
👤 ${t(['Nombre','Name'])}: ${ownerName}
📞 ${t(['Teléfono','Phone'])}: ${phone}${promoCode ? '\n🎫 ' + t(['Código promo','Promo code']) + ': ' + promoCode : ''}${notes ? '\n📝 ' + t(['Notas','Notes']) + ': ' + notes : ''}`)
    return `https://wa.me/19294287300?text=${msg}`;
  };

  const submitBooking = async () => {
    if (!canConfirm || bookStatus === 'sending') return;
    setBookStatus('sending'); setBookErr('');
    const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4';
    const payload = {
      petName, ownerName, phone, size,
      services: [...selectedServices].join(', '),
      dateStr: `${day} de ${MONTHS[month]}, ${year}`, time,
      notes, promoCode, total,
      plan: activeMembership ? activeMembership.plan : '',
      pickup, isMember,
      email: (me && me.email) || '',
    };
    try {
      const r = await fetch('https://oqqwmcplljirbreowrll.supabase.co/functions/v1/grooming_book', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'apikey': ANON_KEY, 'Authorization': 'Bearer ' + ANON_KEY },
        body: JSON.stringify(payload),
      });
      const d = await r.json();
      if (d && d.ok) setBookStatus('sent');
      else { setBookErr((d && d.error) || t(['No se pudo enviar la solicitud','We could not send your request'])); setBookStatus('error'); }
    } catch(e) { setBookErr(t(['Error de red, intenta de nuevo','Network error, please try again'])); setBookStatus('error'); }
  };

  const resetBooking = () => {
    setBookStatus('idle'); setStep(1);
    setSelectedServices(new Set()); setDay(null); setTime(null);
    setNotes(''); setPromoCode('');
  };

  const StepDots = () => (
    <div style={{ display: 'flex', marginBottom: 24, gap: 0 }}>
      {[['1',t(['Servicios','Services'])],['2',t(['Fecha','Date'])],['3',t(['Confirmar','Confirm'])]].map(([n, label], i) => {
        const active = step === i+1, done = step > i+1;
        return (
          <div key={n} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, cursor: done ? 'pointer':'default' }} onClick={() => done && setStep(i+1)}>
            <div style={{ width:30, height:30, borderRadius:'50%', background: active ? 'var(--orange)' : done ? '#1EB87A' : 'var(--bg)', color: active||done ? '#fff':'var(--ink-2)', display:'grid', placeItems:'center', fontSize:12, fontWeight:800, transition:'all .2s' }}>{done?'✓':n}</div>
            <span style={{ fontSize:10, fontWeight: active?700:500, color: active?'var(--orange)':'var(--ink-2)' }}>{label}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{ background: 'var(--paper)', borderRadius: 24, padding: '24px', boxShadow: '0 4px 32px -8px rgba(45,36,33,0.12)' }}>
      {/* Identidad / login rápido — sin salir del formulario */}
      {me ? (
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:12, background:'rgba(245,130,32,0.07)', border:'1px solid rgba(245,130,32,0.22)', marginBottom:16 }}>
          <span style={{ width:30, height:30, borderRadius:'50%', background:'var(--orange)', color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, flexShrink:0 }}>{(firstName||'?')[0]}</span>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:13, fontWeight:700, color:'var(--ink)' }}>{t(['Reservando como','Booking as'])} {firstName || t(['cliente','client'])}</div>
            <div style={{ fontSize:11, color:'var(--ink-2)', display:'flex', alignItems:'center', gap:5 }}>{activePlan ? <><Icon name={activePlan.icon} size={13} stroke={2}/><span>{activeMembership.plan}</span></> : <span>{t(['Sin plan activo','No active plan'])}</span>}{pets.length ? <span>{` · ${pets.length} ${pets.length===1?t(['mascota','pet']):t(['mascotas','pets'])}`}</span> : null}</div>
          </div>
          {planQualifies && <span style={{ fontSize:10.5, fontWeight:800, color:'#1EB87A', background:'rgba(30,184,122,0.1)', borderRadius:999, padding:'4px 10px', whiteSpace:'nowrap' }}>✓ {t(['Pickup gratis','Free pickup'])}</span>}
        </div>
      ) : (
        <button onClick={() => onLogin && onLogin()} style={{ display:'flex', alignItems:'center', gap:10, width:'100%', textAlign:'left', padding:'10px 12px', borderRadius:12, background:'var(--bg)', border:'1px dashed var(--line)', cursor:'pointer', fontFamily:'inherit', marginBottom:16 }}>
          <span style={{ flexShrink:0, color:'var(--orange)', display:'inline-flex' }}><Icon name="user" size={20}/></span>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, fontWeight:700, color:'var(--ink)' }}>{t(['¿Ya eres cliente? Entra rápido','Already a client? Sign in quickly'])}</div>
            <div style={{ fontSize:11, color:'var(--ink-2)' }}>{t(['Autocompletamos tus datos y verás los beneficios de tu plan','We will fill in your details and show your plan benefits'])}</div>
          </div>
          <span style={{ fontSize:12, fontWeight:800, color:'var(--orange)', whiteSpace:'nowrap' }}>{t(['Entrar','Sign in'])} →</span>
        </button>
      )}

      <StepDots />

      {/* Step 1: Multi-service selection */}
      {step === 1 && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{t(['Tamaño de tu mascota','Your pet’s size'])}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
              {[['Pequeño',t(['Pequeño','Small']),'<15lb'],['Mediano',t(['Mediano','Medium']),'15-40'],['Grande',t(['Grande','Large']),'40-70'],['XL','XL','70+']].map(([s,sLabel,sub]) => (
                <button key={s} onClick={() => setSize(s)} style={{ padding:'8px 4px', borderRadius:10, border:`2px solid ${size===s?'var(--orange)':'var(--line)'}`, background: size===s?'rgba(245,130,32,0.07)':'var(--bg)', cursor:'pointer', fontFamily:'inherit', transition:'all .15s', textAlign:'center' }}>
                  <div style={{ fontSize:12, fontWeight:700, color:'var(--ink)' }}>{sLabel}</div>
                  <div style={{ fontSize:10, color:'var(--ink-soft)' }}>{sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginBottom: planRule ? 4 : 8 }}>
            {firstName ? `${t(['Elige tus servicios','Choose your services'])}, ${firstName}` : t(['Selecciona uno o más servicios','Select one or more services'])}
          </div>
          {planRule && (
            <div style={{ fontSize: 11.5, color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: 10, background:'rgba(30,184,122,0.08)', border:'1px solid rgba(30,184,122,0.25)', borderRadius:10, padding:'8px 11px' }}>
              {t(['Tu','Your'])} <strong>{activeMembership.plan}</strong> {t(['ya incluye','already includes'])} <strong>{planRule.included.map(n => groomT(t, n)).join(', ')}</strong>.
              {memberDiscount ? ` ${t(['Los servicios extra llevan','Extra services get'])} −${Math.round(memberDiscount*100)}% ${t(['automático.','automatically.'])}` : ''}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 14 }}>
            {SERVICES.map(sv => {
              const sel = selectedServices.has(sv.name);
              const included = isIncluded(sv.name);
              const baseP = size ? sv.prices[sizeKey] : sv.prices['s'];
              const memP = priceFor(sv, size ? sizeKey : 's');
              const discounted = planRule && !included && memP < baseP;
              const isFrom = !size;
              return (
                <button key={sv.name} onClick={() => toggleService(sv.name)} style={{ padding:'12px 10px', borderRadius:14, border:`2px solid ${sel?'var(--orange)':included?'rgba(30,184,122,0.5)':'var(--line)'}`, background: sel?'rgba(245,130,32,0.07)':included?'rgba(30,184,122,0.05)':'var(--bg)', cursor:'pointer', fontFamily:'inherit', transition:'all .15s', textAlign:'left', position:'relative' }}>
                  {sel && <span style={{ position:'absolute', top:8, right:8, width:18, height:18, borderRadius:'50%', background:'var(--orange)', color:'#fff', fontSize:10, fontWeight:800, display:'grid', placeItems:'center' }}>✓</span>}
                  <div style={{ marginBottom:5, color: sel?'var(--orange)':included?'#1EB87A':'var(--ink)' }}><Icon name={sv.icon} size={22}/></div>
                  <div style={{ fontSize:12.5, fontWeight:700, color:'var(--ink)', lineHeight:1.2, marginBottom:3 }}>{groomT(t, sv.name)}</div>
                  {included ? (
                    <div style={{ display:'inline-block', fontSize:9, fontWeight:800, color:'#1EB87A', background:'rgba(30,184,122,0.14)', borderRadius:999, padding:'1px 7px', marginBottom:3, letterSpacing:'0.03em' }}>{t(['INCLUIDO EN TU PLAN','INCLUDED IN YOUR PLAN'])}</div>
                  ) : sv.highlight && <div style={{ display:'inline-block', fontSize:9, fontWeight:800, color:'var(--orange)', background:'rgba(245,130,32,0.12)', borderRadius:999, padding:'1px 7px', marginBottom:3, letterSpacing:'0.03em' }}>{t(['TODO INCLUIDO','ALL INCLUDED'])}</div>}
                  {included ? (
                    <div style={{ fontSize:13, fontWeight:800, color:'#1EB87A' }}>{t(['Incluido','Included'])}</div>
                  ) : discounted ? (
                    <div style={{ fontSize:13, fontWeight:800, color: sel?'var(--orange)':'var(--ink-2)' }}>
                      <span style={{ textDecoration:'line-through', color:'var(--ink-soft)', fontWeight:600, marginRight:5 }}>${baseP}</span>{isFrom?t(['desde ','from ']):''}${memP}
                    </div>
                  ) : (
                    <div style={{ fontSize:13, fontWeight:800, color: sel?'var(--orange)':'var(--ink-2)' }}>{isFrom?t(['desde ','from ']):''}${memP}</div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Pickup & Delivery */}
          <div style={{ borderRadius:14, border:`2px solid ${pickup?'var(--orange)':'var(--line)'}`, background: pickup?'rgba(245,130,32,0.06)':'var(--bg)', marginBottom:14, overflow:'hidden' }}>
            <button onClick={() => setPickup(p => !p)} style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ color:'var(--orange)', display:'inline-flex' }}><Icon name="van" size={20}/></span>
                <div style={{ textAlign:'left' }}>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--ink)' }}>Pickup & Delivery</div>
                  <div style={{ fontSize:11, color:'var(--ink-2)' }}>{t(['Recogemos y entregamos en tu casa','We pick up and drop off at your home'])}</div>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                {!isMember && <span style={{ fontSize:12, fontWeight:700, color: pickup?'var(--orange)':'var(--ink-2)' }}>+$20</span>}
                {isMember && <span style={{ fontSize:11, fontWeight:700, color:'#1EB87A' }}>✓ {t(['Gratis','Free'])}</span>}
                <div style={{ width:36, height:20, borderRadius:10, background: pickup?'var(--orange)':'var(--line)', position:'relative', transition:'background .2s', flexShrink:0 }}>
                  <span style={{ position:'absolute', top:2, left: pickup?16:2, width:16, height:16, borderRadius:'50%', background:'#fff', transition:'left .2s', boxShadow:'0 1px 3px rgba(0,0,0,0.3)', display:'block' }}/>
                </div>
              </div>
            </button>
            {pickup && (
              <div style={{ padding:'0 14px 12px', borderTop:'1px solid var(--line)' }}>
                {isMember ? (
                  <div style={{ fontSize:12, color:'#1EB87A', fontWeight:600 }}>✓ {t(['Pickup & Delivery gratis con tu membresía (radio 10 millas)','Free Pickup & Delivery with your membership (10-mile radius)'])}</div>
                ) : (
                  <div style={{ fontSize:12, color:'var(--ink-2)', lineHeight:1.55 }}>
                    <strong>{t(['Consejo:','Tip:'])}</strong> {t(['Con el Plan Total o VIP, el pickup & delivery es gratis en un radio de 10 millas. La disponibilidad de recogida se verifica al confirmar por WhatsApp.','With the Total or VIP Plan, pickup & delivery is free within a 10-mile radius. Pickup availability is confirmed when you finalize over WhatsApp.'])}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Running total */}
          <div style={{ background: selectedServices.size > 0 ? 'rgba(245,130,32,0.08)' : 'var(--bg)', borderRadius:14, padding:'12px 16px', marginBottom:14, display:'flex', justifyContent:'space-between', alignItems:'center', border:`1.5px solid ${selectedServices.size>0?'rgba(245,130,32,0.3)':'var(--line)'}`, transition:'all .2s' }}>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'var(--ink-2)', textTransform:'uppercase', letterSpacing:'0.04em' }}>{t(['Total estimado','Estimated total'])}</div>
              <div style={{ fontSize:10, color:'var(--ink-soft)', marginTop:2 }}>
                {selectedServices.size > 0 ? [...selectedServices].map(n => groomT(t, n)).join(' + ') : t(['Selecciona servicios arriba','Select services above'])}
              </div>
            </div>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:26, fontWeight:800, color: selectedServices.size>0?'var(--orange)':'var(--ink-soft)' }}>
              {selectedServices.size > 0 ? `$${total}` : '—'}
            </div>
          </div>

          <button onClick={() => canStep2 && setStep(2)} disabled={!canStep2} style={{ width:'100%', padding:'14px', borderRadius:14, border:'none', background: canStep2?'var(--orange)':'var(--line)', color: canStep2?'#fff':'var(--ink-2)', fontFamily:'inherit', fontSize:14, fontWeight:700, cursor: canStep2?'pointer':'default', transition:'all .2s' }}>
            {t(['Elegir fecha y hora','Choose date and time'])} →
          </button>
          {!size && selectedServices.size > 0 && <p style={{ fontSize:11, color:'var(--orange)', textAlign:'center', margin:'8px 0 0' }}>{t(['Selecciona el tamaño para ver precios','Select a size to see prices'])}</p>}
        </div>
      )}

      {/* Step 2: Date */}
      {step === 2 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <button onClick={() => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); setDay(null); }} style={{ background: 'var(--bg)', border: 'none', cursor: 'pointer', borderRadius: 8, padding: '6px 10px', fontSize: 16, color: 'var(--ink-2)' }}>‹</button>
            <div style={{ flex: 1, textAlign: 'center', fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{MONTHS_DISP[month]} {year}</div>
            <button onClick={() => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); setDay(null); }} style={{ background: 'var(--bg)', border: 'none', cursor: 'pointer', borderRadius: 8, padding: '6px 10px', fontSize: 16, color: 'var(--ink-2)' }}>›</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 16 }}>
            {DAYS_OF_WEEK_DISP.map((d, di) => <div key={di} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: 'var(--ink-soft)', padding: '4px 0' }}>{d}</div>)}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={'e' + i} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1;
              const avail = isAvailable(d);
              const sel = day === d;
              return (
                <button key={d} onClick={() => avail && setDay(d)} disabled={!avail} style={{ aspectRatio: '1', borderRadius: 10, border: 'none', background: sel ? 'var(--orange)' : avail ? 'var(--bg)' : 'transparent', color: sel ? '#fff' : avail ? 'var(--ink)' : 'var(--ink-soft)', fontSize: 13, fontWeight: sel ? 700 : 400, cursor: avail ? 'pointer' : 'default', opacity: avail ? 1 : 0.35, transition: 'all .15s' }}>{d}</button>
              );
            })}
          </div>
          {day && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{t(['Hora disponible','Available time'])}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginBottom: 16 }}>
                {availableTimes(day).map(t => (
                  <button key={t} onClick={() => setTime(t)} style={{ padding: '8px 4px', borderRadius: 10, border: `2px solid ${time === t ? 'var(--orange)' : 'var(--line)'}`, background: time === t ? 'rgba(245,130,32,0.07)' : 'var(--bg)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: time === t ? 700 : 500, color: 'var(--ink)', transition: 'all .15s' }}>{t}</button>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, padding: '13px', borderRadius: 14, border: '1.5px solid var(--line)', background: 'none', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: 'var(--ink-2)', cursor: 'pointer' }}>← {t(['Atrás','Back'])}</button>
            <button onClick={() => day && time && setStep(3)} disabled={!day || !time} style={{ flex: 2, padding: '13px', borderRadius: 14, border: 'none', background: day && time ? 'var(--orange)' : 'var(--line)', color: day && time ? '#fff' : 'var(--ink-2)', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: day && time ? 'pointer' : 'default', transition: 'all .2s' }}>{t(['Continuar','Continue'])} →</button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm (formulario) */}
      {step === 3 && bookStatus !== 'sent' && (
        <div>
          <h3 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: '0 0 4px' }}>{t(['Confirmar cita','Confirm appointment'])}</h3>
          <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '12px 16px', marginBottom: 18, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--ink)' }}>{[...selectedServices].map(n => groomT(t, n)).join(' + ')}</strong> · {size}<br />
            <span style={{ display:'inline-flex', verticalAlign:'-3px', marginRight:5, color:'var(--orange)' }}><Icon name="calendar" size={15}/></span>{day} {t(['de','of'])} {MONTHS_ABBR_DISP[month]}, {year} {t(['a las','at'])} {time}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            {/* Mascota — selector si hay sesión con mascotas, si no texto libre */}
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 4 }}>{t(['Nombre de tu mascota','Your pet’s name'])} <span style={{ color:'var(--orange)' }}>*</span></div>
              {pets.length > 0 ? (
                <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                  {pets.map((p, i) => {
                    const sel = petName === p.name;
                    return (
                      <button key={i} onClick={() => pickPet(p)} style={{ padding:'8px 14px', borderRadius:999, border:`2px solid ${sel?'var(--orange)':'var(--line)'}`, background: sel?'rgba(245,130,32,0.08)':'var(--bg)', cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:700, color: sel?'var(--orange)':'var(--ink)' }}>
                        {sel ? '✓ ' : ''}{p.name}{p.weight_lbs ? ` · ${p.weight_lbs}lb` : ''}
                      </button>
                    );
                  })}
                  <input value={pets.some(p => p.name === petName) ? '' : petName} onChange={e => setPetName(e.target.value)} placeholder={t(['Otra mascota...','Another pet...'])} style={{ flex:'1 1 120px', minWidth:120, padding:'8px 14px', borderRadius:999, border:'1.5px solid var(--line)', background:'var(--bg)', fontFamily:'inherit', fontSize:13, color:'var(--ink)', outline:'none' }}/>
                </div>
              ) : (
                <input value={petName} onChange={e => setPetName(e.target.value)} placeholder="Max, Luna, Toby..." style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid var(--line)', background: 'var(--bg)', fontFamily: 'inherit', fontSize: 14, color: 'var(--ink)', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = 'var(--orange)'} onBlur={e => e.target.style.borderColor = 'var(--line)'} />
              )}
            </div>
            {(me && me.client && ownerName && phone && !forOther) ? (
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:10, padding:'11px 14px', borderRadius:10, border:'1px solid var(--line)', background:'var(--paper)' }}>
                  <span style={{ flexShrink:0, color:'var(--orange)', display:'inline-flex' }}><Icon name="user" size={18}/></span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:'var(--ink)' }}>{ownerName}</div>
                    <div style={{ fontSize:12, color:'var(--ink-2)' }}>{phone}</div>
                  </div>
                  <span style={{ fontSize:10.5, fontWeight:700, color:'#1EB87A' }}>✓ {t(['Tus datos','Your details'])}</span>
                </div>
                <button onClick={() => { setForOther(true); setOwnerName(''); setPhone(''); setPetName(''); }}
                  style={{ marginTop:7, background:'none', border:'none', padding:0, color:'var(--orange)', fontFamily:'inherit', fontSize:12, fontWeight:700, cursor:'pointer' }}>
                  {t(['Reservar para otra persona','Book for someone else'])} →
                </button>
              </div>
            ) : (
              [...((me && me.client && forOther) ? [['__header__']] : []),
               [t(['Tu nombre','Your name']), ownerName, setOwnerName, t(['Nombre completo','Full name'])],
               [t(['Teléfono','Phone']), phone, setPhone, '+1 (305) 000-0000'],
              ].map(([label, val, setter, ph]) => label === '__header__' ? (
                <div key="__h" style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:11.5, fontWeight:700, color:'var(--ink-2)' }}>{t(['Datos de quien recibe el servicio','Details of who receives the service'])}</span>
                  <button onClick={() => { setForOther(false); setOwnerName(myName); setPhone(myPhone); }}
                    style={{ background:'none', border:'none', padding:0, color:'var(--orange)', fontFamily:'inherit', fontSize:11.5, fontWeight:700, cursor:'pointer' }}>← {t(['Usar mis datos','Use my details'])}</button>
                </div>
              ) : (
                <div key={label}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 4 }}>{label} <span style={{ color:'var(--orange)' }}>*</span></div>
                  <input value={val} onChange={e => setter(e.target.value)} placeholder={ph} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid var(--line)', background: 'var(--bg)', fontFamily: 'inherit', fontSize: 14, color: 'var(--ink)', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                    onBlur={e => e.target.style.borderColor = 'var(--line)'} />
                </div>
              ))
            )}
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 4 }}>{t(['Notas adicionales (opcional)','Additional notes (optional)'])}</div>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder={t(['Raza, temperamento, algo que debamos saber...','Breed, temperament, anything we should know...'])} rows={2} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid var(--line)', background: 'var(--bg)', fontFamily: 'inherit', fontSize: 14, color: 'var(--ink)', outline: 'none', resize: 'vertical' }}
                onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                onBlur={e => e.target.style.borderColor = 'var(--line)'} />
            </div>
            {!activeMembership && (
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 4 }}>{t(['Código de promoción (opcional)','Promo code (optional)'])}</div>
              <input value={promoCode} onChange={e => setPromoCode(e.target.value.toUpperCase())} placeholder={t(['Ej. APERTURA','e.g. APERTURA'])} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: `1.5px solid ${promoCode ? 'var(--orange)' : 'var(--line)'}`, background: promoCode ? 'rgba(245,130,32,0.06)' : 'var(--bg)', fontFamily: 'inherit', fontSize: 14, color: 'var(--ink)', outline: 'none', fontWeight: promoCode ? 700 : 400, letterSpacing: promoCode ? '0.08em' : 0 }}/>
              {promoCode === 'APERTURA' && <div style={{ fontSize:11, color:'#1EB87A', fontWeight:700, marginTop:4 }}>✓ {t(['¡Código de apertura aplicado! Primer baño + corte gratis en tu visita.','Opening code applied! Your first bath + haircut is free on your visit.'])}</div>}
            </div>
            )}
            {planQualifies ? (
              <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderRadius:10, border:'1.5px solid #1EB87A', background:'rgba(30,184,122,0.08)' }}>
                <span style={{ flexShrink:0, color:'#1EB87A', display:'inline-flex' }}><Icon name={activePlan ? activePlan.icon : 'trophy'} size={20}/></span>
                <div>
                  <div style={{ fontSize:12.5, fontWeight:700, color:'var(--ink)' }}>{t(['Miembro','Member'])} {activeMembership.plan} — {t(['verificado','verified'])}</div>
                  <div style={{ fontSize:11, color:'#1EB87A', fontWeight:600 }}>{t(['Pickup & Delivery gratis + descuentos aplicados','Free Pickup & Delivery + discounts applied'])}</div>
                </div>
              </div>
            ) : (
              <button onClick={() => setIsMember(m => !m)} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderRadius:10, border:`1.5px solid ${isMember?'#1EB87A':'var(--line)'}`, background: isMember?'rgba(30,184,122,0.08)':'var(--bg)', cursor:'pointer', fontFamily:'inherit', width:'100%', textAlign:'left' }}>
                <div style={{ width:20, height:20, borderRadius:4, border:`2px solid ${isMember?'#1EB87A':'var(--line)'}`, background: isMember?'#1EB87A':'transparent', display:'grid', placeItems:'center', flexShrink:0, transition:'all .15s' }}>{isMember && <span style={{ color:'#fff', fontSize:12, fontWeight:800 }}>✓</span>}</div>
                <div>
                  <div style={{ fontSize:12.5, fontWeight:700, color:'var(--ink)' }}>{t(['Soy miembro Plan Total o VIP','I am a Total or VIP Plan member'])}</div>
                  <div style={{ fontSize:11, color:'#1EB87A', fontWeight:600 }}>{t(['Pickup & Delivery gratis en radio de 10 millas','Free Pickup & Delivery within a 10-mile radius'])}</div>
                </div>
              </button>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setStep(2)} style={{ flex: 1, padding: '13px', borderRadius: 14, border: '1.5px solid var(--line)', background: 'none', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: 'var(--ink-2)', cursor: 'pointer' }}>← {t(['Atrás','Back'])}</button>
            <button onClick={submitBooking} disabled={!canConfirm || bookStatus === 'sending'} style={{ flex: 2, padding: '13px', borderRadius: 14, border: 'none', background: canConfirm ? 'var(--orange)' : 'var(--line)', color: canConfirm ? '#fff' : 'var(--ink-2)', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: canConfirm && bookStatus !== 'sending' ? 'pointer' : 'default', transition: 'all .2s' }}>
              {bookStatus === 'sending' ? t(['Enviando…','Sending…']) : t(['Confirmar cita','Confirm appointment'])}
            </button>
          </div>
          {bookStatus === 'error' && <p style={{ fontSize:12.5, color:'#C0392B', textAlign:'center', margin:'10px 0 0' }}>{bookErr}</p>}
          {!canConfirm && <p style={{ fontSize:11, color:'var(--orange)', textAlign:'center', margin:'8px 0 0' }}>{t(['Completa mascota, nombre y teléfono para confirmar','Complete pet, name and phone to confirm'])}</p>}
          <p style={{ fontSize: 10.5, color: 'var(--ink-soft)', textAlign: 'center', margin: '12px 0 0' }}>{t(['Recibirás confirmación en menos de 2 horas en horario laboral','You will receive confirmation within 2 hours during business hours'])}</p>
        </div>
      )}

      {/* Step 3: Cita confirmada (reemplaza el formulario) */}
      {step === 3 && bookStatus === 'sent' && (
        <div className="bs-fade" style={{ textAlign:'center', padding:'14px 6px 8px' }}>
          <div style={{ display:'flex', justifyContent:'center', marginBottom:12 }}>
            <div style={{ width:64, height:64, borderRadius:'50%', background:'rgba(30,184,122,0.12)', display:'grid', placeItems:'center', color:'#1EB87A' }}><Icon name="check" size={34}/></div>
          </div>
          <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:22, fontWeight:800, color:'var(--ink)', margin:'0 0 6px' }}>{t(['¡Cita confirmada!','Appointment confirmed!'])}</h3>
          <p style={{ fontSize:13.5, color:'var(--ink-2)', lineHeight:1.55, margin:'0 0 16px' }}>{t(['Recibimos tu solicitud para','We received your request for'])} <strong>{petName}</strong>. {t(['Te confirmamos disponibilidad en menos de 2 horas en horario laboral.','We will confirm availability within 2 hours during business hours.'])}</p>
          <div style={{ textAlign:'left', background:'var(--paper)', borderRadius:14, padding:'14px 16px', marginBottom:16, fontSize:13, color:'var(--ink-2)', lineHeight:1.8 }}>
            <div><strong style={{ color:'var(--ink)' }}>{[...selectedServices].map(n => groomT(t, n)).join(' + ')}</strong> · {size}</div>
            <div><span style={{ display:'inline-flex', verticalAlign:'-3px', marginRight:5, color:'var(--orange)' }}><Icon name="calendar" size={15}/></span>{day} {t(['de','of'])} {MONTHS_ABBR_DISP[month]}, {year} · {time}</div>
            <div>{t(['Mascota','Pet'])}: <strong style={{ color:'var(--ink)' }}>{petName}</strong></div>
            <div>{t(['A nombre de','Under the name of'])}: {ownerName} · {phone}</div>
            {total > 0 && <div>{t(['Total estimado','Estimated total'])}: <strong style={{ color:'var(--orange)' }}>${total}</strong></div>}
          </div>
          {(me && me.email)
            ? <p style={{ fontSize:12.5, color:'#1EB87A', fontWeight:600, margin:'0 0 16px', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}><Icon name="mail" size={15}/> {t(['Enviamos la confirmación a','We sent the confirmation to'])} {me.email}</p>
            : <p style={{ fontSize:12, color:'var(--ink-soft)', margin:'0 0 16px' }}>{t(['Te contactaremos al','We will contact you at'])} {phone} {t(['para confirmar.','to confirm.'])}</p>}
          <a href={buildWhatsApp()} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, padding:'13px 24px', borderRadius:14, background:'#25D366', color:'#fff', fontFamily:'inherit', fontSize:14, fontWeight:700, textDecoration:'none', marginBottom:10 }}>
            <Icon name="chat" size={18} color="#fff"/> {t(['Enviar también por WhatsApp','Also send via WhatsApp'])}
          </a>
          <div><button onClick={resetBooking} className="bs-btn" style={{ background:'none', border:'none', color:'var(--ink-2)', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit', textDecoration:'underline' }}>{t(['Agendar otra cita','Book another appointment'])}</button></div>
        </div>
      )}
    </div>
  );
}

// ── Opening Banner ─────────────────────────────────────────────
function OpeningBanner() {
  const [open, setOpen] = useState(true);
  const [claimed, setClaimed] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const t = useT();
  if (!open) return null;

  async function claim(e) {
    e.preventDefault();
    if (!name || !phone) return;
    setLoading(true);
    try {
      const sb = window._groomSb;
      if (sb) await sb.from('website_leads').insert({ gclid: (function(){try{window.bpLead&&window.bpLead()}catch(e){}return (typeof window!=='undefined'&&window.bpGclid?window.bpGclid():null)})(), full_name: name, phone, message: 'OFERTA APERTURA - Baño + Corte GRATIS. Cód: APERTURA', source: 'grooming_apertura' });
    } catch(err) {} finally { setLoading(false); }
    setClaimed(true);
    window._groomPromo = 'APERTURA';
  }

  return (
    <div style={{ background:'linear-gradient(135deg,#FF5520 0%,#FF8C00 45%,#FFB800 100%)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'rgba(255,255,255,0.06)', top:-200, right:-100, pointerEvents:'none' }}/>
      <div className="container" style={{ padding:'22px 0', position:'relative', zIndex:1 }}>
        {claimed ? (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, flexWrap:'wrap', textAlign:'center' }}>
            <span style={{ color:'#fff', display:'inline-flex' }}><Icon name="check" size={26}/></span>
            <div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:20, fontWeight:800, color:'#fff' }}>{t(['¡Código APERTURA aplicado!','APERTURA code applied!'])}</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.85)', marginTop:2 }}>{t(['Muestra esta pantalla al llegar. Tu primer baño + corte es GRATIS.','Show this screen when you arrive. Your first bath + haircut is FREE.'])}</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background:'rgba(255,255,255,0.2)', border:'none', color:'#fff', borderRadius:999, padding:'8px 16px', cursor:'pointer', fontFamily:'inherit', fontWeight:700, fontSize:13 }}>{t(['Cerrar','Close'])}</button>
          </div>
        ) : (
          <div style={{ display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
            <div style={{ flex:'1 1 260px' }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.2)', borderRadius:999, padding:'3px 12px', marginBottom:6 }}>
                <span style={{ fontSize:10, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'#fff' }}>{t(['Oferta de Apertura · Tiempo Limitado','Opening Offer · Limited Time'])}</span>
              </div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(20px,3vw,32px)', fontWeight:800, color:'#fff', letterSpacing:'-0.03em', lineHeight:1.1 }}>
                {t(['Primer baño + corte','First bath + haircut'])} <span style={{ background:'rgba(255,255,255,0.25)', borderRadius:6, padding:'2px 8px' }}>{t(['GRATIS','FREE'])}</span>
              </div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.85)', marginTop:5 }}>{t(['Nuevo local','New location'])} · {t(['Código','Code'])} <strong>APERTURA</strong> · {t(['Solo por tiempo limitado','Limited time only'])}</div>
            </div>
            <form onSubmit={claim} style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center', flex:'1 1 300px' }}>
              <input value={name} onChange={e => setName(e.target.value)} required placeholder={t(['Tu nombre *','Your name *'])}
                style={{ flex:'1 1 120px', padding:'9px 14px', borderRadius:999, border:'none', fontFamily:'inherit', fontSize:13, outline:'none', background:'rgba(255,255,255,0.95)' }}/>
              <input value={phone} onChange={e => setPhone(e.target.value)} required type="tel" placeholder={t(['Número de teléfono *','Phone number *'])}
                style={{ flex:'1 1 120px', padding:'9px 14px', borderRadius:999, border:'none', fontFamily:'inherit', fontSize:13, outline:'none', background:'rgba(255,255,255,0.95)' }}/>
              <button type="submit" disabled={loading}
                style={{ padding:'9px 18px', borderRadius:999, background:'#2D2421', color:'#fff', border:'none', fontFamily:'inherit', fontWeight:800, fontSize:13, cursor:'pointer', whiteSpace:'nowrap', flexShrink:0 }}>
                {loading ? t(['Aplicando...','Applying...']) : t(['Reclamar Oferta','Claim Offer'])}
              </button>
            </form>
            <button onClick={() => setOpen(false)} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.7)', fontSize:22, cursor:'pointer', padding:4, flexShrink:0, lineHeight:1 }}>×</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Modal: datos de la mascota al comprar una membresía ────────────────────────
function MembershipPetModal({ buyFor, me, billing, onClose }) {
  const presetPets = (me && me.pets) || [];
  const [email, setEmail] = useState((me && me.email) || '');
  const [name, setName] = useState(presetPets[0] ? presetPets[0].name : '');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState('');
  const [sex, setSex] = useState('');
  const [weight, setWeight] = useState(presetPets[0] && presetPets[0].weight_lbs ? String(presetPets[0].weight_lbs) : '');
  const [notes, setNotes] = useState('');
  const [groomWeeks, setGroomWeeks] = useState('');
  const [sensitive, setSensitive] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const t = useT();
  const m = buyFor.m;

  const pickPreset = (p) => { setName(p.name || ''); if (p.weight_lbs) setWeight(String(p.weight_lbs)); if (p.breed) setBreed(p.breed); };

  const go = async () => {
    const em = (email || '').trim().toLowerCase();
    if (!name.trim()) { setErr(t(['Escribe el nombre de tu mascota','Enter your pet’s name'])); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) { setErr(t(['Escribe un correo válido para tu membresía','Enter a valid email for your membership'])); return; }
    setBusy(true); setErr('');
    const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4';
    try {
      const r = await fetch('https://oqqwmcplljirbreowrll.supabase.co/functions/v1/stripe_membership', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'apikey': ANON_KEY, 'Authorization': 'Bearer ' + ANON_KEY },
        body: JSON.stringify({ action: 'checkout', plan_key: buyFor.planKey, client_email: em,
          pet: { name: name.trim(), breed: breed.trim(), size, sex, weight_lbs: weight, groom_freq_weeks: groomWeeks, sensitive_skin: sensitive, notes: notes.trim() },
          success_url: 'https://bpuppy.us/grooming', cancel_url: location.href }),
      });
      const c = await r.json();
      if (c.url) { location.href = c.url; return; }
      setErr((c && c.error) || t(['No se pudo iniciar el pago','We could not start the payment'])); setBusy(false);
    } catch(e) { setErr(t(['Error de red, intenta de nuevo','Network error, please try again'])); setBusy(false); }
  };

  const fld = { width:'100%', padding:'11px 13px', borderRadius:11, border:'1.5px solid var(--line)', fontFamily:'inherit', fontSize:14, color:'var(--ink)', background:'var(--bg)', outline:'none' };
  const lbl = { fontSize:11.5, fontWeight:700, color:'var(--ink-2)', marginBottom:4 };

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} style={{ position:'fixed', inset:0, background:'rgba(45,36,33,0.55)', backdropFilter:'blur(3px)', display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'40px 16px', zIndex:1000, overflowY:'auto' }}>
      <div style={{ background:'#fff', borderRadius:20, width:'100%', maxWidth:460, padding:24, boxShadow:'0 30px 80px rgba(45,36,33,0.3)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
          <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:20, fontWeight:800, color:'var(--ink)', margin:0 }}>{t(['¿Para qué mascota es tu','Which pet is your'])} {groomT(t, m.name)}?</h3>
          <button onClick={onClose} style={{ border:'none', background:'var(--paper)', width:30, height:30, borderRadius:'50%', fontSize:18, lineHeight:1, cursor:'pointer', color:'var(--ink-2)', flexShrink:0 }}>×</button>
        </div>
        <p style={{ fontSize:12.5, color:'var(--ink-2)', margin:'0 0 14px', lineHeight:1.5 }}>{t(['Registramos a tu mascota con tu membresía. La confirmamos y queda lista en tu portal.','We register your pet with your membership. We confirm it and it is ready in your portal.'])}</p>

        {presetPets.length > 0 && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:12 }}>
            {presetPets.map((p, i) => {
              const sel = name === p.name;
              return <button key={i} onClick={() => pickPreset(p)} style={{ padding:'7px 13px', borderRadius:999, border:`2px solid ${sel?'var(--orange)':'var(--line)'}`, background: sel?'rgba(245,130,32,0.08)':'var(--bg)', cursor:'pointer', fontFamily:'inherit', fontSize:12.5, fontWeight:700, color: sel?'var(--orange)':'var(--ink)' }}>{p.name}</button>;
            })}
          </div>
        )}

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          <div style={{ gridColumn:'1/-1' }}><div style={lbl}>{t(['Nombre de la mascota *','Pet’s name *'])}</div><input value={name} onChange={e=>setName(e.target.value)} placeholder={t(['Ej: Max','e.g. Max'])} style={fld}/></div>
          <div><div style={lbl}>{t(['Raza','Breed'])}</div><input value={breed} onChange={e=>setBreed(e.target.value)} placeholder={t(['Ej: Poodle','e.g. Poodle'])} style={fld}/></div>
          <div><div style={lbl}>{t(['Tamaño','Size'])}</div><select value={size} onChange={e=>setSize(e.target.value)} style={fld}><option value="">—</option><option value="Pequeño">{t(['Pequeño','Small'])}</option><option value="Mediano">{t(['Mediano','Medium'])}</option><option value="Grande">{t(['Grande','Large'])}</option><option value="XL">XL</option></select></div>
          <div><div style={lbl}>{t(['Sexo','Sex'])}</div><select value={sex} onChange={e=>setSex(e.target.value)} style={fld}><option value="">—</option><option value="Macho">{t(['Macho','Male'])}</option><option value="Hembra">{t(['Hembra','Female'])}</option></select></div>
          <div><div style={lbl}>{t(['Peso (lb)','Weight (lb)'])}</div><input value={weight} onChange={e=>setWeight(e.target.value)} type="number" min="0" placeholder={t(['Ej: 12','e.g. 12'])} style={fld}/></div>
          <div><div style={lbl}>{t(['Baño/corte cada','Bath/haircut every'])}</div><select value={groomWeeks} onChange={e=>setGroomWeeks(e.target.value)} style={fld}><option value="">{t(['— elegir','— choose'])}</option><option value="4">{t(['Cada 4 semanas','Every 4 weeks'])}</option><option value="6">{t(['Cada 6 semanas','Every 6 weeks'])}</option><option value="8">{t(['Cada 8 semanas','Every 8 weeks'])}</option><option value="12">{t(['Cada 12 semanas','Every 12 weeks'])}</option></select></div>
          <div style={{ display:'flex', alignItems:'center', gap:8, alignSelf:'end', paddingBottom:6 }}><input id="mp-sens" type="checkbox" checked={sensitive} onChange={e=>setSensitive(e.target.checked)} style={{ width:18, height:18, accentColor:'var(--orange)', cursor:'pointer' }}/><label htmlFor="mp-sens" style={{ fontSize:13, fontWeight:700, color:'var(--ink)', cursor:'pointer' }}>{t(['Piel sensible','Sensitive skin'])}</label></div>
          <div style={{ gridColumn:'1/-1' }}><div style={lbl}>{t(['Tu correo *','Your email *'])}</div><input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder={t(['tu@correo.com','you@email.com'])} style={fld} disabled={!!(me && me.email)}/></div>
          <div style={{ gridColumn:'1/-1' }}><div style={lbl}>{t(['Notas (opcional)','Notes (optional)'])}</div><textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder={t(['Alergias, comportamiento...','Allergies, behavior...'])} rows={2} style={{ ...fld, resize:'vertical', minHeight:54 }}/></div>
        </div>

        {err && <div style={{ marginTop:10, fontSize:13, fontWeight:600, color:'#C0392B', background:'#f8e3df', borderRadius:10, padding:'9px 12px' }}>{err}</div>}
        <button onClick={go} disabled={busy} style={{ width:'100%', marginTop:14, padding:14, borderRadius:13, border:'none', background: busy?'var(--line)':'var(--orange)', color:'#fff', fontFamily:'inherit', fontSize:15, fontWeight:800, cursor: busy?'default':'pointer' }}>{busy ? t(['Redirigiendo a pago seguro…','Redirecting to secure checkout…']) : t(['Continuar al pago →','Continue to payment →'])}</button>
        <p style={{ fontSize:10.5, color:'var(--ink-soft)', textAlign:'center', margin:'8px 0 0' }}>{t(['Pago seguro con Stripe. Tu mascota queda registrada al confirmar.','Secure payment with Stripe. Your pet is registered upon confirmation.'])}</p>
      </div>
    </div>
  );
}

// ── Main Grooming page ─────────────────────────────────────────────────────────
function GroomingApp() {
  const [sizeIdx, setSizeIdx] = useState(0);
  const sizeKey = SIZEKEYS[sizeIdx];
  const [tab, setTab] = useState('servicios');
  const [billing, setBilling] = useState('month');

  // Grooming blog articles
  const groomingArts = useMemo(() => (typeof BLOG !== 'undefined' ? BLOG.filter(a => a.cat === 'grooming') : []), []);

  // ── Login de cliente recurrente (magic-link) ──
  const [authOpen, setAuthOpen] = useState(false);       // modal abierto
  const [authEmail, setAuthEmail] = useState('');
  const [authSent, setAuthSent] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [authErr, setAuthErr] = useState('');
  const [me, setMe] = useState(null);                    // { email, client, pets, memberships }
  const [meBusy, setMeBusy] = useState(false);
  const [buyFor, setBuyFor] = useState(null);            // { m, planKey } -> abre modal de captura de mascota
  const t = useT();

  // Init Supabase for banner form + recuperar sesión del magic-link
  useEffect(() => {
    if (!window._groomSb) {
      try {
        const SU='https://oqqwmcplljirbreowrll.supabase.co';
        const SK='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4';
        window._groomSb = supabase.createClient(SU, SK);
      } catch(e) {}
    }
    const sb = window._groomSb;
    if (!sb) return;
    let cancelled = false;
    const fetchPortal = async (token) => {
      if (!token) return;
      setMeBusy(true);
      try {
        const r = await fetch('https://oqqwmcplljirbreowrll.supabase.co/functions/v1/portal_data', {
          method: 'POST', headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' }, body: '{}',
        });
        const d = await r.json();
        if (!cancelled && d && d.ok) { setMe(d); setAuthOpen(false); }
      } catch(e) {} finally { if (!cancelled) setMeBusy(false); }
    };
    sb.auth.getSession().then(({ data }) => {
      const tok = data && data.session && data.session.access_token;
      if (tok) fetchPortal(tok);
    });
    const sub = sb.auth.onAuthStateChange((_evt, session) => {
      if (session && session.access_token) fetchPortal(session.access_token);
      else setMe(null);
    });
    return () => { cancelled = true; try { sub.data.subscription.unsubscribe(); } catch(e) {} };
  }, []);

  const sendMagicLink = async () => {
    const email = (authEmail || '').trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setAuthErr(t(['Escribe un correo válido','Enter a valid email'])); return; }
    setAuthBusy(true); setAuthErr('');
    try {
      const r = await fetch('https://oqqwmcplljirbreowrll.supabase.co/functions/v1/portal_magiclink', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, redirectTo: window.location.href.split('#')[0] }),
      });
      const d = await r.json();
      if (d && d.ok) setAuthSent(true);
      else setAuthErr((d && d.error) || t(['No se pudo enviar el enlace','We could not send the link']));
    } catch(e) { setAuthErr(t(['Error de red, intenta de nuevo','Network error, please try again'])); }
    finally { setAuthBusy(false); }
  };
  const logout = async () => { try { await window._groomSb.auth.signOut(); } catch(e) {} setMe(null); };

  // Beneficios del plan (case-insensitive contra MEMBERSHIPS)
  const planInfo = (planName) => {
    const p = (planName || '').toLowerCase();
    return MEMBERSHIPS.find(m => p.includes(m.name.replace(/^Plan\s+/i, '').toLowerCase())) || null;
  };
  const activeMembership = (me && me.memberships || []).find(m => (m.status || 'active') !== 'cancelled') || (me && me.memberships || [])[0] || null;
  const activePlan = activeMembership ? planInfo(activeMembership.plan) : null;
  const firstName = me && me.client ? (me.client.first_name || '').split(' ')[0] : '';

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ position:'relative', minHeight:580, display:'flex', alignItems:'center', overflow:'hidden', background:'#e9e9e9' }}>

        {/* Dogs image — absolute right, shows all 4 */}
        <img src="uploads/Pom Grooming.webp" alt=""
          style={{ position:'absolute', bottom:0, right:0, width:'57%', height:'auto', display:'block', pointerEvents:'none', zIndex:0 }}
        />

        {/* White gradient overlay — keeps text legible */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, #e9e9e9 34%, rgba(233,233,233,0.82) 43%, transparent 50%)', pointerEvents:'none', zIndex:1 }}/>

        {/* Floating bubbles */}
        {[
          {w:70,  l:'8%',  delay:0},   {w:40,  l:'18%', delay:1.2}, {w:90,  l:'28%', delay:2.1},
          {w:35,  l:'38%', delay:0.7}, {w:55,  l:'45%', delay:3.0}, {w:80,  l:'22%', delay:1.8},
          {w:45,  l:'12%', delay:2.5}, {w:60,  l:'32%', delay:0.4}, {w:30,  l:'42%', delay:1.5},
        ].map(function(b, i) {
          return (
            <div key={i} style={{
              position:'absolute', borderRadius:'50%', background:'transparent',
              border: `2px solid rgba(245,130,32,${0.08 + (i%4)*0.04})`,
              width:b.w, height:b.w, left:b.l, bottom: -b.w,
              animation:`bubbleUp ${5 + i*0.6}s ease-in infinite`,
              animationDelay: b.delay + 's',
              pointerEvents:'none',
            }}/>
          );
        })}

        <div className="container" style={{ paddingTop:120, paddingBottom:60, position:'relative', zIndex:1 }}>

          {/* Left — text */}
          <div style={{ paddingBottom:20, maxWidth:'50%', position:'relative', zIndex:2 }}>            {/* Address badge */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(245,130,32,0.08)', border:'1px solid rgba(245,130,32,0.22)', borderRadius:999, padding:'7px 16px', marginBottom:22 }}>
              <span style={{ color:'var(--orange)', display:'inline-flex' }}><Icon name="pin" size={16}/></span>
              <div>
                <div style={{ fontSize:9.5, fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--orange)', marginBottom:1 }}>{t(['Próximamente abriendo','Opening soon'])}</div>
                <div style={{ fontSize:12, fontWeight:600, color:'var(--ink)' }}>5604 Kalogridis Rd, Haines City, FL 33844</div>
              </div>
            </div>

            <div style={{ fontSize:15, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'#3A8FC7', marginBottom:16 }}>BPuppy Grooming</div>

            <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(32px,4.5vw,58px)', fontWeight:800, color:'var(--ink)', margin:'0 0 16px', letterSpacing:'-0.035em', lineHeight:1.05 }}>
              {t(['Tu mascota merece','Your pet deserves'])}<br/><em style={{ fontFamily:'Instrument Serif,Georgia,serif', fontStyle:'italic', fontWeight:400, color:'var(--orange)' }}>{t(['verse increíble','to look amazing'])}</em>
            </h1>

            <p style={{ fontSize:15, color:'var(--ink-2)', margin:'0 0 28px', lineHeight:1.65, maxWidth:400 }}>
              {t(['Baño, corte, deslanado y spa con productos premium. Recogida y entrega disponible. Planes de membresía con descuento anual.','Bath, haircut, de-shedding and spa with premium products. Pickup and delivery available. Membership plans with an annual discount.'])}
            </p>

            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <a href="#booking" style={{ padding:'13px 24px', borderRadius:14, background:'var(--orange)', color:'#fff', fontFamily:'inherit', fontSize:14, fontWeight:700, textDecoration:'none', boxShadow:'0 8px 24px -8px rgba(245,130,32,0.45)' }}>{t(['Agendar cita ahora','Book an appointment now'])}</a>
              <a href="#memberships" style={{ padding:'13px 24px', borderRadius:14, background:'var(--bg)', color:'var(--ink)', fontFamily:'inherit', fontSize:14, fontWeight:600, textDecoration:'none', border:'1.5px solid var(--line)' }}>{t(['Ver membresías','View memberships'])}</a>
            </div>

            {/* Entrada de cliente recurrente */}
            <div style={{ marginTop:18 }}>
              {me ? (
                <button onClick={() => { document.getElementById('mi-cuenta')?.scrollIntoView({ behavior:'smooth' }); }}
                  style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 16px', borderRadius:999, background:'#fff', border:'1.5px solid var(--line)', cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:700, color:'var(--ink)' }}>
                  <span style={{ width:26, height:26, borderRadius:'50%', background:'var(--orange)', color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800 }}>{(firstName||'?')[0]}</span>
                  {t(['Hola,','Hi,'])} {firstName || t(['cliente','client'])} · {t(['Mi cuenta','My account'])}
                </button>
              ) : (
                <button onClick={() => { setAuthOpen(true); setAuthSent(false); setAuthErr(''); }}
                  style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'8px 16px', borderRadius:999, background:'transparent', border:'1.5px solid var(--line)', cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:600, color:'var(--ink-2)' }}>
                  <span style={{ display:'inline-flex' }}><Icon name="user" size={15}/></span> {t(['Ya soy cliente · Entrar','Already a client · Sign in'])}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Opening banner - below hero */}
      <OpeningBanner/>

      {/* Trust bar */}
      <div style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
        <div className="container" style={{ display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[['scissors', t(['Grooming profesional','Professional grooming'])], ['van', 'Pickup & Delivery'], ['leaf', t(['Productos premium','Premium products'])], ['clock', t(['Lun–Sáb 9am–6pm','Mon–Sat 9am–6pm'])], ['chat', t(['Confirmación inmediata','Instant confirmation'])]].map(([ic, label]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px', borderRight: '1px solid var(--line)', whiteSpace: 'nowrap', flexShrink: 0 }}>
              <span style={{ color: 'var(--orange)', display:'inline-flex' }}><Icon name={ic} size={18}/></span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '60px 0 0' }}>

        {/* Tab nav */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--paper)', borderRadius: 14, padding: 5, marginBottom: 40, width: 'fit-content' }}>
          {[['servicios', t(['Servicios','Services'])], ['paquetes', t(['Paquetes','Packages'])], ['memberships', t(['Membresías','Memberships'])]].map(([id, label]) => (
            <button key={id} onClick={() => { setTab(id); if (id === 'memberships') document.getElementById('memberships')?.scrollIntoView(); }} style={{ padding: '9px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: tab === id ? 700 : 500, background: tab === id ? 'var(--orange)' : 'transparent', color: tab === id ? '#fff' : 'var(--ink-2)', transition: 'all .15s' }}>
              {label}
            </button>
          ))}
        </div>

        {/* Services pricing */}
        {tab === 'servicios' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
              <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--ink)', margin: 0 }}>{t(['Precios por servicio','Prices per service'])}</h2>
              <div style={{ display: 'flex', gap: 6 }}>
                {['S', 'M', 'L', 'XL'].map((s, i) => (
                  <button key={s} onClick={() => setSizeIdx(i)} style={{ padding: '5px 14px', borderRadius: 999, border: 'none', background: sizeIdx === i ? 'var(--orange)' : 'var(--bg)', color: sizeIdx === i ? '#fff' : 'var(--ink-2)', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{s}</button>
                ))}
              </div>
              <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{[t(['Pequeño (< 15 lbs)','Small (< 15 lbs)']), t(['Mediano (15-40 lbs)','Medium (15-40 lbs)']), t(['Grande (40-70 lbs)','Large (40-70 lbs)']), t(['XL (70+ lbs)','XL (70+ lbs)'])][sizeIdx]}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12, marginBottom: 40 }}>
              {SERVICES.map(sv => (
                <div key={sv.name} style={{ background: sv.highlight ? 'linear-gradient(135deg,rgba(245,130,32,0.10),rgba(232,93,117,0.10))' : 'var(--paper)', borderRadius: 16, padding: '18px 14px', border: sv.highlight ? '1.5px solid rgba(245,130,32,0.3)' : '1px solid var(--line)', textAlign: 'center', position: 'relative' }}>
                  {sv.highlight && <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', background: 'var(--orange)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 999, whiteSpace: 'nowrap' }}>{t(['TODO INCLUIDO','ALL INCLUDED'])}</div>}
                  <div style={{ marginBottom: 8, color: 'var(--orange)', display:'flex', justifyContent:'center' }}><Icon name={sv.icon} size={28}/></div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25, marginBottom: 6 }}>{groomT(t, sv.name)}</div>
                  <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 22, fontWeight: 800, color: sv.highlight ? 'var(--orange)' : 'var(--ink)' }}>${sv.prices[sizeKey]}</div>
                  <div style={{ fontSize: 10, color: 'var(--ink-soft)', marginTop: 4, lineHeight: 1.4 }}>{groomT(t, sv.desc)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Packages */}
        {tab === 'paquetes' && (
          <div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px' }}>{t(['Paquetes combinados','Combined packages'])}</h2>
            <p style={{ color: 'var(--ink-2)', marginBottom: 24 }}>{t(['Selecciona el tamaño de tu mascota:','Select your pet’s size:'])}</p>
            <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
              {['S', 'M', 'L', 'XL'].map((s, i) => (
                <button key={s} onClick={() => setSizeIdx(i)} style={{ padding: '6px 16px', borderRadius: 999, border: 'none', background: sizeIdx === i ? 'var(--orange)' : 'var(--bg)', color: sizeIdx === i ? '#fff' : 'var(--ink-2)', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{s}</button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 40 }}>
              {PACKAGES.map(pkg => (
                <div key={pkg.name} style={{ background: 'var(--paper)', borderRadius: 20, padding: '24px', border: pkg.popular ? `2px solid ${pkg.color}` : '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
                  {pkg.popular && <div style={{ position: 'absolute', top: 16, right: 16, background: pkg.color, color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 999 }}>{t(['MÁS POPULAR','MOST POPULAR'])}</div>}
                  <div style={{ marginBottom: 10, color: pkg.color, display:'flex' }}><Icon name={pkg.icon} size={30}/></div>
                  <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}>{groomT(t, pkg.name)}</div>
                  <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 30, fontWeight: 800, color: pkg.color, marginBottom: 4 }}>${pkg.prices[sizeKey]}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginBottom: 16 }}>{groomT(t, pkg.note)}</div>
                  <ul style={{ padding: 0, margin: '0 0 20px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {pkg.includes.map(item => (
                      <li key={item} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--ink-2)' }}>
                        <span style={{ color: pkg.color, fontWeight: 700, flexShrink: 0 }}>✓</span>{groomT(t, item)}
                      </li>
                    ))}
                  </ul>
                  <a href="#booking" style={{ display: 'block', textAlign: 'center', padding: '11px', borderRadius: 12, background: pkg.color, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>{t(['Agendar este paquete','Book this package'])}</a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking */}
      <div id="booking" style={{ background: 'var(--bg)', padding: '70px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>{t(['Reserva tu cita','Book your appointment'])}</div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 800, color: 'var(--ink)', margin: '0 0 14px', letterSpacing: '-0.03em' }}>
              {t(['Agenda rápido,','Book in minutes,'])}<br />{t(['Confirmación Inmediata','Instant Confirmation'])}
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.65, margin: '0 0 24px' }}>
              {t(['Selecciona servicio, fecha y hora. Te confirmamos disponibilidad en menos de 2 horas. También ofrecemos','Select a service, date and time. We confirm availability within 2 hours. We also offer'])} <strong>{t(['recogida y entrega','pickup and delivery'])}</strong> — {t(['pregunta al reservar.','just ask when you book.'])}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['pin', t(['Próximamente · Haines City, FL','Opening soon · Haines City, FL']), '5604 Kalogridis Rd, Haines City, FL 33844'], ['van', 'Pickup & Delivery', t(['Recogemos y entregamos en tu casa (+$20)','We pick up and drop off at your home (+$20)'])], ['clock', t(['Horario','Hours']), t(['Lun – Sáb: 9:00 AM – 6:00 PM','Mon – Sat: 9:00 AM – 6:00 PM'])]].map(([ic, title, sub]) => (
                <div key={title} style={{ display: 'flex', gap: 12, padding: '14px 16px', background: 'var(--paper)', borderRadius: 12, border: '1px solid var(--line)' }}>
                  <span style={{ flexShrink: 0, color: 'var(--orange)', display:'inline-flex' }}><Icon name={ic} size={22}/></span>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)' }}>{title}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <BookingCalendar me={me} activeMembership={activeMembership} activePlan={activePlan} firstName={firstName} onLogin={() => { setAuthOpen(true); setAuthSent(false); setAuthErr(''); }} />
        </div>
      </div>

      {/* Location map */}
      <div style={{ background:'#fff', padding:'60px 0 0', borderTop:'1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24, flexWrap:'wrap' }}>
            <div>
              <div className="eyebrow" style={{ marginBottom:6 }}>{t(['Nuestra próxima ubicación','Our upcoming location'])}</div>
              <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(22px,3vw,32px)', fontWeight:800, color:'var(--ink)', margin:0, letterSpacing:'-0.025em' }}>
                BPuppy Grooming · Haines City, FL
              </h2>
            </div>
            <a href="https://maps.google.com/?q=5604+Kalogridis+Rd,+Haines+City,+FL+33844" target="_blank" rel="noreferrer"
              style={{ marginLeft:'auto', display:'inline-flex', alignItems:'center', gap:8, padding:'10px 18px', borderRadius:999, background:'var(--orange)', color:'#fff', fontSize:13, fontWeight:700, textDecoration:'none', whiteSpace:'nowrap', boxShadow:'0 6px 20px -6px rgba(245,130,32,0.45)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {t(['Abrir en Maps','Open in Maps'])}
            </a>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20, padding:'12px 18px', background:'rgba(245,130,32,0.06)', border:'1px solid rgba(245,130,32,0.2)', borderRadius:12 }}>
            <span style={{ color:'var(--orange)', display:'inline-flex' }}><Icon name="pin" size={18}/></span>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:'var(--ink)' }}>5604 Kalogridis Rd, Haines City, FL 33844</div>
              <div style={{ fontSize:12, color:'var(--orange)', fontWeight:600 }}>{t(['Próximamente abriendo · ¡Síguenos para el anuncio oficial!','Opening soon · Follow us for the official announcement!'])}</div>
            </div>
          </div>
          <div style={{ borderRadius:18, overflow:'hidden', border:'1px solid var(--line)', boxShadow:'0 4px 24px rgba(0,0,0,0.07)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d622.1281722026707!2d-81.56348267074404!3d28.107241293543456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88dd744a45039381%3A0x7e8fc576a126e748!2s5604%20Kalogridis%20Rd%2C%20Haines%20City%2C%20FL%2033844!5e0!3m2!1ses!2sus!4v1779474402737!5m2!1ses!2sus"
              width="100%" height="380" style={{ border:0, display:'block' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="BPuppy Grooming — Haines City FL"
            />
          </div>
        </div>
      </div>

      {/* Memberships */}      <div id="memberships" style={{ background: 'var(--ink)', padding: '70px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, background: 'rgba(245,130,32,0.18)', color: 'var(--orange)', fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{t(['Membresías','Memberships'])}</div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
              {t(['Ahorra pagando anual','Save by paying annually'])}
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>{t(['Compromiso mensual o pago anual con descuento garantizado','Monthly commitment or annual payment with a guaranteed discount'])}</p>
            <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: 4, width: 'fit-content', margin: '0 auto' }}>
              {[['month', t(['Mensual','Monthly'])], ['year', t(['Anual (ahorra 20%)','Annual (save 20%)'])]].map(([id, label]) => (
                <button key={id} onClick={() => setBilling(id)} style={{ padding: '8px 18px', borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, background: billing === id ? '#fff' : 'transparent', color: billing === id ? 'var(--ink)' : 'rgba(255,255,255,0.6)', transition: 'all .15s' }}>{label}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 40 }}>
            {MEMBERSHIPS.map(m => (
              <div key={m.name} style={{ background: m.popular ? m.color : 'rgba(255,255,255,0.07)', borderRadius: 20, padding: '28px 24px', border: m.popular ? 'none' : '1px solid rgba(255,255,255,0.12)', position: 'relative' }}>
                {m.popular && <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#FFD700', color: '#2D2421', fontSize: 10, fontWeight: 900, padding: '4px 14px', borderRadius: 999, whiteSpace: 'nowrap' }}>{t(['MÁS POPULAR','MOST POPULAR'])}</div>}
                {m.promo && <div style={{ position: 'absolute', top: -10, right: 16, background: '#FF3B30', color: '#fff', fontSize: 9, fontWeight: 900, padding: '3px 10px', borderRadius: 999, whiteSpace: 'nowrap', letterSpacing: '0.06em' }}>APERTURA</div>}
                <div style={{ marginBottom: 10, color: '#fff', display:'flex' }}><Icon name={m.icon} size={30}/></div>
                <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{groomT(t, m.name)}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                  {m.promo && (
                    <span style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 22, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through' }}>
                      ${billing === 'month' ? m.price_month : Math.round(m.price_year / 12)}
                    </span>
                  )}
                  <span style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 36, fontWeight: 800, color: '#fff' }}>
                    ${billing === 'month' ? (m.price_month_promo || m.price_month) : Math.round((m.price_year_promo || m.price_year) / 12)}
                  </span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{t(['/mes','/mo'])}</span>
                </div>
                {billing === 'year' && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>${m.price_year_promo || m.price_year}{t(['/año · ahorras','/yr · you save'])} ${m.savings_promo || m.savings}</div>}
                {m.promo && <div style={{ fontSize: 11, color: '#FFD700', fontWeight: 700, marginBottom: 8 }}>{t(['Precio de apertura · Solo por tiempo limitado','Opening price · Limited time only'])}</div>}
                <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.65)', margin: '0 0 18px', lineHeight: 1.55 }}>{groomT(t, m.cta)}</p>
                <ul style={{ padding: 0, margin: '0 0 22px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {m.includes.map(item => (
                    <li key={item} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
                      <span style={{ color: m.popular ? '#fff' : m.color, fontWeight: 700, flexShrink: 0 }}>✓</span>{groomT(t, item)}
                    </li>
                  ))}
                </ul>
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  const tk = (/esencial/i.test(m.name) ? 'esencial' : /vip/i.test(m.name) ? 'vip' : 'total') + '_' + billing;
                  setBuyFor({ m, planKey: tk });
                }} style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: 12, background: m.popular ? 'rgba(255,255,255,0.2)' : m.color, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, textDecoration: 'none', cursor: 'pointer' }}>{t(['Suscribirse ahora','Subscribe now'])}</a>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>{t(['Métodos de pago aceptados','Accepted payment methods'])}</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {PAYMENT_METHODS.map(pm => (
                <span key={pm.name} style={{ display:'inline-flex', alignItems:'center', gap:6, padding: '6px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{pm.icon && <Icon name={pm.icon} size={15}/>}{groomT(t, pm.name)}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div style={{ background: 'var(--paper)', padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--ink)', margin: '0 0 24px' }}>{t(['Nuestro trabajo','Our work'])}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 12 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <image-slot key={i} id={`grooming-work-${i}`} shape="rounded" radius="14" placeholder={[t(['Antes / Después','Before / After']), t(['Corte creativo','Creative cut']), t(['Spa VIP','VIP Spa']), 'Golden groomed', t(['Schnauzer cortado','Groomed Schnauzer']), 'Poodle teddy bear', 'Shih Tzu spa', t(['Cachorro primer baño','Puppy’s first bath'])][i]} style={{ aspectRatio: '1', display: 'block' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Blog articles */}
      {groomingArts.length > 0 && (
        <div style={{ background: 'var(--bg)', padding: '60px 0 80px' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--ink)', margin: 0 }}>{t(['Artículos de grooming','Grooming articles'])}</h2>
              <a href="/blog" style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)', textDecoration: 'none' }}>{t(['Ver todos','See all'])} →</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20 }}>
              {groomingArts.slice(0, 4).map(art => (
                <a key={art.id} href={`/blog?art=${art.id}`} style={{ textDecoration: 'none', display: 'flex', gap: 14, padding: '16px', background: 'var(--paper)', borderRadius: 16, border: '1px solid var(--line)', transition: 'box-shadow .2s, transform .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow='0 8px 24px -8px rgba(45,36,33,0.16)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'; }}>
                  <span style={{ flexShrink: 0, color:'var(--orange)', display:'inline-flex', width:36, height:36, alignItems:'center', justifyContent:'center', background:'rgba(245,130,32,0.1)', borderRadius:10 }}><Icon name="scissors" size={20}/></span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#9C27B0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Grooming</div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 4 }}>{art.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>{art.read} {t(['min · Leer artículo','min · Read article'])} →</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Panel "Mi cuenta" — solo cliente con sesión */}
      {me && (
        <div id="mi-cuenta" style={{ background:'var(--paper)', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)', padding:'48px 0' }}>
          <div className="container">
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, flexWrap:'wrap', marginBottom:24 }}>
              <div>
                <div style={{ fontSize:12, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--orange)', marginBottom:6 }}>{t(['Mi cuenta','My account'])}</div>
                <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:26, fontWeight:800, color:'var(--ink)', margin:0 }}>{t(['Hola,','Hi,'])} {firstName || t(['cliente','client'])}</h2>
                <div style={{ fontSize:13, color:'var(--ink-soft)', marginTop:4 }}>{me.email}</div>
              </div>
              <button onClick={logout} style={{ padding:'8px 16px', borderRadius:999, background:'transparent', border:'1.5px solid var(--line)', cursor:'pointer', fontFamily:'inherit', fontSize:12.5, fontWeight:600, color:'var(--ink-2)' }}>{t(['Cerrar sesión','Sign out'])}</button>
            </div>

            {/* Plan activo + beneficios */}
            {activeMembership ? (
              <div style={{ background:'linear-gradient(135deg,#2D2421,#43352d)', borderRadius:18, padding:'24px 26px', color:'#fff', marginBottom:20 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14, flexWrap:'wrap' }}>
                  <span style={{ display:'inline-flex' }}><Icon name={activePlan ? activePlan.icon : 'trophy'} size={24} color="#fff"/></span>
                  <span style={{ fontSize:18, fontWeight:800 }}>{activeMembership.plan || t(['Membresía','Membership'])}</span>
                  <span style={{ padding:'3px 11px', borderRadius:999, background:'rgba(255,255,255,0.14)', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.05em' }}>{(activeMembership.status || t(['activa','active']))}</span>
                  {typeof activeMembership.credits_balance === 'number' && (
                    <span style={{ marginLeft:'auto', fontSize:12.5, fontWeight:700, color:'rgba(255,255,255,0.85)' }}>{activeMembership.credits_balance} groom{activeMembership.credits_balance===1?'':'s'} {activeMembership.credits_balance===1?t(['disponible','available']):t(['disponibles','available'])}</span>
                  )}
                </div>
                {activePlan && (
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {activePlan.includes.map((b, i) => (
                      <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'6px 12px', borderRadius:10, background:'rgba(255,255,255,0.08)', fontSize:12, fontWeight:600 }}>✓ {groomT(t, b)}</span>
                    ))}
                  </div>
                )}
                {activeMembership.renew_date && (
                  <div style={{ fontSize:12, color:'rgba(255,255,255,0.6)', marginTop:14 }}>{t(['Renueva:','Renews:'])} {activeMembership.renew_date}</div>
                )}
              </div>
            ) : (
              <div style={{ background:'var(--bg)', border:'1.5px solid var(--line)', borderRadius:16, padding:'20px 22px', marginBottom:20 }}>
                <div style={{ fontSize:14, fontWeight:700, color:'var(--ink)', marginBottom:4 }}>{t(['Aún no tienes un plan de membresía','You don’t have a membership plan yet'])}</div>
                <div style={{ fontSize:13, color:'var(--ink-soft)', marginBottom:12 }}>{t(['Ahorra hasta 20% y obtén pickup & delivery incluido.','Save up to 20% and get pickup & delivery included.'])}</div>
                <a href="#memberships" style={{ display:'inline-block', padding:'10px 18px', borderRadius:12, background:'var(--orange)', color:'#fff', fontSize:13, fontWeight:700, textDecoration:'none' }}>{t(['Ver membresías','View memberships'])}</a>
              </div>
            )}

            {/* Mis mascotas */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
              <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:18, fontWeight:800, color:'var(--ink)', margin:0 }}>{t(['Mis mascotas','My pets'])}</h3>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12 }}>
              {(me.pets || []).map(pet => (
                <div key={pet.id} style={{ background:'#fff', border:'1px solid var(--line)', borderRadius:14, padding:'16px 18px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <span style={{ width:40, height:40, borderRadius:'50%', background:'var(--bg)', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:20, overflow:'hidden' }}>
                      {pet.photo_url ? <img src={pet.photo_url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : <span style={{ color:'var(--orange)', display:'inline-flex' }}><Icon name="paw" size={30}/></span>}
                    </span>
                    <div>
                      <div style={{ fontSize:14, fontWeight:800, color:'var(--ink)' }}>{pet.name}</div>
                      <div style={{ fontSize:12, color:'var(--ink-soft)' }}>{[pet.breed, pet.size].filter(Boolean).join(' · ') || t(['Sin detalles','No details'])}</div>
                    </div>
                  </div>
                  <a href="#booking" style={{ display:'block', marginTop:12, textAlign:'center', padding:'8px 0', borderRadius:10, background:'var(--bg)', color:'var(--ink)', fontSize:12.5, fontWeight:700, textDecoration:'none', border:'1px solid var(--line)' }}>{t(['Agendar para','Book for'])} {pet.name.split(' ')[0]}</a>
                </div>
              ))}
              <a href="#booking" style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6, background:'var(--bg)', border:'1.5px dashed var(--line)', borderRadius:14, padding:'16px 18px', textDecoration:'none', color:'var(--ink-2)', minHeight:96 }}>
                <span style={{ fontSize:24 }}>＋</span>
                <span style={{ fontSize:12.5, fontWeight:700 }}>{(me.pets||[]).length ? t(['Agregar otra mascota','Add another pet']) : t(['Agendar mi primera cita','Book my first appointment'])}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal de login (magic-link) */}
      {authOpen && (
        <div onClick={() => setAuthOpen(false)} style={{ position:'fixed', inset:0, zIndex:9000, background:'rgba(45,36,33,0.55)', display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
          <div onClick={e => e.stopPropagation()} style={{ background:'#fff', borderRadius:20, padding:'30px 28px', width:'100%', maxWidth:400, boxShadow:'0 24px 60px -16px rgba(45,36,33,0.4)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
              <div style={{ fontSize:12, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--orange)' }}>BPuppy · {t(['Mi cuenta','My account'])}</div>
              <button onClick={() => setAuthOpen(false)} style={{ background:'none', border:'none', fontSize:20, cursor:'pointer', color:'var(--ink-soft)', lineHeight:1 }}>×</button>
            </div>
            {authSent ? (
              <div style={{ textAlign:'center', padding:'10px 0' }}>
                <div style={{ marginBottom:10, color:'var(--orange)', display:'flex', justifyContent:'center' }}><Icon name="mail" size={40} stroke={1.4}/></div>
                <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:20, fontWeight:800, color:'var(--ink)', margin:'0 0 8px' }}>{t(['Revisa tu correo','Check your email'])}</h3>
                <p style={{ fontSize:13.5, color:'var(--ink-soft)', lineHeight:1.6, margin:0 }}>{t(['Te enviamos un enlace a','We sent a link to'])} <b>{authEmail.trim().toLowerCase()}</b>. {t(['Tócalo para entrar — sin contraseñas.','Tap it to sign in — no passwords.'])}</p>
              </div>
            ) : (
              <div>
                <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:22, fontWeight:800, color:'var(--ink)', margin:'4px 0 8px' }}>{t(['Entrar a mi cuenta','Sign in to my account'])}</h3>
                <p style={{ fontSize:13.5, color:'var(--ink-soft)', lineHeight:1.6, margin:'0 0 18px' }}>{t(['Escribe tu correo y te enviamos un enlace para entrar. Ahí verás tu plan, tus mascotas y agendas más rápido.','Enter your email and we will send you a link to sign in. There you can see your plan, your pets, and book faster.'])}</p>
                <input type="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} onKeyDown={e => { if (e.key==='Enter') sendMagicLink(); }} placeholder={t(['tu@correo.com','you@email.com'])} autoFocus
                  style={{ width:'100%', padding:'13px 15px', borderRadius:12, border:'1.5px solid var(--line)', fontFamily:'inherit', fontSize:15, boxSizing:'border-box', marginBottom:authErr?6:14 }} />
                {authErr && <div style={{ fontSize:12.5, color:'#D14343', marginBottom:12 }}>{authErr}</div>}
                <button onClick={sendMagicLink} disabled={authBusy}
                  style={{ width:'100%', padding:'14px', borderRadius:12, border:'none', background:'var(--orange)', color:'#fff', fontFamily:'inherit', fontSize:15, fontWeight:800, cursor:authBusy?'default':'pointer', opacity:authBusy?0.7:1 }}>
                  {authBusy ? t(['Enviando…','Sending…']) : t(['Enviar enlace de acceso','Send sign-in link']) + ' →'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {buyFor && <MembershipPetModal buyFor={buyFor} me={me} billing={billing} onClose={() => setBuyFor(null)} />}
    </div>
  );
}

Object.assign(window, { GroomingApp, BookingCalendar });
