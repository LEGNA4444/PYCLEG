// La estructura de datos contiene párrafos completos para cada género
const datosHistorias = {
    mis: {
        personajes: [
            "una joven mujer de entre 15 y 18 años llamada Garli",
            "una joven mujer llamada Alarzaderarkc"
        ],
        lugares: [
            "en el reino de Sanrantared en Sonora, conocido por su peligro mortal",
            "en el callejón del norte de un lugar conocido como Sonora, el peligro del diablo"
        ],
        problemas: [
            "la pandilla de Los Vallas se enfrentaba al pandillero conocido como El C4 Teniente",
            "el pandillero conocido por su gran peligrosidad descubrió que su hermano estaba más muerto que su bisabuela"
        ],
        desarrollos: [
            "Para solucionar este problema se tuvo que involucrar nada más y nada menos que el grupo espacial de Sonora, el C-9 de FEM"
        ],
        climax: [
            "Y como todos esperaban, esto terminó en el tiroteo más grande no solo de Sonora sino del mundo; ni en la Tercera Guerra Mundial se enfrentaron a armas tan avanzadas con armas tan improvisadas"
        ],
        finales: [
            "Esto solo terminó con el lanzamiento del misil RZ, conocido como el destructor de órganos (y no el instrumento). Era tan potente que, al explotar, generaba una onda de choque que quemaba todo el oxígeno y después creaba una onda de choque hacia afuera tan fuerte que aviones de miles de toneladas volaban a la velocidad del sonido, pero solo en átomos"
        ]
    },
    fantasia: {
        personajes: [
            "una joven hechicera llamada Elara",
            "un valiente caballero llamado Sir Kael",
            "un astuto ladrón de duendes llamado Faelar",
            "una poderosa druida llamada Lyra",
            "un anciano mago ermitaño llamado Zarthus",
            "una princesa guerrera llamada Anya",
            "un juglar errante llamado Jerrick",
            "un herrero enano llamado Borin",
            "una sacerdotisa elfa llamada Lianna",
            "un príncipe exiliado llamado Theron",
            "una cazadora de dragones llamada Astrid",
            "un alquimista excéntrico llamado Silas",
            "una ladrona de reliquias llamada Seraphina",
            "un guardián del bosque llamado Oberon",
            "una profetisa misteriosa llamada Cassandra",
            "un rey sabio y justo llamado Alaric"
        ],
        lugares: [
            "en las profundidades del Bosque de los Susurros",
            "en la cima de una montaña encantada",
            "en la ciudad flotante de Aethoria",
            "en las ruinas de un antiguo templo lunar",
            "en el reino subterráneo de los enanos",
            "en la costa de los naufragios",
            "en el desierto de las almas perdidas",
            "en el valle de los unicornios",
            "en la torre del mago oscuro",
            "en el laberinto de espejos",
            "en el volcán en erupción",
            "en el lago encantado",
            "en el cementerio de los reyes",
            "en el jardín de las hadas",
            "en el castillo de cristal",
            "en el puente arcoíris"
        ],
        problemas: [
            "se enteró de que un dragón ancestral había robado la Fuente de la Magia del reino. Sin su poder, los cultivos morían y la esperanza se desvanecía.",
            "descubrió que un hechizo oscuro había convertido al rey en piedra. El reino estaba sumido en el caos, y la única forma de romper la maldición era con un artefacto legendario.",
            "descubrió que un portal a otra dimensión se había abierto, liberando criaturas extrañas que amenazaban con destruir el mundo.",
            "se dio cuenta de que la magia del reino estaba desapareciendo, y la única forma de salvarla era encontrar el Corazón de la Magia, un artefacto perdido hace siglos.",
            "se enfrentó a una profecía que anunciaba el fin del mundo.",
            "descubrió que un ejército de orcos se preparaba para invadir el reino.",
            "se enteró de que un demonio había escapado de su prisión y estaba sembrando el caos.",
            "se dio cuenta de que los dioses estaban en guerra y el mundo estaba sufriendo las consecuencias.",
            "se enfrentó a una maldición que convertía a las personas en animales.",
            "descubrió que un tesoro legendario estaba escondido en un lugar peligroso.",
            "se enteró de que un rey malvado había resucitado de entre los muertos.",
            "se dio cuenta de que el sol estaba desapareciendo y el mundo se sumía en la oscuridad.",
            "se enfrentó a una plaga que convertía a las personas en zombis.",
            "descubrió que un portal a otra época se había abierto.",
            "se enteró de que un grupo de rebeldes planeaba derrocar al rey.",
            "se dio cuenta de que la luna estaba a punto de caer sobre el mundo."
        ],
        desarrollos: [
            "Para recuperar la Fuente, el personaje tuvo que adentrarse en el lugar del que nadie había regresado. Durante el viaje, se enfrentó a criaturas extrañas y resolvió acertijos ancestrales para avanzar.",
            "En su búsqueda del artefacto, el personaje tuvo que viajar a las tierras heladas del norte, un lugar tan peligroso que se decía que las almas se congelaban. Allí, encontró a un sabio ermitaño que le dio una pista crucial.",
            "Para cerrar el portal, el personaje tuvo que viajar a la dimensión oscura, un lugar lleno de peligros y sombras. Allí, se enfrentó a seres de pesadilla y resolvió acertijos cósmicos para encontrar la llave del portal.",
            "En su búsqueda del Corazón de la Magia, el personaje tuvo que descifrar antiguos textos y seguir pistas ocultas en mapas ancestrales. Durante el viaje, se encontró con aliados inesperados y enemigos poderosos.",
            "Para evitar el fin del mundo, el personaje tuvo que reunir a los cuatro elementos y combinarlos en un ritual ancestral.",
            "Para detener al ejército de orcos, el personaje tuvo que formar una alianza con otras razas y prepararse para la batalla.",
            "Para derrotar al demonio, el personaje tuvo que encontrar un arma sagrada capaz de destruirlo.",
            "Para restaurar la paz entre los dioses, el personaje tuvo que viajar al cielo y mediar entre ellos.",
            "Para romper la maldición, el personaje tuvo que encontrar el antídoto y administrarlo a las víctimas.",
            "Para encontrar el tesoro, el personaje tuvo que superar pruebas peligrosas y evitar trampas mortales.",
            "Para derrotar al rey malvado, el personaje tuvo que encontrar su punto débil y explotarlo.",
            "Para devolver el sol al mundo, el personaje tuvo que viajar al inframundo y negociar con el dios de la oscuridad.",
            "Para detener la plaga, el personaje tuvo que encontrar la cura y distribuirla a la población.",
            "Para cerrar el portal temporal, el personaje tuvo que viajar al pasado y cambiar un evento clave.",
            "Para ayudar a los rebeldes, el personaje tuvo que infiltrarse en el castillo y sabotear los planes del rey.",
            "Para evitar que la luna cayera, el personaje tuvo que construir un dispositivo capaz de repelerla."
        ],
        climax: [
            "Después de un arduo viaje, el personaje se enfrentó al dragón en su guarida. Con un poco de astucia y un toque de magia, logró recuperar la Fuente y devolverla a su lugar.",
            "En el castillo, el personaje se enfrentó al mago oscuro que había lanzado el hechizo. Con el artefacto en mano, logró desviar su poder y restaurar al rey a su forma original, salvando al reino.",
            "Después de una batalla épica, el personaje logró cerrar el portal, sellando a las criaturas de la dimensión oscura y salvando al mundo de la destrucción.",
            "En el templo, el personaje se enfrentó a un guardián ancestral que protegía el Corazón de la Magia. Con valentía y sabiduría, logró superar las pruebas y obtener el artefacto, restaurando la magia del reino.",
            "En el momento más crítico, el personaje realizó el ritual y los elementos se combinaron, salvando al mundo de la destrucción.",
            "En el campo de batalla, el personaje lideró a su ejército a la victoria, derrotando a los orcos y salvando el reino.",
            "En el infierno, el personaje se enfrentó al demonio y lo destruyó con el arma sagrada.",
            "En el cielo, el personaje logró mediar entre los dioses y restaurar la paz.",
            "En el laboratorio, el personaje creó el antídoto y lo administró a las víctimas, rompiendo la maldición.",
            "En la cámara del tesoro, el personaje superó las trampas y obtuvo el tesoro legendario.",
            "En el cementerio, el personaje se enfrentó al rey malvado y lo derrotó de nuevo.",
            "En el inframundo, el personaje negoció con el dios de la oscuridad y devolvió el sol al mundo.",
            "En el hospital, el personaje distribuyó la cura y detuvo la plaga.",
            "En el pasado, el personaje cambió el evento clave y cerró el portal temporal.",
            "En el castillo, el personaje saboteó los planes del rey y ayudó a los rebeldes a derrocarlo.",
            "En la cima de la montaña, el personaje activó el dispositivo y repelió la luna."
        ],
        finales: [
            "Al final, el hechizo se rompió y la paz volvió al reino. El pueblo celebró al personaje como su héroe.",
            "La criatura fue derrotada, y el sol volvió a brillar, pero el personaje aprendió que el verdadero poder residía en el coraje y la perseverancia.",
            "Al final, el portal se cerró para siempre, y el mundo volvió a la normalidad. El personaje fue recordado como un héroe legendario.",
            "La magia regresó al reino, y la vida floreció de nuevo. El personaje fue honrado como el salvador de la magia, y su nombre se convirtió en sinónimo de esperanza.",
            "El mundo fue salvado, y el personaje fue recordado como el salvador de la humanidad.",
            "El reino fue liberado, y el personaje fue coronado como el nuevo rey.",
            "El demonio fue destruido, y el mundo volvió a estar en paz.",
            "Los dioses hicieron las pases, y el mundo volvió a prosperar.",
            "La maldición se rompió, y las personas volvieron a su forma original.",
            "El tesoro fue encontrado, y el personaje se hizo rico y famoso.",
            "El rey malvado fue derrotado, y el reino volvió a estar en manos de un gobernante justo.",
            "El sol regresó, y el mundo volvió a estar lleno de luz y calor.",
            "La plaga fue detenida, y la humanidad fue salvada de la extinción.",
            "El portal temporal se cerró, y el tiempo volvió a fluir normalmente.",
            "El rey fue derrocado, y el reino se convirtió en una república.",
            "La luna fue repelida, y el mundo fue salvado de la destrucción."
        ]
    },
    cienciaFiccion: {
        personajes: [
            "la comandante Zylia de la nave Stardust",
            "un robot de exploración llamado Unit-734",
            "el científico rebelde Dr. Aris Thorne",
            "la hacker experta Kai 'Zero' Lee",
            "el mercenario espacial Jax 'Shadow' Ryder",
            "la ingeniera jefe Lena Hanson",
            "el piloto de combate Marcus Cole",
            "la diplomática intergaláctica Anya Petrova",
            "el cyborg rastreador Zane-X9",
            "el contrabandista Rick 'Comet' Johnson",
            "la bióloga alienígena Xylo-7",
            "el capitán de la nave mercante Eva Rostova",
            "el detective cibernético Kenji Tanaka",
            "la guerrera psíquica Lyra Nova",
            "el explorador interestelar Ben Carter",
            "la líder de la resistencia Anya Volkov"
        ],
        lugares: [
            "en el planeta desértico de Xylos",
            "en una estación espacial a la deriva",
            "en la metrópolis futurista de Neo-Tokyo",
            "en las ruinas de una civilización antigua en Marte",
            "en la jungla alienígena de Pandora-9",
            "en la base lunar secreta de la Corporación OmniCorp",
            "en el agujero de gusano inestable conocido como el Nexus",
            "en la colonia minera abandonada de Kepler-186f",
            "en la nave nodriza de la flota Kryll",
            "en el mercado negro intergaláctico de Nar Shaddaa",
            "en el laboratorio subterráneo del Dr. Aris Thorne",
            "en la academia de pilotos espaciales de la Federación Galáctica",
            "en el planeta oceánico de Aquatica",
            "en la prisión de máxima seguridad de Tartarus-7",
            "en el templo psíquico de los Monjes de Zenthara",
            "en la ciudadela espacial de la Alianza Estelar"
        ],
        problemas: [
            "se dio cuenta de que un virus informático estaba en la red, amenazando con apagar todos los sistemas vitales de la nave. Si fallaban, la tripulación entera quedaría a la deriva.",
            "se encontraron con una extraña anomalía temporal que los atrapó en un bucle. Se repetían los mismos segundos una y otra vez, y no había forma de escapar.",
            "descubrió que la Corporación OmniCorp estaba experimentando con armas biológicas ilegales.",
            "se enteró de que una flota alienígena hostil se dirigía hacia la Tierra.",
            "se dio cuenta de que un agujero negro estaba a punto de tragarse la estación espacial.",
            "se enfrentó a una rebelión de robots conscientes que exigían sus derechos.",
            "descubrió que un grupo de contrabandistas estaba vendiendo tecnología alienígena peligrosa.",
            "se enteró de que un científico loco estaba intentando crear un arma capaz de destruir planetas.",
            "se dio cuenta de que un virus genético estaba convirtiendo a las personas en mutantes.",
            "se enfrentó a una invasión de criaturas interdimensionales.",
            "descubrió que un gobierno corrupto estaba oprimiendo a la población.",
            "se enteró de que un culto fanático estaba intentando despertar a un dios antiguo.",
            "se dio cuenta de que la realidad misma se estaba desmoronando.",
            "se enfrentó a una guerra civil entre colonias espaciales.",
            "descubrió que un experimento científico había creado una paradoja temporal.",
            "se enteró de que un grupo de piratas espaciales estaba saqueando naves mercantes."
        ],
        desarrollos: [
            "Para detener el virus, el personaje tuvo que desconectar todos los sistemas manualmente. Cada acción era un riesgo, ya que un solo error podría significar el fin de la misión.",
            "En su intento por romper el bucle, el personaje descubrió una señal alienígena que se repetía. Decidió seguirla, con la esperanza de encontrar la causa de la anomalía.",
            "Para exponer a la Corporación OmniCorp, el personaje tuvo que infiltrarse en su base secreta y robar la evidencia.",
            "Para detener a la flota alienígena, el personaje tuvo que liderar una contraofensiva desesperada.",
            "Para evitar que el agujero negro se tragara la estación, el personaje tuvo que encontrar una forma de estabilizarlo.",
            "Para negociar con los robots, el personaje tuvo que comprender su lenguaje y sus motivaciones.",
            "Para detener a los contrabandistas, el personaje tuvo que rastrear su escondite y confiscar la tecnología alienígena.",
            "Para detener al científico loco, el personaje tuvo que destruir su laboratorio y desactivar el arma.",
            "Para encontrar una cura para el virus genético, el personaje tuvo que viajar a un planeta lejano y buscar una planta rara.",
            "Para cerrar el portal interdimensional, el personaje tuvo que encontrar un artefacto antiguo y realizar un ritual.",
            "Para liberar a la población del gobierno corrupto, el personaje tuvo que organizar una revolución.",
            "Para detener al culto, el personaje tuvo que encontrar su templo secreto y destruir su ídolo.",
            "Para reparar la realidad, el personaje tuvo que viajar a diferentes dimensiones y encontrar los fragmentos perdidos.",
            "Para poner fin a la guerra civil, el personaje tuvo que mediar entre las colonias y encontrar una solución pacífica.",
            "Para resolver la paradoja temporal, el personaje tuvo que viajar al pasado y corregir un error.",
            "Para detener a los piratas, el personaje tuvo que emboscar su nave y capturarlos."
        ],
        climax: [
            "En el momento más crítico, el personaje se lanzó al núcleo de la nave. Con sus últimas fuerzas, logró enviar una señal de reinicio, deteniendo la amenaza justo a tiempo.",
            "Después de descifrar la señal, el personaje usó un rayo de energía para romper el bucle temporal. La anomalía se disolvió, y la nave volvió a la normalidad.",
            "En una confrontación final, el personaje expuso a la Corporación OmniCorp y la llevó ante la justicia.",
            "En una batalla épica, el personaje lideró a la flota terrestre a la victoria, repeliendo a los alienígenas.",
            "Con un ingenioso plan, el personaje logró estabilizar el agujero negro y salvar la estación espacial.",
            "Después de un intenso debate, el personaje logró convencer a los humanos y a los robots de coexistir en paz.",
            "En un enfrentamiento peligroso, el personaje capturó a los contrabandistas y entregó la tecnología alienígena a las autoridades.",
            "En una misión suicida, el personaje destruyó el laboratorio del científico loco y desactivó el arma.",
            "Con la ayuda de los científicos, el personaje sintetizó una cura y salvó a la población del virus genético.",
            "En una batalla interdimensional, el personaje cerró el portal y selló a las criaturas.",
            "Con el apoyo del pueblo, el personaje derrocó al gobierno corrupto y restauró la democracia.",
            "En un enfrentamiento místico, el personaje destruyó el ídolo y detuvo el despertar del dios antiguo.",
            "Con la ayuda de seres de otras dimensiones, el personaje reparó la realidad y la salvó de la destrucción.",
            "Después de largas negociaciones, el personaje logró poner fin a la guerra civil y unir a las colonias.",
            "Con una acción audaz, el personaje corrigió el error en el pasado y resolvió la paradoja temporal.",
            "En una emboscada sorpresa, el personaje capturó a los piratas y recuperó la mercancía robada."
        ],
        finales: [
            "Al final, el personaje y su equipo consiguieron reparar el motor y regresaron a casa sanos y salvos, listos para la próxima misión.",
            "La paradoja temporal fue resuelta, pero el personaje se quedó con la duda de si lo que vivieron fue real.",
            "La Corporación OmniCorp fue expuesta, y el mundo se volvió un lugar más seguro.",
            "La Tierra fue salvada, y el personaje fue aclamado como un héroe.",
            "La estación espacial fue salvada, y la tripulación pudo continuar su misión.",
            "Los humanos y los robots aprendieron a vivir juntos en armonía.",
            "Los contrabandistas fueron encarcelados, y la tecnología alienígena fue utilizada para el bien común.",
            "El científico loco fue detenido, y el mundo se salvó de la destrucción.",
            "La población fue curada, y la humanidad se volvió más fuerte.",
            "El portal interdimensional fue cerrado, y las dimensiones volvieron a estar separadas.",
            "El gobierno corrupto fue derrocado, y la libertad fue restaurada.",
            "El culto fue desmantelado, y el mundo se salvó de la oscuridad.",
            "La realidad fue reparada, y el universo volvió a estar en equilibrio.",
            "Las colonias se unieron, y la galaxia se volvió un lugar más pacífico.",
            "La paradoja temporal fue resuelta, y el tiempo volvió a fluir correctamente.",
            "Los piratas fueron capturados, y las rutas comerciales se volvieron más seguras."
        ]
    }
};

// La función para obtener un elemento aleatorio de una lista
function obtenerElementoAleatorio(lista) {
    const indiceAleatorio = Math.floor(Math.random() * lista.length);
    return lista[indiceAleatorio];
}

// Obtener los elementos del HTML
const generarBtn = document.getElementById("generarBtn");
const historiaContenedor = document.getElementById("historiaContenedor");

// El evento que se dispara al hacer clic en el botón
generarBtn.addEventListener("click", () => {
    const generoSeleccionado = document.getElementById("generoSelect").value;
    const largoSeleccionado = document.getElementById("largoSelect").value;
    const datosDelGenero = datosHistorias[generoSeleccionado];

    if (!datosDelGenero) {
        historiaContenedor.textContent = "Por favor, selecciona un género válido.";
        return;
    }

    // Obtener los elementos básicos de la historia de forma aleatoria
    const personaje = obtenerElementoAleatorio(datosDelGenero.personajes);
    const lugar = obtenerElementoAleatorio(datosDelGenero.lugares);
    const problema = obtenerElementoAleatorio(datosDelGenero.problemas);
    const final = obtenerElementoAleatorio(datosDelGenero.finales);

    let historiaCompleta =
        `Había una vez ${personaje}, que vivía ${lugar}. ` +
        `De pronto, ${problema}. `;

    // Lógica para decidir el largo de la historia
    if (largoSeleccionado === 'larga') {
        const desarrollo = obtenerElementoAleatorio(datosDelGenero.desarrollos);
        const climax = obtenerElementoAleatorio(datosDelGenero.climax);

        historiaCompleta += `${desarrollo} ${climax} `;
    }

    historiaCompleta += final;

    // Mostrar la historia en la página
    historiaContenedor.textContent = historiaCompleta;
});
