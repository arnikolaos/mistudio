
function openSlider(projectId) {
    const projects = {
        killiniVilla: [
            "multimedia/gallery/killini villa 110/villa kl5.png",
            "multimedia/gallery/killini villa 110/villa kl29.png"
        ],
        brickHouse: [
            "multimedia/gallery/brick house/house out day 2.jpg",
            "multimedia/gallery/brick house/house interior.jpg"
        ]
    };

    const sliderContainer = document.querySelector(".slider-images");
    sliderContainer.innerHTML = "";

    if (projects[projectId]) {
        projects[projectId].forEach((src) => {
            const img = document.createElement("img");
            img.src = src;
            img.style.display = "none";
            sliderContainer.appendChild(img);
        });

        document.getElementById("sliderModal").style.display = "block";
    } else {
        console.error("Project not found:", projectId);
    }
}

function closeSlider() {
    document.getElementById("sliderModal").style.display = "none";
}
