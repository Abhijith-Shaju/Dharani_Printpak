/* GLOBAL PAGE LOGIC (non-component-specific) */

function initGlobalCursorCube() {
    const cube = document.getElementById("cursor-cube");
    if (!cube) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

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
