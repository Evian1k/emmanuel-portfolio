// Testimonials module for Emmanuel Evian Portfolio

const Testimonials = {
    // Configuration
    config: {
        autoPlay: true,
        autoPlayInterval: 5000,
        showDots: true,
        showArrows: true,
        touchEnabled: true,
        keyboardEnabled: true,
        animationDuration: 500,
        easing: 'ease-in-out'
    },

    // State
    state: {
        container: null,
        slides: [],
        currentSlide: 0,
        totalSlides: 0,
        autoPlayTimer: null,
        isAnimating: false,
        touchStartX: 0,
        touchEndX: 0,
        isAutoPlaying: false
    },

    // Initialize testimonials
    init() {
        this.setupElements();
        this.setupTestimonials();
        this.setupControls();
        this.setupAccessibility();
        this.setupTouchSupport();
        this.setupKeyboardSupport();
        this.setupAutoPlay();
        this.setupAnalytics();
        this.setupResponsive();
    },

    // Setup DOM elements
    setupElements() {
        this.state.container = document.querySelector('.testimonials-slider');
        if (!this.state.container) return;

        this.state.slides = Array.from(this.state.container.querySelectorAll('.testimonial-slide'));
        this.state.totalSlides = this.state.slides.length;

        // Create slider wrapper if it doesn't exist
        if (!this.state.container.querySelector('.slider-wrapper')) {
            this.createSliderWrapper();
        }
    },

    // Create slider wrapper
    createSliderWrapper() {
        const wrapper = Utils.dom.create('div', {
            className: 'slider-wrapper'
        });

        // Move slides to wrapper
        this.state.slides.forEach(slide => {
            wrapper.appendChild(slide);
        });

        this.state.container.appendChild(wrapper);
    },

    // Setup testimonials data
    setupTestimonials() {
        const testimonials = [
            {
                name: "Sarah Johnson",
                position: "CEO, TechStart Inc.",
                content: "John is an exceptional developer who delivered our project on time and exceeded our expectations. His attention to detail and problem-solving skills are outstanding.",
                rating: 5,
                image: "/images/testimonials/sarah.jpg"
            },
            {
                name: "Michael Chen",
                position: "Product Manager, InnovateCorp",
                content: "Working with John was a pleasure. He understood our requirements perfectly and implemented them flawlessly. Highly recommended!",
                rating: 5,
                image: "/images/testimonials/michael.jpg"
            },
            {
                name: "Emily Rodriguez",
                position: "Founder, DesignStudio",
                content: "John's technical expertise and creative approach helped us create a stunning website that perfectly represents our brand. Excellent work!",
                rating: 5,
                image: "/images/testimonials/emily.jpg"
            },
            {
                name: "David Thompson",
                position: "CTO, StartupHub",
                content: "John is a true professional. His code is clean, well-documented, and maintainable. He's our go-to developer for all web projects.",
                rating: 5,
                image: "/images/testimonials/david.jpg"
            },
            {
                name: "Lisa Wang",
                position: "Marketing Director, GrowthCo",
                content: "The website John built for us has significantly improved our conversion rates. His understanding of user experience is remarkable.",
                rating: 5,
                image: "/images/testimonials/lisa.jpg"
            }
        ];

        this.renderTestimonials(testimonials);
    },

    // Render testimonials
    renderTestimonials(testimonials) {
        const wrapper = this.state.container.querySelector('.slider-wrapper');
        if (!wrapper) return;

        wrapper.innerHTML = '';

        testimonials.forEach((testimonial, index) => {
            const slide = this.createTestimonialSlide(testimonial, index);
            wrapper.appendChild(slide);
        });

        // Update slides array
        this.state.slides = Array.from(wrapper.querySelectorAll('.testimonial-slide'));
        this.state.totalSlides = this.state.slides.length;

        // Show first slide
        this.showSlide(0);
    },

    // Create testimonial slide
    createTestimonialSlide(testimonial, index) {
        const slide = Utils.dom.create('div', {
            className: 'testimonial-slide',
            'data-slide': index
        });

        const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);

        slide.innerHTML = `
            <div class="testimonial-content">
                <div class="testimonial-rating">
                    <span class="stars">${stars}</span>
                </div>
                <blockquote class="testimonial-text">
                    "${testimonial.content}"
                </blockquote>
                <div class="testimonial-author">
                    <div class="author-image">
                        <img src="${testimonial.image}" alt="${testimonial.name}" loading="lazy">
                    </div>
                    <div class="author-info">
                        <h4 class="author-name">${testimonial.name}</h4>
                        <p class="author-position">${testimonial.position}</p>
                    </div>
                </div>
            </div>
        `;

        return slide;
    },

    // Setup controls
    setupControls() {
        if (!this.state.container) return;

        // Create navigation arrows
        if (this.config.showArrows) {
            this.createNavigationArrows();
        }

        // Create dots navigation
        if (this.config.showDots) {
            this.createDotsNavigation();
        }

        // Create play/pause button
        this.createPlayPauseButton();
    },

    // Create navigation arrows
    createNavigationArrows() {
        const prevButton = Utils.dom.create('button', {
            className: 'slider-arrow slider-prev',
            'aria-label': 'Previous testimonial'
        });

        const nextButton = Utils.dom.create('button', {
            className: 'slider-arrow slider-next',
            'aria-label': 'Next testimonial'
        });

        prevButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
        `;

        nextButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        `;

        // Add event listeners
        prevButton.addEventListener('click', () => this.previousSlide());
        nextButton.addEventListener('click', () => this.nextSlide());

        this.state.container.appendChild(prevButton);
        this.state.container.appendChild(nextButton);
    },

    // Create dots navigation
    createDotsNavigation() {
        const dotsContainer = Utils.dom.create('div', {
            className: 'slider-dots'
        });

        for (let i = 0; i < this.state.totalSlides; i++) {
            const dot = Utils.dom.create('button', {
                className: 'slider-dot',
                'aria-label': `Go to testimonial ${i + 1}`,
                'data-slide': i
            });

            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        this.state.container.appendChild(dotsContainer);
    },

    // Create play/pause button
    createPlayPauseButton() {
        const playPauseButton = Utils.dom.create('button', {
            className: 'slider-play-pause',
            'aria-label': 'Pause testimonials'
        });

        playPauseButton.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
        `;

        playPauseButton.addEventListener('click', () => this.toggleAutoPlay());
        this.state.container.appendChild(playPauseButton);
    },

    // Setup accessibility
    setupAccessibility() {
        if (!this.state.container) return;

        // Add ARIA attributes
        this.state.container.setAttribute('role', 'region');
        this.state.container.setAttribute('aria-label', 'Testimonials');

        // Add live region for screen readers
        const liveRegion = Utils.dom.create('div', {
            className: 'sr-only',
            'aria-live': 'polite',
            'aria-atomic': 'true'
        });

        this.state.container.appendChild(liveRegion);

        // Update live region when slide changes
        this.updateLiveRegion();
    },

    // Update live region for screen readers
    updateLiveRegion() {
        const liveRegion = this.state.container.querySelector('[aria-live="polite"]');
        if (!liveRegion) return;

        const currentSlide = this.state.slides[this.state.currentSlide];
        const authorName = currentSlide.querySelector('.author-name').textContent;
        const testimonialText = currentSlide.querySelector('.testimonial-text').textContent;

        liveRegion.textContent = `Testimonial ${this.state.currentSlide + 1} of ${this.state.totalSlides}: ${testimonialText} by ${authorName}`;
    },

    // Setup touch support
    setupTouchSupport() {
        if (!this.config.touchEnabled || !this.state.container) return;

        this.state.container.addEventListener('touchstart', (e) => {
            this.handleTouchStart(e);
        }, { passive: true });

        this.state.container.addEventListener('touchend', (e) => {
            this.handleTouchEnd(e);
        }, { passive: true });
    },

    // Handle touch start
    handleTouchStart(e) {
        this.state.touchStartX = e.changedTouches[0].screenX;
    },

    // Handle touch end
    handleTouchEnd(e) {
        this.state.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
    },

    // Handle swipe gesture
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.state.touchStartX - this.state.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.previousSlide();
            }
        }
    },

    // Setup keyboard support
    setupKeyboardSupport() {
        if (!this.config.keyboardEnabled) return;

        document.addEventListener('keydown', (e) => {
            if (!this.state.container.contains(document.activeElement)) return;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.state.totalSlides - 1);
                    break;
                case ' ':
                    e.preventDefault();
                    this.toggleAutoPlay();
                    break;
            }
        });
    },

    // Setup auto-play
    setupAutoPlay() {
        if (!this.config.autoPlay) return;

        this.startAutoPlay();
    },

    // Start auto-play
    startAutoPlay() {
        if (this.state.isAutoPlaying) return;

        this.state.isAutoPlaying = true;
        this.state.autoPlayTimer = setInterval(() => {
            this.nextSlide();
        }, this.config.autoPlayInterval);

        this.updatePlayPauseButton();
    },

    // Stop auto-play
    stopAutoPlay() {
        if (!this.state.isAutoPlaying) return;

        this.state.isAutoPlaying = false;
        if (this.state.autoPlayTimer) {
            clearInterval(this.state.autoPlayTimer);
            this.state.autoPlayTimer = null;
        }

        this.updatePlayPauseButton();
    },

    // Toggle auto-play
    toggleAutoPlay() {
        if (this.state.isAutoPlaying) {
            this.stopAutoPlay();
        } else {
            this.startAutoPlay();
        }
    },

    // Update play/pause button
    updatePlayPauseButton() {
        const button = this.state.container.querySelector('.slider-play-pause');
        if (!button) return;

        if (this.state.isAutoPlaying) {
            button.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
            `;
            button.setAttribute('aria-label', 'Pause testimonials');
        } else {
            button.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            `;
            button.setAttribute('aria-label', 'Play testimonials');
        }
    },

    // Show slide
    showSlide(index) {
        if (this.state.isAnimating || index === this.state.currentSlide) return;

        this.state.isAnimating = true;
        const previousSlide = this.state.currentSlide;
        this.state.currentSlide = index;

        // Update slide visibility
        this.state.slides.forEach((slide, i) => {
            if (i === index) {
                this.addClass(slide, 'active');
                slide.setAttribute('aria-hidden', 'false');
            } else {
                this.removeClass(slide, 'active');
                slide.setAttribute('aria-hidden', 'true');
            }
        });

        // Update dots
        this.updateDots();

        // Update arrows
        this.updateArrows();

        // Update live region
        this.updateLiveRegion();

        // Track analytics
        this.trackSlideChange(previousSlide, index);

        // End animation
        setTimeout(() => {
            this.state.isAnimating = false;
        }, this.config.animationDuration);
    },

    // Update dots
    updateDots() {
        const dots = this.state.container.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            if (index === this.state.currentSlide) {
                this.addClass(dot, 'active');
                dot.setAttribute('aria-current', 'true');
            } else {
                this.removeClass(dot, 'active');
                dot.setAttribute('aria-current', 'false');
            }
        });
    },

    // Update arrows
    updateArrows() {
        const prevButton = this.state.container.querySelector('.slider-prev');
        const nextButton = this.state.container.querySelector('.slider-next');

        if (prevButton) {
            prevButton.disabled = this.state.currentSlide === 0;
        }

        if (nextButton) {
            nextButton.disabled = this.state.currentSlide === this.state.totalSlides - 1;
        }
    },

    // Next slide
    nextSlide() {
        const nextIndex = (this.state.currentSlide + 1) % this.state.totalSlides;
        this.showSlide(nextIndex);
    },

    // Previous slide
    previousSlide() {
        const prevIndex = this.state.currentSlide === 0 ? this.state.totalSlides - 1 : this.state.currentSlide - 1;
        this.showSlide(prevIndex);
    },

    // Go to specific slide
    goToSlide(index) {
        if (index >= 0 && index < this.state.totalSlides) {
            this.showSlide(index);
        }
    },

    // Setup analytics
    setupAnalytics() {
        // Track initial load
        this.trackEvent('testimonials_loaded', {
            total_slides: this.state.totalSlides
        });
    },

    // Track slide change
    trackSlideChange(fromIndex, toIndex) {
        this.trackEvent('testimonial_slide_changed', {
            from_slide: fromIndex + 1,
            to_slide: toIndex + 1,
            total_slides: this.state.totalSlides
        });
    },

    // Track event
    trackEvent(eventName, parameters = {}) {
        if (window.gtag) {
            gtag('event', eventName, parameters);
        }

        // Custom event for other analytics
        const event = new CustomEvent('testimonials_event', {
            detail: {
                event: eventName,
                parameters: parameters
            }
        });
        document.dispatchEvent(event);
    },

    // Setup responsive behavior
    setupResponsive() {
        const handleResize = Utils.performance.debounce(() => {
            this.updateResponsiveLayout();
        }, 250);

        window.addEventListener('resize', handleResize);
        this.updateResponsiveLayout();
    },

    // Update responsive layout
    updateResponsiveLayout() {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

        // Adjust auto-play interval based on screen size
        if (isMobile) {
            this.config.autoPlayInterval = 7000; // Slower on mobile
        } else {
            this.config.autoPlayInterval = 5000;
        }

        // Update container classes
        this.state.container.className = this.state.container.className.replace(/\bslider-\w+\b/g, '');
        this.state.container.classList.add(`slider-${isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}`);

        // Restart auto-play with new interval
        if (this.state.isAutoPlaying) {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    },

    // Utility methods
    addClass(element, className) {
        if (element) {
            Utils.dom.addClass(element, className);
        }
    },

    removeClass(element, className) {
        if (element) {
            Utils.dom.removeClass(element, className);
        }
    },

    // Get current slide
    getCurrentSlide() {
        return this.state.currentSlide;
    },

    // Get total slides
    getTotalSlides() {
        return this.state.totalSlides;
    },

    // Check if auto-play is active
    isAutoPlaying() {
        return this.state.isAutoPlaying;
    },

    // Pause on hover (optional feature)
    enablePauseOnHover() {
        if (!this.state.container) return;

        this.state.container.addEventListener('mouseenter', () => {
            if (this.state.isAutoPlaying) {
                this.stopAutoPlay();
            }
        });

        this.state.container.addEventListener('mouseleave', () => {
            if (this.config.autoPlay) {
                this.startAutoPlay();
            }
        });
    },

    // Cleanup testimonials
    cleanup() {
        // Stop auto-play
        this.stopAutoPlay();

        // Remove event listeners
        const prevButton = this.state.container?.querySelector('.slider-prev');
        const nextButton = this.state.container?.querySelector('.slider-next');
        const dots = this.state.container?.querySelectorAll('.slider-dot');
        const playPauseButton = this.state.container?.querySelector('.slider-play-pause');

        if (prevButton) prevButton.removeEventListener('click', this.previousSlide);
        if (nextButton) nextButton.removeEventListener('click', this.nextSlide);
        if (dots) dots.forEach(dot => dot.removeEventListener('click', this.goToSlide));
        if (playPauseButton) playPauseButton.removeEventListener('click', this.toggleAutoPlay);

        // Clear state
        this.state.container = null;
        this.state.slides = [];
        this.state.currentSlide = 0;
        this.state.totalSlides = 0;
        this.state.autoPlayTimer = null;
        this.state.isAnimating = false;
        this.state.isAutoPlaying = false;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Testimonials;
} else {
    window.Testimonials = Testimonials;
}