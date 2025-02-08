const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;

let score = 0;
let passwords = [];
let gameRunning = false;

// Passwords data
const passwordList = [
    { text: "123456", strength: "weak" },
    { text: "password", strength: "weak" },
    { text: "admin", strength: "weak" },
    { text: "qwerty", strength: "weak" },
    { text: "Ninja$tr0ng99", strength: "strong" },
    { text: "P@ssw0rd!Secure", strength: "strong" },
    { text: "SafeC0deX@22", strength: "strong" },
];

class Password {
    constructor(text, strength) {
        this.text = text;
        this.strength = strength;
        this.x = Math.random() * (canvas.width - 100);
        this.y = -50;
        this.speed = Math.random() * 2 + 1;
    }

    draw() {
        ctx.fillStyle = this.strength === "weak" ? "red" : "green";
        ctx.font = "20px Arial";
        ctx.fillText(this.text, this.x, this.y);
    }

    update() {
        this.y += this.speed;
    }
}

// Start game
document.getElementById("startGame").addEventListener("click", () => {
    score = 0;
    passwords = [];
    gameRunning = true;
    animate();
});

// Handle clicking passwords
canvas.addEventListener("click", (e) => {
    const clickX = e.clientX - canvas.getBoundingClientRect().left;
    const clickY = e.clientY - canvas.getBoundingClientRect().top;

    passwords = passwords.filter(password => {
        const isClicked = clickX >= password.x && clickX <= password.x + 100 &&
                          clickY >= password.y - 20 && clickY <= password.y + 20;

        if (isClicked) {
            if (password.strength === "weak") {
                score += 10; // Click weak passwords ✅
            } else {
                score -= 15; // Wrongly clicking strong passwords ❌
            }
            return false; // Remove password after click
        }
        return true;
    });

    document.getElementById("score").textContent = "Score: " + score;
});

// Game loop
function animate() {
    if (!gameRunning) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.02) { // Spawn passwords randomly
        const randomPass = passwordList[Math.floor(Math.random() * passwordList.length)];
        passwords.push(new Password(randomPass.text, randomPass.strength));
    }

    passwords.forEach(password => {
        password.update();
        password.draw();
    });

    passwords = passwords.filter(password => password.y < canvas.height);

    requestAnimationFrame(animate);
}
