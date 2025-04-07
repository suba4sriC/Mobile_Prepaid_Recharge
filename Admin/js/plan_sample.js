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
    const token = localStorage.getItem("token"); 
    if (!token) {
        showToast("User not authenticated. Please log in.", false);
        return;
    }

    try {
        const response = await fetch("http://localhost:8083/auth/api/prepaidplan", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch plans.");
        }

        const plans = await response.json();
        console.log("📜 Plans Data:", plans);

        // Clear old data
        const planList = document.getElementById("plansList");
        planList.innerHTML = "";

        // Populate table rows
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

        // Initialize DataTable (Destroy if already initialized)
        if ($.fn.DataTable.isDataTable("#plansTable")) {
            $('#plansTable').DataTable().destroy();
        }
        
        $('#plansTable').DataTable({
            responsive: true,
            autoWidth: false,
            pageLength: 5,
            lengthMenu: [[5, 10, 20, -1], [5, 10, 20, "All"]],
        });

    } catch (error) {
        console.error("❌ Error fetching plans:", error);
        showToast("Failed to load plans. Please log in again.", false);
    }
}


async function fetchCategory() {
    try {
        const jwtToken = localStorage.getItem("token");
        if (!jwtToken) {
            throw new Error("JWT Token missing.");
        }

        const response = await fetch('http://localhost:8083/auth/api/prepaidplan/category', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken.trim()}`,  // Add Authorization header
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch categories. Status: ${response.status}`);
        }

        const category = await response.json();

        const categoryDropdowns = document.querySelectorAll('[name="category"]');

        categoryDropdowns.forEach(dropdown => {
            dropdown.innerHTML = `<option value="" selected disabled>Choose category...</option>`;

            category.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.categoryId;
                option.textContent = cat.categoryName;
                dropdown.appendChild(option);
            });
        });

    } catch (error) {
        console.error("Error fetching categories:", error);
        showToast('Failed to load categories.', false);
    }
}


async function deletePlan(planId) {
    const token = localStorage.getItem("token");
    if (!confirm("Are you sure you want to delete this plan?")) return;

    try {
        const response = await fetch(`http://localhost:8083/auth/api/prepaidplan/${planId}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        console.log("Delete response status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to delete plan: ${errorText}`);
        }
        showToast("Plan deleted successfully!", true);
        fetchPlans();

    } catch (error) {
        console.error("Error deleting plan:", error);
        showToast(error.message, false);
    }
}



document.getElementById('addPlanForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
        showToast("User not authenticated. Please log in.", false);
        return;
    }
    
    const form = e.target;
    const formData = new FormData(form);
    const categoryId = formData.get('category');
    console.log("Category ID:", categoryId);
    
    const planData = {
        planName: formData.get('planName'),
        planData: formData.get('data'),
        planSms: formData.get('sms'),
        planTalktime: formData.get('talktime'),
        planPrice: parseFloat(formData.get('price')),
        planValidity: parseInt(formData.get('duration'))
    };

    try {
        const response = await fetch(`http://localhost:8083/auth/api/prepaidplan?categoryId=${categoryId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(planData)
        });
        if (!response.ok) throw new Error("Failed to add plan.");
        showToast("Plan added successfully!", true);
        form.reset();
        hideContainers();
        fetchPlans();
    } catch (error) {
        console.error("Error adding plan:", error);
        showToast(error.message, false);
    }
});


document.getElementById('addCategoryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
        showToast("User not authenticated. Please log in.", false);
        return;
    }
    
    const form = e.target;
    const formData = new FormData(form);
    const categoryData = {
        categoryName: formData.get('categoryName')
    };

    try {
        const response = await fetch("http://localhost:8083/auth/api/prepaidplan/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(categoryData)
        });
        if (!response.ok) throw new Error("Failed to add category.");
        showToast("Category added successfully!", true);
        form.reset();
        hideContainers();
        fetchCategory();
    } catch (error) {
        console.error("Error adding category:", error);
        showToast(error.message, false);
    }
});





function showContainer(containerId) {
    document.getElementById('addContainer').classList.remove('active');
    document.getElementById('addCategoryContainer').classList.remove('active');

    document.getElementById(containerId).classList.add('active');
}

function hideContainers() {
    document.getElementById('addContainer').classList.remove('active');
    document.getElementById('addCategoryContainer').classList.remove('active');
}

document.getElementById('sidebarToggle').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('show');
});


window.onload = () => {
    fetchPlans();
    fetchCategory();
};
