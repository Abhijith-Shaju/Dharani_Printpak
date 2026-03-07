/* CASE CAROUSEL COMPONENT LOGIC */
function isMobileViewViewport(width = window.innerWidth || document.documentElement.clientWidth || 0) {
    const isPortrait = window.matchMedia
        ? window.matchMedia("(orientation: portrait)").matches
        : window.innerHeight >= window.innerWidth;
    return width <= 768 || (isPortrait && width <= 1024);
}

function initCaseCarousel() {
    const showcaseItems = [
        { image: "./resources/box_photos/MC/M1.webp",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M2.webp",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M3.webp",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M5.webp",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M6.webp",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M8.webp",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M9.webp",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M10.webp",  category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/MN1.webp",  category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/MN2.webp",  category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R1.webp",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R2.webp",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R4.webp",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R5.webp",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R6.webp",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R7.webp",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R8.webp",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R9.webp",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R10.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R11.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R12.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R14.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN1.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN3.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN4.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN5.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN7.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN9.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN14.webp", category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN15.webp", category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN16.webp", category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN17.webp", category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/PB/PB1.webp",  category: "PAPERBOARD",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/PB/PB2.webp",  category: "PAPERBOARD",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/PB/PB3.webp",  category: "PAPERBOARD",   title: "Luxury Electronics Packaging" },
    ];

    const track      = document.getElementById("carousel-track");
    const prevBtn    = document.getElementById("slider-prev");
    const nextBtn    = document.getElementById("slider-next");
    const filterBtns = document.querySelectorAll(".filter-btn");
    if (!track) return;

    const ITEMS_PER_PAGE = 3;

    let currentFilter = "ALL";
    let currentPage   = 0;
    let activeItems   = [...showcaseItems];

    function getGap() {
        const styles = window.getComputedStyle(track);
        return parseFloat(styles.gap || "0");
    }

    function getCardWidth() {
        const viewport = track.parentElement;
        const viewportWidth = viewport ? viewport.clientWidth : 0;
        const totalGap = getGap() * (ITEMS_PER_PAGE - 1);
        return Math.max(0, (viewportWidth - totalGap) / ITEMS_PER_PAGE);
    }

    function getPageStarts() {
        const maxStart = Math.max(0, activeItems.length - ITEMS_PER_PAGE);
        const starts = [];

        for (let i = 0; i <= maxStart; i += ITEMS_PER_PAGE) {
            starts.push(i);
        }

        if (starts.length === 0 || starts[starts.length - 1] !== maxStart) {
            starts.push(maxStart);
        }

        return starts;
    }

    function buildCards({ resetPage = true } = {}) {
        track.innerHTML = "";
        const cardW = getCardWidth();

        activeItems.forEach(item => {
            const li = document.createElement("li");
            li.className = "flex-shrink-0 border border-white/10 flex flex-col transition-all duration-300 hover:border-orange-500 hover:-translate-y-1";
            li.style.width = `${cardW}px`;

            li.innerHTML = `
                <img src="${item.image}" loading="lazy" alt="${item.title}"
                     style="width:100%; aspect-ratio:1/1; object-fit:contain; object-position:center; background:#111519; display:block;" />
                <div class="card-info">
                    <p class="carousel-card-category">${item.category}</p>
                    <h3 class="carousel-card-title">${item.title}</h3>
                </div>
            `;
            track.appendChild(li);
        });

        if (resetPage) currentPage = 0;
        goToPage(currentPage);
    }

    function goToPage(pageIndex) {
        const pageStarts = getPageStarts();
        const maxPage = pageStarts.length - 1;

        if (pageIndex > maxPage) currentPage = 0;
        else if (pageIndex < 0) currentPage = maxPage;
        else currentPage = pageIndex;

        const startIndex = pageStarts[currentPage];
        const cardW = getCardWidth();
        const gap = getGap();
        const offset = startIndex * (cardW + gap);

        track.style.transform = `translateX(-${offset}px)`;

        if (prevBtn) prevBtn.style.opacity = "1";
        if (nextBtn) nextBtn.style.opacity = "1";
    }

    // Arrow clicks (always move by 3 cards)
    if (prevBtn) prevBtn.addEventListener("click", () => goToPage(currentPage - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goToPage(currentPage + 1));

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            currentFilter = btn.dataset.filter;
            filterBtns.forEach(b => b.classList.remove("active-filter"));
            btn.classList.add("active-filter");

            activeItems = currentFilter === "ALL"
                ? [...showcaseItems]
                : showcaseItems.filter(i => i.category === currentFilter);

            buildCards({ resetPage: true });
        });
    });

    // Rebuild on resize
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            buildCards({ resetPage: false });
        }, 200);
    });

    buildCards({ resetPage: true });
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

if (track) {
    syncHeight.observe(track);
}
    

document.addEventListener("DOMContentLoaded", initCaseCarousel);









/* MOBILE CAROUSEL */
function initMobileCarousel() {
    const showcaseItems = [
        { image: "./resources/box_photos/MC/M1.webp",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M2.webp",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M3.webp",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M5.webp",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M6.webp",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M8.webp",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M9.webp",   category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/M10.webp",  category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/MN1.webp",  category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/MC/MN2.webp",  category: "MONOCARTON",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R1.webp",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R2.webp",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R4.webp",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R5.webp",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R6.webp",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R7.webp",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R8.webp",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R9.webp",   category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R10.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R11.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R12.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/R14.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN1.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN3.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN4.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN5.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN7.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN9.webp",  category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN14.webp", category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN15.webp", category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN16.webp", category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/RN/RN17.webp", category: "RIGID SYSTEM", title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/PB/PB1.webp",  category: "PAPERBOARD",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/PB/PB2.webp",  category: "PAPERBOARD",   title: "Luxury Electronics Packaging" },
        { image: "./resources/box_photos/PB/PB3.webp",  category: "PAPERBOARD",   title: "Luxury Electronics Packaging" },
    ];

    const track      = document.getElementById("mobile-carousel-track");
    const prevBtn    = document.getElementById("mobile-prev");
    const nextBtn    = document.getElementById("mobile-next");
    const counter    = document.getElementById("mobile-counter");
    const filterBtns = document.querySelectorAll(".filter-btn-mobile");
    if (!track) return;

    let currentFilter = "ALL";
    let currentPage   = 0;
    let activeItems   = [...showcaseItems];

    function getGap() {
        const styles = window.getComputedStyle(track);
        return parseFloat(styles.gap || "0");
    }

    function getItemsPerPage() {
        const viewport = window.innerWidth || document.documentElement.clientWidth || 0;
        if (isMobileViewViewport(viewport)) return 2;
        return 3;
    }

    function getCardWidth() {
        const viewport = track.parentElement;
        const viewportWidth = viewport ? viewport.clientWidth : 0;
        const itemsPerPage = getItemsPerPage();
        const totalGap = getGap() * (itemsPerPage - 1);
        return Math.max(0, (viewportWidth - totalGap) / itemsPerPage);
    }

    function buildCards({ resetPage = true } = {}) {
        track.innerHTML = "";
        const cardW = getCardWidth();
        activeItems.forEach(item => {
            const li = document.createElement("li");
            li.style.width = `${cardW}px`;
            li.innerHTML = `
                <img src="${item.image}" loading="lazy" alt="${item.title}" />
                <div class="card-info-mobile">
                    <p class="mob-category">${item.category}</p>
                    <h3 class="mob-title">${item.title}</h3>
                </div>
            `;
            track.appendChild(li);
        });
        if (resetPage) currentPage = 0;
        goToPage(currentPage);
    }

    function goToPage(pageIndex) {
        const itemsPerPage = getItemsPerPage();
        const max = Math.max(0, Math.ceil(activeItems.length / itemsPerPage) - 1);

        // Loop around
        if (pageIndex > max) currentPage = 0;
        else if (pageIndex < 0) currentPage = max;
        else currentPage = pageIndex;

        const gap = getGap();
        const cardW = getCardWidth();
        const rawOffset = currentPage * itemsPerPage * (cardW + gap);
        const viewportWidth = track.parentElement ? track.parentElement.clientWidth : 0;
        const maxOffset = Math.max(0, track.scrollWidth - viewportWidth);
        const offset = Math.min(rawOffset, maxOffset);
        track.style.transform = `translateX(-${offset}px)`;

        // Update counter
        if (counter) counter.textContent = `${currentPage + 1} / ${max + 1}`;

        // Disable arrows at hard ends if you prefer (optional  remove for infinite loop)
        // if (prevBtn) prevBtn.disabled = currentPage === 0;
        // if (nextBtn) nextBtn.disabled = currentPage === max;
    }

    // Arrow clicks (always move by 3 cards)
    prevBtn?.addEventListener("click", () => goToPage(currentPage - 1));
    nextBtn?.addEventListener("click", () => goToPage(currentPage + 1));

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            currentFilter = btn.dataset.filter;
            filterBtns.forEach(b => b.classList.remove("active-filter"));
            btn.classList.add("active-filter");
            activeItems = currentFilter === "ALL"
                ? [...showcaseItems]
                : showcaseItems.filter(i => i.category === currentFilter);
            buildCards({ resetPage: true });
        });
    });
    // -- Swipe / Touch support --
    let touchStartX = 0;
    let touchEndX   = 0;

    track.addEventListener("touchstart", e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener("touchend", e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {          // 40px threshold
            diff > 0 ? goToPage(currentPage + 1) : goToPage(currentPage - 1);
        }
    }, { passive: true });

    // Recalc on resize
    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => buildCards({ resetPage: false }), 200);
    });

    buildCards({ resetPage: true });
}

document.addEventListener("DOMContentLoaded", initMobileCarousel);


