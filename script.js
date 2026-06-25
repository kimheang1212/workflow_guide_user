// DOM Elements
const mobileMenuButton = document.getElementById('mobileMenuButton');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarCloseButton = document.getElementById('sidebarCloseButton');
const appearanceBtn = document.getElementById('appearanceBtn');
const appearancePopup = document.getElementById('appearancePopup');
const themeOptions = document.querySelectorAll('.theme-option');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');

// Mobile Menu Functions
function openMenu() {
    sidebar.classList.add('is-open');
    sidebarOverlay.classList.add('is-open');
    document.body.classList.add('menu-open');
    mobileMenuButton.querySelector('.toggle-icon').textContent = '✕';
}

function closeMenu() {
    sidebar.classList.remove('is-open');
    sidebarOverlay.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    mobileMenuButton.querySelector('.toggle-icon').textContent = '☰';
}

// Initialize Mobile Menu
function initMobileMenu() {
    if (!mobileMenuButton || !sidebar || !sidebarOverlay) return;

    // Hamburger button click
    mobileMenuButton.addEventListener('click', () => {
        if (sidebar.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close button click
    if (sidebarCloseButton) {
        sidebarCloseButton.addEventListener('click', () => {
            closeMenu();
        });
    }

    // Overlay click
    sidebarOverlay.addEventListener('click', () => {
        closeMenu();
    });

    // Close menu when clicking nav links on mobile
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Escape key support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
            closeMenu();
        }
    });

    // Window resize - close menu on desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && sidebar.classList.contains('is-open')) {
            closeMenu();
        }
    });
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active Navigation Highlighting on Scroll
function highlightNavOnScroll() {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('themePreference') || 'auto';
    applyTheme(savedTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'auto' || !currentTheme) {
            applyTheme('auto');
        }
    });
}

function applyTheme(theme) {
    const html = document.documentElement;
    
    if (theme === 'auto') {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    } else {
        html.setAttribute('data-theme', theme);
    }
    
    // Update active state on theme options
    themeOptions.forEach(option => {
        const optionTheme = option.getAttribute('data-theme');
        if (optionTheme === theme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    // Save to localStorage
    localStorage.setItem('themePreference', theme);
}

function initAppearancePopup() {
    if (!appearanceBtn || !appearancePopup) return;
    
    // Toggle popup
    appearanceBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        appearancePopup.classList.toggle('is-open');
    });
    
    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
        if (!appearancePopup.contains(e.target) && e.target !== appearanceBtn) {
            appearancePopup.classList.remove('is-open');
        }
    });
    
    // Theme option clicks
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            applyTheme(theme);
            appearancePopup.classList.remove('is-open');
        });
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize appearance popup
    initAppearancePopup();
    
    // Initialize mobile menu
    initMobileMenu();

    // Initialize smooth scrolling
    initSmoothScroll();

    // Initialize scroll highlighting
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Initial call

    console.log('📚 Customer Care Management System Documentation initialized successfully!');
    console.log('💡 Features enabled:');
    console.log('  - Theme switcher (Auto/Light/Dark)');
    console.log('  - Mobile-responsive menu with hamburger button');
    console.log('  - Native HTML dropdowns using <details>');
    console.log('  - Smooth scrolling navigation');
    console.log('  - Active menu highlighting on scroll');
    console.log('  - Image lightbox with zoom');
    console.log('  - Multi-language support (English/Khmer)');
});
