let score = 0;
const emails = [
    {
        content: "Hello, Your bank account has been compromised! Click this link to reset your password: [link]",
        isPhishing: true,
        explanation: "This email is phishing because it asks you to click on a link to reset your password. Always visit websites directly by typing the URL."
    },
    {
        content: "Hey, Your recent purchase was confirmed! Thank you for shopping with us.",
        isPhishing: false,
        explanation: "This is a safe email confirming your recent purchase."
    },
    {
        content: "Urgent! Your PayPal account has been suspended. Click here to verify your identity: [link]",
        isPhishing: true,
        explanation: "This email is phishing. Always verify directly through the official PayPal website."
    },
    {
        content: "Your order has been shipped and will arrive soon. Track it here: [link]",
        isPhishing: false,
        explanation: "This email is safe as it confirms an order and provides tracking information."
    }
];

let currentEmailIndex = 0;

function displayEmail() {
    const email = emails[currentEmailIndex];
    document.getElementById('email-content').innerText = email.content;
    document.getElementById('result').innerText = "";
}

function checkAnswer(isPhishingSelected) {
    const currentEmail = emails[currentEmailIndex];
    if (isPhishingSelected === currentEmail.isPhishing) {
        score++;
        document.getElementById('result').innerText = "Correct! " + currentEmail.explanation;
    } else {
        document.getElementById('result').innerText = "Incorrect. " + currentEmail.explanation;
    }
    document.getElementById('score').innerText = "Score: " + score;

    currentEmailIndex++;
    if (currentEmailIndex < emails.length) {
        setTimeout(displayEmail, 2000);
    } else {
        document.getElementById('result').innerText += "\nGame Over! Final Score: " + score;
        document.getElementById('phishing').disabled = true;
        document.getElementById('safe').disabled = true;
    }
}

displayEmail();
