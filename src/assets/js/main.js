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

  // Events whose date has passed since the last build move from
  // "Upcoming" to the top of "Past Events" (dates compared in Boston time).
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
  const upcomingGrid = document.querySelector("[data-upcoming-events]");
  if (upcomingGrid) {
    const pastGrid = document.querySelector("[data-past-events]");
    const expired = [...upcomingGrid.querySelectorAll("[data-event-date]")]
      .filter((card) => card.dataset.eventDate < today);
    // upcoming cards are soonest-first, so prepending in order leaves the newest on top
    expired.forEach((card) => (pastGrid ? pastGrid.prepend(card) : card.remove()));
    const empty = document.querySelector("[data-upcoming-empty]");
    if (empty) empty.hidden = upcomingGrid.children.length > 0;
  }

  // Homepage carousel: upcoming events lead (soonest first), so any that
  // have since passed drop behind the remaining upcoming ones, newest first.
  const eventsTrack = document.querySelector("[data-events-track]");
  if (eventsTrack) {
    const dated = [...eventsTrack.querySelectorAll("[data-event-date]")];
    const stillUpcoming = dated.filter((card) => card.dataset.eventDate >= today);
    const anchor = stillUpcoming.length ? stillUpcoming[stillUpcoming.length - 1] : null;
    dated.filter((card) => card.dataset.eventDate < today).forEach((card) => {
      if (anchor) anchor.after(card);
      else eventsTrack.prepend(card);
    });
  }

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
