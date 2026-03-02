/* CASE CAROUSEL COMPONENT LOGIC */

function initCaseCarousel() {
    const showcaseItems = [
        { image: "resources/box_photos/MC/M1.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/M2.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/M3.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/M5.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/M6.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/M8.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/M9.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/M10.png",  category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/MN1.png",  category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/MC/MN2.png",  category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R1.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R2.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R4.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R5.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R6.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R7.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R8.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R9.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R10.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R11.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R12.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/R14.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN1.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN3.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN4.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN5.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN7.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN9.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN14.png", category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN15.png", category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN16.png", category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/RN/RN17.png", category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/PB/PB1.png",  category: "PAPERBOARD",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/PB/PB2.png",  category: "PAPERBOARD",   title: "Luxury Electronics Packaging" },
        { image: "resources/box_photos/PB/PB3.png",  category: "PAPERBOARD",   title: "Luxury Electronics Packaging" },
    ];

    const track   = document.getElementById("carousel-track");
    const buttons = document.querySelectorAll(".filter-btn");
    if (!track) return;

    let currentFilter = "ALL";

    // Responsive card width
    function getCardWidth() {
        const w = window.innerWidth;
        if (w >= 1280) return 420;
        if (w >= 1024) return 380;
        if (w >= 640)  return 320;
        return 260;
    }

    function buildCards(filteredItems) {
        if (!filteredItems.length) return;

        const cardW         = getCardWidth();
        const totalDuration = filteredItems.length * 2;

        track.innerHTML = "";

        [...filteredItems, ...filteredItems].forEach((item, index) => {
            const li = document.createElement("li");
            li.className  = "group flex-shrink-0 border border-white/10 flex flex-col";
            li.style.width = cardW + "px";
            if (index >= filteredItems.length) li.setAttribute("aria-hidden", "true");

            li.innerHTML = `
                <img src="${item.image}" loading="lazy" alt="${item.title}"
                     style="width:${cardW}px; height:${cardW}px; object-fit:contain; object-position:center; background:#111519; display:block; transition:transform 0.7s ease;" />
                <div class="card-info" style="width:${cardW}px;">
                    <p class="carousel-card-category">${item.category}</p>
                    <h3 class="carousel-card-title">${item.title}</h3>
                </div>
            `;
            track.appendChild(li);
        });

        track.style.animation = "none";
        void track.offsetWidth;
        track.style.animation = `carousel-scroll ${totalDuration}s linear infinite`;
    }

    // Filter button event listeners
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

    // Pause on hover
    track.addEventListener("mouseenter", () => track.style.animationPlayState = "paused");
    track.addEventListener("mouseleave", () => track.style.animationPlayState = "running");

    // Rebuild on resize
    let carouselResizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(carouselResizeTimer);
        carouselResizeTimer = setTimeout(() => {
            const items = currentFilter === "ALL"
                ? showcaseItems
                : showcaseItems.filter(i => i.category === currentFilter);
            buildCards(items);
        }, 200);
    });

    buildCards(showcaseItems);
}

window.addEventListener("load", initCaseCarousel);
