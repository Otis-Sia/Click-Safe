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

// Highlight the current section in the main navbar
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".nav-links a");
    if (!navLinks.length) return;

    // If a link is already marked active in the HTML, respect it
    const hasExplicitActive = Array.from(navLinks).some(link => link.classList.contains("active"));
    if (hasExplicitActive) return;

    const path = window.location.pathname.toLowerCase();

    function activateLink(matchFn) {
        const link = Array.from(navLinks).find(matchFn);
        if (link) {
            link.classList.add("active");
            return true;
        }
        return false;
    }

    // Section-based highlighting for subdirectories
    if (path.includes("/personal-security/")) {
        if (activateLink(l => l.textContent.trim().toLowerCase().startsWith("personal security"))) return;
    } else if (path.includes("/family-home/")) {
        if (activateLink(l => l.textContent.trim().toLowerCase().startsWith("family & home"))) return;
    } else if (path.includes("/business/")) {
        if (activateLink(l => l.textContent.trim().toLowerCase().startsWith("small business"))) return;
    } else if (path.includes("/resources/")) {
        if (activateLink(l => l.textContent.trim().toLowerCase().startsWith("resources"))) return;
    } else if (path.includes("/ask-expert/")) {
        // Covers both "Ask Expert" and "Ask an Expert"
        if (activateLink(l => l.textContent.trim().toLowerCase().startsWith("ask"))) return;
    }

    // Fallback: highlight Home on the main page when nothing else matched
    activateLink(l => l.textContent.trim().toLowerCase() === "home");
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

// SVG Icons
const SUN_ICON = '<svg class="icon" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>';
const MOON_ICON = '<svg class="icon" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>';

// Dark Mode Toggle
function toggleDarkMode() {
    document.documentElement.classList.toggle("dark-mode");
    const isDarkMode = document.documentElement.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
    updateDarkModeButton();
}

function updateDarkModeButton() {
    const buttons = document.querySelectorAll('.dark-mode-toggle');
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    buttons.forEach(button => {
        button.innerHTML = isDarkMode ? SUN_ICON : MOON_ICON;
        button.setAttribute('aria-label', isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
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