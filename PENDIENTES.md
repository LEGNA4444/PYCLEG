# Errores y correcciones pendientes

Lista de revisión del portafolio PYCLEG. Los puntos marcados como **pendientes de verificar** requieren comprobar el comportamiento actual o las condiciones del servicio antes de cambiar el texto o el código.

## Corregido

- [x] **Hoja de estilos de la página 404:** actualizado el enlace en `404.html` para cargar `SORCS/estilos.css`.

## Pendiente — enlaces y recursos

- [ ] **JavaScript de la página 404:** verificar y corregir la ruta del script. Actualmente `404.html` apunta a `rg/script-global.js`, pero el archivo del proyecto está en `SORCS/script-global.js`; por ello no se inicializan el modo oscuro ni las funciones asociadas.
- [ ] **Imagen del pie de la página 404:** comprobar la ruta `srcs/Créditos_1.png` y convertirla en una ruta que funcione también cuando la página 404 se muestre desde una URL anidada.
- [ ] **Enlaces de privacidad:** corregir los enlaces que apuntan a `/privacidad.html`; el archivo está ubicado en `rg/privacidad.html`.
- [ ] **Destinos de búsqueda:** revisar `NALP` e `INFY5` en `SORCS/script-global.js`, ya que ambos apuntan actualmente a la página 404. Sustituirlos por destinos válidos o retirarlos.

## Pendiente — política de privacidad y contacto

- [ ] **Inventario de almacenamiento local:** actualizar `rg/privacidad.html` para documentar todos los usos de `localStorage` (tema, simulador y progreso del juego), qué datos se guardan y cómo eliminarlos.
- [ ] **Servicios externos en el contacto:** verificar qué formularios están activos en `rg/contacto.html` (Formspree y Google Forms), qué datos reciben y qué políticas y plazos de conservación aplican. No afirmar que un proveedor no almacena información sin confirmación.
- [ ] **Revisar afirmaciones generales de privacidad:** la política dice que no hay integraciones de terceros y que JavaScript solo gestiona tema y búsqueda; contrastar y actualizar esas afirmaciones con el sitio actual.
- [ ] **Simplificar el contacto:** decidir si se mantienen ambos formularios o solo uno y dejar claro cuál debe usar la persona visitante.

> Se dejaron notas HTML `TODO` dentro de `rg/privacidad.html` en las secciones correspondientes. No son visibles para visitantes.

## Pendiente — accesibilidad y validación

- [ ] **Navegación por teclado:** ofrecer una alternativa al hover para abrir el submenú y revisar los enlaces de menú con `href="#"`.
- [ ] **Etiquetas del buscador:** añadir etiquetas accesibles asociadas a los campos de búsqueda en `index.html` y `404.html`, sin depender solo del placeholder.
- [ ] **Contraste del campo de búsqueda:** revisar el verde usado en tema claro en `SORCS/estilos.css` y ajustarlo para cumplir contraste legible.
- [ ] **Formulario de contacto:** revisar `novalidate` y validar también el formato del correo; comprobar en móvil el ancho del formulario incrustado de Google y añadirle un título accesible si se conserva.
- [ ] **Simulador:** comprobar los límites anunciados (0–60) también en el cálculo, no solo en los atributos HTML del campo.
- [ ] **Juego:** revisar que las celdas puedan usarse mediante teclado y tengan semántica accesible.

## Pendiente — mantenimiento

- [ ] **Archivos del juego:** confirmar si `rg/projects/game-maze/script.js` y `style.css` deben cargarse desde `rg/GAME/GAME.html` o eliminarse si ya no se usan; evitar mantener implementaciones duplicadas.
- [ ] **Datos de proyectos:** decidir si `rg/projects/rg.json` debe contener datos o retirarse si la lista se mantiene en JavaScript.
- [ ] **Publicación automática:** revisar `Wacht.py` antes de ejecutarlo: agrega, confirma y sube cambios automáticamente. Añadir medidas para evitar publicar archivos no previstos y comprobar cómo gestiona exclusiones.
- [ ] **Instrucciones del repositorio:** actualizar `.github/copilot-instructions.md` para reflejar la ubicación real de CSS y JavaScript en `SORCS/`.
