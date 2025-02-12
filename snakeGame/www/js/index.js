// Variables globales
let currentDialogIndex = 0;
const dialogs = [
    "🔮 *Lady Serpentina:* Pobre Ser Knight, tan valiente... tan testarudo. Creíste que podías desafiarme y ahora, mírate. No eres más que un gusano alargado deslizándote por el suelo.",
    "⚔️ *Ser Knight:* ¡Soy un caballero! Y romperé esta maldición, te lo juro por mi espada... aunque ahora no tenga manos.",
    "🔮 *Lady Serpentina:* Ja, ja, ja. Adelante, si quieres recuperar tu forma, tendrás que cruzar mis dominios. Pero cuidado... cuanto más poder obtengas, más difícil será controlarlo."
];

// Iniciar juego
document.getElementById('playButton').addEventListener('click', function() {
    document.getElementById('menu').style.display='none';
    document.getElementById('dialog').style.display='flex';
    showNextDialog();
});

// Mostrar diálogo frase por frase
document.getElementById('continueButton').addEventListener('click', function() {
    if (currentDialogIndex < dialogs.length - 1) {
        currentDialogIndex++;
        showNextDialog();
    } else {
        document.getElementById('dialog').style.display='none';
        document.getElementById('levelSelect').style.display='flex';
    }
});

function showNextDialog() {
    document.getElementById('dialogText').textContent = dialogs[currentDialogIndex];
}

// Seleccionar nivel
document.getElementById('level1Button').addEventListener('click', function() {
    document.getElementById('levelSelect').style.display='none';
    document.getElementById('game').style.display='flex';
    startGame();
});

// Lógica del juego
function startGame() {
    const canvas = document.getElementById('snakeGame');
    const ctx = canvas.getContext('2d');
    const gridSize = 5;
    const tileCount = canvas.width / gridSize;

    let snake = [{ x: 10, y: 10 }];
    let direction = { x: 0, y: 0 };
    let food = { x: 5, y: 5 };
    let score = 0;

    function gameLoop() {
        update();
        draw();
        setTimeout(gameLoop, 150); // Velocidad más lenta
    }

    function update() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        // Colisión con los bordes
        if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
            resetGame();
            return;
        }
        

        // Colisión consigo misma
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                resetGame();
                return;
            }
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
            score++;
            document.getElementById('score').textContent = `Puntuación: ${score}`;
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

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = { x: 0, y: 0 };
        food = { x: 5, y: 5 };
        score = 0;
        document.getElementById('score').textContent = `Puntuación: ${score}`;
    }

    function reloadGame() {
        location.reload();
    }

    // Controles
    document.getElementById('upButton').addEventListener('click', () => direction = { x: 0, y: -1 });
    document.getElementById('downButton').addEventListener('click', () => direction = { x: 0, y: 1 });
    document.getElementById('leftButton').addEventListener('click', () => direction = { x: -1, y: 0 });
    document.getElementById('rightButton').addEventListener('click', () => direction = { x: 1, y: 0 });

    // Reiniciar nivel
    document.getElementById('restartButton').addEventListener('click', resetGame);
    document.getElementById('reloadButton').addEventListener('click', reloadGame);

    gameLoop();
}