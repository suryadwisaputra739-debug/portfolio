// ============================================
// DARK MODE TOGGLE
// ============================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Theme toggle event
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update icon berdasarkan theme
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    themeToggle.classList.remove('sun');
    
    if (theme === 'light') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeToggle.classList.add('sun');
        themeToggle.title = 'Switch to Dark Mode';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeToggle.title = 'Switch to Light Mode';
    }
}

// ============================================
// DOM ELEMENTS & VARIABLES
// ============================================
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const progressBar = document.querySelector('.progress-bar');
const skillBars = document.querySelectorAll('.skill-progress');

// ============================================
// 1. HAMBURGER MENU TOGGLE
// ============================================
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.style.transform = navMenu.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0)';
});

// Close menu when nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.style.transform = 'rotate(0)';
    });
});

// ============================================
// 2. SMOOTH SCROLL & ACTIVE MENU
// ============================================
window.addEventListener('scroll', () => {
    // Update progress bar
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrollPercentage + '%';

    // Update active nav link
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// ============================================
// 3. BACK TO TOP BUTTON
// ============================================
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// 4. SKILL PROGRESS BARS ANIMATION
// ============================================
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            bar.style.width = width;
        }, 100);
    });
};

// Intersection Observer untuk trigger animation ketika section skill terlihat
const skillSection = document.getElementById('skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillSection) {
    observer.observe(skillSection);
}

// ============================================
// 5. FADE IN ANIMATIONS ON SCROLL
// ============================================
const fadeElements = document.querySelectorAll('[class*="fadeInUp"], [class*="slideIn"]');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'none';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    fadeObserver.observe(el);
});

// ============================================
// 6. SMOOTH HOVER EFFECTS
// ============================================
const skillCards = document.querySelectorAll('.skill-card');
const timelineItems = document.querySelectorAll('.timeline-content');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
});

timelineItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
});

// ============================================
// 7. TYPING ANIMATION (Optional enhancement)
// ============================================
const typeText = (element, text, speed = 50) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Apply to subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    typeText(heroSubtitle, originalText, 50);
}

// ============================================
// 8. PARALLAX EFFECT (Optional)
// ============================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `center ${window.scrollY * 0.5}px`;
    }
});

// ============================================
// 9. FORM VALIDATION (If added in future)
// ============================================
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            input.style.borderColor = '#c9a84c';
        }
    });
    
    return isValid;
};

// ============================================
// 10. GSAP-LIKE ANIMATION HELPER
// ============================================
const animateElement = (element, duration = 1, delay = 0) => {
    element.style.animation = `fadeInUp ${duration}s ease-out ${delay}s backwards`;
};

// Apply to all elements dengan animation class
document.querySelectorAll('.section, .skill-card, .timeline-item').forEach((el, index) => {
    el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s backwards`;
});

// ============================================
// 11. LAZY LOADING IMAGE OPTIMIZATION
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// 12. CONSOLE EASTER EGG
// ============================================
console.log('%cWelcome to Surya\'s Portfolio! 👋', 'color: #c9a84c; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #c9a84c;');
console.log('%cMade with ❤️ by Surya Dwi Saputra', 'color: #f0d080; font-size: 14px;');
console.log('%cConnect with me:', 'color: #c9a84c; font-weight: bold;');
console.log('%cInstagram: @sryaasptraa', 'color: #E4405F; font-size: 12px;');
console.log('%cLinkedIn: linkedin.com/in/surya-dwi-saputra-48396b37a', 'color: #0077B5; font-size: 12px;');
console.log('%cWhatsApp: +62 857 3081 9709', 'color: #25D366; font-size: 12px;');