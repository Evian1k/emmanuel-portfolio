// Configuration file for Emmanuel Evian Portfolio

const CONFIG = {
    // Site Information
    site: {
        name: 'Emmanuel Evian',
        title: 'Software Developer Portfolio',
        description: 'Creative Software Developer building beautiful, functional web experiences',
        url: 'https://emmanuelevian.dev',
        email: 'emmanuelevian@gmail.com',
        phone: '+254746720669',
        location: 'Nairobi, Kenya'
    },

    // Social Media Links
    social: {
        github: 'https://github.com/Evian1k',
        linkedin: 'https://linkedin.com/in/emmanuelevian',
        instagram: 'https://instagram.com/Rizy_Glock',
        whatsapp: 'https://wa.me/254746720669',
        twitter: 'https://twitter.com/emmanuelevian'
    },

    // Contact Form Configuration
    contact: {
        formspree: {
            endpoint: 'https://formspree.io/f/xayrjvbp',
            method: 'POST'
        },
        emailjs: {
            serviceId: 'YOUR_SERVICE_ID',
            templateId: 'YOUR_TEMPLATE_ID',
            userId: 'YOUR_USER_ID'
        }
    },

    // GitHub API Configuration
    github: {
        username: 'Evian1k',
        apiUrl: 'https://api.github.com',
        pinnedRepos: 6
    },

    // Animation Settings
    animations: {
        scrollThreshold: 0.2,
        scrollMargin: '0px 0px -100px 0px',
        duration: 800,
        easing: 'cubic-bezier(0.77, 0, 0.18, 1)'
    },

    // Theme Configuration
    theme: {
        default: 'light',
        storageKey: 'portfolio-theme',
        transitionDuration: 300
    },

    // Language Configuration
    language: {
        default: 'en',
        storageKey: 'portfolio-language',
        supported: ['en', 'sw']
    },

    // Navigation Configuration
    navigation: {
        smoothScroll: true,
        activeClass: 'active',
        offset: 80
    },

    // Loader Configuration
    loader: {
        duration: 1000,
        fadeOutDuration: 500
    },

    // Testimonials Configuration
    testimonials: {
        autoPlay: true,
        interval: 5000,
        animationDuration: 500
    },

    // Skills Configuration
    skills: {
        animationDelay: 100,
        animationDuration: 1500
    },

    // Projects Configuration
    projects: {
        itemsPerPage: 6,
        filterOptions: ['all', 'web', 'mobile', 'fullstack', 'ui-ux']
    },

    // Analytics Configuration
    analytics: {
        googleAnalytics: {
            enabled: false,
            measurementId: 'GA_MEASUREMENT_ID'
        },
        plausible: {
            enabled: false,
            domain: 'emmanuelevian.dev'
        }
    },

    // Performance Configuration
    performance: {
        lazyLoading: true,
        imageOptimization: true,
        preloadCritical: true
    },

    // SEO Configuration
    seo: {
        defaultImage: '/images/preview.png',
        twitterHandle: '@emmanuelevian',
        author: 'Emmanuel Evian'
    },

    // PWA Configuration
    pwa: {
        name: 'Emmanuel Evian Portfolio',
        shortName: 'Evian Portfolio',
        description: 'Software Developer Portfolio',
        themeColor: '#ff0000',
        backgroundColor: '#ffffff',
        display: 'standalone',
        startUrl: '/',
        scope: '/',
        icons: [
            {
                src: '/images/favicon-192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: '/images/favicon-512x512.png',
                sizes: '512x512',
                type: 'image/png'
            }
        ]
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}