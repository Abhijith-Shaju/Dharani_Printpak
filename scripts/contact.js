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

    if (rfqForm) {
        rfqForm.addEventListener("submit", function (e) {
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

            // Show success message
            showFormMessage(formMessage, "Thank you! We'll get back to you shortly.", "success");

            // Reset form after successful submission
            setTimeout(() => {
                rfqForm.reset();
                if (iti) iti.setNumber("");
                if (formMessage) formMessage.style.display = "none";
            }, 2000);
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
