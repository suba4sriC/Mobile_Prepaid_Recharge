function confirmPayment() {
    window.location.href = "payment-success.html";
}

function clearErrorMessage(method) {
    let errorContainer = document.getElementById(method.toLowerCase() + "Error");
    errorContainer.innerText = "";
}



function openConfirmation(method) {
    let isValid = true;
    let errorMessage = "";

    if (method === "UPI") {
        let upiId = document.getElementById("upiId").value.trim();
        let upiName = document.getElementById("upiName").value.trim();
        let amount = document.getElementById("amount").value.trim();

        document.getElementById("upiId").addEventListener("input", function () { clearErrorMessage(method); });
        document.getElementById("upiName").addEventListener("input", function () { clearErrorMessage(method); });
        document.getElementById("amount").addEventListener("input", function () { clearErrorMessage(method); });

        if (!upiId || !upiName || !amount) {
            isValid = false;
            errorMessage = "All fields are required.";
        }
    }

    if (method === "Net Banking") {
        let bank = document.getElementById("bank").value.trim();
        let netAmount = document.getElementById("netAmount").value.trim();

        document.getElementById("bank").addEventListener("input", function () { clearErrorMessage(method); });
        document.getElementById("netAmount").addEventListener("input", function () { clearErrorMessage(method); });

        if (!bank || !netAmount) {
            isValid = false;
            errorMessage = "All fields are required.";
        }
    }

    if (method === "Wallet") {
        let walletId = document.getElementById("walletId").value.trim();
        let walletAmount = document.getElementById("walletAmount").value.trim();

        document.getElementById("walletId").addEventListener("input", function () { clearErrorMessage(method); });
        document.getElementById("walletAmount").addEventListener("input", function () { clearErrorMessage(method); });

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

        document.getElementById("cardNumber").addEventListener("input", function () { clearErrorMessage(method); });
        document.getElementById("cardExpiry").addEventListener("input", function () { clearErrorMessage(method); });
        document.getElementById("cardCVV").addEventListener("input", function () { clearErrorMessage(method); });
        document.getElementById("cardAmount").addEventListener("input", function () { clearErrorMessage(method); });

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

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    const price = params.get("price");
    const duration = params.get("duration");

    if (plan && price && duration) {
      document.getElementById("upiPlanName").textContent = plan;
      document.getElementById("upiPlanPrice").textContent = price;
      document.getElementById("upiPlanDuration").textContent = duration;
      // Net Banking Modal
      document.getElementById("netPlanName").textContent = plan;
      document.getElementById("netPlanPrice").textContent = price;
      document.getElementById("netPlanDuration").textContent = duration;
      // Wallet Modal
      document.getElementById("walletPlanName").textContent = plan;
      document.getElementById("walletPlanPrice").textContent = price;
      document.getElementById("walletPlanDuration").textContent = duration;
      // Card Modal
      document.getElementById("cardPlanName").textContent = plan;
      document.getElementById("cardPlanPrice").textContent = price;
      document.getElementById("cardPlanDuration").textContent = duration;
    } else {
      console.warn("Plan details not found in URL parameters.");
    }
  });
