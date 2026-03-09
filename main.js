// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const nav = document.querySelector('nav');
if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'var(--shadow-md)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
            nav.style.boxShadow = 'none';
        }
    });
}

// Simple fade-in animation for cards
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .step-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Password Toggle logic
const togglePassword = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');
if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.setAttribute('data-lucide', type === 'password' ? 'eye' : 'eye-off');
        if (typeof lucide !== 'undefined') lucide.createIcons(); // Re-render icon
    });
}

// Role Selector logic
const roleOptions = document.querySelectorAll('.role-option');
if (roleOptions) {
    roleOptions.forEach(option => {
        option.addEventListener('click', () => {
            roleOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            // Update demo credentials based on role
            const role = option.getAttribute('data-role');
            const demoCreds = document.querySelector('.demo-credentials');
            if (demoCreds) {
                if (role === 'doctor') {
                    demoCreds.innerHTML = `
                        <div class="demo-credential-item">Email: <b>doctor@care.com</b></div>
                        <div class="demo-credential-item">Pass: <b>doc123</b></div>
                    `;
                } else {
                    demoCreds.innerHTML = `
                        <div class="demo-credential-item">Email: <b>patient@care.com</b></div>
                        <div class="demo-credential-item">Pass: <b>demo123</b></div>
                    `;
                }
            }
        });
    });
}

// OTP Input Handling
const otpBoxes = document.querySelectorAll('.otp-box');
if (otpBoxes) {
    otpBoxes.forEach((box, index) => {
        box.addEventListener('input', (e) => {
            if (e.target.value && index < otpBoxes.length - 1) {
                otpBoxes[index + 1].focus();
            }
        });
        box.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpBoxes[index - 1].focus();
            }
        });
    });
}

// OTP Timer Logic
const timerEl = document.getElementById('timer');
const resendBtn = document.getElementById('resend-btn');
if (timerEl && resendBtn) {
    let timeLeft = 60;
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            resendBtn.classList.add('active');
            const resendContainer = document.querySelector('.resend-container');
            if (resendContainer) {
                resendContainer.innerHTML = `Didn't receive code? <button id="resend-btn" class="resend-btn active">Resend OTP</button>`;
                document.getElementById('resend-btn').addEventListener('click', () => {
                    window.location.reload();
                });
            }
        }
    }, 1000);
}

// Find Doctor Filters
const filterPills = document.querySelectorAll('.filter-pill');
if (filterPills.length > 0) {
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            // Simple filter logic (for demo)
            const specialization = pill.innerText;
            const cards = document.querySelectorAll('.doctor-card');
            let visibleCount = 0;

            cards.forEach(card => {
                const cardSpecEl = card.querySelector('.specialization');
                if (cardSpecEl) {
                    const cardSpec = cardSpecEl.innerText;
                    if (specialization === 'All' || cardSpec === specialization) {
                        card.style.display = 'block';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                }
            });

            // Update result count text
            const countText = document.querySelector('.results-info span');
            if (countText) {
                countText.innerText = `${visibleCount} doctor${visibleCount === 1 ? '' : 's'} found`;
            }
        });
    });
}

// Appointments Tab Switching removed from here. Handled in book.js
