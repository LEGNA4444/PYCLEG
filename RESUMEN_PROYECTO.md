# Resumen del proyecto PYCLEG

## 1. Descripción general

PYCLEG es un sitio web estático de tipo portafolio/propuesta comercial para LEGNAR. Su enfoque principal es presentar servicios de desarrollo web, ofrecer una simulación de cotización, permitir contacto mediante formularios, y dejar un pequeño juego interactivo como elemento extra del sitio.

El proyecto está construido con HTML, CSS y JavaScript puro, sin framework ni backend propio. La lógica principal se centraliza en `SORCS/script-global.js`, mientras que la presentación visual se concentra en `SORCS/estilos.css`.

---

## 2. Estructura del proyecto

- `index.html`: página principal del portafolio.
- `404.html`: página de error 404 con navegación de respaldo.
- `PENDIENTES.md`: lista de errores pendientes y mejoras por revisar.
- `SORCS/estilos.css`: hoja de estilos centralizada del sitio.
- `SORCS/script-global.js`: lógica global del sitio (tema oscuro, búsqueda, simulador, contacto, juego).
- `rg/`: páginas legales y de servicios del proyecto.
- `rg/GAME/GAME.html`: página del juego del laberinto matemático.
- `rg/projects/game-maze/`: versión alternativa o antigua del juego de laberinto.
- `srcs/`: recursos visuales (imágenes, logos).

---

## 3. Resumen detallado por archivo

### `index.html`

Es la página principal del portafolio y funciona como landing page de LEGNAR.

Funciones / secciones principales:
- Encabezado con título principal: `LEGNAR — Desarrollo Web| Portafolios, Landing Pages`.
- Botón `#toggle-dark` para cambiar entre modo claro y oscuro.
- Menú desplegable con enlaces a Términos, Contacto y Privacidad.
- Campo de búsqueda `#search` para buscar proyectos.
- Sección de simulador de precios con:
  - `#sim-sections`
  - `#sim-js`
  - `#sim-css`
  - checkbox de servicios extras
  - `#sim-total`
  - botón `#sim-save`
- Enlace CTA para solicitar cotización.
- Texto de advertencia legal con referencia a `especificacionesdelservicio.html`.
- Footer con branding y logo.
- Carga de `SORCS/script-global.js` al final del documento.

Propósito general: servir como presentación de servicios, captar leads y mostrar un ejemplo funcional de interacción con JavaScript.

---

### `404.html`

Es la página de error 404 personalizada.

Funciones / secciones principales:
- Encabezado con botón de modo oscuro.
- Menú para volver al inicio o a Contacto/Términos.
- Sección de búsqueda `#search` para navegar proyectos.
- Lista de enlaces útiles.
- Botón para regresar a la página principal.
- Footer con branding.

Observación importante: en esta página se apunta a `https://LEGNA4444.github.io/PYCLEG/rg/script-global.js`, pero el archivo real está en `SORCS/script-global.js`. Esto está documentado en `PENDIENTES.md` como corrección pendiente.

---

### `PENDIENTES.md`

Es la hoja de tareas pendientes del proyecto.

Contenido principal:
- Registro de correcciones ya hechas.
- Pendientes de enlaces y recursos.
- Pendientes de privacidad y contacto.
- Pendientes de accesibilidad y validación.
- Pendientes de mantenimiento.

Valor: sirve como documento de control técnico y de calidad del proyecto. Incluye comentarios importantes sobre rutas rotas, privacidad, formularios externos y mantenimiento.

---

### `SORCS/estilos.css`

Es la hoja de estilos principal del sitio. Centraliza la apariencia visual de todas las páginas que la importan.

Secciones principales:
- `:root` variables CSS: colores, espacios, radio, tipografías, sombras.
- Clases especiales: `.TXTI`, `.NI`, `.dark-mode`.
- Estilos base del `body` y tipografías.
- Estilos del `header` y `footer`.
- `.contenedor-generico`, útil para páginas legales y de contenido.
- Botón `#toggle-dark` con posicionamiento fijo y estilo emergente.
- Menú desplegable `.menu` y `.submenu`.
- Campo de búsqueda `#search`.
- Tarjetas de servicio `.servicio-card` y contenedor `.servicios-container`.
- Estilos específicos para formulario de contacto.
- Estilos del simulador de precios.
- Estilos del juego del laberinto (secciones de celdas y estado del jugador).

Importancia: esta hoja permite que todas las páginas compartan el mismo look-and-feel y mantengan un sistema de modo oscuro consistente.

---

### `SORCS/script-global.js`

Es el archivo central con la lógica del sitio. Tiene varias secciones y módulos.

#### Módulo 1: Modo oscuro
Funciones principales:
- `setDarkMode(enabled)`: aplica o quita la clase `dark-mode` al `body`, guarda la preferencia en `localStorage` y cambia texto del botón.

Flujo:
- lee la preferencia guardada o usa `prefers-color-scheme`.
- activa el modo oscuro al cargar la página.
- permite alternarlo con clic o con la tecla `D` si el foco no está en inputs.

#### Módulo 2: Sistema de búsqueda
Funciones principales:
- `render(list)`: dibuja una lista de resultados.
- `findMatches(q)`: compara texto introducido con títulos y etiquetas.

Comportamiento:
- busca sobre una lista estática de proyectos pequeños.
- si se presiona Enter en el input, navega directamente al primer resultado.
- cierra resultados al hacer clic fuera.

Proyectos incluidos:
- `NALP`
- `legnar`
- `INFY5`
- `Laberinto matemático`

#### Módulo 3: Simulador de precios
Funciones principales:
- `calcTotal()`: suma el valor de las secciones, JavaScript, CSS y opciones seleccionadas.

Comportamiento:
- lee valores de inputs y selects dentro de `.servicio-card`.
- genera un total en MXN usando `Intl.NumberFormat`.
- guarda la simulación en `localStorage` con la clave `simulator_v2`.
- permite recordar la configuración del usuario.

#### Módulo 4: Formulario de contacto
Comportamiento:
- valida nombre, email, asunto y mensaje.
- añade campos ocultos recomendados por Formspree (`_replyto` y `_subject`).
- muestra mensajes en `#form-respuesta`.
- está diseñado para enviarse a `https://formspree.io/f/xpwealoe`.

#### Módulo 5: Juego del laberinto matemático
Este bloque es el más complejo y hace uso del DOM, almacenamiento local y audio de respaldo.

Objetos y funciones principales:
- `game.init()`: inicializa el juego.
- `game.saveProgress()`: guarda nivel actual en `localStorage`.
- `game.loadProgress()`: recupera progreso guardado.
- `game.setupGame()`: crea la nueva cuadrícula y restaura valores según el nivel.
- `game.isNearExistingPoint(x, y, minDistance)`: evita puntos demasiado cercanos.
- `game.generatePoints()`: genera objetivos numéricos de forma aleatoria.
- `game.isPoint(x, y)`: comprueba si ya existe un punto en una celda.
- `game.renderGrid()`: dibuja la cuadrícula con celdas movibles, inaccesibles y puntos.
- `game.updateGameInfo()`: actualiza información del nivel y movimientos restantes.
- `game.movePlayer(targetX, targetY)`: mueve al jugador y consume pasos.
- `game.checkWinCondition()`: determina si el nivel termina, avanza o reinicia.
- `resetGame()`: reinicia la partida.
- `initBackgroundAudioFallback()`: crea audio sintético si el archivo MP3 no se puede reproducir.

Notas:
- el juego guarda progreso en `localStorage` con la clave `game-progress`.
- usa un sistema de niveles desde 1 hasta 50.
- tiene reproducción alterna de audio con Web Audio API como fallback.

---

### `rg/legnar.html`

Es una página de presentación de “Legnar”, con contenido más narrativo y personal.

Funciones / secciones:
- encabezado simple con título principal.
- dos bloques con preguntas y respuestas sobre la identidad y carácter de Legnar.
- footer con derechos reservados.
- carga de `../SORCS/script-global.js`.

Importancia: esta es una página de perfil más informal que la landing principal.

---

### `rg/contacto.html`

Es la página de contacto del portafolio.

Secciones y funciones:
- encabezado con menú.
- bloque descriptivo de ayuda/comentarios.
- formulario con campos:
  - `nombre`
  - `email`
  - `asunto`
  - `mensaje`
- `div#form-respuesta` para mensajes de validación.
- formulario con envío a Formspree: `https://formspree.io/f/xpwealoe`.
- iframe con Google Forms embebido como alternativa / complemento.

Relación con JavaScript: el script global valida el estado del formulario antes de enviar y agrega campos ocultos. También maneja el tema oscuro.

---

### `rg/terminos.html`

Es la página de términos y condiciones del servicio.

Contenido principal:
- uso del sitio
- propiedad intelectual
- limitación de responsabilidad
- cambios en los términos
- jurisdicción
- aceptación del servicio
- privacidad
- terminación del servicio
- consumo y comportamiento
- métodos de pago

Esta página se usa como documento legal del servicio ofrecido por LEGNAR mediante la web.

---

### `rg/especificacionesdelservicio.html`

Es la página de especificaciones del servicio.

Contenido principal:
- alcance del servicio
- entregables
- limitaciones

Se usa como referencia para aclarar qué incluye el trabajo y qué no.

---

### `rg/privacidad.html`

Es la política de privacidad del sitio.

Contenido principal:
- resumen ejecutivo
- qué información no recopila
- información que sí se proporciona voluntariamente
- almacenamiento local con `localStorage`
- uso de GitHub Pages
- enlaces externos
- derechos del usuario
- cambios en la política
- contacto

Observación: el documento incluye `TODO` en varias secciones para revisar afirmaciones de privacidad y confirmar servicios externos. También menciona que se usan claves de `localStorage`, aunque el texto aún está parcialmente incompleto para documentar todos los usos exactos.

---

### `rg/GAME/GAME.html`

Es la página dedicada al juego del laberinto matemático.

Elementos principales:
- título del juego.
- `#level` para mostrar nivel actual.
- `#game-grid` para dibujar la cuadrícula.
- `#moves-left` para mostrar movimientos restantes.
- botón `#reset-button` para reiniciar.
- audio `#background-music` con fuente MP3.

Importancia: es la vista del juego que usa la lógica de `SORCS/script-global.js` y un MP3 de fondo.

---

### `rg/projects/game-maze/script.js`

Es una versión alternativa del juego del laberinto, más manual y menos centralizada.

Características:
- carga directa de música de fondo y volumen.
- lógica casi idéntica al juego del laberinto principal.
- definiciones `game`, `setupGame`, `generatePoints`, `renderGrid`, `movePlayer`, `checkWinCondition`.
- `resetGame()` y `initBackgroundAudioFallback()`.

Valor del archivo: parece ser una implementación duplicada o de prueba. El documento `PENDIENTES.md` indica que debería confirmarse si debe mantenerse o eliminarse.

---

### `rg/projects/game-maze/style.css`

Es el estilo específico para la implementación alternativa del juego.

Secciones principales:
- variables de color
- estilo general del `body`
- título principal
- contenedor del juego `#game-grid`
- celdas `.grid-cell`
- estados: `.current`, `.movable`, `.unmovable`, `.point-cell`
- botón de reinicio
- estilos de indicadores de nivel y pasos

Se puede considerar una hoja de estilo local para la versión antigua del laberinto.

---

### `rg/projects/rg.json`

Es un archivo JSON de proyecto; actualmente está vacío.

Valor funcional actual: ninguno visible. Parece ser un contenedor preparado para metadata de proyectos o para una futura lista estructurada de trabajos.

---

### `srcs/`

Esta carpeta contiene archivos gráficos del sitio, por ejemplo:
- `ARCS.png`, `ARCS.svg`, `ARCSSOLA.png`, `ARCS_C.png`, `ARCS_C.svg`
- `Créditos_1.png`
- `satanas.png`
- `19724.jpg`

Estos recursos se usan como imágenes, branding y elementos visuales del portafolio. No contienen lógica de programación, pero forman parte del sistema visual del proyecto.

---

## 4. Funciones principales del proyecto (resumen ejecutivo)

Las funcionalidades clave del sitio son:

1. Modo oscuro: cambia la apariencia y guarda la preferencia localmente.
2. Búsqueda de proyectos: filtra elementos con texto y permite abrir el primer resultado.
3. Simulador de precios: calcula costos en base a secciones, JS/CSS y extras seleccionados.
4. Contacto: valida y prepara envío vía Formspree.
5. Juego del laberinto: genera cuadrículas, puntos, niveles, movimientos y progreso persistente.
6. Páginas legales: términos, servicio, privacidad y contacto para reforzar la presentación profesional.

---

## 5. Observaciones técnicas relevantes

- El proyecto es totalmente estático: no hay backend ni base de datos.
- El sitio usa `localStorage` para guardar preferencias y progreso del usuario.
- Hay duplicación parcial entre `SORCS/script-global.js` y `rg/projects/game-maze/script.js`.
- Algunas rutas están desalineadas o pendientes de corregir (ver `PENDIENTES.md`).
- La política de privacidad y la gestión de datos externos aún necesitan revisión para alinearse con servicios concretos activos.

---

## 6. Conclusión

PYCLEG es un portafolio funcional, visualmente orientado a una marca personal llamada LEGNAR, con un enfoque comercial y una experiencia de usuario mínima pero completa. Tiene un fuerte uso de JavaScript para interactividad, un juego como elemento extra y un conjunto de páginas legales para reforzar la apariencia profesional del sitio.

Aunque el proyecto está bien estructurado y operativo en su mayor parte, aún tiene varias tareas pendientes documentadas en `PENDIENTES.md`, especialmente relacionadas con rutas, privacidad, formularios externos y limpieza de archivos duplicados.
