/* FOOTER COMPONENT LOGIC */

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

        const totalWidth   = brandLogos.length * width;
        const pixelsPerSec = 120;
        const duration     = Math.round(totalWidth / pixelsPerSec);

        track.style.animation = "none";
        void track.offsetWidth;
        track.style.animation = `logo-scroll ${duration}s linear infinite`;
    }

    buildLogos();

    // Rebuild on resize
    let logoResizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(logoResizeTimer);
        logoResizeTimer = setTimeout(buildLogos, 200);
    });

    track.addEventListener("mouseenter", () => track.style.animationPlayState = "paused");
    track.addEventListener("mouseleave", () => track.style.animationPlayState = "running");
}

window.addEventListener("load", initFooter);
