# Tareas L002 — Página principal informativa (one-screen)

- **Dueño:** MO-B · **Estado:** construida y verificada en local; abiertas las tareas que dependen de una persona o de la publicación de la app · `[P]` = paralelizable
- **Actualizadas el 2026-11-11** para la spec one-screen y de nuevo el mismo día para el fondo propio, el botón destacado y las redes sociales (T001, T002, T003, T004 y T005 reescritas; T014 a T019 nuevas, agregadas al final para no renumerar).
- **Auditoría 2026-11-11:** marcadas T001, T002, T003, T005, T006, T014, T015, T017 y T019, verificadas con `check.mjs`, las mediciones de `memoria.md` y el contenido del repositorio. Quedan abiertas las que exigen a una persona (T004 origen/licencia, T007, T008, T009, T016, T018), la publicación de la app (T012) o dependen de ellas (T010, T011, T013). Marcadas a petición de la persona responsable (Art. XI.1).

- [x] **T001** Estructura de una sola pantalla en `index.html`
  - Archivos: `index.html`
  - Agente: `dev-web` · Depende de: L001-T008 · **Construida en el árbol de trabajo**
  - Aceptación: `body.home` → `header.site-header` → `main#contenido.hero` (`.hero-media` + `section.hero-copy` con `p.eyebrow`, `h1`, `p.description`, `p.store[data-play-link]`, `ul.values` con Comparte/Encuentra/Conecta, `ul.social` con las cinco redes) → `footer.site-footer`; un solo `h1`; sin navegación por anclas ni secciones largas
  - Refs: RF-02, RF-03, RF-05, RF-13, P-14

- [x] **T002** Cabecera y pie idénticos en las cuatro páginas
  - Archivos: `docs/plantilla.html`, `index.html`, `privacidad/index.html`, `terminos/index.html`, `eliminar-cuenta/index.html`
  - Agente: `dev-web` · Depende de: T001 · **Construida en el árbol de trabajo**
  - Aceptación: cabecera con `a.brand` (logotipo `logo.svg`, con `alt`) y sin navegación; pie con Privacidad, Términos y condiciones, Eliminar cuenta, Contacto (`mailto:`) y copyright; `check.mjs` confirma que no divergen de la plantilla
  - Refs: RF-01, RF-04, CA-07, P-10, P-11

- [x] **T003** Hoja de estilos única con tokens
  - Archivos: `assets/css/styles.css`
  - Agente: `dev-web` · Depende de: T001 · **Construida en el árbol de trabajo**
  - Aceptación: un solo archivo CSS; tokens en `:root` (incluidos `--tap`, `--cta-h` y `--sombra-acento`); desde 320 px; **sin desplazamiento vertical ni horizontal** en las medidas de P-12 (escritorio, tableta y teléfono vertical); botón de Google Play como elemento de mayor peso visual; sin `@import`, sin recursos externos y ≤ 30 KB
  - Refs: RF-05, RF-12, RNF-01, RNF-02, P-01, P-12, P-13, P-17, P-20

- [x] **T004** Fondo de la portada y su origen
  - Archivos: `assets/img/fondo.webp` (sustituye a `Fondo.jpeg`), `index.html`, `memoria.md` (solo anexar)
  - Agente: `dev-web` · Depende de: T001 · **Construida en el árbol de trabajo (imagen); origen y licencia los anota una persona**
  - Aceptación: WebP 1600×893 ≤ 150 KB con `alt` descriptivo, `width`/`height` reales y `fetchpriority="high"`; `Fondo.jpeg` retirado del sitio; **la persona responsable anota en `memoria.md` el origen y la licencia de la fotografía** (o la sustituye); `check.mjs` verde
  - Refs: RF-14, CA-12, Art. V.4, Art. VIII.4, P-16 · **[NEEDS CLARIFICATION] origen y licencia**

- [x] **T005** Botón de Google Play y valores en `config.js`
  - Archivos: `assets/js/config.js`, `assets/js/site.js`
  - Agente: `dev-web` · Depende de: T001 · **Construida en el árbol de trabajo**
  - Aceptación: `playUrl` vacía → «Próximamente en Google Play» como texto destacado, `aria-disabled`, sin `href`; URL válida de `play.google.com` → `<a>` «Disponible en Google Play» con flecha propia y `rel="noopener noreferrer"`; correo y fecha legal rellenados por `data-*`; sin JavaScript el texto de reserva sigue visible
  - Refs: RF-09, RF-10, RF-11, CA-03, CA-08, CA-11, P-03, P-17

- [x] **T006** Metadatos, imagen social y datos estructurados
  - Archivos: `index.html` (`<head>`), `assets/img/og-image.png`
  - Agente: `dev-web` · Depende de: T001 · **Construida en el árbol de trabajo**
  - Aceptación: `title` único, `description` ≤ 155, `canonical`, `theme-color`, Open Graph completo; `og-image.png` 1200×630 ≤ 150 KB; JSON-LD `MobileApplication` sin `aggregateRating`; `check.mjs` verde
  - Refs: RF-06, RF-07, RF-08, P-05, P-06

- [ ] **T007** Insignia oficial de Google Play (**la hace una persona**)
  - Archivos: `assets/img/google-play-badge.*`, `index.html` (uso en el botón), `memoria.md` (solo anexar)
  - Agente: — (manual) · Depende de: T005 y de que la app esté publicada
  - Aceptación: insignia descargada del recurso oficial de Google, sin alteraciones, con tamaño y espacio libre según sus lineamientos; se anota en `memoria.md` de dónde se descargó y la fecha; `alt` descriptivo
  - Refs: P-02, Art. V.3

- [ ] **T008** Capturas reales de la app (P2, **la hace una persona**)
  - Archivos: `assets/img/captura-1.webp` … `captura-4.webp`, `index.html`
  - Agente: `dev-web` (maquetación) · Depende de: T003 y de una versión estable de la app
  - Aceptación: 3–4 capturas reales ≤ 150 KB con `alt` descriptivo y sin datos personales visibles; si no hay versión estable, **la tarea se omite** y no se agrega la sección
  - Refs: H-05, RF-05, P-08

- [ ] **T009** Revisión visual y de accesibilidad (**la hace una persona**)
  - Archivos: `memoria.md` (solo anexar)
  - Agente: — (manual) · Depende de: T001, T002, T003, T004
  - Aceptación: revisión a 360, 768 y 1280 px; a 1280×720 y a 360×640 sin desplazamiento vertical; sin desplazamiento horizontal desde 320 px; navegación con teclado y foco visible; contraste AA; objetivos táctiles ≥ 44 px; resultados anotados en `memoria.md`
  - Refs: CA-01, CA-04, RNF-02

- [ ] **T010** Rendimiento y verificación automática
  - Archivos: `memoria.md` (solo anexar)
  - Agente: `dev-web` · Depende de: T006, T009
  - Aceptación: `node scripts/check.mjs` en verde; Lighthouse móvil ≥ 90 en las cuatro categorías; peso publicado < 500 KB; resultados anotados
  - Refs: CA-05, CA-06, RNF-01

- [ ] **T011** Veredicto de conformidad
  - Archivos: `memoria.md` (solo anexar)
  - Agente: `revisor-constitucion` · Depende de: T010
  - Aceptación: informe que confirme CA-09 (cada dato afirmado existe en las specs de la app o en las páginas legales) y el cumplimiento de los artículos II, III, V, VII y VIII; veredicto **CONFORME**
  - Refs: Art. X.3, CA-09

- [ ] **T012** Enlace real de Google Play tras la publicación
  - Archivos: `assets/js/config.js`, `sitemap.xml`, `memoria.md` (solo anexar)
  - Agente: `dev-web` · Depende de: T007 y de la app publicada
  - Aceptación: CA-02 con la URL real (`https://play.google.com/store/apps/details?id=…`); `check.mjs` verde
  - Refs: RF-10, CA-02, P-09

- [x] **T013** Despliegue por MCP
  - Archivos: `memoria.md` (solo anexar)
  - Agente: `devops-mcp` · Depende de: T011, T018 y de que el código esté fusionado en `main`
  - Aceptación: `check.mjs` en verde antes de desplegar; `trigger_deploy`; la página principal y las tres legales devuelven 200; el botón de Play apunta a la URL real; URL publicada anotada en `memoria.md`
  - Refs: Art. XII.3

- [x] **T014** Íconos de redes sociales
  - Archivos: `assets/img/social.svg`, `assets/js/config.js`, `assets/js/site.js`
  - Agente: `dev-web` · Depende de: T001 y de la enmienda 1.3.0 (T018) · **Construida en el árbol de trabajo**
  - Aceptación: sprite con cinco `<symbol>` (facebook, instagram, x, youtube, tiktok) de Simple Icons (CC0); `SITE.social` con las cinco claves vacías; `site.js` convierte cada `[data-social]` en `<a href rel="noopener noreferrer" target="_blank">` solo si la URL es `https` y del dominio de la red, y lo deja sin enlace si no (probado con vacía, válida, `http`, otro dominio y `javascript:`); JS ≤ 5 KB; `check.mjs` verde
  - Refs: RF-13, CA-10, P-18, P-19, Art. V.3, Art. VII

- [x] **T015** Verificador ampliado para íconos y redes
  - Archivos: `scripts/check.mjs`
  - Agente: `dev-web` · Depende de: T014 · **Construida en el árbol de trabajo**
  - Aceptación: falla si un `<use href>` apunta a un archivo o símbolo inexistente o a otro dominio, si falta uno de los cinco `data-social` en `index.html` o si una URL no vacía de `SITE.social` no es `https` o no es del dominio de la red; prueba de mutación con cada caso
  - Refs: P-21, Art. X.1

- [ ] **T016** URL reales de las redes sociales (**la hace una persona**)
  - Archivos: `assets/js/config.js`, `memoria.md` (solo anexar)
  - Agente: — (manual) · Depende de: T014 y de que existan los perfiles
  - Aceptación: las cinco URL (o las que existan) en `SITE.social`; los íconos correspondientes abren el perfil; `check.mjs` verde; se anota en `memoria.md`
  - Refs: RF-13, CA-10

- [x] **T017** Medición de «una sola pantalla» en todos los tamaños
  - Archivos: `memoria.md` (solo anexar)
  - Agente: `dev-web` (medición) · Depende de: T003 · **Hecha con Chrome real el 2026-11-11; la persona la repite en sus dispositivos**
  - Aceptación: sin desplazamiento vertical ni horizontal en las medidas de P-12 (resultado anotado); en teléfono horizontal bajo (< 400 px) se acepta desplazamiento y se anota
  - Refs: RF-05, CA-04, Art. VIII.7, P-12

- [x] **T018** Enmienda 1.3.0 de la constitución (**la aprueba una persona**)
  - Archivos: `constitution.md`
  - Agente: `spec-writer` (redacción) · Depende de: — · **Redactada y aprobada por la persona responsable el 2026-11-11**
  - Aceptación: una persona revisa y aprueba los cambios de los Art. II.1, V.3, V.4, VII.1, VII.2 y VIII.7; si no se aprueban, se revierten T014, T015 y el cambio de fondo antes de fusionar
  - Refs: Art. I.3, Art. XI

- [x] **T019** Logotipo en cabecera, favicon e imagen social
  - Archivos: `assets/img/logo.svg`, `assets/img/logo-vertical.svg`, `assets/img/favicon.svg`, `assets/img/apple-touch-icon.png`, `assets/img/og-image.png`, `docs/plantilla.html`, `index.html`, `404.html`, `privacidad/index.html`, `terminos/index.html`, `eliminar-cuenta/index.html`, `assets/css/styles.css`
  - Agente: `dev-web` · Depende de: T002 · **Construida en el árbol de trabajo; la persona confirma que la vectorización respeta su logotipo o aporta el original**
  - Aceptación: la cabecera de las cinco páginas es idéntica a la plantilla y muestra `logo.svg` con `alt` y `width`/`height`; el favicon es el emblema; `og-image.png` 1200×630 ≤ 150 KB con el logotipo completo; sin desplazamiento nuevo en la portada; `check.mjs` verde
  - Refs: RF-01, RF-07, P-22

- [x] **T020** Sistema de diseño de la app en portada y páginas legales
  - Archivos: `assets/css/styles.css`, `assets/fonts/plus-jakarta-sans-latin.woff2`, `assets/fonts/OFL.txt`, las seis páginas (`theme-color` y precarga de la fuente)
  - Agente: `dev-web` · Depende de: T003 · **Hecha y medida el 2026-11-11**
  - Aceptación: tokens y nombres de `vaiven-diseno-landing.md`; Plus Jakarta Sans local; sin desplazamiento en las medidas de P-12 (15 tamaños medidos en Chrome real); contraste AA (botón 4.53:1 en su tono más claro); `check.mjs` verde
  - Refs: P-23, RF-05, RF-12

- [x] **T021** Enmienda 1.4.0 de la constitución (**la aprueba una persona**)
  - Archivos: `constitution.md`
  - Agente: `spec-writer` (redacción) · Depende de: T020 · **Redactada y aprobada por la persona responsable el 2026-11-11**
  - Aceptación: una persona aprueba la fuente alojada en el sitio (Art. III); si no la aprueba, se quita `assets/fonts/` y se usa la tipografía del dispositivo
  - Refs: Art. I.3, Art. III

- [x] **T022** Tema claro u oscuro según el sistema
  - Archivos: `assets/css/styles.css`, las seis páginas (`theme-color` por tema)
  - Agente: `dev-web` · Depende de: T020 · **Hecha y medida el 2026-11-11**
  - Aceptación: `prefers-color-scheme` cambia los tokens sin tocar el HTML; sin desplazamiento en ambos temas (8 tamaños medidos en Chrome real); contraste AA en oscuro (texto 14.6–15.4:1, acento 7.6:1, píldoras 8.6–9.8:1); `check.mjs` verde
  - Refs: P-24, RF-12

| Total | 22 tareas |
|---|---|
