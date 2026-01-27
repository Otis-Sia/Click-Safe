// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    if (navLinks) {
        navLinks.classList.toggle("active");
    }
}

// Close mobile menu when a link is clicked
function closeMenu() {
    const navLinks = document.querySelector(".nav-links");
    if (navLinks) {
        navLinks.classList.remove("active");
    }
}

// Close mobile menu when window is resized to desktop size
window.addEventListener("resize", function() {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

// Close menu when clicking on nav links
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".nav-links a, .nav-links button");
    navLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
});

// Newsletter form submission
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;

    if (email) {
        alert(
            `Thank you for subscribing with ${email}! Check your inbox for our security tips.`,
        );
        event.target.reset();
    }
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.documentElement.classList.toggle("dark-mode");
    const isDarkMode = document.documentElement.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
    updateDarkModeButton();
}

function updateDarkModeButton() {
    const button = document.querySelector(".dark-mode-toggle");
    if (button) {
        button.textContent = document.documentElement.classList.contains(
                "dark-mode",
            ) ?
            "☀️" :
            "🌙";
    }
}

// Initialize dark mode from localStorage
function initDarkMode() {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
    }
    updateDarkModeButton();
}

// Call initDarkMode when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDarkMode);
} else {
    initDarkMode();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Mobile menu toggle (for future mobile nav implementation)
function toggleMobileMenu() {
    const navLinks = document.querySelector(".nav-links");
    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
    }
}

// Intersection Observer for lazy animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "slideInUp 0.6s ease forwards";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all path cards for animation
document.querySelectorAll(".path-card").forEach((card) => {
    observer.observe(card);
});