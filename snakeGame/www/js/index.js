document.addEventListener('DOMContentLoaded', () => {
    const menuMusic = document.getElementById('menu-music');
    menuMusic.play();
});

function showDialog() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('dialog').classList.remove('hidden');
}

function showOptions() {
    alert("Opciones no implementadas aún.");
}

function startGameAfterDialog() {
    document.getElementById('dialog').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20;
let rows, columns;
let snake, fruit, score, intervalId, traps, trapInterval;
let difficulty = 'easy';

function startGame(selectedDifficulty) {
    difficulty = selectedDifficulty;
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('controls').classList.remove('hidden');

    canvas.width = 300;
    canvas.height = 300;
    rows = canvas.height / scale;
    columns = canvas.width / scale;

    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();

    traps = [];
    score = 0;
    document.getElementById('score').innerText = score;

    let speed = difficulty === 'easy' ? 250 : 150;

    intervalId = window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();
        drawTraps();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
            score++;
            document.getElementById('score').innerText = score;
            addTrap();
        }

        snake.checkCollision();
    }, speed);

    trapInterval = window.setInterval(addTrap, 5000);
}

function endGame() {
    clearInterval(intervalId);
    clearInterval(trapInterval);
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('controls').classList.add('hidden');
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('final-score').innerText = score;
}

function restartGame() {
    document.getElementById('game-over').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
}

function changeDirection(direction) {
    snake.changeDirection(direction);
}

window.addEventListener('keydown', evt => {
    const direction = evt.key.replace('Arrow', '');
    changeDirection(direction);
});

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];

    this.draw = function() {
        ctx.fillStyle = "#FFF";

        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }

        ctx.fillRect(this.x, this.y, scale, scale);
    }

    this.update = function() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        this.tail[this.total - 1] = { x: this.x, y: this.y };

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x >= canvas.width) {
            this.x = 0;
        }

        if (this.y >= canvas.height) {
            this.y = 0;
        }

        if (this.x < 0) {
            this.x = canvas.width - scale;
        }

        if (this.y < 0) {
            this.y = canvas.height - scale;
        }
    }

    this.changeDirection = function(direction) {
        switch (direction) {
            case 'Up':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = -scale * 1;
                }
                break;
            case 'Down':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = scale * 1;
                }
                break;
            case 'Left':
                if (this.xSpeed === 0) {
                    this.xSpeed = -scale * 1;
                    this.ySpeed = 0;
                }
                break;
            case 'Right':
                if (this.xSpeed === 0) {
                    this.xSpeed = scale * 1;
                    this.ySpeed = 0;
                }
                break;
        }
    }

    this.eat = function(fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
            this.total++;
            return true;
        }

        return false;
    }

    this.checkCollision = function() {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                endGame();
            }
        }

        for (let i = 0; i < traps.length; i++) {
            if (this.x === traps[i].x && this.y === traps[i].y) {
                endGame();
            }
        }
    }
}

function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = Math.floor(Math.random() * rows) * scale;
        this.y = Math.floor(Math.random() * columns) * scale;
    }

    this.draw = function() {
        ctx.fillStyle = "#4cafab";
        ctx.fillRect(this.x, this.y, scale, scale);
    }
}

function addTrap() {
    let trap = new Trap();
    trap.pickLocation();
    traps.push(trap);
}

function drawTraps() {
    traps.forEach(trap => trap.draw());
}

function Trap() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = Math.floor(Math.random() * rows) * scale;
        this.y = Math.floor(Math.random() * columns) * scale;
    }

    this.draw = function() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, scale, scale);
    }
}