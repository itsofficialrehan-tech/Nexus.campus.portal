

document.addEventListener("DOMContentLoaded", () => {

    // FORM ELEMENTS
    const form = document.querySelector(".grievance-form");
    const typeSelect = document.getElementById("grievanceType");
    const messageInput = document.getElementById("grievanceMessage");
    const grievanceList = document.querySelector(".grievance-list");

    // SAFETY CHECK 
    if (!form || !typeSelect || !messageInput || !grievanceList) {
        console.error("Grievance JS: Required elements not found");
        return;
    }

  
    let grievances = [];

    // ==============================
    // SUBMIT GRIEVANCE
    // ==============================
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const type = typeSelect.value;
        const message = messageInput.value.trim();

        // VALIDATION
        if (type === "") {
            alert("Please select grievance category");
            return;
        }

        if (message.length < 5) {
            alert("Please enter a valid grievance description");
            return;
        }

        // CREATE OBJECT
        const grievance = {
            id: Date.now(),
            type: type,
            message: message,
            status: "Pending"
        };

        grievances.push(grievance);

        // RENDER
        renderGrievances();

        // RESET FORM
        form.reset();
    });

    // ==============================
    // RENDER FUNCTION
    // ==============================
    function renderGrievances() {
        grievanceList.innerHTML = "";

        if (grievances.length === 0) {
            grievanceList.innerHTML = "<p style='opacity:0.6'>No grievances submitted yet.</p>";
            return;
        }

        grievances.forEach((g) => {
            const item = document.createElement("div");
            item.classList.add("grievance-item");

            // STATUS COLOR
            if (g.status === "Pending") item.classList.add("pending");
            if (g.status === "In Review") item.classList.add("review");
            if (g.status === "Resolved") item.classList.add("resolved");

            item.innerHTML = `
                <h3>${g.type}</h3>
                <p>${g.message}</p>
                <p>Status: <span>${g.status}</span></p>
            `;

            grievanceList.appendChild(item);
        });
    }

    // ==============================
    // AUTO STATUS UPDATE (DEMO)
    // ==============================
    setInterval(() => {
        grievances.forEach((g) => {
            if (g.status === "Pending") {
                g.status = "In Review";
            } else if (g.status === "In Review") {
                g.status = "Resolved";
            }
        });

        renderGrievances();
    }, 7000); // every 7 seconds

});
