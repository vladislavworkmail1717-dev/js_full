class BaseSlider {
  // Приватні властивості (інкапсуляція)
  #currentIndex = 0;

  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.track = this.container.querySelector('.slider-track');
    this.slides = this.container.querySelectorAll('.slide');
    
    this.init();
  }

  // Геттер для безпечного доступу до приватного індексу
  get currentIndex() {
    return this.#currentIndex;
  }

  init() {
    // Стрілочні функції зберігають контекст `this` класу
    this.container.querySelector('.prev').addEventListener('click', () => this.prev());
    this.container.querySelector('.next').addEventListener('click', () => this.next());
    this.render();
  }

  move(direction) {
    this.#currentIndex += direction;
    if (this.#currentIndex >= this.slides.length) this.#currentIndex = 0;
    if (this.#currentIndex < 0) this.#currentIndex = this.slides.length - 1;
    this.render();
  }

  next() { this.move(1); }
  prev() { this.move(-1); }

  render() {
    this.track.style.transform = `translateX(${this.#currentIndex * -100}%)`;
  }
}

///////////////////

// Автоматичний слайдер успадковує все від BaseSlider
class AutoplaySlider extends BaseSlider {
  constructor(containerId, interval = 3000) {
    // Виклик конструктора батьківського класу (обов'язково)
    super(containerId); 
    this.interval = interval;
    this.timer = null;

    this.startAutoplay();
    this.initHoverEvents();
  }

  startAutoplay() {
    // Викликає метод next() з батьківського класу кожні X мс
    this.timer = setInterval(() => this.next(), this.interval);
  }

  stopAutoplay() {
    clearInterval(this.timer);
  }

  // Додавання нової поведінки для взаємодії з користувачем
  initHoverEvents() {
    this.container.addEventListener('mouseenter', () => this.stopAutoplay());
    this.container.addEventListener('mouseleave', () => this.startAutoplay());
  }

  // Поліморфізм: Перевизначення (override) батьківського методу render
  render() {
    // Викликаємо базовий рендер батька
    super.render(); 
    // Додаємо власну унікальну логіку (наприклад, логування)
    console.log(`Поточний слайд: ${this.currentIndex + 1}/${this.slides.length}`);
  }
}

///////////////////////////

window.addEventListener('DOMContentLoaded', () => {
  // Створення звичайного слайдера через клас
  // const manualSlider = new BaseSlider('my-slider');

  // Створення слайдера з автовідтворенням через успадкування
  const autoSlider = new AutoplaySlider('my-slider-2', 5000);
});
