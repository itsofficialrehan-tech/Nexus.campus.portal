/* =====================================================
   CUSTOM CURSOR (SQUARE DOT + STABLE GLOW FOLLOWER)
   ===================================================== */
const cursor = document.createElement("div");
const cursorGlow = document.createElement("div");

cursor.className = "cursor-dot";
cursorGlow.className = "cursor-glow";

document.body.appendChild(cursorGlow);
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
});

/* smooth trailing glow (NO SHAKE) */
function animateGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;

    cursorGlow.style.left = glowX + "px";
    cursorGlow.style.top = glowY + "px";

    requestAnimationFrame(animateGlow);
}
animateGlow();

/* hover interaction */
document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1.3)";
        cursorGlow.style.transform = "translate(-50%, -50%) scale(1.6)";
    });

    el.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursorGlow.style.transform = "translate(-50%, -50%) scale(1)";
    });
});


/* =====================================================
   ELEMENT SELECTORS
   ===================================================== */
const navbar = document.querySelector(".navbar");
const heroSection = document.querySelector(".hero");
const featureCards = document.querySelectorAll(".feature-card");


/* =====================================================
   INITIAL STATES
   ===================================================== */
navbar.style.opacity = "0";
navbar.style.transform = "translateY(-25px)";

featureCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
});


/* =====================================================
   PAGE LOAD ANIMATIONS
   ===================================================== */
window.addEventListener("load", () => {

    setTimeout(() => {
        navbar.style.transition = "0.7s ease";
        navbar.style.opacity = "1";
        navbar.style.transform = "translateY(0)";
    }, 400);

    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = "0.6s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 700 + index * 220);
    });

});


/* =====================================================
   BACKGROUND IMAGE SLIDER (STABLE – NO PAGE MOVE)
   ===================================================== */
const backgrounds = [
    "img/bg-admin.jpg",
    "img/bg-campus.jpg",
    "img/bg-students.jpg"
];

let currentBg = 0;

setInterval(() => {
    currentBg = (currentBg + 1) % backgrounds.length;

    heroSection.style.backgroundImage =
        `url(${backgrounds[currentBg]})`;

}, 6000);


/* =====================================================
   SMOOTH SCROLL (CLICK FIXED – NO BREAK)
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});