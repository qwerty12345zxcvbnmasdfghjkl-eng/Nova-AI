const chatContainer = document.getElementById('chat-container');
const inputField = document.getElementById('user-input');

function sendMessage() {
  const messageText = inputField.value.trim();
  if (messageText === "") return;

  addMessage(messageText, 'user');
  inputField.value = '';

  // Simulate AI thinking
  setTimeout(() => {
    addMessage("Yeh frontend demo hai. Ab hum CSS aur JS alag kar chuke hain. Jab backend connect hoga, tab main asal AI ban jaunga!", 'ai');
  }, 1000);
}

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}-message`;

  const avatarDiv = document.createElement('div');
  avatarDiv.className = `avatar ${sender}-avatar`;
  avatarDiv.innerText = sender === 'ai' ? 'N' : 'U';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.innerText = text;

  msgDiv.appendChild(avatarDiv);
  msgDiv.appendChild(contentDiv);
  
  chatContainer.appendChild(msgDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

inputField.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});
