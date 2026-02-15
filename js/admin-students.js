

document.addEventListener("DOMContentLoaded", () => {

    const table = document.querySelector(".students-table");
    const modal = document.querySelector(".modal");
    const modalBox = document.querySelector(".modal-box");
    const searchInput = document.querySelector(".top-actions input");
    const addBtn = document.querySelector(".add-btn");

    if (!table) return;

    /* ===============================
       SEARCH FUNCTION
    =============================== */
    searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();
        const rows = table.querySelectorAll(".table-row:not(.table-header)");

        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(value) ? "grid" : "none";
        });
    });

    /* ===============================
       TABLE ACTIONS (VIEW / BLOCK)
    =============================== */
    table.addEventListener("click", (e) => {

        const btn = e.target;
        if (btn.tagName !== "BUTTON") return;

        const row = btn.closest(".table-row");
        if (!row || row.classList.contains("table-header")) return;

        const cells = row.querySelectorAll("span");
        const statusEl = cells[4];

        /* VIEW */
        if (btn.classList.contains("view")) {
            modalBox.innerHTML = `
                <h2>Student Profile</h2>
                <p><strong>ID:</strong> ${cells[0].innerText}</p>
                <p><strong>Name:</strong> ${cells[1].innerText}</p>
                <p><strong>Course:</strong> ${cells[2].innerText}</p>
                <p><strong>Semester:</strong> ${cells[3].innerText}</p>
                <p><strong>Status:</strong> ${statusEl.innerText}</p>
                <div class="modal-actions">
                    <button class="close-btn">Close</button>
                </div>
            `;
            modal.classList.remove("hidden");
        }

        /* BLOCK */
        if (btn.classList.contains("block")) {
            statusEl.innerText = "Blocked";
            statusEl.className = "status blocked";
            btn.remove();
            row.querySelector(".actions").innerHTML +=
                `<button class="activate">Unblock</button>`;
        }

        /* ACTIVATE */
        if (btn.classList.contains("activate")) {
            statusEl.innerText = "Active";
            statusEl.className = "status active";
            btn.remove();
            row.querySelector(".actions").innerHTML +=
                `<button class="block">Block</button>`;
        }
    });

    /* ===============================
       ADD STUDENT (DEMO)
    =============================== */
    addBtn.addEventListener("click", () => {

        const id = prompt("Enter Student ID:");
        const name = prompt("Enter Student Name:");
        const course = prompt("Enter Course:");
        const semester = prompt("Enter Semester:");

        if (!id || !name || !course || !semester) {
            alert("All fields required");
            return;
        }

        const newRow = document.createElement("div");
        newRow.className = "table-row";

        newRow.innerHTML = `
            <span>${id}</span>
            <span>${name}</span>
            <span>${course}</span>
            <span>${semester}</span>
            <span class="status active">Active</span>
            <span class="actions">
                <button class="view">View</button>
                <button class="block">Block</button>
            </span>
        `;

        table.appendChild(newRow);
        alert("Student added (demo)");
    });

    /* ===============================
       MODAL CLOSE
    =============================== */
    modal.addEventListener("click", (e) => {
        if (
            e.target.classList.contains("modal") ||
            e.target.classList.contains("close-btn")
        ) {
            modal.classList.add("hidden");
        }
    });

});
