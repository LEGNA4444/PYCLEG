/**
 * LEGNAR Portfolio - Script Principal
 * Versión 2.0 - Mejorado y Centralizado
 *
 * Módulos:
 * - Modo oscuro (dark mode)
 * - Sistema de búsqueda
 * - Simulador de precios
 * - Validación de formulario de contacto
 * - Juego del Laberinto Matemático
 */

document.addEventListener("DOMContentLoaded", function () {
    /* ========================================
       MÓDULO 1: Modo Oscuro
       Gestiona el tema claro/oscuro con persistencia
       ======================================== */
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

    // Permitir activar/desactivar con la tecla "D"
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

    /* ========================================
       MÓDULO 2: Sistema de Búsqueda
       Filtrado en tiempo real de proyectos
       ======================================== */
    const searchInput = document.getElementById("search");
    if (searchInput) {
        // Lista de proyectos
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

        // Cerrar resultados al clicar fuera
        document.addEventListener("click", function (e) {
            if (!results.contains(e.target) && e.target !== searchInput) {
                results.innerHTML = "";
            }
        });

        // Si el input está vacío al cargar, no mostrar nada
        results.innerHTML = "";
    }

    /* ========================================
       MÓDULO 3: Simulador de Precios
       Calcula total dinámico según selecciones
       ======================================== */
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

    /* ========================================
       MÓDULO 4: Formulario de Contacto
       Validación y envío via Formspree
       ======================================== */
    (function () {
        const form = document.getElementById("form-contacto");
        const respuesta = document.getElementById("form-respuesta");

        if (!form) return;

        form.addEventListener("submit", function (e) {
            const nombre = document.getElementById("nombre").value.trim();
            const email = document.getElementById("email").value.trim();
            const asunto = document.getElementById("asunto").value.trim();
            const mensaje = document.getElementById("mensaje").value.trim();

            // Validar que todos los campos estén completos antes de permitir el envío
            if (!nombre || !email || !asunto || !mensaje) {
                e.preventDefault();
                respuesta.style.color = "crimson";
                respuesta.textContent =
                    "Por favor completa todos los campos obligatorios.";
                return;
            }

            // Añadir campos ocultos recomendados por Formspree
            let reply = form.querySelector('input[name="_replyto"]');
            if (!reply) {
                reply = document.createElement("input");
                reply.type = "hidden";
                reply.name = "_replyto";
                form.appendChild(reply);
            }
            reply.value = email;

            let subj = form.querySelector('input[name="_subject"]');
            if (!subj) {
                subj = document.createElement("input");
                subj.type = "hidden";
                subj.name = "_subject";
                form.appendChild(subj);
            }
            subj.value = asunto + " — " + nombre;

            respuesta.style.color = "green";
            respuesta.textContent = "Enviando...";
        });
    })();

    /* ========================================
       MÓDULO 5: Juego del Laberinto Matemático
       ======================================== */
    const gameGrid = document.getElementById("game-grid");
    const movesLeftEl = document.getElementById("moves-left");
    const levelEl = document.getElementById("level");

    if (gameGrid) {
        const MAX_LEVEL = 50;
        const STORAGE_KEY = "game-progress";
        let isMoving = false;

        const game = {
            level: 1,
            gridSize: { columns: 4, rows: 4 },
            moves: 5,
            player: { x: 0, y: 0 },
            points: [],
            start: { x: 0, y: 0 },

            init() {
                this.loadProgress();
                this.setupGame();
            },

            saveProgress() {
                try {
                    const progress = {
                        level: this.level,
                        moves: this.moves,
                        timestamp: Date.now(),
                    };
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
                } catch (e) {
                    console.log("No se pudo guardar el progreso");
                }
            },

            loadProgress() {
                try {
                    const saved = localStorage.getItem(STORAGE_KEY);
                    if (saved) {
                        const progress = JSON.parse(saved);
                        this.level = Math.max(1, Math.min(progress.level, MAX_LEVEL));
                    } else {
                        this.level = 1;
                    }
                } catch (e) {
                    this.level = 1;
                }
            },

            setupGame() {
                let columns = 5 + (this.level - 1) * 0.5;
                let rows = 10 + (this.level - 1) * 0.8;

                if (this.level >= 20) {
                    columns = Math.min(20, 5 + (this.level - 1) * 0.3);
                    rows = Math.min(25, 10 + (this.level - 1) * 0.5);
                }

                this.gridSize = {
                    columns: Math.floor(columns),
                    rows: Math.floor(rows),
                };
                this.moves = Math.max(3, Math.floor(8 - (this.level - 1) * 0.15));
                this.player = { x: 0, y: 0 };
                this.points = [];
                this.start = { x: 0, y: 0 };
                this.generatePoints();
                this.renderGrid();
                this.updateGameInfo();
            },

            isNearExistingPoint(x, y, minDistance) {
                for (const point of this.points) {
                    const distance = Math.abs(x - point.x) + Math.abs(y - point.y);
                    if (distance < minDistance) {
                        return true;
                    }
                }
                return false;
            },

            generatePoints() {
                this.points = [];
                const condition = Math.random() < 0.7;
                let numberOfPoints;

                if (condition) {
                    numberOfPoints = Math.floor(this.gridSize.columns * 0.9);
                } else {
                    const baseValue = Math.floor(this.gridSize.columns * 0.9);
                    numberOfPoints = Math.floor(baseValue * 0.6);
                }

                numberOfPoints = Math.min(
                    numberOfPoints,
                    Math.floor(this.gridSize.columns * this.gridSize.rows * 0.15),
                );
                if (numberOfPoints < 2) {
                    numberOfPoints = 2;
                }

                const MIN_POINT_DISTANCE_BETWEEN_POINTS = Math.max(
                    4,
                    Math.floor(5 - this.level * 0.05),
                );

                const MIN_DISTANCE_FROM_PLAYER = Math.floor(this.moves * 0.85);
                let firstPointGenerated = false;
                let attempts = 0;
                const MAX_FIRST_POINT_ATTEMPTS = 500;

                while (!firstPointGenerated && attempts < MAX_FIRST_POINT_ATTEMPTS) {
                    attempts++;
                    const x = Math.floor(Math.random() * this.gridSize.columns);
                    const y = Math.floor(Math.random() * this.gridSize.rows);
                    const distance = Math.abs(x - this.start.x) + Math.abs(y - this.start.y);

                    if (distance >= MIN_DISTANCE_FROM_PLAYER && distance <= this.moves) {
                        this.points.push({
                            x: x,
                            y: y,
                            value: Math.floor(Math.random() * 10) + 1,
                        });
                        firstPointGenerated = true;
                    }
                }

                if (!firstPointGenerated) {
                    for (let y = 0; y < this.gridSize.rows && !firstPointGenerated; y++) {
                        for (let x = 0; x < this.gridSize.columns && !firstPointGenerated; x++) {
                            if ((x !== this.start.x || y !== this.start.y) && !this.isPoint(x, y)) {
                                this.points.push({
                                    x: x,
                                    y: y,
                                    value: Math.floor(Math.random() * 10) + 1,
                                });
                                firstPointGenerated = true;
                            }
                        }
                    }
                }

                let attempts2 = 0;
                const MAX_ATTEMPTS = Math.max(1000, numberOfPoints * 50);
                while (this.points.length < numberOfPoints && attempts2 < MAX_ATTEMPTS) {
                    attempts2++;
                    const x = Math.floor(Math.random() * this.gridSize.columns);
                    const y = Math.floor(Math.random() * this.gridSize.rows);

                    if (
                        (x !== this.start.x || y !== this.start.y) &&
                        !this.isPoint(x, y) &&
                        !this.isNearExistingPoint(x, y, MIN_POINT_DISTANCE_BETWEEN_POINTS + 1)
                    ) {
                        this.points.push({
                            x: x,
                            y: y,
                            value: Math.floor(Math.random() * 10) + 1,
                        });
                    }
                }
            },

            isPoint(x, y) {
                return this.points.some((p) => p.x === x && p.y === y);
            },

            renderGrid() {
                gameGrid.innerHTML = "";
                gameGrid.style.gridTemplateColumns = `repeat(${this.gridSize.columns}, 1fr)`;
                gameGrid.style.gridTemplateRows = `repeat(${this.gridSize.rows}, 1fr)`;

                for (let y = 0; y < this.gridSize.rows; y++) {
                    for (let x = 0; x < this.gridSize.columns; x++) {
                        const cell = document.createElement("div");
                        cell.classList.add("grid-cell");
                        cell.dataset.x = x;
                        cell.dataset.y = y;

                        const point = this.points.find((p) => p.x === x && p.y === y);
                        if (point) {
                            cell.textContent = point.value;
                            cell.classList.add("point-cell");
                        }

                        if (x === this.player.x && y === this.player.y) {
                            cell.classList.add("current");
                        } else if (
                            Math.abs(x - this.player.x) + Math.abs(y - this.player.y) <=
                            this.moves
                        ) {
                            cell.classList.add("movable");
                        } else {
                            cell.classList.add("unmovable");
                        }

                        cell.addEventListener("click", () => this.movePlayer(x, y));
                        gameGrid.appendChild(cell);
                    }
                }
            },

            updateGameInfo() {
                if (movesLeftEl) movesLeftEl.textContent = this.moves;
                if (levelEl) levelEl.textContent = this.level;
            },

            movePlayer(targetX, targetY) {
                if (isMoving) return;

                const distance =
                    Math.abs(targetX - this.player.x) +
                    Math.abs(targetY - this.player.y);

                if (distance > 0 && distance <= this.moves) {
                    isMoving = true;
                    let currentPath = [];
                    let tempX = this.player.x;
                    let tempY = this.player.y;

                    while (tempX !== targetX) {
                        tempX += targetX > tempX ? 1 : -1;
                        currentPath.push({ x: tempX, y: tempY });
                    }
                    while (tempY !== targetY) {
                        tempY += targetY > tempY ? 1 : -1;
                        currentPath.push({ x: tempX, y: tempY });
                    }

                    let stepIndex = 0;
                    const animateFastMove = () => {
                        if (stepIndex < currentPath.length) {
                            const nextPos = currentPath[stepIndex];
                            this.player.x = nextPos.x;
                            this.player.y = nextPos.y;
                            this.moves--;
                            this.updateGameInfo();
                            this.renderGrid();
                            stepIndex++;
                            setTimeout(animateFastMove, 50);
                        } else {
                            isMoving = false;
                            const point = this.points.find(
                                (p) => p.x === targetX && p.y === targetY,
                            );
                            if (point) {
                                this.moves += point.value;
                                this.points = this.points.filter(
                                    (p) => p.x !== targetX || p.y !== targetY,
                                );
                            }
                            this.updateGameInfo();
                            this.renderGrid();
                            this.checkWinCondition();
                        }
                    };
                    animateFastMove();
                }
            },

            checkWinCondition() {
                if (this.points.length === 0) {
                    this.level++;
                    if (this.level > MAX_LEVEL) {
                        alert("¡Felicidades! Has completado todos los niveles. ¡Eres un maestro!");
                        this.level = MAX_LEVEL;
                        this.saveProgress();
                    } else {
                        alert(`¡Nivel completado! Avanzas al nivel ${this.level}.`);
                        this.saveProgress();
                        this.setupGame();
                    }
                } else if (this.moves <= 0) {
                    alert("¡Te has quedado sin movimientos! Reiniciando nivel.");
                    this.setupGame();
                }
            },
        };

        // Inicializar juego de inmediato ya que estamos en DOMContentLoaded
        game.init();

        const resetBtn = document.getElementById("reset-button");
        if (resetBtn) {
            resetBtn.addEventListener("click", function () {
                game.init();
            });
        }

        /* ========================================
           Soporte de Audio Fallback Integrado
           ======================================== */
        const bgmusic = document.getElementById("background-music");
        let audioCtx = null, osc = null, gain = null;

        const startGeneratedAudio = () => {
            if (audioCtx) return;
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            gain = audioCtx.createGain();
            gain.gain.value = 0.06;
            gain.connect(audioCtx.destination);

            osc = audioCtx.createOscillator();
            osc.type = "sine";
            osc.frequency.value = 220;
            osc.connect(gain);
            osc.start();

            const melodyInterval = setInterval(() => {
                if (!audioCtx) {
                    clearInterval(melodyInterval);
                    return;
                }
                const base = 220;
                const steps = [0, 3, 5, 7, 10];
                const step = steps[Math.floor(Math.random() * steps.length)];
                const freq = base * Math.pow(2, step / 12);
                osc.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.08);
            }, 420);
        };

        if (bgmusic) {
            bgmusic.volume = 0.06;
            bgmusic.loop = true;
            bgmusic.addEventListener("error", startGeneratedAudio);
            
            const tryPlay = () => {
                bgmusic.play().catch(() => startGeneratedAudio());
                document.removeEventListener("click", tryPlay);
            };
            document.addEventListener("click", tryPlay);
        } else {
            document.addEventListener("click", startGeneratedAudio, { once: true });
        }
    }
});
