function continueStory(choice) {
    let storyText = '';
    if (choice === 'ignore') {
        storyText = "You decide to ignore the message and report it. You feel safe and confident!";
    } else if (choice === 'respond') {
        storyText = "You respond back, but the situation escalates. It's better to ignore and report!";
    }
    document.getElementById('story-text').innerText = storyText;
}
