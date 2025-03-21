$(document).ready(function () {
    $("#subscribersTable").DataTable();
    $("#historyTable").DataTable();
});

function searchSubscriber() {
    const mobileNumber = document.getElementById("searchMobile").value;
    const subscribers = {
        "9876543210": "john_doe",
        "9876543211": "jane_smith",
        "9870675712": "Dustin",
        "8709345237": "Erica"
    };

    if (subscribers[mobileNumber]) {
        viewHistory(subscribers[mobileNumber]);
    } else {
        alert("No subscriber found with this mobile number");
    }
}

function viewHistory(subscriber) {
    let subscribersList = document.getElementById("subscribersList");
    let historyDiv = document.getElementById("history");
    let historyData = document.getElementById("history-data");

    historyData.innerHTML = "";

    let data = {
        "john_doe": [
            { "plan": "Basic Plan", "date": "2024-01-15", "payment": "Credit Card" },
            { "plan": "Premium Plan", "date": "2024-02-10", "payment": "UPI" }
        ],
        "jane_smith": [
            { "plan": "Standard Plan", "date": "2024-01-20", "payment": "Net Banking" },
            { "plan": "Premium Plan", "date": "2024-02-05", "payment": "Debit Card" }
        ],
        "Dustin": [
            { "plan": "Unlimited Plan", "date": "2024-03-10", "payment": "Wallet" },
            { "plan": "Premium Plan", "date": "2024-02-05", "payment": "Debit Card" }
        ],
        "Erica": [
            { "plan": "Ott Plan", "date": "2024-02-19", "payment": "Credit card" },
            { "plan": "Premium Plan", "date": "2024-02-05", "payment": "Debit Card" }
        ]
    };

    if (data[subscriber]) {
        data[subscriber].forEach(entry => {
            historyData.innerHTML += `
                <tr>
                    <td>${entry.plan}</td>
                    <td>${entry.date}</td>
                    <td>${entry.payment}</td>
                </tr>
            `;
        });

        subscribersList.classList.add("d-none");
        historyDiv.classList.remove("d-none");

        if ($.fn.DataTable.isDataTable('#historyTable')) {
            $('#historyTable').DataTable().destroy();
        }
        $("#historyTable").DataTable();
    }
}

function backToList() {
    document.getElementById("subscribersList").classList.remove("d-none");
    document.getElementById("history").classList.add("d-none");
    document.getElementById("searchMobile").value = "";
}