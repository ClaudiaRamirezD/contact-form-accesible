document.addEventListener("DOMContentLoaded", function () {
    // Select input elements
    const firstName = document.querySelector("#first-name");
    const lastName = document.querySelector("#last-name");
    const email = document.querySelector("#email");
    const queryType = document.querySelectorAll(".radio-option input");
    const message = document.querySelector("#message");
    const consent = document.querySelector("#consent");

    // Select error messages
    const firstNameError = document.querySelector("#first-name-error");
    const lastNameError = document.querySelector("#last-name-error");
    const emailError = document.querySelector("#email-error");
    const queryError = document.querySelector("#query-error");
    const messageError = document.querySelector("#message-error");
    const consentError = document.querySelector("#consent-error");

    // Regex patterns
    const nameRegex = /^[A-Za-z\s]+$/; // Only allows letters and spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation

    // Show error function
    function showError(element, message) {
        element.textContent = message; // Set the error message content
        element.style.display = "block"; // Show the error message
        element.setAttribute("aria-hidden", "false"); // Make it visible to screen readers
    }

    // Hide error function
    function hideError(element) {
        element.style.display = "none"; // Hide the error message
        element.setAttribute("aria-hidden", "true"); // Make it hidden from screen readers
    }

    // Validation function
    function validateForm() {
        let isValid = true;

        // First Name validation
        if (!nameRegex.test(firstName.value.trim())) {
        isValid = false;
        showError(
            firstNameError,
            "First Name is required and should contain only letters."
        );
        } else {
        hideError(firstNameError);
        }

        // Last Name validation
        if (!nameRegex.test(lastName.value.trim())) {
        isValid = false;
        showError(
            lastNameError,
            "Last Name is required and should contain only letters."
        );
        } else {
        hideError(lastNameError);
        }

        // Email validation
        if (!emailRegex.test(email.value.trim())) {
        isValid = false;
        showError(emailError, "Please enter a valid email address.");
        } else {
        hideError(emailError);
        }

        // Query Type validation (at least one radio button should be selected)
        let querySelected = Array.from(queryType).some((radio) => radio.checked);
        if (!querySelected) {
        isValid = false;
        showError(queryError, "Please select a query type.");
        } else {
        hideError(queryError);
        }

        // Message validation (basic check to ensure message is not empty)
        if (message.value.trim() === "") {
        isValid = false;
        showError(messageError, "Please enter your message.");
        } else {
        hideError(messageError);
        }

        // Consent validation (checkbox must be checked)
        if (!consent.checked) {
        isValid = false;
        showError(consentError, "You must consent to being contacted.");
        } else {
        hideError(consentError);
        }

        return isValid;
    }

    // Event listener for form submission
    document.querySelector("form").addEventListener("submit", function (e) {
        if (!validateForm()) {
        e.preventDefault(); // Prevent form submission if validation fails
        } else {
        // Show the toast message by changing the display property
        const toastContainer = document.querySelector(".toast-container");

        // Temporarily remove the toast for screen reader accessibility
        toastContainer.style.display = "none";
        toastContainer.setAttribute("aria-hidden", "true");

        // Remove the element from the DOM
        toastContainer.parentNode.removeChild(toastContainer);

        // Reinsert the element after a brief delay to trigger announcement
        setTimeout(() => {
            document.body.appendChild(toastContainer);
            toastContainer.style.display = "grid";
            toastContainer.setAttribute("aria-hidden", "false"); // Ensure it's not hidden for screen readers
            toastContainer.setAttribute("role", "alert"); // Alert role for screen readers

            // Scroll to the top where the toast appears
            window.scrollTo({
            top: 0,
            behavior: "smooth", // Smooth scrolling to the top
            });
        }, 100); // Brief delay before reinserting

        // Optionally, hide the toast message after a few seconds
        setTimeout(() => {
            toastContainer.style.display = "none";
            toastContainer.setAttribute("aria-hidden", "true"); // Hide it for screen readers
        }, 3000); // Hide after 3 seconds

        e.preventDefault(); // Prevent the actual form submission for demo purposes
        }
    });
});
