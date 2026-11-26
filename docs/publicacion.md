# Publicación de la landing (Render)

> Parte de `dev-web` de L001-T010. La creación y el despliegue del servicio los hace `devops-mcp` (o una persona en el panel de Render); este documento solo fija los valores.

## Servicio

| Campo | Valor |
|---|---|
| Tipo | Static Site (plan gratuito) |
| Nombre | `vaiven-landing` |
| Repositorio / rama | `vaiven-landing-page` / `main` |
| Root Directory | _vacío_ (la raíz del repositorio es el sitio) |
| Build Command | _vacío_ (sin compilación, Art. III) |
| Publish Directory | `.` |
| URL pública | `https://vaivenapplication-landing-page.onrender.com/` (debe coincidir con `SITE.url` en `assets/js/config.js`, con `canonical` y con `sitemap.xml`) |
| Cabeceras | las del archivo `_headers` de la raíz (Render lo lee al publicar) |

Cada fusión a `main` publica una versión nueva. Por eso `main` solo recibe PR con CI en verde (`docs/devsecops.md`).

## URL para la ficha de Google Play

- Política de privacidad: `https://vaivenapplication-landing-page.onrender.com/privacidad/`
- Eliminación de cuenta: `https://vaivenapplication-landing-page.onrender.com/eliminar-cuenta/`
- Términos y condiciones: `https://vaivenapplication-landing-page.onrender.com/terminos/`

No entregarlas a la ficha hasta que L001-T011 (revisión legal humana) quite la etiqueta de borrador.

## Google Tag Manager y Analytics

- Contenedor web: `GTM-NSQNXS47`. Se carga únicamente tras aceptar analítica en el aviso del sitio.
- Flujo GA4: `VAIVEN Landing Page`; ID `G-BFYRHQWCTC`. Crear en GTM una **Etiqueta de Google** con este ID y activador de inicialización/todas las páginas. La etiqueta no debe configurarse para ignorar el consentimiento.
- Crear una etiqueta de evento GA4 con nombre `social_click`, activada por el evento personalizado `social_click`, y mapear `social_network` como parámetro.
- Probar con Vista previa de GTM y DebugView de GA4 antes de publicar la versión del contenedor.
- No publicar la etiqueta hasta que el aviso de privacidad y la enmienda constitucional hayan sido revisados por una persona.

## Verificación después de desplegar

1. `node scripts/check.mjs` en verde antes de fusionar.
2. Las cuatro páginas y `404` responden como se espera: `curl -s -o /dev/null -w "%{http_code}\n" <URL>` → 200 (y 404 en una ruta inexistente).
3. `curl -sI <URL>/` muestra `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy` y `Permissions-Policy`.
4. `robots.txt` y `sitemap.xml` responden 200 y listan la URL real.
5. Lighthouse móvil ≥ 90 en las cuatro categorías sobre el sitio publicado; anotar el resultado en `memoria.md`.
