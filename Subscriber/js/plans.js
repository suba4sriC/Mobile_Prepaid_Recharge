async function fetchPlans() {
    try {
        const jwtToken = localStorage.getItem("jwtToken"); 
        if (!jwtToken) {
            console.error(" No Bearer token found in localStorage");
            return;
        }

        const response = await fetch('http://localhost:8083/auth/api/prepaidplan', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`, 
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const navTabs = document.getElementById('nav-tabs');
        const tabContent = document.getElementById('tab-content');

        navTabs.innerHTML = '';
        tabContent.innerHTML = '';

        const categoryMap = {};

        data.forEach(planData => {
            const categoryName = planData.category.categoryName;

            if (!categoryMap[categoryName]) {
                categoryMap[categoryName] = [];
            }

            categoryMap[categoryName].push(planData);
        });
        console.log(categoryMap);

        Object.keys(categoryMap).forEach((category, index) => {
            const tabItem = document.createElement('li');
            tabItem.classList.add('nav-item', 'fs-4');

            const tabLink = document.createElement('a');
            tabLink.classList.add('nav-link');
            if (index === 0) tabLink.classList.add('active');
            let category1 = category.replace(/ /g, "_");
            tabLink.id = `${category1}-tab`;
            tabLink.href = `#${category1}`;
            tabLink.setAttribute('data-bs-toggle', 'tab');
            tabLink.textContent = category;

            tabItem.appendChild(tabLink);
            navTabs.appendChild(tabItem);

            const contentDiv = document.createElement('div');
            contentDiv.classList.add('tab-pane', 'fade');
            if (index === 0) contentDiv.classList.add('show', 'active');
            contentDiv.id = category1;

            const plansList = document.createElement('div');
            plansList.classList.add('plans-list', 'row', 'gy-3');

            categoryMap[category].forEach(plan => {
                const planElement = document.createElement('div');
                planElement.classList.add('plan-card', 'border', 'p-2', 'rounded');

                let planDetails = `
                    <h3>${plan.planName || 'N/A'}</h3>
                    <p class="fs-3"><strong> ₹${plan.planPrice || 'N/A'}</strong></p>
                `;

                if (category.toLowerCase() === 'add on') {
                    planDetails += `
                        <p><strong> Validity: </strong>${plan.planValidity || 'N/A'}</p>
                        <p><strong> Data: </strong>${plan.planData || 'N/A'}</p>
                    `;
                } else if (category.toLowerCase() === 'top up') {
                    planDetails += `
                        <p><strong> Talktime: </strong>${plan.planTalktime || 'N/A'}</p>
                        <p><strong> SMS: </strong>${plan.planSms || 'N/A'}</p>
                    `;
                } else {
                    planDetails += `
                        <p><strong> Validity: </strong>${plan.planValidity || 'N/A'}</p>
                        <p><strong> Data: </strong>${plan.planData || 'N/A'}</p>
                        <p><strong> Talktime: </strong>${plan.planTalktime || 'N/A'}</p>
                        <p><strong> SMS: </strong>${plan.planSms || 'N/A'}</p>
                    `;
                }

                planDetails += `
                    <button class="btn btn-recharge w-75 my-2" 
                            onclick="rechargeNow('${plan.planId}')">
                            Recharge Now
                    </button>
                `;

                planElement.innerHTML = planDetails;
                plansList.appendChild(planElement);
            });

            contentDiv.appendChild(plansList);
            tabContent.appendChild(contentDiv);
        });

    } catch (error) {
        console.error('Error fetching plans:', error);
    }
}

function rechargeNow(planId) {
    const queryParams = new URLSearchParams({
        planId: planId
    });

    window.location.href = `payment.html?${queryParams.toString()}`;
}

document.addEventListener('DOMContentLoaded', fetchPlans);
