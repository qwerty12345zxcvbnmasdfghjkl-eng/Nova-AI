const chatContainer = document.getElementById('chat-container');
const inputField = document.getElementById('user-input');

window.onload = function() {
  const savedChats = JSON.parse(localStorage.getItem('novaChats')) || [];
  if (savedChats.length > 0) {
    chatContainer.innerHTML = ''; 
    savedChats.forEach(chat => {
      addMessage(chat.text, chat.sender, false); 
    });
  }
};

async function sendMessage() {
  const messageText = inputField.value.trim();
  if (messageText === "") return;

  addMessage(messageText, 'user', true);
  inputField.value = '';

  // Loading animation
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'message ai-message';
  loadingDiv.id = 'loading-indicator';
  loadingDiv.innerHTML = '<div class="avatar ai-avatar">N</div><div class="message-content">Soch raha hoon...</div>';
  chatContainer.appendChild(loadingDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  try {
    // Yahan aap apna Netlify link dalenge
    const response = await fetch('YOUR-NETLIFY-LINK/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: messageText })
    });
    
    const data = await response.json();
    
    document.getElementById('loading-indicator').remove();
    addMessage(data.reply, 'ai', true);

  } catch (error) {
    document.getElementById('loading-indicator').remove();
    addMessage("Maaf kijiyega, backend se connect nahi ho saka.", 'ai', true);
  }
}

function addMessage(text, sender, saveToStorage = true) {
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

  if (saveToStorage) {
    const currentChats = JSON.parse(localStorage.getItem('novaChats')) || [];
    currentChats.push({ text: text, sender: sender });
    localStorage.setItem('novaChats', JSON.stringify(currentChats));
  }
}

inputField.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

function clearChat() {
  localStorage.removeItem('novaChats');
  chatContainer.innerHTML = `
    <div class="message ai-message">
      <div class="avatar ai-avatar">N</div>
      <div class="message-content">Hello! Main Nova AI hoon. Aaj main aapki kya madad kar sakta hoon?</div>
    </div>
  `;
}
