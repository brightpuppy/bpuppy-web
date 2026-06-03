// s-app.jsx — App shell with theme context + tweaks

const { useState, useEffect } = React;

// ── Phone Mockup ───────────────────────────────────────────────────────────────
function PhoneMockup({ children }) {
  return (
    <div style={{ position:'relative', width:375, height:780, borderRadius:52,
      background:'#0A0A0A', padding:'14px 5px 10px',
      boxShadow:'0 0 0 10px #141414, 0 0 0 11px #222, 0 48px 120px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.08)' }}>
      {/* Dynamic Island */}
      <div style={{ position:'absolute', top:14, left:'50%', transform:'translateX(-50%)', width:120, height:34, background:'#0A0A0A', borderRadius:20, zIndex:30, display:'flex', alignItems:'center', justifyContent:'center', gap:9 }}>
        <div style={{ width:11, height:11, borderRadius:'50%', background:'#1c1c1c', border:'1px solid #2a2a2a' }}/>
        <div style={{ width:5, height:5, borderRadius:'50%', background:'#2a2a2a' }}/>
      </div>
      {/* Side buttons */}
      <div style={{ position:'absolute', right:-3, top:130, width:4, height:68, background:'#222', borderRadius:'0 2px 2px 0' }}/>
      <div style={{ position:'absolute', left:-3, top:108, width:4, height:40, background:'#222', borderRadius:'2px 0 0 2px' }}/>
      <div style={{ position:'absolute', left:-3, top:160, width:4, height:40, background:'#222', borderRadius:'2px 0 0 2px' }}/>
      {/* Screen */}
      <div style={{ width:'100%', height:'100%', borderRadius:42, overflow:'hidden', position:'relative', isolation:'isolate' }}>
        {/* Status bar */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:44, display:'flex', alignItems:'flex-end', justifyContent:'space-between', padding:'0 24px 7px', zIndex:20, pointerEvents:'none' }}>
          <span style={{ fontSize:12, fontWeight:700, color:'rgba(240,238,248,0.7)' }}>9:41</span>
          <div style={{ display:'flex', gap:5, alignItems:'center' }}>
            <svg width="16" height="11" viewBox="0 0 16 12" fill="rgba(240,238,248,0.6)"><rect x="0" y="3" width="3" height="9" rx="1"/><rect x="4.5" y="1.5" width="3" height="10.5" rx="1"/><rect x="9" y="0" width="3" height="12" rx="1"/><rect x="13.5" y="0" width="2.5" height="12" rx="1" opacity=".35"/></svg>
            <svg width="16" height="12" viewBox="0 0 20 14" fill="rgba(240,238,248,0.6)"><rect width="14" height="14" rx="2.5" opacity=".3"/><rect x="1" y="1" width="12" height="12" rx="1.5"/><rect x="15" y="4" width="4" height="6" rx="2"/></svg>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

// ── Floating Bottom Nav ────────────────────────────────────────────────────────
function BottomNav({ screen, setScreen, bs }) {
  const t = window.useT ? window.useT() : (x => Array.isArray(x) ? x[0] : x);
  const navBtns = [
    { id:'feed',     label:t(['Inicio','Home']),
      icon: a => <svg width="22" height="22" viewBox="0 0 24 24" fill={a?bs.brand:'none'} stroke={a?bs.brand:bs.soft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { id:'discover', label:t(['Explorar','Explore']),
      icon: a => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?bs.brand:bs.soft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> },
    { id:'__fab', label:'', icon: null },
    { id:'pack',     label:t(['Pack','Pack']),
      icon: a => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?bs.brand:bs.soft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> },
    { id:'account',  label:t(['Cuenta','Account']),
      icon: a => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?bs.brand:bs.soft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M8 4v4"/></svg> },
    { id:'profile',  label:t(['Perfil','Profile']),
      icon: a => <svg width="22" height="22" viewBox="0 0 24 24" fill={a?bs.brand:'none'} stroke={a?bs.brand:bs.soft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ];

  return (
    <div style={{ padding:'0 10px 10px', flexShrink:0 }}>
      <div style={{ display:'flex', alignItems:'center', background:bs.surface, backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderRadius:999, border:`1px solid ${bs.borderStrong}`, padding:'5px 8px', boxShadow:'0 8px 32px rgba(0,0,0,0.45)' }}>
        {navBtns.map(btn => {
          if (btn.id === '__fab') return (
            <div key="fab" style={{ flex:1, display:'flex', justifyContent:'center' }}>
              <button onClick={() => setScreen('upload')} style={{ width:46, height:46, borderRadius:14, background:bs.grad, border:'none', cursor:'pointer', display:'grid', placeItems:'center', boxShadow:bs.glow, transform:'translateY(-10px)', transition:'transform .2s' }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-13px) scale(1.07)'}
                onMouseLeave={e => e.currentTarget.style.transform='translateY(-10px)'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            </div>
          );
          const active = screen === btn.id;
          return (
            <button key={btn.id} onClick={() => setScreen(btn.id)}
              style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'7px 4px 6px', background: active ? `rgba(255,85,32,0.1)` : 'transparent', border:'none', borderRadius:999, cursor:'pointer', transition:'all .15s' }}>
              {btn.icon(active)}
              <span style={{ fontSize:9.5, fontWeight:600, color: active ? bs.brand : bs.soft }}>{btn.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Desktop Sidebar ────────────────────────────────────────────────────────────
const SI_PATHS = {
  home:'<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  community:'<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
  discover:'<circle cx="12" cy="12" r="9"/><polygon points="16.2 7.8 14.1 14.1 7.8 16.2 9.9 9.9"/>',
  events:'<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
  news:'<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M7 9h10M7 12.5h10M7 16h6"/>',
  video:'<rect x="2.5" y="6" width="14" height="12" rx="2"/><path d="M16.5 10l5-3v10l-5-3z"/>',
  pack:'<circle cx="7" cy="9" r="1.7"/><circle cx="12" cy="7.4" r="1.7"/><circle cx="17" cy="9" r="1.7"/><path d="M12 12c-2.4 0-4.3 1.9-4.3 3.9 0 1.5 1.2 2.4 2.6 2.4 .8 0 1.1-.4 1.7-.4s.9 .4 1.7 .4c1.4 0 2.6-.9 2.6-2.4 0-2-1.9-3.9-4.3-3.9z"/>',
  pets:'<path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 00-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 000-7.8z"/>',
  profile:'<circle cx="12" cy="8" r="3.4"/><path d="M5.5 20a6.5 6.5 0 0113 0"/>',
  messages:'<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
};
function SIcon({ name, color, size=19 }) {
  const p = SI_PATHS[name]; if (!p) return null;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html:p }}/>;
}
function DesktopSidebar({ screen, setScreen, bs }) {
  const t = window.useT ? window.useT() : (x => Array.isArray(x) ? x[0] : x);
  const navItems = [
    { id:'feed',      label:t(['Novedades','Latest']),       icon:'home' },
    { id:'community', label:t(['Comunidad','Community']),     icon:'community' },
    { id:'discover',  label:t(['Descubrir','Discover']),      icon:'discover' },
    { id:'events',    label:t(['Eventos','Events']),          icon:'events' },
    { id:'news',      label:t(['Noticias','News']),           icon:'news' },
    { id:'videos',    label:t(['Videos','Videos']),           icon:'video' },
    { id:'pack',      label:t(['Mi Pack','My Pack']),         icon:'pack' },
    { id:'pets',      label:t(['Mis Mascotas','My Pets']),    icon:'pets' },
    { id:'messages',  label:t(['Mensajes','Messages']),       icon:'messages', badge:2 },
    { id:'profile',   label:t(['Perfil','Profile']),          icon:'profile' },
  ];
  return (
    <div style={{ width:230, background:bs.surface, borderRight:`1px solid ${bs.border}`, display:'flex', flexDirection:'column', height:'100%', padding:'18px 12px', flexShrink:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:28, paddingLeft:8 }}>
        <div style={{ width:36, height:36, borderRadius:12, background:bs.grad, display:'grid', placeItems:'center', flexShrink:0, boxShadow:bs.glow }}>
          <svg viewBox="0 0 40 40" width="20" height="20" fill="white"><ellipse cx="20" cy="26" rx="10" ry="8"/><ellipse cx="9" cy="16" rx="4" ry="5.5"/><ellipse cx="31" cy="16" rx="4" ry="5.5"/><ellipse cx="14" cy="8" rx="3.5" ry="5"/><ellipse cx="26" cy="8" rx="3.5" ry="5"/></svg>
        </div>
        <span style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:20, fontWeight:800, letterSpacing:'-0.04em', background:bs.grad, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>B Social</span>
      </div>
      <a href="/" style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px', marginBottom:14, borderRadius:10, border:`1px solid ${bs.border}`, textDecoration:'none', color:bs.ink2, fontSize:12.5, fontWeight:600 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        {t(['Volver a BPuppy','Back to BPuppy'])}
      </a>
      <nav style={{ flex:1, display:'flex', flexDirection:'column', gap:2 }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setScreen(item.id)}
            style={{ display:'flex', alignItems:'center', gap:11, padding:'10px 12px', borderRadius:12, border:'none', cursor:'pointer', fontFamily:'inherit', textAlign:'left', background: screen===item.id ? bs.surface2 : 'transparent', color: screen===item.id ? bs.brand : bs.ink2, fontWeight: screen===item.id ? 700 : 500, fontSize:14, transition:'all .13s' }}>
            <SIcon name={item.icon} color={screen===item.id ? bs.brand : bs.ink2}/>
            {item.label}
            {item.badge && <span style={{ marginLeft:'auto', background:bs.brand, color:'#fff', fontSize:10, fontWeight:700, borderRadius:999, padding:'1px 7px' }}>{item.badge}</span>}
          </button>
        ))}
      </nav>
      <button onClick={() => setScreen('account')} style={{ display:'flex', alignItems:'center', gap:11, padding:'10px 12px', marginBottom:10, borderRadius:12, cursor:'pointer', width:'100%', textAlign:'left', fontFamily:'inherit', background: screen==='account'?bs.surface2:'transparent', border:`1px solid ${screen==='account'?bs.brand:bs.border}`, color: screen==='account'?bs.brand:bs.ink2, fontWeight:600, fontSize:13.5 }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M8 4v4"/></svg>
        {t(['Mi Cuenta · Reservas','My Account · Bookings'])}
      </button>
      <button onClick={() => setScreen('upload')} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'12px', borderRadius:14, border:'none', background:bs.grad, color:'#fff', fontSize:13.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit', marginBottom:14, boxShadow:bs.glow, transition:'opacity .15s' }}
        onMouseEnter={e=>e.currentTarget.style.opacity='.85'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        {t(['Publicar','Post'])}
      </button>
      <div style={{ display:'flex', alignItems:'center', gap:9, padding:'9px 10px', borderRadius:12, cursor:'pointer' }} onClick={()=>setScreen('profile')}>
        <BSAvatar user={BSDATA.me} size={34}/>
        <div><div style={{ fontSize:13, fontWeight:700, color:bs.ink }}>{BSDATA.me.username}</div><div style={{ fontSize:10.5, color:bs.soft }}>{BSDATA.me.city}</div></div>
      </div>
    </div>
  );
}

// ── Right Rail ─────────────────────────────────────────────────────────────────
function RightRail({ bs }) {
  const t = window.useT ? window.useT() : (x => Array.isArray(x) ? x[0] : x);
  const [added, setAdded] = useState(new Set());
  const toggle = id => setAdded(s => { const n=new Set(s); n.has(id)?n.delete(id):n.add(id); return n; });
  return (
    <div style={{ width:264, padding:'18px 14px', display:'flex', flexDirection:'column', gap:16, flexShrink:0, overflowY:'auto' }} className="bs-scr">
      <div style={{ background:bs.surface2, borderRadius:12, padding:'9px 13px', display:'flex', alignItems:'center', gap:8, border:`1px solid ${bs.border}` }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={bs.soft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <span style={{ fontSize:13, color:bs.soft }}>{t(['Buscar en B Social','Search B Social'])}</span>
      </div>
      <div style={{ background:bs.surface, borderRadius:16, padding:'14px', border:`1px solid ${bs.border}` }}>
        <div style={{ fontSize:13, fontWeight:800, color:bs.ink, marginBottom:12, fontFamily:'Bricolage Grotesque,sans-serif' }}>{t(['Sugerencias','Suggestions'])}</div>
        {(BSDATA.suggestions||[]).map(u => (
          <div key={u.id} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:11 }}>
            <BSAvatar user={u} size={34}/>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:12.5, fontWeight:700, color:bs.ink, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{u.name||u.username}</div>
              <div style={{ fontSize:10.5, color:bs.soft, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{u.pet || u.city}</div>
            </div>
            <button onClick={()=>{ toggle(u.id); if(window.BSAUTH && window.BSAUTH.follow) try{ window.BSAUTH.follow(u.username, added.has(u.id)); }catch(e){} }} style={{ padding:'4px 11px', borderRadius:999, border:`1.5px solid ${added.has(u.id)?bs.border:bs.brand}`, background:'transparent', color:added.has(u.id)?bs.soft:bs.brand, fontSize:11.5, fontWeight:700, cursor:'pointer', fontFamily:'inherit', flexShrink:0 }}>
              {added.has(u.id)?t(['Siguiendo','Following']):t(['Seguir','Follow'])}
            </button>
          </div>
        ))}
        {!(BSDATA.suggestions||[]).length && <div style={{ fontSize:12, color:bs.soft }}>{t(['Pronto verás sugerencias.','Suggestions coming soon.'])}</div>}
      </div>
      <div style={{ background:bs.surface, borderRadius:16, padding:'14px', border:`1px solid ${bs.border}` }}>
        <div style={{ fontSize:13, fontWeight:800, color:bs.ink, marginBottom:12, fontFamily:'Bricolage Grotesque,sans-serif' }}>{t(['Tendencias','Trending'])}</div>
        {['#GoldenRetriever','#PuppyLife','#DogMom','#CatLife','#Frenchie'].map((tag,i) => (
          <div key={tag} style={{ display:'flex', justifyContent:'space-between', marginBottom:9 }}>
            <span style={{ fontSize:12.5, color:bs.brand, fontWeight:600, cursor:'pointer' }}>{tag}</span>
            <span style={{ fontSize:11, color:bs.soft }}>{[12.4,8.9,6.2,5.1,4.8][i]}k</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Screen router ──────────────────────────────────────────────────────────────
function ScreenView({ screen, setScreen, posts, toggleLike, toggleSave, onOpenPost }) {
  const p = { screen, setScreen, posts, toggleLike, toggleSave, onOpenPost };
  if (screen==='feed')     return <FeedScreen     {...p}/>;
  if (screen==='account')  return <AccountScreen  setScreen={setScreen}/>;
  if (screen==='profile')  return <ProfileScreen  posts={posts} setScreen={setScreen}/>;
  if (screen==='pack')     return <PackScreen     setScreen={setScreen}/>;
  if (screen==='discover') return <DiscoverScreen setScreen={setScreen}/>;
  if (screen==='mapa') return <MapScreen setScreen={setScreen}/>;
  if (screen==='upload')   return <UploadScreen   setScreen={setScreen}/>;
  if (screen==='pets')     return <PetsScreen/>;
  if (screen==='messages') return <MessagesScreen setScreen={setScreen}/>;
  if (screen==='editprofile') return <CreateProfileScreen me={window.BSAUTH && window.BSAUTH.me} onSave={window.BSAUTH && window.BSAUTH.saveProfile} onDone={() => setScreen('profile')} onLogout={window.BSAUTH && window.BSAUTH.logout}/>;
  if (screen==='community') return <CommunityScreen/>;
  if (screen==='events')   return <EventsScreen/>;
  if (screen==='news')     return <NewsScreen/>;
  if (screen==='videos')   return <VideosScreen/>;
  return <FeedScreen {...p}/>;
}

// ── Tweaks Panel ───────────────────────────────────────────────────────────────
function BSocialTweaks({ theme, setThemeFn }) {
  const t = window.useT ? window.useT() : (x => Array.isArray(x) ? x[0] : x);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = e => {
      if (e.data?.type === '__activate_edit_mode') setVisible(true);
      if (e.data?.type === '__deactivate_edit_mode') setVisible(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type:'__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);
  if (!visible) return null;
  const themes = [
    { key:'clean',    label:'Clean',    color:'#F58220' },
    { key:'electric', label:'Electric', color:'#0EA5E9' },
    { key:'midnight', label:'Midnight', color:'#FF5520' },
    { key:'violet',   label:'Violet',   color:'#9B6FFF' },
    { key:'warm',     label:'Warm',     color:'#F55820' },
  ];
  return (
    <div style={{ position:'fixed', bottom:20, right:20, zIndex:9999, background:'#18181e', border:'1px solid rgba(255,255,255,0.12)', borderRadius:16, padding:'16px 18px', boxShadow:'0 16px 48px rgba(0,0,0,0.6)', minWidth:200, fontFamily:'Plus Jakarta Sans,sans-serif' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
        <span style={{ fontWeight:700, fontSize:13, color:'#fff' }}>Tweaks</span>
        <button onClick={() => { setVisible(false); window.parent.postMessage({type:'__edit_mode_dismissed'},'*'); }} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:16, padding:0 }}>×</button>
      </div>
      <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>{t(['Tema','Theme'])}</div>
      <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
        {themes.map(t => (
          <button key={t.key} onClick={() => setThemeFn(t.key)}
            style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', borderRadius:10, border:`1.5px solid ${theme===t.key ? t.color : 'rgba(255,255,255,0.08)'}`, background: theme===t.key ? `rgba(255,255,255,0.07)` : 'transparent', cursor:'pointer', fontFamily:'inherit', color:'#fff', fontSize:13, fontWeight: theme===t.key ? 700 : 500 }}>
            <div style={{ width:14, height:14, borderRadius:'50%', background:t.color, flexShrink:0 }}/>
            {t.label}
            {theme===t.key && <svg style={{ marginLeft:'auto' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
const SU = 'https://oqqwmcplljirbreowrll.supabase.co';
const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4';
function App() {
  const [screen,    setScreen]   = useState('welcome');
  const [themeName, setThemeName] = useState('clean');
  const [isWide,    setIsWide]   = useState(typeof window !== 'undefined' ? window.innerWidth >= 900 : true);
  const [posts,     setPosts]    = useState(() => BSDATA.posts.map(p=>({...p})));
  const [authed,    setAuthed]   = useState(false);
  const [me,        setMe]       = useState(null);
  const [following, setFollowing] = useState([]);
  const [, setTick] = useState(0);
  const bs = THEMES[themeName];

  // Idioma del sitio (bilingüe): se sincroniza con la preferencia global 'bpuppy-lang'.
  const [lang, setLang] = useState(() => (window.bpGetLang && window.bpGetLang()) || 'es');
  useEffect(() => {
    const h = (e) => setLang((e && e.detail) || (window.bpGetLang && window.bpGetLang()) || 'es');
    window.addEventListener('bpuppy:lang', h);
    window.addEventListener('bpuppy-lang-change', h);
    return () => { window.removeEventListener('bpuppy:lang', h); window.removeEventListener('bpuppy-lang-change', h); };
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const LangCtx = (typeof window !== 'undefined' && (window.BSLangContext || window.LangContext)) || null;

  useEffect(() => { const onR=()=>setIsWide(window.innerWidth>=900); window.addEventListener('resize',onR); return ()=>window.removeEventListener('resize',onR); }, []);

  const dt = (iso,o)=>{try{return new Date(iso).toLocaleDateString('es-US',o);}catch(e){return '';}};
  const rel = iso=>{try{const s=(Date.now()-new Date(iso).getTime())/1000; if(s<3600)return Math.max(1,Math.round(s/60))+'m'; if(s<86400)return Math.round(s/3600)+'h'; return Math.round(s/86400)+'d';}catch(e){return '';}};
  const getToken = async () => { const sb=window._bsSb; if(!sb)return null; try{const {data}=await sb.auth.getSession(); return (data&&data.session&&data.session.access_token)||null;}catch(e){return null;} };
  const apiCall = async (action, extra) => {
    const tok = await getToken();
    const r = await fetch(SU+'/functions/v1/social_api', { method:'POST', headers:{ 'Content-Type':'application/json', 'apikey':ANON, 'Authorization':'Bearer '+(tok||ANON) }, body: JSON.stringify({ action, ...(extra||{}) }) });
    return r.json();
  };
  const applyData = (d) => {
    if (d.events && d.events.length) BSDATA.bpuppyEvents = d.events.map(e=>({ id:e.id, title:e.title, date: dt(e.event_date,{weekday:'long',day:'numeric',month:'long'})+' · '+dt(e.event_date,{hour:'numeric',minute:'2-digit'}), place:e.place, img:e.cover_url, attendees:e.attendees||0 }));
    if (d.news && d.news.length) BSDATA.news = d.news.map(n=>({ id:n.id, title:n.title, excerpt:n.excerpt, tag:n.tag, date: dt(n.created_at,{day:'numeric',month:'short',year:'numeric'}), img:n.cover_url }));
    if (d.videos && d.videos.length) BSDATA.videos = d.videos.map(v=>({ id:v.id, title:v.title, dur:v.duration, thumb:v.thumb_url }));
    BSDATA.community = (d.community||[]).map(m=>({ id:m.username, username:m.username, name:m.name, initials:m.initials, color:m.avatar_color, avatar:m.avatar_url, city:m.city, bio:m.bio, bpuppy:m.bpuppy, status:m.status||'nuevo', badges:m.badges||[], pet:{ name:(m.pet&&m.pet.name)||'', species:(m.pet&&m.pet.species)||'', breed:(m.pet&&m.pet.breed)||'', color:(m.pet&&m.pet.color)||'', age:(m.pet&&m.pet.age)||'', img:(m.pet&&m.pet.photo_url)||'assets/photos/g01.webp' } }));
    BSDATA.stories = (d.stories || []).map(s=>({ id:s.id, username:s.name||s.username, initials:s.initials, color:s.avatar_color||s.color, avatar:s.avatar_url, img:s.media_url, hasNew:true }));
    if (d.suggestions) BSDATA.suggestions = d.suggestions.map(c=>({ id:c.username, username:c.username, name:c.name, initials:c.initials, color:c.avatar_color, avatar:c.avatar_url, city:c.city, status:c.status||'nuevo', badges:c.badges||[], pet:(c.pet&&c.pet.breed)||'' }));
    if (d.feed && d.feed.length) setPosts(d.feed.map(p=>({ id:p.id, username:p.username, initials:p.initials, color:p.color, avatar:p.avatar_url, city:p.city, location:p.location||'', time:rel(p.created_at), verified:p.username==='brightpuppy', img:p.img, caption:p.caption, tags:[], likes:p.likes||0, comments:0, liked:false, saved:false })));
  };
  const refresh = async () => { try { const d = await apiCall('get',{}); if(d&&d.ok){ applyData(d); if(d.me && d.me.username){ BSDATA.me = { ...BSDATA.me, username:d.me.username, name:d.me.display_name||d.me.username, city:d.me.city||'', initials:(d.me.username||'?').slice(0,2).toUpperCase(), color:d.me.avatar_color||BSDATA.me.color, bio:d.me.bio||'', verified:d.me.username==='brightpuppy', status:d.me.status||'nuevo', badges:d.me.badges||[], free_grooming:d.me.free_grooming||0 }; } setMe(d.me||null); setFollowing(d.following||[]); setTick(t=>t+1); } } catch(e){} };

  useEffect(() => {
    if (window.supabase && !window._bsSb) { try { window._bsSb = supabase.createClient(SU, ANON); } catch(e){} }
    refresh();
    const sb = window._bsSb; if(!sb) return;
    let wantProfile = false; try { wantProfile = new URLSearchParams(location.search).get('view') === 'profile'; } catch(e){}
    const landing = wantProfile ? 'profile' : 'feed';
    let landed = false; // solo navegamos al landing en el PRIMER login; al volver de otra pestaña no reseteamos la pantalla
    const goLanding = () => { if(!landed){ landed = true; setScreen(landing); } };
    sb.auth.getSession().then(({data})=>{ if(data&&data.session&&data.session.access_token){ setAuthed(true); goLanding(); refresh(); } });
    const sub = sb.auth.onAuthStateChange((_e, sess)=>{ if(sess&&sess.access_token){ setAuthed(true); goLanding(); refresh(); } else { setAuthed(false); setMe(null); landed=false; } });
    return () => { try{sub.data.subscription.unsubscribe();}catch(e){} };
  }, []);

  const sendLink = async (email) => {
    const r = await fetch(SU+'/functions/v1/portal_magiclink', { method:'POST', headers:{'Content-Type':'application/json','apikey':ANON}, body: JSON.stringify({ email, redirectTo: location.origin+'/social' }) });
    return r.json();
  };
  const logout = async () => { const sb=window._bsSb; if(sb){ try{ await sb.auth.signOut(); }catch(e){} } setAuthed(false); setMe(null); setScreen('welcome'); };

  const needsProfile = authed && me && !me.username;
  const loggedIn = authed && !needsProfile;

  window.BSAUTH = { me, following, refresh, logout, isWide,
    saveProfile: async (f) => {
      const d = await apiCall('profile_save', f);
      if(d&&d.ok){
        // Historia pendiente desde Adopciones -> publicarla como primer post
        try { const pend = JSON.parse(localStorage.getItem('bp_pending_social')||'null');
          if(pend && (pend.story || pend.photo_url)){ await apiCall('post_create', { caption: pend.story || ('Adopté a ' + (pend.pet_name||'mi mascota')), media_url: pend.photo_url || '', visibility:'public' }); }
          localStorage.removeItem('bp_pending_social');
        } catch(e){}
        await refresh();
      }
      return d;
    },
    createPost:  async (f) => { const d = await apiCall('post_create', f); if(d&&d.ok) await refresh(); return d; },
    createStory: async (media_url) => { const d = await apiCall('story_create', { media_url }); if(d&&d.ok) await refresh(); return d; },
    follow:      async (target, unfollow) => { const d = await apiCall('follow', { target_email:target, unfollow }); if(d&&d.ok) await refresh(); return d; },
    postDetail:  async (id) => apiCall('post_detail', { post_id:id }),
    addComment:  async (id, text) => apiCall('comment_create', { post_id:id, text }),
    likeToggle:  async (id) => apiCall('like_toggle', { post_id:id }),
    // Mi Cuenta (portal) dentro de B Social — mismas tablas que el CRM (vía portal_data / portal_add_pet)
    accountData: async () => { const tok = await getToken(); const r = await fetch(SU+'/functions/v1/portal_data',{ method:'POST', headers:{ 'Content-Type':'application/json', 'apikey':ANON, 'Authorization':'Bearer '+(tok||ANON) }, body:'{}' }); return r.json(); },
    addPet:      async (f) => { const tok = await getToken(); const r = await fetch(SU+'/functions/v1/portal_add_pet',{ method:'POST', headers:{ 'Content-Type':'application/json', 'apikey':ANON, 'Authorization':'Bearer '+(tok||ANON) }, body:JSON.stringify(f) }); return r.json(); },
    updatePet:   async (f) => { const tok = await getToken(); const r = await fetch(SU+'/functions/v1/portal_update_pet',{ method:'POST', headers:{ 'Content-Type':'application/json', 'apikey':ANON, 'Authorization':'Bearer '+(tok||ANON) }, body:JSON.stringify(f) }); return r.json(); },
    manageBooking: async (action, id, extra) => { const r = await fetch(SU+'/functions/v1/grooming_manage',{ method:'POST', headers:{ 'Content-Type':'application/json', 'apikey':ANON }, body:JSON.stringify({ action, id, ...(extra||{}) }) }); return r.json(); },
    payPlan:     async (plan_id) => { const r = await fetch(SU+'/functions/v1/stripe_checkout',{ method:'POST', headers:{ 'Content-Type':'application/json', 'apikey':ANON }, body:JSON.stringify({ type:'plan_abono', plan_id, success_url:location.origin+'/social', cancel_url:location.origin+'/social' }) }); return r.json(); },
  };

  const [openPost, setOpenPost] = useState(null);
  const toggleLike = id => { setPosts(prev => prev.map(p => p.id===id ? {...p, liked:!p.liked, likes:p.liked?p.likes-1:p.likes+1} : p)); try { window.BSAUTH.likeToggle(id); } catch(e){} };
  const toggleSave = id => setPosts(prev => prev.map(p => p.id===id ? {...p, saved:!p.saved} : p));

  const MobileContent = () => (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', overflow:'hidden', background:bs.bg }}>
      <a href="/" style={{ display:'flex', alignItems:'center', gap:6, padding:'9px 16px', background:bs.surface, borderBottom:`1px solid ${bs.border}`, textDecoration:'none', color:bs.ink2, fontSize:12.5, fontWeight:600, flexShrink:0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        {(window.pick ? window.pick(['Volver a BPuppy','Back to BPuppy'], lang) : 'Volver a BPuppy')}
      </a>
      <div style={{ flex:1, overflowY:'auto' }} className="bs-scr">
        <ScreenView screen={screen} setScreen={setScreen} posts={posts} toggleLike={toggleLike} toggleSave={toggleSave} onOpenPost={setOpenPost}/>
      </div>
      {screen!=='upload' && <BottomNav screen={screen} setScreen={setScreen} bs={bs}/>}
    </div>
  );

  // Envuelve el árbol con el contexto de idioma para que TODAS las pantallas cambien de idioma.
  // Envuelve el árbol con el contexto de idioma para que TODAS las pantallas cambien de idioma.
  // (función, no componente, para no remontar el árbol en cada render)
  const wrap = (children) => LangCtx
    ? <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>
    : children;

  // Login real / crear perfil — tarjeta centrada a pantalla completa
  if (!loggedIn) {
    return wrap(
      <BSCtx.Provider value={bs}>
        <div style={{ minHeight:'100vh', background:bs.bg, display:'flex', alignItems:'center', justifyContent:'center', padding: isWide ? '24px' : 0 }}>
          <div style={{ width:'100%', maxWidth: isWide ? 460 : '100%', height: isWide ? 'min(840px,94vh)' : '100vh', background:bs.surface, borderRadius: isWide ? 28 : 0, overflow:'hidden', boxShadow: isWide ? '0 40px 120px rgba(0,0,0,0.55)' : 'none', display:'flex', flexDirection:'column' }}>
            <div style={{ flex:1, overflowY:'auto' }} className="bs-scr">
              {needsProfile
                ? <CreateProfileScreen me={me} onSave={window.BSAUTH.saveProfile} onLogout={logout}/>
                : <WelcomeScreen onSendLink={sendLink}/>}
            </div>
          </div>
        </div>
        <BSocialTweaks theme={themeName} setThemeFn={setThemeName}/>
      </BSCtx.Provider>
    );
  }

  // App real, a pantalla completa
  return wrap(
    <BSCtx.Provider value={bs}>
      {isWide ? (
        <div style={{ height:'100vh', display:'flex', background:bs.bg, overflow:'hidden' }}>
          <DesktopSidebar screen={screen} setScreen={setScreen} bs={bs}/>
          <div style={{ flex:1, overflowY:'auto', background:bs.bg }} className="bs-scr">
            <div style={{ maxWidth:660, margin:'0 auto', borderLeft:`1px solid ${bs.border}`, borderRight:`1px solid ${bs.border}`, minHeight:'100%' }}>
              <ScreenView screen={screen} setScreen={setScreen} posts={posts} toggleLike={toggleLike} toggleSave={toggleSave} onOpenPost={setOpenPost}/>
            </div>
          </div>
          {(screen==='feed' || screen==='discover') && <RightRail bs={bs}/>}
        </div>
      ) : (
        <div style={{ height:'100vh', overflow:'hidden', background:bs.bg }}>
          <MobileContent/>
        </div>
      )}
      {openPost && <PostDetail post={openPost} onClose={()=>setOpenPost(null)}/>}
      <BSocialTweaks theme={themeName} setThemeFn={setThemeName}/>
    </BSCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
