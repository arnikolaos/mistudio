document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevents page reload

        // Collect form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Log values to verify data collection
        console.log("Form data collected:", { name, email, message });

        // Use EmailJS to send the email
        emailjs.send("mistudio", "mitemplate", {
            from_name: name,
            from_email: email,
            message: message
        })
        .then(function(response) {
            console.log("Message sent successfully!", response);
            alert("Message sent successfully!"); // Display success confirmation
        })
        .catch(function(error) {
            console.error("Failed to send message:", error);
            alert("Failed to send message. Please try again later.");
        });
    });
});
