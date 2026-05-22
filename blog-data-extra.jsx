// blog-data-extra.jsx — Artículos adicionales: accesorios + grooming

// Agregar categoría grooming a CAT_META
CAT_META['grooming'] = { label: 'Grooming', color: '#9C27B0', bg: '#F3E5F5' };

const BLOG_EXTRA = [
  // ── ACCESORIOS ───────────────────────────────────────────────────────────
  {
    id: 35, cat: 'guias', emoji: '🎒', color: '#F58220',
    title: 'Los 15 accesorios esenciales para el nuevo dueño de perro',
    sub: 'Lo que realmente necesitas desde el día uno — sin gastar de más',
    date: 'Mayo 2025', read: 7,
    tags: ['accesorios', 'cachorro', 'nuevo dueño', 'compras'],
    lead: 'Adoptar un perro por primera vez es emocionante y abrumador a la vez. El mercado tiene miles de productos, la mayoría innecesarios. Esta es la lista real de lo que sí necesitas desde el primer día — con criterios para elegir bien.',
    body: [
      { h: '1. Arnés (no collar) desde el inicio', p: 'El arnés distribuye la presión en el pecho en lugar del cuello, esencial para cachorros y razas con cuello delicado. El PetSafe Easy Walk o Ruffwear Front Range son los más recomendados por entrenadores. Nunca empieces con collar hasta que el perro camine sin jalar.' },
      { h: '2. Crate o jaula de entrenamiento', p: 'El crate no es una cárcel: es el hogar del perro dentro de tu hogar. Fundamental para el entrenamiento de baño, la gestión de ansiedad y viajes. Talla correcta: el perro debe poder ponerse de pie, girar y acostarse. Ni grande ni pequeño.' },
      { h: '3. Cama ortopédica', p: 'Las camas de espuma de memoria previenen problemas articulares en el largo plazo. Razas grandes especialmente se benefician. Big Barker y Orvis son las marcas más respaldadas por veterinarios. Invertir aquí desde cachorro es prevención, no lujo.' },
      { h: '4. Dispensador interactivo de comida (KONG)', p: 'El KONG Classic es probablemente el mejor accesorio que existe. Rellénalo con comida húmeda o mantequilla de maní y congelado ocupa al cachorro 20-40 minutos. Imprescindible para crate training, horas solas y estimulación mental diaria.' },
      { h: '5. Slow feeder o comedero antiansiedad', p: 'Perros que comen demasiado rápido pueden desarrollar problemas digestivos serios (incluyendo GDV en razas grandes). Un comedero con laberintos ralentiza la ingesta al menos un 50%. Inversión de $15 que puede evitar emergencias veterinarias.' },
      { h: '6. Limpiador enzimático para accidentes', p: "Nature's Miracle o Rocco & Roxie son los estándares del mercado. Los limpiadores normales no eliminan los marcadores de olor que llevan al perro a repetir en el mismo spot. El limpiador enzimático sí los descompone completamente." },
      { h: '7. Kit de aseo básico', p: 'Mínimo: cepillo apropiado para el tipo de pelaje (slicker para pelo largo, goma para pelo corto), cortauñas canino o lima eléctrica, y champú neutro. La frecuencia de baño depende de la raza: de semanal a mensual. El cepillado de dientes desde cachorro es crucial.' },
      { h: '8. Correa de 6 pies + correa retráctil para parque', p: 'Una correa fija de 1.5-2m para caminatas de entrenamiento (control y seguridad vial). Una retráctil de 5m solo para parques y espacios abiertos — nunca en calle con tráfico. Las retráctiles en ciudad son accidentes esperando ocurrir.' },
      { h: '9. Juguetes de diferentes texturas', p: 'El juego es necesidad cognitiva, no opcional. Necesitas al menos 3 tipos: un juguete de masticación resistente, uno interactivo de buscar/jalar, y uno de puzzle. Rota los juguetes semanalmente para mantener la novedad sin comprar nuevos.' },
      { h: '10. Bolsa de entrenamiento + premios pequeños', p: 'Una bolsa de treats que se use en la cintura te libera las manos durante el entrenamiento. Los premios deben ser del tamaño de un garbanzo máximo. Pollo cocido, queso bajo en grasa o premios liofilizados son más atractivos que galletas secas para mantener atención.' },
    ],
    stat: 'El dueño promedio de perro nuevo gasta $1,200-$2,500 en el primer año en accesorios. El 40% de ese gasto es en productos que no usan después del primer mes, según la APPA.',
    tips: [
      'Compra el crate antes de que llegue el perro: que tenga tiempo de familiarizarse',
      'Amazon Subscribe & Save da 15% de descuento en consumibles (shampoo, treats, pads)',
      'No compres ropa hasta saber si tu perro la tolera: muchos la odian',
      'La tienda de BPuppy tiene los productos que recomendamos con links verificados'
    ],
    close: 'La clave no es tener todo desde el día uno: es tener las cosas correctas. Arnés, crate, KONG y limpiador enzimático ya te ponen muy por delante del dueño promedio. El resto lo vas agregando según las necesidades reales de tu perro.'
  },
  {
    id: 36, cat: 'guias', emoji: '🐱', color: '#E85D75',
    title: 'Los 12 accesorios que todo dueño de gato necesita desde el día uno',
    sub: 'La guía honesta para empezar sin errores ni gastos innecesarios',
    date: 'Mayo 2025', read: 6,
    tags: ['accesorios', 'gato', 'nuevo dueño', 'compras'],
    lead: 'Los gatos son independientes pero sus necesidades de espacio, estimulación y sanidad son muy específicas. Un entorno mal equipado genera estrés felino, y el estrés en gatos aparece como comportamientos destructivos, problemas de salud y mal uso del arenero. Esta lista previene todo eso.',
    body: [
      { h: '1. Arenero: uno más que el número de gatos', p: 'La regla es n+1: si tienes un gato, necesitas 2 areneros. Si tienes dos, necesitas 3. Los gatos son extraordinariamente limpios y rechazan areneros sucios o con olor. Caja destapada en zona tranquila, limpieza diaria, cambio completo de arena cada 2 semanas.' },
      { h: '2. Arena de calidad: marca la diferencia', p: 'Las arenas aglomerantes sin polvo son el estándar actual. Dr. Elsey\'s Cat Ultra y Ever Clean son las mejor evaluadas por veterinarios. Evitar arenas perfumadas: el olfato felino es 14 veces más sensible que el humano y los perfumes artificiales son rechazados activamente.' },
      { h: '3. Árbol rascador y cat tree', p: 'Los gatos necesitan rascar: es marcaje territorial, estiramiento y mantenimiento de uñas. Si no les das superficie apropiada, eligen tus muebles. Un árbol con plataformas altas también satisface la necesidad felina de observar su territorio desde altura.' },
      { h: '4. Fuente de agua', p: 'Los gatos domésticos beben muy poca agua por instinto (sus ancestros obtenían hidratación de las presas). Una fuente con agua en movimiento estimula el consumo y reduce el riesgo de enfermedad renal, la principal causa de muerte en gatos domésticos mayores. Drinkwell y Catit son las marcas más usadas.' },
      { h: '5. Juguetes de estimulación activa', p: 'Los gatos necesitan "caza simulada" diaria: 2 sesiones de 10-15 minutos con varita interactiva satisfacen su instinto predatorio. Sin eso, dirigen esa energía hacia comportamientos problemáticos. Los juguetes de batería (pelotas motorizadas, peces que se mueven) extienden el juego cuando no estás.' },
      { h: '6. Transportadora cómoda', p: 'La transportadora que usarás para el vet, viajes y emergencias debe introducirse como espacio positivo desde el primer día, no solo cuando van al veterinario. Déjala abierta en casa con una manta suave adentro. Un gato familiarizado con su transportadora viaja con mucho menos estrés.' },
      { h: '7. Rascador horizontal y vertical', p: 'Algunos gatos prefieren rascar horizontal (cartón corrugado), otros vertical (sisal). Ofrece ambas opciones al inicio para descubrir la preferencia de tu gato. Los rascadores de cartón son económicos y la mayoría de gatos los adoran.' },
      { h: '8. Dispensador automático o comedero elevado', p: 'Los gatos se benefician de alimentación en porciones controladas (especialmente razas propensas a obesidad como Maine Coon o gatos castrados). Un comedero elevado reduce la presión cervical. Si trabajas fuera, un dispensador automático con programación hace el trabajo.' },
    ],
    stat: 'El 58% de los gatos en USA tienen sobrepeso u obesidad, según la APOP (Association for Pet Obesity Prevention). La causa principal: libre acceso a comida y falta de estimulación física activa.',
    tips: [
      'Introduce al gato nuevo en un cuarto solo por los primeros 3-7 días: facilita la adaptación',
      'Feliway difusor de feromonas: reduce el estrés del primer mes significativamente',
      'Chips de identificación: obligatorio aunque sea gato de interior (se escapan)',
      'Revisa nuestra tienda para los productos recomendados con mejores precios'
    ],
    close: 'Un gato en un entorno bien equipado es un gato tranquilo, saludable y con buen carácter. La mayoría de "problemas de comportamiento felino" son respuestas lógicas a un entorno que no cubre sus necesidades. Cubre las necesidades, desaparecen los problemas.'
  },

  // ── GROOMING ─────────────────────────────────────────────────────────────
  {
    id: 37, cat: 'grooming', emoji: '✂️', color: '#9C27B0',
    title: 'Las tendencias de grooming que arrasan en 2025',
    sub: 'De los cortes creativos asiáticos al grooming ecológico: lo que está de moda',
    date: 'Mayo 2025', read: 5,
    tags: ['grooming', 'tendencias', '2025', 'cortes'],
    lead: 'El grooming canino se convirtió en una forma de expresión artística. Lo que antes era solo "baño y corte" hoy incluye tintes seguros, cortes arquitectónicos y estilos que hacen que las fotos de los perros sean más virales que las de sus dueños.',
    body: [
      { h: 'El grooming asiático: la tendencia más popular', p: 'Originado en Japón y Taiwan, el "Asian Fusion grooming" exagera las proporciones del perro de forma adorable: cabeza redonda tipo burbuja, patas cilíndricas, cara con volumen esférico. Las razas con pelo continuo (Poodle, Bichón, Maltés, Shih Tzu) son las más adaptables. El resultado son fotos que se viralizan inevitablemente.' },
      { h: 'Tintes seguros para mascotas: arte canino', p: 'Los tintes para mascotas formulados sin peroxide, ammonia ni PPD son seguros para el pelaje. El "creative grooming" incluye mechas, puntas de color, patrones geométricos y hasta degradados. El negocio en USA genera millones anuales. En Miami, la demanda de grooming creativo creció 60% en 2023.' },
      { h: 'Grooming ecológico: la tendencia de valores', p: 'Shampoos biodegradables, envases recargables, toallas de microfibra en lugar de secadoras de alto consumo energético, y productos sin sulfatos ni parabenos. Los dueños millennials preguntan específicamente por opciones eco-friendly y muchos salones están respondiendo con certificaciones cruelty-free.' },
      { h: 'El grooming de spa: experiencia premium', p: 'Más allá del baño y corte: aromaterapia con aceites esenciales seguros, masajes de relajación, tratamientos de hidratación profunda del pelaje, y barro desintoxicante. Los salones premium ofrecen paquetes de spa que incluyen tiempo de relajación post-tratamiento antes de la recogida.' },
    ],
    stat: 'La industria global de grooming de mascotas superó los $11 billones USD en 2024 y se proyecta a $19 billones para 2030. El crecimiento está impulsado por el segmento premium y creative grooming.',
    tips: [
      'Para grooming asiático: necesitas al menos 3 meses de crecimiento de pelo previo',
      'Los tintes seguros duran 4-8 semanas dependiendo del pelaje y frecuencia de baño',
      'El grooming creativo aumenta el costo del servicio entre 40-80% sobre el precio base',
      'Pregunta siempre si los productos son testados en mascotas y libres de PPD'
    ],
    close: 'El grooming ya no es mantenimiento: es identidad. Y si tu perro termina siendo más seguido en Instagram que tú, eso es completamente aceptable.'
  },
  {
    id: 38, cat: 'grooming', emoji: '🐕', color: '#7C3AED',
    title: 'El corte perfecto para cada raza: guía visual para dueños',
    sub: 'Qué pedirle al groomer y qué esperar según la raza de tu perro',
    date: 'Abril 2025', read: 6,
    tags: ['grooming', 'razas', 'cortes', 'pelaje'],
    lead: 'Llegas al groomer y dices "córtale el pelo". El resultado no es lo que imaginabas. Esto pasa cuando no conoces los nombres correctos de los cortes para tu raza. Esta guía te da el vocabulario y los criterios para comunicarte bien y obtener lo que quieres.',
    body: [
      { h: 'Poodle: el rey del grooming artístico', p: 'Los cortes estándar de Poodle tienen nombre propio: Continental Clip (concurso), Sporting Clip (funcional y elegante), Puppy Clip (pelo uniformemente corto en todo el cuerpo) y el Teddy Bear Cut (cara redondeada, pelo corto uniforme). Para la mayoría de dueños, el Teddy Bear o Puppy Clip son los más prácticos.' },
      { h: 'Golden Retriever y Labrador: lo menos es más', p: 'Estas razas NO deben rasurarse nunca: su doble capa regula temperatura tanto en calor como en frío. El grooming correcto es: baño con shampoo deslanador, secado profesional con soplador de alta velocidad, y despelote (deslanado) con Furminator. Un Golden bien deslanado pierde la mitad del pelo flotante.' },
      { h: 'Schnauzer: el corte que define la raza', p: 'El Schnauzer tiene un corte tradicional muy específico: cuerpo rapado corto con tijera en lomo, falda larga en la barriga y patas, y bigote y cejas pronunciados. Hay variaciones modernas (cuerpo más largo, cara más redondeada) pero el corte clásico es el que mejor respeta la morfología de la raza.' },
      { h: 'Yorkshire y Maltés: pelo largo vs. puppy cut', p: 'El pelo largo (floor-length) requiere cepillado diario sin excepción. El Puppy Cut (pelo uniformemente corto a 2-4cm) es idéntico en estética pero de mantenimiento radicalmente más fácil. Para dueños que no tienen tiempo de cepillar diariamente, el Puppy Cut es la opción responsable.' },
      { h: 'Cocker Spaniel y Shih Tzu: el equilibrio difícil', p: 'Ambas razas tienen pelaje que requiere grooming profesional cada 6-8 semanas. El Cocker tiene un corte de concurso elaborado pero la mayoría de groomers ofrece una versión práctica que mantiene la forma característica sin el extremo mantenimiento del corte de show.' },
    ],
    stat: 'El 67% de los dueños de razas con pelo continuo no saben el nombre del corte correcto para su raza, según una encuesta de la National Dog Groomers Association of America. Esto genera frustración recurrente en las visitas de grooming.',
    tips: [
      'Lleva una foto de referencia: "quiero esto" elimina el 90% de las malas comunicaciones',
      'Nunca rasures un Golden, Husky, Akita, Samoyedo o cualquier raza de doble capa',
      'El "Teddy Bear Cut" puede aplicarse a casi cualquier raza de pelo continuo',
      'Pide siempre que incluyan limpieza de oídos y expresión de glándulas anales en el servicio'
    ],
    close: 'La comunicación con tu groomer es una habilidad que se aprende. Una foto, el nombre del corte y una descripción de cuánto mantenimiento puedes dar en casa es toda la información que necesita para darte el resultado perfecto.'
  },
  {
    id: 39, cat: 'grooming', emoji: '🛁', color: '#1EB87A',
    title: 'Cómo bañar a tu perro en casa sin traumatizarlo',
    sub: 'Técnica, productos y frecuencia para cada tipo de pelaje',
    date: 'Abril 2025', read: 5,
    tags: ['grooming', 'baño', 'casa', 'pelaje'],
    lead: 'Bañar a un perro en casa parece simple hasta que lo intentas. El perro se sacude, el agua va por todas partes, el pelo tapa el desagüe y tu baño queda peor que el perro. Con la técnica correcta y los productos adecuados, el baño en casa puede ser una experiencia tranquila para ambos.',
    body: [
      { h: 'La preparación que lo cambia todo', p: 'Antes del agua: cepilla completamente el pelaje para deshacer nudos (el pelo mojado los vuelve imposibles de deshacer), junta todos los productos necesarios al alcance, y coloca una toalla antideslizante en el fondo de la bañera. Un perro que resbala en el baño aprende a tenerle miedo.' },
      { h: 'La temperatura y la presión correcta', p: 'El agua debe estar tibia, no caliente: la piel canina es más sensible a la temperatura que la humana. Usa una alcachofita o recipiente para mojar progressivamente en lugar del chorro directo. La presión alta del chorro asusta a muchos perros. Moja primero el cuerpo y deja la cara para el final.' },
      { h: 'Champú: nunca el de humanos', p: 'El pH de la piel canina (6.2-7.4) es diferente al humano (4.5-5.5). Los champús humanos alteran el manto ácido del pelaje del perro y pueden causar sequedad, irritación y mayor susceptibilidad a bacterias e hongos. Usa siempre champú formulado para perros o sin sulfatos si quieres algo suave.' },
      { h: 'Secado: el paso más importante', p: 'No dejes al perro húmedo: la humedad en la piel genera dermatitis por humedad (hot spots) especialmente en razas con pelaje denso. Usa secadora en temperatura media, a 30cm del pelo mínimo. Los sopladores de alta velocidad (force dryer) son la herramienta profesional que separa el pelo y seca mucho más eficientemente.' },
    ],
    stat: 'Según estudios del grooming profesional, el 73% de los perros que "odian el baño" lo hacen por experiencias negativas previas (agua en ojos, resbalones, temperatura incorrecta) no por aversión innata al agua.',
    tips: [
      'Algodón en los oídos durante el baño previene otitis por humedad',
      'Premio durante y después del baño: asociación positiva consistente',
      'Lava el champú completamente: el residuo es la principal causa de irritación de piel',
      'Groomer profesional cada 8-12 semanas + baño en casa cuando necesario: la combinación ideal'
    ],
    close: 'El baño en casa es viable y económico. Pero un groomer profesional con soplador de alta velocidad hace en 2 horas lo que te tomaría 4 a ti, con mejor resultado final y sin el desastre del baño. Los dos tienen su lugar.'
  },
  {
    id: 40, cat: 'grooming', emoji: '😺', color: '#E86535',
    title: 'Grooming para gatos: lo que la mayoría de dueños no sabe',
    sub: 'Por qué los gatos también necesitan groomer profesional',
    date: 'Marzo 2025', read: 5,
    tags: ['grooming', 'gatos', 'pelaje', 'mantenimiento'],
    lead: 'Los gatos se limpian solos, sí. Pero eso no significa que no necesiten grooming. Gatos de pelo largo, obesos o con artritis no pueden acicalarse correctamente. El resultado: nudos, bolas de pelo problemáticas, infecciones de piel y un gato incómodo que no puede decirte que algo le duele.',
    body: [
      { h: '¿Cuándo necesita un gato groomer profesional?', p: 'Razas de pelo largo (Persa, Maine Coon, Ragdoll, Noruego del Bosque) necesitan grooming profesional cada 6-8 semanas sin excepción. Cualquier gato con nudos que no se pueden deshacer con cepillo necesita groomer. Gatos mayores o con artritis que ya no pueden alcanzarse ciertos puntos también.' },
      { h: 'El "lion cut": cuándo tiene sentido', p: 'El corte de león (rapar el cuerpo dejando melena, patas y punta de cola) es la solución más práctica para gatos con matones severos o para el verano en climas calurosos. Es reversible, el pelo crece en 3-4 meses. Contrario a lo que se cree, los gatos rapados en verano están más cómodos, no más vulnerables.' },
      { h: 'Baño de gato: sí, es posible', p: 'Los groomers especializados bañan gatos con técnicas específicas: agua tibia en entorno cerrado y silencioso, movimientos lentos y seguros, secado con soplador de baja velocidad. Un gato bien acostumbrado al groomer desde joven lo tolera bien. Nunca intentes bañar un gato adulto no habituado sin ayuda.' },
      { h: 'Cepillado en casa: la rutina que previene todo', p: 'Para pelo largo: cepillado diario de 5 minutos. Para pelo corto: semanal. El guante desmallador de goma (Zoom Groom) es el favorito de la mayoría de gatos porque imita la sensación del lamido. El FURminator para gatos reduce el 90% del pelo suelto que termina en alfombras y en las bolas de pelo.' },
    ],
    stat: 'Las bolas de pelo (hairballs) que requieren intervención veterinaria cuestan en promedio $800-$1,500 de tratamiento en USA. El cepillado regular y el grooming profesional reduce el riesgo en más del 80%.',
    tips: [
      'Empieza el grooming desde cachorro: la habituación temprana lo cambia todo',
      'Nunca uses tijeras en casa para deshacer nudos: riesgo de corte en piel bajo el nudo',
      'Pastillas para bolas de pelo (Laxatone): preventivo económico para pelo largo',
      'Limpieza de uñas mensual: evita que se claven en pads o que dañen muebles'
    ],
    close: 'Tu gato se lame para estar limpio, no para estar bien cuidado. El grooming profesional completa lo que el lengüetazo no puede. Un gato bien cuidado se ve diferente: pelo brillante, sin nudos, sin olor, sin molestias. Es la diferencia entre sobrevivir y florecer.'
  },
  {
    id: 41, cat: 'grooming', emoji: '🌟', color: '#1E90FF',
    title: 'Grooming creativo: las transformaciones que se volvieron virales',
    sub: 'El arte canino que conquista TikTok e Instagram globalmente',
    date: 'Mayo 2025', read: 4,
    tags: ['grooming creativo', 'viral', 'TikTok', 'arte canino'],
    lead: 'El grooming creativo existe desde los 90s en competencias de concurso. Pero TikTok lo democratizó: ahora cualquier dueño puede llegar al groomer con una idea y convertir a su perro en tendencia global. Estos son los estilos que más se viralizan y qué requieren.',
    body: [
      { h: 'El Samoyedo Panda: el original viral', p: 'Groomers en China y Japón comenzaron a dar a Samoyedos y Chow Chow el patrón de oso panda: manchas negras (con tinte seguro) alrededor de los ojos y orejas sobre el pelaje blanco. Las fotos generaron millones de interacciones. La tendencia llegó a USA en 2022 y sigue siendo una de las más solicitadas.' },
      { h: 'Cortes arquitectónicos asiáticos', p: 'Los groomers de Taiwan y Corea del Sur llevan el Asian Fusion a otro nivel: perros que parecen esculpidos, con perfectas esferas de pelo en lugar de cabeza, rectángulos perfectos como cuerpo y cilindros uniformes como patas. Requieren meses de crecimiento, tijeras profesionales y horas de trabajo.' },
      { h: 'Tintes temáticos: de Halloween a Pride', p: 'Tintes seguros para mascotas (sin peroxide, amonio ni PPD) permiten decorar el pelaje para eventos especiales. Los más virales: patrones de llamas para Halloween, degradados de arcoíris para Pride, y tonos pastel para primavera. Los tintes duran 4-8 baños y son completamente reversibles.' },
      { h: 'El grooming competitivo: un deporte serio', p: 'Las competencias de grooming creativo (Intergroom en New Jersey, Groom Expo en Hershey) son eventos con jueces certificados, puntuaciones técnicas y premios importantes. Los ganadores son artistas que trabajan durante semanas el diseño de cada perro. Los videos de competencias son de lo más viral en la comunidad pet.' },
    ],
    stat: 'Los videos de grooming creativo son el segundo tipo de contenido de mascotas con más engagement en TikTok (después de cachorros nuevos), con un promedio de 3.2M de visualizaciones en los top 100 videos del género.',
    tips: [
      'Verifica que el tinte sea específico para mascotas y PPD-free antes de aplicar',
      'El grooming creativo requiere perros con pelo en buen estado: nada de hacerlo sobre pelo dañado',
      'Los cortes arquitectónicos asiáticos cuestan $150-$400+ según el salon',
      'Documenta el proceso: el "before y after" es el formato más compartible'
    ],
    close: 'El grooming creativo no es para todos los perros ni para todos los dueños. Pero cuando el perro lo tolera bien y el groomer es un artista, el resultado es genuinamente espectacular. Y si se vuelve viral, el costo del grooming se paga solo.'
  },
];

BLOG.push(...BLOG_EXTRA);
// Regenerar BLOG_CATS con la nueva categoría
window.BLOG_CATS = ['todos', ...Object.keys(CAT_META)];

Object.assign(window, { BLOG, CAT_META, BLOG_CATS });
