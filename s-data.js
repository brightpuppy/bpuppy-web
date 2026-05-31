(function(){
const BSDATA = {
  me: { id: "u0", name: "Mar\xEDa P.", username: "mariap", initials: "MP", color: "#F58220", city: "Miami, FL", bio: "Luna mom \u{1F43E} Golden lover", verified: true, followers: 847, following: 312, posts: 64 },
  stories: [
    { id: "s0", username: "Tu historia", initials: "+", color: "#F58220", isOwn: true, hasNew: false },
    { id: "s1", username: "coco.f", initials: "CF", color: "#E85D75", hasNew: true },
    { id: "s2", username: "milo_rv", initials: "MR", color: "#7C5CBF", hasNew: true },
    { id: "s3", username: "bella_s", initials: "BS", color: "#2196F3", hasNew: true },
    { id: "s4", username: "rocky.m", initials: "RM", color: "#4CAF50", hasNew: false },
    { id: "s5", username: "luna_g", initials: "LG", color: "#FF5722", hasNew: false },
    { id: "s6", username: "diego_p", initials: "DP", color: "#F5A623", hasNew: false }
  ],
  posts: [
    { id: "p1", name: "Carlos R.", username: "carlosrv", initials: "CR", color: "#2196F3", city: "Dallas, TX", verified: false, img: "assets/photos/g01.webp", caption: "Milo descubri\xF3 que la lluvia no es tan mala \u{1F327}\uFE0F Ya no le tenemos que convencer de salir \u{1F602}", tags: ["GoldenRetriever", "PuppyLife"], likes: 234, comments: 18, time: "2h", liked: false, saved: false },
    { id: "p2", name: "Sof\xEDa K.", username: "sof_kd", initials: "SK", color: "#9C27B0", city: "New York, NY", verified: true, img: "assets/photos/g02.webp", caption: "Bella encontr\xF3 su spot favorito \u2600\uFE0F Todos los d\xEDas mismo ritual, misma sonrisa.", tags: ["Labrador", "DogMom", "NYC"], likes: 512, comments: 34, time: "4h", liked: true, saved: false },
    { id: "p3", name: "Rachel M.", username: "rach_dog", initials: "RM", color: "#4CAF50", city: "Chicago, IL", verified: false, img: "assets/photos/g03.webp", caption: "Primer a\xF1o de Rocky \u{1F382}\u{1F389} Un a\xF1o de mordiscos, caos y amor infinito. No lo cambiar\xEDa por nada.", tags: ["PuppyBirthday", "FrenchBulldog"], likes: 891, comments: 67, time: "6h", liked: false, saved: true },
    { id: "p4", name: "Diego F.", username: "diego_pom", initials: "DF", color: "#FF5722", city: "Los Angeles, CA", verified: true, img: "assets/photos/g04.webp", caption: "Luna pasea por el barrio como si fuera su ciudad \u{1F451} Porque lo es.", tags: ["Pomeranian", "DogDad", "LA"], likes: 1203, comments: 89, time: "8h", liked: false, saved: false },
    { id: "p5", name: "Ana L.", username: "ana_cats", initials: "AL", color: "#E91E63", city: "Miami, FL", verified: false, img: "assets/photos/g05.webp", caption: 'Simba y su cara de "\xBFpor qu\xE9 hay una c\xE1mara aqu\xED?" \u{1F639}', tags: ["CatLife", "Ragdoll", "CatMom"], likes: 445, comments: 23, time: "10h", liked: true, saved: false },
    { id: "p6", name: "Marco B.", username: "marco_bp", initials: "MB", color: "#607D8B", city: "Houston, TX", verified: true, img: "assets/photos/g06.webp", caption: "Fin de semana en el lago con Coco \u{1F3CA} Primera vez en agua y ya no quer\xEDa salir", tags: ["Labrador", "WeekendVibes"], likes: 672, comments: 41, time: "12h", liked: false, saved: false }
  ],
  pack: [
    { id: "u1", name: "Carlos R.", username: "carlosrv", initials: "CR", color: "#2196F3", city: "Dallas, TX", verified: false, mutual: 4, pet: "Golden Retriever" },
    { id: "u2", name: "Sof\xEDa K.", username: "sof_kd", initials: "SK", color: "#9C27B0", city: "New York, NY", verified: true, mutual: 8, pet: "Labrador" },
    { id: "u3", name: "Diego F.", username: "diego_pom", initials: "DF", color: "#FF5722", city: "Los Angeles, CA", verified: true, mutual: 2, pet: "Pomeranian" },
    { id: "u4", name: "Ana L.", username: "ana_cats", initials: "AL", color: "#E91E63", city: "Miami, FL", verified: false, mutual: 6, pet: "Ragdoll" }
  ],
  suggestions: [
    { id: "u5", name: "Daniela M.", username: "dani_pets", initials: "DM", color: "#9C27B0", city: "Austin, TX", mutual: 3, pet: "Shih Tzu" },
    { id: "u6", name: "Luis C.", username: "luisc_dog", initials: "LC", color: "#2196F3", city: "Dallas, TX", mutual: 1, pet: "Labrador" },
    { id: "u7", name: "Kim P.", username: "kimpaws", initials: "KP", color: "#F44336", city: "Miami, FL", mutual: 5, pet: "Frenchie" },
    { id: "u8", name: "Pablo S.", username: "pablos_k", initials: "PS", color: "#009688", city: "Houston, TX", mutual: 2, pet: "Yorkshire" }
  ],
  places: [
    { id: "pl1", name: "Bayfront Park Dog Area", type: "park", emoji: "\u{1F333}", rating: 4.8, note: "Off-leash" },
    { id: "pl2", name: "The Dogfather Caf\xE9", type: "cafe", emoji: "\u2615", rating: 4.6, note: "Dogs welcome inside" },
    { id: "pl3", name: "Paws & Claws Vet", type: "vet", emoji: "\u{1F3E5}", rating: 4.9, note: "Open 7 days" },
    { id: "pl4", name: "Central Bark Dog Park", type: "park", emoji: "\u{1F33F}", rating: 4.7, note: "Off-leash, gated" },
    { id: "pl5", name: "Petco Brickell", type: "store", emoji: "\u{1F6CD}\uFE0F", rating: 4.4, note: "Full grooming" }
  ],
  events: [
    { title: "Dog Meetup en Bayfront", date: "S\xE1b 24 Mayo", emoji: "\u{1F43E}", attendees: 34 },
    { title: "Clase de agility para cachorros", date: "Dom 25 Mayo", emoji: "\u{1F3C3}", attendees: 12 },
    { title: "Feria de Adopci\xF3n Animal", date: "S\xE1b 31 Mayo", emoji: "\u{1F3E0}", attendees: 89 }
  ],
  pets: [{
    id: "pet1",
    name: "Luna",
    breed: "Golden Retriever",
    dob: "Mar 2023",
    gender: "Hembra",
    img: "assets/photos/g01.webp",
    microchip: "985141004832901",
    bpuppy: true,
    weight: [{ m: "Ene", v: 18 }, { m: "Abr", v: 22 }, { m: "Jul", v: 25 }, { m: "Oct", v: 27 }, { m: "Ene", v: 28 }],
    vaccines: [
      { name: "DHPP", date: "Abr 2023", done: true },
      { name: "Rabia", date: "May 2023", done: true },
      { name: "Bordetella", date: "Jun 2023", done: true },
      { name: "Leptospira", date: "Abr 2025", done: false, upcoming: true }
    ],
    vet: "Dr. Sarah Johnson \xB7 Miami Pet Clinic"
  }],
  messages: [
    { user: "carlosrv", initials: "CR", color: "#2196F3", preview: "\xA1Qu\xE9 lindo tu perro! \xBFQu\xE9 raza...", time: "2m", online: true, unread: true },
    { user: "sof_kd", initials: "SK", color: "#9C27B0", preview: "Vi que tienes un Pomeranian", time: "15m", online: true, unread: false },
    { user: "rach_dog", initials: "RM", color: "#4CAF50", preview: "\xBFVas al meetup este s\xE1bado?", time: "1h", online: false, unread: false },
    { user: "ana_cats", initials: "AL", color: "#E91E63", preview: "Gracias por la recomendaci\xF3n", time: "3h", online: false, unread: false }
  ],
  // Comunidad — perfiles que el dueño decidió hacer públicos (solo campos no sensibles).
  community: [
    { id: "c1", name: "Carlos R.", username: "carlosrv", initials: "CR", color: "#2196F3", city: "Dallas, TX", bio: "Pap\xE1 orgulloso de un Golden", pet: { name: "Milo", breed: "Golden Retriever", img: "assets/photos/g01.webp" }, followers: 847, bpuppy: true },
    { id: "c2", name: "Sof\xEDa K.", username: "sof_kd", initials: "SK", color: "#9C27B0", city: "New York, NY", bio: "Lab lover \xB7 NYC walks", pet: { name: "Bella", breed: "Labrador", img: "assets/photos/g02.webp" }, followers: 1520, bpuppy: false },
    { id: "c3", name: "Diego F.", username: "diego_pom", initials: "DF", color: "#FF5722", city: "Los Angeles, CA", bio: "Pomeranian dad", pet: { name: "Luna", breed: "Pomeranian", img: "assets/photos/g04.webp" }, followers: 2310, bpuppy: true },
    { id: "c4", name: "Ana L.", username: "ana_cats", initials: "AL", color: "#E91E63", city: "Miami, FL", bio: "Cat mom de un Ragdoll", pet: { name: "Simba", breed: "Ragdoll", img: "assets/photos/g05.webp" }, followers: 560, bpuppy: false },
    { id: "c5", name: "Marco B.", username: "marco_bp", initials: "MB", color: "#607D8B", city: "Houston, TX", bio: "Aventuras con Coco", pet: { name: "Coco", breed: "Labrador", img: "assets/photos/g06.webp" }, followers: 980, bpuppy: true },
    { id: "c6", name: "Rachel M.", username: "rach_dog", initials: "RM", color: "#4CAF50", city: "Chicago, IL", bio: "Frenchie life", pet: { name: "Rocky", breed: "French Bulldog", img: "assets/photos/g03.webp" }, followers: 1340, bpuppy: true }
  ],
  bpuppyEvents: [
    { id: "e1", title: "Meetup BPuppy en Bayfront Park", date: "S\xE1bado 7 Junio \xB7 10:00 AM", place: "Bayfront Park, Miami", img: "assets/photos/g03.webp", attendees: 34, going: false },
    { id: "e2", title: "Clase de socializaci\xF3n para cachorros", date: "Domingo 15 Junio \xB7 9:00 AM", place: "Local BPuppy, Haines City", img: "assets/photos/g01.webp", attendees: 18, going: false },
    { id: "e3", title: "Feria de adopci\xF3n + grooming gratis", date: "S\xE1bado 28 Junio \xB7 11:00 AM", place: "Central Bark Dog Park", img: "assets/photos/g06.webp", attendees: 89, going: false }
  ],
  news: [
    { id: "n1", title: "Abrimos nuestro nuevo local de grooming en Haines City", date: "30 May 2026", tag: "BPuppy", img: "assets/photos/g02.webp", excerpt: "M\xE1s espacio, productos premium y pickup & delivery para consentir a tu mascota." },
    { id: "n2", title: "Nuevo: planes de membres\xEDa con pickup incluido", date: "22 May 2026", tag: "Novedad", img: "assets/photos/g04.webp", excerpt: "Ahorra en cada ba\xF1o y recibe beneficios VIP todos los meses." },
    { id: "n3", title: "Gu\xEDa: c\xF3mo preparar a tu cachorro para su primer grooming", date: "14 May 2026", tag: "Tips", img: "assets/photos/g05.webp", excerpt: "Pasos simples para que la primera visita sea tranquila y positiva." }
  ],
  videos: [
    { id: "v1", title: "Un d\xEDa en BPuppy Grooming", dur: "2:14", thumb: "assets/photos/g01.webp" },
    { id: "v2", title: "Transformaci\xF3n: antes y despu\xE9s", dur: "0:58", thumb: "assets/photos/g03.webp" },
    { id: "v3", title: "Tips de cepillado en casa", dur: "3:40", thumb: "assets/photos/g05.webp" },
    { id: "v4", title: "Meetup de la comunidad BPuppy", dur: "1:32", thumb: "assets/photos/g06.webp" }
  ]
};
window.BSDATA = BSDATA;

})();
