
function animateText(el, target) {
    let count = 0;
    const speed = 20;

    const interval = setInterval(() => {
        count++;
        el.textContent = count + "%";
        if (count >= target) {
            clearInterval(interval);
            el.textContent = target + "%";
        }
    }, speed);
}

/* ===== ANIMATION PAGE LOADING ===== */
window.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";

        setTimeout(() => {
            card.style.transition = "0.6s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 120);
    });
});

/* ===== HOVER GLOW  ===== */
document.querySelectorAll(".progress-list li").forEach(item => {
    item.addEventListener("mouseenter", () => {
        item.style.boxShadow = "0 0 30px rgba(0,255,255,0.8)";
    });

    item.addEventListener("mouseleave", () => {
        item.style.boxShadow = "none";
    });
});

/* ===== Course Card Interaction ===== */
document.querySelectorAll(".course-card").forEach(card => {
    card.addEventListener("click", () => {
        card.style.boxShadow = "0 0 60px rgba(0,255,255,1)";
        setTimeout(() => {
            card.style.boxShadow = "";
        }, 400);
    });
});

/* ===== Assignment Row Highlight ===== */
document.querySelectorAll(".assignment-table tbody tr").forEach(row => {
    row.addEventListener("mouseenter", () => {
        row.style.boxShadow = "inset 0 0 20px rgba(0,255,255,0.4)";
    });

    row.addEventListener("mouseleave", () => {
        row.style.boxShadow = "none";
    });
});

/* ===== Performance Snapshot Interaction ===== */
document.querySelectorAll(".performance-list li").forEach(item => {
    item.addEventListener("click", () => {
        item.style.transform = "scale(1.05)";
        setTimeout(() => {
            item.style.transform = "scale(1)";
        }, 200);
    });
});

/* ===== Sidebar Active State ===== */
document.querySelectorAll(".nav-menu li").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".nav-menu li")
            .forEach(li => li.classList.remove("active"));
        item.classList.add("active");
    });
});

/* ===== Semester Selector (Demo) ===== */
const semesterSelect = document.querySelector(".top-actions select");
if (semesterSelect) {
    semesterSelect.addEventListener("change", () => {
        alert("Semester switched (demo mode)");
    });
}

/* ===== Console Branding ===== */
console.log(
    "%cNEXUS CAMPUS – Academics Module",
    "color:#00ffff; font-size:18px; font-weight:bold;"
);
console.log(
    "%cBuilt by Rehan Khan | Coding Hunter",
    "color:#ffffff; font-size:12px;"
);
