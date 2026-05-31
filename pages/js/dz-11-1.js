
// Функція-конструктор базового слайдера
function ProtoSlider(containerId) {
  this.container = document.getElementById(containerId);
  this.track = this.container.querySelector('.slider-track');
  this.slides = this.container.querySelectorAll('.slide');
  this.currentIndex = 0;

  this.init();
}

// Додавання методів у прототип
ProtoSlider.prototype.init = function() {
  var self = this; // Збереження контексту для ES5
  this.container.querySelector('.prev').addEventListener('click', function() { self.prev(); });
  this.container.querySelector('.next').addEventListener('click', function() { self.next(); });
  this.render();
};

ProtoSlider.prototype.move = function(direction) {
  this.currentIndex += direction;
  if (this.currentIndex >= this.slides.length) this.currentIndex = 0;
  if (this.currentIndex < 0) this.currentIndex = this.slides.length - 1;
  this.render();
};

ProtoSlider.prototype.next = function() { this.move(1); };
ProtoSlider.prototype.prev = function() { this.move(-1); };

ProtoSlider.prototype.render = function() {
  var translation = this.currentIndex * -100;
  this.track.style.transform = 'translateX(' + translation + '%)';
};

 window.addEventListener("DOMContentLoaded", () => {
        const manualSlider = new ProtoSlider('my-slider');
       
      });
