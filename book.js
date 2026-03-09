// Booking logic and Appointments State Management
document.addEventListener('DOMContentLoaded', () => {

    // Seed default appointments if none exist
    if (!localStorage.getItem('appointmentsSeeded')) {
        const defaultApts = [
            { id: '1001', doctor: 'Dr. Prakash Das', specialty: 'Sr. Psychologist', image: 'doctor_prakash_1772906642585.png', date: 'Sat, Mar 01', time: '10:00 AM', status: 'upcoming' },
            { id: '1002', doctor: 'Dr. Sarah Smith', specialty: 'General Physician', image: 'doctor_prakash_1772906642585.png', date: 'Tue, Feb 25', time: '02:00 PM', status: 'completed' },
            { id: '1003', doctor: 'Dr. John Reddy', specialty: 'Cardiologist', image: 'doctor_john_1772906660817.png', date: 'Sun, Feb 16', time: '11:30 AM', status: 'completed' },
            { id: '1004', doctor: 'Dr. Vaishnavi', specialty: 'Dermatologist', image: 'doctor_vaishnavi_1772906703484.png', date: 'Fri, Feb 14', time: '04:00 PM', status: 'canceled' }
        ];
        // Merge with existing if they booked one before this fix
        const existingApts = JSON.parse(localStorage.getItem('appointmentsData') || '[]');
        localStorage.setItem('appointmentsData', JSON.stringify([...existingApts, ...defaultApts]));
        localStorage.setItem('appointmentsSeeded', 'true');
    }

    // 1. find-doctor.html -> book-appointment.html
    const bookButtons = document.querySelectorAll('.book-btn');
    bookButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Just for demo, we grab the doctor's name closest to the button
            const card = e.target.closest('.doctor-card');
            if (card) {
                const docName = card.querySelector('h3').innerText;
                const specName = card.querySelector('.specialization').innerText;
                const docImg = card.querySelector('.doctor-image').getAttribute('src');
                const docExp = card.querySelector('.meta-item span').innerText;
                const docRating = card.querySelector('.rating-row span').innerText;
                const docFee = card.querySelector('.fee-info span').innerText;

                localStorage.setItem('pendingBookingDoctor', docName);
                localStorage.setItem('pendingBookingSpec', specName);
                localStorage.setItem('pendingBookingImg', docImg);
                localStorage.setItem('pendingBookingExp', docExp);
                localStorage.setItem('pendingBookingRating', docRating);
                localStorage.setItem('pendingBookingFee', docFee);
            }
            window.location.href = 'book-appointment.html';
        });
    });

    // 1b. Grid / List toggle on find-doctor.html
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const doctorGrid = document.querySelector('.doctor-grid');
    if (toggleBtns.length > 0 && doctorGrid) {
        toggleBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (index === 0) {
                    // Grid view
                    doctorGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
                    doctorGrid.querySelectorAll('.doctor-card').forEach(card => {
                        card.style.flexDirection = '';
                        card.style.maxWidth = '';
                    });
                    doctorGrid.querySelectorAll('.doctor-card-top').forEach(top => {
                        top.style.height = '';
                        top.style.width = '';
                        top.style.minWidth = '';
                    });
                } else {
                    // List view
                    doctorGrid.style.gridTemplateColumns = '1fr';
                    doctorGrid.querySelectorAll('.doctor-card').forEach(card => {
                        card.style.flexDirection = 'row';
                        card.style.maxWidth = '100%';
                    });
                    doctorGrid.querySelectorAll('.doctor-card-top').forEach(top => {
                        top.style.height = '100%';
                        top.style.width = '220px';
                        top.style.minWidth = '220px';

                    });
                }
            });
        });
    }

    // 2. book-appointment.html logic
    const dateItems = document.querySelectorAll('.date-item');
    const timeSlots = document.querySelectorAll('.time-slot');
    const selectedInfoSpan = document.querySelector('.selected-info span');
    const confirmBtn = document.querySelector('a[href="booking-success.html"]');

    // Hydrate doc info if available
    const bookingDocName = localStorage.getItem('pendingBookingDoctor');
    const bookingSpecName = localStorage.getItem('pendingBookingSpec');
    const bookingDocImg = localStorage.getItem('pendingBookingImg');
    const bookingDocExp = localStorage.getItem('pendingBookingExp');
    const bookingDocRating = localStorage.getItem('pendingBookingRating');
    const bookingDocFee = localStorage.getItem('pendingBookingFee');

    const docDisplay = document.querySelector('.booking-section h3');
    const specDisplay = document.querySelector('.booking-section .specialization');
    const imgDisplay = document.querySelector('.booking-section .doctor-image');
    const expDisplay = document.querySelector('#doc-exp');
    const ratingDisplay = document.querySelector('#doc-rating');
    const feeDisplay = document.querySelector('#doc-fee');

    if (docDisplay && bookingDocName) docDisplay.innerText = bookingDocName;
    if (specDisplay && bookingSpecName) specDisplay.innerText = bookingSpecName;
    if (imgDisplay && bookingDocImg) imgDisplay.src = bookingDocImg;
    if (expDisplay && bookingDocExp) expDisplay.innerText = bookingDocExp;
    if (ratingDisplay && bookingDocRating) ratingDisplay.innerText = bookingDocRating;
    if (feeDisplay && bookingDocFee) feeDisplay.innerText = bookingDocFee;

    const bookNowHeroBtn = document.getElementById('hero-book-now-btn');
    if (bookNowHeroBtn) {
        bookNowHeroBtn.addEventListener('click', () => {
            const dateSection = document.querySelector('.date-picker-container');
            if (dateSection) {
                dateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    const doctorBios = {
        'Dr. Prakash Das': 'Dr. Prakash Das is a preeminent Senior Psychologist with over 15 years of experience in clinical psychology. He specializes in cognitive behavioral therapy, anxiety management, and mental wellness for corporate professionals.',
        'Dr. Sarah Smith': 'Dr. Sarah Smith is a highly regarded General Physician known for her holistic approach to preventive healthcare. She has helped thousands of families manage chronic conditions and maintain peak physical health.',
        'Dr. John Reddy': 'Dr. John Reddy is a world-class Cardiologist specializing in interventional procedures and heart disease prevention. He is a lead researcher in modern cardiac treatments and cardiovascular health.',
        'Dr. Vaishnavi': 'Dr. Vaishnavi is a leading Dermatologist focusing on advanced skin treatments, medical aesthetics, and complex skin conditions. Her patient-centric approach makes her one of the most trusted names in the field.',
        'Dr. James Smith': 'Dr. James Smith is an expert Neurologist specializing in neurodegenerative diseases and cognitive health. He provides cutting-edge treatments for a wide range of neurological disorders.',
        'Dr. Elena Rodriguez': 'Dr. Elena Rodriguez is a dedicated Pediatrician with a passion for child development and neonatal care. She is committed to providing comprehensive healthcare for children from birth through adolescence.'
    };

    const viewProfileBtn = document.getElementById('hero-view-profile-btn');
    const bioBox = document.getElementById('doctor-bio-box');
    const bioText = document.getElementById('doc-bio-text');

    if (viewProfileBtn && bioBox && bioText) {
        // Pre-set bio if we know the doctor
        if (bookingDocName && doctorBios[bookingDocName]) {
            bioText.innerText = doctorBios[bookingDocName];
        } else {
            bioText.innerText = "This specialist is a highly trained professional dedicated to providing the highest quality of healthcare in their field of expertise.";
        }

        viewProfileBtn.addEventListener('click', () => {
            const isHidden = bioBox.style.display === 'none';
            bioBox.style.display = isHidden ? 'block' : 'none';
            viewProfileBtn.innerText = isHidden ? 'Hide Description' : 'View Full Profile';

            if (isHidden) {
                bioBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    if (dateItems.length > 0 || timeSlots.length > 0) {
        let currentSelectedDate = 'Mon, Mar 09';
        let currentSelectedTime = '10:00 AM';

        const updateSelectedSlot = () => {
            if (selectedInfoSpan) {
                selectedInfoSpan.innerText = `${currentSelectedDate} • ${currentSelectedTime}`;
            }
        };

        dateItems.forEach(item => {
            item.addEventListener('click', () => {
                dateItems.forEach(d => d.classList.remove('active'));
                item.classList.add('active');

                const day = item.querySelector('span:first-child').innerText;
                const date = item.querySelector('span:last-child').innerText;
                currentSelectedDate = `${day}, Mar ${date.padStart(2, '0')}`;
                updateSelectedSlot();
            });
        });

        timeSlots.forEach(slot => {
            slot.addEventListener('click', () => {
                if (slot.classList.contains('disabled')) return;

                timeSlots.forEach(s => s.classList.remove('active'));
                slot.classList.add('active');

                currentSelectedTime = slot.innerText;
                updateSelectedSlot();
            });
        });

        if (confirmBtn) {
            confirmBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Guarantee storage is updated before unloading the page

                // Save appointment to state
                const newApt = {
                    id: 'APT-' + Math.floor(Math.random() * 10000),
                    doctor: bookingDocName || 'Dr. John Reddy',
                    specialty: bookingSpecName || 'Cardiologist',
                    image: bookingDocImg || 'doctor_john_1772906660817.png',
                    date: currentSelectedDate,
                    time: currentSelectedTime,
                    status: 'upcoming'
                };

                const existingApts = JSON.parse(localStorage.getItem('appointmentsData') || '[]');
                existingApts.unshift(newApt);
                localStorage.setItem('appointmentsData', JSON.stringify(existingApts));

                window.location.href = confirmBtn.getAttribute('href');
            });
        }
    }

    // 3. booking-success.html hydrate logic
    const successDocName = document.getElementById('success-doc-name');
    const successDocSpec = document.getElementById('success-doc-spec');
    const successDate = document.getElementById('success-date');
    const successTime = document.getElementById('success-time');
    const successImg = document.querySelector('.dr-img-success img');

    if (successDocName) {
        // Read the most recent booking
        const existingApts = JSON.parse(localStorage.getItem('appointmentsData') || '[]');
        if (existingApts.length > 0) {
            const latest = existingApts[0];
            successDocName.innerText = latest.doctor;
            if (successDocSpec) successDocSpec.innerText = latest.specialty;
            if (successDate) successDate.innerText = latest.date;
            if (successTime) successTime.innerText = latest.time;
            if (successImg && latest.image) successImg.src = latest.image;
        }
    }

    // 4. appointments.html Tab Logic & Rendering
    const aptContainer = document.querySelector('.appointment-list-vertical');
    if (aptContainer) {
        // Initialize default data if empty
        if (!localStorage.getItem('appointmentsSeeded')) {
            const defaultApts = [
                { id: '1001', doctor: 'Dr. Prakash Das', specialty: 'Sr. Psychologist', image: 'doctor_prakash_1772906642585.png', date: 'Sat, Mar 01', time: '10:00 AM', status: 'upcoming' },
                { id: '1002', doctor: 'Dr. Sarah Smith', specialty: 'General Physician', image: 'doctor_prakash_1772906642585.png', date: 'Tue, Feb 25', time: '02:00 PM', status: 'completed' },
                { id: '1003', doctor: 'Dr. John Reddy', specialty: 'Cardiologist', image: 'doctor_john_1772906660817.png', date: 'Sun, Feb 16', time: '11:30 AM', status: 'completed' },
                { id: '1004', doctor: 'Dr. Vaishnavi', specialty: 'Dermatologist', image: 'doctor_vaishnavi_1772906703484.png', date: 'Fri, Feb 14', time: '04:00 PM', status: 'canceled' }
            ];
            const existingApts = JSON.parse(localStorage.getItem('appointmentsData') || '[]');
            localStorage.setItem('appointmentsData', JSON.stringify([...existingApts, ...defaultApts]));
            localStorage.setItem('appointmentsSeeded', 'true');
        }

        const renderAppointments = (filterStatus) => {
            const allApts = JSON.parse(localStorage.getItem('appointmentsData') || '[]');
            const filteredApts = allApts.filter(a => a.status === filterStatus);

            aptContainer.innerHTML = '';

            if (filteredApts.length === 0) {
                aptContainer.innerHTML = `<div style="text-align:center; padding: 3rem; color: var(--text-muted);">No ${filterStatus} appointments found.</div>`;
            } else {
                filteredApts.forEach(apt => {
                    const isPaid = apt.payStatus === 'paid';
                    const statusBadgeClass = apt.status === 'upcoming' ?
                        (isPaid ? 'badge-pay-status paid' : 'badge-pay-status pending') :
                        (apt.status === 'completed' ? 'badge-pay-status paid' : 'badge-pay-status in-review');
                    const statusBadgeText = apt.status === 'upcoming' ?
                        (isPaid ? 'Paid' : 'Pending') :
                        (apt.status === 'completed' ? 'Paid' : 'Canceled');

                    const actionsHtml = apt.status === 'upcoming' ? `
                                ${isPaid ? '' : `<button class="btn-apt-action btn-pay-now apt-pay-btn" data-id="${apt.id}">Pay Now</button>`}
                                <button class="btn-apt-action btn-outline-resch apt-resch-btn" data-id="${apt.id}">Reschedule</button>
                                <button class="btn-apt-action btn-outline-canc apt-cancel-btn" data-id="${apt.id}">Cancel</button>
                    ` : (apt.status === 'completed' ? `
                                <button class="btn-apt-action btn-outline-done-v">Book Again</button>
                                <button class="btn-apt-action btn-outline-resch">Add Review</button>
                    ` : `
                                <button class="btn-apt-action btn-outline-done-v">Book Again</button>
                    `);

                    const cardHtml = `
                    <div class="appointment-card-v" style="animation: fadeIn 0.4s ease-out;">
                        <div class="apt-card-left">
                            <div class="dr-avatar-container" style="width: 70px; height: 70px; border-radius: 1.5rem; overflow: hidden; flex-shrink: 0;">
                                <img src="${apt.image || 'doctor_prakash_1772906642585.png'}" alt="${apt.doctor}" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                            <div class="dr-info-content">
                                <h3>${apt.doctor} <span class="badge-status-conf">${apt.status === 'upcoming' ? 'CONFIRMED' : apt.status.toUpperCase()}</span></h3>
                                <p class="dr-specialty">${apt.specialty}</p>
                                <p class="dr-qualif">MBBS, MD</p>
                                <div class="apt-meta-info">
                                    <span class="apt-id-text">ID: ${apt.id}</span>
                                    <span class="${statusBadgeClass}">${statusBadgeText}</span>
                                </div>
                            </div>
                        </div>
                        <div class="apt-card-right">
                            <div class="apt-datetime-display">
                                <i data-lucide="calendar"></i>
                                <div class="apt-date-text">
                                    <span>${apt.date}</span>
                                    <small>${apt.time}</small>
                                </div>
                            </div>
                            <div class="apt-actions-row">
                                ${actionsHtml}
                            </div>
                        </div>
                    </div>
                    `;
                    aptContainer.innerHTML += cardHtml;
                });
            }

            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // Bind cancel buttons
            document.querySelectorAll('.apt-cancel-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.target.getAttribute('data-id');
                    const currentApts = JSON.parse(localStorage.getItem('appointmentsData') || '[]');
                    const updatedApts = currentApts.map(a => a.id === id ? { ...a, status: 'canceled' } : a);
                    localStorage.setItem('appointmentsData', JSON.stringify(updatedApts));
                    renderAppointments('upcoming');
                    updateTabCounts();
                });
            });

            // Bind pay buttons
            document.querySelectorAll('.apt-pay-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.target.getAttribute('data-id');
                    const currentApts = JSON.parse(localStorage.getItem('appointmentsData') || '[]');
                    const updatedApts = currentApts.map(a => a.id === id ? { ...a, payStatus: 'paid' } : a);
                    localStorage.setItem('appointmentsData', JSON.stringify(updatedApts));

                    // Show beautiful toast
                    let toast = document.querySelector('.pay-toast');
                    if (!toast) {
                        toast = document.createElement('div');
                        toast.className = 'pay-toast';
                        toast.innerHTML = `
                            <div class="toast-icon">&#10003;</div>
                            <div class="toast-body">
                                <div class="toast-title">Payment Successful!</div>
                                <div class="toast-sub">Your appointment has been confirmed</div>
                            </div>
                        `;
                        document.body.appendChild(toast);
                    }
                    setTimeout(() => toast.classList.add('show'), 50);
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 3000);

                    renderAppointments('upcoming');
                });
            });

            // Bind reschedule buttons
            document.querySelectorAll('.apt-resch-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.target.getAttribute('data-id');
                    const currentApts = JSON.parse(localStorage.getItem('appointmentsData') || '[]');
                    const targetApt = currentApts.find(a => a.id === id);
                    if (targetApt) {
                        localStorage.setItem('pendingBookingDoctor', targetApt.doctor);
                        localStorage.setItem('pendingBookingSpec', targetApt.specialty);

                        // Treat the old appointment as canceled to avoid double booking
                        const updatedApts = currentApts.map(a => a.id === id ? { ...a, status: 'canceled' } : a);
                        localStorage.setItem('appointmentsData', JSON.stringify(updatedApts));

                        window.location.href = 'book-appointment.html';
                    }
                });
            });
        };

        const updateTabCounts = () => {
            const allApts = JSON.parse(localStorage.getItem('appointmentsData') || '[]');
            const counts = {
                upcoming: allApts.filter(a => a.status === 'upcoming').length,
                completed: allApts.filter(a => a.status === 'completed').length,
                canceled: allApts.filter(a => a.status === 'canceled').length
            };

            const tabs = document.querySelectorAll('.status-tab');
            tabs.forEach(tab => {
                const text = tab.innerText.toLowerCase();
                const span = tab.querySelector('span');
                if (text.includes('upcoming') && span) span.innerText = counts.upcoming;
                if (text.includes('completed') && span) span.innerText = counts.completed;
                if (text.includes('canceled') && span) span.innerText = counts.canceled;
            });
        };

        // Initialize tabs
        // Remove the original main.js tab conflict by overwriting carefully -> we just handle events directly
        const mainStatusTabs = document.querySelectorAll('.status-tab');
        if (mainStatusTabs.length > 0) {
            mainStatusTabs.forEach(tab => {
                // clone to remove prior listeners
                const newlyCloned = tab.cloneNode(true);
                tab.parentNode.replaceChild(newlyCloned, tab);
            });

            // Re-select and add proper listener
            document.querySelectorAll('.status-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    document.querySelectorAll('.status-tab').forEach(t => t.classList.remove('active'));
                    e.currentTarget.classList.add('active');

                    const text = e.currentTarget.innerText.toLowerCase();
                    let filterStatus = 'upcoming';
                    if (text.includes('completed')) filterStatus = 'completed';
                    if (text.includes('canceled')) filterStatus = 'canceled';

                    renderAppointments(filterStatus);
                });
            });
        }

        renderAppointments('upcoming');
        updateTabCounts();
    }

    // Update appointments.html 'New Booking' button
    const btnNewBooking = document.querySelector('.btn-new-booking');
    if (btnNewBooking) {
        btnNewBooking.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'find-doctor.html';
        });
    }
});
