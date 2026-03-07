/* GLOBAL PAGE LOGIC (non-component-specific) */

function isMobileViewViewport(width = window.innerWidth || document.documentElement.clientWidth || 0) {
    const isPortrait = window.matchMedia
        ? window.matchMedia("(orientation: portrait)").matches
        : window.innerHeight >= window.innerWidth;
    return width <= 768 || (isPortrait && width <= 1024);
}

function resolveMobileHashTarget(hash) {
    if (!isMobileViewViewport()) return hash;
    if (hash === "#products") return "#products-mobile";
    if (hash === "#case-carousel") return "#case-carousel-mobile";
    return hash;
}

function initGlobalMobileHashRouting() {
    document.addEventListener("click", (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;

        const link = target.closest("a[href^='#']");
        if (!link) return;

        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        const resolvedHash = resolveMobileHashTarget(href);
        if (resolvedHash === href) return;

        const section = document.querySelector(resolvedHash);
        if (!section) return;

        e.preventDefault();
        section.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", resolvedHash);
    });

    const syncHashTarget = () => {
        const hash = window.location.hash;
        if (!hash) return;

        const resolvedHash = resolveMobileHashTarget(hash);
        if (resolvedHash === hash) return;

        const section = document.querySelector(resolvedHash);
        if (!section) return;

        section.scrollIntoView({ behavior: "auto" });
        history.replaceState(null, "", resolvedHash);
    };

    window.addEventListener("hashchange", syncHashTarget);
    window.addEventListener("resize", syncHashTarget, { passive: true });
    syncHashTarget();
}

function initGlobalCursorCube() {
    const cube = document.getElementById("cursor-cube");
    if (!cube) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
        cube.style.display = "none";
        return;
    }

    const isTouchScreen = () =>
        window.matchMedia("(pointer: coarse)").matches ||
        navigator.maxTouchPoints > 0 ||
        "ontouchstart" in window;

    const isTabletLandscape = () => {
        const width = window.innerWidth || document.documentElement.clientWidth || 0;
        const isLandscape = window.matchMedia
            ? window.matchMedia("(orientation: landscape)").matches
            : window.innerWidth >= window.innerHeight;
        return isLandscape && width >= 769 && width <= 1366;
    };

    const shouldHideCursorCube = () => isTouchScreen() || isTabletLandscape();
    if (shouldHideCursorCube()) {
        cube.style.opacity = "0";
        cube.style.display = "none";
        return;
    }

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    window.addEventListener("pointermove", (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        cube.style.opacity = "1";
    }, { passive: true });

    function animate() {
        curX += (targetX - curX) * 0.1;
        curY += (targetY - curY) * 0.1;
        cube.style.transform = `translate3d(${curX - 10}px, ${curY - 10}px, 0)`;
        requestAnimationFrame(animate);
    }

    animate();
}

document.addEventListener("DOMContentLoaded", initGlobalCursorCube);
document.addEventListener("DOMContentLoaded", initGlobalMobileHashRouting);
