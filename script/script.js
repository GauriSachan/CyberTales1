function buttonClick(page) {
    let clickSound = new Audio('sounds/click.mp3'); // Add a click sound effect
    clickSound.play();
    
    document.body.classList.add("flash-effect");
    setTimeout(() => {
        document.body.classList.remove("flash-effect");
        window.location.href = page;
    }, 300);
}
