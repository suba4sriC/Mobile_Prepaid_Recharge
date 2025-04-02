function showToast(message, isSuccess) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.backgroundColor = isSuccess ? 'green' : 'red';
    toast.style.color = 'white';
    toast.style.fontSize = '16px';
    toast.style.zIndex = '1000';

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000); // Hide after 3 seconds
}



document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    // localStorage.removeItem("jwtToken")
    const form = event.target;

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const userName = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('http://localhost:8083/auth/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                userPassword: password
            })
        });

        const data = await response.json(); // Parse response
        console.log(data);
        if (response.ok) {
            localStorage.setItem("token", data.token); // ✅ Store token
            showToast('✅ Login successful!', true);
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500); // Delay 1.5 seconds to ensure toast is shown

        } else {
            showToast('❌ Invalid credentials. Please try again.', false);
        }
    } catch (error) {
        console.error('Login Error:', error);
        showToast('❌ Error connecting to the server. Try again later.', false);
    }
});
