# Spec L002 — Página principal informativa (landing)

- **Dueño:** MO-B · **Prioridad:** P1 · **Ventana:** 9–16 nov (actualización final tras publicar la app) · **Depende de:** L001
- **Constitución:** landing v1.4.0 (enmiendas 1.3.0 y 1.4.0 aprobadas el 2026-11-11) · **Estado:** Borrador
- **Reescrita el 2026-11-11 (one-screen).** La versión anterior describía una landing de varias secciones con navegación por anclas. Esa estructura se descartó en las decisiones D-013 y D-014, pero la spec nunca se actualizó. Esta versión describe el sitio que existe y manda sobre la anterior.
- **Actualizada el 2026-11-11 (fondo propio, botón destacado y redes).** Cambios pedidos por la persona responsable: (1) la imagen de fondo pasa a ser una fotografía aportada por ella (`assets/img/fondo.webp`); (2) la portada debe verse **completa de entrada, sin desplazamiento**, también en teléfonos; (3) el botón de Google Play se **destaca** como llamada principal; (4) se agregan los **íconos de Facebook, Instagram, X, YouTube y TikTok**. El punto 4 contradecía el Art. V.3 y esta misma spec (§5, «Fuera de alcance»): por eso se enmienda la constitución a **v1.3.0** y se retira esa exclusión.

## 1. Objetivo y por qué

Explicar en **pocos segundos** qué es VAIVÉN y llevar a la persona a **descargar la app en Google Play**. Es la cara pública del proyecto y la página a la que dirigirá la ficha de la tienda. Solo informa: no ofrece servicios.

La landing es **una sola pantalla**: marca, frase central, botón de Google Play, redes sociales y pie se ven de entrada, sin desplazamiento vertical, en escritorio y en teléfonos desde 360×640. El detalle de cómo funciona la app, qué se puede compartir y cómo se cuida a las personas vive en la **ficha de Google Play** y en las **páginas legales** (`/privacidad/`, `/terminos/`, `/eliminar-cuenta/`), que son parte de este mismo sitio.

## 2. Historias

| # | Prio. | Historia |
|---|---|---|
| H-01 | P0 | Como visitante, quiero entender qué es VAIVÉN en pocos segundos, para decidir si me interesa. |
| H-02 | P0 | Como visitante, quiero descargar la app desde Google Play con un toque. |
| H-05 | P2 | Como visitante, quiero ver cómo se ve la app (capturas reales), cuando existan. |
| H-06 | P1 | Como visitante, quiero encontrar a VAIVÉN en mis redes (Facebook, Instagram, X, YouTube, TikTok), para seguirlo y comprobar que es un proyecto real. |
| H-07 | P1 | Como visitante, quiero ver personas reales compartiendo un objeto, para sentir confianza en la propuesta. |

**Historias retiradas de esta spec.** H-03 («quiero saber cómo ganar dinero prestando lo que no uso») y H-04 («quiero saber cómo pido algo prestado y qué me protege») ya no se resuelven en la landing: su contenido corresponde a la ficha de Google Play y a los términos y condiciones. Se retiran por D-013 (composición one-screen) y D-014 (contenido extenso migrado a las páginas legales), y por el Art. II: la landing solo informa y envía a la tienda. Si más adelante se quieren recuperar, va en una spec nueva.

## 3. Requisitos

| ID | Requisito |
|---|---|
| RF-01 | **Cabecera:** logotipo de VAIVÉN (`assets/img/logo.svg`: emblema de flechas + «Vaiven», 32 px de alto) sobre una píldora blanca, con `alt="VAIVÉN, ir al inicio"`, que enlaza a `/`. **Sin** navegación por secciones ni anclas. La cabecera es idéntica en las cuatro páginas del sitio y sale de `docs/plantilla.html`. |
| RF-02 | **Sección principal (hero):** antetítulo breve, frase central (`h1`), 1–2 líneas de apoyo, botón de Google Play y una fotografía de fondo (ver RF-14). Un solo `h1` por página. El botón es el elemento **más destacado** de la pantalla: relleno de color de acento, el de mayor altura (≥ 52 px) y con sombra de acento. |
| RF-03 | **Franja de tres conceptos:** Comparte, Encuentra, Conecta. Lista corta, legible sin desplazarse en escritorio. |
| RF-04 | **Pie:** enlaces a Privacidad, Términos y condiciones, Eliminar cuenta y Contacto (`mailto:`), más el aviso de copyright. Idéntico en las cuatro páginas. |
| RF-05 | **One-screen en todos los tamaños:** la portada completa (cabecera, hero, redes y pie) cabe sin desplazamiento vertical en escritorio desde 1024×600, en tableta y en teléfonos desde 320×568 en vertical. En pantallas de teléfono vertical la foto va arriba y el texto debajo, y la foto absorbe el alto sobrante. En pantallas bajas solo se omite el antetítulo decorativo; el resto del contenido nunca se recorta. En teléfono en horizontal con menos de ≈ 400 px de alto se permite desplazamiento antes que recortar. Sin desplazamiento horizontal en ningún ancho (Art. VIII.7). |
| RF-06 | **Metadatos:** `title` único, `description` ≤ 155 caracteres, `canonical`, `theme-color` y Open Graph completo (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:locale`). |
| RF-07 | **Imagen social:** `assets/img/og-image.png` de 1200×630, ≤ 150 KB, con el logotipo completo (emblema, nombre y «Las cosas van y vienen») sobre fondo blanco. El favicon (`favicon.svg`) es el emblema y `apple-touch-icon.png` (180×180) es el emblema sobre blanco. |
| RF-08 | **Datos estructurados:** JSON-LD `MobileApplication` con `name`, `applicationCategory`, `operatingSystem: Android`, `inLanguage`, `url` y `description`. **Sin** `aggregateRating` ni reseñas (Art. V.2: nada inventado). |
| RF-09 | **Valores en un solo lugar:** nombre del sitio, URL, enlace de Google Play, correo de soporte y fecha de actualización legal viven en `assets/js/config.js`. El HTML trae un valor de reserva legible sin JavaScript. |
| RF-10 | **Botón de Google Play:** mientras `playUrl` esté vacía, se muestra «Próximamente en Google Play» como **texto y no como enlace** (con punto indicador, sin flecha, `aria-disabled="true"` y cursor normal); con URL válida de `play.google.com`, se convierte en enlace «Disponible en Google Play» con flecha de descarga propia y `rel="noopener noreferrer"`. Nunca un enlace roto ni `href="#"`. Mientras no exista la insignia oficial (T007), el botón es propio y no imita el logotipo de Google Play (Art. V.3). El texto sobre el fondo de acento cumple contraste AA. |
| RF-11 | **Mejora progresiva:** el sitio funciona sin JavaScript. El JS (`assets/js/site.js`) solo rellena correo, fecha legal y botón de Play. |
| RF-12 | **Sin recursos externos:** un solo archivo CSS propio, sin fuentes ni librerías de CDN, sin `<style>` ni `style=` en línea, sin `<form>` y sin terceros (Art. III y VII). |
| RF-13 | **Redes sociales:** debajo de los tres conceptos, una lista «Redes sociales de VAIVÉN» con cinco íconos, en este orden: Facebook, Instagram, X, YouTube y TikTok. Cada ícono es un círculo de 44 px con el glifo monocromático de `assets/img/social.svg` (un solo archivo local, CC0) y texto accesible. Las URL viven en `SITE.social` de `assets/js/config.js`; si una está vacía el ícono se muestra **sin enlace** (texto accesible «…, próximamente»); si es válida (`https` y del dominio de la red) se convierte en enlace «VAIVÉN en …» con `rel="noopener noreferrer"` y `target="_blank"`. Sin widgets, contadores, píxeles ni scripts de las redes (Art. VII). |
| RF-14 | **Fondo:** fotografía `assets/img/fondo.webp` (WebP, 1600×893, ≤ 150 KB, `fetchpriority="high"`, `width`/`height` reales y `alt` descriptivo de la escena). En escritorio ocupa el lado derecho con un degradado hacia el fondo oscuro para que el texto conserve contraste; en teléfono va arriba. Su origen y licencia se anotan en `memoria.md` (Art. V.4). |
| RNF-01 | Lighthouse móvil ≥ 90 en rendimiento, accesibilidad, buenas prácticas y SEO; peso total publicado < 500 KB. |
| RNF-02 | Legible desde 320 px; navegable con teclado; foco visible; contraste AA; objetivos táctiles ≥ 44 px; `prefers-reduced-motion` respetado. |

### Requisitos retirados y a dónde se fue su contenido

| Antes | Ahora |
|---|---|
| RF-01 con navegación (Cómo funciona, Qué puedes compartir, Confianza, Preguntas) | Cabecera solo con la marca (RF-01 nuevo). No hay secciones que enlazar. |
| RF-03 «Cómo funciona» en 4 pasos | Ficha de Google Play de la app. |
| RF-04 «Qué puedes compartir» (categorías) | Ficha de Google Play de la app. |
| RF-05 «Confianza y seguridad» | Ficha de Google Play y `/terminos/`. |
| RF-06 «Aclaraciones honestas» sobre pagos y seguros | `/terminos/`, secciones 6 y 10. |
| RF-07 «Para quién» | Ficha de Google Play de la app. |
| RF-08 «Preguntas frecuentes» con `<details>` | Ficha de Google Play y las páginas legales. |
| RF-09 «Descarga final» (CTA repetida) | Innecesaria en una sola pantalla: el botón del hero ya está siempre visible. |
| RF-10 capturas de la app | Sigue como H-05 / tarea pendiente, para cuando exista versión estable. |

## 4. Criterios de aceptación

| ID | Dado / Cuando / Entonces |
|---|---|
| CA-01 | Dado un teléfono de 360 px, cuando abro la página, entonces veo la frase central y el botón de Google Play sin desplazarme. |
| CA-02 | Dada la app publicada y `playUrl` con la URL real, cuando toco el botón, entonces abre la ficha de Google Play. |
| CA-03 | Dada la app sin publicar, entonces el botón dice «Próximamente en Google Play» y no es un enlace. |
| CA-04 | Dado un navegador a 1920×1080, 1366×768, 1280×720, 1024×600 o 768×1024, o un teléfono a 414×896, 390×844, 375×667, 360×640 o 320×568, cuando abro la página, entonces no hay desplazamiento vertical ni horizontal. |
| CA-05 | Dado `node scripts/check.mjs`, entonces pasa sin errores. |
| CA-06 | Dado Lighthouse móvil, entonces ≥ 90 en las cuatro categorías. |
| CA-07 | Dadas las cuatro páginas del sitio, entonces la cabecera y el pie son idénticos a `docs/plantilla.html`. |
| CA-08 | Dado un navegador con JavaScript desactivado, entonces la página se ve completa y el botón de Play sigue siendo legible. |
| CA-10 | Dadas las URL de `SITE.social` vacías, entonces los cinco íconos se ven sin enlace; dada una URL válida, entonces ese ícono abre el perfil; dada una URL con `http`, con otro dominio o con `javascript:`, entonces se ignora y el ícono queda sin enlace. |
| CA-11 | Dado el botón de Google Play, entonces es el elemento de mayor peso visual de la pantalla y su texto tiene contraste ≥ 4.5:1 con su fondo. |
| CA-12 | Dado `assets/img/fondo.webp`, entonces pesa ≤ 150 KB y su origen y licencia están anotados en `memoria.md`. |
| CA-09 | Dado cada dato que afirma la landing, entonces existe en las specs de la app (`../vaiven-backend/specs`, `../vaiven-frontend/specs`) o en las páginas legales del sitio. |

## 5. Fuera de alcance

Registro, inicio de sesión, contacto por formulario, blog, testimonios, cifras de uso, reseñas, comparativas con otras plataformas, versión para iPhone, videos incrustados, analítica, cookies.

Además, por D-013/D-014: **navegación por secciones y anclas**, secciones largas de «cómo funciona», categorías, confianza o preguntas frecuentes **dentro de la landing**, y llamadas a la acción repetidas. Tampoco se incluyen capturas de la app mientras no exista una versión estable.

**Retirado de esta lista el 2026-11-11:** «botones ni barras de redes sociales». Ahora están dentro del alcance (RF-13) por la enmienda 1.3.0 de la constitución. Siguen **fuera**: widgets, botones «compartir», contadores de seguidores, incrustaciones de publicaciones, píxeles o cualquier script de las redes.

## 6. Preguntas abiertas

- [NEEDS CLARIFICATION: frase central y tono de marca (¿cercano y familiar, o más práctico?). Provisional: cercano y claro.]
- [NEEDS CLARIFICATION: ciudades o zonas de lanzamiento para la ficha de la tienda. Provisional: «México».]
- [NEEDS CLARIFICATION: paleta oficial. La decisión D-015 dice `#ff6721` / `#3f3939` y **el logotipo entregado coincide con esos valores** (muestreo: ≈ `#fc6820` y `#3c3838` en el JPEG); el sitio y la hoja de estilos usan `#f36a21` / `#1c1715`. Hay que elegir una y dejarla en los tokens de `assets/css/styles.css`.]
- ~~[NEEDS CLARIFICATION: logotipo definitivo]~~ **Resuelta el 2026-11-11:** la persona responsable entregó el logotipo (JPEG) y se vectorizó (P-22). Queda abierto si existe el **archivo original** del diseñador (SVG/AI) para reemplazar la vectorización.
- [NEEDS CLARIFICATION: origen y licencia de `assets/img/fondo.webp` (fotografía que aportó la persona responsable el 2026-11-11 y que sustituye a `Fondo.jpeg`). El Art. V.4 pide anotar origen y licencia en `memoria.md`; el agente no puede verificarlos. Si no se puede acreditar (o si fue generada con IA y se quiere avisarlo), hay que anotarlo o sustituirla.]
- [NEEDS CLARIFICATION: URL de los perfiles de VAIVÉN en Facebook, Instagram, X, YouTube y TikTok. Hoy están vacías en `SITE.social` y los íconos se ven sin enlace. No se inventan cuentas.]
- [NEEDS CLARIFICATION: aprobación humana de la enmienda 1.3.0 de la constitución (Art. II.1, V.3, V.4, VII y VIII.7).]

> **Resuelto (2026-11-11):** la paleta, los radios, las sombras y la tipografía de la portada y de las páginas legales son los del sistema de diseño de la app (`vaiven-diseno-landing.md`): primario `#C24E24`, fondo `#FAF6F0`, tinta `#2A1F1A`, Plus Jakarta Sans. Sustituye a las dos paletas anteriores de esta pregunta. El logotipo conserva sus colores propios. Ver P-23.
