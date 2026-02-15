

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       SIDEBAR ACTIVE STATE
    =============================== */
    const menuLinks = document.querySelectorAll(".nav-menu li a");

    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuLinks.forEach(l => l.parentElement.classList.remove("active"));
            link.parentElement.classList.add("active");
        });
    });

    /* ===============================
       STAT CARDS ANIMATION 
    =============================== */
    const statCards = document.querySelectorAll(".stat-card");

    statCards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        setTimeout(() => {
            card.style.transition = "all 0.6s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 150);
    });

    /* ===============================
       QUICK ACTION HOVER FEEDBACK
    =============================== */
    const actionBoxes = document.querySelectorAll(".action-box");

    actionBoxes.forEach(box => {
        box.addEventListener("mouseenter", () => {
            box.style.boxShadow = "0 0 50px rgba(255,215,0,0.9)";
        });

        box.addEventListener("mouseleave", () => {
            box.style.boxShadow = "";
        });
    });

    /* ===============================
       ADMIN PROFILE CLICK (DEMO)
    =============================== */
    const adminProfile = document.querySelector(".admin-profile");

    if (adminProfile) {
        adminProfile.addEventListener("click", () => {
            alert("Admin Profile\nRole: Super Administrator\nAccess Level: Full (Demo)");
        });
    }

    /* ===============================
       FUTURE BACKEND HOOKS (COMMENT)
       - Fetch stats from API
       - JWT validation
       - Real-time updates
    =============================== */
});
