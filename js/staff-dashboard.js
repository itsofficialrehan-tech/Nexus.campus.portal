

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       LIVE CLOCK
    =============================== */
    const liveTimeEl = document.getElementById("liveTime");

    function updateClock() {
        const now = new Date();

        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        liveTimeEl.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    }

    updateClock();
    setInterval(updateClock, 1000);

    /* ===============================
       METRIC COUNT ANIMATION
    =============================== */
    const metricCards = document.querySelectorAll(".metric-card h2");

    metricCards.forEach(card => {
        const rawValue = card.textContent;
        let isPercent = rawValue.includes("%");
        let isMoney = rawValue.includes("₹");

        let finalValue = parseInt(rawValue.replace(/\D/g, ""));
        let current = 0;

        card.textContent = isMoney ? "₹0" : "0";

        const step = Math.ceil(finalValue / 60);

        const counter = setInterval(() => {
            current += step;

            if (current >= finalValue) {
                current = finalValue;
                clearInterval(counter);
            }

            if (isMoney) {
                card.textContent = `₹${current}`;
            } else if (isPercent) {
                card.textContent = `${current}%`;
            } else {
                card.textContent = current;
            }

        }, 25);
    });

    /* ===============================
       ACTIVITY LOG AUTO PULSE
    =============================== */
    const activityItems = document.querySelectorAll(".activity-log li");

    let activeIndex = 0;

    setInterval(() => {
        activityItems.forEach(item => item.classList.remove("active"));

        if (activityItems[activeIndex]) {
            activityItems[activeIndex].classList.add("active");
        }

        activeIndex++;
        if (activeIndex >= activityItems.length) {
            activeIndex = 0;
        }
    }, 3000);

    /* ===============================
       SUBTLE CARD FLOAT EFFECT
    =============================== */
    const panels = document.querySelectorAll(".panel, .metric-card");

    panels.forEach(panel => {
        panel.addEventListener("mousemove", (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            panel.style.transform = `
                perspective(800px)
                rotateX(${(-y / 30)}deg)
                rotateY(${(x / 30)}deg)
                translateY(-6px)
            `;
        });

        panel.addEventListener("mouseleave", () => {
            panel.style.transform = "none";
        });
    });

});