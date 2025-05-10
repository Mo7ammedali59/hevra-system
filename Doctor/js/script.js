// script.js - Doctor Dashboard General Functionality

// Sidebar Toggle Functionality
const menuIcon = document.querySelector('.menu-icon');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

menuIcon.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
});

// Logout Function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear session data or tokens here
        window.location.href = '../login.html';
    }
}

// Table Row Interactions
document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const patientName = row.cells[0].textContent;
        // Redirect to patient details page
        window.location.href = `patient-details.html?name=${encodeURIComponent(patientName)}`;
    });
});

document.querySelectorAll('.diagnose-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const patientId = row.dataset.patientId; // Assuming data-patient-id attribute exists
        // Redirect to diagnosis page
        window.location.href = `diagnosis.html?id=${patientId}`;
    });
});

// Dynamic Content Loading
function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.querySelector('.main-content').innerHTML = data;
            initializePageSpecificScripts();
        });
}

// Initialize Page Specific Features
function initializePageSpecificScripts() {
    // Reinitialize event listeners after content load
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('href');
            loadContent(page);
        });
    });
}

// Responsive Adjustments
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('collapsed');
        mainContent.classList.remove('expanded');
    }
});
