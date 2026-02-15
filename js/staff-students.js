document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");
    const statusFilter = document.getElementById("statusFilter");

    const studentRows = document.querySelectorAll(".student-row");

    const infoName = document.getElementById("infoName");
    const infoId = document.getElementById("infoId");
    const infoCourse = document.getElementById("infoCourse");
    const infoSem = document.getElementById("infoSem");
    const infoEmail = document.getElementById("infoEmail");
    const infoAttendance = document.getElementById("infoAttendance");
    const infoStatus = document.getElementById("infoStatus");

  

    let students = [];

    studentRows.forEach(row => {
        students.push({
            element: row,
            name: row.dataset.name,
            id: row.dataset.id,
            status: row.dataset.status,
            course: row.dataset.course,
            semester: row.dataset.sem,
            email: row.dataset.email,
            attendance: row.dataset.attendance
        });
    });

  
    function clearActiveRows() {
        studentRows.forEach(r => r.classList.remove("selected"));
    }

    function updateInfoPanel(student) {
        infoName.textContent = student.name;
        infoId.textContent = student.id;
        infoCourse.textContent = student.course;
        infoSem.textContent = student.semester;
        infoEmail.textContent = student.email;
        infoAttendance.textContent = student.attendance;
        infoStatus.textContent = student.status.toUpperCase();
    }

    function applyFilters() {
        const searchValue = searchInput.value.toLowerCase();
        const selectedStatus = statusFilter.value;

        students.forEach(student => {

            let matchesSearch =
                student.name.includes(searchValue) ||
                student.id.toLowerCase().includes(searchValue);

            let matchesStatus =
                selectedStatus === "all" ||
                student.status === selectedStatus;

            if (matchesSearch && matchesStatus) {
                student.element.style.display = "grid";
            } else {
                student.element.style.display = "none";
            }
        });
    }

    /* ===============================
       EVENTS
    =============================== */

    // SEARCH
    searchInput.addEventListener("input", () => {
        applyFilters();
    });

    // FILTER
    statusFilter.addEventListener("change", () => {
        applyFilters();
    });

    // ROW CLICK → INFO PANEL
    students.forEach(student => {

        const viewBtn = student.element.querySelector(".view-btn");

        viewBtn.addEventListener("click", () => {

            clearActiveRows();
            student.element.classList.add("selected");

            updateInfoPanel(student);
        });
    });

    // Auto select first student joh dhike
    setTimeout(() => {
        const firstVisible = students.find(
            s => s.element.style.display !== "none"
        );

        if (firstVisible) {
            firstVisible.element.classList.add("selected");
            updateInfoPanel(firstVisible);
        }
    }, 300);

});