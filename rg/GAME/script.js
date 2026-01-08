const bgmusic = document.getElementById('background-music');
const gameGrid = document.getElementById('game-grid');
const movesLeftEl = document.getElementById('moves-left');
const levelEl = document.getElementById('level');

bgmusic.volume = 0.06; // Volumen inicial bajo
bgmusic.loop = true; // Repetir música de fondo
bgmusic.play().catch(() => {
  // Manejar error de reproducción automática
});
bgmusic.addEventListener('ended', () => {
  bgmusic.currentTime = 0;
  bgmusic.play();
});

const MAX_LEVEL = 50;
const STORAGE_KEY = 'game-progress';
let isMoving = false; 
// Variable de control de movimiento

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
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.log('No se pudo guardar el progreso');
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

    this.gridSize = { columns: Math.floor(columns), rows: Math.floor(rows) };
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

    numberOfPoints = Math.min(numberOfPoints, Math.floor(this.gridSize.columns * this.gridSize.rows * 0.15));
    if (numberOfPoints < 2) {
      numberOfPoints = 2;
    }

    const MIN_POINT_DISTANCE_BETWEEN_POINTS = Math.max(4, Math.floor(5 - this.level * 0.05)); 
    
    // Nueva lógica para el punto a un 85% de distancia (con protección contra bucles)
    const MIN_DISTANCE_FROM_PLAYER = Math.floor(this.moves * 0.85);
    let firstPointGenerated = false;
    let attempts = 0;
    const MAX_FIRST_POINT_ATTEMPTS = 500;

    // Generar al menos un punto a la distancia mínima del 85% (intentos limitados)
    while (!firstPointGenerated && attempts < MAX_FIRST_POINT_ATTEMPTS) {
        attempts++;
        const x = Math.floor(Math.random() * this.gridSize.columns);
        const y = Math.floor(Math.random() * this.gridSize.rows);
        const distance = Math.abs(x - this.start.x) + Math.abs(y - this.start.y);

        if (distance >= MIN_DISTANCE_FROM_PLAYER && distance <= this.moves) {
            this.points.push({ x: x, y: y, value: Math.floor(Math.random() * 10) + 1 });
            firstPointGenerated = true;
        }
    }

    // Fallback: si no se pudo generar tras muchos intentos, coloca el primer punto en la primera celda libre
    if (!firstPointGenerated) {
      for (let y = 0; y < this.gridSize.rows && !firstPointGenerated; y++) {
        for (let x = 0; x < this.gridSize.columns && !firstPointGenerated; x++) {
          if ((x !== this.start.x || y !== this.start.y) && !this.isPoint(x, y)) {
            this.points.push({ x: x, y: y, value: Math.floor(Math.random() * 10) + 1 });
            firstPointGenerated = true;
          }
        }
      }
    }

    // Generar el resto de los puntos (con límite de intentos para evitar bucles)
    let attempts2 = 0;
    const MAX_ATTEMPTS = Math.max(1000, numberOfPoints * 50);
    while (this.points.length < numberOfPoints && attempts2 < MAX_ATTEMPTS) {
      attempts2++;
      const x = Math.floor(Math.random() * this.gridSize.columns);
      const y = Math.floor(Math.random() * this.gridSize.rows);
      
      if ((x !== this.start.x || y !== this.start.y) && !this.isPoint(x, y) && !this.isNearExistingPoint(x, y, MIN_POINT_DISTANCE_BETWEEN_POINTS + 1)) {
        this.points.push({ x: x, y: y, value: Math.floor(Math.random() * 10) + 1 });
      }
    }

    // Si no se alcanzó el número deseado, no entorpecer el juego; aceptar la cantidad generada
  },

  isPoint(x, y) {
    return this.points.some(p => p.x === x && p.y === y);
  },

  renderGrid() {
    gameGrid.innerHTML = '';
    gameGrid.style.gridTemplateColumns = `repeat(${this.gridSize.columns}, 1fr)`;
    gameGrid.style.gridTemplateRows = `repeat(${this.gridSize.rows}, 1fr)`; // <-- Agrega esta línea

    for (let y = 0; y < this.gridSize.rows; y++) {
      for (let x = 0; x < this.gridSize.columns; x++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.dataset.x = x;
        cell.dataset.y = y;

        const point = this.points.find(p => p.x === x && p.y === y);
        if (point) {
          cell.textContent = point.value;
          cell.classList.add('point-cell');
        }

        if (x === this.player.x && y === this.player.y) {
          cell.classList.add('current');
        } else if (Math.abs(x - this.player.x) + Math.abs(y - this.player.y) <= this.moves) {
          cell.classList.add('movable');
        } else {
          cell.classList.add('unmovable');
        }

        cell.addEventListener('click', () => this.movePlayer(x, y));
        gameGrid.appendChild(cell);
      }
    }
  },

  updateGameInfo() {
    movesLeftEl.textContent = this.moves;
    levelEl.textContent = this.level;
  },

  movePlayer(targetX, targetY) {
    if (isMoving) return;

    const distance = Math.abs(targetX - this.player.x) + Math.abs(targetY - this.player.y);

    if (distance > 0 && distance <= this.moves) {
        
        isMoving = true;
        let currentPath = [];
        
        let tempX = this.player.x;
        let tempY = this.player.y;

        while (tempX !== targetX) {
            tempX += (targetX > tempX) ? 1 : -1;
            currentPath.push({ x: tempX, y: tempY });
        }
        while (tempY !== targetY) {
            tempY += (targetY > tempY) ? 1 : -1;
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
                
                const point = this.points.find(p => p.x === targetX && p.y === targetY);
                if (point) {
                    this.moves += point.value;
                    this.points = this.points.filter(p => p.x !== targetX || p.y !== targetY);
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
  }
};



function resetGame() {
  game.init();
}

// Inicializa audio dinámico como fallback si el MP3 falla o está ausente
function initBackgroundAudioFallback() {
  const audioEl = document.getElementById('background-music');
  let audioCtx, osc, gain;

  const startGeneratedAudio = () => {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    gain = audioCtx.createGain();
    gain.gain.value = 0.06;
    gain.connect(audioCtx.destination);

    osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 220;
    osc.connect(gain);
    osc.start();

    // Cambios suaves de frecuencia para una melodia minimal
    const melodyInterval = setInterval(() => {
      if (!audioCtx) { clearInterval(melodyInterval); return; }
      const base = 220;
      const steps = [0, 3, 5, 7, 10];
      const step = steps[Math.floor(Math.random() * steps.length)];
      const freq = base * Math.pow(2, step / 12);
      osc.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.08);
    }, 420);
  };

  if (audioEl) {
    audioEl.addEventListener('error', startGeneratedAudio);
    const tryPlay = () => {
      audioEl.play().catch(() => startGeneratedAudio());
      document.removeEventListener('click', tryPlay);
    };
    document.addEventListener('click', tryPlay);
  } else {
    document.addEventListener('click', startGeneratedAudio, { once: true });
  }
}

window.addEventListener('load', () => {
  game.init();
  const resetBtn = document.getElementById('reset-button');
  if (resetBtn) resetBtn.addEventListener('click', resetGame);
  initBackgroundAudioFallback();
});
