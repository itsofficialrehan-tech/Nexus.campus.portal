
document.addEventListener("DOMContentLoaded", () => {

    const updateBtn = document.querySelector(".submit-btn");
    const passwordInputs = document.querySelectorAll(
        '.settings-card input[type="password"]'
    );

    const toggles = document.querySelectorAll(
        '.settings-toggle input[type="checkbox"]'
    );

    // ==============================
    // PASSWORD UPDATE 
    // ==============================
    if (updateBtn) {
        updateBtn.addEventListener("click", () => {
            const current = passwordInputs[0].value.trim();
            const newPass = passwordInputs[1].value.trim();
            const confirm = passwordInputs[2].value.trim();

            if (!current || !newPass || !confirm) {
                alert("Please fill all password fields");
                return;
            }

            if (newPass !== confirm) {
                alert("New passwords do not match");
                return;
            }

            alert("Password updated successfully (demo)");

            passwordInputs.forEach(i => i.value = "");
        });
    }

    // ==============================
    // TOGGLE PREFERENCES 
    // ==============================
    toggles.forEach(toggle => {
        toggle.addEventListener("change", () => {
            const name = toggle.parentElement.querySelector("span").innerText;
            console.log(`${name} set to ${toggle.checked}`);
        });
    });

});
