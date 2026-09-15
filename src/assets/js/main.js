document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("header.site nav");
  const siteBar = document.querySelector(".site-bar");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  if (siteBar) {
    const updateHeaderSize = () => siteBar.classList.toggle("is-compact", window.scrollY > 40);
    window.addEventListener("scroll", updateHeaderSize, { passive: true });
    updateHeaderSize();
  }

  const eventSlider = document.querySelector("[data-events-slider]");
  if (eventSlider) {
    const viewport = eventSlider.querySelector("[data-events-viewport]");
    const moveEvents = (direction) => viewport.scrollBy({
      left: direction * viewport.clientWidth * 0.9,
      behavior: "smooth",
    });
    eventSlider.querySelector("[data-events-prev]").addEventListener("click", () => moveEvents(-1));
    eventSlider.querySelector("[data-events-next]").addEventListener("click", () => moveEvents(1));
    viewport.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") moveEvents(-1);
      if (event.key === "ArrowRight") moveEvents(1);
    });
  }

  document.querySelectorAll(".nav-dropdown > button").forEach((button) => {
    button.addEventListener("click", () => {
      const dropdown = button.parentElement;
      const open = dropdown.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
      document.querySelectorAll(".nav-dropdown").forEach((other) => {
        if (other !== dropdown) {
          other.classList.remove("open");
          other.querySelector("button").setAttribute("aria-expanded", "false");
        }
      });
    });
  });

  const slider = document.querySelector("[data-slider]");
  if (!slider) return;

  const slides = [...slider.querySelectorAll("[data-slide]")];
  const dots = [...slider.querySelectorAll("[data-slide-dot]")];
  let current = 0;
  let timer;

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === current;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", String(active));
    });
  };

  const startAutoplay = () => {
    clearInterval(timer);
    timer = setInterval(() => showSlide(current + 1), 6000);
  };

  slider.querySelector("[data-slider-prev]").addEventListener("click", () => {
    showSlide(current - 1);
    startAutoplay();
  });
  slider.querySelector("[data-slider-next]").addEventListener("click", () => {
    showSlide(current + 1);
    startAutoplay();
  });
  dots.forEach((dot) => dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.slideDot));
    startAutoplay();
  }));
  slider.addEventListener("mouseenter", () => clearInterval(timer));
  slider.addEventListener("mouseleave", startAutoplay);
  slider.addEventListener("focusin", () => clearInterval(timer));
  slider.addEventListener("focusout", startAutoplay);
  startAutoplay();
});
