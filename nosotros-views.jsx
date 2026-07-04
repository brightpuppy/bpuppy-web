// nosotros-views.jsx — Página Nosotros / About BPuppy
const { useState, useEffect } = React;

const TIMELINE = [
{ year: '2012', city: 'Santiago, RD', emoji: '🐶', title: ['El primer cachorro', 'The first puppy'], body: ['Todo empezó con una camada de Golden Retrievers en Santiago. Sin experiencia formal, con mucho amor y más preguntas que respuestas. El primer hogar que adoptó un cachorro nuestro se convirtió en familia.', 'It all started with a litter of Golden Retrievers in Santiago. No formal experience, just a lot of love and more questions than answers. The first family to adopt one of our puppies became part of ours.'] },
{ year: '2015', city: 'Santiago, RD', emoji: '🏪', title: ['El primer local', 'The first storefront'], body: ['Abrimos el primer espacio físico dedicado a crianza y adopción responsable. Lo que era informal se convirtió en un proceso: salud verificada, contratos de adopción, seguimiento post-adopción.', 'We opened our first physical space dedicated to responsible breeding and adoption. What had been informal became a real process: verified health, adoption contracts, and post-adoption follow-up.'] },
{ year: '2018', city: 'Villa Olga, Santiago, RD', emoji: '📈', title: ['Local más grande', 'A bigger home'], body: ['Con la demanda creciendo, expandimos nuestro espacio en Villa Olga, Santiago. Más razas, más familias y un equipo más grande con un propósito más claro: crianza responsable como estilo de vida.', 'As demand grew, we expanded our space in Villa Olga, Santiago. More breeds, more families, and a bigger team with a clearer purpose: responsible breeding as a way of life.'] },
{ year: '2020', city: 'USA', emoji: '✈️', title: ['Nos mudamos a USA', 'We moved to the USA'], body: ['Con la familia creciendo y la visión más clara, cruzamos a los Estados Unidos. El mercado era más exigente, la regulación más estricta y la competencia enorme. Pero también había más familias que buscaban exactamente lo que ofrecemos: cachorros criados en familia, no en jaulas.', 'With our family growing and our vision clearer than ever, we made the move to the United States. The market was more demanding, the regulations stricter, and the competition immense. But there were also more families looking for exactly what we offer: puppies raised in a family, not in cages.'] },
{ year: '2022', city: 'New York', emoji: '🗽', title: ['Abrimos en New York', 'We opened in New York'], body: ['Nueva ciudad, mismo corazón. Abrimos operaciones en New York, llevando nuestra filosofía de crianza responsable a una de las ciudades más exigentes del mundo. Cada cachorro, criado con el mismo amor de siempre.', 'New city, same heart. We opened operations in New York, bringing our philosophy of responsible breeding to one of the most demanding cities in the world. Every puppy, raised with the same love as always.'] },
{ year: '2025', city: 'Florida', emoji: '🌴', title: ['Abrimos en Florida', 'We opened in Florida'], body: ['Lanzamos nuestra operación en Florida con la plataforma digital: BPuppy Social para la comunidad, el blog educativo, la tienda curada y el sistema de citas de grooming online. El sueño de llevar todo a un solo lugar para las familias que confían en nosotros.', 'We launched our Florida operation alongside our digital platform: BPuppy Social for the community, the educational blog, the curated store, and online grooming appointments. The dream of bringing everything together in one place for the families who trust us.'] }];


const IMPACT_STORIES = [
{ emoji: '🧩', tag: ['Autismo', 'Autism'], title: ['Dilan y su Shih Tzu', 'Dilan and his Shih Tzu'], body: ['Dilan tiene 7 años y TEA nivel 2. Sus padres buscaban una raza calmada y gentil. Trabajamos con su terapeuta para elegir el cachorro correcto. Seis meses después, su madre nos escribió: "Dilan habla más con el perro que con cualquier persona. Es su mejor amigo."', 'Dilan is 7 years old and has level 2 autism. His parents were looking for a calm, gentle breed. We worked with his therapist to choose the right puppy. Six months later, his mother wrote to us: "Dilan talks to the dog more than to anyone else. He\'s his best friend."'], photos: ['assets/dilan-autism-1.jpg','assets/dilan-autism-2.jpg'], img: 'nosotros-impact-0' },
{ emoji: '👴', tag: ['Adultos mayores', 'Seniors'], title: ['Jeff & Freda - Lilly', 'Jeff & Freda - Lilly'], body: ['Entrevistamos a dos adultos mayores que nos contaron de primera mano lo mucho que su mascota Lilly los ha ayudado durante los momentos más difíciles de su vida. Sus testimonios nos recordaron por qué hacemos lo que hacemos — un compañero fiel puede cambiar una vida entera.', 'We sat down with two seniors who told us firsthand just how much their dog Lilly has helped them through the hardest moments of their lives. Their stories reminded us why we do what we do — a faithful companion can change an entire life.'], img: 'nosotros-impact-1', video: 'rr2gVZjCFWs' },
{ emoji: '🏠', tag: ['Refugio', 'Shelter'], title: ['Visita al Humane Society Kansas', 'A visit to the Humane Society in Kansas'], body: ['Visitamos el Caring Hands Humane Society de Newton, Kansas y entrevistamos a su directora de marketing. Nos habló sobre el increíble trabajo que realizan, cómo gestionan el refugio y su misión de darle una segunda oportunidad a cada animal.', 'We visited the Caring Hands Humane Society in Newton, Kansas and spoke with their marketing director. She told us about the incredible work they do, how they run the shelter, and their mission to give every animal a second chance.'], img: 'nosotros-impact-2', video: 'J5Q6c3wy0QE' },
{ emoji: '🎓', tag: ['Educación', 'Education'], title: ['Taller en Lincoln Marti School', 'Workshop at Lincoln Marti School'], hidden: true, body: ['Llevamos un cachorro a una escuela primaria en Hialeah para una charla sobre responsabilidad animal, empatía y cuidado de mascotas. 120 niños, un cachorro, y muchas lágrimas de emoción de los maestros.', 'We brought a puppy to an elementary school in Hialeah for a talk on animal responsibility, empathy, and pet care. 120 kids, one puppy, and plenty of happy tears from the teachers.'], img: 'nosotros-impact-3' }];


const TEAM = [
{ name: 'Angelina', role: ['Co-Fundadora & Directora', 'Co-Founder & Director'], bio: ['El corazón detrás de BPuppy. Desde 2012, Angelina ha guiado a cientos de familias en encontrar el compañero perfecto. Su enfoque en crianza responsable y bienestar animal define cada decisión que tomamos.', 'The heart behind BPuppy. Since 2012, Angelina has guided hundreds of families to find the perfect companion. Her focus on responsible breeding and animal welfare shapes every decision we make.'], img: 'uploads/Angelina.webp' },
{ name: 'Luis', role: ['Fundador & CEO', 'Founder & CEO'], bio: ['La visión detrás del negocio. Luis llevó BPuppy de Santo Domingo a Miami con una misión clara: demostrar que criar con amor y con estándares es la única forma de hacer esto bien. 12+ años construyendo familias.', 'The vision behind the business. Luis brought BPuppy from Santo Domingo to Miami with a clear mission: to prove that breeding with love and high standards is the only right way to do this. 12+ years building families.'], img: 'uploads/LUIS.webp' }];



const PRESS = [
{ source: 'Univision Miami', year: '2023', headline: ['"La criadora que llegó de RD y cambió cómo Miami adopta mascotas"', '"The breeder who came from the DR and changed how Miami adopts pets"'] },
{ source: 'El Nuevo Herald', year: '2022', headline: ['"BPuppy: el modelo de adopción responsable que crece en el Sur de Florida"', '"BPuppy: the responsible adoption model growing across South Florida"'] },
{ source: 'Miami Herald', year: '2021', headline: ['"Criador local entrega cachorros a las familias durante la cuarentena"', '"Local pet breeder delivers puppies to families during lockdown"'] },
{ source: 'NBC Miami', year: '2024', headline: ['"Red social para mascotas: BPuppy lanza una app comunitaria para dueños de perros del Sur de Florida"', '"Pet social network: BPuppy launches community app for South Florida dog owners"'] }];


// ── Timeline ───────────────────────────────────────────────────────────────────
function Timeline() {
  const t = useT();
  const [active, setActive] = useState(null);
  return (
    <div style={{ position: 'relative' }}>
      {/* Vertical line */}
      <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 2, background: 'var(--line)' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {TIMELINE.map((ev, i) =>
        <div key={i} onClick={() => setActive(active === i ? null : i)} style={{ display: 'flex', gap: 28, paddingBottom: 32, cursor: 'pointer' }}>
            {/* Dot */}
            <div style={{ position: 'relative', flexShrink: 0, width: 42 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: active === i ? 'var(--orange)' : 'var(--paper)', border: `2px solid ${active === i ? 'var(--orange)' : 'var(--line)'}`, display: 'grid', placeItems: 'center', fontSize: 18, transition: 'all .2s', zIndex: 1, position: 'relative' }}>
                {ev.emoji}
              </div>
            </div>
            {/* Content */}
            <div style={{ flex: 1, paddingTop: 8 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                <span style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 22, fontWeight: 800, color: active === i ? 'var(--orange)' : 'var(--ink)' }}>{ev.year}</span>
                <span style={{ fontSize: 12, color: 'var(--ink-soft)', fontWeight: 500 }}>📍 {ev.city}</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: '0 0 6px' }}>{t(ev.title)}</h3>
              {active === i &&
            <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7, margin: 0, animation: 'fadeIn .25s ease' }}>{t(ev.body)}</p>
            }
            </div>
          </div>
        )}
      </div>
    </div>);

}

// ── Impact stories ─────────────────────────────────────────────────────────────
function ImpactStories() {
  const t = useT();
  function isEducacionVisible() {
    try {
      var d = JSON.parse(localStorage.getItem('bpuppy_publish_v1')) || {};
      return d.sections && d.sections['Nosotros'] && d.sections['Nosotros']['impacto_educacion'] === true;
    } catch (e) {return false;}
  }
  const visibleStories = IMPACT_STORIES.filter(function (s) {return !s.hidden || isEducacionVisible();});
  const [active, setActive] = useState(0);
  const story = visibleStories[Math.min(active, visibleStories.length - 1)];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {visibleStories.map((s, i) =>
        <button key={i} onClick={() => setActive(i)} style={{ padding: '7px 16px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, fontWeight: active === i ? 700 : 500, background: active === i ? 'var(--orange)' : 'var(--bg)', color: active === i ? '#fff' : 'var(--ink-2)', transition: 'all .15s' }}>
            {s.emoji} {t(s.tag)}
          </button>
        )}
      </div>
      <div key={active} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center', animation: 'fadeIn .3s ease' }}>
        <div>
          <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, background: 'rgba(245,130,32,0.1)', color: 'var(--orange)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>{t(story.tag)}</div>
          <h3 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--ink)', margin: '0 0 14px', letterSpacing: '-0.02em' }}>{t(story.title)}</h3>
          <p style={{ fontSize: 15.5, color: 'var(--ink-2)', lineHeight: 1.75, margin: 0, fontStyle: 'italic', fontFamily: 'Instrument Serif,Georgia,serif' }}>"{t(story.body)}"</p>
        </div>
        {story.photos ?
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', alignItems: 'flex-start', maxWidth: 470, width: '100%', margin: '0 auto' }}>
          {story.photos.map((p, i) =>
            <img key={i} src={p} alt={t(story.title)} loading="lazy"
              style={{ width: 'calc(50% - 7px)', aspectRatio: '5/6', objectFit: 'cover', borderRadius: 16, border: '1px solid var(--line)', display: 'block', background: 'var(--bg)' }} />
          )}
        </div> :
        story.video ?
        <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '16/9', position: 'relative' }}>
            <iframe
            src={'https://www.youtube.com/embed/' + story.video + '?rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=es'}
            title={t(story.title)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }} />
          
          </div> :

        <image-slot id={story.img} shape="rounded" radius="20" fit="cover" placeholder={t(['Foto: ', 'Photo: ']) + t(story.title)} style={{ aspectRatio: '3/4', display: 'block', width: '100%', background: 'var(--bg)' }} />
        }
      </div>
    </div>);

}

// ── Ruta RD -> Florida con mapas reales + avion animado ─────────────────────────
function RouteMap({ t }) {
  const card = { position: 'absolute', borderRadius: 16, overflow: 'hidden', border: '3px solid rgba(255,255,255,0.92)', boxShadow: '0 16px 40px rgba(0,0,0,0.45)', background: '#0d0a08' };
  const img = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };
  const pin = { position: 'absolute', fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', color: '#fff', background: 'rgba(20,14,10,0.78)', padding: '3px 9px', borderRadius: 999, whiteSpace: 'nowrap', fontFamily: 'Plus Jakarta Sans,sans-serif' };
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1/0.86', borderRadius: 20, overflow: 'hidden', background: 'radial-gradient(120% 120% at 72% 8%, rgba(245,130,32,0.12), transparent 55%)' }}
      role="img" aria-label={t(['Ruta de vuelo de Santiago, República Dominicana a Florida', 'Flight route from Santiago, Dominican Republic to Florida'])}>

      {/* Florida — arriba izquierda */}
      <div style={{ ...card, top: '4%', left: '2%', width: '54%', aspectRatio: '560/424', transform: 'rotate(-3deg)' }}>
        <img src="assets/map-florida.jpg" alt={t(['Mapa de Florida, Estados Unidos', 'Map of Florida, United States'])} loading="lazy" style={img}/>
        <span style={{ ...pin, bottom: 8, left: 8 }}>Florida, USA</span>
      </div>

      {/* Santiago — abajo derecha (encima) */}
      <div style={{ ...card, bottom: '4%', right: '2%', width: '54%', aspectRatio: '560/373', transform: 'rotate(3deg)', zIndex: 2 }}>
        <img src="assets/map-santiago.jpg" alt={t(['Mapa de Santiago, República Dominicana', 'Map of Santiago, Dominican Republic'])} loading="lazy" style={img}/>
        <span style={{ ...pin, top: 8, left: 8 }}>Santiago, RD</span>
      </div>

      {/* Ruta + avion (overlay) */}
      <svg viewBox="0 0 100 86" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none', overflow: 'visible' }}>
        <defs>
          <linearGradient id="rmRoute" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#F58220"/><stop offset="1" stopColor="#FFD9A8"/>
          </linearGradient>
          <filter id="rmGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feDropShadow dx="0" dy="0" stdDeviation="1.1" floodColor="#F58220" floodOpacity="0.95"/>
          </filter>
        </defs>
        <path id="rmPath" d="M70,60 C55,30 42,26 28,30" fill="none" stroke="url(#rmRoute)" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="0.6 3.2"/>
        {/* avion: viewBox no uniforme, lo dibujo en su propio sistema y lo muevo por la ruta */}
        <g filter="url(#rmGlow)">
          <g transform="scale(0.42)">
            <path d="M0,0 L16,-2.6 C19,-3 20,-1.7 18.5,-0.4 L7,3.6 L3.4,10 L1.2,10 L2.6,3.6 L-5,4.4 L-7.6,7.6 L-9.2,7.6 L-7.6,2.6 L-9.2,-1.7 L-7.6,-1.7 L-5,0.8 L2.6,0 Z" fill="#ffffff" stroke="#E07A1B" strokeWidth="0.7" strokeLinejoin="round"/>
          </g>
          <animateMotion dur="6s" rotate="auto" repeatCount="indefinite" calcMode="linear">
            <mpath href="#rmPath"/>
          </animateMotion>
        </g>
      </svg>
    </div>
  );
}

// ── Main Nosotros page ─────────────────────────────────────────────────────────
function NosotrosApp() {
  const t = useT();
  const [tab, setTab] = useState(() => {
    const p = new URLSearchParams(window.location.search).get('tab');
    return ['historia','impacto','equipo','prensa'].includes(p) ? p : 'historia';
  });
  const TABS = [['historia', t(['📖 Historia', '📖 Our Story'])], ['impacto', t(['❤️ Impacto Social', '❤️ Social Impact'])], ['equipo', t(['👥 Equipo', '👥 Team'])]];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--ink) 0%, #3D2E2A 100%)', paddingTop: 120, paddingBottom: 60 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, background: 'rgba(245,130,32,0.18)', color: 'var(--orange)', fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{t(['Nuestra historia', 'Our story'])}</div>
            <h1 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 'clamp(32px,4.5vw,52px)', fontWeight: 800, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              {t(['De Santiago', 'From Santiago'])}<br />{t(['a ', 'to the '])}<em style={{ fontFamily: 'Instrument Serif,Georgia,serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--orange)' }}>{t(['Estados Unidos', 'United States'])}</em>
            </h1>
            <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,0.7)', margin: '0 0 28px', lineHeight: 1.65, maxWidth: 420 }}>{t(['Más de 12 años repartiendo felicidad, construyendo familias y generando impacto en comunidades que necesitaban un compañero fiel.', 'More than 12 years spreading happiness, building families, and making an impact in communities that needed a faithful companion.'])}

            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[['12+', ['Años de experiencia', 'Years of experience']], ['500+', ['Familias', 'Families']], ['3', ['Ciudades', 'Cities']], ['100%', ['Con amor', 'With love']]].map(([n, l]) =>
              <div key={l[0]}>
                  <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--orange)' }}>{n}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{t(l)}</div>
                </div>
              )}
            </div>
          </div>
          <RouteMap t={t} />
        </div>
      </div>

      {/* Tab nav */}
      <div style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)', position: 'sticky', top: 64, zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {TABS.map(([id, label]) =>
          <button key={id} onClick={() => setTab(id)} style={{ padding: '16px 20px', border: 'none', borderBottom: `2.5px solid ${tab === id ? 'var(--orange)' : 'transparent'}`, background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: tab === id ? 700 : 500, color: tab === id ? 'var(--orange)' : 'var(--ink-2)', whiteSpace: 'nowrap', transition: 'all .15s' }}>
              {label}
            </button>
          )}
        </div>
      </div>

      <div className="container" style={{ padding: '60px 0 80px' }}>

        {/* Historia */}
        {tab === 'historia' &&
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>{t(['Nuestra historia', 'Our story'])}</h2>
              <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.7, margin: '0 0 32px' }}>
                {t(['Haz clic en cada momento para conocer la historia detrás.', 'Click on each moment to discover the story behind it.'])}
              </p>
              <Timeline />
            </div>
            <div>
              <div style={{ background: 'var(--paper)', borderRadius: 24, padding: '28px', boxShadow: '0 4px 32px -8px rgba(45,36,33,0.10)', marginBottom: 24 }}>
                <h3 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 20, fontWeight: 800, color: 'var(--ink)', margin: '0 0 16px' }}>{t(['Nuestra filosofía', 'Our philosophy'])}</h3>
                {[
              ['🐾', ['Crianza en familia', 'Raised in a family'], ['Ningún cachorro nuestro vive en jaula. Todos crecen en hogares reales, con familias humanas, hasta su adopción.', 'None of our puppies live in a cage. They all grow up in real homes, with human families, until they are adopted.']],
              ['💚', ['Salud verificada', 'Verified health'], ['Cada cachorro sale con vacunas al día, desparasitado, microchipado y con certificado veterinario.', 'Every puppy goes home up to date on vaccines, dewormed, microchipped, and with a veterinary health certificate.']],
              ['🤝', ['Adopción responsable', 'Responsible adoption'], ['Hacemos preguntas difíciles. El match correcto familia-mascota es más importante que cerrar una venta.', 'We ask the hard questions. The right family-pet match matters more to us than closing a sale.']],
              ['📞', ['Acompañamiento post-adopción', 'Post-adoption support'], ['Estamos disponibles después de la adopción. Las familias no quedan solas con sus preguntas.', 'We stay available after the adoption. Families are never left alone with their questions.']]].
              map(([ic, title, body]) =>
              <div key={title[0]} style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{ic}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>{t(title)}</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55 }}>{t(body)}</div>
                    </div>
                  </div>
              )}
              </div>
              <figure style={{ margin: 0 }}>
                <div style={{ position: 'relative', maxWidth: 460, margin: '0 auto', borderRadius: 20, overflow: 'hidden', boxShadow: '0 16px 44px -12px rgba(45,36,33,0.28)' }}>
                  <img src="assets/portada-local.jpg" alt={t(['Nuevo local de BPuppy', 'New BPuppy location'])} loading="lazy" style={{ width: '100%', display: 'block' }} />
                  <span style={{ position: 'absolute', top: 14, left: 14, background: 'var(--orange)', color: '#fff', fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 13px', borderRadius: 999, boxShadow: '0 4px 14px rgba(245,130,32,0.4)' }}>{t(['Próximamente', 'Coming soon'])}</span>
                </div>
                <figcaption style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65, marginTop: 16, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>{t(['Nuestro nuevo local abre muy pronto. Desde ahí ofreceremos grooming, hotel para mascotas y day care, y manejaremos todas nuestras operaciones.', 'Our new location opens very soon. From there we’ll offer grooming, a pet hotel and day care, and run all of our operations.'])}</figcaption>
              </figure>
            </div>
          </div>
        }

        {/* Impacto Social */}
        {tab === 'impacto' &&
        <div>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>{t(['Impacto en la comunidad', 'Impact in the community'])}</h2>
              <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: 600, margin: 0 }}>
                {t(['Cada adopción es una historia. Algunas cambian vidas de formas que van más allá de "tener una mascota".', 'Every adoption is a story. Some change lives in ways that go far beyond simply "having a pet".'])}
              </p>
            </div>
            <ImpactStories />
            <div style={{ marginTop: 56, padding: '32px', borderRadius: 20, background: 'var(--paper)', boxShadow: '0 2px 24px -8px rgba(45,36,33,0.10)' }}>
              <h3 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 20, fontWeight: 800, color: 'var(--ink)', margin: '0 0 20px' }}>{t(['Nuestros programas de impacto', 'Our impact programs'])}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
                {[
              ['🧩', ['Programa TEA', 'ASD Program'], ['Matching especializado y descuentos para familias con niños en el espectro autista. ', 'Specialized matching and discounts for families with children on the autism spectrum. ']],
              ['👴', ['Mascotas para mayores', 'Pets for seniors'], ['Descuentos especiales para adultos mayores que adoptan. Incluye guía de cuidado simplificada.', 'Special discounts for seniors who adopt. Includes a simplified care guide.']],
              ['🏠', ['Visitas a refugios', 'Shelter visits'], ['Dos veces al año facilitamos adopciones y participamos en labores de rescate en República Dominicana.', 'Twice a year we facilitate adoptions and take part in rescue efforts in the Dominican Republic.']],
              ['🌱', ['Educación canina', 'Canine education'], ['Talleres gratuitos en escuelas primarias sobre responsabilidad y cuidado animal.', 'Free workshops in elementary schools on animal responsibility and care.']]].
              map(([ic, title, body]) =>
              <div key={title[0]} style={{ padding: '18px', background: 'var(--bg)', borderRadius: 14, border: '1px solid var(--line)' }}>
                    <span style={{ fontSize: 28, display: 'block', marginBottom: 10 }}>{ic}</span>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{t(title)}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.55 }}>{t(body)}</div>
                  </div>
              )}
              </div>
            </div>
          </div>
        }

        {/* Equipo */}
        {tab === 'equipo' &&
        <div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>{t(['Nuestro equipo', 'Our team'])}</h2>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', marginBottom: 48 }}>{t(['Las personas detrás de cada cachorro feliz.', 'The people behind every happy puppy.'])}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 28, marginBottom: 48, maxWidth: 820 }}>
              {TEAM.map((member, i) =>
            <div key={i} style={{ background: 'var(--paper)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 32px -8px rgba(45,36,33,0.13)', border: '1px solid var(--line)' }}>
                  <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--bg-2)' }}>
                    <img src={member.img} alt={member.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(45,36,33,0.72) 100%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px' }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{t(member.role)}</div>
                      <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 'clamp(24px,3vw,32px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1 }}>{member.name}</div>
                    </div>
                  </div>
                  <div style={{ padding: '20px 24px 24px' }}>
                    <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7, margin: 0 }}>{t(member.bio)}</p>
                  </div>
                </div>
            )}
            </div>
            <div style={{ background: 'var(--paper)', borderRadius: 20, padding: '32px', border: '1px solid var(--line)' }}>
              <h3 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 20, fontWeight: 800, color: 'var(--ink)', margin: '0 0 12px' }}>{t(['¿Quieres unirte al equipo?', 'Want to join the team?'])}</h3>
              <p style={{ fontSize: 14.5, color: 'var(--ink-2)', margin: '0 0 18px', lineHeight: 1.65 }}>{t(['Es probable que estemos buscando personas para ser parte del equipo, apasionadas por los animales. Grooming, cuidado de cachorros, adoptions coordinator. Escríbenos.', 'We\'re often looking for animal-loving people to join the team. Grooming, puppy care, adoptions coordinator. Reach out to us.'])}</p>
              <a href="https://wa.me/19294287300" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 12, background: '#25D366', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                💬 {t(['Escribir por WhatsApp', 'Message us on WhatsApp'])}
              </a>
            </div>
          </div>
        }

        {/* Prensa */}
        {tab === 'prensa' &&
        <div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>{t(['En los medios', 'In the media'])}</h2>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', marginBottom: 36 }}>{t(['Lo que han dicho de BPuppy.', 'What others have said about BPuppy.'])}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
              {PRESS.map((p, i) =>
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '18px 24px', background: 'var(--paper)', borderRadius: 14, border: '1px solid var(--line)' }}>
                  <div style={{ flexShrink: 0, fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 13, fontWeight: 800, color: 'var(--orange)', minWidth: 40 }}>{p.year}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{p.source}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', fontStyle: 'italic' }}>{t(p.headline)}</div>
                  </div>
                </div>
            )}
            </div>
            <div style={{ padding: '28px 32px', background: 'var(--paper)', borderRadius: 20, border: '1px solid var(--line)' }}>
              <h3 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 18, fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px' }}>{t(['¿Eres periodista o creador de contenido?', 'Are you a journalist or content creator?'])}</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '0 0 16px', lineHeight: 1.6 }}>{t(['Estamos disponibles para entrevistas, colaboraciones y apariciones en medios sobre adopción responsable, grooming, bienestar animal y la historia de BPuppy.', 'We\'re available for interviews, collaborations, and media appearances on responsible adoption, grooming, animal welfare, and the BPuppy story.'])}</p>
              <a href="https://wa.me/19294287300" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 12, background: 'var(--orange)', color: '#fff', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700, textDecoration: 'none' }}>
                📧 {t(['Contacto de prensa', 'Press contact'])}
              </a>
            </div>
          </div>
        }
      </div>

      {/* Donde estamos */}
      <div style={{ background:'var(--paper)', borderTop:'1px solid var(--line)', marginTop:40 }}>
        <div className="container" style={{ padding:'48px 0 56px' }}>
          <div className="eyebrow" style={{ marginBottom:10 }}>Haines City, FL</div>
          <h2 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:26, fontWeight:800, color:'var(--ink)', margin:'0 0 6px', letterSpacing:'-0.02em' }}>{t(['Donde estamos','Where we are'])}</h2>
          <p style={{ fontSize:14, color:'var(--ink-2)', margin:'0 0 24px' }}>5604 Kalogridis Rd, Haines City, FL 33844</p>
          <div style={{ borderRadius:20, overflow:'hidden', border:'1px solid var(--line)' }}>
            <iframe src="https://maps.google.com/maps?q=5604+Kalogridis+Rd,+Haines+City,+FL+33844&output=embed" width="100%" height="360" style={{ border:0, display:'block' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={t(['Ubicación de BPuppy','BPuppy location'])}></iframe>
          </div>
          <div style={{ marginTop:16, display:'flex', gap:12, flexWrap:'wrap' }}>
            <a href="https://maps.google.com/?q=5604+Kalogridis+Rd+Haines+City+FL+33844" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize:13 }}>{t(['Ver en Google Maps','View on Google Maps'])}</a>
            <a href="https://www.google.com/maps?cid=10300429461328700851" target="_blank" rel="noreferrer" className="btn btn-dark" style={{ fontSize:13 }}>&#11088; {t(['Dejar reseña','Leave a review'])}</a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
        @media (max-width: 768px) {
          .nosotros-hero-grid, .nosotros-historia-grid, .nosotros-impact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>);

}

Object.assign(window, { NosotrosApp, Timeline, ImpactStories });