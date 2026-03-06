/* PRODUCTS COMPONENT LOGIC */
function initProducts() {

    /* ============================================================
       1. PRODUCT CARD EXPAND — #product-flex-container (desktop/tablet)
    ============================================================ */
    const productParent = document.getElementById("product-flex-container");

    if (productParent) {
        document.querySelectorAll(".product-card").forEach(card => {
            card.addEventListener("click", () => {
                const isAlreadyActive = card.classList.contains("active");

                // Reset all cards
                document.querySelectorAll(".product-card").forEach(c => {
                    c.classList.remove("active");
                    c.style.flex      = "1";
                    c.style.height    = "10vh";
                    c.style.transform = "scale(1)";
                    c.style.opacity   = "1";
                });

                productParent.style.width = "";

                // Activate selected card only if it wasn't already active
                if (!isAlreadyActive) {
                    card.classList.add("active");
                    card.style.flex      = "3";
                    card.style.height    = "auto";
                    card.style.transform = "scale(1)"; // no jump on active

                    // Subtly dim siblings instead of aggressive scale(0.5)
                    document.querySelectorAll(".product-card:not(.active)").forEach(c => {
                        c.style.opacity   = "0.6";
                        c.style.transform = "scale(0.97)";
                    });
                }
            });
        });
    }


    /* ============================================================
       2. ACCORDION — #products-mobile (mobile)
    ============================================================ */
    const mobileSection = document.getElementById("products-mobile");

    if (mobileSection) {
        mobileSection.querySelectorAll(".accordion-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const card    = btn.closest(".border");
                const content = card.querySelector(".accordion-content");
                const icon    = btn.querySelector(".toggle-icon");
                const isOpen  = card.classList.contains("open");

                // Close all cards first (single-open behaviour)
                mobileSection.querySelectorAll(".border.open").forEach(c => {
                    c.classList.remove("open");
                    c.querySelector(".accordion-content").style.maxHeight = "0px";
                    const ic = c.querySelector(".toggle-icon");
                    if (ic) ic.textContent = "+";
                });

                // Open clicked card if it was closed
                if (!isOpen) {
                    card.classList.add("open");
                    content.style.maxHeight = content.scrollHeight + "px"; // exact height — no cutoff
                    if (icon) icon.textContent = "x";
                }
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", initProducts);
