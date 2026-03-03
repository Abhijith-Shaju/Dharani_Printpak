/* WHY CHOOSE US COMPONENT LOGIC */

function initWhyChooseUs() {
    const section = document.getElementById("why-choose-us");
    
    if (!section) return;

    // Stats animation on scroll
    const stats = section.querySelectorAll(".why-stat");
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const statNum = entry.target.querySelector(".why-stat-num");
            if (statNum && !entry.target.classList.contains("animated")) {
                entry.target.classList.add("animated");
                animateStatNumber(statNum);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));
}

function animateStatNumber(element) {
    const text = element.textContent.trim();
    const match = text.match(/\d+/);
    
    if (!match) return;
    
    const target = parseInt(match[0]);
    const duration = 2000; // 2 seconds
    const start = Date.now();
    
    const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(target * progress);
        
        element.textContent = current + text.replace(/\d+/, '');
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    animate();
}
document.addEventListener("DOMContentLoaded", initWhyChooseUs);
