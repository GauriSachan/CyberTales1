document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star");
    const ratingInput = document.getElementById("rating");
    const feedbackForm = document.getElementById("feedbackForm");
    const successMessage = document.getElementById("successMessage");

    // Star rating selection
    stars.forEach(star => {
        star.addEventListener("click", function () {
            let value = this.getAttribute("data-value");
            ratingInput.value = value;
            stars.forEach(s => s.classList.remove("selected"));
            this.classList.add("selected");
        });
    });

    // Form Submission
    feedbackForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (ratingInput.value === "") {
            alert("Please select a rating before submitting.");
            return;
        }
        successMessage.classList.remove("hidden");
        feedbackForm.reset();
    });
});
