// Animations module for Emmanuel Evian Portfolio

const Animations = {
    // Configuration
    config: {
        scrollThreshold: 0.1,
        staggerDelay: 100,
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        heroTypingSpeed: 100,
        heroTypingDelay: 2000,
        particleCount: 50,
        skillBarDuration: 1500
    },

    // State
    state: {
        observer: null,
        animatedElements: new Set(),
        typingInterval: null,
        particleAnimation: null,
        skillBarsAnimated: new Set()
    },

    // Initialize all animations
    init() {
        this.setupScrollAnimations();
        this.setupHeroAnimations();
        this.setupSkillBarAnimations();
        this.setupParallaxEffects();
        this.setupHoverAnimations();
        this.setupParticleEffect();
    },

    // Setup scroll-based animations using Intersection Observer
    setupScrollAnimations() {
        if (!Utils.browser.supportsIntersectionObserver()) {
            this.fallbackScrollAnimations();
            return;
        }

        this.state.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.state.animatedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.state.animatedElements.add(entry.target);
                }
            });
        }, {
            threshold: this.config.scrollThreshold,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll(
            '.animate-on-scroll, .fade-in, .slide-up, .slide-down, .slide-left, .slide-right, .scale-in, .rotate-in'
        );

        animatedElements.forEach(element => {
            this.state.observer.observe(element);
        });
    },

    // Fallback for browsers without Intersection Observer
    fallbackScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const checkScroll = Utils.performance.throttle(() => {
            animatedElements.forEach(element => {
                if (Utils.dom.isInViewport(element, 0.1) && !this.state.animatedElements.has(element)) {
                    this.animateElement(element);
                    this.state.animatedElements.add(element);
                }
            });
        }, 100);

        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Check on load
    },

    // Animate element based on data-aos attribute or class
    animateElement(element) {
        const animationType = element.getAttribute('data-aos') || this.getAnimationType(element);
        const delay = element.getAttribute('data-aos-delay') || 0;
        const duration = element.getAttribute('data-aos-duration') || CONFIG.animations.duration;

        setTimeout(() => {
            switch (animationType) {
                case 'fade-up':
                case 'fade-in':
                    this.fadeInUp(element, duration);
                    break;
                case 'fade-down':
                    this.fadeInDown(element, duration);
                    break;
                case 'fade-left':
                    this.fadeInLeft(element, duration);
                    break;
                case 'fade-right':
                    this.fadeInRight(element, duration);
                    break;
                case 'slide-up':
                case 'slide-in':
                    this.slideInUp(element, duration);
                    break;
                case 'slide-down':
                    this.slideInDown(element, duration);
                    break;
                case 'slide-left':
                    this.slideInLeft(element, duration);
                    break;
                case 'slide-right':
                    this.slideInRight(element, duration);
                    break;
                case 'scale-up':
                case 'scale-in':
                    this.scaleIn(element, duration);
                    break;
                case 'zoom-in':
                    this.zoomIn(element, duration);
                    break;
                case 'flip-up':
                    this.flipUp(element, duration);
                    break;
                case 'flip-down':
                    this.flipDown(element, duration);
                    break;
                case 'rotate-in':
                    this.rotateIn(element, duration);
                    break;
                default:
                    this.fadeInUp(element, duration);
            }
        }, parseInt(delay));
    },

    // Get animation type from element classes
    getAnimationType(element) {
        if (element.classList.contains('fade-in')) return 'fade-in';
        if (element.classList.contains('slide-in')) return 'slide-in';
        if (element.classList.contains('scale-in')) return 'scale-in';
        return 'fade-up';
    },

    // Setup hero section animations
    setupHeroAnimations() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        // Animate hero content on load
        const heroContent = heroSection.querySelector('.hero-content');
        const heroImage = heroSection.querySelector('.hero-image');
        const heroButtons = heroSection.querySelector('.hero-buttons');

        if (heroContent) {
            setTimeout(() => this.fadeInUp(heroContent, 800), 200);
        }

        if (heroImage) {
            setTimeout(() => this.scaleIn(heroImage, 800), 400);
        }

        if (heroButtons) {
            setTimeout(() => this.fadeInUp(heroButtons, 600), 600);
        }

        // Animate scroll indicator
        const scrollIndicator = heroSection.querySelector('.scroll-down');
        if (scrollIndicator) {
            this.animateScrollIndicator(scrollIndicator);
        }

        // Setup typing effect
        this.setupTypingEffect();
    },

    // Animate scroll indicator
    animateScrollIndicator(element) {
        element.style.animation = 'bounce 2s infinite';
    },

    // Setup typing effect for hero title
    setupTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const texts = [
            'Full Stack Developer',
            'UI/UX Designer',
            'Mobile Developer',
            'Cloud Architect'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = this.config.heroTypingSpeed;

            if (isDeleting) {
                typeSpeed /= 2;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = this.config.heroTypingDelay;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            this.state.typingInterval = setTimeout(type, typeSpeed);
        };

        type();
    },

    // Setup skill bar animations
    setupSkillBarAnimations() {
        const skillBars = document.querySelectorAll('.skill-bar');
        if (!skillBars.length) return;

        const animateSkillBar = (skillBar) => {
            if (this.state.skillBarsAnimated.has(skillBar)) return;

            const progressBar = skillBar.querySelector('.skill-progress');
            const percentage = skillBar.dataset.percentage || 0;
            
            if (progressBar) {
                progressBar.style.width = '0%';
                progressBar.style.transition = `width ${this.config.skillBarDuration}ms ease-out`;
                
                setTimeout(() => {
                    progressBar.style.width = percentage + '%';
                }, 100);

                this.state.skillBarsAnimated.add(skillBar);
            }
        };

        // Observe skill bars
        if (this.state.observer) {
            skillBars.forEach(skillBar => {
                this.state.observer.observe(skillBar);
            });
        }
    },

    // Setup parallax effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        if (!parallaxElements.length) return;

        const handleParallax = Utils.performance.throttle(() => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16);

        window.addEventListener('scroll', handleParallax);
    },

    // Setup hover animations
    setupHoverAnimations() {
        // Card hover effects
        const cards = document.querySelectorAll('.card, .project-card, .testimonial-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addClass(card, 'hover');
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeClass(card, 'hover');
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.addClass(button, 'btn-hover');
            });
            
            button.addEventListener('mouseleave', () => {
                this.removeClass(button, 'btn-hover');
            });
        });
    },

    // Setup particle effect for hero section
    setupParticleEffect() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        heroSection.appendChild(particleContainer);

        // Create particles
        for (let i = 0; i < this.config.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position and size
            const size = Math.random() * 4 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;

            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                top: ${y}%;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
            `;

            particleContainer.appendChild(particle);
        }
    },

    // Animation methods
    fadeInUp(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all ${duration}ms ${CONFIG.animations.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 50);
    },

    fadeInDown(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-30px)';
        element.style.transition = `all ${duration}ms ${CONFIG.animations.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 50);
    },

    fadeInLeft(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        element.style.transition = `all ${duration}ms ${CONFIG.animations.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 50);
    },

    fadeInRight(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        element.style.transition = `all ${duration}ms ${CONFIG.animations.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 50);
    },

    slideInUp(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = `all ${duration}ms ${CONFIG.animations.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 50);
    },

    slideInDown(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-50px)';
        element.style.transition = `all ${duration}ms ${CONFIG.animations.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 50);
    },

    slideInLeft(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        element.style.transition = `all ${duration}ms ${CONFIG.animations.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 50);
    },

    slideInRight(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(50px)';
        element.style.transition = `all ${duration}ms ${CONFIG.animations.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 50);
    },

    scaleIn(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = `all ${duration}ms ${CONFIG.animations.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, 50);
    },

    zoomIn(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.5)';
        element.style.transition = `all ${duration}ms ${CONFIG.animations.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, 50);
    },

    flipUp(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'perspective(400px) rotateX(90deg)';
        element.style.transition = `all ${duration}ms ${CONFIG.animations.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'perspective(400px) rotateX(0deg)';
        }, 50);
    },

    flipDown(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'perspective(400px) rotateX(-90deg)';
        element.style.transition = `all ${duration}ms ${CONFIG.animations.easing}`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'perspective(400px) rotateX(0deg)';
        }, 50);
    },

    rotateIn(element, duration = 800, delay = 0) {
        element.style.transform = 'rotate(-10deg) scale(0.8)';
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms ${CONFIG.animations.easing} ${delay}ms`;
        
        setTimeout(() => {
            element.style.transform = 'rotate(0deg) scale(1)';
            element.style.opacity = '1';
        }, delay);
    },

    // Hover animations
    addHoverEffects() {
        const hoverElements = document.querySelectorAll('.btn, .skill-card, .project-card, .nav-link');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.addHoverClass(element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.removeHoverClass(element);
            });
        });
    },

    addHoverClass(element) {
        element.style.transform = 'translateY(-2px)';
        element.style.boxShadow = 'var(--shadow-lg)';
    },

    removeHoverClass(element) {
        element.style.transform = 'translateY(0)';
        element.style.boxShadow = 'var(--shadow-sm)';
    },

    // Utility methods
    addClass(element, className) {
        Utils.dom.addClass(element, className);
    },

    removeClass(element, className) {
        Utils.dom.removeClass(element, className);
    },

    // Cleanup function
    cleanup() {
        // Clear typing interval
        if (this.state.typingInterval) {
            clearTimeout(this.state.typingInterval);
        }

        // Disconnect observer
        if (this.state.observer) {
            this.state.observer.disconnect();
        }

        // Clear particle animation
        if (this.state.particleAnimation) {
            cancelAnimationFrame(this.state.particleAnimation);
        }

        // Clear state
        this.state.animatedElements.clear();
        this.state.skillBarsAnimated.clear();
    }
};

// Export animations
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Animations;
} else {
    window.Animations = Animations;
}