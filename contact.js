// Contact Form For EmailJS

document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Send form using EmailJS
        emailjs.sendForm('contact_service', 'contact_form', contactForm)
            .then(function() {
                alert('Message sent successfully!');
            }, function(error) {
                alert('Failed to send message. Please try again later.');
                console.error('Failed...', error);
            });
    });
});
