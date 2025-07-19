// Main JavaScript file for Emmanuel Evian Portfolio

const App = {
    // Configuration
    config: {
        debug: false,
        enableAnalytics: true,
        enablePWA: true,
        enablePerformanceMonitoring: true,
        enableErrorTracking: true,
        enableAccessibility: true,
        loaderDuration: 2000,
        minDisplayTime: 1000
    },

    // State
    state: {
        isInitialized: false,
        isLoaded: false,
        currentPage: 'home',
        modules: {},
        loader: null,
        deferredPrompt: null,
        performanceMetrics: {},
        errorCount: 0
    },

    // Initialize application
    init() {
        this.setupLoader();
        this.setupErrorHandling();
        this.setupPerformanceMonitoring();
        this.setupAccessibility();
        this.setupPWA();
        this.setupAnalytics();
        this.initializeModules();
        this.setupEventListeners();
        this.setupPageSpecificFeatures();
        this.hideLoader();
        this.markAsInitialized();
    },

    // Setup page loader
    setupLoader() {
        this.state.loader = document.querySelector('.loader');
        if (!this.state.loader) return;

        // Show loader
        this.state.loader.style.display = 'flex';
        
        // Set minimum display time
        setTimeout(() => {
            this.state.loader.style.opacity = '1';
        }, 100);
    },

    // Hide loader with animation
    hideLoader() {
        if (!this.state.loader) return;

        const hideLoader = () => {
            this.state.loader.style.opacity = '0';
            setTimeout(() => {
                this.state.loader.style.display = 'none';
                this.state.isLoaded = true;
                this.onPageLoaded();
            }, 500);
        };

        // Ensure minimum display time
        const elapsed = Date.now() - performance.now();
        const remaining = Math.max(0, this.config.minDisplayTime - elapsed);
        
        setTimeout(hideLoader, remaining);
    },

    // Setup error handling
    setupErrorHandling() {
        if (!this.config.enableErrorTracking) return;

        // Global error handler
        window.addEventListener('error', (e) => {
            this.handleError(e.error || e, 'JavaScript Error');
        });

        // Promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            this.handleError(e.reason, 'Unhandled Promise Rejection');
        });

        // Resource loading error handler
        window.addEventListener('error', (e) => {
            if (e.target && e.target.tagName) {
                this.handleError(new Error(`Failed to load ${e.target.tagName}: ${e.target.src || e.target.href}`), 'Resource Loading Error');
            }
        }, true);
    },

    // Handle errors
    handleError(error, context = '') {
        this.state.errorCount++;

        // Log error
        console.error(`[${context}]`, error);

        // Track error analytics
        if (this.config.enableAnalytics && window.gtag) {
            gtag('event', 'exception', {
                description: `${context}: ${error.message}`,
                fatal: false
            });
        }

        // Show user-friendly error message for critical errors
        if (this.state.errorCount <= 3) {
            this.showNotification('An error occurred. Please refresh the page.', 'error');
        }
    },

    // Setup performance monitoring
    setupPerformanceMonitoring() {
        if (!this.config.enablePerformanceMonitoring) return;

        // Monitor page load performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.measurePerformance();
            }, 0);
        });

        // Monitor Core Web Vitals
        this.monitorCoreWebVitals();
    },

    // Measure performance metrics
    measurePerformance() {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');

        this.state.performanceMetrics = {
            loadTime: navigation.loadEventEnd - navigation.loadEventStart,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
            firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
            totalLoadTime: navigation.loadEventEnd - navigation.fetchStart
        };

        // Track performance analytics
        if (this.config.enableAnalytics && window.gtag) {
            gtag('event', 'timing_complete', {
                name: 'load',
                value: Math.round(this.state.performanceMetrics.totalLoadTime)
            });
        }

        // Log performance metrics
        if (this.config.debug) {
            console.log('Performance Metrics:', this.state.performanceMetrics);
        }
    },

    // Monitor Core Web Vitals
    monitorCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            if (this.config.enableAnalytics && window.gtag) {
                gtag('event', 'largest_contentful_paint', {
                    value: Math.round(lastEntry.startTime)
                });
            }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (this.config.enableAnalytics && window.gtag) {
                    gtag('event', 'first_input_delay', {
                        value: Math.round(entry.processingStart - entry.startTime)
                    });
                }
            });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        new PerformanceObserver((list) => {
            let clsValue = 0;
            const entries = list.getEntries();
            
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });

            if (this.config.enableAnalytics && window.gtag) {
                gtag('event', 'cumulative_layout_shift', {
                    value: Math.round(clsValue * 1000) / 1000
                });
            }
        }).observe({ entryTypes: ['layout-shift'] });
    },

    // Setup accessibility features
    setupAccessibility() {
        if (!this.config.enableAccessibility) return;

        // Skip to main content link
        this.createSkipLink();

        // Focus management
        this.setupFocusManagement();

        // Keyboard navigation
        this.setupKeyboardNavigation();

        // Screen reader announcements
        this.setupScreenReaderSupport();
    },

    // Create skip to main content link
    createSkipLink() {
        const skipLink = Utils.dom.create('a', {
            className: 'skip-link',
            href: '#main-content',
            textContent: 'Skip to main content'
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    },

    // Setup focus management
    setupFocusManagement() {
        // Store last focused element
        let lastFocusedElement = null;

        // Store focus when opening modals or menus
        document.addEventListener('focusin', (e) => {
            if (e.target.closest('.modal, .mobile-menu')) {
                lastFocusedElement = document.activeElement;
            }
        });

        // Restore focus when closing modals or menus
        document.addEventListener('focusout', (e) => {
            if (!e.target.closest('.modal, .mobile-menu')) {
                lastFocusedElement = e.target;
            }
        });
    },

    // Setup keyboard navigation
    setupKeyboardNavigation() {
        // Escape key closes modals and menus
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal.active');
                const mobileMenu = document.querySelector('.mobile-menu.active');
                
                if (modal) {
                    modal.querySelector('.modal-close')?.click();
                } else if (mobileMenu) {
                    mobileMenu.querySelector('.mobile-toggle')?.click();
                }
            }
        });
    },

    // Setup screen reader support
    setupScreenReaderSupport() {
        // Create live region for announcements
        const liveRegion = Utils.dom.create('div', {
            className: 'sr-only',
            'aria-live': 'polite',
            'aria-atomic': 'true'
        });

        document.body.appendChild(liveRegion);
    },

    // Setup PWA features
    setupPWA() {
        if (!this.config.enablePWA) return;

        // Register service worker
        this.registerServiceWorker();

        // Setup install prompt
        this.setupInstallPrompt();

        // Setup offline detection
        this.setupOfflineDetection();
    },

    // Register service worker
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered:', registration);
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }
    },

    // Setup install prompt
    setupInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.state.deferredPrompt = e;
            this.showInstallPrompt();
        });
    },

    // Show install prompt
    showInstallPrompt() {
        const installButton = document.querySelector('.install-prompt');
        if (!installButton || !this.state.deferredPrompt) return;

        installButton.style.display = 'block';
        installButton.addEventListener('click', () => {
            this.state.deferredPrompt.prompt();
            this.state.deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                this.state.deferredPrompt = null;
                installButton.style.display = 'none';
            });
        });
    },

    // Setup offline detection
    setupOfflineDetection() {
        window.addEventListener('online', () => {
            this.showNotification('You are back online!', 'success');
        });

        window.addEventListener('offline', () => {
            this.showNotification('You are offline. Some features may not work.', 'warning');
        });
    },

    // Setup analytics
    setupAnalytics() {
        if (!this.config.enableAnalytics) return;

        // Initialize Google Analytics
        this.initGoogleAnalytics();

        // Track page views
        this.trackPageView();

        // Track user interactions
        this.trackUserInteractions();
    },

    // Initialize Google Analytics
    initGoogleAnalytics() {
        const gaId = CONFIG.analytics.googleAnalyticsId;
        if (!gaId || gaId === 'G-XXXXXXXXXX') return;

        // Load Google Analytics
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', gaId);

        window.gtag = gtag;
    },

    // Track page view
    trackPageView() {
        if (window.gtag) {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
    },

    // Track user interactions
    trackUserInteractions() {
        // Track button clicks
        document.addEventListener('click', (e) => {
            const button = e.target.closest('button, a');
            if (button && button.dataset.track) {
                this.trackEvent('button_click', {
                    button_text: button.textContent.trim(),
                    button_id: button.id || button.className
                });
            }
        });

        // Track form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.dataset.track) {
                this.trackEvent('form_submit', {
                    form_id: e.target.id || e.target.className
                });
            }
        });
    },

    // Track custom event
    trackEvent(eventName, parameters = {}) {
        if (window.gtag) {
            gtag('event', eventName, parameters);
        }
    },

    // Initialize all modules
    initializeModules() {
        // Initialize core modules
        this.state.modules.config = CONFIG;
        this.state.modules.utils = Utils;
        this.state.modules.animations = Animations;
        this.state.modules.navigation = Navigation;
        this.state.modules.theme = Theme;
        this.state.modules.language = Language;
        this.state.modules.testimonials = Testimonials;
        this.state.modules.projects = Projects;

        // Initialize each module
        Object.values(this.state.modules).forEach(module => {
            if (module && typeof module.init === 'function') {
                try {
                    module.init();
                } catch (error) {
                    this.handleError(error, `Module initialization: ${module.constructor.name}`);
                }
            }
        });
    },

    // Setup event listeners
    setupEventListeners() {
        // Window events
        window.addEventListener('resize', Utils.performance.debounce(() => {
            this.handleResize();
        }, 250));

        window.addEventListener('scroll', Utils.performance.throttle(() => {
            this.handleScroll();
        }, 100));

        // Theme change events
        document.addEventListener('themechange', (e) => {
            this.handleThemeChange(e.detail);
        });

        // Language change events
        document.addEventListener('languagechange', (e) => {
            this.handleLanguageChange(e.detail);
        });

        // Custom module events
        document.addEventListener('testimonials_event', (e) => {
            this.handleTestimonialsEvent(e.detail);
        });

        document.addEventListener('projects_event', (e) => {
            this.handleProjectsEvent(e.detail);
        });
    },

    // Setup page-specific features
    setupPageSpecificFeatures() {
        const currentPage = this.getCurrentPage();
        this.state.currentPage = currentPage;

        switch (currentPage) {
            case 'home':
                this.setupHomePage();
                break;
            case 'about':
                this.setupAboutPage();
                break;
            case 'projects':
                this.setupProjectsPage();
                break;
            case 'contact':
                this.setupContactPage();
                break;
            case 'blog':
                this.setupBlogPage();
                break;
        }
    },

    // Setup home page features
    setupHomePage() {
        // Initialize hero animations
        this.initHeroAnimations();

        // Setup scroll-triggered animations
        this.setupScrollAnimations();

        // Setup contact form
        this.setupContactForm();
    },

    // Setup about page features
    setupAboutPage() {
        // Initialize skill bar animations
        this.initSkillBarAnimations();

        // Setup timeline animations
        this.setupTimelineAnimations();
    },

    // Setup projects page features
    setupProjectsPage() {
        // Initialize project filters
        this.initProjectFilters();

        // Setup project modals
        this.setupProjectModals();
    },

    // Setup contact page features
    setupContactPage() {
        // Setup contact form validation
        this.setupContactFormValidation();

        // Setup map integration
        this.setupMapIntegration();
    },

    // Setup blog page features
    setupBlogPage() {
        // Setup blog search
        this.setupBlogSearch();

        // Setup blog categories
        this.setupBlogCategories();
    },

    // Initialize hero animations
    initHeroAnimations() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        // Typing effect
        const typingElement = heroSection.querySelector('.typing-text');
        if (typingElement) {
            // Typing animation is handled by Animations module
        }

        // Particle effect
        const particleContainer = heroSection.querySelector('.particles');
        if (particleContainer) {
            // Particle animation is handled by Animations module
        }
    },

    // Setup scroll animations
    setupScrollAnimations() {
        // Scroll animations are handled by Animations module
    },

    // Setup contact form
    setupContactForm() {
        const contactForm = document.querySelector('#contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleContactFormSubmit(e.target);
        });
    },

    // Handle contact form submission
    async handleContactFormSubmit(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        try {
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Validate form data
            if (!this.validateContactForm(data)) {
                return;
            }

            // Submit to Formspree
            const response = await fetch(CONFIG.contact.formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                this.showNotification('Message sent successfully!', 'success');
                form.reset();
                
                // Track form submission
                this.trackEvent('contact_form_submitted', {
                    form_id: form.id
                });
            } else {
                throw new Error('Failed to send message');
            }

        } catch (error) {
            this.handleError(error, 'Contact Form Submission');
            this.showNotification('Error sending message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    },

    // Validate contact form
    validateContactForm(data) {
        const errors = [];

        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }

        if (!data.email || !Utils.validation.isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }

        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }

        if (errors.length > 0) {
            this.showNotification(errors.join('\n'), 'error');
            return false;
        }

        return true;
    },

    // Initialize skill bar animations
    initSkillBarAnimations() {
        // Skill bar animations are handled by Animations module
    },

    // Setup timeline animations
    setupTimelineAnimations() {
        // Timeline animations are handled by Animations module
    },

    // Initialize project filters
    initProjectFilters() {
        // Project filters are handled by Projects module
    },

    // Setup project modals
    setupProjectModals() {
        // Project modals are handled by Projects module
    },

    // Setup contact form validation
    setupContactFormValidation() {
        // Contact form validation is handled by main contact form setup
    },

    // Setup map integration
    setupMapIntegration() {
        // Map integration would be implemented here if needed
    },

    // Setup blog search
    setupBlogSearch() {
        // Blog search would be implemented here if needed
    },

    // Setup blog categories
    setupBlogCategories() {
        // Blog categories would be implemented here if needed
    },

    // Handle window resize
    handleResize() {
        // Update responsive layouts
        this.updateResponsiveLayout();

        // Notify modules of resize
        Object.values(this.state.modules).forEach(module => {
            if (module && typeof module.handleResize === 'function') {
                module.handleResize();
            }
        });
    },

    // Handle scroll
    handleScroll() {
        // Update scroll-based features
        this.updateScrollFeatures();

        // Notify modules of scroll
        Object.values(this.state.modules).forEach(module => {
            if (module && typeof module.handleScroll === 'function') {
                module.handleScroll();
            }
        });
    },

    // Handle theme change
    handleThemeChange(detail) {
        // Track theme change
        this.trackEvent('theme_changed', {
            theme: detail.theme,
            previous_theme: detail.previousTheme
        });
    },

    // Handle language change
    handleLanguageChange(detail) {
        // Track language change
        this.trackEvent('language_changed', {
            language: detail.language,
            previous_language: detail.previousLanguage
        });
    },

    // Handle testimonials event
    handleTestimonialsEvent(detail) {
        // Track testimonials interactions
        this.trackEvent('testimonials_interaction', detail);
    },

    // Handle projects event
    handleProjectsEvent(detail) {
        // Track projects interactions
        this.trackEvent('projects_interaction', detail);
    },

    // Update responsive layout
    updateResponsiveLayout() {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

        document.body.className = document.body.className.replace(/\bdevice-\w+\b/g, '');
        document.body.classList.add(`device-${isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}`);
    },

    // Update scroll features
    updateScrollFeatures() {
        // Update scroll progress bar
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = `${scrollPercent}%`;
        }

        // Update back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 300) {
                this.addClass(backToTop, 'visible');
            } else {
                this.removeClass(backToTop, 'visible');
            }
        }
    },

    // Show notification
    showNotification(message, type = 'info', duration = 5000) {
        const notification = Utils.dom.create('div', {
            className: `notification notification-${type}`,
            innerHTML: `
                <div class="notification-content">
                    <span class="notification-message">${message}</span>
                    <button class="notification-close" aria-label="Close notification">×</button>
                </div>
            `
        });

        // Add event listeners
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            this.removeNotification(notification);
        });

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            this.addClass(notification, 'show');
        }, 100);

        // Auto remove after duration
        setTimeout(() => {
            this.removeNotification(notification);
        }, duration);

        // Announce to screen readers
        this.announceToScreenReader(message);
    },

    // Remove notification
    removeNotification(notification) {
        this.removeClass(notification, 'show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    },

    // Announce to screen reader
    announceToScreenReader(message) {
        const liveRegion = document.querySelector('[aria-live="polite"]');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    },

    // Get current page
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        
        if (page === 'index.html' || page === '') return 'home';
        return page.replace('.html', '');
    },

    // On page loaded
    onPageLoaded() {
        // Track page load completion
        this.trackEvent('page_loaded', {
            page: this.state.currentPage,
            load_time: this.state.performanceMetrics.totalLoadTime
        });

        // Initialize any deferred features
        this.initializeDeferredFeatures();
    },

    // Initialize deferred features
    initializeDeferredFeatures() {
        // Lazy load images
        this.lazyLoadImages();

        // Initialize intersection observers
        this.initIntersectionObservers();

        // Setup any remaining features
        this.setupRemainingFeatures();
    },

    // Lazy load images
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    },

    // Initialize intersection observers
    initIntersectionObservers() {
        // Intersection observers are handled by individual modules
    },

    // Setup remaining features
    setupRemainingFeatures() {
        // Any remaining feature setup
    },

    // Mark as initialized
    markAsInitialized() {
        this.state.isInitialized = true;
        document.body.classList.add('app-initialized');
        
        // Dispatch initialization event
        const event = new CustomEvent('app:initialized', {
            detail: {
                modules: Object.keys(this.state.modules),
                performance: this.state.performanceMetrics
            }
        });
        document.dispatchEvent(event);
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

    // Get module
    getModule(name) {
        return this.state.modules[name];
    },

    // Check if app is initialized
    isInitialized() {
        return this.state.isInitialized;
    },

    // Check if app is loaded
    isLoaded() {
        return this.state.isLoaded;
    },

    // Get performance metrics
    getPerformanceMetrics() {
        return { ...this.state.performanceMetrics };
    },

    // Cleanup application
    cleanup() {
        // Cleanup all modules
        Object.values(this.state.modules).forEach(module => {
            if (module && typeof module.cleanup === 'function') {
                try {
                    module.cleanup();
                } catch (error) {
                    console.error('Error cleaning up module:', error);
                }
            }
        });

        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('scroll', this.handleScroll);
        document.removeEventListener('themechange', this.handleThemeChange);
        document.removeEventListener('languagechange', this.handleLanguageChange);
        document.removeEventListener('testimonials_event', this.handleTestimonialsEvent);
        document.removeEventListener('projects_event', this.handleProjectsEvent);

        // Clear state
        this.state.modules = {};
        this.state.isInitialized = false;
        this.state.isLoaded = false;
    }
};

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        App.init();
    });
} else {
    App.init();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}