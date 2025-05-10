const form = document.getElementById('signup-form');
const errors = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    password: document.getElementById('password-error'),
    phone: document.getElementById('phone-error')
};
const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));

form.addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    // Reset errors
    Object.values(errors).forEach(error => {
        error.style.display = 'none';
    });

    // Name validation
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        showError('name', 'Name is required');
        isValid = false;
    }

    // Email validation
    const email = document.getElementById('email').value.trim();
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Password validation
    const password = document.getElementById('password').value.trim();
    if (password.length < 8) {
        showError('password', 'Password must be at least 8 characters');
        isValid = false;
    }

    // Phone validation
    const phone = document.getElementById('phone').value.trim();
    if (!validatePhone(phone)) {
        showError('phone', 'Please enter a valid phone number');
        isValid = false;
    }

    if (isValid) {
        const userData = { name, email, password, phone };
        localStorage.setItem(email, JSON.stringify(userData)); // Save user data with email as key

        showModal("Signup Successful! Welcome to our platform.", true);
        setTimeout(() => window.location.href = 'login.html', 2000);
    } else {
        showModal("Signup Failed! Please check your details and try again.", false);
    }
});

function showError(field, message) {
    errors[field].textContent = message;
    errors[field].style.display = 'block';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phone);
}

function showModal(message, success) {
    document.getElementById('modalMessage').innerHTML = `<span class="${success ? 'text-success' : 'text-danger'}">${message}</span>`;
    messageModal.show();
}
