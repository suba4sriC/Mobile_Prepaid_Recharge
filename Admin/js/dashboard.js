const pieCtx = document.getElementById('paymentMethodsChart').getContext('2d');
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: ['Credit Card', 'Debit Card', 'UPI', 'Net Banking'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        'rgba(159, 209, 242, 0.8)',
                        'rgba(145, 204, 230, 0.8)',
                        'rgba(130, 190, 220, 0.8)',
                        'rgba(115, 175, 210, 0.8)'
                    ],
                    borderColor: [
                        'rgba(159, 209, 242, 1)',
                        'rgba(145, 204, 230, 1)',
                        'rgba(130, 190, 220, 1)',
                        'rgba(115, 175, 210, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right'
                    },
                    title: {
                        display: true,
                        text: 'Popular Payment Methods'
                    }
                }
            }
        });

        const barCtx = document.getElementById('subscriptionPlansChart').getContext('2d');
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Basic', 'Standard', 'Premium', 'Enterprise'],
                datasets: [{
                    label: 'Number of Users',
                    data: [150, 300, 200, 50],
                    backgroundColor: 'rgba(159, 209, 242, 0.8)',
                    borderColor: 'rgba(159, 209, 242, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Users by Subscription Plan'
                    }
                }
            }
        });