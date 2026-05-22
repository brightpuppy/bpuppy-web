// media-views.jsx — B Media page (dark hero + kinetic typography)

const MC = {
  // Dark hero theme
  hero:        '#040C1E',
  heroBorder:  'rgba(255,255,255,0.09)',
  heroText:    '#F0EEF8',
  heroMuted:   'rgba(240,238,248,0.55)',
  heroSoft:    'rgba(240,238,248,0.28)',
  heroSurface: 'rgba(255,255,255,0.05)',

  // Light sections
  bg:          '#FAFAF8',
  bg2:         '#F2F0EB',
  surface:     '#FFFFFF',
  border:      'rgba(0,0,0,0.07)',
  borderStrong:'rgba(0,0,0,0.14)',

  // Accents
  brand: '#FF5520',
  rose:  '#E83060',
  ice:   '#4AB8FF',
  grad:  'linear-gradient(135deg,#FF5520,#E83060)',
  glow:  '0 8px 32px rgba(255,85,32,0.35)',

  // Text
  ink:  '#0E0C14',
  ink2: '#5C5870',
  soft: '#A8A4B8',
};

// ── Scroll-reveal hook ─────────────────────────────────────────────────────────
function useReveal() {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(function() {
    const obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return function() { obs.disconnect(); };
  }, []);
  return [ref, visible];
}

function MediaApp({ visibility = {} }) {
  const v = visibility;
  return (
    <div style={{ background:MC.bg, color:MC.ink, fontFamily:'Plus Jakarta Sans, sans-serif', paddingTop:80 }}>
      {v.hero        !== false && <MediaHero/>}
      {v.videos      !== false && <VideosSection/>}
      {v.podcast     !== false && <PodcastSection/>}
      {v.entrevistas !== false && <InterviewsSection/>}
      {v.cta         !== false && <MediaFooterCTA/>}
    </div>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function MediaHero() {
  // Each letter: outline=true means transparent + stroke
  const chars = [
    { c:'B', outline:false, stroke:null,                          dur:5.8, delay:0    },
    { c:'M', outline:true,  stroke:'rgba(255,255,255,0.38)',      dur:6.5, delay:-0.9 },
    { c:'E', outline:false, stroke:null,                          dur:5.3, delay:-1.7 },
    { c:'D', outline:false, stroke:null,                          dur:7.1, delay:-2.4 },
    { c:'I', outline:true,  stroke:'rgba(255,85,32,0.7)',         dur:5.6, delay:-0.5 },
    { c:'A', outline:false, stroke:null,                          dur:6.3, delay:-3.2 },
  ];

  return (
    <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden', background:MC.hero }}>

      {/* Scan-line texture overlay */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.012) 3px,rgba(255,255,255,0.012) 4px)', pointerEvents:'none', zIndex:0 }}/>

      {/* Animated gradient orb — orange */}
      <div style={{ position:'absolute', borderRadius:'50%', width:'72vw', height:'72vw', background:'radial-gradient(circle,rgba(255,85,32,0.13) 0%,transparent 62%)', top:'-26%', left:'-16%', animation:'orbA 18s ease-in-out infinite', pointerEvents:'none', zIndex:0 }}/>
      {/* Animated gradient orb — blue */}
      <div style={{ position:'absolute', borderRadius:'50%', width:'56vw', height:'56vw', background:'radial-gradient(circle,rgba(74,184,255,0.1) 0%,transparent 62%)', bottom:'-14%', right:'-10%', animation:'orbB 22s ease-in-out infinite', pointerEvents:'none', zIndex:0 }}/>

      {/* Ghost background letters */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', userSelect:'none', overflow:'hidden', zIndex:0 }}>
        {/* Giant ghost B */}
        <div style={{ position:'absolute', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(240px,40vw,560px)', lineHeight:1, top:'-8%', left:'-4%', color:'transparent', WebkitTextStroke:'1.5px rgba(255,255,255,0.045)', letterSpacing:'-0.05em', animation:'floatA 13s ease-in-out infinite' }}>B</div>
        {/* Ghost MEDIA at bottom-right */}
        <div style={{ position:'absolute', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(80px,13vw,195px)', lineHeight:1, bottom:'18%', right:'-1%', color:'transparent', WebkitTextStroke:'1px rgba(255,255,255,0.032)', letterSpacing:'-0.04em', animation:'floatB 17s ease-in-out infinite' }}>MEDIA</div>
      </div>

      {/* ── Main content ── */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'100px clamp(24px,6vw,120px) 40px', position:'relative', zIndex:1 }}>

        {/* Live badge */}
        <div style={{ display:'flex', alignItems:'center', marginBottom:32 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, background:'rgba(255,85,32,0.12)', border:'1px solid rgba(255,85,32,0.3)', borderRadius:999, padding:'6px 14px 6px 8px' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:MC.brand, display:'inline-block', boxShadow:'0 0 0 3px rgba(255,85,32,0.25)', animation:'mediaPulse 1.8s ease-in-out infinite' }}/>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:MC.brand }}>En Vivo ahora</span>
          </div>
        </div>

        {/* Kinetic title — each letter floats independently */}
        <div style={{ display:'flex', alignItems:'baseline', marginBottom:32, lineHeight:0.88, gap:'0.01em' }}>
          {chars.map(function(ch, i) {
            return (
              <span key={i} style={{
                display:'inline-block',
                fontFamily:'Bricolage Grotesque,sans-serif',
                fontWeight:800,
                fontSize:'clamp(68px,12vw,182px)',
                letterSpacing:'-0.045em',
                lineHeight:0.88,
                color: ch.outline ? 'transparent' : (i===0 ? '#FFFFFF' : MC.heroText),
                WebkitTextStroke: ch.outline ? ('2px ' + ch.stroke) : 'none',
                animation:'charFloat ' + ch.dur + 's ease-in-out infinite',
                animationDelay: ch.delay + 's',
              }}>
                {ch.c}
              </span>
            );
          })}
        </div>

        {/* Subtitle + CTA */}
        <div style={{ display:'flex', gap:32, flexWrap:'wrap', alignItems:'flex-end', maxWidth:900 }}>
          <p style={{ fontSize:'clamp(15px,1.4vw,18px)', color:MC.heroMuted, lineHeight:1.6, margin:0, maxWidth:'42ch' }}>
            Contenido original sobre mascotas, crianza responsable y la comunidad BrightPuppy.
          </p>
          <a href="#videos" style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 28px', borderRadius:999, background:MC.grad, color:'#fff', fontWeight:700, fontSize:15, textDecoration:'none', whiteSpace:'nowrap', boxShadow:MC.glow, transition:'transform .2s, box-shadow .2s' }}
            onMouseEnter={function(e){ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 14px 40px rgba(255,85,32,0.5)'; }}
            onMouseLeave={function(e){ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=MC.glow; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Ver ahora
          </a>
        </div>
      </div>

      {/* Featured card — glass morphism */}
      <div style={{ padding:'0 clamp(24px,6vw,120px) 48px', position:'relative', zIndex:1 }}>
        <div style={{ position:'relative', borderRadius:20, overflow:'hidden', background:'rgba(255,255,255,0.048)', border:'1px solid rgba(255,255,255,0.1)', backdropFilter:'blur(16px)', maxWidth:700, boxShadow:'0 4px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
          <div style={{ aspectRatio:'16/8', background:'linear-gradient(135deg,rgba(255,85,32,0.14),rgba(74,184,255,0.06))', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, display:'grid', gridTemplateColumns:'repeat(6,1fr)', gridTemplateRows:'repeat(4,1fr)', gap:1, opacity:.04 }}>
              {[...Array(24)].map(function(_,i){ return <div key={i} style={{ background:'#fff' }}/>; })}
            </div>
            <div style={{ position:'relative', zIndex:2, textAlign:'center' }}>
              <div style={{ width:64, height:64, borderRadius:'50%', background:MC.grad, display:'grid', placeItems:'center', margin:'0 auto 12px', boxShadow:MC.glow }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><polygon points="5 3 19 12 5 21 5 3" fill="white"/></svg>
              </div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.45)', letterSpacing:'0.06em', textTransform:'uppercase' }}>Episodio destacado</div>
            </div>
            <div style={{ position:'absolute', top:14, left:14, background:MC.brand, color:'#fff', fontSize:10.5, fontWeight:700, padding:'4px 10px', borderRadius:6, letterSpacing:'0.06em', textTransform:'uppercase' }}>Nuevo</div>
            <div style={{ position:'absolute', bottom:14, right:14, background:'rgba(0,0,0,0.55)', color:'#fff', fontSize:11, fontWeight:600, padding:'3px 8px', borderRadius:5, backdropFilter:'blur(4px)' }}>24:38</div>
          </div>
          <div style={{ padding:'18px 20px 22px' }}>
            <div style={{ fontSize:11, fontWeight:600, color:MC.brand, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6 }}>Podcast · Episodio 48</div>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:22, fontWeight:700, color:'rgba(255,255,255,0.92)', letterSpacing:'-0.02em', lineHeight:1.2, marginBottom:8 }}>Todo lo que debes saber antes de adoptar un Golden Retriever</div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.35)' }}>Con la Dra. Carmen Reyes · Mayo 2026</div>
          </div>
        </div>
      </div>

      {/* Dark ticker */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,0.07)', overflow:'hidden', height:38, display:'flex', alignItems:'center', background:'rgba(0,0,0,0.22)', position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', gap:0, animation:'mediaTicker 26s linear infinite', whiteSpace:'nowrap' }}>
          {[...Array(4)].map(function(_,i){
            return (
              <span key={i} style={{ fontSize:10.5, fontWeight:700, letterSpacing:'0.13em', textTransform:'uppercase', color:'rgba(255,255,255,0.25)', paddingRight:72 }}>
                <span style={{ color:MC.brand }}>◆</span>&nbsp;Videos &nbsp;·&nbsp; Podcasts &nbsp;·&nbsp; Entrevistas &nbsp;·&nbsp; Razas &nbsp;·&nbsp; Crianza &nbsp;·&nbsp; Salud &nbsp;·&nbsp; Adopciones &nbsp;·&nbsp; Comunidad &nbsp;
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Videos ─────────────────────────────────────────────────────────────────────
const VIDEO_DATA = [
  { id:1, cat:'Crianza',   title:'Primeras semanas con tu cachorro',        dur:'18:22', views:'42k', isNew:true  },
  { id:2, cat:'Salud',     title:'Vacunas esenciales: guia completa',       dur:'12:05', views:'28k', isNew:false },
  { id:3, cat:'Razas',     title:'Golden vs Labrador: diferencias clave',   dur:'21:47', views:'61k', isNew:false },
  { id:4, cat:'Crianza',   title:'Socializacion en los primeros 3 meses',   dur:'15:30', views:'34k', isNew:true  },
  { id:5, cat:'Nutricion', title:'La mejor dieta para cachorros',           dur:'09:54', views:'19k', isNew:false },
  { id:6, cat:'Grooming',  title:'Bano y cepillado paso a paso',            dur:'11:18', views:'22k', isNew:false },
];

const CARD_COLORS = ['#FF5520','#9B6FFF','#00A896','#E83060','#F5A623','#3B82F6'];

function VideoCard({ v, idx }) {
  const c = CARD_COLORS[idx % CARD_COLORS.length];
  return (
    <div style={{ background:MC.surface, border:`1px solid ${MC.border}`, borderRadius:16, overflow:'hidden', cursor:'pointer', transition:'transform .2s, box-shadow .2s' }}
      onMouseEnter={function(e){ e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow=`0 16px 48px rgba(0,0,0,0.1), 0 0 0 1.5px ${c}30`; }}
      onMouseLeave={function(e){ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
      <div style={{ aspectRatio:'16/9', background:`linear-gradient(135deg,${c}18,${c}08)`, position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:44, height:44, borderRadius:'50%', background:`${c}20`, border:`1.5px solid ${c}40`, display:'grid', placeItems:'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={c}><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        {v.isNew && <div style={{ position:'absolute', top:10, left:10, background:MC.brand, color:'#fff', fontSize:9.5, fontWeight:700, padding:'3px 8px', borderRadius:5, letterSpacing:'0.06em', textTransform:'uppercase' }}>Nuevo</div>}
        <div style={{ position:'absolute', bottom:10, right:10, background:'rgba(14,12,20,0.6)', color:'#fff', fontSize:10.5, fontWeight:600, padding:'2px 7px', borderRadius:5 }}>{v.dur}</div>
      </div>
      <div style={{ padding:'14px 16px 16px' }}>
        <div style={{ fontSize:10.5, fontWeight:700, color:c, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:6 }}>{v.cat}</div>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:16, fontWeight:700, color:MC.ink, lineHeight:1.3, marginBottom:8, letterSpacing:'-0.01em' }}>{v.title}</div>
        <div style={{ fontSize:12, color:MC.soft }}>{v.views} vistas</div>
      </div>
    </div>
  );
}

function VideosSection() {
  const [ref, visible] = useReveal();
  return (
    <section id="videos" ref={ref} style={{ padding:'clamp(80px,10vw,140px) clamp(24px,6vw,120px)', background:MC.bg, opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(36px)', transition:'opacity 0.7s ease, transform 0.7s ease' }}>
      <div style={{ display:'flex', alignItems:'flex-end', gap:32, marginBottom:56, flexWrap:'wrap' }}>
        <div>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:12, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:MC.brand, marginBottom:14 }}>01 — Videos</div>
          <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(44px,7.5vw,96px)', fontWeight:800, letterSpacing:'-0.04em', lineHeight:0.92, margin:0, color:MC.ink }}>
            Lo ultimo<br/><span style={{ color:MC.soft, fontWeight:300 }}>en pantalla</span>
          </h2>
        </div>
        <a href="#" style={{ marginLeft:'auto', display:'inline-flex', alignItems:'center', gap:8, padding:'10px 20px', borderRadius:999, border:`1.5px solid ${MC.borderStrong}`, color:MC.ink2, fontSize:13, fontWeight:600, textDecoration:'none', whiteSpace:'nowrap', transition:'all .2s' }}
          onMouseEnter={function(e){ e.currentTarget.style.background=MC.ink; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor=MC.ink; }}
          onMouseLeave={function(e){ e.currentTarget.style.background='transparent'; e.currentTarget.style.color=MC.ink2; e.currentTarget.style.borderColor=MC.borderStrong; }}>
          Ver todos
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:18 }}>
        {VIDEO_DATA.map(function(v,i){ return <VideoCard key={v.id} v={v} idx={i}/>; })}
      </div>
    </section>
  );
}

// ── Podcast — dark ────────────────────────────────────────────────────────────
const AI_EPISODES = [
  { n:'048', title:'Todo sobre el Golden Retriever',         guest:'Dra. Carmen Reyes', dur:'24:38', date:'12 May 2026' },
  { n:'047', title:'Nutricion en cachorros de 0 a 6 meses',  guest:'Dr. Miguel Torres', dur:'31:15', date:'5 May 2026'  },
  { n:'046', title:'Socializacion temprana y sus mitos',      guest:'Ana Delgado',       dur:'19:42', date:'28 Abr 2026' },
  { n:'045', title:'Cuando adoptar vs comprar un gatito',     guest:'Vet. Luis Perez',   dur:'27:06', date:'21 Abr 2026' },
];

const LIVE_EPISODES = [
  { n:'L12', title:'La historia detrás de BPuppy',            guest:'Equipo BPuppy',     dur:'38:10', date:'10 May 2026' },
  { n:'L11', title:'Criando a Milo: nuestro golden de prueba', guest:'Sofia & Carlos',    dur:'45:22', date:'2 May 2026'  },
  { n:'L10', title:'Q&A en vivo: sus preguntas, nuestras resp.', guest:'Todo el equipo',  dur:'52:05', date:'25 Abr 2026' },
  { n:'L09', title:'Visita al veterinario: la experiencia real', guest:'Ana Delgado',     dur:'29:48', date:'18 Abr 2026' },
];

function AIBanner({ PD }) {
  const steps = [
    { icon:'◎', label:'Generado por IA especializada' },
    { icon:'◈', label:'Revisado por expertos humanos' },
    { icon:'◉', label:'Aprobado para ti y tu mascota' },
  ];
  return (
    <div style={{ borderRadius:18, border:'1px solid rgba(74,184,255,0.22)', background:'linear-gradient(130deg,rgba(74,184,255,0.07) 0%,rgba(255,85,32,0.06) 100%)', padding:'36px 32px 32px', marginBottom:28, position:'relative', overflow:'hidden' }}>
      {/* Decorative ghost text */}
      <div style={{ position:'absolute', right:-8, top:-16, fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:140, lineHeight:1, color:'transparent', WebkitTextStroke:'1px rgba(74,184,255,0.07)', letterSpacing:'-0.04em', pointerEvents:'none', userSelect:'none' }}>IA</div>

      {/* Badge */}
      <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(74,184,255,0.1)', border:'1px solid rgba(74,184,255,0.28)', borderRadius:999, padding:'5px 13px 5px 9px', marginBottom:22 }}>
        <span style={{ width:7, height:7, borderRadius:'50%', background:MC.ice, display:'inline-block', boxShadow:`0 0 0 2px rgba(74,184,255,0.25)` }}/>
        <span style={{ fontSize:10.5, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:MC.ice }}>IA Generado · Curado por Humanos</span>
      </div>

      {/* Title */}
      <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(28px,4vw,52px)', letterSpacing:'-0.035em', lineHeight:1.0, marginBottom:16 }}>
        <span style={{ color:PD.text, display:'block' }}>IA de última generación.</span>
        <span style={{ color:'transparent', WebkitTextStroke:'2px rgba(74,184,255,0.55)', display:'block' }}>Corazón 100% humano.</span>
      </div>

      {/* Subtitle */}
      <p style={{ fontSize:'clamp(14px,1.3vw,16px)', color:PD.muted, lineHeight:1.65, margin:'0 0 28px', maxWidth:'58ch' }}>
        Nuestros top podcasts son producidos con modelos de inteligencia artificial entrenados por especialistas en bienestar animal — y revisados por nuestro equipo antes de llegar a ti. Porque la mejor tecnología siempre es mejor con toque humano.
      </p>

      {/* Process steps */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
        {steps.map(function(s, i) {
          return (
            <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:999, padding:'7px 14px' }}>
              <span style={{ fontSize:12, color:MC.ice, lineHeight:1 }}>{s.icon}</span>
              <span style={{ fontSize:11.5, fontWeight:600, color:PD.muted, letterSpacing:'0.01em' }}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LiveBanner({ PD }) {
  const traits = [
    { icon:'♥', label:'Voces reales, sin filtros' },
    { icon:'◎', label:'Grabado por nuestro equipo' },
    { icon:'✦', label:'Historias que nos pasaron a nosotros' },
  ];
  return (
    <div style={{ borderRadius:18, border:'1px solid rgba(255,85,32,0.25)', background:'linear-gradient(130deg,rgba(255,85,32,0.08) 0%,rgba(255,180,60,0.05) 100%)', padding:'36px 32px 32px', marginBottom:28, position:'relative', overflow:'hidden' }}>
      {/* Ghost word */}
      <div style={{ position:'absolute', right:-12, top:-10, fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:140, lineHeight:1, color:'transparent', WebkitTextStroke:'1px rgba(255,85,32,0.07)', letterSpacing:'-0.04em', pointerEvents:'none', userSelect:'none' }}>LIVE</div>

      {/* Recording dot badge */}
      <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(255,85,32,0.1)', border:'1px solid rgba(255,85,32,0.3)', borderRadius:999, padding:'5px 13px 5px 9px', marginBottom:22 }}>
        <span style={{ width:7, height:7, borderRadius:'50%', background:MC.brand, display:'inline-block', animation:'pulse 1.4s ease-in-out infinite' }}/>
        <span style={{ fontSize:10.5, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:MC.brand }}>Grabado por Nosotros · 100% Humano</span>
      </div>

      {/* Title */}
      <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(28px,4vw,52px)', letterSpacing:'-0.035em', lineHeight:1.0, marginBottom:16 }}>
        <span style={{ color:PD.text, display:'block' }}>Nuestra voz.</span>
        <span style={{ color:'transparent', WebkitTextStroke:'2px rgba(255,85,32,0.6)', display:'block' }}>Sin guión, sin IA.</span>
      </div>

      {/* Subtitle */}
      <p style={{ fontSize:'clamp(14px,1.3vw,16px)', color:PD.muted, lineHeight:1.65, margin:'0 0 28px', maxWidth:'58ch' }}>
        Estos episodios los grabamos nosotros mismos — el equipo BPuppy hablando de lo que vivimos, lo que aprendimos y lo que amamos. Nada de inteligencia artificial: pura experiencia humana con mascotas reales.
      </p>

      {/* Traits */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
        {traits.map(function(s, i) {
          return (
            <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:999, padding:'7px 14px' }}>
              <span style={{ fontSize:12, color:MC.brand, lineHeight:1 }}>{s.icon}</span>
              <span style={{ fontSize:11.5, fontWeight:600, color:PD.muted, letterSpacing:'0.01em' }}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EpisodeList({ episodes, playing, setPlaying, PD, isLive }) {
  return (
    <div style={{ display:'flex', flexDirection:'column' }}>
      {episodes.map(function(ep, i){
        const isPlaying = playing === (isLive ? 'L'+i : 'A'+i);
        return (
          <div key={ep.n} style={{ display:'flex', alignItems:'center', gap:16, padding:'18px 0', borderBottom:`1px solid ${PD.border}`, cursor:'pointer', transition:'padding-left .15s' }}
            onMouseEnter={function(e){ e.currentTarget.style.paddingLeft='8px'; }}
            onMouseLeave={function(e){ e.currentTarget.style.paddingLeft='0'; }}>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:13, fontWeight:700, color: isLive ? MC.brand : MC.ice, minWidth:40, letterSpacing:'0.04em' }}>{ep.n}</div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3, flexWrap:'wrap' }}>
                <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:16, fontWeight:700, color:PD.text, letterSpacing:'-0.01em' }}>{ep.title}</div>
                {!isLive && (
                  <span style={{ fontSize:9.5, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:MC.ice, background:'rgba(74,184,255,0.1)', border:'1px solid rgba(74,184,255,0.22)', borderRadius:4, padding:'2px 7px', flexShrink:0 }}>◎ IA</span>
                )}
                {isLive && (
                  <span style={{ fontSize:9.5, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:MC.brand, background:'rgba(255,85,32,0.1)', border:'1px solid rgba(255,85,32,0.25)', borderRadius:4, padding:'2px 7px', flexShrink:0 }}>♥ En Vivo</span>
                )}
              </div>
              <div style={{ fontSize:12, color:PD.soft }}>{ep.guest} · {ep.date}</div>
            </div>
            <div style={{ fontSize:12, color:PD.soft, marginRight:8 }}>{ep.dur}</div>
            <button onClick={function(){ setPlaying(function(p){ var key = isLive?'L'+i:'A'+i; return p===key?null:key; }); }} style={{ width:36, height:36, borderRadius:'50%', background:isPlaying?MC.grad:'rgba(255,255,255,0.06)', border:`1.5px solid ${isPlaying?'transparent':PD.border}`, display:'grid', placeItems:'center', cursor:'pointer', flexShrink:0, boxShadow:isPlaying?MC.glow:'none' }}>
              {isPlaying
                ? <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                : <svg width="12" height="12" viewBox="0 0 24 24" fill={isLive?MC.brand:MC.ice}><polygon points="5 3 19 12 5 21 5 3"/></svg>}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function PodcastSection() {
  const [ref, visible] = useReveal();
  const [playing, setPlaying] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [tab, setTab] = React.useState('ai'); // 'ai' | 'live'

  React.useEffect(function() {
    if (playing === null) return;
    const t = setInterval(function(){ setProgress(function(p){ return p >= 100 ? 0 : p + 0.4; }); }, 200);
    return function(){ clearInterval(t); };
  }, [playing]);

  // Dark palette for this section
  const PD = {
    bg:      '#040C1E',
    surface: 'rgba(255,255,255,0.05)',
    border:  'rgba(255,255,255,0.09)',
    text:    '#F0EEF8',
    muted:   'rgba(240,238,248,0.52)',
    soft:    'rgba(240,238,248,0.28)',
  };

  return (
    <section ref={ref} style={{ padding:'clamp(80px,10vw,140px) clamp(24px,6vw,120px)', background:PD.bg, opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(36px)', transition:'opacity 0.7s ease, transform 0.7s ease', position:'relative', overflow:'hidden' }}>
      {/* Subtle orb */}
      <div style={{ position:'absolute', borderRadius:'50%', width:'50vw', height:'50vw', background:'radial-gradient(circle,rgba(255,85,32,0.07) 0%,transparent 65%)', bottom:'-20%', right:'-10%', pointerEvents:'none' }}/>

      <div style={{ maxWidth:900, position:'relative', zIndex:1 }}>
        <div style={{ fontSize:12, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:MC.brand, marginBottom:14 }}>02 — Podcast</div>
        <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(44px,7.5vw,96px)', fontWeight:800, letterSpacing:'-0.04em', lineHeight:0.92, margin:'0 0 56px', color:PD.text }}>
          B<span style={{ color:MC.brand }}>cast</span>
        </h2>

        {/* Featured player */}
        <div style={{ background:PD.surface, border:`1px solid ${PD.border}`, borderRadius:20, padding:'28px 28px 24px', marginBottom:20, backdropFilter:'blur(12px)', boxShadow:'0 4px 32px rgba(0,0,0,0.3)' }}>
          <div style={{ fontSize:11, fontWeight:600, color:MC.brand, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:8 }}>Episodio mas reciente</div>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(18px,2.5vw,28px)', fontWeight:700, color:PD.text, letterSpacing:'-0.02em', lineHeight:1.2, marginBottom:4 }}>Todo lo que debes saber antes de adoptar un Golden Retriever</div>
          <div style={{ fontSize:13, color:PD.soft, marginBottom:22 }}>Dra. Carmen Reyes · 24:38</div>
          <div style={{ height:3, background:'rgba(255,255,255,0.08)', borderRadius:999, marginBottom:16, cursor:'pointer' }}>
            <div style={{ height:'100%', width:`${progress}%`, background:MC.grad, borderRadius:999, transition:'width .2s linear' }}/>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <button onClick={function(){ setPlaying(function(p){ return p===48?null:48; }); setProgress(0); }} style={{ width:48, height:48, borderRadius:'50%', background:playing===48?MC.grad:'rgba(255,255,255,0.08)', border:`1.5px solid ${playing===48?'transparent':PD.border}`, display:'grid', placeItems:'center', cursor:'pointer', transition:'all .2s', boxShadow:playing===48?MC.glow:'none' }}>
              {playing===48
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill={MC.brand}><polygon points="5 3 19 12 5 21 5 3"/></svg>}
            </button>
            <div style={{ display:'flex', gap:3, alignItems:'flex-end', height:32 }}>
              {[...Array(32)].map(function(_,i){
                const h = 4 + Math.abs(Math.sin(i*0.8)*12 + Math.sin(i*1.7)*8);
                const active = playing===48 && (i/32)*100 < progress;
                return <div key={i} style={{ width:3, height:h, borderRadius:999, background:active?MC.brand:'rgba(255,255,255,0.1)', transition:'background .2s' }}/>;
              })}
            </div>
            <span style={{ fontSize:12, color:PD.soft, marginLeft:4 }}>
              {playing===48 ? `${Math.floor(progress/100*24)}:${String(Math.floor((progress/100*24*60)%60)).padStart(2,'0')}` : '0:00'} / 24:38
            </span>
          </div>
        </div>

        {/* Tab switcher */}
        <div style={{ display:'inline-flex', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:999, padding:4, marginBottom:40, gap:4 }}>
          {[
            { id:'ai',   label:'◎ IA Generado',  color:MC.ice  },
            { id:'live', label:'♥ Grabado en Vivo', color:MC.brand },
          ].map(function(t){
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={function(){ setTab(t.id); setPlaying(null); }}
                style={{ padding:'10px 22px', borderRadius:999, border:'none', cursor:'pointer', fontFamily:'inherit', fontSize:13, fontWeight:700, letterSpacing:'0.03em', transition:'all .22s',
                  background: active ? (t.id==='ai' ? 'rgba(74,184,255,0.15)' : MC.grad) : 'transparent',
                  color: active ? (t.id==='ai' ? MC.ice : '#fff') : PD.soft,
                  boxShadow: active ? (t.id==='ai' ? '0 0 0 1px rgba(74,184,255,0.3)' : MC.glow) : 'none',
                }}>
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {tab === 'ai' ? (
          <div>
            <AIBanner PD={PD}/>
            <EpisodeList episodes={AI_EPISODES} playing={playing} setPlaying={setPlaying} PD={PD} isLive={false}/>
          </div>
        ) : (
          <div>
            <LiveBanner PD={PD}/>
            <EpisodeList episodes={LIVE_EPISODES} playing={playing} setPlaying={setPlaying} PD={PD} isLive={true}/>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Interviews ─────────────────────────────────────────────────────────────────
const INTERVIEWS = [
  { n:'01', name:'Dr. Rodrigo Salas',  role:'Medico Veterinario',    topic:'Salud preventiva en perros de raza',  tag:'Salud',    color:'#FF5520' },
  { n:'02', name:'Maria Elena Torres', role:'Criadora certificada',   topic:'25 anos criando Golden Retrievers',   tag:'Crianza',  color:'#9B6FFF' },
  { n:'03', name:'Carlos Munoz',       role:'Entrenador canino',      topic:'Educacion positiva desde cachorros',  tag:'Entrena',  color:'#00A896' },
  { n:'04', name:'Sofia Valencia',     role:'Nutricionista animal',   topic:'Mitos sobre la alimentacion BARF',    tag:'Nutricion',color:'#E83060' },
];

function InterviewsSection() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} style={{ padding:'clamp(80px,10vw,140px) clamp(24px,6vw,120px)', background:MC.bg, opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(36px)', transition:'opacity 0.7s ease, transform 0.7s ease' }}>
      <div style={{ fontSize:12, fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:MC.brand, marginBottom:14 }}>03 — Entrevistas</div>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:56, flexWrap:'wrap', gap:24 }}>
        <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(44px,7.5vw,96px)', fontWeight:800, letterSpacing:'-0.04em', lineHeight:0.92, margin:0, color:MC.ink }}>
          Cara<br/>a cara
        </h2>
        <p style={{ fontSize:16, color:MC.ink2, lineHeight:1.6, maxWidth:'36ch', margin:0 }}>
          Conversaciones profundas con los expertos que marcan la pauta en el mundo de las mascotas.
        </p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16 }}>
        {INTERVIEWS.map(function(iv){
          return (
            <div key={iv.n} style={{ background:MC.surface, border:`1px solid ${MC.border}`, borderRadius:18, padding:'28px 24px 24px', cursor:'pointer', transition:'transform .2s, box-shadow .2s', position:'relative', overflow:'hidden' }}
              onMouseEnter={function(e){ e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow=`0 14px 44px rgba(0,0,0,0.08), inset 0 0 0 1.5px ${iv.color}35`; }}
              onMouseLeave={function(e){ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
              <div style={{ position:'absolute', top:0, right:0, width:80, height:80, borderRadius:'0 18px 0 80px', background:`${iv.color}08` }}/>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:48, fontWeight:800, color:`${iv.color}20`, letterSpacing:'-0.04em', lineHeight:1, marginBottom:20 }}>{iv.n}</div>
              <div style={{ display:'inline-block', fontSize:10, fontWeight:700, color:iv.color, background:`${iv.color}12`, border:`1px solid ${iv.color}25`, borderRadius:6, padding:'3px 9px', letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:14 }}>{iv.tag}</div>
              <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:18, fontWeight:700, color:MC.ink, lineHeight:1.3, letterSpacing:'-0.01em', marginBottom:8 }}>{iv.topic}</div>
              <div style={{ fontSize:13, color:MC.ink2, marginBottom:2 }}>{iv.name}</div>
              <div style={{ fontSize:11.5, color:MC.soft }}>{iv.role}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Footer CTA ─────────────────────────────────────────────────────────────────
function MediaFooterCTA() {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} style={{ padding:'clamp(80px,10vw,120px) clamp(24px,6vw,120px)', background:MC.ink, color:'#FAFAF8', position:'relative', overflow:'hidden', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(36px)', transition:'opacity 0.7s ease, transform 0.7s ease' }}>
      {/* Ghost text decoration */}
      <div style={{ position:'absolute', fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:'clamp(120px,20vw,300px)', lineHeight:1, bottom:'-5%', right:'-2%', color:'transparent', WebkitTextStroke:'1px rgba(255,255,255,0.04)', letterSpacing:'-0.04em', pointerEvents:'none', userSelect:'none' }}>BCAST</div>

      <div style={{ maxWidth:700, position:'relative', zIndex:1 }}>
        <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(40px,7vw,88px)', fontWeight:800, letterSpacing:'-0.04em', lineHeight:0.92, margin:'0 0 24px', color:'#FAFAF8' }}>
          No te<br/>pierdas nada.
        </h2>
        <p style={{ fontSize:17, color:'rgba(250,250,248,0.5)', lineHeight:1.6, margin:'0 0 32px', maxWidth:'44ch' }}>
          Suscribete al podcast de BrightPuppy y recibe cada episodio nuevo directo en tu app favorita.
        </p>
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          {['Spotify','Apple Podcasts','YouTube'].map(function(p,i){
            return (
              <a key={p} href="#" style={{ display:'inline-flex', alignItems:'center', gap:9, padding:'13px 22px', borderRadius:999, background:i===0?MC.grad:'rgba(255,255,255,0.08)', border:i===0?'none':'1px solid rgba(255,255,255,0.15)', color:'#fff', fontSize:14, fontWeight:600, textDecoration:'none', boxShadow:i===0?MC.glow:'none', transition:'all .2s' }}
                onMouseEnter={function(e){ e.currentTarget.style.transform='translateY(-2px)'; }}
                onMouseLeave={function(e){ e.currentTarget.style.transform='translateY(0)'; }}>
                {p}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { MediaApp });
