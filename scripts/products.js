/* PRODUCTS COMPONENT LOGIC */

function initProducts() {
    /* ============================================================
       PRODUCT CARD EXPAND (mobile product section)
    ============================================================ */
    const productParent = document.getElementById("product-flex-container");

    if (productParent) {
        document.querySelectorAll(".product-card").forEach(card => {
            card.addEventListener("click", () => {
                const isAlreadyActive = card.classList.contains("active");

                // Reset all cards
                document.querySelectorAll(".product-card").forEach(c => {
                    c.classList.remove("active");
                    c.style.transform = "scale(1)";
                    c.style.flex      = "1";
                    c.style.height    = "10vh";
                });

                productParent.classList.remove("w-full");
                productParent.classList.add("w-1/2");

                // Activate selected card if it wasn't already active
                if (!isAlreadyActive) {
                    card.classList.add("active");
                    card.style.flex      = "3";
                    card.style.transform = "scale(1.02)";
                    card.style.height    = "100%";

                    productParent.classList.remove("w-1/2");
                    productParent.classList.add("w-full");

                    // Scale down other cards
                    document.querySelectorAll(".product-card:not(.active)").forEach(c => {
                        c.style.transform = "scale(0.5)";
                    });
                }
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", initProducts);
