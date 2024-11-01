document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents page reload

    // Collect form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Log to check values before sending
    console.log('Sending message:', { name, email, message });

    // Replace 'mistudio', 'mitemplate' with your actual service ID and template ID
    emailjs.send('mistudio', 'mitemplate', {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(function(response) {
        console.log('Message sent successfully!', response);
        alert('Message sent successfully!'); // Display confirmation
    })
    .catch(function(error) {
        console.error('Failed to send message:', error);
        alert('Failed to send message. Please try again later.');
    });
});
