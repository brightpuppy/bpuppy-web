// nosotros-views.jsx — Página Nosotros / About BPuppy
const { useState, useEffect } = React;

const TIMELINE = [
{ year: '2012', city: 'Santiago, RD', emoji: '🐶', title: 'El primer cachorro', body: 'Todo empezó con una camada de Golden Retrievers en Santiago. Sin experiencia formal, con mucho amor y más preguntas que respuestas. El primer hogar que adoptó un cachorro nuestro se convirtió en familia.' },
{ year: '2015', city: 'Santiago, RD', emoji: '🏪', title: 'El primer local', body: 'Abrimos el primer espacio físico dedicado a crianza y adopción responsable. Lo que era informal se convirtió en un proceso: salud verificada, contratos de adopción, seguimiento post-adopción.' },
{ year: '2018', city: 'Villa Olga, Santiago, RD', emoji: '📈', title: 'Local más grande', body: 'Con la demanda creciendo, expandimos nuestro espacio en Villa Olga, Santiago. Más razas, más familias y un equipo más grande con un propósito más claro: crianza responsable como estilo de vida.' },
{ year: '2020', city: 'USA', emoji: '✈️', title: 'Nos mudamos a USA', body: 'Con la familia creciendo y la visión más clara, cruzamos a los Estados Unidos. El mercado era más exigente, la regulación más estricta y la competencia enorme. Pero también había más familias que buscaban exactamente lo que ofrecemos: cachorros criados en familia, no en jaulas.' },
{ year: '2022', city: 'New York', emoji: '🗽', title: 'Abrimos en New York', body: 'Nueva ciudad, mismo corazón. Abrimos operaciones en New York, llevando nuestra filosofía de crianza responsable a una de las ciudades más exigentes del mundo. Cada cachorro, criado con el mismo amor de siempre.' },
{ year: '2025', city: 'Florida', emoji: '🌴', title: 'Abrimos en Florida', body: 'Lanzamos nuestra operación en Florida con la plataforma digital: BPuppy Social para la comunidad, el blog educativo, la tienda curada y el sistema de citas de grooming online. El sueño de llevar todo a un solo lugar para las familias que confían en nosotros.' }];


const IMPACT_STORIES = [
{ emoji: '🧩', tag: 'Autismo', title: 'Mateo y su Shih Tzu', body: 'Mateo tiene 7 años y TEA nivel 2. Sus padres buscaban una raza calmada y gentil. Trabajamos con su terapeuta para elegir el cachorro correcto. Seis meses después, su madre nos escribió: "Mateo habla más con el perro que con cualquier persona. Es su mejor amigo."', img: 'nosotros-impact-0' },
{ emoji: '👴', tag: 'Adultos mayores', title: 'Jeff & Freda - Lilly', body: 'Entrevistamos a dos adultos mayores que nos contaron de primera mano lo mucho que su mascota Lilly los ha ayudado durante los momentos más difíciles de su vida. Sus testimonios nos recordaron por qué hacemos lo que hacemos — un compañero fiel puede cambiar una vida entera.', img: 'nosotros-impact-1', video: 'rr2gVZjCFWs' },
{ emoji: '🏠', tag: 'Refugio', title: 'Visita al Humane Society Kansas', body: 'Visitamos el Caring Hands Humane Society de Newton, Kansas y entrevistamos a su directora de marketing. Nos habló sobre el increíble trabajo que realizan, cómo gestionan el refugio y su misión de darle una segunda oportunidad a cada animal.', img: 'nosotros-impact-2', video: 'J5Q6c3wy0QE' },
{ emoji: '🎓', tag: 'Educación', title: 'Taller en Lincoln Marti School', hidden: true, body: 'Llevamos un cachorro a una escuela primaria en Hialeah para una charla sobre responsabilidad animal, empatía y cuidado de mascotas. 120 niños, un cachorro, y muchas lágrimas de emoción de los maestros.', img: 'nosotros-impact-3' }];


const TEAM = [
{ name: 'Angelina', role: 'Co-Fundadora & Directora', bio: 'El corazón detrás de BPuppy. Desde 2012, Angelina ha guiado a cientos de familias en encontrar el compañero perfecto. Su enfoque en crianza responsable y bienestar animal define cada decisión que tomamos.', img: 'uploads/Angelina.jpg' },
{ name: 'Luis', role: 'Fundador & CEO', bio: 'La visión detrás del negocio. Luis llevó BPuppy de Santo Domingo a Miami con una misión clara: demostrar que criar con amor y con estándares es la única forma de hacer esto bien. 12+ años construyendo familias.', img: 'uploads/LUIS.jpeg' }];



const PRESS = [
{ source: 'Univision Miami', year: '2023', headline: '"La criadora que llegó de RD y cambió cómo Miami adopta mascotas"' },
{ source: 'El Nuevo Herald', year: '2022', headline: '"BPuppy: el modelo de adopción responsable que crece en el Sur de Florida"' },
{ source: 'Miami Herald', year: '2021', headline: '"Local pet breeder delivers puppies to families during lockdown"' },
{ source: 'NBC Miami', year: '2024', headline: '"Pet social network: BPuppy launches community app for South Florida dog owners"' }];


// ── Timeline ───────────────────────────────────────────────────────────────────
function Timeline() {
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
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: '0 0 6px' }}>{ev.title}</h3>
              {active === i &&
            <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7, margin: 0, animation: 'fadeIn .25s ease' }}>{ev.body}</p>
            }
            </div>
          </div>
        )}
      </div>
    </div>);

}

// ── Impact stories ─────────────────────────────────────────────────────────────
function ImpactStories() {
  function isEducacionVisible() {
    try {
      var d = JSON.parse(localStorage.getItem('bpuppy_publish_v1')) || {};
      return d.sections && d.sections['Nosotros'] && d.sections['Nosotros']['impacto_educacion'] === true;
    } catch(e) { return false; }
  }
  const visibleStories = IMPACT_STORIES.filter(function(s) { return !s.hidden || isEducacionVisible(); });
  const [active, setActive] = useState(0);
  const story = visibleStories[Math.min(active, visibleStories.length - 1)];
  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {visibleStories.map((s, i) =>
        <button key={i} onClick={() => setActive(i)} style={{ padding: '7px 16px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, fontWeight: active === i ? 700 : 500, background: active === i ? 'var(--orange)' : 'var(--bg)', color: active === i ? '#fff' : 'var(--ink-2)', transition: 'all .15s' }}>
            {s.emoji} {s.tag}
          </button>
        )}
      </div>
      <div key={active} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center', animation: 'fadeIn .3s ease' }}>
        <div>
          <div style={{ display: 'inline-block', padding: '3px 12px', borderRadius: 999, background: 'rgba(245,130,32,0.1)', color: 'var(--orange)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>{story.tag}</div>
          <h3 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--ink)', margin: '0 0 14px', letterSpacing: '-0.02em' }}>{story.title}</h3>
          <p style={{ fontSize: 15.5, color: 'var(--ink-2)', lineHeight: 1.75, margin: 0, fontStyle: 'italic', fontFamily: 'Instrument Serif,Georgia,serif' }}>"{story.body}"</p>
        </div>
        {story.video ?
        <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '16/9', position: 'relative' }}>
            <iframe
            src={'https://www.youtube.com/embed/' + story.video + '?rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=es'}
            title={story.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', display: 'block' }} />
          
          </div> :

        <image-slot id={story.img} shape="rounded" radius="20" fit="cover" placeholder={`Foto: ${story.title}`} style={{ aspectRatio: '3/4', display: 'block', width: '100%', background: 'var(--bg)' }} />
        }
      </div>
    </div>);

}

// ── Main Nosotros page ─────────────────────────────────────────────────────────
function NosotrosApp() {
  const [tab, setTab] = useState('historia');
  const TABS = [['historia', '📖 Historia'], ['impacto', '❤️ Impacto Social'], ['equipo', '👥 Equipo']];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--ink) 0%, #3D2E2A 100%)', paddingTop: 120, paddingBottom: 60 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, background: 'rgba(245,130,32,0.18)', color: 'var(--orange)', fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Nuestra historia</div>
            <h1 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 'clamp(32px,4.5vw,52px)', fontWeight: 800, color: '#fff', margin: '0 0 16px', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              De Santiago<br />a <em style={{ fontFamily: 'Instrument Serif,Georgia,serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--orange)' }}>Estados Unidos</em>
            </h1>
            <p style={{ fontSize: 15.5, color: 'rgba(255,255,255,0.7)', margin: '0 0 28px', lineHeight: 1.65, maxWidth: 420 }}>
              Más de 12 años criando cachorros con amor, construyendo familias y generando impacto en comunidades que necesitaban un compañero fiel.
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[['12+', 'Años de experiencia'], ['500+', 'Familias'], ['3', 'Ciudades'], ['100%', 'Con amor']].map(([n, l]) =>
              <div key={l}>
                  <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--orange)' }}>{n}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{l}</div>
                </div>
              )}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {['Equipo BPuppy', 'Nuestro local', 'Con las familias', 'Primera camada'].map((label, i) =>
            <image-slot key={i} id={`nosotros-hero-${i}`} shape="rounded" radius="16" placeholder={label} style={{ aspectRatio: '1', display: 'block' }} />
            )}
          </div>
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
              <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Nuestra historia</h2>
              <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.7, margin: '0 0 32px' }}>
                Haz clic en cada momento para conocer la historia detrás.
              </p>
              <Timeline />
            </div>
            <div>
              <div style={{ background: 'var(--paper)', borderRadius: 24, padding: '28px', boxShadow: '0 4px 32px -8px rgba(45,36,33,0.10)', marginBottom: 24 }}>
                <h3 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 20, fontWeight: 800, color: 'var(--ink)', margin: '0 0 16px' }}>Nuestra filosofía</h3>
                {[
              ['🐾', 'Crianza en familia', 'Ningún cachorro nuestro vive en jaula. Todos crecen en hogares reales, con familias humanas, hasta su adopción.'],
              ['💚', 'Salud verificada', 'Cada cachorro sale con vacunas al día, desparasitado, microchipado y con certificado veterinario.'],
              ['🤝', 'Adopción responsable', 'Hacemos preguntas difíciles. El match correcto familia-mascota es más importante que cerrar una venta.'],
              ['📞', 'Acompañamiento post-adopción', 'Estamos disponibles después de la adopción. Las familias no quedan solas con sus preguntas.']].
              map(([ic, title, body]) =>
              <div key={title} style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{ic}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>{title}</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55 }}>{body}</div>
                    </div>
                  </div>
              )}
              </div>
              <image-slot id="nosotros-filosofia" shape="rounded" radius="20" placeholder="Foto del local o del equipo trabajando" style={{ width: '100%', aspectRatio: '16/9', display: 'block' }} />
            </div>
          </div>
        }

        {/* Impacto Social */}
        {tab === 'impacto' &&
        <div>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Impacto en la comunidad</h2>
              <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.7, maxWidth: 600, margin: 0 }}>
                Cada adopción es una historia. Algunas cambian vidas de formas que van más allá de "tener una mascota".
              </p>
            </div>
            <ImpactStories />
            <div style={{ marginTop: 56, padding: '32px', borderRadius: 20, background: 'var(--paper)', boxShadow: '0 2px 24px -8px rgba(45,36,33,0.10)' }}>
              <h3 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 20, fontWeight: 800, color: 'var(--ink)', margin: '0 0 20px' }}>Nuestros programas de impacto</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
                {[
              ['🧩', 'Programa TEA', 'Matching especializado y descuentos para familias con niños en el espectro autista. '],
              ['👴', 'Mascotas para mayores', 'Descuentos especiales para adultos mayores que adoptan. Incluye guía de cuidado simplificada.'],
              ['🏠', 'Visitas a refugios', 'Dos veces al año facilitamos adopciones y participamos en labores de rescate en República Dominicana.'],
              ['🌱', 'Educación canina', 'Talleres gratuitos en escuelas primarias sobre responsabilidad y cuidado animal.']].
              map(([ic, title, body]) =>
              <div key={title} style={{ padding: '18px', background: 'var(--bg)', borderRadius: 14, border: '1px solid var(--line)' }}>
                    <span style={{ fontSize: 28, display: 'block', marginBottom: 10 }}>{ic}</span>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>{title}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.55 }}>{body}</div>
                  </div>
              )}
              </div>
            </div>
          </div>
        }

        {/* Equipo */}
        {tab === 'equipo' &&
        <div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Nuestro equipo</h2>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', marginBottom: 48 }}>Las personas detrás de cada cachorro feliz.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 28, marginBottom: 48, maxWidth: 820 }}>
              {TEAM.map((member, i) =>
            <div key={i} style={{ background: 'var(--paper)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 32px -8px rgba(45,36,33,0.13)', border: '1px solid var(--line)' }}>
                  <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--bg-2)' }}>
                    <img src={member.img} alt={member.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(45,36,33,0.72) 100%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px' }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{member.role}</div>
                      <div style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 'clamp(24px,3vw,32px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em', lineHeight: 1 }}>{member.name}</div>
                    </div>
                  </div>
                  <div style={{ padding: '20px 24px 24px' }}>
                    <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.7, margin: 0 }}>{member.bio}</p>
                  </div>
                </div>
            )}
            </div>
            <div style={{ background: 'var(--paper)', borderRadius: 20, padding: '32px', border: '1px solid var(--line)' }}>
              <h3 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 20, fontWeight: 800, color: 'var(--ink)', margin: '0 0 12px' }}>¿Quieres unirte al equipo?</h3>
              <p style={{ fontSize: 14.5, color: 'var(--ink-2)', margin: '0 0 18px', lineHeight: 1.65 }}>Es probable que estemos buscando personas para ser parte del equipo, apasionadas por los animales. Grooming, cuidado de cachorros, adoptions coordinator. Escríbenos.</p>
              <a href="https://wa.me/18084928294" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 12, background: '#25D366', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                💬 Escribir por WhatsApp
              </a>
            </div>
          </div>
        }

        {/* Prensa */}
        {tab === 'prensa' &&
        <div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>En los medios</h2>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', marginBottom: 36 }}>Lo que han dicho de BPuppy.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
              {PRESS.map((p, i) =>
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '18px 24px', background: 'var(--paper)', borderRadius: 14, border: '1px solid var(--line)' }}>
                  <div style={{ flexShrink: 0, fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 13, fontWeight: 800, color: 'var(--orange)', minWidth: 40 }}>{p.year}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{p.source}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', fontStyle: 'italic' }}>{p.headline}</div>
                  </div>
                </div>
            )}
            </div>
            <div style={{ padding: '28px 32px', background: 'var(--paper)', borderRadius: 20, border: '1px solid var(--line)' }}>
              <h3 style={{ fontFamily: 'Bricolage Grotesque,sans-serif', fontSize: 18, fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px' }}>¿Eres periodista o creador de contenido?</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '0 0 16px', lineHeight: 1.6 }}>Estamos disponibles para entrevistas, colaboraciones y apariciones en medios sobre adopción responsable, grooming, bienestar animal y la historia de BPuppy.</p>
              <a href="https://wa.me/18084928294" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px', borderRadius: 12, background: 'var(--orange)', color: '#fff', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 700, textDecoration: 'none' }}>
                📧 Contacto de prensa
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
            <iframe src="https://maps.google.com/maps?q=5604+Kalogridis+Rd,+Haines+City,+FL+33844&output=embed" width="100%" height="360" style={{ border:0, display:'block' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="BPuppy ubicacion"></iframe>
          </div>
          <div style={{ marginTop:16, display:'flex', gap:12, flexWrap:'wrap' }}>
            <a href="https://maps.google.com/?q=5604+Kalogridis+Rd+Haines+City+FL+33844" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize:13 }}>{t(['Ver en Google Maps','View on Google Maps'])}</a>
            <a href="https://www.google.com/maps?cid=10300429461328700851" target="_blank" rel="noreferrer" className="btn btn-dark" style={{ fontSize:13 }}>&#11088; {t(['Dejar resena','Leave a review'])}</a>
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