// List of images for each project
const projects = [
    {
        title: "KL Villa",
        images: [
            "multimedia/gallery/killini villa 110/villa kl5.jpeg",
            "multimedia/gallery/killini villa 110/villa kl29.jpeg",
            "multimedia/gallery/killini villa 110/villa kl25.jpeg"
        ]
    },
    {
        title: "Brick House",
        images: [
            "multimedia/gallery/brick house/house out day 2.jpg",
            "multimedia/gallery/brick house/house1.jpg",
            "multimedia/gallery/brick house/house2.jpg"
        ]
    },
    {
        title: "Kanso Haus",
        images: [
            "multimedia/gallery/kanso haus 簡素/japbath4.jpeg"
        ]
    },
    {
        title: "Kalino Residence",
        images: [
            "multimedia/gallery/kalino villa/fireplace1.jpeg"
        ]
    },
    {
        title: "Ritso Resort",
        images: [
            "multimedia/gallery/ritso/ RITSO Resort_By MI Architects 17.jpg"
        ]
    },
    {
        title: "Domaine des Palmes",
        images: [
            "multimedia/gallery/palm villa/villa palms4.jpeg"
        ]
    },
    {
        title: "Cavaro Estate",
        images: [
            "multimedia/gallery/kalino villa/kalinovilla0012.jpeg"
        ]
    },
    {
        title: "Sculptural Ceiling Building",
        images: [
            "multimedia/gallery/sculpture ceiling/Building Sculptural Ceiling_By MI Architects 19.jpg"
        ]
    },
    {
        title: "LEB Seaside Villa",
        images: [
            "multimedia/gallery/killini villa big/ilia_villa1.jpg"
        ]
    },
    {
        title: "Beauty Salon",
        images: [
            "multimedia/gallery/co-working moscow/00032.jpeg"
        ]
    },
    {
        title: "Serenity Circle Garden",
        images: [
            "multimedia/gallery/serenity circle garden/tower_meditation-1 2.jpeg"
        ]
    },
    {
        title: "Modern Apartment",
        images: [
            "multimedia/gallery/appartment dinning sofa/dining and sofa3.jpeg"
        ]
    },
    {
        title: "Apartment Renovation Voula",
        images: [
            "multimedia/gallery/renovation voula/apparment renovation voula.jpg"
        ]
    },
    {
        title: "Infinity Estate",
        images: [
            "multimedia/gallery/infinity villa/infinite_villa.2457.jpeg"
        ]
    }
];

let currentSlideIndex = 0;

function openSlider(projectIndex) {
    const sliderModal = document.getElementById('sliderModal');
    const sliderImages = document.getElementById('sliderImages');
    sliderImages.innerHTML = '';

    // Load images for the selected project
    projects[projectIndex].images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.className = index === 0 ? 'active' : '';
        sliderImages.appendChild(img);
    });

    currentSlideIndex = 0;
    sliderModal.style.display = 'block';
}

function closeSlider() {
    document.getElementById('sliderModal').style.display = 'none';
}

function changeSlide(direction) {
    const sliderImages = document.getElementById('sliderImages').children;
    sliderImages[currentSlideIndex].classList.remove('active');

    currentSlideIndex += direction;
    if (currentSlideIndex < 0) currentSlideIndex = sliderImages.length - 1;
    if (currentSlideIndex >= sliderImages.length) currentSlideIndex = 0;

    sliderImages[currentSlideIndex].classList.add('active');
}

// Close the slider when clicking outside the image area (background)
document.getElementById('sliderModal').addEventListener('click', function(event) {
    // Check if the clicked area is the background and not the image or close button
    if (event.target === this) {
        closeSlider();  // Close the modal if clicked outside the image
    }
});

// Listen for keydown events to enable left and right navigation with arrow keys
document.addEventListener('keydown', function(event) {
    // Check if the modal is open
    const sliderModal = document.getElementById('sliderModal');
    if (sliderModal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            // Navigate to the previous slide
            changeSlide(-1);
        } else if (event.key === 'ArrowRight') {
            // Navigate to the next slide
            changeSlide(1);
        }
    }
});

// Listen for the Escape key to close the slider
document.addEventListener('keydown', function(event) {
    const sliderModal = document.getElementById('sliderModal');
    if (event.key === 'Escape' && sliderModal.style.display === 'block') {
        closeSlider();  // Close the modal if the Escape key is pressed
    }
});

// List of images for each project
const projects = [
    {
        title: "KL Villa",
        images: [
            "multimedia/gallery/killini villa 110/villa kl5.jpeg",
            "multimedia/gallery/killini villa 110/villa kl29.jpeg",
            "multimedia/gallery/killini villa 110/villa kl25.jpeg"
        ]
    },
    {
        title: "Brick House",
        images: [
            "multimedia/gallery/brick house/house out day 2.jpg",
            "multimedia/gallery/brick house/house1.jpg",
            "multimedia/gallery/brick house/house2.jpg"
        ]
    },
    // Add other projects here...
];

let currentSlideIndex = 0;

function openSlider(projectIndex) {
    const sliderModal = document.getElementById('sliderModal');
    const sliderImages = document.getElementById('sliderImages');
    sliderImages.innerHTML = '';

    // Load images for the selected project
    projects[projectIndex].images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.className = index === 0 ? 'active' : '';
        sliderImages.appendChild(img);
    });

    currentSlideIndex = 0;
    sliderModal.style.display = 'block';
}

function closeSlider() {
    document.getElementById('sliderModal').style.display = 'none';
}

function changeSlide(direction) {
    const sliderImages = document.getElementById('sliderImages').children;
    
    // Remove 'active' and jitter from the previous image
    sliderImages[currentSlideIndex].classList.remove('active', 'jitter');
    
    // Move to the next or previous slide
    currentSlideIndex += direction;
    if (currentSlideIndex < 0) currentSlideIndex = sliderImages.length - 1;
    if (currentSlideIndex >= sliderImages.length) currentSlideIndex = 0;

    // Add 'active' to the new image
    sliderImages[currentSlideIndex].classList.add('active');
    
    // Add jitter effect to the new image
    sliderImages[currentSlideIndex].classList.add('jitter');
}

// Close the slider when clicking outside the image area (background)
document.getElementById('sliderModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeSlider();  // Close the modal if clicked outside the image
    }
});

// Listen for keydown events to enable left and right navigation with arrow keys
document.addEventListener('keydown', function(event) {
    const sliderModal = document.getElementById('sliderModal');
    if (sliderModal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            changeSlide(-1); // Navigate to the previous slide
        } else if (event.key === 'ArrowRight') {
            changeSlide(1); // Navigate to the next slide
        } else if (event.key === 'Escape') {
            closeSlider(); // Close the slider with the Escape key
        }
    }
});

// Listen for the Escape key to close the slider
document.addEventListener('keydown', function(event) {
    const sliderModal = document.getElementById('sliderModal');
    if (event.key === 'Escape' && sliderModal.style.display === 'block') {
        closeSlider();  // Close the modal if the Escape key is pressed
    }
});

