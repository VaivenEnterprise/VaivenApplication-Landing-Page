# Plan L002 — Página principal informativa (one-screen)

- **Spec:** `spec.md` · **Dueño:** MO-B
- **Actualizado de nuevo el 2026-11-11 (fondo propio, botón destacado, redes, sin desplazamiento en todos los tamaños):** ver P-12 (reescrita), P-16 a P-21 y la tabla de decisiones reemplazadas. Constitución v1.3.0.
- **Actualizado el 2026-11-11:** el plan anterior describía una página de nueve bloques con navegación por anclas. Se reescribe para la landing de una sola pantalla que fijan D-013 y D-014. Las decisiones viejas no se borran: quedan marcadas como reemplazadas al final.

## 1. Archivos

```
index.html                       (página principal; reemplaza el provisional)
docs/plantilla.html              (cabecera y pie canónicos)
assets/css/styles.css            (hoja única: tokens, .site-header, .hero, .values, .site-footer, .legal, .not-found)
assets/js/config.js              (name, url, playUrl, supportEmail, legalUpdated)
assets/js/site.js                (mejora progresiva; sin JS el sitio funciona)
assets/img/fondo.webp            (fotografía de fondo, WebP 1600×893 — ver P-16; sustituye a Fondo.jpeg, que se retira)
assets/img/social.svg            (sprite con los glifos de Facebook, Instagram, X, YouTube y TikTok — ver P-18)
assets/img/og-image.png          (1200×630, ≤ 150 KB)
assets/img/logo.svg              (logotipo horizontal: emblema + «Vaiven»; cabecera — ver P-22)
assets/img/logo-vertical.svg     (logotipo completo con el lema; se usa para generar og-image.png)
assets/img/favicon.svg · apple-touch-icon.png   (emblema; el segundo, PNG 180×180 sobre blanco)
assets/img/google-play-badge.*   (insignia oficial — la aporta una persona, T008)
sitemap.xml                      (incluye las cuatro URL del sitio)
```

`robots.txt`, `_headers`, `404.html`, `sitemap.xml` y `scripts/check.mjs` son entregables de L001; aquí solo se usan y se mantienen.

## 2. Estructura de la página (orden)

1. `a.skip-link` → «Saltar al contenido».
2. `header.site-header` → `a.brand` (píldora blanca) con `img` del logotipo (`logo.svg`).
3. `main#contenido.hero`
   - `body.home` marca la portada (las reglas de una sola pantalla solo aplican aquí; las páginas legales se desplazan).
   - `.hero-media` → `img` de fondo (`fondo.webp`).
   - `section.hero-copy` → `p.eyebrow`, `h1` con la frase central (segunda línea en naranja), `p.description`, `p.store[data-play-link]` (ícono propio de descarga + `span.store-text`), `ul.values` (Comparte, Encuentra, Conecta) y `ul.social` (cinco `span.social-link[data-social]` con `svg > use` y `span.sr-only`).
4. `footer.site-footer` → `nav.footer-links` (Privacidad, Términos y condiciones, Eliminar cuenta, Contacto) y `p.copyright`.

## 3. Decisiones

| # | Decisión | Art. |
|---|---|---|
| P-01 | Un solo archivo CSS con tokens en `:root`; ninguna regla usa valores literales de color o espacio | III, VIII |
| P-02 | La insignia oficial de Google Play se descarga del recurso oficial y se coloca sin modificar; la aporta una persona, no se genera | V.3 |
| P-03 | Botón de Play: `<p class="store" data-play-link>` con texto de reserva. `site.js` lo reemplaza por un `<a>` **solo** si `playUrl` es una URL válida de `play.google.com`; si no, deja el texto «Próximamente en Google Play» con `aria-disabled` | IV.3 |
| P-05 | Imagen Open Graph 1200×630 propia (nombre + frase + paleta) en PNG ≤ 150 KB | VIII |
| P-06 | JSON-LD `MobileApplication` (`name`, `operatingSystem`, `applicationCategory`, `inLanguage`, `url`, `description`), sin `aggregateRating` | V.2 |
| P-07 | Cada afirmación se verifica contra las specs de la app y se cita en `memoria.md` (tabla afirmación → spec) | V.2 |
| P-08 | Las capturas (P2) se agregan solo cuando existan en una versión estable de la app; si faltan, no se agrega ninguna sección | V.2 |
| P-09 | Tras publicar en Play: llenar `playUrl` en `config.js`, actualizar `sitemap.xml`/OG si cambia la URL del sitio y volver a ejecutar `check.mjs` | IV.3 |
| P-10 | ~~La marca es un wordmark de texto~~ — **reemplazada por P-22** | IV.2, V.3 |
| P-11 | Cabecera y pie se copian de `docs/plantilla.html`; `check.mjs` falla si difieren, así que la plantilla es la única fuente | IV.2 |
| P-12 | **One-screen (reescrita):** el cuerpo mide al menos `100dvh` y el `main` ocupa lo que sobra; el contenido se dimensiona con `vh`/`dvh` y tokens (`clamp`, `min()`), sin alturas fijas ni `overflow: hidden` en la página, de modo que si no cabe la página crece y se desplaza en lugar de recortar. Escritorio: dos columnas (texto a la izquierda, foto a la derecha con degradado). Teléfono vertical (≤ 720 px de ancho, o ≤ 1000 px en vertical): la foto va arriba y es el único bloque flexible (`flex: 1 0 120px`, tope `56dvh`), así absorbe el alto sobrante. Pantallas bajas: se compacta el espaciado y, solo el antetítulo decorativo, se omite (`max-height: 620px` en vertical, `560px` en horizontal). Se verificó sin desplazamiento en 1920×1080, 1366×768, 1280×720, 1280×600, 1024×768, 1024×600, 800×600, 768×1024, 414×896, 390×844, 390×664, 375×667, 360×740, 360×640 y 320×568 | VIII.7 |
| P-13 | La imagen del hero se degrada con `mask-image` (y su prefijo `-webkit-`) para que el texto no pierda contraste; el color de fondo hace de respaldo si la máscara no está disponible | VIII.1 |
| P-14 | Se retira la navegación por anclas y todo el contenido largo: no cabe en una pantalla y ya vive en la ficha de Play y en las páginas legales | II, D-013, D-014 |
| P-15 | ~~No se incluyen barras de redes sociales~~ — **reemplazada por P-18** | V.3 |
| P-16 | **Fondo:** la fotografía la aporta la persona responsable. Se convierte a WebP 1600×893 (≈ 85 KB, calidad 80) con `Pillow`; `Fondo.jpeg` (137 KB) se retira del sitio. Va en `<img>` (no en CSS) para conservar `alt`, `width`/`height` y `fetchpriority`. Su origen y licencia quedan **sin verificar** y se anotan como pregunta abierta | V.4, VIII.4 |
| P-17 | **Botón destacado:** relleno `--color-acento` (`--color-acento-claro` cuando no es enlace), texto `--color-fondo` (contraste ≈ 5.8:1 y ≈ 7.6:1), alto `--cta-h` (56 px; 52 en teléfono), forma de píldora y `--sombra-acento`. Sin enlace: punto indicador, sin flecha, cursor normal y `aria-disabled`. Con enlace: flecha de descarga propia (`stroke`, no es el logotipo de Google Play) y resalte al enfocar | V.3, VIII.1 |
| P-18 | **Redes sociales:** íconos en un sprite SVG local (`assets/img/social.svg`, Simple Icons 16.37.0, CC0) referenciado con `<use href>`; cada uno vive en `span.social-link[data-social]` y `site.js` lo convierte en `<a>` solo si `SITE.social.<red>` es `https` y del dominio de esa red (si no, queda sin enlace). Se eligió el sprite y no SVG repetido en el HTML para pesar ≈ 4 KB una sola vez. Sin SDK, widgets ni scripts de las redes | II.1, V.3, VII |
| P-19 | **Valores nuevos en `config.js`:** `SITE.social = { facebook, instagram, x, youtube, tiktok }`, todos `""` hasta que existan los perfiles (no se inventan cuentas) | IV.3, V.2 |
| P-20 | **Tokens nuevos:** `--tap` (44 px, objetivo táctil), `--cta-h` (56 px) y `--sombra-acento`. El resto sale de los tokens que ya existían (`--space-*`, `--radio-*`, colores) | III, VIII.1 |
| P-21 | **`check.mjs` ampliado:** valida que cada `<use href>` apunte a un archivo y un símbolo existentes, que la portada tenga los cinco `data-social` y que cada URL no vacía de `SITE.social` sea `https` y del dominio de la red | X.1 |
| P-22 | **Logotipo:** la persona entregó el logotipo como JPEG (2752×1536). Se vectorizó con `potrace` (emblema, «Vai», «ven» y lema por separado) en `logo-vertical.svg`; `logo.svg` es la **disposición horizontal** de las mismas piezas sin deformarlas (emblema a la izquierda, «Vaiven» a la derecha, sin lema) para caber en la cabecera. Colores `#ff6721` y `#3f3939` (D-015, coinciden con el muestreo del JPEG). Va en `<img>` con `alt` y `width`/`height`, dentro de la píldora blanca que ya tenía la marca (el gris del logotipo no contrasta sobre el fondo oscuro). La cabecera se cambió en la plantilla y en las cinco páginas; `check.mjs` obliga a mantenerlas iguales. Pendiente: reemplazar la vectorización por el archivo original del diseñador, si existe | IV.2, V.3, V.4 |

### Decisiones reemplazadas

| Antes | Por qué se reemplaza |
|---|---|
| P-12 anterior: `min-height: calc(100dvh - 76px)` en el hero y desplazamiento libre en teléfono | La persona pidió «sin scroll, todo de inicio». La nueva P-12 lo cumple también en teléfono. |
| P-15 anterior: sin barras de redes por el Art. V.3 | La persona pidió los íconos de las cinco redes; se enmendó el Art. V.3 (v1.3.0) y rige P-18. |
| Imagen `Fondo.jpeg` del hero en JPEG, solo en el lado derecho | La persona entregó otra fotografía; ahora es `fondo.webp` y encaja con el nuevo encuadre. |
| P-01 anterior: SVG propios por paso (`step-1.svg` … `step-4.svg`) | Ya no hay sección de pasos. |
| P-03 anterior: `<a data-play-link href="#">` | `href="#"` es un enlace provisional y `check.mjs` lo rechaza; el elemento base es un párrafo. |
| P-04: acordeón con `<details>` | Ya no hay preguntas frecuentes en la landing. |

## 4. Pruebas

- `node scripts/check.mjs` en verde (estructura, metadatos, enlaces, recursos existentes, tamaños, CSP).
- Prueba de mutación del verificador: cambiar mayúsculas de una imagen, poner `href="#"`, alterar la cabecera o el pie, meter un recurso externo o quitar un `alt` debe hacerlo fallar.
- Servido local: las cuatro páginas y sus recursos devuelven 200; una ruta inexistente devuelve 404 con la página propia.
- Lighthouse móvil ≥ 90 en las cuatro categorías.
- Revisión visual a 360, 768 y 1280 px; comprobar con las medidas de P-12 que no hay desplazamiento vertical ni horizontal (se midió con Chrome real y `document.documentElement.scrollHeight <= innerHeight`).
- Prueba de las redes: con `SITE.social` vacía los cinco íconos quedan sin enlace; con URL válidas pasan a enlace; con `http`, otro dominio o `javascript:` se ignoran.
- Navegación solo con teclado y lectura con lector de pantalla del hero y del pie.
- Revisión de textos contra las specs de la app.

## 5. Verificación de constitución

| Art. | Cumple |
|---|---|
| II | Solo información; sin formularios ni servicios |
| III | HTML a mano, un CSS, JS mínimo, sin dependencias ni compilación |
| IV | Estructura de carpetas, plantilla común y `config.js` como único origen de valores |
| V | Nada inventado; íconos de terceros solo los de las cinco redes (V.3 enmendado) y sin URL inventadas; origen de la foto declarado como pendiente |
| VII | Sin cookies, analítica, terceros ni CDN; los enlaces a redes no cargan nada de ellas |
| VIII | Accesibilidad, rendimiento, SEO y límites de tamaño; portada en una pantalla (VIII.7) |
| IX | CSP estricta en `_headers`, sin secretos |
| X | `check.mjs` como puerta de calidad y revisión de `revisor-constitucion` |
