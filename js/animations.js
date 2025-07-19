// Animations module for Emmanuel Evian Portfolio

const Animations = {
    // Initialize all animations
    init() {
        this.initScrollAnimations();
        this.initHeroAnimations();
        this.initSkillAnimations();
        this.initParallaxEffects();
        this.initTypingEffect();
        this.initParticleSystem();
    },

    // Scroll-based animations using Intersection Observer
    initScrollAnimations() {
        const observerOptions = {
            threshold: CONFIG.animations.scrollThreshold,
            rootMargin: CONFIG.animations.scrollMargin
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll(
            '[data-aos], .fade-in, .slide-in, .scale-in, .skill-card, .project-card'
        );

        animatedElements.forEach(element => {
            observer.observe(element);
        });
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

    // Hero section animations
    initHeroAnimations() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        // Animate hero content on load
        const heroContent = hero.querySelector('.hero-content');
        const heroImage = hero.querySelector('.hero-image');
        const heroButtons = hero.querySelector('.hero-buttons');

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
        const scrollIndicator = hero.querySelector('.scroll-down');
        if (scrollIndicator) {
            this.animateScrollIndicator(scrollIndicator);
        }
    },

    // Animate scroll indicator
    animateScrollIndicator(element) {
        element.style.animation = 'bounce 2s infinite';
    },

    // Skill bar animations
    initSkillAnimations() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBar(entry.target);
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => skillObserver.observe(bar));
    },

    // Animate skill bar progress
    animateSkillBar(bar) {
        const level = bar.getAttribute('data-level') || 0;
        const duration = CONFIG.skills.animationDuration;
        
        bar.style.width = '0%';
        bar.style.transition = `width ${duration}ms ease`;
        
        setTimeout(() => {
            bar.style.width = `${level}%`;
        }, 100);
    },

    // Parallax effects
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', Utils.performance.throttle(() => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-parallax') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16));
    },

    // Typing effect for hero title
    initTypingEffect() {
        const typingElement = document.querySelector('.hero-name');
        if (!typingElement) return;

        const text = typingElement.textContent;
        typingElement.textContent = '';
        typingElement.style.borderRight = '2px solid var(--primary-color)';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typingElement.style.borderRight = 'none';
                }, 1000);
            }
        };

        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    },

    // Particle system for hero background
    initParticleSystem() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = 'var(--primary-color)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        // Initialize particles
        const initParticles = () => {
            particles = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
            
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationId = requestAnimationFrame(animate);
        };

        initParticles();
        animate();

        // Cleanup function
        this.cleanupParticles = () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
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

    // Cleanup function
    cleanup() {
        if (this.cleanupParticles) {
            this.cleanupParticles();
        }
    }
};

// Export animations
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Animations;
} else {
    window.Animations = Animations;
}