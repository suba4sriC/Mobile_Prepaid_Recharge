document.addEventListener("DOMContentLoaded", async function () {
    const transactionDetails = JSON.parse(localStorage.getItem("transactionDetails"));
    const mobileNumber = localStorage.getItem("phoneNumber");

    if (transactionDetails) {
        document.getElementById("mobileNumber").textContent = mobileNumber;
        document.getElementById("paymentId").textContent = transactionDetails.paymentId;
        document.getElementById("planName").textContent = transactionDetails.prepaidPlan.planName;
        document.getElementById("amount").textContent = transactionDetails.amount || 'N/A';
        document.getElementById("planValidity").textContent = transactionDetails.prepaidPlan.planValidity;
        document.getElementById("planData").textContent = transactionDetails.prepaidPlan.planData;
        document.getElementById("planTalktime").textContent = transactionDetails.prepaidPlan.planTalktime;
        document.getElementById("planSms").textContent = transactionDetails.prepaidPlan.planSms;

        const rawDate = new Date(transactionDetails.dateAndTime);
        const formattedDate = rawDate.toLocaleString("en-IN", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        document.getElementById("dateTime").textContent = formattedDate;

        // Attach event listener to the download button
        document.getElementById("downloadBtn").addEventListener("click", function () {
            generatePDF(transactionDetails, mobileNumber);
        });

        sendPaymentEmail(transactionDetails);
    } else {
        alert("Transaction details not found. Please contact support.");
    }
});



async function sendPaymentEmail(transactionDetails) {
    try {
        const userEmail = transactionDetails.prepaidUser.userEmail; 

        if (!userEmail) {
            console.error("User email not found in transaction details.");
            return;
        }
        const token = localStorage.getItem("jwtToken");
        const response = await fetch("http://localhost:8083/auth/user/api/payment/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                email: userEmail,
                paymentId: transactionDetails.paymentId,
                planName: transactionDetails.prepaidPlan.planName,
                amount: transactionDetails.amount,
                validity: transactionDetails.prepaidPlan.planValidity,
                data: transactionDetails.prepaidPlan.planData,
                talktime: transactionDetails.prepaidPlan.planTalktime,
                sms: transactionDetails.prepaidPlan.planSms,
                dateTime: transactionDetails.dateAndTime
            })
        });

        if (!response.ok) {
            throw new Error("Failed to send payment confirmation email.");
        }

        const result = await response.text();
        console.log(" Email sent successfully:", result);
    } catch (error) {
        console.error(" Error sending email:", error);
    }
}

function generatePDF(transactionDetails, mobileNumber) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Transaction Details", 80, 20);

    const rawDate = new Date(transactionDetails.dateAndTime);
    const formattedDate = rawDate.toLocaleString("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const tableData = [
        ["Mobile Number", mobileNumber],
        ["Payment ID", transactionDetails.paymentId],
        ["Plan Name", transactionDetails.prepaidPlan.planName],
        ["Amount Paid", `₹${transactionDetails.amount}`],
        ["Validity", transactionDetails.prepaidPlan.planValidity],
        ["Data", transactionDetails.prepaidPlan.planData],
        ["Talktime", transactionDetails.prepaidPlan.planTalktime],
        ["SMS", transactionDetails.prepaidPlan.planSms],
        ["Transaction Date & Time",  formattedDate],
    ];

    doc.autoTable({
        startY: 30,
        head: [["Details", "Information"]],
        body: tableData,
        theme: "striped",
        styles: { fontSize: 12 },
        headStyles: { fillColor: [100, 150, 200] },
    });

    doc.save("Transaction_Details.pdf");
}
