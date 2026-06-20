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

const quoteForm = document.querySelector("#quote-form");
const formSuccess = document.querySelector("#form-success");

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;
  formSuccess.hidden = false;
  formSuccess.classList.add("is-visible");
  quoteForm.querySelector("button[type='submit']").disabled = true;
  quoteForm.querySelector("button[type='submit']").innerHTML = "Request received";
});

const hero = document.querySelector(".hero");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (hero && !prefersReducedMotion) {
  let animationFrame;
  hero.addEventListener("pointermove", (event) => {
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(() => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      hero.style.setProperty("--pointer-x", `${x * 14}px`);
      hero.style.setProperty("--pointer-y", `${y * 10}px`);
      hero.style.setProperty("--pointer-tilt", `${x * 1.2}deg`);
    });
  });
  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--pointer-x", "0px");
    hero.style.setProperty("--pointer-y", "0px");
    hero.style.setProperty("--pointer-tilt", "0deg");
  });
}
