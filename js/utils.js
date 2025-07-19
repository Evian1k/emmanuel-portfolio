// Utility functions for Emmanuel Evian Portfolio

const Utils = {
    // DOM Utilities
    dom: {
        // Get element by selector
        get: (selector) => document.querySelector(selector),
        
        // Get all elements by selector
        getAll: (selector) => document.querySelectorAll(selector),
        
        // Create element with attributes
        create: (tag, attributes = {}, children = []) => {
            const element = document.createElement(tag);
            
            // Set attributes
            Object.entries(attributes).forEach(([key, value]) => {
                if (key === 'className') {
                    element.className = value;
                } else if (key === 'textContent') {
                    element.textContent = value;
                } else {
                    element.setAttribute(key, value);
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
        },
        
        // Remove event listener
        off: (element, event, handler) => {
            element.removeEventListener(event, handler);
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
        }
    },

    // Animation Utilities
    animation: {
        // Fade in element
        fadeIn: (element, duration = 300, delay = 0) => {
            element.style.opacity = '0';
            element.style.transition = `opacity ${duration}ms ease ${delay}ms`;
            
            setTimeout(() => {
                element.style.opacity = '1';
            }, delay);
        },
        
        // Fade out element
        fadeOut: (element, duration = 300, callback) => {
            element.style.transition = `opacity ${duration}ms ease`;
            element.style.opacity = '0';
            
            setTimeout(() => {
                if (callback) callback();
            }, duration);
        },
        
        // Slide in from top
        slideInTop: (element, duration = 300, delay = 0) => {
            element.style.transform = 'translateY(-30px)';
            element.style.opacity = '0';
            element.style.transition = `all ${duration}ms ease ${delay}ms`;
            
            setTimeout(() => {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }, delay);
        },
        
        // Slide in from bottom
        slideInBottom: (element, duration = 300, delay = 0) => {
            element.style.transform = 'translateY(30px)';
            element.style.opacity = '0';
            element.style.transition = `all ${duration}ms ease ${delay}ms`;
            
            setTimeout(() => {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }, delay);
        },
        
        // Scale in
        scaleIn: (element, duration = 300, delay = 0) => {
            element.style.transform = 'scale(0.8)';
            element.style.opacity = '0';
            element.style.transition = `all ${duration}ms ease ${delay}ms`;
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.opacity = '1';
            }, delay);
        }
    },

    // Browser Utilities
    browser: {
        // Check if mobile device
        isMobile: () => {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        
        // Check if iOS device
        isIOS: () => {
            return /iPad|iPhone|iPod/.test(navigator.userAgent);
        },
        
        // Check if Android device
        isAndroid: () => {
            return /Android/.test(navigator.userAgent);
        },
        
        // Get viewport dimensions
        getViewport: () => {
            return {
                width: window.innerWidth || document.documentElement.clientWidth,
                height: window.innerHeight || document.documentElement.clientHeight
            };
        },
        
        // Check if element is in viewport
        isInViewport: (element) => {
            const rect = element.getBoundingClientRect();
            const viewport = this.getViewport();
            
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= viewport.height &&
                rect.right <= viewport.width
            );
        },
        
        // Smooth scroll to element
        scrollTo: (element, offset = 0) => {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        },
        
        // Get scroll position
        getScrollPosition: () => {
            return window.pageYOffset || document.documentElement.scrollTop;
        }
    },

    // Storage Utilities
    storage: {
        // Set item in localStorage
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('Error saving to localStorage:', error);
                return false;
            }
        },
        
        // Get item from localStorage
        get: (key, defaultValue = null) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return defaultValue;
            }
        },
        
        // Remove item from localStorage
        remove: (key) => {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.error('Error removing from localStorage:', error);
                return false;
            }
        },
        
        // Clear all localStorage
        clear: () => {
            try {
                localStorage.clear();
                return true;
            } catch (error) {
                console.error('Error clearing localStorage:', error);
                return false;
            }
        }
    },

    // Validation Utilities
    validation: {
        // Validate email
        isValidEmail: (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        
        // Validate phone number
        isValidPhone: (phone) => {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            return phoneRegex.test(phone.replace(/\s/g, ''));
        },
        
        // Validate URL
        isValidUrl: (url) => {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        },
        
        // Validate required field
        isRequired: (value) => {
            return value && value.toString().trim().length > 0;
        },
        
        // Validate minimum length
        hasMinLength: (value, minLength) => {
            return value && value.toString().length >= minLength;
        },
        
        // Validate maximum length
        hasMaxLength: (value, maxLength) => {
            return value && value.toString().length <= maxLength;
        }
    },

    // Format Utilities
    format: {
        // Format date
        date: (date, options = {}) => {
            const defaultOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            
            return new Date(date).toLocaleDateString('en-US', {
                ...defaultOptions,
                ...options
            });
        },
        
        // Format number with commas
        number: (number) => {
            return number.toLocaleString();
        },
        
        // Format file size
        fileSize: (bytes) => {
            if (bytes === 0) return '0 Bytes';
            
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },
        
        // Format duration
        duration: (seconds) => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            
            if (hours > 0) {
                return `${hours}h ${minutes}m ${secs}s`;
            } else if (minutes > 0) {
                return `${minutes}m ${secs}s`;
            } else {
                return `${secs}s`;
            }
        }
    },

    // API Utilities
    api: {
        // Fetch with timeout
        fetchWithTimeout: async (url, options = {}, timeout = 5000) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            
            try {
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                return response;
            } catch (error) {
                clearTimeout(timeoutId);
                throw error;
            }
        },
        
        // Handle API response
        handleResponse: async (response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
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
        measureTime: (func, name = 'Function') => {
            const start = performance.now();
            const result = func();
            const end = performance.now();
            console.log(`${name} took ${(end - start).toFixed(2)}ms`);
            return result;
        }
    },

    // Error Handling
    error: {
        // Handle errors gracefully
        handle: (error, context = '') => {
            console.error(`Error in ${context}:`, error);
            
            // You can add error reporting service here
            // Example: Sentry.captureException(error);
            
            return {
                error: true,
                message: error.message || 'An error occurred',
                context
            };
        },
        
        // Create custom error
        create: (message, code = 'UNKNOWN_ERROR') => {
            const error = new Error(message);
            error.code = code;
            return error;
        }
    }
};

// Export utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
} else {
    window.Utils = Utils;
}