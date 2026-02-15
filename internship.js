// 1. Token uthao
const token = localStorage.getItem("token");

if (!token) {
  alert("Login nahi kiya hai");
}

// 2. Backend API call
fetch("http://localhost:5000/api/internships", {
  method: "GET",
  headers: {
    "Authorization": "Bearer " + token
  }
})
.then(res => res.json())
.then(data => {

  const box = document.getElementById("internshipList");
  box.innerHTML = "";

  data.data.forEach(item => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${item.role}</h3>
      <p>Company: ${item.company}</p>
      <p>Stipend: ${item.stipend}</p>
      <hr/>
    `;

    box.appendChild(div);
  });

})
.catch(err => {
  console.log(err);
  alert("API error");
});