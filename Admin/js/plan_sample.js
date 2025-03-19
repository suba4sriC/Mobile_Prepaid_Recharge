// Utility function to show toast notifications
function showToast(message, isSuccess = true) {
    const toast = new bootstrap.Toast(document.getElementById('planToast'));
    document.getElementById('toastMessage').textContent = message;
    document.getElementById('toastTitle').textContent = isSuccess ? 'Success' : 'Error';
    document.getElementById('planToast').classList.toggle('bg-success', isSuccess);
    document.getElementById('planToast').classList.toggle('bg-danger', !isSuccess);
    toast.show();
}

async function fetchPlans() {
    try {
        const response = await fetch('http://localhost:8083/auth/api/prepaidplan');
        const plans = await response.json();

        const planList = document.getElementById('plansList');
        planList.innerHTML = ''; // Clear existing data

        plans.forEach(plan => {
            const planRow = `
                <tr>
                    <td>${plan.planName}</td>
                    <td>₹${plan.planPrice}</td>
                    <td>${plan.planData}</td>
                    <td>${plan.planSms}</td>
                    <td>${plan.planTalktime}</td>
                    <td>${plan.planValidity}</td>
                </tr>`;
            planList.innerHTML += planRow;
        });

        $('#plansTable').DataTable({
            destroy: true,
            responsive: true,
            autoWidth: false,
            lengthMenu: [5, 10, 20],
        });

    } catch (error) {
        showToast('Failed to load plans.', false);
    }
}
async function fetchCategory(){
    try{
        const response = await fetch('http://localhost:8083/auth/api/prepaidplan/category');
        const category = await response.json();
        console.log(category);
        const categoryDropdown = document.querySelector('[name="category"]');
        categoryDropdown.innerHTML = `<option value="" selected disabled>Choose category...</option>`;

        category.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.categoryName;
            option.textContent = cat.categoryName;
            categoryDropdown.appendChild(option);
        });

    }catch (error) {
        showToast('Failed to load categories.', false);
    }
}


function showContainer(containerId) {
    document.querySelectorAll('.plan-container').forEach(container => {
        container.classList.remove('active');
    });

    document.getElementById(`${containerId}Container`).classList.add('active');
}

function hideContainers() {
    document.querySelectorAll('.plan-container').forEach(container => {
        container.classList.remove('active');
    });
}

// On page load
window.onload = () => {
    fetchPlans();
    fetchCategory();
};
