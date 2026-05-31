// s-data.jsx — Sample data for B Social prototype
const BSDATA = {
  me: { id:'u0', name:'María P.', username:'mariap', initials:'MP', color:'#F58220', city:'Miami, FL', bio:'Luna mom 🐾 Golden lover', verified:true, followers:847, following:312, posts:64 },
  stories: [
    { id:'s0', username:'Tu historia', initials:'+', color:'#F58220', isOwn:true, hasNew:false },
    { id:'s1', username:'coco.f',   initials:'CF', color:'#E85D75', hasNew:true },
    { id:'s2', username:'milo_rv',  initials:'MR', color:'#7C5CBF', hasNew:true },
    { id:'s3', username:'bella_s',  initials:'BS', color:'#2196F3', hasNew:true },
    { id:'s4', username:'rocky.m',  initials:'RM', color:'#4CAF50', hasNew:false },
    { id:'s5', username:'luna_g',   initials:'LG', color:'#FF5722', hasNew:false },
    { id:'s6', username:'diego_p',  initials:'DP', color:'#F5A623', hasNew:false },
  ],
  posts: [
    { id:'p1', name:'Carlos R.',  username:'carlosrv',   initials:'CR', color:'#2196F3', city:'Dallas, TX',       verified:false, img:'assets/photos/g01.webp', caption:'Milo descubrió que la lluvia no es tan mala 🌧️ Ya no le tenemos que convencer de salir 😂', tags:['GoldenRetriever','PuppyLife'], likes:234,  comments:18, time:'2h',  liked:false, saved:false },
    { id:'p2', name:'Sofía K.',   username:'sof_kd',     initials:'SK', color:'#9C27B0', city:'New York, NY',     verified:true,  img:'assets/photos/g02.webp', caption:'Bella encontró su spot favorito ☀️ Todos los días mismo ritual, misma sonrisa.', tags:['Labrador','DogMom','NYC'], likes:512,  comments:34, time:'4h',  liked:true,  saved:false },
    { id:'p3', name:'Rachel M.',  username:'rach_dog',   initials:'RM', color:'#4CAF50', city:'Chicago, IL',      verified:false, img:'assets/photos/g03.webp', caption:'Primer año de Rocky 🎂🎉 Un año de mordiscos, caos y amor infinito. No lo cambiaría por nada.', tags:['PuppyBirthday','FrenchBulldog'], likes:891,  comments:67, time:'6h',  liked:false, saved:true  },
    { id:'p4', name:'Diego F.',   username:'diego_pom',  initials:'DF', color:'#FF5722', city:'Los Angeles, CA',  verified:true,  img:'assets/photos/g04.webp', caption:'Luna pasea por el barrio como si fuera su ciudad 👑 Porque lo es.', tags:['Pomeranian','DogDad','LA'], likes:1203, comments:89, time:'8h',  liked:false, saved:false },
    { id:'p5', name:'Ana L.',     username:'ana_cats',   initials:'AL', color:'#E91E63', city:'Miami, FL',        verified:false, img:'assets/photos/g05.webp', caption:'Simba y su cara de "¿por qué hay una cámara aquí?" 😹', tags:['CatLife','Ragdoll','CatMom'], likes:445,  comments:23, time:'10h', liked:true,  saved:false },
    { id:'p6', name:'Marco B.',   username:'marco_bp',   initials:'MB', color:'#607D8B', city:'Houston, TX',      verified:true,  img:'assets/photos/g06.webp', caption:'Fin de semana en el lago con Coco 🏊 Primera vez en agua y ya no quería salir', tags:['Labrador','WeekendVibes'], likes:672,  comments:41, time:'12h', liked:false, saved:false },
  ],
  pack: [
    { id:'u1', name:'Carlos R.', username:'carlosrv',  initials:'CR', color:'#2196F3', city:'Dallas, TX',      verified:false, mutual:4, pet:'Golden Retriever' },
    { id:'u2', name:'Sofía K.',  username:'sof_kd',    initials:'SK', color:'#9C27B0', city:'New York, NY',    verified:true,  mutual:8, pet:'Labrador' },
    { id:'u3', name:'Diego F.',  username:'diego_pom', initials:'DF', color:'#FF5722', city:'Los Angeles, CA', verified:true,  mutual:2, pet:'Pomeranian' },
    { id:'u4', name:'Ana L.',    username:'ana_cats',  initials:'AL', color:'#E91E63', city:'Miami, FL',       verified:false, mutual:6, pet:'Ragdoll' },
  ],
  suggestions: [
    { id:'u5', name:'Daniela M.', username:'dani_pets', initials:'DM', color:'#9C27B0', city:'Austin, TX',    mutual:3, pet:'Shih Tzu' },
    { id:'u6', name:'Luis C.',    username:'luisc_dog', initials:'LC', color:'#2196F3', city:'Dallas, TX',    mutual:1, pet:'Labrador' },
    { id:'u7', name:'Kim P.',     username:'kimpaws',   initials:'KP', color:'#F44336', city:'Miami, FL',     mutual:5, pet:'Frenchie' },
    { id:'u8', name:'Pablo S.',   username:'pablos_k',  initials:'PS', color:'#009688', city:'Houston, TX',   mutual:2, pet:'Yorkshire' },
  ],
  places: [
    { id:'pl1', name:'Bayfront Park Dog Area',  type:'park',  emoji:'🌳', rating:4.8, note:'Off-leash' },
    { id:'pl2', name:'The Dogfather Café',       type:'cafe',  emoji:'☕', rating:4.6, note:'Dogs welcome inside' },
    { id:'pl3', name:'Paws & Claws Vet',         type:'vet',   emoji:'🏥', rating:4.9, note:'Open 7 days' },
    { id:'pl4', name:'Central Bark Dog Park',    type:'park',  emoji:'🌿', rating:4.7, note:'Off-leash, gated' },
    { id:'pl5', name:'Petco Brickell',           type:'store', emoji:'🛍️', rating:4.4, note:'Full grooming' },
  ],
  events: [
    { title:'Dog Meetup en Bayfront',       date:'Sáb 24 Mayo', emoji:'🐾', attendees:34 },
    { title:'Clase de agility para cachorros', date:'Dom 25 Mayo', emoji:'🏃', attendees:12 },
    { title:'Feria de Adopción Animal',     date:'Sáb 31 Mayo', emoji:'🏠', attendees:89 },
  ],
  pets: [{
    id:'pet1', name:'Luna', breed:'Golden Retriever', dob:'Mar 2023', gender:'Hembra',
    img:'assets/photos/g01.webp', microchip:'985141004832901', bpuppy:true,
    weight:[{m:'Ene',v:18},{m:'Abr',v:22},{m:'Jul',v:25},{m:'Oct',v:27},{m:'Ene',v:28}],
    vaccines:[
      { name:'DHPP',        date:'Abr 2023', done:true  },
      { name:'Rabia',       date:'May 2023', done:true  },
      { name:'Bordetella',  date:'Jun 2023', done:true  },
      { name:'Leptospira',  date:'Abr 2025', done:false, upcoming:true },
    ],
    vet:'Dr. Sarah Johnson · Miami Pet Clinic',
  }],
  messages: [
    { user:'carlosrv', initials:'CR', color:'#2196F3', preview:'¡Qué lindo tu perro! ¿Qué raza...', time:'2m',  online:true,  unread:true  },
    { user:'sof_kd',   initials:'SK', color:'#9C27B0', preview:'Vi que tienes un Pomeranian',       time:'15m', online:true,  unread:false },
    { user:'rach_dog', initials:'RM', color:'#4CAF50', preview:'¿Vas al meetup este sábado?',        time:'1h',  online:false, unread:false },
    { user:'ana_cats', initials:'AL', color:'#E91E63', preview:'Gracias por la recomendación',      time:'3h',  online:false, unread:false },
  ],
  // Comunidad — perfiles que el dueño decidió hacer públicos (solo campos no sensibles).
  community: [
    { id:'c1', name:'Carlos R.', username:'carlosrv',  initials:'CR', color:'#2196F3', city:'Dallas, TX',      bio:'Papá orgulloso de un Golden', pet:{ name:'Milo',  breed:'Golden Retriever', img:'assets/photos/g01.webp' }, followers:847,  bpuppy:true },
    { id:'c2', name:'Sofía K.',  username:'sof_kd',     initials:'SK', color:'#9C27B0', city:'New York, NY',    bio:'Lab lover · NYC walks', pet:{ name:'Bella', breed:'Labrador', img:'assets/photos/g02.webp' }, followers:1520, bpuppy:false },
    { id:'c3', name:'Diego F.',  username:'diego_pom',  initials:'DF', color:'#FF5722', city:'Los Angeles, CA', bio:'Pomeranian dad', pet:{ name:'Luna', breed:'Pomeranian', img:'assets/photos/g04.webp' }, followers:2310, bpuppy:true },
    { id:'c4', name:'Ana L.',    username:'ana_cats',   initials:'AL', color:'#E91E63', city:'Miami, FL',       bio:'Cat mom de un Ragdoll', pet:{ name:'Simba', breed:'Ragdoll', img:'assets/photos/g05.webp' }, followers:560,  bpuppy:false },
    { id:'c5', name:'Marco B.',  username:'marco_bp',   initials:'MB', color:'#607D8B', city:'Houston, TX',     bio:'Aventuras con Coco', pet:{ name:'Coco', breed:'Labrador', img:'assets/photos/g06.webp' }, followers:980,  bpuppy:true },
    { id:'c6', name:'Rachel M.', username:'rach_dog',   initials:'RM', color:'#4CAF50', city:'Chicago, IL',     bio:'Frenchie life', pet:{ name:'Rocky', breed:'French Bulldog', img:'assets/photos/g03.webp' }, followers:1340, bpuppy:true },
  ],
  bpuppyEvents: [
    { id:'e1', title:'Meetup BPuppy en Bayfront Park', date:'Sábado 7 Junio · 10:00 AM', place:'Bayfront Park, Miami', img:'assets/photos/g03.webp', attendees:34, going:false },
    { id:'e2', title:'Clase de socialización para cachorros', date:'Domingo 15 Junio · 9:00 AM', place:'Local BPuppy, Haines City', img:'assets/photos/g01.webp', attendees:18, going:false },
    { id:'e3', title:'Feria de adopción + grooming gratis', date:'Sábado 28 Junio · 11:00 AM', place:'Central Bark Dog Park', img:'assets/photos/g06.webp', attendees:89, going:false },
  ],
  news: [
    { id:'n1', title:'Abrimos nuestro nuevo local de grooming en Haines City', date:'30 May 2026', tag:'BPuppy', img:'assets/photos/g02.webp', excerpt:'Más espacio, productos premium y pickup & delivery para consentir a tu mascota.' },
    { id:'n2', title:'Nuevo: planes de membresía con pickup incluido', date:'22 May 2026', tag:'Novedad', img:'assets/photos/g04.webp', excerpt:'Ahorra en cada baño y recibe beneficios VIP todos los meses.' },
    { id:'n3', title:'Guía: cómo preparar a tu cachorro para su primer grooming', date:'14 May 2026', tag:'Tips', img:'assets/photos/g05.webp', excerpt:'Pasos simples para que la primera visita sea tranquila y positiva.' },
  ],
  videos: [
    { id:'v1', title:'Un día en BPuppy Grooming', dur:'2:14', thumb:'assets/photos/g01.webp' },
    { id:'v2', title:'Transformación: antes y después', dur:'0:58', thumb:'assets/photos/g03.webp' },
    { id:'v3', title:'Tips de cepillado en casa', dur:'3:40', thumb:'assets/photos/g05.webp' },
    { id:'v4', title:'Meetup de la comunidad BPuppy', dur:'1:32', thumb:'assets/photos/g06.webp' },
  ],
};
window.BSDATA = BSDATA;
