
    document.addEventListener('DOMContentLoaded', function () {
        const urlParams = new URLSearchParams(window.location.search);
        const phoneNumber = decodeURIComponent(urlParams.get('phoneNumber') || '').trim();
        const jwtToken = localStorage.getItem("jwtToken");

        if (!phoneNumber) {
            console.warn("Phone number is missing in URL parameters.");
            return;
        }

        activePlan();
        transaction();
        document.getElementById("editProfileBtn").addEventListener("click", enableEditing);
        document.getElementById("saveProfileBtn").addEventListener("click", saveProfile);
    });

    async function fetchUserProfile(phoneNumber, jwtToken) {
        if (!phoneNumber || !jwtToken) {
            console.error("Missing phone number or JWT token.");
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8083/auth/user/profile?phoneNumber=${encodeURIComponent(phoneNumber)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken.trim()
                }
            });
    
            console.log("Fetch Response Status:", response.status);
    
            if (!response.ok) {
                throw new Error(`❌ Failed to fetch profile. HTTP Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(" User Profile Data:", data);
    
            if (!data) {
                throw new Error("Received empty profile data.");
            }
    
            // Ensure the elements exist before setting values
            document.getElementById('name').value = data.userName || '';
            document.getElementById('phone').value = data.phoneNumber || '';
            document.getElementById('email').value = data.userEmail || '';
            document.getElementById('address').value = data.userAddress || '';
    
        } catch (error) {
            console.error(" Error fetching profile:", error);
            alert("Failed to fetch profile. Please try again later.");
        }
    }
    

    async function activePlan() {
        let phoneNumber = localStorage.getItem("phoneNumber");
        const jwtToken = localStorage.getItem("jwtToken");
        let activePlanContainer = document.getElementById("activePlanContainer");
    
        if (!phoneNumber || !jwtToken) {
            console.error("Phone number or JWT Token missing.");
            activePlanContainer.innerHTML = `<p>Error: Missing authentication details.</p>`;
            return;
        }
    
        try {
            let userIdResponse = await fetch(`http://localhost:8083/auth/user/getUserIdByPhone/${phoneNumber}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jwtToken.trim(),
                    'Content-Type': 'application/json'
                }
            });
    
            if (!userIdResponse.ok) throw new Error("Failed to fetch user ID.");
            let userId = await userIdResponse.json();
            console.log("User ID:", userId);
    
            let activePlanResponse = await fetch(`http://localhost:8083/auth/user/transaction/active/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jwtToken.trim(),
                    'Content-Type': 'application/json'
                }
            });
    
            if (!activePlanResponse.ok) throw new Error("No active plan found.");
            let activePlan = await activePlanResponse.json();
            console.log("Active Plan:", activePlan);
    
            if (activePlan && activePlan.prepaidPlan) {
                let purchaseDateTime = new Date(activePlan.dateAndTime); // Full Date & Time
                console.log(purchaseDateTime);
                let purchaseDate = purchaseDateTime.toLocaleDateString(); // Extract Date Only
                console.log(purchaseDate);
                let expiryDate = new Date(purchaseDateTime);
                expiryDate.setDate(expiryDate.getDate() + parseInt(activePlan.prepaidPlan.planValidity, 10));

                console.log("Expiry Date:", expiryDate);

                activePlanContainer.innerHTML = `
                    <p><strong>Plan Name:</strong> ${activePlan.prepaidPlan.planName}</p>
                    <p><strong>Validity:</strong> ${activePlan.prepaidPlan.planValidity}</p>
                    <p><strong>Price:</strong> ₹${activePlan.prepaidPlan.planPrice}</p>
                    <p><strong>Data:</strong> ${activePlan.prepaidPlan.planData}</p>
                    <p><strong>Purchase Date:</strong> ${purchaseDate}</p>
                <p><strong>Expiry Date:</strong> ${expiryDate.toLocaleDateString()}</p>
                    <div class="button-container">
                        <a href="plans.html" class="btn w-50">Change Plan</a>
                    </div>
                `;
            } else {
                activePlanContainer.innerHTML = `<p>No active plan found.</p>`;
            }
    
        } catch (error) {
            console.error("Error fetching active plan:", error);
            activePlanContainer.innerHTML = `<p>Error loading active plan.</p>`;
        }
    }
    
    

    async function transaction() {
        let phoneNumber = localStorage.getItem("phoneNumber");
        const jwtToken = localStorage.getItem("jwtToken");
    
        if (!phoneNumber) {
            console.error("Phone number not found in localStorage.");
            return;
        }
        if (!jwtToken) {
            console.error("JWT Token missing.");
            return;
        }
    
        try {
            let userUrl = `http://localhost:8083/auth/user/getUserIdByPhone/${phoneNumber}`;
            console.log("Fetching userId from:", userUrl);
            let userResponse = await fetch(userUrl, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jwtToken.trim(),
                    'Content-Type': 'application/json'
                }
            });
            if (!userResponse.ok) {
                throw new Error("Failed to fetch user ID. Status: " + userResponse.status);
            }
            let userId = await userResponse.json();
            console.log("User ID:", userId);
    
            let transactionUrl = `http://localhost:8083/auth/user/transaction/${userId}`;
            console.log("Fetching transactions from:", transactionUrl);
            let transactionResponse = await fetch(transactionUrl, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + jwtToken.trim(),
                    'Content-Type': 'application/json'
                }
            });
            if (!transactionResponse.ok) {
                throw new Error("Failed to fetch transactions. Status: " + transactionResponse.status);
            }
            let transactionDetails = await transactionResponse.json();
            console.log("Transactions:", transactionDetails);
    
            let transactionHistoryTable = document.getElementById("transactionHistory");
            if (!transactionHistoryTable) {
                console.error("Transaction history table element not found.");
                return;
            }
            transactionHistoryTable.innerHTML = ""; 
    
            if (Array.isArray(transactionDetails) && transactionDetails.length > 0) {
                transactionDetails.forEach(transaction => {
                    let date = new Date(transaction.dateAndTime).toLocaleDateString();
                    let time = new Date(transaction.dateAndTime).toLocaleTimeString();
                    let row = document.createElement("tr");
                    row.innerHTML = `
                        <td class="ps-4">${date}</td>
                        <td>${transaction.prepaidPlan.planName}</td>
                        <td>₹${transaction.amount}</td>
                        <td>${time}</td>
                        <td><a href="#" class="btn btn-sm btn-primary">View</a></td>
                        <td>${transaction.paymentStatus}</td>
                    `;
                    transactionHistoryTable.appendChild(row);
                });
            } else {
                transactionHistoryTable.innerHTML = `<tr><td colspan="6" class="text-center">No transactions found.</td></tr>`;
            }
            
            if ($.fn.DataTable.isDataTable("#transactionsTable")) {
                $('#transactionsTable').DataTable().destroy();
            }
            $('#transactionsTable').DataTable({
                responsive: true,
                searching: true,
                paging: true,
                ordering: true,
                pageLength: 3,
                language: {
                    search: "Search:",
                    lengthMenu: "Show _MENU_ entries",
                    info: "Showing _START_ to _END_ of _TOTAL_ entries",
                    paginate: {
                        first: "First",
                        last: "Last",
                        next: "Next",
                        previous: "Previous"
                    }
                }
            });
    
        } catch (error) {
            console.error("Error fetching transactions:", error);
            if (document.getElementById("transactionHistory")) {
                document.getElementById("transactionHistory").innerHTML =
                    `<tr><td colspan="6" class="text-center">Failed to load transactions.</td></tr>`;
            }
        }
    }
    
    

    function enableEditing() {
        document.getElementById("name").removeAttribute("readonly");
        document.getElementById("email").removeAttribute("readonly");
        document.getElementById("address").removeAttribute("readonly");
        document.getElementById("saveProfileBtn").style.display = "block";
    }

    function saveProfile() {
        const updatedProfile = {
            userName: document.getElementById('name').value,
            userEmail: document.getElementById('email').value,
            userAddress: document.getElementById('address').value
        };

        fetch(`http://localhost:8083/auth/user/update-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwtToken").trim()
            },
            body: JSON.stringify(updatedProfile)
        })
        .then(response => response.json())
        .then(data => {
            alert("Profile updated successfully!");
            location.reload();
        })
        .catch(error => console.error('Error updating profile:', error));
    }

