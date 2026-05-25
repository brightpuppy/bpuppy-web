// grooming-views.jsx — Página completa de Grooming BPuppy
const { useState, useEffect, useMemo } = React;

// ── Data ───────────────────────────────────────────────────────────────────────
const SIZES = ['Pequeño\n(< 15 lbs)', 'Mediano\n(15–40 lbs)', 'Grande\n(40–70 lbs)', 'XL\n(70+ lbs)'];
const SIZEKEYS = ['s', 'm', 'l', 'xl'];

const SERVICES = [
  { name: 'Baño completo', desc: 'Shampoo, acondicionador, secado y cepillado', emoji: '🛁', prices: { s: 40, m: 55, l: 70, xl: 90 } },
  { name: 'Baño + Corte', desc: 'Baño completo más corte a tu elección', emoji: '✂️', prices: { s: 65, m: 85, l: 105, xl: 135 } },
  { name: 'Corte solo', desc: 'Corte sin baño (requiere pelaje limpio)', emoji: '💈', prices: { s: 35, m: 45, l: 55, xl: 70 } },
  { name: 'Uñas', desc: 'Corte y lima de uñas', emoji: '💅', prices: { s: 15, m: 15, l: 15, xl: 15 } },
  { name: 'Limpieza de oídos', desc: 'Limpieza profunda con solución ótica', emoji: '👂', prices: { s: 15, m: 15, l: 15, xl: 15 } },
  { name: 'Deslanado / Desenredo', desc: 'Eliminación de pelo muerto o nudos', emoji: '🪮', prices: { s: 30, m: 45, l: 60, xl: 75 } },
  { name: 'Spa VIP', desc: 'Baño, corte, deslanado, uñas, oídos, colonia y bandana', emoji: '⭐', prices: { s: 95, m: 120, l: 150, xl: 185 }, highlight: true },
];

const PACKAGES = [
  {
    name: 'Paquete Básico', emoji: '🐾', color: '#1EB87A', bg: '#E0F7EF',
    includes: ['Baño completo', 'Uñas', 'Limpieza de oídos'],
    prices: { s: 60, m: 75, l: 95, xl: 120 },
    note: 'Ideal para mantenimiento mensual rápido',
  },
  {
    name: 'Paquete Estándar', emoji: '✨', color: '#F58220', bg: '#FFF0E0',
    includes: ['Baño completo', 'Corte a elección', 'Uñas', 'Limpieza de oídos'],
    prices: { s: 75, m: 95, l: 120, xl: 150 },
    note: 'El más popular. Todo lo esencial en una visita',
    popular: true,
  },
  {
    name: 'Spa VIP', emoji: '💎', color: '#7C3AED', bg: '#F0EAFF',
    includes: ['Baño premium con aromaterapia', 'Corte profesional', 'Deslanado completo', 'Uñas + lima', 'Limpieza de oídos', 'Colonia + bandana de regalo'],
    prices: { s: 110, m: 135, l: 165, xl: 210 },
    note: 'La experiencia completa. Para una ocasión especial o mensual',
  },
];

const MEMBERSHIPS = [
  {
    name: 'Plan Esencial', emoji: '🌿', color: '#1EB87A',
    price_month: 59, price_year: 570,
    savings: 138,
    includes: ['1 baño completo al mes', 'Uñas incluidas', '10% dto en servicios adicionales', 'Recordatorios automáticos'],
    cta: 'El plan perfecto para mantenimiento básico constante',
  },
  {
    name: 'Plan Total', emoji: '⭐', color: '#F58220',
    price_month: 99, price_year: 990,
    price_month_promo: 79, price_year_promo: 790,
    savings: 198, savings_promo: 158,
    promo: true,
    includes: ['1 baño + corte al mes', 'Uñas y oídos incluidos', '🚐 Pickup & Delivery incluido (10 mi)', '15% dto en servicios adicionales', 'Prioridad en agenda', 'Foto profesional mensual'],
    cta: 'El más popular. Todo incluido + recogida y entrega.',
    popular: true,
  },
  {
    name: 'Plan VIP', emoji: '💎', color: '#7C3AED',
    price_month: 149, price_year: 1499,
    savings: 289,
    includes: ['Spa VIP mensual completo', '🚐 Pickup & Delivery incluido (radio ilimitado)', '20% dto en todos los servicios', 'Agenda reservada siempre disponible', 'Reporte mensual de salud del pelaje', 'Regalo de cumpleaños para tu mascota'],
    cta: 'La experiencia premium completa con pickup y delivery incluido',
  },
];

const PAYMENT_METHODS = [
  { name: 'Zelle', emoji: '💜', color: '#6D1ED4' },
  { name: 'Venmo', emoji: '💙', color: '#3D95CE' },
  { name: 'CashApp', emoji: '💚', color: '#00D632' },
  { name: 'Tarjeta de crédito', emoji: '💳', color: '#2D2421' },
  { name: 'Efectivo', emoji: '💵', color: '#2D6A4F' },
];

// ── Calendar booking ───────────────────────────────────────────────────────────
function BookingCalendar() {
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

  const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const DAYS_OF_WEEK = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  const TIMES = ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'];

  const sizeKey = { 'Pequeño': 's', 'Mediano': 'm', 'Grande': 'l', 'XL': 'xl' }[size] || 's';

  const toggleService = (name) => {
    setSelectedServices(prev => {
      const n = new Set(prev);
      n.has(name) ? n.delete(name) : n.add(name);
      return n;
    });
  };

  const total = useMemo(() => {
    const base = [...selectedServices].reduce((sum, name) => {
      const sv = SERVICES.find(s => s.name === name);
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

  const buildWhatsApp = () => {
    const dateStr = `${day} de ${MONTHS[month]}, ${year}`;
    const svList = [...selectedServices].join(', ');
    const msg = encodeURIComponent(`Hola BPuppy! Quiero agendar grooming:

🐾 Mascota: ${petName}
📐 Tamaño: ${size}
✂️ Servicios: ${svList}
${pickup ? (isMember ? '🚐 Pickup & Delivery: Incluido (miembro)' : '🚐 Pickup & Delivery: Sí (+$20)') : '📍 Llevo mi mascota al local'}
💰 Total: $${total}
📅 Fecha: ${dateStr} a las ${time}
👤 Nombre: ${ownerName}
📞 Teléfono: ${phone}${promoCode ? '\n🎫 Código promo: ' + promoCode : ''}${notes ? '\n📝 Notas: ' + notes : ''}`)
    return `https://wa.me/18084928294?text=${msg}`;
  };

  const StepDots = () => (
    <div style={{ display: 'flex', marginBottom: 24, gap: 0 }}>
      {[['1','Servicios'],['2','Fecha'],['3','Confirmar']].map(([n, label], i) => {
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
      <StepDots />

      {/* Step 1: Multi-service selection */}
      {step === 1 && (
        <div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Tamaño de tu mascota</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
              {[['Pequeño','<15lb'],['Mediano','15-40'],['Grande','40-70'],['XL','70+']].map(([s,sub]) => (
                <button key={s} onClick={() => setSize(s)} style={{ padding:'8px 4px', borderRadius:10, border:`2px solid ${size===s?'var(--orange)':'var(--line)'}`, background: size===s?'rgba(245,130,32,0.07)':'var(--bg)', cursor:'pointer', fontFamily:'inherit', transition:'all .15s', textAlign:'center' }}>
                  <div style={{ fontSize:12, fontWeight:700, color:'var(--ink)' }}>{s}</div>
                  <div style={{ fontSize:10, color:'var(--ink-soft)' }}>{sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
            Selecciona uno o más servicios
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 14 }}>
            {SERVICES.map(sv => {
              const sel = selectedServices.has(sv.name);
              const price = size ? sv.prices[sizeKey] : null;
              return (
                <button key={sv.name} onClick={() => toggleService(sv.name)} style={{ padding:'12px 10px', borderRadius:14, border:`2px solid ${sel?'var(--orange)':'var(--line)'}`, background: sel?'rgba(245,130,32,0.07)':'var(--bg)', cursor:'pointer', fontFamily:'inherit', transition:'all .15s', textAlign:'left', position:'relative' }}>
                  {sel && <span style={{ position:'absolute', top:8, right:8, width:18, height:18, borderRadius:'50%', background:'var(--orange)', color:'#fff', fontSize:10, fontWeight:800, display:'grid', placeItems:'center' }}>✓</span>}
                  <div style={{ fontSize:20, marginBottom:4 }}>{sv.emoji}</div>
                  <div style={{ fontSize:12.5, fontWeight:700, color:'var(--ink)', lineHeight:1.2, marginBottom:3 }}>{sv.name}</div>
                  {price !== null && <div style={{ fontSize:13, fontWeight:800, color: sel?'var(--orange)':'var(--ink-2)' }}>${price}</div>}
                </button>
              );
            })}
          </div>

          {/* Pickup & Delivery */}
          <div style={{ borderRadius:14, border:`2px solid ${pickup?'var(--orange)':'var(--line)'}`, background: pickup?'rgba(245,130,32,0.06)':'var(--bg)', marginBottom:14, overflow:'hidden' }}>
            <button onClick={() => setPickup(p => !p)} style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:20 }}>🚐</span>
                <div style={{ textAlign:'left' }}>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--ink)' }}>Pickup & Delivery</div>
                  <div style={{ fontSize:11, color:'var(--ink-2)' }}>Recogemos y entregamos en tu casa</div>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                {!isMember && <span style={{ fontSize:12, fontWeight:700, color: pickup?'var(--orange)':'var(--ink-2)' }}>+$20</span>}
                {isMember && <span style={{ fontSize:11, fontWeight:700, color:'#1EB87A' }}>✓ Gratis</span>}
                <div style={{ width:36, height:20, borderRadius:10, background: pickup?'var(--orange)':'var(--line)', position:'relative', transition:'background .2s', flexShrink:0 }}>
                  <span style={{ position:'absolute', top:2, left: pickup?16:2, width:16, height:16, borderRadius:'50%', background:'#fff', transition:'left .2s', boxShadow:'0 1px 3px rgba(0,0,0,0.3)', display:'block' }}/>
                </div>
              </div>
            </button>
            {pickup && (
              <div style={{ padding:'0 14px 12px', borderTop:'1px solid var(--line)' }}>
                {isMember ? (
                  <div style={{ fontSize:12, color:'#1EB87A', fontWeight:600 }}>✓ Pickup & Delivery gratis con tu membresía (radio 10 millas)</div>
                ) : (
                  <div style={{ fontSize:12, color:'var(--ink-2)', lineHeight:1.55 }}>
                    💡 <strong>Consejo:</strong> Con el Plan Total o VIP, el pickup & delivery es gratis en un radio de 10 millas. La disponibilidad de recogida se verifica al confirmar por WhatsApp.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Running total */}
          <div style={{ background: selectedServices.size > 0 ? 'rgba(245,130,32,0.08)' : 'var(--bg)', borderRadius:14, padding:'12px 16px', marginBottom:14, display:'flex', justifyContent:'space-between', alignItems:'center', border:`1.5px solid ${selectedServices.size>0?'rgba(245,130,32,0.3)':'var(--line)'}`, transition:'all .2s' }}>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'var(--ink-2)', textTransform:'uppercase', letterSpacing:'0.04em' }}>Total estimado</div>
              <div style={{ fontSize:10, color:'var(--ink-soft)', marginTop:2 }}>
                {selectedServices.size > 0 ? [...selectedServices].join(' + ') : 'Selecciona servicios arriba'}
              </div>
            </div>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:26, fontWeight:800, color: selectedServices.size>0?'var(--orange)':'var(--ink-soft)' }}>
              {selectedServices.size > 0 ? `$${total}` : '—'}
            </div>
          </div>

          <button onClick={() => canStep2 && setStep(2)} disabled={!canStep2} style={{ width:'100%', padding:'14px', borderRadius:14, border:'none', background: canStep2?'var(--orange)':'var(--line)', color: canStep2?'#fff':'var(--ink-2)', fontFamily:'inherit', fontSize:14, fontWeight:700, cursor: canStep2?'pointer':'default', transition:'all .2s' }}>
            Elegir fecha y hora →
          </button>
          {!size && selectedServices.size > 0 && <p style={{ fontSize:11, color:'var(--orange)', textAlign:'center', margin:'8px 0 0' }}>Selecciona el tamaño para ver precios</p>}
        </div>
      )}

      {/* Step 2: Date */}
      {step === 2 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <button onClick={() => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); setDay(null); }} style={{ background: 'var(--bg)', border: 'none', cursor: 'pointer', borderRadius: 8, padding: '6px 10px', fontSize: 16, color: 'var(--ink-2)' }}>‹</button>
            <div style={{ flex: 1, textAlign: 'center', fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{MONTHS[month]} {year}</div>
            <button onClick={() => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); setDay(null); }} style={{ background: 'var(--bg)', border: 'none', cursor: 'pointer', borderRadius: 8, padding: '6px 10px', fontSize: 16, color: 'var(--ink-2)' }}>›</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 16 }}>
            {DAYS_OF_WEEK.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: 'var(--ink-soft)', padding: '4px 0' }}>{d}</div>)}
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
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Hora disponible</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginBottom: 16 }}>
                {TIMES.map(t => (
                  <button key={t} onClick={() => setTime(t)} style={{ padding: '8px 4px', borderRadius: 10, border: `2px solid ${time === t ? 'var(--orange)' : 'var(--line)'}`, background: time === t ? 'rgba(245,130,32,0.07)' : 'var(--bg)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: time === t ? 700 : 500, color: 'var(--ink)', transition: 'all .15s' }}>{t}</button>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setStep(1)} style={{ flex: 1, padding: '13px', borderRadius: 14, border: '1.5px solid var(--line)', background: 'none', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: 'var(--ink-2)', cursor: 'pointer' }}>← Atrás</button>
            <button onClick={() => day && time && setStep(3)} disabled={!day || !time} style={{ flex: 2, padding: '13px', borderRadius: 14, border: 'none', background: day && time ? 'var(--orange)' : 'var(--line)', color: day && time ? '#fff' : 'var(--ink-2)', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: day && time ? 'pointer' : 'default', transition: 'all .2s' }}>Continuar →</button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <div>
          <h3 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: '0 0 4px' }}>Confirmar cita</h3>
          <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '12px 16px', marginBottom: 18, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--ink)' }}>{[...selectedServices].join(' + ')}</strong> · {size}<br />
            📅 {day} de {['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][month]}, {year} a las {time}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            {[['Nombre de tu mascota 🐾', petName, setPetName, 'Max, Luna, Toby...'],
              ['Tu nombre 👤', ownerName, setOwnerName, 'Nombre completo'],
              ['Teléfono 📞', phone, setPhone, '+1 (305) 000-0000'],
            ].map(([label, val, setter, ph]) => (
              <div key={label}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 4 }}>{label}</div>
                <input value={val} onChange={e => setter(e.target.value)} placeholder={ph} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid var(--line)', background: 'var(--bg)', fontFamily: 'inherit', fontSize: 14, color: 'var(--ink)', outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                  onBlur={e => e.target.style.borderColor = 'var(--line)'} />
              </div>
            ))}
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 4 }}>Notas adicionales (opcional)</div>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Raza, temperamento, algo que debamos saber..." rows={2} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid var(--line)', background: 'var(--bg)', fontFamily: 'inherit', fontSize: 14, color: 'var(--ink)', outline: 'none', resize: 'vertical' }}
                onFocus={e => e.target.style.borderColor = 'var(--orange)'}
                onBlur={e => e.target.style.borderColor = 'var(--line)'} />
            </div>
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--ink-2)', marginBottom: 4 }}>🎫 Código de promoción (opcional)</div>
              <input value={promoCode} onChange={e => setPromoCode(e.target.value.toUpperCase())} placeholder="Ej. APERTURA" style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: `1.5px solid ${promoCode ? 'var(--orange)' : 'var(--line)'}`, background: promoCode ? 'rgba(245,130,32,0.06)' : 'var(--bg)', fontFamily: 'inherit', fontSize: 14, color: 'var(--ink)', outline: 'none', fontWeight: promoCode ? 700 : 400, letterSpacing: promoCode ? '0.08em' : 0 }}/>
              {promoCode === 'APERTURA' && <div style={{ fontSize:11, color:'#1EB87A', fontWeight:700, marginTop:4 }}>✓ ¡Código de apertura aplicado! Primer baño + corte gratis en tu visita.</div>}
            </div>
            <button onClick={() => setIsMember(m => !m)} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', borderRadius:10, border:`1.5px solid ${isMember?'#1EB87A':'var(--line)'}`, background: isMember?'rgba(30,184,122,0.08)':'var(--bg)', cursor:'pointer', fontFamily:'inherit', width:'100%', textAlign:'left' }}>
              <div style={{ width:20, height:20, borderRadius:4, border:`2px solid ${isMember?'#1EB87A':'var(--line)'}`, background: isMember?'#1EB87A':'transparent', display:'grid', placeItems:'center', flexShrink:0, transition:'all .15s' }}>{isMember && <span style={{ color:'#fff', fontSize:12, fontWeight:800 }}>✓</span>}</div>
              <div>
                <div style={{ fontSize:12.5, fontWeight:700, color:'var(--ink)' }}>Soy miembro Plan Total o VIP</div>
                <div style={{ fontSize:11, color:'#1EB87A', fontWeight:600 }}>Pickup & Delivery gratis en radio de 10 millas</div>
              </div>
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setStep(2)} style={{ flex: 1, padding: '13px', borderRadius: 14, border: '1.5px solid var(--line)', background: 'none', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: 'var(--ink-2)', cursor: 'pointer' }}>← Atrás</button>
            <a href={canConfirm ? buildWhatsApp() : '#'} target="_blank" rel="noopener noreferrer" style={{ flex: 2, padding: '13px', borderRadius: 14, background: canConfirm ? '#25D366' : 'var(--line)', color: canConfirm ? '#fff' : 'var(--ink-2)', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, pointerEvents: canConfirm ? 'all' : 'none', transition: 'all .2s' }}>
              💬 Confirmar por WhatsApp
            </a>
          </div>
          <p style={{ fontSize: 10.5, color: 'var(--ink-soft)', textAlign: 'center', margin: '10px 0 0' }}>Recibirás confirmación en menos de 2 horas en horario laboral</p>
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
            <span style={{ fontSize:28 }}>🎉</span>
            <div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:20, fontWeight:800, color:'#fff' }}>¡Código APERTURA aplicado!</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,0.85)', marginTop:2 }}>Muestra esta pantalla al llegar. Tu primer baño + corte es GRATIS.</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background:'rgba(255,255,255,0.2)', border:'none', color:'#fff', borderRadius:999, padding:'8px 16px', cursor:'pointer', fontFamily:'inherit', fontWeight:700, fontSize:13 }}>Cerrar</button>
          </div>
        ) : (
          <div style={{ display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
            <div style={{ flex:'1 1 260px' }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.2)', borderRadius:999, padding:'3px 12px', marginBottom:6 }}>
                <span style={{ fontSize:10, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'#fff' }}>🎉 Oferta de Apertura · Tiempo Limitado</span>
              </div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(20px,3vw,32px)', fontWeight:800, color:'#fff', letterSpacing:'-0.03em', lineHeight:1.1 }}>
                Primer baño + corte <span style={{ background:'rgba(255,255,255,0.25)', borderRadius:6, padding:'2px 8px' }}>GRATIS</span>
              </div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.85)', marginTop:5 }}>Nuevo local · Código <strong>APERTURA</strong> · Solo por tiempo limitado</div>
            </div>
            <form onSubmit={claim} style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center', flex:'1 1 300px' }}>
              <input value={name} onChange={e => setName(e.target.value)} required placeholder="Tu nombre *"
                style={{ flex:'1 1 120px', padding:'9px 14px', borderRadius:999, border:'none', fontFamily:'inherit', fontSize:13, outline:'none', background:'rgba(255,255,255,0.95)' }}/>
              <input value={phone} onChange={e => setPhone(e.target.value)} required type="tel" placeholder="Número de teléfono *"
                style={{ flex:'1 1 120px', padding:'9px 14px', borderRadius:999, border:'none', fontFamily:'inherit', fontSize:13, outline:'none', background:'rgba(255,255,255,0.95)' }}/>
              <button type="submit" disabled={loading}
                style={{ padding:'9px 18px', borderRadius:999, background:'#2D2421', color:'#fff', border:'none', fontFamily:'inherit', fontWeight:800, fontSize:13, cursor:'pointer', whiteSpace:'nowrap', flexShrink:0 }}>
                {loading ? 'Aplicando...' : '🎫 Reclamar Oferta'}
              </button>
            </form>
            <button onClick={() => setOpen(false)} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.7)', fontSize:22, cursor:'pointer', padding:4, flexShrink:0, lineHeight:1 }}>×</button>
          </div>
        )}
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

  // Init Supabase for banner form
  useEffect(() => {
    if (!window._groomSb) {
      try {
        const SU='https://oqqwmcplljirbreowrll.supabase.co';
        const SK='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4';
        window._groomSb = supabase.createClient(SU, SK);
      } catch(e) {}
    }
  }, []);

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
              <span style={{ fontSize:15 }}>📍</span>
              <div>
                <div style={{ fontSize:9.5, fontWeight:800, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--orange)', marginBottom:1 }}>Próximamente abriendo</div>
                <div style={{ fontSize:12, fontWeight:600, color:'var(--ink)' }}>5604 Kalogridis Rd, Haines City, FL 33844</div>
              </div>
            </div>

            <div style={{ fontSize:15, fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', color:'#3A8FC7', marginBottom:16 }}>BPuppy Grooming</div>

            <h1 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(32px,4.5vw,58px)', fontWeight:800, color:'var(--ink)', margin:'0 0 16px', letterSpacing:'-0.035em', lineHeight:1.05 }}>
              Tu mascota merece<br/><em style={{ fontFamily:'Instrument Serif,Georgia,serif', fontStyle:'italic', fontWeight:400, color:'var(--orange)' }}>verse increíble</em>
            </h1>

            <p style={{ fontSize:15, color:'var(--ink-2)', margin:'0 0 28px', lineHeight:1.65, maxWidth:400 }}>
              Baño, corte, deslanado y spa con productos premium. Recogida y entrega disponible. Planes de membresía con descuento anual.
            </p>

            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <a href="#booking" style={{ padding:'13px 24px', borderRadius:14, background:'var(--orange)', color:'#fff', fontFamily:'inherit', fontSize:14, fontWeight:700, textDecoration:'none', boxShadow:'0 8px 24px -8px rgba(245,130,32,0.45)' }}>Agendar cita ahora</a>
              <a href="#memberships" style={{ padding:'13px 24px', borderRadius:14, background:'var(--bg)', color:'var(--ink)', fontFamily:'inherit', fontSize:14, fontWeight:600, textDecoration:'none', border:'1.5px solid var(--line)' }}>Ver membresías</a>
            </div>
          </div>

        </div>
      </div>

      {/* Opening banner - below hero */}
      <OpeningBanner/>

      {/* Trust bar */}
      <div style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
        <div className="container" style={{ display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[['✂️', 'Grooming profesional'], ['🚐', 'Pickup & Delivery'], ['🌿', 'Productos premium'], ['⏰', 'Lun–Sáb 9am–6pm'], ['💬', 'Confirmación por WhatsApp']].map(([ic, label]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px', borderRight: '1px solid var(--line)', whiteSpace: 'nowrap', flexShrink: 0 }}>
              <span style={{ fontSize: 18 }}>{ic}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink-2)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '60px 0 0' }}>

        {/* Tab nav */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--paper)', borderRadius: 14, padding: 5, marginBottom: 40, width: 'fit-content' }}>
          {[['servicios', '📋 Servicios'], ['paquetes', '📦 Paquetes'], ['memberships', '🏆 Membresías']].map(([id, label]) => (
            <button key={id} onClick={() => { setTab(id); if (id === 'memberships') document.getElementById('memberships')?.scrollIntoView(); }} style={{ padding: '9px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: tab === id ? 700 : 500, background: tab === id ? 'var(--orange)' : 'transparent', color: tab === id ? '#fff' : 'var(--ink-2)', transition: 'all .15s' }}>
              {label}
            </button>
          ))}
        </div>

        {/* Services pricing */}
        {tab === 'servicios' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
              <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Precios por servicio</h2>
              <div style={{ display: 'flex', gap: 6 }}>
                {['S', 'M', 'L', 'XL'].map((s, i) => (
                  <button key={s} onClick={() => setSizeIdx(i)} style={{ padding: '5px 14px', borderRadius: 999, border: 'none', background: sizeIdx === i ? 'var(--orange)' : 'var(--bg)', color: sizeIdx === i ? '#fff' : 'var(--ink-2)', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{s}</button>
                ))}
              </div>
              <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{['Pequeño (< 15 lbs)', 'Mediano (15-40 lbs)', 'Grande (40-70 lbs)', 'XL (70+ lbs)'][sizeIdx]}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12, marginBottom: 40 }}>
              {SERVICES.map(sv => (
                <div key={sv.name} style={{ background: sv.highlight ? 'linear-gradient(135deg,rgba(245,130,32,0.10),rgba(232,93,117,0.10))' : 'var(--paper)', borderRadius: 16, padding: '18px 14px', border: sv.highlight ? '1.5px solid rgba(245,130,32,0.3)' : '1px solid var(--line)', textAlign: 'center', position: 'relative' }}>
                  {sv.highlight && <div style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', background: 'var(--orange)', color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 999, whiteSpace: 'nowrap' }}>COMPLETO</div>}
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{sv.emoji}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.25, marginBottom: 6 }}>{sv.name}</div>
                  <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 22, fontWeight: 800, color: sv.highlight ? 'var(--orange)' : 'var(--ink)' }}>${sv.prices[sizeKey]}</div>
                  <div style={{ fontSize: 10, color: 'var(--ink-soft)', marginTop: 4, lineHeight: 1.4 }}>{sv.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Packages */}
        {tab === 'paquetes' && (
          <div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px' }}>Paquetes combinados</h2>
            <p style={{ color: 'var(--ink-2)', marginBottom: 24 }}>Selecciona el tamaño de tu mascota:</p>
            <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
              {['S', 'M', 'L', 'XL'].map((s, i) => (
                <button key={s} onClick={() => setSizeIdx(i)} style={{ padding: '6px 16px', borderRadius: 999, border: 'none', background: sizeIdx === i ? 'var(--orange)' : 'var(--bg)', color: sizeIdx === i ? '#fff' : 'var(--ink-2)', fontFamily: 'inherit', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{s}</button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 40 }}>
              {PACKAGES.map(pkg => (
                <div key={pkg.name} style={{ background: 'var(--paper)', borderRadius: 20, padding: '24px', border: pkg.popular ? `2px solid ${pkg.color}` : '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
                  {pkg.popular && <div style={{ position: 'absolute', top: 16, right: 16, background: pkg.color, color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 999 }}>MÁS POPULAR</div>}
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{pkg.emoji}</div>
                  <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}>{pkg.name}</div>
                  <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 30, fontWeight: 800, color: pkg.color, marginBottom: 4 }}>${pkg.prices[sizeKey]}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginBottom: 16 }}>{pkg.note}</div>
                  <ul style={{ padding: 0, margin: '0 0 20px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {pkg.includes.map(item => (
                      <li key={item} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--ink-2)' }}>
                        <span style={{ color: pkg.color, fontWeight: 700, flexShrink: 0 }}>✓</span>{item}
                      </li>
                    ))}
                  </ul>
                  <a href="#booking" style={{ display: 'block', textAlign: 'center', padding: '11px', borderRadius: 12, background: pkg.color, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Agendar este paquete</a>
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
            <div className="eyebrow" style={{ marginBottom: 10 }}>Reserva tu cita</div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 800, color: 'var(--ink)', margin: '0 0 14px', letterSpacing: '-0.03em' }}>
              Agenda rápido,<br />confirmamos por WhatsApp
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.65, margin: '0 0 24px' }}>
              Selecciona servicio, fecha y hora. Te confirmamos disponibilidad en menos de 2 horas. También ofrecemos <strong>recogida y entrega</strong> — pregunta al reservar.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['📍', 'Próximamente · Haines City, FL', '5604 Kalogridis Rd, Haines City, FL 33844'], ['🚐', 'Pickup & Delivery', 'Recogemos y entregamos en tu casa (+$20)'], ['⏰', 'Horario', 'Lun – Sáb: 9:00 AM – 6:00 PM']].map(([ic, title, sub]) => (
                <div key={title} style={{ display: 'flex', gap: 12, padding: '14px 16px', background: 'var(--paper)', borderRadius: 12, border: '1px solid var(--line)' }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{ic}</span>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)' }}>{title}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, padding: '16px 18px', background: 'rgba(37,211,102,0.08)', borderRadius: 12, border: '1px solid rgba(37,211,102,0.25)' }}>
              <p style={{ fontSize: 12.5, color: 'var(--ink-2)', margin: '0 0 10px', lineHeight: 1.55 }}>
                💡 <strong>Recomendamos Acuity Scheduling</strong> para gestionar tu agenda desde el celular: confirmaciones automáticas, recordatorios a clientes, pagos de depósito y reportes. Desde $20/mes.
              </p>
              <a href="https://acuityscheduling.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 700, color: '#1EB87A', textDecoration: 'none' }}>Ver Acuity Scheduling →</a>
            </div>
          </div>
          <BookingCalendar />
        </div>
      </div>

      {/* Location map */}
      <div style={{ background:'#fff', padding:'60px 0 0', borderTop:'1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24, flexWrap:'wrap' }}>
            <div>
              <div className="eyebrow" style={{ marginBottom:6 }}>Nuestra próxima ubicación</div>
              <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(22px,3vw,32px)', fontWeight:800, color:'var(--ink)', margin:0, letterSpacing:'-0.025em' }}>
                BPuppy Grooming · Haines City, FL
              </h2>
            </div>
            <a href="https://maps.google.com/?q=5604+Kalogridis+Rd,+Haines+City,+FL+33844" target="_blank" rel="noreferrer"
              style={{ marginLeft:'auto', display:'inline-flex', alignItems:'center', gap:8, padding:'10px 18px', borderRadius:999, background:'var(--orange)', color:'#fff', fontSize:13, fontWeight:700, textDecoration:'none', whiteSpace:'nowrap', boxShadow:'0 6px 20px -6px rgba(245,130,32,0.45)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Abrir en Maps
            </a>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20, padding:'12px 18px', background:'rgba(245,130,32,0.06)', border:'1px solid rgba(245,130,32,0.2)', borderRadius:12 }}>
            <span style={{ fontSize:18 }}>📍</span>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:'var(--ink)' }}>5604 Kalogridis Rd, Haines City, FL 33844</div>
              <div style={{ fontSize:12, color:'var(--orange)', fontWeight:600 }}>Próximamente abriendo · ¡Síguenos para el anuncio oficial!</div>
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
            <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, background: 'rgba(245,130,32,0.18)', color: 'var(--orange)', fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Membresías</div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.03em' }}>
              Ahorra pagando anual
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>Compromiso mensual o pago anual con descuento garantizado</p>
            <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: 4, width: 'fit-content', margin: '0 auto' }}>
              {[['month', 'Mensual'], ['year', 'Anual (ahorra 20%)']].map(([id, label]) => (
                <button key={id} onClick={() => setBilling(id)} style={{ padding: '8px 18px', borderRadius: 9, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, background: billing === id ? '#fff' : 'transparent', color: billing === id ? 'var(--ink)' : 'rgba(255,255,255,0.6)', transition: 'all .15s' }}>{label}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 40 }}>
            {MEMBERSHIPS.map(m => (
              <div key={m.name} style={{ background: m.popular ? m.color : 'rgba(255,255,255,0.07)', borderRadius: 20, padding: '28px 24px', border: m.popular ? 'none' : '1px solid rgba(255,255,255,0.12)', position: 'relative' }}>
                {m.popular && <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: '#FFD700', color: '#2D2421', fontSize: 10, fontWeight: 900, padding: '4px 14px', borderRadius: 999, whiteSpace: 'nowrap' }}>⭐ MÁS POPULAR</div>}
                {m.promo && <div style={{ position: 'absolute', top: -10, right: 16, background: '#FF3B30', color: '#fff', fontSize: 9, fontWeight: 900, padding: '3px 10px', borderRadius: 999, whiteSpace: 'nowrap', letterSpacing: '0.06em' }}>APERTURA</div>}
                <div style={{ fontSize: 32, marginBottom: 10 }}>{m.emoji}</div>
                <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{m.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                  {m.promo && (
                    <span style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 22, fontWeight: 800, color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through' }}>
                      ${billing === 'month' ? m.price_month : Math.round(m.price_year / 12)}
                    </span>
                  )}
                  <span style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 36, fontWeight: 800, color: '#fff' }}>
                    ${billing === 'month' ? (m.price_month_promo || m.price_month) : Math.round((m.price_year_promo || m.price_year) / 12)}
                  </span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>/mes</span>
                </div>
                {billing === 'year' && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>${m.price_year_promo || m.price_year}/año · ahorras ${m.savings_promo || m.savings}</div>}
                {m.promo && <div style={{ fontSize: 11, color: '#FFD700', fontWeight: 700, marginBottom: 8 }}>🎉 Precio de apertura · Solo por tiempo limitado</div>}
                <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.65)', margin: '0 0 18px', lineHeight: 1.55 }}>{m.cta}</p>
                <ul style={{ padding: 0, margin: '0 0 22px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {m.includes.map(item => (
                    <li key={item} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
                      <span style={{ color: m.popular ? '#fff' : m.color, fontWeight: 700, flexShrink: 0 }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/18084928294" target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: 12, background: m.popular ? 'rgba(255,255,255,0.2)' : m.color, color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Suscribirse ahora</a>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Métodos de pago aceptados</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {PAYMENT_METHODS.map(pm => (
                <span key={pm.name} style={{ padding: '6px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{pm.emoji} {pm.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div style={{ background: 'var(--paper)', padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--ink)', margin: '0 0 24px' }}>Nuestro trabajo</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 12 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <image-slot key={i} id={`grooming-work-${i}`} shape="rounded" radius="14" placeholder={['Antes / Después', 'Corte creativo', 'Spa VIP', 'Golden groomed', 'Schnauzer cortado', 'Poodle teddy bear', 'Shih Tzu spa', 'Cachorro primer baño'][i]} style={{ aspectRatio: '1', display: 'block' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Blog articles */}
      {groomingArts.length > 0 && (
        <div style={{ background: 'var(--bg)', padding: '60px 0 80px' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 22, fontWeight: 800, color: 'var(--ink)', margin: 0 }}>Artículos de grooming</h2>
              <a href="/blog" style={{ fontSize: 13, fontWeight: 700, color: 'var(--orange)', textDecoration: 'none' }}>Ver todos →</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20 }}>
              {groomingArts.slice(0, 4).map(art => (
                <a key={art.id} href={`/blog?art=${art.id}`} style={{ textDecoration: 'none', display: 'flex', gap: 14, padding: '16px', background: 'var(--paper)', borderRadius: 16, border: '1px solid var(--line)', transition: 'box-shadow .2s, transform .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow='0 8px 24px -8px rgba(45,36,33,0.16)'; e.currentTarget.style.transform='translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'; }}>
                  <span style={{ fontSize: 36, flexShrink: 0 }}>{art.emoji}</span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: '#9C27B0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Grooming</div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 4 }}>{art.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>⏱ {art.read} min · Leer artículo →</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { GroomingApp, BookingCalendar });
