// s-views.jsx v2 — Modern B Social
const { useState, useRef, useEffect, useContext, createContext } = React;

const BSCtx = createContext(null);
const useBS = () => useContext(BSCtx);

// ── Idioma (bilingüe) ────────────────────────────────────────────────────────
// Usa los helpers globales de i18n si están presentes; si no, define un
// fallback equivalente que lee/escucha la preferencia del sitio ('bpuppy-lang').
const bsPick = (typeof window !== 'undefined' && window.pick)
  ? window.pick
  : (t, lang) => Array.isArray(t) ? (lang === 'en' ? (t[1] != null ? t[1] : t[0]) : t[0]) : t;
const bsReadLang = () => {
  try { if (typeof window !== 'undefined' && window.bpGetLang) return window.bpGetLang() || 'es'; } catch(e){}
  try { return localStorage.getItem('bpuppy-lang') || 'es'; } catch(e){ return 'es'; }
};
const BSLangContext = (typeof window !== 'undefined' && window.LangContext)
  ? window.LangContext
  : createContext({ lang: bsReadLang(), setLang: () => {} });
const useLang = (typeof window !== 'undefined' && window.useLang)
  ? window.useLang
  : () => useContext(BSLangContext);
const useT = (typeof window !== 'undefined' && window.useT)
  ? window.useT
  : () => { const { lang } = useLang(); return (t) => bsPick(t, lang); };

// ── Status / insignias de miembro ───────────────────────────────────────────
const BS_STATUS = {
  nuevo:     { es:'Nuevo',              en:'New',               color:'#9aa0a6', glow:false },
  comparte:  { es:'Comparte',           en:'Sharer',            color:'#2F6BFF', glow:false },
  creador:   { es:'Creador',            en:'Creator',           color:'#2F6BFF', glow:false },
  plata:     { es:'Plata · Puppy Run',  en:'Silver · Puppy Run',color:'#8A93A6', glow:false },
  groomer:   { es:'Cliente Spa',        en:'Spa Client',        color:'#1EB87A', glow:false },
  vip:       { es:'Miembro VIP',        en:'VIP Member',        color:'#7C3AED', glow:true  },
  comprador: { es:'Familia BrightPuppy',en:'BrightPuppy Family',color:'#F58220', glow:true  },
  doble:     { es:'Doble Privilegio',   en:'Double Privilege',  color:'#F5C53A', glow:true  },
};
const bsStatusLabel = (key, lang) => { const s = BS_STATUS[key] || BS_STATUS.nuevo; return lang==='en' ? s.en : s.es; };
function StatusChip({ status, lang, size }){
  const ctx = useLang();
  const lg = lang || (ctx && ctx.lang) || bsReadLang();
  const s = BS_STATUS[status] || BS_STATUS.nuevo;
  const sm = size === 'sm';
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding: sm?'2px 8px':'3px 11px', borderRadius:999, fontSize: sm?10.5:12, fontWeight:800,
      color: s.glow ? '#fff' : s.color, background: s.glow ? s.color : (s.color+'1A'),
      border:`1px solid ${s.color}${s.glow?'':'55'}`, boxShadow: s.glow ? `0 0 10px ${s.color}88` : 'none', whiteSpace:'nowrap' }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background: s.glow ? '#fff' : s.color }}/>
      {bsStatusLabel(status, lg)}
    </span>
  );
}
function BadgeChips({ badges, lang, max }){
  const ctx = useLang();
  const lg = lang || (ctx && ctx.lang) || bsReadLang();
  const list = (badges||[]).filter(b=>b!=='nuevo').slice(0, max||4);
  if(!list.length) return null;
  return <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>{list.map(b=> <StatusChip key={b} status={b} lang={lg} size="sm"/>)}</div>;
}

const THEMES = {
  clean: {
    bg:'#FBFAF8', surface:'#FFFFFF', surface2:'#F4F1EC',
    border:'rgba(45,36,33,0.12)', borderStrong:'rgba(45,36,33,0.22)',
    brand:'#F58220', rose:'#E85D75',
    grad:'linear-gradient(135deg,#F58220 0%,#E85D75 100%)',
    glow:'0 2px 10px rgba(45,36,33,0.06)',
    ink:'#2D2421', ink2:'#5f5346', soft:'#A89C8E',
    like:'#E85D75', online:'#1EB87A', name:'Clean',
  },
  electric: {
    bg:'#0A0F1E', surface:'#111A30', surface2:'#1A2540',
    border:'rgba(120,180,255,0.10)', borderStrong:'rgba(120,180,255,0.24)',
    brand:'#0EA5E9', rose:'#22D3EE',
    grad:'linear-gradient(135deg,#0EA5E9 0%,#06B6D4 55%,#22D3EE 100%)',
    glow:'0 8px 32px rgba(14,165,233,0.42)',
    ink:'#EAF2FF', ink2:'#8FA6CC', soft:'#46587E',
    like:'#FB7185', online:'#34D399', name:'Electric',
  },
  midnight: {
    bg:'#09090F', surface:'#111120', surface2:'#191930',
    border:'rgba(255,255,255,0.07)', borderStrong:'rgba(255,255,255,0.14)',
    brand:'#FF5520', rose:'#FF2D78',
    grad:'linear-gradient(135deg,#FF5520 0%,#FF2D78 100%)',
    glow:'0 8px 32px rgba(255,85,32,0.38)',
    ink:'#F0EEF8', ink2:'#8886A8', soft:'#403E58',
    like:'#FF2D78', online:'#00E87A', name:'Midnight',
  },
  violet: {
    bg:'#07060F', surface:'#0F0E22', surface2:'#171535',
    border:'rgba(148,100,255,0.1)', borderStrong:'rgba(148,100,255,0.22)',
    brand:'#9B6FFF', rose:'#F040A0',
    grad:'linear-gradient(135deg,#9B6FFF 0%,#F040A0 100%)',
    glow:'0 8px 32px rgba(155,111,255,0.42)',
    ink:'#F2F0FF', ink2:'#9A98C0', soft:'#4E4C70',
    like:'#F040A0', online:'#3DFFA0', name:'Violet',
  },
  warm: {
    bg:'#FAF8F5', surface:'#FFFFFF', surface2:'#F2EFE8',
    border:'rgba(0,0,0,0.07)', borderStrong:'rgba(0,0,0,0.13)',
    brand:'#F55820', rose:'#E83860',
    grad:'linear-gradient(135deg,#F55820 0%,#E83860 100%)',
    glow:'0 8px 24px rgba(245,88,32,0.28)',
    ink:'#18161F', ink2:'#706C84', soft:'#B0ACC0',
    like:'#E83860', online:'#16C65F', name:'Warm',
  },
};

(function () {
  if (document.getElementById('bs-css')) return;
  const s = document.createElement('style');
  s.id = 'bs-css';
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

const fmt = n => n >= 1000 ? (n/1000).toFixed(1)+'k' : String(n);

function BSAvatar({ user, size=36, ring=false }) {
  const BS = useBS();
  const av = (
    <div style={{ width:size, height:size, borderRadius:'50%', background:user?.color||BS.brand,
      display:'grid', placeItems:'center', fontSize:size*0.34, fontWeight:800,
      color:'#fff', fontFamily:'Plus Jakarta Sans,sans-serif', flexShrink:0 }}>
      {user?.initials||'?'}
    </div>
  );
  if (!ring) return av;
  return (
    <div style={{ padding:2.5, borderRadius:'50%', background:BS.grad, flexShrink:0 }}>
      <div style={{ padding:2.5, borderRadius:'50%', background:BS.bg }}>{av}</div>
    </div>
  );
}

function BSVerified({ size=14 }) {
  const BS = useBS();
  return (
    <svg viewBox="0 0 16 16" width={size} height={size}>
      <circle cx="8" cy="8" r="8" fill={BS.brand}/>
      <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function BSocialLogo({ size=48 }) {
  return (
    <svg viewBox="0 0 200 240" width={size} height={size*1.2} fill="none">
      <defs>
        <linearGradient id="bsLg3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF5520"/><stop offset="100%" stopColor="#FF2D78"/>
        </linearGradient>
      </defs>
      <ellipse cx="63" cy="44" rx="22" ry="30" transform="rotate(-8 63 44)" fill="url(#bsLg3)"/>
      <ellipse cx="137" cy="44" rx="22" ry="30" transform="rotate(8 137 44)" fill="url(#bsLg3)"/>
      <rect x="14" y="58" width="172" height="166" rx="44" fill="url(#bsLg3)"/>
      <path d="M55 92L55 148Q55 148 102 148Q132 148 132 120Q132 92 102 92Z" fill="rgba(255,255,255,0.18)"/>
      <path d="M55 148L55 202Q55 202 108 202Q140 202 140 175Q140 148 108 148Z" fill="rgba(255,255,255,0.18)"/>
    </svg>
  );
}

function WelcomeScreen({ onSendLink }) {
  const BS = useBS();
  const t = useT();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');
  const send = async () => {
    const e = (email||'').trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) { setErr(t(['Escribe un correo válido','Enter a valid email'])); return; }
    setBusy(true); setErr('');
    try { const d = await onSendLink(e); if (d && d.ok) setSent(true); else setErr((d && d.error) || t(['No se pudo enviar el enlace','We couldn’t send the link'])); }
    catch(_e) { setErr(t(['Error de red, intenta de nuevo','Network error, please try again'])); }
    finally { setBusy(false); }
  };
  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
        <img src="assets/photos/bsocial-pool.webp" alt={t(['Perritos en una fiesta de piscina','Puppies at a pool party'])} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 28%', display:'block' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,rgba(5,5,18,0.05) 0%,rgba(5,5,18,0.35) 48%,rgba(5,5,18,0.93) 100%)' }}/>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'28px 26px 34px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18 }}>
            <div style={{ background:'rgba(255,255,255,0.08)', borderRadius:18, padding:'7px 8px 4px', backdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.12)', display:'grid', placeItems:'center' }}>
              <BSocialLogo size={36}/>
            </div>
            <div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:28, fontWeight:800, color:'#fff', letterSpacing:'-0.04em', lineHeight:1 }}>B Social</div>
              <div style={{ fontSize:10, color:'rgba(255,255,255,0.45)', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', marginTop:2 }}>by BrightPuppy</div>
            </div>
          </div>
          <div style={{ fontSize:21, fontWeight:700, color:'#fff', lineHeight:1.3, marginBottom:12 }}>{t(['La comunidad más leal de internet','The most loyal community on the internet'])}</div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:BS.online }}/>
            <span style={{ fontSize:12, color:'rgba(255,255,255,0.5)', fontWeight:500 }}>{t(['Comunidad BrightPuppy','BrightPuppy Community'])}</span>
          </div>
        </div>
      </div>
      <div style={{ background:BS.surface, padding:'22px 22px 34px', display:'flex', flexDirection:'column', gap:10 }}>
        {sent ? (
          <div style={{ textAlign:'center', padding:'8px 0 4px' }}>
            <div style={{ display:'flex', justifyContent:'center', marginBottom:10, color:BS.brand }}><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg></div>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:19, fontWeight:800, color:BS.ink, marginBottom:6 }}>{t(['Revisa tu correo','Check your email'])}</div>
            <p style={{ fontSize:13, color:BS.ink2, lineHeight:1.55, margin:0 }}>{t(['Te enviamos un enlace a','We sent a link to'])} <b style={{ color:BS.ink }}>{email.trim().toLowerCase()}</b>. {t(['Tócalo para entrar — sin contraseñas.','Tap it to sign in — no passwords.'])}</p>
          </div>
        ) : (
          <>
            <div style={{ fontSize:13.5, fontWeight:700, color:BS.ink, marginBottom:2 }}>{t(['Entra o crea tu cuenta','Sign in or create your account'])}</div>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send(); }} placeholder={t(['tu@correo.com','you@email.com'])}
              style={{ width:'100%', padding:'14px 15px', borderRadius:14, border:`1.5px solid ${BS.borderStrong}`, background:BS.surface2, fontSize:14.5, color:BS.ink, fontFamily:'inherit' }}/>
            {err && <div style={{ fontSize:12.5, color:BS.like, fontWeight:600 }}>{err}</div>}
            <button onClick={send} disabled={busy} className="bs-btn bs-rainbow" style={{ '--bsr-fill':BS.grad, padding:'15px', fontSize:15, fontWeight:800, cursor: busy?'default':'pointer', fontFamily:'inherit', boxShadow:BS.glow, opacity: busy?0.7:1 }}>
              {busy ? t(['Enviando…','Sending…']) : t(['Enviarme mi enlace mágico','Send me my magic link'])}
            </button>
            <p style={{ textAlign:'center', fontSize:11.5, color:BS.soft, margin:'4px 0 0', lineHeight:1.5 }}>{t(['Sin contraseñas. Usa el mismo correo de tu cuenta BrightPuppy si ya eres cliente.','No passwords. Use the same email as your BrightPuppy account if you’re already a client.'])}</p>
          </>
        )}
        <a href="/" className="bs-btn" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7, marginTop:4, padding:'11px', borderRadius:12, textDecoration:'none', color:BS.soft, fontSize:13, fontWeight:600 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          {t(['Volver a la página web','Back to the website'])}
        </a>
      </div>
    </div>
  );
}

async function bsUpload(file, folder) {
  const sb = window._bsSb; if (!sb || !file) return '';
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = (folder || 'media') + '/' + Date.now() + '_' + Math.random().toString(36).slice(2) + '.' + ext;
  const up = await sb.storage.from('social-media').upload(path, file, { contentType: file.type, upsert: false });
  if (up.error) throw up.error;
  return sb.storage.from('social-media').getPublicUrl(path).data.publicUrl;
}

function PhotoPick({ label, preview, onPick, BS, round }) {
  const ref = useRef(null);
  return (
    <div style={{ textAlign:'center' }}>
      <div onClick={() => ref.current && ref.current.click()} style={{ width:72, height:72, borderRadius: round?'50%':14, background:BS.surface2, border:`2px dashed ${BS.borderStrong}`, margin:'0 auto 6px', cursor:'pointer', overflow:'hidden', display:'grid', placeItems:'center', color:BS.soft }}>
        {preview ? <img src={preview} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M8 5l1.5-2h5L16 5"/></svg>}
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={e=>{ const f=e.target.files&&e.target.files[0]; if(f) onPick(f); }} style={{ display:'none' }}/>
      <div style={{ fontSize:11, color:BS.ink2, fontWeight:600 }}>{label}</div>
    </div>
  );
}

function CreateProfileScreen({ me, onSave, onLogout, onDone }) {
  const BS = useBS();
  const t = useT();
  const m = me || {};
  const editing = !!(onDone && m && m.username);
  let pend = null; try { pend = JSON.parse(localStorage.getItem('bp_pending_social')||'null'); } catch(e){}
  if (m.username) pend = null; // si ya tiene perfil, ignorar el pendiente
  const [firstName, setFirstName] = useState(m.first_name||'');
  const [lastName, setLastName]   = useState(m.last_name||'');
  const [birthdate, setBirthdate] = useState(m.birthdate||'');
  const ageY = (d) => { if(!d) return null; const b=new Date(d+'T00:00:00'); if(isNaN(b)) return null; const n=new Date(); let a=n.getFullYear()-b.getFullYear(); const mo=n.getMonth()-b.getMonth(); if(mo<0||(mo===0&&n.getDate()<b.getDate())) a--; return a; };
  const [bio, setBio]             = useState(m.bio || (pend && pend.story) || '');
  const [petSpecies, setPetSpecies] = useState(m.pet_species||'');
  const [petName, setPetName]     = useState(m.pet_name || (pend && pend.pet_name) || '');
  const [petBreed, setPetBreed]   = useState(m.pet_breed||'');
  const [petColor, setPetColor]   = useState(m.pet_color||'');
  const [petAge, setPetAge]       = useState(m.pet_age||'');
  const [address, setAddress]     = useState(m.address||'');
  const [city, setCity]           = useState(m.city||'');
  const [stateV, setStateV]       = useState(m.state||'');
  const [zip, setZip]             = useState(m.zip||'');
  const [isPublic, setIsPublic]   = useState(!!m.is_public);
  const [avatarFile, setAvatarFile] = useState(null);
  const [petFile, setPetFile]       = useState(null);
  const [coverFile, setCoverFile]   = useState(null);
  const [avatarPrev, setAvatarPrev] = useState(m.avatar_url||'');
  const [petPrev, setPetPrev]       = useState(m.pet_photo_url || (pend && pend.photo_url) || '');
  const [coverPrev, setCoverPrev]   = useState(m.cover_url||'');
  const [busy, setBusy] = useState(false);
  const [err, setErr]   = useState('');

  const pickAvatar = (f) => { setAvatarFile(f); try{ setAvatarPrev(URL.createObjectURL(f)); }catch(e){} };
  const pickPet    = (f) => { setPetFile(f);    try{ setPetPrev(URL.createObjectURL(f)); }catch(e){} };
  const pickCover  = (f) => { setCoverFile(f);  try{ setCoverPrev(URL.createObjectURL(f)); }catch(e){} };

  const save = async () => {
    if (!firstName.trim()) { setErr(t(['Escribe tu nombre','Enter your name'])); return; }
    // Verificación de edad (estilo redes sociales): el perfil solo se crea para 18+.
    if (!editing && !birthdate) { setErr(t(['Ingresa tu fecha de nacimiento para continuar','Enter your date of birth to continue'])); return; }
    if (birthdate) { const a = ageY(birthdate); if (a !== null && a < 18) { setErr(t(['Para crear un perfil en B Social debes tener 18 años o más. ¡Pero puedes seguir jugando y guardar tu puntaje en el juego!','To create a B Social profile you must be 18 or older. But you can keep playing and save your score in the game!'])); return; } }
    setBusy(true); setErr('');
    try {
      let avatar_url = m.avatar_url || (/^https?:/.test(avatarPrev) ? avatarPrev : null);
      let pet_photo_url = m.pet_photo_url || (/^https?:/.test(petPrev) ? petPrev : null);
      let cover_url = m.cover_url || (/^https?:/.test(coverPrev) ? coverPrev : null);
      if (avatarFile) avatar_url = await bsUpload(avatarFile, 'avatars');
      if (petFile)    pet_photo_url = await bsUpload(petFile, 'pets');
      if (coverFile)  cover_url = await bsUpload(coverFile, 'covers');
      const d = await onSave({
        first_name:firstName.trim(), last_name:lastName.trim(), bio:bio.trim(), birthdate:birthdate||null,
        pet_species:petSpecies, pet_name:petName.trim(), pet_breed:petBreed.trim(), pet_color:petColor.trim(), pet_age:petAge.trim(),
        address:address.trim(), city:city.trim(), state:stateV.trim(), zip:zip.trim(),
        avatar_url, pet_photo_url, cover_url, is_public:isPublic,
      });
      if (!(d && d.ok)) { setErr((d && d.error) || t(['No se pudo guardar','We couldn’t save'])); setBusy(false); }
      else if (onDone) onDone();
    } catch(e) { setErr((e && e.message) || t(['Error al guardar','Error while saving'])); setBusy(false); }
  };

  const fld = { width:'100%', padding:'12px 14px', borderRadius:12, border:`1.5px solid ${BS.borderStrong}`, background:BS.surface2, fontSize:14, color:BS.ink, fontFamily:'inherit' };
  const lbl = { fontSize:11.5, fontWeight:700, color:BS.ink2, margin:'0 0 5px' };
  const grp = { marginBottom:12 };
  const sectionTitle = { fontSize:11, fontWeight:800, letterSpacing:'0.06em', textTransform:'uppercase', color:BS.brand, margin:'18px 0 10px' };
  return (
    <div className="bs-fade" style={{ padding:'36px 22px 28px', minHeight:'100%', background:BS.bg }}>
      <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:25, fontWeight:800, color:BS.ink, letterSpacing:'-0.03em', marginBottom:6 }}>{editing?t(['Editar perfil','Edit profile']):t(['Crea tu perfil','Create your profile'])}</div>
      <p style={{ fontSize:13, color:BS.ink2, lineHeight:1.5, margin:'0 0 14px' }}>{editing?t(['Actualiza tus datos y fotos cuando quieras.','Update your details and photos whenever you like.']):(t(['Bienvenido','Welcome'])+(m.email?(' · '+m.email):'')+'. '+t(['Completa tus datos para unirte a la comunidad.','Complete your details to join the community.']))}</p>

      {/* Portada */}
      <div style={{ marginBottom:12 }}>
        <div style={lbl}>{t(['Foto de portada','Cover photo'])}</div>
        <label style={{ display:'block', height:120, borderRadius:14, border:`1.5px dashed ${BS.borderStrong}`, background: coverPrev ? `url(${coverPrev}) center/cover` : BS.surface2, cursor:'pointer', position:'relative', overflow:'hidden' }}>
          <input type="file" accept="image/*" onChange={e=>{ const f=e.target.files&&e.target.files[0]; if(f) pickCover(f); }} style={{ display:'none' }}/>
          {!coverPrev && <div style={{ position:'absolute', inset:0, display:'grid', placeItems:'center', color:BS.soft, fontSize:12.5, fontWeight:700 }}>{t(['+ Sube o elige una portada','+ Upload or choose a cover'])}</div>}
          {coverPrev && <div style={{ position:'absolute', bottom:6, right:8, background:'rgba(0,0,0,0.45)', color:'#fff', fontSize:11, fontWeight:700, padding:'3px 9px', borderRadius:999 }}>{t(['Cambiar','Change'])}</div>}
        </label>
      </div>

      {/* Fotos */}
      <div style={{ display:'flex', gap:24, justifyContent:'center', marginBottom:6 }}>
        <PhotoPick label={t(['Tu foto','Your photo'])} preview={avatarPrev} onPick={pickAvatar} BS={BS} round/>
        <PhotoPick label={t(['Foto de tu mascota','Your pet’s photo'])} preview={petPrev} onPick={pickPet} BS={BS}/>
      </div>

      <div style={sectionTitle}>{t(['Tus datos','Your details'])}</div>
      <div style={{ display:'flex', gap:10 }}>
        <div style={{ flex:1, ...grp }}><div style={lbl}>{t(['Nombre *','First name *'])}</div><input value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="Luis" style={fld}/></div>
        <div style={{ flex:1, ...grp }}><div style={lbl}>{t(['Apellido','Last name'])}</div><input value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="Guzmán" style={fld}/></div>
      </div>
      <div style={grp}>
        <div style={lbl}>{t(['Fecha de nacimiento *','Date of birth *'])}</div>
        <input type="date" value={birthdate} max={new Date(Date.now()-86400000).toISOString().slice(0,10)} onChange={e=>setBirthdate(e.target.value)} style={fld}/>
        <div style={{ fontSize:11, color:BS.soft, marginTop:5, lineHeight:1.45 }}>{t(['Solo para confirmar que eres mayor de edad. No se muestra en tu perfil. Crear un perfil requiere tener 18 años o más; los menores pueden jugar y guardar su puntaje.','Only to confirm you’re of legal age. It’s never shown on your profile. Creating a profile requires being 18 or older; minors can still play and save their score.'])}</div>
        {birthdate && ageY(birthdate)!==null && ageY(birthdate)<18 && (
          <div style={{ fontSize:12, fontWeight:700, color:BS.like||'#E5484D', background:'rgba(229,72,77,0.1)', border:'1px solid rgba(229,72,77,0.3)', borderRadius:10, padding:'8px 11px', marginTop:7, lineHeight:1.45 }}>{t(['Aún no puedes crear un perfil (debes tener 18+). ¡Pero puedes seguir jugando y guardar tu puntaje en el juego!','You can’t create a profile yet (you must be 18+). But you can keep playing and save your score in the game!'])}</div>
        )}
      </div>
      <div style={grp}><div style={lbl}>{t(['Bio (opcional)','Bio (optional)'])}</div><input value={bio} onChange={e=>setBio(e.target.value)} placeholder={t(['Amante de los Golden 🐾','Golden lover 🐾'])} style={fld}/></div>

      <div style={sectionTitle}>{t(['Tu mascota','Your pet'])}</div>
      <div style={{ ...grp }}>
        <div style={lbl}>{t(['¿Qué tipo de mascota?','What kind of pet?'])}</div>
        <div style={{ display:'flex', gap:8 }}>
          {[['perro',t(['Perro','Dog'])],['gato',t(['Gato','Cat'])],['otra',t(['Otra','Other'])]].map(([v,l]) => (
            <button key={v} onClick={()=>setPetSpecies(v)} className="bs-btn" style={{ flex:1, padding:'10px', borderRadius:11, border:`1.5px solid ${petSpecies===v?BS.brand:BS.border}`, background: petSpecies===v?'rgba(245,130,32,0.08)':BS.surface2, color: petSpecies===v?BS.brand:BS.ink2, fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ display:'flex', gap:10 }}>
        <div style={{ flex:1, ...grp }}><div style={lbl}>{t(['Nombre','Name'])}</div><input value={petName} onChange={e=>setPetName(e.target.value)} placeholder="Luna" style={fld}/></div>
        <div style={{ flex:1, ...grp }}><div style={lbl}>{t(['Raza / tipo','Breed / type'])}</div><input value={petBreed} onChange={e=>setPetBreed(e.target.value)} placeholder="Golden Retriever" style={fld}/></div>
      </div>
      <div style={{ display:'flex', gap:10 }}>
        <div style={{ flex:1, ...grp }}><div style={lbl}>{t(['Color','Color'])}</div><input value={petColor} onChange={e=>setPetColor(e.target.value)} placeholder={t(['Dorado','Golden'])} style={fld}/></div>
        <div style={{ flex:1, ...grp }}><div style={lbl}>{t(['Edad','Age'])}</div><input value={petAge} onChange={e=>setPetAge(e.target.value)} placeholder={t(['2 años','2 years'])} style={fld}/></div>
      </div>

      <div style={sectionTitle}>{t(['Tu dirección','Your address'])} <span style={{ textTransform:'none', letterSpacing:0, color:BS.soft, fontWeight:600 }}>· {t(['privada, nunca pública','private, never public'])}</span></div>
      <div style={grp}><div style={lbl}>{t(['Calle y número','Street and number'])}</div><input value={address} onChange={e=>setAddress(e.target.value)} placeholder="123 Main St, Apt 4" style={fld}/></div>
      <div style={{ display:'flex', gap:10 }}>
        <div style={{ flex:2, ...grp }}><div style={lbl}>{t(['Ciudad','City'])}</div><input value={city} onChange={e=>setCity(e.target.value)} list="bs-cities" placeholder={t(['Empieza a escribir…','Start typing…'])} style={fld}/>
          <datalist id="bs-cities"><option value="Miami, FL"/><option value="Orlando, FL"/><option value="Tampa, FL"/><option value="Haines City, FL"/><option value="Kissimmee, FL"/><option value="Lakeland, FL"/><option value="Davenport, FL"/></datalist>
        </div>
        <div style={{ flex:1, ...grp }}><div style={lbl}>{t(['Estado','State'])}</div><input value={stateV} onChange={e=>setStateV(e.target.value)} placeholder="FL" style={fld}/></div>
        <div style={{ flex:1, ...grp }}><div style={lbl}>{t(['ZIP','ZIP'])}</div><input value={zip} onChange={e=>setZip(e.target.value)} placeholder="33844" style={fld}/></div>
      </div>

      <div onClick={()=>setIsPublic(v=>!v)} style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 14px', borderRadius:13, border:`1.5px solid ${isPublic?BS.brand:BS.border}`, background: isPublic?'rgba(245,130,32,0.07)':BS.surface2, cursor:'pointer', marginTop:8 }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13.5, fontWeight:700, color:BS.ink }}>{t(['Perfil público','Public profile'])}</div>
          <div style={{ fontSize:11.5, color:BS.soft, lineHeight:1.5 }}>{t(['Si lo activas, en Comunidad solo se verá:','If you turn it on, Community will only show:'])} <b style={{ color:BS.ink2 }}>{t(['tu nombre, ciudad y tu mascota','your name, city and pet'])}</b> {t(['(con foto si subiste).','(with a photo if you added one).'])} <b style={{ color:BS.ink2 }}>{t(['Tu correo, teléfono y dirección NUNCA se hacen públicos.','Your email, phone and address are NEVER made public.'])}</b> {t(['Por defecto tu perfil es privado.','By default your profile is private.'])}</div>
        </div>
        <div style={{ width:46, height:26, borderRadius:999, background:isPublic?BS.grad:BS.border, position:'relative', flexShrink:0 }}>
          <span style={{ position:'absolute', top:3, left:isPublic?23:3, width:20, height:20, borderRadius:'50%', background:'#fff', transition:'left .2s' }}/>
        </div>
      </div>
      {err && <div style={{ fontSize:12.5, color:BS.like, fontWeight:600, marginTop:10 }}>{err}</div>}
      {(() => { const minor = birthdate && ageY(birthdate)!==null && ageY(birthdate)<18; const blocked = busy || minor; return (
      <button onClick={save} disabled={blocked} className="bs-btn bs-rainbow" style={{ '--bsr-fill':BS.grad, width:'100%', marginTop:16, padding:'15px', fontSize:15, fontWeight:800, cursor:blocked?'default':'pointer', fontFamily:'inherit', boxShadow:BS.glow, opacity:blocked?0.55:1 }}>{busy?t(['Guardando…','Saving…']):(editing?t(['Guardar cambios','Save changes']):t(['Entrar a la comunidad','Enter the community']))}</button>
      ); })()}
      <button onClick={() => editing ? onDone() : onLogout()} className="bs-btn" style={{ width:'100%', marginTop:10, padding:'12px', borderRadius:12, border:'none', background:'transparent', color:BS.soft, fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>{editing?t(['Cancelar','Cancel']):t(['Usar otra cuenta','Use another account'])}</button>
      {!editing && <a href="/" className="bs-btn" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7, marginTop:2, padding:'10px', textDecoration:'none', color:BS.soft, fontSize:12.5, fontWeight:600 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        {t(['Volver a la página web','Back to the website'])}
      </a>}
    </div>
  );
}

function OnboardingScreen({ onDone }) {
  const BS = useBS();
  const t = useT();
  const [pick, setPick] = useState(null);
  const opts = [
    { id:'dog', emoji:'🐕', label:t(['Perros','Dogs']), sub:t(['Tengo o quiero un perro','I have or want a dog']) },
    { id:'cat', emoji:'🐱', label:t(['Gatos','Cats']), sub:t(['Tengo o quiero un gato','I have or want a cat']) },
    { id:'both', emoji:'🐾', label:t(['Ambos','Both']), sub:t(['Amo a todos por igual','I love them all equally']) },
    { id:'soon', emoji:'🌱', label:t(['Pronto','Soon']), sub:t(['Estoy pensándolo','I’m thinking about it']) },
  ];
  return (
    <div className="bs-fade" style={{ height:'100%', background:BS.bg, padding:'44px 22px 28px', display:'flex', flexDirection:'column' }}>
      <div style={{ marginBottom:28 }}>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:28, fontWeight:800, letterSpacing:'-0.03em', color:BS.ink, marginBottom:6 }}>{t(['¿Cuál es tu mundo?','What’s your world?'])}</div>
        <p style={{ fontSize:14, color:BS.ink2, lineHeight:1.5, margin:0 }}>{t(['Personaliza tu experiencia en B Social','Personalize your B Social experience'])}</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, flex:1 }}>
        {opts.map(o => (
          <button key={o.id} onClick={() => setPick(o.id)} style={{ padding:'20px 14px', borderRadius:18, border:`2px solid ${pick===o.id ? BS.brand : BS.border}`, background: pick===o.id ? 'rgba(255,85,32,0.1)' : BS.surface, cursor:'pointer', textAlign:'center', fontFamily:'inherit', transition:'all .18s' }}>
            <div style={{ fontSize:32, marginBottom:9 }}>{o.emoji}</div>
            <div style={{ fontSize:14, fontWeight:700, color:BS.ink }}>{o.label}</div>
            <div style={{ fontSize:11, color:BS.soft, marginTop:3 }}>{o.sub}</div>
          </button>
        ))}
      </div>
      <button onClick={onDone} disabled={!pick} className="bs-btn" style={{ marginTop:22, padding:'15px', borderRadius:14, border:'none', background: pick ? BS.grad : BS.surface2, fontSize:15, fontWeight:700, color: pick ? '#fff' : BS.soft, cursor: pick ? 'pointer' : 'default', fontFamily:'inherit', transition:'all .2s', boxShadow: pick ? BS.glow : 'none' }}>
        {t(['Empezar','Get started'])}
      </button>
    </div>
  );
}

function StoriesBar() {
  const BS = useBS();
  const t = useT();
  const A = (typeof window!=='undefined' && window.BSAUTH) || {};
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [view, setView] = useState(null); // historia en pantalla completa
  const stories = BSDATA.stories || [];
  const pickStory = async (e) => {
    const f = e.target.files && e.target.files[0]; if(!f) return;
    if(f.size > 25*1024*1024) { return; }
    setBusy(true);
    try { const url = await bsUpload(f, 'stories'); if(url && A.createStory) await A.createStory(url); } catch(_e){} finally { setBusy(false); if(fileRef.current) fileRef.current.value=''; }
  };
  return (
    <div style={{ background:BS.surface, borderBottom:`1px solid ${BS.border}` }}>
      <input ref={fileRef} type="file" accept="image/*" onChange={pickStory} style={{ display:'none' }}/>
      <div className="bs-hscr" style={{ display:'flex', gap:12, padding:'12px 14px' }}>
        {/* Tu historia: subir */}
        <div onClick={() => !busy && fileRef.current && fileRef.current.click()} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5, cursor:'pointer', flexShrink:0 }}>
          <div style={{ width:54, height:54, borderRadius:'50%', border:`2px dashed ${BS.borderStrong}`, display:'grid', placeItems:'center', background:BS.surface2, color:BS.brand }}>
            {busy ? <div style={{ width:18, height:18, border:`2px solid ${BS.border}`, borderTopColor:BS.brand, borderRadius:'50%', animation:'bpChatDot 0.8s linear infinite' }}/> : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>}
          </div>
          <span style={{ fontSize:9.5, color:BS.ink, fontWeight:600 }}>{t(['Tu historia','Your story'])}</span>
        </div>
        {stories.map(s => (
          <div key={s.id} onClick={() => setView(s)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5, cursor:'pointer', flexShrink:0 }}>
            <div style={{ padding:2.5, borderRadius:'50%', background:BS.grad }}>
              <div style={{ width:50, height:50, borderRadius:'50%', background:s.color||BS.brand, display:'grid', placeItems:'center', border:`2.5px solid ${BS.surface}`, overflow:'hidden' }}>
                {s.avatar ? <img src={s.avatar} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : <span style={{ fontSize:17, fontWeight:700, color:'#fff' }}>{s.initials}</span>}
              </div>
            </div>
            <span style={{ fontSize:9.5, color:BS.ink, fontWeight:600, maxWidth:56, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.username}</span>
          </div>
        ))}
      </div>
      {view && (
        <div onClick={() => setView(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.92)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
          <div style={{ position:'absolute', top:16, left:16, right:16, display:'flex', alignItems:'center', gap:10, color:'#fff' }}>
            <div style={{ width:34, height:34, borderRadius:'50%', background:view.color||BS.brand, display:'grid', placeItems:'center', fontWeight:800, fontSize:13, overflow:'hidden' }}>{view.avatar ? <img src={view.avatar} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : view.initials}</div>
            <span style={{ fontWeight:700, fontSize:14 }}>{view.username}</span>
            <button onClick={(e)=>{ e.stopPropagation(); setView(null); }} style={{ marginLeft:'auto', background:'rgba(255,255,255,0.15)', border:'none', color:'#fff', width:32, height:32, borderRadius:'50%', cursor:'pointer', fontSize:15 }}>✕</button>
          </div>
          <img src={view.img} alt="" style={{ maxWidth:'100%', maxHeight:'86vh', borderRadius:16, objectFit:'contain' }}/>
        </div>
      )}
    </div>
  );
}

function PostCard({ post, onLike, onSave, onOpen }) {
  const BS = useBS();
  const t = useT();
  const [animLike, setAnimLike] = useState(false);
  const [heart, setHeart] = useState(null);
  const open = () => { if (onOpen) onOpen(post); };
  const handleLike = () => { onLike(post.id); setAnimLike(true); setTimeout(() => setAnimLike(false), 450); };
  const handleDblTap = (e) => {
    if (!post.liked) handleLike();
    const r = e.currentTarget.getBoundingClientRect();
    setHeart({ x:e.clientX-r.left, y:e.clientY-r.top, k:Date.now() });
    setTimeout(() => setHeart(null), 900);
  };
  return (
    <div style={{ marginBottom:2 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px 9px' }}>
        <BSAvatar user={post} size={36} ring/>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}>
            <span style={{ fontSize:13.5, fontWeight:700, color:BS.ink }}>{post.username}</span>
            {post.verified && <BSVerified size={13}/>}
          </div>
          <div style={{ fontSize:11, color:BS.soft }}>{post.location ? post.location : post.city} · {post.time}</div>
        </div>
        <button className="bs-btn" style={{ color:BS.ink2, fontSize:19, padding:'4px 6px' }}>···</button>
      </div>
      <div style={{ position:'relative', aspectRatio:'1', overflow:'hidden', cursor:'pointer', background:BS.surface2 }} onDoubleClick={handleDblTap} onClick={open}>
        <img src={post.img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} loading="lazy"/>
        {heart && <div key={heart.k} style={{ position:'absolute', left:heart.x-24, top:heart.y-24, fontSize:48, pointerEvents:'none', animation:'bsFloat 0.85s ease-out forwards' }}>{'❤️'}</div>}
      </div>
      <div style={{ padding:'10px 14px 6px', display:'flex', alignItems:'center', gap:15 }}>
        <button onClick={handleLike} className="bs-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill={post.liked ? BS.like : 'none'} stroke={post.liked ? BS.like : BS.ink2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: animLike ? 'bsLike 0.4s ease' : 'none' }}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button className="bs-btn" onClick={open} style={{ color:BS.ink2 }} title={t(['Comentarios','Comments'])}>
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </button>
        <button className="bs-btn" style={{ color:BS.ink2 }}>
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
        </button>
        <div style={{ flex:1 }}/>
        <button onClick={() => onSave(post.id)} className="bs-btn">
          <svg width="23" height="23" viewBox="0 0 24 24" fill={post.saved ? BS.brand : 'none'} stroke={post.saved ? BS.brand : BS.ink2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
      </div>
      <div style={{ padding:'2px 14px 18px' }}>
        <div style={{ fontSize:13.5, fontWeight:700, color:BS.ink, marginBottom:5 }}>{fmt(post.likes)} {t(['me gusta','likes'])}</div>
        <div style={{ fontSize:13.5, color:BS.ink, lineHeight:1.55 }}>
          <span style={{ fontWeight:700 }}>{post.username}</span>{' '}{post.caption}{' '}
          {(post.tags||[]).map((tag,i) => <span key={tag} style={{ color:BS.brand, fontWeight:600, cursor:'pointer' }}>{i>0?' ':''} #{tag}</span>)}
        </div>
        <div onClick={open} style={{ fontSize:12.5, color:BS.soft, marginTop:6, cursor:'pointer', fontWeight:600 }}>{t(['Ver comentarios y detalles','View comments and details'])}</div>
      </div>
    </div>
  );
}

// Detalle de post estilo Facebook: foto grande + likes + comentarios
function PostDetail({ post, onClose }) {
  const BS = useBS();
  const t = useT();
  const { lang } = useLang();
  const A = (typeof window !== 'undefined' && window.BSAUTH) || {};
  const [data, setData] = useState(null);
  const [liked, setLiked] = useState(!!post.liked);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let go = true;
    (async () => {
      try { const d = A.postDetail ? await A.postDetail(post.id) : null;
        if (go && d && d.ok) { setData(d.post); setComments(d.comments || []); setLiked(!!d.liked); setLikeCount(d.like_count || 0); }
      } catch (e) {} finally { if (go) setLoading(false); }
    })();
    return () => { go = false; };
  }, [post.id]);

  const doLike = async () => {
    const nl = !liked; setLiked(nl); setLikeCount(c => Math.max(0, c + (nl ? 1 : -1)));
    try { const d = A.likeToggle ? await A.likeToggle(post.id) : null; if (d && d.ok) { setLiked(d.liked); setLikeCount(d.like_count); } } catch (e) {}
  };
  const send = async () => {
    const tx = text.trim(); if (!tx || sending) return;
    setSending(true);
    try { const d = A.addComment ? await A.addComment(post.id, tx) : null;
      if (d && d.ok && d.comment) { setComments(c => [...c, d.comment]); setText(''); }
      else if (d && d.error) { alert(d.error); }
    } catch (e) {} finally { setSending(false); }
  };
  const author = (data && data.author) || { username: post.username, initials: post.initials, avatar_color: post.color, avatar_url: post.avatar, status: 'nuevo' };
  const rel = (iso) => { try { const s = (Date.now() - new Date(iso).getTime()) / 1000; if (s < 60) return t(['ahora','now']); if (s < 3600) return Math.round(s/60)+'m'; if (s < 86400) return Math.round(s/3600)+'h'; return Math.round(s/86400)+'d'; } catch (e) { return ''; } };

  return (
    <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:3000, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
      <div style={{ background:BS.surface, borderRadius:20, overflow:'hidden', width:'100%', maxWidth: A.isWide ? 880 : 460, maxHeight:'92vh', display:'flex', flexDirection: A.isWide ? 'row' : 'column', boxShadow:'0 30px 90px rgba(0,0,0,0.5)' }}>
        <div style={{ background:'#000', flex: A.isWide ? '1 1 55%' : 'none', display:'flex', alignItems:'center', justifyContent:'center', maxHeight: A.isWide ? '92vh' : '46vh' }}>
          <img src={post.img} alt="" style={{ width:'100%', height:'100%', maxHeight: A.isWide ? '92vh' : '46vh', objectFit:'contain', display:'block' }}/>
        </div>
        <div style={{ flex: A.isWide ? '1 1 45%' : '1', minWidth:0, display:'flex', flexDirection:'column', maxHeight: A.isWide ? '92vh' : '46vh' }}>
          {/* header */}
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'14px 16px', borderBottom:`1px solid ${BS.border}` }}>
            <div style={{ width:40, height:40, borderRadius:'50%', background:author.avatar_color||BS.brand, display:'grid', placeItems:'center', color:'#fff', fontWeight:800, fontSize:14, overflow:'hidden', flexShrink:0 }}>{author.avatar_url ? <img src={author.avatar_url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : author.initials}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ fontSize:14, fontWeight:800, color:BS.ink }}>{author.username}</span>
                {author.status && author.status!=='nuevo' && <StatusChip status={author.status} lang={lang} size="sm"/>}
              </div>
              <div style={{ fontSize:11.5, color:BS.soft }}>{(data&&data.location)||post.location||post.city||''} {data?('· '+rel(data.created_at)):''}</div>
            </div>
            <button onClick={onClose} style={{ background:BS.surface2, border:'none', width:30, height:30, borderRadius:'50%', cursor:'pointer', color:BS.ink2, fontSize:15 }}>✕</button>
          </div>
          {/* caption + comments scroll */}
          <div style={{ flex:1, overflowY:'auto', padding:'14px 16px' }} className="bs-scr">
            {(data&&data.caption)||post.caption ? <div style={{ fontSize:14, color:BS.ink, lineHeight:1.55, marginBottom:14 }}><b>{author.username}</b> {(data&&data.caption)||post.caption}</div> : null}
            {loading && <div style={{ fontSize:13, color:BS.soft }}>{t(['Cargando comentarios…','Loading comments…'])}</div>}
            {!loading && comments.length===0 && <div style={{ fontSize:13, color:BS.soft }}>{t(['Sé el primero en comentar.','Be the first to comment.'])}</div>}
            {comments.map(c => (
              <div key={c.id} style={{ display:'flex', gap:10, marginBottom:12 }}>
                <div style={{ width:30, height:30, borderRadius:'50%', background:c.color||BS.brand, display:'grid', placeItems:'center', color:'#fff', fontWeight:800, fontSize:11, overflow:'hidden', flexShrink:0 }}>{c.avatar_url ? <img src={c.avatar_url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : c.initials}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13.5, color:BS.ink, lineHeight:1.45 }}><b>{c.username}</b> {c.text}</div>
                  <div style={{ fontSize:10.5, color:BS.soft, marginTop:2 }}>{rel(c.created_at)}</div>
                </div>
              </div>
            ))}
          </div>
          {/* actions + composer */}
          <div style={{ borderTop:`1px solid ${BS.border}`, padding:'10px 16px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:8 }}>
              <button onClick={doLike} className="bs-btn" style={{ display:'flex', alignItems:'center', gap:6, color: liked ? BS.like : BS.ink2, fontWeight:700, fontSize:13 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill={liked ? BS.like : 'none'} stroke={liked ? BS.like : BS.ink2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                {likeCount}
              </button>
              <span style={{ fontSize:13, color:BS.soft }}>{comments.length} {t(['comentarios','comments'])}</span>
            </div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send(); }} placeholder={A.me ? t(['Escribe un comentario…','Write a comment…']) : t(['Inicia sesión para comentar','Sign in to comment'])} disabled={!A.me}
                style={{ flex:1, border:`1px solid ${BS.border}`, borderRadius:999, background:BS.bg, padding:'10px 14px', fontSize:13.5, color:BS.ink, fontFamily:'inherit', outline:'none' }}/>
              <button onClick={send} disabled={!text.trim()||sending||!A.me} style={{ width:38, height:38, borderRadius:'50%', border:'none', background:BS.brand, color:'#fff', cursor: (text.trim()&&A.me)?'pointer':'default', opacity:(text.trim()&&A.me)?1:0.5, display:'grid', placeItems:'center', flexShrink:0 }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedScreen({ posts, toggleLike, toggleSave, setScreen, onOpenPost }) {
  const BS = useBS();
  const t = useT();
  const [filt, setFilt] = useState('parati');
  // Navegación tipo Facebook (fila de iconos en la barra superior)
  const FBNAV = [
    { id:'feed',      label:t(['Inicio','Home']),        p:'<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
    { id:'community', label:t(['Comunidad','Community']), p:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>' },
    { id:'events',    label:t(['Eventos','Events']),     p:'<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>' },
    { id:'pack',      label:t(['Mi Pack','My Pack']),    p:'<circle cx="7" cy="9" r="1.7"/><circle cx="12" cy="7.4" r="1.7"/><circle cx="17" cy="9" r="1.7"/><path d="M12 12c-2.4 0-4.3 1.9-4.3 3.9 0 1.5 1.2 2.4 2.6 2.4 .8 0 1.1-.4 1.7-.4s.9 .4 1.7 .4c1.4 0 2.6-.9 2.6-2.4 0-2-1.9-3.9-4.3-3.9z"/>' },
    { id:'account',   label:t(['Cuenta','Account']),     p:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M8 4v4"/>' },
    { id:'profile',   label:t(['Perfil','Profile']),     p:'<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
  ];
  const FEED_FILTERS = [
    { id:'parati', label:t(['Para ti','For you']) },
    { id:'pack',   label:t(['Mi Pack','My Pack']) },
    { id:'razas',  label:t(['Razas','Breeds']) },
    { id:'cerca',  label:t(['Cerca de mí','Near me']) },
  ];
  return (
    <div style={{ background:BS.bg }}>
      <div style={{ background:BS.surface, padding:'10px 14px 0', position:'sticky', top:0, zIndex:11, borderBottom:`1px solid ${BS.border}` }}>
        {/* Fila 1: marca + buscador + mensajes (estilo Facebook) */}
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:21, fontWeight:800, letterSpacing:'-0.04em', background:BS.grad, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', flexShrink:0 }}>B Social</div>
          <button className="bs-btn" onClick={() => setScreen('discover')} style={{ flex:1, minWidth:0, display:'flex', alignItems:'center', gap:8, background:BS.surface2, border:`1px solid ${BS.border}`, borderRadius:999, padding:'9px 14px', cursor:'pointer', textAlign:'left' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BS.soft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <span style={{ fontSize:13, color:BS.soft, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{t(['Buscar en B Social','Search B Social'])}</span>
          </button>
          <button className="bs-btn" onClick={() => setScreen('messages')} style={{ flexShrink:0, color:BS.ink2, position:'relative', width:38, height:38, borderRadius:'50%', background:BS.surface2, border:`1px solid ${BS.border}`, display:'grid', placeItems:'center', cursor:'pointer' }}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span style={{ position:'absolute', top:-1, right:-1, width:9, height:9, borderRadius:'50%', background:BS.rose, border:`2px solid ${BS.surface}` }}/>
          </button>
        </div>
        {/* Fila 2: navegación por iconos (estilo Facebook) */}
        <div className="bs-hscr" style={{ display:'flex', gap:2, marginTop:6 }}>
          {FBNAV.map(n => { const on = n.id==='feed'; return (
            <button key={n.id} onClick={() => setScreen(n.id)} className="bs-btn" style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'7px 2px 7px', background:'transparent', border:'none', borderBottom:`2.5px solid ${on?BS.brand:'transparent'}`, cursor:'pointer', fontFamily:'inherit' }}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={on?BS.brand:BS.soft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html:n.p }}/>
              <span style={{ fontSize:9.5, fontWeight:on?700:600, color:on?BS.brand:BS.soft, whiteSpace:'nowrap' }}>{n.label}</span>
            </button>
          ); })}
        </div>
      </div>
      <div className="bs-hscr" style={{ background:BS.surface, padding:'8px 14px 10px', display:'flex', gap:7, borderBottom:`1px solid ${BS.border}` }}>
        {FEED_FILTERS.map((f) => { const on = filt===f.id; return (
          <button key={f.id} onClick={()=>setFilt(f.id)} className="bs-btn" style={{ padding:'7px 16px', borderRadius:999, border:`1.5px solid ${on?BS.brand:BS.border}`, background:'transparent', color: on ? BS.brand : BS.ink2, fontSize:12.5, fontWeight: on?700:600, cursor:'pointer', whiteSpace:'nowrap', fontFamily:'inherit' }}>{f.label}</button>
        ); })}
      </div>
      <StoriesBar/>
      {(() => {
        const shown = filt==='parati' ? posts : posts.filter(p => {
          if(filt==='pack')  return !!(p.pack || p.following || p.is_pack);
          if(filt==='razas') return !!((p.tags && p.tags.length) || p.breed);
          if(filt==='cerca') return !!(p.near || p.location || p.distance!=null);
          return true;
        });
        if(!shown.length) return (
          <div style={{ textAlign:'center', color:BS.soft, padding:'48px 26px', fontSize:14, lineHeight:1.55 }}>
            {filt==='pack'  ? t(['Aún no sigues a nadie. Cuando armes tu Pack, sus publicaciones aparecerán aquí.','You are not following anyone yet. When you build your Pack, their posts will show up here.'])
             : filt==='razas' ? t(['Aún no hay publicaciones por raza.','No breed posts yet.'])
             : filt==='cerca' ? t(['Aún no hay publicaciones cerca de ti.','No posts near you yet.'])
             : t(['Aún no hay publicaciones. ¡Sé el primero en publicar!','No posts yet — be the first to post!'])}
          </div>
        );
        return shown.map(p => <PostCard key={p.id} post={p} onLike={toggleLike} onSave={toggleSave} onOpen={onOpenPost}/>);
      })()}
      <div style={{ height:20 }}/>
    </div>
  );
}

function ProfileScreen({ posts, setScreen }) {
  const BS = useBS();
  const t = useT();
  const { lang } = useLang();
  const A = (typeof window!=='undefined' && window.BSAUTH) || {};
  const r = A.me;
  const me = (r && r.username) ? { username:r.username, name:r.display_name||r.username, city:r.city||'', bio:r.bio||'', avatar:r.avatar_url||'', initials:(r.username||'?').slice(0,2).toUpperCase(), color:r.avatar_color||BS.brand, verified:r.username==='brightpuppy', posts:0, followers:0, following:(A.following||[]).length } : BSDATA.me;
  const [tab, setTab] = useState('posts');
  const [isPublic, setIsPublic] = useState(r ? !!r.is_public : false);
  const persistPublic = async (val) => {
    setIsPublic(val);
    const c = (window.BSAUTH && window.BSAUTH.me) || {};
    if (window.BSAUTH && window.BSAUTH.saveProfile) await window.BSAUTH.saveProfile({
      first_name:c.first_name, last_name:c.last_name, bio:c.bio, city:c.city, state:c.state, zip:c.zip, address:c.address,
      pet_name:c.pet_name, pet_species:c.pet_species, pet_breed:c.pet_breed, pet_color:c.pet_color, pet_age:c.pet_age,
      avatar_url:c.avatar_url, pet_photo_url:c.pet_photo_url, is_public:val,
    });
  };
  return (
    <div className="bs-fade" style={{ background:BS.bg, minHeight:'100%' }}>
      <div style={{ height:210, background: (r&&r.cover_url) ? `url(${r.cover_url}) center ${(r&&r.cover_pos!=null)?r.cover_pos:50}%/cover` : BS.grad, position:'relative' }}>
        <button onClick={() => setScreen('feed')} style={{ position:'absolute', top:44, left:14, background:'rgba(0,0,0,0.32)', border:'none', borderRadius:'50%', width:32, height:32, cursor:'pointer', display:'grid', placeItems:'center', color:'#fff' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <a href="/" style={{ position:'absolute', top:44, right:14, background:'rgba(0,0,0,0.32)', borderRadius:999, padding:'6px 12px', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6, color:'#fff', fontSize:12, fontWeight:700, textDecoration:'none' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
          BPuppy
        </a>
        <button onClick={() => setScreen('editprofile')} title={t(['Cambiar portada','Change cover'])} style={{ position:'absolute', bottom:8, right:14, background:'rgba(0,0,0,0.32)', border:'none', borderRadius:999, padding:'5px 10px', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:5, color:'#fff', fontSize:11, fontWeight:700 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
          {t(['Portada','Cover'])}
        </button>
      </div>
      <div style={{ padding:'0 16px 16px', background:BS.surface, borderBottom:`1px solid ${BS.border}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:-58, marginBottom:12 }}>
          <div style={{ width:108, height:108, borderRadius:'50%', background:me.color, display:'grid', placeItems:'center', fontSize:38, fontWeight:800, color:'#fff', border:`4px solid ${BS.surface}`, fontFamily:'Plus Jakarta Sans,sans-serif', overflow:'hidden', flexShrink:0, position:'relative', zIndex:5, boxShadow:'0 6px 20px rgba(0,0,0,0.20)' }}>
            {me.avatar ? <img src={me.avatar} alt={me.username} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/> : me.initials}
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={() => setScreen('editprofile')} style={{ padding:'8px 16px', borderRadius:10, border:'none', background:BS.grad, fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit', color:'#fff' }}>{t(['Editar perfil','Edit profile'])}</button>
            <button onClick={() => A.logout && A.logout()} title={t(['Cambiar de usuario','Switch account'])} style={{ padding:'8px 14px', borderRadius:10, border:`1.5px solid ${BS.borderStrong}`, background:BS.surface2, fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit', color:BS.ink }}>{t(['Salir','Log out'])}</button>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
          <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:18, fontWeight:800, color:BS.ink }}>{me.username}</span>
          {me.verified && <BSVerified size={16}/>}
        </div>
        <div style={{ fontSize:13, color:BS.ink2, marginBottom:8 }}>{me.name} · {me.city}</div>
        <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:8 }}>
          <StatusChip status={(r&&r.status)||'nuevo'} lang={lang}/>
          <BadgeChips badges={(r&&r.badges)||[]} lang={lang}/>
        </div>
        {r && r.free_grooming > 0 && (
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:700, color:'#1EB87A', background:'rgba(30,184,122,0.1)', border:'1px solid rgba(30,184,122,0.3)', borderRadius:999, padding:'4px 11px', marginBottom:10 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8"/><rect x="2" y="7" width="20" height="5" rx="1"/><path d="M12 22V7M12 7C12 7 11 2 8 2a2.5 2.5 0 000 5M12 7s1-5 4-5a2.5 2.5 0 010 5"/></svg>
            {r.free_grooming} {t(['grooming gratis en FL','free grooming in FL'])}
          </div>
        )}
        <div style={{ fontSize:13.5, color:BS.ink, marginBottom:14 }}>{me.bio}</div>
        <div style={{ display:'flex', gap:24 }}>
          {[{n:me.posts,l:t(['posts','posts'])},{n:me.followers,l:t(['seguidores','followers'])},{n:me.following,l:t(['siguiendo','following'])}].map((s,si) => (
            <div key={si}><div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:18, fontWeight:800, color:BS.ink }}>{s.n}</div><div style={{ fontSize:11, color:BS.soft }}>{s.l}</div></div>
          ))}
        </div>
      </div>
      <div style={{ padding:'14px 16px', background:BS.surface, borderBottom:`1px solid ${BS.border}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:14, border:`1.5px solid ${isPublic?BS.brand:BS.border}`, background: isPublic?'rgba(14,165,233,0.07)':BS.surface2 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13.5, fontWeight:700, color:BS.ink }}>{t(['Perfil público','Public profile'])}</div>
            <div style={{ fontSize:11.5, color:BS.soft, lineHeight:1.45 }}>{isPublic ? t(['Visible en Comunidad: tu usuario, ciudad y tu mascota (nombre y raza). Nunca tu contacto.','Visible in Community: your username, city and pet (name and breed). Never your contact info.']) : t(['Tu perfil es privado. Actívalo para aparecer en Comunidad.','Your profile is private. Turn it on to appear in Community.'])}</div>
          </div>
          <button onClick={() => persistPublic(!isPublic)} className="bs-btn" style={{ width:46, height:26, borderRadius:999, background: isPublic?BS.grad:BS.border, position:'relative', flexShrink:0, cursor:'pointer', border:'none' }}>
            <span style={{ position:'absolute', top:3, left: isPublic?23:3, width:20, height:20, borderRadius:'50%', background:'#fff', transition:'left .2s', boxShadow:'0 1px 4px rgba(0,0,0,0.3)' }}/>
          </button>
        </div>
        <button onClick={() => setScreen('account')} className="bs-btn" style={{ display:'flex', alignItems:'center', gap:12, width:'100%', marginTop:10, padding:'13px 14px', borderRadius:14, border:`1.5px solid ${BS.border}`, background:BS.surface2, cursor:'pointer', fontFamily:'inherit', textAlign:'left' }}>
          <span style={{ flexShrink:0, color:BS.brand, display:'inline-flex' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M8 4v4"/></svg></span>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:13.5, fontWeight:700, color:BS.ink }}>{t(['Mi Cuenta','My Account'])}</div>
            <div style={{ fontSize:11.5, color:BS.soft }}>{t(['Mascotas, grooming, pagos y membresías · privado','Pets, grooming, payments and memberships · private'])}</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BS.soft} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      <div style={{ display:'flex', background:BS.surface, borderBottom:`1px solid ${BS.border}` }}>
        {[['posts',t(['Posts','Posts'])],['pets',t(['Mascotas','Pets'])],['saved',t(['Guardados','Saved'])]].map(([tb,lbl]) => (
          <button key={tb} onClick={() => setTab(tb)} style={{ flex:1, padding:'13px', border:'none', background:'none', cursor:'pointer', borderBottom:`2.5px solid ${tab===tb ? BS.brand : 'transparent'}`, fontSize:13, fontWeight:700, color: tab===tb ? BS.brand : BS.soft, fontFamily:'inherit' }}>{lbl}</button>
        ))}
      </div>
      {tab==='posts' && <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
        {posts.slice(0,6).map(p => <div key={p.id} style={{ aspectRatio:'1', overflow:'hidden', cursor:'pointer' }}><img src={p.img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/></div>)}
      </div>}
      {tab==='pets' && <div style={{ padding:16 }}>
        {BSDATA.pets.map(pet => (
          <div key={pet.id} className="bs-pop" style={{ background:BS.surface, borderRadius:18, overflow:'hidden', border:`1px solid ${BS.border}` }}>
            <img src={pet.img} alt="" style={{ width:'100%', height:160, objectFit:'cover', display:'block' }}/>
            <div style={{ padding:'14px 16px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:20, fontWeight:800, color:BS.ink }}>{pet.name}</span>
                {pet.bpuppy && <span style={{ background:BS.brand, color:'#fff', fontSize:10, fontWeight:700, padding:'2px 9px', borderRadius:999 }}>BrightPuppy</span>}
              </div>
              <div style={{ fontSize:13, color:BS.ink2 }}>{pet.breed} · {pet.gender==='Hembra'?t(['Hembra','Female']):pet.gender==='Macho'?t(['Macho','Male']):pet.gender} · {pet.dob}</div>
            </div>
          </div>
        ))}
      </div>}
      {tab==='saved' && <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
        {posts.filter(p => p.saved).map(p => <div key={p.id} style={{ aspectRatio:'1', overflow:'hidden' }}><img src={p.img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/></div>)}
      </div>}
    </div>
  );
}

function PackScreen({ setScreen }) {
  const BS = useBS();
  const t = useT();
  const [added, setAdded] = useState(new Set());
  const toggle = id => setAdded(s => { const n=new Set(s); n.has(id)?n.delete(id):n.add(id); return n; });
  return (
    <div className="bs-fade" style={{ background:BS.bg, minHeight:'100%' }}>
      <div style={{ padding:'14px 16px 10px', display:'flex', alignItems:'center', background:BS.surface, borderBottom:`1px solid ${BS.border}`, position:'sticky', top:0, zIndex:10 }}>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:20, fontWeight:800, color:BS.ink, flex:1 }}>{t(['Mi Pack','My Pack'])}</div>
        <div style={{ background:BS.grad, color:'#fff', borderRadius:999, padding:'2px 10px', fontSize:12, fontWeight:700 }}>{BSDATA.pack.length}</div>
      </div>
      <div style={{ padding:'10px 14px', background:BS.surface, borderBottom:`1px solid ${BS.border}` }}>
        <div style={{ background:BS.surface2, borderRadius:12, padding:'10px 14px', display:'flex', alignItems:'center', gap:9 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BS.soft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{ fontSize:13.5, color:BS.soft }}>{t(['Buscar en tu Pack...','Search your Pack...'])}</span>
        </div>
      </div>
      <div style={{ padding:'14px 16px 6px' }}>
        <div style={{ fontSize:11, fontWeight:700, color:BS.soft, marginBottom:10, textTransform:'uppercase', letterSpacing:'0.06em' }}>{t(['Sugerencias','Suggestions'])}</div>
        <div className="bs-hscr" style={{ display:'flex', gap:10 }}>
          {BSDATA.suggestions.map(u => (
            <div key={u.id} style={{ flexShrink:0, background:BS.surface, borderRadius:18, padding:'14px 12px', width:120, textAlign:'center', border:`1px solid ${BS.border}` }}>
              <BSAvatar user={u} size={44}/>
              <div style={{ marginTop:8, fontSize:11.5, fontWeight:700, color:BS.ink, marginBottom:1 }}>{u.username}</div>
              <div style={{ fontSize:10, color:BS.soft, marginBottom:8 }}>{u.pet}</div>
              <button onClick={() => toggle(u.id)} className="bs-btn" style={{ width:'100%', padding:'6px', borderRadius:8, border:'none', background: added.has(u.id) ? BS.surface2 : BS.grad, color: added.has(u.id) ? BS.ink2 : '#fff', fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                {added.has(u.id) ? t(['En Pack','In Pack']) : t(['+ Pack','+ Pack'])}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:'14px 0 0' }}>
        {BSDATA.pack.map((u,i) => (
          <div key={u.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 16px', background:BS.surface, borderBottom:`1px solid ${BS.border}` }}>
            <div style={{ position:'relative' }}>
              <BSAvatar user={u} size={44}/>
              <div style={{ position:'absolute', bottom:1, right:1, width:10, height:10, borderRadius:'50%', background: i<2 ? BS.online : BS.border, border:`2px solid ${BS.bg}` }}/>
            </div>
            <div style={{ flex:1 }}>
              <span style={{ fontSize:14, fontWeight:700, color:BS.ink }}>{u.username}</span>
              <div style={{ fontSize:11.5, color:BS.soft }}>{u.city} · {u.pet}</div>
            </div>
            <button className="bs-btn" style={{ padding:'7px 14px', borderRadius:9, border:`1.5px solid ${BS.borderStrong}`, background:'none', fontSize:12, fontWeight:600, color:BS.ink2, cursor:'pointer', fontFamily:'inherit' }}>{t(['Mensaje','Message'])}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiscoverScreen({ setScreen }) {
  const BS = useBS();
  const t = useT();
  const SUPA = 'https://oqqwmcplljirbreowrll.supabase.co';
  const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4';
  const CATS = [
    { id:'dog_parks', label:t(['Parques de perros','Dog parks']) },
    { id:'dog_cafes', label:t(['Cafés dog-friendly','Dog-friendly cafés']) },
    { id:'cat_cafes', label:t(['Cat cafés','Cat cafés']) },
    { id:'dog_restaurants', label:t(['Restaurantes dog-friendly','Dog-friendly restaurants']) },
    { id:'adoption', label:t(['Adopción (refugios)','Adoption (shelters)']) },
    { id:'pet_stores', label:t(['Tiendas de mascotas','Pet stores']) },
    { id:'vets', label:t(['Veterinarias','Vets']) },
    { id:'grooming', label:t(['Grooming','Grooming']) },
    { id:'beaches', label:t(['Playas dog-friendly','Dog beaches']) },
    { id:'trails', label:t(['Senderos','Trails']) },
  ];
  const ST = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
  const [cat, setCat] = useState('dog_parks');
  const [stt, setStt] = useState('');
  const [city, setCity] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const search = async () => {
    if(!stt && !city){ setErr(t(['Elige un estado o ciudad','Pick a state or city'])); return; }
    setLoading(true); setErr(''); setResults(null);
    try{
      const r = await fetch(SUPA+'/functions/v1/places', { method:'POST', headers:{ 'Content-Type':'application/json', 'apikey':ANON, 'Authorization':'Bearer '+ANON }, body: JSON.stringify({ action:'search', category:cat, city:city.trim(), state:stt.trim() }) });
      const d = await r.json();
      if(d && d.ok){ setResults(d.results||[]); } else { setErr((d&&d.error)||t(['No pude buscar','Could not search'])); setResults([]); }
    }catch(e){ setErr(t(['Error de red, intenta de nuevo','Network error, try again'])); setResults([]); }
    setLoading(false);
  };
  return (
    <div className="bs-fade" style={{ background:BS.bg, minHeight:'100%' }}>
      <div style={{ padding:'14px 16px 12px', background:BS.surface, borderBottom:`1px solid ${BS.border}`, position:'sticky', top:0, zIndex:10 }}>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:20, fontWeight:800, color:BS.ink, marginBottom:4 }}>{t(['Descubrir','Discover'])}</div>
        <div style={{ fontSize:12.5, color:BS.soft, marginBottom:10 }}>{t(['Lugares dog-friendly por estado y ciudad','Dog-friendly places by state and city'])}</div>
        <button onClick={()=> setScreen && setScreen('mapa')} className="bs-btn" style={{ width:'100%', padding:'9px', borderRadius:10, border:`1.5px solid ${BS.border}`, background:BS.surface2, color:BS.ink, fontSize:12.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit', marginBottom:10 }}>{t(['Mapa comunitario (bebederos, comida, vacunación)','Community map (fountains, food, vaccination)'])}</button>
        <div style={{ display:'flex', gap:8, marginBottom:10 }}>
          <input list="bs-discover-states" value={stt} onChange={e=>setStt(e.target.value)} placeholder={t(['Estado','State'])} style={{ flex:1, minWidth:0, padding:'9px 12px', borderRadius:10, border:`1.5px solid ${BS.border}`, background:BS.surface2, color:BS.ink, fontSize:13, fontFamily:'inherit' }}/>
          <input value={city} onChange={e=>setCity(e.target.value)} placeholder={t(['Ciudad (opcional)','City (optional)'])} style={{ flex:1, minWidth:0, padding:'9px 12px', borderRadius:10, border:`1.5px solid ${BS.border}`, background:BS.surface2, color:BS.ink, fontSize:13, fontFamily:'inherit' }}/>
        </div>
        <datalist id="bs-discover-states">{ST.map(s=><option key={s} value={s}/>)}</datalist>
        <div className="bs-hscr" style={{ display:'flex', gap:7, marginBottom:10 }}>
          {CATS.map(c => (
            <button key={c.id} onClick={()=>setCat(c.id)} className="bs-btn" style={{ padding:'6px 13px', borderRadius:999, border:`1.5px solid ${cat===c.id?BS.brand:BS.border}`, background: cat===c.id ? BS.brand : 'transparent', color: cat===c.id ? '#fff' : BS.ink2, fontSize:12, fontWeight:cat===c.id?700:600, cursor:'pointer', whiteSpace:'nowrap', fontFamily:'inherit' }}>{c.label}</button>
          ))}
        </div>
        <button onClick={search} disabled={loading} className="bs-btn" style={{ width:'100%', padding:'11px', borderRadius:12, border:'none', background:BS.grad, color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit', opacity:loading?0.7:1 }}>{loading ? t(['Buscando…','Searching…']) : t(['Buscar lugares','Search places'])}</button>
      </div>
      <div style={{ padding:'14px 16px 24px' }}>
        {err && <div style={{ color:BS.rose, fontSize:13, marginBottom:10 }}>{err}</div>}
        {loading && <div style={{ textAlign:'center', color:BS.soft, padding:'30px', fontSize:13 }}>{t(['Buscando lugares…','Searching places…'])}</div>}
        {!loading && results===null && !err && <div style={{ textAlign:'center', color:BS.soft, padding:'40px 20px', fontSize:13.5, lineHeight:1.6 }}>{t(['Elige una categoría y tu zona, y toca Buscar lugares.','Pick a category and your area, then tap Search places.'])}</div>}
        {!loading && results && results.length===0 && !err && <div style={{ textAlign:'center', color:BS.soft, padding:'40px 20px', fontSize:13.5 }}>{t(['Sin resultados en esa zona. Prueba otra ciudad o categoría.','No results in that area. Try another city or category.'])}</div>}
        {!loading && results && results.map(pl => (
          <a key={pl.place_id} href={pl.maps_url} target="_blank" rel="noopener noreferrer" style={{ display:'flex', alignItems:'flex-start', gap:12, background:BS.surface, borderRadius:14, padding:'12px 14px', marginBottom:8, border:`1px solid ${BS.border}`, textDecoration:'none' }}>
            <div style={{ width:40, height:40, borderRadius:11, background:BS.surface2, display:'grid', placeItems:'center', flexShrink:0, color:BS.brand }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BS.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13.5, fontWeight:700, color:BS.ink }}>{pl.name}</div>
              <div style={{ fontSize:11.5, color:BS.soft, marginTop:1 }}>{pl.address}</div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:5, flexWrap:'wrap' }}>
                {pl.rating!=null && <span style={{ fontSize:11.5, fontWeight:700, color:BS.ink2 }}>★ {pl.rating} <span style={{ color:BS.soft, fontWeight:500 }}>({pl.reviews})</span></span>}
                {pl.open_now===true && <span style={{ fontSize:11, fontWeight:700, color:'#1EB87A' }}>{t(['Abierto','Open'])}</span>}
                {pl.open_now===false && <span style={{ fontSize:11, fontWeight:700, color:BS.rose }}>{t(['Cerrado','Closed'])}</span>}
                <span style={{ fontSize:11.5, fontWeight:700, color:BS.brand, marginLeft:'auto' }}>{t(['Ver en mapa →','View on map →'])}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function UploadScreen({ setScreen }) {
  const BS = useBS();
  const t = useT();
  const [step, setStep] = useState(0);
  const [scanState, setScanState] = useState('idle');
  const [caption, setCaption] = useState('');
  const [vis, setVis] = useState('public');
  const [loc, setLoc] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [isVideo, setIsVideo] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState('');
  const fileRef = useRef(null);
  const pickFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (f.size > 25 * 1024 * 1024) { setErr(t(['El archivo supera 25 MB','The file exceeds 25 MB'])); return; }
    setErr(''); setFile(f); setIsVideo(/^video\//.test(f.type));
    try { setPreview(URL.createObjectURL(f)); } catch(_e) {}
    setStep(1);
  };
  const startScan = () => { setStep(2); setScanState('scanning'); setTimeout(() => setScanState('approved'), 2200); };
  const doPublish = async () => {
    const A = window.BSAUTH || {}; const sb = window._bsSb;
    setErr(''); setUploading(true);
    try {
      let mediaUrl = '';
      if (file && sb) {
        const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
        const path = (Date.now() + '_' + Math.random().toString(36).slice(2)) + '.' + ext;
        const up = await sb.storage.from('social-media').upload(path, file, { contentType: file.type, upsert: false });
        if (up.error) throw up.error;
        const { data: pub } = sb.storage.from('social-media').getPublicUrl(path);
        mediaUrl = pub.publicUrl;
      }
      if (A.createPost) { const d = await A.createPost({ caption, media_url: mediaUrl, visibility: vis, location: loc.trim() }); if (!(d && d.ok)) throw new Error((d && d.error) || t(['No se pudo publicar','We couldn’t post'])); }
      setScreen('feed');
    } catch(e) { setErr((e && e.message) || t(['No se pudo subir el archivo','We couldn’t upload the file'])); setUploading(false); }
  };
  return (
    <div className="bs-fade" style={{ background:BS.bg, minHeight:'100%', display:'flex', flexDirection:'column' }}>
      <input ref={fileRef} type="file" accept="image/*,video/mp4,video/quicktime" onChange={pickFile} style={{ display:'none' }}/>
      <div style={{ background:BS.surface, padding:'12px 16px', display:'flex', alignItems:'center', gap:12, borderBottom:`1px solid ${BS.border}`, position:'sticky', top:0, zIndex:10 }}>
        <button onClick={() => step>0 ? setStep(s=>s-1) : setScreen('feed')} className="bs-btn" style={{ color:BS.ink2, fontSize:18 }}>{step===0?'✕':'‹'}</button>
        <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:17, fontWeight:700, color:BS.ink, flex:1 }}>{[t(['Nueva publicación','New post']),t(['Agregar detalles','Add details']),t(['Publicando…','Posting…']),t(['Listo','Done'])][step]}</span>
        {step===1 && <button onClick={startScan} className="bs-btn" style={{ background:BS.grad, color:'#fff', border:'none', padding:'7px 16px', borderRadius:9, fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>{t(['Siguiente','Next'])}</button>}
      </div>
      {step===0 && (
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:24, gap:16 }}>
          <div onClick={() => fileRef.current && fileRef.current.click()} style={{ width:'100%', aspectRatio:'1', maxWidth:280, borderRadius:20, border:`2px dashed ${BS.borderStrong}`, background:BS.surface, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', cursor:'pointer', gap:14 }}>
            <div style={{ width:64, height:64, borderRadius:20, background:BS.surface2, display:'grid', placeItems:'center', color:BS.brand }}><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3.2"/><path d="M8 5l1.5-2h5L16 5"/></svg></div>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:15, fontWeight:700, color:BS.ink }}>{t(['Sube tu foto o video','Upload your photo or video'])}</div>
              <div style={{ fontSize:12, color:BS.soft, marginTop:3 }}>{t(['JPG, PNG, WEBP, MP4 · hasta 25 MB','JPG, PNG, WEBP, MP4 · up to 25 MB'])}</div>
            </div>
          </div>
          {err && <div style={{ fontSize:12.5, color:BS.like, fontWeight:600 }}>{err}</div>}
          <div style={{ display:'flex', gap:10, width:'100%', maxWidth:280 }}>
            <button onClick={() => fileRef.current && fileRef.current.click()} className="bs-btn" style={{ flex:1, padding:'13px', borderRadius:14, border:'none', background:BS.grad, color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>{t(['Elegir archivo','Choose file'])}</button>
          </div>
        </div>
      )}
      {step===1 && (
        <div>
          <div style={{ display:'flex', gap:12, padding:'14px 16px', alignItems:'flex-start', borderBottom:`1px solid ${BS.border}`, background:BS.surface }}>
            {isVideo
              ? <video src={preview} style={{ width:70, height:70, objectFit:'cover', borderRadius:12, background:'#000' }} muted/>
              : <img src={preview || 'assets/photos/g04.webp'} alt="" style={{ width:70, height:70, objectFit:'cover', borderRadius:12 }}/>}
            <textarea value={caption} onChange={e => setCaption(e.target.value)} placeholder={t(['Escribe un pie de foto...','Write a caption...'])} style={{ flex:1, border:'none', background:'none', resize:'none', fontSize:14, color:BS.ink, lineHeight:1.55, minHeight:80, padding:0 }}/>
          </div>
          <div style={{ padding:'12px 16px', background:BS.surface, marginTop:8, display:'flex', alignItems:'center', gap:9 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BS.brand} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}><path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
            <input value={loc} onChange={e=>setLoc(e.target.value)} placeholder={t(['Agregar ubicación (para «Cerca de mí»)','Add location (for “Near me”)'])} style={{ flex:1, border:'none', background:'none', fontSize:13.5, color:BS.ink, fontFamily:'inherit' }}/>
          </div>
          <div style={{ padding:'14px 16px', background:BS.surface, marginTop:8 }}>
            {[['public',t(['Público','Public']),t(['Todos pueden ver','Everyone can see'])],['pack',t(['Solo mi Pack','My Pack only']),t(['Solo mis amigos','Only my friends'])],['private',t(['Privado','Private']),t(['Solo yo','Only me'])]].map(([v,l,sub]) => (
              <div key={v} onClick={() => setVis(v)} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', borderRadius:12, border:`1.5px solid ${vis===v ? BS.brand : BS.border}`, background: vis===v ? 'rgba(14,165,233,0.08)' : BS.surface2, cursor:'pointer', marginBottom:8 }}>
                <div style={{ flex:1 }}><div style={{ fontSize:13.5, fontWeight:700, color:BS.ink }}>{l}</div><div style={{ fontSize:11.5, color:BS.soft }}>{sub}</div></div>
                <div style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${vis===v ? BS.brand : BS.borderStrong}`, background: vis===v ? BS.brand : 'transparent', display:'grid', placeItems:'center' }}>
                  {vis===v && <div style={{ width:7, height:7, borderRadius:'50%', background:'#fff' }}/>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {step===2 && (
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:28, gap:22 }}>
          <div style={{ position:'relative', width:'100%', maxWidth:240, borderRadius:20, overflow:'hidden' }}>
            {isVideo
              ? <video src={preview} style={{ width:'100%', aspectRatio:'1', objectFit:'cover', display:'block', background:'#000' }} muted/>
              : <img src={preview || 'assets/photos/g04.webp'} alt="" style={{ width:'100%', aspectRatio:'1', objectFit:'cover', display:'block' }}/>}
            {(scanState==='scanning' || uploading) && (
              <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.2)' }}>
                <div style={{ position:'absolute', left:0, right:0, height:3, background:BS.brand, boxShadow:`0 0 18px ${BS.brand}`, animation:'bsScan 1.1s ease-in-out infinite' }}/>
              </div>
            )}
            {scanState==='approved' && !uploading && (
              <div style={{ position:'absolute', inset:0, background:'rgba(0,232,122,0.14)', display:'grid', placeItems:'center' }}>
                <div className="bs-pop" style={{ background:'rgba(0,232,122,0.9)', borderRadius:'50%', width:56, height:56, display:'grid', placeItems:'center' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
              </div>
            )}
          </div>
          <div style={{ textAlign:'center' }}>
            {uploading && <><div style={{ fontSize:16, fontWeight:700, color:BS.ink, marginBottom:6 }}>{t(['Subiendo…','Uploading…'])}</div><div style={{ fontSize:13, color:BS.soft }}>{t(['Guardando tu publicación','Saving your post'])}</div></>}
            {!uploading && scanState==='scanning' && <><div style={{ fontSize:16, fontWeight:700, color:BS.ink, marginBottom:6 }}>{t(['Revisando contenido…','Reviewing content…'])}</div><div style={{ fontSize:13, color:BS.soft }}>{t(['Verificamos que todo sea seguro','We make sure everything is safe'])}</div></>}
            {!uploading && scanState==='approved' && <>
              <div style={{ fontSize:17, fontWeight:800, color:BS.online, marginBottom:5 }}>{t(['Listo para compartir','Ready to share'])}</div>
              <div style={{ fontSize:13, color:BS.soft, marginBottom:18 }}>{t(['Toca para publicar en la comunidad','Tap to post to the community'])}</div>
              {err && <div style={{ fontSize:12.5, color:BS.like, fontWeight:600, marginBottom:12 }}>{err}</div>}
              <button onClick={doPublish} className="bs-btn" style={{ padding:'14px 44px', borderRadius:14, border:'none', background:BS.grad, color:'#fff', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit', boxShadow:BS.glow }}>{t(['Publicar ahora','Post now'])}</button>
            </>}
          </div>
        </div>
      )}
    </div>
  );
}

function PetsScreen() {
  const BS = useBS();
  const t = useT();
  const pet = BSDATA.pets[0];
  const maxW = Math.max(...pet.weight.map(w=>w.v));
  return (
    <div className="bs-fade" style={{ background:BS.bg, minHeight:'100%' }}>
      <div style={{ padding:'14px 16px', background:BS.surface, borderBottom:`1px solid ${BS.border}`, position:'sticky', top:0, zIndex:10 }}>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:20, fontWeight:800, color:BS.ink }}>{t(['Mis Mascotas','My Pets'])}</div>
      </div>
      <div style={{ margin:'14px 16px 0', background:BS.surface, borderRadius:20, overflow:'hidden', border:`1px solid ${BS.border}` }}>
        <div style={{ position:'relative' }}>
          <img src={pet.img} alt="" style={{ width:'100%', height:170, objectFit:'cover', display:'block' }}/>
          {pet.bpuppy && <div style={{ position:'absolute', top:12, right:12, background:BS.brand, color:'#fff', padding:'4px 12px', borderRadius:999, fontSize:11.5, fontWeight:700 }}>BrightPuppy</div>}
        </div>
        <div style={{ padding:'14px 16px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:3 }}>
            <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:22, fontWeight:800, color:BS.ink }}>{pet.name}</span>
            <span style={{ fontSize:12, fontWeight:700, color:BS.brand, background:'rgba(255,85,32,0.12)', padding:'2px 10px', borderRadius:999 }}>{pet.breed}</span>
          </div>
          <div style={{ fontSize:12.5, color:BS.soft }}>{pet.gender==='Hembra'?t(['Hembra','Female']):pet.gender==='Macho'?t(['Macho','Male']):pet.gender} · {t(['Nació','Born'])} {pet.dob}</div>
        </div>
      </div>
      <div style={{ margin:'12px 16px 0', background:BS.surface, borderRadius:16, overflow:'hidden', border:`1px solid ${BS.border}` }}>
        <div style={{ padding:'12px 16px', borderBottom:`1px solid ${BS.border}`, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:14, fontWeight:700, color:BS.ink }}>{t(['Vacunas','Vaccines'])}</span>
          <span style={{ fontSize:12, color:BS.soft }}>{pet.vaccines.filter(v=>v.done).length}/{pet.vaccines.length}</span>
        </div>
        {pet.vaccines.map(v => (
          <div key={v.name} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 16px', borderBottom:`1px solid ${BS.border}` }}>
            <div style={{ width:32, height:32, borderRadius:'50%', background: v.done ? 'rgba(0,232,122,0.12)' : 'rgba(255,85,32,0.1)', display:'grid', placeItems:'center', fontSize:14 }}>{v.done ? '✅' : '⏰'}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13.5, fontWeight:700, color:BS.ink }}>{v.name}</div>
              <div style={{ fontSize:11.5, color:BS.soft }}>{v.date}</div>
            </div>
            {v.upcoming && <span style={{ background:'rgba(255,85,32,0.1)', color:BS.brand, fontSize:11, fontWeight:700, padding:'3px 9px', borderRadius:999 }}>{t(['Próxima','Upcoming'])}</span>}
          </div>
        ))}
      </div>
      <div style={{ margin:'12px 16px 20px', background:BS.surface, borderRadius:16, padding:'14px 16px', border:`1px solid ${BS.border}` }}>
        <div style={{ fontSize:14, fontWeight:700, color:BS.ink, marginBottom:14 }}>{t(['Peso (kg)','Weight (kg)'])}</div>
        <div style={{ display:'flex', alignItems:'flex-end', gap:8, height:80 }}>
          {pet.weight.map(w => (
            <div key={w.m} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
              <span style={{ fontSize:9, color:BS.soft, fontWeight:600 }}>{w.v}</span>
              <div style={{ width:'100%', background:BS.grad, borderRadius:'4px 4px 0 0', height:`${w.v/maxW*70}px` }}/>
              <span style={{ fontSize:9, color:BS.soft }}>{w.m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MessagesThread({ m, BS, onBack }) {
  const t = useT();
  const [msgs, setMsgs] = useState(() => ([
    { from:'them', text:m.preview, time:m.time },
  ]));
  const [draft, setDraft] = useState('');
  const send = () => {
    const tx = draft.trim(); if(!tx) return;
    setMsgs(prev => [...prev, { from:'me', text:tx, time:t(['ahora','now']) }]);
    setDraft('');
  };
  return (
    <div className="bs-fade" style={{ background:BS.bg, minHeight:'100%', display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'12px 16px', background:BS.surface, borderBottom:`1px solid ${BS.border}`, display:'flex', alignItems:'center', gap:12, position:'sticky', top:0, zIndex:10 }}>
        <button onClick={onBack} className="bs-btn" style={{ color:BS.ink2, fontSize:16 }}>{'<'}</button>
        <BSAvatar user={m} size={36}/>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:14.5, fontWeight:700, color:BS.ink }}>{m.user}</div>
          <div style={{ fontSize:11, color: m.online ? BS.online : BS.soft }}>{m.online ? t(['En línea','Online']) : t(['Desconectado','Offline'])}</div>
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'16px', display:'flex', flexDirection:'column', gap:8 }}>
        {msgs.map((x,i) => (
          <div key={i} style={{ alignSelf: x.from==='me' ? 'flex-end' : 'flex-start', maxWidth:'76%' }}>
            <div style={{ padding:'9px 13px', borderRadius:16, fontSize:13.5, lineHeight:1.4, background: x.from==='me' ? BS.brand : BS.surface, color: x.from==='me' ? '#fff' : BS.ink, border: x.from==='me' ? 'none' : `1px solid ${BS.border}`, borderBottomRightRadius: x.from==='me'?4:16, borderBottomLeftRadius: x.from==='me'?16:4 }}>{x.text}</div>
            <div style={{ fontSize:10, color:BS.soft, marginTop:3, textAlign: x.from==='me' ? 'right' : 'left' }}>{x.time}</div>
          </div>
        ))}
        <div style={{ alignSelf:'center', margin:'8px 0', padding:'8px 12px', borderRadius:10, background:BS.surface2, border:`1px solid ${BS.border}`, fontSize:11, color:BS.soft, textAlign:'center', maxWidth:'90%' }}>
          {t(['La mensajería en tiempo real entre miembros está activándose. Por ahora puedes ver tus conversaciones y redactar; el envío entre cuentas llegará muy pronto.','Real-time messaging between members is rolling out. For now you can view your conversations and draft messages; sending between accounts is coming very soon.'])}
        </div>
      </div>
      <div style={{ padding:'12px 16px', background:BS.surface, borderTop:`1px solid ${BS.border}`, display:'flex', alignItems:'center', gap:10 }}>
        <input value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send(); }} placeholder={t(['Escribe un mensaje…','Write a message…'])} style={{ flex:1, border:`1px solid ${BS.border}`, borderRadius:999, background:BS.bg, padding:'10px 15px', fontSize:13.5, color:BS.ink, fontFamily:'inherit', outline:'none' }}/>
        <button onClick={send} style={{ width:40, height:40, borderRadius:'50%', border:'none', background:BS.brand, color:'#fff', cursor:'pointer', display:'grid', placeItems:'center', flexShrink:0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
    </div>
  );
}

function MessagesScreen({ setScreen }) {
  const BS = useBS();
  const t = useT();
  const [active, setActive] = useState(null);
  if (active) return <MessagesThread m={active} BS={BS} onBack={() => setActive(null)}/>;
  return (
    <div className="bs-fade" style={{ background:BS.bg, minHeight:'100%' }}>
      <div style={{ padding:'14px 16px', background:BS.surface, borderBottom:`1px solid ${BS.border}`, display:'flex', alignItems:'center', gap:12, position:'sticky', top:0, zIndex:10 }}>
        <button onClick={() => setScreen('feed')} className="bs-btn" style={{ color:BS.ink2, fontSize:16 }}>{'<'}</button>
        <div style={{ flex:1, fontFamily:'Bricolage Grotesque,sans-serif', fontSize:20, fontWeight:800, color:BS.ink }}>{t(['Mensajes','Messages'])}</div>
      </div>
      {BSDATA.messages.map((m,i) => (
        <div key={i} onClick={() => setActive(m)} style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 16px', background:BS.surface, borderBottom:`1px solid ${BS.border}`, cursor:'pointer' }}>
          <div style={{ position:'relative' }}>
            <BSAvatar user={m} size={46}/>
            <div style={{ position:'absolute', bottom:1, right:1, width:11, height:11, borderRadius:'50%', background: m.online ? BS.online : BS.border, border:`2px solid ${BS.bg}` }}/>
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <span style={{ fontSize:14, fontWeight: m.unread ? 700 : 600, color:BS.ink }}>{m.user}</span>
              <span style={{ fontSize:11, color:BS.soft }}>{m.time}</span>
            </div>
            <div style={{ fontSize:13, color: m.unread ? BS.ink2 : BS.soft, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{m.preview}</div>
          </div>
          {m.unread && <div style={{ width:9, height:9, borderRadius:'50%', background:BS.brand, flexShrink:0 }}/>}
        </div>
      ))}
    </div>
  );
}

function ScreenHeader({ title, sub }) {
  const BS = useBS();
  return (
    <div style={{ padding:'16px 18px', background:BS.surface, borderBottom:`1px solid ${BS.border}`, position:'sticky', top:0, zIndex:10 }}>
      <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:21, fontWeight:800, color:BS.ink, letterSpacing:'-0.02em' }}>{title}</div>
      {sub && <div style={{ fontSize:12.5, color:BS.ink2, marginTop:2 }}>{sub}</div>}
    </div>
  );
}

function SearchBar({ value, onChange, placeholder, BS }) {
  return (
    <div style={{ margin:'12px 16px 4px', background:BS.surface2, borderRadius:12, padding:'10px 13px', display:'flex', alignItems:'center', gap:9, border:`1px solid ${BS.border}` }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={BS.soft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{ flex:1, border:'none', background:'none', fontSize:13.5, color:BS.ink, fontFamily:'inherit' }}/>
      {value && <button onClick={()=>onChange('')} className="bs-btn" style={{ color:BS.soft, fontSize:15 }}>✕</button>}
    </div>
  );
}

function CommunityScreen() {
  const BS = useBS();
  const t = useT();
  const [following, setFollowing] = useState(new Set());
  const [q, setQ] = useState('');
  const toggle = (m) => {
    setFollowing(s => { const n=new Set(s); n.has(m.id)?n.delete(m.id):n.add(m.id); return n; });
    if (window.BSAUTH && window.BSAUTH.follow && !m.bpuppy) { try { window.BSAUTH.follow(m.username, following.has(m.id)); } catch(e){} }
  };
  const ql = q.trim().toLowerCase();
  const list = ql ? BSDATA.community.filter(m => [m.name,m.username,m.city,m.pet.name,m.pet.breed].filter(Boolean).join(' ').toLowerCase().includes(ql)) : BSDATA.community;
  return (
    <div className="bs-fade" style={{ background:BS.bg, minHeight:'100%' }}>
      <ScreenHeader title={t(['Comunidad','Community'])} sub={t(['Dueños que comparten su perfil público','Owners who share their public profile'])}/>
      <SearchBar value={q} onChange={setQ} placeholder={t(['Buscar por nombre, ciudad o raza…','Search by name, city or breed…'])} BS={BS}/>
      <div style={{ margin:'8px 16px 4px', padding:'10px 13px', borderRadius:12, background:'rgba(245,130,32,0.08)', border:`1px solid ${BS.borderStrong}`, fontSize:11.5, color:BS.ink2, lineHeight:1.5 }}>
        {t(['Tu perfil es','Your profile is'])} <b style={{ color:BS.ink }}>{t(['privado por defecto','private by default'])}</b>. {t(['Solo apareces aquí si activas “perfil público”, y solo con los datos que tú elijas.','You only appear here if you turn on “public profile”, and only with the details you choose.'])}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:12, padding:'8px 16px 22px' }}>
        {list.map(m => {
          const fol = following.has(m.id);
          return (
            <div key={m.id} className="bs-pop" style={{ background:BS.surface, borderRadius:18, overflow:'hidden', border:`1px solid ${BS.border}` }}>
              <div style={{ height:84, position:'relative', background:BS.surface2 }}>
                <img src={m.pet.img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} loading="lazy"/>
                {m.bpuppy && <span style={{ position:'absolute', top:8, left:8, background:BS.grad, color:'#fff', fontSize:9, fontWeight:800, padding:'2px 8px', borderRadius:999 }}>BrightPuppy</span>}
              </div>
              <div style={{ padding:'0 13px 13px', marginTop:-22, textAlign:'center' }}>
                <div style={{ width:46, height:46, borderRadius:'50%', background:m.color, display:'grid', placeItems:'center', color:'#fff', fontWeight:800, fontSize:16, border:`3px solid ${BS.surface}`, margin:'0 auto 6px', overflow:'hidden' }}>{m.avatar ? <img src={m.avatar} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : m.initials}</div>
                <div style={{ fontSize:13.5, fontWeight:800, color:BS.ink }}>{m.name}</div>
                <div style={{ fontSize:11, color:BS.soft, marginBottom:6 }}>{m.city}</div>
                {m.status && m.status!=='nuevo' && <div style={{ marginBottom:7, display:'flex', justifyContent:'center' }}><StatusChip status={m.status} size="sm"/></div>}
                {(m.pet.name || m.pet.breed) && <div style={{ fontSize:11, color:BS.brand, fontWeight:700, background:'rgba(245,130,32,0.1)', borderRadius:999, padding:'2px 9px', display:'inline-block', marginBottom:9 }}>{[m.pet.name, m.pet.breed].filter(Boolean).join(' · ')}</div>}
                <button onClick={() => toggle(m)} className="bs-btn" style={{ width:'100%', padding:'7px', borderRadius:999, border:`1.5px solid ${fol?BS.border:BS.brand}`, background:'transparent', color: fol?BS.soft:BS.brand, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>{fol?t(['Siguiendo','Following']):t(['Seguir','Follow'])}</button>
              </div>
            </div>
          );
        })}
        {list.length === 0 && <div style={{ gridColumn:'1/-1', textAlign:'center', color:BS.soft, fontSize:13, padding:'30px 0' }}>{t(['Nadie coincide con tu búsqueda todavía.','No one matches your search yet.'])}</div>}
      </div>
    </div>
  );
}

function EventsScreen() {
  const BS = useBS();
  const t = useT();
  const [going, setGoing] = useState(new Set());
  const toggle = id => setGoing(s => { const n=new Set(s); n.has(id)?n.delete(id):n.add(id); return n; });
  return (
    <div className="bs-fade" style={{ background:BS.bg, minHeight:'100%' }}>
      <ScreenHeader title={t(['Eventos BPuppy','BPuppy Events'])} sub={t(['Reuniones y actividades de la comunidad','Community meetups and activities'])}/>
      <div style={{ padding:'14px 16px 22px', display:'flex', flexDirection:'column', gap:14 }}>
        {BSDATA.bpuppyEvents.map(ev => {
          const on = going.has(ev.id);
          return (
            <div key={ev.id} className="bs-pop" style={{ background:BS.surface, borderRadius:18, overflow:'hidden', border:`1px solid ${BS.border}` }}>
              <img src={ev.img} alt="" style={{ width:'100%', height:150, objectFit:'cover', display:'block' }} loading="lazy"/>
              <div style={{ padding:'14px 16px' }}>
                <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:16.5, fontWeight:800, color:BS.ink, lineHeight:1.25, marginBottom:5 }}>{ev.title}</div>
                <div style={{ fontSize:12.5, color:BS.brand, fontWeight:700, marginBottom:2 }}>{ev.date}</div>
                <div style={{ fontSize:12, color:BS.soft, marginBottom:12 }}>{ev.place}</div>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <button onClick={() => toggle(ev.id)} className="bs-btn" style={{ padding:'9px 20px', borderRadius:11, border:'none', background: on?BS.surface2:BS.grad, color: on?BS.ink:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit', boxShadow: on?'none':BS.glow }}>{on?t(['Asistirás ✓','Going ✓']):t(['Asistir','Attend'])}</button>
                  <span style={{ fontSize:12, color:BS.soft }}>{ev.attendees + (on?1:0)} {t(['asistentes','attending'])}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NewsScreen() {
  const BS = useBS();
  const t = useT();
  return (
    <div className="bs-fade" style={{ background:BS.bg, minHeight:'100%' }}>
      <ScreenHeader title={t(['Noticias','News'])} sub={t(['Novedades de BrightPuppy','BrightPuppy updates'])}/>
      <div style={{ padding:'14px 16px 22px', display:'flex', flexDirection:'column', gap:14 }}>
        {BSDATA.news.map(n => (
          <div key={n.id} className="bs-pop" style={{ background:BS.surface, borderRadius:18, overflow:'hidden', border:`1px solid ${BS.border}`, display:'flex', cursor:'pointer' }}>
            <img src={n.img} alt="" style={{ width:108, height:108, objectFit:'cover', flexShrink:0, display:'block' }} loading="lazy"/>
            <div style={{ padding:'12px 14px', minWidth:0 }}>
              <div style={{ display:'inline-block', fontSize:9.5, fontWeight:800, color:BS.brand, background:'rgba(14,165,233,0.1)', borderRadius:999, padding:'2px 8px', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.05em' }}>{n.tag}</div>
              <div style={{ fontSize:14, fontWeight:800, color:BS.ink, lineHeight:1.3, marginBottom:4 }}>{n.title}</div>
              <div style={{ fontSize:11.5, color:BS.soft, marginBottom:5 }}>{n.date}</div>
              <div style={{ fontSize:12, color:BS.ink2, lineHeight:1.45, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>{n.excerpt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideosScreen() {
  const BS = useBS();
  const t = useT();
  return (
    <div className="bs-fade" style={{ background:BS.bg, minHeight:'100%' }}>
      <ScreenHeader title={t(['Videos','Videos'])} sub={t(['Mira a la comunidad en acción','Watch the community in action'])}/>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:12, padding:'14px 16px 22px' }}>
        {BSDATA.videos.map(v => (
          <div key={v.id} className="bs-pop" style={{ background:BS.surface, borderRadius:16, overflow:'hidden', border:`1px solid ${BS.border}`, cursor:'pointer' }}>
            <div style={{ position:'relative', aspectRatio:'16/10' }}>
              <img src={v.thumb} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} loading="lazy"/>
              <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.18)', display:'grid', placeItems:'center' }}>
                <div style={{ width:42, height:42, borderRadius:'50%', background:'rgba(255,255,255,0.92)', display:'grid', placeItems:'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={BS.brand}><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <span style={{ position:'absolute', bottom:7, right:7, background:'rgba(0,0,0,0.7)', color:'#fff', fontSize:10.5, fontWeight:700, padding:'2px 7px', borderRadius:6 }}>{v.dur}</span>
            </div>
            <div style={{ padding:'10px 12px', fontSize:12.5, fontWeight:700, color:BS.ink, lineHeight:1.3 }}>{v.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Mi Cuenta (portal) DENTRO de B Social — datos privados, leídos de Supabase (mismas tablas que el CRM) ──
function PetForm({ BS, initial, petId, onDone, onCancel }) {
  const t = useT();
  const [f, setF] = useState({ name:(initial&&initial.name)||'', breed:(initial&&initial.breed)||'', size:(initial&&initial.size)||'', sex:(initial&&initial.sex)||'', weight_lbs:(initial&&initial.weight_lbs)||'' });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const inp = { width:'100%', padding:'10px 12px', borderRadius:10, border:`1.5px solid ${BS.border}`, background:BS.surface2, color:BS.ink, fontFamily:'inherit', fontSize:13, outline:'none', boxSizing:'border-box' };
  const save = async () => {
    if(!f.name.trim()){ setMsg(t(['El nombre es obligatorio.','Name is required.'])); return; }
    setBusy(true); setMsg('');
    try {
      const A = (typeof window!=='undefined' && window.BSAUTH) || {};
      const d = petId ? (A.updatePet ? await A.updatePet({ id:petId, ...f }) : { error:t(['No disponible','Not available']) })
                      : (A.addPet ? await A.addPet(f) : { error:t(['No disponible','Not available']) });
      if(d && d.error){ setMsg(d.error); setBusy(false); return; }
      onDone();
    } catch(e){ setMsg(t(['No se pudo guardar.','We couldn’t save.'])); setBusy(false); }
  };
  return (
    <div style={{ background:BS.surface, border:`1px solid ${BS.border}`, borderRadius:16, padding:16, marginTop:4, marginBottom:12 }}>
      <div style={{ fontSize:14, fontWeight:800, color:BS.ink, marginBottom:10 }}>{petId ? t(['Editar mascota','Edit pet']) : t(['Agregar mascota','Add pet'])}</div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
        <input style={{ ...inp, gridColumn:'1/-1' }} placeholder={t(['Nombre *','Name *'])} value={f.name} onChange={e=>setF({...f,name:e.target.value})}/>
        <input style={inp} placeholder={t(['Raza','Breed'])} value={f.breed} onChange={e=>setF({...f,breed:e.target.value})}/>
        <select style={inp} value={f.size} onChange={e=>setF({...f,size:e.target.value})}><option value="">{t(['Tamaño','Size'])}</option><option value="Pequeño">{t(['Pequeño','Small'])}</option><option value="Mediano">{t(['Mediano','Medium'])}</option><option value="Grande">{t(['Grande','Large'])}</option><option value="XL">XL</option></select>
        <select style={inp} value={f.sex} onChange={e=>setF({...f,sex:e.target.value})}><option value="">{t(['Sexo','Sex'])}</option><option value="Macho">{t(['Macho','Male'])}</option><option value="Hembra">{t(['Hembra','Female'])}</option></select>
        <input style={inp} type="number" placeholder={t(['Peso (lb)','Weight (lb)'])} value={f.weight_lbs} onChange={e=>setF({...f,weight_lbs:e.target.value})}/>
      </div>
      {msg && <div style={{ fontSize:12, color:BS.rose, marginTop:8 }}>{msg}</div>}
      <div style={{ display:'flex', gap:8, marginTop:12 }}>
        <button onClick={onCancel} className="bs-btn" style={{ flex:1, padding:'11px', borderRadius:10, border:`1.5px solid ${BS.border}`, background:'transparent', color:BS.ink2, fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>{t(['Cancelar','Cancel'])}</button>
        <button onClick={save} disabled={busy} className="bs-btn" style={{ flex:2, padding:'11px', borderRadius:10, border:'none', background:BS.grad, color:'#fff', fontWeight:700, fontSize:13, cursor:busy?'default':'pointer', fontFamily:'inherit', opacity:busy?0.7:1 }}>{busy?t(['Guardando…','Saving…']):(petId?t(['Guardar cambios','Save changes']):t(['Guardar mascota','Save pet']))}</button>
      </div>
    </div>
  );
}

function AccountScreen({ setScreen }) {
  const BS = useBS();
  const t = useT();
  const { lang } = useLang();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [tab, setTab] = useState('mascotas');
  const [addOpen, setAddOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [bkBusy, setBkBusy] = useState(null);
  const [bkMsg, setBkMsg] = useState('');
  const [payBusy, setPayBusy] = useState(null);

  const load = async () => {
    setLoading(true); setErr('');
    try {
      const A = (typeof window!=='undefined' && window.BSAUTH) || {};
      if (!A.accountData) { setErr(t(['No disponible.','Not available.'])); setLoading(false); return; }
      const d = await A.accountData();
      if (d && d.error) setErr(d.error);
      else setData(d || {});
    } catch(e){ setErr(t(['No pudimos cargar tu cuenta.','We couldn’t load your account.'])); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const money = n => '$' + Number(n||0).toLocaleString('en-US');
  const fmtD = iso => { if(!iso) return '—'; try { return new Date(String(iso).length<=10?iso+'T00:00:00':iso).toLocaleDateString(lang==='en'?'en-US':'es-US',{day:'numeric',month:'short',year:'numeric'}); } catch(e){ return '—'; } };

  const d = data || {};
  const pets = d.pets || [];
  const memberships = d.memberships || [];
  const plans = d.plans || [];
  const payments = d.payments || [];
  const bookings = (d.bookings || []).filter(b => b.status !== 'cancelled');
  const baths = memberships.reduce((a,m)=>a+(m.credits_balance||0),0);

  const cancelBooking = async (b) => {
    if(!(window.confirm(t(['¿Cancelar esta cita? Cancelar con menos de 24h puede tener cargo del 50%.','Cancel this appointment? Cancelling with less than 24h notice may incur a 50% charge.'])))) return;
    setBkBusy(b.id); setBkMsg('');
    try { const r = await (window.BSAUTH && window.BSAUTH.manageBooking ? window.BSAUTH.manageBooking('cancel', b.id) : {error:t(['No disponible','Not available'])});
      if(r && r.error){ setBkMsg(r.error); } else { setBkMsg(r && r.message ? r.message : t(['Cita cancelada.','Appointment cancelled.'])); await load(); }
    } catch(e){ setBkMsg(t(['No se pudo cancelar.','We couldn’t cancel.'])); }
    setBkBusy(null);
  };
  const payPlan = async (p) => {
    setPayBusy(p.id);
    try { const r = await (window.BSAUTH && window.BSAUTH.payPlan ? window.BSAUTH.payPlan(p.id) : {error:t(['No disponible','Not available'])});
      if(r && r.url){ window.location.href = r.url; return; }
      setBkMsg((r && r.error) || t(['No se pudo iniciar el pago.','We couldn’t start the payment.']));
    } catch(e){ setBkMsg(t(['No se pudo iniciar el pago.','We couldn’t start the payment.'])); }
    setPayBusy(null);
  };

  const TABS = [
    { id:'mascotas',   label:t(['Mascotas','Pets']),       n: pets.length },
    { id:'grooming',   label:t(['Grooming','Grooming']),   n: 0 },
    { id:'membresias', label:t(['Membresías','Memberships']), n: memberships.length },
    { id:'pagos',      label:t(['Pagos','Payments']),      n: plans.length },
  ];
  const card = { background:BS.surface, border:`1px solid ${BS.border}`, borderRadius:16, padding:'14px 16px', marginBottom:12 };
  const row = (k,v,vc) => (<div style={{ display:'flex', justifyContent:'space-between', gap:12, padding:'4px 0', fontSize:13 }}><span style={{ color:BS.soft }}>{k}</span><span style={{ color:vc||BS.ink, fontWeight:600, textAlign:'right' }}>{v}</span></div>);

  return (
    <div className="bs-fade" style={{ background:BS.bg, minHeight:'100%' }}>
      <div style={{ background:BS.surface, padding:'12px 16px', position:'sticky', top:0, zIndex:11, borderBottom:`1px solid ${BS.border}`, display:'flex', alignItems:'center', gap:12 }}>
        <button onClick={() => setScreen('profile')} className="bs-btn" style={{ background:'transparent', border:'none', color:BS.ink2, cursor:'pointer', display:'grid', placeItems:'center', padding:0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:18, fontWeight:800, color:BS.ink }}>{t(['Mi Cuenta','My Account'])}</div>
          <div style={{ fontSize:11.5, color:BS.soft }}>{t(['Privado · solo tú ves esto','Private · only you see this'])}</div>
        </div>
        <a href="/grooming.html" className="bs-btn" style={{ textDecoration:'none', background:BS.grad, color:'#fff', fontSize:12, fontWeight:700, padding:'8px 13px', borderRadius:10 }}>{t(['Agendar','Book'])}</a>
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:10, margin:'12px 14px 0', padding:'10px 14px', borderRadius:12, background:BS.surface2, border:`1px solid ${BS.border}` }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BS.soft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        <span style={{ fontSize:11.5, color:BS.soft, lineHeight:1.4 }}>{t(['Tus mascotas, citas, pagos y membresías son privados — no aparecen en tu perfil público.','Your pets, appointments, payments and memberships are private — they don’t appear on your public profile.'])}</span>
      </div>

      {loading && <div style={{ padding:40, textAlign:'center', color:BS.soft, fontSize:13 }}>{t(['Cargando tu cuenta…','Loading your account…'])}</div>}
      {!loading && err && <div style={{ margin:'16px 14px', background:BS.surface, border:`1px solid ${BS.border}`, borderRadius:16, padding:'14px 16px', color:BS.rose, fontSize:13 }}>{err} <button onClick={load} style={{ marginLeft:8, color:BS.brand, background:'none', border:'none', cursor:'pointer', fontWeight:700 }}>{t(['Reintentar','Retry'])}</button></div>}

      {!loading && !err && (
      <React.Fragment>
        <div style={{ display:'flex', gap:8, padding:'12px 14px' }}>
          {[{n:pets.length,l:t(['mascotas','pets'])},{n:baths,l:t(['baños disp.','baths avail.'])},{n:memberships.length,l:t(['membresías','memberships'])}].map((s,si)=>(
            <div key={si} style={{ flex:1, background:BS.surface, border:`1px solid ${BS.border}`, borderRadius:14, padding:'10px', textAlign:'center' }}>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:20, fontWeight:800, color:BS.ink }}>{s.n}</div>
              <div style={{ fontSize:10.5, color:BS.soft }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div className="bs-hscr" style={{ display:'flex', gap:6, padding:'0 14px 12px', borderBottom:`1px solid ${BS.border}` }}>
          {TABS.map(tb => { const on = tab===tb.id; return (
            <button key={tb.id} onClick={()=>setTab(tb.id)} className="bs-btn" style={{ padding:'8px 14px', borderRadius:999, border:`1.5px solid ${on?BS.brand:BS.border}`, background: on?'rgba(255,85,32,0.08)':'transparent', color:on?BS.brand:BS.ink2, fontSize:12.5, fontWeight:on?700:600, cursor:'pointer', whiteSpace:'nowrap', fontFamily:'inherit' }}>{tb.label}{tb.n?` · ${tb.n}`:''}</button>
          ); })}
        </div>

        <div style={{ padding:'14px' }}>
          {tab==='mascotas' && (
            <div>
              {pets.length===0 && !addOpen && <div style={{ ...card, textAlign:'center', color:BS.soft, fontSize:13 }}>{t(['Aún no tienes mascotas registradas.','You don’t have any pets registered yet.'])}</div>}
              {pets.map((p,i)=> editId===p.id ? (
                <PetForm key={i} BS={BS} petId={p.id} initial={p} onDone={()=>{ setEditId(null); load(); }} onCancel={()=>setEditId(null)}/>
              ) : (
                <div key={i} style={{ ...card, display:'flex', gap:12, alignItems:'center' }}>
                  <div style={{ width:52, height:52, borderRadius:14, flexShrink:0, background:BS.surface2, display:'grid', placeItems:'center', overflow:'hidden' }}>
                    {p.photo_url ? <img src={p.photo_url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : <svg width="26" height="26" viewBox="0 0 24 24" fill={BS.brand}><circle cx="7" cy="9" r="1.7"/><circle cx="12" cy="7.4" r="1.7"/><circle cx="17" cy="9" r="1.7"/><path d="M12 12c-2.4 0-4.3 1.9-4.3 3.9 0 1.5 1.2 2.4 2.6 2.4 .8 0 1.1-.4 1.7-.4s.9 .4 1.7 .4c1.4 0 2.6-.9 2.6-2.4 0-2-1.9-3.9-4.3-3.9z"/></svg>}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:15, fontWeight:800, color:BS.ink }}>{p.name||t(['Mi mascota','My pet'])}</div>
                    <div style={{ fontSize:12, color:BS.ink2 }}>{[p.breed, p.size, p.sex, p.weight_lbs?(p.weight_lbs+' lb'):''].filter(Boolean).join(' · ')||'—'}</div>
                    {p.status==='pending' && <span style={{ display:'inline-block', marginTop:5, fontSize:10.5, fontWeight:700, color:'#E0A106', background:'rgba(224,161,6,0.12)', padding:'2px 8px', borderRadius:999 }}>{t(['Pendiente de confirmar','Pending confirmation'])}</span>}
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:6, flexShrink:0 }}>
                    <button onClick={()=>{ setEditId(p.id); setAddOpen(false); }} className="bs-btn" style={{ fontSize:11.5, fontWeight:700, color:BS.ink2, border:`1.5px solid ${BS.border}`, borderRadius:10, padding:'7px 11px', background:'transparent', cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap' }}>{t(['Editar','Edit'])}</button>
                    {p.status!=='pending' && <a href="/grooming.html" className="bs-btn" style={{ textDecoration:'none', textAlign:'center', fontSize:11.5, fontWeight:700, color:BS.brand, border:`1.5px solid ${BS.border}`, borderRadius:10, padding:'7px 11px', whiteSpace:'nowrap' }}>{t(['Agendar','Book'])}</a>}
                  </div>
                </div>
              ))}
              {addOpen ? <PetForm BS={BS} onDone={()=>{ setAddOpen(false); load(); }} onCancel={()=>setAddOpen(false)}/> :
                <button onClick={()=>{ setAddOpen(true); setEditId(null); }} className="bs-btn" style={{ width:'100%', padding:'13px', borderRadius:14, border:`1.5px dashed ${BS.border}`, background:'transparent', color:BS.brand, fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>{t(['+ Agregar mascota','+ Add pet'])}</button>}
            </div>
          )}

          {tab==='grooming' && (
            <div>
              {bkMsg && <div style={{ ...card, fontSize:12.5, color:BS.ink2, lineHeight:1.5 }}>{bkMsg}</div>}
              {bookings.length>0 && <div style={{ fontSize:11, fontWeight:700, color:BS.soft, textTransform:'uppercase', letterSpacing:'0.06em', margin:'0 2px 8px' }}>{t(['Tus citas','Your appointments'])}</div>}
              {bookings.map((b,i)=>{
                const svc = Array.isArray(b.services) ? b.services.join(' + ') : (b.services||'Grooming');
                const st = b.status || 'requested';
                const stColor = st==='confirmed' ? '#1EB87A' : (st==='completed' ? BS.soft : BS.brand);
                return (
                  <div key={b.id||i} style={card}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                      <span style={{ fontSize:14, fontWeight:800, color:BS.ink }}>{b.pet_name||t(['Mascota','Pet'])}</span>
                      <span style={{ fontSize:10.5, fontWeight:700, color:stColor, background:BS.surface2, padding:'3px 9px', borderRadius:999 }}>{st}</span>
                    </div>
                    {row(t(['Servicio','Service']), svc)}
                    {row(t(['Fecha','Date']), fmtD(b.appointment_date)+(b.appointment_time?(' · '+b.appointment_time):''))}
                    {b.size ? row(t(['Tamaño','Size']), b.size) : null}
                    {st!=='completed' && (
                      <div style={{ display:'flex', gap:8, marginTop:10 }}>
                        <a href={'/reserva.html?id='+encodeURIComponent(b.id)} className="bs-btn" style={{ flex:1, textAlign:'center', textDecoration:'none', fontSize:12, fontWeight:700, color:BS.ink2, border:`1.5px solid ${BS.border}`, borderRadius:10, padding:'9px' }}>{t(['Reprogramar','Reschedule'])}</a>
                        <button onClick={()=>cancelBooking(b)} disabled={bkBusy===b.id} className="bs-btn" style={{ flex:1, fontSize:12, fontWeight:700, color:BS.rose, border:`1.5px solid ${BS.border}`, borderRadius:10, padding:'9px', background:'transparent', cursor:bkBusy===b.id?'default':'pointer', fontFamily:'inherit' }}>{bkBusy===b.id?'…':t(['Cancelar','Cancel'])}</button>
                      </div>
                    )}
                  </div>
                );
              })}
              <div style={{ ...card, textAlign:'center' }}>
                <div style={{ color:BS.brand, display:'flex', justifyContent:'center', marginBottom:8 }}><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"/></svg></div>
                <div style={{ fontSize:16, fontWeight:800, color:BS.ink, marginBottom:4 }}>{bookings.length?t(['Agenda otra cita','Book another appointment']):t(['Agenda tu próxima cita','Book your next appointment'])}</div>
                <div style={{ fontSize:12.5, color:BS.soft, lineHeight:1.5, marginBottom:14 }}>{memberships.length?t(['Tus baños de membresía se aplican automáticamente.','Your membership baths are applied automatically.']):t(['Baño, corte o spa para tu mascota en segundos.','Bath, haircut or spa for your pet in seconds.'])}</div>
                <a href="/grooming.html" style={{ display:'inline-block', textDecoration:'none', background:BS.grad, color:'#fff', fontSize:13.5, fontWeight:700, padding:'11px 22px', borderRadius:12 }}>{t(['Agendar grooming →','Book grooming →'])}</a>
              </div>
              {baths>0 && <div style={card}>{row(t(['Baños de membresía disponibles','Membership baths available']), baths, BS.brand)}</div>}
            </div>
          )}

          {tab==='membresias' && (
            <div>
              {memberships.length===0 && <div style={{ ...card, textAlign:'center', color:BS.soft, fontSize:13 }}>{t(['Aún no tienes membresía de grooming.','You don’t have a grooming membership yet.'])} <a href="/grooming.html" style={{ color:BS.brand, fontWeight:700 }}>{t(['Ver planes →','View plans →'])}</a></div>}
              {memberships.map((m,i)=>(
                <div key={i} style={card}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
                    <span style={{ fontSize:15, fontWeight:800, color:BS.ink }}>{m.plan||t(['Membresía','Membership'])}</span>
                    <span style={{ fontSize:10.5, fontWeight:700, color: m.status==='active'?'#1EB87A':BS.soft, background: m.status==='active'?'rgba(30,184,122,0.12)':BS.surface2, padding:'3px 9px', borderRadius:999 }}>{m.status||'—'}</span>
                  </div>
                  {row(t(['Facturación','Billing']), m.billing||'—')}
                  {row(t(['Mascota','Pet']), (m.pet_name||'—')+(m.pet_size?(' · '+m.pet_size):''))}
                  {row(t(['Baños disponibles','Baths available']), m.credits_balance||0, BS.brand)}
                  {row(t(['Próxima renovación','Next renewal']), fmtD(m.renew_date))}
                </div>
              ))}
            </div>
          )}

          {tab==='pagos' && (
            <div>
              {plans.length===0 && <div style={{ ...card, textAlign:'center', color:BS.soft, fontSize:13 }}>{t(['No tienes planes de pago activos.','You don’t have any active payment plans.'])} <a href="/plan" style={{ color:BS.brand, fontWeight:700 }}>{t(['Armar mi plan →','Build my plan →'])}</a></div>}
              {plans.map((p,i)=>{
                const est = p.est_price || p.total_amount || ((p.monthly_amount||0)*(p.months||0)) || 0;
                const paid = (+p.paid_total||0) || payments.filter(x=>x.plan_id===p.id).reduce((a,x)=>a+(+x.amount||0),0);
                const bal = Math.max(0, est-paid);
                const pct = est? Math.min(100, Math.round(paid/est*100)) : 0;
                return (
                  <div key={i} style={card}>
                    <div style={{ fontSize:14, fontWeight:800, color:BS.ink, marginBottom:8 }}>{p.breed||p.pet_name||t(['Plan de pagos','Payment plan'])}</div>
                    {row(t(['Plan','Plan']), (p.months||'—')+' '+t(['meses · ','months · '])+money(p.monthly_amount)+t(['/mes','/mo']))}
                    {row(t(['Total estimado','Estimated total']), money(est))}
                    {row(t(['Abonado','Paid']), money(paid), '#1EB87A')}
                    {row(t(['Restante','Remaining']), money(bal))}
                    {row(t(['Tu gran día','Your big day']), fmtD(p.target_date))}
                    <div style={{ height:7, borderRadius:999, background:BS.surface2, overflow:'hidden', margin:'8px 0 4px' }}><div style={{ width:pct+'%', height:'100%', background:BS.grad }}/></div>
                    <div style={{ fontSize:11, color:BS.soft, textAlign:'right' }}>{pct}% {t(['completado','complete'])}</div>
                    {bal>0 && p.status!=='cancelled' && (
                      <div>
                        <button onClick={()=>payPlan(p)} disabled={payBusy===p.id} className="bs-btn" style={{ width:'100%', marginTop:12, padding:'11px', borderRadius:10, border:'none', background:BS.grad, color:'#fff', fontWeight:700, fontSize:13, cursor:payBusy===p.id?'default':'pointer', fontFamily:'inherit', opacity:payBusy===p.id?0.7:1 }}>{payBusy===p.id?t(['Redirigiendo…','Redirecting…']):(t(['Hacer abono (','Make a payment ('])+money(p.monthly_amount)+')')}</button>
                        <div style={{ fontSize:10.5, color:BS.soft, textAlign:'center', marginTop:6 }}>{t(['Pago seguro con Stripe · tarjeta, Klarna, Affirm','Secure payment with Stripe · card, Klarna, Affirm'])}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div style={{ height:24 }}/>
      </React.Fragment>
      )}
    </div>
  );
}

// Comparte el contexto de idioma con s-app.jsx (mismo objeto Context para que el Provider funcione).
if (typeof window !== 'undefined') {
  window.BSLangContext = BSLangContext;
  if (!window.LangContext) window.LangContext = BSLangContext;
  if (!window.useLang) window.useLang = useLang;
  if (!window.useT) window.useT = useT;
  if (!window.pick) window.pick = bsPick;
  // Si i18n.js no está cargado en esta página (p.ej. social.html), expone bpGetLang
  // para que la app siga el idioma del sitio guardado en localStorage ('bpuppy-lang').
  if (!window.bpGetLang) window.bpGetLang = bsReadLang;
}

function MapScreen({ setScreen }) {
  const BS = useBS(); const t = useT();
  const wrapRef = useRef(null); const mapRef = useRef(null); const layerRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [sel, setSel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [adding, setAdding] = useState(false);
  const [pending, setPending] = useState(null);
  const [form, setForm] = useState({ type:'bebedero', name:'', description:'', address:'' });
  const [rv, setRv] = useState({ rating:5, body:'' });
  const [msg, setMsg] = useState('');
  const sb = (typeof window!=='undefined') ? window._bsSb : null;
  const me = (typeof window!=='undefined' && window.BSAUTH && window.BSAUTH.me) || null;
  const TYPES = [
    { id:'bebedero', label:t(['Bebedero de agua','Water fountain']), color:'#0EA5E9' },
    { id:'comida', label:t(['Comida gratis','Free dog food']), color:'#1EB87A' },
    { id:'vacunacion', label:t(['Vacunación','Vaccination']), color:'#E85D75' },
    { id:'bolsas', label:t(['Estación de bolsas','Poop-bag station']), color:'#7C5CBF' },
    { id:'parque', label:t(['Parque para perros','Dog park']), color:'#F58220' },
    { id:'otro', label:t(['Otro','Other']), color:'#6B5A4E' },
  ];
  const tm = (id)=> TYPES.find(x=>x.id===id) || TYPES[5];
  const adRef = useRef(false); useEffect(()=>{ adRef.current = adding; }, [adding]);
  const load = async ()=>{ if(!sb) return; try{ const res = await sb.from('community_points').select('id,type,name,description,address,lat,lng,created_by,created_at').eq('status','active').limit(800); setPoints(res.data||[]); }catch(e){} };
  useEffect(()=>{ load(); }, []);
  useEffect(()=>{
    if(!window.L || mapRef.current || !wrapRef.current) return;
    try{
      const m = window.L.map(wrapRef.current, { zoomControl:true }).setView([39.5,-98.35], 4);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'(c) OpenStreetMap', maxZoom:19 }).addTo(m);
      layerRef.current = window.L.layerGroup().addTo(m);
      m.on('click', (e)=>{ if(adRef.current){ setPending({ lat:e.latlng.lat, lng:e.latlng.lng }); } });
      mapRef.current = m;
      if(navigator.geolocation){ navigator.geolocation.getCurrentPosition((pos)=>{ try{ m.setView([pos.coords.latitude,pos.coords.longitude],13); window.L.circleMarker([pos.coords.latitude,pos.coords.longitude],{radius:7,color:'#fff',weight:2,fillColor:'#2563EB',fillOpacity:1}).addTo(m); }catch(_){} }, ()=>{}, {timeout:8000}); }
      setTimeout(()=>{ try{ m.invalidateSize(); }catch(_){} }, 280);
    }catch(e){}
  }, []);
  useEffect(()=>{
    const m = mapRef.current, lg = layerRef.current; if(!m||!lg||!window.L) return;
    lg.clearLayers();
    points.forEach(p=>{ const meta=tm(p.type); const mk=window.L.circleMarker([p.lat,p.lng],{radius:9,color:'#fff',weight:2,fillColor:meta.color,fillOpacity:1}); mk.on('click', ()=> openPoint(p)); mk.addTo(lg); });
    if(pending){ window.L.circleMarker([pending.lat,pending.lng],{radius:8,color:'#fff',weight:2,fillColor:'#F58220',fillOpacity:0.9}).addTo(lg); }
  }, [points, pending]);
  const openPoint = async (p)=>{ setSel(p); setReviews([]); if(sb){ try{ const res = await sb.from('point_reviews').select('id,point_id,author,rating,body,created_at').eq('point_id',p.id).order('created_at',{ascending:false}); setReviews(res.data||[]); }catch(e){} } };
  const savePoint = async ()=>{ if(!sb||!pending) return; if(!me){ setMsg(t(['Inicia sesión para agregar un punto.','Sign in to add a point.'])); return; } if(!form.name.trim()){ setMsg(t(['Ponle un nombre.','Add a name.'])); return; } try{ await sb.from('community_points').insert({ type:form.type, name:form.name.trim(), description:(form.description.trim()||null), address:(form.address.trim()||null), lat:pending.lat, lng:pending.lng, created_by:(me.username||me.name||'') }); setMsg(''); setAdding(false); setPending(null); setForm({ type:'bebedero', name:'', description:'', address:'' }); load(); }catch(e){ setMsg(t(['No se pudo guardar.','Could not save.'])); } };
  const saveReview = async ()=>{ if(!sb||!sel) return; if(!me){ setMsg(t(['Inicia sesión para reseñar.','Sign in to review.'])); return; } try{ await sb.from('point_reviews').insert({ point_id:sel.id, author:(me.username||me.name||''), rating:rv.rating, body:(rv.body.trim()||null) }); setRv({ rating:5, body:'' }); openPoint(sel); }catch(e){} };
  const avg = reviews.length ? (reviews.reduce((a,r)=>a+(r.rating||0),0)/reviews.length).toFixed(1) : null;
  return (
    <div className="bs-fade" style={{ background:BS.bg, minHeight:'100%' }}>
      <div style={{ padding:'12px 14px', background:BS.surface, borderBottom:`1px solid ${BS.border}`, display:'flex', alignItems:'center', gap:10 }}>
        <button onClick={()=> setScreen && setScreen('discover')} className="bs-btn" style={{ background:'transparent', border:'none', color:BS.ink2, cursor:'pointer', fontSize:20 }}>{'‹'}</button>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:17, fontWeight:800, color:BS.ink }}>{t(['Mapa comunitario','Community map'])}</div>
          <div style={{ fontSize:11, color:BS.soft }}>{t(['Bebederos, comida, vacunación y más, de la comunidad','Fountains, food, vaccination and more, from the community'])}</div>
        </div>
        <button onClick={()=>{ setAdding(a=>!a); setPending(null); setMsg(''); }} className="bs-btn" style={{ padding:'8px 12px', borderRadius:10, border:'none', background: adding?BS.rose:BS.grad, color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>{adding ? t(['Cancelar','Cancel']) : t(['+ Agregar','+ Add'])}</button>
      </div>
      {adding && <div style={{ padding:'8px 14px', background:'rgba(245,130,32,0.1)', color:BS.ink2, fontSize:12.5, fontWeight:600 }}>{pending ? t(['Punto elegido. Completa los datos abajo.','Point chosen. Fill in the details below.']) : t(['Toca el mapa donde está el lugar.','Tap the map where the spot is.'])}</div>}
      <div ref={wrapRef} style={{ height:420, width:'100%', background:BS.surface2 }}/>
      <div className="bs-hscr" style={{ display:'flex', gap:10, padding:'8px 14px', background:BS.surface, borderBottom:`1px solid ${BS.border}` }}>
        {TYPES.map(x=> <span key={x.id} style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:11, color:BS.ink2, whiteSpace:'nowrap' }}><span style={{ width:10, height:10, borderRadius:'50%', background:x.color }}/>{x.label}</span>)}
      </div>
      {msg && <div style={{ padding:'8px 14px', color:BS.rose, fontSize:12.5 }}>{msg}</div>}
      {adding && pending && (
        <div style={{ padding:'12px 14px', background:BS.surface }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:8 }}>
            <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} style={{ padding:'9px', borderRadius:10, border:`1.5px solid ${BS.border}`, background:BS.surface2, color:BS.ink, fontSize:13, fontFamily:'inherit' }}>{TYPES.map(x=><option key={x.id} value={x.id}>{x.label}</option>)}</select>
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder={t(['Nombre del lugar','Place name'])} style={{ padding:'9px', borderRadius:10, border:`1.5px solid ${BS.border}`, background:BS.surface2, color:BS.ink, fontSize:13, fontFamily:'inherit' }}/>
          </div>
          <input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder={t(['Dirección o referencia (opcional)','Address or hint (optional)'])} style={{ width:'100%', padding:'9px', borderRadius:10, border:`1.5px solid ${BS.border}`, background:BS.surface2, color:BS.ink, fontSize:13, fontFamily:'inherit', marginBottom:8, boxSizing:'border-box' }}/>
          <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder={t(['Detalles (agua limpia, horario, gratis...)','Details (clean water, hours, free...)'])} rows={2} style={{ width:'100%', padding:'9px', borderRadius:10, border:`1.5px solid ${BS.border}`, background:BS.surface2, color:BS.ink, fontSize:13, fontFamily:'inherit', marginBottom:8, boxSizing:'border-box', resize:'vertical' }}/>
          <button onClick={savePoint} className="bs-btn" style={{ width:'100%', padding:'11px', borderRadius:11, border:'none', background:BS.grad, color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>{t(['Guardar punto','Save point'])}</button>
        </div>
      )}
      {sel && (
        <div onClick={()=>setSel(null)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:60, display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:BS.surface, borderRadius:'18px 18px 0 0', width:'100%', maxWidth:480, maxHeight:'80%', overflow:'auto', padding:'16px 16px 24px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:10 }}>
              <div><div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:18, fontWeight:800, color:BS.ink }}>{sel.name}</div><div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12, color:BS.ink2, marginTop:2 }}><span style={{ width:9, height:9, borderRadius:'50%', background:tm(sel.type).color }}/>{tm(sel.type).label}</div></div>
              <button onClick={()=>setSel(null)} style={{ background:'none', border:'none', fontSize:24, color:BS.soft, cursor:'pointer', lineHeight:1 }}>{'×'}</button>
            </div>
            {sel.address && <div style={{ fontSize:12.5, color:BS.soft, marginTop:6 }}>{sel.address}</div>}
            {sel.description && <div style={{ fontSize:13.5, color:BS.ink, marginTop:8, lineHeight:1.5 }}>{sel.description}</div>}
            <div style={{ display:'flex', alignItems:'center', gap:8, margin:'12px 0' }}>
              {avg && <span style={{ fontSize:14, fontWeight:800, color:BS.ink }}>{'★'} {avg}</span>}
              <span style={{ fontSize:12, color:BS.soft }}>{reviews.length} {t(['reseña(s)','review(s)'])}</span>
              <a href={'https://www.google.com/maps/search/?api=1&query='+sel.lat+','+sel.lng} target="_blank" rel="noopener noreferrer" style={{ marginLeft:'auto', fontSize:12.5, fontWeight:700, color:BS.brand }}>{t(['Cómo llegar','Directions'])} {'→'}</a>
            </div>
            {reviews.map(r=> (
              <div key={r.id} style={{ borderTop:`1px solid ${BS.border}`, padding:'8px 0' }}>
                <div style={{ fontSize:12.5, fontWeight:700, color:BS.ink }}>{r.author||t(['Anónimo','Anonymous'])} <span style={{ color:BS.brand }}>{'★'.repeat(r.rating||0)}</span></div>
                {r.body && <div style={{ fontSize:13, color:BS.ink2, marginTop:2 }}>{r.body}</div>}
              </div>
            ))}
            <div style={{ borderTop:`1px solid ${BS.border}`, marginTop:8, paddingTop:10 }}>
              <div style={{ display:'flex', gap:4, marginBottom:8 }}>{[1,2,3,4,5].map(n=> <button key={n} onClick={()=>setRv({...rv,rating:n})} style={{ background:'none', border:'none', cursor:'pointer', fontSize:22, color: n<=rv.rating?BS.brand:BS.border, padding:0, lineHeight:1 }}>{'★'}</button>)}</div>
              <textarea value={rv.body} onChange={e=>setRv({...rv,body:e.target.value})} placeholder={t(['Escribe tu reseña...','Write your review...'])} rows={2} style={{ width:'100%', padding:'9px', borderRadius:10, border:`1.5px solid ${BS.border}`, background:BS.surface2, color:BS.ink, fontSize:13, fontFamily:'inherit', boxSizing:'border-box', resize:'vertical', marginBottom:8 }}/>
              <button onClick={saveReview} className="bs-btn" style={{ width:'100%', padding:'10px', borderRadius:10, border:'none', background:BS.grad, color:'#fff', fontSize:13.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>{t(['Publicar reseña','Post review'])}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  AccountScreen, MapScreen,
  BSCtx, useBS, THEMES,
  BSAvatar, BSVerified, BSocialLogo,
  WelcomeScreen, OnboardingScreen, StoriesBar,
  FeedScreen, ProfileScreen, PackScreen,
  DiscoverScreen, UploadScreen, PetsScreen, MessagesScreen,
  CommunityScreen, EventsScreen, NewsScreen, VideosScreen, CreateProfileScreen,
  PostDetail, StatusChip, BadgeChips,
});
