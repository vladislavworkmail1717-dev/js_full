const slides = [
  "https://picsum.photos/id/1015/600/300",
  "https://picsum.photos/id/1016/600/300",
  "https://picsum.photos/id/1018/600/300",
  "https://picsum.photos/id/1020/600/300",
];

function Slider(config) {
  this.slides = config.slides;
  this.interval = config.interval || 3000;
  this.currentSlide = 0;
  this.isPlaying = true;

  this.container = document.getElementById("slider-container");

  this.createSlider();

  this.startAutoPlay();
}

Slider.prototype.createSlider = function () {
  this.container.innerHTML = `
    <div class="slider">
      <button id="prev">←</button>
      <img id="slide">
      <button id="next">→</button>
      <button id="pause">Pause</button>
      <div id="dots"></div>
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

  document.getElementById("pause").addEventListener("click", () => {
    this.isPlaying = !this.isPlaying;
  });

  this.createDots();
};

Slider.prototype.showSlide = function () {
  this.slide.src = this.slides[this.currentSlide];

  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === this.currentSlide);
  });
};

Slider.prototype.nextSlide = function () {
  this.currentSlide++;

  if (this.currentSlide >= this.slides.length) {
    this.currentSlide = 0;
  }

  this.showSlide();
};

Slider.prototype.prevSlide = function () {
  this.currentSlide--;

  if (this.currentSlide < 0) {
    this.currentSlide = this.slides.length - 1;
  }

  this.showSlide();
};

Slider.prototype.startAutoPlay = function () {
  setInterval(() => {
    if (this.isPlaying) {
      this.nextSlide();
    }
  }, this.interval);
};

Slider.prototype.createDots = function () {
  const dots = document.getElementById("dots");

  this.slides.forEach((_, index) => {
    const dot = document.createElement("span");

    dot.classList.add("dot");

    dot.addEventListener("click", () => {
      this.currentSlide = index;
      this.showSlide();
    });

    dots.appendChild(dot);
  });
};

function TouchSlider(config) {
  Slider.call(this, config);
}

TouchSlider.prototype = Object.create(Slider.prototype);

TouchSlider.prototype.constructor = TouchSlider;

new TouchSlider({
  slides,
  interval: 3000,
});
