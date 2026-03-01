document.addEventListener("DOMContentLoaded", function () {

    /* ================================
    1. Reveal On Scroll + Single-Trigger Map
    ================================ */
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the standard reveal class
                entry.target.classList.add('active');

                // Handle the Map Animation Trigger
                if (entry.target.id === 'location') {
                    const mapAnim = document.getElementById('mapAnimationTrigger');
                    if (mapAnim) {
                        mapAnim.beginElement();
                    }
                    
                    // IMPORTANT: This line makes it happen ONLY ONCE
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.2 });

    // Observe your elements
    document.querySelectorAll('.reveal, #location').forEach((el) => {
        observer.observe(el);
    });

    /* ================================
    2. Unified Avatar Logic
    ================================ */
    const box3d = document.getElementById('box-3d');
    const shadow = document.getElementById("ground-shadow");
    const pupils = document.querySelectorAll('.pupil');
    const lids = document.querySelectorAll('.lid');
    const mouthPath = document.getElementById('mouth-path');
    const eyeRow = document.getElementById('eye-row');
    const inquiryBtn = document.getElementById('inquiry-btn');

    // State Variables
    let currentEmotion = "neutral";
    const friction = 0.08; 
    const lookRange = 600; 

    // Animation variables
    let targetX = 0, targetY = 0;
    let curX = 0, curY = 0;
    let mouseX = 0, mouseY = 0;
    let time = 0; // NEW: Tracks time for the breathing cycle

    /* --- Emotion System --- */
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

    /* --- Input Tracking --- */
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const rect = box3d.getBoundingClientRect();
        const avatarCenterX = rect.left + rect.width / 2;
        const avatarCenterY = rect.top + rect.height / 2;

        const deltaX = mouseX - avatarCenterX;
        const deltaY = mouseY - avatarCenterY;

        targetX = Math.max(-1, Math.min(1, deltaX / lookRange));
        targetY = Math.max(-1, Math.min(1, deltaY / lookRange));

        const btnRect = inquiryBtn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;

        const dist = Math.sqrt(
            Math.pow(mouseX - btnCenterX, 2) +
            Math.pow(mouseY - btnCenterY, 2)
        );

        if (dist < 400) {
            setEmotion("happy");
        } else {
            setEmotion("default");
        }
    });

    /* --- Main Animation Loop --- */
    function animate() {
        // 1. Increment Time (Change 0.03 to 0.05 for faster breathing)
        time += 0.025;

        // 2. Calculate the "Breath" pulse using Sine
        // This oscillates between ~0.98 and ~1.02

        // Smoothing for mouse movement
        curX += (targetX - curX) * friction;
        curY += (targetY - curY) * friction;

        // 3. Apply Rotation + Breathing Scale
        box3d.style.transform = `
            rotateY(${curX * 22}deg)
            rotateX(${-curY * 22}deg)
        `;

        // 4. Update Pupils
        pupils.forEach(pupil => {
            pupil.style.transform = `translate(${curX * 14}px, ${curY * 14}px)`;
        });

        // 5. Update Shadow (Sync with breath)
        // The shadow gets slightly larger/fainter as the box "inhales"
        shadow.style.transform = `
            translateX(${-curX * 40}px)
        `;
        shadow.style.opacity = 0.3 ;

        requestAnimationFrame(animate);
    }

    animate();

    /* --- Random Blinking --- */
    function blink() {
        lids.forEach(lid => lid.style.transform = 'translateY(0%)');
        setTimeout(() => {
            lids.forEach(lid => lid.style.transform = 'translateY(-100%)');
        }, 120);
        setTimeout(blink, Math.random() * 4000 + 2500);
    }

    blink();

    const productParent = document.getElementById('product-flex-container');

    if (productParent) {
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const isAlreadyActive = card.classList.contains('active');

                document.querySelectorAll('.product-card').forEach(c => {
                    c.classList.remove('active');
                    c.style.transform = "scale(1)";
                    c.style.flex = "1";
                    c.style.height = "10vh";
                    productParent.classList.remove("w-full");
                    productParent.classList.add("w-1/2");
                });

                if (!isAlreadyActive) {
                    card.classList.add('active');
                    card.style.flex = "3";
                    card.style.transform = "scale(1.02)";
                    card.style.height = "100%";
                    productParent.classList.remove("w-1/2");
                    productParent.classList.add("w-full");

                    document.querySelectorAll('.product-card:not(.active)').forEach(c => {
                        c.style.transform = "scale(0.5)";
                    });
                }
            });
        });
    }




    const input = document.querySelector("#phone");

    let iti;
    if (input && window.intlTelInput) {
        iti = window.intlTelInput(input, {
            initialCountry: "auto",
            geoIpLookup: callback => {
                fetch("https://ipapi.co/json")
                .then(res => res.json())
                .then(data => callback(data.country_code))
                .catch(() => callback("us"));
            },
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.5.0/build/js/utils.js",
        });
    }

    // Inject full international number before Netlify submission
    const form = document.querySelector('form[name="rfq"]');

    if (form && input && iti) {
        form.addEventListener("submit", function (e) {
            if (!iti.isValidNumber()) {
            e.preventDefault();
            alert("Please enter a valid phone number.");
            return;
            }

            input.value = iti.getNumber(); // <-- This is the important line
        });
    }



function initInfiniteCarousel() {
    const showcaseItems = [
        { image: "resources/box_photos/MC/M1.png",    category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/M2.png",    category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/M3.png",    category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/M5.png",    category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/M6.png",    category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/M8.png",    category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/M9.png",    category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/M10.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/MN1.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/MN2.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R1.png",    category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R2.png",    category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R4.png",    category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R5.png",    category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R6.png",    category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R7.png",    category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R8.png",    category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R9.png",    category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R10.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R11.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R12.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R14.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN1.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN3.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN4.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN5.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN7.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN9.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN14.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN15.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN16.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN17.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/PB/PB1.png",   category: "PAPERBOARD",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/PB/PB2.png",   category: "PAPERBOARD",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/PB/PB3.png",   category: "PAPERBOARD",   title: "Luxury Electronics Packaging" },
    ];

    const track   = document.getElementById("carousel-track");
    const buttons = document.querySelectorAll(".filter-btn");
    if (!track) return;

    /* ── Responsive card width ── */
    function getCardWidth() {
        const w = window.innerWidth;
        if (w >= 1024) return 420;
        if (w >= 640)  return 320;
        return 260;
    }

    function buildCards(filteredItems) {
        if (!filteredItems.length) return;

        const cardW          = getCardWidth();
        const secondsPerCard = 2;
        const totalDuration  = filteredItems.length * secondsPerCard;

        track.innerHTML = "";

        /* Duplicate for seamless loop */
        [...filteredItems, ...filteredItems].forEach((item, index) => {
            const li = document.createElement("li");

            /* All sizing via inline style so it's pixel-perfect regardless of Tailwind purge */
            li.className = "group flex-shrink-0 border border-white/10 flex flex-col";
            li.style.width = `${cardW}px`;

            if (index >= filteredItems.length) li.setAttribute("aria-hidden", "true");

            li.innerHTML = `
                <img src="${item.image}"
                     loading="lazy"
                     class="w-full aspect-square object-contain object-center transition-transform duration-700 bg-[#111519] group-hover:scale-[1.04]" />
                <div class="p-4 sm:p-6 md:p-8 border-t border-white/10 bg-[#0b0f14]"
                     style="width:${cardW}px">
                    <p class="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500 mb-2 sm:mb-4">
                        ${item.category}
                    </p>
                    <h3 class="text-[13px] sm:text-[14px] md:text-[15px] font-black uppercase text-white">
                        ${item.title}
                    </h3>
                </div>
            `;
            track.appendChild(li);
        });

        /* Apply animation — -50% scrolls through exactly one full set of cards */
        track.style.animation = "none";
        void track.offsetWidth; // force reflow
        track.style.animation = `carousel-scroll ${totalDuration}s linear infinite`;
    }

    /* Rebuild on resize so card sizes stay correct */
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => buildCards(currentFilter === "ALL"
            ? showcaseItems
            : showcaseItems.filter(i => i.category === currentFilter)
        ), 200);
    });

    let currentFilter = "ALL";

    /* Initial load */
    buildCards(showcaseItems);

    /* Filter buttons */
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            currentFilter = btn.dataset.filter;
            buttons.forEach(b => b.classList.remove("active-filter"));
            btn.classList.add("active-filter");

            const filtered = currentFilter === "ALL"
                ? showcaseItems
                : showcaseItems.filter(i => i.category === currentFilter);
            buildCards(filtered);
        });
    });

    /* Pause on hover */
    track.addEventListener("mouseenter", () => track.style.animationPlayState = "paused");
    track.addEventListener("mouseleave", () => track.style.animationPlayState = "running");
}

    window.addEventListener("load", initInfiniteCarousel);



    
    const cube = document.querySelector('#cursor-cube');
    let mouseX_Cube = 0, mouseY_Cube = 0;
    let cubeX = 0, cubeY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX_Cube = e.clientX;
        mouseY_Cube = e.clientY;
        cube.style.opacity = "1";
    });

    function animateCursor() {
        cubeX += (mouseX_Cube - cubeX) * 0.1;
        cubeY += (mouseY_Cube - cubeY) * 0.1;

        // Subtract half cube size (10px) so it centers on cursor
        cube.style.transform = `translate3d(${cubeX - 10}px, ${cubeY - 10}px, 0)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();



    //logo
    
    
    function initLogoGrid() {
        const brandLogos = [
            './resources/dpp/Pothys.svg',
            './resources/dpp/Ranka.svg',
            './resources/dpp/Rokde.svg',
            './resources/dpp/sareen.svg',
            './resources/dpp/SIlverpark21.svg',
            './resources/dpp/AB.svg',
            './resources/dpp/Abak.svg',
            './resources/dpp/Arjuna.svg',
            './resources/dpp/Bhima.svg',
            './resources/dpp/CH.svg',
            './resources/dpp/GANDVEDIKAR.svg',
            './resources/dpp/Grt.svg',
            './resources/dpp/hindi.svg',
            './resources/dpp/Karthik.svg',
            './resources/dpp/KHIMJI.svg',
            './resources/dpp/M&M.svg',
            './resources/dpp/Madhavan.svg',
            './resources/dpp/navrathan.svg',
            './resources/dpp/Popular.svg',
            './resources/dpp/sukra.svg',
            './resources/dpp/Tamil logo.svg',
            './resources/dpp/Thattukadai.svg',
            './resources/dpp/Vadnerkar.svg',
            './resources/dpp/Voice of silver.svg',
            './resources/dpp/Skandhaa.svg',
            './resources/dpp/Sribalaji.svg',
            './resources/dpp/Sri krishna.svg',
            './resources/dpp/sri swarna.svg'
        ];

        const track = document.getElementById('logo-track');
        if (!track) return;

        function buildLogos() {
            return brandLogos.map(src => {
                const li = document.createElement('li');
                li.className =
                    'flex-shrink-0 h-64 bg-[#f4f4f4] border border-white/5 flex items-center justify-center p-0 m-0';

                li.innerHTML = `
                    <img src="${src}" 
                        class="w-full h-full object-contain hover:opacity-100 transition-opacity duration-300" />
                `;
                return li;
            });
        }

        buildLogos().forEach(li => track.appendChild(li));
        buildLogos().forEach(li => {
            li.setAttribute('aria-hidden', 'true');
            track.appendChild(li);
        });

        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    }

    window.addEventListener('load', initLogoGrid);
    


document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {

        const content = btn.closest('div').nextElementSibling;
        const icon = btn.querySelector('b');
        const isOpen = content.style.maxHeight;

        // Close all
        document.querySelectorAll('.accordion-content').forEach(c => {
            c.style.maxHeight = null;
        });

        document.querySelectorAll('.accordion-btn b').forEach(s => {
            s.textContent = '+';
            s.style.transform = 'rotate(0deg)';
        });

        // Open selected
        if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.textContent = '−';
            icon.style.transform = 'rotate(180deg)';
        }
    });
});


    
});


