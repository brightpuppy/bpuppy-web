// puppy-detalle.jsx — Puppy detail page · BPuppy design system

// ── Supabase ──────────────────────────────────────────────────────────────────
const PD_SUPA_URL = 'https://oqqwmcplljirbreowrll.supabase.co';
const PD_SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4';
const pdSb = (() => { try { return supabase.createClient(PD_SUPA_URL, PD_SUPA_KEY); } catch(e) { return null; } })();

// ── Helpers ───────────────────────────────────────────────────────────────────
function pdAge(p) {
  const w = p.age_weeks || (p.birth_date ? Math.floor((Date.now() - new Date(p.birth_date)) / 604800000) : null);
  if (!w && w !== 0) return null;
  if (w < 16) return w + ' semanas';
  if (w < 52) return Math.floor(w / 4) + ' meses';
  return Math.floor(w / 52) + ' años';
}
function pdPhotos(p) {
  if (Array.isArray(p.photos) && p.photos.length) return p.photos;
  if (p.photo_url) return [p.photo_url];
  return [];
}

// ── Tag pill ──────────────────────────────────────────────────────────────────
function PdTag({ children, accent, green }) {
  const bg    = green ? 'rgba(16,185,129,0.1)' : accent ? 'rgba(245,130,32,0.12)' : 'var(--paper)';
  const color = green ? '#065F46'               : accent ? 'var(--orange)'          : 'var(--ink-2)';
  const border= green ? 'rgba(16,185,129,0.22)' : accent ? 'rgba(245,130,32,0.25)' : 'var(--line)';
  return (
    <span style={{ padding:'6px 13px', borderRadius:999, fontSize:12, fontWeight:600, background:bg, color, border:`1px solid ${border}`, display:'inline-block' }}>
      {children}
    </span>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────────
function PdGallery({ photos, name, status }) {
  const [cur, setCur] = React.useState(0);
  const ph = photos[cur];
  const statusLabel = status === 'available' ? 'Disponible' : status === 'reserved' ? 'Reservado' : null;
  const statusBg    = status === 'available' ? 'var(--orange)' : '#2D2421';

  return (
    <div>
      <div style={{ position:'relative', borderRadius:'var(--r)', overflow:'hidden', aspectRatio:'1/1', background:'var(--bg-2)', boxShadow:'var(--shadow-card)' }}>
        {ph
          ? <img src={ph} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} onError={e => e.target.style.display = 'none'}/>
          : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:80 }}>🐶</div>
        }
        {statusLabel && (
          <div style={{ position:'absolute', top:16, left:16, background:statusBg, color:'#fff', padding:'6px 14px', borderRadius:999, fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase' }}>
            {statusLabel}
          </div>
        )}
      </div>
      {photos.length > 1 && (
        <div style={{ display:'flex', gap:8, marginTop:12, flexWrap:'wrap' }}>
          {photos.map(function(u, i) {
            return (
              <button key={i} onClick={function(){ setCur(i); }}
                style={{ width:64, height:64, borderRadius:10, overflow:'hidden', border: cur===i ? '2.5px solid var(--orange)' : '2px solid var(--line)', padding:0, cursor:'pointer', background:'var(--bg-2)', flexShrink:0 }}>
                <img src={u} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Financing Calculator ──────────────────────────────────────────────────────
const PD_FIN_PLANS = [
  { id:'k4',   name:'Klarna',   sub:'4 pagos · Sin interés', type:'split', count:4,  apr:0,  brandColor:'#FFB3C7', brandText:'#1A1A1A' },
  { id:'pp6',  name:'PayPal',   sub:'6 pagos · Sin interés', type:'split', count:6,  apr:0,  brandColor:'#003087', brandText:'#fff'    },
  { id:'af12', name:'Affirm',   sub:'12 meses · ~15% APR',   type:'loan',  count:12, apr:15, brandColor:'#0FA0EA', brandText:'#fff'    },
  { id:'af24', name:'Affirm',   sub:'24 meses · ~18% APR',   type:'loan',  count:24, apr:18, brandColor:'#0FA0EA', brandText:'#fff'    },
];

function pdCalcPmt(fin, plan) {
  if (fin <= 0) return { pmt:0, total:fin };
  if (plan.type === 'split') return { pmt: fin / plan.count, total: fin };
  const r = plan.apr / 100 / 12, n = plan.count;
  const m = r === 0 ? fin / n : fin * r / (1 - Math.pow(1 + r, -n));
  return { pmt:m, total:m*n };
}
function pdFmt(n) { return '$' + Math.round(n).toLocaleString('en-US'); }

function PdFinCalc({ price }) {
  const [dp, setDp]   = React.useState(0);
  const [sel, setSel] = React.useState('k4');
  const fin  = Math.max(0, (price || 0) - dp);
  const plan = PD_FIN_PLANS.find(function(p){ return p.id === sel; }) || PD_FIN_PLANS[0];
  const { pmt } = pdCalcPmt(fin, plan);

  return (
    <div style={{ background:'#fff', border:'1px solid var(--line)', borderRadius:'var(--r)', padding:28 }}>
      <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--orange)', marginBottom:6 }}>Financiamiento</div>
      <div style={{ fontFamily:'var(--display)', fontSize:24, fontWeight:700, letterSpacing:'-0.02em', marginBottom:20, color:'var(--ink)' }}>
        Llévalo a casa hoy
      </div>

      {/* Down payment slider */}
      <div style={{ marginBottom:18 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
          <span style={{ fontSize:12, fontWeight:600, color:'var(--ink-2)' }}>Pago inicial</span>
          <span style={{ fontSize:13, fontWeight:700, color:'var(--orange)' }}>
            {price ? Math.round((dp / price) * 100) : 0}%
          </span>
        </div>
        <input type="range" min="0" max={price || 5000} step="50" value={dp}
          onChange={function(e){ setDp(+e.target.value); }}
          style={{ width:'100%', accentColor:'var(--orange)', marginBottom:6 }}/>
        <div style={{ fontSize:16, fontWeight:700, color:'var(--ink)' }}>{pdFmt(dp)}</div>
      </div>

      {/* Amount to finance */}
      <div style={{ background:'var(--bg)', borderRadius:10, padding:'10px 16px', marginBottom:18, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:12, color:'var(--ink-2)', fontWeight:600 }}>A financiar</span>
        <span style={{ fontSize:20, fontWeight:800, color:'var(--ink)' }}>{pdFmt(fin)}</span>
      </div>

      {/* Plan selector */}
      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 }}>
        {PD_FIN_PLANS.map(function(pl) {
          const r    = pdCalcPmt(fin, pl);
          const active = sel === pl.id;
          const lbl  = pl.type === 'split' ? 'por pago' : '/mes';
          return (
            <button key={pl.id} onClick={function(){ setSel(pl.id); }}
              style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 16px', borderRadius:12, cursor:'pointer', border: active ? `2px solid ${pl.brandColor}` : '1.5px solid var(--line)', background: active ? pl.brandColor+'18' : 'var(--bg)', fontFamily:'var(--body)', transition:'all .15s' }}>
              <div style={{ textAlign:'left' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ fontSize:11, fontWeight:900, padding:'2px 8px', borderRadius:999, background:pl.brandColor, color:pl.brandText, letterSpacing:'0.02em' }}>{pl.name}</span>
                </div>
                <div style={{ fontSize:11, color: active ? 'var(--ink-2)' : 'var(--ink-2)', marginTop:3 }}>{pl.sub}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:17, fontWeight:800, color: active ? 'var(--ink)' : 'var(--ink)' }}>{pdFmt(r.pmt)}</div>
                <div style={{ fontSize:10, color:'var(--ink-2)' }}>{lbl}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ fontSize:11, color:'var(--ink-soft)', textAlign:'center', fontStyle:'italic', marginBottom:16 }}>
        * Estimaciones. Términos finales dependen de aprobación de crédito.
      </div>

      {/* Action buttons */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8 }}>
        {[
          { label:'WhatsApp', icon:'💬', bg:'#25D366', href:`https://wa.me/18084928294?text=Hola, me interesa financiar un cachorro`, color:'#fff' },
          { label:'SMS',      icon:'📱', bg:'var(--bg)', href:`sms:+18084928294?body=Hola, me interesa financiar un cachorro`, color:'var(--ink)', bdr:'var(--line)' },
          { label:'Aplicar',  icon:'✓',  bg:'var(--orange)', href:'legal/financing.html', color:'#fff', blank:true },
        ].map(function(b, i) {
          return (
            <a key={i} href={b.href} target={b.blank ? '_blank' : '_self'} rel="noreferrer"
              style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'10px 6px', borderRadius:10, background:b.bg, color:b.color, textDecoration:'none', fontSize:11, fontWeight:700, border: b.bdr ? `1px solid ${b.bdr}` : 'none' }}>
              <span style={{ fontSize:15 }}>{b.icon}</span>
              <span>{b.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ── Includes section ──────────────────────────────────────────────────────────
function PdIncludes({ p }) {
  const items = [
    { icon:'💉', label:'Vacunas al día',                ok: p.vaccinated  },
    { icon:'📋', label:'Certificado de salud',            ok: p.health_cert },
    { icon:'🏠', label:'Criado en familia',              ok: true          },
    { icon:'📡', label:'Microchip incluido',              ok: true          },
    { icon:'🛡️', label:'Garantía de salud',              ok: true          },
    { icon:'✈️', label:'Entrega a nivel nacional',        ok: true          },
    { icon:'💬', label:'Asesoría 24/7 — chat y equipo',  ok: true          },
    { icon:'🎁', label:'Kit: alimento, platitos y juguete', ok: true        },
  ];
  return (
    <section style={{ padding:'clamp(48px,6vw,80px) clamp(20px,5vw,80px)', background:'#fff', borderTop:'1px solid var(--line)' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--orange)', marginBottom:10 }}>Lo que incluye</div>
        <h2 style={{ fontFamily:'var(--display)', fontSize:'clamp(26px,4vw,42px)', fontWeight:700, letterSpacing:'-0.025em', margin:'0 0 32px', color:'var(--ink)' }}>
          Todo listo para su nuevo hogar
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:12 }}>
          {items.filter(function(it){ return it.ok !== false; }).map(function(it, i) {
            return (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 18px', borderRadius:'var(--r-sm)', background:'var(--bg)', border:'1px solid var(--line)' }}>
                <span style={{ fontSize:22, flexShrink:0 }}>{it.icon}</span>
                <span style={{ fontSize:13, fontWeight:600, color:'var(--ink)', lineHeight:1.3 }}>{it.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Breed section ─────────────────────────────────────────────────────────────
function PdRatingBar({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
      <span style={{ fontSize:13, color:'var(--ink-2)', minWidth:160, lineHeight:1.3 }}>{label}</span>
      <div style={{ flex:1, height:6, background:'var(--line)', borderRadius:3, overflow:'hidden' }}>
        <div style={{ height:'100%', width:(value/5*100)+'%', background:'var(--orange)', borderRadius:3 }}/>
      </div>
      <span style={{ fontSize:11, fontWeight:700, color:'var(--orange)', minWidth:28, textAlign:'right' }}>{value}/5</span>
    </div>
  );
}

function PdStatCard({ icon, label, value, wide }) {
  return (
    <div style={{ padding:'14px 16px', borderRadius:'var(--r-sm)', background:'var(--bg)', border:'1px solid var(--line)', gridColumn: wide ? 'span 2' : 'auto' }}>
      <div style={{ fontSize:20, marginBottom:6 }}>{icon}</div>
      <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--ink-2)', marginBottom:3 }}>{label}</div>
      <div style={{ fontSize:14, fontWeight:700, color:'var(--ink)', textTransform:'capitalize' }}>{value}</div>
    </div>
  );
}

function PdBreed({ breed: b }) {
  const ratings = [
    ['Con familias',         b.rating_family],
    ['Con niños',             b.rating_kids],
    ['Con otras mascotas',    b.rating_other_pets],
    ['Nivel de energía',      b.rating_energy],
    ['Entrenabilidad',        b.rating_trainability],
    ['Apto para apartamento', b.rating_apartment],
  ].filter(function(r){ return r[1]; });

  return (
    <section style={{ padding:'clamp(48px,6vw,80px) clamp(20px,5vw,80px)', background:'#fff', borderTop:'1px solid var(--line)' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--orange)', marginBottom:10 }}>Sobre la raza</div>
        <h2 style={{ fontFamily:'var(--display)', fontSize:'clamp(26px,4vw,42px)', fontWeight:700, letterSpacing:'-0.025em', margin:'0 0 32px', color:'var(--ink)' }}>
          {b.name}
        </h2>
        <div className="pd-breed-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48 }}>
          <div>
            {b.description && <p style={{ fontSize:15, color:'var(--ink-2)', lineHeight:1.75, marginBottom:24 }}>{b.description}</p>}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {b.weight_min_lbs && b.weight_max_lbs && <PdStatCard icon="⚖️" label="Peso adulto" value={`${b.weight_min_lbs}–${b.weight_max_lbs} lbs`}/>}
              {b.lifespan_min   && b.lifespan_max   && <PdStatCard icon="⏳" label="Longevidad"   value={`${b.lifespan_min}–${b.lifespan_max} años`}/>}
              {b.coat_type      && <PdStatCard icon="✨" label="Pelaje"      value={b.coat_type}/>}
              {b.best_for_home  && <PdStatCard icon="🏠" label="Ideal para"  value={b.best_for_home} wide={true}/>}
            </div>
          </div>
          {ratings.length > 0 && (
            <div>
              {ratings.map(function(r, i){ return <PdRatingBar key={i} label={r[0]} value={r[1]}/>; })}
              <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop:18 }}>
                {b.hypoallergenic === true  && <PdTag green>✓ Hipoalergénico</PdTag>}
                {b.hypoallergenic === false && <PdTag>No hipoalergénico</PdTag>}
                {b.good_for_first_time === true  && <PdTag green>✓ Ideal para principiantes</PdTag>}
                {b.good_for_first_time === false && <PdTag>Mejor con experiencia</PdTag>}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Parents + Financing ───────────────────────────────────────────────────────
function PdParentCard({ parent: par, role }) {
  const ph = par.photo_url || null;
  return (
    <div style={{ display:'flex', gap:14, padding:16, background:'var(--bg)', border:'1px solid var(--line)', borderRadius:'var(--r-sm)', alignItems:'center' }}>
      <div style={{ width:80, height:80, borderRadius:10, background:'var(--bg-2)', overflow:'hidden', flexShrink:0 }}>
        {ph
          ? <img src={ph} alt={par.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32 }}>{role === 'Mamá' ? '👩' : '👨'}</div>
        }
      </div>
      <div>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--orange)', marginBottom:2 }}>{role}</div>
        <div style={{ fontFamily:'var(--display)', fontSize:18, fontWeight:700, color:'var(--ink)', marginBottom:3 }}>{par.name}</div>
        <div style={{ fontSize:12, color:'var(--ink-2)' }}>
          {[par.breed, par.color, par.weight_lbs && par.weight_lbs + ' lbs'].filter(Boolean).join(' · ')}
        </div>
        {par.pedigree_org && <div style={{ fontSize:10, color:'var(--orange)', marginTop:5 }}>📜 {par.pedigree_org}{par.pedigree_number ? ' · ' + par.pedigree_number : ''}</div>}
      </div>
    </div>
  );
}

function PdFamilyFin({ mom, dad, price }) {
  return (
    <section style={{ padding:'clamp(48px,6vw,80px) clamp(20px,5vw,80px)', background:'#fff', borderTop:'1px solid var(--line)' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <div className="pd-family-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:48 }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--orange)', marginBottom:10 }}>Sus padres</div>
            <h2 style={{ fontFamily:'var(--display)', fontSize:'clamp(24px,3.5vw,38px)', fontWeight:700, letterSpacing:'-0.025em', margin:'0 0 24px', color:'var(--ink)' }}>
              Conoce a su familia
            </h2>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {mom && <PdParentCard parent={mom} role="Mamá"/>}
              {dad && <PdParentCard parent={dad} role="Papá"/>}
            </div>
          </div>
          <div>
            {price && <PdFinCalc price={price}/>}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Mini card (siblings / similar) ────────────────────────────────────────────
function PdMiniCard({ p }) {
  const ph = (Array.isArray(p.photos) && p.photos[0]) || p.photo_url || null;
  return (
    <a href={`Puppy-Detalle.html?id=${p.id}`}
      style={{ display:'block', textDecoration:'none', borderRadius:'var(--r-sm)', overflow:'hidden', background:'#fff', border:'1px solid var(--line)', transition:'transform .2s, box-shadow .2s' }}
      onMouseEnter={function(e){ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-card)'; }}
      onMouseLeave={function(e){ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
      <div style={{ aspectRatio:'1/1', background:'var(--bg-2)', overflow:'hidden' }}>
        {ph
          ? <img src={ph} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
          : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:48 }}>🐶</div>
        }
      </div>
      <div style={{ padding:'14px 16px' }}>
        <div style={{ fontFamily:'var(--display)', fontSize:17, fontWeight:700, color:'var(--ink)', marginBottom:3 }}>{p.name || 'Sin nombre'}</div>
        <div style={{ fontSize:12, color:'var(--ink-2)', marginBottom:6 }}>
          {[p.breed, p.gender === 'female' ? 'Hembra' : p.gender === 'male' ? 'Macho' : null].filter(Boolean).join(' · ')}
        </div>
        {p.status === 'available' && (
          <span style={{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:999, background:'rgba(245,130,32,0.1)', color:'var(--orange)', letterSpacing:'0.06em', textTransform:'uppercase' }}>Disponible</span>
        )}
        {p.status === 'reserved' && (
          <span style={{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:999, background:'var(--bg)', color:'var(--ink-2)', letterSpacing:'0.06em', textTransform:'uppercase' }}>Reservado</span>
        )}
      </div>
    </a>
  );
}

function PdSiblingsSection({ siblings }) {
  return (
    <section style={{ padding:'clamp(48px,6vw,80px) clamp(20px,5vw,80px)', background:'#fff', borderTop:'1px solid var(--line)' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--orange)', marginBottom:10 }}>De la misma camada</div>
        <h2 style={{ fontFamily:'var(--display)', fontSize:'clamp(24px,3.5vw,38px)', fontWeight:700, letterSpacing:'-0.025em', margin:'0 0 28px', color:'var(--ink)' }}>Sus hermanos</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:14 }}>
          {siblings.map(function(s){ return <PdMiniCard key={s.id} p={s}/>; })}
        </div>
      </div>
    </section>
  );
}

function PdSimilarSection({ similar, breed }) {
  return (
    <section style={{ padding:'clamp(48px,6vw,80px) clamp(20px,5vw,80px)', background:'#fff', borderTop:'1px solid var(--line)' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--orange)', marginBottom:10 }}>También te puede gustar</div>
        <h2 style={{ fontFamily:'var(--display)', fontSize:'clamp(24px,3.5vw,38px)', fontWeight:700, letterSpacing:'-0.025em', margin:'0 0 28px', color:'var(--ink)' }}>
          Más {breed || 'cachorros'}
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:16 }}>
          {similar.map(function(s){ return <PdMiniCard key={s.id} p={s}/>; })}
        </div>
      </div>
    </section>
  );
}

// ── Reserve modal ─────────────────────────────────────────────────────────────
function PdReserveModal({ puppy, onClose }) {
  const [sent, setSent]       = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    var v = function(id){ var el = document.getElementById('pdrf-'+id); return el ? el.value.trim() : ''; };
    try {
      await pdSb.from('website_leads').insert({
        full_name: v('name'), email: v('email'), phone: v('phone'), zip_code: v('zip'), message: v('msg'),
        puppy_id: puppy.id, puppy_name: puppy.name || null, puppy_breed: puppy.breed || null, source: 'puppy_detail',
      });
      setSent(true);
    } catch(err) {
      alert('Error al enviar. Por favor contáctanos directamente por WhatsApp.');
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    ['name','Nombre completo *','text',true],
    ['email','Email *','email',true],
    ['phone','Teléfono *','tel',true],
    ['zip','Código postal','text',false],
  ];

  return (
    <div onClick={function(e){ if(e.target===e.currentTarget) onClose(); }}
      style={{ position:'fixed', inset:0, background:'rgba(45,36,33,0.6)', backdropFilter:'blur(8px)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:'#fff', borderRadius:'var(--r)', maxWidth:460, width:'100%', maxHeight:'90vh', overflowY:'auto', boxShadow:'var(--shadow-soft)', position:'relative' }}>
        <button onClick={onClose} style={{ position:'absolute', top:14, right:14, width:34, height:34, borderRadius:'50%', border:'1px solid var(--line)', background:'none', cursor:'pointer', fontSize:18, display:'grid', placeItems:'center', color:'var(--ink-2)' }}>×</button>

        <div style={{ padding:'28px 28px 0' }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--orange)', marginBottom:6 }}>Solicitar información</div>
          <div style={{ fontFamily:'var(--display)', fontSize:22, fontWeight:700, letterSpacing:'-0.02em', marginBottom:6, color:'var(--ink)' }}>
            {puppy.name ? `Reservar a ${puppy.name}` : 'Solicitar información'}
          </div>
          <p style={{ fontSize:13, color:'var(--ink-2)', marginBottom:20, lineHeight:1.6 }}>Te contactamos en horario hábil. Sin compromiso.</p>
        </div>

        {sent ? (
          <div style={{ padding:'20px 28px 28px', textAlign:'center' }}>
            <div style={{ fontSize:52, marginBottom:12 }}>🎉</div>
            <div style={{ fontFamily:'var(--display)', fontSize:20, fontWeight:700, color:'var(--ink)', marginBottom:8 }}>¡Solicitud enviada!</div>
            <p style={{ fontSize:14, color:'var(--ink-2)', marginBottom:20, lineHeight:1.65 }}>Gracias por tu interés en {puppy.name || 'este cachorro'}. Te contactaremos muy pronto.</p>
            <button onClick={onClose} style={{ background:'var(--orange)', color:'#fff', border:'none', padding:'12px 28px', borderRadius:999, fontWeight:700, cursor:'pointer', fontFamily:'var(--body)', fontSize:14 }}>Cerrar</button>
          </div>
        ) : (
          <form onSubmit={submit} style={{ padding:'0 28px 28px', display:'flex', flexDirection:'column', gap:12 }}>
            {fields.map(function(f) {
              return (
                <div key={f[0]}>
                  <label style={{ fontSize:11, fontWeight:700, color:'var(--ink-2)', display:'block', marginBottom:4 }}>{f[1]}</label>
                  <input id={'pdrf-'+f[0]} type={f[2]} required={f[3]}
                    style={{ width:'100%', padding:'10px 12px', border:'1.5px solid var(--line)', borderRadius:8, fontFamily:'var(--body)', fontSize:14, color:'var(--ink)', background:'var(--bg)', outline:'none' }}/>
                </div>
              );
            })}
            <div>
              <label style={{ fontSize:11, fontWeight:700, color:'var(--ink-2)', display:'block', marginBottom:4 }}>Cuéntanos sobre tu hogar</label>
              <textarea id="pdrf-msg" rows="3" placeholder="Familia, otras mascotas, experiencia con la raza…"
                style={{ width:'100%', padding:'10px 12px', border:'1.5px solid var(--line)', borderRadius:8, fontFamily:'var(--body)', fontSize:14, color:'var(--ink)', background:'var(--bg)', resize:'vertical', outline:'none' }}/>
            </div>
            <button type="submit" disabled={loading}
              style={{ background:'var(--orange)', color:'#fff', border:'none', padding:'14px 24px', borderRadius:999, fontWeight:700, fontSize:15, cursor:'pointer', fontFamily:'var(--body)', marginTop:4, opacity: loading ? 0.7 : 1, boxShadow:'0 8px 24px -8px rgba(245,130,32,0.45)' }}>
              {loading ? 'Enviando…' : '📩 Enviar solicitud'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Hero section ──────────────────────────────────────────────────────────────
function PdHero({ p, photos, age }) {
  const [modal, setModal]   = React.useState(false);
  const [intlModal, setIntlModal] = React.useState(false);
  const available = p.status === 'available';
  const reserved  = p.status === 'reserved';

  return (
    <>
      <section style={{ padding:'clamp(32px,5vw,64px) clamp(20px,5vw,80px) clamp(48px,6vw,80px)', background:'#fff' }}>
        <div style={{ maxWidth:1000, margin:'0 auto' }}>

          {/* Breadcrumb */}
          <a href="Cachorros.html"
            style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600, color:'var(--ink-2)', textDecoration:'none', marginBottom:28, padding:'7px 14px', borderRadius:999, background:'var(--paper)', border:'1px solid var(--line)' }}>
            ← Todos los cachorros
          </a>

          <div className="pd-hero-grid" style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:48, alignItems:'start' }}>

            {/* Gallery */}
            <PdGallery photos={photos} name={p.name} status={p.status}/>

            {/* Info panel */}
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:'var(--orange)', letterSpacing:'0.04em', marginBottom:8 }}>{p.breed}</div>
              <h1 style={{ fontFamily:'var(--display)', fontSize:'clamp(40px,6vw,72px)', fontWeight:800, letterSpacing:'-0.04em', lineHeight:0.93, margin:'0 0 18px', color:'var(--ink)' }}>
                {p.name || 'Cachorro'}
              </h1>

              {/* Tags */}
              <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
                {p.gender === 'female' && <PdTag>♀ Hembra</PdTag>}
                {p.gender === 'male'   && <PdTag>♂ Macho</PdTag>}
                {age     && <PdTag>{age}</PdTag>}
                {p.color && <PdTag>{p.color}</PdTag>}
                {p.weight_lbs   && <PdTag>{p.weight_lbs} lbs</PdTag>}
                {p.pedigree_org && <PdTag accent>📜 {p.pedigree_org}</PdTag>}
                {p.vaccinated   && <PdTag green>✓ Vacunado</PdTag>}
                {p.health_cert  && <PdTag green>✓ Cert. de salud</PdTag>}
              </div>

              {/* Story */}
              <p style={{ fontSize:15, color:'var(--ink-2)', lineHeight:1.75, marginBottom:22, padding:'16px 18px', background:'var(--bg)', borderRadius:'var(--r-sm)', borderLeft:'3px solid var(--orange)' }}>
                {p.description || `${p.name || 'Este cachorro'} ha sido criado con amor en familia, con toda la socialización y cuidados que merece desde sus primeras semanas.`}
              </p>

              {/* Price */}
              {p.price && (
                <div style={{ padding:'18px 20px', background:'var(--bg)', border:'2px solid var(--orange)', borderRadius:'var(--r-sm)', marginBottom:20 }}>
                  <div style={{ fontFamily:'var(--display)', fontSize:42, fontWeight:800, color:'var(--orange)', lineHeight:1 }}>
                    ${Number(p.price).toLocaleString()}
                  </div>
                  <div style={{ fontSize:12, color:'var(--ink-2)', marginTop:5 }}>
                    Precio total · Incluye garantía, vacunas y documentación completa
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {available && (
                  <button onClick={function(){ setModal(true); }}
                    style={{ padding:'15px 24px', background:'var(--orange)', color:'#fff', border:'none', borderRadius:999, fontFamily:'var(--body)', fontSize:15, fontWeight:700, cursor:'pointer', boxShadow:'0 8px 24px -8px rgba(245,130,32,0.5)' }}>
                    💛 Me interesa {p.name || 'este cachorro'}
                  </button>
                )}
                {reserved && (
                  <button onClick={function(){ setModal(true); }}
                    style={{ padding:'15px 24px', background:'var(--ink)', color:'#fff', border:'none', borderRadius:999, fontFamily:'var(--body)', fontSize:15, fontWeight:700, cursor:'pointer' }}>
                    ⏰ Lista de espera
                  </button>
                )}
                <a href={`https://wa.me/18084928294?text=Hola! Me interesa ${encodeURIComponent(p.name || p.breed || 'un cachorro')}`}
                  target="_blank" rel="noreferrer"
                  style={{ padding:'13px 24px', background:'#25D366', color:'#fff', borderRadius:999, fontWeight:700, fontSize:14, textDecoration:'none', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                  💬 Escribir por WhatsApp
                </a>
                <a href={`sms:+18084928294?body=Hola! Me interesa ${encodeURIComponent(p.name || p.breed || 'un cachorro')}`}
                  style={{ padding:'13px 24px', background:'var(--bg)', color:'var(--ink)', borderRadius:999, fontWeight:700, fontSize:14, textDecoration:'none', display:'flex', alignItems:'center', justifyContent:'center', gap:8, border:'1.5px solid var(--line)' }}>
                  📱 Enviar SMS
                </a>
                <button onClick={function(){ setIntlModal(true); }}
                  style={{ padding:'11px 20px', background:'none', border:'1.5px solid var(--line)', borderRadius:999, fontFamily:'var(--body)', fontSize:13, fontWeight:600, cursor:'pointer', color:'var(--ink-2)', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                  ✈️ Solicitar envío internacional
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modal && <PdReserveModal puppy={p} onClose={function(){ setModal(false); }}/>}
      {intlModal && <IntlShippingModal puppyName={p.name} puppyBreed={p.breed} defaultSpecies="dog" onClose={function(){ setIntlModal(false); }}/>}
    </>
  );
}

// ── International Shipping Modal ─────────────────────────────────────────────
const INTL_REQS = {
  dog: [
    'Certificado de salud veterinario (emitido ≤10 días antes del vuelo)',
    'Chip de microchip ISO 11784/11785',
    'Vacuna antirrábica vigente (some countries req. titer test)',
    'Endoso USDA APHIS del certificado de salud',
    'Permiso de importación del país destino (si aplica)',
    'Tiempo estimado de proceso: 2-4 semanas',
  ],
  cat: [
    'Certificado de salud veterinario (emitido ≤10 días antes del vuelo)',
    'Chip de microchip ISO 11784/11785',
    'Vacuna antirrábica vigente',
    'Endoso USDA APHIS del certificado de salud',
    'Permiso de importación del país destino (si aplica)',
    'Tiempo estimado de proceso: 2-4 semanas',
  ],
};

function IntlShippingModal({ puppyName, puppyBreed, defaultSpecies, onClose }) {
  const [sent, setSent]       = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [species, setSpecies] = React.useState(defaultSpecies || 'dog');
  const reqs = INTL_REQS[species] || INTL_REQS.dog;

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    var v = function(id){ var el = document.getElementById('is-'+id); return el ? el.value.trim() : ''; };
    try {
      await pdSb.from('website_leads').insert({
        full_name: v('name'), email: v('email'), phone: v('phone'),
        message: `ENVÍO INTERNACIONAL\nEspecie: ${species}\nPaís destino: ${v('country')}\nNotas: ${v('notes')}`,
        puppy_name: puppyName || null, puppy_breed: puppyBreed || null,
        source: 'international_shipping',
      });
      setSent(true);
    } catch(err) {
      alert('Error al enviar. Contáctanos por WhatsApp: +1 (808) 492-8294');
    } finally { setLoading(false); }
  }

  return (
    <div onClick={function(e){ if(e.target===e.currentTarget) onClose(); }}
      style={{ position:'fixed', inset:0, background:'rgba(45,36,33,0.6)', backdropFilter:'blur(8px)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:'var(--paper)', borderRadius:'var(--r)', maxWidth:520, width:'100%', maxHeight:'90vh', overflowY:'auto', boxShadow:'var(--shadow-soft)', position:'relative' }}>
        <button onClick={onClose} style={{ position:'absolute', top:14, right:14, width:34, height:34, borderRadius:'50%', border:'1px solid var(--line)', background:'none', cursor:'pointer', fontSize:18, display:'grid', placeItems:'center', color:'var(--ink-2)' }}>×</button>

        <div style={{ padding:'28px 28px 0' }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--orange)', marginBottom:6 }}>Envío Internacional</div>
          <div style={{ fontFamily:'var(--display)', fontSize:22, fontWeight:700, letterSpacing:'-0.02em', marginBottom:6, color:'var(--ink)' }}>
            Llevamos a tu mascota donde estés
          </div>
          <p style={{ fontSize:13, color:'var(--ink-2)', marginBottom:16, lineHeight:1.65 }}>
            Cuéntanos tu destino y te enviamos una cotización personalizada con todos los requisitos para importar tu mascota a ese país.
          </p>

          {/* Species selector */}
          <div style={{ display:'flex', gap:8, marginBottom:20 }}>
            {[['dog','🐶 Perro'],['cat','🐱 Gato']].map(function(s){
              return (
                <button key={s[0]} onClick={function(){ setSpecies(s[0]); }}
                  style={{ flex:1, padding:'10px 16px', borderRadius:10, border: species===s[0] ? '2px solid var(--orange)' : '1.5px solid var(--line)', background: species===s[0] ? 'rgba(245,130,32,0.08)' : 'var(--bg)', fontFamily:'var(--body)', fontWeight:700, fontSize:14, cursor:'pointer', color:'var(--ink)' }}>
                  {s[1]}
                </button>
              );
            })}
          </div>

          {/* Requirements */}
          <div style={{ background:'var(--bg)', borderRadius:10, padding:'14px 16px', marginBottom:20 }}>
            <div style={{ fontSize:11, fontWeight:700, color:'var(--orange)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:10 }}>Requisitos generales</div>
            {reqs.map(function(r, i){
              return <div key={i} style={{ display:'flex', gap:8, fontSize:12, color:'var(--ink-2)', marginBottom:6, lineHeight:1.5 }}><span style={{ color:'var(--orange)', flexShrink:0 }}>✓</span>{r}</div>;
            })}
            <div style={{ fontSize:11, color:'var(--ink-soft)', marginTop:8, fontStyle:'italic' }}>* Los requisitos específicos varían por país. Te informamos con detalle al contactarte.</div>
          </div>
        </div>

        {sent ? (
          <div style={{ padding:'20px 28px 28px', textAlign:'center' }}>
            <div style={{ fontSize:52, marginBottom:12 }}>✈️</div>
            <div style={{ fontFamily:'var(--display)', fontSize:20, fontWeight:700, color:'var(--ink)', marginBottom:8 }}>¡Solicitud recibida!</div>
            <p style={{ fontSize:14, color:'var(--ink-2)', marginBottom:20, lineHeight:1.65 }}>Te contactaremos con la cotización y requisitos completos para tu país de destino.</p>
            <button onClick={onClose} style={{ background:'var(--orange)', color:'#fff', border:'none', padding:'12px 28px', borderRadius:999, fontWeight:700, cursor:'pointer', fontFamily:'var(--body)', fontSize:14 }}>Cerrar</button>
          </div>
        ) : (
          <form onSubmit={submit} style={{ padding:'0 28px 28px', display:'flex', flexDirection:'column', gap:12 }}>
            <div>
              <label style={{ fontSize:11, fontWeight:700, color:'var(--ink-2)', display:'block', marginBottom:4 }}>País de destino *</label>
              <input id="is-country" required placeholder="Ej. México, España, Colombia…" style={{ width:'100%', padding:'10px 12px', border:'1.5px solid var(--line)', borderRadius:8, fontFamily:'var(--body)', fontSize:14, color:'var(--ink)', background:'var(--bg)', outline:'none' }}/>
            </div>
            {[['name','Nombre completo *','text',true],['email','Email *','email',true],['phone','Teléfono / WhatsApp *','tel',true]].map(function(f){
              return (
                <div key={f[0]}>
                  <label style={{ fontSize:11, fontWeight:700, color:'var(--ink-2)', display:'block', marginBottom:4 }}>{f[1]}</label>
                  <input id={'is-'+f[0]} type={f[2]} required={f[3]} style={{ width:'100%', padding:'10px 12px', border:'1.5px solid var(--line)', borderRadius:8, fontFamily:'var(--body)', fontSize:14, color:'var(--ink)', background:'var(--bg)', outline:'none' }}/>
                </div>
              );
            })}
            <div>
              <label style={{ fontSize:11, fontWeight:700, color:'var(--ink-2)', display:'block', marginBottom:4 }}>Notas adicionales</label>
              <textarea id="is-notes" rows="2" placeholder="Raza, edad, fechas tentativas…" style={{ width:'100%', padding:'10px 12px', border:'1.5px solid var(--line)', borderRadius:8, fontFamily:'var(--body)', fontSize:14, color:'var(--ink)', background:'var(--bg)', resize:'vertical', outline:'none' }}/>
            </div>
            <button type="submit" disabled={loading}
              style={{ background:'var(--orange)', color:'#fff', border:'none', padding:'14px 24px', borderRadius:999, fontWeight:700, fontSize:15, cursor:'pointer', fontFamily:'var(--body)', marginTop:4, opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Enviando…' : '✈️ Solicitar cotización internacional'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
function PuppyDetalle() {
  const [state, setState] = React.useState({ status:'loading', puppy:null, breed:null, mom:null, dad:null, siblings:[], similar:[] });

  const id = React.useMemo(function() {
    try { return new URLSearchParams(window.location.search).get('id'); } catch(e) { return null; }
  }, []);

  React.useEffect(function() {
    if (!id)   { setState(function(s){ return Object.assign({}, s, {status:'error'}); }); return; }
    if (!pdSb) { setState(function(s){ return Object.assign({}, s, {status:'error'}); }); return; }

    (async function() {
      try {
        var r = await pdSb.from('puppies').select('*').eq('id', id).single();
        if (r.error || !r.data) throw new Error('Not found');
        var p = r.data;
        document.title = (p.name || 'Cachorro') + ' — BPuppy';

        var breed = null, mom = null, dad = null, siblings = [], similar = [];
        var tasks = [];
        if (p.breed)   tasks.push(pdSb.from('breeds').select('*').ilike('name', p.breed).maybeSingle().then(function(x){ breed = x.data; }));
        if (p.mom_id)  tasks.push(pdSb.from('parent_dogs').select('*').eq('id', p.mom_id).maybeSingle().then(function(x){ mom = x.data; }));
        if (p.dad_id)  tasks.push(pdSb.from('parent_dogs').select('*').eq('id', p.dad_id).maybeSingle().then(function(x){ dad = x.data; }));
        if (p.litter_id) tasks.push(pdSb.from('puppies').select('*').eq('litter_id', p.litter_id).neq('id', id).then(function(x){ siblings = x.data || []; }));
        if (p.breed)   tasks.push(pdSb.from('puppies').select('*').eq('breed', p.breed).neq('id', id).in('status', ['available','reserved']).limit(6).then(function(x){ similar = x.data || []; }));
        await Promise.all(tasks);
        setState({ status:'ok', puppy:p, breed, mom, dad, siblings, similar });
      } catch(e) {
        setState(function(s){ return Object.assign({}, s, {status:'error'}); });
      }
    })();
  }, [id]);

  if (state.status === 'loading') return (
    <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16 }}>
      <div className="bp-spinner"/>
      <p style={{ color:'var(--ink-2)', fontSize:15 }}>Cargando cachorro…</p>
    </div>
  );

  if (state.status === 'error') return (
    <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16, padding:40, textAlign:'center' }}>
      <div style={{ fontSize:56 }}>🐾</div>
      <h2 style={{ fontFamily:'var(--display)', fontSize:28, fontWeight:700, letterSpacing:'-0.02em' }}>Cachorro no encontrado</h2>
      <p style={{ color:'var(--ink-2)', fontSize:15 }}>No pudimos cargar este cachorro. Puede que ya no esté disponible.</p>
      <a href="Cachorros.html" style={{ background:'var(--orange)', color:'#fff', padding:'13px 26px', borderRadius:999, textDecoration:'none', fontWeight:700, fontSize:14, boxShadow:'0 8px 24px -8px rgba(245,130,32,0.4)' }}>
        Ver todos los cachorros
      </a>
    </div>
  );

  var p        = state.puppy;
  var photos   = pdPhotos(p);
  var age      = pdAge(p);
  var hasFin   = !state.mom && !state.dad && p.price;

  return (
    <div>
      <PdHero p={p} photos={photos} age={age}/>
      <PdIncludes p={p}/>
      {state.breed && <PdBreed breed={state.breed}/>}
      {(state.mom || state.dad) && <PdFamilyFin mom={state.mom} dad={state.dad} price={p.price}/>}
      {hasFin && (
        <section style={{ padding:'clamp(48px,6vw,80px) clamp(20px,5vw,80px)', background:'#fff', borderTop:'1px solid var(--line)' }}>
          <div style={{ maxWidth:1000, margin:'0 auto' }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--orange)', marginBottom:10 }}>Financiamiento</div>
            <h2 style={{ fontFamily:'var(--display)', fontSize:'clamp(28px,4vw,48px)', fontWeight:700, letterSpacing:'-0.03em', margin:'0 0 32px', color:'var(--ink)' }}>
              Lleva a {p.name || 'tu cachorro'} <em style={{ fontFamily:'var(--serif)', fontStyle:'italic', color:'var(--orange)' }}>a tu hogar hoy.</em>
            </h2>
            <div className="pd-family-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:48, alignItems:'start' }}>
              <div style={{ display:'none' }} className="pd-fin-img">
                <image-slot id="fin-photo" shape="rounded" radius="22" placeholder="Sube una foto del cachorro" style={{ width:'100%', aspectRatio:'1/1', display:'block' }}/>
              </div>
              <div style={{ gridColumn:'1/-1' }}>
                <PdFinCalc price={p.price}/>
              </div>
            </div>
          </div>
        </section>
      )}
      {state.siblings.length > 0 && <PdSiblingsSection siblings={state.siblings}/>}
      {state.similar.length  > 0 && <PdSimilarSection similar={state.similar} breed={p.breed}/>}
    </div>
  );
}

Object.assign(window, { PuppyDetalle });
