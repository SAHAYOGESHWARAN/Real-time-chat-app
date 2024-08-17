const socket = io();
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const fileInput = document.getElementById('fileInput');

// Handle incoming chat messages
socket.on('chatMessage', msg => {
    const p = document.createElement('p');
    p.innerHTML = `<strong>${msg.user}:</strong> ${msg.message}`;
    messages.appendChild(p);
});

// Send a chat message
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chatMessage', { user: 'User', message });
        messageInput.value = '';
    }
}

// Handle file uploads
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
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
            if (data.success) {
                socket.emit('chatMessage', { user: 'User', message: `<a href="${data.filePath}" target="_blank">Media</a>` });
            } else {
                console.error('File upload failed:', data.message);
            }
        }).catch(error => {
            console.error('Error uploading file:', error);
        });
    }
});

// Start a video call
function startVideoCall() {
    fetch('/api/videoCall/start', {
        method: 'POST',
        headers: {
            'x-auth-token': localStorage.getItem('token'),
        },
    }).then(response => response.json())
      .then(data => {
        if (data.success) {
            alert(data.message);
            // Implement further logic to handle video call UI
        } else {
            console.error('Failed to start video call:', data.message);
        }
    }).catch(error => {
        console.error('Error starting video call:', error);
    });
}
