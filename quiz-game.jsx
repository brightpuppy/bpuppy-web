// quiz-game.jsx — Quiz "Encuentra tu match" estilo juego: sonidos, animaciones, claro y para niños.
const { useState, useEffect, useRef } = React;

const Q = [
  { q:['¿Dónde vives?','Where do you live?'], opts:[
    { e:'🏢', l:['Apartamento en ciudad','City apartment'] },
    { e:'🏡', l:['Casa con patio','House with a yard'] },
    { e:'🌳', l:['Casa de campo','Country house'] },
    { e:'🛏️', l:['Estudio pequeño','Small studio'] } ] },
  { q:['¿Para qué quieres un cachorro?','Why do you want a puppy?'], opts:[
    { e:'💕', l:['Compañía en casa','Companionship'] },
    { e:'🏃', l:['Vida activa','Active life'] },
    { e:'🤗', l:['Apoyo emocional','Emotional support'] },
    { e:'👶', l:['Compañero para mis hijos','For my kids'] },
    { e:'🧓', l:['Compañía para un abuelito','For a senior'] } ] },
  { q:['¿Qué pelito te gusta más?','Which coat do you like?'], opts:[
    { e:'✂️', l:['Pelito corto','Short coat'] },
    { e:'🧶', l:['Pelito largo','Long coat'] },
    { e:'🌿', l:['Que no suelte pelo','Hypoallergenic'] },
    { e:'✨', l:['¡El que sea, lindo!','Any, cute!'] } ] },
  { q:['¿Cuánto vas a jugar y pasear?','How much will you play & walk?'], opts:[
    { e:'🚶', l:['Paseos cortos','Short walks'] },
    { e:'🎾', l:['Paseos medianos','Medium walks'] },
    { e:'🏃‍♂️', l:['¡Mucho ejercicio!','Lots of exercise'] },
    { e:'⛰️', l:['Todo el día afuera','All day outside'] } ] },
  { q:['¿Has tenido perritos antes?','Have you had dogs before?'], opts:[
    { e:'🐣', l:['Es mi primero','My first one'] },
    { e:'🐕', l:['Un poco','A little'] },
    { e:'🎓', l:['¡Mucho!','A lot!'] } ] },
  { q:['¿De qué tamaño lo quieres?','What size do you want?'], opts:[
    { e:'🐾', l:['Pequeñito','Small'] },
    { e:'🐕', l:['Mediano','Medium'] },
    { e:'🦮', l:['Grandote','Large'] },
    { e:'✨', l:['¡Sorpréndeme!','Surprise me!'] } ] },
  { q:['¿Hay niños en tu casa?','Are there kids at home?'], opts:[
    { e:'👶', l:['Sí, chiquitos','Yes, little ones'] },
    { e:'🧒', l:['Sí, medianos','Yes, school age'] },
    { e:'👦', l:['Adolescentes','Teens'] },
    { e:'🙋', l:['No hay niños','No kids'] } ] },
  { q:['¿Necesitas un perro de apoyo especial?','Need a special-support dog?'], opts:[
    { e:'💆', l:['Apoyo emocional','Emotional support'] },
    { e:'🧩', l:['Para alguien autista','For someone autistic'] },
    { e:'🤝', l:['Ayuda a un abuelito','Help a senior'] },
    { e:'🐶', l:['No, un amigo normal','No, just a friend'] } ] },
  { q:['¿Cuánto tiempo le vas a dedicar?','How much time can you give?'], opts:[
    { e:'⏱️', l:['Poquito','A little'] },
    { e:'🕐', l:['Medio','Some'] },
    { e:'🕑', l:['Bastante','Quite a bit'] },
    { e:'💯', l:['¡Todo el día!','All day!'] } ] },
  { q:['¿Cómo quieres que sea?','How do you want it to be?'], opts:[
    { e:'🥰', l:['Cariñoso y tranquilo','Cuddly & calm'] },
    { e:'⚡', l:['Juguetón y con energía','Playful & energetic'] },
    { e:'🛡️', l:['Protector y leal','Loyal & protective'] },
    { e:'🐺', l:['Independiente','Independent'] } ] },
];

const BREEDS = [
  { name:'Golden Retriever', art:1, match:96, emoji:'🦴', img:'https://bpuppy.us/fotos-raw/p05.webp',
    desc:['Cariñoso, inteligente y perfecto para familias. Le encantan los niños.','Affectionate, smart and perfect for families. Loves kids.'],
    size:['Grande','Large'], energy:['Alta','High'],
    facts:[['Les encanta nadar y traer la pelota una y otra vez 🎾','They love to swim and fetch over and over 🎾'],
           ['Son tan listos que aprenden trucos rapidísimo 🧠','So smart they learn tricks super fast 🧠'],
           ['De cachorros parecen peluches dorados 🧸','As puppies they look like golden teddy bears 🧸']] },
  { name:'French Bulldog', art:2, match:92, emoji:'🦇', img:'https://bpuppy.us/fotos-raw/p14.webp',
    desc:['Compacto, cariñoso y feliz en espacios pequeños. Ama el sofá.','Compact, affectionate and happy in small spaces. Loves the couch.'],
    size:['Pequeño','Small'], energy:['Baja','Low'],
    facts:[['Tienen orejitas de murciélago muy graciosas 🦇','They have funny little bat ears 🦇'],
           ['A veces roncan cuando duermen 😴','Sometimes they snore when they sleep 😴'],
           ['No necesitan mucho ejercicio, ¡aman descansar! 🛋️','They don’t need much exercise, they love to rest! 🛋️']] },
  { name:'Cavalier King Charles', art:0, match:89, emoji:'👑', img:'https://bpuppy.us/fotos-raw/p20.webp',
    desc:['Dulce, tranquilo y el rey de los abrazos. Ideal para apoyo emocional.','Sweet, calm and the king of cuddles. Great for emotional support.'],
    size:['Pequeño','Small'], energy:['Media','Moderate'],
    facts:[['Siempre quieren estar cerca de ti 🤗','They always want to be near you 🤗'],
           ['Su pelito es suavecito como la seda 🧶','Their coat is silky soft 🧶'],
           ['Te siguen a todas partes como sombras 🐾','They follow you everywhere like little shadows 🐾']] },
  { name:'Labrador Retriever', art:3, match:94, emoji:'💦', img:'https://bpuppy.us/fotos-raw/p08.webp',
    desc:['Activo, sociable y muy entrenable. El mejor amigo para jugar.','Active, social and very trainable. The best playmate.'],
    size:['Grande','Large'], energy:['Alta','High'],
    facts:[['¡Aman el agua y los charcos! 💦','They love water and puddles! 💦'],
           ['Pueden cargar cosas suavecito con la boca 🦴','They can carry things gently in their mouth 🦴'],
           ['Son perfectos para correr y jugar en el parque 🏃','Perfect for running and playing at the park 🏃']] },
  { name:'Poodle (Caniche)', art:4, match:91, emoji:'🌟', img:'https://bpuppy.us/fotos-raw/p29.webp',
    desc:['Su pelito rizado casi no suelta pelo. Súper inteligente y elegante.','Their curly coat barely sheds. Super smart and elegant.'],
    size:['Variable','Varies'], energy:['Media','Moderate'],
    facts:[['Su pelo rizado casi no suelta pelo 🌀','Their curly coat barely sheds 🌀'],
           ['Son de los perros más inteligentes del mundo 🧠','One of the smartest dog breeds in the world 🧠'],
           ['Vienen en grande, mediano y mini ✨','They come in standard, medium and mini ✨']] },
  { name:'Beagle', art:7, match:87, emoji:'👃', img:'https://bpuppy.us/fotos-raw/p32.webp',
    desc:['Juguetón, curioso y excelente con niños. ¡Pura personalidad!','Playful, curious and great with kids. Full of personality!'],
    size:['Mediano','Medium'], energy:['Alta','High'],
    facts:[['Tienen un olfato súper poderoso 👃','They have a super powerful sense of smell 👃'],
           ['Sus orejas largas son adorables 👂','Their long ears are adorable 👂'],
           ['Les encanta explorar y oler TODO 🔎','They love to explore and sniff EVERYTHING 🔎']] },
];

// ── Sonidos (WebAudio sintetizado, sin archivos) ────────────────────────────
let _ac = null;
const ac = () => { try { if(!_ac) _ac = new (window.AudioContext || window.webkitAudioContext)(); return _ac; } catch(e){ return null; } };
const beep = (freq, dur, type, when, gain) => {
  if (window._quizMuted) return;
  const c = ac(); if(!c) return;
  try { if(c.state === 'suspended') c.resume(); } catch(e){}
  const o = c.createOscillator(), g = c.createGain();
  o.type = type||'triangle'; o.frequency.value = freq;
  o.connect(g); g.connect(c.destination);
  const t0 = c.currentTime + (when||0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain||0.06, t0+0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0+(dur||0.12));
  o.start(t0); o.stop(t0+(dur||0.12)+0.03);
};
const sndPick = () => { beep(540,0.09,'triangle',0,0.05); beep(810,0.10,'triangle',0.05,0.05); };
const sndBack = () => { beep(360,0.10,'sine',0,0.04); };
const sndWin  = () => { [523,659,784,1047,1319].forEach((f,i)=>beep(f,0.22,'triangle',i*0.11,0.07)); };

function ensureCss(){
  if (document.getElementById('qg-css')) return;
  const s = document.createElement('style'); s.id='qg-css';
  s.textContent = `
    @keyframes qgPop { from{opacity:0;transform:scale(.92) translateY(10px)} to{opacity:1;transform:none} }
    @keyframes qgFloat { 0%{transform:translateY(0) rotate(0)} 100%{transform:translateY(-120vh) rotate(360deg)} }
    @keyframes qgBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    .qg-pop{ animation:qgPop .32s cubic-bezier(.34,1.56,.64,1) both }
    .qg-opt{ transition:transform .12s, border-color .15s, background .15s }
    .qg-opt:hover{ transform:translateY(-3px) }
    .qg-opt:active{ transform:scale(.97) }
  `;
  document.head.appendChild(s);
}

function Confetti(){
  const items = Array.from({length:28});
  const emojis = ['🐾','🎉','⭐','🦴','💛','🧡'];
  return (
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', overflow:'hidden', zIndex:40 }}>
      {items.map((_,i)=>{ const left=Math.random()*100, d=2+Math.random()*2.5, delay=Math.random()*0.6, sz=16+Math.random()*18;
        return <span key={i} style={{ position:'absolute', left:left+'%', bottom:'-40px', fontSize:sz, animation:`qgFloat ${d}s ${delay}s ease-in forwards` }}>{emojis[i%emojis.length]}</span>; })}
    </div>
  );
}

function QuizGame(){
  const t = useT();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(Q.length).fill(null));
  const [result, setResult] = useState(false);
  const [muted, setMuted] = useState(false);
  const [confetti, setConfetti] = useState(false);
  useEffect(()=>{ ensureCss(); }, []);
  useEffect(()=>{ window._quizMuted = muted; }, [muted]);

  const choose = (i) => {
    sndPick();
    const a = answers.slice(); a[step] = i; setAnswers(a);
    setTimeout(()=>{
      if (step < Q.length-1) setStep(step+1);
      else { setResult(true); setConfetti(true); sndWin(); setTimeout(()=>setConfetti(false), 4000); }
    }, 240);
  };
  const back = () => { if(step>0){ sndBack(); setStep(step-1); } };
  const reset = () => { sndBack(); setStep(0); setAnswers(Array(Q.length).fill(null)); setResult(false); };

  const breedFor = () => {
    const a = answers;
    if (a[2] === 2) return BREEDS[4];
    if ((a[0] === 0 || a[0] === 3) && a[3] === 0) return BREEDS[1];
    if (a[7] === 0 || a[7] === 1) return BREEDS[2];
    if (a[1] === 1 && a[3] >= 2) return BREEDS[3];
    if (a[6] === 0 || a[6] === 1 || a[1] === 3) return BREEDS[0];
    if (a[9] === 1) return BREEDS[5];
    return BREEDS[0];
  };

  const pct = Math.round(((result ? Q.length : step) / Q.length) * 100);

  const wrap = { maxWidth:560, margin:'0 auto', padding:'24px 18px 80px' };
  if (result) {
    const b = breedFor();
    return (
      <div style={wrap}>
        {confetti && <Confetti/>}
        <div className="qg-pop" style={{ background:'#fff', borderRadius:28, border:'1px solid var(--line)', overflow:'hidden', boxShadow:'0 10px 40px rgba(45,36,33,0.1)' }}>
          <div style={{ background:'linear-gradient(135deg,#F58220,#E85D75)', padding:'30px 24px 26px', textAlign:'center', color:'#fff' }}>
            <div style={{ fontSize:13, fontWeight:800, letterSpacing:'.12em', textTransform:'uppercase', opacity:.9 }}>{t(['¡Tu match perfecto!','Your perfect match!'])}</div>
            <div style={{ fontSize:64, margin:'6px 0', animation:'qgBounce 1.6s ease-in-out infinite' }}>{b.emoji}</div>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:30, fontWeight:800, letterSpacing:'-0.02em' }}>{b.name}</div>
            <div style={{ display:'inline-block', marginTop:8, background:'rgba(255,255,255,0.22)', borderRadius:999, padding:'4px 14px', fontSize:14, fontWeight:800 }}>{b.match}% {t(['compatible','match'])}</div>
          </div>
          <div style={{ padding:'22px 24px 26px' }}>
            <img src={b.img} alt="" style={{ width:'100%', height:200, objectFit:'cover', borderRadius:18, marginBottom:16 }}/>
            <p style={{ fontSize:15.5, color:'var(--ink-2)', lineHeight:1.6, margin:'0 0 16px' }}>{t(b.desc)}</p>
            <div style={{ display:'flex', gap:8, marginBottom:18 }}>
              <span style={{ flex:1, textAlign:'center', background:'var(--paper)', borderRadius:12, padding:'10px', fontSize:13, color:'var(--ink)' }}><div style={{ fontSize:11, color:'var(--ink-soft)' }}>{t(['Tamaño','Size'])}</div><b>{t(b.size)}</b></span>
              <span style={{ flex:1, textAlign:'center', background:'var(--paper)', borderRadius:12, padding:'10px', fontSize:13, color:'var(--ink)' }}><div style={{ fontSize:11, color:'var(--ink-soft)' }}>{t(['Energía','Energy'])}</div><b>{t(b.energy)}</b></span>
            </div>
            <div style={{ background:'#FFF7EE', border:'1.5px solid rgba(245,130,32,0.25)', borderRadius:16, padding:'16px 18px', marginBottom:20 }}>
              <div style={{ fontSize:13, fontWeight:800, color:'var(--orange2,#C2521E)', marginBottom:10 }}>{t(['🐶 Datos divertidos para conocer mejor a tu raza','🐶 Fun facts to get to know your breed'])}</div>
              {b.facts.map((f,i)=>(
                <div key={i} style={{ display:'flex', gap:10, marginBottom:8, alignItems:'flex-start' }}>
                  <span style={{ flexShrink:0, color:'#F58220', fontWeight:900 }}>{i+1}</span>
                  <span style={{ fontSize:14, color:'var(--ink)', lineHeight:1.5 }}>{t(f)}</span>
                </div>
              ))}
            </div>
            <a href={`/blog?art=${b.art}`} style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:14, fontWeight:700, color:'var(--orange)', marginBottom:18 }}>{t(['Aprende más sobre esta raza','Learn more about this breed'])} →</a>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <a href="/solicitud" className="btn btn-primary" style={{ flex:1, justifyContent:'center', minWidth:180 }}>{t(['Quiero un '+b.name.split(' (')[0],'I want a '+b.name.split(' (')[0]])}</a>
              <button onClick={reset} className="btn btn-outline" style={{ cursor:'pointer' }}>{t(['Jugar otra vez','Play again'])}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cur = Q[step];
  return (
    <div style={wrap}>
      {/* Header del juego */}
      <div style={{ textAlign:'center', marginBottom:22 }}>
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(28px,5vw,40px)', fontWeight:800, letterSpacing:'-0.03em', color:'var(--ink)' }}>{t(['Encuentra tu','Find your'])} <span style={{ color:'var(--orange)' }}>{t(['cachorro ideal','perfect puppy'])}</span> 🐾</div>
        <p style={{ color:'var(--ink-soft)', fontSize:15, margin:'6px 0 0' }}>{t(['Un juego rápido y divertido para toda la familia','A quick, fun game for the whole family'])}</p>
      </div>

      <div className="qg-pop" key={step} style={{ background:'#fff', borderRadius:28, border:'1px solid var(--line)', padding:'26px 22px 24px', boxShadow:'0 6px 30px rgba(45,36,33,0.08)' }}>
        {/* Progreso con patitas */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
          <div style={{ flex:1, height:10, borderRadius:999, background:'var(--paper)', overflow:'hidden' }}>
            <div style={{ height:'100%', width:pct+'%', borderRadius:999, background:'linear-gradient(90deg,#F58220,#E85D75)', transition:'width .35s cubic-bezier(.34,1.56,.64,1)' }}/>
          </div>
          <span style={{ fontSize:13, fontWeight:800, color:'var(--orange)' }}>{step+1}/{Q.length}</span>
          <button onClick={()=>setMuted(m=>!m)} title={muted?'Activar sonido':'Silenciar'} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--ink-soft)', display:'inline-flex', padding:4 }}>
            {muted
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>}
          </button>
        </div>

        <h3 style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(20px,3.2vw,26px)', fontWeight:700, lineHeight:1.25, margin:'0 0 18px', color:'var(--ink)' }}>{t(cur.q)}</h3>

        <div style={{ display:'grid', gap:11 }}>
          {cur.opts.map((opt,i)=>{ const sel = answers[step]===i; return (
            <button key={i} onClick={()=>choose(i)} className="qg-opt" style={{ display:'flex', alignItems:'center', gap:14, padding:'15px 16px', borderRadius:16, background: sel?'rgba(245,130,32,0.08)':'var(--paper)', border:`2px solid ${sel?'var(--orange)':'transparent'}`, textAlign:'left', cursor:'pointer', fontFamily:'inherit' }}>
              <span style={{ fontSize:30, flexShrink:0 }}>{opt.e}</span>
              <span style={{ flex:1, fontSize:16, fontWeight:700, color:'var(--ink)' }}>{t(opt.l)}</span>
              <span style={{ width:26, height:26, borderRadius:'50%', border:`2px solid ${sel?'var(--orange)':'var(--line)'}`, background:sel?'var(--orange)':'transparent', display:'grid', placeItems:'center', flexShrink:0 }}>
                {sel && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 6.5"/></svg>}
              </span>
            </button>
          ); })}
        </div>

        <div style={{ marginTop:18, textAlign:'left' }}>
          <button onClick={back} disabled={step===0} style={{ background:'none', border:'none', color:'var(--ink-soft)', fontSize:14, fontWeight:600, cursor: step===0?'default':'pointer', opacity: step===0?0:1, fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:6 }}>← {t(['Atrás','Back'])}</button>
        </div>
      </div>
    </div>
  );
}

function QuizGameRoot(){
  const [lang, setLang] = useState('es');
  useEffect(()=>{ document.documentElement.lang = lang; }, [lang]);
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Header overDark={false}/>
      <main style={{ paddingTop:80, background:'var(--bg,#fff)', minHeight:'100vh' }}><QuizGame/></main>
      <Footer/>
    </LangContext.Provider>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<QuizGameRoot/>);
