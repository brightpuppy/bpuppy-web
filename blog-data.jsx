// blog-data.jsx — 34 artículos BPuppy

const CAT_META = {
  razas:      { label: 'Razas',      color: '#F58220', bg: '#FFF0E0' },
  bienestar:  { label: 'Bienestar',  color: '#1EB87A', bg: '#E0F7EF' },
  familia:    { label: 'Familia',    color: '#E85D75', bg: '#FDEAF0' },
  lifestyle:  { label: 'Lifestyle',  color: '#7C3AED', bg: '#F0EAFF' },
  historias:  { label: 'Historias',  color: '#1E90FF', bg: '#E0EEFF' },
  viaje:      { label: 'Viaje',      color: '#E86535', bg: '#FDEEE8' },
  guias:      { label: 'Guías',      color: '#2D6A4F', bg: '#E0F0EA' },
};

const BLOG = [
  // ── RAZAS ───────────────────────────────────────────────────────────────
  {
    id: 1, cat: 'razas', emoji: '🐕', color: '#F58220',
    img: 'uploads/Page 10.webp',
    title: 'Golden Retriever: guía práctica para dueños reales',
    sub: 'Ejercicio, pelaje, alimentación y salud sin rodeos',
    date: 'Mayo 2025', read: 6,
    tags: ['golden retriever', 'cuidados', 'familia'],
    lead: 'El Golden Retriever no es solo el perro de los comerciales de seguros. Es una raza con necesidades concretas: ejercicio diario, cepillado constante y contacto humano real. Si entiendes eso, tendrás al mejor compañero del mundo.',
    body: [
      { h: 'Ejercicio: no negociable', p: 'Un Golden adulto necesita mínimo 60 minutos de actividad física diaria. Sin eso se aburre y lo paga en tus muebles. Dos caminatas largas o una sesión de buscar la pelota funcionan perfectamente. También son nadadores natos y adoran el agua.' },
      { h: 'El pelaje que da trabajo', p: 'Su doble capa necesita cepillado 3-4 veces por semana, diario en épocas de muda (primavera y otoño). Un guante desmallador es la mejor inversión que harás. Baño cada 6-8 semanas con shampoo neutro; más frecuente reseca la piel.' },
      { h: 'Alimentación según etapa', p: 'Cachorro: croquetas con 22-26% de proteína. Adulto: porciones controladas porque los Golden tienen predisposición al sobrepeso. Senior (7+ años): fórmula con glucosamina y condroitina para las articulaciones. Agua fresca siempre disponible.' },
      { h: 'Salud: lo que debes vigilar', p: 'Son propensos a displasia de cadera, hipotiroidismo y, tristemente, cáncer (causa número 1 de muerte en la raza). Chequeos anuales desde los 5 años y esterilización antes del primer año reducen riesgos significativamente.' },
    ],
    stat: 'El 94% de familias que adoptan un Golden Retriever repiten la experiencia. La tasa de satisfacción más alta de cualquier raza.',
    tips: ['Socializa desde cachorro: parques, personas, otros animales', 'Usa arnés en lugar de collar para proteger el cuello', 'Enséñale a "soltar" desde el primer día, es instintivo llevarlo todo en la boca', 'Revisa las orejas semanalmente, son propensos a infecciones'],
    close: 'Un Golden bien atendido vive 10-12 años felices. La clave es entender que son perros de familia, no de jardín. Necesitan estar contigo, no afuera esperando.'
  },
  {
    id: 2, cat: 'razas', emoji: '🐾', color: '#8B5CF6',
    img: 'uploads/Page 8.webp',
    title: 'French Bulldog: la verdad que nadie te dice antes de adoptarlo',
    sub: 'Salud, costos reales y cómo mantenerlo feliz',
    date: 'Mayo 2025', read: 5,
    tags: ['french bulldog', 'braquicéfalo', 'apartamento'],
    lead: 'Los Bulldogs Franceses son adorables, urbanos y perfectos para apartamentos. Pero vienen con una lista de consideraciones médicas que nadie menciona en la tienda. Aquí va la verdad completa.',
    body: [
      { h: 'El problema respiratorio que viene de serie', p: 'Son braquicéfalos: hocico corto = vías aéreas estrechas. Resuellan, roncan, y en calor extremo pueden colapsar. Nunca ejercicio intenso en verano, nunca en auto sin AC, y en días de más de 28°C máxima precaución.' },
      { h: 'Columna y articulaciones: su punto débil', p: 'La cría intensiva por su forma compacta los hace propensos a hernias discales (IVDD). Evita que salten de muebles altos, usa siempre arnés en lugar de collar, y ofréceles rampas si suben al sofá contigo.' },
      { h: 'El mantenimiento de los pliegues', p: 'Los pliegues faciales acumulan humedad y bacterias. Limpia con toallitas secas sin alcohol 2-3 veces por semana. Descuidarlos lleva a infecciones de piel dolorosas que requieren antibióticos.' },
      { h: 'El costo real', p: 'Entre veterinario frecuente, posibles cirugías de vías aéreas y dieta de calidad, el costo anual promedio en USA es $2,500-$4,000. Un seguro médico veterinario desde cachorro es casi obligatorio con esta raza.' },
    ],
    stat: 'El French Bulldog superó al Labrador como raza #1 en USA en 2022, tras 31 años de reinado del Lab. Actualmente encabeza las listas en UK, Francia y Australia.',
    tips: ['Nunca lo dejes en un auto caliente ni 5 minutos', 'Invierte en un seguro veterinario desde cachorro', 'El arnés tipo "H" es el más seguro para su estructura', 'Visita al vet antes de cualquier vuelo'],
    close: 'Nada de esto significa que no sean increíbles compañeros. Solo significa que hay que elegirlos con los ojos abiertos. Un Frenchie bien atendido es un perro genuinamente feliz.'
  },
  {
    id: 3, cat: 'razas', emoji: '🦮', color: '#1EB87A',
    img: 'fotos-razas-sm/Labrador Retriever.webp',
    title: 'Labrador Retriever: el compañero que nunca falla',
    sub: 'Por qué fue el perro más popular del mundo por 30 años',
    date: 'Abril 2025', read: 5,
    tags: ['labrador', 'familia', 'entrenamiento'],
    lead: 'Hay una razón por la que el Labrador fue el perro más popular en USA durante 31 años consecutivos. Es adaptable, alegre, fácil de entrenar y genuinamente bueno con todos. La pregunta no es si quieres uno, sino si estás listo.',
    body: [
      { h: 'Energía alta, paciencia también', p: 'Los Labs necesitan 1-2 horas de ejercicio diario hasta los 3 años. Después se tranquilizan notablemente. Son perfectos para correr, nadar y jugar fetch. Sin actividad, inventan entretenimiento propio (= destrucción doméstica).' },
      { h: 'Entrenamiento: fácil si empiezas temprano', p: 'Responden increíblemente bien al refuerzo positivo. Con 15 minutos diarios desde cachorro aprenden comandos básicos en semanas. No es casualidad que sean los perros guía, de rescate y detección más usados en el mundo.' },
      { h: 'La obsesión con la comida', p: 'El Labrador promedio comería hasta explotar si se lo permites. Controla porciones estrictamente, elimina snacks sin valor nutricional y mide las calorías. La obesidad en Labs acorta la vida 2-3 años según estudios de la Universidad de Cambridge.' },
      { h: 'Negro, amarillo o chocolate: ¿importa el color?', p: 'La personalidad no varía por color. Sin embargo, estudios recientes sugieren que los chocolates tienden a tener vida más corta (10.7 vs 12.1 años) y más problemas dermatológicos, posiblemente por la cría selectiva para el color.' },
    ],
    stat: 'El Labrador Retriever sigue siendo la raza #1 recomendada para familias con niños en 8 de cada 10 encuestas de especialistas caninos, a pesar de haber perdido el tope de registros AKC.',
    tips: ['Usa juguetes dispensadores de comida para estimulación mental', 'Enseña "nada" o "deja" desde el primer día', 'Ofrece ejercicio mental además del físico (puzzle feeders)', 'Revisión de caderas al año para detección temprana de displasia'],
    close: 'Si buscas un perro que se adapte a tu vida, que se lleve con niños, adultos mayores y otros animales, y que nunca te decepcione en lealtad, el Labrador es tu respuesta.'
  },
  {
    id: 4, cat: 'razas', emoji: '🐩', color: '#E85D75',
    img: 'uploads/Page 17.webp',
    title: 'Poodle: inteligencia, elegancia y muy poco alérgeno',
    sub: 'El perro más inteligente del mundo también es el más subestimado',
    date: 'Abril 2025', read: 5,
    tags: ['poodle', 'caniche', 'hipoalergénico'],
    lead: 'El Poodle carga con el estigma del perro de concurso de belleza. Es injusto: es considerado la segunda raza más inteligente del mundo, es activo, atlético y una de las mejores opciones para personas con alergias.',
    body: [
      { h: 'Inteligencia real, no de adorno', p: 'El Poodle entiende comandos nuevos en menos de 5 repeticiones y obedece a la primera el 95% de las veces (según el ranking de Stanley Coren). Necesitan estimulación mental constante; sin desafíos se aburren y se vuelven ansiosos.' },
      { h: '¿Realmente hipoalergénico?', p: 'Ningún perro es 100% hipoalergénico, pero los Poodles producen menos caspa y no mudan pelo de forma significativa. Para personas con alergias leves a moderadas, son una de las mejores opciones disponibles.' },
      { h: 'El pelo: mantenimiento real', p: 'Su rizado continuo crecimiento no se detiene solo. Necesitan corte profesional cada 6-8 semanas. Sin cepillado diario, el pelo se enreda y forma nudos dolorosos. El costo de grooming anual es de $600-$1,200 en promedio.' },
      { h: 'Toy, Miniatura o Estándar', p: 'El Toy (hasta 4kg) es perfecto para apartamentos pero más frágil. El Miniatura (5-9kg) es el más equilibrado. El Estándar (20-35kg) necesita más ejercicio pero tiene menos problemas de salud. Todos comparten la misma inteligencia.' },
    ],
    stat: 'En el ranking de inteligencia canina de Stanley Coren (Universidad de British Columbia), el Poodle ocupa el puesto #2, solo después del Border Collie.',
    tips: ['Inscríbelos en agility o nose work: son deportistas naturales', 'El cepillado diario de 5 minutos evita nudos costosos de deshacer', 'Son excelentes perros de terapia por su sensibilidad emocional', 'Poodle Toy: usa rampas para bajar del sofá, sus patas son delicadas'],
    close: 'Si quieres un perro que te sorprenda cada día con su capacidad de aprender, que no suelte pelo por toda la casa y que se adapte a cualquier estilo de vida, el Poodle merece una segunda mirada.'
  },
  {
    id: 5, cat: 'razas', emoji: '🐕‍🦺', color: '#F58220',
    img: 'uploads/Page 20.webp',
    title: 'Schnauzer: fiel, inteligente y siempre alerta',
    sub: 'El guardián del hogar en tamaño compacto',
    date: 'Abril 2025', read: 4,
    tags: ['schnauzer', 'miniatura', 'vigilante'],
    lead: 'El Schnauzer Miniatura es uno de los perros más populares de Latinoamérica y Miami por una buena razón: es leal, alerta, se adapta bien a apartamentos y su pelaje no muda. Pero también tiene un carácter fuerte que hay que saber manejar.',
    body: [
      { h: 'Carácter: seguro de sí mismo', p: 'El Schnauzer no es sumiso. Tiene opinión propia, ladra cuando considera que debe hacerlo y puede ser terco en el entrenamiento. El refuerzo positivo desde cachorro y la consistencia de reglas son fundamentales.' },
      { h: 'Salud: ojo con el páncreas', p: 'Son propensos a pancreatitis, especialmente si comen alimentos con alto contenido graso. Nada de embutidos, queso graso ni sobras de frituras. Dieta de calidad y porciones controladas alarga su vida notablemente.' },
      { h: 'El bigote y las cejas: grooming real', p: 'Necesitan corte profesional cada 8-10 semanas. El pelo de la cara acumula humedad tras beber agua; límpia con toallitas después de comer y beber para evitar manchas e infecciones en la zona del hocico.' },
      { h: 'Ejercicio: moderado pero consistente', p: 'No necesitan largas caminatas, pero sí actividad diaria. 30-45 minutos en dos salidas es suficiente para el Miniatura. El Estándar (35-45cm) necesita más. Son perfectos para dueños activos pero no atletas.' },
    ],
    stat: 'El Schnauzer Miniatura está en el top 20 de razas más registradas en USA y en el top 5 en Alemania, su país de origen, donde fue criado originalmente para cazar ratones.',
    tips: ['Socialización temprana es clave: pueden ser desconfiados con extraños', 'Limpia la barba después de cada comida', 'Evita dietas altas en grasa para prevenir pancreatitis', 'Son buenos en deportes de obediencia y agility'],
    close: 'Con el carácter correcto y las reglas claras desde pequeño, el Schnauzer se convierte en un compañero leal e inteligente que da la impresión de entender cada conversación.'
  },
  {
    id: 6, cat: 'razas', emoji: '🦴', color: '#1E90FF',
    img: 'uploads/Page 13.webp',
    title: 'Yorkshire Terrier: pequeño en tamaño, enorme en personalidad',
    sub: 'Cómo vivir con el perro más valiente del mundo',
    date: 'Marzo 2025', read: 4,
    tags: ['yorkshire', 'terrier', 'pequeño'],
    lead: 'El Yorkshire Terrier cree firmemente que pesa 30 kilos. Es valiente, vocal, curioso y profundamente leal a su familia. Pero tiene necesidades específicas de salud dental, cuidado del pelaje y socialización que no puedes ignorar.',
    body: [
      { h: 'Dientes: su problema más común', p: 'Las razas pequeñas acumulan sarro y sufren enfermedad periodontal más rápido que las grandes. Cepillado dental 3 veces por semana desde cachorro y limpieza profesional anual pueden ahorrarte miles de dólares en extracciones.' },
      { h: 'El pelaje: seda que pide atención', p: 'Su pelo largo es más similar al cabello humano que al pelo de perro. Sin cepillado diario forma nudos. Muchos dueños optan por corte "puppy cut" corto para facilitar el mantenimiento sin sacrificar la estética.' },
      { h: 'Ansiedad por separación', p: 'Los Yorkies se vinculan intensamente con su dueño y sufren cuando quedan solos. Entrenamiento de independencia desde cachorro (salidas cortas progresivas) y juguetes de estimulación mental son esenciales si trabajas fuera.' },
      { h: 'Temperatura: lo llevan mal en frío', p: 'Su poco pelo corporal y pequeño tamaño los hacen sensibles al frío. En invierno o en lugares con AC muy frío, necesitan suéter. No es un capricho de dueño exagerado: es una necesidad termorreguladora real.' },
    ],
    stat: 'El Yorkshire Terrier fue originalmente criado en el siglo XIX para cazar ratones en minas de carbón en Yorkshire, Inglaterra. Su tamaño compacto y valentía lo hacían ideal para espacios reducidos.',
    tips: ['Cepillado dental 3 veces por semana desde los 3 meses', 'Nunca lo dejes saltar de superficies altas: fracturas son comunes', 'Socializa con perros de su tamaño para evitar traumas', 'Usa arnés, no collar: la tráquea es muy delicada'],
    close: 'Un Yorkshire bien socializado y con las necesidades cubiertas es un perro lleno de vida y personalidad. Son perfectos para quienes quieren mucho perro en poco espacio.'
  },
  {
    id: 7, cat: 'razas', emoji: '🐶', color: '#E86535',
    img: 'fotos-razas-sm/Beagle.webp',
    title: 'Beagle: cómo manejar su energía (sin volverte loco)',
    sub: 'Todo sobre el olfato más poderoso del mundo doméstico',
    date: 'Marzo 2025', read: 5,
    tags: ['beagle', 'energía', 'olfato'],
    lead: 'El Beagle es encantador, curioso y tiene la nariz más afinada del mundo canino doméstico. Pero también ladra, aúlla y si sigue un olor interesante puede ignorarte completamente. Aquí está el manual real para convivir con uno.',
    body: [
      { h: 'El instinto de rastreo: bienvenido a tu vida', p: 'El Beagle fue criado para rastrear durante horas sin parar. Ese instinto sigue completamente activo. Si huele algo interesante, se enfoca totalmente. El entrenamiento de recall (volver al llamado) es la habilidad más importante que le enseñarás.' },
      { h: 'Ejercicio: más de lo que parece', p: 'Necesitan 45-60 minutos de actividad diaria. Una caminata simple no es suficiente; necesitan estimulación olfativa. Oculta premios en el jardín, usa snuffle mats o practica nosework. La nariz cansada es igual de efectiva que las patas cansadas.' },
      { h: 'El aullido: la sinfonía vecinal', p: 'Los Beagles vocalizan: ladran, aúllan y hacen un sonido llamado "bay". En apartamentos esto puede ser un problema real con vecinos. El entrenamiento de control vocal y el evitar que pasen muchas horas solos reduce significativamente el problema.' },
      { h: 'Alimentación: el estómago sin fondo', p: 'Como el Labrador, el Beagle come todo lo que encuentre. Son maestros en abrir armarios y robar comida del mesón. Porciones controladas, horario fijo y almacenamiento seguro de alimentos son obligatorios.' },
    ],
    stat: 'El Beagle tiene aproximadamente 220 millones de receptores olfativos, comparado con los 5 millones de los humanos. Por eso son usados por el USDA en aeropuertos para detectar alimentos ilegales.',
    tips: ['Jardín siempre cercado: escaparán siguiendo olores', 'El entrenamiento de "ven" es prioridad absoluta', 'Nosework y búsqueda de premios los cansa mentalmente', 'Son perros de manada: se llevan bien con otros perros'],
    close: 'Con la estimulación correcta y el entrenamiento necesario, el Beagle es un compañero alegre, afectuoso y completamente adicto a ti. Solo tienes que entender que su nariz manda.'
  },
  {
    id: 8, cat: 'razas', emoji: '🐕', color: '#2D6A4F',
    img: 'uploads/Page 4.webp',
    title: 'Cocker Spaniel: el más sensible de la familia',
    sub: 'Cómo criar a un perro que siente todo profundamente',
    date: 'Marzo 2025', read: 4,
    tags: ['cocker spaniel', 'sensible', 'familia'],
    lead: 'El Cocker Spaniel es uno de los perros más expresivos y afectuosos que existen. Esa sensibilidad es su mayor virtud, pero también significa que reacciona mal a la disciplina dura, a la soledad prolongada y a los ambientes tensos.',
    body: [
      { h: 'Entrenamiento: solo con refuerzo positivo', p: 'Los Cockers son extremadamente sensibles al tono de voz. Un regaño fuerte puede hacerlos retraídos por horas. El entrenamiento con premios y voz calmada da resultados excelentes. El castigo físico o gritos son contraproducentes y crueles.' },
      { h: 'Orejas: el mantenimiento semanal obligatorio', p: 'Sus largas orejas caídas crean un ambiente cálido y húmedo perfecto para bacterias y hongos. Limpieza semanal con solución ótica veterinaria es obligatoria. Las infecciones de oído recurrentes son la queja número 1 de dueños de Cocker.' },
      { h: 'Pelaje: hermoso pero exigente', p: 'Necesitan cepillado 3-4 veces por semana y corte profesional cada 8 semanas. El pelo alrededor de las orejas y patas acumula suciedad. Muchos dueños optan por corte práctico que mantiene la forma de la raza sin el mantenimiento extremo.' },
      { h: 'Ejercicio moderado, vínculo intenso', p: 'No necesitan tanto ejercicio como un Labrador, pero sí actividad diaria. Lo que más necesitan es tiempo contigo. Son perros de compañía en el sentido más profundo: quieren estar en la misma habitación que su familia siempre.' },
    ],
    stat: 'El Cocker Spaniel Americano ganó el Westminster Dog Show más veces que cualquier otra raza en la historia del concurso. Su nombre viene de su uso original para cazar becadas (woodcock) en Inglaterra.',
    tips: ['Limpieza de oídos semanal sin excepción', 'Socialización temprana para evitar timidez excesiva', 'Nunca uses disciplina dura: un "no" firme es suficiente', 'Excelente con niños que respetan su espacio'],
    close: 'Si buscas un perro profundamente afectuoso que te lea el estado de ánimo mejor que muchas personas, el Cocker Spaniel es tu compañero. Solo necesita gentileza y presencia.'
  },
  {
    id: 9, cat: 'razas', emoji: '🐩', color: '#7C3AED',
    img: 'fotos-razas-sm/Chihuahua.webp',
    title: 'Chihuahua: criando al perro más malentendido del mundo',
    sub: 'Por qué los problemas de carácter son siempre culpa del dueño',
    date: 'Febrero 2025', read: 4,
    tags: ['chihuahua', 'pequeño', 'temperamento'],
    lead: 'Los Chihuahuas muerden, ladran, gruñen y son agresivos. Pero la realidad es que casi siempre es culpa de sus dueños. El "Síndrome del Perro Pequeño" es un fenómeno real: los tratamos como juguetes y se comportan como animales sin reglas.',
    body: [
      { h: 'El problema del "pequeño indefenso"', p: 'Los dueños de perros pequeños permiten conductas que nunca tolerarían en un Golden. Gruñir al acercarse a su comida, no bajar del sofá cuando se le pide, ladrar a visitas. Eso no es "carácter": es falta de entrenamiento.' },
      { h: 'Entrenamiento: exactamente igual que cualquier raza', p: 'Los Chihuahuas son inteligentes y responden perfectamente al entrenamiento positivo. La misma consistencia que usarías con un Labrador. Reglas claras, refuerzo positivo y nunca excusar comportamientos problemáticos por su tamaño.' },
      { h: 'Salud: lo que sí es genuino', p: 'Tienen predisposición a problemas cardíacos (mitral valve disease), hidrocefalia y colapso traqueal. Dentadura pequeña = más sarro y enfermedad periodontal. Cepillado dental frecuente y revisiones cardíacas anuales desde los 5 años son esenciales.' },
      { h: 'Temperatura y fragilidad física', p: 'Son muy sensibles al frío: suéter en invierno o con AC fuerte. Sus huesos son finos; una caída de altura moderada puede fracturarlos. Nada de saltos de sofás altos, nada de que niños pequeños los carguen sin supervisión adulta.' },
    ],
    stat: 'El Chihuahua es la raza de perro más pequeña del mundo con registros formales, pero también una de las más longevas: bien cuidados pueden vivir 15-20 años, superando a razas mucho más grandes.',
    tips: ['Trátalo como perro, no como accesorio', 'Socialización con personas y otros perros desde las 8 semanas', 'Nunca lo cargues para alejarlo de situaciones: que las enfrente', 'Cepillado dental 3 veces por semana mínimo'],
    close: 'Un Chihuahua criado con respeto, reglas claras y socialización adecuada es un perro valiente, leal y con una personalidad enorme. Lo que criaste es lo que tienes.'
  },
  {
    id: 10, cat: 'razas', emoji: '🐾', color: '#E85D75',
    img: 'uploads/Page 21.webp',
    title: 'Shih Tzu: el arte de cuidar ese pelaje de seda',
    sub: 'Grooming, salud y vida con el perro de los emperadores chinos',
    date: 'Febrero 2025', read: 4,
    tags: ['shih tzu', 'pelaje', 'apartamento'],
    lead: 'El Shih Tzu fue criado durante siglos para una sola cosa: ser compañía de lujo en palacios chinos. Esa historia explica todo sobre su carácter: es afectuoso, tranquilo y completamente domesticado. También tiene pelo que requiere atención seria.',
    body: [
      { h: 'Pelaje: la inversión que no termina', p: 'Sin cepillado diario, su pelo largo forma nudos que solo se resuelven con corte. La mayoría de dueños modernos opta por corte corto "teddy bear" que mantiene la esencia de la raza sin el mantenimiento extremo. Grooming profesional cada 6-8 semanas.' },
      { h: 'Cara plana: más que estética', p: 'Como el French Bulldog, es braquicéfalo. Resuellan, roncan y en calor extremo se fatigan rápido. En verano, salidas en horas frescas y siempre con agua disponible. No es una raza para hacer ejercicio intenso.' },
      { h: 'Ojos: limpieza diaria necesaria', p: 'Sus ojos grandes y prominentes acumulan secreciones que manchan el pelo blanco de la cara. Limpieza diaria con gasa húmeda evita manchas y posibles infecciones oculares. Las manchas persistentes requieren productos específicos.' },
      { h: 'Carácter: amigable con todos', p: 'A diferencia de razas más territoriales, el Shih Tzu suele ser amigable con desconocidos, niños y otros animales. Son excelentes perros de departamento: tranquilos, no ladran excessivamente y son felices con ejercicio moderado.' },
    ],
    stat: 'El Shih Tzu aparece en pinturas y documentos de la corte imperial china desde el siglo XVII. Su nombre significa "perro león" en chino mandarín, en referencia a los leones del budismo tibetano.',
    tips: ['Corte "puppy cut" para mantenimiento práctico', 'Limpieza ocular diaria para prevenir manchas y infecciones', 'Usar bowls elevados facilita comer sin mojar el pelo', 'Excelente para dueños por primera vez'],
    close: 'Si buscas un perro tranquilo, afectuoso y adaptable al ritmo de vida moderno en apartamento, el Shih Tzu es una elección excelente. Solo necesita ese grooming consistente.'
  },

  // ── BIENESTAR ────────────────────────────────────────────────────────────
  {
    id: 11, cat: 'bienestar', emoji: '👴', color: '#1EB87A',
    title: 'Perros para personas mayores: la ciencia dice que alargan la vida',
    sub: 'Datos reales sobre compañía canina y longevidad',
    date: 'Mayo 2025', read: 6,
    tags: ['personas mayores', 'salud', 'longevidad'],
    lead: 'No es un mito ni una exageración sentimental: tener un perro en la vejez tiene efectos medibles en la salud cardiovascular, la presión arterial, la actividad física y la salud mental. La ciencia lleva décadas confirmándolo.',
    body: [
      { h: 'El corazón agradece la compañía', p: 'Un estudio de la American Heart Association de 2019 con 3.8 millones de personas encontró que los dueños de perros tienen un 24% menos de riesgo de muerte por enfermedad cardiovascular. La interacción diaria reduce cortisol y baja la presión arterial.' },
      { h: 'Actividad física sin que parezca ejercicio', p: 'Las personas mayores con perro caminan un promedio de 22 minutos más por día que quienes no tienen. Eso es suficiente para cumplir las recomendaciones de actividad física de la OMS para adultos mayores. La obligación de sacar al perro es, literalmente, medicina.' },
      { h: 'Contra la soledad y el deterioro cognitivo', p: 'La soledad en adultos mayores es un factor de riesgo equivalente a fumar 15 cigarrillos diarios. Los perros proveen compañía constante, rutina y responsabilidad. Estudios muestran que dueños de mascotas mayores tienen menor velocidad de deterioro cognitivo.' },
      { h: 'Qué razas son más apropiadas', p: 'Para adultos mayores: Cavalier King Charles Spaniel, Bichón Frisé, Poodle Miniatura, Shih Tzu y Maltés. Perros de tamaño mediano-pequeño, temperamento tranquilo y que no necesiten ejercicio intenso. Que el perro sea adoptable, no que sea cachorro.' },
    ],
    stat: 'Un estudio sueco (Uppsala University, 2017) con 3.4 millones de personas encontró que vivir solo con un perro reduce el riesgo de muerte cardiovascular en un 36% comparado con vivir solo sin mascota.',
    tips: ['Adoptar un perro adulto (2-5 años) es ideal: ya está entrenado', 'Considerar razas de bajo mantenimiento y ejercicio moderado', 'El costo del vet: revisar si seguro de salud cubre algunas mascotas', 'Contactar refugios con programas especiales para adultos mayores'],
    close: 'Un perro en la vejez no es una carga: es el compañero más constante, el que obliga a salir, el que da rutina y el que nunca juzga. Para muchos adultos mayores, es la mejor decisión de salud que tomaron.'
  },
  {
    id: 12, cat: 'familia', emoji: '👨‍👩‍👧', color: '#E85D75',
    title: 'Por qué un perro transforma una familia con hijos',
    sub: 'Responsabilidad, empatía y lazos que duran toda la vida',
    date: 'Mayo 2025', read: 5,
    tags: ['familia', 'niños', 'crianza'],
    lead: 'Crecer con un perro no es solo "tener una mascota". Es aprender responsabilidad, empatía y duelo. Es tener tu primer mejor amigo que nunca te traiciona. Hay una razón por la que los adultos que tuvieron perros de niños los recuerdan toda la vida.',
    body: [
      { h: 'Lo que los niños aprenden sin que te des cuenta', p: 'Cuidar a un perro enseña empatía práctica, no teórica. El niño aprende a leer lenguaje no verbal, a respetar límites (el perro gruñe y hay que respetar), a ser responsable de otro ser vivo. Estudios muestran que niños con mascotas desarrollan mayor coeficiente de empatía.' },
      { h: 'El sistema inmune y los alergenos', p: 'Contrario a lo que muchos piensan, crecer con un perro en casa reduce el riesgo de desarrollar alergias y asma. Un estudio del Journal of Allergy and Clinical Immunology encontró que niños expuestos a perros antes del año de vida tienen 13% menos probabilidad de desarrollar asma.' },
      { h: 'Razas recomendadas para familias con niños', p: 'Golden Retriever y Labrador son los reyes indiscutidos. También: Beagle, Boxer, Cavalier King Charles Spaniel y Bernese Mountain Dog. Evitar razas con alta sensibilidad al ruido o tendencia territorial si hay niños pequeños en casa.' },
      { h: 'La conversación del duelo: inevitable y necesaria', p: 'Los perros viven 10-15 años. Si tu hijo tiene 5 cuando llega el perro, la probabilidad de que experiencie su muerte es alta. Esa primera experiencia de pérdida, acompañada por los padres, construye herramientas emocionales que duran toda la vida.' },
    ],
    stat: 'El 90% de adultos que tuvieron perros durante la infancia describen esa relación como una de las más significativas de su vida, según una encuesta de la American Pet Products Association (2024).',
    tips: ['Establece reglas claras: quién alimenta, quién saca, quién cepilla', 'Enseña a los niños a leer el lenguaje corporal del perro', 'Nunca dejes niños menores de 6 años solos con el perro', 'Involucra a los niños en las visitas al veterinario'],
    close: 'Un perro en familia es una inversión en carácter. Las lecciones que da — responsabilidad, constancia, amor incondicional — no vienen de ningún libro. Vienen de vivir con él.'
  },
  {
    id: 13, cat: 'familia', emoji: '🧩', color: '#7C3AED',
    title: 'Perros y niños con autismo: vínculos que la ciencia confirma',
    sub: 'Datos reales sobre terapia asistida con animales en el espectro',
    date: 'Abril 2025', read: 6,
    tags: ['autismo', 'terapia', 'niños', 'TEA'],
    lead: 'Para muchos niños en el espectro autista, un perro es el primer ser vivo con quien logran una conexión genuina. No juzga, no tiene expectativas sociales implícitas y ofrece contacto físico regulado. La ciencia lleva años documentando estos beneficios.',
    body: [
      { h: 'Regulación sensorial y reducción de ansiedad', p: 'Acariciar un perro reduce los niveles de cortisol (hormona del estrés) y aumenta la oxitocina en niños con TEA, igual que en neurotípicos. Varios estudios muestran disminución de comportamientos de autoestimulación ansiosa durante y después de la interacción canina.' },
      { h: 'Comunicación no verbal: el lenguaje del perro', p: 'Los niños con autismo que tienen dificultad con el lenguaje verbal frecuentemente responden mejor a la comunicación no verbal. El perro es un maestro de esto: comunica con cuerpo, cola y ojos. Muchos niños aprenden a leer emociones en el perro antes de hacerlo en personas.' },
      { h: 'Perros de servicio vs. mascotas en casa', p: 'Los perros de servicio especializados para TEA (PTSD/Autism Service Dogs) están entrenados para interrumpir comportamientos de crisis, tethering (anclar físicamente al niño) y alertar a los padres. Son una herramienta clínica. Una mascota en casa, bien elegida, ofrece beneficios menores pero reales.' },
      { h: 'Qué tener en cuenta antes de adoptar', p: 'Evaluar el perfil sensorial del niño primero. Un niño con hipersensibilidad táctil puede sentir el contacto del perro como invasivo. Perros de temperamento muy calmado, predecibles y entrenados son clave. Nunca cachorros hiperactivos para este contexto.' },
    ],
    stat: 'Un estudio de la Universidad de Missouri (2018) encontró que niños con autismo tienen niveles de cortisol matutino 10% más bajos en días en que interactuaron con su perro, comparado con días sin esa interacción.',
    tips: ['Consulta con el terapeuta del niño antes de adoptar', 'Golden Retriever y Labrador Retriever: las razas más usadas en programas de terapia', 'Introduce el perro gradualmente, sin forzar contacto', 'Organizaciones como Canine Companions ofrecen perros de servicio para TEA'],
    close: 'El vínculo entre un niño en el espectro y su perro puede ser de los más profundos que existen. Requiere preparación y la raza correcta, pero cuando funciona, transforma vidas.'
  },
  {
    id: 14, cat: 'bienestar', emoji: '🧠', color: '#1EB87A',
    title: 'Cómo un perro puede reducir tu ansiedad (con datos reales)',
    sub: 'La ciencia detrás del vínculo humano-canino y la salud mental',
    date: 'Abril 2025', read: 5,
    tags: ['ansiedad', 'salud mental', 'bienestar'],
    lead: 'No es que se sientan bien: acariciar a un perro produce cambios bioquímicos medibles en el cerebro. Oxitocina, serotonina, dopamina. La relación humano-perro activa el mismo sistema de apego que con otros humanos. La ciencia lleva décadas confirmándolo.',
    body: [
      { h: 'La química del vínculo', p: 'Mirar a tu perro a los ojos durante 5 minutos aumenta la oxitocina en sangre un 300% en humanos y un 130% en el perro. Este es el mismo mecanismo que vincula a madres con bebés recién nacidos. No es metáfora: es neurociencia.' },
      { h: 'Rutina como ancla emocional', p: 'Las personas con ansiedad o depresión se benefician especialmente de la rutina que impone tener un perro. Las horas de alimentación, las caminatas, el cepillado. Esa estructura externa reduce la parálisis por decisión y ancla el día.' },
      { h: 'Presencia física: el antídoto al pensamiento rumiativo', p: 'Los perros viven en el presente de forma radical. Cuando tu cabeza está dando vueltas a preocupaciones futuras o pasadas, el perro te jala de vuelta al ahora. Varios terapeutas recomiendan animales de compañía como parte del tratamiento de ansiedad generalizada.' },
      { h: 'Límites: no son terapeutas', p: 'Los perros complementan el tratamiento de salud mental, no lo reemplazan. Tener un perro cuando estás en crisis severa puede ser contraproducente si no puedes atenderlo bien. La conversación con tu psicólogo sobre este tema es importante.' },
    ],
    stat: 'Un meta-análisis de 2019 publicado en BMC Psychiatry que analizó 17 estudios encontró que la interacción con animales reduce significativamente síntomas de ansiedad, depresión y soledad en contextos clínicos y no clínicos.',
    tips: ['Los perros de terapia son distintos a los de soporte emocional: infórmate bien', 'Una caminata de 20 min con tu perro tiene efectos similares a la meditación en cortisol', 'Stroking (acariciar) durante 10 min baja la presión arterial significativamente', 'El ejercicio físico con tu perro potencia el efecto antidepresivo'],
    close: 'Tu perro no sabe que te está "ayudando". Solo está siendo él mismo. Pero eso, paradójicamente, es exactamente lo que necesitas. Presencia sin agenda. Amor sin condiciones.'
  },

  // ── LIFESTYLE ────────────────────────────────────────────────────────────
  {
    id: 15, cat: 'lifestyle', emoji: '🏙️', color: '#7C3AED',
    title: 'Vivir con un perro en apartamento: la guía honesta',
    sub: 'Lo que nadie te cuenta antes de adoptar en la ciudad',
    date: 'Mayo 2025', read: 6,
    tags: ['apartamento', 'ciudad', 'lifestyle'],
    lead: 'Vivir con un perro en un apartamento no solo es posible: millones de personas lo hacen exitosamente. El tamaño del perro importa menos de lo que crees. Lo que importa es el ejercicio, la rutina y que elijas la raza correcta.',
    body: [
      { h: 'El tamaño del apartamento importa menos que el ejercicio', p: 'Un Greyhound (lebrel gigante) puede vivir felizmente en un apartamento pequeño porque dentro de casa son increíblemente tranquilos. Un Jack Russell Terrier puede desquiciar un piso amplio si no sale suficiente. El tamaño del perro no predice compatibilidad con el apartamento.' },
      { h: 'Las mejores razas para apartamento', p: 'Bulldog Francés, Bichón Frisé, Pug, Cavalier King Charles, Shih Tzu, Basset Hound, Poodle Miniatura y Greyhound son considerados ideales. Evitar: Border Collie, Husky Siberiano, Dálmata y Jack Russell en espacios pequeños sin jardin.' },
      { h: 'La rutina de ciudad: lo que funciona', p: 'Mínimo 3 salidas al día: una larga (30-40 min) y dos cortas. Parques de perros cercanos son invaluables. Juguetes de estimulación mental dentro de casa (puzzle feeders, KONGs) reducen el aburrimiento. El paseo de la mañana marca el tono del día.' },
      { h: 'El vecindario y el edificio', p: 'Revisa el reglamento del edificio antes de adoptar: restricciones de tamaño, razas prohibidas (común con Pitbull, Rottweiler, Doberman). Presenta a tu perro a los vecinos de tu piso. Un perro que ladra en apartamento tiene consecuencias reales con la administración.' },
    ],
    stat: 'El 42% de los perros en USA viven en apartamentos o condominios. La encuesta de la APPA 2023-2024 muestra que la satisfacción de estos dueños es igual a la de quienes tienen casa con jardín cuando el perro hace ejercicio regular.',
    tips: ['Establece una zona del perro: cama, juguetes, bebedero en un rincón', 'Contrata un paseador para los días de trabajo largo', 'Un tapete de lamer (licking mat) con mantequilla de maní entretiene 20 min', 'Revisa la política pet-friendly antes de firmar cualquier contrato de renta'],
    close: 'El apartamento más lujoso con un perro aburrido es una mala vida canina. Un estudio chico con rutina, ejercicio y estimulación mental es una vida peruna excelente. Tú decides cuál das.'
  },
  {
    id: 16, cat: 'lifestyle', emoji: '💻', color: '#E86535',
    title: 'El perro y el home office: la combinación perfecta (si lo haces bien)',
    sub: 'Cómo trabajar desde casa con un perro sin perder la productividad ni la cordura',
    date: 'Abril 2025', read: 4,
    tags: ['home office', 'trabajo', 'rutina'],
    lead: 'Después de la pandemia, millones de personas trabajan desde casa con su perro al lado. La mayoría lo describen como uno de los mayores beneficios del trabajo remoto. Con las reglas correctas, la convivencia laboral-canina es casi perfecta.',
    body: [
      { h: 'El efecto anti-estrés documentado', p: 'Virginia Commonwealth University publicó un estudio mostrando que empleados que llevan perros al trabajo tienen niveles de cortisol significativamente más bajos a lo largo del día. En home office, este beneficio es constante.' },
      { h: 'La rutina que necesitan (y tú también)', p: 'El perro te obliga a salir. Eso que parece una interrupción es en realidad la pausa que el home office necesita: salir 20 minutos a mediodía mejora la concentración de la tarde. El paseo es tu separador natural entre bloques de trabajo.' },
      { h: 'Los límites que sí necesitas poner', p: 'Algunos perros desarrollan sobreapego cuando el dueño está en casa todo el día. Necesitan aprender que "estás pero no estás disponible". Enséñales a estar en su lugar mientras trabajas y que el tiempo de juego llega después de que cierras la laptop.' },
      { h: 'Videollamadas y el perro', p: 'Los perros en videollamadas laborales han normalizado tanto que muchos jefes esperan verlos. Pero para presentaciones importantes, entrena a tu perro a quedarse fuera del cuarto o en su lugar con un Kong. La imprevisibilidad canina en reuniones críticas genera estrés.' },
    ],
    stat: 'El 67% de los trabajadores remotos con mascotas dicen que la presencia de su perro es uno de los principales beneficios del trabajo desde casa, por encima de no tener commute, según Gallup 2023.',
    tips: ['Mantén el horario del perro aunque estés en casa', 'Puerta entreabierta = disponible; puerta cerrada = reunión', 'Un paseo de 20 min antes de empezar a trabajar cansa la mente del perro', 'Juguetes rotativos: lo que sacas hoy lo guardas mañana para mantener novedad'],
    close: 'El perro de home office no es una distracción: es el compañero de trabajo más leal, discreto (la mayoría del tiempo) y que nunca se roba el crédito de tus ideas.'
  },
  {
    id: 17, cat: 'lifestyle', emoji: '📱', color: '#1E90FF',
    title: 'Las mejores apps para dueños de perros en 2025',
    sub: 'Tecnología que genuinamente mejora la vida de tu perro',
    date: 'Mayo 2025', read: 4,
    tags: ['apps', 'tecnología', '2025'],
    lead: 'Hay cientos de apps para mascotas en las tiendas. La mayoría son inútiles. Estas son las que realmente usan veterinarios, entrenadores y dueños serios para mejorar la salud, el comportamiento y el bienestar de sus perros.',
    body: [
      { h: 'Salud y veterinaria', p: 'Petcube ofrece monitoreo de cámara en casa con análisis de comportamiento por IA. PetDesk centraliza citas veterinarias, vacunas y recordatorios de medicamentos. BabelBark conecta a dueños con veterinarios para consultas online rápidas y económicas.' },
      { h: 'Entrenamiento', p: 'Dogo ofrece planes de entrenamiento personalizados con guías en video y seguimiento de progreso. GoodPup conecta con entrenadores certificados para sesiones por videollamada. Puppr tiene 101 trucos estructurados de básico a avanzado con feedback visual.' },
      { h: 'Paseos y cuidado', p: 'Rover y Wag son las plataformas más confiables para paseadores y cuidadores verificados con seguros incluidos. Waze for Dogs no existe, pero Bring Fido es el mejor recurso para encontrar hoteles, restaurantes y parques pet-friendly en cualquier ciudad.' },
      { h: 'Rastreo GPS', p: 'Tractive GPS es el collar tracker más usado con 10-30 días de batería. Fi Series 3 (collar inteligente) trackea pasos, sueño y actividad además de ubicación. Ambos tienen suscripción mensual. Son la inversión más importante si tu perro tiene tendencia a escapar.' },
    ],
    stat: 'El mercado global de tecnología para mascotas alcanzará los $20 billones USD en 2025, con las apps y dispositivos conectados como el segmento de mayor crecimiento (32% anual).',
    tips: ['Tractive para razas escapistas: inversión que puede salvar una vida', 'PetDesk para tener todo el historial veterinario en un solo lugar', 'Dogo o Puppr para empezar entrenamiento en casa antes de clases formales', 'Fi collar: el Apple Watch de los perros, ideal si te gusta los datos'],
    close: 'La tecnología no reemplaza al veterinario ni al entrenador profesional, pero sí puede ayudarte a tomar mejores decisiones más rápido. Empieza con una o dos apps y escala desde ahí.'
  },
  {
    id: 18, cat: 'lifestyle', emoji: '☕', color: '#2D6A4F',
    title: 'El boom de los dog cafés: una tendencia global que llegó para quedarse',
    sub: 'De Tokio a Nueva York: el fenómeno de tomar café rodeado de perros',
    date: 'Marzo 2025', read: 4,
    tags: ['dog café', 'tendencia', 'ciudades'],
    lead: 'La idea parece simple: pagas la entrada, tomas un café y juegas con perros. Pero detrás del fenómeno hay algo más profundo: la soledad urbana, la imposibilidad de tener mascotas en renta, y la necesidad humana de contacto animal sin compromisos.',
    body: [
      { h: 'Origen: Taiwán y Japón, 1998-2004', p: 'El primer cat café documentado fue en Taipei en 1998. Japón los adoptó masivamente en la década de 2000 en respuesta a la cultura de vivienda urbana ultracompacta donde tener mascotas es casi imposible. Los dog cafés siguieron la misma lógica: el animal es de la cafetería, tú eres el visitante.' },
      { h: 'El modelo actual: adopción integrada', p: 'Los mejores dog cafés de USA y Europa no son solo atracciones: son extensiones de refugios de animales. Los perros que ves son adoptables. La estadía genera ingresos para el refugio y la exposición acelera la adopción. The Dog Café en Los Ángeles y Dog & Cat Republic en Miami operan con este modelo.' },
      { h: 'El bienestar animal: la pregunta importante', p: 'Los mejores cafés rotan a los animales, limitan el número de visitantes, tienen zonas de descanso privadas y trabajan con etólogos para evaluar el estrés canino. Los peores son básicamente zoológicos de contacto. Investiga el café antes de ir.' },
      { h: 'Ciudades con mejor escena', p: 'Tokio sigue siendo la meca. En USA destacan Los Ángeles, Chicago, Nueva York (The Spot) y Atlanta. En España, Barcelona tiene varios integrados con refugios. En Latinoamérica, Ciudad de México y Bogotá tienen la escena más desarrollada.' },
    ],
    stat: 'Se estiman más de 150 dog cafés operativos en USA en 2025, con un crecimiento del 40% desde la pandemia. El ticket promedio de entrada es de $15-$25 por 60-90 minutos.',
    tips: ['Revisa que el café tenga política de bienestar animal documentada', 'No fuerces el contacto: deja que el perro se acerque', 'Lleva fotos de tu visita pero no flash: irrita a los animales', 'Muchos tienen sistema de reserva: no llegues sin cita en fin de semana'],
    close: 'El dog café es uno de los pocos negocios donde pagar por estar rodeado de perros tiene sentido económico y emocional. Mientras los estándares de bienestar se mantengan, el fenómeno seguirá creciendo.'
  },

  // ── GUÍAS ────────────────────────────────────────────────────────────────
  {
    id: 19, cat: 'guias', emoji: '📋', color: '#2D6A4F',
    title: 'Cómo obtener el certificado ESA en USA: guía paso a paso',
    sub: 'Qué es, qué derechos da y cómo no caer en estafas',
    date: 'Mayo 2025', read: 7,
    tags: ['ESA', 'certificado', 'soporte emocional', 'USA'],
    lead: 'El Emotional Support Animal (ESA) no es lo mismo que un perro de servicio ni un perro de terapia. Es una categoría específica con derechos concretos. También es el sector con más fraudes en el mundo de las mascotas. Aquí está la guía real.',
    body: [
      { h: 'Qué es realmente un ESA', p: 'Un ESA es un animal de compañía prescrito por un profesional de salud mental licenciado (psicólogo, psiquiatra, terapeuta) para tratar una condición mental diagnosticada. No requiere entrenamiento especial como los perros de servicio. Cualquier raza o especie puede ser ESA.' },
      { h: 'Los derechos que sí tienes', p: 'Bajo el Fair Housing Act (FHA), los propietarios de vivienda deben permitir ESAs incluso en propiedades con política "no mascotas", y no pueden cobrar depósitos adicionales por ellos. Nota importante: desde 2021, las aerolíneas ya NO están obligadas a aceptar ESAs en cabina.' },
      { h: 'Cómo obtener la carta ESA legalmente', p: 'Solo un profesional de salud mental con licencia en tu estado puede emitir la carta ESA. El proceso: evaluación clínica real (presencial o teleconsulta), diagnóstico de condición que se beneficia del apoyo animal, carta en papel membretado con licencia del profesional. No existe ningún "registro" oficial de ESA.' },
      { h: 'Las estafas que debes evitar', p: 'Sitios web que venden "certificados ESA" por $30-$200 sin evaluación clínica son ilegales. Los propietarios de vivienda tienen derecho a verificar la autenticidad de la carta contactando directamente al profesional. Estos documentos falsos no tienen validez legal y pueden tenerte en problemas.' },
    ],
    stat: 'La National Service Animal Registry estimó que entre 2018 y 2022, el número de ESAs fraudulentos en USA se multiplicó por 6, impulsado por plataformas de "registro" online sin respaldo clínico.',
    tips: ['Busca un psicólogo o psiquiatra con licencia en tu estado', 'Plataformas como Cerebral o Talkspace tienen profesionales que pueden evaluar para ESA', 'Guarda copia de la carta y la licencia del profesional', 'Renueva la carta anualmente: muchos propietarios la requieren actualizada'],
    close: 'El proceso real de obtener un ESA requiere trabajo genuino: terapia real, diagnóstico real, profesional real. Pero si cumples los criterios, los beneficios en vivienda son significativos y completamente legales.'
  },
  {
    id: 20, cat: 'viaje', emoji: '✈️', color: '#E86535',
    title: 'Viajar con tu perro: vuelos, hoteles y fronteras',
    sub: 'La guía completa para no estresarte (ni estresarlo) en el camino',
    date: 'Abril 2025', read: 7,
    tags: ['viaje', 'vuelo', 'hotel', 'documentos'],
    lead: 'Viajar con un perro es completamente posible y millones lo hacen. Pero requiere planificación real: documentos, aerolíneas con políticas específicas, hoteles verificados y preparación del animal. El caos en viajes con mascotas casi siempre es falta de investigación previa.',
    body: [
      { h: 'Vuelos dentro de USA', p: 'La mayoría de aerolíneas permiten perros pequeños (bajo 20 lbs en transportadora) en cabina por $95-$150 por trayecto. American, Delta y United tienen políticas similares. Reserva el espacio con anticipación: hay cupo limitado de mascotas por vuelo. Para perros grandes: solo en bodega o como cargo, lo que no se recomienda para braquicéfalos.' },
      { h: 'Documentación necesaria', p: 'Para vuelos domésticos en USA: certificado de salud emitido por vet en los últimos 10 días y registro de vacuna antirrábica. Para viajes internacionales: microchip ISO estándar, salud rabies-free según destino, y certificados USDA apostillados. Europa requiere trámites con meses de anticipación.' },
      { h: 'Hoteles y alojamiento', p: 'Kimpton Hotels (todas sus propiedades), La Quinta, Loews y Marriott Element son las cadenas más pet-friendly en USA. Bring Fido y BringFido.com tienen el directorio más completo. Llama siempre para confirmar la política actual: las restricciones de tamaño y raza cambian.' },
      { h: 'Preparación del perro', p: 'Semanas antes: habitúa a tu perro a la transportadora dejándola abierta en casa. Viaje en auto frecuente si el vuelo será largo. El día del viaje: ejercicio intenso en la mañana para que viaje cansado y tranquilo. Evita sedantes sin supervisión veterinaria: pueden ser peligrosos en vuelo.' },
    ],
    stat: 'Según la APPA, el 37% de los dueños de perros en USA viajaron con su mascota en 2023, un aumento del 25% vs 2019. Los ingresos de la industria pet-travel superan los $6 billones anuales.',
    tips: ['Reserva el espacio de mascota en el vuelo al mismo tiempo que el ticket', 'Microchip y collar con placa de contacto actualizados antes de viajar', 'Investiga las regulaciones del destino con 3+ meses de anticipación para viajes internacionales', 'Lleva agua y su comida habitual: cambios de dieta en viaje generan problemas digestivos'],
    close: 'El viaje perfecto con un perro no se improvisa. Pero cuando la planificación funciona, tener a tu compañero contigo en el destino hace que valga absolutamente cada trámite.'
  },
  {
    id: 21, cat: 'guias', emoji: '🥩', color: '#E85D75',
    title: 'Alimentación real para tu perro: más allá del croquetismo',
    sub: 'Cómo leer etiquetas, entender proteínas y tomar decisiones informadas',
    date: 'Abril 2025', read: 6,
    tags: ['nutrición', 'alimentación', 'croquetas', 'raw'],
    lead: 'El mercado de comida para perros es de $50 billones anuales en USA solo. Hay miles de marcas, todas con marketing agresivo. La realidad: leer etiquetas correctamente y entender las necesidades básicas de tu raza es lo único que necesitas para tomar buenas decisiones.',
    body: [
      { h: 'Cómo leer una etiqueta de croquetas', p: 'Los ingredientes aparecen en orden descendente por peso. El primer ingrediente debe ser una proteína real identificada: "chicken" no "poultry by-product". Evitar: rellenos de maíz o soya como primeros ingredientes, colorantes artificiales, y saborizantes artificiales. AAFCO "complete and balanced" es la certificación mínima.' },
      { h: 'Cuánta proteína necesita tu perro', p: 'Adultos activos: 18-25% proteína mínimo. Cachorros en crecimiento: 22-32%. Senior: similar a adulto pero con ajuste calórico. Las razas grandes de crecimiento rápido (Golden, Lab, Rottweiler) necesitan calcio y fósforo balanceados específicamente para evitar problemas articulares.' },
      { h: 'BARF y raw feeding: lo que dice la ciencia', p: 'La alimentación cruda (BARF) tiene beneficios anecdóticos reales (pelaje, digestión) pero también riesgos: salmonella, E.coli, y desbalances nutricionales si no está formulada por un veterinario nutricionista. No es para dueños novatos ni para hogares con niños pequeños o inmunodeprimidos.' },
      { h: 'Snacks y premios: el 10% que arruina la dieta', p: 'Los snacks no deben superar el 10% de las calorías diarias. Los premios de entrenamiento deben ser pequeños (tamaño garbanzo). Los snacks de supermercado convencionales frecuentemente tienen azúcar, sal y colorantes. Alternativas: trozos de pechuga de pollo cocida, zanahoria, arándanos.' },
    ],
    stat: 'Un estudio de la Universidad de California Davis (2019) analizó 23 dietas BARF para perros vendidas comercialmente: el 83% tenía desequilibrios nutricionales significativos según los estándares NRC para caninos.',
    tips: ['Primera fuente: proteína real identificada (chicken, salmon, beef)', 'AAFCO "complete and balanced for all life stages" es el estándar mínimo', 'Cambia de marca gradualmente (7-10 días) para evitar problemas digestivos', 'Consulta con un veterinario nutricionista antes de dieta raw o casera'],
    close: 'No necesitas la croqueta más cara del mercado. Necesitas una croqueta con proteína real como primer ingrediente, certificación AAFCO y porciones ajustadas al peso y actividad de tu perro.'
  },
  {
    id: 22, cat: 'guias', emoji: '🐣', color: '#F58220',
    title: 'La primera semana con un cachorro: lo que nadie te cuenta',
    sub: 'Supervivencia, realismo y las cosas que sí funcionan',
    date: 'Marzo 2025', read: 6,
    tags: ['cachorro', 'primera semana', 'preparación'],
    lead: 'Nadie te dice que la primera semana con un cachorro es agotadora, confusa y a veces hace que te preguntes por qué lo hiciste. También es una de las experiencias más intensamente bonitas de la vida. Aquí va la guía sin filtros.',
    body: [
      { h: 'La noche uno: el llorido', p: 'El cachorro llora la primera noche (y posiblemente las siguientes tres). Viene de estar con su madre y hermanos. Opciones: caja/crate cerca de tu cama con tu camiseta usada dentro, reloj de tic-tac envuelto en tela (simula latido), o admitir derrota y ponerlo en tu cama (luego es difícil sacarlo).' },
      { h: 'Las primeras 48 horas: observación máxima', p: 'Monitorea comida, agua, orina y deposición. Cachorros sanos comen con entusiasmo, orinan frecuentemente y hacen una deposición sólida al día. Vómito repetido, letargia extrema o diarrea persistente: veterinario sin esperar.' },
      { h: 'El crate no es una cárcel', p: 'El crate training es la herramienta más útil para los primeros meses. Introduce el crate como un refugio: comida dentro, juguetes dentro, nunca como castigo. Un cachorro en crate bien entrenado duerme tranquilo, viaja sin estrés y raramente tiene accidentes nocturnos.' },
      { h: 'Las primeras semanas de adiestramiento', p: 'Sienta, quieto, ven y "nada" (no toques eso): estos cuatro comandos son el fundamento. Sesiones de 5 minutos máximo, 3 veces al día. La atención de un cachorro es mínima. El refuerzo positivo con premios funciona mejor que cualquier otra técnica.' },
    ],
    stat: 'Los primeros 16 semanas de vida son el período crítico de socialización canina. Lo que el cachorro experimenta (personas, sonidos, animales, superficies) en esas semanas determina su temperamento adulto.',
    tips: ['Vet en las primeras 48 horas post-adopción para chequeo inicial', 'Retira del suelo todo lo que no quieres que mastique', 'Horario de comida fijo = horario de necesidades fijo (facilita el entrenamiento de baño)', 'Nombra al cachorro desde el día uno y úsalo siempre en tono positivo'],
    close: 'La primera semana es dura. La primera mes mejora. A los tres meses tienes un compañero real. La inversión de tiempo en esas primeras semanas da dividendos por 12-15 años.'
  },
  {
    id: 23, cat: 'guias', emoji: '🌍', color: '#1EB87A',
    title: 'Socialización canina: el error que comete el 90% de los dueños',
    sub: 'La ventana de tiempo que no puedes volver a abrir',
    date: 'Marzo 2025', read: 5,
    tags: ['socialización', 'cachorro', 'comportamiento'],
    lead: 'Hay una ventana en la vida de un cachorro entre las 3 y las 16 semanas donde todo lo que experimenta queda grabado como "normal y seguro". Después de esa ventana, lo nuevo genera desconfianza. Lo que hagas (o no hagas) en ese período define al perro adulto.',
    body: [
      { h: 'Qué significa socializar correctamente', p: 'No es solo "que conozca otros perros". Es exposición controlada y positiva a: personas de diferentes edades, razas y apariencias; niños; sonidos (truenos, motos, aspiradoras); superficies (césped, baldosa, arena, rejillas); vehículos; situaciones de ciudad. Cada experiencia positiva es una inversión.' },
      { h: 'El error más común: esperar a las vacunas', p: 'Muchos veterinarios tradicionales dicen "no lo saques hasta terminar el esquema de vacunas" (que termina a las 16 semanas). El problema: eso cierra la ventana de socialización. La American Veterinary Society of Animal Behavior recomienda socialización antes de las 16 semanas en entornos controlados de bajo riesgo.' },
      { h: 'Socialización vs. exposición traumática', p: 'La calidad importa más que la cantidad. Un cachorro asustado ante algo nuevo que no puede escapar = experiencia traumática. La regla: siempre que pueda retirarse, siempre que sea su elección acercarse, siempre con refuerzo positivo. Forzar el contacto hace el daño opuesto.' },
      { h: 'Los signos de un perro mal socializado', p: 'Miedo a extraños, agresividad reactiva al correa, terror a sonidos específicos, incapacidad de estar en espacios públicos tranquilo. Estos no son problemas de raza: son problemas de historia temprana. La desensibilización adulta es posible pero mucho más lenta.' },
    ],
    stat: 'El Dr. Ian Dunbar, pionero en adiestramiento moderno, estima que la falta de socialización adecuada es la causa número 1 de eutanasia de perros adultos por problemas de comportamiento en USA.',
    tips: ['Lista de socialización: 100 experiencias antes de las 16 semanas', 'Clases de cachorros (puppy classes) con vet supervisión: la mejor inversión', 'Presentación a niños: siempre supervisada, siempre con permiso del niño', 'Paseos en brazos antes de completar vacunas: expone sin riesgo sanitario'],
    close: 'No hay segunda oportunidad para la socialización temprana. Pero hay esperanza: la desensibilización sistemática con un entrenador profesional puede mejorar significativamente a perros adultos reactivos.'
  },

  // ── FAMILIA ──────────────────────────────────────────────────────────────
  {
    id: 24, cat: 'familia', emoji: '🧬', color: '#E85D75',
    title: 'Por qué los millennials prefieren perros (los datos lo confirman)',
    sub: 'La generación que redefinió qué significa tener familia',
    date: 'Mayo 2025', read: 5,
    tags: ['millennials', 'tendencia', 'datos', 'pet parents'],
    lead: 'En USA, los millennials son la generación que más gasta en mascotas, que más los incluye en decisiones de vida (dónde vivir, con quién salir) y que más demora tener hijos. No es coincidencia: es un cambio generacional profundo en cómo definimos familia.',
    body: [
      { h: 'Los números', p: 'Los millennials (nacidos 1981-1996) representan el 32% del mercado de mascotas en USA, la porción más grande de cualquier generación. Gastan un promedio de $1,800 por año por mascota. El 76% considera a su perro un miembro de la familia, no una mascota.' },
      { h: 'Los perros como sustituto (y no)', p: 'Los medios hablan de "fur babies" como sustituto de hijos. La realidad es más compleja: muchos millennials que tienen hijos también tienen perros. La elección no es necesariamente en lugar de familia, sino en adición a, o antes que. Los altos costos de vivienda y la deuda estudiantil retrasan la paternidad, y los perros llenan parte del espacio afectivo.' },
      { h: 'El mercado que crearon', p: 'La demanda millennial explica el boom de: comida premium para mascotas, ropa y accesorios, seguros veterinarios, servicios de pet-sitting, redes sociales para perros, y dog-friendly businesses. Si un negocio acepta perros, los millennials lo prefieren.' },
      { h: 'La relación que construyeron', p: 'La generación anterior ponía al perro "afuera". Los millennials los llevan a todas partes: trabajo, viajes, cenas. Esta integración total del perro a la vida humana es genuinamente nueva y está redefiniendo la industria veterinaria, los espacios urbanos y la arquitectura residencial.' },
    ],
    stat: 'El 48% de los millennials sin hijos en USA tiene una mascota. El 24% dice que el costo del cuidado de mascotas es una razón para retrasar tener hijos, según un estudio de Rover.com (2023).',
    tips: [],
    close: 'Sea "sustituto" o "adición", la generación millennial redefinió la relación humano-perro para siempre. Y el mercado, la cultura y la ciencia del bienestar animal los siguen.'
  },

  // ── HISTORIAS ────────────────────────────────────────────────────────────
  {
    id: 25, cat: 'historias', emoji: '🇯🇵', color: '#1E90FF',
    title: 'Hachiko: la historia real del amor más leal del mundo',
    sub: 'El Akita que esperó 9 años. Los hechos que la película no mostró.',
    date: 'Mayo 2025', read: 5,
    tags: ['Hachiko', 'Japón', 'historia', 'lealtad'],
    lead: 'La historia de Hachiko es real. Un Akita japonés que esperó a su dueño en la estación de Shibuya durante 9 años después de su muerte. Pero hay detalles de la historia real que la película de 2009 con Richard Gere no mostró.',
    body: [
      { h: 'Los hechos reales', p: 'Hidesaburō Ueno, profesor de la Universidad Imperial de Tokio, adoptó a Hachiko en 1924. Cada día el perro lo acompañaba a la estación de Shibuya y lo esperaba a su regreso. En mayo de 1925, Ueno murió de un derrame cerebral mientras daba clases. Tenía 53 años. Hachiko continuó apareciendo en la estación cada tarde durante los siguientes 9 años, 9 meses y 15 días.' },
      { h: 'La vida real del perro que esperaba', p: 'Hachiko no vivía solo en la estación: fue adoptado por un ex-empleado de Ueno, Kikuzaburō Kobayashi. Los vendedores y empleados de la estación lo alimentaban y cuidaban. Se convirtió en celebridad nacional cuando un periodista publicó su historia en 1932. Turistas hacían viajes especiales a Shibuya para verlo.' },
      { h: 'La estatua y el legado', p: 'La primera estatua de Hachiko se inauguró en 1934, un año antes de su muerte, mientras el perro aún vivía. Hachiko estuvo presente en la inauguración. La estatua fue fundida durante la Segunda Guerra Mundial para uso bélico. La actual data de 1948 y es uno de los puntos de encuentro más famosos de Tokio.' },
      { h: 'El significado cultural', p: 'En Japón, Hachiko es símbolo nacional de lealtad (chūgi). Su historia se enseña en escuelas primarias. Su cuerpo está preservado en el Museo Nacional de Ciencias de Tokio. La Universidad de Tokio tiene una estatua suya junto a la de Ueno en el campus de Ueno.' },
    ],
    stat: 'Hachiko nació el 10 de noviembre de 1923 y murió el 8 de marzo de 1935. Tenía 11 años. Las pruebas post-mortem mostraron cáncer de pulmón avanzado y una infestación de filarias. Murió en la misma calle donde solía esperar.',
    tips: [],
    close: 'Hachiko no entendía la muerte. Solo entendía que Ueno llegaba por esa vía cada tarde y él debía estar ahí. Esa simplicidad de propósito es, quizás, lo que lo hizo tan profundamente humano.'
  },
  {
    id: 26, cat: 'historias', emoji: '🏁', color: '#E86535',
    title: 'Arthur: el perro que se unió a una carrera de aventura en Ecuador',
    sub: 'La historia real del perro callejero que se ganó un hogar cruzando 500 km',
    date: 'Abril 2025', read: 5,
    tags: ['Arthur', 'Ecuador', 'adopción', 'aventura'],
    lead: 'En 2014, durante una carrera de aventura de 430 km en Ecuador, un perro callejero comenzó a seguir al equipo sueco Peak Performance. Lo siguió durante días, cruzó ríos, montañas y selva. Al final, el capitán del equipo lo adoptó y lo llevó a Suecia.',
    body: [
      { h: 'La carrera', p: 'La Adventure Racing World Championship en Ecuador es una de las carreras más duras del mundo: equipos de 4 personas corren durante días sin parar a través de terrenos salvajes. El equipo Peak Performance estaba en el kilómetro 140 cuando el perro apareció, atraído por un trozo de meatball que el capitán Mikael Lindnord le ofreció.' },
      { h: 'El perro que no se fue', p: 'Nadie esperaba que Arthur siguiera. Los perros callejeros aparecen y desaparecen. Pero Arthur siguió durante días completos, cruzando un río de corriente fuerte donde los corredores tuvieron que jalarlo dentro de la barca porque no podía cruzar solo. Eso fue el momento en que Lindnord decidió llevárselo.' },
      { h: 'Los trámites que nadie esperaba', p: 'Al final de la carrera, conseguir los permisos para sacar a Arthur de Ecuador y llevarlo a Suecia tomó semanas. Un vet local, cuarentena, documentación, vacunas. El equipo atrasó su vuelo de regreso. Cuando finalmente Arthur llegó a Suecia, salió a recibirlo como a un miembro más de la familia.' },
      { h: 'El legado de la historia', p: 'Mikael Lindnord escribió el libro "Arthur: The Dog Who Crossed the Jungle to Find a Home". La organización Arthur Foundation que crearon ha facilitado la adopción de más de 200 perros callejeros latinoamericanos en hogares europeos.' },
    ],
    stat: 'Arthur llegó a Suecia el 3 de enero de 2015. Vivió con la familia Lindnord hasta su muerte en 2020 a los aproximadamente 10 años. Su historia fue publicada en 28 países.',
    tips: [],
    close: 'Arthur no corrió 500 km por disciplina ni por entrenamiento. Lo hizo porque un humano le ofreció comida con gentileza en el momento exacto. A veces así empieza el amor más importante.'
  },
  {
    id: 27, cat: 'historias', emoji: '🚇', color: '#7C3AED',
    title: 'Amsterdam: la ciudad más dog-friendly del mundo',
    sub: 'Por qué los perros viajan gratis en metro y van a los restaurantes',
    date: 'Abril 2025', read: 4,
    tags: ['Amsterdam', 'Europa', 'dog-friendly', 'ciudad'],
    lead: 'Amsterdam tiene más bicicletas que personas y más perros por capita que cualquier ciudad europea comparable. Los perros viajan gratis en el transporte público, entran a la mayoría de tiendas y son bienvenidos en cafés y restaurantes. No es accidente: es política pública y cultura.',
    body: [
      { h: 'Los números de la ciudad', p: 'Amsterdam tiene una población humana de 900,000 personas y se estiman 200,000 perros registrados. Eso es un perro por cada 4.5 personas, una de las densidades más altas de Europa. Los impuestos de tenencia de perros fueron abolidos en 2016, simplificando la regularización de mascotas.' },
      { h: 'El transporte público: gratis para perros', p: 'Los perros pequeños en transportadora viajan gratis en el GVB (metro y tranvía de Amsterdam). Los perros grandes necesitan un ticket reducido. No hay restricción de horario ni de razas. La cultura del transporte canino está tan normalizada que ver un pastor alemán en el metro no hace girar ni una cabeza.' },
      { h: 'La infraestructura canina', p: 'La ciudad tiene más de 200 parques y áreas oficialmente designadas para perros sin correa. Los "hondenuitlaatstrookjes" (literalmente "tiras de paseo de perros") son franjas de jardines en las aceras designadas para que los perros hagan sus necesidades, con dispensadores de bolsas. La multa por no recoger es de €140.' },
      { h: 'La cultura detrás de la política', p: 'Holanda tiene una relación histórica profunda con los animales. Es el primer país en el mundo en no tener perros callejeros (según datos de 2016): no por sacrificio masivo sino por esterilización, educación y programas de adopción. El modelo se estudia internacionalmente.' },
    ],
    stat: 'Holanda fue el primer país del mundo en eliminar los perros callejeros sin recurrir a la eutanasia masiva. El programa nacional de esterilización y adopción tardó 30 años en lograr el resultado.',
    tips: [],
    close: 'Lo que hace a Amsterdam ejemplar no es solo que sea "simpática con perros". Es que construyó una infraestructura, una política y una cultura donde la tenencia responsable de animales es la norma, no la excepción.'
  },
  {
    id: 28, cat: 'historias', emoji: '🏠', color: '#1EB87A',
    title: 'La pandemia que nos dio perros: una generación de adoptantes',
    sub: 'Cómo el COVID-19 cambió para siempre la relación humano-perro',
    date: 'Marzo 2025', read: 5,
    tags: ['pandemia', 'adopción', 'COVID', 'salud mental'],
    lead: 'En 2020 y 2021, los refugios de animales de USA y Europa vaciaron sus instalaciones por primera vez en décadas. La pandemia creó la mayor ola de adopciones de mascotas de la historia moderna. También creó una crisis post-pandémica que pocos anticiparon.',
    body: [
      { h: 'La ola de adopciones', p: 'Entre marzo y diciembre de 2020, los refugios de USA reportaron un aumento promedio del 34% en adopciones. En ciudades como Nueva York, Los Ángeles y Miami, los tiempos de espera para adoptar alcanzaron semanas. Muchos refugios reportaron cero disponibilidad por primera vez.' },
      { h: 'Por qué adoptamos', p: 'Cuarentena + soledad + trabajo desde casa = contexto perfecto para un perro. De repente teníamos tiempo, estábamos en casa todo el día y necesitábamos compañía. Los perros ofrecían rutina, contacto físico y presencia cuando todo lo demás era incertidumbre.' },
      { h: 'La crisis post-pandémica', p: 'Cuando la pandemia terminó y la gente volvió a las oficinas, los refugios comenzaron a recibir "devoluciones" masivas. Perros adoptados sin preparación adecuada, por impulso, que ahora no encajaban en la vida post-cuarentena. Fue la cara oscura de la ola de adopciones.' },
      { h: 'El legado permanente', p: 'A pesar de las devoluciones, el efecto neto fue positivo: millones de perros encontraron hogares que no habrían encontrado sin la pandemia. Y para los dueños que mantuvieron su compromiso, el vínculo creado durante meses de encierro fue inusualmente profundo.' },
    ],
    stat: 'La ASPCA estima que entre 2020 y 2021 se adoptaron o acogieron temporalmente 23 millones de animales en USA. El 90% de esos dueños reportan que mantuvieron a sus mascotas post-pandemia.',
    tips: [],
    close: 'La pandemia nos forzó a desacelerar y muchos de nosotros encontramos en un perro la compañía que la velocidad normal de la vida no dejaba espacio para buscar. Para ellos y para nosotros, fue una segunda oportunidad.'
  },
  {
    id: 29, cat: 'historias', emoji: '🌏', color: '#1E90FF',
    title: 'Los pueblos de Japón gobernados por perros (y gatos)',
    sub: 'La historia detrás de los alcaldes caninos más adorables del mundo',
    date: 'Marzo 2025', read: 4,
    tags: ['Japón', 'alcalde', 'viral', 'historia'],
    lead: 'En Japón existen varias ciudades y pueblos que han "elegido" alcaldes caninos y felinos. No es una broma: son estrategias oficiales de revitalización turística y económica que han resultado extraordinariamente exitosas.',
    body: [
      { h: 'Ozu y su alcalde canino', p: 'La ciudad de Ozu en la prefectura de Ehime designó a Rao, un Shiba Inu de 7 años, como "alcalde honorario" en 2018. El objetivo era atraer turismo. El resultado: las visitas a la ciudad aumentaron un 300% en el primer año. Rao tiene más seguidores en Instagram que el alcalde humano.' },
      { h: 'Tama: la gata alcaldesa que salvó un tren', p: 'La historia más famosa es Tama, una gata calicó que fue nombrada "jefe de estación" de la estación Kishi en 2007. La línea ferroviaria estaba a punto de cerrar por pérdidas. El turismo generado por Tama salvó la línea. Se estima que generó 1.1 billones de yenes en la economía local.' },
      { h: 'Por qué funciona', p: 'Japón tiene un problema de despoblación rural severo: los pueblos pequeños pierden residentes jóvenes a las ciudades. Las mascotas-alcalde son estrategias de marketing territorial que usan la viralidad de las redes sociales y el amor cultural japonés por los animales para atraer visitantes.' },
      { h: 'El modelo se exporta', p: 'Inspirados por Japón, ciudades en UK, USA y Australia han designado alcaldes caninos. Cormorant, Minnesota, tiene a Duke el Gran Danés como alcalde (reelecto 4 veces). Rabbit Hash, Kentucky, elige alcaldes caninos desde 1998 y ha recaudado miles de dólares para la comunidad.' },
    ],
    stat: 'Duke el Gran Danés, alcalde de Cormorant Township, Minnesota, fue reelecto por cuarta vez en 2022 con el 100% de los votos. La boleta de votación costaba $1 donado a causas locales.',
    tips: [],
    close: 'Hay algo genuinamente hermoso en que comunidades humanas, ante sus problemas más complejos, hayan encontrado en un perro o un gato no solo una solución económica sino también un símbolo de esperanza.'
  },
  {
    id: 30, cat: 'historias', emoji: '🏥', color: '#E85D75',
    title: 'La ciencia de los perros de terapia en hospitales',
    sub: 'Cómo los animales aceleran la recuperación de pacientes reales',
    date: 'Febrero 2025', read: 5,
    tags: ['terapia', 'hospital', 'ciencia', 'salud'],
    lead: 'Los perros de terapia ya son presencia regular en hospitales, residencias de ancianos y centros oncológicos de USA y Europa. No es sentimental: hay décadas de investigación mostrando efectos medibles en dolor, ansiedad y recuperación.',
    body: [
      { h: 'Los datos que convencieron a los hospitales', p: 'Un estudio del Loyola University Medical Center encontró que pacientes que recibieron visitas de perros de terapia necesitaron significativamente menos analgésicos post-cirugía. La interacción canina aumenta endorfinas y reduce la percepción del dolor sin efectos secundarios.' },
      { h: 'Oncología y pediatría: los usos más documentados', p: 'En oncología, los perros de terapia reducen la ansiedad pre-quimioterapia y mejoran el humor general durante el tratamiento. En pediatría, los niños hospitalizados con acceso a terapia canina muestran menor presión arterial, mayor cooperación con procedimientos médicos y menor estrés parental.' },
      { h: 'Cómo se certifican', p: 'En USA, los perros de terapia son certificados por organizaciones como Pet Partners o Therapy Dogs International. Requieren evaluación de temperamento, entrenamiento básico obediencia, vacunas al día y un examen de aptitud para entornos médicos. No cualquier perro puede ser perro de terapia.' },
      { h: 'La diferencia con ESA y perros de servicio', p: 'Perro de terapia: trabaja en instituciones, no tiene derechos de acceso público, no tiene dueño-usuario específico. Perro de servicio: entrenado para tarea específica, acceso garantizado por ADA, pertenece a persona con discapacidad. ESA: apoyo emocional para dueño específico, sin entrenamiento especializado.' },
    ],
    stat: 'El 20% de los hospitales en USA tienen programas activos de terapia asistida con animales según la American Hospital Association. En 2015 era el 5%. El crecimiento refleja la evidencia acumulada.',
    tips: [],
    close: 'La medicina convencional tardó décadas en reconocer lo que muchos pacientes sabían intuitivamente: la presencia de un animal en momentos de dolor o miedo cambia algo fundamental en cómo experimentamos esa dificultad.'
  },
  {
    id: 31, cat: 'historias', emoji: '🌟', color: '#F58220',
    title: 'El refugio de Texas que adoptó 1,000 perros en un año',
    sub: 'Cómo Operation Kindness redefinió el modelo de refugio animal',
    date: 'Febrero 2025', read: 4,
    tags: ['refugio', 'adopción', 'Texas', 'no kill'],
    lead: 'Operation Kindness en Dallas, Texas, es uno de los refugios de animales más antiguos y exitosos de USA. Fundado en 1971, fue pionero del movimiento "no-kill" décadas antes de que se pusiera de moda. Su modelo ha influenciado refugios en todo el mundo.',
    body: [
      { h: 'El modelo no-kill: qué significa realmente', p: '"No-kill" no significa que nunca eutanasian: significa que la eutanasia es solo por enfermedad terminal o comportamiento que representa peligro real. La meta es una tasa de salida viva superior al 90%. Operation Kindness consistentemente supera el 95%.' },
      { h: 'Cómo logran las cifras', p: 'Programa de foster activo (animales en hogares temporales en lugar de jaulas), marketing agresivo de adopciones, eventos de "feria de adopción" frecuentes, asociaciones con empresas locales, y un programa de medicina veterinaria de bajo costo que reduce devoluciones por costos médicos.' },
      { h: 'El rol de la comunidad', p: 'Operation Kindness tiene más de 400 voluntarios activos y una red de 200+ familias de foster. Sus eventos de adopción no son solo en el refugio: llevan animales a breweries, parques y eventos comunitarios. La adopción va a donde está la gente.' },
      { h: 'El impacto medido', p: 'En 2023, Operation Kindness facilitó 4,847 adopciones, 1,563 programas de foster y recolocó 412 animales con otras organizaciones. Su presupuesto anual de $8 millones es financiado 100% por donaciones privadas sin apoyo gubernamental.' },
    ],
    stat: 'Desde su fundación en 1971, Operation Kindness ha salvado y encontrado hogares para más de 175,000 animales en el norte de Texas, convirtiéndose en modelo de referencia para refugios en USA y Latinoamérica.',
    tips: [],
    close: 'El modelo de Operation Kindness demuestra que "no-kill" no es ideología: es operación eficiente, comunidad comprometida y marketing inteligente. Es replicable. Y en muchas ciudades de USA y el mundo, está siendo replicado.'
  },

  // ── VIAJE ────────────────────────────────────────────────────────────────
  {
    id: 32, cat: 'viaje', emoji: '🌴', color: '#1EB87A',
    title: 'Los mejores parques dog-friendly de Miami y sus alrededores',
    sub: 'Guía real para pasear, soltar y socializar en el sur de Florida',
    date: 'Mayo 2025', read: 5,
    tags: ['Miami', 'Florida', 'parques', 'dog-friendly'],
    lead: 'Miami no es la ciudad más dog-friendly de USA, pero tiene una escena canina sólida con varios parques de calidad, playas que permiten perros y una comunidad activa de dueños. Esta es la guía real, no la lista de Google.',
    body: [
      { h: 'Amelia Earhart Dog Park (Hialeah)', p: 'El parque de perros más grande del área metro con más de 5 acres. Tiene áreas separadas para perros grandes y pequeños, agua disponible, sombra real (algo raro en Miami) y buena comunidad de regulares. Abierto de 7am a 7pm.' },
      { h: 'Bayfront Dog Park (Miami Beach)', p: 'Vistas al bay, suelo de pasto y concreto, bien mantenido. Congestionado en fines de semana desde las 8am. Mejor ir entre semana en horas de mañana. Parking limitado en la zona; ir en bicicleta si puedes.' },
      { h: 'Dog Beach en Fort Lauderdale', p: 'Una de las pocas playas del sur de Florida donde los perros pueden estar sin correa. Fort Lauderdale Dog Beach (Sunrise Boulevard) tiene acceso directo al océano. Agua, arena, olas. El sueño de cualquier perro. Ir temprano en la mañana antes del calor.' },
      { h: 'Tropical Park Dog Run (Miami)', p: 'Dentro del Tropical Park, tiene áreas separadas, bebederos y buena sombra. Es parte de un parque más grande con lago, pistas de atletismo y áreas de picnic. Ideal para dueños que también quieren actividad propia.' },
    ],
    stat: 'Miami-Dade County tiene 18 dog parks oficiales distribuidos en sus municipios. El número creció un 40% entre 2018 y 2024 en respuesta a la presión de organizaciones de dueños de mascotas.',
    tips: ['Lleva siempre agua propia: los bebederos de parques fallen frecuentemente', 'Vacunas al día: bordetella (tos de perreras) especialmente importante en parques', 'Ir entre semana mañana temprano: mejor socialización, menos caos', 'Perros en calor (celo) no deben entrar a parques de acceso libre'],
    close: 'La escena dog-friendly de Miami sigue creciendo. Restaurantes con terraza pet-friendly, hoteles que aceptan mascotas y eventos caninos mensuales hacen del sur de Florida un lugar cada vez más compatible con la vida con perros.'
  },
  {
    id: 33, cat: 'viaje', emoji: '🛎️', color: '#7C3AED',
    title: 'Hoteles y restaurantes pet-friendly en USA: cómo encontrarlos (de verdad)',
    sub: 'Más allá del cartel "We love pets": lo que realmente necesitas saber',
    date: 'Abril 2025', read: 4,
    tags: ['hotel', 'restaurante', 'pet-friendly', 'viaje'],
    lead: 'Muchos hoteles dicen ser "pet-friendly" pero tienen restricciones de tamaño (under 20 lbs), razas prohibidas, depósitos altos y políticas que hacen el viaje más estresante que sin perro. Esta es la guía para encontrar los que genuinamente lo son.',
    body: [
      { h: 'Las cadenas que sí cumplen', p: 'Kimpton Hotels es el estándar oro: sin restricciones de tamaño ni raza, sin cargo adicional, con amenities caninas (cama, plato, juguete) en muchas propiedades. La Quinta permite mascotas sin cargo en casi todas sus propiedades. Loews Hotels es consistentemente pet-friendly con verdadera infraestructura canina.' },
      { h: 'Cómo verificar antes de reservar', p: 'Siempre llama directamente al hotel (no reserves por app sin confirmar). Pregunta: ¿hay restricción de peso?, ¿hay razas prohibidas?, ¿cuánto es el depósito (reembolsable o no)?, ¿puede quedar solo en la habitación?. Las respuestas definen si la estadía es viable.' },
      { h: 'Restaurantes: la ley de USA', p: 'En USA, la salud pública federal prohíbe animales en espacios de preparación y consumo de alimentos. Pero los estados pueden hacer excepciones para terraza exterior. Florida, California, Texas y Nueva York tienen políticas de terraza pet-friendly más permisivas. Siempre preguntar antes de sentarte con el perro.' },
      { h: 'Recursos para encontrarlos', p: 'Bring Fido (bringfido.com) es el directorio más completo de hoteles, restaurantes, playas y actividades pet-friendly en USA y el mundo. Pet-Friendly Hotels (petfriendlyhotels.com) permite filtrar por tamaño, raza y cargo adicional. Google Maps también tiene filtro de "permite mascotas" en algunos establecimientos.' },
    ],
    stat: 'El 78% de los viajeros con mascotas en USA dicen que la política pet-friendly de un hotel es el factor más importante en la elección del alojamiento, por encima del precio, según Expedia (2023).',
    tips: ['Kimpton Rewards: acumula puntos y tienes la cadena más pet-friendly de USA', 'Lleva la cama de tu perro: reduce ansiedad en entorno desconocido', 'Siempre confirmar por teléfono aunque la web diga pet-friendly', 'Dejar propina extra en hoteles donde el perro se queda en habitación solo'],
    close: 'Viajar con perro requiere más planificación, pero los destinos y alojamientos pet-friendly genuinos están aumentando. La demanda de la comunidad de dueños de mascotas está cambiando la industria hotelera más rápido de lo que imaginamos.'
  },
  {
    id: 34, cat: 'guias', emoji: '💉', color: '#2D6A4F',
    title: 'Las vacunas que tu perro necesita y el calendario real',
    sub: 'Sin exageraciones ni omisiones: la guía médica que sí puedes entender',
    date: 'Febrero 2025', read: 5,
    tags: ['vacunas', 'salud', 'veterinario', 'prevención'],
    lead: 'El tema de vacunas genera más confusión entre dueños de perros que casi cualquier otro. Hay vacunas obligatorias y opcionales, hay calendarios que varían por región y hay mucha desinformación circulando en redes. Aquí va la guía médica real.',
    body: [
      { h: 'Las vacunas core (obligatorias para todos)', p: 'DHPP o DA2PP: la vacuna combinada contra Distemper (moquillo), Hepatitis, Parvovirus y Parainfluenza. Se aplica en serie de cachorros (6-8 semanas, 10-12 semanas, 14-16 semanas, 12-16 meses) y luego cada 3 años. Rabia: obligatoria por ley en todos los estados de USA. Primera a las 12-16 semanas, refuerzo al año, luego cada 1-3 años según la vacuna.' },
      { h: 'Las vacunas no-core (según estilo de vida)', p: 'Bordetella (tos de perreras): recomendada si va a parques, peluquerías o guarderías. Leptospirosis: si hay exposición a agua estancada o fauna salvaje. Lyme: si vives en zona con garrapatas (noreste de USA principalmente). Influenza canina: si viaja o usa guarderías frecuentemente.' },
      { h: 'El debate sobre la sobre-vacunación', p: 'Algunos veterinarios holísticos argumentan que vacunar anualmente es excesivo. La evidencia científica actual (WSAVA guidelines) respalda el sistema de vacunas core cada 3 años para adultos, no anuales. Lo que sí es anual: la revisión veterinaria y las vacunas no-core según exposición.' },
      { h: 'Títulos de anticuerpos: la alternativa', p: 'Para perros que han completado el esquema básico, se puede hacer un titer test: análisis de sangre que mide si el perro tiene anticuerpos suficientes contra distemper y parvovirus. Si los niveles son adecuados, no necesita revacunar ese año. Es más caro que la vacuna pero da información real.' },
    ],
    stat: 'El parvovirus canino tiene una tasa de mortalidad del 91% en cachorros no vacunados. Con vacunación completa y tratamiento oportuno, la supervivencia supera el 85%. Es el argumento más claro para el esquema vacunal correcto.',
    tips: ['Guarda el carnet de vacunas físico Y en foto en tu teléfono', 'Rabia al día es requerimiento legal para la mayoría de vuelos domésticos', 'Bordetella obligatoria en la mayoría de guarderías y peluquerías', 'Pregunta a tu vet si el titer test es opción antes de revacunar core'],
    close: 'Las vacunas no son un negocio del veterinario: son la razón por la que el parvovirus, que diezmaba camadas enteras en los 70, hoy es prevenible casi al 100%. Es el acto de cuidado más básico y eficiente que puedes hacer.'
  },
];

// Helper: get all unique categories in BLOG
const BLOG_CATS = ['todos', ...Object.keys(CAT_META)];

Object.assign(window, { BLOG, CAT_META, BLOG_CATS });
