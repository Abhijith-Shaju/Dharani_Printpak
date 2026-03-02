/* HERO COMPONENT LOGIC */

function initHero() {
    /* ============================================================
       1. REVEAL ON SCROLL + SINGLE-TRIGGER MAP
    ============================================================ */
    const scrollObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("active");

            if (entry.target.id === "location") {
                const mapAnim = document.getElementById("mapAnimationTrigger");
                if (mapAnim) mapAnim.beginElement();
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll(".reveal, #location").forEach(el => {
        scrollObserver.observe(el);
    });


    /* ============================================================
       2. AVATAR / BOX-3D LOGIC
    ============================================================ */
    const box3d      = document.getElementById("box-3d");
    const shadow     = document.getElementById("ground-shadow");
    const pupils     = document.querySelectorAll(".pupil");
    const lids       = document.querySelectorAll(".lid");
    const mouthPath  = document.getElementById("mouth-path");
    const eyeRow     = document.getElementById("eye-row");
    const inquiryBtn = document.getElementById("inquiry-btn");

    if (!box3d) return; // Skip if hero not in viewport

    let currentEmotion = "neutral";
    const friction  = 0.08;
    const lookRange = 600;

    let targetX = 0, targetY = 0;
    let curX    = 0, curY    = 0;
    let mouseX  = 0, mouseY  = 0;
    let time    = 0;

    function setEmotion(type) {
        if (currentEmotion === type) return;
        currentEmotion = type;

        if (type === "happy") {
            mouthPath.setAttribute("d", "M15 20 Q50 45 85 20");
            eyeRow.style.transform = "scaleY(1)";
        } else {
            mouthPath.setAttribute("d", "M30 25 Q50 45 70 25 Q50 5 30 25");
            eyeRow.style.transform = "scaleY(1.2)";
        }
    }

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const rect          = box3d.getBoundingClientRect();
        const avatarCenterX = rect.left + rect.width  / 2;
        const avatarCenterY = rect.top  + rect.height / 2;

        targetX = Math.max(-1, Math.min(1, (mouseX - avatarCenterX) / lookRange));
        targetY = Math.max(-1, Math.min(1, (mouseY - avatarCenterY) / lookRange));

        if (inquiryBtn) {
            const btnRect    = inquiryBtn.getBoundingClientRect();
            const btnCenterX = btnRect.left + btnRect.width  / 2;
            const btnCenterY = btnRect.top  + btnRect.height / 2;
            const dist       = Math.hypot(mouseX - btnCenterX, mouseY - btnCenterY);

            setEmotion(dist < 400 ? "happy" : "default");
        }
    });

    function animateBox() {
        time += 0.025;

        curX += (targetX - curX) * friction;
        curY += (targetY - curY) * friction;

        box3d.style.transform = `rotateY(${curX * 22}deg) rotateX(${-curY * 22}deg)`;

        pupils.forEach(pupil => {
            pupil.style.transform = `translate(${curX * 14}px, ${curY * 14}px)`;
        });

        if (shadow) {
            shadow.style.transform = `translateX(${-curX * 40}px)`;
            shadow.style.opacity   = 0.3;
        }

        requestAnimationFrame(animateBox);
    }

    animateBox();

    function blink() {
        lids.forEach(lid => lid.style.transform = "translateY(0%)");
        setTimeout(() => {
            lids.forEach(lid => lid.style.transform = "translateY(-100%)");
        }, 120);
        setTimeout(blink, Math.random() * 4000 + 2500);
    }

    blink();
}

document.addEventListener("DOMContentLoaded", initHero);
