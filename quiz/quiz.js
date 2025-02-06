function checkAnswer(correct) {
    let feedback = document.getElementById('quiz-feedback');
    if (correct) {
        feedback.innerText = "Correct! Always keep your password private.";
        feedback.style.color = "green";
    } else {
        feedback.innerText = "Incorrect! Never share your password.";
        feedback.style.color = "red";
    }
}
