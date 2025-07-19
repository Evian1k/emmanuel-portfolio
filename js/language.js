// Language Module (English Only)
const Language = {
    // Configuration
    config: {
        default: 'en',
        available: ['en'],
        storageKey: 'portfolio-language',
        translations: {
            en: {
                // Navigation
                "nav.home": "Home",
                "nav.about": "About",
                "nav.projects": "Projects",
                "nav.contact": "Contact",
                "nav.blog": "Blog",
                
                // Hero Section
                "hero.greeting": "Hello, I'm",
                "hero.name": "John Developer",
                "hero.title": "Full Stack Developer",
                "hero.subtitle": "Creating innovative digital experiences",
                "hero.cta": "View My Work",
                "hero.scroll": "Scroll Down",
                
                // About Section
                "about.title": "About Me",
                "about.subtitle": "Passionate developer with 5+ years of experience",
                "about.description": "I'm a full-stack developer passionate about creating beautiful, functional, and user-centered digital experiences. With 5+ years of experience in web development, I am always looking for new and innovative ways to bring my clients' visions to life.",
                "about.experience": "Years of Experience",
                "about.projects": "Projects Completed",
                "about.clients": "Happy Clients",
                "about.awards": "Awards Won",
                
                // Skills Section
                "skills.title": "Skills & Technologies",
                "skills.subtitle": "Technologies I work with",
                
                // Projects Section
                "projects.title": "Featured Projects",
                "projects.subtitle": "Some of my recent work",
                "projects.viewAll": "View All Projects",
                "projects.filter.all": "All",
                "projects.filter.web": "Web Apps",
                "projects.filter.mobile": "Mobile Apps",
                "projects.filter.design": "UI/UX Design",
                "projects.filter.other": "Other",
                "projects.search": "Search projects...",
                "projects.sort": "Sort by",
                "projects.sort.date": "Date",
                "projects.sort.name": "Name",
                "projects.sort.category": "Category",
                "projects.loadMore": "Load More",
                "projects.viewProject": "View Project",
                "projects.viewCode": "View Code",
                "projects.private": "Private Repository",
                
                // Testimonials Section
                "testimonials.title": "What Clients Say",
                "testimonials.subtitle": "Testimonials from satisfied clients",
                
                // Contact Section
                "contact.title": "Get In Touch",
                "contact.subtitle": "Let's work together",
                "contact.name": "Your Name",
                "contact.email": "Your Email",
                "contact.subject": "Subject",
                "contact.message": "Your Message",
                "contact.send": "Send Message",
                "contact.sending": "Sending...",
                "contact.success": "Message sent successfully!",
                "contact.error": "Error sending message. Please try again.",
                
                // Footer
                "footer.copyright": "© 2024 John Developer. All rights reserved.",
                "footer.madeWith": "Made with ❤️ by John Developer",
                
                // Common
                "common.loading": "Loading...",
                "common.error": "Error",
                "common.success": "Success",
                "common.close": "Close",
                "common.back": "Back",
                "common.next": "Next",
                "common.previous": "Previous",
                "common.view": "View",
                "common.edit": "Edit",
                "common.delete": "Delete",
                "common.save": "Save",
                "common.cancel": "Cancel",
                "common.yes": "Yes",
                "common.no": "No",
                "common.ok": "OK",
                "common.learnMore": "Learn More",
                "common.readMore": "Read More",
                "common.seeMore": "See More",
                "common.seeLess": "See Less",
                "common.download": "Download",
                "common.upload": "Upload",
                "common.search": "Search",
                "common.filter": "Filter",
                "common.sort": "Sort",
                "common.refresh": "Refresh",
                "common.reload": "Reload",
                "common.backToTop": "Back to Top"
            }
        }
    },

    // State
    state: {
        currentLanguage: 'en',
        languageToggle: null,
        translatedElements: []
    },

    // Initialize language system
    init() {
        this.setupElements();
        this.hideLanguageToggle();
        this.loadLanguage();
        this.translatePage();
        this.updateMetaTags();
    },

    // Setup DOM elements
    setupElements() {
        this.state.languageToggle = document.querySelector('.language-toggle');
        
        // Find all elements with data-translate attribute
        this.state.translatedElements = Array.from(document.querySelectorAll('[data-translate]'));
    },

    // Hide language toggle button (English only)
    hideLanguageToggle() {
        if (this.state.languageToggle) {
            this.state.languageToggle.style.display = 'none';
            this.state.languageToggle.setAttribute('aria-hidden', 'true');
        }

        // Also hide any language selector dropdowns
        const languageSelectors = document.querySelectorAll('.language-selector, .lang-selector');
        languageSelectors.forEach(selector => {
            selector.style.display = 'none';
            selector.setAttribute('aria-hidden', 'true');
        });
    },

    // Load language from storage or use default
    loadLanguage() {
        const savedLanguage = Utils.storage.get(this.config.storageKey);
        
        if (savedLanguage && this.isValidLanguage(savedLanguage)) {
            this.setLanguage(savedLanguage);
        } else {
            this.setLanguage(this.config.default);
        }
    },

    // Set language
    setLanguage(language) {
        if (!this.isValidLanguage(language)) return;

        this.state.currentLanguage = language;
        
        // Save to storage
        Utils.storage.set(this.config.storageKey, language);
        
        // Update document language
        document.documentElement.lang = language;
        document.documentElement.setAttribute('data-lang', language);
        
        // Translate page content
        this.translatePage();
        
        // Update meta tags
        this.updateMetaTags();
        
        // Dispatch language change event
        this.dispatchLanguageChangeEvent(language);
    },

    // Translate page content
    translatePage() {
        this.state.translatedElements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (key) {
                const translation = this.getTranslation(key);
                if (translation) {
                    this.updateElementContent(element, translation);
                }
            }
        });
    },

    // Get translation for a key
    getTranslation(key) {
        const translations = this.config.translations[this.state.currentLanguage];
        return translations ? translations[key] : null;
    },

    // Update element content with translation
    updateElementContent(element, translation) {
        const tagName = element.tagName.toLowerCase();
        
        switch (tagName) {
            case 'input':
            case 'textarea':
                if (element.getAttribute('placeholder')) {
                    element.setAttribute('placeholder', translation);
                } else {
                    element.value = translation;
                }
                break;
            case 'img':
                if (element.getAttribute('alt')) {
                    element.setAttribute('alt', translation);
                }
                break;
            case 'meta':
                element.setAttribute('content', translation);
                break;
            default:
                element.textContent = translation;
                break;
        }
    },

    // Update meta tags for language
    updateMetaTags() {
        // Update html lang attribute
        document.documentElement.lang = this.state.currentLanguage;
        
        // Update meta language tag
        let metaLang = document.querySelector('meta[http-equiv="content-language"]');
        if (!metaLang) {
            metaLang = document.createElement('meta');
            metaLang.setAttribute('http-equiv', 'content-language');
            document.head.appendChild(metaLang);
        }
        metaLang.setAttribute('content', this.state.currentLanguage);
        
        // Update Open Graph locale
        let ogLocale = document.querySelector('meta[property="og:locale"]');
        if (!ogLocale) {
            ogLocale = document.createElement('meta');
            ogLocale.setAttribute('property', 'og:locale');
            document.head.appendChild(ogLocale);
        }
        ogLocale.setAttribute('content', this.state.currentLanguage);
        
        // Update Twitter card locale
        let twitterLocale = document.querySelector('meta[name="twitter:locale"]');
        if (!twitterLocale) {
            twitterLocale = document.createElement('meta');
            twitterLocale.setAttribute('name', 'twitter:locale');
            document.head.appendChild(twitterLocale);
        }
        twitterLocale.setAttribute('content', this.state.currentLanguage);
    },

    // Dispatch language change event
    dispatchLanguageChangeEvent(language) {
        const event = new CustomEvent('languagechange', {
            detail: {
                language: language,
                previousLanguage: this.state.currentLanguage
            }
        });
        document.dispatchEvent(event);
    },

    // Check if language is valid
    isValidLanguage(language) {
        return this.config.available.includes(language);
    },

    // Get current language
    getCurrentLanguage() {
        return this.state.currentLanguage;
    },

    // Get available languages
    getAvailableLanguages() {
        return [...this.config.available];
    },

    // Check if language is supported
    isLanguageSupported(language) {
        return this.config.available.includes(language);
    },

    // Get language name
    getLanguageName(language) {
        const languageNames = {
            'en': 'English'
        };
        return languageNames[language] || language;
    },

    // Get language direction (LTR/RTL)
    getLanguageDirection(language) {
        const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
        return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
    },

    // Format date according to language
    formatDate(date, options = {}) {
        const language = this.state.currentLanguage;
        
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options
        };
        
        return new Date(date).toLocaleDateString(language, defaultOptions);
    },

    // Format number according to language
    formatNumber(number, options = {}) {
        const language = this.state.currentLanguage;
        
        return new Intl.NumberFormat(language, options).format(number);
    },

    // Format currency according to language
    formatCurrency(amount, currency = 'USD', options = {}) {
        const language = this.state.currentLanguage;
        
        return new Intl.NumberFormat(language, {
            style: 'currency',
            currency: currency,
            ...options
        }).format(amount);
    },

    // Add translation to element
    addTranslation(element, key) {
        if (!element || !key) return;
        
        element.setAttribute('data-translate', key);
        this.state.translatedElements.push(element);
        
        // Translate immediately if language is already set
        const translation = this.getTranslation(key);
        if (translation) {
            this.updateElementContent(element, translation);
        }
    },

    // Remove translation from element
    removeTranslation(element) {
        if (!element) return;
        
        element.removeAttribute('data-translate');
        const index = this.state.translatedElements.indexOf(element);
        if (index > -1) {
            this.state.translatedElements.splice(index, 1);
        }
    },

    // Translate specific element
    translateElement(element, key) {
        if (!element || !key) return;
        
        const translation = this.getTranslation(key);
        if (translation) {
            this.updateElementContent(element, translation);
        }
    },

    // Translate all elements with a specific key
    translateElementsByKey(key) {
        const elements = document.querySelectorAll(`[data-translate="${key}"]`);
        elements.forEach(element => {
            this.translateElement(element, key);
        });
    },

    // Add dynamic translation
    addDynamicTranslation(key, translation) {
        if (!this.config.translations[this.state.currentLanguage]) {
            this.config.translations[this.state.currentLanguage] = {};
        }
        
        this.config.translations[this.state.currentLanguage][key] = translation;
        
        // Update all elements with this key
        this.translateElementsByKey(key);
    },

    // Remove dynamic translation
    removeDynamicTranslation(key) {
        if (this.config.translations[this.state.currentLanguage]) {
            delete this.config.translations[this.state.currentLanguage][key];
        }
    },

    // Get all translation keys
    getAllTranslationKeys() {
        const keys = new Set();
        
        Object.values(this.config.translations).forEach(language => {
            Object.keys(language).forEach(key => keys.add(key));
        });
        
        return Array.from(keys);
    },

    // Check if translation key exists
    hasTranslation(key) {
        return this.getTranslation(key) !== null;
    },

    // Get missing translations
    getMissingTranslations() {
        const allKeys = this.getAllTranslationKeys();
        const missing = [];
        
        allKeys.forEach(key => {
            if (!this.hasTranslation(key)) {
                missing.push(key);
            }
        });
        
        return missing;
    },

    // Export translations
    exportTranslations() {
        return JSON.stringify(this.config.translations, null, 2);
    },

    // Import translations
    importTranslations(translations) {
        try {
            const parsed = JSON.parse(translations);
            this.config.translations = parsed;
            this.translatePage();
            return true;
        } catch (error) {
            console.error('Error importing translations:', error);
            return false;
        }
    },

    // Cleanup language system
    cleanup() {
        // Remove event listeners
        if (this.state.languageToggle) {
            this.state.languageToggle.removeEventListener('click', this.toggleLanguage);
        }
        
        // Clear state
        this.state.languageToggle = null;
        this.state.translatedElements = [];
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Language;
}