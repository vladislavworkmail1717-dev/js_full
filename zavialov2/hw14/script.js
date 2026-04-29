let slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 2000);

document.querySelectorAll(".item button").forEach((btn) => {
  btn.addEventListener("click", () => {
    let content = btn.nextElementSibling;
    content.style.display =
      content.style.display === "block" ? "none" : "block";
  });
});
