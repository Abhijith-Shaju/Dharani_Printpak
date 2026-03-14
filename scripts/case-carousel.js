/* CASE CAROUSEL COMPONENT LOGIC */
function isMobileViewViewport(width = window.innerWidth || document.documentElement.clientWidth || 0) {
    const isPortrait = window.matchMedia
        ? window.matchMedia("(orientation: portrait)").matches
        : window.innerHeight >= window.innerWidth;
    return width <= 768 || (isPortrait && width <= 1024);
}

const CASE_CAROUSEL_FILE_MAP = {
    RN: [
        "R1 Magnetic Coin Box.webp",
        "R2 Jewellery Slide Box.webp",
        "R3 Premium Gift Box.webp",
        "R4 Sweet Bakery Carton.webp",
        "R5 Satin Rigid Box.webp",
        "R6 Jewellery Window Box.webp",
        "R7 Hexagon Rigid Box.webp",
        "R8 Chocolate Rigid Box.webp",
        "R9 Magnetic Flap Box.webp",
        "R10 Bangle Drawer Box.webp",
        "R11 Magnetic Collapsible Box.webp",
        "R12 Magnetic Kit Box.webp",
        "R13 Ribbon Drawer Box.webp",
        "R14 Jewellery Drawer Box.webp",
        "R15 Premium Rigid Box.webp",
        "R16 Jewellery Slide Box.webp",
        "R17 Multi Layer Gift Box.webp",
        "R18 Jewellery Box.webp",
        "R19 Return Gift Box.webp",
        "R20 Collapsible Gift Box.webp",
    ],
    MC: [
        "M1 Coin Window Box.webp",
        "M2 Chikki Slide Box.webp",
        "M3 Indian Sweet Carton.webp",
        "M4 Chocolate Tuck Box.webp",
        "M5 Die Cut Carton.webp",
        "M6 3D Window Box.webp",
        "M7 Window Boxes.webp",
        "M8 Chikki Tuck Box.webp",
        "M9 Retail Product Box.webp",
        "M10 Silver Article Box.webp",
    ],
    PB: [
        "P1 Return Gift Bag.webp",
        "P2 Jewellery Gift Bag.webp",
        "P3 Laminated Gift Bag.webp",
    ],
};

const CASE_CAROUSEL_CATEGORY_MAP = {
    MC: "MONOCARTON",
    PB: "PAPERBOARD",
    RN: "RIGID BOX",
};

function getCaseCarouselTitle(fileName) {
    const nameWithoutExt = fileName.replace(/\.[^.]+$/, "");
    const title = nameWithoutExt.replace(/^[A-Z]+\d+\s*/, "").trim();
    return title || nameWithoutExt;
}

function getCaseCarouselItems() {
    return Object.entries(CASE_CAROUSEL_FILE_MAP).flatMap(([folder, files]) =>
        files.map(file => ({
            image: encodeURI(`./resources/Box/${folder}/${file}`),
            category: CASE_CAROUSEL_CATEGORY_MAP[folder],
            title: getCaseCarouselTitle(file),
        }))
    );
}

function initCaseCarousel() {
    const showcaseItems = getCaseCarouselItems();

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
    const showcaseItems = getCaseCarouselItems();

    const track      = document.getElementById("mobile-carousel-track");
    const viewportEl = track ? track.parentElement : null;
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
        return 2;
    }

    function layoutViewport() {
        if (!viewportEl) return;

        const section = document.getElementById("case-carousel-mobile");
        const baseWidth = section ? section.clientWidth : viewportEl.clientWidth;
        const sideInset = Math.min(32, Math.max(14, Math.round(baseWidth * 0.06)));
        const targetWidth = Math.max(0, baseWidth - sideInset * 2);

        viewportEl.style.width = `${targetWidth}px`;
        viewportEl.style.maxWidth = "100%";
        viewportEl.style.margin = "0 auto";
        viewportEl.style.padding = "0";
    }

    function getCardWidth() {
        const viewport = track.parentElement;
        let viewportWidth = viewport ? viewport.clientWidth : 0;
        if (viewport) {
            const viewportStyles = window.getComputedStyle(viewport);
            const paddingLeft = parseFloat(viewportStyles.paddingLeft || "0");
            // Track starts after left padding, but right padding is still visible due overflow clipping.
            viewportWidth = Math.max(0, viewportWidth - paddingLeft);
        }
        const itemsPerPage = getItemsPerPage();
        const totalGap = getGap() * (itemsPerPage - 1);
        return Math.max(0, (viewportWidth - totalGap) / itemsPerPage);
    }

    function buildCards({ resetPage = true } = {}) {
        layoutViewport();
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
    // -- Swipe / Touch support (ignore vertical page scroll gestures) --
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX   = 0;
    let touchEndY   = 0;

    track.addEventListener("touchstart", e => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    track.addEventListener("touchend", e => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;

        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        const horizontalIntent = Math.abs(diffX) > Math.abs(diffY) * 1.2;

        if (horizontalIntent && Math.abs(diffX) > 40) {
            diffX > 0 ? goToPage(currentPage + 1) : goToPage(currentPage - 1);
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


