let sender = '';
let recipient = '';

function enterChat() {
  sender = document.getElementById('sender').value.trim();
  recipient = document.getElementById('recipient').value.trim();

  if (sender === '' || recipient === '') {
    alert('Both usernames are required!');
    return;
  }

  document.getElementById('user-setup').classList.add('hidden');
  document.getElementById('chat-box').classList.remove('hidden');
  loadMessages();
}

function sendMessage() {
  const message = document.getElementById('message').value.trim();

  if (message === '') return;

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'chat.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    if (xhr.status === 200) {
      document.getElementById('message').value = '';
      loadMessages();
    }
  };
  xhr.send(`action=send&sender=${sender}&recipient=${recipient}&message=${message}`);
}

function loadMessages() {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'chat.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    if (xhr.status === 200) {
      document.getElementById('messages').innerHTML = xhr.responseText;
      document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
    }
  };
  xhr.send(`action=load&recipient=${recipient}`);
}

setInterval(loadMessages, 2000);
