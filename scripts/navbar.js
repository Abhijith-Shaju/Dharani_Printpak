/* NAVBAR COMPONENT LOGIC */

function initNavbar() {
    const navbar = document.getElementById("navbar");
    const navMenu = document.getElementById("nav-menu");
    
    if (!navbar || !navMenu) return;

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll("section[id]");
    const navLinks = navMenu.querySelectorAll("a");

    const observerOptions = {
        threshold: 0.3,
        rootMargin: "0px 0px -50% 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove("active"));

            // Add active class to corresponding link
            const sectionId = entry.target.id;
            const activeLink = navMenu.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Smooth scroll behavior
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", initNavbar);
