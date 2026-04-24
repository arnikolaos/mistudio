document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let form = this;

    // ensure site name exists
    let existing = form.querySelector('input[name="site_name"]');
    if (!existing) {
        let input = document.createElement("input");
        input.type = "hidden";
        input.name = "site_name";
        form.appendChild(input);
        existing = input;
    }
    existing.value = window.location.hostname;

    // 1. send to admin
    emailjs.sendForm("mistudio", "mitemplate", form)
        .then(function (response) {
            console.log("ADMIN SENT!", response.status, response.text);

            // 2. send auto-reply ONLY after admin succeeds
            emailjs.sendForm("mistudio", "client_reply", form)
                .then(function (response) {
                    console.log("CLIENT SENT!", response.status, response.text);
                })
                .catch(function (error) {
                    console.log("CLIENT FAILED", error);
                });

        })
        .catch(function (error) {
            console.log("ADMIN FAILED", error);
        });

    alert("Message sent successfully!");
});