

document.addEventListener("DOMContentLoaded", () => {

    const table = document.querySelector(".internship-table");
    const modal = document.querySelector(".modal");
    const modalBox = document.querySelector(".modal-box");

    const createBtn = document.querySelector(".create-btn");
    const bountyBtn = document.querySelector(".bounty-btn");

    /* ===============================
       OPEN MODAL
    =============================== */
    function openModal(html) {
        modalBox.innerHTML = html;
        modal.classList.remove("hidden");
    }

    function closeModal() {
        modal.classList.add("hidden");
    }

    modal.addEventListener("click", (e) => {
        if (
            e.target.classList.contains("modal") ||
            e.target.classList.contains("close-btn")
        ) {
            closeModal();
        }
    });

    /* ===============================
       CREATE INTERNSHIP 
    =============================== */
    createBtn.addEventListener("click", () => {
        openModal(`
            <h2>Create Internship</h2>

            <input class="input" placeholder="Internship ID">
            <input class="input" placeholder="Role">
            <input class="input" placeholder="Domain">
            <input class="input" placeholder="Bounty Amount">
            <input class="input" placeholder="Applicants Count">

            <button class="save-btn">Create</button>
            <button class="close-btn">Cancel</button>
        `);
    });

    /* ===============================
       BOUNTY RULES
    =============================== */
    bountyBtn.addEventListener("click", () => {
        openModal(`
            <h2>Bounty Rules</h2>
            <p>✔ Bounty awarded based on quality & evaluation</p>
            <p>✔ One bounty per internship</p>
            <p>✔ Demo & code mandatory</p>
            <p>✔ Admin decision is final</p>
            <button class="close-btn">Close</button>
        `);
    });

    /* ===============================
       SAVE INTERNSHIP
    =============================== */
    modalBox.addEventListener("click", (e) => {
        if (!e.target.classList.contains("save-btn")) return;

        const inputs = modalBox.querySelectorAll(".input");
        const values = [...inputs].map(i => i.value.trim());

        if (values.some(v => v === "")) {
            alert("Please fill all fields");
            return;
        }

        addRow(...values);
        closeModal();
    });

    /* ===============================
       TABLE ACTIONS
    =============================== */
    table.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON") return;

        const btn = e.target;
        const row = btn.closest(".table-row");
        if (!row || row.classList.contains("table-header")) return;

        const cells = row.querySelectorAll("span");
        const statusEl = cells[5];

        /* VIEW */
        if (btn.classList.contains("view")) {
            openModal(`
                <h2>Internship Details</h2>
                <p><strong>ID:</strong> ${cells[0].innerText}</p>
                <p><strong>Role:</strong> ${cells[1].innerText}</p>
                <p><strong>Domain:</strong> ${cells[2].innerText}</p>
                <p><strong>Bounty:</strong> ${cells[3].innerText}</p>
                <p><strong>Applicants:</strong> ${cells[4].innerText}</p>
                <p><strong>Status:</strong> ${statusEl.innerText}</p>
                <button class="close-btn">Close</button>
            `);
        }

        /* FREEZE */
        if (btn.classList.contains("lock")) {
            statusEl.innerText = "Closed";
            statusEl.className = "stage-tag closed";
            btn.remove();
        }

        /* APPROVE */
        if (btn.classList.contains("approve")) {
            statusEl.innerText = "Open";
            statusEl.className = "stage-tag open";
            btn.remove();
            alert("Internship Approved");
        }
    });

    /* ===============================
       ADD ROW
    =============================== */
    function addRow(id, role, domain, bounty, applicants) {
        const row = document.createElement("div");
        row.className = "table-row";

        row.innerHTML = `
            <span>${id}</span>
            <span>${role}</span>
            <span>${domain}</span>
            <span>${bounty}</span>
            <span>${applicants}</span>
            <span class="stage-tag open">Open</span>
            <span class="actions">
                <button class="view">View</button>
                <button class="lock">Freeze</button>
            </span>
        `;

        table.appendChild(row);
    }

});
