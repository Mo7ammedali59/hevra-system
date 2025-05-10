// In signup.html, replace the form submission handler with this:
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!signupForm.checkValidity()) {
        e.stopPropagation();
        signupForm.classList.add('was-validated');
        return;
    }

    // Check password match
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        document.getElementById('confirm-password-error').style.display = 'block';
        return;
    } else {
        document.getElementById('confirm-password-error').style.display = 'none';
    }

    // Prepare user data
    const userType = document.getElementById('userType').value;
    const user = {
        firstName: document.getElementById('firstName').value.trim(),
        middleName: document.getElementById('middleName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        password: password, // In production, you should hash this password
        gender: document.getElementById('gender').value,
        userType: userType
    };

    if (userType === 'Patient') {
        user.dob = document.getElementById('dob').value;
        user.condition = document.getElementById('condition').value;
    }

    // Store in localStorage (this matches what login expects)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Also store in sessionStorage for immediate access if needed
    sessionStorage.setItem('currentUser', JSON.stringify(user));

    // Show success message
    document.getElementById('modalMessage').innerHTML =
        `<div class="text-center">
            <i class="bi bi-check-circle-fill text-success" style="font-size: 1.5rem;"></i>
            <p class="mt-2 mb-0">Account created successfully! Redirecting to login...</p>
        </div>`;
    modal.show();

    setTimeout(() => {
        window.location.href = 'login.html?email=' + encodeURIComponent(user.email);
    }, 2000);
});