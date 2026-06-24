// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');
const sidebar = document.getElementById('sidebar');
const mobileToggle = document.getElementById('mobileToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Active Navigation Link on Scroll
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

// Smooth Scroll for Navigation Links
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

// Category Toggle Function
function toggleCategory(button) {
    const menu = button.nextElementSibling;
    const isExpanded = menu.classList.contains('expanded');
    
    if (isExpanded) {
        menu.classList.remove('expanded');
        menu.classList.add('collapsed');
        button.classList.remove('active');
    } else {
        menu.classList.remove('collapsed');
        menu.classList.add('expanded');
        button.classList.add('active');
    }
}

// Submenu Toggle Function
function toggleSubmenu(button) {
    const submenu = button.nextElementSibling;
    const isExpanded = submenu.classList.contains('expanded');
    
    if (isExpanded) {
        submenu.classList.remove('expanded');
        submenu.classList.add('collapsed');
        button.classList.remove('active');
    } else {
        submenu.classList.remove('collapsed');
        submenu.classList.add('expanded');
        button.classList.add('active');
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    if (!mobileToggle || !sidebar || !sidebarOverlay) return;

    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        mobileToggle.querySelector('.toggle-icon').textContent = 
            sidebar.classList.contains('active') ? '✕' : '☰';
    });

    // Close sidebar when clicking overlay
    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        mobileToggle.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        mobileToggle.querySelector('.toggle-icon').textContent = '☰';
    });

    // Close sidebar when clicking a nav link on mobile
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                mobileToggle.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                mobileToggle.querySelector('.toggle-icon').textContent = '☰';
            }
        });
    });
}

// Language Toggle Function
function toggleLanguage() {
    const html = document.documentElement;
    const currentLang = html.getAttribute('lang');
    const newLang = currentLang === 'km' ? 'en' : 'km';
    
    html.setAttribute('lang', newLang);
    
    // Store preference in localStorage
    localStorage.setItem('preferred-language', newLang);
    
    // Update button text
    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = newLang === 'km' ? 'EN / ខ្មែរ' : 'ខ្មែរ / EN';
    }
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
        document.documentElement.setAttribute('lang', savedLang);
        const langText = document.querySelector('.lang-text');
        if (langText) {
            langText.textContent = savedLang === 'km' ? 'EN / ខ្មែរ' : 'ខ្មែរ / EN';
        }
    }
}

// Image Modal/Lightbox
let currentZoom = 1;
const zoomStep = 0.25;
const minZoom = 0.5;
const maxZoom = 3;

function openModal(imageSrc, caption) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImg.src = imageSrc;
    modalCaption.textContent = caption;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    currentZoom = 1;
    updateZoom();
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentZoom = 1;
}

function zoomIn() {
    if (currentZoom < maxZoom) {
        currentZoom += zoomStep;
        updateZoom();
    }
}

function zoomOut() {
    if (currentZoom > minZoom) {
        currentZoom -= zoomStep;
        updateZoom();
    }
}

function resetZoom() {
    currentZoom = 1;
    updateZoom();
}

function updateZoom() {
    const modalImg = document.getElementById('modalImage');
    modalImg.style.transform = `scale(${currentZoom})`;
}

// Initialize image click handlers
function initImageModals() {
    const imageContainers = document.querySelectorAll('.image-container');
    
    imageContainers.forEach(container => {
        container.addEventListener('click', () => {
            const img = container.querySelector('.screenshot-image');
            const caption = container.nextElementSibling?.textContent || '';
            if (img) {
                openModal(img.src, caption);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    // Mouse wheel zoom
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('wheel', function(event) {
            if (event.ctrlKey) {
                event.preventDefault();
                if (event.deltaY < 0) {
                    zoomIn();
                } else {
                    zoomOut();
                }
            }
        });
    }
}

// Add Fade-in Animation on Scroll
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add initial styles and observe elements
    const animatedElements = document.querySelectorAll(
        '.function-card, .step-item, .screenshot-card, .page-intro'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Back to Top Button
function addBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Back to top');
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        visibility: hidden;
        transition: var(--transition);
        z-index: 999;
    `;

    const hoverStyle = document.createElement('style');
    hoverStyle.textContent = `
        button[aria-label="Back to top"]:hover {
            background: var(--primary-dark);
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(hoverStyle);
    document.body.appendChild(button);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Reading Progress Indicator
function addReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--success-color));
        z-index: 1002;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.width = `${scrolled}%`;
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Initial call

    // Enhanced features
    initMobileMenu();
    initImageModals();
    addScrollAnimations();
    addBackToTopButton();
    addReadingProgress();
    loadLanguagePreference();

    console.log('📚 Customer Care Management System Documentation initialized successfully!');
    console.log('💡 Features enabled:');
    console.log('  - Active navigation highlighting');
    console.log('  - Smooth scrolling');
    console.log('  - Mobile-responsive menu');
    console.log('  - Scroll animations');
    console.log('  - Back to top button');
    console.log('  - Reading progress indicator');
    console.log('  - Image lightbox with zoom');
    console.log('  - Multi-language support (English/Khmer)');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.querySelector('.toggle-icon').textContent = '☰';
            }
            if (sidebarOverlay) {
                sidebarOverlay.classList.remove('active');
            }
        }
    }, 250);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu or modal
    if (e.key === 'Escape') {
        if (sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.querySelector('.toggle-icon').textContent = '☰';
            }
            if (sidebarOverlay) {
                sidebarOverlay.classList.remove('active');
            }
        }
        closeModal();
    }
});

// Make toggleLanguage available globally
window.toggleLanguage = toggleLanguage;