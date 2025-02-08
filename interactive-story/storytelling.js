const storyData = [
    {
        question: "You receive a message from a stranger offering a free game download. What do you do?",
        options: [
            { text: "🚫 Ignore", outcome: "✅ Great choice! Ignoring suspicious messages keeps you safe.", correct: true },
            { text: "📢 Report to an Adult", outcome: "👏 Well done! Reporting it ensures safety!", correct: true },
            { text: "⬇️ Download", outcome: "⚠️ Oops! This could be dangerous. Always check with an adult first.", correct: false }
        ]
    },
    {
        question: "A friend asks for your password to borrow your account. What do you do?",
        options: [
            { text: "🔑 Share the password", outcome: "⚠️ Oops! Never share your password with anyone!", correct: false },
            { text: "🔒 Keep it private", outcome: "✅ Correct! Your password is personal and should stay secret.", correct: true },
            { text: "🤔 Change it and then share", outcome: "⚠️ Still risky! Keep passwords confidential.", correct: false }
        ]
    },
    {
        question: "You see a pop-up saying you won a free phone. What do you do?",
        options: [
            { text: "🎉 Click to claim it", outcome: "⚠️ Be careful! These are usually scams.", correct: false },
            { text: "🔍 Check the website for credibility", outcome: "⚠️ Still risky! Many scam sites look real.", correct: false },
            { text: "🚨 Close the pop-up immediately", outcome: "✅ Correct! Ignore and close such pop-ups immediately.", correct: true }
        ]
    }
];

let currentStoryIndex = 0;

function loadStory() {
    const storyContainer = document.getElementById('storyContainer');
    storyContainer.innerHTML = ''; // Clear previous content

    const story = storyData[currentStoryIndex];
    const questionElement = document.createElement('p');
    questionElement.innerText = story.question;
    storyContainer.appendChild(questionElement);

    story.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option.text;
        button.classList.add('choice-button');
        button.onclick = () => chooseOption(index, option, button);
        storyContainer.appendChild(button);
    });

    document.getElementById('storyOutcome').innerHTML = '';
}

function chooseOption(index, option, button) {
    const outcomeContainer = document.getElementById('storyOutcome');
    const story = storyData[currentStoryIndex];
    const selectedOption = story.options[index];

    let feedbackText = selectedOption.outcome;

    if (selectedOption.correct) {
        feedbackText = `<span class="correct">${feedbackText}</span>`;
    } else {
        feedbackText = `<span class="wrong">${feedbackText}</span>`;
    }

    button.innerHTML = `${option.text} ${feedbackText}`;

    setTimeout(() => {
        if (currentStoryIndex < storyData.length - 1) {
            currentStoryIndex++;
            loadStory();
        } else {
            document.getElementById("storyContainer").innerHTML = '<p>🎉 You have completed the interactive story! Stay safe online! 🎉</p>';
        }
    }, 1500);
}

document.addEventListener("DOMContentLoaded", () => {
    loadStory();
});

function continueStory(choice) {
    let storyText = '';
    if (choice === 'ignore') {
        storyText = "You decide to ignore the message and report it. You feel safe and confident!";
    } else if (choice === 'respond') {
        storyText = "You respond back, but the situation escalates. It's better to ignore and report!";
    }
    document.getElementById('story-text').innerText = storyText;
}
