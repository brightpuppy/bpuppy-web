// gallery.jsx — Happy families marquee + testimonials + final CTA

// Real family photos — 50 uploaded images
const GALLERY_PHOTOS = [
  'uploads/1A.webp','uploads/2.webp','uploads/3.webp','uploads/4.webp','uploads/5.webp',
  'uploads/6.webp','uploads/7.webp','uploads/8.webp','uploads/9.jpg','uploads/10.webp',
  'uploads/11.webp','uploads/12.webp','uploads/13.webp','uploads/14.webp','uploads/15.webp',
  'uploads/16.webp','uploads/17.webp','uploads/18.webp','uploads/19.webp','uploads/20.webp',
  'uploads/21.webp','uploads/22.webp','uploads/23.webp','uploads/24.webp','uploads/25.webp',
  'uploads/26.webp','uploads/27.webp','uploads/28.webp','uploads/29.webp','uploads/30.webp',
  'uploads/31.webp','uploads/32.webp','uploads/33.webp','uploads/34.webp','uploads/35.webp',
  'uploads/36.webp','uploads/37.webp','uploads/38.webp','uploads/39.webp','uploads/40.webp',
  'uploads/41.webp','uploads/42.webp','uploads/43.webp','uploads/44.webp','uploads/45.webp',
  'uploads/46.webp','uploads/47.webp','uploads/48.webp','uploads/49.webp','uploads/50.webp',
];

function Gallery() {
  const t = useT();
  const { lang } = useLang();
  // Repeat all 50 photos twice for seamless marquee
  const seq = [...GALLERY_PHOTOS, ...GALLERY_PHOTOS];
  return (
    <section className="sec gallery" id="gallery">
      <div className="container">
        <div className="sec-head reveal">
          <div>
            <div className="eyebrow">{t(STRINGS.gallery.eyebrow)}</div>
            <h2>{t(STRINGS.gallery.title_a)} <em>{t(STRINGS.gallery.title_b)}</em></h2>
          </div>
          <p>{t(STRINGS.gallery.sub)}</p>
        </div>
      </div>
      <div className="gallery-marquee">
        {seq.map((photo, i) => {
          const variant = ((i % 4) + 1);
          return (
            <div key={i} className={`g-card g-card-${variant}`}>
              <img
                className="g-card-img"
                src={photo}
                alt="Familia feliz con su cachorro"
                loading="lazy"
              />
              <div className="g-card-overlay">
                <div className="g-tag">
                  <span className="heart">♥</span> BPuppy
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Testimonials() {
  const t = useT();
  const { lang } = useLang();
  return (
    <section className="sec testimonials" id="testi">
      <div className="container">
        <div className="sec-head reveal">
          <div>
            <div className="eyebrow">{t(STRINGS.testi.eyebrow)}</div>
            <h2>{t(STRINGS.testi.title_a)} <em>{t(STRINGS.testi.title_b)}</em></h2>
          </div>
          <p>{t(STRINGS.testi.sub)}</p>
        </div>
        <div className="t-grid">
          {STRINGS.testi.items.map((it, i) => (
            <div key={i} className="t-card reveal" data-d={i+1}>
              {it.pup && it.pup.length > 0 && <div className="pup-tag">🦴 {pick(it.pup, lang)}</div>}
              <div className="stars">★★★★★</div>
              <blockquote>{pick(it.q, lang)}</blockquote>
              <div className="who">
                <div className="av">{(pick(it.n, lang) || "").trim().charAt(0).toUpperCase()}</div>
                <div>
                  <div className="nm">{pick(it.n, lang)}</div>
                  <div className="meta">{pick(it.m, lang)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const t = useT();
  return (
    <section className="cta" id="available">
      <div className="container">
        <div className="cta-inner reveal">
          <div className="cta-glow" />
          <h2>{t(STRINGS.cta.title_a)} <em>{t(STRINGS.cta.title_b)}</em></h2>
          <p>{t(STRINGS.cta.sub)}</p>
          <div className="cta-actions">
            <a href="/cachorros" className="btn btn-primary">
              {t(STRINGS.cta.cta1)}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <a href="https://wa.me/19294287300" target="_blank" rel="noreferrer" className="btn btn-outline">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              {t(STRINGS.cta.cta2)}
            </a>
            <a href="tel:+19294287300" className="btn btn-outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              {t(['Llámanos', 'Call us'])}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Gallery, Testimonials, FinalCTA });
