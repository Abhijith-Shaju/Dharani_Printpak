/* NAVBAR COMPONENT LOGIC */

function initNavbar() {
    const navbar = document.getElementById("navbar");
    const navMenu = document.getElementById("nav-menu");
    const mobileNavMenu = document.getElementById("mobile-nav-menu");
    const mobileNavToggle = document.getElementById("mobile-nav-toggle");
    
    if (!navbar || !navMenu) return;

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("#nav-menu a, #mobile-nav-menu a");

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
            const sectionId = normalizeSectionId(entry.target.id);
            const activeLinks = document.querySelectorAll(`#nav-menu a[href="#${sectionId}"], #mobile-nav-menu a[href="#${sectionId}"]`);
            activeLinks.forEach(link => link.classList.add("active"));
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Smooth scroll behavior
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(resolveHashTarget(href));
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            }

            if (mobileNavMenu && mobileNavToggle) {
                mobileNavMenu.classList.remove("is-open");
                mobileNavMenu.setAttribute("aria-hidden", "true");
                mobileNavToggle.classList.remove("is-open");
                mobileNavToggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    if (mobileNavMenu && mobileNavToggle) {
        mobileNavToggle.addEventListener("click", () => {
            const isOpen = mobileNavMenu.classList.toggle("is-open");
            mobileNavToggle.classList.toggle("is-open", isOpen);
            mobileNavToggle.setAttribute("aria-expanded", String(isOpen));
            mobileNavMenu.setAttribute("aria-hidden", String(!isOpen));
        });

        document.addEventListener("click", (e) => {
            const target = e.target;
            if (!(target instanceof Element)) return;
            if (!mobileNavMenu.classList.contains("is-open")) return;
            if (mobileNavMenu.contains(target) || mobileNavToggle.contains(target)) return;

            mobileNavMenu.classList.remove("is-open");
            mobileNavMenu.setAttribute("aria-hidden", "true");
            mobileNavToggle.classList.remove("is-open");
            mobileNavToggle.setAttribute("aria-expanded", "false");
        });
    }
}

document.addEventListener("DOMContentLoaded", initNavbar);
    function isMobileViewViewport(width = window.innerWidth || document.documentElement.clientWidth || 0) {
        const isPortrait = window.matchMedia
            ? window.matchMedia("(orientation: portrait)").matches
            : window.innerHeight >= window.innerWidth;
        return width <= 768 || (isPortrait && width <= 1024);
    }

    function normalizeSectionId(sectionId) {
        if (!isMobileViewViewport()) return sectionId;
        if (sectionId === "products-mobile") return "products";
        if (sectionId === "case-carousel-mobile") return "case-carousel";
        return sectionId;
    }

    function resolveHashTarget(href) {
        if (!isMobileViewViewport()) return href;
        if (href === "#products") return "#products-mobile";
        if (href === "#case-carousel") return "#case-carousel-mobile";
        return href;
    }
