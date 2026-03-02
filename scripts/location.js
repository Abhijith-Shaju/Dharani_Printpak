/* LOCATION COMPONENT LOGIC */

function initLocation() {
    const section = document.getElementById("location");
    if (!section) return;

    // Map animation trigger
    const mapAnim = section.querySelector("#mapAnimationTrigger");
    
    const locationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            if (mapAnim) {
                mapAnim.beginElement();
            }
            
            // Animate info cards
            const cards = section.querySelectorAll(".info-card");
            cards.forEach((card, index) => {
                card.style.opacity = "0";
                card.style.transform = "translateY(20px)";
                card.style.transition = `all 0.6s ease ${index * 100}ms`;
                
                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, index * 100);
            });
            
            locationObserver.unobserve(entry.target);
        });
    }, { threshold: 0.3 });

    locationObserver.observe(section);
}

document.addEventListener("DOMContentLoaded", initLocation);
