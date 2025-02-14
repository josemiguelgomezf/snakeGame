// Variables globales
let currentDialogIndex = 0;
const dialogs = [
    "🔮 Lady Serpentina: Pobre Ser Knight, tan valiente... tan testarudo. Creíste que podías desafiarme y ahora, mírate. No eres más que un gusano alargado deslizándote por el suelo.",
    "⚔️ Ser Knight: ¡Soy un caballero! Y romperé esta maldición, te lo juro por mi espada... aunque ahora no tenga manos.",
    "🔮 Lady Serpentina: Ja, ja, ja. Adelante, si quieres recuperar tu forma, tendrás que cruzar mis dominios. Pero cuidado... cuanto más poder obtengas, más difícil será controlarlo."
];

const dialogsLevel1 = [
"🔮 Lady Serpentina: Bienvenido a tu primer desafío, caballero arrastrado. Este bosque está vivo... y no te quiere aquí.",
"⚔️ Ser Knight: No me importa cuántos hechizos hayas lanzado sobre esta tierra, encontraré la primera piedra encantada y daré el primer paso para romper tu maldición.",
"🔮 Lady Serpentina: Ja, ja, ja… Qué confiado. Pero este bosque no es solo árboles y sombras. Sus raíces tienen vida propia… y te aferrarán sin piedad si eres lo bastante torpe como para pisarlas.",
"🌿 (Raíces trampa aparecerán en el suelo. Si las tocas, ralentizarán tu movimiento por un breve periodo de tiempo.)",
"🔮 Lady Serpentina:¿Y esas frutas doradas que ves? Pequeños vestigios de la magia antigua. Algunas fortalecerán tu esencia… pero otras jugarán contigo, haciéndote aún más frágil.",
"🍏 (Las frutas mágicas pueden darte puntos… pero algunas tienen un 30% de probabilidad de encoger tu cuerpo.)",
"🔮 Lady Serpentina: Por supuesto, no podía dejar mi bosque sin vigilancia. El Druida Guardián patrulla estas tierras. No le agrada la presencia de intrusos… y si te atrapa, te devolverá al inicio sin piedad.",
"🧙‍♂️ (El Druida Guardián se mueve por un área específica. Si chocas con él, el nivel se reiniciará automáticamente.)",
"🔮 Lady Serpentina: Todo esto, envuelto en la belleza oscura de mi dominio. Árboles retorcidos, sombras danzantes y un suelo que susurra antiguas advertencias. No estás en un simple bosque… estás en mi trampa.",
"🌲 (El fondo del nivel es un oscuro bosque encantado, con colores sombríos y efectos visuales para una mayor inmersión.)",
"⚔️ Ser Knight: No me asustan tus ilusiones ni tus guardianes. Este es solo el primer paso en mi camino… y nada me detendrá."
];
const canvas = document.getElementById('particleCanvas');
        const ctx = canvas.getContext('2d');
        
        // Establece el tamaño del canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Partículas
        const particles = [];
        
        function Particle() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedY = Math.random() * 3 + 1;
        }

        Particle.prototype.update = function() {
            this.y += this.speedY;
            if (this.y > canvas.height) {
                this.y = -this.size;
            }
        };

        Particle.prototype.draw = function() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        };

        function createParticles() {
            for (let i = 0; i < 100; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        createParticles();
        animateParticles();
// Iniciar juego
document.getElementById('playButton').addEventListener('click', function() {
    document.getElementById('audioMenu').play();
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
        currentDialogIndex=0;
        document.getElementById('dialog').style.display='none';
        document.getElementById('levelSelect').style.display='flex';
    }
});

document.getElementById('continueLevel1Button').addEventListener('click', function() {
    if (currentDialogIndex < dialogsLevel1.length - 1) {
        currentDialogIndex++;
        showLevel1Dialog();
    } else {
        currentDialogIndex=0;
        document.getElementById('dialogLevel1').style.display='none';
        document.getElementById('game').style.display='flex';
        startGame();
    }
});

function showNextDialog() {
    document.getElementById('dialogText').textContent = dialogs[currentDialogIndex];
}
function showLevel1Dialog() {
    document.getElementById('dialogLevel1Text').textContent = dialogsLevel1[currentDialogIndex];
}

// Seleccionar nivel
document.getElementById('level1Button').addEventListener('click', function() {
    document.getElementById('levelSelect').style.display='none';
    document.getElementById('dialogLevel1').style.display='flex';
    showLevel1Dialog();
});

// Inicialización del juego
// Inicialización del juego
function startGame() {
    const canvas = document.getElementById('snakeGame');
    const ctx = canvas.getContext('2d');
    const gridSize = 6; // Ajustado a 6
    const tileCountX = Math.floor(canvas.width / gridSize);
    const tileCountY = Math.floor(canvas.height / gridSize);

    let snake = [{ x: 5, y: 5 }];
    let direction = { x: 0, y: 0 };
    let food = generateFood();
    let score = 0;
    let roots = generateRoots(5);
    let druid = { x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2) };
    let druidDirection = { x: 1, y: 0 };

    function gameLoop() {
        update();
        draw();
        setTimeout(gameLoop, 150);
    }

    function update() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        // Colisión con los bordes
        if (head.x < 0 || head.x >= tileCountX || head.y < 0 || head.y >= tileCountY) {
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

        // Colisión con raíces trampa
        for (let root of roots) {
            if (head.x === root.x && head.y === root.y) {
                slowDown();
            }
        }

        // Colisión con el Druida Guardián
        if (head.x === druid.x && head.y === druid.y) {
            resetGame();
            return;
        }

        snake.unshift(head);

        // Comer fruta mágica
        if (head.x === food.x && head.y === food.y) {
            food = generateFood();
            score++;
            document.getElementById('score').textContent = `Puntuación: ${score}`;
            if (Math.random() < 0.3) shrinkSnake(); // 30% de probabilidad de encoger
        } else {
            snake.pop();
        }

        moveDruid();
    }

    function draw() {
        ctx.fillStyle = '#003300'; // Fondo bosque oscuro
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dibujar la serpiente
        ctx.fillStyle = '#00FF00';
        snake.forEach(part => ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize));

        // Dibujar la fruta mágica
        ctx.fillStyle = 'gold';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

        // Dibujar las raíces trampa
        ctx.fillStyle = '#663300';
        roots.forEach(root => ctx.fillRect(root.x * gridSize, root.y * gridSize, gridSize, gridSize));

        // Dibujar al Druida Guardián
        ctx.fillStyle = 'purple';
        ctx.fillRect(druid.x * gridSize, druid.y * gridSize, gridSize, gridSize);
    }

    function resetGame() {
        snake = [{ x: 5, y: 5 }];
        direction = { x: 0, y: 0 };
        food = generateFood();
        roots = generateRoots(5);
        druid = { x: Math.floor(tileCountX / 2), y: Math.floor(tileCountY / 2) };
        druidDirection = { x: 1, y: 0 };
        score = 0;
        document.getElementById('score').textContent = `Puntuación: ${score}`;
    }

    function generateFood() {
        return {
            x: Math.floor(Math.random() * tileCountX),
            y: Math.floor(Math.random() * tileCountY)
        };
    }

    function generateRoots(count) {
        let rootsArray = [];
        for (let i = 0; i < count; i++) {
            rootsArray.push({
                x: Math.floor(Math.random() * tileCountX),
                y: Math.floor(Math.random() * tileCountY)
            });
        }
        return rootsArray;
    }

    function shrinkSnake() {
        if (snake.length > 2) {
            snake.pop();
        }
    }

    function slowDown() {
        setTimeout(() => {
            direction = { x: 0, y: 0 };
        }, 1000);
    }

    function moveDruid() {
        druid.x += druidDirection.x;
        druid.y += druidDirection.y;

        // Si el Druida toca los bordes, cambia de dirección aleatoriamente
        if (druid.x < 0 || druid.x >= tileCountX || druid.y < 0 || druid.y >= tileCountY) {
            druidDirection = randomDirection();
        }
    }

    function randomDirection() {
        const directions = [
            { x: 1, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: -1 }
        ];
        return directions[Math.floor(Math.random() * directions.length)];
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -1 };
        if (event.key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: 1 };
        if (event.key === 'ArrowLeft' && direction.x === 0) direction = { x: -1, y: 0 };
        if (event.key === 'ArrowRight' && direction.x === 0) direction = { x: 1, y: 0 };
    });

    document.getElementById('upButton').addEventListener('click', () => direction = { x: 0, y: -1 });
    document.getElementById('downButton').addEventListener('click', () => direction = { x: 0, y: 1 });
    document.getElementById('leftButton').addEventListener('click', () => direction = { x: -1, y: 0 });
    document.getElementById('rightButton').addEventListener('click', () => direction = { x: 1, y: 0 });

    document.getElementById('restartButton').addEventListener('click', () => resetGame());
    document.getElementById('reloadButton').addEventListener('click', () => location.reload());

    gameLoop();
}

