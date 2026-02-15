document.addEventListener("DOMContentLoaded", () => {
  const applyButtons = document.querySelectorAll(".apply-btn");

  applyButtons.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user) {
        alert("Please login first");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/internships/apply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify({
            internshipId: index + 1,
            studentId: user.id
          })
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Apply failed");
          return;
        }

        alert("✅ Internship Applied Successfully");

      } catch (err) {
        console.error(err);
        alert("Server error");
      }
    });
  });
});