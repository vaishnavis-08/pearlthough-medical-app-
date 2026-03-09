// Auth Flow Logic
document.addEventListener('DOMContentLoaded', () => {
    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'otp.html';
        });
    }

    // Signup Form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = 'otp.html';
        });
    }

    // OTP Verification
    const verifyOtpBtn = document.getElementById('verify-otp-btn');
    const successScreen = document.getElementById('success-screen');
    if (verifyOtpBtn && successScreen) {
        verifyOtpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Show success screen
            successScreen.style.display = 'flex';

            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        });
    }
});
