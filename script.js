// Banner Slider Functionality
class BannerSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Start auto-slide
        this.startAutoSlide();
        
        // Pause on hover
        const slider = document.querySelector('.banner-slider');
        slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        slider.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    goToSlide(slideIndex) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = slideIndex;
        
        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Mobile Navigation Toggle
class MobileNav {
    constructor() {
        this.createMobileToggle();
        this.handleDropdowns();
    }
    
    createMobileToggle() {
        // Create mobile menu toggle button
        const navbar = document.querySelector('.navbar');
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        toggleBtn.style.display = 'none';
        
        // Insert toggle button
        navbar.insertBefore(toggleBtn, navbar.firstChild);
        
        // Add toggle functionality
        toggleBtn.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('mobile-active');
            
            const icon = toggleBtn.querySelector('i');
            icon.className = navMenu.classList.contains('mobile-active') 
                ? 'fas fa-times' 
                : 'fas fa-bars';
        });
        
        // Show/hide toggle based on screen size
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }
    
    handleResize() {
        const toggleBtn = document.querySelector('.mobile-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            toggleBtn.style.display = 'block';
        } else {
            toggleBtn.style.display = 'none';
            navMenu.classList.remove('mobile-active');
        }
    }
    
    handleDropdowns() {
        // Handle dropdown menus on mobile
        const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
        
        dropdownItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const dropdown = item.querySelector('.dropdown-menu');
                    dropdown.classList.toggle('mobile-show');
                }
            });
        });
    }
}

// Search Functionality
class SearchHandler {
    constructor() {
        this.searchInput = document.querySelector('.search-box input');
        this.init();
    }
    
    init() {
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
        
        // Add search icon click handler
        const searchIcon = document.querySelector('.search-box i');
        searchIcon.addEventListener('click', () => this.performSearch());
    }
    
    performSearch() {
        const query = this.searchInput.value.trim();
        if (query) {
            // In a real implementation, this would redirect to search results
            alert(`Searching for: ${query}`);
            // window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
    }
}

// Language Toggle
class LanguageToggle {
    constructor() {
        this.toggleBtn = document.querySelector('.lang-toggle');
        this.isHindi = false;
        this.init();
    }
    
    init() {
        this.toggleBtn.addEventListener('click', () => {
            this.toggleLanguage();
        });
    }
    
    toggleLanguage() {
        this.isHindi = !this.isHindi;
        this.toggleBtn.textContent = this.isHindi ? 'English' : 'हिंदी';
        
        // In a real implementation, this would change the page language
        // For demo purposes, we'll just show an alert
        const lang = this.isHindi ? 'Hindi' : 'English';
        console.log(`Language switched to: ${lang}`);
    }
}

// Smooth Scrolling for Internal Links
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        // Add smooth scrolling to all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Animation on Scroll
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, this.observerOptions);
        
        // Observe elements
        const animateElements = document.querySelectorAll('.link-card, .news-item, .minister-card');
        animateElements.forEach(el => {
            el.classList.add('animate-element');
            this.observer.observe(el);
        });
    }
}

// Gallery Slider Functionality
class GallerySlider {
    constructor() {
        this.slides = document.querySelectorAll('.gallery-slide');
        this.prevBtn = document.querySelector('.gallery-prev');
        this.nextBtn = document.querySelector('.gallery-next');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        if (this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.startAutoSlide();
        
        const gallery = document.querySelector('.gallery-slider');
        gallery.addEventListener('mouseenter', () => this.stopAutoSlide());
        gallery.addEventListener('mouseleave', () => this.startAutoSlide());
    }
    
    goToSlide(slideIndex) {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = slideIndex;
        this.slides[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 3000);
    }
    
    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.header = document.querySelector('.header');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const headerHeight = this.header.offsetHeight;
            
            if (window.scrollY >= headerHeight) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// Enhanced Scroll Animations
class EnhancedScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.classList.contains('animate-on-scroll')) {
                        element.classList.add('fade-in');
                    }
                    if (element.classList.contains('animate-slide-left')) {
                        element.classList.add('slide-in');
                    }
                    if (element.classList.contains('animate-slide-right')) {
                        element.classList.add('slide-in');
                    }
                    if (element.classList.contains('animate-scale')) {
                        element.classList.add('scale-in');
                    }
                }
            });
        }, this.observerOptions);
        
        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale');
        animatedElements.forEach(el => this.observer.observe(el));
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BannerSlider();
    new MobileNav();
    new SearchHandler();
    new LanguageToggle();
    new SmoothScroll();
    new EnhancedScrollAnimations();
    new GallerySlider();
    new NavbarScroll();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Add CSS for mobile navigation and animations
const additionalStyles = `
    .mobile-toggle {
        background: #e74c3c;
        color: white;
        border: none;
        padding: 10px;
        font-size: 18px;
        cursor: pointer;
        border-radius: 4px;
        margin: 10px 20px;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: #2c3e50;
            flex-direction: column;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .nav-menu.mobile-active {
            max-height: 500px;
        }
        
        .dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            box-shadow: none;
            background: #34495e;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .dropdown-menu.mobile-show {
            max-height: 200px;
        }
        
        .dropdown-menu li a {
            color: white;
            border-bottom: 1px solid #2c3e50;
        }
    }
    
    .animate-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-element.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);