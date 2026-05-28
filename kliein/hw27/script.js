const sliderContainer = document.querySelector('.slider-container');
const sliderTrack = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playBtn = document.getElementById('playBtn');
const playPauseBtn = document.getElementById('playPauseBtn');
const dotsContainer = document.getElementById('dotsContainer');

let currentIndex = 0;
let isPlaying = false;
let intervalId;

// Initialize the slider
function initSlider() {
    updateSlider();
    updateDots();
}

// Update the slider position
function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Update the active dot
function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Move to the next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
    updateDots();
}

// Move to the previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
    updateDots();
}

// Play the slider
function playSlider() {
    if (!isPlaying) {
        isPlaying = true;
        playBtn.style.display = 'none';
        playPauseBtn.style.display = 'block';
        intervalId = setInterval(nextSlide, 3000);
    }
}

// Pause the slider
function pauseSlider() {
    if (isPlaying) {
        isPlaying = false;
        playBtn.style.display = 'block';
        playPauseBtn.style.display = 'none';
        clearInterval(intervalId);
    }
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
playBtn.addEventListener('click', playSlider);
playPauseBtn.addEventListener('click', pauseSlider);

// Dot navigation
dotsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dot')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        currentIndex = index;
        updateSlider();
        updateDots();
    }
});

// Initialize the slider
initSlider();