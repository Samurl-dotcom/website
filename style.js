// script.js - Main JavaScript functionality for the portfolio website

// Login Form Validation
function validateLoginForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let isValid = true;
    
    // Clear previous errors
    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    
    // Validate username
    if (username.trim() === '') {
        document.getElementById('usernameError').textContent = 'Username is required';
        isValid = false;
    } else if (username.length < 4) {
        document.getElementById('usernameError').textContent = 'Username must be at least 4 characters';
        isValid = false;
    }
    
    // Validate password
    if (password.trim() === '') {
        document.getElementById('passwordError').textContent = 'Password is required';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    }
    
    return isValid;
}

// Date and Time Display
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        datetimeElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Slideshow Functionality
let currentSlide = 0;
let slideInterval;

function initializeSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    if (slides.length === 0) return;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }

    // Next button
    const nextBtn = document.querySelector('.next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            resetSlideInterval();
        });
    }

    // Previous button
    const prevBtn = document.querySelector('.prev-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            resetSlideInterval();
        });
    }

    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            showSlide(parseInt(dot.getAttribute('data-slide')));
            resetSlideInterval();
        });
    });

    // Auto-advance slideshow
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    startSlideInterval();
}

// Authentication Check
function checkAuthentication() {
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'index.html';
    }
}

// Logout Functionality
function setupLogout() {
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    }
}

// Table Row Hover Effects
function initializeTableHover() {
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#e9ecef';
        });
        row.addEventListener('mouseleave', function() {
            if (Array.from(this.parentNode.children).indexOf(this) % 2 === 0) {
                this.style.backgroundColor = '#f8f9fa';
            } else {
                this.style.backgroundColor = 'white';
            }
        });
    });
}

// Mobile Navigation Toggle
function initializeMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
}

// Form Enhancement - Remember Me functionality
function initializeRememberMe() {
    const rememberCheckbox = document.getElementById('remember');
    const usernameInput = document.getElementById('username');
    
    if (rememberCheckbox && usernameInput) {
        // Check if username was saved
        const savedUsername = localStorage.getItem('rememberedUsername');
        if (savedUsername) {
            usernameInput.value = savedUsername;
            rememberCheckbox.checked = true;
        }
        
        // Save username when form is submitted
        document.getElementById('loginForm').addEventListener('submit', function() {
            if (rememberCheckbox.checked) {
                localStorage.setItem('rememberedUsername', usernameInput.value);
            } else {
                localStorage.removeItem('rememberedUsername');
            }
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update date and time
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Initialize slideshow if on home page
    initializeSlideshow();
    
    // Check authentication for protected pages
    if (window.location.pathname !== '/index.html' && !window.location.pathname.endsWith('index.html')) {
        checkAuthentication();
    }
    
    // Setup logout functionality
    setupLogout();
    
    // Initialize table hover effects
    initializeTableHover();
    
    // Initialize mobile navigation
    initializeMobileNav();
    
    // Initialize remember me functionality
    initializeRememberMe();
    
    // Add login form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            if (!validateLoginForm()) {
                e.preventDefault();
            } else {
                // Store login status
                localStorage.setItem('isLoggedIn', 'true');
            }
        });
    }
});

// Utility function for smooth scrolling
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Dynamic welcome message based on time of day
function updateWelcomeMessage() {
    const welcomeElement = document.getElementById('welcome-message');
    if (welcomeElement) {
        const hour = new Date().getHours();
        let greeting = 'Welcome';
        
        if (hour < 12) {
            greeting = 'Good morning';
        } else if (hour < 18) {
            greeting = 'Good afternoon';
        } else {
            greeting = 'Good evening';
        }
        
        welcomeElement.textContent = `${greeting} to My Portfolio!`;
    }
}

// Initialize welcome message
document.addEventListener('DOMContentLoaded', updateWelcomeMessage);