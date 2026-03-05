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

    if (!box3d || !mouthPath || !eyeRow) return; // Skip if hero not in viewport
    if (window.__heroAvatarInitialized) return;
    window.__heroAvatarInitialized = true;

    const scale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale')) || 1;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let currentEmotion = "neutral";
    const friction  = prefersReducedMotion ? 0.2 : 0.09;
    const lookRange = 560 * scale;
    const baseRotate = prefersReducedMotion ? 0 : 18;
    const basePupilShift = prefersReducedMotion ? 0 : 12;
    const shadowShift = prefersReducedMotion ? 0 : 34;

    let targetX = 0, targetY = 0;
    let curX    = 0, curY    = 0;
    let pointerX  = 0, pointerY  = 0;

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

    function onPointerMove(clientX, clientY) {
        pointerX = clientX;
        pointerY = clientY;
        const rect          = box3d.getBoundingClientRect();
        const avatarCenterX = rect.left + rect.width  / 2;
        const avatarCenterY = rect.top  + rect.height / 2;

        targetX = Math.max(-1, Math.min(1, (pointerX - avatarCenterX) / lookRange));
        targetY = Math.max(-1, Math.min(1, (pointerY - avatarCenterY) / lookRange));

        if (inquiryBtn) {
            const btnRect    = inquiryBtn.getBoundingClientRect();
            const btnCenterX = btnRect.left + btnRect.width  / 2;
            const btnCenterY = btnRect.top  + btnRect.height / 2;
            const dist       = Math.hypot(pointerX - btnCenterX, pointerY - btnCenterY);

            setEmotion(dist < 400 ? "happy" : "default");
        }
    }

    window.addEventListener("pointermove", (e) => {
        onPointerMove(e.clientX, e.clientY);
    }, { passive: true });

    function animateBox() {
        curX += (targetX - curX) * friction;
        curY += (targetY - curY) * friction;

        box3d.style.transform = `rotateY(${curX * baseRotate}deg) rotateX(${-curY * baseRotate}deg)`;

        pupils.forEach(pupil => {
            pupil.style.transform = `translate(${curX * basePupilShift * scale}px, ${curY * basePupilShift * scale}px)`;
        });

        if (shadow) {
            shadow.style.transform = `translateX(${-curX * shadowShift * scale}px)`;
            shadow.style.opacity   = prefersReducedMotion ? "0.28" : `${0.24 + Math.abs(curX) * 0.08}`;
        }

        requestAnimationFrame(animateBox);
    }

    animateBox();

    function blink() {
        lids.forEach(lid => lid.style.transform = "translateY(0%)");
        setTimeout(() => {
            lids.forEach(lid => lid.style.transform = "translateY(-100%)");
        }, prefersReducedMotion ? 80 : 110);
        setTimeout(blink, Math.random() * 3200 + 2100);
    }

    blink();
}

document.addEventListener("DOMContentLoaded", initHero);
