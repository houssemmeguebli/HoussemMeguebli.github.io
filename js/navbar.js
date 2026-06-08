// Navbar — Clean, Safe JavaScript
document.addEventListener('DOMContentLoaded', function () {

    const navbar       = document.querySelector('.modern-navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navbarMenu   = document.querySelector('.navbar-menu');
    const navLinks     = document.querySelectorAll('.nav-link-modern');
    const scrollBar    = document.querySelector('.scroll-progress');

    /* ---- Scroll progress + scrolled class ---- */
    function updateScrollEffects() {
        if (!navbar) return;
        const scrolled   = window.scrollY;
        const maxScroll  = document.documentElement.scrollHeight - window.innerHeight;

        if (scrollBar && maxScroll > 0) {
            scrollBar.style.transform = `scaleX(${scrolled / maxScroll})`;
        }

        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateScrollEffects, { passive: true });
    updateScrollEffects();

    /* ---- Hamburger toggle ---- */
    if (mobileToggle && navbarMenu) {
        mobileToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = navbarMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    }

    /* ---- Close menu when clicking outside ---- */
    document.addEventListener('click', function (e) {
        if (!navbarMenu || !mobileToggle) return;
        if (navbar && navbar.contains(e.target)) return;
        if (navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });



    /* ---- Nav link clicks — smooth scroll + close menu ---- */
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                window.scrollTo({ top: target.offsetTop - 75, behavior: 'smooth' });
            }

            // Close mobile menu
            if (navbarMenu)   navbarMenu.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });


    /* ---- Rebuild indicator on resize ---- */
    window.addEventListener('resize', () => {
        const active = document.querySelector('.nav-link-modern.active');
        if (active && active) return; // no indicator to move
    });
});