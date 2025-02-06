// Variables globales
let currentDialogIndex = 0;
const dialogs = [
    "🔮 *Lady Serpentina:* Pobre Ser Knight, tan valiente... tan testarudo. Creíste que podías desafiarme y ahora, mírate. No eres más que un gusano alargado deslizándote por el suelo.",
    "⚔️ *Ser Knight:* ¡Soy un caballero! Y romperé esta maldición, te lo juro por mi espada... aunque ahora no tenga manos.",
    "🔮 *Lady Serpentina:* Ja, ja, ja. Adelante, si quieres recuperar tu forma, tendrás que cruzar mis dominios. Pero cuidado... cuanto más poder obtengas, más difícil será controlarlo."
];

// Iniciar juego
document.getElementById('playButton').addEventListener('click', function() {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('dialog').classList.remove('hidden');
    showNextDialog();
});

// Mostrar diálogo frase por frase
document.getElementById('continueButton').addEventListener('click', function() {
    if (currentDialogIndex < dialogs.length - 1) {
        currentDialogIndex++;
        showNextDialog();
    } else {
        document.getElementById('dialog').classList.add('hidden');
        document.getElementById('game').classList.remove('hidden');
        startGame();
    }
});

function showNextDialog() {
    document.getElementById('dialogText').textContent = dialogs[currentDialogIndex];
}

// Lógica del juego
function startGame() {
    const canvas = document.getElementById('snakeGame');
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    let snake = [{ x: 10, y: 10 }];
    let direction = { x: 0, y: 0 };
    let food = { x: 5, y: 5 };

    function gameLoop() {
        update();
        draw();
        setTimeout(gameLoop, 100);
    }

    function update() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
        } else {
            snake.pop();
        }
    }

    function draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'lime';
        snake.forEach(part => ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize));

        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }

    // Controles
    document.getElementById('upButton').addEventListener('click', () => direction = { x: 0, y: -1 });
    document.getElementById('downButton').addEventListener('click', () => direction = { x: 0, y: 1 });
    document.getElementById('leftButton').addEventListener('click', () => direction = { x: -1, y: 0 });
    document.getElementById('rightButton').addEventListener('click', () => direction = { x: 1, y: 0 });

    // Reiniciar nivel
    document.getElementById('restartButton').addEventListener('click', function() {
        snake = [{ x: 10, y: 10 }];
        direction = { x: 0, y: 0 };
        food = { x: 5, y: 5 };
    });

    gameLoop();
}