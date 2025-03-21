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
                    <td>
                        <button class="btn btn-warning btn-sm me-2" onclick="editPlan(${plan.planId})">
                            <i class="bi bi-pencil"></i> Update
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deletePlan(${plan.planId})">
                            <i class="bi bi-trash"></i> Delete
                        </button>
                    </td>
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

async function fetchCategory() {
    try {
        const response = await fetch('http://localhost:8083/auth/api/prepaidplan/category');
        const category = await response.json();

        const categoryDropdowns = document.querySelectorAll('[name="category"]');

        categoryDropdowns.forEach(dropdown => {
            dropdown.innerHTML = `<option value="" selected disabled>Choose category...</option>`;

            category.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.categoryName;
                option.textContent = cat.categoryName;
                dropdown.appendChild(option);
            });
        });

    } catch (error) {
        showToast('Failed to load categories.', false);
    }
}

async function addPlan() {
    const planName = document.querySelector('[name="planName"]').value.trim();
    const category = document.querySelector('[name="category"]').value;
    const data = document.querySelector('[name="data"]').value.trim();
    const sms = document.querySelector('[name="sms"]').value.trim();
    const talktime = document.querySelector('[name="talktime"]').value.trim();
    const price = parseFloat(document.querySelector('[name="price"]').value);
    const duration = parseInt(document.querySelector('[name="duration"]').value);

    if (!planName || !category || !data || !sms || !talktime || isNaN(price) || isNaN(duration)) {
        showToast('Please fill all required fields correctly.', false);
        return;
    }

    const planData = {
        planName,
        category,
        planData:data,
        planSms:sms,
        planTalktime:talktime,
        planPrice: price,
        planValidity: duration
    };

    try {
        const response = await fetch('http://localhost:8083/auth/api/prepaidplan?categoryId=${categoryId}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(planData)
        });

        if (response.ok) {
            showToast('Plan added successfully!');
            fetchPlans(); 
            document.getElementById('addPlanForm').reset(); // Clear form
            hideContainers();
        } else {
            showToast('Failed to add plan. Please try again.', false);
        }

    } catch (error) {
        showToast('Error connecting to server.', false);
    }
}

function showContainer(containerId) {
    document.getElementById('addContainer').classList.remove('active');
    document.getElementById('addCategoryContainer').classList.remove('active');

    document.getElementById(containerId).classList.add('active');
}

function hideContainers() {
    document.getElementById('addContainer').classList.remove('active');
    document.getElementById('addCategoryContainer').classList.remove('active');
}




// On page load
window.onload = () => {
    fetchPlans();
    fetchCategory();
};
