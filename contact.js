document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    
    // get site name and send it to know which site is sending
    let existing = this.querySelector('input[name="site_name"]');
    if (!existing) {
        let input = document.createElement("input");
        input.type = "hidden";
        input.name = "site_name";
        this.appendChild(input);
        existing = input;
    }
    existing.value = window.location.hostname;

    emailjs.sendForm("mistudio", "mitemplate", this).then(
        function (response) {
            console.log("SUCCESS!", response.status, response.text);
            alert("Message sent successfully!");
        },
        function (error) {
            console.log("FAILED...", error);
            alert("Failed to send message. Please try again later.");
        }
    );
});