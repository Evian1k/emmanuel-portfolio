const PROJECTS = [
  {
    image: 'images/project1.png',
    title: 'RG Fling Marketplace',
    description: 'An Amazon-style platform for global buying and selling. Built with Flask, React, PostgreSQL, Stripe.',
    tech: 'Flask, PostgreSQL, React, Stripe, HTML/CSS',
    github: 'https://github.com/Evian1k/RG-Glock1',
    live: '#',
    private: false,
    testimonial: 'Emmanuel delivered a robust e-commerce platform for us! Highly recommended.'
  },
  {
    image: 'images/project2.png',
    title: 'Portfolio Website',
    description: 'Personal portfolio built with HTML, CSS, JS. Responsive, animated, and SEO-optimized.',
    tech: 'HTML, CSS, JavaScript',
    github: 'https://github.com/Evian1k/portfolio',
    live: '#',
    private: false
  },
  {
    image: 'images/project3.png',
    title: 'Task Manager App',
    description: 'Organize your tasks efficiently with this full-stack app. Features drag-and-drop, reminders, and more.',
    tech: 'React, Flask, PostgreSQL',
    github: 'https://github.com/Evian1k/task-manager',
    live: '#',
    private: true
  },
  {
    image: 'images/project4.png',
    title: 'Blog Platform',
    description: 'Modern blogging platform with markdown support, comments, and user authentication.',
    tech: 'Flask, React, PostgreSQL',
    github: 'https://github.com/Evian1k/blog-platform',
    live: '#',
    private: false
  },
  {
    image: 'images/project5.png',
    title: 'Weather App',
    description: 'Get real-time weather updates for any city. Clean UI, responsive, and fast.',
    tech: 'JavaScript, HTML, CSS, API',
    github: 'https://github.com/Evian1k/weather-app',
    live: '#',
    private: false
  },
  {
    image: 'images/project6.png',
    title: 'Chat App',
    description: 'Real-time chat application with group and private messaging, emojis, and notifications.',
    tech: 'React, Flask, Socket.io',
    github: 'https://github.com/Evian1k/chat-app',
    live: '#',
    private: true
  }
];

function renderProjects(role = 'public') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = '';
  PROJECTS.forEach(project => {
    if (role === 'public' && project.private) return;
    const card = document.createElement('div');
    card.className = 'project-card fade-in';
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" />
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tech">${project.tech}</div>
      <div class="project-links">
        <a href="${project.github}" target="_blank"><i class="fab fa-github"></i> GitHub</a>
        <a href="${project.live}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
      </div>
      ${project.testimonial ? `<blockquote class='testimonial'>"${project.testimonial}"</blockquote>` : ''}
    `;
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => renderProjects());