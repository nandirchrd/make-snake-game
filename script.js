const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const container = document.querySelector('.container');
let LEFT = container.querySelector('.LEFT');
let UP = container.querySelector('.UP');
let RIGHT = container.querySelector('.RIGHT');
let DOWN = container.querySelector('.DOWN');

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

let tileCount = 20,
    tileSize = canvas.width / tileCount,
    headX = tileCount / 2,
    headY = tileCount / 2,
    foodX = 2,
    foodY = 2,
    xVelocity = 0,
    yVelocity = 0,
    score = 0,
    speed = 8;



let drawGame = function () {

    console.log(`X: ${headX + 1}\nY: ${headY + 1}`);
    clearScreen();
    drawSnake();
    drawFood();
    drawScore();
    snakeMove();
    collider();

    setTimeout(drawGame, 1000 / speed);
}



let clearScreen = function () {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

let collider = function () {
    if (headX >= canvas.width / tileSize) {
        headX = 0;
    }
    if (headX < 0) {
        headX = tileCount - 1;
    }
    if (headY >= canvas.height / tileSize) {
        headY = 0;
    }
    if (headY < 0) {
        headY = tileCount - 1;
    }
}

let drawSnake = function () {
    ctx.fillStyle = 'red';
    ctx.fillRect(headX * tileSize, headY * tileSize, tileSize, tileSize);
}
let drawFood = function () {
    if (foodX === headX && foodY === headY) {
        new Audio("https://docs.google.com/uc?export=download&id=1-7fsuRzzo-7z3R_02AYk48cnz6Znd5c0").play();
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        score++;
    }
    ctx.fillStyle = 'green';
    ctx.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);
}

let drawScore = function () {
    ctx.fillStyle = 'white';
    ctx.font = '2vmin arial';
    ctx.fillText(`SCORE : ${score}`, canvas.width - 60, 20)
}
let snakeMove = function () {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

document.body.addEventListener('keydown', function (e) {
    // UP
    if (e.keyCode === 38 && yVelocity !== 1) {
        xVelocity = 0;
        yVelocity = -1;
    }
    // DOWN
    if (e.keyCode === 40 && yVelocity !== -1) {
        xVelocity = 0;
        yVelocity = 1;
    }
    // LEFT
    if (e.keyCode === 37 && xVelocity !== 1) {
        xVelocity = -1;
        yVelocity = 0;
    }
    // RIGHT
    if (e.keyCode === 39 && xVelocity !== -1) {
        xVelocity = 1;
        yVelocity = 0;
    }
})

RIGHT.addEventListener('click', function (e) {
    if (xVelocity !== -1) {
        xVelocity = 1;
        yVelocity = 0;
    }
});
LEFT.addEventListener('click', function (e) {
    if (xVelocity !== 1) {
        xVelocity = -1;
        yVelocity = 0;
    }
});
UP.addEventListener('click', function (e) {
    if (yVelocity !== 1) {
        xVelocity = 0;
        yVelocity = -1;
    }
});
DOWN.addEventListener('click', function (e) {
    if (yVelocity !== -1) {
        xVelocity = 0;
        yVelocity = 1;
    }
});

drawGame();

