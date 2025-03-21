document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity()) {
        window.location.href = 'dashboard.html';
    } else {
        form.classList.add('was-validated');
    }
});