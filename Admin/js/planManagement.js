document.addEventListener('DOMContentLoaded', function() {
    showContainer('add');
});

function showContainer(type) {
    // Hide all containers first
    hideContainers();
    
    // Show the selected container
    document.getElementById(type + 'Container').classList.add('active');
}

function hideContainers() {
    document.querySelectorAll('.plan-container').forEach(container => {
        container.classList.remove('active');
    });
}