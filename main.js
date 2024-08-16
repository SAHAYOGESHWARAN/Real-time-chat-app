const socket = io();
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const fileInput = document.getElementById('fileInput');

socket.on('chatMessage', msg => {
    const p = document.createElement('p');
    p.innerHTML = `<strong>${msg.user}:</strong> ${msg.message}`;
    messages.appendChild(p);
});

function sendMessage() {
    const message = messageInput.value;
    socket.emit('chatMessage', { user: 'User', message });
    messageInput.value = '';
}

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('media', file);

    fetch('/api/media/uploadMedia', {
        method: 'POST',
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        },
        body: formData,
    }).then(response => response.json())
      .then(data => {
        socket.emit('chatMessage', { user: 'User', message: `<a href="${data.filePath}" target="_blank">Media</a>` });
    });
});

function startVideoCall() {
    fetch('/api/videoCall/start', {
        method: 'POST',
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        },
    }).then(response => response.json())
      .then(data => {
        alert(data.message);
        // Implement further logic to handle video call UI
    });
}
