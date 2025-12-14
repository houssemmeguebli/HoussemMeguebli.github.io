// Enhanced Navbar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.modern-navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navLinks = document.querySelectorAll('.nav-link-modern');
    const scrollProgress = document.querySelector('.scroll-progress');
    const themeToggle = document.querySelector('.theme-toggle');

    // Enhanced scroll effects
    function updateScrollEffects() {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrolled / maxScroll) * 100;
        
        // Update progress bar
        scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
        
        // Update navbar appearance
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateScrollEffects);

    // Enhanced mobile menu toggle
    mobileToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        this.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const sunIcon = this.querySelector('.bi-sun-fill');
        const moonIcon = this.querySelector('.bi-moon-fill');
        
        if (document.body.classList.contains('dark-theme')) {
            sunIcon.style.opacity = '0';
            sunIcon.style.transform = 'translate(-50%, -50%) rotate(-180deg)';
            moonIcon.style.opacity = '1';
            moonIcon.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        } else {
            sunIcon.style.opacity = '1';
            sunIcon.style.transform = 'translate(-50%, -50%) rotate(0deg)';
            moonIcon.style.opacity = '0';
            moonIcon.style.transform = 'translate(-50%, -50%) rotate(180deg)';
        }
    });

    // Create sliding indicator
    const indicator = document.createElement('div');
    indicator.className = 'nav-indicator';
    document.querySelector('.navbar-menu').appendChild(indicator);

    // Dynamic active link tracking with sliding indicator
    function setActiveLink() {
        const sections = document.querySelectorAll('#mainHeader, #resume, #projets, #contact');
        const scrollPos = window.scrollY + 100;
        let activeSection = 'mainHeader';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop) {
                activeSection = sectionId;
            }
        });

        // Update active nav link and move indicator
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
                moveIndicator(link);
            }
        });
    }

    // Move indicator to active link
    function moveIndicator(activeLink) {
        const linkRect = activeLink.getBoundingClientRect();
        const menuRect = document.querySelector('.navbar-menu').getBoundingClientRect();
        const leftOffset = linkRect.left - menuRect.left;
        
        indicator.style.left = `${leftOffset}px`;
        indicator.style.width = `${linkRect.width}px`;
    }

    // Enhanced smooth scrolling with easing
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                // Smooth scroll with custom easing
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Immediately update active state and indicator
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                moveIndicator(this);
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
            
            // Close mobile menu with animation
            navbarMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });


    // Scroll to top button functionality
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    function toggleScrollButton() {
        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        }
    }
    
    // Enhanced active section tracking
    window.addEventListener('scroll', function() {
        setActiveLink();
        updateScrollEffects();
        toggleScrollButton();
    });
    
    // Initialize
    setActiveLink();
    updateScrollEffects();
    toggleScrollButton();
    
    // Initialize indicator position
    setTimeout(() => {
        const activeLink = document.querySelector('.nav-link-modern.active');
        if (activeLink) {
            moveIndicator(activeLink);
        }
    }, 100);
    
    // Scroll to top function
    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
});