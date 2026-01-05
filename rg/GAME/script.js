const gameGrid = document.getElementById('game-grid');
const movesLeftEl = document.getElementById('moves-left');
const levelEl = document.getElementById('level');

const MAX_LEVEL = 20;
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
    this.level = 1;
    this.setupGame();
  },

  setupGame() {
    let columns = 4 + (this.level - 1) * 2;
    let rows = 8 + (this.level - 1) ;

    if (this.level >= 16) {
      columns = 16;
      rows = 4 + (this.level - 1);
    }

    this.gridSize = { columns: columns, rows: rows };
    this.moves = 4 + (this.level - 1) * 4 + 1;
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
    
    const condition = Math.random() < 0.8;
    let numberOfPoints;

    if (condition) {
      numberOfPoints = Math.floor(this.gridSize.columns / 2);
    } else {
      const baseValue = Math.floor(this.gridSize.columns / 2);
      numberOfPoints = Math.floor(baseValue * 0.35);
    }

    if (numberOfPoints < 1) {
      numberOfPoints = 1;
    }

    const MIN_POINT_DISTANCE_BETWEEN_POINTS = 4; 
    
    // Nueva lógica para el punto a un 80% de distancia
    const MIN_DISTANCE_FROM_PLAYER = Math.floor(this.moves * 0.8);
    let firstPointGenerated = false;

    // Generar al menos un punto a la distancia mínima del 80%
    while (!firstPointGenerated) {
        const x = Math.floor(Math.random() * this.gridSize.columns);
        const y = Math.floor(Math.random() * this.gridSize.rows);
        const distance = Math.abs(x - this.start.x) + Math.abs(y - this.start.y);

        if (distance >= MIN_DISTANCE_FROM_PLAYER && distance <= this.moves) {
            this.points.push({ x: x, y: y, value: Math.floor(Math.random() * 10) + 1 });
            firstPointGenerated = true;
        }
    }

    // Generar el resto de los puntos
    while (this.points.length < numberOfPoints) {
      const x = Math.floor(Math.random() * this.gridSize.columns);
      const y = Math.floor(Math.random() * this.gridSize.rows);
      
      if ((x !== this.start.x || y !== this.start.y) && !this.isPoint(x, y) && !this.isNearExistingPoint(x, y, MIN_POINT_DISTANCE_BETWEEN_POINTS + 1)) {
        this.points.push({ x: x, y: y, value: Math.floor(Math.random() * 10) + 1 });
      }
    }
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
        alert("¡Felicidades! Has completado todos los niveles.");
        this.level = MAX_LEVEL;
        // Opcional: puedes deshabilitar el grid o mostrar un mensaje final
      } else {
        alert(`¡Nivel completado! Avanzas al nivel ${this.level}.`);
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

window.onload = () => game.init();
