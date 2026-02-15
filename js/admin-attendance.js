document.addEventListener("DOMContentLoaded", () => {

    const modal = document.querySelector(".modal");
    const modalBox = document.querySelector(".modal-box");

    document.querySelector(".mark-btn").onclick = () => {
        openModal(`
            <h2>Mark Attendance</h2>
            <p>Attendance marking is handled by staff portal.</p>
            <button class="close-btn">Close</button>
        `);
    };

    document.querySelector(".report-btn").onclick = () => {
        openModal(`
            <h2>Attendance Report</h2>
            <p>📊 Weekly & Monthly reports generated successfully.</p>
            <button class="close-btn">Close</button>
        `);
    };

    function openModal(html) {
        modalBox.innerHTML = html;
        modal.classList.remove("hidden");
    }

    modal.onclick = (e) => {
        if (e.target.classList.contains("close-btn") || e.target === modal) {
            modal.classList.add("hidden");
        }
    };

});
