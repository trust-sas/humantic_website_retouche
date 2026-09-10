// ===== SCRIPT JAVASCRIPT HUMANTIC =====


document.addEventListener('DOMContentLoaded', function () {

    // ===== NAVIGATION SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const navbarToggler = document.querySelector('.navbar-toggler');
                navbarToggler.click();
            }
        });
    });

    // ===== ANIMATED COUNTERS =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateCounters() {
        if (hasAnimated) return;

        statNumbers.forEach(stat => {
            // Use data-target if available, otherwise parse textContent
            let target = parseInt(stat.getAttribute('data-target'));
            if (isNaN(target)) {
                target = parseInt(stat.textContent.replace(/\D/g, '')); // Remove non-digits
            }

            // If still no valid number, skip animation
            if (isNaN(target)) return;

            const increment = target / 50; // Faster animation
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 30);
        });

        hasAnimated = true;
    }

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate counters when stats section is visible
                if (entry.target.id === 'stats') {
                    animateCounters();
                }

                // Add fade-in animation to elements
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            // Simple validation
            if (!name || !email || !message) {
                alert('Veuillez remplir tous les champs.');
                return;
            }

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Merci pour votre message ! Nous vous répondrons bientôt.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // ===== HERO BUTTONS SMOOTH SCROLL =====
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');

    heroButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== NAVBAR ACTIVE LINK HIGHLIGHTING =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

    window.addEventListener('scroll', updateActiveNavLink);

    // ===== LOADING ANIMATION =====
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

    console.log('🚀 Humantic website loaded successfully!');
    function loginAdmin() {
  const input = prompt("Entrez le mot de passe administrateur :");
  if (input === "humantic2026") {
    window.location.href = "admin_panel/admin.html"; 
  } else {
    alert("❌ Accès refusé.");
  }
}

// ===== BOUTON ADMIN =====
document.addEventListener("DOMContentLoaded", function() {
  const adminBtn = document.getElementById("adminBtn");

  if (adminBtn) {
    adminBtn.addEventListener("click", function() {
      const input = prompt("Entrez le mot de passe administrateur :");
      if (input === "humantic2026") {
        window.location.href = "admin_panel/admin.html"; 
      } else {
        alert("❌ Accès refusé.");
      }
    });
  }
});

});