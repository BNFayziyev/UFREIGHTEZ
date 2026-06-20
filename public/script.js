lucide.createIcons();

const callLinks = document.querySelectorAll("[data-rc-call]");

callLinks.forEach((link) => {
  link.addEventListener("click", () => {
    window.localStorage.setItem("ufreightezLastContactAction", "call");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealItems = document.querySelectorAll(".reveal-on-scroll");
const revealObserver = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
  { threshold: 0.18 }
);
revealItems.forEach((item) => revealObserver.observe(item));
