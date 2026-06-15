class BaseSlider {
    constructor(container, options) {
        this.container   = container;
        this.options     = options;
        this.track       = container.querySelector('.slider__track');
        this.slideEls    = container.querySelectorAll('.slider__slide');
        this.totalSlides = this.slideEls.length;
        this.currentIdx  = 0;

        this.dots      = [];
        this.counterEl = null;
    }

    goTo(index) {
        this.currentIdx = ((index % this.totalSlides) + this.totalSlides) % this.totalSlides;
        this.#updateTrack();
        this.#updateDots();
        this.#updateCounter();
    }

    next() { this.goTo(this.currentIdx + 1); }

    prev() { this.goTo(this.currentIdx - 1); }

    #updateTrack() {
        this.track.style.transform = `translateX(-${this.currentIdx * 100}%)`;
    }

    #updateDots() {
        this.dots.forEach((dot, i) =>
            dot.classList.toggle('is-active', i === this.currentIdx)
        );
    }

    #updateCounter() {
        if (this.counterEl) {
            this.counterEl.textContent = `${this.currentIdx + 1} / ${this.totalSlides}`;
        }
    }

    _bindKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') this.next();
            if (e.key === 'ArrowLeft')  this.prev();
        });
    }
}


class DragSlider extends BaseSlider {
    constructor(container, options) {
        super(container, options);

        this._dragStartX = 0;
        this._dragEndX   = 0;
        this._dragging   = false;
    }

    _bindDrag() {
        const track = this.track;

        track.addEventListener('touchstart', (e) => {
            this._dragStartX = e.touches[0].clientX;
            this._dragging   = true;
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (this._dragging) this._dragEndX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchend', () => this._handleDragEnd());

        track.addEventListener('mousedown', (e) => {
            this._dragStartX = e.clientX;
            this._dragging   = true;
        });

        track.addEventListener('mousemove', (e) => {
            if (this._dragging) this._dragEndX = e.clientX;
        });

        track.addEventListener('mouseup',    () => this._handleDragEnd());
        track.addEventListener('mouseleave', () => this._handleDragEnd());
    }

    _handleDragEnd() {
        if (!this._dragging) return;

        const diff      = this._dragStartX - this._dragEndX;
        const threshold = this.options.dragThreshold ?? 50;

        if (diff >  threshold) this.next();
        if (diff < -threshold) this.prev();

        this._dragging = false;
        this._dragEndX = this._dragStartX;
    }
}


class FullSlider extends DragSlider {
    constructor(container, options = {}) {
        const defaults = {
            interval:      3500,
            showDots:      true,
            showProgress:  true,
            showCounter:   true,
            pauseOnHover:  true,
            dragThreshold: 50
        };

        super(container, { ...defaults, ...options });

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

    _buildControls() {
        const c = this.container;

        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider__btn slider__btn--prev';
        prevBtn.innerHTML = '&#10094;';
        prevBtn.setAttribute('aria-label', 'Попередній слайд');
        prevBtn.addEventListener('click', () => { this.prev(); this._resetAuto(); });
        c.appendChild(prevBtn);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider__btn slider__btn--next';
        nextBtn.innerHTML = '&#10095;';
        nextBtn.setAttribute('aria-label', 'Наступний слайд');
        nextBtn.addEventListener('click', () => { this.next(); this._resetAuto(); });
        c.appendChild(nextBtn);

        const pauseBtn = document.createElement('button');
        pauseBtn.className   = 'slider__pause';
        pauseBtn.textContent = 'Pause';
        pauseBtn.setAttribute('aria-label', 'Пауза або відтворення');
        pauseBtn.addEventListener('click', () => this._togglePlay());
        c.appendChild(pauseBtn);
        this.pauseBtn = pauseBtn;

        if (this.options.showDots) {
            const dotsWrap = document.createElement('div');
            dotsWrap.className = 'slider__dots';

            for (let i = 0; i < this.totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = `slider__dot${i === 0 ? ' is-active' : ''}`;
                dot.setAttribute('aria-label', `Слайд ${i + 1}`);
                dot.addEventListener('click', () => { this.goTo(i); this._resetAuto(); });
                dotsWrap.appendChild(dot);
                this.dots.push(dot);
            }

            c.appendChild(dotsWrap);
        }

        if (this.options.showProgress) {
            const bar = document.createElement('div');
            bar.className = 'slider__progress';
            c.appendChild(bar);
            this.progressEl = bar;
        }

        if (this.options.showCounter) {
            const counter = document.createElement('div');
            counter.className   = 'slider__counter';
            counter.textContent = `1 / ${this.totalSlides}`;
            c.appendChild(counter);
            this.counterEl = counter;
        }
    }

    _startAuto() {
        const interval = this.options.interval;

        if (this.progressEl) {
            this.progressEl.style.transition = 'none';
            this.progressEl.style.width      = '0%';
            void this.progressEl.offsetWidth;
            this.progressEl.classList.add('animating');
            this.progressEl.style.transitionDuration = `${interval}ms`;
            this.progressEl.style.width              = '100%';
        }

        this._timer = setTimeout(() => {
            this.next();
            this._startAuto();
        }, interval);
    }

    _stopAuto() {
        clearTimeout(this._timer);

        if (this.progressEl) {
            const currentWidth = getComputedStyle(this.progressEl).width;
            this.progressEl.classList.remove('animating');
            this.progressEl.style.width = currentWidth;
        }
    }

    _resetAuto() {
        if (!this._isPlaying) return;
        this._stopAuto();
        this._startAuto();
    }

    _togglePlay() {
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
    }

    _bindHover() {
        if (!this.options.pauseOnHover) return;

        this.container.addEventListener('mouseenter', () => {
            if (this._isPlaying) this._stopAuto();
        });

        this.container.addEventListener('mouseleave', () => {
            if (this._isPlaying) this._startAuto();
        });
    }
}


const slider = new FullSlider(
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