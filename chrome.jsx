// chrome.jsx — Header, Footer, Paw cursor

const { useState, useEffect, useRef, useCallback } = React;

const LANG_OPTIONS = [
  ['fr','Français'],['pt','Português'],['de','Deutsch'],['it','Italiano'],
  ['zh-CN','中文'],['ja','日本語'],['ko','한국어'],['ar','العربية'],
  ['ru','Русский'],['hi','हिन्दी'],['tr','Türkçe'],['th','ไทย'],['vi','Tiếng Việt'],
];
// Short display codes for the toggle button
const GT_SHORT = {
  'fr':'FR','pt':'PT','de':'DE','it':'IT','zh-CN':'ZH',
  'ja':'JA','ko':'KO','ar':'AR','ru':'RU','hi':'HI','tr':'TR','th':'TH','vi':'VI',
};
// Browser navigator.language → GT code
const GT_BROWSER = {
  'fr':'fr','pt':'pt','de':'de','it':'it','zh':'zh-CN',
  'ja':'ja','ko':'ko','ar':'ar','ru':'ru','hi':'hi','tr':'tr','th':'th','vi':'vi',
};

// ── Auth (shared with portal.html) ────────────────────────────────────────
const SB_URL  = 'https://oqqwmcplljirbreowrll.supabase.co';
const SB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4';
const SB_SKEY = 'sb-oqqwmcplljirbreowrll-auth-token';

function readBpSession() {
  try {
    const raw = localStorage.getItem(SB_SKEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    const s = o && (o.currentSession || o.session || o);
    const user = s && s.user;
    if (!user || !user.email) return null;
    return { token: s.access_token || '', email: user.email, meta: user.user_metadata || {} };
  } catch (e) { return null; }
}

function firstNameFrom(sess) {
  if (!sess) return '';
  const cached = (() => { try { return localStorage.getItem('bpuppy-name') || ''; } catch (e) { return ''; } })();
  const fromMeta = sess.meta && (sess.meta.first_name || (sess.meta.full_name || sess.meta.name || '').split(' ')[0]);
  const raw = cached || fromMeta || sess.email.split('@')[0];
  return (raw || '').split(' ')[0];
}

function initialsFrom(name, email) {
  const base = (name || (email || '').split('@')[0] || '').trim();
  const parts = base.split(/[\s._-]+/).filter(Boolean);
  const s = (parts[0] ? parts[0][0] : '') + (parts[1] ? parts[1][0] : '');
  return (s || base.slice(0, 2) || '?').toUpperCase();
}

function AuthControl({ isOverDark }) {
  const t = useT();
  const [sess, setSess] = useState(readBpSession);
  const [name, setName] = useState(() => firstNameFrom(readBpSession()));
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const ref = useRef();

  // re-read session on focus + cross-tab storage changes
  useEffect(() => {
    const sync = () => { const s = readBpSession(); setSess(s); setName(firstNameFrom(s)); };
    window.addEventListener('focus', sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener('focus', sync); window.removeEventListener('storage', sync); };
  }, []);

  // close popovers on outside click
  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); } };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  // fetch real first name once when logged in (and cache it)
  useEffect(() => {
    if (!sess || !sess.token) return;
    let cancel = false;
    fetch(SB_URL + '/functions/v1/portal_data', { method:'POST', headers:{ 'Authorization':'Bearer '+sess.token, 'apikey':SB_ANON, 'Content-Type':'application/json' }, body:'{}' })
      .then(r => r.json()).then(d => {
        if (cancel || !d || !d.client) return;
        const fn = (d.client.first_name || '').trim();
        if (fn) { try { localStorage.setItem('bpuppy-name', fn); } catch (e) {} setName(fn.split(' ')[0]); }
      }).catch(() => {});
    return () => { cancel = true; };
  }, [sess && sess.token]);

  const logout = () => {
    try {
      Object.keys(localStorage).forEach(k => { if (k.indexOf('sb-oqqwmcplljirbreowrll-') === 0) localStorage.removeItem(k); });
      localStorage.removeItem('bpuppy-name');
    } catch (e) {}
    setSess(null); setName(''); setOpen(false);
    if (/\/portal/.test(location.pathname)) location.href = '/'; else location.reload();
  };

  const sendLink = (e) => {
    e && e.preventDefault();
    const em = (email || '').trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return;
    setSending(true);
    fetch(SB_URL + '/functions/v1/portal_magiclink', { method:'POST', headers:{ 'Content-Type':'application/json', 'apikey':SB_ANON }, body: JSON.stringify({ email: em, redirectTo: location.origin + '/portal' }) })
      .then(r => r.json()).then(() => { setSending(false); setSent(true); }).catch(() => { setSending(false); setSent(true); });
  };

  const iconColor = isOverDark ? 'rgba(255,255,255,0.92)' : 'var(--ink-2)';
  const hoverBg   = isOverDark ? 'rgba(255,255,255,0.15)' : 'rgba(45,36,33,0.07)';
  const panel = { position:'absolute', top:'calc(100% + 10px)', right:0, background:'var(--paper,#fff)', border:'1px solid var(--line,#ebe7e3)', borderRadius:16, boxShadow:'0 16px 40px -10px rgba(0,0,0,0.22)', padding:14, minWidth:240, zIndex:400 };

  // ── Logged in: name pill + dropdown ──────────────────────────────────────
  if (sess) {
    const display = name || firstNameFrom(sess);
    return (
      <div ref={ref} className="hdr-auth" style={{ position:'relative' }}>
        <button onClick={() => setOpen(o => !o)} title={t(['Mi cuenta','My account'])}
          style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 12px 5px 6px', borderRadius:999, background: open ? hoverBg : 'none', border:'none', cursor:'pointer', color:iconColor, fontFamily:'inherit', transition:'background .15s, color .3s' }}
          onMouseEnter={e => { if (!open) e.currentTarget.style.background = hoverBg; }}
          onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'none'; }}>
          <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:30, height:30, borderRadius:'50%', background:'linear-gradient(135deg,#F55820 0%,#E83860 100%)', color:'#fff', fontWeight:800, fontSize:12, letterSpacing:'0.02em' }} className="notranslate">{initialsFrom(display, sess.email)}</span>
          <span className="notranslate" style={{ fontWeight:700, fontSize:13.5, maxWidth:120, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{display}</span>
        </button>
        {open && (
          <div style={panel}>
            <div style={{ padding:'2px 8px 10px' }}>
              <div className="notranslate" style={{ fontWeight:800, fontSize:14, color:'var(--ink)' }}>{display}</div>
              <div className="notranslate" style={{ fontSize:12, color:'var(--ink-2)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{sess.email}</div>
            </div>
            <div style={{ height:1, background:'var(--line,#ebe7e3)', margin:'0 0 8px' }}/>
            <a href="/portal" style={{ display:'flex', alignItems:'center', gap:9, padding:'9px 10px', borderRadius:9, textDecoration:'none', color:'var(--ink)', fontWeight:700, fontSize:13.5 }}
              onMouseEnter={e => e.currentTarget.style.background='var(--bg,#f8f5f2)'} onMouseLeave={e => e.currentTarget.style.background='none'}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
              {t(['Mi cuenta','My account'])}
            </a>
            <button onClick={logout} style={{ display:'flex', width:'100%', alignItems:'center', gap:9, padding:'9px 10px', borderRadius:9, border:'none', background:'none', cursor:'pointer', color:'var(--ink)', fontFamily:'inherit', fontWeight:700, fontSize:13.5, textAlign:'left' }}
              onMouseEnter={e => e.currentTarget.style.background='var(--bg,#f8f5f2)'} onMouseLeave={e => e.currentTarget.style.background='none'}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
              {t(['Cerrar sesión','Sign out'])}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── Logged out: icon + quick magic-link popover ──────────────────────────
  return (
    <div ref={ref} className="hdr-auth" style={{ position:'relative' }}>
      <button onClick={() => { setOpen(o => !o); setSent(false); }} title={t(['Entrar','Sign in'])} aria-label={t(['Entrar','Sign in'])}
        style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:32, height:32, borderRadius:'50%', background: open ? hoverBg : 'none', border:'none', cursor:'pointer', color:iconColor, transition:'background .15s, color .3s' }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = hoverBg; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'none'; }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
      </button>
      {open && (
        <div style={panel}>
          {sent ? (
            <div style={{ textAlign:'center', padding:'8px 4px' }}>
              <div style={{ marginBottom:6, color:'var(--orange)', display:'flex', justifyContent:'center' }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg></div>
              <div style={{ fontWeight:800, fontSize:14, color:'var(--ink)', marginBottom:4 }}>{t(['Revisa tu correo','Check your email'])}</div>
              <div style={{ fontSize:12.5, color:'var(--ink-2)', lineHeight:1.5 }}>{t(['Te enviamos un enlace para entrar sin contraseña.','We sent you a passwordless sign-in link.'])}</div>
            </div>
          ) : (
            <form onSubmit={sendLink}>
              <div style={{ fontWeight:800, fontSize:14, color:'var(--ink)', marginBottom:2 }}>{t(['Entra a tu cuenta','Sign in to your account'])}</div>
              <div style={{ fontSize:12, color:'var(--ink-2)', marginBottom:10, lineHeight:1.45 }}>{t(['Sin contraseñas. Te enviamos un enlace mágico.','No passwords. We send you a magic link.'])}</div>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t(['tu@correo.com','you@email.com'])} autoFocus
                style={{ width:'100%', boxSizing:'border-box', padding:'10px 12px', borderRadius:10, border:'1px solid var(--line,#ebe7e3)', fontSize:13.5, fontFamily:'inherit', marginBottom:9, outline:'none' }}/>
              <button type="submit" disabled={sending}
                style={{ width:'100%', padding:'10px 12px', borderRadius:10, border:'none', cursor: sending ? 'default':'pointer', background:'linear-gradient(135deg,#F55820 0%,#E83860 100%)', color:'#fff', fontWeight:800, fontSize:13.5, fontFamily:'inherit', opacity: sending ? 0.7 : 1 }}>
                {sending ? t(['Enviando…','Sending…']) : t(['Enviar enlace','Send link'])}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

function GlobeDropdown({ isOverDark, onLangSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const iconColor  = isOverDark ? 'rgba(255,255,255,0.92)' : 'var(--ink-2)';
  const hoverBg    = isOverDark ? 'rgba(255,255,255,0.15)' : 'rgba(45,36,33,0.07)';
  const activeBg   = isOverDark ? 'rgba(255,255,255,0.22)' : 'rgba(45,36,33,0.1)';

  const select = (code) => { onLangSelect && onLangSelect(code); setOpen(false); };

  return (
    <div ref={ref} className="hdr-globe" style={{ position:'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        title="Más idiomas"
        style={{ display:'flex', alignItems:'center', gap:4, padding:'6px 9px', borderRadius:999, background: open ? activeBg : 'none', border:'none', cursor:'pointer', color:iconColor, fontFamily:'inherit', fontWeight:700, fontSize:11, letterSpacing:'0.04em', transition:'background .15s, color .3s' }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = hoverBg; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'none'; }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      </button>
      {open && (
        <div style={{ position:'fixed', top:'auto', right:80, marginTop:8, background:'var(--paper,#fff)', border:'1px solid var(--line,#ebe7e3)', borderRadius:14, boxShadow:'0 12px 32px -8px rgba(0,0,0,0.18)', padding:8, minWidth:180, zIndex:300 }}>
          <div style={{ padding:'4px 12px 6px', fontSize:10, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--orange)' }}>Volver a</div>
          {[['es','🇪🇸  Español (original)'],['en','🇬🇧  English']].map(([code, label]) => (
            <button key={code} onClick={() => select(code)}
              style={{ display:'block', width:'100%', textAlign:'left', padding:'8px 12px', border:'none', background:'none', borderRadius:8, fontFamily:'inherit', fontSize:13, fontWeight:700, color:'var(--ink)', cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg,#f8f5f2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              {label}
            </button>
          ))}
          <div style={{ height:1, background:'var(--line,#ebe7e3)', margin:'6px 8px' }}/>
          <div style={{ padding:'4px 12px 6px', fontSize:10, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--ink-soft,#aaa)' }}>Otros idiomas</div>
          {LANG_OPTIONS.map(([code, label]) => (
            <button key={code} onClick={() => select(code)}
              style={{ display:'block', width:'100%', textAlign:'left', padding:'8px 12px', border:'none', background:'none', borderRadius:8, fontFamily:'inherit', fontSize:13, fontWeight:500, color:'var(--ink)', cursor:'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg,#f8f5f2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function NavItem({ label, href, items }) {
  return (
    <div className="nav-item">
      <a href={href}>
        {label}
        {items && <svg className="nav-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>}
      </a>
      {items &&
      <div className="nav-dropdown">
          {items.map((item, i) =>
        <a key={i} href={item.href}>{item.label}</a>
        )}
        </div>
      }
    </div>);

}

function Header({ overDark }) {
  const t = useT();
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [gtLang,  setGtLang]  = useState(() => localStorage.getItem('bpuppy-gt-lang')  || null);
  const [gtLabel, setGtLabel] = useState(() => localStorage.getItem('bpuppy-gt-label') || null);

  // ── Page visibility from SitePublish ──────────────────────────────────────
  const getVis = () => {
    const SP = window.SitePublish;
    if (!SP) return {};
    const r = {};
    SP.REGISTRY.pages.forEach(p => { r[p.id] = SP.isPageLive(p.id); });
    return r;
  };
  const [pv, setPv] = useState(getVis);
  useEffect(() => {
    const h = () => setPv(getVis());
    window.addEventListener('bpuppy:publish', h);
    return () => window.removeEventListener('bpuppy:publish', h);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Auto-detect browser language (first visit only) ───────────────────────
  useEffect(() => {
    if (localStorage.getItem('bpuppy-lang') || localStorage.getItem('bpuppy-gt-lang')) return;
    const navLang = (navigator.language || '').split('-')[0].toLowerCase();
    // Idioma nativo segun el navegador: espanol o ingles (sin Google Translate)
    if (navLang === 'es') { setLang('es'); try { localStorage.setItem('bpuppy-lang','es'); } catch(e){} return; }
    if (navLang === 'en') { setLang('en'); try { localStorage.setItem('bpuppy-lang','en'); } catch(e){} return; }
    const gtCode  = GT_BROWSER[navLang];
    if (!gtCode) return;
    const label = GT_SHORT[gtCode] || navLang.toUpperCase();
    setGtLang(gtCode); setGtLabel(label);
    localStorage.setItem('bpuppy-gt-lang', gtCode);
    localStorage.setItem('bpuppy-gt-label', label);
    setTimeout(() => { if (window.bpTriggerTranslate) window.bpTriggerTranslate(gtCode); }, 1800);
  }, []); // eslint-disable-line

  const applyGtCode = (code) => {
    const label = GT_SHORT[code] || code.toUpperCase();
    setGtLang(code); setGtLabel(label);
    localStorage.setItem('bpuppy-gt-lang', code);
    localStorage.setItem('bpuppy-gt-label', label);
    if (window.bpTriggerTranslate) window.bpTriggerTranslate(code);
  };

  const clearGtCode = () => {
    setGtLang(null); setGtLabel(null);
    localStorage.removeItem('bpuppy-gt-lang');
    localStorage.removeItem('bpuppy-gt-label');
    const sel = document.querySelector('.goog-te-combo');
    if (sel) { sel.value = 'es'; sel.dispatchEvent(new Event('change')); }
  };

  // Idioma nativo: además de setLang, persistir en bpuppy-lang y avisar al resto (ej. el chat) que cambió.
  const applyNativeLang = (code) => {
    setLang(code);
    try { localStorage.setItem('bpuppy-lang', code); } catch(e) {}
    try { window.dispatchEvent(new CustomEvent('bpuppy:lang', { detail: code })); } catch(e) {}
  };

  const handleGtSelect = (code) => {
    if (code === 'es') { clearGtCode(); applyNativeLang('es'); return; }
    if (code === 'en') { clearGtCode(); applyNativeLang('en'); return; }
    applyGtCode(code);
  };

  const handleLeftClick  = () => {
    if (gtLang) { if (window.bpTriggerTranslate) window.bpTriggerTranslate(gtLang); }
    else { clearGtCode(); applyNativeLang('es'); }
  };
  const handleRightClick = () => { clearGtCode(); applyNativeLang('en'); };

  const leftLabel  = gtLabel || 'ES';
  const leftActive = !!gtLang || (!gtLang && lang === 'es');
  const rightActive = lang === 'en' && !gtLang;

  const klass = `hdr ${scrolled ? 'scrolled' : ''} ${overDark && !scrolled ? 'over-dark' : ''}`;

  const cachItems = [
    { label: t(['Conoce las razas', 'Meet the breeds']), href: '/razas' },
    { label: t(['Encuentra tu Match', 'Find Your Match']), href: '/quiz' },
    { label: t(['Solicita tu cachorro ideal', 'Request your ideal puppy']), href: '/solicitud' },
    ...(pv['Cachorros-Entregados'] !== false ? [{ label: t(['Cachorros Entregados', 'Delivered Puppies']), href: '/entregados' }] : []),
    ...(pv['Adopciones'] ? [{ label: t(['Adopciones', 'Adoptions']), href: '/adopciones' }] : []),
  ];
  const gatosItems = [
    { label: t(['Conoce las razas', 'Meet the breeds']), href: '/razas-gatos' },
    ...(pv['Gatos-Entregados'] !== false ? [{ label: t(['Gatos Entregados', 'Delivered Cats']), href: '/gatos-entregados' }] : []),
    ...(pv['Adopciones'] ? [{ label: t(['Adopciones', 'Adoptions']), href: '/adopciones-gatos' }] : []),
  ];
  const mediaItems = [
    { label: t(['B Media', 'B Media']), href: '/media' },
    ...(pv['Blog'] ? [{ label: t(['Blog', 'Blog']), href: '/blog' }] : []),
  ];

  return (
    <header className={klass}>
      <div className="container hdr-row">
        <a href="/" className="hdr-logo" aria-label="BPuppy">
          <img src={overDark && !scrolled ? 'assets/logo-clean-light.webp' : 'assets/logo-clean.webp'} alt="BPuppy logo" />
          <span className="wm notranslate">Bright Puppy</span>
        </a>
        <nav className="nav">
          {pv['Cachorros'] !== false && <NavItem label={t(STRINGS.nav.puppies)} href="/cachorros" items={cachItems}/>}
          {pv['Gatos']     !== false && <NavItem label={t(['Gatos','Cats'])} href="/gatos" items={gatosItems}/>}
          <a href="/financiamiento">{t(['Financiamiento','Financing'])}</a>
          {pv['Tienda']    !== false && <a href="/tienda">{t(['Tienda','Shop'])}</a>}
          {pv['Grooming']  !== false && <a href="/grooming"><span className="notranslate">Grooming</span></a>}
          <NavItem label={<span className="notranslate">Media</span>} href="/media" items={mediaItems.length > 1 ? mediaItems : undefined}/>
          <div className="nav-item">
            <a href="/social" className="nav-social">
              <span style={{ display:'inline-flex', width:7, height:7, borderRadius:'50%', background:'#0EA5E9' }}/>{t(['Social','Social'])}
              <svg className="nav-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </a>
            <div className="nav-dropdown">
              <a href="/nosotros?tab=impacto">{t(['Impacto Social','Social Impact'])}</a>
              <a href="/nosotros?tab=historia">{t(['Nuestra Historia','Our Story'])}</a>
              <a href="/nosotros?tab=equipo">{t(['Nuestro Equipo','Our Team'])}</a>
            </div>
          </div>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <a href="tel:+18084928294" className="hdr-phone" aria-label="Llamar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
          </a>
          <div className="lang" role="group" aria-label="Language">
            <button data-active={leftActive} onClick={handleLeftClick}><span className="notranslate">{leftLabel}</span></button>
            <button data-active={rightActive} onClick={handleRightClick}><span className="notranslate">EN</span></button>
          </div>
          <GlobeDropdown isOverDark={overDark && !scrolled} onLangSelect={handleGtSelect} />
          <AuthControl isOverDark={overDark && !scrolled} />
          <a href="/solicitud" className="hdr-cta">{t(STRINGS.hdr.cta)}</a>
          <button className="hdr-burger" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(o => !o)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="mobile-nav">
          <a href="/social" className="mnav-social" onClick={() => setMenuOpen(false)}><span style={{ display:'inline-flex', width:8, height:8, borderRadius:'50%', background:'#0EA5E9', marginRight:8 }}/>{t(['Social · Comunidad','Social · Community'])}</a>
          {pv['Cachorros'] !== false && <a href="/cachorros" onClick={() => setMenuOpen(false)}>{t(STRINGS.nav.puppies)}</a>}
          {pv['Gatos'] !== false && <a href="/gatos" onClick={() => setMenuOpen(false)}>{t(['Gatos','Cats'])}</a>}
          <a href="/financiamiento" onClick={() => setMenuOpen(false)}>{t(['Financiamiento','Financing'])}</a>
          {pv['Grooming'] !== false && <a href="/grooming" onClick={() => setMenuOpen(false)}><span className="notranslate">Grooming</span></a>}
          <a href="/media" onClick={() => setMenuOpen(false)}><span className="notranslate">Media</span></a>
          <a href="/nosotros?tab=impacto" onClick={() => setMenuOpen(false)}>{t(['Impacto Social','Social Impact'])}</a>
          <a href="/nosotros?tab=historia" onClick={() => setMenuOpen(false)}>{t(['Nuestra Historia','Our Story'])}</a>
          <a href="/nosotros?tab=equipo" onClick={() => setMenuOpen(false)}>{t(['Nuestro Equipo','Our Team'])}</a>
          <div className="mobile-nav-footer">
            <GlobeDropdown isOverDark={false} onLangSelect={handleGtSelect} />
            <a href="tel:+18084928294" className="hdr-phone" aria-label="Llamar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
            </a>
          </div>
        </nav>
      )}
    </header>);

}

function Footer() {
  const t = useT();
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', h, { passive:true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <>
    <footer className="foot notranslate" translate="no">
      <div className="container foot-row">
        <div className="foot-logo">
          <img src="assets/logo-clean.webp" alt="" />
          <span>BPuppy</span>
        </div>
        <p>{t(STRINGS.foot.rights)}</p>
        <div className="foot-links">
          <a href="/garantia">{t(['Garantía', 'Guarantee'])}</a>
          <a href="#">{t(STRINGS.foot.health)}</a>
          <a href="#">{t(STRINGS.foot.privacy)}</a>
          <a href="#">{t(STRINGS.foot.terms)}</a>
        </div>
      </div>
      <div className="container" style={{ marginTop:14, paddingTop:14, borderTop:'1px solid rgba(45,36,33,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <a href="https://maps.google.com/?q=5604+Kalogridis+Rd+Haines+City+FL+33844" target="_blank" rel="noreferrer" style={{ fontSize:13, color:'var(--ink-2)', textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}><path d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg> 5604 Kalogridis Rd, Haines City, FL 33844</a>
        <a href="https://www.google.com/maps?cid=10300429461328700851" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize:13, gap:6, display:'inline-flex', alignItems:'center' }}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}><path d="M12 3l2.5 5.2 5.5.8-4 3.9.9 5.6L12 21l-5.4 2.5L7.5 18l-4-3.9 5.5-.8z"/></svg> {t(['Dejar reseña en Google','Leave a Google review'])}</a>
      </div>
    </footer>
    {show && (
      <button
        onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
        aria-label="Volver arriba"
        style={{
          position:'fixed', bottom:24, right:24, zIndex:998,
          width:44, height:44, borderRadius:'50%',
          background:'var(--orange)', color:'#fff',
          border:'none', cursor:'pointer', fontSize:18,
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 4px 16px rgba(245,130,32,0.4)',
          transition:'opacity .2s, transform .2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform='scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
      >↑</button>
    )}
    </>
  );
}


function PawCursor({ enabled }) {
  const lastRef = useRef({ x: 0, y: 0, t: 0 });
  const containerRef = useRef(null);
  const stepRef = useRef(0);
  useEffect(() => {
    if (!enabled) {
      document.documentElement.style.removeProperty('--app-cursor');
      return;
    }
    document.documentElement.style.setProperty('--app-cursor', 'auto');
    const container = containerRef.current;
    if (!container) return;
    const onMove = (e) => {
      const now = performance.now();
      const last = lastRef.current;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dist = Math.hypot(dx, dy);
      if (now - last.t < 80 || dist < 40) return;
      lastRef.current = { x: e.clientX, y: e.clientY, t: now };
      const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
      // alternate left/right paw offset
      stepRef.current = 1 - stepRef.current;
      const offsetPerp = stepRef.current ? 6 : -6;
      const rad = angle * Math.PI / 180;
      const ox = Math.cos(rad - Math.PI / 2) * offsetPerp;
      const oy = Math.sin(rad - Math.PI / 2) * offsetPerp;
      const paw = document.createElement('div');
      paw.className = 'paw fading';
      paw.style.left = e.clientX + ox + 'px';
      paw.style.top = e.clientY + oy + 'px';
      paw.style.setProperty('--r', angle + 'deg');
      paw.innerHTML = '<svg viewBox="0 0 32 32"><ellipse cx="16" cy="20" rx="7" ry="6"/><ellipse cx="7" cy="12" rx="3" ry="4"/><ellipse cx="25" cy="12" rx="3" ry="4"/><ellipse cx="11" cy="6" rx="2.5" ry="3.5"/><ellipse cx="21" cy="6" rx="2.5" ry="3.5"/></svg>';
      container.appendChild(paw);
      setTimeout(() => paw.remove(), 1300);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled]);
  return <div ref={containerRef} aria-hidden="true" />;
}

// Reveal on scroll hook
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {if (e.isIntersecting) {e.target.classList.add('in');io.unobserve(e.target);}});
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

// ── Coming Soon page ──────────────────────────────────────────────────────────
function ComingSoon({ pageName }) {
  return (
    <div style={{
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      background:'var(--bg,#FAFAF8)', padding:'40px 24px', textAlign:'center',
    }}>
      <div style={{ maxWidth:480 }}>
        <div style={{
          fontFamily:'var(--display,Bricolage Grotesque,sans-serif)',
          fontSize:'clamp(72px,14vw,140px)', fontWeight:800,
          letterSpacing:'-0.04em', lineHeight:1,
          color:'transparent', WebkitTextStroke:'2px rgba(45,36,33,0.07)',
          marginBottom:28, userSelect:'none',
        }}>Pronto</div>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--orange,#FF5520)', marginBottom:14 }}>
          En preparación
        </div>
        <h1 style={{
          fontFamily:'var(--display)', fontSize:'clamp(22px,3.5vw,38px)',
          fontWeight:700, letterSpacing:'-0.02em', margin:'0 0 14px',
          color:'var(--ink,#2D2421)',
        }}>
          {pageName ? `${pageName} llega pronto` : 'Esta página está en preparación'}
        </h1>
        <p style={{ color:'var(--ink-2,#6B5A4E)', lineHeight:1.65, marginBottom:32, fontSize:15 }}>
          Estamos trabajando para traerte la mejor experiencia. Gracias por tu paciencia.
        </p>
        <a href="/" style={{
          display:'inline-flex', alignItems:'center', gap:8,
          background:'var(--orange,#FF5520)', color:'#fff',
          fontWeight:700, fontSize:14, padding:'13px 26px',
          borderRadius:999, textDecoration:'none',
          boxShadow:'0 8px 24px -8px rgba(255,85,32,0.38)',
        }}>← Volver al inicio</a>
      </div>
    </div>
  );
}

// ── Hook: reads page live-state from SitePublish, re-renders on changes ───────
function useSitePublish(pageId) {
  const [isLive, setIsLive] = React.useState(
    () => window.SitePublish ? window.SitePublish.isPageLive(pageId) : true
  );
  React.useEffect(() => {
    const h = () => setIsLive(window.SitePublish ? window.SitePublish.isPageLive(pageId) : true);
    window.addEventListener('bpuppy:publish', h);
    return () => window.removeEventListener('bpuppy:publish', h);
  }, [pageId]);
  return isLive;
}

Object.assign(window, { Header, Footer, PawCursor, useReveal, ComingSoon, useSitePublish });