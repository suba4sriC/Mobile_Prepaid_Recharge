document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const planId = params.get("planId"); 
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
        console.error("JWT Token is missing. User may need to log in.");
        alert("Session expired. Please log in again.");
        return;
    }

    if (planId) {
        try {
            const response = await fetch(`http://localhost:8083/auth/api/prepaidplan/${planId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwtToken.trim()}`
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch plan details. Status: ${response.status}`);
            }

            const planDetails = await response.json();
            console.log("Plan Details Fetched:", planDetails);

            
            document.getElementById("planName").textContent = planDetails.planName || 'N/A';
            document.getElementById("planPrice").textContent = `₹${planDetails.planPrice || 0}`;
            document.getElementById("planValidity").textContent = planDetails.planValidity || 'N/A';
            document.getElementById("planData").textContent = planDetails.planData || 'N/A';
            document.getElementById("planTalktime").textContent = planDetails.planTalktime || 'N/A';
            document.getElementById("planSms").textContent = planDetails.planSms || 'N/A';

            localStorage.setItem("amount", planDetails.planPrice);
            

        } catch (error) {
            console.error("Error fetching plan details:", error);
            alert("Failed to load plan details. Please try again.");
        }
    } else {
        console.warn("Plan ID not found in URL parameters.");
    }
});

function initiateRazorpayPayment() {
    const amount = parseInt(localStorage.getItem("amount")) * 100;  // Amount in paise (Razorpay requires this)

    const options = {
        key: "rzp_test_Jic0RqbBs1oId3", 
        amount: amount,
        currency: "INR",
        name: "Swift Top",
        description: "Plan Recharge",
        image: "images/Screenshot__10_-removebg-preview.png",
        handler: function (response) {
            console.log("Payment Successful:", response);
            alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
            confirmPayment(response.razorpay_payment_id);
        },
        prefill: {
            name: "Subasri Chandrasekar",
            email: "subasri@example.com",
            contact: localStorage.getItem("phoneNumber")
        },
        theme: {
            color: "#7DAECD"
        }
    };

    const rzp = new Razorpay(options);

    rzp.on('payment.failed', function (response) {
        console.error("Payment Failed:", response.error);
        alert(`Payment Failed: ${response.error.description}`);
    });

    rzp.open();
}

// Confirm Payment API Call
async function confirmPayment(paymentId) {
    try {
        const phoneNumber = localStorage.getItem("phoneNumber");
        const userIdResponse = await fetch(`http://localhost:8083/auth/user/getUserIdByPhone/${phoneNumber}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken").trim()}`
            }
        });

        if (!userIdResponse.ok) {
            throw new Error(`Failed to fetch userId. Status: ${userIdResponse.status}`);
        }

        const userId = await userIdResponse.text();
        const planId = new URLSearchParams(window.location.search).get("planId");
        const amount = localStorage.getItem("amount");
        const currentDateTime = new Date().toISOString().replace('Z', ''); // Removes 'Z'

        const response = await fetch("http://localhost:8083/auth/user/transaction/confirm", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwtToken").trim()}`
            },
            body: JSON.stringify({
                paymentId: paymentId,
                userId: parseInt(userId),  
                planId: planId,
                amount: amount,
                paymentStatus: "Success",
                dateAndTime: currentDateTime
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to confirm payment. Status: ${response.status}`);
        }

        const transactionDetails = await response.json();
        console.log("Payment Confirmation Response:", transactionDetails);
        localStorage.setItem("transactionDetails", JSON.stringify(transactionDetails));
        window.location.href = "payment-success.html";

    } catch (error) {
        console.error("Error confirming payment:", error);
        alert("Failed to confirm payment. Please contact support.");
    }
}


