
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
        "📌 Attendance session started",
        "🧑‍🎓 Student marked Present",
        "⏱ Late entry recorded",
        "❌ Student marked Absent",
        "📊 Attendance stats updated",
        "📁 Attendance report exported"
    ];
    let feedIndex = 0;

    function pushFeed(msg){
        if(!feed) return;
        const div = document.createElement("div");
        div.textContent = msg;
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
        pushFeed(feedMsgs[feedIndex % feedMsgs.length]);
        feedIndex++;
    },4000);


    /* ===============================
       MARK PRESENT / ABSENT
    =============================== */
    document.querySelectorAll(".mark").forEach(btn=>{
        btn.addEventListener("click",()=>{
            const row = btn.closest(".table-row");
            const statusEl = row.querySelector(".status");

            if(btn.classList.contains("present")){
                statusEl.textContent = "Present";
                statusEl.className = "status present";
                pushFeed("🧑‍🎓 Student marked Present");
            }

            if(btn.classList.contains("absent")){
                statusEl.textContent = "Absent";
                statusEl.className = "status absent";
                pushFeed("❌ Student marked Absent");
            }
        });
    });


    /* ===============================
       KPI AUTO COUNT
    =============================== */
    document.querySelectorAll(".kpi-card h3").forEach(el=>{
        const raw = el.textContent.replace("%","");
        if(isNaN(raw)) return;

        const target = Number(raw);
        let cur = 0;
        el.textContent = "0";

        const timer = setInterval(()=>{
            cur += Math.ceil(target / 40);
            if(cur >= target){
                el.textContent = raw.includes("%") ? target+"%" : target;
                clearInterval(timer);
            }else{
                el.textContent = cur;
            }
        },30);
    });


    /* ===============================
       ACTION BUTTONS
    =============================== */
    document.querySelectorAll(".action-btn").forEach(btn=>{
        btn.addEventListener("click",()=>{
            btn.style.transform = "scale(0.94)";
            setTimeout(()=>btn.style.transform="",120);

            if(btn.textContent.includes("Export")){
                pushFeed("📁 Attendance report exported");
                alert("Attendance report exported (demo)");
            }
            if(btn.textContent.includes("Mark")){
                pushFeed("📌 Attendance marking opened");
                alert("Mark attendance (demo UI)");
            }
            if(btn.textContent.includes("Edit")){
                pushFeed("✏️ Attendance editing enabled");
                alert("Edit attendance (demo UI)");
            }
        });
    });

});