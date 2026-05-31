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
  { name:'Golden Retriever', key:'golden', art:1, match:96, tone:'#E8A53D', img:'fotos-razas/Golden Retriever.webp',
    desc:['Cariñoso, inteligente y perfecto para familias. Le encantan los niños.','Affectionate, smart and perfect for families. Loves kids.'],
    size:['Grande','Large'], energy:['Alta','High'],
    facts:[['Les encanta nadar y traer la pelota una y otra vez.','They love to swim and fetch over and over.'],
           ['Son tan listos que aprenden trucos rapidísimo.','So smart they learn tricks super fast.'],
           ['De cachorros parecen peluches dorados.','As puppies they look like golden teddy bears.']] },
  { name:'French Bulldog', key:'frenchie', art:2, match:92, tone:'#B8B0A4', img:'fotos-razas/French Bulldog.webp',
    desc:['Compacto, cariñoso y feliz en espacios pequeños. Ama el sofá.','Compact, affectionate and happy in small spaces. Loves the couch.'],
    size:['Pequeño','Small'], energy:['Baja','Low'],
    facts:[['Tienen orejitas de murciélago muy graciosas.','They have funny little bat ears.'],
           ['A veces roncan cuando duermen.','Sometimes they snore when they sleep.'],
           ['No necesitan mucho ejercicio, ¡aman descansar!','They don’t need much exercise, they love to rest!']] },
  { name:'Cavalier King Charles', key:'cavalier', art:0, match:89, tone:'#C9663B', img:'fotos-razas/Cavalier King Charles Spaniel.webp',
    desc:['Dulce, tranquilo y el rey de los abrazos. Ideal para apoyo emocional.','Sweet, calm and the king of cuddles. Great for emotional support.'],
    size:['Pequeño','Small'], energy:['Media','Moderate'],
    facts:[['Siempre quieren estar cerca de ti.','They always want to be near you.'],
           ['Su pelito es suavecito como la seda.','Their coat is silky soft.'],
           ['Te siguen a todas partes como sombras.','They follow you everywhere like little shadows.']] },
  { name:'Labrador Retriever', key:'labrador', art:3, match:94, tone:'#3B2E26', img:'fotos-razas/Labrador Retriever.webp',
    desc:['Activo, sociable y muy entrenable. El mejor amigo para jugar.','Active, social and very trainable. The best playmate.'],
    size:['Grande','Large'], energy:['Alta','High'],
    facts:[['¡Aman el agua y los charcos!','They love water and puddles!'],
           ['Pueden cargar cosas suavecito con la boca.','They can carry things gently in their mouth.'],
           ['Son perfectos para correr y jugar en el parque.','Perfect for running and playing at the park.']] },
  { name:'Poodle (Caniche)', key:'poodle', art:4, match:91, tone:'#E8DCC8', img:'fotos-razas/Standard Poodle.webp',
    desc:['Su pelito rizado casi no suelta pelo. Súper inteligente y elegante.','Their curly coat barely sheds. Super smart and elegant.'],
    size:['Variable','Varies'], energy:['Media','Moderate'],
    facts:[['Su pelo rizado casi no suelta pelo.','Their curly coat barely sheds.'],
           ['Son de los perros más inteligentes del mundo.','One of the smartest dog breeds in the world.'],
           ['Vienen en grande, mediano y mini.','They come in standard, medium and mini.']] },
  { name:'Beagle', key:'beagle', art:7, match:87, tone:'#C98A4B', img:'fotos-razas/Beagle.webp',
    desc:['Juguetón, curioso y excelente con niños. ¡Pura personalidad!','Playful, curious and great with kids. Full of personality!'],
    size:['Mediano','Medium'], energy:['Alta','High'],
    facts:[['Tienen un olfato súper poderoso.','They have a super powerful sense of smell.'],
           ['Sus orejas largas son adorables.','Their long ears are adorable.'],
           ['Les encanta explorar y oler TODO.','They love to explore and sniff EVERYTHING.']] },
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
const sndJump = () => { beep(420,0.10,'square',0,0.05); beep(680,0.10,'square',0.05,0.05); };
const sndCoin = () => { beep(988,0.07,'square',0,0.05); beep(1319,0.12,'square',0.06,0.05); };
const sndStep = () => { beep(180,0.04,'square',0,0.025); };
const sndOver = () => { [392,330,262,196].forEach((f,i)=>beep(f,0.18,'square',i*0.12,0.06)); };
const sndPrize= () => { [659,784,988,1319,1568].forEach((f,i)=>beep(f,0.18,'square',i*0.09,0.06)); };

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

// ── Mini-juego retro: corre con tu raza ─────────────────────────────────────
const GAME_SUPA_URL = "https://oqqwmcplljirbreowrll.supabase.co";
const GAME_SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
let _gameSupa = null;
const gameSupa = () => { try { if(!_gameSupa && window.supabase) _gameSupa = window.supabase.createClient(GAME_SUPA_URL, GAME_SUPA_KEY); } catch(e){} return _gameSupa; };

const COUNTRIES = ['Estados Unidos','México','Colombia','Argentina','España','Perú','Chile','Venezuela','Ecuador','Guatemala','Cuba','Bolivia','República Dominicana','Honduras','Paraguay','El Salvador','Nicaragua','Costa Rica','Panamá','Uruguay','Puerto Rico','Brasil','Canadá','Otro'];
const CITY_HINTS = ['Miami','Orlando','Houston','Los Ángeles','Nueva York','Chicago','Ciudad de México','Guadalajara','Bogotá','Medellín','Buenos Aires','Madrid','Barcelona','Lima','Santiago','Caracas','Quito','San Juan'];

// Dibuja un perrito pixel-art según la raza
function drawDog(ctx, x, baseY, tone, key, frame, airborne){
  const P = 3; // tamaño de "pixel"
  const px = (cx,cy,w,h,col)=>{ ctx.fillStyle=col; ctx.fillRect(Math.round(x+cx*P), Math.round(baseY+cy*P), w*P, h*P); };
  const dark = '#2D2421', white = '#FBF7F0', nose = '#2D2421';
  // patas (animadas)
  const legUp = airborne ? 1 : (frame%2===0?0:1);
  px(2, 0, 2, 2, dark);                 // pata trasera
  px(8, 0+(legUp?0:0), 2, 2-legUp, dark); // pata delantera
  px(2, -1, 2, 1, dark);
  // cuerpo
  px(1, -6, 11, 6, tone);
  px(1, -7, 11, 1, tone);
  // cola
  if(key==='poodle'){ px(0, -8, 2, 2, white); }
  else { px(-1, -7, 2, 2, tone); }
  // cabeza
  px(9, -11, 6, 5, tone);
  px(10, -12, 4, 1, tone);
  // hocico
  px(14, -9, 3, 2, key==='beagle'? white : tone);
  px(16, -9, 1, 1, nose);
  // ojo
  px(12, -10, 1, 1, dark);
  // orejas según raza
  if(key==='frenchie'){ px(9,-13,2,2,tone); px(13,-13,2,2,tone); }       // orejas de murciélago
  else if(key==='cavalier'||key==='beagle'){ px(8,-11,2,4,key==='beagle'?'#8a5a32':'#7a3d22'); px(14,-11,2,4,key==='beagle'?'#8a5a32':'#7a3d22'); } // orejas largas
  else if(key==='poodle'){ px(9,-13,3,3,white); px(13,-13,2,2,white); }   // pompón
  else { px(8,-12,2,3,tone); px(14,-12,2,3,tone); }                       // orejas medianas (golden/lab)
  if(key==='golden'){ px(0,-6,1,6,'#cf8f2e'); }                            // flequillo dorado
}

function BreedRunner({ breed, t, lang, onCreateProfile, prefillEmail }){
  const tone = breed.tone || '#E8A53D';
  const cvsRef = useRef(null);
  const stRef = useRef(null);
  const rafRef = useRef(0);
  const [phase, setPhase] = useState('ready'); // ready | playing | over
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => { try { return parseInt(localStorage.getItem('bp_game_best')||'0',10)||0; } catch(e){ return 0; } });
  // scoreboard
  const [board, setBoard] = useState([]);
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const W = 360, H = 200, GY = H - 26; // ground line

  const loadBoard = () => {
    const s = gameSupa(); if(!s) return;
    s.from('game_scores').select('name,country,city,score,breed').order('score',{ascending:false}).limit(10)
      .then(({data})=>{ if(data) setBoard(data); }).catch(()=>{});
  };
  useEffect(()=>{ loadBoard(); }, []);

  const newState = () => ({
    py: 0, vy: 0, airborne: false, frame: 0, fcount: 0,
    speed: 2.0, dist: 0, score: 0, coins: 0,
    obst: [], coinArr: [], clouds: [{x:60,y:30},{x:200,y:48},{x:320,y:24}],
    nextObst: 90, nextCoin: 140, over: false, t0: 0,
  });

  const jump = () => {
    const st = stRef.current; if(!st || st.over) return;
    if(!st.airborne){ st.vy = 7.4; st.airborne = true; sndJump(); }
  };

  const endGame = (finalScore) => {
    setPhase('over'); setScore(finalScore); sndOver();
    setTimeout(()=>sndPrize(), 350);
    try { const b = Math.max(finalScore, parseInt(localStorage.getItem('bp_game_best')||'0',10)||0); localStorage.setItem('bp_game_best', String(b)); setBest(b); } catch(e){}
    if (prefillEmail && !name) { /* leave name editable */ }
  };

  const start = () => {
    try { const c = ac(); if(c && c.state==='suspended') c.resume(); } catch(e){}
    stRef.current = newState();
    setScore(0); setSaved(false); setPhase('playing');
  };

  // game loop
  useEffect(()=>{
    if (phase !== 'playing') return;
    const cvs = cvsRef.current; if(!cvs) return;
    const ctx = cvs.getContext('2d');
    // Render a mayor resolución para que se vea más nítido (menos pixelado)
    const DPR = Math.min(window.devicePixelRatio || 1, 2) * 1.5;
    cvs.width = W * DPR; cvs.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.imageSmoothingEnabled = true;
    let running = true;
    const loop = () => {
      if(!running) return;
      const st = stRef.current; if(!st){ return; }
      // ── update ──
      st.dist += st.speed;
      // dificultad: arranca suave, sube gradualmente con tope justo
      st.speed = 2.0 + Math.min(st.dist/1600, 3.0);
      // física salto
      st.vy -= 0.42; st.py += st.vy;
      if(st.py <= 0){ st.py = 0; st.vy = 0; st.airborne = false; }
      // pasos / animación
      st.fcount++; if(st.fcount % Math.max(4, 9-Math.floor(st.speed)) === 0){ st.frame++; if(!st.airborne && st.fcount%18===0) sndStep(); }
      // nubes parallax
      st.clouds.forEach(c=>{ c.x -= st.speed*0.25; if(c.x < -40){ c.x = W+20; c.y = 18+Math.random()*40; } });
      // obstáculos
      st.nextObst -= st.speed;
      if(st.nextObst <= 0){
        const h = 14 + Math.floor(Math.random()*16);
        st.obst.push({ x: W+10, w: 10+Math.floor(Math.random()*8), h });
        const gapMin = 150 - Math.min(st.speed*10, 50);
        st.nextObst = gapMin + Math.random()*120;
      }
      st.obst.forEach(o=>{ o.x -= st.speed; });
      st.obst = st.obst.filter(o=> o.x + o.w > -4);
      // monedas (huesos)
      st.nextCoin -= st.speed;
      if(st.nextCoin <= 0){ st.coinArr.push({ x: W+10, y: GY - (24+Math.random()*40), got:false }); st.nextCoin = 110 + Math.random()*160; }
      st.coinArr.forEach(c=>{ c.x -= st.speed; });
      st.coinArr = st.coinArr.filter(c=> c.x > -10 && !c.got);
      // dog hitbox
      const dogX = 46, dogW = 34, dogH = 30;
      const dogBottom = GY - st.py; const dogTop = dogBottom - dogH; const dogLeft = dogX, dogRight = dogX + dogW - 8;
      // colisión obstáculos
      for(const o of st.obst){
        const oTop = GY - o.h;
        if(dogRight > o.x+2 && dogLeft < o.x+o.w-2 && dogBottom > oTop+3){ st.over = true; break; }
      }
      // recoger monedas
      for(const c of st.coinArr){ if(!c.got && Math.abs((c.x) - (dogX+14)) < 14 && Math.abs(c.y - (dogBottom-14)) < 18){ c.got = true; st.coins += 5; sndCoin(); } }
      // score
      st.score = Math.floor(st.dist/10) + st.coins;
      if(st.fcount % 6 === 0) setScore(st.score);

      // ── render ──
      // cielo
      const grd = ctx.createLinearGradient(0,0,0,H); grd.addColorStop(0,'#BFE3F2'); grd.addColorStop(1,'#EAF6FB');
      ctx.fillStyle = grd; ctx.fillRect(0,0,W,H);
      // sol
      ctx.fillStyle='#FFD98A'; ctx.fillRect(W-46,18,18,18);
      // nubes pixel
      ctx.fillStyle='#FFFFFF'; st.clouds.forEach(c=>{ ctx.fillRect(c.x,c.y,18,6); ctx.fillRect(c.x+6,c.y-5,12,6); });
      // suelo
      ctx.fillStyle='#9BD46B'; ctx.fillRect(0,GY+6,W,H-GY-6);
      ctx.fillStyle='#7CC04E'; ctx.fillRect(0,GY+6,W,4);
      ctx.fillStyle='#6B4A2B'; ctx.fillRect(0,GY+10,W,H-GY-10);
      // textura de suelo en movimiento
      ctx.fillStyle='#5c3f24'; const off = Math.floor(st.dist) % 16; for(let gx=-off; gx<W; gx+=16){ ctx.fillRect(gx,GY+14,8,3); }
      // obstáculos (arbustos pixel)
      st.obst.forEach(o=>{ const oy = GY - o.h; ctx.fillStyle='#3C7A3C'; ctx.fillRect(o.x,oy,o.w,o.h); ctx.fillStyle='#4E994E'; ctx.fillRect(o.x,oy,o.w,4); ctx.fillStyle='#2F5F2F'; ctx.fillRect(o.x+2,oy+o.h-4,o.w-4,4); });
      // monedas (huesos)
      st.coinArr.forEach(c=>{ if(c.got) return; ctx.fillStyle='#F7E08A'; ctx.fillRect(c.x,c.y,8,4); ctx.fillStyle='#E8C04A'; ctx.fillRect(c.x-1,c.y-1,3,6); ctx.fillRect(c.x+6,c.y-1,3,6); });
      // perrito
      drawDog(ctx, dogX, GY - st.py, tone, breed.key, st.frame, st.airborne);

      if(st.over){ running = false; endGame(st.score); return; }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  }, [phase]);

  // controles
  useEffect(()=>{
    const onKey = (e)=>{ if(e.code==='Space' || e.code==='ArrowUp'){ e.preventDefault(); if(phase==='playing') jump(); else if(phase!=='over') start(); } };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  }, [phase]);

  const tap = () => { if(phase==='playing') jump(); else if(phase==='ready') start(); };

  const submitScore = () => {
    const s = gameSupa(); const nm = name.trim();
    if(!nm){ return; }
    setSaving(true);
    const row = { name: nm.slice(0,40), country: country||null, city: city.trim()||null, breed: breed.name, score };
    if(prefillEmail) row.email = prefillEmail;
    const done = ()=>{ setSaving(false); setSaved(true); loadBoard(); try{ localStorage.setItem('bp_game_player', JSON.stringify({name:nm,country,city})); }catch(e){} };
    if(s){ s.from('game_scores').insert(row).then(({error})=>{ done(); }).catch(()=>{ setSaving(false); setSaved(true); }); }
    else { done(); }
  };

  // prefill player identity
  useEffect(()=>{ try{ const p=JSON.parse(localStorage.getItem('bp_game_player')||'null'); if(p){ setName(p.name||''); setCountry(p.country||''); setCity(p.city||''); } }catch(e){} }, []);

  const cardSt = { background:'#fff', borderRadius:24, border:'1px solid var(--line)', overflow:'hidden', boxShadow:'0 10px 40px rgba(45,36,33,0.12)' };
  const firstName = breed.name.split(' (')[0];

  return (
    <div style={{ maxWidth:560, margin:'0 auto', padding:'18px 16px 80px' }}>
      <div className="qg-pop" style={cardSt}>
        {/* Cabecera del juego */}
        <div style={{ background:'linear-gradient(135deg,#F58220,#E85D75)', padding:'14px 18px', color:'#fff', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontWeight:800, fontSize:17 }}>{t(['Corre con tu','Run with your'])} {firstName}</div>
          <div style={{ display:'flex', gap:14, alignItems:'center', fontSize:13, fontWeight:800 }}>
            <span>{t(['Puntos','Score'])}: {score}</span>
            <span style={{ opacity:.85 }}>{t(['Mejor','Best'])}: {best}</span>
          </div>
        </div>

        {/* Lienzo */}
        <div style={{ position:'relative', background:'#EAF6FB', lineHeight:0 }} onMouseDown={tap} onTouchStart={(e)=>{ e.preventDefault(); tap(); }}>
          <canvas ref={cvsRef} width={W} height={H} style={{ width:'100%', height:'auto', display:'block', cursor:'pointer', touchAction:'none' }}/>
          {phase==='ready' && (
            <div style={{ position:'absolute', inset:0, display:'grid', placeItems:'center', background:'rgba(255,255,255,0.55)' }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:22, fontWeight:800, color:'var(--ink)', marginBottom:6 }}>{t(['¡Toca para empezar!','Tap to start!'])}</div>
                <div style={{ fontSize:13, color:'var(--ink-2)' }}>{t(['Click o toque = saltar','Click or tap = jump'])}</div>
              </div>
            </div>
          )}
          {phase==='over' && (
            <div style={{ position:'absolute', inset:0, display:'grid', placeItems:'center', background:'rgba(45,36,33,0.45)' }}>
              <div style={{ textAlign:'center', color:'#fff' }}>
                <div className="bp-rainbow" style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:28, fontWeight:800 }}>{t(['¡Buen intento!','Nice run!'])}</div>
                <div style={{ fontSize:15, marginTop:2 }}>{t(['Puntuación','Score'])}: <b>{score}</b></div>
              </div>
            </div>
          )}
        </div>

        {/* Panel inferior */}
        <div style={{ padding:'18px 20px 22px' }}>
          {phase!=='over' && (
            <div style={{ display:'flex', gap:10, alignItems:'center' }}>
              <button onClick={()=> phase==='playing'? jump() : start()} className="btn btn-primary" style={{ flex:1, justifyContent:'center', cursor:'pointer' }}>
                {phase==='playing' ? t(['Saltar','Jump']) : t(['Empezar a jugar','Start playing'])}
              </button>
            </div>
          )}

          {phase==='over' && (
            <div>
              {/* Premio del perrito */}
              <div style={{ display:'flex', gap:14, alignItems:'center', background:'#FFF7EE', border:'1.5px solid rgba(245,130,32,0.25)', borderRadius:16, padding:'14px 16px', marginBottom:18 }}>
                <div style={{ width:54, height:54, borderRadius:'50%', overflow:'hidden', border:'2px solid var(--orange)', flexShrink:0 }}>
                  <img src={breed.img} alt={breed.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                </div>
                <div style={{ fontSize:14, color:'var(--ink)', lineHeight:1.5 }}>
                  <b>{firstName}</b> {t(['te da un premio:','gives you a prize:'])} <b style={{ color:'var(--orange2,#C2521E)' }}>{prizeFor(score, lang)}</b> · {score} {t(['puntos','points'])}
                </div>
              </div>

              {/* Guardar puntuación */}
              {!saved ? (
                <div style={{ marginBottom:18 }}>
                  <div style={{ fontWeight:800, fontSize:14, marginBottom:8, color:'var(--ink)' }}>{t(['Guarda tu puntuación','Save your score'])}</div>
                  <input value={name} onChange={e=>setName(e.target.value)} maxLength={40} placeholder={t(['Tu nombre','Your name'])}
                    style={{ width:'100%', boxSizing:'border-box', padding:'11px 13px', borderRadius:12, border:'1px solid var(--line)', fontSize:14, fontFamily:'inherit', marginBottom:9, outline:'none' }}/>
                  <div style={{ display:'flex', gap:9, marginBottom:12 }}>
                    <select value={country} onChange={e=>setCountry(e.target.value)} style={{ flex:1, padding:'11px 12px', borderRadius:12, border:'1px solid var(--line)', fontSize:14, fontFamily:'inherit', background:'#fff', outline:'none' }}>
                      <option value="">{t(['País…','Country…'])}</option>
                      {COUNTRIES.map(c=> <option key={c} value={c}>{c}</option>)}
                    </select>
                    <input value={city} onChange={e=>setCity(e.target.value)} list="bp-cities" placeholder={t(['Ciudad','City'])}
                      style={{ flex:1, minWidth:0, padding:'11px 12px', borderRadius:12, border:'1px solid var(--line)', fontSize:14, fontFamily:'inherit', outline:'none' }}/>
                    <datalist id="bp-cities">{CITY_HINTS.map(c=> <option key={c} value={c}/>)}</datalist>
                  </div>
                  <button onClick={submitScore} disabled={!name.trim()||saving} className="btn btn-primary" style={{ width:'100%', justifyContent:'center', cursor: name.trim()?'pointer':'default', opacity: name.trim()?1:0.6 }}>
                    {saving ? t(['Guardando…','Saving…']) : t(['Guardar en el ranking','Save to leaderboard'])}
                  </button>
                </div>
              ) : (
                <div style={{ marginBottom:18, padding:'12px 14px', borderRadius:12, background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.25)', fontSize:13.5, color:'var(--ink)', fontWeight:600 }}>
                  {t(['¡Puntuación guardada! Apareces en el ranking.','Score saved! You are on the leaderboard.'])}
                </div>
              )}

              {/* CTA crear perfil BSocial */}
              <a href="/social?view=profile" className="btn btn-outline" style={{ width:'100%', justifyContent:'center', cursor:'pointer', marginBottom:18 }}>
                {t(['Crea tu perfil en B Social y gana más premios','Create your B Social profile to win more prizes'])}
              </a>

              {/* Ranking top 10 */}
              <div style={{ background:'var(--paper)', borderRadius:16, padding:'14px 16px', marginBottom:18 }}>
                <div style={{ fontWeight:800, fontSize:14, marginBottom:10, color:'var(--ink)' }}>{t(['Top 10 — Mejores puntuaciones','Top 10 — Best scores'])}</div>
                {board.length===0 && <div style={{ fontSize:13, color:'var(--ink-soft)' }}>{t(['Sé el primero en el ranking.','Be the first on the leaderboard.'])}</div>}
                {board.map((r,i)=>(
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'6px 0', borderBottom: i<board.length-1?'1px solid var(--line)':'none' }}>
                    <span style={{ width:22, fontWeight:900, color: i<3?'var(--orange)':'var(--ink-soft)', fontSize:14 }}>{i+1}</span>
                    <span style={{ flex:1, fontSize:13.5, fontWeight:700, color:'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.name}</span>
                    <span style={{ fontSize:11.5, color:'var(--ink-soft)' }}>{[r.city,r.country].filter(Boolean).join(', ')}</span>
                    <span style={{ fontSize:14, fontWeight:900, color:'var(--ink)', minWidth:42, textAlign:'right' }}>{r.score}</span>
                  </div>
                ))}
              </div>

              <div style={{ display:'flex', gap:10 }}>
                <button onClick={start} className="btn btn-primary" style={{ flex:1, justifyContent:'center', cursor:'pointer' }}>{t(['Jugar otra vez','Play again'])}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function prizeFor(score, lang){
  const tiers = [
    [800, ['Trofeo Dorado','Golden Trophy']],
    [500, ['Medalla de Oro','Gold Medal']],
    [300, ['Hueso de Plata','Silver Bone']],
    [150, ['Galleta de Bronce','Bronze Treat']],
    [0,   ['Estrella de Cachorro','Puppy Star']],
  ];
  const idx = lang==='en'?1:0;
  for(const [min, labels] of tiers){ if(score >= min) return labels[idx]; }
  return tiers[tiers.length-1][1][idx];
}

function QuizGame(){
  const t = useT();
  const lang = ((typeof LangContext!=='undefined' && React.useContext(LangContext)) || {}).lang || 'es';
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(Q.length).fill(null));
  const [result, setResult] = useState(false);
  const [muted, setMuted] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [playing, setPlaying] = useState(false);
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
  if (playing) {
    return (
      <div>
        <div style={{ maxWidth:560, margin:'0 auto', padding:'14px 16px 0' }}>
          <button onClick={()=>{ sndBack(); setPlaying(false); }} style={{ background:'none', border:'none', color:'var(--ink-soft)', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:6 }}>← {t(['Volver al resultado','Back to result'])}</button>
        </div>
        <BreedRunner breed={breedFor()} t={t} lang={lang}/>
      </div>
    );
  }
  if (result) {
    const b = breedFor();
    return (
      <div style={wrap}>
        {confetti && <Confetti/>}
        <div className="qg-pop" style={{ background:'#fff', borderRadius:28, border:'1px solid var(--line)', overflow:'hidden', boxShadow:'0 10px 40px rgba(45,36,33,0.1)' }}>
          <div style={{ background:'linear-gradient(135deg,#F58220,#E85D75)', padding:'30px 24px 26px', textAlign:'center', color:'#fff' }}>
            <div style={{ fontSize:13, fontWeight:800, letterSpacing:'.12em', textTransform:'uppercase', opacity:.9 }}>{t(['¡Tu match perfecto!','Your perfect match!'])}</div>
            <div style={{ width:96, height:96, margin:'12px auto', borderRadius:'50%', overflow:'hidden', border:'3px solid rgba(255,255,255,0.7)', background:'rgba(255,255,255,0.2)', animation:'qgBounce 1.8s ease-in-out infinite' }}>
              <img src={b.img} alt={b.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
            </div>
            <div className="bp-rainbow" style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:32, fontWeight:800, letterSpacing:'-0.02em', textShadow:'0 1px 8px rgba(0,0,0,0.22)' }}>{b.name}</div>
            <div style={{ display:'inline-block', marginTop:8, background:'rgba(255,255,255,0.22)', borderRadius:999, padding:'4px 14px', fontSize:14, fontWeight:800 }}>{b.match}% {t(['compatible','match'])}</div>
          </div>
          <div style={{ padding:'22px 24px 26px' }}>
            <div style={{ borderRadius:18, overflow:'hidden', background:'var(--paper)', marginBottom:16, display:'flex', justifyContent:'center' }}>
              <img src={b.img} alt={b.name} style={{ width:'100%', maxHeight:360, objectFit:'contain', display:'block' }}/>
            </div>
            <p style={{ fontSize:15.5, color:'var(--ink-2)', lineHeight:1.6, margin:'0 0 16px' }}>{t(b.desc)}</p>
            <div style={{ display:'flex', gap:8, marginBottom:18 }}>
              <span style={{ flex:1, textAlign:'center', background:'var(--paper)', borderRadius:12, padding:'10px', fontSize:13, color:'var(--ink)' }}><div style={{ fontSize:11, color:'var(--ink-soft)' }}>{t(['Tamaño','Size'])}</div><b>{t(b.size)}</b></span>
              <span style={{ flex:1, textAlign:'center', background:'var(--paper)', borderRadius:12, padding:'10px', fontSize:13, color:'var(--ink)' }}><div style={{ fontSize:11, color:'var(--ink-soft)' }}>{t(['Energía','Energy'])}</div><b>{t(b.energy)}</b></span>
            </div>
            <div style={{ background:'#FFF7EE', border:'1.5px solid rgba(245,130,32,0.25)', borderRadius:16, padding:'16px 18px', marginBottom:20 }}>
              <div style={{ fontSize:13, fontWeight:800, color:'var(--orange2,#C2521E)', marginBottom:10 }}>{t(['Datos divertidos para conocer mejor a tu raza','Fun facts to get to know your breed'])}</div>
              {b.facts.map((f,i)=>(
                <div key={i} style={{ display:'flex', gap:10, marginBottom:8, alignItems:'flex-start' }}>
                  <span style={{ flexShrink:0, color:'#F58220', fontWeight:900 }}>{i+1}</span>
                  <span style={{ fontSize:14, color:'var(--ink)', lineHeight:1.5 }}>{t(f)}</span>
                </div>
              ))}
            </div>
            <button onClick={()=>{ try{ const c=ac(); if(c&&c.state==='suspended') c.resume(); }catch(e){} sndPick(); setPlaying(true); }} className="btn btn-primary" style={{ width:'100%', justifyContent:'center', cursor:'pointer', marginBottom:14, background:'linear-gradient(135deg,#F58220,#E85D75)' }}>
              {t(['Juega y corre con tu '+b.name.split(' (')[0],'Play & run with your '+b.name.split(' (')[0]])}
            </button>
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
        <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:'clamp(28px,5vw,40px)', fontWeight:800, letterSpacing:'-0.03em', color:'var(--ink)' }}>{t(['Encuentra tu','Find your'])} <span style={{ color:'var(--orange)' }}>{t(['cachorro ideal','perfect puppy'])}</span></div>
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
