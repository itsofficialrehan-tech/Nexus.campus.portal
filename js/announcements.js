

document.addEventListener("DOMContentLoaded", () => {

    const list = document.querySelector(".announcement-list");
    if (!list) return;

    // Static data 
    const announcements = [
        {
            title: "📢 Internship Fair",
            msg: "Campus-wide internship fair will be held this Friday in the auditorium.",
            date: "Today",
            isNew: true
        },
        {
            title: "📢 Attendance Review",
            msg: "Attendance review for Semester 4 will start from next week.",
            date: "2 days ago",
            isNew: false
        },
        {
            title: "📢 New Academic Resources",
            msg: "New study materials have been uploaded in the Academics section.",
            date: "5 days ago",
            isNew: false
        }
    ];

    render();

    // Render announcements
    function render() {
        list.innerHTML = "";
        announcements.forEach(a => {
            const div = document.createElement("div");
            div.className = `announcement-item ${a.isNew ? "new" : ""}`;
            div.innerHTML = `
                <h3>${a.title}</h3>
                <p>${a.msg}</p>
                <span>Posted: ${a.date}</span>
            `;
            list.appendChild(div);
        });
    }
});
