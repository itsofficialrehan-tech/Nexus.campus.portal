document.addEventListener("DOMContentLoaded", () => {

    const createBtn = document.querySelector(".create-btn");
    const modal = document.querySelector(".modal");
    const modalBox = document.querySelector(".modal-box");
    const list = document.querySelector(".announcement-list");

    createBtn.addEventListener("click", () => {
        modalBox.innerHTML = `
            <h2 style="color:#ffd700">New Announcement</h2>
            <input class="input" placeholder="Title" />
            <textarea class="input" placeholder="Message"></textarea>
            <button class="publish-btn">Publish</button>
            <button class="close-btn">Cancel</button>
        `;
        modal.classList.remove("hidden");
    });

    modal.addEventListener("click", e => {
        if (e.target.classList.contains("close-btn") || e.target === modal) {
            modal.classList.add("hidden");
        }

        if (e.target.classList.contains("publish-btn")) {
            const inputs = modalBox.querySelectorAll(".input");
            if ([...inputs].some(i => i.value === "")) {
                alert("Fill all fields");
                return;
            }

            const div = document.createElement("div");
            div.className = "announcement-item";
            div.innerHTML = `
                <h3>📢 ${inputs[0].value}</h3>
                <p>${inputs[1].value}</p>
                <span class="tag published">Published</span>
            `;
            list.prepend(div);
            modal.classList.add("hidden");
        }
    });

});
