

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
       ACTIVITY FEED
    =============================== */
    const feed = document.querySelector(".activity-feed");
    const feedMsgs = [
        "📩 New grievance received",
        "🔍 Grievance moved to review",
        "🛠 Issue under processing",
        "✅ Grievance resolved",
        "📨 Student notified",
        "📊 Status updated"
    ];
    let feedIndex = 0;

    function pushFeed(msg){
        if(!feed) return;
        const div = document.createElement("div");
        div.textContent = msg;
        div.style.opacity = "0";
        div.style.transform = "translateY(14px)";
        feed.prepend(div);
        requestAnimationFrame(()=>{
            div.style.transition = "0.35s ease";
            div.style.opacity = "1";
            div.style.transform = "translateY(0)";
        });
        if(feed.children.length > 6){
            feed.removeChild(feed.lastChild);
        }
    }

    setInterval(()=>{
        pushFeed(feedMsgs[feedIndex % feedMsgs.length]);
        feedIndex++;
    }, 4500);


    /* ===============================
       FILTERS 
    =============================== */
    const filters = document.querySelectorAll(".filters select");
    const rows = document.querySelectorAll(".grievance-table .table-row:not(.table-header)");

    function applyFilters(){
        const cat = filters[0].value.toLowerCase();
        const status = filters[1].value.toLowerCase();

        rows.forEach(row=>{
            const category = row.children[2].textContent.toLowerCase();
            const stat = row.querySelector(".status").textContent.toLowerCase();

            const catMatch = (cat.includes("all") || category.includes(cat));
            const statMatch = (status.includes("all") || stat.includes(status));

            row.style.display = (catMatch && statMatch) ? "grid" : "none";
        });
    }

    filters.forEach(sel=>{
        sel.addEventListener("change", applyFilters);
    });


    /* ===============================
       ROW ACTIONS
    =============================== */
    document.querySelectorAll(".row-actions button").forEach(btn=>{
        btn.addEventListener("click", ()=>{
            const row = btn.closest(".table-row");
            const statusEl = row.querySelector(".status");

            if(btn.classList.contains("view")){
                alert("Grievance Details (Demo View)");
                pushFeed("👀 Grievance viewed");
            }

            if(btn.classList.contains("review")){
                statusEl.textContent = "In Review";
                statusEl.className = "status review";
                pushFeed("🔍 Grievance moved to review");
            }

            if(btn.classList.contains("resolve")){
                statusEl.textContent = "Resolved";
                statusEl.className = "status resolved";
                pushFeed("✅ Grievance resolved");
            }
        });
    });


    /* ===============================
       APPLY FILTER BUTTON
    =============================== */
    const applyBtn = document.querySelector(".action-btn");
    if(applyBtn){
        applyBtn.addEventListener("click", ()=>{
            applyFilters();
            pushFeed("📊 Filters applied");
        });
    }

});