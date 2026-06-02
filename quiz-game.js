(function(){
const { useState, useEffect, useRef } = React;
const Q = [
  { q: ["\xBFD\xF3nde vives?", "Where do you live?"], opts: [
    { e: "\u{1F3E2}", l: ["Apartamento en ciudad", "City apartment"] },
    { e: "\u{1F3E1}", l: ["Casa con patio", "House with a yard"] },
    { e: "\u{1F333}", l: ["Casa de campo", "Country house"] },
    { e: "\u{1F6CF}\uFE0F", l: ["Estudio peque\xF1o", "Small studio"] }
  ] },
  { q: ["\xBFPara qu\xE9 quieres un cachorro?", "Why do you want a puppy?"], opts: [
    { e: "\u{1F495}", l: ["Compa\xF1\xEDa en casa", "Companionship"] },
    { e: "\u{1F3C3}", l: ["Vida activa", "Active life"] },
    { e: "\u{1F917}", l: ["Apoyo emocional", "Emotional support"] },
    { e: "\u{1F476}", l: ["Compa\xF1ero para mis hijos", "For my kids"] },
    { e: "\u{1F9D3}", l: ["Compa\xF1\xEDa para un abuelito", "For a senior"] }
  ] },
  { q: ["\xBFQu\xE9 pelito te gusta m\xE1s?", "Which coat do you like?"], opts: [
    { e: "\u2702\uFE0F", l: ["Pelito corto", "Short coat"] },
    { e: "\u{1F9F6}", l: ["Pelito largo", "Long coat"] },
    { e: "\u{1F33F}", l: ["Que no suelte pelo", "Hypoallergenic"] },
    { e: "\u2728", l: ["\xA1El que sea, lindo!", "Any, cute!"] }
  ] },
  { q: ["\xBFCu\xE1nto vas a jugar y pasear?", "How much will you play & walk?"], opts: [
    { e: "\u{1F6B6}", l: ["Paseos cortos", "Short walks"] },
    { e: "\u{1F3BE}", l: ["Paseos medianos", "Medium walks"] },
    { e: "\u{1F3C3}\u200D\u2642\uFE0F", l: ["\xA1Mucho ejercicio!", "Lots of exercise"] },
    { e: "\u26F0\uFE0F", l: ["Todo el d\xEDa afuera", "All day outside"] }
  ] },
  { q: ["\xBFHas tenido perritos antes?", "Have you had dogs before?"], opts: [
    { e: "\u{1F423}", l: ["Es mi primero", "My first one"] },
    { e: "\u{1F415}", l: ["Un poco", "A little"] },
    { e: "\u{1F393}", l: ["\xA1Mucho!", "A lot!"] }
  ] },
  { q: ["\xBFDe qu\xE9 tama\xF1o lo quieres?", "What size do you want?"], opts: [
    { e: "\u{1F43E}", l: ["Peque\xF1ito", "Small"] },
    { e: "\u{1F415}", l: ["Mediano", "Medium"] },
    { e: "\u{1F9AE}", l: ["Grandote", "Large"] },
    { e: "\u2728", l: ["\xA1Sorpr\xE9ndeme!", "Surprise me!"] }
  ] },
  { q: ["\xBFHay ni\xF1os en tu casa?", "Are there kids at home?"], opts: [
    { e: "\u{1F476}", l: ["S\xED, chiquitos", "Yes, little ones"] },
    { e: "\u{1F9D2}", l: ["S\xED, medianos", "Yes, school age"] },
    { e: "\u{1F466}", l: ["Adolescentes", "Teens"] },
    { e: "\u{1F64B}", l: ["No hay ni\xF1os", "No kids"] }
  ] },
  { q: ["\xBFNecesitas un perro de apoyo especial?", "Need a special-support dog?"], opts: [
    { e: "\u{1F486}", l: ["Apoyo emocional", "Emotional support"] },
    { e: "\u{1F9E9}", l: ["Para alguien autista", "For someone autistic"] },
    { e: "\u{1F91D}", l: ["Ayuda a un abuelito", "Help a senior"] },
    { e: "\u{1F436}", l: ["No, un amigo normal", "No, just a friend"] }
  ] },
  { q: ["\xBFCu\xE1nto tiempo le vas a dedicar?", "How much time can you give?"], opts: [
    { e: "\u23F1\uFE0F", l: ["Poquito", "A little"] },
    { e: "\u{1F550}", l: ["Medio", "Some"] },
    { e: "\u{1F551}", l: ["Bastante", "Quite a bit"] },
    { e: "\u{1F4AF}", l: ["\xA1Todo el d\xEDa!", "All day!"] }
  ] },
  { q: ["\xBFC\xF3mo quieres que sea?", "How do you want it to be?"], opts: [
    { e: "\u{1F970}", l: ["Cari\xF1oso y tranquilo", "Cuddly & calm"] },
    { e: "\u26A1", l: ["Juguet\xF3n y con energ\xEDa", "Playful & energetic"] },
    { e: "\u{1F6E1}\uFE0F", l: ["Protector y leal", "Loyal & protective"] },
    { e: "\u{1F43A}", l: ["Independiente", "Independent"] }
  ] }
];
const BREEDS = [
  {
    name: "Golden Retriever",
    key: "golden",
    art: 1,
    match: 96,
    tone: "#E8A53D",
    img: "fotos-razas/Golden Retriever.webp",
    desc: ["Cari\xF1oso, inteligente y perfecto para familias. Le encantan los ni\xF1os.", "Affectionate, smart and perfect for families. Loves kids."],
    size: ["Grande", "Large"],
    energy: ["Alta", "High"],
    facts: [
      ["Les encanta nadar y traer la pelota una y otra vez.", "They love to swim and fetch over and over."],
      ["Son tan listos que aprenden trucos rapid\xEDsimo.", "So smart they learn tricks super fast."],
      ["De cachorros parecen peluches dorados.", "As puppies they look like golden teddy bears."]
    ]
  },
  {
    name: "French Bulldog",
    key: "frenchie",
    art: 2,
    match: 92,
    tone: "#B8B0A4",
    img: "fotos-razas/French Bulldog.webp",
    desc: ["Compacto, cari\xF1oso y feliz en espacios peque\xF1os. Ama el sof\xE1.", "Compact, affectionate and happy in small spaces. Loves the couch."],
    size: ["Peque\xF1o", "Small"],
    energy: ["Baja", "Low"],
    facts: [
      ["Tienen orejitas de murci\xE9lago muy graciosas.", "They have funny little bat ears."],
      ["A veces roncan cuando duermen.", "Sometimes they snore when they sleep."],
      ["No necesitan mucho ejercicio, \xA1aman descansar!", "They don\u2019t need much exercise, they love to rest!"]
    ]
  },
  {
    name: "Cavalier King Charles",
    key: "cavalier",
    art: 0,
    match: 89,
    tone: "#C9663B",
    img: "fotos-razas/Cavalier King Charles Spaniel.webp",
    desc: ["Dulce, tranquilo y el rey de los abrazos. Ideal para apoyo emocional.", "Sweet, calm and the king of cuddles. Great for emotional support."],
    size: ["Peque\xF1o", "Small"],
    energy: ["Media", "Moderate"],
    facts: [
      ["Siempre quieren estar cerca de ti.", "They always want to be near you."],
      ["Su pelito es suavecito como la seda.", "Their coat is silky soft."],
      ["Te siguen a todas partes como sombras.", "They follow you everywhere like little shadows."]
    ]
  },
  {
    name: "Labrador Retriever",
    key: "labrador",
    art: 3,
    match: 94,
    tone: "#3B2E26",
    img: "fotos-razas/Labrador Retriever.webp",
    desc: ["Activo, sociable y muy entrenable. El mejor amigo para jugar.", "Active, social and very trainable. The best playmate."],
    size: ["Grande", "Large"],
    energy: ["Alta", "High"],
    facts: [
      ["\xA1Aman el agua y los charcos!", "They love water and puddles!"],
      ["Pueden cargar cosas suavecito con la boca.", "They can carry things gently in their mouth."],
      ["Son perfectos para correr y jugar en el parque.", "Perfect for running and playing at the park."]
    ]
  },
  {
    name: "Poodle (Caniche)",
    key: "poodle",
    art: 4,
    match: 91,
    tone: "#E8DCC8",
    img: "fotos-razas/Standard Poodle.webp",
    desc: ["Su pelito rizado casi no suelta pelo. S\xFAper inteligente y elegante.", "Their curly coat barely sheds. Super smart and elegant."],
    size: ["Variable", "Varies"],
    energy: ["Media", "Moderate"],
    facts: [
      ["Su pelo rizado casi no suelta pelo.", "Their curly coat barely sheds."],
      ["Son de los perros m\xE1s inteligentes del mundo.", "One of the smartest dog breeds in the world."],
      ["Vienen en grande, mediano y mini.", "They come in standard, medium and mini."]
    ]
  },
  {
    name: "Beagle",
    key: "beagle",
    art: 7,
    match: 87,
    tone: "#C98A4B",
    img: "fotos-razas/Beagle.webp",
    desc: ["Juguet\xF3n, curioso y excelente con ni\xF1os. \xA1Pura personalidad!", "Playful, curious and great with kids. Full of personality!"],
    size: ["Mediano", "Medium"],
    energy: ["Alta", "High"],
    facts: [
      ["Tienen un olfato s\xFAper poderoso.", "They have a super powerful sense of smell."],
      ["Sus orejas largas son adorables.", "Their long ears are adorable."],
      ["Les encanta explorar y oler TODO.", "They love to explore and sniff EVERYTHING."]
    ]
  }
];
const BREED_INFO = {
  golden: {
    lifespan: ["10\u201312 a\xF1os", "10\u201312 yrs"],
    food: ["3\u20134 tazas", "3\u20134 cups"],
    weight: ["25\u201334 kg", "55\u201375 lb"],
    exercise: ["1\u20132 h/d\xEDa", "1\u20132 h/day"],
    energyPct: 85,
    exercisePct: 80,
    healthPct: 78,
    trainPct: 95,
    health: ["Robusto. Cuidar caderas y el peso.", "Sturdy. Watch hips and weight."],
    goodFor: [["Familias con ni\xF1os", "Families with kids"], ["Terapia y servicio", "Therapy & service"], ["Nadar y traer", "Swim & fetch"], ["Primer perro", "First-time owners"]]
  },
  frenchie: {
    lifespan: ["10\u201312 a\xF1os", "10\u201312 yrs"],
    food: ["1\u20131\xBD tazas", "1\u20131\xBD cups"],
    weight: ["8\u201314 kg", "18\u201328 lb"],
    exercise: ["20\u201340 min/d\xEDa", "20\u201340 min/day"],
    energyPct: 38,
    exercisePct: 30,
    healthPct: 55,
    trainPct: 62,
    health: ["Cuidar la respiraci\xF3n y el calor.", "Mind breathing and heat."],
    goodFor: [["Apartamentos", "Apartments"], ["Compa\xF1\xEDa en casa", "Home companion"], ["Poco ejercicio", "Low exercise"], ["Vida en ciudad", "City life"]]
  },
  cavalier: {
    lifespan: ["9\u201314 a\xF1os", "9\u201314 yrs"],
    food: ["\xBD\u20131 taza", "\xBD\u20131 cup"],
    weight: ["5\u20138 kg", "13\u201318 lb"],
    exercise: ["30\u201360 min/d\xEDa", "30\u201360 min/day"],
    energyPct: 50,
    exercisePct: 45,
    healthPct: 52,
    trainPct: 72,
    health: ["Vigilar el coraz\xF3n con el veterinario.", "Watch heart health with the vet."],
    goodFor: [["Apoyo emocional", "Emotional support"], ["Abrazos y calma", "Cuddles & calm"], ["Adultos mayores", "Seniors"], ["Apartamentos", "Apartments"]]
  },
  labrador: {
    lifespan: ["10\u201312 a\xF1os", "10\u201312 yrs"],
    food: ["3\u20134 tazas", "3\u20134 cups"],
    weight: ["25\u201336 kg", "55\u201380 lb"],
    exercise: ["1\u20132 h/d\xEDa", "1\u20132 h/day"],
    energyPct: 92,
    exercisePct: 90,
    healthPct: 78,
    trainPct: 90,
    health: ["Robusto. Controlar peso y caderas.", "Sturdy. Manage weight and hips."],
    goodFor: [["Familias activas", "Active families"], ["Deportes y agua", "Sports & water"], ["Servicio y rescate", "Service & rescue"], ["Jugar en el parque", "Park play"]]
  },
  poodle: {
    lifespan: ["12\u201315 a\xF1os", "12\u201315 yrs"],
    food: ["1\xBD\u20133 tazas", "1\xBD\u20133 cups"],
    weight: ["Variable", "Varies"],
    exercise: ["45\u201360 min/d\xEDa", "45\u201360 min/day"],
    energyPct: 60,
    exercisePct: 60,
    healthPct: 80,
    trainPct: 98,
    health: ["Longevo. Cepillar el pelaje seguido.", "Long-lived. Brush coat often."],
    goodFor: [["Alergias (poco pelo)", "Allergies (low shed)"], ["Aprender trucos", "Learning tricks"], ["Familias", "Families"], ["Tres tama\xF1os", "Three sizes"]]
  },
  beagle: {
    lifespan: ["12\u201315 a\xF1os", "12\u201315 yrs"],
    food: ["1\u20131\xBD tazas", "1\u20131\xBD cups"],
    weight: ["9\u201311 kg", "20\u201325 lb"],
    exercise: ["1 h+/d\xEDa", "1 h+/day"],
    energyPct: 80,
    exercisePct: 75,
    healthPct: 82,
    trainPct: 55,
    health: ["Sano. Controlar el peso (\xA1comil\xF3n!).", "Healthy. Watch weight (big eater!)."],
    goodFor: [["Ni\xF1os y juego", "Kids & play"], ["Explorar y oler", "Explore & sniff"], ["Familias activas", "Active families"], ["Aventuras al aire libre", "Outdoor adventures"]]
  }
};
const BREED_HISTORY = {
  golden: ["Criado en Escocia a finales del 1800 por Lord Tweedmouth como perro cobrador para aves de caza en agua y tierra. Su car\xE1cter dulce lo convirti\xF3 en uno de los perros familiares m\xE1s queridos del mundo.", "Bred in Scotland in the late 1800s by Lord Tweedmouth as a gundog to retrieve waterfowl. Its gentle nature made it one of the world\u2019s most beloved family dogs."],
  frenchie: ["Desciende de peque\xF1os bulldogs ingleses que llegaron a Francia con artesanos en el siglo XIX. Se volvi\xF3 la mascota favorita de los caf\xE9s de Par\xEDs y hoy es un s\xEDmbolo de compa\xF1\xEDa en la ciudad.", "Descends from small English bulldogs taken to France by lace workers in the 1800s. It became the darling of Parisian caf\xE9s and is now a symbol of city companionship."],
  cavalier: ["Lleva el nombre del rey Carlos II de Inglaterra, que adoraba a estos spaniels de juguete y casi nunca se separaba de ellos. Criado durante siglos como perro de compa\xF1\xEDa y de regazo de la realeza.", "Named after King Charles II of England, who adored these toy spaniels and was rarely without them. Bred for centuries as a royal companion and lap dog."],
  labrador: ["Originario de Terranova (Canad\xE1), ayudaba a los pescadores a halar redes y recoger peces. Refinado en Inglaterra como cobrador, hoy es perro gu\xEDa, de rescate y gran amigo familiar.", "From Newfoundland, Canada, where it helped fishermen haul nets and retrieve fish. Refined in England as a retriever, today it serves as a guide, rescue and family dog."],
  poodle: ['Naci\xF3 en Alemania como perro cobrador de agua (su nombre viene de "pudeln", chapotear); el corte elegante proteg\xEDa sus articulaciones al nadar. Francia lo adopt\xF3 como \xEDcono nacional.', 'Originated in Germany as a water retriever (its name comes from "pudeln", to splash); the fancy clip protected its joints while swimming. France later adopted it as a national icon.'],
  beagle: ["Antiguo sabueso ingl\xE9s de rastro, criado en jaur\xEDas para cazar conejos y liebres gracias a su olfato extraordinario. Su tama\xF1o y nobleza lo hicieron un excelente perro de familia.", "An ancient English scent hound, bred in packs to hunt rabbits and hares thanks to its extraordinary nose. Its size and good nature made it an excellent family dog."]
};
const BREED_MATCH = {
  golden: { sz: 3, en: 3, coat: "f", hypo: 0, kids: 2, apt: 0, train: 3, lap: 2, guard: 0, indep: 0 },
  frenchie: { sz: 1, en: 1, coat: "s", hypo: 0, kids: 2, apt: 2, train: 2, lap: 2, guard: 0, indep: 0 },
  cavalier: { sz: 1, en: 1, coat: "f", hypo: 0, kids: 2, apt: 2, train: 2, lap: 2, guard: 0, indep: 0 },
  labrador: { sz: 3, en: 3, coat: "s", hypo: 0, kids: 2, apt: 0, train: 3, lap: 1, guard: 0, indep: 0 },
  poodle: { sz: 2, en: 2, coat: "c", hypo: 1, kids: 2, apt: 1, train: 3, lap: 1, guard: 0, indep: 0 },
  beagle: { sz: 2, en: 3, coat: "s", hypo: 0, kids: 2, apt: 1, train: 1, lap: 1, guard: 0, indep: 1 },
  germanshepherd: { sz: 3, en: 3, coat: "s", hypo: 0, kids: 1, apt: 0, train: 3, lap: 0, guard: 2, indep: 1 },
  dachshund: { sz: 1, en: 2, coat: "s", hypo: 0, kids: 1, apt: 2, train: 1, lap: 2, guard: 1, indep: 1 },
  englishbulldog: { sz: 2, en: 1, coat: "s", hypo: 0, kids: 2, apt: 2, train: 1, lap: 2, guard: 0, indep: 0 },
  rottweiler: { sz: 3, en: 2, coat: "s", hypo: 0, kids: 1, apt: 0, train: 2, lap: 0, guard: 2, indep: 1 },
  pomeranian: { sz: 1, en: 2, coat: "f", hypo: 0, kids: 1, apt: 2, train: 2, lap: 2, guard: 1, indep: 0 },
  yorkie: { sz: 1, en: 2, coat: "f", hypo: 1, kids: 1, apt: 2, train: 2, lap: 2, guard: 1, indep: 0 },
  boxer: { sz: 3, en: 3, coat: "s", hypo: 0, kids: 2, apt: 0, train: 2, lap: 1, guard: 1, indep: 0 },
  doberman: { sz: 3, en: 3, coat: "s", hypo: 0, kids: 1, apt: 0, train: 3, lap: 0, guard: 2, indep: 1 },
  greatdane: { sz: 3, en: 1, coat: "s", hypo: 0, kids: 2, apt: 0, train: 2, lap: 1, guard: 1, indep: 0 },
  schnauzer: { sz: 1, en: 2, coat: "c", hypo: 1, kids: 2, apt: 2, train: 2, lap: 1, guard: 1, indep: 0 },
  husky: { sz: 3, en: 3, coat: "f", hypo: 0, kids: 1, apt: 0, train: 1, lap: 0, guard: 0, indep: 2 },
  bernese: { sz: 3, en: 2, coat: "f", hypo: 0, kids: 2, apt: 0, train: 2, lap: 2, guard: 1, indep: 0 },
  boston: { sz: 1, en: 2, coat: "s", hypo: 0, kids: 2, apt: 2, train: 2, lap: 1, guard: 0, indep: 0 },
  corgi: { sz: 1, en: 2, coat: "f", hypo: 0, kids: 2, apt: 1, train: 2, lap: 1, guard: 1, indep: 0 },
  aussie: { sz: 2, en: 3, coat: "f", hypo: 0, kids: 2, apt: 0, train: 3, lap: 0, guard: 1, indep: 0 },
  shihtzu: { sz: 1, en: 1, coat: "f", hypo: 1, kids: 2, apt: 2, train: 1, lap: 2, guard: 0, indep: 0 },
  pug: { sz: 1, en: 1, coat: "s", hypo: 0, kids: 2, apt: 2, train: 1, lap: 2, guard: 0, indep: 0 },
  havanese: { sz: 1, en: 2, coat: "f", hypo: 1, kids: 2, apt: 2, train: 2, lap: 2, guard: 0, indep: 0 },
  cocker: { sz: 2, en: 2, coat: "f", hypo: 0, kids: 2, apt: 1, train: 2, lap: 2, guard: 0, indep: 0 },
  maltese: { sz: 1, en: 1, coat: "f", hypo: 1, kids: 1, apt: 2, train: 2, lap: 2, guard: 0, indep: 0 },
  bordercollie: { sz: 2, en: 3, coat: "f", hypo: 0, kids: 1, apt: 0, train: 3, lap: 0, guard: 1, indep: 1 },
  chihuahua: { sz: 1, en: 2, coat: "s", hypo: 0, kids: 0, apt: 2, train: 1, lap: 2, guard: 1, indep: 1 },
  goldendoodle: { sz: 3, en: 2, coat: "c", hypo: 1, kids: 2, apt: 1, train: 3, lap: 2, guard: 0, indep: 0 },
  maltipoo: { sz: 1, en: 2, coat: "c", hypo: 1, kids: 2, apt: 2, train: 2, lap: 2, guard: 0, indep: 0 }
};
const _EXTRA = [
  {
    name: "German Shepherd",
    key: "germanshepherd",
    tone: "#6E5A3E",
    match: 93,
    img: "fotos-razas/German Shepherd.webp",
    desc: ["S\xFAper inteligente, valiente y leal. El compa\xF1ero protector por excelencia.", "Super smart, brave and loyal. The protective companion par excellence."],
    size: ["Grande", "Large"],
    energy: ["Alta", "High"],
    facts: [["Es de los perros m\xE1s f\xE1ciles de entrenar del mundo.", "One of the most trainable dogs in the world."], ["Trabaja con la polic\xEDa y en rescates.", "Works in police and rescue teams."]],
    info: { lifespan: ["9\u201313 a\xF1os", "9\u201313 yrs"], food: ["3\u20134 tazas", "3\u20134 cups"], weight: ["22\u201340 kg", "50\u201390 lb"], exercise: ["1\u20132 h/d\xEDa", "1\u20132 h/day"], energyPct: 88, exercisePct: 85, healthPct: 70, trainPct: 96, health: ["Cuidar caderas y articulaciones.", "Mind hips and joints."], goodFor: [["Familias activas", "Active families"], ["Protecci\xF3n", "Protection"], ["Trabajo y servicio", "Work & service"], ["Due\xF1os con experiencia", "Experienced owners"]] }
  },
  {
    name: "Dachshund",
    key: "dachshund",
    tone: "#7A3B1E",
    match: 88,
    img: "fotos-razas/Dachshund.webp",
    desc: ['El "perro salchicha": valiente, curioso y muy apegado a su familia.', 'The "wiener dog": brave, curious and very attached to its family.'],
    size: ["Peque\xF1o", "Small"],
    energy: ["Media", "Medium"],
    facts: [["Fue criado para cazar tejones en madrigueras.", "Bred to hunt badgers in their burrows."], ["Su ladrido es enorme para su tama\xF1o.", "Its bark is huge for its size."]],
    info: { lifespan: ["12\u201316 a\xF1os", "12\u201316 yrs"], food: ["\xBD\u20131\xBD tazas", "\xBD\u20131\xBD cups"], weight: ["7\u201315 kg", "16\u201332 lb"], exercise: ["30\u201345 min/d\xEDa", "30\u201345 min/day"], energyPct: 55, exercisePct: 45, healthPct: 62, trainPct: 60, health: ["Cuidar la espalda; evitar saltos altos.", "Protect the back; avoid high jumps."], goodFor: [["Apartamentos", "Apartments"], ["Compa\xF1\xEDa", "Companionship"], ["Adultos", "Adults"], ["Vida en ciudad", "City life"]] }
  },
  {
    name: "English Bulldog",
    key: "englishbulldog",
    tone: "#D9C3A0",
    match: 86,
    img: "fotos-razas/English Bulldog.webp",
    desc: ["Tranquilo, dulce y muy cari\xF1oso. Le encanta descansar contigo.", "Calm, sweet and very affectionate. Loves to relax with you."],
    size: ["Mediano", "Medium"],
    energy: ["Baja", "Low"],
    facts: [["Ronca y hace ruiditos graciosos al dormir.", "Snores and makes funny sounds when sleeping."], ["Es famoso por su carita arrugada.", "Famous for its wrinkly face."]],
    info: { lifespan: ["8\u201310 a\xF1os", "8\u201310 yrs"], food: ["1\u20132 tazas", "1\u20132 cups"], weight: ["18\u201325 kg", "40\u201355 lb"], exercise: ["20\u201330 min/d\xEDa", "20\u201330 min/day"], energyPct: 30, exercisePct: 25, healthPct: 48, trainPct: 55, health: ["Cuidar respiraci\xF3n y calor.", "Mind breathing and heat."], goodFor: [["Apartamentos", "Apartments"], ["Familias tranquilas", "Calm families"], ["Poco ejercicio", "Low exercise"], ["Compa\xF1\xEDa en casa", "Home companion"]] }
  },
  {
    name: "Rottweiler",
    key: "rottweiler",
    tone: "#2D2421",
    match: 88,
    img: "fotos-razas/Rottweiler.webp",
    desc: ["Fuerte, seguro y muy leal. Un guardi\xE1n cari\xF1oso con su familia.", "Strong, confident and very loyal. A loving guardian with its family."],
    size: ["Grande", "Large"],
    energy: ["Media-alta", "Medium-high"],
    facts: [["Ayudaba a los romanos a arrear ganado.", "Helped the Romans herd cattle."], ["Es protector pero muy dulce en casa.", "Protective yet very sweet at home."]],
    info: { lifespan: ["9\u201310 a\xF1os", "9\u201310 yrs"], food: ["3\u20135 tazas", "3\u20135 cups"], weight: ["35\u201360 kg", "80\u2013135 lb"], exercise: ["1 h/d\xEDa", "1 h/day"], energyPct: 72, exercisePct: 68, healthPct: 62, trainPct: 88, health: ["Cuidar caderas y peso.", "Mind hips and weight."], goodFor: [["Protecci\xF3n", "Protection"], ["Due\xF1os con experiencia", "Experienced owners"], ["Casa con patio", "House with yard"], ["Familias firmes", "Firm families"]] }
  },
  {
    name: "Pomeranian",
    key: "pomeranian",
    tone: "#E8A53D",
    match: 89,
    img: "fotos-razas/Pomeranian.webp",
    desc: ["Una bolita de pelos llena de energ\xEDa y personalidad. \xA1Pura alegr\xEDa!", "A fluffy ball full of energy and personality. Pure joy!"],
    size: ["Peque\xF1o", "Small"],
    energy: ["Media", "Medium"],
    facts: [["La reina Victoria los hizo famosos.", "Queen Victoria made them famous."], ["Parece un peluchito de juguete.", "Looks like a little plush toy."]],
    info: { lifespan: ["12\u201316 a\xF1os", "12\u201316 yrs"], food: ["\xBC\u2013\xBD taza", "\xBC\u2013\xBD cup"], weight: ["1.5\u20133.5 kg", "3\u20137 lb"], exercise: ["20\u201330 min/d\xEDa", "20\u201330 min/day"], energyPct: 60, exercisePct: 40, healthPct: 65, trainPct: 70, health: ["Cuidar dientes y rodillas.", "Mind teeth and knees."], goodFor: [["Apartamentos", "Apartments"], ["Compa\xF1\xEDa", "Companionship"], ["Adultos", "Adults"], ["Vida en ciudad", "City life"]] }
  },
  {
    name: "Yorkshire Terrier",
    key: "yorkie",
    tone: "#6B5A45",
    match: 88,
    img: "fotos-razas/Yorkshire Terrier.webp",
    desc: ["Chiquito, valiente y elegante. Casi no suelta pelo y adora su regazo.", "Tiny, brave and elegant. Barely sheds and loves your lap."],
    size: ["Peque\xF1o", "Small"],
    energy: ["Media", "Medium"],
    facts: [["Su pelito parece de seda.", "Its coat feels like silk."], ["Era cazador de ratas en f\xE1bricas inglesas.", "Was a rat-catcher in English mills."]],
    info: { lifespan: ["13\u201316 a\xF1os", "13\u201316 yrs"], food: ["\xBC\u2013\xBD taza", "\xBC\u2013\xBD cup"], weight: ["2\u20133.5 kg", "4\u20137 lb"], exercise: ["20\u201330 min/d\xEDa", "20\u201330 min/day"], energyPct: 58, exercisePct: 40, healthPct: 64, trainPct: 72, health: ["Cuidar dientes; pelo necesita peinado.", "Mind teeth; coat needs grooming."], goodFor: [["Apartamentos", "Apartments"], ["Poco pelo", "Low shedding"], ["Compa\xF1\xEDa", "Companionship"], ["Ciudad", "City life"]] }
  },
  {
    name: "Boxer",
    key: "boxer",
    tone: "#C58A4B",
    match: 89,
    img: "fotos-razas/Boxer.webp",
    desc: ["Juguet\xF3n, atl\xE9tico y muy cari\xF1oso con los ni\xF1os. \xA1Un payaso leal!", "Playful, athletic and very loving with kids. A loyal clown!"],
    size: ["Grande", "Large"],
    energy: ["Alta", "High"],
    facts: [['"Boxea" con las patas delanteras al jugar.', '"Boxes" with its front paws when playing.'], ["Se mantiene cachorro de coraz\xF3n por a\xF1os.", "Stays a puppy at heart for years."]],
    info: { lifespan: ["10\u201312 a\xF1os", "10\u201312 yrs"], food: ["2\u20133 tazas", "2\u20133 cups"], weight: ["25\u201332 kg", "55\u201370 lb"], exercise: ["1\u20132 h/d\xEDa", "1\u20132 h/day"], energyPct: 88, exercisePct: 82, healthPct: 62, trainPct: 80, health: ["Cuidar coraz\xF3n y calor.", "Mind heart and heat."], goodFor: [["Familias con ni\xF1os", "Families with kids"], ["Vida activa", "Active life"], ["Casa con patio", "House with yard"], ["Juego", "Play"]] }
  },
  {
    name: "Doberman Pinscher",
    key: "doberman",
    tone: "#2D2421",
    match: 88,
    img: "fotos-razas/Doberman Pinscher.webp",
    desc: ["Elegante, veloz y muy inteligente. Leal y protector con su familia.", "Elegant, fast and very smart. Loyal and protective of its family."],
    size: ["Grande", "Large"],
    energy: ["Alta", "High"],
    facts: [["Es de los perros m\xE1s r\xE1pidos y listos.", "One of the fastest and smartest dogs."], ["Te sigue como una sombra leal.", "Follows you like a loyal shadow."]],
    info: { lifespan: ["10\u201313 a\xF1os", "10\u201313 yrs"], food: ["3\u20134 tazas", "3\u20134 cups"], weight: ["27\u201345 kg", "60\u2013100 lb"], exercise: ["1\u20132 h/d\xEDa", "1\u20132 h/day"], energyPct: 86, exercisePct: 82, healthPct: 66, trainPct: 94, health: ["Cuidar coraz\xF3n; revisiones veterinarias.", "Mind heart; vet checkups."], goodFor: [["Protecci\xF3n", "Protection"], ["Due\xF1os con experiencia", "Experienced owners"], ["Vida activa", "Active life"], ["Casa con patio", "House with yard"]] }
  },
  {
    name: "Great Dane",
    key: "greatdane",
    tone: "#B8B0A4",
    match: 87,
    img: "fotos-razas/Great Dane.webp",
    desc: ["Un gigante gentil y tranquilo. Cree que es un perrito de regazo.", "A gentle, calm giant. Thinks it is a lap dog."],
    size: ["Muy grande", "Very large"],
    energy: ["Media-baja", "Medium-low"],
    facts: [["Es uno de los perros m\xE1s altos del mundo.", "One of the tallest dogs in the world."], ["A pesar de su tama\xF1o, es muy dulce.", "Despite its size, it is very sweet."]],
    info: { lifespan: ["7\u201310 a\xF1os", "7\u201310 yrs"], food: ["4\u20138 tazas", "4\u20138 cups"], weight: ["45\u201380 kg", "100\u2013175 lb"], exercise: ["45\u201360 min/d\xEDa", "45\u201360 min/day"], energyPct: 48, exercisePct: 50, healthPct: 50, trainPct: 75, health: ["Cuidar coraz\xF3n y est\xF3mago.", "Mind heart and stomach."], goodFor: [["Familias", "Families"], ["Casa amplia", "Spacious home"], ["Compa\xF1\xEDa gigante", "Giant companion"], ["Ni\xF1os", "Kids"]] }
  },
  {
    name: "Miniature Schnauzer",
    key: "schnauzer",
    tone: "#8A8A8A",
    match: 89,
    img: "fotos-razas/Miniature Schnauzer.webp",
    desc: ["Listo, alegre y con su barbita simp\xE1tica. Casi no suelta pelo.", "Smart, cheerful and with a charming beard. Barely sheds."],
    size: ["Peque\xF1o", "Small"],
    energy: ["Media", "Medium"],
    facts: [["Su barba y cejas lo hacen \xFAnico.", "Its beard and eyebrows make it unique."], ["Es excelente alarma de la casa.", "It is a great little watchdog."]],
    info: { lifespan: ["12\u201315 a\xF1os", "12\u201315 yrs"], food: ["\xBD\u20131 taza", "\xBD\u20131 cup"], weight: ["5\u20139 kg", "11\u201320 lb"], exercise: ["30\u201360 min/d\xEDa", "30\u201360 min/day"], energyPct: 65, exercisePct: 55, healthPct: 72, trainPct: 82, health: ["Cuidar peso; pelo necesita corte.", "Mind weight; coat needs trimming."], goodFor: [["Apartamentos", "Apartments"], ["Poco pelo", "Low shedding"], ["Familias", "Families"], ["Alarma", "Watchdog"]] }
  },
  {
    name: "Siberian Husky",
    key: "husky",
    tone: "#B8C2CC",
    match: 88,
    img: "fotos-razas/Siberian Husky.webp",
    desc: ['Hermoso, energ\xE9tico y aventurero. Ama correr y "hablar".', 'Beautiful, energetic and adventurous. Loves to run and "talk".'],
    size: ["Grande", "Large"],
    energy: ["Muy alta", "Very high"],
    facts: [["Tira de trineos en la nieve por horas.", "Pulls sleds in the snow for hours."], ["Hace aullidos y sonidos muy graciosos.", "Makes funny howls and sounds."]],
    info: { lifespan: ["12\u201315 a\xF1os", "12\u201315 yrs"], food: ["1\xBD\u20132 tazas", "1\xBD\u20132 cups"], weight: ["16\u201327 kg", "35\u201360 lb"], exercise: ["2 h/d\xEDa", "2 h/day"], energyPct: 95, exercisePct: 92, healthPct: 74, trainPct: 62, health: ["Necesita MUCHO ejercicio; suelta pelo.", "Needs LOTS of exercise; sheds a lot."], goodFor: [["Vida muy activa", "Very active life"], ["Aventura y correr", "Adventure & running"], ["Casa con patio", "House with yard"], ["Clima fresco", "Cool climate"]] }
  },
  {
    name: "Bernese Mountain Dog",
    key: "bernese",
    tone: "#2D2421",
    match: 90,
    img: "fotos-razas/Bernese Mountain Dog.webp",
    desc: ["Enorme, peludo y de coraz\xF3n gigante. Dulce y tranquilo con todos.", "Huge, fluffy and big-hearted. Sweet and calm with everyone."],
    size: ["Muy grande", "Very large"],
    energy: ["Media", "Medium"],
    facts: [["Ayudaba en las granjas de los Alpes suizos.", "Helped on farms in the Swiss Alps."], ["Adora la nieve y los abrazos.", "Loves snow and cuddles."]],
    info: { lifespan: ["7\u201310 a\xF1os", "7\u201310 yrs"], food: ["3\u20135 tazas", "3\u20135 cups"], weight: ["35\u201350 kg", "80\u2013110 lb"], exercise: ["45\u201360 min/d\xEDa", "45\u201360 min/day"], energyPct: 58, exercisePct: 55, healthPct: 52, trainPct: 80, health: ["Cuidar articulaciones; suelta pelo.", "Mind joints; sheds a lot."], goodFor: [["Familias con ni\xF1os", "Families with kids"], ["Casa amplia", "Spacious home"], ["Compa\xF1\xEDa gigante", "Giant companion"], ["Clima fresco", "Cool climate"]] }
  },
  {
    name: "Boston Terrier",
    key: "boston",
    tone: "#2D2421",
    match: 88,
    img: "fotos-razas/Boston Terrier.webp",
    desc: ['El "caballerito americano": elegante, alegre y perfecto para ciudad.', 'The "American Gentleman": dapper, cheerful and perfect for the city.'],
    size: ["Peque\xF1o", "Small"],
    energy: ["Media", "Medium"],
    facts: [["Parece que lleva esmoquin puesto.", "Looks like it is wearing a tuxedo."], ["Es muy bueno con todo el mundo.", "Gets along with everyone."]],
    info: { lifespan: ["11\u201313 a\xF1os", "11\u201313 yrs"], food: ["\xBD\u20131\xBD tazas", "\xBD\u20131\xBD cups"], weight: ["5\u201311 kg", "12\u201325 lb"], exercise: ["30\u201345 min/d\xEDa", "30\u201345 min/day"], energyPct: 62, exercisePct: 50, healthPct: 62, trainPct: 78, health: ["Cuidar respiraci\xF3n y ojos.", "Mind breathing and eyes."], goodFor: [["Apartamentos", "Apartments"], ["Familias", "Families"], ["Ciudad", "City life"], ["Primer perro", "First-time owners"]] }
  },
  {
    name: "Pembroke Welsh Corgi",
    key: "corgi",
    tone: "#E0A85A",
    match: 90,
    img: "fotos-razas/Pembroke Welsh Corgi.webp",
    desc: ["Patitas cortas, orejas grandes y mucha inteligencia. \xA1Adorable y listo!", "Short legs, big ears and lots of smarts. Adorable and clever!"],
    size: ["Peque\xF1o", "Small"],
    energy: ["Media", "Medium"],
    facts: [["Es el perro favorito de la reina de Inglaterra.", "It was the Queen of England\u2019s favorite dog."], ["Arreaba vacas a pesar de ser chiquito.", "Herded cattle despite being tiny."]],
    info: { lifespan: ["12\u201315 a\xF1os", "12\u201315 yrs"], food: ["\xBE\u20131\xBD tazas", "\xBE\u20131\xBD cups"], weight: ["10\u201314 kg", "22\u201331 lb"], exercise: ["45 min/d\xEDa", "45 min/day"], energyPct: 68, exercisePct: 60, healthPct: 66, trainPct: 85, health: ["Cuidar espalda y peso.", "Mind back and weight."], goodFor: [["Familias con ni\xF1os", "Families with kids"], ["Listos para juegos", "Game-loving"], ["Ciudad o campo", "City or country"], ["Primer perro", "First-time owners"]] }
  },
  {
    name: "Australian Shepherd",
    key: "aussie",
    tone: "#8A6A4A",
    match: 90,
    img: "fotos-razas/Australian Shepherd.webp",
    desc: ["Brillante, atl\xE9tico y leal. Aprende trucos rapid\xEDsimo.", "Brilliant, athletic and loyal. Learns tricks super fast."],
    size: ["Mediano", "Medium"],
    energy: ["Muy alta", "Very high"],
    facts: [["A veces tiene un ojo de cada color.", "Sometimes has one eye of each color."], ["Es campe\xF3n en deportes caninos.", "A champion in dog sports."]],
    info: { lifespan: ["12\u201315 a\xF1os", "12\u201315 yrs"], food: ["1\xBD\u20132\xBD tazas", "1\xBD\u20132\xBD cups"], weight: ["16\u201332 kg", "35\u201370 lb"], exercise: ["1\u20132 h/d\xEDa", "1\u20132 h/day"], energyPct: 92, exercisePct: 88, healthPct: 74, trainPct: 94, health: ["Necesita mucho ejercicio mental y f\xEDsico.", "Needs lots of mental and physical exercise."], goodFor: [["Vida muy activa", "Very active life"], ["Deportes caninos", "Dog sports"], ["Casa con patio", "House with yard"], ["Due\xF1os activos", "Active owners"]] }
  },
  {
    name: "Shih Tzu",
    key: "shihtzu",
    tone: "#D9C3A0",
    match: 88,
    img: "fotos-razas/Shih Tzu.webp",
    desc: ["Dulce, tranquilo y muy cari\xF1oso. Naci\xF3 para acompa\xF1ar y mimar.", "Sweet, calm and very affectionate. Born to be a cuddly companion."],
    size: ["Peque\xF1o", "Small"],
    energy: ["Baja", "Low"],
    facts: [["Viv\xEDa en palacios chinos como perro real.", "Lived in Chinese palaces as a royal dog."], ['Su nombre significa "perro le\xF3n".', 'Its name means "lion dog".']],
    info: { lifespan: ["10\u201316 a\xF1os", "10\u201316 yrs"], food: ["\xBD\u20131 taza", "\xBD\u20131 cup"], weight: ["4\u20137.5 kg", "9\u201316 lb"], exercise: ["20\u201330 min/d\xEDa", "20\u201330 min/day"], energyPct: 38, exercisePct: 30, healthPct: 62, trainPct: 60, health: ["Cuidar ojos y respiraci\xF3n; peinar el pelo.", "Mind eyes and breathing; brush the coat."], goodFor: [["Apartamentos", "Apartments"], ["Compa\xF1\xEDa", "Companionship"], ["Abuelitos", "Seniors"], ["Poco ejercicio", "Low exercise"]] }
  },
  {
    name: "Pug",
    key: "pug",
    tone: "#E8C98A",
    match: 87,
    img: "fotos-razas/Pug.webp",
    desc: ["Carita arrugada, payaso y muy amoroso. Vive para hacerte re\xEDr.", "Wrinkly face, clown and very loving. Lives to make you laugh."],
    size: ["Peque\xF1o", "Small"],
    energy: ["Baja", "Low"],
    facts: [["Su carita arrugada enamora a todos.", "Its wrinkly face charms everyone."], ["Le encanta dormir en tu regazo.", "Loves to nap in your lap."]],
    info: { lifespan: ["12\u201315 a\xF1os", "12\u201315 yrs"], food: ["\xBD\u20131 taza", "\xBD\u20131 cup"], weight: ["6\u20138 kg", "14\u201318 lb"], exercise: ["20\u201330 min/d\xEDa", "20\u201330 min/day"], energyPct: 40, exercisePct: 30, healthPct: 50, trainPct: 62, health: ["Cuidar respiraci\xF3n, peso y calor.", "Mind breathing, weight and heat."], goodFor: [["Apartamentos", "Apartments"], ["Familias", "Families"], ["Compa\xF1\xEDa", "Companionship"], ["Ciudad", "City life"]] }
  },
  {
    name: "Havanese",
    key: "havanese",
    tone: "#E8DCC8",
    match: 89,
    img: "fotos-razas/Havanese.webp",
    desc: ["Alegre, sociable y muy apegado. Casi no suelta pelo. \xA1Pura ternura!", "Cheerful, social and very attached. Barely sheds. Pure sweetness!"],
    size: ["Peque\xF1o", "Small"],
    energy: ["Media", "Medium"],
    facts: [["Es el perro nacional de Cuba.", "It is the national dog of Cuba."], ["Le encanta seguir a su familia a todos lados.", "Loves to follow its family everywhere."]],
    info: { lifespan: ["14\u201316 a\xF1os", "14\u201316 yrs"], food: ["\xBD\u20131 taza", "\xBD\u20131 cup"], weight: ["3\u20136 kg", "7\u201313 lb"], exercise: ["30 min/d\xEDa", "30 min/day"], energyPct: 55, exercisePct: 45, healthPct: 74, trainPct: 80, health: ["Pelo necesita peinado regular.", "Coat needs regular brushing."], goodFor: [["Apartamentos", "Apartments"], ["Poco pelo", "Low shedding"], ["Familias", "Families"], ["Compa\xF1\xEDa", "Companionship"]] }
  },
  {
    name: "Cocker Spaniel",
    key: "cocker",
    tone: "#C9663B",
    match: 88,
    img: "fotos-razas/Cocker Spaniel.webp",
    desc: ["Orejas largas, mirada dulce y coraz\xF3n juguet\xF3n. Gran amigo familiar.", "Long ears, sweet eyes and a playful heart. A great family friend."],
    size: ["Mediano", "Medium"],
    energy: ["Media", "Medium"],
    facts: [["Sus orejas largas y sedosas son famosas.", "Its long, silky ears are famous."], ['Inspir\xF3 a "La Dama" de Disney.', 'Inspired "Lady" from the Disney movie.']],
    info: { lifespan: ["10\u201314 a\xF1os", "10\u201314 yrs"], food: ["1\u20132 tazas", "1\u20132 cups"], weight: ["7\u201314 kg", "15\u201330 lb"], exercise: ["45\u201360 min/d\xEDa", "45\u201360 min/day"], energyPct: 62, exercisePct: 58, healthPct: 64, trainPct: 78, health: ["Cuidar orejas; peinar el pelo.", "Mind ears; brush the coat."], goodFor: [["Familias con ni\xF1os", "Families with kids"], ["Compa\xF1\xEDa", "Companionship"], ["Casa o apto", "House or apt"], ["Primer perro", "First-time owners"]] }
  },
  {
    name: "Maltese",
    key: "maltese",
    tone: "#FBF7F0",
    match: 88,
    img: "fotos-razas/Maltese.webp",
    desc: ["Blanco, sedoso y elegante. Cari\xF1oso, valiente y casi no suelta pelo.", "White, silky and elegant. Affectionate, brave and barely sheds."],
    size: ["Peque\xF1o", "Small"],
    energy: ["Baja", "Low"],
    facts: [["Es una raza con m\xE1s de 2,000 a\xF1os.", "A breed over 2,000 years old."], ["Su pelo blanco parece de seda.", "Its white coat looks like silk."]],
    info: { lifespan: ["12\u201315 a\xF1os", "12\u201315 yrs"], food: ["\xBC\u2013\xBD taza", "\xBC\u2013\xBD cup"], weight: ["2\u20134 kg", "4\u20138 lb"], exercise: ["20\u201330 min/d\xEDa", "20\u201330 min/day"], energyPct: 45, exercisePct: 35, healthPct: 66, trainPct: 72, health: ["Cuidar dientes; peinar a diario.", "Mind teeth; brush daily."], goodFor: [["Apartamentos", "Apartments"], ["Poco pelo", "Low shedding"], ["Compa\xF1\xEDa", "Companionship"], ["Abuelitos", "Seniors"]] }
  },
  {
    name: "Border Collie",
    key: "bordercollie",
    tone: "#2D2421",
    match: 90,
    img: "fotos-razas/Border Collie.webp",
    desc: ["El perro m\xE1s inteligente del mundo. Energ\xE9tico y aprende todo al instante.", "The smartest dog in the world. Energetic and learns everything instantly."],
    size: ["Mediano", "Medium"],
    energy: ["Muy alta", "Very high"],
    facts: [["Puede aprender cientos de palabras.", "Can learn hundreds of words."], ["Pastorea ovejas con la mirada.", "Herds sheep with its stare."]],
    info: { lifespan: ["12\u201315 a\xF1os", "12\u201315 yrs"], food: ["1\xBD\u20132 tazas", "1\xBD\u20132 cups"], weight: ["14\u201320 kg", "30\u201345 lb"], exercise: ["2 h/d\xEDa", "2 h/day"], energyPct: 96, exercisePct: 95, healthPct: 76, trainPct: 98, health: ["Necesita MUCHO ejercicio y tareas.", "Needs LOTS of exercise and jobs."], goodFor: [["Vida muy activa", "Very active life"], ["Deportes y trucos", "Sports & tricks"], ["Casa con patio", "House with yard"], ["Due\xF1os dedicados", "Dedicated owners"]] }
  },
  {
    name: "Chihuahua",
    key: "chihuahua",
    tone: "#E0A85A",
    match: 86,
    img: "fotos-razas/Chihuahua.webp",
    desc: ["El m\xE1s chiquito del mundo, con un coraz\xF3n valiente y gran personalidad.", "The smallest dog in the world, with a brave heart and big personality."],
    size: ["Muy peque\xF1o", "Tiny"],
    energy: ["Media", "Medium"],
    facts: [["Es el perro m\xE1s peque\xF1o del mundo.", "It is the smallest dog breed in the world."], ["Le encanta el calorcito y las cobijas.", "Loves warmth and cozy blankets."]],
    info: { lifespan: ["14\u201318 a\xF1os", "14\u201318 yrs"], food: ["\xBC\u2013\xBD taza", "\xBC\u2013\xBD cup"], weight: ["1.5\u20133 kg", "3\u20136 lb"], exercise: ["20\u201330 min/d\xEDa", "20\u201330 min/day"], energyPct: 58, exercisePct: 40, healthPct: 68, trainPct: 60, health: ["Cuidar dientes; protegerlo del fr\xEDo.", "Mind teeth; keep it warm."], goodFor: [["Apartamentos", "Apartments"], ["Adultos", "Adults"], ["Compa\xF1\xEDa", "Companionship"], ["Ciudad", "City life"]] }
  },
  {
    name: "Goldendoodle",
    key: "goldendoodle",
    tone: "#E8C98A",
    match: 93,
    img: "fotos-razas/Goldendoodle.webp",
    desc: ["Mezcla de Golden y Poodle: tierno, listo y casi no suelta pelo. \xA1El favorito de las familias!", "A Golden + Poodle mix: sweet, smart and barely sheds. A family favorite!"],
    size: ["Mediano-grande", "Medium-large"],
    energy: ["Media-alta", "Medium-high"],
    facts: [["Casi no suelta pelo, ideal para alergias.", "Barely sheds, great for allergies."], ["Es s\xFAper cari\xF1oso y f\xE1cil de entrenar.", "Super affectionate and easy to train."]],
    info: { lifespan: ["10\u201315 a\xF1os", "10\u201315 yrs"], food: ["1\xBD\u20133 tazas", "1\xBD\u20133 cups"], weight: ["14\u201340 kg", "30\u201390 lb"], exercise: ["1 h/d\xEDa", "1 h/day"], energyPct: 72, exercisePct: 68, healthPct: 78, trainPct: 92, health: ["Pelo necesita corte y peinado.", "Coat needs trimming and brushing."], goodFor: [["Familias con ni\xF1os", "Families with kids"], ["Alergias (poco pelo)", "Allergies (low shed)"], ["Terapia", "Therapy"], ["Primer perro", "First-time owners"]] }
  },
  {
    name: "Maltipoo",
    key: "maltipoo",
    tone: "#F0E6D6",
    match: 90,
    img: "fotos-razas/Maltipoo.webp",
    desc: ["Mezcla de Malt\xE9s y Poodle: peque\xF1ito, mimoso y casi no suelta pelo.", "A Maltese + Poodle mix: tiny, cuddly and barely sheds."],
    size: ["Peque\xF1o", "Small"],
    energy: ["Media", "Medium"],
    facts: [["Es como un peluche que casi no suelta pelo.", "Like a plushie that barely sheds."], ["Adora estar en brazos y dar besitos.", "Loves being held and giving kisses."]],
    info: { lifespan: ["12\u201316 a\xF1os", "12\u201316 yrs"], food: ["\xBC\u2013\xBE taza", "\xBC\u2013\xBE cup"], weight: ["2.5\u20137 kg", "5\u201315 lb"], exercise: ["30 min/d\xEDa", "30 min/day"], energyPct: 58, exercisePct: 45, healthPct: 74, trainPct: 82, health: ["Pelo necesita corte; cuidar dientes.", "Coat needs trimming; mind teeth."], goodFor: [["Apartamentos", "Apartments"], ["Alergias (poco pelo)", "Allergies (low shed)"], ["Familias", "Families"], ["Compa\xF1\xEDa", "Companionship"]] }
  }
];
_EXTRA.forEach(function(x) {
  BREEDS.push({ name: x.name, key: x.key, art: 0, match: x.match, tone: x.tone, img: x.img, desc: x.desc, size: x.size, energy: x.energy, facts: x.facts });
  BREED_INFO[x.key] = x.info;
});
let _ac = null;
const ac = () => {
  try {
    if (!_ac) _ac = new (window.AudioContext || window.webkitAudioContext)();
    return _ac;
  } catch (e) {
    return null;
  }
};
const beep = (freq, dur, type, when, gain) => {
  if (window._quizMuted) return;
  const c = ac();
  if (!c) return;
  try {
    if (c.state === "suspended") c.resume();
  } catch (e) {
  }
  const o = c.createOscillator(), g = c.createGain();
  o.type = type || "triangle";
  o.frequency.value = freq;
  o.connect(g);
  g.connect(c.destination);
  const t0 = c.currentTime + (when || 0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain || 0.06, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(1e-4, t0 + (dur || 0.12));
  o.start(t0);
  o.stop(t0 + (dur || 0.12) + 0.03);
};
const sndPick = () => {
  beep(540, 0.09, "triangle", 0, 0.05);
  beep(810, 0.1, "triangle", 0.05, 0.05);
};
const sndBack = () => {
  beep(360, 0.1, "sine", 0, 0.04);
};
const sndWin = () => {
  [523, 659, 784, 1047, 1319].forEach((f, i) => beep(f, 0.22, "triangle", i * 0.11, 0.07));
};
const sndJump = () => {
  beep(420, 0.1, "square", 0, 0.05);
  beep(680, 0.1, "square", 0.05, 0.05);
};
const sndCoin = () => {
  beep(988, 0.07, "square", 0, 0.05);
  beep(1319, 0.12, "square", 0.06, 0.05);
};
const sndStep = () => {
  beep(180, 0.04, "square", 0, 0.025);
};
const sndOver = () => {
  [392, 330, 262, 196].forEach((f, i) => beep(f, 0.18, "square", i * 0.12, 0.06));
};
const sndPrize = () => {
  [659, 784, 988, 1319, 1568].forEach((f, i) => beep(f, 0.18, "square", i * 0.09, 0.06));
};
const sndYeah = () => {
  beep(660, 0.07, "triangle", 0, 0.05);
  beep(990, 0.08, "triangle", 0.06, 0.05);
  beep(1320, 0.12, "triangle", 0.13, 0.06);
};
const sndBark = () => {
  beep(300, 0.09, "sawtooth", 0, 0.06);
  beep(190, 0.13, "sawtooth", 0.09, 0.06);
  beep(320, 0.09, "sawtooth", 0.3, 0.06);
  beep(200, 0.13, "sawtooth", 0.39, 0.06);
};
const sndHit = () => {
  beep(200, 0.14, "square", 0, 0.06);
  beep(140, 0.16, "square", 0.08, 0.05);
};
const sndLife = () => {
  [784, 1047, 1319, 1568].forEach((f, i) => beep(f, 0.1, "triangle", i * 0.06, 0.05));
};
const sndPlane = () => {
  const c = ac();
  if (!c || window._quizMuted) return;
  try {
    if (c.state === "suspended") c.resume();
  } catch (e) {
  }
  const o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain();
  o.type = "sine";
  o2.type = "sine";
  o.connect(g);
  o2.connect(g);
  g.connect(c.destination);
  const t0 = c.currentTime;
  o.frequency.setValueAtTime(330, t0);
  o.frequency.exponentialRampToValueAtTime(784, t0 + 0.9);
  o2.frequency.setValueAtTime(660, t0);
  o2.frequency.exponentialRampToValueAtTime(1568, t0 + 0.9);
  g.gain.setValueAtTime(1e-4, t0);
  g.gain.linearRampToValueAtTime(0.03, t0 + 0.3);
  g.gain.exponentialRampToValueAtTime(1e-4, t0 + 1);
  o.start(t0);
  o2.start(t0);
  o.stop(t0 + 1.05);
  o2.stop(t0 + 1.05);
};
const sndHero = () => {
  [392, 523, 659, 784, 1047].forEach((f, i) => beep(f, 0.2, "triangle", i * 0.1, 0.06));
};
const sndWohoo = () => {
  const c = ac();
  if (!c || window._quizMuted) return;
  const o = c.createOscillator(), g = c.createGain();
  o.type = "triangle";
  o.connect(g);
  g.connect(c.destination);
  const t0 = c.currentTime;
  o.frequency.setValueAtTime(520, t0);
  o.frequency.exponentialRampToValueAtTime(1046, t0 + 0.45);
  g.gain.setValueAtTime(1e-4, t0);
  g.gain.linearRampToValueAtTime(0.06, t0 + 0.05);
  g.gain.exponentialRampToValueAtTime(1e-4, t0 + 0.55);
  o.start(t0);
  o.stop(t0 + 0.6);
};
const sndSwoosh = () => {
  const c = ac();
  if (!c || window._quizMuted) return;
  try {
    if (c.state === "suspended") c.resume();
  } catch (e) {
  }
  const dur = 0.9, n = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, n, c.sampleRate), data = buf.getChannelData(0);
  for (let i = 0; i < n; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 1.4);
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 0.7;
  const t0 = c.currentTime;
  bp.frequency.setValueAtTime(280, t0);
  bp.frequency.exponentialRampToValueAtTime(1500, t0 + 0.4);
  bp.frequency.exponentialRampToValueAtTime(420, t0 + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(1e-4, t0);
  g.gain.linearRampToValueAtTime(0.05, t0 + 0.12);
  g.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
  src.connect(bp);
  bp.connect(g);
  g.connect(c.destination);
  src.start(t0);
  src.stop(t0 + dur + 0.02);
};
let _bpMusic = { on: false, timer: null, step: 0 };
function startMusic() {
  if (_bpMusic.on) return;
  _bpMusic.on = true;
  _bpMusic.step = 0;
  const c = ac();
  if (!c) return;
  try {
    if (c.state === "suspended") c.resume();
  } catch (e) {
  }
  const bass = [110, 0, 146.83, 0, 98, 0, 130.81, 0];
  const chord = [[220, 261.63, 329.63], 0, 0, 0, [196, 246.94, 293.66], 0, 0, 0];
  const tone = (freq, dur, type, gain) => {
    if (!c || window._quizMuted || freq <= 0) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.value = freq;
    o.connect(g);
    g.connect(c.destination);
    const t0 = c.currentTime;
    g.gain.setValueAtTime(1e-4, t0);
    g.gain.linearRampToValueAtTime(gain, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
    o.start(t0);
    o.stop(t0 + dur + 0.02);
  };
  _bpMusic.timer = setInterval(() => {
    if (!_bpMusic.on) return;
    const i = _bpMusic.step % 8;
    if (bass[i]) tone(bass[i], 0.26, "triangle", 0.05);
    if (i % 2 === 1) tone(6e3, 0.025, "square", 0.01);
    if (Array.isArray(chord[i])) chord[i].forEach((f) => tone(f, 0.46, "sine", 0.02));
    _bpMusic.step++;
  }, 340);
}
function stopMusic() {
  _bpMusic.on = false;
  if (_bpMusic.timer) {
    clearInterval(_bpMusic.timer);
    _bpMusic.timer = null;
  }
}
function ensureCss() {
  if (document.getElementById("qg-css")) return;
  const s = document.createElement("style");
  s.id = "qg-css";
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
    /* Resultado en 2 columnas (PC) -> 1 columna (m\xF3vil/tablet) */
    .qg-rgrid{ display:grid; grid-template-columns:minmax(0,0.92fr) minmax(0,1.08fr); gap:16px; align-items:stretch; }
    @media (max-width:880px){ .qg-rgrid{ grid-template-columns:1fr; } }
    .qg-stat{ background:var(--paper); border-radius:12px; padding:9px 11px; }
    .qg-stat .k{ font-size:10.5px; color:var(--ink-soft); font-weight:700; text-transform:uppercase; letter-spacing:.04em; }
    .qg-stat .v{ font-size:14px; color:var(--ink); font-weight:800; }
    .qg-bar{ height:8px; border-radius:999px; background:var(--paper); overflow:hidden; }
    .qg-bar>i{ display:block; height:100%; border-radius:999px; background:linear-gradient(90deg,#F58220,#E85D75); }
    .qg-chip{ font-size:12px; font-weight:700; color:var(--orange2,#C2521E); background:#FFF1E2; border:1px solid rgba(245,130,32,0.25); border-radius:999px; padding:4px 11px; }
    /* Bot\xF3n JUGAR con borde arco\xEDris animado (texto centrado, color estable) */
    @keyframes qgRainbow{ to{ background-position:0 0,-300% 0; } }
    .qg-jugar{ display:flex; align-items:center; justify-content:center; gap:8px; width:100%; padding:15px; border:3px solid transparent; border-radius:16px;
      background:linear-gradient(#fff,#fff) padding-box, linear-gradient(90deg,#ff4d4d,#ff9f1c,#ffd93d,#4ade80,#38bdf8,#a855f7,#ff4d4d) border-box;
      background-size:100% 100%,300% 100%; animation:qgRainbow 3s linear infinite;
      font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:19px; letter-spacing:.02em; color:var(--ink); cursor:pointer; transition:transform .12s; }
    .qg-jugar:hover{ transform:translateY(-2px); }
    .qg-jugar:active{ transform:scale(.98); }
    .qg-wrap{ max-width:560px; }
  `;
  document.head.appendChild(s);
}
function Confetti() {
  const items = Array.from({ length: 28 });
  const emojis = ["\u{1F43E}", "\u{1F389}", "\u2B50", "\u{1F9B4}", "\u{1F49B}", "\u{1F9E1}"];
  return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 40 } }, items.map((_, i) => {
    const left = Math.random() * 100, d = 2 + Math.random() * 2.5, delay = Math.random() * 0.6, sz = 16 + Math.random() * 18;
    return /* @__PURE__ */ React.createElement("span", { key: i, style: { position: "absolute", left: left + "%", bottom: "-40px", fontSize: sz, animation: `qgFloat ${d}s ${delay}s ease-in forwards` } }, emojis[i % emojis.length]);
  }));
}
const GAME_SUPA_URL = "https://oqqwmcplljirbreowrll.supabase.co";
const GAME_SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xcXdtY3BsbGppcmJyZW93cmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMTY0NTQsImV4cCI6MjA5Mjg5MjQ1NH0.t-PFS9h62ag7Gmqzs8exQjV9eL1p-4V7E2syv4GPzW4";
let _gameSupa = null;
const gameSupa = () => {
  try {
    if (!_gameSupa && window.supabase) _gameSupa = window.supabase.createClient(GAME_SUPA_URL, GAME_SUPA_KEY);
  } catch (e) {
  }
  return _gameSupa;
};
const COUNTRIES = ["Estados Unidos", "M\xE9xico", "Colombia", "Argentina", "Espa\xF1a", "Per\xFA", "Chile", "Venezuela", "Ecuador", "Guatemala", "Cuba", "Bolivia", "Rep\xFAblica Dominicana", "Honduras", "Paraguay", "El Salvador", "Nicaragua", "Costa Rica", "Panam\xE1", "Uruguay", "Puerto Rico", "Brasil", "Canad\xE1", "Otro"];
const CITY_HINTS = ["Miami", "Orlando", "Houston", "Los \xC1ngeles", "Nueva York", "Chicago", "Ciudad de M\xE9xico", "Guadalajara", "Bogot\xE1", "Medell\xEDn", "Buenos Aires", "Madrid", "Barcelona", "Lima", "Santiago", "Caracas", "Quito", "San Juan"];
function drawDog(ctx, x, baseY, tone, key, frame, airborne) {
  const m = typeof BREED_MATCH !== "undefined" && BREED_MATCH[key] || {};
  const P = m.sz === 3 ? 2.6 : m.sz === 1 ? 2.2 : 2.4;
  const px = (cx, cy, w, h, col) => {
    ctx.fillStyle = col;
    ctx.fillRect(Math.round(x + cx * P), Math.round(baseY + cy * P), Math.max(1, w * P), Math.max(1, h * P));
  };
  const sh = (hex, a) => {
    hex = String(hex || "#caa").replace("#", "");
    if (hex.length === 3) hex = hex.split("").map(function(c) {
      return c + c;
    }).join("");
    var r = parseInt(hex.slice(0, 2), 16);
    var g = parseInt(hex.slice(2, 4), 16);
    var b = parseInt(hex.slice(4, 6), 16);
    if (isNaN(r)) r = 180;
    if (isNaN(g)) g = 150;
    if (isNaN(b)) b = 120;
    var f = a < 0 ? 1 + a : 1, add = a > 0 ? a * 255 : 0;
    return "rgb(" + Math.round(Math.min(255, r * f + add)) + "," + Math.round(Math.min(255, g * f + add)) + "," + Math.round(Math.min(255, b * f + add)) + ")";
  };
  const hi = sh(tone, 0.24), lo = sh(tone, -0.2), ear = sh(tone, -0.16);
  const dark = "#2D2421", white = "#FBF7F0", belly = sh(tone, 0.3), collar = "#E23B3B", tag = "#F5C53A", nose = "#2D2421";
  const coat = m.coat || (key === "poodle" ? "c" : "s");
  const POINTY = { germanshepherd: 1, husky: 1, corgi: 1, pomeranian: 1, chihuahua: 1, aussie: 1, schnauzer: 1, yorkie: 1 };
  const BAT = { frenchie: 1, boston: 1 };
  if (!airborne) {
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = "#2D2421";
    ctx.beginPath();
    ctx.ellipse(x + 9 * P, baseY + 1.3 * P, 9 * P, 2 * P, 0, 0, 7);
    ctx.fill();
    ctx.restore();
  }
  if (airborne) {
    px(3, -1, 2, 2, lo);
    px(9, -1, 2, 2, lo);
  } else if (frame % 2 === 0) {
    px(2, 0, 2, 2, lo);
    px(9, 0, 2, 2, lo);
  } else {
    px(4, 0, 2, 2, lo);
    px(7, 0, 2, 2, lo);
  }
  const tw = airborne ? -1 : frame % 2 ? -1 : 0;
  if (coat === "c") {
    px(-1, -8 + tw, 3, 3, hi);
    px(-2, -6 + tw, 2, 2, tone);
  } else if (coat === "f") {
    px(-3, -8 + tw, 4, 4, tone);
    px(-3, -9 + tw, 3, 2, hi);
  } else {
    px(-2, -7 + tw, 3, 2, tone);
    px(-1, -9 + tw, 2, 2, tone);
  }
  px(1, -7, 12, 6, tone);
  px(1, -8, 12, 1, hi);
  px(1, -2, 12, 1, lo);
  px(2, -3, 9, 2, belly);
  if (coat === "f") {
    px(2, -9, 2, 1, hi);
    px(6, -9, 2, 1, hi);
    px(10, -9, 2, 1, hi);
  }
  px(9, -7, 2, 3, collar);
  px(9, -5, 1, 1, tag);
  px(9, -13, 7, 6, tone);
  px(10, -14, 5, 1, hi);
  px(9, -9, 7, 1, lo);
  px(15, -10, 3, 3, key === "beagle" || key === "boston" || key === "bordercollie" ? white : coat === "s" ? tone : hi);
  px(17, -10, 1, 1, nose);
  px(16, -8, 2, 1, nose);
  px(13, -12, 1, 1, dark);
  px(13.4, -12.4, 0.6, 0.6, white);
  if (BAT[key]) {
    px(9, -15, 2, 2, hi);
    px(14, -15, 2, 2, hi);
  } else if (POINTY[key]) {
    px(8, -16, 2, 3, tone);
    px(15, -16, 2, 3, tone);
    px(8, -16, 1, 1, hi);
    px(15, -16, 1, 1, hi);
  } else if (coat === "c") {
    px(8, -15, 3, 4, hi);
    px(14, -15, 3, 4, hi);
  } else {
    px(8, -13, 2, 5, ear);
    px(15, -13, 2, 4, ear);
  }
  if (key === "golden" || key === "goldendoodle") {
    px(0, -7, 1, 6, sh(tone, -0.14));
  }
}
function PrizeSymbol({ tier, size }) {
  const s = size || 40;
  const col = ["#9aa0a6", "#CD7F32", "#C0C0C0", "#F5C53A", "#FF7A1A"][tier] || "#F5C53A";
  if (tier >= 3) {
    return /* @__PURE__ */ React.createElement("svg", { width: s, height: s, viewBox: "0 0 48 48", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M14 8h20v6a10 10 0 01-20 0V8z", fill: col, stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M14 11H8a6 6 0 006 7M34 11h6a6 6 0 01-6 7", stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("rect", { x: "20", y: "26", width: "8", height: "7", fill: col, stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("rect", { x: "14", y: "33", width: "20", height: "5", rx: "1.5", fill: col, stroke: "#2D2421", strokeWidth: "2" }));
  }
  if (tier === 2) {
    return /* @__PURE__ */ React.createElement("svg", { width: s, height: s, viewBox: "0 0 48 48", fill: "none" }, /* @__PURE__ */ React.createElement("path", { d: "M18 6l6 12 6-12", stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "24", cy: "30", r: "11", fill: col, stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "24", cy: "30", r: "5", fill: "#fff", opacity: ".5" }));
  }
  return /* @__PURE__ */ React.createElement("svg", { width: s, height: s, viewBox: "0 0 48 48", fill: "none" }, /* @__PURE__ */ React.createElement("rect", { x: "14", y: "20", width: "20", height: "8", rx: "4", fill: col, stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "19", r: "5", fill: col, stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "29", r: "5", fill: col, stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "34", cy: "19", r: "5", fill: col, stroke: "#2D2421", strokeWidth: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "34", cy: "29", r: "5", fill: col, stroke: "#2D2421", strokeWidth: "2" }));
}
function BreedRunner({ breed, t, lang, onCreateProfile, prefillEmail }) {
  const tone = breed.tone || "#E8A53D";
  const cvsRef = useRef(null);
  const stRef = useRef(null);
  const rafRef = useRef(0);
  const [phase, setPhase] = useState("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try {
      return parseInt(localStorage.getItem("bp_game_best") || "0", 10) || 0;
    } catch (e) {
      return 0;
    }
  });
  const [board, setBoard] = useState([]);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lives, setLives] = useState(3);
  const [treats, setTreats] = useState(0);
  const [flyIntro, setFlyIntro] = useState(false);
  const [flyWide, setFlyWide] = useState(false);
  const [paused, setPaused] = useState(false);
  const wrapRef = useRef(null);
  const lastTouchRef = useRef(0);
  const W = 360, H = 200, GY = H - 24;
  const MAXLIVES = 4, GRAV = 0.42, JUMPV = 6.9;
  const loadBoard = () => {
    const s = gameSupa();
    if (!s) return;
    s.from("game_scores").select("name,country,city,score,breed").order("score", { ascending: false }).limit(10).then(({ data }) => {
      if (data) setBoard(data);
    }).catch(() => {
    });
  };
  useEffect(() => {
    loadBoard();
  }, []);
  const newState = () => ({
    py: 0,
    vy: 0,
    grounded: true,
    jumps: 0,
    frame: 0,
    fcount: 0,
    speed: 2.8,
    dist: 0,
    score: 0,
    treats: 0,
    lives: 4,
    inv: 0,
    obst: [],
    treatArr: [],
    heartArr: [],
    plats: [],
    clouds: [{ x: 60, y: 28 }, { x: 200, y: 46 }, { x: 320, y: 22 }],
    hills: [{ x: 0, w: 200, h: 46 }, { x: 230, w: 240, h: 64 }, { x: 430, w: 200, h: 40 }],
    bldgs: [{ x: 40, w: 46, h: 54 }, { x: 150, w: 38, h: 74 }, { x: 250, w: 54, h: 46 }, { x: 330, w: 40, h: 64 }],
    nextObst: 300,
    nextTreat: 120,
    nextHeart: 1500,
    nextPlat: 380,
    over: false,
    mode: "run",
    transT: 0,
    flyTarget: H - 110,
    airObst: [],
    cats: [],
    projs: [],
    nextCat: 420,
    vW: W,
    wantWide: false,
    widening: false,
    wideT: 0,
    paused: false,
    glowT: 0
  });
  const jump = () => {
    const st = stRef.current;
    if (!st || st.over) return;
    if (st.grounded) {
      st.vy = JUMPV;
      st.grounded = false;
      st.jumps = 1;
      sndJump();
    } else if ((st.jumps || 0) < 2) {
      st.vy = JUMPV * 0.92;
      st.jumps = (st.jumps || 0) + 1;
      sndJump();
    }
  };
  const endGame = (finalScore, treatsCollected) => {
    stopMusic();
    setFlyIntro(false);
    setFlyWide(false);
    setPaused(false);
    if (wrapRef.current) wrapRef.current.style.maxWidth = "";
    const tier = prizeTier(finalScore);
    setPhase("over");
    setScore(finalScore);
    sndOver();
    setTimeout(() => {
      sndPrize();
      if (tier >= 3) setTimeout(sndBark, 480);
    }, 320);
    try {
      const b = Math.max(finalScore, parseInt(localStorage.getItem("bp_game_best") || "0", 10) || 0);
      localStorage.setItem("bp_game_best", String(b));
      setBest(b);
      if (finalScore >= 300) localStorage.setItem("bp_game_silver", "1");
    } catch (e) {
    }
  };
  const dismissFlyIntro = () => {
    const st = stRef.current;
    if (!st) return;
    st.mode = "fly";
    st.flyTarget = st.py;
    if (st.wantWide && !st.widening && (st.wideT || 0) < 1) {
      st.widening = true;
      setFlyWide(true);
    }
    setFlyIntro(false);
    startMusic();
  };
  const togglePause = () => {
    const st = stRef.current;
    if (phase !== "playing" || !st) return;
    const p = !st.paused;
    st.paused = p;
    setPaused(p);
    if (p) {
      stopMusic();
    } else if (st.mode === "fly") {
      startMusic();
    }
  };
  const resumeGame = () => {
    const st = stRef.current;
    if (st) st.paused = false;
    setPaused(false);
    if (st && st.mode === "fly") {
      startMusic();
    }
  };
  useEffect(() => {
    if (phase !== "playing") return;
    const onDown = (e) => {
      const st = stRef.current;
      if (!st || st.paused) return;
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        st.paused = true;
        setPaused(true);
        stopMusic();
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [phase]);
  const start = () => {
    try {
      const c = ac();
      if (c && c.state === "suspended") c.resume();
    } catch (e) {
    }
    stopMusic();
    setFlyIntro(false);
    setFlyWide(false);
    setPaused(false);
    if (wrapRef.current) wrapRef.current.style.maxWidth = "";
    stRef.current = newState();
    setScore(0);
    setLives(4);
    setTreats(0);
    setSaved(false);
    setPhase("playing");
  };
  useEffect(() => {
    if (phase !== "playing") return;
    const cvs = cvsRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2) * 1.5;
    cvs.width = W * DPR;
    cvs.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.imageSmoothingEnabled = true;
    let running = true;
    const drawCape = (cx, baseY, f) => {
      const w = Math.sin(f * 0.3) * 3;
      ctx.fillStyle = "#E23B3B";
      ctx.beginPath();
      ctx.moveTo(cx + 19, baseY - 22);
      ctx.quadraticCurveTo(cx + 4 + w, baseY - 25, cx - 8 + w, baseY - 6);
      ctx.quadraticCurveTo(cx + 1 + w, baseY - 2, cx + 12, baseY - 9);
      ctx.lineTo(cx + 19, baseY - 15);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#b51d1d";
      ctx.fillRect(cx + 15, baseY - 23, 7, 3);
    };
    const drawLives = (st) => {
      for (let i = 0; i < MAXLIVES; i++) {
        const hx = 9 + i * 17, ty = 8, on = i < st.lives, s = 12, cx = hx + s / 2;
        ctx.save();
        if (on) {
          ctx.shadowColor = "rgba(226,59,59,0.55)";
          ctx.shadowBlur = 6;
        }
        ctx.fillStyle = on ? "#E23B3B" : "rgba(45,36,33,0.15)";
        ctx.beginPath();
        ctx.moveTo(cx, ty + s * 0.3);
        ctx.bezierCurveTo(cx, ty, hx, ty, hx, ty + s * 0.3);
        ctx.bezierCurveTo(hx, ty + s * 0.55, cx, ty + s * 0.8, cx, ty + s);
        ctx.bezierCurveTo(cx, ty + s * 0.8, hx + s, ty + s * 0.55, hx + s, ty + s * 0.3);
        ctx.bezierCurveTo(hx + s, ty, cx, ty, cx, ty + s * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    };
    const FLYW = 640;
    const flyLoop = (st) => {
      const dogX = 60, dogW = 22;
      if (st.widening) {
        st.wideT = Math.min(1, (st.wideT || 0) + 0.012);
        const e = 1 - Math.pow(1 - st.wideT, 3);
        st.vW = Math.round(W + (FLYW - W) * e);
        const need = Math.round(st.vW * DPR);
        if (cvs.width !== need) {
          cvs.width = need;
          cvs.height = H * DPR;
          ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
          ctx.imageSmoothingEnabled = true;
        }
        if (wrapRef.current) {
          const mw = Math.min(Math.round(st.vW * 1.555), Math.round(window.innerWidth * 0.97));
          wrapRef.current.style.maxWidth = mw + "px";
        }
        if (st.wideT >= 1) st.widening = false;
      }
      const VW = st.vW || W;
      const grd = ctx.createLinearGradient(0, 0, 0, H);
      grd.addColorStop(0, "#8FC9EE");
      grd.addColorStop(1, "#DFF1FB");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, VW, H);
      ctx.save();
      ctx.translate(VW / 2, H / 2);
      ctx.scale(1.12, 1.12);
      ctx.translate(-VW / 2, -H / 2);
      st.clouds.forEach((c) => {
        c.x -= st.speed * 0.4;
        if (c.x < -44) {
          c.x = VW + 20;
          c.y = 10 + Math.random() * 120;
        }
        ctx.fillStyle = "#fff";
        ctx.fillRect(c.x, c.y, 22, 7);
        ctx.fillRect(c.x + 7, c.y - 6, 14, 7);
      });
      if (st.mode === "transform") {
        st.transT++;
        st.py += (110 - st.py) * 0.06;
        const gx = dogX + 11, gy = GY - st.py - 10, gr = 14 + st.transT * 0.55 + Math.sin(st.transT * 0.4) * 3;
        const gl = ctx.createRadialGradient(gx, gy, 2, gx, gy, Math.max(6, gr));
        gl.addColorStop(0, "rgba(255,236,150,0.95)");
        gl.addColorStop(0.45, "rgba(255,180,60,0.55)");
        gl.addColorStop(1, "rgba(255,170,50,0)");
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = gl;
        ctx.beginPath();
        ctx.arc(gx, gy, Math.max(6, gr), 0, 7);
        ctx.fill();
        for (var _k = 0; _k < 6; _k++) {
          var _ang = st.transT * 0.11 + _k * 1.047;
          var _rr = 20 + Math.sin(st.transT * 0.18 + _k) * 8;
          var _sx = gx + Math.cos(_ang) * _rr, _sy = gy + Math.sin(_ang) * _rr * 0.7, _ss = 1.4 + Math.abs(Math.sin(st.transT * 0.3 + _k)) * 1.6;
          ctx.fillStyle = "rgba(255,244,180,0.95)";
          ctx.fillRect(_sx - _ss / 2, _sy - _ss / 2, _ss, _ss);
        }
        ctx.restore();
        drawCape(dogX, GY - st.py, st.transT);
        drawDog(ctx, dogX, GY - st.py, tone, breed.key, st.frame, true);
        ctx.fillStyle = "#C2521E";
        ctx.font = "bold 18px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("\xA1WOHOOO!", dogX + 44, GY - st.py - 30);
        ctx.textAlign = "left";
        if (st.transT >= 145) {
          st.mode = "flyintro";
          setFlyIntro(true);
        }
        ctx.restore();
        drawLives(st);
        return;
      }
      if (st.mode === "flyintro") {
        drawCape(dogX, GY - st.py, st.fcount);
        drawDog(ctx, dogX, GY - st.py, tone, breed.key, st.frame, true);
        ctx.restore();
        drawLives(st);
        return;
      }
      st.fcount++;
      st.speed = Math.min(6.6, Math.max(st.speed, 4.3));
      st.dist += st.speed;
      st.score = Math.floor(st.dist / 10) + st.treats * 8;
      if (st.fcount % 6 === 0) setScore(st.score);
      if (st.inv > 0) st.inv--;
      if (st.holdUp) st.flyTarget = Math.min(H - 30, (st.flyTarget == null ? st.py : st.flyTarget) + 3.4);
      if (st.holdDown) st.flyTarget = Math.max(6, (st.flyTarget == null ? st.py : st.flyTarget) - 3.4);
      st.py += (Math.max(6, Math.min(H - 30, st.flyTarget)) - st.py) * 0.42;
      st.frame = Math.floor(st.fcount / 6) % 2;
      st.nextObst -= st.speed;
      if (st.nextObst <= 0) {
        st.airObst.push({ x: VW + 12, y: 26 + Math.random() * 120, w: 16, h: 12 });
        st.nextObst = 215 - Math.min(st.speed * 8, 46) + Math.random() * 150;
      }
      st.airObst.forEach((o) => o.x -= st.speed);
      st.airObst = st.airObst.filter((o) => o.x + o.w > -6);
      st.nextTreat -= st.speed;
      if (st.nextTreat <= 0) {
        let tx = VW + 12;
        for (const o of st.airObst) {
          if (Math.abs(o.x - tx) < 50) {
            tx = o.x + o.w + 45;
            break;
          }
        }
        st.treatArr.push({ x: tx, y: GY - (40 + Math.random() * 110), got: false });
        st.nextTreat = 80 + Math.random() * 120;
      }
      st.treatArr.forEach((c) => c.x -= st.speed);
      st.treatArr = st.treatArr.filter((c) => c.x > -12 && !c.got);
      st.nextCat -= st.speed;
      if (st.nextCat <= 0) {
        st.cats.push({ x: VW - 10, y: GY - 2, t: 0 });
        st.nextCat = 420 + Math.random() * 320;
      }
      st.cats.forEach((cat) => {
        cat.x -= st.speed * 0.7;
        cat.t++;
        if (cat.t % 75 === 0) {
          const dy = GY - st.py - 10 - (cat.y - 8);
          st.projs.push({ x: cat.x + 4, y: cat.y - 8, vx: -(2.2 + st.speed * 0.3), vy: dy * 0.012 - 1 });
        }
      });
      st.cats = st.cats.filter((cat) => cat.x > -26);
      st.projs.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
      });
      st.projs = st.projs.filter((p) => p.x > -10 && p.y < H + 12);
      const dogTop = GY - st.py - 22, dogBottom = GY - st.py, dogLeft = dogX, dogRight = dogX + dogW;
      const hit = () => {
        st.lives--;
        st.inv = 72;
        setLives(st.lives);
        sndHit();
        if (st.lives <= 0) st.over = true;
      };
      if (st.inv <= 0) {
        for (const o of st.airObst) {
          if (dogRight > o.x && dogLeft < o.x + o.w && dogBottom > o.y && dogTop < o.y + o.h) {
            hit();
            break;
          }
        }
      }
      if (st.inv <= 0) {
        for (const p of st.projs) {
          if (Math.abs(p.x - (dogX + 11)) < 11 && Math.abs(p.y - (GY - st.py - 10)) < 11) {
            hit();
            p.x = -999;
            break;
          }
        }
      }
      for (const c of st.treatArr) {
        if (!c.got && Math.abs(c.x - (dogX + 11)) < 15 && Math.abs(c.y - (GY - st.py - 10)) < 16) {
          c.got = true;
          st.treats++;
          setTreats(st.treats);
          sndYeah();
        }
      }
      st.treatArr.forEach((c) => {
        if (c.got) return;
        ctx.fillStyle = "#F7E08A";
        ctx.fillRect(c.x, c.y, 8, 4);
        ctx.fillStyle = "#E8C04A";
        ctx.fillRect(c.x - 1, c.y - 1, 3, 6);
        ctx.fillRect(c.x + 6, c.y - 1, 3, 6);
      });
      st.airObst.forEach((o) => {
        ctx.fillStyle = "#7a8aa0";
        ctx.fillRect(o.x, o.y, o.w, o.h);
        ctx.fillStyle = "#5d6b82";
        ctx.fillRect(o.x, o.y + o.h - 3, o.w, 3);
      });
      st.cats.forEach((cat) => {
        ctx.fillStyle = "#555";
        ctx.fillRect(cat.x, cat.y - 10, 12, 10);
        ctx.fillStyle = "#555";
        ctx.fillRect(cat.x, cat.y - 13, 3, 3);
        ctx.fillRect(cat.x + 9, cat.y - 13, 3, 3);
        ctx.fillStyle = "#ffd23f";
        ctx.fillRect(cat.x + 2, cat.y - 8, 2, 2);
        ctx.fillRect(cat.x + 8, cat.y - 8, 2, 2);
      });
      st.projs.forEach((p) => {
        ctx.fillStyle = "#8a4b2a";
        ctx.fillRect(p.x, p.y, 6, 6);
      });
      if (!(st.inv > 0 && Math.floor(st.fcount / 4) % 2)) {
        drawCape(dogX, GY - st.py, st.fcount);
        drawDog(ctx, dogX, GY - st.py, tone, breed.key, st.frame, true);
      }
      ctx.restore();
      drawLives(st);
    };
    const loop = () => {
      if (!running) return;
      const st = stRef.current;
      if (!st) {
        return;
      }
      if (st.paused) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      if ((st.mode || "run") !== "run") {
        flyLoop(st);
        if (st.over) {
          running = false;
          stopMusic();
          endGame(st.score, st.treats);
          return;
        }
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      if (st.fcount >= (window._BP_FLY_AT || 3600)) {
        st.mode = "transform";
        st.transT = 0;
        st.flyTarget = H - 110;
        st.wantWide = typeof window !== "undefined" && window.innerWidth >= 820;
        st.py = 0;
        st.vy = 0;
        st.speed = 0;
        sndSwoosh();
        flyLoop(st);
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      const dogX = 46, dogW = 25, dogH = 25;
      st.dist += st.speed;
      const ramp = Math.max(0, st.dist - 800);
      const steps = Math.floor((st.fcount || 0) / 1200);
      st.speed = Math.min(6.2, 2.8 + Math.min(ramp / 3200, 1.1) + steps * 0.22);
      if (st.inv > 0) st.inv--;
      st.vy -= GRAV;
      st.py += st.vy;
      const dogCx = dogX + 15;
      let floor = 0;
      for (const p of st.plats) {
        if (dogCx > p.x - 3 && dogCx < p.x + p.w + 3 && st.vy <= 0 && st.py >= p.top - 7 && st.py <= p.top + 14) floor = Math.max(floor, p.top);
      }
      if (st.py <= floor) {
        st.py = floor;
        st.vy = 0;
        st.grounded = true;
        st.jumps = 0;
      } else {
        st.grounded = false;
      }
      st.fcount++;
      if (st.grounded && st.fcount % Math.max(4, 8 - Math.floor(st.speed)) === 0) {
        st.frame++;
        if (st.fcount % 20 === 0) sndStep();
      }
      st.clouds.forEach((c) => {
        c.x -= st.speed * 0.25;
        if (c.x < -40) {
          c.x = W + 20;
          c.y = 16 + Math.random() * 40;
        }
      });
      st.bldgs.forEach((b) => {
        b.x -= st.speed * 0.5;
        if (b.x + b.w < -6) {
          b.x = W + Math.random() * 40;
          b.w = 34 + Math.random() * 26;
          b.h = 40 + Math.random() * 40;
        }
      });
      st.hills.forEach((hl) => {
        hl.x -= st.speed * 0.18;
        if (hl.x + hl.w < -10) {
          hl.x = W + Math.random() * 120;
          hl.w = 180 + Math.random() * 120;
          hl.h = 38 + Math.random() * 36;
        }
      });
      st.nextPlat -= st.speed;
      if (st.nextPlat <= 0) {
        const top = 36 + Math.floor(Math.random() * 62);
        const w = 48 + Math.floor(Math.random() * 38);
        st.plats.push({ x: W + 10, w, top });
        if (Math.random() < 0.75) st.treatArr.push({ x: W + 10 + w / 2 - 4, y: GY - top - 16, got: false });
        st.nextPlat = 320 + Math.random() * 300;
      }
      st.plats.forEach((p) => {
        p.x -= st.speed;
      });
      st.plats = st.plats.filter((p) => p.x + p.w > -6);
      st.nextObst -= st.speed;
      if (st.nextObst <= 0 && st.dist > 360) {
        const hh = 14 + Math.floor(Math.random() * 14);
        st.obst.push({ x: W + 10, w: 10 + Math.floor(Math.random() * 8), h: hh });
        st.nextObst = 180 - Math.min(st.speed * 10, 48) + Math.random() * 140;
      }
      st.obst.forEach((o) => {
        o.x -= st.speed;
      });
      st.obst = st.obst.filter((o) => o.x + o.w > -4);
      st.nextTreat -= st.speed;
      if (st.nextTreat <= 0) {
        let tx = W + 10;
        for (const o of st.obst) {
          if (Math.abs(o.x - tx) < 60) {
            tx = o.x + o.w + 50;
            break;
          }
        }
        const ground = Math.random() < 0.6;
        st.treatArr.push({ x: tx, y: ground ? GY - 16 : GY - (34 + Math.random() * 22), got: false });
        st.nextTreat = 90 + Math.random() * 150;
      }
      st.treatArr.forEach((c) => {
        c.x -= st.speed;
      });
      st.treatArr = st.treatArr.filter((c) => c.x > -12 && !c.got);
      st.nextHeart -= st.speed;
      if (st.nextHeart <= 0) {
        if (st.lives < MAXLIVES) st.heartArr.push({ x: W + 10, y: GY - (38 + Math.random() * 10), got: false });
        st.nextHeart = 1700 + Math.random() * 1200;
      }
      st.heartArr.forEach((c) => {
        c.x -= st.speed;
      });
      st.heartArr = st.heartArr.filter((c) => c.x > -12 && !c.got);
      const dogBottom = GY - st.py, dogLeft = dogX, dogRight = dogX + dogW;
      if (st.inv <= 0) {
        for (const o of st.obst) {
          const oTop = GY - o.h;
          if (dogRight > o.x + 2 && dogLeft < o.x + o.w - 2 && dogBottom > oTop + 3) {
            st.lives--;
            st.inv = 72;
            setLives(st.lives);
            sndHit();
            if (st.lives <= 0) st.over = true;
            break;
          }
        }
      }
      for (const c of st.treatArr) {
        if (!c.got && Math.abs(c.x - (dogX + 15)) < 15 && Math.abs(c.y - (dogBottom - 13)) < 18) {
          c.got = true;
          st.treats++;
          setTreats(st.treats);
          sndYeah();
        }
      }
      for (const c of st.heartArr) {
        if (!c.got && Math.abs(c.x - (dogX + 15)) < 16 && Math.abs(c.y - (dogBottom - 13)) < 20) {
          c.got = true;
          if (st.lives < MAXLIVES) {
            st.lives++;
            setLives(st.lives);
          }
          sndLife();
        }
      }
      st.score = Math.floor(st.dist / 10) + st.treats * 8;
      if (st.fcount % 6 === 0) setScore(st.score);
      const grd = ctx.createLinearGradient(0, 0, 0, H);
      grd.addColorStop(0, "#BFE3F2");
      grd.addColorStop(1, "#EAF6FB");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
      ctx.save();
      ctx.translate(W - 36, 30);
      ctx.strokeStyle = "rgba(255,213,138,0.55)";
      ctx.lineWidth = 2;
      const ray = Math.floor(st.dist * 0.5) % 30;
      for (let a = 0; a < 8; a++) {
        const ang = a * Math.PI / 4 + ray * 0.01;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * 16, Math.sin(ang) * 16);
        ctx.lineTo(Math.cos(ang) * 22, Math.sin(ang) * 22);
        ctx.stroke();
      }
      ctx.fillStyle = "#FFD98A";
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, 7);
      ctx.fill();
      ctx.restore();
      st.hills.forEach((hl) => {
        ctx.fillStyle = "#CDE9B8";
        ctx.beginPath();
        ctx.moveTo(hl.x, GY + 4);
        ctx.quadraticCurveTo(hl.x + hl.w / 2, GY + 4 - hl.h, hl.x + hl.w, GY + 4);
        ctx.closePath();
        ctx.fill();
      });
      st.bldgs.forEach((b) => {
        ctx.fillStyle = "#cfe0d6";
        ctx.fillRect(b.x, GY - b.h, b.w, b.h);
        ctx.fillStyle = "#b4c9bd";
        for (let wy = GY - b.h + 6; wy < GY - 6; wy += 10) {
          for (let wx = b.x + 5; wx < b.x + b.w - 5; wx += 10) {
            ctx.fillRect(wx, wy, 5, 5);
          }
        }
      });
      ctx.fillStyle = "#FFFFFF";
      st.clouds.forEach((c) => {
        ctx.fillRect(c.x, c.y, 18, 6);
        ctx.fillRect(c.x + 6, c.y - 5, 12, 6);
      });
      ctx.fillStyle = "#9BD46B";
      ctx.fillRect(0, GY + 4, W, H - GY - 4);
      ctx.fillStyle = "#7CC04E";
      ctx.fillRect(0, GY + 4, W, 4);
      ctx.fillStyle = "#6B4A2B";
      ctx.fillRect(0, GY + 8, W, H - GY - 8);
      ctx.fillStyle = "#5c3f24";
      const off = Math.floor(st.dist) % 16;
      for (let gx = -off; gx < W; gx += 16) {
        ctx.fillRect(gx, GY + 12, 8, 3);
      }
      st.plats.forEach((p) => {
        const py = GY - p.top;
        ctx.fillStyle = "#C2521E";
        ctx.fillRect(p.x, py, p.w, 8);
        ctx.fillStyle = "#E0742F";
        ctx.fillRect(p.x, py, p.w, 3);
        ctx.fillStyle = "#9c3f12";
        for (let bx = p.x + 2; bx < p.x + p.w - 2; bx += 10) {
          ctx.fillRect(bx, py + 3, 2, 5);
        }
      });
      st.obst.forEach((o) => {
        const oy = GY - o.h;
        ctx.fillStyle = "#3C7A3C";
        ctx.fillRect(o.x, oy, o.w, o.h);
        ctx.fillStyle = "#4E994E";
        ctx.fillRect(o.x, oy, o.w, 4);
        ctx.fillStyle = "#2F5F2F";
        ctx.fillRect(o.x + 2, oy + o.h - 4, o.w - 4, 4);
      });
      st.treatArr.forEach((c) => {
        if (c.got) return;
        ctx.fillStyle = "#F7E08A";
        ctx.fillRect(c.x, c.y, 8, 4);
        ctx.fillStyle = "#E8C04A";
        ctx.fillRect(c.x - 1, c.y - 1, 3, 6);
        ctx.fillRect(c.x + 6, c.y - 1, 3, 6);
      });
      st.heartArr.forEach((c) => {
        if (c.got) return;
        ctx.fillStyle = "#E23B3B";
        ctx.fillRect(c.x + 1, c.y + 2, 7, 4);
        ctx.fillRect(c.x, c.y, 3, 3);
        ctx.fillRect(c.x + 6, c.y, 3, 3);
        ctx.beginPath();
        ctx.moveTo(c.x, c.y + 3);
        ctx.lineTo(c.x + 4.5, c.y + 9);
        ctx.lineTo(c.x + 9, c.y + 3);
        ctx.fill();
      });
      if (!(st.inv > 0 && Math.floor(st.fcount / 4) % 2)) {
        drawDog(ctx, dogX, GY - st.py, tone, breed.key, st.frame, !st.grounded);
      }
      drawLives(st);
      if (st.over) {
        running = false;
        endGame(st.score, st.treats);
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      stopMusic();
    };
  }, [phase]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.code !== "Space" && e.code !== "ArrowUp" && e.code !== "ArrowDown") return;
      e.preventDefault();
      const st = stRef.current;
      if (phase !== "playing") {
        if (phase !== "over") start();
        return;
      }
      if (st && st.paused) return;
      if (st && st.mode === "flyintro") {
        dismissFlyIntro();
        return;
      }
      if (st && st.mode === "fly") {
        if (e.code === "ArrowUp") {
          st.holdUp = true;
          st.flyTarget = Math.min(H - 30, (st.flyTarget == null ? st.py : st.flyTarget) + 10);
        } else if (e.code === "ArrowDown") {
          st.holdDown = true;
          st.flyTarget = Math.max(6, (st.flyTarget == null ? st.py : st.flyTarget) - 10);
        }
        return;
      }
      if (e.code !== "ArrowDown") jump();
    };
    const onUp = (e) => {
      const st = stRef.current;
      if (!st) return;
      if (e.code === "ArrowUp") st.holdUp = false;
      if (e.code === "ArrowDown") st.holdDown = false;
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onUp);
    };
  }, [phase]);
  const flyAim = (clientY, el) => {
    const st = stRef.current;
    if (!st || st.mode !== "fly" || !el) return;
    const r = el.getBoundingClientRect();
    if (!r.height) return;
    const ly = (clientY - r.top) * (H / r.height);
    st.flyTarget = Math.max(0, Math.min(GY - 22, GY - ly));
  };
  const tap = () => {
    const st = stRef.current;
    if (phase === "ready") {
      start();
      return;
    }
    if (phase !== "playing") return;
    if (st && st.mode === "flyintro") {
      dismissFlyIntro();
      return;
    }
    if (st && st.mode === "fly") {
      st.flyTarget = Math.max(0, Math.min(GY - 22, (st.flyTarget == null ? st.py : st.flyTarget) + 22));
      return;
    }
    jump();
  };
  const submitScore = () => {
    const s = gameSupa();
    const nm = name.trim();
    if (!nm) {
      return;
    }
    setSaving(true);
    const row = { name: nm.slice(0, 40), country: country || null, city: city.trim() || null, breed: breed.name, score };
    if (prefillEmail) row.email = prefillEmail;
    const done = () => {
      setSaving(false);
      setSaved(true);
      loadBoard();
      try {
        localStorage.setItem("bp_game_player", JSON.stringify({ name: nm, country, city }));
      } catch (e) {
      }
    };
    if (s) {
      s.from("game_scores").insert(row).then(({ error }) => {
        done();
      }).catch(() => {
        setSaving(false);
        setSaved(true);
      });
    } else {
      done();
    }
  };
  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem("bp_game_player") || "null");
      if (p) {
        setName(p.name || "");
        setCountry(p.country || "");
        setCity(p.city || "");
      }
    } catch (e) {
    }
  }, []);
  const cardSt = { background: "#fff", borderRadius: 24, border: "1px solid var(--line)", overflow: "hidden", boxShadow: "0 10px 40px rgba(45,36,33,0.12)" };
  const firstName = breed.name.split(" (")[0];
  return /* @__PURE__ */ React.createElement("div", { ref: wrapRef, className: "qg-wrap", style: { margin: "0 auto", padding: "18px 16px 80px" } }, /* @__PURE__ */ React.createElement("div", { className: "qg-pop", style: { ...cardSt, transition: "box-shadow 0.7s ease", boxShadow: flyWide ? "0 0 0 3px rgba(255,170,50,0.55), 0 26px 80px rgba(245,130,32,0.45)" : cardSt.boxShadow } }, /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,#F58220,#E85D75)", padding: "14px 18px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontWeight: 800, fontSize: 17, flex: "1 1 auto", minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, t(["Corre con tu", "Run with your"]), " ", firstName), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "center", fontSize: 13, fontWeight: 800, flexShrink: 0, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 4 }, title: "Treats" }, /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 48 48", fill: "#fff" }, /* @__PURE__ */ React.createElement("rect", { x: "14", y: "20", width: "20", height: "8", rx: "4" }), /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "19", r: "5" }), /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "29", r: "5" }), /* @__PURE__ */ React.createElement("circle", { cx: "34", cy: "19", r: "5" }), /* @__PURE__ */ React.createElement("circle", { cx: "34", cy: "29", r: "5" })), treats), /* @__PURE__ */ React.createElement("span", null, t(["Puntos", "Score"]), ": ", score), /* @__PURE__ */ React.createElement("span", { style: { opacity: 0.85 } }, t(["Mejor", "Best"]), ": ", best))), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", background: "#EAF6FB", lineHeight: 0, userSelect: "none", WebkitUserSelect: "none", touchAction: "none", overflow: "hidden" }, onMouseDown: (e) => {
    e.preventDefault();
    if (Date.now() - lastTouchRef.current < 700) return;
    tap();
  }, onTouchStart: (e) => {
    e.preventDefault();
    lastTouchRef.current = Date.now();
    tap();
  }, onMouseMove: (e) => flyAim(e.clientY, e.currentTarget), onTouchMove: (e) => {
    const st = stRef.current;
    if (st && st.mode === "fly" && e.touches[0]) {
      e.preventDefault();
      flyAim(e.touches[0].clientY, e.currentTarget);
    }
  } }, /* @__PURE__ */ React.createElement("canvas", { ref: cvsRef, width: W, height: H, style: { width: "100%", height: "auto", display: "block", cursor: "pointer", touchAction: "none" } }), phase === "playing" && !flyIntro && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: (e) => {
        e.stopPropagation();
        togglePause();
      },
      onMouseDown: (e) => e.stopPropagation(),
      onTouchStart: (e) => e.stopPropagation(),
      "aria-label": t(["Pausa", "Pause"]),
      style: { position: "absolute", top: 8, right: 8, zIndex: 7, width: 34, height: 34, borderRadius: 10, border: "none", background: "rgba(0,0,0,0.42)", color: "#fff", cursor: "pointer", display: "grid", placeItems: "center", WebkitTapHighlightColor: "transparent" }
    },
    paused ? /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "#fff" }, /* @__PURE__ */ React.createElement("path", { d: "M8 5v14l11-7z" })) : /* @__PURE__ */ React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "#fff" }, /* @__PURE__ */ React.createElement("rect", { x: "6", y: "5", width: "4", height: "14", rx: "1" }), /* @__PURE__ */ React.createElement("rect", { x: "14", y: "5", width: "4", height: "14", rx: "1" }))
  ), paused && phase === "playing" && /* @__PURE__ */ React.createElement("div", { onMouseDown: (e) => e.stopPropagation(), onTouchStart: (e) => e.stopPropagation(), style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(45,36,33,0.55)", zIndex: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 24, fontWeight: 800 } }, t(["Pausa", "Paused"])), /* @__PURE__ */ React.createElement("button", { onClick: (e) => {
    e.stopPropagation();
    resumeGame();
  }, onMouseDown: (e) => e.stopPropagation(), className: "btn btn-primary", style: { marginTop: 12, cursor: "pointer" } }, t(["Continuar", "Resume"])))), phase === "ready" && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(255,255,255,0.55)" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.78)", borderRadius: 16, padding: "16px 22px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 22, fontWeight: 800, color: "var(--ink)", lineHeight: 1.1 } }, t(["\xA1Toca para empezar!", "Tap to start!"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: "var(--ink-2)" } }, t(["Salta con clic, toque o barra espaciadora \xB7 doble = doble salto", "Jump with click, tap or spacebar \xB7 double = double jump"])))), phase === "over" && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(45,36,33,0.45)" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: "#fff" } }, /* @__PURE__ */ React.createElement("div", { className: "bp-rainbow", style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 28, fontWeight: 800 } }, t(["\xA1Buen intento!", "Nice run!"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15, marginTop: 2 } }, t(["Puntuaci\xF3n", "Score"]), ": ", /* @__PURE__ */ React.createElement("b", null, score)))), flyIntro && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(45,36,33,0.62)" } }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", color: "#fff", background: "rgba(0,0,0,0.42)", borderRadius: 16, padding: "18px 22px", maxWidth: 300 } }, /* @__PURE__ */ React.createElement("div", { className: "bp-rainbow", style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 24, fontWeight: 800 } }, t(["\xA1Modo vuelo!", "Flight mode!"])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, margin: "8px 0 14px", lineHeight: 1.45 } }, t(["Controla a tu cachorro con el mouse o las flechas \u2191 \u2193. Esquiva los obst\xE1culos del aire y a los gatos.", "Control your puppy with the mouse or the \u2191 \u2193 arrows. Dodge the air obstacles and the cats."])), /* @__PURE__ */ React.createElement("button", { onClick: dismissFlyIntro, className: "btn btn-primary", style: { cursor: "pointer" } }, t(["\xA1A volar!", "Let us fly!"]))))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", fontSize: 12, fontWeight: 600, color: "var(--ink-soft)", padding: "8px 12px 0" } }, t(["Salta con clic, toque o barra espaciadora", "Jump with click, tap or spacebar"])), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 20px 22px" } }, phase !== "over" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => phase === "playing" ? jump() : start(), className: "btn btn-primary", style: { flex: 1, justifyContent: "center", cursor: "pointer" } }, phase === "playing" ? t(["Saltar", "Jump"]) : t(["Empezar a jugar", "Start playing"]))), phase === "over" && /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 520, margin: "0 auto" } }, /* @__PURE__ */ React.createElement("button", { onClick: start, className: "btn btn-primary", style: { width: "100%", justifyContent: "center", cursor: "pointer", marginBottom: 16, fontSize: 15 } }, "\u21BB ", t(["Jugar otra vez", "Play again"])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 14, alignItems: "center", background: "#FFF7EE", border: "1.5px solid rgba(245,130,32,0.25)", borderRadius: 16, padding: "14px 16px", marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 54, height: 54, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--orange)", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("img", { src: breed.img, alt: breed.name, style: { width: "100%", height: "100%", objectFit: "cover" } })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontSize: 14, color: "var(--ink)", lineHeight: 1.5 } }, /* @__PURE__ */ React.createElement("b", null, firstName), " ", t(["te da un premio:", "gives you a prize:"]), " ", /* @__PURE__ */ React.createElement("b", { style: { color: "var(--orange2,#C2521E)" } }, prizeFor(score, lang)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12.5, color: "var(--ink-2)", marginTop: 2 } }, score, " ", t(["puntos", "points"]), " \xB7 ", treats, " treats")), /* @__PURE__ */ React.createElement("div", { style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement(PrizeSymbol, { tier: prizeTier(score), size: 46 }))), !saved ? /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, fontSize: 14, marginBottom: 8, color: "var(--ink)" } }, t(["Guarda tu puntuaci\xF3n", "Save your score"])), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: name,
      onChange: (e) => setName(e.target.value),
      maxLength: 40,
      placeholder: t(["Tu nombre", "Your name"]),
      style: { width: "100%", boxSizing: "border-box", padding: "11px 13px", borderRadius: 12, border: "1px solid var(--line)", fontSize: 14, fontFamily: "inherit", marginBottom: 9, outline: "none" }
    }
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 9, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("select", { value: country, onChange: (e) => setCountry(e.target.value), style: { flex: 1, padding: "11px 12px", borderRadius: 12, border: "1px solid var(--line)", fontSize: 14, fontFamily: "inherit", background: "#fff", outline: "none" } }, /* @__PURE__ */ React.createElement("option", { value: "" }, t(["Pa\xEDs\u2026", "Country\u2026"])), COUNTRIES.map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c))), /* @__PURE__ */ React.createElement(
    "input",
    {
      value: city,
      onChange: (e) => setCity(e.target.value),
      list: "bp-cities",
      placeholder: t(["Ciudad", "City"]),
      style: { flex: 1, minWidth: 0, padding: "11px 12px", borderRadius: 12, border: "1px solid var(--line)", fontSize: 14, fontFamily: "inherit", outline: "none" }
    }
  ), /* @__PURE__ */ React.createElement("datalist", { id: "bp-cities" }, CITY_HINTS.map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c })))), /* @__PURE__ */ React.createElement("button", { onClick: submitScore, disabled: !name.trim() || saving, className: "btn btn-primary", style: { width: "100%", justifyContent: "center", cursor: name.trim() ? "pointer" : "default", opacity: name.trim() ? 1 : 0.6 } }, saving ? t(["Guardando\u2026", "Saving\u2026"]) : t(["Guardar en el ranking", "Save to leaderboard"]))) : /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 18, padding: "12px 14px", borderRadius: 12, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", fontSize: 13.5, color: "var(--ink)", fontWeight: 600 } }, t(["\xA1Puntuaci\xF3n guardada! Apareces en el ranking.", "Score saved! You are on the leaderboard."])), /* @__PURE__ */ React.createElement("a", { href: "/social?view=profile", className: "btn btn-outline", style: { width: "100%", justifyContent: "center", cursor: "pointer", marginBottom: 18 } }, t(["Crea tu perfil en B Social y gana m\xE1s premios", "Create your B Social profile to win more prizes"])), /* @__PURE__ */ React.createElement("div", { style: { background: "var(--paper)", borderRadius: 16, padding: "14px 16px", marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, fontSize: 14, marginBottom: 10, color: "var(--ink)" } }, t(["Top 10 \u2014 Mejores puntuaciones", "Top 10 \u2014 Best scores"])), board.length === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "var(--ink-soft)" } }, t(["S\xE9 el primero en el ranking.", "Be the first on the leaderboard."])), board.map((r, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: i < board.length - 1 ? "1px solid var(--line)" : "none" } }, /* @__PURE__ */ React.createElement("span", { style: { width: 22, fontWeight: 900, color: i < 3 ? "var(--orange)" : "var(--ink-soft)", fontSize: 14 } }, i + 1), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontSize: 13.5, fontWeight: 700, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, r.name), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11.5, color: "var(--ink-soft)" } }, [r.city, r.country].filter(Boolean).join(", ")), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14, fontWeight: 900, color: "var(--ink)", minWidth: 42, textAlign: "right" } }, r.score))))))));
}
function prizeTier(score) {
  return score >= 800 ? 4 : score >= 500 ? 3 : score >= 300 ? 2 : score >= 150 ? 1 : 0;
}
function prizeFor(score, lang) {
  const labels = [
    ["Estrella de Cachorro", "Puppy Star"],
    ["Galleta de Bronce", "Bronze Treat"],
    ["Hueso de Plata", "Silver Bone"],
    ["Medalla de Oro", "Gold Medal"],
    ["Trofeo Dorado", "Golden Trophy"]
  ];
  return labels[prizeTier(score)][lang === "en" ? 1 : 0];
}
function QuizGame() {
  const t = useT();
  const lang = (typeof LangContext !== "undefined" && React.useContext(LangContext) || {}).lang || "es";
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(Q.length).fill(null));
  const [result, setResult] = useState(false);
  const [muted, setMuted] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    ensureCss();
  }, []);
  useEffect(() => {
    window._quizMuted = muted;
  }, [muted]);
  const choose = (i) => {
    sndPick();
    const a = answers.slice();
    a[step] = i;
    setAnswers(a);
    setTimeout(() => {
      if (step < Q.length - 1) setStep(step + 1);
      else {
        setResult(true);
        setConfetti(true);
        sndWin();
        setTimeout(() => setConfetti(false), 4e3);
      }
    }, 240);
  };
  const back = () => {
    if (step > 0) {
      sndBack();
      setStep(step - 1);
    }
  };
  const reset = () => {
    sndBack();
    setStep(0);
    setAnswers(Array(Q.length).fill(null));
    setResult(false);
  };
  const breedFor = () => {
    const a = (answers || []).map((x) => x == null ? -1 : x);
    const we = a[3] <= 0 ? 1 : a[3] === 1 ? 2 : 3;
    const wantSz = a[5] === 0 ? 1 : a[5] === 1 ? 2 : a[5] === 2 ? 3 : 0;
    let best = BREEDS[0], bestScore = -1;
    for (const b of BREEDS) {
      const m = BREED_MATCH[b.key];
      if (!m) continue;
      let s = 0;
      if (wantSz) s += (3 - Math.abs(m.sz - wantSz)) * 3;
      if (a[0] === 0 || a[0] === 3) s += m.apt * 2 + (m.sz <= 2 ? 2 : -2);
      else if (a[0] === 2) s += (m.en >= 2 ? 2 : 0) + (m.sz >= 2 ? 1 : 0);
      s += (3 - Math.abs(m.en - we)) * 2;
      if (a[8] === 0) s += m.indep + (m.en <= 1 ? 2 : 0);
      else if (a[8] >= 3) s += m.en >= 2 ? 2 : 0;
      if (a[2] === 0 && m.coat === "s") s += 4;
      else if (a[2] === 1 && m.coat === "f") s += 4;
      else if (a[2] === 2) s += (m.hypo ? 5 : 0) + (m.coat === "c" ? 2 : 0);
      if (a[1] === 0 || a[1] === 2 || a[1] === 4) s += m.lap * 2;
      else if (a[1] === 1) s += m.en >= 2 ? 3 : 0;
      else if (a[1] === 3) s += m.kids * 2;
      if (a[9] === 0) s += m.lap * 2;
      else if (a[9] === 1) s += m.en >= 2 ? 3 : 0;
      else if (a[9] === 2) s += m.guard * 3;
      else if (a[9] === 3) s += m.indep * 2;
      if (a[6] === 0 || a[6] === 1) s += m.kids * 2;
      if (a[7] === 0 || a[7] === 1) s += m.lap + (m.train >= 2 ? 1 : 0);
      else if (a[7] === 2) s += m.lap + (m.sz === 1 ? 1 : 0);
      if (a[4] === 0) s += m.train;
      if ((a[1] === 4 || a[7] === 2) && m.sz === 1) s += 1;
      s += (b.match || 80) * 0.01;
      if (s > bestScore) {
        bestScore = s;
        best = b;
      }
    }
    return best;
  };
  const pct = Math.round((result ? Q.length : step) / Q.length * 100);
  const wrap = { maxWidth: 560, margin: "0 auto", padding: "24px 18px 80px" };
  if (playing) {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 560, margin: "0 auto", padding: "14px 16px 0" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      sndBack();
      setPlaying(false);
    }, style: { background: "none", border: "none", color: "var(--ink-soft)", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 6 } }, "\u2190 ", t(["Volver al resultado", "Back to result"]))), /* @__PURE__ */ React.createElement(BreedRunner, { breed: breedFor(), t, lang }));
  }
  if (result) {
    const b = breedFor();
    const info = BREED_INFO[b.key] || {};
    const nm = b.name.split(" (")[0];
    const Bar = ({ label, pct: pct2 }) => /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700, color: "var(--ink-soft)", marginBottom: 3 } }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("span", null, Math.round(pct2 || 0), "%")), /* @__PURE__ */ React.createElement("div", { className: "qg-bar" }, /* @__PURE__ */ React.createElement("i", { style: { width: (pct2 || 0) + "%" } })));
    return /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 1060, margin: "0 auto", padding: "18px 16px 28px" } }, confetti && /* @__PURE__ */ React.createElement(Confetti, null), /* @__PURE__ */ React.createElement("div", { className: "qg-rgrid" }, /* @__PURE__ */ React.createElement("div", { className: "qg-pop", style: { background: "#fff", borderRadius: 24, border: "1px solid var(--line)", overflow: "hidden", boxShadow: "0 10px 40px rgba(45,36,33,0.1)", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "linear-gradient(135deg,#F58220,#E85D75)", padding: "15px 20px 13px", textAlign: "center", color: "#fff" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.9 } }, t(["\xA1Tu match perfecto!", "Your perfect match!"])), /* @__PURE__ */ React.createElement("div", { className: "bp-rainbow", style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", textShadow: "0 1px 8px rgba(0,0,0,0.22)", marginTop: 2 } }, b.name), /* @__PURE__ */ React.createElement("div", { style: { display: "inline-block", marginTop: 6, background: "rgba(255,255,255,0.22)", borderRadius: 999, padding: "3px 13px", fontSize: 13, fontWeight: 800 } }, b.match, "% ", t(["compatible", "match"]))), /* @__PURE__ */ React.createElement("div", { style: { padding: "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { borderRadius: 16, overflow: "hidden", background: "var(--paper)", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("img", { src: b.img, alt: b.name, style: { width: "100%", maxHeight: 230, objectFit: "contain", display: "block" } })), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, margin: "0 0 12px" } }, t(b.desc)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { className: "qg-stat", style: { flex: 1, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { className: "k" }, t(["Tama\xF1o", "Size"])), /* @__PURE__ */ React.createElement("div", { className: "v" }, t(b.size))), /* @__PURE__ */ React.createElement("span", { className: "qg-stat", style: { flex: 1, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { className: "k" }, t(["Energ\xEDa", "Energy"])), /* @__PURE__ */ React.createElement("div", { className: "v" }, t(b.energy)))), BREED_HISTORY[b.key] && /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 800, color: "var(--orange2,#C2521E)", marginBottom: 5 } }, t(["Historia de la raza", "Breed history"])), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 } }, t(BREED_HISTORY[b.key]))), /* @__PURE__ */ React.createElement("div", { style: { background: "#FFF7EE", border: "1.5px solid rgba(245,130,32,0.25)", borderRadius: 14, padding: "12px 14px", marginTop: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, fontWeight: 800, color: "var(--orange2,#C2521E)", marginBottom: 7 } }, t(["Datos divertidos", "Fun facts"])), b.facts.map((f, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 8, marginBottom: 5, alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement("span", { style: { flexShrink: 0, color: "#F58220", fontWeight: 900, fontSize: 13 } }, i + 1), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12.5, color: "var(--ink)", lineHeight: 1.4 } }, t(f))))))), /* @__PURE__ */ React.createElement("div", { className: "qg-pop", style: { background: "#fff", borderRadius: 24, border: "1px solid var(--line)", boxShadow: "0 10px 40px rgba(45,36,33,0.1)", padding: "18px 20px", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: 20, fontWeight: 800, color: "var(--ink)" } }, t(["Conoce al ", "Meet the "]), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--orange)" } }, nm)), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12.5, color: "var(--ink-soft)", margin: "2px 0 12px", lineHeight: 1.4 } }, t(["\xBFNo conoc\xEDas la raza? Aqu\xED tienes lo importante de un vistazo.", "New to the breed? Here is what matters, at a glance."])), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 13 } }, /* @__PURE__ */ React.createElement("div", { className: "qg-stat" }, /* @__PURE__ */ React.createElement("div", { className: "k" }, t(["Esperanza de vida", "Lifespan"])), /* @__PURE__ */ React.createElement("div", { className: "v" }, t(info.lifespan || ["\u2014", "\u2014"]))), /* @__PURE__ */ React.createElement("div", { className: "qg-stat" }, /* @__PURE__ */ React.createElement("div", { className: "k" }, t(["Alimento diario", "Daily food"])), /* @__PURE__ */ React.createElement("div", { className: "v" }, t(info.food || ["\u2014", "\u2014"]))), /* @__PURE__ */ React.createElement("div", { className: "qg-stat" }, /* @__PURE__ */ React.createElement("div", { className: "k" }, t(["Peso adulto", "Adult weight"])), /* @__PURE__ */ React.createElement("div", { className: "v" }, t(info.weight || ["\u2014", "\u2014"]))), /* @__PURE__ */ React.createElement("div", { className: "qg-stat" }, /* @__PURE__ */ React.createElement("div", { className: "k" }, t(["Ejercicio", "Exercise"])), /* @__PURE__ */ React.createElement("div", { className: "v" }, t(info.exercise || ["\u2014", "\u2014"])))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement(Bar, { label: t(["Energ\xEDa", "Energy"]), pct: info.energyPct }), /* @__PURE__ */ React.createElement(Bar, { label: t(["Necesidad de ejercicio", "Exercise needs"]), pct: info.exercisePct }), /* @__PURE__ */ React.createElement(Bar, { label: t(["Salud", "Health"]), pct: info.healthPct }), /* @__PURE__ */ React.createElement(Bar, { label: t(["Inteligencia", "Intelligence"]), pct: info.trainPct })), info.health && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 12, color: "var(--ink-2)", margin: "0 0 12px", lineHeight: 1.45 } }, /* @__PURE__ */ React.createElement("b", { style: { color: "var(--ink)" } }, t(["Salud: ", "Health: "])), t(info.health)), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 14 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11.5, fontWeight: 800, color: "var(--ink-soft)", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 7 } }, t(["Bueno para", "Great for"])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 } }, (info.goodFor || []).map((g, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "qg-chip" }, t(g))))), /* @__PURE__ */ React.createElement("a", { href: `/blog?art=${b.art}`, style: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 700, color: "var(--orange)", marginBottom: 12 } }, t(["Aprende m\xE1s sobre esta raza", "Learn more about this breed"]), " \u2192"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "auto" } }, /* @__PURE__ */ React.createElement("button", { onClick: () => {
      try {
        const c = ac();
        if (c && c.state === "suspended") c.resume();
      } catch (e) {
      }
      sndPick();
      setPlaying(true);
    }, className: "qg-jugar", style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React.createElement("path", { d: "M8 5v14l11-7z" })), t(["JUGAR", "PLAY"])), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("a", { href: "/solicitud", className: "btn btn-primary", style: { flex: 1, justifyContent: "center", minWidth: 150 } }, t(["Quiero un " + nm, "I want a " + nm])), /* @__PURE__ */ React.createElement("button", { onClick: reset, className: "btn btn-outline", style: { cursor: "pointer" } }, t(["Repetir el quiz", "Retake the quiz"])))))));
  }
  const cur = Q[step];
  return /* @__PURE__ */ React.createElement("div", { style: wrap }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 22 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--ink)" } }, t(["Encuentra tu", "Find your"]), " ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--orange)" } }, t(["cachorro ideal", "perfect puppy"]))), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-soft)", fontSize: 15, margin: "6px 0 0" } }, t(["Un juego r\xE1pido y divertido para toda la familia", "A quick, fun game for the whole family"]))), /* @__PURE__ */ React.createElement("div", { className: "qg-pop", key: step, style: { background: "#fff", borderRadius: 28, border: "1px solid var(--line)", padding: "26px 22px 24px", boxShadow: "0 6px 30px rgba(45,36,33,0.08)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 18 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, height: 10, borderRadius: 999, background: "var(--paper)", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { height: "100%", width: pct + "%", borderRadius: 999, background: "linear-gradient(90deg,#F58220,#E85D75)", transition: "width .35s cubic-bezier(.34,1.56,.64,1)" } })), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 800, color: "var(--orange)" } }, step + 1, "/", Q.length), /* @__PURE__ */ React.createElement("button", { onClick: () => setMuted((m) => !m), title: muted ? "Activar sonido" : "Silenciar", style: { background: "none", border: "none", cursor: "pointer", color: "var(--ink-soft)", display: "inline-flex", padding: 4 } }, muted ? /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M11 5 6 9H2v6h4l5 4z" }), /* @__PURE__ */ React.createElement("line", { x1: "23", y1: "9", x2: "17", y2: "15" }), /* @__PURE__ */ React.createElement("line", { x1: "17", y1: "9", x2: "23", y2: "15" })) : /* @__PURE__ */ React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M11 5 6 9H2v6h4l5 4z" }), /* @__PURE__ */ React.createElement("path", { d: "M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" })))), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "Bricolage Grotesque,sans-serif", fontSize: "clamp(20px,3.2vw,26px)", fontWeight: 700, lineHeight: 1.25, margin: "0 0 18px", color: "var(--ink)" } }, t(cur.q)), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 11 } }, cur.opts.map((opt, i) => {
    const sel = answers[step] === i;
    return /* @__PURE__ */ React.createElement("button", { key: i, onClick: () => choose(i), className: "qg-opt", style: { display: "flex", alignItems: "center", gap: 14, padding: "15px 16px", borderRadius: 16, background: sel ? "rgba(245,130,32,0.08)" : "var(--paper)", border: `2px solid ${sel ? "var(--orange)" : "transparent"}`, textAlign: "left", cursor: "pointer", fontFamily: "inherit" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 30, flexShrink: 0 } }, opt.e), /* @__PURE__ */ React.createElement("span", { style: { flex: 1, fontSize: 16, fontWeight: 700, color: "var(--ink)" } }, t(opt.l)), /* @__PURE__ */ React.createElement("span", { style: { width: 26, height: 26, borderRadius: "50%", border: `2px solid ${sel ? "var(--orange)" : "var(--line)"}`, background: sel ? "var(--orange)" : "transparent", display: "grid", placeItems: "center", flexShrink: 0 } }, sel && /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12.5l4.5 4.5L19 6.5" }))));
  })), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 18, textAlign: "left" } }, /* @__PURE__ */ React.createElement("button", { onClick: back, disabled: step === 0, style: { background: "none", border: "none", color: "var(--ink-soft)", fontSize: 14, fontWeight: 600, cursor: step === 0 ? "default" : "pointer", opacity: step === 0 ? 0 : 1, fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 6 } }, "\u2190 ", t(["Atr\xE1s", "Back"])))));
}
function PawDeco({ c, size }) {
  return /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: "0 0 64 64", fill: c }, /* @__PURE__ */ React.createElement("ellipse", { cx: "32", cy: "44", rx: "14", ry: "11" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "12", cy: "28", rx: "6", ry: "8" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "52", cy: "28", rx: "6", ry: "8" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "23", cy: "15", rx: "5.5", ry: "7" }), /* @__PURE__ */ React.createElement("ellipse", { cx: "41", cy: "15", rx: "5.5", ry: "7" }));
}
function BoneDeco({ c, size }) {
  return /* @__PURE__ */ React.createElement("svg", { width: size, height: size * 0.62, viewBox: "0 0 64 40", fill: c }, /* @__PURE__ */ React.createElement("rect", { x: "14", y: "14", width: "36", height: "12", rx: "6" }), /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "12", r: "8" }), /* @__PURE__ */ React.createElement("circle", { cx: "14", cy: "28", r: "8" }), /* @__PURE__ */ React.createElement("circle", { cx: "50", cy: "12", r: "8" }), /* @__PURE__ */ React.createElement("circle", { cx: "50", cy: "28", r: "8" }));
}
function QuizDecor() {
  const items = [
    { t: "paw", side: { left: "5%" }, top: "14vh", size: 54, c: "#F58220", anim: "qgDriftA", dur: 7, delay: 0, op: 0.5, rot: -12 },
    { t: "bone", side: { left: "9%" }, top: "40vh", size: 60, c: "#E85D75", anim: "qgDriftB", dur: 9, delay: 1.2, op: 0.45, rot: 18 },
    { t: "paw", side: { left: "4%" }, top: "66vh", size: 42, c: "#1EB87A", anim: "qgDriftB", dur: 8, delay: 0.5, op: 0.45, rot: 8 },
    { t: "blob", side: { left: "2%" }, top: "30vh", size: 150, c: "#FFD9B3", anim: "qgPulseBlob", dur: 10, delay: 0, op: 0.5 },
    { t: "bone", side: { right: "6%" }, top: "18vh", size: 50, c: "#5B7CFA", anim: "qgDriftA", dur: 8.5, delay: 0.8, op: 0.45, rot: -16 },
    { t: "paw", side: { right: "4%" }, top: "46vh", size: 58, c: "#F5A623", anim: "qgDriftB", dur: 7.5, delay: 0.3, op: 0.5, rot: 14 },
    { t: "paw", side: { right: "9%" }, top: "72vh", size: 40, c: "#E85D75", anim: "qgDriftA", dur: 9, delay: 1.5, op: 0.4, rot: -8 },
    { t: "blob", side: { right: "1%" }, top: "58vh", size: 170, c: "#FFE0EC", anim: "qgPulseBlob", dur: 11, delay: 1, op: 0.5 }
  ];
  return /* @__PURE__ */ React.createElement("div", { "aria-hidden": "true" }, items.map((it, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "qg-deco", style: { ...it.side, top: it.top, opacity: it.op, animation: `${it.anim} ${it.dur}s ease-in-out ${it.delay}s infinite`, transform: it.rot ? `rotate(${it.rot}deg)` : void 0 } }, it.t === "paw" && /* @__PURE__ */ React.createElement(PawDeco, { c: it.c, size: it.size }), it.t === "bone" && /* @__PURE__ */ React.createElement(BoneDeco, { c: it.c, size: it.size }), it.t === "blob" && /* @__PURE__ */ React.createElement("div", { style: { width: it.size, height: it.size, borderRadius: "50%", background: `radial-gradient(circle at 50% 50%, ${it.c}, rgba(255,255,255,0))`, filter: "blur(6px)" } }))));
}
function QuizGameRoot() {
  const [lang, setLang] = useState(() => window.bpGetLang && window.bpGetLang() || "es");
  useEffect(() => {
    document.documentElement.lang = lang;
    ensureCss();
  }, [lang]);
  useEffect(() => window.bpOnLang ? window.bpOnLang(setLang) : void 0, []);
  return /* @__PURE__ */ React.createElement(LangContext.Provider, { value: { lang, setLang } }, /* @__PURE__ */ React.createElement(Header, { overDark: false }), /* @__PURE__ */ React.createElement("main", { style: { paddingTop: 80, background: "var(--bg,#fff)", minHeight: "100vh", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement(QuizDecor, null), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement(QuizGame, null))), /* @__PURE__ */ React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(QuizGameRoot, null));

})();
