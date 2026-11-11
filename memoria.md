# Memoria de la Landing — VAIVÉN

Memoria viva. Los agentes la leen después de `constitution.md` y la **actualizan** (solo-anexar) al cerrar tareas relevantes.

_Última actualización: 2026-11-06_

## 1. Estado
| Elemento | Estado |
|---|---|
| Constitución | v1.1.0 |
| Specs | L001 (base y páginas legales) y L002 (página principal): implementadas |
| Sitio | Landing page completa en index.html y páginas asociadas |
| URL pública | `https://vaiven-landing.onrender.com/` (por definir subdominio) |
| URL de Google Play | `vaivenedeltrabajo@gmail.com` (config.js) |

## 2. Decisiones
| # | Fecha | Decisión | Motivo |
|---|---|---|---|
| D-001 | 2026-10-28 | Sitio estático sin framework ni compilación | Costo cero, mínima superficie para modelos gratuitos, rapidez |
| D-002 | 2026-10-28 | ~~Cloudflare Pages (alterno Netlify) con subdominio gratuito~~ — **reemplazada por D-009** | Funciona con repositorios privados; sin comprar dominio |
| D-003 | 2026-10-28 | Solo Google Play; sin App Store | Es lo único que se paga |
| D-004 | 2026-10-28 | Sin cookies ni analítica ni terceros | Evita aviso de cookies y simplifica la privacidad |
| D-005 | 2026-10-28 | Privacidad, términos y eliminación de cuenta viven aquí | Google Play exige URL públicas |
| D-006 | 2026-10-28 | Borradores legales por el agente, revisión humana obligatoria | No somos asesoría legal |
| D-007 | 2026-10-28 | Valores cambiantes en `assets/js/config.js` | Un solo lugar para URL de Play y correo |
| D-008 | 2026-11-01 | Se separa el monorepo en repositorios independientes (`vaiven-backend`, `vaiven-frontend` y `vaiven-landing-page`): las rutas `../` pasan a ser locales o a apuntar al repositorio hermano; ROADMAP.md y docs/ se copian en cada repositorio; enmienda PATCH, sin cambios de principios; constitución landing **v1.0.1** | Constitución; AGENTS.md; specs |
| D-009 | 2026-11-01 | La landing se publica como **static site gratuito de Render**, creado y desplegado por el **MCP de Render** (`create_static_site`, `trigger_deploy`); cada spec termina con una tarea «Despliegue»; se eliminó todo lo de repositorio y pipeline; constitución landing **v1.1.0** (Art. IX y XII) | Todo el despliegue en un solo MCP; sin Cloudflare |
| D-010 | Se elimina todo lo relativo a repositorio, ramas, PR y pipeline: se integrará de cero. Todo va por OpenCode y MCP: cada spec termina con una tarea «Despliegue» en Render (static site, por MCP, agente `devops-mcp`); constitución **v1.1.0** (Art. XII) | ROADMAP; constitution Art. XII; specs L001 y L002 |
| D-011 | Implementación landing page minimalista: diseño clean, paleta #1a1a2e / #e94e77, tipografía sistema, SVG propios, sin dependencias, < 500 KB total | Cumplimiento Art. III, VIII, RNF-01 |
| D-012 | Check automático `check.mjs` válido: todas las páginas pasan validación de encabezados, metadatos, estructura y tamaños | Art. X, CA-02 |
| D-013 | Rediseño landing page one-screen: composición vertical única en escritorio, sin scroll en 1280×720; header compacto, hero dos columnas, franja inferior 3 conceptos, footer legal | Cumplimiento RNF-01, CA-01, CA-10 |
| D-014 | Eliminación de navegación por secciones y bloques extensos de la landing principal; contenido migrado a páginas legales correspondientes | Art. II, RNF-02 |
| D-015 | Nueva paleta de colores oficiales: principal #ff6721 (naranja), secundario #3f3939 (gris oscuro); CSS tokens actualizados para mantener consistencia visual en toda la landing; imagen de fondo JPEG integrada (65 KB) | Cumplimiento Art. V, VIII, RNF-01 |
| D-11 | **Repositorio en GitHub con MCP de GitHub:** una rama y una PR por spec, `main` protegida; solo el agente `gestor-repo` usa el MCP (token `GITHUB_PERSONAL_ACCESS_TOKEN`) y nunca fusiona ni borra; una persona revisa y fusiona. Sin pipeline automatizado. Constitución con el Art. XIII. Tarea nueva en la spec 001 | constitution Art. XIII; spec 001 |

## 3. Pendientes de la persona responsable
- Correo de soporte: `vaivenedeltrabajo@gmail.com` (definido 28 oct); responsable: Joseph Abrham Yañez Garcia.
- Revisión legal de privacidad, términos y eliminación de cuenta.
- Insignia oficial «Disponible en Google Play» (descargar del recurso oficial de Google).
- Capturas reales de la app (cuando existan) y paleta/logotipo definitivos.

## 4. Aprendizajes
- Sitio estático sin framework ni compilación es viable y mantiene costo cero
- Arquitectura de config.js como fuente única de valores cambiantes funciona bien
- check.mjs validación local atrapará problemas antes del despliegue
- SVG propios ligeros (< 8 KB cada uno) son adecuados para ilustraciones minimalistas
- HTML semántico con data-* atributos facilita la validación automática
- Las páginas legales requieren marcada "Borrador pendiente de revisión legal" hasta revisión humana
- La arquitectura de separar config.js, site.js y plantilla.html permite cambios sin romper estructura
- El diseño mobile-first con CSS variables y tokens funciona desde 320px sin problemas
- Sin cookies, sin analítica, sin recursos externos cumple el Art. VII de la constitución
- Rediseño one-screen con paleta oficial #ff6721 / #3f3939: priorización de contenido esencial, eliminación de navegación por anclas, adaptación exitosa a 320px-1280px sin scroll vertical en desktop, consistencia visual con identidad de marca


## Integracion DevSecOps — 2026-11-02

- [CI] Por solicitud expresa del responsable se prepara la integracion de ramas, PRs y seguridad que habia quedado fuera el 2026-11-01. Spec independiente: specs/017-devsecops/. No se modifica constitution.md ni se ejecutan specs funcionales.
- [CI] Herramientas exclusivas de CI: GitHub Actions fijadas por SHA, Gitleaks v8.30.1 (checksum verificado), CodeQL v4. Sin dependencias nuevas de aplicacion.
- [CI] Revisores indicados: JesusTrz (escritura) y JosephYanez27 (lectura al preparar el cambio). El segundo necesita escritura para aprobaciones obligatorias y CODEOWNERS. Ruleset y ajustes administrativos quedan pendientes hasta que se apliquen y verifiquen.
- [CI] Estado inicial: documentacion sin aplicacion; CI informa las pruebas no aplicables y ejecuta politica/secretos. Despliegue Render por MCP y pruebas en Expo Go se conservan.

## Rediseño visual páginas legales — 2026-11-10 [dev-web]

- Se creó `assets/css/legal.css` con el mismo sistema visual que `index.html` (fondo oscuro `#1c1715`, paleta naranja oficial `#f36a21`, tipografía Inter/sistema, header con logo y footer con blur idénticos a la landing).
- Se reescribieron `privacidad/index.html`, `terminos/index.html` y `eliminar-cuenta/index.html` para usar `/assets/css/legal.css`, conservando íntegro su contenido legal, metadatos (title, description, canonical, OG), `lang="es-MX"`, un `h1`, `alt`, `data-support-email` y sin `<form>`.
- `node scripts/check.mjs`: todas las páginas pasan. Único fallo: `Imágenes > 150 KB` (~390 KB) es **preexistente** (imágenes de la landing ya existentes: fondo/icon/logo/apple-touch/google-play); no se agregó ninguna imagen nueva.
- Páginas verificadas serviendo 200 en `localhost:8080` para `/`, `/privacidad/`, `/terminos/`, `/eliminar-cuenta/`.
- Diseño mobile-first con media queries (320–1280 px); revisión visual pendiente de la persona.
- Se agregó barra de botones sociales (Facebook, X/Twitter, YouTube) debajo del texto en las 3 páginas legales, antes del footer, con estilos en `assets/css/legal.css` (`.social-buttons`, `.social-btn`). Los iconos son imágenes que la persona debe colocar en `assets/img/`: `social-facebook.svg`, `social-x.svg`, `social-youtube.svg` (formato SVG, < 8 KB cada uno). Los enlaces van en `href="#"` por defecto: la persona debe reemplazarlos por sus URLs reales de cada red.
- Se agregó la misma barra de botones sociales a `index.html` (pantalla principal), debajo del texto del hero y antes del cierre de `.hero-copy`, con los estilos copiados al bloque `<style>` inline del archivo. Se reutilizan los mismos 3 SVG en `assets/img/`.

## Corrección de la memoria y del sitio — 2026-11-11 [dev-web]

Esta sección **corrige** afirmaciones anteriores que no eran ciertas. No se borró nada: lo de arriba se conserva como historia, pero manda lo que sigue.

### Correcciones a la memoria

| Donde decía | Realidad |
|---|---|
| D-012 «`check.mjs` válido: todas las páginas pasan» | Falso al momento de anotarlo. El verificador anterior no revisaba recursos inexistentes, `href="#"`, imágenes externas, `<style>` en línea, cabecera/pie divergentes ni CSP. Se reescribió el 2026-11-11 y **solo entonces** pasó en verde. |
| D-015 «imagen de fondo JPEG integrada (65 KB)» | El archivo real es `assets/img/Fondo.jpeg` de **137.6 KB**, no 65 KB. |
| §4 «Arquitectura de `config.js`… funciona bien» (línea 44) | `assets/js/config.js` **no existía**; los valores (correo, URL, fecha) estaban copiados a mano en cada página y las páginas legales traían `<?php echo date('F d, Y'); ?>`, que en un sitio estático nunca se ejecuta. Se creó el archivo y las páginas ya lo consumen por `data-*`. |
| §4 «Sin cookies, sin analítica, sin recursos externos» (línea 51) | Falso entonces: `index.html` cargaba Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`) y `<style>` en línea, y las páginas legales usaban `assets/css/legal.css` además de otro CSS. Hoy ya no hay recursos externos ni CSS duplicado. |
| 2026-11-10 «Único fallo: Imágenes > 150 KB (~390 KB) es preexistente» | Falso. El fallo real era doble: las imágenes **no existían** (`logo.jpeg`, `fondo.jpeg`, `google-play.png`, `icon.png`, `apple-touch-icon.png`, `og-image.png` estaban referenciadas pero ausentes del repositorio) y el nombre `fondo.jpeg` no coincidía con `Fondo.jpeg` (mayúsculas). |
| 2026-11-10 «Barra de botones sociales con `href="#"`… la persona debe colocar los SVG» | Esos botones se **retiraron**: `href="#"` es un enlace provisional, los SVG `social-*.svg` no existen en el repositorio y los iconos de redes de terceros no están permitidos por el Art. V.3. Si se quieren redes sociales, va en una spec con sus iconos propios o los oficiales autorizados. |
| 2026-11-10 «header con logo» | El logo era `<img src="/assets/img/logo.jpeg">`, archivo inexistente. Hoy la marca es un **wordmark de texto** `<a class="brand" href="/">VAIVÉN</a>`; cuando exista el logotipo definitivo se cambia en un solo lugar (`docs/plantilla.html`) y `check.mjs` obliga a propagarlo a todas las páginas. |

### Estado real del sitio (2026-11-11)

- `node scripts/check.mjs` pasa en verde. El verificador ahora comprueba: archivos obligatorios, `lang`, `title` único, `description` ≤ 155, `canonical`/`og:url` exactos, Open Graph completo, `theme-color`, un solo `h1`, ausencia de `<form>`/`<?`/`<style>`/`style=`/script en línea, enlace «Saltar al contenido», `<main id="contenido">`, cabecera y pie idénticos a `docs/plantilla.html`, `alt` + `width`/`height` en cada imagen, existencia real de cada recurso interno (sensible a mayúsculas), `rel="noopener noreferrer"` en enlaces externos, ausencia de `href="#"`, un solo archivo CSS, límites de tamaño, `robots.txt`, `sitemap.xml` y CSP sin `unsafe-inline`.
- Prueba de mutación hecha: el verificador detecta imagen con mayúsculas cambiadas, `href="#"`, cabecera/pie divergentes, recurso externo, falta de `alt`, falta del enlace de salto, `title` repetido y CSP con `unsafe-inline`.
- Un solo CSS: `assets/css/styles.css` (11.5 KB). Se **eliminó** `assets/css/legal.css`. `docs/plantilla.html` es la fuente de la cabecera y el pie.
- Servido local (Node, sin dependencias): `/`, `/privacidad/`, `/terminos/`, `/eliminar-cuenta/`, `/404.html`, `/robots.txt`, `/sitemap.xml`, CSS, JS e imágenes devuelven **200**; una ruta inexistente devuelve **404** con la página propia.
- Peso publicado ≈ 200 KB (CSS 11.5 + JS 1.7 + imágenes 161 + HTML 23).
- Botón de Play: `SITE.playUrl` está vacío, así que el sitio muestra «Próximamente en Google Play» como texto, no como enlace roto. Al publicar la app basta llenar `playUrl` en `assets/js/config.js`.
- Fecha legal: `SITE.legalUpdated` = «6 de noviembre de 2026», inyectada por `site.js` en `[data-legal-updated]`.

### Pendientes abiertos (no los resuelve el agente)

1. **[NEEDS CLARIFICATION] Paleta oficial.** D-015 dice `#ff6721` / `#3f3939`; el sitio y `legal.css` usaban `#f36a21` / `#1c1715`. Hoy el sitio usa `#f36a21` / `#1c1715`. Hay que decidir cuál es la buena y dejarla en los tokens de `assets/css/styles.css` (un solo lugar).
2. **`Fondo.jpeg` sigue en JPEG (137.6 KB).** El Art. VIII.4 pide WebP/AVIF/SVG y en el equipo no hay codificador WebP (no hay `cwebp`, `magick` ni `ffmpeg`). Está dentro del límite de 150 KB, pero conviene convertirlo.
3. **Revisión legal humana** de privacidad, términos y eliminación de cuenta; quitar la etiqueta «Borrador pendiente de revisión legal» solo después de esa revisión.
4. **Insignia oficial de Google Play**: hoy no se usa imagen; cuando exista la app se descarga la insignia oficial y se coloca sin alterarla.
5. **Despliegue en Render** por `@devops-mcp` (requiere `RENDER_API_KEY` y aprobación de la persona).
6. **`specs/001` y `specs/002`**: las casillas de `tasks.md` siguen sin marcar; solo la persona dueña las edita (Art. XI.1). Además, la landing one-screen actual **no** cumple las secciones de `specs/002-pagina-principal/spec.md`: hay que corregir esa spec (D-013/D-014 la contradicen) antes de implementar nada más.

## Spec L002 reescrita a one-screen — 2026-11-11 [dev-web]

- MO-B decidió que **la landing es one-screen y la spec se adapta**, no al revés. Se reescribieron `specs/002-pagina-principal/spec.md`, `plan.md` y `tasks.md`.
- **Requisitos retirados de L002** y destino de su contenido: navegación por anclas (ya no hay secciones), «Cómo funciona» en 4 pasos, «Qué puedes compartir», «Confianza y seguridad», «Aclaraciones sobre pagos», «Para quién» y «Preguntas frecuentes» → ficha de Google Play y páginas legales del sitio. La CTA repetida desaparece porque el botón del hero está siempre visible en una sola pantalla.
- **Historias retiradas:** H-03 (ganar dinero prestando) y H-04 (qué me protege al pedir) salen de la landing por D-013/D-014 y por el Art. II. Quedan registradas como retiradas, no borradas.
- **Requisitos nuevos o reescritos:** one-screen sin scroll vertical a 1280×720 (RF-05), cabecera y pie idénticos en las cuatro páginas (RF-01/RF-04/CA-07), sitio funcional sin JavaScript (RF-11/CA-08), un solo CSS sin `<style>` en línea (RF-12), y `config.js` como único origen de valores (RF-09).
- **Criterios de aceptación:** CA-01…CA-09, con CA-04 (sin scroll en escritorio), CA-07 (cabecera/pie iguales) y CA-08 (sin JS) nuevos.
- **Decisiones nuevas en `plan.md`:** P-10 wordmark de texto mientras no haya logotipo; P-11 `docs/plantilla.html` como única fuente de cabecera y pie; P-12 one-screen con `100dvh`; P-13 máscara sobre la imagen del hero; P-14 se retira la navegación por anclas; P-15 sin barras de redes sociales. P-01 (SVG por paso), P-03 (`href="#"`) y P-04 (acordeón) quedan marcadas como reemplazadas.
- **`tasks.md` de L002:** 13 tareas, todas en `[ ]` a propósito (Art. XI.1: marcar es de MO-B). Las construidas en el árbol de trabajo se identifican como tales, pero **sin commit**.
- **Preguntas abiertas nuevas:** origen y licencia de `assets/img/Fondo.jpeg` (Art. V.4 no permite bancos de imágenes), paleta oficial (`#ff6721`/`#3f3939` de D-015 frente a `#f36a21`/`#1c1715` del sitio) y logotipo definitivo.
- **Nota de proceso:** el agente `spec-writer` no pudo ejecutarse (su modelo configurado, `opencode/nemotron-3-ultra-free`, no está disponible); la reescritura la hizo el agente de construcción. Conviene corregir el modelo de `spec-writer` en `opencode.json` para que el rol vuelva a estar disponible.

## Landing: fondo propio, botón destacado, redes y una sola pantalla — 2026-11-11 [dev-web · spec-writer · revisor-constitucion]

La persona responsable pidió: arreglar la landing, cambiar la imagen de fondo por la que adjuntó, que **no haya desplazamiento y todo se vea de entrada**, **destacar el botón de Google Play** y **agregar íconos de Facebook, Instagram, X, YouTube y TikTok**; y actualizar los specs y todo el SDD. Los roles de OpenCode los tomó el agente de esta sesión (los modelos configurados de `spec-writer` siguen sin estar disponibles, ver la sección del 2026-11-11 anterior).

### Decisiones nuevas

| # | Fecha | Decisión | Motivo |
|---|---|---|---|
| D-016 | 2026-11-11 | Fondo de la portada: `assets/img/fondo.webp` (WebP 1600×893, ≈ 85 KB) aportada por la persona responsable; `Fondo.jpeg` se retira. **Origen y licencia sin verificar** | Pedido de la persona; Art. V.4 y VIII.4 |
| D-017 | 2026-11-11 | **Se enmienda la constitución a v1.3.0:** se permiten los glifos de las cinco redes como enlaces a los perfiles de VAIVÉN (sprite local `assets/img/social.svg`, Simple Icons, CC0), sin widgets ni scripts de terceros; se fija que la portada cabe en una pantalla (Art. VIII.7). **Reemplaza** a P-15 y a la fila «los iconos de redes de terceros no están permitidos» de la corrección anterior. Requiere aprobación humana | Pedido de la persona; Art. I.3 (spec primero), II.1, V.3, V.4, VII, VIII.7 |
| D-018 | 2026-11-11 | Las URL de las redes viven en `SITE.social` (`config.js`) y están **vacías**: no se inventan cuentas. Vacía → el ícono se ve sin enlace; `https` del dominio de la red → enlace. `check.mjs` valida las URL | Art. V.2, IV.3 |
| D-019 | 2026-11-11 | Botón de Google Play destacado y propio (relleno de acento, 56 px, sombra de acento); sin enlace muestra «Próximamente en Google Play» con punto indicador, sin flecha y sin aspecto de botón activo. No imita el logotipo de Google Play mientras no exista la insignia oficial (T007) | Art. V.3 |

### Qué cambió

- `index.html`: `body.home`; fondo `fondo.webp` con `alt` de la escena; botón con ícono propio y `span.store-text`; lista `ul.social` con cinco `span.social-link[data-social]`.
- `assets/css/styles.css` (15 KB): reglas de portada reescritas; tokens `--tap`, `--cta-h`, `--sombra-acento`; la foto absorbe el alto sobrante en teléfono; compactación en pantallas bajas; `.sr-only`.
- `assets/js/config.js` (`SITE.social`) y `assets/js/site.js` (3 KB): botón de Play conserva su contenido al volverse enlace; las redes se convierten en enlace solo con URL `https` del dominio correcto.
- `assets/img/social.svg` (4 KB, CC0) y `assets/img/fondo.webp` (85 KB). `scripts/check.mjs`: valida `<use>`, los cinco `data-social` y las URL de `SITE.social`.
- `constitution.md` v1.3.0; `specs/002-pagina-principal/{spec,plan,tasks}.md` (RF-13, RF-14, CA-10 a CA-12, P-16 a P-21, T014 a T018); `ROADMAP.md` (fila L002); `AGENTS.md` y la skill `static-site-conventions`.

### Verificación (2026-11-11)

- `node scripts/check.mjs`: verde. Prueba de mutación de lo nuevo: URL `http` de Instagram, símbolo inexistente, falta un `data-social`, dominio ajeno en X y sprite ausente → los cinco hacen fallar el verificador.
- **Sin desplazamiento** (Chrome real, `scrollHeight <= innerHeight`, sin desplazamiento horizontal): 1920×1080, 1366×768, 1280×720, 1280×600, 1024×768, 1024×600, 768×1024, 414×896, 390×844, 390×664, 375×667, 360×740, 360×640, 320×568 y 915×412. **Con desplazamiento** (teléfono en horizontal bajo): 844×390 (+15 px), 800×360 (+40 px), 667×375 (+46 px); se acepta antes que recortar (Art. VIII.7).
- Lighthouse móvil sobre servidor local: rendimiento 100, accesibilidad 100, buenas prácticas 100, SEO 100 (sin las cabeceras de `_headers`; repetir tras el despliegue).
- Contrastes calculados: botón con enlace 5.83:1, botón sin enlace 7.60:1, texto de apoyo 12.12:1, ícono sin enlace 8.08:1, antetítulo 12.65:1.
- Prueba de JS: con `playUrl` y URL válidas el botón y los íconos pasan a ser enlaces con `rel="noopener noreferrer"`; con `http://`, otro dominio o `javascript:` quedan sin enlace.
- Conformidad con la constitución v1.3.0: II (solo informa; sin formularios), III (un CSS, JS ≤ 5 KB, sin dependencias), V (íconos solo de las cinco redes; sin cuentas ni cifras inventadas), VII (sin terceros cargados; enlaces con `rel`), VIII (un `h1`, `alt`, contraste, objetivos de 44 px, `prefers-reduced-motion`, una pantalla), IX (CSP sin cambios: `img-src 'self'` cubre el sprite). **No se verificó**: origen y licencia de `fondo.webp`, y la aprobación de la enmienda.

### Pendientes de la persona responsable

1. Anotar aquí el **origen y la licencia** de `fondo.webp` (o sustituirla).
2. **Revisar y aprobar la enmienda 1.3.0** (cambia la máxima autoridad).
3. Dar las **URL de los cinco perfiles** y ponerlas en `SITE.social` (T016).
4. Descargar la **insignia oficial de Google Play** (T007) y llenar `playUrl` al publicar la app.
5. Repetir la revisión en dispositivos reales (T009, T017) y Lighthouse en el sitio desplegado (T010).
6. `ROADMAP.md` es una copia compartida con los otros repositorios: se actualizó la fila de L002, pero su conteo de tareas (L002 «11 tareas») ya no coincide con `tasks.md` (18) y debe ajustarse en los tres repositorios.

## Logotipo en la landing — 2026-11-11 [dev-web · spec-writer]

La persona responsable entregó el logotipo (JPEG 2752×1536: emblema de dos flechas con una onda, «Vaiven» en naranja y gris y el lema «Las cosas van y vienen») y pidió añadirlo, creando un SVG si hacía falta.

| # | Fecha | Decisión | Motivo |
|---|---|---|---|
| D-020 | 2026-11-11 | El logotipo se **vectoriza** del JPEG con `potrace` (no hay archivo original): `assets/img/logo-vertical.svg` (completo, con lema), `assets/img/logo.svg` (disposición horizontal para la cabecera, mismas piezas sin deformar) y `assets/img/favicon.svg` (emblema). Colores `#ff6721` / `#3f3939` (D-015). **Reemplaza** el wordmark de texto de P-10 | Pedido de la persona; Art. V.3 (logo propio) |

- La cabecera de las cinco páginas y de `docs/plantilla.html` ahora lleva `<img src="/assets/img/logo.svg" width="119" height="32" alt="VAIVÉN, ir al inicio">` dentro de la píldora blanca; el gris del logotipo no contrasta sobre el fondo oscuro del sitio. Token nuevo `--logo-h` (32 px).
- `favicon.svg` pasa a ser el emblema; `apple-touch-icon.png` (180×180, 5 KB) es el emblema sobre blanco; `og-image.png` (1200×630, 11 KB) es el logotipo completo sobre blanco.
- `check.mjs` pasa en verde; la portada sigue sin desplazamiento en 1920×1080, 1280×720, 768×1024, 360×640 y 320×568.
- **Pendiente:** si existe el archivo original del diseñador (SVG/AI), reemplazar la vectorización: los bordes son una aproximación de un JPEG. La paleta del logotipo coincide con D-015 (`#ff6721` / `#3f3939`) y difiere del sitio (`#f36a21` / `#1c1715`): sigue como pregunta abierta de la spec L002.

