// doctor-dashboard.js - Chart Initialization

document.addEventListener('DOMContentLoaded', () => {
    // Appointments Chart
    const appointmentsCtx = document.getElementById('appointmentsChart').getContext('2d');
    new Chart(appointmentsCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: 'Daily Appointments',
                data: [12, 15, 10, 18, 14, 9],
                borderColor: '#2A5C82',
                tension: 0.4
            }]
        }
    });

    // Patient Statistics Chart
    const patientsCtx = document.getElementById('patientsChart').getContext('2d');
    new Chart(patientsCtx, {
        type: 'doughnut',
        data: {
            labels: ['New Patients', 'Returning Patients', 'Follow-ups'],
            datasets: [{
                data: [25, 40, 35],
                backgroundColor: ['#2A5C82', '#27AE60', '#3498DB']
            }]
        }
    });
});