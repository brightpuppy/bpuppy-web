// blog-app.jsx — Root for /blog

const BLOG_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{"lang":"es"}/*EDITMODE-END*/;

function BlogRoot() {
  const [tweaks, setTweak] = useTweaks(BLOG_TWEAK_DEFAULTS);
  const [lang, setLang] = React.useState(tweaks.lang || 'es');
  React.useEffect(() => { setLang(tweaks.lang); }, [tweaks.lang]);
  const setLangBoth = (l) => { setLang(l); setTweak('lang', l); };
  React.useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  // Auto-open article from URL param ?art=ID
  const initArtId = React.useMemo(() => {
    const p = new URLSearchParams(window.location.search);
    const id = p.get('art');
    return id ? parseInt(id) : null;
  }, []);

  // Header en blanco solo cuando hay un artículo con foto de portada oscura detrás
  const [heroDark, setHeroDark] = React.useState(false);

  const isLive = useSitePublish('Blog');
  if (!isLive) return <ComingSoon pageName="Blog"/>;
  return (
    <LangContext.Provider value={{ lang, setLang: setLangBoth }}>
      <Header overDark={heroDark} />
      <main>
        <BlogApp initialArtId={initArtId} onHero={setHeroDark} />
      </main>
      <Footer />
    </LangContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BlogRoot />);
