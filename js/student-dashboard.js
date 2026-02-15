
/* ----------STAGGER ANIMATION ---------- */
function staggerAnimate(elements, delay = 120) {
    elements.forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        setTimeout(() => {
            el.style.transition = "0.5s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, i * delay);
    });
}

/* ---------- ON LOAD ANIMATIONS ---------- */
window.addEventListener("load", () => {
    const cards = document.querySelectorAll(".card");
    const menuItems = document.querySelectorAll(".nav-menu li");

    staggerAnimate(menuItems, 70);
    staggerAnimate(cards, 120);
});

/* ---------- SIDEBAR ACTIVE STATE ---------- */
const menuItems = document.querySelectorAll(".nav-menu li");

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        menuItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    });
});

/* ---------- SEARCH ---------- */
const searchInput = document.querySelector(".top-actions input");

if (searchInput) {
    searchInput.addEventListener("input", () => {
        // Demo feedback only
        searchInput.style.boxShadow = "0 0 12px rgba(0,246,255,0.6)";
        setTimeout(() => {
            searchInput.style.boxShadow = "none";
        }, 300);
    });
}

/* ---------- LOGOUT  ---------- */
const logoutBtn = document.querySelector(".logout");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        const confirmLogout = confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            window.location.href = "login.html";
        }
    });
}
