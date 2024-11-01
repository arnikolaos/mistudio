document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Send form data through EmailJS
        emailjs.sendForm('mistudio', 'mitemplate', this)
            .then(function() {
                alert('Message sent successfully!');
            }, function(error) {
                alert('Failed to send message. Please try again later.');
                console.error('Failed...', error);
            });
    });
});
