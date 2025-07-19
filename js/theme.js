// Theme Module
const Theme = {
    // Configuration
    config: {
        defaultMode: 'dark',
        enableSystemPreference: true,
        transitionDuration: 300,
        storageKey: 'portfolio-theme',
        colors: {
            light: {
                primary: '#ff4444',
                secondary: '#ff6666',
                accent: '#ff8888',
                background: '#ffffff',
                surface: '#f8f9fa',
                text: '#333333',
                textSecondary: '#666666',
                border: '#e9ecef',
                success: '#28a745',
                warning: '#ffc107',
                error: '#dc3545'
            },
            dark: {
                primary: '#ff4444',
                secondary: '#ff6666',
                accent: '#ff8888',
                background: '#0a0a0a',
                surface: '#1a1a1a',
                text: '#ffffff',
                textSecondary: '#cccccc',
                border: '#333333',
                success: '#4caf50',
                warning: '#ff9800',
                error: '#f44336'
            }
        }
    },

    // State
    state: {
        currentTheme: 'dark',
        themeToggle: null,
        themeIcon: null,
        isTransitioning: false,
        systemPreference: null
    },

    // Initialize theme
    init() {
        this.setupElements();
        this.detectSystemPreference();
        this.loadTheme();
        this.setupEventListeners();
        this.updateThemeColor();
    },

    // Setup DOM elements
    setupElements() {
        this.state.themeToggle = document.querySelector('.theme-toggle');
        this.state.themeIcon = document.querySelector('.theme-icon');
    },

    // Detect system preference
    detectSystemPreference() {
        if (!this.config.enableSystemPreference) return;

        this.state.systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            this.state.systemPreference = e.matches ? 'dark' : 'light';
            
            // Only update if user hasn't manually set a theme
            const savedTheme = Utils.storage.get(this.config.storageKey);
            if (!savedTheme) {
                this.setTheme(this.state.systemPreference);
            }
        });
    },

    // Load theme from storage or use default
    loadTheme() {
        const savedTheme = Utils.storage.get(this.config.storageKey);
        
        if (savedTheme && this.isValidTheme(savedTheme)) {
            this.setTheme(savedTheme);
        } else if (this.config.enableSystemPreference && this.state.systemPreference) {
            this.setTheme(this.state.systemPreference);
        } else {
            this.setTheme(this.config.defaultMode);
        }
    },

    // Setup event listeners
    setupEventListeners() {
        if (this.state.themeToggle) {
            this.state.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Keyboard shortcut (Ctrl/Cmd + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    },

    // Toggle between light and dark themes
    toggleTheme() {
        if (this.state.isTransitioning) return;

        const newTheme = this.state.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    },

    // Set theme
    setTheme(theme) {
        if (!this.isValidTheme(theme) || this.state.isTransitioning) return;

        this.state.isTransitioning = true;
        this.state.currentTheme = theme;

        // Apply theme colors
        this.applyThemeColors(theme);

        // Update UI elements
        this.updateThemeUI(theme);

        // Save to storage
        Utils.storage.set(this.config.storageKey, theme);

        // Update meta theme color
        this.updateThemeColor();

        // Dispatch theme change event
        this.dispatchThemeChangeEvent(theme);

        // End transition
        setTimeout(() => {
            this.state.isTransitioning = false;
        }, this.config.transitionDuration);
    },

    // Apply theme colors to CSS custom properties
    applyThemeColors(theme) {
        const colors = this.config.colors[theme];
        const root = document.documentElement;

        // Set CSS custom properties
        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });

        // Add theme class to body
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${theme}`);

        // Add transition class during theme change
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, this.config.transitionDuration);
    },

    // Update theme UI elements
    updateThemeUI(theme) {
        // Update theme toggle button
        if (this.state.themeToggle) {
            this.state.themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
            this.state.themeToggle.setAttribute('data-theme', theme);
        }

        // Update theme icon
        if (this.state.themeIcon) {
            this.updateThemeIcon(theme);
        }

        // Update other theme-aware elements
        this.updateThemeAwareElements(theme);
    },

    // Update theme icon
    updateThemeIcon(theme) {
        const icon = this.state.themeIcon;
        
        if (theme === 'light') {
            icon.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
            `;
        } else {
            icon.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
            `;
        }
    },

    // Update theme-aware elements
    updateThemeAwareElements(theme) {
        // Update favicon
        this.updateFavicon(theme);

        // Update social media meta tags
        this.updateSocialMetaTags(theme);

        // Update charts and graphs if they exist
        this.updateCharts(theme);

        // Update code syntax highlighting
        this.updateSyntaxHighlighting(theme);
    },

    // Update favicon based on theme
    updateFavicon(theme) {
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            const faviconPath = theme === 'light' ? '/images/favicon-light.png' : '/images/favicon-dark.png';
            favicon.href = faviconPath;
        }
    },

    // Update social media meta tags
    updateSocialMetaTags(theme) {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.content = this.config.colors[theme].primary;
        }

        // Update Open Graph theme color
        const ogThemeColor = document.querySelector('meta[property="og:theme-color"]');
        if (ogThemeColor) {
            ogThemeColor.content = this.config.colors[theme].primary;
        }
    },

    // Update charts and graphs
    updateCharts(theme) {
        // This would be implemented if using chart libraries
        // Example: Chart.js, D3.js, etc.
        const charts = document.querySelectorAll('[data-chart]');
        charts.forEach(chart => {
            // Update chart theme
            if (window.updateChartTheme) {
                window.updateChartTheme(chart, theme);
            }
        });
    },

    // Update syntax highlighting
    updateSyntaxHighlighting(theme) {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            block.className = block.className.replace(/theme-\w+/g, `theme-${theme}`);
        });
    },

    // Update meta theme color
    updateThemeColor() {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.content = this.config.colors[this.state.currentTheme].primary;
        }
    },

    // Dispatch theme change event
    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themechange', {
            detail: {
                theme: theme,
                previousTheme: this.state.currentTheme
            }
        });
        document.dispatchEvent(event);
    },

    // Check if theme is valid
    isValidTheme(theme) {
        return ['light', 'dark'].includes(theme);
    },

    // Get current theme
    getCurrentTheme() {
        return this.state.currentTheme;
    },

    // Get theme colors
    getThemeColors(theme = null) {
        const targetTheme = theme || this.state.currentTheme;
        return this.config.colors[targetTheme] || this.config.colors[this.config.defaultMode];
    },

    // Check if system preference is available
    hasSystemPreference() {
        return this.config.enableSystemPreference && this.state.systemPreference !== null;
    },

    // Get system preference
    getSystemPreference() {
        return this.state.systemPreference;
    },

    // Check if theme is manually set
    isManuallySet() {
        return Utils.storage.get(this.config.storageKey) !== null;
    },

    // Reset to system preference
    resetToSystemPreference() {
        if (this.hasSystemPreference()) {
            this.setTheme(this.state.systemPreference);
            Utils.storage.remove(this.config.storageKey);
        }
    },

    // Add theme transition styles
    addTransitionStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .theme-transitioning * {
                transition: background-color ${this.config.transitionDuration}ms ease,
                            color ${this.config.transitionDuration}ms ease,
                            border-color ${this.config.transitionDuration}ms ease,
                            box-shadow ${this.config.transitionDuration}ms ease !important;
            }
        `;
        document.head.appendChild(style);
    },

    // Create theme toggle button
    createThemeToggle() {
        const toggle = Utils.dom.create('button', {
            className: 'theme-toggle',
            'aria-label': 'Toggle theme',
            'data-theme': this.state.currentTheme
        });

        const icon = Utils.dom.create('span', {
            className: 'theme-icon'
        });

        toggle.appendChild(icon);
        this.updateThemeIcon(this.state.currentTheme);

        return toggle;
    },

    // Add theme toggle to header
    addThemeToggleToHeader() {
        const header = document.querySelector('header');
        if (!header) return;

        const nav = header.querySelector('nav');
        if (!nav) return;

        const toggle = this.createThemeToggle();
        nav.appendChild(toggle);

        // Update state
        this.state.themeToggle = toggle;
        this.state.themeIcon = toggle.querySelector('.theme-icon');

        // Add event listener
        toggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    },

    // Initialize theme-aware components
    initThemeAwareComponents() {
        // Initialize charts
        this.initCharts();

        // Initialize syntax highlighting
        this.initSyntaxHighlighting();

        // Initialize custom components
        this.initCustomComponents();
    },

    // Initialize charts with theme
    initCharts() {
        // This would initialize chart libraries with current theme
        if (window.initCharts) {
            window.initCharts(this.state.currentTheme);
        }
    },

    // Initialize syntax highlighting with theme
    initSyntaxHighlighting() {
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            block.classList.add(`theme-${this.state.currentTheme}`);
        });
    },

    // Initialize custom components
    initCustomComponents() {
        // Initialize any custom components that need theme awareness
        const themeAwareComponents = document.querySelectorAll('[data-theme-aware]');
        themeAwareComponents.forEach(component => {
            if (component.initTheme) {
                component.initTheme(this.state.currentTheme);
            }
        });
    },

    // Update all theme-aware components
    updateAllComponents(theme) {
        this.updateCharts(theme);
        this.updateSyntaxHighlighting(theme);
        this.updateCustomComponents(theme);
    },

    // Update custom components
    updateCustomComponents(theme) {
        const themeAwareComponents = document.querySelectorAll('[data-theme-aware]');
        themeAwareComponents.forEach(component => {
            if (component.updateTheme) {
                component.updateTheme(theme);
            }
        });
    },

    // Cleanup theme
    cleanup() {
        // Remove event listeners
        if (this.state.themeToggle) {
            this.state.themeToggle.removeEventListener('click', this.toggleTheme);
        }

        // Remove transition styles
        const transitionStyle = document.querySelector('style[data-theme-transition]');
        if (transitionStyle) {
            transitionStyle.remove();
        }

        // Clear state
        this.state.themeToggle = null;
        this.state.themeIcon = null;
        this.state.isTransitioning = false;
        this.state.systemPreference = null;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Theme;
}