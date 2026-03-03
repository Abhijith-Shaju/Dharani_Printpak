/* CASE CAROUSEL COMPONENT LOGIC */

function initCaseCarousel() {
    const showcaseItems = [
        { image: "./resources/box_photos/MC/M1.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M2.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M3.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M5.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M6.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M8.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M9.png",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M10.png",  category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/MN1.png",  category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/MN2.png",  category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R1.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R2.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R4.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R5.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R6.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R7.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R8.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R9.png",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R10.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R11.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R12.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R14.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN1.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN3.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN4.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN5.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN7.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN9.png",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN14.png", category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN15.png", category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN16.png", category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN17.png", category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/PB/PB1.png",  category: "PAPERBOARD",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/PB/PB2.png",  category: "PAPERBOARD",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/PB/PB3.png",  category: "PAPERBOARD",   title: "Luxury Electronics Packaging" },
    ];

    const track      = document.getElementById("carousel-track");
    const prevBtn    = document.getElementById("slider-prev");
    const nextBtn    = document.getElementById("slider-next");
    const filterBtns = document.querySelectorAll(".filter-btn");
    if (!track) return;

    let currentFilter  = "ALL";
    let currentIndex   = 0;
    let activeItems    = [...showcaseItems];

    function getVisibleCount() {
        const w = window.innerWidth;
        if (w >= 1280) return 4;
        if (w >= 1024) return 3;
        if (w >= 640)  return 2;
        return 1;
    }

    function getCardWidth() {
        const w = window.innerWidth;
        if (w >= 1280) return 420;
        if (w >= 1024) return 380;
        if (w >= 640)  return 320;
        return 260;
    }

    function buildCards() {
        track.innerHTML = "";
        activeItems.forEach(item => {
            const cardW = getCardWidth();
            const li = document.createElement("li");
            li.className  = "flex-shrink-0 border border-white/10 flex flex-col transition-all duration-300 hover:border-orange-500 hover:-translate-y-1";
            li.style.width = cardW + "px";

            li.innerHTML = `
                <img src="${item.image}" loading="lazy" alt="${item.title}"
                     style="width:${cardW}px; height:${cardW}px; object-fit:contain; object-position:center; background:#111519; display:block;" />
                <div class="card-info" style="width:${cardW}px;">
                    <p class="carousel-card-category">${item.category}</p>
                    <h3 class="carousel-card-title">${item.title}</h3>
                </div>
            `;
            track.appendChild(li);
        });
        goTo(0);
    }

    function goTo(index) {
        const visible = getVisibleCount();
        const maxIndex = Math.max(0, activeItems.length - visible);
        
        // Loop: if we go past the end, go back to start; if we go before start, go to end
        if (index > maxIndex) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = maxIndex;
        } else {
            currentIndex = index;
        }

        const cardW = getCardWidth();
        const gap   = window.innerWidth >= 1024 ? 48 : window.innerWidth >= 640 ? 32 : 16;
        const offset = currentIndex * (cardW + gap);

        track.style.transform = `translateX(-${offset}px)`;

        // Update arrow states
        if (prevBtn) prevBtn.style.opacity = "1";
        if (nextBtn) nextBtn.style.opacity = "1";
    }

    // Arrow clicks
    if (prevBtn) prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            currentFilter = btn.dataset.filter;
            filterBtns.forEach(b => b.classList.remove("active-filter"));
            btn.classList.add("active-filter");

            activeItems = currentFilter === "ALL"
                ? [...showcaseItems]
                : showcaseItems.filter(i => i.category === currentFilter);

            buildCards();
        });
    });

    // Rebuild on resize
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            buildCards();
        }, 200);
    });

    buildCards();
}



const track = document.getElementById('carousel-track');
// 1. Grab ALL elements with the class
const arrows = document.querySelectorAll('.slider-arrow');

const syncHeight = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const height = entry.contentRect.height;
    
    // 2. Loop through each arrow and apply the height
    arrows.forEach(arrow => {
      arrow.style.height = `${height}px`;
    });
  }
});

syncHeight.observe(track);
    



document.addEventListener("DOMContentLoaded", initCaseCarousel);

