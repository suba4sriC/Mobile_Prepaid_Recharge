document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        showToast('⚠️ Please enter both email and password.', 'warning');
        return;
    }

    try {
        const response = await fetch('http://localhost:8083/auth/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username: email, 
                password: password 
            })
        });

        const contentType = response.headers.get("content-type");

        const data = contentType && contentType.includes("application/json")
            ? await response.json()
            : await response.text();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            showToast('✅ Admin login successful!', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';  
            }, 2000);  
        } else {
            showToast(data.message || data || '❌ Login failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('❌ An error occurred. Please try again.', 'error');
    }
});

// Toast Message Function
function showToast(message, type) {
    const toastContainer = document.getElementById('toastContainer');

    const toastClass = {
        success: 'bg-success text-white',
        error: 'bg-danger text-white',
        warning: 'bg-warning text-dark'
    };

    const toastHTML = `
        <div class="toast align-items-center ${toastClass[type]}" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;

    toastContainer.innerHTML = toastHTML;

    const toastElement = new bootstrap.Toast(toastContainer.querySelector('.toast'));
    toastElement.show();
}
