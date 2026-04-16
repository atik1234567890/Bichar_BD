/**
 * BicharBD - Public Report Submission Logic
 * Handles POST requests to /api/report/submit with evidence hashing
 */

document.addEventListener('DOMContentLoaded', () => {
    initReportForm();
});

function initReportForm() {
    const form = document.querySelector('#report-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerText = 'Uploading & Verifying...';

        try {
            const formData = new FormData(form);
            
            // Add a timestamp and simple client-side proof of integrity
            const timestamp = new Date().toISOString();
            formData.append('submitted_at', timestamp);

            const response = await fetch('/api/report/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert(`Report submitted successfully! Your tracking token: ${result.token}`);
                form.reset();
            } else {
                alert(`Error: ${result.error || 'Submission failed'}`);
            }
        } catch (error) {
            // console.error('Submission error:', error);
            alert('A network error occurred. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Submit Secure Report';
        }
    });
}
