/* FOOTER COMPONENT LOGIC */
function isMobileViewViewport(width = window.innerWidth || document.documentElement.clientWidth || 0) {
    const isPortrait = window.matchMedia
        ? window.matchMedia("(orientation: portrait)").matches
        : window.innerHeight >= window.innerWidth;
    return width <= 768 || (isPortrait && width <= 1024);
}

function initFooter() {
    /* ============================================================
       LOGO SCROLL TRACK
    ============================================================ */
    const brandLogos = [
        "./resources/dpp/Pothys.svg",
        "./resources/dpp/Ranka.svg",
        "./resources/dpp/Rokde.svg",
        "./resources/dpp/sareen.svg",
        "./resources/dpp/SIlverpark21.svg",
        "./resources/dpp/AB.svg",
        "./resources/dpp/Abak.svg",
        "./resources/dpp/Arjuna.svg",
        "./resources/dpp/CH.svg",
        "./resources/dpp/GANDVEDIKAR.svg",
        "./resources/dpp/Grt.svg",
        "./resources/dpp/hindi.svg",
        "./resources/dpp/Karthik.svg",
        "./resources/dpp/KHIMJI.svg",
        "./resources/dpp/m-m.svg",
        "./resources/dpp/Madhavan.svg",
        "./resources/dpp/navrathan.svg",
        "./resources/dpp/Popular.svg",
        "./resources/dpp/sukra.svg",
        "./resources/dpp/tamil-logo.svg",
        "./resources/dpp/Thattukadai.svg",
        "./resources/dpp/Vadnerkar.svg",
        "./resources/dpp/voice-of-silver.svg",
        "./resources/dpp/Skandhaa.svg",
        "./resources/dpp/Sribalaji.svg",
        "./resources/dpp/sri-krishna.svg",
        "./resources/dpp/sri-swarna.svg",
    ];

    const track = document.getElementById("logo-track");
    if (!track) return;

    function getSizeKey() {
        const w = window.innerWidth;
        if (w >= 1280) return "xl";
        if (w >= 769) return "lg";
        if (w >= 640) return "sm";
        return "xs";
    }

    function getCellSize() {
        const w = window.innerWidth;
        if (w >= 1280) return { width: 320, height: 210 };
        if (!isMobileViewViewport(w) && w >= 769) return { width: 270, height: 185 };
        if (w >= 640)  return { width: 230, height: 155 };
        return             { width: 190, height: 120 };
    }

    function getCurrentOffsetPx() {
        const transform = getComputedStyle(track).transform;
        if (!transform || transform === "none") return 0;
        const match = transform.match(/matrix(3d)?\((.+)\)/);
        if (!match) return 0;
        const values = match[2].split(",").map(v => Number(v.trim()));
        if (match[1] === "3d") return Number.isFinite(values[12]) ? values[12] : 0;
        return Number.isFinite(values[4]) ? values[4] : 0;
    }

    function buildLogos(preserveProgress = false) {
        const previousLoopWidth = Number(track.dataset.loopWidth || 0);
        const currentOffsetPx = preserveProgress ? getCurrentOffsetPx() : 0;

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

        const totalWidth   = brandLogos.length * width;
        const pixelsPerSec = 120;
        const duration     = Math.round(totalWidth / pixelsPerSec);
        let progressRatio  = 0;

        if (preserveProgress && previousLoopWidth > 0) {
            const traveled = ((-currentOffsetPx % previousLoopWidth) + previousLoopWidth) % previousLoopWidth;
            progressRatio = traveled / previousLoopWidth;
        }

        track.style.animation = "none";
        track.style.animationDelay = "0s";
        void track.offsetWidth;
        track.style.animation = `logo-scroll ${duration}s linear infinite`;
        if (progressRatio > 0) {
            track.style.animationDelay = `${-(progressRatio * duration)}s`;
        }
        track.dataset.loopWidth = String(totalWidth);
    }

    buildLogos();
    let lastSizeKey = getSizeKey();

    // Rebuild on resize (desktop only). Mobile browsers emit resize while scrolling.
    let logoResizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(logoResizeTimer);
        logoResizeTimer = setTimeout(() => {
            if (window.innerWidth < 769) return;
            const nextSizeKey = getSizeKey();
            if (nextSizeKey === lastSizeKey) return;
            lastSizeKey = nextSizeKey;
            buildLogos(true);
        }, 200);
    });

    // Rebuild on orientation change for mobile/tablet, preserving progress.
    window.addEventListener("orientationchange", () => {
        setTimeout(() => {
            lastSizeKey = getSizeKey();
            buildLogos(true);
        }, 250);
    });

}

document.addEventListener("DOMContentLoaded", initFooter);
