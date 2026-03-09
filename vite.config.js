const { defineConfig } = require('vite');
const { resolve } = require('path');

module.exports = defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'login.html'),
                signup: resolve(__dirname, 'signup.html'),
                dashboard: resolve(__dirname, 'dashboard.html'),
                findDoctor: resolve(__dirname, 'find-doctor.html'),
                bookAppointment: resolve(__dirname, 'book-appointment.html'),
                bookingSuccess: resolve(__dirname, 'booking-success.html'),
                appointments: resolve(__dirname, 'appointments.html'),
                medicalRecords: resolve(__dirname, 'medical-records.html'),
                otp: resolve(__dirname, 'otp.html'),
                profile: resolve(__dirname, 'profile.html'),
            }
        }
    }
});
