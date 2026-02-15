const dot = document.createElement("div");
const star = document.createElement("div");

dot.className = "cursor-dot";
star.className = "cursor-star";

document.body.appendChild(dot);
document.body.appendChild(star);

let mouseX = 0, mouseY = 0;
let starX = 0, starY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  dot.style.left = mouseX + "px";
  dot.style.top  = mouseY + "px";
});

function animate() {
  starX += (mouseX - starX) * 0.12;
  starY += (mouseY - starY) * 0.12;

  star.style.left = starX + "px";
  star.style.top  = starY + "px";

  requestAnimationFrame(animate);
}
animate();

/* clickable detection */
document.querySelectorAll("a, button, input, .clickable").forEach(el => {
  el.addEventListener("mouseenter", () => {
    star.classList.add("active");
  });
  el.addEventListener("mouseleave", () => {
    star.classList.remove("active");
  });
});