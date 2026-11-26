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
  link.dataset.social = el.dataset.social;
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.append(...el.childNodes);
  const label = link.querySelector(".sr-only");
  if (label) label.textContent = `VAIVÉN en ${el.dataset.name}`;
  el.replaceWith(link);
}



// Analítica opcional: el contenedor GTM solo se carga después de aceptar analítica.
const CONSENT_KEY = "vaiven-analytics-consent";
const consentValue = () => {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch { return null; }
};

function loadTagManager() {
  if (window.__vaivenGtmLoaded || !/^GTM-[A-Z0-9]+$/.test(SITE.tagManagerId ?? "")) return;
  window.__vaivenGtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", {
    analytics_storage: "denied", ad_storage: "denied",
    ad_user_data: "denied", ad_personalization: "denied"
  });
  window.gtag("consent", "update", { analytics_storage: "granted" });
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(SITE.tagManagerId)}`;
  document.head.append(script);
}

function saveConsent(value) {
  try { localStorage.setItem(CONSENT_KEY, value); } catch { /* Si storage está bloqueado, la elección solo dura esta visita. */ }
  if (value === "granted") loadTagManager();
  if (value === "denied") {
    if (window.gtag) window.gtag("consent", "update", {
      analytics_storage: "denied", ad_storage: "denied",
      ad_user_data: "denied", ad_personalization: "denied"
    });
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)) {
        document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
        document.cookie = `${name}=; Max-Age=0; path=/; domain=${location.hostname}; SameSite=Lax`;
      }
    }
  }
}

function showConsentBanner() {
  if (consentValue() !== null || document.querySelector("[data-consent-banner]")) return;
  const banner = document.createElement("section");
  banner.className = "consent-banner";
  banner.dataset.consentBanner = "";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", "Preferencias de privacidad");
  banner.innerHTML = `<div class="consent-copy"><strong>Tu privacidad importa</strong><p>Usamos Google Analytics para conocer el uso de VAIVÉN y mejorar el sitio. La analítica solo se activa si la aceptas. <a href="/privacidad/">Conoce más</a>.</p></div><div class="consent-actions"><button type="button" data-consent="denied" class="consent-secondary">Rechazar</button><button type="button" data-consent="granted" class="consent-primary">Aceptar analítica</button></div>`;
  banner.addEventListener("click", (event) => {
    const button = event.target.closest("[data-consent]");
    if (!button) return;
    saveConsent(button.dataset.consent);
    banner.remove();
  });
  document.body.append(banner);
}

const currentConsent = consentValue();
if (currentConsent === "granted") loadTagManager();
else if (currentConsent === null) showConsentBanner();

// La persona puede cambiar o retirar su decisión desde el aviso de privacidad.
for (const button of document.querySelectorAll("[data-consent-settings]")) {
  button.addEventListener("click", () => {
    try { localStorage.removeItem(CONSENT_KEY); } catch { /* No-op */ }
    document.querySelector("[data-consent-banner]")?.remove();
    showConsentBanner();
  });
}

// Evento personalizado para crear el activador social_click en Google Tag Manager.
document.addEventListener("click", (event) => {
  if (consentValue() !== "granted" || !window.dataLayer) return;
  const link = event.target.closest(".social a");
  if (link) window.dataLayer.push({ event: "social_click", social_network: link.dataset.social ?? "unknown" });
});

// Cambio manual de tema: se recuerda en este navegador (sin cookies) y manda sobre el del sistema.
const themeToggle = document.querySelector("[data-theme-toggle]");
if (themeToggle) {
  const root = document.documentElement;
  const isDark = () => root.getAttribute("data-theme") === "dark";
  const sync = () => {
    themeToggle.setAttribute("aria-label", isDark() ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
      meta.setAttribute("content", isDark() ? "#1c1715" : "#faf6f0");
      meta.removeAttribute("media");
    }
  };
  themeToggle.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("vaiven-tema", next); } catch {}
  });
  new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  sync();
  themeToggle.hidden = false;
}
