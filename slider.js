// This function is called when a portfolio item is clicked
function openSlider(element) {
    // Get the images for the clicked portfolio item from the data-images attribute
    const images = JSON.parse(element.getAttribute('data-images'));

    // Get the container where the images will be displayed in the slider
    const sliderContainer = document.querySelector(".slider-images");
    sliderContainer.innerHTML = ""; // Clear any existing images

    // Add each image to the slider container
    images.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        img.style.display = "none"; // Initially hidden (will be controlled in the slider logic)
        img.onload = () => {
            img.style.display = "block"; // Display image once it's loaded
        };
        img.onerror = () => {
            img.style.display = "none"; // Hide broken images if they fail to load
            console.error("Image failed to load:", src);
        };
        sliderContainer.appendChild(img);
    });

    // Initialize the first image to be shown
    currentSlide = 0; // Reset the current slide index to the first image
    showSlide(currentSlide);

    // Show the slider modal and the arrows
    document.getElementById("sliderModal").style.display = "flex";
    document.querySelector(".prev").style.display = "block";
    document.querySelector(".next").style.display = "block"; // Ensure arrows are visible immediately
}

// This function is called to close the slider
function closeSlider() {
    document.getElementById("sliderModal").style.display = "none";
}

// Optional: Add slider navigation functionality
let currentSlide = 0;

function changeSlide(n) {
    const slides = document.querySelectorAll(".slider-images img");

    if (slides.length > 0) {
        currentSlide += n;

        // Loop back to the first or last slide depending on the direction
        if (currentSlide < 0) {
            currentSlide = slides.length - 1; // Loop back to the last slide
        } else if (currentSlide >= slides.length) {
            currentSlide = 0; // Loop back to the first slide
        }

        showSlide(currentSlide); // Show the updated slide
    }
}

// Function to show the slide based on the current index
function showSlide(index) {
    const slides = document.querySelectorAll(".slider-images img");

    // Hide all slides
    slides.forEach(slide => {
        slide.style.display = "none";
    });

    // Display the current slide
    if (slides[index]) {
        slides[index].style.display = "block";
    }
}

// Initialize the slider by displaying the first image when opened
document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".slider-images img");
    if (slides.length > 0) {
        slides[0].style.display = "block"; // Show the first image by default
    }
});
