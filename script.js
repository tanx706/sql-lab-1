document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const outputBox = document.getElementById('output');

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        outputBox.classList.remove('hidden');
        
        if (data.success) {
            outputBox.className = 'output-box success';
            outputBox.innerHTML = `<strong>ACCESS GRANTED:</strong> Welcome, ${data.user}.<br><small>Query executed: ${data.query}</small>`;
        } else {
            outputBox.className = 'output-box error';
            outputBox.innerHTML = `<strong>ACCESS DENIED:</strong> ${data.message}<br><small>Query executed: ${data.query}</small>`;
        }
    } catch (err) {
        outputBox.classList.remove('hidden');
        outputBox.className = 'output-box error';
        outputBox.innerText = 'Connection error to backend server.';
    }
});