const slides = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
  "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
];
let currentSlide = 0;
let isPlaying = true;

const slide = document.getElementById("slide");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const pauseBtn = document.getElementById("pause");

function showSlide() {
  slide.src = slides[currentSlide];
}

function nextSlide() {
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide();
}

function prevSlide() {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  showSlide();
}

nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", prevSlide);

pauseBtn.addEventListener("click", () => {
  isPlaying = !isPlaying;

  pauseBtn.textContent = isPlaying ? "Pause" : "Resume";
});

setInterval(() => {
  if (isPlaying) {
    nextSlide();
  }
}, 3000);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    nextSlide();
  }

  if (event.key === "ArrowLeft") {
    prevSlide();
  }
});

showSlide();
