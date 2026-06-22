// ===== HAMBURGER MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked (on mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== CONTACT FORM =====
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const name = document.getElementById('name').value.trim();

        formStatus.textContent = '⏳ Sending your message...';
        formStatus.style.color = '#B5838D';

        try {
            const response = await fetch('https://formspree.io/f/xnjkqbao', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = '✅ Thanks ' + name + '! Your message was sent successfully.';
                formStatus.style.color = '#50C878';
                form.reset();
            } else {
                const errorData = await response.json();
                formStatus.textContent = '❌ Oops! Something went wrong. Please try again later.';
                formStatus.style.color = '#FF6B6B';
                console.error('Formspree error:', errorData);
            }
        } catch (error) {
            formStatus.textContent = '❌ Network error. Please check your connection.';
            formStatus.style.color = '#FF6B6B';
            console.error('Fetch error:', error);
        }
    });
}

// ===== DYNAMIC YEAR IN FOOTER =====
document.addEventListener('DOMContentLoaded', () => {
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        const year = new Date().getFullYear();
        footerYear.textContent = footerYear.textContent.replace('2026', year);
    }
});

console.log('🚀 Website loaded successfully!');
