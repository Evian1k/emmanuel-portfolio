// Utility Functions
const Utils = {
    // DOM Manipulation
    dom: {
        // Get element by selector
        get: (selector) => {
            return document.querySelector(selector);
        },

        // Get all elements by selector
        getAll: (selector) => {
            return document.querySelectorAll(selector);
        },

        // Create element with attributes
        create: (tag, attributes = {}, children = []) => {
            const element = document.createElement(tag);
            
            // Set attributes
            Object.keys(attributes).forEach(key => {
                if (key === 'className') {
                    element.className = attributes[key];
                } else if (key === 'textContent') {
                    element.textContent = attributes[key];
                } else if (key === 'innerHTML') {
                    element.innerHTML = attributes[key];
                } else {
                    element.setAttribute(key, attributes[key]);
                }
            });

            // Append children
            children.forEach(child => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else {
                    element.appendChild(child);
                }
            });

            return element;
        },

        // Add event listener with options
        on: (element, event, handler, options = {}) => {
            element.addEventListener(event, handler, options);
            return () => element.removeEventListener(event, handler, options);
        },

        // Remove event listener
        off: (element, event, handler, options = {}) => {
            element.removeEventListener(event, handler, options);
        },

        // Toggle class
        toggleClass: (element, className) => {
            element.classList.toggle(className);
        },

        // Add class
        addClass: (element, className) => {
            element.classList.add(className);
        },

        // Remove class
        removeClass: (element, className) => {
            element.classList.remove(className);
        },

        // Check if element has class
        hasClass: (element, className) => {
            return element.classList.contains(className);
        },

        // Set CSS custom property
        setCSSProperty: (element, property, value) => {
            element.style.setProperty(property, value);
        },

        // Get CSS custom property
        getCSSProperty: (element, property) => {
            return getComputedStyle(element).getPropertyValue(property);
        },

        // Get element dimensions
        getDimensions: (element) => {
            const rect = element.getBoundingClientRect();
            return {
                width: rect.width,
                height: rect.height,
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX,
                right: rect.right + window.scrollX,
                bottom: rect.bottom + window.scrollY
            };
        },

        // Check if element is in viewport
        isInViewport: (element, threshold = 0) => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const windowWidth = window.innerWidth || document.documentElement.clientWidth;

            return (
                rect.top <= windowHeight * (1 - threshold) &&
                rect.bottom >= windowHeight * threshold &&
                rect.left <= windowWidth * (1 - threshold) &&
                rect.right >= windowWidth * threshold
            );
        },

        // Scroll element into view
        scrollIntoView: (element, options = {}) => {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
                ...options
            });
        }
    },

    // Animation Utilities
    animation: {
        // Fade in animation
        fadeIn: (element, duration = 300, delay = 0) => {
            element.style.opacity = '0';
            element.style.transition = `opacity ${duration}ms ease-in-out ${delay}ms`;
            
            setTimeout(() => {
                element.style.opacity = '1';
            }, delay);
        },

        // Fade out animation
        fadeOut: (element, duration = 300, delay = 0) => {
            element.style.transition = `opacity ${duration}ms ease-in-out ${delay}ms`;
            
            setTimeout(() => {
                element.style.opacity = '0';
            }, delay);
        },

        // Slide down animation
        slideDown: (element, duration = 300, delay = 0) => {
            element.style.height = '0';
            element.style.overflow = 'hidden';
            element.style.transition = `height ${duration}ms ease-in-out ${delay}ms`;
            
            setTimeout(() => {
                element.style.height = element.scrollHeight + 'px';
            }, delay);
        },

        // Slide up animation
        slideUp: (element, duration = 300, delay = 0) => {
            element.style.height = element.scrollHeight + 'px';
            element.style.overflow = 'hidden';
            element.style.transition = `height ${duration}ms ease-in-out ${delay}ms`;
            
            setTimeout(() => {
                element.style.height = '0';
            }, delay);
        },

        // Scale animation
        scale: (element, scale = 1, duration = 300, delay = 0) => {
            element.style.transform = `scale(${scale})`;
            element.style.transition = `transform ${duration}ms ease-in-out ${delay}ms`;
        },

        // Rotate animation
        rotate: (element, degrees = 0, duration = 300, delay = 0) => {
            element.style.transform = `rotate(${degrees}deg)`;
            element.style.transition = `transform ${duration}ms ease-in-out ${delay}ms`;
        },

        // Stagger animation for multiple elements
        stagger: (elements, animation, staggerDelay = 100) => {
            elements.forEach((element, index) => {
                setTimeout(() => {
                    animation(element);
                }, index * staggerDelay);
            });
        }
    },

    // Browser Detection
    browser: {
        // Check if browser supports Intersection Observer
        supportsIntersectionObserver: () => {
            return 'IntersectionObserver' in window;
        },

        // Check if browser supports CSS custom properties
        supportsCSSVariables: () => {
            return CSS.supports('--custom-property', 'value');
        },

        // Check if browser supports service workers
        supportsServiceWorker: () => {
            return 'serviceWorker' in navigator;
        },

        // Check if browser supports PWA install
        supportsPWAInstall: () => {
            return 'BeforeInstallPromptEvent' in window;
        },

        // Get browser name and version
        getInfo: () => {
            const userAgent = navigator.userAgent;
            let browser = 'Unknown';
            let version = 'Unknown';

            if (userAgent.includes('Chrome')) {
                browser = 'Chrome';
                version = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
            } else if (userAgent.includes('Firefox')) {
                browser = 'Firefox';
                version = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
            } else if (userAgent.includes('Safari')) {
                browser = 'Safari';
                version = userAgent.match(/Version\/(\d+)/)?.[1] || 'Unknown';
            } else if (userAgent.includes('Edge')) {
                browser = 'Edge';
                version = userAgent.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
            }

            return { browser, version };
        },

        // Check if device is mobile
        isMobile: () => {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },

        // Check if device is touch capable
        isTouch: () => {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        }
    },

    // Local Storage Management
    storage: {
        // Set item
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('Error saving to localStorage:', error);
                return false;
            }
        },

        // Get item
        get: (key, defaultValue = null) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return defaultValue;
            }
        },

        // Remove item
        remove: (key) => {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.error('Error removing from localStorage:', error);
                return false;
            }
        },

        // Clear all items
        clear: () => {
            try {
                localStorage.clear();
                return true;
            } catch (error) {
                console.error('Error clearing localStorage:', error);
                return false;
            }
        },

        // Check if storage is available
        isAvailable: () => {
            try {
                const test = '__storage_test__';
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch (error) {
                return false;
            }
        }
    },

    // Validation Utilities
    validation: {
        // Email validation
        isValidEmail: (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        // Phone validation
        isValidPhone: (phone) => {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            return phoneRegex.test(phone.replace(/\s/g, ''));
        },

        // URL validation
        isValidURL: (url) => {
            try {
                new URL(url);
                return true;
            } catch (error) {
                return false;
            }
        },

        // Required field validation
        isRequired: (value) => {
            return value !== null && value !== undefined && value.toString().trim() !== '';
        },

        // Min length validation
        minLength: (value, min) => {
            return value && value.toString().length >= min;
        },

        // Max length validation
        maxLength: (value, max) => {
            return value && value.toString().length <= max;
        }
    },

    // Formatting Utilities
    format: {
        // Format date
        date: (date, options = {}) => {
            const defaultOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                ...options
            };
            
            return new Date(date).toLocaleDateString(undefined, defaultOptions);
        },

        // Format number with commas
        number: (num) => {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },

        // Format currency
        currency: (amount, currency = 'USD', locale = 'en-US') => {
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currency
            }).format(amount);
        },

        // Format file size
        fileSize: (bytes) => {
            if (bytes === 0) return '0 Bytes';
            
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        // Format duration
        duration: (seconds) => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;

            if (hours > 0) {
                return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            } else {
                return `${minutes}:${secs.toString().padStart(2, '0')}`;
            }
        },

        // Truncate text
        truncate: (text, length = 100, suffix = '...') => {
            if (text.length <= length) return text;
            return text.substring(0, length) + suffix;
        },

        // Capitalize first letter
        capitalize: (text) => {
            return text.charAt(0).toUpperCase() + text.slice(1);
        },

        // Convert to title case
        titleCase: (text) => {
            return text.replace(/\w\S*/g, (txt) => {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    },

    // API Utilities
    api: {
        // Make API request with timeout
        request: async (url, options = {}) => {
            const defaultOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                timeout: 10000,
                ...options
            };

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), defaultOptions.timeout);

            try {
                const response = await fetch(url, {
                    ...defaultOptions,
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                clearTimeout(timeoutId);
                throw error;
            }
        },

        // GET request
        get: (url, options = {}) => {
            return Utils.api.request(url, { ...options, method: 'GET' });
        },

        // POST request
        post: (url, data, options = {}) => {
            return Utils.api.request(url, {
                ...options,
                method: 'POST',
                body: JSON.stringify(data)
            });
        },

        // PUT request
        put: (url, data, options = {}) => {
            return Utils.api.request(url, {
                ...options,
                method: 'PUT',
                body: JSON.stringify(data)
            });
        },

        // DELETE request
        delete: (url, options = {}) => {
            return Utils.api.request(url, { ...options, method: 'DELETE' });
        }
    },

    // Performance Utilities
    performance: {
        // Debounce function
        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle function
        throttle: (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Measure execution time
        measure: (name, fn) => {
            const start = performance.now();
            const result = fn();
            const end = performance.now();
            console.log(`${name} took ${end - start} milliseconds`);
            return result;
        },

        // Async measure execution time
        measureAsync: async (name, fn) => {
            const start = performance.now();
            const result = await fn();
            const end = performance.now();
            console.log(`${name} took ${end - start} milliseconds`);
            return result;
        }
    },

    // Error Handling
    error: {
        // Handle async errors
        handleAsync: (asyncFn) => {
            return asyncFn.catch(error => {
                console.error('Async error:', error);
                return null;
            });
        },

        // Create error boundary
        createBoundary: (errorHandler) => {
            return (error, errorInfo) => {
                console.error('Error caught by boundary:', error, errorInfo);
                if (errorHandler) {
                    errorHandler(error, errorInfo);
                }
            };
        },

        // Retry function with exponential backoff
        retry: async (fn, maxAttempts = 3, delay = 1000) => {
            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                try {
                    return await fn();
                } catch (error) {
                    if (attempt === maxAttempts) {
                        throw error;
                    }
                    await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
                }
            }
        }
    },

    // Miscellaneous Utilities
    misc: {
        // Generate random ID
        generateId: (length = 8) => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
        },

        // Deep clone object
        deepClone: (obj) => {
            if (obj === null || typeof obj !== 'object') return obj;
            if (obj instanceof Date) return new Date(obj.getTime());
            if (obj instanceof Array) return obj.map(item => Utils.misc.deepClone(item));
            if (typeof obj === 'object') {
                const clonedObj = {};
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        clonedObj[key] = Utils.misc.deepClone(obj[key]);
                    }
                }
                return clonedObj;
            }
        },

        // Merge objects
        merge: (...objects) => {
            return objects.reduce((result, obj) => {
                return { ...result, ...obj };
            }, {});
        },

        // Sleep function
        sleep: (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        // Copy to clipboard
        copyToClipboard: async (text) => {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (error) {
                console.error('Failed to copy to clipboard:', error);
                return false;
            }
        },

        // Download file
        downloadFile: (data, filename, type = 'text/plain') => {
            const blob = new Blob([data], { type });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}