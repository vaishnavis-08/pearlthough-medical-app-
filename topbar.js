// Top Bar Notifications & Profile Button Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Convert the bell icon into a notification dropdown
    const bellBtn = document.querySelector('.top-bar-actions .icon-btn:not(.profile-icon)');
    if (bellBtn) {
        // Wrap bell in a relative container
        const wrapper = document.createElement('div');
        wrapper.className = 'notif-wrapper';
        bellBtn.parentNode.insertBefore(wrapper, bellBtn);
        wrapper.appendChild(bellBtn);

        // Add red badge
        const badge = document.createElement('span');
        badge.className = 'notif-badge';
        badge.textContent = '3';
        bellBtn.style.position = 'relative';
        bellBtn.style.cursor = 'pointer';
        bellBtn.appendChild(badge);

        // Create dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'notif-dropdown';
        dropdown.innerHTML = `
            <div class="notif-header">
                <h3>Notifications</h3>
                <button class="mark-read">Mark all read</button>
            </div>
            <div class="notif-list">
                <div class="notif-item unread">
                    <div class="notif-icon green">&#10003;</div>
                    <div class="notif-body">
                        <p><strong>Appointment Confirmed</strong> with Dr. Prakash Das on Mar 09 at 10:00 AM</p>
                        <div class="notif-time">2 minutes ago</div>
                    </div>
                </div>
                <div class="notif-item unread">
                    <div class="notif-icon blue">&#128172;</div>
                    <div class="notif-body">
                        <p><strong>Lab Report Ready</strong> — Your CBC report from Metropolis Lab is now available</p>
                        <div class="notif-time">1 hour ago</div>
                    </div>
                </div>
                <div class="notif-item unread">
                    <div class="notif-icon orange">&#9888;</div>
                    <div class="notif-body">
                        <p><strong>Payment Reminder</strong> — Pending payment for appointment with Dr. Vaishnavi</p>
                        <div class="notif-time">3 hours ago</div>
                    </div>
                </div>
                <div class="notif-item">
                    <div class="notif-icon purple">&#128197;</div>
                    <div class="notif-body">
                        <p><strong>Upcoming Appointment</strong> — Reminder for Dr. John Reddy tomorrow at 10:30 AM</p>
                        <div class="notif-time">Yesterday</div>
                    </div>
                </div>
                <div class="notif-item">
                    <div class="notif-icon green">&#128138;</div>
                    <div class="notif-body">
                        <p><strong>Prescription Updated</strong> — Dr. Sarah Smith updated your medication list</p>
                        <div class="notif-time">2 days ago</div>
                    </div>
                </div>
            </div>
            <div class="notif-footer">
                <a href="appointments.html">View all notifications</a>
            </div>
        `;
        wrapper.appendChild(dropdown);

        // Toggle dropdown on click
        bellBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });

        // Mark all read
        dropdown.querySelector('.mark-read').addEventListener('click', () => {
            dropdown.querySelectorAll('.notif-item.unread').forEach(item => {
                item.classList.remove('unread');
            });
            badge.style.display = 'none';
        });
    }

    // 3. Add Logout to top bar if not present
    const topBarActions = document.querySelector('.top-bar-actions');
    if (topBarActions && !topBarActions.querySelector('.top-bar-logout')) {
        const logoutA = document.createElement('a');
        logoutA.href = 'index.html';
        logoutA.className = 'top-bar-logout';
        logoutA.innerHTML = `
            <i data-lucide="log-out" style="width: 16px;"></i>
            <span>Logout</span>
        `;
        topBarActions.appendChild(logoutA);
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
});
