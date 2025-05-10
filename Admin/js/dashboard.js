function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("loggedInUser");
        window.location.href = "../login.html";
    }
}
