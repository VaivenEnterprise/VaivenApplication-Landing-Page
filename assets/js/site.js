import { SITE } from "./config.js";

document.addEventListener("DOMContentLoaded", function () {
  const supportEmail = SITE.supportEmail;
  const playUrl = SITE.playUrl;
  const today = new Date();

  // Rellenar el correo de soporte en el HTML
  const supportElements = document.querySelectorAll("[data-support-email]");
  supportElements.forEach((el) => {
    el.textContent = supportEmail;
    // Validar formato de correo antes de construir el enlace mailto: (evita inyección de URL)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(supportEmail)) {
      el.setAttribute("href", `mailto:${supportEmail}`);
    } else {
      el.removeAttribute("href");
    }
  });

  // Botón de Google Play
  const playButtons = document.querySelectorAll("[data-play-link]");
  playButtons.forEach((el) => {
    if (playUrl) {
      el.href = playUrl;
      el.textContent = "Disponible en Google Play";
      el.removeAttribute("data-play-link");
    } else {
      el.textContent = "Próximamente en Google Play";
      el.removeAttribute("href");
      el.setAttribute("aria-disabled", "true");
      el.style.cursor = "not-allowed";
    }
  });

  // Menú móvil
  const nav = document.querySelector(".site-nav");
  const menuBtn = document.querySelector(".menu-toggle");
  if (nav && menuBtn) {
    menuBtn.addEventListener("click", function () {
      nav.classList.toggle("nav-open");
    });
  }

  // Enfocar el primer elemento interactivo después de cargar
  setTimeout(() => {
    const firstFocusable = document.querySelector("a[href], button");
    if (firstFocusable) firstFocusable.focus();
  }, 100);
});