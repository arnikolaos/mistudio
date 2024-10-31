let currentSlide = 0;

function openSlider() {
    currentSlide = 0; // Start with the first image
    document.getElementById('sliderModal').style.display = 'block';
    showSlide(currentSlide); // Show the first slide
}

// Function to change slides
function changeSlide(n) {
    showSlide(currentSlide += n);
}

// Function to show the current slide
function showSlide(n) {
    const slides = document.querySelectorAll('.slider-images img');
    
    if (n >= slides.length) currentSlide = 0; // Loop back to the first slide
    if (n < 0) currentSlide = slides.length - 1; // Loop to the last slide
    
    slides.forEach((slide, index) => {
        slide.style.display = (index === currentSlide) ? 'block' : 'none';
    });
}

// Function to close the slider
function closeSlider() {
    document.getElementById('sliderModal').style.display = 'none';
}
