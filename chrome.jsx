// chrome.jsx — Header, Footer, Paw cursor

const { useState, useEffect, useRef, useCallback } = React;

const LANG_OPTIONS = [
  ['fr','Français'],['pt','Português'],['de','Deutsch'],['it','Italiano'],
  ['zh-CN','中文'],['ja','日本語'],['ko','한국어'],['ar','العربية'],
  ['ru','Русский'],['hi','हिन्दी'],['tr','Türkçe'],['th','ไทย'],['vi','Tiếng Việt'],
];

function GlobeDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);
  return (
    <div ref={ref} style={{ position:'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        title="More languages"
        style={{ display:'flex', alignItems:'center', gap:4, padding:'5px 8px', borderRadius:999, background: open ? 'rgba(45,36,33,0.1)' : 'none', border:'none', cursor:'pointer', color:'var(--ink-2)', fontFamily:'inherit', fontWeight:700, fontSize:11, letterSpacing:'0.04em', transition:'background .15s' }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = 'rgba(45,36,33,0.07)'; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'none'; }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      </button>
      {open && (
        <div style={{ position:'fixed', top:'auto', right:160, marginTop:8, background:'var(--paper,#fff)', border:'1px solid var(--line,#ebe7e3)', borderRadius:14, boxShadow:'0 12px 32px -8px rgba(0,0,0,0.15)', padding:8, minWidth:160, zIndex:300 }}>
          <div style={{ position:'absolute', top:-1, right:0, width:'100%', height:8 }}/>
          {LANG_OPTIONS.map(([code, label]) => (
            <button key={code}
              onClick={() => { if (window.bpTriggerTranslate) window.bpTriggerTranslate(code); setOpen(false); }}
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

  const klass = `hdr ${scrolled ? 'scrolled' : ''} ${overDark && !scrolled ? 'over-dark' : ''}`;

  const cachItems = [
    { label: t(['Ver disponibles', 'See available']), href: 'Cachorros.html' },
    { label: t(['Conoce las razas', 'Meet the breeds']), href: 'Razas-Perros.html' },
    { label: t(['Encuentra tu Match', 'Find Your Match']), href: 'Quiz-Completo.html' },
    { label: t(['Solicita tu cachorro ideal', 'Request your ideal puppy']), href: 'Solicitud.html' },
    { label: t(['Cachorros Entregados', 'Delivered Puppies']), href: 'Cachorros-Entregados.html' },
    ...(pv['Adopciones'] ? [{ label: t(['Adopciones', 'Adoptions']), href: 'Adopciones.html' }] : []),
  ];
  const gatosItems = [
    { label: t(['Ver disponibles', 'See available']), href: 'Gatos.html' },
    { label: t(['Conoce las razas', 'Meet the breeds']), href: 'Razas-Gatos.html' },
    { label: t(['Gatos Entregados', 'Delivered Cats']), href: 'Gatos-Entregados.html' },
    ...(pv['Adopciones'] ? [{ label: t(['Adopciones', 'Adoptions']), href: 'Adopciones.html' }] : []),
  ];
  const mediaItems = [
    { label: t(['B Media', 'B Media']), href: 'Media.html' },
    ...(pv['Blog'] ? [{ label: t(['Blog', 'Blog']), href: 'Blog.html' }] : []),
  ];

  return (
    <header className={klass}>
      <div className="container hdr-row">
        <a href="#top" className="hdr-logo" aria-label="BPuppy">
          <img src={overDark && !scrolled ? 'assets/logo-clean-light.png' : 'assets/logo-clean.png'} alt="BPuppy logo" />
          <span className="wm">Bright Puppy</span>
        </a>
        <nav className="nav">
          <a href="Home.html">{t(['Inicio', 'Home'])}</a>
          {pv['Cachorros'] !== false && <NavItem label={t(STRINGS.nav.puppies)} href="Cachorros.html" items={cachItems}/>}
          {pv['Gatos']     !== false && <NavItem label={t(['Gatos','Cats'])} href="Gatos.html" items={gatosItems}/>}
          {pv['Tienda']    !== false && <a href="Tienda.html">{t(['Tienda','Shop'])}</a>}
          {pv['Grooming']  !== false && <a href="Grooming.html">{t(['Grooming','Grooming'])}</a>}
          <NavItem label={t(['Media','Media'])} href="Media.html" items={mediaItems.length > 1 ? mediaItems : undefined}/>
          {pv['Nosotros']  !== false && <NavItem label={t(['Nosotros','About'])} href="Nosotros.html" items={[
            { label: t(['Nuestra Historia','Our Story']),    href:'Nosotros.html' },
            { label: t(['Impacto Social','Social Impact']),  href:'Nosotros.html' },
            { label: t(['Nuestro Equipo','Our Team']),       href:'Nosotros.html' },
          ]}/>}
          {pv['Social']    !== false && <a href="Social.html">{t(['Social','Social'])}</a>}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="tel:+18084928294" className="hdr-phone" aria-label="Llamar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
          </a>
          <div className="lang" role="group" aria-label="Language">
            <button data-active={lang === 'es'} onClick={() => setLang('es')}>ES</button>
            <button data-active={lang === 'en'} onClick={() => setLang('en')}>EN</button>
          </div>
          <GlobeDropdown />
          <a href="Cachorros.html" className="hdr-cta">{t(STRINGS.hdr.cta)}</a>
        </div>
      </div>
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
    <footer className="foot">
      <div className="container foot-row">
        <div className="foot-logo">
          <img src="assets/logo-clean.png" alt="" />
          <span>BPuppy</span>
        </div>
        <p>{t(STRINGS.foot.rights)}</p>
        <div className="foot-links">
          <a href="Garantia.html">{t(['Garantía', 'Guarantee'])}</a>
          <a href="#">{t(STRINGS.foot.health)}</a>
          <a href="#">{t(STRINGS.foot.privacy)}</a>
          <a href="#">{t(STRINGS.foot.terms)}</a>
        </div>
      </div>
      <div className="container" style={{ marginTop:14, paddingTop:14, borderTop:'1px solid rgba(45,36,33,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <a href="https://maps.google.com/?q=5604+Kalogridis+Rd+Haines+City+FL+33844" target="_blank" rel="noreferrer" style={{ fontSize:13, color:'var(--ink-2)', textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}>
          📍 5604 Kalogridis Rd, Haines City, FL 33844
        </a>
        <a href="https://www.google.com/maps?cid=10300429461328700851" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize:13, gap:6 }}>
          ⭐ {t(['Dejar reseña en Google', 'Leave a Google review'])}
        </a>
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
        <a href="Home.html" style={{
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