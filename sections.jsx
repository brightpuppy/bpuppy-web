// sections.jsx — About, Promise, InstagramFeed, FamiliesMap, FAQ

/* ─────────── About / Quiénes somos ─────────── */
function About() {
  const t = useT();
  const S = STRINGS.about;
  return (
    <section className="sec about" id="about">
      <div className="container about-grid">
        <div className="about-copy reveal">
          <div className="eyebrow">{t(S.eyebrow)}</div>
          <h2 className="display about-title">
            {t(S.title_a)} <em className="serif-italic">{t(S.title_b)}</em> {t(S.title_c)}
          </h2>
          <p className="about-lead">{t(S.sub)}</p>
          <p className="about-p">{t(S.p1)}</p>
          <div className="about-stats">
            {[['s1n', 's1l'], ['s2n', 's2l'], ['s4n', 's4l']].map(([n, l]) =>
            <div key={n} className="about-stat">
                <div className="about-stat-n display">{t(S[n])}</div>
                <div className="about-stat-l">{t(S[l])}</div>
              </div>
            )}
          </div>
          <a href="Historia.html" className="btn btn-dark" style={{ marginTop: 28 }}>
            {t(['Conocer más sobre nuestra historia', 'Learn more about our story'])}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </a>
        </div>

        <div className="about-video reveal">
          <div className="about-video-frame" style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '9/16', position: 'relative', maxWidth: 340, margin: '0 auto', boxShadow: '0 12px 48px rgba(0,0,0,0.14)' }}>
            <iframe
              src="https://www.youtube.com/embed/YImasdUtIrI?rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=es"
              title="Quiénes somos — BPuppy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </section>);

}

/* ─────────── Promise / Compromiso ─────────── */
function Promise_() {
  const t = useT();
  const S = STRINGS.promise;
  return (
    <section className="sec promise" id="promise">
      <div className="container">
        <div className="sec-head reveal">
          <div>
            <div className="eyebrow" style={{ color: "rgb(245, 130, 32)" }}>{t(S.eyebrow)}</div>
            <h2 className="display">
              {t(S.title_a)} <em className="serif-italic">{t(S.title_b)}</em>
            </h2>
          </div>
          <p>{t(S.sub)}</p>
        </div>
        <div className="promise-grid">
          {S.pillars.map((p, i) =>
          <div key={i} className="promise-card reveal" style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="promise-num">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="promise-t">{t(p.t)}</h3>
              <p className="promise-d">{t(p.d)}</p>
            </div>
          )}
        </div>

      </div>
    </section>);

}

/* ─────────── Instagram feed ─────────── */
const IG_PHOTOS = [
'fotos-raw/p01.jpg', 'fotos-raw/p02.jpg', 'fotos-raw/p03.jpg',
'fotos-raw/p04.jpg', 'fotos-raw/p05.jpg', 'fotos-raw/p07.jpg',
'fotos-raw/p08.jpg', 'fotos-raw/p09.jpg'];


function InstagramFeed() {
  React.useEffect(() => {
    const d = document;
    if (!d.querySelector('script[src="https://w.behold.so/widget.js"]')) {
      const s = d.createElement('script');
      s.type = 'module'; s.src = 'https://w.behold.so/widget.js'; d.head.append(s);
    }
  }, []);

  const t = useT();
  const S = STRINGS.ig;
  return (
    <section className="sec ig" id="instagram">
      <div className="container">
        <div className="sec-head reveal">
          <div>
            <div className="eyebrow">{t(S.eyebrow)}</div>
            <h2 className="display">
              {t(S.title_a)} <em className="serif-italic">{t(S.title_b)}</em>
            </h2>
          </div>
          <p>{t(S.sub)}</p>
        </div>
        <behold-widget feed-id="I1sGxevsYp04jFScVaVy"></behold-widget>
        <div className="ig-cta reveal" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="https://instagram.com/bpuppy.us" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ gap: 8 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 7.5h.01" /><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /></svg>
            Instagram · @bpuppy.us
          </a>
          <a href="https://www.tiktok.com/@bpuppy.us" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ gap: 8 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.84 1.54V6.78a4.85 4.85 0 01-1.07-.09z" /></svg>
            TikTok · @bpuppy.us
          </a>
          <a href="https://youtube.com/@bpuppy" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ gap: 8 }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>
            YouTube · @bpuppy
          </a>
        </div>
      </div>
    </section>);

}

/* ─────────── Families Map ─────────── */
// Approximate normalized US-map dot positions (x: 0–100 left-to-right, y: 0–100 top-to-bottom).
const FAM_DOTS = [
{ x: 19, y: 38, year: 2024, name: 'Seattle, WA' },
{ x: 14, y: 50, year: 2024, name: 'Portland, OR' },
{ x: 14, y: 60, year: 2025, name: 'San Francisco, CA' },
{ x: 18, y: 70, year: 2025, name: 'Los Angeles, CA' },
{ x: 28, y: 64, year: 2024, name: 'Las Vegas, NV' },
{ x: 32, y: 70, year: 2025, name: 'Phoenix, AZ' },
{ x: 40, y: 50, year: 2024, name: 'Denver, CO' },
{ x: 50, y: 75, year: 2025, name: 'Houston, TX' },
{ x: 47, y: 70, year: 2024, name: 'Dallas, TX' },
{ x: 55, y: 50, year: 2024, name: 'Kansas City, MO' },
{ x: 62, y: 40, year: 2025, name: 'Chicago, IL' },
{ x: 60, y: 70, year: 2025, name: 'Nashville, TN' },
{ x: 67, y: 78, year: 2024, name: 'Atlanta, GA' },
{ x: 78, y: 88, year: 2025, name: 'Miami, FL' },
{ x: 76, y: 80, year: 2024, name: 'Orlando, FL' },
{ x: 80, y: 60, year: 2025, name: 'Charlotte, NC' },
{ x: 86, y: 48, year: 2024, name: 'Washington, DC' },
{ x: 88, y: 38, year: 2025, name: 'New York, NY' },
{ x: 92, y: 32, year: 2024, name: 'Boston, MA' },
{ x: 84, y: 42, year: 'next', name: 'Philadelphia, PA' },
{ x: 30, y: 82, year: 'next', name: 'San Antonio, TX' },
{ x: 70, y: 62, year: 'next', name: 'Raleigh, NC' }];


function FamiliesMap() {
  const t = useT();
  const S = STRINGS.fmap;
  const [active, setActive] = React.useState(null);
  return (
    <section className="sec fmap" id="map">
      <div className="container">
        <div className="sec-head reveal">
          <div>
            <div className="eyebrow">{t(S.eyebrow)}</div>
            <h2 className="display">
              {t(S.title_a)} <em className="serif-italic">{t(S.title_b)}</em>
            </h2>
          </div>
          <p>{t(S.sub)}</p>
        </div>

        <div className="fmap-card reveal">
          <div className="fmap-stage">
            <svg className="fmap-bg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              {/* Stylized US silhouette — soft shape, not geographic accuracy */}
              <defs>
                <linearGradient id="fmGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.18" />
                </linearGradient>
              </defs>
              <path
                d="M 80 230 Q 110 180 170 175 Q 220 165 260 200 Q 305 175 340 195 Q 380 170 420 190 Q 470 165 510 195 Q 560 170 610 200 Q 660 180 720 210 Q 780 200 830 240 Q 880 270 905 320 Q 920 360 905 400 Q 890 440 850 470 Q 800 500 740 510 Q 680 525 620 520 Q 560 535 500 525 Q 440 540 380 525 Q 320 530 265 510 Q 210 495 165 460 Q 120 425 95 380 Q 70 330 80 280 Z"
                fill="url(#fmGrad)" stroke="var(--ink)" strokeOpacity="0.10" strokeWidth="1.5" />
              
              {/* faint state dividers */}
              <g stroke="var(--ink)" strokeOpacity="0.05" strokeWidth="1" fill="none">
                <path d="M 280 200 L 300 510" />
                <path d="M 430 195 L 440 530" />
                <path d="M 560 200 L 560 525" />
                <path d="M 700 215 L 720 515" />
                <path d="M 100 320 L 900 350" />
              </g>
            </svg>

            {FAM_DOTS.map((d, i) => {
              const cls = d.year === 'next' ? 'next' : d.year === 2025 ? 'y25' : 'y24';
              return (
                <button
                  key={i}
                  type="button"
                  className={`fmap-dot fmap-dot-${cls} ${active === i ? 'is-active' : ''}`}
                  style={{ left: `${d.x}%`, top: `${d.y}%`, animationDelay: `${i * 0.12}s` }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  aria-label={d.name}>
                  
                  <span className="fmap-pulse"></span>
                  <span className="fmap-tooltip">{d.name}</span>
                </button>);

            })}
          </div>

          <div className="fmap-legend">
            <span className="fmap-leg-item"><span className="fmap-sw fmap-sw-y24"></span>{t(S.legend1)}</span>
            <span className="fmap-leg-item"><span className="fmap-sw fmap-sw-y25"></span>{t(S.legend2)}</span>
            <span className="fmap-leg-item"><span className="fmap-sw fmap-sw-next"></span>{t(S.legend3)}</span>
          </div>
        </div>
      </div>
    </section>);

}

/* ─────────── FAQ ─────────── */
function FAQ() {
  const t = useT();
  const S = STRINGS.faq;
  const [open, setOpen] = React.useState(0);
  return (
    <section className="sec faq" id="faq">
      <div className="container">
        <div className="sec-head reveal">
          <div>
            <div className="eyebrow">{t(S.eyebrow)}</div>
            <h2 className="display">
              {t(S.title_a)} <em className="serif-italic">{t(S.title_b)}</em>
            </h2>
          </div>
          <p>{t(S.sub)}</p>
        </div>

        <div className="faq-list reveal">
          {S.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="faq-q"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}>
                  
                  <span className="faq-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="faq-q-text">{t(it.q)}</span>
                  <span className="faq-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
                <div className="faq-a-wrap">
                  <div className="faq-a">{t(it.a)}</div>
                </div>
              </div>);

          })}
        </div>
      </div>
    </section>);

}

Object.assign(window, { About, Promise_, InstagramFeed, FamiliesMap, FAQ });