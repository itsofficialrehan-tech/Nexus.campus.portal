

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.querySelector(".top-actions input");
    const addBtn = document.querySelector(".add-btn");
    const table = document.querySelector(".staff-table");
    const modal = document.querySelector(".modal");
    const modalBox = document.querySelector(".modal-box");

    /* ===============================
       SEARCH STAFF
    =============================== */
    searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();
        const rows = table.querySelectorAll(".table-row");

        rows.forEach((row, index) => {
            if (index === 0) return;
            row.style.display = row.innerText.toLowerCase().includes(value)
                ? "grid"
                : "none";
        });
    });

    /* ===============================
       ADD STAFF BUTTON
    =============================== */
    addBtn.addEventListener("click", () => {
        modalBox.innerHTML = `
            <h2>Add New Staff</h2>

            <input class="input" placeholder="Staff ID">
            <input class="input" placeholder="Full Name">
            <input class="input" placeholder="Department">
            <input class="input" placeholder="Role">
            <select class="input">
                <option>Full</option>
                <option>Medium</option>
                <option>Limited</option>
            </select>

            <div class="modal-actions">
                <button class="save-btn">Add</button>
                <button class="close-btn">Cancel</button>
            </div>
        `;
        modal.classList.remove("hidden");
    });

    /* ===============================
       TABLE ACTIONS
    =============================== */
    table.addEventListener("click", (e) => {

        const btn = e.target;
        if (btn.tagName !== "BUTTON") return;

        const row = btn.closest(".table-row");
        if (!row || row.classList.contains("table-header")) return;

        const cells = row.querySelectorAll("span");

        const staff = {
            id: cells[0],
            statusEl: cells[5]
        };

        if (btn.classList.contains("view")) {
            openProfile(row);
        }

        if (btn.classList.contains("block")) {
            staff.statusEl.innerText = "Inactive";
            staff.statusEl.className = "status inactive";
            btn.replaceWith(createBtn("Restore", "activate"));
        }

        if (btn.classList.contains("activate")) {
            staff.statusEl.innerText = "Active";
            staff.statusEl.className = "status active";
            btn.replaceWith(createBtn("Restrict", "block"));
        }
    });

    /* ===============================
       MODAL ACTIONS
    =============================== */
    modal.addEventListener("click", (e) => {

        if (e.target.classList.contains("close-btn")) {
            modal.classList.add("hidden");
        }

        if (e.target.classList.contains("save-btn")) {
            const inputs = modalBox.querySelectorAll(".input");
            if ([...inputs].some(i => i.value.trim() === "")) {
                alert("Fill all fields");
                return;
            }

            addStaffRow(
                inputs[0].value,
                inputs[1].value,
                inputs[2].value,
                inputs[3].value,
                inputs[4].value
            );

            modal.classList.add("hidden");
        }
    });

    /* ===============================
       FUNCTIONS
    =============================== */
    function openProfile(row) {
        const c = row.querySelectorAll("span");
        modalBox.innerHTML = `
            <h2>Staff Profile</h2>
            <p><strong>ID:</strong> ${c[0].innerText}</p>
            <p><strong>Name:</strong> ${c[1].innerText}</p>
            <p><strong>Department:</strong> ${c[2].innerText}</p>
            <p><strong>Role:</strong> ${c[3].innerText}</p>
            <p><strong>Access:</strong> ${c[4].innerText}</p>
            <p><strong>Status:</strong> ${c[5].innerText}</p>
            <div class="modal-actions">
                <button class="close-btn">Close</button>
            </div>
        `;
        modal.classList.remove("hidden");
    }

    function addStaffRow(id, name, dept, role, access) {
        const row = document.createElement("div");
        row.className = "table-row";
        row.innerHTML = `
            <span>${id}</span>
            <span>${name}</span>
            <span>${dept}</span>
            <span>${role}</span>
            <span class="badge ${access.toLowerCase()}">${access}</span>
            <span class="status active">Active</span>
            <span class="actions">
                <button class="view">Profile</button>
                <button class="block">Restrict</button>
            </span>
        `;
        table.appendChild(row);
    }

    function createBtn(text, cls) {
        const b = document.createElement("button");
        b.className = cls;
        b.innerText = text;
        return b;
    }

});
