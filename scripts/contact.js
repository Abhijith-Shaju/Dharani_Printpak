/* CONTACT COMPONENT LOGIC */

function initContact() {
    /* ============================================================
       PHONE INPUT (intl-tel-input)
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
    const formMessage = document.querySelector(".form-message");
    const submitBtn = rfqForm ? rfqForm.querySelector('button[type="submit"]') : null;

    if (rfqForm) {
        rfqForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            // Validate phone number
            if (phoneInput && iti && !iti.isValidNumber()) {
                showFormMessage(formMessage, "Please enter a valid phone number.", "error");
                return;
            }

            // Update phone input with full number
            if (phoneInput && iti) {
                phoneInput.value = iti.getNumber();
            }

            if (submitBtn) submitBtn.disabled = true;
            showFormMessage(formMessage, "Submitting your request...", "success");

            try {
                const body = new URLSearchParams(new FormData(rfqForm)).toString();
                const response = await fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body,
                });

                if (!response.ok) throw new Error("Submit failed");

                showFormMessage(formMessage, "Thanks. Your RFQ has been submitted. Our team will respond within 24 hours.", "success");

                setTimeout(() => {
                    rfqForm.reset();
                    if (iti) iti.setNumber("");
                    if (formMessage) formMessage.style.display = "none";
                }, 2200);
            } catch {
                showFormMessage(formMessage, "Submission failed. Please try again or contact us directly by phone.", "error");
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    function showFormMessage(element, message, type) {
        if (!element) return;
        element.textContent = message;
        element.className = `form-message ${type}`;
        element.style.display = "block";
    }

    // Form input animations
    const inputs = rfqForm ? rfqForm.querySelectorAll("input, textarea, select") : [];
    inputs.forEach(input => {
        input.addEventListener("focus", function() {
            this.parentElement.classList.add("focused");
        });
        
        input.addEventListener("blur", function() {
            if (!this.value) {
                this.parentElement.classList.remove("focused");
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", initContact);
