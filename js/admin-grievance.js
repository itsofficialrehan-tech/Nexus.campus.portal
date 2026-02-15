document.addEventListener("DOMContentLoaded", () => {

    const tableBody = document.querySelector(".grievance-table tbody");
    const categoryFilter = document.querySelectorAll(".filter-row select")[0];
    const statusFilter = document.querySelectorAll(".filter-row select")[1];

    let grievances = [];

    /* ===============================
       LOAD GRIEVANCES (ADMIN)
    =============================== */
    async function loadGrievances() {
        try {
            const token = localStorage.getItem("token");
            let backendGrievances = [];

            if (token) {
                const res = await fetch("http://localhost:5000/api/admin/grievances", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });

                const data = await res.json();
                backendGrievances = Array.isArray(data.data) ? data.data : [];
            }

            /* 🔥 DEMO DATA (HACKATHON) */
            const demoGrievances = [
                {
                    id: "#1021",
                    student: "Rehan Khan",
                    category: "Academic",
                    desc: "Delay in internal marks update",
                    status: "Pending"
                },
                {
                    id: "#1022",
                    student: "Arjun Mehta",
                    category: "Infrastructure",
                    desc: "Lab systems not functioning",
                    status: "In Review"
                },
                {
                    id: "#1023",
                    student: "Sara Khan",
                    category: "Hostel",
                    desc: "Water supply issue",
                    status: "Resolved"
                }
            ];

            /* ✅ MERGE BACKEND + DEMO (NO OVERRIDE) */
            grievances = [...backendGrievances, ...demoGrievances];

            applyFilters();

        } catch (err) {
            console.error(err);

            /* HARD FALLBACK */
            grievances = [
                {
                    id: "#1021",
                    student: "Rehan Khan",
                    category: "Academic",
                    desc: "Delay in internal marks update",
                    status: "Pending"
                },
                {
                    id: "#1022",
                    student: "Arjun Mehta",
                    category: "Infrastructure",
                    desc: "Lab systems not functioning",
                    status: "In Review"
                }
            ];

            applyFilters();
        }
    }

    /* ===============================
       RENDER TABLE
    =============================== */
    function renderTable(data) {
        tableBody.innerHTML = "";

        data.forEach((g, index) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${g.id}</td>
                <td>${g.student}</td>
                <td>${g.category}</td>
                <td>${g.desc}</td>
                <td>
                    <span class="status ${statusClass(g.status)}">
                        ${g.status}
                    </span>
                </td>
                <td>
                    <button class="action-btn review" data-index="${index}">
                        Review
                    </button>
                    <button class="action-btn resolve" data-index="${index}">
                        Resolve
                    </button>
                </td>
            `;

            tableBody.appendChild(tr);
        });
    }

    /* ===============================
       STATUS CLASS
    =============================== */
    function statusClass(status) {
        if (status === "Pending") return "pending";
        if (status === "In Review") return "review";
        return "resolved";
    }

    /* ===============================
       ACTION BUTTONS
    =============================== */
    tableBody.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        if (index === null) return;

        if (e.target.classList.contains("review")) {
            grievances[index].status = "In Review";
        }

        if (e.target.classList.contains("resolve")) {
            grievances[index].status = "Resolved";
        }

        applyFilters();
    });

    /* ===============================
       FILTER LOGIC
    =============================== */
    function applyFilters() {
        let filtered = [...grievances];

        const catValue = categoryFilter.value;
        const statusValue = statusFilter.value;

        if (catValue !== "All Categories") {
            filtered = filtered.filter(g => g.category === catValue);
        }

        if (statusValue !== "All Status") {
            filtered = filtered.filter(g => g.status === statusValue);
        }

        renderTable(filtered);
    }

    categoryFilter.addEventListener("change", applyFilters);
    statusFilter.addEventListener("change", applyFilters);

    /* ===============================
       INIT
    =============================== */
    loadGrievances();

});