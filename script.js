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

// Contact Form Handler with WhatsApp Integration
// Contact Form Handler with WhatsApp Integration
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value || "Not provided";
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Format the message
            const whatsappMessage =
                `*New Contact Request from SafeByte*` +
                `%0a*Name:* ${name}` +
                `%0a*Email:* ${email}` +
                `%0a*Subject:* ${subject}` +
                `%0a*Message:* ${message}`;

            // WhatsApp API URL (Phone: 254726681949)
            const whatsappUrl = `https://wa.me/254726681949?text=${whatsappMessage}`;

            // Show success message briefly then redirect
            const formMessage = document.getElementById('formMessage');
            if (formMessage) {
                formMessage.innerHTML = '<span class="success-message" style="color: #4CAF50;">Redirecting to WhatsApp...</span>';
            }

            // Open WhatsApp in new tab
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                contactForm.reset();
                if (formMessage) formMessage.innerHTML = '';
            }, 1000);
        });
    }
});

// Load Footer dynamically
document.addEventListener("DOMContentLoaded", function() {
    const footerElement = document.querySelector('footer');
    if (!footerElement) return;

    const footerHTML = `
<div class="container">
    <div class="social-links">
        <a href="https://wa.me/254726681949" class="social-link" aria-label="WhatsApp">
            <svg class="icon" viewBox="0 0 24 24" fill="white" style="fill: white;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
        <a href="https://www.facebook.com/share/17pMFjycTV/" class="social-link" aria-label="Facebook">
            <svg class="icon" viewBox="0 0 24 24" fill="white" style="fill: white;"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
        <a href="https://www.tiktok.com/@clic.safe" class="social-link" aria-label="TikTok">
            <svg class="icon" viewBox="0 0 24 24" fill="white" style="fill: white;"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
        </a>
        <a href="https://www.instagram.com/clic.safe/" class="social-link" aria-label="Instagram">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="fill: none; stroke: white;"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
    </div>
    <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.2);">
        <p style="font-weight: bold; margin-bottom: 0.5rem; color: white;">University of Nairobi Kili Rovers Crew</p>
        <p style="font-size: 0.9rem; opacity: 0.9; margin-bottom: 0.5rem; color: white;">Kenya Scouts Association</p>
        <p style="font-size: 0.85rem; opacity: 0.8; color: white;">A community cybersecurity education initiative</p>
    </div>
    <p style="margin-top: 1rem; color: white;">&copy; <span id="current-year">${new Date().getFullYear()}</span> SafeByte. All rights reserved. | <a href="terms-privacy.html" class="footer-link">Privacy Policy</a> | <a href="terms-privacy.html" class="footer-link">Terms of Service</a></p>
</div>`;

    // Inject the footer HTML
    footerElement.innerHTML = footerHTML;
    
    // Fix relative links for subdirectory pages
    const currentPath = window.location.pathname;
    if (currentPath.includes('/')) {
        const depth = currentPath.split('/').filter(p => p && !p.endsWith('.html')).length - 1;
        if (depth > 0) {
            const prefix = '../'.repeat(depth);
            footerElement.querySelectorAll('a[href]').forEach(link => {
                const href = link.getAttribute('href');
                if (href && !href.match(/^(https?:|mailto:|#)/)) {
                    link.setAttribute('href', prefix + href);
                }
            });
        }
    }
    
    console.log('✓ Footer loaded with', footerElement.querySelectorAll('.social-link').length, 'social icons');
});