const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

const dotsContainer = document.querySelector('.dots');
const pauseBtn = document.querySelector('.pause-btn');

let currentIndex = 0;
let autoSlide;
let isPlaying = true;

const totalSlides = slide.length;



slide.forEach((_, index) => {

    const dot = document.createElement('div');
    dot.classList.add('dot');

    if(index === 0){
        dot.classList.add('active');
    }

    dot.addEventListener('click', () => {
        goToSlide(index);
    });

    dotsContainer.appendChild(dot);

});

const dots = document.querySelectorAll('.dot');



function updateSlider() {

    slides.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');

}


function goToSlide(index) {

    currentIndex = index;

    if(currentIndex >= totalSlides){
        currentIndex = 0;
    }

    if(currentIndex < 0){
        currentIndex = totalSlides - 1;
    }

    updateSlider();

}



function nextSlide() {
    currentIndex++;
    goToSlide(currentIndex);
}

function prevSlide() {
    currentIndex--;
    goToSlide(currentIndex);
}



nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);


function startAutoSlide() {

    autoSlide = setInterval(() => {
        nextSlide();
    }, 3000);

}

function stopAutoSlide() {
    clearInterval(autoSlide);
}

startAutoSlide();


pauseBtn.addEventListener('click', () => {

    if(isPlaying){

        stopAutoSlide();
        pauseBtn.textContent = 'Play';

    } else {

        startAutoSlide();
        pauseBtn.textContent = 'Pause';

    }

    isPlaying = !isPlaying;

});


document.addEventListener('keydown', (e) => {

    if(e.key === 'ArrowRight'){
        nextSlide();
    }

    if(e.key === 'ArrowLeft'){
        prevSlide();
    }

});


let startX = 0;
let endX = 0;
let isDragging = false;

function handleStart(x) {
    startX = x;
    isDragging = true;
}

function handleMove(x) {

    if(!isDragging) return;

    endX = x;

}

function handleEnd() {

    if(!isDragging) return;

    const diff = startX - endX;

    if(diff > 50){
        nextSlide();
    }

    if(diff < -50){
        prevSlide();
    }

    isDragging = false;

}

slides.addEventListener('touchstart', (e) => {
    handleStart(e.touches[0].clientX);
});

slides.addEventListener('touchmove', (e) => {
    handleMove(e.touches[0].clientX);
});

slides.addEventListener('touchend', handleEnd);



slides.addEventListener('mousedown', (e) => {
    handleStart(e.clientX);
});

slides.addEventListener('mousemove', (e) => {
    handleMove(e.clientX);
});

slides.addEventListener('mouseup', handleEnd);

slides.addEventListener('mouseleave', handleEnd);