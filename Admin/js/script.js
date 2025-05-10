document.addEventListener("DOMContentLoaded", function () {
    const ctx1 = document.getElementById('patientsChart').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Patients',
                data: [1500, 2212, 1800, 2500, 2300, 2100, 2000],
                borderColor: '#021b5d',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    const ctx2 = document.getElementById('appointmentsChart').getContext('2d');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'In Progress', 'Not Started'],
            datasets: [{
                data: [84, 46, 13],
                backgroundColor: ['green', 'blue', 'red']
            }]
        },
        options: {
            responsive: true
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Handle Accept and Reject button clicks
    document.querySelectorAll(".accept-btn").forEach(button => {
        button.addEventListener("click", function () {
            let row = this.closest("tr");
            row.querySelector(".status-badge").classList.remove("rejected", "pending");
            row.querySelector(".status-badge").classList.add("accepted");
            row.querySelector(".status-badge").textContent = "Accepted";
        });
    });

    document.querySelectorAll(".reject-btn").forEach(button => {
        button.addEventListener("click", function () {
            let row = this.closest("tr");
            row.querySelector(".status-badge").classList.remove("accepted", "pending");
            row.querySelector(".status-badge").classList.add("rejected");
            row.querySelector(".status-badge").textContent = "Rejected";
        });
    });

    // Handle pagination
    document.querySelectorAll(".pagination a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            document.querySelector(".pagination a.active").classList.remove("active");
            this.classList.add("active");
        });
    });
});
