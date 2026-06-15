function BaseSlider(container, options) {
    this.container   = container;
    this.options     = options;
    this.track       = container.querySelector('.slider__track');
    this.slideEls    = container.querySelectorAll('.slider__slide');
    this.totalSlides = this.slideEls.length;
    this.currentIdx  = 0;

    this.dots      = [];
    this.counterEl = null;
}

BaseSlider.prototype.goTo = function(index) {
    this.currentIdx = ((index % this.totalSlides) + this.totalSlides) % this.totalSlides;
    this._updateTrack();
    this._updateDots();
    this._updateCounter();
};

BaseSlider.prototype.next = function() {
    this.goTo(this.currentIdx + 1);
};

BaseSlider.prototype.prev = function() {
    this.goTo(this.currentIdx - 1);
};

BaseSlider.prototype._updateTrack = function() {
    this.track.style.transform = 'translateX(-' + (this.currentIdx * 100) + '%)';
};

BaseSlider.prototype._updateDots = function() {
    var idx = this.currentIdx;
    this.dots.forEach(function(dot, i) {
        dot.classList.toggle('is-active', i === idx);
    });
};

BaseSlider.prototype._updateCounter = function() {
    if (this.counterEl) {
        this.counterEl.textContent = (this.currentIdx + 1) + ' / ' + this.totalSlides;
    }
};

BaseSlider.prototype._bindKeyboard = function() {
    var self = this;
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') self.next();
        if (e.key === 'ArrowLeft')  self.prev();
    });
};


function DragSlider(container, options) {
    BaseSlider.call(this, container, options);

    this._dragStartX = 0;
    this._dragEndX   = 0;
    this._dragging   = false;
}

DragSlider.prototype = Object.create(BaseSlider.prototype);
DragSlider.prototype.constructor = DragSlider;

DragSlider.prototype._bindDrag = function() {
    var self  = this;
    var track = this.track;

    track.addEventListener('touchstart', function(e) {
        self._dragStartX = e.touches[0].clientX;
        self._dragging   = true;
    }, { passive: true });

    track.addEventListener('touchmove', function(e) {
        if (self._dragging) self._dragEndX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', function() {
        self._handleDragEnd();
    });

    track.addEventListener('mousedown', function(e) {
        self._dragStartX = e.clientX;
        self._dragging   = true;
    });

    track.addEventListener('mousemove', function(e) {
        if (self._dragging) self._dragEndX = e.clientX;
    });

    track.addEventListener('mouseup',    function() { self._handleDragEnd(); });
    track.addEventListener('mouseleave', function() { self._handleDragEnd(); });
};

DragSlider.prototype._handleDragEnd = function() {
    if (!this._dragging) return;

    var diff      = this._dragStartX - this._dragEndX;
    var threshold = this.options.dragThreshold || 50;

    if (diff >  threshold) this.next();
    if (diff < -threshold) this.prev();

    this._dragging = false;
    this._dragEndX = this._dragStartX;
};


function FullSlider(container, options) {
    var defaults = {
        interval:      3500,
        showDots:      true,
        showProgress:  true,
        showCounter:   true,
        pauseOnHover:  true,
        dragThreshold: 50
    };

    var cfg = Object.assign({}, defaults, options);

    DragSlider.call(this, container, cfg);

    this._timer     = null;
    this._isPlaying = true;
    this.progressEl = null;
    this.pauseBtn   = null;

    this._buildControls();
    this._bindDrag();
    this._bindKeyboard();
    this._bindHover();

    this._startAuto();
}

FullSlider.prototype = Object.create(DragSlider.prototype);
FullSlider.prototype.constructor = FullSlider;

FullSlider.prototype._buildControls = function() {
    var self = this;
    var c    = this.container;

    var prevBtn = document.createElement('button');
    prevBtn.className = 'slider__btn slider__btn--prev';
    prevBtn.innerHTML = '&#10094;';
    prevBtn.setAttribute('aria-label', 'Попередній слайд');
    prevBtn.addEventListener('click', function() {
        self.prev();
        self._resetAuto();
    });
    c.appendChild(prevBtn);

    var nextBtn = document.createElement('button');
    nextBtn.className = 'slider__btn slider__btn--next';
    nextBtn.innerHTML = '&#10095;';
    nextBtn.setAttribute('aria-label', 'Наступний слайд');
    nextBtn.addEventListener('click', function() {
        self.next();
        self._resetAuto();
    });
    c.appendChild(nextBtn);

    var pauseBtn = document.createElement('button');
    pauseBtn.className   = 'slider__pause';
    pauseBtn.textContent = 'Pause';
    pauseBtn.setAttribute('aria-label', 'Пауза або відтворення');
    pauseBtn.addEventListener('click', function() {
        self._togglePlay();
    });
    c.appendChild(pauseBtn);
    this.pauseBtn = pauseBtn;

    if (this.options.showDots) {
        var dotsWrap = document.createElement('div');
        dotsWrap.className = 'slider__dots';

        for (var i = 0; i < this.totalSlides; i++) {
            (function(idx) {
                var dot = document.createElement('button');
                dot.className = 'slider__dot' + (idx === 0 ? ' is-active' : '');
                dot.setAttribute('aria-label', 'Слайд ' + (idx + 1));
                dot.addEventListener('click', function() {
                    self.goTo(idx);
                    self._resetAuto();
                });
                dotsWrap.appendChild(dot);
                self.dots.push(dot);
            })(i);
        }

        c.appendChild(dotsWrap);
    }

    if (this.options.showProgress) {
        var bar = document.createElement('div');
        bar.className = 'slider__progress';
        c.appendChild(bar);
        this.progressEl = bar;
    }

    if (this.options.showCounter) {
        var counter = document.createElement('div');
        counter.className   = 'slider__counter';
        counter.textContent = '1 / ' + this.totalSlides;
        c.appendChild(counter);
        this.counterEl = counter;
    }
};

FullSlider.prototype._startAuto = function() {
    var self     = this;
    var interval = this.options.interval;

    if (this.progressEl) {
        this.progressEl.style.transition = 'none';
        this.progressEl.style.width      = '0%';
        void this.progressEl.offsetWidth;
        this.progressEl.classList.add('animating');
        this.progressEl.style.transitionDuration = interval + 'ms';
        this.progressEl.style.width              = '100%';
    }

    this._timer = setTimeout(function() {
        self.next();
        self._startAuto();
    }, interval);
};

FullSlider.prototype._stopAuto = function() {
    clearTimeout(this._timer);

    if (this.progressEl) {
        var currentWidth = getComputedStyle(this.progressEl).width;
        this.progressEl.classList.remove('animating');
        this.progressEl.style.width = currentWidth;
    }
};

FullSlider.prototype._resetAuto = function() {
    if (!this._isPlaying) return;
    this._stopAuto();
    this._startAuto();
};

FullSlider.prototype._togglePlay = function() {
    this._isPlaying = !this._isPlaying;

    if (this._isPlaying) {
        this._startAuto();
        this.pauseBtn.textContent = 'Pause';
        this.pauseBtn.classList.remove('is-paused');
    } else {
        this._stopAuto();
        this.pauseBtn.textContent = 'Play';
        this.pauseBtn.classList.add('is-paused');
    }
};

FullSlider.prototype._bindHover = function() {
    if (!this.options.pauseOnHover) return;

    var self = this;

    this.container.addEventListener('mouseenter', function() {
        if (self._isPlaying) self._stopAuto();
    });

    this.container.addEventListener('mouseleave', function() {
        if (self._isPlaying) self._startAuto();
    });
};


var slider = new FullSlider(
    document.getElementById('mainSlider'),
    {
        interval:      4000,
        showDots:      true,
        showProgress:  true,
        showCounter:   true,
        pauseOnHover:  true,
        dragThreshold: 50
    }
);