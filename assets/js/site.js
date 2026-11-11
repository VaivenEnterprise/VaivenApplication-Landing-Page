import { SITE } from "./config.js";

const email = String(SITE.supportEmail ?? "").trim();
const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const playUrl = String(SITE.playUrl ?? "").trim();
const playOk = /^https:\/\/play\.google\.com\/store\/apps\/details\?id=[\w.]+$/.test(playUrl);

// Correo de soporte: se rellena solo si es válido (evita mailto mal formado).
for (const el of document.querySelectorAll("[data-support-link]")) {
  if (emailOk) el.setAttribute("href", `mailto:${email}`);
  else el.removeAttribute("href");
}
for (const el of document.querySelectorAll("[data-support-email]")) {
  if (emailOk) el.textContent = email;
}

// Fecha de última actualización de los textos legales.
if (SITE.legalUpdated) {
  for (const el of document.querySelectorAll("[data-legal-updated]")) {
    el.textContent = `Última actualización: ${SITE.legalUpdated}`;
  }
}

// Botón de Google Play: sin URL publicada queda como texto, nunca como enlace roto.
const play = document.querySelector("[data-play-link]");
if (play) {
  if (playOk) {
    const link = document.createElement("a");
    link.className = play.className;
    link.href = playUrl;
    link.rel = "noopener noreferrer";
    link.append(...play.childNodes);
    const label = link.querySelector(".store-text");
    if (label) label.textContent = "Disponible en Google Play";
    play.replaceWith(link);
  } else {
    play.setAttribute("aria-disabled", "true");
  }
}

// Redes sociales: con URL https del dominio de la red, el ícono pasa a ser enlace; si no, queda sin enlace.
const SOCIAL_HOSTS = {
  facebook: ["facebook.com", "www.facebook.com"],
  instagram: ["instagram.com", "www.instagram.com"],
  x: ["x.com", "www.x.com", "twitter.com", "www.twitter.com"],
  youtube: ["youtube.com", "www.youtube.com", "youtu.be"],
  tiktok: ["tiktok.com", "www.tiktok.com"],
};

function socialUrl(network) {
  try {
    const url = new URL(String(SITE.social?.[network] ?? "").trim());
    return url.protocol === "https:" && SOCIAL_HOSTS[network]?.includes(url.hostname) ? url.href : "";
  } catch {
    return "";
  }
}

for (const el of document.querySelectorAll("[data-social]")) {
  const href = socialUrl(el.dataset.social);
  if (!href) continue;
  const link = document.createElement("a");
  link.className = el.className;
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.append(...el.childNodes);
  const label = link.querySelector(".sr-only");
  if (label) label.textContent = `VAIVÉN en ${el.dataset.name}`;
  el.replaceWith(link);
}
