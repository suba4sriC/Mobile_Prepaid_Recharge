const subscribers = [
    {
        name: "Subasri Chandrasekar",
        mobile_number: "+91 9876543210",
        email: "subasri@example.com",
        active_plans: [
            { plan_name: "Unlimited 599", validity: "3", expiry_date: "2025-02-23", price: 599 }
        ]
    },
    {
        name: "Arjun Kumar",
        mobile_number: "+91 9876512345",
        email: "arjun@example.com",
        active_plans: [
            { plan_name: "Work From Home 251", validity: "5", expiry_date: "2025-02-25", price: 251 }
        ]
    },
    {
        name: "Priya Sharma",
        mobile_number: "+91 9876598765",
        email: "priya@example.com",
        active_plans: [
            { plan_name: "Daily 1.5GB - 56 Days", validity: "2", expiry_date: "2025-02-22", price: 399 }
        ]
    }
];

// Function to filter subscribers whose plan expires in 3 days
function getExpiringSubscribers() {
    const today = new Date();
    return subscribers.flatMap(subscriber => 
        subscriber.active_plans
            .filter(plan => parseInt(plan.validity) <= 3)
            .map(plan => ({
                name: subscriber.name,
                mobile_number: subscriber.mobile_number,
                email: subscriber.email,
                plan_name: plan.plan_name,
                validity: plan.validity + " days",
                expiry_date: plan.expiry_date,
                price: "₹" + plan.price
            }))
    );
}

// Populate DataTable with expiring subscribers
$(document).ready(function () {
    const expiringData = getExpiringSubscribers();
    const tableBody = $("#expiringPlansTable tbody");

    expiringData.forEach(subscriber => {
        tableBody.append(`
            <tr>
                <td>${subscriber.name}</td>
                <td>${subscriber.mobile_number}</td>
                <td>${subscriber.email}</td>
                <td>${subscriber.plan_name}</td>
                <td>${subscriber.validity}</td>
                <td>${subscriber.expiry_date}</td>
                <td>${subscriber.price}</td>
            </tr>
        `);
    });

    // Initialize DataTable
    $("#expiringPlansTable").DataTable();
});