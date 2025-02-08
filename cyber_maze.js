const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;
const tileSize = 40;

// Load Images
const playerImg = new Image();
playerImg.src = "detective.png";

const hackerImg = new Image();
hackerImg.src = "hacker1.png";

const exitImg = new Image();
exitImg.src = "exit.png";

const player = { x: 0, y: 0 };
const hacker = { x: 360, y: 360 };
const safeZone = { x: 360, y: 0 };

// Walls (Safe Zone is reachable)
const walls = [
    { x: 40, y: 40 }, { x: 40, y: 80 }, { x: 40, y: 120 }, { x: 40, y: 160 },
    { x: 80, y: 160 }, { x: 120, y: 160 }, { x: 160, y: 160 }, { x: 160, y: 120 },
    { x: 160, y: 80 }, { x: 160, y: 40 }, { x: 200, y: 40 }, { x: 240, y: 40 },
    { x: 280, y: 40 }, { x: 280, y: 80 }, { x: 280, y: 120 }, { x: 280, y: 160 },
    { x: 320, y: 160 }, { x: 360, y: 160 }, { x: 360, y: 200 }
];

// Sound Effects
const moveSound = new Audio("sounds/move.mp3");
const winSound = new Audio("sounds/win.mp3");
const loseSound = new Audio("sounds/lose.mp3");

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Walls
    ctx.fillStyle = "black";
    walls.forEach(wall => ctx.fillRect(wall.x, wall.y, tileSize, tileSize));

    // Draw Safe Zone (Exit)
    ctx.drawImage(exitImg, safeZone.x, safeZone.y, tileSize, tileSize);

    // Draw Hacker
    ctx.drawImage(hackerImg, hacker.x, hacker.y, tileSize, tileSize);

    // Draw Player
    ctx.drawImage(playerImg, player.x, player.y, tileSize, tileSize);
}

// Hacker Moves Randomly
function moveHacker() {
    let moves = [
        { x: hacker.x, y: hacker.y - tileSize },
        { x: hacker.x, y: hacker.y + tileSize },
        { x: hacker.x - tileSize, y: hacker.y },
        { x: hacker.x + tileSize, y: hacker.y }
    ];

    moves = moves.filter(move =>
        !walls.some(wall => wall.x === move.x && wall.y === move.y) &&
        move.x >= 0 && move.y >= 0 && move.x < canvas.width && move.y < canvas.height
    );

    if (moves.length > 0) {
        const randomMove = moves[Math.floor(Math.random() * moves.length)];
        hacker.x = randomMove.x;
        hacker.y = randomMove.y;
    }
}

// Player Movement
document.addEventListener("keydown", (e) => {
    let newX = player.x;
    let newY = player.y;

    if (e.key === "ArrowUp") newY -= tileSize;
    if (e.key === "ArrowDown") newY += tileSize;
    if (e.key === "ArrowLeft") newX -= tileSize;
    if (e.key === "ArrowRight") newX += tileSize;

    if (!walls.some(wall => wall.x === newX && wall.y === newY) &&
        newX >= 0 && newY >= 0 && newX < canvas.width && newY < canvas.height) {
        player.x = newX;
        player.y = newY;
        moveSound.play();
        moveHacker();
    }

    if (player.x === safeZone.x && player.y === safeZone.y) {
        winSound.play();
        alert("🎉 You escaped! Well done!");
        resetGame();
    }

    if (player.x === hacker.x && player.y === hacker.y) {
        loseSound.play();
        alert("⚠️ Hacker caught you! Try again.");
        resetGame();
    }

    drawGame();
});

// Reset Game
function resetGame() {
    player.x = 0;
    player.y = 0;
    hacker.x = 360;
    hacker.y = 360;
    drawGame();
}

function startGame() {
    document.getElementById("overlay").style.display = "none";
    drawGame();
}

// Show instructions at start
document.getElementById("overlay").style.display = "block";
