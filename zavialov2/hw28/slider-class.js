const slides = [
  "https://picsum.photos/id/1015/600/300",
  "https://picsum.photos/id/1016/600/300",
  "https://picsum.photos/id/1018/600/300",
  "https://picsum.photos/id/1020/600/300",
];

class Slider {
  constructor(config) {
    this.slides = config.slides;
    this.interval = config.interval || 3000;

    this.currentSlide = 0;

    this.isPlaying = true;

    this.container = document.getElementById("slider-container");

    this.createSlider();

    this.startAutoPlay();
  }

  createSlider() {
    this.container.innerHTML = `
      <div class="slider">
        <button id="prev">←</button>
        <img id="slide">
        <button id="next">→</button>
        <button id="pause">Pause</button>
      </div>
    `;

    this.slide = document.getElementById("slide");

    this.showSlide();

    document
      .getElementById("next")
      .addEventListener("click", () => this.nextSlide());

    document
      .getElementById("prev")
      .addEventListener("click", () => this.prevSlide());
  }

  showSlide() {
    this.slide.src = this.slides[this.currentSlide];
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;

    this.showSlide();
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;

    this.showSlide();
  }

  startAutoPlay() {
    setInterval(() => {
      if (this.isPlaying) {
        this.nextSlide();
      }
    }, this.interval);
  }
}

class AdvancedSlider extends Slider {
  constructor(config) {
    super(config);

    this.enableHoverPause();
  }

  enableHoverPause() {
    this.container.addEventListener("mouseenter", () => {
      this.isPlaying = false;
    });

    this.container.addEventListener("mouseleave", () => {
      this.isPlaying = true;
    });
  }
}

new AdvancedSlider({
  slides,
  interval: 3000,
});
