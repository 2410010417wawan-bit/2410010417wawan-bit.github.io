// script.js

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize features
    initSmoothScrolling();
    initNavbarScroll();
    initMobileMenu();
    initThemeToggle();
    initScrollAnimations();
    initFormValidation();
});

// Typing Animation
function initTypingAnimation() {
    const text = "Full-Stack Developer | Memiliki semangat tinggi dalam mengembangkan solusi web yang inovatif dan modern.";
    const typingElement = document.querySelector('.typing-text');
    let index = 0;

    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50); // Kecepatan ngetik (makin kecil makin cepet)
        }
    }

    // Mulai ngetik setelah 500ms
    setTimeout(type, 500);
}

// Panggil fungsi ini
document.addEventListener('DOMContentLoaded', function() {
    initTypingAnimation(); // TAMBAHKAN INI
});


// Smooth Scrolling for Nav Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu if open
            const navLinksEl = document.querySelector('.nav-links');
            if (navLinksEl.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// Navbar Scroll Behavior and Active Link Highlight
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        // Navbar background pada scroll (sudah auto adjust ke theme)
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Active link highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    hamburger.addEventListener('click', toggleMobileMenu);
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.getElementById('hamburger');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
}

// Dark/Light Mode Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Scroll-Based Animations (Progress Bars and Entrance)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Progress Bars Animation
    const skillProgresses = document.querySelectorAll('.skill-progress');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const width = progress.getAttribute('data-width');
                progress.style.width = width;
            }
        });
    }, observerOptions);

    skillProgresses.forEach(progress => progressObserver.observe(progress));

    // Entrance Animations (e.g., for sections)
    const animatedElements = document.querySelectorAll('.section');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease-out';
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => animationObserver.observe(el));
}

// Form Validation and Submission
function initFormValidation() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !message) {
            showFeedback('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFeedback('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission (replace with actual backend call)
        showFeedback('Message sent successfully!', 'success');
        form.reset();
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = type; // 'success' or 'error' for styling
        feedback.style.display = 'block';
        setTimeout(() => {
            feedback.textContent = '';
            feedback.className = '';
            feedback.style.display = 'none';
        }, 5000);
    }
}
