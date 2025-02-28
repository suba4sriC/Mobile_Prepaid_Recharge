document.addEventListener('DOMContentLoaded', function() {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
        try {
        const userData = JSON.parse(userDataString);
        if (userData.mobile) {
            document.getElementById("phone").value = userData.mobile;
        }
        } catch (error) {
        console.error("Error parsing userData:", error);
        }
    } else {
        console.warn("No userData found in localStorage");
    }

});


function redirectToPayment() {
    let planSelection = document.getElementById("plan").value;
    let errorDiv = document.querySelector(".error-plan");

    if (planSelection === "") {
    errorDiv.textContent = "Please select a plan.";
    errorDiv.style.color = "red";
    return;
    } 
    errorDiv.textContent = "";
    
    const price = planSelection === "Popular Plan" ? "₹299" : "₹499";
    const duration = "1 Month";
    const queryParams = new URLSearchParams({
    plan: planSelection,
    price: price,
    duration: duration
    });
    window.location.href = "payment.html?" + queryParams.toString();
}

document.getElementById("plan").addEventListener("change", function() {
    document.querySelector(".error-plan").textContent = "";
});

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('faqSearch');
    const accordionBodies = document.querySelectorAll('.accordion-body');
    const accordionButtons = document.querySelectorAll('.accordion-button');
    const noResults = document.querySelector('.no-results');
    const searchIcon = document.querySelector('.search-icon');

    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        let hasResults = false;
        accordionBodies.forEach(body => {
            body.innerHTML = body.innerHTML.replace(/<mark[^>]*>(.*?)<\/mark>/gi, '$1');
        });
        accordionButtons.forEach(button => {
            button.innerHTML = button.innerHTML.replace(/<mark[^>]*>(.*?)<\/mark>/gi, '$1');
        });

        if (searchTerm) {
            accordionButtons.forEach(button => {
                const buttonText = button.textContent.toLowerCase();
                const body = button.closest('.accordion-item').querySelector('.accordion-body');
                const bodyText = body.textContent.toLowerCase();
                const accordionCollapse = button.closest('.accordion-item').querySelector('.accordion-collapse');

                if (buttonText.includes(searchTerm) || bodyText.includes(searchTerm)) {
                    hasResults = true;
                    // Highlight matches in button text
                    button.innerHTML = button.textContent.replace(
                        new RegExp(`(${searchTerm})`, 'gi'),
                        '<mark>$1</mark>'
                    );
                    // Highlight matches in body text
                    body.innerHTML = body.textContent.replace(
                        new RegExp(`(${searchTerm})`, 'gi'),
                        '<mark>$1</mark>'
                    );
                    // Expand the section
                    accordionCollapse.classList.add('show');
                } else {
                    // Collapse non-matching sections
                    accordionCollapse.classList.remove('show');
                }
            });
        } else {
            document.querySelector('#collapseOne').classList.add('show');
            hasResults = true;
        }

        // Toggle no results message
        noResults.style.display = hasResults ? 'none' : 'block';
    }

    searchInput.addEventListener('input', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
});