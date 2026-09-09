// ===== SCRIPT JAVASCRIPT HUMANTIC =====

document.addEventListener("DOMContentLoaded", function () {
  // ===== NAVIGATION SCROLL EFFECT =====
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // si le lien pointe vers une autre page (ex:index.html#about), on naviguer normalement
      if (href.includes(".html")) {
        return;
      }
      e.preventDefault(); // empeche le saut brutal par defaut du navigateur

      const targetId = href;
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // evite de faire passer le navbar fixe

        window.scrollTo({
          // anime le défilement
          top: offsetTop,
          behavior: "smooth",
        });
      }

      // ferme le menu mobile s'il est ouvert après d'un clic
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        const navbarToggler = document.querySelector(".navbar-toggler");
        navbarToggler.click();
      }
    });
  });

  // compteurs animés
  const statNumbers = document.querySelectorAll(".stat-number");
  let hasAnimated = false;

  function animateCounters() {
    if (hasAnimated) return;

    statNumbers.forEach((stat) => {
      // Use data-target if available, otherwise parse textContent
      let target = parseInt(stat.getAttribute("data-target"));
      if (isNaN(target)) {
        target = parseInt(stat.textContent.replace(/\D/g, "")); // Remove non-digits
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
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animate counters when stats section is visible
        if (entry.target.id === "stats") {
          animateCounters();
        }

        // Add fade-in animation to elements
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe sections for animations
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.classList.add("fade-in");
    observer.observe(section);
  });

  // ===== CONTACT FORM HANDLING =====
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector("textarea").value;

      // Simple validation
      if (!name || !email || !message) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Envoi en cours...";
      submitBtn.disabled = true;

      setTimeout(() => {
        alert("Merci pour votre message ! Nous vous répondrons bientôt.");
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // ===== HERO BUTTONS SMOOTH SCROLL =====
  const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');

  heroButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // ===== NAVBAR ACTIVE LINK HIGHLIGHTING =====
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);

  // ===== LOADING ANIMATION =====
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");
  });

  console.log("🚀 Humantic website loaded successfully!");

  //  DONATION MODAL LOGIC
  const donationTabs = document.querySelectorAll(".donation-tab");
  donationTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      donationTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
    });
  });

  const amountButtons = document.querySelectorAll(".amount-btn");
  const customAmountInput = document.getElementById("customAmount");

  amountButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      amountButtons.forEach((b) => b.classList.remove("selected"));
      this.classList.add("selected");
      customAmountInput.value = this.getAttribute("data-amount");
    });
  });

  if (customAmountInput) {
    customAmountInput.addEventListener("input", function () {
      amountButtons.forEach((b) => b.classList.remove("selected"));
    });
  }

  const paymentButtons = document.querySelectorAll(".payment-option-btn");
  paymentButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      paymentButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // VALIDATION NUMÉRO DE TÉLÉPHONE
  const phoneInput = document.getElementById("donationPhone");
  const phoneError = document.getElementById("phoneError");

  // Formats acceptés : 6XXXXXXXX / +2376XXXXXXXX / 237 6XX XX XX XX (avec ou sans espaces)
  function isValidCameroonPhone(value) {
    const cleaned = value.replace(/\s+/g, "");
    const regex = /^(\+?237)?6[0-9]{8}$/;
    return regex.test(cleaned);
  }

  function validatePhone() {
    const value = phoneInput.value.trim();

    if (value === "") {
      phoneInput.classList.remove("is-invalid");
      phoneError.classList.remove("show");
      return false;
    }

    if (!isValidCameroonPhone(value)) {
      phoneInput.classList.add("is-invalid");
      phoneError.textContent =
        "Numéro invalide. Format attendu : 6XX XX XX XX (ex. +237 655 12 34 56)";
      phoneError.classList.add("show");
      return false;
    }

    phoneInput.classList.remove("is-invalid");
    phoneError.classList.remove("show");
    return true;
  }

  if (phoneInput) {
    phoneInput.addEventListener("blur", validatePhone);
    phoneInput.addEventListener("input", function () {
      if (phoneInput.classList.contains("is-invalid")) {
        validatePhone();
      }
    });
  }

  const donationForm = document.querySelector(".donation-form");
  if (donationForm) {
    donationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const phoneValue = phoneInput.value.trim();

      if (phoneValue === "") {
        phoneInput.classList.add("is-invalid");
        phoneError.textContent = "Veuillez saisir votre numéro de téléphone.";
        phoneError.classList.add("show");
        phoneInput.focus();
        return;
      }

      if (!isValidCameroonPhone(phoneValue)) {
        phoneInput.classList.add("is-invalid");
        phoneError.textContent =
          "Numéro invalide. Format attendu : 6XX XX XX XX (ex. +237 655 12 34 56)";
        phoneError.classList.add("show");
        phoneInput.focus();
        return;
      }

      const submitBtn = this.querySelector(".donation-submit-btn");
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = "Traitement en cours...";
      submitBtn.disabled = true;

      setTimeout(() => {
        alert(
          "Merci infiniment pour votre générosité ! Vous recevrez une confirmation sur votre téléphone.",
        );
        this.reset();
        amountButtons.forEach((b) => b.classList.remove("selected"));
        phoneInput.classList.remove("is-invalid");
        phoneError.classList.remove("show");
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        const modalEl = document.getElementById("donationModal");
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (modalInstance) modalInstance.hide();
      }, 2000);
    });
  }
});
