// Projects module for Emmanuel Evian Portfolio

const Projects = {
    // Configuration
    config: {
        itemsPerPage: 6,
        enableFiltering: true,
        enableSearch: true,
        enableSorting: true,
        enablePagination: true,
        enableGitHubIntegration: true,
        showPrivateProjects: false,
        cacheTime: 3600000, // 1 hour
        animationDuration: 300
    },

    // State
    state: {
        container: null,
        projects: [],
        filteredProjects: [],
        currentPage: 1,
        currentFilter: 'all',
        currentSort: 'date',
        searchQuery: '',
        isLoading: false,
        githubData: null,
        lastFetch: 0
    },

    // Initialize projects
    init() {
        this.setupElements();
        this.loadProjects();
        this.setupFilters();
        this.setupSearch();
        this.setupSorting();
        this.setupPagination();
        this.setupGitHubIntegration();
        this.renderProjects();
        this.setupAnalytics();
    },

    // Setup DOM elements
    setupElements() {
        this.state.container = document.querySelector('.projects-grid');
        if (!this.state.container) return;
    },

    // Load projects data
    loadProjects() {
        const projects = [
            {
                id: 1,
                title: "E-Commerce Platform",
                description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, payment integration, and admin dashboard.",
                image: "/images/projects/ecommerce.jpg",
                category: "web",
                technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
                liveUrl: "https://ecommerce-demo.com",
                githubUrl: "https://github.com/johndeveloper/ecommerce-platform",
                featured: true,
                date: "2024-01-15",
                stars: 45,
                forks: 12,
                language: "JavaScript"
            },
            {
                id: 2,
                title: "Task Management App",
                description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
                image: "/images/projects/task-manager.jpg",
                category: "web",
                technologies: ["Vue.js", "Firebase", "Vuex", "Vuetify"],
                liveUrl: "https://task-manager-demo.com",
                githubUrl: "https://github.com/johndeveloper/task-manager",
                featured: true,
                date: "2023-12-20",
                stars: 32,
                forks: 8,
                language: "JavaScript"
            },
            {
                id: 3,
                title: "Weather Dashboard",
                description: "A beautiful weather dashboard that displays current weather, forecasts, and historical data with interactive charts and maps.",
                image: "/images/projects/weather.jpg",
                category: "web",
                technologies: ["React", "D3.js", "OpenWeather API", "Chart.js"],
                liveUrl: "https://weather-dashboard.com",
                githubUrl: "https://github.com/johndeveloper/weather-dashboard",
                featured: false,
                date: "2023-11-10",
                stars: 28,
                forks: 5,
                language: "JavaScript"
            },
            {
                id: 4,
                title: "Fitness Tracking App",
                description: "A mobile fitness tracking application with workout planning, progress tracking, and social features for sharing achievements.",
                image: "/images/projects/fitness.jpg",
                category: "mobile",
                technologies: ["React Native", "Expo", "Firebase", "Redux"],
                liveUrl: "https://fitness-app-demo.com",
                githubUrl: "https://github.com/johndeveloper/fitness-tracker",
                featured: true,
                date: "2023-10-05",
                stars: 67,
                forks: 15,
                language: "JavaScript"
            },
            {
                id: 5,
                title: "Portfolio Website",
                description: "A modern, responsive portfolio website with dark/light mode, smooth animations, and SEO optimization.",
                image: "/images/projects/portfolio.jpg",
                category: "web",
                technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
                liveUrl: "https://johndeveloper.com",
                githubUrl: "https://github.com/johndeveloper/portfolio",
                featured: false,
                date: "2023-09-15",
                stars: 23,
                forks: 7,
                language: "HTML"
            },
            {
                id: 6,
                title: "Chat Application",
                description: "A real-time chat application with private messaging, group chats, file sharing, and message encryption.",
                image: "/images/projects/chat.jpg",
                category: "web",
                technologies: ["Socket.io", "Express", "MongoDB", "JWT"],
                liveUrl: "https://chat-app-demo.com",
                githubUrl: "https://github.com/johndeveloper/chat-app",
                featured: false,
                date: "2023-08-20",
                stars: 41,
                forks: 11,
                language: "JavaScript"
            },
            {
                id: 7,
                title: "Restaurant Management System",
                description: "A comprehensive restaurant management system with order tracking, inventory management, and reporting features.",
                image: "/images/projects/restaurant.jpg",
                category: "web",
                technologies: ["Angular", "Spring Boot", "PostgreSQL", "Docker"],
                liveUrl: "https://restaurant-demo.com",
                githubUrl: "https://github.com/johndeveloper/restaurant-system",
                featured: true,
                date: "2023-07-10",
                stars: 38,
                forks: 9,
                language: "Java"
            },
            {
                id: 8,
                title: "Social Media Dashboard",
                description: "A social media analytics dashboard that aggregates data from multiple platforms and provides insights and reporting.",
                image: "/images/projects/social-dashboard.jpg",
                category: "web",
                technologies: ["React", "Node.js", "Redis", "Chart.js"],
                liveUrl: "https://social-dashboard.com",
                githubUrl: "https://github.com/johndeveloper/social-dashboard",
                featured: false,
                date: "2023-06-25",
                stars: 29,
                forks: 6,
                language: "JavaScript"
            }
        ];

        this.state.projects = projects;
        this.state.filteredProjects = [...projects];
    },

    // Setup filters
    setupFilters() {
        if (!this.config.enableFiltering) return;

        const filterContainer = document.querySelector('.projects-filters');
        if (!filterContainer) return;

        const filters = [
            { value: 'all', label: 'All' },
            { value: 'web', label: 'Web Apps' },
            { value: 'mobile', label: 'Mobile Apps' },
            { value: 'design', label: 'UI/UX Design' },
            { value: 'other', label: 'Other' }
        ];

        filters.forEach(filter => {
            const button = Utils.dom.create('button', {
                className: 'filter-btn',
                'data-filter': filter.value,
                textContent: filter.label
            });

            button.addEventListener('click', () => {
                this.setFilter(filter.value);
            });

            filterContainer.appendChild(button);
        });

        // Set initial filter
        this.setFilter('all');
    },

    // Set filter
    setFilter(filter) {
        this.state.currentFilter = filter;
        this.state.currentPage = 1;

        // Update filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            if (btn.dataset.filter === filter) {
                this.addClass(btn, 'active');
            } else {
                this.removeClass(btn, 'active');
            }
        });

        this.filterProjects();
        this.renderProjects();
        this.updatePagination();
    },

    // Setup search
    setupSearch() {
        if (!this.config.enableSearch) return;

        const searchInput = document.querySelector('.projects-search');
        if (!searchInput) return;

        const handleSearch = Utils.performance.debounce((e) => {
            this.state.searchQuery = e.target.value.toLowerCase();
            this.state.currentPage = 1;
            this.filterProjects();
            this.renderProjects();
            this.updatePagination();
        }, 300);

        searchInput.addEventListener('input', handleSearch);
    },

    // Setup sorting
    setupSorting() {
        if (!this.config.enableSorting) return;

        const sortSelect = document.querySelector('.projects-sort');
        if (!sortSelect) return;

        sortSelect.addEventListener('change', (e) => {
            this.state.currentSort = e.target.value;
            this.sortProjects();
            this.renderProjects();
        });
    },

    // Setup pagination
    setupPagination() {
        if (!this.config.enablePagination) return;

        const paginationContainer = document.querySelector('.projects-pagination');
        if (!paginationContainer) return;

        this.updatePagination();
    },

    // Update pagination
    updatePagination() {
        const paginationContainer = document.querySelector('.projects-pagination');
        if (!paginationContainer) return;

        const totalPages = Math.ceil(this.state.filteredProjects.length / this.config.itemsPerPage);
        
        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
            return;
        }

        paginationContainer.style.display = 'flex';
        paginationContainer.innerHTML = '';

        // Previous button
        if (this.state.currentPage > 1) {
            const prevButton = Utils.dom.create('button', {
                className: 'pagination-btn',
                textContent: 'Previous'
            });
            prevButton.addEventListener('click', () => this.goToPage(this.state.currentPage - 1));
            paginationContainer.appendChild(prevButton);
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = Utils.dom.create('button', {
                className: 'pagination-btn',
                textContent: i.toString()
            });

            if (i === this.state.currentPage) {
                this.addClass(pageButton, 'active');
            }

            pageButton.addEventListener('click', () => this.goToPage(i));
            paginationContainer.appendChild(pageButton);
        }

        // Next button
        if (this.state.currentPage < totalPages) {
            const nextButton = Utils.dom.create('button', {
                className: 'pagination-btn',
                textContent: 'Next'
            });
            nextButton.addEventListener('click', () => this.goToPage(this.state.currentPage + 1));
            paginationContainer.appendChild(nextButton);
        }
    },

    // Go to page
    goToPage(page) {
        this.state.currentPage = page;
        this.renderProjects();
        this.updatePagination();
        
        // Scroll to top of projects section
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    },

    // Filter projects
    filterProjects() {
        let filtered = [...this.state.projects];

        // Apply category filter
        if (this.state.currentFilter !== 'all') {
            filtered = filtered.filter(project => project.category === this.state.currentFilter);
        }

        // Apply search filter
        if (this.state.searchQuery) {
            filtered = filtered.filter(project => 
                project.title.toLowerCase().includes(this.state.searchQuery) ||
                project.description.toLowerCase().includes(this.state.searchQuery) ||
                project.technologies.some(tech => tech.toLowerCase().includes(this.state.searchQuery))
            );
        }

        this.state.filteredProjects = filtered;
        this.sortProjects();
    },

    // Sort projects
    sortProjects() {
        const sortFunctions = {
            date: (a, b) => new Date(b.date) - new Date(a.date),
            name: (a, b) => a.title.localeCompare(b.title),
            category: (a, b) => a.category.localeCompare(b.category),
            stars: (a, b) => (b.stars || 0) - (a.stars || 0)
        };

        const sortFunction = sortFunctions[this.state.currentSort];
        if (sortFunction) {
            this.state.filteredProjects.sort(sortFunction);
        }
    },

    // Setup GitHub integration
    setupGitHubIntegration() {
        if (!this.config.enableGitHubIntegration) return;

        this.fetchGitHubData();
    },

    // Fetch GitHub data
    async fetchGitHubData() {
        const now = Date.now();
        if (now - this.state.lastFetch < this.config.cacheTime) {
            return;
        }

        try {
            this.state.isLoading = true;
            
            const username = CONFIG.github.username;
            const apiUrl = CONFIG.github.apiUrl;

            // Fetch user data
            const userResponse = await Utils.api.get(`${apiUrl}/users/${username}`);
            
            // Fetch pinned repositories
            const pinnedResponse = await Utils.api.get(`${apiUrl}/users/${username}/repos?sort=updated&per_page=100`);
            
            // Filter pinned repositories (GitHub doesn't have a direct API for pinned repos)
            const pinnedRepos = pinnedResponse
                .filter(repo => !repo.fork && !repo.private)
                .slice(0, CONFIG.github.pinnedReposCount);

            this.state.githubData = {
                user: userResponse,
                pinnedRepos: pinnedRepos,
                lastFetch: now
            };

            this.state.lastFetch = now;
            this.mergeGitHubData();
            this.renderProjects();

        } catch (error) {
            console.error('Error fetching GitHub data:', error);
        } finally {
            this.state.isLoading = false;
        }
    },

    // Merge GitHub data with local projects
    mergeGitHubData() {
        if (!this.state.githubData) return;

        this.state.githubData.pinnedRepos.forEach(githubRepo => {
            const localProject = this.state.projects.find(p => 
                p.githubUrl && p.githubUrl.includes(githubRepo.name)
            );

            if (localProject) {
                localProject.stars = githubRepo.stargazers_count;
                localProject.forks = githubRepo.forks_count;
                localProject.language = githubRepo.language;
                localProject.updatedAt = githubRepo.updated_at;
            }
        });
    },

    // Render projects
    renderProjects() {
        if (!this.state.container) return;

        const startIndex = (this.state.currentPage - 1) * this.config.itemsPerPage;
        const endIndex = startIndex + this.config.itemsPerPage;
        const projectsToShow = this.state.filteredProjects.slice(startIndex, endIndex);

        this.state.container.innerHTML = '';

        if (projectsToShow.length === 0) {
            this.showNoProjectsMessage();
            return;
        }

        projectsToShow.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, startIndex + index);
            this.state.container.appendChild(projectCard);
        });

        // Animate project cards
        this.animateProjectCards();
    },

    // Create project card
    createProjectCard(project, index) {
        const card = Utils.dom.create('div', {
            className: 'project-card',
            'data-project-id': project.id
        });

        const technologies = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        const stars = project.stars ? `<span class="stars">★ ${project.stars}</span>` : '';
        const forks = project.forks ? `<span class="forks">🔀 ${project.forks}</span>` : '';

        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="project-overlay">
                    <div class="project-links">
                        ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener" class="project-link live-link">View Live</a>` : ''}
                        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener" class="project-link github-link">View Code</a>` : ''}
                    </div>
                </div>
            </div>
            <div class="project-content">
                <div class="project-header">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-stats">
                        ${stars}
                        ${forks}
                    </div>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-technologies">
                    ${technologies}
                </div>
                <div class="project-meta">
                    <span class="project-category">${this.getCategoryLabel(project.category)}</span>
                    <span class="project-date">${Utils.format.date(project.date, { month: 'short', year: 'numeric' })}</span>
                </div>
            </div>
        `;

        // Add event listeners
        this.addProjectCardListeners(card, project);

        return card;
    },

    // Add project card event listeners
    addProjectCardListeners(card, project) {
        // Click to view project details
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.project-link')) {
                this.showProjectDetails(project);
            }
        });

        // Hover effects
        card.addEventListener('mouseenter', () => {
            this.addClass(card, 'hover');
        });

        card.addEventListener('mouseleave', () => {
            this.removeClass(card, 'hover');
        });
    },

    // Show project details modal
    showProjectDetails(project) {
        const modal = Utils.dom.create('div', {
            className: 'project-modal'
        });

        const technologies = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close" aria-label="Close modal">×</button>
                    <div class="modal-header">
                        <h2>${project.title}</h2>
                        <div class="modal-links">
                            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary">View Live</a>` : ''}
                            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary">View Code</a>` : ''}
                        </div>
                    </div>
                    <div class="modal-body">
                        <img src="${project.image}" alt="${project.title}" class="modal-image">
                        <div class="modal-info">
                            <p class="modal-description">${project.description}</p>
                            <div class="modal-technologies">
                                <h4>Technologies Used:</h4>
                                <div class="tech-tags">
                                    ${technologies}
                                </div>
                            </div>
                            <div class="modal-meta">
                                <div class="meta-item">
                                    <strong>Category:</strong> ${this.getCategoryLabel(project.category)}
                                </div>
                                <div class="meta-item">
                                    <strong>Date:</strong> ${Utils.format.date(project.date)}
                                </div>
                                ${project.language ? `<div class="meta-item"><strong>Language:</strong> ${project.language}</div>` : ''}
                                ${project.stars ? `<div class="meta-item"><strong>Stars:</strong> ${project.stars}</div>` : ''}
                                ${project.forks ? `<div class="meta-item"><strong>Forks:</strong> ${project.forks}</div>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        const closeButton = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');

        closeButton.addEventListener('click', () => this.closeProjectModal(modal));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeProjectModal(modal);
            }
        });

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Track analytics
        this.trackProjectView(project);
    },

    // Close project modal
    closeProjectModal(modal) {
        modal.remove();
        document.body.style.overflow = '';
    },

    // Show no projects message
    showNoProjectsMessage() {
        const message = Utils.dom.create('div', {
            className: 'no-projects-message',
            innerHTML: `
                <div class="message-content">
                    <h3>No projects found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `
        });

        this.state.container.appendChild(message);
    },

    // Animate project cards
    animateProjectCards() {
        const cards = this.state.container.querySelectorAll('.project-card');
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = `all ${this.config.animationDuration}ms ease-out`;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    },

    // Get category label
    getCategoryLabel(category) {
        const labels = {
            'web': 'Web App',
            'mobile': 'Mobile App',
            'design': 'UI/UX Design',
            'other': 'Other'
        };
        return labels[category] || category;
    },

    // Setup analytics
    setupAnalytics() {
        // Track initial load
        this.trackEvent('projects_loaded', {
            total_projects: this.state.projects.length
        });
    },

    // Track project view
    trackProjectView(project) {
        this.trackEvent('project_viewed', {
            project_id: project.id,
            project_title: project.title,
            project_category: project.category
        });
    },

    // Track event
    trackEvent(eventName, parameters = {}) {
        if (window.gtag) {
            gtag('event', eventName, parameters);
        }

        // Custom event for other analytics
        const event = new CustomEvent('projects_event', {
            detail: {
                event: eventName,
                parameters: parameters
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

    // Get current projects
    getCurrentProjects() {
        return this.state.filteredProjects;
    },

    // Get project by ID
    getProjectById(id) {
        return this.state.projects.find(project => project.id === id);
    },

    // Add new project
    addProject(project) {
        project.id = Math.max(...this.state.projects.map(p => p.id)) + 1;
        this.state.projects.push(project);
        this.filterProjects();
        this.renderProjects();
    },

    // Update project
    updateProject(id, updates) {
        const projectIndex = this.state.projects.findIndex(p => p.id === id);
        if (projectIndex !== -1) {
            this.state.projects[projectIndex] = { ...this.state.projects[projectIndex], ...updates };
            this.filterProjects();
            this.renderProjects();
        }
    },

    // Remove project
    removeProject(id) {
        this.state.projects = this.state.projects.filter(p => p.id !== id);
        this.filterProjects();
        this.renderProjects();
    },

    // Export projects data
    exportProjects() {
        return JSON.stringify(this.state.projects, null, 2);
    },

    // Import projects data
    importProjects(data) {
        try {
            const projects = JSON.parse(data);
            this.state.projects = projects;
            this.filterProjects();
            this.renderProjects();
            return true;
        } catch (error) {
            console.error('Error importing projects:', error);
            return false;
        }
    },

    // Cleanup projects
    cleanup() {
        // Remove event listeners
        const filterButtons = document.querySelectorAll('.filter-btn');
        const searchInput = document.querySelector('.projects-search');
        const sortSelect = document.querySelector('.projects-sort');

        filterButtons.forEach(btn => btn.removeEventListener('click', this.setFilter));
        if (searchInput) searchInput.removeEventListener('input', this.handleSearch);
        if (sortSelect) sortSelect.removeEventListener('change', this.handleSort);

        // Clear state
        this.state.container = null;
        this.state.projects = [];
        this.state.filteredProjects = [];
        this.state.currentPage = 1;
        this.state.currentFilter = 'all';
        this.state.currentSort = 'date';
        this.state.searchQuery = '';
        this.state.isLoading = false;
        this.state.githubData = null;
        this.state.lastFetch = 0;
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Projects;
}