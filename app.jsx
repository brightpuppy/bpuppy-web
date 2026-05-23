// app.jsx — root composition, theme/lang state, mounts everything

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "familia",
  "brandColor": "#F58220",
  "paws": true,
  "lang": "es"
}/*EDITMODE-END*/;

// Wrapper that respects the SitePublish toggle for the map section
function FamiliesMapSection() {
  const [show, setShow] = React.useState(
    () => window.SitePublish ? window.SitePublish.isSectionLive('Home', 'mapa') : true
  );
  React.useEffect(() => {
    const h = () => setShow(window.SitePublish ? window.SitePublish.isSectionLive('Home', 'mapa') : true);
    window.addEventListener('bpuppy:publish', h);
    return () => window.removeEventListener('bpuppy:publish', h);
  }, []);
  if (!show) return null;
  return <FamiliesMap />;
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = React.useState(tweaks.lang || 'es');

  // sync tweak.lang -> state and vice versa
  React.useEffect(() => { setLang(tweaks.lang); }, [tweaks.lang]);
  const setLangBoth = (l) => { setLang(l); setTweak('lang', l); };

  // apply theme + brand color to <html>
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme);
    document.documentElement.lang = lang;
  }, [tweaks.theme, lang]);

  React.useEffect(() => {
    // brand color override
    document.documentElement.style.setProperty('--orange', tweaks.brandColor);
    // derive a deeper variant
    document.documentElement.style.setProperty('--orange-deep', shade(tweaks.brandColor, -0.18));
  }, [tweaks.brandColor]);

  useReveal();

  // Track if we're scrolled past hero (for header color)
  const [overDark, setOverDark] = React.useState(true);
  React.useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('.hero');
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setOverDark(heroBottom > 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isLive = useSitePublish('Home');
  if (!isLive) return <ComingSoon pageName="Inicio"/>;
  return (
    <LangContext.Provider value={{ lang, setLang: setLangBoth }}>
      <Header overDark={overDark} />
      <main>
        <Hero />
        <About />
        <Process />
        <Promise_ />
        <Quiz />
        <Gallery />
        <InstagramFeed />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <PawCursor enabled={tweaks.paws} />
      <BPuppyTweaks tweaks={tweaks} setTweak={setTweak} />
    </LangContext.Provider>
  );
}

// shade a hex color by amount (-1..1). Negative = darker.
function shade(hex, amt) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map(c => c+c).join('') : h, 16);
  let r = (n >> 16) & 0xff, g = (n >> 8) & 0xff, b = n & 0xff;
  const k = 1 + amt;
  r = Math.round(Math.max(0, Math.min(255, r * k)));
  g = Math.round(Math.max(0, Math.min(255, g * k)));
  b = Math.round(Math.max(0, Math.min(255, b * k)));
  return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
