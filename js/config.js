// Configuration file for Emmanuel Evian Portfolio

const CONFIG = {
    // Site Information
    site: {
        name: "John Developer",
        title: "John Developer - Full Stack Developer & UI/UX Designer",
        description: "Professional full-stack developer specializing in modern web applications, mobile development, and cloud solutions. Creating innovative digital experiences with cutting-edge technologies.",
        keywords: "full stack developer, web developer, mobile developer, UI/UX designer, JavaScript, React, Node.js, Python, AWS",
        author: "John Developer",
        url: "https://johndeveloper.com",
        email: "john@johndeveloper.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA"
    },

    // Social Media Links
    social: {
        github: "https://github.com/johndeveloper",
        linkedin: "https://linkedin.com/in/johndeveloper",
        twitter: "https://twitter.com/johndeveloper",
        instagram: "https://instagram.com/johndeveloper",
        youtube: "https://youtube.com/@johndeveloper",
        dribbble: "https://dribbble.com/johndeveloper",
        behance: "https://behance.net/johndeveloper"
    },

    // Contact Form Configuration
    contact: {
        formspreeEndpoint: "https://formspree.io/f/xpzgwqwe", // Replace with your Formspree endpoint
        emailjsServiceId: "service_id", // Replace with your EmailJS service ID
        emailjsTemplateId: "template_id", // Replace with your EmailJS template ID
        emailjsUserId: "user_id" // Replace with your EmailJS user ID
    },

    // GitHub API Configuration
    github: {
        username: "johndeveloper", // Replace with your GitHub username
        apiUrl: "https://api.github.com",
        pinnedReposCount: 6,
        statsCacheTime: 3600000 // 1 hour in milliseconds
    },

    // Animation Configuration
    animations: {
        duration: 800,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        staggerDelay: 100,
        scrollThreshold: 0.1,
        heroTypingSpeed: 100,
        heroTypingDelay: 2000,
        particleCount: 50,
        skillBarDuration: 1500
    },

    // Theme Configuration
    theme: {
        defaultMode: "dark", // "dark" or "light"
        enableSystemPreference: true,
        transitionDuration: 300,
        colors: {
            primary: "#ff4444",
            secondary: "#ff6666",
            accent: "#ff8888",
            background: "#0a0a0a",
            surface: "#1a1a1a",
            text: "#ffffff",
            textSecondary: "#cccccc",
            border: "#333333",
            success: "#4caf50",
            warning: "#ff9800",
            error: "#f44336"
        }
    },

    // Language Configuration (English Only)
    language: {
        default: "en",
        available: ["en"],
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

    // Navigation Configuration
    navigation: {
        stickyHeader: true,
        mobileBreakpoint: 768,
        scrollOffset: 100,
        smoothScroll: true,
        activeSectionHighlight: true,
        backToTop: true,
        scrollProgress: true
    },

    // Loader Configuration
    loader: {
        enabled: true,
        duration: 2000,
        minDisplayTime: 1000
    },

    // Testimonials Configuration
    testimonials: {
        autoPlay: true,
        autoPlayInterval: 5000,
        showDots: true,
        showArrows: true,
        touchEnabled: true,
        keyboardEnabled: true
    },

    // Projects Configuration
    projects: {
        itemsPerPage: 6,
        enableFiltering: true,
        enableSearch: true,
        enableSorting: true,
        enablePagination: true,
        enableGitHubIntegration: true,
        showPrivateProjects: false
    },

    // Analytics Configuration
    analytics: {
        googleAnalyticsId: "G-XXXXXXXXXX", // Replace with your GA4 ID
        enableEventTracking: true,
        enablePageViews: true,
        enableUserTiming: true
    },

    // Performance Configuration
    performance: {
        lazyLoading: true,
        imageOptimization: true,
        minifyCSS: true,
        minifyJS: true,
        enableCaching: true,
        enableCompression: true
    },

    // SEO Configuration
    seo: {
        enableStructuredData: true,
        enableOpenGraph: true,
        enableTwitterCards: true,
        enableCanonical: true,
        enableRobots: true,
        enableSitemap: true
    },

    // PWA Configuration
    pwa: {
        enabled: true,
        name: "John Developer Portfolio",
        shortName: "John Dev",
        description: "Professional portfolio of John Developer",
        themeColor: "#ff4444",
        backgroundColor: "#0a0a0a",
        display: "standalone",
        orientation: "portrait",
        startUrl: "/",
        scope: "/",
        icons: [
            {
                src: "/images/icons/icon-72x72.png",
                sizes: "72x72",
                type: "image/png"
            },
            {
                src: "/images/icons/icon-96x96.png",
                sizes: "96x96",
                type: "image/png"
            },
            {
                src: "/images/icons/icon-128x128.png",
                sizes: "128x128",
                type: "image/png"
            },
            {
                src: "/images/icons/icon-144x144.png",
                sizes: "144x144",
                type: "image/png"
            },
            {
                src: "/images/icons/icon-152x152.png",
                sizes: "152x152",
                type: "image/png"
            },
            {
                src: "/images/icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/images/icons/icon-384x384.png",
                sizes: "384x384",
                type: "image/png"
            },
            {
                src: "/images/icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ]
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}