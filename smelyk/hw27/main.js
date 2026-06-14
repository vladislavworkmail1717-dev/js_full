
// variables 
const slides = document.querySelectorAll(".slide-items img");
const indicators = document.querySelectorAll(".slider-inicators span");
let currentSlideIndex = 0;
let intervalId = null;
let playBtn = document.querySelectorAll(".play-btn");
let pauseBtn = document.querySelectorAll(".pause-btn");

let newX = 0,
  newY = 0,
  startX = 0,
  startY = 0;


//event listeneres
document.addEventListener("DOMContentLoaded", initializeSlider);

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowRight") {
    nextSlide();
  } else if (event.key === "ArrowLeft") {
    previousSlide();
  }
});

slides.forEach((slide) =>
  slide.addEventListener("mousedown", (event) => {
    startX = event.clientX;
    startY = event.clientY;
  }),
);

slides.forEach((slide) => slide.addEventListener("mouseup", dragSlideSwitch));


//functions 
function initializeSlider() {
  if (slides.length > 0) {
    slides[currentSlideIndex].classList.add("displaySlide");
    playBtn[0].style.display = "none";
    autoScroll();

    for (indicator of indicators) {
      indicator.style.width = "8px";
    }
  }
}

function moveTo(index) {
  currentSlideIndex = index;
  showSlide(index);
}

function showSlide(index) {
  if (index >= slides.length) {
    currentSlideIndex = 0;
  } else if (index < 0) {
    currentSlideIndex = slides.length - 1;
  }
  slides.forEach((slide) => slide.classList.remove("displaySlide"));
  slides[currentSlideIndex].classList.add("displaySlide");

  indicators.forEach((indicator) => (indicator.style.width = "8px"));
  indicators[currentSlideIndex].style.width = "18px";
}

function previousSlide() {
  currentSlideIndex--;
  showSlide(currentSlideIndex);
}

function nextSlide() {
  currentSlideIndex++;
  showSlide(currentSlideIndex);
}

function autoScroll() {
  intervalId = setInterval(nextSlide, 10000);
}

function playSlides() {
  autoScroll();
  pauseBtn[0].style.display = "block";
  playBtn[0].style.display = "none";
}

function pauseSlides() {
  clearInterval(intervalId);
  pauseBtn[0].style.display = "none";
  playBtn[0].style.display = "block";
}

function dragSlideSwitch(event) {
  newX = event.clientX;
  newY = event.clientY;

  if (startX - event.clientX > 0) {
    previousSlide();
  } else if (startX - event.clientX < 0) {
    nextSlide();
  }
}