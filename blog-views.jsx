// blog-views.jsx — Blog listing + article reader

const { useState, useEffect, useRef, useMemo } = React;

// ── Reading progress bar ───────────────────────────────────────────────────────
function ReadingBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 200, background: 'var(--line,#f0e8e0)' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: 'var(--orange,#F58220)', transition: 'width .1s linear' }} />
    </div>
  );
}

// ── Article image / gradient header ───────────────────────────────────────────
function ArticleHero({ art, compact = false }) {
  const h = compact ? 200 : 420;
  const cat = CAT_META[art.cat] || {};
  if (art.img) {
    return (
      <div style={{ position: 'relative', height: h, overflow: 'hidden', borderRadius: compact ? '16px 16px 0 0' : 0 }}>
        <img src={art.img} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: compact ? 'linear-gradient(to bottom,rgba(0,0,0,0.02),rgba(0,0,0,0.44))' : 'linear-gradient(to bottom,rgba(0,0,0,0.04),rgba(0,0,0,0.55))' }} />
        {compact && (
          <div style={{ position: 'absolute', top: 12, left: 12 }}>
            <CatPill cat={art.cat} />
          </div>
        )}
      </div>
    );
  }
  // SVG gradient header
  return (
    <div style={{ position: 'relative', height: h, borderRadius: compact ? '16px 16px 0 0' : 0, overflow: 'hidden', background: `linear-gradient(135deg, ${art.color}22 0%, ${art.color}44 100%)` }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: compact ? 56 : 96, lineHeight: 1, filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.12))' }}>{art.emoji}</div>
        {!compact && <div style={{ fontSize: 13, fontWeight: 700, color: art.color, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.8 }}>{CAT_META[art.cat]?.label}</div>}
      </div>
      {compact && (
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <CatPill cat={art.cat} />
        </div>
      )}
      {/* subtle pattern */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07 }} viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
        {[0,40,80,120,160,200,240,280,320,360,400].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke={art.color} strokeWidth="1"/>)}
        {[0,40,80,120,160,200].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke={art.color} strokeWidth="1"/>)}
      </svg>
    </div>
  );
}

// ── Category pill ──────────────────────────────────────────────────────────────
function CatPill({ cat, small }) {
  const m = CAT_META[cat] || { label: cat, color: '#888', bg: '#eee' };
  return (
    <span style={{ display: 'inline-block', padding: small ? '2px 8px' : '4px 12px', borderRadius: 999, background: m.bg, color: m.color, fontSize: small ? 10 : 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
      {m.label}
    </span>
  );
}

// ── Article card ───────────────────────────────────────────────────────────────
function ArticleCard({ art, onClick, featured }) {
  const [hov, setHov] = useState(false);
  return (
    <article
      onClick={() => onClick(art)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: 'var(--paper,#fff)', borderRadius: 20, overflow: 'hidden', cursor: 'pointer', boxShadow: hov ? '0 16px 48px -12px rgba(45,36,33,0.22)' : '0 2px 16px -4px rgba(45,36,33,0.10)', transform: hov ? 'translateY(-3px)' : 'none', transition: 'all .22s ease', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0 }}>
        <ArticleHero art={art} compact={true} />
      </div>
      <div style={{ padding: featured ? '20px 24px 24px' : '16px 18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          {!art.img && <CatPill cat={art.cat} />}
          <span style={{ fontSize: 11, color: 'var(--ink-2,#6B5A4E)', marginLeft: 'auto' }}>⏱ {art.read} min</span>
        </div>
        <h3 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: featured ? 22 : 17, fontWeight: 700, color: 'var(--ink,#2D2421)', lineHeight: 1.25, letterSpacing: '-0.02em', margin: '0 0 8px', textWrap: 'pretty' }}>
          {art.title}
        </h3>
        <p style={{ fontSize: 13.5, color: 'var(--ink-2,#6B5A4E)', lineHeight: 1.6, margin: '0 0 14px', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {art.lead}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11.5, color: 'var(--ink-soft)', fontWeight: 500 }}>{art.date}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--orange,#F58220)', display: 'flex', alignItems: 'center', gap: 4 }}>
            Leer
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    </article>
  );
}

// ── Blog listing ───────────────────────────────────────────────────────────────
function BlogListing({ onSelect }) {
  const [cat, setCat] = useState('todos');
  const [q, setQ] = useState('');
  const inputRef = useRef();

  const filtered = useMemo(() => {
    let list = cat === 'todos' ? BLOG : BLOG.filter(a => a.cat === cat);
    if (q.trim()) {
      const lq = q.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(lq) ||
        a.lead.toLowerCase().includes(lq) ||
        (a.tags || []).some(t => t.toLowerCase().includes(lq))
      );
    }
    return list;
  }, [cat, q]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg,#FFF5EB)' }}>
      {/* Hero */}
      <div style={{ background: 'var(--paper,#fff)', borderBottom: '1px solid var(--line)', paddingTop: 100 }}>
        <div className="container" style={{ paddingBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 28 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>BPuppy · Blog</div>
              <h1 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 'clamp(36px,6vw,64px)', fontWeight: 800, letterSpacing: '-0.035em', color: 'var(--ink)', margin: 0, lineHeight: 0.95 }}>
                Todo sobre <em style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--orange)' }}>perros</em><br />que vale la pena leer
              </h1>
            </div>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', maxWidth: 340, lineHeight: 1.65, margin: 0 }}>
              Guías prácticas, historias inspiradoras y todo lo que necesitas saber para vivir bien con tu perro.
            </p>
          </div>
          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 480 }}>
            <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              ref={inputRef}
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Buscar artículos..."
              style={{ width: '100%', padding: '13px 16px 13px 44px', borderRadius: 14, border: '1.5px solid var(--line)', background: 'var(--bg)', fontFamily: 'inherit', fontSize: 15, color: 'var(--ink)', outline: 'none', transition: 'border-color .15s' }}
              onFocus={e => e.target.style.borderColor = 'var(--orange)'}
              onBlur={e => e.target.style.borderColor = 'var(--line)'}
            />
            {q && (
              <button onClick={() => setQ('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-2)', fontSize: 18, lineHeight: 1 }}>×</button>
            )}
          </div>
        </div>
        {/* Category bar */}
        <div style={{ borderTop: '1px solid var(--line)', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <div className="container" style={{ display: 'flex', gap: 4, padding: '10px 0' }}>
            {BLOG_CATS.map(c => {
              const m = c === 'todos' ? { label: 'Todos', color: 'var(--orange)', bg: 'rgba(245,130,32,0.1)' } : CAT_META[c];
              const active = cat === c;
              return (
                <button key={c} onClick={() => setCat(c)} style={{ padding: '7px 16px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: active ? 700 : 500, whiteSpace: 'nowrap', background: active ? m.color : 'transparent', color: active ? '#fff' : 'var(--ink-2)', transition: 'all .15s' }}>
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 0 80px' }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink-2)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🐾</div>
            <p style={{ fontSize: 16 }}>No se encontraron artículos para "<strong>{q}</strong>"</p>
          </div>
        )}

        {/* Featured */}
        {featured && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Destacado</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: 0, background: 'var(--paper)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 32px -8px rgba(45,36,33,0.14)', cursor: 'pointer' }} onClick={() => onSelect(featured)}>
              <div style={{ minHeight: 320 }}>
                <ArticleHero art={featured} compact={false} />
              </div>
              <div style={{ padding: '36px 36px 36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CatPill cat={featured.cat} />
                <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 'clamp(20px,2.4vw,28px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)', margin: '16px 0 12px', lineHeight: 1.18, textWrap: 'pretty' }}>{featured.title}</h2>
                <p style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.65, margin: '0 0 24px', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{featured.lead}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{featured.date} · {featured.read} min</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 999, background: 'var(--orange)', color: '#fff', fontSize: 13, fontWeight: 700, marginLeft: 'auto' }}>
                    Leer artículo
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 24 }}>
            {rest.map(art => <ArticleCard key={art.id} art={art} onClick={onSelect} />)}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Article reader ─────────────────────────────────────────────────────────────
function ArticleReader({ art, onBack }) {
  const related = useMemo(() =>
    BLOG.filter(a => a.id !== art.id && (a.cat === art.cat || (a.tags || []).some(t => (art.tags || []).includes(t)))).slice(0, 3)
  , [art]);

  useEffect(() => { window.scrollTo(0, 0); }, [art.id]);

  const cat = CAT_META[art.cat] || {};

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <ReadingBar />

      {/* Full-width hero */}
      <div style={{ position: 'relative' }}>
        <ArticleHero art={art} compact={false} />
        {/* Back button */}
        <button onClick={onBack} style={{ position: 'absolute', top: 80, left: 24, display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.92)', border: 'none', borderRadius: 999, padding: '8px 16px 8px 12px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 700, color: 'var(--ink)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 12px rgba(0,0,0,0.12)', zIndex: 10 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Blog
        </button>
        {/* Cat pill on dark images */}
        {art.img && (
          <div style={{ position: 'absolute', bottom: 28, left: 28 }}>
            <CatPill cat={art.cat} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="container" style={{ maxWidth: 760, padding: '48px 24px 80px' }}>
        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
          <CatPill cat={art.cat} />
          <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{art.date}</span>
          <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>·</span>
          <span style={{ fontSize: 12, color: 'var(--ink-soft)' }}>⏱ {art.read} min de lectura</span>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 'clamp(28px,5vw,46px)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)', margin: '0 0 12px', lineHeight: 1.1, textWrap: 'pretty' }}>
          {art.title}
        </h1>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', margin: '0 0 36px', fontWeight: 500 }}>{art.sub}</p>

        {/* Tags */}
        {art.tags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 36 }}>
            {art.tags.map(t => (
              <span key={t} style={{ padding: '4px 12px', borderRadius: 999, background: 'var(--paper)', border: '1px solid var(--line)', fontSize: 12, color: 'var(--ink-2)', fontWeight: 500 }}>#{t}</span>
            ))}
          </div>
        )}

        {/* Lead */}
        <p style={{ fontSize: 19, lineHeight: 1.7, color: 'var(--ink)', margin: '0 0 40px', fontWeight: 500, borderLeft: `3px solid ${art.color || 'var(--orange)'}`, paddingLeft: 20 }}>
          {art.lead}
        </p>

        {/* Sections */}
        {(art.body || []).map((s, i) => (
          <div key={i} style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink)', margin: '0 0 10px' }}>
              {s.h}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--ink-2)', margin: 0 }}>{s.p}</p>
          </div>
        ))}

        {/* Stat callout */}
        {art.stat && (
          <div style={{ margin: '40px 0', padding: '24px 28px', borderRadius: 18, background: `${art.color || 'var(--orange)'}12`, borderLeft: `4px solid ${art.color || 'var(--orange)'}` }}>
            <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: art.color || 'var(--orange)', marginBottom: 8 }}>Dato importante</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, color: 'var(--ink)', margin: 0, fontWeight: 500 }}>{art.stat}</p>
          </div>
        )}

        {/* Tips */}
        {art.tips?.length > 0 && (
          <div style={{ margin: '36px 0', padding: '24px 28px', borderRadius: 18, background: 'var(--paper)', boxShadow: '0 2px 16px rgba(45,36,33,0.07)' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink)', marginBottom: 14 }}>💡 Consejos prácticos</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {art.tips.map((tip, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-2)' }}>
                  <span style={{ color: art.color || 'var(--orange)', fontWeight: 700, flexShrink: 0 }}>→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Closing */}
        {art.close && (
          <p style={{ fontSize: 16.5, lineHeight: 1.75, color: 'var(--ink)', margin: '32px 0 0', fontStyle: 'italic', fontFamily: 'Instrument Serif, Georgia, serif' }}>
            {art.close}
          </p>
        )}

        {/* Share */}
        <div style={{ margin: '48px 0 0', padding: '24px', borderRadius: 16, background: 'var(--paper)', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', boxShadow: '0 1px 8px rgba(45,36,33,0.06)' }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginRight: 'auto' }}>¿Te fue útil? Compártelo</span>
          {[
            { label: 'WhatsApp', color: '#25D366', icon: '💬' },
            { label: 'Facebook', color: '#1877F2', icon: '📘' },
            { label: 'Copiar link', color: 'var(--ink)', icon: '🔗' },
          ].map(s => (
            <button key={s.label} style={{ padding: '8px 16px', borderRadius: 10, border: 'none', background: 'var(--bg)', color: 'var(--ink-2)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)', padding: '48px 0 64px' }}>
          <div className="container">
            <h3 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', margin: '0 0 24px' }}>Artículos relacionados</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20 }}>
              {related.map(a => <ArticleCard key={a.id} art={a} onClick={onBack.constructor === Function ? () => {} : onBack} featured={false} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main blog app component ────────────────────────────────────────────────────
function BlogApp({ initialArtId }) {
  const [selected, setSelected] = useState(() =>
    initialArtId ? (BLOG.find(a => a.id === initialArtId) || null) : null
  );

  // SEO: title/description/canonical dinamicos segun el articulo abierto
  useEffect(() => {
    const set = (sel, attr, val) => { const m = document.querySelector(sel); if (m) m.setAttribute(attr, val); };
    if (selected) {
      const desc = (selected.sub || selected.lead || '').slice(0, 158);
      document.title = selected.title + ' | BPuppy';
      set('meta[name="description"]', 'content', desc);
      set('meta[property="og:title"]', 'content', selected.title + ' | BPuppy');
      set('meta[property="og:description"]', 'content', desc);
      set('link[rel="canonical"]', 'href', 'https://bpuppy.us/blog?art=' + selected.id);
      set('meta[property="og:url"]', 'content', 'https://bpuppy.us/blog?art=' + selected.id);
    } else {
      document.title = 'Blog de Mascotas: Cuidado, Razas y Salud | BPuppy';
      set('link[rel="canonical"]', 'href', 'https://bpuppy.us/blog');
      set('meta[property="og:url"]', 'content', 'https://bpuppy.us/blog');
    }
  }, [selected]);

  const handleSelect = (art) => {
    setSelected(art);
    window.scrollTo({ top: 0 });
  };

  const handleBack = () => {
    setSelected(null);
    window.scrollTo({ top: 0 });
  };

  if (selected) {
    return <ArticleReader art={selected} onBack={handleBack} />;
  }
  return <BlogListing onSelect={handleSelect} />;
}

Object.assign(window, { BlogApp, BlogListing, ArticleReader, ArticleCard, ArticleHero, CatPill, ReadingBar });
