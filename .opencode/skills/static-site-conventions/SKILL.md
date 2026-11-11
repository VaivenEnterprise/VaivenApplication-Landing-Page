---
name: static-site-conventions
description: Convenciones HTML/CSS/JS de la landing de VAIVÉN (estructura, accesibilidad, metadatos, rendimiento). Úsala al escribir o cambiar páginas, estilos o scripts.
---

# Skill: convenciones del sitio estático

## Estructura de página
```html
<!doctype html>
<html lang="es-MX">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Título único · VAIVÉN</title>
  <meta name="description" content="…≤ 155 caracteres…">
  <link rel="canonical" href="https://…/ruta/">
  <meta property="og:title" content="…"> <!-- + og:description, og:type, og:url, og:image -->
  <meta name="theme-color" content="#…">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <script type="module" src="/assets/js/site.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <header class="site-header">…</header>
  <main id="contenido"> <h1>…</h1> … </main>
  <footer class="site-footer">…</footer>
</body>
</html>
```
Cabecera y pie salen de `docs/plantilla.html` (copiar tal cual).

## CSS
- Variables en `:root` (`--color-*`, `--space-*`, `--radius-*`, `--font-*`); nunca valores literales en reglas.
- Mobile-first: reglas base para 320 px y `@media (min-width: 48em)` / `(min-width: 64em)`.
- Tipografía: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
- Foco visible con `:focus-visible`; respetar `prefers-reduced-motion` y `prefers-color-scheme` (opcional).
- Nombres de clase por bloque (`.hero`, `.steps`, `.faq`), sin ids para estilos.

## JavaScript (solo mejora)
- ES module pequeño: enlace a Google Play, correo, fecha legal y enlaces de redes sociales desde `config.js`.
- Sin librerías, sin `eval`, sin `innerHTML` con datos externos.
- Si `playUrl` está vacío, el botón muestra «Próximamente en Google Play» y no es un enlace.

## Contenido
- Español de México, frases cortas, voz activa, sin jerga técnica.
- Un `h1` y jerarquía `h2 → h3` sin saltos.
- Enlaces con texto descriptivo («Leer el aviso de privacidad»), nunca «clic aquí».
- Imágenes: `alt` útil, `width`/`height`, `loading="lazy"` (no en la primera).

## Portada de una sola pantalla (`body.home`)
- La portada cabe en el alto visible sin desplazarse (Art. VIII.7): el cuerpo mide `min-height: 100dvh`, el `main` ocupa lo que sobra y la foto es el único bloque flexible en teléfono (`flex: 1 0 120px`).
- Tamaños con `clamp()`/`min()` y `vh`/`dvh`, nunca alturas fijas ni `overflow: hidden` en la página: si no cabe, la página crece.
- Mide con un navegador real (`scrollHeight <= innerHeight`) en 1920×1080, 1366×768, 1280×720, 1024×600, 768×1024, 390×844, 360×640 y 320×568 antes de cerrar la tarea.
- Botón de Google Play: elemento de mayor peso visual (acento, `--cta-h`); sin URL es texto con `aria-disabled`, nunca un enlace roto.

## Redes sociales
- Íconos solo de `assets/img/social.svg` (`<svg><use href="/assets/img/social.svg#facebook"/></svg>`); cada uno dentro de `span.social-link[data-social]` con texto `.sr-only`.
- Las URL van únicamente en `SITE.social` de `assets/js/config.js`; vacío = ícono sin enlace; `site.js` solo acepta `https` del dominio de la red. No inventes cuentas.

