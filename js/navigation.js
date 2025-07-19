// Navigation module for Emmanuel Evian Portfolio

const Navigation = {
    // Configuration
    config: {
        stickyHeader: true,
        mobileBreakpoint: 768,
        scrollOffset: 100,
        smoothScroll: true,
        activeSectionHighlight: true,
        backToTop: true,
        scrollProgress: true,
        mobileMenuAnimation: true
    },

    // State
    state: {
        header: null,
        mobileMenu: null,
        mobileToggle: null,
        navLinks: [],
        sections: [],
        backToTopBtn: null,
        scrollProgressBar: null,
        isScrolling: false,
        scrollTimeout: null,
        activeSection: null,
        mobileMenuOpen: false
    },

    // Initialize navigation
    init() {
        this.setupElements();
        this.setupStickyHeader();
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupActiveSectionHighlight();
        this.setupBackToTop();
        this.setupScrollProgress();
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupBreadcrumbs();
    },

    // Setup DOM elements
    setupElements() {
        this.state.header = document.querySelector('header');
        this.state.mobileMenu = document.querySelector('.mobile-menu');
        this.state.mobileToggle = document.querySelector('.mobile-toggle');
        this.state.backToTopBtn = document.querySelector('.back-to-top');
        this.state.scrollProgressBar = document.querySelector('.scroll-progress');
        
        // Get navigation links
        this.state.navLinks = Array.from(document.querySelectorAll('.nav-link, .mobile-nav-link'));
        
        // Get sections for active highlighting
        this.state.sections = Array.from(document.querySelectorAll('section[id]'));
    },

    // Setup sticky header
    setupStickyHeader() {
        if (!this.config.stickyHeader || !this.state.header) return;

        const handleScroll = Utils.performance.throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > this.config.scrollOffset) {
                this.addClass(this.state.header, 'sticky');
            } else {
                this.removeClass(this.state.header, 'sticky');
            }
        }, 16);

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on load
    },

    // Setup smooth scrolling for navigation links
    setupSmoothScrolling() {
        if (!this.config.smoothScroll) return;

        this.state.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Only handle internal links
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    this.scrollToSection(href);
                }
            });
        });
    },

    // Scroll to section with offset
    scrollToSection(selector) {
        const target = document.querySelector(selector);
        if (!target) return;

        const headerHeight = this.state.header ? this.state.header.offsetHeight : 0;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (this.state.mobileMenuOpen) {
            this.closeMobileMenu();
        }
    },

    // Setup mobile menu
    setupMobileMenu() {
        if (!this.state.mobileToggle || !this.state.mobileMenu) return;

        // Toggle mobile menu
        this.state.mobileToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.state.mobileMenuOpen && 
                !this.state.mobileMenu.contains(e.target) && 
                !this.state.mobileToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.mobileMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Handle mobile nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    },

    // Toggle mobile menu
    toggleMobileMenu() {
        if (this.state.mobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    },

    // Open mobile menu with animation
    openMobileMenu() {
        if (!this.state.mobileMenu || this.state.mobileMenuOpen) return;

        this.state.mobileMenuOpen = true;
        this.addClass(this.state.mobileMenu, 'active');
        this.addClass(this.state.mobileToggle, 'active');
        this.addClass(document.body, 'mobile-menu-open');

        // Animate menu items
        if (this.config.mobileMenuAnimation) {
            const menuItems = this.state.mobileMenu.querySelectorAll('.mobile-nav-link');
            menuItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                this.addClass(item, 'animate-in');
            });
        }

        // Focus management
        this.trapFocus(this.state.mobileMenu);
    },

    // Close mobile menu with animation
    closeMobileMenu() {
        if (!this.state.mobileMenu || !this.state.mobileMenuOpen) return;

        this.state.mobileMenuOpen = false;
        this.removeClass(this.state.mobileMenu, 'active');
        this.removeClass(this.state.mobileToggle, 'active');
        this.removeClass(document.body, 'mobile-menu-open');

        // Remove animation classes
        const menuItems = this.state.mobileMenu.querySelectorAll('.mobile-nav-link');
        menuItems.forEach(item => {
            this.removeClass(item, 'animate-in');
            item.style.animationDelay = '';
        });

        // Restore focus
        this.restoreFocus();
    },

    // Setup active section highlighting
    setupActiveSectionHighlight() {
        if (!this.config.activeSectionHighlight) return;

        const handleScroll = Utils.performance.throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const headerHeight = this.state.header ? this.state.header.offsetHeight : 0;

            let currentSection = null;

            this.state.sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 100;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                    currentSection = section;
                }
            });

            if (currentSection && currentSection !== this.state.activeSection) {
                this.updateActiveSection(currentSection.id);
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on load
    },

    // Update active section in navigation
    updateActiveSection(sectionId) {
        this.state.activeSection = sectionId;

        // Remove active class from all links
        this.state.navLinks.forEach(link => {
            this.removeClass(link, 'active');
        });

        // Add active class to current section link
        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
            this.addClass(activeLink, 'active');
        }
    },

    // Setup back to top button
    setupBackToTop() {
        if (!this.config.backToTop || !this.state.backToTopBtn) return;

        const handleScroll = Utils.performance.throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 300) {
                this.addClass(this.state.backToTopBtn, 'visible');
            } else {
                this.removeClass(this.state.backToTopBtn, 'visible');
            }
        }, 100);

        // Back to top click handler
        this.state.backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on load
    },

    // Setup scroll progress bar
    setupScrollProgress() {
        if (!this.config.scrollProgress || !this.state.scrollProgressBar) return;

        const handleScroll = Utils.performance.throttle(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            this.state.scrollProgressBar.style.width = `${scrollPercent}%`;
        }, 16);

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check on load
    },

    // Setup keyboard navigation
    setupKeyboardNavigation() {
        // Handle arrow key navigation in mobile menu
        document.addEventListener('keydown', (e) => {
            if (!this.state.mobileMenuOpen) return;

            const menuItems = Array.from(this.state.mobileMenu.querySelectorAll('.mobile-nav-link'));
            const currentIndex = menuItems.findIndex(item => item === document.activeElement);

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % menuItems.length;
                    menuItems[nextIndex].focus();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
                    menuItems[prevIndex].focus();
                    break;
                case 'Home':
                    e.preventDefault();
                    menuItems[0].focus();
                    break;
                case 'End':
                    e.preventDefault();
                    menuItems[menuItems.length - 1].focus();
                    break;
            }
        });
    },

    // Setup focus management
    setupFocusManagement() {
        // Store last focused element before opening mobile menu
        let lastFocusedElement = null;

        // Update focus trap when mobile menu opens
        const originalOpenMobileMenu = this.openMobileMenu;
        this.openMobileMenu = function() {
            lastFocusedElement = document.activeElement;
            originalOpenMobileMenu.call(this);
        };

        // Restore focus when mobile menu closes
        const originalCloseMobileMenu = this.closeMobileMenu;
        this.closeMobileMenu = function() {
            originalCloseMobileMenu.call(this);
            if (lastFocusedElement) {
                lastFocusedElement.focus();
                lastFocusedElement = null;
            }
        };
    },

    // Trap focus within mobile menu
    trapFocus(container) {
        const focusableElements = container.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (firstElement) {
            firstElement.focus();
        }

        container.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    },

    // Restore focus
    restoreFocus() {
        // Focus management is handled in setupFocusManagement
    },

    // Setup breadcrumb navigation
    setupBreadcrumbs() {
        const breadcrumbContainer = document.querySelector('.breadcrumb');
        if (!breadcrumbContainer) return;

        const updateBreadcrumbs = () => {
            const currentSection = this.state.activeSection;
            if (!currentSection) return;

            const sectionTitle = this.getSectionTitle(currentSection);
            breadcrumbContainer.innerHTML = `
                <a href="#home">Home</a>
                <span class="separator">/</span>
                <span class="current">${sectionTitle}</span>
            `;
        };

        // Update breadcrumbs when active section changes
        const originalUpdateActiveSection = this.updateActiveSection;
        this.updateActiveSection = function(sectionId) {
            originalUpdateActiveSection.call(this, sectionId);
            updateBreadcrumbs();
        };
    },

    // Get section title for breadcrumbs
    getSectionTitle(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return sectionId;

        const titleElement = section.querySelector('h1, h2, h3');
        return titleElement ? titleElement.textContent : sectionId;
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

    // Get current scroll position
    getScrollPosition() {
        return window.pageYOffset || document.documentElement.scrollTop;
    },

    // Check if element is in viewport
    isInViewport(element, threshold = 0) {
        return Utils.dom.isInViewport(element, threshold);
    },

    // Smooth scroll to element
    scrollToElement(element, offset = 0) {
        if (!element) return;

        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },

    // Update navigation state
    updateState() {
        // Update active section
        this.setupActiveSectionHighlight();
        
        // Update back to top button
        if (this.config.backToTop) {
            this.setupBackToTop();
        }
        
        // Update scroll progress
        if (this.config.scrollProgress) {
            this.setupScrollProgress();
        }
    },

    // Cleanup navigation
    cleanup() {
        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
        document.removeEventListener('click', this.handleDocumentClick);
        document.removeEventListener('keydown', this.handleKeydown);

        // Close mobile menu if open
        if (this.state.mobileMenuOpen) {
            this.closeMobileMenu();
        }

        // Clear state
        this.state.navLinks = [];
        this.state.sections = [];
        this.state.activeSection = null;
        this.state.mobileMenuOpen = false;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navigation;
} else {
    window.Navigation = Navigation;
}