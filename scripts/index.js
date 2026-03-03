document.addEventListener("DOMContentLoaded", function () {

    /* ============================================================
       1. REVEAL ON SCROLL + SINGLE-TRIGGER MAP
    ============================================================ */
    if ("IntersectionObserver" in window) {
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
    } else {
        document.querySelectorAll(".reveal").forEach(el => el.classList.add("active"));
        const mapAnim = document.getElementById("mapAnimationTrigger");
        if (mapAnim) mapAnim.beginElement();
    }


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

        const btnRect    = inquiryBtn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width  / 2;
        const btnCenterY = btnRect.top  + btnRect.height / 2;
        const dist       = Math.hypot(mouseX - btnCenterX, mouseY - btnCenterY);

        setEmotion(dist < 400 ? "happy" : "default");
    });

    function animateBox() {
        time += 0.025;

        curX += (targetX - curX) * friction;
        curY += (targetY - curY) * friction;

        box3d.style.transform = `rotateY(${curX * 22}deg) rotateX(${-curY * 22}deg)`;

        pupils.forEach(pupil => {
            pupil.style.transform = `translate(${curX * 14}px, ${curY * 14}px)`;
        });

        shadow.style.transform = `translateX(${-curX * 40}px)`;
        shadow.style.opacity   = 0.3;

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


    /* ============================================================
       3. PRODUCT CARD EXPAND (mobile product section)
    ============================================================ */
    const productParent = document.getElementById("product-flex-container");

    if (productParent) {
        document.querySelectorAll(".product-card").forEach(card => {
            card.addEventListener("click", () => {
                const isAlreadyActive = card.classList.contains("active");

                document.querySelectorAll(".product-card").forEach(c => {
                    c.classList.remove("active");
                    c.style.transform = "scale(1)";
                    c.style.flex      = "1";
                    c.style.height    = "10vh";
                });

                productParent.classList.remove("w-full");
                productParent.classList.add("w-1/2");

                if (!isAlreadyActive) {
                    card.classList.add("active");
                    card.style.flex      = "3";
                    card.style.transform = "scale(1.02)";
                    card.style.height    = "100%";

                    productParent.classList.remove("w-1/2");
                    productParent.classList.add("w-full");

                    document.querySelectorAll(".product-card:not(.active)").forEach(c => {
                        c.style.transform = "scale(0.5)";
                    });
                }
            });
        });
    }


    /* ============================================================
       4. PHONE INPUT (intl-tel-input)
    ============================================================ */
    const phoneInput = document.querySelector("#phone");
    let iti;

    if (phoneInput && window.intlTelInput) {
        iti = window.intlTelInput(phoneInput, {
            initialCountry: "auto",
            geoIpLookup: callback => {
                fetch("https://ipapi.co/json")
                    .then(res  => res.json())
                    .then(data => callback(data.country_code))
                    .catch(()  => callback("us"));
            },
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.5.0/build/js/utils.js",
        });
    }

    const rfqForm = document.querySelector('form[name="rfq"]');

    if (rfqForm && phoneInput && iti) {
        rfqForm.addEventListener("submit", function (e) {
            if (!iti.isValidNumber()) {
                e.preventDefault();
                alert("Please enter a valid phone number.");
                return;
            }
            phoneInput.value = iti.getNumber();
        });
    }


    /* ============================================================
       5. INFINITE PRODUCT CAROUSEL - DISABLED
    ============================================================ */
    // Removed in favor of case-carousel.js with manual controls


    /* ============================================================
       6. CUSTOM CURSOR CUBE
    ============================================================ */
    const cube = document.querySelector("#cursor-cube");
    let mouseX_Cube = 0, mouseY_Cube = 0;
    let cubeX = 0, cubeY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX_Cube    = e.clientX;
        mouseY_Cube    = e.clientY;
        cube.style.opacity = "1";
    });

    function animateCursor() {
        cubeX += (mouseX_Cube - cubeX) * 0.1;
        cubeY += (mouseY_Cube - cubeY) * 0.1;
        cube.style.transform = `translate3d(${cubeX - 10}px, ${cubeY - 10}px, 0)`;
        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    /* ============================================================
       7. LOGO SCROLL TRACK
    ============================================================ */
    function initLogoGrid() {
        const brandLogos = [
            "./resources/dpp/Pothys.svg",
            "./resources/dpp/Ranka.svg",
            "./resources/dpp/Rokde.svg",
            "./resources/dpp/sareen.svg",
            "./resources/dpp/SIlverpark21.svg",
            "./resources/dpp/AB.svg",
            "./resources/dpp/Abak.svg",
            "./resources/dpp/Arjuna.svg",
            "./resources/dpp/Bhima.svg",
            "./resources/dpp/CH.svg",
            "./resources/dpp/GANDVEDIKAR.svg",
            "./resources/dpp/Grt.svg",
            "./resources/dpp/hindi.svg",
            "./resources/dpp/Karthik.svg",
            "./resources/dpp/KHIMJI.svg",
            "./resources/dpp/M&M.svg",
            "./resources/dpp/Madhavan.svg",
            "./resources/dpp/navrathan.svg",
            "./resources/dpp/Popular.svg",
            "./resources/dpp/sukra.svg",
            "./resources/dpp/Tamil logo.svg",
            "./resources/dpp/Thattukadai.svg",
            "./resources/dpp/Vadnerkar.svg",
            "./resources/dpp/Voice of silver.svg",
            "./resources/dpp/Skandhaa.svg",
            "./resources/dpp/Sribalaji.svg",
            "./resources/dpp/Sri krishna.svg",
            "./resources/dpp/sri swarna.svg",
        ];

        const track = document.getElementById("logo-track");
        if (!track) return;

        /* Matches breakpoints in logo-track-responsive.css */
        function getCellSize() {
            const w = window.innerWidth;
            if (w >= 1280) return { width: 320, height: 210 };
            if (w >= 1024) return { width: 270, height: 185 };
            if (w >= 640)  return { width: 230, height: 155 };
            return             { width: 190, height: 120 };
        }

        function buildLogos() {
            track.innerHTML = "";

            const { width, height } = getCellSize();

            [...brandLogos, ...brandLogos].forEach((src, index) => {
                const li = document.createElement("li");
                li.style.width  = width  + "px";
                li.style.height = height + "px";
                if (index >= brandLogos.length) li.setAttribute("aria-hidden", "true");

                li.innerHTML = `
                    <img src="${src}" loading="lazy" alt="Partner logo"
                         style="width:100%; height:100%; object-fit:contain; display:block;" />
                `;
                track.appendChild(li);
            });

            /* Speed stays visually consistent across breakpoints */
            const totalWidth   = brandLogos.length * width;
            const pixelsPerSec = 120;
            const duration     = Math.round(totalWidth / pixelsPerSec);

            track.style.animation = "none";
            void track.offsetWidth; /* force reflow */
            track.style.animation = `logo-scroll ${duration}s linear infinite`;
        }

        buildLogos();

        /* Rebuild on resize */
        let logoResizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(logoResizeTimer);
            logoResizeTimer = setTimeout(buildLogos, 200);
        });

    }

    window.addEventListener("load", initLogoGrid);


    /* ============================================================
       8. MOBILE ACCORDION
    ============================================================ */
    document.querySelectorAll(".accordion-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const content = btn.closest("div").nextElementSibling;
            const icon    = btn.querySelector("b");
            const isOpen  = content.style.maxHeight;

            /* Close all */
            document.querySelectorAll(".accordion-content").forEach(c => {
                c.style.maxHeight = null;
            });
            document.querySelectorAll(".accordion-btn b").forEach(s => {
                s.textContent      = "+";
                s.style.transform  = "rotate(0deg)";
            });

            /* Open selected if it was closed */
            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.textContent        = "−";
                icon.style.transform    = "rotate(180deg)";
            }
        });
    });

});