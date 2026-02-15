

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".lost-form");
    const foundList = document.querySelector(".found-list");

    if (!form || !foundList) return;

    // Frontend-only storage
    let items = [];

    // SUBMIT LOST ITEM
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = form.querySelector('input[type="text"]').value.trim();
        const category = form.querySelector("select").value;
        const location = form.querySelectorAll('input[type="text"]')[1].value.trim();
        const desc = form.querySelector("textarea").value.trim();

        if (!name || !category || !location || desc.length < 3) {
            alert("Please fill all fields properly");
            return;
        }

        const item = {
            id: Date.now(),
            name,
            location,
            status: "Available"
        };

        items.unshift(item);
        renderItems();
        form.reset();
    });

    // RENDER FOUND ITEMS
    function renderItems() {
        foundList.innerHTML = "";

        items.forEach((i) => {
            const div = document.createElement("div");
            div.className = "found-item";
            div.innerHTML = `
                <h3>${i.name}</h3>
                <p>Found near ${i.location}</p>
                <span>Status: ${i.status}</span>
            `;
            foundList.appendChild(div);
        });
    }
});
