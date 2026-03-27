// GSAP and modern animations for portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin();

    // Particle system
    createParticles();
    
    // Animated intro text
    animateIntroText();
    
    // Scroll-based animations
    initScrollAnimations();
    
    // Mobile menu
    initMobileMenu();
    
    // Smooth scrolling
    initSmoothScroll();
    
    // Download resume
    initDownloadResume();
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const size = Math.random() * 4 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Random color
        const colors = ['#4A90E2', '#904AE2', '#E24A90'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Animated intro text - letter by letter
function animateIntroText() {
    const text = "Hi, I'm Rajeswari Pokala";
    const animatedTextElement = document.getElementById('animated-text');
    
    // Clear existing content
    animatedTextElement.innerHTML = '';
    
    // Create span for each letter
    text.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter; // Handle spaces
        span.style.opacity = '0';
        span.style.transform = 'translateY(50px)';
        span.style.display = 'inline-block';
        
        // Add gradient to name
        if (index >= 7 && index <= 19) { // "Rajeswari Pokala" range
            span.classList.add('gradient-text');
        }
        
        animatedTextElement.appendChild(span);
        
        // Animate each letter with delay
        gsap.to(span, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out"
        });
    });
}

// Scroll-based animations with Intersection Observer
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.section-reveal');
    
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Animate section title
                const title = entry.target.querySelector('.section-title');
                if (title) {
                    gsap.to(title, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        delay: 0.2,
                        ease: "power3.out"
                    });
                }
                
                // Animate cards with stagger
                const cards = entry.target.querySelectorAll('.about-card, .skills-category, .project-card, .contact-item');
                gsap.to(cards, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.3,
                    stagger: 0.2,
                    ease: "power3.out"
                });
                
                // Animate skill tags with stagger
                const skillTags = entry.target.querySelectorAll('.skill-tag');
                if (skillTags.length > 0) {
                    gsap.to(skillTags, {
                        scale: 1,
                        duration: 0.5,
                        delay: 0.5,
                        stagger: 0.05,
                        ease: "back.out(1.7)"
                    });
                }
                
                // Animate social links
                const socialLinks = entry.target.querySelectorAll('.social-link');
                if (socialLinks.length > 0) {
                    gsap.to(socialLinks, {
                        scale: 1,
                        duration: 0.6,
                        delay: 0.6,
                        stagger: 0.1,
                        ease: "back.out(1.7)"
                    });
                }
                
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const navToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Download resume functionality
function initDownloadResume() {
    const downloadBtn = document.getElementById('download-resume');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a temporary link for download
            const link = document.createElement('a');
            link.href = '/assets/RajeswariPokala.pdf';
            link.download = 'RajeswariPokala.pdf';
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success feedback
            gsap.to(downloadBtn, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(26, 26, 42, 0.95)';
        navbar.style.backdropFilter = 'blur(25px)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
    } else {
        navbar.style.background = 'rgba(26, 26, 42, 0.6)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.4)';
    }
});

// Parallax effect for orbs
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        orb.style.transform = `translateY(${yPos}px)`;
    });
});

// Mouse move effect for interactive elements
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Subtle parallax for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        
        gsap.to('.hero::before', {
            x: moveX,
            y: moveY,
            duration: 1,
            ease: "power2.out"
        });
    }
});

// Add hover effects with GSAP
document.addEventListener('DOMContentLoaded', function() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.about-card, .skills-category, .project-card, .contact-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Profile image hover
    const profileImage = document.querySelector('.profile-image-container');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                rotation: 5,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        profileImage.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                rotation: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    }
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
window.addEventListener('scroll', debounce(function() {
    // Scroll-based animations here
}, 10));
