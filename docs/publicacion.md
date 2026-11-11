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
| URL pública | `https://vaiven-landing.onrender.com/` (debe coincidir con `SITE.url` en `assets/js/config.js`, con `canonical` y con `sitemap.xml`) |
| Cabeceras | las del archivo `_headers` de la raíz (Render lo lee al publicar) |

Cada fusión a `main` publica una versión nueva. Por eso `main` solo recibe PR con CI en verde (`docs/devsecops.md`).

## URL para la ficha de Google Play

- Política de privacidad: `https://vaiven-landing.onrender.com/privacidad/`
- Eliminación de cuenta: `https://vaiven-landing.onrender.com/eliminar-cuenta/`
- Términos y condiciones: `https://vaiven-landing.onrender.com/terminos/`

No entregarlas a la ficha hasta que L001-T011 (revisión legal humana) quite la etiqueta de borrador.

## Verificación después de desplegar

1. `node scripts/check.mjs` en verde antes de fusionar.
2. Las cuatro páginas y `404` responden como se espera: `curl -s -o /dev/null -w "%{http_code}\n" <URL>` → 200 (y 404 en una ruta inexistente).
3. `curl -sI <URL>/` muestra `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy` y `Permissions-Policy`.
4. `robots.txt` y `sitemap.xml` responden 200 y listan la URL real.
5. Lighthouse móvil ≥ 90 en las cuatro categorías sobre el sitio publicado; anotar el resultado en `memoria.md`.
