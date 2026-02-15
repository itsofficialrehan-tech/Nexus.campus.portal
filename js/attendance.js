
/* ===== Animated Percentage Counter ===== */
function animateCounter(element, target) {
    let start = 0;
    const duration = 1200;
    const increment = target / (duration / 16);

    function update() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + "%";
            requestAnimationFrame(update);
        } else {
            element.textContent = target + "%";
        }
    }
    update();
}

/* ===== Animate Attendance Rate ===== */
document.addEventListener("DOMContentLoaded", () => {
    const rateElement = document.querySelector(".rate-value");
    if (rateElement) {
        animateCounter(rateElement, 56);
    }
});

/* ===== Card Hover Glow Follow Effect ===== */
const cards = document.querySelectorAll(".card, .summary-card");

cards.forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `
            radial-gradient(
                circle at ${x}px ${y}px,
                rgba(0,255,255,0.18),
                rgba(10,25,47,0.75)
            )
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.background = "";
    });
});

/* ===== Page Load Smooth Reveal ===== */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".card, .summary-card").forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(40px)";
    observer.observe(el);
});

/* ===== Sidebar Active Glow ===== */
document.querySelectorAll(".nav-menu li").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll(".nav-menu li")
            .forEach(li => li.classList.remove("active"));
        item.classList.add("active");
    });
});


document.querySelectorAll(".summary-card").forEach(card => {
    card.addEventListener("click", () => {
        card.style.boxShadow = "0 0 80px rgba(0,255,255,0.9)";
        setTimeout(() => {
            card.style.boxShadow = "";
        }, 400);
    });
});

/* ===== Console Branding (Easter Egg 😎) ===== */
console.log(
    "%cNEXUS CAMPUS 🚀",
    "color:#00ffff; font-size:20px; font-weight:bold;"
);
console.log(
    "%cBuilt by Coding Hunter | Student Attendance Module",
    "color:#ffffff; font-size:12px;"
);
