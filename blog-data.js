(function(){
const CAT_META = {
  razas: { label: "Razas", color: "#F58220", bg: "#FFF0E0" },
  bienestar: { label: "Bienestar", color: "#1EB87A", bg: "#E0F7EF" },
  familia: { label: "Familia", color: "#E85D75", bg: "#FDEAF0" },
  lifestyle: { label: "Lifestyle", color: "#7C3AED", bg: "#F0EAFF" },
  historias: { label: "Historias", color: "#1E90FF", bg: "#E0EEFF" },
  viaje: { label: "Viaje", color: "#E86535", bg: "#FDEEE8" },
  guias: { label: "Gu\xEDas", color: "#2D6A4F", bg: "#E0F0EA" }
};
const BLOG = [
  // ── RAZAS ───────────────────────────────────────────────────────────────
  {
    id: 1,
    cat: "razas",
    emoji: "\u{1F415}",
    color: "#F58220",
    img: "uploads/Page 10.jpeg",
    title: "Golden Retriever: gu\xEDa pr\xE1ctica para due\xF1os reales",
    sub: "Ejercicio, pelaje, alimentaci\xF3n y salud sin rodeos",
    date: "Mayo 2025",
    read: 6,
    tags: ["golden retriever", "cuidados", "familia"],
    lead: "El Golden Retriever no es solo el perro de los comerciales de seguros. Es una raza con necesidades concretas: ejercicio diario, cepillado constante y contacto humano real. Si entiendes eso, tendr\xE1s al mejor compa\xF1ero del mundo.",
    body: [
      { h: "Ejercicio: no negociable", p: "Un Golden adulto necesita m\xEDnimo 60 minutos de actividad f\xEDsica diaria. Sin eso se aburre y lo paga en tus muebles. Dos caminatas largas o una sesi\xF3n de buscar la pelota funcionan perfectamente. Tambi\xE9n son nadadores natos y adoran el agua." },
      { h: "El pelaje que da trabajo", p: "Su doble capa necesita cepillado 3-4 veces por semana, diario en \xE9pocas de muda (primavera y oto\xF1o). Un guante desmallador es la mejor inversi\xF3n que har\xE1s. Ba\xF1o cada 6-8 semanas con shampoo neutro; m\xE1s frecuente reseca la piel." },
      { h: "Alimentaci\xF3n seg\xFAn etapa", p: "Cachorro: croquetas con 22-26% de prote\xEDna. Adulto: porciones controladas porque los Golden tienen predisposici\xF3n al sobrepeso. Senior (7+ a\xF1os): f\xF3rmula con glucosamina y condroitina para las articulaciones. Agua fresca siempre disponible." },
      { h: "Salud: lo que debes vigilar", p: "Son propensos a displasia de cadera, hipotiroidismo y, tristemente, c\xE1ncer (causa n\xFAmero 1 de muerte en la raza). Chequeos anuales desde los 5 a\xF1os y esterilizaci\xF3n antes del primer a\xF1o reducen riesgos significativamente." }
    ],
    stat: "El 94% de familias que adoptan un Golden Retriever repiten la experiencia. La tasa de satisfacci\xF3n m\xE1s alta de cualquier raza.",
    tips: ["Socializa desde cachorro: parques, personas, otros animales", "Usa arn\xE9s en lugar de collar para proteger el cuello", 'Ens\xE9\xF1ale a "soltar" desde el primer d\xEDa, es instintivo llevarlo todo en la boca', "Revisa las orejas semanalmente, son propensos a infecciones"],
    close: "Un Golden bien atendido vive 10-12 a\xF1os felices. La clave es entender que son perros de familia, no de jard\xEDn. Necesitan estar contigo, no afuera esperando."
  },
  {
    id: 2,
    cat: "razas",
    emoji: "\u{1F43E}",
    color: "#8B5CF6",
    img: "uploads/Page 8.jpeg",
    title: "French Bulldog: la verdad que nadie te dice antes de adoptarlo",
    sub: "Salud, costos reales y c\xF3mo mantenerlo feliz",
    date: "Mayo 2025",
    read: 5,
    tags: ["french bulldog", "braquic\xE9falo", "apartamento"],
    lead: "Los Bulldogs Franceses son adorables, urbanos y perfectos para apartamentos. Pero vienen con una lista de consideraciones m\xE9dicas que nadie menciona en la tienda. Aqu\xED va la verdad completa.",
    body: [
      { h: "El problema respiratorio que viene de serie", p: "Son braquic\xE9falos: hocico corto = v\xEDas a\xE9reas estrechas. Resuellan, roncan, y en calor extremo pueden colapsar. Nunca ejercicio intenso en verano, nunca en auto sin AC, y en d\xEDas de m\xE1s de 28\xB0C m\xE1xima precauci\xF3n." },
      { h: "Columna y articulaciones: su punto d\xE9bil", p: "La cr\xEDa intensiva por su forma compacta los hace propensos a hernias discales (IVDD). Evita que salten de muebles altos, usa siempre arn\xE9s en lugar de collar, y ofr\xE9celes rampas si suben al sof\xE1 contigo." },
      { h: "El mantenimiento de los pliegues", p: "Los pliegues faciales acumulan humedad y bacterias. Limpia con toallitas secas sin alcohol 2-3 veces por semana. Descuidarlos lleva a infecciones de piel dolorosas que requieren antibi\xF3ticos." },
      { h: "El costo real", p: "Entre veterinario frecuente, posibles cirug\xEDas de v\xEDas a\xE9reas y dieta de calidad, el costo anual promedio en USA es $2,500-$4,000. Un seguro m\xE9dico veterinario desde cachorro es casi obligatorio con esta raza." }
    ],
    stat: "El French Bulldog super\xF3 al Labrador como raza #1 en USA en 2022, tras 31 a\xF1os de reinado del Lab. Actualmente encabeza las listas en UK, Francia y Australia.",
    tips: ["Nunca lo dejes en un auto caliente ni 5 minutos", "Invierte en un seguro veterinario desde cachorro", 'El arn\xE9s tipo "H" es el m\xE1s seguro para su estructura', "Visita al vet antes de cualquier vuelo"],
    close: "Nada de esto significa que no sean incre\xEDbles compa\xF1eros. Solo significa que hay que elegirlos con los ojos abiertos. Un Frenchie bien atendido es un perro genuinamente feliz."
  },
  {
    id: 3,
    cat: "razas",
    emoji: "\u{1F9AE}",
    color: "#1EB87A",
    img: "fotos-razas-sm/Labrador Retriever.jpg",
    title: "Labrador Retriever: el compa\xF1ero que nunca falla",
    sub: "Por qu\xE9 fue el perro m\xE1s popular del mundo por 30 a\xF1os",
    date: "Abril 2025",
    read: 5,
    tags: ["labrador", "familia", "entrenamiento"],
    lead: "Hay una raz\xF3n por la que el Labrador fue el perro m\xE1s popular en USA durante 31 a\xF1os consecutivos. Es adaptable, alegre, f\xE1cil de entrenar y genuinamente bueno con todos. La pregunta no es si quieres uno, sino si est\xE1s listo.",
    body: [
      { h: "Energ\xEDa alta, paciencia tambi\xE9n", p: "Los Labs necesitan 1-2 horas de ejercicio diario hasta los 3 a\xF1os. Despu\xE9s se tranquilizan notablemente. Son perfectos para correr, nadar y jugar fetch. Sin actividad, inventan entretenimiento propio (= destrucci\xF3n dom\xE9stica)." },
      { h: "Entrenamiento: f\xE1cil si empiezas temprano", p: "Responden incre\xEDblemente bien al refuerzo positivo. Con 15 minutos diarios desde cachorro aprenden comandos b\xE1sicos en semanas. No es casualidad que sean los perros gu\xEDa, de rescate y detecci\xF3n m\xE1s usados en el mundo." },
      { h: "La obsesi\xF3n con la comida", p: "El Labrador promedio comer\xEDa hasta explotar si se lo permites. Controla porciones estrictamente, elimina snacks sin valor nutricional y mide las calor\xEDas. La obesidad en Labs acorta la vida 2-3 a\xF1os seg\xFAn estudios de la Universidad de Cambridge." },
      { h: "Negro, amarillo o chocolate: \xBFimporta el color?", p: "La personalidad no var\xEDa por color. Sin embargo, estudios recientes sugieren que los chocolates tienden a tener vida m\xE1s corta (10.7 vs 12.1 a\xF1os) y m\xE1s problemas dermatol\xF3gicos, posiblemente por la cr\xEDa selectiva para el color." }
    ],
    stat: "El Labrador Retriever sigue siendo la raza #1 recomendada para familias con ni\xF1os en 8 de cada 10 encuestas de especialistas caninos, a pesar de haber perdido el tope de registros AKC.",
    tips: ["Usa juguetes dispensadores de comida para estimulaci\xF3n mental", 'Ense\xF1a "nada" o "deja" desde el primer d\xEDa', "Ofrece ejercicio mental adem\xE1s del f\xEDsico (puzzle feeders)", "Revisi\xF3n de caderas al a\xF1o para detecci\xF3n temprana de displasia"],
    close: "Si buscas un perro que se adapte a tu vida, que se lleve con ni\xF1os, adultos mayores y otros animales, y que nunca te decepcione en lealtad, el Labrador es tu respuesta."
  },
  {
    id: 4,
    cat: "razas",
    emoji: "\u{1F429}",
    color: "#E85D75",
    img: "uploads/Page 17.jpeg",
    title: "Poodle: inteligencia, elegancia y muy poco al\xE9rgeno",
    sub: "El perro m\xE1s inteligente del mundo tambi\xE9n es el m\xE1s subestimado",
    date: "Abril 2025",
    read: 5,
    tags: ["poodle", "caniche", "hipoalerg\xE9nico"],
    lead: "El Poodle carga con el estigma del perro de concurso de belleza. Es injusto: es considerado la segunda raza m\xE1s inteligente del mundo, es activo, atl\xE9tico y una de las mejores opciones para personas con alergias.",
    body: [
      { h: "Inteligencia real, no de adorno", p: "El Poodle entiende comandos nuevos en menos de 5 repeticiones y obedece a la primera el 95% de las veces (seg\xFAn el ranking de Stanley Coren). Necesitan estimulaci\xF3n mental constante; sin desaf\xEDos se aburren y se vuelven ansiosos." },
      { h: "\xBFRealmente hipoalerg\xE9nico?", p: "Ning\xFAn perro es 100% hipoalerg\xE9nico, pero los Poodles producen menos caspa y no mudan pelo de forma significativa. Para personas con alergias leves a moderadas, son una de las mejores opciones disponibles." },
      { h: "El pelo: mantenimiento real", p: "Su rizado continuo crecimiento no se detiene solo. Necesitan corte profesional cada 6-8 semanas. Sin cepillado diario, el pelo se enreda y forma nudos dolorosos. El costo de grooming anual es de $600-$1,200 en promedio." },
      { h: "Toy, Miniatura o Est\xE1ndar", p: "El Toy (hasta 4kg) es perfecto para apartamentos pero m\xE1s fr\xE1gil. El Miniatura (5-9kg) es el m\xE1s equilibrado. El Est\xE1ndar (20-35kg) necesita m\xE1s ejercicio pero tiene menos problemas de salud. Todos comparten la misma inteligencia." }
    ],
    stat: "En el ranking de inteligencia canina de Stanley Coren (Universidad de British Columbia), el Poodle ocupa el puesto #2, solo despu\xE9s del Border Collie.",
    tips: ["Inscr\xEDbelos en agility o nose work: son deportistas naturales", "El cepillado diario de 5 minutos evita nudos costosos de deshacer", "Son excelentes perros de terapia por su sensibilidad emocional", "Poodle Toy: usa rampas para bajar del sof\xE1, sus patas son delicadas"],
    close: "Si quieres un perro que te sorprenda cada d\xEDa con su capacidad de aprender, que no suelte pelo por toda la casa y que se adapte a cualquier estilo de vida, el Poodle merece una segunda mirada."
  },
  {
    id: 5,
    cat: "razas",
    emoji: "\u{1F415}\u200D\u{1F9BA}",
    color: "#F58220",
    img: "uploads/Page 20.jpeg",
    title: "Schnauzer: fiel, inteligente y siempre alerta",
    sub: "El guardi\xE1n del hogar en tama\xF1o compacto",
    date: "Abril 2025",
    read: 4,
    tags: ["schnauzer", "miniatura", "vigilante"],
    lead: "El Schnauzer Miniatura es uno de los perros m\xE1s populares de Latinoam\xE9rica y Miami por una buena raz\xF3n: es leal, alerta, se adapta bien a apartamentos y su pelaje no muda. Pero tambi\xE9n tiene un car\xE1cter fuerte que hay que saber manejar.",
    body: [
      { h: "Car\xE1cter: seguro de s\xED mismo", p: "El Schnauzer no es sumiso. Tiene opini\xF3n propia, ladra cuando considera que debe hacerlo y puede ser terco en el entrenamiento. El refuerzo positivo desde cachorro y la consistencia de reglas son fundamentales." },
      { h: "Salud: ojo con el p\xE1ncreas", p: "Son propensos a pancreatitis, especialmente si comen alimentos con alto contenido graso. Nada de embutidos, queso graso ni sobras de frituras. Dieta de calidad y porciones controladas alarga su vida notablemente." },
      { h: "El bigote y las cejas: grooming real", p: "Necesitan corte profesional cada 8-10 semanas. El pelo de la cara acumula humedad tras beber agua; l\xEDmpia con toallitas despu\xE9s de comer y beber para evitar manchas e infecciones en la zona del hocico." },
      { h: "Ejercicio: moderado pero consistente", p: "No necesitan largas caminatas, pero s\xED actividad diaria. 30-45 minutos en dos salidas es suficiente para el Miniatura. El Est\xE1ndar (35-45cm) necesita m\xE1s. Son perfectos para due\xF1os activos pero no atletas." }
    ],
    stat: "El Schnauzer Miniatura est\xE1 en el top 20 de razas m\xE1s registradas en USA y en el top 5 en Alemania, su pa\xEDs de origen, donde fue criado originalmente para cazar ratones.",
    tips: ["Socializaci\xF3n temprana es clave: pueden ser desconfiados con extra\xF1os", "Limpia la barba despu\xE9s de cada comida", "Evita dietas altas en grasa para prevenir pancreatitis", "Son buenos en deportes de obediencia y agility"],
    close: "Con el car\xE1cter correcto y las reglas claras desde peque\xF1o, el Schnauzer se convierte en un compa\xF1ero leal e inteligente que da la impresi\xF3n de entender cada conversaci\xF3n."
  },
  {
    id: 6,
    cat: "razas",
    emoji: "\u{1F9B4}",
    color: "#1E90FF",
    img: "uploads/Page 13.jpeg",
    title: "Yorkshire Terrier: peque\xF1o en tama\xF1o, enorme en personalidad",
    sub: "C\xF3mo vivir con el perro m\xE1s valiente del mundo",
    date: "Marzo 2025",
    read: 4,
    tags: ["yorkshire", "terrier", "peque\xF1o"],
    lead: "El Yorkshire Terrier cree firmemente que pesa 30 kilos. Es valiente, vocal, curioso y profundamente leal a su familia. Pero tiene necesidades espec\xEDficas de salud dental, cuidado del pelaje y socializaci\xF3n que no puedes ignorar.",
    body: [
      { h: "Dientes: su problema m\xE1s com\xFAn", p: "Las razas peque\xF1as acumulan sarro y sufren enfermedad periodontal m\xE1s r\xE1pido que las grandes. Cepillado dental 3 veces por semana desde cachorro y limpieza profesional anual pueden ahorrarte miles de d\xF3lares en extracciones." },
      { h: "El pelaje: seda que pide atenci\xF3n", p: 'Su pelo largo es m\xE1s similar al cabello humano que al pelo de perro. Sin cepillado diario forma nudos. Muchos due\xF1os optan por corte "puppy cut" corto para facilitar el mantenimiento sin sacrificar la est\xE9tica.' },
      { h: "Ansiedad por separaci\xF3n", p: "Los Yorkies se vinculan intensamente con su due\xF1o y sufren cuando quedan solos. Entrenamiento de independencia desde cachorro (salidas cortas progresivas) y juguetes de estimulaci\xF3n mental son esenciales si trabajas fuera." },
      { h: "Temperatura: lo llevan mal en fr\xEDo", p: "Su poco pelo corporal y peque\xF1o tama\xF1o los hacen sensibles al fr\xEDo. En invierno o en lugares con AC muy fr\xEDo, necesitan su\xE9ter. No es un capricho de due\xF1o exagerado: es una necesidad termorreguladora real." }
    ],
    stat: "El Yorkshire Terrier fue originalmente criado en el siglo XIX para cazar ratones en minas de carb\xF3n en Yorkshire, Inglaterra. Su tama\xF1o compacto y valent\xEDa lo hac\xEDan ideal para espacios reducidos.",
    tips: ["Cepillado dental 3 veces por semana desde los 3 meses", "Nunca lo dejes saltar de superficies altas: fracturas son comunes", "Socializa con perros de su tama\xF1o para evitar traumas", "Usa arn\xE9s, no collar: la tr\xE1quea es muy delicada"],
    close: "Un Yorkshire bien socializado y con las necesidades cubiertas es un perro lleno de vida y personalidad. Son perfectos para quienes quieren mucho perro en poco espacio."
  },
  {
    id: 7,
    cat: "razas",
    emoji: "\u{1F436}",
    color: "#E86535",
    img: "fotos-razas-sm/Beagle.jpg",
    title: "Beagle: c\xF3mo manejar su energ\xEDa (sin volverte loco)",
    sub: "Todo sobre el olfato m\xE1s poderoso del mundo dom\xE9stico",
    date: "Marzo 2025",
    read: 5,
    tags: ["beagle", "energ\xEDa", "olfato"],
    lead: "El Beagle es encantador, curioso y tiene la nariz m\xE1s afinada del mundo canino dom\xE9stico. Pero tambi\xE9n ladra, a\xFAlla y si sigue un olor interesante puede ignorarte completamente. Aqu\xED est\xE1 el manual real para convivir con uno.",
    body: [
      { h: "El instinto de rastreo: bienvenido a tu vida", p: "El Beagle fue criado para rastrear durante horas sin parar. Ese instinto sigue completamente activo. Si huele algo interesante, se enfoca totalmente. El entrenamiento de recall (volver al llamado) es la habilidad m\xE1s importante que le ense\xF1ar\xE1s." },
      { h: "Ejercicio: m\xE1s de lo que parece", p: "Necesitan 45-60 minutos de actividad diaria. Una caminata simple no es suficiente; necesitan estimulaci\xF3n olfativa. Oculta premios en el jard\xEDn, usa snuffle mats o practica nosework. La nariz cansada es igual de efectiva que las patas cansadas." },
      { h: "El aullido: la sinfon\xEDa vecinal", p: 'Los Beagles vocalizan: ladran, a\xFAllan y hacen un sonido llamado "bay". En apartamentos esto puede ser un problema real con vecinos. El entrenamiento de control vocal y el evitar que pasen muchas horas solos reduce significativamente el problema.' },
      { h: "Alimentaci\xF3n: el est\xF3mago sin fondo", p: "Como el Labrador, el Beagle come todo lo que encuentre. Son maestros en abrir armarios y robar comida del mes\xF3n. Porciones controladas, horario fijo y almacenamiento seguro de alimentos son obligatorios." }
    ],
    stat: "El Beagle tiene aproximadamente 220 millones de receptores olfativos, comparado con los 5 millones de los humanos. Por eso son usados por el USDA en aeropuertos para detectar alimentos ilegales.",
    tips: ["Jard\xEDn siempre cercado: escapar\xE1n siguiendo olores", 'El entrenamiento de "ven" es prioridad absoluta', "Nosework y b\xFAsqueda de premios los cansa mentalmente", "Son perros de manada: se llevan bien con otros perros"],
    close: "Con la estimulaci\xF3n correcta y el entrenamiento necesario, el Beagle es un compa\xF1ero alegre, afectuoso y completamente adicto a ti. Solo tienes que entender que su nariz manda."
  },
  {
    id: 8,
    cat: "razas",
    emoji: "\u{1F415}",
    color: "#2D6A4F",
    img: "uploads/Page 4.jpeg",
    title: "Cocker Spaniel: el m\xE1s sensible de la familia",
    sub: "C\xF3mo criar a un perro que siente todo profundamente",
    date: "Marzo 2025",
    read: 4,
    tags: ["cocker spaniel", "sensible", "familia"],
    lead: "El Cocker Spaniel es uno de los perros m\xE1s expresivos y afectuosos que existen. Esa sensibilidad es su mayor virtud, pero tambi\xE9n significa que reacciona mal a la disciplina dura, a la soledad prolongada y a los ambientes tensos.",
    body: [
      { h: "Entrenamiento: solo con refuerzo positivo", p: "Los Cockers son extremadamente sensibles al tono de voz. Un rega\xF1o fuerte puede hacerlos retra\xEDdos por horas. El entrenamiento con premios y voz calmada da resultados excelentes. El castigo f\xEDsico o gritos son contraproducentes y crueles." },
      { h: "Orejas: el mantenimiento semanal obligatorio", p: "Sus largas orejas ca\xEDdas crean un ambiente c\xE1lido y h\xFAmedo perfecto para bacterias y hongos. Limpieza semanal con soluci\xF3n \xF3tica veterinaria es obligatoria. Las infecciones de o\xEDdo recurrentes son la queja n\xFAmero 1 de due\xF1os de Cocker." },
      { h: "Pelaje: hermoso pero exigente", p: "Necesitan cepillado 3-4 veces por semana y corte profesional cada 8 semanas. El pelo alrededor de las orejas y patas acumula suciedad. Muchos due\xF1os optan por corte pr\xE1ctico que mantiene la forma de la raza sin el mantenimiento extremo." },
      { h: "Ejercicio moderado, v\xEDnculo intenso", p: "No necesitan tanto ejercicio como un Labrador, pero s\xED actividad diaria. Lo que m\xE1s necesitan es tiempo contigo. Son perros de compa\xF1\xEDa en el sentido m\xE1s profundo: quieren estar en la misma habitaci\xF3n que su familia siempre." }
    ],
    stat: "El Cocker Spaniel Americano gan\xF3 el Westminster Dog Show m\xE1s veces que cualquier otra raza en la historia del concurso. Su nombre viene de su uso original para cazar becadas (woodcock) en Inglaterra.",
    tips: ["Limpieza de o\xEDdos semanal sin excepci\xF3n", "Socializaci\xF3n temprana para evitar timidez excesiva", 'Nunca uses disciplina dura: un "no" firme es suficiente', "Excelente con ni\xF1os que respetan su espacio"],
    close: "Si buscas un perro profundamente afectuoso que te lea el estado de \xE1nimo mejor que muchas personas, el Cocker Spaniel es tu compa\xF1ero. Solo necesita gentileza y presencia."
  },
  {
    id: 9,
    cat: "razas",
    emoji: "\u{1F429}",
    color: "#7C3AED",
    img: "fotos-razas-sm/Chihuahua.jpg",
    title: "Chihuahua: criando al perro m\xE1s malentendido del mundo",
    sub: "Por qu\xE9 los problemas de car\xE1cter son siempre culpa del due\xF1o",
    date: "Febrero 2025",
    read: 4,
    tags: ["chihuahua", "peque\xF1o", "temperamento"],
    lead: 'Los Chihuahuas muerden, ladran, gru\xF1en y son agresivos. Pero la realidad es que casi siempre es culpa de sus due\xF1os. El "S\xEDndrome del Perro Peque\xF1o" es un fen\xF3meno real: los tratamos como juguetes y se comportan como animales sin reglas.',
    body: [
      { h: 'El problema del "peque\xF1o indefenso"', p: 'Los due\xF1os de perros peque\xF1os permiten conductas que nunca tolerar\xEDan en un Golden. Gru\xF1ir al acercarse a su comida, no bajar del sof\xE1 cuando se le pide, ladrar a visitas. Eso no es "car\xE1cter": es falta de entrenamiento.' },
      { h: "Entrenamiento: exactamente igual que cualquier raza", p: "Los Chihuahuas son inteligentes y responden perfectamente al entrenamiento positivo. La misma consistencia que usar\xEDas con un Labrador. Reglas claras, refuerzo positivo y nunca excusar comportamientos problem\xE1ticos por su tama\xF1o." },
      { h: "Salud: lo que s\xED es genuino", p: "Tienen predisposici\xF3n a problemas card\xEDacos (mitral valve disease), hidrocefalia y colapso traqueal. Dentadura peque\xF1a = m\xE1s sarro y enfermedad periodontal. Cepillado dental frecuente y revisiones card\xEDacas anuales desde los 5 a\xF1os son esenciales." },
      { h: "Temperatura y fragilidad f\xEDsica", p: "Son muy sensibles al fr\xEDo: su\xE9ter en invierno o con AC fuerte. Sus huesos son finos; una ca\xEDda de altura moderada puede fracturarlos. Nada de saltos de sof\xE1s altos, nada de que ni\xF1os peque\xF1os los carguen sin supervisi\xF3n adulta." }
    ],
    stat: "El Chihuahua es la raza de perro m\xE1s peque\xF1a del mundo con registros formales, pero tambi\xE9n una de las m\xE1s longevas: bien cuidados pueden vivir 15-20 a\xF1os, superando a razas mucho m\xE1s grandes.",
    tips: ["Tr\xE1talo como perro, no como accesorio", "Socializaci\xF3n con personas y otros perros desde las 8 semanas", "Nunca lo cargues para alejarlo de situaciones: que las enfrente", "Cepillado dental 3 veces por semana m\xEDnimo"],
    close: "Un Chihuahua criado con respeto, reglas claras y socializaci\xF3n adecuada es un perro valiente, leal y con una personalidad enorme. Lo que criaste es lo que tienes."
  },
  {
    id: 10,
    cat: "razas",
    emoji: "\u{1F43E}",
    color: "#E85D75",
    img: "uploads/Page 21.jpeg",
    title: "Shih Tzu: el arte de cuidar ese pelaje de seda",
    sub: "Grooming, salud y vida con el perro de los emperadores chinos",
    date: "Febrero 2025",
    read: 4,
    tags: ["shih tzu", "pelaje", "apartamento"],
    lead: "El Shih Tzu fue criado durante siglos para una sola cosa: ser compa\xF1\xEDa de lujo en palacios chinos. Esa historia explica todo sobre su car\xE1cter: es afectuoso, tranquilo y completamente domesticado. Tambi\xE9n tiene pelo que requiere atenci\xF3n seria.",
    body: [
      { h: "Pelaje: la inversi\xF3n que no termina", p: 'Sin cepillado diario, su pelo largo forma nudos que solo se resuelven con corte. La mayor\xEDa de due\xF1os modernos opta por corte corto "teddy bear" que mantiene la esencia de la raza sin el mantenimiento extremo. Grooming profesional cada 6-8 semanas.' },
      { h: "Cara plana: m\xE1s que est\xE9tica", p: "Como el French Bulldog, es braquic\xE9falo. Resuellan, roncan y en calor extremo se fatigan r\xE1pido. En verano, salidas en horas frescas y siempre con agua disponible. No es una raza para hacer ejercicio intenso." },
      { h: "Ojos: limpieza diaria necesaria", p: "Sus ojos grandes y prominentes acumulan secreciones que manchan el pelo blanco de la cara. Limpieza diaria con gasa h\xFAmeda evita manchas y posibles infecciones oculares. Las manchas persistentes requieren productos espec\xEDficos." },
      { h: "Car\xE1cter: amigable con todos", p: "A diferencia de razas m\xE1s territoriales, el Shih Tzu suele ser amigable con desconocidos, ni\xF1os y otros animales. Son excelentes perros de departamento: tranquilos, no ladran excessivamente y son felices con ejercicio moderado." }
    ],
    stat: 'El Shih Tzu aparece en pinturas y documentos de la corte imperial china desde el siglo XVII. Su nombre significa "perro le\xF3n" en chino mandar\xEDn, en referencia a los leones del budismo tibetano.',
    tips: ['Corte "puppy cut" para mantenimiento pr\xE1ctico', "Limpieza ocular diaria para prevenir manchas y infecciones", "Usar bowls elevados facilita comer sin mojar el pelo", "Excelente para due\xF1os por primera vez"],
    close: "Si buscas un perro tranquilo, afectuoso y adaptable al ritmo de vida moderno en apartamento, el Shih Tzu es una elecci\xF3n excelente. Solo necesita ese grooming consistente."
  },
  // ── BIENESTAR ────────────────────────────────────────────────────────────
  {
    id: 11,
    cat: "bienestar",
    emoji: "\u{1F474}",
    color: "#1EB87A",
    title: "Perros para personas mayores: la ciencia dice que alargan la vida",
    sub: "Datos reales sobre compa\xF1\xEDa canina y longevidad",
    date: "Mayo 2025",
    read: 6,
    tags: ["personas mayores", "salud", "longevidad"],
    lead: "No es un mito ni una exageraci\xF3n sentimental: tener un perro en la vejez tiene efectos medibles en la salud cardiovascular, la presi\xF3n arterial, la actividad f\xEDsica y la salud mental. La ciencia lleva d\xE9cadas confirm\xE1ndolo.",
    body: [
      { h: "El coraz\xF3n agradece la compa\xF1\xEDa", p: "Un estudio de la American Heart Association de 2019 con 3.8 millones de personas encontr\xF3 que los due\xF1os de perros tienen un 24% menos de riesgo de muerte por enfermedad cardiovascular. La interacci\xF3n diaria reduce cortisol y baja la presi\xF3n arterial." },
      { h: "Actividad f\xEDsica sin que parezca ejercicio", p: "Las personas mayores con perro caminan un promedio de 22 minutos m\xE1s por d\xEDa que quienes no tienen. Eso es suficiente para cumplir las recomendaciones de actividad f\xEDsica de la OMS para adultos mayores. La obligaci\xF3n de sacar al perro es, literalmente, medicina." },
      { h: "Contra la soledad y el deterioro cognitivo", p: "La soledad en adultos mayores es un factor de riesgo equivalente a fumar 15 cigarrillos diarios. Los perros proveen compa\xF1\xEDa constante, rutina y responsabilidad. Estudios muestran que due\xF1os de mascotas mayores tienen menor velocidad de deterioro cognitivo." },
      { h: "Qu\xE9 razas son m\xE1s apropiadas", p: "Para adultos mayores: Cavalier King Charles Spaniel, Bich\xF3n Fris\xE9, Poodle Miniatura, Shih Tzu y Malt\xE9s. Perros de tama\xF1o mediano-peque\xF1o, temperamento tranquilo y que no necesiten ejercicio intenso. Que el perro sea adoptable, no que sea cachorro." }
    ],
    stat: "Un estudio sueco (Uppsala University, 2017) con 3.4 millones de personas encontr\xF3 que vivir solo con un perro reduce el riesgo de muerte cardiovascular en un 36% comparado con vivir solo sin mascota.",
    tips: ["Adoptar un perro adulto (2-5 a\xF1os) es ideal: ya est\xE1 entrenado", "Considerar razas de bajo mantenimiento y ejercicio moderado", "El costo del vet: revisar si seguro de salud cubre algunas mascotas", "Contactar refugios con programas especiales para adultos mayores"],
    close: "Un perro en la vejez no es una carga: es el compa\xF1ero m\xE1s constante, el que obliga a salir, el que da rutina y el que nunca juzga. Para muchos adultos mayores, es la mejor decisi\xF3n de salud que tomaron."
  },
  {
    id: 12,
    cat: "familia",
    emoji: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}",
    color: "#E85D75",
    title: "Por qu\xE9 un perro transforma una familia con hijos",
    sub: "Responsabilidad, empat\xEDa y lazos que duran toda la vida",
    date: "Mayo 2025",
    read: 5,
    tags: ["familia", "ni\xF1os", "crianza"],
    lead: 'Crecer con un perro no es solo "tener una mascota". Es aprender responsabilidad, empat\xEDa y duelo. Es tener tu primer mejor amigo que nunca te traiciona. Hay una raz\xF3n por la que los adultos que tuvieron perros de ni\xF1os los recuerdan toda la vida.',
    body: [
      { h: "Lo que los ni\xF1os aprenden sin que te des cuenta", p: "Cuidar a un perro ense\xF1a empat\xEDa pr\xE1ctica, no te\xF3rica. El ni\xF1o aprende a leer lenguaje no verbal, a respetar l\xEDmites (el perro gru\xF1e y hay que respetar), a ser responsable de otro ser vivo. Estudios muestran que ni\xF1os con mascotas desarrollan mayor coeficiente de empat\xEDa." },
      { h: "El sistema inmune y los alergenos", p: "Contrario a lo que muchos piensan, crecer con un perro en casa reduce el riesgo de desarrollar alergias y asma. Un estudio del Journal of Allergy and Clinical Immunology encontr\xF3 que ni\xF1os expuestos a perros antes del a\xF1o de vida tienen 13% menos probabilidad de desarrollar asma." },
      { h: "Razas recomendadas para familias con ni\xF1os", p: "Golden Retriever y Labrador son los reyes indiscutidos. Tambi\xE9n: Beagle, Boxer, Cavalier King Charles Spaniel y Bernese Mountain Dog. Evitar razas con alta sensibilidad al ruido o tendencia territorial si hay ni\xF1os peque\xF1os en casa." },
      { h: "La conversaci\xF3n del duelo: inevitable y necesaria", p: "Los perros viven 10-15 a\xF1os. Si tu hijo tiene 5 cuando llega el perro, la probabilidad de que experiencie su muerte es alta. Esa primera experiencia de p\xE9rdida, acompa\xF1ada por los padres, construye herramientas emocionales que duran toda la vida." }
    ],
    stat: "El 90% de adultos que tuvieron perros durante la infancia describen esa relaci\xF3n como una de las m\xE1s significativas de su vida, seg\xFAn una encuesta de la American Pet Products Association (2024).",
    tips: ["Establece reglas claras: qui\xE9n alimenta, qui\xE9n saca, qui\xE9n cepilla", "Ense\xF1a a los ni\xF1os a leer el lenguaje corporal del perro", "Nunca dejes ni\xF1os menores de 6 a\xF1os solos con el perro", "Involucra a los ni\xF1os en las visitas al veterinario"],
    close: "Un perro en familia es una inversi\xF3n en car\xE1cter. Las lecciones que da \u2014 responsabilidad, constancia, amor incondicional \u2014 no vienen de ning\xFAn libro. Vienen de vivir con \xE9l."
  },
  {
    id: 13,
    cat: "familia",
    emoji: "\u{1F9E9}",
    color: "#7C3AED",
    title: "Perros y ni\xF1os con autismo: v\xEDnculos que la ciencia confirma",
    sub: "Datos reales sobre terapia asistida con animales en el espectro",
    date: "Abril 2025",
    read: 6,
    tags: ["autismo", "terapia", "ni\xF1os", "TEA"],
    lead: "Para muchos ni\xF1os en el espectro autista, un perro es el primer ser vivo con quien logran una conexi\xF3n genuina. No juzga, no tiene expectativas sociales impl\xEDcitas y ofrece contacto f\xEDsico regulado. La ciencia lleva a\xF1os documentando estos beneficios.",
    body: [
      { h: "Regulaci\xF3n sensorial y reducci\xF3n de ansiedad", p: "Acariciar un perro reduce los niveles de cortisol (hormona del estr\xE9s) y aumenta la oxitocina en ni\xF1os con TEA, igual que en neurot\xEDpicos. Varios estudios muestran disminuci\xF3n de comportamientos de autoestimulaci\xF3n ansiosa durante y despu\xE9s de la interacci\xF3n canina." },
      { h: "Comunicaci\xF3n no verbal: el lenguaje del perro", p: "Los ni\xF1os con autismo que tienen dificultad con el lenguaje verbal frecuentemente responden mejor a la comunicaci\xF3n no verbal. El perro es un maestro de esto: comunica con cuerpo, cola y ojos. Muchos ni\xF1os aprenden a leer emociones en el perro antes de hacerlo en personas." },
      { h: "Perros de servicio vs. mascotas en casa", p: "Los perros de servicio especializados para TEA (PTSD/Autism Service Dogs) est\xE1n entrenados para interrumpir comportamientos de crisis, tethering (anclar f\xEDsicamente al ni\xF1o) y alertar a los padres. Son una herramienta cl\xEDnica. Una mascota en casa, bien elegida, ofrece beneficios menores pero reales." },
      { h: "Qu\xE9 tener en cuenta antes de adoptar", p: "Evaluar el perfil sensorial del ni\xF1o primero. Un ni\xF1o con hipersensibilidad t\xE1ctil puede sentir el contacto del perro como invasivo. Perros de temperamento muy calmado, predecibles y entrenados son clave. Nunca cachorros hiperactivos para este contexto." }
    ],
    stat: "Un estudio de la Universidad de Missouri (2018) encontr\xF3 que ni\xF1os con autismo tienen niveles de cortisol matutino 10% m\xE1s bajos en d\xEDas en que interactuaron con su perro, comparado con d\xEDas sin esa interacci\xF3n.",
    tips: ["Consulta con el terapeuta del ni\xF1o antes de adoptar", "Golden Retriever y Labrador Retriever: las razas m\xE1s usadas en programas de terapia", "Introduce el perro gradualmente, sin forzar contacto", "Organizaciones como Canine Companions ofrecen perros de servicio para TEA"],
    close: "El v\xEDnculo entre un ni\xF1o en el espectro y su perro puede ser de los m\xE1s profundos que existen. Requiere preparaci\xF3n y la raza correcta, pero cuando funciona, transforma vidas."
  },
  {
    id: 14,
    cat: "bienestar",
    emoji: "\u{1F9E0}",
    color: "#1EB87A",
    title: "C\xF3mo un perro puede reducir tu ansiedad (con datos reales)",
    sub: "La ciencia detr\xE1s del v\xEDnculo humano-canino y la salud mental",
    date: "Abril 2025",
    read: 5,
    tags: ["ansiedad", "salud mental", "bienestar"],
    lead: "No es que se sientan bien: acariciar a un perro produce cambios bioqu\xEDmicos medibles en el cerebro. Oxitocina, serotonina, dopamina. La relaci\xF3n humano-perro activa el mismo sistema de apego que con otros humanos. La ciencia lleva d\xE9cadas confirm\xE1ndolo.",
    body: [
      { h: "La qu\xEDmica del v\xEDnculo", p: "Mirar a tu perro a los ojos durante 5 minutos aumenta la oxitocina en sangre un 300% en humanos y un 130% en el perro. Este es el mismo mecanismo que vincula a madres con beb\xE9s reci\xE9n nacidos. No es met\xE1fora: es neurociencia." },
      { h: "Rutina como ancla emocional", p: "Las personas con ansiedad o depresi\xF3n se benefician especialmente de la rutina que impone tener un perro. Las horas de alimentaci\xF3n, las caminatas, el cepillado. Esa estructura externa reduce la par\xE1lisis por decisi\xF3n y ancla el d\xEDa." },
      { h: "Presencia f\xEDsica: el ant\xEDdoto al pensamiento rumiativo", p: "Los perros viven en el presente de forma radical. Cuando tu cabeza est\xE1 dando vueltas a preocupaciones futuras o pasadas, el perro te jala de vuelta al ahora. Varios terapeutas recomiendan animales de compa\xF1\xEDa como parte del tratamiento de ansiedad generalizada." },
      { h: "L\xEDmites: no son terapeutas", p: "Los perros complementan el tratamiento de salud mental, no lo reemplazan. Tener un perro cuando est\xE1s en crisis severa puede ser contraproducente si no puedes atenderlo bien. La conversaci\xF3n con tu psic\xF3logo sobre este tema es importante." }
    ],
    stat: "Un meta-an\xE1lisis de 2019 publicado en BMC Psychiatry que analiz\xF3 17 estudios encontr\xF3 que la interacci\xF3n con animales reduce significativamente s\xEDntomas de ansiedad, depresi\xF3n y soledad en contextos cl\xEDnicos y no cl\xEDnicos.",
    tips: ["Los perros de terapia son distintos a los de soporte emocional: inf\xF3rmate bien", "Una caminata de 20 min con tu perro tiene efectos similares a la meditaci\xF3n en cortisol", "Stroking (acariciar) durante 10 min baja la presi\xF3n arterial significativamente", "El ejercicio f\xEDsico con tu perro potencia el efecto antidepresivo"],
    close: 'Tu perro no sabe que te est\xE1 "ayudando". Solo est\xE1 siendo \xE9l mismo. Pero eso, parad\xF3jicamente, es exactamente lo que necesitas. Presencia sin agenda. Amor sin condiciones.'
  },
  // ── LIFESTYLE ────────────────────────────────────────────────────────────
  {
    id: 15,
    cat: "lifestyle",
    emoji: "\u{1F3D9}\uFE0F",
    color: "#7C3AED",
    title: "Vivir con un perro en apartamento: la gu\xEDa honesta",
    sub: "Lo que nadie te cuenta antes de adoptar en la ciudad",
    date: "Mayo 2025",
    read: 6,
    tags: ["apartamento", "ciudad", "lifestyle"],
    lead: "Vivir con un perro en un apartamento no solo es posible: millones de personas lo hacen exitosamente. El tama\xF1o del perro importa menos de lo que crees. Lo que importa es el ejercicio, la rutina y que elijas la raza correcta.",
    body: [
      { h: "El tama\xF1o del apartamento importa menos que el ejercicio", p: "Un Greyhound (lebrel gigante) puede vivir felizmente en un apartamento peque\xF1o porque dentro de casa son incre\xEDblemente tranquilos. Un Jack Russell Terrier puede desquiciar un piso amplio si no sale suficiente. El tama\xF1o del perro no predice compatibilidad con el apartamento." },
      { h: "Las mejores razas para apartamento", p: "Bulldog Franc\xE9s, Bich\xF3n Fris\xE9, Pug, Cavalier King Charles, Shih Tzu, Basset Hound, Poodle Miniatura y Greyhound son considerados ideales. Evitar: Border Collie, Husky Siberiano, D\xE1lmata y Jack Russell en espacios peque\xF1os sin jardin." },
      { h: "La rutina de ciudad: lo que funciona", p: "M\xEDnimo 3 salidas al d\xEDa: una larga (30-40 min) y dos cortas. Parques de perros cercanos son invaluables. Juguetes de estimulaci\xF3n mental dentro de casa (puzzle feeders, KONGs) reducen el aburrimiento. El paseo de la ma\xF1ana marca el tono del d\xEDa." },
      { h: "El vecindario y el edificio", p: "Revisa el reglamento del edificio antes de adoptar: restricciones de tama\xF1o, razas prohibidas (com\xFAn con Pitbull, Rottweiler, Doberman). Presenta a tu perro a los vecinos de tu piso. Un perro que ladra en apartamento tiene consecuencias reales con la administraci\xF3n." }
    ],
    stat: "El 42% de los perros en USA viven en apartamentos o condominios. La encuesta de la APPA 2023-2024 muestra que la satisfacci\xF3n de estos due\xF1os es igual a la de quienes tienen casa con jard\xEDn cuando el perro hace ejercicio regular.",
    tips: ["Establece una zona del perro: cama, juguetes, bebedero en un rinc\xF3n", "Contrata un paseador para los d\xEDas de trabajo largo", "Un tapete de lamer (licking mat) con mantequilla de man\xED entretiene 20 min", "Revisa la pol\xEDtica pet-friendly antes de firmar cualquier contrato de renta"],
    close: "El apartamento m\xE1s lujoso con un perro aburrido es una mala vida canina. Un estudio chico con rutina, ejercicio y estimulaci\xF3n mental es una vida peruna excelente. T\xFA decides cu\xE1l das."
  },
  {
    id: 16,
    cat: "lifestyle",
    emoji: "\u{1F4BB}",
    color: "#E86535",
    title: "El perro y el home office: la combinaci\xF3n perfecta (si lo haces bien)",
    sub: "C\xF3mo trabajar desde casa con un perro sin perder la productividad ni la cordura",
    date: "Abril 2025",
    read: 4,
    tags: ["home office", "trabajo", "rutina"],
    lead: "Despu\xE9s de la pandemia, millones de personas trabajan desde casa con su perro al lado. La mayor\xEDa lo describen como uno de los mayores beneficios del trabajo remoto. Con las reglas correctas, la convivencia laboral-canina es casi perfecta.",
    body: [
      { h: "El efecto anti-estr\xE9s documentado", p: "Virginia Commonwealth University public\xF3 un estudio mostrando que empleados que llevan perros al trabajo tienen niveles de cortisol significativamente m\xE1s bajos a lo largo del d\xEDa. En home office, este beneficio es constante." },
      { h: "La rutina que necesitan (y t\xFA tambi\xE9n)", p: "El perro te obliga a salir. Eso que parece una interrupci\xF3n es en realidad la pausa que el home office necesita: salir 20 minutos a mediod\xEDa mejora la concentraci\xF3n de la tarde. El paseo es tu separador natural entre bloques de trabajo." },
      { h: "Los l\xEDmites que s\xED necesitas poner", p: 'Algunos perros desarrollan sobreapego cuando el due\xF1o est\xE1 en casa todo el d\xEDa. Necesitan aprender que "est\xE1s pero no est\xE1s disponible". Ens\xE9\xF1ales a estar en su lugar mientras trabajas y que el tiempo de juego llega despu\xE9s de que cierras la laptop.' },
      { h: "Videollamadas y el perro", p: "Los perros en videollamadas laborales han normalizado tanto que muchos jefes esperan verlos. Pero para presentaciones importantes, entrena a tu perro a quedarse fuera del cuarto o en su lugar con un Kong. La imprevisibilidad canina en reuniones cr\xEDticas genera estr\xE9s." }
    ],
    stat: "El 67% de los trabajadores remotos con mascotas dicen que la presencia de su perro es uno de los principales beneficios del trabajo desde casa, por encima de no tener commute, seg\xFAn Gallup 2023.",
    tips: ["Mant\xE9n el horario del perro aunque est\xE9s en casa", "Puerta entreabierta = disponible; puerta cerrada = reuni\xF3n", "Un paseo de 20 min antes de empezar a trabajar cansa la mente del perro", "Juguetes rotativos: lo que sacas hoy lo guardas ma\xF1ana para mantener novedad"],
    close: "El perro de home office no es una distracci\xF3n: es el compa\xF1ero de trabajo m\xE1s leal, discreto (la mayor\xEDa del tiempo) y que nunca se roba el cr\xE9dito de tus ideas."
  },
  {
    id: 17,
    cat: "lifestyle",
    emoji: "\u{1F4F1}",
    color: "#1E90FF",
    title: "Las mejores apps para due\xF1os de perros en 2025",
    sub: "Tecnolog\xEDa que genuinamente mejora la vida de tu perro",
    date: "Mayo 2025",
    read: 4,
    tags: ["apps", "tecnolog\xEDa", "2025"],
    lead: "Hay cientos de apps para mascotas en las tiendas. La mayor\xEDa son in\xFAtiles. Estas son las que realmente usan veterinarios, entrenadores y due\xF1os serios para mejorar la salud, el comportamiento y el bienestar de sus perros.",
    body: [
      { h: "Salud y veterinaria", p: "Petcube ofrece monitoreo de c\xE1mara en casa con an\xE1lisis de comportamiento por IA. PetDesk centraliza citas veterinarias, vacunas y recordatorios de medicamentos. BabelBark conecta a due\xF1os con veterinarios para consultas online r\xE1pidas y econ\xF3micas." },
      { h: "Entrenamiento", p: "Dogo ofrece planes de entrenamiento personalizados con gu\xEDas en video y seguimiento de progreso. GoodPup conecta con entrenadores certificados para sesiones por videollamada. Puppr tiene 101 trucos estructurados de b\xE1sico a avanzado con feedback visual." },
      { h: "Paseos y cuidado", p: "Rover y Wag son las plataformas m\xE1s confiables para paseadores y cuidadores verificados con seguros incluidos. Waze for Dogs no existe, pero Bring Fido es el mejor recurso para encontrar hoteles, restaurantes y parques pet-friendly en cualquier ciudad." },
      { h: "Rastreo GPS", p: "Tractive GPS es el collar tracker m\xE1s usado con 10-30 d\xEDas de bater\xEDa. Fi Series 3 (collar inteligente) trackea pasos, sue\xF1o y actividad adem\xE1s de ubicaci\xF3n. Ambos tienen suscripci\xF3n mensual. Son la inversi\xF3n m\xE1s importante si tu perro tiene tendencia a escapar." }
    ],
    stat: "El mercado global de tecnolog\xEDa para mascotas alcanzar\xE1 los $20 billones USD en 2025, con las apps y dispositivos conectados como el segmento de mayor crecimiento (32% anual).",
    tips: ["Tractive para razas escapistas: inversi\xF3n que puede salvar una vida", "PetDesk para tener todo el historial veterinario en un solo lugar", "Dogo o Puppr para empezar entrenamiento en casa antes de clases formales", "Fi collar: el Apple Watch de los perros, ideal si te gusta los datos"],
    close: "La tecnolog\xEDa no reemplaza al veterinario ni al entrenador profesional, pero s\xED puede ayudarte a tomar mejores decisiones m\xE1s r\xE1pido. Empieza con una o dos apps y escala desde ah\xED."
  },
  {
    id: 18,
    cat: "lifestyle",
    emoji: "\u2615",
    color: "#2D6A4F",
    title: "El boom de los dog caf\xE9s: una tendencia global que lleg\xF3 para quedarse",
    sub: "De Tokio a Nueva York: el fen\xF3meno de tomar caf\xE9 rodeado de perros",
    date: "Marzo 2025",
    read: 4,
    tags: ["dog caf\xE9", "tendencia", "ciudades"],
    lead: "La idea parece simple: pagas la entrada, tomas un caf\xE9 y juegas con perros. Pero detr\xE1s del fen\xF3meno hay algo m\xE1s profundo: la soledad urbana, la imposibilidad de tener mascotas en renta, y la necesidad humana de contacto animal sin compromisos.",
    body: [
      { h: "Origen: Taiw\xE1n y Jap\xF3n, 1998-2004", p: "El primer cat caf\xE9 documentado fue en Taipei en 1998. Jap\xF3n los adopt\xF3 masivamente en la d\xE9cada de 2000 en respuesta a la cultura de vivienda urbana ultracompacta donde tener mascotas es casi imposible. Los dog caf\xE9s siguieron la misma l\xF3gica: el animal es de la cafeter\xEDa, t\xFA eres el visitante." },
      { h: "El modelo actual: adopci\xF3n integrada", p: "Los mejores dog caf\xE9s de USA y Europa no son solo atracciones: son extensiones de refugios de animales. Los perros que ves son adoptables. La estad\xEDa genera ingresos para el refugio y la exposici\xF3n acelera la adopci\xF3n. The Dog Caf\xE9 en Los \xC1ngeles y Dog & Cat Republic en Miami operan con este modelo." },
      { h: "El bienestar animal: la pregunta importante", p: "Los mejores caf\xE9s rotan a los animales, limitan el n\xFAmero de visitantes, tienen zonas de descanso privadas y trabajan con et\xF3logos para evaluar el estr\xE9s canino. Los peores son b\xE1sicamente zool\xF3gicos de contacto. Investiga el caf\xE9 antes de ir." },
      { h: "Ciudades con mejor escena", p: "Tokio sigue siendo la meca. En USA destacan Los \xC1ngeles, Chicago, Nueva York (The Spot) y Atlanta. En Espa\xF1a, Barcelona tiene varios integrados con refugios. En Latinoam\xE9rica, Ciudad de M\xE9xico y Bogot\xE1 tienen la escena m\xE1s desarrollada." }
    ],
    stat: "Se estiman m\xE1s de 150 dog caf\xE9s operativos en USA en 2025, con un crecimiento del 40% desde la pandemia. El ticket promedio de entrada es de $15-$25 por 60-90 minutos.",
    tips: ["Revisa que el caf\xE9 tenga pol\xEDtica de bienestar animal documentada", "No fuerces el contacto: deja que el perro se acerque", "Lleva fotos de tu visita pero no flash: irrita a los animales", "Muchos tienen sistema de reserva: no llegues sin cita en fin de semana"],
    close: "El dog caf\xE9 es uno de los pocos negocios donde pagar por estar rodeado de perros tiene sentido econ\xF3mico y emocional. Mientras los est\xE1ndares de bienestar se mantengan, el fen\xF3meno seguir\xE1 creciendo."
  },
  // ── GUÍAS ────────────────────────────────────────────────────────────────
  {
    id: 19,
    cat: "guias",
    emoji: "\u{1F4CB}",
    color: "#2D6A4F",
    title: "C\xF3mo obtener el certificado ESA en USA: gu\xEDa paso a paso",
    sub: "Qu\xE9 es, qu\xE9 derechos da y c\xF3mo no caer en estafas",
    date: "Mayo 2025",
    read: 7,
    tags: ["ESA", "certificado", "soporte emocional", "USA"],
    lead: "El Emotional Support Animal (ESA) no es lo mismo que un perro de servicio ni un perro de terapia. Es una categor\xEDa espec\xEDfica con derechos concretos. Tambi\xE9n es el sector con m\xE1s fraudes en el mundo de las mascotas. Aqu\xED est\xE1 la gu\xEDa real.",
    body: [
      { h: "Qu\xE9 es realmente un ESA", p: "Un ESA es un animal de compa\xF1\xEDa prescrito por un profesional de salud mental licenciado (psic\xF3logo, psiquiatra, terapeuta) para tratar una condici\xF3n mental diagnosticada. No requiere entrenamiento especial como los perros de servicio. Cualquier raza o especie puede ser ESA." },
      { h: "Los derechos que s\xED tienes", p: 'Bajo el Fair Housing Act (FHA), los propietarios de vivienda deben permitir ESAs incluso en propiedades con pol\xEDtica "no mascotas", y no pueden cobrar dep\xF3sitos adicionales por ellos. Nota importante: desde 2021, las aerol\xEDneas ya NO est\xE1n obligadas a aceptar ESAs en cabina.' },
      { h: "C\xF3mo obtener la carta ESA legalmente", p: 'Solo un profesional de salud mental con licencia en tu estado puede emitir la carta ESA. El proceso: evaluaci\xF3n cl\xEDnica real (presencial o teleconsulta), diagn\xF3stico de condici\xF3n que se beneficia del apoyo animal, carta en papel membretado con licencia del profesional. No existe ning\xFAn "registro" oficial de ESA.' },
      { h: "Las estafas que debes evitar", p: 'Sitios web que venden "certificados ESA" por $30-$200 sin evaluaci\xF3n cl\xEDnica son ilegales. Los propietarios de vivienda tienen derecho a verificar la autenticidad de la carta contactando directamente al profesional. Estos documentos falsos no tienen validez legal y pueden tenerte en problemas.' }
    ],
    stat: 'La National Service Animal Registry estim\xF3 que entre 2018 y 2022, el n\xFAmero de ESAs fraudulentos en USA se multiplic\xF3 por 6, impulsado por plataformas de "registro" online sin respaldo cl\xEDnico.',
    tips: ["Busca un psic\xF3logo o psiquiatra con licencia en tu estado", "Plataformas como Cerebral o Talkspace tienen profesionales que pueden evaluar para ESA", "Guarda copia de la carta y la licencia del profesional", "Renueva la carta anualmente: muchos propietarios la requieren actualizada"],
    close: "El proceso real de obtener un ESA requiere trabajo genuino: terapia real, diagn\xF3stico real, profesional real. Pero si cumples los criterios, los beneficios en vivienda son significativos y completamente legales."
  },
  {
    id: 20,
    cat: "viaje",
    emoji: "\u2708\uFE0F",
    color: "#E86535",
    title: "Viajar con tu perro: vuelos, hoteles y fronteras",
    sub: "La gu\xEDa completa para no estresarte (ni estresarlo) en el camino",
    date: "Abril 2025",
    read: 7,
    tags: ["viaje", "vuelo", "hotel", "documentos"],
    lead: "Viajar con un perro es completamente posible y millones lo hacen. Pero requiere planificaci\xF3n real: documentos, aerol\xEDneas con pol\xEDticas espec\xEDficas, hoteles verificados y preparaci\xF3n del animal. El caos en viajes con mascotas casi siempre es falta de investigaci\xF3n previa.",
    body: [
      { h: "Vuelos dentro de USA", p: "La mayor\xEDa de aerol\xEDneas permiten perros peque\xF1os (bajo 20 lbs en transportadora) en cabina por $95-$150 por trayecto. American, Delta y United tienen pol\xEDticas similares. Reserva el espacio con anticipaci\xF3n: hay cupo limitado de mascotas por vuelo. Para perros grandes: solo en bodega o como cargo, lo que no se recomienda para braquic\xE9falos." },
      { h: "Documentaci\xF3n necesaria", p: "Para vuelos dom\xE9sticos en USA: certificado de salud emitido por vet en los \xFAltimos 10 d\xEDas y registro de vacuna antirr\xE1bica. Para viajes internacionales: microchip ISO est\xE1ndar, salud rabies-free seg\xFAn destino, y certificados USDA apostillados. Europa requiere tr\xE1mites con meses de anticipaci\xF3n." },
      { h: "Hoteles y alojamiento", p: "Kimpton Hotels (todas sus propiedades), La Quinta, Loews y Marriott Element son las cadenas m\xE1s pet-friendly en USA. Bring Fido y BringFido.com tienen el directorio m\xE1s completo. Llama siempre para confirmar la pol\xEDtica actual: las restricciones de tama\xF1o y raza cambian." },
      { h: "Preparaci\xF3n del perro", p: "Semanas antes: habit\xFAa a tu perro a la transportadora dej\xE1ndola abierta en casa. Viaje en auto frecuente si el vuelo ser\xE1 largo. El d\xEDa del viaje: ejercicio intenso en la ma\xF1ana para que viaje cansado y tranquilo. Evita sedantes sin supervisi\xF3n veterinaria: pueden ser peligrosos en vuelo." }
    ],
    stat: "Seg\xFAn la APPA, el 37% de los due\xF1os de perros en USA viajaron con su mascota en 2023, un aumento del 25% vs 2019. Los ingresos de la industria pet-travel superan los $6 billones anuales.",
    tips: ["Reserva el espacio de mascota en el vuelo al mismo tiempo que el ticket", "Microchip y collar con placa de contacto actualizados antes de viajar", "Investiga las regulaciones del destino con 3+ meses de anticipaci\xF3n para viajes internacionales", "Lleva agua y su comida habitual: cambios de dieta en viaje generan problemas digestivos"],
    close: "El viaje perfecto con un perro no se improvisa. Pero cuando la planificaci\xF3n funciona, tener a tu compa\xF1ero contigo en el destino hace que valga absolutamente cada tr\xE1mite."
  },
  {
    id: 21,
    cat: "guias",
    emoji: "\u{1F969}",
    color: "#E85D75",
    title: "Alimentaci\xF3n real para tu perro: m\xE1s all\xE1 del croquetismo",
    sub: "C\xF3mo leer etiquetas, entender prote\xEDnas y tomar decisiones informadas",
    date: "Abril 2025",
    read: 6,
    tags: ["nutrici\xF3n", "alimentaci\xF3n", "croquetas", "raw"],
    lead: "El mercado de comida para perros es de $50 billones anuales en USA solo. Hay miles de marcas, todas con marketing agresivo. La realidad: leer etiquetas correctamente y entender las necesidades b\xE1sicas de tu raza es lo \xFAnico que necesitas para tomar buenas decisiones.",
    body: [
      { h: "C\xF3mo leer una etiqueta de croquetas", p: 'Los ingredientes aparecen en orden descendente por peso. El primer ingrediente debe ser una prote\xEDna real identificada: "chicken" no "poultry by-product". Evitar: rellenos de ma\xEDz o soya como primeros ingredientes, colorantes artificiales, y saborizantes artificiales. AAFCO "complete and balanced" es la certificaci\xF3n m\xEDnima.' },
      { h: "Cu\xE1nta prote\xEDna necesita tu perro", p: "Adultos activos: 18-25% prote\xEDna m\xEDnimo. Cachorros en crecimiento: 22-32%. Senior: similar a adulto pero con ajuste cal\xF3rico. Las razas grandes de crecimiento r\xE1pido (Golden, Lab, Rottweiler) necesitan calcio y f\xF3sforo balanceados espec\xEDficamente para evitar problemas articulares." },
      { h: "BARF y raw feeding: lo que dice la ciencia", p: "La alimentaci\xF3n cruda (BARF) tiene beneficios anecd\xF3ticos reales (pelaje, digesti\xF3n) pero tambi\xE9n riesgos: salmonella, E.coli, y desbalances nutricionales si no est\xE1 formulada por un veterinario nutricionista. No es para due\xF1os novatos ni para hogares con ni\xF1os peque\xF1os o inmunodeprimidos." },
      { h: "Snacks y premios: el 10% que arruina la dieta", p: "Los snacks no deben superar el 10% de las calor\xEDas diarias. Los premios de entrenamiento deben ser peque\xF1os (tama\xF1o garbanzo). Los snacks de supermercado convencionales frecuentemente tienen az\xFAcar, sal y colorantes. Alternativas: trozos de pechuga de pollo cocida, zanahoria, ar\xE1ndanos." }
    ],
    stat: "Un estudio de la Universidad de California Davis (2019) analiz\xF3 23 dietas BARF para perros vendidas comercialmente: el 83% ten\xEDa desequilibrios nutricionales significativos seg\xFAn los est\xE1ndares NRC para caninos.",
    tips: ["Primera fuente: prote\xEDna real identificada (chicken, salmon, beef)", 'AAFCO "complete and balanced for all life stages" es el est\xE1ndar m\xEDnimo', "Cambia de marca gradualmente (7-10 d\xEDas) para evitar problemas digestivos", "Consulta con un veterinario nutricionista antes de dieta raw o casera"],
    close: "No necesitas la croqueta m\xE1s cara del mercado. Necesitas una croqueta con prote\xEDna real como primer ingrediente, certificaci\xF3n AAFCO y porciones ajustadas al peso y actividad de tu perro."
  },
  {
    id: 22,
    cat: "guias",
    emoji: "\u{1F423}",
    color: "#F58220",
    title: "La primera semana con un cachorro: lo que nadie te cuenta",
    sub: "Supervivencia, realismo y las cosas que s\xED funcionan",
    date: "Marzo 2025",
    read: 6,
    tags: ["cachorro", "primera semana", "preparaci\xF3n"],
    lead: "Nadie te dice que la primera semana con un cachorro es agotadora, confusa y a veces hace que te preguntes por qu\xE9 lo hiciste. Tambi\xE9n es una de las experiencias m\xE1s intensamente bonitas de la vida. Aqu\xED va la gu\xEDa sin filtros.",
    body: [
      { h: "La noche uno: el llorido", p: "El cachorro llora la primera noche (y posiblemente las siguientes tres). Viene de estar con su madre y hermanos. Opciones: caja/crate cerca de tu cama con tu camiseta usada dentro, reloj de tic-tac envuelto en tela (simula latido), o admitir derrota y ponerlo en tu cama (luego es dif\xEDcil sacarlo)." },
      { h: "Las primeras 48 horas: observaci\xF3n m\xE1xima", p: "Monitorea comida, agua, orina y deposici\xF3n. Cachorros sanos comen con entusiasmo, orinan frecuentemente y hacen una deposici\xF3n s\xF3lida al d\xEDa. V\xF3mito repetido, letargia extrema o diarrea persistente: veterinario sin esperar." },
      { h: "El crate no es una c\xE1rcel", p: "El crate training es la herramienta m\xE1s \xFAtil para los primeros meses. Introduce el crate como un refugio: comida dentro, juguetes dentro, nunca como castigo. Un cachorro en crate bien entrenado duerme tranquilo, viaja sin estr\xE9s y raramente tiene accidentes nocturnos." },
      { h: "Las primeras semanas de adiestramiento", p: 'Sienta, quieto, ven y "nada" (no toques eso): estos cuatro comandos son el fundamento. Sesiones de 5 minutos m\xE1ximo, 3 veces al d\xEDa. La atenci\xF3n de un cachorro es m\xEDnima. El refuerzo positivo con premios funciona mejor que cualquier otra t\xE9cnica.' }
    ],
    stat: "Los primeros 16 semanas de vida son el per\xEDodo cr\xEDtico de socializaci\xF3n canina. Lo que el cachorro experimenta (personas, sonidos, animales, superficies) en esas semanas determina su temperamento adulto.",
    tips: ["Vet en las primeras 48 horas post-adopci\xF3n para chequeo inicial", "Retira del suelo todo lo que no quieres que mastique", "Horario de comida fijo = horario de necesidades fijo (facilita el entrenamiento de ba\xF1o)", "Nombra al cachorro desde el d\xEDa uno y \xFAsalo siempre en tono positivo"],
    close: "La primera semana es dura. La primera mes mejora. A los tres meses tienes un compa\xF1ero real. La inversi\xF3n de tiempo en esas primeras semanas da dividendos por 12-15 a\xF1os."
  },
  {
    id: 23,
    cat: "guias",
    emoji: "\u{1F30D}",
    color: "#1EB87A",
    title: "Socializaci\xF3n canina: el error que comete el 90% de los due\xF1os",
    sub: "La ventana de tiempo que no puedes volver a abrir",
    date: "Marzo 2025",
    read: 5,
    tags: ["socializaci\xF3n", "cachorro", "comportamiento"],
    lead: 'Hay una ventana en la vida de un cachorro entre las 3 y las 16 semanas donde todo lo que experimenta queda grabado como "normal y seguro". Despu\xE9s de esa ventana, lo nuevo genera desconfianza. Lo que hagas (o no hagas) en ese per\xEDodo define al perro adulto.',
    body: [
      { h: "Qu\xE9 significa socializar correctamente", p: 'No es solo "que conozca otros perros". Es exposici\xF3n controlada y positiva a: personas de diferentes edades, razas y apariencias; ni\xF1os; sonidos (truenos, motos, aspiradoras); superficies (c\xE9sped, baldosa, arena, rejillas); veh\xEDculos; situaciones de ciudad. Cada experiencia positiva es una inversi\xF3n.' },
      { h: "El error m\xE1s com\xFAn: esperar a las vacunas", p: 'Muchos veterinarios tradicionales dicen "no lo saques hasta terminar el esquema de vacunas" (que termina a las 16 semanas). El problema: eso cierra la ventana de socializaci\xF3n. La American Veterinary Society of Animal Behavior recomienda socializaci\xF3n antes de las 16 semanas en entornos controlados de bajo riesgo.' },
      { h: "Socializaci\xF3n vs. exposici\xF3n traum\xE1tica", p: "La calidad importa m\xE1s que la cantidad. Un cachorro asustado ante algo nuevo que no puede escapar = experiencia traum\xE1tica. La regla: siempre que pueda retirarse, siempre que sea su elecci\xF3n acercarse, siempre con refuerzo positivo. Forzar el contacto hace el da\xF1o opuesto." },
      { h: "Los signos de un perro mal socializado", p: "Miedo a extra\xF1os, agresividad reactiva al correa, terror a sonidos espec\xEDficos, incapacidad de estar en espacios p\xFAblicos tranquilo. Estos no son problemas de raza: son problemas de historia temprana. La desensibilizaci\xF3n adulta es posible pero mucho m\xE1s lenta." }
    ],
    stat: "El Dr. Ian Dunbar, pionero en adiestramiento moderno, estima que la falta de socializaci\xF3n adecuada es la causa n\xFAmero 1 de eutanasia de perros adultos por problemas de comportamiento en USA.",
    tips: ["Lista de socializaci\xF3n: 100 experiencias antes de las 16 semanas", "Clases de cachorros (puppy classes) con vet supervisi\xF3n: la mejor inversi\xF3n", "Presentaci\xF3n a ni\xF1os: siempre supervisada, siempre con permiso del ni\xF1o", "Paseos en brazos antes de completar vacunas: expone sin riesgo sanitario"],
    close: "No hay segunda oportunidad para la socializaci\xF3n temprana. Pero hay esperanza: la desensibilizaci\xF3n sistem\xE1tica con un entrenador profesional puede mejorar significativamente a perros adultos reactivos."
  },
  // ── FAMILIA ──────────────────────────────────────────────────────────────
  {
    id: 24,
    cat: "familia",
    emoji: "\u{1F9EC}",
    color: "#E85D75",
    title: "Por qu\xE9 los millennials prefieren perros (los datos lo confirman)",
    sub: "La generaci\xF3n que redefini\xF3 qu\xE9 significa tener familia",
    date: "Mayo 2025",
    read: 5,
    tags: ["millennials", "tendencia", "datos", "pet parents"],
    lead: "En USA, los millennials son la generaci\xF3n que m\xE1s gasta en mascotas, que m\xE1s los incluye en decisiones de vida (d\xF3nde vivir, con qui\xE9n salir) y que m\xE1s demora tener hijos. No es coincidencia: es un cambio generacional profundo en c\xF3mo definimos familia.",
    body: [
      { h: "Los n\xFAmeros", p: "Los millennials (nacidos 1981-1996) representan el 32% del mercado de mascotas en USA, la porci\xF3n m\xE1s grande de cualquier generaci\xF3n. Gastan un promedio de $1,800 por a\xF1o por mascota. El 76% considera a su perro un miembro de la familia, no una mascota." },
      { h: "Los perros como sustituto (y no)", p: 'Los medios hablan de "fur babies" como sustituto de hijos. La realidad es m\xE1s compleja: muchos millennials que tienen hijos tambi\xE9n tienen perros. La elecci\xF3n no es necesariamente en lugar de familia, sino en adici\xF3n a, o antes que. Los altos costos de vivienda y la deuda estudiantil retrasan la paternidad, y los perros llenan parte del espacio afectivo.' },
      { h: "El mercado que crearon", p: "La demanda millennial explica el boom de: comida premium para mascotas, ropa y accesorios, seguros veterinarios, servicios de pet-sitting, redes sociales para perros, y dog-friendly businesses. Si un negocio acepta perros, los millennials lo prefieren." },
      { h: "La relaci\xF3n que construyeron", p: 'La generaci\xF3n anterior pon\xEDa al perro "afuera". Los millennials los llevan a todas partes: trabajo, viajes, cenas. Esta integraci\xF3n total del perro a la vida humana es genuinamente nueva y est\xE1 redefiniendo la industria veterinaria, los espacios urbanos y la arquitectura residencial.' }
    ],
    stat: "El 48% de los millennials sin hijos en USA tiene una mascota. El 24% dice que el costo del cuidado de mascotas es una raz\xF3n para retrasar tener hijos, seg\xFAn un estudio de Rover.com (2023).",
    tips: [],
    close: 'Sea "sustituto" o "adici\xF3n", la generaci\xF3n millennial redefini\xF3 la relaci\xF3n humano-perro para siempre. Y el mercado, la cultura y la ciencia del bienestar animal los siguen.'
  },
  // ── HISTORIAS ────────────────────────────────────────────────────────────
  {
    id: 25,
    cat: "historias",
    emoji: "\u{1F1EF}\u{1F1F5}",
    color: "#1E90FF",
    title: "Hachiko: la historia real del amor m\xE1s leal del mundo",
    sub: "El Akita que esper\xF3 9 a\xF1os. Los hechos que la pel\xEDcula no mostr\xF3.",
    date: "Mayo 2025",
    read: 5,
    tags: ["Hachiko", "Jap\xF3n", "historia", "lealtad"],
    lead: "La historia de Hachiko es real. Un Akita japon\xE9s que esper\xF3 a su due\xF1o en la estaci\xF3n de Shibuya durante 9 a\xF1os despu\xE9s de su muerte. Pero hay detalles de la historia real que la pel\xEDcula de 2009 con Richard Gere no mostr\xF3.",
    body: [
      { h: "Los hechos reales", p: "Hidesabur\u014D Ueno, profesor de la Universidad Imperial de Tokio, adopt\xF3 a Hachiko en 1924. Cada d\xEDa el perro lo acompa\xF1aba a la estaci\xF3n de Shibuya y lo esperaba a su regreso. En mayo de 1925, Ueno muri\xF3 de un derrame cerebral mientras daba clases. Ten\xEDa 53 a\xF1os. Hachiko continu\xF3 apareciendo en la estaci\xF3n cada tarde durante los siguientes 9 a\xF1os, 9 meses y 15 d\xEDas." },
      { h: "La vida real del perro que esperaba", p: "Hachiko no viv\xEDa solo en la estaci\xF3n: fue adoptado por un ex-empleado de Ueno, Kikuzabur\u014D Kobayashi. Los vendedores y empleados de la estaci\xF3n lo alimentaban y cuidaban. Se convirti\xF3 en celebridad nacional cuando un periodista public\xF3 su historia en 1932. Turistas hac\xEDan viajes especiales a Shibuya para verlo." },
      { h: "La estatua y el legado", p: "La primera estatua de Hachiko se inaugur\xF3 en 1934, un a\xF1o antes de su muerte, mientras el perro a\xFAn viv\xEDa. Hachiko estuvo presente en la inauguraci\xF3n. La estatua fue fundida durante la Segunda Guerra Mundial para uso b\xE9lico. La actual data de 1948 y es uno de los puntos de encuentro m\xE1s famosos de Tokio." },
      { h: "El significado cultural", p: "En Jap\xF3n, Hachiko es s\xEDmbolo nacional de lealtad (ch\u016Bgi). Su historia se ense\xF1a en escuelas primarias. Su cuerpo est\xE1 preservado en el Museo Nacional de Ciencias de Tokio. La Universidad de Tokio tiene una estatua suya junto a la de Ueno en el campus de Ueno." }
    ],
    stat: "Hachiko naci\xF3 el 10 de noviembre de 1923 y muri\xF3 el 8 de marzo de 1935. Ten\xEDa 11 a\xF1os. Las pruebas post-mortem mostraron c\xE1ncer de pulm\xF3n avanzado y una infestaci\xF3n de filarias. Muri\xF3 en la misma calle donde sol\xEDa esperar.",
    tips: [],
    close: "Hachiko no entend\xEDa la muerte. Solo entend\xEDa que Ueno llegaba por esa v\xEDa cada tarde y \xE9l deb\xEDa estar ah\xED. Esa simplicidad de prop\xF3sito es, quiz\xE1s, lo que lo hizo tan profundamente humano."
  },
  {
    id: 26,
    cat: "historias",
    emoji: "\u{1F3C1}",
    color: "#E86535",
    title: "Arthur: el perro que se uni\xF3 a una carrera de aventura en Ecuador",
    sub: "La historia real del perro callejero que se gan\xF3 un hogar cruzando 500 km",
    date: "Abril 2025",
    read: 5,
    tags: ["Arthur", "Ecuador", "adopci\xF3n", "aventura"],
    lead: "En 2014, durante una carrera de aventura de 430 km en Ecuador, un perro callejero comenz\xF3 a seguir al equipo sueco Peak Performance. Lo sigui\xF3 durante d\xEDas, cruz\xF3 r\xEDos, monta\xF1as y selva. Al final, el capit\xE1n del equipo lo adopt\xF3 y lo llev\xF3 a Suecia.",
    body: [
      { h: "La carrera", p: "La Adventure Racing World Championship en Ecuador es una de las carreras m\xE1s duras del mundo: equipos de 4 personas corren durante d\xEDas sin parar a trav\xE9s de terrenos salvajes. El equipo Peak Performance estaba en el kil\xF3metro 140 cuando el perro apareci\xF3, atra\xEDdo por un trozo de meatball que el capit\xE1n Mikael Lindnord le ofreci\xF3." },
      { h: "El perro que no se fue", p: "Nadie esperaba que Arthur siguiera. Los perros callejeros aparecen y desaparecen. Pero Arthur sigui\xF3 durante d\xEDas completos, cruzando un r\xEDo de corriente fuerte donde los corredores tuvieron que jalarlo dentro de la barca porque no pod\xEDa cruzar solo. Eso fue el momento en que Lindnord decidi\xF3 llev\xE1rselo." },
      { h: "Los tr\xE1mites que nadie esperaba", p: "Al final de la carrera, conseguir los permisos para sacar a Arthur de Ecuador y llevarlo a Suecia tom\xF3 semanas. Un vet local, cuarentena, documentaci\xF3n, vacunas. El equipo atras\xF3 su vuelo de regreso. Cuando finalmente Arthur lleg\xF3 a Suecia, sali\xF3 a recibirlo como a un miembro m\xE1s de la familia." },
      { h: "El legado de la historia", p: 'Mikael Lindnord escribi\xF3 el libro "Arthur: The Dog Who Crossed the Jungle to Find a Home". La organizaci\xF3n Arthur Foundation que crearon ha facilitado la adopci\xF3n de m\xE1s de 200 perros callejeros latinoamericanos en hogares europeos.' }
    ],
    stat: "Arthur lleg\xF3 a Suecia el 3 de enero de 2015. Vivi\xF3 con la familia Lindnord hasta su muerte en 2020 a los aproximadamente 10 a\xF1os. Su historia fue publicada en 28 pa\xEDses.",
    tips: [],
    close: "Arthur no corri\xF3 500 km por disciplina ni por entrenamiento. Lo hizo porque un humano le ofreci\xF3 comida con gentileza en el momento exacto. A veces as\xED empieza el amor m\xE1s importante."
  },
  {
    id: 27,
    cat: "historias",
    emoji: "\u{1F687}",
    color: "#7C3AED",
    title: "Amsterdam: la ciudad m\xE1s dog-friendly del mundo",
    sub: "Por qu\xE9 los perros viajan gratis en metro y van a los restaurantes",
    date: "Abril 2025",
    read: 4,
    tags: ["Amsterdam", "Europa", "dog-friendly", "ciudad"],
    lead: "Amsterdam tiene m\xE1s bicicletas que personas y m\xE1s perros por capita que cualquier ciudad europea comparable. Los perros viajan gratis en el transporte p\xFAblico, entran a la mayor\xEDa de tiendas y son bienvenidos en caf\xE9s y restaurantes. No es accidente: es pol\xEDtica p\xFAblica y cultura.",
    body: [
      { h: "Los n\xFAmeros de la ciudad", p: "Amsterdam tiene una poblaci\xF3n humana de 900,000 personas y se estiman 200,000 perros registrados. Eso es un perro por cada 4.5 personas, una de las densidades m\xE1s altas de Europa. Los impuestos de tenencia de perros fueron abolidos en 2016, simplificando la regularizaci\xF3n de mascotas." },
      { h: "El transporte p\xFAblico: gratis para perros", p: "Los perros peque\xF1os en transportadora viajan gratis en el GVB (metro y tranv\xEDa de Amsterdam). Los perros grandes necesitan un ticket reducido. No hay restricci\xF3n de horario ni de razas. La cultura del transporte canino est\xE1 tan normalizada que ver un pastor alem\xE1n en el metro no hace girar ni una cabeza." },
      { h: "La infraestructura canina", p: 'La ciudad tiene m\xE1s de 200 parques y \xE1reas oficialmente designadas para perros sin correa. Los "hondenuitlaatstrookjes" (literalmente "tiras de paseo de perros") son franjas de jardines en las aceras designadas para que los perros hagan sus necesidades, con dispensadores de bolsas. La multa por no recoger es de \u20AC140.' },
      { h: "La cultura detr\xE1s de la pol\xEDtica", p: "Holanda tiene una relaci\xF3n hist\xF3rica profunda con los animales. Es el primer pa\xEDs en el mundo en no tener perros callejeros (seg\xFAn datos de 2016): no por sacrificio masivo sino por esterilizaci\xF3n, educaci\xF3n y programas de adopci\xF3n. El modelo se estudia internacionalmente." }
    ],
    stat: "Holanda fue el primer pa\xEDs del mundo en eliminar los perros callejeros sin recurrir a la eutanasia masiva. El programa nacional de esterilizaci\xF3n y adopci\xF3n tard\xF3 30 a\xF1os en lograr el resultado.",
    tips: [],
    close: 'Lo que hace a Amsterdam ejemplar no es solo que sea "simp\xE1tica con perros". Es que construy\xF3 una infraestructura, una pol\xEDtica y una cultura donde la tenencia responsable de animales es la norma, no la excepci\xF3n.'
  },
  {
    id: 28,
    cat: "historias",
    emoji: "\u{1F3E0}",
    color: "#1EB87A",
    title: "La pandemia que nos dio perros: una generaci\xF3n de adoptantes",
    sub: "C\xF3mo el COVID-19 cambi\xF3 para siempre la relaci\xF3n humano-perro",
    date: "Marzo 2025",
    read: 5,
    tags: ["pandemia", "adopci\xF3n", "COVID", "salud mental"],
    lead: "En 2020 y 2021, los refugios de animales de USA y Europa vaciaron sus instalaciones por primera vez en d\xE9cadas. La pandemia cre\xF3 la mayor ola de adopciones de mascotas de la historia moderna. Tambi\xE9n cre\xF3 una crisis post-pand\xE9mica que pocos anticiparon.",
    body: [
      { h: "La ola de adopciones", p: "Entre marzo y diciembre de 2020, los refugios de USA reportaron un aumento promedio del 34% en adopciones. En ciudades como Nueva York, Los \xC1ngeles y Miami, los tiempos de espera para adoptar alcanzaron semanas. Muchos refugios reportaron cero disponibilidad por primera vez." },
      { h: "Por qu\xE9 adoptamos", p: "Cuarentena + soledad + trabajo desde casa = contexto perfecto para un perro. De repente ten\xEDamos tiempo, est\xE1bamos en casa todo el d\xEDa y necesit\xE1bamos compa\xF1\xEDa. Los perros ofrec\xEDan rutina, contacto f\xEDsico y presencia cuando todo lo dem\xE1s era incertidumbre." },
      { h: "La crisis post-pand\xE9mica", p: 'Cuando la pandemia termin\xF3 y la gente volvi\xF3 a las oficinas, los refugios comenzaron a recibir "devoluciones" masivas. Perros adoptados sin preparaci\xF3n adecuada, por impulso, que ahora no encajaban en la vida post-cuarentena. Fue la cara oscura de la ola de adopciones.' },
      { h: "El legado permanente", p: "A pesar de las devoluciones, el efecto neto fue positivo: millones de perros encontraron hogares que no habr\xEDan encontrado sin la pandemia. Y para los due\xF1os que mantuvieron su compromiso, el v\xEDnculo creado durante meses de encierro fue inusualmente profundo." }
    ],
    stat: "La ASPCA estima que entre 2020 y 2021 se adoptaron o acogieron temporalmente 23 millones de animales en USA. El 90% de esos due\xF1os reportan que mantuvieron a sus mascotas post-pandemia.",
    tips: [],
    close: "La pandemia nos forz\xF3 a desacelerar y muchos de nosotros encontramos en un perro la compa\xF1\xEDa que la velocidad normal de la vida no dejaba espacio para buscar. Para ellos y para nosotros, fue una segunda oportunidad."
  },
  {
    id: 29,
    cat: "historias",
    emoji: "\u{1F30F}",
    color: "#1E90FF",
    title: "Los pueblos de Jap\xF3n gobernados por perros (y gatos)",
    sub: "La historia detr\xE1s de los alcaldes caninos m\xE1s adorables del mundo",
    date: "Marzo 2025",
    read: 4,
    tags: ["Jap\xF3n", "alcalde", "viral", "historia"],
    lead: 'En Jap\xF3n existen varias ciudades y pueblos que han "elegido" alcaldes caninos y felinos. No es una broma: son estrategias oficiales de revitalizaci\xF3n tur\xEDstica y econ\xF3mica que han resultado extraordinariamente exitosas.',
    body: [
      { h: "Ozu y su alcalde canino", p: 'La ciudad de Ozu en la prefectura de Ehime design\xF3 a Rao, un Shiba Inu de 7 a\xF1os, como "alcalde honorario" en 2018. El objetivo era atraer turismo. El resultado: las visitas a la ciudad aumentaron un 300% en el primer a\xF1o. Rao tiene m\xE1s seguidores en Instagram que el alcalde humano.' },
      { h: "Tama: la gata alcaldesa que salv\xF3 un tren", p: 'La historia m\xE1s famosa es Tama, una gata calic\xF3 que fue nombrada "jefe de estaci\xF3n" de la estaci\xF3n Kishi en 2007. La l\xEDnea ferroviaria estaba a punto de cerrar por p\xE9rdidas. El turismo generado por Tama salv\xF3 la l\xEDnea. Se estima que gener\xF3 1.1 billones de yenes en la econom\xEDa local.' },
      { h: "Por qu\xE9 funciona", p: "Jap\xF3n tiene un problema de despoblaci\xF3n rural severo: los pueblos peque\xF1os pierden residentes j\xF3venes a las ciudades. Las mascotas-alcalde son estrategias de marketing territorial que usan la viralidad de las redes sociales y el amor cultural japon\xE9s por los animales para atraer visitantes." },
      { h: "El modelo se exporta", p: "Inspirados por Jap\xF3n, ciudades en UK, USA y Australia han designado alcaldes caninos. Cormorant, Minnesota, tiene a Duke el Gran Dan\xE9s como alcalde (reelecto 4 veces). Rabbit Hash, Kentucky, elige alcaldes caninos desde 1998 y ha recaudado miles de d\xF3lares para la comunidad." }
    ],
    stat: "Duke el Gran Dan\xE9s, alcalde de Cormorant Township, Minnesota, fue reelecto por cuarta vez en 2022 con el 100% de los votos. La boleta de votaci\xF3n costaba $1 donado a causas locales.",
    tips: [],
    close: "Hay algo genuinamente hermoso en que comunidades humanas, ante sus problemas m\xE1s complejos, hayan encontrado en un perro o un gato no solo una soluci\xF3n econ\xF3mica sino tambi\xE9n un s\xEDmbolo de esperanza."
  },
  {
    id: 30,
    cat: "historias",
    emoji: "\u{1F3E5}",
    color: "#E85D75",
    title: "La ciencia de los perros de terapia en hospitales",
    sub: "C\xF3mo los animales aceleran la recuperaci\xF3n de pacientes reales",
    date: "Febrero 2025",
    read: 5,
    tags: ["terapia", "hospital", "ciencia", "salud"],
    lead: "Los perros de terapia ya son presencia regular en hospitales, residencias de ancianos y centros oncol\xF3gicos de USA y Europa. No es sentimental: hay d\xE9cadas de investigaci\xF3n mostrando efectos medibles en dolor, ansiedad y recuperaci\xF3n.",
    body: [
      { h: "Los datos que convencieron a los hospitales", p: "Un estudio del Loyola University Medical Center encontr\xF3 que pacientes que recibieron visitas de perros de terapia necesitaron significativamente menos analg\xE9sicos post-cirug\xEDa. La interacci\xF3n canina aumenta endorfinas y reduce la percepci\xF3n del dolor sin efectos secundarios." },
      { h: "Oncolog\xEDa y pediatr\xEDa: los usos m\xE1s documentados", p: "En oncolog\xEDa, los perros de terapia reducen la ansiedad pre-quimioterapia y mejoran el humor general durante el tratamiento. En pediatr\xEDa, los ni\xF1os hospitalizados con acceso a terapia canina muestran menor presi\xF3n arterial, mayor cooperaci\xF3n con procedimientos m\xE9dicos y menor estr\xE9s parental." },
      { h: "C\xF3mo se certifican", p: "En USA, los perros de terapia son certificados por organizaciones como Pet Partners o Therapy Dogs International. Requieren evaluaci\xF3n de temperamento, entrenamiento b\xE1sico obediencia, vacunas al d\xEDa y un examen de aptitud para entornos m\xE9dicos. No cualquier perro puede ser perro de terapia." },
      { h: "La diferencia con ESA y perros de servicio", p: "Perro de terapia: trabaja en instituciones, no tiene derechos de acceso p\xFAblico, no tiene due\xF1o-usuario espec\xEDfico. Perro de servicio: entrenado para tarea espec\xEDfica, acceso garantizado por ADA, pertenece a persona con discapacidad. ESA: apoyo emocional para due\xF1o espec\xEDfico, sin entrenamiento especializado." }
    ],
    stat: "El 20% de los hospitales en USA tienen programas activos de terapia asistida con animales seg\xFAn la American Hospital Association. En 2015 era el 5%. El crecimiento refleja la evidencia acumulada.",
    tips: [],
    close: "La medicina convencional tard\xF3 d\xE9cadas en reconocer lo que muchos pacientes sab\xEDan intuitivamente: la presencia de un animal en momentos de dolor o miedo cambia algo fundamental en c\xF3mo experimentamos esa dificultad."
  },
  {
    id: 31,
    cat: "historias",
    emoji: "\u{1F31F}",
    color: "#F58220",
    title: "El refugio de Texas que adopt\xF3 1,000 perros en un a\xF1o",
    sub: "C\xF3mo Operation Kindness redefini\xF3 el modelo de refugio animal",
    date: "Febrero 2025",
    read: 4,
    tags: ["refugio", "adopci\xF3n", "Texas", "no kill"],
    lead: 'Operation Kindness en Dallas, Texas, es uno de los refugios de animales m\xE1s antiguos y exitosos de USA. Fundado en 1971, fue pionero del movimiento "no-kill" d\xE9cadas antes de que se pusiera de moda. Su modelo ha influenciado refugios en todo el mundo.',
    body: [
      { h: "El modelo no-kill: qu\xE9 significa realmente", p: '"No-kill" no significa que nunca eutanasian: significa que la eutanasia es solo por enfermedad terminal o comportamiento que representa peligro real. La meta es una tasa de salida viva superior al 90%. Operation Kindness consistentemente supera el 95%.' },
      { h: "C\xF3mo logran las cifras", p: 'Programa de foster activo (animales en hogares temporales en lugar de jaulas), marketing agresivo de adopciones, eventos de "feria de adopci\xF3n" frecuentes, asociaciones con empresas locales, y un programa de medicina veterinaria de bajo costo que reduce devoluciones por costos m\xE9dicos.' },
      { h: "El rol de la comunidad", p: "Operation Kindness tiene m\xE1s de 400 voluntarios activos y una red de 200+ familias de foster. Sus eventos de adopci\xF3n no son solo en el refugio: llevan animales a breweries, parques y eventos comunitarios. La adopci\xF3n va a donde est\xE1 la gente." },
      { h: "El impacto medido", p: "En 2023, Operation Kindness facilit\xF3 4,847 adopciones, 1,563 programas de foster y recoloc\xF3 412 animales con otras organizaciones. Su presupuesto anual de $8 millones es financiado 100% por donaciones privadas sin apoyo gubernamental." }
    ],
    stat: "Desde su fundaci\xF3n en 1971, Operation Kindness ha salvado y encontrado hogares para m\xE1s de 175,000 animales en el norte de Texas, convirti\xE9ndose en modelo de referencia para refugios en USA y Latinoam\xE9rica.",
    tips: [],
    close: 'El modelo de Operation Kindness demuestra que "no-kill" no es ideolog\xEDa: es operaci\xF3n eficiente, comunidad comprometida y marketing inteligente. Es replicable. Y en muchas ciudades de USA y el mundo, est\xE1 siendo replicado.'
  },
  // ── VIAJE ────────────────────────────────────────────────────────────────
  {
    id: 32,
    cat: "viaje",
    emoji: "\u{1F334}",
    color: "#1EB87A",
    title: "Los mejores parques dog-friendly de Miami y sus alrededores",
    sub: "Gu\xEDa real para pasear, soltar y socializar en el sur de Florida",
    date: "Mayo 2025",
    read: 5,
    tags: ["Miami", "Florida", "parques", "dog-friendly"],
    lead: "Miami no es la ciudad m\xE1s dog-friendly de USA, pero tiene una escena canina s\xF3lida con varios parques de calidad, playas que permiten perros y una comunidad activa de due\xF1os. Esta es la gu\xEDa real, no la lista de Google.",
    body: [
      { h: "Amelia Earhart Dog Park (Hialeah)", p: "El parque de perros m\xE1s grande del \xE1rea metro con m\xE1s de 5 acres. Tiene \xE1reas separadas para perros grandes y peque\xF1os, agua disponible, sombra real (algo raro en Miami) y buena comunidad de regulares. Abierto de 7am a 7pm." },
      { h: "Bayfront Dog Park (Miami Beach)", p: "Vistas al bay, suelo de pasto y concreto, bien mantenido. Congestionado en fines de semana desde las 8am. Mejor ir entre semana en horas de ma\xF1ana. Parking limitado en la zona; ir en bicicleta si puedes." },
      { h: "Dog Beach en Fort Lauderdale", p: "Una de las pocas playas del sur de Florida donde los perros pueden estar sin correa. Fort Lauderdale Dog Beach (Sunrise Boulevard) tiene acceso directo al oc\xE9ano. Agua, arena, olas. El sue\xF1o de cualquier perro. Ir temprano en la ma\xF1ana antes del calor." },
      { h: "Tropical Park Dog Run (Miami)", p: "Dentro del Tropical Park, tiene \xE1reas separadas, bebederos y buena sombra. Es parte de un parque m\xE1s grande con lago, pistas de atletismo y \xE1reas de picnic. Ideal para due\xF1os que tambi\xE9n quieren actividad propia." }
    ],
    stat: "Miami-Dade County tiene 18 dog parks oficiales distribuidos en sus municipios. El n\xFAmero creci\xF3 un 40% entre 2018 y 2024 en respuesta a la presi\xF3n de organizaciones de due\xF1os de mascotas.",
    tips: ["Lleva siempre agua propia: los bebederos de parques fallen frecuentemente", "Vacunas al d\xEDa: bordetella (tos de perreras) especialmente importante en parques", "Ir entre semana ma\xF1ana temprano: mejor socializaci\xF3n, menos caos", "Perros en calor (celo) no deben entrar a parques de acceso libre"],
    close: "La escena dog-friendly de Miami sigue creciendo. Restaurantes con terraza pet-friendly, hoteles que aceptan mascotas y eventos caninos mensuales hacen del sur de Florida un lugar cada vez m\xE1s compatible con la vida con perros."
  },
  {
    id: 33,
    cat: "viaje",
    emoji: "\u{1F6CE}\uFE0F",
    color: "#7C3AED",
    title: "Hoteles y restaurantes pet-friendly en USA: c\xF3mo encontrarlos (de verdad)",
    sub: 'M\xE1s all\xE1 del cartel "We love pets": lo que realmente necesitas saber',
    date: "Abril 2025",
    read: 4,
    tags: ["hotel", "restaurante", "pet-friendly", "viaje"],
    lead: 'Muchos hoteles dicen ser "pet-friendly" pero tienen restricciones de tama\xF1o (under 20 lbs), razas prohibidas, dep\xF3sitos altos y pol\xEDticas que hacen el viaje m\xE1s estresante que sin perro. Esta es la gu\xEDa para encontrar los que genuinamente lo son.',
    body: [
      { h: "Las cadenas que s\xED cumplen", p: "Kimpton Hotels es el est\xE1ndar oro: sin restricciones de tama\xF1o ni raza, sin cargo adicional, con amenities caninas (cama, plato, juguete) en muchas propiedades. La Quinta permite mascotas sin cargo en casi todas sus propiedades. Loews Hotels es consistentemente pet-friendly con verdadera infraestructura canina." },
      { h: "C\xF3mo verificar antes de reservar", p: "Siempre llama directamente al hotel (no reserves por app sin confirmar). Pregunta: \xBFhay restricci\xF3n de peso?, \xBFhay razas prohibidas?, \xBFcu\xE1nto es el dep\xF3sito (reembolsable o no)?, \xBFpuede quedar solo en la habitaci\xF3n?. Las respuestas definen si la estad\xEDa es viable." },
      { h: "Restaurantes: la ley de USA", p: "En USA, la salud p\xFAblica federal proh\xEDbe animales en espacios de preparaci\xF3n y consumo de alimentos. Pero los estados pueden hacer excepciones para terraza exterior. Florida, California, Texas y Nueva York tienen pol\xEDticas de terraza pet-friendly m\xE1s permisivas. Siempre preguntar antes de sentarte con el perro." },
      { h: "Recursos para encontrarlos", p: 'Bring Fido (bringfido.com) es el directorio m\xE1s completo de hoteles, restaurantes, playas y actividades pet-friendly en USA y el mundo. Pet-Friendly Hotels (petfriendlyhotels.com) permite filtrar por tama\xF1o, raza y cargo adicional. Google Maps tambi\xE9n tiene filtro de "permite mascotas" en algunos establecimientos.' }
    ],
    stat: "El 78% de los viajeros con mascotas en USA dicen que la pol\xEDtica pet-friendly de un hotel es el factor m\xE1s importante en la elecci\xF3n del alojamiento, por encima del precio, seg\xFAn Expedia (2023).",
    tips: ["Kimpton Rewards: acumula puntos y tienes la cadena m\xE1s pet-friendly de USA", "Lleva la cama de tu perro: reduce ansiedad en entorno desconocido", "Siempre confirmar por tel\xE9fono aunque la web diga pet-friendly", "Dejar propina extra en hoteles donde el perro se queda en habitaci\xF3n solo"],
    close: "Viajar con perro requiere m\xE1s planificaci\xF3n, pero los destinos y alojamientos pet-friendly genuinos est\xE1n aumentando. La demanda de la comunidad de due\xF1os de mascotas est\xE1 cambiando la industria hotelera m\xE1s r\xE1pido de lo que imaginamos."
  },
  {
    id: 34,
    cat: "guias",
    emoji: "\u{1F489}",
    color: "#2D6A4F",
    title: "Las vacunas que tu perro necesita y el calendario real",
    sub: "Sin exageraciones ni omisiones: la gu\xEDa m\xE9dica que s\xED puedes entender",
    date: "Febrero 2025",
    read: 5,
    tags: ["vacunas", "salud", "veterinario", "prevenci\xF3n"],
    lead: "El tema de vacunas genera m\xE1s confusi\xF3n entre due\xF1os de perros que casi cualquier otro. Hay vacunas obligatorias y opcionales, hay calendarios que var\xEDan por regi\xF3n y hay mucha desinformaci\xF3n circulando en redes. Aqu\xED va la gu\xEDa m\xE9dica real.",
    body: [
      { h: "Las vacunas core (obligatorias para todos)", p: "DHPP o DA2PP: la vacuna combinada contra Distemper (moquillo), Hepatitis, Parvovirus y Parainfluenza. Se aplica en serie de cachorros (6-8 semanas, 10-12 semanas, 14-16 semanas, 12-16 meses) y luego cada 3 a\xF1os. Rabia: obligatoria por ley en todos los estados de USA. Primera a las 12-16 semanas, refuerzo al a\xF1o, luego cada 1-3 a\xF1os seg\xFAn la vacuna." },
      { h: "Las vacunas no-core (seg\xFAn estilo de vida)", p: "Bordetella (tos de perreras): recomendada si va a parques, peluquer\xEDas o guarder\xEDas. Leptospirosis: si hay exposici\xF3n a agua estancada o fauna salvaje. Lyme: si vives en zona con garrapatas (noreste de USA principalmente). Influenza canina: si viaja o usa guarder\xEDas frecuentemente." },
      { h: "El debate sobre la sobre-vacunaci\xF3n", p: "Algunos veterinarios hol\xEDsticos argumentan que vacunar anualmente es excesivo. La evidencia cient\xEDfica actual (WSAVA guidelines) respalda el sistema de vacunas core cada 3 a\xF1os para adultos, no anuales. Lo que s\xED es anual: la revisi\xF3n veterinaria y las vacunas no-core seg\xFAn exposici\xF3n." },
      { h: "T\xEDtulos de anticuerpos: la alternativa", p: "Para perros que han completado el esquema b\xE1sico, se puede hacer un titer test: an\xE1lisis de sangre que mide si el perro tiene anticuerpos suficientes contra distemper y parvovirus. Si los niveles son adecuados, no necesita revacunar ese a\xF1o. Es m\xE1s caro que la vacuna pero da informaci\xF3n real." }
    ],
    stat: "El parvovirus canino tiene una tasa de mortalidad del 91% en cachorros no vacunados. Con vacunaci\xF3n completa y tratamiento oportuno, la supervivencia supera el 85%. Es el argumento m\xE1s claro para el esquema vacunal correcto.",
    tips: ["Guarda el carnet de vacunas f\xEDsico Y en foto en tu tel\xE9fono", "Rabia al d\xEDa es requerimiento legal para la mayor\xEDa de vuelos dom\xE9sticos", "Bordetella obligatoria en la mayor\xEDa de guarder\xEDas y peluquer\xEDas", "Pregunta a tu vet si el titer test es opci\xF3n antes de revacunar core"],
    close: "Las vacunas no son un negocio del veterinario: son la raz\xF3n por la que el parvovirus, que diezmaba camadas enteras en los 70, hoy es prevenible casi al 100%. Es el acto de cuidado m\xE1s b\xE1sico y eficiente que puedes hacer."
  }
];
const BLOG_CATS = ["todos", ...Object.keys(CAT_META)];
Object.assign(window, { BLOG, CAT_META, BLOG_CATS });

})();
