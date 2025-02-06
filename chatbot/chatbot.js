function getChatResponse() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');
    
    const botResponse = "Always keep your personal information private!";
    const userMessage = `<div><strong>You:</strong> ${userInput}</div>`;
    const botMessage = `<div><strong>Bot:</strong> ${botResponse}</div>`;
    
    chatBox.innerHTML += userMessage + botMessage;
    chatBox.scrollTop = chatBox.scrollHeight;
    document.getElementById('user-input').value = '';
}
