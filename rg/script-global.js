// script-global.js
// Lógica para modo oscuro con persistencia en localStorage

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggle-dark");
    const storageKey = "darkMode";

    if (!toggleBtn) return; // si no hay botón, salir sin errores

    // Función que aplica o quita la clase 'dark-mode' y actualiza el texto del botón
    function setDarkMode(enabled) {
        document.body.classList.toggle("dark-mode", !!enabled);
        try {
            localStorage.setItem(storageKey, enabled ? "1" : "0");
        } catch (e) {
            // Si localStorage no está disponible (modo incógnito extremo), no romperá la página
            console.warn("localStorage no disponible:", e);
        }
        toggleBtn.textContent = enabled ? "Modo Claro" : "Modo Oscuro";
    }

    // Leer preferencia guardada, si existe
    let saved = null;
    try {
        saved = localStorage.getItem(storageKey);
    } catch (e) {
        // ignorar
    }

    if (saved === null) {
        // Si no hay preferencia guardada, usar la preferencia del sistema si está disponible
        const prefersDark =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDarkMode(prefersDark);
    } else {
        setDarkMode(saved === "1");
    }

    // Toggle cuando el usuario hace click
    toggleBtn.addEventListener("click", function () {
        const isDark = document.body.classList.contains("dark-mode");
        setDarkMode(!isDark);
    });

    // Opcional: permitir activar/desactivar con la tecla "D" (accesibilidad simple)
    document.addEventListener("keydown", function (e) {
        // Ignorar cuando el foco está en un input/textarea
        const tag =
            (document.activeElement && document.activeElement.tagName) || "";
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        if (e.key === "d" || e.key === "D") {
            const isDark = document.body.classList.contains("dark-mode");
            setDarkMode(!isDark);
        }
    });

    /* -----------------------
     Sistema de búsqueda
     - Usa una lista `projects` con { title, url, tags }
     - Filtra en tiempo real por título/tags
     - Click en resultado o Enter navega al primer resultado
  ------------------------*/
    const searchInput = document.getElementById("search");
    if (searchInput) {
        // Lista de proyectos: edítala según necesites
        const projects = [
            {
                title: "NALP",
                url: "https://LEGNA4444.github.io/PYCLEG/404.html",
                tags: ["nalp", "proyecto"],
            },
            {
                title: "INFY5",
                url: "https://LEGNA4444.github.io/PYCLEG/404.html",
                tags: ["infy5", "proyecto"],
            },
            {
                title: "Laberinto matemático",
                url: "https://LEGNA4444.github.io/PYCLEG/rg/GAME/GAME.html",
                tags: ["juego", "fácil"],
            },
        ];

        // Contenedor de resultados (se inserta dinámicamente)
        const results = document.createElement("div");
        results.id = "search-results";
        searchInput.insertAdjacentElement("afterend", results);

        function render(list) {
            if (!list || list.length === 0) {
                results.innerHTML =
                    '<div class="sr-no">No se encontraron proyectos</div>';
                return;
            }
            results.innerHTML = list
                .map(
                    (p) => `
        <a class="sr-item" href="${p.url}" data-url="${p.url}" rel="noopener">
          <strong>${p.title}</strong>
        </a>
      `,
                )
                .join("");
        }

        function findMatches(q) {
            if (!q) return projects.slice();
            q = q.toLowerCase();
            return projects.filter(
                (p) =>
                    p.title.toLowerCase().includes(q) ||
                    (p.tags && p.tags.join(" ").toLowerCase().includes(q)),
            );
        }

        // Input -> filtrar
        searchInput.addEventListener("input", function () {
            const q = this.value.trim();
            const matches = findMatches(q);
            render(matches);
        });

        // Enter -> navegar al primer resultado
        searchInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                const q = this.value.trim();
                const m = findMatches(q);
                if (m.length) {
                    window.location.href = m[0].url;
                }
            }
        });

        // Clic en resultados -> comportamiento por defecto (navegar)
        results.addEventListener("click", function (e) {
            const a = e.target.closest("a.sr-item");
            if (a) {
                // dejar que el enlace navegue normalmente
            }
        });

        // Cerrar resultados al clicar fuera
        document.addEventListener("click", function (e) {
            if (!results.contains(e.target) && e.target !== searchInput) {
                results.innerHTML = "";
            }
        });

        // Si el input está vacío al cargar, no mostrar nada
        results.innerHTML = "";
    }

    // Inicializar simulador de precios (si existe el UI)
    (function () {
        const SIM_KEY = "simulator_v2";
        const totalEl = document.getElementById("sim-total");
        const saveBtn = document.getElementById("sim-save");
        const servicioCard = totalEl ? totalEl.closest(".servicio-card") : null;

        if (!totalEl || !servicioCard) return;

        const optionInputs = servicioCard.querySelectorAll(
            'input[type="checkbox"][data-price]',
        );
        const sectionsInput = servicioCard.querySelector("#sim-sections");
        const jsSelect = servicioCard.querySelector("#sim-js");
        const cssSelect = servicioCard.querySelector("#sim-css");

        const formatter = new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
        });

        function calcTotal() {
            let total = 0;
            // secciones
            if (sectionsInput) {
                const count = parseInt(sectionsInput.value, 10) || 0;
                const per = parseFloat(sectionsInput.dataset.pricePer) || 0;
                total += count * per;
            }
            // JS y CSS
            if (jsSelect) total += parseFloat(jsSelect.value) || 0;
            if (cssSelect) total += parseFloat(cssSelect.value) || 0;
            // opciones
            optionInputs.forEach((o) => {
                if (o.checked) total += parseFloat(o.dataset.price) || 0;
            });

            totalEl.textContent = formatter.format(total);
            servicioCard.dataset.currentTotal = total;
            return total;
        }

        if (sectionsInput) sectionsInput.addEventListener("input", calcTotal);
        if (jsSelect) jsSelect.addEventListener("change", calcTotal);
        if (cssSelect) cssSelect.addEventListener("change", calcTotal);
        optionInputs.forEach((o) => o.addEventListener("change", calcTotal));

        // Cargar simulación guardada
        try {
            const saved = localStorage.getItem(SIM_KEY);
            if (saved) {
                const obj = JSON.parse(saved);
                if (obj.sections !== undefined && sectionsInput) {
                    sectionsInput.value = obj.sections;
                }
                if (obj.js !== undefined && jsSelect) jsSelect.value = obj.js;
                if (obj.css !== undefined && cssSelect)
                    cssSelect.value = obj.css;
                if (obj.options && Array.isArray(obj.options)) {
                    optionInputs.forEach(
                        (o) => (o.checked = obj.options.includes(o.value)),
                    );
                }
            }
        } catch (e) {}

        calcTotal();

        if (saveBtn)
            saveBtn.addEventListener("click", function () {
                const sections = sectionsInput
                    ? parseInt(sectionsInput.value, 10) || 0
                    : 0;
                const js = jsSelect ? jsSelect.value : null;
                const css = cssSelect ? cssSelect.value : null;
                const options = Array.from(optionInputs)
                    .filter((o) => o.checked)
                    .map((o) => o.value);
                const data = {
                    sections,
                    js,
                    css,
                    options,
                    total: servicioCard.dataset.currentTotal,
                };
                try {
                    localStorage.setItem(SIM_KEY, JSON.stringify(data));
                    alert("Simulación guardada en el navegador.");
                } catch (e) {
                    alert("No se pudo guardar la simulación.");
                }
            });
    })();
});

// Lógica para el formulario de contacto usando Formspree
(function () {
    const form = document.getElementById("form-contacto");
    const respuesta = document.getElementById("form-respuesta");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        respuesta.style.color = "green";
        respuesta.textContent = "";

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const asunto = document.getElementById("asunto").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        // Validar que todos los campos estén completos
        if (!nombre || !email || !asunto || !mensaje) {
            respuesta.style.color = "crimson";
            respuesta.textContent =
                "Por favor completa todos los campos obligatorios.";
            return;
        }

        // Añadir campos ocultos recomendados por Formspree
        // _replyto: permite que Formspree sepa dónde enviar la confirmación
        let reply = form.querySelector('input[name="_replyto"]');
        if (!reply) {
            reply = document.createElement("input");
            reply.type = "hidden";
            reply.name = "_replyto";
            form.appendChild(reply);
        }
        reply.value = email;

        // _subject: personaliza el asunto del correo en Formspree
        let subj = form.querySelector('input[name="_subject"]');
        if (!subj) {
            subj = document.createElement("input");
            subj.type = "hidden";
            subj.name = "_subject";
            form.appendChild(subj);
        }
        subj.value = asunto + " — " + nombre;

        // Mostrar estado y enviar el formulario por POST a Formspree
        respuesta.style.color = "green";
        respuesta.textContent = "Enviando...";

        // Permitir que el formulario se envíe por POST al action (Formspree)
        form.submit();
    });
})();
