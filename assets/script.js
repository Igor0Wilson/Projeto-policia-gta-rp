document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.main-nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Interaction Observer for Fade-in ---
    const faders = document.querySelectorAll('.fade-in-on-scroll');
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // --- TAB SYSTEM LOGIC ---
    
    // Get all tab triggers (from navbar and inner section)
    const tabTriggers = document.querySelectorAll('.tab-item, .nav-tab');
    // Get all tab content panes
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to switch tabs
    function switchTab(targetId) {
        // 1. Remove active state from all contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // 2. Remove active state from all triggers
        tabTriggers.forEach(trigger => {
            trigger.classList.remove('active');
        });

        // 3. Add active state to matching content
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // 4. Add active state to triggers that point to this target
        tabTriggers.forEach(trigger => {
            const dataTarget = trigger.getAttribute('data-target') || trigger.getAttribute('data-tab');
            if (dataTarget === targetId) {
                trigger.classList.add('active');
            }
        });

        // Optional: Smooth scroll down to the content area if clicked from Navbar
        // So the user sees the newly opened tab content immediately
        const mainContentArea = document.querySelector('.main-content');
        if (mainContentArea && window.scrollY < (mainContentArea.offsetTop - 100)) {
            window.scrollTo({
                top: mainContentArea.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }

    // Attach click events
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent jump for achor tags in navbar
            
            const targetId = trigger.getAttribute('data-target') || trigger.getAttribute('data-tab');
            if (targetId) {
                switchTab(targetId);

                // Close mobile menu if clicked from there
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileMenu.querySelector('i');
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

});
