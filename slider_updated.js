
function openSlider(projectId) {
    const projects = {'killiniVilla': ['multimedia/gallery/killini villa 110/villa kl5.png', 'multimedia/gallery/killini villa 110/villa kl29.png'], 'brickHouse': ['multimedia/gallery/brick house/house out day 2.jpg', 'multimedia/gallery/brick house/house interior.jpg'], 'kansoHaus': ['multimedia/gallery/kanso haus 簡素/japbath4.jpeg', 'multimedia/gallery/kanso haus 簡素/interior.jpg']};
    const sliderContainer = document.querySelector(".slider-images");
    sliderContainer.innerHTML = ""; // Clear existing images

    if (projects[projectId]) {
        projects[projectId].forEach((src) => {
            const img = document.createElement("img");
            img.src = src;
            img.style.display = "none"; // Initially hidden
            sliderContainer.appendChild(img);
        });

        // Show the slider
        document.getElementById("sliderModal").style.display = "block";
    } else {
        console.error("Project not found:", projectId);
    }
}

function closeSlider() {
    document.getElementById("sliderModal").style.display = "none";
}

