// List of images for each project
const projects = [
    {
        title: "KL Villa",
        images: [
            "multimedia/gallery/killini villa 110/villa kl5.jpg",
            "multimedia/gallery/killini villa 110/villa kl29.jpg",
            "multimedia/gallery/killini villa 110/villa kl28.jpg",
            "multimedia/gallery/killini villa 110/villa kl9.jpg",
            "multimedia/gallery/killini villa 110/villa kl17.jpg",
            "multimedia/gallery/killini villa 110/villa kl25.jpg",
            "multimedia/gallery/killini villa 110/villa kl23.jpg",
            "multimedia/gallery/killini villa 110/villa kl10.jpg"
        ]
    },
    {
        title: "Brick House",
        images: [
            "multimedia/gallery/brick house/house out day 2.jpg",
            "multimedia/gallery/brick house/brick house1.jpg",
            "multimedia/gallery/brick house/brick house2.jpg"
        ]
    },
    {
        title: "Kanso Haus",
        images: [
            "multimedia/gallery/kanso haus 簡素/japbath4.jpeg",
            "multimedia/gallery/kanso haus 簡素/japbath kanso.jpeg",
            "multimedia/gallery/kanso haus 簡素/japbath3.jpeg"
        ]
    },
    {
        title: "Kalino Residence",
        images: [
            "multimedia/gallery/kalino villa/fireplace1.jpeg",
            "multimedia/gallery/kalino villa/kitchen kalino.jpeg",
            "multimedia/gallery/kalino villa/kitchen kalino night.jpeg",
            "multimedia/gallery/kalino villa/kitchen1.jpeg"
        ]
    },
    {
        title: "Ritso Resort",
        images: [
            "multimedia/gallery/ritso/ritso resort1.jpg",
            "multimedia/gallery/ritso/ritso resort5.jpg",
            "multimedia/gallery/ritso/ritso resort11.jpg",
            "multimedia/gallery/ritso/ritso resort7.jpg",
            "multimedia/gallery/ritso/ritso resort9.jpg"
        ]
    },
    {
        title: "Domaine des Palmes",
        images: [
            "multimedia/gallery/palm villa/villa palms4.jpeg",
            "multimedia/gallery/palm villa/villa palms2.jpeg",
            "multimedia/gallery/palm villa/villa palms3 2.jpeg"
        ]
    },
    {
        title: "Cavaro Estate",
        images: ["multimedia/gallery/kalino villa/kalinovilla0012.jpeg"]
    },
    {
        title: "Sculptural Ceiling Building",
        images: [
            "multimedia/gallery/sculpture ceiling/Building Sculptural Ceiling_By MI Architects 19.jpg",
            "multimedia/gallery/sculpture ceiling/sculptural_ceiling4.jpg",
            "multimedia/gallery/sculpture ceiling/sculptural_ceiling5.jpg",
            "multimedia/gallery/sculpture ceiling/sculptural_ceiling3.jpg",
            "multimedia/gallery/sculpture ceiling/sculptural_ceiling_presentation.jpg"
        ]
    },
    {
        title: "LEB Seaside Villa",
        images: [
            "multimedia/gallery/killini villa big/ilia_villa1.jpg",
            "multimedia/gallery/killini villa big/ilia_villa2.jpg",
            "multimedia/gallery/killini villa big/ilia_villa3.jpg",
            "multimedia/gallery/killini villa big/ilia_villa5.jpeg"
        ]
    },
    {
        title: "Beauty Salon",
        images: [
            "multimedia/gallery/co-working moscow/00032.jpeg",
            "multimedia/gallery/co-working moscow/coworkingsalon1.jpeg",
            "multimedia/gallery/co-working moscow/coworking salon3.jpeg",
            "multimedia/gallery/co-working moscow/coworkingsalon2.jpeg"
        ]
    },
    {
        title: "Serenity Circle Garden",
        images: [
            "multimedia/gallery/serenity circle garden/tower_meditation-1 2.jpeg",
            "multimedia/gallery/serenity circle garden/tower_meditation-8.jpeg"
        ]
    },
    {
        title: "Modern Apartment",
        images: ["multimedia/gallery/appartment dinning sofa/dining and sofa3.jpeg"]
    },
    {
        title: "Apartment Renovation Voula",
        images: ["multimedia/gallery/renovation voula/apparment renovation voula.jpg"]
    },
    {
        title: "Infinity Estate",
        images: ["multimedia/gallery/infinity villa/infinite_villa.2457.jpeg"]
    },
    {
        title: "Dream Villas",
        images: [
            "multimedia/gallery/dream villas/dream villas2.jpg",
            "multimedia/gallery/dream villas/dream villas4.jpg",
            "multimedia/gallery/dream villas/dream villas3.jpg",
            "multimedia/gallery/dream villas/dream villas1.jpg"
        ]
    },
    {
        title: "Casa Sorgente",
        images: ["multimedia/gallery/Casa Sorgente/hqsorgente7-HR.jpg"]
    }
];

let currentSlideIndex = 0;

function openSlider(projectIndex) {
    const sliderModal = document.getElementById("sliderModal");
    const sliderImages = document.getElementById("sliderImages");
    sliderImages.innerHTML = "";

    // Load images for the selected project
    projects[projectIndex].images.forEach((image, index) => {
        const img = document.createElement("img");
        img.src = image;
        img.className = index === 0 ? "active" : "";
        sliderImages.appendChild(img);
    });

    currentSlideIndex = 0;
    sliderModal.style.display = "block";
}

function closeSlider() {
    document.getElementById("sliderModal").style.display = "none";
}
//Jitter Effect Change Slider
function changeSlide(direction) {
    const sliderImages = document.getElementById("sliderImages").children;

    // Remove 'active' and jitter from the current image
    sliderImages[currentSlideIndex].classList.remove("active", "jitter");

    // Move to the next or previous slide
    currentSlideIndex += direction;
    if (currentSlideIndex < 0) currentSlideIndex = sliderImages.length - 1;
    if (currentSlideIndex >= sliderImages.length) currentSlideIndex = 0;

    // Add 'active' to the new image
    sliderImages[currentSlideIndex].classList.add("active");

    // Add jitter effect to the new image
    sliderImages[currentSlideIndex].classList.add("jitter");
}

// Default change slides, no effects!
/*
function changeSlide(direction) {
    const sliderImages = document.getElementById('sliderImages').children;
    sliderImages[currentSlideIndex].classList.remove('active');

    currentSlideIndex += direction;
    if (currentSlideIndex < 0) currentSlideIndex = sliderImages.length - 1;
    if (currentSlideIndex >= sliderImages.length) currentSlideIndex = 0;

    sliderImages[currentSlideIndex].classList.add('active');
}
*/

// Close the slider when clicking outside the image area (background)
document.getElementById("sliderModal").addEventListener("click", function (event) {
    // Check if the clicked area is the background and not the image or close button
    if (event.target === this) {
        closeSlider(); // Close the modal if clicked outside the image
    }
});

// Listen for keydown events to enable left and right navigation with arrow keys and escape key to close
document.addEventListener("keydown", function (event) {
    const sliderModal = document.getElementById("sliderModal");

    // Ensure modal is open before responding to key events
    if (sliderModal.style.display === "block") {
        if (event.key === "ArrowLeft") {
            // Navigate to the previous slide
            changeSlide(-1);
        } else if (event.key === "ArrowRight") {
            // Navigate to the next slide
            changeSlide(1);
        } else if (event.key === "Escape") {
            // Close the slider when the Escape key is pressed
            closeSlider();
        }
    }
});