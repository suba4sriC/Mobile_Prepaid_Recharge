// Sample data for plans
const plansData = [
    {
        id: 1,
        category: "Basic",
        planName: "Basic Monthly",
        data: "2GB",
        sms: "100",
        talktime: "120 minutes",
        price: 299,
        duration: 1
    },
    {
        id: 2,
        category: "Standard",
        planName: "Standard Quarterly",
        data: "5GB",
        sms: "300",
        talktime: "500 minutes",
        price: 799,
        duration: 3
    },
    {
        id: 3,
        category: "Premium",
        planName: "Premium Annual",
        data: "20GB",
        sms: "Unlimited",
        talktime: "Unlimited",
        price: 2999,
        duration: 12
    },
    {
        id: 4,
        category: "Enterprise",
        planName: "Enterprise Business",
        data: "50GB",
        sms: "Unlimited",
        talktime: "Unlimited",
        price: 5999,
        duration: 12
    }
];


// Initialize variables
let plans = [];
let currentPlanId = 5; // Start from 5 since we have 4 sample plans

// DOM Elements
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.main-content');
const plansList = document.getElementById('plansList');
const planToUpdateSelect = document.getElementById('planToUpdate');
const planToDeleteSelect = document.getElementById('planToDelete');
const addPlanForm = document.getElementById('addPlanForm');
const updatePlanForm = document.getElementById('updatePlanForm');
const deletePlanForm = document.getElementById('deletePlanForm');
const planToast = document.getElementById('planToast');
const toastMessage = document.getElementById('toastMessage');
const toastTitle = document.getElementById('toastTitle');
const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
const confirmationMessage = document.getElementById('confirmationMessage');
const confirmButton = document.getElementById('confirmButton');

// Load plans from localStorage or use sample data
function loadPlans() {
    const storedPlans = localStorage.getItem('plans');
    if (storedPlans) {
        plans = JSON.parse(storedPlans);
        currentPlanId = Math.max(...plans.map(plan => plan.id)) + 1;
    } else {
        plans = [...plansData];
    }
    renderPlans();
    populateSelectOptions();
}

// Save plans to localStorage
function savePlans() {
    localStorage.setItem('plans', JSON.stringify(plans));
}

// Render plans in the list
function renderPlans() {
    plansList.innerHTML = '';
    
    plans.forEach(plan => {
        const planCard = document.createElement('div');
        planCard.className = 'col-md-6 col-lg-4';
        planCard.innerHTML = `
            <div class="card plan-card">
                <div class="card-header">
                    ${plan.category} - ${plan.planName}
                </div>
                <div class="card-body">
                    <h5 class="card-title">₹${plan.price} for ${plan.duration} month${plan.duration > 1 ? 's' : ''}</h5>
                    <ul class="list-group list-group-flush mb-3">
                        <li class="list-group-item"><i class="bi bi-wifi"></i> Data: ${plan.data}</li>
                        <li class="list-group-item"><i class="bi bi-chat"></i> SMS: ${plan.sms}</li>
                        <li class="list-group-item"><i class="bi bi-telephone"></i> Talktime: ${plan.talktime}</li>
                    </ul>
                </div>
            </div>
        `;
        plansList.appendChild(planCard);
    });
}

// Populate select options for update and delete forms
function populateSelectOptions() {
    planToUpdateSelect.innerHTML = '<option value="" selected disabled>Choose plan to update...</option>';
    planToDeleteSelect.innerHTML = '<option value="" selected disabled>Choose plan to delete...</option>';
    
    plans.forEach(plan => {
        const updateOption = document.createElement('option');
        updateOption.value = plan.id;
        updateOption.textContent = `${plan.category} - ${plan.planName} (₹${plan.price})`;
        planToUpdateSelect.appendChild(updateOption);
        
        const deleteOption = document.createElement('option');
        deleteOption.value = plan.id;
        deleteOption.textContent = `${plan.category} - ${plan.planName} (₹${plan.price})`;
        planToDeleteSelect.appendChild(deleteOption);
    });
}

// Show container based on action
function showContainer(type) {
    hideContainers();
    document.getElementById(type + 'Container').classList.add('active');
}

// Hide all containers
function hideContainers() {
    document.querySelectorAll('.plan-container').forEach(container => {
        container.classList.remove('active');
    });
}

// Show toast notification
function showToast(title, message) {
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    const toast = new bootstrap.Toast(planToast);
    toast.show();
}

// Add plan form submission
addPlanForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(addPlanForm);
    const newPlan = {
        id: currentPlanId++,
        category: formData.get('category'),
        planName: formData.get('planName'),
        data: formData.get('data'),
        sms: formData.get('sms'),
        talktime: formData.get('talktime'),
        price: parseFloat(formData.get('price')),
        duration: parseInt(formData.get('duration'))
    };
    
    plans.push(newPlan);
    savePlans();
    renderPlans();
    populateSelectOptions();
    
    addPlanForm.reset();
    hideContainers();
    
    showToast('Plan Added', `${newPlan.planName} has been added successfully!`);
});

// Prepare update plan form
function prepareUpdatePlan(planId) {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;
    
    showContainer('update');
    
    planToUpdateSelect.value = plan.id;
    updatePlanForm.elements.category.value = plan.category;
    updatePlanForm.elements.planName.value = plan.planName;
    updatePlanForm.elements.data.value = plan.data;
    updatePlanForm.elements.sms.value = plan.sms;
    updatePlanForm.elements.talktime.value = plan.talktime;
    updatePlanForm.elements.price.value = plan.price;
    updatePlanForm.elements.duration.value = plan.duration;
}

// Update plan form submission
updatePlanForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(updatePlanForm);
    const planId = parseInt(formData.get('planId'));
    const plan = plans.find(p => p.id === planId);
    
    if (!plan) return;
    
    // Show confirmation modal
    confirmationMessage.textContent = `Are you sure you want to update the plan "${plan.planName}"?`;
    confirmButton.onclick = function() {
        plan.category = formData.get('category');
        plan.planName = formData.get('planName');
        plan.data = formData.get('data');
        plan.sms = formData.get('sms');
        plan.talktime = formData.get('talktime');
        plan.price = parseFloat(formData.get('price'));
        plan.duration = parseInt(formData.get('duration'));
        
        savePlans();
        renderPlans();
        populateSelectOptions();
        
        updatePlanForm.reset();
        hideContainers();
        
        showToast('Plan Updated', `${plan.planName} has been updated successfully!`);
        confirmationModal.hide();
    };
    
    confirmationModal.show();
});

// Plan to update select change event
planToUpdateSelect.addEventListener('change', function() {
    const planId = parseInt(this.value);
    const plan = plans.find(p => p.id === planId);
    
    if (plan) {
        updatePlanForm.elements.category.value = plan.category;
        updatePlanForm.elements.planName.value = plan.planName;
        updatePlanForm.elements.data.value = plan.data;
        updatePlanForm.elements.sms.value = plan.sms;
        updatePlanForm.elements.talktime.value = plan.talktime;
        updatePlanForm.elements.price.value = plan.price;
        updatePlanForm.elements.duration.value = plan.duration;
    }
});

// Prepare delete plan
function prepareDeletePlan(planId) {
    showContainer('delete');
    planToDeleteSelect.value = planId;
}

// Delete plan form submission
deletePlanForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const planId = parseInt(deletePlanForm.elements.planId.value);
    const plan = plans.find(p => p.id === planId);
    
    if (!plan) return;
    
    // Show confirmation modal
    confirmationMessage.textContent = `Are you sure you want to delete the plan "${plan.planName}"?`;
    confirmButton.onclick = function() {
        plans = plans.filter(p => p.id !== planId);
        
        savePlans();
        renderPlans();
        populateSelectOptions();
        
        deletePlanForm.reset();
        hideContainers();
        
        showToast('Plan Deleted', `${plan.planName} has been deleted successfully!`);
        confirmationModal.hide();
    };
    
    confirmationModal.show();
});

// Toggle sidebar on mobile
document.querySelector('.navbar-toggler').addEventListener('click', function() {
    sidebar.classList.toggle('show');
    mainContent.classList.toggle('sidebar-open');
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPlans();
    showContainer('add');
});