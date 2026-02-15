const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value.trim();
    const role = document.querySelector("select").value;

    if (!email || !password || !role) {
        alert("Email, password and role required");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Login failed");
            return;
        }

        /* SAVE TOKEN + USER */
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        /* ROLE MAP (frontend role -> backend role) */
        let selectedRole = role.toLowerCase();

        if (selectedRole === "staff / teacher") {
            selectedRole = "staff";
        }

        /* ROLE CHECK */
        if (selectedRole !== data.user.role) {
            alert("Role mismatch! Please select correct role.");
            localStorage.clear();
            return;
        }

        /* REDIRECT BASED ON ROLE */
        if (data.user.role === "admin") {
            window.location.href = "admin-dashboard.html";
        }
        else if (data.user.role === "student") {
            window.location.href = "student-dashboard.html";
        }
        else if (data.user.role === "staff") {
            window.location.href = "staff-dashboard.html";
        }
        else {
            alert("Unknown role");
        }

    } catch (err) {
        alert("Server not reachable");
        console.error(err);
    }
});

/* GOOGLE LOGIN (UI DEMO ONLY) */
document.querySelector(".google-login").addEventListener("click", () => {
    alert("Google Sign-In enabled (demo mode)");
});