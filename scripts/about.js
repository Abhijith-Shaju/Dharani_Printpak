/* ABOUT COMPONENT LOGIC */

function initAbout() {
    const section = document.getElementById("about");
    if (!section) return;

    // Timeline item animation
    const timelineItems = section.querySelectorAll(".timeline-item");
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
        });
    }, { threshold: 0.5 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateX(-20px)";
        item.style.transition = `all 0.6s ease ${index * 100}ms`;
        timelineObserver.observe(item);
    });
}

document.addEventListener("DOMContentLoaded", initAbout);
