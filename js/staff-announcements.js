

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       LIVE CLOCK 
    =============================== */
    const clock = document.querySelector(".clock");
    function updateClock(){
        const d = new Date();
        const h = String(d.getHours()).padStart(2,"0");
        const m = String(d.getMinutes()).padStart(2,"0");
        const s = String(d.getSeconds()).padStart(2,"0");
        if(clock) clock.textContent = `${h}:${m}:${s}`;
    }
    setInterval(updateClock,1000);
    updateClock();


    /* ===============================
       INFO PANEL ELEMENTS
    =============================== */
    const titleEl = document.getElementById("infoTitle");
    const audienceEl = document.getElementById("infoAudience");
    const contentEl = document.getElementById("infoContent");

    /* ===============================
       VIEW BUTTON HANDLER
    =============================== */
    document.querySelectorAll(".view-btn").forEach(btn=>{
        btn.addEventListener("click", ()=>{
            const row = btn.closest(".table-row");

            const title = row.getAttribute("data-title");
            const audience = row.getAttribute("data-audience");
            const content = row.getAttribute("data-content");

            //PANEL
            titleEl.textContent = title || "—";
            audienceEl.textContent = audience || "—";
            contentEl.textContent = content || "No description available.";

            
            row.style.boxShadow = "0 0 25px rgba(0,246,255,.6)";
            setTimeout(()=>{
                row.style.boxShadow = "";
            },300);
        });
    });

});