function confirmPayment(){
    window.location.href="payment-success.html"
}


function openConfirmation(method) {
    let isValid = true;
    let errorMessage = "";

    if (method === "UPI") {
        let upiId = document.getElementById("upiId").value.trim();
        let upiName = document.getElementById("upiName").value.trim();
        let amount = document.getElementById("amount").value.trim();

        if (!upiId || !upiName || !amount) {
            isValid = false;
            errorMessage = "All fields are required.";
        }
    }

    if (method === "Net Banking") {
        let bank = document.getElementById("bank").value.trim();
        let netAmount = document.getElementById("netAmount").value.trim();

        if (!bank || !netAmount) {
            isValid = false;
            errorMessage = "All fields are required.";
        }
    }

    if (method === "Wallet") {
        let walletId = document.getElementById("walletId").value.trim();
        let walletAmount = document.getElementById("walletAmount").value.trim();

        if (!walletId || !walletAmount) {
            isValid = false;
            errorMessage = "All fields are required.";
        }
    }

    if (method === "Card") {
        let cardNumber = document.getElementById("cardNumber").value.trim();
        let cardExpiry = document.getElementById("cardExpiry").value.trim();
        let cardCVV = document.getElementById("cardCVV").value.trim();
        let cardAmount = document.getElementById("cardAmount").value.trim();

        if (!cardNumber || !cardExpiry || !cardCVV || !cardAmount) {
            isValid = false;
            errorMessage = "All fields are required.";
        }
    }

    let errorContainer = document.getElementById(method.toLowerCase() + "Error");
    if (!isValid) {
        errorContainer.innerText = errorMessage;
        errorContainer.style.color = "red";
        return;
    } else {
        errorContainer.innerText = ""; 
    }

    selectedPaymentMethod = method;
    document.getElementById("paymentMethod").innerText = method;

    let openModals = document.querySelectorAll('.modal.show');
    openModals.forEach(modal => {
        let modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
    });

    let confirmationModal = new bootstrap.Modal(document.getElementById("confirmationModal"));
    confirmationModal.show();
}