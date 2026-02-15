

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
       KPI COUNT ANIMATION
    =============================== */
    document.querySelectorAll(".kpi-card h3").forEach(el=>{
        let value = el.textContent.replace("%","");
        if(isNaN(value)) return;

        const target = Number(value);
        let count = 0;
        el.textContent = "0";

        const timer = setInterval(()=>{
            count += Math.ceil(target / 40);
            if(count >= target){
                el.textContent = el.textContent.includes("%") ? target+"%" : target;
                clearInterval(timer);
            }else{
                el.textContent = count;
            }
        },35);
    });


    /* ===============================
       ACTIVITY FEED
    =============================== */
    const feed = document.querySelector(".activity-feed");
    const activities = [
        "📘 Assignment created",
        "📤 Resources uploaded",
        "🧑‍🎓 New submission received",
        "📊 Submission stats updated",
        "✏️ Assignment edited",
        "⏳ Deadline extended",
        "✅ Assignment marked completed"
    ];
    let feedIndex = 0;

    function pushActivity(text){
        if(!feed) return;
        const div = document.createElement("div");
        div.textContent = text;
        div.style.opacity = "0";
        div.style.transform = "translateY(16px)";
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
        pushActivity(activities[feedIndex % activities.length]);
        feedIndex++;
    },4500);


    /* ===============================
       ACTION BUTTONS 
    =============================== */
    document.querySelectorAll(".action-btn").forEach(btn=>{
        btn.addEventListener("click",()=>{
            btn.style.transform = "scale(0.95)";
            setTimeout(()=>btn.style.transform="",120);

            if(btn.textContent.includes("Create")){
                alert("Create Assignment (Demo UI)");
                pushActivity("📘 Assignment created");
            }

            if(btn.textContent.includes("Upload")){
                alert("Upload Resources (Demo UI)");
                pushActivity("📤 Resources uploaded");
            }

            if(btn.textContent.includes("View")){
                alert("Viewing Submissions (Demo UI)");
                pushActivity("📊 Viewing submissions");
            }
        });
    });


    /* ===============================
       TABLE ROW ACTIONS
    =============================== */
    document.querySelectorAll(".row-actions button").forEach(btn=>{
        btn.addEventListener("click",()=>{
            const row = btn.closest(".table-row");
            const statusEl = row.querySelector(".status");

            if(btn.classList.contains("edit")){
                alert("Edit Assignment (Demo)");
                pushActivity("✏️ Assignment edited");
            }

            if(btn.classList.contains("view")){
                alert("View Assignment Details (Demo)");
                pushActivity("👀 Assignment viewed");
            }

            if(btn.classList.contains("grade")){
                statusEl.textContent = "Completed";
                statusEl.className = "status completed";
                pushActivity("✅ Assignment graded & completed");
            }

            if(btn.classList.contains("extend")){
                alert("Deadline Extended (Demo)");
                pushActivity("⏳ Deadline extended");
            }
        });
    });

});