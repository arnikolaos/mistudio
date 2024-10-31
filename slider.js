let currentSlide = 0;

// Function to open the slider and start from the specified image
function openSlider(slideIndex) {
    currentSlide = slideIndex; // Set the starting slide
    document.getElementById('sliderModal').style.display = 'block';
    showSlide(currentSlide); // Show the correct slide
}

// Function to change slides (next/prev)
function changeSlide(n) {
    showSlide(currentSlide += n);
}

// Function to show the current slide
function showSlide(n) {
    const slides = document.querySelectorAll('.slider-images img');
    
    // Loop slides if index is out of bounds
    if (n >= slides.length) currentSlide = 0; 
    if (n < 0) currentSlide = slides.length - 1;
    
    // Hide all slides and show the current one
    slides.forEach((slide, index) => {
        slide.style.display = (index === currentSlide) ? 'block' : 'none';
    });
}

// Function to close the slider
function closeSlider() {
    document.getElementById('sliderModal').style.display = 'none';
}
