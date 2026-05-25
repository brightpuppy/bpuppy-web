// hero.jsx — Hero section with video background

function Hero() {
  const t = useT();
  const videoRef = React.useRef();
  React.useEffect(() => { if (videoRef.current) videoRef.current.muted = true; }, []);
  return (
    <section className="hero" id="top">
      <video
        ref={videoRef}
        className="hero-video"
        aria-hidden="true"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="uploads/Family LR.mp4" type="video/mp4" />
      </video>
      <div className="hero-veil" />
      <div className="hero-grain" />

      <div className="float-pills" aria-hidden="true">
        <div className="float-pill">
          <div className="av">🐶</div>
          <div>
            <div>{t(STRINGS.hero.pill1n)}</div>
            <div className="meta">{t(STRINGS.hero.pill1m)}</div>
          </div>
        </div>
        <div className="float-pill">
          <div className="av">🐕</div>
          <div>
            <div>{t(STRINGS.hero.pill2n)}</div>
            <div className="meta">{t(STRINGS.hero.pill2m)}</div>
          </div>
        </div>
        <div className="float-pill">
          <div className="av">🦴</div>
          <div>
            <div>{t(STRINGS.hero.pill3n)}</div>
            <div className="meta">{t(STRINGS.hero.pill3m)}</div>
          </div>
        </div>
      </div>

      <div className="container hero-inner">
        <div>
          <div className="hero-eyebrow">
            <span className="live">{t(STRINGS.hero.live)}</span>
            <span className="dot" />
            {t(STRINGS.hero.eyebrow)}
          </div>
          <h1>
            {t(STRINGS.hero.title_a)}{' '}
            <em>{t(STRINGS.hero.title_b)}</em>{' '}
            {t(STRINGS.hero.title_c)}
          </h1>
          <p className="sub">{t(STRINGS.hero.sub)}</p>
          <div className="hero-cta-row">
            <a href="/solicitud" className="btn btn-primary">
              {t(STRINGS.hero.cta1)}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <a href="#quiz" className="btn btn-ghost">{t(STRINGS.hero.cta2)}</a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <div className="n">{t(STRINGS.hero.stat1n)}</div>
            <div className="l">{t(STRINGS.hero.stat1l)}</div>
          </div>
          <div className="stat">
            <div className="n">{t(STRINGS.hero.stat2n)}</div>
            <div className="l">{t(STRINGS.hero.stat2l)}</div>
          </div>
          <div className="stat">
            <div className="n">★ {t(STRINGS.hero.stat3n)}</div>
            <div className="l">{t(STRINGS.hero.stat3l)}</div>
          </div>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        {t(STRINGS.hero.scroll)}
        <div className="line" />
      </div>
    </section>
  );
}

Object.assign(window, { Hero });
