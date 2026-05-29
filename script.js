const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const modal = document.querySelector("#joinModal");
const openJoinButtons = document.querySelectorAll(".open-join");
const closeModalButton = document.querySelector(".modal-close");
const joinForm = document.querySelector(".join-form");

const syncHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 24 || document.body.classList.contains("subpage-body"));
};

syncHeader();
window.addEventListener("scroll", syncHeader);

menuToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLAnchorElement) {
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

const openModal = () => {
  modal?.classList.add("is-open");
  modal?.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal?.querySelector("input")?.focus();
};

const closeModal = () => {
  modal?.classList.remove("is-open");
  modal?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

openJoinButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

closeModalButton?.addEventListener("click", closeModal);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

joinForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(joinForm);
  const name = String(formData.get("name") || "Friend").trim().split(" ")[0];
  const role = String(formData.get("role") || "join");
  const status = joinForm.querySelector(".form-status");

  if (status) {
    status.textContent = `Thank you, ${name}. Your interest to ${role.toLowerCase()} has been noted.`;
  }

  joinForm.reset();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const number = entry.target;
    const target = Number(number.getAttribute("data-count") || "0");
    const duration = 1100;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      number.textContent = Math.round(target * eased).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
    countObserver.unobserve(number);
  });
}, { threshold: 0.6 });

document.querySelectorAll("[data-count]").forEach((number) => countObserver.observe(number));

const tabs = document.querySelectorAll(".tab-btn");
const cards = document.querySelectorAll(".program-card");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.getAttribute("data-filter");

    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    cards.forEach((card) => {
      const category = card.getAttribute("data-category");
      card.classList.toggle("is-hidden", filter !== "all" && category !== filter);
    });
  });
});
