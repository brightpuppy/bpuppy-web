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

// Datos extra por raza para el panel de la derecha (texto + gráficos).
// pct = 0..100 para las barras. Bilingüe [es,en] en textos.
const BREED_INFO = {
  golden:   { lifespan:['10–12 años','10–12 yrs'], food:['3–4 tazas','3–4 cups'], weight:['25–34 kg','55–75 lb'], exercise:['1–2 h/día','1–2 h/day'],
    energyPct:85, exercisePct:80, healthPct:78, trainPct:95,
    health:['Robusto. Cuidar caderas y el peso.','Sturdy. Watch hips and weight.'],
    goodFor:[['Familias con niños','Families with kids'],['Terapia y servicio','Therapy & service'],['Nadar y traer','Swim & fetch'],['Primer perro','First-time owners']] },
  frenchie: { lifespan:['10–12 años','10–12 yrs'], food:['1–1½ tazas','1–1½ cups'], weight:['8–14 kg','18–28 lb'], exercise:['20–40 min/día','20–40 min/day'],
    energyPct:38, exercisePct:30, healthPct:55, trainPct:62,
    health:['Cuidar la respiración y el calor.','Mind breathing and heat.'],
    goodFor:[['Apartamentos','Apartments'],['Compañía en casa','Home companion'],['Poco ejercicio','Low exercise'],['Vida en ciudad','City life']] },
  cavalier: { lifespan:['9–14 años','9–14 yrs'], food:['½–1 taza','½–1 cup'], weight:['5–8 kg','13–18 lb'], exercise:['30–60 min/día','30–60 min/day'],
    energyPct:50, exercisePct:45, healthPct:52, trainPct:72,
    health:['Vigilar el corazón con el veterinario.','Watch heart health with the vet.'],
    goodFor:[['Apoyo emocional','Emotional support'],['Abrazos y calma','Cuddles & calm'],['Adultos mayores','Seniors'],['Apartamentos','Apartments']] },
  labrador: { lifespan:['10–12 años','10–12 yrs'], food:['3–4 tazas','3–4 cups'], weight:['25–36 kg','55–80 lb'], exercise:['1–2 h/día','1–2 h/day'],
    energyPct:92, exercisePct:90, healthPct:78, trainPct:90,
    health:['Robusto. Controlar peso y caderas.','Sturdy. Manage weight and hips.'],
    goodFor:[['Familias activas','Active families'],['Deportes y agua','Sports & water'],['Servicio y rescate','Service & rescue'],['Jugar en el parque','Park play']] },
  poodle:   { lifespan:['12–15 años','12–15 yrs'], food:['1½–3 tazas','1½–3 cups'], weight:['Variable','Varies'], exercise:['45–60 min/día','45–60 min/day'],
    energyPct:60, exercisePct:60, healthPct:80, trainPct:98,
    health:['Longevo. Cepillar el pelaje seguido.','Long-lived. Brush coat often.'],
    goodFor:[['Alergias (poco pelo)','Allergies (low shed)'],['Aprender trucos','Learning tricks'],['Familias','Families'],['Tres tamaños','Three sizes']] },
  beagle:   { lifespan:['12–15 años','12–15 yrs'], food:['1–1½ tazas','1–1½ cups'], weight:['9–11 kg','20–25 lb'], exercise:['1 h+/día','1 h+/day'],
    energyPct:80, exercisePct:75, healthPct:82, trainPct:55,
    health:['Sano. Controlar el peso (¡comilón!).','Healthy. Watch weight (big eater!).'],
    goodFor:[['Niños y juego','Kids & play'],['Explorar y oler','Explore & sniff'],['Familias activas','Active families'],['Aventuras al aire libre','Outdoor adventures']] },
};

// Historia/origen breve por raza (bilingüe) para la tarjeta de resultado.
const BREED_HISTORY = {
  golden:   ['Criado en Escocia a finales del 1800 por Lord Tweedmouth como perro cobrador para aves de caza en agua y tierra. Su carácter dulce lo convirtió en uno de los perros familiares más queridos del mundo.','Bred in Scotland in the late 1800s by Lord Tweedmouth as a gundog to retrieve waterfowl. Its gentle nature made it one of the world’s most beloved family dogs.'],
  frenchie: ['Desciende de pequeños bulldogs ingleses que llegaron a Francia con artesanos en el siglo XIX. Se volvió la mascota favorita de los cafés de París y hoy es un símbolo de compañía en la ciudad.','Descends from small English bulldogs taken to France by lace workers in the 1800s. It became the darling of Parisian cafés and is now a symbol of city companionship.'],
  cavalier: ['Lleva el nombre del rey Carlos II de Inglaterra, que adoraba a estos spaniels de juguete y casi nunca se separaba de ellos. Criado durante siglos como perro de compañía y de regazo de la realeza.','Named after King Charles II of England, who adored these toy spaniels and was rarely without them. Bred for centuries as a royal companion and lap dog.'],
  labrador: ['Originario de Terranova (Canadá), ayudaba a los pescadores a halar redes y recoger peces. Refinado en Inglaterra como cobrador, hoy es perro guía, de rescate y gran amigo familiar.','From Newfoundland, Canada, where it helped fishermen haul nets and retrieve fish. Refined in England as a retriever, today it serves as a guide, rescue and family dog.'],
  poodle:   ['Nació en Alemania como perro cobrador de agua (su nombre viene de "pudeln", chapotear); el corte elegante protegía sus articulaciones al nadar. Francia lo adoptó como ícono nacional.','Originated in Germany as a water retriever (its name comes from "pudeln", to splash); the fancy clip protected its joints while swimming. France later adopted it as a national icon.'],
  beagle:   ['Antiguo sabueso inglés de rastro, criado en jaurías para cazar conejos y liebres gracias a su olfato extraordinario. Su tamaño y nobleza lo hicieron un excelente perro de familia.','An ancient English scent hound, bred in packs to hunt rabbits and hares thanks to its extraordinary nose. Its size and good nature made it an excellent family dog.'],
};

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
const sndYeah = () => { beep(660,0.07,'triangle',0,0.05); beep(990,0.08,'triangle',0.06,0.05); beep(1320,0.12,'triangle',0.13,0.06); };
const sndBark = () => { beep(300,0.09,'sawtooth',0,0.06); beep(190,0.13,'sawtooth',0.09,0.06); beep(320,0.09,'sawtooth',0.30,0.06); beep(200,0.13,'sawtooth',0.39,0.06); };
const sndHit  = () => { beep(200,0.14,'square',0,0.06); beep(140,0.16,'square',0.08,0.05); };
const sndLife = () => { [784,1047,1319,1568].forEach((f,i)=>beep(f,0.10,'triangle',i*0.06,0.05)); };
// ── Modo héroe: avión despegando + fanfarria + wohoo ──
const sndPlane = () => { const c=ac(); if(!c||window._quizMuted) return; try{ if(c.state==='suspended') c.resume(); }catch(e){} const o=c.createOscillator(),g=c.createGain(); o.type='sawtooth'; o.connect(g); g.connect(c.destination); const t0=c.currentTime; o.frequency.setValueAtTime(110,t0); o.frequency.exponentialRampToValueAtTime(880,t0+1.2); g.gain.setValueAtTime(0.0001,t0); g.gain.linearRampToValueAtTime(0.05,t0+0.2); g.gain.exponentialRampToValueAtTime(0.0001,t0+1.4); o.start(t0); o.stop(t0+1.45); };
const sndHero = () => { [392,523,659,784,1047].forEach((f,i)=>beep(f,0.20,'triangle',i*0.10,0.06)); };
const sndWohoo = () => { const c=ac(); if(!c||window._quizMuted) return; const o=c.createOscillator(),g=c.createGain(); o.type='triangle'; o.connect(g); g.connect(c.destination); const t0=c.currentTime; o.frequency.setValueAtTime(520,t0); o.frequency.exponentialRampToValueAtTime(1046,t0+0.45); g.gain.setValueAtTime(0.0001,t0); g.gain.linearRampToValueAtTime(0.06,t0+0.05); g.gain.exponentialRampToValueAtTime(0.0001,t0+0.55); o.start(t0); o.stop(t0+0.6); };
// ── Música jazz-hiphop chiptune (loop) ──
let _bpMusic = { on:false, timer:null, step:0 };
function startMusic(){
  if(_bpMusic.on) return; _bpMusic.on = true; _bpMusic.step = 0;
  const c = ac(); if(!c) return; try{ if(c.state==='suspended') c.resume(); }catch(e){}
  const bass = [110,0,146.83,0,98,0,130.81,0]; // A2 . D3 . G2 . C3 . (walking)
  const chord = [[220,261.63,329.63], 0,0,0, [196,246.94,293.66],0,0,0]; // Am-ish / G-ish stabs
  const tone = (freq,dur,type,gain)=>{ if(!c||window._quizMuted||freq<=0) return; const o=c.createOscillator(),g=c.createGain(); o.type=type; o.frequency.value=freq; o.connect(g); g.connect(c.destination); const t0=c.currentTime; g.gain.setValueAtTime(0.0001,t0); g.gain.linearRampToValueAtTime(gain,t0+0.02); g.gain.exponentialRampToValueAtTime(0.0001,t0+dur); o.start(t0); o.stop(t0+dur+0.02); };
  _bpMusic.timer = setInterval(()=>{
    if(!_bpMusic.on) return;
    const i = _bpMusic.step % 8;
    if(bass[i]) tone(bass[i],0.26,'triangle',0.05);
    if(i%2===1) tone(6000,0.025,'square',0.010); // hat suave (offbeat)
    if(Array.isArray(chord[i])) chord[i].forEach(f=>tone(f,0.46,'sine',0.020));
    _bpMusic.step++;
  }, 340);
}
function stopMusic(){ _bpMusic.on=false; if(_bpMusic.timer){ clearInterval(_bpMusic.timer); _bpMusic.timer=null; } }

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
    @keyframes qgDriftA { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-30px) rotate(10deg)} }
    @keyframes qgDriftB { 0%,100%{transform:translateY(0) translateX(0) rotate(0)} 50%{transform:translateY(24px) translateX(10px) rotate(-12deg)} }
    @keyframes qgPulseBlob { 0%,100%{transform:scale(1); opacity:.5} 50%{transform:scale(1.18); opacity:.8} }
    .qg-deco{ position:absolute; pointer-events:none; z-index:0; will-change:transform; }
    @media (max-width:820px){ .qg-deco{ display:none } }
    /* Resultado en 2 columnas (PC) -> 1 columna (móvil/tablet) */
    .qg-rgrid{ display:grid; grid-template-columns:minmax(0,0.92fr) minmax(0,1.08fr); gap:16px; align-items:stretch; }
    @media (max-width:880px){ .qg-rgrid{ grid-template-columns:1fr; } }
    .qg-stat{ background:var(--paper); border-radius:12px; padding:9px 11px; }
    .qg-stat .k{ font-size:10.5px; color:var(--ink-soft); font-weight:700; text-transform:uppercase; letter-spacing:.04em; }
    .qg-stat .v{ font-size:14px; color:var(--ink); font-weight:800; }
    .qg-bar{ height:8px; border-radius:999px; background:var(--paper); overflow:hidden; }
    .qg-bar>i{ display:block; height:100%; border-radius:999px; background:linear-gradient(90deg,#F58220,#E85D75); }
    .qg-chip{ font-size:12px; font-weight:700; color:var(--orange2,#C2521E); background:#FFF1E2; border:1px solid rgba(245,130,32,0.25); border-radius:999px; padding:4px 11px; }
    /* Botón JUGAR con borde arcoíris animado (texto centrado, color estable) */
    @keyframes qgRainbow{ to{ background-position:0 0,-300% 0; } }
    .qg-jugar{ display:flex; align-items:center; justify-content:center; gap:8px; width:100%; padding:15px; border:3px solid transparent; border-radius:16px;
      background:linear-gradient(#fff,#fff) padding-box, linear-gradient(90deg,#ff4d4d,#ff9f1c,#ffd93d,#4ade80,#38bdf8,#a855f7,#ff4d4d) border-box;
      background-size:100% 100%,300% 100%; animation:qgRainbow 3s linear infinite;
      font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:19px; letter-spacing:.02em; color:var(--ink); cursor:pointer; transition:transform .12s; }
    .qg-jugar:hover{ transform:translateY(-2px); }
    .qg-jugar:active{ transform:scale(.98); }
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

// Dibuja un perrito pixel-art (más detallado) según la raza
function drawDog(ctx, x, baseY, tone, key, frame, airborne){
  const P = 2.4; // tamaño de "pixel" (perrito más pequeño)
  const px = (cx,cy,w,h,col)=>{ ctx.fillStyle=col; ctx.fillRect(Math.round(x+cx*P), Math.round(baseY+cy*P), Math.max(1,w*P), Math.max(1,h*P)); };
  const dark='#2D2421', white='#FBF7F0', belly='#F4E9D6', collar='#E23B3B', tag='#F5C53A', nose='#2D2421';
  // patas (carrera de 2 fases)
  if (airborne) { px(3,-1,2,2,dark); px(9,-1,2,2,dark); }
  else if (frame % 2 === 0) { px(2,0,2,2,dark); px(9,0,2,2,dark); }
  else { px(4,0,2,2,dark); px(7,0,2,2,dark); }
  // cola (mueve)
  const tw = airborne ? -1 : (frame % 2 ? -1 : 0);
  if (key === 'poodle') { px(-1,-8+tw,3,3,white); }
  else { px(-2,-7+tw,3,2,tone); px(-1,-9+tw,2,2,tone); }
  // cuerpo + barriga
  px(1,-7,12,6,tone); px(1,-8,12,1,tone);
  px(2,-3,9,2,belly);
  // collar + placa
  px(9,-7,2,3,collar); px(9,-5,1,1,tag);
  // cabeza
  px(9,-13,7,6,tone); px(10,-14,5,1,tone);
  // hocico + nariz
  px(15,-10,3,3, key==='beagle' ? white : tone);
  px(17,-10,1,1,nose); px(16,-8,2,1,nose);
  // ojo + brillo
  px(13,-12,1,1,dark); px(13,-12,1,1,dark);
  // orejas según raza
  if (key==='frenchie') { px(9,-15,2,2,tone); px(14,-15,2,2,tone); }
  else if (key==='cavalier'||key==='beagle') { const ec = key==='beagle' ? '#8a5a32' : '#7a3d22'; px(8,-13,2,5,ec); px(15,-13,2,4,ec); }
  else if (key==='poodle') { px(9,-15,3,3,white); px(14,-15,2,2,white); }
  else { px(8,-14,2,3,tone); px(15,-14,2,3,tone); }
  if (key==='golden') { px(0,-7,1,6,'#cf8f2e'); }
}
// Símbolos del premio (SVG, sin emojis)
function PrizeSymbol({ tier, size }){
  const s = size || 40;
  const col = ['#9aa0a6','#CD7F32','#C0C0C0','#F5C53A','#FF7A1A'][tier] || '#F5C53A';
  if (tier >= 3) { // trofeo
    return <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M14 8h20v6a10 10 0 01-20 0V8z" fill={col} stroke="#2D2421" strokeWidth="2"/><path d="M14 11H8a6 6 0 006 7M34 11h6a6 6 0 01-6 7" stroke="#2D2421" strokeWidth="2"/><rect x="20" y="26" width="8" height="7" fill={col} stroke="#2D2421" strokeWidth="2"/><rect x="14" y="33" width="20" height="5" rx="1.5" fill={col} stroke="#2D2421" strokeWidth="2"/></svg>;
  }
  if (tier === 2) { // medalla
    return <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M18 6l6 12 6-12" stroke="#2D2421" strokeWidth="2"/><circle cx="24" cy="30" r="11" fill={col} stroke="#2D2421" strokeWidth="2"/><circle cx="24" cy="30" r="5" fill="#fff" opacity=".5"/></svg>;
  }
  // hueso / galleta
  return <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><rect x="14" y="20" width="20" height="8" rx="4" fill={col} stroke="#2D2421" strokeWidth="2"/><circle cx="14" cy="19" r="5" fill={col} stroke="#2D2421" strokeWidth="2"/><circle cx="14" cy="29" r="5" fill={col} stroke="#2D2421" strokeWidth="2"/><circle cx="34" cy="19" r="5" fill={col} stroke="#2D2421" strokeWidth="2"/><circle cx="34" cy="29" r="5" fill={col} stroke="#2D2421" strokeWidth="2"/></svg>;
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
  const [lives, setLives] = useState(3);
  const [treats, setTreats] = useState(0);
  const [flyIntro, setFlyIntro] = useState(false); // letrero que pausa al entrar a modo vuelo

  const W = 360, H = 200, GY = H - 24; // ground line
  const MAXLIVES = 5, GRAV = 0.40, JUMPV = 8.7; // salto más flotante (arco perdonador)

  const loadBoard = () => {
    const s = gameSupa(); if(!s) return;
    s.from('game_scores').select('name,country,city,score,breed').order('score',{ascending:false}).limit(10)
      .then(({data})=>{ if(data) setBoard(data); }).catch(()=>{});
  };
  useEffect(()=>{ loadBoard(); }, []);

  const newState = () => ({
    py: 0, vy: 0, grounded: true, jumps: 0, frame: 0, fcount: 0,
    speed: 1.6, dist: 0, score: 0, treats: 0, lives: 3, inv: 0,
    obst: [], treatArr: [], heartArr: [], plats: [],
    clouds: [{x:60,y:28},{x:200,y:46},{x:320,y:22}],
    hills: [{x:0,w:200,h:46},{x:230,w:240,h:64},{x:430,w:200,h:40}],
    bldgs: [{x:40,w:46,h:54},{x:150,w:38,h:74},{x:250,w:54,h:46},{x:330,w:40,h:64}],
    nextObst: 300, nextTreat: 120, nextHeart: 1500, nextPlat: 380, over: false,
    mode: 'run', transT: 0, flyTarget: H-110, airObst: [], cats: [], projs: [], nextCat: 220,
  });

  // Doble salto: 1er tap salta desde el suelo, 2do tap (en el aire) vuelve a impulsar.
  const jump = () => {
    const st = stRef.current; if(!st || st.over) return;
    if(st.grounded){ st.vy = JUMPV; st.grounded = false; st.jumps = 1; sndJump(); }
    else if((st.jumps || 0) < 2){ st.vy = JUMPV * 0.92; st.jumps = (st.jumps || 0) + 1; sndJump(); }
  };

  const endGame = (finalScore, treatsCollected) => {
    stopMusic(); setFlyIntro(false);
    const tier = prizeTier(finalScore);
    setPhase('over'); setScore(finalScore); sndOver();
    setTimeout(()=>{ sndPrize(); if(tier>=3) setTimeout(sndBark, 480); }, 320);
    try {
      const b = Math.max(finalScore, parseInt(localStorage.getItem('bp_game_best')||'0',10)||0);
      localStorage.setItem('bp_game_best', String(b)); setBest(b);
      if (finalScore >= 300) localStorage.setItem('bp_game_silver', '1'); // logro Plata (status B Social)
    } catch(e){}
  };

  const dismissFlyIntro = () => { const st = stRef.current; if(!st) return; st.mode='fly'; st.flyTarget = st.py; setFlyIntro(false); startMusic(); };

  const start = () => {
    try { const c = ac(); if(c && c.state==='suspended') c.resume(); } catch(e){}
    stopMusic(); setFlyIntro(false);
    stRef.current = newState();
    setScore(0); setLives(3); setTreats(0); setSaved(false); setPhase('playing');
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
    // capa de superhéroe (ondea)
    const drawCape = (cx, baseY, f) => { const w = Math.sin(f*0.3)*3; ctx.fillStyle='#E23B3B'; ctx.beginPath(); ctx.moveTo(cx-1, baseY-26); ctx.quadraticCurveTo(cx-16+w, baseY-16, cx-9+w, baseY-1); ctx.lineTo(cx+5, baseY-9); ctx.closePath(); ctx.fill(); ctx.fillStyle='#b51d1d'; ctx.fillRect(cx-2, baseY-27, 7, 3); };
    // HUD de vidas con la "B" de BPuppy (borde naranja brillante)
    const drawLives = (st) => { for(let i=0;i<MAXLIVES;i++){ const hx=8+i*16, hy=7, on=i<st.lives, w=12, h=13, r=3; ctx.save(); if(on){ ctx.shadowColor='#FF7A1A'; ctx.shadowBlur=7; } ctx.fillStyle= on?'#F58220':'rgba(45,36,33,0.13)'; ctx.beginPath(); ctx.moveTo(hx+r,hy); ctx.arcTo(hx+w,hy,hx+w,hy+h,r); ctx.arcTo(hx+w,hy+h,hx,hy+h,r); ctx.arcTo(hx,hy+h,hx,hy,r); ctx.arcTo(hx,hy,hx+w,hy,r); ctx.closePath(); ctx.fill(); ctx.shadowBlur=0; ctx.fillStyle= on?'#fff':'rgba(255,255,255,0.45)'; ctx.font='bold 10px sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('B', hx+w/2, hy+h/2+0.5); ctx.restore(); } ctx.textAlign='left'; ctx.textBaseline='alphabetic'; };
    // modo vuelo (transform → flyintro → fly)
    const flyLoop = (st) => {
      const dogX = 60, dogW = 22;
      const grd = ctx.createLinearGradient(0,0,0,H); grd.addColorStop(0,'#8FC9EE'); grd.addColorStop(1,'#DFF1FB'); ctx.fillStyle=grd; ctx.fillRect(0,0,W,H);
      ctx.save(); ctx.translate(W/2,H/2); ctx.scale(1.12,1.12); ctx.translate(-W/2,-H/2); // zoom leve
      st.clouds.forEach(c=>{ c.x -= st.speed*0.4; if(c.x<-44){ c.x=W+20; c.y=10+Math.random()*120; } ctx.fillStyle='#fff'; ctx.fillRect(c.x,c.y,22,7); ctx.fillRect(c.x+7,c.y-6,14,7); });
      if(st.mode==='transform'){
        st.transT++; st.py += (110 - st.py)*0.06;
        if(st.transT===55) sndWohoo();
        drawCape(dogX, GY-st.py, st.transT); drawDog(ctx, dogX, GY-st.py, tone, breed.key, st.frame, true);
        ctx.fillStyle='#C2521E'; ctx.font='bold 18px sans-serif'; ctx.textAlign='center'; ctx.fillText('¡WOHOOO!', dogX+44, GY-st.py-30); ctx.textAlign='left';
        if(st.transT>=110){ st.mode='flyintro'; setFlyIntro(true); }
        drawLives(st); ctx.restore(); return;
      }
      if(st.mode==='flyintro'){ drawCape(dogX, GY-st.py, st.fcount); drawDog(ctx, dogX, GY-st.py, tone, breed.key, st.frame, true); drawLives(st); ctx.restore(); return; }
      // ── fly ──
      st.fcount++; st.dist += st.speed;
      st.score = Math.floor(st.dist/10) + st.treats*8; if(st.fcount%6===0) setScore(st.score);
      if(st.inv>0) st.inv--;
      st.py += (Math.max(24, Math.min(H-30, st.flyTarget)) - st.py)*0.18; // hacia el objetivo (mouse/flechas)
      st.frame = Math.floor(st.fcount/6)%2;
      // obstáculos aéreos
      st.nextObst -= st.speed; if(st.nextObst<=0){ st.airObst.push({ x:W+12, y:26+Math.random()*120, w:16, h:12 }); st.nextObst = (150 - Math.min(st.speed*10,60)) + Math.random()*120; }
      st.airObst.forEach(o=>o.x-=st.speed); st.airObst = st.airObst.filter(o=>o.x+o.w>-6);
      // treats aéreos
      st.nextTreat -= st.speed; if(st.nextTreat<=0){ let tx=W+12; for(const o of st.airObst){ if(Math.abs(o.x-tx)<50){ tx=o.x+o.w+45; break; } } st.treatArr.push({ x:tx, y:GY-(40+Math.random()*110), got:false }); st.nextTreat=80+Math.random()*120; }
      st.treatArr.forEach(c=>c.x-=st.speed); st.treatArr = st.treatArr.filter(c=>c.x>-12 && !c.got);
      // gatos malos desde abajo, lanzan pedazos
      st.nextCat -= st.speed; if(st.nextCat<=0){ st.cats.push({ x:W-10, y:GY-2, t:0 }); st.nextCat=240+Math.random()*220; }
      st.cats.forEach(cat=>{ cat.x -= st.speed*0.7; cat.t++; if(cat.t%75===0){ const dy=(GY-st.py-10)-(cat.y-8); st.projs.push({ x:cat.x+4, y:cat.y-8, vx:-(2.2+st.speed*0.3), vy: dy*0.012 - 1 }); } });
      st.cats = st.cats.filter(cat=>cat.x>-26);
      st.projs.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; p.vy+=0.05; }); st.projs = st.projs.filter(p=>p.x>-10 && p.y<H+12);
      // colisiones
      const dogTop=GY-st.py-22, dogBottom=GY-st.py, dogLeft=dogX, dogRight=dogX+dogW;
      const hit = ()=>{ st.lives--; st.inv=72; setLives(st.lives); sndHit(); if(st.lives<=0) st.over=true; };
      if(st.inv<=0){ for(const o of st.airObst){ if(dogRight>o.x && dogLeft<o.x+o.w && dogBottom>o.y && dogTop<o.y+o.h){ hit(); break; } } }
      if(st.inv<=0){ for(const p of st.projs){ if(Math.abs(p.x-(dogX+11))<11 && Math.abs(p.y-(GY-st.py-10))<11){ hit(); p.x=-999; break; } } }
      for(const c of st.treatArr){ if(!c.got && Math.abs(c.x-(dogX+11))<15 && Math.abs(c.y-(GY-st.py-10))<16){ c.got=true; st.treats++; setTreats(st.treats); sndYeah(); } }
      // render
      st.treatArr.forEach(c=>{ if(c.got)return; ctx.fillStyle='#F7E08A'; ctx.fillRect(c.x,c.y,8,4); ctx.fillStyle='#E8C04A'; ctx.fillRect(c.x-1,c.y-1,3,6); ctx.fillRect(c.x+6,c.y-1,3,6); });
      st.airObst.forEach(o=>{ ctx.fillStyle='#7a8aa0'; ctx.fillRect(o.x,o.y,o.w,o.h); ctx.fillStyle='#5d6b82'; ctx.fillRect(o.x,o.y+o.h-3,o.w,3); });
      st.cats.forEach(cat=>{ ctx.fillStyle='#555'; ctx.fillRect(cat.x,cat.y-10,12,10); ctx.fillStyle='#555'; ctx.fillRect(cat.x,cat.y-13,3,3); ctx.fillRect(cat.x+9,cat.y-13,3,3); ctx.fillStyle='#ffd23f'; ctx.fillRect(cat.x+2,cat.y-8,2,2); ctx.fillRect(cat.x+8,cat.y-8,2,2); });
      st.projs.forEach(p=>{ ctx.fillStyle='#8a4b2a'; ctx.fillRect(p.x,p.y,6,6); });
      if(!(st.inv>0 && Math.floor(st.fcount/4)%2)){ drawCape(dogX, GY-st.py, st.fcount); drawDog(ctx, dogX, GY-st.py, tone, breed.key, st.frame, true); }
      drawLives(st); ctx.restore();
    };
    const loop = () => {
      if(!running) return;
      const st = stRef.current; if(!st){ return; }
      // ── modo vuelo (a partir de los 3 min) ──
      if((st.mode||'run')!=='run'){ flyLoop(st); if(st.over){ running=false; stopMusic(); endGame(st.score, st.treats); return; } rafRef.current=requestAnimationFrame(loop); return; }
      if(st.fcount >= (window._BP_FLY_AT||10800)){ st.mode='transform'; st.transT=0; st.flyTarget=H-110; sndPlane(); setTimeout(()=>sndHero(),420); flyLoop(st); rafRef.current=requestAnimationFrame(loop); return; }
      const dogX = 46, dogW = 25, dogH = 25;
      // ── update ──
      st.dist += st.speed;
      // dificultad: mucho tiempo fácil, luego sube lento con tope
      const ramp = Math.max(0, st.dist - 1500);
      const mins = Math.floor((st.fcount||0)/3600); // ~1 min a 60fps
      st.speed = Math.min(5.6, 1.6 + Math.min(ramp/3600, 1.4) + mins*0.5); // sube continuo + un escalón cada minuto
      if(st.inv > 0) st.inv--;
      // física + suelo (piso o plataforma)
      st.vy -= GRAV; st.py += st.vy;
      const dogCx = dogX + 15;
      let floor = 0;
      for(const p of st.plats){ if(dogCx > p.x-3 && dogCx < p.x+p.w+3 && st.vy <= 0 && st.py >= p.top-7 && st.py <= p.top+14) floor = Math.max(floor, p.top); }
      if(st.py <= floor){ st.py = floor; st.vy = 0; st.grounded = true; st.jumps = 0; } else { st.grounded = false; }
      // animación de carrera
      st.fcount++; if(st.grounded && st.fcount % Math.max(4, 8-Math.floor(st.speed)) === 0){ st.frame++; if(st.fcount%20===0) sndStep(); }
      // parallax: nubes + edificios
      st.clouds.forEach(c=>{ c.x -= st.speed*0.25; if(c.x < -40){ c.x = W+20; c.y = 16+Math.random()*40; } });
      st.bldgs.forEach(b=>{ b.x -= st.speed*0.5; if(b.x+b.w < -6){ b.x = W+Math.random()*40; b.w = 34+Math.random()*26; b.h = 40+Math.random()*40; } });
      st.hills.forEach(hl=>{ hl.x -= st.speed*0.18; if(hl.x+hl.w < -10){ hl.x = W+Math.random()*120; hl.w = 180+Math.random()*120; hl.h = 38+Math.random()*36; } });
      // plataformas (subir arriba y bajar) — a veces con un treat encima
      st.nextPlat -= st.speed;
      if(st.nextPlat <= 0){ const top = 36+Math.floor(Math.random()*62); const w = 48+Math.floor(Math.random()*38); st.plats.push({ x:W+10, w, top }); if(Math.random()<0.75) st.treatArr.push({ x:W+10+w/2-4, y:GY-top-16, got:false }); st.nextPlat = 320+Math.random()*300; }
      st.plats.forEach(p=>{ p.x -= st.speed; }); st.plats = st.plats.filter(p=> p.x+p.w > -6);
      // obstáculos (sólo tras un rato; cadencia generosa)
      st.nextObst -= st.speed;
      if(st.nextObst <= 0 && st.dist > 360){ const hh = 14+Math.floor(Math.random()*14); st.obst.push({ x:W+10, w:10+Math.floor(Math.random()*8), h:hh }); st.nextObst = (180 - Math.min(st.speed*10, 48)) + Math.random()*140; }
      st.obst.forEach(o=>{ o.x -= st.speed; }); st.obst = st.obst.filter(o=> o.x+o.w > -4);
      // treats (suben oportunidades)
      st.nextTreat -= st.speed;
      if(st.nextTreat <= 0){ let tx = W+10; for(const o of st.obst){ if(Math.abs(o.x - tx) < 60){ tx = o.x + o.w + 50; break; } } const ground = Math.random()<0.6; st.treatArr.push({ x:tx, y: ground ? GY-16 : GY-(34+Math.random()*22), got:false }); st.nextTreat = 90+Math.random()*150; }
      st.treatArr.forEach(c=>{ c.x -= st.speed; }); st.treatArr = st.treatArr.filter(c=> c.x > -12 && !c.got);
      // corazón (vida) ocasional y alcanzable
      st.nextHeart -= st.speed;
      if(st.nextHeart <= 0){ if(st.lives < MAXLIVES) st.heartArr.push({ x:W+10, y: GY-(38+Math.random()*10), got:false }); st.nextHeart = 1700+Math.random()*1200; }
      st.heartArr.forEach(c=>{ c.x -= st.speed; }); st.heartArr = st.heartArr.filter(c=> c.x > -12 && !c.got);
      // hitbox perro
      const dogBottom = GY - st.py, dogLeft = dogX, dogRight = dogX + dogW;
      // colisión obstáculos (con invencibilidad temporal)
      if(st.inv <= 0){ for(const o of st.obst){ const oTop = GY-o.h; if(dogRight > o.x+2 && dogLeft < o.x+o.w-2 && dogBottom > oTop+3){ st.lives--; st.inv = 72; setLives(st.lives); sndHit(); if(st.lives <= 0) st.over = true; break; } } }
      // recoger treats
      for(const c of st.treatArr){ if(!c.got && Math.abs(c.x-(dogX+15)) < 15 && Math.abs(c.y-(dogBottom-13)) < 18){ c.got=true; st.treats++; setTreats(st.treats); sndYeah(); } }
      // recoger corazón
      for(const c of st.heartArr){ if(!c.got && Math.abs(c.x-(dogX+15)) < 16 && Math.abs(c.y-(dogBottom-13)) < 20){ c.got=true; if(st.lives < MAXLIVES){ st.lives++; setLives(st.lives); } sndLife(); } }
      // score (distancia + treats pesan más)
      st.score = Math.floor(st.dist/10) + st.treats*8;
      if(st.fcount % 6 === 0) setScore(st.score);

      // ── render ──
      const grd = ctx.createLinearGradient(0,0,0,H); grd.addColorStop(0,'#BFE3F2'); grd.addColorStop(1,'#EAF6FB'); ctx.fillStyle = grd; ctx.fillRect(0,0,W,H);
      // sol con rayos
      ctx.save(); ctx.translate(W-36, 30);
      ctx.strokeStyle='rgba(255,213,138,0.55)'; ctx.lineWidth=2; const ray=Math.floor(st.dist*0.5)%30;
      for(let a=0;a<8;a++){ const ang=a*Math.PI/4 + ray*0.01; ctx.beginPath(); ctx.moveTo(Math.cos(ang)*16,Math.sin(ang)*16); ctx.lineTo(Math.cos(ang)*22,Math.sin(ang)*22); ctx.stroke(); }
      ctx.fillStyle='#FFD98A'; ctx.beginPath(); ctx.arc(0,0,12,0,7); ctx.fill(); ctx.restore();
      // colinas suaves (parallax lejano)
      st.hills.forEach(hl=>{ ctx.fillStyle='#CDE9B8'; ctx.beginPath(); ctx.moveTo(hl.x, GY+4); ctx.quadraticCurveTo(hl.x+hl.w/2, GY+4-hl.h, hl.x+hl.w, GY+4); ctx.closePath(); ctx.fill(); });
      // edificios (parallax estilo arcade)
      st.bldgs.forEach(b=>{ ctx.fillStyle='#cfe0d6'; ctx.fillRect(b.x, GY-b.h, b.w, b.h); ctx.fillStyle='#b4c9bd'; for(let wy=GY-b.h+6; wy<GY-6; wy+=10){ for(let wx=b.x+5; wx<b.x+b.w-5; wx+=10){ ctx.fillRect(wx,wy,5,5); } } });
      // nubes
      ctx.fillStyle='#FFFFFF'; st.clouds.forEach(c=>{ ctx.fillRect(c.x,c.y,18,6); ctx.fillRect(c.x+6,c.y-5,12,6); });
      // suelo
      ctx.fillStyle='#9BD46B'; ctx.fillRect(0,GY+4,W,H-GY-4);
      ctx.fillStyle='#7CC04E'; ctx.fillRect(0,GY+4,W,4);
      ctx.fillStyle='#6B4A2B'; ctx.fillRect(0,GY+8,W,H-GY-8);
      ctx.fillStyle='#5c3f24'; const off = Math.floor(st.dist)%16; for(let gx=-off; gx<W; gx+=16){ ctx.fillRect(gx,GY+12,8,3); }
      // plataformas de ladrillo (estilo DK)
      st.plats.forEach(p=>{ const py = GY-p.top; ctx.fillStyle='#C2521E'; ctx.fillRect(p.x,py,p.w,8); ctx.fillStyle='#E0742F'; ctx.fillRect(p.x,py,p.w,3); ctx.fillStyle='#9c3f12'; for(let bx=p.x+2; bx<p.x+p.w-2; bx+=10){ ctx.fillRect(bx,py+3,2,5); } });
      // obstáculos (arbustos)
      st.obst.forEach(o=>{ const oy = GY-o.h; ctx.fillStyle='#3C7A3C'; ctx.fillRect(o.x,oy,o.w,o.h); ctx.fillStyle='#4E994E'; ctx.fillRect(o.x,oy,o.w,4); ctx.fillStyle='#2F5F2F'; ctx.fillRect(o.x+2,oy+o.h-4,o.w-4,4); });
      // treats (huesos dorados)
      st.treatArr.forEach(c=>{ if(c.got) return; ctx.fillStyle='#F7E08A'; ctx.fillRect(c.x,c.y,8,4); ctx.fillStyle='#E8C04A'; ctx.fillRect(c.x-1,c.y-1,3,6); ctx.fillRect(c.x+6,c.y-1,3,6); });
      // corazones (vida)
      st.heartArr.forEach(c=>{ if(c.got) return; ctx.fillStyle='#E23B3B'; ctx.fillRect(c.x+1,c.y+2,7,4); ctx.fillRect(c.x,c.y,3,3); ctx.fillRect(c.x+6,c.y,3,3); ctx.beginPath(); ctx.moveTo(c.x,c.y+3); ctx.lineTo(c.x+4.5,c.y+9); ctx.lineTo(c.x+9,c.y+3); ctx.fill(); });
      // perrito (parpadea si invencible)
      if(!(st.inv > 0 && Math.floor(st.fcount/4)%2)){ drawDog(ctx, dogX, GY - st.py, tone, breed.key, st.frame, !st.grounded); }
      // HUD: vidas (la "B" de BPuppy con borde naranja brillante)
      drawLives(st);

      if(st.over){ running = false; endGame(st.score, st.treats); return; }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { running = false; cancelAnimationFrame(rafRef.current); stopMusic(); };
  }, [phase]);

  // controles
  useEffect(()=>{
    const onKey = (e)=>{
      if(e.code!=='Space' && e.code!=='ArrowUp' && e.code!=='ArrowDown') return;
      e.preventDefault();
      const st = stRef.current;
      if(phase!=='playing'){ if(phase!=='over') start(); return; }
      if(st && st.mode==='flyintro'){ dismissFlyIntro(); return; }
      if(st && st.mode==='fly'){ const d = e.code==='ArrowDown' ? -22 : 22; st.flyTarget = Math.max(24, Math.min(H-30, (st.flyTarget==null?st.py:st.flyTarget) + d)); return; }
      if(e.code!=='ArrowDown') jump(); // modo run: salta con Space/ArrowUp
    };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  }, [phase]);

  const flyAim = (clientY, el) => { const st=stRef.current; if(!st||st.mode!=='fly'||!el) return; const r=el.getBoundingClientRect(); if(!r.height) return; const ly=(clientY-r.top)*(H/r.height); st.flyTarget = Math.max(24, Math.min(H-30, GY-ly)); };
  const tap = () => { const st=stRef.current; if(phase==='ready'){ start(); return; } if(phase!=='playing') return; if(st && st.mode==='flyintro'){ dismissFlyIntro(); return; } if(st && st.mode==='fly'){ st.flyTarget = Math.min(H-30, (st.flyTarget==null?st.py:st.flyTarget)+22); return; } jump(); };

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
          <div style={{ display:'flex', gap:12, alignItems:'center', fontSize:13, fontWeight:800 }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:4 }} title="Treats">
              <svg width="15" height="15" viewBox="0 0 48 48" fill="#fff"><rect x="14" y="20" width="20" height="8" rx="4"/><circle cx="14" cy="19" r="5"/><circle cx="14" cy="29" r="5"/><circle cx="34" cy="19" r="5"/><circle cx="34" cy="29" r="5"/></svg>
              {treats}
            </span>
            <span>{t(['Puntos','Score'])}: {score}</span>
            <span style={{ opacity:.85 }}>{t(['Mejor','Best'])}: {best}</span>
          </div>
        </div>

        {/* Lienzo */}
        <div style={{ position:'relative', background:'#EAF6FB', lineHeight:0, userSelect:'none', WebkitUserSelect:'none', touchAction:'none', overflow:'hidden' }} onMouseDown={(e)=>{ e.preventDefault(); tap(); }} onTouchStart={(e)=>{ e.preventDefault(); tap(); }} onMouseMove={(e)=>flyAim(e.clientY, e.currentTarget)} onTouchMove={(e)=>{ const st=stRef.current; if(st && st.mode==='fly' && e.touches[0]){ e.preventDefault(); flyAim(e.touches[0].clientY, e.currentTarget); } }}>
          <canvas ref={cvsRef} width={W} height={H} style={{ width:'100%', height:'auto', display:'block', cursor:'pointer', touchAction:'none' }}/>
          {phase==='ready' && (
            <div style={{ position:'absolute', inset:0, display:'grid', placeItems:'center', background:'rgba(255,255,255,0.55)' }}>
              <div style={{ textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:14, background:'rgba(255,255,255,0.78)', borderRadius:16, padding:'16px 22px' }}>
                <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:22, fontWeight:800, color:'var(--ink)', lineHeight:1.1 }}>{t(['¡Toca para empezar!','Tap to start!'])}</div>
                <div style={{ fontSize:13, fontWeight:600, color:'var(--ink-2)' }}>{t(['Salta con clic, toque o barra espaciadora · doble = doble salto','Jump with click, tap or spacebar · double = double jump'])}</div>
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
          {flyIntro && (
            <div style={{ position:'absolute', inset:0, display:'grid', placeItems:'center', background:'rgba(45,36,33,0.62)' }}>
              <div style={{ textAlign:'center', color:'#fff', background:'rgba(0,0,0,0.42)', borderRadius:16, padding:'18px 22px', maxWidth:300 }}>
                <div className="bp-rainbow" style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:24, fontWeight:800 }}>{t(['¡Modo vuelo!','Flight mode!'])}</div>
                <div style={{ fontSize:13.5, margin:'8px 0 14px', lineHeight:1.45 }}>{t(['Controla a tu cachorro con el mouse o las flechas ↑ ↓. Esquiva los obstáculos del aire y a los gatos.','Control your puppy with the mouse or the ↑ ↓ arrows. Dodge the air obstacles and the cats.'])}</div>
                <button onClick={dismissFlyIntro} className="btn btn-primary" style={{ cursor:'pointer' }}>{t(['¡A volar!','Let us fly!'])}</button>
              </div>
            </div>
          )}
        </div>
        <div style={{ textAlign:'center', fontSize:12, fontWeight:600, color:'var(--ink-soft)', padding:'8px 12px 0' }}>{t(['Salta con clic, toque o barra espaciadora','Jump with click, tap or spacebar'])}</div>

        {/* Panel inferior */}
        <div style={{ padding:'14px 20px 22px' }}>
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
                <div style={{ flex:1, fontSize:14, color:'var(--ink)', lineHeight:1.5 }}>
                  <b>{firstName}</b> {t(['te da un premio:','gives you a prize:'])} <b style={{ color:'var(--orange2,#C2521E)' }}>{prizeFor(score, lang)}</b>
                  <div style={{ fontSize:12.5, color:'var(--ink-2)', marginTop:2 }}>{score} {t(['puntos','points'])} · {treats} treats</div>
                </div>
                <div style={{ flexShrink:0 }}><PrizeSymbol tier={prizeTier(score)} size={46}/></div>
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

function prizeTier(score){ return score>=800?4 : score>=500?3 : score>=300?2 : score>=150?1 : 0; }
function prizeFor(score, lang){
  const labels = [
    ['Estrella de Cachorro','Puppy Star'],
    ['Galleta de Bronce','Bronze Treat'],
    ['Hueso de Plata','Silver Bone'],
    ['Medalla de Oro','Gold Medal'],
    ['Trofeo Dorado','Golden Trophy'],
  ];
  return labels[prizeTier(score)][lang==='en'?1:0];
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
    const info = BREED_INFO[b.key] || {};
    const nm = b.name.split(' (')[0];
    const Bar = ({ label, pct }) => (
      <div style={{ marginBottom:6 }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, fontWeight:700, color:'var(--ink-soft)', marginBottom:3 }}><span>{label}</span><span>{Math.round(pct||0)}%</span></div>
        <div className="qg-bar"><i style={{ width:(pct||0)+'%' }}/></div>
      </div>
    );
    return (
      <div style={{ maxWidth:1060, margin:'0 auto', padding:'18px 16px 28px' }}>
        {confetti && <Confetti/>}
        <div className="qg-rgrid">
          {/* IZQUIERDA — panel del resultado */}
          <div className="qg-pop" style={{ background:'#fff', borderRadius:24, border:'1px solid var(--line)', overflow:'hidden', boxShadow:'0 10px 40px rgba(45,36,33,0.1)', display:'flex', flexDirection:'column' }}>
            <div style={{ background:'linear-gradient(135deg,#F58220,#E85D75)', padding:'15px 20px 13px', textAlign:'center', color:'#fff' }}>
              <div style={{ fontSize:11.5, fontWeight:800, letterSpacing:'.12em', textTransform:'uppercase', opacity:.9 }}>{t(['¡Tu match perfecto!','Your perfect match!'])}</div>
              <div className="bp-rainbow" style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:26, fontWeight:800, letterSpacing:'-0.02em', textShadow:'0 1px 8px rgba(0,0,0,0.22)', marginTop:2 }}>{b.name}</div>
              <div style={{ display:'inline-block', marginTop:6, background:'rgba(255,255,255,0.22)', borderRadius:999, padding:'3px 13px', fontSize:13, fontWeight:800 }}>{b.match}% {t(['compatible','match'])}</div>
            </div>
            <div style={{ padding:'14px 16px 16px', display:'flex', flexDirection:'column', flex:1 }}>
              <div style={{ borderRadius:16, overflow:'hidden', background:'var(--paper)', marginBottom:12 }}>
                <img src={b.img} alt={b.name} style={{ width:'100%', maxHeight:230, objectFit:'contain', display:'block' }}/>
              </div>
              <p style={{ fontSize:14, color:'var(--ink-2)', lineHeight:1.55, margin:'0 0 12px' }}>{t(b.desc)}</p>
              <div style={{ display:'flex', gap:8, marginBottom:12 }}>
                <span className="qg-stat" style={{ flex:1, textAlign:'center' }}><div className="k">{t(['Tamaño','Size'])}</div><div className="v">{t(b.size)}</div></span>
                <span className="qg-stat" style={{ flex:1, textAlign:'center' }}><div className="k">{t(['Energía','Energy'])}</div><div className="v">{t(b.energy)}</div></span>
              </div>
              {BREED_HISTORY[b.key] && (
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontSize:12, fontWeight:800, color:'var(--orange2,#C2521E)', marginBottom:5 }}>{t(['Historia de la raza','Breed history'])}</div>
                  <p style={{ fontSize:12.5, color:'var(--ink-2)', lineHeight:1.5, margin:0 }}>{t(BREED_HISTORY[b.key])}</p>
                </div>
              )}
              <div style={{ background:'#FFF7EE', border:'1.5px solid rgba(245,130,32,0.25)', borderRadius:14, padding:'12px 14px', marginTop:'auto' }}>
                <div style={{ fontSize:12, fontWeight:800, color:'var(--orange2,#C2521E)', marginBottom:7 }}>{t(['Datos divertidos','Fun facts'])}</div>
                {b.facts.map((f,i)=>(
                  <div key={i} style={{ display:'flex', gap:8, marginBottom:5, alignItems:'flex-start' }}>
                    <span style={{ flexShrink:0, color:'#F58220', fontWeight:900, fontSize:13 }}>{i+1}</span>
                    <span style={{ fontSize:12.5, color:'var(--ink)', lineHeight:1.4 }}>{t(f)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* DERECHA — datos, gráficos y acciones */}
          <div className="qg-pop" style={{ background:'#fff', borderRadius:24, border:'1px solid var(--line)', boxShadow:'0 10px 40px rgba(45,36,33,0.1)', padding:'18px 20px', display:'flex', flexDirection:'column' }}>
            <div style={{ fontFamily:'Bricolage Grotesque,sans-serif', fontSize:20, fontWeight:800, color:'var(--ink)' }}>{t(['Conoce al ','Meet the '])}<span style={{ color:'var(--orange)' }}>{nm}</span></div>
            <p style={{ fontSize:12.5, color:'var(--ink-soft)', margin:'2px 0 12px', lineHeight:1.4 }}>{t(['¿No conocías la raza? Aquí tienes lo importante de un vistazo.','New to the breed? Here is what matters, at a glance.'])}</p>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:13 }}>
              <div className="qg-stat"><div className="k">{t(['Esperanza de vida','Lifespan'])}</div><div className="v">{t(info.lifespan||['—','—'])}</div></div>
              <div className="qg-stat"><div className="k">{t(['Alimento diario','Daily food'])}</div><div className="v">{t(info.food||['—','—'])}</div></div>
              <div className="qg-stat"><div className="k">{t(['Peso adulto','Adult weight'])}</div><div className="v">{t(info.weight||['—','—'])}</div></div>
              <div className="qg-stat"><div className="k">{t(['Ejercicio','Exercise'])}</div><div className="v">{t(info.exercise||['—','—'])}</div></div>
            </div>

            <div style={{ marginBottom:10 }}>
              <Bar label={t(['Energía','Energy'])} pct={info.energyPct}/>
              <Bar label={t(['Necesidad de ejercicio','Exercise needs'])} pct={info.exercisePct}/>
              <Bar label={t(['Salud','Health'])} pct={info.healthPct}/>
              <Bar label={t(['Inteligencia','Intelligence'])} pct={info.trainPct}/>
            </div>

            {info.health && <p style={{ fontSize:12, color:'var(--ink-2)', margin:'0 0 12px', lineHeight:1.45 }}><b style={{ color:'var(--ink)' }}>{t(['Salud: ','Health: '])}</b>{t(info.health)}</p>}

            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:11.5, fontWeight:800, color:'var(--ink-soft)', textTransform:'uppercase', letterSpacing:'.04em', marginBottom:7 }}>{t(['Bueno para','Great for'])}</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {(info.goodFor||[]).map((g,i)=>(<span key={i} className="qg-chip">{t(g)}</span>))}
              </div>
            </div>

            <a href={`/blog?art=${b.art}`} style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:13.5, fontWeight:700, color:'var(--orange)', marginBottom:12 }}>{t(['Aprende más sobre esta raza','Learn more about this breed'])} →</a>

            <div style={{ marginTop:'auto' }}>
              <button onClick={()=>{ try{ const c=ac(); if(c&&c.state==='suspended') c.resume(); }catch(e){} sndPick(); setPlaying(true); }} className="qg-jugar" style={{ marginBottom:10 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>{t(['JUGAR','PLAY'])}
              </button>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                <a href="/solicitud" className="btn btn-primary" style={{ flex:1, justifyContent:'center', minWidth:150 }}>{t(['Quiero un '+nm,'I want a '+nm])}</a>
                <button onClick={reset} className="btn btn-outline" style={{ cursor:'pointer' }}>{t(['Repetir el quiz','Retake the quiz'])}</button>
              </div>
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

function PawDeco({ c, size }){
  return <svg width={size} height={size} viewBox="0 0 64 64" fill={c}>
    <ellipse cx="32" cy="44" rx="14" ry="11"/><ellipse cx="12" cy="28" rx="6" ry="8"/>
    <ellipse cx="52" cy="28" rx="6" ry="8"/><ellipse cx="23" cy="15" rx="5.5" ry="7"/><ellipse cx="41" cy="15" rx="5.5" ry="7"/>
  </svg>;
}
function BoneDeco({ c, size }){
  return <svg width={size} height={size*0.62} viewBox="0 0 64 40" fill={c}>
    <rect x="14" y="14" width="36" height="12" rx="6"/>
    <circle cx="14" cy="12" r="8"/><circle cx="14" cy="28" r="8"/><circle cx="50" cy="12" r="8"/><circle cx="50" cy="28" r="8"/>
  </svg>;
}
function QuizDecor(){
  // Detalles suaves flotando a los lados (decorativo, no interfiere con el contenido)
  const items = [
    { t:'paw',  side:{left:'5%'},  top:'14vh', size:54, c:'#F58220', anim:'qgDriftA', dur:7,  delay:0,   op:.5,  rot:-12 },
    { t:'bone', side:{left:'9%'},  top:'40vh', size:60, c:'#E85D75', anim:'qgDriftB', dur:9,  delay:1.2, op:.45, rot:18 },
    { t:'paw',  side:{left:'4%'},  top:'66vh', size:42, c:'#1EB87A', anim:'qgDriftB', dur:8,  delay:.5,  op:.45, rot:8 },
    { t:'blob', side:{left:'2%'},  top:'30vh', size:150, c:'#FFD9B3', anim:'qgPulseBlob', dur:10, delay:0, op:.5 },
    { t:'bone', side:{right:'6%'}, top:'18vh', size:50, c:'#5B7CFA', anim:'qgDriftA', dur:8.5,delay:.8, op:.45, rot:-16 },
    { t:'paw',  side:{right:'4%'}, top:'46vh', size:58, c:'#F5A623', anim:'qgDriftB', dur:7.5,delay:.3, op:.5,  rot:14 },
    { t:'paw',  side:{right:'9%'}, top:'72vh', size:40, c:'#E85D75', anim:'qgDriftA', dur:9,  delay:1.5, op:.4,  rot:-8 },
    { t:'blob', side:{right:'1%'}, top:'58vh', size:170, c:'#FFE0EC', anim:'qgPulseBlob', dur:11, delay:1, op:.5 },
  ];
  return <div aria-hidden="true">{items.map((it,i)=>(
    <div key={i} className="qg-deco" style={{ ...it.side, top:it.top, opacity:it.op, animation:`${it.anim} ${it.dur}s ease-in-out ${it.delay}s infinite`, transform:it.rot?`rotate(${it.rot}deg)`:undefined }}>
      {it.t==='paw'  && <PawDeco c={it.c} size={it.size}/>}
      {it.t==='bone' && <BoneDeco c={it.c} size={it.size}/>}
      {it.t==='blob' && <div style={{ width:it.size, height:it.size, borderRadius:'50%', background:`radial-gradient(circle at 50% 50%, ${it.c}, rgba(255,255,255,0))`, filter:'blur(6px)' }}/>}
    </div>
  ))}</div>;
}

function QuizGameRoot(){
  const [lang, setLang] = useState(()=> (window.bpGetLang && window.bpGetLang()) || 'es');
  useEffect(()=>{ document.documentElement.lang = lang; ensureCss(); }, [lang]);
  useEffect(()=> (window.bpOnLang ? window.bpOnLang(setLang) : undefined), []);
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Header overDark={false}/>
      <main style={{ paddingTop:80, background:'var(--bg,#fff)', minHeight:'100vh', position:'relative', overflow:'hidden' }}>
        <QuizDecor/>
        <div style={{ position:'relative', zIndex:1 }}><QuizGame/></div>
      </main>
      <Footer/>
    </LangContext.Provider>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<QuizGameRoot/>);
